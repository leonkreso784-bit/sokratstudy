/* eslint-disable no-console */
// ===== BRANA: test:unit se NABRAJA SAM, i pada kad ništa nije izmjerio =====
// Pokreni: node tests/unit/test-unit-runner.test.js
//
// ZAŠTO POSTOJI: puni razlog stoji u zaglavlju `scripts/test-unit.js` (ADR-027 — obrazloženje
// živi uz kod koji ga provodi). Ukratko: ručno pisan lanac od 57 unosa u `package.json` bio je
// duplikat ispisa mape, a datoteka koja ispadne iz njega ne prijavljuje se kao crvena nego kao
// TIŠINA. Runner taj razred uklanja; ova brana pazi da ga ne vrati na mala vrata.
//
// ⚠️ NE SUDI PO TEKSTU RUNNERA, NEGO GA IZVODI. Šest tvrdnji spawna `scripts/test-unit.js`
// nad PODMETNUTOM mapom, jer bi tvrdnja „u izvoru piše process.exit(1)" prošla i nad kodom
// koji tu granu nikad ne dosegne (nalaz F2 iz revizije S1).
//
// ⚠️ DIO TVRDNJI POSTOJI ZBOG REVIZIJE KOJA JE OVU CIGLU VRATILA, i svaka zatvara zaobilazak
// koji je prolazio uz „11/11 zeleno":
//   · popis OTVORENOG za `test:unit` — `--mapa=<uska mapa>` je srezao doseg s 58 na 1 uz
//     EXIT 0, a brana se u toj vrtnji NIJE NI POKRENULA (popis zabranjenog nikad ne pokriva
//     sljedeći oblik napada; isti nalaz kao F1 u S1);
//   · `nabroji()` se zove BEZ argumenta — svih pet ranijih spawnova predavalo je `--mapa`,
//     pa preusmjeren `ZADANA_MAPA` nitko ne bi primijetio;
//   · `ci.yml` se sudi BEZ komentara i BEZ `if:` — stara tvrdnja bila je `String.match`, pa su
//     `# run: …` i `if: false` prolazili zeleno. To je doslovno S1 (CI je 12 vrtnji „zvao"
//     mjeru koja se nije izvodila), a taj nalaz citira zaglavlje ove iste datoteke.
//
// ⚠️ SAMA SEBE DOKAZUJE: ova datoteka leži u `tests/unit/`, pa ju runner mora nabrojati
// (tvrdnja 4). Ako nabrajanje ikad prestane raditi, ovaj se test neće ni pokrenuti.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const KORIJEN = path.join(__dirname, '..', '..');
const RUNNER = path.join(KORIJEN, 'scripts', 'test-unit.js');
const UNIT_DIR = path.join(KORIJEN, 'tests', 'unit');
const CI = path.join(KORIJEN, '.github', 'workflows', 'ci.yml');

// Točan oblik koji `package.json` smije imati. POPIS OTVORENOG, ne zabranjenog: svaki drugi
// oblik pada dok ga čovjek svjesno ne doda ovdje.
const DOPUSTEN_TEST_UNIT = 'node scripts/test-unit.js';

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  ✓ ' + name); }
  catch (e) { failed++; console.error('  ✗ ' + name + '\n      ' + e.message); }
}

console.log('\n=== test:unit runner (samonabrajanje) ===\n');

const { nabroji } = require(RUNNER);

/** Podmetni mapu sa zadanim sadržajem. Vrijednost `null` = PODMAPA, objekt = podmapa sa sadržajem. */
function mapaS(sadrzaj, korijen) {
  const dir = korijen || fs.mkdtempSync(path.join(os.tmpdir(), 'sokrat-test-unit-'));
  for (const [ime, v] of Object.entries(sadrzaj)) {
    const p = path.join(dir, ime);
    if (v === null) fs.mkdirSync(p);
    else if (typeof v === 'object') { fs.mkdirSync(p); mapaS(v, p); }
    else fs.writeFileSync(p, v, 'utf8');
  }
  return dir;
}

