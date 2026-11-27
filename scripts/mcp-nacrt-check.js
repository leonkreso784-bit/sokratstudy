// mcp-nacrt-check.js — NACRT od AI-ja (F6 ②/1, ADR-038 ①): AI piše SAMO u vlastiti nacrt.
// Pokreni: npm run mcp:nacrt   (mrežno, STAGING-only, stvara i briše jednokratne korisnike)
//
// ─── ŠTO TVRDI ──────────────────────────────────────────────────────────────────────────────────
// `mcp:brava` tvrdi DA je tokenu AI-ja otvoreno točno pet `mcp_*` funkcija. Ova brana tvrdi ŠTO te
// funkcije rade — jer su SECURITY DEFINER i time ZAOBILAZE RLS: provjera vlasnika u njima jedina je
// brava nad tuđim nacrtom. Mjeri se PRAVIM OAuth tokenom (isti put kao Claude), nikad simulacijom.
//
//   ① vlastiti nacrt: nastane, upis se PROČITA NATRAG (200 nije dokaz upisa), popis ga vidi
//   ② TUĐI nacrt: drugi korisnikov AI ga ne čita, ne mijenja, ne predaje, ne vidi na popisu — i
//      dobije ISTU grešku kao za id koji ne postoji (inače pogađanjem doznaje da postoji)
//   ③ obična sesija: vidi SAMO svoje nacrte, a ne piše u njih ni RPC-om ni izravno
//   ④ oblik i veličina: ne-objekt i > 1 MB odbijeni; prazan se ne predaje; predan je ZAMRZNUT
//   ⑤ kvota (Leon, 29.09.): 3 u izradi · 10 nepregledanih
//   ⑥ „sam nestane": u izradi netaknut 7 dana = nepostojeći i ne troši kvotu; PREDAN ne istječe
//   ⑦ ŽIVO GRADIVO NETAKNUTO: vlasnikovi `nodes` + `node_content` bajt-isti nakon SVIH poziva
//   ⑨ ②/4.2 polica i opseg na početku: obavezni, točno jedna polica, samo VLASTITA polica — u BAZI,
//      jer token isti RPC zove i mimo alata (N5); ponovljen ključ ne mijenja policu ni opseg
//
// ⚠️ Greške se sude po IMENU iz poruke (`nacrt_ne_postoji` …), ne po HTTP broju: PostgREST istim
//    brojem vraća i „nema rute" (PGRST202) — brana na broj bila bi zelena i na nepostojećoj funkciji.
//
// Ishod: exit 1 = nacrt ne drži · exit 0 + SKIP = nema STAGING_* / SERVICE u `.env`.

const crypto = require('crypto');
const {
  BASE, ANON, SERVICE, NULA,
  http, svcHeaders, ref, jeProdukcija, odbijen, noviKorisnik, pometi, prijava, oauthToken, rpc
} = require('./lib/staging-oauth');
const { valjanTocno, lekcija } = require('../tests/fixtures/ugc-sadrzaj');

/** Čegrtaljka dosega (kalup `check:final`): manje = blok tiho otpao, više = osnovica nije podignuta. */
const OCEKIVANO_PROVJERA = 55;   // +14 (②/1b, blok ⑧) · +1 (②/1b F2: 409 i trajanje sukoba) · +8 (②/4.2, blok ⑨) · −1 (②/4.3′: „ne predaje drugi put" seli u `mcp:predaja` ③)

let failed = 0;
let touched = 0;
function record(name, pass, detail) {
  touched++;
  if (!pass) failed++;
  console.log(`${pass ? '✅' : '❌'} ${name}${detail ? ' — ' + detail : ''}`);
}
function skip(why) { console.log('⏭️  SKIP — ' + why); process.exit(0); }

/** Ime greške iz odgovora (`nacrt_kvota_u_izradi: …` → `nacrt_kvota_u_izradi`), ili '' ako je prošlo. */
function greska(r) {
  if (r.status < 400) return '';
  const poruka = (r.json && r.json.message) || r.tekst || '';
  return (poruka.match(/^([a-z_]+)/) || [])[1] || ('HTTP ' + r.status);
}
const opis = (r) => 'HTTP ' + r.status + ' ' + (greska(r) || r.tekst.replace(/\s+/g, ' ').slice(0, 80));

