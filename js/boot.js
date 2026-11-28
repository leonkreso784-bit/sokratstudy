/* ===== Sokrat Study — boot: odluke PRIJE prvog crtanja =====
 * JEDINA sinkrona skripta na stranici (bez `defer`), umetnuta na sam vrh <body>.
 * Postoji jer CSP (blok D) zabranjuje inline <script> i on* atribute, a ove dvije
 * stvari ne smiju čekati `defer`: sinkrona vanjska skripta blokira parser, pa se
 * izvrši prije prvog crtanja — isto jamstvo koje je davao inline blok.
 */
(function () {
    'use strict';

    /* ===== TEMA — MORA BITI OVDJE, NE U `theme.js` =====
       `<html data-theme="academic">` stoji u markupu i komentar iznad njega je tvrdio da je
       time bljesak riješen. Bio je — SAMO za posjetitelja koji vrti zadanu temu. `chalk` i
       `mint` su TAMNE, pa je za njih prvi kadar zajamčeno svijetao: `initTheme()` je visio o
       `DOMContentLoaded`, a njega čeka 42 skripte koje blokiraju parser.
       IZMJERENO prije popravka (`scripts/fouc-probe.js`, produkcija, spremljen `chalk`):
       FCP 608 ms → tema 727 ms = **119 ms svijetle stranice** na dobroj vezi, 232 ms na Slow-4G.
       Ovdje se izvršava prije prvog crtanja, pa je razlika 0.
       ⚠️ POPIS TEMA ŽIVI OVDJE (a `theme.js` ga čita s `window`) — jedan popis, jedno mjesto:
       druga kopija bi se razišla pri prvoj sljedećoj temi, a razlaz bi se vidio tek kao bljesak. */
    var TEME = ['academic', 'chalk', 'mint', 'carbon'];
    var TAMNE = { chalk: 1, mint: 1, carbon: 1 };

    /* F1/3 (Leon, 2026-09-04: „isto kao i email template"): bez spremljenog IZBORA stranica
       prati UREĐAJ, točno kao predlošci maila — `prefers-color-scheme: dark` → `carbon`
       (tamna polovica maila), inače `academic` (svijetla). Prvenstvo, zapisano JEDNOM:
       račun (F2/1) > lokalni izbor > uređaj > academic. Odluka „zadana je SVIJETLA"
       (2026-08-13) stoji: crno dobiva samo tko ga je uređajem već tražio, ne svaki posjetitelj. */
    var ZADANA = { light: 'academic', dark: 'carbon' };

    function temaUredjaja() {
        try {
            return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
                ? ZADANA.dark : ZADANA.light;
        } catch (e) { return ZADANA.light; }
    }

    /* Spremljeni IZBOR, ili null kad ga nema.
       Nepoznata vrijednost (zaostali `dark`, maknuti `paper`) se ODBACUJE, ne propušta: ne bi
       pogodila nijedan token-blok, ali BI upalila legacy pravila za tamnu temu → bijeli tekst
       na svijetloj podlozi.
       ⚠️ MIGRACIJA, ne urednost: do F1/3 je `theme.js` na SVAKOM učitavanju upisivao
       primijenjenu temu natrag u `sokrat-theme` — pa svaki povratni posjetitelj ima `academic`
       iako nikad nije birao. Da se to čita kao izbor, „prati uređaj" ne bi dobio NITKO tko je
       stranicu već otvorio (ni Leon). Zato izbor od F1/3 nosi i biljeg `sokrat-theme-chosen`:
       `academic` BEZ biljega je stari automatski upis i odbacuje se. `chalk`/`mint`/`carbon`
       bez biljega su sigurno izbor (stari kod je upisivao samo ono što je primijenio, a tamnu
       je primijenio samo tko ju je birao) — pa se ZADRŽAVAJU, inače bi Ploča koju je netko
       birao na telefonu nestala. Isto pravilo čita i `theme.js` (birač), kroz ovu funkciju. */
    function izborTeme() {
        var spremljena = null, biljeg = null;
        try {
            spremljena = localStorage.getItem('sokrat-theme');
            biljeg = localStorage.getItem('sokrat-theme-chosen');
        } catch (e) { /* privatni način */ }
        if (TEME.indexOf(spremljena) < 0) return null;
        if (spremljena === ZADANA.light && !biljeg) return null;
        return spremljena;
    }

    function primijeniTemu() {
        var tema = izborTeme() || temaUredjaja();
        var html = document.documentElement;
        // Postavljamo samo kad se RAZLIKUJE — inače je to badava preračun stila na svakom
        // učitavanju, a i test na bljesak broji upravo stvarne promjene vrijednosti.
        if (html.getAttribute('data-theme') !== tema) html.setAttribute('data-theme', tema);
        html.style.colorScheme = TAMNE[tema] ? 'dark' : 'light';
        return tema;
    }

    window.SOKRAT_THEMES = TEME;
    window.__sokratIzborTeme = izborTeme;
    window.__sokratTemaUredjaja = temaUredjaja;
    window.__sokratPrimijeniTemu = primijeniTemu;
    primijeniTemu();

    /* ===== JEZIK — isto pravilo kao tema: odluka PRIJE prvog crtanja =====
       F3/1 (Leon, 2026-09-16: „oba jezika u stranici"): pravne stranice nose engleski i hrvatski
       blok (`.jezik[lang]`), a `css/legal.css` skriva onaj koji nije izabran po `data-ui-lang`.
       Da atribut postavlja tek `i18n.js` (defer), hrvatski korisnik bi pri svakom otvaranju
       Pravila privatnosti vidio bljesak engleskog. `lang` ide uz njega: čitač ekrana hrvatske
       rečenice inače izgovara engleskim glasom (WCAG 3.1.1).
       ⚠️ `i18n.js` pri prebacivanju zove OVU funkciju — jedno mjesto koje zna što „primijeniti
       jezik na <html>" znači. Izbor (ključ `sokrat-ui-lang`) i dalje upisuje samo `i18n.js`.
       Čuva `tests/unit/jezik-boot.test.js`. */
    var JEZICI = ['en', 'hr'];

    function primijeniJezik(jezik) {
        var j = JEZICI.indexOf(jezik) >= 0 ? jezik : 'en';
        var html = document.documentElement;
        /* ⚠️ `data-lang-fixed` (stranice iz `scripts/build-seo-pages.js`): dokument je
           CIJEL na jeziku svog programa i nema para na drugom jeziku. Ondje `lang`
           opisuje SADRŽAJ, a ne sučelje, pa ga prebacivanje ne smije dirati — inače
           čitač ekrana hrvatsku skriptu izgovara engleskim glasom, točno onaj kvar
           (WCAG 3.1.1) zbog kojeg je ovaj upis i uveden, samo obrnut. `data-ui-lang`
           se i dalje postavlja, pa cookie-traka i podnožje ostaju prevedeni. */
        var fiksan = html.hasAttribute('data-lang-fixed');
        // Samo stvarne promjene: `<html lang="en">` iz markupa bez atributa = engleski, bez zapisa.
        if (!fiksan && (html.getAttribute('lang') || 'en') !== j) html.setAttribute('lang', j);
        if ((html.getAttribute('data-ui-lang') || 'en') !== j) html.setAttribute('data-ui-lang', j);
        return j;
    }

    /* F3/2 cigla 3 (Leon, 16.09.): BEZ IZBORA JEZIK PRATI UREĐAJ — isto pravilo kao tema.
       Samo hrvatski uređaj dobiva hrvatsko sučelje; susjedni jezici NE (*„nemamo veze sa srpskim
       niti crnogorskim niti bosanskim, eng i hrvatski su jednako bitni"*). Gleda se PRVI jezik
       uređaja: hrvatski kao drugi na popisu je rezerva, ne jezik uređaja. Jezik uređaja se NE
       zapisuje — izbor nastaje tek na prekidaču. Mijenja SAMO sučelje; gradivo ostaje na jeziku
       na kojem je napravljeno (ADR-012). `i18n.js` pita ovu funkciju, ne nosi svoju kopiju. */
    function jezikUredjaja() {
        var n = window.navigator;
        var prvi = n ? ((n.languages && n.languages[0]) || n.language) : '';
        return /^hr(-|$)/i.test(String(prvi || '')) ? 'hr' : 'en';
    }

    var spremljeniJezik = null;
    try { spremljeniJezik = localStorage.getItem('sokrat-ui-lang'); } catch (e) { /* privatni način */ }
    window.__sokratPrimijeniJezik = primijeniJezik;
    window.__sokratJezikUredjaja = jezikUredjaja;
    primijeniJezik(JEZICI.indexOf(spremljeniJezik) >= 0 ? spremljeniJezik : jezikUredjaja());

    /* F1/7 ② · `?bez=zamucenja,sjena` → `<html data-bez="zamucenja sjena">` PRIJE prvog crtanja.
       Protučinjenični prekidač za mjerenje na PRAVOM uređaju: `css/bez.css` gasi sumnjivca
       (zamućenje · sjene · prijelazi · pozadina landinga), Leon na iPhoneu kaže koji je scenarij
       gladak, tek iz toga popravak — `jank-probe` je Chromium i iPhone ne vidi. Popis imena živi
       SAMO u `css/bez.css`: ovdje prolazi bilo koje ime iz [a-z-], nepoznato ne pogađa nijedno
       pravilo. Ovdje, a ne u `defer` skripti, da PRVI kadar već bude „bez" (inače se mjeri
       prijelaz, ne stanje); atribut nadživi čišćenje adrese (`replaceState` u auth.js) jer je
       SPA — <html> ostaje. Čuva `tests/unit/bez-switch.test.js`. */
    var bez = /[?&]bez=([^&#]*)/.exec(String(location.search || ''));
    if (bez) {
        var imena = [];
        try {
            imena = decodeURIComponent(bez[1]).split(',').filter(function (s) { return /^[a-z-]+$/.test(s); });
        } catch (e) { /* pokvaren URL-encoding: nema prekidača, tema ide dalje */ }
        if (imena.length) document.documentElement.setAttribute('data-bez', imena.join(' '));
    }

    /* Dijeljiva ruta (K1) znači da posjetitelj smije ući RAVNO na browse ili lekciju, gdje
       drugi red trake POSTOJI. Odluka se zato mora donijeti prije prvog crtanja, a ne u
       `navigateTo`: `<body class="no-pathbar">` stoji u markupu zbog CLS-a (izmjereno 0.1546
       uz prag 0.10 kad je klasu dodavao tek probuđeni JS), pa ju za duboke rute treba
       skinuti PRIJE nego preglednik išta nacrta. Na stranicama bez te klase (editor) je no-op. */
    if (location.hash.indexOf('#/') === 0 && location.hash !== '#/') {
        document.body.classList.remove('no-pathbar');
    }

    /* KaTeX CSS se učitava asinkrono trikom `media="print"` → `media="all"` po loadu.
       Prebacivanje je živjelo u `onload` atributu; CSP ga zabranjuje, pa link nosi
       `data-media-swap`, a prebacuje se ovdje. `l.sheet` pokriva slučaj da je stylesheet
       (iz cachea) već učitan prije nego što se ova skripta izvršila. */
    var links = document.querySelectorAll('link[data-media-swap]');
    for (var i = 0; i < links.length; i++) {
        (function (l) {
            if (l.sheet) { l.media = 'all'; return; }
            l.addEventListener('load', function () { l.media = 'all'; });
        })(links[i]);
    }
})();
