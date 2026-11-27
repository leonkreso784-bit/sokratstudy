/* eslint-disable no-console */
// ===== GIT-OKOLINA: preflight pokrenut iz KUKE ne smije dirati pravi repozitorij =====
// Pokreni: node tests/unit/git-okolina.test.js  (uključeno u `npm run test:unit`)
//
// ZAŠTO POSTOJI (2026-09-26): push na `main` iz radnog stabla (`sokratstudy.f3`) pokrenuo je
// pre-push kuku, kuka je pokrenula preflight, a git kuki IZVOZI `GIT_DIR`. `check-docs-gate.test.js`
// je u svojoj privremenoj mapi radio `git init` — i s naslijeđenim `GIT_DIR`-om ponovno
// inicijalizirao PRAVI repozitorij kao bare (`core.bare = true`). Glavno stablo je prestalo biti
// radno stablo, taj je test pao, preflight je pao i kuka je odbila push. Ručni preflight to nikad
// ne bi vidio: `GIT_DIR` postoji SAMO unutar kuke.
//
// ⚠️ MJERI SE U PIJESKU: „žrtva" je vlastiti privremeni repozitorij. Pravi se ne dira ni kad
// popravak nestane — tada padne ovaj test, a ne tvoje stablo.
//
// ① test koji zove `git init` pokrenut s GIT_DIR-om žrtve → žrtva ostaje ne-bare, test prolazi
// ② kuka: preflight dobiva okolinu BEZ GIT_DIR-a (npm je podmetnut i samo zapiše što je vidio)

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..', '..');
const KUKA = path.join(ROOT, '.githooks', 'pre-push');
const TEST_S_GITOM = path.join(__dirname, 'check-docs-gate.test.js');
const BEZ_GITA = Object.fromEntries(Object.entries(process.env).filter(([k]) => !k.startsWith('GIT_')));

let passed = 0;
let failed = 0;
function tvrdi(uvjet, ime, detalj) {
  if (uvjet) { passed++; console.log('  ✅ ' + ime); }
  else { failed++; console.error('  ❌ ' + ime + (detalj ? '\n      ' + detalj : '')); }
}

function zrtva() {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'git-zrtva-'));
  spawnSync('git', ['init', '-q'], { cwd: d, encoding: 'utf8', env: BEZ_GITA });
  return d;
}
function jeBare(d) {
  return spawnSync('git', ['config', 'core.bare'], { cwd: d, encoding: 'utf8', env: BEZ_GITA }).stdout.trim();
}

console.log('\n=== git-okolina: preflight iz kuke ne dira pravi repozitorij ===\n');

// ① test koji zove `git init`, pokrenut kao da je u kuki
{
  const z = zrtva();
  tvrdi(jeBare(z) === 'false', 'pijesak: žrtva je na početku obično radno stablo', 'core.bare=' + jeBare(z));
  const r = spawnSync(process.execPath, [TEST_S_GITOM],
    { encoding: 'utf8', env: Object.assign({}, BEZ_GITA, { GIT_DIR: path.join(z, '.git') }) });
  tvrdi(jeBare(z) === 'false', '① žrtva NIJE postala bare (git init u lažnom stablu nije dirnuo tuđi GIT_DIR)',
    'core.bare=' + jeBare(z));
  tvrdi(r.status === 0, '① check-docs-gate prolazi i s GIT_DIR-om u okolini',
    ((r.stdout || '') + (r.stderr || '')).split('\n').filter((l) => l.includes('❌')).join(' | ') || 'exit ' + r.status);
}

// ② kuka: što preflight stvarno vidi
{
  const z = zrtva();
  const bin = fs.mkdtempSync(path.join(os.tmpdir(), 'lazni-npm-'));
  const zapis = path.join(bin, 'vidio.txt');
  // Kuka na main ima VIŠE koraka (preflight · tajne · authed suite): svaki poziv dopisuje što je vidio,
  // pa GIT_DIR ne smije doći ni do jednog, ne samo do prvog. `node` je podmetnut jer ga zove korak tajni.
  for (const alat of ['npm', 'node']) {
    fs.writeFileSync(path.join(bin, alat), '#!/bin/sh\nprintf \'%s\\n\' "${GIT_DIR-<nema>}" >> "$ZAPIS"\nexit 0\n', { mode: 0o755 });
  }
  const r = spawnSync('sh', [KUKA], {
    cwd: z,
    encoding: 'utf8',
    input: 'refs/heads/grana 1111111 refs/heads/main 2222222\n',
    env: Object.assign({}, BEZ_GITA, {
      PATH: bin + path.delimiter + process.env.PATH,
      GIT_DIR: path.join(z, '.git'),
      ZAPIS: zapis,
    }),
  });
  // Mjerač mora reći da je nešto dotaknuo: bez zapisa npm nije ni pozvan (npr. kuka ne prepoznaje main).
  tvrdi(fs.existsSync(zapis), '② kuka je za push na main stvarno pozvala preflight (npm)',
    'stdout: ' + (r.stdout || '').trim() + ' | stderr: ' + (r.stderr || '').trim());
  const vidio = fs.existsSync(zapis) ? fs.readFileSync(zapis, 'utf8').trim().split(/\r?\n/) : [];
  tvrdi(vidio.length >= 3, '② kuka je pozvala sva tri koraka (preflight · tajne · authed)', 'poziva: ' + vidio.length);
  tvrdi(vidio.length > 0 && vidio.every((v) => v === '<nema>'), '② NIJEDAN korak iz kuke ne vidi GIT_DIR',
    'vidio: ' + vidio.join(' | '));
  tvrdi(r.status === 0, '② kuka propušta kad preflight prođe', 'exit ' + r.status);
}

console.log('\n' + (failed ? '❌ ' + failed + ' palo, ' : '✅ ') + passed + ' prošlo\n');
process.exit(failed ? 1 : 0);
