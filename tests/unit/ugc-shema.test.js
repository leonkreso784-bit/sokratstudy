/* eslint-disable no-console */
// ===== Node unit test za schema/ugc-content.schema.json (F6 ②/0a — strogi profil osobnog sadržaja) =====
// Pokreni: node tests/unit/ugc-shema.test.js
//
// Isti primjeri (`tests/fixtures/ugc-sadrzaj.js`) idu i kroz BAZU (`npm run ugc:sadrzaj`, staging).
// Ovdje se mjeri samo shema, bez mreže — da CI vidi svaku izmjenu sheme koja propusti poznati napad
// ili odbije ono što Studio stvarno sprema.

const assert = require('assert');
const path = require('path');
const Ajv = require('ajv');

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  ✓ ' + name); }
  catch (e) { failed++; console.error('  ✗ ' + name + '\n      ' + e.message); }
}

console.log('\n=== ugc-shema (F6 ②/0a) ===\n');

const ROOT = path.join(__dirname, '..', '..');
const shema = require(path.join(ROOT, 'schema', 'ugc-content.schema.json'));
const { prolazi, pada, jsonbText, valjanTocno } = require(path.join(ROOT, 'tests', 'fixtures', 'ugc-sadrzaj.js'));
const provjeri = new Ajv({ allErrors: false, allowUnionTypes: true }).compile(shema);

// Doseg: prazan popis bi dao zeleno bez ijedne tvrdnje.
test('primjeri postoje (≥ 10 valjanih, ≥ 30 zlonamjernih)', function () {
  assert.ok(prolazi.length >= 10, 'valjanih: ' + prolazi.length);
  assert.ok(pada.length >= 30, 'zlonamjernih: ' + pada.length);
});

for (const p of prolazi) {
  test('PROLAZI: ' + p.ime, function () {
    assert.ok(provjeri(p.payload), JSON.stringify(provjeri.errors && provjeri.errors[0]));
  });
}

let samoBaza = 0;
for (const p of pada) {
  if (p.samoBaza) { samoBaza++; continue; }
  test('PADA: ' + p.ime, function () {
    assert.strictEqual(provjeri(p.payload), false, 'shema ga je PROPUSTILA');
  });
}
test('preskočeni (samo baza zna provjeriti) su imenovani i malo ih je', function () {
  assert.ok(samoBaza >= 1 && samoBaza <= 3, 'samo-baza: ' + samoBaza);
});

// ── STRUKTURA sheme (brana-revizor 30.09., F1): pravilo „svaki objekt zatvoren, svaki niz i niz
// znakova ograničen" nabraja se iz SAME sheme, ne iz popisa primjera — nova definicija ili polje bez
// granice obara test čim se napiše. Iznimke su imenovane s razlogom.
const { UZORCI, broj } = require(path.join(ROOT, 'tests', 'fixtures', 'ugc-sadrzaj.js'));
/** Objekti bez `additionalProperties: false`, s razlogom. */
const OTVORENI = {
  '#': 'korijen: ključevi su lekcije — `propertyNames` ih ograničava, `additionalProperties` je shema lekcije',
  'block': 'razvodnik po tipu: zatvara ga svaki `oneOf` krak (blockHeading…)'
};
function obidji(s, put, fn) {
  if (!s || typeof s !== 'object') return;
  fn(s, put);
  for (const [k, v] of Object.entries(s)) {
    if (k === 'properties' || k === 'definitions') {
      for (const [ime, pod] of Object.entries(v)) obidji(pod, k === 'definitions' ? ime : put + '.' + ime, fn);
    } else if (k === 'items' || k === 'additionalProperties' || k === 'propertyNames' || k === 'not') obidji(v, put + '[' + k + ']', fn);
    else if (k === 'oneOf' || k === 'anyOf') v.forEach((x, i) => obidji(x, put + '|' + i, fn));
  }
}
/** Uzorak bez neograničenog ponavljanja (`*`, `+`, `{n,}`) izvan klase znakova sam ograničava duljinu. */
function ogranicenUzorak(p) {
  return typeof p === 'string' && !/[*+]|\{\d+,\}/.test(p.replace(/\\./g, '').replace(/\[[^\]]*\]/g, ''));
}
test('struktura: svaki objekt zatvoren, svaki niz ima maxItems, svaki tekst ima granicu', function () {
  const nalazi = [];
  let obj = 0, niz = 0, tekst = 0;
  obidji(shema, '#', function (s, put) {
    if (s.type === 'object') { obj++; if (s.additionalProperties !== false && !OTVORENI[put]) nalazi.push(put + ': objekt bez additionalProperties:false'); }
    if (s.type === 'array') { niz++; if (typeof s.maxItems !== 'number') nalazi.push(put + ': niz bez maxItems'); }
    if (s.type === 'string') {
      tekst++;
      const ogranicen = typeof s.maxLength === 'number' || s.enum || s.const !== undefined || ogranicenUzorak(s.pattern);
      if (!ogranicen) nalazi.push(put + ': tekst bez maxLength/enum/const/ograničenog uzorka');
    }
  });
  assert.deepStrictEqual(nalazi, []);
  assert.ok(obj >= 15 && niz >= 10 && tekst >= 20, 'obiđeno premalo: ' + obj + ' objekata, ' + niz + ' nizova, ' + tekst + ' tekstova');
});
// brana-revizor 30.09. (F3): `pattern`/`maxLength` vrijede SAMO za tekst, `maxItems` samo za niz —
// polje kojem netko obriše `type` prima niz ili objekt i sve granice tiho otpadaju (izmjereno:
// `quiz.image: ["https://tracker…"]` prolazi). Zato: svako polje, definicija i `items` ima tip ili
// ga nasljeđuje (`$ref`, `const`, `enum`, `oneOf`), a ključne riječi odgovaraju tipu.
test('struktura: svako polje ima tip, a granice odgovaraju tipu (F3)', function () {
  const nalazi = [];
  let dotaknuto = 0;
  function tip(s, put) {
    if (!s || typeof s !== 'object') return;
    dotaknuto++;
    const ima = s.type || s.$ref || s.const !== undefined || s.enum || s.oneOf;
    if (!ima) nalazi.push(put + ': bez type/$ref/const/enum/oneOf');
    const t = s.type;
    if ((s.pattern !== undefined || s.maxLength !== undefined) && t !== 'string') nalazi.push(put + ': pattern/maxLength bez type:string');
    if ((s.maxItems !== undefined || s.items !== undefined) && t !== 'array') nalazi.push(put + ': maxItems/items bez type:array');
    if ((s.minimum !== undefined || s.maximum !== undefined) && t !== 'number' && t !== 'integer') nalazi.push(put + ': min/max bez brojčanog tipa');
    if ((s.properties || s.additionalProperties === false) && t !== 'object') nalazi.push(put + ': properties bez type:object');
    for (const [k, v] of Object.entries(s.properties || {})) tip(v, put + '.' + k);
    if (s.items) tip(s.items, put + '[items]');
    (s.oneOf || []).forEach((x, i) => tip(x, put + '|' + i));
  }
  for (const [ime, d] of Object.entries(shema.definitions)) tip(d, ime);
  tip(shema, '#');
  assert.deepStrictEqual(nalazi, []);
  assert.ok(dotaknuto >= 100, 'obiđeno premalo čvorova: ' + dotaknuto);
});
test('struktura: svaka objektna definicija ima uzorak za generirane primjere', function () {
  const bez = Object.entries(shema.definitions)
    .filter(([ime, d]) => d.type === 'object' && d.properties && !OTVORENI[ime] && !UZORCI[ime]).map(([ime]) => ime);
  assert.deepStrictEqual(bez, []);
  assert.ok(broj.gen >= 40, 'generirano premalo zlonamjernih: ' + broj.gen + ' (izmjereno 30.09.: 50)');
});

