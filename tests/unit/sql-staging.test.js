/* eslint-disable no-console */
// ===== BRANA: `sql:staging` izvršava SQL SAMO na stagingu =====
// Pokreni: node tests/unit/sql-staging.test.js  (uključeno u `npm run test:unit`)
//
// ZAŠTO: zaglavlje `scripts/sql-staging.js`. Ovdje se sudi `pripremi()` — svaka provjera prije izvođenja —
// nad podmetnutim `.env` vrijednostima, i `izvrsi()` s podmetnutim klijentom; ništa se ne spaja ni na
// jednu bazu. Refovi se čitaju iz `PROJEKTI` (deploy-function.js), ne prepisuju. Živi dokaz (više naredbi,
// sve ili ništa, provjeren certifikat) je u PROGRESS 12.10. — traži bazu, pa nije ovdje.

const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { pripremi, izvrsi, maska } = require('../../scripts/sql-staging.js');
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

test('staging preko poolera prolazi; veza = PARAMETRI iz adrese (lozinka dekodirana), nikad connectionString', () => {
  const p = pripremi({ STAGING_DB_URL: POOLER }, DAT, kor);
  const v = p.veza;
  tvrdi(v.host === 'aws-1-eu-central-1.pooler.supabase.com' && v.port === 5432 && v.database === 'postgres', JSON.stringify([v.host, v.port, v.database]));
  tvrdi(v.user === 'postgres.' + S && v.password === decodeURIComponent(LOZ), 'korisnik/lozinka');
  tvrdi(!('connectionString' in v), 'connectionString bi pustio parametre iz adrese iznad TLS postavke');
  tvrdi(p.sql === 'select 1;\n' && p.datoteka === path.join(kor, 'supabase', 'a.sql'), 'datoteka ' + p.datoteka);
  tvrdi(p.opis.join('\n').indexOf('STAGING') >= 0 && p.opis.join('\n').indexOf(S) >= 0, p.opis.join(' | '));
});

test('staging izravno (db.<ref>.supabase.co) prolazi', () => {
  pripremi({ STAGING_DB_URL: IZRAVNO }, DAT, kor);
});

test('TLS: certifikat se PROVJERAVA prema Supabase Root 2021 CA, ime poslužitelja = host', () => {
  const p = pripremi({ STAGING_DB_URL: POOLER }, DAT, kor);
  const ssl = p.veza.ssl;
  tvrdi(ssl && ssl.rejectUnauthorized === true, 'rejectUnauthorized ' + (ssl && ssl.rejectUnauthorized));
  tvrdi(ssl.servername === p.veza.host, 'servername ' + ssl.servername);
  const certi = (ssl.ca.match(/-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g) || []).map((x) => new crypto.X509Certificate(x));
  // otisak korijena koji staging pooler šalje u lancu (izmjereno 12.10.); zapisan i u .pem zaglavlju
  tvrdi(certi.some((c) => c.ca && /CN=Supabase Root 2021 CA/.test(c.subject) &&
    c.fingerprint256 === '80:70:25:AD:50:D4:ED:21:9D:2C:9C:7D:29:9C:00:4F:82:4E:B0:0C:F7:F6:5A:FE:F6:07:D0:7B:72:E6:CA:FA'), 'korijen nije u CA datoteci');
});
test('parametri u adresi (?sslmode=disable i sl.) = ODBIJENO — nadjačali bi TLS', () => {
  baca(() => pripremi({ STAGING_DB_URL: POOLER + '?sslmode=disable' }, DAT, kor), /ne smije imati parametre/, 'sslmode');
  baca(() => pripremi({ STAGING_DB_URL: POOLER + '?application_name=x' }, DAT, kor), /ne smije imati parametre/, 'bilo koji');
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

// ── izvođenje (podmetnut klijent — ništa se ne spaja) ──
// Više naredbi u datoteci prolazi SAMO jednostavnim protokolom: `query(<goli tekst>)`, jednom, bez `values`.
// `query({ text, values })` ili rezanje na naredbe vratili bi kvar zbog kojeg je CLI napušten (12.10.).
function lazniKlijent(dnevnik, ponasanje) {
  return class {
    constructor(veza) { dnevnik.veza = veza; dnevnik.upiti = []; dnevnik.zatvoren = false; }
    on() {}
    async connect() {}
    async query(...args) { dnevnik.upiti.push(args); return ponasanje(); }
    async end() { dnevnik.zatvoren = true; }
  };
}
async function testA(ime, fn) {
  try { await fn(); passed++; console.log('  ✓ ' + ime); }
  catch (e) { failed++; console.error('  ✗ ' + ime + '\n      ' + e.message); }
}

(async () => {
  const VISE = 'create table t(a int);\ninsert into t values (1);\nselect a from t;\n';
  fs.writeFileSync(path.join(kor, 'supabase', 'vise.sql'), VISE);
  const pV = pripremi({ STAGING_DB_URL: POOLER }, ['supabase/vise.sql'], kor);

  await testA('cijela datoteka ide JEDNIM pozivom kao goli tekst (jednostavni protokol), s vezom iz pripremi()', async () => {
    const d = {};
    const rez = await izvrsi(pV, null, lazniKlijent(d, () => [
      { command: 'CREATE', rowCount: null, fields: [], rows: [] },
      { command: 'INSERT', rowCount: 1, fields: [], rows: [] },
      { command: 'SELECT', rowCount: 1, fields: [{ name: 'a' }], rows: [{ a: 1 }] }]));
    tvrdi(d.veza === pV.veza, 'klijent nije dobio pripremljenu vezu');
    tvrdi(d.upiti.length === 1 && d.upiti[0].length === 1 && d.upiti[0][0] === VISE, 'upiti: ' + JSON.stringify(d.upiti));
    tvrdi(rez.length === 3 && rez[2].redci[0].a === 1 && rez[0].redci === null, JSON.stringify(rez));
    tvrdi(d.zatvoren, 'veza nije zatvorena');
  });
  await testA('greška baze: lozinka maskirana, SQLSTATE sačuvan, veza zatvorena', async () => {
    const d = {};
    const dekod = decodeURIComponent(LOZ);
    let g = null;
    try {
      await izvrsi(pV, null, lazniKlijent(d, () => { const e = new Error('auth failed for ' + dekod + ' / ' + LOZ); e.code = '28P01'; throw e; }));
    } catch (e) { g = e; }
    tvrdi(g && g.kod === '28P01', 'kod ' + (g && g.kod));
    tvrdi(g.message.indexOf(dekod) < 0 && g.message.indexOf(LOZ) < 0 && g.message.indexOf('***') >= 0, g.message);
    tvrdi(d.zatvoren, 'veza nije zatvorena nakon greške');
  });
  await testA('jedan rezultat (jedna naredba) daje popis od jednog', async () => {
    const rez = await izvrsi(pV, null, lazniKlijent({}, () => ({ command: 'SELECT', rowCount: 1, fields: [{ name: 'x' }], rows: [{ x: 1 }] })));
    tvrdi(rez.length === 1 && rez[0].naredba === 'SELECT', JSON.stringify(rez));
  });

  fs.rmSync(kor, { recursive: true, force: true });
  console.log('\n' + passed + ' prošlo, ' + failed + ' palo\n');
  process.exit(failed ? 1 : 0);
})();