/** Izvedi runner nad mapom i vrati { status, stdout, stderr }. */
function vrtiRunner(mapa) {
  const r = spawnSync(process.execPath, [RUNNER, '--mapa=' + mapa], {
    cwd: KORIJEN, encoding: 'utf8', stdio: 'pipe',
  });
  return { status: r.status, stdout: r.stdout || '', stderr: r.stderr || '' };
}

/** Sve `*.test.js` pod `tests/unit` — NEZAVISNO od runnera, da usporedba nešto znači. */
function diskNezavisno(dir = UNIT_DIR, izlaz = []) {
  for (const u of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, u.name);
    if (u.name.endsWith('.test.js')) izlaz.push(p);
    else if (u.isDirectory()) diskNezavisno(p, izlaz);
  }
  return izlaz.sort();
}

const PROLAZI = 'process.exit(0);\n';
const PADA = 'process.exit(1);\n';

// ── 1 · POPIS OTVORENOG ZA test:unit ────────────────────────────────────────────────────
// ⚠️ OVA JE TVRDNJA PREPISANA NAKON REVIZIJE. Prva verzija je nabrajala ZABRANJENE oblike
// (ručno pisane `tests/unit/*.test.js` putanje), pa su kroz nju prolazili:
//   `… --mapa=tests/unit/podskup`  (doseg 58 → 1, EXIT 0, brana se NE pokrene)
//   `… || exit 0`  ·  `… ; exit 0`  (svaki pad progutan)
// Popis zabranjenog ne pokriva sljedeći izmišljeni oblik; popis otvorenog pokriva SVE.
test('package.json: test:unit je TOČNO dopušteni oblik (ništa drugo ne prolazi)', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(KORIJEN, 'package.json'), 'utf8'));
  const s = (pkg.scripts['test:unit'] || '').trim().replace(/\s+/g, ' ');
  if (s !== DOPUSTEN_TEST_UNIT) {
    throw new Error('test:unit mora biti točno "' + DOPUSTEN_TEST_UNIT + '", a jest: "' + s + '"');
  }
});

// ── 2 · ODSTRANJIVAČ KOMENTARA NE SMIJE JESTI KOD ───────────────────────────────────────
/**
 * Izbaci retke koji su KOMENTAR, i vrati samo kod.
 *
 * ⚠️ IDE PO RETKU, A NE REGEXOM ZA BLOKOVE — i to je izmjereno, nije stvar ukusa. Prva
 * verzija ove brane brisala je najprije blok-komentare pa tek retke-komentare. Ali zaglavlje
 * runnera u OBIČNOM retku-komentaru doslovno sadrži `tests/unit/` + zvjezdicu + `.test.js`,
 * i ta kosa crta sa zvjezdicom otvorila je PRIVIDNI blok-komentar koji se zatvorio tek na
 * kraju prvog JSDoc-a 53 retka niže. Sve između je nestalo — uključujući pravi kod.
 * Posljedica: mutacija koja u runner ubaci zakucanu putanju prošla je ZELENO, dakle brana je
 * tvrdila „nema zakucanih putanja" nad tekstom koji je sama obrisala. Nađeno mutacijom, ne
 * čitanjem. Isti oblik postoji u `scripts/ci-tajne.js` i `tests/unit/axe-gate-usage.test.js`
 * — ondje je danas latentan, i zaveden je kao zaseban zahvat.
 */
function samoKod(src) {
  return src.split('\n').filter((r) => {
    const t = r.trim();
    return !(t.startsWith('//') || t.startsWith('*') || t.startsWith('/*'));
  }).join('\n');
}

test('samoKod() ne pojede kod iza retka-komentara koji sadrži otvarač bloka', () => {
  const uzorak = [
    '// vidi tests/unit/' + '*' + '.test.js',
    "const A = 'tests/unit/podmetnuto.test.js';",
    ' */',
  ].join('\n');
  if (!/podmetnuto\.test\.js/.test(samoKod(uzorak))) {
    throw new Error('odstranjivač komentara je pojeo kod — brana bi sudila praznom tekstu');
  }
});

