#!/usr/bin/env node
/**
 * check-palette.js — ČEGRTALJKA ZA STARU PALETU  (cigla C2)
 *
 * ŠTO MJERI: koliko je u `css/` ostalo boja iz STARE, naslijeđene palete
 * (Tailwindovi zadani indigo/slate: #6366f1, #0f172a, #334155, #94a3b8 …) —
 * i to u OBA oblika u kojima se skrivaju: kao hex i kao `rgb()/rgba()`.
 *
 * ZAŠTO POSTOJI: pri prelasku na paletu „Ponoć i menta" (C2) most u
 * `css/variables.css` prebojao je 992 `var()` poziva jednim editom. Ali revizija
 * je tada gledala samo hex-oblik i zaključila da je ostalo ~78 mjesta. Stvarni broj
 * bio je tri puta veći: dodatnih **206 boja skrivenih u `rgba()`** — glow-ovi,
 * hover-tintovi i rubovi, kojih hex-pretraga ne vidi jer u njima piše
 * `rgba(99, 102, 241, .12)`, a ne `#6366f1`. Da gate nije napisan, taj ostatak bi
 * se otkrivao jedan po jedan, okom, kroz sljedećih pet cigli.
 *
 * ZAŠTO ČEGRTALJKA, A NE ZABRANA: ostatak se ne popravlja prebojavanjem nego
 * NESTAJE zajedno s površinama koje ga koriste (C3–C7), a §7.2.3 kaže da ti glow-ovi
 * uopće ne trebaju dobiti novu boju — trebaju biti obrisani. Zato gate ne traži nulu
 * odmah, nego samo da broj NIKAD NE PORASTE. Kad cigla obriše površinu, spusti se
 * osnovica (`node scripts/check-palette.js --update`) i ta razina postaje nova brana.
 *
 * IZLAZNI CILJ: sve nule. Tada ovaj gate postaje obična zabrana i seli se u preflight
 * kao takav (izlazni uvjet §2: „nijedna hex-boja izvan @theme").
 */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CSS_DIR = path.join(ROOT, 'css');

/* Stara paleta = Tailwindovi zadani tonovi koje smo naslijedili, nikad izabrali.
   Ime uz svaku vrijednost postoji da izvještaj kaže ŠTO je nađeno, ne samo gdje. */
const OLD = [
  ['#6366f1', [99, 102, 241], 'indigo-500 (stari --primary)'],
  ['#4f46e5', [79, 70, 229], 'indigo-600'],
  ['#4338ca', [67, 56, 202], 'indigo-700'],
  ['#818cf8', [129, 140, 248], 'indigo-400'],
  ['#a5b4fc', [165, 180, 252], 'indigo-300'],
  ['#c7d2fe', [199, 210, 254], 'indigo-200'],
  ['#8b5cf6', [139, 92, 246], 'violet-500'],
  ['#7c3aed', [124, 58, 237], 'violet-600'],
  ['#a78bfa', [167, 139, 250], 'violet-400'],
  ['#c4b5fd', [196, 181, 253], 'violet-300'],
  ['#0f172a', [15, 23, 42], 'slate-900 (stari --bg-primary)'],
  ['#1e293b', [30, 41, 59], 'slate-800'],
  ['#334155', [51, 65, 85], 'slate-700'],
  ['#475569', [71, 85, 105], 'slate-600'],
  ['#64748b', [100, 116, 139], 'slate-500'],
  ['#94a3b8', [148, 163, 184], 'slate-400'],
  ['#e2e8f0', [226, 232, 240], 'slate-200'],
  ['#f1f5f9', [241, 245, 249], 'slate-100'],

  /* ⚠️ ZAKUCANA BIJELA I CRNA — za VIŠE TEMA fatalnije od indiga.
     Indigo na krivoj podlozi je neusklađen; `color: rgba(255,255,255,.9)` na
     papirnatoj temi je NEVIDLJIV. Nađeno u `learn.css`, gdje pravila pod
     `[data-theme="dark"]` boje tekst kartica bijelim, i u `landing.css` (23×).
     Prva verzija ovog gatea ih nije gledala jer je tražila samo staru paletu —
     a upravo su one prag koji odlučuje smije li se svijetla tema uopće uključiti.
     Ispravno je `var(--color-ink-0)` / `var(--color-surface-1)`, ne bijela. */
  ['#ffffff', [255, 255, 255], 'bijela (nevidljiva na svijetlim temama)'],
  ['#fff', null, 'bijela (nevidljiva na svijetlim temama)'],
  ['#000000', [0, 0, 0], 'crna (nevidljiva na tamnim temama)'],
  ['#000', null, 'crna (nevidljiva na tamnim temama)'],
];

