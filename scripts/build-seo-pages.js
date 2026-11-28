#!/usr/bin/env node
/**
 * build-seo-pages — katalog dobiva PRAVE adrese (2026-11-28)
 *
 * ── ZAŠTO ────────────────────────────────────────────────────────────────────────
 * Do danas je tražilica vidjela **5 stranica**, a katalog je nosio **59 predmeta i
 * 171 lekciju** — nijedno ime predmeta nije postojalo u posluženom HTML-u, jer sve
 * živi iza `#/subject/…`, a fragment nije zaseban URL. Mjereno 2026-08-24, zapisano
 * u `BACKLOG.md` kao *„arhitektonska odluka, ne cigla — namjerno stoji ovdje umjesto
 * u planu, da se ne izvede prije nego je odlučena."* Odlučena je 2026-11-27.
 *
 * `index.html` je taj uvjet nosio izrijekom: *„Kad predmeti dobiju prave adrese,
 * ovdje se dodaje i `Course`."* Ovo je te adrese.
 *
 * ── ZAŠTO GENERATOR, A NE SEOBA ROUTERA ──────────────────────────────────────────
 * Prave adrese kroz `history.pushState` tražile bi prepisivanje `navigation.js`,
 * `sw.js` i svakog testa rute — a ADR-040 kaže da Sokrat ide u održavanje. Ovo je
 * isti obrazac koji projekt već ima triput: **generator koji commita artefakt**
 * (`build:css` → `styles.bundle.css`, `build:og` → `og-cover.png`, `check-seo
 * --write` → `sitemap.xml`). Nema build-koraka na deployu, pa ADR-028 (Next.js
 * odbijen) ostaje netaknut.
 *
 * ── ZAŠTO BEZ HREFLANGA ──────────────────────────────────────────────────────────
 * Stranica nosi jezik SVOG PROGRAMA (`programs[].lang`) — 40 hrvatskih, 19
 * engleskih. To nije prijevod nego činjenica: gradivo JEST na tom jeziku i nema
 * para na drugom. `hreflang` opisuje prijevode, pa bi ovdje lagao. ADR-037
 * (*„hreflang se ne uvodi"*) ostaje netaknut.
 *
 * ── ŠTO EMITIRA ──────────────────────────────────────────────────────────────────
 *   predmet/<id>.html   po predmetu    — `Course` + `BreadcrumbList`
 *   program/<id>.html   po programu    — `CollectionPage`
 *   predmeti.html       čvor           — `CollectionPage`, poveznice na sve
 *
 * ⚠️ **NIŠTA SE NE PIŠE RUKOM.** Svaki naziv, opis, tema i broj izveden je iz
 * `data/catalog.js` i `data/json/`. Projekt je tu grešku već imao NA PRODUKCIJI
 * (landing je pisao 17 predmeta kad ih je bilo 22), pa je pravilo *„broj predmeta
 * se NIKAD ne piše rukom"*. Jedini tekst ovdje je okvir stranice (§TEKST).
 *
 * ⚠️ **TOKEN SE ČITA IZ `index.html`.** `bump-version.js` prepisuje `?v=` samo u
 * KORIJENSKIM `*.html`, pa bi stranice u podmapama zauvijek služile zamrznut CSS
 * (immutable cache 1 god = BUG-004). Dvije brane: generator uzima živi token, a
 * `bump-version.js` je proširen da obuhvati i ove stranice.
 *
 * ⚠️ **Naslov se NE sastavlja fiksnim sufiksom.** `check:seo` traži ≤ 60 znakova, a
 * najdulje ime predmeta danas ima 35 — zbroj s punim sufiksom je 61. Zato
 * `naslovZa()` bira NAJDULJI sufiks koji stane; nov predmet s dugim imenom time ne
 * može srušiti branu.
 *
 *   node scripts/build-seo-pages.js            # generiraj
 *   node scripts/build-seo-pages.js --check    # padni ako se disk razišao s katalogom
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://www.sokratstudy.com';
const CHECK = process.argv.includes('--check');

const OZNAKA = '<!-- GENERIRANO: scripts/build-seo-pages.js — ne uređuj ručno. ' +
  'Izvor: data/catalog.js + data/json/ -->';

const { SokratCatalog: K } = require(path.join(ROOT, 'data', 'catalog.js'));

// ── Tekst okvira (jedino što nije izvedeno iz podataka) ─────────────────────────
// Stoji ovdje, a ne u `js/i18n.js`: to je SADRŽAJ generirane stranice, ne tekst
// sučelja, i ne postoji u aplikaciji. `check:i18n` zato ove stranice preskače.
const T = {
  hr: {
    sufiksi: [' — kartice, kviz i skripta', ' — kartice i kviz', ' — Sokrat Study', ''],
    uci: 'Kreni učiti',
    uciOpis: 'Besplatno, bez prijave, radi i bez interneta.',
    lekcije: 'Gradivo',
    teme: 'Teme',
    primjeri: 'Primjeri iz gradiva',
    sveTeme: 'Sve teme oba dijela, plus pitanja za ponavljanje kroz cijelo gradivo.',
    // Hrvatski broji u tri oblika; „2 kartica" je greška koju bi svaki student vidio.
    kartica: ['kartica', 'kartice', 'kartica'],
    pitanja: ['pitanje u kvizu', 'pitanja u kvizu', 'pitanja u kvizu'],
    dopune: ['dopuna', 'dopune', 'dopuna'],
    naslovCvor: 'Svi predmeti',
    opisCvor: 'Gotovi predmeti za učenje — kartice, kviz, dopune i skripta za svaki.',
    cvorUvod: 'Svaki predmet ima kartice, kviz, dopune i skriptu. Otvori i uči odmah.',
    naslovProgram: 'Predmeti',
    sviPredmeti: 'Svi predmeti',
    pocetna: 'Naslovnica',
    godina: 'godina',
    semestar: 'semestar',
    svoje: 'Nema tvojeg predmeta? Napravi ga sam — od bilježaka do kartica u nekoliko minuta.',
    svojeCta: 'Napravi svoje gradivo'
  },
  en: {
    sufiksi: [' — flashcards, quiz and notes', ' — flashcards and quiz', ' — Sokrat Study', ''],
    uci: 'Start studying',
    uciOpis: 'Free, no sign-up, works offline.',
    lekcije: 'Material',
    teme: 'Topics',
    primjeri: 'Examples from the material',
    sveTeme: 'All topics from both parts, plus a cross-topic practice set.',
    kartica: ['flashcard', 'flashcards', 'flashcards'],
    pitanja: ['quiz question', 'quiz questions', 'quiz questions'],
    dopune: ['fill-in-the-blank', 'fill-in-the-blanks', 'fill-in-the-blanks'],
    naslovCvor: 'All subjects',
    opisCvor: 'Ready subjects to study — flashcards, quiz, blanks and notes for each.',
    cvorUvod: 'Every subject has flashcards, a quiz, blanks and notes. Open one and study.',
    naslovProgram: 'Subjects',
    sviPredmeti: 'All subjects',
    pocetna: 'Home',
    godina: 'year',
    semestar: 'semester',
    svoje: 'Your subject not here? Build it yourself — from notes to flashcards in minutes.',
    svojeCta: 'Make your own material'
  }
};

// ── Alat ────────────────────────────────────────────────────────────────────────

/** Živi cache-token. Jedan izvor: `index.html`, isti koji `npm run bump` prepisuje. */
function token() {
  const m = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').match(/\?v=(\d+)/);
  if (!m) throw new Error('index.html ne nosi ?v= token — je li `npm run bump` ikad pokrenut?');
  return m[1];
}

