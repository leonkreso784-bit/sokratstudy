#!/usr/bin/env node
/* eslint-disable no-console */
// ===== docs:rotate — PROGRESS i CHANGELOG se dijele po mjesecima =====
// Pokreni: npm run docs:rotate            (premjesti zatvorene mjesece, osvježi indeks)
//          npm run docs:rotate -- --check (samo provjeri; dio `check:docs`, dakle preflighta i CI-ja)
//
// ZAŠTO POSTOJI (Leon, anketa 2026-10-11; cigla DOKUMENTACIJA ③): dvije datoteke dnevnika rasle su bez
// granice — izmjereno 10.10.: PROGRESS ~960 k znakova (06 184k · 07 195k · 08 258k · 09 299k · 10 22k),
// CHANGELOG ~525 k (08 397k · 09 127k). Nijedan alat ih više ne može pročitati cijele, a svaki unos se
// dopisuje na VRH, pa je tekući rad zakopan iznad stotina tisuća znakova povijesti koja se ne mijenja.
//
// ŠTO RADI:
//   • PROGRESS.md zadržava TEKUĆI mjesec; svaki zatvoreni ide u `PROGRESS-YYYY-MM.md`.
//   • CHANGELOG.md zadržava zaglavlje, „[Unreleased]", NAJNOVIJI 🚀 unos i sve novije od njega — jer pravilo
//     „što je na produkciji zna zadnji 🚀 redak CHANGELOG-a" (CLAUDE.md) mora ostati istinito. Starije ide u
//     `CHANGELOG-YYYY-MM.md`; unos bez datuma (stari rep, „[2.0.0] baseline") ide s mjesecom unosa iznad sebe.
//   • Mjesečne datoteke su u ISTOJ mapi → relativne poveznice u premještenim unosima ostaju žive.
//   • Popis mjeseci u `docs/README.md` generira se između oznaka (check:docs traži da je svaki .md u indeksu).
//
// ⚠️ NIŠTA SE NE PIŠE AKO SE ZBROJ NE SLAŽE. Prije upisa se izračuna sve, pa se usporedi SKUP unosa prije i
// poslije (svaki unos po tekstu, ne samo broj) — razlika = pad bez ijedne promijenjene datoteke. Mjerač koji
// ne ispiše koliko je dotaknuo bio je prvi kvar faze redizajna (CLAUDE.md, „Živa pravila"), pa skripta uvijek
// ispisuje broj unosa i datoteka. Drugi prolaz mora dati 0 promjena (brana: tests/unit/rotiraj-zapise.test.js).
//
// ⚠️ Unos = blok od `## ` naslova do sljedećeg `## ` (izvan ``` ograda). Tekst unosa se NE mijenja.

const fs = require('fs');
const path = require('path');

const OZNAKA_POCETAK = '<!-- docs:rotate — generira `npm run docs:rotate`, ne uređivati rukom -->';
const OZNAKA_KRAJ = '<!-- /docs:rotate -->';
const POPRAVAK = 'npm run docs:rotate';

const ZAPISI = [
  { ime: 'PROGRESS', opis: 'Dnevnik rada' },
  { ime: 'CHANGELOG', opis: 'Isporuke' },
];

// ── čitanje ─────────────────────────────────────────────────────────