// ── OSNOVICA GENERIRANIH (brana-revizor 30.09., F3) ──
// Generator se izvodi iz sheme, pa bi brisanje ograničenja obrisalo i njegov test (izmjereno: 23 od
// 166 mutacija preživjelo je baš tako — `required`, min/max). Zato je POPIS generiranih zlonamjernih
// primjera zakucan: slabija shema = kraći popis = pad. Jača shema = dulji popis = također pad, dok
// se osnovica svjesno ne podigne (vidi se u diffu): `UGC_OSNOVICA_UPDATE=1 node tests/unit/ugc-shema.test.js`.
const fs = require('fs');
const OSNOVICA = path.join(ROOT, 'tests', 'fixtures', 'ugc-gen-osnovica.json');
const genImena = pada.filter((p) => p.ime.startsWith('GEN ')).map((p) => p.ime).sort();
if (process.env.UGC_OSNOVICA_UPDATE === '1') {
  fs.writeFileSync(OSNOVICA, JSON.stringify({ _zasto: 'Popis generiranih zlonamjernih primjera (tests/fixtures/ugc-sadrzaj.js). '
    + 'Kraći popis = shema oslabljena. Podiže se svjesno: UGC_OSNOVICA_UPDATE=1.', imena: genImena }, null, 2) + '\n');
  console.log('  ↻ osnovica zapisana: ' + genImena.length + ' imena');
}
test('generirani zlonamjerni primjeri == zakucana osnovica (slabija shema ne briše vlastiti test)', function () {
  const osn = JSON.parse(fs.readFileSync(OSNOVICA, 'utf8')).imena;
  const nestalo = osn.filter((x) => !genImena.includes(x));
  const novo = genImena.filter((x) => !osn.includes(x));
  assert.deepStrictEqual({ nestalo, novo }, { nestalo: [], novo: [] });
});

// Katalog je NAMJERNO drukčiji profil: shema osobnog sadržaja ne smije postati katalogova.
test('katalogov legacy-html i learn.content NISU u profilu', function () {
  const txt = JSON.stringify(shema.definitions);
  assert.ok(!txt.includes('legacy-html'), 'legacy-html se pojavljuje u shemi');
  assert.ok(!shema.definitions.learn.properties.content, 'learn.content je dopušten');
});

// Graditelj granice od 1 MB mora biti točan, inače staging-brana mjeri krivu granicu.
test('jsonbText slaže ključeve kao Postgres (duljina pa bajtovi)', function () {
  assert.strictEqual(jsonbText({ bb: 1, a: [true, 'x'], ab: null }), '{"a": [true, "x"], "ab": null, "bb": 1}');
});
test('valjanTocno(1 MB) je točno 1 048 576 bajtova i prolazi shemu', function () {
  const p = valjanTocno(1048576);
  assert.strictEqual(Buffer.byteLength(jsonbText(p)), 1048576);
  assert.ok(provjeri(p), JSON.stringify(provjeri.errors && provjeri.errors[0]));
});

console.log('\n  ' + passed + ' prošlo, ' + failed + ' palo (' + samoBaza + ' samo-baza preskočeno)\n');
process.exit(failed ? 1 : 0);