/** Svaki podatak koji ide u `innerHTML`/markup prolazi ovuda (BUG-024/025). */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** Tekst bez markupa — gradivo smije nositi `<strong>`, meta-opis ne smije. */
const bezTagova = (s) => String(s == null ? '' : s).replace(/<[^>]*>/g, ' ')
  .replace(/\s+/g, ' ').trim();

/**
 * Skrati na granici riječi, s elipsom samo ako je stvarno rezano.
 *
 * ⚠️ Mjeri se ESKEJPANA duljina, ne sirova. `&` u atributu zauzima 5 znakova
 * (`&amp;`), a i `check:seo` i tražilica čitaju upravo ono što stoji u atributu.
 * Prva verzija je brojila sirovo i šest opisa je ispalo 162–170 znakova.
 */
function skrati(s, n) {
  const t = bezTagova(s);
  if (esc(t).length <= n) return t;
  let out = '';
  for (const r of t.split(' ')) {
    const probni = out ? out + ' ' + r : r;
    if (esc(probni).length + 1 > n) break;
    out = probni;
  }
  if (!out) out = t.slice(0, Math.max(1, n - 1));
  return out.replace(/[,;:.\s]+$/, '') + '…';
}

/**
 * Najdulji sufiks koji drži naslov ispod 60 znakova (`check:seo` ④).
 * Prazan sufiks je zadnja rezerva: ime predmeta samo po sebi nikad nije >60.
 */
