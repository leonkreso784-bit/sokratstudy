/* eslint-disable no-console */
// ===== NIŠTA NE ZUMIRA — viewport-meta na 6 stranica + `touch-action` + 16 px (F1/10 → F1/11, ADR-034) =====
// Pokreni: node tests/unit/touch-zoom.test.js  (uključeno u `npm run test:unit`)
//
// ZAŠTO POSTOJI: Leon (2026-09-05 ujutro): „kada se više puta takne na jedno mjesto može se
// zoomat, to se mora riješit" → F1/10. Isti dan navečer, poslije deploya: „Stranica uopće ne bi
// trebala imati mogućnost da se nešto povećava ili smanjuje na njoj ikako. Treba ostati na
// mjestu." → ADR-034, F1/11. Tri sloja, svaki čuva nešto što drugi ne može:
//
//   ⓪ META na svih ŠEST stranica: `minimum-scale=1, maximum-scale=1, user-scalable=no`. Chrome i
//      Android to slušaju; Safari od iOS-a 10 metu za ŠTIPANJE ignorira (zato ①), a za fokus-zoom
//      polja ju ignorira svaki iOS (zato ②). `viewport-fit=cover` SAMO gdje postoji safe-area
//      (bundle); `legal.css` nema nijednog `--safe-*` razmaka, pa bi cover na pravnim stranicama
//      gurnuo tekst pod izrez u polegnutom položaju — sprega meta ⇔ safe-area je ovdje tvrdnja.
//   ① `touch-action: pan-x pan-y` na `*` (bundle + legal.css): skrol ostaje, dvostruki dodir I
//      štipanje se gase. F1/10 je držao `manipulation` (štipanje ostaje — pristupačnost); navečer
//      obrnuto odlukom o proizvodu → nula `manipulation`, nula `pinch-zoom` u onome što preglednik
//      dobije. NEMJERLJIVO u headlessu: gestu izvodi Safarijev UI-proces, ne stranica (24
//      mjerenja, WebKit + Chromium, `visualViewport.scale` uvijek 1; BUG-043). Zato STATIČKA
//      tvrdnja, a presudu daje Leon na iPhoneu.
//   ② polja ≥ 16 px na dodiru (`@media (pointer: coarse)`), inače iOS zumira pri fokusu i ne
//      vraća se — meta to NE gasi. Mjerljivo: tvrdnja ⑨ u `tests/phone.spec.js`. Ovdje samo da
//      pravilo nije ispalo iz bundlea i da se STARO njuškanje motora nije vratilo:
//      `@supports (-webkit-touch-callout: none) { … font-size: 16px !important }` ne zadovoljava
//      NIJEDAN motor naših brana (Chromium i Playwrightov WebKit: `CSS.supports` = false), pa je
//      godinu dana bilo nevidljivo svakom mjerenju — je li iPhone dobio 16 px nije znao nitko.
//   ③ iOS JS-sloj `js/no-zoom.js` (F1/11 ②; Leon na iPhoneu poslije ⓪+①: „sa dva prsta" i dalje zumira,
//      dodir u polje i dvostruki dodir potvrđeno ugašeni): Safari `user-scalable=no` za štipanje IGNORIRA,
//      a `pan-x pan-y` ga na uređaju nije zaustavio. Ostaje ono što WebKit sluša: `gesturestart` /
//      `gesturechange` + `touchmove` sa `scale !== 1`, `preventDefault()` uz `passive: false`. Veže se
//      SAMO gdje `GestureEvent` postoji — Chrome ga nema, a nepasivan `touchmove` bi mu badava usporio
//      skrol. Vlastita datoteka na svih 6 stranica (`defer`), jer pravne nemaju `boot.js` (ADR-027).
//
// a11y: axe `meta-viewport` (WCAG 1.4.4, AA) na ovu metu PADA — imenovano isključenje s razlogom
// ADR-034 stoji u `tests/helpers/axe-gate.js` (`ISKLJUCENO_ODLUKOM`), ne u osnovici.
//
// ⚠️ Čita BUNDLE (`styles.bundle.css`), ne izvor: lightningcss smije preslagati, a do korisnika
// stiže samo bundle. Da `build:css` ispusti pravilo, izvor bi i dalje bio „ispravan".
// Obrnuto (2026-09-05, stablo prije F1/11 kroz `git worktree`): ⓪ pada na svih 6 stranica (8 tvrdnji),
// ① na 5 tvrdnji — 13 crvenih; ② zeleno (F1/10 je već bio na produkciji).

