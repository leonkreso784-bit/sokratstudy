/* eslint-disable no-console */
// ===== S1 GATE — CI STVARNO VRTI JEDINU MJERU ŽICE =====
// Pokreni: node tests/unit/ci-tajne.test.js
//
// ── ZAŠTO POSTOJI ───────────────────────────────────────────────────────────────────────
// `tests/profile-jezik.authed.spec.js` ③ je jedina tvrdnja koja mjeri ŽICU: da tijelo
// `PUT /auth/v1/user` stvarno nosi `current_password`. Zakucani `supabase-js@2.110.8` to polje
// NE spominje — prolazi samo zato što `updateUser` cijeli objekt pošalje kao tijelo. SDK koji
// sutra počne filtrirati nepoznata polja tiho otključava bravu iz ①/2b.
//
// ⚠️ IZMJERENO 2026-09-24 i gore je od zapisanog. Zapis je tvrdio da se ta tvrdnja preskače
// jer joj CI ne prosljeđuje `STAGING_TEST_ADMIN_PASSWORD`. Mjera preko GitHub API-ja pokazala
// je da korak „Run authenticated suite" traje **0 sekundi u zadnjih 12 vrtnji** (`e23d658` …
// `921cfbc`): bio je napisan kao „ako je `TEST_ADMIN_EMAIL` prazan → exit 0", a taj secret
// nikad nije postavljen. Dakle nije se preskakala JEDNA tvrdnja nego **cijeli authed suite —
// 34 datoteke, ni na jednom commitu.** Svaka vrtnja pritom potroši 25 s na Chromium pa ga ne
// upotrijebi. Zeleno je značilo „ništa nisam izmjerio", a to se ne razlikuje od „sve je dobro".
//
// ⚠️ ZAŠTO JE OVO UNIT-BRANA, A NE „PAZIT ĆEMO". Prethodna zaštita bila je KOMENTAR u ci.yml-u
// koji opisuje mehanizam koji nikad nije proradio, i rečenica u TESTING.md („Za aktivaciju:
// dodaj ta dva repo-secreta") koja je stajala neispunjena 2,5 mjeseca. Rečenica u dokumentu ne
// sprječava ništa (ADR-027, BUG-023) — `if` u kodu ili test sprječavaju.
//
// ⚠️ NIJEDAN POPIS OVDJE NIJE PISAN RUKOM. Imena tajni dolaze iz `scripts/ci-tajne.js`, koji ih
// ČITA S DISKA iz `tests/**` + `playwright.config.js`; popis jobova koje roll-up mora pokrivati
// čita se iz same `ci.yml`. Ručni popis stari u OBA smjera, pa se sudi i propušteni i MRTAV unos.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync, spawnSync } = require('child_process');

const tajne = require('../../scripts/ci-tajne.js');

const KORIJEN = path.join(__dirname, '..', '..');
const TESTS_DIR = path.join(KORIJEN, 'tests');
const CI_PUT = path.join(KORIJEN, '.github', 'workflows', 'ci.yml');
const HOOK_PUT = path.join(KORIJEN, '.githooks', 'pre-push');
const SKRIPTA = path.join(KORIJEN, 'scripts', 'ci-tajne.js');

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  ✓ ' + name); }
  catch (e) { failed++; console.error('  ✗ ' + name + '\n      ' + e.message); }
}

console.log('\n=== S1 — CI vrti mjeru žice (ci-tajne) ===\n');

