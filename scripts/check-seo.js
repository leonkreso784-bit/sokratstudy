#!/usr/bin/env node
/**
 * check-seo — ono što tražilica i pretpregled linka VIDE (2026-08-24)
 *
 * ── ZAŠTO ────────────────────────────────────────────────────────────────────────
 * Zatečeno stanje: `meta description` je platformu opisivao kao ispitnu pripremu za
 * **jedan smjer jednog fakulteta**, `og:image` je bio **kvadratna ikona 512×512**
 * (umjesto 1200×630), a `robots.txt` i `sitemap.xml` **nisu postojali**. Ništa od toga
 * nije mjerila nijedna brana, jer nijedna nije gledala `<head>`.
 *
 * ⚠️ **POPIS STRANICA SE ČITA S DISKA, NE PIŠE RUČNO.** Projekt je isto pravilo već
 * platio dvaput u T6: `check:cdn` i `check:tailwind` imali su ručne popise i prva nova
 * stranica (`editor.html`) ih je pregazila. *Brana koja ovisi o tome da se netko sjeti
 * nije brana nego bilješka.* Zato se i `sitemap.xml` ovdje **generira**, ne održava.
 *
 * ── ŠTO SE MJERI ─────────────────────────────────────────────────────────────────
 *   ① SITEMAP   sadrži TOČNO one stranice koje su indeksabilne (nema `noindex`)
 *   ② ROBOTS    postoji i imenuje sitemap
 *   ③ HEAD      `index.html` ima naslov, opis, canonical i pun OG/Twitter set
 *   ④ DULJINE   naslov ≤ 60, opis ≤ 160 znakova (inače ih tražilica reže)
 *   ⑤ JEDNA PRIČA  `og:title` == `<title>`, `twitter:description` == `description`
 *   ⑥ KARTICA   `og:image` postoji na disku i stvarno je 1200×630
 *
 * ⑤ postoji jer je zatečeno stanje imalo TRI različita opisa (`description`,
 * `og:description`, `twitter:description`) — svaki je govorio malo drugačije, i svaki
 * bi se pri sljedećoj izmjeni razišao još malo. *Ako je jedna priča, mora biti jedan
 * tekst.*
 *
 * Bez mreže i bez preglednika → **u preflightu**.
 *
 *   node scripts/check-seo.js            # provjeri
 *   node scripts/check-seo.js --write    # regeneriraj sitemap.xml iz stanja na disku
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://www.sokratstudy.com/';
const WRITE = process.argv.includes('--write');

let greske = 0;
const ok = (m) => console.log('  ✓ ' + m);
const fail = (m) => { greske++; console.log('  ✗ ' + m); };

/**
 * Mape koje se OBJAVLJUJU i smiju nositi stranice.
 *
 * ⚠️ Do 2026-11-28 je ovaj popis bio samo korijen, i to je bila RUPA, ne izbor:
 * `design/mockups/*.html` i `supabase/email-templates/*.html` vraćali su **200 s
 * produkcije**, bez `noindex` i bez reda u sitemapu — a brana ih nije vidjela jer
 * nije gledala nijednu podmapu. Zaglavlje se hvalilo da popis čita s diska, a
 * čitalo je jednu razinu diska. Sada se **objavljeno izvodi iz `.vercelignore`**:
 * mapa koju deploy ne nosi ne može ni ući u indeks.
 */
function pravilaIzVercelignore() {
  const vp = path.join(ROOT, '.vercelignore');
  if (!fs.existsSync(vp)) return null;
  return fs.readFileSync(vp, 'utf8').split('\n')
    .map((l) => l.trim().replace(/\/$/, ''))
    .filter((l) => l && !l.startsWith('#'));
}

