/* eslint-disable no-console */
// ===== Node unit test za getCategories() (js/content-loader.js, U7a) =====
// Pokreni: node tests/unit/get-categories.test.js
// Isti shim-obrazac kao draft-store.test.js: klasična skripta se učita kroz new Function('window', code).
// getCategories filtrira TOP-LEVEL META ključeve (schema v2) da category-iteracije ne renderiraju
// lažnu kategoriju — preduvjet za U7 (learn-blokovi + schemaVersion).

const assert = require('assert');
const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  ✓ ' + name); }
  catch (e) { failed++; console.error('  ✗ ' + name + '\n      ' + e.message); }
}

console.log('\n=== getCategories (U7a) ===\n');

const code = fs.readFileSync(path.join(__dirname, '..', '..', 'js', 'content-loader.js'), 'utf8');
const win = {};
new Function('window', code)(win); // content-loader nema top-level browser-poziva → čist load
const getCategories = win.getCategories;

test('izvezen na window kao funkcija', function () {
  assert.strictEqual(typeof getCategories, 'function');
});

test('vraća ključeve kategorija (vrijednost = objekt)', function () {
  const content = { a: { name: 'A', flashcards: [] }, b: { name: 'B', quiz: [] } };
  assert.deepStrictEqual(getCategories(content), ['a', 'b']);
});

test('ISKLJUČUJE schemaVersion (broj) — jezgra U7a', function () {
  const content = { schemaVersion: 2, a: { name: 'A' }, b: { name: 'B' } };
  assert.deepStrictEqual(getCategories(content), ['a', 'b']);
});

test('ISKLJUČUJE composedOf (niz) — U9 kompozicija', function () {
  const content = { composedOf: ['m1', 'm2'], examPractice: { name: 'EP' } };
  assert.deepStrictEqual(getCategories(content), ['examPractice']);
});

test('prazna kategorija {} OSTAJE (objekt, ne meta)', function () {
  const content = { empty: {}, a: { name: 'A' } };
  assert.deepStrictEqual(getCategories(content), ['empty', 'a']);
});

test('čuva REDOSLIJED umetanja (meta preskočen, ne pomiče ostale)', function () {
  const content = { z: { n: 1 }, schemaVersion: 2, a: { n: 2 }, m: { n: 3 } };
  assert.deepStrictEqual(getCategories(content), ['z', 'a', 'm']);
});

test('null/undefined/skalar → []', function () {
  assert.deepStrictEqual(getCategories(null), []);
  assert.deepStrictEqual(getCategories(undefined), []);
  assert.deepStrictEqual(getCategories('x'), []);
  assert.deepStrictEqual(getCategories(42), []);
});

test('niz-vrijednosti i funkcije se NE broje kao kategorije', function () {
  const content = { a: { n: 1 }, arr: [1, 2], fn: function () {} };
  assert.deepStrictEqual(getCategories(content), ['a']);
});

// ── getStudyData: JEDINI ulaz u `AppState.nav.data` (BUG-053) ──────────────────────────────────
// `progress.js` je čitao `Object.keys(nav.data)` mimo getCategories → `(2).quiz.length` na v2
// dokumentu (svaki materijal iz AI nacrta). Umjesto da svaki čitač pamti pravilo, ulaz propušta samo
// lekcije, svaku s nizovima — pa nijedan čitač, ni budući, ne vidi meta-ključ ni lekciju bez `quiz`.
const getStudyData = win.getStudyData;

test('getStudyData: izvezen na window kao funkcija', function () {
  assert.strictEqual(typeof getStudyData, 'function');
});

test('getStudyData: v2 dokument → samo lekcije (schemaVersion/composedOf NE ulaze)', function () {
  const doc = { schemaVersion: 2, composedOf: ['m1'], l1: { name: 'A', flashcards: [], quiz: [], fillBlanks: [] } };
  assert.deepStrictEqual(Object.keys(getStudyData(doc)), ['l1']);
});

test('getStudyData: lekcija bez quiz/flashcards/fillBlanks dobiva prazne nizove', function () {
  const out = getStudyData({ l1: { name: 'A' } });
  assert.deepStrictEqual(out.l1.quiz, []);
  assert.deepStrictEqual(out.l1.flashcards, []);
  assert.deepStrictEqual(out.l1.fillBlanks, []);
  assert.strictEqual(out.l1.name, 'A');
});

test('getStudyData: postojeći nizovi ostaju ISTI (ne kopira sadržaj, ne gubi ga)', function () {
  const q = [{ id: 'q1' }];
  const out = getStudyData({ l1: { name: 'A', quiz: q, learn: { blocks: [] } } });
  assert.strictEqual(out.l1.quiz, q);
  assert.deepStrictEqual(out.l1.learn, { blocks: [] });
});

test('getStudyData: ulaz NETAKNUT (keširani dokument se ne mijenja)', function () {
  const doc = { schemaVersion: 2, l1: { name: 'A' } };
  const prije = JSON.stringify(doc);
  getStudyData(doc);
  assert.strictEqual(JSON.stringify(doc), prije);
});

test('getStudyData: popis dopuštenih — njegovim redom, samo postojeće lekcije, nikad meta', function () {
  const doc = { schemaVersion: 2, a: { name: 'A' }, b: { name: 'B' }, c: { name: 'C' } };
  assert.deepStrictEqual(Object.keys(getStudyData(doc, ['c', 'nema', 'schemaVersion', 'a'])), ['c', 'a']);
});

test('getStudyData: zbroj kvizova preko svih lekcija ne puca (put koji je pao u progress.js)', function () {
  const data = getStudyData({ schemaVersion: 2, l1: { name: 'A', quiz: [{}, {}] }, l2: { name: 'B' } });
  assert.strictEqual(Object.keys(data).reduce(function (n, k) { return n + data[k].quiz.length; }, 0), 2);
});

test('getStudyData: null/undefined → {}', function () {
  assert.deepStrictEqual(getStudyData(null), {});
  assert.deepStrictEqual(getStudyData(undefined), {});
});

// Ulaz je siguran samo ako je JEDINI: svaka dodjela `nav.data` u js/ mora ići kroz getStudyData.
test('getStudyData je JEDINI ulaz: svaka dodjela `nav.data =` u js/ ide kroz njega (i ima ih ≥ 1)', function () {
  const dir = path.join(__dirname, '..', '..', 'js');
  const dodjele = [];
  for (const f of fs.readdirSync(dir).filter(function (x) { return x.endsWith('.js'); })) {
    fs.readFileSync(path.join(dir, f), 'utf8').split('\n').forEach(function (red, i) {
      if (/\bnav\.data\s*=(?!=)/.test(red) && !/^\s*(\/\/|\*)/.test(red)) dodjele.push(f + ':' + (i + 1) + '  ' + red.trim());
    });
  }
  assert.ok(dodjele.length >= 1, 'nijedna dodjela nađena — brana ne mjeri ništa');
  const mimo = dodjele.filter(function (d) { return !/=\s*getStudyData\(/.test(d); });
  assert.deepStrictEqual(mimo, [], 'dodjela mimo getStudyData');
});

console.log('\ngetCategories: ' + passed + ' prošlo, ' + failed + ' palo');
process.exit(failed ? 1 : 0);
