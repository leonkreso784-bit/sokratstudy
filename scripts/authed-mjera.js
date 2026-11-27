#!/usr/bin/env node
/* eslint-disable no-console */
// ===== authed-mjera — vrti prijavljeni suite I SUDI KOLIKO JE DOTAKNUO =====
//
// Pokreni:  npm run test:authed:mjeri   (isto što CI i pre-push hook vrte)
//
// ── ZAŠTO POSTOJI ───────────────────────────────────────────────────────────────────────
// `npm run test:authed` sudi SAMO izlazni kod, a Playwright pada zatvoreno tek na DOSLOVNO
// nula testova. Suite u kojem se sve preskoči završava **EXIT 0**. To je isti razred greške
// zbog kojeg cigla S1 uopće postoji: preskočena tvrdnja izgleda jednako kao prošla.
//
// ⚠️ NALAZ REVIZIJE 24.09.: brojka „154" stajala je zakucana u imenu CI-koraka i u poruci
// hooka, a NIŠTA ju nije mjerilo. Dvije jednoredne izmjene rušile su cijeli dokaz uz zeleno:
//   • preimenuj jedan `tests/*.authed.spec.js` u `.mjs`  → 34 postanu 33, nitko ne primijeti
//   • `test.skip(true, …)` na vrh speca ③                → jedina mjera ŽICE nestane
// Otuda kućno pravilo koje ovo provodi: **mjerač mora ispisati i koliko je toga dotaknuo**
// (CLAUDE.md; bio je prvi kvar 12× u fazi redizajna i dvaput vratio uvjerljiv krivi broj).
//
// ⚠️ SUDI SE STATISTIKA, NE SAMO IZLAZNI KOD. Prag je OSNOVICA, ne točan broj: suite smije
// RASTI bez dirania ove datoteke, ali ne smije tiho PASTI.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

// ── OSNOVICA ────────────────────────────────────────────────────────────────────────────
// 153 tvrdnje projekta `authenticated` + 1 `auth-setup` = **154**, izmjereno 2026-09-24 dvaput
// (14 min 45 s pa 9 min 27 s, oba EXIT 0, 0 preskočenih).
// ⚠️ Od 24.09. CI mjeri ISTO toliko koliko i lokalno: Leon je `STAGING_SUPABASE_SERVICE_KEY`
// stavio u GitHub secrets, pa `temelj-mreze` više nije preskočen. Prije te odluke osnovica je
// bila 148 (154 minus 6 preskočenih) — ako ključ ikad nestane, mjerač će pasti i to je TOČNO,
// jer je pokrivenost stvarno pala.
const OSNOVICA_PROSLIH = 154;

// ⚠️ IZVODI SE IZ IMENOVANIH IZNIMKI, ne piše rukom. Zakucana „6" je postala neistinita istog
// dana kad je ključ prešao u obavezne — druga kopija iste činjenice (ADR-027). Danas je 0.
const { preskocenihPoIznimkama } = require('./ci-tajne.js');
const DOPUSTENO_PRESKOCENIH = preskocenihPoIznimkama();

const izlaz = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'authed-mjera-')), 'report.json');
const reporter = process.env.CI ? 'list,github,json' : 'list,json';

// ⚠️ PLAYWRIGHT SE ZOVE KROZ `node <cli.js>`, NE KROZ `npx`. Prva verzija je zvala `npx.cmd`,
// a Node od zakrpe za CVE-2024-27980 ODBIJA pokrenuti `.bat`/`.cmd` bez `shell: true` → proces
// se nije ni pokrenuo. Ovako nema ljuske, nema razlike Windows/Linux, i nema PATH-ovisnosti.
const CLI = require.resolve('@playwright/test/cli');
const r = spawnSync(
  process.execPath,
  [CLI, 'test', '--project=authenticated', '--reporter=' + reporter, ...process.argv.slice(2)],
  { stdio: 'inherit', env: { ...process.env, PLAYWRIGHT_JSON_OUTPUT_NAME: izlaz } }
);

// ⚠️ UZROK SE IMENUJE PRIJE POSLJEDICE. Prva verzija je na slomljenom pozivu prijavila „JSON
// izvještaj se ne da pročitati" — istina, ali je okrivila posljedicu i poslala me tražiti kvar
// na krivom mjestu. Ako se proces nije ni pokrenuo, to mora biti prva rečenica u ispisu.
if (r.error) {
  console.error('\n✗ authed-mjera: Playwright se NIJE POKRENUO — ' + r.error.message);
  console.error('  → ništa nije izmjereno; ne mogu tvrditi ni da je prošlo ni da je palo.');
  process.exitCode = 1;
  return;
}

// ⚠️ Nepostojeći ili neparsabilan izvještaj je PAD, ne „nema podataka". Mjerač koji ne zna
// koliko je dotaknuo ne smije reći da je prošao — to je cijeli povod ove datoteke.
let stats;
try {
  stats = JSON.parse(fs.readFileSync(izlaz, 'utf8')).stats;
} catch (e) {
  console.error('\n✗ authed-mjera: JSON izvještaj se ne da pročitati (' + e.message + ')');
  console.error('  → ne znam koliko je suite dotaknuo, pa ne mogu tvrditi da je prošao.');
  process.exitCode = 1;
  return;
}
if (!stats || typeof stats.expected !== 'number') {
  console.error('\n✗ authed-mjera: izvještaj nema `stats.expected` — oblik se razišao s Playwrightom.');
  process.exitCode = 1;
  return;
}

const { expected = 0, skipped = 0, unexpected = 0, flaky = 0 } = stats;
console.log('\n=== authed-mjera: koliko je suite DOTAKNUO ===');
console.log('  prošlo      : ' + expected + '   (osnovica ' + OSNOVICA_PROSLIH + ')');
console.log('  preskočeno  : ' + skipped + '   (dopušteno ' + DOPUSTENO_PRESKOCENIH + ')');
console.log('  palo        : ' + unexpected);
console.log('  nestabilnih : ' + flaky);

const problemi = [];
if (r.status !== 0) problemi.push('Playwright je izašao s ' + r.status);
if (unexpected > 0) problemi.push(unexpected + ' tvrdnji je PALO');
if (expected < OSNOVICA_PROSLIH) {
  problemi.push(
    'prošlo ih je ' + expected + ', a osnovica je ' + OSNOVICA_PROSLIH +
    ' → netko je ugasio tvrdnje (preimenovan spec? `test.skip`? filtar?)'
  );
}
if (skipped > DOPUSTENO_PRESKOCENIH) {
  problemi.push(
    'preskočeno ih je ' + skipped + ', a dopušteno je ' + DOPUSTENO_PRESKOCENIH +
    ' → preskočena tvrdnja izgleda jednako kao prošla; imenuj ju u scripts/ci-tajne.js ili makni skip'
  );
}

if (problemi.length) {
  console.error('\n✗ authed-mjera PAO:');
  for (const p of problemi) console.error('    • ' + p);
  console.error('');
  process.exitCode = 1;
  return;
}
console.log('\n✓ authed-mjera: suite je stvarno izmjerio ' + expected + ' tvrdnji.\n');