function naslovZa(ime, lang) {
  for (const suf of T[lang].sufiksi) {
    if (esc(ime + suf).length <= 60) return ime + suf;
  }
  return skrati(ime, 60);
}

/** Jezik stranice: `lang` programa, inače engleski. */
const jezikOf = (subject) => (K.uiLangOf(subject) === 'hr' ? 'hr' : 'en');

/**
 * Broj + imenica u ispravnom obliku.
 * Hrvatski ima TRI oblika (1 kartica · 2 kartice · 5 kartica), i bira ih po
 * ZADNJE dvije cifre: 11–14 idu u množinu iako završavaju na 1–4 („11 kartica",
 * ne „11 kartica"→„11 kartica"). Engleski koristi ista tri polja, samo su dva ista.
 */
function broji(n, oblici) {
  const d = n % 10;
  const dd = n % 100;
  const i = (d === 1 && dd !== 11) ? 0
    : (d >= 2 && d <= 4 && (dd < 12 || dd > 14)) ? 1
      : 2;
  return n + ' ' + oblici[i];
}

// ── Čitanje gradiva ─────────────────────────────────────────────────────────────

/**
 * Teme jedne lekcije iz `data/json/` — naziv, brojevi i nekoliko pravih kartica.
 * Vraća `null` kad datoteke nema: lekcija koja nije izvezena nije greška ovdje
 * (to mjeri `export:json --check`), nego samo nema što prikazati.
 */
