# Testing — QA checklista

> Imamo automatske testove (Playwright + unit + validatori) — uz njih ova ručna lista.
> Prođi relevantni dio prije svakog deploya. Nađeš li bug → upiši ga u [BUGS.md](../records/BUGS.md).

## Automatske provjere (uvijek prvo)

> **Ovaj dokument NIJE inventar testova, i namjerno je prestao to biti (2026-08-25).**
> Do tada je nabrajao spec-datoteke rukom, i mjerenje je pokazalo kako to završi: **od 53
> datoteke `tests/**/*.spec.js` bilo ih je imenovano 35**, a i sam broj u upozorenju („46") bio
> je zastario. Provjereno je i **što bi se skraćivanjem izgubilo: ništa** — **52 od 53 speca
> nosi vlastito zaglavlje** s poviješću i metodom, a od 51 pojma koji je dokument imao „viška"
> nijedan nije postojao samo ovdje.
>
> **Autoritativan popis testova je `tests/` sam:** `npx playwright test --list`.
> **Zašto neka tvrdnja postoji piše u zaglavlju svog speca** (ili njegova mjerača u
> `tests/helpers/`), gdje stoji uz kod koji je provodi i ne može ostarjeti odvojeno od njega
> (ADR-027). Ovdje ostaje ono što je **operativno**: koje naredbe vrtjeti, čime su uvjetovane,
> i što smije dirati koju bazu.
>
> ⚠️ **Broj testova se NE prepisuje u prozu.** Ovdje je stajalo *„ukupno `test:authed` = 89"* i
> *„21 predmet = 17 EN + 4 HR"* — oboje je ostarilo tiho. Brojeve zna runner, predmete
> `npm run verify`.

### Brze brane — `npm run preflight` ih vrti sve odjednom

- [ ] `npm run verify` → integritet catalog-a (mapiranje, datoteke, window-izvoz, **+ BUG-012 čuvar: predmet s vježbama MORA imati `content.codeScripts`**).
- [ ] `npm run validate:content [id]` → shema sadržaja + quiz indeks + KaTeX currency-safety. Zaštitar generatora.
- [ ] `npm run validate:schema [id]` → strukturni JSON Schema ugovor (`schema/subject-content.schema.json`, ajv).
- [ ] `npm run export:json -- --check` → `data/json/**` u sinku s izvornim `.js`. **⚠️ Nakon izmjene `data/*.js` migriranog predmeta obavezan re-export**, inače pada i CI.
- [ ] `npm run test:unit` → graderi engine-a vježbi + `app-state` + `blocks-renderer` (escape-granica). **Popis se NE piše rukom:** `scripts/test-unit.js` nabraja `tests/unit/*.test.js` **s diska, rekurzivno**, pa se nova datoteka vrti čim padne na disk — **i iz podmape** (`tests/unit/mcp/…`), nema unosa koji se zaboravi. ⚠️ Ravno nabrajanje je u prvoj verziji činilo podmapu nevidljivom uz pun `N/N` — istu zamku kuća već zna, vidi zaglavlje `scripts/ci-tajne.js`. Runner **pada na nuli datoteka** i na nesrazmjeru izvedeno/nabrojano, i **ispisuje doseg** (`dotaknuto N/N`); brana `tests/unit/test-unit-runner.test.js` ga zato IZVODI nad podmetnutim mapama, ne čita mu tekst.
- [ ] `npm run bump:check` → svi `?v=` tokeni + `CONTENT_VERSION` identični (drift = ručni bump podskupa → BUG-004, ADR-017). Popravak: `npm run bump`.
- [ ] `npm run build:css -- --check` → `styles.bundle.css` i `css/tokens.static.css` u sinku s manifestom `css/app.css`.
- [ ] **sve ostale `check:*` brane** (`check:tailwind`, `check:cdn`, `check:palette`, `check:orphan-css`, `check:safearea`, `check:budget`, `check:seo`, `check:contrast`, `check:docs`, `check:state`, `check:lockfile`, …) → **što svaka tvrdi, piše u `CLAUDE.md` §Komande; ZAŠTO postoji, u zaglavlju svoje skripte.**
      ⚠️ **Mjerodavan popis je `"preflight"` u `package.json`, ne ovaj redak.** Popis iznad je ostario
      istog dana kad je nastala nova brana — isti razred greške zbog kojeg je ovaj dokument
      2026-08-25 prestao biti inventar, samo u malom.
- [ ] `npm run typecheck` → `tsc --checkJs`, bez builda (scope u `tsconfig.json` raste modul po modul).

### Sporije brane — traže preglednik, mrežu ili prijavu

- [ ] `npm run test:responsive` → Playwright, default (odjavljena) suita na iPhone profilima.
      ⚠️ **Puni skup lokalno samo prije `main`-a** — po cigli ciljano, v. [Koji testovi kada](#koji-testovi-kada-leon-2026-10-11).
- [ ] `npm run test:authed` → pozitivan admin-put (v. odjeljak niže).
- [ ] `npm run check:contrast:live` → kontrast kakav se STVARNO iscrta (4 teme × **13** ruta;
      `exercises` i `blind-map` dodani u C5b/0 — `te2` ih nema, pa ih brana dotad nije vidjela).
      ⚠️ Nije isto što i `check:contrast`: onaj čita **parove tokena** i ne zna KORISTI li ih CSS.
      Povod (BUG-035): `color: white` zakucan u modulu davao je **1.13** u zadanoj temi, a
      **cijeli preflight javljao je zeleno**. Traži `npm run serve:test`.
- [ ] `npm run css:diff` → dokaz da se **prikaz** nije promijenio; uz svaku ciglu koja dira CSS.
      ⚠️ **Bez `CSS_DIFF_RUTE` mjeri SAMO `/`.** `COLLECT` nasilno pali svaku `*-page` sekciju, pa
      izgleda kao da su sve stranice pokrivene — a pokriven je samo njihov markup iz `index.html`.
      Kartice kataloga, popis lekcija i polica na `/` **ne postoje**. Cigla koja migrira površinu
      s JS-om predaje svoje rute: `CSS_DIFF_RUTE="#/subjects,#/subject/te2"` (nađeno u C4b).
      ⚠️ **Mjeri samo promjene u CSS-u** — presreće stylesheet, a HTML uzima iz radnog stabla. Premjesti li cigla vrijednost **iz markupa u CSS**, referenca je stranica koja **nikad nije postojala**, pa prijavljuje razlike i ondje gdje se ništa nije promijenilo. Tada se dokazuje **pravim A/B-om**: `HEAD` poslužen iz zasebnog `git worktree`-a na drugom portu, obje verzije sa **svojim** markupom i **svojim** CSS-om.
- [ ] `npm run test:rls` → anon čita `subject_content`, **ne vidi** `progress`. Pad = curenje; SKIP na uspavanu bazu.
- [ ] `npm run test:storage` → bucket `node-images` kroz pravi HTTP Storage API. **WRITE → TVRDO odbija prod.**
- [ ] `npm run test:delete-account` → Edge Function `delete-account`. **HARD-DELETE → TVRDO odbija prod.** T5 stavlja datoteku u **oba** osobna bucketa (`node-images` + `profile-images`) i traži da oba budu prazna — izmjereno 13.09.: bucket izvan popisa u funkciji ne ruši brisanje, nego ostavlja **javno siroče**.

### Što suita čuva — po skupinama, ne po datotekama

> Imena u zagradi su **ulazne točke za čitanje**, ne popis. Cijeli popis: `npx playwright test --list`.

| skupina | što čuva | ući kroz |
|---|---|---|
| **sadržaj i katalog** | sve sekcije svih predmeta se renderiraju, podaci teku kroz catalog, 0 JS grešaka, lijeno učitavanje stvarno je lijeno | `smoke` · `browse` · `lazy-load` · `dual-read` |
| **tijekovi učenja** | flashcards/quiz/fill/learn kroz **prave klikove**, napredak, povratak na zadnju poziciju | `app-state` · `quiz-reset` · `restore-position` · `learn-parity` |
| **geometrija i telefon** | nijedna kontrola nije odrezana, prekrivena ni preklopljena; **telefon kao STRANICA** (osnovica u `tests/phone-baseline.json`, danas prazna) | `phone` (+`.authed`) · `reachability` (+`.authed`) · `layout-guard` · `layout.authed` |
| **izgled po temama** | kontrast i tinta kroz sve 4 teme, uklj. boje koje dolaze iz **podatka**, ne iz CSS-a | `tint-ink` · `a11y` (+`.authed`) · `learn-blocks-contrast` |
| **sigurnost prikaza** | svaki tekst iz podataka ide kroz `esc`; `:hover`/`:disabled` se ne tuku s kaskadom | `escaping` · `cascade.authed` |
| **adrese i vraćanje** | devet stranica ima devet dijeljivih adresa; „natrag" ima **jedan** model; kartica lekcije je prava kontrola | `routes` · `back-model` · `lesson-card` · `materials-entry` |
| **auth, admin, RLS** | odjavljeni put ne vidi ništa admina; prijavljeni put stvarno piše i stvarno je odbijen gdje treba | `auth` · `admin` · `admin-detect.authed` · `publish-rpc.authed` |
| **račun (identitet i slike)** | ime/opis i putanje slika ulaze SAMO kroz RPC; `role` nedodirljiv; javni bucket čitljiv po URL-u, a tuđi prefiks zatvoren | `profile-identity.authed` · `profile-images.authed` · `profile-wall.authed` |
| **autorstvo (UGC + Studio)** | graditelj materijala, blok-editor, media, slike pod vlasničkim prefiksom, stropovi kartica | `my-materials.authed` · `studio.authed` · `node-images.authed` · `card-limits.authed` |
| **platforma** | Service Worker (offline shell + update-flow), monitoring iza privole, UI-primitivi, i18n, pravne stranice | `sw` · `monitoring` · `components` · `i18n` · `legal` |

⚠️ **`sw.spec.js` je izoliran:** app-testovi imaju `serviceWorkers: 'block'` (u `playwright.config.js`), inače SW presreće `page.route` i lomi npr. dual-read. Dva speca imaju `test.use({ serviceWorkers: 'allow' })`: **`sw.spec.js`** (ljuska) i — od cigle P3
— **`offline-study.spec.js`** (sadržaj skinutog predmeta). Dodaješ li treći, pravilo je isto:
`allow` samo ondje gdje se SW **mjeri**, jer inače presreće `page.route` i lomi npr. dual-read.
⚠️ **Konvencija privole:** specovi koji klikaju donje kontrole pred-postavljaju `localStorage['sokrat-cookie-consent'] = 'denied'` — inače fiksna cookie-traka presreće klik (isti kvar koji je T4 mjerio kao ⑧).
⚠️ **Gdje editor živi zna JEDNO mjesto:** `tests/helpers/studio-entry.js`. Do T6 je isti ulaz bio prepisan **sedamnaest puta**. *Ovisnost nije samo „tko spominje" nego i „tko čeka"* — dva speca stranicu ne spominju, ali čekaju njezine globale, pa ne padnu nego **vise**.

(Prvi put: `npm install` + `npx playwright install chromium`.)

## Authenticated (admin) suite — POZITIVAN admin-put (`npm run test:authed`)

> Rješava dugogodišnju rupu: Playwright se **može prijaviti** na Supabase (storageState). Pokriva
> put koji je pustio `window.SokratAuth` bug (BUG-018) — stari testovi provjeravali su samo
> `isAdmin === false`. [[live-login-verifies-crud]]

- **Kako se uključuje:** `playwright.config.js` dodaje projekte `auth-setup` + `authenticated`
  **samo kad su `TEST_ADMIN_EMAIL`/`TEST_ADMIN_PASSWORD` postavljeni** (lokalno `.env` → dotenv,
  CI → secrets). Bez njih default suita ostaje **nepromijenjena i deterministička**.
- **`auth.setup.js`** je dependency cijelog projekta: prijava kroz `SokratAuth`, provjera
  `is_admin()`, sesija u `tests/.auth/admin.json` (gitignored).
  ⚠️ **Prijava zna pasti iz utrke i to NIJE naš kod** — dva lica su opisana u zaglavlju te
  datoteke; drugo (`is_admin() = false` uz **prazan** `rpcError`) obori **cijeli** `authenticated`
  projekt, pa jedan promašaj izgleda kao stotinu padova.
- **🏗️ STAGING je uvjet, ne udobnost:** `sokrat-staging` (ref `czljmvigkgiajzjxtndq`) = izolirani
  test-DB. Kad su `STAGING_*` u `.env`, write-testovi gađaju njega. Seed: `node scripts/seed-staging.js`
  (idempotentan, tvrdi guard — odbija ne-staging URL).
  ⚠️ **Protiv PROD baze WRITE-testovi mijenjaju živi sadržaj i ostavljaju `content_versions`
  audit-redove** (append-only, admin ih ne može obrisati) → pravilo #8: protiv PROD-a samo
  edit-pa-revert.
- **Setup računa:** dediciran **test-admin account (NE osobni)** → napravi kroz app +
  `profiles.role='admin'` → creds u `.env`.
- ⚠️ **Sesija i račun su DIJELJENI svim `*.authed.spec.js` (2026-09-14, F2/1):**
  ① **tema živi u `user_metadata.theme`** — spec koji mijenja temu kroz `setTheme`/birač piše u račun
  i time svim ostalim specovima mijenja temu; vrati zatečeno u `finally` (obrazac:
  `theme-account.authed.spec.js`, koji uz to bira `academic` = ono što ostali ionako vide).
  Izravan `setAttribute('data-theme', …)` (axe-gate) račun ne dira.
  ② **Nikad `SokratAuth.signOut()` nad DIJELJENOM sesijom** — od F2/1 ④ (2026-09-14) je odjava
  `scope: 'local'`, ali i lokalna briše sesiju na poslužitelju, a svi konteksti iz `tests/.auth/admin.json`
  nose ISTU sesiju → padaju svi specovi iza njega. Spec koji vozi odjavu otvara vlastite kontekste s
  vlastitom prijavom (obrazac: `signout-local.authed.spec.js`). ⚠️ Obrnuta provjera s globalnom odjavom
  opoziva sve sesije računa → vrti se samo taj spec sam.


## CI/CD — automatski gate (od 2026-06-29, FOUNDATION_PLAN F1)
> Iste provjere gore vrte se **automatski na svaki push/PR** preko GitHub Actions (`.github/workflows/ci.yml`).
- **Jobovi (4):** `build` (brze brane bez preglednika, fail-fast) · `playwright` (2 sharda, `needs: build`) · `authed` (prijavljeni put) · **`gate` (roll-up)**.
- **`gate` job (S1, 2026-09-24) = JEDINA provjera koju označavaš kao required.** `needs: [build, playwright, authed]`, `if: always()`, i **sudi** `needs.<job>.result != success` (dakle `cancelled`/`skipped` ne prolaze). Zašto roll-up a ne „označi svaki job": required-popis živi u GitHub postavkama, **izvan repozitorija**, i stari kao svaki ručni popis — a broj jobova raste. Ovako koje jobove pokriva piše u `ci.yml`, i brana traži da `needs` nabraja **sve** ostale.
- **⚠️ `Gate` se u popis required-provjera pojavljuje SAMO nakon što se barem jednom izvrti** (GitHub nudi provjere koje je nedavno vidio) → redoslijed je **tajne → push → CI → pa onda required**.
- **`npm run test:authed:mjeri`** (`scripts/authed-mjera.js`) — **ovo vrte CI i pre-push hook**, ne goli `test:authed`. Vrti suite pa **sudi statistiku**: `expected` ≥ **154** · `skipped` ≤ **granica koja se IZVODI iz imenovanih iznimki** (`preskocenihPoIznimkama()`, danas **0**) · `unexpected` = 0 · nečitljiv izvještaj ili Playwright koji se ne pokrene = **pad**. I **ispisuje koliko je dotaknuo**.
  ⚠️ Granica preskočenih se **ne piše rukom**: zakucana „6" bila je točna jedan dan, do odluke o service ključu. Brana izričito traži da to **ne bude literal** — popis koji se ne mijenja zajedno s izvorom jamči drift, ne sprječava ga.
  ⚠️ **Zašto goli `test:authed` nije dovoljan:** Playwright pada zatvoreno tek na **doslovno nula** testova → suita u kojoj se **sve preskoči** završava **EXIT 0**. Dvije jednoredne izmjene rušile su cijeli dokaz uz zeleno: preimenuj spec u `.mjs` (34 → 33), ili `test.skip(true, …)` na vrh speca ③.
- **`authed` job (F4; presuđen S1):** `npm run test:authed:mjeri`, **154 tvrdnje, ~15 min** (izmjereno 14 min 45 s). Gađa **STAGING** (`auth.setup.js` preusmjeri app kad su `STAGING_*` postavljeni) → PROD audit ostaje čist, pravilo #8. **Tajne u CI-ju su PET `STAGING_*`** (URL · ANON · TEST_ADMIN_EMAIL · TEST_ADMIN_PASSWORD · **SERVICE_KEY**), Leonova odluka 2026-09-24.
  ⚠️ **Ne preskače više tiho:** prvi korak je `node scripts/ci-tajne.js --zahtijevaj` i **pada zatvoreno**. Povod je izmjeren istog dana: korak je trajao **0 s u zadnjih 12 vrtnji** (`e23d658` … `921cfbc`) jer je bio `if [ -z "$TEST_ADMIN_EMAIL" ] → exit 0`, a taj secret **nikad nije bio postavljen** → **34 authed datoteke nisu se izvrtjele ni na jednom commitu**, uz 25 s instalacije Chromiuma po vrtnji. Zeleno je značilo „nisam ništa izmjerio".
  ⚠️ **U CI-ju se više NIŠTA ne preskače.** Do 24.09. je `tests/temelj-mreze.authed.spec.js` (6 tvrdnji) bio imenovana iznimka jer `STAGING_SUPABASE_SERVICE_KEY` nije išao u GitHub; Leon ga je isti dan dodao, pa je ključ prešao u obavezne i **CI mjeri svih 154 kao i lokalno**. Obrazac ostaje: svaka buduća iznimka mora imati napisan **razlog i cijenu**, a cijena ulazi u granicu preskočenih.
- **TVRDI gate:** crveno = **ne mergea se u `main`**. Artefakti (screenshotovi/report) se uploadaju samo na pad.
- **Koje tajne CI mora imati NE PIŠE SE RUKOM:** `scripts/ci-tajne.js` ih **čita s diska** (`tests/**` + `playwright.config.js`) i svrstava u `OBAVEZNE` / `IMENOVANE_IZNIMKE` / `NISU_TAJNE`. Brana `tests/unit/ci-tajne.test.js` (u `test:unit`, dakle preflight **i** CI) traži: nula nesvrstanih · nula **mrtvih** unosa · `authed` prosljeđuje **točno** obavezne · nema `exit 0` grane · `gate` pokriva sve jobove · hook vrti suite. **Peti spec koji sutra zatreba novu tajnu obori branu umjesto da se preskoči.**
- **Tok rada „grana → preview → prod":**
  1. Radi na grani (ne direktno na `main`). Push grane → **CI se pokrene** + **Vercel napravi preview-deploy** (zaseban URL, NIJE produkcija).
  2. Provjeri: CI zelen + vizualni pregled na preview URL-u.
  3. Tek kad je zeleno i pregledano → merge u `main` (= produkcijski deploy) **uz izričitu potvrdu korisnika**.
- **Lokalno prije pusha grane** (da CI ne bude crven): `npm run preflight` + **ciljani** Playwright; puni `npx playwright test` je CI-jev posao — v. [Koji testovi kada](#koji-testovi-kada-leon-2026-10-11).
- **Pre-push hook na `main` (od S1):** `preflight` → `ci-tajne.js --zahtijevaj` → **`test:authed` (~15 min)**. Leonova odluka 2026-09-24: na `main` ide **punih 154 tvrdnji**. Zašto toliko čekanja: preflight ne vrti **nijedan** test koji se stvarno prijavi — RLS, Storage, publish-RPC i brava na lozinci mjere se **isključivo** authed suiteom, a on je dotad bio izvan i preflighta i CI-ja. Svjestan bypass ostaje `git push --no-verify`.


## Koji testovi kada (Leon, 2026-10-11)

**Zašto:** puni `test:responsive` traje **~40 min** i na razvojnom stroju (2 GB slobodnog RAM-a) guši
sve ostalo; 10.10. je prekinut na **453/954** (0 palo). Isti skup CI ionako vrti na svaki push grane,
u dva sharda, na Linuxu — koji je i jedini sudac za mjere ovisne o crtaču (odjeljak ispod).

| kada | što se vrti lokalno | tko vrti puni skup |
|---|---|---|
| **po cigli** (commit na grani) | `npm run preflight` + **ciljani** Playwright: `npx playwright test <specovi>` — svaki spec koji dira promijenjenu datoteku (izravno, kroz helper ili tako da čeka njezin globalni) | **CI na push grane** |
| **poslije pusha grane** | ništa — **pročitam ishod CI-ja**: `runs` → `jobs` → anotacije check-runa (javni API, bez ključa; v. odjeljak ispod) | CI |
| **prije `main`-a / produkcije** | **puni** `npm run test:responsive` (+ pre-push hook vrti `test:authed`) | lokalno **i** CI |

⚠️ **Ciljani skup se bira po ovisnosti, ne po imenu:** spec koji datoteku ne spominje, a čeka njezin
globalni, ne padne nego **visi** (v. §„Gdje editor živi"). Kad nisi siguran, uzmi širi skup.
⚠️ **„Push je prošao" nije „CI je zelen".** Cigla nije gotova dok ishod CI-ja nije pročitan; crveni CI na
grani je nalaz iste težine kao crveni lokalni test.

## ⚠️ ZELENO LOKALNO NIJE ZELENO (2026-08-24)

> Preseljeno iz `CLAUDE.md` 2026-08-25 (cigla B skraćivanja): ovo je **pravilo o testiranju**,
> pa mu je mjesto ovdje, a ne u datoteci koja se učitava svaku sesiju.

**Windows i Linux ne crtaju isti font istom širinom (~4 px)** — i to je dovoljno da **brana
promijeni ishod bez ijedne promjene u proizvodu**.

U jednom pushu je to naplaćeno **tri puta**:

1. **Marker landinga** se lomio preko dva retka. T5 je `nowrap` odbacio **bez mjerenja**; sonda
   je poslije pokazala da fraza troši **58 % stupca** i da prelijevanja nema do **1,9×**.
2. **Phone-osnovica** je **poznat nalaz brojala kao nov**, jer joj je izmjerena brojka bila
   **u imenu kante**.
3. **Landing je na 320 px prolazio sa zalihom od 21 px = 3,7 % ekrana.**
   *Tvrdnja koja prolazi s 3,7 % rezerve ne mjeri ispravnost nego sreću.*

**Iz toga dvije trajne obveze:**

- **CI je jedini sudac za mjere ovisne o crtaču** (širine, prelomi, odrezanost). Zeleno na
  Windowsu nije dokaz.
- **Nova tvrdnja o rasporedu traži sondu sa širim slovima** prije nego se proglasi gotovom —
  inače mjeri font razvojnog stroja, ne pravilo.

**Kako se čitaju padovi u CI-ju.** Playwright ondje vrti `github` reporter (uključen samo uz
`process.env.CI`), pa padovi izlaze kao **anotacije**. Bez toga se ime palog testa dobiva samo
iz artefakta od **87 MB** koji traži prijavu — a svaki pokušaj košta rundu od **~18 min**.
⚠️ **GitHubov javni API ima 60 zahtjeva/h** — ne provjeravati CI u petlji, inače ostaneš bez
očitanja baš kad ti treba.

⚠️ **OTKAZAN ≠ PAO.** Run može završiti kao `cancelled` a da nijedan test nije pao — to je
**istek `timeout-minutes`**. Razlikuju se po tome što otkazani run **nema anotaciju s nazivom
testa**, samo korak `-> cancelled`. Izmjereno 2026-08-31: job „Lint + verify + tests" rastao je
**16.8 → 18.1 → 18.4 → 20.3 min** dok je granica stajala na 20, pa je posljednji otkazan uz
**1.9 min** margine na prethodnom zelenom runu. *Timeout je zaštita od visećeg procesa, ne budžet
izvedbe* — kad postane ovo drugo, prestaje razlikovati kvar od sporog stroja. Granica je podignuta
na 30; **sljedeći put nije novo podizanje broja** nego `workers` (danas 1, radi determinizma) ili
sharding: 533 testa u jednom procesu je uzrok, a ne simptom.
**Izvedeno u MREŽA B6 (2026-09-01):** Playwright je zaseban matrix-job s **2 sharda**
(`workers: 1` unutar svakog = determinizam netaknut; `needs: build` = fail-fast ostaje). Prvi
run: build **0.4 min** · shardovi **11.2 / 10.0 min** — stari job je bio 97 % Playwright.
Rast suite se apsorbira **novim shardom** u matrici, nikad većim timeoutom.

## ⚠️ ZELENO NA TUĐEM STABLU (2026-09-16, F3/1)

Playwright ima `reuseExistingServer: true`, a na računalu stoji **više radnih stabala** (`.dev`,
`.f21`, `.f3`…). Poslužitelj koji je dan ranije pokrenulo drugo stablo ostao je živ na 5050, i
Playwright ga je **tiho preuzeo**: u sesiji F3/1 su prijavljeni rezultati **13/13 i 24/24
mjerili TUĐE datoteke**. Otkrilo se tek kad je novi test tražio element koji postoji samo u
ovom stablu. *`reuseExistingServer` provjerava ODGOVARA LI adresa, ne ČIJE datoteke daje.*

**Brana:** `scripts/static-server.js` šalje `X-Sokrat-Root`, a `tests/global-setup.js` prije
ijednog testa odbije poslužitelj drugog stabla (i stari bez zaglavlja) porukom koja imenuje oba
stabla. Čuva je `tests/unit/test-server-root.test.js` (pravi poslužitelji, obrnuto crveno).
**Kad padne:** ugasi taj poslužitelj ili vrti na drugom portu — `SOKRAT_TEST_PORT=5051 npx
playwright test …`. ⚠️ `test:authed` traži 5050 (`tests/.auth/admin.json` je spremljen za tu adresu).

## ⚠️ BRISES LI ELEMENT SUCELJA, NE TRAZI NJEGOVO IME (2026-09-08, F2/0)

Obrisan je CTA `#topbarStart` / `.topbar-cta` iz trake. Prije koda je potrazeno tko ga
spominje — `grep -rn 'topbarStart\|topbar-cta'` — i naden je **jedan** spec. Pokrenut je taj
spec i jos nekoliko po dojmu: **43 prosla, 0 palo.** Tvrdnja je bila istinita i beskorisna.

**CI je zatim oborio OBA sharda** na `tests/materials-entry.spec.js`, koji taj gumb gada kao
`.topbar .start-trigger`, a susjednu odluku kao `.topbar [data-goto-materials]`. **Nijedno od
toga nije sadrzavalo ime elementa**, pa ga pretraga nije mogla vidjeti — a lokalni izbor
testova bio je izveden iz te iste slijepe pretrage. Zeleno lokalno nije bilo lazno; bilo je
**odgovor na krivo pitanje**.

**Pravilo:** element sucelja se ne trazi po imenu nego po **svemu cime se moze pogoditi** —
id, klasa, atribut, uloga, tekst — a zatim se vrte **svi testovi koji spominju tu povrsinu**:

```bash
grep -rln 'topbar' tests/          # 9 datoteka, ne 2
npx playwright test $(grep -rln 'topbar' tests/*.spec.js | tr '
' ' ')
```

Isto vrijedi obrnuto: ako brana tvrdi da neceg NEMA (`toBe(0)`), ona **kodira odluku**, ne
svojstvo. Kad se odluka okrene, takva se brana ne brise nego **okrece** — i to je prilika da
postane stroza (`toBe(0)` → `toBe(1)`, jer „tocno jedan" cuva i od dvostrukog ulaza).

---

## ⚠️ ZELENA BRANA NIJE DOKAZ AKO NE GLEDA (2026-08-31, C5b/0)

Prethodno poglavlje govori o brani koja **promijeni ishod** bez promjene u proizvodu. Ovo je
druga vrsta kvara: brana koja **nikad nije ni pogledala** ono što tvrdi da čuva. Prošla je
neprimijećeno dok 11 boja teksta nije bilo **nevidljivo na zadanoj temi** (jantar **1.67** na
bijelom), a sve tri brane koje bi to trebale hvatati bile su zelene — svaka iz svog razloga:

| brana | što je mjerila | zašto nije mogla vidjeti |
|---|---|---|
| `check:palette` | boju uz **pozadinu u istom pravilu** | tekst bez vlastite pozadine nasljeđuje plohu → nema što upariti. **Slijepa točka joj je najčešći slučaj koji postoji.** |
| `check:contrast` | **vrijednosti** tokena u `tokens.css` | ne zna KORISTI li ih itko; pravila su čitala zakucani hex |
| `check:contrast:live` | stvarni ekran | obilazila je **samo `te2`**, koji nema ni `exercises` ni `blind-map` |

**Tri trajna pravila iz toga:**

- **Brana koja mjeri DEFINICIJU ne dokazuje UPOTREBU.** Token koji prolazi AA ne znači da ga
  ijedno pravilo koristi. Ako je tvrdnja „ovo je čitljivo na ekranu", mjeri se ekran.
- **Brana koja obilazi rute dokazuje samo rute koje je obišla.** Uvjetne površine (`exercises`,
  `blind-map`) ne postoje na svakom predmetu; ruta na krivom predmetu mjeri **prazan ekran** i
  mirno javlja nulu. Isto vrijedi za `css:diff`. *Nula na ekranu kojeg nema nije dokaz.*
- **Prije nego novu tvrdnju proglasiš pokrivenom, vrati stari kvar i vidi pada li.** Za
  `tests/learn-blocks-contrast.spec.js` je to napravljeno: stare vrijednosti nametnute preko
  tokena obore **16 od 32** mjerenja, i to točno na dvije svijetle teme. *Test koji ne bi pao ni
  da je tvrdnja lažna nije test nego ukras.*
- **Pravilo iza njuškanja motora je nemjerljivo; pravilo po sposobnosti nije** (F1/10, BUG-043).
  `@supports (-webkit-touch-callout: none)` je godinu dana „štitilo" polja od iOS-zooma, a
  `CSS.supports` je false u SVAKOM motoru kojim mjerimo — nijedna brana ga nije mogla vidjeti.
  `@media (pointer: coarse)` je istina i u emulaciji. Isto lice: **brana koja emulira telefon bez
  `hasTouch` mjeri uređaj koji ne postoji** — `phone.authed.spec.js` je do F1/10 imao miš.
- **Sonda koja mjeri ODSUTNOST prvo dokaže PRISUTNOST** (F1/8 ②). `hover-probe --profil=prelaz` prije
  svakog prelaska provjeri da kartica pod mišem uopće ima hover-izgled (kontrola), pa tek onda tvrdi da
  nova kartica poslije klika nema — i da se hover vrati pomakom od 1 px. „Ništa ne svijetli" i „hover ne
  radi" daju isti ekran; bez kontrole i povratka sonda bi prošla i s obrisanim hoverom. Isti razred:
  popravak koji gađa `navigateTo` promašio bi browse-prelaze — sonda mjeri Leonov scenarij, ne ruter.

⚠️ **Posebno za `learn-blocks.css`:** javni katalog od te datoteke iscrtava **2 od 44 pravila**
(`.lb-legacy`, `.lb-table-wrap`) jer je gradivo v1 HTML kroz DOMPurify. Ostalo živi u editoru i
u korisnikovim materijalima. Zato se ta datoteka **ne dokazuje kataloškom rutom** nego crtanjem
kroz `window.renderBlocks` — globalno dostupan i bez prijave (v. i `learn-parity.spec.js`).


## ⚠️ POUKA ZAPISANA U HELPERU ČUVA SAMO ONE KOJI HELPER ZOVU (2026-08-31, BUG-042)

Prethodna dva poglavlja govore o brani koja mjeri **krivu stvar** i o brani koja **ne gleda**.
Ovo je treća vrsta: brana koja gleda ispravno, ima popravak zapisan **u sebi** — a jedan njezin
pozivatelj ide mimo nje.

**Što se dogodilo.** CI je oborio `tests/a11y.spec.js:70` s tri `serious` color-contrast nalaza
na kolačić-traci: **4.05 / 3.54 / 4.05**. Isti tokeni na punoj neprozirnosti daju
**6.35 / 5.67 / 6.35**. Uzrok: `.cookie-banner` ulazi fade-inom, a **axe-core u boju uračunava
neprozirnost predaka** — na sporom runneru ju je uhvatio na 78 % i izmjerio izmiješanu boju.
`tests/helpers/axe-gate.js` tu pouku nosi **zapisanu dvaput** (2026-08-13, 2026-08-15) i rješava
je funkcijom `smiri()`. Ali taj je spec uvozio **samo `gateViolations`** i skenirao izravno.

**Četiri pravila iz toga:**

- **Kad popravak glasi „radi to ovako", uz njega ide brana koja provjerava da se tako i radi.**
  Inače je popravak bilješka (ADR-027). Ovdje je to `tests/unit/axe-gate-usage.test.js`: čita
  **s diska** svaki `tests/a11y*.spec.js` i traži da nijedan ne skenira mimo helpera. Popis se
  ne nabraja rukom — nabrojan popis ne pokriva spec koji tek nastane.
- **Mjerač koji ne uspije stabilizirati ekran mora PASTI, ne izmjeriti ga takvog.** `smiri()` je
  do sada tiho nastavljao; sad baca iznimku s **imenom** animacije koja se još vrti. Isti zahtjev
  koji faza već postavlja `css:diff`-u i `check:contrast:live`-u.
- **Prozirnost se prepoznaje po ARITMETICI, ne po dojmu.** Ako svi kanali daju **istu alfu**
  (ovdje 0.780–0.787 na šest kanala), boja nije kriva nego prozirnost. Prije nego dirneš paletu,
  izračunaj alfu — dvaput je to spasilo od „popravljanja" tokena koji je ispravan.
- **Zeleno lokalno može biti sreća, a ne dokaz.** Prozor kvara bio je uzak s obje strane: pri
  `opacity: 0` axe element **preskoči**, a na 0.83 (lokalna vrijednost) omjer već prelazi prag.
  Zato: nakon popravka **rastegni uvjet** koji je kvar izazvao (fade-in 0.28 s → 30 s) i traži da
  test i dalje prolazi. Zeleno pod normalnim uvjetima ne razlikuje popravljeno od sretnog.


## Smoke test (uvijek, ~2 min)
- [ ] Stranica se učita bez greške u konzoli (F12 → Console).
- [ ] Landing → "Start Studying" otvara **drill-down browse** (Fakultet→Smjer→Godina→Predmet).
- [ ] Showcase predmeta na landingu: klik na predmet otvara njegove lekcije.
- [ ] Otvori jedan predmet → lekcija → Home sekcija se prikaže.
- [ ] Prebaci kroz: Learn, Flashcards, Quiz, Fill, Progress — svaka se otvori.

## Po predmetu (nakon izmjene catalog-a / sadržaja)
Za **svaki** pogođeni predmet:
- [ ] Predmet se pojavljuje u sidebaru ( ispravan naziv, ikona, boja).
- [ ] Sve lekcije se prikazuju; "coming soon" lekcije se ponašaju kako treba.
- [ ] **Learn:** sve kategorije prikazane, slike se otvaraju u modalu.
- [ ] **Flashcards:** okreću se, Know/Don't Know broji, navigacija radi.
- [ ] **Quiz:** start radi, opcije se prikažu, točno/netočno se boji, rezultat na kraju.
- [ ] **Fill:** praznina prikazana, provjera odgovora radi, hint radi.
- [ ] **Exercises** (ako `features.exercises`): tab se prikaže, vježbe grupirane po poglavlju, Check ocijeni; za `cite` upišeš citat → točno/netočno + prikaže se točan odgovor.
- [ ] **Progress:** brojevi i trake se ažuriraju nakon aktivnosti.
- [ ] (Geografija) **Blind Map** se prikaže i prima klikove.

## Regresija nakon refaktora (A2–A5)
- [ ] Svi predmeti rade **identično** kao prije refaktora.
- [ ] Napredak spremljen prije refaktora i dalje se učita (storageKey nepromijenjen).
- [ ] Nema novih grešaka u konzoli.

## Performanse (nakon lazy loadinga, A4)
- [ ] Prvo učitavanje ne povlači sve `data-*.js` (provjeri Network tab).
- [ ] Sadržaj predmeta se učita tek na otvaranje, bez vidljivog zastoja.

## Mobitel / responzivnost
- [ ] Testirano na uskom ekranu (DevTools ~375px): donja navigacija radi.
- [ ] Nema horizontalnog scrolla; tekst čitljiv.

## Nakon deploya
- [ ] Otvori live (sokratstudy.com), ponovi Smoke test.
- [ ] Hard refresh (Ctrl+F5) — provjeri da nova verzija fajlova dolazi (cache busting `?v=`).
