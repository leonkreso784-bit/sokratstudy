// mcp-prihvat-check.js — PRIHVAT i ODBACIVANJE nacrta od AI-ja (F6 ②/4.1, ADR-038 ①).
// Pokreni: npm run mcp:prihvat   (mrežno, STAGING-only, stvara i briše jednokratne korisnike)
//
// ─── ŠTO TVRDI ──────────────────────────────────────────────────────────────────────────────────
// Nacrt postaje materijal ISKLJUČIVO korisnikovim „Prihvati" iz obične sesije. `mcp:nacrt` tvrdi da
// AI piše samo u nacrt; ova brana tvrdi da je prijelaz nacrt → živo gradivo:
//
//   ① ispravan: materijal nastane u odabranoj polici, sadržaj bajt-isti nacrtu, nacrt nestane
//   ② jednom: drugi prihvat istog nacrta NE stvara drugi materijal (Leon, anketa 30.09.: briše se) —
//      ni slijedno ni USPOREDNO (dvoklik; revizor ②/4.1 R1: slijedni test prolazi i bez brave)
//   ③ nova polica po imenu nastaje tek pri prihvatu — i NE ostaje ako prihvat padne (jedna transakcija)
//   ④ samo korisnik: AI-token ne prihvaća i ne odbacuje; stranac ne dira tuđi nacrt i dobiva ISTU
//      grešku kao za nepostojeći; tuđa polica i materijal umjesto police su odbijeni
//   ⑤ samo predan: nacrt u izradi se ne prihvaća (Leon, anketa 30.09.)
//   ⑥ druga linija: sadržaj koji je u nacrt ušao mimo pravila (ubačen izravno u tablicu) prihvat
//      odbija — i strogi profil (②/0a) i veza pitanje → kartica (N4)
//   ⑦ ②/3-N4 na upisu: pitanje s nepostojećom karticom odbijeno već na `mcp_upisi_nacrt` — ali NE u
//      `publish_node` (Studio: obrisana kartica ne smije rušiti spremanje gradiva)
//   ⑧ odbacivanje: vlastiti nacrt (u izradi i predan) nestane; tuđi ne
//
// ⚠️ Greške se sude po IMENU iz poruke, ne po HTTP broju (isti razlog kao `mcp:nacrt`).
// ⚠️ Druga ograda „samo korisnik" (provjera `client_id` UNUTAR funkcije) ovdje se NE vidi: prvu
//    (nema grant ulozi `mcp_klijent`) AI udari prije nje. Dokazuje je jedino mutacija „grant
//    `mcp_klijent`" (PROGRESS ②/4.1).
//
// Ishod: exit 1 = prihvat ne drži · exit 0 + SKIP = nema STAGING_* / SERVICE u `.env`.

const { valjanTocno } = require('../tests/fixtures/ugc-sadrzaj');
const {
  ANON, BASE, SERVICE, NULA,
  http, svcHeaders, ref, jeProdukcija, odbijen, noviKorisnik, pometi, prijava, oauthToken, rpc
} = require('./lib/staging-oauth');

/** Čegrtaljka dosega (kalup `check:final`): manje = blok tiho otpao, više = osnovica nije podignuta. */
const OCEKIVANO_PROVJERA = 34;   // bez retka „doseg" (brojač se čita prije njega, kalup `mcp:nacrt`)

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
const noviKljuc = () => 'p-' + Date.now() + '-' + (++kljucBr);

/** AI (token `ai`) napravi nacrt, upiše sadržaj i (po želji) preda. Vraća id nacrta. */
async function nacrtOdAI(ai, ime, tijelo, predaj) {
  const id = (await rpc(ai, 'mcp_zapocni_nacrt', { p_name: ime, p_kljuc: noviKljuc(), p_polica: null, p_nova_polica: 'Polica', p_opseg: 'standardno' })).json;
  if (typeof id !== 'string') throw new Error('zapocni nije vratio id nacrta');
  const u = await rpc(ai, 'mcp_upisi_nacrt', { p_id: id, p_payload: tijelo, p_verzija: 1 });
  if (u.status !== 200) throw new Error('upis nacrta: ' + opis(u));
  if (predaj !== false) {
    const p = await rpc(ai, 'mcp_predaj_nacrt', { p_id: id });
    if (p.status !== 200) throw new Error('predaja nacrta: ' + opis(p));
  }
  return id;
}

