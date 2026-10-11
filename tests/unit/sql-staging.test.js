/* eslint-disable no-console */
// ===== BRANA: `sql:staging` izvršava SQL SAMO na stagingu =====
// Pokreni: node tests/unit/sql-staging.test.js  (uključeno u `npm run test:unit`)
//
// ZAŠTO: zaglavlje `scripts/sql-staging.js`. Ovdje se sudi `pripremi()` — svaka provjera prije izvođenja —
// nad podmetnutim `.env` vrijednostima; ništa se ne spaja ni na jednu bazu. Refovi se čitaju iz
// `PROJEKTI` (deploy-function.js), ne prepisuju.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { pripremi, maska } = require('../../scripts/sql-staging.js');
const { PROJEKTI } = require('../../scripts/deploy-function.js');

let passed = 0;
let failed = 0;
function test(ime, fn) {
  try { fn(); passed++; console.log('  ✓ ' + ime); }
  catch (e) { failed++; console.error('  ✗ ' + ime + '\n      ' + e.message); }
}
function tvrdi(uvjet, poruka) { if (!uvjet) throw new Error(poruka); }
function baca(fn, uzorak, ime) {
  let poruka = null;
  try { fn(); } catch (e) { poruka = e.message; }
  tvrdi(poruka !== null, ime + ': NIJE odbijeno');
  tvrdi(uzorak.test(poruka), ime + ': krivi razlog — ' + poruka);
  return poruka;
}

console.log('\n=== sql:staging (samo staging) ===\n');

const S = PROJEKTI.staging.ref;
const P = PROJEKTI.prod.ref;
const LOZ = 'Tajna%25+&^lozinka';   // namjerno s %, +, &, ^ — znakovi koje bi cmd.exe ili URL pojeli
const POOLER = 'postgresql://postgres.' + S + ':' + LOZ + '@aws-1-eu-central-1.pooler.supabase.com:5432/postgres';
const IZRAVNO = 'postgresql://postgres:' + LOZ + '@db.' + S + '.supabase.co:5432/postgres';

const kor = fs.mkdtempSync(path.join(os.tmpdir(), 'sokrat-sql-'));
fs.mkdirSync(path.join(kor, 'supabase'));
fs.writeFileSync(path.join(kor, 'supabase', 'a.sql'), 'select 1;\n');
fs.writeFileSync(path.join(kor, 'supabase', 'a.txt'), 'select 1;\n');
const DAT = ['supabase/a.sql'];

test('staging preko poolera prolazi; CLI je `db query --db-url … -f <datoteka>`', () => {
  const p = pripremi({ STAGING_DB_URL: POOLER }, DAT, kor);
  tvrdi(p.args.slice(1, 4).join(' ') === 'db query --db-url' && p.args[4] === POOLER, p.args.slice(1, 5).join(' '));
  tvrdi(p.args[5] === '-f' && p.args[6] === path.join(kor, 'supabase', 'a.sql'), 'datoteka ' + p.args[6]);
  tvrdi(p.opis.join('\n').indexOf('STAGING') >= 0 && p.opis.join('\n').indexOf(S) >= 0, p.opis.join(' | '));
});

test('staging izravno (db.<ref>.supabase.co) prolazi', () => {
  pripremi({ STAGING_DB_URL: IZRAVNO }, DAT, kor);
});

test('poziv je IZRAVNO kroz node, bez cmd.exe (program = node, prvi argument = CLI skripta)', () => {
  const p = pripremi({ STAGING_DB_URL: POOLER }, DAT, kor);
  tvrdi(p.program === process.execPath, 'program ' + p.program);
  tvrdi(/supabase[\\/]dist[\\/]supabase\.js$/.test(p.args[0]) && fs.existsSync(p.args[0]), 'CLI ' + p.args[0]);
});

test('lozinka se ne pojavljuje u opisu; maska je skriva u sirovom, dekodiranom i kodiranom obliku', () => {
  const p = pripremi({ STAGING_DB_URL: POOLER }, DAT, kor);
  const dekod = decodeURIComponent(LOZ);
  tvrdi(p.opis.join('\n').indexOf(dekod) < 0 && p.opis.join('\n').indexOf(LOZ) < 0, 'lozinka u opisu');
  const izlaz = maska('greška za ' + POOLER + ' i ' + dekod + ' i ' + encodeURIComponent(dekod), p.lozinke);
  tvrdi(izlaz.indexOf(dekod) < 0 && izlaz.indexOf(LOZ) < 0 && izlaz.indexOf(encodeURIComponent(dekod)) < 0, izlaz);
});

