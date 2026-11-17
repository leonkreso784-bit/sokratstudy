#!/usr/bin/env node
/**
 * check:contrast:live — KONTRAST KAKAV SE STVARNO ISCRTA.
 *
 * ── ZASTO OVA MJERA POSTOJI (C4a, 2026-08-29) ────────────────────────────────
 * `check:contrast` cita PAROVE TOKENA iz `css/tokens.css` i tvrdi da je paleta
 * ispravna. To je tocno — i nedovoljno: ne zna KORISTI li CSS te tokene. Kvar koji
 * je povod ovoj skripti bio je `color: white` zakucan u modulu, na povrsini cija je
 * ispuna dolazila iz tokena. Tri ikone na `about`-u imale su kontrast **1.13** u
 * ZADANOJ (svijetloj) temi, a svih petnaest brana javljalo je zeleno.
 *
 * Zato ova mjera ne gleda tokene nego IZRACUNATE stilove u pregledniku, kroz SVE
 * teme koje `tokens.css` definira, na svakoj stranici koja ima adresu i u svakom nacinu ucenja:
 *   • tekst → prag 4.5 (veliki tekst 3.0)
 *   • glif  → prag 3.0 (ikone Font Awesome zive u `::before`, ne u tekstu)
 *
 * ⚠️ STO SE NAMJERNO NE TVRDI (dvije rupe, obje svjesne):
 * ① Gdje izmedju teksta i podloge stoji GRADIJENT ili slika, kontrast se ne da
 *    svesti na dva broja. Takva se mjerenja broje zasebno i NE prijavljuju kao pad.
 *    Tu rupu pokriva staticka **zabrana #4** u `check:palette` — i to nije podjela
 *    posla nego nuzda: od devet mjesta s istim kvarom, **sedam** ih je bilo na
 *    gradijentu i preglednik ih nije mogao vidjeti. *Staticka analiza i preglednik
 *    hvataju razlicite bugove* (nalaz C1 br. 4).
 * ② Elementi s `aria-hidden="true"` se preskacu — WCAG ukrasnom sadrzaju ne mjeri
 *    kontrast. Prva verzija ih je prijavljivala i time lazno optuzila `.crumb-sep`.
 *
 * ⚠️ PROMJENA TEME POKRECE PRIJELAZE BOJE. Prvo mjerenje ih je hvatalo NA POLA i
 * prijavilo 18 nalaza umjesto 1 — sedamnaest ih je bio artefakt mjere, ne kvar.
 * Prijelazi se zato DOVRSAVAJU (`getAnimations().finish()`), kao u `css:diff`.
 *
 * NIJE u preflightu (treba preglednik i posluzitelj) — stoji uz `css:diff` i
 * `check:cdn:live`. Trazi `npm run serve:test` na :5050 (ili BAZA=...).
 *
 * RABLJENJE:  npm run check:contrast:live            # zadani obilazak
 *             node scripts/check-contrast-live.js "/#/about"   # samo jedna ruta
 */
const { chromium } = require('@playwright/test');

/* Popis tema se CITA iz `css/tokens.css` (`scripts/teme.js`, F1/4). Do tada je ovdje bio
   ZAKUCAN: nova tema bez upisa ovdje prolazila bi NEIZMJERENA, a brana bi ostala zelena —
   tiho. Staticka brana je tokene citala od pocetka; ziva nije. Ispis na kraju kaze koliko
   je tema dotaknuto — mjerac mora reci sto je mjerio. */
const TEME = require('./teme').temeIzTokena();
const BAZA = process.env.BAZA || 'http://localhost:5050';

