/* eslint-disable no-console */
// ===== OBRNUTA PROVJERA ZA `check:docs` — DUH-DATOTEKE vs GENERIRANI ARTEFAKTI =====
// Pokreni: node tests/unit/check-docs-gate.test.js  (uključeno u `npm run test:unit`)
//
// ZAŠTO POSTOJI (2026-09-06): provjera „duh-datoteka" tvrdi da datoteka imenovana u
// backtickovima postoji na disku. `docs/workflow/TESTING.md` imenuje `tests/.auth/admin.json`
// — sesiju koju `npm run test:authed` TEK proizvede i koju `.gitignore` drži izvan
// repozitorija. Posljedica: brana je prolazila na stroju gdje su ti testovi jednom vrćeni, a
// padala u svakom svježem klonu i svakom novom `git worktree`-u — dakle **ovisila o povijesti
// stroja, ne o repozitoriju**. Popravak pita git što je ignorirano; ovaj test čuva oboje:
// da se generiranom prašta, i da se svemu ostalom NE prašta (uključujući stablo bez gita,
// gdje brana mora pasti zatvoreno).
//
// ⚠️ MJERI SE U LAŽNOM STABLU (kućni obrazac iz `check-i18n-gate.test.js`) — pravo se ne dira.
// Sudi se ISPISU o duhovima, ne izlaznom kodu: lažno stablo padne i na drugim provjerama
// (indeks, plan), a ovdje se mjeri samo ova jedna.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const IZVOR = path.join(__dirname, '..', '..', 'scripts', 'check-docs.js');

// ⚠️ OKOLINA BEZ GIT_* (2026-09-26): pokrenut iz git KUKE (pre-push → preflight → test:unit), ovaj
// proces nasljeđuje `GIT_DIR` repozitorija iz kojeg se pusha. Tada `git init` u lažnom stablu NE
// stvara novi repozitorij nego ponovno inicijalizira PRAVI — i postavi mu `core.bare = true`
// (izmjereno: glavno stablo je prestalo biti radno stablo, a push na main je pao). Zato se svaki
// git ovdje vrti bez ijedne GIT_* varijable. Brana: `tests/unit/git-okolina.test.js`.
const BEZ_GITA = Object.fromEntries(Object.entries(process.env).filter(([k]) => !k.startsWith('GIT_')));

let passed = 0;
let failed = 0;
function tvrdi(uvjet, ime, detalj) {
  if (uvjet) { passed++; console.log('  ✅ ' + ime); }
  else { failed++; console.error('  ❌ ' + ime + (detalj ? '\n      ' + detalj : '')); }
}

console.log('\n=== check:docs — duh vs generirani artefakt ===\n');

const GENERIRAN = 'tests/.auth/admin.json';   // gitignoriran → NIJE duh
const OBRISAN = 'tests/nema.spec.js';         // nitko ga ne ignorira → JEST duh

/** Lažno stablo: docs/ s indeksom + jedan dokument koji „tvrdi o disku". */
function stablo({ gitignore, git }) {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'checkdocs-'));
  fs.mkdirSync(path.join(d, 'scripts'));
  fs.mkdirSync(path.join(d, 'docs', 'workflow'), { recursive: true });
  fs.copyFileSync(IZVOR, path.join(d, 'scripts', 'check-docs.js'));
  // check-docs.js od 2026-10-11 zove i provjeru rotacije zapisa (odjeljak 8) i veličine (odjeljak 9); bez njih
  // se ne pokrene. Lažno stablo nema docs/records ni memoriju → te provjere javljaju svoje, a ovaj test sudi
  // samo ispisu o duhovima.
  for (const m of ['rotiraj-zapise.js', 'velicina-dokumenata.js']) {
    fs.copyFileSync(path.join(path.dirname(IZVOR), m), path.join(d, 'scripts', m));
  }
  fs.writeFileSync(path.join(d, 'docs', 'README.md'),
    '# Indeks\n\n- [TESTING](workflow/TESTING.md)\n');
  fs.writeFileSync(path.join(d, 'docs', 'workflow', 'TESTING.md'),
    '# Testiranje\n\nSesija je u `' + GENERIRAN + '` (gitignored).\n'
    + 'Suita `' + OBRISAN + '` je preimenovana i više ne postoji.\n');
  if (gitignore) fs.writeFileSync(path.join(d, '.gitignore'), '/tests/.auth/\n');
  if (git) spawnSync('git', ['init', '-q'], { cwd: d, encoding: 'utf8', env: BEZ_GITA });
  return d;
}

function vrti(d) {
  const r = spawnSync(process.execPath, [path.join(d, 'scripts', 'check-docs.js')],
    { encoding: 'utf8', cwd: d, env: BEZ_GITA });
  return (r.stdout || '') + (r.stderr || '');
}

// ① git repo + .gitignore: generiranom se prašta, obrisanom ne
{
  const izlaz = vrti(stablo({ gitignore: true, git: true }));
  tvrdi(izlaz.indexOf(GENERIRAN) < 0,
    'gitignoriran artefakt NIJE prijavljen kao duh', izlaz);
  tvrdi(izlaz.indexOf(OBRISAN) >= 0,
    'obrisana datoteka JEST prijavljena kao duh', izlaz);
  tvrdi(/DUH-DATOTEKA \(1\)/.test(izlaz),
    'prijavljen je točno JEDAN duh (praštanje nije pojelo i pravi nalaz)', izlaz);
}

// ② isti dokumenti, bez .gitignorea: praštanja nema — dokaz da se git STVARNO pita
{
  const izlaz = vrti(stablo({ gitignore: false, git: true }));
  tvrdi(izlaz.indexOf(GENERIRAN) >= 0 && izlaz.indexOf(OBRISAN) >= 0,
    'bez .gitignorea su OBA duha (obrnuta provjera praštanja)', izlaz);
  tvrdi(/DUH-DATOTEKA \(2\)/.test(izlaz), 'prijavljena su točno DVA duha', izlaz);
}

// ③ stablo koje uopće nije git repo: brana pada ZATVORENO, ne prašta ništa
{
  const izlaz = vrti(stablo({ gitignore: true, git: false }));
  tvrdi(izlaz.indexOf(GENERIRAN) >= 0 && izlaz.indexOf(OBRISAN) >= 0,
    'bez gita se ne prašta ništa (pada zatvoreno)', izlaz);
}

console.log('\n' + passed + ' prošlo, ' + failed + ' palo\n');
process.exit(failed ? 1 : 0);