// ── čitanje ci.yml ──────────────────────────────────────────────────────────────────────
// ⚠️ KOMENTARI SE ODSTRANJUJU PRIJE SVAKE PRETRAGE. Bez toga bi ova brana pala na VLASTITOM
// komentaru u ci.yml-u, koji stari obrazac (`exit 0`) citira da bi objasnio zašto ga nema —
// isti razred greške koji je `axe-gate-usage.test.js` platio na prvom pokretanju.
// Odstranjuju se samo PUNI redovi komentara (prvi neprazni znak je `#`), da `#` unutar
// navodnika ostane netaknut.
const ciSirovo = fs.readFileSync(CI_PUT, 'utf8');
const ciRedci = ciSirovo.split(/\r?\n/);
const ciKod = ciRedci.filter((l) => !/^\s*#/.test(l)).join('\n');

/**
 * Imena jobova = ključevi na uvlaci 2 ispod `jobs:`. Pada zatvoreno ako `jobs:` nema.
 * ⚠️ NALAZ REVIZIJE 24.09.: prva verzija je tražila `^ {2}([a-z][a-z0-9_-]*):\s*$` — dakle
 * gubila je LEGALNA imena jobova (`Budget:` s velikim slovom, `_budget:` s podcrtom,
 * `budget: # komentar` s repom). Takav job bio bi NEVIDLJIV: ne bi bio u `needs` roll-upa,
 * njegov pad ne bi obojio Gate, a brana bi ostala zelena. `if (!imena.length)` hvata samo
 * potpuni slom čitača, ne DJELOMIČAN — a djelomičan je gori, jer izgleda kao da radi.
 * Zato uz širi raspon ide i KONTROLA DOSEGA: broj prepoznatih jobova mora se poklapati s
 * brojem `runs-on:` blokova. Oblik koji ne znam suditi je PAD, ne preskok.
 */
function joboviIzCija() {
  if (!/^jobs:\s*$/m.test(ciKod)) throw new Error('ci.yml: nema `jobs:` — brana ne zna što mjeri');
  const imena = [];
  let uJobs = false;
  for (const l of ciKod.split('\n')) {
    if (/^jobs:\s*$/.test(l)) { uJobs = true; continue; }
    if (!uJobs) continue;
    if (/^\S/.test(l)) break;                       // izašli iz `jobs:` bloka
    const m = l.match(/^ {2}([A-Za-z_][A-Za-z0-9_-]*):\s*(#.*)?$/);
    if (m) imena.push(m[1]);
  }
  if (!imena.length) throw new Error('ci.yml: nijedan job nije prepoznat — parser ili datoteka su se razišli');

  const runsOn = (ciKod.match(/^ {4}runs-on:/gm) || []).length;
  if (imena.length !== runsOn) {
    throw new Error(
      'ci.yml: prepoznato ' + imena.length + ' jobova (' + imena.join(', ') + '), a `runs-on:` blokova je ' +
      runsOn + '.\n      → čitač i datoteka su se razišli: job kojeg ne prepoznam bio bi NEVIDLJIV roll-upu. ' +
      'Popravi čitač, ne datoteku.'
    );
  }
  return imena;
}

/** Blok jednog joba: od njegovog ključa do sljedećeg ključa na uvlaci 2. Pada ako joba nema. */
function blokJoba(ime) {
  const redci = ciKod.split('\n');
  const start = redci.findIndex((l) => new RegExp('^ {2}' + ime + ':\\s*$').test(l));
  if (start < 0) throw new Error('ci.yml: job `' + ime + '` ne postoji');
  let end = redci.length;
  for (let i = start + 1; i < redci.length; i++) {
    if (/^\S/.test(redci[i]) || /^ {2}[a-z][a-z0-9_-]*:\s*$/.test(redci[i])) { end = i; break; }
  }
  return redci.slice(start, end).join('\n');
}

/**
 * Koraci jednog joba, razrezani na `- name:` (uvlaka 6).
 * ⚠️ ZAŠTO PO KORAKU, A NE PO JOBU — ovo je nalaz MUTACIJE M1, i bila je prava rupa.
 * `authed` ima DVA koraka koja prosljeđuju tajne (provjera i sam suite). Dok se sudilo nad
 * cijelim blokom joba, uklanjanje tajne iz koraka koji vrti suite prošlo je ZELENO: ime je
 * još stajalo u drugom koraku. Dakle brana je tvrdila „tajna je proslijeđena", a mjerila je
 * samo „ime se negdje u jobu pojavljuje" — točno razred greške zbog kojeg S1 postoji.
 */
function korakoviJoba(blok) {
  const redci = blok.split('\n');
  const koraci = [];
  let tekuci = null;
  for (const l of redci) {
    if (/^ {6}- /.test(l)) {
      if (tekuci) koraci.push(tekuci.join('\n'));
      tekuci = [l];
    } else if (tekuci) {
      tekuci.push(l);
    }
  }
  if (tekuci) koraci.push(tekuci.join('\n'));
  if (!koraci.length) throw new Error('ci.yml: nijedan korak nije prepoznat — parser i datoteka su se razišli');
  return koraci;
}

const JOBOVI = joboviIzCija();
const BLOK_AUTHED = blokJoba('authed');
const KORACI_AUTHED = korakoviJoba(BLOK_AUTHED);

/** Korak koji izvodi zadanu naredbu. Pada zatvoreno ako ga nema — inače bi tvrdnja mjerila prazno. */
function korakKojiVrti(uzorak, opis) {
  const nadeni = KORACI_AUTHED.filter((k) => uzorak.test(k));
  if (nadeni.length !== 1) {
    throw new Error('u authed jobu ima ' + nadeni.length + ' koraka koji vrte ' + opis + ' (treba točno 1)');
  }
  return nadeni[0];
}

// ── ① popis se stvarno nabraja, i nije prazan ───────────────────────────────────────────
test('nabrajanje s diska nešto nađe (brana ne smije proći na nuli)', () => {
  const n = tajne.nabrojiIzTestova().size;
  if (n < 5) throw new Error('nađeno samo ' + n + ' imena — nabrajanje je puklo, a ne da tajni nema');
  if (!tajne.OBAVEZNE.length) throw new Error('OBAVEZNE je prazan → `--zahtijevaj` ne bi tražio ništa');
});

test('svako ime koje testovi traže je SVRSTANO (nova tajna je vidljiva)', () => {
  const n = tajne.nesvrstane();
  if (n.length) {
    throw new Error(
      'nesvrstane tajne: ' + n.join(', ') + '\n      → dodaj ih u OBAVEZNE (CI ih mora imati), ' +
      'IMENOVANE_IZNIMKE (svjesno ih nema, uz razlog I cijenu) ili NISU_TAJNE u scripts/ci-tajne.js'
    );
  }
});

test('nijedan svrstani unos nije MRTAV (popis ne stari u drugom smjeru)', () => {
  const m = tajne.mrtve();
  if (m.length) throw new Error('svrstano ali ih nitko ne traži: ' + m.join(', '));
});

test('svaka imenovana iznimka nosi RAZLOG i CIJENU', () => {
  for (const [ime, o] of Object.entries(tajne.IMENOVANE_IZNIMKE)) {
    if (!o || !o.zasto || o.zasto.length < 20) throw new Error(ime + ': nema napisan razlog');
    if (!o.cijena || o.cijena.length < 8) throw new Error(ime + ': nema napisanu cijenu (što se preskače)');
  }
});

// ── ② ci.yml prosljeđuje TOČNO ono što testovi traže ────────────────────────────────────
/** Sve `IME: ${{ secrets.X }}` veze u zadanom bloku. */
function proslijedene(blok) {
  const parovi = [...blok.matchAll(/([A-Z][A-Z_0-9]*):\s*\$\{\{\s*secrets\.([A-Z][A-Z_0-9]*)\s*\}\}/g)];
  return parovi.map(([, env, secret]) => ({ env, secret }));
}

// ⚠️ SUDI SE PO KORAKU (nalaz mutacije M1). Oba koraka koja trebaju tajne moraju imati SVE
// četiri: provjera bez njih ne može presuditi, a suite bez njih tiho preskače specove.
const KRITICNI_KORACI = [
  { korak: () => korakKojiVrti(/ci-tajne\.js\s+--zahtijevaj/, '`--zahtijevaj`'), opis: 'provjera tajni' },
  { korak: () => korakKojiVrti(/npm run test:authed/, '`npm run test:authed`'), opis: 'authed suite' },
];

for (const { korak, opis } of KRITICNI_KORACI) {
  test('korak „' + opis + '" prosljeđuje SVE obavezne tajne (nijedna ne fali)', () => {
    const imena = new Set(proslijedene(korak()).map((p) => p.env));
    const fale = tajne.OBAVEZNE.filter((t) => !imena.has(t));
    if (fale.length) {
      throw new Error(
        'korak „' + opis + '" ne prosljeđuje: ' + fale.join(', ') +
        '\n      → spec koji ih traži bi se u CI-ju TIHO PRESKOČIO (to je S1)'
      );
    }
  });

  test('korak „' + opis + '" ne prosljeđuje NIŠTA VIŠE (mrtav secret ničemu ne služi)', () => {
    const dopusteno = new Set(tajne.OBAVEZNE);
    const viska = [...new Set(proslijedene(korak()).map((p) => p.env))].filter((i) => !dopusteno.has(i));
    if (viska.length) throw new Error('prosljeđuje se a nije obavezno: ' + viska.join(', '));
  });
}

test('ime varijable i ime secreta se PODUDARAJU (ne šalje se kriva tajna u pravo polje)', () => {
  const parovi = proslijedene(BLOK_AUTHED);
  if (!parovi.length) throw new Error('nijedna `IME: ${{ secrets.X }}` veza nije nađena — tvrdnja bi prošla na nuli');
  for (const { env, secret } of parovi) {
    if (env !== secret) throw new Error(env + ' dobiva secrets.' + secret + ' — različita imena');
  }
});

// ── F1: POPIS OTVORENOG, NE POPIS ZABRANJENOG ───────────────────────────────────────────
// ⚠️ NALAZ REVIZIJE 24.09., i bio je u pravu. Prva verzija zabranjivala je JEDAN oblik
// (`exit 0`) — dakle popis zabranjenog od jedne stavke. Tri jednoredne izmjene vraćale su
// točno onaj kvar zbog kojeg cigla postoji, uz branu 22/22 ZELENU:
//    continue-on-error: true   → suite padne, korak „uspije", job success
//    run: npm run test:authed || true
//    if: ${{ false }}          → korak skipped, job success, trajanje 0 s (doslovno povod)
// Popis zabranjenog stari čim netko smisli četvrti oblik; popis OTVORENOG pada po defaultu,
// pa svaki budući ključ mora proći kroz čovjeka. Isti obrazac kao `OTVORENO` u mcp-brava-check.
const DOPUSTENI_KLJUCEVI = new Set(['name', 'uses', 'with', 'env', 'run', 'if']);

/** Ključevi jednog koraka (uvlaka 8, plus prvi koji stoji odmah iza `- `). */
function kljuceviKoraka(korak) {
  const kljucevi = [];
  for (const l of korak.split('\n')) {
    let m = l.match(/^ {6}- ([a-zA-Z][a-zA-Z0-9_-]*):/);
    if (m) { kljucevi.push(m[1]); continue; }
    m = l.match(/^ {8}([a-zA-Z][a-zA-Z0-9_-]*):/);
    if (m) kljucevi.push(m[1]);
  }
  return kljucevi;
}

test('svaki korak `authed` joba koristi SAMO dopuštene ključeve (popis otvorenog)', () => {
  if (KORACI_AUTHED.length < 2) throw new Error('prepoznato ' + KORACI_AUTHED.length + ' koraka — parser je pukao');
  for (const korak of KORACI_AUTHED) {
    const ime = (korak.match(/- name:\s*(.+)/) || [, '(bez imena)'])[1].trim();
    for (const k of kljuceviKoraka(korak)) {
      if (!DOPUSTENI_KLJUCEVI.has(k)) {
        throw new Error(
          'korak „' + ime + '" ima ključ `' + k + '`, koji nije na popisu otvorenog.\n' +
          '      → `continue-on-error` i slični čine da korak „uspije" iako ništa nije izmjereno.\n' +
          '      → ako je namjeran, dodaj ga u DOPUSTENI_KLJUCEVI uz napisan razlog.'
        );
      }
    }
  }
});

test('`if:` na koraku smije biti SAMO `failure()` (inače se korak da ugasiti)', () => {
  let vidjenih = 0;
  for (const korak of KORACI_AUTHED) {
    const m = korak.match(/^\s*if:\s*(.+)$/m);
    if (!m) continue;
    vidjenih++;
    const vrijednost = m[1].trim();
    if (vrijednost !== 'failure()') {
      const ime = (korak.match(/- name:\s*(.+)/) || [, '(bez imena)'])[1].trim();
      throw new Error(
        'korak „' + ime + '" ima `if: ' + vrijednost + '` — uvjet koji na `push` nije istinit ostavlja ' +
        'korak `skipped`, job `success` i trajanje 0 s. To je DOSLOVNO kvar zbog kojeg cigla postoji.'
      );
    }
  }
  if (!vidjenih) throw new Error('nijedan `if:` nije nađen — tvrdnja bi prošla na nuli (očekuje se onaj na uploadu artefakata)');
});

test('kritični koraci ne neutraliziraju izlazni kod (`|| true` i rodbina)', () => {
  const NEUTRALIZATORI = /(\|\|\s*(true|:|exit\s+0)|;\s*true\s*$|\|\|\s*echo)/;
  for (const { korak, opis } of KRITICNI_KORACI) {
    const redci = korak().split('\n').filter((l) => /^\s*run:/.test(l) || /^ {10}\S/.test(l));
    if (!redci.length) throw new Error('korak „' + opis + '" nema nijedan `run` redak — tvrdnja bi prošla na nuli');
    for (const l of redci) {
      if (NEUTRALIZATORI.test(l)) {
        throw new Error('korak „' + opis + '" neutralizira izlazni kod: ' + l.trim());
      }
    }
  }
});

test('authed job više NE PRESKAČE tiho (nema `exit 0` grane)', () => {
  if (/\bexit\s+0\b/.test(BLOK_AUTHED)) {
    throw new Error('u authed jobu opet stoji `exit 0` — to je točno ponašanje koje je dalo 12 praznih zelenih vrtnji');
  }
});

test('authed job PRVO izvede provjeru tajni (`ci-tajne.js --zahtijevaj`)', () => {
  if (!/scripts\/ci-tajne\.js\s+--zahtijevaj/.test(BLOK_AUTHED)) {
    throw new Error('authed job ne poziva `node scripts/ci-tajne.js --zahtijevaj` → prazna tajna bi opet prošla tiho');
  }
  const iProvjera = BLOK_AUTHED.indexOf('--zahtijevaj');
  const iSuite = BLOK_AUTHED.indexOf('npm run test:authed');
  if (iSuite < 0) throw new Error('authed job ne vrti `npm run test:authed`');
  if (iProvjera > iSuite) throw new Error('provjera tajni stoji IZA suite-a → suite bi krenuo pa se raspao usred');
});

// ── ③ roll-up pokriva SVE jobove, i to se čita iz ci.yml ────────────────────────────────
const BLOK_GATE = blokJoba('gate');

test('roll-up `gate` job postoji i nabraja SVE ostale jobove', () => {
  const m = BLOK_GATE.match(/needs:\s*\[([^\]]*)\]/);
  if (!m) throw new Error('gate job nema `needs: [...]`');
  const nabrojani = new Set(m[1].split(',').map((s) => s.trim()).filter(Boolean));
  const ocekivani = JOBOVI.filter((j) => j !== 'gate');
  const fale = ocekivani.filter((j) => !nabrojani.has(j));
  if (fale.length) {
    throw new Error(
      'gate ne pokriva jobove: ' + fale.join(', ') +
      '\n      → njihov pad ne bi obojio required-provjeru. Popis se čita iz ci.yml, ' +
      'pa novi job MORA biti dodan i u `needs`.'
    );
  }
  const viska = [...nabrojani].filter((j) => !ocekivani.includes(j));
  if (viska.length) throw new Error('gate nabraja job koji ne postoji: ' + viska.join(', '));
});

// ── F3: DVOSMJERNO UPARIVANJE, NE PREFIKS ───────────────────────────────────────────────
// ⚠️ NALAZ REVIZIJE 24.09. Prva verzija tražila je podniz `"<job>:$R_` — dakle vezala je ime
// joba na BILO KOJU varijablu koja počinje s `R_`. Mutacija `"authed:$R_BUILD"` prolazila je
// ZELENO: pad authed suite-a postao bi Gateu nevidljiv, a ispis bi i dalje uredno pisao
// „authed: …". To je klasična greška kopiranja retka pri dodavanju četvrtog joba.
test('gate SUDI ishod svakog joba, i to kroz NJEGOVU varijablu (ne bilo koju)', () => {
  const mapa = new Map(); // R_X → job
  for (const m of BLOK_GATE.matchAll(/^\s*(R_[A-Z_0-9]+):\s*\$\{\{\s*needs\.([a-zA-Z_][a-zA-Z0-9_-]*)\.result\s*\}\}/gm)) {
    mapa.set(m[1], m[2]);
  }
  const ocekivani = JOBOVI.filter((j) => j !== 'gate');
  if (mapa.size !== ocekivani.length) {
    throw new Error('gate veže ' + mapa.size + ' varijabli na `needs.*.result`, a jobova ima ' + ocekivani.length);
  }
  for (const job of ocekivani) {
    const varijabla = [...mapa.entries()].find(([, j]) => j === job);
    if (!varijabla) throw new Error('gate ne čita `needs.' + job + '.result` → taj job ne utječe na presudu');
    const par = '"' + job + ':$' + varijabla[0] + '"';
    if (!BLOK_GATE.includes(par)) {
      throw new Error(
        'gate provlači `' + job + '` kroz presudu, ali NE kroz ' + varijabla[0] + ' (očekivano ' + par + ').\n' +
        '      → ime joba vezano na tuđu varijablu znači da njegov pad Gate NE VIDI.'
      );
    }
  }
});

test('gate ima `if: always()` (inače se na padu SAM preskoči i required-provjera visi)', () => {
  if (!/^\s*if:\s*always\(\)\s*$/m.test(BLOK_GATE)) {
    throw new Error('gate nema `if: always()` → na padu ovisnosti bi bio `skipped`, a to u GitHubu blokira PR kao „pending"');
  }
});

test('gate sudi na `!= success` (cancelled/skipped nisu prošli)', () => {
  if (!/!=\s*"?success/.test(BLOK_GATE)) {
    throw new Error('gate ne sudi na `!= success` → `cancelled`/`skipped` bi prošli kao uspjeh');
  }
});

// ── F2: PRESUDA ROLL-UPA SE IZVODI, NE ČITA ─────────────────────────────────────────────
// ⚠️ NALAZ REVIZIJE 24.09., i najskuplji propust cigle. Gornja tvrdnja mjeri da u bloku PIŠE
// `!= success`, a ne da blok PRESUĐUJE. Dvije mutacije prolazile su ZELENO:
//   • obriši `exit 1` na kraju → Gate NIKAD ne može pocrvenjeti, a `::error` anotacija i
//     dalje izgleda uvjerljivo;
//   • dodaj `exit 0` odmah iza prvog `echo` → isto (tvrdnja o `exit 0` gleda samo authed blok).
// Blok sam PUSTIO kroz `sh` sa 7 kombinacija dok sam ciglu gradio — ali to je bila JEDNOKRATNA
// mjera, a ne brana. Ovo je njezina najjeftinija pretvorba u stalnu: izvodi se isti blok, iz
// iste datoteke, na svakom `test:unit`.
test('gate presuda se STVARNO IZVODI i pada na svakom ishodu osim uspjeha', () => {
  const m = BLOK_GATE.match(/^(\s*)run:\s*\|\s*$/m);
  if (!m) throw new Error('gate nema `run: |` blok — nema što izvesti');
  const redci = BLOK_GATE.split('\n');
  const start = redci.findIndex((l) => /^\s*run:\s*\|\s*$/.test(l));
  const uvlakaRun = redci[start].match(/^\s*/)[0].length;
  const tijelo = [];
  for (let i = start + 1; i < redci.length; i++) {
    if (redci[i].trim() === '') { tijelo.push(''); continue; }
    if (redci[i].match(/^\s*/)[0].length <= uvlakaRun) break;
    tijelo.push(redci[i]);
  }
  const min = Math.min(...tijelo.filter((l) => l.trim()).map((l) => l.match(/^\s*/)[0].length));
  const skripta = tijelo.map((l) => (l.trim() ? l.slice(min) : '')).join('\n') + '\n';
  if (!/exit\s+1/.test(skripta)) {
    throw new Error('izvučeni blok nema nijedan `exit 1` → Gate ne može pocrvenjeti');
  }

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'gate-sh-'));
  const put = path.join(dir, 'gate.sh');
  fs.writeFileSync(put, skripta);

  const jobovi = JOBOVI.filter((j) => j !== 'gate');
  const varZaJob = new Map();
  for (const mm of BLOK_GATE.matchAll(/^\s*(R_[A-Z_0-9]+):\s*\$\{\{\s*needs\.([a-zA-Z_][a-zA-Z0-9_-]*)\.result\s*\}\}/gm)) {
    varZaJob.set(mm[2], mm[1]);
  }

  const pustiGate = (ishodi) => {
    const env = { ...process.env };
    for (const [job, v] of varZaJob) env[v] = ishodi[job];
    const r = spawnSync('sh', [put], { env, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    if (r.error) {
      throw new Error(
        'ne mogu pokrenuti `sh` (' + r.error.message + ') — a bez izvođenja ova tvrdnja ne mjeri ' +
        'presudu nego tekst. Treba POSIX ljuska (Git Bash na Windowsu, ubuntu u CI-ju).'
      );
    }
    return r.status;
  };

  const sviUspjeh = Object.fromEntries(jobovi.map((j) => [j, 'success']));
  if (pustiGate(sviUspjeh) !== 0) {
    throw new Error('gate pada i kad su SVI jobovi uspjeli → lažno crveno na ispravnom stanju');
  }

  // Svaki job, svaki ishod koji NIJE uspjeh — uključujući praznu vrijednost (da `needs.X.result`
  // ikad dođe prazan, gate mora pasti zatvoreno, ne proći).
  const NEUSPJESI = ['failure', 'cancelled', 'skipped', ''];
  let kombinacija = 0;
  for (const job of jobovi) {
    for (const ishod of NEUSPJESI) {
      const ishodi = { ...sviUspjeh, [job]: ishod };
      kombinacija++;
      if (pustiGate(ishodi) === 0) {
        throw new Error(
          'gate je ZELEN uz `' + job + '=' + (ishod || '(prazno)') + '` → taj ishod prolazi kao uspjeh.\n' +
          '      → job koji je cancelled/skipped nije izmjerio ništa, a prazna vrijednost znači da ' +
          'se `needs` nije ni razriješio.'
        );
      }
    }
  }
  if (kombinacija !== jobovi.length * NEUSPJESI.length) {
    throw new Error('izvedeno ' + kombinacija + ' kombinacija — petlja nije pokrila doseg');
  }
});

// ── ④ pre-push hook (Leonova odluka 2026-09-24: punih 154 tvrdnji na main) ──────────────
const HOOK = fs.readFileSync(HOOK_PUT, 'utf8').split(/\r?\n/).filter((l) => !/^\s*#/.test(l)).join('\n');

test('pre-push na main vrti authed suite I provjeru tajni', () => {
  if (!/npm run test:authed/.test(HOOK)) throw new Error('hook ne vrti `npm run test:authed`');
  if (!/ci-tajne\.js\s+--zahtijevaj/.test(HOOK)) throw new Error('hook ne provjerava tajne → suite bi se tiho preskočio');
  if (!/refs\/heads\/main/.test(HOOK)) throw new Error('hook ne razlikuje odredište main');
});

// ── F5: HOOK SE IZVODI, NE ČITA ─────────────────────────────────────────────────────────
// ⚠️ NALAZ REVIZIJE 24.09. Gornja tvrdnja traži da niz `refs/heads/main` POSTOJI negdje u
// datoteci — ne da `case` obrazac stvarno pogađa push na `main`. Mutacija `refs/heads/main)`
// → `refs/heads/main-old)` prolazila je ZELENO, a hook bi na pushu na `main` preskočio SVE
// tri provjere, izašao 0 i pustio push. Kućno pravilo: „brišeš li element, ne traži njegovo
// ime" — isto vrijedi za grane.
// Hook je POSIX `sh` i izvediv je: podmetne se `PATH` sa stubovima `npm`/`node` koji samo
// zabilježe poziv, pa se sudi ŠTO JE POZVANO, a ne što je napisano.
test('pre-push se STVARNO IZVODI: main vrti sve tri provjere, feat-grana nijednu', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'prepush-'));
  const dnevnik = path.join(dir, 'pozivi.txt');
  const binDir = path.join(dir, 'bin');
  fs.mkdirSync(binDir);
  // MSYS/Cygwin i Linux tretiraju datoteku sa `#!` kao izvršnu, pa stub ne treba exec-bit.
  for (const alat of ['npm', 'node']) {
    const stub = '#!/bin/sh\necho "' + alat + ' $*" >> "' + dnevnik.replace(/\\/g, '/') + '"\nexit ${STUB_KOD:-0}\n';
    fs.writeFileSync(path.join(binDir, alat), stub, { mode: 0o755 });
  }

  const pustiHook = (ref, stubKod) => {
    fs.writeFileSync(dnevnik, '');
    const r = spawnSync('sh', [HOOK_PUT], {
      cwd: KORIJEN,
      input: 'refs/heads/x aaa ' + ref + ' bbb\n',
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, PATH: binDir + path.delimiter + process.env.PATH, STUB_KOD: String(stubKod) },
    });
    if (r.error) throw new Error('ne mogu pokrenuti `sh` (' + r.error.message + ') — bez izvođenja tvrdnja mjeri prozu');
    return { kod: r.status, pozivi: fs.readFileSync(dnevnik, 'utf8').trim().split('\n').filter(Boolean) };
  };

  // ① push na main → sva tri koraka, i to TIM REDOM
  const glavna = pustiHook('refs/heads/main', 0);
  if (glavna.kod !== 0) throw new Error('hook pada na main iako svi koraci uspijevaju (EXIT ' + glavna.kod + ')');
  const ocekivano = [/^npm run preflight/, /^node scripts\/ci-tajne\.js --zahtijevaj/, /^npm run test:authed/];
  if (glavna.pozivi.length !== ocekivano.length) {
    throw new Error(
      'na pushu na main pozvano je ' + glavna.pozivi.length + ' naredbi (očekivano ' + ocekivano.length + '):\n      ' +
      glavna.pozivi.join('\n      ')
    );
  }
  ocekivano.forEach((uzorak, i) => {
    if (!uzorak.test(glavna.pozivi[i])) {
      throw new Error('korak ' + (i + 1) + ' na main-u je „' + glavna.pozivi[i] + '", a očekivan je ' + uzorak);
    }
  });

  // ② push na feature-granu → NIJEDAN korak (inače bi svaki push čekao 15 min)
  const feat = pustiHook('refs/heads/feat/nesto', 0);
  if (feat.pozivi.length !== 0) {
    throw new Error('hook vrti provjere i na feature-grani: ' + feat.pozivi.join(', '));
  }
  if (feat.kod !== 0) throw new Error('hook odbija push na feature-granu (EXIT ' + feat.kod + ')');

  // ③ prvi korak padne → hook ODBIJA push i NE nastavlja dalje
  const pao = pustiHook('refs/heads/main', 1);
  if (pao.kod === 0) throw new Error('korak je pao, a hook je PUSTIO push na main');
  if (pao.pozivi.length !== 1) {
    throw new Error('nakon pada prvog koraka pozvano je još naredbi: ' + pao.pozivi.join(', '));
  }
});