function objavljeneMape() {
  const iskljuceno = pravilaIzVercelignore() || [];
  return fs.readdirSync(ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((d) => !d.startsWith('.') && d !== 'node_modules')
    .filter((d) => iskljuceno.indexOf(d) === -1);
}

/** Sve `*.html` koje deploy objavljuje — korijen + svaka objavljena podmapa. */
function sveStranice() {
  const out = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
  for (const d of objavljeneMape()) {
    const dir = path.join(ROOT, d);
    for (const f of fs.readdirSync(dir)) {
      if (f.endsWith('.html')) out.push(d + '/' + f);
    }
  }
  return out.sort();
}

/** Stranice koje tražilica smije indeksirati. */
function indeksabilne() {
  return sveStranice().filter((f) => {
    const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
    // `noindex` bilo gdje u `<head>` isključuje stranicu (editor.html).
    return !/name=["']robots["'][^>]*noindex|noindex[^>]*name=["']robots["']/i.test(html);
  });
}

/** URL kakav ide u sitemap: `index.html` je korijen, ostalo zadržava putanju. */
const urlZa = (f) => BASE + (f === 'index.html' ? '' : f);

function metaIz(html, atribut, ime) {
  const re = new RegExp('<meta\\s+' + atribut + '=["\']' + ime.replace(/:/g, ':') +
    '["\']\\s+content=["\']([^"\']*)["\']', 'i');
  const m = html.match(re);
  return m ? m[1] : null;
}

/** Dimenzije PNG-a iz zaglavlja (IHDR) — bez ijedne ovisnosti. */
function pngDim(file) {
  const b = fs.readFileSync(file);
  if (b.length < 24 || b.readUInt32BE(0) !== 0x89504e47) return null;
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}

function sitemapXml(stranice) {
  const url = (f) => '  <url>\n    <loc>' + urlZa(f) + '</loc>\n  </url>';
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<!-- GENERIRANO — ne uređuj ručno. Izvor: stanje na disku → node scripts/check-seo.js --write\n' +
    '     Namjerno BEZ <lastmod>: datum koji nitko ne održava je datum koji laže, a\n' +
    '     tražilica ga tada ionako ignorira.\n' +
    '     Namjerno BEZ hash-ruta (#/subject/...): fragment nije zaseban URL za tražilicu,\n' +
    '     pa bi ih navesti značilo prijaviti stranice koje ne postoje. -->\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    stranice.map(url).join('\n') + '\n</urlset>\n';
}

console.log('\n=== check:seo — što vide tražilica i pretpregled linka ===\n');

const stranice = indeksabilne();
console.log('   indeksabilnih stranica na disku: ' + stranice.length +
  '  (' + stranice.join(', ') + ')\n');

// ── ① SITEMAP ────────────────────────────────────────────────────────────────────
const smPath = path.join(ROOT, 'sitemap.xml');
if (WRITE) {
  fs.writeFileSync(smPath, sitemapXml(stranice), 'utf8');
  console.log('  ✎ sitemap.xml regeneriran (' + stranice.length + ' URL-ova)\n');
}
if (!fs.existsSync(smPath)) {
  fail('sitemap.xml ne postoji — pokreni `node scripts/check-seo.js --write`');
} else {
  const sm = fs.readFileSync(smPath, 'utf8');
  const uSitemapu = (sm.match(/<loc>([^<]+)<\/loc>/g) || [])
    .map((x) => x.replace(/<\/?loc>/g, '')).sort();
  const ocekivano = stranice.map(urlZa).sort();
  const visak = uSitemapu.filter((u) => ocekivano.indexOf(u) === -1);
  const manjak = ocekivano.filter((u) => uSitemapu.indexOf(u) === -1);
  if (visak.length) fail('sitemap navodi stranicu koje nema (ili je noindex): ' + visak.join(', '));
  if (manjak.length) fail('sitemap NE navodi indeksabilnu stranicu: ' + manjak.join(', '));
  if (!visak.length && !manjak.length) ok('sitemap.xml se poklapa s diskom (' + uSitemapu.length + ' URL-ova)');
}

// ── ② ROBOTS ─────────────────────────────────────────────────────────────────────
const robotsPath = path.join(ROOT, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  fail('robots.txt ne postoji');
} else {
  const r = fs.readFileSync(robotsPath, 'utf8');
  if (r.indexOf('Sitemap:') === -1) fail('robots.txt ne imenuje sitemap');
  else ok('robots.txt postoji i imenuje sitemap');
  // ⚠️ `Disallow` na stranici koja nosi `noindex` je KONTRAPRODUKTIVAN: zabrani li se
  // obilazak, robot nikad ne pročita `noindex` — pa stranica može ostati u indeksu.
  if (/^\s*Disallow:\s*\/editor\.html/mi.test(r)) {
    fail('robots.txt zabranjuje `editor.html`, a ta stranica nosi `noindex` — ' +
      'zabrana obilaska SPRJEČAVA čitanje noindexa. Ukloni Disallow.');
  }
}

// ── ⑧ NIJEDAN `.md` NIJE U DEPLOYU ───────────────────────────────────────────────
// Cigla koju je Leon propisao 30.09. uz odluku „sakriti samo sa stranice": *nabroji
// `.md` iz repoa i tvrdi da nijedan nije u deployu*. Izmjereno tada i ponovno
// 28.11.: `/CLAUDE.md`, `/docs/README.md`, `/scripts/check-seo.js` → **200**.
// Projekt nije imao `.vercelignore`, pa je Vercel posluživao svaku datoteku iz repoa.
//
// Mjeri se POPIS S DISKA, ne pamćenje: nov `.md` bilo gdje automatski pada pod
// `*.md`, a obriše li netko to pravilo, brana padne. *Nepovezano nije privatno.*
const pravila = pravilaIzVercelignore();
if (!pravila) {
  fail('.vercelignore ne postoji — Vercel tada poslužuje SVAKU datoteku iz repoa (CLAUDE.md, docs/, scripts/)');
} else {
  const pokriva = (rel) => pravila.some((p) => (p === '*.md' ? rel.endsWith('.md') : (rel === p || rel.startsWith(p + '/'))));
  const svi = [];
  (function hodaj(dir, pref) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue;
      const rel = pref ? pref + '/' + e.name : e.name;
      if (e.isDirectory()) hodaj(path.join(dir, e.name), rel);
      else if (e.name.endsWith('.md')) svi.push(rel);
    }
  }(ROOT, ''));
  const izlozeni = svi.filter((f) => !pokriva(f));
  if (izlozeni.length) {
    fail(izlozeni.length + ' `.md` bi se javno posluživalo (npr. ' + izlozeni.slice(0, 3).join(', ') +
      ') — dodaj pravilo u `.vercelignore`');
  } else ok('nijedan od ' + svi.length + ' `.md` nije u deployu');
}