/** Tvrdi da je poziv odbijen BAŠ tim imenom greške. */
function odbijenKao(ime, r, kod) {
  record(ime, greska(r) === kod, opis(r) + (greska(r) === kod ? '' : ' ← očekivano ' + kod));
}

/** Isti sadržaj bez obzira na redoslijed ključeva — `jsonb` ih sprema sortirane po svom (izmjereno 29.09.). */
const kanon = (v) => Array.isArray(v) ? v.map(kanon) : (v && typeof v === 'object'
  ? Object.keys(v).sort().reduce((o, k) => (o[k] = kanon(v[k]), o), {}) : v);
const isto = (a, b) => JSON.stringify(kanon(a)) === JSON.stringify(kanon(b));

// Valjan oblik gradiva (②/0a: baza provodi strogi profil — `tests/fixtures/ugc-sadrzaj.js`).
const tijeloZa = (oznaka) => lekcija({ name: 'Lekcija ' + oznaka, learn: { blocks: [{ id: 'p1', type: 'paragraph', text: 'Tekst ' + oznaka }] } });

/** Otisak vlasnikovog ŽIVOG gradiva (service ključ, zaobilazi RLS) — za tvrdnju ⑦. */
async function otisakGradiva(uid) {
  const n = await http('/rest/v1/nodes?owner_id=eq.' + uid + '&select=*&order=id', { headers: svcHeaders() });
  const nodes = await n.json();
  const ids = nodes.map((x) => x.id);
  const c = ids.length
    ? await (await http('/rest/v1/node_content?node_id=in.(' + ids.join(',') + ')&select=*&order=node_id', { headers: svcHeaders() })).json()
    : [];
  return { broj: nodes.length + '+' + c.length,
    hash: crypto.createHash('sha256').update(JSON.stringify([nodes, c])).digest('hex').slice(0, 16) };
}

/** Nacrti korisnika izravno iz tablice (service ključ) — za ⑥ fizičko brisanje. */
async function nacrtiUBazi(uid) {
  return (await http('/rest/v1/node_drafts?owner_id=eq.' + uid + '&select=id,status,updated_at', { headers: svcHeaders() })).json();
}

/** Postavi `updated_at` nacrta u prošlost — jedini način da se 7 dana izmjeri bez čekanja. */
async function ostari(id, dana) {
  const kad = new Date(Date.now() - dana * 86400000).toISOString();
  const r = await http('/rest/v1/node_drafts?id=eq.' + id, {
    method: 'PATCH', headers: Object.assign(svcHeaders(), { Prefer: 'return=minimal' }),
    body: JSON.stringify({ updated_at: kad })
  });
  if (!r.ok) throw new Error('ostari ' + r.status + ': ' + (await r.text()).slice(0, 120));
}

/** ②/4.3′ (ADR-039): AI-jeva predaja nacrt pretvori u MATERIJAL (mjeri `mcp:predaja`), pa status „predan"
 *  imaju samo nacrti predani PRIJE te odluke. Takav se ovdje glumi service ključem — on i dalje mora biti
 *  zamrznut, ne istjecati i trošiti kvotu nepregledanih. */
async function oznaciPredan(id) {
  const r = await http('/rest/v1/node_drafts?id=eq.' + id, {
    method: 'PATCH', headers: Object.assign(svcHeaders(), { Prefer: 'return=minimal' }),
    body: JSON.stringify({ status: 'predan', submitted_at: new Date().toISOString() })
  });
  if (!r.ok) throw new Error('oznaciPredan ' + r.status + ': ' + (await r.text()).slice(0, 120));
}

// ②/1b: svaki početak nosi KLJUČ PONAVLJANJA (obavezan), svaki upis VERZIJU od koje kreće.
// Pomoćnici drže stare blokove čitljivima; blok ⑧ ih zove izravno kad mjeri upravo te dvije stvari.
let kljucBr = 0;
// ②/4.2: polica i opseg su obavezni — stari blokovi daju novu policu po imenu i standardni opseg.
const zapocni = (t, ime, kljuc, dodatak) => rpc(t, 'mcp_zapocni_nacrt', Object.assign({ p_name: ime,
  p_kljuc: kljuc || ('k-' + Date.now() + '-' + (++kljucBr)), p_polica: null, p_nova_polica: 'Polica', p_opseg: 'standardno' }, dodatak || {}));
