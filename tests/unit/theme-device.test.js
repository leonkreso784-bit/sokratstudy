/* eslint-disable no-console */
// ===== TEMA PRATI UREĐAJ — PONAŠANJE boot.js + theme.js, BEZ PREGLEDNIKA =====
// Pokreni: node tests/unit/theme-device.test.js  (uključeno u `npm run test:unit`)
//
// ZAŠTO POSTOJI (F1/3, Leon 2026-09-04: „isto kao i email template"): bez spremljenog
// izbora stranica prati `prefers-color-scheme` — tamno → `carbon`, svijetlo → `academic`.
// `theme-boot-order.test.js` čuva DA se odluka donosi prije crtanja; ovaj čuva ŠTO odluči.
//
// Dvije stvari su ovdje lako ubiti a nijedna postojeća brana to ne bi vidjela:
//   ① MIGRACIJA: produkcija je do F1/3 na svakom učitavanju upisivala `academic` u
//      `sokrat-theme` — pa ga SVAKI povratni posjetitelj ima bez da je birao. Čita li se to
//      kao izbor, „prati uređaj" ne dobiva nitko. `academic` bez biljega `sokrat-theme-chosen`
//      mora biti NIŠTA; `chalk` bez biljega mora OSTATI (star, ali stvaran izbor).
//   ② ZAPIS NA UČITAVANJU: vrati li netko `setItem('sokrat-theme', theme)` u `initTheme()`,
//      „Automatski" traje točno jedno učitavanje — sljedeće ga vidi kao izbor.
// Obje skripte se vrte u `vm` sandboxu s lažnim `document`/`localStorage`/`matchMedia`,
// pa test ne treba ni preglednik ni poslužitelj.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const KORIJEN = path.join(__dirname, '..', '..');
const BOOT = fs.readFileSync(path.join(KORIJEN, 'js', 'boot.js'), 'utf8');
const TEMA = fs.readFileSync(path.join(KORIJEN, 'js', 'theme.js'), 'utf8');

let pao = 0;
const tvrdi = (uvjet, ime, detalj) => {
    if (uvjet) console.log('  ✅ ' + ime);
    else { pao++; console.log('  ❌ ' + ime + (detalj !== undefined ? '  → ' + JSON.stringify(detalj) : '')); }
};

/* Lažni svijet: markup nosi `data-theme="academic"` kao index.html; uređaj je `tamno`;
   `spremljeno` je početni localStorage. `storageBaca` glumi privatni način (svaki poziv baca). */
function svijet(o) {
    const store = Object.assign({}, o.spremljeno || {});
    const attrs = { 'data-theme': 'academic' };
    let postavljanja = 0;
    const html = {
        getAttribute: (k) => (k in attrs ? attrs[k] : null),
        // `boot.js` pita `hasAttribute('data-lang-fixed')` — pravi <html> ga uvijek ima.
        hasAttribute: (k) => k in attrs,
        setAttribute: (k, v) => { attrs[k] = String(v); postavljanja++; },
        style: {},
    };
    const slusaci = {};
    const document = {
        documentElement: html,
        body: { classList: { remove() {} } },
        querySelectorAll: () => [],
        addEventListener: (ev, fn) => { (slusaci[ev] = slusaci[ev] || []).push(fn); },
    };
    const baci = () => { throw new Error('SecurityError: localStorage nedostupan'); };
    const localStorage = o.storageBaca
        ? { getItem: baci, setItem: baci, removeItem: baci }
        : {
            getItem: (k) => (k in store ? store[k] : null),
            setItem: (k, v) => { store[k] = String(v); },
            removeItem: (k) => { delete store[k]; },
        };
    const mqSlusaci = [];
    const mq = { matches: !!o.tamno, addEventListener: (ev, fn) => mqSlusaci.push(fn) };
    const ctx = { document, localStorage, location: { hash: '' }, console };
    ctx.window = ctx;
    if (!o.bezMatchMedia) ctx.matchMedia = () => mq;
    vm.createContext(ctx);
    vm.runInContext(BOOT, ctx, { filename: 'boot.js' });
    vm.runInContext(TEMA, ctx, { filename: 'theme.js' });
    return {
        ctx, store, attrs,
        tema: () => attrs['data-theme'],
        shema: () => html.style.colorScheme,
        postavljanja: () => postavljanja,
        dcl: () => (slusaci.DOMContentLoaded || []).forEach((f) => f()),
        uredjaj: (tamno) => { mq.matches = tamno; mqSlusaci.forEach((f) => f()); },
    };
}

console.log('\n=== tema prati uređaj (boot.js + theme.js u sandboxu) ===\n');

// ── 1 · bez izbora: uređaj odlučuje ──────────────────────────────────────────
{
    const s = svijet({ tamno: true });
    tvrdi(s.tema() === 'carbon', 'ništa spremljeno + tamni uređaj → carbon', s.tema());
    tvrdi(s.shema() === 'dark', '… i color-scheme je dark', s.shema());
    tvrdi(s.ctx.getThemeChoice() === 'auto', '… birač vidi „auto"', s.ctx.getThemeChoice());
    s.dcl();
    tvrdi(!('sokrat-theme' in s.store), '② DOMContentLoaded NE upisuje temu u localStorage (auto ostaje auto)', s.store);
}
{
    const s = svijet({ tamno: false });
    tvrdi(s.tema() === 'academic', 'ništa spremljeno + svijetli uređaj → academic', s.tema());
    tvrdi(s.shema() === 'light', '… i color-scheme je light', s.shema());
    tvrdi(s.postavljanja() === 0, '… atribut iz markupa se NE prepisuje istom vrijednošću', s.postavljanja());
}

