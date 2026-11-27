#!/usr/bin/env node
/* eslint-disable no-console */
// ===== ci-tajne — KOJE TAJNE TESTOVI TRAŽE, I MORA LI IH CI IMATI =====
//
// Pokreni:  node scripts/ci-tajne.js              → ispiši što testovi traže (read-only)
//           node scripts/ci-tajne.js --zahtijevaj → PADNI ako obavezna tajna nije u okolini
//
// ── ZAŠTO OVA DATOTEKA POSTOJI ──────────────────────────────────────────────────────────
// `tests/profile-jezik.authed.spec.js` ③ je JEDINA tvrdnja koja mjeri ŽICU: da tijelo
// `PUT /auth/v1/user` stvarno nosi `current_password`. To polje zakucani `supabase-js@2.110.8`
// NIGDJE ne spominje (0 pogodaka u bundleu) — prolazi samo zato što `updateUser` cijeli objekt
// atributa pošalje kao tijelo. Dakle: SDK koji sutra počne filtrirati nepoznata polja tiho
// otključava bravu iz ①/2b, a nijedan unit-test to ne vidi (oni mjere POZIV, ne žicu).
//
// ⚠️ IZMJERENO 2026-09-24, i mjera je oborila zapisanu pretpostavku. Zapis je tvrdio da se
// ta jedna tvrdnja preskače jer joj CI ne prosljeđuje `STAGING_TEST_ADMIN_PASSWORD`. Stvarnost
// je bila gora: korak „Run authenticated suite" trajao je **0 sekundi u zadnjih 12 vrtnji**
// (`e23d658` … `921cfbc`), jer je bio napisan kao „ako je `TEST_ADMIN_EMAIL` prazan → exit 0",
// a taj secret NIKAD nije bio postavljen (PROGRESS, `34b3612`, 2026-07-08: „⏳ Leon doda
// repo-secrete"). Dakle nije se preskakala jedna tvrdnja nego **cijeli authed suite — 34
// datoteke, nijedan put, ni na jednom commitu.** Svaka vrtnja je pritom uredno potrošila 25 s
// na instalaciju Chromiuma pa ga nije upotrijebila.
//
// ⚠️ ZATO OVDJE STOJI KOD, A NE BILJEŠKA U ci.yml-u. Stara logika je bila prozni `if` u YAML-u:
// nitko ga nije mogao pokrenuti, pa nitko nije mogao izmjeriti da uvijek ide u `exit 0`. Ovo
// se pokreće — i u CI-ju (`--zahtijevaj`) i u brani (`tests/unit/ci-tajne.test.js`, koja ovu
// skriptu STVARNO izvede s podmetnutom praznom tajnom). ADR-027: jedna činjenica, jedno mjesto.
//
// ⚠️ POPIS SE NE PIŠE RUKOM. Imena tajni se ČITAJU S DISKA iz `tests/**` — ručno nabrojan popis
// ne pokriva spec koji tek nastane, a upravo je to razred greške koji nas je ovdje i doveo.
// Svako nađeno ime mora biti u TOČNO JEDNOJ od tri skupine ispod; ime u nijednoj = PAD, pa
// četvrti spec koji sutra zatreba novu tajnu obori branu umjesto da se tiho preskoči.

const fs = require('fs');
const path = require('path');

// ⚠️ `.env` SE UČITAVA, i to nije udobnost nego točnost. Pre-push hook vrti `--zahtijevaj`
// lokalno, gdje tajne stoje u `.env` (gitignored) — bez dotenva bi brana ondje tvrdila da
// tajni nema iako ih ima, dakle LAŽNO CRVENO na ispravnom stablu. Isti uvjetni oblik kao u
// `playwright.config.js`: ako dotenva nema, okolina dolazi iz ljuske/CI-ja i to je u redu.
try { require('dotenv').config(); } catch (e) { /* dotenv je opcionalan */ }

