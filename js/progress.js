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

// ========== CATEGORY BUTTONS ==========
function updateCategoryButtons() {
    const container = document.querySelector('.categories');
    const content = AppState.nav.data;
    if (!container || !content) return;

    container.innerHTML = '';

    getCategories(content).forEach(category => {
        const data = content[category];
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.dataset.category = category;
        btn.innerHTML = `
            <i class="fas ${pIcon(data.icon)}"></i>
            <span>${pEsc(data.name)}</span>
            <small>${data.flashcards ? data.flashcards.length : 0} terms</small>
        `;
        btn.addEventListener('click', () => {
            AppState.nav.category = category;
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showToast(`Category: ${data.name}`);
        });
        container.appendChild(btn);
    });
}

// ========== LEARN FILTERS ==========
function updateLearnFilters() {
    const container = document.querySelector('.learn-filter');
    const content = AppState.nav.data;
    if (!container || !content) return;

    container.innerHTML = '<button class="filter-btn active" data-filter="all">All</button>';

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
    document.getElementById('quizCategory').value = 'all';
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
