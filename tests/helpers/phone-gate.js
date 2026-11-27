// T0 · MJERAČ TELEFONA — zajednička mjera za odjavljenu i prijavljenu branu.
//
// ── ZAŠTO POSTOJI ────────────────────────────────────────────────────────────────
// Produkcija je na 393 px bila neupotrebljiva, a **svih desetak gateova zeleno**. To
// nije bio previd nego posljedica konstrukcije: axe mjeri na 1280 px, `css:diff`
// uspoređuje nas sa samima sobom (hvata PROMJENU, ne LOŠOĆU — ravnomjerno loše stanje
// mu je savršeno stabilno), a K3/K4a mjere KROMO, ne stranicu. **Telefon kao STRANICA
// nikad nije bio mjerena površina.** Zato faza „TELEFON" počinje mjeračem, ne popravkom.
//
// ── METODA: OTOK SE DA IZMJERITI, IAKO SE `env()` NE DA SIMULIRATI ───────────────
// Chromium ne zna glumiti `env(safe-area-inset-top)`. Ali `--safe-top` je **naša
// varijabla iznad njega** (`css/variables.css`), pa se smije postaviti izravno:
//
//     document.documentElement.style.setProperty('--safe-top', '59px')
//
// **Što se nakon toga ne pomakne, na pravom telefonu stoji ispod otoka.** Inline stil
// na `<html>` tuče `:root` iz stilskog lista, pa je zamjena potpuna. Ovo je jedina
// poznata metoda da se BUG-031 uopće izmjeri.
//
// ── SEDAM TVRDNJI (spec §9.3; ⑥ i ⑦ su dodane ciglom T1) ─────────────────────────
//   ① OTOK        ništa interaktivno u gornjih `rub.top` px
//   ② KROMO       naše trake ≤ 20 % UPOTREBLJIVE visine
//   ③ SUKOB       tekst se ne lomi preko 2 retka dok mu susjed u istom spremniku krati
//   ④ PRVI EKRAN  bar jedna sadržajna kontrola DOHVATLJIVA bez skrola
//   ⑤ ZAGLAVLJE   naslov razine je čitljiv (≤ 1 redak i nije odrezan ispod 60 %)
//   ⑥ DONJI RUB   ništa interaktivno u donjih `rub.bottom` px — mjereno NA DNU SKROLA
//   ⑦ BOČNI RUB   ništa interaktivno u bočnim pojasima + sadržajni spremnik ih poštuje
//   ⑧ NAMJEŠTAJ   trajnu donju traku (promjena načina učenja) ništa ne smije prekrivati
//
// ── ⚠️ ZAŠTO ⑥ MJERI NA DNU SKROLA, A ⑦ ODMAH ──────────────────────────────────
// Dok se stranica skrola, sadržaj kroz donji pojas **prolazi** — to nije kvar nego
// skrolanje. Kvar je ono što iz pojasa NE MOŽE izaći: fiksni namještaj i sam kraj
// dokumenta. Zato se ⑥ mjeri tek kad se stranica spusti do kraja. Bočni pojas te ograde
// nema (stranica se ne skrola vodoravno), pa je ondje **svaki** pogodak trajan.
//
// ── ⚠️ RUB SE POSTAVLJA PO ORIJENTACIJI, NE JEDNOM ZA SVE ───────────────────────
// U portretu izrez uzima VRH (59) i indikator DNO (34); u landscapeu vrh je 0, a izrez
// seli USTRANU (59 lijevo i desno, iOS ih izvještava simetrično). Zato svaki ekran nosi
// svoj profil (`rub`), a ne jedan globalni broj — inače bi landscape mjerio otok kojeg
// ondje nema i previdio bočni koji ondje jest.
//
// ⚠️ **Vidljivost se RAČUNA, ne pretpostavlja.** Prva verzija ove mjere prijavila je dva
// nepostojeća kvara i oba su bila pouka: bočna traka `.subjects-sidebar` je
// `position:fixed` preko cijele visine, ali `translateX(100%)` je drži IZVAN ekrana —
// brojala se kao kromo od 100 %; a zatvoren `<sokrat-modal>` je `visibility:hidden`, pa
// je `offsetParent`-provjera (koja fiksne elemente propušta) njegov gumb za zatvaranje
// prijavila kao interaktivan sadržaj u otoku. Oba su kvara postojala samo u mjeri.
// **Gate koji prijavljuje šum se isključi, i tad ne čuva ništa** (ista pouka kao
// `check:tailwind` §šum).
'use strict';

/** Dynamic Island na iPhoneu 14 Pro i novijima. Leonov uređaj je iPhone 16. */
const OTOK = 59;

/** Stvarni rubovi iPhonea 16 (logičke točke), po orijentaciji.
 *
 *  ⚠️ **Profil se primjenjuje na SVE širine, i to je namjerno.** iPhone SE (320 × 568)
 *  fizički nema ni izrez ni indikator — sve četiri vrijednosti su ondje 0. Brana ipak
 *  mjeri kao da ih ima, jer ne provjerava UREĐAJ nego PRAVILO: „sadržaj se drži unutar
 *  sigurne zone, kolika god ona bila". Gate koji mjeri samo uređaje koje danas znamo
 *  prestaje vrijediti čim izađe novi. */
const RUB_PORTRET = { top: OTOK, bottom: 34, left: 0, right: 0 };
const RUB_LANDSCAPE = { top: 0, bottom: 21, left: OTOK, right: OTOK };

/** 320 = donja granica iz kriterija prihvaćanja (spec §2) · 393 = Leonov iPhone 16
 *  · 430 = Pro Max · 852 × 393 = isti uređaj POLEGNUT (kriterij T1 imenuje obje
 *  orijentacije). Visine su stvarne logičke visine tih uređaja: kromo se mjeri kao
 *  UDIO ekrana, pa bi zajednička izmišljena visina mjerila krivi postotak. */
const EKRANI = [
    { w: 320, h: 568, ime: 'iPhone SE', rub: RUB_PORTRET },
    { w: 393, h: 852, ime: 'iPhone 16', rub: RUB_PORTRET },
    { w: 430, h: 932, ime: 'iPhone 16 Pro Max', rub: RUB_PORTRET },
    { w: 852, h: 393, ime: 'iPhone 16 polegnut', rub: RUB_LANDSCAPE }
];

/** Stranice koje vidi ODJAVLJEN posjetitelj + četiri načina učenja. */
const EKRANI_JAVNI = ['landing', 'browse', 'browse:dubina', 'lessons', 'about'];
/** ⚠️ `progress` je dodan u C5a/4 (2026-08-30). Do tada je bio JEDINA C5a površina bez mjere
 *  na telefonu — a nije „samo još jedan tab": nosi jedini SVG koji se skalira (`.big-progress-circle`)
 *  i jedini popis koji crta JavaScript iz sadržaja (`.category-bar`, boja iz kataloga). */
const NACINI = ['learn', 'flashcards', 'quiz', 'fill', 'progress'];

/** ⚠️ MREZA-E4 (2026-09-01): `exercises` i `blind-map` su UVJETNI tabovi (5 predmeta ima
 *  vježbe, blind-map još manje) pa NISU u `NACINI` — study-predmet mjere je prvi iz
 *  `subjectDataMap`, koji te tabove NEMA. Do E4 su to bila jedina dva načina učenja bez
 *  mjere na telefonu — ista rupa kakvu je `check:contrast:live` imao s `te2` (ruta koju
 *  brana ne imenuje je ruta koju brana ne vidi). Mjere se preko `idiNa('study@<feature>')`:
 *  predmet se bira IZ KATALOGA po značajci, nikad zakucan. */
const NACINI_UVJETNI = [
    { ruta: 'study@exercises', tab: 'exercises' },
    { ruta: 'study@blindMap', tab: 'blind-map' }
];

/** Prijavljene stranice — mjeri ih `phone.authed.spec.js`. `admin` je unutra jer kriterij
 *  faze glasi da korisnik *„ne naiđe ni na jedan ekran koji brana ne posjećuje"*, a
 *  admin-CRUD je ekran kao i svaki drugi (isti popis vozi i `reach-gate`). */