function temeLekcije(subjectId, lessonId) {
  const varName = K.resolveDataVar(subjectId, lessonId);
  if (!varName) return null;
  const p = path.join(ROOT, 'data', 'json', subjectId, varName + '.json');
  if (!fs.existsSync(p)) return null;
  let j;
  try { j = JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { return null; }
  return Object.keys(j).map((kljuc) => {
    const c = j[kljuc] || {};
    return {
      kljuc,
      ime: c.name || kljuc,
      kartice: (c.flashcards || []).length,
      kviz: (c.quiz || []).length,
      dopune: (c.fillBlanks || []).length,
      uzorci: (c.flashcards || []).slice(0, 2).map((f) => ({
        q: bezTagova(f.question), a: bezTagova(f.answer)
      })).filter((x) => x.q && x.a)
    };
  });
}

/**
 * Gradivo predmeta po lekciji, bez dvostrukog ispisa.
 * `final` lekcija je spljoštena KOPIJA (M1 ⊕ M2) — njezine teme su već ispisane
 * gore, pa se takva lekcija označi kao „sve teme" umjesto da ponovi cijeli popis.
 */
function gradivoOf(subject) {
  const vidjene = new Set();
  return (subject.lessons || []).map((l) => {
    const teme = temeLekcije(subject.id, l.id);
    const red = { id: l.id, ime: l.name, opis: l.description, teme: teme || [], ponavlja: false };
    if (teme && teme.length) {
      // `final` je spljoštena KOPIJA: `Object.assign({}, M1, M2, { examPractice })`.
      // Prepoznaje se po tome da SADRŽI sve već viđene teme — ne po tome da nema
      // nijednu novu, jer `examPractice` je upravo nova. Prva verzija je pala na
      // tome i ispisala cijeli popis tema dvaput.
      const ovdje = new Set(teme.map((t) => t.kljuc));
      red.ponavlja = vidjene.size > 0 && [...vidjene].every((k) => ovdje.has(k));
      teme.forEach((t) => vidjene.add(t.kljuc));
    }
    return red;
  });
}

// ── Okvir stranice ──────────────────────────────────────────────────────────────

/**
 * `<head>` + zaglavlje + podnožje, isti obrazac koji već koriste pravne stranice:
 * `css/tokens.static.css` + `css/legal.css` (stranice bez bundlea), i18n/consent/
 * boot/no-zoom. Apsolutne putanje, jer stranica stoji u podmapi.
 *
 * ⚠️ `data-lang-fixed`: `boot.js` inače prepiše `<html lang>` jezikom SUČELJA. Na
 * stranici čiji je sadržaj na jednom jeziku to bi bila netočna tvrdnja o dokumentu
 * (WCAG 3.1.1 — isti kvar koji `boot.js` opisuje, samo obrnut). Atribut gasi SAMO
 * taj upis; `data-ui-lang` se i dalje postavlja, pa cookie-traka ostaje prevedena.
 */
function dokument({ lang, naslov, opis, url, tijelo, ld }) {
  const v = token();
  const t = T[lang];
  const sheme = ld.map((o) => '<script type="application/ld+json">\n' +
    JSON.stringify(o, null, 2) + '\n</script>').join('\n');

  return `<!DOCTYPE html>
${OZNAKA}
<html lang="${lang}" data-lang-fixed data-theme="academic">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>${esc(naslov)}</title>
    <meta name="description" content="${esc(opis)}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${esc(url)}">
    <meta property="og:title" content="${esc(naslov)}">
    <meta property="og:description" content="${esc(opis)}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Sokrat Study">
    <meta property="og:url" content="${esc(url)}">
    <meta property="og:image" content="${BASE}/og-cover.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="${lang === 'hr' ? 'hr_HR' : 'en_US'}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(naslov)}">
    <meta name="twitter:description" content="${esc(opis)}">
    <meta name="twitter:image" content="${BASE}/og-cover.png">
    <link rel="icon" type="image/svg+xml" href="/assets/logo.svg?v=${v}">
    <!-- paleta: GENERIRAN izvadak tokena iz bundlea; MORA prije legal.css -->
    <link rel="stylesheet" href="/css/tokens.static.css?v=${v}">
    <link rel="stylesheet" href="/css/legal.css?v=${v}">
    <link rel="stylesheet" href="/css/consent.css?v=${v}">
    <script src="/js/i18n.js?v=${v}" defer></script>
    <script src="/js/consent.js?v=${v}" defer></script>
    <script src="/js/no-zoom.js?v=${v}" defer></script>
${sheme}
</head>
<body>
<script src="/js/boot.js?v=${v}"></script>
    <header class="legal-nav">
        <!-- prazan alt: znak stoji uz vidljivo ime u istoj poveznici, pa bi ga opisan alt izgovorio dvaput -->
        <a class="legal-logo" href="/"><img src="/assets/logo.svg?v=${v}" alt="">Sokrat Study</a>
        <div class="legal-nav-actions">
            <a class="legal-back" href="/">&larr; ${esc(t.pocetna)}</a>
        </div>
    </header>
    <main class="legal">
${tijelo}
    </main>
    <footer class="legal-footer">
        <nav>
            <a href="/">${esc(t.pocetna)}</a>
            <a href="/predmeti.html">${esc(t.sviPredmeti)}</a>
            <a href="/faq.html">FAQ</a>
            <a href="/privacy.html">Privacy Policy</a>
            <a href="/terms.html">Terms of Use</a>
            <a href="/contact.html">Contact</a>
            <a href="#" data-consent-settings data-i18n="footer.cookies">Cookie settings</a>
        </nav>
        <p>&copy; 2026 Sokrat Study &middot; Leon Kreso</p>
    </footer>
</body>
</html>
`;
}

// ── Stranica predmeta ───────────────────────────────────────────────────────────

function stranicaPredmeta(subject) {
  const lang = jezikOf(subject);
  const t = T[lang];
  const prog = K.getProgram(subject.programId) || {};
  const url = `${BASE}/predmet/${subject.id}.html`;
  const naslov = naslovZa(subject.name, lang);
  const opis = skrati(subject.description || subject.name, 160);
  const gradivo = gradivoOf(subject);

  const dijelovi = [];
  dijelovi.push('        <div class="legal-card">');
  dijelovi.push(`        <h1>${esc(subject.name)}</h1>`);
  dijelovi.push(`        <p>${esc(bezTagova(subject.description))}</p>`);
  dijelovi.push(`        <p><strong>${esc(prog.name || '')}</strong>` +
    (prog.facultyName ? ` · ${esc(prog.facultyName)}` : '') +
    ` · ${subject.year}. ${esc(t.godina)}, ${subject.semester}. ${esc(t.semestar)}</p>`);
  dijelovi.push(`        <p><a class="legal-back" href="/#/subject/${encodeURIComponent(subject.id)}">` +
    `${esc(t.uci)} &rarr;</a><br><small>${esc(t.uciOpis)}</small></p>`);
  dijelovi.push('        </div>');

  dijelovi.push(`        <h2>${esc(t.lekcije)}</h2>`);
  for (const l of gradivo) {
    dijelovi.push('        <div class="legal-card">');
    dijelovi.push(`        <h3>${esc(l.ime)}</h3>`);
    if (l.opis) dijelovi.push(`        <p>${esc(bezTagova(l.opis))}</p>`);

    if (l.ponavlja) {
      // Opis iz kataloga već kaže da su to sve teme; rezerva je za lekciju bez opisa.
      if (!l.opis) dijelovi.push(`        <p>${esc(t.sveTeme)}</p>`);
      dijelovi.push('        </div>');
      continue;
    }
    if (!l.teme.length) { dijelovi.push('        </div>'); continue; }

    const k = l.teme.reduce((n, x) => n + x.kartice, 0);
    const q = l.teme.reduce((n, x) => n + x.kviz, 0);
    const d = l.teme.reduce((n, x) => n + x.dopune, 0);
    dijelovi.push(`        <p>${esc(broji(k, t.kartica))} · ${esc(broji(q, t.pitanja))}` +
      ` · ${esc(broji(d, t.dopune))}</p>`);
    dijelovi.push('        <ul>');
    for (const tema of l.teme) dijelovi.push(`            <li>${esc(tema.ime)}</li>`);
    dijelovi.push('        </ul>');
    dijelovi.push('        </div>');
  }

  // Uzorak gradiva: po jedna kartica iz prvih tema, da stranica vrijedi i bez klika.
  const uzorci = [];
  for (const l of gradivo) {
    if (l.ponavlja) continue;
    for (const tema of l.teme) {
      if (tema.uzorci.length) uzorci.push(tema.uzorci[0]);
      if (uzorci.length >= 8) break;
    }
    if (uzorci.length >= 8) break;
  }
  if (uzorci.length) {
    dijelovi.push(`        <h2>${esc(t.primjeri)}</h2>`);
    dijelovi.push('        <div class="legal-card">');
    dijelovi.push('        <dl>');
    for (const u of uzorci) {
      dijelovi.push(`            <dt>${esc(u.q)}</dt>`);
      dijelovi.push(`            <dd>${esc(skrati(u.a, 240))}</dd>`);
    }
    dijelovi.push('        </dl>');
    dijelovi.push('        </div>');
  }

  dijelovi.push(`        <p>${esc(t.svoje)} <a href="/editor.html">${esc(t.svojeCta)}</a></p>`);

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: subject.name,
      description: bezTagova(subject.description || subject.name),
      url,
      inLanguage: lang,
      isAccessibleForFree: true,
      // ⚠️ `Set`, i bez lekcije koja PONAVLJA. Prva verzija je ravno spljoštila sve lekcije,
      // pa je `final` (kopija M1 ⊕ M2) vratio svaku temu DVAPUT — shema je tvrdila da predmet
      // uči „Što je sociologija?" dva puta. Ispis je bio ispravan jer se ondje ponavljanje
      // skriva; shema je išla mimo tog puta. Nađeno tek čitanjem posluženog HTML-a na deployu.
      teaches: [...new Set(gradivo.filter((l) => !l.ponavlja).flatMap((l) => l.teme.map((x) => x.ime)))].slice(0, 30),
      provider: { '@type': 'EducationalOrganization', name: 'Sokrat Study', url: BASE + '/' },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: 'PT1H'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: T[lang].pocetna, item: BASE + '/' },
        { '@type': 'ListItem', position: 2, name: T[lang].sviPredmeti, item: BASE + '/predmeti.html' },
        { '@type': 'ListItem', position: 3, name: subject.name, item: url }
      ]
    }
  ];

  return dokument({ lang, naslov, opis, url, tijelo: dijelovi.join('\n'), ld });
}

