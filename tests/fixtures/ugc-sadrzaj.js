// ugc-sadrzaj.js — ZAJEDNIČKI primjeri za strogi profil osobnog sadržaja (F6 ②/0a–b).
//
// Čitaju ih DVA čitatelja, namjerno isti popis:
//   • `tests/unit/ugc-shema.test.js` — shema (`schema/ugc-content.schema.json`) kroz ajv, bez mreže
//   • `scripts/ugc-sadrzaj-check.js` — BAZA na stagingu (pg_jsonschema), svaki put upisa
// Da su popisi odvojeni, baza i shema bi se mogle razići a da nijedna brana to ne vidi.
//
// `pada` = mora biti odbijeno. `samoBaza` = shema to ne može izraziti (jedinstveni id-evi) → unit ga
// PRESKAČE i broji preskočeno, baza ga mora odbiti. `jsonbOdbija` = odbija ga već Postgresov parser
// (ne naš validator), pa ga baza-brana sudi po tom imenu. Izvor zlonamjernih oblika: MCP_SECURITY N1, N3, N5.

/** Najmanji valjan materijal: jedna lekcija. */
const lekcija = (dodatak) => ({ l1: Object.assign({ name: 'Lekcija', icon: 'fa-book', color: '#6366f1' }, dodatak || {}) });
const uLearn = (blok) => lekcija({ learn: { blocks: [blok] } });
const poveznica = (href) => uLearn({ id: 'p1', type: 'paragraph', text: [{ text: 'klik', href }] });

/** Duboko gniježđenje (N5: dubina 3 000 prošla je upis nacrta). */
function duboko(n) {
  let o = { kraj: true };
  for (let i = 0; i < n; i++) o = { x: o };
  return lekcija({ learn: { blocks: [{ id: 'd1', type: 'paragraph', text: 'a', dublje: o }] } });
}

const kartice = (n, duljina) => Array.from({ length: n }, (_, i) =>
  ({ id: 'k' + i, question: 'P' + i, answer: 'x'.repeat(duljina || 5) }));

