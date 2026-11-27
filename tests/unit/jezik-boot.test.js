/* eslint-disable no-console */
// ===== JEZIK SE ODLUČUJE PRIJE PRVOG CRTANJA (boot.js + i18n.js, BEZ PREGLEDNIKA) =====
// Pokreni: node tests/unit/jezik-boot.test.js  (uključeno u `npm run test:unit`)
//
// ZAŠTO POSTOJI (F3/1, Leon 16.09.: „oba jezika u stranici"): pravne stranice nose engleski
// i hrvatski blok, a CSS skriva onaj koji nije izabran po `<html data-ui-lang>`. Taj atribut
// MORA postojati prije nego se blokovi nacrtaju — da ga postavlja `i18n.js` (defer), korisnik
// s hrvatskim bi na svakom otvaranju Pravila privatnosti vidio bljesak engleskog teksta.
// Zato ga postavlja `boot.js` (jedina sinkrona skripta), a `i18n.js` pri prebacivanju zove
// ISTU funkciju — jedno mjesto koje zna kako se jezik primjenjuje na `<html>`.
//
// Ubiti se to da tiho na tri načina, i sva tri se ovdje love:
//   ① boot prestane čitati spremljeni jezik → HR korisnik dobiva EN do defer-skripte (bljesak)
//   ② `setUiLang` postavi `lang`, ali ne i `data-ui-lang` → prekidač promijeni sučelje, a
//      tijelo pravne stranice ostane na starom jeziku
//   ③ boot piše atribute i kad se ništa ne mijenja → badava preračun stila na svakom učitavanju
//      (i lažna „promjena" u testu bljeska teme koji broji stvarne promjene)

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const KORIJEN = path.join(__dirname, '..', '..');
const BOOT = fs.readFileSync(path.join(KORIJEN, 'js', 'boot.js'), 'utf8');
const I18N = fs.readFileSync(path.join(KORIJEN, 'js', 'i18n.js'), 'utf8');

let pao = 0;
const tvrdi = (uvjet, ime, detalj) => {
    if (uvjet) console.log('  ✅ ' + ime);
    else { pao++; console.log('  ❌ ' + ime + (detalj !== undefined ? '  → ' + JSON.stringify(detalj) : '')); }
};

/* Lažni svijet: `<html lang="en" data-theme="academic">` kao na svakoj stranici. */
function svijet(o) {
    const store = Object.assign({}, o.spremljeno || {});
    const attrs = { lang: o.lang || 'en', 'data-theme': 'academic' };
    // Stranice iz `build-seo-pages.js` nose `data-lang-fixed` — jezik SADRŽAJA, ne sučelja.
    if (o.langFiksan) attrs['data-lang-fixed'] = '';
    const zapisi = [];
    const html = {
        getAttribute: (k) => (k in attrs ? attrs[k] : null),
        hasAttribute: (k) => k in attrs,
        setAttribute: (k, v) => { attrs[k] = String(v); zapisi.push(k); },
        style: {},
    };
    const document = {
        documentElement: html,
        readyState: 'complete',
        body: { classList: { remove() {} } },
        querySelectorAll: () => [],
        getElementById: () => null,
        addEventListener: () => {},
    };
    const baci = () => { throw new Error('SecurityError'); };
    const localStorage = o.storageBaca
        ? { getItem: baci, setItem: baci, removeItem: baci }
        : {
            getItem: (k) => (k in store ? store[k] : null),
            setItem: (k, v) => { store[k] = String(v); },
            removeItem: (k) => { delete store[k]; },
        };
    const ctx = { document, localStorage, location: { hash: '', search: '' }, console, matchMedia: () => ({ matches: false }) };
    // Jezik uređaja (F3/2 cigla 3). Bez `o.uredjaj` navigatora NEMA — stari sandbox mora ostati engleski.
    if (o.uredjaj) ctx.navigator = { language: o.uredjaj[0], languages: o.uredjaj.slice() };
    ctx.window = ctx;
    vm.createContext(ctx);
    vm.runInContext(BOOT, ctx, { filename: 'boot.js' });
    const poslijeBoota = zapisi.slice();
    if (o.i18n) vm.runInContext(I18N, ctx, { filename: 'i18n.js' });
    return { ctx, store, attrs, zapisi, poslijeBoota };
}

