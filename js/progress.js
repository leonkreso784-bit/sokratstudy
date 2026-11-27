// ===== SOKRAT STUDY — PROGRESS & HOME STATS =====

// BUG-025: naziv, ikona i boja sekcije ovdje ulaze u `innerHTML`, a u osobnom materijalu ih zadaje
// KORISNIK. Sve tri idu kroz jednu definiciju iz `blocks-renderer.js` (ADR-027), svaka po svojoj
// vrsti: tekst se escapa · ikona se PROVJERAVA (ide u `class`) · boja ide kroz `accentFrom`, isti
// filtar `#rrggbb` koji već čuva akcente kartica/kviza/dopuna — nevaljano vrati prazno, pa se stil
// jednostavno izostavi umjesto da nešto proizvoljno završi u `style`.
function pEsc(s) {
    return (window.SokratBlocks && typeof SokratBlocks.esc === 'function') ? SokratBlocks.esc(s) : '';
}
function pIcon(s) {
    return (window.SokratBlocks && typeof SokratBlocks.safeIcon === 'function') ? SokratBlocks.safeIcon(s) : 'fa-book';
}
function pColor(s) {
    return (window.SokratBlocks && typeof SokratBlocks.accentFrom === 'function') ? SokratBlocks.accentFrom([s]) : '';
}
/**
 * Koja tinta ide NA ploču u boji kategorije. `inkForTint` živi u `js/utils.js` kao globalna
 * funkcija (klasična skripta, `function` na vrhu datoteke) i učitava se prije ove — od
 * učitavanja po ruti ondje, a ne u rendereru, jer ju traži i landing koji renderer ne dobiva.
 * Vraća SAMO 'dark' ili 'light' — dvije vrijednosti, pa u markup ne može ući ništa iz podatka.
 * ⚠️ Do C5a/4 je boja kategorije bila boja TEKSTA glifa i davala 2.15–2.80 na svijetloj plohi
 * (prag 3.0) — imenovana iznimka u `scripts/contrast-live-allow.json`. Otkad je glif ČIP,
 * boja je ISPUNA, a tinta se računa; iznimka je time ugašena, ne prešućena.
 */
function pInk(boja) {
    return (typeof inkForTint === 'function') ? inkForTint(boja) : 'light';
}

// ── AKTIVNA KATEGORIJA (BUG-056) ───────────────────────────────────────────────
//
// `AppState.nav.category` se do ovog popravka ZAPISIVAO na dva mjesta (klik ispod i obnova
// pozicije u `navigation.js`), a čitalo ga NIJE NIŠTA — ni Learn, ni kviz, ni kartice, ni
// dopune. JSDoc u `js/app-state.js` ga od početka zove „Aktivni filter kategorije": žica je
// bila projektirana, samo nikad spojena. Toast je bio jedina povratna informacija, pa je
// obećavao izbor koji nijedan sljedeći ekran nije poštovao.
//
// Vraća `null` umjesto 'all' kad filtra nema — pozivatelj time ne mora poznavati dogovorenu
// vrijednost, nego samo „ima filtra / nema ga".
function aktivnaKategorija() {
    const nav = (typeof AppState !== 'undefined') ? AppState.nav : null;
    const k = nav && nav.category;
    if (!k || k === 'all') return null;
    // Izbor se pamti po PREDMETU i preživi 24 h (`restoreLastPosition`), a kategorije su po
    // LEKCIJI — isti ključ u drugoj lekciji ne mora postojati. Bez ove provjere korisnik bi
    // se vratio u prazan špil bez ijednog traga zašto je prazan.
    return (nav.data && nav.data[k]) ? k : null;
}

/**
 * Gurni aktivnu kategoriju u SVA ČETIRI moda. Zove se s točno dva mjesta: iz klika na
 * karticu kategorije i s kraja `initStudyPage` (da obnovljeni izbor proradi i na hladan
 * ulaz). Zato svaki ulaz u mod — i Quick Start gumb i tab u traci — zatekne već točno
 * stanje, umjesto da svaki od njih zasebno pamti isto pravilo (ADR-027).
 */