const EKRANI_PRIJAVLJENI = ['materials', 'profile', 'admin', 'editor'];

/**
 * Ekrani koji se SMIJU mjeriti bez pravila o sigurnoj zoni — svaki s razlogom (①/3b).
 *
 * Tvrdnje ①/⑥/⑦/⑦b imaju smisla samo ako se stranica `viewport-fit=cover`-om prijavila da
 * crta ispod izreza. Bez te prijave iOS je slaže UNUTAR sigurne zone, pa ispod izreza nema
 * što stajati. Do ①/3b je to bila TIHA pretpostavka jer je svaka mjerena stranica imala
 * `cover`; `odobrenje.html` je prva koja ga nema i dala bi **14 izmišljenih nalaza**.
 *
 * ⚠️ Popis je obveza u oba smjera: ekran koji izgubi `cover` a nije ovdje obara branu (netko
 *    bi inače pravila o sigurnoj zoni ugasio brisanjem jedne riječi iz `<meta>`), a mrtav
 *    unos ovdje obara je isto (stranica je u međuvremenu dobila `cover`, a pravila i dalje
 *    stoje ugašena).
 *
 * ✅ **DANAS JE PRAZAN, i to je ISHOD, ne propust** (①/3d, Leon 2026-09-21: *„naravno da treba
 *    sve poravnati"*). Svih šest samostalnih dokumenata — stranica odobrenja i pet pravnih —
 *    dobilo je `viewport-fit=cover` i nadoknadu kroz `var(--safe-*)` u `css/legal.css`, pa
 *    nijednom više ne treba iznimka. Prazan popis znači da se na **svakoj** mjerenoj stranici
 *    pravila o sigurnoj zoni stvarno primjenjuju. Kad nešto opet uđe, uz njega mora stajati
 *    razlog. (Isti oblik kao `scripts/contrast-live-allow.json`, koji je također prazan.)
 */
const BEZ_IZREZA = {};

/**
 * Samostalni dokumenti koje mjeri JAVNA brana (①/3c) — ime ekrana = ime datoteke bez `.html`.
 *
 * ⚠️ Do ①/3c ih nije mjerio NITKO. Brana je mjerila aplikaciju (`index.html`), Studio
 * (`editor.html`) i stranicu odobrenja, a pet stranica do kojih vodi podnožje svake druge
 * stranice — pravila, uvjeti, FAQ, kontakt i odjava s maila — nisu imale nijednu brojku za
 * telefon. To je isti razred rupe zbog kojeg je ①/3b i nastao: *ekran koji brana ne posjećuje
 * je ekran koji brana ne vidi*.
 *
 * `odjava` se otvara BEZ tokena — tada stranica kaže da poveznica nije potpuna i ništa ne šalje
 * mreži. To je stanje u kojem je pravi posjetitelj najčešće i zatekne (istekao ili prepisan link).
 */
const SAMOSTALNE = ['privacy', 'terms', 'faq', 'contact', 'odjava'];

/**
 * Stanja stranice odobrenja koja mjerač OBILAZI (①/3b).
 *
 * ⚠️ Namjerno ODVOJENO od `BEZ_IZREZA`, iako danas sadrže isto. To su dva različita pitanja —
 * „kamo mjerač ide" i „tko smije biti bez `viewport-fit=cover`" — i prva verzija ih je
 * spojila, pa bi buduća stranica bez `cover`-a koja NIJE dio obilaska tiho podigla očekivani
 * broj ekrana u tvrdnji ⓪ i srušila je bez veze sa stvarnim kvarom.
 */
const EKRANI_ODOBRENJE = ['prijavi-se', 'dopusti-odbij'];

/** Aplikacija je spremna kad su i stanje i katalog na mjestu. */
const spreman = (page) => page.waitForFunction(
    () => window.AppState && window.SOKRAT_CATALOG && typeof window.navigateTo === 'function',
    null, { timeout: 60000 });

/**
 * Postavi SVA ČETIRI ruba sigurne zone. Zove se NAKON `goto` (inline stil bi inače
 * nestao s navigacijom) i prije svakog mjerenja — `navigateTo` ne dira `<html>`, ali
 * `page.goto` da.
 *
 * ⚠️ **Ovo radi samo dok su `--safe-*` jedini izvor.** Pravilo napisano izravno s
 * `env(safe-area-inset-bottom)` ova zamjena NE dohvaća — ostaje na 0 i u pregledniku i
 * u brani, pa izgleda kao da je rub poštovan. Baš to je zateklo `landing-footer`
 * (`css/responsive/04-mobile-extra.css`): pravilo je postojalo, bilo je napisano s
 * golim `env()`, i zato **nemjerljivo**. Zato T1 uvodi `npm run check:safearea`, koji
 * goli `env()` drži u jednoj jedinoj datoteci (`css/variables.css`).
 */
// ⚠️ Stranica bez `viewport-fit=cover` na iOS-u sigurnu zonu NIKAD ne dobiva (slaže se
// unutar nje), pa joj se ovdje ne smije ubrizgati — inače mjera pomakne stranicu za 59/34 px
// kojih ondje nema, i mjeri raspored koji ne postoji. Premisa se čita sa stranice, po istom
// pravilu kao u `mjeri()`.
const postaviRub = (page, rub = RUB_PORTRET) =>
    page.evaluate((v) => {
        const podIzrezom = Array.prototype.slice
            .call(document.querySelectorAll('meta[name="viewport"]'))
            .some((m) => /viewport-fit\s*=\s*cover/.test(m.content || ''));
        const r = podIzrezom ? v : { top: 0, bottom: 0, left: 0, right: 0 };
        const d = document.documentElement.style;
        d.setProperty('--safe-top', r.top + 'px');
        d.setProperty('--safe-bottom', r.bottom + 'px');
        d.setProperty('--safe-left', r.left + 'px');
        d.setProperty('--safe-right', r.right + 'px');
    }, rub);

/**
 * Otiđi na ekran. Predmet i lekcija se uzimaju IZ KATALOGA, nikad zakucani — inače
 * brana pada kad se sadržaj promijeni, a to nije kvar telefona.
 *
 * ⚠️ **SVE ČEKA STANJE, NE VRIJEME — i to je popravak, ne stil.** Prva verzija je nakon
 * svakog klika čekala fiksnih 300 ms. Mjera je pritom bila savršeno determinističa (tri
 * uzastopna prolaza dala su **bajt-identičnu** osnovicu), ali je brana **treperila**:
 * pod opterećenjem klik ne stigne prerenderati razinu, `browse:dubina` ostane na
 * **plićoj** razini, izmjeri se **drugi ekran** i njegov nalaz nije u osnovici → lažno
 * crveno. *Fiksno čekanje mjeri vrijeme; tvrdnja treba stanje* — isto što je `studio.authed`
 * već platio na drag-testu (K6b, TESTING.md).
 */
