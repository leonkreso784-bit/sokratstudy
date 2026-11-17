# Progress Log

Dnevnik rada. Najnoviji unos na vrhu. Svaka sesija: što je napravljeno, što je
testirano, što slijedi.

---

## 2026-11-16 (OPUS, stablo `sokratstudy.pravri`, grana `feat/pravri`) — drugi fakultet: PFRI, 1. godina

**Izvori:** bilješke, skripte i ispitna pitanja studenata 2011.–2022. (Drive) + službeni izvedbeni planovi 2025./26.;
sve u `_materials/pravri/` (gitignored), plan izrade po fazama u `_materials/pravri/PLAN.md`. Imena vlasnika gradiva,
profesora i studenata nigdje u repou (`check:names`).
**Tijek:** prvi dan je 7+ agenata odjednom dvaput potrošilo 5-satni limit → plan „sporo, jedan predmet za drugim":
najviše 2 agenta (1 Opus), letvica `qa.js` → strukturna → činjenična recenzija (Opus) → ispravci → ponovna provjera.
Generatori i registri id-eva su u `_materials/pravri/tools/`; **id-evi stavki trajni** (ispravci preimenuju ključ, ne id).
**Commitovi:** `aa8657b` Politička ekonomija · `5cfbff9` (+`627080d`, `d248a8c`) Povijest prava · `e86494e` Ustavno ·
`21ee486` Sociologija · `a4da341` Rimsko · `90c632a` Teorija · `17734d4` odgovori dopuna bez završne točke (bodovanje
točku ne skida). Katalog: 15 nedovršenih predmeta izvađeno (ADR-042), naslovnica 50 → 56.
**Usput:** `legacy-html coverage` je padao na grani — `<ol start>`/`<ol type>` u Ustavnom pravu (renderer ih ionako
odbacuje; uklonjeni iz podataka, prikaz isti). Test „every faculty … reachable" (`e202038`) **nikad nije prošao**:
nakon prvog fakulteta `goto('/')` vraća na zapamćeni predmet (`sokrat-last-position`), pa vrata naslovnice nisu
vidljiva → test sad briše tu poziciju između fakulteta (4/4 zeleno; prije 0/4).
**Pouka:** „ispravljanje prekinuto limitom" (Teorija) značilo je **ništa spremljeno** — generator je bio bajt-identičan
podacima. Prije nastavka prekinutog posla prvo izmjeri što je stvarno napravljeno.
**Slijedi:** Faza 2 do kraja (preflight, push grane, CI, preview) → **Leonov OK** → `main` + `migrate-content.js`.

## 2026-11-14/15 (OPUS, stablo `sokratstudy.mor`, grana `feat/mor`) — novi HR program MOR (Menadžment održivog razvoja)

**Izvori:** kolegica s MOR smjera dala je pristup Merlinu (Leon se prijavio u pregledniku; ja sam samo čitao i preuzimao
nastavne materijale — bez bodova, rokova i popisa studenata) + dvije datoteke s WhatsAppa (skripta EKO K1, ispitna pitanja MK).
Kurikulum iz službenog popisa predmeta 2026/27 (fthm.uniri.hr), uspoređen s PETU/MUH po nositelju. Sve u `_materials/mor/`
(gitignored), tekst izvađen uz original. **Ime kolegice nigdje u repou** (`check:names`).
**Odluke (anketa):** zajednički kolegiji = kopije `-mor` (placement odbačen); Merlin 2025/26 za dva nova 1. god predmeta.
**Platforma:** `js/i18n.js` je HR sučelje predlagao samo za MUH id → jezik sad nosi `lang` programa (brana
`program-lang.test.js`, pada na starom kodu). Boja MK je prvo pala `check:contrast` (23° od indiga znaka) → rose.
**Gradnja:** 5 Opus graditelja (zajednički brief) → `content-review` po predmetu → ispravke istom graditelju. Kad je Opus
5-satni limit prekinuo POG graditelja i TTS recenzenta, ispravke POG/URB napravio sam (alat koji mijenja po id-u, round-trip
bajt-identičan), TTS recenzija ponovljena na Sonnetu. **Id-evi stavki su trajni** — dodano u brief nakon što je EKO graditelj
pri ispravku regenerirao sve id-eve (bezopasno jer još nije bio commitan).
**Commitovi:** `f6c4b97` program + 9 kopija · `65d07ab` EKO · `59c4b69` MK · `fc43af1` URB · `512a99a` POG · `dd595dc` TTS.
**Nalaz za sve predmete:** točan odgovor je često najdulja opcija (43–56 %) → BUG-054 (otvoren). Zakucan jezik programa → BUG-053 (riješen). Odluka → ADR-041.
**Deploy (15.11., Leonov OK):** CI na grani je prvo pao — ne zbog koda: `ubuntu-latest` je od 19.10. Ubuntu 26.04 i
Playwright ondje ne instalira Chromium (log, ne anotacije). Runner pinan na `ubuntu-24.04` (`d8930c0`, `docs/workflow/TESTING.md`
§CI/CD) → CI zelen (svi jobovi) → fast-forward `main` `51a90a9..d8930c0` → Vercel READY → `diff:db` (svih 14 nemigrirano) →
`migrate-content.js` (40 redova) → `diff:db` 0 razlika → živi Chromium: 40/40 lekcija, sučelje `hr`, 0 JS grešaka.
Node na Windowsu pri izlasku ispisuje `Assertion failed … async.c` i kad je upis uspio — sudi `diff:db`, ne ispis.
**Dokumentacija (16.11.):** ADR-041, BUG-053/054, `CATALOG_ARCHITECTURE` status, `CONTENT_INTAKE` §Tok s agentima,
`TESTING` §CI pin, `CLAUDE.md` (i18n + stanje sadržaja). Prompt za novu sesiju (novi fakultet s Drivea) dan Leonu u chatu.
**Sljedeće:** K2 za EKO/MK/URB kad profesori objave; sem IV od veljače; slijepa karta za POG; BUG-054.

## 2026-11-04 (OPUS, stablo `sokratstudy.y3`, grana `feat/y3-pf-qm`) — 3. godina HM: Public Finance + Quality Management (Midterm 1)

Leon je za kolokvije (PF 9.11., QM 10.11.) dao izgraditi Sokrat materijale kroz MCP konektor — koji je **samo na stagingu**.
Traženo: nova grana s tim sadržajem kao katalog-predmetima pod „3. godina · 1. semestar". Payload oba materijala pročitan iz
staging `node_content` (REST, samo čitanje) → `data/public-finance/midterm-1.js` i `data/quality-management/midterm-1.js`
(MCP polja `card`/id maknuta, novi 6-znakovni id-jevi, learn ostaje v2 blokovi). Katalog **36** (fallback u `index.html` 34→36).
**Provjere:** `validate:content` 0 grešaka (sve kartice ≤200 znak.), `validate:schema` 0, `export:json` round-trip, `verify` 0, bump, preflight.
`schemaVersion: 2` NIJE dodan — `validate-content` ga još čita kao kategoriju. PROD baza netaknuta (Leon: ne).
