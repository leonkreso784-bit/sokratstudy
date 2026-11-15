/* eslint-disable no-console */
// ===== Node unit test: getQuizQuestions miješa CIJELI skup prije rezanja =====
// Pokreni: node tests/unit/quiz-pool.test.js
// Shim-obrazac: js/quiz.js se učita kroz new Function sa stubovima globala.

const assert = require('assert');
const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  ✓ ' + name); }
  catch (e) { failed++; console.error('  ✗ ' + name + '\n      ' + e.message); }
}

console.log('\n=== quiz-pool ===\n');

const quiz = [];
for (let i = 0; i < 30; i++) quiz.push({ question: 'q' + i, options: ['a', 'b'], correct: 0 });
const AppState = { nav: { data: { cat1: { name: 'C1', quiz: quiz } } } };
function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const src = fs.readFileSync(path.join(__dirname, '..', '..', 'js', 'quiz.js'), 'utf8');
const getQ = new Function('window', 'AppState', 'shuffleArray', 'getCategories',
  src + '\nreturn getQuizQuestions;')({}, AppState, shuffleArray, function (c) { return Object.keys(c); });

test('count < veličina skupa: vraća točno count pitanja', () => {
  assert.strictEqual(getQ('cat1', '10').length, 10);
});

test('10 od 30 nije uvijek prvih 10 (miješa se prije rezanja)', () => {
  let different = false;
  for (let i = 0; i < 20 && !different; i++) {
    different = getQ('cat1', '10').some(q => parseInt(q.question.slice(1), 10) >= 10);
  }
  assert.ok(different, 'ni u 20 pokušaja nije izvučeno pitanje izvan prvih 10');
});

test('"all" vraća sve, bez duplikata', () => {
  const r = getQ('cat1', 'all');
  assert.strictEqual(r.length, 30);
  assert.strictEqual(new Set(r.map(q => q.question)).size, 30);
});

test('kategorija bez kviza → prazan niz', () => {
  assert.strictEqual(getQ('nema', '10').length, 0);
});

console.log('\n' + passed + ' prošlo, ' + failed + ' palo\n');
process.exit(failed ? 1 : 0);