// ── 2 · izbor pobjeđuje uređaj ───────────────────────────────────────────────
{
    const s = svijet({ tamno: true, spremljeno: { 'sokrat-theme': 'academic', 'sokrat-theme-chosen': '1' } });
    tvrdi(s.tema() === 'academic', 'izabran academic (s biljegom) + tamni uređaj → academic', s.tema());
    tvrdi(s.ctx.getThemeChoice() === 'academic', '… birač vidi academic', s.ctx.getThemeChoice());
    s.dcl();
    tvrdi(s.store['sokrat-theme'] === 'academic', '… i zapis preživi DOMContentLoaded', s.store);
}
{
    const s = svijet({ tamno: false, spremljeno: { 'sokrat-theme': 'chalk', 'sokrat-theme-chosen': '1' } });
    tvrdi(s.tema() === 'chalk' && s.shema() === 'dark', 'izabran chalk + svijetli uređaj → chalk (dark)', [s.tema(), s.shema()]);
}

// ── 3 · MIGRACIJA starih zapisa (produkcija je pisala bez biljega) ───────────
{
    const s = svijet({ tamno: true, spremljeno: { 'sokrat-theme': 'academic' } });
    tvrdi(s.tema() === 'carbon', '① stari automatski `academic` BEZ biljega + tamni uređaj → carbon (nije izbor)', s.tema());
    tvrdi(s.ctx.getThemeChoice() === 'auto', '… birač vidi „auto", ne academic', s.ctx.getThemeChoice());
    s.dcl();
    tvrdi(!('sokrat-theme' in s.store), '… DOMContentLoaded počisti stari zapis', s.store);
}
{
    const s = svijet({ tamno: true, spremljeno: { 'sokrat-theme': 'chalk' } });
    tvrdi(s.tema() === 'chalk', '① stari `chalk` BEZ biljega OSTAJE izbor (samo birana tamna se pisala)', s.tema());
    s.dcl();
    tvrdi(s.store['sokrat-theme'] === 'chalk', '… i ne briše se na DOMContentLoaded', s.store);
}
{
    const s = svijet({ tamno: true, spremljeno: { 'sokrat-theme': 'paper' } });
    tvrdi(s.tema() === 'carbon', 'maknuti `paper` + tamni uređaj → carbon (uređaj, ne academic)', s.tema());
    s.dcl();
    tvrdi(!('sokrat-theme' in s.store), '… i zapis se počisti', s.store);
}

// ── 4 · rubovi okruženja ─────────────────────────────────────────────────────
{
    const s = svijet({ tamno: true, bezMatchMedia: true });
    tvrdi(s.tema() === 'academic', 'bez matchMedia → svijetla zadana (ne ruši se)', s.tema());
}
{
    const s = svijet({ tamno: true, storageBaca: true });
    tvrdi(s.tema() === 'carbon', 'localStorage baca (privatni način) → uređaj i dalje odlučuje', s.tema());
    let ok = true;
    try { s.dcl(); s.ctx.setTheme('mint'); } catch (e) { ok = false; }
    // Bez zapisa nema ni izbora: izbor se čita iz storagea, pa se bez njega pada na uređaj.
    // (Prva verzija ovog testa tvrdila je „primijeni do reloada" — sandbox ju je oborio.)
    tvrdi(ok && s.tema() === 'carbon', '… setTheme bez zapisa se ne ruši; bez zapisa nema izbora → ostaje uređaj', s.tema());
}

// ── 5 · setTheme / auto / praćenje uređaja uživo ─────────────────────────────
{
    const s = svijet({ tamno: true });
    tvrdi(s.ctx.setTheme('mint') === true && s.tema() === 'mint', 'setTheme(mint) → mint', s.tema());
    tvrdi(s.store['sokrat-theme'] === 'mint' && s.store['sokrat-theme-chosen'] === '1', '… zapis nosi temu I biljeg', s.store);
    tvrdi(s.ctx.setTheme('paper') === false && s.tema() === 'mint', 'setTheme(paper) → false, ništa se ne mijenja', s.tema());
    s.uredjaj(false);
    tvrdi(s.tema() === 'mint', 'promjena uređaja dok postoji izbor → izbor se NE gazi', s.tema());
    tvrdi(s.ctx.setTheme('auto') === true && s.tema() === 'academic', 'setTheme(auto) → uređaj (sad svijetli) → academic', s.tema());
    tvrdi(!('sokrat-theme' in s.store) && !('sokrat-theme-chosen' in s.store), '… zapis i biljeg su obrisani', s.store);
    s.uredjaj(true);
    tvrdi(s.tema() === 'carbon' && s.shema() === 'dark', 'promjena uređaja u auto → tema slijedi uživo (carbon)', [s.tema(), s.shema()]);
}

console.log('\n' + (pao ? '❌ palo: ' + pao : '✅ sve prošlo') + '\n');
process.exit(pao ? 1 : 0);
