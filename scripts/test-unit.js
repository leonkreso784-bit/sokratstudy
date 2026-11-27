#!/usr/bin/env node
/* eslint-disable no-console */
// ===== test-unit — POKRENI SVAKI tests/unit/*.test.js KOJI POSTOJI NA DISKU =====
//
// Pokreni:  npm run test:unit                       → sve iz `tests/unit/`
//           node scripts/test-unit.js --mapa=<put>  → iz druge mape (koristi BRANA, ne čovjek)
//
// ── ZAŠTO OVA DATOTEKA POSTOJI ──────────────────────────────────────────────────────────
// Do 2026-09-24 je `test:unit` bio RUČNO PISAN lanac od 57 `node tests/unit/… && node …`
// unosa u `package.json`. Taj popis je duplikat ispisa mape: ista činjenica („ovaj test
// postoji") stajala je na dva mjesta, a samo je jedno od njih moglo ostarjeti (ADR-027).
//
// ⚠️ IZMJERENO PRIJE ZAHVATA, i mjera je pokazala da drifta DANAS NEMA: lanac 57 unosa,
// disk 57 datoteka, nesvrstanih 0, mrtvih 0, duplikata 0. Dakle ovo NIJE popravak nego
// uklanjanje razreda greške prije nego se dogodi — i to baš onog razreda koji je S1
// zatvarao: **datoteka koja se ne vrti ne prijavljuje se kao crvena, nego kao tišina.**
// Netko napiše `tests/unit/nesto.test.js`, zaboravi `package.json`, i taj test NIKAD ne
// padne — ne zato što je kod ispravan, nego zato što ga nitko ne poziva. Točno tako je
// `authed` suite stajao 12 vrtnji: zeleno je značilo „nisam ništa izmjerio".
//
// ⚠️ ZAŠTO RUNNER, A NE BRANA NAD POPISOM. Brana bi drift OTKRILA; runner ga čini
// NEMOGUĆIM — nova datoteka vrti se čim padne na disk, jer popisa više nema. To vrijedi
// i za PODMAPE (vidi `nabroji()`). Cijena je da se svaka `*.test.js` ispod te mape vrti,
// uključujući nedovršenu; to je namjerno, jer nedovršen test u `tests/unit/` je ionako
// ili gotov ili ne bi smio biti ondje.
//
// ⚠️ ALI RUNNER SAM PO SEBI NIJE BRANA. Onaj koji nabroji nula datoteka uredno završi
// `exit 0` i izvještaj se NE razlikuje od „sve prošlo" — isti kvar u novom ruhu. Zato
// ovdje stoje dva tvrda uvjeta: **nula datoteka = pad**, i **broj izvedenih mora biti
// jednak broju nabrojanih**. Uz to se ISPISUJE koliko je dotaknuto, jer je mjerač koji
// ne kaže svoj doseg u fazi redizajna dvaput vratio uvjerljiv krivi broj umjesto da padne.
// Da te tvrdnje stvarno vrijede pazi `tests/unit/test-unit-runner.test.js`, koja ovu
// skriptu IZVEDE nad podmetnutim mapama (prazna · jedan pad · jedan prolaz).
//
// ⚠️ ZASTAVICA IDE NA SVE, I TO JE MJERENO. U starom lancu su je nosila točno tri unosa
// (`mail-core`, `token-guard`, `mcp-alati`). Provjereno je ZAŠTO: nijedna od te tri nije
// ESM — upozorenje dolazi iz `.ts` datoteke koju one dinamički uvoze iz `supabase/functions/`.
// Znači zastavica se NE da izvesti iz sintakse samog testa, a izvođenje iz „uvozi li .ts"
// bio bi novi ručni popis na zaobilazan način. `--disable-warning` ne mijenja nijedan
// izlazni kod, samo prigušuje kozmetičko upozorenje — pa ide na sve i mapiranja nema.

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const KORIJEN = path.join(__dirname, '..');
const ZADANA_MAPA = path.join(KORIJEN, 'tests', 'unit');

// ⚠️ Zašto je zastavica ovdje, a ne u svakom unosu: vidi zaglavlje. Prigušuje
// MODULE_TYPELESS_PACKAGE_JSON koji dolazi iz dinamički uvezenih `.ts` datoteka.
const ZASTAVICE = ['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON'];