// ── Stranica programa ───────────────────────────────────────────────────────────

function stranicaPrograma(prog) {
  const subs = K.all().filter((s) => s.programId === prog.id)
    .sort((a, b) => (a.year - b.year) || (a.semester - b.semester) || a.name.localeCompare(b.name));
  const lang = prog.lang === 'hr' ? 'hr' : 'en';
  const t = T[lang];
  const url = `${BASE}/program/${prog.id}.html`;
  const naslov = naslovZa(prog.name, lang);
  const opis = skrati(`${prog.name} — ${prog.facultyName || ''}. ${t.cvorUvod}`, 160);

  const d = [];
  d.push(`        <h1>${esc(prog.name)}</h1>`);
  if (prog.facultyName) d.push(`        <p>${esc(prog.facultyName)}</p>`);
  d.push(`        <p>${esc(t.cvorUvod)}</p>`);

  let godina = null;
  for (const s of subs) {
    if (s.year !== godina) {
      godina = s.year;
      d.push(`        <h2>${godina}. ${esc(t.godina)}</h2>`);
      d.push('        <ul>');
    }
    d.push(`            <li><a href="/predmet/${encodeURIComponent(s.id)}.html">${esc(s.name)}</a>` +
      ` — ${esc(skrati(s.description, 120))}</li>`);
    const sljedeci = subs[subs.indexOf(s) + 1];
    if (!sljedeci || sljedeci.year !== godina) d.push('        </ul>');
  }

  const ld = [{
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: prog.name,
    url,
    inLanguage: lang,
    hasPart: subs.map((s) => ({
      '@type': 'Course',
      name: s.name,
      url: `${BASE}/predmet/${s.id}.html`
    }))
  }];

  return dokument({ lang, naslov, opis, url, tijelo: d.join('\n'), ld });
}