/* OSNOVICA — koliko ih smije ostati po datoteci. Spuštaj je, nikad ne diži.
   Uz svaku stoji cigla u kojoj ta površina umire, da se vidi kad se broj SMIJE
   očekivati na nuli. Regeneracija: `node scripts/check-palette.js --update`. */
const BASELINE = require('./palette-baseline.json');

/** Komentari se NE broje — u njima namjerno pišu stare vrijednosti (npr. „#6366f1 = indigo-500"). */
function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

function countIn(css) {
  const hits = [];
  for (const [hex, rgb, label] of OLD) {
    /* ⚠️ Negativni lookahead je OBAVEZAN: bez njega uzorak `#fff` pogađa i prva
       četiri znaka `#ffffff`, pa se ista deklaracija broji dvaput i osnovica laže. */
    const reHex = new RegExp(hex + '(?![0-9a-f])', 'gi');
    let n = (css.match(reHex) || []).length;
    if (rgb) {
      const [r, g, b] = rgb;
      const reRgb = new RegExp('rgba?\\(\\s*' + r + '\\s*,\\s*' + g + '\\s*,\\s*' + b + '\\s*[,)]', 'gi');
      n += (css.match(reRgb) || []).length;
    }
    if (n) hits.push({ label, n });
  }
  return hits;
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir)) {
    const abs = path.join(dir, e);
    if (fs.statSync(abs).isDirectory()) walk(abs, out);
    else if (e.endsWith('.css')) out.push(abs);
  }
  return out;
}

/* ⚠️ MARKUP SE MORA SKENIRATI JEDNAKO KAO CSS.
   Nađeno pri pisanju ovog gatea: `index.html` nosi paletu u inline-stilu
   (`<article class="mode-card" style="--card-accent:#6366f1">` × 5). Da se skenirao
   samo `css/`, gate bi javio „čisto" dok pet kartica na landingu i dalje svijetli
   starim indigom — a upravo su te kartice ono što posjetitelj prvo vidi.
   Isti razlog vrijedi za pravne stranice: one ne učitavaju bundle, pa im je paleta
   jedino ovdje vidljiva. */
const HTML_FILES = ['index.html', 'privacy.html', 'terms.html', 'faq.html', 'contact.html', 'ai.html']
  .map((f) => path.join(ROOT, f))
  .filter((f) => fs.existsSync(f));

/* `tokens.css` je SAM POPIS BOJA — u njemu hex nije dug nego definicija.
   Da se skenira, gate bi prijavljivao `--color-white: #fff` kao prekršaj protiv
   samog sebe, a jedini način da se „popravi" bio bi ukloniti izvor istine. */
const SOURCE_OF_TRUTH = path.join(CSS_DIR, 'tokens.css');

/* `tokens.static.css` je GENERIRAN izvadak istih tih tokena (`npm run build:css`),
   za stranice koje ne učitavaju bundle. Skenirati ga značilo bi brojati izvor
   istine dvaput — a „popraviti" ga ne bi bilo moguće, jer ga nitko ne piše rukom. */
const GENERATED = path.join(CSS_DIR, 'tokens.static.css');

const files = [...walk(CSS_DIR), ...HTML_FILES]
  .filter((f) => f !== SOURCE_OF_TRUTH && f !== GENERATED)
  .sort();
const report = [];
for (const abs of files) {
  const rel = path.relative(ROOT, abs).replace(/\\/g, '/');
  const hits = countIn(stripComments(fs.readFileSync(abs, 'utf8')));
  const total = hits.reduce((s, h) => s + h.n, 0);
  if (total) report.push({ rel, total, hits });
}

const grand = report.reduce((s, r) => s + r.total, 0);

