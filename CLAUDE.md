# CLAUDE.md — Sokrat Study (ključni kontekst)

> Ovaj fajl se učitava SVAKU sesiju. **Drži ga sažetim — samo TRENUTNO stanje, pravila i pointeri.**
> Povijest milestone-a: `docs/records/HISTORY.md` · stanje predmeta: `docs/subjects/README.md` · dnevnik: `docs/records/PROGRESS.md`.

> **👤 Repo ima JEDNOG suradnika: Leona.** Content-suradnik je otkazan 2026-09-04 → **role-router je
> ukinut**, `git config user.name` se više ne provjerava. Povijest tog modela: `docs/archive/TEAM.md`,
> ADR-023 (otkazan). Sedam HR predmeta koje je proizveo **ostaje na produkciji**.

## Što je projekt
Interaktivna platforma za učenje (flashcards / quiz / fill / learn + interaktivne vježbe). Live: **www.sokratstudy.com**.
Počelo na **FMTU Opatija** (smjer Hospitality Management), ali **cilj = UGC-platforma za SVE** (bilo koji student / škola / sveučilište, bilo koji sadržaj) — **FMTU je samo odskočna daska.** Kasnije: AI tutor + natjecanje. Vlasnik/jedini autor: **Leon Kreso**. Vizualni stil: **„čisto i bogato"**; zadana tema je **svijetla** (§7.3).

## Stack
- Frontend: **statički, vanilla JS, BEZ build-koraka/frameworka** (biblioteke preko CDN-a/vendorane su OK). Hosting: **Vercel** (git push na `main` = produkcijski deploy; grane = preview).
- Backend: **Supabase** (Postgres/Auth; projekt `naxjubnedhrbhsuasayu`) — čitanje/pisanje **direktno anon/user JWT + RLS, BEZ `/api`** (ADR-011).
  Privilegirano (`service_role`) → **SAMO Supabase Edge Functions** (ADR-016); `service_role` key SAMO u `.env` (gitignored). Publishable key u `js/auth.js` = javan po dizajnu.
  **Edge Functions (`supabase/functions/`):** `delete-account` (GDPR brisanje; identitet ISKLJUČIVO iz JWT-a preko `getUser()` — `user_id` iz body-ja je eskalacija privilegija). Slike se brišu PRIJE korisnika iz **OBA** osobna bucketa (`PERSONAL_BUCKETS`; bucket izvan popisa = **javno siroče**, 13.09.); `lesson-images` se NIKAD ne dira.

## Arhitektura (najvažnije)
- **`data/catalog.js` = JEDINSTVENI IZVOR ISTINE** za predmete: `faculties → programs → (year, semester) → subjects → lessons`;
  subject ima `content.scripts` + `content.resolve` (lessonId → window-var) + `content.codeScripts` (vježbe/lib = KOD).
- **Read-path sadržaja (dual-read):** `js/content-loader.js` → **DB (Supabase) → `data/json/<id>/*.json` → `.js` fallback**; lazy po predmetu.
  S1 šav: **`window.SokratContent`** (`js/content-repo.js`) — `listSubjects/getSubject/loadLesson`. Datoteke = izvor istine do F4.6 flipa; baza = zrcalo (re-sync `scripts/migrate-content.js`).
- **Vježbe NIKAD u bazu/JSON** (BUG-012): `generate()` funkcije ne prežive serializaciju → uvijek iz `.js` preko `codeScripts`. Engine (7 tipova) se **NE mijenja za sadržaj** (sveto pravilo). [[exercises-code-vs-data]]
- **`final` lekcija = `Object.assign(M1, M2, {examPractice})`** — spljoštena KOPIJA; u bazi zaseban red → svaki write mora propagirati na final (admin CRUD to radi; kompozicija umjesto kopije = planirano u UGC smjeru).
- **Stanje:** `window.AppState` (svi mutable globali). **UI-primitivi:** `<sokrat-toast>`/`<sokrat-modal>`/`<sokrat-confirm>` (light-DOM WC) + `window.askConfirm`.
- **Auth:** email+lozinka (`js/auth.js`, CDN supabase-js, tihi fallback) + **cloud-sync napretka** (`js/cloud-sync.js`, offline-first merge unija/max). Profil + GDPR na `#profile-page`.
- **Editor/Admin CRUD (FUNKC. GOTOV):** `window.SokratAdmin` (`js/admin.js` jezgra + `js/admin-editors.js` modal-editori) + **Studio** (`#editor-page`, `js/studio.js`+`js/block-editor.js`+`js/block-editor-media.js`) + **jedan renderer** `js/blocks-renderer.js` (sigurnosna granica). Draft-mod: `window.SokratDraft` (`js/draft-store.js`) → editori pišu OPOVE (id-adresirano) → **jedini write-put = `publish_document` RPC** (SECURITY DEFINER, is_admin, base_version, atomično, `content_versions` audit). `is_admin()` RPC + `.admin-only` reveal.
- **⚠️ GOTCHA:** `SokratAuth`/`SokratCatalog` su top-level `const` (leksički globali) → referenciraj **GOLO** (`typeof X !== 'undefined'`), NE `window.X`; `SokratContent`/`SokratAdmin`/`AppState` JESU na window. [[live-login-verifies-crud]]
- **Učitavanje po ruti (2026-09-04):** `window.SokratLoad` (`js/loader.js`) — **imenovani paketi** (`study` · `blind-map` · `exercises` · `polica` · `materials` · `profile` · `sync`) stižu na SVOJ događaj, ne u markupu. ⚠️ **Novi mod = novi unos u paketu, ne novi `<script>` u `index.html`.** Token se čita iz `src` loadera (`bump` ne dira `js/**`); redoslijed u paketu je zajamčen (`async=false`) — KaTeX auto-render bez toga stiže prije `katex` i tiho pada. Brana: `tests/unit/loader-packages.test.js` (uklj. osnovicu **golih referenci preko granice paketa**).
- **Service Worker:** `sw.js` (navigacija network-first + offline shell; asseti stale-while-revalidate; kill-switch `__swKill()`); `SW_VERSION` bumpa `npm run bump`.
- **i18n:** 🌐 HR/EN (`js/i18n.js`, `'sokrat-ui-lang'`); bez izbora prati UREĐAJ (samo `hr`, `boot.js`); sadržaj po programu (ADR-012).
- **Monitoring:** GA4 (`G-ME0V58NJ1Z`) + Sentry — oboje **consent-gated**; GA ponašanje mijenjati SAMO u `js/consent.js`. [[google-analytics-consent]]
- Konvencija semestra: `year` = studijska godina; `semester` ∈ {1,2}.

