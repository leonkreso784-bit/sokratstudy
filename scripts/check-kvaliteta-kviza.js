#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * check:kviz — pitanje se ne smije dati pogoditi bez znanja.
 *
 * ── POVOD ──────────────────────────────────────────────────────────────────────
 * Dvoje odvojenih nalaza, oba iz recenzije sadržaja:
 *   • BUG-054 (15.11.2026.): točan odgovor je često JEDINA NAJDULJA opcija — izmjereno
 *     43–56 % na starim predmetima, a slučajno bi bilo ≈ 25 %. Graditelj (čovjek ili AI)
 *     točan odgovor piše precizno i potpuno, a distraktore kratko. `js/quiz.js` miješa
 *     POZICIJE, ali duljinu ne može promiješati.
 *   • 17.11.2026. (PFRI): šest dopuna kojima se odgovor VIDIO u samoj rečenici ili u
 *     pomoći, i dopune koje su završavale točkom (`normFill` točku ne skida, pa je
 *     odgovor s točkom netočan odgovor).
 * Letvica ADR-042 imala je strojni korak (`qa.js`), ali je živio u `_materials/` (gitignored)
 * i IZGUBLJEN JE sa stroja na kojem je nastao. Zato ova brana stoji u repou.
 *
 * ── ŠTO TVRDI ──────────────────────────────────────────────────────────────────
 * TVRDO (nema osnovice, uvijek pada):
 *   1. odgovor dopune ne smije završavati REČENIČNOM točkom. Skratice su izuzete jer je ondje
 *      točka DIO pojma („ibid.", „n.d.", „et al.", „rev. ed.") i student ju mora otipkati —
 *      prva verzija pravila prijavila je sedam takvih u `academic-writing` kao kvar, a nisu.
 *      Pada kad je zadnja riječ duga (≥ 5 slova) ili je PUKI BROJ, a nema unutarnje točke:
 *      „skrbništvo." i „1689." jesu kvar (povod za broj: šesti ispravak u `09066b57`).
 * ČEGRTALJKA (osnovica po predmetu, broj smije samo PADATI; nov predmet mora biti NULA):
 *   2. broj kviz pitanja u kojima je točna opcija JEDINA najdulja;
 *   3. broj dopuna kojima se odgovor vidi u rečenici ili pomoći. Izmjereno 27.11.: **105** u
 *      zatečenom katalogu (te2, accounting, traffic, marketing… — ne samo PFRI). Tvrdo bi
 *      srušilo preflight na dugu koji nije od danas, a tiho prešlo bi dopustilo nove.
 * Osnovica imenuje predmete, pa se u diffu vidi tko je popustio. `--update` ju spušta
 * (i diže samo za novi predmet, uz vidljiv diff).
 *
 * Mjerač ispisuje koliko je predmeta, pitanja i dopuna dotaknuo — pouka iz redizajna:
 * mjerač koji to ne ispiše zna vratiti uvjerljivu nulu. Read-only, bez mreže → preflight.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const OSNOVICA = path.join(__dirname, 'kviz-baseline.json');
const { SOKRAT_CATALOG } = require(path.join(ROOT, 'data', 'catalog.js'));
const UPDATE = process.argv.includes('--update');

/** Isti shim-obrazac kao validate-content.js: data-skripte pišu na window. */
function ucitaj(scripts) {
  const sandbox = { window: {}, console, Math, Object, Array, JSON, String, Number, Boolean, Date };
  sandbox.global = sandbox;
  const ctx = vm.createContext(sandbox);
  for (const rel of scripts) {
    const p = path.join(ROOT, rel);
    if (!fs.existsSync(p)) continue;
    try { vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: rel }); } catch (e) { /* strukturu sudi validate:content */ }
  }
  return sandbox.window;
}

/** „Vidi se u rečenici": odgovor kao cijela riječ, izvan praznine. Dijakritika i padež se NE gledaju —
 *  traži se doslovan niz, jer samo on odgovor čini čitljivim s ekrana. */