const KORIJEN = path.join(__dirname, '..');
const TESTS_DIR = path.join(KORIJEN, 'tests');
// ⚠️ `playwright.config.js` je DIO ovisnosti, ne okolina oko nje: on odlučuje POSTOJI li
// `authenticated` projekt (`AUTHED`), pa tajna koju on čita drži cijeli suite na životu.
// Bez njega bi `CI` i `SOKRAT_TEST_PORT` izgledali kao mrtvi unosi, a nisu.
const KONFIG = path.join(KORIJEN, 'playwright.config.js');

// ── SKUPINA 1: OBAVEZNE — CI ih MORA imati, inače authed suite ne mjeri ništa ────────────
// Leonova odluka 2026-09-24: u GitHub idu STAGING_* tajne (u anketi četiri, isti dan dopunjeno
// service ključem — vidi bilješku uz njega). Zašto staging a ne produkcija: `auth.setup.js` na
// njih preusmjeri aplikaciju (`sokrat-supabase-override`), pa write-testovi gađaju izolirani
// test-DB i PROD audit (`content_versions`, append-only) ostaje čist — pravilo #8. S
// produkcijskim `TEST_ADMIN_*` isti suite piše u živi sadržaj.
const OBAVEZNE = [
  'STAGING_SUPABASE_URL',
  'STAGING_SUPABASE_ANON',
  'STAGING_TEST_ADMIN_EMAIL',
  'STAGING_TEST_ADMIN_PASSWORD',
  // ⚠️ DODAN 2026-09-24, i to je PROMJENA ODLUKE ISTOG DANA. U anketi je Leon service ključ
  // odbio, pa je stajao kao imenovana iznimka s cijenom „6 tvrdnji se preskače". Kad je dodavao
  // tajne, dodao je i njega → rečenica u kodu („ne ide u GitHub secrets") postala je NEISTINITA.
  // Odluka na to pitanje: iskoristiti ga. Posljedica: `temelj-mreze` se više NE preskače, CI
  // mjeri svih 154 tvrdnji kao i lokalno, a preskočenih je NULA.
  'STAGING_SUPABASE_SERVICE_KEY',
];

// ── SKUPINA 2: IMENOVANE IZNIMKE — svjesno IH NEMA u CI-ju, svaka s razlogom ─────────────
// ⚠️ Iznimka nosi i POSLJEDICU, ne samo razlog. „Preskočeno" bez napisane cijene je isto ono
// tiho zeleno koje ova brana zatvara — razlika je samo u tome što je ovo odluka, a ono je bio
// propust. Cijena se ovdje ČITA, pa se u izvještaju vidi koliko tvrdnji CI ne mjeri.
const IMENOVANE_IZNIMKE = {
  TEST_ADMIN_EMAIL: {
    zasto: 'Produkcijski račun. Pravilo #8: protiv PROD-a nema automatiziranih write-testova.',
    cijena: 'Nijedna — STAGING_* pokrivaju isti put na izoliranom test-DB-u.',
  },
  TEST_ADMIN_PASSWORD: {
    zasto: 'Produkcijska lozinka, isti razlog kao TEST_ADMIN_EMAIL.',
    cijena: 'Nijedna.',
  },
};

// ── SKUPINA 3: NISU TAJNE — prekidači testova, nemaju što raditi u secretima ─────────────
// ⚠️ Ovo NIJE „ostalo" nego imenovan popis. Da se nepoznato ime tiho svrstalo ovamo, nova tajna
// bi ušla u repozitorij bez da je ikad prošla kroz odluku — a ta vrsta tišine je cijeli povod.
const NISU_TAJNE = {
  PHONE_BASELINE_UPDATE: 'spušta osnovicu tests/phone-baseline.json (razvojni prekidač)',
  A11Y_WCAG_MJERENJE: 'uključuje puno WCAG mjerenje u a11y specovima',
  CI: 'postavlja ga GitHub Actions sam',
  SOKRAT_TEST_PORT: 'port test-poslužitelja (više radnih stabala na istom računalu)',
  UGC_OSNOVICA_UPDATE: 'podiže osnovicu tests/fixtures/ugc-gen-osnovica.json (razvojni prekidač, F6 ②/0a)',
  PATH: 'brana `ci-tajne` podmeće PATH sa stubovima `npm`/`node` da IZVEDE pre-push hook',
};