## Sadržaj (autorstvo)
- **Stanje svih predmeta (brojevi/izvori/posebnosti): `docs/subjects/README.md`** — 2. god 8/8 ✅ · 1. god 9/9 ✅ (⛔ Intro blokiran) · HR pilot ✅. Sadržajna staza PAUZIRANA (ADR-018); HR je od 2026-09-04 **bez vlasnika**.
- Schema (obavezno): `docs/architecture/CONTENT_SCHEMA.md`. Novi predmet = mapa `data/<subject>/{midterm-1,midterm-2,final}.js`; brzo: `npm run scaffold`. 4 stara sem-2 predmeta ostaju root `data-*.js` (svjesno, ADR-015).
- PDF materijali: `_materials/` (gitignored); čitaj s `node scripts/pdf-text.js "<pdf>"` (Read ne radi za PDF). Vidi `docs/workflow/CONTENT_INTAKE.md`.
- **KaTeX** (kvantitativni predmeti): delimiteri **`\( \)` / `\[ \]` / `$$ $$` — NIKAD jedan `$`** (valutni `$NN`); `renderMath()` u `js/math.js`. Konvencija: `docs/architecture/CONTENT_SCHEMA.md` §Matematika.
- Generator predmeta (Sonnet, `.env` ključ): `docs/workflow/CONTENT_GENERATOR.md`. Pouke za sadržajni rad: `docs/subjects/README.md` §Pouke. Kartica-standard: kratke definicije <200 znak., detalj→learn. [[content-model-standard]]

