// mcp-predaja-check.js — PREDAJA = MATERIJAL NA POLICI (F6 ②/4.3′, ADR-039).
// Pokreni: npm run mcp:predaja   (mrežno, STAGING-only, stvara i briše jednokratne korisnike)
//
// ─── ŠTO TVRDI ──────────────────────────────────────────────────────────────────────────────────
// Ekrana za pregled nema (ADR-039): `mcp_predaj_nacrt` nacrt sam pretvori u materijal u polici,
// CIJEL, u jednoj transakciji. To je jedini prijelaz AI-ja u živo gradivo, pa brana mjeri:
//
//   ① ispravno: materijal (study) u zapamćenoj polici, ime nacrta, sadržaj bajt-isti, nacrt nestao
//   ② nova polica po imenu (zapamćena u nacrtu) nastane pri predaji, u korijenu, s materijalom
//   ③ dvaput = jedan: ponovljena predaja vrati ISTI materijal (anketa 01.10.) — slijedno i USPOREDNO
//   ④ polica: tuđa / obrisana / materijal-umjesto-police / nacrt bez police → odbijeno, NIŠTA nije
//      nastalo, nacrt ostaje; AI ga preda ponovno s policom koju korisnik kaže (anketa 01.10.)
//   ⑤ neispravan sadržaj (podmetnut mimo pravila) i viseća kartica → odbijeno, ništa nije nastalo
//   ⑥ samo svoje: stranac ne predaje tuđi nacrt (ni poslije, kroz bilješku) — ista greška kao nepostojeći;
//      obična sesija ne zove predaju
//   ⑦ postojeći materijal se ovim putem NE prepisuje (nema argumenta za čvor; materijal kao „polica" odbijen)
//   ⑧ nacrt PREDAN po starom (čekao ekran ②/4.3) ide na policu
//   ⑨ bilješka: obrisan materijal se ne vraća; starija od 7 dana se ne vraća
//
// ⚠️ Greške se sude po IMENU iz poruke, ne po HTTP broju (isti razlog kao `mcp:nacrt`).
// Ishod: exit 1 = predaja ne drži · exit 0 + SKIP = nema STAGING_* / SERVICE u `.env`.

const {
  ANON, BASE, SERVICE, NULA,
  http, svcHeaders, ref, jeProdukcija, odbijen, noviKorisnik, pometi, prijava, oauthToken, rpc
} = require('./lib/staging-oauth');
const { valjanTocno } = require('../tests/fixtures/ugc-sadrzaj');

/** Čegrtaljka dosega (kalup `check:final`): manje = blok tiho otpao, više = osnovica nije podignuta. */
const OCEKIVANO_PROVJERA = 33;

let failed = 0;
let touched = 0;
function record(name, pass, detail) {
  touched++;
  if (!pass) failed++;
  console.log(`${pass ? '✅' : '❌'} ${name}${detail ? ' — ' + detail : ''}`);
}
function skip(why) { console.log('⏭️  SKIP — ' + why); process.exit(0); }

function greska(r) {
  if (r.status < 400) return '';
  const poruka = (r.json && r.json.message) || r.tekst || '';
  return (poruka.match(/^([a-z_]+)/) || [])[1] || ('HTTP ' + r.status);
}
const opis = (r) => 'HTTP ' + r.status + ' ' + (greska(r) || r.tekst.replace(/\s+/g, ' ').slice(0, 80));
function odbijenKao(ime, r, kod) {
  record(ime, greska(r) === kod, opis(r) + (greska(r) === kod ? '' : ' ← očekivano ' + kod));
}
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const idIz = (r) => (r.status === 200 && typeof r.json === 'string' && UUID.test(r.json)) ? r.json : null;

const kanon = (v) => Array.isArray(v) ? v.map(kanon) : (v && typeof v === 'object'
  ? Object.keys(v).sort().reduce((o, k) => (o[k] = kanon(v[k]), o), {}) : v);
const isto = (a, b) => JSON.stringify(kanon(a)) === JSON.stringify(kanon(b));

