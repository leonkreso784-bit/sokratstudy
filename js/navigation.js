// ===== SOKRAT STUDY — NAVIGATION =====

// ========== POSITION PERSISTENCE ==========
function saveCurrentPosition(page, data) {
    const nav = AppState.nav;
    const position = {
        page: page,
        subject: data.subject || nav.subject,
        lesson: data.lesson || nav.lesson,
        section: nav.section,
        category: nav.category,
        timestamp: Date.now()
    };
    localStorage.setItem('sokrat-last-position', JSON.stringify(position));
}

/**
 * BUG-023 — smijemo li UOPĆE otvoriti ovaj subjekt?
 *
 * Katalog-subjekti su u `subjectDataMap` od učitavanja skripte. Osobni materijali su
 * SINTETIČKI (`node:<uuid>`) i u mapu ulaze tek kad `SokratMaterials` učita korisnikovo
 * stablo — što na hladnom startu nije napravljeno. Zato ih ovdje treba zatražiti.
 *
 * `false` = ne otvaraj stranicu. Prazna study-stranica za nepostojeći subjekt gora je
 * od landinga: izgleda kao da je gradivo nestalo, a svaka radnja na njoj puca.
 */
async function isSubjectOpenable(subjectId) {
    if (typeof subjectDataMap === 'undefined' || !subjectId) return false;
    if (subjectDataMap[subjectId]) return true;
    // Samo materijali imaju odgođenu registraciju; sve ostalo je obrisan ili pokvaren zapis.
    if (String(subjectId).indexOf('node:') !== 0) return false;
    // Dijeljiva ruta smije voditi RAVNO u vlastiti materijal (`#/subject/node%3A…`), dakle na
    // hladnom startu — a `my-materials.js` od učitavanja po ruti dolazi tek s tim putem.
    await SokratLoad.paket('materials').catch(function (e) { console.warn('[loader]', e); });
    const M = (typeof window !== 'undefined') ? window.SokratMaterials : null;
    if (!M || typeof M.ensureRegistered !== 'function') return false;
    await M.ensureRegistered();          // tiho `false` ako nije prijavljen / nema mreže
    return !!subjectDataMap[subjectId];
}

async function restoreLastPosition() {
    try {
        // IZRIČITA RUTA U ADRESI POBJEĐUJE SPREMLJENU POZICIJU (C0, prošireno u K1). Obnova je
        // asinkrona (`isSubjectOpenable` čeka mrežu), pa bi inače dvije sekunde nakon otvaranja
        // dijeljenog linka korisnika odbacila na prošli predmet — a on je tražio točno određenu
        // stranicu. Do K1 je ovo vrijedilo samo za `#/materials`; sad za svaku rutu.
        const route = parseRoute(location.hash);
        if (route) { if (await applyRoute(route)) return; }

        const saved = localStorage.getItem('sokrat-last-position');
        if (saved) {
            const position = JSON.parse(saved);
            const hoursSinceSave = (Date.now() - position.timestamp) / (1000 * 60 * 60);

            if (hoursSinceSave < 24 && position.page && position.page !== 'landing') {
                if (position.page === 'study' && position.subject && position.lesson) {
                    // BUG-023: provjeri PRIJE navigacije — `navigateTo` odmah prikaže stranicu
                    // i postavi `AppState.nav.subject`, pa kasnije odustajanje ostavlja krš.
                    if (!(await isSubjectOpenable(position.subject))) return;
                    AppState.nav.category = position.category || 'all';
                    // Pass the saved section into init; it switches there AFTER lazy content
                    // loads (no setTimeout race with async loading).
                    navigateTo('study', {
                        subject: position.subject,
                        lesson: position.lesson,
                        section: position.section || 'home'
                    });
                    return;
                } else if (position.page === 'lessons' && position.subject) {
                    if (!(await isSubjectOpenable(position.subject))) return;
                    navigateTo('lessons', { subject: position.subject });
                    return;
                }
            }
        }
    } catch (e) {
        // Could not restore position
    }
    navigateTo('landing');
}

// ========== PAGE NAVIGATION ==========
//
// K2a — JEDAN MODEL VRAĆANJA. Do K2a su ovdje živjela TRI paralelna: tvrdo ožičen
// roditelj u svakom gumbu (`backToLessons` → uvijek `lessons`), ručna jednodubinska
// povijest (`profileReturnPage`/`materialsReturnPage`) i — od K1 — prava povijest
// preglednika. Tri modela su se neizbježno razišla, i to na dva mjesta koja je Leon
// našao na živom ekranu:
//
//   ① Osobni materijal se uči kao sintetički predmet `node:<uuid>`, ali su gumbi natrag
//      poznavali SAMO katalošku hijerarhiju (browse → lessons → study). Vraćanje iz
//      vlastitog materijala vodilo je na lekcijsku stranicu ČVORA (koja crta prazninu,
//      „Matematika / undefined"), pa odande na izbor fakulteta.
//   ② `materialsReturnPage` je pamtio dolazak IZ EDITORA, pa je „natrag" s police vraćao
//      natrag u editor — petlja materijali ⇄ Studio. Isti izuzetak POSTOJAO je za profil
//      (komentar se izričito poziva na BUG-019 i petlju profil ⇄ admin) i nikad nije bio
//      prenesen na materijale.
//
// Sada je model jedan: `goBack()` koristi POVIJEST kad iza nas stoji naš unos, a inače
// pada na SEMANTIČKOG RODITELJA koji zna obje hijerarhije (`roditeljOd`). Ručna jednodubinska
// povijest je obrisana — dva zapisa o istoj stvari su i bila uzrok.

/**
 * Koliko smo unosa gurnuli u povijest U OVOJ SESIJI STRANICE.
 * Nula znači da iza nas nema NAŠEG unosa (hladan dolazak na dijeljeni link), pa bi
 * `history.back()` izašao sa stranice — tada ide semantički roditelj.
 * ⚠️ Broji se kroz `history.state`, ne brojačem: brojač bi `popstate` dekrementirao i pri
 * koraku NAPRIJED, pa bi dubina lagala čim korisnik krene naprijed-natrag.
 */
let dubinaPovijesti = 0;

