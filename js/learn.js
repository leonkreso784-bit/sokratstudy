// ===== SOKRAT STUDY — LEARN MODE =====

/**
 * BUG-025 — escape za sve što iz PODATAKA ide u `innerHTML`.
 * Jedna definicija za cijelu platformu je ona iz `blocks-renderer.js` (ADR-027), koji se u
 * `index.html` učitava prije ovog fajla. Nema li ga, prazno je jedini fail-safe ishod —
 * sirov unos ne smije proći ni u degradiranom stanju.
 */
function lEsc(s) {
    return (window.SokratBlocks && typeof SokratBlocks.esc === 'function') ? SokratBlocks.esc(s) : '';
}
function lIcon(s) {
    return (window.SokratBlocks && typeof SokratBlocks.safeIcon === 'function') ? SokratBlocks.safeIcon(s) : 'fa-book';
}

function renderLearnContent() {
    const container = document.getElementById('learnContent');
    if (!container) {
        console.error('Learn content container not found');
        return;
    }
    const content = AppState.nav.data;
    if (!content) {
        console.error('No current data for learn content');
        container.innerHTML = '<div class="learn-card"><div class="learn-card-content"><p>No content available. Please select a lesson.</p></div></div>';
        return;
    }

    container.innerHTML = '';

    const categories = getCategories(content);
    if (categories.length === 0) {
        container.innerHTML = '<div class="learn-card"><div class="learn-card-content"><p>No categories found in this lesson.</p></div></div>';
        return;
    }

    categories.forEach(category => {
        const data = content[category];
        if (!data) return;
        
        // BUG-025: naziv i ikona sekcije ulaze u `innerHTML`, a u osobnom materijalu ih tipka
        // KORISNIK. Oboje ide kroz jednu definiciju iz `blocks-renderer.js` (ADR-027) — naziv se
        // escapa, ikona PROVJERAVA (ide u `class`, gdje escape nije dovoljan).
        const icon = lIcon(data.icon);
        const name = lEsc(data.name || category);
        const flashcardsCount = data.flashcards ? data.flashcards.length : 0;
        // U7c: SAV learn ide kroz JEDAN renderer (sigurnosna granica). v2 = blokovi (escapani po tipu);
        // v1 = legacy-html blok kroz DOMPurify (allowlist pokriva naš sadržaj — legacy-html-coverage.test.js).
        // Krajnji fallback (renderer nekako nije učitan) = escapan tekst, nikad sirov HTML (F6 ②/0d).
        // BUG-024: `renderContentBlocks` (ne goli `renderBlocks`) — on razriješi privatne slike
        // osobnog materijala. Izravan poziv je ovdje sliku tiho gutao pri učenju.
        let learnHtml;
        if (typeof renderContentBlocks === 'function' && data.learn && Array.isArray(data.learn.blocks)) {
            learnHtml = renderContentBlocks(data.learn.blocks);
        } else if (data.learn && data.learn.content) {
            learnHtml = (typeof renderContentBlocks === 'function')
                ? renderContentBlocks([{ type: 'legacy-html', html: data.learn.content }])
                // F6 ②/0d (N2): bez renderera nema ni sanitizatora → nikad sirov HTML. `lEsc` bez
                // renderera vraća prazno (fail-safe, v. gore) — prazna lekcija, ne izvršen kôd.
                : lEsc(data.learn.content);
        } else {
            learnHtml = '<p>No learn content available for this category.</p>';
        }
        // Zaglavna slika sekcije (14 kategorija u katalogu je koristi) kroz ISTU provjeru sheme
        // kao renderer: `javascript:`/`data:text` → prazno → `<img>` se izostavi (fail-safe).
        // Oblik markupa se NE mijenja — `enhanceLearnImages` mu poslije doda zoom-klase.
        const rawImage = data.learn && data.learn.image ? data.learn.image : null;
        const learnImage = rawImage && window.SokratBlocks && typeof SokratBlocks.safeUrl === 'function'
            ? lEsc(SokratBlocks.safeUrl(rawImage, { image: true }))
            : null;
        
        const card = document.createElement('div');
        card.className = 'learn-card';
        card.dataset.category = category;

        // M3b: akcent sekcije na studentskoj strani. Do sada se `--st-acc` postavljao SAMO u
        // Studiju, pa onaj tko uči nije vidio boju sekcije nigdje u learnu. Blok s vlastitom
        // bojom nosi svoj `--lb-acc`; ovdje se dodaje ono što on nasljeđuje. Validacija ide
        // kroz istu jednu definiciju kao za kartice/kviz/dopune.
        if (window.SokratBlocks && typeof SokratBlocks.accentFrom === 'function') {
            const acc = SokratBlocks.accentFrom([data.color]);
            if (acc) {
                card.style.setProperty('--st-acc', acc);
                // Zaglavlje sekcije nosi PUNU ispunu akcenta (Leon, pregled 2026-09-01) → tinta
                // se RAČUNA, ne pogađa: bijela na npr. #f59e0b daje 2.15 (MREŽA C2). Bez boje
                // nema atributa, pa sekcija zadrži brand-izgled — odsutno znači „naslijedi".
                if (typeof SokratBlocks.inkForTint === 'function') {
                    card.setAttribute('data-ink', SokratBlocks.inkForTint(acc));
                }
            }
        }
        
        card.innerHTML = `
            <div class="learn-card-header">
                <h2 class="learn-card-title"><i class="fas ${icon}"></i> ${name}</h2>
                <span>${flashcardsCount} terms</span>
            </div>
            <div class="learn-card-content">
                ${learnImage ? `<img src="${learnImage}" alt="${name}" class="learn-image learn-zoomable" loading="lazy">` : ''}
                ${learnHtml}
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // Filter functionality - remove old listeners first
    const filterBtns = document.querySelectorAll('.learn-filter .filter-btn');
    filterBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });
    
    document.querySelectorAll('.learn-filter .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.learn-filter .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            document.querySelectorAll('.learn-card').forEach(card => {
                card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
            });
        });
    });
    
    enhanceLearnImages(container);
    cleanupLearnContentForMobile();
    enhanceLearnTables(container);

    // ADR-009: render any LaTeX formulas in the learn HTML (no-op without KaTeX/formulas).
    if (typeof renderMath === 'function') renderMath(container);
}

// a11y (F3 3E): learn tablice su CSS scroll-kontejneri (overflow-x:auto na uskim ekranima) → moraju
// biti dohvatljive tipkovnicom (axe „scrollable-region-focusable"; bez toga keyboard-only korisnik ne
// može skrolati preljev). Mjerenje preljeva pri renderu je nepouzdano (sekcija zna biti skrivena =
// scrollWidth 0), pa označavamo BEZUVJETNO: `tabindex=0` (fokus/strelice) + aria-label. axe okida
// pravilo tek kad tablica STVARNO preljeva, ali fokusabilnost je tad već na mjestu. Bez role= (da ne
// pregazi implicitnu table-semantiku čitača ekrana). Idempotentno.
function enhanceLearnTables(container) {
    if (!container) return;
    const label = (typeof window.t === 'function') ? window.t('a11y.scrollTable') : 'Table — scroll horizontally to see more';
    container.querySelectorAll('.learn-card-content table').forEach((tbl) => {
        tbl.setAttribute('tabindex', '0');
        if (!tbl.hasAttribute('aria-label')) tbl.setAttribute('aria-label', label);
    });
}

function enhanceLearnImages(container) {
    if (!container) return;

    // F3/2 cigla 4b: ime slike je bilo „Open image: …" u oba jezika. Rezervni opis (slika bez `alt`)
    // stanuje u `openLearnImageModal`, pa ga klik predaje prazan umjesto da ga ponavlja.
    const tr = (k, fb) => (typeof window.t === 'function' ? window.t(k) : fb);
    container.querySelectorAll('.learn-card-content img').forEach(img => {
        img.classList.add('learn-image', 'learn-zoomable');
        img.setAttribute('loading', img.getAttribute('loading') || 'lazy');
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', tr('learn.openImage', 'Open image: {alt}')
            .replace('{alt}', img.alt || tr('learn.image', 'Learn image')));

        if (img.dataset.zoomBound === '1') return;

        img.addEventListener('click', () => {
            openLearnImageModal(img.src, img.alt);
        });
        img.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openLearnImageModal(img.src, img.alt);
            }
        });

        img.dataset.zoomBound = '1';
    });
}

// F2 2D.2b: #imageModal je sada Web Component <sokrat-modal>. Komponenta sama vodi
// ESC, klik-na-backdrop (klik na overlay), scroll-lock i fokus. Ovdje ostaje samo:
// gumb X → close(), i čišćenje slike na zatvaranju (preko sokrat-modal:close eventa).
function initLearnImageModal() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.getElementById('imageModalClose');

    if (!modal || !closeBtn) return;
    if (modal.dataset.initialized === '1') return;

    closeBtn.addEventListener('click', closeLearnImageModal);

    // Bilo kakvo zatvaranje (X, ESC, backdrop) → očisti sliku/caption.
    modal.addEventListener('sokrat-modal:close', () => {
        const img = document.getElementById('imageModalImg');
        const caption = document.getElementById('imageModalCaption');
        if (img) img.src = '';
        if (caption) caption.textContent = '';
    });

    modal.dataset.initialized = '1';
}

function openLearnImageModal(src, altText) {
    const modal = document.getElementById('imageModal');
    const img = document.getElementById('imageModalImg');
    const caption = document.getElementById('imageModalCaption');
    if (!modal || !img || !caption) return;

    // F3/2 cigla 4b: slika bez opisa dobivala je VIDLJIV natpis „Learn image" i na hrvatskom sučelju.
    const opis = altText || ((typeof window.t === 'function') ? window.t('learn.image') : 'Learn image');
    img.src = src;
    img.alt = opis;
    caption.textContent = opis;

    if (typeof modal.open === 'function') {
        modal.open();                                   // <sokrat-modal>
    } else {                                            // krajnji fallback (nema custom elementa)
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    }
}

function closeLearnImageModal() {
    const modal = document.getElementById('imageModal');
    if (!modal) return;

    if (typeof modal.close === 'function') {
        modal.close();                                  // <sokrat-modal> (sokrat-modal:close čisti sliku)
    } else {                                            // krajnji fallback
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        const img = document.getElementById('imageModalImg');
        const caption = document.getElementById('imageModalCaption');
        if (img) img.src = '';
        if (caption) caption.textContent = '';
    }
}

// Mobile cleanup — adds CSS classes, no inline style manipulation
function cleanupLearnContentForMobile() {
    const container = document.getElementById('learnContent');
    if (!container) return;

    if (window.innerWidth <= 767) {
        container.classList.add('mobile-view');
        container.querySelectorAll('.learn-card').forEach(card => {
            card.classList.add('mobile-card');
        });
    } else {
        container.classList.remove('mobile-view');
        container.querySelectorAll('.learn-card').forEach(card => {
            card.classList.remove('mobile-card');
        });
    }
}

window.cleanupLearnContentForMobile = cleanupLearnContentForMobile;

window.addEventListener('resize', cleanupLearnContentForMobile);
window.addEventListener('orientationchange', cleanupLearnContentForMobile);