// ─── valjano — uključujući oblike koje Studio STVARNO sprema (PROD, pročitano 30.09.) ───────────
const rucnoProlazi = [
  { ime: 'najmanja lekcija (samo ime)', payload: { l1: { name: 'Samo ime' } } },
  { ime: 'prazna lekcija kakvu Studio stvori (sekcija-1, prazni nizovi)', payload: { 'sekcija-1': {
    name: 'Nova sekcija', icon: 'fa-book', color: '#6366f1', flashcards: [], quiz: [], fillBlanks: [], learn: { blocks: [] } } } },
  { ime: 'Studio u izradi: prazan video, prazna formula, prazna stavka liste', payload: lekcija({ learn: { blocks: [
    { id: '4oobo2', type: 'list', items: [''], ordered: false },
    { id: 'iewyrq', type: 'video', url: '' },
    { id: 'e1swgl', type: 'formula', tex: '', display: true }] } }) },
  { ime: 'Studio: vlastita slika (node-img), odlomak s bojom, YouTube', payload: lekcija({ learn: { blocks: [
    { id: 'whdd4r', type: 'paragraph', text: 'Tekst ', color: '#10b981' },
    { id: 'ownorp', type: 'image', width: 63, caption: 'Opis',
      src: 'node-img:38e6a202-4690-4405-ac18-da46f9c86cc8/7cc0ce59-ba79-4a85-acc6-eac006ab5d3f/814fe7c9.jpg' },
    { id: 'p94frg', type: 'video', url: 'https://youtu.be/6zLCZ_Ic1hI?si=XFOsFIM5dqyhMSX5', color: '#ef4444' }] } }) },
  { ime: 'kartice, kviz, dopuna (s answers), learn sa svim tipovima blokova', payload: lekcija({
    flashcards: [{ id: 'f1', question: 'Što je BDP?', answer: 'Vrijednost proizvodnje.', explanation: 'Detalj', color: '#a855f7' }],
    quiz: [{ id: 'q1', question: 'Koliko?', options: ['1', '2', '3'], correct: 2 }],
    fillBlanks: [{ id: 'b1', sentence: 'BDP je _______.', answer: 'zbroj', answers: ['zbroj', 'suma'], hint: 'h' }],
    learn: { title: 'Naslov', blocks: [
      { id: 'h1', type: 'heading', level: 2, text: 'Uvod' },
      { id: 'c1', type: 'callout', variant: 'tip', title: 'Savjet', text: [{ text: 'jako', b: true }, { text: ' i ', i: true }, { text: 'x^2', math: true }] },
      { id: 't1', type: 'table', header: ['A', 'B'], rows: [['1', '2']] },
      { id: 'm1', type: 'formula', tex: '\\frac{a}{b}', display: false }] } }) },
  { ime: 'najdublji valjan oblik: tablica s formatiranim ćelijama i poveznicom (kontrola granice dubine)',
    payload: lekcija({ learn: { blocks: [{ id: 't2', type: 'table',
      header: [[{ text: 'Stupac', b: true }]], rows: [[[{ text: 'ćelija', i: true, href: 'https://example.com' }]]] }] } }) },
  { ime: 'poveznica https', payload: poveznica('https://hr.wikipedia.org/wiki/BDP') },
  { ime: 'poveznica mailto', payload: poveznica('mailto:profesor@example.com') },
  { ime: 'poveznica bez sheme (Studio sprema što korisnik upiše)', payload: poveznica('www.example.com/stranica') },
  { ime: 'kartica od TOČNO 500 znakova (granica nije pomaknuta)', payload: lekcija({ flashcards: kartice(1, 500) }) },
  { ime: '500 kartica u lekciji (granica)', payload: lekcija({ flashcards: kartice(500) }) },
  { ime: 'schemaVersion uz lekciju', payload: Object.assign({ schemaVersion: 2 }, lekcija()) },
  // kontrole-blizanci: isti oblik kao odbijeni primjer, TIK ispod granice — da odbijanje ima pravi uzrok
  { ime: 'KONTROLA 100 lekcija (101 pada)', payload: Object.fromEntries(Array.from({ length: 100 }, (_, i) => ['l' + i, { name: 'L' + i }])) },
  { ime: 'KONTROLA kviz sa 6 opcija (7 pada)', payload: lekcija({ quiz: [{ id: 'q', question: '?', options: ['1', '2', '3', '4', '5', '6'], correct: 5 }] }) },
  { ime: 'KONTROLA kviz s vlastitom slikom (vanjska pada)', payload: lekcija({ quiz: [{ id: 'q', question: '?', options: ['a', 'b'], correct: 0,
    image: 'node-img:38e6a202-4690-4405-ac18-da46f9c86cc8/7cc0ce59-ba79-4a85-acc6-eac006ab5d3f/6eb52b93-a1c1-4b58-8860-a206f2545335.webp' }] }) },
  { ime: 'KONTROLA redak tablice s 50 ćelija (51 pada)', payload: uLearn({ id: 't', type: 'table', rows: [Array.from({ length: 50 }, () => 'c')] }) }
];

