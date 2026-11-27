// ugc-sadrzaj-check.js — BAZA provodi strogi profil osobnog sadržaja na putovima upisa (F6 ②/0a–b):
// NACRT (②/0a, AI) i OBJAVA `publish_node` (②/0b, Studio); Prihvati (②/4) dobiva svoj blok kad nastane.
// Pokreni: npm run ugc:sadrzaj   (mrežno, STAGING-only, stvara i briše jednokratne korisnike)
//
// ─── ZAŠTO BAZA, A NE MCP POSLUŽITELJ ───────────────────────────────────────────────────────────
// Token AI-ja zove `mcp_*` RPC-ove i MIMO našeg poslužitelja (MCP_SECURITY N5, izmjereno S-B: svih 8
// zlonamjernih oblika ušlo je u nacrt). Korisnik nacrt GLEDA prije Prihvati, pa sigurnosno pravilo
// koje živi samo u poslužitelju ne vrijedi baš ondje gdje treba. Zato ga provodi baza — i na objavi,
// jer Prihvati ide tim putem, a objava od 5 MB je prolazila (N4, N13).
//
// ─── ŠTO TVRDI ──────────────────────────────────────────────────────────────────────────────────
//   ① nacrt (`mcp_upisi_nacrt`, pravi AI-token): svaki primjer iz `pada` odbijen BAŠ imenom
//      `sadrzaj_neispravan`; svaki iz `prolazi` upisan i PROČITAN NATRAG isti
//   ② objava (`publish_node`, obična sesija vlasnika): isto, uz granicu 1 MB (`publish_prevelik`):
//      točno 1 MB prolazi, bajt više i 5 MB ne; odbijena objava NE MIJENJA verziju ni sadržaj
//   ③ shema u bazi == `schema/ugc-content.schema.json` (živi drift: generirani SQL može biti ispravan
//      u repou, a star na stagingu)
//   ④ ZATEČENO: svaki živ osobni materijal na stagingu prolazi shemu, osim IMENOVANIH ostataka
//      testova (`ugc-zateceno-baseline.json`) — stroga objava ne smije tiho zaključati postojeće
//      gradivo. Čegrtaljka: nov prekršitelj = pad, nestao s popisa = pad (spusti osnovicu).
//
// Primjeri su ZAJEDNIČKI s unit-testom sheme (`tests/fixtures/ugc-sadrzaj.js`) i dijelom generirani
// iz same sheme: baza i shema se ne mogu razići a da jedna od brana to ne vidi.
//
// ⚠️ Greška se sudi po IMENU, ne po HTTP broju: odbijanje iz bilo kojeg drugog razloga (veličina,
//    oblik, nepostojeća funkcija) nije dokaz da validator radi.
//
// Ishod: exit 1 = baza propušta · exit 0 + SKIP = nema STAGING_* / SERVICE u `.env`.

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const {
  BASE, ANON, SERVICE,
  http, svcHeaders, ref, jeProdukcija, noviKorisnik, pometi, prijava, oauthToken, rpc
} = require('./lib/staging-oauth');
const { prolazi, pada, valjanTocno } = require('../tests/fixtures/ugc-sadrzaj');

const SHEMA_PUT = path.join(__dirname, '..', 'schema', 'ugc-content.schema.json');
const OSNOVICA_PUT = path.join(__dirname, 'ugc-zateceno-baseline.json');

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
const opis = (r) => 'HTTP ' + r.status + ' ' + (greska(r) || '')
  + (r.status >= 400 ? ' · ' + ((r.json && r.json.message) || r.tekst || '').replace(/\s+/g, ' ').slice(0, 90) : '');
const ocekivanoIme = (p) => (p.jsonbOdbija ? 'unsupported' : 'sadrzaj_neispravan');

const kanon = (v) => Array.isArray(v) ? v.map(kanon) : (v && typeof v === 'object'
  ? Object.keys(v).sort().reduce((o, k) => (o[k] = kanon(v[k]), o), {}) : v);
const isto = (a, b) => JSON.stringify(kanon(a)) === JSON.stringify(kanon(b));

/** Sadržaj i verzija materijala, čitano vlasnikovom sesijom (RLS: SELECT na vlastito). */
async function stanje(jwt, nodeId) {
  const r = await http('/rest/v1/node_content?node_id=eq.' + nodeId + '&select=version,payload', {
    headers: { apikey: ANON, Authorization: 'Bearer ' + jwt }
  });
  return ((await r.json()) || [])[0] || {};
}