function primijeniKategoriju(obnoviModove = true) {
    const kat = aktivnaKategorija();

    // Kartice i dopune: špil/pitanja se grade IZNOVA pa suze. ⚠️ Obnova je OBAVEZNA kad se
    // izbor MIJENJA — filtriranje zatečenog špila slagalo bi sužavanja jedno na drugo, pa bi
    // onaj tko jednom uđe s kategorijom A ostao na A i kad poslije uđe bez izbora. Špil se ne
    // bi imao odakle vratiti (isti razred curenja kao BUG-020).
    //
    // ⚠️ `obnoviModove = false` šalje SAMO `initStudyPage`: ondje su `initFlashcards()` i
    // `initFill()` upravo pozvani i oba sama čitaju `aktivnaKategorija()`, pa su špil i dopune
    // već točni — druga izgradnja bila bi isti posao dvaput po svakom otvaranju lekcije.
    if (obnoviModove) {
        if (typeof initFlashcards === 'function') initFlashcards();
        if (typeof initFill === 'function') initFill();
    }

    // Kviz: `select` JE vidljivi pokazatelj, a `startQuiz()` ga ionako čita — dovoljno je
    // postaviti vrijednost, bez drugog puta do istog podatka.
    const sel = document.getElementById('quizCategory');
    if (sel) sel.value = kat || 'all';

    // Learn: čipovi nose ŽIVI handler iz `renderLearnContent` (ona ih klonira i prevezuje,
    // pa onaj iz `updateLearnFilters` više nije na njima). Simulirani klik zato obavi i
    // `active` klasu i skrivanje kartica — jedan put umjesto dvostruke logike.
    const trazi = '.learn-filter .filter-btn[data-filter="' + (kat ? CSS.escape(kat) : 'all') + '"]';
    const cip = document.querySelector(trazi);
    if (cip) cip.click();
}

// ========== CATEGORY BUTTONS ==========
function updateCategoryButtons() {
    const container = document.querySelector('.categories');
    const content = AppState.nav.data;
    if (!container || !content) return;

    container.innerHTML = '';
    const kategorije = getCategories(content);

    // Što je STVARNO prikazano, ne što je zapisano: zastarjeli ključ iz prošle lekcije
    // `aktivnaKategorija()` svede na „sve", pa tada mora zasvijetliti kartica „Sve" —
    // inače ekran tvrdi da je suženo, a prikazuje cijelu lekciju.
    const efektivna = (typeof aktivnaKategorija === 'function' ? aktivnaKategorija() : null) || 'all';

    /** Jedna kartica izbora; `kljuc === 'all'` znači cijelu lekciju. */
    function dodajKarticu(kljuc, ime, ikona, broj) {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.dataset.category = kljuc;
        btn.innerHTML = `
            <i class="fas ${pIcon(ikona)}"></i>
            <span>${pEsc(ime)}</span>
            <small>${broj} terms</small>
        `;
        if (efektivna === kljuc) btn.classList.add('active');

        btn.addEventListener('click', () => {
            // Klik na VEĆ odabranu kategoriju je poništava — isti ishod kao klik na „Sve",
            // samo bez traženja pogledom.
            const bioAktivan = AppState.nav.category === kljuc;
            AppState.nav.category = (kljuc === 'all' || bioAktivan) ? 'all' : kljuc;

            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            const sad = AppState.nav.category;
            const aktivna = container.querySelector('.category-btn[data-category="' + CSS.escape(sad) + '"]');
            if (aktivna) aktivna.classList.add('active');

            primijeniKategoriju();

            if (sad === 'all') {
                showToast((typeof t === 'function') ? t('home.categoryOff') : 'All categories');
            } else {
                const nat = (typeof t === 'function') ? t('home.categoryOn') : 'Category:';
                showToast(nat + ' ' + ime);
            }
        });
        container.appendChild(btn);
    }

    // ⚠️ „Sve" je PRVA kartica i stoji UVIJEK (Leon, 27.11.): *„mora biti gumb i da se sve
    // može učit… ne može se ići na sve kao prije bez da se ne izlazi kompletno iz pripreme za
    // ispit"*. Poništavanje ponovnim klikom postoji od prve verzije ovog popravka, ali se NE
    // VIDI — a nevidljiv izlaz nije izlaz: tko suzi gradivo ostane bez puta natrag na cijelu
    // lekciju osim napuštanjem pripreme. Traka čipova u Učenju isti obrazac već ima.
    const ukupno = kategorije.reduce((n, k) => n + ((content[k].flashcards || []).length), 0);
    dodajKarticu('all', (typeof t === 'function') ? t('home.categoryAll') : 'All', 'fa-layer-group', ukupno);

    kategorije.forEach((category) => {
        const data = content[category];
        dodajKarticu(category, data.name, data.icon, (data.flashcards || []).length);
    });
}

