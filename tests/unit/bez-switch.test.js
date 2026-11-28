/* eslint-disable no-console */
// ===== `?bez=` PREKIDAČ — boot.js u sandboxu + css/bez.css + sonda dijele JEDAN popis (F1/7 ②) =====
// Pokreni: node tests/unit/bez-switch.test.js  (uključeno u `npm run test:unit`)
//
// ZAŠTO POSTOJI: trzanje na iPhoneu instrument ne vidi (`jank-probe` je Chromium; Safari
// `background-attachment: fixed` crta kao `scroll`, a headless ne skrola prstom). Zato preview
// dobiva prekidač `?bez=zamucenja,sjena,prijelaza,pozadine`: `js/boot.js` PRIJE prvog crtanja
// upiše `data-bez="…"` na <html>, `css/bez.css` gasi sumnjivca, Leon na telefonu kaže koji je
// scenarij gladak — tek iz toga popravak (RASPORED F1/7 ②). Tri stvari lako puknu tiho:
//   ① boot.js: prekidač u `defer` skripti bi mjerio PRIJELAZ, ne stanje; nesaniran unos bi u
//      atribut ugurao bilo što; `?x=1&bez=…#/ruta` mora proći kao i goli `?bez=`.
//   ② bundle: pravilo za svako ime, i to s `!important` (mora pobijediti sve, uklj. inline stil).
//   ③ JEDNO MJESTO (ADR-027): sonda `jank-probe` NE smije nositi vlastitu kopiju zabrana
//      (`addStyleTag`) nego popis čita iz `css/bez.css` i postavlja isti atribut.
// Ovdje se popis imena NE prepisuje: čita se iz `css/bez.css`, pa novi sumnjivac traži samo
// jedno novo pravilo — i test, i sonda, i boot.js ga znaju sami.

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const KORIJEN = path.join(__dirname, '..', '..');
const BOOT = fs.readFileSync(path.join(KORIJEN, 'js', 'boot.js'), 'utf8');
const BEZ = fs.readFileSync(path.join(KORIJEN, 'css', 'bez.css'), 'utf8');
const BUNDLE = fs.readFileSync(path.join(KORIJEN, 'styles.bundle.css'), 'utf8');
const SONDA = fs.readFileSync(path.join(KORIJEN, 'scripts', 'jank-probe.js'), 'utf8');
const MANIFEST = fs.readFileSync(path.join(KORIJEN, 'css', 'app.css'), 'utf8');

let pao = 0;
const tvrdi = (uvjet, ime, detalj) => {
    if (uvjet) console.log('  ✅ ' + ime);
    else { pao++; console.log('  ❌ ' + ime + (detalj !== undefined ? '  → ' + JSON.stringify(detalj) : '')); }
};

/* Lažni svijet kao u theme-device.test.js: markup nosi `data-theme`, uređaj svijetao,
   localStorage prazan; `search` je ono što se testira. Vraća atribute <html> poslije boota. */
function svijet(search) {
    const attrs = { 'data-theme': 'academic' };
    const html = {
        getAttribute: (k) => (k in attrs ? attrs[k] : null),
        // `boot.js` pita `hasAttribute('data-lang-fixed')` — pravi <html> ga uvijek ima.
        hasAttribute: (k) => k in attrs,
        setAttribute: (k, v) => { attrs[k] = String(v); },
        style: {},
    };
    const document = {
        documentElement: html,
        body: { classList: { remove() {} } },
        querySelectorAll: () => [],
        addEventListener() {},
    };
    const localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
    const ctx = { document, localStorage, location: { hash: '', search }, console };
    ctx.window = ctx;
    ctx.matchMedia = () => ({ matches: false, addEventListener() {} });
    vm.createContext(ctx);
    vm.runInContext(BOOT, ctx, { filename: 'boot.js' });
    return attrs;
}

// Bez komentara: zaglavlje modula OBJAŠNJAVA obrazac (`[data-bez~="ime"]`) i ne smije postati scenarij —
// prvi prolaz ga je pokupio, i sonda bi mjerila scenarij `bez-ime` koji ne gasi ništa.
const bezKomentara = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');
const BEZ_PRAVILA = bezKomentara(BEZ);
const IMENA = Array.from(new Set(Array.from(BEZ_PRAVILA.matchAll(/\[data-bez~="([a-z-]+)"\]/g), (m) => m[1])));

console.log('\n=== `?bez=` prekidač (F1/7 ②) ===\n');