function navigateTo(page, data = {}) {
    // K2a — ČUVAR DVIJU HIJERARHIJA. Osobni materijal nema lekcijsku stranicu: ima točno
    // jednu lekciju i živi u polici, ne u katalogu. Čuvar stoji OVDJE, a ne u gumbu natrag,
    // jer je ruta od K1 dijeljiva — `#/subject/node%3A<uuid>` se da poslati i utipkati.
    if (page === 'lessons' && data.subject && String(data.subject).indexOf('node:') === 0) {
        page = 'materials';
        data = {};
    }
    AppState.nav.page = page;
    // Profile/Admin/Editor/Materials se NE spremaju kao "last position" (ovise o auth sesiji / admin
    // statusu koji na reloadu još nisu spremni — obnova bi otvorila prazan ekran; usp. BUG-023).
    // T6: editor i admin-preglednik više nisu stranice ove aplikacije (v. `editor.html`).
    if (page !== 'profile' && page !== 'materials') saveCurrentPosition(page, data);

    // F1/8 ②: stranica se mijenja ispod nepomičnog miša → hover miruje do prvog pomaka (`utils.js`).
    pauzirajHover();

    document.querySelectorAll('.landing-page, .browse-page, .lessons-page, .study-page, .about-page, .materials-page, .profile-page, .admin-page, .studio-page').forEach(p => {
        p.classList.remove('active');
    });

    switch (page) {
        case 'landing':
            // Jezik sučelja = GLOBALNI toggle (ne diramo ga po stranici); chrome se već boja iz i18n inita.
            document.getElementById('landing-page').classList.add('active');
            closeSidebar();
            break;
        case 'browse':
            renderBrowse();
            document.getElementById('browse-page').classList.add('active');
            closeSidebar();
            break;
        case 'lessons':
            if (data.subject) {
                AppState.nav.subject = data.subject;
                if (typeof suggestLangForSubject === 'function') suggestLangForSubject(data.subject);
                renderLessonsPage(data.subject);
            }
            document.getElementById('lessons-page').classList.add('active');
            closeSidebar();
            break;
        case 'study':
            if (data.subject && data.lesson) {
                AppState.nav.subject = data.subject;
                AppState.nav.lesson = data.lesson;
                if (typeof suggestLangForSubject === 'function') suggestLangForSubject(data.subject);  // prvi put HR program → predloži hrvatski
                initStudyPage(data.subject, data.lesson, data.section);
            }
            document.getElementById('study-page').classList.add('active');
            break;
        case 'about':
            document.getElementById('about-page').classList.add('active');
            break;
        case 'materials':
            document.getElementById('materials-page').classList.add('active');
            closeSidebar();
            // Stranica se PRIKAŽE odmah, sadržaj stiže sa svojim paketom. Da se čekalo prije
            // prikaza, klik na „Moji materijali" ne bi radio ništa vidljivo dok mreža ne
            // odgovori — a stranica ima vlastito prazno stanje i bez podataka.
            SokratLoad.paket('materials').then(function () {
                // C0 / ADR-029: vlastiti materijal je ravnopravno odredište. Stranica se smije otvoriti i
                // BEZ prijave — renderPage() tada pokaže poziv na prijavu umjesto stabla.
                if (window.SokratMaterials) SokratMaterials.renderPage();
                // P2: drugi izvor police. NE ovisi o prijavi — crta se uvijek, i prazan popis
                // ima svoje stanje (inače korisnik ne bi imao odakle saznati da skidanje postoji).
                if (window.SokratOffline) window.SokratOffline.mountShelf(document.getElementById('shelfList'));
            }).catch(pakerPao);
            break;
        case 'profile':
            document.getElementById('profile-page').classList.add('active');
            SokratLoad.paket('profile')
                .then(function () { if (typeof renderProfilePage === 'function') renderProfilePage(); })
                .catch(pakerPao);
            break;
    }

    // K1: adresa prati stranicu. Do K1 je ovdje stajao `replaceState` za JEDNU rutu
    // (`#/materials`), uz obrazloženje „ne trpa u povijest". To je bilo točno dok je ruta
    // bila jedna; sad je upravo povijest ono što se gradi — bez nje „natrag" izlazi sa
    // stranice (BUG-019/BUG-020 traže pravi nav-model, v. §8 specifikacije).
    syncRoute(page, data);
    // Jednokratna zastavica NIKAD ne smije preziviti navigaciju: syncRoute ima rane izlaze
    // (ista adresa, golo sidro) u kojima se ne upisuje nista, pa bi inace procurila u sljedecu.
    zamijeniSljedeciUnos = false;

    // K2b: drugi red se crta NAKON što je stanje postavljeno — nazivi predmeta, lekcije i
    // materijala dolaze iz istog stanja koje `navigateTo` gore tek upisuje.
    renderPathbar();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== RUTER (K1, faza „KOSTUR" — spec §8) ==========
//
// Do K1 je aplikacija imala DEVET stranica i JEDNU adresu (`#/materials`). Posljedice su
// se plaćale svaki dan: „natrag" je odvodio sa stranice, nijedan predmet ni lekcija nisu
// se dali podijeliti, tražilice su vidjele jednu stranicu, a dijeljenje materijala —
// faza odmah iza MCP-a (ADR-030) — nije imalo na što objesiti token.
//
// ⚠️ OVO NIJE NOVA ARHITEKTURA. `saveCurrentPosition()` odozgo VEĆ serijalizira
// `{page, subject, lesson, section, category}` — potpun opis rute — samo ga piše u
// `localStorage` umjesto u adresu. K1 je preusmjeravanje istog opisa, ne novi model.
// Zato `saveCurrentPosition` i dalje živi: on je pamćenje („gdje sam stao", 24 h),
// adresa je identitet („što gledam"). Kad se razilaze, ADRESA POBJEĐUJE.
//
// ⚠️ SVE RUTE SU `#/`-PREFIKSIRANE. Landing koristi gole sidrene linkove (`#top`,
// `#subjects`), pa bi goli `#subjects` bio u istom prostoru imena i ruter bi otimao
// obično skrolanje po landingu. Sve što ne počinje s `#/` ruter NE dira.

const MATERIALS_ROUTE = '#/materials';   // C0 · zadržana doslovno — vanjski linkovi već postoje

/**
 * ⚠️ `profile`, `admin` i `editor` NAMJERNO NEMAJU RUTU.
 *
 * Njihov prikaz ovisi o auth-sesiji i admin-statusu koji na hladnom startu još nisu
 * spremni — to je isti razlog zbog kojeg ih `saveCurrentPosition` gore ne sprema, i
 * točno razred kvara iz BUG-023 (obnova je gađala subjekt koji još nije registriran i
 * otvarala praznu stranicu koja puca pri svakom spremanju). Deep-link na `#/admin`
 * pokazao bi prazan admin bilo kome tko zna adresu.
 *
 * Za te tri stranice adresa se ČISTI, ali kroz `pushState` — v. upozorenje u `syncRoute`.
 * Time „natrag" iz Studija vraća na materijale, odakle se i ušlo.
 */
const UNROUTED_PAGES = ['profile'];

/** Stanje aplikacije → adresa. `null` = stranica nema rutu (v. `UNROUTED_PAGES`). */
function routeFor(page, data) {
    const d = data || {};
    const subject = d.subject || AppState.nav.subject;
    const lesson = d.lesson || AppState.nav.lesson;
    const enc = encodeURIComponent;

    switch (page) {
        case 'landing':   return '#/';
        case 'browse':    return '#/subjects';
        case 'about':     return '#/about';
        case 'materials': return MATERIALS_ROUTE;
        case 'lessons':   return subject ? '#/subject/' + enc(subject) : null;
        case 'study': {
            if (!subject || !lesson) return null;
            const base = '#/subject/' + enc(subject) + '/' + enc(lesson);
            const sec = d.section || AppState.nav.section;
            // `home` je zadano stanje i ne piše se — inače bi svaka lekcija imala dvije
            // adrese za isti prikaz, a dijeljeni link bi ovisio o tome je li netko dirao tabove.
            return (sec && sec !== 'home') ? base + '/' + enc(sec) : base;
        }
        default:          return null;
    }
}

/** Adresa → stanje. `null` = nije naša ruta (golo sidro, prazno, smeće). */
function parseRoute(hash) {
    if (!hash || hash.indexOf('#/') !== 0) return null;
    const parts = hash.slice(2).split('/').filter(Boolean).map(function (s) {
        try { return decodeURIComponent(s); } catch (e) { return s; }
    });

    if (parts.length === 0) return { page: 'landing', data: {} };
    if (parts[0] === 'subjects' && parts.length === 1) return { page: 'browse', data: {} };
    if (parts[0] === 'about' && parts.length === 1) return { page: 'about', data: {} };
    if (parts[0] === 'materials' && parts.length === 1) return { page: 'materials', data: {} };

    if (parts[0] === 'subject' && parts[1]) {
        if (parts.length === 2) return { page: 'lessons', data: { subject: parts[1] } };
        if (parts.length === 3 || parts.length === 4) {
            return { page: 'study', data: { subject: parts[1], lesson: parts[2], section: parts[3] || 'home' } };
        }
    }
    return null;
}

/**
 * Upisuje adresu nakon što je `navigateTo` već prikazao stranicu.
 *
 * ⚠️ `pushState` NE OKIDA `hashchange` — zato ruter ne reagira na vlastiti upis i nije
 * potrebna zastavica koja se može zaglaviti. Jedini čuvar je usporedba s trenutnom
 * adresom, dakle idempotencija umjesto stanja.
 */
function syncRoute(page, data) {
    if (!history || !history.pushState) return;
    const want = routeFor(page, data);
    const sad = location.hash;

    if (want === null) {
        // ⚠️ ČISTI SE `pushState`-om, NE `replaceState`-om. Prva verzija je ovdje imala
        // `replaceState` uz obrazloženje „ne diraj povijest" — a `replaceState` **pojede
        // unos na kojem stojiš**, dakle baš onaj s kojeg si došao. Posljedica: „natrag" iz
        // Studija preskakao je materijale i završavao na landingu. Oborio ga je test, ne
        // čitanje koda; komentar je tvrdio suprotno od onoga što je kod radio.
        if (sad) gurniUnos(location.pathname + location.search);
        return;
    }
    if (sad === want) return;

    if (want === '#/') {
        // Prazan hash JE landing — normalizacija u `#/` samo bi potrošila jedan „natrag".
        if (!sad) return;
        // ⚠️ GOLO SIDRO NA LANDINGU JE PRECIZNIJA POZICIJA OD `#/` — ne gazi se.
        // Bez ovoga `restoreLastPosition()` na hladnom startu završi u `navigateTo('landing')`
        // i prepiše `#subjects` u `#/`, pa preglednik nema kamo skrolati: podijeljeni link na
        // sekciju landinga tiho prestane raditi. I ovo je našla proba, ne čitanje koda.
        if (sad.indexOf('#/') !== 0) return;
    }

    gurniUnos(want);
}

/**
 * Promjena moda unutar lekcije mijenja adresu, ali NE gura u povijest.
 * Inače bi „natrag" prolazio kroz svaki klik na tab umjesto da napusti lekciju.
 */
function syncSectionRoute() {
    if (!history || !history.replaceState) return;
    if (AppState.nav.page !== 'study') return;
    const want = routeFor('study', {});
    if (want && location.hash !== want) history.replaceState(null, '', want);
}

/**
 * Jednokratno: sljedeći upis u adresu ZAMJENJUJE trenutni unos umjesto da gura novi.
 * Postavlja ga samo kretanje GORE (`goBack` bez povijesti) — v. obrazloženje u `gurniUnos`.
 */
let zamijeniSljedeciUnos = false;

/**
 * Jedini put kojim unos ulazi u povijest — da dubina i povijest ne mogu razići.
 *
 * ⚠️ KRETANJE GORE ZAMJENJUJE, NE GURA. Prva verzija K2a je i za roditelja gurala unos, pa
 * je hladan dolazak na dijeljenu lekciju davao petlju: „natrag" je vodio na predmet, a
 * sljedeći „natrag" NAZAD U LEKCIJU — jer je odlazak gore sam sebi stvorio povratni unos.
 * Popravak je stvarao petlju koju je trebao ukloniti; našla ga je proba u pregledniku.
 * Zamjenom se dijete odbacuje, pa uzastopni „natrag" penje hijerarhiju do landinga, a
 * preglednikov „natrag" uredno izlazi onamo odakle je korisnik i došao.
 */
function gurniUnos(url) {
    if (zamijeniSljedeciUnos) {
        zamijeniSljedeciUnos = false;
        history.replaceState({ sokratDubina: dubinaPovijesti }, '', url);
        return;
    }
    dubinaPovijesti += 1;
    history.pushState({ sokratDubina: dubinaPovijesti }, '', url);
}

/**
 * Semantički roditelj stranice — REZERVNI put, za slučaj kad iza nas nema našeg unosa
 * (hladan dolazak na dijeljeni link). Zna OBJE hijerarhije, i to je cijela poanta:
 * katalog ide `browse → lessons → study`, a vlastito gradivo `polica → study`, bez
 * lekcijskog međukoraka — jer ga čvor nema.
 */
function roditeljOd(page, nav) {
    const subjekt = (nav && nav.subject) ? String(nav.subject) : '';
    const cvor = subjekt.indexOf('node:') === 0;

    switch (page) {
        case 'study':   return cvor ? { page: 'materials', data: {} } : { page: 'lessons', data: { subject: subjekt } };
        case 'lessons': return cvor ? { page: 'materials', data: {} } : { page: 'browse', data: {} };
        // ⚠️ T6: editor i admin-preglednik VIŠE NISU STRANICE OVE APLIKACIJE — od tada žive
        // na `editor.html`, pa im ovdje nema ni roditelja ni imena. Povratak iz editora nije
        // izgubljen nego je postao ono što i jest: povijest preglednika između dva dokumenta
        // (v. `goBack` u `js/editor-page.js`). K2b-ov nalog — hijerarhija na JEDNOM mjestu —
        // stoji i dalje; ova je funkcija i dalje to jedno mjesto, samo za sedam stranica.
        default:        return { page: 'landing', data: {} };
    }
}

/**
 * „Natrag" za SVE gumbe u aplikaciji. Jedan ulaz umjesto sedam tvrdo ožičenih odredišta.
 *
 * @param {string} [rezervni] Stranica na koju se pada kad povijesti nema. Prosljeđuju je
 *   samo pozivatelji koji o kontekstu znaju više od `AppState`-a — Studio zna je li otvorio
 *   osobni čvor ili katalog, a `AppState.nav.subject` mu to ne kaže.
 */
function goBack(rezervni) {
    // K2b — DUBINA UNUTAR STRANICE IDE PRIJE DUBINE MEĐU STRANICAMA. Browse ima vlastiti
    // drill-down (fakultet → smjer → godina → predmeti) koji NE stvara unose u povijesti,
    // jer se ne mijenja stranica nego samo njezin sadržaj. Da globalni „natrag" to ne zna,
    // s razine „predmeti" izletio bi ravno s browsea i preskočio tri razine kroz koje je
    // korisnik upravo prošao. `browseBack()` na vrhunskoj razini vraća poziv ovamo, pa
    // rekurzija staje.
    if (!rezervni && AppState.nav.page === 'browse' && typeof browseState !== 'undefined'
        && browseState.level && browseState.level !== 'faculties') {
        browseBack();
        return;
    }
    // Iza nas stoji NAŠ unos → koristi pravu povijest. Time „natrag" u aplikaciji i
    // sistemska gesta natrag konačno govore isto; do K2a su se razilazili.
    if (dubinaPovijesti > 0 && history && typeof history.back === 'function') {
        history.back();
        return;
    }
    // Bez povijesti idemo GORE. Kretanje gore zamjenjuje unos (v. gurniUnos) -- inace
    // bi si samo stvorilo povratni unos i sljedeci natrag bi pao natrag u dijete.
    zamijeniSljedeciUnos = true;
    if (rezervni) { navigateTo(rezervni, {}); return; }
    const r = roditeljOd(AppState.nav.page, AppState.nav);
    navigateTo(r.page, r.data);
}

/* ═══════════════════════════════════════════════════════════════════════
   K2b — JEDNA GORNJA TRAKA (spec §8)

   Mrvica se NE gradi iz vlastite tablice nego se PENJE kroz `roditeljOd()` —
   istu funkciju koja pogoni „natrag". To nije ušteda koda nego jedina brana
   protiv razilaženja: put koji mrvica pokazuje i put kojim gumb vodi ne mogu
   se raziĆi ako su isti izraz. (Do K2b su tri paralelna modela vraćanja i
   proizvela BUG-026 i BUG-027 — dva zapisa o istoj stvari.)

   ⚠️ NIŠTA OVDJE NE IDE KROZ `innerHTML`. Nazivi materijala su KORISNIČKI
   tekst, a mrvica je nova površina koja ga prikazuje. Umjesto da se oslanjamo
   na escape (granica #3, BUG-025), gradimo čvorove i pišemo u `textContent` —
   tekst tad ne može biti markup, pa nema što ni pobjeći.
   ═══════════════════════════════════════════════════════════════════════ */

/** Prijevod s rezervnim tekstom; `t()` vraća KLJUČ kad prijevoda nema. */
function _pt(key, fb) {
    if (typeof window.t === 'function') { const s = window.t(key); if (s && s !== key) return s; }
    return fb;
}

/** Naziv predmeta iz karte koja pokriva OBA izvora — katalog i `node:` materijale. */
function _nazivPredmeta(id) {
    if (typeof subjectDataMap === 'undefined' || !id) return '';
    const s = subjectDataMap[id];
    return (s && s.name) ? s.name : '';
}

function _nazivLekcije(subjectId, lessonId) {
    if (typeof subjectDataMap === 'undefined' || !subjectId || !lessonId) return '';
    const s = subjectDataMap[subjectId];
    if (!s || !Array.isArray(s.lessons)) return '';
    const l = s.lessons.find((x) => x && x.id === lessonId);
    return (l && l.name) ? l.name : '';
}

/** Kako se stranica ZOVE u mrvici. Prazan naziv znači „preskoči" (nema što pokazati). */
function nazivStranice(page, nav) {
    switch (page) {
        case 'browse':    return _pt('topbar.subjects', 'Subjects');
        case 'materials': return _pt('materials.title', 'My materials');
        case 'profile':   return _pt('profile.title', 'My Profile');
        case 'about':     return _pt('topbar.about', 'About');
        case 'lessons':   return _nazivPredmeta(nav && nav.subject) || _pt('topbar.subject', 'Subject');
        case 'study':     return _nazivLekcije(nav && nav.subject, nav && nav.lesson)
                              || _nazivPredmeta(nav && nav.subject)
                              || _pt('topbar.study', 'Study');
        default:          return '';
    }
}

/**
 * Lanac predaka od korijena do TRENUTNE stranice. Penje se `roditeljOd()`-om i staje na
 * landingu — landing je znak u traci, ne mrvica. Ograničeno na 8 koraka: hijerarhija je
 * duboka najviše 3, pa je sve preko toga ciklus, a ciklus ovdje ne smije zamrznuti stranicu.
 */
function lanacMrvica(page, nav) {
    const lanac = [];
    let p = page;
    let straza = 0;
    while (p && p !== 'landing' && straza < 8) {
        lanac.unshift(p);
        const r = roditeljOd(p, nav);
        p = r ? r.page : 'landing';
        straza += 1;
    }
    return lanac;
}

/** Kamo vodi klik na mrvicu — isti opis rute koji `navigateTo` očekuje. */
function _odredisteMrvice(page, nav) {
    if (page === 'lessons') return { page: 'lessons', data: { subject: (nav && nav.subject) || '' } };
    return { page: page, data: {} };
}

/**
 * T2 — DUBINA KATALOGA U MRVICI. Do T2 je katalog u traci imao jednu jedinu mrvicu
 * („Predmeti"), dok je pravi položaj (fakultet › smjer › godina) živio u zaglavlju
 * stranice. Bila su to **dva prikaza istog puta na istom ekranu**, u različitoj mjeri
 * detalja — a zaglavlje je za to trošilo 140 px, odnosno 54 % iPhonea SE zajedno s
 * trakom i putanjom. Sada put postoji **jednom**, i to ondje gdje mu je mjesto.
 *
 * Vraća stavke `{ naziv, razina }`; posljednja je uvijek trenutna razina.
 */
function _mrviceKataloga() {
    const korijen = { naziv: _pt('topbar.subjects', 'Subjects'), razina: 'faculties' };
    if (typeof SokratCatalog === 'undefined' || typeof browseState === 'undefined' || !browseState) return [korijen];

    const stavke = [korijen];
    const razina = browseState.level;
    if (razina === 'faculties') return stavke;

    // ⚠️ `shortName` prije `name`: puni pravni naziv fakulteta ima 65 znakova i u mrvicu
    // ne stane ni na jednom telefonu. Kartica fakulteta i dalje pokazuje pun naziv.
    const f = SokratCatalog.faculties().find((x) => x.id === browseState.facultyId);
    stavke.push({ naziv: (f && (f.shortName || f.name)) || _pt('browse.trail.faculty', 'Faculty'), razina: 'programs' });
    if (razina === 'programs') return stavke;

    const p = SokratCatalog.getProgram(browseState.programId);
    stavke.push({ naziv: (p && p.name) || _pt('browse.trail.program', 'Program'), razina: 'years' });
    if (razina === 'years') return stavke;

    stavke.push({
        naziv: _hr() ? (browseState.year + '. godina') : ('Year ' + browseState.year),
        razina: 'subjects'
    });
    return stavke;
}

/**
 * Nacrtaj drugi red. Zove se iz `navigateTo` NAKON što je stanje postavljeno, jer nazivi
 * (predmet, lekcija, materijal) dolaze iz stanja koje `navigateTo` tek upisuje.
 */
function renderPathbar() {
    const traka = document.getElementById('pathbar');
    const spremnik = document.getElementById('crumbs');
    if (!traka || !spremnik) return;

    const nav = (typeof AppState !== 'undefined' && AppState.nav) ? AppState.nav : {};
    const page = nav.page || 'landing';

    // Landing nema položaj — nema kamo „gore". Klasa gasi i visinu (`--pathbar-h: 0`),
    // pa sekcije ne oduzimaju prostor koji se ne crta.
    document.body.classList.toggle('no-pathbar', page === 'landing');
    document.body.classList.toggle('on-landing', page === 'landing');
    if (page === 'landing') { spremnik.textContent = ''; return; }

    // T2 — od lanca STRANICA do lanca STAVKI. Katalog se razmotava u svoje razine, ali
    // **samo dok smo NA njemu**: kad korisnik ode na lekciju ili u učenje, međurazine
    // (fakultet › smjer › godina) više nisu njegov položaj nego povijest putovanja, a
    // „Predmeti" ga i dalje vraćaju točno onamo gdje je stao (`browseState` se pamti).
    // Bez tog reza lanac bi na učenju imao ŠEST mrvica, koje se na 320 px svedu na niz
    // kvačica — a gate koji prijavljuje šum se isključi, kao i mrvica koju nitko ne čita.
    const stavke = [];
    lanacMrvica(page, nav).forEach((p) => {
        if (p === 'browse' && page === 'browse') {
            _mrviceKataloga().forEach((k) => {
                stavke.push({
                    naziv: k.naziv,
                    klik: () => { browseNaRazinu(k.razina); }
                });
            });
            return;
        }
        const naziv = nazivStranice(p, nav);
        if (!naziv) return;
        const cilj = _odredisteMrvice(p, nav);
        stavke.push({ naziv: naziv, klik: () => { navigateTo(cilj.page, cilj.data); } });
    });

    spremnik.textContent = '';

    stavke.forEach((s, i) => {
        const zadnji = i === stavke.length - 1;
        const naziv = s.naziv;
        if (!naziv) return;

        if (i > 0) {
            const sep = document.createElement('span');
            sep.className = 'crumb-sep';
            sep.setAttribute('aria-hidden', 'true');
            sep.textContent = '›';
            spremnik.appendChild(sep);
        }

        if (zadnji) {
            // Gdje JESMO — nije gumb, jer nema kamo voditi.
            const ovdje = document.createElement('span');
            ovdje.className = 'crumb crumb-current';
            ovdje.setAttribute('aria-current', 'page');
            ovdje.textContent = naziv;
            spremnik.appendChild(ovdje);
            return;
        }

        const gumb = document.createElement('button');
        gumb.type = 'button';
        gumb.className = 'crumb';
        gumb.textContent = naziv;
        gumb.addEventListener('click', s.klik);
        spremnik.appendChild(gumb);
    });

    // ⚠️ Mrvica se skrola vodoravno, a novi sadržaj dolazi ZDESNA — bez ovoga bi na uskom
    // ekranu ostala prikazana lijeva strana lanca (preci), dok je trenutna razina, jedina
    // koja odgovara na pitanje „gdje sam?", ostala izvan ekrana. Preci se doduše i stišću
    // (v. `.crumb` u topbar.css), ali ovo je druga brana za slučaj da ni to ne dostaje.
    spremnik.scrollLeft = spremnik.scrollWidth;

    // T2: označavanje odredišta u traci je OBRISANO jer traka više nema nijedno odredište
    // („Predmeti" su otišli 2026-08-19, „Moji materijali" u T2). `aria-current` je bio
    // vezan uz gumbe kojih nema; položaj sada nosi isključivo mrvica, koja `aria-current`
    // stavlja na svoju zadnju stavku.
}

/** Ožiči traku. Znak je jedini ulaz koji nema postojeću kuku. */
function initTopbar() {
    const dom = document.getElementById('topbarHome');
    if (dom) dom.addEventListener('click', (e) => { e.preventDefault(); navigateTo('landing'); });

    const natrag = document.getElementById('pathbarBack');
    if (natrag) natrag.addEventListener('click', () => { goBack(); });
}

/**
 * Primjenjuje adresu na aplikaciju. `async` jer subjekt iz URL-a treba provjeriti.
 *
 * ⚠️ URL JE NEPOVJERLJIVIJI ULAZ OD `localStorage`-a, ne manje. Spremljena pozicija je
 * bar nekad bila valjana na ovom uređaju; adresa može imenovati **tuđi ili obrisan**
 * čvor jer ju je netko utipkao ili poslao. Zato ide kroz `isSubjectOpenable()` — isti
 * čuvar koji je zatvorio BUG-023.
 */
async function applyRoute(route) {
    if (!route) return false;
    const d = route.data || {};

    if (d.subject && !(await isSubjectOpenable(d.subject))) {
        // Nepoznat subjekt: ostani gdje jesi i očisti adresu, umjesto prazne stranice
        // koja izgleda kao da je gradivo nestalo (BUG-023).
        if (history && history.replaceState) history.replaceState(null, '', location.pathname + location.search);
        return false;
    }
    // Sekcija se provjerava po TIPKI KOJA POSTOJI, ne po prepisanom popisu — popis bi se
    // razišao sa sučeljem čim neki mod dođe ili ode (ADR-027).
    // ⚠️ Usporedbom preko `dataset`, NE sastavljanjem selektora: `d.section` dolazi iz
    // adrese, pa bi ulazio u niz selektora — isti razred kao tekst iz podataka u `innerHTML`.
    if (route.page === 'study' && d.section && d.section !== 'home') {
        const modovi = Array.prototype.slice.call(document.querySelectorAll('.study-nav-btn'));
        if (!modovi.some(function (b) { return b.dataset.section === d.section; })) d.section = 'home';
    }
    navigateTo(route.page, d);
    return true;
}

/** Vezuje „natrag"/„naprijed" i ručnu izmjenu adrese. */
function initRouter() {
    // `popstate` = sistemska gesta natrag/naprijed (uklj. Androidov gumb).
    window.addEventListener('popstate', function (e) {
        // ⚠️ Dubina se ČITA iz unosa, ne dekrementira brojačem: `popstate` okida i pri koraku
        // NAPRIJED, pa bi brojač nakon naprijed-natrag lagao i „natrag" bi počeo izlaziti
        // sa stranice. Unos bez naše oznake = tuđi/početni → dubina 0.
        dubinaPovijesti = (e && e.state && typeof e.state.sokratDubina === 'number') ? e.state.sokratDubina : 0;
        const route = parseRoute(location.hash);
        // Golo sidro ili prazan hash u povijesti znači „bili smo na landingu".
        applyRoute(route || { page: 'landing', data: {} });
    });

    // `hashchange` = netko je adresu izmijenio rukom ili došao izvana. Vlastiti upisi
    // idu kroz `pushState`/`replaceState`, koji ovo NE okidaju.
    window.addEventListener('hashchange', function () {
        const route = parseRoute(location.hash);
        if (route) applyRoute(route);
    });
}

// ========== VLASTITO GRADIVO — ulazi (C0 / ADR-029) ==========

/**
 * Sve ulaze u vlastiti materijal veže JEDAN delegirani listener, jer se dio njih (gumb na profilu)
 * renderira `innerHTML`-om nakon što bi izravno vezivanje već prošlo.
 */
function initMaterialsEntries() {
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('[data-goto-materials]');
        if (!btn) return;
        e.preventDefault();
        navigateTo('materials');
    });

    const back = document.getElementById('backFromMaterials');
    if (back) {
        // K2a: ovdje je živjela petlja koju je Leon našao. `materialsReturnPage` je pamtio
        // dolazak IZ EDITORA, pa je „natrag" s police vraćao u editor iz kojeg si upravo izašao.
        back.addEventListener('click', function () { goBack(); });
    }

    const signIn = document.getElementById('materialsSignInBtn');
    if (signIn) {
        signIn.addEventListener('click', function () {
            if (typeof SokratAuth !== 'undefined') SokratAuth.openModal();
        });
    }

    // Otvaranje izravnim linkom i `hashchange` više NISU ovdje: od K1 to radi ruter za
    // sve stranice odjednom (`initRouter` + `restoreLastPosition`). Dvije kopije istog
    // posla razišle bi se čim ruta dobije segment.

    // Prijava/odjava dok je stranica otvorena mora prebaciti plohu (stablo ⇄ poziv na prijavu),
    // inače odjavljen korisnik gleda tuđe stablo do sljedeće navigacije.
    if (typeof SokratAuth !== 'undefined') {
        SokratAuth.onChange(function () {
            if (AppState.nav.page === 'materials' && window.SokratMaterials) SokratMaterials.renderPage();
        });
    }
}