// ─── mora pasti ─────────────────────────────────────────────────────────────────────────────────
const rucnoPada = [
  // N2/N3/N5: sirovi HTML
  { ime: 'legacy-html blok (iframe srcdoc)', payload: uLearn({ id: 'x1', type: 'legacy-html', html: '<iframe srcdoc="<script src=https://cdn.jsdelivr.net/gh/x/y/a.js></script>"></iframe>' }) },
  { ime: 'learn.content (sirovi HTML, sloj preko ekrana)', payload: lekcija({ learn: { content: '<div style="position:fixed;inset:0">Prijavi se ponovno</div>' } }) },
  // N3: vanjske slike
  { ime: 'vanjska slika https', payload: uLearn({ id: 'i1', type: 'image', src: 'https://tracker.example.com/pixel.png' }) },
  { ime: 'slika data:image', payload: uLearn({ id: 'i2', type: 'image', src: 'data:image/png;base64,iVBORw0KGgo=' }) },
  { ime: 'kviz sa vanjskom slikom', payload: lekcija({ quiz: [{ id: 'q', question: '?', options: ['a', 'b'], correct: 0, image: 'https://x.example/a.png' }] }) },
  // N1: poveznice
  { ime: 'poveznica javascript:', payload: poveznica('javascript:alert(document.cookie)') },
  { ime: 'poveznica JAVASCRIPT: (velika slova)', payload: poveznica('JAVASCRIPT:alert(1)') },
  { ime: 'poveznica java<TAB>script:', payload: poveznica('java\tscript:alert(1)') },
  { ime: 'poveznica java<LF>script:', payload: poveznica('java\nscript:alert(1)') },
  { ime: 'poveznica java<CR>script:', payload: poveznica('java\rscript:alert(1)') },
  // `\u0000` ne stigne ni do validatora: Postgresov `jsonb` ga odbija sam (`unsupported Unicode
  // escape sequence`). Ostaje primjer jer ga renderer (②/0c) i dalje mora odbiti na drugim putovima.
  { ime: 'poveznica \\x00javascript:', jsonbOdbija: true, payload: poveznica('\u0000javascript:alert(1)') },
  { ime: 'poveznica \\x01javascript:', payload: poveznica('\u0001javascript:alert(1)') },
  { ime: 'poveznica \\x1fjavascript:', payload: poveznica('\u001fjavascript:alert(1)') },
  { ime: 'poveznica da<TAB>ta:text/html', payload: poveznica('da\tta:text/html,<script>alert(1)</script>') },
  { ime: 'poveznica data:text/html', payload: poveznica('data:text/html,<script>alert(1)</script>') },
  { ime: 'poveznica vbscript:', payload: poveznica('vbscript:msgbox(1)') },
  // N5: nepoznato
  { ime: 'nepoznat tip bloka', payload: uLearn({ id: 'n1', type: 'script', src: 'a.js' }) },
  { ime: 'nepoznato polje na kartici', payload: lekcija({ flashcards: [{ id: 'k', question: 'a', answer: 'b', onclick: 'x' }] }) },
  { ime: 'nepoznato polje na lekciji', payload: lekcija({ html: '<b>x</b>' }) },
  { ime: 'ključ lekcije s razmakom i navodnikom', payload: { 'a" onmouseover="x': { name: 'L' } } },
  { ime: 'ikona izvan Font Awesome oblika', payload: lekcija({ icon: 'fa-book" onclick="x' }) },
  { ime: 'boja kao CSS izraz', payload: lekcija({ color: 'red;background:url(//x)' }) },
  { ime: 'boja teksta izvan palete', payload: uLearn({ id: 'p', type: 'paragraph', text: [{ text: 'a', color: '#ff0000' }] }) },
  // N5: granice
  { ime: 'kartica od 501 znaka', payload: lekcija({ flashcards: kartice(1, 501) }) },
  { ime: 'kartica od 5 000 znakova (N5)', payload: lekcija({ flashcards: kartice(1, 5000) }) },
  { ime: '501 kartica u lekciji', payload: lekcija({ flashcards: kartice(501) }) },
  { ime: '10 000 kartica (plan ②/0a)', payload: lekcija({ flashcards: kartice(10000, 1) }) },
  { ime: '101 lekcija', payload: Object.fromEntries(Array.from({ length: 101 }, (_, i) => ['l' + i, { name: 'L' + i }])) },
  { ime: 'kviz sa 7 opcija', payload: lekcija({ quiz: [{ id: 'q', question: '?', options: ['1', '2', '3', '4', '5', '6', '7'], correct: 0 }] }) },
  { ime: 'gniježđenje dubine 3 000 (N5)', payload: duboko(3000) },
  // oblik
  { ime: 'prazan objekt', payload: {} },
  { ime: 'lekcija nije objekt', payload: { l1: 'tekst' } },
  { ime: 'kartica bez odgovora', payload: lekcija({ flashcards: [{ id: 'k', question: 'a' }] }) },
  // Unicode razmaci: preglednik ih ne skida, ali `safeUrl` radi `.trim()` — dva sloja moraju
  // isto definirati „početak adrese", pa ih shema odbija izričito (brana-revizor, 30.09.)
  { ime: 'poveznica NBSP+javascript:', payload: poveznica(' javascript:alert(1)') },
  { ime: 'poveznica BOM+javascript:', payload: poveznica('﻿javascript:alert(1)') },
  { ime: 'poveznica s razmakom unutra', payload: poveznica('https://a.hr/x y') },
  { ime: 'learn.image (zaglavna slika — katalog je ima, osobni sadržaj ne)', payload: lekcija({ learn: { image: 'https://x.example/a.png', blocks: [] } }) },
  { ime: 'vlastita slika s .. u putanji', payload: uLearn({ id: 'i3', type: 'image', src: 'node-img:../../tudji/slika.jpg' }) },
  { ime: 'vlastita slika s tuđom ekstenzijom (svg)', payload: uLearn({ id: 'i4', type: 'image',
    src: 'node-img:38e6a202-4690-4405-ac18-da46f9c86cc8/7cc0ce59-ba79-4a85-acc6-eac006ab5d3f/a.svg' }) },
  { ime: 'redak tablice s 51 ćelijom', payload: uLearn({ id: 't', type: 'table', rows: [Array.from({ length: 51 }, () => 'c')] }) },
  { ime: 'schemaVersion 0', payload: Object.assign({ schemaVersion: 0 }, lekcija()) },
  { ime: 'schemaVersion 101', payload: Object.assign({ schemaVersion: 101 }, lekcija()) },
  // samo baza: jedinstveni id-evi (JSON shema to ne zna izraziti po polju)
  { ime: 'dva ista id-a u karticama jedne lekcije', samoBaza: true,
    payload: lekcija({ flashcards: [{ id: 'isti', question: 'a', answer: 'b' }, { id: 'isti', question: 'c', answer: 'd' }] }) },
  { ime: 'dva ista id-a u blokovima', samoBaza: true,
    payload: lekcija({ learn: { blocks: [{ id: 'b', type: 'paragraph', text: 'a' }, { id: 'b', type: 'paragraph', text: 'c' }] } }) }
];

