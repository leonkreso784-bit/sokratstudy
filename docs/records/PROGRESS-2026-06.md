# Progress Log — 2026-06

> **Arhiva jednog mjeseca** — ovamo ju je premjestio `npm run docs:rotate`; tekst unosa je nepromijenjen.
> Tekući zapis: [PROGRESS.md](PROGRESS.md) · svi mjeseci: [docs/README.md](../README.md).

## 2026-06-30 — ✅ F1 DEPLOYAN NA PRODUKCIJU + ▶ FAZA 2 započeta (cigla 2B.1 ContentRepository)
**F1 → produkcija:** ff-merge `c874627..69ce466` (grana→main, uz izričito odobrenje); i18n chrome `25c2474` otišao zajedno.
Live potvrđeno: `landing-stats.js`=5700, tokeni `?v=20260698`, CI zelen, RLS OK. Doc-status `164dc11`.
**Faza 2 — revizija redoslijeda (dogovoreno):** S1 (Repo) PRIJE S2 (JSON) + Sentry ranije (F3 ovisi o S1, ne o S2; S1 = 0-rizik šav prije diranja podataka).
**Cigla 2B.1 ✅ (grana `foundation/f2`):** `js/content-repo.js` → `window.SokratContent` — tanki omotač oko 3 postojeća puta dohvata
(`SokratCatalog` metapodaci + `loadSubjectContent` async + `getSubjectData` resolve) u jedno sučelje:
`listSubjects/getSubject/isLessonComingSoon/loadLesson/isLoaded`. **NULA promjene ponašanja** (DB↔datoteka fallback ostaje u loaderu).
Test `tests/content-repo.spec.js` dokazuje EKVIVALENCIJU (`loadLesson` vrati IDENTIČNU referencu kao stari put; 8/8 × 4 profila).
Gate: verify 0/0, content-repo 8/8, lazy-load 4/4 (učitavanje skripti netaknuto). Cache `?v=20260699`.
**Cigla 2B.3 ✅ (prvi DODIR postojećeg koda):** `navigation.js:initStudyPage` → `await SokratContent.loadLesson(subjectId,lessonId)` umjesto
ručnog `loadSubjectContent`+`getSubjectData` (fallback na stari dvokorak ako Repo nije prisutan → 0 regresije). `navigation.js?v=20260699`.
Gate: verify 0/0, typecheck 0, **puni responsive smoke 89 pass / 0 fail (subjects=18, problems=0, errors=0)** + content-repo 8/8 + lazy-load 4/4.
**Cigla 2E ✅ INFRA GOTOVA (DSN naknadno dostavljen + deployano — vidi unos 2026-07-01):** `js/monitoring.js` → `window.SokratMonitor` (`captureException/enable/disable/status`). Globalni
`error`+`unhandledrejection` hvatači instalirani odmah, prosljeđuju TEK na pristanak. **SIGURAN NO-OP bez DSN-a** (ništa se ne učita/šalje, NIKAD
ne baca). Sentry **Loader Script** (URL iz DSN ključa) → nema fiksne verzije → nema 404. Consent-gated: `consent.js applyConsent` → `enable()/disable()`
(isti gate kao GA, `sendDefaultPii:false`). Cache `?v=20260699` (monitoring.js + consent.js na svih 5 stranica). Test `tests/monitoring.spec.js` 8/8
(API + no-op bez DSN + consent-gate + nikad ne baca + „Accept" ožiči). Regresija: legal+landing 32/32, verify 0/0.
**✅ LOADER UPISAN (korisnik dostavio):** `https://js-de.sentry-cdn.com/59736986…min.js` (EU/DE regija; ključ javan kao GA ID). Kod prešao s DSN-parsiranja
na direktni Loader URL (`isConfigured()`/`SENTRY_LOADER_URL`; `sentryOnLoad`→`init({release,sendDefaultPii:false})`). Test prepisan s `page.route` stubom (offline,
12/12: gate, init(release), proslijeđena greška). **→ SVE DOVRŠENO 2026-07-01 (deploy + živa provjera + GDPR); vidi gornji unos.**

## 2026-06-30 — 🧱 F1 brick 1E ✅ → **FAZA 1 GOTOVA**: RLS sigurnosni test (read-only)
**Peta/zadnja cigla F1.** Provjerio cijenu branchinga PRVO: **Supabase branching traži Pro plan $25/mj** (org je `free`;
branch compute $0.01344/h tek nakon Pro) → ne isplati se za RLS. **Opcija 1 (read-only protiv POSTOJEĆE baze, besplatno).**
- **Novo:** `scripts/rls-check.js` (`npm run test:rls`) — anon (publishable) ključ iz `js/auth.js` (javan po dizajnu), READ-ONLY.
- **Dokazuje:** anon **ČITA** `subject_content` (javna `using(true)`); anon **vidi 0 redova** `progress` (RLS `auth.uid()=user_id`).
  Lokalno: 5 redova content / 0 progress → **RLS ne curi**. Curenje → exit 1 (CI crveno).
- **Skip-on-unreachable:** free-tier baza uspavana → SKIP (exit 0), ne lažni crveni. **Windows libuv teardown** (fetch socket + process.exit)
  riješen jednim izlazom + 300ms odgodom (poznat obrazac iz generator-pilota).
- **CI:** korak „RLS security check" u build jobu (poslije typecheck).
- **✅ FAZA 1 (reliability rails) GOTOVA:** 1A CI/CD · 1B type-check · 1C hardening · 1D gateovi (axe+layout+Lighthouse) · 1E RLS.
  Sve GitHub-zeleno, produkcija netaknuta (grana `foundation/f1`). **DALJE:** prod-deploy F1 (uz potvrdu + Vercel preview pregled) PA Faza 2 (reusable jezgra).

## 2026-06-29 — 🧱 F1 brick 1D ✅: TVRDI kvalitetni gateovi (GitHub-zelen, run #28386199455)
**Četvrta cigla F1 — „razlika zdravo→brutalno".** Tri pod-cigle, svaka mjerena prije postavljanja praga (da gate ne bude nerealan).
- **1D.2 axe a11y** (`tests/a11y.spec.js`, `@axe-core/playwright`) — gate 0 serious/critical na landing/browse/study/profil. **Izmjerio baseline PRVO** → našao 1 stvarni serious (`scrollable-region-focusable` na `.sidebar-content`) → **popravio** (`tabindex=0`+`role=region`+`aria-label`; sidebar sad scrollabilan tipkovnicom). 1 viewport (izbjegava 4× šum).
- **1D.3 layout-guard** (`tests/layout-guard.spec.js`) — DETERMINISTIČKA geometrija (ne pikseli) → platform-neovisno, zeleno u CI bez baseline-slika. Sweep **13 širina × {EN,HR}**: CTA nikad odrezan + 0 overflowa = **BUG-015 klasa zaštićena**. **Pixel `toHaveScreenshot` ODGOĐEN** (baseline ovisi o platformi Win≠Linux; nema Dockera/CI-tokena za Linux-baseline — zapisano u BACKLOG).
- **1D.1 Lighthouse** (`.lighthouserc.json`, `@lhci/cli`) — **zaseban CI job `lighthouse`** (Linux; Windows lokalno ruši chrome-launcher `EPERM` na OneDriveu, dokazano). Tvrdi budžeti zasad KONZERVATIVNO (a11y/bp/seo ≥0.9, perf ≥0.6, 3 mjerenja/median). **⏳ KALIBRACIJA:** stegnuti prema 0.95 kad pročitamo stvarne CI-brojeve — lhci uploada **javni LH report URL** u job-log (korisnik ga otvori → javi brojeve).
- **✅ GitHub-zelen:** run #28386199455, **oba joba success** (build = +axe +layout-guard; lighthouse = budžeti prošli). Produkcija netaknuta.
- **DALJE F1:** 1E (RLS + migracije na Supabase branchu) — traži Supabase branching pristup (provjeriti free-tier / odluka korisnika).

## 2026-06-29 — 🧱 F1 brick 1C ✅: Hardening v1 (5 stavki, sve provjereno ×)
**Treća cigla F1.** Male, vidljive, 0-rizik; rađene jedna po jedna s višestrukom provjerom (korisnikov naglasak).
- **1C.1** `vercel.json` — maknut zastarjeli `X-XSS-Protection`; dodani `Referrer-Policy` + `Permissions-Policy` (camera/mic/geo off).
- **1C.2** `js/storage.js` `loadProgress()` — `Object.assign({}, defaultProgress, parsed)` + **try/catch na JSON.parse** (pokvaren/stari localStorage → defaulti, ne pad). *(Funkcija je u storage.js, NE analytics.js kako je plan pretpostavio — provjereno grepom.)*
- **1C.3** mrtav `lessonCategoryMap` entry → `{}` (`js/config.js`). Stari ID-evi `second-exam-prep`/`final-exam-prep` **potvrđeno** postoje samo u config.js (grep data/+js/). Varijabla ostaje (navigation.js:545 → else grana).
- **1C.4** „400+" (samo **1×** u heroju, ne ×3) → **dinamičan**. Nova skripta `scripts/compute-stats.js` (`npm run stats`) broji fc+quiz+fill po FINAL lekciji 17 primarnih predmeta → `data/landing-stats.js` (`window.SOKRAT_STATS`); `renderLandingMeta` puni `[data-meta="questionCount"]`. **Stvarno 5721 → prikaz „5,700+"** (floored). Landing.spec dobio assertion; lazy-load.spec ažuriran (dopušta `landing-stats` kao ne-subject eager).
- **1C.5** „Works offline" → pošteno **„No install needed"/„Bez instalacije"** (hero badge + i18n dict en+hr usklađeni + 2 meta-opisa → „works on any device"). Vraća se na „offline" kad F3 Service Worker bude istina.
- **Provjereno (×):** validate 0/0 · verify 0/0 · typecheck exit 0 · unit 33/33 · **Playwright 76/76** (puni, 2×). Cache bump `?v=20260698`.
- **Git-higijena usput:** sav F1 rad prebačen s lokalnog `main` na granu `foundation/f1`; lokalni `main` vraćen na `origin/main` (= produkcija, netaknuta). **DALJE F1:** 1D TVRDI gateovi (Lighthouse/axe/visual), 1E RLS-test.

## 2026-06-29 — 🧱 F1 brick 1B ✅: type-safety bez build-a (tsc --checkJs, pilot i18n.js)
**Druga cigla F1 (FOUNDATION_PLAN 1B).** Type-check kao SAMO CI checker — nula runtime/build (browser i dalje čisti JS).
- **Novo:** `tsconfig.json` (`checkJs`/`allowJs`/`noEmit`/**`strict`**/skipLibCheck; `include` SCOPED na pilot — raste
  modul-po-modul) · `types/globals.d.ts` (ambient: `SokratCatalog` + `window.*` i18n/render globali) · `typescript`
  devDep (v6.0.3, u `package-lock` za `npm ci`) · `npm run typecheck` skripta.
- **Pilot tipiziran:** `js/i18n.js` — JSDoc `@type`/`@param` na `DICT`/`t`/`applyTranslations`/`setUiLang`/`suggestLangForSubject`
  + `uiLang:'en'|'hr'`. **Samo komentari/anotacije → 0 runtime promjene** (i18n 8/8 Playwright nepromijenjen).
- **Ožičeno u CI:** `ci.yml` korak „Type-check" poslije `test:unit`, prije Playwrighta.
- **Provjereno lokalno:** validate OK · verify OK · unit 33/33 · **typecheck exit 0** · i18n spec 8/8. Cijeli CI lanac zelen.
- **Obrazac dokazan** (ADR-014 t.2): novi modul → dodaj u `include` + globale u `globals.d.ts` + JSDoc. **DALJE F1:** 1C hardening, pa push grane za CI na GitHubu.

## 2026-06-29 — 🧱 F1 brick 1A.1/1A.2 ✅: CI/CD workflow (GitHub Actions)
**Prva cigla temelja (FOUNDATION_PLAN F1).** Korisnik: „moze idemo" → kreće F1, CI/CD prvo.
- **Novo:** `.github/workflows/ci.yml` — na svaki push/PR (sve grane): `npm ci` → `validate:content` → `verify` →
  `test:unit` → `npx playwright test` (chromium, `--with-deps`). Node 22, npm-cache, `concurrency` (otkazuje zastarjele
  runove), `timeout-minutes: 20`. Artefakti (test-results/playwright-report) uploadani **samo na pad** (`if: failure()`).
- **Preduvjeti provjereni:** `package-lock.json` postoji (za `npm ci`)✓; Playwright sam diže server (`webServer` u configu)✓;
  projekti = chromium (iPhone viewporti, bez `browserName`) → dovoljan `install chromium`✓.
- **Lokalno verificiran TOČAN CI slijed** (da push ne bude crven): validate 0/0 · verify 0/0 · **test:unit 33/33** ·
  **Playwright 76/76 (subjects=18, 3.9 min)**. Zeleno.
