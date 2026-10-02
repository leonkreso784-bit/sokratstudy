// mcp-izmjena-check.js — AI MIJENJA POSTOJEĆI VLASTITI MATERIJAL (F6 ②/4b, ADR-039 t.2).
// Pokreni: npm run mcp:izmjena   (mrežno, STAGING-only, stvara i briše jednokratne korisnike)
//
// ─── ŠTO TVRDI ──────────────────────────────────────────────────────────────────────────────────
// Odluke (Leon, anketa 02.10.): kopija u nacrt izmjene s polaznom verzijom → AI radi istim alatima →
// predaja upisuje JEDNOM, samo ako materijal od kopije nitko nije mijenjao. Brana mjeri:
//
//   ① čitanje: AI čita VLASTITI materijal s verzijom; tuđi / polica / obrisan / nepostojeći → ista
//      greška; id iz kataloga odbijen; obična sesija ne zove; `node_content` i povijest AI-ju zatvoreni
//   ② izmjena: kopija nosi polaznu verziju i sadržaj; predaja upiše sadržaj i ime, nacrt nestane,
//      povijest dobije TOČNO jedan redak (staro stanje, `mcp_izmjena`, `client_id` AI-ja, polazna verzija)
//   ③ SUKOB: korisnik izmijeni materijal poslije kopije → predaja odbijena, materijal bajt-isti
//      (sadržaj, verzija, ime), bez retka povijesti; meko obrisan materijal → odbijeno
//   ④ dvaput = jedna: ponovljena predaja (slijedno i usporedno) = isti materijal, jedan redak povijesti;
//      ključ ponavljanja: isti ključ = isti nacrt, tuđ ključ zauzet; nova izmjena istog materijala zamijeni staru
//   ⑤ samo svoje: stranac ne kopira, ne predaje, ne vraća; izmjena ne prima policu; korisnikov prihvat
//      nacrta izmjene ne stvara nov materijal; token ne zove `publish_node` izravno
//   ⑥ vrati: AI-jeva zadnja izmjena se poništi kao NOVA verzija; ponovljeno = isto; poslije korisnikove
//      izmjene → sukob, netaknuto; materijal bez AI izmjene → `izmjena_nema`
//   ⑦ sadržaj: podmetnut neispravan sadržaj → odbijen, materijal netaknut; pitanje s karticom koju je
//      korisnik obrisao ne blokira izmjenu (veza se pri kopiji skida, pitanje ostaje)
//
// ⚠️ Greške se sude po IMENU iz poruke, ne po HTTP broju (isti razlog kao `mcp:nacrt`).
// Ishod: exit 1 = izmjena ne drži · exit 0 + SKIP = nema STAGING_* / SERVICE u `.env`.

const {
  ANON, BASE, SERVICE, NULA,
  http, svcHeaders, ref, jeProdukcija, odbijen, noviKorisnik, pometi, prijava, oauthToken, rpc
} = require('./lib/staging-oauth');

/** Čegrtaljka dosega (kalup `check:final`): manje = blok tiho otpao, više = osnovica nije podignuta. */
const OCEKIVANO_PROVJERA = 41;   // bez retka „doseg" (brojač se čita prije njega, kalup `mcp:predaja`)

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
const opis = (r) => 'HTTP ' + r.status + ' ' + (greska(r) || String(r.tekst || '').replace(/\s+/g, ' ').slice(0, 80));
function odbijenKao(ime, r, kod) {
  record(ime, greska(r) === kod, opis(r) + (greska(r) === kod ? '' : ' ← očekivano ' + kod));
}
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const idIz = (r) => (r.status === 200 && typeof r.json === 'string' && UUID.test(r.json)) ? r.json : null;

const kanon = (v) => Array.isArray(v) ? v.map(kanon) : (v && typeof v === 'object'
  ? Object.keys(v).sort().reduce((o, k) => (o[k] = kanon(v[k]), o), {}) : v);
const isto = (a, b) => JSON.stringify(kanon(a)) === JSON.stringify(kanon(b));
const kopija = (v) => JSON.parse(JSON.stringify(v));

/** `client_id` iz AI tokena — povijest ga mora zapisati. */
const clientIz = (jwt) => JSON.parse(Buffer.from(jwt.split('.')[1], 'base64url').toString()).client_id;

