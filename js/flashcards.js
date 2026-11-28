// ===== SOKRAT STUDY — FLASHCARDS =====

let flashcardListenersInitialized = false;

function initFlashcards() {
    const cards = AppState.cards;
    // BUG-056: špil poštuje kategoriju odabranu na početnoj. Filtar se PREDAJE, ne čita se
    // ovdje iz stanja, jer isti `getAllFlashcards()` treba i napredak — a napredak je po
    // PREDMETU (BUG-047) i mora vidjeti sve kartice, ne samo odabranu kategoriju.
    cards.deck = getAllFlashcards(typeof aktivnaKategorija === 'function' ? aktivnaKategorija() : null);
    shuffleArray(cards.deck);
    cards.index = 0;
    cards.known = [];
    cards.unknown = [];

    resetSwipe();            // F1/9: špil se puni iznova → nijedna kartica ne smije ostati „u letu"
    updateFlashcard();
    updateFlashcardProgress();
    updateFlashcardStats();
    
    // Only add event listeners once to prevent duplicates
    if (!flashcardListenersInitialized) {
        document.getElementById('flashcard').addEventListener('click', flipCard);
        document.getElementById('btnPrev').addEventListener('click', prevCard);
        document.getElementById('btnNext').addEventListener('click', nextCard);
        document.getElementById('btnCorrect').addEventListener('click', markKnown);
        document.getElementById('btnWrong').addEventListener('click', markUnknown);
        initSwipe();         // F1/9: dodirna gesta (samo `pointerType === 'touch'`)
        initTipke();         // F1/9 ②: stolni pandan — strelice
        flashcardListenersInitialized = true;
    }
}

/**
 * Sve kartice lekcije, ili samo one jedne kategorije.
 * @param {string|null} [samoKategorija] ključ kategorije; izostavljeno/`null` = cijela lekcija.
 */
function getAllFlashcards(samoKategorija) {
    const content = AppState.nav.data;
    if (!content) return [];
    let all = [];
    getCategories(content).forEach(category => {
        if (samoKategorija && category !== samoKategorija) return;
        if (content[category] && content[category].flashcards && Array.isArray(content[category].flashcards)) {
            content[category].flashcards.forEach(card => {
                all.push({
                    ...card,
                    category: category,
                    categoryName: content[category].name,
                    // M3b: boja SEKCIJE putuje uz karticu — `card.color` (ako postoji) je pregazi.
                    catColor: content[category].color
                });
            });
        }
    });
    return all;
}

function flipCard() {
    // F1/9: povlačenje prstom zna završiti i `click`-om (preglednik ga pošalje poslije `pointerup`-a
    // na istom elementu) — taj klik je REP GESTE, ne „okreni". Zastavicu diže samo dodirna gesta;
    // sljedeći `pointerdown` je briše, pa klik koji nikad ne stigne ne može progutati idući dodir.
    if (swipe.progutajKlik) { swipe.progutajKlik = false; return; }
    document.getElementById('flashcard').classList.toggle('flipped');
}

/**
 * M3b — akcent kartice (ugovor: docs/product/UGC_SPEC.md §3).
 * Kartica bez svoje boje naslijedi boju sekcije; ni jedno ni drugo → svojstvo se UKLONI,
 * inače bi boja prethodne kartice ostala na sljedećoj (jedan te isti DOM za cijeli špil).
 * Validacija je u `SokratBlocks` — jedno mjesto istine za sve study-modove.
 */
function applyCardAccent(card) {
    const el = document.getElementById('flashcard');
    if (window.SokratBlocks && typeof SokratBlocks.applyAccent === 'function') {
        SokratBlocks.applyAccent(el, card ? [card.color, card.catColor] : []);
    }
}

function updateFlashcard() {
    const cards = AppState.cards;
    if (!cards.deck || cards.deck.length === 0) {
        const tr = (k, fb) => (typeof t === 'function' ? t(k) : fb);
        applyCardAccent(null);
        document.getElementById('cardCategory').textContent = tr('fc.noCards', 'No Cards');
        document.getElementById('cardQuestion').textContent = tr('fc.noCardsAvailable', 'No flashcards available for this lesson.');
        document.getElementById('cardAnswer').textContent = tr('fc.trySelecting', 'Try selecting a different lesson or category.');
        document.getElementById('cardExplanation').textContent = '';
        updateDeckGhosts();
        return;
    }
    
    const card = cards.deck[cards.index];
    applyCardAccent(card);
    document.getElementById('cardCategory').textContent = card.categoryName;
    document.getElementById('cardQuestion').textContent = card.question;
    document.getElementById('cardAnswer').textContent = card.answer;
    document.getElementById('cardExplanation').textContent = card.explanation || '';

    document.getElementById('flashcard').classList.remove('flipped');

    // ADR-009: render LaTeX in question/answer/explanation (KaTeX walks the text nodes).
    if (typeof renderMath === 'function') renderMath(document.getElementById('flashcard'));
    updateDeckGhosts();
}