// ========== SIDEBAR ==========
function openSidebar() {
    document.getElementById('subjectsSidebar').classList.add('active');
    document.getElementById('subjectsOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    document.getElementById('subjectsSidebar').classList.remove('active');
    document.getElementById('subjectsOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// Primarni (zadani) program za landing/sidebar showcase. Drugi programi (npr. HRV
// "hospitality-management-hr") dostupni su kroz Browse drill-down (program-svjestan),
// pa landing/sidebar pokazuju SAMO primarni → EN iskustvo ostaje nepromijenjeno, bez
// miješanja jezika. (UI i18n po aktivnom programu = kasniji korak; vidi docs/archive/HRV_PLAN.md.)
const PRIMARY_PROGRAM = 'hospitality-management';
function primarySubjects() {
    // placement-svjesno (U2.5): subjectsOf pokriva i legacy (programId) i placement[] predmete
    return (typeof SokratCatalog !== 'undefined')
        ? SokratCatalog.subjectsOf(PRIMARY_PROGRAM)
        : [];
}

/**
 * Svi predmeti do kojih posjetitelj MOŽE doći, kroz sve programe (Leon, 2026-08-09).
 *
 * Landing je dotad brojao samo primarni (EN) program → pisalo je 17, a platforma ih ima 22
 * (17 EN + 5 HR). HR predmeti su zaseban program (ADR-012, klon-program), ne prijevod u istom —
 * pa ih `subjectsOf(PRIMARY_PROGRAM)` nije vidio.
 *
 * Broji se preko programa, a ne `SOKRAT_CATALOG.subjects.length`, da predmet koji nije nigdje
 * smješten (pa mu se ne može doći) ne bi napuhao brojku. Deduplicira se po id-u jer isti predmet
 * smije stajati u više programa (vezni predmeti 1. godine, ADR-022).
 */
function allReachableSubjects() {
    if (typeof SokratCatalog === 'undefined' || typeof SOKRAT_CATALOG === 'undefined') return [];
    const seen = Object.create(null);
    const out = [];
    (SOKRAT_CATALOG.faculties || []).forEach((f) => {
        (f.programs || []).forEach((p) => {
            SokratCatalog.subjectsOf(p.id).forEach((s) => {
                if (s && s.id && !seen[s.id]) { seen[s.id] = true; out.push(s); }
            });
        });
    });
    return out;
}

// i18n kratice za dinamički renderirane stringove (browse/landing kartice)
function _t(key, fallback) { return (typeof t === 'function') ? t(key) : (fallback != null ? fallback : key); }
function _hr() { return typeof getUiLang === 'function' && getUiLang() === 'hr'; }
// jezično ispravna jedinica (1 vs množina)
function _unit(n, base) { return n + ' ' + _t('unit.' + base + (n === 1 ? '.1' : '.n')); }

// ========== SIDEBAR SUBJECT LIST (rendered from catalog) ==========
function renderSubjectsSidebar() {
    const list = document.getElementById('subjectsList');
    if (!list || typeof SOKRAT_CATALOG === 'undefined' || !Array.isArray(SOKRAT_CATALOG.subjects)) {
        return;
    }

    const esc = (s) => String(s == null ? '' : s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

    list.innerHTML = primarySubjects().map((s) => {
        const grad = (Array.isArray(s.iconGradient) && s.iconGradient.length === 2)
            ? s.iconGradient
            : [s.color, s.color];
        const lessonCount = (s.lessons || []).length;
        const lessonLabel = lessonCount === 1 ? 'Lesson' : 'Lessons';
        return `
                <div class="subject-item" data-subject="${esc(s.id)}">
                    <div class="subject-item-icon" data-ink="${inkForTint(grad[0])}" style="background: linear-gradient(135deg, ${esc(grad[0])}, ${esc(grad[1])});">
                        <i class="fas ${esc(s.icon)}"></i>
                    </div>
                    <div class="subject-item-info">
                        <h3>${esc(s.name)}</h3>
                        <p>${esc(s.description)}</p>
                        <div class="subject-item-meta">
                            <span><i class="fas fa-book"></i> ${lessonCount} ${lessonLabel}</span>
                        </div>
                    </div>
                    <i class="fas fa-chevron-right subject-arrow"></i>
                </div>`;
    }).join('');
}

// ========== BROWSE (drill-down: Faculty → Program → Year → Subject) ==========
// Sve se renderira IZ data/catalog.js. Dodavanjem fakulteta/smjera/godine/predmeta
// u catalog, kartice se AUTOMATSKI pojave — bez ikakve izmjene ovog koda.

let browseState = { level: 'faculties', facultyId: null, programId: null, year: null };

// HTML-escape (lokalni helper za browse renderere)
function browseEsc(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Pošten napredak po predmetu: best quiz score (0–100) iz spremljenog stanja.
function getSubjectProgress(storageKey) {
    try {
        const raw = localStorage.getItem(storageKey);
        if (!raw) return { started: false, bestScore: 0 };
        const p = JSON.parse(raw);
        const best = (Array.isArray(p.quizScores) && p.quizScores.length)
            ? Math.max(...p.quizScores) : 0;
        const started = best > 0
            || (Array.isArray(p.flashcardsLearned) && p.flashcardsLearned.length > 0)
            || (p.fillSolved > 0);
        return { started, bestScore: best };
    } catch (e) {
        return { started: false, bestScore: 0 };
    }
}

// Ulaz u browse: uvijek kreni od vrha drill-downa (Fakulteti).
function enterBrowse() {
    browseState = { level: 'faculties', facultyId: null, programId: null, year: null };
    navigateTo('browse');
}

/**
 * T2 — JEDAN ulaz za promjenu razine kataloga: stanje, prikaz i MRVICA idu zajedno.
 *
 * ⚠️ Postoji jer je od T2 dubina drill-downa vidljiva u gornjoj traci. Do tada je svaka
 * promjena razine zvala samo `renderBrowse()`, pa bi mrvica ostala na zatečenoj razini —
 * i opet bismo imali dva prikaza istog puta koji se razilaze, što je K2b već jednom
 * platio (dva modela vraćanja → BUG-026 i BUG-027). Ovdje su spojeni u izraz, ne u
 * dogovor: tko mijenja razinu, mijenja je kroz ovu funkciju.
 */
function browseNaRazinu(razina, podaci) {
    const p = podaci || {};
    const s = browseState;
    if (razina === 'faculties') {
        browseState = { level: 'faculties', facultyId: null, programId: null, year: null };
    } else if (razina === 'programs') {
        browseState = { level: 'programs', facultyId: (p.facultyId != null ? p.facultyId : s.facultyId), programId: null, year: null };
    } else if (razina === 'years') {
        browseState = { level: 'years', facultyId: s.facultyId, programId: (p.programId != null ? p.programId : s.programId), year: null };
    } else if (razina === 'subjects') {
        browseState = { level: 'subjects', facultyId: s.facultyId, programId: s.programId, year: (p.year != null ? Number(p.year) : s.year) };
    } else {
        return;
    }
    // F1/8 ②: kartice nove razine dolaze na mjesto starih, pod isti nepomični miš — Leonov
    // točan scenarij (fakultet → smjer → godina). Ovo NIJE `navigateTo` (stranica ostaje
    // `browse`), pa pauza mora stajati i ovdje; sonda `hover-probe --profil=prelaz` mjeri baš ovo.
    pauzirajHover();
    renderBrowse();
    if (typeof renderPathbar === 'function') renderPathbar();
}

// Back gumb na browse stranici: korak unatrag kroz hijerarhiju.
function browseBack() {
    switch (browseState.level) {
        case 'subjects': browseNaRazinu('years'); break;
        case 'years':    browseNaRazinu('programs'); break;
        case 'programs': browseNaRazinu('faculties'); break;
        default:
            // Vrhunska razina browsea nema svoj roditelj u drill-downu -> izlazi kroz
            // zajednicki model (povijest, pa landing).
            goBack();
    }
}

/* ── C4b · SKELA BROWSEA U UTILITYJIMA ──────────────────────────────────────────
   Nizovi su DOSLOVNI i stoje na jednom mjestu. Doslovni jer Tailwind skenira izvor
   kao tekst: ime sastavljeno u runtimeu nikad ne vidi, pa bi pravilo izostalo iz izlaza
   (ADR-028, granica #5, brana `check:tailwind` #1). Na jednom mjestu jer isti raspored crtaju ČETIRI renderera
   (fakultet · smjer · godina · predmet) — prije C4b je `browse-grid` bio napisan
   pet puta, pa bi utility-niz bio pet kopija koje se raziđu prvom izmjenom.

   ⚠️ Semantička imena (`browse-grid`, `browse-empty`, …) OSTAJU uz utilityje: gađa ih
   delegacija klika niže u ovoj datoteci i 23 tvrdnje u `tests/browse.spec.js`. C4b seli
   STIL, ne imena — inače bi suita pozelenjela zato što više ništa ne nalazi (spec §5). */
const BROWSE_GRID = 'browse-grid grid min-w-0 grid-cols-1 gap-3.5 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] sm:gap-4';
const BROWSE_SECTION_TITLE = 'browse-section-title mb-4 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.6px] text-ink-2 after:h-px after:flex-1 after:bg-line after:content-[\'\']';

function browseEmpty(msg) {
    return `<div class="browse-empty px-4 py-12 text-center text-ink-2"><i class="fas fa-inbox mb-3 text-3xl opacity-60"></i><p>${browseEsc(msg)}</p></div>`;
}

function renderFacultyCards() {
    const fs = SokratCatalog.faculties();
    if (!fs.length) return browseEmpty(_t('browse.empty.faculties', 'No faculties yet.'));
    return `<div class="${BROWSE_GRID}">` + fs.map(f => {
        const n = SokratCatalog.programsOf(f.id).length;
        return `
            <button type="button" class="browse-card" data-browse="faculty" data-id="${browseEsc(f.id)}">
                <div class="browse-card-top">
                    <div class="browse-card-icon"><i class="fas fa-building-columns"></i></div>
                    <div class="browse-card-headings">
                        <div class="browse-card-title">${browseEsc(f.name)}</div>
                    </div>
                </div>
                <div class="browse-card-meta"><span><i class="fas fa-graduation-cap"></i> ${n} ${n === 1 ? 'program' : 'programs'}</span></div>
                <i class="fas fa-chevron-right browse-card-arrow"></i>
            </button>`;
    }).join('') + `</div>`;
}

function renderProgramCards(facultyId) {
    const ps = SokratCatalog.programsOf(facultyId);
    if (!ps.length) return browseEmpty(_t('browse.empty.programs', 'No programs yet.'));
    return `<div class="${BROWSE_GRID}">` + ps.map(p => {
        const years = SokratCatalog.yearsOf(p.id).length;
        const subs = SokratCatalog.subjectsOf(p.id).length;
        return `
            <button type="button" class="browse-card" data-browse="program" data-id="${browseEsc(p.id)}">
                <div class="browse-card-top">
                    <div class="browse-card-icon"><i class="fas fa-graduation-cap"></i></div>
                    <div class="browse-card-headings">
                        <div class="browse-card-title">${browseEsc(p.name)}</div>
                    </div>
                </div>
                <div class="browse-card-meta">
                    <span><i class="fas fa-calendar-days"></i> ${_unit(years, 'year')}</span>
                    <span><i class="fas fa-book"></i> ${_unit(subs, 'subject')}</span>
                </div>
                <i class="fas fa-chevron-right browse-card-arrow"></i>
            </button>`;
    }).join('') + `</div>`;
}

function renderYearCards(programId) {
    const years = SokratCatalog.yearsOf(programId);
    if (!years.length) return browseEmpty(_t('browse.empty.years', 'No years yet.'));
    const ordinal = ['', '1st', '2nd', '3rd', '4th', '5th', '6th'];
    return `<div class="${BROWSE_GRID}">` + years.map(y => {
        const subs = SokratCatalog.subjectsOf(programId, y).length;
        const yearTitle = _hr() ? `${y}. godina` : `${ordinal[y] || (y + '.')} Year`;
        return `
            <button type="button" class="browse-card" data-browse="year" data-id="${y}">
                <div class="browse-card-top">
                    <div class="browse-card-icon is-year">${y}</div>
                    <div class="browse-card-headings">
                        <div class="browse-card-title">${yearTitle}</div>
                        <div class="browse-card-sub">${_t('browse.studyYear', 'Study year')} ${y}</div>
                    </div>
                </div>
                <div class="browse-card-meta"><span><i class="fas fa-book"></i> ${_unit(subs, 'subject')}</span></div>
                <i class="fas fa-chevron-right browse-card-arrow"></i>
            </button>`;
    }).join('') + `</div>`;
}

function subjectBrowseCard(s) {
    const grad = (Array.isArray(s.iconGradient) && s.iconGradient.length === 2)
        ? s.iconGradient : [s.color, s.color];
    const lessonCount = (s.lessons || []).length;
    const prog = getSubjectProgress(s.storageKey);
    const progressHtml = prog.started ? `
                <div class="browse-progress">
                    <div class="browse-progress-track"><div class="browse-progress-fill" style="width:${prog.bestScore}%"></div></div>
                    <span class="browse-progress-label">${prog.bestScore}%</span>
                </div>` : '';
    return `
            <button type="button" class="browse-card" data-browse="subject" data-id="${browseEsc(s.id)}" style="--card-accent:${browseEsc(grad[0])}">
                <div class="browse-card-top">
                    <div class="browse-card-icon" data-ink="${inkForTint(grad[0])}" style="background:linear-gradient(135deg, ${browseEsc(grad[0])}, ${browseEsc(grad[1])});">
                        <i class="fas ${browseEsc(s.icon)}"></i>
                    </div>
                    <div class="browse-card-headings">
                        <div class="browse-card-title">${browseEsc(s.name)}</div>
                        <div class="browse-card-sub">${_unit(lessonCount, 'lesson')}</div>
                    </div>
                </div>
                <div class="browse-card-desc">${browseEsc(s.description)}</div>
                ${progressHtml}
                <i class="fas fa-chevron-right browse-card-arrow"></i>
            </button>`;
}

function renderSubjectCards(programId, year) {
    const semesters = SokratCatalog.semestersOf(programId, year);
    if (!semesters.length) return browseEmpty(_t('browse.empty.subjects', 'No subjects yet.'));
    return semesters.map(sem => {
        const subs = SokratCatalog.subjectsOf(programId, year).filter(s => s.semester === sem);
        return `
            <section class="browse-section min-w-0">
                <h2 class="${BROWSE_SECTION_TITLE}">${_t('browse.semester', 'Semester')} ${sem}</h2>
                <div class="${BROWSE_GRID}">${subs.map(subjectBrowseCard).join('')}</div>
            </section>`;
    }).join('');
}

function renderBrowse() {
    if (typeof SokratCatalog === 'undefined') return;
    const grid = document.getElementById('browseGrid');
    const heading = document.getElementById('browseHeading');
    const intro = document.getElementById('browseIntro');
    if (!grid) return;

    // T2: `trail` se više ne ispisuje na stranici — položaj nosi mrvica u traci
    // (`_mrviceKataloga`). Varijabla je obrisana zajedno s `#browseBreadcrumb`; ostao je
    // samo `title`, koji je UPUTA („Odaberi smjer"), i seli u sadržaj gdje se smije
    // odskrolati.
    let html = '', title = '', introText = '';

    if (browseState.level === 'programs') {
        title = _t('browse.h.program', 'Choose your program');
        introText = _t('browse.i.program', 'Select your study program.');
        html = renderProgramCards(browseState.facultyId);
    } else if (browseState.level === 'years') {
        title = _t('browse.h.year', 'Choose your year');
        introText = _t('browse.i.year', 'Pick the study year you want to review.');
        html = renderYearCards(browseState.programId);
    } else if (browseState.level === 'subjects') {
        title = _hr() ? `Predmeti ${browseState.year}. godine` : `Year ${browseState.year} subjects`;
        introText = '';
        html = renderSubjectCards(browseState.programId, browseState.year);
    } else {
        // 'faculties' (default / entry)
        title = _t('browse.h.faculty', 'Choose your faculty');
        introText = _t('browse.i.faculty', 'Select your faculty to find your subjects.');
        html = renderFacultyCards();
    }

    if (heading) heading.textContent = title;
    if (intro) intro.textContent = introText;
    grid.innerHTML = html;
}

// Jedan delegirani click listener za sve browse kartice (veže se jednom).
function initBrowse() {
    const grid = document.getElementById('browseGrid');
    if (!grid || grid.dataset.bound === '1') return;
    grid.dataset.bound = '1';
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.browse-card');
        if (!card) return;
        const kind = card.dataset.browse;
        const id = card.dataset.id;
        if (kind === 'faculty') {
            browseNaRazinu('programs', { facultyId: id });
        } else if (kind === 'program') {
            browseNaRazinu('years', { programId: id });
        } else if (kind === 'year') {
            browseNaRazinu('subjects', { year: Number(id) });
        } else if (kind === 'subject') {
            navigateTo('lessons', { subject: id });
            return;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== LANDING META (dynamic counts from catalog) ==========
// Drži landing brojeve usklađene s catalog-om: dodavanjem predmeta broj raste sam.
function renderLandingMeta() {
    if (typeof SOKRAT_CATALOG === 'undefined' || !Array.isArray(SOKRAT_CATALOG.subjects)) return;
    // Cijela platforma, ne samo EN program — vitrina ispod i dalje prikazuje primarni program.
    const count = allReachableSubjects().length;
    document.querySelectorAll('[data-meta="subjectCount"]').forEach((el) => {
        el.textContent = count;
    });
    // Ukupan broj pitanja (autogeneriran u data/landing-stats.js → window.SOKRAT_STATS). Fallback: ostavi HTML tekst.
    const stats = (typeof window !== 'undefined') ? window.SOKRAT_STATS : null;
    if (stats && typeof stats.questionCount === 'number' && stats.questionCount > 0) {
        const label = stats.questionCount.toLocaleString('en-US') + '+';
        document.querySelectorAll('[data-meta="questionCount"]').forEach((el) => {
            el.textContent = label;
        });
    }
}

// ========== LANDING SUBJECTS SHOWCASE (rendered from catalog) ==========
// `inkForTint` + TINT_INK_CROSSOVER žive u `js/utils.js` (globalno, jedna definicija).
// Do učitavanja po ruti su bili u `js/blocks-renderer.js`, a ovdje je stajao prečac na
// njega — što je značilo da vitrina na landingu vuče CIJELI renderer prije prvog kadra
// zbog jedne čiste funkcije. Povijest, izvod praga i brana koja ga preračunava
// (`check:contrast`) žive uz definiciju.

// Stanje filtra vitrine. Živi ovdje, a ne u `AppState`, jer ne preživljava odlazak s
// landinga: vrati li se posjetitelj, katalog počinje otvoren — to je namjerno.
const landingFilter = { q: '', program: '' };   // '' = svi programi

function _pretraziv(s, q) {
    const polja = [s.name, s.shortName, s.description].filter(Boolean).join(' ').toLowerCase();
    return polja.includes(q);
}

/** Predmeti koje vitrina trenutno pokazuje, po filtru i tražilici (ravan popis). */
function filteredLandingSubjects() {
    const q = landingFilter.q.trim().toLowerCase();
    const base = landingFilter.program
        ? ((typeof SokratCatalog !== 'undefined') ? SokratCatalog.subjectsOf(landingFilter.program) : [])
        : allReachableSubjects();
    return q ? base.filter((s) => _pretraziv(s, q)) : base;
}

/**
 * Isti popis, ali GRUPIRAN PO PROGRAMU — samo kad nije odabran nijedan program.
 *
 * ⚠️ POVOD JE NALAZ KOJI SE VIDIO TEK NA RENDERIRANOJ STRANICI, ne u brojkama.
 * HR program je po ADR-012 KLON EN-a, pa ravna mreža od 24 stavlja „Management" i
 * „Menadžment", „Tourism Economics" i „Ekonomika turizma" jedno do drugoga — SEDAM
 * takvih parova. Posjetitelj tad ne vidi 24 predmeta nego 17 i sedam ponavljanja:
 * točno po brojci, krivo po dojmu. Naslov programa parovima daje razlog.
 *
 * Predmet ide u PRVI program koji ga sadrži (vezni predmeti 1. godine stoje u više
 * programa, ADR-022) — inače bi grupiranje vratilo duplikate koje dedup baš uklanja.
 */
function groupedLandingSubjects() {
    const q = landingFilter.q.trim().toLowerCase();
    if (landingFilter.program || typeof SokratCatalog === 'undefined') return null;

    const uzet = Object.create(null);
    const grupe = [];
    (SOKRAT_CATALOG.faculties || []).forEach((f) => (f.programs || []).forEach((p) => {
        const svoji = SokratCatalog.subjectsOf(p.id).filter((s) => {
            if (!s || !s.id || uzet[s.id]) return false;
            uzet[s.id] = true;
            return true;
        }).filter((s) => !q || _pretraziv(s, q));
        if (svoji.length) grupe.push({ id: p.id, name: p.name, subjects: svoji });
    }));
    // Jedan program = nema što grupirati; naslov bi bio šum.
    return grupe.length > 1 ? grupe : null;
}

/**
 * Gumbi filtra po programu — CRTANI IZ KATALOGA, nikad iz zakucanog popisa.
 *
 * Isti razlog zbog kojeg se broj predmeta ne piše rukom: doda li se treći program,
 * ova traka ga dobije sama. Do 2026-08-16 je HR postojao u katalogu i bio nedohvatljiv
 * s landinga, pa su vrata pisala 24 a mreža nudila 17.
 */
function renderCatalogPrograms() {
    const wrap = document.getElementById('catalogPrograms');
    if (!wrap || typeof SOKRAT_CATALOG === 'undefined') return;
    const programi = [];
    (SOKRAT_CATALOG.faculties || []).forEach((f) => (f.programs || []).forEach((p) => {
        const n = (typeof SokratCatalog !== 'undefined') ? SokratCatalog.subjectsOf(p.id).length : 0;
        if (n > 0) programi.push({ id: p.id, name: p.name, n: n });
    }));
    // Gumb „svi" nosi ukupan broj kroz sve programe — istu brojku koju piše i hero.
    const svi = allReachableSubjects().length;
    const tipke = [{ id: '', name: _t('cat.all', 'All'), n: svi }].concat(programi);
    wrap.innerHTML = tipke.map((p) => `
        <button type="button" class="cat-program" data-program="${browseEsc(p.id)}"
                aria-pressed="${p.id === landingFilter.program ? 'true' : 'false'}">
            <span class="cat-program-name">${browseEsc(p.name)}</span>
            <span class="cat-program-n">${browseEsc(p.n)}</span>
        </button>`).join('');
}

/** Jedna pločica predmeta. Boja i ikona dolaze iz podatka → sve kroz `browseEsc`. */
function landingSubjectCard(s) {
    const grad = (Array.isArray(s.iconGradient) && s.iconGradient.length === 2)
        ? s.iconGradient : [s.color, s.color];
    const lessonCount = (s.lessons || []).length;
    return `
        <button type="button" class="landing-subject-card" data-landing-subject="${browseEsc(s.id)}" style="--card-accent:${browseEsc(grad[0])}">
            <div class="landing-subject-icon" data-ink="${inkForTint(grad[0])}" style="background:linear-gradient(135deg, ${browseEsc(grad[0])}, ${browseEsc(grad[1])});">
                <i class="fas ${browseEsc(s.icon)}"></i>
            </div>
            <div class="landing-subject-info">
                <h3>${browseEsc(s.name)}</h3>
                <p>${_hr() ? `${browseEsc(s.year)}. godina` : `Year ${browseEsc(s.year)}`} &middot; ${_unit(lessonCount, 'lesson')}</p>
            </div>
            <i class="fas fa-arrow-right landing-subject-arrow" aria-hidden="true"></i>
        </button>`;
}

// ➕ POSLJEDNJA PLOČICA (§7.13). Puna mreža čita kao ZATVOREN POPIS — ta jedna
// isprekidana pločica jedina kaže da platforma nije popis, i to bez ijedne riječi
// marketinga. Ide IZA POSLJEDNJEG predmeta, nikad na fiksnu poziciju.
function landingMakeCard() {
    return `
        <button type="button" class="landing-subject-card landing-subject-card--make" data-goto-materials>
            <div class="landing-subject-icon landing-subject-icon--make" aria-hidden="true">
                <i class="fas fa-plus"></i>
            </div>
            <div class="landing-subject-info">
                <h3>${browseEsc(_t('cat.make.t', 'Your subject'))}</h3>
                <p>${browseEsc(_t('cat.make.d', 'Not on the list? Write it yourself.'))}</p>
            </div>
            <i class="fas fa-arrow-right landing-subject-arrow" aria-hidden="true"></i>
        </button>`;
}

function renderLandingSubjects() {
    const wrap = document.getElementById('landingSubjects');
    if (!wrap || typeof SOKRAT_CATALOG === 'undefined' || !Array.isArray(SOKRAT_CATALOG.subjects)) return;
    const lista = filteredLandingSubjects();
    const grupe = groupedLandingSubjects();
    // ＋ pločica se ne prikazuje dok tražilica filtrira: „nema rezultata za X" pa ponuda
    // da napraviš svoj predmet je odgovor na pitanje koje nitko nije postavio.
    const pokaziPlus = !landingFilter.q.trim();

    if (grupe) {
        wrap.innerHTML = grupe.map((g, i) => `
            <h3 class="cat-group">${browseEsc(g.name)}</h3>
            <div class="landing-subjects-grid">
                ${g.subjects.map(landingSubjectCard).join('')}
                ${(pokaziPlus && i === grupe.length - 1) ? landingMakeCard() : ''}
            </div>`).join('');
    } else {
        wrap.innerHTML = `<div class="landing-subjects-grid">${
            lista.map(landingSubjectCard).join('') + (pokaziPlus ? landingMakeCard() : '')
        }</div>`;
    }

    const brojac = document.getElementById('catalogCount');
    if (brojac) {
        brojac.textContent = lista.length
            ? (landingFilter.q.trim() ? _unit(lista.length, 'subject') : '')
            : _t('cat.none', 'No subject matches that.');
    }
    // ⚠️ OVDJE SE NE SMIJE ZVATI `applyTranslations()`. Ona na kraju sama zove
    // `renderCatalogPrograms()` i `renderLandingSubjects()` (jer liste crtane preko
    // innerHTML ne hvataju `[data-i18n]`) → poziv odavde je IZRAVNA MEĐUSOBNA REKURZIJA
    // i ruši stranicu s „Maximum call stack size exceeded" pri svakom tipkanju u
    // tražilicu. Zato sav tekst ovdje ide kroz `_t()` inline, kao i ostale kartice.
}

// Delegirani click za showcase kartice (veže se jednom) → otvori lekcije predmeta.
function initLandingSubjects() {
    const wrap = document.getElementById('landingSubjects');
    if (wrap && wrap.dataset.bound !== '1') {
        wrap.dataset.bound = '1';
        wrap.addEventListener('click', (e) => {
            // ＋ pločica ide u vlastito gradivo; `data-goto-materials` hvata globalni
            // rukovatelj, pa je ovdje samo propuštamo dalje.
            if (e.target.closest('[data-goto-materials]')) return;
            const card = e.target.closest('[data-landing-subject]');
            if (!card) return;
            navigateTo('lessons', { subject: card.dataset.landingSubject });
        });
    }

    const trazilica = document.getElementById('catalogSearch');
    if (trazilica && trazilica.dataset.bound !== '1') {
        trazilica.dataset.bound = '1';
        trazilica.addEventListener('input', () => {
            landingFilter.q = trazilica.value || '';
            renderLandingSubjects();
        });
    }

    const programi = document.getElementById('catalogPrograms');
    if (programi && programi.dataset.bound !== '1') {
        programi.dataset.bound = '1';
        programi.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-program]');
            if (!btn) return;
            landingFilter.program = btn.dataset.program || '';
            renderCatalogPrograms();
            renderLandingSubjects();
        });
    }
}

// ========== HERO: ŽIVI PRIKAZ (C2) ==========
// ŽIVI PRIKAZ U HEROJU JE OBRISAN (spec §7.13, 2026-08-15).
//
// Leon ga je odbio kad ga je vidio: „samo uđeš na landing i vidiš tutorial kako se
// rade materijali je bez veze." Kvar nije bio u izvedbi nego u REDOSLIJEDU — hero je
// tražio od posjetitelja da RADI prije nego mu je dan razlog da mu je stalo.
//
// S njim su otišle i `landingT()` (nitko je više ne zove) te sve `demo.*` i18n-poruke.
// ⚠️ Ako se ikad vrati BILO KAKAV unos posjetitelja na landing, vraća se i pravilo koje
// je ovdje vrijedilo: NIJEDAN `innerHTML`, samo `textContent`/`createElement`. To je
// jače od escapea — BUG-025 se dogodio točno ondje gdje je escape izostao.

// ========== LESSONS PAGE ==========
function renderLessonsPage(subjectId) {
    const subject = subjectDataMap[subjectId];
    if (!subject) return;

    document.getElementById('currentSubjectTitle').textContent = subject.name;
    document.getElementById('subjectDescription').textContent = subject.description;

    // P1 (POLICA): „skini ovaj predmet na uređaj". Montira se pri SVAKOM renderu jer
    // stanje ovisi o UREĐAJU, ne o predmetu — isti predmet je na jednom telefonu skinut,
    // na drugom nije. Modul se tiho ne montira ako preglednik nema Cache Storage.
    // Od učitavanja po ruti stiže sa svojim paketom; kontrola se docrta kad stigne, a
    // popis lekcija se zbog nje ne čeka.
    SokratLoad.paket('polica').then(function () {
        if (window.SokratOffline) window.SokratOffline.mount(document.getElementById('offlineControl'), subjectId);
    }).catch(function (e) { console.warn('[loader]', e); });

    const grid = document.getElementById('lessonsGrid');
    grid.innerHTML = '';

    subject.lessons.forEach((lesson, index) => {
        // Data-driven: lekcija bez mapiranja u catalog.content.resolve = coming soon.
        const isComingSoon = (typeof SokratCatalog !== 'undefined')
            ? SokratCatalog.isLessonComingSoon(subjectId, lesson.id)
            : (lesson.id === 'second-midterm');

        // ── BUG-032 ───────────────────────────────────────────────────────────────────
        // Kartica je do 2026-08-24 bila `<div>` sa slušačem klika: tipkovnica je nije mogla
        // fokusirati, čitač ekrana ju je čitao kao običan tekst, a ovo je JEDINI put u svaku
        // lekciju kataloga. Nijedna brana to nije vidjela jer sve traže KONTROLU — a kvar je
        // bio u tome što kontrole nema (phone-brana je zato `lessons` prijavljivala kao ekran
        // bez ijedne dohvatljive kontrole, tvrdnja ④).
        //
        // ELEMENT SLIJEDI POSLJEDICU, ne izgled: lekcija koja se DA otvoriti je `<a>` s pravom
        // adresom (K1 joj ju je već dao, pa je i dijeljiva i otvoriva u novoj kartici), a ona
        // koja se ne da nije poveznica nego `<button>` — ne vodi nikamo, nego objašnjava zašto.
        // Klik se presreće, kao kod loga u traci: `navigateTo` mora ostati jedini upisivač
        // povijesti, inače `dubinaPovijesti` (K2a) prestane vrijediti.
        const card = document.createElement(isComingSoon ? 'button' : 'a');
        card.className = 'lesson-card' + (isComingSoon ? ' lesson-card--soon' : '');
        if (isComingSoon) card.type = 'button';
        else card.href = routeFor('study', { subject: subjectId, lesson: lesson.id, section: 'home' });

        // ⚠️ Tekst iz podataka ide kroz `textContent`, ne kroz `innerHTML`. Escape (BUG-025)
        // ovdje time ne treba jer se opasnost NE MOŽE pojaviti — to je jača obrana od ispravnog
        // escapea, koji vrijedi dok ga se netko sjeti pozvati.
        const num = document.createElement('div');
        num.className = 'lesson-number';
        num.textContent = String(index + 1);

        const info = document.createElement('div');
        info.className = 'lesson-info';
        const naslov = document.createElement('h3');
        naslov.textContent = lesson.name || '';
        const opis = document.createElement('p');
        opis.textContent = lesson.description || '';
        info.appendChild(naslov);
        info.appendChild(opis);

        // Strelica/sat su UKRAS — ime kontrole ih ne smije sadržavati.
        const strelica = document.createElement('i');
        strelica.className = (isComingSoon ? 'fas fa-clock' : 'fas fa-chevron-right') + ' lesson-arrow';
        strelica.setAttribute('aria-hidden', 'true');

        card.appendChild(num);
        card.appendChild(info);
        card.appendChild(strelica);

        if (isComingSoon) {
            // Stanje mora ući u IME kontrole: toast objašnjava tek POSLIJE klika, a odluka
            // „vrijedi li mi ovo otvoriti" pada prije njega. Vidljivo je ionako (sat + prigušenje).
            const oznaka = document.createElement('span');
            oznaka.className = 'visually-hidden';
            oznaka.textContent = ' (' + (window.t ? t('lesson.comingSoonBadge') : 'coming soon') + ')';
            card.appendChild(oznaka);
            card.addEventListener('click', () => {
                showToast(window.t ? t('toast.comingSoon') : 'Second Midterm is coming soon.');
            });
        } else {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo('study', { subject: subjectId, lesson: lesson.id });
            });
        }
        grid.appendChild(card);
    });
}

// ========== STUDY PAGE INIT ==========
function showStudyLoading(on) {
    const el = document.getElementById('studyLoading');
    if (el) el.hidden = !on;
}

// Show/hide a paired (desktop + mobile) nav button.
function setNavButtonVisible(navId, mobileId, visible) {
    [navId, mobileId].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (visible) el.style.removeProperty('display');
        else el.style.display = 'none';
    });
}