// ── ③–⑤ HEAD, ZA SVAKU INDEKSABILNU STRANICU ─────────────────────────────────────
// Do 2026-11-28 su se ③–⑤ mjerile SAMO na `index.html`, jer su ostale četiri bile
// pravne stranice bez ikakvog OG-a. Otkad katalog ima prave adrese, svaka od njih je
// ulaz iz tražilice — pa svaka mora nositi istu priču, i svaka se mjeri.
const POLJA = ['<title>', 'description', 'canonical', 'og:title', 'og:description',
  'og:image', 'og:url', 'og:type', 'twitter:card', 'twitter:title',
  'twitter:description', 'twitter:image'];

function glavaOf(h) {
  return {
    '<title>': (h.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1],
    description: metaIz(h, 'name', 'description'),
    canonical: (h.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/) || [])[1],
    'og:title': metaIz(h, 'property', 'og:title'),
    'og:description': metaIz(h, 'property', 'og:description'),
    'og:image': metaIz(h, 'property', 'og:image'),
    'og:url': metaIz(h, 'property', 'og:url'),
    'og:type': metaIz(h, 'property', 'og:type'),
    'twitter:card': metaIz(h, 'name', 'twitter:card'),
    'twitter:title': metaIz(h, 'name', 'twitter:title'),
    'twitter:description': metaIz(h, 'name', 'twitter:description'),
    'twitter:image': metaIz(h, 'name', 'twitter:image')
  };
}