const fs = require('fs');
const path = require('path');

const KORIJEN = path.join(__dirname, '..', '..');
const citaj = (...p) => fs.readFileSync(path.join(KORIJEN, ...p), 'utf8');
const bundle = citaj('styles.bundle.css');
const legal = citaj('css', 'legal.css');

let pao = 0;
const tvrdi = (uvjet, ime) => {
    if (uvjet) console.log('  ✅ ' + ime);
    else { pao++; console.log('  ❌ ' + ime); }
};

/** Tijela svih pravila čiji je selektor TOČNO `*` (bez `*::before`, bez `.x *`). */
function univerzalna(css) {
    const out = [];
    const re = /(^|[\n;{}])\s*\*\s*\{([^}]*)\}/g;
    let m;
    while ((m = re.exec(css))) out.push(m[2]);
    return out;
}

/** Tijelo bloka (uključivo ugniježđene vitičaste) koji počinje na `od` — prvi `{` iza njega. */
function blok(css, od) {
    const start = css.indexOf('{', od);
    if (start < 0) return '';
    let dubina = 0;
    for (let i = start; i < css.length; i++) {
        if (css[i] === '{') dubina++;
        else if (css[i] === '}' && --dubina === 0) return css.slice(start + 1, i);
    }
    return css.slice(start + 1);
}

/** Svi blokovi čiji at-prolog odgovara regexu. */
function blokovi(css, re) {
    const out = [];
    let m;
    const g = new RegExp(re.source, 'g');
    while ((m = g.exec(css))) out.push(blok(css, m.index));
    return out;
}