function vidiSe(odgovor, tekst) {
  const a = String(odgovor).trim().toLowerCase();
  if (a.length < 4) return false;              // kratke riječi („rok") se javljaju slučajno
  const t = String(tekst || '').toLowerCase().replace(/_{3,}/g, ' ⟦⟧ ');
  const i = t.indexOf(a);
  if (i < 0) return false;
  const prije = t[i - 1] || ' ';
  const poslije = t[i + a.length] || ' ';
  return /[\s(„"'\-–—]/.test(prije) && /[\s).,;:!?"'…\-–—]/.test(poslije);
}

/** Točka na kraju odgovora je KVAR samo ako je rečenična, a ne dio skratice. */
function recenicnaTocka(odg) {
  if (!/\.$/.test(odg)) return false;
  const bez = odg.slice(0, -1);
  if (bez.includes('.')) return false;                 // „n.d.", „s.v." — unutarnja točka = skratica
  const zadnja = bez.split(/[\s-]/).pop() || '';
  if (/^\d+$/.test(zadnja)) return true;              // „1689." — student otipka broj bez točke (povod: 09066b57)
  return zadnja.replace(/[^\p{L}]/gu, '').length >= 5; // „Anon.", „al.", „ed." izuzeti
}

const subjects = (SOKRAT_CATALOG.subjects || []).filter((s) => s.content && Array.isArray(s.content.scripts));
const stare = fs.existsSync(OSNOVICA) ? JSON.parse(fs.readFileSync(OSNOVICA, 'utf8')) : {};
const nove = {};
const tvrdi = [];
const porasli = [];
const primjeri = [];
let brPredmeta = 0; let brPitanja = 0; let brDopuna = 0; let brKategorija = 0;

for (const s of subjects) {
  const win = ucitaj(s.content.scripts);
  const varijable = Object.keys(win);
  if (!varijable.length) continue;
  brPredmeta++;
  let najdulji = 0; let pitanja = 0; let odaje = 0;
  const vidjeni = new Set();

  for (const v of varijable) {
    const lekcija = win[v];
    if (!lekcija || typeof lekcija !== 'object') continue;
    for (const [kljuc, kat] of Object.entries(lekcija)) {
      if (!kat || typeof kat !== 'object' || !kat.name) continue;
      brKategorija++;
      for (const q of kat.quiz || []) {
        if (!q || !Array.isArray(q.options) || typeof q.correct !== 'number') continue;
        const potpis = (q.question || '') + '|' + q.options.join('|');
        if (vidjeni.has(potpis)) continue;      // final je kopija M1+M2 — ne broji dvaput
        vidjeni.add(potpis);
        pitanja++; brPitanja++;
        const duljine = q.options.map((o) => String(o).length);
        const max = Math.max.apply(null, duljine);
        if (duljine[q.correct] === max && duljine.filter((d) => d === max).length === 1) najdulji++;
      }
      for (const b of kat.fillBlanks || []) {
        if (!b || typeof b.answer !== 'string') continue;
        const potpis = (b.sentence || '') + '|' + b.answer;
        if (vidjeni.has('f' + potpis)) continue;
        vidjeni.add('f' + potpis);
        brDopuna++;
        const odg = b.answer.trim();
        if (recenicnaTocka(odg)) tvrdi.push(`[${s.id}] ${kljuc}: odgovor dopune završava rečeničnom točkom — „${odg}"`);
        if (vidiSe(odg, b.sentence)) { odaje++; primjeri.push(`[${s.id}] ${kljuc}: „${odg}" u rečenici`); }
        else if (b.hint && vidiSe(odg, b.hint)) { odaje++; primjeri.push(`[${s.id}] ${kljuc}: „${odg}" u pomoći`); }
      }
    }
  }
  if (!pitanja) continue;
  nove[s.id] = { najdulji, pitanja, odaje };
  const prije = stare[s.id];
  if (prije && najdulji > prije.najdulji) {
    porasli.push(`[${s.id}] najdulja točna opcija: ${prije.najdulji} → ${najdulji} (od ${pitanja} pitanja)`);
  }
  if (prije && odaje > (prije.odaje || 0)) {
    porasli.push(`[${s.id}] dopuna koja odaje odgovor: ${prije.odaje || 0} → ${odaje}`);
  }
}

console.log('\n=== check:kviz — pogađanje bez znanja ===\n');
console.log(`  dotaknuto: ${brPredmeta} predmeta · ${brKategorija} kategorija · ${brPitanja} kviz pitanja · ${brDopuna} dopuna`);
const ukNaj = Object.values(nove).reduce((a, b) => a + b.najdulji, 0);
console.log(`  točna opcija je JEDINA najdulja: ${ukNaj} / ${brPitanja} (${brPitanja ? (100 * ukNaj / brPitanja).toFixed(1) : 0} %; slučajno bi bilo ≈ 25 %)`);
const ukOdaje = Object.values(nove).reduce((a, b) => a + (b.odaje || 0), 0);
console.log(`  dopuna koja odaje odgovor: ${ukOdaje} / ${brDopuna}`);

if (UPDATE) {
  fs.writeFileSync(OSNOVICA, JSON.stringify(nove, null, 2) + '\n');
  console.log(`\n✅ osnovica zapisana: ${Object.keys(nove).length} predmeta → scripts/kviz-baseline.json`);
  process.exit(0);
}
if (!fs.existsSync(OSNOVICA)) {
  console.error('\n❌ nema scripts/kviz-baseline.json — brana bez osnovice ne mjeri ništa. Napravi ju: npm run check:kviz -- --update');
  process.exit(1);
}
const noviBezOsnovice = Object.keys(nove).filter((id) => !stare[id]);
let pad = false;
if (tvrdi.length) {
  pad = true;
  console.error(`\n❌ ${tvrdi.length} TVRDI prekršaj (dopune):`);
  tvrdi.slice(0, 30).forEach((m) => console.error('   • ' + m));
  if (tvrdi.length > 30) console.error(`   • … i još ${tvrdi.length - 30}`);
}
if (porasli.length) {
  pad = true;
  console.error(`\n❌ ${porasli.length} predmet(a) je POPUSTIO (čegrtaljka ide samo nadolje):`);
  porasli.forEach((m) => console.error('   • ' + m));
}
if (noviBezOsnovice.length) {
  pad = true;
  console.error(`\n❌ ${noviBezOsnovice.length} predmet nije u osnovici — nov sadržaj se ne upisuje tiho:`);
  noviBezOsnovice.forEach((id) => console.error(`   • ${id}: najdulja ${nove[id].najdulji}/${nove[id].pitanja} · odaje ${nove[id].odaje}`));
  const prljavi = noviBezOsnovice.filter((id) => nove[id].odaje > 0);
  if (prljavi.length) {
    console.error('   ⚠ NOV predmet mora imati NULA dopuna koje odaju odgovor, a imaju:');
    prljavi.forEach((id) => console.error(`     · ${id}: ${nove[id].odaje}`));
  }
  console.error('   Ako je mjera prihvatljiva: npm run check:kviz -- --update (diff pokazuje brojku).');
}
if (pad) process.exit(1);
if (primjeri.length) {
  console.log(`\n  (zatečeno u osnovici: ${primjeri.length} dopuna odaje odgovor — popravljati predmet po predmet, brojka smije samo pasti)`);
}
console.log('\n✅ nijedna dopuna ne završava točkom i nijedan predmet nije popustio.');
process.exit(0);
