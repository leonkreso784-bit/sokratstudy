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


// ── DB čitanje ima rok (~3 s): viseći Supabase → odmah na datoteke, brz odgovor ostaje isti ──
function lazniKlijent(ponasanje) {
  const q = {
    aborted: false,
    select: () => q,
    eq: () => q,
    abortSignal: (sig) => { sig.addEventListener('abort', () => { q.aborted = true; }); return q; },
    then: (res, rej) => ponasanje().then(res, rej)
  };
  return { from: () => q, _q: q };
}
function ucitavac(klijent) {
  const w = {};
  const kat = { getSubject: (id) => ({ id: id, content: { scripts: [], codeScripts: [], dataFormat: 'js' } }) };
  new Function('window', 'SokratAuth', 'SokratCatalog', code)(w, { getClient: () => klijent }, kat);
  return w;
}

(async function () {
  async function atest(name, fn) {
    try { await fn(); passed++; console.log('  ✓ ' + name); }
    catch (e) { failed++; console.error('  ✗ ' + name + '\n      ' + e.message); }
  }

  await atest('content-loader: viseći Supabase → lekcija se učita nakon ~3 s (abort + fallback)', async function () {
    const k = lazniKlijent(() => new Promise(() => {}));
    const w = ucitavac(k);
    const t0 = Date.now();
    await w.loadSubjectContent('x1');
    const ms = Date.now() - t0;
    assert.ok(ms >= 2900 && ms < 4500, 'trajanje ' + ms + ' ms');
    assert.ok(k._q.aborted, 'upit mora biti prekinut AbortSignalom');
    assert.strictEqual(w.isSubjectContentLoaded('x1'), true);
  });

  await atest('content-loader: zakašnjeli DB odgovor nakon roka se ignorira', async function () {
    const k = lazniKlijent(() => new Promise((r) => setTimeout(() => r({ data: [{ var_name: 'kasniPodatak', payload: { a: 1 } }], error: null }), 3300)));
    const w = ucitavac(k);
    await w.loadSubjectContent('x2');
    await new Promise((r) => setTimeout(r, 500));
    assert.strictEqual(w.kasniPodatak, undefined);
  });

  await atest('content-loader: brz odgovor → ponašanje nepromijenjeno (window var iz baze, bez čekanja)', async function () {
    const k = lazniKlijent(() => Promise.resolve({ data: [{ var_name: 'dbPodatak', payload: { ok: true } }], error: null }));
    const w = ucitavac(k);
    const t0 = Date.now();
    await w.loadSubjectContent('x3');
    assert.ok(Date.now() - t0 < 1000);
    assert.deepStrictEqual(w.dbPodatak, { ok: true });
    assert.strictEqual(k._q.aborted, false);
  });

  console.log('\ngetCategories: ' + passed + ' prošlo, ' + failed + ' palo');
  process.exit(failed ? 1 : 0);
})();