// Data-driven optional sections: show a subject's special tabs based on its catalog
// `features` flags (e.g. blindMap for Geography, exercises for Accounting). Adding a
// flag in data/catalog.js is all it takes — no per-subject code here.
function applyFeatureNav(subjectId) {
    // M2: osobni materijal NIJE u katalogu → `getSubject` bi vratio null i tabovi bi se sakrili
    // slučajno. Radimo to NAMJERNO: vježbe su kôd i u osobnom materijalu ih nema (ADR-025 §1),
    // a slijepa karta je vezana uz katalog-asset. Sučelje ne smije nuditi ono što ne postoji.
    const meta = (typeof subjectDataMap !== 'undefined') ? subjectDataMap[subjectId] : null;
    if (meta && meta._node) {
        setNavButtonVisible('blindMapNavBtn', 'blindMapMobileBtn', false);
        setNavButtonVisible('exercisesNavBtn', 'exercisesMobileBtn', false);
        return;
    }
    const subject = (typeof SokratCatalog !== 'undefined') ? SokratCatalog.getSubject(subjectId) : null;
    const features = (subject && subject.features) || {};
    setNavButtonVisible('blindMapNavBtn', 'blindMapMobileBtn', !!features.blindMap);
    setNavButtonVisible('exercisesNavBtn', 'exercisesMobileBtn', !!features.exercises);
}

