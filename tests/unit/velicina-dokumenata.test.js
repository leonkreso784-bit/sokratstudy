/* eslint-disable no-console */
// ===== BRANA: veličina memorije, checkpointa, aktivnog plana i docs/architecture =====
// Pokreni: node tests/unit/velicina-dokumenata.test.js  (uključeno u `npm run test:unit`)
//
// ZAŠTO: zaglavlje `scripts/velicina-dokumenata.js`. Mjeri se u LAŽNOM stablu i lažnom domu — prava
// memorija i pravi docs/ se ne diraju. Svaki prag dobiva rub: TOČNO prag prolazi, prag + 1 pada — tako
// se vidi da brana mjeri baš taj broj, a ne „otprilike". Pragovi se čitaju iz modula, ne prepisuju.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const V = require('../../scripts/velicina-dokumenata.js');

let passed = 0;
let failed = 0;
function test(ime, fn) {
  try { fn(); passed++; console.log('  ✓ ' + ime); }
  catch (e) { failed++; console.error('  ✗ ' + ime + '\n      ' + e.message); }
}
function tvrdi(uvjet, poruka) { if (!uvjet) throw new Error(poruka); }

console.log('\n=== veličina dokumenata ===\n');

const BEZ_GITA = Object.fromEntries(Object.entries(process.env).filter(([k]) => !k.startsWith('GIT_')));
const prag = (ime) => V.MEMORIJA.find((p) => p.datoteka === ime).prag;
/** Tekst od TOČNO n znakova (bez \r), redci od 200 — ispod granice retka u MEMORY.md. */
const tekst = (n) => ('a'.repeat(199) + '\n').repeat(Math.ceil(n / 200) + 1).slice(0, n);
const ARK = { od: 'test', zasto: 'test', izmjereno: { 'A.md': 1000 } };

const STABLA = [];
function stablo() {
  const k = fs.mkdtempSync(path.join(os.tmpdir(), 'sokrat-velicina-'));
  STABLA.push(k);
  const mem = path.join(k, 'memorija');
  fs.mkdirSync(mem);
  for (const p of V.MEMORIJA) fs.writeFileSync(path.join(mem, p.datoteka), tekst(100));
  fs.writeFileSync(path.join(mem, 'ostala.md'), tekst(100));
  fs.mkdirSync(path.join(k, 'docs', 'plan'), { recursive: true });
  fs.mkdirSync(path.join(k, 'docs', 'architecture'));
  fs.writeFileSync(path.join(k, 'docs', 'plan', 'PLAN.md'), tekst(100));
  fs.writeFileSync(path.join(k, 'docs', 'architecture', 'A.md'), tekst(1000));
  return { k, mem };
}
function vrti(s, dodatno) {
  return V.provjeri(Object.assign({ korijen: s.k, aktivniPlanovi: ['PLAN.md'], env: { SOKRAT_MEMORIJA: s.mem }, arhitektura: ARK }, dodatno || {}));
}
const ispis = (r) => r.problemi.join('\n');

// ── čisto stablo ──
test('čisto stablo: nula problema, dotaknute sve datoteke (memorija 4 + plan 1 + arhitektura 1)', () => {
  const r = vrti(stablo());
  tvrdi(r.problemi.length === 0, ispis(r));
  tvrdi(r.dotaknuto === 6, 'dotaknuto ' + r.dotaknuto);
});

// ── svaki prag: točno prag prolazi, prag + 1 pada ──
const SLUCAJEVI = [
  ['MEMORY.md', (s) => path.join(s.mem, 'MEMORY.md'), prag('MEMORY.md')],
  ['current-checkpoint.md', (s) => path.join(s.mem, 'current-checkpoint.md'), prag('current-checkpoint.md')],
  ['ostale memorije', (s) => path.join(s.mem, 'ostala.md'), V.OSTALE_MEMORIJE.prag],
  ['iznimka windows-git-bash-zamke.md', (s) => path.join(s.mem, 'windows-git-bash-zamke.md'), prag('windows-git-bash-zamke.md')],
  ['aktivni plan', (s) => path.join(s.k, 'docs', 'plan', 'PLAN.md'), V.AKTIVNI_PLAN.prag],
  ['docs/architecture (izmjereno + 10 %)', (s) => path.join(s.k, 'docs', 'architecture', 'A.md'), V.pragArhitekture(1000)],
];
for (const [ime, put, granica] of SLUCAJEVI) {
  test(ime + ': ' + granica + ' prolazi, ' + (granica + 1) + ' pada s imenom datoteke', () => {
    const s = stablo();
    fs.writeFileSync(put(s), tekst(granica));
    tvrdi(vrti(s).problemi.length === 0, 'točno na pragu pada: ' + ispis(vrti(s)));
    fs.writeFileSync(put(s), tekst(granica + 1));
    const p = ispis(vrti(s));
    tvrdi(p.indexOf('PREKO PRAGA') >= 0 && p.indexOf(path.basename(put(s))) >= 0 && p.indexOf(String(granica + 1)) >= 0, p);
  });
}

