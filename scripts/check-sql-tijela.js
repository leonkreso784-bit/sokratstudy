#!/usr/bin/env node
/* eslint-disable no-console */
// ===== check:sql-tijela — tijela funkcija na STAGINGU == ono što piše u supabase/f6-*.sql =====
// Pokreni: npm run check:sql-tijela
//
// ZAŠTO POSTOJI (uvjet ZAVRSNICA K/10; revizor ②/1b, archive/MCP.md §⑥): sve brane F6 mjere STAGING, a na
// produkciju ide DATOTEKA. Ako je netko funkciju na stagingu popravio ručno (SQL Editor) ili datoteku izmijenio
// poslije zadnjeg puštanja, zeleno na stagingu ne govori ništa o onome što produkcija dobiva. 30.09. su se
// razlikovali (`mcp_zapocni_nacrt`, u komentarima) i nitko to nije mjerio.
//
// ŠTO TVRDI: za svaku funkciju definiranu u F6 datotekama (zadnja definicija po REDOSLIJEDU pobjeđuje, kao
// kad se datoteke puste redom) tijelo na stagingu (`pg_proc.prosrc`, Postgres ga čuva doslovno) je isto:
//   ISTO              — doslovno (uz CRLF → LF)
//   KOMENTARI         — razlika samo u komentarima i razmacima → UPOZORENJE (radi isto, ali staging nije
//                       pušten zadnjom datotekom; pusti je ponovno prije K/10 da „isto" bude doslovno)
//   RAZLIKA / NEMA    — PAD: staging i datoteka nisu ista funkcija
// Uz to: svaka `supabase/f6-*.sql` na disku MORA biti u REDOSLIJED (zaboravljena datoteka = pad).
//
// REDOSLIJED je JEDINO mjesto gdje stoji kojim se redom F6 SQL pušta (i na produkciju, K/10). Izvor:
// ovisnosti — brava stvara ulogu `mcp_klijent` i hook; `f6-sadrzaj.sql` kaže „PRIJE f6-nacrt.sql (koji je
// zove)"; prihvat koristi nacrt. Doseg se ispisuje; nula funkcija = pad.
//
// Veza ide ISKLJUČIVO kroz `sql-staging.js` (`pripremi`/`izvrsi`): iste tri ograde (vjerodajnica, adresa,
// TLS) — ova brana nikad ne može gađati produkciju. Samo ČITA (`select` iz `pg_proc`).
// Ishod: exit 1 = drift · exit 0 = isto (uz moguća upozorenja) · exit 0 + SKIP = nema STAGING_DB_URL.

const fs = require('fs');
const os = require('os');
const path = require('path');

const KORIJEN = path.join(__dirname, '..');
const REDOSLIJED = ['f6-mcp-brava.sql', 'f6-mcp-inventar.sql', 'f6-sadrzaj.sql', 'f6-nacrt.sql', 'f6-prihvat.sql'];

/** Makni komentare (`--` do kraja retka, `/* … *\/`) izvan navodnika. Simetrično na obje strane. */
function bezKomentara(s) {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === "'") { const j = s.indexOf("'", i + 1); const k = j < 0 ? s.length : j; out += s.slice(i, k + 1); i = k; continue; }
    if (c === '-' && s[i + 1] === '-') { const j = s.indexOf('\n', i); i = j < 0 ? s.length : j - 1; continue; }
    if (c === '/' && s[i + 1] === '*') { const j = s.indexOf('*/', i + 2); i = j < 0 ? s.length : j + 1; continue; }
    out += c;
  }
  return out;
}
const normaliziraj = (s) => bezKomentara(String(s).replace(/\r\n/g, '\n')).replace(/\s+/g, ' ').trim();