/* --update: prepiši osnovicu na TRENUTNO stanje (poziva se tek kad broj PADNE). */
if (process.argv.includes('--update')) {
  const next = {};
  for (const r of report) next[r.rel] = r.total;
  fs.writeFileSync(
    path.join(__dirname, 'palette-baseline.json'),
    JSON.stringify(next, null, 2) + '\n'
  );
  console.log(`\n✅ osnovica prepisana — ${report.length} datoteka, ukupno ${grand}.\n`);
  process.exit(0);
}

console.log('\n=== check:palette — ostatak stare palete (hex + rgba) ===\n');

let failed = 0;
for (const r of report) {
  const allowed = BASELINE[r.rel];
  if (allowed === undefined) {
    console.log(`❌ ${r.rel} — ${r.total} (datoteka NIJE u osnovici: nova stara boja)`);
    r.hits.forEach((h) => console.log(`      ${String(h.n).padStart(3)} × ${h.label}`));
    failed++;
  } else if (r.total > allowed) {
    console.log(`❌ ${r.rel} — ${r.total}, dopušteno ${allowed} (PORASLO za ${r.total - allowed})`);
    r.hits.forEach((h) => console.log(`      ${String(h.n).padStart(3)} × ${h.label}`));
    failed++;
  } else {
    const mark = r.total < allowed ? `⬇ ${allowed} → ${r.total}` : '=';
    console.log(`   ${r.rel.padEnd(44)} ${String(r.total).padStart(4)}   ${mark}`);
  }
}

/* Datoteka koja je bila u osnovici a više nema pogodaka (ili je obrisana) = napredak. */
const cleared = Object.keys(BASELINE).filter((k) => !report.some((r) => r.rel === k));
cleared.forEach((k) => console.log(`   ${k.padEnd(44)}    0   ✅ čisto (bilo ${BASELINE[k]})`));

const allowedTotal = Object.values(BASELINE).reduce((s, n) => s + n, 0);
console.log(`\n   ukupno ${grand} / dopušteno ${allowedTotal}`);

if (failed) {
  console.log(`\n❌ ${failed} datoteka iznad osnovice.`);
  console.log('   Stara paleta se ne smije vraćati. Koristi tokene iz css/tokens.css');
  console.log('   (ili `var(--primary)` i dr. iz mosta u css/variables.css).\n');
  process.exit(1);
}

/* ── TVRDA ZABRANA (nije čegrtaljka): zakucan tekst na ispuni marke ───────────
 * Povod (2026-08-12, C2): promjena palete pomaknula je marku iz tamnog indiga u
 * svijetlu kredu, a **35 pravila** je držalo `color: white` na toj ispuni.
 * Bijelo na indigu je bilo 4.47 (tik ispod AA); na kredi je **1.68** — nečitljivo.
 *
 * Zašto ovo NE hvata `check:contrast`: on dokazuje da je PALETA ispravna
 * (`--color-on-brand` na `--color-brand-500` = 9.87), ali ne može znati koristi li
 * je CSS. Axe to vidi, ali samo za stanja koja test zatekne — uhvatio je 2 od 35;
 * ostala 33 su bila u `:hover`, `.active` i `.selected`, dakle nevidljiva gateu.
 * Statička analiza i preglednik hvataju različite bugove (nalaz C1 br. 4).
 *
 * Ovo je TVRDA zabrana, ne osnovica: nije naslijeđeni dug nego kvar koji se rađa
 * svaki put kad netko napiše novi gumb. C3–C7 prepisuju upravo te površine. */
/* ⚠️ Zarez je bio rupa: prvi oblik je tražio `var(--primary)` s ODMAH zatvorenom zagradom,
 * pa `var(--primary, #6366f1)` — dakle isti token S FALLBACKOM — nije bio pogodak.
 * `sokrat-confirm.css` je tako godinu dana držao `color:#fff` na ispuni marke, a gate je
 * javljao čisto. Pronađeno tek kad je zabrana #3 prijavila SUSJEDNO pravilo (2026-08-13). */