// ── 3 · RUNNER ČITA DISK, NE POPIS ──────────────────────────────────────────────────────
test('scripts/test-unit.js nema nijednu zakucanu tests/unit/*.test.js putanju', () => {
  const zakucane = samoKod(fs.readFileSync(RUNNER, 'utf8')).match(/tests\/unit\/[\w.-]+\.test\.js/g) || [];
  if (zakucane.length) {
    throw new Error('runner zakucava putanje: ' + zakucane.join(', '));
  }
});

// ── 4 · ZADANA MAPA GAĐA PRAVU MAPU ─────────────────────────────────────────────────────
// ⚠️ ZOVE SE BEZ ARGUMENTA, namjerno. Svaki drugi poziv u ovoj brani predaje `--mapa`, pa bi
// preusmjeren `ZADANA_MAPA` (jedan redak u runneru) prošao neprimijećeno — runner bi mjerio
// praznu ili usku mapu, a sve ostale tvrdnje ostale bi zelene.
test('nabroji() BEZ argumenta = tests/unit s diska — uključujući OVU datoteku', () => {
  const iz = nabroji();
  const nezavisno = diskNezavisno();
  if (iz.length !== nezavisno.length) {
    throw new Error('nabroji() dao ' + iz.length + ', a na disku ih je ' + nezavisno.length);
  }
  if (iz.join('|') !== nezavisno.join('|')) throw new Error('nabroji() i disk se ne slažu po sadržaju');
  if (!iz.includes(__filename)) throw new Error('nabrajanje ne vidi vlastitu branu');
});

test('nabroji() filtrira: uzima SAMO *.test.js, abecedno', () => {
  const dir = mapaS({
    'b.test.js': PROLAZI, 'a.test.js': PROLAZI,
    'helper.js': PROLAZI, 'biljeska.txt': 'x', 'c.spec.js': PROLAZI,
  });
  const imena = nabroji(dir).map((p) => path.basename(p));
  if (imena.join(',') !== 'a.test.js,b.test.js') {
    throw new Error('očekivano "a.test.js,b.test.js", dobiveno "' + imena.join(',') + '"');
  }
});

// ── 5 · PODMAPA NIJE TIŠINA ─────────────────────────────────────────────────────────────
// ⚠️ Dodano nakon revizije. Ravno nabrajanje je činilo `tests/unit/mcp/x.test.js` NEVIDLJIVIM,
// a brojač je svejedno pisao pun `N/N` — isti razred greške zbog kojeg cigla postoji, samo
// jednu razinu niže. Dvije tvrdnje: da ga NABRAJANJE vidi, i da se STVARNO IZVEDE.
test('nabroji() ulazi u podmape', () => {
  const dir = mapaS({ 'a.test.js': PROLAZI, mcp: { 'b.test.js': PROLAZI } });
  const imena = nabroji(dir).map((p) => path.basename(p)).sort();
  if (imena.join(',') !== 'a.test.js,b.test.js') {
    throw new Error('podmapa nevidljiva: dobiveno "' + imena.join(',') + '"');
  }
});

test('ugniježđeni test se STVARNO izvede (pad u podmapi obara vrtnju)', () => {
  const r = vrtiRunner(mapaS({ 'a.test.js': PROLAZI, mcp: { 'pao.test.js': PADA } }));
  if (r.status === 0) throw new Error('pad u podmapi prošao ZELENO (exit 0)');
  if (!/pao\.test\.js/.test(r.stderr)) {
    throw new Error('pao, ali nije imenovao datoteku iz podmape. stderr: ' + r.stderr.slice(0, 200));
  }
  if (!/dotaknuto 2\/2/.test(r.stdout)) {
    throw new Error('doseg ne broji ugniježđenu datoteku. stdout: ' + r.stdout.slice(-200));
  }
});