/**
 * F1/9 — ŠPIL: dvije kartice koje vire ispod trenutne nose boju SVOJE kartice (isti
 * `applyAccent` kao i lice), da se na telefonu vidi što slijedi i kojoj sekciji pripada.
 * Bez sljedeće kartice sjena se skriva (`hidden`), pa zadnja kartica stoji sama — kao i
 * dosad na stolnom, gdje sjene ne postoje uopće (CSS ih crta samo pod `pointer: coarse`).
 */
function updateDeckGhosts() {
    const cards = AppState.cards;
    for (let i = 1; i <= 2; i++) {
        const g = document.getElementById('flashcardGhost' + i);
        if (!g) continue;
        const card = cards.deck ? cards.deck[cards.index + i] : null;
        g.hidden = !card;
        if (window.SokratBlocks && typeof SokratBlocks.applyAccent === 'function') {
            SokratBlocks.applyAccent(g, card ? [card.color, card.catColor] : []);
        }
    }
}

function updateFlashcardProgress() {
    const cards = AppState.cards;
    if (!cards.deck || cards.deck.length === 0) {
        document.getElementById('cardProgress').textContent = '0 / 0';
        document.getElementById('cardProgressBar').style.width = '0%';
        return;
    }

    const prog = `${cards.index + 1} / ${cards.deck.length}`;
    document.getElementById('cardProgress').textContent = prog;

    const percent = ((cards.index + 1) / cards.deck.length) * 100;
    document.getElementById('cardProgressBar').style.width = `${percent}%`;
}

function updateFlashcardStats() {
    document.getElementById('knownCount').textContent = AppState.cards.known.length;
    document.getElementById('unknownCount').textContent = AppState.cards.unknown.length;
}

function prevCard() {
    const cards = AppState.cards;
    if (cards.index > 0) {
        cards.index--;
        updateFlashcard();
        updateFlashcardProgress();
    }
}

function nextCard() {
    const cards = AppState.cards;
    if (cards.index < cards.deck.length - 1) {
        cards.index++;
        updateFlashcard();
        updateFlashcardProgress();
    }
}

function markKnown() {
    const cards = AppState.cards;
    if (!cards.known.includes(cards.index)) {
        cards.known.push(cards.index);
        const idx = cards.unknown.indexOf(cards.index);
        if (idx > -1) cards.unknown.splice(idx, 1);
    }
    updateFlashcardStats();
    saveFlashcardProgress();
    trackFlashcardReview();
    nextCard();
}

function markUnknown() {
    const cards = AppState.cards;
    if (!cards.unknown.includes(cards.index)) {
        cards.unknown.push(cards.index);
        const idx = cards.known.indexOf(cards.index);
        if (idx > -1) cards.known.splice(idx, 1);
    }
    updateFlashcardStats();
    nextCard();
}

/**
 * BUG-047 — IDENTITET KARTICE. „Znam" je do 12.09. spremao POZICIJU u promiješanom špilu:
 * sutra je na poziciji 0 druga kartica, pa su se obje vodile kao isti broj; napredak je k tome
 * po PREDMETU, a špil po LEKCIJI, pa su se indeksi triju lekcija miješali u istom nizu. Broj
 * „naučeno" je bio šum, a sync-unija (pretpostavlja stringove) ga nije ni dohvaćala.
 *
 * Identitet: `card.id` (schema v2, 6 znakova) kad postoji. Ne postoji u sedam HR predmeta i
 * dijelu `accounting`-a (1 175 od 5 737 kartica na dan 12.09.) — ondje deterministički otisak
 * `kategorija|pitanje` (FNV-1a, base36). Stabilan dok se pitanje ne promijeni; promjena
 * pitanja = nova kartica, što je za „naučeno" pošteno. `final` = kopija M1⊕M2 → ista kartica
 * ima isti id u obje lekcije, pa naučeno u midterm-u vrijedi i u finalu. Vraća UVIJEK string.
 * Brana: `tests/unit/flashcard-identity.test.js`.
 */
