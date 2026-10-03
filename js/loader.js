/* ===== SokratLoad — UČITAVANJE PO RUTI =====
 *
 * ZAŠTO POSTOJI (izmjereno 2026-09-04, `scripts/perf-probe.js`): posjetitelj koji samo otvori
 * naslovnicu dobivao je SVE — sedam načina učenja, vježbe, slijepu kartu, profil, materijale —
 * iako od toga ne vidi ništa dok ne otvori lekciju. Protučinjenični pokus nad produkcijom
 * (`--bez=js`) rekao je da tih ~35 skripti nosi **~1270 ms** prvog kadra (2856 → 1588 ms), dok
 * sva tri CDN-a zajedno nose ~320 ms. Krivac NISU bajtovi nego BROJ ZAHTJEVA: `styles.bundle.css`
 * je jedini resurs koji drži prvi kadar, kreće na 293 ms — a stiže na 2244 ms, jer 46 zahtjeva
 * dijeli istu vezu. Skripta koju posjetitelj neće otvoriti ne otima mu samo propusnost nego
 * i prvi kadar. (`--defer` je izmjeren i ODBAČEN: prioritet parsera nije bio uzrok.)
 *
 * ŠTO RADI: paket = imenovan skup skripti koje idu zajedno jer se zajedno i koriste. Traži ih
 * se po IMENU, uz `await`, na mjestu gdje su prvi put doista potrebne. Drugi poziv za isti
 * paket ne skida ništa — vraća isto obećanje.
 *
 * ⚠️ VERZIJA SE NE PIŠE OVDJE. `npm run bump` (BUG-004, ADR-017) prepisuje `?v=` tokene u
 * `*.html`, `styles.css`, `css/*.css` i `manifest.json` — NE u `js/**`. Token zapisan u ovoj
 * datoteci ostario bi tiho i posjetitelj bi zauvijek dobivao staru skriptu iz immutable
 * cachea. Zato se čita iz `src` OVE skripte, koju bump uredno bumpa.
 *
 * ⚠️ REDOSLIJED UNUTAR PAKETA JE ZAJAMČEN (`s.async = false` = „in-order" način za dinamički
 * ubačene skripte). Time paket nasljeđuje točno ono jamstvo koje je davao redoslijed tagova
 * u `index.html`; bez toga bi `blocks-renderer.js` znao stići prije `math.js`.
 *
 * ⚠️ VANJSKI PODRESURSI I OVDJE IDU POD SRI. Da tag ode iz HTML-a, `check:cdn` bi ga izgubio
 * iz vida — pa provjera #3 te brane čita URL/SRI konstante iz ove datoteke, a provjera #5
 * pada ako se u `js/**` pojavi CDN-URL koji na tom popisu NIJE.
 */