async function initStudyPage(subjectId, lessonId, targetSection) {
    const subject = subjectDataMap[subjectId];
    if (!subject) {
        console.error('Subject not found:', subjectId);
        return;
    }

    // Lazy-load kroz ContentRepository (S1, Faza 2): jedan poziv `loadLesson` objedini
    // učitavanje (catalog zna koje datoteke) + resolve u podatkovni objekt. Repo je šav
    // prema backendu/CRUD-u. FALLBACK na stari dvokorak ako Repo nije prisutan (skripta padne).
    let fullData = {};
    showStudyLoading(true);
    try {
        // Načini učenja stižu TEK SADA (v. `js/loader.js`): posjetitelj koji nikad ne otvori
        // lekciju ih ne plaća prvim kadrom. Stoji unutar istog `try` kao i dohvat sadržaja
        // jer je posljedica ista — lekcija se ne može prikazati — pa i poruka mora biti ista.
        await SokratLoad.paket('study');
        initLearnImageModal();      // idempotentno; do učitavanja po ruti ga je zvao init.js
        if (subject._node) {
            await SokratLoad.paket('materials');    // vlasnik toka stiže sa svojim paketom
            // M2 — OSOBNI MATERIJAL. Sadržaj traži vlasnik toka (`SokratMaterials`), ne katalog-repo:
            // svjetovi se namjerno ne miješaju (ADR-024), pa dual-read ostaje čist za katalog.
            // Nema fallbacka i ne treba ga — materijal postoji samo u bazi.
            fullData = await SokratMaterials.loadNodeContent(subject._nodeId);
        } else if (typeof SokratContent !== 'undefined' && SokratContent.loadLesson) {
            fullData = await SokratContent.loadLesson(subjectId, lessonId);
        } else {
            if (typeof loadSubjectContent === 'function') await loadSubjectContent(subjectId);
            fullData = getSubjectData(subjectId, lessonId);
        }
    } catch (e) {
        showStudyLoading(false);
        console.error(e);
        if (typeof showToast === 'function') showToast(window.t ? t('toast.loadError') : 'Could not load this subject. Please try again.');
        return;
    }
    showStudyLoading(false);

    // BUG-053: `nav.data` puni SAMO `getStudyData` — samo lekcije, svaka s nizovima (meta-ključ v2
    // dokumenta i lekcija bez `quiz` ne smiju doći ni do jednog načina učenja).
    const subjectLessonMap = lessonCategoryMap[subjectId];
    AppState.nav.data = getStudyData(fullData, subjectLessonMap && subjectLessonMap[lessonId]);

    // K2b: `#studyBreadcrumb` je obrisan — pisao je „Predmet > Lekcije" dok je globalni
    // drugi red već crtao `Predmeti › Predmet › Lekcija`, i to kao NAVIGACIJU, a ovaj je
    // bio samo tekst. Naslov lekcije ostaje: to je naslov STRANICE, ne putanja.
    document.getElementById('currentLessonTitle').textContent = subject.lessons.find(l => l.id === lessonId)?.name || (window.t ? t('lesson.fallback') : 'Lesson');

    loadProgress();
    loadAnalytics();

    initNavigation();
    updateCategoryButtons();
    updateLearnFilters();

    // ⚠️ RESET SVIH STUDY POD-MODOVA NA UČITAVANJU LEKCIJE.
    // Study-stranica je JEDAN dijeljeni DOM za sve lekcije/predmete (isti #quizGame,
    // #flashcard, #fill… + globalni AppState). Ako novi mod ne resetira svoje stanje I
    // svoj vidljivi panel, sadržaj prethodne lekcije PROCURI (BUG-020: kviz je ostajao
    // od prošlog predmeta). Svaki NOVI study-mod OBAVEZNO dodaje svoj reset OVDJE.
    updateQuizCategories();  // napuni dropdown kategorija za novi predmet
    resetQuiz();             // + očisti stanje/panel kviza (bila rupa → BUG-020)
    initFlashcards();        // reset deck/index/known/unknown
    initFill();              // reset pitanja/index/correct/wrong

    renderLearnContent();
    renderProgressPage();
    updateHomeStats();

    // Data-driven optional tabs (blind map, exercises, …) from catalog `features`.
    applyFeatureNav(subjectId);

    switchSection(targetSection || 'home');
}