- **Dokumentirano:** TESTING.md §CI/CD (tok „grana → preview → prod"; TVRDI gate = ne mergea se u `main` ako je crveno) = brick 1A.3.
- **✅ GITHUB-VALIDIRAN:** grana `foundation/f1` pushana → **CI prošao ZELEN** (run #28342101467, **svi koraci success, ~5 min**:
  npm ci → validate → verify → unit → typecheck → Playwright). Usput popravljeno: **`.gitignore` je ignorirao `package-lock.json`**
  → `npm ci` bi pao bez lockfilea → **lockfile sad verzioniran** (commit `6854a0d`). **Produkcija (`main`) NIJE dirana** (push grane = Vercel preview, ne prod).
- **DALJE F1:** 1C hardening, 1D TVRDI gateovi (Lighthouse/axe/visual), 1E RLS-test; zajednički prod-deploy (uklj. i18n chrome + cache-bump) tek kad F1 stoji, uz potvrdu.

---

## 2026-06-29 — 🧱 PLAN PODIGNUT NA „BRUTALAN" (5 nadogradnji) + odluka redoslijeda F1
**Korisnik:** „ne zanima me je li plan zdrav nego je li jeben i brutalan." Procijenio sam postojeći FOUNDATION_PLAN kao
**7/10 (solidno-senior, ali higijena, ne WOW)** i predložio **5 nadogradnji** koje ga dižu na 9–10. Korisnik prihvatio;
prvo provjerio kod protiv plana (vercel.json stvarno ima `X-XSS-Protection`✓, nema `.github`/`tsconfig`/lighthouse✓, 2
ne-pushana commita 25c2474+4cb9c5c✓, Supabase branching dostupan✓) → realnost se poklapa → zapisao plan.
- **5 nadogradnji (sve u POSTOJEĆE faze, redoslijed NEpromijenjen):** (1) **perf/a11y/visual TVRDI CI gateovi** =
  Lighthouse budžeti (Perf≥0.95/LCP≤2s) + axe-core (0 serious) + Playwright `toHaveScreenshot` [F1 brick **1D**, pojačano F3];
  (2) **Sentry + release-tracking** (git SHA), consent-aware [F2 **2E**]; (3) **RLS + migracije na ephemeral Supabase branchu**
  u CI [F1 brick **1E**]; (4) **CRUD versioning + audit-log + dry-run diff** [F4 **4E**]; (5) **SRS dizajn-dok PRIJE koda + FSRS**
  (`docs/SRS_PLAN.md`) [F5 **5.0**]. **TVRDI gate = blokada, ne upozorenje** (crveno = ne u `main`). Trošak alata = 0 €.
- **Zapisano:** FOUNDATION_PLAN (intro „Razina" + brickovi 1D/1E/2E/4E/5.0 + nova **§7 Razina kvalitete** tablica + §3 gate-ovi
  pojačani) · DECISIONS ADR-014 dodatak · ROADMAP §ZAOKRET · BACKLOG „Brutalan bar" · memorija `foundation-pivot` + MEMORY.md.
- **Pojašnjeno korisniku:** „Lighthouse tvrdi budžeti" = budžeti **performansi** (brzina/kvaliteta), NE novca; Lighthouse je besplatan.
- **Redoslijed odlučen (korisnik):** F1 **CI/CD prvo**, PA **zajednički deploy** ne-deployanog i18n chromea (2 lokalna commita) uz cache-bump.
- **Status:** plan finaliziran i „brutalan". `verify` čist. **DALJE: F1 brick 1A.1 — `.github/workflows/ci.yml`.** Bez koda/deploya ove sesije.

---

## 2026-06-29 — 🧱 STRATEŠKI ZAOKRET: PLATFORMA-FIRST (odluka + zapis) + i18n chrome (ne-deployan)
**Glavni ishod sesije = ODLUKA + ZAPIS, ne kod.** Kroz dužu stratešku raspravu korisnik odlučio: **pauzirati dodavanje
sadržaja** (HRV long-tail, prijevodi, 3. god) i izgraditi **profesionalan, reliable, reusable temelj** prije rasta.
- **Razrada (vidi `docs/archive/FOUNDATION_PLAN.md`):** reusable podsistemi S1–S6 (ContentRepository, čisti JSON format⟂vježbe=JS moduli,
  AppState, Web Components, i18n, Auth/RLS) + faze F0→F6. Ključni uvid: **najveći reusable komad nije CRUD nego format sadržaja
  (podatak≠ponašanje) + ContentRepository šav** — CRUD onda sjedi na vrhu i može kasno. „Puno bolje opcije" dodane: **CI/CD gate
  (GitHub Actions + Vercel preview), type-check bez build-a (JSDoc+tsc), Web Components (light-DOM), error monitoring, SRS (spaced
  repetition) kao produkt-WOW.** CRUD=custom (NE CMS, korisnikova odluka); vanilla/no-build ostaje.
- **Zapisano:** `docs/archive/FOUNDATION_PLAN.md` (nov, detaljan) · **ADR-013** (content arhitektura) + **ADR-014** (eng. standardi) u DECISIONS ·
  ROADMAP §STRATEŠKI ZAOKRET + §B preuređen · README index · BACKLOG (hardening v1 + offline-feature + archive/SONNET_REVIEW_2026-06.md provjereno) ·
  CLAUDE.md §DALJE/§Ključne odluke/docs · memorija `foundation-pivot` + MEMORY.md.
- **`archive/SONNET_REVIEW_2026-06.md` review (raspravljen):** kompetentan ali NE u potpunosti verificiran — **#7 `display=swap` NETOČAN (već postoji `index.html:51`)**,
  #4 `lessonCategoryMap` „nije korišten" netočno (jest, `navigation.js:545`; mrtav je samo entry). Pouka: grep/read za SVAKI claim. „🔴 ozbiljno"
  precijenjeno (CSP/DOMPurify realni TEK uz UGC). Realno do-now: headeri, „400+", offline copy, mrtav kod → „hardening v1" u BACKLOG/F1.
- **i18n chrome (long-tail, NAPRAVLJEN, NE-DEPLOYAN):** prije zaokreta prevođen UI chrome (study/lessons breadcrumb+toastovi, progress/analytics
  reset+toastovi, **profil** cijeli, **auth modal** + statusi, cloud-sync „last synced"). `js/i18n.js` (+~70 ključeva: msg.*/profile.*/auth.*),
  `navigation.js`/`analytics.js`/`auth.js`/`profile.js`/`cloud-sync.js` + `index.html` profile h1. **Blind-map NAMJERNO vraćen** (korisnik: karta je dio
  predmeta geografije → prevodi se s `geography-hr`, ne globalnim toggleom). Sintaksa svih JS provjerena (`node --check`). **Commitano LOKALNO (F0.4);
  treba cache-bump + deploy uz Fazu 1.**
- Status: ODLUKA fiksirana, sve zapisano, spreman za compact. **DALJE (poslije compacta): Faza 1 — CI/CD + type-check + hardening v1.**

## 2026-06-28 — BUG-015: landing nav responsivnost na mobitelu (🌐 toggle prepunio nav)
Korisnik prijavio (screenshot): nakon dodavanja 🌐 jezik-toggle-a, na mobitelu se primarni CTA „Start studying"/„Počni učiti" **reže**
(„Start studyin"/„Poč uči"), a na tablet/HR širini se anchor-labeli lome u 2 reda.
- **Dijagnoza (Playwright, mjereno):** na 390px logo-wordmark 169px + toggle 63px + auth 35px + gaps/padding ≈ 68px → CTA dobio samo **55px**
  (treba ~120). CTA se kao flex-item s `flex-shrink:1` **stezao i rezao tekst** umjesto da prijavi overflow; uzrok širine = `.cta-button{width:100%}`
  iz `responsive/02-mobile-core` (namijenjen hero gumbima). Toggle (~75px) je tipnuo i tablet band (~720–1050px) preko ruba.
- **Fix (CSS-only, `css/landing.css` + `css/pages.css`):** (a) `.cta-button.nav-cta{flex-shrink:0; white-space:nowrap; width:auto}`
  (+ logo/toggle/auth `flex-shrink:0`); (b) brand-wordmark `.logo-text{display:none}` ≤1060px (brand=Sokrat ikona → anchor-linkovi ostaju
  vidljivi kroz tablet raspon umjesto da nestanu); (c) anchor-linkovi skriveni ≤860px (bilo ≤720) + `white-space:nowrap` + uži razmaci ≤900;
  (d) `.lessons-title{min-width:0}` (kao `.study-title`, za dug HR naslov na 320px).
- **Provjera:** širinski sweep 320→1440px × {EN,HR} = **0 overflowa, 0 rezanja CTA-a**; header-test browse/lessons/study 0 overflowa na 320/360/390;
  vizualni screenshot 390px (oba jezika čist jedan red). Gate: verify 0/0, **test:responsive 76/76**. Cache `?v=20260697` (styles+landing+pages).
- Status: ✅ riješen + **✅ LIVE 2026-06-28 (`ac68ab0`, push `4b795c8..ac68ab0`)**. Dokumentirano: BUG-015 u `docs/records/BUGS.md` + CHANGELOG.

## 2026-06-28 — HRV: globalni 🌐 toggle + landing/browse prijevod + DEPLOY (cigle 5c)
Nastavak istog dana. Cilj (korisnik): „cijela platforma na hrv, ali translate ne dira predmete" → globalni toggle.
- **5c-i — GLOBALNI HR/EN toggle** (`js/i18n.js`): jezik iz `localStorage 'sokrat-ui-lang'` (default en), `setUiLang` pamti,
  `toggleUiLang()`, `applyTranslations` na prvo bojanje. 🌐 gumb u landing nav + browse/lessons/study headerima (`css/pages.css .lang-toggle`).
  **Program više NE forsira jezik** — opening HR programa samo „predloži" hrvatski ako korisnik nije birao (`suggestLangForSubject`); toggle je gospodar.
  `tests/i18n.spec.js` prepisan (suggest + toggle-master + persist). Commit `afa77ac`.
- **5c-ii — landing chrome** (~55 ključeva): nav/hero/stats/sekcije/how/mode-kartice/CTA/footer. Brojevi (subjectCount) očuvani
  **pre/post podjelom** oko `<span data-meta>`. Auth nav-gumb: `auth.js` koristi `t('auth.signIn')` + izlaže `refreshAuthNav()` koji
  `applyTranslations` zove na promjenu jezika (čuva ime kad je prijavljen). Commit `bd059b3`.
- **5c-iii — browse drill-down** (~25 ključeva): naslovi/introi/breadcrumb + sve kartice kroz `t()`/`getUiLang()`. **Hrvatska gramatika:**
  ordinali („1. godina"), „Predmeti 1. godine", „Semestar 1", množina jedinica („9 predmeta", „3 lekcije"). `applyTranslations` sad
  **re-renderira catalog-liste** (sidebar/landing showcase/aktivni browse) na toggle. Commit `4b795c8`.
- **EN ZAŠTITA:** sve EN dict-vrijednosti = ORIGINALNI tekst → applyTranslations('en') vrati bajt-identičan EN (provjereno EN→HR→EN).
- Cache do `20260696`. Gate (svaka cigla): verify 0/0, **Playwright 76/76**.
- **✅ DEPLOY (uz izričito odobrenje korisnika): `git push 320d413..4b795c8`** — 9 commitova (BUG-013 + cijeli HRV 1–5c) LIVE na
  sokratstudy.com. Provjereno: `i18n.js?v=20260696`→200, catalog ima `business-informatics-hr`, HR data fajl→200.
- **Dalje:** long-tail i18n (profil + pravne stranice privacy/terms/faq/contact + lessons-header + blind-map) → **prijevod ostalih predmeta** (Cigla 6).

## 2026-06-28 — HRV program: pokrenut + PILOT (Business Informatics) LIVE-ready
Nakon BUG-013: krenuo HRVATSKI program „Menadžment u Hotelijerstvu" (prijevod svih predmeta), cigla po cigla.
- **Cigla 1 — plan** `docs/archive/HRV_PLAN.md` (klon-program Opcija A; konvencije imenovanja; bijeli-popis prevedi/čuvaj). `9e203de`.
- **Cigla 2 — `scripts/translate-subject.js`** (Sonnet, `.env` ključ). **Slot-pristup**: izvuče SAMO string-polja iz
  bijelog popisa, model vrati prijevode, JS **rekonstruira strukturu** → ključevi/`correct`/icon/`_______`/HTML/KaTeX
  očuvani po konstrukciji. **Bug ulovljen+riješen:** tool_use često vrati `translations` kao ručno-serijaliziran
  JSON-string s lošim escapeom navodnika (parse pukne) → **salvage-parser** (regex usidren na `{"i":N,"t":"…"}` granicu
  `"}`+lookahead `,{`/`]`, toleriran navodnik u prozi). Batch 12 slotova / 2500 zn, retry za nedostajuće.
- **Cigla 3 — PILOT Business Informatics** → `data/business-informatics-hr/{midterm-1,midterm-2,final}.js`.
  **11 kat / 86 fc / 55 quiz / 44 fill — strukturno identično EN-u** (isti ključevi, isti `correct`, sva `_______`). Trošak ~$0.66. `46acff9`.
- **Cigla 4 — catalog + UI-izolacija:** HR program `hospitality-management-hr` („Menadžment u Hotelijerstvu") + subject
  `business-informatics-hr` („Poslovna informatika", year1/sem1, isti icon/color). **`renderSubjectsSidebar`/landing
  showcase/landing-stats filtrirani na `PRIMARY_PROGRAM='hospitality-management'`** → EN landing/sidebar bajt-identičan,
  HR dostupan kroz **Browse** (drill-down je program-svjestan). Cache `20260695` (catalog/content-loader/navigation + CONTENT_VERSION).
  Testovi `sidebar.spec`/`landing.spec` usklađeni (očekuju primarni program). **Gate: verify 0/0, Playwright 68/68 (subjects=18, `business-informatics-hr ✓ ok`).**
- **Cigla 5 — UI i18n (cijeli study UI) ✅:** `js/i18n.js` (`{en,hr}` rječnik ~90 ključeva + `t()` +
  `applyTranslations()` nad `[data-i18n]`/`[data-i18n-placeholder]`). Jezik se bira po AKTIVNOM PROGRAMU
  (HR program → hrvatsko sučelje; EN i landing/browse ostaju engleski). Prevedeno: nav tabovi (study + mobilni),
  home (statistike/gumbi/podnaslov), learn/flashcards/quiz (uklj. postavke, opcije, rezultat-poruke)/fill (feedback
  „Točno!/Netočno!", placeholder, completion-toast)/progress/exercises. Dinamičke poruke kroz `t()` u
  quiz.js/fill-blanks.js/progress.js/flashcards.js. **KLJUČNO: EN dict-vrijednosti = ORIGINALNI tekst →
  EN bajt-identičan** (applyTranslations('en') vrati originale). Test `tests/i18n.spec.js`. Gate: **verify 0/0,
  Playwright 72/72**. Cache `20260695`. ⚠ Ostaje: blind-map (s geography-hr), landing/browse/profile chrome.
- Napomena: HR sadržaj se čita iz datoteka (Supabase fallback; HR još nije u bazi — re-sync kasnije).

## 2026-06-28 — BUG-013 (flashcard) riješen — grid-stack + min-height
Prva cigla nove faze (prije HRV programa): popravak flashcard buga koji koristi svim predmetima.
- **Bug:** kod dugog odgovora okrenuta kartica naraste preko `.flashcard-controls` → strelica „dalje" prekrivena, neklikabilna.
- **Dvostruki uzrok:** (1) lica (`.flashcard-front/.back`) bila `position:absolute` → ne rastežu `.flashcard-inner`;
  (2) **fiksni `height`** na `.flashcard` po breakpointu (350/340/320/300/280 px u `responsive/01`+`02`) → kartica se ne može proširiti.
- **Fix (CSS-only):** grid-stack — `.flashcard-inner{display:grid}` + lica `grid-area:1/1; position:relative`; svi fiksni `height` → `min-height`.
  Datoteke: `css/flashcards-section.css`, `css/responsive/01-…css`, `css/responsive/02-mobile-core.css`. Cache `?v=20260694`.
- **Provjera:** ciljani Playwright (iPhone SE/13/Pro Max, ubačen dug odgovor) → kontrole uvijek ispod dna kartice, 0 preklapanja;
  puni gate **verify 0/0 + test:responsive 68/68**. Detalji: `docs/records/BUGS.md` §BUG-013.
- **Dalje:** HRV program „Menadžment u Hotelijerstvu" (infra + pilot).

---

## 2026-06-27 — LOGO redizajn (raster → vektor SVG) + repo čišćenje
Nastavak iste sesije. Dvije stvari: (1) počišćeno lokalno smeće, (2) logo prebačen na SVG.
- **Repo čišćenje (~144 MB lokalno, ništa u gitu):** obrisani `test-results/`, svi `tmp-*/`, `tmp/`, `.venv/` + mrtve
  datoteke (`extract_pdfs.py`, `fan_all_text.txt`, `LEARN-PROBLEM-ANALIZA.txt`, `desktop.ini`); food-PDF izvori premješteni
  u `_materials/food-and-nutrition-source-pdfs/` (konvencija). `.gitignore` konsolidiran (`tmp-*/` glob). Commit `978d119` (pushan).
- **LOGO: `logo.png` (raster + crop-hak) → `assets/logo.svg` (vektor).** **Iteracija s renderiranjem** (svaki kandidat → Playwright
  screenshot na 16/40/44/120/200px, tamna+svijetla, pa vizualna ocjena):
  - Prvi pokušaj = trasiran original niske rez → **korisnik: „izgleda kao olovkom skicirano".**
  - Ručno crtani moderni SVG-ovi (cand1–5) → **korisnik: „odvratno / izgleda kao pingvin".** **Pouka: ručno crtanje SVG-a naslijepo = amaterski; kvaliteta dolazi iz ORIGINALA.**
  - **Finalni pristup (odobreno „savršeno"):** ImageMagick **4× upscale → threshold → maska** (makne originalni medaljon-prsten + ramena,
    ostaje samo glava) → **potrace** s zaglađivanjem (`alphaMax 1.3`, `optTolerance 1.6`, hi-res = glatke krivulje) → **auto-fit** (kod
    izračuna bbox glave pa `scale`+`translate` da **cijela glava ispuni krug**, ništa odrezano).
  - Finalni izgled: indigo `#6366f1→#818cf8`, **glava ispunjava cijeli krug** (bez prstena koji viri), bijelo lice s indigo detaljima.
  - **Ožičeno:** 5× `index.html` + 4 legal stranice (`assets/logo.svg?v=20260693`).
  - **CSS:** maknut crop-hak `.logo-image` (`width:150%`/`object-fit:cover` → `100%`/`contain`).
  - **Favikoni regenerirani iz finalnog SVG-a:** `favicon-16/32`, `favicon.ico` (16/32/48), `apple-touch-icon` (180), `icon-192/512`;
    PWA/iOS na `#0f172a`. Dodan **SVG favicon** (`type=image/svg+xml`).
  - **Obrisani** mrtvi `logo.png` + `logo-small.png` + svi pomoćni helperi/preview (`_*.js`, `_logo-*.png`); `potrace` bio `--no-save` privremeno.
  - **Cache:** `?v=20260693` (svg + favikoni; CSS ostao `20260692`).
  - **Gate:** `verify` 0/0, **Playwright 68/68**, vizualni pregled žive nav-trake (logo gladak, glava ispunjava krug).
  - **Status:** ✅ **DEPLOYANO + LIVE 2026-06-28** (`19f07db`); produkcija vraća `logo.svg?v=20260693` HTTP 200. Doc-status→LIVE (`94ad12d`+`fc878f1`).
  - **PWA napomena (`247e5ef`):** korisnik javio da instalirana app još pokazuje stari logo → **zapečena PWA ikona** (server ima novu — sve žive ikone
    provjerene HTTP 200 + nove veličine). Bumpane `manifest.json` ikone (`?v=20260693`) da preglednik prepozna promjenu; konačni fix za već
    instaliranu app = **deinstaliraj + reinstaliraj**. NIJE bug ni problem deploya (cache na klijentu).

---

## 2026-06-27 — BUG-014 (fill prazno = točno) popravljen + LIVE · BUG-013 (flashcard) zaveden · monetizacija/logo plan
Nastavak iste sesije nakon BUG-012; bug-lov + strateško planiranje.
- **BUG-014 (visok) — Fill-in: prazan odgovor + „Provjeri" ispada „Correct!".** Uzrok: `correct.includes(input)` —
  `"x".includes("")` je u JS-u uvijek `true`. Fix (`js/fill-blanks.js`): `isCorrect = input.length>0 && normFill(input)===normFill(correct)`
  (prazno nikad točno; substring-uvjet uklonjen; case + razmak↔crtica tolerancija zadržana). Node-test **9/9**.
  Cache `fill-blanks.js?v=20260691`. **✅ DEPLOYANO + live potvrđen** (`7c70e07`+`dba49ad`).
- **BUG-013 (srednji) — Flashcard: dug tekst na okrenutoj kartici prekrije strelicu „dalje".** ZAVEDEN kao **aktivan**
  (prije bio samo u ROADMAP/CLAUDE, ne u BUGS.md — korisnik primijetio da fali). Uzrok: `.flashcard-front/.back` su
  `position:absolute` → ne rastežu `.flashcard-inner` → duga stražnja strana naraste preko `.flashcard-controls`.
  Plan: **grid-stack** (obje strane u istu grid-ćeliju). **Još NIJE popravljen** — sljedeći na redu.
- **BUGS.md dotjeran:** dodana napomena o opsegu (BUGS.md = bugovi proizvoda; tooling/proces → PROGRESS/CLAUDE/memorija).
- **Strateško planiranje (zapisano u `docs/product/MONETIZATION.md`, NOVO):** Stripe setup + NKD djelatnosti (62.01+63.12 glavne,
  85.59/58.29/63.11 korisne) + firma tate (Waterfront — provjeriti registar/knjigovođu) + PDV/MoR + **tržište matura**
  (~30–40k/god) + scenariji prihoda (oprezni ~4.5k → lider ~180k €/god) + 9 ideja za profit (engine prošlih matura,
  AI tutor, sezonska propusnica, B2B škole, gamifikacija/viral, UGC). Redoslijed: **F6 „tvoj ključ" → propusnica → jedinice → B2B**.
- **Logo (NOVO, korisnik traži poboljšanje — gazi staro pravilo „logo se NE mijenja"):** trenutni `logo.png` = raster Sokrat
  u krugu sa zapečenim plavim sjajem; prikazan trikom `object-fit:cover` 150% (hak). Preporuka: **inline SVG** (oštro/themeable/bez
  haka), zadržati Sokrat-ideju, ikonična glava. Čeka 6 odluka korisnika (vidi razgovor). **Još NIJE rađeno.**

---

## 2026-06-27 — BUG-012: randomizirane vježbe se lome iz baze → POPRAVLJENO + Math gradivo u bazu (✅ LIVE)
Analiza „sljedećih koraka" otkrila ozbiljan **živi bug** pri provjeri Supabasea prije planiranog Math re-synca.
- **Nalaz (dokazan na živoj bazi):** vježbe (`data/<subj>/exercises.js`) imaju randomizirane zadatke s `generate(p)`
  funkcijom. `JSON.stringify` (migracija) **briše funkcije** + loader je u DB-modu preskakao SVE `content.scripts`
  (pa i `stat-lib`/`math-lib`) → randomizirane vježbe **razbijene iz baze** za sve posjetitelje. Pogođeno: **Statistics 23,
  Macroeconomics 25, Accounting 8** randomiziranih (Academic Writing 0 → bio ok). Math (29) namjerno još nije bio u bazi.
- **Rješenje (Opcija A, cigla-po-cigla, 6 cigli):** (1) catalog **`content.codeScripts`** na 5 predmeta s vježbama
  (vježbe+lib = KOD, uvijek iz datoteke); (2) **`content-loader.js`** u DB-modu učita codeScripts iz fajla
  (`filesToLoad = fromDb ? codeScripts : scripts`) — datoteka pregazi lossy DB red; (4) **`verify-catalog.js` čuvar**
  (predmet s vježbama MORA imati codeScripts; dokazano da `verify` pukne bez njega); (Z1) **`migrate-content.js`** više
  ne šalje vježbe.
- **Baza (preko Supabase integracije, uz odobrenje):** (Z2) obrisana **4 reda vježbi** (`...Exercises`); (Cigla 5)
  migrirano **Math gradivo** (`mathM1/M2/Final`, bez vježbi). **Završno: 51 red / 17 predmeta / 0 redova vježbi.**
- **Cache:** `20260689` → **`20260690`** (catalog.js + content-loader.js `?v=`).
- **Gate:** verify 0/0 (+novi čuvar), validate 0/0, test:unit 33/33, **Playwright 68/68**. Deploy potvrđen na živom
  sajtu (index/catalog/content-loader `?v=20260690`, catalog ima 5 codeScripts).
- **Commiti** `e6588aa` (dok) + `b7a6b7f` (loader+catalog) + `0a5b1f7` (migrate) + `801d9a6` (verify-čuvar). **PUSH/DEPLOY**
  `7176194..801d9a6`. **Math sad čita gradivo iz baze kao ostalih 16; vježbe iz datoteke.**
- **Pravilo (novo):** read-path iz baze nosi SAMO čisto-podatkovne varove (M1/M2/Final); **vježbe (kod) UVIJEK iz datoteke.**
  Detalji: `docs/records/BUGS.md` §BUG-012 + `docs/archive/EXERCISES_DB_FIX_PLAN.md`.

---

## 2026-06-27 — Mathematics: K1 learn obogaćen + Gauss-vs-Gauss-Jordan nijansa → ✅ DEPLOYANO (cijeli Math LIVE)
Nastavak nakon compacta — dva preostala sadržajna PENDING-a iz prethodne sesije, pa **prvi deploy cijelog Matha**.
- **K1 learn obogaćivanje** (`mathM1`, midterm-1.js): svih **5 sekcija** prepisano sa šturih (1654–2790 zn) na
  **udžbeničku dubinu kao K2** — intuicija + riješeni primjeri + interpretacija + zamke. Nove duljine:
  realNumbers **4798**, basicEquations **3907**, functions **4197**, differentiation **3520**, extrema **3184** zn.
  ([[learn-sections-must-be-rich]], korisnik tražio bogat learn 3. put.)
- **Gauss vs Gauss-Jordan nijansa** (`mathM2`, gaussJordan kat.): dodano iz Leonove vlastite predavane prezentacije —
  **+2 flashcard** (Gauss = gornji trokut + supstitucija unatrag vs Gauss-Jordan = puna jedinična/RREF; pravilo
  **„operiraj samo redovima, nikad stupcima"**), **+3 quiz**, **+3 fill**, nova **learn-podsekcija** s usporednim matricama.
  Naziv kategorije „Gauss-Jordan Method" → **„Gauss & Gauss-Jordan Method"**.
- **Cache:** CONTENT_VERSION `20260688` → **`20260689`** (+ content-loader.js `?v=`; samo `data/*` mijenjano).
- **Gate (sve zeleno):** KaTeX runtime balans OK (m1 562/562 inline + 47/47 display, m2 202/202 + 36/36,
  final 814/814 + 91/91), validate:content math 0/0, verify 0/0, test:unit 33/33, **Playwright 68/68 (subjects=17, 0 overflow)**.
- **Commit** `4eeccf1` (kod) + `31be03f` (docovi). **Korisnik pregledao formule („sve izgleda odlično") → ✅ PUSH/DEPLOY** `89fd669..31be03f` na `origin/main` (Vercel auto-deploy). **Cijeli Math (b481be5→31be03f, 5 commita) sad LIVE → 1. GODINA HM 9/9 KOMPLETNA** (uz Intro to Hospitality blokiran).
- **⚠️ Preostalo (opcionalno):** Supabase re-sync Math (read-path iz baze) NIJE napravljen — Math se servira preko **file-fallbacka**. *(→ NAPRAVLJENO ISTI DAN, vidi gornji unos „BUG-012": Math gradivo migrirano u bazu `801d9a6`.)*

---

## 2026-06-26 — NOVI predmet: Mathematics (1. god, sem 1) — KaTeX — K1+K2+Final (lokalno, NEdeployano)
**Zadnji 1.god predmet.** Materijali `…/1. godina Hospitality Managament/Math` (deckovi 1–6,8,9,11 + 4 prezentacije-lekcije
koje je profesorica zadala studentima pa iz njih predavala — NE seminari). **K1 = teme 1–5, K2 = teme 6–11** (granica iz silabusa).
- **Study:** `mathM1` (5 kat: realNumbers/basicEquations/functions/differentiation/extrema; 48fc/44quiz/34fill) + `mathM2`
  (4 kat: integralElasticity/annuities/loans/gaussJordan; 25fc/28quiz/24fill) + `mathFinal` (hibrid+examPractice; **10 kat/79fc/79quiz/64fill**).
- **Exercises:** `exercises.js` **39 vježbi** (26 K1 + 13 K2) + `math-lib.js` (gcd/quadratic/polyEval/polyDeriv). 28 randomiziranih
  **brute-force verificirano (72.173 field-checka, 0 problema)**; financijske formule (anuiteti/zajmovi) **točne do centa** vs slajdovi.
- **⚙️ ENGINE PROMJENA (js/exercises.js):** 4 čuvana `renderMath()` poziva nakon mounta → **exercises sad renderiraju KaTeX** (prije
  sirovi `\(...\)`). Currency-safe + no-op za tekstualne; **Statistics/Accounting verificirano netaknuti**. Aditivno, 0 promjena tipova vježbi.
- **K2 learn OBOGAĆEN** na udžbeničku dubinu (intuicija + riješeni primjeri + zamke; 3000–4787 zn) nakon zamjerke korisnika
  ([[learn-sections-must-be-rich]], 3. put). Catalog `math` (year1/sem1, `fa-square-root-variable`/violet). Cache `20260688`.
- **Commitano lokalno:** `b481be5` (K1) + `c49422a` (K2+Final+exercises-KaTeX). Gate: validate 0/0, verify 0/0, test:unit 33/33, **Playwright 68/68 (subjects=17)**.
- **Bug ulovljen ranije u sesiji:** smoke-test testira SAMO prvu resolve-lekciju po predmetu → K2/final render NIJE bio pokriven; dodan ciljani render-test (prošao).
- **⚠️ PENDING (nakon compacta):** (a) **K1 learn obogaćivanje** (5 sekcija tanke 1654–2790zn → kao K2); (b) **Gauss vs Gauss-Jordan nijansa**
  (Gauss/gornje-trokutasta + „samo retci, ne stupci"); (c) korisnikov pregled formula; (d) push/deploy. Plan `docs/subjects/MATH_PLAN.md`.

## 2026-06-24 — NOVI predmet: Traffic in Tourism (1. god, sem 2) — ručno iz predavanja
**Sljedeći predmet 1. godine po roadmapu** ([[content-roadmap-sequencing]]). Korisnik dostavio 13 PDF-ova
(`…/1. godina Hospitality Managament/Traffic in tourism`). Ručno (NE generator) jer je činjenično specifičan i ima rupe/izvještaje.
- **Analiza + plan:** `docs/subjects/TRAFFIC_PLAN.md`. Silabus (DINP, 6 ECTS) = autoritet: **1. kolokvij = tjedan 7 → K1 = tjedni 1–6,
  K2 = tjedni 7–15.** Klasifikacija materijala: **8 nastavnih deckova** (INTRO admin + TJ3/TJ4&5/Rail/Air/Maritime/SAFETY/Sustainable) + **4 EU izvještaja**
  (CO2/road-safety/climate/figures) korišteni SAMO kao izvor činjenica (safety+ecology), NE kao teme. **Rupe** (tjedni 1–2 theoretical basis + interdependence;
  tjedan 10 value&quality) autorski iz silabusa + standardne transportne teorije (INTRO.pdf je samo administrativan).
- **Build:** `data/traffic/` `midterm-1.js` (`trafficM1`, **6 kat**) + `midterm-2.js` (`trafficM2`, **7 kat**) + `final.js` (`trafficFinal` =
  `Object.assign({}, M1, M2, {examPractice})`, ZADNJI). **Master-obrazac predmeta:** svaki mod = CONNECTOR (market↔destinacija) + TOURISM PRODUCT.
  Finalni **27 kat / 189 fc / 186 quiz / 188 fill**. Learn = bogat udžbenički stil ([[learn-sections-must-be-rich]]). Kvalitativan → bez KaTeX/Exercises (korisnik).
- **Catalog:** subject `traffic` (year 1, sem 2, `fa-route`/amber `#f59e0b`), 3 lekcije + 3 scripta + resolve. Cache `CONTENT_VERSION 20260684→20260685`
  (+ catalog.js i content-loader.js `?v=` u index.html). `.gitignore` + `tmp-traffic/`.
- **Gate:** `validate:content traffic` 0/0 · `verify` 0/0 · **Playwright 68/68** (`traffic ✓ ok`, subjects=16, problems=0).
- **✅ DEPLOYANO 2026-06-25 (`62a4119`, uz izričitu potvrdu korisnika); Supabase re-sync `migrate-content.js traffic` 3/3.** `origin/main` sinkroniziran.
- **Dalje:** **Math** (zadnji 1.god predmet, `docs/subjects/MATH_PLAN.md`; KaTeX spreman, materijali 100 JPG+PDF).

---

## 2026-06-23 — PRVI GENERATOR-PILOT: Academic Writing (study + citation exercises) + generator očvrsnut
**Prvi predmet izgrađen end-to-end kroz generator** (1. god, sem 1; *Essentials of Academic Writing*). 13 PDF predavanja → 12 tema.
- **Pipeline:** stage PDF-ova u `tmp/` podmape (midterm-1/2) s čistim imenima → `build-topics` → `generate-subject` (Sonnet) → `assemble-subject` →
  catalog + bump (`20260681`). Granica **K1=tjedni 1–6 / K2=8–14** (kolokvij tjedan 7, zato nema tjedna 7). Study: **24 kat / 336 fc / 286 quiz / 240 fill**
  (K1: fundamentals/lit-review/research-methods/thesis-structure/databases; K2: types-of-publications, **Chicago** books/journals/other, research-qualities,
  ethics & Latin; finalni hibrid). Commit `c34d88a` (sadržaj).
- **FAZA 2 — citation EXERCISES** (`73bca5e`): `data/academic-writing/exercises.js` (`academicWritingExercises`), **15 vježbi / 86 items** na
  NEDIRNUTOM enginu (korisnikov zahtjev — Chicago „jako puno na testu"). Tipovi `choice`(mc/tf)+`classify`: dva Chicago sustava, autorska pravila,
  prepoznaj t/R/n/B (classify), odaberi točan format, časopisi, ostali izvori, latinske kratice (match), etika/plagijat, primary/sec/tertiary.
  Node-verificirano: sve vježbe grade na pun rezultat s točnim odgovorima.
- **⚠️ PILOT OTKRIO+POPRAVIO 5 generator-bugova** (`48f38da`): (1) navodnici (Chicago citati, Boolean `""`) → **nevaljan JSON** (¼ tema padala) →
  prešao na **Anthropic `tool_use` structured output** (API jamči objekt); (2) `learn` dolazi kao JSON-string → `coerce()`; (3) `tool_use` nekad
  isprazni `learn` → **retry do 3×**; (4) Windows libuv/undici teardown assertion → eksplicitan `process.exit`; (5) `assemble-subject` skidao
  navodnike s hyphen-ključeva u catalog-ispisu → regex sad samo valjani JS identifikatori. Raw-dump padova u `tmp/failed-*.txt`.
- **Gate:** validate:content 0/0 · verify 0/0 · test:unit 33/33 · **Playwright 68/68 (subjects=15)** · iPhone-SE-375 0 overflow · **moj Chicago
  činjenični spot-check (flashcards + quiz `correct`) protiv slajdova — točan**.
- **💰 Trošak ≈ $2.27** (korisnikov ključ) — gotovo sve na DEBUG re-runovima (5 bugova). Skripta sad robusna → budući predmet ~$1–1.5, bez debuga.
- **FAZA 3 — novi reusable tip vježbe `cite`** (`ada5b99`, cache `20260682`): korisnik tražio vježbu gdje se **upiše cijeli citat** pa sustav
  prepozna je li točno napisan. Dodano EKSTENZIJOM enginea (ne hack): `normalizeCite()`+`gradeCite()` u `exercises-core.js` + `cite` widget +
  CSS + 9 unit-testova (core 104/104). **Pametno-tolerantno** (korisnikov izbor): case/razmaci/navodnici/en-em-crtica/završna točka forgiven, ali
  zarezi/točke/dvotočke/redoslijed bitni; točan odgovor se UVIJEK pokaže. 2 cite-vježbe (7 items: author-date reference za knjige/časopise/novine/
  disertaciju + in-text), odgovori iz slajdova. Gate: test:unit 104/104 core, verify 0/0, validate 0/0, Playwright 68/68. Doc `docs/architecture/EXERCISES_ENGINE.md` §2.
- **Dalje:** Blok B (sadržaj→Supabase+/api) ili još pilot-predmeta. **6 commita ispred origin** (+10 ranijih = sve čeka push, NIJE pushano).

## 2026-06-24 — Doc audit (svi .md izglancani) + budući planovi zapisani + compact-pravilo
- **Audit svih 21 projektnih `.md`** (korisnik: „sve mora biti savršeno za daljnji rad"). Ispravljeno 13 datoteka u 2 vala:
  README/docs-README/ROADMAP/DECISIONS(+ADR-010/011)/TESTING (1. val) + ARCHITECTURE/PRD/VISION/CONTENT_INTAKE/BACKLOG/
  ACCOUNTING_PLAN/STATISTICS_PLAN (2. val). Glavne greške: zastario status 1. god, `$...$`→`\( \)` math delimiteri (2×),
  read-path opisan kao `/api` umjesto direktni supabase-js, planovi pisali „prijedlog" a gotovi, „nemamo automatske testove".
- **Budući planovi zapisani** (korisnik 2026-06-24): **A)** sadržaj 1. god po redu: **Traffic in Tourism** (sljedeći, treba materijale)
  → **Math** (zadnja, novi **`docs/subjects/MATH_PLAN.md`**); ⛔ **Intro to Hospitality BLOKIRAN** (nema PDF-ova). **B)** nakon sadržaja:
  **Admin CRUD → AI tutor → priprema za MATURU.** **C)** strateški (TBD): **HRV program „Menadžment u ugostiteljstvu"** (prijevod
  HM, aktivira i18n) · **3. godina** · **studentski UGC za 3./4. god** (HR/EN neodlučen). Zapisano u ROADMAP §DALJE + BACKLOG §Strateški + VISION.
- **NOVO PRAVILO (CLAUDE.md §KRITIČNA #6 + [[doc-audit-before-compact]]):** prije SVAKOG compacta Claude prolazi APSOLUTNO SVE `.md` i provjerava da točno pišu.
- **Novi doc:** `docs/subjects/MATH_PLAN.md` (materijali 100 JPG+PDF, KaTeX gotov, worked-problems, K1/K2 iz silabusa, gate). Dodan u oba indeksa.
- Sve = docovi/memorija (nema koda) → bez cache-bumpa/testova. **Priprema za compact.**

## 2026-06-23 (2) — BLOK B: read-path SADRŽAJ IZ SUPABASEA (aktivirano)
**Sadržaj se sad čita iz baze** (direktno anon keyem, javan; bez `/api`/service-keya na frontu), s **fallbackom na datoteke**.
- **B-1 schema** (`supabase/schema.sql`): `public.subject_content` (1 red=1 window var: `subject_id,var_name,payload jsonb`) + public-read RLS (`using(true)`).
- **B-2 migracija** (`scripts/migrate-content.js`): vm window-shim → `data/<subj>/*.js` (final već Object.assign-an u sandboxu) → REST upsert (`merge-duplicates`,`on_conflict`). `.env`: `SUPABASE_URL`+`SUPABASE_SERVICE_KEY`.
- **B-3 frontend** (`js/content-loader.js`): `CONTENT_FROM_SUPABASE` flag + `_loadSubjectFromSupabase()` (anon select → `window[var]=payload`); fallback na datoteke ako prazno/greška.
- **Aktivacija (korisnik odradio dashboard):** pokrenuo schema → dao `service_role` key (u `.env`, gitignored) → migrirao **49 redova / 15 predmeta** → flipnuo flag `true`.
- **Gate:** anon REST 49/49 redova čitljivo, **Playwright 68/68** (sadržaj iz baze; +network vrijeme = potvrda DB-puta). **Datoteke ostaju izvor istine** (baza=zrcalo, re-sync skriptom).
- **⚠️ free tier:** projekt se uspava ~7 dana neaktivnosti → „Restore" BESPLATAN (NE treba $25); uspavan = sadržaj iz datoteka (fallback), login/sync ne rade dok ne restoreaš. Cache `20260684`. Commiti `077d375` + aktivacija. **20 commita ispred origin (NEDEPLOYANO).**

## 2026-06-22 — GENERATOR PREDMETA (jezgra bricks 1–4) + macro B11–B12 deploy
**Strateška odluka korisnika:** dosta ručnog dodavanja predmeta → graditi **generator uz minimalan Opus-usage**, PA **Blok B**
(backend MVP = **sadržaj→Supabase + `/api`**, ne AI tutor/UGC zasad). Plan: [CONTENT_GENERATOR.md](../workflow/CONTENT_GENERATOR.md). Cigla-po-cigla:
- **Brick 1 `validate-content.js`** (`0c3dc8e`, `npm run validate:content`) — vm window-shim učita data (stari+novi format), validira shemu
  (name/icon/color, flashcard q+a, quiz options 2–6 + valjan `correct`, fillBlank `_______`, learn.content) + **KaTeX currency-safe** (uravnoteženi
  `\(`/`\[`/`$$`, lookbehind da `\\[2pt]` ne broji). Svih 14 živih predmeta → **0/0** (4000+ stavki); ulovio i vlastiti regex-bug.
- **Brick 2 `build-topics.js`** (`a06b07e`) — materijali (PDF preko pdf-parse / TXT / MD), jedan fajl=jedna tema, kolokvij iz imena podmape;
  izlaz `tmp/<id>/topics.json`. `tmp/` dodan u .gitignore (zaštićeni tekst).
- **Brick 3 `generate-subject.js`** (`cac9135` + fix `2043747`) — po temi zove **Anthropic API (Sonnet, korisnikov `.env` ključ)**, strogi
  schema-prompt + few-shot; dodaje name/icon/color; `tmp/<id>/draft.json`. Ugrađeni .env loader, native fetch, `--dry/--math/--topic/--limit`.
  Fix: max_tokens 8000→16000 + temperature 0.3 + detekcija `stop_reason=max_tokens`. Test: 14fc/10quiz/10fill, ~$0.033/tema.
- **Brick 4 `assemble-subject.js`** (`3d89e89`) — `draft.json` → `data/<id>/{midterm-1,2,final}.js`; **tijela preko JSON.stringify → escaping
  bajt-točan (KaTeX `\(`/`\[`, navodnici, `\\` DOKAZANO round-trip)**; vm self-check; **ISPISUje** catalog unos + checklist (NE dira catalog.js).
- **Pregled prije compacta:** sustav zdravo dizajniran; popravljen 1 stvarni rizik (truncation, gore). Odgođeno (nije bug): orkestrator
  `npm run generate`, examPractice za finalni, graf-slike, quiz self-grade. Limit: validator jamči quiz `correct` u rasponu, ne i stvarnu točnost → spot-check.
- **macro B11+B12 deployano** (`58cc37c..28fcb7e`, uz potvrdu) — Track B 100% LIVE.
- **Stanje:** generator-jezgra GOTOVA, **commiti dev-tooling/docs NISU pushani** (bez produkcijskog efekta). **Sljedeće:** pravi pilot-predmet
  (kad korisnik donese materijale) → cijeli pipeline + Opus spot-check; pa Blok B. [[content-generator-pipeline]] [[content-roadmap-sequencing]]

---

## 2026-06-22 — MACROECONOMICS Track B: B11–B12 → Track B 100% KOMPLETAN
**Nastavak od 2026-06-18.** Dovršene zadnje dvije cigle second-midterm vježbi; **commitano lokalno, čeka push** (deploy samo uz potvrdu).
- **B11 — openEconomyGoods** (`ddc4618`, chapter 12, second-midterm): 7 vježbi. Otvoreni multiplikator `1/(1−β(1−t)+m)`
  (zatvoreni vs otvoreni — worked β=0.8/t=0.1/m=0.12 → 3.57 vs 2.5), import funkcija `IM=IM₀+mY`, net exports `NX=X−IM`,
  demand for domestic goods `Z=(C+I+G)−IM+X`, fiskalna ekspanzija → NX pada, 2 randomizirana drilla (mult; NX). β/t/m DECIMALE.
  Verifier 36 provjera 0 (+neovisni: geometrijski red za multiplikator, `Z=(C+I+G)+NX`, `ΔNX=m·ΔY`). Cache `20260678`.
- **B12 — balanceOfPayments** (`bfabcb1`, chapter 13, second-midterm, ZADNJA): 7 vježbi. BoP računi + sumira na 0, travel
  balance `income−expenditure`, current account iz 4 komponente, turizam pokriva goods deficit (HR), financiranje CA deficita
  (`financial=−CA`, BoP=0), `K=f(r)` opadajuća (concepts), 2 randomizirana drilla. Iznosi tol 0. Verifier 36 provjera 0. Cache `20260679`.
- **✅✅ MACROECONOMICS TRACK B 100% (B1–B12, ~81 vježbi):** first-midterm B1–B6 (41) + second-midterm B7–B12 (~40). Engine NEDIRNUT,
  sve u `data/macroeconomics/exercises.js`. Final lekcija → Exercises prazan (tagano na kolokvije, dosljedno sem-2).
- **Provjere:** svaka cigla node brute-force (grade-correct + diskriminacija + NaN) 0 problema · `verify` 0/0 · Playwright **68/68** (subjects=14, 0 overflowa).
- **Stanje:** B11 + B12 commitano lokalno, **2 ispred origin — ČEKA push**. B1–B10 već LIVE (`58cc37c`).
- **Sljedeće:** push B11+B12 (uz potvrdu) · **Math (ZADNJA u roadmapu)**. [[macroeconomics-exercises-plan]] [[content-roadmap-sequencing]]

---

## 2026-06-18 — MACROECONOMICS: sem→2, Track B vježbe B1–B10, code review → ✅ DEPLOY
**Nastavak od 2026-06-17.** Macro premješten + 10 ciglom-po-cigla vježbi; **deployano uz izričitu potvrdu korisnika** (B11–B12 ostaju za poslije).
- **Macro → year 1, semestar 2** (`21afdf1`, korisnikov zahtjev; bilo sem 1). catalog.js `?v` 20260667. verify 0/0, browse 8/8.
- **▶ TRACK B vježbe — interaktivne, cigla-po-cigla** (plan/status: [[macroeconomics-exercises-plan]]). Engine NEDIRNUT, sve u
  `data/macroeconomics/exercises.js`; makro NE treba biblioteku (sve inline u `generate()`). Konvencije: stope % 1dp/tol 0.1, cijeli tol 0,
  multiplikator/omjeri 2dp/tol 0.05, output/PV 1dp/tol 0.5. Verify svake cigle = node brute-force (neovisni preračun drugom formulom/identitetom
  + grade-correct kroz cijeli prostor params + diskriminacija + NaN-provjera). **⚠ Randomizirani `generate(p)` MORA čitati `p.pair.X`** (pickParams
  sprema izabrani objekt iz `choices` pod ključ) — bug iz B2.
  - ✅ **B1** fundamentals + unemployment&inflation (`51ef0a6`, 46 provjera).
  - ✅ **B2** gdpMeasurement (`09458b8`) — **bug ulovljen prije commita: `p.nom`/`p.y1` umjesto `p.pair.*` → NaN; popravljeno.** 60 provjera.
  - ✅ **B3** nationalAccounts (`0f5407b`, 79 provjera).
  - ✅ **B4** goodsMarket (`0e41c6f`) — multiplikator/ravnotežni Y/ΔY/porezni mult.; 103 provjere (+neovisni fixed-point ravnoteže).
  - ✅ **B5** financialMarkets (`dc33135`) — ravnotežni `i` iz `M=Y(0.4−i)`, bond yield, open-market; 89 provjera. **⚠ verifier-bug: stroga `===` na floatu → `Math.abs(...)<1e-9`.**
  - ✅ **B6** isLmModel (`9b2ab98`) — IS/LM, fiskalna/monetarna, policy mix, randomizirani comparative-statics. KVALITATIVAN→choice. 152 provjere (+teorija smjerova). **→ FIRST-MIDTERM SET (B1–B6, 41 vj).**
  - ✅ **B7** labourMarket (`130a2ff`) — `W/P=1/(1+μ)`, prirodna stopa `uₙ`, prirodni output `Yₙ`; 102 provjere (+neovisni identiteti).
  - ✅ **B8** mediumRun AS-AD (`2573eda`) — AS/AD, money neutrality, Pᵉ proces, shock-drill. KVALITATIVAN→choice. 154 provjere (+teorija demand→AD/supply→AS).
  - ✅ **B9** longRun (`982babd`) — `Y/N`, `I=sY`, `K_next=(1−δ)K+I`, compound `Y0(1+g)^n`; 98 provjera (+compound preko neovisne petlje).
  - ✅ **B10** expectations (`a0754e7`) — Fisher `r=i−πᵉ`, present value `z/(1+r)ⁿ`, efekt kamate na PV; 83 provjere (+identiteti `r+πᵉ=i`, `PV·(1+r)ⁿ=z`).
  - **Ostaje B11–B12** (poslije): openEconomyGoods · balanceOfPayments. **Final lekcija → Exercises prazan** (tagano na kolokvije).
  Cache `CONTENT_VERSION=20260677`. **verify 0/0, Playwright 68/68 (subjects=14) nakon SVAKE cigle.** Test režim: puni Playwright po cigli (korisnik 2026-06-18).
- **CODE REVIEW cijelog projekta (korisnik tražio):** stanje **vrlo dobro** — čista arhitektura (engine=čiste funkcije bez DOM-a, catalog SSOT,
  lazy-load seam, sigurnost OK: publishable key javan po dizajnu + RLS), 0 debug-ostataka, dobar test-suite. **Nalazi (ništa kritično, vidi BACKLOG):**
  (1) mrtav `lessonCategoryMap` u `js/config.js` (entrepreneurship `second-exam-prep`/`final-exam-prep` više ne postoje → fallback na sve kat., bezopasno);
  (2) `resolveExercise` ([exercises.js:489](../js/exercises.js)) na throw u `generate()` vrati bazni `ex` bez polja; (3) stari root `data-*.js` (sem-2) još nelaazy-splitani (ADR-006, Blok B);
  (4) cloud-sync „broj→max" pretpostavlja monotone brojače. **Potvrđeno: `resolveExercise` radi `Object.assign({},ex,generate(pickParams))` → moj brute-force verno replicira runtime.**

---

## 2026-06-17 — ✅ MACROECONOMICS study gradivo (K1 + K2 + finalni hibrid) + šav za vježbe — LOKALNO (čeka pregled/deploy)
**Treći kvantitativni predmet (KaTeX), cigla-po-cigla.** Iz 19 lecture PDF-ova (Blanchard-stil) u `…/1. godina Hospitality Managament/Macroeconomics`.
- **K1/K2 granica AUTORITATIVNA iz službenih test-prep deckova:** `Preparation for Test1` (GDP → goods market → money market → IS-LM) i
  `Lecture 11 Preparation for Test 2` (cijela open economy) + `PREPARATION FOR TEST LECTURE 7` (labour market). Rez = klasičan Blanchard:
  **K1 = Intro + L2–L5** (kratki rok, demand), **K2 = Ch6 + AS-AD + Long Run + Expectations + Open Economy** (srednji/dugi rok + vanjski sektor).
- **K1** `data/macroeconomics/midterm-1.js` (`macroeconomicsM1`, **7 kat / 64 fc / 63 quiz / 56 fill**): fundamentals, unemployment&inflation,
  GDP (nominal/real/growth), national accounts, goods market, financial markets, IS-LM. **K2** `midterm-2.js` (`macroeconomicsM2`, **6 kat /
  55 fc / 52 quiz / 47 fill**): labour market & natural rate, AS-AD (medium run), long-run growth, expectations, open economy (trade/FX),
  balance of payments. **Finalni** `final.js` (`macroeconomicsFinal` = `Object.assign(M1,M2,{examPractice})`, ZADNJI) → **14 kat / 131 fc /
  127 quiz / 112 fill**; examPractice = cross-topic luk (kratki↔srednji↔dugi rok) + KaTeX master-popis formula.
- **Riješeni KaTeX primjeri provjereni protiv test-prep brojeva:** multiplikator `C=250+0.75YD`→4 (`ΔG=100→ΔY=400`); ravnoteža `C=500+0.5YD,
  T=600,I=300,G=2000`→**Y=5000**; ravnotežna kamata `Mᵈ=Y(0.4−i),Y=150,Mˢ=50`→**i≈6.7%**; realni GDP `325·100/130`→**250**; prirodna stopa
  `μ=5%→W/P=0.952→uₙ=4.8%`; otvoreni multiplikator `β=0.8,t=0.1,m=0.12`→**3.57→2.5**; Fisher `4%−2%=2%`.
- **Šav za vježbe ožičen (prazan):** `data/macroeconomics/exercises.js` (`window.macroeconomicsExercises`, prazna lista) + catalog
  `features.exercises:true` + `content.exercises:'macroeconomicsExercises'` (skripta učitana ZADNJA). Engine NEDIRNUT, 0 novih `js/`.
  Makro matematika je elementarna algebra → ide inline u `generate()`, **NE treba stat-lib-stil biblioteku**. → Track B vježbe = zaseban kasniji blok.
- **Catalog:** novi subject `macroeconomics` (year 1, **sem 1**, `fa-chart-area`/amber `#f59e0b`), sve 3 lekcije mapirane (scripts midterm-1/2/final/exercises).
  **KaTeX currency-safe** (inline `\(\)` 248/248 + display `\[\]` 40/40 balansirano; 0 single-`$` u sadržaju, samo 3 u komentar-headerima). `tmp-macro/` gitignored.
- **Provjere:** `CONTENT_VERSION 20260665` (catalog.js+content-loader.js `?v`). verify 0/0, node render-sanity (14 kat, 0 kolizija M1/M2), **Playwright 68/68** (subjects=14, 0 overflow).
- **✅ LEARN OBOGAĆEN (isti dan, korisnik: „learn sekcije pre male i pre šture — povećat i obogatit puno više"):** svih 13 tematskih Learn sekcija
  (7 K1 + 6 K2) prepisano u udžbenički stil (3–4× više sadržaja): konceptualna motivacija → def + **intuicija** → mehanizam korak-po-korak →
  riješeni primjeri **s interpretacijom** → `warning-box` zamke + `tip-box` veze. examPractice (final) ostao bogat roadmap-capstone. Recept iz
  Statistics Track A; zabilježeno kao trajna preferenca [[learn-sections-must-be-rich]] (vrijedi i za Math). KaTeX i dalje balansiran (K1 inline
  122/122+display 27/27; K2 158/158+25/25; 0 single-`$` u sadržaju). Cache `20260666`. verify 0/0, Playwright 68/68 (0 overflow).
- **Sljedeće:** Track B vježbe (kasnije, na zahtjev) · Math (ZADNJA). [[content-roadmap-sequencing]]

---

## 2026-06-16 — ✅ STATISTICS nadogradnja: Learn teorija (Track A) + interaktivne EXERCISES (Track B, T1–T9) — DEPLOYANO
**Cigla-po-cigla po `docs/subjects/STATISTICS_PLAN.md`.** Korisnik (2026-06-15): Learn je bio preformulni („samo formule nabacane"), Statistika
ima velik teorijski dio → **(A)** obogatiti teoriju + **(B)** dodati interaktivne vježbe kao Accounting. Odluka: dovršiti cijeli Track B
pa **jedan čist deploy** (Exercises tab na K2 ne smije biti prazan). Korisnik morao otići → „kada zavrsis sa svime deployaj".
- **Arhitektura (zaključana):** generički engine **NEDIRNUT** (`js/exercises-core.js`+`js/exercises.js`+`css/exercises.css`), **0 novih
  datoteka u `js/`**. Statistika 100% u `data/`: `data/statistics/exercises.js` (content pack) + `data/statistics/stat-lib.js`
  (content-layer matematika, `window.StatLib`+`module.exports`, lazy preko `content.scripts`, učitan PRIJE exercises.js). SL-most na
  vrhu packa radi u pregledniku i nodeu.
- **Track A (A1–A3, `37edca1`/`5022c6d`/`3f0725a`):** svih 10 Learn sekcija (K1 ×6 + K2 ×3 + finalni examPractice) dobile pravu teoriju
  (def/intuicija/interpretacija/zamke + warning-boxovi). KaTeX currency-safe.
- **Track B (B0→B3):** B0 žica (`5101dcb`) · B0.5 de-risk parsiranja `parseAmount` za leading-zero decimale (`cfc04a6`, +stat-parse.test) ·
  B1 `stat-lib.js`+test (`bc1b0df`, 33 testa) · **B2.1** deskriptiva T1–T2 (`ad39a35`+tol-fix `3d15d61`) · **B2.2** vjerojatnost T3 (`82c06d5`) ·
  **B2.3** diskretne RV T4 (`b824bba`) · **B2.4** normalna T5 (`c8806b8`) · **B2.5** sampling T6 (`0e17b1c`) · **B2.6** CI T7 (`1884dea`) ·
  **B2.7** hipoteze T8 (`8f86dea`) · **B2.8** regresija T9 (`cc792f8`).
- **Rezultat: 56 vježbi** — 35 first-midterm (T1–T6) + 21 second-midterm (T7–T9). Tipovi choice/numeric/ratio s randomizacijom. Tol-politika:
  vjerojatnosti 2dp/0.01, deskriptivni 1–2dp/0.05, cijeli 0. **Final lekcija → Exercises prazan** (sve tagano na kolokvije; dosljedno sem-2).
- **Verifikacija (obrazac na svakoj cigli):** node skripta koja (a) neovisno preračuna, (b) hrani grader student-zaokruženim točnim
  odgovorom kroz CIJELI prostor parametara, (c) provjeri da promašaj pada. Ukupno >700 kombinacija + z/t-tablica cross-check.
  **Bug ulovljen u B2.6:** α/2=(1−conf/100)/2 zanosio na 0.0499… → promašaj t-tablica ključa → eksplicitna mapa conf→area.
- **Provjere:** verify 0/0, test:unit 33/33 (+ stat-parse + stat-lib), Playwright 68/68. Cache `20260658→20260664`.
- **DEPLOY 2026-06-16:** sve gore (study gradivo iz prethodne sesije + Track A + Track B) gurnuto na `origin/main` uz izričito odobrenje.

## 2026-06-14 — ✅ STATISTICS 100% KOMPLETAN (K1 + K2 + finalni hibrid) — drugi kvantitativni predmet (lokalno, čeka deploy)
**Drugi kvantitativni predmet (KaTeX), 2. predmet 1. godine nakon Micro u nizu.** Korisnik izabrao „Statistics, ručno (kao Micro)".
- **Intake:** materijali `…/1. godina Hospitality Managament/Statistics` (26 datoteka) — **topic deckovi T1–T9** (Newbold/Carlson
  *Statistics for Business & Economics*), formula-sheet + **midterm-example answer-keyevi** (1./2.). Ekstrakcija `node scripts/pdf-text.js`
  → `tmp-stats/` (gitignored). **K1/K2 granica AUTORITATIVNA iz službenih midterm-materijala: K1 = T1–T6, K2 = T7–T9** (prep-doc za
  1. kolokvij pokriva do CLT/sampling distributions; 2. midterm answer-key = CI + hypothesis testing + regression).
- **K1 — `data/statistics/midterm-1.js` (`statisticsM1`), 6 kat / 61 fc / 60 quiz / 48 fill:** describingDataGraphical (T1: pop/uzorak/
  parametar/statistika, tipovi podataka & razine mjerenja, grafovi, frekv. distribucija w=(max−min)/k), describingDataNumerical
  (T2: mean/median/mode, range/IQR/var/SD/CV, Chebyshev, empirijsko pravilo 68-95-99.7), probability (T3: sample space, unija/presjek,
  uvjetna, nezavisnost, kombinacije), discreteRandomVariables (T4: E(X), binomna μ=nP, Poisson μ=σ²=λ), continuousRandomVariables
  (T5: PDF/CDF, normalna, Z=(X−μ)/σ, standard normal), samplingDistributions (T6: SE=σ/√n, CLT, p̂). + riješeni primjeri (varijanca, normalna, CLT).
- **K2 — `data/statistics/midterm-2.js` (`statisticsM2`), 3 kat / 35 fc / 30 quiz / 24 fill:** confidenceIntervals (T7: point/interval,
  z (σ poznata) & t (σ nepoznata, df=n−1), proporcija, ME, width=2ME), hypothesisTesting (T8: H0/H1, α, Type I/II + power, z/t test,
  p-value, proporcija), regression (T9: least squares b1/b0, SST=SSR+SSE, R²=SSR/SST, se²=SSE/(n−2), slope t-test df=n−2, F=t²).
  + riješeni primjeri (CI 95%, right-tailed z test, regresija b1=−0.4/R²=0.576).
- **FINALNI — `data/statistics/final.js` (`statisticsFinal`)** = `Object.assign({}, statisticsM1, statisticsM2, {examPractice})`,
  **učitava se ZADNJI** (čita window vars; node `require`). K1 (6) + K2 (3) bez kolizije → **10 kat (9 tema + examPractice) /
  108 fc / 102 quiz / 80 fill.** `examPractice` = cross-topic luk (describe → probability → distributions → inference → regression)
  s KaTeX `aligned` master-popisom (mean/s², Z, SE, CI, test-stat, regresija) + roadmap T1–T9.
- **Catalog:** novi subject `statistics` (year 1, **sem 1 — POTVRĐENO (korisnik, 2026-06-15)**; `fa-chart-simple`/rose
  `#f43f5e`), sve 3 lekcije mapirane (scripts midterm-1/2/final, final ZADNJI). **KaTeX currency-safe** (kombinirano `\\(\\)` 540/540 +
  `\\[\\]` 45/45 balansirano; 0 single-`$`).
- **Cache:** `CONTENT_VERSION` `20260649 → 20260650` + `catalog.js`/`content-loader.js` `?v=20260650` u index.html. `.gitignore` += `tmp-stats/`.
- **Provjere:** verify **0/0** (13 predmeta, statistics M1/M2/Final deklarirani+na window) · node struktura **0 grešaka**
  (final 10 kat/108fc/102quiz/80fill) · **Playwright 68/68** (`subjects=13 problems=0 errors=0`, 0 horizontalnog overflowa).
- **▶ Dalje:** Macroeconomics (~19 datoteka, kvantitativni, KaTeX spreman); **Math ZADNJA.** [[content-roadmap-sequencing]]

---

## 2026-06-14 — ✅ MICROECONOMICS 100% KOMPLETAN (K1 + K2 + finalni hibrid) — prvi kvantitativni predmet ✅ LIVE (deployano `236e303`)
**Dovršen 2. kolokvij + finalni → Microeconomics je gotov.** Nastavak istog dana nakon K1 (vidi entry niže).
- **K2 NAPISAN IZ DECKA — `data/microeconomics/midterm-2.js` (`microeconomicsM2`), 7 kategorija / 75 fc / 70 quiz / 56 fill:**
  `profitMaximization` (Ch8/TU7: π=TR−TC, MR=MC, price-taker P=MR=MC, shut-down P<AVC, SR supply, LR zero profit, ekonomska renta
  + riješeni primjer P=MC), `competitiveMarkets` (Ch9/TU8: consumer/producer surplus, deadweight loss, price ceiling→shortage /
  floor→surplus, tax incidence po elastičnosti, subvencija, kvote/tarife + riješeni primjer CS=1800), `monopolyMonopsony`
  (Ch10/TU9: MR<P, linearno MR=a−2bQ, Lerner index (P−MC)/P=−1/Ed, sources/social cost, natural monopoly, monopsony MV=ME
  + riješeni primjer P=100−Q, MC=20 → Q=40/P=60), `monopolisticOligopoly` (Ch12/TU10: differentiated/excess capacity, Nash,
  Cournot/Stackelberg/Bertrand, prisoners' dilemma, kinked demand/price leadership, kartel OPEC/CIPEC), `gameTheory`
  (Ch13/TU11: dominant strategy, Nash, maximin, mixed, repeated/tit-for-tat, sequential/first-mover, credibility, entry
  deterrence, winner's curse + riješeni primjer payoff-matrice), `factorMarkets` (Ch14/TU12: derived demand, MRP_L=P×MP_L,
  hiring MRP=w, average/marginal expenditure, backward-bending labor supply, ekonomska renta, monopsony ME=MRP, unije
  + riješeni primjer MRP=50), `externalitiesPublicGoods` (Ch18/TU13: MSC=MC+MEC, MSC=MSB, Pigouvian fee/standard/permits,
  Coase theorem, common-pool/tragedy of commons, public goods nonrival+nonexclusive, free-rider + riješeni primjer MSC=14).
- **Mapiranje TU→Pindyck poglavlje provjereno iz decka** (TU7=Ch8 … TU13=Ch18) → savršeno odgovara silabusnoj granici K2 = Ch 8,9,10,12,13,14,18.
- **FINALNI — `data/microeconomics/final.js` (`microeconomicsFinal`)** = `Object.assign({}, microeconomicsM1, microeconomicsM2,
  {examPractice})`, **učitava se ZADNJI** (čita `window.microeconomicsM1/M2`; node `module.exports` preko `require`). K1 (7) + K2 (7)
  bez kolizije ključeva → **15 kategorija (14 tema + examPractice) / 164 fc / 148 quiz / 118 fill.** `examPractice` =
  cross-topic „optimiziraj na margini" sinteza (sve optimum-uvjete: MR=MC, MRS=Px/Py, MRTS=w/r, MRP=w, MSC=MSB) + KaTeX
  `aligned` master-popis formula + roadmap po poglavljima (`fa-graduation-cap`/indigo).
- **Catalog:** sve 3 lekcije mapirane — `scripts: [midterm-1, midterm-2, final]` (final ZADNJI), `resolve` za
  first/second-midterm/final. (Ranije „coming-soon" za K2/final maknuto.)
- **KaTeX currency-safe potvrđeno:** kombinirano M1+M2+final → inline `\\(..\\)` 509/509 + display `\\[..\\]` 71/71 BALANSIRANO;
  **0 jednostrukih `$` u K2/final/examPractice** (postojećih 8 `$` u K1 = valuta u uncertainty pitanjima, render literalno jer
  delimiter je `$$` ne `$`). Delimiteri u `js/math.js`: `$$`/`\\[`/`\\(` — single `$` NIJE delimiter (dizajn).
- **Cache:** cijeli neobjavljeni batch (KaTeX cigla + Micro) podignut `20260648 → 20260649` (`CONTENT_VERSION` + 8 `?v=` u
  index.html + 1 u styles.css).
- **Provjere:** verify **0/0** (12 predmeta, micro sve 3 lekcije → M1/M2/Final deklarirani+na window) · node struktura **0 grešaka**
  (final 15 kat/164fc/148quiz/118fill) · **Playwright 68/68** (`subjects=12 problems=0 errors=0`, `microeconomics ✓ ok
  docScrollW=852=deviceW` → NEMA horizontalnog overflowa).
- **▶ Dalje:** Statistics (~26 datoteka) ili Macroeconomics (~19) — oba kvantitativna, KaTeX spreman; **Math ZADNJA.**
  Razmotriti generator-script za masovni unos. [[content-roadmap-sequencing]]

---

## 2026-06-14 — ▶ MICROECONOMICS — 1. KOLOKVIJ KOMPLETAN (prvi kvantitativni predmet, KaTeX) (lokalno, čeka deploy)
**Prvi predmet koji koristi KaTeX ciglu.** Korisnik izabrao tempo „pilot poglavlje prvo" → napisana 1 kategorija
(Supply & Demand), korisnik potvrdio „KaTeX izgleda odlično" → dovršen **cijeli K1 (svih 7 poglavlja)**.
- **Intake:** materijali `…/1. godina Hospitality Managament/Microeconomics` — `Microeconomics_2024_25.pdf` (**172-str
  deck**, Pindyck & Rubinfeld; slajdovi rađeni po 8e, silabus traži 9e — isti sadržaj za ova poglavlja) + **DINP silabus**
  (službeni raspored predavanja) + exam-literature. Ekstrakcija `node scripts/pdf-text.js` → `tmp-micro/` (gitignored).
- **K1/K2 granica = AUTORITATIVNA, iz DINP rasporeda predavanja** (L7 = 1. kolokvij, L15 = 2.): **K1 = Pindyck Ch 1–7**
  (Preliminaries · Supply&Demand+elasticity · Consumer Behavior · Individual&Market Demand · Uncertainty · Production ·
  Cost of Production); **K2 = Ch 8,9,10,12,13,14,18** (Profit Max&Competitive Supply · Competitive Markets · Monopoly&
  Monopsony · Monopolistic Comp&Oligopoly · Game Theory · Factor Inputs · Externalities). → K2 14 kat + examPractice (planirano).
- **K1 NAPISAN — `data/microeconomics/midterm-1.js` (`microeconomicsM1`), 7 kategorija / 77 fc / 66 quiz / 54 fill:**
  `preliminaries` (Ch1: scarcity/efficiency, positive vs normative, PPF & opportunity cost, factors, real vs nominal),
  `supplyAndDemand` (Ch2: equilibrium, elasticity point & arc, income/cross, revenue + riješeni primjer |Ep|=2),
  `consumerBehavior` (Ch3: indifference curves, MRS, budget line, optimum MRS=PF/PC, equal-marginal principle),
  `individualMarketDemand` (Ch4: Engel, normal/inferior, substitution+income effects, consumer surplus, network ext.),
  `uncertainty` (Ch5: expected value/variance/expected utility, risk attitudes, risk premium, diversification/insurance
  + riješeni primjer E(X)), `production` (Ch6: Q=F(K,L), AP/MP, diminishing returns, isoquant, MRTS, returns to scale),
  `costOfProduction` (Ch7: economic vs accounting, TC=FC+VC, MC, ATC/AFC/AVC, MC cuts min, long-run MRTS=w/r,
  scale/scope + riješeni primjer). Sve formule KaTeX (inline `\\(..\\)`, display `\\[..\\]`); `.formula-box`/`.example-box`/`.tip-box`.
- **Catalog:** subject `microeconomics` (year 1, **sem 1**, `fa-chart-line`/sky `#0ea5e9`). **Još `first-midterm` mapiran**
  (`resolve.first-midterm = microeconomicsM1`); `second-midterm`+`final` ostaju **coming-soon** dok se ne napiše K2/finalni.
  `CONTENT_VERSION` `20260648` + `catalog.js`/`content-loader.js` `?v=20260648`. `.gitignore` += `tmp-micro/`.
- **Test infra:** Playwright per-test `timeout` 60s→**120s** (`playwright.config.js`) — suite sad mete 12 predmeta i
  responsive radi `fullPage` screenshot svake Learn stranice; KaTeX-bogata micro stranica (puno čvorova) usporava snimak
  pa je 60s bio pretijesan (nije funkcionalna regresija — overflow potvrđeno 0).
- **Provjere:** verify **0/0** (12 predmeta) · node struktura **0 grešaka** (7 kat/77fc/66quiz/54fill) · responsive na 393
  **potvrdio `microeconomics ✓ ok` `docScrollW=393=deviceW` → NEMA horizontalnog overflowa** (formule zadržane:
  `.formula-box{overflow:hidden}` + `.katex-display{overflow-x:auto}`). Puna suite: (rezultat u nastavku).
- **▶ Dalje:** K2 (Ch 8,9,10,12,13,14,18) pa finalni hibrid (`Object.assign(M1,M2,{examPractice})`, učitava se ZADNJI;
  tad dodati `midterm-2.js`/`final.js` u catalog scripts + resolve). Zatim Statistics / Macro; Math zadnja.

---

## 2026-06-14 — ✅ KaTeX CIGLA (ADR-009) — infrastruktura za kvantitativne predmete (lokalno, čeka deploy)
**Zašto:** Micro/Statistics/Macro/Math su formula-orijentirani; postojeća schema (learn/flashcards/quiz/fill) ne
prikazuje razlomke/eksponente/sume. Prije prvog kvantitativnog predmeta (Microeconomics) gradi se zasebna cigla za
LaTeX rendering — payload ostaje string → **migracijski sigurno** (struktura scheme nepromijenjena).
- **`js/math.js`** — jedan helper `renderMath(container)` = KaTeX **auto-render**. **Tihi no-op** ako CDN padne
  (formula degradira u sirovi LaTeX, ništa se ne ruši — ista filozofija kao Supabase CDN fallback u `js/auth.js`).
- **KaTeX CDN** (`0.16.9`, cdnjs) u `<head>` index.html-a, `defer` (ne blokira prvi paint): `katex.min.css` +
  `katex.min.js` + `contrib/auto-render.min.js`. (Prvi pokušaj bio `0.16.11` → **404**; cdnjs ima do `0.16.9`.)
- **`css/math.css`** — dark tema (KaTeX nasljeđuje `currentColor`) + **mobilni overflow** (`.katex-display{overflow-x:auto}`
  da široke formule skrolaju UNUTAR kutije, ne ruše layout — projekt strogo čuva od horizontalnog overflowa).
- **`renderMath` se zove na kraju sva četiri renderera:** `learn.js` (`renderLearnContent`), `flashcards.js`
  (`updateFlashcard` — KaTeX hoda po text-nodovima), `quiz.js` (`showQuestion` + `endQuiz` review), `fill-blanks.js`
  (`showFillQuestion` + reveal odgovora). Svaki poziv `if (typeof renderMath === 'function')`.
- **⚠️ KRITIČNA odluka — currency-safe delimiteri:** ADR-009 je predviđao `$...$` inline, ALI postojeći sadržaj ima
  **123 valutna `$NN`** (npr. „$25 per night") → s `$...$` bi KaTeX parsirao tekst između dvaju `$` kao matematiku i
  **vizualno pokvario live sadržaj**. Zato: **inline `\( \)`, blok `\[ \]` / `$$ $$`; jedan `$` se NE koristi.**
  Grep-om potvrđeno da se `\(`/`\[`/`$$` NIGDJE ne pojavljuju u postojećem tekstu → render je globalan ali za
  tekstualne predmete **no-op** (nije potreban opt-in flag). Konvencija autorstva u `docs/architecture/CONTENT_SCHEMA.md`.
- **Cache:** novi `js/math.js?v=20260648` + bump `learn/flashcards/quiz/fill .js?v=20260648`; `styles.css?v=20260648`
  + novi `@import css/math.css?v=20260648`. (Data nije dirana → `CONTENT_VERSION` ostaje `20260647`.)
- **Provjere:** verify **0/0** (11 predmeta) · **Playwright `tests/katex.spec.js` 4/4** (dokaz na sva 4 iPhone profila:
  inline `\(..\)` + blok `$$..$$`/`\[..\]` renderiraju `.katex`; valutni `$25`/`$50` ostaje doslovan tekst, 0 `.katex`).
  Puna responsive+smoke suite: u tijeku.
- **Dalje:** **Microeconomics** (1. god, sem 2) = prvi kvantitativni predmet, K1/K2/finalni, RUČNO autorstvo
  (172-str Pindyck deck). Worked examples u `learn.content`, quiz distraktori = tipične greške, grafovi = slike.

---

## 2026-06-14 — ✅ MANAGEMENT — NOVI predmet 1. godine (zadnji čisto tekstualni; 3. predmet 1. god)
**Treći predmet 1. godine HM** (uz Business Informatics + SIT) i **zadnji čisto tekstualni** prije KaTeX-skupine
(Micro/Statistics/Macro). Izvori: 11 PDF predavanja (`…/1. godina Hospitality Managament/Management`: INTRO silabus +
TU2–TU11; ekstrakcija `node scripts/pdf-text.js` → `tmp-mgmt/`, gitignored). **Udžbenik: Lussier, *Management
Fundamentals*, 9. izd. (SAGE).** **K1/K2 granica iz strukture udžbenika (5 dijelova): K1 = Part I–III (Global
Environment + Planning + Organizing), K2 = Part IV–V (Leading + Controlling)** — prirodni rez točno između HRM-a (kraj
Organizinga) i Organizational Behaviora (početak Leadinga).
- **`data/management/midterm-1.js`** (`managementM1`, **K1**, 6 kat / 53 fc / 48 quiz / 30 fill): foundations
  (definicija + 4 funkcije, efficient vs effective, 4 resursa, 3 vještine, Mintzberg 10 uloga, 3 razine, povijest:
  classical/behavioral/management-science/integrative), decisionMaking (problem vs odluka, 3 stila, 6-step model,
  programmed/nonprogrammed, certainty/risk/uncertainty, maximizer/satisficer, kreativnost→inovacija, 5 grupnih tehnika,
  kvantitativne tehnike, opportunity cost), strategicPlanning (strategic vs operational, 3 razine, 5-step proces, SWOT,
  Porter 5 sila, competitive advantage/core competency/benchmarking, grand/growth strategije, BCG matrica, adaptive +
  Porter competitive strategije, standing/single-use/contingency planovi), organizing (mechanistic vs organic, principi,
  responsibility/authority/accountability/delegation, line vs staff, centralizirano vs decentralizirano, 6 tipova
  departmentalizacije + matrix, 5 suvremenih dizajna, job design), teamwork (group vs team, group performance model,
  group struktura/proces, two-pizza rule, Tuckman 5 faza → 4 stila vođenja), humanResources (4 dijela HRM, job analysis,
  recruiting, 6-step selection, validity/reliability, training vs development, 360°, kompenzacija).
- **`data/management/midterm-2.js`** (`managementM2`, **K2**, 4 kat / 29 fc / 28 quiz / 20 fill): organizationalBehavior
  (OB cilj, self-esteem/confidence/doubt, thoughts/optimism/gratitude, locus of control, risk propensity,
  Machiavellianism, **Big Five OCEAN**), motivation (**performance = ability × motivation × resources**, motivacijski
  proces, sadržajne teorije: Maslow/ERG/Herzberg/McClelland; procesne: equity/goal-setting/expectancy E×I×V;
  reinforcement: positive/avoidance/punishment/extinction), leadership (definicija + trust, leaders vs managers, 4 klase
  teorija, Lewin 3 stila, Leadership Grid 5 stilova, situacijska/contingency, suvremeni: visionary/charismatic/
  transformational/transactional/authentic), controlSystems (preliminary/concurrent/rework/damage/feedback, 4-step
  control proces, 5 područja standarda, 3 frekvencije/10 metoda, master budget, 3 financijska izvještaja, bonds vs stock,
  coaching/counseling/discipline).
- **Finalni** = `data/management/final.js` (`managementFinal` = `Object.assign({}, managementM1, managementM2,
  {examPractice})`, učitava se ZADNJI; examPractice = 7 cross-topic fc / 8 quiz / 5 fill + mapa kolegija).
  **Ukupno: 11 kat / 89 fc / 84 quiz / 55 fill.**
- **Catalog:** novi subject `management` (year 1, semester 2; ikona `fa-user-tie`, indigo `#6366f1`; storageKey
  `management-progress`), 3 lekcije + 3 scripta + `resolve`. **`CONTENT_VERSION` → `20260647`** + `catalog.js`/
  `content-loader.js` `?v=` bump u `index.html`. `.gitignore` + `tmp-mgmt/` (ekstrahirani tekst = copyright).
- **Napomena:** udžbenik propisuje 15 tema; profesor je dostavio 10 lecture-deckova (TU2–TU11) → teme 2/3/6/13/15
  (Environment-Ethics, Diversity, Managing Change-Innovation, Communication-IT, Operations-Quality) **nemaju zaseban
  deck** → nisu obrađene (radi se s dostavljenim materijalom). Granica K1/K2 iz strukture udžbenika (silabus ne navodi
  točan popis tema po kolokviju, samo datume 08.04. / 27.05.).
- **Provjere:** verify **0/0** · strukturni node sanity **0 grešaka** (M1/M2/FINAL valid; quiz correct-index u rasponu,
  fill `_______` + answer, learn.content) · **Playwright 64/64** (smoke `subjects=11`, problems=0, errors=0).

**→ 1. godina HM: Business Informatics ✅ + SIT ✅ + Management ✅ (3 gotova). Dalje: KaTeX cigla (ADR-009) → otključava
kvantitativnu trojku Micro (172-str deck) / Statistics / Macro; Math zadnja.** **✅ DEPLOYANO 2026-06-14
(`6e88030..06c96a8`, uz izričito „deployaj molim te") → LIVE na sokratstudy.com; `origin/main` sinkroniziran.**
Cache `CONTENT_VERSION 20260647`. (U istom pushu i doc fix `06c96a8` za Supabase Redirect URL-ove — vidi unos ispod.)

---

## 2026-06-14 — 🐛 FIX: potvrda emaila → `{"error":"requested path is invalid"}` (Supabase Redirect URLs)
**Korisnik javio:** klik na „Confirm email address" iz Supabase maila otvara `…supabase.co` s `{"error":"requested path
is invalid"}` umjesto preusmjeravanja na stranicu. **Nalaz: NIJE bug u kodu** — `js/auth.js` ispravno šalje
`emailRedirectTo: window.location.origin + window.location.pathname` (na produkciji `https://www.sokratstudy.com/`).
**Uzrok = Supabase dashboard URL konfiguracija:** redirect allowlist je pokrivao samo `http://localhost:5050`, pa
`redirect_to` produkcijskog URL-a nije bio dozvoljen → fallback na (krivo postavljen) Site URL → nevažeća putanja na
`supabase.co`. **Popravak (dashboard-only, bez deploya koda):** Auth → URL Configuration → Site URL
`https://www.sokratstudy.com` + Redirect URLs sa `/**` wildcardom: `https://www.sokratstudy.com/**`,
`https://sokratstudy.com/**`, `http://localhost:5050/**`; testirati NOVOM registracijom (stari token potrošen).
Dokumentirano u `docs/architecture/BACKEND.md` (commit `06c96a8`). [[backend-track-b-start]]

---

## 2026-06-14 — ✅ SPECIAL INTEREST TOURISM (SIT) — NOVI predmet 1. godine (prvi nakon Business Informaticsa)
**Prvi predmet 1. godine HM nakon Business Informaticsa.** Korisnik izabrao SIT (najprirodniji flashcard-predmet,
materijali spremni). Izvori: 12 PDF predavanja + DINP silabus (`…/1. godina Hospitality Managament/Special interest in tourism`;
ekstrakcija `node scripts/pdf-text.js` → `tmp-sit/`, gitignored). **K1/K2 granica iz silabusa (raspored predavanja):
K1 = sve do 1. kolokvija, K2 = nakon.**
- **`data/sit/midterm-1.js`** (`sitM1`, **K1**, 6 kat / 49 fc / 40 quiz / 31 fill): intro (definicije turist/izletnik,
  oblici turizma, destinacija, SDG, value chain), destination (6 elemenata, DMO, 4 koraka strateškog planiranja, izazovi/trendovi),
  massToSit (Fordizam, leakages, overtourism/Doxey Irridex/tourismophobia, carrying capacity, SIT/GIT/MIT, Cohen 4 uloge,
  beginner→fanatic), business (MICE, Silk Route, leisure vs business, conference/convention/congress, incentive, B2B/B2C,
  ICCA/UIA), cultural (UNWTO def., tangible/intangible/contemporary, McKercher 5 tipova, heritage atrakcije, pilgrimage/Grand Tour),
  industrial (active vs heritage, PR/marketing uloge, experience economy).
- **`data/sit/midterm-2.js`** (`sitM2`, **K2**, 6 kat / 39 fc / 35 quiz / 29 fill): nautical, sports, luxury, dark, health, film.
  **⚠️ NAUTICAL slajd je slikovni/skenirani (bez teksta) → kategorija pisana iz OPĆEG ZNANJA i jasno označena (warning-box + komentar);
  treba verificirati protiv profesorovih slajdova.** Sports (UNWTO def., sports tourism vs tourism sport, Gibson 3, Kurtzman 5,
  mega events/nation-branding), luxury (lux/luxuria, masstige, 4 leće Saviolo, „luxury is NOT", bluxury), dark (Stone spektar
  7 suppliera, Alcatraz vs Robben Island, thanatourism), health (umbrella = wellness+medical, Dunn, holistic/spiritual,
  medical tourism vs travel), film (Beeton, film vs film-induced, Macionis 3, **Dubrovnik/Game of Thrones** +37.9% dolazaka).
  **Event + Outdoor/Wildlife tourism nisu pokriveni (nema materijala).**
- **Finalni** = `data/sit/final.js` (`sitFinal` = `Object.assign({}, sitM1, sitM2, {examPractice})`, učitava se ZADNJI;
  examPractice = 6 cross-topic fc / 8 quiz / 5 fill + mapa kolegija). **Ukupno: 13 kat / 94 fc / 83 quiz / 65 fill.**
- **Catalog:** novi subject `sit` (year 1, semester 2; ikona `fa-compass`, teal `#14b8a6`; storageKey `sit-progress`),
  3 lekcije (`first-midterm`/`second-midterm`/`final`) + 3 scripta + `resolve`. **`CONTENT_VERSION` → `20260646`** +
  `catalog.js`/`content-loader.js` `?v=` bump. `.gitignore` + `tmp-sit/` (ekstrahirani tekst predavanja = copyright).
- **Provjere:** verify 0/0 · strukturni validator 0 (M1/M2/FINAL valid) · Playwright (smoke automatski testira novi predmet;
  rezultat u commitu).

**→ 1. godina HM: Business Informatics ✅ + SIT ✅. Dalje: Management (tekstualni), pa KaTeX cigla za kvantitativne
(Micro 172-str deck / Statistics / Macro).** **✅ DEPLOYANO 2026-06-14 (`712cc0e..e0e9ca7`, uz izričito odobrenje
„deployaj") → LIVE na sokratstudy.com; `origin/main` sinkroniziran.** Cache `CONTENT_VERSION 20260646`.

---

## 2026-06-13 — ✅ GOOGLE ANALYTICS (GA4) + GDPR cookie-consent (Consent Mode v2)
**Korisnik želi analitiku posjeta** (Measurement ID `G-ME0V58NJ1Z`). Izgrađen GDPR-ispravan sustav (korisnik izabrao
„cookie banner + Consent Mode" umjesto golog GA-a):
- **`js/consent.js`** (novo): Google Consent Mode v2, default **DENIED** (postavljeno inline u `<head>` PRIJE svega).
  Cookie banner (Accept/Reject); **gtag.js se učita TEK nakon „Accept"** (`anonymize_ip: true`); izbor se pamti u
  `localStorage` (`sokrat-cookie-consent`); `window.openCookieSettings()` za ponovni odabir. Placeholder-ID guard
  (regex `^G-[A-Z0-9]{6,}$`) — dok ID nije pravi, banner radi ali se GA ne učita.
- **`css/consent.css`** (novo): samostalan dark „clean & rich" banner (eksplicitne boje → isti izgled na app-u i legal
  stranicama); `box-sizing:border-box` + `width:100%` (bez horizontalnog overflowa); `.cookie-banner[hidden]` fix; na
  ≤560px gumbi pune širine.
- **Svih 5 stranica** (index + privacy/terms/faq/contact): u `<head>` inline Consent-Mode-default snippet + `consent.css`
  + `consent.js` (defer). **„Cookie settings"** link u footere (landing-footer + 4× legal-footer) → `openCookieSettings()`.
- **privacy.html** sekcija 5 prepisana („Cookies and analytics"): bitno-localStorage (uvijek) vs analitički kolačići
  (opcionalni, učitani tek na pristanak), Consent Mode, IP-anonimizacija, pravna osnova = pristanak (Art. 6(1)(a) GDPR),
  povlačenje preko „Cookie settings". Datum dopunjen.
- **Cache:** novi fajlovi → `?v=20260646` na svim referencama. Verify 0/0 (nepromijenjen catalog), Playwright (rezultat
  u commitu). **Deploy odobren („mozes sve deployat") → push + Vercel.**

---

## 2026-06-13 — ✅ ENTREPRENEURSHIP restrukturiran na K1/K2/finalni + REBUILD-obogaćivanje iz 11 PDF predavanja (4./4. sem-1 predmet → 2. GODINA 100% KOMPLETNA)
**Korisnik dostavio materijale** (`…/2. godina Hospitaliy Managament/Entrepreneurship and Innovation`, 11 PDF-ova:
Week 2–7 + 9–13; Week 8 = kolokvijski tjedan → **K1 = Weeks 2–7, K2 = Weeks 9–13**; ekstrakcija `node scripts/pdf-text.js`
→ `tmp-ent/`, gitignored). **Nalaz verifikacije (hibrid te2/E-Business pouke): stari `data-entrepreneurship.js`
(11 kat / 92 fc) BIO JE TOČAN gdje postoji** (sve brojke odgovaraju slajdovima), **ALI tanak — 3 tjedna potpuno
nepokrivena** (W3 Creativity, W5 Financing, W13 Developing Countries) + velike rupe u ostalima → **split skriptom +
4 NOVE kategorije + jako obogaćivanje (+~95 fc)**:

- **Split po linijama** (`tmp-ent/split.js`, jednokratna): stare kategorije kopirane verbatim, **ključevi kat. +
  storageKey (`entrepreneurship-progress`) NEDIRNUTI → napredak očuvan**. Stara `finalExam` kategorija ispuštena
  (zamjenjuje je examPractice u finalnom, dosljedno ostalim predmetima).
- **`data/entrepreneurship/midterm-1.js`** (`entrepreneurshipM1`, **K1 = Weeks 2–7**, 7 kat / 91 fc / 67 quiz / 42 fill):
  history (W2, +6 fc: Smith/Say/Mises/Kirzner/„special individual"/socijalističke ekonomije) · psychology (W2, +6 fc:
  start-up utjecaji, kritika trait-pristupa, social influences, **lifestyle businesses** ×2, mitovi; **FIX: kartica
  „linearni proces" sada uključuje W3 kritiku — proces je complex/chaotic, NE linearan**) · **creativity (NOVA, W3,
  13 fc:** mindset, opportunity, 3 oblika vrijednosti, 4 I's, finding vs building, prior knowledge + pattern recognition,
  paying customer, design thinking) · innovation (W4, preimenovana iz „Innovation & Franchising", franchising kartice
  premještene; +6 fc: Kanter def., „what innovation is NOT", innovation journey 4 koraka + scenariji, Bill Gross TIMING,
  creativity→innovation→entrepreneurship) · **financing (NOVA, W5, 16 fc:** bootstrapping/affordable loss/sweat equity,
  crowdfunding vs crowdsourcing, Kickstarter all-or-nothing + Coolest Cooler, JOBS Act, 4 tipa crowdfundinga,
  overdraft vs loan, trade credit/leasing/factoring, faze equity financiranja, angels vs VCs s brojkama) ·
  **franchising (NOVA, W6, 10 fc:** BFA def., **franšizoprimac = intrapreneur**, 2 formata, direct vs master, resource
  scarcity + agency teorija, prednosti/nedostaci obje strane, 5× uspješniji / 10% vs 52%, tržišne brojke) ·
  planning (W7, +3 fc: feasibility ≤10 str + 50 kupaca + go/no-go, Kawasaki 10 / Young 5 slajdova, redoslijed alata).
- **`midterm-2.js`** (`entrepreneurshipM2`, **K2 = Weeks 9–13**, 7 kat / 78 fc / 57 quiz / 33 fill): failure (W9, +5 fc:
  statistike ~90%/1-od-5/70% u god. 2–5/BLS/po zemljama, failure-kao-PROCES, kultura straha, Edison „1.000 koraka") ·
  economy (W10, +4 fc: Say middleman, Menger, poduzetnik-vs-menadžer tablica, 3 definicije uloge) · tourism (W10;
  **uklonjeni dupli influencer/push/pull** koji žive u trends; +6 fc: makro/mikro perspektive, javni vs privatni sektor,
  9 karakteristika usluga, pros/cons, ICT promjene/disintermedijacija, menadžer vs poduzetnik u T&H) · social (W11,
  +Thompson 2 grupe) · value (W11, +izazovi mjerenja) · trends (W12, +5 fc: najnovije statistike žena-poduzetnica
  (39,2% firmi/849 dnevno/18% unicorna/24,3% exita/68,8% gap), Kanter 1977, D&I šire od roda + digital divide,
  45% Fortune 500 migranti, oblici: refugee/enclave/transnational; Environment trends +Green Finance/Tech) ·
  **developing (NOVA, W13, 12 fc:** social innovation 7% GDP-a, 3 prevladavajuća shvaćanja, Airbnb socio-prostorni
  učinak 78%/1%, karakteristike zemalja u razvoju, mixed picture ≤2%, 4 case studyja: Phnom Penh mission drift /
  Grootbos ovisnost / Eco-pads 4 strategije / Mageires 60% + 3 market capabilities).
- **Finalni** = `data/entrepreneurship/final.js` (`entrepreneurshipFinal` = `Object.assign({}, M1, M2, {examPractice})`,
  učitava se ZADNJI; examPractice = 6 cross-topic fc / 10 quiz / 5 fill + learn s mapom kolegija).
  **Ukupno: 15 kat / 175 fc / 134 quiz / 80 fill — najveći predmet na platformi.**
- **Catalog:** 3 lekcije (`first-midterm`/`second-midterm`/`final`) + 3 scripta + `resolve`; id/storageKey nedirnuti;
  stare lekcije `second-exam-prep`/`final-exam-prep` zamijenjene. Stari root `data-entrepreneurship.js` OBRISAN.
  `lazy-load.spec.js` bez izmjena (sentineli su ebusiness/te2). **`CONTENT_VERSION` → `20260645`** + `catalog.js`/
  `content-loader.js` `?v=` bump. `.gitignore` + `tmp-ent/` (ekstrahirani tekst predavanja = copyright).
- **Provjere:** verify 0/0 · strukturni node validator M1/M2/FINAL = 0 grešaka (correct-index u rasponu, `_______`
  markeri, sva polja) · Playwright (rezultat zabilježen u commitu).

**→ sem-1: 4/4 KOMPLETNO (Accounting ✅, te2 ✅, E-Business ✅, Entrepreneurship ✅) → CIJELA 2. GODINA HM = 8/8
PREDMETA KOMPLETNO.** Dalje: 1. godina (Management/SIT tekstualni prvi; Macro/**Statistics (26 datoteka — novo!)**/
Micro/Math preko KaTeX cigle, ADR-009) — prije masovnog unosa razmotriti odgođeni generator-script za uštedu.
**✅ DEPLOYANO 2026-06-13 (`4c66277..8a37404`, uz izričito odobrenje „mozes deployat") → LIVE na sokratstudy.com;
`origin/main` sinkroniziran.** Cache `CONTENT_VERSION 20260645`.

---

## 2026-06-13 — 🚀 DEPLOY: Backend staza B (auth email+lozinka + cloud sync + Profile + pravne stranice) + E-Business — SVE LIVE
**Korisnik izričito odobrio push („mozes deployat na github") → deploy gate ISPUNJEN.** Pushano `ca06158..51e4e7b`
(6 commitova): `d591f3f` Track B MVP · `21b1919` Profile + auth posvuda + Google Ads stranice · `aec6d47` backlog ·
`47ba7f6` **email+lozinka (magic-link uklonjen)** · `94902a0` repeat-password + gumb-oko · `51e4e7b` **E-Business K1/K2/finalni**.
Vercel auto-deploy na sokratstudy.com. Cache: app `20260643`, sadržaj `CONTENT_VERSION 20260644`.
**Live je sada:** registracija/prijava s lozinkom (potvrda emaila obavezna), cloud sync napretka, Profile stranica,
privacy/terms/faq/contact, te E-Business s 3 lekcije (15 kat / 152 fc u finalnom). `origin/main` sinkroniziran.
**Podsjetnik korisniku:** Supabase dashboard → Auth → Providers → Email → min duljina lozinke 8 (ako već nije).

---

## 2026-06-13 — ✅ E-BUSINESS restrukturiran na K1/K2/finalni + obogaćen iz 14 PDF predavanja (3. sem-1 predmet)
**Korisnik dostavio kompletne materijale** (`…/2. godina Hospitaliy Managament/E-Business`, 14 PDF-ova: Ch 1–14 +
PlatformEconomy + Challenges; ekstrakcija `node scripts/pdf-text.js` → `tmp-ebiz/`, gitignored). **Nalaz verifikacije
(za razliku od te2): stari `data-ebusiness.js` (14 kat / 129 fc) BIO JE vjeran predavanjima** — kategorije se mapiraju
1:1 na predavanja, **0 činjeničnih grešaka osim jedne** (tvrdio „SEO ima TRI područja" — Unit 12 kaže ČETIRI
potkategorije, +User Interaction Signals → ispravljeno). Zato pristup ≠ rebuild nego **split skriptom + ciljano
obogaćivanje**:

- **Split po linijama** (`tmp-ebiz/split.js`, jednokratna): `data/ebusiness/midterm-1.js` (`ebusinessM1`, **K1 = Units 1–7**,
  6 kat: ecommerceContext/distributionChain/internetBusiness/cashFlows/computerGraphics/platformEconomy) +
  `midterm-2.js` (`ebusinessM2`, **K2 = Units 8–15**, 8 kat: visualDesign/digitalMarketing/socialMedia/googleAnalytics/
  seoSem/hotelPMS/ebusinessSecurity/challengesTrends). Formatiranje očuvano, ključevi kategorija NEPROMIJENJENI
  (napredak korisnika očuvan). Granica: prirodna polovica predavanja (datumi: Ch2 07/10, Ch4-5 27/10, Platform 10/11).
- **Obogaćivanje iz predavanja (+23 fc, +5 quiz):** K1 +8 fc (B2G/C2G modeli; switch companies; „online environment does
  not change the business" + 10% GDP; 2 numerička cash-flow primjera (hotel 50→TO 80→marža 30; direktno 100/proviz. 10);
  Web 5.0; def. računalne grafike + 3 klasifikacije; demand-side economies of scale) + 2 quiz (C2G, marža).
  K2 +12 fc (SEO **4 potkategorije FIX** + User Interaction Signals; SEO „nije besplatan" + ~2 god do 1. stranice;
  svih 11 tipova digital marketinga; email+SMS (102% ROI); kampanje Nike/Heineken/Airbnb; GA „5 benefits";
  PMS Customer Data Management/CRM; 10 security savjeta; logomark vs combination logo; influencer flat-fee vs affiliate)
  + 3 quiz.
- **Finalni** = `data/ebusiness/final.js` (`ebusinessFinal` = `Object.assign({}, M1, M2, {examPractice})`, učitava se
  ZADNJI; examPractice = 6 cross-topic fc / 8 quiz / 5 fill). **Ukupno: 15 kat / 152 fc / 124 quiz / 75 fill.**
- **Catalog:** 3 lekcije (`first-midterm`/`second-midterm`/`final`) + 3 scripta + `resolve`; id/storageKey nedirnuti.
  Stari root `data-ebusiness.js` OBRISAN. `lazy-load.spec.js` sentinel `ebusinessData`→`ebusinessM1` (+ provjera
  `ebusinessFinal`), lekcija u testu → `first-midterm`. **`CONTENT_VERSION` → `20260644`** + `catalog.js`/`content-loader.js`
  `?v=` bump. `.gitignore` + `tmp-ebiz/` (ekstrahirani tekst predavanja = copyright).
- **Provjere:** verify 0/0 · strukturni node validator M1/M2/FINAL = valid (correct-index u rasponu, sva polja) ·
  Playwright (u tijeku pri pisanju ovog unosa).

**→ sem-1: 3/4 KOMPLETNO (Accounting ✅, te2 ✅, E-Business ✅). Preostao samo Entrepreneurship (čeka PDF-ove).**

---

## 2026-06-13 — ▶ BACKEND staza B (3. dio): AUTH PRELAZAK NA EMAIL+LOZINKU (magic-link maknut)
**Implementiran dogovor od 2026-06-12** (korisnik rekao „kreni"): korisnici imaju **lozinku, profil i sve** — magic-link
potpuno uklonjen. Sve u postojećim modulima, **baza/schema se NE mijenja**.

- **`js/auth.js` (prepisan):** modal sad ima **2 taba — Sign in / Create account** + treći „skriveni" panel **Forgot password**.
  - **Sign in:** `signInWithPassword`; prijateljske poruke („Wrong email or password." / „Please confirm your email first…").
  - **Create account:** ime (`user_metadata.display_name`) + email + lozinka (min 8, `minlength`); `signUp` s
    `emailRedirectTo` → **email potvrda obavezna** → status „Check your inbox…". Anti-enumeration slučaj Supabasea
    (postojeći email → „lažni" user s `identities.length===0`) prepoznat → „account already exists — switch to Sign in".
  - **Forgot password:** `resetPasswordForEmail` (prefill emaila iz sign-in forme) → klik na link u mailu →
    **`PASSWORD_RECOVERY` event** → `recoveryMode` → modal pokaže „Set a new password" formu → `updateUser({password})`.
  - Nav gumbi sad prikazuju **ime** (prva riječ `display_name`; fallback email-prefix za stare račune).
- **`js/profile.js`:** account kartica prikazuje **ime kao naslov** + email ispod; novi gumb **„Change password"**
  (inline forma → `updateUser`); `changePassword()` handler.
- **`css/auth.css`:** tabovi (`.auth-modal__tabs/__tab`), tekst-linkovi (`.auth-modal__link`) + **kritični
  `.auth-modal__form[hidden]{display:none}`** (display:flex bi pregazio `hidden` — ista zamka kao BUG kod modala).
  `css/profile.css`: `.profile-pass-form` (+`[hidden]` fix), `.profile-meta--sub`.
- **Pravne stranice ažurirane** (magic-link → lozinka): `privacy.html` (skupljamo ime + lozinka-hash; potvrdni/reset mailovi;
  Last updated 13 June 2026), `terms.html` (odgovornost za povjerljivost lozinke), `faq.html`.
- **Cache → `?v=20260642`** (styles.css, auth.css, profile.css, auth.js, profile.js).
- **Test:** `tests/auth.spec.js` test 1 prepisan — tabovi, sign-in polja, signup polja (minlength=8), forgot tok, close.

**Dopuna (isti dan, korisnikov zahtjev):** **repeat password** polje („Repeat new password" + provjera „Passwords do not
match.") u recovery formi I u profilnoj „Change password" formi; **gumb-oko za prikaz lozinke** (`.auth-pass-wrap` +
`.auth-pass-toggle`, fa-eye/fa-eye-slash, delegirani document-listener u `auth.js`) na SVIM password poljima (sign in,
sign up, recovery ×2, profil ×2). Signup namjerno bez repeat polja (oko pokriva provjeru; manje trenja). Test proširen
(toggle type password↔text). Cache → `?v=20260643`.

**Ručni korak korisnika (Supabase dashboard):** Authentication → Providers → Email → **min duljina lozinke 8**.
**⚠️ Deploy gate i dalje vrijedi** — push tek kad korisnik potvrdi da je login UX potpun.

---

## 2026-06-12 — ▶ BACKEND staza B (2. dio): Profile stranica + auth kroz cijeli frontend + Google Ads stranice
**Korisnik testirao login lokalno — „radi fantastično" — ali postavio uvjet za deploy:** ne ide live dok login UX nije
potpun (profil, prijava sa svih stranica) + dok ne postoji sve potrebno za **Google Ads** (pravne stranice). Sve napravljeno:

- **Profile stranica (`#profile-page`):** novi `js/profile.js` + `css/profile.css` + ruta `profile` u `navigateTo()`
  (profile se NE sprema kao last-position — render ovisi o auth sesiji koja na reloadu kasni za CDN-om; back gumb vraća na
  stranicu s koje se došlo, `profileReturnPage`). Sadržaj: account kartica (email, member since, Sign out), Cloud sync kartica
  (status + „Sync now"), **Progress overview** (agregat po predmetu iz localStorage: kartice/kvizovi+prosjek/fill, totali),
  **Privacy & data** (GDPR): „Delete cloud data" (briše SVE retke u `progress` pa odjava — da sync ne re-uploada; lokalno ostaje)
  + mailto za potpuno brisanje računa + link na Privacy Policy. Odjavljen korisnik na profilu vidi sign-in prompt.
- **Auth kroz cijeli frontend:** svi ulazi su `.auth-entry` (landing nav + **novi `.header-auth-btn` na browse/lessons/study
  headerima**, okrugli 44px, ikona). Odjavljen → modal; prijavljen → Profile. Labeli/aria se ažuriraju na svim gumbima.
  Login modal sad ima i **pristanak na Terms/Privacy** (compliance za Ads).
- **Google Ads / pravne stranice (statične, crawlable, NE idu kroz SPA):** `privacy.html` (GDPR: što se skuplja, Supabase/EU,
  prava, brisanje, AZOP), `terms.html` (free servis, study-aid disclaimer, IP, HR pravo), `faq.html` (8 pitanja),
  `contact.html` — sve dijele novi `css/legal.css` (samostalan, dark), kanonski URL-ovi + meta description. **Footer na landingu:**
  nova kolona Legal (Privacy/Terms) + Contact/FAQ linkovi (umjesto golog mailto). HTML se na Vercelu NE kešira immutable → OK.
- **Cache → `?v=20260641`** (styles.css, variables.css, auth.css, profile.css, navigation.js, auth.js, profile.js).
- **Testovi:** novi `tests/legal.spec.js` (4 stranice × render/h1/footer/mailto/overflow + footer linkovi na landingu)
  + `auth.spec.js` prošireni (profile sign-in prompt, back na landing, profile NIJE u last-position).

**⚠️ Deploy gate (korisnikova odluka):** NE pushati dok korisnik ne potvrdi da je login UX + Ads-spremnost potpuna.

---

## 2026-06-12 — ▶ BACKEND staza B (MVP): Auth (magic-link) + cloud sync napretka — implementirano lokalno
**Prvi backend kod na platformi.** Korisnik dao Supabase projekt (`naxjubnedhrbhsuasayu.supabase.co`) + **publishable key**
(javan po dizajnu; service key NIJE korišten — za ovaj MVP nije ni potreban, RLS štiti podatke). Login = **email magic-link**
(radi bez ikakve dodatne konfiguracije; Google OAuth se može dodati kasnije). **Sadržaj OSTAJE u fajlovima** — baza drži
SAMO napredak (staza B; migracija sadržaja = staza A, jednom kasnije).

- **`supabase/schema.sql`** — tablica `public.progress` (PK `user_id+key`, `data jsonb`, `updated_at` + trigger) + **RLS**
  (select/insert/update/delete samo `auth.uid() = user_id`). Idempotentno; korisnik pokreće u Supabase SQL editoru.
  Model: **1 red = 1 localStorage ključ** (`<storageKey>`, `<storageKey>-analytics`, `<subjectId>-exercises-progress`,
  `sokrat-last-position`).
- **`js/auth.js`** — supabase-js v2 **UMD s CDN-a (jsdelivr), učitava se TEK na DOMContentLoaded**; ako CDN padne, auth se
  tiho gasi (console.warn) i app radi kao prije. Magic-link (`signInWithOtp`, `emailRedirectTo` = origin), `onAuthStateChange`
  → nav gumb + modal + notifikacija sync sloja. Modal (email forma / signed-in stanje + Sign out) injektira se JS-om.
- **`js/cloud-sync.js`** — **offline-first**: localStorage ostaje primarni store. Na login/startup **pull + MERGE** (pravila:
  brojevi=max, polja stringova=unija → naučene kartice se NIKAD ne gube, ostala polja=dulje, objekti rekurzivno; ključevi s
  drugih uređaja se povuku svi). Zatim **diff-push svakih 30 s** + na `visibilitychange:hidden` + `beforeunload` (upsert
  `onConflict: user_id,key`). Meta `sokrat-sync-meta`. Guard za ponovljeni SIGNED_IN (token refresh). Ako je predmet otvoren
  tijekom pulla → `loadProgress()`/`loadAnalytics()` refresh.
- **UI:** gumb `#authNavBtn` u landing nav (skriven dok auth ne digne; na mobitelu samo ikona) + `css/auth.css`
  (modal, dark „čisto i bogato"). `styles.css` +import. **Cache → `?v=20260640`** (styles.css, auth.css, auth.js, cloud-sync.js).
- **Test:** novi `tests/auth.spec.js` (gumb se pojavi → modal open/close, bez overflowa; **skip ako je CDN nedostupan** —
  upravo željeno degradiranje).

**Treba od korisnika (Supabase dashboard):** (1) SQL Editor → pokrenuti `supabase/schema.sql`; (2) Auth → URL Configuration →
Site URL `https://www.sokratstudy.com` + dodatni redirect `http://localhost:5050`. **Napomena:** free tier šalje ~3-4
magic-link maila/sat (dovoljno za MVP; kasnije custom SMTP).
**Testirano:** node --check OK, verify 0/0, Playwright (vidi niže/commit). **NIJE deployano — čeka potvrdu push-a.**

---

## 2026-06-12 — ✅ TOURISM ECONOMICS (te2) restrukturiran + REBUILD iz PDF predavanja (2. sem-1 predmet)
**te2 prešao sa starog 2-lekcijskog oblika na standard „2 kolokvija + finalni" — i sadržaj je PREPISAN IZ PROFESORSKIH
PREDAVANJA (nije puki split starog).** Prvi prolaz je bio vjeran split starog `te2FinalData` (72 fc) — korisnik s pravom javio
da je **premalo i staro**, pa je sadržaj rebuildan iz 10 PDF-ova (nositelji kolegija, FMTU 2025/26).
**Granica kolokvija iz silabusa** (slajd „Important dates"): **K1 = jedinice 1.–6., K2 = 7.–12.** (potvrdio korisnik).

- **Nova mapa `data/te2/`**: `midterm-1.js` (`te2M1`) + `midterm-2.js` (`te2M2`) + `final.js`
  (`te2Final` = `Object.assign({}, te2M1, te2M2, { examPractice })`, učitava se ZADNJI).
- **K1 (Units 1–6)** = 5 kat: `fundamentals` (U1 — + tourism market: features, intangibility, key players),
  `demand` (U2 — **4 oblika elasticiteta**, bandwagon/snob/Veblen), **`forecasting` (U3 — NOVA kategorija**: qual/quant/AI,
  regresija, time-series vs causal), `supply` (U4–5 — TC/AC/MC, TP/AP/MP, economies of scale), `marketStructure` (U6 — 4 strukture
  s primjerima + cost leadership/differentiation/focus). **61 fc / 42 quiz / 28 fill.**
- **K2 (Units 7–12)** = 5 kat: `pricing` (U7 — **ISPRAVAK: price JEST najkritičnija/najprilagodljivija varijabla**, stari je
  tvrdio suprotno; sve podstrategije: skimming/penetration/price discrimination/peak-load/bundling…), `expenditure`
  (U8 — 7 učinaka, direct/indirect/induced, **5 tipova multiplikatora + realnost: multiplikator ≤ 2**, leakages, I-O/CGE),
  `tsa` (U9–10 — tourism expenditure, contribution vs impact, TSA, characteristic vs connected, Code of Ethics), `environment`
  (U11 — market failure, **4 tipa dobara** private/common/club/public, tragedy of the commons, carrying capacity), `sustainability`
  (U12 — 3 stupa, growth management vs degrowth, **Easterlin paradox, decoupling myth, rebound effects**, regenerativni turizam).
  **62 fc / 40 quiz / 30 fill.**
- **Finalni** = 10 tematskih kat + obnovljena **`examPractice` (All Units)** (format ispita 30%/10 pitanja 5+5 + cross-topic sinteza).
  **Ukupno finalni: 11 kat / 135 fc / 94 quiz / 66 fill** (gotovo 2× više od splita; sve iz slajdova).
- **Learn sekcije proširene na punu dubinu** (korisnik javio „Learn je premali"): sa ~1.830 → **~3.200–3.300 znakova** po kategoriji
  (razina jakih sem-2 predmeta), s `<h3>`/`<h4>`, usporednim `<table>` i listama — puni studijski tekst po jedinici, sve iz slajdova.
- **Catalog:** te2 lekcije `first-midterm`/`second-midterm`/`final`; scripts → `data/te2/*`; `resolve` → te2M1/te2M2/te2Final.
  **Stari root `data-te2.js` + `data-te2-final.js` obrisani.** `lazy-load.spec.js` sentinel `studyData` → `te2M1`.
- **Cache:** `CONTENT_VERSION` + `catalog.js`/`content-loader.js` `?v=` → **`20260639`**.

**Testirano:** `verify` 0/0; node render-sanity (11/11 kat validne, quiz `correct` indeksi u rasponu, svi fillBlanks imaju prazninu);
Playwright 36/36. **✅ DEPLOYANO 2026-06-12** (`git push` uz potvrdu korisnika, `35d8a70..ca06158`) — te2 LIVE na sokratstudy.com.
Izvori (PDF tekst) u temp-u, NISU u repou (autorska prava).

**▶ SLJEDEĆE (odluka 2026-06-12) = BACKEND, staza B:** Auth + cloud sinkronizacija napretka (Supabase + Vercel `/api`); **sadržaj OSTAJE
u fajlovima (NE migracija — to je staza A, jednom kad je sadržaj gotov).** Treba: korisnik kreira Supabase projekt + ključevi. Detalji
u memoriji [[backend-track-b-start]] + `docs/architecture/BACKEND.md`. **Sadržaj-staza parkirana:** preostala 2 sem-1 (Entrep/E-Biz) = prazni folderi
materijala, čekaju PDF-ove (pouka iz te2: raditi IZ predavanja). **✅ te2 deployan 2026-06-12 (`ca06158`).** **⚠️ Accounting zatvoren.**

---

## 2026-06-12 — ✅ ACCOUNTING 100% KOMPLETAN i LIVE — predmet zatvoren, dalje NOVI predmet
**Accounting je gotov.** Predmet sad ima puno study gradivo (3 lekcije: Midterm 1 / Midterm 2 / Final, FAZA 4) **+ jedinstveni
reusable Exercises sustav** (41 interaktivna vježba — K1 Ch1–6: 16, K2 Ch9–16 + inventory + journal/RE: 25; 6 tipova × 3 moda × randomizacija).
Sve LIVE na sokratstudy.com (`origin/main @ a6b6fb0`, 0 ispred, radno stablo čisto). **Engine NIKAD nije diran za sadržaj** —
dokaz da je sustav vježbi stvarno reusable (novi predmet/jezik = samo nova data + catalog).

**Opcionalno preostalo (NE blokira „gotovo", svjesna odluka):**
- Final lekcija → „Exercises" tab prazan (svih 41 vježba tagano na kolokvije; dosljedno sem-2 predmetima koji na Finalu imaju samo `examPractice`).
- USAR/USALI klasifikacija (Ch9-1/10-1) odgođena — nema službenog answer-keya (dvosmislene stavke); dodati samo ako se nađe key.

**▶ SLJEDEĆA SESIJA = NOVI sem-1 predmet** (od preostala 3: **Tourism Economics `te2` / Entrepreneurship / E-Business**) — restruktura
na K1/K2/finalni po obrascu Marketing/Geo/Food&Nutrition (split postojećeg sadržaja + finalni hibrid; **NE** treba exercises sustav).
Čeka: odabir predmeta + materijali/silabus (plan: `docs/records/BACKLOG.md`). **⚠️ Korisnik je zasićen računovodstvom — ne vraćati se na Accounting osim izričito.**

---

## 2026-06-12 — 🎉 Accounting B3.11: K2 PLAN KOMPLETAN (Ch13/14/15/16 koncepti)
Zadnja K2 cigla. **4 nove `choice` vježbe** u `data/accounting/exercises.js`, iz autentičnih workbook assignmenta:
- `k2-ch13-annual-reports` (Ch13, 8 MC) — Sarbanes-Oxley, SEC, Form 10-K, **audit opinion types** (unqualified/qualified/adverse/disclaimer),
  consolidated statements, §404.
- `k2-ch14-computerised` (Ch14, 6 MC) — POS sustavi, merchant account, „card not present" fraud, POS komponente (verbatim 14-1).
- `k2-ch15-breakeven` (Ch15, 6 MC) — forecasting, cost behavior (fixed/variable/semi-variable), **breakeven = FC ÷ contribution-margin %**
  (ne ÷ variable cost %); item 6 preformuliran na jedan jasan odgovor.
- `k2-ch16-internal-control` (Ch16, 12 TF) — segregation of duties, collusion, imprest sustav, deposit in transit, NSF check subtracted;
  izbačene 2 dvosmisleno formulirane stavke.

**Napomena:** stvarna poglavlja iz izvora ≠ približne oznake u planu (Ch14=computerised, Ch15=CVP, Ch16=internal control). **Engine NEPROMIJENJEN.**
Content pack sad **41 vježba**. **Testirano:** verify 0/0; node 95/95 + 13/13; grade-check svih 4 (8/8, 6/6, 6/6, 12/12) + indeksi validni;
Playwright **36/36**. Cache `?v=20260638`.

**🎉 K2 PLAN KOMPLETAN** — Midterm 2 „Exercises" tab pokriva **Chapter 9, 10, 11, 12, 13, 14, 15, 16 + Other** (inventory + journal/RE),
ukupno 25 K2 vježbi (numeričke/ratio/journal/choice, s randomizacijom). **✅ DEPLOYANO (push `d68c584`):** B3.10 + B3.11 LIVE,
`origin/main` sinkroniziran (0 ispred) → **cijeli K2 vježbi-plan na produkciji**. Cache `?v=20260638`.

---

## 2026-06-12 — ✅ DEPLOYANO (push `d241eaf`) — B3.8 + B3.9 LIVE + B3.10 lokalno
**Deploy (uz potvrdu):** B3.8 (Ch9/10 ratios) + B3.9 (Ch12 Analyzing FS) na produkciju, `origin/main` @ `d241eaf`, 0 ispred.
Midterm 2 „Exercises" tab sad LIVE ima **Chapter 9 / 10 / 11 / 12** + **Other (inventory)**.

## 2026-06-12 — Accounting B3.10: K2 journal (revenue/expense/RE + BS)
Nastavak K2. **3 nove vježbe** u `data/accounting/exercises.js` (bez `chapter` → „Other"):
- `k2-journal-operations` (**guided journal**, 6 transakcija) — proširuje K1 bookkeeping (ALE) na **prihode/rashode**: cash sale,
  sale on account, cost of sales (perpetual), wages, **depreciation adjusting entry** (D Depreciation Expense / C Accumulated
  Depreciation = contra-asset), collection. Guided grader = po-transakciji (balance + multiset); A=L+E traka se NE prikazuje u
  guided modu → otvoreni revenue/expense računi nisu problem.
- `k2-net-income-re` (numeric, fixni) — net income → ending retained earnings → total equity → total assets (BS balansira).
- `k2-net-income-random` (numeric, randomiziran) — NI + ending RE drill; `params` drže expenses<revenue (NI>0), sve cijelo.

**Engine NEPROMIJENJEN** (potvrđeno: guided journal s revenue/expense radi bez izmjena). Content pack sad **37 vježbi**.
**Testirano:** verify 0/0; node 95/95 + 13/13; grade-check (journal 6/6 + swapped-sides odbijeno + sve tx balansirane; net-income 4/4)
+ randomizacija deterministična/cjelobrojna/bez-negativnih kroz 400 seedova; Playwright **36/36**. Cache `?v=20260637`.
**Commit lokalno (NEDEPLOYANO).** **Slijedi:** B3.11 (TF/MC Ch7/8/13/14/15-16) → time je K2 plan KOMPLETAN.

---

## 2026-06-11 — Accounting B3.9: K2 Analyzing FS vježbe (Ch12)
Nastavak K2 (brick-by-brick). **5 novih vježbi** u `data/accounting/exercises.js` (`chapter:12`):
- `k2-ch12-concepts` (choice, 16 TF) — iz autentičnog Cote Assignment 12-1 „Terminology and Concepts"; **zadržane univerzalne** činjenice
  (assurance levels compilation<review<audit, accrual≠cash, common-size=vertical, acid-test, profit margin), **izbačene dvosmislene**
  (audit-vs-fraud, comparative-„common divisor") jer nema službenog answer-keya za Ch12.
- `k2-ch12-ratios` (ratio, fixni) — current 2,5:1, quick (acid-test) 1,25:1, profit margin 10% (quick isključuje inventory+prepaid).
- `k2-ch12-ratios-random` (ratio, randomiziran) — current + quick drill; `params` biraju salde tako da ratiji ispadnu ≤2 decimale.
- `k2-ch12-vertical` (ratio) — common-size IS: svaka stavka kao % od net sales (35/65/45/20).
- `k2-ch12-horizontal` (ratio) — $ i % promjena Y1→Y2 (dijeli s baznom godinom).

Definicije ratija usklađene sa study-kategorijom `financialAnalysis`. **Engine NEPROMIJENJEN.** Content pack sad **34 vježbe**.
**Testirano:** verify 0/0; node 95/95 + 13/13; grade-check (concepts 16/16, ratios 3/3, vertical 4/4, horizontal 4/4) + randomizacija
deterministična/≤2-decimale kroz 500 seedova; Playwright **36/36**. Cache `?v=20260636`. **Commit lokalno (NEDEPLOYANO).**
**Slijedi:** B3.10 (K2 journal: revenue/expense/RE + ending BS) — vidi `docs/architecture/EXERCISES_ENGINE.md` §6/§8.

---

## 2026-06-11 — ✅ DEPLOYANO (push `a6a62e2`) — B3.6 + B3.7 LIVE + B3.8 lokalno
**Deploy (uz potvrdu):** B3.6 (Ch11 Depreciation) + B3.7 (Inventory) gurnuti na produkciju (sokratstudy.com), `origin/main` @ `a6a62e2`, 0 ispred.
Midterm 2 „Exercises" tab sad LIVE ima **Chapter 11** + **Other (inventory)**. Cache `?v=20260634`.

## 2026-06-11 — Accounting B3.8: K2 Restaurant/Hotel ratios (Ch9/10)
Nastavak K2 (brick-by-brick). **4 nove `ratio` vježbe** u `data/accounting/exercises.js`:
- `k2-ch9-restaurant-ratios` (Ch9, fixni) — average check $16, seat turnover 1,5/dan, food cost 35%, labor 30% (120 sjedala × 300 dana).
- `k2-ch9-restaurant-random` (Ch9, randomiziran) — average check + food cost % („New numbers").
- `k2-ch10-hotel-ratios` (Ch10, fixni) — occupancy 75%, ADR $120, RevPAR $90 (200-sobni hotel, 73.000 room-nights).
- `k2-ch10-hotel-random` (Ch10, randomiziran) — occupancy/ADR/RevPAR; `params` biraju roomsAvailable/occ/ADR tako da sve ispadne cijelo (RevPAR = ADR × occupancy).

**Engine NEPROMIJENJEN.** Content pack sad **29 vježbi**. **USAR/USALI klasifikacija (Assignment 9-1/10-1) ODGOĐENA** — dvosmislene stavke
(franchise fees/menus/telecom) bez službenog answer-keya za Ch9/10 (solutions = samo Ch2–5) → rizik krivog auto-ocjenjivanja; dodat će se ako se nađe key.
**Testirano:** verify 0/0; node 95/95 + 13/13; grade-check (restaurant 4/4, hotel 3/3) + randomizacija deterministična/čista i givens prisutni kroz 400
seedova; Playwright **36/36**. Cache `?v=20260635`. **Commit lokalno (NEDEPLOYANO).** **Slijedi:** B3.9 (K2 Ch12 Analyzing FS) — `docs/architecture/EXERCISES_ENGINE.md` §6/§8.

---

## 2026-06-11 — Accounting B3.7: K2 Inventory vježbe (FIFO/LIFO/Average)
Nastavak K2 (brick-by-brick, bez deploya). **4 nove vježbe** u `data/accounting/exercises.js` (`lesson:'second-midterm'`,
**bez `chapter`** → grupiraju se pod „Other" na Midterm 2 listi, jer inventory valuation nije numerirano Cote poglavlje nego zasebna prezentacija):
- `k2-inv-concepts` (choice TF/MC) — FIFO/LIFO/weighted-average, rising-price efekt (FIFO ↑ending/↓COGS, LIFO obrnuto), COGS = BI+Purchases−EI.
- `k2-inv-cogs-formula` (numeric randomiziran) — Goods available = BI+Purchases; COGS = −EI („New numbers").
- `k2-inv-methods` (numeric fixni) — puna usporedba FIFO/LIFO/wtd-avg na čistim brojevima (400 j / $4.800 → FIFO 2.850/1.950,
  LIFO 3.200/1.600, avg $12 → 3.000/1.800); u sve tri metode COGS + ending = $4.800.
- `k2-inv-fifo-lifo-random` (numeric randomiziran) — 2-slojni FIFO/LIFO COGS+ending; `params` biraju jedinice/cijene tako da
  odgovori ispadnu cijeli i cross-check (COGS+ending = goods available) uvijek vrijedi.

**Engine NEPROMIJENJEN.** Average držan samo u fixnoj vježbi (randomizirani prosjek = decimalni drift). Content pack sad **25 vježbi**
(16 K1 + 5 K2 Ch11 + 4 K2 Inventory). **Testirano:** verify 0/0; node 95/95 + 13/13; grade-check (concepts 11/11, methods 9/9, sve metode
COGS+end=4.800) + randomizacija deterministična/cjelobrojna i cross-check kroz 300–400 seedova; Playwright **36/36**. Cache `?v=20260634`.
**Commit lokalno (NEDEPLOYANO).** **Slijedi:** B3.8 (K2 Restaurant/Hotel ratios, Ch9/10) — vidi `docs/architecture/EXERCISES_ENGINE.md` §6/§8.

---

## 2026-06-11 — Accounting B3.6: prve K2 interaktivne vježbe (Ch11 Depreciation)
Popunjen prazan „Exercises" tab na **Midtermu 2** — prva K2 cigla. **5 novih vježbi** u `data/accounting/exercises.js`
(`lesson:'second-midterm'`, `chapter:11`), iz izvora **Cote Assignment 11-1**:
- `k2-ch11-concepts` (choice TF/MC) — depreciation/amortization/depletion, contra-asset, book value, SL vs DDB, DDB stopa, MACRS=tax.
- `k2-ch11-sl-schedule` (numeric, fixni) — točan udžbenički straight-line raspored (cost 31.000 / salvage 3.000 / life 4 → 7.000/god),
  12 ćelija (exp/accum/book value × 4 god), završava na salvage 3.000.
- `k2-ch11-ddb-schedule` (numeric, fixni) — DDB stopa 50%, 4-godišnji raspored s **pravilom salvage-floora** (4. god. ekspenz 875, ne 1.938).
- `k2-ch11-sl-random` + `k2-ch11-ddb-random` (numeric, randomizirani) — drillovi s „New numbers" (`params`+`generate`); `life∈{4,5,10}` →
  svi odgovori ispadnu cijeli brojevi.

**Engine NEPROMIJENJEN** (potvrđeno — samo sadržaj + bump cache). MACRS ostaje konceptualno (bez izmišljanja IRS postotnih tablica).
Content pack sad **21 vježba** (16 K1 Ch1–6 + 5 K2 Ch11). **Testirano:** verify 0/0; node 95/95 + 13/13; node grade-check svih 5
(SL 12/12, DDB 9/9, concepts 12/12) + randomizacija deterministična i cjelobrojna kroz 200 seedova; Playwright **36/36**. Cache `?v=20260633`.
**Commit lokalno (NEDEPLOYANO).** **Slijedi:** B3.7 (K2 Inventory FIFO/LIFO/Average COGS) — vidi `docs/architecture/EXERCISES_ENGINE.md` §6/§8.

---

## 2026-06-11 — ✅ DEPLOYANO (push `a72d648`) — cijeli Exercises rad + FAZA 4 LIVE
`origin/main` sinkroniziran (0 ispred). Na produkciju (sokratstudy.com) otišlo **17 commitova**: cijeli Exercises engine (FAZA 0–2),
K1 interaktivne vježbe (B3.1–B3.5), review-fixevi RV-1/RV-2 (lista po poglavlju + demoi maknuti + Practice≠Exam), i **FAZA 4**
(Accounting → 3 lekcije K1/K2/finalni + novo K1 study gradivo). **Poznato/očekivano:** Midterm 2 → Exercises tab prazan jer K2
interaktivne vježbe još ne postoje (sljedeća faza B3.6–B3.11); Midterm 2 ipak ima pun study sadržaj (8 kat / 140 fc / 115 quiz / 78 fill / 8 learn).
Cache `?v=20260632`.

---

## 2026-06-11 — Accounting FAZA 4: restruktura na K1/K2/finalni (3 lekcije) GOTOVA
Predmet **Accounting** prebačen na standardnu strukturu „2 kolokvija + finalni" (kao sem-2 predmeti). Rađeno cigla-po-cigla, app zelen na svakom koraku
(nove data-datoteke autorirane uz postojeću strukturu; catalog prebačen tek u zadnjoj cigli).

**B4.1 (K1, NOVI sadržaj):** `data/accounting/midterm-1.js` (`window.accountingM1`) — 6 kategorija Ch1–6: `intro`, `businessFormation`,
`financialStatements`, `balanceSheet`, `incomeStatement`, `bookkeeping`. **87 fc / 74 quiz / 57 fill / 6 learn.** Predmet prije nije imao K1 teoriju
(7 starih kat. = ~K2). Autorirano iz Cote Ch1–6 + koncept-mape (ACCOUNTING_PLAN §3) + verificiranog znanja iz K1 vježbi. Commit `421322f`.
**B4.2 (K2):** `midterm-2.js` (`window.accountingM2`, 8 kat.) — referencira postojeće module (cross-env: browser globali / node `require`) +
preimenovan `secReports`→`annualReports` + **2 NOVE** kat. `restaurantAccounting` (Ch9) i `depreciation` (Ch11). **B4.3 (finalni):** `final.js`
(`window.accountingFinal`) = `Object.assign({}, M1, M2, {examPractice: finalPracticeData})` = 15 kat. Commit `9e5ba15`.
**B4.4 (wiring):** `catalog.js` → 3 lekcije (`first-midterm`/`second-midterm`/`final`) + scripts reorder (category moduli → midterm-1/2 → final ZADNJI)
+ resolve (M1/M2/Final); `index.js` maknut iz scripts (neiskorišten). Vježbe retagane `accounting-fundamentals`→`first-midterm` (svih 16 = K1).
Cache `?v=20260632` (catalog.js + content-loader.js + CONTENT_VERSION).
**B4.5 (provjere):** verify **0/0**, node **95/95 + 13/13**, Playwright **36/36** + ciljani **3/3** (K1: 6 kat + learn + 16 vježbi + naslovi poglavlja;
K2: 8 kat incl. nove; Final: 15 kat incl. examPractice).
**Napomena o napretku:** ključevi K2 kat. ostaju isti (osim `secReports`→`annualReports`); lekcijski ID `accounting-fundamentals` više ne postoji →
stari napredak pod tom lekcijom se re-buketira (očekivano kod restrukture, sem-1 staro gradivo). **Git: lokalno commitano, NEDEPLOYANO.**
**▶ Sljedeće (čeka korisnika):** deploy / K2 vježbe (B3.6–B3.11) / sljedeći sem-1 predmet (Entrepreneurship/E-Business restruktura).

---

## 2026-06-11 — Exercises review-nalazi RV-1 + RV-2 RIJEŠENI (lista po poglavlju + demoi maknuti; Practice ≠ Exam)
Nakon compacta korisnik je potvrdio odluke: **demoi = opcija A (makni sve)**, pa **stani za pregled**. Implementirano oboje.

**RV-1 (BUG-010) — lista:** `renderList` (`js/exercises.js`) sad **sortira po `ex.chapter`** (uzlazno, stabilno) i ubacuje **naslove
„Chapter N"** (`.ex-list-head`); kartica više ne nosi „Ch N" tag. **Maknuto 7 demo-vježbi** iz `data/accounting/exercises.js`
(`k1-choice-intro-1`, `k1-numeric-equity-1`, `k2-ratio-restaurant-1`, `k1-classify-ch6-1`, `k2-numeric-depreciation-1`,
`k1-journal-ale-1`, `k1-journal-free-1`); **zadržan** `k1-statement-bs-1` (pravi Ch4). Sadržaj sad **16 vježbi, čisti K1 (Ch1–6)**.
Unit test (`exercises-core.test.js`) prebačen na **inline fixture** za randomizaciju (engine-svojstvo → ne ovisi o obrisanom demou).

**RV-2 (BUG-011) — modovi:** `checkOpen`/`renderFeedback` sad primaju `currentMode`. **Exam** preskače markiranje i prikazuje
**samo rezultat** („Score: X / Y (Z%)"), bez otkrivanja točnih/po-stavci; **Practice** = puna povratna info + hintovi. Dodan
**opis aktivnog moda** (`MODE_DESC` → `.ex-mode-desc`) ispod mode-bara. Engine ostao generički (mod je već postojao).

**Testirano:** verify **0/0**, node **95/95 + 13/13**, Playwright **36/36** + ciljani **3/3** (sortiranje+naslovi+nema demoa;
exam=samo rezultat bez markiranja; hint practice↔exam). Cache **`?v=20260631`** (exercises.js + content-loader.js + exercises.css + CONTENT_VERSION).
**Git:** lokalno commitano, **NEDEPLOYANO** (sad ~14 commitova ispred `origin/main`). **▶ Nastavak (čeka korisnika):** odluka
**deploy (push) / FAZA 4 (split K1/K2/finalni + teorija) / K2 vježbe (B3.6–B3.11)**. Lokalni server :5050 za pregled.

---

## 2026-06-11 — Korisnički pregled K1 vježbi: 2 nalaza zabilježena, rad PAUZIRAN (priprema za compact)
Korisnik je proklikao K1 vježbe lokalno (`serve:test` na :5050, `v=20260630`) i javio **dva prava nalaza**. Odluka: **zapisati sve, NE dirati kod sada.**

**Nalaz 1 (BUG-010) — lista „razbacana":** vježbe se prikazuju redoslijedom u nizu (nije po poglavlju); na vrhu stari demoi iz FAZE 1/2,
među njima 2 K2 demoa (CH9 RevPAR, CH11 amortizacija) koji vire u K1. Uzrok: `renderList` ne sortira po `chapter`; sve je u jednoj lekciji
`accounting-fundamentals` (nema K1/K2 splita — FAZA 4).
**Nalaz 2 (BUG-011) — Practice ≈ Exam:** jedina razlika je skrivanje hintova na numeric/ratio; ostalo identično, „Check" feedback isti u oba moda.

**Plan (čeka odluku korisnika):** detaljno u `docs/architecture/EXERCISES_ENGINE.md` §6 „Review-nalazi" (RV-1, RV-2) + `docs/records/BUGS.md` (BUG-010/011).
Sažeto: RV-1 = sortiraj listu po poglavlju + naslovi + (preporuka) makni demoe → čisti K1; RV-2 = Exam = samo rezultat bez po-stavci
označavanja (Practice zadrži punu povratnu info). Oboje dira engine (`renderList`; `checkOpen`/`mark` po modu) → male generičke dopune.

**Git stanje (na pauzi):** grana `main`, **12 commitova ispred `origin/main`, sve NEdeployano** — cijeli Exercises rad: engine (FAZA 0–2:
`3324e72`/`ac5315d`/`7aa45bf` + doc), K1 sadržaj (B3.1 `eeeb607`, B3.2 `aac19c1`, B3.3 `46c6623`, B3.4 `18b1238`, B3.5 `68572be`),
givens-fix `57fafdb`, doc-nalazi `1282997`. Radno stablo čisto (sve doc-izmjene commitane).
**Sve testirano i zeleno** do zadnjeg commita (verify 0/0, node 95/95+13/13, Playwright 36/36). K1 SADRŽAJ KOMPLETAN (Ch1–6).
**▶ Nastavak nakon compacta:** RV-1 → RV-2 → pa odluka **deploy (push) / FAZA 4 (restruktura+teorija) / K2 vježbe**. Ništa se ne pusha bez izričite potvrde.

---

## 2026-06-11 — Exercises review-fix: `statement` givens tablica (Build BS + IS sad prikazuju izvorne brojeve)
**Pregled (korisnik):** u „Build the Balance Sheet" nije bilo vidljivih brojeva iz kojih se gradi izvještaj — `statement` widget renderirao
je samo prazna polja, a izvorni saldi su postojali samo kao odgovori u kodu. Isti problem i novi „Build the Income Statement".
**Popravak:** mala generička engine dopuna — `statement` widget sad renderira **givens tablicu** kad vježba ima `ex.givens` (isti mehanizam
kao `ratio`; izdvojen zajednički helper `givensTableHtml`, oba widgeta ga dijele). Dodani izvorni saldi: `k1-statement-bs-1` (6) i
`k1-ch3-income-statement` (17). Unatrag-kompatibilno (bez `givens` → ponašanje nepromijenjeno). Ovo je 2. mala engine dopuna (nakon B3.1 classify),
obje generičke i tražene stvarnim sadržajem.
**Testirano:** verify 0/0; node 95/95 + 13/13; Playwright 36/36 + ciljani 3/3 (BS/IS prikazuju brojeve i ocjenjuju „Correct"; ratio bez regresije).
Cache `?v=20260630` (exercises.js + content-loader.js + CONTENT_VERSION). Lokalno, nedeployano.

---

## 2026-06-11 — Accounting Exercises: FAZA 3 — Ch1–2 Intro/GAAP/Business Forms (B3.5) GOTOV → K1 SADRŽAJ KOMPLETAN (lokalno)
Zadnje K1 poglavlje. **Nalaz:** Cote workbook NEMA zaseban numerički set za Ch1–2 (uvodna poglavlja; postoji samo answer-key za
Assignment 2-1 bez teksta pitanja). Zato Ch1–2 = **konceptualna teorija** iz standardnih, nedvosmislenih računovodstvenih činjenica
(GAAP, oblici poslovanja, korporativni stock) — NE izmišljeni workbook-brojevi.

**B3.5 (Ch1–2):** 2 nove choice vježbe: `k1-ch1-concepts` (11 TF/MC: računovodstvena jednadžba, 4 financijska izvještaja, GAAP —
business entity/going concern/cost/accrual/matching/monetary unit/conservatism), `k1-ch2-business-forms` (13 TF/MC: proprietorship/
partnership/corporation, unlimited vs limited liability, par vs market, authorized≥issued≥outstanding, treasury, APIC, owner’s capital).
**Engine 0 izmjena.**
**Testirano:** node 95/95 + 13/13; verify 0/0; Playwright 36/36 + ciljani 2/2. Cache `?v=20260629`. Lokalno, nedeployano.

### 🎯 K1 SADRŽAJ KOMPLETAN (Ch1–6)
Sve poglavlje K1 sad ima prave, auto-ocjenjivane vježbe (sve iza `features.exercises`, engine nepromijenjen kroz B3.1–B3.5):
Ch1 (intro/GAAP), Ch2 (business forms/stock), Ch3 (survey FS: TF/terms/IS-BS/capital/income statement),
Ch4 (balance sheet: TF/terms/classify/build), Ch5 (income statement: TF/classify/food cost), Ch6 (bookkeeping: classify+effect / guided journal ALE).
**▶ Sljedeće:** FAZA 4 — restruktura accounting catalog-a na K1/K2/finalni (3 lekcije) + dopis teorije-kategorija (Ch1–6) ili nastavak K2 sadržaja (Ch7–16). Čeka odluku/materijale.

---

## 2026-06-11 — Accounting Exercises: FAZA 3 — Ch3 Survey of Financial Statements sadržaj (B3.4) GOTOV (lokalno)
Nastavak K1. Izvor: Cote workbook **Assignments 3-1/3-2/3-3**; **sva rješenja provjerena** na službenim solution stranicama
(`solutions-chapters-2-5` pp. 2–4) — uklj. sporne stavke (3-1 #11 SCF $5k vs $45k, 3-2 #4c „acc. depreciation NOT used for china/glass" = **TR**).

**B3.4 (Ch3 — Survey FS):** 5 novih vježbi:
`k1-ch3-tf` (14 T/F), `k1-ch3-terms` (10 pojmova → MC), `k1-ch3-isbs` (`classify` jednoosno: Income Statement vs Balance Sheet, 5 stavki),
`k1-ch3-capital` (`ratio`: owner’s capital roll-forward 40k+5k+20k−14k = **51.000**; AP/AR su distraktori → uči „select the correct info"),
`k1-ch3-income-statement` (`statement`: puni Income Statement „Annie’s Restaurant, Inc.", 16 linija + 9 kaskadnih totala; svi izračuni
provjereni kernelom/ručno → **Net Income 57.000**).
**Engine 0 izmjena.** (Reuse: `ratio` za roll-forward, `statement` za IS — isti obrazac kao Ch4 balance sheet.)
**Testirano:** node 95/95 + 13/13; verify 0/0; Playwright 36/36 + ciljani 5/5 (svih 5 vježbi → „Correct"). Cache `?v=20260628`. Lokalno, nedeployano.
**▶ Sljedeće:** B3.5 (Ch1–2 — intro/GAAP/oblici poslovanja/stock, uglavnom choice) → time je **K1 sadržaj kompletan** → FAZA 4 (restruktura K1/K2/finalni).

---

## 2026-06-11 — Accounting Exercises: FAZA 3 — Ch6 Bookkeeping process sadržaj (B3.3) GOTOV (lokalno)
Nastavak K1. Izvor: Cote workbook **Assignment 6-2** (Increase/Decrease Effect) + profesorski worked example **„Bookkeeping process"**
(T-računi asset/liability/equity; entry-ji verificirani prema knjiženom ledgeru u `Exercise-bookkeeping-solutions`).

**B3.3 (Ch6 — Bookkeeping):** 2 nove vježbe:
`k1-ch6-classify` (10 nezavisnih transakcija → **dvoosno**: klasa A/L/EQ/R/EX **+ I/D efekt**; pokriva rent expense, kupnja imovine
s kreditom, perpetual nabava/izdavanje, guest tab cash vs in-house kredit, split rate hipoteke principal/kamata, ulog vlasnika, isplata, remitiranje poreza),
`k1-ch6-journal` (**guided journal ALE**, 6 transakcija; nastavlja otvoreni ledger preko `beginningBalances`; završni saldi provjereni
kernelom: Cash 148.200 / AR 0 / Food Inv 16.000 / Prepaid Rent 4.000 / AP 4.200 / CSI 178.500 / APIC 10.000; uklj. 3-linijski entry — dionice iznad pari).
**Engine 0 izmjena.** (Napomena: guided mod NE prikazuje A=L+E traku → djelomični `beginningBalances` su OK; grade je per-transakcija.)
**Testirano:** node 95/95 + 13/13; verify 0/0; Playwright 36/36 + ciljani 2/2 (classify 26 linija → „Correct"; journal 6 tx → „Correct"). Cache `?v=20260627`. Lokalno, nedeployano.
**▶ Sljedeće:** B3.4 (Ch3 Survey FS — `numeric` equity/RE + `statement` 3 izvještaja), pa Ch1–2 (intro/GAAP, choice).

---

## 2026-06-11 — Accounting Exercises: FAZA 3 — Ch5 Income Statement sadržaj (B3.2) GOTOV (lokalno)
Nastavak autoriranja K1 po poglavlju. Izvor: `tmp-acc/img/` (Cote workbook Exercises-5 + **službena rješenja** `solutions-chapters-2-5`).

**B3.2 (Ch5 — Income Statement):** 3 nove vježbe (rješenja provjerena na izvoru):
`k1-ch5-tf` (10 TF), `k1-ch5-classify` (30 računa → **5-osna** klasifikacija Asset/Liability/Equity/Revenue/Expense — reuse jednoosnog
`classify` iz B3.1), `k1-ch5-foodcost` (`ratio`: Beginning+Direct+Storeroom → Cost of Food **Available** 35.445; −Ending → Cost of Food **Used** 25.385).
**Engine nepromijenjen** — čisti sadržaj (0 izmjena enginea).
**Testirano:** node 95/95 + 13/13; verify 0/0; Playwright 36/36 + ciljani 2/2 (food cost → „Correct"; 30 računa → „Correct"). Cache `?v=20260626`. Lokalno, nedeployano.
**▶ Sljedeće:** B3.3 (Ch6 Bookkeeping — `classify` I/D effect + `journal` ALE), pa Ch3/Ch1–2.

---

## 2026-06-11 — Accounting Exercises: FAZA 3 počela — Ch4 Balance Sheet sadržaj (B3.1) GOTOV (lokalno)
Engine je gotov (faze 0–2); kreće autoriranje SADRŽAJA po poglavlju (K1 prvo). Izvor: `tmp-acc/img/` (133 JPG renderiranih iz
„nečitljivih" PDF-ova) — Cote workbook + **službena rješenja** (`solutions-chapters-2-5`).

**B3.1 (Ch4 — Balance Sheet):** 3 nove vježbe iz Assignment 4-1 (rješenja provjerena na izvoru):
`k1-ch4-tf` (15 TF — npr. nalaz da je „china/glass/silver = P&E" **TR**, ne bi se pogodilo), `k1-ch4-terms` (8 pojmova MC),
`k1-ch4-classify` (20 računa → bilančna kategorija). + postojeći `k1-statement-bs-1` (balance sheet build).
**Mala engine generalizacija (unatrag-kompatibilna):** `classify` effect-dropdown opcionalan → jednoosna klasifikacija (samo klasa).
**Testirano:** node 95/95 + 13/13; verify 0/0; Playwright 36/36 + ciljani 8/8 (20 računa → „Correct"). Cache `?v=20260625`. Lokalno, nedeployano.
**▶ Sljedeće:** B3.2 (Ch5 Income Statement), pa Ch6/Ch3/Ch1–2.

---

## 2026-06-11 — Accounting Exercises engine: FAZA 2 (journal / pravi double-entry) GOTOVA (lokalno)
**Nastavak** Faze 1. Cilj: `journal` tip s pravim knjiženjem, T-računima i ocjenom po saldima.

**Napravljeno (B2.1–B2.5):**
- **`js/acc-kernel.js`** (čisto, bez DOM/ovisnosti): `isBalanced`, `postEntries`/`deriveEndingBalances`, `classifyTotals` (A=L+E),
  `tAccounts`, `gradeEndingBalances`. `chartOfAccounts:[{name,normal:'D'|'C',section}]`. Node **13/13**.
- **journal GUIDED** (B2.2): fiksne linije po transakciji; `gradeJournal` u jezgri (`gradeSet` multiset + Σd=Σc balance); per-transakcija status.
- **journal FREE** (B2.3, `ex.free`): dodaj/ukloni linije, account picker, **live auto-posting u T-račune**, ocjena po završnim saldima (`gradeEndingBalances`).
- **Živa traka** (B2.4): Σdebit=Σcredit + **A = L + E** (iz `classifyTotals`), prebacuje balanced↔unbalanced uživo dok korisnik tipka.
- Widget registry proširen: `widget.grade` (custom, za free) uz imenovani grader iz jezgre. 3 demo journal vježbe.

**Testirano:** verify **0/0**; node **92/92** (exercises-core) **+ 13/13** (acc-kernel); Playwright **36/36** (smoke 9 predmeta 0 errora) +
ciljani temp specovi po cigli (guided/free/A=L+E — prošli pa obrisani). Cache `?v=20260624`.

**Stanje:** commitano lokalno (FAZA 2), **ništa deployano**. **▶ Sljedeće:** FAZA 3 — autoriranje sadržaja po poglavlju (K1 prvo); pa FAZA 4 (restruktura K1/K2/finalni).

---

## 2026-06-10 — Accounting Exercises engine: FAZA 1 (svih 5 tipova + modovi + randomizacija + napredak) GOTOVA (lokalno)
**Nastavak** Faze 0. Cilj: generički, auto-ocjenjivi tipovi vježbi iza feature-flaga.

**Napravljeno (B1.1–B1.9):**
- **5 tipova** (svaki: čisti grader u `js/exercises-core.js` + DOM widget u `js/exercises.js` kroz **WIDGET registry**):
  `choice` (TF+MC, `gradeChoice`), `numeric` (`gradeNumeric`/`numEq`), `ratio` (givens + reuse `gradeNumeric`),
  `statement` (`statementCells`+`gradeStatement`/`numEqMoney`, balancing figure), `classify` (`gradeClassify`, zadani račun→klasa+efekt).
- **3 moda** (practice/exam/walkthrough) + mode-bar; walkthrough crta `solution[]`; exam skriva hintove; feedback s %.
- **Randomizacija**: `params`+`generate(p)` (deterministički preko `pickParams`/seed) + „New numbers"; demo straight-line amortizacija.
- **Napredak**: `saveProgress`→`<subject>-exercises-progress` (done/best/attempts); kartica na Progress stranici (`js/progress.js` + markup).
- **6 demo vježbi** u `data/accounting/exercises.js` (pravi K1/K2 sadržaj: intro choice, equity numeric, restaurant ratio, BS statement, Ch6 classify, depreciation random).

**Testirano:** node **86/86** (`npm run test:unit`); verify **0/0**; Playwright **36/36** (0 regresija; smoke 9 predmeta 0 errora) + ciljani temp
specovi po cigli (choice/numeric/ratio/statement/classify/modes/random/progress — svi prošli pa obrisani). Cache `?v=20260623`.
**Nalaz usput:** test je krivo tretirao `'10200.004'` kao decimalu — `parseAmount` to ISPRAVNO čita kao grupiranje (3 znamenke iza); cents-safety testiran na floatu.

**Stanje:** commitano lokalno (FAZA 1), **ništa deployano**. **▶ Sljedeće:** FAZA 2 — `journal` tip (pravi double-entry, `acc-kernel.js`); pa FAZA 3 (sadržaj po poglavlju).

---

## 2026-06-10 — Accounting Exercises engine: FAZA 0 (scaffold) GOTOVA (lokalno, nedeployano)
**Kontekst:** krenuo razvoj interaktivnog **Exercises** sustava (plan `docs/architecture/EXERCISES_ENGINE.md` §6, cigla-po-cigla).
Cilj Faze 0: kompletan engine temelj iza feature-flaga, **nula vidljivih promjena** dok predmet nema flag.

**Napravljeno (B0.1–B0.9):**
- **`js/exercises-core.js`** (čista jezgra, bez DOM-a): `parseAmount` (EU/US format, valuta, zagrade=neg), `formatAmount`,
  `numEq` (apsolutna tol), `numEqMoney` (centi, float-safe `toCents`), `gradeSet` (multiset, redoslijed-neovisno,
  case/space-insensitive ključ), `seededRandom` (mulberry32), `pickParams` (deterministički; `{min,max,step}`/`choices`/literal).
- **`tests/unit/exercises-core.test.js`** + `npm run test:unit` — mali runner bez frameworka, **60/60** (EU/US, 1.005 rub, multiset, determinizam).
- **`css/exercises.css`** (`ex-`-prefiks) + `@import` u styles.css; **`js/exercises.js`** `initExercises()` (lista/prazno stanje/shell).
- **`index.html`**: `#exercises` sekcija + 2 skrivena nav gumba (desktop+mobile).
- **`js/navigation.js`**: `applyFeatureNav()` data-driven (catalog `features`); **blindMap refaktoriran** (`geography` hardkod → `features.blindMap`); `switchSection('exercises')→initExercises()`.
- **`data/catalog.js`**: accounting → `features.exercises:true` + `content.exercises:'accountingExercises'` + script. **`data/accounting/exercises.js`** skeleton (`window.accountingExercises`, prazna lista).

**Testirano:** verify **0/0** (9 predmeta); node unit **60/60**; Playwright **44/44** (36 bazni + 8 ciljanih: accounting tab+prazno
stanje, te2 bez taba, geography zadržava Map; smoke 9 predmeta 0 problema 0 errora). **Usput popravljeno:** Playwright je `*.test.js`
node-runnera tretirao kao svoj test pa ga `process.exit()` rušio → `testIgnore:['unit/**']` u `playwright.config.js`. Cache svuda `?v=20260622`.

**Stanje:** sve commitano lokalno (FAZA 0), **ništa deployano**. **▶ Sljedeće:** FAZA 1 — generički tipovi widgeta (B1.1 `choice`: renderer+grader+demo+test).

---

## 2026-06-10 — Ispravak opsega 2. god + plan restrukture sem-1 predmeta (SAMO dokumentacija)
**Kontekst:** korisnik provjerom otkrio da predmeti **2. god semestra 1** (Tourism Economics, Entrepreneurship, Accounting,
E-Business) realno **imaju 2 kolokvija + završni**, ali u aplikaciji NISU u toj strukturi (stari root `data-*.js`, ad-hoc
lekcije). → Ranija tvrdnja „2. god 100% kompletna (9/9)" je **netočna i ispravljena** u svim docovima (CLAUDE/ROADMAP/PROGRESS/memorija).

**Točno stanje 2. god (8 predmeta):**
- **sem 2 = 4/4 KOMPLETNO i LIVE:** Economics in Hospitality, Marketing, Tourism Geography, Food & Nutrition (svi K1+K2+finalni).
- **sem 1 = 4 predmeta trebaju restrukturu na K1/K2/finalni:** te2 (2 lekcije: `studyData` 6 kat + `te2FinalData` 9 kat),
  Entrepreneurship (1 blok `entrepreneurshipData` 11 kat pod 2 imena lekcije), Accounting (1 lekcija `accountingData` 7 kat /
  7 modula), E-Business (1 lekcija `ebusinessData` 14 kat / „15 units").

**Plan (detaljno u [BACKLOG.md](./BACKLOG.md)):** po predmetu — silabus → K1/K2 split → finalni hibrid (`Object.assign({},K1,K2,
{examPractice})`), catalog 3 lekcije + 3 scripta, bump verzija, verify + Playwright. Dio posla je SPLIT postojećeg sadržaja
(ne pisanje od nule) + kurirana `examPractice`. **Čeka materijale/silabus po predmetu.** ADR-006 „ne preslagivati stare predmete"
nadjačan za sadržajno upotpunjavanje; migracija u bazu i dalje JEDNOM u Bloku B. **Ovaj korak = samo dokumentacija (bez koda); priprema za compact.**

**▶ Sljedeće:** 2. god sem 1 restruktura (kad stignu materijali) → pa **1. godina**.

---

## 2026-06-10 — DEPLOY ✅ (`05cb0af`) — cijeli Food & Nutrition + BUG-009 LIVE
Korisnik autorizirao: „deploy svega na github". `git push origin main` (`71e53b5..05cb0af`) → produkcija (Vercel).
LIVE 3 commita: **fix BUG-009** (Entrepreneurship fill-blank, `9f32df4`) + **Food & Nutrition 2. kolokvij** (Teme 8–14 +
Beer premješten iz K1 + K1 verificiran, `1c52a5f`) + **Food & Nutrition finalni hibrid** (15 kat. / 174 fc, `05cb0af`).
`origin/main` sinkroniziran, radno stablo čisto, ništa lokalno nedeployano. (Pre-flight: verify 0, Playwright 40/40.) Cache `20260621`.
→ **Food & Nutrition 100% KOMPLETAN i LIVE.** (Ispravak: 2. god NIJE potpuno gotova — sem 2 = 4/4, ali sem 1 = 4 stara
predmeta trebaju restrukturu; vidi unos iznad + [BACKLOG.md](./BACKLOG.md).)

**▶ Sljedeće:** restruktura 4 predmeta 2. god sem 1, pa **1. godina**.

---

## 2026-06-10 — Sesija: Food & Nutrition FINALNI ispit (hibrid) — predmet 100% gotov
**Kontekst:** korisnik: „nemamo još završni ispit iz food and nutritiona, molim te ga napravi… polako, koncentrirano,
s provjerama i velikom todo listom". Silabus (FAN Introduction): finalni = **30% (min 15%), obavezan**, prag za izlazak
**35%**; **16 pitanja** (12 kratkih × 1.5% + 4 esejska × 3%), pokriva sve Teme 1–14.

**Struktura = HIBRID** (isti obrazac kao Marketing/Economics/Geography/BI): novi `data-food-nutrition-final.js` →
`foodNutritionFinalData = Object.assign({}, foodNutritionData, foodNutritionM2Data, { examPractice })`. Spaja svih
**14 kategorija** oba kolokvija (7 K1 Teme 1–7 + 7 K2 Teme 8–14; nema kolizija ključeva) i dodaje kuriranu
**`examPractice`** („Exam Practice (All Topics)", 14 fc / 12 quiz / 8 fill + „Final Exam Roadmap" learn: must-know po temi
+ cross-topic niti fermentacija/alkohol-ljestvica/sigurnost hrane/kvaliteta proteina). Učitava se **ZADNJI** (ovisi o
`window.foodNutritionData` + `window.foodNutritionM2Data`).

**Catalog:** nova lekcija `final`, `scripts` += `data-food-nutrition-final.js` (zadnji), `resolve.final = foodNutritionFinalData`.

**Provjere:** `CONTENT_VERSION` 20260620→20260621 + bump `catalog.js`/`content-loader.js` `?v=20260621`. **Verify 0**
(food-nutrition: 3 lekcije zelene), strukturni validator merge-a 0 (**15 kat. / 174 fc / 182 quiz / 122 fill**; 0 loših
quiz-indeksa, 0 fill bez `_______`, 0 kat. bez Learn; merge potvrđen: wine+healthyDiet+examPractice prisutni), **Playwright**
+ ciljani final render-test (4 profila, quizOpts=16). Lokalni commit; **NIJE deployano** (čeka potvrdu). `tmp-*` obrisani.
→ **Food & Nutrition 100% KOMPLETAN (K1 + K2 + finalni).**

**▶ Sljedeće:** opcija — deploy (3 lokalna commita: BUG-009 + F&N K2 + F&N finalni); zatim **1. godina** (Management/Macroeconomics/SIT).

---

## 2026-06-10 — Sesija: Food & Nutrition 2. kolokvij + usklađivanje podjele sa silabusom
**Kontekst:** korisnik: „krenimo na food and nutrition… pregledaj jeli se podudara sa prvim midtermom". Izvori = mapa
`2. godina Hospitaliy Managament/food and nutrition` (FAN 1–14 + Introduction). Ekstrakcija `node scripts/pdf-text.js` → `tmp-fan/`.

**Ključni nalaz (silabus, FAN Introduction slajd 3):** 1. kolokvij = Teme **1–7**, 2. kolokvij = Teme **8–14**. Postojeći
1. kolokvij je pogrešno uključivao **Beer (Tema 8)**. Uz korisnikovo odobrenje (uskladi sa silabusom): **Beer premješten** u K2
(sadržaj identičan, ključ `beer` nepromijenjen → napredak očuvan). K1 sada 7 kat. (Teme 1–7, završava na Wine).

**Verifikacija K1 (na zahtjev korisnika):** sadržaj Tema 1–7 usporedjen s izvorima FAN 1–7 — **0 činjeničnih grešaka**,
sve brojke/definicije točne i vjerne (energetske vrijednosti, klasifikacije, temperature procesa, postoci sastava…).

**K2 izgrađen** = `data-food-nutrition-m2.js` (`foodNutritionM2Data`, 7 kat. po temi: Beer / Distilled Spirits & Liqueurs /
Meat / Fish / Milk & Dairy / Eggs / Healthy Diet; **71 fc / 84 quiz / 56 fill / 7 learn**). Catalog: `scripts` += m2,
`resolve.second-midterm = foodNutritionM2Data`, opisi lekcija osvježeni, coming-soon uklonjen.

**Provjere:** `CONTENT_VERSION` 20260619→20260620 + bump `catalog.js`/`content-loader.js` `?v=20260620`. **Verify 0**;
strukturni validator K2 0 (0 loših quiz-indeksa, 0 fill bez `_______`, 0 kat. bez Learn); **Playwright 36/36** + ciljani
K2 render-test (4 profila). Lokalni commit; **NIJE deployano** (čeka potvrdu). `tmp-fan/` obrisan prije commita.
→ **Food & Nutrition KOMPLETAN (1. + 2. kolokvij).**

**▶ Sljedeće:** opcija — finalni hibrid za Food & Nutrition (uzor Marketing/Econ/Geo); zatim **1. godina**.

---

## 2026-06-10 — Potpuna revizija cijelog rada + fix BUG-009 (Entrepreneurship fill-blank)
**Kontekst:** korisnik: „pregledaj jako detaljno cijeli rad". Prošla cijela provjera zdravlja projekta:
git (sinkroniziran, čisto, sve LIVE `71e53b5`), `verify` **0/0**, cache tokeni dosljedni (20260618),
svi izvorni materijali gitignorani, docs/memorija konzistentni, **0 aktivnih bugova**, Playwright **36/36**.

**Potpuni content-audit (svih 9 predmeta):** strukturni validator po lekciji — 0 loših quiz-indeksa,
0 kategorija bez Learn, 0 loših fill **osim** jednog. Accounting „greška" u auditu = lažno pozitivna
(CommonJS module-scope vs. browserov dijeljeni `<script>` scope; preko `vm` sa zajedničkim contextom
zdrav: 7 kat. / 124 fc / 107 quiz / 70 fill).

**BUG-009 (nađen + riješen):** `data-entrepreneurship.js` (kat. `tourism`, fill #0) imao `______` (6) umjesto
`_______` (7) → `js/fill-blanks.js` traži točno 7-znakovni token, pa se praznina nije renderirala. Ispravljeno
na 7. Re-audit: Entrepreneurship 53 fill / 0 loših. `CONTENT_VERSION` 20260618→20260619 + bump
`content-loader.js?v=20260619`. Verify 0; Playwright 36/36. Lokalni commit; **NIJE deployano** (čeka potvrdu).

**▶ Sljedeće:** po potvrdi — deploy fixa; zatim **Food & Nutrition 2. kolokvij** (zadnje na 2. godini).

---

## 2026-06-10 — DEPLOY ✅ (`a8e7371`) — cijeli Tourism Geography LIVE
Korisnik autorizirao: „pushaj sva 4 commita". `git push origin main` (`33b9f72..a8e7371`) → produkcija (Vercel).
LIVE: **cijeli Tourism Geography** — 1. kolokvij popravak (`09eb48d`, S30) + 2. kolokvij „svjetska geografija"
(`8efeaf3`, S31) + ROADMAP doc fix (`b858440`) + **finalni hibrid** (`a8e7371`, S32). `origin/main` sinkroniziran,
radno stablo čisto, ništa lokalno nedeployano. (Pre-flight: `verify` 0, Playwright 36/36.) Cache `20260618`.
→ **Tourism Geography 100% KOMPLETAN i LIVE (K1 + K2 + finalni).**

**▶ Sljedeće:** priprema za compact (gotovo); zatim **Food & Nutrition 2. kolokvij** (zadnje na 2. godini).

---

## 2026-06-10 — Sesija 32: Tourism Geography FINALNI ispit (hibrid) — predmet 100% gotov
**Kontekst:** Nakon 1. i 2. kolokvija (S30/S31), korisnik: „napravimo pripremu za završni iz geografije". Silabus
(prez. 0): finalni = **30 bodova, ista struktura kao kolokviji** (10 pitanja: 5 zatvorenih + 5 otvorenih), pokriva
SVE (Hrvatska + svijet); 35 bodova je uvjet za izlazak na završni.

**Struktura = HIBRID** (isti obrazac kao Marketing/Economics/BI finalni): novi `data-geography-final.js` →
`geographyFinalData = Object.assign({}, geographyData, geographyM2Data, { examPractice })`. Spaja svih **12 kategorija**
oba kolokvija (nema kolizija ključeva: K1 examFramework/introToGeography/blindMapDrill/croatiaFeatures/
protectedAndTouristRegions/cityImageRecognition + K2 globalIntro/europe/asia/africa/australiaOceania/americas) i dodaje
kuriranu **`examPractice`** („Exam Practice (Croatia + World)", 14 fc / 10 quiz / 8 fill + „Final Exam Roadmap" learn
s must-know tablicom po kontinentu). Učitava se **ZADNJI** (ovisi o `window.geographyData` + `window.geographyM2Data`).

**Catalog:** nova lekcija `final`, `scripts` += `data-geography-final.js` (zadnji), `resolve.final = geographyFinalData`.

**Provjere:** `CONTENT_VERSION` 20260617→20260618 + bump `catalog.js`/`content-loader.js` `?v=20260618`. **Verify 0**
(geography: 3 lekcije sve zelene), strukturni validator finalnog merge-a 0 (**13 kat. / 128 fc / 127 quiz / 84 fill**;
0 loših quiz-indeksa, 0 fill bez praznine), **Playwright 36/36** + ciljani final render-test (4 profila: merged=true =
croatiaFeatures+americas+examPractice aktivni, 0 problema/overflowa, obrisan). Lokalni commit; **NIJE deployano**.
→ **Tourism Geography 100% KOMPLETAN (K1 + K2 + finalni).**

**▶ Sljedeće (dogovoreno):** **deploy svega** (geo K1+K2+finalni + doc fix), pa **priprema za compact**. Zatim Food & Nutrition 2. kolokvij.

---

## 2026-06-09 — Sesija 31: Tourism Geography 2. kolokvij („svjetska geografija") — predmet kompletiran
**Kontekst:** Nakon popravka 1. kolokvija (S30), korisnik: „idemo prvo na drugi kolokvij". Prezentacije 7–12
(oznaka `_2K_`) = **„Tourism Geography of the World"** — svjetska turistička geografija po kontinentima.

**Izvori (ekstrakcija `scripts/pdf-text.js`):** 7 = uvod (globalni turizam, UNWTO; slikovno) · 8 = Europa ·
9 = Azija · 10 = Afrika · 11 = Australija i Oceanija · 12 = Amerike (SAD, Meksiko, Brazil).

**Napravljeno:** novi sibling fajl **`data-geography-m2.js`** (`window.geographyM2Data` + `module.exports`) sa **6
kategorija po kontinentu**: `globalIntro`, `europe`, `asia`, `africa`, `australiaOceania`, `americas`
(**56 fc / 45 quiz / 33 fill / 6 learn**). Brojke doslovno sa slajdova (Azija 44,5 mil. km²/~60% čovječanstva i
Indija+Kina; Europa ~740 mil. + Golfska struja +4/+8–10 °C; Afrika 30 mil. km²/Gibraltar 14 km/Suez 163 km;
Australija 7,7 mil. km²/Gondwana; SAD GDP/cap ~80.000$/Yellowstone 1872/61 NP; Brazil/Brasília UNESCO 1987/Rio).
**Catalog:** `scripts` += `data-geography-m2.js`, `resolve.second-midterm = geographyM2Data`, coming-soon uklonjen,
opisi lekcija osvježeni. **Slijepa karta ostaje na 1. kolokviju** (m2 nema blind-map kategoriju).

**Provjere:** `CONTENT_VERSION` 20260616→20260617 + bump `catalog.js`/`content-loader.js` `?v=20260617`. **Verify 0**,
strukturni validator 0 (6 kat. / 56 / 45 / 33; 0 loših quiz-indeksa, 0 fill bez praznine), **Playwright 36/36** +
ciljani K2 render-test (4 profila: kategorije `europe`/`americas` aktivne, 0 problema/overflowa, obrisan).
Lokalni commit; **NIJE deployano** (čeka potvrdu). → **Tourism Geography KOMPLETAN (1. + 2. kolokvij).**

**▶ Sljedeće:** **Food & Nutrition 2. kolokvij** (zadnje na 2. godini); zatim 1. godina.

---

## 2026-06-09 — Sesija 30: Tourism Geography 1. kolokvij — popravak + obogaćivanje iz izvora
**Kontekst:** Korisnik: „geografija nije dobro napravljena, samo je karta dobra" → uputa: pregledaj trenutno
stanje (slijepu kartu NE dirati), proučii prez. 1–6, pa popravi 1. kolokvij. Folder `Tourism Geography` ima
prez. 0–12; imena otkrivaju podjelu: **0–6 = 1. kolokvij** (Welcome, Introduction, HM-TG 2–6), **7–12 = 2. kolokvij**
(oznaka `_2K_` = „Tourism Geography of the World").

**Nalaz (važno):** ekstrakcija svih 6 prezentacija (`scripts/pdf-text.js`) pokazala je da **„sumnjive" brojke NISU
pogrešne** — GDP 23.200 EUR (80% EU), 170.723 radne dozvole (građevinarstvo 31% / turizam 31% / industrija 14% /
promet 8% / trgovina 5% / ostalo 11%), Top 10 noćenja 2024 (Dubrovnik 4.192.151 …) — sve doslovno sa slajdova prez. 3.
Pravi problem: **falio je cijeli konceptualni „Introduction to Geography"** koji silabus (prez. 0) eksplicitno traži za
1. kolokvij, a postojeći tekst je bio tanak i nepovezan sa slajdovima.

**Napravljeno (`data-geography.js`):**
- **+ nova kategorija `introToGeography`** (prez. 1): definicija/podrijetlo geografije, deduktivni pristup, regionalna
  geografija, humana geografija (stanovništvo/ekonomija/naselja), što proučava turistička geografija, definicija
  turističke destinacije, 3 kriterija regionalizacije. (10 fc / 9 quiz / 7 fill / learn)
- **`croatiaFeatures` prepisan** vjerno prez. 2 (relief+Alpide orogeneza, 3 tipa krša, klima, hidrografija 38‰,
  biogeo. regije) + prez. 3 (GDP/EU, transport A1–A12/Učka/Krk/Pelješac/Drava, Helsinki 1997, demografski procesi,
  gustoća, **puni raspored radnih dozvola 2025** po djelatnostima i državama). fc 11→16, quiz 12→14, fill 8→9.
- **`protectedAndTouristRegions` dopunjen** prez. 4–6: okvir zaštite (Zakon = 9 kategorija; 2 stroga rezervata + 8 NP +
  12 PP; 5.930 km² ≈ 10,1%), statistika 2017 (17 mil./89% strani; 4 mil. NP-PP, 3 mil. Plitvice+Krka; 96% strani u NP),
  komponente prirodnih atrakcija, planinska regija (Gorski kotar/Risnjak/Platak/Fužine/Cerovac), istočna Slavonija
  (Vukovar-Vučedol, Ilok, Đakovo-lipicanci, Požega-vino). fc 12→18, quiz 18→25, fill 10→14.
- **NETAKNUTO (uputa korisnika):** `blindMapDrill` (slijepa karta) i `examFramework`.

**Rezultat:** geografija = **6 kat. / 58 fc / 72 quiz / 43 fill** (bilo 5 / 39 / 56 / 36). `CONTENT_VERSION`
20260615→20260616 + bump `content-loader.js?v=20260616`. **Verify 0**, strukturni validator 0 (0 loših quiz-indeksa,
0 fill bez praznine), **Playwright 36/36**. Lokalni commit; **NIJE deployano** (čeka potvrdu).

**▶ Sljedeće:** Tourism Geography **2. kolokvij** (prez. 7–12 = „Tourism Geography of the World"); pa Food & Nutrition 2. kolokvij.

---

## 2026-06-09 — DEPLOY ✅ (`24f2b6f`)
Korisnik izričito autorizirao deploy. `git push origin main` (`822d788..24f2b6f`) → produkcija (Vercel).
LIVE: cijeli **Economics in Hospitality** (K1 rebuild + K2 + finalni, S27–S29), **fix BUG-008** (S25),
**Entrepreneurship→sem 1** (S26) + sva doc osvježenja. `origin/main` sinkroniziran, radno stablo čisto,
ništa lokalno nedeployano. (Pre-flight: `verify` 0, Playwright 36/36.)

---

## 2026-06-09 — Sesija 29: Economics in Hospitality FINALNI ispit — hibrid (kompletira predmet)
**Kontekst:** Nakon 1. i 2. kolokvija, korisnik: „napravi završni ispit, polako s analizom i todo listom".
Silabus (intro) potvrđuje **MODUL 3: FINAL EXAM (written) = 30%**, pokriva sve teme T2–T12 (Unit 1–10).

**Struktura = HIBRID** (isti obrazac kao Marketing finalni, koji je korisnik odobrio): novi `data-econ-hospitality-final.js`
→ `economicsHospitalityFinalData = Object.assign({}, economicsHospitalityData, economicsHospitalityM2Data, { examPractice })`.
Spaja svih **10 jedinica** (5 iz 1. + 5 iz 2. kolokvija, ključevi se ne sudaraju) + dodaje kuriranu **cross-topic
`examPractice`** kategoriju (14 fc / 10 quiz / 8 fill + „Final Exam Roadmap" learn) koja povezuje gradivo
(troškovi→break-even→KPI; imovina+amortizacija→vrednovanje→investicije; kalkulacija cijene↔ekonomičnost↔kanali).

**Napravljeno**
- `data-econ-hospitality-final.js` (učitava se ZADNJI; ovisi o m1+m2 na `window`; ima i `module.exports` za node-validaciju).
- **Catalog:** nova lekcija `final`, `scripts` += final (zadnji), `resolve.final = economicsHospitalityFinalData`.
  Cache: `CONTENT_VERSION` 20260614→**20260615** + bump `catalog.js`/`content-loader.js` `?v=20260615`.

**Testirano:** strukturni node-check učitavanjem m1→m2→final redom = **11 kategorija / 162 fc / 106 quiz / 84 fill, 0 loših
`correct`**; `verify` 0 grešaka (final → economicsHospitalityFinalData); **ciljani temp-test** finalnog (4 profila:
quizOpts=12, learnChips=12, 0 problema/0 grešaka, obrisan); puni Playwright.
**Stanje:** **Economics in Hospitality 100% KOMPLETAN** (1. kolokvij + 2. kolokvij + finalni). Lokalni commit (NIJE deployano).

---

## 2026-06-09 — Sesija 28: Economics in Hospitality 2. kolokvij (Unit 6–10) — NOVA lekcija
**Kontekst:** Nakon 1. kolokvija (S27), korisnik: „kreni s 2. kolokvijem, prezentacije su 6–10". Iz silabusa:
2. kolokvij = **Unit 6–10 = teme T8–T12**. Svaka jedinica ima glavnu prezentaciju + „add" dodatak (oba pročitana).

**Mapiranje (potvrđeno iz naslova slajdova):** U6 The business result · U7 Success & economic indicators (KPI) ·
U8 Price policy · U9 Principles of sales · U10 Profitability of investments.

**Napravljeno**
- **Novi sibling fajl `data-econ-hospitality-m2.js`** (`window.economicsHospitalityM2Data`, obrazac kao
  `data-marketing-m2.js`) — **5 kategorija, 75 flashcards · 50 quiz · 40 fill** + bogat learn. Ključno gradivo:
  U6 financijska izvješća, **USALI** (1926, NY), bilanca (Assets=Liabilities+Equity), P&L, načela računovodstva,
  vrednovanje poduzeća (Vk=Ik−Ok, Vl=Il−Ol, Vr=Ir−Or; statičke/dinamičke metode); U7 produktivnost/ekonomičnost
  (E>1/=1/<1)/rentabilnost + **hotelski KPI-jevi s formulama** (ARR, ADR=RoomRev/SoldRooms, RevPAR=RoomRev/AvailRooms,
  TRevPAR, GOP, GOPPAR, NOP, EBITDA — iz „add" prezentacije); U8 cjenovne metode (troškovne/tržišne/konkurentske),
  kriteriji diferencijacije, kalkulacija (cijena koštanja→prodajna+PDV), marža, divizijska/dodatna metoda; U9 prodaja,
  marketinški splet 4P+3P (Booms&Bitner 1981), direktni/indirektni kanali, rezervacije, ugovori (alotman/zakup/
  rezervacijski), provizije (domaće 3% / strane 11%, ~50% kapaciteta agencijama), internet (Booking.com); U10
  investicije (bruto/neto/nove; zamjenske/racionalizacijske/proširenja), struktura, odluka, faze projekta, analize
  (tržište/lokacija „location, location, location"–Hilton/ekon.-fin.), solventnost (NCF≥0), metode ocjene
  (anuitetna=najčešća, NPV, ROI; linearno programiranje–Dantzig).
- **Catalog:** `scripts` += `data-econ-hospitality-m2.js`, `resolve.second-midterm = economicsHospitalityM2Data`,
  coming-soon uklonjen, opis ažuriran. Cache: `CONTENT_VERSION` 20260613→**20260614** + bump `catalog.js`/`content-loader.js` `?v=20260614`.

**Testirano:** strukturni node-check (5 kat., 75/50/40, 0 loših `correct`); `verify` 0 grešaka (second-midterm →
economicsHospitalityM2Data); **ciljani temp-test** (4 profila: quizOpts=6, 0 problema/0 grešaka, obrisan); puni Playwright.
**Stanje:** Economics in Hospitality **KOMPLETAN** (1.+2. kolokvij). Lokalni commit (NIJE deployano).

---

## 2026-06-09 — Sesija 27: Economics in Hospitality 1. kolokvij — pregled + veliki rebuild iz izvora
**Kontekst:** Korisnik dodao prave PDF-ove u `2. godina Hospitaliy Managament/Economics of hospitality`
(intro + Unit 1–10; Unit 6–10 imaju „add"). Zadatak: napravi **samo 1. kolokvij**, pregledaj postojeći i prepravi.

**Analiza izvora:** intro (`1 Introductory information 2026.pdf`) daje silabus — **T7 = 1. midterm**, T13 = 2. →
**1. kolokvij = T2–T6 = Unit 1–5** (Basics · Business economics · Hospitality business · Assets of reproduction ·
Cost theory). Potvrđeno „do 5 / na pola" (10 prezentacija). Ekstrakcija teksta (`scripts/pdf-text.js`) za svih 5 + intro.

**Nalaz:** postojeća struktura (5 jedinica) **se točno poklapa** s T2–T6 i sadržaj je bio **točan, ali pretanak**
(~15–25% pokrivenosti; Unit 3/4/5 = 48–55 slajdova s velikim izostavljenim cjelinama). Catalog opis 1. kolokvija
bio **pogrešan** („seminarski: sezonalnost/konkurentnost" — to je zaseban seminar, ne predavanja).

**Napravljeno**
- **Rebuild `data-econ-hospitality.js`** vjerno slajdovima: **30→73 flashcards · 20→46 quiz · 15→36 fill** + bogat learn.
  Dodano što je falilo: U2 povijesni razvoj (Savary 1675, Smith 1776, Marshall, Schmalenbach 1906, Taylor/Ford/Fayol,
  socijalistička ekonomika); U3 asocijacije/koncentracija (sinergija „2+2=5", konzorcij, kartel, konglomerat, holding,
  trust), poslovna načela (produktivnost/ekonomičnost/rentabilnost + kontinuitet), poslovna politika i planiranje;
  U4 likvidnost (>1)/solventnost, koef. obrtaja, **amortizacijski rokovi po hrv. zakonu** (20/10/5/4/2 god), metode
  (linearna `a%=100/t`, progresivna, degresivna, funkcionalna), tekuće/investicijsko održavanje; U5 mjesta/nositelji
  troška, direktni/indirektni, aktivni/pasivni centri, fiksni 60–80% hotelskih troškova, **zone troškova**,
  **koef. reaktivnosti `h=T%/Q%`**, model materijalnih troškova 35/22/50%, **break-even**, funkcionalna analiza.
- **Catalog opis** 1. kolokvija ispravljen na stvarni (Unit 1–5). Cache: `CONTENT_VERSION` 20260609→**20260613** +
  bump `catalog.js`/`content-loader.js` `?v=20260613` (index.html).

**Testirano:** strukturni node-check (5 kat., 73/46/36, svi `correct` u rasponu = 0 bad); `verify` 0 grešaka;
Playwright (smoke testira PRVU lekciju = econ first-midterm). 2. kolokvij (Unit 6–10) NIJE rađen (po dogovoru).
**Stanje:** lokalni commit (NIJE deployano).

---

## 2026-06-06 — Sesija 26: Ispravak catalog-a — „Entrepreneurship and Innovation" (sem 1)
**Kontekst:** Korisnik javio da je predmet zapravo **„Entrepreneurship and Innovation"** (ne „Business
Entrepreneurship") i da je u **1. semestru** 2. godine (bio krivo upisan kao sem 2).

**Napravljeno (`data/catalog.js`):** `name` → „Entrepreneurship and Innovation", `semester: 2 → 1`.
**`id: 'entrepreneurship'` NIJE diran** → `storageKey`/napredak korisnika i sve reference očuvane; sadržaj
lekcija nepromijenjen. Navigacija (browse, data-driven) ga sad sama prikazuje pod Sem 1. Bump `catalog.js?v=20260612`
(index.html). Usklađeni `README.md`, `package.json`, `docs/architecture/ARCHITECTURE.md` (povijesni PROGRESS zapisi se ne diraju).

**Testirano:** `verify` 0 grešaka (ispisuje „Entrepreneurship and Innovation"); **Playwright 36/36**.
**Stanje:** lokalni commit (NIJE deployano) — ide u isti deploy paket kao BUG-008.

---

## 2026-06-06 — Sesija 25: Fix BUG-008 (globalni footer + toast bez baznog CSS-a)
**Kontekst:** Korisnik javio (screenshot) da „© 2026 All Rights Reserved by Leon Kreso" stoji ružno lijevo-dolje
preko sadržaja na svim stranicama (Landing ima i svoj footer → duplikat); tik iznad i toast „ⓘ Message".

**Dijagnoza:** bazni CSS za `.toast` i `.footer` **ne postoji** (u `css/` samo responsive override-i — vjerojatno
izgubljeno u ranijem refaktoru). Bez baze: toast (koji `showToast()` toggla preko `.show`) = stalni goli blok;
globalni `<footer>` (sibling svih stranica) = goli copyright blok na dnu svake stranice.

**Napravljeno (`css/pages.css`):** bazni `.toast` (fiksan, `opacity:0`+`pointer-events:none`, otkriva se `.show`) +
bazni `.footer` (centriran, suptilan, `border-top`); globalni footer **skriven na Landing/Browse** preko
`body:has(.landing-page.active) .footer` / `:has(.browse-page.active)`. Bump `pages.css`/`styles.css` `?v=20260611`.

**Testirano:** verify 0; ciljani temp-test (4 profila, obrisan): footer `display` landing=none/browse=none/**study=block**;
toast `opacity=0`, `position=fixed`, bez `.show`; puni suite **36/36**.
**Stanje:** BUG-008 ✅ riješen, lokalni commit (NIJE deployano — pitati korisnika za deploy).

---

## 2026-06-06 — Sesija 24: Fix BUG-007 (learn filter-bar — rezanje na rubovima + skriven scroll)
**Kontekst:** Nakon BUG-006 (puni nazivi), korisnik javio da bar i dalje reže čipove na rubovima (lijevo pola,
desno „Promotic…") i nema naznake skrola. Odluka (AskUserQuestion): **Opcija B** — zadržati skrol + dodati naznake.

**Uzrok:** (1) `justify-content:center` na skrolabilnom `.learn-filter` (`learn.css`, `@media ≥1024px`) gurao prve
čipove preko lijevog ruba (nedohvatljivo skrolom) → trajni lijevi rez. (2) Skriven scrollbar → nema afordancije.

**Napravljeno**
- `css/learn.css`: tanak **vidljiv scrollbar** (`scrollbar-width:thin` + webkit thumb 6px); **rubni fade**
  preko `mask-image` (klase `.can-scroll-left/right`); `.learn-filter.is-scrollable { justify-content:flex-start }`
  — gazi `center` SAMO kad bar prelazi širinu (kratke liste i dalje centrirane).
- `js/progress.js`: `updateLearnFilterScrollHints()` (postavlja is-scrollable/can-scroll-* iz `scrollLeft`/`scrollWidth`),
  pozvan iz `updateLearnFilters` + vezan na `scroll` i **`ResizeObserver`** (hvata i prijelaz skriveno→vidljivo).
- Cache: bump `learn.css` (@import u styles.css) + `styles.css?v=` + `progress.js?v=` → **20260610**.

**Testirano:** verify 0; ciljani temp-test (obrisan; 4 iPhone profila + **desktop 1280px**): start `can-scroll-right`,
kraj `can-scroll-left`, **prvi čip nije odrezan** (`firstLeftClip=0`), desktop `justify=flex-start`, `pageOverflow=false`;
puni suite **36/36**.
**Stanje:** BUG-007 ✅ riješen, lokalni commit (NIJE deployano) — ide u isti deploy paket.

---

## 2026-06-06 — Sesija 23: Fix BUG-006 (learn filter-bar rezao nazive kategorija)
**Kontekst:** Korisnik prijavio (screenshot, Marketing → Final Exam) da su čipovi u gornjem learn-baru
nečitljivi: „The" (= The Product), „Price" (= The Price), „Segmentati", „Distributi".

**Dijagnoza:** `updateLearnFilters()` (`js/progress.js`) radio „shortName" = prva riječ naziva rezana na
10 znakova (uz 2.-riječ fallback). Latentno otprije (kratki nazivi OK); Marketing finalni (13 kat., „The X"
i višerječni nazivi) razotkrio. **Kozmetički, ne funkcionalni** — `data-filter` = puni ključ, filtriranje radilo.

**Popravak (Opcija A, izbor korisnika):** čip = **puni `data.name`**. Bar je već `overflow-x:auto` + nowrap →
dugi nazivi skrolaju, ne lome layout. Uklonjena `usedNames`/`substring` logika. Bump `progress.js?v=20260609`.
Globalno (svi predmeti dobivaju čitljive čipove).

**Testirano:** verify 0; ciljani temp-test (4 profila): čipovi = puni nazivi, `pageOverflow=false`; puni suite **36/36**.
**Stanje:** lokalni commit (NIJE deployano) — ide u isti deploy paket kao Marketing. BUG-006 zabilježen.

---

## 2026-06-06 — Sesija 22: Marketing FINALNI ispit (T1–T13) — hibrid (spoj + Exam Practice)
**Kontekst:** Nakon K1 (S20) i K2 (S21), korisnik: kreni na finalni. Odluka strukture (AskUserQuestion):
**HIBRID** = spoj svih kategorija K1+K2 **+** dodatna kurirana „Exam Practice" kategorija kroz sve teme.

**Pristup (arhitektura):** novi `data-marketing-final.js` → `window.marketingFinalData` =
`Object.assign({}, window.marketingData, window.marketingM2Data, { examPractice })` (uzor: BI `final.js`).
**MORA se učitati ZADNJI** (čita prethodne dvije varijable) → catalog `scripts` ga stavlja na kraj.

**Napravljeno**
- `data-marketing-final.js`: merge 12 postojećih (PROVJERENIH) kategorija + nova **`examPractice`**
  („Exam Practice (All Topics)") = cross-topic capstone: **12 flashcards · 10 quiz · 8 fill** + learn
  „Final Exam Roadmap" (poveznice: 4P+3P, PLC↔price/promo, push/pull↔promo/distrib, STP↔mix, plan→organize→control).
- `catalog.js`: nova lekcija `final` („Final Exam"); `scripts` += `data-marketing-final.js` (ZADNJI);
  `resolve.final = marketingFinalData`.
- Cache: `CONTENT_VERSION` 20260608 → **20260609**; bump `?v=20260609` (`content-loader.js`, `catalog.js`).

**Testirano:**
- `node --check` OK · `npm run verify` **0 grešaka** (final → `marketingFinalData` deklariran + na window).
- **Strukturni validator** (privremen, obrisan; učitao K1+K2+final redom): **13 kategorija**
  (12 spojenih + examPractice), **113 flashcards · 66 quiz · 56 fill**, svi quiz indeksi valjani,
  svi fill imaju `_______`, learn neprazan → **0 problema**.
- **Ciljani 'final' render-test** (privremen, obrisan; sve sekcije × 4 iPhone profila):
  **0 problema, 0 grešaka, 0 overflowa, quizOptions=14** (All + 13 kat.) → potvrda da runtime-merge radi.
- Puni Playwright suite **36/36**.

**Stanje:** **Marketing KOMPLETAN** — K1 (T1–T8) ✅, K2 (T9–T13) ✅, Finalni ✅ (sve lokalno, NIJE deployano).
**Sljedeće:** spreman **deploy cijelog Marketing paketa** (uz potvrdu korisnika) zajedno s ranijim
lokalnim commitovima (responsive split, KaTeX docovi). Pa dalje sadržaj (1.+2. god) → Blok B.

---

## 2026-06-05 — Sesija 21: Marketing 2. kolokvij (T9–T13) — `second-midterm` popunjen
**Kontekst:** Nakon dopune 1. kolokvija (S20), korisnik: kreni na 2. kolokvij, **finalni NE dirati još**.
2. kolokvij = T9 → kraj (potvrđeno ranije).

**Pristup (arhitektura):** novi **sibling fajl** `data-marketing-m2.js` → `window.marketingM2Data`
(isti obrazac kao te2: `data-te2-final.js`/`te2FinalData`). Catalog `second-midterm` → `marketingM2Data`.
Stari `data-marketing.js` (K1) netaknut.

**Napravljeno (ciglu po ciglu)**
- Ekstrakcija 4 izvora: `TJ 9_The distribution` (27 str.) · `10_The promotion` (33) ·
  `11_New trends in promotional activities` (31) · `12_13_Planning_Organizing_Controlling` (27).
- `data-marketing-m2.js` — **5 kategorija** po `CONTENT_SCHEMA`:
  `distribution` · `promotion` (IMC) · `newTrendsPromotion` · `marketingPlanning` · `organizingControlling`.
  Ukupno **45 flashcards · 25 quiz · 20 fill · 5 learn**. (T12+T13 namjerno razdvojeni na Planning vs
  Organizing&Controlling radi ravnoteže/pedagogije.)
- `catalog.js`: `scripts: ['data-marketing.js','data-marketing-m2.js']`, `resolve.second-midterm = marketingM2Data`,
  opis lekcije (Topics 9–13) — **coming-soon uklonjen**.
- Cache: `CONTENT_VERSION` 20260607 → **20260608**; bump `?v=20260608` (`content-loader.js`, `catalog.js`).

**Testirano:**
- `node --check` OK · `npm run verify` **0 grešaka** (second-midterm → `marketingM2Data` deklariran + na window).
- **Strukturni validator** (privremena skripta, obrisana): 5 kat. / 45 fc / 25 quiz / 20 fill, svi quiz `correct`
  indeksi valjani, svi fill imaju `_______`, learn neprazan → **0 problema**.
- Playwright **36/36** (puni suite). **Napomena:** smoke/responsive testiraju PRVU lekciju s podacima po
  predmetu (za marketing = `first-midterm`), pa K2 ne renderiraju vizualno → dodan **ciljani temp-test**
  baš za `second-midterm` (sve sekcije × 4 iPhone profila): **0 problema, 0 grešaka, 0 overflowa,
  quizOptions=6** (All + 5 kat.); zatim obrisan.

**Stanje:** 2. kolokvij Marketinga **kompletan (T9–T13)**, lokalni commit (NIJE deployano).
**Sljedeće (NE krećem bez naloga):** **Finalni** = spoj K1 (T1–T8) + K2 (T9–T13), NOVA lekcija u catalogu
(uzor: BI `Object.assign`/te2 zaseban final). Korisnik izričito rekao da finalni još NE radim.

---

## 2026-06-05 — Sesija 20: Marketing 1. kolokvij dopunjen (T7 Product + T8 Price)
**Kontekst:** Postojeći `data-marketing.js` imao samo 5 tema (T1,T2,T3,T5,T6); 1. kolokvij = T1–T8 →
**falili T7 (Product) i T8 (Price).** Korisnik: popraviti 1. kolokvij prvo, pa stati prije 2. kolokvija.

**Napravljeno (ciglu po ciglu)**
- Ekstrakcija izvora: `TJ 7_The product` (28 str.) + `TJ 8_The price` (21 str.) preko `scripts/pdf-text.js`.
- Dvije nove kategorije u `data-marketing.js` po `CONTENT_SCHEMA` (1:1 stil postojećih):
  - **`product`** ("The Product"): 9 flashcards · 5 quiz · 4 fill · learn (total product concept, B2C/B2B
    klasifikacija, product programme, elementi/brand, NPD proces, difuzija, životni ciklus + odgovori, usluge + 3P).
  - **`price`** ("The Price"): 9 flashcards · 5 quiz · 4 fill · learn (atributi/ciljevi, interni/eksterni faktori,
    fiksni/varijabilni troškovi, kanal-markupi, tržišne strukture, cjenovne strategije, metode: cost/demand/competitor).
- `catalog.js`: osvježen opis (Marketing sad „Topics 1–8"); subject description proširen (product, price).
- Cache: `CONTENT_VERSION` 20260603 → **20260607** (busta lazy-loadane data-fajlove); bump `?v=20260607`
  za `content-loader.js` + `catalog.js` u `index.html`.

**Testirano:** `node --check` OK · `npm run verify` **0 grešaka** · Playwright **36/36** (smoke testira nove
T7/T8 kroz sve sekcije × 4 profila; marketing `✓ ok`, 0 page-overflowa — tablice/filter skrolaju interno kao
kod postojećih predmeta).
**Stanje:** 1. kolokvij Marketinga **kompletan (T1–T8)**, lokalni commit (NIJE deployano).
**Sljedeće (čeka potvrdu korisnika):** 2. kolokvij = T9–T13 (Distribution, Promotion, New trends, Planning,
Organizing & Controlling) → popunjava `second-midterm`; pa finalni (merge K1+K2).

---

## 2026-06-05 — Sesija 19: razbijanje `responsive.css` (2470 linija → 6 dijelova)
**Kontekst:** `responsive.css` narastao na ~2.4k linija (3 naslagana prolaza) → teško za snalaženje;
djelomično doprinijelo BUG-005 (pravilo zakopano). Odluka korisnika: razbiti PRIJE rada na Marketingu.

**Pristup (siguran):** podjela po **SUSJEDNIM sekcijama (bez premještanja)** — responsive se učitava
ZADNJI i gazi module, pa bi premještanje promijenilo kaskadu. Skripta izrezala 6 dijelova + **3 provjere**:
kontiguitet, identičnost sadržaja (rebuild iz zapisanih fajlova = original), balans `{}` po svakom fajlu.

**Napravljeno**
- `css/responsive/01-up-and-phone-breakpoints` · `02-mobile-core` · `03-modes-a11y-print` ·
  `04-mobile-extra` · `05-device-sizes` · `06-component-improvements` (5.5–10.7 KB).
- `styles.css`: import lanca 01→06 (PRIJE `learn.css`) + upozorenje „ne presložuj"; obrisan `css/responsive.css`.
- Bump `?v=20260607` (styles.css token u index.html + dijelovi).

**Testirano:** Playwright **36/36** (ponašanje 1:1, 4 profila, 0 grešaka/overflowa). 
**Stanje:** refaktor gotov, lokalni commit (NIJE deployano). **Sljedeće:** Marketing — dodati T7/T8 u 1. kolokvij,
pa 2. kolokvij (T9–T13), pa finalni.

---

## 2026-06-03 — Sesija 18: Fix BUG-005 (landing hero bedž pod nav-trakom na mobitelu)
**Kontekst:** Korisnik javio (screenshot s iPhonea) da bedž "Free exam toolkit" stoji ispod
fiksne gornje trake. Dogovorena Opcija B (čisti CSS, jedinstveni izvor visine trake).

**Dijagnoza (Playwright + computed styles):** hero `padding-top` na mobitelu = **24px**,
traka ~63px → bedž na y=24 pod trakom. `--nav-h` definiran, ali `calc()` iz `landing.css`
pregazio `css/responsive.css` (`@media ≤767px .landing-hero { padding-top: 1.5rem }`, učitava se zadnji).
Pravi uzrok ≠ flexbox (hero nije collapsan) → izvorni override iz vremena prije fiksne trake.

**Napravljeno**
- `variables.css`: `--nav-h: 72px` (jedinstveni izvor visine fiksne trake).
- `landing.css`: hero `padding-top` + sekcijski `scroll-margin-top` = `calc(var(--nav-h) + safe + jastuk)`;
  logo `white-space:nowrap`; `@media ≤480px` slim nav (padding/CTA/logo) da traka ostane ≤ --nav-h.
- `responsive.css`: mobilni `.landing-hero` override vezan uz `--nav-h` (bio fiksni 1.5rem = uzrok).
- `landing.spec.js`: regresijski test "hero badge clears the fixed top nav" (`badge.top ≥ nav.bottom`).
- Cache bump `?v=20260606` (variables/landing/responsive css + styles.css token u index.html). BUG-005 zabilježen.

**Testirano:** Puni Playwright suite **36/36** (4 iPhone profila; badge test zelen na svima). verify 0 grešaka.
**Stanje:** Fix gotov i dokazan. **Lokalni commitovi, NIJE deployano** (čeka potvrdu).
**Sljedeće:** deploy fixa (push) → pa Blok B / Tier 2 po dogovoru.

---

## 2026-06-03 — Sesija 17: DEPLOY (M0.5 + landing + lazy-loading idu LIVE)
**Kontekst:** Nakupilo se 13 commitova lokalno (A3 → A4), live je zaostajao na A3.
Pregled + analiza cijelog projekta prije deploya: `git` čisto, `npm run verify` 0 grešaka,
**Playwright 32/32** (4 iPhone profila, problems=0, errors=0). Kod ↔ docovi se slažu.

**Napravljeno**
- `git push origin main` (`f234f68..7c09d19`) → Vercel auto-deploy. Sada LIVE:
  Business Informatics (K1+K2+Final), M0.5 drill-down nav (`#browse-page`) + „čisto i bogato"
  redizajn, landing rebuild + SEO meta, **lazy-loading sadržaja (A4)**.
- Docovi osvježeni (ROADMAP STANJE/Deploy).

**Post-deploy (preporuka korisniku):** hard refresh (Ctrl+F5) na www.sokratstudy.com,
proći Smoke test, provjeriti na pravom iPhoneu (Safari — `color-mix`/`backdrop-filter`),
Network tab: `data-*.js` se NE učitavaju na startu nego tek na otvaranje predmeta.
**Sljedeće:** Blok B (Supabase + Auth + /api) kao temelj vizije, ili Tier 2 (Privacy/FAQ/Contact).

---

## 2026-06-03 — Sesija 16: Lazy loading sadržaja (A4) — ciglu po ciglu
**Cilj:** sadržaj predmeta (~777 KB, 19 datoteka) više se ne učitava na startu, nego tek na
otvaranje predmeta. Ujedno = šav prema backendu (Blok B: `loadSubjectContent` → `/api`).

**Napravljeno (6 cigli, svaka testirana)**
1. `js/content-loader.js` — `loadSubjectContent()` (učita `catalog.content.scripts` predmeta,
   sekvencijalno, keširano; dedup po putanji), `loadScriptOnce`, `isSubjectContentLoaded`, `CONTENT_VERSION`.
2. `initStudyPage` → `async` + `await loadSubjectContent` + loader overlay `#studyLoading` (CSS spinner u pages.css).
3. Maknuti svi statički `data-*.js` `<script>` tagovi iz `index.html` (ostaje `catalog.js` + app moduli).
4. `restoreLastPosition` prosljeđuje spremljenu sekciju kroz `initStudyPage(…, targetSection)` —
   nema više `setTimeout(200)` utrke s async učitavanjem.
5. `tests/lazy-load.spec.js` — dokaz: na startu 0 data-skripti i globalsa; nakon otvaranja predmeta
   global postoji; neotvoreni predmeti i dalje neučitani. (4/4)
6. Docs + commit.

**Testirano**
- Dijagnosticiran i popravljen utjecaj async-init na testove: `responsive.spec.js` i `smoke.spec.js`
  sada čekaju da je sadržaj učitan/renderiran (umjesto fiksnog delaya). (To NIJE bila greška aplikacije.)
- **Puni Playwright suite 32/32 zeleno** (responsive+smoke+sidebar+browse+landing+lazy-load × 4 iPhone profila),
  `subjects=9 problems=0 errors=0`. `npm run verify` 0 grešaka.

**Stanje:** A4 (lazy loading) gotovo i dokazano. Bez deploya (čeka potvrdu).
**Sljedeće:** po dogovoru — Backend (Blok B: Supabase+Auth+/api) kao temelj vizije, ili Tier 2 (Privacy/FAQ/Contact), ili novi predmeti.

---

## 2026-06-03 — Sesija 15: VISION.md + pregled svih docova (priprema za lazy-loading)
**Napravljeno**
- **`docs/product/VISION.md`** (novo) — dugoročna full-stack vizija zapisana da se ne izgubi:
  5 funkcija (AI tutor, profili, UGC upload→AI, dijeljenje, natjecanje, „donesi svoj ključ"),
  mapirane na Faze 1–4; **mapa ovisnosti** (sve ovisi o Backend+Auth; lazy-loading = šav);
  **6 gating-odluka** (AI trošak, plaćanje/PDV+MoR, autorska prava/moderacija, sigurnost,
  anti-cheat, kapacitet); redoslijed; popis docova koje dodajemo kad faza dođe.
- **Pregled svih `.md`** (na zahtjev): BACKLOG/BACKEND/BUGS aktualni; **TESTING.md osvježen**
  (8→9 predmeta, „Start Studying → drill-down browse" umjesto sidebara, dodani
  `browse.spec.js`/`landing.spec.js`/`sidebar.spec.js`, `npm run verify`).
- VISION uvezan u indekse: `docs/README`, root `README`, `CLAUDE.md`.

**Odluka:** danas radimo preporuku — VISION zapisan + krećemo **lazy-loading** (A4) polako, ciglu po ciglu.
**Sljedeće:** lazy-loading (`loadSubjectContent`) → kasnije Backend (Blok B) kao temelj vizije.

---

## 2026-06-02 — Sesija 14: Landing rebuild („prava stranica") + SEO fix
**Odluka korisnika:** landing ne smije biti „jedan ekran" — treba izgledati kao prava,
kompletna stranica. Tier 1 (struktura/sadržaj) + popravak SEO meta.

**Napravljeno (sve statički, showcase iz catalog-a)**
- **Fixed nav traka:** logo + linkovi (Subjects / How it works / Study modes / About) + „Start studying" CTA;
  na mobitelu se linkovi sklope (logo + Start). Hero offset za fixed nav; `scroll-margin-top` za anchor skok.
- **Hero:** trust red (100% free · No sign-up · Works offline); sekundarni CTA → „Browse subjects".
- **Subjects showcase** (`#subjects`, `renderLandingSubjects()`): grid svih predmeta IZ catalog-a
  (gradijent-ikone, godina + broj lekcija); klik → lekcije. Raste automatski s catalog-om.
- **How it works** (`#how`): 3 koraka. **Study modes** (`#modes`): 5 modova s tintanim ikonama.
- **Završni CTA band** + **strukturiran footer** (brand / Explore / About + copyright). Svi „Start" gumbi (`.start-trigger`) → browse.
- **SEO `<head>`:** točan description/keywords, `canonical`, `og:site_name`, `og:url`/`twitter` → `www.sokratstudy.com`,
  `og:image` → `icon-512.png`, osvježen `<title>`.
- Cache bump `?v=20260605` (landing.css, styles.css, navigation.js, init.js).

**Testirano**
- `tests/landing.spec.js` (novo): nav, showcase = broj predmeta iz catalog-a, 3 koraka, 5 modova, footer,
  klik showcase → lekcije, „Start" → browse, **overflow guard** — 8/8 zeleno.
- Puni Playwright suite (responsive + smoke + sidebar + browse + landing) × 4 iPhone profila: **28/28 zeleno**. verify 0 grešaka.
- Vizualno provjereno (mobile fullPage + desktop): izgleda kao kompletna „prava stranica".

**Stanje:** Landing rebuild gotov (Tier 1 + SEO). Bez deploya (čeka potvrdu).
**Sljedeće (Tier 2):** Privacy Policy + Contact + FAQ (bitno za Google Ads) → ostali predmeti 1. god → Blok B.

---

## 2026-06-02 — Sesija 13: M0.5 — puni drill-down navigacija + „čisto i bogato" redizajn
**Odluka korisnika:** frontend prvo (prije novih predmeta); stil = **„čisto i bogato"
(Brilliant/Quizlet), NE preminimalistički** — „prava stranica". Puni eksplicitni drill-down:
Fakultet → Smjer → Godina → Predmet (sve iz catalog-a, spremno za širenje).

**Napravljeno**
- `SokratCatalog` helperi (data/catalog.js): `faculties()`, `programsOf()`, `yearsOf()`,
  `subjectsOf()`, `semestersOf()`, `isLessonComingSoon()` — hijerarhija izvedena iz catalog-a.
- Nova `#browse-page` (index.html) + `css/browse.css` (bogate kartice, gradijent-ikone,
  breadcrumb, progress bar, coming-soon stanje, responsive grid).
- `js/navigation.js`: `renderBrowse()` (po razinama faculties→programs→years→subjects),
  `initBrowse()` (delegirani click), `browseBack()`, `enterBrowse()`, `renderLandingMeta()`.
  CTA „Start Studying" → browse; back s Lessons → popis predmeta (čuva poziciju).
- `renderLessonsPage()`: coming-soon sada data-driven (`isLessonComingSoon`).
- Landing: dinamičan broj predmeta (`data-meta="subjectCount"` → 9), osvježen copy (Year 1 & 2).
- Sidebar = legacy fallback (markup/kod ostaje, nije primarni ulaz).
- Cache bump `?v=20260604` (catalog.js, navigation.js, init.js, variables.css, styles.css, browse.css).

**Testirano**
- `tests/browse.spec.js` (novo): puni drill-down + Year 1 BI + back + **overflow guard** — 8/8 zeleno.
- Puni Playwright suite (responsive + smoke + sidebar + browse) na 4 iPhone profila: **20/20 zeleno**, subjects=9, problems=0, 0 JS grešaka.
- `npm run verify`: 0 grešaka. Vizualna provjera screenshotovima (landing/faculties/years/subjects) — izgled uglađen.

**Stanje:** M0.5 navigacija + redizajn browse/landing **gotovo** (ADR-007 ✅, A5 ✅). Bez deploya (čeka potvrdu).
**Sljedeće:** ostali predmeti 1. godine (kad stignu materijali) → Blok B (Supabase). Po želji: redizajn unutarnjih study/lessons ekrana.

---

## 2026-06-02 — Sesija 12: CLAUDE.md + sinkronizacija svih docova
**Napravljeno**
- Dodan `CLAUDE.md` (root) — auto-učitava se svaku sesiju (preživljava /compact).
  Objašnjeno: MORA biti u rootu da se auto-učita (pod-mapni se ne učita globalno).
- Sinkronizirani svi docovi sa stvarnim stanjem:
  - ROADMAP: dodan "📍 STANJE" sažetak (done/next); A1–A3 ✅, A4/A5 spojeni u M0.5; BI pilot ✅.
  - PRD: trenutno stanje (data-driven + BI), backend = Vercel Functions + Supabase.
  - ARCHITECTURE: statusi A1–A5, backend hosting, 1. god BI dodan.
  - README (root) + docs/README: CLAUDE.md, BACKEND, CONTENT_INTAKE, 1. god BI.
**Bez koda/deploya** (samo dokumentacija).

---

## 2026-06-03 — Sesija 11: Business Informatics KOMPLETAN (K1 + K2 + Final)
**Napravljeno**
- K1 (Ch1–6) i K2 (Ch7–11) generirani iz PDF-ova, vjerno gradivu:
  - M1: systemApproach, dataInfoKnowledge, hardware, software, networks, www
  - M2: eBusiness, itTrends, managementSupport, expertSystems, security
- `final.js` = Object.assign(M1, M2) → 11 kategorija (završni = oba kolokvija).
- Catalog: 3 lekcije (midterm-1, midterm-2, final) + content.scripts/resolve.
- index.html: m1/m2/final skripte (final POSLIJE m1+m2).

**Testirano**
- verify 0 grešaka; node final-merge = 11 kategorija.
- Browser (iPhone 15Pro): M1=6, M2=5, Final=11 kartica; 0 overflow; 0 pageerrors.
- Smoke subjects=9 problems=0.

**Stanje:** BI gotov (pilot uspješan — content pipeline radi). Bez deploya (lokalni pregled).
**Sljedeće:** redizajn + drill-down nav (M0.5), pa drugi predmeti.

---

## 2026-06-03 — Sesija 10: pilot Business Informatics (CH1 uzorak)
**Napravljeno**
- PDF čitanje preko slika (pdftoppm) nedostupno → riješeno ekstrakcijom teksta:
  `scripts/pdf-text.js` + `pdf-parse` (devDep). Radi za tekstualne PDF-ove.
- Iz introductory utvrđeno: 15 cjelina (U1–U15), 2 kolokvija + završni. Poglavlja
  CH1–11 = teorija (U1–U11); U12–U15 praktične vježbe. **Korisnik potvrdio raspodjelu:**
  K1 = Ch1–6, K2 = Ch7–11, **završni = oba kolokvija zajedno** (merge).
- Kreiran `data/business-informatics/midterm-1.js` s CH1 (System Approach & Informatics):
  9 flashcards, 5 quiz, 4 fill, learn HTML — vjerno PDF-u. Catalog unos (year 1, sem 1),
  index.html wiring (?v=20260603).
- `verify-catalog.js` poopćen (uklonjena stara A2 usporedba) → sad opći validator.

**Testirano**
- `npm run verify` → 0 grešaka (9 predmeta). Smoke (iPhone 15Pro) subjects=9, problems=0.
- Screenshot BI Learn (CH1) → uredno, čitljivo, vjerno gradivu.

**Čeka korisnika:** potvrda stila/dubine CH1 → onda Ch2–6 (K1), pa K2 + final merge.
**Bez deploya** (pilot za lokalni pregled).

---

## 2026-06-02 — Sesija 9: analiza 1. godine + plan M0.5 (hijerarhija + redesign)
**Analiza materijala (samo pregled, ništa dirano):**
- `C:\...\Documentos\1. godina Hospitality Managament`: 11 predmeta, ~168 datoteka
  (100 JPG + 68 PDF). 4 predmeta još prazna. Math je formule/JPG (rizik za točnost).
- Procjena: 1. god. do ~33 lekcije; sa 2. god. = ~19 predmeta za smjer.

**Odluke/plan:**
- Dodan `docs/workflow/CONTENT_INTAKE.md` (kako slagati materijale: PDF>JPG, po predmetu/kolokviju,
  Math caveat) + `_materials/` u .gitignore.
- Novi milestone **M0.5** u ROADMAP: hijerarhijska navigacija (Fakultet→Smjer→Godina→
  Predmet) + minimalistički frontend redesign (logo se zadržava), PRIJE masovnog unosa.
- Catalog data-model već podržava hijerarhiju (faculties/programs/year/semester).

**Odlučeno:** navigacija = PUNI drill-down (ADR-007), dark minimalistički, logo ostaje.
**Čeka korisnika:** semestar-mapping za 11 predmeta 1. godine (koji su zimski/ljetni).
**Bez koda ove sesije (planiranje).** Sljedeće: K2 coming-soon → catalog 1.god stubovi → puni drill-down nav → redesign.

---

## 2026-06-02 — Sesija 8: priprema za masovni sadržaj (struktura + template)
**Kontekst:** korisnik uskoro dodaje cijelu 1. godinu (po predmetu k1/k2/završni).
Dogovoreno: autorstvo u datotekama SADA (migracijski sigurno), uz alate za kvalitetu.
Tok rada: korisnik donese PDF materijale → ja generiram gradivo po schemi → pregled.

**Napravljeno (korak 1: struktura + template)**
- `data/_template/lesson.template.js` — kalup lekcije (komentiran, po CONTENT_SCHEMA).
- `scripts/scaffold-subject.js` — `npm run scaffold -- <id> "<Naziv>" <god> <sem>`
  kreira `data/<id>/{midterm-1,midterm-2,final}.js` + ispiše gotov catalog unos.
- npm: `verify` (sad = catalog check; korak 3 proširuje na sadržaj), `scaffold`.
- CONTENT_GUIDE: standardna struktura (mapa/predmet, datoteka/lekcija) + scaffold.
- ADR-006. Postojeći predmeti se NE prepravljaju.

**Testirano**
- Scaffold na probnom predmetu → `node --check` valjan na sve 3 generirane datoteke; obrisano.

**Sljedeće (preporuka prije masovnog sadržaja)**
- Korak 2: "coming-soon" lekcije iz catalog-a (umjesto hardkodiranog 'second-midterm').
- Korak 3: validator sadržaja (`npm run verify` provjerava CONTENT_SCHEMA).
- Korak 4: lazy-load seam (`loadSubjectContent`).

---

## 2026-06-02 — Sesija 7: A3 — sidebar iz catalog-a
**Napravljeno**
- Zapamćeno trajno (memorija): CSS/JS cache pravilo (bump `?v=`).
- A3.1: `iconGradient` (2 boje) za svih 8 predmeta u catalog (vizualna parnost).
- A3.2: `renderSubjectsSidebar()` u `navigation.js` (gradi listu iz catalog-a,
  escape HTML-a), pozvan u `init.js` prije vezanja listenera.
- A3.3: uklonjen hardkodirani `.subject-item` HTML iz `index.html` (programski,
  pouzdano) → `#subjectsList` prazan + komentar.
- Bumpani svi `?v=` tokeni (30) na 20260602 (init/navigation/catalog promijenjeni →
  bez bumpa bi keširani stari init.js dao PRAZAN sidebar).

**Testirano**
- `tests/sidebar.spec.js`: 8/8 predmeta, ispravan redoslijed, klik → lekcije, 0 grešaka.
- Puna suite (responsive+smoke+sidebar × 4 profila): **12 passed**, problems=0, errors=0.
- Vizualna potvrda (screenshot iPhone 16): gradijent ikone + layout vjerni originalu.

**Sljedeće**
- Deploy (push) pa A4 (lazy loading sadržaja).

---

## 2026-06-02 — Sesija 6: širi smoke test + deploy
**Napravljeno**
- Potvrđeno (iPhone 16 render + h1 dijagnostika) da je Learn popravak ispravan
  lokalno; korisnikov telefon je pokazivao staru verziju jer popravak nije bio deployan.
  Prazan ljubičasti naslov-box = simptom istog overflowa (naslov centriran u 1176px
  širokom kontejneru → odguran izvan ekrana); popravak overflowa rješava i to.
- Dodan `tests/smoke.spec.js`: sve sekcije × svih 8 predmeta.

**Testirano**
- `npm run test:responsive` (responsive + smoke) → 4/4 profila, subjects=8,
  problems=0, JS errors=0, overflow=0. A2 refaktor potvrđeno ne ruši nijednu sekciju.

**Sljedeće**
- Deploy (push origin main → Vercel) pa nastavak A3.

---

## 2026-06-01 — Sesija 5: Playwright + riješen Learn horizontalni overflow
**Napravljeno**
- Postavljen Playwright (chromium) + `scripts/static-server.js` + `playwright.config.js`
  (iPhone SE/15Pro/ProMax + landscape) + `tests/responsive.spec.js`. ADR-005.
- Probom utvrđen TOČAN uzrok overflowa (BUG-003): `.study-content` (flex-dijete bez
  `min-width:0`) naraste na `max-width:1200` zbog nerazlomljivog sadržaja → stranica
  šira od ekrana. Popravak: `min-width:0` + `width:100%` na `.study-content`, obrambeni
  `min-width:0` na `#learn`/`.learn-container`/`.learn-content`.
- npm skripte: `test:responsive`, `verify:catalog`, `serve:test`.

**Testirano**
- `npm run test:responsive` → **4/4 profila PASS**, svih 8 predmeta, portret (375/393/
  430) i landscape (852): `innerWidth==docScrollW==deviceWidth`, 0 page overflowa.
- `verify-catalog` PASS; brace-balance CSS OK.

**Sljedeće**
- A3: sidebar render iz catalog-a.

---

## 2026-06-01 — Sesija 4: pregled bugova + Learn responzivnost (iPhone)
**Napravljeno**
- Regresija: `verify-catalog.js` → PASS.
- Pregled cijelog CSS-a (responsive.css, learn.css, pages.css, variables.css).
- Nađena i popravljena 2 slomljena CSS pravila u `responsive.css` (BUG-001, BUG-002)
  koja su error-recoveryjem gutala valjana pravila. Zagrade sada 520/520.
- Learn responzivnost (BUG-003): donji padding 90px→24px (uklonjen prazan prostor);
  dodan landscape safe-area L/R za learn-container (notch na modernim iPhonima).
- Uočeno: `responsive.css` ima dosta MRTVOG CSS-a (klase kojih nema u HTML-u:
  `.quiz-section`, `.topic-*`, `.flashcards-section`, ...). Dobro-oblikovana mrtva
  pravila ostavljena; predloženo zasebno čišćenje.

**Testirano**
- Brace-balance svih CSS datoteka → OK (responsive 520/520, learn 124/124).
- ⚠️ Vizualno NIJE potvrđeno u pregledniku (nema browsera u ovom okruženju) —
  čeka screenshot/potvrdu korisnika ili Playwright harness.

**Sljedeće**
- Vizualna potvrda Learn sekcije (iPhone portret + landscape); po potrebi fini tuning.
- Zatim nastavak A3 (sidebar render iz catalog-a).

---

## 2026-06-01 — Sesija 3: A2 refaktor config.js (data-driven) + verifikacija
**Napravljeno**
- Commitan baseline (710ebc5): catalog + docs + README.
- ✅ A2: `js/config.js` — `getSubjectData()` sada razrješava podatke preko
  `SokratCatalog.resolveDataVar()` (catalog), a `subjectDataMap` se gradi iz
  `SOKRAT_CATALOG.subjects`. Uklonjeni hardkodirani if-lanci i ručni literal.
- Standardiziran `window`-izvoz u svih 8 predmeta: dodano `window.X = X` u 6
  data-*.js koji to nisu imali (ebusiness/food/accounting su već imali). Nužno za
  catalog lookup i budući lazy loading (A4).
- `data/catalog.js` uključen u `index.html` prije `js/config.js`.
- Dodan `scripts/verify-catalog.js` (ponovo-iskoristiv checker).

**Testirano**
- `node scripts/verify-catalog.js` → **0 grešaka**: resolveDataVar identičan
  starom getSubjectData za svih 8 predmeta; sve datoteke postoje; sve ciljane
  varijable deklarirane i na window.
- `node --check` na svim izmijenjenim JS datotekama → sintaksa OK.
- Provjereni svi vanjski korisnici `subjectDataMap`/`getSubjectData` (analytics,
  storage, progress, navigation) — koriste samo polja koja i dalje postoje.

**Sljedeće**
- 🟦 A3: renderirati popis predmeta u sidebaru iz catalog-a (ukloniti ručni HTML).

---

## 2026-06-01 — Sesija 2: dokumentacijski set + README
**Napravljeno**
- Dodani docovi: `CONTENT_SCHEMA.md` (kanonski oblik sadržaja), `CONTENT_GUIDE.md`
  (kako dodati predmet/lekciju), `TESTING.md` (ručna QA checklista), `BACKLOG.md`
  (ideje: monetizacija, UGC, funkcionalnosti).
- Ažuriran root `README.md` (zastario — sad opisuje platformu, predmete, docs/).
- Dopunjen `docs/README.md` index.
- Dogovoreno pravilo: **uvijek ažurirati docs nakon svake izmjene.**

**Sljedeće**
- 🟦 A2: refaktor `js/config.js` (subjectDataMap + getSubjectData iz catalog-a) + test.

---

## 2026-06-01 — Sesija 1: postavljanje temelja (M0/A1 + dokumentacija)
**Napravljeno**
- Analiza cijele postojeće arhitekture (HTML, JS moduli, model podataka, hosting).
- Dogovorena arhitektura: Supabase backend, ja kao jedini autor, fazni pristup.
- ✅ A1: kreiran `data/catalog.js` — hijerarhija FMTU Opatija → Hospitality
  Management → 2. godina; svih 8 predmeta s `content.resolve` (generalizira
  postojeći `getSubjectData()`).
- Upisana stvarna raspodjela: 1. semestar = Tourism Economics, E-Business,
  Accounting; 2. semestar = Entrepreneurship, Econ in Hospitality, Marketing,
  Geography, Food & Nutrition.
- Postavljena `docs/` struktura (PRD, ROADMAP, ARCHITECTURE, CHANGELOG, BUGS, DECISIONS).

**Status / sigurnost**
- Sve promjene additivne; `index.html` netaknut → live verzija radi identično.

**Sljedeće**
- 🟦 A2: refaktor `js/config.js` da `subjectDataMap` i `getSubjectData()` čita iz
  catalog-a (uz fallback), pa test da svih 8 predmeta radi isto.