// ========== LEARN FILTERS ==========
function updateLearnFilters() {
    const container = document.querySelector('.learn-filter');
    const content = AppState.nav.data;
    if (!container || !content) return;

    // Isti ključ kao kartica „Sve" na početnoj — ista odluka, pa i isti natpis na oba ekrana.
    const sveNatpis = (typeof t === 'function') ? t('home.categoryAll') : 'All';
    container.innerHTML = '';
    const sve = document.createElement('button');
    sve.className = 'filter-btn active';
    sve.dataset.filter = 'all';
    sve.textContent = sveNatpis;
    container.appendChild(sve);

    getCategories(content).forEach(category => {
        const data = content[category];
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.filter = category;
        // Puni naziv kategorije. Bar je overflow-x:auto + nowrap → dugi/višerječni
        // nazivi samo skrolaju vodoravno, ne lome layout. (Prije: skraćivanje na ~10
        // znakova davalo nečitljive čipove npr. "The Product" → "The".)
        btn.textContent = data.name;
        container.appendChild(btn);
    });
    
    container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            document.querySelectorAll('.learn-card').forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Scroll afordancije (BUG-007): vidljiv scrollbar + rubni fade; poravnanje lijevo kad bar prelazi.
    updateLearnFilterScrollHints();
    if (!container.dataset.scrollHintsBound) {
        container.dataset.scrollHintsBound = '1';
        container.addEventListener('scroll', updateLearnFilterScrollHints, { passive: true });
        // ResizeObserver hvata i prijelaz iz skrivenog (display:none) u vidljivo (mjere postanu stvarne).
        if (typeof ResizeObserver !== 'undefined') {
            new ResizeObserver(updateLearnFilterScrollHints).observe(container);
        } else {
            window.addEventListener('resize', updateLearnFilterScrollHints, { passive: true });
        }
    }
}

// Naznake skrola za learn filter-bar (BUG-007): koja strana ima još čipova izvan vidljivog.
// Postavlja klase is-scrollable / can-scroll-left / can-scroll-right (CSS: scrollbar + rubni fade).
function updateLearnFilterScrollHints() {
    const container = document.querySelector('.learn-filter');
    if (!container) return;
    const max = container.scrollWidth - container.clientWidth;
    const scrollable = max > 1;
    const x = container.scrollLeft;
    container.classList.toggle('is-scrollable', scrollable);
    container.classList.toggle('can-scroll-left', scrollable && x > 1);
    container.classList.toggle('can-scroll-right', scrollable && x < max - 1);
}

// ========== QUIZ CATEGORIES ==========
function updateQuizCategories() {
    const select = document.getElementById('quizCategory');
    const content = AppState.nav.data;
    if (!select || !content) return;

    select.innerHTML = '<option value="all">All Categories</option>';

    getCategories(content).forEach(category => {
        const data = content[category];
        const option = document.createElement('option');
        option.value = category;
        option.textContent = data.name;
        select.appendChild(option);
    });
}