// ─── `jsonb::text` točno kao Postgres — za granicu od 1 MB bez pogađanja ────────────────────────
// Postgres u `jsonb` ključeve slaže po DULJINI pa bajtovima i piše `", "` / `": "`. Podržani su
// samo ASCII nizovi bez kontrolnih znakova (dovoljno za graditelja ispod).
function jsonbText(v) {
  if (Array.isArray(v)) return '[' + v.map(jsonbText).join(', ') + ']';
  if (v && typeof v === 'object') {
    const kljucevi = Object.keys(v).sort((a, b) => a.length - b.length || (a < b ? -1 : a > b ? 1 : 0));
    return '{' + kljucevi.map((k) => JSON.stringify(k) + ': ' + jsonbText(v[k])).join(', ') + '}';
  }
  return JSON.stringify(v);
}

/** Valjan materijal kojem je `octet_length(payload::text)` TOČNO `n` bajtova (odlomci ≤ 10 000 znakova). */
function valjanTocno(n) {
  const blokovi = [];
  const p = lekcija({ learn: { blocks: blokovi } });
  const id = (i) => 'b' + String(i).padStart(4, '0');
  while (jsonbText(p).length < n) blokovi.push({ id: id(blokovi.length), type: 'paragraph', text: 'x'.repeat(10000) });
  const visak = jsonbText(p).length - n;
  const zadnji = blokovi[blokovi.length - 1];
  if (visak > zadnji.text.length) throw new Error('valjanTocno: ne mogu pogoditi ' + n);
  zadnji.text = zadnji.text.slice(0, zadnji.text.length - visak);
  if (jsonbText(p).length !== n) throw new Error('valjanTocno: promašaj');
  return p;
}

// ─── GENERIRANO IZ SHEME (brana-revizor 30.09., F1) ─────────────────────────────────────────────
// Ručni popis pokrivao je 22 od 91 ograničenja: obrisano `additionalProperties` na kvizu ili
// `maxItems` na blokovima prolazilo je obje brane. Zato se za SVAKU objektnu definiciju iz sheme
// izvode tri stvari: kontrola (uzorak prolazi), nepoznato polje (pada) i, za svako njezino polje s
// granicom, vrijednost TIK preko granice (pada). Nova definicija bez uzorka obara unit-test.
const SHEMA = require('../../schema/ugc-content.schema.json');
const PNG = 'node-img:38e6a202-4690-4405-ac18-da46f9c86cc8/7cc0ce59-ba79-4a85-acc6-eac006ab5d3f/a.png';

