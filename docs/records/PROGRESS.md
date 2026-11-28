# Progress Log

Dnevnik rada. Najnoviji unos na vrhu. Svaka sesija: što je napravljeno, što je
testirano, što slijedi.

---

## 2026-11-28 (OPUS, grana `feat/seo-adrese`) — katalog dobio prave adrese; repozitorij prestao biti javno poslužen

**Povod (Leon):** *„moramo updejtat seo same stranice i poboljšat jer se promijenilo dosta toga… treba nam dobar
plan."* Plan-mod, tri paralelna istraživanja (infrastruktura · rute · zapisane odluke), pa četiri odluke kroz pitanja.

**Nalaz koji je odredio sve ostalo.** `check:seo` je bio zelen i Lighthouse SEO 100 — a to ne znači ništa o dosegu,
jer brana mjeri **dosljednost `<head>`-a, ne pokrivenost**. Izmjereno: **5 indeksabilnih URL-ova** naspram **59
predmeta i 171 lekcije**, **nula** imena predmeta u posluženom HTML-u, **nula** stranica na hrvatskom za hrvatsku
publiku, i **nijedan spomen Search Consolea u cijelom repou** — sve dosadašnje SEO-radnje nitko nije prijavio.
Katalog je od zadnjeg dodira SEO-a (25.08.) narastao **25 → 59**, uz drugi fakultet i dva programa.

**Ovo nije bio nov nalaz nego parkirana odluka.** `BACKLOG:1098` ju je držao od 24.08. uz riječi *„arhitektonska
odluka, ne cigla — namjerno stoji ovdje umjesto u planu, da se ne izvede prije nego je odlučena"*, a `index.html`
je nosio uvjet: *„Kad predmeti dobiju prave adrese, ovdje se dodaje i `Course`."* Odluka je pala na **generator**
(64 commitane stranice), ne na seobu routera — ADR-028 i ADR-040 time ostaju netaknuti. **5 → 69 adresa.**

**Što je mjerenje ispravilo u hodu (ne pretpostavke):**
- `final` lekcija je ispisivala **sve teme dvaput** — prepoznaje se po tome da SADRŽI sve viđene, ne po tome da nema
  nijednu novu (`examPractice` je upravo nova). · Hrvatski broji u tri oblika, pa je „2 kartica" bila greška.
- Šest opisa ispalo je **162–170 znakova** jer sam brojio sirovo, a `&` u atributu zauzima pet znakova (`&amp;`).
- Izmišljene CSS klase (`.legal-cta`, `.legal-doc`) — stranica se crtala bez stilova dok ih nisam zamijenio
  postojećima iz `legal.css`. Vlastiti test je zbog toga visio dvije minute: gađao je klasu koju sam maknuo.
- `boot.js` je hrvatskoj stranici upisivao `lang="en"` (jezik SUČELJA) → `data-lang-fixed`. **Obrnuta provjera:
  bez popravka test pada s „Received: en".** Usput: tri druga unit-testa imaju svoj lažni `<html>` bez
  `hasAttribute` — puknuli su i morali dobiti potpuniji model.
- **FAQPage nije dodan**: Google je FAQ rich results ugasio potpuno **07.05.2026.** Plan ga je navodio kao „jedini
  kandidat za rich result"; provjera prije gradnje je to oborila.

**Usput, izvan SEO-a ali isti razred kvara.** Produkcija je posluživala **cijeli repozitorij** s odgovorom 200:
`CLAUDE.md`, `docs/`, `scripts/check-seo.js`, `tests/phone.spec.js`, i `design/mockups/*.html` pod naslovom
„U-UX mockupi — Leon presuđuje". Nijedna brana to nije vidjela jer **sve čitaju samo korijen repozitorija** — ista
rupa kroz koju je prošao i `check:seo`. Izvedeno točno kako je Leon propisao 30.09.: `.vercelignore` + brana koja
nabraja `.md` i tvrdi da nijedan nije u deployu. *Nepovezano nije privatno.*

**Provjereno:** `preflight` izlaz **0**, bez ijednog pada (čitan ispis, ne samo kod) · `tests/seo.spec.js` 6/6 ·
`legal.spec.js` zelen · stranica bez JS-a: 3 004 znaka, 18 tema, 8 kartica, `lang="hr"` · 703 tokena usklađena,
svih 64 generiranih stranica nosi novi (`bump` ih dotad nije dosezao — BUG-004 u podmapama) · obrnuta provjera
za **četiri** brane: `data-lang-fixed`, `build:seo --check` (nov predmet · mrtva adresa · ručna izmjena) i `*.md`.
**`check:names` je opet uhvatio ime stvarne osobe koje je ušlo kroz `main`** — i opet u retku koji govori O TOJ
BRANI. Popravljeno; brana se po dizajnu ne može vrtjeti u CI-ju jer je popis izvan gita.

**Slijedi:** Leonov pregled, pa merge i deploy uz izričit OK; poslije deploya izmjeriti 404 na `CLAUDE.md` i
`design/mockups/`. Zatim Search Console (njegov račun) i tek **iz podataka** odluka o stranicama po lekciji (171).