/* ⚠️ Od 2026-09-01 (birač tema je IZAŠAO) zabrana pokriva i JAKE semantičke ispune
 * (--color-ok/-strong, --color-danger, --color-warn): tinta na njima ovisi o temi
 * (--color-on-ok/-danger, ADR-032), pa je zakucana bijela/crna isti razred kvara kao
 * na marki — nevidljiv tekst u chalk/mint, do kojih korisnik od danas MOŽE doći.
 * Obaveza zapisana u BACKLOG-u 2026-08-18 („istoga dana kad birač izađe").
 * -soft/pale varijante NAMJERNO nisu tu: blijeda ploha s tamnim tekstom nije taj kvar. */
const MARKA_BG = /background[^;]*(var\(--primary\s*[,)]|var\(--color-brand|var\(--primary-dark\s*[,)]|var\(--primary-light\s*[,)]|var\(--color-ok(-strong)?\s*[,)]|var\(--color-danger\s*[,)]|var\(--color-warn\s*[,)])/;
const ZAKUCAN_TEKST = /(?<![-\w])color:\s*(?:#fff\b|#ffffff\b|white\b|#000\b|#000000\b|black\b)/i;

const naIspuni = [];
for (const abs of files) {
  if (!abs.endsWith('.css')) continue;
  const rel = path.relative(ROOT, abs).replace(/\\/g, '/');
  const css = stripComments(fs.readFileSync(abs, 'utf8'));
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    if (MARKA_BG.test(m[2]) && ZAKUCAN_TEKST.test(m[2])) {
      naIspuni.push(`${rel}  →  ${m[1].trim().replace(/\s+/g, ' ').slice(0, 60)}`);
    }
  }
}

if (naIspuni.length) {
  console.log(`\n❌ ${naIspuni.length} pravilo/a stavlja ZAKUCAN tekst na ispunu marke:`);
  naIspuni.slice(0, 20).forEach((r) => console.log('      ' + r));
  console.log('\n   Boja teksta na marki ovisi o TEMI, ne o navici: na tamnoj marki je bijela,');
  console.log('   na svijetloj tamna. Zato postoji token — koristi `var(--on-primary)`.');
  console.log('   (Bijelo na kredi #f2c14e = 1.68; `--on-primary` = 9.87.)\n');
  process.exit(1);
}

/* ── TVRDA ZABRANA #2: `--primary-light` kao boja TEKSTA ─────────────────────
 * Povod (2026-08-13, C2): `--primary-light` = `--color-brand-400` = SVJETLIJA
 * varijanta marke, namijenjena hoveru i ispunama. `check:contrast` mjeri `brand-500`
 * kao tekst na sve tri plohe, ali `brand-400` NE MJERI NIKAD — pa je 26 pravila
 * pisalo tekst bojom koju nijedan gate ne gleda.
 *
 * Na tamnoj podlozi je to prolazilo (svjetlije = čitljivije), pa je greška bila
 * nevidljiva godinama. Čim je zadana tema postala svijetla, `#4a82e8` na bijelom daje
 * **~3.2** → pada AA. axe je uhvatio 1 od 26, jer vidi samo ono što je u tom trenutku
 * na ekranu — točno isti obrazac kao zabrana iznad.
 *
 * Pravilo: tekst ide na `var(--primary)`; `--primary-light` je za HOVER i ISPUNE. */
const SVIJETLA_MARKA_TEKST = /(?:^|[;{]\s*)color:\s*var\(--(?:primary-light|color-brand-400)\)/m;

const svijetliTekst = [];
for (const abs of files) {
  if (!abs.endsWith('.css')) continue;
  const rel = path.relative(ROOT, abs).replace(/\\/g, '/');
  const css = stripComments(fs.readFileSync(abs, 'utf8'));
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    if (SVIJETLA_MARKA_TEKST.test(m[2])) {
      svijetliTekst.push(`${rel}  →  ${m[1].trim().replace(/\s+/g, ' ').slice(0, 60)}`);
    }
  }
}

if (svijetliTekst.length) {
  console.log(`\n❌ ${svijetliTekst.length} pravilo koristi SVJETLIJU marku kao boju teksta:`);
  svijetliTekst.slice(0, 20).forEach((r) => console.log('      ' + r));
  console.log('\n   `--primary-light` (= brand-400) je varijanta za HOVER i ISPUNE; nijedan gate');
  console.log('   je ne mjeri kao tekst. Na svijetloj temi daje ~3.2 (pada AA).');
  console.log('   Za tekst koristi `var(--primary)` — njega `check:contrast` MJERI na sve tri plohe.\n');
  process.exit(1);
}

/* ── TVRDA ZABRANA #3: ZAKUCANA TAMNA PLOHA ──────────────────────────────────
 * Povod (2026-08-13, popravak C2): zabrane #1 i #2 love isti smjer kvara — zakucan
 * TEKST na plohi koja se mijenja s temom. Ovo je njihov INVERZ: zakucana PLOHA
 * ispod teksta koji dolazi iz tokena.
 *
 * Zašto to nitko nije vidio: `palette-breakdown` je tamne `rgba()` svrstavao u
 * „blago — plohe i rubovi, blijedi ali ispravni". Za `rgba(255,255,255,.06)` na
 * svijetloj temi to je točno (problijedi, bezopasno). Za `rgba(30,41,59,.92)` vrijedi
 * OBRNUTO — to je tamna ploča, a tekst na njoj se s temom okrenuo u tamni. Izmjereno
 * u Studiju na zadanoj temi: `.st-kv` = **1.18**, `.st-icard` = **1.00** (doslovno ista
 * boja). Za usporedbu, bijelo na kredi = 1.68 i to je pokrenulo zabranu #1.
 *   → Jedna kanta je držala DVA suprotna kvara, a jedan je fatalan.
 *
 * Zašto ne `check:contrast`: on dokazuje da je PALETA ispravna; ove vrijednosti nisu
 * tokeni. Zašto ne axe: `#editor-page` ne posjećuje nijedan test bez prijave, a
 * `#materials-page` posjećuje ODJAVLJEN, gdje se stablo nikad ne iscrta.
 *
 * DVA KRAKA, jer se tamna ploha skriva na dva mjesta:
 *   A) pravilo s tamnom pozadinom koje NE zakucava i svoj tekst (tekst dolazi iz
 *      tokena — bilo u istom bloku, bilo naslijeđen);
 *   B) modulska varijabla koja drži fiksnu tamnu boju (npr. `--st-glass`) — pravilo
 *      je onda čisto, a ploha svejedno fiksna. U temiranom sustavu tamu drži TEMA.
 *
 * IZNIMKE su izričite i svaka nosi RAZLOG. Zajedničko im je da tama ondje nije stil nego
 * funkcija, i da na njima ne stoji tekst iz tokena. Popis se NE proširuje „da gate prođe":
 * ako nova površina traži tamu, ili ovdje stoji obrazloženje, ili popravak ide u CSS. */
const IZNIMKE = [
  // ── zastori: zatamnjuju sadržaj ISPOD sebe → tamni su u svakoj temi, po definiciji ──
  '.subjects-overlay',            // css/sidebar.css — iza bočne trake
  'sokrat-modal.sokrat-modal',    // css/sokrat-modal.css — osnovni zastor
  'sokrat-modal.auth-modal',      // css/auth.css — zastor prijave
  'sokrat-modal.image-modal',     // css/learn.css — zastor svjetlosnog stola
  '.sm-backdrop',
  // ── matirane podloge za MEDIJ: slika i video se čitaju na tamnom u svakoj temi ──
  '.image-modal-content img',     // css/learn.css — matiranje iza prozirne slike
  '.lb-video',                    // css/learn-blocks.css — poster-ploha videa
  // ── platno igre „slijepa karta": tamno je SADRŽAJ, ne tema; nula teksta.
  //    (`.map-marker.incorrect` je bio treći član: pravilo je MRTVO obrisano u C5b/2 —
  //    markere od početka crta canvas, DOM-marker nije stvarao nitko.) ──
  '.map-wrapper',
  '.blank-map-canvas',
  // ── pločice ikona predmeta: bijeli glif živi u SUSJEDNOM pravilu (`color: white
  //    !important`), pa ih blok-analiza ne može povezati. Nisu slomljene — stara paleta,
  //    koju čegrtaljka i dalje broji; nestaju s C4. ──
  '.subject-icon',
  '.about-card-icon',
];
/* Pravilo koje zakuca I plohu I tekst je samodosljedno: stara paleta, ali ČITLJIVO
 * (npr. `.nav-btn.active` = `#312e81` + `#e0e7ff`). Takvo se broji u čegrtaljci, ne ovdje.
 * ⚠️ Prva izvedba je to gledala REGEXOM (`#fff|white|#fXX…`) i promašila `#e0e7ff` — pa je
 * gate prijavio dva lažna kvara koja sam prenio dalje kao izmjerena. Sad se luminancija
 * RAČUNA, kao i za plohu: ista mjera s obje strane, nula uzoraka za pamćenje. */
function imaZakucanSvijetaoTekst(body) {
  const re = /(?<![-\w])color:\s*([^;]+)/gi;
  let m;
  while ((m = re.exec(body)) !== null) {
    const v = m[1];
    if (/\bwhite\b/i.test(v)) return true;
    for (const c of bojeU(v)) if (lumK(c) >= 0.5) return true;
  }
  return false;
}

function bojeU(tekst) {
  const out = [];
  const hex = /#([0-9a-f]{3}|[0-9a-f]{6})\b/gi;
  const fn = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/gi;
  let m;
  while ((m = hex.exec(tekst)) !== null) {
    let h = m[1];
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    out.push([parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), 1]);
  }
  while ((m = fn.exec(tekst)) !== null) {
    out.push([+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]]);
  }
  return out;
}
const linK = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
const lumK = ([r, g, b]) => 0.2126 * linK(r) + 0.7152 * linK(g) + 0.0722 * linK(b);
/** Tamna = dovoljno tamna da povuče plohu na tamno I dovoljno neprozirna da se vidi. */
const tamna = (c) => lumK(c) < 0.18 && c[3] >= 0.25;

