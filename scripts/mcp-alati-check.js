// mcp-alati-check.js — ALATI CJEVOVODA kroz pravi MCP (F6 ②/2, ADR-031/038).
// Pokreni: npm run mcp:alati   (mrežno, STAGING-only, stvara i briše jednokratnog korisnika)
//
// ─── ŠTO TVRDI ──────────────────────────────────────────────────────────────────────────────────
// `mcp:nacrt` tvrdi što rade RPC-ovi nacrta kad ih se zove IZRAVNO. Ova brana tvrdi što rade ALATI
// kad ih zove korisnikov AI: Node MCP klijent s PRAVIM OAuth tokenom (isti put kao Claude) prolazi
// cijeli cjevovod na Edge Functionu `mcp`, a svaki učinak se PROČITA NATRAG iz baze (200 nije dokaz):
//
//   ① popis alata = točno onaj iz jezgre (`alati.ts`), i svaki koji stvara traži `repeat_key`
//   ② cjevovod: započni → Learn → kartice → pitanja → pročitaj → predaj; nacrt u bazi prolazi strogi profil;
//      predaja (②/4.3′) = materijal u odabranoj polici + link na njega, ponovljena = isti materijal
//   ③ redoslijed: kartice bez Learna i pitanja bez kartica PADAJU imenovano
//   ④ isti poziv dvaput NE duplicira: ni nacrt, ni lekciju, ni kartice (i verzija se ne mijenja)
//   ⑤ N9 uživo: odbijanje iz BAZE (validator, predan nacrt) stiže AI-ju prevedeno — HTTP 200 +
//      `isError`, imenovana vrsta — nikad 500 i nikad sirova poruka baze
//   ⑥ živo gradivo korisnika bajt-isto nakon svih poziva
//   ⑦ ②/3 oblik: nacrt u bazi JEST gradivo — prolazi i KATALOŠKU shemu (`validate:schema`), v2 + ikona;
//      svako pitanje nosi `card` koja postoji; dopuna `___` → `_______`, `answers` = odgovor PO praznini (D2)
//   ⑧ ②/4b.2 izmjena postojećeg materijala ALATIMA: čitanje s verzijom → kopija → lekcija/kartica/imena u
//      nacrtu (živo netaknuto) → predaja upiše jednom (+ redak povijesti s client_id-em) → vrati (ponovljeno
//      isto, oglašen kao razoran) → korisnik spremi poslije kopije = sukob, njegov rad bajt-isti.
//      Semantiku baze do kraja mjeri `mcp:izmjena`; ovdje se mjeri da je ALATI doista voze.
//   ⑨–⑪ ZAVRSNICA K/2–K/4: duljina kartice · (K/3 uz predaju) · boja lekcije iz palete
//   ⑫ K/5 učestalost u BAZI: 60 prolazi, 61. u minuti = 429 s „pokušaj za N s" · dva konektora dijele granicu ·
//      61 usporedno → točno 60 · 1 001. u 24 h odbijen · prijevod kroz alat (ponovno / korisnik) · čitanje se ne broji.
//      Svaki scenarij ima SVJEŽEG korisnika; mjerač ispisuje rezervu korisnika A (najgušćih 60 s).
//   ⑬ K/6 kvota i paginacija: 2 000 živih čvorova po korisniku (okidač) — usporedni rub, Studio, predaja AI-ja,
//      vraćanje mape cijelo ili ništa, jedna naredba preko granice · procitaj_materijale u stranicama od 500 = sve iz baze.
//   ⑭ K/7 veličina odgovora: materijal od točno 1 MB kroz procitaj_materijal stiže ZBIJEN (≤ 1 MB) i cijel.
//
// Adresa: `MCP_ALATI_URL` ili `<STAGING>/functions/v1/mcp`.
// Ishod: exit 1 = alati ne drže · exit 0 + SKIP = nema STAGING_* / SERVICE u `.env`.

const crypto = require('crypto');
const path = require('path');
const { pathToFileURL } = require('url');
const Ajv = require('ajv');
const {
  BASE, ANON, SERVICE,
  http, svcHeaders, ref, jeProdukcija, noviKorisnik, pometi, prijava, oauthToken, rpc
} = require('./lib/staging-oauth');
const { lekcija, valjanTocno } = require('../tests/fixtures/ugc-sadrzaj');

/** Čegrtaljka dosega (kalup `check:final`): manje = blok tiho otpao, više = osnovica nije podignuta. */
const OCEKIVANO_PROVJERA = 91;   // +3 (K/7): blok ⑭ · +3 (②/4.2): polica i opseg u bazi · review_url · nepostojeća polica · +11 (②/4b.2): blok ⑧ · +5 (K/2): blok ⑨ · +3 (K/3): blok ⑩ · +3 (K/4): blok ⑪ · +11 (K/5): blok ⑫ · +13 (K/6): blok ⑬

const MCP = String(process.env.MCP_ALATI_URL || BASE + '/functions/v1/mcp').replace(/\/+$/, '');

let failed = 0;
let touched = 0;
function record(name, pass, detail) {
  touched++;
  if (!pass) failed++;
  console.log(`${pass ? '✅' : '❌'} ${name}${detail ? ' — ' + detail : ''}`);
}
function skip(why) { console.log('⏭️  SKIP — ' + why); process.exit(0); }

