// Ambient deklaracije globala (FOUNDATION_PLAN F1, brick 1B — type-safety bez build-a).
// Projekt je vanilla/no-build: skripte komuniciraju preko `window.*` i nekoliko bare globala.
// Ovo NIJE runtime kod — samo tipovi za `tsc --checkJs`. Browser i dalje vrti čisti JS.
//
// Širi se modul-po-modul: kad novi modul uđe u tsconfig `include`, ovdje dodaj globale koje dira.

export {}; // drži ovo modulom radi `declare global` (augmentacija Window)

declare global {
  // Catalog (data/catalog.js) — jedinstveni izvor istine za predmete.
  const SokratCatalog:
    | {
        getSubject(id: string): { programId?: string; [k: string]: unknown } | undefined;
        // Placement dual-mode (U2.5, ADR-022): legacy programId ILI placement[] koordinate
        isInProgram(s: unknown, programId: string): boolean;
        placementsOf(s: unknown): Array<{ faculty: string | null; program: string; year?: number; semester?: number }>;
        subjectsOf(programId: string, year?: number): Array<{ [k: string]: unknown }>;
        // Jezik sučelja koji predmet predlaže: `lang` njegova programa ('hr') ili null (MOR, 2026-11-15).
        uiLangOf(s: unknown): string | null;
        [k: string]: unknown;
      }
    | undefined;

  interface Window {
    // Autogeneriran landing stat (data/landing-stats.js → npm run stats)
    SOKRAT_STATS?: { questionCount: number; questionCountExact: number; subjectsCounted: number };

    // Runtime stanje aplikacije (js/app-state.js, F2 2C) — AppStateRoot dolazi iz JSDoc typedefa te datoteke
    AppState?: AppStateRoot;

    // UI-primitivi: Web Components (js/components/*.js, F2 2D)
    SokratToast?: CustomElementConstructor;  // 2D.1 — <sokrat-toast>
    SokratModal?: CustomElementConstructor;  // 2D.2 — <sokrat-modal>
    SokratConfirm?: CustomElementConstructor;  // 2D.3 — <sokrat-confirm>
    // Globalni ulaz za <sokrat-confirm> (fallback na native confirm); uvijek Promise<boolean>.
    askConfirm?: (opts?: { title?: string; message?: string; confirmText?: string; cancelText?: string; danger?: boolean }) => Promise<boolean>;

    // i18n (js/i18n.js)
    t?: (key: string) => string;
    applyTranslations?: (root?: Document | Element) => void;
    setUiLang?: (lang: string, persist?: boolean) => boolean;
    toggleUiLang?: () => void;
    suggestLangForSubject?: (subjectId?: string) => void;
    setUiLangForSubject?: (subjectId?: string) => void;
    getUiLang?: () => string;
    // js/boot.js (F3/1): primjena jezika na <html> (lang + data-ui-lang) prije prvog crtanja; i18n.js je zove pri prebacivanju
    __sokratPrimijeniJezik?: (lang: string | null) => string;
    // js/boot.js (F3/2): jezik uređaja kad nema izbora — jedino mjesto koje zna koji je uređaj hrvatski
    __sokratJezikUredjaja?: () => 'en' | 'hr';

    // Renderi/oslonci koje i18n poziva nakon promjene jezika (definirani u drugim modulima)
    refreshAuthNav?: () => void;
    renderSubjectsSidebar?: () => void;
    renderLandingSubjects?: () => void;
    // Gumbi filtra kataloga nose ime programa i riječ „Svi" → i oni se precrtavaju
    // na promjenu jezika, inače traka ostane na starom jeziku dok se mreža prevede.
    renderCatalogPrograms?: () => void;
    renderBrowse?: () => void;
    renderProfilePage?: () => void;
    // F3/2 cigla 4c: precrtaj profil na promjenu jezika, a otvorene forme i upisano vrati.
    renderProfileText?: () => void;
    // F3/2 cigla 4d: precrtaj „Moje materijale" i policu na promjenu jezika (bez mreže).
    renderMaterialsText?: () => void;
    renderShelfText?: () => void;
    // K2b: mrvicu crta JS u `textContent` (nikad `innerHTML`), pa je `[data-i18n]` ne
    // dohvaća — i18n je mora precrtati kao i ostale liste građene iz kataloga.
    renderPathbar?: () => void;
    // F3/2: poruke slijepe karte ovise o stanju (koordinate, rezultat) — i18n ih precrta.
    renderBlindMapText?: () => void;
    initTopbar?: () => void;
  }
}
