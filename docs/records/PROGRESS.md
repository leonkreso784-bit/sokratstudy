# Progress Log

Dnevnik rada. Najnoviji unos na vrhu. Svaka sesija: što je napravljeno, što je
testirano, što slijedi.

---

## 2026-11-27 (OPUS, stablo `sokratstudy.pravri`) — PFRI 1. godina izmjerena protiv službenog silabusa; lokalno stanje izvan gita obnovljeno

**Povod (Leon):** nastavak PFRI-ja, pa „ja bi završio cijelu prvu godinu" i „pretražiti po cijelom internetu
možemo li naći još materijala s prve godine".
**Nalaz o 1. godini:** nema više običnih predmeta — šest obveznih kolegija je izgrađeno i živo, a na Driveu od
1. godine ostaju samo Engleski 1/2 i Seminar. Novog **studentskog** gradiva nema ni javno (indeksirano je tuđe —
Split/Zagreb, ili iz 2008., ili piratske kopije udžbenika).
**Što je nađeno umjesto toga:** službeni **izvedbeni plan kolegija 2026./2027.** (`IPK_2026_pravo.pdf`, 434 str.,
**73 kolegija**) i „Opis svih kolegija" — po kolegiju: ishodi, sadržaj po tematskim cjelinama, granica međuispita,
propisana literatura s rasponom stranica. Oboje u `_materials/pravri/sluzbeno/` (gitignored), strojno čitljivo.
⚠️ Sadrži imena i mailove nositelja → ne ulazi u repo. Time **7 predmeta 3./4. godine bez ikakvog gradiva dobiva izvor**.
**Provjera opsega (novi alat `_materials/pravri/tools/`):** 388 teza iz silabusa × podaci šest predmeta →
**375 pokriveno**, a svih 13 nepokrivenih je provjereno grepom i teme SU u podacima (neoapsolutizam 14 pojava,
iudex 21, diobe prava 29, izvori spoznaje 37) → **sadržajnih praznina 1. godina nema**.
**Lažna uzbuna i njezina cijena:** mjera je prvo prijavila prazninu „političke stranke i glasovanje" u Sociologiji i
ja sam je zapisao u docs i CHANGELOG kao stvarnu. Pala je kad sam otvorio izvor: skripta ima odjeljak „51. POLITIČKE
STRANKE I GLASANJE U ZEMLJAMA ZAPADA", a podaci ga nose s 7 kartica, 12 kviz pitanja i 4 dopune — silabus piše
„glasovanje", podaci po izvoru (Giddens u hrv. prijevodu) „glasanje", a 5-znakovni korijen se razilazi na 5. slovu.
**Pokušaj popravka 4-znakovnim rezervnim korijenom razbio je mjeru** (kontrola na tuđem predmetu pala s 37–62 % na
10–45 %) → vraćeno na strogo, a varijanta **imenovana** u `VARIJANTE`, kao osnovice drugih brana.
**Pouka:** nalaz mjerača nije nalaz dok se ne otvori izvor; ja sam ga upisao u dokumentaciju prije toga.
**Pouka (mjerač):** prva verzija mjere tražila je pojmove bilo gdje u predmetu i vratila „0 % nepokriveno" za svih
šest — **obrnuta provjera ju je oborila** (silabus Teorije „prošao" na podacima Rimskog prava, 14 % nepokriveno).
Prepisana: teza mora stati u JEDNU stavku, gledaju se samo razlikovni pojmovi → kontrola odvaja 0–8 % (vlastiti)
od 37–62 % (tuđi).
**Lokalno stanje izvan gita NE POSTOJI na ovom stroju** (PFRI posao 16.–17.11. rađen je na drugom): nema
`_materials/pravri/` (izvori, `PLAN.md`, generatori `gen-kpp`, registri id-eva, brana `qa.js`), nema
`.imena-zabrana.txt`, memorija projekta je bila prazna. Posljedica: `check:names` i `check:docs` pali su zatvoreno
→ push na `main` blokiran. **Riješeno:** popis 21 PFRI predmeta vraćen iz gita (`0f56bfa2` + `169a0ceb`, `e596f5a5`
ih je izvadio) · memorija napunjena (4 zapisa) · `.imena-zabrana.txt` sastavljen iz mailova i imena nositelja u IPK-u
+ vlasnika gradiva (**119 stavki**, Leon: *„nemam ništa od toga"*). Brana je odmah uhvatila **četiri lažna sudara** —
prezime koje je ujedno dio naziva države, prezime ekonomista iz 19. st. i dva citirana autora udžbenika →
upisani **s kontekstom** (uz titulu), kako brana i nalaže. Konačno: 119 imena, 814 datoteka, 0 nalaza.
**Brana veličine:** prag za `windows-git-bash-zamke.md` izbačen iz tablice (Leonova odluka) — memorija je po stroju,
a ta je vezana na Windows; gdje postoji, pada pod `OSTALE_MEMORIJE`. Test prilagođen, a broj dotaknutih datoteka se
sad **izvodi iz tablice** (zakucana 6 je pala, mjera je bila ispravna).
**Deploy (u toku):** merge `origin/main` u granu — sukobi samo dnevnici, od rotacije studenog; `main` nije imao
PROGRESS-sesiju od 17.11. ni napomenu o `18610cc`, oboje vraćeno ručno. `export:json --check` round-trip čist ·
**bump `20261127121859`** (dva sadržajna commita mijenjala `data/**` bez bumpa) · `test:unit` 68/68 · **preflight zelen** ·
grana pushana, CI vrti. Čeka Leonov OK za `main`.
**Nastavak iste sesije — brana i izvori za 2. godinu:**
**🚩 Nova brana `check:kviz`** (`scripts/check-kvaliteta-kviza.js`, u preflightu) — vraća strojni korak letvice
ADR-042 koji je živio u `_materials/pravri/qa.js` i izgubljen je. TVRDO: odgovor dopune ne završava **rečeničnom**
točkom (skratice izuzete — prva verzija je sedam latinskih skratica u `academic-writing` prijavila kao kvar, a nisu;
puki broj „1689." JEST kvar). ČEGRTALJKA (`scripts/kviz-baseline.json`): dopuna koja odaje odgovor (**zatečeno 95
od 6 342**, po cijelom katalogu — te2, accounting, traffic, marketing, ne samo PFRI) i BUG-054 najdulja točna opcija
(**4 262 od 13 231 = 32,2 %**, slučajno ≈ 25 %); nov predmet mora imati nulu. **Obrnuta kontrola:** na podacima prije
`09066b57` brana nalazi **svih 6** kvarova koje je taj commit ispravio, na današnjima nula.
**🚩 `npm run pravri:izvori`** — što imamo a što fali od gradiva, izvedeno iz izvedbenog plana 2026./2027.
(propisana literatura, semestar, status), manifesta dijeljene mape na Driveu i kataloga. **Ishod za 21 predmet: 9
gotovo · 2 imaju skriptu · 3 samo ispitne materijale · 7 NEMA NIŠTA** (sva 3. i 4. godina osim Europskog prava II;
u dijeljenoj mapi 3. i 4. godina ne postoje). Skripta je u `scripts/`, podaci u `_materials/` — jer nose imena.
**Izvori za `civil-obligations-pfri` (2/2, sljedeći predmet):** granica međuispita je iz izvedbenog plana točna
(Klarić/Vedriš 3–182, 377–491, 557–566 + Slakoper 218–240 zastara; završni = pojedini ugovori + izvanugovorne +
čl. 1130.–1162.). **Klarić/Vedriša NEMA**, a tri PDF-a s Drivea su korekturni primjerci i staju na str. 141 / 87 / 81
(„opći dio" ne doseže propisanih 218–240; „Posebni dio I" pokriva praktički samo kupoprodaju). Leonova odluka: graditi
iz **ZOO-a sa zakon.hr** (pročišćen do NN 69/26, na snazi 7.7.2026., skinut cijel: 644 k znakova, 1 186 članaka) +
korekturni primjerci + **90 ispitnih kartica** (334 k znakova) i tri kolokvija. Plan: 16 kategorija međuispita + 13
završnog, potvrđen. **Gradnja NIJE započeta.**
**Pouka o imenima:** brana `check:names` uhvatila je **moj vlastiti zapis** — u PROGRESS sam naveo primjer ispravka
s punim prezimenom. Primjer je prepisan bez imena.

**Slijedi:** gradnja `civil-obligations-pfri` po potvrđenom planu (međuispit prvo), pa Kazneno → Međunarodno →
Obiteljsko. Na grani čekaju 2 commita za `main` (`check:kviz`, `pravri:izvori`) — traže CI i Leonov OK.

## 2026-11-17 (OPUS, `sokratstudy.f6`) — priprema K/10: main u granu, kvar se zapisuje

- **Stanje (izmjereno, samo čitanje):** PROD nema ništa od F6 (uloga `mcp_klijent`, `node_drafts`, hook, `pg_jsonschema`,
  funkcija `mcp`); N10 je na PROD-u zelen (`ON DELETE SET NULL`). Staging `mcp` = v24 (upute 0.5.8).
- **Nalaz K/9:** konektor u Leonovom Claudeu („sokrat test prazan") je spojen na **test-admin** (`auth.oauth_consents`
  16.10.) — K/9 na ne-admin računu tek treba izvesti. Leon (anketa 17.11.): K/9 vodi on u Claude.ai.
- **Nalaz kvar:** `procitaj_materijale` → „kvar"; edge log: PostgREST **401** na `mcp_veza` pri dva usporedna poziva,
  isti token odmah zatim 200; postgres log bez greške (vjerojatno PostgREST pri provjeri tokena — nepotvrđeno). Log
  funkcije je bio PRAZAN → popravak `0.5.9`: redak `mcp_kvar` (alat · izvor · kod), bez poruke/tokena. Unit 99/0;
  obrnuto: stari kod 4 pada; oslabljen `pozovi` 12 padova.
- **Merge `origin/main`** (PFRI, MOR, CI pin): sukobi = tokeni + dnevnici; granin BUG-053 → **BUG-055**. Preflight zelen.
- **Suha provjera PROD materijala kroz strogi profil** (15 živih): 2 prolaze; kartica od ~1 800 znakova pada (poznato);
  **12 PRAZNIH (`{}`) pada na `minProperties: 1`** — shema se provodi samo pri upisu (`publish_node`), pa SQL prolazi i
  prazni ostaju; ALI Studio dopušta obrisati jedinu sekciju (`studio.js` delSection) → spremanje praznog materijala bi
  poslije F6 bilo odbijeno (izmjereno: korisnik bi vidio sirovo „sadrzaj_neispravan: {} has less than 1 property").
  **Leon „b" (17.11.):** Studio ne ostavlja materijal bez sekcija — zadnja sekcija nosi `aria-disabled` + objašnjenje,
  klik kaže zašto; „Objavi" bez sekcija odbija prije baze (isto pravilo kao AI-jev `alat_zadnja_lekcija`). Brana:
  `f4-e2e.authed.spec.js` „ZADNJA sekcija" — crvena na starom kodu; svaki od dva čuvara maknut zasebno → pad.
- **Poslije Leonova deploya (v25) i SQL-a:** `check:sql-tijela` 29 ISTO · `mcp:probe` 9/0 · `mcp:alati` 92/0 ·
  `ugc:sadrzaj` 829/0 · `mcp:brava` 4 pada → **Auth v2.198.0 (oba projekta) odbija svaki OAuth-token na `/user`**
  (auth log: „OAuth client access tokens are not allowed"; obična sesija i dalje 200) → očekivanja zatvorena, 58/0.
- **K/9 (Claude.ai, Opus 5.5, ne-admin `test-prazan`, veza `ae00646f` potvrđena u `oauth_consents`; vodio Claude kroz
  Leonov preglednik uz njegovo dopuštenje):** **S1 ✅** prazan račun — „nemaš nijednu policu", ništa izmišljeno, pita
  policu i opseg · **S3 ✅** zlonamjeran izvor — upute iz teksta ignorirane i imenovane korisniku; baza: polica
  „Biologija" + „Fotosinteza", 0× `<script>`/`onerror`/`napadac`, 0 polica „hakirano"; materijal se otvara · **S4 ✅**
  tuđi id (`test-b`) = „nema materijala s tim ID-em", ništa tuđe · **S5 ✅** prekid usred gradnje (l1–l2 cijele, l3 samo
  Learn) → novi chat + isti PDF → čita nacrte, nastavlja ISTI nacrt `ff50e2f7` od l3 · **S2 ✅** pravi PDF (FAN 4,
  6 lekcija, pitao policu/opseg/jezik izvora) → predano na „Food and Nutrition" (6 lekcija, 6 boja, 90 kartica,
  84 kviza, 22 dopune), nacrt nestao, `review_url` se otvara · **S6 ✅** Profil → Prekini vezu → novi chat → baza baca
  `nacrt_veza_prekinuta` 40 s poslije (propusnica još vrijedila) → model: „veza sa Sokratom je prekinuta… ako ga
  ponovno spojiš, izlistat ću ti sve" (doslovno u MCP_TESTING §5). Ponovno spojeno: novi DCR klijent `008f5887`.
  **Izmjena postojećeg materijala nije izvedena.** Usput: kartica kategorije piše „5 terms" u HR sučelju (F5).
- **K/10 postupak napisan** (MCP_TESTING §7): redoslijed je **SQL → `main` → funkcije → OAuth/hook**, ne „SQL → OAuth →
  funkcija" — AI-token ne smije postojati prije `token-guard`a na PROD-u, a `deploy-function.js` odbija PROD-deploy
  koji se razlikuje od `origin/main`. PROD (čitanje): `pg_jsonschema` 0.3.3 dostupan, od F6 ništa. **Čeka Leonov OK.**
- **K/10 izveden (Leonov OK, 17.11.)** — koraci ①–⑤ na produkciji (CHANGELOG). Pouke: `apply_migration` s DROP-ovima
  zna biti odbijen → SQL Editor uz Leonovu riječ, sa `setEOL(LF)` da tijela ostanu md5-ista · `git checkout --ours`
  uzima CIJELU datoteku i briše čiste izmjene s `main`-a (pao `verify` na broju predmeta) → `merge -X ours` · hook se
  uključuje PRIJE OAuth-a, inače AI-token kratko nosi punu ulogu `authenticated`. Ostaje ⑥ i kartica od 1 819 znakova.

## 2026-11-17 (OPUS, stablo `sokratstudy.pravri`) — PFRI: Kazneno postupovno + Europsko pravo II, 🚀 s Europskim pravom I na produkciji

**Rad po agentima** (najviše 2 odjednom, 1 Opus; kontekst agenata štedljiv — veliki predmeti rezani na dijelove).
**Kazneno postupovno:** recenzije A + B1 + B2 (Opus, ZKP do NN 13/26) + strukturni pregled → ispravci u tri dijela
**izravno u podacima** (generator `gen-kpp` je jednokratan s nasumičnim id-evima — ponovno pokretanje promijenilo bi svih
3 218 id-eva) alatom `_materials/pravri/tools/gen-kpp/kpp-edit.js` → ponovna strukturna i činjenična provjera → SPREMNO.
Dokaz id-eva (`ids-check.js` protiv snimke): 6 373 / 0 nestalo / 0 pomaknuto / 80 novih.
**Europsko pravo II** (od nule): skenirani izvor (Nepoštene ugovorne odredbe, 46 slajdova) i 19 slikovnih stranica
prepisani ručno; graditelj M1 pa M2 (Sonnet) → strukturna + činjenična R1/R2 (Opus) → ispravci → R3 → R4 → SPREMNO.
Glavni nalaz: ZZP izmijenjen NN 59/26 (točke čl. 4. prenumerirane, novi čl. 81.a) — graditelj ga je previdio.
**Pouke:** (1) ispravak distraktora brisanjem ili izjednačavanjem oblika dvaput je od distraktora napravio **istinitu**
tvrdnju (21q004, 04q002) — svaki dirani distraktor ide na ponovnu činjeničnu provjeru; (2) izjednačavanje oblika
prekorigira („ističe se" → uvijek distraktor), mjeriti u oba smjera; (3) graditelj je **premjestio** stavku među
kategorijama → 14 pomaknutih id-eva; vraćeno, a sadržaj dobio novi id.
**Telefon** (CPU 4×, preview): Kazneno postupovno prvo otvaranje 3,7 s (brzi 4G) / 7,4 s (spori 4G), 948 KB; Rimsko
pravo za usporedbu 3,0 / 5,0 s. Ostale lekcije istog predmeta otvaraju se trenutno. Skraćivanje predmeta ostaje opcija.
**Deploy (Leonov OK 17.11.):** CI na grani pao na `theme-fouc` (2 testa) — izmjereno da je **postojeći flake** (na
produkcijskom `0d4c4ce` 2/90, na grani 2/108) → rerun zelen → fast-forward `main` `0d4c4ce..72c2ebc` → Vercel READY,
živi `SW_VERSION` = repo → `diff:db` (3× nemigrirano) → `migrate-content.js` → `diff:db` 0 razlika → `check:final` ✓ za
svih 9 PFRI → produkcija: 27 lekcija, 0 JS grešaka, nova tri predmeta iz baze.
**Ispravak (isti dan):** zeleni CI bio je onaj na GRANI; push-run na `main` (`72c2ebc`, pa i docs `aaa03c2`) pao je na
`responsive.spec.js` — ne mjera prelijevanja nego **fullPage snimka** Learna Europskog prava II (CI Chromium „Unable to capture
screenshot“, sva 4 iPhone profila). Snimka je prilog → `18610cc`: kad fullPage ne uspije, snima se vidljivi dio; grana zelena,
zamjena okinula samo za `eu-law-2-pfri`. Pouka: nakon deploya čekati CI **na `main`u**, ne samo na grani.
**Otvoreno:** `check:final` osnovica (13 ne-PFRI, čeka Leona) · `theme-fouc` flake (~2 %) · težina Kaznenog postupovnog · Learn Europskog prava II previsok za snimku (provjeriti visinu na telefonu).
**Slijedi:** 2. godina — Opći dio građanskog i obvezno, Kazneno, Međunarodno, Obiteljsko.

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
**Deploy (17.11., Leonov OK):** CI na grani je prvo pao na jednom testu — Learn-overflow obilazi svaki predmet u jednom
testu s fiksnih 120 s, a 6 velikih pravnih predmeta izguralo je landscape preko roka (lokalno 41 → 49 s) → rok raste s
katalogom (`0d4c4ce`) → CI zelen → preview dimni test (OIDC header, `vercel link` lokalno) → fast-forward `main`
`d8930c0..0d4c4ce` → Vercel READY → `diff:db` (6× nemigrirano) → `migrate-content.js` → `diff:db` 0 razlika →
dimni test na produkciji: 18 lekcija iz baze, 0 JS grešaka.
**Otvoreno (nije PFRI):** `check:final` pada na zastarjeloj osnovici preskočenih — 13 predmeta izvan nje (HR program
namjerno nije u bazi; 3. godina i EKO imaju jednu lekciju). Osnovicu treba odobriti, ne tiho `--update`-ati.
**Slijedi:** Faza 3 (2. godina PFRI) — Europsko pravo I prvo.

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