// ── Čvor ────────────────────────────────────────────────────────────────────────

function cvor() {
  const lang = 'hr'; // Tri od četiri programa su hrvatska, a čvor je ulaz iz hrvatske tražilice.
  const t = T[lang];
  const url = `${BASE}/predmeti.html`;
  const d = [];
  d.push(`        <h1>${esc(t.naslovCvor)}</h1>`);
  d.push(`        <p>${esc(t.cvorUvod)}</p>`);

  for (const f of K.faculties()) {
    d.push(`        <h2>${esc(f.name)}</h2>`);
    for (const p of K.programsOf(f.id)) {
      const subs = K.all().filter((s) => s.programId === p.id)
        .sort((a, b) => (a.year - b.year) || a.name.localeCompare(b.name));
      if (!subs.length) continue;
      d.push(`        <h3><a href="/program/${encodeURIComponent(p.id)}.html">${esc(p.name)}</a></h3>`);
      d.push('        <ul>');
      for (const s of subs) {
        d.push(`            <li><a href="/predmet/${encodeURIComponent(s.id)}.html">${esc(s.name)}</a>` +
          ` <small>${s.year}. ${esc(t.godina)}</small></li>`);
      }
      d.push('        </ul>');
    }
  }
  d.push(`        <p>${esc(t.svoje)} <a href="/editor.html">${esc(t.svojeCta)}</a></p>`);

  const ld = [{
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t.naslovCvor,
    url,
    inLanguage: ['hr', 'en'],
    hasPart: K.all().map((s) => ({
      '@type': 'Course',
      name: s.name,
      url: `${BASE}/predmet/${s.id}.html`
    }))
  }];

  return dokument({
    lang, naslov: naslovZa(t.naslovCvor, lang), opis: t.opisCvor, url,
    tijelo: d.join('\n'), ld
  });
}