// ⚠️ NAREDBE SE NABRAJAJU IZ HOOKA, ne zakucavaju ovdje. Prva verzija je tražila doslovno
// `npm run test:authed`, pa je pala u trenutku kad je hook prešao na mjerač (`:mjeri`) — brana
// koja mora ratu mijenjati svaki put kad se naredba preimenuje mjeri IME, ne svojstvo. Ovako
// svaka buduća naredba u hooku automatski mora biti čuvana.
test('SVAKA naredba u hooku ima čuvan izlazni kod (`if ! …; then` + `exit 1`)', () => {
  const naredbe = [...HOOK.matchAll(/^\s*if\s+!\s+(.+?);\s*then\s*$/gm)].map((m) => m[1].trim());
  const pozvane = [...HOOK.matchAll(/^\s*(?:if\s+!\s+)?((?:npm run|node) [^;\n]+?);?\s*then?\s*$/gm)].map((m) => m[1].trim());
  if (naredbe.length < 3) {
    throw new Error('hook čuva samo ' + naredbe.length + ' naredbi, a treba ih tri (preflight, tajne, suite)');
  }
  for (const n of pozvane) {
    if (!naredbe.includes(n)) {
      throw new Error('naredba `' + n + '` se poziva bez `if ! …; then` → njezin pad bi prošao kao uspjeh');
    }
  }
  // Svaka čuvana naredba mora imati `exit 1` u svojoj grani.
  for (const n of naredbe) {
    const poslije = HOOK.slice(HOOK.indexOf(n) + n.length);
    const grana = poslije.slice(0, poslije.indexOf('fi') + 2);
    if (!/exit 1/.test(grana)) throw new Error('nakon pada `' + n + '` hook ne izlazi s 1');
  }
});