// ── ① boot.js ──────────────────────────────────────────────────────────────────
{
    tvrdi(IMENA.length >= 4, 'css/bez.css imenuje bar 4 sumnjivca: ' + IMENA.join(', '), IMENA);
    tvrdi(IMENA.indexOf('ime') < 0 && /\[data-bez~="ime"\]/.test(BEZ),
        'primjer iz komentara modula (`ime`) NIJE scenarij — komentari se skidaju prije čitanja popisa');
    const dva = IMENA.slice(0, 2);
    tvrdi(svijet('?bez=' + dva.join(','))['data-bez'] === dva.join(' '),
        '`?bez=' + dva.join(',') + '` → data-bez="' + dva.join(' ') + '" (zarez → razmak, za `~=`)');
    tvrdi(svijet('?x=1&bez=' + dva[0] + '&y=2')['data-bez'] === dva[0], 'prekidač usred drugih parametara');
    tvrdi(!('data-bez' in svijet('')), 'bez `?bez=` nema atributa (posjetitelj ne plaća ništa)');
    tvrdi(!('data-bez' in svijet('?bez=')), 'prazan `?bez=` nema atributa');
    tvrdi(svijet('?bez=' + dva[0] + ',%3Cscript%3E,Velika,x_y')['data-bez'] === dva[0],
        'saniranje: u atribut ulaze samo imena iz [a-z-] — `<script>`, velika slova i `_` otpadaju');
    let bacio = false, a = {};
    try { a = svijet('?bez=%E0%A4%A'); } catch (e) { bacio = true; }
    tvrdi(!bacio && !('data-bez' in a), 'pokvaren URL-encoding ne ruši boot (tema se svejedno primjenjuje)');
    tvrdi(svijet('?bez=' + dva[0])['data-theme'] === 'academic', 'tema se i dalje primjenjuje uz prekidač');
    tvrdi(/location\.search/.test(BOOT) && /data-bez/.test(BOOT), 'boot.js čita `location.search` i piše `data-bez` (prije prvog crtanja, jer je boot sinkron)');
}

// ── ② bundle: pravilo za svako ime, s `!important` ─────────────────────────────
{
    tvrdi(/@import\s+"\.\/bez\.css"/.test(MANIFEST), 'css/app.css uvozi bez.css (inače pravila nikad ne stignu do preglednika)');
    for (const ime of IMENA) {
        const re = new RegExp('\\[data-bez~="' + ime + '"\\][^{]*\\{([^}]*)\\}');
        const m = BUNDLE.match(re);
        tvrdi(!!m, 'bundle: pravilo za `' + ime + '` postoji');
        tvrdi(!!m && /!important/.test(m[1]), 'bundle: pravilo za `' + ime + '` nosi `!important` (mora pobijediti sve)');
    }
    const bezAtributa = (BUNDLE.match(/data-bez/g) || []).length;
    const uPravilima = (BUNDLE.match(/\[data-bez~=/g) || []).length;
    tvrdi(bezAtributa === uPravilima, 'bundle: `data-bez` se pojavljuje SAMO u `[data-bez~=…]` selektorima (nikad kao goli uvjet)', { bezAtributa, uPravilima });
}

// ── ③ sonda: isti popis, isti atribut, bez vlastite kopije ─────────────────────
{
    tvrdi(!/addStyleTag/.test(SONDA), 'jank-probe NE ubrizgava vlastiti CSS (`addStyleTag`) — zabrane žive u css/bez.css');
    tvrdi(/bez\.css/.test(SONDA) && /data-bez/.test(SONDA), 'jank-probe čita css/bez.css i postavlja `data-bez`');
    tvrdi(/readFileSync\([^;]*bez\.css[^;]*\)\s*\.replace\(/.test(SONDA), 'sonda skida komentare PRIJE čitanja popisa (inače je `ime` iz zaglavlja scenarij)');
    const sondaRe = SONDA.match(/matchAll\((\/[^/]+\/g)\)/);
    const sondaImena = sondaRe ? Array.from(new Set(Array.from(BEZ_PRAVILA.matchAll(new RegExp(sondaRe[1].slice(1, -2), 'g')), (m) => m[1]))) : [];
    tvrdi(sondaImena.join(',') === IMENA.join(','), 'sonda istim regexom nalazi ISTA imena: ' + sondaImena.join(', '), sondaImena);
}

console.log('\n' + (pao ? '❌ palo: ' + pao : '✅ sve prošlo') + '\n');
process.exit(pao ? 1 : 0);