test('pragovi su oni iz odluke (8 000 · 5 000 · 6 000 · 9 000 · 12 000 · +10 %)', () => {
  tvrdi(prag('MEMORY.md') === 8000 && prag('current-checkpoint.md') === 5000 && V.OSTALE_MEMORIJE.prag === 6000 &&
    prag('windows-git-bash-zamke.md') === 9000 && V.AKTIVNI_PLAN.prag === 12000 && V.pragArhitekture(1000) === 1100, 'pragovi');
});

test('iznimka vrijedi SAMO za imenovanu datoteku: windows-git-bash-zamke 6 001 prolazi, druga 6 001 pada', () => {
  const s = stablo();
  fs.writeFileSync(path.join(s.mem, 'windows-git-bash-zamke.md'), tekst(6001));
  tvrdi(vrti(s).problemi.length === 0, ispis(vrti(s)));
  fs.writeFileSync(path.join(s.mem, 'druga.md'), tekst(6001));
  tvrdi(ispis(vrti(s)).indexOf('druga.md') >= 0, 'druga nije uhvaćena');
});

test('MEMORY.md: redak od 250 prolazi, 251 pada s brojem retka', () => {
  const s = stablo();
  fs.writeFileSync(path.join(s.mem, 'MEMORY.md'), '# Indeks\n' + 'b'.repeat(250) + '\n');
  tvrdi(vrti(s).problemi.length === 0, ispis(vrti(s)));
  fs.writeFileSync(path.join(s.mem, 'MEMORY.md'), '# Indeks\r\n' + 'b'.repeat(251) + '\r\n');
  const p = ispis(vrti(s));
  tvrdi(/PREDUG REDAK {2}memorija\/MEMORY\.md:2 {2}251 > 250/.test(p), p);
});

test('granica retka vrijedi samo za MEMORY.md (druga memorija smije dug redak)', () => {
  const s = stablo();
  fs.writeFileSync(path.join(s.mem, 'ostala.md'), 'c'.repeat(400) + '\n');
  tvrdi(vrti(s).problemi.length === 0, ispis(vrti(s)));
});

test('\\r se ne broji (CRLF i LF iste datoteke daju isti ishod)', () => {
  const s = stablo();
  fs.writeFileSync(path.join(s.mem, 'current-checkpoint.md'), tekst(prag('current-checkpoint.md')).replace(/\n/g, '\r\n'));
  tvrdi(vrti(s).problemi.length === 0, ispis(vrti(s)));
});

// ── tablica i disk se ne smiju razići ──
test('nova datoteka u docs/architecture bez praga = pad', () => {
  const s = stablo();
  fs.writeFileSync(path.join(s.k, 'docs', 'architecture', 'NOVA.md'), 'x');
  tvrdi(ispis(vrti(s)).indexOf('NEMA PRAGA  docs/architecture/NOVA.md') >= 0, ispis(vrti(s)));
});
test('prag za obrisanu datoteku arhitekture = pad', () => {
  const s = stablo();
  fs.unlinkSync(path.join(s.k, 'docs', 'architecture', 'A.md'));
  tvrdi(ispis(vrti(s)).indexOf('PRAG BEZ DATOTEKE  docs/architecture/A.md') >= 0, ispis(vrti(s)));
});
test('imenovana memorija koja ne postoji (preimenovana) = pad', () => {
  const s = stablo();
  fs.unlinkSync(path.join(s.mem, 'current-checkpoint.md'));
  tvrdi(ispis(vrti(s)).indexOf('PRAG BEZ DATOTEKE  memorija/current-checkpoint.md') >= 0, ispis(vrti(s)));
});
test('stvarna tablica arhitekture pokriva TOČNO datoteke u pravom docs/architecture', () => {
  const pravi = fs.readdirSync(path.join(__dirname, '..', '..', 'docs', 'architecture')).filter((d) => d.endsWith('.md')).sort();
  const tablica = Object.keys(V.ARHITEKTURA.izmjereno).sort();
  tvrdi(JSON.stringify(pravi) === JSON.stringify(tablica), 'disk ' + pravi + ' vs tablica ' + tablica);
});

