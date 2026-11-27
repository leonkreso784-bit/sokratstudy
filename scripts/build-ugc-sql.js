// build-ugc-sql.js — shemu osobnog sadržaja prepisuje u SQL (`public._ugc_shema()`), F6 ②/0a.
// Pokreni: npm run build:ugc-sql            → upiše blok između oznaka u supabase/f6-sadrzaj.sql
//          npm run build:ugc-sql -- --check → pada ako se blok razlikuje od sheme (preflight)
//
// ZAŠTO GENERATOR: ista pravila čitaju DVA izvršitelja — ajv (unit, CI) i pg_jsonschema (baza).
// Ručna kopija u SQL-u bila bi druga istina koja tiho ostari (ADR-027); kalup je `build:css`.
// Da je GENERIRANI SQL i PRIMIJENJEN na staging, mjeri `npm run ugc:sadrzaj` (živi drift).

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SQL = path.join(ROOT, 'supabase', 'f6-sadrzaj.sql');
const SHEMA = path.join(ROOT, 'schema', 'ugc-content.schema.json');
const POCETAK = '-- >>> UGC SHEMA (generirano: npm run build:ugc-sql) >>>';
const KRAJ = '-- <<< UGC SHEMA <<<';

const shema = JSON.parse(fs.readFileSync(SHEMA, 'utf8'));   // mora se parsirati — neispravan JSON pada ovdje
const tijelo = JSON.stringify(shema, null, 2);
if (tijelo.includes('$ugc$')) throw new Error('shema sadrži graničnik $ugc$');

const blok = [
  POCETAK,
  'create or replace function public._ugc_shema()',
  'returns json',
  'language sql',
  'immutable',
  "set search_path = ''",
  'as $fn$ select $ugc$' + tijelo + '$ugc$::json $fn$;',
  KRAJ
].join('\n');

const sql = fs.readFileSync(SQL, 'utf8').replace(/\r\n/g, '\n');
const i = sql.indexOf(POCETAK);
const j = sql.indexOf(KRAJ);
if (i < 0 || j < i) { console.error('✗ oznake bloka nisu u ' + path.relative(ROOT, SQL)); process.exit(1); }
const novo = sql.slice(0, i) + blok + sql.slice(j + KRAJ.length);

if (process.argv.includes('--check')) {
  if (novo !== sql) {
    console.error('✗ supabase/f6-sadrzaj.sql ne odgovara schema/ugc-content.schema.json — pokreni `npm run build:ugc-sql`');
    process.exit(1);
  }
  console.log('✓ build:ugc-sql — SQL shema == datoteka');
} else {
  fs.writeFileSync(SQL, novo);
  console.log('✓ build:ugc-sql — upisano u supabase/f6-sadrzaj.sql');
}