## ⚠️ KRITIČNA PRAVILA
1. **Cache bump:** pri izmjeni BILO KOJEG `css/*.css`/`js/*.js`/`data*.js` pokreni **`npm run bump`** (svi `?v=` + `CONTENT_VERSION` + `SW_VERSION` odjednom). `bump:check` = CI gate. Bez bumpa deploy je NEVIDLJIV (immutable cache 1 god; BUG-004, ADR-017). (`.md` izmjene ne traže bump.)
2. **SVAKI push na `main` traži Leonov IZRIČIT OK** — `git push` na main = produkcija. **Vrijedi i za čiste `.md` pusheve** (Leon, 2026-08-10: *„da sve ide uz moj OK"*; povod: nakon odobrenog mergea pushao sam još 4 docs-commita po vlastitoj procjeni opsega — odobrenje jedne radnje ne proteže se na sljedeću). Pravilo #3 traži da docs **napišeš**, ne da ih **pushaš**. Commit lokalno / push na feature-granu (preview) je i dalje slobodan. [[push-to-main-needs-ok]] **Deploy-guard:** pre-push hook (`.githooks/pre-push`) blokira push na `main` ako `npm run preflight` padne (aktiviraj po klonu: `git config core.hooksPath .githooks`; svjestan bypass = `--no-verify`). Direktan bypass-push na `main` preskače CI → **preflight je zadnja mreža** (BUG-004).
3. **Uvijek ažuriraj `docs/`** nakon izmjene (PROGRESS/CHANGELOG + tematske; stanje predmeta u `docs/subjects/README.md`).
4. **Provjeri prije commita:** `npm run verify` + `npm run test:responsive`; nakon izmjene css-a i `npm run build:css` (`studio.css`/moduli = bundle → inače CI drift-gate padne). [[preflight-before-every-push]]
5. Radi pažljivo, korak po korak, s provjerama; pazi na bugove. **Tempo = FAZA-CHECKPOINT** (Leon 2026-08-02): teci kroz cigle unutar faze (gate na svakoj), STANI na kraju faze za OK; **deploy = uvijek izričit OK**. [[pace-short-stretches-check-in]]
6. **PRIJE SVAKOG COMPACTA (korisnikovo pravilo, 2026-06-24):** proći **APSOLUTNO SVE `.md` datoteke** (root + `docs/**` + memorija) i provjeriti točnost (status, brojevi, ADR-ovi, linkovi) — ispraviti zastarjelo PRIJE compacta. [[doc-audit-before-compact]]
7. **Nakon pusha provjeri i Vercel check na commitu, ne samo GitHub Actions** (Actions ne validira `vercel.json`!); `vercel.json` = bez komentar-ključeva (ruše schema-validaciju prije builda).
8. **Auth/RLS-gated značajke:** pozitivan put verificiraj pravom admin-prijavom (`npm run test:authed` — gađa STAGING kad su `STAGING_*` u `.env`); **write/draft tokovi se automatiziraju vs STAGING** (`sokrat-staging` = izolirani test-DB); protiv PROD-a write SAMO edit-pa-revert + Supabase MCP provjera (append-only audit). [[live-login-verifies-crud]]
9. **OVISNOSTI SE PINAJU TOČNO — `^` je zabranjen.** `save-exact=true` u `.npmrc`, Node u `.nvmrc` (**24**, isto što vrti CI) i `engines` (brana `check:node`). Povod: CI je dvaput pao na `npm ci` **prije ijednog testa**, oba puta jer je raspon `^` dopustio da **upstream objava promijeni razrješenje ispod nas** — ništa u commitu nije bilo krivo. Projekt nema runtime-ovisnosti, sve je alat: **predvidljivost je vrjednija od automatskih zakrpa**, a nadogradnja je namjerna radnja uz pun gate, nikad nuspojava `npm install`-a. **Od 2026-08-14 isto vrijedi za CDN-ovisnosti koje idu u preglednik** (`check:cdn`) — dotad je pravilo pokrivalo samo alat, dakle ono što ne može nauditi korisniku.

## Komande

> **ZAŠTO neka brana postoji piše U NJEZINOJ SKRIPTI** (`scripts/<ime>.js`, zaglavlje) — ondje
> stoji uz kod koji to provodi, pa ne može ostarjeti odvojeno od njega (ADR-027). Ovdje je samo
> **što radi i kad se vrti**. Do 2026-08-25 su ta obrazloženja stajala i ovdje, u drugoj kopiji;
> provjereno je da svako postoji u svojoj skripti prije nego je odavde maknuto.
> Pouke o **testiranju** (uklj. „zeleno lokalno nije zeleno") su u `docs/workflow/TESTING.md`.

**Svaki dan:** `npm run verify` (integritet catalog-a) · `npm run typecheck` (tsc bez builda) ·
**`npm run bump`** (svi `?v=` + `CONTENT_VERSION` + `SW_VERSION` na isti timestamp; `bump:check`
= CI gate) · **`npm run build:css`** (regeneriraj `styles.bundle.css` iz manifesta `css/app.css`;
emitira i `css/tokens.static.css` za stranice bez bundlea; `-- --check` = drift-gate) ·
`npm run test:unit` · `npm run serve:test` (:5050).

### `npm run preflight` — sve brze brane odjednom (pokreni PRIJE svakog main-pusha)

`check:lockfile` · `check:node` · `verify` · `bump:check` · css-drift · `check:tailwind` · `check:cdn` ·
`check:palette` · `check:tokens` · `check:i18n` · `check:orphan-css` · `check:safearea` · `check:names` · `check:hover` · `check:csp` · `check:mcp-rewrite` · `check:budget` · `check:seo` · `check:contrast` ·
`typecheck` · `validate:schema` · `export:json --check` · `check:docs` · `check:state` ·
`test:unit`. Pre-push hook ga automatski vrti na `main`.

| brana | što tvrdi |
|---|---|
| `check:lockfile` | bi li `npm ci` prošao — vrti **dva npm-a** (lokalni + onaj iz CI-ja), pada zatvoreno. Lock se popravlja s `npx npm@10 install` |
| `check:node` | `.nvmrc` == `engines` == CI == proces koji vrti — **isti major**, inače pada zatvoreno |
| `check:state` | tvrdnje o stanju se slažu s gitom (broj commita žive grane · **zapovijed koja je već izvršena**). Pokriva `CLAUDE.md`, `docs/plan/**`, `BACKLOG.md` |
| `check:docs` | jedan aktivni plan · svaki `.md` u indeksu · nula mrtvih poveznica · **nula ćirilice** u kodu i sadržaju |
| `check:tailwind` | 6 brana oko Tailwind sloja (dinamička imena klasa · sudar s legacy klasom · `@source` ugovor · klase bez bundlea · šum · **sudar `@keyframes`**) |
| `check:cdn` | vanjski podresursi imaju **SRI + `crossorigin` + verzioniran URL**; `check:cdn:live --verify` uspoređuje bajtove s izdavačevim hashem (mrežno) |
| `check:palette` | **čegrtaljka**: broj ostataka stare palete ne smije **porasti** (`--update` spušta osnovicu). Uz nju **četiri tvrde zabrane**: zakucan tekst na ispuni marke · isto to na **POTOMKU** ispune · `--primary-light` kao tekst · **zakucana tamna ploha** |
| `check:tokens` | svaka `var(--x)` u `css/**` ima definiciju (CSS ili runtime u JS-u) — `var()` s fallbackom bez definicije je **zakucana vrijednost s ukrasom**. Osnovica **imenuje** svjesne iznimke |
| `check:i18n` | nijedan korisniku vidljiv tekst zakucan mimo `js/i18n.js` (HTML · JS sinkovi · ključ bez rječnika); osnovica = brojač po datoteci |
| `check:orphan-css` | **čegrtaljka**: klasa u `css/**` koju ne spominje ni markup, ni JS, ni gradivo, ni test. Osnovica ih **imenuje** — dio je legitiman |
| `check:safearea` | `env(safe-area-inset-*)` samo u `css/variables.css`, drugdje `var(--safe-*)` |
| `check:names` | nijedno ime stvarne osobe; popis **izvan gita** (`.imena-zabrana.txt`) — nema ga = pad |
| `check:hover` | svaki `:hover` pod `(hover: hover)` + prefiks `:where(:root:not([data-hover-paused]))` — ne lijepi se ni dodir ni miš |
| `check:csp` | 0 inline `<script>` (iznimka ld+json) i 0 `on*` atributa u `*.html` + enforce header bez `unsafe-inline` za skripte |
| `check:mcp-rewrite` | routing za `/mcp` se **izvodi** iz `vercel.json`, ne čita: imenovan host → svoj projekt, **nepoznat → ništa**. `--zivo` mjeri pravi poslužitelj (mrežno, izvan preflighta) |
| `check:budget` | posjetiteljev put: **nijedna editorska datoteka** + **≤ 200 KB prenesenih** skripti (mjeri PRENESENE bajtove, ne disk) |
| `check:seo` | ono što tražilica i pretpregled VIDE: sitemap == disk · robots ne `Disallow`-a `noindex` stranicu · jedan tekst u `<title>`/`og:`/`twitter:` · `og:image` **1200×630** · JSON-LD **parsira**. `--write` regenerira sitemap |
| `check:contrast` | WCAG **po temi** — 358 provjera kroz sve teme; parsira `css/tokens.css`, ne drži kopiju vrijednosti |

### Izvan preflighta — traže mrežu ili preglednik

| naredba | što radi | zašto nije u preflightu |
|---|---|---|
| `npm run css:diff` | izračunati stilovi u pravom Chromiumu, radno stablo vs git-referencu kroz **`git worktree`**. ⚠️ **Doseg se PREDAJE:** `CSS_DIFF_RUTE` · `CSS_DIFF_SIRINE` · `CSS_DIFF_KLIK` (mjeri stanje POSLIJE klika) · `CSS_DIFF_ALL=1`. Oblik rute se od C5b/1 **provjerava i pada**. ⚠️ **NE dvije instance usporedo.** | preglednik + port |
| `npm run blocks:diff` | isto za **blokove gradiva** kroz `window.renderBlocks`: katalog od `learn-blocks.css` crta **2 od 44 pravila**, pa `css:diff` ondje mjeri prazno. Dokazuje POKRIVENOST pa razliku. | preglednik + worktree |
| `npm run check:contrast:live` | kontrast kakav se STVARNO iscrta: 4 teme × **13** ruta (`te2` NEMA `exercises`/`blind-map` → imenovani zasebno, inače ih brana ne vidi). `check:contrast` čita tokene i ne zna KORISTI li ih CSS — ovo mjeri ekran; iznimke u `scripts/contrast-live-allow.json` (**prazne**) | preglednik + poslužitelj |
| `npm run build:og` | crta `og-cover.png` **1200×630** (boje iz tokena, tekst iz i18n) | preglednik; PNG se **commita**, dimenzije mjeri `check:seo` |
| `node scripts/perf-probe.js` | hladan PRVI posjet, mobilni profil: FCP/LCP/CLS/TBT + bajti iz **CDP-a** (`transferSize` = 0 za CDN). **`--bez=…` = protučinjenični pokus** nad živom produkcijom · `--defer` uz obavezan `--kontrola` · `--vodopad` | mreža + preglednik |
| `node scripts/hover-probe.js` | ljepljivi hover poslije prelaska (dodir · `prelaz` miš · `mis` netaknut) | WebKit + poslužitelj |
| `node scripts/fouc-probe.js` | bljesak teme u ms + kadrovi. ⚠️ Mjeri **DRUGI** posjet | preglednik + poslužitelj |
| `node scripts/jank-probe.js` | trzanje PO KADRU kroz prst-skrol (rAF · `Paint`/Mpx · `DroppedFrame`); `--scenariji=bez-…` = protučinjenično. | preglednik + poslužitelj |
| `npm run css:debt` | što je ostalo za C4–C7: po cigli datoteke, redci, `!important` izvan komentara | read-only, **nije gate** |
| `npm run palette:breakdown` | razloži ostatak palete po **POSLJEDICI** | read-only, **nije gate** |
| `npm run check:final` | bazni `final` red == M1⊕M2(+examPractice); preskočene **imenuje** protiv zakucane osnovice (osmi = pad) | mrežno (anon, read-only) |
| `npm run diff:db [id]` | usporedi bazu s datotekama **prije re-synca** — `migrate-content.js` piše PREKO baze, a `content_versions` je audit, ne undo | mrežno |
| `npm run check:functions` | Edge Functions na PRODUKCIJI: sve deployano, JWT (401) osim imenovanih javnih, stranci 404 | mrežno, bez ključa |
| `npm run mcp:brava` | brava nad AI-tokenom (F6 ①/2): pravi OAuth token bez preglednika; zabranjeno pada, MCP alat radi. **TVRDO odbija prod** | mrežno + staging tajne |
| `npm run backup` / `backup:verify` | DB snapshot → gzip-JSON + sha256 manifest u `backups/` (gitignored, KORISNIČKI podaci) | mrežno; restore je guarded (`--restore` dry-run · `--confirm` · `--force-prod`) |
| `npm run load-probe [N] [R]` | simulira razred: N paralelnih anon readova × rundi | mrežno |

### Testovi

- **`npm run test:responsive`** — Playwright, default suite (iPhone profili).
  ⚠️ Prijava zna pasti **iz utrke**, i to nije naš kod — dva lica su opisana u `tests/auth.setup.js`
  (drugo, `is_admin() = false` uz prazan `rpcError`, obori **cijeli** `authenticated` projekt).
- **`npm run test:authed`** — admin-put, **154 tvrdnje, ~15 min**, **STAGING** kad su `STAGING_*` u
  `.env`. **Od S1 i u CI-ju i u pre-push hooku na `main`.**
  ⚠️ `gate` job = jedina required-provjera → `main` je **PR-only**.
- **`tests/phone.spec.js` + `phone.authed.spec.js`** (mjera: `tests/helpers/phone-gate.js`) —
  **telefon kao STRANICA**: 9 tvrdnji na 320/393/430 px i 852×393, + **sedam** načina učenja
  (`progress` · `exercises`/`blind-map` uvjetni — predmet iz kataloga po značajci). ⚠️ **568×320 svjesno NIJE u brani** (22 tuđa nalaza; `BACKLOG.md`).
  Osnovica je `tests/phone-baseline.json` (danas **prazna** → traži nulu);
  spuštanje = `PHONE_BASELINE_UPDATE=1 npx playwright test …`.
- **`npm run test:storage`** — bucket `node-images` kroz HTTP (vlastiti upload · tuđi prefiks ·
  javni URL · anon · potpisani URL). **WRITE → TVRDO odbija prod.**
- **`npm run test:delete-account`** — Edge Function `delete-account`. **HARD-DELETE → TVRDO odbija
  prod;** T4/T5 traže i `STAGING_SUPABASE_SERVICE_KEY`.

### Sadržaj i baza

`npm run validate:content [id]` · `npm run validate:schema [id]` (ajv) ·
`npm run export:json [id] [--check]` — ⚠️ **nakon izmjene `data/*.js` migriranog predmeta
OBAVEZNO re-export**, inače CI drift-gate pada; vježbe se **ne** exportaju ·
`npm run scaffold -- <id> "<Naziv>" <god> <sem>` · `node scripts/pdf-text.js "<pdf>"` ·
`node scripts/seed-staging.js [id]` (STAGING-only guard) ·
generator predmeta: `docs/workflow/CONTENT_GENERATOR.md`.

**Analiza rada:** `RAD.xlsx` se puni **automatski svaki dan 23:45** (`scripts/rad-dnevno.ps1`, Task Scheduler; commit na grani, nikad push). Ručno: `python scripts/rad-xlsx.py`.

**Naše lokalne komande (gitignored):** `/next` (raspoređivač) · `/brick` (jedna cigla end-to-end) ·
`/deploy` (siguran deploy). Agenti: `content-review` / `exercise-review` · `agent-builder`
(tvornica). [[sokrat-agent-engine]]

> **„F4", „U8", „K6" u starim zapisima = ZATVORENE oznake faza** (temelj F1–F6 · graditelj F0–F5 · editor U/F7/K). Sve tri serije su ispunjene i žive samo kao povijest u `docs/archive/` i `docs/plan/ROADMAP.md`. **Nova faza dobiva ime, ne slovo.**

## Stanje — TRENUTNO (2026-09-04)

> **Ovdje stoji samo ono što vrijedi SAD** (ADR-027). **Povijest cigli je IZAŠLA odavde**
> (2026-08-25): mjere, pouke i obrnute provjere žive u specu i zapisima — ova je sekcija do
> tada nosila **41 604 znaka o GOTOVIM ciglama**, drugu kopiju onoga što spec ima.
>
> | pitanje | tko zna odgovor |
> |---|---|
> | što je na produkciji | zadnji **🚀** redak u `docs/records/CHANGELOG.md` |
> | grana · commiti · je li pushano | `git status -sb` · `git log --oneline -1 origin/main` |
> | koliko predmeta | `npm run verify` |
> | zašto je cigla izvedena baš tako | `docs/archive/FRONTEND_REDIZAJN.md` §7–§12 (C0–C5b, landing · KOSTUR · TELEFON · SEO) |
> | koji su bugovi bili i što su naučili | `docs/records/BUGS.md` |
> | što je isporučeno i kada | `CHANGELOG.md` · dnevnik sesija: `PROGRESS.md` |
>
> **Brojka prepisana u prozu ostari istog dana** → zato **`npm run check:state`** (zašto: u
> skripti). ⚠️ **Memorija je izvan repozitorija pa ju gate ne doseže** — poznata rupa, ne previd.

### Gdje smo

**✅ NA PRODUKCIJI:** zna zadnji **🚀** redak CHANGELOG-a (ADR-027; SHA/token se ne prepisuju ovamo).

**Živa pravila iz isporučenog rada** (sve ostalo znaju spec-arhiva i zapisi, ADR-027):
⚠️ **Iz D2:** `answer` je obavezan i drži **prvi** odgovor i kad postoji `answers` — zbog
**keširane stare skripte**, ne zbog urednosti sheme.
⚠️ **N2 je POLA:** polica pokazuje **skinuto**, ne uniju skinutog i onoga što se uči.
⚠️ **Mjerač mora ispisati i koliko je toga dotaknuo** — bio je prvi kvar 12× u fazi redizajna
i dvaput vratio uvjerljiv krivi broj umjesto da padne.

### 🎯 FRONTEND REDIZAJN + MREŽA = ✅ **NA PRODUKCIJI (2026-09-01)**

Oba speca u `docs/archive/`; isporučeno zna CHANGELOG. **Next.js odbijen (ADR-028)** · **🚚 SEOBA OTKAZANA**
(Leon, 01.09.) → `BACKLOG.md` §SELF-HOST = arhiv, ne plan.

> **🧭 NOVI SMJER (2026-10-03, ADR-040):** Leonov **glavni projekt je HotelixSim** — zaseban repo
> `Documents\hotelixsim`. **Sokrat se dovršava usporedo, pa ide u ODRŽAVANJE.**
> Aktivni spec: **`docs/plan/ZAVRSNICA.md`** (faze i uvjeti ondje); `RASPORED.md` i `MCP.md` su u `docs/archive/`. **Zamrznuto:** tržište gradiva (ADR-035), organizacije i exam (ADR-036).

**Živa pravila IZGLEDA** (nadžive fazu; obrazloženja u spec-arhivi):

- **Zadana tema je SVIJETLA — „Akademsko plavo"** (`academic`; ostale `chalk`, `mint`, **`carbon`** = tamna polovica maila, F1/2 — `paper` maknut 2026-09-01). **Bez izbora prati UREĐAJ** (F1/3, `boot.js`, prije crtanja: tamno → `carbon`). ⚠️ Izbor nosi biljeg `sokrat-theme-chosen`; `academic` **bez** biljega = stari automatski upis, NE izbor — `initTheme()` nikad ne upisuje, samo briše.
  Dvije tamne palete zaredom pale su na živom ekranu. Smjer izgleda je **APPLE** (Leon: *„apple
  smjer, naravno"*): grotesk svugdje (**serif nadglašen**), praznina, tipografija nosi, monokrom
  + jedan akcent. Spec §7.3–7.8.
- **Traka nosi TOČNO DVA odredišta: vlastito gradivo i profil** (F2/0 — **okreće T2**, Leon: *„gore treba biti profil i UGC"*). Ulaz je u TRAJNOM KROMU, na svakoj stranici; **drugi ulaz u istu traku vraća kvar koji je K2b uklonio**, zato brana traži točno jedan.
- ~~**🔒 ZNAK JE NEPROMJENJIV**~~ — **oboreno (ADR-040): novi znak, ime ostaje** (faza ZNAK).
- **Broj predmeta se NIKAD ne piše rukom.** Jedini ručno pisan je statični fallback u
  `index.html` i njega čuva `npm run verify`; landing je taj razred greške već imao **na
  produkciji** (pisao 17 kad ih je bilo 22).
- **Prikaz blokova ide ISKLJUČIVO kroz `renderContentBlocks()`**, a **svaki tekst iz podataka
  koji ide u `innerHTML` mora kroz `SokratBlocks.esc`** (ikona kroz `safeIcon`, boja kroz
  `accentFrom`, URL kroz `safeUrl`). Povod: BUG-024/025 — jedno pitanje u katalogu bilo je
  **neodgovorljivo**. ⚠️ `safeIcon` i `inkForTint` od 2026-09-04 **stanuju u `js/utils.js`**
  (stranica bez renderera ih i dalje treba); `SokratBlocks.*` su prečaci, ne kopije.
  [[escape-all-data-in-innerhtml]]
- **Telefon je MJERENA površina** (faza TELEFON): `tests/phone.spec.js` + `phone.authed.spec.js`,
  osnovica prazna → brana traži nulu. Ne popravljati „na oko" ono što ona mjeri.
  [[phone-is-unmeasured-surface]]
- **Sigurna zona ima JEDAN izvor:** `env()` samo u `css/variables.css`, svugdje drugdje
  `var(--safe-*)` — pravilo napisano golim `env()` je **nemjerljivo** (brana: `check:safearea`).

### 🔒 TVRDE ODLUKE O DEPLOYU

① **Svaki deploy traži izričit OK** — nijedno ranije odobrenje se ne proteže na sljedeći put.
② **Broj commita izvan produkcije NIJE nalaz i NE SPOMINJE SE** (*„ZNAM KADA ZELIM PUSTIT NESTO
NA PRODUKCIJU"*) — **ova stoji netaknuta.** Pravilo #2 time dobiva dopunu: ne samo da se ne smije
pushati bez OK-a, nego se na to ne smije ni **nagovarati**. [[leon-decides-deploys]]

### 🧪 VJEŽBE — smjer zaključan; frontend je gotov pa SMIJU na red (prioritet uz RAČUN = Leonova odluka)

*„Vježbe su KÔD"* je **oboreno mjerenjem** (65 % je podatak; kôd je samo **formula**). Smjer:
formula → **imenovana knjižnica recepata**, vježba postaje 100 % podatak, **BUG-012 se umirovljuje**.
Odbačeno (ruši ADR-018): evaluator izraza i sandbox za korisnički JS. Izvan MCP-a (ADR-031).
[[exercises-code-vs-data]]

### ✅ OTVORENIH PITANJA NEMA — sva su zatvorena 2026-08-30 (Leon)

- **Semantika je UVIJEK PUNA ISPUNA — obrub NIJE zamjena za nju** (ADR-032, Leon: *„ne smije biti
  obruba uopće"*). Prilagođava se **tinta, ne ispuna**: `--color-on-ok`/`--color-on-danger` po
  temi, izmjereno: bijelo pada u `chalk`/`mint`, tamno prolazi (brojke u spec-arhivi). Isto vrijedi za KARTICE, gdje boja dolazi izvana → `inkForTint()` (već postoji, C5a/4).
- **OAuth:** Google isporučen u R1; Facebook otpao 2026-09-06 (anketa, §6). „Sign in with ChatGPT" se NE obećava.
- **„Povijest učenja" OSTAJE, ali plitko.** Smisao dobiva tek s objavom materijala i mnogo
  sadržaja. **Ne razvijati sad, ne brisati** — `.history-item*` su namjerno mrtva, ne siročad.

### Stalno — vrijedi neovisno o fazi

- **🎨 Funkcija prije vizuala** (Leon: *„sve mora savršeno raditi prije nego ga uredimo"*) —
  zato je frontend zadnji, i zato smo tek sad u njemu. [[frontend-last-function-first]]
- **⚠️ Osobni graditelj = ZASEBAN OTOK (ADR-024):** javni katalog · studentski vrući put ·
  `publish_document` = **NEDIRNUTI**. `anon` nema ništa, `authenticated` ima **samo SELECT**,
  **svaki upis ide kroz `SECURITY DEFINER` RPC s owner-checkom** (`owner_id = auth.uid()`).
- **Editor (admin CRUD) = funkcionalno gotov** — Studio: stablo/canvas/inspektor, svi modovi
  uredljivi, media, drag-drop, boje. Preostali polish je **neobavezan**:
  `docs/archive/EDITOR_PLAN.md` §12. [[editor-must-be-real-product]]
- **STAGING Supabase:** `sokrat-staging` (ref `czljmvigkgiajzjxtndq`) — write/draft testovi, da
  prod-audit ostane čist. `test:authed`/`rls-check` gađaju staging kad su `STAGING_*` u `.env`;
  seed = `node scripts/seed-staging.js`.
- **⏳ Grane izvan `main`-a:** zna ih `git branch --no-merged main`, ne ova datoteka. ⚠️ Grana zna
  izgledati kao platformski zahvat a nositi samo `?v=` tokene → *uzmi `main`, pa `npm run bump`*.
- **⚰️ Content-suradnik OTKAZAN 2026-09-04** (Leon) — role-router ukinut, `docs/archive/TEAM.md` je
  povijest, ADR-023 nosi pečat. **Gradivo ostaje:** sedam HR predmeta je živo. **S4+S5** (4
  kvantitativna HR predmeta, vježbe = samo string-polja) je time **BEZ VLASNIKA**, ne otkazan.
  `content-review` agent i dalje vrijedi za bilo koji content-zahvat. [[content-model-standard]]
- **HR-ekspanzija:** HR 1. god × 3 smjera FMTU dijele vezne predmete (ADR-022). Kad HR program
  bude potpun → **HR u Supabase** (`migrate-content.js`). [[hrv-program]]
- **PAUZIRANO za nas:** 3. godina · novi EN sadržaj (ADR-018: student uploada PODATKE, nikad KOD).
- **Min. lozinka 8 (server-side) + leaked-password** vrijede dok je Pro (odluka 2026-09-01:
  ostaje); klijentski dvojnik (D4, `js/auth.js`) svejedno stoji.
  ⚠️ **NE „popravljaj" `js/auth.js:343`** — tvrdnja o `WeakPasswordError` je **oborena**: u
  zakucanom `supabase-js@2.110.8` slaba lozinka dolazi kao `data.weakPassword` uz `error: null`.
- **Sitni dug (ne blokira):** siročad u Storageu · PROD čeka `f2-temelj-mreze.sql` + mail (18.09.) ·
  `set_updated_at` ima promjenjiv `search_path` (jedini nenamjeran WARN). ⚠️ **`is_admin()` se NE smije
  revokeati `authenticated`-u** — zovu ga RLS politike kao pozivatelj (F6 ①/2 skinuo mu je samo PUBLIC).
- **Napomene:** Supabase org je `pro` i **plaća se do daljnjeg** (Leon, 2026-09-01) →
  free-tier spavanje nije prijetnja · `content_versions`/`node_content_versions` =
  **append-only audit**, brisanje **samo uz izričit OK** · PWA drži staru ikonu do
  reinstalacije (nije bug).

## Ključne odluke — samo one koje MIJENJAJU današnji rad

> Puni tekst i sve starije: **`docs/records/DECISIONS.md` (ADR-001…040)**.
> Ovdje su ADR-ovi koji su **živa ograničenja**, ne povijesno obrazloženje.

- **ADR-040:** **novi smjer** (Leon, 2026-10-03) — v. 🧭 gore · dijeljenje linkom obara ADR-025 · brane ADR-031 sužene · ADR-035/036 **zamrznuti**.
- **ADR-034:** **stranica se NE zumira** (Leon, 2026-09-05) — ni štipanje ni dodir ni fokus; nadjačava WCAG 1.4.4; **F1/11 ✅** (`ISKLJUCENO_ODLUKOM` u `axe-gate.js`).
- **ADR-031:** **MCP je CJEVOVOD, ne CRUD** (Leon, 2026-08-30): `Learn` je podloga svega → AI prvo prepozna lekcije/sekcije i napiše skriptu → iz nje kartice (**pojam/pitanje → objašnjenje**, boja po lekciji da se vidi kojoj pripada) → iz kartica dopune i kviz, uz **pokrivenost, ne uzorak**. **AI je KORISNIKOV** (ne plaćamo tokene → kvalitetu držimo samo branama), **materijal dolazi kroz chat** (datoteku nikad ne vidimo), **sve ide u NACRT**, doseg = **samo vlastito gradivo** (ni čitanje kataloga). **Četiri tvrde brane u write-putu:** duljina kartice · svaka kartica daje bar jedno pitanje · svaka lekcija dobiva boju · dopuna ima jednoznačan odgovor.
- **ADR-030:** **AI kroz MCP je GLAVNI put stvaranja; editor je DORADA** (Leon, 2026-08-13) — smije IZGUBITI funkcije, ne dobiti ih. MCP je proizvod, ne spike, i najveći neriješeni komad plana; **kontrola kvalitete seli s ekrana u write-put** (`js/card-limits.js` = **treći čitatelj, nikad treća kopija**); nikad katalog/`is_admin()`/`service_role`; **vježbe izvan MCP-a** (ADR-018).

- **ADR-029:** **UGC je GLAVNI proizvod**, javni katalog (broj predmeta zna `npm run verify`) je **jedan izvor gradiva**, ne srce platforme. „Moji materijali" prestaju biti pododjeljak profila i postaju **ravnopravno odredište** (stranica + ulaz u navigaciji i na landingu). **Ne popušta ništa sigurnosno** — ADR-024/025/018 stoje netaknuti; ovo je odluka o **istaknutosti**. ⚠️ Od ADR-040 vrijedi **unutar Sokrata**.
- **ADR-028:** frontend ide na **Tailwind v4, ali SAMO preko CLI-ja** (generirani CSS se commita, kao i dosad `styles.bundle.css`) — **CDN nikad** (kompajler u pregledniku se tuče sa SW-om i immutable cacheom). **Tailwind NIKAD ne ulazi u `data/`** — gradivo zadržava semantičke klase, inače stil živi u podatku. **Dinamički sastavljene klase (`'bg-' + boja`) su zabranjene** — Tailwind skenira izvor, ne runtime; paleta od 8 boja ostaje na CSS varijablama.
- **ADR-027:** znanje ide u **kod i testove**; proza nosi samo **ZAŠTO**. Jedna činjenica = **jedno mjesto**. Rub koji prepoznaš isti čas dobiva test — inače je zapis samo uredno dokumentiran propust (povod: BUG-023).
- **ADR-026:** korisnik gradi **„materijal"**, spremnik je **„polica"** (EN ostaje `folder`); „gradivo" = javni katalog. **Mobilno autorstvo ide preko korisnikovog AI-a (MCP)**, ne preko editora na dodir. MCP invarijante: nikad katalog, nikad `is_admin()`, nikad `service_role`.
- **ADR-025:** doseg osobnog materijala — vježbe **odgođene** · dijeljenje privatno sad (**cijena: slike su vezane na vlasnički prefiks**) · napredak isti kao katalog · **boje se nasljeđuju od sekcije i smiju se pregaziti** · korisnik je **bilo tko**.
- **ADR-024:** osobni graditelj = **zaseban otok** (`nodes` + owner-RLS + RPC-only upis), NE proširenje kataloga; dva publish-puta svjesno koegzistiraju.
- **ADR-023:** ⚰️ **otkazan 2026-09-04** (suradnik); t.5 (ADR-022 pull-forward) ostaje.
- **ADR-022:** identitet predmeta preko programa (placement ≠ sadržaj) — temelj HR-ekspanzije.
- **ADR-018:** student uploada **PODATKE, nikad KOD** (vrijedi i za UGC).
- **ADR-017:** cache-busting = **jedan** auto-bumpani token (`npm run bump`), ne per-file hash.
- **ADR-016:** `service_role` → **samo** Supabase Edge Functions, nikad Vercel/klijent.
- **ADR-011:** read-path = Supabase **anon + RLS, bez `/api`**, uz file-fallback.
- Ostalo (013 · 014 · 015 · 019 · 020 · 021 · 006–012 · 001/008) = **povijesno obrazloženje**, u `DECISIONS.md`.
- **Logo:** `assets/logo.svg` (vektoriziran potraceom, indigo gradijent); favikoni iz SVG-a.
## Dokumentacija — **ulaz je SAMO `docs/README.md`**
Od 2026-08-07 je `docs/` složen **po ulozi dokumenta**, ne po temi. Ne traži fajlove napamet — otvori indeks.

| mapa | uloga |
|---|---|
| `docs/product/` | **ŠTO** gradimo — definicija + kriteriji prihvaćanja (PRD · VISION · MONETIZATION) |
| `docs/architecture/` | **KAKO** je građeno (ARCHITECTURE · BACKEND · CATALOG_ARCHITECTURE · CONTENT_SCHEMA · EXERCISES_ENGINE) |
| `docs/plan/` | **ŠTO SADA** — **najviše JEDAN** aktivni spec + ROADMAP |
| `docs/workflow/` | **KAKO RADIMO** (TESTING · TEAM · CONTENT_GUIDE/INTAKE/GENERATOR) |
| `docs/records/` | **POVIJEST** (HISTORY · CHANGELOG · PROGRESS · DECISIONS · BUGS · BACKLOG) — **nikad izvor istine** |
| `docs/subjects/` · `docs/archive/` · `docs/ideas/` · `docs/sokrat-ai/` | predmeti · ispunjeni planovi (referenca) · **ideje koje nisu projekt** · zaseban projekt |

**Pravila (gate `npm run check:docs`, dio preflighta):** jedan aktivni plan · `product/` bez dnevnika · svaka mogućnost ima **kriterij prihvaćanja** („gotovo kad korisnik može X", ne „test je zelen") · svaki `.md` naveden u indeksu · nula mrtvih poveznica.
