#!/usr/bin/env node
/* eslint-disable no-console */
// ===== sql:staging — izvrši SQL datoteku na STAGING bazi, i NIGDJE drugdje =====
// Pokreni: npm run sql:staging -- supabase/f6-nacrt.sql          (izvrši)
//          npm run sql:staging -- supabase/f6-nacrt.sql --dry    (samo pokaži što bi se izvršilo)
//
// ZAŠTO POSTOJI (Leon, 2026-10-11; povod u PROGRESS K/6): `execute_sql` s DDL-om i `apply_migration` kroz
// Supabase MCP sigurnosni filtar odbija i na stagingu, pa je Leon svaku izmjenu sheme lijepio u SQL Editor
// ručno (K/5: tri obrnute SQL provjere, K/6: četiri). Ova skripta to radi s ovog stroja — ali SAMO na stagingu.
//
// KAKO JE PRODUKCIJA ZATVORENA (tri sloja, svaki dovoljan sam):
//   1. VJERODAJNICA: čita se JEDINO `STAGING_DB_URL` iz `.env` (lozinka STAGING baze; upisuje je Leon, ja je
//      ne vidim). Lozinka staging baze ne otvara produkciju — ni uz grešku u ovom kodu.
//   2. ADRESA: korisnik mora biti `postgres.<staging-ref>` (pooler) ili host `db.<staging-ref>.supabase.co`
//      (izravno), a nijedan drugi ref iz `PROJEKTI` (deploy-function.js — jedan popis refova, više čitatelja)
//      ne smije se pojaviti nigdje u adresi. Ne prosljeđuje se nijedna zastavica CLI-ja (`--linked`,
//      `--project-ref`, `--db-url`): to bi otvorilo put preko CLI prijave, koja vrijedi za CIJELI račun.
//   3. NAČIN: `supabase db query --db-url` (CLI je već u devDependencies, nema nove ovisnosti), pokrenut
//      IZRAVNO kroz node — bez `cmd.exe`, gdje su `%`, `^` i `&` iz lozinke posebni znakovi (zamka #20).
// Lozinka se NIKAD ne ispisuje: maskira se i u izlazu CLI-ja (sirova, dekodirana i kodirana).
//
// Brana: tests/unit/sql-staging.test.js.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const { PROJEKTI } = require('./deploy-function.js');

const ROOT = path.join(__dirname, '..');
const STAGING = PROJEKTI.staging.ref;
const TUDI = Object.entries(PROJEKTI).filter(([k]) => k !== 'staging').map(([, p]) => p.ref);
const UPUTA = 'U .env upiši STAGING_DB_URL = Supabase dashboard → sokrat-staging → Connect → Session pooler\n' +
  '   (URI), s lozinkom staging baze umjesto [YOUR-PASSWORD].';

