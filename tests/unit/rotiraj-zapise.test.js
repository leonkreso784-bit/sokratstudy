/* eslint-disable no-console */
// ===== BRANA: `docs:rotate` dijeli PROGRESS/CHANGELOG po mjesecima i ne gubi nijedan unos =====
// Pokreni: node tests/unit/rotiraj-zapise.test.js  (uključeno u `npm run test:unit`)
//
// ZAŠTO: zaglavlje `scripts/rotiraj-zapise.js`. Ovdje se mjeri u LAŽNOM stablu (kućni obrazac iz
// `check-docs-gate.test.js`) — pravi `docs/records/` se ne dira. Svaka tvrdnja gleda DATOTEKE na disku
// poslije rotacije, ne ispis skripte.

const fs = require('fs');
const os = require('os');
const path = require('path');
const R = require('../../scripts/rotiraj-zapise.js');

let passed = 0;
let failed = 0;
function test(ime, fn) {
  try { fn(); passed++; console.log('  ✓ ' + ime); }
  catch (e) { failed++; console.error('  ✗ ' + ime + '\n      ' + e.message); }
}
function tvrdi(uvjet, poruka) { if (!uvjet) throw new Error(poruka); }

console.log('\n=== docs:rotate (rotacija zapisa) ===\n');

const P = {
  okt2: '## 2026-10-11 (OPUS) — listopad drugi\n\n- tekst o listopadu, [veza](../workflow/TESTING.md)\n',
  okt1: '## 2026-10-02 (OPUS) — listopad prvi\n\n- još listopada\n',
  ruj2: '## 2026-09-30 (OPUS) — rujan drugi\n\n```\n## ovo nije naslov\n```\n',
  ruj1: '## 2026-09-01 (OPUS) — rujan prvi\n\n- rujan\n\n---\n',
  srp: '## 2026-07-15 (OPUS) — srpanj\n\n- srpanj\n',
};
const PROGRESS = '# Progress Log\n\nDnevnik rada.\n\n---\n\n' + [P.okt2, P.okt1, P.ruj2, P.ruj1, P.srp].join('\n');

const C = {
  unrel: '## [Unreleased] — rad u tijeku\n',
  noviji: '## 2026-10-03 (OPUS) — grana, nije na produkciji\n\n- novo\n',
  raketa: '## 2026-09-29 (OPUS) — 🚀 **NA PRODUKCIJI** — `main` = `abc`\n\n- isporučeno\n',
  stara: '## 2026-09-20 (OPUS) — 🚀 **STARA ISPORUKA**\n\n- staro\n',
  kolovoz: '## 2026-08-25 (OPUS) — kolovoz\n\n- kolovoz\n\n### Na grani\n\n- rep bez datuma\n',
  baseline: '## [2.0.0] — baseline\n### Added\n- sve\n',
};
const crlf = (s) => s.replace(/\r?\n/g, '\r\n');
const CHANGELOG = crlf('# Changelog\n\nFormat: Keep a Changelog.\n\n' + [C.unrel, C.noviji, C.raketa, C.stara, C.kolovoz, C.baseline].join('\n'));
const README = crlf('# Indeks\n\n## `records/`\n\n| a | b |\n|---|---|\n\n' + R.OZNAKA_POCETAK + '\n' + R.OZNAKA_KRAJ + '\n\n## dalje\n');