const MJERA = function () {
  function rgb(s) {
    const m = String(s).match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(',').map(function (x) { return parseFloat(x); });
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  }
  function preko(fg, bg) {                      // fg s alfom preko neprozirne bg
    const a = fg.a;
    return { r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a), b: fg.b * a + bg.b * (1 - a), a: 1 };
  }
  function lum(c) {
    const f = function (v) { const s = v / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  }
  function omjer(a, b) { const x = lum(a), y = lum(b); const hi = Math.max(x, y), lo = Math.min(x, y); return (hi + 0.05) / (lo + 0.05); }

  function put(el) {
    const d = [];
    let n = el;
    while (n && n.nodeType === 1 && d.length < 5) {
      let s = n.tagName.toLowerCase();
      if (n.id) { s = '#' + n.id; d.unshift(s); break; }
      const c = (n.className && typeof n.className === 'string') ? n.className.trim().split(/\s+/)[0] : '';
      if (c) s += '.' + c;
      d.unshift(s);
      n = n.parentElement;
    }
    return d.join('>');
  }

  const out = [];
  const svi = document.querySelectorAll('*');

  for (const el of svi) {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;

    // kumulativna neprozirnost + je li ijedan predak sakriven
    let op = 1, p = el, skriven = false;
    while (p && p.nodeType === 1) {
      const pcs = getComputedStyle(p);
      if (pcs.display === 'none' || pcs.visibility === 'hidden') { skriven = true; break; }
      op *= parseFloat(pcs.opacity || '1');
      p = p.parentElement;
    }
    if (skriven || op < 0.15) continue;         // namjerno prigušeno (disabled) se ne mjeri
    if (el.closest('[aria-hidden="true"]')) continue;   // UKRASNO: WCAG mu ne mjeri kontrast

    // ① vlastiti tekst?
    let tekst = '';
    for (const n of el.childNodes) if (n.nodeType === 3 && n.textContent.trim()) tekst += n.textContent.trim() + ' ';
    // ② glif iz ::before / ::after (Font Awesome)
    let glif = false;
    for (const pe of ['::before', '::after']) {
      const pcs = getComputedStyle(el, pe);
      const c = pcs.content;
      if (c && c !== 'none' && c !== 'normal' && c !== '""' && /Font Awesome|FontAwesome/i.test(pcs.fontFamily || '')) glif = true;
    }
    if (!tekst && !glif) continue;

    // gradijentni tekst se NE mjeri — boja mu nije u `color`
    if (cs.webkitTextFillColor && rgb(cs.webkitTextFillColor) && rgb(cs.webkitTextFillColor).a === 0) continue;

    // stvarna podloga: prvi predak s neprozirnom ispunom; slika/gradijent = neizmjerljivo
    let bg = null, slika = false;
    let q = el;
    while (q && q.nodeType === 1) {
      const qcs = getComputedStyle(q);
      if (qcs.backgroundImage && qcs.backgroundImage !== 'none') { slika = true; break; }
      const b = rgb(qcs.backgroundColor);
      if (b && b.a > 0.95) { bg = b; break; }
      if (b && b.a > 0.05) { slika = true; break; }   // poluprozirna ploha — isto neizmjerljivo
      q = q.parentElement;
    }
    if (!bg) { bg = rgb(getComputedStyle(document.body).backgroundColor) || { r: 255, g: 255, b: 255, a: 1 }; }

    let fg = rgb(cs.color);
    if (!fg) continue;
    if (fg.a < 1) fg = preko(fg, bg);
    if (op < 1) fg = preko({ r: fg.r, g: fg.g, b: fg.b, a: op }, bg);

    const px = parseFloat(cs.fontSize) || 16;
    const bold = (parseInt(cs.fontWeight, 10) || 400) >= 700;
    const veliki = px >= 24 || (px >= 18.66 && bold);
    const prag = (!tekst && glif) ? 3.0 : (veliki ? 3.0 : 4.5);
    const k = omjer(fg, bg);

    if (k < prag) {
      out.push({
        put: put(el), vrsta: tekst ? 'tekst' : 'glif', k: Math.round(k * 100) / 100, prag: prag,
        boja: cs.color, podloga: 'rgb(' + Math.round(bg.r) + ', ' + Math.round(bg.g) + ', ' + Math.round(bg.b) + ')',
        px: Math.round(px), uzorak: tekst.slice(0, 40), neizmjerljivo: slika,
      });
    }
  }
  return out;
};

