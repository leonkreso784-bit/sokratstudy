#!/usr/bin/env node
'use strict';
/**
 * bump-version.js — F3 3C: JEDINSTVENI auto version-bump za cache-busting tokene.
 *
 * ZAŠTO (BUG-004): Vercel servira `css`/`js`/`data` s `immutable` cacheom (1 god). Ako se pri
 * izmjeni fajla zaboravi bumpati `?v=` token, preglednik nastavi servirati STARU verziju →
 * deploy je nevidljiv. Tokeni su dosad bili RUČNO održavani na ~90 mjesta (5 HTML + styles.css +
 * manifest.json) + `CONTENT_VERSION` → trivijalno je zaboraviti podskup (klasičan BUG-004 pad).
 *
 * RJEŠENJE: JEDAN broj za cijelu aplikaciju. `npm run bump` postavi SVE tokene (uključujući
 * CONTENT_VERSION) na isti novi timestamp ODJEDNOM → nemoguće je zaboraviti podskup.
 * `--check` (CI gate) dokazuje da su svi tokeni identični → drift (ručni parcijalni bump) = crveno.
 *
 * RABLJENJE:
 *   node scripts/bump-version.js                 # bump: svi tokeni → novi YYYYMMDDHHMMSS
 *   node scripts/bump-version.js --set 20260710  # eksplicitna vrijednost (escape hatch)
 *   node scripts/bump-version.js --check         # CI gate: svi tokeni identični? (ne piše)
 *   node scripts/bump-version.js --dry           # pokaži što bi se promijenilo, ne piši
 *
 * Token je OPAKI cache-buster (nigdje se ne uspoređuje numerički u runtimeu) → format je slobodan;
 * timestamp je monotono rastući + čitljiv ("koja je verzija live").
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TOKEN_RE = /\?v=\d+/g;                                    // asset tokeni: styles.css?v=123
// Verzijske KONSTANTE u JS-u (nisu `?v=` tokeni, ali dijele isti broj — jedan za cijelu app):
const VERSION_CONSTS = [
  { file: 'js/content-loader.js', name: 'CONTENT_VERSION', re: /(const CONTENT_VERSION = ')(\d+)(')/ }, // data cache-buster
  { file: 'sw.js',               name: 'SW_VERSION',      re: /(const SW_VERSION = ')(\d+)(')/ },       // Service Worker cache (F3 3A)
];

/** Datoteke koje NOSE tokene (JS koristi CONTENT_VERSION varijablu, ne hardkod → nije ovdje). */
function targetFiles() {
  const files = [];
  for (const f of fs.readdirSync(ROOT)) {
    if (f.endsWith('.html')) files.push(f);                     // sve root *.html
  }
  files.push('styles.css');                                    // @import tokeni
  const cssDir = path.join(ROOT, 'css');
  if (fs.existsSync(cssDir)) {
    for (const f of fs.readdirSync(cssDir)) {                   // buduće ugniježđeno: css/*.css s pravim tokenom
      if (!f.endsWith('.css')) continue;
      const rel = path.posix.join('css', f);
      if (/\?v=\d+/.test(fs.readFileSync(path.join(ROOT, rel), 'utf8'))) files.push(rel);
    }
  }
  files.push('manifest.json');                                 // PWA ikone s ?v=
  /* ⚠️ Generirane stranice kataloga (`scripts/build-seo-pages.js`) stoje u PODMAPAMA
     (`predmet/`, `program/`), a gornja petlja čita samo korijen. Bez ovoga bi njihov
     `?v=` ostao zamrznut zauvijek: `vercel.json` drži CSS na `max-age=31536000,
     immutable`, pa bi posjetitelj koji je stigao iz Googlea dobivao staru paletu i
     nakon svakog deploya — točno BUG-004, samo na stranicama koje nitko ne otvara
     ručno. Mape se ne popisuju: traže se one koje NOSE token. */
  for (const d of ['predmet', 'program']) {
    const dir = path.join(ROOT, d);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.html')) continue;
      const rel = path.posix.join(d, f);
      if (/\?v=\d+/.test(fs.readFileSync(path.join(ROOT, rel), 'utf8'))) files.push(rel);
    }
  }
  return [...new Set(files)].filter(f => fs.existsSync(path.join(ROOT, f)));
}