/** Svi ŽIVI osobni materijali na stagingu (service ključ, zaobilazi RLS), stranica po stranica. */
async function sviZivi() {
  let sve = [];
  for (let od = 0; ; od += 500) {
    const r = await http('/rest/v1/node_content?select=node_id,payload,nodes!inner(deleted_at)&nodes.deleted_at=is.null'
      + '&order=node_id&offset=' + od + '&limit=500', { headers: svcHeaders() });
    const j = await r.json();
    if (!Array.isArray(j)) throw new Error('node_content: ' + JSON.stringify(j).slice(0, 120));
    sve = sve.concat(j);
    if (j.length < 500) return sve;
  }
}

(async () => {
  if (!BASE || !ANON) skip('nema STAGING_SUPABASE_URL / STAGING_SUPABASE_ANON u .env');
  if (!SERVICE) skip('nema STAGING_SUPABASE_SERVICE_KEY (brana stvara i briše jednokratne korisnike)');
  if (jeProdukcija()) {
    console.log('❌ ODBIJENO: ova brana piše i briše — PRODUKCIJA je zabranjena (CLAUDE #8).');
    process.exit(1);
  }
  console.log('\n=== ugc:sadrzaj === (staging ' + ref() + ')\n');
  if (pada.length < 30 || prolazi.length < 10) { console.log('❌ premalo primjera — brana ne bi mjerila ništa'); process.exit(1); }

  const A = await noviKorisnik({ prefiks: 'ugc-sadrzaj' });
  const jA = await prijava(A.email, A.password);
  const aA = (await oauthToken(jA, 'Sokrat sadrzaj (test)')).token;

  console.log('— ① nacrt: mcp_upisi_nacrt (pravi AI-token) —');
  const nacrt = (await rpc(aA, 'mcp_zapocni_nacrt', { p_name: 'Validator', p_kljuc: 'ugc-sadrzaj-' + Date.now(), p_polica: null, p_nova_polica: 'Polica', p_opseg: 'standardno' })).json;
  let verzija = 1;   // ②/1b: upis nosi polaznu verziju; odbijen upis je ne mijenja
  if (typeof nacrt !== 'string') throw new Error('nacrt nije nastao');
  for (const p of pada) {
    const r = await rpc(aA, 'mcp_upisi_nacrt', { p_id: nacrt, p_payload: p.payload, p_verzija: verzija });
    if (r.status === 200) verzija = r.json;   // krivo prošao: prati verziju, inače svaki sljedeći mjeri `nacrt_sukob`
    const ime = ocekivanoIme(p);
    record('nacrt ODBIJA: ' + p.ime, greska(r) === ime, opis(r) + (greska(r) === ime ? '' : ' ← očekivano ' + ime));
  }
  for (const p of prolazi) {
    const u = await rpc(aA, 'mcp_upisi_nacrt', { p_id: nacrt, p_payload: p.payload, p_verzija: verzija });
    if (u.status === 200) verzija = u.json;
    const c = u.status === 200 ? await rpc(aA, 'mcp_procitaj_nacrt', { p_id: nacrt }) : null;
    record('nacrt PRIMA i čita natrag: ' + p.ime, !!(c && c.json && isto(c.json.payload, p.payload)), opis(u));
  }

  console.log('\n— ② objava: publish_node (obična sesija vlasnika) —');
  const polica = (await rpc(jA, 'create_node', { p_parent: null, p_kind: 'folder', p_name: 'Polica' })).json;
  const mat = (await rpc(jA, 'create_node', { p_parent: polica, p_kind: 'study', p_name: 'Validator' })).json;
  if (typeof mat !== 'string') throw new Error('materijal nije nastao');
  let s = await stanje(jA, mat);
  const prije = s;
  for (const p of pada) {
    const r = await rpc(jA, 'publish_node', { p_node_id: mat, p_payload: p.payload, p_base_version: s.version });
    const ime = ocekivanoIme(p);
    record('objava ODBIJA: ' + p.ime, greska(r) === ime, opis(r) + (greska(r) === ime ? '' : ' ← očekivano ' + ime));
    // Ako je (krivo) prošla, verzija je porasla — prati je, inače bi SVAKI sljedeći pao na sukobu
    // verzije i brana bi mjerila `publish_version_conflict` umjesto validatora.
    if (r.status === 200) s = await stanje(jA, mat);
  }
  const poOdbijenima = await stanje(jA, mat);
  record('odbijene objave NISU promijenile materijal (verzija i sadržaj isti)',
    poOdbijenima.version === prije.version && isto(poOdbijenima.payload, prije.payload), 'verzija ' + prije.version + ' → ' + poOdbijenima.version);
  for (const p of prolazi) {
    const r = await rpc(jA, 'publish_node', { p_node_id: mat, p_payload: p.payload, p_base_version: s.version });
    const novo = r.status === 200 ? await stanje(jA, mat) : s;
    record('objava PRIMA i čita natrag: ' + p.ime, r.status === 200 && isto(novo.payload, p.payload), opis(r));
    s = novo;
  }
  const velicine = [
    ['objava TOČNO 1 MB (valjan oblik) prolazi', valjanTocno(1048576), ''],
    ['objava 1 MB + 1 bajt odbijena', valjanTocno(1048577), 'publish_prevelik'],
    ['objava ~5 MB (N13) odbijena', valjanTocno(5 * 1048576), 'publish_prevelik']
  ];
  for (const [ime, payload, kod] of velicine) {
    const r = await rpc(jA, 'publish_node', { p_node_id: mat, p_payload: payload, p_base_version: s.version });
    record(ime, kod ? greska(r) === kod : r.status === 200, opis(r) + (kod && greska(r) !== kod ? ' ← očekivano ' + kod : ''));
    if (r.status === 200) s = await stanje(jA, mat);
  }

  console.log('\n— ③ shema u bazi == datoteka —');
  const dat = JSON.parse(fs.readFileSync(SHEMA_PUT, 'utf8'));
  const r = await http('/rest/v1/rpc/_ugc_shema', { method: 'POST', headers: svcHeaders(), body: '{}' });
  const uBazi = r.ok ? await r.json() : null;
  record('`_ugc_shema()` na stagingu == schema/ugc-content.schema.json', !!uBazi && isto(uBazi, dat),
    r.ok ? (isto(uBazi, dat) ? '' : 'RAZLIKUJE SE — pokreni build:ugc-sql i primijeni SQL') : 'HTTP ' + r.status);

  await pometi();   // prije ④: jednokratni korisnik i njegov materijal ne smiju ući u zatečeno

  console.log('\n— ④ zatečeno gradivo na stagingu —');
  const provjeri = new Ajv({ allowUnionTypes: true }).compile(dat);
  const osnovica = JSON.parse(fs.readFileSync(OSNOVICA_PUT, 'utf8'));
  const imenovani = new Set(osnovica.node_ids);
  const zivi = (await sviZivi()).filter((x) => x.payload && Object.keys(x.payload).length);
  // Uz shemu i ono što zna SAMO baza (jedinstveni id-evi, ista pravila kao `_provjeri_sadrzaj`) —
  // inače bi materijal s dva ista id-a prošao ④, a baza bi mu zaključala sljedeću objavu.
  const dupliId = (p) => Object.values(p).some((c) => c && typeof c === 'object' && [c.flashcards, c.quiz, c.fillBlanks, c.learn && c.learn.blocks]
    .some((niz) => Array.isArray(niz) && (() => { const ids = niz.map((e) => e && e.id).filter((x) => x != null); return new Set(ids).size !== ids.length; })()));
  const padaju = zivi.filter((x) => !provjeri(x.payload) || dupliId(x.payload)).map((x) => x.node_id);
  const novi = padaju.filter((id) => !imenovani.has(id));
  const nestali = osnovica.node_ids.filter((id) => !padaju.includes(id));
  // Broje se VALJANI: da su svi živi u osnovici, „ima živih" bi prošlo s nula izmjerenih (revizor 30.09.).
  record('ima VALJANIH živih materijala za mjeriti (nula = brana ne mjeri ništa)', zivi.length - padaju.length > 0,
    (zivi.length - padaju.length) + ' valjanih od ' + zivi.length + ' nepraznih');
  record('nijedan NOV materijal ne pada shemu (stroga objava ga ne bi pustila spremiti)', novi.length === 0,
    novi.length ? 'novi: ' + novi.join(', ') : padaju.length + ' pada, svi imenovani ostaci testova');
  record('osnovica nema mrtvih redaka (popravljen ili obrisan ostatak → makni ga s popisa)', nestali.length === 0,
    nestali.join(', ') || 'nema');

  const ocekivano = pada.length * 2 + prolazi.length * 2 + 1 + velicine.length + 1 + 3;
  record('doseg: izvedeno točno ' + ocekivano + ' provjera', touched === ocekivano, 'izvedeno ' + touched);

  console.log('\n  dotaknuto: ' + touched + ' provjera, palo: ' + failed);
  console.log(failed ? '✗ BAZA PROPUŠTA\n' : '✅ baza drži profil\n');
  process.exit(failed ? 1 : 0);
})().catch(async (e) => {
  await pometi();
  console.log('✗ brana je pukla: ' + e.message);
  process.exit(1);
});