console.log('\n=== jezik prije prvog crtanja (boot.js + i18n.js u sandboxu) ===\n');

{
    const s = svijet({ spremljeno: { 'sokrat-ui-lang': 'hr' } });
    tvrdi(s.attrs['data-ui-lang'] === 'hr', '① spremljen hrvatski → boot postavi data-ui-lang="hr"', s.attrs);
    tvrdi(s.attrs.lang === 'hr', '① … i <html lang="hr"> (čitač ekrana, WCAG 3.1.1)', s.attrs.lang);
}
{
    const s = svijet({ spremljeno: { 'sokrat-ui-lang': 'en' } });
    tvrdi(s.attrs.lang === 'en' && !('data-ui-lang' in s.attrs), 'spremljen engleski → engleski', s.attrs);
    tvrdi(s.poslijeBoota.filter((k) => k === 'lang' || k === 'data-ui-lang').length === 0,
        '③ engleski iz markupa se NE prepisuje istom vrijednošću', s.poslijeBoota);
}
{
    const s = svijet({ spremljeno: {} });
    tvrdi(s.attrs.lang === 'en' && !('data-ui-lang' in s.attrs), 'bez izbora → engleski, bez zapisa', s.attrs);
}
{
    const s = svijet({ spremljeno: { 'sokrat-ui-lang': 'de' } });
    tvrdi(s.attrs.lang === 'en' && !('data-ui-lang' in s.attrs), 'nepoznat jezik („de") → odbačen, engleski', s.attrs);
}
{
    let ok = true, s = null;
    try { s = svijet({ storageBaca: true }); } catch (e) { ok = false; }
    tvrdi(ok && s.attrs.lang === 'en', 'privatni način (localStorage baca) → engleski, bez pada');
}
{
    const s = svijet({ spremljeno: {} });
    tvrdi(typeof s.ctx.__sokratPrimijeniJezik === 'function', 'boot izlaže window.__sokratPrimijeniJezik');
}

/* ⑤ `data-lang-fixed` — generirane stranice predmeta (`scripts/build-seo-pages.js`).
   Dokument je CIJEL na jeziku svog programa i nema para na drugom jeziku, pa `lang`
   ondje opisuje SADRŽAJ. Prebacivanje sučelja ga ne smije pregaziti — inače čitač
   ekrana hrvatsku skriptu izgovara engleskim glasom (WCAG 3.1.1).
   Obrnuta provjera: bez `if (!fiksan …)` u `boot.js` prva tvrdnja pada. */
console.log('\n--- ⑤ data-lang-fixed: sadržaj nadjača sučelje ---\n');
{
    const s = svijet({ lang: 'hr', langFiksan: true, spremljeno: { 'sokrat-ui-lang': 'en' } });
    tvrdi(s.attrs.lang === 'hr', '⑤ hrvatska stranica predmeta + englesko sučelje → lang OSTAJE hr', s.attrs.lang);
}
{
    const s = svijet({ lang: 'en', langFiksan: true, spremljeno: { 'sokrat-ui-lang': 'hr' } });
    tvrdi(s.attrs.lang === 'en', '⑤ engleska stranica + hrvatsko sučelje → lang ostaje en', s.attrs.lang);
    tvrdi(s.attrs['data-ui-lang'] === 'hr',
        '⑤ … a data-ui-lang se I DALJE postavlja (cookie-traka, podnožje)', s.attrs);
}
{
    // Bez atributa se ništa ne mijenja: aplikacija i pravne stranice rade kao dosad.
    const s = svijet({ lang: 'en', spremljeno: { 'sokrat-ui-lang': 'hr' } });
    tvrdi(s.attrs.lang === 'hr', '⑤ bez data-lang-fixed → staro ponašanje (lang prati sučelje)', s.attrs.lang);
}
{
    // ② prekidač: i18n.js mora ići kroz boot-funkciju, inače tijelo pravne stranice ne prati prekidač
    const s = svijet({ spremljeno: {}, i18n: true });
    s.ctx.setUiLang('hr');
    tvrdi(s.attrs['data-ui-lang'] === 'hr' && s.attrs.lang === 'hr', '② setUiLang("hr") → data-ui-lang i lang = hr', s.attrs);
    tvrdi(s.store['sokrat-ui-lang'] === 'hr', '② … i izbor je zapamćen', s.store);
    s.ctx.setUiLang('en');
    tvrdi(s.attrs['data-ui-lang'] === 'en' && s.attrs.lang === 'en', '② natrag na „en" → oba atributa en', s.attrs);
}