(function () {
    'use strict';

    // ── VANJSKI PODRESURSI (pinano + SRI; imena konstanti čita `scripts/check-cdn.js`) ──
    var KATEX_CSS_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css';
    var KATEX_CSS_SRI = 'sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV';
    var KATEX_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js';
    var KATEX_SRI = 'sha384-XjKyOOlGwcjNTAIQHIpgOno0Hl1YQqzUOEleOLALmuqehneUG+vnGctmUb0ZY0l8';
    var KATEX_AUTORENDER_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js';
    var KATEX_AUTORENDER_SRI = 'sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05';
    // DOMPurify se od F6 ②/0d poslužuje s NAŠE domene (Leon, anketa 30.09.): bez njega sadržaj s HTML-om
    // ide kao tekst, pa pad tuđeg CDN-a ne smije biti čest razlog ružne lekcije. Bajtovi su identični
    // cdnjs 3.2.6 (isti SRI, provjereno pri preuzimanju) i SRI ostaje — preglednik ih i dalje mjeri.
    var DOMPURIFY_SRC = 'vendor/dompurify/3.2.6/purify.min.js';
    var DOMPURIFY_SRI = 'sha384-JEyTNhjM6R1ElGoJns4U2Ln4ofPcqzSsynQkmEc/KGy6336qAZl70tDLufbkla+3';

    /* PAKETI — što ide zajedno i ZAŠTO baš tako.
       ⚠️ Rez je povučen po TOME ŠTO KORISNIK RADI, ne po veličini datoteka: `initStudyPage`
       pri otvaranju lekcije zove kartice, kviz, dopune, learn i napredak u istom dahu (reset
       svih pod-modova, BUG-020), pa bi ih dijeliti značilo pet čekanja umjesto jednog.
       Slijepa karta i vježbe su izvan toga jer ih ima SAMO dio predmeta (catalog `features`)
       i otvaraju se tek klikom na svoj tab.

       ⚠️ `content-loader.js` i `content-repo.js` SVJESNO OSTAJU u markupu iako ih treba samo
       lekcija: `CONTENT_VERSION` je globalni ugovor (čita ga `offline-store.js`, a `npm run
       bump` ga piše baš u tu datoteku), pa bi njihova selidba značila da polica bez otvorene
       lekcije radi s praznom verzijom. Dobitak je 13 KB, cijena tiha i teško uočljiva — ne
       isplati se. */
    var PAKETI = {
        study: [
            // KaTeX/DOMPurify: `neobavezno` = pad CDN-a ne ruši lekciju (renderer i math.js
            // imaju fallback). Stil se smije skidati usporedno — nitko ga ne izvršava.
            //
            // ⚠️ SKRIPTE OVDJE **NISU** `usporedno`, i to je izmjerena odluka, ne oprez.
            // `auto-render` traži da `katex` VEĆ POSTOJI u trenutku izvršavanja; s `async`
            // redoslijed određuje mreža, pa je otprilike svaki drugi put stizao prvi i tiho
            // se rušio u `try/catch` unutar `renderMath` — lekcija bi se otvorila, a formule
            // ostale sirov LaTeX. Nedeterministički, pa je dvaput prošlo i dvaput palo prije
            // nego se uzrok vidio. U markupu je isti poredak jamčio `defer`; ovdje ga jamči
            // `script.async = false`. (Uhvaćeno usporedbom s referentnim stablom: 26 formula
            // ondje, 0 ovdje.)
            { src: KATEX_CSS_SRC, sri: KATEX_CSS_SRI, stil: true, neobavezno: true, usporedno: true },
            { src: KATEX_SRC, sri: KATEX_SRI, neobavezno: true },
            { src: KATEX_AUTORENDER_SRC, sri: KATEX_AUTORENDER_SRI, neobavezno: true },
            { src: DOMPURIFY_SRC, sri: DOMPURIFY_SRI, neobavezno: true },
            'js/math.js',
            'js/blocks-renderer.js',
            'js/flashcards.js',
            'js/quiz.js',
            'js/fill-blanks.js',
            'js/learn.js',
            'js/progress.js'
        ],
        'blind-map': ['js/blind-map.js'],
        // `exercises.js` traži jezgru i `acc-kernel` prije sebe — isti redoslijed koji je do
        // sada držao `index.html`.
        exercises: ['js/exercises-core.js', 'js/acc-kernel.js', 'js/exercises.js'],
        // Polica (skidanje predmeta na uređaj) visi na DVIJE stranice — popisu lekcija i
        // materijalima — pa stoji sama. ČITANJE skinutog ide kroz Service Worker i ne treba
        // ovu datoteku; ovdje je samo njezino sučelje (skini / obriši / popis).
        // `row-menu.js` = izbornik „⋯" (F2/5c): ide PRIJE police i radionice, koje ga obje crtaju.
        polica: ['js/row-menu.js', 'js/offline-store.js'],
        // `connect-ai.js` = gumb „Spoji svoj AI" (F6 ②/5.1); crta ga `my-materials.js`, pa ide prije.
        materials: ['js/row-menu.js', 'js/offline-store.js', 'js/node-images.js', 'js/connect-ai.js', 'js/my-materials.js'],
        // Profil montira „Moje materijale" i otkriva admin-karticu → nosi oboje sa sobom.
        profile: ['js/row-menu.js', 'js/offline-store.js', 'js/node-images.js', 'js/connect-ai.js', 'js/my-materials.js', 'js/image-crop.js', 'js/profile-images.js',
            'js/admin-reveal.js', 'js/mail-admin.js', 'js/profile.js'],
        // ⚠️ Sinkronizacija napretka NE visi o stranici nego o PRIJAVI: dovlači ju `auth.js`
        // čim se pojavi korisnik. Da stoji uz profil, napredak se ne bi sinkronizirao onome
        // tko svoj profil nikad ne otvori — a to je većina prijavljenih.
        sync: ['js/cloud-sync.js']
    };

    /* Token iz vlastite adrese (v. upozorenje u zaglavlju). Prazan = razvojni poslužitelj bez
       tokena; tada se učitava bez njega, što je točno ono što treba. */
    var TOKEN = (function () {
        if (typeof document === 'undefined') return '';
        var s = (document.currentScript && document.currentScript.src) || '';
        var m = /[?&]v=(\d+)/.exec(s);
        return m ? m[1] : '';
    })();

    var uTijeku = Object.create(null);   // url → Promise (isti resurs se ne skida dvaput)

    function adresa(put) {
        return TOKEN ? put + '?v=' + TOKEN : put;
    }

    function ubaci(stavka) {
        var spec = (typeof stavka === 'string') ? { src: stavka } : stavka;
        var vanjski = /^https?:/.test(spec.src);
        var url = vanjski ? spec.src : adresa(spec.src);
        if (uTijeku[url]) return uTijeku[url];

        uTijeku[url] = new Promise(function (razrijesi, odbij) {
            var el;
            if (spec.stil) {
                el = document.createElement('link');
                el.rel = 'stylesheet';
                el.href = url;
            } else {
                el = document.createElement('script');
                // ⚠️ `false` je ovdje NOSIVI dio, ne postavka: dinamički ubačena skripta je
                // po zadanom `async`, pa bi se paket izvršavao redoslijedom dolaska s mreže.
                el.async = !!spec.usporedno;
                el.src = url;
            }
            if (spec.sri) { el.integrity = spec.sri; el.crossOrigin = 'anonymous'; }
            el.addEventListener('load', function () { razrijesi(true); });
            el.addEventListener('error', function () {
                // Naša skripta koja ne stigne = razlomljena stranica; neka pozivatelj to
                // VIDI (`initStudyPage` ima catch i poruku) umjesto da čeka zauvijek.
                // Vanjski `neobavezno` resurs ima fallback u kodu pa se samo zabilježi.
                if (spec.neobavezno) { razrijesi(false); return; }
                delete uTijeku[url];          // sljedeći pokušaj smije ponovno probati
                odbij(new Error('Ne mogu učitati ' + spec.src));
            });
            (document.head || document.documentElement).appendChild(el);
        });
        return uTijeku[url];
    }

    var paketi = Object.create(null);    // ime → Promise

    /**
     * Učitaj paket (idempotentno). @param {string} ime @returns {Promise<void>}
     * Nepoznato ime je GREŠKA, ne tiho ništa: tipfeler bi inače prošao kao „učitano".
     */
    function paket(ime) {
        if (paketi[ime]) return paketi[ime];
        var popis = PAKETI[ime];
        if (!popis) return Promise.reject(new Error('Nepoznat paket: ' + ime));
        // ⚠️ PAD SE ZABORAVLJA (BUG-051): `ubaci` već briše svoj URL kad skripta ne stigne,
        // ali paket je držao ODBIJENO obećanje — pa je svaki sljedeći poziv vraćao staru
        // grešku bez zahtjeva prema mreži, i nakon što se mreža vratila. Idempotencija
        // vrijedi za USPJEH; pad smije samo javiti pozivatelju i pustiti idući pokušaj.
        // Brana: `tests/unit/loader-retry.test.js`.
        var p = Promise.all(popis.map(ubaci)).then(function () { });
        p.catch(function () { if (paketi[ime] === p) delete paketi[ime]; });
        paketi[ime] = p;
        return p;
    }

    /** Je li paket već tu? Za mjesta koja smiju raditi i bez njega (npr. sinkroni render). */
    function imamo(ime) { return !!paketi[ime]; }

    /**
     * ZAGRIJ — dovuci datoteke paketa u keš, ali ih NE izvrši. Za „skini predmet na uređaj".
     *
     * ⚠️ ZAŠTO POSTOJI: dok su sve skripte stajale u `index.html`, svaki posjet naslovnici
     * ih je provukao kroz Service Worker i time napunio keš — pa je skinuti predmet u
     * zrakoplovnom načinu imao čime biti otvoren. Otkad načini učenja stižu tek s otvorenom
     * lekcijom, korisnik koji predmet skine s POPISA LEKCIJA (a lekciju nikad ne otvori
     * dok je online) offline dobiva ljusku bez ijednog načina učenja. To je pad kriterija
     * cijele faze POLICA, a ne sitnica — zato skidanje ovo zove izričito.
     *
     * ⚠️ Ide kroz `fetch`, dakle kroz `sw.js`, koji ih spremi u SVOJ (verzionirani) keš —
     * NE u `sokrat-offline`. Razlika je bitna: `remove(predmet)` briše točno one adrese koje
     * je taj predmet upisao, pa bi dijeljene skripte aplikacije ondje značile da uklanjanje
     * JEDNOG predmeta ubije offline za sve ostale.
     *
     * Vanjski (CDN) resursi se preskaču — `sw.js` presreće samo same-origin GET.
     */
    function zagrij(ime) {
        var popis = PAKETI[ime] || [];
        return Promise.all(popis.map(function (s) {
            var spec = (typeof s === 'string') ? { src: s } : s;
            if (/^https?:/.test(spec.src)) return Promise.resolve(false);
            return fetch(adresa(spec.src)).then(function () { return true; }, function () { return false; });
        }));
    }

    var izvoz = {
        paket: paket,
        imamo: imamo,
        zagrij: zagrij,
        // Izloženo zbog brana (`check:budget` mjeri sastav, unit-test provjerava da svaka
        // navedena datoteka postoji) — ne zato da ga netko mijenja u runtimeu.
        PAKETI: PAKETI
    };

    if (typeof window !== 'undefined') window.SokratLoad = izvoz;
})();
