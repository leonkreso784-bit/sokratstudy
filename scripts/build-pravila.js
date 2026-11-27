// build-pravila.js — pravila sadržaja iz preglednika prepisuje za MCP poslužitelj (Deno), ZAVRSNICA K/1.
// Pokreni: npm run build:pravila            → upiše supabase/functions/_shared/pravila.ts
//          npm run build:pravila -- --check → pada ako se datoteka razlikuje od izvora (preflight)
//
// ZAŠTO GENERATOR: ista pravila čitaju DVA izvršitelja — preglednik (editor, učenje, zid) i MCP
// poslužitelj, kroz koji AI piše u nacrt. Ručna kopija u Deno-u bila bi druga istina koja tiho ostari
// (ADR-027, BUG-023): AI bi upisivao po jednom pravilu, a ekran mjerio po drugom. Uvoz iz `js/` u Deno
// ne ide — preglednikove datoteke su klasične skripte (`window.X`), a deploy pakira samo
// `supabase/functions/`. Kalup je `build:ugc-sql`.
//
// IZVORI (jedini; ovdje se ništa ne piše rukom):
//   • js/card-limits.js — SOFT/HARD i mjera kartice (mjeri se PODREZANA duljina); učita se cijeli.
//   • js/utils.js       — `const KURIRANE_BOJE = [...]` (paleta boja; ADR-031: svaka lekcija dobiva boju).
//   • js/fill-blanks.js — `function normFill(s) {...}` (kad se dva odgovora dopune smatraju istima).
// Oblik se u izvoru TRAŽI TOČNO JEDNOM; preoblikuješ li ga (npr. normFill u više redaka), generator
// PADA zatvoreno s porukom, umjesto da prepiše nešto drugo.
//
// Što NIJE ovdje: `schema/ugc-content.schema.json` (baza, pg_jsonschema) nosi svoj `maxLength` kartice;
// da je jednak HARD-u mjeri `tests/unit/pravila-izvor.test.js`.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IZLAZ = path.join(ROOT, 'supabase', 'functions', '_shared', 'pravila.ts');
const rel = (p) => path.relative(ROOT, p).replace(/\\/g, '/');

function procitaj(dat) { return fs.readFileSync(path.join(ROOT, dat), 'utf8').replace(/\r\n/g, '\n'); }

/** Izvadi jedini pogodak; nula ili više = pad (oblik izvora se promijenio). */
function jedini(src, re, sto, dat) {
  const nadjeno = [...src.matchAll(re)];
  if (nadjeno.length !== 1) {
    console.error('✗ build:pravila — ' + sto + ' u ' + dat + ': pogodaka ' + nadjeno.length + ' (treba točno 1)');
    process.exit(1);
  }
  return nadjeno[0];
}

// ── 1. mjera kartice: cijeli modul, shim-obrascem kao i ostali Node-potrošači ──
const win = {};
new Function('window', procitaj('js/card-limits.js'))(win);
const L = win.SokratCardLimits;
if (!L || !Number.isInteger(L.SOFT) || !Number.isInteger(L.HARD) || typeof L.measure !== 'function') {
  console.error('✗ build:pravila — js/card-limits.js ne izlaže SokratCardLimits { SOFT, HARD, measure }');
  process.exit(1);
}
const mjeraSrc = L.measure.toString();
const ZAGLAVLJE_MJERE = 'function measure(text) {';
if (!mjeraSrc.startsWith(ZAGLAVLJE_MJERE)) {
  console.error('✗ build:pravila — measure() u js/card-limits.js više ne počinje s `' + ZAGLAVLJE_MJERE + '`');
  process.exit(1);
}

// ── 2. kurirana paleta ──
const bojeSrc = jedini(procitaj('js/utils.js'), /^const KURIRANE_BOJE = (\[[^\]\n]*\]);$/gm, 'KURIRANE_BOJE', 'js/utils.js')[1];
const boje = JSON.parse(bojeSrc.replace(/'/g, '"'));
if (!boje.length || !boje.every((b) => /^#[0-9a-f]{6}$/.test(b))) {
  console.error('✗ build:pravila — KURIRANE_BOJE nisu sve oblika #rrggbb (mala slova)');
  process.exit(1);
}

// ── 3. usporedba odgovora dopune ──
const normTijelo = jedini(procitaj('js/fill-blanks.js'), /^function normFill\(s\) \{(.*)\}$/gm, 'normFill', 'js/fill-blanks.js')[1];

const tekst = [
  '// GENERIRANO — NE UREĐUJ RUČNO. Izvori: js/card-limits.js · js/utils.js (KURIRANE_BOJE) · js/fill-blanks.js (normFill).',
  '// Regeneriraj: npm run build:pravila · brana: npm run build:pravila -- --check (preflight). Zašto: scripts/build-pravila.js.',
  '',
  'const SOFT = ' + L.SOFT + ';',
  'const HARD = ' + L.HARD + ';',
  '',
  '/** Mekani prag kartice: iznad njega upozorenje, ne odbijanje. */',
  'export const KARTICA_SOFT = SOFT;',
  '/** Tvrdi strop kartice: točno ' + L.HARD + ' prolazi, ' + (L.HARD + 1) + ' ne. */',
  'export const KARTICA_HARD = HARD;',
  '',
  '/** Mjera jednog polja kartice (podrezana duljina), ista kao `SokratCardLimits.measure` u pregledniku. */',
  'export const mjeriKarticu = function measure(text: unknown) {' + mjeraSrc.slice(ZAGLAVLJE_MJERE.length) + ';',
  '',
  '/** Kurirana paleta boja (lekcije i materijali). */',
  'export const KURIRANE_BOJE: readonly string[] = Object.freeze(' + JSON.stringify(boje).replace(/"/g, "'").replace(/,/g, ', ') + ');',
  '',
  '/** Normalizacija odgovora dopune: dva odgovora su ista ako su im ovi oblici jednaki. */',
  'export function normFill(s: unknown): string {' + normTijelo + '}',
  ''
].join('\n');

if (process.argv.includes('--check')) {
  const sad = fs.existsSync(IZLAZ) ? fs.readFileSync(IZLAZ, 'utf8').replace(/\r\n/g, '\n') : null;
  if (sad !== tekst) {
    console.error('✗ ' + rel(IZLAZ) + (sad === null ? ' ne postoji' : ' ne odgovara izvorima') + ' — pokreni `npm run build:pravila`');
    process.exit(1);
  }
  console.log('✓ build:pravila — ' + rel(IZLAZ) + ' == izvori (SOFT ' + L.SOFT + ', HARD ' + L.HARD + ', boja ' + boje.length + ', normFill)');
} else {
  fs.writeFileSync(IZLAZ, tekst);
  console.log('✓ build:pravila — upisano u ' + rel(IZLAZ) + ' (SOFT ' + L.SOFT + ', HARD ' + L.HARD + ', boja ' + boje.length + ', normFill)');
}