const STABLA = [];
function stablo(dodatno) {
  const k = fs.mkdtempSync(path.join(os.tmpdir(), 'sokrat-rotacija-'));
  STABLA.push(k);
  const rec = path.join(k, 'docs', 'records');
  fs.mkdirSync(rec, { recursive: true });
  const datoteke = Object.assign({ 'PROGRESS.md': PROGRESS, 'CHANGELOG.md': CHANGELOG }, dodatno || {});
  for (const [d, t] of Object.entries(datoteke)) if (t !== null) fs.writeFileSync(path.join(rec, d), t, 'utf8');
  if (!dodatno || dodatno.README !== null) fs.writeFileSync(path.join(k, 'docs', 'README.md'), README, 'utf8');
  return k;
}
const citaj = (k, d) => fs.readFileSync(path.join(k, 'docs', 'records', d), 'utf8');
const ima = (k, d) => fs.existsSync(path.join(k, 'docs', 'records', d));
const lf = (s) => s.replace(/\r\n/g, '\n');
const bez = (s) => s.replace(/\s+$/, '');
/** Svaki unos se u cijelom stablu pojavljuje TOČNO jednom, doslovno. */
function jednom(k, unosi) {
  const sve = fs.readdirSync(path.join(k, 'docs', 'records')).map((d) => lf(citaj(k, d))).join('\n\u0000\n');
  for (const u of unosi) {
    const n = sve.split(bez(u)).length - 1;
    tvrdi(n === 1, 'unos se pojavljuje ' + n + '×: ' + u.split('\n')[0]);
  }
}

// ── 1. prije rotacije --check pada i kaže naredbu ─────────────────
test('--check na nerotiranom stablu pada i imenuje naredbu za popravak', () => {
  const k = stablo();
  const p = R.provjeri(k, '2026-10-11').join('\n');
  tvrdi(/ZAPISI NISU ROTIRANI/.test(p), 'nema nalaza: ' + p);
  tvrdi(p.indexOf('npm run docs:rotate') >= 0, 'nalaz ne kaže naredbu: ' + p);
  tvrdi(p.indexOf('PROGRESS.md') >= 0 && p.indexOf('CHANGELOG.md') >= 0, 'nalaz ne imenuje obje datoteke: ' + p);
});

// ── 2. rotacija ──────────────────────────────────────────────────
const k = stablo();
const prvi = R.rotiraj(k, '2026-10-11');

test('rotacija prolazi bez problema i javlja što je dotaknula', () => {
  tvrdi(prvi.problemi.length === 0, prvi.problemi.join(' | '));
  const izv = prvi.izvjestaj.join('\n');
  tvrdi(/PROGRESS: 5 unosa · glavna 5 → 2 · premješteno 3/.test(izv), izv);
  tvrdi(/CHANGELOG: 6 unosa · glavna 6 → 3 · premješteno 3/.test(izv), izv);
});

test('PROGRESS.md drži SAMO tekući mjesec, zaglavlje netaknuto', () => {
  const t = citaj(k, 'PROGRESS.md');
  tvrdi(t.startsWith('# Progress Log\n\nDnevnik rada.\n\n---\n\n'), 'zaglavlje promijenjeno');
  tvrdi(t.indexOf('listopad drugi') >= 0 && t.indexOf('listopad prvi') >= 0, 'listopad nije ostao');
  tvrdi(t.indexOf('rujan') < 0 && t.indexOf('srpanj') < 0, 'zatvoren mjesec ostao u glavnoj');
});

test('zatvoreni mjeseci su u PROGRESS-YYYY-MM.md, u izvornom redoslijedu', () => {
  tvrdi(ima(k, 'PROGRESS-2026-09.md') && ima(k, 'PROGRESS-2026-07.md'), 'nema mjesečnih datoteka');
  tvrdi(!ima(k, 'PROGRESS-2026-08.md'), 'nastala datoteka za mjesec bez unosa');
  const t = citaj(k, 'PROGRESS-2026-09.md');
  tvrdi(t.indexOf('rujan drugi') < t.indexOf('rujan prvi'), 'redoslijed obrnut');
  tvrdi(t.indexOf('[PROGRESS.md](PROGRESS.md)') >= 0, 'arhiva ne pokazuje na tekući zapis');
  tvrdi(t.indexOf('## ovo nije naslov') >= 0, 'naslov u ``` ogradi je razrezao unos');
});

test('CHANGELOG.md drži zaglavlje, [Unreleased], najnoviji 🚀 i sve novije od njega', () => {
  const t = lf(citaj(k, 'CHANGELOG.md'));
  tvrdi(t.startsWith('# Changelog\n\nFormat: Keep a Changelog.\n\n## [Unreleased]'), 'zaglavlje/[Unreleased] nisu gore');
  tvrdi(t.indexOf('grana, nije na produkciji') >= 0, 'unos noviji od 🚀 je otišao');
  tvrdi(t.indexOf('NA PRODUKCIJI') >= 0, 'najnoviji 🚀 je otišao — „zadnji 🚀 redak" bi lagao');
  tvrdi(t.indexOf('STARA ISPORUKA') < 0 && t.indexOf('baseline') < 0, 'stariji od 🚀 ostao u glavnoj');
});