// ========== SECTION SWITCHING ==========
/* Gumbi koji su nosili `onclick="fn()"` atribut sad nose `data-action="fn"` (+ `data-arg`
   za jedini parametrizirani slučaj, težinu slijepe karte): CSP (blok D) zabranjuje on*
   atribute. Bijela lista je ZATVOREN skup — `data-action` NIJE generički most do
   `window[ime]`, inače bi svaki ubačeni atribut u sadržaju postao poziv proizvoljne
   globalne funkcije (ista klasa rupe kao BUG-025). Delegirano na `document` jer se dio
   gumba (npr. quiz-setup) renderira `innerHTML`-om nakon što bi izravno vezivanje prošlo. */
const INLINE_ACTIONS = new Set([
    'startQuiz', 'startQuickQuiz', 'startFlashcards', 'startLearning', 'showQuizSetup',
    'showAboutUs', 'retryQuiz', 'resetProgress', 'quizPrev', 'quizNext',
    'submitMapAnswer', 'skipMapQuestion', 'clearMapSelection', 'setBlindMapDifficulty'
]);
/* toggleUiLang NIJE ovdje: editor.html nema navigation.js (ruter pripada aplikaciji),
   pa jezični gumb veže i18n.js — koji je na objema stranicama. Da stoji na oba mjesta,
   klik na indexu bi togglao dvaput = neto ništa. */