/** Valjan uzorak po objektnoj definiciji + gdje ga u payloadu smjestiti. */
const UZORCI = {
  category:       { uzorak: { name: 'L' },                                          u: (x) => ({ l1: x }) },
  flashcard:      { uzorak: { id: 'f', question: 'q', answer: 'a' },               u: (x) => lekcija({ flashcards: [x] }) },
  quiz:           { uzorak: { id: 'q', question: 'q', options: ['a', 'b'], correct: 0 }, u: (x) => lekcija({ quiz: [x] }) },
  fillBlank:      { uzorak: { id: 'b', sentence: 'a _______', answer: 'b' },        u: (x) => lekcija({ fillBlanks: [x] }) },
  learn:          { uzorak: { blocks: [] },                                         u: (x) => lekcija({ learn: x }) },
  run:            { uzorak: { text: 'a' },                                          u: (x) => uLearn({ id: 'p', type: 'paragraph', text: [x] }) },
  blockHeading:   { uzorak: { id: 'h', type: 'heading', text: 'a' },               u: uLearn },
  blockParagraph: { uzorak: { id: 'p', type: 'paragraph', text: 'a' },             u: uLearn },
  blockList:      { uzorak: { id: 'l', type: 'list', items: ['a'] },               u: uLearn },
  blockCallout:   { uzorak: { id: 'c', type: 'callout', text: 'a' },               u: uLearn },
  blockImage:     { uzorak: { id: 'i', type: 'image', src: PNG },                  u: uLearn },
  blockVideo:     { uzorak: { id: 'v', type: 'video', url: 'https://youtu.be/6zLCZ_Ic1hI' }, u: uLearn },
  blockTable:     { uzorak: { id: 't', type: 'table', rows: [['a']] },             u: uLearn },
  blockFormula:   { uzorak: { id: 'm', type: 'formula', tex: 'x' },                u: uLearn }
};
/** Niz dulji od granice, u obliku koji bi inače prošao (da pada DULJINA, ne oblik). */
const PREDMETAK = { href: 'https://a.hr/' };

const refIme = (s) => (s && s.$ref ? s.$ref.split('/').pop() : '');
const def = (s) => (refIme(s) ? SHEMA.definitions[refIme(s)] : s);

/** Valjan element niza (s jedinstvenim id-em, da duplikat ne bude drugi razlog odbijanja). */
function element(items, i) {
  const ime = refIme(items);
  if (ime === 'block') return { id: 'g' + i, type: 'paragraph', text: 'a' };
  if (UZORCI[ime]) return Object.assign({}, UZORCI[ime].uzorak, 'id' in UZORCI[ime].uzorak ? { id: 'g' + i } : {});
  if (ime === 'inline') return 'a';
  const d = def(items);
  if (d.type === 'array') return [];
  return d.type === 'string' ? (d.enum ? d.enum[0] : '') : 0;
}