/** Ubaci sadržaj u nacrt MIMO svih pravila (service ključ) — glumi nacrt iz vremena prije brane. */
async function podmetni(id, payload) {
  const r = await http('/rest/v1/node_drafts?id=eq.' + id, {
    method: 'PATCH', headers: Object.assign(svcHeaders(), { Prefer: 'return=minimal' }),
    body: JSON.stringify({ payload })
  });
  if (!r.ok) throw new Error('podmetni ' + r.status + ': ' + (await r.text()).slice(0, 120));
}

/** AI-token odbijen po PRAVU (401/403), ne 404 PGRST202 — tako izgleda i funkcija koja ne postoji (revizor N1). */
const odbijenPoPravu = (r) => (r.status === 401 || r.status === 403) && !/PGRST202/.test(r.tekst);

/** Živi čvorovi i nacrti korisnika izravno iz baze (service ključ, zaobilazi RLS). */
async function cvorovi(uid) {
  return (await http('/rest/v1/nodes?owner_id=eq.' + uid + '&deleted_at=is.null&select=id,parent_id,kind,name&order=created_at',
    { headers: svcHeaders() })).json();
}
async function nacrtPostoji(id) {
  const r = await (await http('/rest/v1/node_drafts?id=eq.' + id + '&select=id', { headers: svcHeaders() })).json();
  return Array.isArray(r) && r.length === 1;
}
async function payloadMaterijala(nodeId) {
  const r = await (await http('/rest/v1/node_content?node_id=eq.' + nodeId + '&select=payload,version', { headers: svcHeaders() })).json();
  return r[0] || null;
}

const prihvati = (t, id, polica, nova) => rpc(t, 'prihvati_nacrt', { p_id: id, p_polica: polica || null, p_nova_polica: nova || null });
const odbaci = (t, id) => rpc(t, 'odbaci_nacrt', { p_id: id });