document.addEventListener('click', function (e) {
    const el = e.target instanceof Element ? e.target.closest('[data-action]') : null;
    if (!el) return;
    const name = el.getAttribute('data-action');
    if (!INLINE_ACTIONS.has(name)) return;
    const fn = window[name];
    if (typeof fn !== 'function') return;
    e.preventDefault();
    const arg = el.getAttribute('data-arg');
    if (arg !== null) fn(arg); else fn();
});

function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            switchSection(section);
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            syncMobileNav(section);
        });
    });

    const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
    mobileNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            switchSection(section);
            mobileNavBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            navBtns.forEach(b => {
                b.classList.toggle('active', b.dataset.section === section);
            });
        });
    });
}

function syncMobileNav(section) {
    document.querySelectorAll('.mobile-nav-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.section === section);
    });
}

function switchSection(section) {
    if (!AppState.nav.subject) {
        showSubjectSelector();
        return;
    }

    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

    const targetSection = document.getElementById(section);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    AppState.nav.section = section;

    // AKTIVACIJA: ovo je jedino grlo kroz koje se ulazi u SVAKI nacin ucenja, pa je i jedino
    // mjesto gdje se mjeri razlika izmedu „dosao na stranicu" i „poceo uciti". Tiho bez
    // pristanka na kolacice; sto se salje i zasto stoji u `js/consent.js` (SokratMetrika).
    if (window.SokratMetrika) {
        SokratMetrika.dogadaj('ucenje', { nacin: section, predmet: AppState.nav.subject });
    }

    document.querySelectorAll('.study-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === section);
    });
    document.querySelectorAll('.study-mobile-nav .mobile-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === section);
    });

    saveCurrentPosition(AppState.nav.page, { subject: AppState.nav.subject, lesson: AppState.nav.lesson });
    syncSectionRoute();   // K1: mod je dio adrese → dijeljen link vodi točno u taj mod
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (section === 'flashcards') {
        initFlashcards();
    } else if (section === 'fill') {
        initFill();
    } else if (section === 'progress') {
        renderProgressPage();
    } else if (section === 'learn') {
        cleanupLearnContentForMobile();
    } else if (section === 'blind-map') {
        // Slijepu kartu i vježbe ima SAMO dio predmeta (catalog `features`), pa im kod stiže
        // tek kad se otvori njihov tab. Panel je već vidljiv (gore), učitavanje je kratko i
        // jednokratno — a pad se vidi kao poruka, ne kao prazan tab koji nikad ne oživi.
        // ⚠️ MORA biti omotano u funkciju. `.then(initBlindMap)` izgleda jednako, ali ime se
        // razriješi ODMAH — a tada skripta koja ga definira još nije stigla, pa je to
        // ReferenceError, ne odgođeni poziv. (Uhvaćeno dim-testom pri samoj selidbi.)
        SokratLoad.paket('blind-map').then(function () { initBlindMap(); }).catch(pakerPao);
    } else if (section === 'exercises') {
        SokratLoad.paket('exercises')
            .then(function () { if (typeof initExercises === 'function') initExercises(); })
            .catch(pakerPao);
    }
}