---

## 2026-11-27 (OPUS, `sokratstudy.dev`) — BUG-056/057: izbor kategorije nije radio ništa

- **Povod:** Leon je na produkciji primijetio da izbor lekcije/kategorije „ne pokazuje" ništa u sljedećem ekranu, uz
  sumnju da je problem u navigaciji. Reproducirano uživo na `te2/first-midterm`: klik na kategoriju → toast potvrdi →
  „Start Learning" otvori Learn s filtrom na **„All"**.
- **Korijen (izmjeren, ne pretpostavljen):** `grep -rn "nav.category" js/` → **dva pisca, nijedan čitatelj**. Nije
  pokvaren gumb nego nespojena žica; `js/app-state.js` JSDoc ju od početka zove „Aktivni filter kategorije".
- **Usput nađeno:** `#quizDifficulty` postoji samo u markupu, čita ga **0 linija** JS-a → BUG-057.
- **Paralelni rad (4 agenta):** ① kod-ready snippeti za `progress.js` ② skeniranje iste klase kvara po `js/`
  ③ uklanjanje mrtvog dropdowna (`index.html` + `i18n.js`) ④ regresijski spec. Disjunktne datoteke po agentu.
- **⚠️ Prijedlog agenta ① bio je kriv i uhvaćen provjerom:** filtrirao bi **zatečeni** špil umjesto obnove iz izvora →
  sužavanja se slažu, špil se nikad ne vrati (razred BUG-020). Ispravljeno: `primijeniKategoriju()` zove
  `initFlashcards()`/`initFill()`. Test to izričito tvrdi. **Pouka: snippet od agenta se čita, ne lijepi.**
- **Dizajn:** jedan poziv s dva mjesta (klik + kraj `initStudyPage`) umjesto filtra u svakom ulazu — zato i tab u
  traci poštuje izbor, a Quick Start gumbi ne moraju znati ništa o kategoriji.
- **Testirano:** `typecheck` ✅ · `test:unit` 68/68 ✅ · `check:i18n` ✅ (osnovica `progress.js` **4 → 3**, spuštena —
  zakucani engleski toast zamijenjen ključevima) · `check:csp` ✅.
- **Okolina:** `node_modules` je na ovom stroju bio prazan (`npm ci`), Playwright browseri nedostajali.
  **`.imena-zabrana.txt` NIJE u `sokratstudy.dev` nego u worktreeju `sokratstudy.pravri`** — dakle po KLONU, ne po
  stroju; `check:names` se dotad vrti uz `IMENA_ZABRANA=…`.
- **Push grane + provjera uživo na previewu** (Leonov OK za granu): kviz/učenje/kartice/dopune poštuju izbor, i to
  i kroz **tab**, ne samo Quick Start gumb; poništavanje vraća špil 13 → 61. Vercel ✅.
- **Leonov nalaz na previewu → druga iteracija:** *„mora biti gumb i da se sve može učit… ne može se ići na sve kao
  prije bez da se ne izlazi kompletno iz pripreme za ispit."* Bio je u pravu: toggle rješava mehaniku, ali je
  **nevidljiv**. Dodana kartica **„Sve"** kao prva i trajna, s ukupnim brojem pojmova; `active` se računa iz
  EFEKTIVNE kategorije pa zastarjeli ključ pali „Sve". Usput: zakucani engleski „All" u traci Učenja prešao na isti
  i18n ključ (`progress.js` dug **3 → 2**). Četvrti korak testa tvrdi i da korisnik **ostaje u istoj lekciji**.
