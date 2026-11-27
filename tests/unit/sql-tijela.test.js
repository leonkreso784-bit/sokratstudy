/* eslint-disable no-console */
// ===== check:sql-tijela — dio BEZ mreže: parser tijela, normalizacija, presuda, redoslijed =====
// Pokreni: node tests/unit/sql-tijela.test.js  (uključeno u `npm run test:unit`)
// Živi dio (staging) mjeri `npm run check:sql-tijela`; ovdje se tvrdi da ga parser ne može tiho
// prevariti: komentirana definicija se ne broji, razlika u komentaru nije razlika u kodu, a broj
// definicija po datoteci == broj koji vidi obična pretraga teksta.

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const C = require('../../scripts/check-sql-tijela.js');

const KORIJEN = path.join(__dirname, '..', '..');
let pao = 0;
let proslo = 0;
const test = (ime, fn) => {
  try { fn(); proslo++; console.log('  ✓ ' + ime); } catch (e) { pao++; console.log('  ✗ ' + ime + '\n      ' + e.message); }
};

console.log('\n=== check:sql-tijela (bez mreže) ===\n');

const SQL = [
  '-- create or replace function public.komentirana() returns int as $$ select 1 $$;',
  'create or replace function public.prva(p int)',
  'returns int language sql as $$',
  '  select p + 1 -- komentar u tijelu',
  '$$;',
  'create function public.druga() returns void language plpgsql as $fn$',
  "begin raise notice 'tekst -- nije komentar'; end;",
  '$fn$;',
].join('\n');

test('parser: dvije definicije, komentirana se ne broji, tijelo doslovno između $tag$', () => {
  const f = C.funkcijeIz(SQL);
  assert.deepStrictEqual(f.map((x) => x.ime), ['prva', 'druga']);
  assert.strictEqual(f[0].tijelo, '\n  select p + 1 -- komentar u tijelu\n');
  assert.ok(f[1].tijelo.includes("'tekst -- nije komentar'"), 'tag $fn$ nije pročitan: ' + f[1].tijelo);
});

test('normalizacija: komentar i razmaci nisu razlika; `--` unutar navodnika JEST tekst', () => {
  assert.strictEqual(C.normaliziraj('select 1 -- a\n  from x /* b */'), C.normaliziraj('select 1\nfrom x'));
  assert.notStrictEqual(C.normaliziraj("select '--a'"), C.normaliziraj("select ''"));
});

test('presuda: ISTO · KOMENTARI · RAZLIKA · NEMA', () => {
  const ocek = new Map([
    ['a', { tijelo: 'select 1', datoteka: 'x' }],
    ['b', { tijelo: 'select 1 -- novo', datoteka: 'x' }],
    ['c', { tijelo: 'select 2', datoteka: 'x' }],
    ['d', { tijelo: 'select 3', datoteka: 'x' }],
  ]);
  const st = [{ proname: 'a', prosrc: 'select 1' }, { proname: 'b', prosrc: 'select 1' }, { proname: 'c', prosrc: 'select 9' }];
  assert.deepStrictEqual(C.usporedi(ocek, st).map((i) => i.stanje), ['ISTO', 'KOMENTARI', 'RAZLIKA', 'NEMA']);
});

test('redoslijed: svaka supabase/f6-*.sql na disku je u REDOSLIJED i obrnuto', () => {
  assert.deepStrictEqual(C.neuskladeneDatoteke(KORIJEN, C.REDOSLIJED), { visak: [], manjak: [] });
});

test('doseg: po datoteci parser vidi isto koliko i obična pretraga teksta (i nije nula)', () => {
  let ukupno = 0;
  for (const d of C.REDOSLIJED) {
    const tekst = fs.readFileSync(path.join(KORIJEN, 'supabase', d), 'utf8');
    const grep = tekst.split(/\r?\n/).filter((l) => /^\s*create\s+(or\s+replace\s+)?function\s+public\./i.test(l)).length;
    assert.strictEqual(C.funkcijeIz(tekst).length, grep, d + ': parser ' + C.funkcijeIz(tekst).length + ', pretraga ' + grep);
    ukupno += grep;
  }
  assert.ok(ukupno > 0, 'nula funkcija — brana nema što mjeriti');
  console.log('      (dotaknuto ' + ukupno + ' definicija u ' + C.REDOSLIJED.length + ' datoteka)');
});

console.log('\n  ' + proslo + ' prošlo, ' + pao + ' palo\n');
process.exit(pao ? 1 : 0);