/** `content` svih viewport-meta u HTML-u (redoslijed atributa nije ugovor, pa se ne pretpostavlja). */
function viewportMete(html) {
    const out = [];
    const re = /<meta\b[^>]*>/gi;
    let m;
    while ((m = re.exec(html))) {
        const tag = m[0];
        if (!/\bname\s*=\s*["']viewport["']/i.test(tag)) continue;
        const c = tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i);
        out.push(c ? c[1] : '');
    }
    return out;
}
const dijelovi = (content) => content.split(',').map((s) => s.trim()).filter(Boolean);

console.log('\n=== ništa ne zumira: meta + touch-action + 16 px (F1/10 → F1/11, ADR-034) ===\n');

// ⓪ META — šest stranica, jedna politika
const APP = ['index.html', 'editor.html'];                                  // bundle + `--safe-*` → viewport-fit=cover
const PRAVNE = ['ai.html', 'contact.html', 'faq.html', 'privacy.html', 'terms.html']; // legal.css, bez safe-area
const OBAVEZNO = ['width=device-width', 'initial-scale=1.0', 'minimum-scale=1.0', 'maximum-scale=1.0', 'user-scalable=no'];

for (const f of APP.concat(PRAVNE)) {
    const mete = viewportMete(citaj(f));
    tvrdi(mete.length === 1, f + ': točno jedna viewport-meta, nađeno ' + mete.length);
    const d = dijelovi(mete[0] || '');
    const fali = OBAVEZNO.filter((k) => !d.includes(k));
    tvrdi(fali.length === 0, f + ': meta nosi ' + OBAVEZNO.join(' · ') + (fali.length ? ' — FALI: ' + fali.join(', ') : ''));
    const stari = d.filter((k) => /^user-scalable=(yes|1)$/.test(k) || /^maximum-scale=(?!1(\.0+)?$)/.test(k));
    tvrdi(stari.length === 0, f + ': bez `user-scalable=yes` i bez `maximum-scale` > 1 (oblik iz F1/10)' + (stari.length ? ' — NAĐENO: ' + stari.join(', ') : ''));
}
for (const f of APP) {
    tvrdi(dijelovi(viewportMete(citaj(f))[0] || '').includes('viewport-fit=cover'),
        f + ': `viewport-fit=cover` (bundle crta ispod izreza i ima `--safe-*` razmake)');
}
// Sprega: cover na pravnim stranicama smije doći TEK kad legal.css dobije safe-area razmake (F1/5).
const legalSafe = (legal.match(/safe-area-inset|--safe-/g) || []).length;
for (const f of PRAVNE) {
    const cover = dijelovi(viewportMete(citaj(f))[0] || '').includes('viewport-fit=cover');
    tvrdi(cover === (legalSafe > 0),
        f + ': `viewport-fit=cover` ⇔ `legal.css` ima safe-area razmak (danas ' + legalSafe + ' → ' + (legalSafe > 0 ? 'cover obavezan' : 'bez covera') + ')');
}

// ① štipanje i dvostruki dodir — reset u bundleu i u legal.css
const uniB = univerzalna(bundle);
tvrdi(uniB.length > 0, 'bundle ima pravilo sa selektorom `*` (reset iz variables.css)');
tvrdi(uniB.some((t) => /touch-action:\s*pan-x\s+pan-y/.test(t)), 'bundle: `*` nosi `touch-action: pan-x pan-y`');
const uniL = univerzalna(legal);
tvrdi(uniL.some((t) => /touch-action:\s*pan-x\s+pan-y/.test(t)), 'legal.css: `*` nosi `touch-action: pan-x pan-y` (pravne stranice nemaju bundle)');
// Jedna činjenica, jedno mjesto (ADR-027): reset je jedini nositelj. Ručke za vučenje s
// `touch-action: none` su DRUGA vrijednost i smiju ostati (klasa tuče `*`, i strože je).
const resetB = (bundle.match(/touch-action:\s*pan-x\s+pan-y/g) || []).length;
tvrdi(resetB === 1, 'bundle: `touch-action: pan-x pan-y` postoji TOČNO jednom (u resetu), nađeno ' + resetB);
// Ništa što preglednik dobije ne smije štipanje VRATITI: `manipulation` (= pan + pinch-zoom),
// `pinch-zoom` sam, ili `auto`. Klasa na potomku bi pregazila reset — zato se broji cijeli CSS,
// bez komentara (legal.css u komentaru objašnjava politiku i spominje staru vrijednost).
const bezKomentara = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');
const vracaZoom = (css) => (bezKomentara(css).match(/touch-action:\s*(manipulation|auto|[^;]*pinch-zoom)[^;]*/g) || []);
tvrdi(vracaZoom(bundle).length === 0, 'bundle: nula `touch-action` vrijednosti koje vraćaju štipanje (manipulation / pinch-zoom / auto)' + (vracaZoom(bundle).length ? ' — NAĐENO: ' + vracaZoom(bundle).join(' | ') : ''));
tvrdi(vracaZoom(legal).length === 0, 'legal.css: nula `touch-action` vrijednosti koje vraćaju štipanje' + (vracaZoom(legal).length ? ' — NAĐENO: ' + vracaZoom(legal).join(' | ') : ''));

// ② polja ≥ 16 px na dodiru — pravilo po SPOSOBNOSTI, mjerljivo u svakom motoru
const coarse = blokovi(bundle, /@media\s*\(pointer:\s*coarse\)/);
tvrdi(coarse.length > 0, 'bundle ima `@media (pointer: coarse)`');
tvrdi(coarse.some((b) => /input/.test(b) && /select/.test(b) && /textarea/.test(b) && /font-size:\s*16px/.test(b)),
    'bundle: pod `(pointer: coarse)` input/select/textarea dobivaju `font-size: 16px`');
tvrdi(coarse.every((b) => !/!important/.test(b)), 'bundle: to pravilo NE koristi `!important` (specifičnost, ne sila)');

// Staro njuškanje se ne vraća: nijedan `@supports (-webkit-touch-callout: none)` blok ne dira font.
const njuskanje = blokovi(bundle, /@supports\s*\(-webkit-touch-callout:\s*none\)/);
tvrdi(njuskanje.every((b) => !/font-size/.test(b)),
    'bundle: nijedan `@supports (-webkit-touch-callout: none)` blok ne postavlja `font-size` (njuškanje motora = nemjerljivo)');
const fsImportant = (bundle.match(/font-size:[^;]*!important/g) || []).length;
tvrdi(fsImportant === 0, 'bundle: nula `font-size … !important` (bilo 1, iz istog njuškanja), nađeno ' + fsImportant);

// ③ iOS JS-sloj — svih 6 stranica ga učitava, a u sandboxu radi točno ono što tvrdi
const vm = require('vm');
const NOZOOM = citaj('js', 'no-zoom.js');
for (const f of APP.concat(PRAVNE)) {
    const tagovi = citaj(f).match(/<script[^>]*\ssrc="js\/no-zoom\.js\?v=\d+"[^>]*>/g) || [];
    tvrdi(tagovi.length === 1 && /\bdefer\b/.test(tagovi[0]), f + ': učitava `js/no-zoom.js` točno jednom, s `?v=` i `defer`, nađeno ' + tagovi.length);
}
/** Lažni svijet: `document` pamti slušače; `posalji` glumi preglednik i vraća je li događaj otkazan. */
function svijetGeste(imaGestureEvent) {
    const slusaci = [];
    const document = { addEventListener: (tip, fn, opts) => slusaci.push({ tip, fn, opts }) };
    const ctx = { document, console };
    ctx.window = ctx;
    if (imaGestureEvent) ctx.GestureEvent = function GestureEvent() {};
    vm.createContext(ctx);
    vm.runInContext(NOZOOM, ctx, { filename: 'no-zoom.js' });
    const posalji = (tip, e) => {
        let otkazano = false;
        const ev = Object.assign({ preventDefault: () => { otkazano = true; } }, e || {});
        slusaci.filter((s) => s.tip === tip).forEach((s) => s.fn(ev));
        return otkazano;
    };
    return { slusaci, posalji };
}
{
    const bez = svijetGeste(false);
    tvrdi(bez.slusaci.length === 0, 'bez `GestureEvent` (Chrome/Android): NIJEDAN slušač — meta ondje radi, nepasivan touchmove bi usporio skrol');
    const s = svijetGeste(true);
    const tipovi = s.slusaci.map((x) => x.tip).sort().join(',');
    tvrdi(tipovi === 'gesturechange,gesturestart,touchmove', 's `GestureEvent` (WebKit): slušači gesturestart + gesturechange + touchmove, nađeno: ' + tipovi);
    tvrdi(s.slusaci.every((x) => x.opts && x.opts.passive === false), 'svi slušači su `passive: false` (pasivan ne smije otkazati ništa)');
    tvrdi(s.posalji('gesturestart') === true && s.posalji('gesturechange') === true, '`gesturestart` i `gesturechange` se otkazuju (štipanje s dva prsta)');
    tvrdi(s.posalji('touchmove', { scale: 2 }) === true, '`touchmove` sa `scale: 2` (štipanje) se otkazuje');
    tvrdi(s.posalji('touchmove', { scale: 1 }) === false, '`touchmove` sa `scale: 1` (skrol jednim prstom) se NE otkazuje');
    tvrdi(s.posalji('touchmove', {}) === false, '`touchmove` bez `scale` (drugi motori) se NE otkazuje');
}

console.log('\n' + (pao ? '❌ palo: ' + pao : '✅ sve prošlo') + '\n');
process.exit(pao ? 1 : 0);