const tamnePlohe = [];
for (const abs of files) {
  if (!abs.endsWith('.css')) continue;
  if (abs === SOURCE_OF_TRUTH || abs === GENERATED) continue;   // tokeni SMIJU biti tamni — to su teme
  const rel = path.relative(ROOT, abs).replace(/\\/g, '/');
  const css = stripComments(fs.readFileSync(abs, 'utf8'));
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    const sel = m[1].trim().replace(/\s+/g, ' ');
    const body = m[2];
    if (IZNIMKE.some((z) => sel.includes(z))) continue;

    // krak A — pozadina pravila
    for (const decl of body.split(';')) {
      if (!/^\s*background(-color|-image)?\s*:/i.test(decl)) continue;
      if (bojeU(decl).some(tamna) && !imaZakucanSvijetaoTekst(body)) {
        tamnePlohe.push(`${rel}  →  ${sel.slice(0, 52)}   [ploha]`);
        break;
      }
    }
    // krak B — modulska varijabla s fiksnom tamnom bojom
    for (const decl of body.split(';')) {
      const v = decl.match(/^\s*(--[a-z0-9-]+)\s*:(.*)$/i);
      if (!v) continue;
      if (bojeU(v[2]).some(tamna)) tamnePlohe.push(`${rel}  →  ${v[1]}   [varijabla]`);
    }
  }
}