let posrnulo = 0;
for (const f of stranice) {
  const h = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const g = glavaOf(h);
  const prije = greske;

  const prazna = POLJA.filter((k) => !g[k]);
  if (prazna.length) fail(f + ' nema: ' + prazna.join(', '));

  if (g['<title>'] && g['<title>'].length > 60) {
    fail(f + ': <title> je ' + g['<title>'].length + ' znakova — tražilica reže na ~60');
  }
  if (g.description && g.description.length > 160) {
    fail(f + ': description je ' + g.description.length + ' znakova — reže se na ~160');
  }
  // ⑤ jedna priča, jedan tekst
  if (g['<title>'] && g['og:title'] && g['<title>'] !== g['og:title']) {
    fail(f + ': `og:title` se razišao s `<title>`');
  }
  if (g.description && g['twitter:description'] && g.description !== g['twitter:description']) {
    fail(f + ': `twitter:description` se razišao s `description`');
  }
  // ⚠️ `og:description` do 2026-11-28 NIJE bio mjeren, i naslovnica je zato opet nosila
  // DVIJE različite rečenice — točno stanje koje je ⑤ 2026-08-24 trebala ukinuti
  // („zatečeno stanje imalo je TRI različita opisa"). Nemjerena polovica pravila se raziđe.
  if (g.description && g['og:description'] && g.description !== g['og:description']) {
    fail(f + ': `og:description` se razišao s `description` — jedna priča, jedan tekst');
  }
  // Canonical koji pokazuje na DRUGU stranicu briše stranicu iz indeksa — a to je
  // najtiši od svih mogućih kvarova: stranica radi, samo je tražilica ne drži.
  if (g.canonical && g.canonical !== urlZa(f)) {
    fail(f + ': canonical je ' + g.canonical + ', a stranica stoji na ' + urlZa(f));
  }
  if (g['og:url'] && g['og:url'] !== urlZa(f)) {
    fail(f + ': `og:url` je ' + g['og:url'] + ', a stranica stoji na ' + urlZa(f));
  }
  // ⑦ JSON-LD: mjeri se da PARSIRA. Neispravan blok tražilica tiho odbaci, pa bi
  // „ima ga" prolazilo i nad pokvarenim.
  for (const blok of h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || []) {
    const tijelo = blok.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '');
    try {
      const o = JSON.parse(tijelo);
      if (!o['@type']) fail(f + ': JSON-LD blok bez `@type`');
    } catch (e) {
      fail(f + ': JSON-LD ne parsira — tražilica bi ga tiho odbacila: ' + e.message);
    }
  }
  if (greske > prije) posrnulo++;
}
if (posrnulo === 0) ok('sve ' + stranice.length + ' stranica: pun set, duljine, jedna priča, canonical, JSON-LD');
else fail(posrnulo + ' od ' + stranice.length + ' stranica ima problem u <head>');

// ── ⑥ KARTICA + naslovnica ───────────────────────────────────────────────────────
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const naslov = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
const opis = metaIz(html, 'name', 'description');
const ogImage = metaIz(html, 'property', 'og:image');
console.log('   naslovnica: <title> ' + (naslov || '').length + ' znakova · description ' +
  (opis || '').length + ' znakova');

// ⑥ kartica
if (ogImage) {
  const rel = ogImage.replace(BASE, '').replace(/^\//, '');
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) {
    fail('`og:image` pokazuje na ' + rel + ', a te datoteke nema u repozitoriju');
  } else {
    const d = pngDim(p);
    if (!d) fail(rel + ' nije PNG koji umijem pročitati');
    else if (d.w !== 1200 || d.h !== 630) {
      fail('`og:image` je ' + d.w + '×' + d.h + ' — mreže traže 1200×630 ' +
        '(regeneriraj: node scripts/build-og-image.js)');
    } else ok('`og:image` ' + rel + ' je 1200×630');
  }
}

// ── ⑦ NASLOVNICA NOSI IDENTITET ──────────────────────────────────────────────────
// Parsiranje svakog bloka mjeri petlja gore; ovdje se traži samo ono što je
// SPECIFIČNO za naslovnicu: da postoji blok koji imenuje organizaciju. Shema smije
// rasti, ali identitet ne smije ispasti.
const ldBlokovi = (html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [])
  .map((b) => { try { return JSON.parse(b.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '')); } catch (e) { return null; } })
  .filter(Boolean);
if (!ldBlokovi.length) fail('index.html nema JSON-LD blok');
else if (!ldBlokovi.some((o) => o['@type'] && o.name)) fail('nijedan JSON-LD blok naslovnice ne nosi `@type` + `name`');
else ok('naslovnica: JSON-LD (' + ldBlokovi.map((o) => o['@type']).join(', ') + ')');

console.log('\n' + (greske === 0
  ? '✅ čisto — tražilica i pretpregled vide ono što smo namjeravali.\n'
  : '❌ ' + greske + ' problem(a).\n'));
process.exit(greske === 0 ? 0 : 1);
