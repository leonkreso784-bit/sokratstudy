/* eslint-disable no-console */
// ===== Node unit test za praznine u dopunama (D1 autorstvo + D2 više praznina) =====
// Pokreni: node tests/unit/fill-blank-format.test.js
// Shim-obrazac (kao card-limits/block-editor): klasična skripta kroz new Function('window', code).
// `js/admin-editors.js` i `js/fill-blanks.js` na vrhu samo DEKLARIRAJU (nema poziva DOM-a pri
// učitavanju), pa se učitaju bez admin.js/AppState — testira se isključivo čisti dio.
// Oba kraja su u ISTOJ datoteci namjerno: marker mora biti jedan, a to se vidi samo ako ih
// jedan test drži jedno uz drugo (window.SokratFillFormat = autor, window.SokratFill = učenje).
//
// ⚠️ ZAŠTO OVAJ TEST POSTOJI: „neka bude dovoljna jedna podvlaka" je razuman prijedlog koji bi
// slomio gradivo — u LaTeX-u je `_` operator indeksa, a rečenice s dopunom renderiraju matematiku.
// Izmjereno u data/: 1005 rečenica s dopunom, 5 sadrži KaTeX. Zato normalizacija dira SAMO
// nizove od 3+ podvlake, a ovaj test to drži na mjestu — mjeri se PRAVA rečenica iz kataloga.

const assert = require('assert');
const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  ✓ ' + name); }
  catch (e) { failed++; console.error('  ✗ ' + name + '\n      ' + e.message); }
}

console.log('\n=== fill-blank-format (D1 + D2) ===\n');

const ROOT = path.join(__dirname, '..', '..');
const win = {};
new Function('window', fs.readFileSync(path.join(ROOT, 'js', 'admin-editors.js'), 'utf8'))(win);
new Function('window', fs.readFileSync(path.join(ROOT, 'js', 'fill-blanks.js'), 'utf8'))(win);
const F = win.SokratFillFormat; // strana AUTORA (editor)
const R = win.SokratFill;       // strana UČENJA (prikaz + ocjenjivanje)

// ── izvoz + poklapanje sa schemom ──
test('izvezen na window (MARK + tri funkcije)', function () {
  assert.strictEqual(typeof F, 'object');
  assert.strictEqual(F.MARK, '_______');
  assert.strictEqual(typeof F.normalize, 'function');
  assert.strictEqual(typeof F.count, 'function');
  assert.strictEqual(typeof F.insert, 'function');
});

test('MARK zadovoljava JSON Schemu (fillBlank.sentence.pattern) — jedan izvor, ne dvije kopije', function () {
  const schema = JSON.parse(fs.readFileSync(path.join(ROOT, 'schema', 'subject-content.schema.json'), 'utf8'));
  const pattern = schema.definitions.fillBlank.properties.sentence.pattern;
  assert.ok(new RegExp(pattern).test('Neka rečenica ' + F.MARK + ' dalje.'), 'marker mora proći shemu');
});

// ── normalizacija: OPRAŠTA brojanje, ali NE dira LaTeX ──
test('nizovi od 3+ podvlake → kanonskih 7', function () {
  assert.strictEqual(F.normalize('Cijena je ___ jednaka.'), 'Cijena je _______ jednaka.');
  assert.strictEqual(F.normalize('Cijena je __________ jednaka.'), 'Cijena je _______ jednaka.');
  assert.strictEqual(F.normalize('Već točno ' + F.MARK + '.'), 'Već točno ' + F.MARK + '.');
});

test('⛔ JEDNA i DVIJE podvlake ostaju netaknute (LaTeX indeks)', function () {
  const katex = 'At the market-clearing price, quantity demanded equals quantity ' + F.MARK + ' (\\(Q_d = Q_s\\)).';
  const out = F.normalize(katex);
  assert.strictEqual(out, katex, 'prava rečenica iz kataloga se NE SMIJE promijeniti');
  assert.strictEqual(F.count(out), 1, 'Q_d i Q_s nisu praznine');
  assert.strictEqual(F.normalize('x__y'), 'x__y');
  assert.strictEqual(F.normalize('\\(x_{1}\\)'), '\\(x_{1}\\)');
});