/** Valjan materijal: Learn, kartica, kviz i dopuna koji upućuju na tu karticu. */
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
/** Ono što AI napravi u izmjeni: nova kartica i nova lekcija. */
function izmijenjeno(p, oznaka) {
  const n = kopija(p);
  n.l1.flashcards.push({ id: 'k2', question: 'Mejoza ' + oznaka, answer: 'Redukcijska dioba' });
  n.l2 = { name: 'Nova lekcija ' + oznaka, icon: 'fa-book', color: '#10b981', flashcards: [], quiz: [], fillBlanks: [] };
  return n;
}

let kljucBr = 0;
const noviKljuc = () => 'iz-' + Date.now() + '-' + (++kljucBr);

async function sadrzajMaterijala(nodeId) {
  const r = await (await http('/rest/v1/node_content?node_id=eq.' + nodeId + '&select=payload,version', { headers: svcHeaders() })).json();
  return (Array.isArray(r) && r[0]) || null;
}
async function imeMaterijala(nodeId) {
  const r = await (await http('/rest/v1/nodes?id=eq.' + nodeId + '&select=name', { headers: svcHeaders() })).json();
  return (Array.isArray(r) && r[0] && r[0].name) || null;
}
/** Redci povijesti (service). Na starom kodu stupaca `client_id`/`verzija` nema → prazan niz, ne pad. */
async function povijest(nodeId) {
  const r = await (await http('/rest/v1/node_content_versions?node_id=eq.' + nodeId +
    '&select=id,op,client_id,verzija,edited_by,payload&order=id', { headers: svcHeaders() })).json();
  return Array.isArray(r) ? r : [];
}
async function nacrtPostoji(id) {
  if (!id) return false;
  const r = await (await http('/rest/v1/node_drafts?id=eq.' + id + '&select=id', { headers: svcHeaders() })).json();
  return Array.isArray(r) && r.length === 1;
}
async function podmetni(id, polja) {
  if (!id) return;
  await http('/rest/v1/node_drafts?id=eq.' + id, {
    method: 'PATCH', headers: Object.assign(svcHeaders(), { Prefer: 'return=minimal' }), body: JSON.stringify(polja)
  });
}
async function cvorovi(uid) {
  const r = await (await http('/rest/v1/nodes?owner_id=eq.' + uid + '&deleted_at=is.null&select=id', { headers: svcHeaders() })).json();
  return Array.isArray(r) ? r.length : -1;
}

/** Obična sesija objavi sadržaj u vlastiti materijal (kao Studio). */
async function objavi(jwt, nodeId, payload) {
  const v = (await sadrzajMaterijala(nodeId)).version;
  const r = await rpc(jwt, 'publish_node', { p_node_id: nodeId, p_payload: payload, p_base_version: v });
  if (r.status !== 200) throw new Error('objava (obična sesija): ' + opis(r));
  return r.json;
}
async function materijal(jwt, polica, ime, payload) {
  const id = (await rpc(jwt, 'create_node', { p_parent: polica, p_kind: 'study', p_name: ime })).json;
  await objavi(jwt, id, payload);
  return id;
}

const zapocni = (t, id, kljuc) => rpc(t, 'mcp_zapocni_izmjenu', { p_id: id, p_kljuc: kljuc || noviKljuc() });
const procitajNacrt = (t, id) => rpc(t, 'mcp_procitaj_nacrt', { p_id: id });
const upisi = (t, id, payload, verzija) => rpc(t, 'mcp_upisi_nacrt', { p_id: id, p_payload: payload, p_verzija: verzija });
const predaj = (t, id, polica, nova) => rpc(t, 'mcp_predaj_nacrt', { p_id: id, p_polica: polica || null, p_nova_polica: nova || null });
const vrati = (t, id) => rpc(t, 'mcp_vrati_izmjenu', { p_id: id });

/** Cijela izmjena kako je radi AI: kopija → upis → (ime) → predaja. Vraća { nacrt, r } bez bacanja. */
async function izmjena(t, nodeId, novi, ime) {
  const nacrt = idIz(await zapocni(t, nodeId));
  if (!nacrt) return { nacrt: null, r: { status: 0, tekst: 'nacrt izmjene nije nastao', json: null } };
  const d = (await procitajNacrt(t, nacrt)).json || {};
  await upisi(t, nacrt, novi(d.payload || {}), d.verzija || 1);
  if (ime) await rpc(t, 'mcp_preimenuj_nacrt', { p_id: nacrt, p_name: ime });
  return { nacrt, r: await predaj(t, nacrt) };
}