async function idiNa(page, ime, rub = RUB_PORTRET) {
    // Povratak IZ editora u aplikaciju mora biti izričit: ondje `navigateTo` postoji samo
    // kao prijevod (js/editor-page.js), a `AppState.nav` ne opisuje stranicu — pa bi
    // čekanje na `AppState.nav.page` visjelo do isteka.
    if (ime !== 'editor' && ime !== 'admin' && page.url().includes('editor.html')) {
        await page.goto('/');
        await spreman(page);
    }
    // ⚠️ T6: editor i admin-preglednik VIŠE NISU stranice ove aplikacije nego VLASTITI
    // DOKUMENT (`editor.html`) — 244 KiB editorskog koda otišlo je s posjetiteljeva puta.
    // Do njih se zato ne ide `navigateTo`-om nego pravom navigacijom; a natrag u aplikaciju
    // mora se otići izričito, jer `navigateTo` ondje postoji samo kao PRIJEVOD.
    // ⚠️ NE VRAĆAJ SE RANO. Prva verzija je ovdje imala `return`, pa je preskakala
    // `smiriPrikaz()` na dnu — i brana je odmah prijavila `320px admin` bez ijedne kontrole,
    // jer se preglednik puni asinkrono. Bilješka nekoliko redaka niže to je DOSLOVNO
    // predvidjela („popravak koji nije generaliziran čeka drugu priliku"). Zato je ovo
    // samo prva grana lanca, a zajednički rep vrijedi i za nju.
    if (ime === 'editor' || ime === 'admin') {
        await page.goto(ime === 'admin' ? '/editor.html?view=admin' : '/editor.html');
        await page.waitForSelector(ime === 'admin' ? '#admin-page.active' : '#editor-page.active', { timeout: 30000 });
    } else if (ime === 'browse:dubina') {
        await page.evaluate(() => navigateTo('browse'));
        await page.waitForFunction(() => typeof browseState !== 'undefined' && !!browseState.level);
        // Spusti se do NAJDUBLJE razine kataloga — ondje su najduži nazivi. Hijerarhija je
        // `faculties → programs → years → subjects`; ⚠️ klik na razini `subjects` **izlazi
        // iz kataloga** na lekcijsku stranicu, pa je `subjects` uvjet zaustavljanja, a ne
        // brojač klikova. (Prva verzija je brojala klikove i time mjerila `lessons` misleći
        // da mjeri katalog.)
        for (let i = 0; i < 5; i++) {
            const prije = await page.evaluate(() => browseState.level);
            if (prije === 'subjects') break;
            const usao = await page.evaluate(() => {
                const k = document.querySelector('#browse-page .browse-card, #browse-page [data-faculty], #browse-page [data-program]');
                if (!k) return false;
                k.click();
                return true;
            });
            if (!usao) break;
            try {
                await page.waitForFunction((p) => browseState.level !== p, prije, { timeout: 5000 });
            } catch (e) { break; }
        }
    } else if (ime === 'lessons' || ime === 'study' || ime.indexOf('study@') === 0) {
        // MREZA-E4: 'study@<feature>' bira PRVI predmet koji značajku ima (`features.exercises`
        // / `features.blindMap`) — na prvom predmetu subjectDataMap uvjetni tab ne postoji,
        // pa ga mjera bez ovoga ne bi vidjela NIKAD. Predmet i dalje dolazi iz kataloga.
        const feature = ime.indexOf('study@') === 0 ? ime.slice('study@'.length) : null;
        const stranica = feature ? 'study' : ime;
        await page.evaluate((arg) => {
            let s, x;
            if (arg.feature) {
                x = (SOKRAT_CATALOG.subjects || []).find((k) => k.features && k.features[arg.feature]);
                if (!x) throw new Error('nijedan predmet nema features.' + arg.feature);
                s = x.id;
            } else {
                s = Object.keys(subjectDataMap)[0];
                x = SokratCatalog.getSubject(s);
            }
            const l = (x && x.lessons && x.lessons[0]) ? x.lessons[0].id : null;
            if (arg.p === 'lessons' || !l) navigateTo('lessons', { subject: s });
            else navigateTo('study', { subject: s, lesson: l });
        }, { p: stranica, feature: feature });
        await page.waitForFunction((p) => AppState.nav.page === p, stranica);
        if (stranica === 'study') {
            // Sadržaj dolazi lijeno (DB → JSON → .js) iza zastora `#studyLoading` preko
            // cijelog ekrana. Mjeriti prije nego stigne znači izmjeriti zastor.
            // ⚠️ Uvjet NE SMIJE koristiti `offsetParent`: `.study-loading` je
            // `position:fixed`, a fiksnom elementu je `offsetParent` **uvijek `null`** →
            // provjera bi prolazila odmah i brana bi zastor prijavila kao kromo od 100 %.
            // Zastor se gasi atributom (`el.hidden = !on`), pa se to i provjerava — uz
            // tvrdnju da je sadržaj STVARNO nacrtan.
            await page.waitForFunction(() => {
                const l = document.getElementById('studyLoading');
                if (l && !l.hasAttribute('hidden')) return false;
                const s = document.querySelector('#study-page .section.active');
                return !!s && s.getBoundingClientRect().height > 0;
            }, null, { timeout: 30000 });
        }
    } else {
        await page.evaluate((p) => navigateTo(p), ime);
        await page.waitForFunction((p) => AppState.nav.page === p, ime);
    }
    // ⚠️ Smirivanje vrijedi za SVAKI ekran, ne samo za one gdje je treperenje prvo viđeno.
    // Prva verzija je čekala smirivanje samo u načinima učenja — i `admin` je zatim jednom
    // prijavio „nijedna dohvatljiva kontrola", a drugi put ne, jer se puni asinkrono.
    // *Popravak koji nije generaliziran je popravak koji čeka drugu priliku* (BUG-027).
    await smiriPrikaz(page, 'section[id$="-page"].active');
    // ⚠️ PROLAZNA OBAVIJEST NIJE STRANICA. Nakon obnove sesije auth javi „prijavljen si" i
    // `<sokrat-toast>` na 2,5 s sjedne preko sredine ekrana — na 320 px baš preko JEDINE
    // omogućene kontrole admin-preglednika, pa je tvrdnja ④ prijavila „nijedna dohvatljiva
    // kontrola" za stranicu koja je posve u redu. Zato se čeka da toast ode.
    // ⚠️ ALI SAMO DO ROKA: ostane li vidljiv, mjeri se s njim — trajni pokrivač JEST kvar
    // (isto načelo kao tvrdnja ⑧ iz T4), pa ga čekanje ne smije sakriti.
    try {
        await page.waitForFunction(() => { const t = document.getElementById('toast'); return !t || !t.classList.contains('show'); }, null, { timeout: 4000 });
    } catch (e) { /* toast je ostao — neka mjera to i pokaže */ }
    await postaviRub(page, rub);
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
}

/**
 * Čekaj da se PRIKAZ SMIRI: sadržaj elementa nepromijenjen kroz dvije uzastopne provjere.
 *
 * ⚠️ **Zašto baš ovo, a ne „čekaj da se pojavi kontrola".** Tvrdnja ④ mjeri postoji li
 * upotrebljiva kontrola bez skrola. Da je čekanje uvjetovano pojavom kontrole, ④ **ne bi
 * mogla pasti nikad** — brana bi čekala točno ono što tvrdi da mjeri. *Čekanje ne smije
 * pretpostaviti ishod mjerenja.* Zato se čeka nešto neovisno: da crtanje **prestane**.
 */
async function smiriPrikaz(page, selektor, maxMs = 6000) {
    let prije = null;
    const kraj = Date.now() + maxMs;
    while (Date.now() < kraj) {
        const sad = await page.evaluate((sel) => {
            const el = document.querySelector(sel);
            if (!el) return '';
            return el.innerHTML.length + '/' + el.querySelectorAll('*').length
                + '/' + Math.round(el.getBoundingClientRect().height);
        }, selektor);
        if (sad !== '' && sad === prije) return true;
        prije = sad;
        await page.waitForTimeout(180);
    }
    return false;
}

/** Prebaci način učenja na study-stranici (`learn`/`flashcards`/`quiz`/`fill`). */
async function otvoriNacin(page, nacin, rub = RUB_PORTRET) {
    await page.evaluate((s) => {
        const b = document.querySelector('.study-nav-btn[data-section="' + s + '"]');
        if (b) b.click();
    }, nacin);
    // Tvrdnja o STANJU: baš ta sekcija je aktivna, nacrtana i više se ne mijenja.
    await page.waitForFunction((s) => {
        const el = document.getElementById(s);
        return !!el && el.classList.contains('active') && el.getBoundingClientRect().height > 0;
    }, nacin, { timeout: 15000 });
    await smiriPrikaz(page, '#' + nacin);
    await postaviRub(page, rub);
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
}