function generiraj() {
  const prolazi = [];
  const pada = [];
  for (const [ime, d] of Object.entries(SHEMA.definitions)) {
    if (d.type !== 'object' || !d.properties || !UZORCI[ime]) continue;
    const { uzorak, u } = UZORCI[ime];
    prolazi.push({ ime: 'GEN kontrola ' + ime, payload: u(uzorak) });
    pada.push({ ime: 'GEN ' + ime + ': nepoznato polje', payload: u(Object.assign({}, uzorak, { zzNepoznato: 1 })) });
    for (const r of d.required || []) {
      const bez = Object.assign({}, uzorak); delete bez[r];
      pada.push({ ime: 'GEN ' + ime + ': bez obaveznog ' + r, payload: u(bez) });
    }
    for (const [polje, s] of Object.entries(d.properties)) {
      const cilj = def(s);
      const s_ = (v) => u(Object.assign({}, uzorak, { [polje]: v }));
      if (typeof cilj.minimum === 'number') pada.push({ ime: 'GEN ' + ime + '.' + polje + ': ispod minimuma', payload: s_(cilj.minimum - 1) });
      if (typeof cilj.maximum === 'number') pada.push({ ime: 'GEN ' + ime + '.' + polje + ': iznad maksimuma', payload: s_(cilj.maximum + 1) });
      if (Array.isArray(cilj.enum)) pada.push({ ime: 'GEN ' + ime + '.' + polje + ': izvan popisa', payload: s_('zzNepoznato') });
      // `const` tipa bloka: uzorak s TUĐIM tipom čiji krak traži DRUGO obavezno polje (slika → `src`,
      // formula → `tex`) — inače bi „naslov s tipom odlomka" bio valjan odlomak, ne dokaz.
      if (cilj.const !== undefined) pada.push({ ime: 'GEN ' + ime + '.' + polje + ': tuđi tip', payload: s_(cilj.const === 'image' ? 'formula' : 'image') });
      // Uzorak (id, boja, ikona, slika, poveznica): kontrolni znak + `<` ne smije proći nijedan.
      if (cilj.type === 'string' && cilj.pattern) pada.push({ ime: 'GEN ' + ime + '.' + polje + ': krši uzorak', payload: s_('\u0001<x') });
      if (refIme(s) === 'inline') {
        pada.push({ ime: 'GEN ' + ime + '.' + polje + ': tekst 10 001', payload: u(Object.assign({}, uzorak, { [polje]: 'a'.repeat(10001) })) });
        pada.push({ ime: 'GEN ' + ime + '.' + polje + ': 501 run', payload: u(Object.assign({}, uzorak, { [polje]: Array.from({ length: 501 }, () => ({ text: 'a' })) })) });
      } else if (cilj.type === 'array' && cilj.maxItems) {
        const niz = Array.from({ length: cilj.maxItems + 1 }, (_, i) => element(cilj.items, i));
        pada.push({ ime: 'GEN ' + ime + '.' + polje + ': ' + (cilj.maxItems + 1) + ' stavki', payload: u(Object.assign({}, uzorak, { [polje]: niz })) });
      } else if (cilj.type === 'string' && cilj.maxLength) {
        const pred = PREDMETAK[refIme(s)] || '';
        pada.push({ ime: 'GEN ' + ime + '.' + polje + ': ' + (cilj.maxLength + 1) + ' znakova',
          payload: u(Object.assign({}, uzorak, { [polje]: pred + 'a'.repeat(cilj.maxLength + 1 - pred.length) })) });
      }
      // F3: niz nizova (retci tablice) — ćelija TUĐEG tipa; bez `items.items` bi ćelija bila bilo što.
      if (cilj.type === 'array' && cilj.items && def(cilj.items).type === 'array') {
        pada.push({ ime: 'GEN ' + ime + '.' + polje + '[][]: ćelija tuđeg tipa', payload: s_([[{ a: 1 }]]) });
      }
      // F3: silazak u `items` — tekstualni element niza preko svoje granice (opcije kviza, odgovori).
      if (cilj.type === 'array' && cilj.items && def(cilj.items).type === 'string' && def(cilj.items).maxLength) {
        const n = def(cilj.items).maxLength + 1;
        pada.push({ ime: 'GEN ' + ime + '.' + polje + '[]: element od ' + n + ' znakova', payload: s_(['a'.repeat(n)]) });
      }
      // F3: TUĐI JSON-tip. Granice (`pattern`, `maxLength`, `maxItems`) vrijede samo za svoj tip —
      // bez `type` bi niz prošao umjesto teksta i sve granice bi tiho otpale.
      const tudji = refIme(s) === 'inline' || cilj.oneOf ? [1, { a: 1 }]
        : cilj.type === 'string' || cilj.enum || cilj.const !== undefined ? [['a'], { a: 'a' }, 1]
          : cilj.type === 'array' ? ['a', { a: 1 }]
            : cilj.type === 'object' ? ['a', ['a']]
              : cilj.type === 'integer' ? ['1', 1.5] : cilj.type === 'number' ? ['1'] : cilj.type === 'boolean' ? ['true', 1] : [];
      tudji.forEach((v) => pada.push({ ime: 'GEN ' + ime + '.' + polje + ': tuđi JSON-tip ' + JSON.stringify(v), payload: s_(v) }));
    }
  }
  return { prolazi, pada };
}

const GEN = generiraj();
const prolazi = rucnoProlazi.concat(GEN.prolazi);
const pada = rucnoPada.concat(GEN.pada);

module.exports = { prolazi, pada, jsonbText, valjanTocno, lekcija, UZORCI, SHEMA, broj: { gen: GEN.pada.length, rucno: rucnoPada.length } };