/** JSON-RPC prema MCP-u. Odgovor zna biti SSE (`data: {…}`) ili čisti JSON — oba se čitaju. */
let rpcId = 0;
async function mcp(token, method, params) {
  const id = ++rpcId;
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 30000);
  try {
    const r = await fetch(MCP, {
      method: 'POST', signal: ctrl.signal,
      headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
      body: JSON.stringify({ jsonrpc: '2.0', id, method, params: params || {} })
    });
    const tekst = await r.text();
    const poruke = /^\s*[{[]/.test(tekst) ? [tekst] : tekst.split('\n').filter((l) => l.startsWith('data:')).map((l) => l.slice(5));
    let json = null;
    for (const p of poruke) { try { const o = JSON.parse(p); if (o && o.id === id) json = o; } catch (e) { /* nije JSON */ } }
    return { status: r.status, json, tekst: tekst.replace(/\s+/g, ' ').slice(0, 200) };
  } finally { clearTimeout(to); }
}

/** Poziv alata: HTTP broj, je li `isError`, i tijelo (JSON iz teksta alata, ili sirov tekst). */
async function alat(token, ime, args) {
  const r = await mcp(token, 'tools/call', { name: ime, arguments: args });
  const res = r.json && r.json.result;
  const t = res && res.content && res.content[0] && res.content[0].text;
  let tijelo = null;
  try { tijelo = JSON.parse(t); } catch (e) { tijelo = t === undefined ? null : { _tekst: t }; }
  return { status: r.status, isError: !!(res && res.isError), tijelo, rpcGreska: r.json && r.json.error, sirovo: r.tekst };
}
const opis = (r) => 'HTTP ' + r.status + (r.isError ? ' isError ' : ' ') +
  (r.rpcGreska ? 'rpc-greška ' + JSON.stringify(r.rpcGreska).slice(0, 120) : JSON.stringify(r.tijelo).slice(0, 140));
/** Odbijeno BAŠ tim imenom i vrstom, i to kao rezultat alata (200 + isError), ne kao 500. */
function odbijenKao(ime, r, kod, vrsta) {
  const ok = r.status === 200 && r.isError && r.tijelo && r.tijelo.error === kod && r.tijelo.kind === vrsta;
  record(ime, ok, opis(r) + (ok ? '' : ' ← očekivano 200 + isError ' + kod + '/' + vrsta));
}

/** Nacrt izravno iz tablice (service ključ) — čitanje natrag, ne vjerujemo odgovoru alata. */
async function nacrtUBazi(id) {
  const r = await http('/rest/v1/node_drafts?id=eq.' + id + '&select=id,owner_id,client_id,status,name,payload,verzija,polica_id,nova_polica,opseg,izvor_id,polazna_verzija', { headers: svcHeaders() });
  return ((await r.json()) || [])[0] || null;
}
async function brojNacrta(uid) {
  return ((await (await http('/rest/v1/node_drafts?owner_id=eq.' + uid + '&select=id', { headers: svcHeaders() })).json()) || []).length;
}
/** Otisak živog gradiva. `samo` = id-evi čvorova koji su postojali PRIJE (②/4.3′: predaja smije dodati
 *  NOV materijal, ali postojeće ne smije dirnuti — zato se otisak uzima nad istim skupom). */
async function otisakGradiva(uid, samo) {
  const nodes = (await (await http('/rest/v1/nodes?owner_id=eq.' + uid + '&select=*&order=id', { headers: svcHeaders() })).json())
    .filter((x) => !samo || samo.includes(x.id));
  const ids = nodes.map((x) => x.id);
  const c = ids.length
    ? await (await http('/rest/v1/node_content?node_id=in.(' + ids.join(',') + ')&select=*&order=node_id', { headers: svcHeaders() })).json()
    : [];
  return { ids, broj: nodes.length + '+' + c.length, hash: crypto.createHash('sha256').update(JSON.stringify([nodes, c])).digest('hex').slice(0, 16) };
}
const kanon = (v) => Array.isArray(v) ? v.map(kanon) : (v && typeof v === 'object'
  ? Object.keys(v).sort().reduce((o, k) => (o[k] = kanon(v[k]), o), {}) : v);
const svc = async (put) => ((await (await http('/rest/v1/' + put, { headers: svcHeaders() })).json()) || [])[0] || null;
const rest = (token, put) => http('/rest/v1/' + put, { headers: { apikey: ANON, Authorization: 'Bearer ' + token } });

(async () => {
  if (!BASE || !ANON) skip('nema STAGING_SUPABASE_URL / STAGING_SUPABASE_ANON u .env');
  if (!SERVICE) skip('nema STAGING_SUPABASE_SERVICE_KEY (brana stvara i briše jednokratnog korisnika)');
  if (jeProdukcija() || /naxjubnedhrbhsuasayu|sokratstudy\.com/.test(MCP)) {
    console.log('❌ ODBIJENO: ova brana piše i briše — PRODUKCIJA je zabranjena (CLAUDE #8).');
    process.exit(1);
  }
  console.log('\n=== mcp:alati === (staging ' + ref() + ')\n  konektor: ' + MCP + '\n');

  const JEZGRA = await import(pathToFileURL(path.join(__dirname, '..', 'supabase', 'functions', 'mcp', 'alati.ts')).href);
  const provjeriShemu = new Ajv({ allErrors: false, allowUnionTypes: true }).compile(require('../schema/ugc-content.schema.json'));
  const provjeriKatalog = new Ajv({ allErrors: false, allowUnionTypes: true }).compile(require('../schema/subject-content.schema.json'));
  const lekcijeOd = (p) => Object.keys(p).filter((x) => x !== 'schemaVersion').sort();

  const A = await noviKorisnik({ prefiks: 'mcp-alati' });
  const jA = await prijava(A.email, A.password);
  const oa = await oauthToken(jA, 'Sokrat alati (test)');
  const t = oa.token;

  // Živo gradivo (obična sesija), da ⑥ mjeri nešto, a ne prazan skup.
  const polica = (await rpc(jA, 'create_node', { p_parent: null, p_kind: 'folder', p_name: 'Polica' })).json;
  const mat = (await rpc(jA, 'create_node', { p_parent: polica, p_kind: 'study', p_name: 'Materijal' })).json;
  const verzija = ((await (await rest(jA, 'node_content?node_id=eq.' + mat + '&select=version')).json())[0] || {}).version;
  await rpc(jA, 'publish_node', { p_node_id: mat, p_payload: lekcija({ name: 'Živo' }), p_base_version: verzija });
  const prije = await otisakGradiva(A.id);

  console.log('— ① popis alata —');
  const init = await mcp(t, 'initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'mcp-alati-check', version: '1' } });
  record('initialize s pravim tokenom → 200', init.status === 200 && !!(init.json && init.json.result), 'HTTP ' + init.status + ' ' + init.tekst.slice(0, 80));
  const upute = init.json && init.json.result && init.json.result.instructions;
  record('instructions = UPUTE iz jezgre (deployana je ova verzija)', upute === JEZGRA.UPUTE,
    upute === JEZGRA.UPUTE ? 'poslužitelj ' + JSON.stringify(init.json.result.serverInfo) : 'razlikuje se ← stara funkcija na stagingu?');
  const lista = await mcp(t, 'tools/list');
  const alati = (lista.json && lista.json.result && lista.json.result.tools) || [];
  const imena = alati.map((a) => a.name).sort();
  const ocekivano = JEZGRA.ALATI.map((a) => a.ime).sort();
  record('tools/list = točno alati iz jezgre (' + ocekivano.length + ')', JSON.stringify(imena) === JSON.stringify(ocekivano), imena.join(', ') || lista.tekst);
  const stvaraju = JEZGRA.ALATI.filter((a) => !a.samoCitanje && (a.ulaz.properties || {}).repeat_key).map((a) => a.ime);
  const bezKljuca = stvaraju.filter((ime) => { const x = alati.find((a) => a.name === ime); return !x || !((x.inputSchema || {}).required || []).includes('repeat_key'); });
  record('svaki alat koji stvara oglašava obavezan repeat_key', stvaraju.length === 6 && bezKljuca.length === 0, bezKljuca.join(', ') || stvaraju.join(', '));

  console.log('\n— ② cjevovod —');
  const lekcije = [{ name: 'Uvod u makro', color: '#6366F1' }, { name: 'BDP', color: '#10b981' }];
  const z = await alat(t, 'zapocni_nacrt', { name: 'Makroekonomija (test)', repeat_key: 'razgovor-1:start', shelf_id: polica, scope: 'detailed', lessons: lekcije });
  const draftId = z.tijelo && z.tijelo.draft_id;
  record('zapocni_nacrt → nacrt s dvije lekcije', z.status === 200 && !z.isError && !!draftId && (z.tijelo.lessons || []).length === 2, opis(z));
  if (!draftId) {
    // Bez nacrta ostatak cjevovoda nema što mjeriti — izlaz je PAD, ne prazan prolaz.
    await pometi();
    console.log('\n  dotaknuto: ' + touched + ' provjera, palo: ' + failed + '\n✗ ALATI NE DRŽE — nacrt nije nastao, cjevovod nije mjeren\n');
    process.exit(1);
  }
  let d = await nacrtUBazi(draftId);
  record('… u bazi: vlasnik iz tokena, client_id tokena, lekcije l1/l2 s bojom', !!d && d.owner_id === A.id && d.client_id === oa.client_id &&
    JSON.stringify(lekcijeOd(d.payload)) === '["l1","l2"]' && d.payload.l1.color === '#6366f1',
  d ? 'owner ok=' + (d.owner_id === A.id) + ' · client ok=' + (d.client_id === oa.client_id) + ' · ' + JSON.stringify(d.payload).slice(0, 90) : 'nema retka');
  // ②/4.2: polica i opseg biraju se na početku i putuju s nacrtom; AI dobiva opseg natrag.
  record('②/4.2 u bazi polica i opseg iz poziva (polica_id, detaljno) · alat vraća scope + scope_hint', !!d && d.polica_id === polica &&
    d.nova_polica === null && d.opseg === 'detaljno' && z.tijelo.scope === 'detailed' && /whole source/i.test(z.tijelo.scope_hint || ''),
  d ? 'polica ' + (d.polica_id === polica) + ' · opseg ' + d.opseg + ' · scope ' + z.tijelo.scope : '—');
  const L = 'l2';
  record('⑦ kostur je gradivo: schemaVersion 2, svaka lekcija ikonu i prazne nizove', d.payload.schemaVersion === 2 &&
    lekcijeOd(d.payload).every((x) => /^fa-[a-z0-9-]+$/.test(d.payload[x].icon || '') && Array.isArray(d.payload[x].flashcards)),
  JSON.stringify(d.payload).slice(0, 140));

  odbijenKao('③ dodaj_kartice PRIJE Learna → alat_nema_learna', await alat(t, 'dodaj_kartice',
    { draft_id: draftId, lesson_id: L, repeat_key: 'razgovor-1:k1', cards: [{ question: 'Što je BDP?', answer: 'Vrijednost proizvodnje.' }] }), 'alat_nema_learna', 'ispravi');

  const learn = await alat(t, 'napisi_learn', { draft_id: draftId, lesson_id: L, repeat_key: 'razgovor-1:learn', title: 'BDP', blocks: [
    { type: 'heading', text: 'Što je BDP', level: 2 },
    { type: 'paragraph', text: [{ text: 'Bruto domaći proizvod', b: true }, { text: ' je vrijednost konačnih dobara i usluga.' }] },
    { type: 'list', items: ['proizvodni pristup', 'dohodovni pristup', 'rashodovni pristup'] }] });
  d = await nacrtUBazi(draftId);
  record('napisi_learn → u bazi 3 bloka s id-evima', !learn.isError && d && d.payload[L].learn && d.payload[L].learn.blocks.length === 3 &&
    d.payload[L].learn.blocks.every((b) => /^[A-Za-z0-9_-]+$/.test(b.id || '')), opis(learn));

  odbijenKao('③ dodaj_pitanja PRIJE kartica → alat_nema_kartica', await alat(t, 'dodaj_pitanja',
    { draft_id: draftId, lesson_id: L, repeat_key: 'razgovor-1:p1', quiz: [{ question: 'BDP mjeri?', options: ['proizvodnju', 'uvoz'], correct: 0, card: 'k-jos-nema' }] }), 'alat_nema_kartica', 'ispravi');

  const kartice = { draft_id: draftId, lesson_id: L, repeat_key: 'razgovor-1:k1', cards: [
    { question: 'Što je BDP?', answer: 'Vrijednost konačnih dobara i usluga proizvedenih u zemlji.' },
    { question: 'Tri pristupa BDP-u', answer: 'Proizvodni, dohodovni, rashodovni.' }] };
  const k1 = await alat(t, 'dodaj_kartice', kartice);
  d = await nacrtUBazi(draftId);
  const vPoKarticama = d && d.verzija;
  record('dodaj_kartice → u bazi 2 kartice', !k1.isError && d && (d.payload[L].flashcards || []).length === 2, opis(k1));
  const cardIds = ((k1.tijelo && k1.tijelo.cards) || []).map((c) => c.card_id);
  record('⑦ dodaj_kartice vraća card_id-eve = id-evi kartica u bazi', cardIds.length === 2 &&
    JSON.stringify(cardIds) === JSON.stringify(d.payload[L].flashcards.map((c) => c.id)), JSON.stringify(cardIds));

  console.log('\n— ④ isti poziv dvaput —');
  const k2 = await alat(t, 'dodaj_kartice', kartice);
  d = await nacrtUBazi(draftId);
  record('ponovljen dodaj_kartice (isti ključ) → i dalje 2 kartice, verzija ista', !k2.isError && d && d.payload[L].flashcards.length === 2 && d.verzija === vPoKarticama,
    'kartica ' + (d && d.payload[L].flashcards.length) + ' · verzija ' + vPoKarticama + '→' + (d && d.verzija));
  const z2 = await alat(t, 'zapocni_nacrt', { name: 'Makroekonomija (test)', repeat_key: 'razgovor-1:start', shelf_id: polica, scope: 'detailed', lessons: lekcije });
  record('ponovljen zapocni_nacrt (isti ključ) → ISTI nacrt', !z2.isError && z2.tijelo && z2.tijelo.draft_id === draftId, opis(z2));
  d = await nacrtUBazi(draftId);
  record('… korisnik i dalje ima 1 nacrt, 2 lekcije, a Learn i kartice netaknuti', (await brojNacrta(A.id)) === 1 && lekcijeOd(d.payload).length === 2 &&
    d.payload[L].flashcards.length === 2 && d.payload[L].learn.blocks.length === 3, 'nacrta ' + (await brojNacrta(A.id)) + ' · lekcija ' + lekcijeOd(d.payload).length);
  const k3 = await alat(t, 'dodaj_kartice', Object.assign({}, kartice, { repeat_key: 'razgovor-1:k2', cards: [{ question: 'Tko mjeri BDP?', answer: 'DZS.' }] }));
  d = await nacrtUBazi(draftId);
  record('kontrola: NOV ključ → kartica se DODA (3)', !k3.isError && d.payload[L].flashcards.length === 3, opis(k3));

  console.log('\n— ② pitanja, čitanje —');
  const p = await alat(t, 'dodaj_pitanja', { draft_id: draftId, lesson_id: L, repeat_key: 'razgovor-1:p1',
    quiz: [{ question: 'BDP mjeri?', options: ['proizvodnju', 'uvoz', 'inflaciju'], correct: 0, card: cardIds[0] }],
    fill_blanks: [{ sentence: 'BDP je vrijednost ___ dobara i usluga.', answers: ['konačnih'], card: cardIds[0] },
      { sentence: '_____ i ___ pristup su dva od tri.', answers: ['Proizvodni', 'rashodovni'], card: cardIds[1] }] });
  d = await nacrtUBazi(draftId);
  record('dodaj_pitanja → u bazi 1 kviz + 2 dopune', !p.isError && (d.payload[L].quiz || []).length === 1 && (d.payload[L].fillBlanks || []).length === 2, opis(p));
  const [f1, f2] = d.payload[L].fillBlanks || [];
  record('⑦ dopuna u bazi u obliku gradiva: `_______`, answer = prvi, answers samo uz 2+ praznine', !!f2 &&
    f1.sentence === 'BDP je vrijednost _______ dobara i usluga.' && f1.answer === 'konačnih' && f1.answers === undefined &&
    f2.sentence === '_______ i _______ pristup su dva od tri.' && f2.answer === 'Proizvodni' && JSON.stringify(f2.answers) === '["Proizvodni","rashodovni"]',
  JSON.stringify(d.payload[L].fillBlanks).slice(0, 200));
  const ids = new Set(d.payload[L].flashcards.map((c) => c.id));
  const pitanja = [...d.payload[L].quiz, ...d.payload[L].fillBlanks];
  record('⑦ svako pitanje u bazi nosi `card` koja postoji u lekciji', pitanja.length === 3 && pitanja.every((x) => ids.has(x.card)),
    pitanja.map((x) => x.card).join(', '));
  odbijenKao('⑦ pitanje s nepostojećom karticom → alat_kartica_ne_postoji / ispravi', await alat(t, 'dodaj_pitanja',
    { draft_id: draftId, lesson_id: L, repeat_key: 'razgovor-1:p9', quiz: [{ question: 'x', options: ['a', 'b'], correct: 0, card: 'k-nema-je' }] }), 'alat_kartica_ne_postoji', 'ispravi');
  odbijenKao('⑦ dopuna s 2 praznine a 1 odgovorom → alat_los_ulaz / ispravi', await alat(t, 'dodaj_pitanja',
    { draft_id: draftId, lesson_id: L, repeat_key: 'razgovor-1:p8', fill_blanks: [{ sentence: '___ i ___', answers: ['samo jedan'], card: cardIds[0] }] }), 'alat_los_ulaz', 'ispravi');
  const pPonovno = await alat(t, 'dodaj_pitanja', { draft_id: draftId, lesson_id: L, repeat_key: 'razgovor-1:p1',
    quiz: [{ question: 'BDP mjeri?', options: ['proizvodnju', 'uvoz', 'inflaciju'], correct: 0, card: cardIds[0] }],
    fill_blanks: [{ sentence: 'BDP je vrijednost ___ dobara i usluga.', answers: ['konačnih'], card: cardIds[0] },
      { sentence: '_____ i ___ pristup su dva od tri.', answers: ['Proizvodni', 'rashodovni'], card: cardIds[1] }] });
  const dPon = await nacrtUBazi(draftId);
  record('⑦ ponovljen dodaj_pitanja (isti ključ, dopuna s 2 praznine) → i dalje 1 kviz + 2 dopune, verzija ista', !pPonovno.isError &&
    dPon.verzija === d.verzija && dPon.payload[L].quiz.length === 1 && dPon.payload[L].fillBlanks.length === 2,
  'verzija ' + d.verzija + '→' + dPon.verzija + ' · dopuna ' + dPon.payload[L].fillBlanks.length);
  const dNakon = await nacrtUBazi(draftId);
  record('… odbijena pitanja NISU upisana (verzija ista)', dNakon.verzija === d.verzija, 'verzija ' + d.verzija + '→' + dNakon.verzija);
  record('nacrt u bazi prolazi STROGI profil (ugc-content.schema.json)', provjeriShemu(d.payload), JSON.stringify(provjeriShemu.errors && provjeriShemu.errors[0]) || 'ok');
  record('⑦ nacrt u bazi prolazi i KATALOŠKU shemu (subject-content.schema.json = validate:schema)', provjeriKatalog(d.payload), JSON.stringify(provjeriKatalog.errors && provjeriKatalog.errors[0]) || 'ok');
  const citaj = await alat(t, 'procitaj_nacrt', {});
  record('procitaj_nacrt bez id-a → popis s ovim nacrtom', !citaj.isError && (citaj.tijelo.drafts || []).some((x) => x.draft_id === draftId), opis(citaj));
  const citaj2 = await alat(t, 'procitaj_nacrt', { draft_id: draftId });
  const s2 = citaj2.tijelo && (citaj2.tijelo.lessons || []).find((x) => x.lesson_id === L);
  record('procitaj_nacrt s id-om → sažetak lekcije (3 bloka, 3 kartice, 1 kviz, 2 dopune)', !!s2 && s2.learn_blocks === 3 && s2.cards === 3 && s2.quiz === 1 && s2.fill_blanks === 2, opis(citaj2));
  const citaj3 = await alat(t, 'procitaj_nacrt', { draft_id: draftId, lesson_id: L });
  record('procitaj_nacrt s lekcijom → puni sadržaj lekcije', !citaj3.isError && citaj3.tijelo.lesson && citaj3.tijelo.lesson.flashcards.length === 3, opis(citaj3));
  const mat2 = await alat(t, 'procitaj_materijale', {});
  record('procitaj_materijale i dalje radi (vidi vlastiti materijal)', !mat2.isError && /Materijal/.test(JSON.stringify(mat2.tijelo)), opis(mat2));

  console.log('\n— ⑤ N9 uživo: odbijanje BAZE stiže prevedeno —');
  const zlo = await alat(t, 'napisi_learn', { draft_id: draftId, lesson_id: 'l1', repeat_key: 'razgovor-1:zlo',
    blocks: [{ type: 'paragraph', text: [{ text: 'klik', href: 'javascript:alert(1)' }] }] });
  odbijenKao('validator u bazi odbije `javascript:` poveznicu → sadrzaj_neispravan / ispravi', zlo, 'sadrzaj_neispravan', 'ispravi');
  record('… uz razlog koji AI može ispraviti, bez SQL-a i unutarnjih imena', !!zlo.tijelo && /content rule/.test(zlo.tijelo.message || '') &&
    !/node_drafts|_provjeri_sadrzaj|plpgsql|PGRST|SQLSTATE/.test(JSON.stringify(zlo.tijelo)), (zlo.tijelo && zlo.tijelo.message || '').slice(0, 140));
  d = await nacrtUBazi(draftId);
  record('… a lekcija l1 u bazi NIJE dobila Learn', !d.payload.l1.learn, JSON.stringify(d.payload.l1).slice(0, 80));
  // Samo NEPOSTOJEĆI: tuđi nacrt mjeri `mcp:nacrt` ② na RPC-u (alat samo prosljeđuje poziv).
  odbijenKao('nepostojeći nacrt → nacrt_ne_postoji / stop', await alat(t, 'procitaj_nacrt', { draft_id: '00000000-0000-4000-8000-000000000000' }), 'nacrt_ne_postoji', 'stop');

  // ⑩ ZAVRSNICA K/3 (ADR-031) — treća kartica (`razgovor-1:k2`) još nema pitanje: predaja mora pasti i imenovati je.
  console.log('\n— ⑩ svaka kartica daje bar jedno pitanje (K/3) —');
  const k3Id = k3.tijelo && k3.tijelo.cards && k3.tijelo.cards[0] && k3.tijelo.cards[0].card_id;
  const prBez = await alat(t, 'predaj_nacrt', { draft_id: draftId });
  odbijenKao('kartica bez pitanja → predaj_nacrt alat_kartica_bez_pitanja / ispravi', prBez, 'alat_kartica_bez_pitanja', 'ispravi');
  const porukaBez = (prBez.tijelo && prBez.tijelo.message) || '';
  record('… poruka imenuje BAŠ tu karticu (ne one s pitanjem), a nacrt nije predan', !!k3Id && porukaBez.includes(L + '/' + k3Id) &&
    !cardIds.some((c) => porukaBez.includes(c)) && !!(await nacrtUBazi(draftId)), porukaBez.slice(-120));
  const pk3 = await alat(t, 'dodaj_pitanja', { draft_id: draftId, lesson_id: L, repeat_key: 'razgovor-1:p3',
    quiz: [{ question: 'Tko mjeri BDP?', options: ['DZS', 'HNB', 'MF'], correct: 0, card: k3Id }] });
  record('… pitanje za tu karticu se upiše (sad je svaka pokrivena)', !pk3.isError, opis(pk3));
  d = await nacrtUBazi(draftId);

  console.log('\n— ② predaja = materijal na polici (②/4.3′, ADR-039) —');
  const pr = await alat(t, 'predaj_nacrt', { draft_id: draftId });
  const mid = pr.tijelo && pr.tijelo.material_id;
  const matUBazi = mid ? await svc('nodes?id=eq.' + mid + '&select=id,owner_id,parent_id,kind,name,deleted_at') : null;
  const sadrUBazi = mid ? await svc('node_content?node_id=eq.' + mid + '&select=payload') : null;
  const nacrtPoslije = await nacrtUBazi(draftId);
  record('predaj_nacrt → materijal (study) u ODABRANOJ polici, sadržaj = nacrt, nacrta više nema',
    !pr.isError && !!matUBazi && matUBazi.owner_id === A.id && matUBazi.parent_id === polica && matUBazi.kind === 'study' && !matUBazi.deleted_at &&
    !!sadrUBazi && JSON.stringify(kanon(sadrUBazi.payload)) === JSON.stringify(kanon(d.payload)) && !nacrtPoslije,
  opis(pr) + ' · materijal ' + (matUBazi ? 'u polici=' + (matUBazi.parent_id === polica) : 'nema') + ' · nacrt ' + (nacrtPoslije ? 'JOŠ POSTOJI' : 'nestao'));
  // Tajna `SOKRAT_APP_URL` na stagingu = lokalni poslužitelj (anketa 30.09.); `.env` je smije pregaziti.
  const ocekivanUrl = (process.env.STAGING_SOKRAT_APP_URL || 'http://localhost:5051').replace(/\/+$/, '') + '/#/subject/node%3A' + mid + '/content';
  record('②/4.3′ predaj_nacrt vraća review_url na OVAJ materijal (adresa iz tajne funkcije)', !!mid && pr.tijelo.review_url === ocekivanUrl,
    (pr.tijelo && pr.tijelo.review_url) + (mid && pr.tijelo.review_url === ocekivanUrl ? '' : ' ← očekivano ' + ocekivanUrl));
  odbijenKao('upis nakon predaje → nacrt_ne_postoji / stop (nacrt je postao materijal)', await alat(t, 'napisi_learn',
    { draft_id: draftId, lesson_id: L, repeat_key: 'razgovor-1:kasno', blocks: [{ type: 'paragraph', text: 'kasno' }] }), 'nacrt_ne_postoji', 'stop');
  const pr2 = await alat(t, 'predaj_nacrt', { draft_id: draftId });
  const uPolici = (await (await http('/rest/v1/nodes?parent_id=eq.' + polica + '&deleted_at=is.null&select=id', { headers: svcHeaders() })).json()) || [];
  record('ponovljena predaja → ISTI materijal i link, u polici nema drugog', !pr2.isError && !!mid && pr2.tijelo.material_id === mid &&
    pr2.tijelo.review_url === pr.tijelo.review_url && uPolici.length === 2, opis(pr2) + ' · u polici ' + uPolici.length + ' čvora');
  odbijenKao('loš ulaz (bez repeat_key) → alat_los_ulaz / ispravi, bez upisa', await alat(t, 'zapocni_nacrt',
    { name: 'X', lessons: lekcije }), 'alat_los_ulaz', 'ispravi');
  record('… i nijedan nov nacrt nije nastao (predani je postao materijal → 0)', (await brojNacrta(A.id)) === 0, 'nacrta ' + (await brojNacrta(A.id)));
  odbijenKao('②/4.2 polica koje korisnik nema → nacrt_polica_ne_postoji / ispravi', await alat(t, 'zapocni_nacrt',
    { name: 'X', repeat_key: 'razgovor-2:start', shelf_id: '00000000-0000-4000-8000-000000000000', scope: 'standard', lessons: lekcije }), 'nacrt_polica_ne_postoji', 'ispravi');

  console.log('\n— ⑥ živo gradivo —');
  const poslije = await otisakGradiva(A.id, prije.ids);
  record('POSTOJEĆI nodes + node_content korisnika bajt-isti nakon SVIH poziva alata (predaja smije samo DODATI)', prije.hash === poslije.hash && prije.broj === '2+1',
    'prije ' + prije.broj + ' ' + prije.hash + ' · poslije ' + poslije.broj + ' ' + poslije.hash);

  // ⑧ ②/4b.2 — POSLIJE ⑥, jer ovdje AI na korisnikovu riječ SMIJE mijenjati živi materijal (i to se mjeri).
  console.log('\n— ⑧ izmjena postojećeg materijala (②/4b.2) —');
  const zivo = async () => svc('node_content?node_id=eq.' + mat + '&select=payload,version');
  const imeMat = async () => ((await svc('nodes?id=eq.' + mat + '&select=name')) || {}).name;
  const povijestAI = async () => (await (await http('/rest/v1/node_content_versions?node_id=eq.' + mat +
    '&select=op,client_id,verzija&order=id', { headers: svcHeaders() })).json()) || [];
  const zv0 = await zivo();
  const cm = await alat(t, 'procitaj_materijal', { material_id: mat });
  record('procitaj_materijal → ime, verzija i lekcije kakve su u bazi', !cm.isError && cm.tijelo.name === 'Materijal' &&
    cm.tijelo.version === zv0.version && JSON.stringify((cm.tijelo.lessons || []).map((x) => x.lesson_id)) === JSON.stringify(lekcijeOd(zv0.payload)), opis(cm));
  const zi = await alat(t, 'zapocni_izmjenu', { material_id: mat, repeat_key: 'razgovor-3:izmjena' });
  const izId = zi.tijelo && zi.tijelo.draft_id;
  let di = izId ? await nacrtUBazi(izId) : null;
  record('zapocni_izmjenu → nacrt izmjene OVOG materijala s polaznom verzijom i istim sadržajem', !zi.isError && !!di && di.izvor_id === mat &&
    di.polazna_verzija === zv0.version && JSON.stringify(kanon(di.payload)) === JSON.stringify(kanon(zv0.payload)),
  di ? 'izvor ' + (di.izvor_id === mat) + ' · polazna ' + di.polazna_verzija + '/' + zv0.version : opis(zi));
  const nl = await alat(t, 'dodaj_lekciju', { draft_id: izId, repeat_key: 'razgovor-3:lekcija', name: 'Nova lekcija', color: '#06B6D4' });
  const nlId = nl.tijelo && nl.tijelo.lesson_id;
  await alat(t, 'napisi_learn', { draft_id: izId, lesson_id: nlId, repeat_key: 'razgovor-3:learn', blocks: [{ type: 'paragraph', text: 'Dodano kroz izmjenu.' }] });
  const nk = await alat(t, 'dodaj_kartice', { draft_id: izId, lesson_id: nlId, repeat_key: 'razgovor-3:kartice', cards: [{ question: 'Pojam?', answer: 'Objašnjenje.' }] });
  const kid = nk.tijelo && nk.tijelo.cards && nk.tijelo.cards[0].card_id;
  const ik = await alat(t, 'izmijeni_stavke', { draft_id: izId, lesson_id: nlId, cards: [{ id: kid, answer: 'Bolje objašnjenje.' }] });
  // K/3: NOVA kartica u izmjeni treba pitanje (zatečene kartice materijala se ne sude).
  await alat(t, 'dodaj_pitanja', { draft_id: izId, lesson_id: nlId, repeat_key: 'razgovor-3:pitanja',
    quiz: [{ question: 'Pojam?', options: ['Bolje objašnjenje.', 'Ništa'], correct: 0, card: kid }] });
  const ul = await alat(t, 'uredi_lekciju', { draft_id: izId, lesson_id: 'l1', name: 'Živo (uređeno)' });
  const pm = await alat(t, 'preimenuj_materijal', { draft_id: izId, name: 'Materijal (uređen)' });
  di = await nacrtUBazi(izId);
  record('lekcija dodana, kartica izmijenjena po id-u, lekcija i materijal preimenovani — u NACRTU', !nl.isError && !ik.isError && !ul.isError && !pm.isError && !!di &&
    di.payload[nlId] && di.payload[nlId].flashcards[0].answer === 'Bolje objašnjenje.' && di.payload.l1.name === 'Živo (uređeno)' && di.name === 'Materijal (uređen)',
  [nl, ik, ul, pm].filter((x) => x.isError).map(opis).join(' | ') || (di ? JSON.stringify(di.payload[nlId] || {}).slice(0, 100) : 'nema nacrta'));
  const zv1 = await zivo();
  record('… a ŽIVI materijal je do predaje netaknut (sadržaj, verzija, ime)', JSON.stringify(zv1) === JSON.stringify(zv0) && (await imeMat()) === 'Materijal',
    'verzija ' + zv0.version + '→' + zv1.version);
  const povPrije = (await povijestAI()).length;
  const pi = await alat(t, 'predaj_nacrt', { draft_id: izId });
  const zv2 = await zivo();
  const pov = await povijestAI();
  const zadnji = pov[pov.length - 1] || {};
  record('predaj_nacrt (izmjena) → materijal = nacrt, novo ime, verzija +1, nacrt nestao', !pi.isError && pi.tijelo.material_id === mat &&
    JSON.stringify(kanon(zv2.payload)) === JSON.stringify(kanon(di.payload)) && zv2.version === zv0.version + 1 &&
    (await imeMat()) === 'Materijal (uređen)' && !(await nacrtUBazi(izId)), opis(pi) + ' · verzija ' + zv0.version + '→' + zv2.version);
  record('… povijest: TOČNO jedan nov redak `mcp_izmjena`, client_id ovog AI-ja, polazna verzija', pov.length === povPrije + 1 &&
    zadnji.op === 'mcp_izmjena' && zadnji.client_id === oa.client_id && zadnji.verzija === zv0.version,
  (pov.length - povPrije) + ' redak · ' + JSON.stringify(zadnji));
  const vr = await alat(t, 'vrati_izmjenu', { material_id: mat });
  const zv3 = await zivo();
  record('vrati_izmjenu → sadržaj prije izmjene kao NOVA verzija (+2 od polazne)', !vr.isError && vr.tijelo.version === zv0.version + 2 &&
    JSON.stringify(kanon(zv3.payload)) === JSON.stringify(kanon(zv0.payload)) && zv3.version === zv0.version + 2, opis(vr));
  const vr2 = await alat(t, 'vrati_izmjenu', { material_id: mat });
  record('ponovljen vrati_izmjenu → ista verzija, bez novog upisa', !vr2.isError && vr2.tijelo.version === zv3.version && (await zivo()).version === zv3.version, opis(vr2));
  const lst = await mcp(t, 'tools/list');
  const vrAn = (((lst.json && lst.json.result && lst.json.result.tools) || []).find((x) => x.name === 'vrati_izmjenu') || {}).annotations || {};
  record('vrati_izmjenu se oglašava kao razoran (klijent smije tražiti potvrdu korisnika)', vrAn.destructiveHint === true, JSON.stringify(vrAn));
  // Sukob: korisnik spremi u Studiju poslije AI-jeve kopije → AI-jeva izmjena se NE upisuje.
  const zs = await alat(t, 'zapocni_izmjenu', { material_id: mat, repeat_key: 'razgovor-3:izmjena-2' });
  const sId = zs.tijelo && zs.tijelo.draft_id;
  await alat(t, 'uredi_lekciju', { draft_id: sId, lesson_id: 'l1', name: 'AI-jevo ime lekcije' });
  const korisnikov = lekcija({ name: 'Korisnik spremio u Studiju' });
  await rpc(jA, 'publish_node', { p_node_id: mat, p_payload: korisnikov, p_base_version: (await zivo()).version });
  const zv4 = await zivo();
  odbijenKao('korisnik spremio poslije kopije → predaj_nacrt izmjena_sukob / korisnik', await alat(t, 'predaj_nacrt', { draft_id: sId }), 'izmjena_sukob', 'korisnik');
  const zv5 = await zivo();
  record('… materijal = korisnikov sadržaj i verzija, bajt-isto', JSON.stringify(zv5) === JSON.stringify(zv4) &&
    JSON.stringify(kanon(zv5.payload)) === JSON.stringify(kanon(korisnikov)), 'verzija ' + zv4.version + '→' + zv5.version);

  // ⑨ ZAVRSNICA K/2 — duljina kartice po mjeri preglednika, UŽIVO (pragovi iz izvora, ne rukom).
  console.log('\n— ⑨ duljina kartice (K/2) —');
  const PR = await import(pathToFileURL(path.join(__dirname, '..', 'supabase', 'functions', '_shared', 'pravila.ts')).href);
  const HARD = PR.KARTICA_HARD; const SOFT = PR.KARTICA_SOFT;
  const oglas = (((lst.json && lst.json.result && lst.json.result.tools) || []).find((x) => x.name === 'dodaj_kartice') || {}).inputSchema || {};
  const oglasMax = (((((oglas.properties || {}).cards || {}).items || {}).properties || {}).answer || {}).maxLength;
  record('oglašeni strop kartice (tools/list) == HARD iz js/card-limits.js', oglasMax === HARD, 'oglas ' + oglasMax + ' · izvor ' + HARD);
  const zd = await alat(t, 'zapocni_izmjenu', { material_id: mat, repeat_key: 'razgovor-4:duljina' });
  const dId = zd.tijelo && zd.tijelo.draft_id;
  const dl = await alat(t, 'dodaj_lekciju', { draft_id: dId, repeat_key: 'razgovor-4:lekcija', name: 'Duljina', color: '#10b981' });
  const dlId = dl.tijelo && dl.tijelo.lesson_id;
  await alat(t, 'napisi_learn', { draft_id: dId, lesson_id: dlId, repeat_key: 'razgovor-4:learn', blocks: [{ type: 'paragraph', text: 'Learn za duljinu.' }] });
  const dk = await alat(t, 'dodaj_kartice', { draft_id: dId, lesson_id: dlId, repeat_key: 'razgovor-4:k1',
    cards: [{ question: '  Pojam  ', answer: '  ' + 'x'.repeat(HARD) + '  ' }, { question: 'Drugi', answer: 'y'.repeat(SOFT + 1) }] });
  const dd = dId ? await nacrtUBazi(dId) : null;
  const dkk = (dd && dd.payload[dlId] && dd.payload[dlId].flashcards) || [];
  record('HARD znakova uz razmake PROLAZI i u bazi stoji PODREZANO', !dk.isError && dkk.length === 2 && dkk[0].question === 'Pojam' && dkk[0].answer.length === HARD,
    dk.isError ? opis(dk) : 'u bazi: ' + dkk.map((c) => c.answer.length).join(', '));
  const upoz = (dk.tijelo && dk.tijelo.warnings) || [];
  record('iznad SOFT prolazi uz upozorenje AI-ju s mjestom i duljinom (obje kartice: HARD i SOFT+1)',
    JSON.stringify(upoz.map((w) => [w.at, w.length])) === JSON.stringify([['input.cards[0].answer', HARD], ['input.cards[1].answer', SOFT + 1]]),
    JSON.stringify(upoz).slice(0, 160));
  const dk2 = await alat(t, 'dodaj_kartice', { draft_id: dId, lesson_id: dlId, repeat_key: 'razgovor-4:k2', cards: [{ question: 'Q', answer: 'z'.repeat(HARD + 1) }] });
  odbijenKao('HARD+1 → alat_los_ulaz / ispravi', dk2, 'alat_los_ulaz', 'ispravi');
  record('… odbijanje imenuje mjesto, a nacrt je netaknut', /input\.cards\[0\]\.answer/.test((dk2.tijelo && dk2.tijelo.message) || '') &&
    ((await nacrtUBazi(dId)) || {}).verzija === (dd && dd.verzija), opis(dk2));

  // ⑪ ZAVRSNICA K/4 (ADR-031) — boja lekcije samo iz KURIRANE palete; oglas i odbijanje UŽIVO.
  console.log('\n— ⑪ boja lekcije iz palete (K/4) —');
  const bojePolja = [];
  const traziBoje = (s) => {
    if (!s || typeof s !== 'object') return;
    if (s.properties && s.properties.color && s.properties.name) bojePolja.push(s.properties.color);
    for (const v of Object.values(s)) if (v && typeof v === 'object') traziBoje(v);
  };
  ((lst.json && lst.json.result && lst.json.result.tools) || []).forEach((x) => traziBoje(x.inputSchema));
  record('svako oglašeno polje boje lekcije (tools/list) = KURIRANE_BOJE iz js/utils.js', bojePolja.length >= 3 &&
    bojePolja.every((b) => JSON.stringify(b.enum) === JSON.stringify([...PR.KURIRANE_BOJE])), bojePolja.length + ' polja · ' + JSON.stringify(bojePolja[0] && bojePolja[0].enum));
  const nacrtaPrije = await brojNacrta(A.id);
  odbijenKao('boja izvan palete → zapocni_nacrt alat_los_ulaz / ispravi', await alat(t, 'zapocni_nacrt', { name: 'Boja (test)', repeat_key: 'razgovor-5:boja',
    new_shelf: 'Boje', scope: 'summary', lessons: [{ name: 'A', color: '#123456' }] }), 'alat_los_ulaz', 'ispravi');
  record('… i nijedan nacrt nije nastao', (await brojNacrta(A.id)) === nacrtaPrije, 'nacrta ' + nacrtaPrije + '→' + (await brojNacrta(A.id)));

  // ⑫ ZAVRSNICA K/5 (N11) — učestalost upisa U BAZI: 60 u minuti, 1 000 u 24 h, ZBROJ po korisniku
  // (svi njegovi konektori zajedno — Claude svakim spajanjem registrira nov client_id, pa granica po
  // klijentu ne bi vrijedila ništa). Upisi idu IZRAVNO na RPC (isti token zove bazu i mimo poslužitelja,
  // N5), a prijevod se mjeri kroz alat. Svaki scenarij ima SVJEŽEG korisnika — ne troši kvotu ostalih.
  console.log('\n— ⑫ učestalost upisa (K/5) —');
  const zaS = (r) => Number((String((r.json && r.json.message) || r.tekst).match(/za (\d+) s/) || [])[1]);
  const odbijenUcestalost = (r, kod) => r.status === 429 && !!r.json && String(r.json.message || '').startsWith(kod + ':');
  const upisaUBazi = async (uid) => {
    const r = await http('/rest/v1/mcp_upisi?owner_id=eq.' + uid + '&select=client_id,kad', { headers: svcHeaders() });
    const j = await r.json();
    return Array.isArray(j) ? j : null;
  };
  const novi = async (prefiks, n) => {
    const k = await noviKorisnik({ prefiks });
    const jwt = await prijava(k.email, k.password);
    const tok = [];
    for (let i = 0; i < n; i++) tok.push(await oauthToken(jwt, 'Sokrat ucestalost ' + (i + 1) + ' (test)'));
    return { k, tok };
  };
  const zapocni = (token, kljuc) => rpc(token, 'mcp_zapocni_nacrt', { p_name: 'Učestalost', p_kljuc: kljuc, p_polica: null, p_nova_polica: 'K5', p_opseg: 'sazeto' });
  const preimenuj = (token, id, ime) => rpc(token, 'mcp_preimenuj_nacrt', { p_id: id, p_name: ime });
  const uspio = (r) => r.status >= 200 && r.status < 300;

  // (a) 60 uzastopnih prolazi, 61. odbijen s brojem sekundi; ništa nije upisano ni prebrojano viška
  const B = await novi('mcp-k5-min', 1);
  const tB = B.tok[0].token;
  const t0 = Date.now();
  const zB = await zapocni(tB, 'k5-min');
  const bId = zB.json;
  const ishodi = [zB];
  for (let i = 2; i <= 60; i++) ishodi.push(await preimenuj(tB, bId, 'U' + i));
  const r61 = await preimenuj(tB, bId, 'U61');
  const trajalo = Date.now() - t0;
  record('60 upisa u minuti prolazi (1 početak + 59 preimenovanja, za ' + Math.round(trajalo / 1000) + ' s)',
    ishodi.length === 60 && ishodi.every(uspio) && trajalo < 55000,
    'neuspjelih ' + ishodi.filter((r) => !uspio(r)).length + (trajalo < 55000 ? '' : ' ← preko 55 s, mjerenje ne vrijedi'));
  record('61. upis odbijen: HTTP 429, nacrt_ucestalost_min, „pokušaj za N s" uz 1 ≤ N ≤ 60',
    odbijenUcestalost(r61, 'nacrt_ucestalost_min') && zaS(r61) >= 1 && zaS(r61) <= 60, 'HTTP ' + r61.status + ' ' + r61.tekst);
  const bRedaka = await upisaUBazi(B.k.id);
  const bNacrt = await nacrtUBazi(bId);
  record('… brojač u bazi = 60 i 61. ime NIJE upisano (odbijen upis ne piše i ne troši kvotu)',
    !!bRedaka && bRedaka.length === 60 && !!bNacrt && bNacrt.name === 'U60',
    'redaka ' + (bRedaka ? bRedaka.length : 'nema tablice') + ' · ime ' + (bNacrt && bNacrt.name));
  const aB = await alat(tB, 'preimenuj_materijal', { draft_id: bId, name: 'Kroz alat' });
  record('kroz alat: nacrt_ucestalost_min / ponovno, poruka nosi sekunde (HTTP 200 + isError)',
    aB.status === 200 && aB.isError && !!aB.tijelo && aB.tijelo.error === 'nacrt_ucestalost_min' && aB.tijelo.kind === 'ponovno' &&
      /\b\d+ s\b/.test(aB.tijelo.message || ''), opis(aB));
  const cB = await alat(tB, 'procitaj_nacrt', { draft_id: bId });
  record('čitanje se NE broji: procitaj_nacrt i dalje radi na granici', cB.status === 200 && !cB.isError, opis(cB));

  // (b) dva konektora ISTOG korisnika dijele jednu granicu
  const C = await novi('mcp-k5-dva', 2);
  const [c1, c2] = C.tok;
  const zC = await zapocni(c1.token, 'k5-dva');
  let cOk = uspio(zC) ? 1 : 0;
  for (let i = 2; i <= 60; i++) if (uspio(await preimenuj(i % 2 ? c1.token : c2.token, zC.json, 'C' + i))) cOk++;
  const c61 = await preimenuj(c2.token, zC.json, 'C61');
  record('dva konektora istog korisnika: 30 + 30 prolazi, 61. (s drugog konektora) odbijen',
    cOk === 60 && odbijenUcestalost(c61, 'nacrt_ucestalost_min'), 'prošlo ' + cOk + ' · 61.: HTTP ' + c61.status + ' ' + c61.tekst);
  const poKlijentu = ((await upisaUBazi(C.k.id)) || []).reduce((o, x) => (o[x.client_id] = (o[x.client_id] || 0) + 1, o), {});
  record('… svaki redak brojača nosi client_id svog konektora (30 + 30)',
    poKlijentu[c1.client_id] === 30 && poKlijentu[c2.client_id] === 30, JSON.stringify(Object.values(poKlijentu)));

  // (c) usporedno: 1 početak + 60 istodobnih upisa → prolazi TOČNO 60 (brava po korisniku drži brojanje)
  const D = await novi('mcp-k5-usporedno', 1);
  const tD = D.tok[0].token;
  const zD = await zapocni(tD, 'k5-usporedno');
  const usporedno = await Promise.all(Array.from({ length: 60 }, (_, i) => preimenuj(tD, zD.json, 'D' + i)));
  const dOk = (uspio(zD) ? 1 : 0) + usporedno.filter(uspio).length;
  const dOdb = usporedno.filter((r) => odbijenUcestalost(r, 'nacrt_ucestalost_min')).length;
  record('61 upis usporedno (1 + 60 istodobnih) → prošlo točno 60, odbijen točno 1 (429)', dOk === 60 && dOdb === 1,
    'prošlo ' + dOk + ' · odbijeno ' + dOdb + ' · ostalo ' + usporedno.filter((r) => !uspio(r) && !odbijenUcestalost(r, 'nacrt_ucestalost_min')).map((r) => r.status).join(','));

  // (d) 24 h: 999 starijih upisa (upisano service ključem, 2 h staro) → 1 000. prolazi, 1 001. odbijen
  const E = await novi('mcp-k5-dan', 1);
  const tE = E.tok[0].token;
  const prije2h = new Date(Date.now() - 2 * 3600 * 1000).toISOString();
  const sij = await http('/rest/v1/mcp_upisi', { method: 'POST', headers: Object.assign(svcHeaders(), { Prefer: 'return=minimal' }),
    body: JSON.stringify(Array.from({ length: 999 }, () => ({ owner_id: E.k.id, client_id: E.tok[0].client_id, kad: prije2h }))) });
  const zE = await zapocni(tE, 'k5-dan');
  record('1 000. upis u 24 h prolazi (999 upisanih prije 2 h + ovaj)', sij.ok && uspio(zE), 'sijanje HTTP ' + sij.status + ' · upis HTTP ' + zE.status);
  const e1001 = await preimenuj(tE, zE.json, 'E1001');
  record('1 001. odbijen: HTTP 429, nacrt_ucestalost_dan, otvara se kad najstariji ispadne (~22 h)',
    odbijenUcestalost(e1001, 'nacrt_ucestalost_dan') && zaS(e1001) > 21 * 3600 && zaS(e1001) <= 22 * 3600 + 60, 'HTTP ' + e1001.status + ' ' + e1001.tekst);
  odbijenKao('kroz alat: nacrt_ucestalost_dan / korisnik', await alat(tE, 'preimenuj_materijal', { draft_id: zE.json, name: 'Kroz alat' }),
    'nacrt_ucestalost_dan', 'korisnik');

  // Mjerač ispisuje i rezervu ostalih blokova: najgušćih 60 s korisnika A u CIJELOJ ovoj vrtnji.
  const aRedaka = ((await upisaUBazi(A.id)) || []).map((x) => Date.parse(x.kad)).sort((x, y) => x - y);
  let vrh = 0;
  for (let i = 0, j = 0; i < aRedaka.length; i++) { while (aRedaka[i] - aRedaka[j] >= 60000) j++; vrh = Math.max(vrh, i - j + 1); }
  console.log('   ℹ️  korisnik A (blokovi ①–⑪): ' + aRedaka.length + ' upisa, najgušćih 60 s = ' + vrh + ' od 60');

  // ⑬ ZAVRSNICA K/6 (I12, I13, N12) — najviše 2 000 ŽIVIH čvorova po korisniku (okidač na `nodes`), i
  // `procitaj_materijale` koji to sve vidi: stranice od 500 uz `skraceno`. Svjež korisnik F; 1 990 čvorova
  // posije se service ključem (okidač vrijedi i za njega), sve ostalo ide pravim putem: Studio (obična
  // sesija → create_node / delete_node / restore_node) i AI (alati). Rub i brava se mjere usporedno.
  console.log('\n— ⑬ kvota čvorova i paginacija (K/6) —');
  {   // vlastiti doseg: imena ne smiju dirati blokove ①–⑫
  const GRANICA = 2000;
  const kvotaOdbila = (r) => r.status >= 400 && !!r.json && new RegExp('^node_kvota: .*\\b' + GRANICA + '\\b').test(String(r.json.message || ''));
  const zivih = async (uid) => {
    const r = await http('/rest/v1/nodes?owner_id=eq.' + uid + '&deleted_at=is.null&select=id', {
      headers: Object.assign(svcHeaders(), { Prefer: 'count=exact', Range: '0-0' }) });
    return Number((r.headers.get('content-range') || '').split('/')[1]);
  };
  const ziviIdevi = async (uid) => {
    const sve = [];
    for (let od = 0; ; od += 1000) {
      const s = await (await http('/rest/v1/nodes?owner_id=eq.' + uid + '&deleted_at=is.null&select=id&order=id&limit=1000&offset=' + od, { headers: svcHeaders() })).json();
      if (!Array.isArray(s) || !s.length) break;
      sve.push(...s.map((x) => x.id));
    }
    return sve;
  };
  const posij = (redovi) => http('/rest/v1/nodes', { method: 'POST', headers: Object.assign(svcHeaders(), { Prefer: 'return=minimal' }), body: JSON.stringify(redovi) });
  const F = await noviKorisnik({ prefiks: 'mcp-k6' });
  const jF = await prijava(F.email, F.password);
  const tF = (await oauthToken(jF, 'Sokrat kvota (test)')).token;
  const police = Array.from({ length: 10 }, (_, i) => ({ id: crypto.randomUUID(), owner_id: F.id, parent_id: null, kind: 'folder', name: 'Polica ' + i, position: i }));
  const smece = { id: crypto.randomUUID(), owner_id: F.id, parent_id: null, kind: 'folder', name: 'Smeće', position: 10, deleted_at: new Date().toISOString() };
  const s1 = await posij([...police.map((p) => Object.assign({ deleted_at: null }, p)), smece]);
  const s2 = await posij(Array.from({ length: 1980 }, (_, i) => ({ owner_id: F.id, parent_id: police[i % 10].id, kind: 'study', name: 'M' + i, position: Math.floor(i / 10) })));
  const s3 = await posij(Array.from({ length: 3 }, (_, i) => ({ owner_id: F.id, parent_id: smece.id, kind: 'study', name: 'Obrisan ' + i, position: i, deleted_at: smece.deleted_at })));
  record('posijano 1 990 živih (+ obrisana mapa s 3 materijala, ne broji se)', s1.ok && s2.ok && s3.ok && (await zivih(F.id)) === 1990,
    'HTTP ' + [s1.status, s2.status, s3.status].join('/') + ' · živih ' + (await zivih(F.id)));

  // Nacrt AI-ja (prije punjenja do vrha, da je predaja jedino što zapne).
  const zK = await alat(tF, 'zapocni_nacrt', { name: 'Kvota (test)', repeat_key: 'k6:start', new_shelf: 'K6 polica', scope: 'summary', lessons: [{ name: 'Jedina', color: '#6366f1' }] });
  const dK = zK.tijelo && zK.tijelo.draft_id;
  await alat(tF, 'napisi_learn', { draft_id: dK, lesson_id: 'l1', repeat_key: 'k6:learn', title: 'Jedina', blocks: [{ type: 'paragraph', text: 'Kvota drži broj čvorova.' }] });
  const kK = await alat(tF, 'dodaj_kartice', { draft_id: dK, lesson_id: 'l1', repeat_key: 'k6:k', cards: [{ question: 'Što drži kvota?', answer: 'Broj živih čvorova.' }] });
  const cK = kK.tijelo && kK.tijelo.cards && kK.tijelo.cards[0] && kK.tijelo.cards[0].card_id;
  await alat(tF, 'dodaj_pitanja', { draft_id: dK, lesson_id: 'l1', repeat_key: 'k6:p', quiz: [{ question: 'Kvota drži?', options: ['broj čvorova', 'boju'], correct: 0, card: cK }] });

  // Studio, usporedno na rubu: 100 istodobnih na 1 990 → prolazi TOČNO 10 (brava po vlasniku).
  // Utrka bez brave je VJEROJATNOSNA (prozor „izbroji → upiši" je djelić ms): obrnuta provjera 10.10.
  // je jedan krug od 20 bez brave prošla s točno 10, a sonda s istom mutacijom dala 12–14 u 5 od 5
  // krugova. Zato TRI kruga po 100 (F + dva svježa korisnika) i svaki mora dati točno 10.
  const studio = (ime) => rpc(jF, 'create_node', { p_parent: police[0].id, p_kind: 'study', p_name: ime });
  const krug = async (jwt, roditelj) => {
    const r = await Promise.all(Array.from({ length: 100 }, (_, i) => rpc(jwt, 'create_node', { p_parent: roditelj, p_kind: 'study', p_name: 'Rub ' + i })));
    return { ok: r.filter((x) => x.status >= 200 && x.status < 300).length, odbijeno: r.filter(kvotaOdbila).length, tekst: (r.find((x) => x.status >= 400) || {}).tekst };
  };
  const krugovi = [await krug(jF, police[0].id)];
  for (let i = 0; i < 2; i++) {
    const H = await noviKorisnik({ prefiks: 'mcp-k6-rub' });
    const hP = { id: crypto.randomUUID(), owner_id: H.id, parent_id: null, kind: 'folder', name: 'Rub', position: 0 };
    await posij([hP]);
    await posij(Array.from({ length: 1989 }, (_, j) => ({ owner_id: H.id, parent_id: hP.id, kind: 'study', name: 'H' + j, position: j })));
    krugovi.push((await zivih(H.id)) === 1990 ? await krug(await prijava(H.email, H.password), hP.id) : { ok: -1, odbijeno: -1, tekst: 'sjetva nije dala 1 990' });
  }
  record('brava: 3 kruga × 100 usporednih create_node na 1 990 → u svakom prolazi točno 10, ostalih 90 = node_kvota s brojem ' + GRANICA,
    krugovi.every((k) => k.ok === 10 && k.odbijeno === 90), krugovi.map((k) => k.ok + '/' + k.odbijeno).join(' · ') + ' · ' + krugovi[0].tekst);
  record('… u bazi točno ' + GRANICA + ' živih', (await zivih(F.id)) === GRANICA, 'živih ' + (await zivih(F.id)));
  const r2001 = await studio('Dvije tisuće prvi');
  record('2 001. čvor iz Studija odbijen: node_kvota, poruka nosi broj', kvotaOdbila(r2001) && (await zivih(F.id)) === GRANICA, 'HTTP ' + r2001.status + ' ' + r2001.tekst);

  // AI: predaja na punoj kvoti → korisnik, ništa upisano, nacrt ostaje.
  const pK = await alat(tF, 'predaj_nacrt', { draft_id: dK });
  record('predaja na punoj kvoti kroz alat → node_kvota / korisnik (200 + isError), poruka nosi ' + GRANICA,
    pK.status === 200 && pK.isError && !!pK.tijelo && pK.tijelo.error === 'node_kvota' && pK.tijelo.kind === 'korisnik' &&
      String(pK.tijelo.message || '').includes(String(GRANICA)), opis(pK));
  const nK = await nacrtUBazi(dK);
  record('… nacrt je i dalje u bazi (u izradi), živih i dalje ' + GRANICA, !!nK && nK.status === 'u_izradi' && (await zivih(F.id)) === GRANICA,
    (nK ? 'nacrt ' + nK.status : 'NACRT NESTAO') + ' · živih ' + (await zivih(F.id)));

  // Vraćanje mape (4 čvora jednim UPDATE-om): na 1 997 ne stane → CIJELO odbijeno; na 1 996 stane točno.
  const obrisi = async (n) => {
    const ids = (await ziviIdevi(F.id)).filter((x) => !police.some((p) => p.id === x)).slice(0, n);
    for (const id of ids) await rpc(jF, 'delete_node', { p_id: id });
  };
  const smeceZivih = async () => ((await (await http('/rest/v1/nodes?or=(id.eq.' + smece.id + ',parent_id.eq.' + smece.id + ')&deleted_at=is.null&select=id', { headers: svcHeaders() })).json()) || []).length;
  await obrisi(3);
  const v1 = await rpc(jF, 'restore_node', { p_id: smece.id });
  record('vraćanje mape od 4 na 1 997 → node_kvota, NIŠTA vraćeno (ni prva 3 koja bi stala)',
    kvotaOdbila(v1) && (await smeceZivih()) === 0 && (await zivih(F.id)) === 1997, 'HTTP ' + v1.status + ' · vraćeno ' + (await smeceZivih()) + ' · živih ' + (await zivih(F.id)));
  await obrisi(1);
  const v2 = await rpc(jF, 'restore_node', { p_id: smece.id });
  record('… na 1 996 ista mapa stane: vraćena cijela (4), živih točno ' + GRANICA,
    v2.status === 200 && v2.json === 4 && (await smeceZivih()) === 4 && (await zivih(F.id)) === GRANICA, 'HTTP ' + v2.status + ' ' + v2.tekst + ' · živih ' + (await zivih(F.id)));

  // Oslobodi dva mjesta → ista predaja (polica + materijal) sad prolazi.
  await obrisi(2);
  const pK2 = await alat(tF, 'predaj_nacrt', { draft_id: dK });
  record('obrisana 2 → ista predaja prolazi (nova polica + materijal), živih točno ' + GRANICA,
    pK2.status === 200 && !pK2.isError && !(await nacrtUBazi(dK)) && (await zivih(F.id)) === GRANICA, opis(pK2) + ' · živih ' + (await zivih(F.id)));

  // procitaj_materijale: 2 000 živih → četiri stranice od 500, skraćenost i nastavak, unija = baza.
  const stranice = [];
  for (let off = 0, i = 0; i < 6 && off !== undefined; i++) {
    const r = await alat(tF, 'procitaj_materijale', off ? { offset: off } : {});
    stranice.push(r);
    off = r.tijelo && r.tijelo.sljedeci_offset;
  }
  const tj = stranice.map((r) => r.tijelo || {});
  record('procitaj_materijale: 4 stranice ≤ 500, skraceno t/t/t/f, ukupno ' + GRANICA,
    stranice.every((r) => r.status === 200 && !r.isError) && JSON.stringify(tj.map((x) => x.skraceno)) === '[true,true,true,false]' &&
      tj.every((x) => Array.isArray(x.stavke) && x.stavke.length <= 500 && x.ukupno === GRANICA),
    tj.map((x) => (x.stavke || []).length + (x.skraceno ? '+' : '')).join(' / ') + ' · ukupno ' + JSON.stringify(tj.map((x) => x.ukupno)));
  const vidjeno = tj.flatMap((x) => (x.stavke || []).map((s) => s.id));
  const uBazi = await ziviIdevi(F.id);
  record('… unija stranica = živi čvorovi u bazi (' + uBazi.length + '), bez duplikata i bez viška',
    uBazi.length === GRANICA && vidjeno.length === uBazi.length && new Set(vidjeno).size === vidjeno.length && uBazi.every((x) => vidjeno.includes(x)),
    'vidjeno ' + vidjeno.length + ' (različitih ' + new Set(vidjeno).size + ') · u bazi ' + uBazi.length);
  record('… skraćena stranica kaže AI-ju kako dalje (sljedeci_offset + napomena s offsetom)',
    tj.length === 4 && tj.slice(0, 3).every((x, i) => x.sljedeci_offset === (i + 1) * 500 && /offset \d+/.test(x.napomena || '')) && !('sljedeci_offset' in tj[3]),
    JSON.stringify(tj.map((x) => x.sljedeci_offset)) + ' · ' + String(tj[0].napomena || '').slice(0, 90));

  // Jedna naredba s 2 001 retka (svjež korisnik): okidač vidi retke iste naredbe → odbijena CIJELA.
  const G = await noviKorisnik({ prefiks: 'mcp-k6-naredba' });
  const gP = { id: crypto.randomUUID(), owner_id: G.id, parent_id: null, kind: 'folder', name: 'Sve', position: 0 };
  const g1 = await posij([gP]);
  const g2 = await posij(Array.from({ length: GRANICA }, (_, i) => ({ owner_id: G.id, parent_id: gP.id, kind: 'study', name: 'G' + i, position: i })));
  const gTekst = (await g2.text()).slice(0, 140);
  record('jedna naredba s 2 000 redaka uz 1 postojeći → odbijena cijela (node_kvota), ostaje 1',
    g1.ok && g2.status >= 400 && /node_kvota/.test(gTekst) && (await zivih(G.id)) === 1, 'HTTP ' + g1.status + '/' + g2.status + ' · živih ' + (await zivih(G.id)) + ' · ' + gTekst);
  }

  // ⑭ ZAVRSNICA K/7 (N13) — odgovor alata najviše 1 MB, kroz PRAVI MCP (SDK + prijenos, ne samo jezgra).
  // Najveći materijal koji baza uopće primi (točno 1 MB, `publish_node`) uvučen s dva razmaka prelazi
  // granicu → alat ga mora poslati ZBIJENO i CIJELOG. Grana „ni zbijeno ne stane" se uživo ne može
  // dosegnuti (baza ništa veće ne primi) — nju mjeri unit `mcp-alati` (K/7).
  console.log('\n— ⑭ veličina odgovora (K/7) —');
  {   // vlastiti doseg
  const MB = 1048576;
  const velik = (await rpc(jA, 'create_node', { p_parent: polica, p_kind: 'study', p_name: 'Veliki (K/7)' })).json;
  const v0 = ((await (await rest(jA, 'node_content?node_id=eq.' + velik + '&select=version')).json())[0] || {}).version;
  const sadrzaj = valjanTocno(MB);
  const blokova = sadrzaj.l1.learn.blocks.length;
  const znakova = sadrzaj.l1.learn.blocks.reduce((n, b) => n + b.text.length, 0);
  const pub = await rpc(jA, 'publish_node', { p_node_id: velik, p_payload: sadrzaj, p_base_version: v0 });
  record('materijal od TOČNO 1 MB objavljen (najveći koji baza primi)', pub.status === 200, 'HTTP ' + pub.status + ' ' + String(pub.tekst || '').slice(0, 80));

  const r = await mcp(t, 'tools/call', { name: 'procitaj_materijal', arguments: { material_id: velik, lesson_id: 'l1' } });
  const res = (r.json && r.json.result) || {};
  const tekst = String((res.content && res.content[0] && res.content[0].text) || '');
  let j = null;
  try { j = JSON.parse(tekst); } catch (e) { /* ostaje null */ }
  const uvuceno = j ? Buffer.byteLength(JSON.stringify(j, null, 2)) : 0;
  record('procitaj_materijal te lekcije → ZBIJENO ≤ 1 MB (uvučeno bi bilo > 1 MB)',
    r.status === 200 && !res.isError && !!j && Buffer.byteLength(tekst) <= MB && tekst === JSON.stringify(j) && uvuceno > MB,
    'HTTP ' + r.status + (res.isError ? ' isError ' + tekst.slice(0, 120) : '') + ' · poslano ' + Buffer.byteLength(tekst) + ' B · uvučeno bi bilo ' + uvuceno + ' B');
  const bl = (j && j.lesson && j.lesson.learn && j.lesson.learn.blocks) || [];
  const zn = bl.reduce((n, b) => n + String(b.text || '').length, 0);
  record('… i CIJELO: isti broj blokova i znakova kao objavljeno', bl.length === blokova && zn === znakova,
    'blokova ' + bl.length + '/' + blokova + ' · znakova ' + zn + '/' + znakova);
  }

  record('doseg: izvedeno točno ' + OCEKIVANO_PROVJERA + ' provjera', touched === OCEKIVANO_PROVJERA,
    touched === OCEKIVANO_PROVJERA ? '' : 'izvedeno ' + touched +
      (touched < OCEKIVANO_PROVJERA ? ' ← BLOK JE PRESKOČEN' : ' ← nova provjera bez podignute osnovice'));

  await pometi();
  console.log('\n  dotaknuto: ' + touched + ' provjera, palo: ' + failed);
  console.log(failed ? '✗ ALATI NE DRŽE\n' : '✅ alati drže\n');
  process.exit(failed ? 1 : 0);
})().catch(async (e) => {
  await pometi();
  console.log('✗ brana je pukla: ' + e.message);
  process.exit(1);
});