/**
 * JEDINA mjera koja se izvršava u pregledniku. Dvije faze, jedan izvor.
 *
 * ⚠️ **Zašto jedna funkcija s fazom, a ne dvije funkcije.** Tvrdnje ①–⑤ i tvrdnje ⑥–⑦
 * trebaju **različito stanje stranice** (potonje se mjere tek kad se stranica spusti do
 * kraja), pa je prvi nagon bio napisati drugi `page.evaluate`. To bi značilo **drugu
 * kopiju** `ime`/`vidljivRect`/`stvarnoVidljiv` — a `page.evaluate` ne može zatvoriti nad
 * modulskim opsegom, pa se kopija ne da izbjeći dijeljenjem varijable. Cigla T1 je upravo
 * dokazala što dvije liste iste činjenice rade (`--safe-*` naspram golog `env()`), pa bi
 * bilo licemjerno istu grešku ostaviti u vlastitom mjeraču: dovoljno je da netko popravi
 * računanje vidljivosti u jednoj kopiji i brana počne tvrditi dvije različite stvari.
 * Faza je zato **parametar**, a helperi postoje **jednom**.
 */
function mjeri(page, rub, faza) {
    // Unutrašnjost mjere barata jednim brojem za gornji rub (`OTOK`) — u landscapeu je to
    // 0, pa tvrdnja ① ondje ispravno ne nalazi ništa, a ② mjeri udio pune visine.
    return page.evaluate((ARG) => {
        // ── PREMISA PRAVILA O SIGURNOJ ZONI ───────────────────────────────────────
        // Tvrdnje ①/⑥/⑦/⑦b vrijede samo za stranicu koja se `viewport-fit=cover`-om
        // IZRIČITO prijavila da crta ispod izreza. Bez te prijave iOS stranicu slaže
        // UNUTAR sigurne zone, pa ispod izreza doslovno nema što stajati i svaki bi
        // nalaz tih tvrdnji bio izmišljen.
        // ⚠️ Do ①/3b se premisa PRETPOSTAVLJALA, jer je svaka mjerena stranica imala
        //    `cover`. Prva bez njega (`odobrenje.html`) dala bi 14 lažnih nalaza.
        //    Zato se sad ČITA sa stranice; tko je smije nemati, piše u `BEZ_IZREZA`.
        // ⚠️ Premisa teče kroz JEDNU varijablu — sam `rub`. Prva verzija je gasila četiri
        //    kategorije nalaza posebno, a ② KROMO je pritom ostao raditi s otokom od 59 px:
        //    stranica koja izrez nikad ne dobije dobivala je **popust na budžet trake**
        //    (izmjereno 12 % ondje gdje je stvarno 21 %). Pojasevi su već svi čuvani s
        //    `if (R.x > 0)`, pa rub na nuli gasi ta pravila SAM, bez ijedne iznimke.
        const podIzrezom = Array.prototype.slice
            .call(document.querySelectorAll('meta[name="viewport"]'))
            .some((m) => /viewport-fit\s*=\s*cover/.test(m.content || ''));

        const R = podIzrezom ? ARG.rub : { top: 0, bottom: 0, left: 0, right: 0 };
        const OTOK = R.top;
        const FAZA = ARG.faza;
        const vw = window.innerWidth, vh = window.innerHeight;

        const ime = (el) => {
            if (!el) return 'ništa';
            let s = el.tagName.toLowerCase();
            if (el.id) s += '#' + el.id;
            else if (typeof el.className === 'string' && el.className) s += '.' + el.className.trim().split(/\s+/)[0];
            return s;
        };

        /** Rect ∩ svaki predak koji reže ∩ ekran = ono što korisnik STVARNO vidi.
         *  ⚠️ Predak s `overflow-y:auto` reže i po X — druga os po specifikaciji
         *  postaje `auto`. Ista zamka je u C3 već jednom dala lažan nalaz. */
        function vidljivRect(el) {
            const r = el.getBoundingClientRect();
            const box = { l: r.left, t: r.top, r: r.right, b: r.bottom };
            let p = el.parentElement;
            while (p && p !== document.documentElement) {
                const cs = getComputedStyle(p);
                if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
                    const pr = p.getBoundingClientRect();
                    box.l = Math.max(box.l, pr.left); box.t = Math.max(box.t, pr.top);
                    box.r = Math.min(box.r, pr.right); box.b = Math.min(box.b, pr.bottom);
                }
                p = p.parentElement;
            }
            box.l = Math.max(box.l, 0); box.t = Math.max(box.t, 0);
            box.r = Math.min(box.r, vw); box.b = Math.min(box.b, vh);
            return box;
        }

        /** Vidi li korisnik ovo, i može li to dotaknuti? Računa se, ne pretpostavlja:
         *  `visibility` (nasljeđuje se — zatvoren modal je time pokriven), stvarna
         *  neprozirnost kroz pretke (`opacity:0` se NE nasljeđuje u computed style),
         *  `pointer-events`, i neprazan vidljiv pravokutnik unutar ekrana. */
        function stvarnoVidljiv(el) {
            const cs = getComputedStyle(el);
            if (cs.visibility !== 'visible' || cs.display === 'none') return false;
            if (cs.pointerEvents === 'none') return false;
            let p = el;
            while (p && p !== document.documentElement) {
                const s = getComputedStyle(p);
                if (parseFloat(s.opacity) < 0.05) return false;
                p = p.parentElement;
            }
            const b = vidljivRect(el);
            return (b.r - b.l) > 1 && (b.b - b.t) > 1;
        }

        /** Broj redaka teksta = broj različitih linija u kojima leže njegovi pravokutnici.
         *  `getClientRects()` nad rasponom sadržaja daje po jedan rect po liniji; grupira
         *  se s tolerancijom od 60 % visine retka jer superskripti i ikone imaju vlastite. */
        function brojRedaka(el) {
            const r = document.createRange();
            r.selectNodeContents(el);
            const rects = Array.prototype.slice.call(r.getClientRects())
                .filter((x) => x.width > 0.5 && x.height > 0.5);
            if (!rects.length) return 0;
            const lh = parseFloat(getComputedStyle(el).lineHeight) || 16;
            const tops = rects.map((x) => x.top).sort((a, b) => a - b);
            let n = 1;
            for (let i = 1; i < tops.length; i++) if (tops[i] - tops[i - 1] > lh * 0.6) n++;
            return n;
        }

        const INTERAKTIVNO = 'a[href], button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])';
        const interaktivni = Array.prototype.slice.call(document.querySelectorAll(INTERAKTIVNO))
            .filter((el) => !el.disabled && !el.hasAttribute('hidden'))
            .filter(stvarnoVidljiv)
            .map((el) => ({ el: el, b: vidljivRect(el) }));

        const uKromu = (el) => {
            let p = el;
            while (p && p !== document.body) {
                if (p.classList && (p.classList.contains('topbar') || p.classList.contains('pathbar')
                    || p.id === 'cookieBanner' || p.classList.contains('subjects-sidebar'))) return true;
                p = p.parentElement;
            }
            return false;
        };

        // ══ FAZA „RUBOVI" (⑥ + ⑦ + ⑦b + ⑦c) ═════════════════════════════════════
        // Zove se tek kad je stranica spuštena do kraja — v. `mjeriRubove`.
        if (FAZA === 'rubovi') {
            // Preklop veći od 1 px = kvar. Prag postoji samo zbog zaokruživanja
            // podpiksela, ne kao dopuštenje: Appleovo pravilo ne poznaje „malo ispod izreza".
            const PRAG = 1;
            const opis = (k, koliko) => ime(k.el) + ' ' + Math.round(koliko) + ' px u pojasu'
                + ' [' + Math.round(k.b.l) + ',' + Math.round(k.b.t) + '…'
                + Math.round(k.b.r) + ',' + Math.round(k.b.b) + ']';

            const dno = [], bocno = [];
            interaktivni.forEach((k) => {
                if (R.bottom > 0) {
                    const u = k.b.b - (vh - R.bottom);
                    if (u > PRAG) dno.push(opis(k, u));
                }
                if (R.left > 0) {
                    const u = R.left - k.b.l;
                    if (u > PRAG) bocno.push('lijevo · ' + opis(k, u));
                }
                if (R.right > 0) {
                    const u = k.b.r - (vw - R.right);
                    if (u > PRAG) bocno.push('desno · ' + opis(k, u));
                }
            });

            // ⑦b — PRAVILO, a ne slučaj. Da se traži samo „nijedna kontrola nije u pojasu",
            // stranica bez gumba uz rub prošla bi bez ijednog pravila o sigurnoj zoni, i
            // kvar bi se vratio čim netko doda gumb. Zato se mjeri i SPREMNIK sadržaja:
            // gdje počinje njegov *content box* (okvir + vlastiti padding).
            const aktivnaR = document.querySelector('section[id$="-page"].active');
            const spremnici = [];
            if (aktivnaR) {
                Array.prototype.slice.call(aktivnaR.children)
                    .filter((el) => (el.tagName === 'MAIN' || el.tagName === 'FOOTER') && stvarnoVidljiv(el))
                    .forEach((el) => spremnici.push(el));
                Array.prototype.slice.call(aktivnaR.querySelectorAll(':scope > main > footer, :scope > main > .landing-footer'))
                    .filter(stvarnoVidljiv).forEach((el) => spremnici.push(el));
            }
            const spremnik = [];
            spremnici.forEach((el) => {
                const cs = getComputedStyle(el);
                const r = el.getBoundingClientRect();
                const l = r.left + parseFloat(cs.paddingLeft || 0);
                const d = r.right - parseFloat(cs.paddingRight || 0);
                if (R.left > 0 && l < R.left - PRAG) {
                    spremnik.push(ime(el) + ' počinje na ' + Math.round(l) + ' px, a sigurno je od ' + R.left);
                }
                if (R.right > 0 && d > vw - R.right + PRAG) {
                    spremnik.push(ime(el) + ' završava na ' + Math.round(d) + ' px, a sigurno je do ' + (vw - R.right));
                }
            });

            // ⑦c — UNUTARNJI SKROLER koji seže do dna ekrana. Ovo NE pokriva tvrdnja ⑥:
            // ondje se pada samo ako u pojasu STVARNO stoji kontrola, pa ljuska s kratkim
            // sadržajem prolazi **slučajno** i kvar se vrati čim se sadržaj produži. Studio
            // je točno takav slučaj (`position:fixed; inset: var(--chrome-h) 0 0 0`) — dno mu
            // je rub ekrana, a `body` mu ne može pomoći: fiksni element ne zna za padding
            // predaka. Ispravnost je zato SVOJSTVO, ne ishod: `padding-bottom` ≥ donji rub.
            if (R.bottom > 0 && aktivnaR) {
                const kandidati = [aktivnaR].concat(Array.prototype.slice.call(aktivnaR.querySelectorAll('*')));
                kandidati.forEach((el) => {
                    const cs = getComputedStyle(el);
                    // ⚠️ NAMJERNO se NE traži da spremnik trenutno prelijeva. Prva verzija je
                    // tražila (`scrollHeight > clientHeight`) i time našla **nula** kandidata:
                    // u testu je Studio otvoren s praznim dokumentom, pa nijedan panel ne
                    // prelijeva — a `#stCanvas` ondje ima `padding-bottom: 0` i seže točno do
                    // ruba ekrana. Provjera bi dakle bila zelena sve dok netko ne napiše dovoljno
                    // dug materijal, pa bi kvar izašao kod KORISNIKA, ne kod nas. Rezervacija
                    // donjeg ruba je svojstvo spremnika, ne posljedica trenutnog sadržaja.
                    const skrola = (cs.overflowY === 'auto' || cs.overflowY === 'scroll');
                    if (!skrola || !stvarnoVidljiv(el)) return;
                    const r = el.getBoundingClientRect();
                    if (r.bottom < vh - PRAG) return;              // ne dodiruje dno ekrana
                    const pb = parseFloat(cs.paddingBottom || 0);
                    if (pb < R.bottom - PRAG) {
                        spremnik.push(ime(el) + ' skrola do dna ekrana, a donji razmak mu je '
                            + Math.round(pb) + ' px (treba ' + R.bottom + ')');
                    }
                });
            }

            // Bez `cover`-a je `R` sav na nuli, pa su sva tri popisa prazna sama od sebe —
            // svaki pojas je gore čuvan s `if (R.x > 0)`. Nema iznimke koju bi trebalo pamtiti.
            return { dno: dno, bocno: bocno, spremnik: spremnik, podIzrezom: podIzrezom };
        }

        // ── ① OTOK ────────────────────────────────────────────────────────────────
        // Kromo SMIJE crtati podlogu ispod otoka (za to `viewport-fit=cover` i postoji);
        // ne smije ondje staviti ništa što se tapka ili čita.
        // ── ⑦ BOČNI POJAS — MJERI SE I NA VRHU, NE SAMO NA DNU ────────────────────
        // ⚠️ Do ①/3e se bočni pojas mjerio ISKLJUČIVO u fazi „rubovi", koja stranicu prvo
        // spusti do dna (to treba ⑥, jer je ondje kvar trajan). Na svakoj stranici koja se
        // skrola zaglavlje dotad ode s ekrana: izmjereno, pravna stranica odskrola 3 461 px
        // i logo završi na y = −3442, pa ga ⑦ nikad ne vidi. Kratke stranice (odobrenje,
        // odjava) prijavljivale su ga, duge nikad — a razlika nije bila u kvaru nego u
        // DULJINI TEKSTA. Bočni pojas tu ogradu nema (stranica se ne skrola vodoravno), pa
        // je svaki pogodak trajan i mora se mjeriti ODMAH, prije spuštanja.
        const PRAG_RUB = 1;
        const bocnoNaVrhu = [];
        interaktivni.forEach((k) => {
            const opisK = (koliko) => ime(k.el) + ' ' + Math.round(koliko) + ' px u pojasu'
                + ' [' + Math.round(k.b.l) + ',' + Math.round(k.b.t) + '…'
                + Math.round(k.b.r) + ',' + Math.round(k.b.b) + ']';
            if (R.left > 0 && R.left - k.b.l > PRAG_RUB) bocnoNaVrhu.push('lijevo · ' + opisK(R.left - k.b.l));
            if (R.right > 0 && k.b.r - (vw - R.right) > PRAG_RUB) bocnoNaVrhu.push('desno · ' + opisK(k.b.r - (vw - R.right)));
        });

        const uOtoku = interaktivni
            .filter((k) => k.b.t < OTOK - 0.5)
            .map((k) => ime(k.el) + ' y=' + Math.round(k.b.t) + '…' + Math.round(k.b.b));

        // ── ② KROMO ───────────────────────────────────────────────────────────────
        // Trake usidrene pri VRHU: fiksne ili ljepljive, stvarno vidljive, i široke preko
        // 60 % ekrana NAKON presjeka s ekranom (bez toga se odgurnuta bočna traka broji).
        const trake = [];
        Array.prototype.slice.call(document.querySelectorAll('body *')).forEach((el) => {
            const cs = getComputedStyle(el);
            if (cs.position !== 'fixed' && cs.position !== 'sticky') return;
            if (!stvarnoVidljiv(el)) return;
            // ⚠️ Fiksno ≠ traka. Studijeva ljuska je `position:fixed; inset:var(--chrome-h) 0 0 0`
            // — dakle SADRŽAJ koji si sam radi spremnik za skrol, a ne kromo. Bez ovog
            // reza mjerač je editoru prijavljivao kromo od 100 % i „nijedna kontrola bez
            // skrola", što su oba bila kvara u mjeri, ne na ekranu. **Traka nikad ne
            // sadrži stranicu** — to je razlika koja se dade provjeriti, za razliku od
            // praga po visini (koji bi baš najgori slučaj sakrio kao „prevelik za traku").
            if (el.matches('section[id$="-page"]') || el.querySelector('section[id$="-page"]')) return;
            const b = vidljivRect(el);
            if ((b.r - b.l) < vw * 0.6) return;      // odgurnuto ustranu = nije traka
            if ((b.b - b.t) < 4) return;
            if (b.t > vh * 0.5) return;              // dno (cookie-banner) je T4, ne ovdje
            trake.push({ ime: ime(el), t: b.t, b: b.b });
        });
        trake.sort((a, b) => a.t - b.t);
        let kromoPx = 0, kraj = 0;
        trake.forEach((x) => {
            const t = Math.max(x.t, kraj);
            if (x.b > t) { kromoPx += x.b - t; kraj = Math.max(kraj, x.b); }
        });
        // Otok nije NAŠ trošak — uređaj ga uzima svakome. Budžet se zato mjeri nad
        // upotrebljivom visinom: koliko od onoga što IMAMO trošimo na trake.
        const nasKromo = Math.max(0, kromoPx - OTOK);
        const upotrebljivaVisina = vh - OTOK;
        const kromoPct = Math.round(nasKromo / upotrebljivaVisina * 100);

        const banner = document.getElementById('cookieBanner');
        const bannerPx = (banner && stvarnoVidljiv(banner)) ? Math.round(banner.getBoundingClientRect().height) : 0;

        // ── ③ KRATI JEDAN, LOMI SE DRUGI (mehanizam BUG-030) ──────────────────────
        // Kad u istom spremniku jedno dijete krati (`nowrap` + `ellipsis`) a drugo se
        // slobodno lomi, ono koje se lomi ODREĐUJE VISINU, a ono koje krati ne određuje
        // ništa — zbije se u „C…". Oba su pravila sama po sebi ispravna; kvar postoji
        // samo u kombinaciji.
        //
        // ⚠️ **Dvije stvari koje je mjerenje ispravilo, i obje mijenjaju mjeru:**
        // ① Sukob NE mora biti u flex-RETKU. Na produkciji `.browse-title` ima
        //    `display:block`, mrvica i naslov su ULOŽENI jedan pod drugim — a naslov je
        //    svejedno 34 px, jer je cijeli stupac 34 px. Prva verzija je tražila samo
        //    flex-redak i zato **nije okinula na stanju koje kvar dokazano ima**.
        // ② Opseg je KROMO I ZAGLAVLJE RAZINE, ne cijela stranica. Kartica sadržaja
        //    smije imati kratki naslov i troredni opis — to je dizajn, ne kvar. Bez tog
        //    reza bi brana prijavljivala šum, a gate koji prijavljuje šum se isključi.
        const spremnici = [];
        Array.prototype.slice.call(document.querySelectorAll('.topbar, .pathbar')).forEach((x) => spremnici.push(x));
        const aktivnaSekcija = document.querySelector('section[id$="-page"].active');
        if (aktivnaSekcija) {
            const h = aktivnaSekcija.querySelector(':scope > header');
            if (h) spremnici.push(h);
        }

        const krati = (c) => {
            const s = getComputedStyle(c);
            if (s.textOverflow === 'ellipsis' && s.whiteSpace.indexOf('nowrap') === 0) return true;
            return Array.prototype.slice.call(c.querySelectorAll('*')).some((d) => {
                const t = getComputedStyle(d);
                return t.textOverflow === 'ellipsis' && t.whiteSpace.indexOf('nowrap') === 0;
            });
        };

        const sudari = [];
        const vidjeniSpremnici = new Set();
        spremnici.forEach((korijen) => {
            const svi = [korijen].concat(Array.prototype.slice.call(korijen.querySelectorAll('*')));
            svi.forEach((box) => {
                if (vidjeniSpremnici.has(box) || !stvarnoVidljiv(box)) return;
                vidjeniSpremnici.add(box);
                const djeca = Array.prototype.slice.call(box.children)
                    .filter((c) => stvarnoVidljiv(c) && c.getBoundingClientRect().height > 0);
                if (djeca.length < 2) return;
                if (!djeca.some(krati)) return;
                djeca.forEach((c) => {
                    if (krati(c)) return;
                    const n = brojRedaka(c);
                    if (n > 2) {
                        sudari.push(ime(box) + ' › ' + ime(c) + ' = ' + n + ' redaka, a susjed krati'
                            + ' · „' + c.innerText.trim().slice(0, 40).replace(/\s+/g, ' ') + '"');
                    }
                });
            });
        });

        // ── ④ PRVI EKRAN ──────────────────────────────────────────────────────────
        // Sadržajna kontrola (ne kromo) koju korisnik može DOTAKNUTI bez skrola. Mjeri
        // se pogotkom (`elementFromPoint`), ne geometrijom: cookie-banner je fiksan i
        // `z-index: 2147483000`, pa gumb ispod njega ima savršen pravokutnik i nikakvu
        // upotrebljivost. Ista mjera kao K3 — postojanje se vidi selektorom,
        // dohvatljivost samo pogotkom.
        const upotrebljivi = interaktivni.filter((k) => {
            if (uKromu(k.el)) return false;
            const cx = k.b.l + (k.b.r - k.b.l) / 2;
            const cy = k.b.t + (k.b.b - k.b.t) / 2;
            if (cy < kromoPx - 1 || cy > vh) return false;
            const meta = document.elementFromPoint(cx, cy);
            return !!meta && (meta === k.el || k.el.contains(meta));
        });

        // ── ⑧ TRAJNI DONJI NAMJEŠTAJ (cigla T4) ───────────────────────────────────
        // Traka pri DNU koja trajno stoji — danas točno jedna: `.study-mobile-nav`, kojom se
        // na telefonu mijenja način učenja. Tvrdnja: **ništa je ne smije prekrivati.**
        //
        // ⚠️ Zašto ovo NIJE pokrivala tvrdnja ④. Ondje je dovoljna JEDNA dohvatljiva
        // kontrola bilo gdje na ekranu — pa stranica na kojoj je cijela donja navigacija pod
        // cookie-trakom prolazi čim ima bilo koji gumb u sadržaju. Točno se to i dogodilo:
        // `study:quiz` i `study:learn` su prolazili, `study:home`, `study:flashcards` i
        // `study:fill` padali, a uzrok je kod SVIH pet bio isti. *Tvrdnja koja mjeri „ima li
        // ičega" ne može reći da je nestalo nešto određeno.*
        //
        // ⚠️ Mjeri se POGOTKOM, ne geometrijom (isti rez kao K3 i ④): prekrivena kontrola ima
        // savršen pravokutnik i nikakvu upotrebljivost. Pokrivač se imenuje, jer bi inače
        // nalaz govorio da je nešto krivo, a ne što.
        const namjestaj = [];
        Array.prototype.slice.call(document.querySelectorAll('body *')).forEach((el) => {
            if (el.id === 'cookieBanner' || el.closest('#cookieBanner')) return;
            if (getComputedStyle(el).position !== 'fixed') return;
            if (!stvarnoVidljiv(el)) return;
            // Ljuska stranice je i sama fiksna (Studio), ali ona SADRŽI stranicu — v. ②.
            if (el.matches('section[id$="-page"]') || el.querySelector('section[id$="-page"]')) return;
            const r = el.getBoundingClientRect();
            if ((r.right - r.left) < vw * 0.6) return;   // odgurnuto ustranu = nije namještaj
            if (r.bottom < vh - 1) return;               // ne sjedi na dnu
            if ((r.bottom - r.top) > vh * 0.5) return;   // previsoko za namještaj
            // Pokrivač se imenuje po najbližem PRETKU koji uopće ima ime — `elementFromPoint`
            // vraća najdublji čvor, a „pokriva span" ne kaže ništa nikome.
            const imePokrivaca = (x) => {
                let p = x, n = 0;
                while (p && n < 5 && !p.id && !(p.className && String(p.className).trim())) { p = p.parentElement; n++; }
                return ime(p || x);
            };
            const mete = Array.prototype.slice.call(el.querySelectorAll(INTERAKTIVNO))
                .filter((m) => !m.disabled && stvarnoVidljiv(m));
            const svi = mete.length ? mete : [el];
            const pokrivaci = [];
            svi.forEach((m) => {
                const b = m.getBoundingClientRect();
                const cx = b.left + b.width / 2, cy = b.top + b.height / 2;
                if (cy < 0 || cy > vh || cx < 0 || cx > vw) return;
                const meta = document.elementFromPoint(cx, cy);
                if (!meta || (meta !== m && !m.contains(meta))) pokrivaci.push(meta ? imePokrivaca(meta) : '?');
            });
            if (pokrivaci.length) {
                namjestaj.push(ime(el) + ': ' + pokrivaci.length + ' od ' + svi.length
                    + ' kontrola prekriveno · pokriva ' + pokrivaci[0]);
            }

            // ⚠️ DRUGA MJERA: GORNJI RUB. Prva mjera gađa SREDIŠTE kontrole, a *pogodak u
            // sredinu ne dokazuje da je kontrola cijela vidljiva*. Točno se to i dogodilo:
            // traka je jednom sjela 34 px preduboko i pokrila **gornju trećinu navigacije —
            // dakle ikone** — a prva mjera je šutjela jer su središta gumba ostala ispod
            // preklopa. Rub se zato uzorkuje na tri točke (lijevo/sredina/desno).
            const rubY = r.top + 3;
            if (rubY > 0 && rubY < vh) {
                const tocke = [r.left + 8, (r.left + r.right) / 2, r.right - 8];
                const prekriven = tocke.filter((x) => {
                    if (x < 0 || x > vw) return false;
                    const meta = document.elementFromPoint(x, rubY);
                    return !!meta && meta !== el && !el.contains(meta);
                });
                if (prekriven.length) {
                    const meta = document.elementFromPoint(tocke[1], rubY);
                    namjestaj.push(ime(el) + ': gornji rub prekriven u ' + prekriven.length
                        + ' od 3 točke · pokriva ' + (meta ? imePokrivaca(meta) : '?'));
                }
            }
        });

        // ── ⑤ ZAGLAVLJE RAZINE ────────────────────────────────────────────────────
        // Samo zaglavlje AKTIVNE razine + mrvica u traci. Hero-naslov landinga NIJE tu:
        // on smije omotati (to je tipografija, cigla T5), a mrvica ne smije.
        const aktivna = document.querySelector('section[id$="-page"].active');
        const zaglavlja = [];
        const kandidati = [];
        if (aktivna) {
            const hdr = aktivna.querySelector(':scope > header');
            if (hdr) Array.prototype.push.apply(kandidati,
                Array.prototype.slice.call(hdr.querySelectorAll('h1, h2, .breadcrumb, .crumb')));
        }
        Array.prototype.push.apply(kandidati,
            Array.prototype.slice.call(document.querySelectorAll('.pathbar .crumb')));

        kandidati.forEach((el) => {
            if (!stvarnoVidljiv(el)) return;
            const tekst = el.innerText.trim().replace(/\s+/g, ' ');
            if (!tekst) return;
            const n = brojRedaka(el);
            // Odrezano ispod čitljivosti: element KRATI (pa nema prelijeva koji bi itko
            // vidio), ali pokazuje manje od 60 % vlastita teksta. Baš to je na produkciji
            // dalo naslov „C…" — 34 od 187 px.
            //
            // ⚠️ **60 % je ODABRAN prag, ne izveden — i to se piše da se ne bi činio
            // mjerenim.** Broj redaka (drugi krak ove tvrdnje) je objektivan: jedan redak
            // ili više. Kod kraćenja objektivne granice nema, pa je prag kalibriran na
            // raspon koji mora razdvojiti: svi poznati kvarovi leže na **15–52 %**
            // (produkcija 15 · 18 · 25 · 38 · 52, grana 30), a nijedno poznato ISPRAVNO
            // kraćenje nije izmjereno. Dakle prag razdvaja poznato loše od praznog skupa —
            // svaka vrijednost iznad 52 % daje isti ishod danas. Ako T2 ostavi legitimno
            // kraćenje ispod 60 %, prag se pomiče **uz zapis zašto**, ne prešutno.
            //
            // ⚠️ **T2 — PRAG SE NE MJERI PRECIMA, i to je razlika u ULOZI, ne popuštanje.**
            // Tvrdnja ⑤ odgovara na pitanje *„znam li gdje sam?"*, a na njega odgovara
            // TRENUTNA razina. Preci u mrvici („Predmeti › FMTU › …") su **navigacija**:
            // oni su odgovor na „kamo mogu natrag", uvijek su izvedivi iz konteksta, i od
            // T2 se namjerno **stišću da bi trenutna razina ostala čitava** (do T2 je bilo
            // obrnuto — stiskala se jedina mrvica koja govori gdje si, na 30 od 99 px).
            // Za pretke i dalje vrijedi da se ne smiju LOMITI (provjera redaka ispod) i da
            // moraju ostati dohvatljivi — to mjeri `reachability.spec.js` pogotkom, a
            // `min-width` u `topbar.css` im jamči širinu. Bez ovog reza brana bi kažnjavala
            // baš pravilo koje je uvedena da nametne.
            const predak = el.classList.contains('crumb') && !el.classList.contains('crumb-current');
            const udio = el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1;
            if (n > 1) zaglavlja.push(ime(el) + ': ' + n + ' redaka · „' + tekst.slice(0, 46) + '"');
            else if (!predak && udio < 0.6 && el.clientWidth > 0) {
                zaglavlja.push(ime(el) + ': odrezan na ' + el.clientWidth + ' od ' + el.scrollWidth
                    + ' px (' + Math.round(udio * 100) + ' %) · „' + tekst.slice(0, 46) + '"');
            }
        });

        // ── ⑨ DODIR NE ZUMIRA (cigla F1/10) ────────────────────────────────────────
        // iOS Safari zumira stranicu kad fokusirano polje ima izračunati `font-size` < 16 px,
        // i ne vraća je (Leonov nalaz 2026-09-05). Mjere se SVA tekstualna polja u DOM-u,
        // i skrivena: izračunati font ne ovisi o vidljivosti, a polje koje je danas u
        // zatvorenom modalu (prijava) sutra je dotaknuto polje. Radio/checkbox i gumbi ne
        // primaju tekst, pa ne zumiraju — isključeni su da nalaz imenuje samo stvarne kvarove.
        //
        // ⚠️ Zašto je ovo bilo NEMJERLJIVO do F1/10: štitilo je pravilo iza
        // `@supports (-webkit-touch-callout: none)` s `!important`, koje NIJEDAN motor ove
        // brane ne zadovoljava (Chromium i Playwrightov WebKit: `CSS.supports` = false).
        // Obrnuta provjera 2026-09-05: na stanju prije popravka **11 polja** na svakom od 13
        // ekrana (`.auth-modal__input` 15,2 px · `.cat-search-input` 14,4 px), s popravkom 0.
        const POLJA = ':is(input, select, textarea):not([type=hidden]):not([type=checkbox])'
            + ':not([type=radio]):not([type=range]):not([type=color]):not([type=file])'
            + ':not([type=submit]):not([type=button]):not([type=reset]):not([type=image])';
        const sitnaPolja = [];
        Array.prototype.slice.call(document.querySelectorAll(POLJA)).forEach((el) => {
            const px = parseFloat(getComputedStyle(el).fontSize);
            if (px < 16) sitnaPolja.push(ime(el) + ': ' + (Math.round(px * 10) / 10) + ' px');
        });

        return {
            stranica: (window.AppState && AppState.nav && AppState.nav.page) || '?',
            vw: vw, vh: vh,
            kromoPx: Math.round(kromoPx), nasKromo: Math.round(nasKromo), kromoPct: kromoPct,
            // Nazivnik postotka IDE UZ postotak. Poruke su ga prije računale same, kao
            // `vh - 59`, pa je stranica bez izreza dobivala redak u kojem se broj i postotak
            // ne slažu („21 % (120 od 509 px)" — 120/509 je 24 %). Mjera koja ispisuje dva
            // broja koja se međusobno poriču ne da se provjeriti pogledom.
            upotrebljivaVisina: Math.round(upotrebljivaVisina),
            trake: trake.map((t) => t.ime + ' ' + Math.round(t.t) + '…' + Math.round(t.b)),
            bannerPx: bannerPx, bannerPct: Math.round(bannerPx / vh * 100),
            uOtoku: uOtoku,
            podIzrezom: podIzrezom,
            bocno: bocnoNaVrhu,
            sudari: sudari,
            upotrebljivih: upotrebljivi.length,
            prviUpotrebljiv: upotrebljivi.length ? ime(upotrebljivi[0].el) : '—',
            namjestaj: namjestaj,
            sitnaPolja: sitnaPolja,
            zaglavlja: zaglavlja
        };
    }, { rub: rub, faza: faza });
}