(async () => {
  if (!BASE || !ANON) skip('nema STAGING_SUPABASE_URL / STAGING_SUPABASE_ANON u .env');
  if (!SERVICE) skip('nema STAGING_SUPABASE_SERVICE_KEY (brana stvara i briše jednokratne korisnike)');
  if (jeProdukcija()) {
    console.log('❌ ODBIJENO: ova brana piše i briše — PRODUKCIJA je zabranjena (CLAUDE #8).');
    process.exit(1);
  }
  console.log('\n=== mcp:izmjena === (staging ' + ref() + ')\n');

  const A = await noviKorisnik({ prefiks: 'mcp-izmjena' });
  const B = await noviKorisnik({ prefiks: 'mcp-izmjena' });
  const jA = await prijava(A.email, A.password);
  const jB = await prijava(B.email, B.password);
  const aA = (await oauthToken(jA, 'Sokrat izmjena (test)')).token;
  const aB = (await oauthToken(jB, 'Sokrat izmjena (test)')).token;

  const policaA = (await rpc(jA, 'create_node', { p_parent: null, p_kind: 'folder', p_name: 'Biologija' })).json;
  const M = await materijal(jA, policaA, 'Stanica', sadrzaj('A'));
  const policaB = (await rpc(jB, 'create_node', { p_parent: null, p_kind: 'folder', p_name: 'Tuđa' })).json;
  const MB = await materijal(jB, policaB, 'Tuđi materijal', sadrzaj('B'));
  const MBprije = await sadrzajMaterijala(MB);

  console.log('— ① čitanje —');
  const c1 = await rpc(aA, 'mcp_procitaj_materijal', { p_id: M });
  const zivo = await sadrzajMaterijala(M);
  record('AI čita vlastiti materijal: ime, verzija i sadržaj kakvi su u bazi',
    c1.status === 200 && !!c1.json && c1.json.name === 'Stanica' && c1.json.verzija === zivo.version && isto(c1.json.payload, zivo.payload),
    opis(c1) + (c1.json && c1.json.verzija !== undefined ? ' · verzija ' + c1.json.verzija + '/' + zivo.version : ''));
  const tudji = await rpc(aA, 'mcp_procitaj_materijal', { p_id: MB });
  odbijenKao('tuđi materijal → materijal_ne_postoji', tudji, 'materijal_ne_postoji');
  const nema = await rpc(aA, 'mcp_procitaj_materijal', { p_id: NULA });
  record('tuđi i nepostojeći materijal daju ISTI odgovor', tudji.status === nema.status && tudji.tekst === nema.tekst,
    'tuđi ' + opis(tudji) + ' · nepostojeći ' + opis(nema));
  odbijenKao('polica umjesto materijala → materijal_ne_postoji', await rpc(aA, 'mcp_procitaj_materijal', { p_id: policaA }), 'materijal_ne_postoji');
  const kat = await rpc(aA, 'mcp_procitaj_materijal', { p_id: 'microeconomics' });
  record('id kataloškog predmeta odbijen (katalog nije materijal)', kat.status >= 400 && !(kat.json && kat.json.payload), opis(kat));
  const ob1 = await rpc(jA, 'mcp_procitaj_materijal', { p_id: M });
  record('obična sesija NE zove AI-jevo čitanje', odbijen(ob1.status, ob1.tekst), opis(ob1));
  const nc = await http('/rest/v1/node_content?select=node_id', { headers: { apikey: ANON, Authorization: 'Bearer ' + aA } });
  const ncv = await http('/rest/v1/node_content_versions?select=id', { headers: { apikey: ANON, Authorization: 'Bearer ' + aA } });
  record('AI izravno ne čita ni `node_content` ni povijest (samo kroz RPC)', [401, 403].includes(nc.status) && [401, 403].includes(ncv.status),
    'node_content HTTP ' + nc.status + ' · povijest HTTP ' + ncv.status);

  console.log('\n— ② izmjena —');
  const prije2 = await sadrzajMaterijala(M);
  const povPrije2 = (await povijest(M)).length;
  const n2 = idIz(await zapocni(aA, M));
  const d2 = n2 ? (await procitajNacrt(aA, n2)).json : null;
  record('kopija: nacrt izmjene nosi izvor, polaznu verziju i sadržaj materijala',
    !!d2 && d2.izvor_id === M && d2.polazna_verzija === prije2.version && isto(d2.payload, prije2.payload),
    d2 ? 'izvor ' + (d2.izvor_id === M ? 'ok' : d2.izvor_id) + ' · polazna ' + d2.polazna_verzija + '/' + prije2.version : 'nacrta nema');
  record('… dok se izmjena ne preda, materijal je netaknut', isto(await sadrzajMaterijala(M), prije2));
  const novi2 = izmijenjeno(prije2.payload, '2');
  if (n2) await upisi(aA, n2, novi2, d2.verzija);
  const im2 = n2 ? await rpc(aA, 'mcp_preimenuj_nacrt', { p_id: n2, p_name: 'Stanica i dioba' }) : { status: 0 };
  const r2 = n2 ? await predaj(aA, n2) : { status: 0, tekst: '', json: null };
  record('predaja izmjene vraća id ISTOG materijala', idIz(r2) === M, opis(r2));
  const poslije2 = await sadrzajMaterijala(M);
  record('materijal sad ima sadržaj iz nacrta, verzija +1', isto(poslije2.payload, novi2) && poslije2.version === prije2.version + 1,
    'verzija ' + prije2.version + ' → ' + poslije2.version);
  record('ime materijala promijenjeno (preimenuj u nacrtu; void RPC = HTTP 204)', [200, 204].includes(im2.status) && (await imeMaterijala(M)) === 'Stanica i dioba', await imeMaterijala(M));
  record('nacrt izmjene je obrisan', !!n2 && !(await nacrtPostoji(n2)));
  const pov2 = (await povijest(M)).slice(povPrije2);
  const r2pov = pov2[0] || {};
  record('povijest: TOČNO jedan nov redak — staro stanje, `mcp_izmjena`, client_id AI-ja, polazna verzija, korisnik',
    pov2.length === 1 && isto(r2pov.payload, prije2.payload) && r2pov.op === 'mcp_izmjena' && r2pov.client_id === clientIz(aA) &&
    r2pov.verzija === prije2.version && r2pov.edited_by === A.id,
    pov2.length + ' redak · op ' + r2pov.op + ' · client ' + (r2pov.client_id === clientIz(aA) ? 'ok' : r2pov.client_id) + ' · verzija ' + r2pov.verzija);
  const ob2 = await objavi(jA, M, (await sadrzajMaterijala(M)).payload);
  const pov2b = (await povijest(M)).slice(-1)[0] || {};
  record('… a izmjena iz Studija i dalje bilježi `update` bez client_id (stari put nepromijenjen)',
    !!ob2 && pov2b.op === 'update' && pov2b.client_id === null, 'op ' + pov2b.op + ' · client ' + pov2b.client_id);

  console.log('\n— ③ sukob —');
  const n3 = idIz(await zapocni(aA, M));
  const d3 = n3 ? (await procitajNacrt(aA, n3)).json : null;
  const korisnikov = izmijenjeno(sadrzaj('korisnik'), 'K');
  await objavi(jA, M, korisnikov);                       // korisnik u Studiju, POSLIJE kopije
  const prije3 = await sadrzajMaterijala(M);
  const ime3 = await imeMaterijala(M);
  const povPrije3 = (await povijest(M)).length;
  if (n3) await upisi(aA, n3, izmijenjeno(d3.payload, 'AI'), d3.verzija);
  if (n3) await rpc(aA, 'mcp_preimenuj_nacrt', { p_id: n3, p_name: 'AI ime' });
  odbijenKao('korisnik izmijenio materijal poslije kopije → predaja odbijena (izmjena_sukob)', n3 ? await predaj(aA, n3) : { status: 0, tekst: '', json: null }, 'izmjena_sukob');
  const poslije3 = await sadrzajMaterijala(M);
  record('… materijal bajt-isti: korisnikov sadržaj, verzija i ime, bez retka povijesti',
    isto(poslije3.payload, korisnikov) && poslije3.version === prije3.version && (await imeMaterijala(M)) === ime3 &&
    (await povijest(M)).length === povPrije3, 'verzija ' + prije3.version + ' → ' + poslije3.version);
  const M3 = await materijal(jA, policaA, 'Kratkog vijeka', sadrzaj('KV'));
  const n3b = idIz(await zapocni(aA, M3));
  await rpc(jA, 'delete_node', { p_id: M3 });
  odbijenKao('materijal u međuvremenu obrisan → predaja odbijena (materijal_ne_postoji)', n3b ? await predaj(aA, n3b) : { status: 0, tekst: '', json: null }, 'materijal_ne_postoji');

  console.log('\n— ④ dvaput = jedna —');
  const M4 = await materijal(jA, policaA, 'Genetika', sadrzaj('G'));
  const v4 = (await sadrzajMaterijala(M4)).version;
  const { nacrt: n4, r: r4 } = await izmjena(aA, M4, (p) => izmijenjeno(p, '4'));
  const r4b = n4 ? await predaj(aA, n4) : { status: 0, tekst: '', json: null };
  record('ponovljena predaja (izgubljen odgovor) → isti materijal, bez druge izmjene',
    idIz(r4) === M4 && idIz(r4b) === M4 && (await sadrzajMaterijala(M4)).version === v4 + 1, opis(r4b));
  const n4u = idIz(await zapocni(aA, M4));
  const d4u = n4u ? (await procitajNacrt(aA, n4u)).json : null;
  if (n4u) await upisi(aA, n4u, izmijenjeno(sadrzaj('U'), 'U'), d4u.verzija);
  const povPrije4 = (await povijest(M4)).length;
  const usporedno = await Promise.all(Array.from({ length: 6 }, () => predaj(aA, n4u)));
  record('6 usporednih predaja iste izmjene → sve vrate isti materijal, TOČNO jedan redak povijesti',
    usporedno.every((x) => idIz(x) === M4) && (await povijest(M4)).length === povPrije4 + 1,
    usporedno.map((x) => idIz(x) === M4 ? 'id' : greska(x)).join(',') + ' · redaka +' + ((await povijest(M4)).length - povPrije4));
  const kljuc = noviKljuc();
  const k1 = idIz(await zapocni(aA, M4, kljuc));
  const k2 = idIz(await zapocni(aA, M4, kljuc));
  record('isti ključ ponavljanja = isti nacrt izmjene', !!k1 && k1 === k2);
  odbijenKao('isti ključ za DRUGI materijal → nacrt_kljuc_zauzet', await zapocni(aA, M, kljuc), 'nacrt_kljuc_zauzet');
  odbijenKao('ključ izmjene ne vraća se kao nov nacrt (mcp_zapocni_nacrt) → nacrt_kljuc_zauzet', await rpc(aA, 'mcp_zapocni_nacrt',
    { p_name: 'X', p_kljuc: kljuc, p_polica: policaA, p_nova_polica: null, p_opseg: 'sazeto' }), 'nacrt_kljuc_zauzet');
  const k3 = idIz(await zapocni(aA, M4));
  record('nova izmjena ISTOG materijala zamijeni staru (jedna po materijalu)', !!k3 && k3 !== k1 && !(await nacrtPostoji(k1)) && await nacrtPostoji(k3));
  if (k3) await rpc(jA, 'odbaci_nacrt', { p_id: k3 });

  console.log('\n— ⑤ samo svoje —');
  odbijenKao('stranac (njegov AI) ne kopira tuđi materijal', await zapocni(aB, M), 'materijal_ne_postoji');
  const n5 = idIz(await zapocni(aA, M));
  odbijenKao('stranac ne predaje tuđi nacrt izmjene', n5 ? await predaj(aB, n5) : { status: 0, tekst: '', json: null }, 'nacrt_ne_postoji');
  odbijenKao('stranac ne vraća izmjenu na tuđem materijalu', await vrati(aB, M4), 'materijal_ne_postoji');
  odbijenKao('izmjena ne prima policu → izmjena_polica', n5 ? await predaj(aA, n5, policaA) : { status: 0, tekst: '', json: null }, 'izmjena_polica');
  const ob5 = await zapocni(jA, M);
  const ob5v = await vrati(jA, M4);
  record('obična sesija ne zove ni kopiju ni vraćanje (put je samo AI-jev)', odbijen(ob5.status, ob5.tekst) && odbijen(ob5v.status, ob5v.tekst),
    opis(ob5) + ' · ' + opis(ob5v));
  const prije5 = await cvorovi(A.id);
  await podmetni(n5, { status: 'predan', submitted_at: new Date().toISOString() });
  odbijenKao('korisnikov prihvat nacrta izmjene NE stvara nov materijal → nacrt_je_izmjena',
    n5 ? await rpc(jA, 'prihvati_nacrt', { p_id: n5, p_polica: policaA, p_nova_polica: null }) : { status: 0, tekst: '', json: null }, 'nacrt_je_izmjena');
  const pn = await rpc(aA, 'publish_node', { p_node_id: M, p_payload: sadrzaj('mimo'), p_base_version: (await sadrzajMaterijala(M)).version });
  record('token AI-ja ne zove `publish_node` izravno', odbijen(pn.status, pn.tekst), opis(pn));
  record('… B-ov materijal netaknut, A nema novih čvorova', isto(await sadrzajMaterijala(MB), MBprije) && (await cvorovi(A.id)) === prije5);
  if (n5) await rpc(jA, 'odbaci_nacrt', { p_id: n5 });

  console.log('\n— ⑥ vrati —');
  const M6 = await materijal(jA, policaA, 'Evolucija', sadrzaj('E'));
  const prije6 = await sadrzajMaterijala(M6);
  odbijenKao('materijal bez AI izmjene → izmjena_nema', await vrati(aA, M6), 'izmjena_nema');
  await izmjena(aA, M6, (p) => izmijenjeno(p, '6'));
  const v6 = await vrati(aA, M6);
  const poslije6 = await sadrzajMaterijala(M6);
  record('vrati: sadržaj prije AI-jeve izmjene, kao NOVA verzija (+2 od polazne)',
    v6.status === 200 && v6.json === prije6.version + 2 && isto(poslije6.payload, prije6.payload) && poslije6.version === prije6.version + 2,
    opis(v6) + ' · verzija ' + prije6.version + ' → ' + poslije6.version);
  const zadnji6 = (await povijest(M6)).slice(-1)[0] || {};
  record('… povijest bilježi vraćanje (`mcp_vrati`, client_id AI-ja)', zadnji6.op === 'mcp_vrati' && zadnji6.client_id === clientIz(aA), 'op ' + zadnji6.op);
  const povPrije6 = (await povijest(M6)).length;
  const v6b = await vrati(aA, M6);
  record('ponovljeno vraćanje → ista verzija, bez novog upisa', v6b.status === 200 && v6b.json === poslije6.version &&
    (await sadrzajMaterijala(M6)).version === poslije6.version && (await povijest(M6)).length === povPrije6, opis(v6b));
  await izmjena(aA, M6, (p) => izmijenjeno(p, '6b'));
  await objavi(jA, M6, sadrzaj('korisnik poslije'));
  const prije6c = await sadrzajMaterijala(M6);
  odbijenKao('korisnik izmijenio poslije AI-jeve izmjene → vraćanje odbijeno (izmjena_sukob)', await vrati(aA, M6), 'izmjena_sukob');
  record('… korisnikov sadržaj netaknut', isto(await sadrzajMaterijala(M6), prije6c));

  console.log('\n— ⑦ sadržaj —');
  const n7 = idIz(await zapocni(aA, M));
  const zlo = kopija((await sadrzajMaterijala(M)).payload);
  zlo.l1.learn.blocks.push({ id: 'b9', type: 'legacy-html', html: '<img src=x onerror=alert(1)>' });
  await podmetni(n7, { payload: zlo });
  const prije7 = await sadrzajMaterijala(M);
  odbijenKao('podmetnut sadržaj izvan strogog profila → sadrzaj_neispravan', n7 ? await predaj(aA, n7) : { status: 0, tekst: '', json: null }, 'sadrzaj_neispravan');
  record('… materijal netaknut', isto(await sadrzajMaterijala(M), prije7));
  if (n7) await rpc(jA, 'odbaci_nacrt', { p_id: n7 });
  const M7 = await materijal(jA, policaA, 'Viseća kartica', sadrzaj('V', 'obrisana-kartica'));
  const { nacrt: n7b, r: r7 } = await izmjena(aA, M7, (p) => izmijenjeno(p, '7'));
  const p7 = (await sadrzajMaterijala(M7)).payload;
  record('pitanje s karticom koju je korisnik obrisao ne blokira izmjenu: upisano, pitanje ostaje, bez veze',
    !!n7b && idIz(r7) === M7 && p7.l1.quiz.length === 1 && !('card' in p7.l1.quiz[0]) && !('card' in p7.l1.fillBlanks[0]), opis(r7));

  record('doseg: izvedeno točno ' + OCEKIVANO_PROVJERA + ' provjera', touched === OCEKIVANO_PROVJERA,
    touched === OCEKIVANO_PROVJERA ? '' : 'izvedeno ' + touched +
      (touched < OCEKIVANO_PROVJERA ? ' ← BLOK JE PRESKOČEN' : ' ← nova provjera bez podignute osnovice'));

  await pometi();
  console.log('\n  dotaknuto: ' + touched + ' provjera, palo: ' + failed);
  console.log(failed ? '✗ IZMJENA NE DRŽI\n' : '✅ izmjena drži\n');
  process.exit(failed ? 1 : 0);
})().catch(async (e) => {
  await pometi();
  console.log('✗ brana je pukla: ' + e.message);
  process.exit(1);
});