// .env bez dotenv-a (isti mini-parser kao seed-staging.js)
function citajEnv() {
  const put = path.join(ROOT, '.env');
  const out = {};
  if (!fs.existsSync(put)) return out;
  for (const l of fs.readFileSync(put, 'utf8').split(/\r?\n/)) {
    const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return out;
}

function maska(tekst, lozinke) {
  let t = String(tekst);
  // najdulji oblik prvi — inače kraći (dekodirani) razreže dulji (sirovi) i ostavi mu ostatak
  for (const l of lozinke.filter(Boolean).sort((a, b) => b.length - a.length)) t = t.split(l).join('***');
  return t;
}

/**
 * Sve provjere, bez izvođenja. Baca Error s porukom za čovjeka. Vraća { program, args, datoteka, lozinke, opis }.
 * `env` = SAMO ono što je pročitano iz .env (namjerno ne process.env — vjerodajnica ne smije doći izvana).
 */
function pripremi(env, argv, korijen) {
  korijen = korijen || ROOT;
  const zastavice = argv.filter((a) => a.startsWith('-'));
  const ostalo = argv.filter((a) => !a.startsWith('-'));
  const nepoznate = zastavice.filter((z) => z !== '--dry');
  if (nepoznate.length) throw new Error('Nepoznata zastavica: ' + nepoznate.join(' ') + ' — dopuštena je samo --dry (cilj se NE bira, uvijek je staging).');
  if (ostalo.length !== 1) throw new Error('Treba TOČNO jedna SQL datoteka (dobiveno: ' + ostalo.length + ').\n   npm run sql:staging -- supabase/<datoteka>.sql [--dry]');
  const datoteka = path.resolve(korijen, ostalo[0]);
  if (!/\.sql$/i.test(datoteka)) throw new Error('Nije .sql datoteka: ' + ostalo[0]);
  if (!fs.existsSync(datoteka) || !fs.statSync(datoteka).isFile()) throw new Error('Datoteka ne postoji: ' + ostalo[0]);

  const sirovo = (env.STAGING_DB_URL || '').trim();
  if (!sirovo) throw new Error('Nema STAGING_DB_URL u .env.\n   ' + UPUTA);
  let u;
  try { u = new URL(sirovo); } catch (e) { throw new Error('STAGING_DB_URL nije valjana adresa.\n   ' + UPUTA); }
  if (u.protocol !== 'postgres:' && u.protocol !== 'postgresql:') throw new Error('STAGING_DB_URL mora počinjati s postgresql:// (dobiveno ' + u.protocol + ').');
  const korisnik = decodeURIComponent(u.username);
  const lozinka = decodeURIComponent(u.password);
  if (!lozinka || /YOUR-PASSWORD/i.test(lozinka)) throw new Error('U STAGING_DB_URL nema lozinke (ili je ostao [YOUR-PASSWORD]).\n   ' + UPUTA);

  let dekodirano;
  try { dekodirano = decodeURIComponent(sirovo); } catch (e) { dekodirano = sirovo; }
  const tudi = TUDI.filter((ref) => sirovo.indexOf(ref) >= 0 || dekodirano.indexOf(ref) >= 0);
  if (tudi.length) throw new Error('ODBIJENO: STAGING_DB_URL spominje ref koji NIJE staging (' + tudi.join(', ') + '). Ova skripta nikad ne gađa produkciju.');
  const pooler = korisnik === 'postgres.' + STAGING && /\.pooler\.supabase\.com$/.test(u.hostname);
  const izravno = korisnik === 'postgres' && u.hostname === 'db.' + STAGING + '.supabase.co';
  if (!pooler && !izravno) {
    throw new Error('ODBIJENO: STAGING_DB_URL ne vodi na staging (' + STAGING + '): korisnik „' + korisnik + '", host „' + u.hostname + '".\n' +
      '   Dopušteno: postgres.' + STAGING + '@…pooler.supabase.com ili postgres@db.' + STAGING + '.supabase.co');
  }

  const cli = require.resolve('supabase/dist/supabase.js', { paths: [korijen, ROOT] });
  const sql = fs.readFileSync(datoteka, 'utf8');
  return {
    program: process.execPath,
    args: [cli, 'db', 'query', '--db-url', sirovo, '-f', datoteka],
    datoteka,
    // ⚠️ `u.password` je PONOVNO KODIRAN (`^` → `%5E`), pa sirovi oblik iz .env treba izvaditi iz teksta adrese
    lozinke: [(/^[a-z]+:\/\/[^:@/]*:([^@]*)@/i.exec(sirovo) || [])[1], lozinka, u.password, encodeURIComponent(lozinka)],
    opis: [
      'cilj     : STAGING  ' + PROJEKTI.staging.ime + ' (' + STAGING + ')  — ' + (pooler ? 'pooler ' : 'izravno ') + u.hostname,
      'datoteka : ' + path.relative(korijen, datoteka).split(path.sep).join('/') + '  (' + sql.length + ' znakova, sha256 ' +
        crypto.createHash('sha256').update(sql).digest('hex').slice(0, 12) + ')',
    ],
  };
}

module.exports = { pripremi, maska, citajEnv };

if (require.main === module) {
  const argv = process.argv.slice(2);
  let p;
  try { p = pripremi(citajEnv(), argv); } catch (e) { console.error('\n❌ ' + e.message + '\n'); process.exit(1); }
  console.log('\n=== sql:staging ===');
  p.opis.forEach((l) => console.log('  ' + l));
  if (argv.includes('--dry')) { console.log('\n— `--dry`: stalo prije izvođenja, ništa nije poslano.\n'); process.exit(0); }
  const r = spawnSync(p.program, p.args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (r.stdout) process.stdout.write(maska(r.stdout, p.lozinke));
  if (r.stderr) process.stderr.write(maska(r.stderr, p.lozinke));
  if (r.error || r.status !== 0) {
    console.error('\n❌ SQL nije prošao (' + (r.error ? maska(r.error.message, p.lozinke) : 'izlaz ' + r.status) + '). Na stagingu se ništa nije promijenilo samo ako je datoteka u transakciji.\n');
    process.exit(r.status || 1);
  }
  console.log('\n✅ Izvršeno na STAGINGU (' + STAGING + '). Sad PROVJERI, ne pretpostavljaj (npr. md5 tijela funkcija ili uživa brana).\n');
}
