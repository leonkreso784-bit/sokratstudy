// ===== SOKRAT STUDY — CONTENT LOADER (lazy loading) =====
//
// Učitava sadržaj predmeta TEK kad zatreba (otvaranje lekcije / study), umjesto da se
// svih ~19 data-*.js učita na startu (~777 KB). Catalog (data/catalog.js) je izvor
// istine za to KOJE datoteke predmet treba (subject.content.scripts).
//
// Ovo je ujedno "šav" prema backendu (Blok B): kad dođe Supabase, loadSubjectContent()
// samo zamijeni injekciju <script> s fetch('/api/subject/...'). Ostatak app-a se NE mijenja.
//
// ⚠ CACHE: data/* su pod immutable cacheom (vercel.json). Pri izmjeni BILO KOJEG
// data/* sadržaja bumpaj CONTENT_VERSION — inače preglednik servira stari cache.

const CONTENT_VERSION = '20261003051209';

// subjectId -> true (sadržaj učitan) ; subjectId -> Promise (učitavanje u tijeku)
const _contentLoaded = {};
const _contentLoading = {};

// ── BLOK B (read-path): čitaj sadržaj iz Supabasea (public-read), s FALLBACKOM na datoteke. ──
// Dok je false → 100% staro ponašanje (samo datoteke). Flipne se na true TEK kad je
// `supabase/schema.sql` pokrenut u dashboardu I `node scripts/migrate-content.js` napunio
// tablicu `subject_content`. Datoteke ostaju izvor istine + fallback (ako baza padne/prazna).
const CONTENT_FROM_SUPABASE = true;

// Pričekaj da supabase-js klijent bude spreman (CDN se učita async nakon DOMContentLoaded).
function _supabaseClientWhenReady(timeoutMs) {
    return new Promise((resolve) => {
        const t0 = Date.now();
        (function poll() {
            const c = (typeof SokratAuth !== 'undefined' && SokratAuth.getClient) ? SokratAuth.getClient() : null;
            if (c) { resolve(c); return; }
            if (Date.now() - t0 > timeoutMs) { resolve(null); return; }
            setTimeout(poll, 100);
        })();
    });
}

// Pokušaj učitati sadržaj predmeta iz baze → postavi window[var_name] = payload.
// Vrati true ako je uspjelo (red(ovi) nađeni), inače false (→ pozivatelj pada na datoteke).
function _loadSubjectFromSupabase(subjectId) {
    if (!CONTENT_FROM_SUPABASE) return Promise.resolve(false);
    return _supabaseClientWhenReady(2500).then((client) => {
        if (!client) return false;
        return client.from('subject_content').select('var_name,payload').eq('subject_id', subjectId)
            .then(({ data, error }) => {
                if (error || !Array.isArray(data) || !data.length) return false;
                data.forEach((row) => { if (row && row.var_name) window[row.var_name] = row.payload; });
                return true;
            });
    }).catch(() => false); // bilo kakva greška → fallback na datoteke
}

// ── F2 2A.3 (dual-read): učitaj study sadržaj iz LOKALNIH data/json/<id>/<var>.json. ──
// Alternativa .js study-skriptama za predmete s content.dataFormat === 'json'. Postavi window[var].
// RESOLVE tek kad su SVE JSON datoteke uspješno učitane; REJECT ako ijedna padne → pozivatelj pada
// na .js (fallback, 0 regresije). Vježbe (codeScripts) se NE diraju ovdje — uvijek iz .js (BUG-012).
function _loadSubjectFromJson(subject) {
    const resolve = (subject && subject.content && subject.content.resolve) || {};
    const vars = Array.from(new Set(Object.values(resolve))); // jedinstvena imena window-varova
    if (!vars.length) return Promise.reject(new Error('nema resolve varova'));
    return Promise.all(vars.map((v) => {
        const url = 'data/json/' + subject.id + '/' + v + '.json?v=' + CONTENT_VERSION;
        return fetch(url).then((res) => {
            if (!res.ok) throw new Error('JSON ' + res.status + ' @ ' + url);
            return res.json();
        }).then((payload) => {
            // Obrambeno: prazan/neispravan payload NE smije proći kao valjan → izazovi fallback.
            if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
                throw new Error('JSON payload nije objekt @ ' + url);
            }
            window[v] = payload;
        });
    }));
}

// Je li skripta s ovom putanjom već u dokumentu (statički <script> tag ILI ranije injektirana)?
// Dedup po PUTANJI (bez ?v=) — zato je loader bezopasan i dok statički tagovi još postoje.
function _scriptAlreadyPresent(src) {
    const path = String(src).split('?')[0];
    return Array.from(document.scripts).some((sc) => {
        const scPath = (sc.getAttribute('src') || '').split('?')[0];
        return scPath === path;
    });
}

// Učitaj jednu skriptu (jednom). Ako je već prisutna, odmah resolve.
function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
        if (_scriptAlreadyPresent(src)) { resolve(); return; }
        const s = document.createElement('script');
        s.src = src + (src.indexOf('?') === -1 ? ('?v=' + CONTENT_VERSION) : '');
        s.async = false; // očuvaj redoslijed izvođenja kad ih ima više
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('Content load failed: ' + src));
        document.head.appendChild(s);
    });
}