/**
 * Izmjeri STRANICU na trenutnom ekranu (tvrdnje ①–⑤). Vraća sve brojke; sud je u
 * spec-datoteci — mjera i sud se namjerno ne miješaju (isti rez kao `reach-gate`).
 */
function mjeriStranicu(page, rub = RUB_PORTRET) {
    return mjeri(page, rub, 'stranica');
}

/**
 * ⑥ + ⑦ — DONJI I BOČNI RUB. Odvojena **funkcija**, ali NE odvojena mjera: stanje stranice
 * se priprema ovdje (spusti se do kraja), a mjeri ista `mjeri()` u fazi `'rubovi'` — pa
 * `ime`/`vidljivRect`/`stvarnoVidljiv` postoje u jednom primjerku. Priprema je nužna jer se
 * donji rub mjeri tek na dnu skrola (dok se skrola, sadržaj kroz pojas prolazi i to nije
 * kvar), a to bi tvrdnjama ①–⑤ pomaknulo tlo pod nogama.
 *
 * ⚠️ **Skrol se mora ODMOTATI prije mjerenja.** `css/variables.css` ima
 * `scroll-behavior: smooth`, pa se postavljanje `scrollTop` **animira** — prva verzija
 * sonde je na landingu izmjerila 779 od 4946 px i mislila da je na dnu. Isti razred kao
 * fiksno čekanje u navigaciji: *mjerila se posljedica koja još nije nastupila.*
 */