test('rep bez datuma i [2.0.0] baseline idu s mjesecom unosa iznad sebe', () => {
  const t = lf(citaj(k, 'CHANGELOG-2026-08.md'));
  tvrdi(t.indexOf('rep bez datuma') >= 0 && t.indexOf('## [2.0.0] — baseline') >= 0, t);
  tvrdi(lf(citaj(k, 'CHANGELOG-2026-09.md')).indexOf('STARA ISPORUKA') >= 0, 'stari 🚀 nije u rujnu');
});

test('nijedan unos nije izgubljen ni udvostručen, tekst doslovno isti', () => {
  jednom(k, Object.values(P).concat(Object.values(C)));
});

test('kraj retka se čuva po izvoru (CHANGELOG CRLF, PROGRESS LF)', () => {
  const c = citaj(k, 'CHANGELOG-2026-08.md');
  tvrdi(/\r\n/.test(c) && !/[^\r]\n/.test(c), 'CHANGELOG arhiva nije čisti CRLF');
  tvrdi(!/\r/.test(citaj(k, 'PROGRESS-2026-09.md')), 'PROGRESS arhiva ima CR');
  tvrdi(/\r\n/.test(citaj(k, 'CHANGELOG.md')) && !/[^\r]\n/.test(citaj(k, 'CHANGELOG.md')), 'CHANGELOG.md više nije CRLF');
});

test('indeks u docs/README.md nabraja SVAKU mjesečnu datoteku, „—" gdje je nema', () => {
  const t = fs.readFileSync(path.join(k, 'docs', 'README.md'), 'utf8');
  for (const d of ['PROGRESS-2026-09.md', 'PROGRESS-2026-07.md', 'CHANGELOG-2026-09.md', 'CHANGELOG-2026-08.md']) {
    tvrdi(t.indexOf('](./records/' + d + ')') >= 0, 'indeks ne nabraja ' + d);
  }
  tvrdi(/\| 2026-07 \| \[PROGRESS-2026-07\.md\][^|]*\| — \|/.test(t), 'srpanj bez CHANGELOG-a nema „—"');
  tvrdi(t.indexOf('## dalje') > t.indexOf(R.OZNAKA_KRAJ), 'tekst iza oznake pojeden');
  tvrdi(t.indexOf('2026-09') < t.indexOf('2026-07'), 'mjeseci nisu od najnovijeg');
});

test('drugi prolaz = 0 promjena, datoteke bajt-identične', () => {
  const prije = fs.readdirSync(path.join(k, 'docs', 'records')).map((d) => d + '\u0000' + citaj(k, d)).join('\u0001');
  const drugi = R.rotiraj(k, '2026-10-11');
  tvrdi(drugi.promijenjene.length === 0, 'drugi prolaz promijenio: ' + drugi.promijenjene.join(', '));
  tvrdi(/premješteno 0 · poslije 5/.test(drugi.izvjestaj.join('\n')), drugi.izvjestaj.join(' | '));
  const poslije = fs.readdirSync(path.join(k, 'docs', 'records')).map((d) => d + '\u0000' + citaj(k, d)).join('\u0001');
  tvrdi(prije === poslije, 'sadržaj se promijenio');
});

test('--check poslije rotacije je čist', () => {
  const p = R.provjeri(k, '2026-10-11');
  tvrdi(p.length === 0, p.join(' | '));
});