/** Tekst → { eol, zaglavlje: [redci], blokovi: [{ redci, mjesec, datiran, raketa }] }. */
function parsiraj(tekst) {
  const eol = /\r\n/.test(tekst) ? '\r\n' : '\n';
  const redci = tekst.split(/\r?\n/);
  if (redci.length && redci[redci.length - 1] === '') redci.pop();
  const zaglavlje = [];
  const blokovi = [];
  let ograda = false;
  let tekuci = null;
  let zadnjiMjesec = null;
  for (const r of redci) {
    if (/^\s*```/.test(r)) ograda = !ograda;
    if (!ograda && /^## /.test(r)) {
      const m = r.match(/^## (\d{4}-\d{2})-\d{2}/);
      if (m) zadnjiMjesec = m[1];
      tekuci = { redci: [r], mjesec: zadnjiMjesec, datiran: !!m, raketa: !!m && r.indexOf('🚀') >= 0 };
      blokovi.push(tekuci);
      continue;
    }
    (tekuci ? tekuci.redci : zaglavlje).push(r);
  }
  return { eol, zaglavlje, blokovi };
}

/** Unos za usporedbu: bez praznih redaka na kraju (oni su razmak, ne sadržaj). */
function kljuc(blok) {
  const r = blok.redci.slice();
  while (r.length && r[r.length - 1].trim() === '') r.pop();
  return r.join('\n');
}

function sastavi(zaglavlje, blokovi, eol) {
  const out = zaglavlje.slice();
  blokovi.forEach((b, i) => {
    if (out.length && out[out.length - 1].trim() !== '') out.push('');
    out.push(...b.redci);
    if (i === blokovi.length - 1) while (out.length && out[out.length - 1].trim() === '') out.pop();
  });
  return out.join(eol) + eol;
}

function zaglavljeMjeseca(ime, prviRedak, mjesec) {
  const naslov = (prviRedak || '# ' + ime).replace(/\s+$/, '');
  return [
    naslov + ' — ' + mjesec,
    '',
    '> **Arhiva jednog mjeseca** — ovamo ju je premjestio `' + POPRAVAK + '`; tekst unosa je nepromijenjen.',
    '> Tekući zapis: [' + ime + '.md](' + ime + '.md) · svi mjeseci: [docs/README.md](../README.md).',
    '',
  ];
}

const mjesecIz = (danas) => String(danas).slice(0, 7);

function danasnji() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

// ── raspored ────────────────────────────────────────────────────────

/** Koji blokovi glavne datoteke ODLAZE. PROGRESS: zatvoren mjesec. CHANGELOG: sve iza najnovijeg 🚀. */
function odlaze(ime, blokovi, tekuciMjesec) {
  if (ime === 'PROGRESS') return blokovi.map((b) => b.mjesec !== null && b.mjesec < tekuciMjesec);
  const raketa = blokovi.findIndex((b) => b.raketa);
  return blokovi.map((_, i) => raketa >= 0 && i > raketa);
}

/**
 * Izračunaj sve, ne piši ništa. `datoteke` = { 'PROGRESS.md': tekst, 'PROGRESS-2026-09.md': tekst, … , README }.
 * Vraća { nove: { ime: tekst }, izvjestaj: [redci], problemi: [redci] }.
 */
function rasporedi(datoteke, readme, danas) {
  const tekuciMjesec = mjesecIz(danas);
  const nove = {};
  const izvjestaj = [];
  const problemi = [];
  const sviMjeseci = {};

  for (const { ime } of ZAPISI) {
    const glavnaIme = ime + '.md';
    if (datoteke[glavnaIme] === undefined) { problemi.push('NEMA ' + glavnaIme); continue; }
    const glavna = parsiraj(datoteke[glavnaIme]);
    const reArhiva = new RegExp('^' + ime + '-(\\d{4}-\\d{2})\\.md$');
    const arhive = {};
    for (const [d, t] of Object.entries(datoteke)) {
      const m = d.match(reArhiva);
      if (m) arhive[m[1]] = parsiraj(t);
    }

    const prije = glavna.blokovi.concat(...Object.values(arhive).map((a) => a.blokovi));
    const izlaz = odlaze(ime, glavna.blokovi, tekuciMjesec);
    const ostaju = glavna.blokovi.filter((_, i) => !izlaz[i]);
    const premjesteni = glavna.blokovi.filter((_, i) => izlaz[i]);

    const poMjesecu = {};
    for (const b of premjesteni) {
      if (!b.mjesec) { problemi.push(glavnaIme + ': unos bez datuma i bez datiranog unosa iznad sebe — ne znam kamo: ' + b.redci[0]); continue; }
      (poMjesecu[b.mjesec] = poMjesecu[b.mjesec] || []).push(b);
    }

    const mjeseci = Array.from(new Set(Object.keys(arhive).concat(Object.keys(poMjesecu)))).sort().reverse();
    const poslije = ostaju.slice();
    for (const mj of mjeseci) {
      const stara = arhive[mj];
      // premješteni su NOVIJI od svega što arhiva već ima → idu ispred
      const blokovi = (poMjesecu[mj] || []).concat(stara ? stara.blokovi : []);
      poslije.push(...blokovi);
      const prviRedak = glavna.zaglavlje.find((r) => /^# /.test(r));
      nove[ime + '-' + mj + '.md'] = sastavi(zaglavljeMjeseca(ime, prviRedak, mj), blokovi, glavna.eol);
      (sviMjeseci[mj] = sviMjeseci[mj] || {})[ime] = true;
      // svaki datiran unos arhive mora pripadati njezinom mjesecu
      for (const b of blokovi) {
        if (b.datiran && b.mjesec !== mj) problemi.push(ime + '-' + mj + '.md: unos iz ' + b.mjesec + ' — ' + b.redci[0]);
      }
    }
    nove[glavnaIme] = sastavi(glavna.zaglavlje, ostaju, glavna.eol);

    // ⚠️ invarijanta: isti SKUP unosa prije i poslije, po tekstu
    const a = prije.map(kljuc).sort();
    const b = poslije.map(kljuc).sort();
    if (a.length !== b.length || a.some((k, i) => k !== b[i])) {
      problemi.push(ime + ': SKUP UNOSA SE PROMIJENIO (' + a.length + ' prije, ' + b.length + ' poslije) — ništa nije upisano');
    }
    if (ime === 'CHANGELOG' && !ostaju.some((x) => x.raketa) && poslije.some((x) => x.raketa)) {
      problemi.push('CHANGELOG.md nema nijedan 🚀 unos, a arhiva ima — „zadnji 🚀 redak" više ne govori istinu');
    }

    izvjestaj.push(ime + ': ' + prije.length + ' unosa · glavna ' + glavna.blokovi.length + ' → ' + ostaju.length +
      ' · premješteno ' + premjesteni.length +
      (premjesteni.length ? ' (' + Object.entries(poMjesecu).map(([m, l]) => m + ': ' + l.length).join(', ') + ')' : '') +
      ' · poslije ' + poslije.length);
  }

  const noviReadme = indeks(readme, sviMjeseci, problemi);
  if (noviReadme !== null) nove['../README.md'] = noviReadme;
  return { nove, izvjestaj, problemi };
}

function indeks(readme, sviMjeseci, problemi) {
  if (readme === undefined) { problemi.push('NEMA docs/README.md'); return null; }
  const i = readme.indexOf(OZNAKA_POCETAK);
  const j = readme.indexOf(OZNAKA_KRAJ);
  if (i < 0 || j < i) { problemi.push('docs/README.md nema oznake bloka ' + OZNAKA_POCETAK + ' … ' + OZNAKA_KRAJ); return null; }
  const eol = /\r\n/.test(readme) ? '\r\n' : '\n';
  const mjeseci = Object.keys(sviMjeseci).sort().reverse();
  const redci = [OZNAKA_POCETAK, ''];
  if (!mjeseci.length) redci.push('_Još nema zatvorenih mjeseci._');
  else {
    redci.push('| mjesec | ' + ZAPISI.map((z) => z.opis + ' (' + z.ime + ')').join(' | ') + ' |');
    redci.push('|---|' + ZAPISI.map(() => '---').join('|') + '|');
    for (const mj of mjeseci) {
      redci.push('| ' + mj + ' | ' + ZAPISI.map((z) => {
        const d = z.ime + '-' + mj + '.md';
        return sviMjeseci[mj][z.ime] ? '[' + d + '](./records/' + d + ')' : '—';
      }).join(' | ') + ' |');
    }
  }
  redci.push('');
  return readme.slice(0, i) + redci.join(eol) + readme.slice(j);
}

// ── disk ────────────────────────────────────────────────────────────

function citaj(korijen) {
  const mapa = path.join(korijen, 'docs', 'records');
  const datoteke = {};
  for (const d of fs.readdirSync(mapa)) {
    if (/^(PROGRESS|CHANGELOG)(-\d{4}-\d{2})?\.md$/.test(d)) datoteke[d] = fs.readFileSync(path.join(mapa, d), 'utf8');
  }
  const r = path.join(korijen, 'docs', 'README.md');
  return { mapa, datoteke, readme: fs.existsSync(r) ? fs.readFileSync(r, 'utf8') : undefined };
}

function sadrzajNa(stanje, ime) {
  return ime === '../README.md' ? stanje.readme : stanje.datoteke[ime];
}

/** Za `check:docs`: popis problema (prazan = u redu). Ne piše ništa. */
function provjeri(korijen, danas) {
  const stanje = citaj(korijen);
  const { nove, problemi } = rasporedi(stanje.datoteke, stanje.readme, danas || danasnji());
  const out = problemi.slice();
  const zastarjele = Object.keys(nove).filter((ime) => nove[ime] !== sadrzajNa(stanje, ime));
  if (zastarjele.length) {
    out.push('ZAPISI NISU ROTIRANI  ' + zastarjele.map((x) => (x === '../README.md' ? 'docs/README.md' : x)).join(', ') +
      '\n      → zatvoren mjesec u PROGRESS.md, unos stariji od zadnjeg 🚀 u CHANGELOG.md ili zastario popis u indeksu.' +
      '\n      → popravak: ' + POPRAVAK);
  }
  return out;
}

/** Izvedi rotaciju. Vraća { promijenjene: [imena], izvjestaj, problemi }. Uz problem ne piše NIŠTA. */
function rotiraj(korijen, danas) {
  const stanje = citaj(korijen);
  const { nove, izvjestaj, problemi } = rasporedi(stanje.datoteke, stanje.readme, danas || danasnji());
  if (problemi.length) return { promijenjene: [], izvjestaj, problemi };
  const promijenjene = Object.keys(nove).filter((ime) => nove[ime] !== sadrzajNa(stanje, ime));
  for (const ime of promijenjene) fs.writeFileSync(path.join(stanje.mapa, ime), nove[ime], 'utf8');
  return { promijenjene, izvjestaj, problemi };
}

module.exports = { parsiraj, rasporedi, provjeri, rotiraj, OZNAKA_POCETAK, OZNAKA_KRAJ };

if (require.main === module) {
  const args = process.argv.slice(2);
  const danasArg = (args.find((a) => a.startsWith('--danas=')) || '').slice(8) || undefined;
  const korijen = path.join(__dirname, '..');
  if (args.includes('--check')) {
    const p = provjeri(korijen, danasArg);
    if (p.length) { console.log('❌ docs:rotate --check\n' + p.map((x) => '   • ' + x).join('\n')); process.exit(1); }
    console.log('✅ docs:rotate --check: zapisi su rotirani');
    process.exit(0);
  }
  const { promijenjene, izvjestaj, problemi } = rotiraj(korijen, danasArg);
  izvjestaj.forEach((r) => console.log('  ' + r));
  if (problemi.length) {
    console.log('\n❌ ništa nije upisano:\n' + problemi.map((x) => '   • ' + x).join('\n'));
    process.exit(1);
  }
  console.log('\n✅ promijenjeno datoteka: ' + promijenjene.length + (promijenjene.length ? ' (' + promijenjene.join(', ') + ')' : ''));
}