// ── F6: NEŠTO MORA MJERITI KOLIKO JE SUITE DOTAKNUO ─────────────────────────────────────
// ⚠️ NALAZ REVIZIJE 24.09. Brojka „154" stajala je zakucana u imenu CI-koraka i u poruci
// hooka, a NIŠTA ju nije mjerilo. Playwright pada zatvoreno samo na DOSLOVNO nula testova →
// suite u kojem se sve preskoči završava EXIT 0. Dvije mutacije rušile su cijeli dokaz uz
// zeleno: preimenuj jedan spec u `.mjs` (34 → 33), ili `test.skip(true, …)` na vrh speca ③.
// Kućno pravilo koje ovo provodi: mjerač mora ispisati i koliko je toga dotaknuo.
const AUTHED_OSNOVICA = 34; // izmjereno 2026-09-24: `ls tests/*.authed.spec.js | wc -l`

test('broj `*.authed.spec.js` datoteka ne SMIJE pasti (čegrtaljka na dosegu)', () => {
  const n = fs.readdirSync(TESTS_DIR).filter((f) => /\.authed\.spec\.js$/.test(f)).length;
  if (n < AUTHED_OSNOVICA) {
    throw new Error(
      'authed specova je ' + n + ', a osnovica je ' + AUTHED_OSNOVICA + ' → netko je datoteku obrisao ili ' +
      'preimenovao (npr. u `.mjs`), pa ju Playwright više ne vidi. Suite bi ostao zelen s manje mjerenog.'
    );
  }
});