async function mjeriRubove(page, rub = RUB_PORTRET) {
    await page.evaluate(() => {
        document.documentElement.style.scrollBehavior = 'auto';
        const svi = [document.scrollingElement || document.documentElement];
        document.querySelectorAll('section[id$="-page"].active *').forEach((el) => {
            const cs = getComputedStyle(el);
            if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 4) svi.push(el);
        });
        svi.forEach((el) => { el.style.scrollBehavior = 'auto'; el.scrollTop = el.scrollHeight; });
    });
    await page.waitForTimeout(220);
    await postaviRub(page, rub);
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));

    const nalaz = await mjeri(page, rub, 'rubovi');

    // Vrati stranicu na vrh — sljedeća tvrdnja mjeri sa svog polazišta, ne s tuđeg.
    await page.evaluate(() => {
        const se = document.scrollingElement || document.documentElement;
        se.scrollTop = 0;
        document.querySelectorAll('section[id$="-page"].active *').forEach((el) => { el.scrollTop = 0; });
    });
    return nalaz;
}

/** Prag budžeta kroma (spec §9.3, cigla T3). Udio UPOTREBLJIVE visine, ne cijelog ekrana. */
const KROMO_BUDZET_PCT = 20;

// ── ČEGRTALJKA: zašto brana NE traži nulu odmah ──────────────────────────────────
// T0 nalazi kvarove koje plan izričito dodjeljuje ciglama **T1–T5**. Da brana traži
// nulu, `npm run test:responsive` bio bi crven kroz **pet** cigli — a tada „je li suita
// zelena?" prestaje biti upotrebljivo pitanje i **prava regresija u ostalih 400+ testova
// nestane u šumu**. Projekt taj razred problema već ima riješen i zapisan: `check:palette`
// *„ne traži nulu nego samo da broj nikad ne poraste"*.
//
// Zato osnovica (`tests/phone-baseline.json`) drži **poznate** kvarove, imenovane doslovno.
// Brana pada **samo na kvaru kojeg u osnovici nema** — dakle na NOVOM. Kad cigla nešto
// popravi, osnovica se spusti (`PHONE_BASELINE_UPDATE=1 npx playwright test tests/phone…`),
// i to je jedini način da broj padne. **Riješeni upisi se ispisuju glasno**, jer bi
// zastarjela osnovica tiho pokrivala kvar koji se vratio.
const fs = require('fs');
const path = require('path');
const OSNOVICA_PUT = path.join(__dirname, '..', 'phone-baseline.json');