/**
 * Koliko tvrdnji se u CI-ju smije preskočiti = ZBROJ cijena imenovanih iznimki.
 * ⚠️ IZVODI SE, NE PIŠE. Prva verzija je taj broj imala zakucan u `authed-mjera.js` (6), pa je
 * čim je service ključ prešao u OBAVEZNE postao **druga kopija iste činjenice** — a kopija koja
 * se ne mijenja zajedno s izvorom je točno ono što ADR-027 zabranjuje. Sad: makneš iznimku →
 * dopušteni broj padne sam, i mjerač odmah traži više izmjerenog.
 * Cijena se piše slobodnim tekstom, pa se broj čita iz njega („6 tvrdnji"); tekst bez broja
 * znači NULA preskočenih, dakle pada zatvoreno.
 */
function preskocenihPoIznimkama() {
  let ukupno = 0;
  for (const o of Object.values(IMENOVANE_IZNIMKE)) {
    const m = String(o.cijena || '').match(/(\d+)\s*tvrdnj/);
    if (m) ukupno += Number(m[1]);
  }
  return ukupno;
}

/** Komentari se odstranjuju PRIJE pretrage — proza koja tajnu samo spominje nije ovisnost. */
const bezKomentara = (src) => src.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^\s*\/\/.*$/gm, ' ');

/** Sve .js datoteke pod tests/ (rekurzivno), da helper ili novi podfolder ne ostane nevidljiv. */
function sveTestDatoteke(dir = TESTS_DIR, izlaz = []) {
  for (const unos of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, unos.name);
    if (unos.isDirectory()) {
      if (unos.name === '.auth' || unos.name === 'node_modules') continue;
      sveTestDatoteke(p, izlaz);
    } else if (unos.name.endsWith('.js')) {
      izlaz.push(p);
    }
  }
  return izlaz;
}

/**
 * Nabroji s DISKA koje `process.env.*` varijable testovi stvarno koriste.
 * @returns {Map<string, string[]>} ime → popis datoteka (relativno) koje ga traže
 */
function nabrojiIzTestova() {
  const nadeno = new Map();
  for (const dat of [...sveTestDatoteke(), KONFIG]) {
    const kod = bezKomentara(fs.readFileSync(dat, 'utf8'));
    const rel = path.relative(KORIJEN, dat).replace(/\\/g, '/');
    for (const m of kod.matchAll(/process\.env\.([A-Z][A-Z_0-9]*)/g)) {
      if (!nadeno.has(m[1])) nadeno.set(m[1], []);
      const popis = nadeno.get(m[1]);
      if (!popis.includes(rel)) popis.push(rel);
    }
  }
  return nadeno;
}

/** Imena koja testovi traže a nisu ni u jednoj od tri skupine → nepoznata, brana pada. */
function nesvrstane() {
  const svrstane = new Set([...OBAVEZNE, ...Object.keys(IMENOVANE_IZNIMKE), ...Object.keys(NISU_TAJNE)]);
  return [...nabrojiIzTestova().keys()].filter((ime) => !svrstane.has(ime)).sort();
}

/**
 * Svrstana imena koja nijedan test (ni konfig) više ne traži = MRTAV UNOS.
 * ⚠️ Zašto je i to pad, a ne samo neurednost: mrtva „OBAVEZNA" tajna tjera CI da drži secret
 * koji ničemu ne služi, a mrtva IZNIMKA tvrdi da nešto svjesno preskačemo — pa u izvještaju
 * stoji cijena koje nema. Popis pisan rukom stari u OBA smjera; brana zato sudi oba.
 */