/**
 * Sve `*.test.js` u zadanoj mapi **I SVIM PODMAPAMA**, abecedno (determinizam: isti
 * redoslijed svaki put).
 *
 * ⚠️ Čita se DISK. Čim se ovdje pojavi ručno nabrojana putanja, vraćen je razred greške
 * zbog kojeg skripta postoji — zato brana tvrdi i da u ovoj datoteci nema takvog literala.
 *
 * ⚠️ REKURZIVNO, I TO NIJE UKRAS. Prva verzija je čitala samo ravnu mapu, pa bi
 * `tests/unit/mcp/x.test.js` bio **nevidljiv** — a brojač bi svejedno pisao pun `N/N`.
 * To je doslovno razred greške zbog kojeg skripta postoji, samo pomaknut jednu razinu
 * niže: tišina umjesto crvenog. Našla ga je revizija brane, ne moje čitanje.
 * Kuća to pravilo već ima na drugom mjestu — `scripts/ci-tajne.js` nabraja testove
 * rekurzivno uz obrazloženje „da helper ili novi podfolder ne ostane nevidljiv".
 */
function nabroji(mapa = ZADANA_MAPA) {
  const izlaz = [];
  for (const unos of fs.readdirSync(mapa, { withFileTypes: true })) {
    const p = path.join(mapa, unos.name);
    // ⚠️ IME SE SUDI PRIJE VRSTE, namjerno. Mapa nazvana `*.test.js` tako ostane NABROJANA
    // pa padne dolje na „nije datoteka" — da se rekurzira, tiho bi nestala iz obje brojke
    // i nitko ne bi saznao da nešto što se zove test nije test.
    if (unos.name.endsWith('.test.js')) izlaz.push(p);
    else if (unos.isDirectory()) izlaz.push(...nabroji(p));
  }
  return izlaz.sort();
}

// ── CLI ─────────────────────────────────────────────────────────────────────────────────
if (require.main === module) {
  const arg = process.argv.find((a) => a.startsWith('--mapa='));
  const mapa = arg ? path.resolve(arg.slice('--mapa='.length)) : ZADANA_MAPA;

  let datoteke;
  try {
    datoteke = nabroji(mapa);
  } catch (e) {
    // Pada zatvoreno: nečitljiva mapa NIJE „nula testova, sve u redu".
    console.error('test:unit — mapa se ne da pročitati: ' + mapa + '\n  ' + e.message);
    process.exit(1);
  }

  // ⚠️ PRVI TVRDI UVJET: nula datoteka je PAD, ne uspjeh. Bez ovoga bi preimenovana ili
  // premještena mapa dala zeleno bez ijednog izvedenog testa — točno kvar koji S1 zatvara.
  if (datoteke.length === 0) {
    console.error('test:unit — nijedna *.test.js nije nađena u ' + mapa + '\n' +
      '  Nula izvedenih testova NIJE uspjeh: zeleno bi značilo „nisam ništa izmjerio".');
    process.exit(1);
  }

  console.log('\n=== test:unit — ' + datoteke.length + ' datoteka iz ' + path.relative(KORIJEN, mapa) + ' ===\n');

  let izvedeno = 0;
  const pale = [];
  const neizvedene = [];

  for (const put of datoteke) {
    const ime = path.relative(KORIJEN, put).split(path.sep).join('/');
    // ⚠️ Ime koje završava na `.test.js` ne mora biti DATOTEKA (mapa tako nazvana prolazi
    // kroz `readdir`). Takav unos se NE broji u izvedene — inače bi brojač tvrdio da je
    // dotaknuo nešto što nije ni pokrenuo, a to je razred greške zbog kojeg brojač postoji.
    if (!fs.statSync(put).isFile()) { neizvedene.push(ime + ' (nije datoteka)'); continue; }

    const r = spawnSync(process.execPath, [...ZASTAVICE, put], { stdio: 'inherit', cwd: KORIJEN });
    if (r.error) { neizvedene.push(ime + ' (nije se pokrenuo: ' + r.error.message + ')'); continue; }
    izvedeno++;
    // `status` je null kad je proces ubijen signalom — to je pad, ne prolaz.
    if (r.status !== 0) pale.push(ime + (r.status === null ? ' (signal ' + r.signal + ')' : ''));
  }

  // ⚠️ DRUGI TVRDI UVJET + DOSEG. Mjerač mora ispisati koliko je DOTAKNUO, inače se
  // „sve prošlo" ne razlikuje od „ništa nisam pokrenuo".
  console.log('\n=== test:unit — dotaknuto ' + izvedeno + '/' + datoteke.length + ' datoteka, palo ' + pale.length + ' ===');

  if (izvedeno !== datoteke.length) {
    console.error('test:unit — izvedeno ' + izvedeno + ', a nabrojano ' + datoteke.length + ' → nepotpuna vrtnja.\n' +
      neizvedene.map((x) => '  ✗ ' + x).join('\n'));
    process.exit(1);
  }

  if (pale.length) {
    console.error('\nPALE:\n' + pale.map((x) => '  ✗ ' + x).join('\n'));
    process.exit(1);
  }

  console.log('Sve prošlo.\n');
}

module.exports = { nabroji, ZADANA_MAPA, ZASTAVICE };