function ucitajOsnovicu() {
    try { return JSON.parse(fs.readFileSync(OSNOVICA_PUT, 'utf8')); } catch (e) { return {}; }
}

/** Vrati `{ novi, rijeseni }` za jednu tvrdnju jedne suite. */
/**
 * ⚠️ IDENTITET NALAZA NE SMIJE SADRŽAVATI NJEGOVO MJERENJE (2026-08-24).
 * Osnovica je do danas uspoređivala DOSLOVNE stringove, a nalaz u sebi nosi izmjerene
 * piksele: „320px about · kromo 159 px + banner 129 px (23 %) od 568 px". Linux crta font
 * ~4 px šire (pouka iz C0) → cookie-traka prelomi tekst drugačije → „banner 145 px" → isti,
 * odavno poznat kvar broji se kao NOV i brana padne. Lokalno zeleno, u CI-ju crveno, bez
 * ijedne promjene u proizvodu.
 *
 * Zato se uspoređuje po KLJUČU: „gdje" (širina + ekran) ostaje doslovan, a u opisu iza
 * „ · " se brojevi normaliziraju. Imena kontrola ostaju netaknuta — ondje su IDENTITET
 * (dva različita gumba na istom ekranu moraju ostati dva nalaza).
 *
 * Cijena koja se izriče: promjena SAMO u brojci više ne pali branu. To je ovdje ispravno,
 * jer sve tvrdnje ove brane imaju vlastiti prag — nalaz POSTOJI tek kad je prag probijen,
 * pa je alarm njegova prisutnost, a ne veličina. Nov ekran ili nova kontrola i dalje
 * dobivaju nov ključ i dalje ruše branu.
 */