test('normalize podnosi null/undefined (ne baca)', function () {
  assert.strictEqual(F.normalize(null), '');
  assert.strictEqual(F.normalize(undefined), '');
});

// ── brojanje praznina (temelj zabrane druge praznine) ──
test('count: 0 / 1 / 2', function () {
  assert.strictEqual(F.count('Bez praznine.'), 0);
  assert.strictEqual(F.count('Jedna ' + F.MARK + ' praznina.'), 1);
  assert.strictEqual(F.count('Dvije ' + F.MARK + ' i ' + F.MARK + '.'), 2);
  assert.strictEqual(F.count('Ručno ___ i ____.'), 2, 'i ručno utipkane se broje nakon normalizacije');
});

// ── ubacivanje: označena riječ postaje praznina I odgovor ──
test('odabir riječi → praznina na njezinu mjestu, riječ vraćena kao odgovor', function () {
  const s = 'Ponuda i potražnja.';
  const r = F.insert(s, 9, 18); // "potražnja"
  assert.strictEqual(r.text, 'Ponuda i ' + F.MARK + '.');
  assert.strictEqual(r.word, 'potražnja');
  assert.strictEqual(r.caret, 9 + F.MARK.length);
});

test('bez odabira → praznina na mjestu pokazivača, riječ je prazna', function () {
  const r = F.insert('Ponuda i .', 9, 9);
  assert.strictEqual(r.text, 'Ponuda i ' + F.MARK + '.');
  assert.strictEqual(r.word, '');
});

test('obrnut raspon i raspon izvan teksta se podnose (bez bacanja)', function () {
  assert.strictEqual(F.insert('abc', 3, 1).text, 'a' + F.MARK, 'obrnut raspon = isti raspon, samo zamijenjenih krajeva');
  assert.strictEqual(F.insert('abc', 99, 99).text, 'abc' + F.MARK);
  assert.strictEqual(F.insert('abc', -5, -5).text, F.MARK + 'abc');
});

test('rezultat ubacivanja je odmah valjan po count()', function () {
  const r = F.insert('Ponuda i potražnja.', 9, 18);
  assert.strictEqual(F.count(r.text), 1);
});

// ══ D2 — VIŠE PRAZNINA PO REČENICI ══════════════════════════════════════════════

test('marker je JEDAN — editor, učenje i shema se moraju poklapati', function () {
  assert.strictEqual(R.MARK, F.MARK, 'dvije kopije markera = tiho razilaženje');
});

test('answersOf: `answers` ima prednost, `answer` je pad-na-nazad', function () {
  assert.deepStrictEqual(R.answersOf({ answer: 'a' }), ['a']);
  assert.deepStrictEqual(R.answersOf({ answer: 'a', answers: ['a', 'b'] }), ['a', 'b']);
  assert.deepStrictEqual(R.answersOf({}), []);
  assert.deepStrictEqual(R.answersOf(null), []);
});

test('count vidi isti broj praznina kao editor', function () {
  const s2 = 'Ponuda ' + R.MARK + ' i potražnja ' + R.MARK + '.';
  assert.strictEqual(R.count(s2), 2);
  assert.strictEqual(R.count(s2), F.count(s2));
});

// ⚠️ BUG-025: rečenica ide u innerHTML → SVAKI komad teksta mora proći kroz esc, ne samo prvi.
const esc = (x) => String(x).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