async function verzijaOd(t, id) { const r = await rpc(t, 'mcp_procitaj_nacrt', { p_id: id }); return r.json && r.json.verzija; }
async function upisi(t, id, payload, verzija) {
  return rpc(t, 'mcp_upisi_nacrt', { p_id: id, p_payload: payload, p_verzija: verzija != null ? verzija : ((await verzijaOd(t, id)) || 1) });
}

const rest = (token, put, opts = {}) => http('/rest/v1/' + put, Object.assign({}, opts, {
  headers: Object.assign({ apikey: ANON, Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }, opts.headers || {})
}));

(async () => {
  if (!BASE || !ANON) skip('nema STAGING_SUPABASE_URL / STAGING_SUPABASE_ANON u .env');
  if (!SERVICE) skip('nema STAGING_SUPABASE_SERVICE_KEY (brana stvara i briše jednokratne korisnike)');
  if (jeProdukcija()) {
    console.log('❌ ODBIJENO: ova brana piše i briše — PRODUKCIJA je zabranjena (CLAUDE #8).');
    process.exit(1);
  }
  console.log('\n=== mcp:nacrt === (staging ' + ref() + ')\n');

  // Tri korisnika: A (vlasnik), B (stranac), C (kvota i istjecanje — da brojanje ne ovisi o A).
  const [A, B, C] = [await noviKorisnik({ prefiks: 'mcp-nacrt' }), await noviKorisnik({ prefiks: 'mcp-nacrt' }),
    await noviKorisnik({ prefiks: 'mcp-nacrt' })];
  const jA = await prijava(A.email, A.password);
  const jB = await prijava(B.email, B.password);
  const jC = await prijava(C.email, C.password);
  const aA = (await oauthToken(jA, 'Sokrat nacrt (test)')).token;
  const aB = (await oauthToken(jB, 'Sokrat nacrt (test)')).token;
  const aC = (await oauthToken(jC, 'Sokrat nacrt (test)')).token;
  // D (blok ⑧, ②/1b) se stvara OVDJE, ne usred vrtnje: stvoren poslije bloka ⑥ je svaki put zapeo
  // na 20 s isteku (izmjereno 30.09.), a izolirano isti koraci traju < 1 s.
  const D = await noviKorisnik({ prefiks: 'mcp-nacrt' });
  const jD = await prijava(D.email, D.password);
  const aD = (await oauthToken(jD, 'Sokrat nacrt (test)')).token;

  // A ima pravo živo gradivo (polica + materijal sa sadržajem), napravljeno OBIČNOM sesijom —
  // da ⑦ mjeri nešto, a ne prazan skup.
  const polica = (await rpc(jA, 'create_node', { p_parent: null, p_kind: 'folder', p_name: 'Polica' })).json;
  const mat = (await rpc(jA, 'create_node', { p_parent: polica, p_kind: 'study', p_name: 'Materijal' })).json;
  const verzija = ((await (await rest(jA, 'node_content?node_id=eq.' + mat + '&select=version')).json())[0] || {}).version;
  await rpc(jA, 'publish_node', { p_node_id: mat, p_payload: lekcija({ name: 'Živo' }), p_base_version: verzija });
  const prije = await otisakGradiva(A.id);

  console.log('— ① vlastiti nacrt —');
  const z = await zapocni(aA, 'Makroekonomija');
  const idA = typeof z.json === 'string' ? z.json : null;
  record('AI započne nacrt', !!idA, opis(z));
  const sadrzaj = tijeloZa('A');
  const u = await upisi(aA, idA, sadrzaj);
  const p = await rpc(aA, 'mcp_procitaj_nacrt', { p_id: idA });
  record('upis se PROČITA NATRAG (isti sadržaj, status u_izradi)',
    u.status === 200 && p.json && isto(p.json.payload, sadrzaj) && p.json.status === 'u_izradi',
    'upis ' + opis(u) + ' · čitanje ' + opis(p));
  const lista = await rpc(aA, 'mcp_moji_nacrti', {});
  record('popis vlastitih nacrta ga vidi (bez sadržaja)',
    Array.isArray(lista.json) && lista.json.length === 1 && lista.json[0].id === idA && !('payload' in lista.json[0]),
    opis(lista) + ' · ' + (Array.isArray(lista.json) ? lista.json.length + ' nacrt(a)' : '—'));

  console.log('\n— ② tuđi nacrt: drugi korisnikov AI —');
  const tudjeCit = await rpc(aB, 'mcp_procitaj_nacrt', { p_id: idA });
  odbijenKao('tuđi nacrt se NE ČITA', tudjeCit, 'nacrt_ne_postoji');
  odbijenKao('tuđi nacrt se NE MIJENJA', await upisi(aB, idA, tijeloZa('B')), 'nacrt_ne_postoji');
  odbijenKao('tuđi nacrt se NE PREDAJE', await rpc(aB, 'mcp_predaj_nacrt', { p_id: idA }), 'nacrt_ne_postoji');
  const nepostojeci = await rpc(aB, 'mcp_procitaj_nacrt', { p_id: NULA });
  record('tuđi i nepostojeći nacrt daju ISTI odgovor (postojanje se ne da pogoditi)',
    tudjeCit.status === nepostojeci.status && tudjeCit.tekst === nepostojeci.tekst,
    'tuđi ' + opis(tudjeCit) + ' · nepostojeći ' + opis(nepostojeci));
  const listaB = await rpc(aB, 'mcp_moji_nacrti', {});
  record('tuđi nacrt nije na strančevom popisu', Array.isArray(listaB.json) && listaB.json.length === 0, opis(listaB));
  const nakonB = await rpc(aA, 'mcp_procitaj_nacrt', { p_id: idA });
  record('A-ov nacrt je poslije strančevih pokušaja NETAKNUT',
    nakonB.json && isto(nakonB.json.payload, sadrzaj) && nakonB.json.status === 'u_izradi',
    nakonB.json ? 'status ' + nakonB.json.status : opis(nakonB));

  console.log('\n— ③ obična sesija (bez AI-ja) —');
  const vidiA = await (await rest(jA, 'node_drafts?select=id')).json();
  record('vlasnik u običnoj sesiji VIDI svoj nacrt (za pregled u ②/4)',
    Array.isArray(vidiA) && vidiA.length === 1 && vidiA[0].id === idA, JSON.stringify(vidiA).slice(0, 80));
  const vidiB = await (await rest(jB, 'node_drafts?select=id')).json();
  record('stranac u običnoj sesiji NE VIDI tuđi nacrt', Array.isArray(vidiB) && vidiB.length === 0, JSON.stringify(vidiB).slice(0, 80));
  const rpcObicna = await zapocni(jA, 'Mimo AI-ja');
  record('obična sesija NE ZOVE mcp_* (put u nacrt je samo AI-jev)', odbijen(rpcObicna.status, rpcObicna.tekst), opis(rpcObicna));
  const ins = await rest(jA, 'node_drafts', { method: 'POST', headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({ owner_id: A.id, client_id: 'lazni', name: 'Izravno' }) });
  record('izravan INSERT u node_drafts odbijen', ins.status === 401 || ins.status === 403, 'HTTP ' + ins.status);
  const upd = await rest(jA, 'node_drafts?id=eq.' + idA, { method: 'PATCH', headers: { Prefer: 'return=representation' },
    body: JSON.stringify({ status: 'predan', submitted_at: new Date().toISOString() }) });
  record('izravan UPDATE vlastitog nacrta odbijen', upd.status === 401 || upd.status === 403, 'HTTP ' + upd.status);
  const del = await rest(jA, 'node_drafts?id=eq.' + idA, { method: 'DELETE', headers: { Prefer: 'return=representation' } });
  record('izravan DELETE odbijen (Odbaci je ②/4, kroz RPC)', del.status === 401 || del.status === 403, 'HTTP ' + del.status);
  const aiTablica = await rest(aA, 'node_drafts?select=id');
  record('AI ne čita tablicu izravno (samo kroz mcp_procitaj_nacrt)',
    aiTablica.status === 401 || aiTablica.status === 403, 'HTTP ' + aiTablica.status);

  console.log('\n— ④ oblik, veličina, predaja —');
  odbijenKao('sadržaj koji nije objekt odbijen', await upisi(aA, idA, [1, 2]), 'nacrt_los_oblik');
  const golem = valjanTocno(1048577);   // valjan oblik, jedan bajt preko — odbija VELIČINA, ne profil
  odbijenKao('sadržaj > 1 MB odbijen', await upisi(aA, idA, golem), 'nacrt_prevelik');
  const tik = valjanTocno(1048576);   // valjan oblik, TOČNO 1 048 576 bajtova u `jsonb::text`
  const tikR = await upisi(aA, idA, tik);
  record('sadržaj TOČNO 1 MB prolazi (granica nije pomaknuta)', tikR.status === 200, opis(tikR));
  await upisi(aA, idA, sadrzaj);
  const prazan = (await zapocni(aA, 'Prazan')).json;
  odbijenKao('prazan nacrt se ne predaje', await rpc(aA, 'mcp_predaj_nacrt', { p_id: prazan }), 'nacrt_prazan');
  await oznaciPredan(idA);
  const poPredaji = await rpc(aA, 'mcp_procitaj_nacrt', { p_id: idA });
  record('stari predan nacrt (prije ADR-039): AI ga čita, status predan + vrijeme predaje', poPredaji.status === 200 && poPredaji.json &&
    poPredaji.json.status === 'predan' && !!poPredaji.json.submitted_at, opis(poPredaji));
  odbijenKao('predan nacrt se više NE MIJENJA', await upisi(aA, idA, tijeloZa('kasno')), 'nacrt_predan');

  console.log('\n— ⑤ kvota (korisnik C) —');
  const izrada = [];
  for (let i = 0; i < 3; i++) izrada.push((await zapocni(aC, 'C' + i)).json);
  record('tri nacrta u izradi nastanu', izrada.every((x) => typeof x === 'string'), izrada.length + ' id-eva');
  odbijenKao('ČETVRTI nacrt u izradi odbijen', await zapocni(aC, 'C3'), 'nacrt_kvota_u_izradi');

  console.log('\n— ⑥ „sam nestane" (korisnik C) —');
  await ostari(izrada[0], 8);
  odbijenKao('nacrt u izradi netaknut 8 dana više NE POSTOJI za AI', await rpc(aC, 'mcp_procitaj_nacrt', { p_id: izrada[0] }), 'nacrt_ne_postoji');
  const vidiC = await (await rest(jC, 'node_drafts?select=id')).json();
  record('ni vlasnik ga u običnoj sesiji više ne vidi', Array.isArray(vidiC) && !vidiC.some((d) => d.id === izrada[0]),
    (Array.isArray(vidiC) ? vidiC.length : '?') + ' vidljivih');
  const noviC = await zapocni(aC, 'C-poslije');
  record('istekao nacrt NE troši kvotu (novi prolazi uz 2 živa u izradi)', typeof noviC.json === 'string', opis(noviC));
  const uBazi = await nacrtiUBazi(C.id);
  record('istekao nacrt je FIZIČKI obrisan pri sljedećem započinjanju', !uBazi.some((d) => d.id === izrada[0]),
    uBazi.length + ' redaka u tablici');
  // Predan nacrt NE istječe: ostari ga i provjeri da je i dalje tu.
  await upisi(aC, izrada[1], tijeloZa('C1'));
  await oznaciPredan(izrada[1]);
  await ostari(izrada[1], 30);
  const stari = await rpc(aC, 'mcp_procitaj_nacrt', { p_id: izrada[1] });
  record('PREDAN nacrt star 30 dana i dalje postoji (čeka korisnikov pregled)',
    stari.json && stari.json.status === 'predan', opis(stari));

  // Do 10 nepregledanih: sad su živa 3 (C1 predan, C2 i C-poslije u izradi). Predaj ih i dopuni.
  for (const id of [izrada[2], noviC.json]) {
    await upisi(aC, id, tijeloZa('C'));
    await oznaciPredan(id);
  }
  let dopuna = 0;
  while ((await rpc(aC, 'mcp_moji_nacrti', {})).json.length < 10 && dopuna < 12) {
    const id = (await zapocni(aC, 'D' + dopuna)).json;
    await upisi(aC, id, tijeloZa('D'));
    await oznaciPredan(id);
    dopuna++;
  }
  const deset = (await rpc(aC, 'mcp_moji_nacrti', {})).json;
  record('deset nepregledanih nacrta nastane', Array.isArray(deset) && deset.length === 10, (deset || []).length + ' živih');
  odbijenKao('JEDANAESTI nacrt odbijen (10 čeka pregled)', await zapocni(aC, 'C11'), 'nacrt_kvota_nepregledano');

  console.log('\n— ⑧ ②/1b: usporedno i ponovljeno (korisnik D) —');
  // stari potpisi NE POSTOJE — preopterećenje bi ostavilo put bez verzije/ključa, a `mcp:brava` sudi po imenu
  const stariUpis = await rpc(aD, 'mcp_upisi_nacrt', { p_id: NULA, p_payload: tijeloZa('x') });
  record('stari potpis mcp_upisi_nacrt(id, payload) BEZ verzije ne postoji', stariUpis.status === 404 && /PGRST202/.test(stariUpis.tekst), opis(stariUpis));
  const stariPocetak = await rpc(aD, 'mcp_zapocni_nacrt', { p_name: 'bez ključa' });
  record('stari potpis mcp_zapocni_nacrt(name) BEZ ključa ne postoji', stariPocetak.status === 404 && /PGRST202/.test(stariPocetak.tekst), opis(stariPocetak));
  odbijenKao('ključ krivog oblika odbijen', await zapocni(aD, 'x', 'ima razmak'), 'nacrt_los_kljuc');

  // N8: isti ključ = isti nacrt
  const k1 = await zapocni(aD, 'Isti', 'razgovor-1');
  const k1b = await zapocni(aD, 'Isti opet', 'razgovor-1');
  record('isti ključ dvaput → ISTI nacrt (N8)', typeof k1.json === 'string' && k1.json === k1b.json, opis(k1) + ' · ' + opis(k1b));
  const popisD = (await rpc(aD, 'mcp_moji_nacrti', {})).json;
  record('… i na popisu je JEDAN nacrt s verzijom 1', Array.isArray(popisD) && popisD.length === 1 && popisD[0].verzija === 1,
    Array.isArray(popisD) ? popisD.length + ' nacrt(a)' : String(popisD));
  const tudjiKljuc = await zapocni(aB, 'Tuđi', 'razgovor-1');
  record('STRANAC s istim ključem dobiva SVOJ nacrt, ne D-ov', typeof tudjiKljuc.json === 'string' && tudjiKljuc.json !== k1.json, opis(tudjiKljuc));

  // N7: USPOREDNI upisi s ISTE polazne verzije → točno jedan prolazi, svi ostali dobivaju sukob.
  // ⚠️ Dva upisa (do 30.09.) nisu dokazivala usporednost: stignu li jedan za drugim, drugi vidi novu
  //    verziju i bez ikakve brave (revizor ②/1b F1). Zato 8 upisa pokrenutih USPOREDNO s klijenta.
  //    Ispis „pokrenuto usporedno (klijent)" hvata samo preradu u slijedni `for … await`; da se upisi
  //    preklapaju U BAZI, dokazuje JEDINO mutacija „`_nacrt_moj` bez `for update`" (30.09.: pala 5/5,
  //    svaki put 2×200) — i samo se njome ponovno dokazuje.
  // ⚠️ Sukob se sudi po HTTP 409 i TRAJANJU, ne samo po imenu (F2): sa SQLSTATE `40001` PostgREST
  //    transakciju ponavlja SAM, u krug — poziv visi pa pukne na 20 s isteku. To je imenovan pad.
  const v0 = await verzijaOd(aD, k1.json);
  const USPOREDNO = 8;
  const tijela = Array.from({ length: USPOREDNO }, (_, i) => tijeloZa('usporedni-' + i));
  const mjeri = async (payload) => {
    const t0 = Date.now();
    try { const r = await upisi(aD, k1.json, payload, v0); return { r, t0, t1: Date.now() }; }
    catch (e) { return { r: { status: 0, tekst: 'PREKINUT: ' + e.message, json: null }, t0, t1: Date.now(), prekinut: true }; }
  };
  const ishodi = await Promise.all(tijela.map(mjeri));
  const prosli = ishodi.filter((x) => x.r.status === 200);
  const sukobi = ishodi.filter((x) => greska(x.r) === 'nacrt_sukob');
  const preklop = ishodi.filter((a, i) => ishodi.some((b, j) => j !== i && a.t0 < b.t1 && b.t0 < a.t1)).length;
  const sazetak = prosli.length + '×200 · ' + sukobi.length + '×nacrt_sukob · ' + preklop + '/' + USPOREDNO + ' pokrenuto usporedno (klijent)'
    + (ishodi.length - prosli.length - sukobi.length ? ' · ostalo: ' + ishodi.filter((x) => x.r.status !== 200 && greska(x.r) !== 'nacrt_sukob').map((x) => opis(x.r)).join(' | ') : '');
  record(USPOREDNO + ' usporednih upisa s iste verzije → TOČNO jedan 200, svi ostali `nacrt_sukob` (N7)',
    prosli.length === 1 && sukobi.length === USPOREDNO - 1 && preklop >= 2,
    sazetak + (preklop < 2 ? ' ← upisi su išli SLIJEDNO, usporednost nije ni pokušana' : ''));
  const sporo = ishodi.filter((x) => x.r.status !== 200).map((x) => ({ s: x.r.status, ms: x.t1 - x.t0, prekinut: !!x.prekinut }));
  const loseSukobi = sporo.filter((x) => x.s !== 409 || x.ms >= 5000);
  record('svaki sukob je HTTP 409 i stiže za < 5 s (nije `40001`-petlja PostgREST-a)',
    sporo.length === USPOREDNO - 1 && loseSukobi.length === 0,
    'odbijenih ' + sporo.length + ', najsporiji ' + Math.max(0, ...sporo.map((x) => x.ms)) + ' ms'
      + (loseSukobi.length ? ' ← ' + loseSukobi.map((x) => (x.prekinut ? 'PREKINUT' : 'HTTP ' + x.s) + ' ' + x.ms + ' ms').join(', ')
        + (loseSukobi.some((x) => x.prekinut || x.ms >= 5000) ? ' — `40001`-PETLJA: PostgREST ponavlja transakciju sam' : '') : ''));
  const pobjednik = prosli.length ? tijela[ishodi.indexOf(prosli[0])] : null;
  const poN7 = (await rpc(aD, 'mcp_procitaj_nacrt', { p_id: k1.json })).json;
  record('… u nacrtu je pobjednikov sadržaj i verzija +1', !!poN7 && isto(poN7.payload, pobjednik) && poN7.verzija === v0 + 1,
    poN7 ? 'verzija ' + v0 + ' → ' + poN7.verzija : '—');
  // izgubljen ODGOVOR, ne upis: isti upis ponovljen s iste polazne verzije vraća postojeću verziju
  const ponovljen = await upisi(aD, k1.json, pobjednik, v0);
  record('isti upis ponovljen (isti sadržaj, ista polazna) → 200, verzija se NE mijenja', ponovljen.status === 200 && ponovljen.json === v0 + 1
    && (await verzijaOd(aD, k1.json)) === v0 + 1, opis(ponovljen) + ' · vraćeno ' + ponovljen.json);
  odbijenKao('zastarjela verzija s DRUGIM sadržajem → sukob (ne prepisuje)', await upisi(aD, k1.json, tijeloZa('staro'), v0), 'nacrt_sukob');
  const netaknut = (await rpc(aD, 'mcp_procitaj_nacrt', { p_id: k1.json })).json;
  record('… nacrt poslije odbijenog upisa netaknut', !!netaknut && isto(netaknut.payload, pobjednik) && netaknut.verzija === v0 + 1,
    netaknut ? 'verzija ' + netaknut.verzija : '—');

  // ključ i kvota: ponovljen početak na punoj kvoti NE troši kvotu; nov ključ je odbijen
  await zapocni(aD, 'D2', 'razgovor-2');
  await zapocni(aD, 'D3', 'razgovor-3');
  const naKvoti = await zapocni(aD, 'Isti', 'razgovor-1');
  record('na punoj kvoti (3 u izradi) ponovljen ključ vraća postojeći nacrt, ne grešku kvote', naKvoti.json === k1.json, opis(naKvoti));
  odbijenKao('… a NOV ključ na punoj kvoti je odbijen', await zapocni(aD, 'D4', 'razgovor-4'), 'nacrt_kvota_u_izradi');
  // istekao nacrt ne oživi istim ključem
  await ostari(k1.json, 8);
  const poIsteku = await zapocni(aD, 'Isti', 'razgovor-1');
  record('nacrt istekao pa isti ključ → NOVI nacrt (istekao ne oživi)', typeof poIsteku.json === 'string' && poIsteku.json !== k1.json, opis(poIsteku));

  console.log('\n— ⑨ ②/4.2 polica i opseg (izravno na bazi, mimo alata) —');
  const staraDva = await rpc(aA, 'mcp_zapocni_nacrt', { p_name: 'dva', p_kljuc: 'stari-2' });
  record('stari potpis mcp_zapocni_nacrt(name, ključ) BEZ police i opsega ne postoji', staraDva.status === 404 && /PGRST202/.test(staraDva.tekst), opis(staraDva));
  odbijenKao('bez opsega odbijeno', await zapocni(aA, 'x', 'p9-1', { p_opseg: null }), 'nacrt_opseg');
  odbijenKao('bez police odbijeno', await zapocni(aA, 'x', 'p9-2', { p_nova_polica: null }), 'nacrt_polica');
  odbijenKao('i postojeća i nova polica odjednom odbijeno', await zapocni(aA, 'x', 'p9-3', { p_polica: polica }), 'nacrt_polica');
  const tudjaPolica = (await rpc(jB, 'create_node', { p_parent: null, p_kind: 'folder', p_name: 'Tuđa' })).json;
  odbijenKao('TUĐA polica odbijena', await zapocni(aA, 'x', 'p9-4', { p_polica: tudjaPolica, p_nova_polica: null }), 'nacrt_polica_ne_postoji');
  odbijenKao('materijal umjesto police odbijen istom greškom', await zapocni(aA, 'x', 'p9-5', { p_polica: mat, p_nova_polica: null }), 'nacrt_polica_ne_postoji');
  const s9 = await zapocni(aA, 'S policom', 'p9-6', { p_polica: polica, p_nova_polica: null, p_opseg: 'detaljno' });
  const r9 = typeof s9.json === 'string' ? (await (await http('/rest/v1/node_drafts?id=eq.' + s9.json + '&select=polica_id,nova_polica,opseg', { headers: svcHeaders() })).json())[0] : null;
  record('vlastita polica + opseg → u bazi polica_id i opseg (nova_polica prazna)', !!r9 && r9.polica_id === polica && r9.nova_polica === null && r9.opseg === 'detaljno',
    opis(s9) + ' · ' + JSON.stringify(r9));
  const s9b = await zapocni(aA, 'S policom', 'p9-6', { p_polica: null, p_nova_polica: 'Druga', p_opseg: 'sazeto' });
  const r9b = (await (await http('/rest/v1/node_drafts?id=eq.' + s9.json + '&select=polica_id,nova_polica,opseg', { headers: svcHeaders() })).json())[0];
  record('isti ključ s DRUGOM policom i opsegom → isti nacrt, polica i opseg NEPROMIJENJENI', s9b.json === s9.json && !!r9b &&
    r9b.polica_id === polica && r9b.opseg === 'detaljno', opis(s9b) + ' · ' + JSON.stringify(r9b));

  console.log('\n— ⑦ živo gradivo —');
  const poslije = await otisakGradiva(A.id);
  record('vlasnikovi nodes + node_content bajt-isti nakon SVIH MCP poziva',
    prije.hash === poslije.hash && prije.broj === '2+1', 'prije ' + prije.broj + ' ' + prije.hash + ' · poslije ' + poslije.broj + ' ' + poslije.hash);

  record('doseg: izvedeno točno ' + OCEKIVANO_PROVJERA + ' provjera', touched === OCEKIVANO_PROVJERA,
    touched === OCEKIVANO_PROVJERA ? '' : 'izvedeno ' + touched +
      (touched < OCEKIVANO_PROVJERA ? ' ← BLOK JE PRESKOČEN' : ' ← nova provjera bez podignute osnovice'));

  await pometi();
  console.log('\n  dotaknuto: ' + touched + ' provjera, palo: ' + failed);
  console.log(failed ? '✗ NACRT NE DRŽI\n' : '✅ nacrt drži\n');
  process.exit(failed ? 1 : 0);
})().catch(async (e) => {
  await pometi();
  console.log('✗ brana je pukla: ' + e.message);
  process.exit(1);
});