// ④ JEZIK PRATI UREĐAJ (F3/2 cigla 3, Leon 16.09.): bez izbora presuđuje PRVI jezik uređaja, i to
// SAMO hrvatski otvara hrvatsko sučelje (*„nemamo veze sa srpskim niti crnogorskim niti bosanskim,
// eng i hrvatski su jednako bitni"*). Izbor uvijek pobjeđuje, a jezik uređaja se NE pamti kao izbor.
console.log('\n--- ④ jezik uređaja ---\n');
for (const [uredjaj, ocekivano] of [
    [['hr-HR'], 'hr'], [['hr'], 'hr'], [['HR-hr'], 'hr'],
    [['en-US'], 'en'], [['de-DE'], 'en'],
    [['sr-RS'], 'en'], [['bs-BA'], 'en'], [['cnr-ME'], 'en'], [['sr-Latn-RS'], 'en'],
    [['hrv'], 'en'],                         // nije BCP 47 oznaka hrvatskog — ne nagađa se
    [['en-US', 'hr-HR'], 'en'],              // hrvatski kao DRUGI jezik nije jezik uređaja
]) {
    const s = svijet({ spremljeno: {}, uredjaj });
    tvrdi(s.attrs.lang === ocekivano && (s.attrs['data-ui-lang'] || 'en') === ocekivano,
        `④ bez izbora, uređaj ${JSON.stringify(uredjaj)} → ${ocekivano}`, s.attrs);
}
{
    const s = svijet({ spremljeno: { 'sokrat-ui-lang': 'en' }, uredjaj: ['hr-HR'] });
    tvrdi(s.attrs.lang === 'en', '④ izbor „en" pobjeđuje hrvatski uređaj', s.attrs);
}
{
    const s = svijet({ spremljeno: { 'sokrat-ui-lang': 'hr' }, uredjaj: ['en-US'] });
    tvrdi(s.attrs.lang === 'hr', '④ izbor „hr" pobjeđuje engleski uređaj', s.attrs);
}
{
    const s = svijet({ spremljeno: { 'sokrat-ui-lang': 'de' }, uredjaj: ['hr-HR'] });
    tvrdi(s.attrs.lang === 'hr', '④ nevaljan zapis („de") nije izbor → presuđuje uređaj', s.attrs);
}
{
    const s = svijet({ storageBaca: true, uredjaj: ['hr-HR'] });
    tvrdi(s.attrs.lang === 'hr', '④ privatni način (localStorage baca) → i dalje uređaj', s.attrs);
}
{
    const s = svijet({ spremljeno: {}, uredjaj: ['hr-HR'], i18n: true });
    tvrdi(s.ctx.getUiLang() === 'hr', '④ i18n.js počinje istim jezikom kao boot (hrvatski uređaj)', s.ctx.getUiLang());
    tvrdi(!('sokrat-ui-lang' in s.store), '④ … a jezik uređaja se NE zapisuje kao izbor', s.store);
    s.ctx.toggleUiLang();
    tvrdi(s.store['sokrat-ui-lang'] === 'en' && s.attrs.lang === 'en', '④ prekidač → „en" zapamćen kao izbor', s.store);
}
{
    const s = svijet({ spremljeno: {}, uredjaj: ['sr-RS'], i18n: true });
    tvrdi(s.ctx.getUiLang() === 'en', '④ i18n.js: srpski uređaj → engleski', s.ctx.getUiLang());
}
{
    const s = svijet({ spremljeno: {} });
    tvrdi(typeof s.ctx.__sokratJezikUredjaja === 'function', '④ boot izlaže window.__sokratJezikUredjaja (jedno mjesto)');
}

if (pao) { console.log('\n❌ ' + pao + ' pad(ova)\n'); process.exit(1); }
console.log('\n✅ sve prolazi\n');