/** Valjan nacrt kakav gradi AI: Learn, kartica, kviz i dopuna koji upućuju na tu karticu. */
function sadrzaj(oznaka, card) {
  return {
    schemaVersion: 2,
    l1: {
      name: 'Lekcija ' + oznaka, icon: 'fa-book', color: '#6366f1',
      learn: { blocks: [{ id: 'b1', type: 'paragraph', text: 'Mitoza je dioba stanice (' + oznaka + ').' }] },
      flashcards: [{ id: 'k1', question: 'Mitoza', answer: 'Dioba stanice' }],
      quiz: [{ id: 'q1', question: 'Što je mitoza?', options: ['Dioba stanice', 'Disanje'], correct: 0, card: card || 'k1' }],
      fillBlanks: [{ id: 'f1', sentence: 'Mitoza je _______ stanice.', answer: 'dioba', card: card || 'k1' }]
    }
  };
}

let kljucBr = 0;
const noviKljuc = () => 'pr-' + Date.now() + '-' + (++kljucBr);

/** AI napravi nacrt sa zadanom policom i upiše sadržaj (NE predaje). Vraća id nacrta. */
async function nacrt(ai, ime, tijelo, polica) {
  const p = Object.assign({ p_polica: null, p_nova_polica: null }, polica);
  const id = (await rpc(ai, 'mcp_zapocni_nacrt', Object.assign({ p_name: ime, p_kljuc: noviKljuc(), p_opseg: 'standardno' }, p))).json;
  if (typeof id !== 'string') throw new Error('zapocni nije vratio id nacrta (' + ime + ')');
  const u = await rpc(ai, 'mcp_upisi_nacrt', { p_id: id, p_payload: tijelo, p_verzija: 1 });
  if (u.status !== 200) throw new Error('upis nacrta: ' + opis(u));
  return id;
}

/** Izmijeni redak nacrta MIMO svih pravila (service ključ): podmetnut sadržaj, stara predaja, bez police. */
async function podmetni(id, polja) {
  const r = await http('/rest/v1/node_drafts?id=eq.' + id, {
    method: 'PATCH', headers: Object.assign(svcHeaders(), { Prefer: 'return=minimal' }), body: JSON.stringify(polja)
  });
  if (!r.ok) throw new Error('podmetni ' + r.status + ': ' + (await r.text()).slice(0, 120));
}

async function cvorovi(uid) {
  return (await http('/rest/v1/nodes?owner_id=eq.' + uid + '&deleted_at=is.null&select=id,parent_id,kind,name&order=created_at',
    { headers: svcHeaders() })).json();
}
async function nacrtPostoji(id) {
  const r = await (await http('/rest/v1/node_drafts?id=eq.' + id + '&select=id', { headers: svcHeaders() })).json();
  return Array.isArray(r) && r.length === 1;
}
async function sadrzajMaterijala(nodeId) {
  const r = await (await http('/rest/v1/node_content?node_id=eq.' + nodeId + '&select=payload,version', { headers: svcHeaders() })).json();
  return r[0] || null;
}

/** Odbaci ostatke (obična sesija) da kvota „3 u izradi" ne obori sljedeći blok — i na starom kodu, gdje
 *  predaja nacrt NE troši, pa bi brana pukla umjesto da pokaže svaki crveni blok. Ishod se ne sudi. */
const pocisti = async (t, ids) => { for (const id of ids) await rpc(t, 'odbaci_nacrt', { p_id: id }); };

const predaj = (t, id, polica, nova) => rpc(t, 'mcp_predaj_nacrt', { p_id: id, p_polica: polica || null, p_nova_polica: nova || null });

