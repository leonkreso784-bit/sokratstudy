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
//      ne smije se pojaviti nigdje u adresi. Adresa NE SMIJE nositi parametre (`?sslmode=…` bi u `pg`-u
//      nadjačao našu TLS postavku — `disable` šalje lozinku nešifriranu).
//   3. NAČIN: `pg` (node-postgres), parametri veze izvučeni iz adrese, TLS UZ PROVJERU certifikata prema
//      Supabaseovom korijenu (`lib/supabase-root-ca.pem`). Nema ljuske, pa ni `cmd.exe` zamke s `%^&` (#20).
// Lozinka se NIKAD ne ispisuje: maskira se u svakoj poruci baze (sirova, dekodirana i kodirana).
//
// ZAŠTO `pg`, A NE SUPABASE CLI (izmjereno 12.10., Leonova odluka u anketi istog dana): `supabase db query`
// šalje datoteku kao PRIPREMLJENU naredbu, a Postgres u nju ne pušta više naredbi („cannot insert multiple
// commands into a prepared statement"). Prvi živi prolaz imao je jedan `select` i to nije mogao vidjeti —
// a nijedna naša datoteka nema jednu naredbu. `pg` šalje tekst JEDNOSTAVNIM protokolom: cijela datoteka
// ide bazi odjednom, kao iz SQL Editora, i Postgres je izvodi kao JEDNU transakciju (pad bilo gdje = ništa
// nije upisano) — osim ako datoteka sama ima `begin`/`commit` (`a1`, `c3`), kad vrijedi ono što ona commita.
// CLI usput ne provjerava certifikat (Supabase potpisuje vlastitim CA-om, kojeg nema u javnim): ovdje se
// provjerava, a CA je izvučen iz samog CLI-ja i isti je korijen koji pooler šalje (otisak u .pem datoteci).
//
// Brana: tests/unit/sql-staging.test.js.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { PROJEKTI } = require('./deploy-function.js');

const ROOT = path.join(__dirname, '..');
const STAGING = PROJEKTI.staging.ref;
const TUDI = Object.entries(PROJEKTI).filter(([k]) => k !== 'staging').map(([, p]) => p.ref);
const CA = path.join(__dirname, 'lib', 'supabase-root-ca.pem');
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
 * Sve provjere, bez izvođenja. Baca Error s porukom za čovjeka. Vraća { veza, sql, datoteka, lozinke, opis }.
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
  if (u.search || u.hash) throw new Error('ODBIJENO: STAGING_DB_URL ne smije imati parametre (' + (u.search || u.hash).split('=')[0] + '…) — TLS i sve ostalo postavlja skripta.');

  const sql = fs.readFileSync(datoteka, 'utf8');
  return {
    // Parametri, NE `connectionString`: `pg` bi parametre iz adrese stavio IZNAD ove postavke.
    veza: {
      host: u.hostname,
      port: Number(u.port || 5432),
      user: korisnik,
      password: lozinka,
      database: decodeURIComponent(u.pathname.replace(/^\//, '')) || 'postgres',
      ssl: { ca: fs.readFileSync(CA, 'utf8'), rejectUnauthorized: true, servername: u.hostname },
      connectionTimeoutMillis: 20000,
    },
    sql,
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

/**
 * Izvrši pripremljenu datoteku: jedna poruka, jednostavni protokol (v. zaglavlje). Vraća popis rezultata
 * `{ naredba, redaka, redci }` po naredbi. Greška baze se baca s maskiranom porukom i `kod` = SQLSTATE.
 * `ispis(tekst)` dobiva NOTICE poruke (maskirane). `Klijent` se podmeće samo u unit-testu.
 */
async function izvrsi(p, ispis, Klijent) {
  const klijent = new (Klijent || require('pg').Client)(p.veza);
  klijent.on('notice', (n) => ispis && ispis('NOTICE ' + maska(n.message, p.lozinke)));
  klijent.on('error', () => { /* prekinuta veza nakon greške — greška je već bačena iz query() */ });
  try {
    await klijent.connect();
    const r = await klijent.query(p.sql);
    return (Array.isArray(r) ? r : [r]).map((x) => ({ naredba: x.command, redaka: x.rowCount, redci: x.fields && x.fields.length ? x.rows : null }));
  } catch (e) {
    const g = new Error(maska([e.code, e.message, e.detail, e.hint, e.where].filter(Boolean).join(' · '), p.lozinke));
    g.kod = e.code || '';
    throw g;
  } finally {
    await klijent.end().catch(() => {});
  }
}

module.exports = { pripremi, izvrsi, maska, citajEnv };

if (require.main === module) {
  const argv = process.argv.slice(2);
  let p;
  try { p = pripremi(citajEnv(), argv); } catch (e) { console.error('\n❌ ' + e.message + '\n'); process.exit(1); }
  console.log('\n=== sql:staging ===');
  p.opis.forEach((l) => console.log('  ' + l));
  if (argv.includes('--dry')) { console.log('\n— `--dry`: stalo prije izvođenja, ništa nije poslano.\n'); process.exit(0); }
  izvrsi(p, (t) => console.log('  ' + t)).then((rez) => {
    for (const x of rez) {
      if (x.redci) console.log('\n  ' + x.naredba + ' (' + x.redaka + '):\n' + maska(JSON.stringify(x.redci.slice(0, 50), null, 2), p.lozinke) +
        (x.redci.length > 50 ? '\n  … još ' + (x.redci.length - 50) : ''));
    }
    console.log('\n  naredbi izvršeno: ' + rez.length + ' (' + Object.entries(rez.reduce((o, x) => (o[x.naredba] = (o[x.naredba] || 0) + 1, o), {}))
      .map(([k, v]) => k + ' ×' + v).join(', ') + ')');
    console.log('\n✅ Izvršeno na STAGINGU (' + STAGING + '). Sad PROVJERI, ne pretpostavljaj (npr. md5 tijela funkcija ili živa brana).\n');
  }, (e) => {
    console.error('\n❌ SQL nije prošao: ' + e.message);
    console.error('   Datoteka je poslana kao JEDNA transakcija → ništa nije upisano, OSIM ako sama ima begin/commit.\n');
    process.exit(1);
  });
}