function cardIdentity(card) {
    if (card && typeof card.id === 'string' && card.id) return card.id;
    const s = String(card && card.category || '') + '|' + String(card && card.question || '');
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 0x01000193) >>> 0;
    }
    return 'q:' + h.toString(36);
}

function saveFlashcardProgress() {
    const cards = AppState.cards;
    const znam = cards.known.map(i => cardIdentity(cards.deck[i]));
    // Stari brojčani zapisi (pozicije) ovdje ispadaju — `loadProgress` ih isto odbacuje, a prvi
    // upis s bilo kojeg uređaja ih time izbaci i iz oblaka (upsert piše cijeli redak).
    const stari = (progress.flashcardsLearned || []).filter(x => typeof x === 'string');
    progress.flashcardsLearned = [...new Set([...stari, ...znam])];
    saveProgress();
}

/* ── F1/9 — TINDER-ŠPIL NA DODIRU (2026-09-06) ─────────────────────────────────
   Leon (2026-09-05): „na mobitelu bi napravio za kartice kao tinder način otvaranja i gledanja";
   (2026-09-06): „samo na mobitelu, ne vidim kako bi mogao funkcionirati na kompu".
   Do F1/9 u modovima učenja nije bilo NIJEDNE dodirne geste: jedna kartica, klik okreće, četiri gumba.

   ŠTO JE GESTA, A ŠTO NIJE
   • dodir bez pomaka = okreni — na `pointerup`, jer Chromium poslije brzog zamaha potisne `click`
     sljedećeg dodira (izmjereno na goloj stranici); miš i dalje okreće klikom;
   • povlačenje DESNO = znam, LIJEVO = ne znam — gesta ZOVE `markKnown` / `markUnknown`, nikad ne
     duplicira upis: jedini put u `cards.known` / `cards.unknown` / `saveFlashcardProgress` ostaju te
     dvije funkcije (`tests/unit/flashcard-swipe.test.js` to BROJI, ne tvrdi);
   • samo `pointerType === 'touch'` — miš i olovka ostaju kod današnjeg prikaza (stolno = kao danas);
   • okomit pomak nije gesta: `touch-action: pan-y` na kartici (CSS) pušta preglednik da skrola, a
     nama stižu samo vodoravni pomaci; što prije `SLOP`-a krene više okomito, prepušta se pregledniku;
   • gumbi ostaju ispod špila (pristupačnost) — gesta je prečac, ne zamjena.

   KAKO, BEZ BIBLIOTEKE
   `pointerdown` pamti ishodište; prvi pomak koji je pretežno vodoravan i veći od `SLOP` uzima pokazivač
   (`setPointerCapture`) i od tada JS piše SAMO TRI BROJKE kao CSS-varijable — `--swipe-x` (px),
   `--swipe-rot` (deg), `--swipe-p` (−1…1, koliko je odluka blizu) — i tri stanja kao klase
   (`is-dragging` · `is-flying` · `is-entering`); sve crtanje je u `flashcards-section.css` §F1/9.
   Otpuštanje iznad praga (trećina širine kartice, najmanje `PRAG_MIN`) = let van ekrana; ispod =
   povratak (varijable se obrišu, prijelaz iz CSS-a vrati karticu). Kraj leta javlja `transitionend`,
   a `LET_MS` je REZERVA (kartica skrivena usred leta, kartica bez prijelaza) — upis se dogodi točno
   jednom, ma koji od njih stigao prvi; `gen` (naraštaj) jamči da let poništen novim špilom
   (`initFlashcards` → `resetSwipe`) nikad ne upiše u tuđi špil. Nova kartica ulazi pod `is-entering`
   (prijelazi ugašeni jedan kadar): bez toga bi se naličje vidljivo okretalo natrag, a kartica
   „vraćala" s ruba ekrana. `prefers-reduced-motion` → leta nema, upis odmah, kartica se samo zamijeni. */
const swipe = {
    SLOP: 10,        // px prije nego pomak postane gesta (ispod = dodir → okretanje)
    PRAG_MIN: 90,    // px — najmanji put koji znači odluku; trećina kartice je više na širim ekranima
    LET_MS: 320,     // rezerva za `transitionend` (let u CSS-u traje 280 ms)
    id: null, x0: 0, y0: 0, dx: 0, aktivno: false, leti: false, progutajKlik: false, timer: 0, gen: 0, naKraj: null
};