// ── produkcija u svakom obliku ──
test('produkcija preko poolera = ODBIJENO', () => {
  baca(() => pripremi({ STAGING_DB_URL: POOLER.split(S).join(P) }, DAT, kor), /ODBIJENO.*NIJE staging/, 'prod pooler');
});
test('produkcija izravno = ODBIJENO', () => {
  baca(() => pripremi({ STAGING_DB_URL: IZRAVNO.split(S).join(P) }, DAT, kor), /ODBIJENO/, 'prod izravno');
});
test('staging korisnik, ali prod ref drugdje u adresi (i percent-kodiran) = ODBIJENO', () => {
  baca(() => pripremi({ STAGING_DB_URL: POOLER + '?options=' + P }, DAT, kor), /ODBIJENO.*NIJE staging/, 'ref u upitu');
  const kod = P.split('').map((c) => '%' + c.charCodeAt(0).toString(16)).join('');
  baca(() => pripremi({ STAGING_DB_URL: POOLER + '?x=' + kod }, DAT, kor), /ODBIJENO.*NIJE staging/, 'kodiran ref');
});
test('tuđi host ili tuđi korisnik (nije staging ref) = ODBIJENO', () => {
  baca(() => pripremi({ STAGING_DB_URL: 'postgresql://postgres:x@localhost:5432/postgres' }, DAT, kor), /ODBIJENO: STAGING_DB_URL ne vodi/, 'localhost');
  baca(() => pripremi({ STAGING_DB_URL: 'postgresql://postgres.drugi:x@aws-1-eu-central-1.pooler.supabase.com:5432/postgres' }, DAT, kor), /ODBIJENO: STAGING_DB_URL ne vodi/, 'drugi korisnik');
  baca(() => pripremi({ STAGING_DB_URL: 'postgresql://postgres.' + S + ':x@zli.example.com:5432/postgres' }, DAT, kor), /ODBIJENO: STAGING_DB_URL ne vodi/, 'tuđi host');
});
test('vjerodajnica dolazi SAMO iz STAGING_DB_URL — produkcijske varijable se ne gledaju', () => {
  baca(() => pripremi({ SUPABASE_URL: 'https://' + P + '.supabase.co', SUPABASE_SERVICE_KEY: 'k', DATABASE_URL: IZRAVNO }, DAT, kor),
    /Nema STAGING_DB_URL/, 'bez STAGING_DB_URL');
});
test('bez lozinke ili s [YOUR-PASSWORD] = odbijeno s uputom', () => {
  baca(() => pripremi({ STAGING_DB_URL: POOLER.replace(':' + LOZ, '') }, DAT, kor), /nema lozinke/, 'bez lozinke');
  baca(() => pripremi({ STAGING_DB_URL: POOLER.replace(LOZ, '[YOUR-PASSWORD]') }, DAT, kor), /YOUR-PASSWORD/, 'placeholder');
  baca(() => pripremi({ STAGING_DB_URL: 'https://' + S + '.supabase.co' }, DAT, kor), /postgresql:\/\//, 'https');
});

// ── zastavice i datoteka ──
test('nijedna zastavica CLI-ja se ne prosljeđuje (--linked, --project-ref, --db-url, --local)', () => {
  for (const z of [['--linked'], ['--project-ref', P], ['--db-url', IZRAVNO], ['--local']]) {
    baca(() => pripremi({ STAGING_DB_URL: POOLER }, DAT.concat(z), kor), /Nepoznata zastavica|TOČNO jedna/, z[0]);
  }
  pripremi({ STAGING_DB_URL: POOLER }, DAT.concat(['--dry']), kor);
});
test('točno jedna postojeća .sql datoteka', () => {
  baca(() => pripremi({ STAGING_DB_URL: POOLER }, [], kor), /TOČNO jedna/, 'nijedna');
  baca(() => pripremi({ STAGING_DB_URL: POOLER }, ['supabase/a.sql', 'supabase/a.sql'], kor), /TOČNO jedna/, 'dvije');
  baca(() => pripremi({ STAGING_DB_URL: POOLER }, ['supabase/a.txt'], kor), /Nije \.sql/, 'txt');
  baca(() => pripremi({ STAGING_DB_URL: POOLER }, ['supabase/nema.sql'], kor), /ne postoji/, 'nema');
});

fs.rmSync(kor, { recursive: true, force: true });
console.log('\n' + passed + ' prošlo, ' + failed + ' palo\n');
process.exit(failed ? 1 : 0);