// ── Izvedba ─────────────────────────────────────────────────────────────────────

function sve() {
  const out = new Map();
  for (const s of K.all()) out.set(path.join('predmet', s.id + '.html'), stranicaPredmeta(s));
  for (const f of K.faculties()) {
    for (const p of K.programsOf(f.id)) {
      out.set(path.join('program', p.id + '.html'), stranicaPrograma(p));
    }
  }
  out.set('predmeti.html', cvor());
  return out;
}

const stranice = sve();

if (CHECK) {
  const razlike = [];
  for (const [rel, html] of stranice) {
    const p = path.join(ROOT, rel);
    if (!fs.existsSync(p)) { razlike.push('nema: ' + rel); continue; }
    if (fs.readFileSync(p, 'utf8') !== html) razlike.push('razišlo se: ' + rel);
  }
  // Stranica predmeta koji je IZAŠAO iz kataloga ostala bi u sitemapu kao mrtva adresa.
  for (const mapa of ['predmet', 'program']) {
    const dir = path.join(ROOT, mapa);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith('.html') && !stranice.has(path.join(mapa, f))) razlike.push('višak: ' + mapa + '/' + f);
    }
  }
  if (razlike.length) {
    console.error('\n❌ generirane stranice se razišle s katalogom (' + razlike.length + '):\n');
    razlike.slice(0, 20).forEach((r) => console.error('   · ' + r));
    if (razlike.length > 20) console.error('   … i još ' + (razlike.length - 20));
    console.error('\n   Popravak: npm run build:seo && node scripts/check-seo.js --write\n');
    process.exit(1);
  }
  console.log('✅ build:seo — ' + stranice.size + ' stranica se poklapa s katalogom.');
  process.exit(0);
}

for (const mapa of ['predmet', 'program']) {
  fs.mkdirSync(path.join(ROOT, mapa), { recursive: true });
}
let pisano = 0;
for (const [rel, html] of stranice) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p) || fs.readFileSync(p, 'utf8') !== html) { fs.writeFileSync(p, html, 'utf8'); pisano++; }
}
// Predmet izbačen iz kataloga → njegova stranica ide s njim, inače je mrtva adresa.
for (const mapa of ['predmet', 'program']) {
  const dir = path.join(ROOT, mapa);
  for (const f of fs.readdirSync(dir)) {
    if (f.endsWith('.html') && !stranice.has(path.join(mapa, f))) {
      fs.unlinkSync(path.join(dir, f));
      console.log('  − ' + mapa + '/' + f + ' (predmeta više nema u katalogu)');
    }
  }
}
console.log('✎ build:seo — ' + stranice.size + ' stranica (' + pisano + ' izmijenjeno).');
console.log('   Sljedeće: node scripts/check-seo.js --write   (sitemap)');