if (tamnePlohe.length) {
  console.log(`\n❌ ${tamnePlohe.length} zakucanih TAMNIH ploha (tekst na njima dolazi iz tokena):`);
  tamnePlohe.slice(0, 25).forEach((r) => console.log('      ' + r));
  if (tamnePlohe.length > 25) console.log(`      … i još ${tamnePlohe.length - 25}`);
  console.log('\n   Ovo je INVERZ zabrana #1/#2: ondje je bio zakucan tekst na temiranoj plohi,');
  console.log('   ovdje je zakucana ploha ispod temiranog teksta. Tema okrene tekst, ploha ostane');
  console.log('   → tamno na tamnom. Izmjereno u Studiju: .st-kv = 1.18, .st-icard = 1.00.');
  console.log('   Plohu drži TEMA: `var(--bg-secondary)` / `--bg-tertiary` / `--border`.\n');
  process.exit(1);
}

/* ── TVRDA ZABRANA #4: ZAKUCAN TEKST NA POTOMKU ISPUNE MARKE ─────────────────
 * Povod (2026-08-29, C4a): zabrana #1 traži ispunu marke i zakucanu boju **u
 * ISTOM pravilu**. Ali kvar se najčešće piše u DVA pravila — roditelj dobije
 * ispunu i ispravan `var(--on-primary)`, pa ga sljedeće pravilo odmah poništi
 * na djetetu:
 *
 *     .study-nav-btn.active        { background: var(--primary); color: var(--on-primary); }
 *     .study-nav-btn.active span,
 *     .study-nav-btn.active i      { color: white; }          ← poništava ispravno iznad
 *
 * Na temi `chalk` je marka amber #f2c14e, pa je bijeli tekst davao **1.68**
 * (prag 4.5) na prekidaču načina učenja — dakle na najkorištenijem ekranu.
 * Izmjereno je devet takvih mjesta u pet datoteka, i **nijedno** nije vidjela
 * zabrana #1, jer nijedno nema ispunu u vlastitom bloku.
 *
 * ⚠️ Sedam od devet nije vidio ni preglednik: sjede na GRADIJENTU, gdje se
 * kontrast ne da svesti na dva broja pa ih mjera pošteno preskače. Statička
 * analiza i preglednik hvataju različite bugove (nalaz C1 br. 4) — ova zabrana
 * pokriva upravo ono što mjerenje u pregledniku ne može.
 *
 * Zašto smije biti TVRDA, a ne čegrtaljka: izmjereno je 0 lažnih pogodaka na
 * cijelom repozitoriju. (Srodna ideja — „ista klasa u dva modula" — odbačena je
 * baš zato što bi dala 29 pogodaka od kojih 28 legitimnih.)
 *
 * ⚠️ Što OVA zabrana NE pokriva: ispune SEMANTIČKIM tokenom (`--success`,
 * `--danger`, `--secondary`). Ondje isti kvar postoji — na `chalk` bijelo na
 * `--success` daje 2.14 — ali popravak traži NOVE tokene (`--on-success`…),
 * dakle odluku o paleti, ne mehaničku izmjenu. Vodi se u `BACKLOG.md`. */
