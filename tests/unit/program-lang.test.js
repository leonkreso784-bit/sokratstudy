/* eslint-disable no-console */
// ===== Jezik sučelja nosi PROGRAM, ne zakucano ime (MOR, 2026-11-14) =====
// Pokreni: node tests/unit/program-lang.test.js (dio `npm run test:unit`).
//
// Zašto: `js/i18n.js` je do 2026-11-14 hrvatsko sučelje predlagao SAMO za `hospitality-management-hr`,
// pa bi svaki novi HR program (MOR) tiho dobio engleski. Sad jezik nosi `lang` programa u katalogu,
// a ovaj test drži obje strane: (1) svaki predmet HR programa vraća 'hr', svaki EN predmet null —
// nabrojano IZ kataloga, ne rukom; (2) i18n više ne sadrži zakucano ime programa.

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const { SOKRAT_CATALOG, SokratCatalog } = require(path.join(ROOT, 'data', 'catalog.js'));

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  ✓ ' + name); }
  catch (e) { failed++; console.log('  ✗ ' + name + '\n      ' + e.message); }
}

const programs = SOKRAT_CATALOG.faculties.flatMap((f) => f.programs || []);
const hrPrograms = programs.filter((p) => p.lang === 'hr').map((p) => p.id);

test('postoje bar dva HR programa (MUH i MOR)', () => {
  assert.ok(hrPrograms.includes('hospitality-management-hr'), 'MUH bez lang: hr');
  assert.ok(hrPrograms.includes('sustainable-development-management-hr'), 'MOR bez lang: hr');
});

test('svaki predmet HR programa predlaže hr, svaki ostali null', () => {
  let hr = 0, other = 0;
  for (const s of SOKRAT_CATALOG.subjects) {
    const inHr = SokratCatalog.placementsOf(s).some((pl) => hrPrograms.includes(pl.program));
    const got = SokratCatalog.uiLangOf(s);
    if (inHr) { hr++; assert.strictEqual(got, 'hr', `${s.id} je u HR programu, a uiLangOf = ${got}`); }
    else { other++; assert.strictEqual(got, null, `${s.id} nije u HR programu, a uiLangOf = ${got}`); }
  }
  // Mjerač ispisuje koliko je dotaknuo — na nuli bi tiho prošao.
  assert.ok(hr > 0 && other > 0, `dotaknuto hr=${hr}, ostalih=${other}`);
  console.log(`      (hr=${hr}, ostalih=${other})`);
});

test('MOR predmeti predlažu hr', () => {
  const mor = SokratCatalog.subjectsOf('sustainable-development-management-hr');
  assert.ok(mor.length >= 9, 'MOR ima ' + mor.length + ' predmeta');
  for (const s of mor) assert.strictEqual(SokratCatalog.uiLangOf(s), 'hr', s.id);
});

test('js/i18n.js ne sadrži zakucano ime programa', () => {
  const src = fs.readFileSync(path.join(ROOT, 'js', 'i18n.js'), 'utf8');
  for (const p of programs) {
    assert.ok(!src.includes(`'${p.id}'`), `i18n.js spominje program '${p.id}' — jezik mora doći iz kataloga`);
  }
  assert.ok(src.includes('uiLangOf('), 'i18n.js ne pita katalog za jezik programa');
});

console.log(`\n${passed} prošlo, ${failed} palo`);
process.exit(failed ? 1 : 0);