// ── 3. sljedeći mjesec: novi unosi idu ISPRED onoga što arhiva već ima ──
test('novi mjesec i nov 🚀: premješteno ide ispred postojeće arhive', () => {
  const k2 = stablo();
  R.rotiraj(k2, '2026-10-11');
  // studeni: nov unos u PROGRESS i nova isporuka u CHANGELOG
  const pr = citaj(k2, 'PROGRESS.md').replace('---\n\n', '---\n\n## 2026-11-01 (OPUS) — studeni\n\n- studeni\n\n');
  fs.writeFileSync(path.join(k2, 'docs', 'records', 'PROGRESS.md'), pr, 'utf8');
  const ch = citaj(k2, 'CHANGELOG.md').replace('## 2026-10-03', '## 2026-11-01 (OPUS) — 🚀 **NOVA ISPORUKA**\r\n\r\n- novo\r\n\r\n## 2026-10-03');
  fs.writeFileSync(path.join(k2, 'docs', 'records', 'CHANGELOG.md'), ch, 'utf8');
  const r = R.rotiraj(k2, '2026-11-02');
  tvrdi(r.problemi.length === 0, r.problemi.join(' | '));
  tvrdi(citaj(k2, 'PROGRESS.md').indexOf('listopad') < 0, 'listopad ostao u glavnoj');
  tvrdi(ima(k2, 'PROGRESS-2026-10.md'), 'nema listopadske arhive');
  const ruj = lf(citaj(k2, 'CHANGELOG-2026-09.md'));
  tvrdi(ruj.indexOf('NA PRODUKCIJI') >= 0 && ruj.indexOf('NA PRODUKCIJI') < ruj.indexOf('STARA ISPORUKA'),
    'stari najnoviji 🚀 nije ispred starije arhive');
  tvrdi(lf(citaj(k2, 'CHANGELOG.md')).indexOf('NOVA ISPORUKA') >= 0, 'nov 🚀 nije ostao gore');
  tvrdi(ima(k2, 'CHANGELOG-2026-10.md'), '2026-10-03 (iza novog 🚀) nije otišao u listopad');
  jednom(k2, Object.values(P).concat(Object.values(C)));
  tvrdi(R.provjeri(k2, '2026-11-02').length === 0, 'check nije čist');
  tvrdi(R.provjeri(k2, '2026-12-01').join('').indexOf('ZAPISI NISU ROTIRANI') >= 0, 'prosinac: studeni u glavnoj nije uhvaćen');
});

// ── 4. pada zatvoreno ────────────────────────────────────────────
test('bez oznaka u indeksu: problem, i NIŠTA se ne upisuje', () => {
  const k3 = stablo();
  fs.writeFileSync(path.join(k3, 'docs', 'README.md'), '# Indeks bez oznaka\n', 'utf8');
  const r = R.rotiraj(k3, '2026-10-11');
  tvrdi(r.problemi.join('').indexOf('nema oznake') >= 0, 'nema problema');
  tvrdi(r.promijenjene.length === 0 && !ima(k3, 'PROGRESS-2026-09.md'), 'upisano unatoč problemu');
  tvrdi(citaj(k3, 'PROGRESS.md') === PROGRESS, 'glavna datoteka dirana');
});

test('unos iz krivog mjeseca u arhivi je problem', () => {
  const k4 = stablo({ 'PROGRESS-2026-08.md': '# Progress Log — 2026-08\n\n## 2026-06-01 (OPUS) — lipanj zalutao\n\n- x\n' });
  const p = R.provjeri(k4, '2026-10-11').join('\n');
  tvrdi(/PROGRESS-2026-08\.md: unos iz 2026-06/.test(p), p);
});

test('CHANGELOG bez ijednog 🚀 dok arhiva ima jedan = problem', () => {
  const bezRakete = crlf('# Changelog\n\n' + C.unrel + '\n' + C.noviji);
  const k5 = stablo({ 'CHANGELOG.md': bezRakete, 'CHANGELOG-2026-09.md': crlf('# Changelog — 2026-09\n\n' + C.stara) });
  const p = R.provjeri(k5, '2026-10-11').join('\n');
  tvrdi(p.indexOf('nema nijedan 🚀') >= 0, p);
});

for (const s of STABLA) fs.rmSync(s, { recursive: true, force: true });
console.log('\n' + passed + ' prošlo, ' + failed + ' palo\n');
process.exit(failed ? 1 : 0);