// ── 6 · NULA DATOTEKA = PAD ─────────────────────────────────────────────────────────────
test('prazna mapa: runner PADA i imenuje uzrok (ne tiho zeleno)', () => {
  const r = vrtiRunner(mapaS({}));
  if (r.status === 0) throw new Error('prazna mapa prošla ZELENO (exit 0) — brana ne drži');
  if (!/nijedna \*\.test\.js/.test(r.stderr)) {
    throw new Error('pao, ali bez imenovanog uzroka. stderr: ' + r.stderr.slice(0, 200));
  }
});

// ⚠️ TRAŽI I PORUKU, ne samo izlazni kod. Neuhvaćena iznimka također daje EXIT 1, pa bi
// tvrdnja samo na broju prolazila i da `try/catch` u runneru uopće ne postoji — mjerila bi
// „nešto je puklo", a tvrdi „pada ZATVORENO", tj. uredno i s razlogom. (Nalaz revizije.)
test('nepostojeća mapa: runner PADA zatvoreno, s imenovanim uzrokom', () => {
  const r = vrtiRunner(path.join(os.tmpdir(), 'sokrat-ne-postoji-' + Date.now()));
  if (r.status === 0) throw new Error('nepostojeća mapa prošla ZELENO (exit 0)');
  if (!/mapa se ne da pročitati/.test(r.stderr)) {
    throw new Error('pao, ali nije uredno — nema imenovanog uzroka. stderr: ' + r.stderr.slice(0, 200));
  }
});

// ── 7 · ISHOD SE PRENOSI, I DOSEG SE ISPISUJE ───────────────────────────────────────────
test('jedan pali test → runner PADA i imenuje palu datoteku', () => {
  const r = vrtiRunner(mapaS({ 'ok.test.js': PROLAZI, 'pao.test.js': PADA }));
  if (r.status === 0) throw new Error('pali test prošao ZELENO (exit 0)');
  if (!/pao\.test\.js/.test(r.stderr)) {
    throw new Error('pao, ali nije imenovao koju datoteku. stderr: ' + r.stderr.slice(0, 200));
  }
});

// ⚠️ Tvrdnja o BROJU mora biti DOSEŽNA. Prva verzija runnera brojač je povećavala u svakoj
// iteraciji, pa uvjet „izvedeno != nabrojano" nije mogao puknuti nikad. Mapa nazvana
// `*.test.js` se zato NABRAJA (ime se sudi prije vrste) pa padne kao „nije datoteka".
test('nabrojano 2, izvedeno 1 → runner PADA na nepotpunoj vrtnji', () => {
  const r = vrtiRunner(mapaS({ 'ok.test.js': PROLAZI, 'zla.test.js': null }));
  if (r.status === 0) throw new Error('nepotpuna vrtnja prošla ZELENO (exit 0)');
  if (!/izvedeno 1, a nabrojano 2/.test(r.stderr)) {
    throw new Error('pao, ali nije imenovao nesrazmjer. stderr: ' + r.stderr.slice(0, 200));
  }
});

test('svi prolaze → exit 0, i ISPISAN je doseg (dotaknuto N/N)', () => {
  const r = vrtiRunner(mapaS({ 'a.test.js': PROLAZI, 'b.test.js': PROLAZI }));
  if (r.status !== 0) {
    throw new Error('zelena mapa pala (exit ' + r.status + '). stderr: ' + r.stderr.slice(0, 200));
  }
  if (!/dotaknuto 2\/2 datoteka/.test(r.stdout)) {
    throw new Error('runner nije ispisao koliko je dotaknuo. stdout: ' + r.stdout.slice(-200));
  }
});

// ── 8 · RUNNER NIJE MRTAV KOD — I TO SE NE MJERI TEKSTOM ────────────────────────────────
// ⚠️ PREPISANO NAKON REVIZIJE. Stara tvrdnja je bila `String.match` nad `ci.yml`, pa su i
// `# run: npm run test:unit` i `if: false` prolazili ZELENO. Naslov je obećavao dosežnost,
// mjera je gledala tekst — doslovno kvar koji je S1 zatvarao (CI je 12 vrtnji „zvao" mjeru
// koja se nije izvodila). Sad se komentari odbacuju, traži se POLOŽAJ koraka, i sudi se
// da korak nema `if:` te da roll-up `gate` ovisi o njegovu jobu.
const ciRedci = fs.readFileSync(CI, 'utf8').split('\n').filter((r) => !r.trim().startsWith('#'));