// ========== PROGRESS PAGE ==========
function renderProgressPage() {
    const nav = AppState.nav;
    if (!nav.data) return;
    
    // BUG-047: napredak je po PREDMETU, špil po LEKCIJI — broji se presjek, inače naučeno u
    // midterm-2 napuhava postotak midterm-1 (a s pozicijama umjesto identiteta bilo je i gore).
    const spil = getAllFlashcards();
    const totalFlashcards = spil.length;
    const nauceno = new Set(progress.flashcardsLearned);
    const learned = spil.filter(c => nauceno.has(cardIdentity(c))).length;
    const overallPercent = Math.round((learned / totalFlashcards) * 100) || 0;
    
    document.getElementById('overallPercent').textContent = `${overallPercent}%`;
    document.getElementById('overallProgress').setAttribute('stroke-dasharray', `${overallPercent}, 100`);
    
    document.getElementById('flashcardsLearned').textContent = learned;
    document.getElementById('flashcardsTotal').textContent = totalFlashcards;
    document.getElementById('flashcardsProgress').style.width = `${overallPercent}%`;
    
    const avgScore = progress.quizScores.length > 0 
        ? Math.round(progress.quizScores.reduce((a, b) => a + b, 0) / progress.quizScores.length)
        : 0;
    document.getElementById('avgQuizScore').textContent = `${avgScore}%`;
    document.getElementById('totalQuizzes').textContent = progress.quizScores.length;
    
    const totalFills = AppState.fill.correct + AppState.fill.wrong;
    const fillAcc = totalFills > 0 ? Math.round((AppState.fill.correct / totalFills) * 100) : 0;
    document.getElementById('fillAccuracy').textContent = `${fillAcc}%`;
    document.getElementById('fillSolved').textContent = progress.fillSolved;
    
    // Blind Map progress — predmeti sa zastavicom `features.blindMap` (geography, geography-hr)
    const bmSubject = (typeof SokratCatalog !== 'undefined') ? SokratCatalog.getSubject(nav.subject) : null;
    if (bmSubject && bmSubject.features && bmSubject.features.blindMap) {
        const bmSection = document.getElementById('blindMapProgressSection');
        if (bmSection) {
            bmSection.style.display = 'block';
            // ⚠️ `blindMapState` je u DRUGOM paketu (`blind-map`), koji stiže tek kad se otvori
            // taj tab — a napredak se crta čim se otvori lekcija. Prazno stanje ovdje NIJE
            // izmišljena vrijednost nego doslovno ona s kojom modul i počinje, pa ploča
            // pokazuje isto što je pokazivala i prije selidbe: nule dok se ništa nije odgovorilo.
            const bm = (typeof blindMapState !== 'undefined') ? blindMapState : { answers: [], score: 0 };
            const bmAnswered = bm.answers.length;
            const bmCorrect = bm.answers.filter(a => a.correct).length;
            const bmAcc = bmAnswered > 0 ? Math.round((bmCorrect / bmAnswered) * 100) : 0;
            document.getElementById('blindMapAccuracy').textContent = `${bmAcc}%`;
            document.getElementById('blindMapAttempts').textContent = bmAnswered;
            document.getElementById('blindMapScore').textContent = bm.score;
        }
    } else {
        const bmSection = document.getElementById('blindMapProgressSection');
        if (bmSection) bmSection.style.display = 'none';
    }

    // Exercises progress (subjects with features.exercises) — reads the same
    // localStorage key the Exercises tab writes (<subject>-exercises-progress).
    const exSection = document.getElementById('exercisesProgressSection');
    if (exSection) {
        const exSubject = (typeof SokratCatalog !== 'undefined') ? SokratCatalog.getSubject(nav.subject) : null;
        const exVar = exSubject && exSubject.content && exSubject.content.exercises;
        const exData = (exVar && typeof window !== 'undefined') ? window[exVar] : null;
        const all = (exData && Array.isArray(exData.exercises)) ? exData.exercises : [];
        const list = all.filter((e) => !e.lesson || e.lesson === nav.lesson);
        if (list.length) {
            let store = {};
            try { store = JSON.parse(localStorage.getItem(nav.subject + '-exercises-progress') || '{}'); } catch (e) { store = {}; }
            let done = 0, attempts = 0, bestSum = 0;
            list.forEach((e) => {
                const p = store[e.id];
                if (p) { if (p.done) done++; attempts += (p.attempts || 0); bestSum += (p.best || 0); }
            });
            exSection.style.display = 'block';
            document.getElementById('exercisesDone').textContent = done;
            document.getElementById('exercisesTotal').textContent = list.length;
            document.getElementById('exercisesAttempts').textContent = attempts;
            document.getElementById('exercisesAvg').textContent = (list.length ? Math.round((bestSum / list.length) * 100) : 0) + '%';
        } else {
            exSection.style.display = 'none';
        }
    }

    const barsContainer = document.getElementById('categoryBars');
    if (!barsContainer || !nav.data) return;
    barsContainer.innerHTML = '';

    getCategories(nav.data).forEach(category => {
        const data = nav.data[category];
        const catProgress = progress.categoryProgress[category] || 0;
        
        const color = pColor(data.color);          // '' ako nije čist #rrggbb → stil se izostavi
        const bar = document.createElement('div');
        bar.className = 'category-bar flex items-center gap-3';
        bar.innerHTML = `
            <i class="fas ${pIcon(data.icon)} category-bar-icon"${color ? ` data-ink="${pInk(color)}" style="background: ${color}"` : ''}></i>
            <div class="category-bar-info flex-1">
                <span>
                    <strong>${pEsc(data.name)}</strong>
                    <span>${catProgress}%</span>
                </span>
                <div class="mini-progress h-1.5 rounded-[10px] overflow-hidden mt-2">
                    <div class="mini-fill" style="width: ${catProgress}%${color ? `; background: ${color}` : ''}"></div>
                </div>
            </div>
        `;
        barsContainer.appendChild(bar);
    });
}