(async () => {
    // Zadani obilazak: svaka stranica koja ima adresu + svi nacini ucenja. Predmet
  // `te2` je prvi u katalogu i ima sve nacine; argumenti ga smiju pregaziti.
  const L = '/#/subject/te2/first-midterm';
  // ⚠️ `te2` NEMA `exercises` ni `blind-map` — to su UVJETNI tabovi. Do 2026-08-31 je
  // zadani obilazak bio samo `te2`, pa te dvije plohe brana NIKAD nije izmjerila i mirno
  // javljala zeleno. `features.exercises` ima 5 predmeta (math, statistics, accounting,
  // academic-writing, macroeconomics), `features.blindMap` samo `geography`.
  // Ruta koja ne postoji na predmetu mjeri prazan ekran, a nula nalaza na ekranu kojeg
  // nema nije dokaz.
  const ZADANO = ['/', '/#/subjects', '/#/about', '/#/materials', '/#/subject/te2',
    L, L + '/learn', L + '/flashcards', L + '/quiz', L + '/fill', L + '/progress',
    '/#/subject/statistics/first-midterm/exercises',
    '/#/subject/geography/first-midterm/blind-map',
    // F1/5 (2026-09-06): pravne stranice imaju SVOJ CSS (`legal.css`, ne bundle) i od F1/5 sve teme.
    // Do tada ih nijedna živa brana nije mjerila — bile su jednobojne, pa se ništa nije imalo mjeriti.
    '/ai.html', '/contact.html', '/faq.html', '/privacy.html', '/terms.html'];
  const stranice = process.argv.length > 2 ? process.argv.slice(2) : ZADANO;
  const browser = await chromium.launch();
  const nalazi = new Map();
  let neizmjerljivih = 0;

  for (const ruta of stranice) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.addInitScript(() => { try { localStorage.setItem('sokrat-cookie-consent', 'denied'); } catch (e) {} });
    await page.goto(BAZA + ruta, { waitUntil: 'domcontentloaded' });
    /* ⚠️ Fiksno čekanje NIJE dovoljno otkad načini učenja stižu paketom (`js/loader.js`):
       ruta lekcije prvo skine paket, pa tek onda gradivo. Zastor `#studyLoading` je izričit
       signal da to još traje — čeka se ON, a 2,5 s ostaje kao rezerva za crtanje. Bez ovoga
       bi brana mjerila stranicu USRED CRTANJA i „zeleno" bi značilo prazan ekran (isti kvar
       koji je css:diff platio s 420 lažnih razlika). */
    try {
      await page.waitForFunction(() => {
        const l = document.getElementById('studyLoading');
        return !l || l.hasAttribute('hidden');
      }, null, { timeout: 15000 });
    } catch (e) { /* zastor je ostao — neka mjera to i pokaže */ }
    await page.waitForTimeout(2500);

    for (const tema of TEME) {
      await page.evaluate((t) => { document.documentElement.setAttribute('data-theme', t); }, tema);
      // ⚠️ PROMJENA TEME POKRECE PRIJELAZE BOJE. Prvo mjerenje ih je hvatalo NA POLA i
      // prijavilo hrpu 'sive na sivoj' u temi koja te boje uopce nema. Ista zamka koju je
      // ALAT-1 platio u css:diff: prijelaz se DOVRSAVA, ne ceka se na srecu.
      await page.waitForTimeout(400);
      await page.evaluate(() => { document.getAnimations().forEach((x) => { try { x.finish(); } catch (e) {} }); });
      await page.waitForTimeout(150);
      const r = await page.evaluate(MJERA);
      for (const n of r) {
        if (n.neizmjerljivo) { neizmjerljivih++; continue; }
        const kljuc = n.put + ' | ' + n.vrsta;
        if (!nalazi.has(kljuc)) nalazi.set(kljuc, { n: n, teme: [], rute: new Set() });
        const z = nalazi.get(kljuc);
        z.teme.push(tema + ':' + n.k);
        z.rute.add(ruta);
        if (n.k < z.n.k) z.n = n;
      }
    }
    await page.close();
  }
  await browser.close();

  /* IMENOVANE IZNIMKE — ne prešućene. Dopušta se samo ono čiji uzrok NIJE u stilu
     (npr. boja koju bira sadržaj), i svaka nosi mjeru, razlog i mjesto rješavanja.
     Popis je kratak namjerno: čim naraste, prestaje biti iznimka i postaje tepih. */
  const DOPUSTENO = require('./contrast-live-allow.json');
  const sve = Array.from(nalazi.values()).sort((a, b) => a.n.k - b.n.k);
  const lista = sve.filter((z) => !DOPUSTENO[z.n.put]);
  const presuceno = sve.filter((z) => DOPUSTENO[z.n.put]);
  console.log('\n=== VIDLJIVOST: ' + lista.length + ' element(a) ispod praga  ·  ' +
    neizmjerljivih + ' mjerenja preskočeno (gradijent/slika iza teksta) ===\n');
  for (const z of lista) {
    console.log('  ' + (z.n.k < 1.6 ? '⛔ NEVIDLJIVO' : '⚠️  slabo    ') + '  k=' + z.n.k + ' (prag ' + z.n.prag + ')  ' + z.n.vrsta);
    console.log('      ' + z.n.put);
    console.log('      boja=' + z.n.boja + '  podloga=' + z.n.podloga + '  ' + z.n.px + 'px'
      + (z.n.uzorak ? '  tekst="' + z.n.uzorak + '"' : ''));
    console.log('      teme: ' + Array.from(new Set(z.teme)).join('  ') + '   rute: ' + Array.from(z.rute).join(' '));
    console.log('');
  }
  for (const z of presuceno) {
    console.log('  ▫️ IMENOVANA IZNIMKA  k=' + z.n.k + '  ' + z.n.put);
    console.log('      ' + DOPUSTENO[z.n.put].zasto);
    console.log('      rjesava se u: ' + DOPUSTENO[z.n.put]['gdje se rjesava'] + '\n');
  }
  if (!lista.length) {
    console.log('  ✅ nijedan tekst ni glif nije ispod praga na ' + stranice.length +
      ' ruta × ' + TEME.length + ' tema.');
    console.log('  ⚠️ NE tvrdi se nista o ' + neizmjerljivih + ' mjerenja iza gradijenta/slike —');
    console.log('     njih pokriva staticka zabrana #4 u check:palette.\n');
    process.exit(0);
  }
  process.exit(1);
})();