function swipeEl() { return document.getElementById('flashcard'); }

function swipePrag(el) {
    return Math.max(swipe.PRAG_MIN, Math.round((el.offsetWidth || 0) / 3));
}

function swipePostavi(el, dx) {
    const p = Math.max(-1, Math.min(1, dx / swipePrag(el)));
    el.style.setProperty('--swipe-x', dx + 'px');
    el.style.setProperty('--swipe-rot', Math.max(-14, Math.min(14, dx / 14)).toFixed(2) + 'deg');
    el.style.setProperty('--swipe-p', p.toFixed(3));
}

function swipeOcisti(el) {
    el.style.removeProperty('--swipe-x');
    el.style.removeProperty('--swipe-rot');
    el.style.removeProperty('--swipe-p');
}

/** Poništi sve što je gesta ostavila — zove ga `initFlashcards` (novi špil usred leta ne smije naslijediti stanje). */
function resetSwipe() {
    const el = swipeEl();
    if (!el) return;
    swipe.gen++;
    if (swipe.timer) { clearTimeout(swipe.timer); swipe.timer = 0; }
    if (swipe.naKraj) { el.removeEventListener('transitionend', swipe.naKraj); swipe.naKraj = null; }
    swipe.id = null; swipe.aktivno = false; swipe.leti = false; swipe.progutajKlik = false;
    el.classList.remove('is-dragging', 'is-flying', 'is-entering');
    swipeOcisti(el);
}

function initSwipe() {
    const el = swipeEl();
    if (!el || typeof el.addEventListener !== 'function') return;
    el.addEventListener('pointerdown', swipeDown);
    el.addEventListener('pointermove', swipeMove);
    el.addEventListener('pointerup', swipeUp);
    el.addEventListener('pointercancel', swipeCancel);
}

function swipeDown(e) {
    if (e.pointerType !== 'touch' || e.isPrimary === false || swipe.leti) return;
    swipe.progutajKlik = false;            // nova gesta: rep prethodne (ako ga je bilo) je već prošao
    swipe.id = e.pointerId; swipe.x0 = e.clientX; swipe.y0 = e.clientY;
    swipe.dx = 0; swipe.aktivno = false;
}

function swipeMove(e) {
    if (swipe.id === null || e.pointerId !== swipe.id) return;
    const el = swipeEl();
    const dx = e.clientX - swipe.x0, dy = e.clientY - swipe.y0;
    if (!swipe.aktivno) {
        if (Math.abs(dx) < swipe.SLOP && Math.abs(dy) < swipe.SLOP) return;
        if (Math.abs(dy) > Math.abs(dx)) { swipe.id = null; return; }   // okomito = skrol, preglednikov posao
        swipe.aktivno = true;
        el.classList.add('is-dragging');
        // Bez `setPointerCapture`: dodirni pokazivač ima IMPLICITNI capture na cilju `pointerdown`-a
        // (Pointer Events §implicit pointer capture), pa `pointermove`/`pointerup` stižu ovamo i kad prst
        // pobjegne s kartice — izmjereno CDP-sondom (2026-09-06): let i upis rade bez eksplicitnog.
    }
    swipe.dx = dx;
    swipePostavi(el, dx);
}

function swipeUp(e) {
    if (swipe.id === null || e.pointerId !== swipe.id) return;
    const el = swipeEl();
    const bio = swipe.aktivno, dx = swipe.dx;
    swipe.id = null; swipe.aktivno = false;
    swipe.progutajKlik = true;             // rep geste (ako stigne) nije okretanje — ni poslije povlačenja ni poslije dodira
    if (!bio) {
        // Dodir bez pomaka = okreni — OVDJE, ne u `click`-u. IZMJERENO (CDP-sonda na GOLOJ stranici,
        // 2026-09-06): Chromium poslije brzog vodoravnog zamaha (fling) POTISNE `click` sljedećeg
        // dodira (i 3 s kasnije; spor zamah ne), a `pointerdown`/`pointerup` stignu uredno. Da tap ne
        // ovisi o tome hoće li preglednik sintetizirati klik, okreće se na `pointerup`, a klik koji
        // ipak stigne guta zastavica gore (sljedeći `pointerdown` je briše).
        document.getElementById('flashcard').classList.toggle('flipped');
        return;
    }
    el.classList.remove('is-dragging');
    if (Math.abs(dx) >= swipePrag(el)) swipeLet(el, dx > 0 ? 1 : -1);
    else swipeOcisti(el);                  // povratak: bez varijabli prijelaz iz CSS-a vrati karticu
}