test('sentenceHtml: escape pogađa SVAKI komad, ne samo prvi', function () {
  const h = R.sentenceHtml('<b>a</b> ' + R.MARK + ' <i>c</i> ' + R.MARK + ' <u>d</u>', esc, 'plain');
  assert.strictEqual(h.indexOf('<b>'), -1, 'prvi komad');
  assert.strictEqual(h.indexOf('<i>'), -1, 'srednji komad');
  assert.strictEqual(h.indexOf('<u>'), -1, 'zadnji komad');
  assert.strictEqual((h.match(/class="blank"/g) || []).length, 2);
});

test('sentenceHtml `inputs`: po jedno polje sa svojim indeksom i oznakom', function () {
  const h = R.sentenceHtml('a ' + R.MARK + ' b ' + R.MARK + ' c', esc, 'inputs', (i) => 'Praznina ' + (i + 1));
  assert.strictEqual((h.match(/class="fill-blank-input"/g) || []).length, 2);
  assert.ok(h.indexOf('data-blank="0"') !== -1 && h.indexOf('data-blank="1"') !== -1);
  assert.ok(h.indexOf('aria-label="Praznina 2"') !== -1, 'svaka praznina ima svoju oznaku');
});

test('sentenceHtml bez praznine = čist escapan tekst (nema markupa niotkud)', function () {
  assert.strictEqual(R.sentenceHtml('samo tekst', esc, 'inputs'), 'samo tekst');
});

test('grade: ocjena ide PO PRAZNINI, a rečenica je točna samo ako su sve', function () {
  const a = ['ponuda', 'potražnja'];
  assert.deepStrictEqual(R.grade(['ponuda', 'potražnja'], a), { per: [true, true], all: true });
  assert.deepStrictEqual(R.grade(['ponuda', 'kriva'], a), { per: [true, false], all: false });
  assert.deepStrictEqual(R.grade(['kriva', 'potražnja'], a), { per: [false, true], all: false });
});

test('⛔ BUG-014 vrijedi PO PRAZNINI: prazan unos nikad nije točan', function () {
  assert.deepStrictEqual(R.grade(['ponuda', ''], ['ponuda', 'potražnja']).per, [true, false]);
  assert.deepStrictEqual(R.grade(['', ''], ['a', 'b']), { per: [false, false], all: false });
  assert.strictEqual(R.grade([], ['a']).all, false, 'nedostajuće polje nije prazna pobjeda');
  assert.strictEqual(R.grade(['a'], []).all, false, 'nula odgovora nije „sve točno"');
});

test('grade zadržava normFill pravila (crtica ↔ razmak, velika slova)', function () {
  assert.strictEqual(R.grade(['Long term'], ['long-term']).all, true);
  assert.strictEqual(R.grade(['  ponuda  '], ['ponuda']).all, true);
});

test('jedna praznina ide istim putem kao prije (bez `answers`)', function () {
  const q = { sentence: 'Cijena je ' + R.MARK + '.', answer: 'ravnotežna' };
  assert.strictEqual(R.count(q.sentence), 1);
  assert.strictEqual(R.grade(['ravnotežna'], R.answersOf(q)).all, true);
});

test('grade: izostavljene dijakritike su tolerirane (č/ć/š/ž/đ)', function () {
  assert.strictEqual(R.grade(['ravnotezna'], ['ravnotežna']).all, true);
  assert.strictEqual(R.grade(['Đurđevac'], ['durdevac']).all, true);
  assert.strictEqual(R.grade(['cetvrtak'], ['četvrtak']).all, true);
  assert.strictEqual(R.grade(['ponuda'], ['potražnja']).all, false);
});

test('grade: čisto brojčani odgovor — decimalni zarez i točka su jednaki', function () {
  assert.strictEqual(R.grade(['1,5'], ['1.5']).all, true);
  assert.strictEqual(R.grade(['1.5'], ['1,5']).all, true);
  assert.strictEqual(R.grade(['1,5'], ['2.5']).all, false);
});

console.log('\n' + passed + ' prošlo, ' + failed + ' palo\n');
process.exit(failed ? 1 : 0);