/** Paket nije stigao (mreža/CDN) — jedina poruka koju korisnik može iskoristiti je „probaj opet". */
function pakerPao(e) {
    console.error(e);
    if (typeof showToast === 'function') showToast(window.t ? t('toast.loadError') : 'Could not load this subject. Please try again.');
}

// ========== ABOUT US ==========
function showAboutUs() {
    navigateTo('about');
}

function hideAboutUs() {
    navigateTo('landing');
}

// Legacy compatibility
function selectSubject(subject) {
    navigateTo('lessons', { subject: subject });
}

function showSubjectSelector() {
    navigateTo('landing');
}

// Global exports
window.selectSubject = selectSubject;
window.showSubjectSelector = showSubjectSelector;
window.showAboutUs = showAboutUs;
window.hideAboutUs = hideAboutUs;
window.navigateTo = navigateTo;
window.openSidebar = openSidebar;
window.closeSidebar = closeSidebar;
window.switchSection = switchSection;
window.renderSubjectsSidebar = renderSubjectsSidebar;
window.renderBrowse = renderBrowse;
window.enterBrowse = enterBrowse;
window.browseBack = browseBack;
window.goBack = goBack;   // K2a — jedini „natrag“ u aplikaciji
window.initTopbar = initTopbar;       // K2b
window.renderPathbar = renderPathbar; // K2b — i18n ga zove pri promjeni jezika (mrvica je prevedena)
window.roditeljOd = roditeljOd;       // K2b — brana dohvatljivosti (K3) mjeri hijerarhiju, ne gumbe
window.initBrowse = initBrowse;
window.renderLandingMeta = renderLandingMeta;
window.renderLandingSubjects = renderLandingSubjects;
window.renderCatalogPrograms = renderCatalogPrograms;
window.initLandingSubjects = initLandingSubjects;