test('ci.yml: korak `npm run test:unit` postoji, nije zakomentiran i NEMA `if:`', () => {
  const i = ciRedci.findIndex((r) => /^\s*run:\s*npm run test:unit\s*$/.test(r));
  if (i === -1) throw new Error('nema nezakomentiranog koraka koji vrti `npm run test:unit`');

  // Granice koraka: od njegovog `- ` do sljedećeg `- ` na istoj uvlaci.
  let poc = i;
  while (poc > 0 && !/^\s*-\s/.test(ciRedci[poc])) poc--;
  let kraj = i + 1;
  while (kraj < ciRedci.length && !/^\s*-\s/.test(ciRedci[kraj]) && ciRedci[kraj].trim() !== '') kraj++;

  const blok = ciRedci.slice(poc, kraj);
  const uvjet = blok.find((r) => /^\s*if:/.test(r));
  if (uvjet) throw new Error('korak je uvjetovan — smije se preskočiti: ' + uvjet.trim());
});

test('ci.yml: job koji vrti test:unit je u `needs` roll-up `gate` joba', () => {
  const i = ciRedci.findIndex((r) => /^\s*run:\s*npm run test:unit\s*$/.test(r));
  if (i === -1) throw new Error('korak nije nađen (vidi prethodnu tvrdnju)');

  let job = null;
  for (let k = i; k >= 0; k--) {
    const m = ciRedci[k].match(/^ {2}([A-Za-z0-9_-]+):\s*$/);
    if (m) { job = m[1]; break; }
  }
  if (!job) throw new Error('ne mogu odrediti kojem jobu korak pripada');

  const g = ciRedci.findIndex((r) => /^ {2}gate:\s*$/.test(r));
  if (g === -1) throw new Error('nema roll-up joba `gate`');
  const needs = ciRedci.slice(g, g + 12).find((r) => /^\s*needs:/.test(r));
  if (!needs) throw new Error('`gate` nema `needs`');
  if (!new RegExp('\\b' + job + '\\b').test(needs)) {
    throw new Error('`gate` ne ovisi o jobu `' + job + '` koji vrti test:unit: ' + needs.trim());
  }
});

test('preflight zove test:unit i ne guta mu pad', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(KORIJEN, 'package.json'), 'utf8'));
  const p = pkg.scripts.preflight || '';
  if (!/(^|&&)\s*npm run test:unit\s*$/.test(p.replace(/\s+/g, ' '))) {
    throw new Error('preflight ne završava člankom `npm run test:unit`: ' + p.slice(-80));
  }
  const gutaci = p.match(/\|\|\s*(true|exit 0)|;\s*exit 0/g) || [];
  if (gutaci.length) throw new Error('preflight guta padove: ' + gutaci.join(', '));
});

// ── 9 · BRANA TVRDI VLASTITI BROJ TVRDNJI ───────────────────────────────────────────────
// ⚠️ Obrisana tvrdnja je TIŠINA — mini-inačica razreda koji cigla zatvara. Čegrtaljka:
// broj se smije mijenjati samo svjesno, zajedno s ovim retkom.
const OCEKIVANO_TVRDNJI = 15;
if (passed + failed !== OCEKIVANO_TVRDNJI) {
  failed++;
  console.error('  ✗ brana ima ' + (passed + failed - 1) + ' tvrdnji, a očekuje se ' +
    OCEKIVANO_TVRDNJI + ' — tvrdnja je dodana ili obrisana bez odluke');
}

console.log('\n' + passed + ' prošlo, ' + failed + ' palo\n');
process.exit(failed ? 1 : 0);