const POTOMAK_ISPUNE = (function () {
  const ispuna = new Set();
  const zakucani = [];
  for (const abs of files) {
    if (!abs.endsWith('.css')) continue;
    if (abs === SOURCE_OF_TRUTH || abs === GENERATED) continue;
    const rel = path.relative(ROOT, abs).replace(/\\/g, '/');
    const css = stripComments(fs.readFileSync(abs, 'utf8'));
    const re = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = re.exec(css)) !== null) {
      const sels = m[1].split(',').map((x) => x.trim().replace(/\s+/g, ' ')).filter(Boolean);
      /* pseudo-element se skida: `.a::before` je i dalje ploha `.a` za potomke */
      if (MARKA_BG.test(m[2])) for (const x of sels) ispuna.add(x.replace(/::?[a-z-]+(\([^)]*\))?$/i, '').trim());
      if (ZAKUCAN_TEKST.test(m[2])) for (const x of sels) zakucani.push({ rel: rel, sel: x });
    }
  }
  const out = [];
  for (const z of zakucani) {
    for (const i of ispuna) {
      if (!i || z.sel === i) continue;          // isti selektor → to je zabrana #1
      if (z.sel.startsWith(i + ' ') || z.sel.startsWith(i + '>')) {
        out.push(z.rel + '  →  ' + z.sel.slice(0, 52) + '   (ispuna: ' + i.slice(0, 34) + ')');
        break;
      }
    }
  }
  return out;
})();

if (POTOMAK_ISPUNE.length) {
  console.log('\n❌ ' + POTOMAK_ISPUNE.length + ' pravilo/a zakucava boju teksta na POTOMKU ispune marke:');
  POTOMAK_ISPUNE.slice(0, 20).forEach((r) => console.log('      ' + r));
  console.log('\n   Roditelj već bira boju po temi (`var(--on-primary)`), a ovo ju poništava.');
  console.log('   Popravak je `color: inherit` — dijete preuzima roditeljevu odluku.');
  console.log('   (Bijelo na kredi #f2c14e = 1.68; `--on-primary` = 9.87.)\n');
  process.exit(1);
}

if (grand < allowedTotal) {
  console.log(`\n✅ čisto — i PALO za ${allowedTotal - grand}. Spusti branu: node scripts/check-palette.js --update\n`);
} else if (grand === 0) {
  console.log('\n✅ stare palete više nema. Gate smije postati obična zabrana (§2).\n');
} else {
  console.log('\n✅ čisto — ostatak je na osnovici, ništa nije poraslo.\n');
}