(async () => {
  if (!BASE || !ANON) skip('nema STAGING_SUPABASE_URL / STAGING_SUPABASE_ANON u .env');
  if (!SERVICE) skip('nema STAGING_SUPABASE_SERVICE_KEY (brana stvara i briše jednokratne korisnike)');
  if (jeProdukcija()) {
    console.log('❌ ODBIJENO: ova brana piše i briše — PRODUKCIJA je zabranjena (CLAUDE #8).');
    process.exit(1);
  }
  console.log('\n=== mcp:predaja === (staging ' + ref() + ')\n');

  const A = await noviKorisnik({ prefiks: 'mcp-predaja' });
  const B = await noviKorisnik({ prefiks: 'mcp-predaja' });
  const jA = await prijava(A.email, A.password);
  const jB = await prijava(B.email, B.password);
  const aA = (await oauthToken(jA, 'Sokrat predaja (test)')).token;
  const aB = (await oauthToken(jB, 'Sokrat predaja (test)')).token;
  // K/5: usporedni krugovi ③ su 40 upisa u pola minute — vlastiti korisnik, da A ostane ispod granice
  // učestalosti (60/min) za ostale blokove. Granica nema iznimku za testove.
  const U = await noviKorisnik({ prefiks: 'mcp-predaja-usporedno' });
  const jU = await prijava(U.email, U.password);
  const aU = (await oauthToken(jU, 'Sokrat predaja usporedno (test)')).token;
  const policaU = (await rpc(jU, 'create_node', { p_parent: null, p_kind: 'folder', p_name: 'Usporedno' })).json;

  // Obična sesija: A-ova polica, A-ov postojeći materijal sa sadržajem, B-ova polica.
  const policaA = (await rpc(jA, 'create_node', { p_parent: null, p_kind: 'folder', p_name: 'Biologija' })).json;
  const postojeci = (await rpc(jA, 'create_node', { p_parent: policaA, p_kind: 'study', p_name: 'Postojeći' })).json;
  const vP = (await sadrzajMaterijala(postojeci)).version;
  await rpc(jA, 'publish_node', { p_node_id: postojeci, p_payload: sadrzaj('živo'), p_base_version: vP });
  const postojeciPrije = await sadrzajMaterijala(postojeci);
  const policaB = (await rpc(jB, 'create_node', { p_parent: null, p_kind: 'folder', p_name: 'Tuđa' })).json;

  console.log('— ① predaja u zapamćenu postojeću policu —');
  const tijelo = sadrzaj('A');
  const n1 = await nacrt(aA, 'Stanica', tijelo, { p_polica: policaA });
  const r1 = await predaj(aA, n1);
  const m1 = idIz(r1);
  record('AI preda nacrt → vraća id materijala', !!m1, opis(r1));
  const svi1 = await cvorovi(A.id);
  const mat1 = svi1.find((c) => c.id === m1);
  record('materijal je STUDY u zapamćenoj polici, s imenom nacrta',
    !!mat1 && mat1.kind === 'study' && mat1.parent_id === policaA && mat1.name === 'Stanica', JSON.stringify(mat1 || null).slice(0, 120));
  const pl1 = m1 ? await sadrzajMaterijala(m1) : null;
  record('sadržaj materijala = sadržaj nacrta (pročitano natrag)', !!pl1 && isto(pl1.payload, tijelo), pl1 ? 'verzija ' + pl1.version : '—');
  record('predan nacrt je OBRISAN (materijal je jedina kopija)', !(await nacrtPostoji(n1)));
  odbijenKao('upis u predan nacrt → nacrt_ne_postoji (nema ga više)', await rpc(aA, 'mcp_upisi_nacrt',
    { p_id: n1, p_payload: sadrzaj('kasno'), p_verzija: 2 }), 'nacrt_ne_postoji');

  console.log('\n— ② nova polica po imenu (zapamćena u nacrtu) —');
  const n2 = await nacrt(aA, 'Genetika', sadrzaj('G'), { p_nova_polica: 'Nova polica' });
  const prije2 = (await cvorovi(A.id)).filter((c) => c.name === 'Nova polica').length;
  const m2 = idIz(await predaj(aA, n2));
  const svi2 = await cvorovi(A.id);
  const nova = svi2.filter((c) => c.kind === 'folder' && c.name === 'Nova polica');
  const mat2 = svi2.find((c) => c.id === m2);
  record('nova polica nastane TEK pri predaji (u korijenu), materijal je u njoj', prije2 === 0 && nova.length === 1 &&
    nova[0].parent_id === null && !!mat2 && mat2.parent_id === nova[0].id, prije2 + ' → ' + nova.length + ' polica · ' + JSON.stringify(mat2 || null).slice(0, 80));

  await pocisti(jA, [n2]);   // n1 ostaje: ③ ga predaje ponovno

  console.log('\n— ③ predaja dvaput = jedan materijal —');
  const r3 = await predaj(aA, n1);
  record('ponovljena predaja (izgubljen odgovor) → ISTI materijal, ne greška', !!m1 && idIz(r3) === m1, opis(r3) + ' · ' + (r3.json === m1 ? 'isti id' : 'drugi id'));
  record('… i u polici je i dalje TOČNO jedan „Stanica"', (await cvorovi(A.id)).filter((c) => c.name === 'Stanica').length === 1);
  // Usporedno: „jedan" drži brava (`for update` u `_nacrt_moj`) + bilješka. Bez brave je utrka
  // nedeterministička (kalup `mcp:prihvat` ②) — zato KRUGOVI, i svaki mora dati točno jedan materijal.
  const KRUGOVA = 4;
  const USPOREDNO = 8;
  const krugovi = [];
  for (let krug = 1; krug <= KRUGOVA; krug++) {
    const ime = 'Usporedno ' + krug;
    const nU = await nacrt(aU, ime, valjanTocno(600000), { p_polica: policaU });
    const ishodi = await Promise.all(Array.from({ length: USPOREDNO }, async () => {
      const t0 = Date.now(); const r = await predaj(aU, nU); return { r, t0, t1: Date.now() };
    }));
    const preklop = ishodi.filter((a, i) => ishodi.some((b, j) => j !== i && a.t0 < b.t1 && b.t0 < a.t1)).length;
    const ids = new Set(ishodi.map((x) => idIz(x.r)));
    krugovi.push({ prosli: ishodi.filter((x) => idIz(x.r)).length, istih: ids.size === 1 && !ids.has(null), preklop,
      materijala: (await cvorovi(U.id)).filter((c) => c.name === ime).length });
    await pocisti(jU, [nU]);
  }
  await pocisti(jA, [n1]);
  record(KRUGOVA + ' kruga × ' + USPOREDNO + ' usporednih predaja istog nacrta → SVE vrate isti materijal',
    krugovi.every((x) => x.prosli === USPOREDNO && x.istih && x.preklop >= 2),
    krugovi.map((x) => x.prosli + '×id/' + (x.istih ? 'isti' : 'RAZLIČITI') + '/' + x.preklop + ' usporedno').join(' · ')
      + (krugovi.some((x) => x.preklop < 2) ? ' ← neki krug išao SLIJEDNO, usporednost nije ni pokušana' : ''));
  record('… i u SVAKOM krugu nastao je TOČNO jedan materijal', krugovi.every((x) => x.materijala === 1),
    krugovi.map((x) => x.materijala).join(' · ') + ' materijal(a) po krugu');

  console.log('\n— ④ polica —');
  const n4 = await nacrt(aA, 'Evolucija', sadrzaj('E'), { p_polica: policaA });
  const prije4 = (await cvorovi(A.id)).length;
  odbijenKao('tuđa polica (p_polica) odbijena', await predaj(aA, n4, policaB), 'nacrt_polica_ne_postoji');
  odbijenKao('materijal umjesto police odbijen', await predaj(aA, n4, postojeci), 'nacrt_polica_ne_postoji');
  odbijenKao('i postojeća i nova polica odjednom odbijeno', await predaj(aA, n4, policaA, 'Dvije'), 'nacrt_polica');
  odbijenKao('ime nove police dulje od 200 znakova odbijeno', await predaj(aA, n4, null, 'x'.repeat(201)), 'nacrt_polica');
  // Zapamćena polica obrisana između početka i predaje (korisnik ju je maknuo).
  const kratka = (await rpc(jA, 'create_node', { p_parent: null, p_kind: 'folder', p_name: 'Kratkog vijeka' })).json;
  const n4b = await nacrt(aA, 'Bez doma', sadrzaj('D'), { p_polica: kratka });
  await rpc(jA, 'delete_node', { p_id: kratka });
  odbijenKao('zapamćena polica u međuvremenu OBRISANA → odbijeno', await predaj(aA, n4b), 'nacrt_polica_ne_postoji');
  // Nacrt bez police (iz vremena prije ②/4.2) — kao Leonova „Biologija".
  const n4c = await nacrt(aA, 'Stari bez police', sadrzaj('S'), { p_nova_polica: 'privremeno' });
  await podmetni(n4c, { polica_id: null, nova_polica: null });
  odbijenKao('nacrt BEZ police → nacrt_bez_police (AI pita korisnika)', await predaj(aA, n4c), 'nacrt_bez_police');
  const poslije4 = await cvorovi(A.id);
  record('… nakon svih odbijanja NIŠTA nije nastalo, a sva tri nacrta su tu',
    poslije4.length === prije4 && await nacrtPostoji(n4) && await nacrtPostoji(n4b) && await nacrtPostoji(n4c),
    prije4 + ' → ' + poslije4.length + ' živih čvorova');
  const m4b = idIz(await predaj(aA, n4b, null, 'Zamjenska'));
  const m4c = idIz(await predaj(aA, n4c, policaA));
  const svi4 = await cvorovi(A.id);
  const zamjenska = svi4.find((c) => c.kind === 'folder' && c.name === 'Zamjenska');
  record('ponovljena predaja s policom koju je korisnik rekao → materijal u njoj (nova po imenu i postojeća)',
    !!m4b && !!zamjenska && (svi4.find((c) => c.id === m4b) || {}).parent_id === zamjenska.id &&
    !!m4c && (svi4.find((c) => c.id === m4c) || {}).parent_id === policaA, (m4b ? 'nova ok' : 'nova ✗') + ' · ' + (m4c ? 'postojeća ok' : 'postojeća ✗'));

  await pocisti(jA, [n4, n4b, n4c]);

  console.log('\n— ⑤ sadržaj —');
  const n5 = await nacrt(aA, 'Pokvaren', sadrzaj('X'), { p_nova_polica: 'Ne smije ostati' });
  const zlo = sadrzaj('X');
  zlo.l1.learn.blocks.push({ id: 'b2', type: 'legacy-html', html: '<img src=x onerror=alert(1)>' });
  await podmetni(n5, { payload: zlo });
  const prije5 = (await cvorovi(A.id)).length;
  odbijenKao('podmetnut sadržaj izvan strogog profila → sadrzaj_neispravan', await predaj(aA, n5), 'sadrzaj_neispravan');
  const n5b = await nacrt(aA, 'Viseća', sadrzaj('V'), { p_nova_polica: 'Ne smije ostati' });
  await podmetni(n5b, { payload: sadrzaj('V', 'nema-je') });
  odbijenKao('podmetnuto pitanje s nepostojećom karticom → nacrt_kartica_ne_postoji', await predaj(aA, n5b), 'nacrt_kartica_ne_postoji');
  const n5c = (await rpc(aA, 'mcp_zapocni_nacrt', { p_name: 'Prazan', p_kljuc: noviKljuc(), p_polica: policaA, p_nova_polica: null, p_opseg: 'sazeto' })).json;
  odbijenKao('prazan nacrt → nacrt_prazan', await predaj(aA, n5c), 'nacrt_prazan');
  const poslije5 = await cvorovi(A.id);
  record('… NIŠTA nije nastalo (ni nova polica — jedna transakcija), nacrti su tu',
    poslije5.length === prije5 && !poslije5.some((c) => c.name === 'Ne smije ostati') && await nacrtPostoji(n5) && await nacrtPostoji(n5b),
    prije5 + ' → ' + poslije5.length + ' čvorova');

  await pocisti(jA, [n5, n5b, n5c]);

  console.log('\n— ⑥ samo svoje —');
  const n6 = await nacrt(aA, 'Tuđe', sadrzaj('T'), { p_polica: policaA });
  const tudji = await predaj(aB, n6, policaB);
  odbijenKao('stranac (njegov AI) ne predaje tuđi nacrt', tudji, 'nacrt_ne_postoji');
  const nepostojeci = await predaj(aB, NULA, policaB);
  record('tuđi i nepostojeći nacrt daju ISTI odgovor', tudji.status === nepostojeci.status && tudji.tekst === nepostojeci.tekst,
    'tuđi ' + opis(tudji) + ' · nepostojeći ' + opis(nepostojeci));
  odbijenKao('stranac ne dobiva A-ov materijal kroz bilješku (već predan A-ov nacrt)', await predaj(aB, n1), 'nacrt_ne_postoji');
  const obicna = await predaj(jA, n6);
  record('obična sesija NE ZOVE predaju (put je samo AI-jev)', odbijen(obicna.status, obicna.tekst), opis(obicna));
  record('… nacrt je i dalje tu, B nema ništa novo', await nacrtPostoji(n6) && (await cvorovi(B.id)).length === 1);

  console.log('\n— ⑦ postojeći materijal se ne prepisuje —');
  const stariPotpis = await rpc(aA, 'mcp_predaj_nacrt', { p_id: n6, p_node_id: postojeci });
  record('predaja ne prima čvor za prepisati (nepoznat argument → nema takve rute)', stariPotpis.status === 404 && /PGRST202/.test(stariPotpis.tekst), opis(stariPotpis));
  const postojeciPoslije = await sadrzajMaterijala(postojeci);
  record('A-ov postojeći materijal bajt-isti nakon SVIH predaja (sadržaj i verzija)',
    !!postojeciPoslije && isto(postojeciPoslije.payload, postojeciPrije.payload) && postojeciPoslije.version === postojeciPrije.version,
    'verzija ' + postojeciPrije.version + ' → ' + (postojeciPoslije && postojeciPoslije.version));

  console.log('\n— ⑧ nacrt predan po starom (čekao ekran) —');
  const n8 = await nacrt(aA, 'Kemija', sadrzaj('K'), { p_polica: policaA });
  await podmetni(n8, { status: 'predan', submitted_at: new Date().toISOString() });
  const m8 = idIz(await predaj(aA, n8));
  record('stari predan nacrt → materijal u zapamćenoj polici, nacrt nestao',
    !!m8 && ((await cvorovi(A.id)).find((c) => c.id === m8) || {}).parent_id === policaA && !(await nacrtPostoji(n8)));

  console.log('\n— ⑨ bilješka —');
  await rpc(jA, 'delete_node', { p_id: m2 });
  odbijenKao('materijal obrisan → ponovljena predaja ga NE vraća (nacrt_ne_postoji)', await predaj(aA, n2), 'nacrt_ne_postoji');
  const o = await http('/rest/v1/node_drafts_predani?draft_id=eq.' + n8, {
    method: 'PATCH', headers: Object.assign(svcHeaders(), { Prefer: 'return=minimal' }),
    body: JSON.stringify({ created_at: new Date(Date.now() - 8 * 86400000).toISOString() })
  });
  odbijenKao('bilješka starija od 7 dana → ponovljena predaja ne vraća materijal', o.ok ? await predaj(aA, n8) : { status: o.status, tekst: 'bilješke nema', json: null }, 'nacrt_ne_postoji');
  const aiTablica = await http('/rest/v1/node_drafts_predani?select=draft_id', { headers: { apikey: ANON, Authorization: 'Bearer ' + aA } });
  const obTablica = await http('/rest/v1/node_drafts_predani?select=draft_id', { headers: { apikey: ANON, Authorization: 'Bearer ' + jA } });
  record('bilješku ne čita ni AI ni obična sesija izravno', [401, 403].includes(aiTablica.status) && [401, 403].includes(obTablica.status),
    'AI HTTP ' + aiTablica.status + ' · korisnik HTTP ' + obTablica.status);

  record('doseg: izvedeno točno ' + OCEKIVANO_PROVJERA + ' provjera', touched === OCEKIVANO_PROVJERA,
    touched === OCEKIVANO_PROVJERA ? '' : 'izvedeno ' + touched +
      (touched < OCEKIVANO_PROVJERA ? ' ← BLOK JE PRESKOČEN' : ' ← nova provjera bez podignute osnovice'));

  await pometi();
  console.log('\n  dotaknuto: ' + touched + ' provjera, palo: ' + failed);
  console.log(failed ? '✗ PREDAJA NE DRŽI\n' : '✅ predaja drži\n');
  process.exit(failed ? 1 : 0);
})().catch(async (e) => {
  await pometi();
  console.log('✗ brana je pukla: ' + e.message);
  process.exit(1);
});