(async () => {
  if (!BASE || !ANON) skip('nema STAGING_SUPABASE_URL / STAGING_SUPABASE_ANON u .env');
  if (!SERVICE) skip('nema STAGING_SUPABASE_SERVICE_KEY (brana stvara i briše jednokratne korisnike)');
  if (jeProdukcija()) {
    console.log('❌ ODBIJENO: ova brana piše i briše — PRODUKCIJA je zabranjena (CLAUDE #8).');
    process.exit(1);
  }
  console.log('\n=== mcp:prihvat === (staging ' + ref() + ')\n');

  const A = await noviKorisnik({ prefiks: 'mcp-prihvat' });
  const B = await noviKorisnik({ prefiks: 'mcp-prihvat' });
  const jA = await prijava(A.email, A.password);
  const jB = await prijava(B.email, B.password);
  const aA = (await oauthToken(jA, 'Sokrat prihvat (test)')).token;
  const aB = (await oauthToken(jB, 'Sokrat prihvat (test)')).token;

  // Police obične sesije: A-ova (cilj), B-ova (tuđa) i A-ov materijal (nije polica).
  const policaA = (await rpc(jA, 'create_node', { p_parent: null, p_kind: 'folder', p_name: 'Biologija' })).json;
  const policaB = (await rpc(jB, 'create_node', { p_parent: null, p_kind: 'folder', p_name: 'Tuđa' })).json;
  const materijalA = (await rpc(jA, 'create_node', { p_parent: null, p_kind: 'study', p_name: 'Nije polica' })).json;

  console.log('— ① prihvat u postojeću policu —');
  const tijelo = sadrzaj('A');
  const n1 = await nacrtOdAI(aA, 'Stanica', tijelo);
  const r1 = await prihvati(jA, n1, policaA);
  const noviId = typeof r1.json === 'string' ? r1.json : null;
  record('vlasnik prihvati predan nacrt → id materijala', !!noviId, opis(r1));
  const svi = await cvorovi(A.id);
  const mat = svi.find((c) => c.id === noviId);
  record('materijal je STUDY u odabranoj polici, s imenom nacrta',
    !!mat && mat.kind === 'study' && mat.parent_id === policaA && mat.name === 'Stanica', JSON.stringify(mat || null).slice(0, 120));
  const pl = noviId ? await payloadMaterijala(noviId) : null;
  record('sadržaj materijala = sadržaj nacrta (pročitano natrag)', !!pl && isto(pl.payload, tijelo), pl ? 'verzija ' + pl.version : '—');
  record('prihvaćen nacrt je OBRISAN', !(await nacrtPostoji(n1)));

  console.log('\n— ② jednom —');
  odbijenKao('drugi prihvat istog nacrta odbijen', await prihvati(jA, n1, policaA), 'nacrt_ne_postoji');
  const uPolici = (await cvorovi(A.id)).filter((c) => c.parent_id === policaA);
  record('… i u polici je i dalje TOČNO jedan materijal', uPolici.length === 1, uPolici.length + ' čvor(ova)');
  // Dvoklik: prihvati istog nacrta USPOREDNO. „Jednom" drži brava (`for update` u `_nacrt_moj`) + brisanje;
  // slijedni test gore prošao bi i bez brave (revizor ②/4.1 R1).
  // ⚠️ Bez brave je utrka NEDETERMINISTIČKA (izmjereno 30.09., mutacija R1 živa): isti pokus dao je 1, 3 i
  //    8 materijala — ovisi stigne li prvi prihvat završiti prije nego ostali pročitaju nacrt. Jedan krug
  //    je bio zelen 3/3 i na mutaciji. Zato KRUGOVI, svaki mora dati točno jedan materijal.
  const KRUGOVA = 4;
  const USPOREDNO = 8;
  const krugovi = [];
  for (let krug = 1; krug <= KRUGOVA; krug++) {
    const ime = 'Dvoklik ' + krug;
    const nU = await nacrtOdAI(aA, ime, valjanTocno(600000));
    const ishodi = await Promise.all(Array.from({ length: USPOREDNO }, async () => {
      const t0 = Date.now(); const r = await prihvati(jA, nU, policaA); return { r, t0, t1: Date.now() };
    }));
    const preklop = ishodi.filter((a, i) => ishodi.some((b, j) => j !== i && a.t0 < b.t1 && b.t0 < a.t1)).length;
    krugovi.push({
      prosli: ishodi.filter((x) => x.r.status === 200).length,
      nema: ishodi.filter((x) => greska(x.r) === 'nacrt_ne_postoji').length,
      preklop,
      materijala: (await cvorovi(A.id)).filter((c) => c.name === ime).length
    });
  }
  record(KRUGOVA + ' kruga × ' + USPOREDNO + ' usporednih prihvata istog nacrta → u SVAKOM točno jedan 200, ostali nacrt_ne_postoji',
    krugovi.every((x) => x.prosli === 1 && x.nema === USPOREDNO - 1 && x.preklop >= 2),
    krugovi.map((x) => x.prosli + '×200/' + x.nema + '×nema/' + x.preklop + ' usporedno').join(' · ')
      + (krugovi.some((x) => x.preklop < 2) ? ' ← neki krug išao SLIJEDNO, usporednost nije ni pokušana' : ''));
  record('… i u SVAKOM krugu nastao je TOČNO jedan materijal', krugovi.every((x) => x.materijala === 1),
    krugovi.map((x) => x.materijala).join(' · ') + ' materijal(a) po krugu');

  console.log('\n— ③ nova polica po imenu —');
  const n2 = await nacrtOdAI(aA, 'Genetika', sadrzaj('G'));
  const r2 = await prihvati(jA, n2, null, 'Nova polica');
  const poslije2 = await cvorovi(A.id);
  const nova = poslije2.find((c) => c.kind === 'folder' && c.name === 'Nova polica');
  const mat2 = poslije2.find((c) => c.id === r2.json);
  record('nova polica nastane pri prihvatu (u korijenu) i materijal je u njoj',
    r2.status === 200 && !!nova && nova.parent_id === null && !!mat2 && mat2.parent_id === nova.id, opis(r2));
  // Atomičnost: prihvat koji padne (neispravan sadržaj) NE ostavlja ni novu policu.
  const n3 = await nacrtOdAI(aA, 'Pokvaren', sadrzaj('X'));
  const zlo = sadrzaj('X');
  zlo.l1.learn.blocks.push({ id: 'b2', type: 'legacy-html', html: '<img src=x onerror=alert(1)>' });
  await podmetni(n3, zlo);
  const prijeX = (await cvorovi(A.id)).length;
  odbijenKao('⑥ podmetnut sadržaj izvan strogog profila: prihvat odbijen', await prihvati(jA, n3, null, 'Ne smije ostati'), 'sadrzaj_neispravan');
  const poslijeX = await cvorovi(A.id);
  record('… i NIŠTA nije nastalo (ni polica ni materijal — jedna transakcija)',
    poslijeX.length === prijeX && !poslijeX.some((c) => c.name === 'Ne smije ostati'), prijeX + ' → ' + poslijeX.length + ' čvorova');
  record('… a nacrt je i dalje tu (korisnik ga može odbaciti)', await nacrtPostoji(n3));

  console.log('\n— ④ samo korisnik, samo svoje —');
  const n4 = await nacrtOdAI(aA, 'Evolucija', sadrzaj('E'));
  const aiPrihvat = await prihvati(aA, n4, policaA);
  record('AI-token NE prihvaća (ni vlastiti nacrt) — odbijen po PRAVU', odbijenPoPravu(aiPrihvat), opis(aiPrihvat));
  const aiOdbaci = await odbaci(aA, n4);
  record('AI-token NE odbacuje — odbijen po PRAVU', odbijenPoPravu(aiOdbaci), opis(aiOdbaci));
  const tudji = await prihvati(jB, n4, policaB);
  odbijenKao('stranac NE prihvaća tuđi nacrt', tudji, 'nacrt_ne_postoji');
  const nepostojeci = await prihvati(jB, NULA, policaB);
  record('tuđi i nepostojeći nacrt daju ISTI odgovor', tudji.status === nepostojeci.status && tudji.tekst === nepostojeci.tekst,
    'tuđi ' + opis(tudji) + ' · nepostojeći ' + opis(nepostojeci));
  odbijenKao('stranac NE odbacuje tuđi nacrt', await odbaci(jB, n4), 'nacrt_ne_postoji');
  odbijenKao('tuđa polica odbijena', await prihvati(jA, n4, policaB), 'nacrt_polica_ne_postoji');
  odbijenKao('materijal umjesto police odbijen', await prihvati(jA, n4, materijalA), 'nacrt_polica_ne_postoji');
  // Vlastita, ali OBRISANA polica: ista greška kao tuđa (bez provjere bi `create_node` rekao `node_deleted`).
  const obrisana = (await rpc(jA, 'create_node', { p_parent: null, p_kind: 'folder', p_name: 'Obrisana' })).json;
  await rpc(jA, 'delete_node', { p_id: obrisana });
  odbijenKao('vlastita OBRISANA polica odbijena istom greškom', await prihvati(jA, n4, obrisana), 'nacrt_polica_ne_postoji');
  odbijenKao('bez police odbijeno', await prihvati(jA, n4, null, null), 'nacrt_polica');
  odbijenKao('i postojeća i nova polica odjednom odbijeno', await prihvati(jA, n4, policaA, 'Dvije'), 'nacrt_polica');
  odbijenKao('prazno ime nove police odbijeno', await prihvati(jA, n4, null, '   '), 'nacrt_polica');
  const bKorijen = await cvorovi(B.id);
  record('B-ova polica poslije pokušaja prazna, a nacrt i dalje A-ov i živ',
    bKorijen.length === 1 && await nacrtPostoji(n4), bKorijen.length + ' B-ovih čvorova');

  console.log('\n— ⑤ samo predan —');
  const n5 = await nacrtOdAI(aA, 'U izradi', sadrzaj('U'), false);
  odbijenKao('nacrt U IZRADI se ne prihvaća', await prihvati(jA, n5, policaA), 'nacrt_nije_predan');
  record('… i ostaje u izradi', await nacrtPostoji(n5));

  console.log('\n— ⑥ druga linija: veza pitanje → kartica (N4) —');
  const n6 = await nacrtOdAI(aA, 'Viseća kartica', sadrzaj('V'));
  await podmetni(n6, sadrzaj('V', 'nema-je'));
  odbijenKao('podmetnuto pitanje s nepostojećom karticom: prihvat odbijen', await prihvati(jA, n6, policaA), 'nacrt_kartica_ne_postoji');

  console.log('\n— ⑦ N4 na upisu —');
  const n7 = (await rpc(aA, 'mcp_zapocni_nacrt', { p_name: 'N4', p_kljuc: noviKljuc(), p_polica: null, p_nova_polica: 'Polica', p_opseg: 'standardno' })).json;
  odbijenKao('AI izravnim RPC-om upiše pitanje s nepostojećom karticom → odbijeno', await rpc(aA, 'mcp_upisi_nacrt',
    { p_id: n7, p_payload: sadrzaj('N', 'nema-je'), p_verzija: 1 }), 'nacrt_kartica_ne_postoji');
  const bezVeze = sadrzaj('N');
  delete bezVeze.l1.quiz[0].card;
  delete bezVeze.l1.fillBlanks[0].card;
  const v7 = ((await rpc(aA, 'mcp_procitaj_nacrt', { p_id: n7 })).json || {}).verzija;   // na starom kodu prvi upis prođe
  const u7 = await rpc(aA, 'mcp_upisi_nacrt', { p_id: n7, p_payload: bezVeze, p_verzija: v7 });
  record('pitanje BEZ `card` i dalje prolazi (polje je opcionalno, kao u Studiju)', u7.status === 200, opis(u7));
  // … a u OBJAVI iz Studija viseći `card` NIJE greška: korisnik je smio obrisati karticu (revizor N4).
  const vM = ((await (await http('/rest/v1/node_content?node_id=eq.' + materijalA + '&select=version', { headers: svcHeaders() })).json())[0] || {}).version;
  const studio = await rpc(jA, 'publish_node', { p_node_id: materijalA, p_payload: sadrzaj('S', 'obrisana-kartica'), p_base_version: vM });
  record('publish_node (Studio) s pitanjem čija je kartica obrisana PROLAZI', studio.status === 200, opis(studio));

  console.log('\n— ⑧ odbacivanje —');
  const o1 = await odbaci(jA, n5);
  record('vlastiti nacrt U IZRADI odbačen → nestao', o1.status === 200 || o1.status === 204 ? !(await nacrtPostoji(n5)) : false, opis(o1));
  const o2 = await odbaci(jA, n4);
  record('vlastiti PREDAN nacrt odbačen → nestao', (o2.status === 200 || o2.status === 204) && !(await nacrtPostoji(n4)), opis(o2));
  odbijenKao('drugo odbacivanje istog nacrta odbijeno', await odbaci(jA, n4), 'nacrt_ne_postoji');
  const kraj = await cvorovi(A.id);
  record('odbacivanje NE dira živo gradivo (A: 2 police + 7 materijala)',
    kraj.filter((c) => c.kind === 'folder').length === 2 && kraj.filter((c) => c.kind === 'study').length === 7,
    kraj.map((c) => c.kind[0]).join(''));

  record('doseg: izvedeno točno ' + OCEKIVANO_PROVJERA + ' provjera', touched === OCEKIVANO_PROVJERA,
    touched === OCEKIVANO_PROVJERA ? '' : 'izvedeno ' + touched +
      (touched < OCEKIVANO_PROVJERA ? ' ← BLOK JE PRESKOČEN' : ' ← nova provjera bez podignute osnovice'));

  await pometi();
  console.log('\n  dotaknuto: ' + touched + ' provjera, palo: ' + failed);
  console.log(failed ? '✗ PRIHVAT NE DRŽI\n' : '✅ prihvat drži\n');
  process.exit(failed ? 1 : 0);
})().catch(async (e) => {
  await pometi();
  console.log('✗ brana je pukla: ' + e.message);
  process.exit(1);
});