function kljucNalaza(s) {
    const i = String(s).indexOf(' · ');
    if (i < 0) return String(s);
    return String(s).slice(0, i + 3) + String(s).slice(i + 3).replace(/\d+([.,]\d+)?/g, '#');
}

function usporediSOsnovicom(suita, kljuc, nadjeno) {
    const poznati = ((ucitajOsnovicu()[suita] || {})[kljuc]) || [];
    const poznatiKljucevi = poznati.map(kljucNalaza);
    const nadjeniKljucevi = nadjeno.map(kljucNalaza);
    return {
        novi: nadjeno.filter((x) => poznatiKljucevi.indexOf(kljucNalaza(x)) === -1),
        rijeseni: poznati.filter((x) => nadjeniKljucevi.indexOf(kljucNalaza(x)) === -1)
    };
}

/** Prepiši SVOJ dio osnovice (ostale suite ostaju netaknute). Samo uz izričit env-flag. */
function spremiOsnovicu(suita, nalazi) {
    if (!process.env.PHONE_BASELINE_UPDATE) return false;
    const o = ucitajOsnovicu();
    o._zasto = 'Poznati kvarovi telefona koje T1-T5 tek trebaju pojesti. Brana pada samo na NOVOM '
        + 'kvaru; spusti se s PHONE_BASELINE_UPDATE=1. Vidi tests/helpers/phone-gate.js i spec 9.7.';
    o[suita] = {};
    Object.keys(nalazi).sort().forEach((k) => { o[suita][k] = nalazi[k].slice().sort(); });
    fs.writeFileSync(OSNOVICA_PUT, JSON.stringify(o, null, 2) + '\n');
    return true;
}

module.exports = {
    OTOK, RUB_PORTRET, RUB_LANDSCAPE, EKRANI, EKRANI_JAVNI, EKRANI_PRIJAVLJENI, NACINI,
    NACINI_UVJETNI, BEZ_IZREZA, EKRANI_ODOBRENJE, SAMOSTALNE,
    KROMO_BUDZET_PCT,
    spreman, postaviRub, idiNa, otvoriNacin, mjeriStranicu, mjeriRubove,
    usporediSOsnovicom, spremiOsnovicu, kljucNalaza
};