// ========== HOME STATS ==========
function updateHomeStats() {
    const nav = AppState.nav;
    if (!nav.data) return;

    const totalQ = getAllFlashcards().length + getCategories(nav.data).reduce((acc, cat) => acc + (nav.data[cat].quiz || []).length, 0);
    document.getElementById('totalQuestions').textContent = `${totalQ}+`;

    document.getElementById('totalCategories').textContent = getCategories(nav.data).length;

    const subtitle = document.getElementById('homeSubtitle');
    const meta = currentSubjectMeta();   // BUG-023: nepoznat subjekt → ostavi zatečen naslov
    if (subtitle && meta && meta.name) {
        const guide = (typeof t === 'function') ? t('home.guideTo') : 'Your interactive guide to';
        subtitle.textContent = `${guide} ${meta.name}`;
    }
    
    const bestScore = progress.quizScores.length > 0 ? Math.max(...progress.quizScores) : 0;
    document.getElementById('bestScore').textContent = `${bestScore}%`;
    
    document.getElementById('streak').textContent = progress.streak;
}

// ========== QUICK START FUNCTIONS ==========
window.startQuickQuiz = function() {
    document.getElementById('questionCount').value = '10';
    // ⚠️ Ovdje je do BUG-056 stajalo `quizCategory.value = 'all'` — gumb je POIMENCE brisao
    // izbor koji je korisnik napravio dva reda iznad, na istom ekranu. Ništa ga ne mijenja:
    // `primijeniKategoriju()` je select već postavio pri kliku na kategoriju, a `startQuiz()`
    // ga čita. Kad kategorije nema, u selectu stoji 'all' — isto što je i prije bilo.
    switchSection('quiz');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-section="quiz"]').classList.add('active');
    startQuiz();
};

window.startFlashcards = function() {
    switchSection('flashcards');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-section="flashcards"]').classList.add('active');
};

window.startLearning = function() {
    switchSection('learn');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-section="learn"]').classList.add('active');
};

// ⚠️ `startFlashcards` i `startLearning` NAMJERNO ne spominju kategoriju: špil i čip su već
// suženi iz `primijeniKategoriju()`, koja je odradila posao u trenutku izbora. Da svaki od
// ovih gumba filtrira sam, isto bi pravilo stajalo na četiri mjesta — i tab u traci, koji
// ne prolazi kroz njih, opet ne bi poštovao izbor. To je bio cijeli BUG-056.

window.aktivnaKategorija = aktivnaKategorija;
window.primijeniKategoriju = primijeniKategoriju;