function swipeCancel(e) {
    if (swipe.id === null || e.pointerId !== swipe.id) return;
    const el = swipeEl();
    const bio = swipe.aktivno;
    swipe.id = null; swipe.aktivno = false;
    if (!bio) return;
    swipe.progutajKlik = true;
    el.classList.remove('is-dragging');
    swipeOcisti(el);                       // preglednik je uzeo pokazivač (skrol, sustav) → ništa se ne upisuje
}

function swipeLet(el, smjer) {
    const upis = smjer > 0 ? markKnown : markUnknown;
    const bezPokreta = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (bezPokreta) { swipeOcisti(el); swipeSleti(el, upis); return; }
    swipe.leti = true;
    const gen = swipe.gen;
    const daleko = (el.offsetWidth || 0) + (window.innerWidth || 0);
    el.style.setProperty('--swipe-x', (smjer * daleko) + 'px');
    el.style.setProperty('--swipe-rot', (smjer * 18) + 'deg');
    el.style.setProperty('--swipe-p', String(smjer));
    el.classList.add('is-flying');
    const kraj = () => {
        if (gen !== swipe.gen || !swipe.leti) return;   // let je poništen (novi špil) ili već sletio
        el.removeEventListener('transitionend', naKraj);
        swipe.naKraj = null;
        if (swipe.timer) { clearTimeout(swipe.timer); swipe.timer = 0; }
        swipe.leti = false;
        swipeSleti(el, upis);
    };
    const naKraj = (ev) => { if (!ev || ev.target === el) kraj(); };
    swipe.naKraj = naKraj;
    el.addEventListener('transitionend', naKraj);
    swipe.timer = setTimeout(kraj, swipe.LET_MS);
}

/** Slijetanje: prijelazi ugašeni (`is-entering`), let/varijable obrisani, UPIS kroz postojeću funkciju, pa kadar poslije prijelazi natrag. */
function swipeSleti(el, upis) {
    el.classList.add('is-entering');
    el.classList.remove('is-flying');
    swipeOcisti(el);
    upis();
    const skini = () => el.classList.remove('is-entering');
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(() => requestAnimationFrame(skini));
    else skini();
}

/* ── F1/9 ② — STOLNI PANDAN PALCU: STRELICE ─────────────────────────────────────
   Leon (2026-09-06): špil „samo na mobitelu … ali ako imaš viziju probaj nešto". Stolno zadržava
   IZGLED (jedna kartica, gumbi, bez špila), ali dobiva isti TOK bez ijednog klika: → = znam,
   ← = ne znam, razmak / Enter = okreni — uz isti let kartice i pečat kao kod povlačenja, pa se odluka
   VIDI, ne samo upiše. Radi samo dok je otvoren mod kartica; nikad iznad polja za unos, gumba,
   poveznice ili otvorenog modala (ondje tipke već znače nešto drugo) i nikad s modifikatorom
   (⌘ / Ctrl / Alt = prečaci preglednika). Gumbi i klik ostaju netaknuti. */
function initTipke() {
    if (typeof document.addEventListener !== 'function') return;
    document.addEventListener('keydown', naTipku);
}

function naTipku(e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== ' ' && e.key !== 'Enter') return;
    const nav = AppState.nav;
    if (!nav || nav.page !== 'study' || nav.section !== 'flashcards') return;
    const meta = e.target;
    if (meta && typeof meta.closest === 'function' && meta.closest('input, textarea, select, button, a, [contenteditable="true"]')) return;
    // Zatvoren `<sokrat-modal>` OSTAJE u DOM-u (`aria-hidden="true"`, `visibility: hidden` — i dalje ima
    // pravokutnik!), otvoren nosi `aria-hidden="false"` i `body.modal-open`. Pita se ATRIBUT, ne geometrija.
    const modal = typeof document.querySelector === 'function' ? document.querySelector('[aria-modal="true"]:not([aria-hidden="true"])') : null;
    if (modal || (document.body && document.body.classList && document.body.classList.contains('modal-open'))) return;
    const el = swipeEl();
    if (!el || swipe.leti || swipe.aktivno) return;
    if (!AppState.cards.deck || !AppState.cards.deck.length) return;
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (e.key === 'ArrowRight') swipeLet(el, 1);
    else if (e.key === 'ArrowLeft') swipeLet(el, -1);
    else { swipe.progutajKlik = false; flipCard(); }
}