function mrtve() {
  const nadeno = new Set(nabrojiIzTestova().keys());
  const svrstane = [...OBAVEZNE, ...Object.keys(IMENOVANE_IZNIMKE), ...Object.keys(NISU_TAJNE)];
  return svrstane.filter((ime) => !nadeno.has(ime)).sort();
}

/** Obavezne tajne kojih u zadanoj okolini nema (ili su prazne). Vrijednosti se NIKAD ne ispisuju. */
function nedostajuce(okolina = process.env) {
  return OBAVEZNE.filter((ime) => !okolina[ime] || String(okolina[ime]).trim() === '');
}

// ── CLI ─────────────────────────────────────────────────────────────────────────────────
if (require.main === module) {
  const zahtijevaj = process.argv.includes('--zahtijevaj');
  const nadeno = nabrojiIzTestova();

  if (zahtijevaj) {
    // ⚠️ OVO JE KORAK KOJI CI STVARNO IZVEDE, i on PADA ZATVORENO. Stara logika je na istom
    // mjestu radila `exit 0` — 12 zelenih vrtnji koje nisu izmjerile ništa. Tišina je bila kvar.
    const fale = nedostajuce();
    if (fale.length) {
      console.error('\n✗ authed suite NE MOŽE mjeriti — nema ' + fale.length + ' obaveznu/e tajnu/e:\n');
      for (const ime of fale) {
        const tko = (nadeno.get(ime) || []).join(', ') || '(nijedan test ju više ne traži?)';
        console.error('    ' + ime + '\n        traži ju: ' + tko);
      }
      console.error(
        '\n  Postavi ih: GitHub → Settings → Secrets and variables → Actions → New repository secret.' +
        '\n  Lokalno idu u .env (gitignored).' +
        '\n\n  ⚠️ NE „preskačem pa exit 0". Preskočena tvrdnja izgleda jednako kao prošla, a upravo' +
        '\n     je tako `profile-jezik` ③ — jedina mjera ŽICE — bila nevidljiva 12 vrtnji zaredom.\n'
      );
      process.exitCode = 1;
      return;
    }
    console.log('✓ sve ' + OBAVEZNE.length + ' obavezne tajne su tu → authed suite stvarno mjeri.');
    return;
  }

  // Read-only ispis (dijagnostika; ne ispisuje nijednu vrijednost).
  console.log('\n=== tajne koje testovi traže (čitano s diska, tests/**) ===\n');
  const svrstaj = (ime) => {
    if (OBAVEZNE.includes(ime)) return 'OBAVEZNA';
    if (IMENOVANE_IZNIMKE[ime]) return 'IZNIMKA';
    if (NISU_TAJNE[ime]) return 'nije tajna';
    return '⚠️ NESVRSTANA';
  };
  for (const ime of [...nadeno.keys()].sort()) {
    console.log('  ' + svrstaj(ime).padEnd(14) + ime + '  ←  ' + nadeno.get(ime).join(', '));
  }
  const fale = nedostajuce();
  console.log('\n  u ovoj okolini fali: ' + (fale.length ? fale.join(', ') : 'nijedna'));
  const nesvr = nesvrstane();
  if (nesvr.length) console.log('  ⚠️ NESVRSTANE: ' + nesvr.join(', '));
  const mrt = mrtve();
  if (mrt.length) console.log('  ⚠️ MRTVI UNOSI (svrstani, nitko ih ne traži): ' + mrt.join(', '));
  console.log('');
}

module.exports = {
  OBAVEZNE,
  IMENOVANE_IZNIMKE,
  NISU_TAJNE,
  bezKomentara,
  nabrojiIzTestova,
  nesvrstane,
  mrtve,
  nedostajuce,
  preskocenihPoIznimkama,
};