/** Sve `create [or replace] function public.<ime>(…) … as $tag$ TIJELO $tag$` iz teksta datoteke. */
function funkcijeIz(tekst) {
  const t = String(tekst).replace(/\r\n/g, '\n');
  // Komentirane definicije se ne broje: zamijeni komentare razmacima ISTE duljine da indeksi ostanu valjani.
  const maska = (() => {
    let o = '';
    for (let i = 0; i < t.length; i++) {
      const c = t[i];
      if (c === "'") { const j = t.indexOf("'", i + 1); const k = j < 0 ? t.length - 1 : j; o += t.slice(i, k + 1); i = k; continue; }
      if (c === '-' && t[i + 1] === '-') { const j = t.indexOf('\n', i); const k = j < 0 ? t.length : j; o += ' '.repeat(k - i); i = k - 1; continue; }
      o += c;
    }
    return o;
  })();
  const re = /create\s+(?:or\s+replace\s+)?function\s+public\.([a-z_][a-z0-9_]*)\s*\(/gi;
  const nadjeno = [];
  let m;
  while ((m = re.exec(maska))) {
    const ostatak = maska.slice(m.index);
    const tag = /\bas\s+(\$[a-z_0-9]*\$)/i.exec(ostatak);
    if (!tag) throw new Error('funkcija ' + m[1] + ': nema tijela u $…$');
    const od = m.index + tag.index + tag[0].length;
    const doo = t.indexOf(tag[1], od);
    if (doo < 0) throw new Error('funkcija ' + m[1] + ': tijelo nije zatvoreno ' + tag[1]);
    nadjeno.push({ ime: m[1].toLowerCase(), tijelo: t.slice(od, doo) });
    re.lastIndex = doo + tag[1].length;
  }
  return nadjeno;
}

/** Zadnja definicija po redoslijedu pobjeđuje. Vraća Map ime → { tijelo, datoteka }. */
function ocekivano(korijen, redoslijed) {
  const mapa = new Map();
  for (const d of redoslijed) {
    for (const f of funkcijeIz(fs.readFileSync(path.join(korijen, 'supabase', d), 'utf8'))) mapa.set(f.ime, { tijelo: f.tijelo, datoteka: d });
  }
  return mapa;
}

/** Datoteke `f6-*.sql` na disku koje nisu u redoslijedu (i obrnuto). */
function neuskladeneDatoteke(korijen, redoslijed) {
  const disk = fs.readdirSync(path.join(korijen, 'supabase')).filter((f) => /^f6-.*\.sql$/i.test(f));
  return { visak: disk.filter((f) => !redoslijed.includes(f)), manjak: redoslijed.filter((f) => !disk.includes(f)) };
}

function usporedi(ocek, naStagingu) {
  const ishodi = [];
  for (const [ime, o] of ocek) {
    const redovi = naStagingu.filter((r) => r.proname === ime);
    if (!redovi.length) { ishodi.push({ ime, datoteka: o.datoteka, stanje: 'NEMA' }); continue; }
    const doslovno = redovi.some((r) => String(r.prosrc).replace(/\r\n/g, '\n') === o.tijelo);
    const smisleno = redovi.some((r) => normaliziraj(r.prosrc) === normaliziraj(o.tijelo));
    ishodi.push({ ime, datoteka: o.datoteka, stanje: doslovno ? 'ISTO' : smisleno ? 'KOMENTARI' : 'RAZLIKA', inacica: redovi.length });
  }
  return ishodi;
}

module.exports = { REDOSLIJED, bezKomentara, normaliziraj, funkcijeIz, ocekivano, neuskladeneDatoteke, usporedi };

if (require.main === module) {
  (async () => {
    console.log('\n=== check:sql-tijela (STAGING == supabase/f6-*.sql) ===\n');
    const nu = neuskladeneDatoteke(KORIJEN, REDOSLIJED);
    if (nu.visak.length || nu.manjak.length) {
      console.error('❌ REDOSLIJED i disk se ne slažu — na disku a ne u redoslijedu: ' + (nu.visak.join(', ') || '—') + ' · u redoslijedu a ne na disku: ' + (nu.manjak.join(', ') || '—'));
      process.exit(1);
    }
    const ocek = ocekivano(KORIJEN, REDOSLIJED);
    if (!ocek.size) { console.error('❌ nula funkcija u F6 datotekama — brana nema što mjeriti'); process.exit(1); }

    const { pripremi, izvrsi, citajEnv, maska } = require('./sql-staging.js');
    const env = citajEnv();
    if (!env.STAGING_DB_URL) { console.log('SKIP — nema STAGING_DB_URL u .env (brana nije mjerila ništa).\n'); process.exit(0); }
    const imena = [...ocek.keys()];
    const upit = path.join(os.tmpdir(), 'sokrat-sql-tijela-' + process.pid + '.sql');
    fs.writeFileSync(upit, "select p.proname, p.prosrc from pg_proc p join pg_namespace n on n.oid = p.pronamespace\n" +
      " where n.nspname = 'public' and p.proname in (" + imena.map((i) => "'" + i + "'").join(', ') + ');\n');
    let redovi;
    let p;
    try {
      p = pripremi(env, [upit]);
      const rez = await izvrsi(p);
      redovi = rez[rez.length - 1].redci || [];
    } catch (e) {
      console.error('❌ ' + (p ? maska(e.message, p.lozinke) : e.message));
      process.exit(1);
    } finally {
      fs.rmSync(upit, { force: true });
    }

    const ishodi = usporedi(ocek, redovi);
    const znak = { ISTO: '✓', KOMENTARI: '⚠', RAZLIKA: '✗', NEMA: '✗' };
    for (const i of ishodi) console.log('  ' + znak[i.stanje] + ' ' + i.stanje.padEnd(9) + ' ' + i.ime + '  (' + i.datoteka + (i.inacica > 1 ? ', ' + i.inacica + ' inačice' : '') + ')');
    const brojevi = ishodi.reduce((o, i) => (o[i.stanje] = (o[i.stanje] || 0) + 1, o), {});
    console.log('\nDoseg: ' + ishodi.length + ' funkcija iz ' + REDOSLIJED.length + ' datoteka · ' +
      Object.entries(brojevi).map(([k, v]) => k + ' ' + v).join(' · '));
    const pad = ishodi.filter((i) => i.stanje === 'RAZLIKA' || i.stanje === 'NEMA');
    if (pad.length) { console.error('\n❌ DRIFT: ' + pad.length + ' funkcija na stagingu nije ono što piše u datoteci.\n'); process.exit(1); }
    if (brojevi.KOMENTARI) console.log('\n⚠ Razlika samo u komentarima — pusti te datoteke ponovno na staging (`npm run sql:staging`) prije K/10.');
    console.log('\n✅ Tijela funkcija na stagingu odgovaraju datotekama.\n');
  })();
}