// ── gdje je memorija ──
test('ime projekta: svaki ne-alfanumerički znak → „-"', () => {
  tvrdi(V.imeProjekta('C:/Users/leonk/Documents/sokratstudy.dev') === 'C--Users-leonk-Documents-sokratstudy-dev', 'ime');
});

function gitStablo() {
  const s = stablo();
  const g = spawnSync('git', ['init', '-q'], { cwd: s.k, encoding: 'utf8', env: BEZ_GITA });
  if (g.status !== 0) throw new Error('git init: ' + g.stderr);
  const dom = path.join(s.k, 'dom');
  fs.mkdirSync(path.join(dom, '.claude', 'projects'), { recursive: true });
  const top = spawnSync('git', ['worktree', 'list', '--porcelain'], { cwd: s.k, encoding: 'utf8', env: BEZ_GITA });
  const ime = V.imeProjekta(/^worktree (.+)$/m.exec(top.stdout)[1].trim());
  return { s, dom, ime };
}

test('memorija se nalazi preko GLAVNOG stabla, bez obzira na veličinu slova (c-- vs C--)', () => {
  const { s, dom, ime } = gitStablo();
  const drugaSlova = ime.charAt(0) === ime.charAt(0).toLowerCase() ? ime.charAt(0).toUpperCase() + ime.slice(1)
    : ime.charAt(0).toLowerCase() + ime.slice(1);
  fs.mkdirSync(path.join(dom, '.claude', 'projects', drugaSlova, 'memory'), { recursive: true });
  const m = V.mapaMemorije(s.k, {}, dom);
  tvrdi(m.put === path.join(dom, '.claude', 'projects', drugaSlova, 'memory'), m.put + ' (traženo ' + drugaSlova + ')');
});

test('iz POVEZANOG stabla (kao .f6) memorija je ona GLAVNOG stabla, ne povezanog', () => {
  const { s, dom, ime } = gitStablo();
  const g = (args, cwd) => {
    const r = spawnSync('git', args, { cwd: cwd || s.k, encoding: 'utf8', env: BEZ_GITA });
    if (r.status !== 0) throw new Error('git ' + args.join(' ') + ': ' + r.stderr);
  };
  g(['-c', 'user.email=t@t', '-c', 'user.name=t', 'commit', '-q', '--allow-empty', '-m', 'x']);
  const povezano = path.join(s.k, 'povezano');
  g(['worktree', 'add', '-q', povezano]);
  fs.mkdirSync(path.join(dom, '.claude', 'projects', ime, 'memory'), { recursive: true });
  const m = V.mapaMemorije(povezano, {}, dom);
  tvrdi(m.put === path.join(dom, '.claude', 'projects', ime, 'memory'), m.put + ' (glavno: ' + ime + ')');
  tvrdi(m.put.indexOf('povezano') < 0, 'uzeto povezano stablo');
});

test('nema mape memorije → PRESKOČENO s putem, glasno, bez problema', () => {
  const { s, dom, ime } = gitStablo();
  const r = V.provjeri({ korijen: s.k, aktivniPlanovi: [], env: {}, dom, arhitektura: ARK });
  const ocekivano = 'PRESKOČENO — memorija nije na ovom stroju: ' + path.join(dom, '.claude', 'projects', ime, 'memory');
  tvrdi(r.napomene.indexOf(ocekivano) >= 0, JSON.stringify(r.napomene));
  tvrdi(r.problemi.length === 0, ispis(r));
});

test('izričit SOKRAT_MEMORIJA koji ne postoji = pad, ne preskok', () => {
  const s = stablo();
  const r = vrti(s, { env: { SOKRAT_MEMORIJA: path.join(s.k, 'nema') } });
  tvrdi(ispis(r).indexOf('SOKRAT_MEMORIJA ne postoji') >= 0, ispis(r));
});

test('bez gita i bez izričitog puta = pad (ne tihi preskok)', () => {
  const s = stablo();
  const r = V.provjeri({ korijen: s.k, aktivniPlanovi: [], env: {}, dom: s.k, arhitektura: ARK });
  tvrdi(ispis(r).indexOf('MEMORIJA SE NE MOŽE NAĆI') >= 0, ispis(r) + ' | ' + r.napomene);
});

for (const s of STABLA) fs.rmSync(s, { recursive: true, force: true });
console.log('\n' + passed + ' prošlo, ' + failed + ' palo\n');
process.exit(failed ? 1 : 0);