- **Obrnuta provjera i za to:** bez kartice „Sve" test pada.
- **Leon „sve riješi" → skinute obje blokade preflighta + zatečeni phone-nalaz:**
  - **`check:names`** je padao jer `.imena-zabrana.txt` ne putuje među worktreejevima (gitignored, a Mac ih ima 10) —
    popis je živio samo u `.pravri`. Kopija po stablu ODBAČENA (dva popisa se raziđu → ishod sigurnosne brane ovisi o
    tome odakle je pokrenuta). Jedan kanonski primjerak u **glavnom stablu** + fallback u `check-names.js`
    (`IMENA_ZABRANA` → svoje stablo → glavno, preko `git rev-parse --git-common-dir`). Sad 119 imena, 815 datoteka, 0.
  - **`check:docs`** je tvrdo padao na `PRAG BEZ DATOTEKE memorija/windows-git-bash-zamke.md`. Redak NIJE obrisan (on
    je fixture za „imenovanu iznimku" u unit testu, a na Windowsu ta datoteka postoji) — ispravljena je
    **nedosljednost brane**: odsutna memorijska datoteka je sad napomena, kao što već jest kad nema cijele mape.
    ⚠️ Razlika se ČUVA: `docs/architecture/**` JEST u gitu → ondje ostaje tvrdi pad.
  - **BUG-058** (phone ⑥, cookie traka 1–3 px): artefakt mjerenja, ne kvar — mjerač je zaticao traku usred 280 ms
    animacije. `reducedMotion: 'reduce'` na kontekstu; nula promjena u produkcijskom CSS-u.
- **Obrnute provjere u ovoj sesiji: pet.** Posebno za BUG-058, jer popravak ide u smjeru „brana prestaje padati":
  podmetnut stvaran prekrivač od 14 px → brana pada na SVAKOM ekranu, stabilno.
- **⚠️ Dvije zamke s izlaznim kodom** (obje zamalo dale lažno zeleno): `gh run watch --exit-status` vraća **0 na
  OTKAZANOM** runu; `npx playwright test … | tail` daje izlazni kod **taila**, ne Playwrighta. Čitaj ispis, ne kod.
- **CI je pao na `d2282743` — i to BEZ ijedne pale tvrdnje** (365 prolaza): `responsive.spec.js:65` javio je
  `Protocol error (Page.captureScreenshot)`. Snimka Learna je **prilog za otklanjanje grešaka, ne tvrdnja** (test
  to i kaže), a mjera prelijevanja izmjerena je prije nje. Test je već imao `try/catch` za tu grešku, ali je pao i
  **fallback** — kad je renderer iscrpljen Learnom najvećih PFRI predmeta, ne uspije ni snimka vidljivog dijela, pa
  je dotadašnja zaštita samo pomaknula pad za jedan red. Sada neuspjeh priloga samo zabilježi.
- **Usput uklonjena vlastita suvišnost:** `initStudyPage` je špil i dopune već izgradio (`initFlashcards`/`initFill`
  sami čitaju `aktivnaKategorija()`), a `primijeniKategoriju()` ih je gradio **drugi put** — 118 nepotrebnih
  izgradnji na testu koji obiđe svih 59 predmeta u jednoj sesiji. Sada `initStudyPage` šalje
  `primijeniKategoriju(false)`; klik i dalje obnavlja, jer ondje obnova MORA biti.
- **Zatečeni phone-nalaz razlučen od vlastitog:** puni skup je javio pad `phone.spec.js` na cookie gumbima. Isti
  test pušten na **čistom `main`-u (`bdad6e9c`) pada identično, s istim pikselima** → zatečeno i vezano uz macOS
  iscrtavanje, nije iz ovog posla. Dokaz prije zaključka, ne poslije.
- **ZAVRŠNO STANJE GRANE:** 5 commita, zadnji **`4f735aa2`**, **pushana**, **CI ✅ ZELEN**, `preflight` izlaz 0,
  puni lokalni Playwright skup na `iPhone-SE-375` **205 prošlo / 0 palo** (prije popravaka 204 + 1 pad).
- ⚠️ **GRANA JE ODREZANA SA ZASTARJELOG `main`-a.** Lokalni ref je pokazivao `bdad6e9c` (od 17.11.), a produkcijski
  `main` je **`8cb95d31`** — grana je time **9 commita IZA** i 5 ispred. Prije mergea traži `git fetch` pa spajanje
  `origin/main` u granu, i ponovni preflight. **Pouka: ne mjeri protiv lokalnog `main`-a bez `fetch`-a** — isti
  razred greške kao brojka prepisana u prozu.
- **Slijedi:** **ništa od ovoga nije na produkciji.** Grana čeka Leonov izričit OK za `main`.
  **Bez pusha na `main` do tog OK-a.**

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
`Herc*` ↔ „Bosna i Hercegovina", `Menger*` ↔ ekonomist Carl Menger, `Babić*`/`Škorić*` ↔ citirani autori udžbenika →
upisani **s kontekstom** (titula + prezime, ne goli uzorak prezimena), kako brana i nalaže. Konačno: 119
imena, 814 datoteka, 0 nalaza. ⚠️ Ovaj je redak 28.11. i sam pao na brani: opisujući da zabrana traži
kontekst, ispisao je jedan takav unos doslovno. `check:names` se po dizajnu NE vrti u CI-ju (popis je
izvan gita, pa bi ga CI uvijek čitao kao „nema ga = pad") — hvata ga samo lokalni preflight.
**Brana veličine:** prag za `windows-git-bash-zamke.md` izbačen iz tablice (Leonova odluka) — memorija je po stroju,
a ta je vezana na Windows; gdje postoji, pada pod `OSTALE_MEMORIJE`. Test prilagođen, a broj dotaknutih datoteka se
sad **izvodi iz tablice** (zakucana 6 je pala, mjera je bila ispravna).
**Deploy (u toku):** merge `origin/main` u granu — sukobi samo dnevnici, od rotacije studenog; `main` nije imao
PROGRESS-sesiju od 17.11. ni napomenu o `18610cc`, oboje vraćeno ručno. `export:json --check` round-trip čist ·
**bump `20261127121859`** (dva sadržajna commita mijenjala `data/**` bez bumpa) · `test:unit` 68/68 · **preflight zelen** ·
grana pushana, CI vrti. Čeka Leonov OK za `main`.
**Slijedi:** praznina u Sociologiji iz `sociologija-skripta.doc` (Drive), pa 2. godina: Opći dio građanskog i obvezno →
Kazneno → Međunarodno → Obiteljsko. Gradivo za sva četiri postoji; **Obiteljsko je najtanje** (samo liste pitanja, bez skripte).

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