// Učitaj SAV sadržaj predmeta (sve content.scripts), redom. Keširano + dedup po predmetu.
function loadSubjectContent(subjectId) {
    if (_contentLoaded[subjectId]) return Promise.resolve();
    if (_contentLoading[subjectId]) return _contentLoading[subjectId];

    const subject = (typeof SokratCatalog !== 'undefined') ? SokratCatalog.getSubject(subjectId) : null;
    const scripts = (subject && subject.content && Array.isArray(subject.content.scripts))
        ? subject.content.scripts : [];
    // codeScripts = datoteke koje sadrže KOD (vježbe + lib s generate() funkcijama). Funkcije ne
    // prežive JSON → NE smiju u bazu (BUG-012). Učitavaju se iz datoteke UVIJEK, čak i u DB-modu.
    const codeScripts = (subject && subject.content && Array.isArray(subject.content.codeScripts))
        ? subject.content.codeScripts : [];
    // F2 2A.3: predmet s content.dataFormat === 'json' čita study sadržaj iz data/json/*.json
    // (dual-read). Odsutan flag = staro ponašanje (study iz .js). Vježbe uvijek iz .js (codeScripts).
    const dataFormat = (subject && subject.content && subject.content.dataFormat) || 'js';

    // Učitaj listu .js datoteka redom (redoslijed bitan: final poslije m1+m2; lib prije exercises).
    const loadFiles = (list) => {
        let chain = Promise.resolve();
        list.forEach((src) => { chain = chain.then(() => loadScriptOnce(src)); });
        return chain;
    };

    // Prvo proba baza (Blok B); ako vrati false (flag off / prazno / greška) → JSON ili .js.
    const p = _loadSubjectFromSupabase(subjectId).then((fromDb) => {
        // DB-mod: study (M1/M2/Final) je na windowu iz baze; još učitaj SAMO kod-datoteke (vježbe+lib).
        // Za predmete bez vježbi codeScripts je prazan → no-op (identično starom ponašanju).
        if (fromDb) return loadFiles(codeScripts);
        // JSON-mod (2A.3): study iz data/json/*.json + vježbe iz .js. Ako JSON padne (404/offline/
        // neispravan) → FALLBACK na PUNE .js (scripts). Round-trip dokazan ekvivalentan (2A.2).
        if (dataFormat === 'json') {
            return _loadSubjectFromJson(subject)
                .then(() => loadFiles(codeScripts))
                .catch((err) => {
                    if (typeof console !== 'undefined') console.warn('[content] JSON read failed → fallback .js:', err && err.message);
                    return loadFiles(scripts);
                });
        }
        // Stari put: SVE iz .js (study + kod).
        return loadFiles(scripts);
    }).then(() => {
        _contentLoaded[subjectId] = true;
        delete _contentLoading[subjectId];
    }).catch((err) => {
        delete _contentLoading[subjectId];
        throw err;
    });

    _contentLoading[subjectId] = p;
    return p;
}

// Je li sadržaj predmeta već učitan? (za uvjete / testove)
function isSubjectContentLoaded(subjectId) {
    return !!_contentLoaded[subjectId];
}

// ── U7a — KATEGORIJE dokumenta (meta-safe) ─────────────────────────────────────
// Sadržaj lekcije = mapa `{ <catId>: {name, icon, flashcards, quiz, fillBlanks, learn}, … }`.
// Od U7 (schema v2) dokument može nositi i TOP-LEVEL META ključeve (`schemaVersion` = broj,
// `composedOf` = niz, …). Sirovi `Object.keys(content)` bi ih tretirao kao kategoriju →
// study/progress renderiraju LAŽNU kategoriju (isti razred bag koji je smoke uhvatio u U2a).
// Pravilo: kategorija = ključ čija je vrijednost OBJEKT (ne niz). Time se meta (broj/niz/skalar)
// automatski isključuje, a prazna kategorija `{}` (objekt) OSTAJE. Koristi se na SVIM
// category-iteracijama (flashcards/quiz/fill/learn/progress/admin).
function getCategories(content) {
    if (!content || typeof content !== 'object') return [];
    return Object.keys(content).filter(function (k) {
        const v = content[k];
        return v && typeof v === 'object' && !Array.isArray(v);
    });
}

// ── BUG-053 — JEDINI ulaz u `AppState.nav.data` ────────────────────────────────
// Pravilo iznad je čitač morao ZAPAMTITI; `progress.js` nije, pa je v2 dokument (svaki materijal iz
// AI nacrta) srušio napredak na `(2).quiz.length`. Zato se dokument čisti NA ULAZU: van idu samo
// lekcije, svaka s nizovima `flashcards`/`quiz`/`fillBlanks` — nijedan čitač, ni budući, ne vidi meta-
// ključ ni lekciju bez niza. Lekcija je PLITKA kopija: keširani dokument ostaje netaknut (dijele ga
// sve lekcije predmeta). `allowed` = popis lekcija koje ruta smije (njegovim redom).
// Editori ovo NE koriste: Studio/admin čitaju svoj dokument i meta im mora ostati.
const STUDY_ARRAYS = ['flashcards', 'quiz', 'fillBlanks'];
function getStudyData(content, allowed) {
    const cats = getCategories(content);
    const keys = Array.isArray(allowed) ? allowed.filter(function (k) { return cats.indexOf(k) !== -1; }) : cats;
    const out = {};
    keys.forEach(function (k) {
        const lesson = Object.assign({}, content[k]);
        STUDY_ARRAYS.forEach(function (f) { if (!Array.isArray(lesson[f])) lesson[f] = []; });
        out[k] = lesson;
    });
    return out;
}

if (typeof window !== 'undefined') {
    window.CONTENT_VERSION = CONTENT_VERSION;
    window.loadSubjectContent = loadSubjectContent;
    window.loadScriptOnce = loadScriptOnce;
    window.isSubjectContentLoaded = isSubjectContentLoaded;
    window.getCategories = getCategories;
    window.getStudyData = getStudyData;
}