/** Skupi sve token-vrijednosti (asset tokeni + CONTENT_VERSION) → [{file, token, count}]. */
function collect() {
  const out = [];
  for (const rel of targetFiles()) {
    const txt = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const m = txt.match(TOKEN_RE) || [];
    const byVal = {};
    for (const t of m) { const v = t.slice(3); byVal[v] = (byVal[v] || 0) + 1; }
    for (const v of Object.keys(byVal)) out.push({ file: rel, token: v, count: byVal[v] });
  }
  for (const vc of VERSION_CONSTS) {
    const abs = path.join(ROOT, vc.file);
    if (!fs.existsSync(abs)) continue;
    const m = fs.readFileSync(abs, 'utf8').match(vc.re);
    if (m) out.push({ file: vc.file, token: m[2], count: 1, versionConst: vc.name });
  }
  return out;
}

/** YYYYMMDDHHMMSS (lokalno vrijeme) — monotono, uvijek > starih 8-znamenkastih tokena. */
function nowStamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

function writeAll(version, { dry } = {}) {
  let fileCount = 0, tokenCount = 0;
  for (const rel of targetFiles()) {
    const abs = path.join(ROOT, rel);
    const txt = fs.readFileSync(abs, 'utf8');
    const matches = txt.match(TOKEN_RE) || [];
    if (!matches.length) continue;
    const next = txt.replace(TOKEN_RE, `?v=${version}`);
    tokenCount += matches.length; fileCount++;
    if (next !== txt && !dry) fs.writeFileSync(abs, next);
    console.log(`  ${dry ? '·' : '✓'} ${rel.padEnd(20)} ${matches.length} token(a) → ?v=${version}`);
  }
  // Verzijske konstante (CONTENT_VERSION, SW_VERSION) — isti broj
  for (const vc of VERSION_CONSTS) {
    const abs = path.join(ROOT, vc.file);
    if (!fs.existsSync(abs)) continue;
    const txt = fs.readFileSync(abs, 'utf8');
    if (!vc.re.test(txt)) continue;
    const next = txt.replace(vc.re, `$1${version}$3`);
    if (next !== txt && !dry) fs.writeFileSync(abs, next);
    console.log(`  ${dry ? '·' : '✓'} ${vc.file.padEnd(20)} ${vc.name} → '${version}'`);
    tokenCount++;
  }
  return { fileCount, tokenCount };
}

function main() {
  const args = process.argv.slice(2);
  const has = (f) => args.includes(f);

  if (has('--check')) {
    const vals = collect();
    const uniq = [...new Set(vals.map((v) => v.token))];
    if (uniq.length <= 1) {
      console.log(`✅ Cache tokeni konzistentni: svih ${vals.reduce((a, v) => a + v.count, 0)} = ?v=${uniq[0] || '—'}`);
      process.exit(0);
    }
    console.error(`❌ DRIFT: ${uniq.length} različitih token-vrijednosti (očekivano 1). Pokreni "npm run bump".`);
    const byVal = {};
    for (const v of vals) (byVal[v.token] = byVal[v.token] || []).push(`${v.file}×${v.count}`);
    for (const val of Object.keys(byVal).sort()) console.error(`   ?v=${val}: ${byVal[val].join(', ')}`);
    process.exit(1);
  }

  const dry = has('--dry');
  const setIdx = args.indexOf('--set');
  let version = setIdx !== -1 ? args[setIdx + 1] : nowStamp();
  if (!/^\d+$/.test(version || '')) {
    console.error('❌ Neispravna verzija (samo znamenke): ' + version);
    process.exit(2);
  }

  const before = collect();
  const prevMax = before.map((v) => v.token).sort().slice(-1)[0] || '—';
  console.log(`${dry ? '[DRY] ' : ''}Bump cache tokena: prethodni max ?v=${prevMax} → nova ?v=${version}\n`);
  const { fileCount, tokenCount } = writeAll(version, { dry });
  console.log(`\n${dry ? '[DRY] bi se promijenilo' : '✅ Bumpano'}: ${tokenCount} token(a)/verzija u ${fileCount} datoteka + verzijske konstante (CONTENT_VERSION/SW_VERSION).`);
  if (!dry) console.log('   ⚠️ Ovo je cache-bump → tretiraj kao promjenu (commit + deploy).');
}

main();