test('CI i hook vrte MJERAČ (`authed-mjera`), ne goli suite', () => {
  const suiteKorak = korakKojiVrti(/npm run test:authed/, '`npm run test:authed`');
  if (!/test:authed:mjeri/.test(suiteKorak)) {
    throw new Error('CI korak vrti goli `test:authed` → suita u kojoj se sve preskoči prolazi kao uspjeh');
  }
  if (!/test:authed:mjeri/.test(HOOK)) {
    throw new Error('pre-push hook vrti goli `test:authed` → isto, samo lokalno');
  }
});

test('mjerač sudi PROŠLE i PRESKOČENE, i ima izmjerenu osnovicu', () => {
  const src = fs.readFileSync(path.join(KORIJEN, 'scripts', 'authed-mjera.js'), 'utf8');
  const kod = src.split('\n').filter((l) => !/^\s*\/\//.test(l)).join('\n');
  for (const [ime, uzorak] of [
    ['osnovicu prošlih', /OSNOVICA_PROSLIH\s*=\s*\d+/],
    ['presudu po prošlima', /expected\s*<\s*OSNOVICA_PROSLIH/],
    ['presudu po preskočenima', /skipped\s*>\s*DOPUSTENO_PRESKOCENIH/],
    ['pad na nečitljivom izvještaju', /process\.exitCode\s*=\s*1/],
    ['pad kad se Playwright ne pokrene', /r\.error/],
  ]) {
    if (!uzorak.test(kod)) throw new Error('`authed-mjera.js` nema ' + ime);
  }
});

// ⚠️ TRAŽI SE DA BROJ **NIJE** ZAKUCAN. Prva verzija je tražila suprotno — literal
// `DOPUSTENO_PRESKOCENIH = 6` — i bila je točna točno jedan dan: čim je service ključ 24.09.
// prešao iz imenovanih iznimki u obavezne, ta je šestica postala **druga kopija činjenice koja
// se promijenila na drugom mjestu**. Brana koja traži literal time jamči drift, ne sprječava ga.
test('granica preskočenih se IZVODI iz imenovanih iznimki (nije druga kopija)', () => {
  const src = fs.readFileSync(path.join(KORIJEN, 'scripts', 'authed-mjera.js'), 'utf8');
  const kod = src.split('\n').filter((l) => !/^\s*\/\//.test(l)).join('\n');
  if (/DOPUSTENO_PRESKOCENIH\s*=\s*\d/.test(kod)) {
    throw new Error(
      'granica preskočenih je zakucan broj → drift čim se imenovana iznimka doda ili makne.\n' +
      '      → izvedi ju iz `preskocenihPoIznimkama()` u scripts/ci-tajne.js'
    );
  }
  if (!/preskocenihPoIznimkama\s*\(\s*\)/.test(kod)) {
    throw new Error('mjerač ne zove `preskocenihPoIznimkama()` → granica ne prati iznimke');
  }
  // Kontrola da izvod stvarno radi: zbroj cijena mora biti broj, i mora pasti na 0 bez iznimki.
  const sad = tajne.preskocenihPoIznimkama();
  if (typeof sad !== 'number' || sad < 0) throw new Error('`preskocenihPoIznimkama()` ne vraća broj');
  const ocekivano = Object.values(tajne.IMENOVANE_IZNIMKE)
    .reduce((z, o) => z + Number((String(o.cijena || '').match(/(\d+)\s*tvrdnj/) || [, 0])[1]), 0);
  if (sad !== ocekivano) throw new Error('izvod daje ' + sad + ', a zbroj cijena je ' + ocekivano);
});

// ── ⑤ OBRNUTA PROVJERA — skripta se STVARNO IZVODI, ne čita ─────────────────────────────
// ⚠️ Ovo je jezgra brane. Sve gore sudi TEKST datoteka; ovdje se `--zahtijevaj` pusti u
// zasebnom procesu s podmetnutom okolinom i traži se točan izlazni kod. Bez ovoga brana tvrdi
// da provjera postoji, a ne da RADI — a upravo je „postoji ali ne radi" bio cijeli kvar.
function pusti(okolina) {
  try {
    const out = execFileSync(process.execPath, [SKRIPTA, '--zahtijevaj'], {
      cwd: KORIJEN, env: okolina, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { kod: 0, ispis: out };
  } catch (e) {
    return { kod: e.status === undefined ? -1 : e.status, ispis: (e.stdout || '') + (e.stderr || '') };
  }
}

/** Okolina u kojoj su sve obavezne tajne prisutne — bez ijedne prave vrijednosti. */
function okolinaSaSvime() {
  const o = { ...process.env, DOTENV_CONFIG_QUIET: 'true' };
  for (const t of tajne.OBAVEZNE) o[t] = 'podmetnuto-za-branu';
  return o;
}

test('--zahtijevaj PROLAZI kad su sve obavezne tajne tu', () => {
  const r = pusti(okolinaSaSvime());
  if (r.kod !== 0) throw new Error('EXIT=' + r.kod + ' uz sve tajne prisutne:\n' + r.ispis);
});

test('--zahtijevaj PADA na svakoj pojedinoj praznoj tajni, i IMENUJE ju', () => {
  for (const meta of tajne.OBAVEZNE) {
    const o = okolinaSaSvime();
    o[meta] = '';
    const r = pusti(o);
    if (r.kod !== 1) {
      throw new Error('prazna ' + meta + ' → EXIT=' + r.kod + ' (očekivano 1):\n' + r.ispis);
    }
    if (!r.ispis.includes(meta)) {
      throw new Error('pad zbog ' + meta + ' ju ne imenuje u ispisu → ne znaš što popraviti');
    }
  }
});

// ⚠️ OVU TVRDNJU JE MUTACIJA M7 ZATEKLA KAKO NE MJERI NIŠTA, i popravak je poučan. Prva
// verzija praznila je PRVU obaveznu tajnu i tražila da se u ispisu ne pojavi biljeg. Mutacija
// koja curi ispisivala je vrijednost te ISTE, prve tajne — dakle prazan string — pa je test
// prošao zeleno nad kodom koji curi. Tvrdnja je mjerila SVOJU postavku, ne ponašanje.
// Sad: prazni se svaka pozicija po redu, a biljeg nose sve OSTALE — pa curenje bilo koje od
// njih pada. Uz to biljeg je RAZLIČIT po tajni, da se vidi KOJA je procurila.
test('--zahtijevaj NE ISPISUJE vrijednost NIJEDNE tajne (ni na padu, ni na kojoj poziciji)', () => {
  for (const prazna of tajne.OBAVEZNE) {
    const o = { ...process.env, DOTENV_CONFIG_QUIET: 'true' };
    for (const t of tajne.OBAVEZNE) o[t] = 'TAJNA-VRIJEDNOST-' + t;
    o[prazna] = '';
    const r = pusti(o);
    for (const t of tajne.OBAVEZNE) {
      if (t === prazna) continue;
      if (r.ispis.includes('TAJNA-VRIJEDNOST-' + t)) {
        throw new Error(
          'uz praznu ' + prazna + ' ispis sadrži VRIJEDNOST tajne ' + t +
          ' → CI log bi ju procurio javno'
        );
      }
    }
  }
});

// ── ⑥ brana ne mjeri PROZU ──────────────────────────────────────────────────────────────
// ⚠️ IME IZMIŠLJENE TAJNE SE SASTAVLJA U HODU, i to NIJE zaobilaženje brane nego jedini
// ispravan oblik. Ova datoteka leži pod `tests/`, dakle nabrajanje ČITA I NJU — kad je ime
// stajalo kao doslovni tekst, brana ga je (točno!) prijavila kao nesvrstanu tajnu i pala na
// prvom pokretanju. To je ujedno DOKAZ da nabrajanje radi nad pravim datotekama, ne samo nad
// podmetnutim nizom. Da ovo netko vrati u doslovni zapis, brana odmah pocrveni — pa je ovdje
// komentar, a ne iznimka u popisu: iznimka bi učinila cijelu datoteku nevidljivom, uključujući
// tajnu koju netko sutra ovdje stvarno upotrijebi.
const LAZNO_IME = 'process.env.' + 'IZMISLJENA_TAJNA';
const LAZNI_UZORAK = new RegExp(LAZNO_IME.replace('.', '\\.'));

test('nabrajanje ne pada na komentaru koji tajnu samo spominje', () => {
  const proza = tajne.bezKomentara('// nikad ne koristi ' + LAZNO_IME + '\nconst x = 1;');
  if (LAZNI_UZORAK.test(proza)) {
    throw new Error('komentar se broji kao ovisnost → brana bi tražila tajnu koju nitko ne koristi');
  }
});

test('nabrajanje PREPOZNAJE pravi poziv (dokaz da prethodna tvrdnja nije prošla na nuli)', () => {
  const kod = tajne.bezKomentara('const p = ' + LAZNO_IME + ';');
  if (!LAZNI_UZORAK.test(kod)) {
    throw new Error('ne prepoznaje ni pravi poziv → odstranjivanje komentara je pojelo kod');
  }
});

console.log(`\n  ${passed} prošlo · ${failed} palo\n`);
process.exit(failed ? 1 : 0);
