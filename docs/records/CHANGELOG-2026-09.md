# Changelog — 2026-09

> **Arhiva jednog mjeseca** — ovamo ju je premjestio `npm run docs:rotate`; tekst unosa je nepromijenjen.
> Tekući zapis: [CHANGELOG.md](CHANGELOG.md) · svi mjeseci: [docs/README.md](../README.md).

## 2026-09-29 (OPUS) — 🚀 **IMENA MAKNUTA + BRANA `check:names` NA PRODUKCIJI** — `main` = `268aa74`, token `20260928165846`

Pushao Leon (harness je meni odbio push na produkciju). **Provjereno nakon deploya:** Vercel produkcija READY na `268aa74` ·
živi token = repo · živi `catalog.js` = commit (sadržajno; lokalno je samo CRLF) · 0 imena u živom katalogu · 29 predmeta ·
`diff:db te2` = 0 razlika (re-sync u PROD bazu napravljen).

### Sadržaj zahvata

Odluke ankete 28./29.09.: svi FMTU nastavnici (uklj. autore FMTU udžbenika) i sve privatne osobe osim Leona → **uloga, ne rupa**.
Objavljena djela autora izvan FMTU-a (Blanchard, Pindyck, Babić, Žager i sur., Chicago primjeri) ostaju. Git povijest netaknuta.
- **Student vidi:** katalog (Traffic EN/HR, Math EN, Academic Writing EN) — zagrade s imenima nastavnika maknute ·
  `te2` (5×, M2 + završni) ime predavača → „the lectures". ⚠️ `te2` je EN = čita se **iz baze** → na produkciji tek nakon
  `diff:db` + re-synca (zaseban Leonov OK).
- **Komentari:** 24 zamjene u 21 datoteci `data/**` (izvori predavanja → „nositelj kolegija" / „course lecturer").
- **Docs:** content-suradnik je sad uloga (202 pojavnice, puno ime i GitHub račun maknuti), nastavnici u CHANGELOG/PROGRESS/README/TRAFFIC_PLAN.
- **Brana `check:names`** (u preflightu): popis imena je IZVAN gita (`.imena-zabrana.txt`, gitignored); nema ga lokalno =
  pad, prazan = pad, CI = „nije mjereno". Obrnuta provjera: `tests/unit/check-names-gate.test.js` (10/10) + na stablu
  (nema popisa → 1, prazan → 1, podmetnuto postojeće ime → nalaz s retkom). Prvo pokretanje uhvatilo je 5 imena u MOJIM zapisima.
- Mjera: svaka zamjena ispisuje broj pogodaka i pada na ≠ 1 (33/33 data, 14/14 docs); završni grep = 0 ostataka osim svjesnih.

## 2026-09-28 (OPUS) — 🚀 **MAKROEKONOMIJA + VJEŽBE MATEMATIKE NA PRODUKCIJI** — `main` = `ca6a51f`, token `20260928040705`

Fast-forward `3898fe6..ca6a51f` (3 commita), Leonov OK 28.09.; pre-push preflight zelen. Samo sadržaj i katalog.
- **Provjereno nakon deploya:** Vercel produkcija READY na `ca6a51f` · živi token = repo · živi `catalog.js`,
  `math-hr/exercises.js`, `macroeconomics-hr/final.js` i JSON bajt-identični commitu · 29 predmeta · u pregledniku:
  završni Makroekonomije spaja 25 kategorija, vježbe Matematike se otvaraju (0 grešaka na stranici).
- ⚠️ GitHub: push je **zaobišao pravilo** „Changes must be made through a pull request" (admin bypass).

### Korisnik dobiva
- **Vježbe Matematike na hrvatskom** (`math-hr`, 54 vježbe, 36 randomiziranih) — po stvarnim ispitima 2023/24.
- **Makroekonomija (`macroeconomics-hr`, teorija)** — autorski iz Merlina 2025/26: skripta kroz sva predavanja i vježbe s
  riješenim zadacima, 417 ABCD pitanja + 39 u završnom, po uzoru na pripreme za kolokvije; katalog 29.

## 2026-09-28 (OPUS) — 🚀 **HR 1. GODINA (4 predmeta) NA PRODUKCIJI** — `main` = `3898fe6`, token `20260928014324`

Fast-forward `aa49f0a..3898fe6` (8 commita), Leonov OK 28.09., pushao Leon. Samo sadržaj i katalog, bez SQL-a i funkcija.
- **Provjereno nakon deploya:** Vercel produkcija READY na `3898fe6` · živa stranica nosi token repozitorija ·
  živi `catalog.js` i `statistics-hr/exercises.js` bajt-identični commitu · 28 predmeta u živom katalogu ·
  vježbe Statistike se otvaraju u pregledniku (popis + zadatak, 0 grešaka na stranici).

### Korisnik dobiva
- **Tri nova HR predmeta 1. godine (teorija: skripta, kartice, kviz, dopune):** Statistika (`statistics-hr`),
  Mikroekonomija (`microeconomics-hr`), Osnove izrade pisanog djela (`academic-writing-hr`) — autorski iz HR
  materijala kolegija, ne prijevodi. Katalog: 24 → 27 predmeta.
- **Matematika (`math-hr`, teorija)** — temelj EN `math` (isti kolegij) usklađen s HR demonstraturama i starim
  ispitima; katalog 28.
- **Vježbe Statistike na hrvatskom** (`statistics-hr`, 43 vježbe, 25 randomiziranih).

## 2026-09-26 (OPUS) — 🚀 **REZ F2+F3 NA PRODUKCIJI** — `main` = `aa49f0a`, token `20260925003248`

Fast-forward `61c39dd..aa49f0a` (57 commita), bez MCP-a i bez izmjene `vercel.json` (`/mcp` i dalje 404).
Redoslijed: SQL i funkcije PRIJE pusha, jer push = deploy.
- **PROD baza:** `f2-mail-log.sql` · `f2-temelj-mreze.sql` (Leonov OK kroz anketu, provjereno na bazi).
- **PROD Edge Functions:** `send-notification` (JWT) · `mail-unsubscribe` (`verify_jwt = false`) — deployao Leon;
  `check:functions` zelen. Tajne postavio Leon, bez `MAIL_REDIRECT_TO`.
- **Provjereno nakon deploya:** Vercel ✅ na `aa49f0a` · CI na `main` ✅ · živa stranica nosi token repozitorija ·
  `odjava.html` 200 · `/mcp` 404.

### Korisnik dobiva
- **Cijelo sučelje na hrvatskom** (F3/2) i **pravne stranice na oba jezika** (F3/1).
- **Zid, radionica i polica** na profilu (F2/5).
- **Obavijesti mailom** s pristankom i odjavom jednim klikom iz maila (F2/4).
- **Tema prati račun** i **odjava samo s ovog uređaja** (F2/1).

### Popravljeno (put do produkcije)
- **Push na `main` iz radnog stabla kvario je repozitorij** (`core.bare = true`) i sam padao: pre-push kuka izvozi
  `GIT_DIR`, a test je u privremenoj mapi radio `git init`. Kuka sad vrti preflight bez GIT_*; brana
  `git-okolina.test.js`. Detalji: PROGRESS 26.09.

⏳ **Otvoreno:** prva proba maila s produkcije („Pošalji probu meni") · staging `MAIL_UNSUB_SECRET` još kriv
(`test:mail` 3 pada u T5) · CI `authed` na ovom kodu je lažno zelen (0 s) dok S1 ne dođe s F6.

## 2026-09-17 (OPUS) — **F3/2 cigla 4d: Moji materijali na hrvatskom** — grana `feat/f3-dvojezicnost`

### Popravljeno
- **„Moji materijali" i polica prate promjenu jezika odmah** — dotad su ostajali na starom jeziku do sljedećeg
  otvaranja stranice. Ime nove police ili materijala koje korisnik upravo upisuje ostaje, a ako učitavanje nije uspjelo,
  poruka o grešci ostaje poruka o grešci.
- **Prozor „Premjesti u…"** više ne zadržava „Cancel" na jeziku prvog otvaranja.

## 2026-09-17 (OPUS) — **F3/2 cigla 4c: profil na hrvatskom** — grana `feat/f3-dvojezicnost`

### Popravljeno
- **Promjena jezika na profilu više ne briše ono što korisnik piše.** Otvorene forme (uredi profil, nova lozinka,
  brisanje računa) ostaju otvorene, s upisanim tekstom, a natpisi se odmah prevedu.
- **„Član od" ima mjesec na jeziku sučelja** („Član od 9. srpnja 2026.", dotad „9 July 2026").
- **Greška pri promjeni lozinke na profilu je na jeziku sučelja**, ista kao u prozoru za prijavu — dotad je stizala
  sirova engleska poruka poslužitelja.

## 2026-09-17 (OPUS) — **F3/2 cigla 4b: slika u gradivu na hrvatskom · mjera prijevoda ispravljena** — grana `feat/f3-dvojezicnost`

### Popravljeno
- **Slika u gradivu bez opisa više ne piše „Learn image" ispod sebe na hrvatskom sučelju**, a čitač ekrana je na
  hrvatskom najavljuje kao „Otvori sliku: …". Na engleskom je tekst isti kao prije.

### Interno
- Brana prijevoda više ne broji engleski rezervni tekst uz ključ koji postoji u rječniku (presuda Leon, 17.09.) — takav
  se tekst na hrvatskom sučelju nikad ne prikaže. Brojka je pala za 29 bez ijednog prevedenog teksta; ključ koji ne
  postoji i tekst bez ključa i dalje ruše branu.

## 2026-09-17 (OPUS) — **F3/2 cigla 4a: prijava na hrvatskom** — grana `feat/f3-dvojezicnost`

### Popravljeno
- **Čitač ekrana više ne izgovara engleska imena gumba na hrvatskom sučelju**: zatvaranje prozora za prijavu, oko
  lozinke (i „Prikaži" i „Sakrij", u prozoru i u profilu) te gumb za prijavu / profil u gornjoj traci.
- **Prozor za prijavu prati promjenu jezika.** Dotad je ostajao na jeziku prvog učitavanja stranice; sad se otvori na
  jeziku koji je trenutno odabran, a ono što je korisnik već upisao ostaje.

## 2026-09-16 (OPUS) — **F3/2 cigla 3: jezik prati uređaj** — grana `feat/f3-dvojezicnost`

### Promijenjeno
- **Prvi posjet na uređaju s hrvatskim jezikom otvara hrvatsko sučelje**, od prvog prikaza i na svim stranicama
  (uključujući pravne i odjavu). Svi ostali uređaji dobivaju engleski. Prekidač jezika i dalje ima zadnju riječ i
  pamti se. Predmeti i materijali ostaju na jeziku na kojem su napravljeni.

## 2026-09-16 (OPUS) — **F3/2 cigla 2: slijepa karta na hrvatskom** — grana `feat/f3-dvojezicnost`

### Dodano
- **Slijepa karta na hrvatskom sučelju:** razine, gumbi, zadatak, koordinate, poruke o točnosti i rezultat, poruka pri
  učitavanju karte i kartica u Napretku. Imena mjesta ostaju kako jesu (gradivo). Promjena jezika usred igre precrta i
  koordinate i rezultat.
### Popravljeno
- Zadatak na karti pisao je „Click on the location of: Find: Zagreb" — sad samo ime mjesta.

## 2026-09-16 (OPUS) — **F3/2 cigla 1: naslovnica i traka bez engleskog ostatka** — grana `feat/f3-dvojezicnost`

### Promijenjeno
- **Prekidač jezika** na hrvatskom nosi ime „Jezik / Language" (i opis kad se prijeđe mišem); na engleskom „Language /
  Jezik" — tko ne razumije trenutni jezik, i dalje ga nađe. Isto u Studiju.
- Podnožje stranica lekcija i učenja ima isti tekst kao podnožje naslovnice, na oba jezika.
- Čitač ekrana na hrvatskom dobiva hrvatska imena podnožja, bočne trake i gumba za zatvaranje slike.
### Brana
- `check:i18n` zna `data-i18n-title`; `i18n.spec.js` tvrdi da promjena jezika usred kviza ne gazi pitanje.

## 2026-09-16 (OPUS) — **F3/1 ③d: novi Uvjeti korištenja, na engleskom i hrvatskom** — grana `feat/f3-dvojezicnost`

### Promijenjeno
- **Uvjeti korištenja napisani iznova:** vlastito gradivo ostaje korisnikovo i privatno je po zadanom; pravila za
  dijeljenje i objavu (autor odlučuje i povlači, besplatno, samo ono na što imaš pravo, uklanjanje); prijava
  nezakonitog sadržaja; zabrana namještanja rezultata; dodatni uvjeti za buduće plaćene funkcije; potrošačka prava.
### Dodano
- **Uvjeti korištenja na hrvatskom.** Time su sve četiri pravne stranice (Kontakt, Česta pitanja, Pravila privatnosti,
  Uvjeti korištenja) dostupne na oba jezika.

## 2026-09-16 (OPUS) — **F3/1 ③c: Pravila privatnosti na hrvatskom** — grana `feat/f3-dvojezicnost`

### Dodano
- **Pravila privatnosti na hrvatskom** (inačica od 15.09.) — izabrani jezik od prvog crtanja, prekidač u zaglavlju.

## 2026-09-16 (OPUS) — **F3/1 ③b: FAQ na hrvatskom** — grana `feat/f3-dvojezicnost`

### Dodano
- **Česta pitanja na hrvatskom** — isti mehanizam kao Kontakt: izabrani jezik od prvog crtanja, prekidač u zaglavlju,
  hrvatsko zaglavlje, podnožje i naslov kartice.

## 2026-09-16 (OPUS) — **F3/1 ③a: pravne stranice dvojezične — mehanizam + Kontakt na hrvatskom** — grana `feat/f3-dvojezicnost`

### Dodano
- **Kontakt na hrvatskom** — stranica nosi oba jezika; vidi se izabrani, od prvog crtanja (bez bljeska engleskog).
  Prekidač jezika u zaglavlju, hrvatsko zaglavlje, podnožje, naslov kartice i cookie-traka.
- `<html lang>` je točan prije prvog crtanja na svim stranicama (čitač ekrana više ne izgovara hrvatski engleskim glasom
  dok se skripte ne učitaju).
### Popravljeno
- Zaglavlje pravnih stranica na 320 px više ne izlazi iz ekrana.
### Brana
- `check:i18n` zna jezične blokove: hrvatski blok mora imati isti oblik kao engleski i ne smije biti kopija.
- `tests/unit/jezik-boot.test.js`; `legal.spec.js` mjeri bljesak, prekidač i 320 px.
- Playwright odbija poslužitelj drugog radnog stabla (`tests/global-setup.js`, `SOKRAT_TEST_PORT`).

## 2026-09-16 (OPUS) — **F3/1 ②: novi tekst FAQ-a, „O nama" i Kontakta** — grana `feat/f3-dvojezicnost`

### Promijenjeno
- **FAQ** napisan iznova prema stvarnom stanju: vlastito gradivo, račun (Google, 16+), vidljivost, offline, jezik,
  obavijesti mailom, brisanje u aplikaciji. Maknute zastarjele tvrdnje (brisanje računa mailom, „new subjects added
  regularly", slanje bilježaka mailom).
- **„O nama":** točan opis kataloga, oznake su stvarni načini učenja (Learn · Flashcards · Quiz · Fill-in-the-blanks),
  kartica „Get in touch", uloga „Founder & developer"; HTML-fallback izjednačen s rječnikom.
- **Kontakt:** popis tema bez slanja bilježaka i bez brisanja računa mailom.
- **Pravila privatnosti §7:** ime gumba „Delete study history" (pisalo „Delete cloud data").
- **Naslovnica:** vrata „Make your own" više ne obećavaju dijeljenje („private to you").

## 2026-09-16 (OPUS) — **F3/1 ①: javni kontakt je `sokrat@sokratstudy.com`** — grana `feat/f3-dvojezicnost`

### Promijenjeno
- Kontakt, FAQ, Pravila privatnosti, Uvjeti korištenja i „O nama" vode na `sokrat@sokratstudy.com` umjesto osobnog
  Gmaila (8 poveznica) + `README.md`.
### Brana
- `tests/unit/kontakt-adresa.test.js`: svaki `mailto:` na javnoj stranici vodi na službenu adresu i pokazuje nju;
  osobni Gmail nigdje na javnoj površini. Na starom tekstu crvena (21 pad).

## 2026-09-15 (OPUS) — **F2/5c: polica istog izgleda + jedan ulaz u profil** — grana `feat/f2-zid` (F2/5 GOTOV)

### Promijenjeno
- **Izbornik „⋯" je jedan modul** — `js/row-menu.js` (`SokratRowMenu`), izvučen iz `my-materials.js`: radionica, „+ Novo"
  i polica dijele isto ponašanje (strelice, Tab, pomak, Escape, zamjena bez Popover API-ja). Učitava se u paketima
  `polica`, `materials`, `profile`, prije police i radionice.
- **Polica „Skinuto za offline" = redak kao u radionici:** kvadrat u boji predmeta, puno ime, opis (veličina · stanje
  učenja; zastarjelost jantarno), dodir na redak otvara predmet (poveznica s pravom adresom), a „Osvježi" (samo
  zastarjelo, prvo) i „Ukloni s uređaja" su u „⋯". Dok radnja traje, redak je prigušen (`aria-busy`).
- **Zaglavlje „Mojih materijala" više ne nosi drugi gumb računa** — ulaz u profil je jedan, u traci (F2/0).
### Brana
- `shelf.spec.js` (izgled + uklanjanje kroz „⋯") · `offline-study.spec.js` (Osvježi je prva stavka zastarjelog) ·
  `materials-entry.spec.js` (nula ulaza u profil u zaglavlju stranice, jedan u traci) — sve obrnuto crveno na starom kodu.
  `loader-retry.test.js` broj skripti paketa čita iz `PAKETI` i tvrdi strože (poslije pada ponovno SAMO pala skripta).

## 2026-09-15 (OPUS) — **Pregled F2/5a+5b: šest nalaza, svi popravljeni** (Leon: *„prođi kroz sve i analiziraj"*) — grana `feat/f2-zid`

### Popravljeno (ništa od ovoga nije bilo na produkciji)
- **Zid je treptao na svaki izbor teme:** birač teme stoji NA profilu, izbor piše u račun (`USER_UPDATED`) i profil se
  crta iznova → zid je padao na sive plohe i čitao bazu ispočetka. Sad se zadnji zid (po korisniku) nacrta odmah, a
  svježe čitanje ga tiho zamijeni; neuspjelo osvježavanje ne briše ono što se vidi.
- **Izbornik „⋯" bez strelica:** `role="menu"` obećava ↓/↑/Home/End (ARIA APG) — sad radi.
- **Tab iz izbornika ga nije zatvarao:** izbornik je visio nad sljedećim retkom. Sad Tab zatvara i nastavlja od „⋯".
- **Pomak stranice odvajao je izbornik od „⋯":** izbornik sad prati svoj gumb, a zatvara se tek kad gumb izađe s ekrana
  (zatvaranje na svaki pomak rušilo je otvaranje — glatko klizanje nastavlja i poslije dodira).
- **„Premjesti" u podpolicu zatvorene police sakrivao je materijal:** otvara se cijeli put do odredišta.
- **Poslije premještanja fokus je padao na `body`:** vraća se na premješteni redak.
### Provjereno i OBORENO
- Produkcija ima vezu `node_content → nodes` i politiku čitanja po vlasniku (čitanjem sheme) → novi upit stabla radi i ondje.
- Odjava bez mreže: zakucani supabase-js 2.110.8 i tada briše lokalnu sesiju → poruka „Odjavljen" ne laže.
- `renderProfilePage` se zove samo dok je profil otvoren → zid ne dira stanje radionice u pozadini.
### Brana
- `profile-shelf` ⑤ · `radionica` ② (strelice, Tab, pomak) i ④ (put + fokus). Svaka tvrdnja viđena CRVENA sa svojom porukom.

## 2026-09-15 (OPUS) — **F2/5b-3: jedan „+ Novo"** — grana `feat/f2-zid`

### Promijenjeno
- Traka radionice nosi **jedan „+ Novo"** (dotad „Nova polica" + „Novi materijal") koji otvara izbornik istog oblika kao
  „⋯" retka: Novi materijal · Nova polica. Izbornik stoji uz bliži rub gumba (na telefonu je gumb pune širine → lijevo).
### Brana
- `radionica.authed.spec.js` ⑥ (jedan gumb, redoslijed, poravnanje, unos dobiva fokus) + ③ (telefon; obrnuto na
  pravilu „po središtu" pada) · `my-materials.authed.spec.js` ide kroz `novo()` (`tests/helpers/izbornik-retka.js`).

## 2026-09-15 (OPUS) — **F2/5b-2: „Premjesti u…"** — grana `feat/f2-zid`

### Dodano
- **Premještanje bez povlačenja** (Leon, anketa 14.09.: na telefonu kroz izbornik): „⋯ → Premjesti u…" otvara prozor s
  popisom polica — „Na vrh (izvan police)" + sve police uvučeno po dubini; trenutna je onemogućena („Ovdje je"), a
  polica se ne nudi u samu sebe ni u svoje potomke. Upis je isti RPC (`move_node`) kao povlačenje mišem.
### Brana
- `my-materials.test.js` +5 (`moveTargets`) · `radionica.authed.spec.js` ④ + ⑤ (dodir; Chromium + WebKit) ·
  `a11y.authed.spec.js`: otvoren „⋯" i otvoren prozor, 5 tema, 0 prekršaja.

## 2026-09-15 (OPUS) — **F2/5b-1: redak radionice** — grana `feat/f2-zid`

### Promijenjeno
- **Redak stabla „Mojih materijala" = ikona u boji + PUNO ime + jedan „⋯"** (dotad pet ikona; na 393 px ime rezano na
  6–8 znakova). Materijal nosi svoju stalnu boju (isto kao pločica na zidu), ime se lomi u retke.
- **Dodir na redak = glavna radnja:** materijal → učenje; mapa → otvori/zatvori; prazna mapa → „⋯".
- **„⋯" izbornik** (Uči · Uredi · Preimenuj · Obriši; mapa: Novi materijal unutra · Nova polica unutra · Preimenuj ·
  Obriši): `popover` iznad svega, stavke 44 px, Escape zatvara i vraća fokus. Bez Popover API-ja isti izbornik kao `hidden`.
- **Ručka za povlačenje samo za miš** (`pointer: fine`) — na dodiru se premješta kroz izbornik (5b-2).
### Brana
- `tests/radionica.authed.spec.js` (3, Chromium + WebKit) · specovi koji su klikali ikone retka idu kroz „⋯"
  (`tests/helpers/izbornik-retka.js`).

## 2026-09-15 (OPUS) — **F2/5a: zid gradiva na profilu** — grana `feat/f2-zid`

### Dodano
- **Rešetka do 6 zadnje mijenjanih materijala** odmah ispod identiteta (umjesto kartice „Otvori moje materijale"):
  2 stupca na telefonu, 3 na stolnom; pločica = ikona u boji materijala + ime u najviše dva retka + mapa. **Dodir =
  učenje.** „Svi materijali →" vodi u radionicu; prazno stanje je isprekidana pločica „Napravi prvi materijal"; greška
  čitanja ima „Pokušaj ponovno" i ne pretvara se u „nemaš materijala".
- **Stalna boja materijala** (`bojaMaterijala`, `js/utils.js`, Leon 15.09.): materijal bez vlastite boje dobiva boju iz
  kurirane palete Studija izvedenu iz id-a — istu na zidu i na stranici učenja (dotad uvijek indigo).
### Promijenjeno
- `SokratMaterials.loadTree` čita i `created_at` + `node_content(updated_at)` (redoslijed zida); novo `loadWall` i čisti
  `recentStudy`. Ključ `materials.openPage` uklonjen (više ga nitko ne koristi); novi `profile.shelfAll/Empty/Error`.
### Brana
- `tests/unit/my-materials.test.js` +10 · `tests/profile-shelf.authed.spec.js` (7; obrnuto na starom kodu 6/6 pada).

## 2026-09-14 (OPUS) — **F2/1 ④: odjava samo ovaj uređaj** (Leon, anketa 14.09.) — grana `feat/f2-tema-racun`

### Promijenjeno
- **`SokratAuth.signOut()` → `signOut({ scope: 'local' })`** (`js/auth.js`). Dotad bez argumenta, a u zakucanom
  supabase-js 2.110.8 to je GLOBALNO: odjava na mobitelu odjavila je i računalo. Sesija ovog uređaja se i dalje briše na
  poslužitelju; `SIGNED_OUT` stiže kao i prije, pa se lokalni izbor teme i dalje briše (F2/1 ①).
### Brana
- `tests/unit/signout-scope.test.js` — svaki `auth.signOut(` u `js/**` nosi `scope: 'local'` (obrnuto: 1 pad na starom kodu).
- `tests/signout-local.authed.spec.js` (STAGING, dvije prave sesije) — druga sesija preživi odjavu prve, odjavljeni token je
  opozvan, izbor teme obrisan. Obrnuto na starom kodu: pada (*„Auth session missing!"* na drugom uređaju).

## 2026-09-14 (OPUS) — **Zid profila na telefonu** (Leon s iPhonea, preview: *„Nije dobro"*) — grana `feat/f2-tema-racun`

### Popravljeno (`css/profile.css`, nikad nije bilo na produkciji — gumb naslovne je F2/2 dopuna)
- **Gumb naslovne bio je traka preko CIJELE naslovne** (359 px na 393, 12 px van lijevog ruba): `.cta-button` je mobile-first
  `width: 100%`, a apsolutni gumb ga je naslijedio; na ≥768 px `.cta-button` vraća prirodnu širinu, pa se na stolnom nije
  vidjelo. → `width: auto`, a na telefonu okrugla ikona 44×44 u donjem desnom kutu na poluprozirnoj plohi teme.
- **Naslovna je rezala korisnikov izrez:** ploha zakucane visine (96 px na 359 = 3,7:1; 128 px na 860 = 6,7:1), a izrez je
  3:1 → `aspect-ratio: 3 / 1`. Ono što korisnik odabere u izrezu sad se vidi cijelo, na svakoj širini.
- **Telefon = Facebook-obrazac:** portret 76 → **112 px** (preklapa naslovnu), ime / e-adresa / opis u VLASTITOM retku ispod
  njega (dotad stisnuti uz portret, ~235 px).
### Brana
- `profile-wall.authed.spec.js` **②b**: na 320/375/393/430/1280 naslovna je 3:1 (±0,05), gumb naslovne uži od pola plohe,
  ≥44 px visok, unutar plohe i u desnoj polovici. **Obrnuto na starom CSS-u: pada** („gumb naslovne je traka (286 px) @
  320px"). Uz nju zeleno: `phone.authed` · `profile-wall` · `profile-images` · `topbar-avatar` · `temelj-mreze` (32/32);
  preflight EXIT 0. Reprodukcija Leonovog ekrana (393, tamno, portret + naslovna) snimljena prije i poslije.

## 2026-09-14 (OPUS) — **TEMELJ MREŽE (BACKLOG §🌐 A1–A3): korisničko ime · vidljivost · kvota slika** — STAGING (grana `feat/f2-avatar-traka`)

Leon: *„može, ovo je super"* (pravila: 3–20 znakova, 30 dana, bez brisanja · vidljivost bez sučelja do F7 · 20 slika).

### Dodano
- **`supabase/f2-temelj-mreze.sql`** (additivno, idempotentno): `profile_identity.handle` (format `^[a-z0-9_]{3,20}$` +
  unique) · `handle_changed_at` · `visibility` (`private|link|public`, zadano `private`, BEZ politike i sučelja — F7 dodaje
  jednu SELECT-politiku nad tim stupcem) · `reserved_handles` (RLS bez politika, bez grantova) · RPC **`set_profile_handle`**
  (normalizira u mala slova; kodovi `handle_invalid|reserved|taken|cooldown`; 30 dana između promjena, prvo postavljanje
  slobodno, isto ime ne pomiče sat, `for update` protiv utrke) · **kvota 20 objekata** u vlastitom prefiksu `profile-images`
  kroz `profile_images_count_mine()` (SECURITY DEFINER, EXECUTE ostaje `authenticated`-u — politiku izvršava pozivatelj).
- **`js/profile.js`:** `@ime` na zidu ispod imena · polje s `@` u „Uredi profil" (ide PRVO, samo kad se promijenilo, greške
  prevedene; brisanje odbijeno na klijentu) · `loadIdentity` na `42703` (baza bez stupca) čita bez `handle` umjesto da cijeli
  red padne na rezervni put — klijent smije stići prije SQL-a a da zid ne izgubi slike. i18n 9 ključeva, CSS u `profile.css`.
### ⚠️ Nalaz iz mjerenja (STAGING) — prva verzija kvote je SRUŠILA upload
Podupit nad `storage.objects` UNUTAR INSERT-politike nad `storage.objects` → `42P17 infinite recursion detected in policy`,
a Storage API to javlja kao *„The database schema is invalid or incompatible."* — **svaki** upload u bucket, ne samo 21.
Uhvatio ga je tek spec (upload 1 od 20); popravak = SECURITY DEFINER brojač, zapisano u SQL-u uz politiku.
### Popravljeno (nađeno istim vrtnjama)
- **`js/theme.js` (F2/1 ①):** preuzimanje teme s uređaja samo na `SIGNED_IN`/`INITIAL_SESSION` — na `USER_UPDATED` bez teme
  prozor je odmah ponovno upisivao ono što je netko upravo maknuo (vraćanje stanja u specu se poništavalo). Unit +1.
- **Higijena dijeljenog test-računa:** `profile-wall` ⑤ vraća ime/opis i u TABLICU (ne samo preslik) — probno ime je inače
  ostajalo u `profile_identity`, a sljedeći spec koji spremi formu vraćao ga je i u metapodatke · `profile-images` ⑤ si
  postavi „bez slike" umjesto da ga pretpostavi. Test-račun na stagingu počišćen (Storage API + SQL) i provjeren čistim
  POSLIJE pune vrtnje.
### Brane
- `tests/temelj-mreze.authed.spec.js` (6): vidljivost · normalizacija + isto ime · odbijanja s KODOM (oblik, rezervirano,
  30 dana, zauzeto preko jednokratnog korisnika) · izravan upis i čitanje rezerviranih zatvoreni · sučelje (@ime, prevedena
  greška, forma ostaje) · kvota (21. odbijen). **Prije migracije 6/6 crvenih → poslije 6/6 zelenih**; 27/27 profilnih specova.
- Savjetnik (security) na stagingu: ništa novo osim očekivanog (`reserved_handles` bez politike = namjerno; dva nova RPC-a
  iste klase kao svih 11).
### PROD — redoslijed (Leonov OK)
**SQL u SQL Editoru PRIJE klijenta** (isto kao F2/2). Klijent bez stupca preživi (42703 → čitanje bez `handle`), ali polje
za ime bi palo na „Could not find the function".

## 2026-09-14 (OPUS) — **F2/1 ③: profilna u gornjoj traci** (grana `feat/f2-avatar-traka`, iznad ①)

Leon (anketa 13.09.): avatar u traci, putanja i u `user_metadata` (kao ime). = BACKLOG §🌐 **A4**.

### Dodano
- **`js/profile-images.js` `mirrorAvatar(path)`:** nakon uspješnog RPC-a upload/ukloni AVATARA zrcali putanju u
  `user_metadata.avatar_path` (naslovna ne). Najbolji pokušaj — pad ne obara upload; nedostaje li ključ = `null`.
- **`js/profile.js` samopopravak:** `loadIdentity` poslije uspješnog čitanja reda vrati preslik na istinu iz baze
  (slike od prije F2/1, zrcaljenje koje je palo bez mreže). Bez tablice ne dira ništa.
- **`js/auth.js` `navAvatarUrl` / `setNavAvatar`:** `.auth-entry` gumbi crtaju okruglu sliku (28 px) umjesto ikone, iz
  JWT-a, bez kruga prema bazi i bez paketa `profile`. Putanja je ULAZ (korisnik smije pisati metapodatke): prolazi samo
  `<moj-id>/avatar/<ime>`; `error` pri učitavanju → natrag na ikonu. CSS u `css/topbar.css` (`.auth-entry-avatar`,
  `.has-avatar > i`); dodir 44×44 i budžet kroma netaknuti.
### Popravljeno
- **`USER_UPDATED` / `TOKEN_REFRESHED` više ne crtaju profil preko otvorene forme „Uredi profil".** `auth.js` je na SVAKI
  događaj zvao `renderProfilePage`, koji prepisuje `#profileContent` — „Ukloni" sliku stoji U formi i od ③ šalje
  `USER_UPDATED`, pa bi obrisao napola napisan opis (a osvježavanje tokena svaki sat to je moglo i prije).
### Brane
- `profile-images.test.js` +7 (zrcaljenje: ukloni → null, naslovna ne dira račun, RPC odbije → bez zrcaljenja, pad
  zrcaljenja ne obara ukloni, ista putanja → bez poziva) — obrnuto na starom modulu **5 crvenih**.
- `tests/topbar-avatar.authed.spec.js` (STAGING): ① pravi upload → slika u traci, 44×44 i 28 px na 320 px, bez
  prelijevanja → ukloni → ikona · ② tuđa putanja u metapodacima NIJE URL + samopopravak pri otvaranju profila ·
  ③ „Ukloni" u otvorenoj formi čuva upisani opis. `profile-images.authed.spec.js` vraća i preslik u `vratiStanje`.

## 2026-09-14 (OPUS) — **F2/1 ①: tema prati račun** (grana `feat/f2-tema-racun`)

Leon (2026-09-04): *„tema treba pratiti račun"* · (2026-09-06): *„tuđi izbor ne smije preživjeti odjavu"* · (anketa 13.09.):
tema u `user_metadata`. Prvenstvo iz `boot.js` time dobiva i gornju razinu: **račun > lokalni izbor > uređaj > academic**.

### Promijenjeno
- **`js/theme.js`:** izbor prijavljenog se upisuje u `user_metadata.theme` (`updateUser({ data })`, u pozadini — klik se
  primijeni odmah); „Automatski" se piše izričito kao `auto`. Na svaki događaj računa s valjanom temom (prijava, obnovljena
  sesija, osvježen token, `USER_UPDATED`) račun **pregazi** lokalni izbor i upiše ga lokalno s biljegom, pa je i prvi kadar
  sljedećeg ulaska točan. **`SIGNED_OUT` briše lokalni izbor** → uređaj; neprijavljen posjetitelj svoj izbor zadržava.
  Dok upis čeka mrežu, staro stanje računa klik ne vraća unatrag. `localStorage` ostaje prvi kadar (`boot.js` netaknut).
- **Račun bez teme** (svi računi stariji od ovoga) **preuzme izbor uređaja** — tek nakon SVJEŽEG `getUser()`, jer keširana
  sesija zna biti starija od izbora s drugog uređaja; ima li poslužitelj temu, primijeni se ona. Jednom po korisniku.
- **`js/profile.js`:** `KEEP_LOCAL_KEYS` (brisanje računa) više ne čuva temu — brisanje ne smije biti blaže od odjave.
- **i18n `profile.appearanceDesc`:** „Kad si prijavljen/a, odabir prati tvoj račun; inače se pamti na ovom uređaju."

### Brane
- `tests/unit/theme-account.test.js` (32 tvrdnje, `vm` + lažni `SokratAuth`) — obrnuto na starom `theme.js`: **20 crvenih**.
- `tests/theme-account.authed.spec.js` (STAGING, tamni uređaj): klik → `user_metadata.theme` na poslužitelju, ime preživi
  (stapanje, ne prepisivanje), obrisan lokalni izbor + reload → račun pregazi `carbon` uređaja u `academic`. Obrnuto na
  starom `theme.js`: **pada** („izbor nije stigao u račun"). Odjava se u specu NE vozi (`signOut()` je globalan i opozvao
  bi dijeljenu sesiju) — čuva ju unit.

## 2026-09-13 (FABLE) — **F2/2 dopuna: „+" na portretu i gumb na naslovnoj (Facebook-obrazac) + IZREZ slike** (grana `feat/f2-slike`)

Leon (nakon deploya): *„treba biti plus na profilnoj za mijenjat i isto tako za pozadinu… kao facebook. također kada se
stavljaju slike treba biti da se bira crop."*

### Dodano
- **`js/image-crop.js`** (`SokratImageCrop.open(file, {aspect, output, round, title}) → Blob|null`): modal u `<sokrat-modal>`,
  okvir zadanog omjera (avatar **1:1** s okruglom maskom, naslovna **3:1**), slika je `<canvas>` koji se **povlači** (pointer,
  jedan prst) i **zumira** (klizač 1–4×, kotačić, štipanje). Matematika je čista i izdvojena (`baseScale` · `clampOffset` ·
  `sourceRect` · `rezoom`) — `tests/unit/image-crop.test.js`, 11 tvrdnji. Izlaz je PNG točnih ciljnih dimenzija
  (512×512 / 1500×500) pa `profile-images.js` kodira WebP **jednom**. Odustajanje (gumb, ESC, backdrop) = `null`, ništa se ne šalje.
- **Zid:** okrugli **„+" (kamera) na portretu** i gumb **„Uredi naslovnu"** dolje desno na plohi (na telefonu samo ikona,
  natpis u `aria-label`); obje mete 44×44. Tijek: „+" → birač → **izrez** → upload. U formi „Uredi profil" ostaje samo
  **„Ukloni"**, i to samo dok slika postoji (red bez slike je skriven — `[hidden]` mora pobijediti `display:flex`).
- i18n: `profile.avatarChange` · `coverChange` · `cropTitleAvatar` · `cropTitleCover` · `cropHint` · `cropZoom` (en+hr);
  `profile.imgChange` maknut (više ga nitko ne zove).
- **Specovi ⑤/⑥** u `profile-images.authed.spec.js`: „+" 44×44 → birač → modal 1:1 → Spremi → portret 512×**512** (izrez iz
  4:3) · naslovna: okvir 3:1, **Odustani ne mijenja ništa**, Spremi → 1500×500 WebP, gumb ostaje iznad slike.
### Pouka
- `canvas.style.transform` u JS-u = Tailwindu tekst „transform" → `.transform` u bundleu (šum, isti razred kao `visible`/`sticky`)
  → `@source not inline("{,!}transform")` u `css/app.css`, uz provjeru da nijedno naše `.transform` pravilo ne postoji.
  Dokazi: profile-images 6/6 · profile-wall 5/5 · phone.authed 12/12 · reachability.authed 3/3 · a11y.authed čist · preflight EXIT 0.

## 2026-09-13 (FABLE) — 🚀 **F2/2 SLIKE PROFILA NA PRODUKCIJI** — `main` = `61c39dd`, token `20260913203047`

Leon (anketa): *„Sad, sve tri odjednom"* → tri koraka u tvrdom redoslijedu, svaki provjeren prije sljedećeg:
① `f2-profile-images.sql` Leon u SQL Editoru → čitanjem potvrđeno **identično stagingu** (bucket javan 5 MB / 3 MIME-a ·
4 politike `authenticated` · RPC secdef + grantovi · `profiles` 1 politika) · ② Edge Function `delete-account` **v2 na
PROD-u**, sha `4dfd03d1…` = staging v3; poziv bez tokena → 401 · ③ `git push origin main` (pre-push preflight EXIT 0,
harness-klasifikator odbio prvi pokušaj, prošao drugi uz OK u kontekstu) → živi token potvrđen. Tri commita:
`3ddf5f2` baza+funkcija · `90dca49` modul · `61c39dd` zid. Stara stabla `.b` · `.napredak` · `.f2` uklonjena (grane
spojene i obrisane); `.fix` uklonjeno, ali **grana `fix/kadar-nalicje` ZADRŽANA** — nije u `main`-u, dio parkiranih kartica.

## 2026-09-13 (FABLE) — **F2/2 cigla 3: zid crta profilnu i naslovnu; „Promijeni / Ukloni" u „Uredi profil"** (grana `feat/f2-slike`)

### Dodano
- **`js/profile.js`** — portret i naslovna postaju `<img>` iz javnog URL-a kad red identiteta nosi putanju (ikona/ploha
  ostaju kao rezerva); URL prolazi kroz escape **i** provjeru sheme (samo `https://`, jer `SokratBlocks.safeUrl` na profilu
  nije učitan). U formi „Uredi profil" dva reda: *Profilna slika* / *Naslovna slika* s **Promijeni** (birač → `upload`) i
  **Ukloni** (samo kad slika postoji). Slika se osvježava **u mjestu** (`refreshWallImages`) pa otvorena forma i upisani
  tekst prežive; greška se ispisuje po KODU iz modula (`image_decode_failed` → „odaberi JPG/PNG/WebP", `auth_required`,
  ostalo s porukom); toast na uspjeh. `loadIdentity` sad uspoređuje i putanje slika (inače bi avatar ostao ikona kad se
  ime nije promijenilo).
- **i18n:** 11 ključeva `profile.avatarLabel … imgErrUpload` na oba jezika. **CSS:** `.profile-cover-img`/`.profile-avatar-img`
  (`object-fit: cover`, portret kroz `overflow: hidden`), `.profile-edit-images` redovi.
- **Spec ⑤** u `profile-images.authed.spec.js`: klik-put — „Uredi profil" → „Promijeni" → Playwright `filechooser` →
  portret `<img>` s javnim URL-om, `naturalWidth` 512, forma ostaje otvorena → „Ukloni" → ikona natrag, `avatar_path` NULL.
  Dokazi: profile-images ⑤/⑤ · profile-wall 5/5 · profile-identity 5/5 · `phone.authed` 12/12 · preflight EXIT 0.

## 2026-09-13 (FABLE) — **F2/2 cigla 2: `js/profile-images.js` — smanjivanje u pregledniku, upload, RPC, brisanje stare** (grana `feat/f2-slike`)

Klijentski modul bez UI-ja i bez i18n-a (tekst ostaje u `profile.js`, cigla 3); baca greške s KODOM.

### Dodano
- **`js/profile-images.js`** (`window.SokratProfileImages`, u paketu `profile`): `smanji(file, kind)` — `createImageBitmap`
  (EXIF-orijentacija) → canvas → **WebP** (avatar ≤ 512, naslovna ≤ 1500 px), JPEG kad preglednik WebP ne kodira;
  `upload(kind, file, {oldPath})` → `<uid>/<kind>/<uuid>.<ext>` uz `cacheControl` 1 god (UUID = nepromjenjiva datoteka) →
  RPC → **stara se briše samo ako je naša**; RPC odbije → upload se počisti (bez siročeta); `remove` · `publicUrl` · `pick`
  (birač bez `capture`, i `cancel` je čuvan). Samo pravi `Blob` ulazi — sve drugo je `image_decode_failed`, ne sirovi TypeError.
- **`tests/unit/profile-images.test.js`** (18 tvrdnji: `fitDims` nikad ne povećava, putanje, `auth_required`/`image_kind_invalid`
  prije mreže, lažni klijent: tuđa stara putanja se ne dira, RPC-greška ne briše ništa, bez canvasa ništa ne ode na mrežu) +
  **spec ④** u `profile-images.authed.spec.js`: pravi Chromium, 2000×1500 PNG → **512×384 WebP**, manji od ulaza, javni URL
  vraća `image/webp`, naslovna netaknuta, **stari avatar obrisan**. 18/18 · 5/5.
### Pouka
- Tailwind skenira `js/` → funkcija imena **`shrink`** proizvela je `.shrink{flex-shrink:1}` u bundleu i oborila drift-branu.
  Preimenovano u `smanji` umjesto nove `@source not` iznimke: ime koje nije utility ne treba iznimku.

## 2026-09-13 (FABLE) — **F2/2 cigla 1: bucket `profile-images` + RPC `set_profile_image` + `delete-account` čisti oba bucketa** (grana `feat/f2-slike`, STAGING)

Baza za profilnu sliku i naslovnu, po odluci od 09.09. (javan bucket, upis samo vlasniku). Klijent i zid dolaze u ciglama 2–4.

### Dodano
- **`supabase/f2-profile-images.sql`** — bucket `profile-images` (`public=true`, 5 MB, png/jpeg/webp), 4 politike `to authenticated`
  s vlasničkim prefiksom u InitPlan obliku, `anon` ništa; RPC **`set_profile_image(p_kind, p_path)`** (SECURITY DEFINER) —
  putanja mora biti `<uid>/<kind>/…` I objekt mora postojati, inače `image_not_owned` / `image_not_found`; upsert dira SAMO
  traženi stupac. Primijenjeno na **STAGING**; PROD čeka izričit OK.
- **`tests/profile-images.authed.spec.js`** — 3 testa: ① vlastiti upload → RPC → RLS vrati → **javni URL 200 bez ijednog
  zaglavlja** (odluka izmjerena, ne pretpostavljena) · ② tuđi prefiks zatvoren (upload, listanje, RPC), nepostojeći objekt,
  kriva vrsta · ③ anon-upload odbijen, izravan `UPDATE avatar_path` = 0 redaka. **Crveno prije migracije, 9/9 zeleno poslije.**
### Promijenjeno
- **`supabase/functions/delete-account/index.ts` (v3 na stagingu)** — `PERSONAL_BUCKET` → `PERSONAL_BUCKETS = ['node-images',
  'profile-images']`. ⚠️ **Nalaz:** protiv stare verzije `deleteUser` **nije pao** — korisnik je nestao, a avatar u javnom
  bucketu ostao kao **javno dostupno siroče**. Posljedica propusta je GDPR-rupa, ne „neizbrisiv račun"; komentar u funkciji
  to sad kaže. `scripts/delete-account-check.js` T5 stavlja datoteku u OBA bucketa i traži da oba budu prazna (2 crvene → 0).

## 2026-09-13 (FABLE) — 🚀 **SPAJANJE (RASPORED §0) NA PRODUKCIJI — pet koraka, pet deployeva, Leonov OK po koraku**

Leon (13.09.): *„Ok super krenimo"* → *„za sve imaš moj OK"*. Svaki korak = jedan fast-forward `main`-a i jedan
push (pre-push kuka vrtjela preflight → EXIT 0 svaki put), svaki potvrđen **živim tokenom** na www.sokratstudy.com
i Vercel Production deploymentom. Što svaki korak nosi i kako je spojen: unos 12.09. „SPAJANJE" u
[PROGRESS.md](./PROGRESS.md) i `RASPORED.md` §0.

| korak | commit na `main` | Vercel | token | nosi |
|---|---|---|---|---|
| 1 | `d8e61be` | `6421281280` | `20260912195611` | BUG-047…051 — napredak pouzdan |
| 2 | `d2aa6b3` | `6421350197` | `20260912211633` | ostatak F1 (F1/4 · 5 · 7 · 9 · 11) + metrika `ucenje`/`povratak` + docs 05.–12.09. |
| 3 | `3dc6624` | `6421387979` | `20260913120617` | F2/1 (6/7): birač tema, natpis samo „Automatski" |
| 4 | `1d54700` | `6421766880` | `20260913120708` | F2/0 traka s dva odredišta · F2/3a profil = zid · F2/3b identitet |
| 5 | ovaj push | — | — | BUG-046 (pilula AA) · BUG-045 (SW runtime-keš) · zapis sesije |

**Migracija `supabase/f2-profile-identity.sql` na PROD** (`naxjubnedhrbhsuasayu`): Leon ju je primijenio u SQL Editoru
13.09. PRIJE koraka 4; provjereno čitanjem — tablica, RLS, jedina politika `authenticated` SELECT, RPC `security definer`
+ `search_path`, okidač, grantovi (`anon` ništa), **5 redaka / 5 imena prenesena**, `profiles` netaknut (1 politika) —
**identično stagingu** na svih 8 mjera. Time BUG-045 i BUG-046 prestaju biti živi kvarovi na produkciji.

Obrisane spojene grane: `fix/napredak-pouzdanost` · `feat/mjerenje-aktivacije` · `feat/racun-r1` · `feat/nocna-b` ·
`feat/profil-zid` · `feat/traka-odredista` · `spajanje/korak-*`. **Parkirano ostaje:** `feat/tinder-kadar` (kartice).

## 2026-09-12 (FABLE) — **NAPREDAK POUZDAN: pet kvarova iz vanjske recenzije** (grana `fix/napredak-pouzdanost`; BUG-047…051)

Vanjska recenzija repozitorija (12.09.) prijavila je pet kvarova u praćenju napretka; svih pet je **potvrđeno
u kodu prije popravka** (dva su gora nego u recenziji), nijedan nije bio zapisan. Svaki popravak = svoja cigla,
test prvo (crveno na `main`-u, zeleno poslije), svoj commit.

### Popravljeno
- **Naučena kartica se pamti po IDENTITETU, ne po poziciji u promiješanom špilu** (BUG-047). `markKnown` je
  spremao `cards.index`; sutra je na istoj poziciji druga kartica. Gore od recenzije: napredak je po PREDMETU,
  špil po LEKCIJI, pa su se indeksi triju lekcija miješali. `cardIdentity()` (`flashcards.js`): `card.id` kad
  postoji, inače FNV-1a otisak `kategorija|pitanje` — jer **1 175 od 5 737 kartica nema id** (sedam HR predmeta +
  dio `accounting`-a; recenzija je tu netočna). Stari brojčani zapisi ispadaju pri učitavanju i pri prvom
  upisu (i iz oblaka); brojka po lekciji = presjek sa špilom te lekcije. `tests/unit/flashcard-identity.test.js`, 6 tvrdnji.
- **Spajanje napretka više ne gubi kvizove** (BUG-048). `mergeValues` je za nizove bez stringova uzimao DULJI:
  `[80]`+`[90]` = `[80]`, a test je to tvrdio. Sad **multiskup-maksimum** po vrijednosti — nijedna vrijednost
  ne nestaje, `[80,80]` ostaje dvaput, spajanje sa sobom ne raste. Recenzentov „pokušaji s id-om i vremenom"
  odbijen (mijenja oblik podatka u bazi za isti dobitak).
- **Pali prvi push (u pullu) ide u sljedećem pokušaju** (BUG-049). `snapshot` se pisao prije upserta i
  „sinkronizirano u HH:MM" se ispisivalo i kad je pao. Snapshot tek nakon uspjeha; poruka samo kad jest.
- **Lokalni napredak ima VLASNIKA** (BUG-050, pravilo Leon 12.09.): pripada računu koji ga je zadnji
  sinkronizirao (`sokrat-progress-owner`, nikad u oblak). Ista osoba natrag → spaja se; **drugi račun → lokalno se
  briše prije pulla**; gost bez ijednog računa → u prvi račun. Dotad je B na zajedničkom računalu trajno
  nasljeđivao A-ovo učenje.
- **Odbijeni paket se zaboravlja** (BUG-051). `paketi[ime]` je držao odbijeno obećanje → svaki idući
  `paket('study')` vraćao staru grešku bez mreže; pomagao samo F5. `tests/unit/loader-retry.test.js`.
### Dodano
- Dva nova unit-testa u `test:unit` (`flashcard-identity`, `loader-retry`) + 8 tvrdnji u `cloud-sync.test.js`.

### 2026-09-09 — **Identitet dobiva svoju tablicu; `role` ostaje nedodirljiv** (F2/3b)

#### Dodano
- **`public.profile_identity`** (`supabase/f2-profile-identity.sql`) — ime, opis i (prazne, za F2/2)
  putanje slika. Owner-RLS **samo za čitanje**; upis isključivo kroz `set_profile_identity`
  (`SECURITY DEFINER`, `auth.uid()`, `search_path` postavljen). Granice **60/280 znakova provodi baza**,
  ne `maxlength` u formi. Primijenjeno na **STAGING**; PROD čeka izričit OK.
- **`tests/profile-identity.authed.spec.js`** — pet tvrdnji, sve **obrnute**: izravan INSERT/UPDATE/DELETE
  nad tablicom se odbija · tuđi red je nevidljiv · **UPDATE nad `profiles` vraća 0 redaka, a `role` je
  isti prije i poslije upisa identiteta** · duljine ruši baza.

#### Promijenjeno
- **Profil čita ime i opis iz tablice**, s `user_metadata` kao rezervom. ⚠️ Rezerva **nije skela**:
  produkcija tablicu (još) nema, a `signUp` i dalje piše ime u metapodatke. `user_metadata.display_name`
  ostaje **izvedeni preslik za gornju traku** — `getDisplayName()` čita JWT da za svako ime ne otvara
  krug prema bazi.

#### Popravljeno
- **Zid se više ne prekriva korisniku koji piše.** Dohvat identiteta završavao je ponovnim crtanjem, a
  ono briše `#profileContent` s otvorenom formom u njemu. Sad se ponovno crta samo ako bi se nešto
  promijenilo, i nikad dok je forma otvorena.

### 2026-09-09 — **Profil postaje ZID: tko si gore, postavke ispod** (F2/3a)

#### Promijenjeno
- **`#profile-page` se otvara kao stranica o korisniku, a ne kao popis postavki** (Leon: *„profil mora
  biti na isti način kao i Facebook"*). Gore: naslovna, portret, ime, opis i `[Uredi profil]`; ispod
  njih vlastito gradivo; pa naslov **„Postavke"** i tek onda račun, admin, sync, napredak, tema i
  privatnost. Do danas je prva stvar o sebi bila gumb „Promijeni lozinku".
- **Ime i opis se uređuju s profila** — forma piše u `user_metadata` (isti put kojim ondje već stoji
  `display_name` iz registracije). ⚠️ Privremeno po dizajnu: F2/3b to seli u zasebnu tablicu javnog
  identiteta, jer metapodaci žive u korisnikovom JWT-u i **nitko ih drugi ne može pročitati**
  (a `profiles` ne dolazi u obzir — iz nje čita `is_admin()`).
- **Unutarnji naslov „Moj profil" je obrisan.** Isti ključ već crta traka razine, pa je stranica nosila
  **tri zaglavlja jedno na drugom**. `#materials-page` svoj naslov zadržava — ondje nema zida.

#### Popravljeno
- **Prva kontrola profila više ne pada ispod pregiba na 320×568** (izmjereno: gumb s 454 px na 394 px;
  zid počinje na 116 umjesto 176). Regres je uveo sam zid, a **našla ga je brana `phone.authed` ②**.
- **Portret preklapa naslovnu na SVIM širinama.** Radilo na 320/375, nestalo na 393: `align-items:
  flex-end` poništava negativnu gornju marginu čim tekst stane u isti redak. Rješenje `align-self:
  flex-start`.

#### Brane
- **`tests/profile-wall.authed.spec.js`** (novo, STAGING): identitet stoji iznad granice postavki na
  320/375/393/430 · portret preklapa naslovnu i ne visi izvan zida · `[Uredi profil]` je 44×44 i unutar
  ekrana · forma se otvara sa zatečenim vrijednostima · spremanje mijenja zid. Piše u `user_metadata`
  i **vraća zatečeno stanje i kad tvrdnja padne**.
- `preflight` EXIT 0 · `authenticated` 19/19 · neprijavljeno 22 + 11 (`phone.spec.js`).

### 2026-09-08 — **Traka dobiva dva odredišta; „Počni učiti" obrisan** (F2/0)

#### Promijenjeno
- **Gore stoje „Moji materijali" i profil, a CTA „Počni učiti" je obrisan** (Leon: *„najbeskorisnije
  smeće koje zauzima prostor gore. Gore treba biti profil i UGC."*). CTA je bio **duplikat** — i bez
  njega landing nosi tri `.start-trigger`-a, a kartica „Kreni učiti" stoji ≈400 px ispod trake.
  ⚠️ **Ovo OKREĆE T2**, koji je „Moje materijale" odande maknuo (*„taj gumb je na landingu i na profilu
  i to je DOVOLJNO"*); komentar u `css/topbar.css` koji je to tvrdio je prepisan, ne zaobiđen.
- **Zatvorena je cijena zapisana u specu §9.6:** iz unutrašnjosti aplikacije (katalog, lekcija, učenje,
  Studio) u vlastito gradivo se išlo SAMO preko landinga ili profila. Sad se ide izravno, sa svake stranice.
- **S CTA-om je otišao i prag od 360 px** — postojao je samo zato što je engleski „Start studying"
  (126 px) prelijevao traku ondje gdje je hrvatski (103 px) nije.

#### Popravljeno
- **Gumbi u traci se na telefonu mogu pogoditi prstom: 44×44 px** (bilo **35×40** i **32×40**, izmjereno
  na 320/360/375/393/430). Kvar je **stariji od ove cigle** — `#authNavBtn` je takav i na produkciji —
  ali se dotad nije vidio jer je traka imala jedan gumb koji se rijetko tapka. Visina stane u traku od
  56 px, pa `--chrome-h` i budžet kroma (T3) ostaju netaknuti.
- **`check:docs` više ne pada u svježem klonu** (preneseno s parkirane grane, `3bfe40a`): gitignoriran
  artefakt `tests/.auth/admin.json` nije duh-datoteka. ⚠️ Bez ovoga `main` **danas ne prolazi preflight**.

#### Brane
- **`tests/layout-guard.spec.js` je PREPISAN, ne obrisan.** Stara tvrdnja je čuvala `.topbar-cta`; nova
  čuva ono zbog čega je nastala (BUG-029): **nijedan par vidljivih gumba u traci se ne preklapa**, na 33
  širine × 2 jezika. Stari test taj kvar zapravo ne bi uhvatio — mjerio je vlastiti okvir jednog gumba,
  a preklop je odnos dvaju. **Obrnuto provjereno:** ubačen `margin-left: -20px` → brana crvena na točnoj
  tvrdnji („gumbi u traci se preklapaju @ 320px / en"), pa vraćeno → zelena.
- Ulaz u katalog (vrata u herou) traži se sad **bezuvjetno**, na svakoj širini — prije samo ispod praga.
- `a11y` je uhvatio pravi kvar: ispod 559 px oznaka odlazi pa je gumb ostao **bez pristupačnog imena**
  (`button-name`, critical). Ime i vidljivi tekst od sada čitaju **isti ključ** `lnav.materials`.
- **`tests/materials-entry.spec.js` je okrenut u drugom prolazu** — dvije tvrdnje ondje su doslovno
  kodirale T2 (*„ulaz u materijale NIJE u traci"* i klik na CTA u traci). Sad tvrde suprotno i **strože
  nego prije**: ulaz je u traci **točno jedan** (dva bi se natjecala i vratila kvar koji je K2b uklonio),
  stoji na svakoj stranici, **stvarno vodi na policu iz dubine aplikacije**, a stari put preko landinga
  nije izgubljen. ⚠️ **Ovo je CI našao, ne ja** — moja pretraga referenci gađala je `topbarStart` i
  `topbar-cta`, a taj spec koristi `.topbar .start-trigger` i `[data-goto-materials]`, pa ga nijedan
  uzorak nije mogao vidjeti; lokalno „43 prošlo" bilo je istinito, ali o podskupu koji je odabrala
  ta ista slijepa pretraga.

## 2026-09-08 (OPUS) — **BUG-046: pilula kategorije pada AA na obojenoj kartici · ⑦ je NEVIN — crveni CI je bila kocka, ne regresija**

Leon: *„pregledaj i analiziraj problem detaljno."* Presuda od 07.09. („CI je crven, uzrok je ⑦") **oborena je protučinjeničnim
pokusom**, a ispod nje je nađen pravi kvar — stariji od cigle i **živ na produkciji**.

**Što je izmjereno** (isti test, `tests/a11y.spec.js:42`, iPhone-SE-375): grana `f75b2d7` = **3 pada / 6 pokretanja**, i to u dvije
različite boje; **produkcija `c53c28c` = 12/12 zeleno**; `git diff e223b05 fb49d4d -- css/` = samo ⑦ blok. Sonda kroz cijeli špil na
obje strane vraća **bit-identične boje** (tamna tinta, pilula = 20 % iste tinte preko pune ispune akcenta) — dakle kvar je isti, a
razlikuje se samo **što axe uspije izmjeriti**: produkcija `incomplete — „background color could not be determined because it is
overlapped by another element"`, grana `violation 3.46`. Taj zaklon je **naličje u `preserve-3d` koje prekriva lice u hit-testu** —
isto ono zbog čega iOS nije dovodio dodir do skrolera (F1/12 ④). ④/⑤ su ga maknuli, pa je **brana progledala, nije se pokvarila**.

**Zašto nasumično:** špil se miješa bez sjemena, a 24 od 56 kartica marketinga M1 nosi boju koja pada = **42,9 %** pokretanja.
„Zeleno na `e223b05`, crveno na `fb49d4d`" bila je kocka. **⑦ se ne vraća.**

**Kvar (BUG-046):** `.card-category` miješa `color-mix(currentColor 20%)`, dakle 20 % ISTE tinte kojom je i tekst — na punoj ispuni
akcenta (C2) tamna tinta zatamni podlogu ispod tamnog teksta. `#8b5cf6` → `#6f4ac5` = **3,46** · `#ec4899` → `#bd3a7a` = 4,05;
kroz cijelo gradivo **11 od 20 boja pada**, najgori `#6366f1` = **3,31** (treba 4,5). Vrijedi i na stolnom.

**Popravak:** pilula miješa **SUPROTNU** tintu (`[data-ink="dark"]` → `--color-on-tint-light` i obratno) — 0 pada, najgori omjer
**6,61**; kartica bez boje ostaje netaknuta (fallback-ugovor M3b). **Brana:** `tests/unit/card-tint-contrast.test.js` (10 tvrdnji)
čita postotak i tokene iz CSS-a, prag iz `js/utils.js` i boje iz `data/**` — **deterministično, bez preglednika**, jer a11y-suita
ovisi o miješanju špila i ovo hvata tek svako drugo pokretanje. **Dokazi:** obrnuto na starom pravilu = 2 crvene tvrdnje koje imenuju
9 boja · a11y-suita **20/20 u 10 uzastopnih pokretanja** (prije popravka 3 pada / 6) · preflight EXIT 0.
**Gdje se vidi:** `feat/tinder-kadar` (preview) — **nije na produkciji**, gdje kvar i dalje stoji dok Leon ne odluči o deployu. **Cherry-pick na `main`-kandidat 12.09. (RASPORED §0 korak 5).**

## 2026-09-07 (OPUS) — **Mjerenje aktivacije i povratka: `SokratMetrika` u `js/consent.js` + jedna kuka u `switchSection()`**

Do danas se mjerio **samo dolazak**: `gtag('config')` pošalje pregled stranice i mjerenje je gotovo, a Vercel Web Analytics je ugašen
(404 na projektu). GA4 pokazuje ~500 pregleda u tjedan dana, ali nijedna brojka ne razlikuje posjetitelja koji je otišao od onoga koji je
**počeo učiti**, ni njega od onoga koji se **vratio drugi dan**. Val korisnika dolazi s početkom fakulteta → bez ovoga listopad prolazi bez traga.
Dodana su dva događaja, oba kroz **isti gate pristanka** kao GA i Sentry: **`ucenje`** (način + predmet) šalje ga `switchSection()` —
jedino grlo kroz koje se ulazi u svaki mod, pa instrumentacija ne dira deset datoteka; **`povratak`** (`dan`, `od_prvog`) broji **različite
dane** iz `localStorage` (`sokrat-dani`). ⚠️ **Dani se broje TEK nakon pristanka** — brojač kroz vrijeme je isto što i kolačić; tko odbije,
u brojci ne postoji. Svjesna cijena, zapisana uz kod. Isti dan × više učitavanja = isti `dan` (mjeri se korisnik po vrijednosti, ne broj događaja).
Brana: `tests/unit/metrika.test.js` (27 tvrdnji: curenje kroz gate · zapis bez pristanka · brojanje po danu, ne po učitavanju · pokvaren
zapis · privatni način · kuka statički u izvoru). **Obrnuto provjerena dvjema mutacijama:** uklonjen gate → 4 crvene; uklonjena kuka → 2 crvene.
Preflight EXIT 0, bump. **Gdje se vidi:** grana `feat/mjerenje-aktivacije` (preview); produkcija `c53c28c` bez toga — dok se ne deploya, mjerenja nema.

## 2026-09-06 (FABLE) — **Birač tema: natpis je samo „Automatski" — sufiks s temom uređaja otpada** (RASPORED §6/7, odluka (a))

Leon (06.09., slika profila na tamnom telefonu): *„glupo je imati ovu Automatic · Carbon, uopće ne kužim koji je
smisao toga."* F1/3 je gumbu dopisivao ` · ` + ime teme koju uređaj TRENUTNO bira, uz obrazloženje *„inače je gumb
obećanje bez sadržaja"* — a posljedica je bila da na tamnom uređaju „Automatic · Carbon" stoji odmah do gumba
„Carbon" i čita se kao **peta tema**, dakle kao duplikat. Sad je natpis točno **„Automatski" / „Automatic"**;
**gumb OSTAJE** — on je jedini način da se jednom napravljen izbor poništi i da se praćenje uređaja vrati. Što gumb
radi kaže **opis iznad birača** (`profile.appearanceDesc`: *„Automatski prati uređaj, kao i naši mailovi"*), pa je
objašnjenje na jednom mjestu umjesto na dva. Usput popravljen i **rezervni (fallback) tekst** tog opisa u
`js/profile.js` — glasio je *„Pick a theme…"* i uređaj nije spominjao, pa bi stranica bez `i18n.js` gumb ostavila
neobjašnjenim. Znanje o uređaju (`window.__sokratTemaUredjaja`, `boot.js`) **nije dirano** — čeka F1/12 ⓪.
Brana: `tests/unit/theme-picker-label.test.js` — 18 tvrdnji, birač se **stvarno crta** u `vm`-pješčaniku (tamni i
svijetli uređaj, HR i EN, bez rječnika, izabran `carbon`) uz dvije ograde u izvoru; obrnuto kroz staro stablo =
**11 crvenih**. Preflight EXIT 0, bump.
**Gdje se vidi:** grana `feat/nocna-b` → spaja se u `feat/tinder-kadar`; produkcija `c53c28c` bez toga.

## 2026-09-06 (FABLE) — **`check:docs` je padao u svakom svježem klonu: generiran i gitignoriran artefakt nije duh-datoteka**

Nađeno usput, pri prvom preflightu u novom `git worktree`-u: `check:docs` je prijavio **DUH-DATOTEKA →
`tests/.auth/admin.json`**, a to je sesija koju `npm run test:authed` TEK proizvede i koju `.gitignore` drži izvan
repozitorija. Na stroju gdje su ti testovi jednom vrćeni datoteka postoji, drugdje ne — pa je brana **prolazila
točno ondje gdje je napisana, a padala svugdje drugdje**, bez ijednog kvara u repozitoriju. Brana koja ovisi o
povijesti stroja ne mjeri repozitorij, a ova je uz to i **zadnja mreža pred `main`** (pre-push hook vrti preflight).
Popravak: prije presude se pita **git** (`git check-ignore --stdin`, jedan poziv za sve kandidate) — što `.gitignore`
pokriva, to repozitorij i NE SMIJE imati; ako gita nema, ne prašta se ništa (pada zatvoreno). Popis imena u skripti
namjerno nije uzet — razišao bi se pri prvom sljedećem artefaktu (ADR-027).
Brana: `tests/unit/check-docs-gate.test.js` (6 tvrdnji u lažnom stablu: gitignoriran nije duh · obrisan jest · točno
jedan duh · **bez `.gitignore`-a oba** = dokaz da se git stvarno pita · bez gita oba; obrnuto na starom `check-docs.js`
= **2 crvene**). Preflight EXIT 0 (dotad 1). Bez bumpa — `scripts/**` i `tests/**` nisu na posjetiteljevu putu.
**Gdje se vidi:** samo u branama, grana `feat/nocna-b` (nijedna korisnička datoteka nije dirana).

## 2026-09-06 (FABLE) — **F1/9: kartice kao Tinder-špil na dodiru — palac desno = znam, lijevo = ne znam · špil od tri · strelice kao stolni pandan**

Leon (05.09.): *„na mobitelu bi napravio za kartice kao tinder način"*; (06.09., usred rada): *„samo na mobitelu … ali ako imaš viziju
probaj nešto"*. Do sada u modovima učenja nije bilo nijedne dodirne geste. Sad `#flashcard` na DODIRU (samo `pointerType === 'touch'`)
prati prst: povlačenje iznad praga (trećina širine, najmanje 90 px) = let van ekrana pa upis kroz **postojeći `markKnown` /
`markUnknown`** (jedini put upisa — brana to broji), ispod praga = povratak, dodir bez pomaka = okreni kao i dosad; dvije **sjene špila**
u boji sljedećih kartica (samo `pointer: coarse`); **pečati** „Znam / Ne znam" rastu s prstom (puna ispuna, ADR-032; `visibility` u
mirovanju). **Strelice** → / ← / razmak na stolnom = isti tok bez klika, samo u modu kartica i nikad iznad polja, gumba ili modala.
`touch-action: pan-y` na kartici i na licu/naličju je jedino odstupanje od reseta F1/11 (štipanje ostaje ugašeno). `prefers-reduced-motion`
= bez leta. Bez biblioteke: JS piše tri CSS-varijable i tri klase, crtanje je u `flashcards-section.css`.
**Dva nalaza koje je dao samo pravi dodir:** `touch-action` se čita do PRVOG skrolera (lice/naličje su skroleri → pravilo samo na
`.flashcard` nikad ne dođe na red, `pointercancel` na prvom pomaku) · Chromium poslije brzog zamaha potisne `click` sljedećeg dodira
(izmjereno na goloj stranici) → okretanje na dodir ide na `pointerup`, ne na `click`.
Brane: `tests/unit/flashcard-swipe.test.js` (78 tvrdnji; obrnuto kroz `git worktree` 48 crvenih) · `tests/flashcard-swipe.spec.js` (PRAVI
dodir kroz CDP `Input.dispatchTouchEvent` na 4 iPhone profila, uklj. protučinjenično: reset `pan-x pan-y` samo na `.flashcard` ne mijenja ništa, na licu/naličju gasi gestu).
Preflight EXIT 0, bump. **Gdje se vidi:** grana `feat/racun-r1` (preview); produkcija `c53c28c` bez toga. **F1 uređaj time ima sve cigle
isporučene**; presude s iPhonea (štipanje · `?bez=` · palac) i deploy = Leonova riječ.

## 2026-09-06 (FABLE) — **F1/5: pravne stranice prate uređaj — `boot.js` + `data-theme` na `contact/faq/privacy/terms`**

Od F1/3 aplikacija bez izbora prati uređaj, a četiri pravne stranice nisu imale ni `data-theme` ni `boot.js`: korisnik na
tamnom telefonu dobivao je crn katalog i **bijela Pravila privatnosti** jednim klikom iz footera. Popravak je isti mehanizam
kao na `index.html` — `<html data-theme="academic">` + **sinkroni `boot.js`** na vrhu `<body>` (prije prvog crtanja); ništa
novo u CSS-u, jer `tokens.static.css` sve teme već nosi, a `legal.css` je od MREŽE bez ijednog heksa. Brane:
`theme-boot-order.test.js` traži boot na SVAKOJ stranici (dotad je preskakao one bez birača — rupa; obrnuto 8 crvenih) ·
`tests/legal.spec.js` +2 mjere ISCRTANO (dark → `carbon`, light → `academic`, `color-scheme`, pozadina `<body>` == token
teme) · `check:contrast:live` +4 pravne rute (4 × 4 teme, 0 ispod praga). Preflight EXIT 0, bump.
**Svjesno NE:** `viewport-fit=cover` na pravnim (nema safe-area razmaka) · prijevod F3/1 (to je F3, ne poliranje).
**Gdje se vidi:** grana `feat/racun-r1` (preview); produkcija `c53c28c` bez toga.

## 2026-09-06 (FABLE) — **F1/4: popis tema ima JEDNO mjesto (`scripts/teme.js`) — a11y-brana prvi put skenira `carbon`**

Četiri brane su „koje teme postoje" čitale na četiri načina: statička `check-contrast.js` regexom iz `tokens.css`
(točno), živa `check-contrast-live.js` iz **zakucanog niza** (slučajno točno), `tests/helpers/axe-gate.js` iz zakucanog
niza s **mrtvim `paper`** i **bez `carbon`** (a11y-suita je pet dana skenirala temu koje nema i preskakala jedinu novu
tamnu — zelena cijelo vrijeme), `theme-boot-order.test.js` vlastitim regexom. Sad **`scripts/teme.js`** čita
`:root[data-theme="…"] {` blokove iz tokena (bez komentara — pouka F1/7 ②; nula tema = **baca**, ne vraća `[]`), a sva
četiri čitatelja idu kroz njega; `boot.js` zadržava svoj niz jer se vrti prije CSS-a, i test ga drži jednakim modulu.
Brana `tests/unit/theme-list.test.js` (24 tvrdnje; obrnuto kroz `git worktree`: 9 crvenih na starom stablu).
**Dokaz:** `a11y.authed.spec.js` 3/3 s `[carbon]` na svih 7 ploha, 0 nalaza · `check:contrast:live` 13 ruta × 4 teme iz
tokena, 0 ispod praga · preflight EXIT 0. **Gdje se vidi:** samo u branama (nijedna korisnička datoteka nije dirana;
grana `feat/racun-r1`). Bez bumpa — `scripts/**` i `tests/**` nisu na posjetiteljevu putu.

## 2026-09-06 (FABLE) — **BUG-045: Service Worker nikad nije spremao runtime assete — skinut predmet se offline otvarao prazan**

- **Uzrok (izmjeren u živom SW-u):** `res.clone()` unutar `.then(caches.open)` stizao je kad je stranica već potrošila tijelo → `TypeError`, progutan `.catch(() => {})`. Od F3 3A u runtime kešu je bio samo precache; „offline radi" značilo je „HTTP-keš preglednika ima datoteke", a iOS ga izbacuje.
- **Popravak:** klon sinkrono prije `caches.open` (asseti i navigacija) · `download()` piše „ready" tek kad je paket načina učenja zagrijan · `zagrijPoslijeDeploya()` jednom po verziji za sve s police.
- **Brane:** `sw.spec` mjeri da je zatražena skripta U KEŠU (ne dojam) · `offline-study.spec` hladno otvaranje bez mreže i bez HTTP-keša (CDP) · `offline-store.test.js` +3. Obrnuto na starom `sw.js`: oba speca crvena.

## 2026-09-05 (FABLE) — **Matura = vizija (VISION.md §8) · RAD.xlsx se puni automatski svaki dan (`scripts/rad-dnevno.ps1`)**

Dvije Leonove odluke iste večeri. **① Matura:** *„mature ne diramo, to je vizija"* → odjeljak u
[VISION.md](../product/VISION.md) §8 (što bi bila, zašto je vizija, kad bi se otvorila), RASPORED §5 pokazuje onamo;
bez datuma, jer `check:docs` drži `product/` bez kronologije. Ne dobiva spec, ciglu ni fazu. **② Analiza rada:** *„excel
se popunjava na kraju svakog dana, to treba biti automatski"* → Windows Task Scheduler „Sokrat RAD.xlsx" svaki dan u
23:45 zove `scripts/rad-dnevno.ps1`: generator → ako se knjiga promijenila, `git commit -- docs/records/RAD.xlsx` na
tekuću granu (nikad na `main`, nikad push); dnevnik `.jank/rad-dnevno.log`; propušten dan ili otvoren Excel nadoknadi
sljedeći prolaz (generator čita cijeli git). Prvi prolaz odmah: 123 commita · 89 isporuka · 11 faza · 21 vizija · 8
grafova → `cbaf4d2`. Ukloni: `schtasks /Delete /F /TN "Sokrat RAD.xlsx"`.

## 2026-09-05 (FABLE) — **F1/11 ②: štipanje s dva prsta gasi JS (`js/no-zoom.js`), jer Safari metu i `touch-action` ne sluša** (ADR-034)

Leon na iPhoneu poslije F1/11 ①: dodir u polje i dvostruki dodir *„više ne, sređeno je, good job"* — ali *„ja bi da maknemo
mogućnost zumiranja kompletno, da se ne može zumirat ni kada korisnik pokuša — sa dva prsta."* Meta `user-scalable=no`
Safari za štipanje ignorira od iOS-a 10, a `pan-x pan-y` ga na uređaju nije zaustavio. Ostaje jedini sloj koji WebKit
sluša: **`js/no-zoom.js`** — `gesturestart` / `gesturechange` + `touchmove` sa `scale !== 1` → `preventDefault()` uz
`passive: false`; veže se SAMO gdje `GestureEvent` postoji (Chrome/Android slušaju metu, nepasivan `touchmove` bi im badava
usporio skrol); jedan prst (`scale 1`) se ne dira. Vlastita datoteka s `defer` na svih 6 stranica — pravne nemaju `boot.js`,
pa kopija u dva mjesta nije opcija (ADR-027) i F1/5 nije preduvjet. Brana: `touch-zoom.test.js` ③ (6 stranica × tag, sandbox
7 tvrdnji), preflight EXIT 0. **Gdje se vidi:** grana `feat/racun-r1` (preview); produkcija `c53c28c`. **Presuda = Leon, dva prsta.**

## 2026-09-05 (FABLE) — **F1/7: landing se više ne preboji pri skrolu (`fixed` → `scroll`) + `?bez=` prekidač za A/B na iPhoneu**

Leon (04.09.): *„kada se scrolla mora biti savršeno smooth kao da si na najnovijem iPhoneu"*; F1/6 je izmjerio
JEDINU rutu koja preboji ekran i jedini uzrok. Dva commita:
- **① `css/landing.css`** (`9139d6f`): `background-attachment: fixed, fixed, scroll…` → `scroll`. Zrno i odsjaj
  ostaju (brana to tvrdi), samo putuju sa slojem umjesto da se precrtavaju svaki kadar. `jank-probe`, landing,
  kontrola, isti dan: **paint 240 / 532,7 Mpx → 0 / 0, ispušteni kadrovi 94 → 0.** Brana u `test:unit`:
  `tests/unit/no-fixed-background.test.js` (bundle + izvor; obrnuto 2 crvene).
- **② `?bez=` prekidač** (iPhone instrument ne vidi — Safari `fixed` crta kao `scroll`, headless ne skrola prstom):
  `css/bez.css` (novi modul: `[data-bez~="zamucenja|sjena|prijelaza|pozadine"]`, `!important` namjeran i
  imenovan za F4/3, inertan bez atributa) · `js/boot.js` PRIJE prvog crtanja upiše `data-bez` iz `?bez=` (sanirano,
  nadživi `replaceState`) · `scripts/jank-probe.js` **više nema vlastitu tablicu zabrana** — čita popis iz
  `bez.css` i postavlja isti atribut (ADR-027). Dokazi: `bez-switch.test.js` 26 tvrdnji (obrnuto na HEAD-u 5
  crvenih) · živa provjera: zamućenje 5 → 0, sjene 27 → 0, prijelazi 187 → 0, pozadina → `none`, kontrola
  netaknuta, `?bez=nepoznato` inertno · `jank-probe` 5/5 scenarija kroz atribut, paint 0/0 · preflight EXIT 0.

**Gdje se vidi:** grana `feat/racun-r1` (preview); produkcija ostaje `c53c28c`. **Presuda glatkoće na iPhoneu =
Leon, s prekidačem:** `?bez=zamucenja` · `?bez=sjena` · `?bez=prijelaza` · `?bez=pozadine`.

## 2026-09-05 (FABLE) — **F1/11: ništa ne zumira — meta na 6 stranica + `touch-action: pan-x pan-y` + imenovano isključenje u a11y-brani** (ADR-034)

Leon poslije deploya `c53c28c`: *„Stranica uopće ne bi trebala imati mogućnost da se nešto povećava ili smanjuje na
njoj ikako."*, pa: *„Ovo što mi se dešava je svugdje, nije samo na Safariju, kreni."* Tri sloja:
- **Meta** na svih 6 stranica: `minimum-scale=1.0, maximum-scale=1.0, user-scalable=no` (Chrome/Android slušaju,
  Safari za štipanje ne). Pravne stranice **bez** `viewport-fit=cover` — `legal.css` nema safe-area razmaka, cover bi
  gurnuo tekst pod izrez; sprega meta ⇔ safe-area je tvrdnja u testu.
- **Reset** `touch-action: manipulation` → **`pan-x pan-y`** (`variables.css` + `legal.css`): skrol ostaje, dvostruki
  dodir i štipanje otpadaju. iOS-sloj je bio jedan redak, ne novi mehanizam; drži li štipanje zna samo iPhone (BUG-043).
- **a11y-brana:** axe `meta-viewport` (AA) na ovu metu pada — obrnuto provjereno (landing crven). Dodano
  **`ISKLJUCENO_ODLUKOM`** u `tests/helpers/axe-gate.js`: jedno imenovano isključenje s razlogom ADR-034; pravilo se
  i dalje vrti i ispisuje kao `[a11y-odluka] ISKLJUČENO`, ne nestaje. Ne u osnovicu (ona je za kvarove koji trebaju
  nestati i ključa po površini — bilo bi deset redaka istog razloga).

Brane: `touch-zoom.test.js` prepisan (35 tvrdnji; obrnuto kroz `git worktree`: 13 crvenih na starom stablu) ·
`a11y-gate.test.js` +5 (isključenje po id-u, ne po razini) · a11y-suita 7/7 · preflight EXIT 0.
**Gdje se vidi:** grana `feat/racun-r1` (preview); produkcija ostaje `c53c28c`. **Presuda štipanja = Leon na iPhoneu.**

## 2026-09-05 (FABLE) — 🚀 **F1/10 + F1/8 ① + F1/8 ② NA PRODUKCIJI** (`c53c28c`, Leonov uvjetni OK: *„Kada brana završi i svi testovi prođu deployaj"*)

Uvjet je bila puna responsive suita (pravilo #4, do tada vrćena samo djelomično): **571 prošlo · 0 palo ·
117 preskočeno**, 24 min. Zatim fast-forward `feat/racun-r1` → `main` preko refspeca (`8b70c15..c53c28c`),
pre-push kuka vrtjela preflight → EXIT 0. Vercel: produkcijski deployment `dpl_Dw1caqN4fhLXEpzCbsudu47JwD89`
za `c53c28c`, **READY**; uživo potvrđeno jednim sporim zahtjevom: token `20260905174602` na
www.sokratstudy.com. Na produkciji su sada: zoom na dodir (F1/10: polja 16 px kroz `(pointer: coarse)`,
`touch-action` u resetu, brana ⑨) · hover samo gdje hover postoji (F1/8 ①, Leon na iPhoneu: *„Ne svijetli,
odlično"*) · hover na mišu tek poslije pomaka (F1/8 ②) · `check:hover` u preflightu · `hover-probe` ·
`hover-arm.test.js` · svi zapisi. ⚠️ Dvostruki dodir na iPhoneu (dio F1/10) ostaje Leonova presuda —
nemjerljiv u headlessu.


## 2026-09-05 (FABLE) — **F1/8 ②: hover na mišu se naoruža tek prvim pomakom** (ljepljivi hover zatvoren na oba ulaza; BUG-044 riješen)

### Popravljeno
- **Poslije klika koji mijenja stranicu ili razinu kataloga ništa ne svijetli pod nepomičnim mišem dok se
  miš ne pomakne** (Leon: *„gumb koji je stajao na mjestu starog gumba isto svijetli po rubovima a nije ga
  se diralo"*). Na mišu je to bilo STANDARDNO ponašanje preglednika — hover se računa po položaju
  pokazivača, ne po pokretu — pa ① (medij) ondje nije mogao pomoći. **JS:** `pauzirajHover()` u `js/utils.js`
  stavi `data-hover-paused` na `<html>`, prvi **`pointermove`** ga skine (ne `mousemove` — dodir ga šalje,
  izmjereno; `once` + `passive`, idempotentno). Zovu ga `navigateTo` **i `browseNaRazinu`** — browse-prelazi
  (fakultet → smjer → godina) NE idu kroz `navigateTo`, a to je Leonov točan scenarij; plan iz memorije ga
  je previdio, sonda ga je našla. **CSS:** isti prolaz `scripts/hover-css.js` svakom hover-selektoru doda
  prefiks **`:where(:root:not([data-hover-paused]))`** (nula specifičnosti → kaskada ista), i onima koja
  su već pod hover-medijem (Tailwindov `hover:`) — njima samo prelude na mjestu; idempotentno; `html:hover`,
  `:root …:hover` i `&:hover` ruše build (prefiks ih ne bi pogodio ili bi promijenio značenje). **142/142
  selektora** s prefiksom; `consent.css` ručno (traka je na `index.html`), `legal.css` bez (pravne stranice
  nemaju ruter).
### Dodano
- **`scripts/hover-probe.js --profil=prelaz`** (Chromium, miš): KONTROLA (kartica pod mišem PRIJE klika ima
  hover-izgled — inače sonda ne dokazuje ništa) · bez pomaka poslije prelaska · pomak 1 px. **Prije: ljepljivo
  2/2 · poslije: mirno 2/2 + hover se vraća prvim pomakom 2/2** (`pauza=true` → `false`).
- **`tests/unit/hover-arm.test.js`** (28 tvrdnji, `test:unit`): `pauzirajHover` u `vm` pješčaniku (okidač
  `pointermove`, `mousemove` NE naoružava, jedan slušač, ponovno naoružavanje), šav u `navigation.js`
  (obrnuto: na `HEAD` obje funkcije bez poziva), CSS-modul na uzorku (cijepanje liste, prefiks na mjestu,
  idempotentnost, `naoruzaj: false`, četiri ruba koji ruše build).
- `check:hover` traži i prefiks (bundle + consent). Obrnuto: na starom bundleu **134 nenaoružana pravila** → 0.
- Dokazi da miš NIJE izgubio hover: `hover-probe --profil=mis --usporedi` **0 razlika** na 38 elemenata (20 i
  dalje mijenja izgled); `css:diff` `#/subjects` + `#/about` × 3 širine = **7 161 usporedbi, 0 razlika**; WebKit
  dodir i dalje mirno 2/2; `browse.spec` + `back-model.spec` 7/7; preflight EXIT 0.

## 2026-09-05 (FABLE) — **F1/8 ①: `:hover` samo gdje hover postoji** (ljepljivi hover na dodiru; ② miš čeka)

### Popravljeno
- **Poslije dodira koji mijenja rutu ništa više ne svijetli pod prstom** (Leon: *„gumb koji je stajao na
  mjestu starog gumba isto svijetli po rubovima a nije ga se diralo"*, *„od početka"*). Svako `:hover`
  pravilo u bundleu sada stoji u **`@media (hover: hover)`** na istom mjestu kaskade — na mišu se ne mijenja
  ništa, na dodiru pravilo ne postoji. Radi to **`scripts/hover-css.js`** u `build:css`, POSLIJE Tailwinda:
  **lightningcss** (Tailwindov motor, sad pinan kao izravna ovisnost `1.32.0`) CSS **parsira** i daje `loc`
  + pretke svakog pravila, a prepisuje se **tekst** bundlea — vraćanje stabla u Rust puca (`Specifier`) i
  promijenilo bi svaki bajt (`blue` → `#00f`), pa bi `css:diff` mjerio šum. Liste selektora se **cijepaju**
  (`.a:hover, .b:focus-visible` → fokus ostaje vani), pravila već pod medijem koji spominje hover se
  preskaču, `:hover` unutar `:not()/:is()/:where()/:has()` **odbija build** (mijenja značenje; danas 0).
  **130 pravila / 142 selektora** zamotano, 0 izgubljeno (modul to sam obrnuto provjerava).
- `css/legal.css` i `css/consent.css` nisu u bundleu → omot **ručan** (2 + 2 pravila).
### Dodano
- **`npm run check:hover`** (preflight): nijedan `:hover` u bundleu + legal/consent izvan hover-medija;
  isti parser kao build, ispisuje doseg. Obrnuto: na starom bundleu **130 golih**.
- **`scripts/hover-probe.js`** (izvan preflighta, traži WebKit + poslužitelj): profil **dodir** = Leonov
  opis riječ po riječ (dodir kartice → nova ruta → što je pod istim prstom) — **prije: ljepljivo 2/2
  prelaska, poslije: mirno 2/2**; profil **miš** (`--out`/`--usporedi`) = izgled 38 elemenata na 3 rute u
  mirovanju i pod mišem — **0 razlika prije/poslije, 20 elemenata i dalje mijenja izgled** (hover na mišu
  živ, ne samo „ne smeta").
- `css:diff` (`#/subjects` + `#/about` × 3 širine = 7 161 usporedbi, pravi Chromium, radno stablo vs `831d905`): 0 razlika (2 rute × 3 širine, 7 161 usporedbi).
### Nije dirano
- `@media (hover: none) { …:hover { transform: none } }` reset-pravila (`flashcards`, `quiz`, `policies`)
  postala su mrtva — ostaju za F4 (čišćenje), ne diraju ništa.
- **② miš** (hover se naoruža tek prvim `pointermove` poslije rute) = sljedeća cigla.

## 2026-09-05 (FABLE) — **F1/10: zoom na dodir** (Leonov treći nalaz; popravak + dvije brane)

### Popravljeno
- **Dodir ne zumira** (Leon: *„kada se više puta takne na jedno mjesto može se zoomat"*), dva uzroka,
  oba u resetu `css/variables.css`: ① **`touch-action: manipulation` na `*`** gasi Safarijev dvostruki
  dodir, skrol i štipanje ostaju (`user-scalable=no` odbačen — uzeo bi štipanje); isti redak u
  `css/legal.css` (pravne stranice nemaju bundle). Dva lokalna primjerka (`.flashcard`, slijepa karta)
  maknuta — jedna činjenica, jedno mjesto. ② **Polja ≥ 16 px na dodiru** kroz
  `@media (pointer: coarse)` — iOS pri fokusu polja s manjim fontom sam zumira. ⚠️ **Do sada je isto
  „štitilo" pravilo iza `@supports (-webkit-touch-callout: none)` s `!important`** — njuškanje motora
  koje NIJEDAN motor naših brana ne zadovoljava (Chromium i Playwrightov WebKit: `CSS.supports` =
  false), pa je godinu dana bilo **nemjerljivo**: sonda je vidjela **15,2 px** na svih deset polja
  prijave i **14,4 px** na pretrazi kataloga, a je li iPhone zaista dobio 16 px nije znao nitko.
  Novo pravilo tuče klase komponenata specifičnošću (`:is()` + dva `:not()` = 0,2,1), bez `!important`.
### Dodano
- **Tvrdnja ⑨ telefonske brane** (`tests/helpers/phone-gate.js`, u OBJE suite): nijedno tekstualno
  polje u DOM-u — ni skriveno, jer zatvoreni modal prijave je sutrašnje dotaknuto polje — s
  izračunatim fontom < 16 px. **Obrnuta provjera na starom bundleu: 11 polja × 13 ekrana × 4 širine
  crveno; s popravkom 0**, ostalih deset tvrdnji nedirnuto.
- **`tests/unit/touch-zoom.test.js`** (u `test:unit`): čita BUNDLE — `*` nosi `manipulation` točno
  jednom, `legal.css` isto, `(pointer: coarse)` daje 16 px bez `!important`, i njuškanje se ne vraća.
  Obrnuto: na starom bundleu 6 od 9 tvrdnji crveno.
- **`.jank/probes/polja-sva.js`** (gitignored): sva polja po 13 ruta u oba motora — prije/poslije:
  točno 11 polja poraslo na 16 px, ostala 52 nepromijenjena, identično u Chromiumu i WebKitu.
### Popravljeno u brani
- **`tests/phone.authed.spec.js` mjerio je telefon s MIŠEM**: kontekst je imao samo `viewport`, bez
  `hasTouch`/`isMobile` — pa je ⑨ iza prijave prvo pokazala 15,2 px na poljima koja su na pravom
  telefonu 16 px. Izmjereno: `(pointer: coarse)` pali **`hasTouch`**, `isMobile` sam ne. Kontekst sad
  isti kao u javnoj suiti; svih 12 tvrdnji zeleno, nijedan novi nalaz u ①–⑧.
### Nije mjerljivo ovdje
- Dvostruki dodir izvodi Safarijev UI-proces, ne stranica (24 mjerenja, `visualViewport.scale` = 1
  uvijek) → **presudu daje Leon na iPhoneu** (preview grane). Zapis: BUG-043.

## 2026-09-05 (FABLE) — 🚀 **F1/1 + F1/2 + F1/3 + F1/6 NA PRODUKCIJI** (`8b70c15`, Leonov izričit OK: *„Možeš deployat sve"*)

Fast-forward `feat/racun-r1` → `main` preko refspeca (`e8f1651..8b70c15`, devet commita), pre-push
kuka vrtjela preflight → EXIT 0. Vercel: produkcijski deployment `dpl_Pbx2Q4a9k9WoDam9fU5omoFbvAmM`
za `8b70c15`, **READY**; uživo potvrđeno: token `20260905001021` na www.sokratstudy.com. Na
produkciji su sada: svijetla tema u boji znaka (F1/1) · tema `carbon` (F1/2) · prvi kadar prati
uređaj + „Automatski" u biraču + migracija starog `academic` zapisa (F1/3) · `scripts/jank-probe.js`
i popravljeni kaskadni test · `docs/records/RAD.xlsx` + generator · svi zapisi. ⚠️ Za razliku od
04.09., Vercel je ovaj put izgradio produkciju za SHA koji je već imao preview — pravilo je dakle
*„provjeri `list_deployments`"*, ne *„isti SHA se ne gradi"*.

## 2026-09-05 (FABLE) — **F1/6: sonda za trzanje + ljepljivi hover izmjeren na WebKitu**

### Dodano
- **`scripts/jank-probe.js`** — mjerni instrument izvan preflighta (kao `fouc-probe`): mobilni profil
  393×852 @3x, CPU 4×, prst kao ručni niz touch-događaja (sintetička CDP gesta u headlessu ne miče
  stranicu — izmjereno 0 px), 3+3 zamaha po ruti; rAF-kadrovi, LoAF, `Paint` + prebojana površina i
  `DroppedFrame` iz tracea, layout/recalc/skripta s glavne niti; `--scenariji=bez-…` ubrizgava
  protučinjenične zabrane; **ispisuje doseg**. Izlaz u `.jank/` (gitignored).
- **Nalaz (10 ruta, 5 363 kadra):** glavna nit čista svugdje; **samo landing** preboji — 240 paintova /
  533 Mpx (≈ 70 % ekrana svaki kadar), 28–54 ispuštena kadra; protučinjenično: zamućenje, sjene i
  prijelazi ne mijenjaju ništa, **`background-attachment: fixed` je jedini uzrok** (bez njega 0 paintova,
  0 ispuštenih). Hipoteza za F1/7 u RASPORED-u; ⚠️ instrument je Chromium, iPhone (WebKit) traži A/B na
  telefonu.
- **Ljepljivi hover (F1/8) izmjeren na dva motora** (WebKit instaliran u Playwright): WebKit s dodirom
  **reproducira** Leonov opis (svaki preglednik na iPhoneu je WebKit → pitanje „koji preglednik" otpada),
  Chromium s dodirom ne; `@media (hover: none)` protučinjenično vraća karticu u mirni izgled; dodir šalje
  `mousemove` ali ne `pointermove`; 12 golih `:focus` sva na poljima za unos → treća cigla serije otpada,
  ostaju dvije (zamatanje kroz `build:css` + `pointermove`-naoružavanje za miš).

### Promijenjeno
- `docs/plan/RASPORED.md`: F1/6 ✅ · F1/7 nosi hipotezu · F1/8 prekrojen na dvije cigle · §6/6 bez pitanja
  o pregledniku. `.gitignore`: `/.jank/`. Ništa u `js/`/`css/` nije dirano.

## 2026-09-05 (FABLE) — **Analiza rada: `docs/records/RAD.xlsx` + `scripts/rad-xlsx.py`**

### Dodano
- **`docs/records/RAD.xlsx`** (Leon: *„jednu excel tablicu koliko radimo … koju ćemo stalno
  nadopunjavat"*) — šest listova: Dnevnik (jedan red po commitu iz gita od 2026-08-29, s vrstom
  rada auto/ručno, oznakom faze, +/− redaka i redcima u testovima/branama) · Isporuke (jedan red po
  unosu u PROGRESS.md) · Faze (zatvorene s datumima iz gita, F1–F7 čitane iz RASPORED-a) · Vizije
  (21 stavka sa stanjem i procjenom %) · Sažetak (tempo po danu, pet vrsta rada, 18 pokazatelja
  kvalitete i brzine, faze) · Upute. **Osam grafova.**
- **`scripts/rad-xlsx.py`** (Python, `openpyxl==3.1.5` pinano u `scripts/requirements-rad.txt`) —
  generator; pokreće se **na kraju svake faze**. Zašto skripta: openpyxl pri otvaranju gubi grafove,
  pa se sažetak i grafovi grade iznova; ručno se čuvaju samo stupac „vrsta (ručno)" (po SHA) i
  list Vizije. U tablicu ulazi **samo odrađeno**.
- Dvije ispravke prije slanja: broj cigli zatvorenih faza je **mjera** (commit s oznakom faze), ne
  procjena; „sati rada" je **git-hours proxy** (razmaci < 2 h + 0,5 h po sesiji), označen kao proxy.

## 2026-09-05 (FABLE) — **F1/3: prvi kadar prati uređaj — crno bez klika, kao mail**

### Dodano
- **`js/boot.js` bez spremljenog izbora čita `prefers-color-scheme`** prije prvog crtanja:
  tamno → `carbon`, svijetlo → `academic`. Prvenstvo (zapisano jednom, RASPORED §F1):
  račun (F2/1) > lokalni izbor > uređaj > `academic`. Zadana ostaje SVIJETLA (odluka
  2026-08-13) — crno dobiva tko ga je uređajem već tražio, ne svaki posjetitelj.
- **Birač u profilu: „Automatski · ‹tema koju uređaj bira›"** kao prva opcija; aktivan je IZBOR
  (`getThemeChoice()`), ne primijenjena tema — na tamnom uređaju je primijenjeno `carbon`, a
  izabrano ništa. `setTheme('auto')` briše izbor. Swatch pola svijetle / pola tamne, oba akcenta.
  `i18n`: `profile.themeAuto` + novi `appearanceDesc` („Automatski prati uređaj, kao i naši mailovi").
- **`theme.js` prati promjenu uređaja uživo** (iOS/Android „automatski" pri zalasku) — samo dok
  je izbor automatski; korisnikov izbor se ne gazi.
- Testovi: **`tests/unit/theme-device.test.js` (NOV)** — `boot.js` + `theme.js` u `vm` sandboxu
  s lažnim `document`/`localStorage`/`matchMedia`, 28 tvrdnji (uređaj · izbor · migracija ·
  privatni način · praćenje uživo) · `theme-boot-order` +3 (boot čita `prefers-color-scheme`,
  izlaže `__sokratIzborTeme`, **`initTheme()` NE upisuje**) · `theme-fouc.spec.js` +4 (emulirani
  uređaj dark/light · stari zapis · izbor pobjeđuje) · `fouc-probe` scenarij `uredjaj-tamni`.

### Nađeno u hodu (spec ovo nije predvidio)
- **Produkcija je na SVAKOM učitavanju upisivala primijenjenu temu u `sokrat-theme`**
  (`initTheme()`, zvano „normalizacija"). Do danas bez posljedice — a s praćenjem uređaja bi
  značilo da **nitko tko je stranicu već otvorio ne dobije crno**: svi imaju `academic` bez da
  su birali. **Migracija:** izbor od F1/3 nosi biljeg `sokrat-theme-chosen`; `academic` bez
  biljega = stari automatski upis (odbačen, pa počišćen na `DOMContentLoaded`), `chalk`/`mint`
  bez biljega = sigurno izbor (stari kod je tamnu upisao samo onome tko ju je birao) → ostaje.
  `initTheme()` od sada samo BRIŠE, nikad ne upisuje. `KEEP_LOCAL_KEYS` čuva i biljeg.
- Sandbox je **oborio moju tvrdnju u komentaru** („privatni način: tema se primijeni do
  reloada") — bez zapisa nema ni izbora, pada na uređaj (do F1/3 je padao na zadanu). Komentar
  ispravljen na istinu, test tvrdi stvarno ponašanje. Oblik-test je pak prvo pao na riječ
  `setItem` u **komentaru** — sad skida komentare prije provjere.
- **`theme-color` meta ostaje statična svijetla** (već u F4) — na tamnom telefonu je traka
  preglednika svijetla iznad crne stranice. Jedino što F1/3 nije zacrnio; prijedlog popravka
  bez druge kopije boje stoji u RASPORED §F1.

### Izmjereno
- `fouc-probe`, scenarij „tamni uređaj, ništa spremljeno": `carbon` na startu, **NIJE MIJENJANA,
  0 ms bljeska** — stolno (FCP 528 ms) i mobitel 4×CPU/Slow-4G (FCP 4264 ms). Kontrole `chalk`
  i `academic` također 0.
- `npm run preflight` EXIT 0 · `theme-fouc.spec.js` 6/6 (iPhone-15Pro-393) · birač snimljen u
  obje sheme (dark/hr: „Automatski · Ugljen" aktivan; klik Akademsko → izbor s biljegom; klik
  Automatski → `carbon`, zapis obrisan).
- Cijela `test:responsive` suita (uklj. `authenticated`): **568 prošlo · 1 palo · 114 preskočeno**
  (23.5 min). Jedini pad je **zastarjeli** `cascade.authed.spec.js`: tražio je token
  `--warning-text`, koji ne postoji ni na produkciji (ime iz stare palete; `studio.css` koristi
  `--color-warn-ink`). Nije F1/3 — popravljen zasebnim commitom, test sad čita pravi token.

## 2026-09-04 (FABLE) — **F1/2: tema `carbon` = tamna polovica maila**

### Dodano
- **Tema `carbon` („Ugljen")** — `:root[data-theme="carbon"]` u `css/tokens.css` s **doslovnim
  heksovima** iz `prefers-color-scheme: dark` bloka predložaka: `#0f1115` pozadina · `#171a21`
  kartica · `#262b36` crta · `#e6e8ee` tekst · `#9aa1b1` prigušeno. Ono što mail ne definira
  (surface-2, line-strong, ink-1, semantika, tinte gradiva, sjene) uzeto je iz `mint` — dokazana
  tamna paleta na gotovo istoj podlozi, a ova je tamnija pa se svaki omjer samo popravlja.
  **Indigo je obrnut u odnosu na `academic`:** 500 `#818cf8` (tekst 5.84) · 400 `#a5b4fc` ·
  600 `#7075f4` · `--color-on-brand: #0f1115` (bijelo na `#818cf8` bi bilo 2.98).
- Registrirana na svih pet mjesta koja temu poznaju: `js/boot.js` (`TEME` + `TAMNE`),
  `js/profile.js` (birač: ime + swatch), `js/i18n.js` (`profile.themeCarbon` en/hr),
  `css/profile.css` (swatch), `scripts/check-contrast-live.js` (zakucani popis — F1/4 ga seli).
  `tests/unit/theme-boot-order.test.js` je čuvao da `boot.js` == `tokens.css`.

### Nađeno živom branom (statička to NE MOŽE vidjeti)
- **`brand-600` se koristi kao ispuna U MIROVANJU na ~8 mjesta**, protiv ugovora tokena
  („600 = pritisak"). Prvi prolaz pao na 3 elementa: `#0f1115` na `#6366f1` = **4.23**.
  U `academic`/`chalk`/`mint` to nije bolilo jer im je 600 uvijek visokokontrastan — **carbon
  je prva tema sa srednje-svijetlim 600**. Popravak u cigli: samo carbonov 600 → `#7075f4`
  (4.98). CSS-zloporaba (dira sve teme) → **F4**, BACKLOG §CRNA TEMA.
- `check:contrast:live` **ne diže vlastiti poslužitelj** — `ERR_CONNECTION_REFUSED` znači „nema
  `serve:test` na :5050", ne kvar brane. Jutros je prošla na starom poslužitelju iz prethodne
  sesije.

### Gate
`check:contrast` **5 tema · 358 provjera** · `check:contrast:live` **0 elemenata ispod praga na
13 ruta × 4 teme** · `theme-boot-order` ✅ · `check:i18n` / `check:palette` / `check:tokens` /
`check:orphan-css` bez novog · `build:css` + `bump` · **`preflight` EXIT 0**.
`CLAUDE.md`: broj provjera vraćen na **358** (jučerašnjih 292 je vrijedilo samo bez pete teme).


## 2026-09-04 (OPUS) — **Crna tema: mail ima DVIJE palete, a izmjerio sam jednu** (zapis + plan)

### Ispravak vlastitog nalaza
- **Zapisao sam da mail vozi plohu `#ffffff`/`#f4f5f7`. Točno — ali samo za SVIJETLU polovicu.**
  Predlošci u `supabase/email-templates/` imaju `@media (prefers-color-scheme: dark)` blok
  (`#0f1115` pozadina · `#171a21` kartica · `#262b36` crta · `#e6e8ee` tekst · `#9aa1b1` prigušeno),
  pa se mail **mijenja s uređajem**. Leonov telefon je u tamnom → njemu je mail oduvijek crn.
  *Izmjerio sam jednu granu medija-upita i nazvao ju „izgledom maila".*
  ⚠️ **F1/1 time nije pogrešna nego POLOVIČNA** — poravnanje svijetle teme stoji; falila je druga polovica.

### Odlučeno
- **Stranica prati uređaj, točno kao predložak** (Leon, 2026-09-04). Redoslijed prvenstva zapisan
  jednom: **račun > lokalni izbor > uređaj > `academic`**. `chalk` i `mint` ostaju izbori;
  odluka da je **zadana svijetla** (2026-08-13) **ostaje** — crno dobiva onaj tko ga je uređajem
  već tražio, ne svaki posjetitelj.
- Plan: [RASPORED.md](../archive/RASPORED.md) §F1, sada **sedam cigli** umjesto četiri.

### Izmjereno unaprijed (da cigla ne otkriva u hodu)
- **Ljestvica indiga se na tamnom OBRĆE** — zrcalno F1/1: ondje je tekst tražio tamniji indigo,
  ovdje traži svjetliji. Na `#171a21`: `#4f46e5` = 2.77 (pada i za plohu) · `#6366f1` = 3.90
  (ploha da, tekst ne) · **`#818cf8` = 5.84** ✅ · `#a5b4fc` = 8.73.
- **I tinta NA ispuni se obrće:** bijelo na `#818cf8` = 2.98 (pada), `#0f1115` na njemu = 6.33 →
  `--color-on-brand` je na toj temi **taman**, kao u `chalk`. ADR-032 obrazac, ne iznimka.

### Nađeno usput (zapisano, nije popravljeno)
- **Gumb u samom mailu je `#6366f1` s bijelim tekstom = 4.47** — promašuje 4.5 za 0.03, u **obje**
  polovice. Popravak je jedan heks po polovici, ali predlošci su kopija u dashboardu → dva mjesta.
- **`scripts/check-contrast-live.js:39` ima ZAKUCAN popis tema.** Doda li se tema samo u
  `tokens.css` i `boot.js`, živa brana ju **neće ni pogledati** i ostat će zelena — tiho.
  Statička brana čita tokene pa ju vidi sama; `theme-boot-order.test.js` čuva da se `boot.js` i
  `tokens.css` ne raziđu. **Zakucani popis je jedini koji nitko ne čuva** → vlastita cigla F1/4.

## 2026-09-04 (OPUS) — **F1/1: stranica je dobila boju vlastitog znaka** (+ Vercel Insights odbijen)

### Promijenjeno
- **Akcent teme `academic` = indigo iz `assets/logo.svg`.** `--color-brand-400` `#4a82e8` → **`#6366f1`** ·
  `-500` `#1657d0` → **`#4f46e5`** · `-600` `#0f3f9c` → **`#4338ca`**, plus `--theme-swatch-academic-acc`.
  Mijenja se na **dva mjesta** (`@theme static` i `:root[data-theme="academic"]`) jer blok postoji da
  bi izbor teme bio izreciv, a ne samo odsutnost drugih. Ostale teme nedirnute.
  **Povod:** mail vozi točno `#6366f1` — dakle mailu nikad nismo radili poseban izgled, **stranica je
  bila ta koja odudara od vlastitog znaka.**
  ⚠️ **Indigo se vratio, ali NE na mjesto s kojeg je otišao.** Tokeni su nosili zapis da `#6366f1`
  pada AA — i to **i dalje vrijedi za tekst** (4.47 na bijelom, prag 4.50). Zato je na `400`, gdje je
  prag 3.0 (plohe, gradijenti, fokus-obrubi, hover), a nosivu ulogu preuzima `#4f46e5` (6.29).
  **Izmjereno na OBJE strane, ne samo na novoj:** 400 se **popravlja** 3.72 → 4.47 (bitno — na njega
  `.door--primary:hover` stavlja bijeli tekst), 500 ostaje 6.35 → 6.29, 600 pada 9.50 → 7.90.
- `og-cover.png` pregrađen (`build:og`) — poveznice u pretpregledu sad nose boju marke.
- `CLAUDE.md`: `check:contrast` broji **292**, ne 358 (brojka je ostarjela kad je tema `paper` maknuta).

### Nađeno usput (zapisano, NIJE popravljeno)
- **`.door--primary` na hover pada ispod praga — i padao je i prije.** Gumb prigušuje tekst
  `color-mix`-om na 88 % / 90 % bijele, a **ti su postotci izmjereni protiv boje koja se u
  međuvremenu promijenila**. U mirovanju je sve dobro (5.25–6.29); na hover pozadina prelazi na
  `brand-400` pa `door-d` daje **3.25 → 3.84**. Cigla to **popravlja za pola boda, ali ne zatvara**.
  ⚠️ **Nijedna brana ovo ne vidi:** `check:contrast` čita tokene i ne zna za `:hover`,
  `check:contrast:live` crta stranicu u mirovanju. Popravak traži **prvo odluku o izgledu**
  („svjetlije na hover" je danas zapisano pravilo palete). Mjesto: F4.

### Maknuto
- **Vercel Speed Insights odbijen** (Leon: *„makni vercel insights"*) — bot-grana obrisana s origina,
  PR se sam zatvorio. **U repozitorij nikad nije ušao.** Da jest, rušila bi ga tri pravila odjednom:
  pinane ovisnosti (#9), `check:csp` (ES-modul u 6 HTML-ova) i `check:budget`.

### Gate
`preflight` EXIT 0 · `check:contrast` 292/292 kroz 4 teme · `check:contrast:live` **0 elemenata ispod
praga** na 13 ruta × 3 teme · `check:palette` 0 · `check:tokens` bez novog · `build:css` + `bump`.

## 2026-09-04 (OPUS) — **Suradnik otkazan · RASPORED postaje tekući spec** (+ `main` pomaknut na `e42cd90`)

### Promijenjeno
- **⚰️ Content-suradnik OTKAZAN** (Leon: *„suradnika možeš maknut, on je otkazan… bio je lijen i nije
  ništa radio."*). **Role-router u `CLAUDE.md` je UKINUT** — `git config user.name` se više ne
  provjerava; repo ima jednog suradnika. `docs/workflow/TEAM.md` → **`docs/archive/TEAM.md`** s
  pečatom otkazivanja; **ADR-023 dobiva status ⚰️ OTKAZANO**, ali t.5 (ADR-022 pull-forward = U2.5)
  **ostaje na snazi** — ta cigla nije ovisila o suradniku nego o rasporedu.
  ⚠️ **Otkazana je suradnja, ne gradivo:** sedam HR predmeta je živo i `verify` ih broji među 24.
  **Bez vlasnika** je ostao samo zadatak S4+S5 (4 kvantitativna HR predmeta) — nije otkazan.
- **`docs/plan/RASPORED.md` = novi tekući spec** (Leon: *„napravi strukturiran plan koji će ići
  fazama kroz sesije"*). Sedam faza: **F1** uređaj (izgled + glatkoća) · **F2** račun (R2+R3 **+ CSS
  profila u istom prolazu** — ista površina, inače se prepisuje dvaput) · **F3** dvojezičnost ·
  **F4** čišćenje CSS-duga · **F5** vježbe/recepti · **F6** MCP · **F7** objava. Nosi **redoslijed i
  izlazni uvjet**, ne mjerenja (ADR-027) — mjere ostaju u BACKLOG-u. `RACUN.md` → `archive/`
  (R1 isporučen; R2/R3 su F2).
- 📋 **Popis svega otvorenog** (39 stavki, razvrstanih po tome NA ŠTO čekaju) sastavljen je iz
  žive provjere, ne iz proze: `git` · `verify` · `css:debt` · `palette:breakdown` · `check:i18n` ·
  `check:orphan-css`. **Dva nalaza koja proza nije nosila:** ① redizajn-spec je arhiviran kao
  ispunjen, a **C3/C5b/C6/C7 mu nisu zatvoreni** (`css:debt` = 6088 redaka, 2 `!important`) — sad
  su to F2/F4; ② **paleta je na 0/0/0**, dakle dug koji je blokirao birač tema je otplaćen.

### Deploy
- **`main` pomaknut na `e42cd90`** uz Leonov izričit OK (*„možeš pushat i deployat ovaj popravak"*)
  — nosi mail-predloške, FOUC-popravak (`boot.js`, 119 → 0 ms), brands-font (−106 KB) i
  **učitavanje po ruti**. Preflight EXIT 0, pre-push hook prošao.
  ⚠️ **Nalaz: GitHub je vratio `fatal error in commit_refs`, a ref je SVEJEDNO pomaknut** —
  provjereno `git log origin/main`. Poruka o grešci nije bila istinita.

## 2026-09-04 (OPUS) — **Ucitavanje po ruti: prvi kadar s 41 skripte na 22** (grana `feat/racun-r1`)

### Dodano
- **`js/loader.js`** — imenovani paketi koji stizu na SVOJ dogadjaj: `study` (7 skripti +
  KaTeX/DOMPurify) na otvorenu lekciju · `blind-map` / `exercises` na klik taba · `polica` na
  popis lekcija · `materials` i `profile` na svoje stranice · `sync` na **prijavu** (ne na
  profil — tko profil ne otvori, i dalje mu se napredak sinkronizira).
  Verzija se cita iz `src` samog loadera: `npm run bump` NE dira `?v=` u `js/**`, pa bi token
  zapisan ondje tiho ostario (BUG-004 u novom ruhu).
- `SokratLoad.zagrij()` + poziv iz `offline-store.download()` — skinut predmet mora u
  zrakoplovnom nacinu imati i KOD, ne samo gradivo. **Namjerno mimo `plan()`/`urls`**: te
  adrese brise `remove(predmet)`, a skripte aplikacije su zajednicke.
- `tests/helpers/paketi.js` — testovi koji dosezu globale iz paketa traze ih izricito.

### Promijenjeno
- `inkForTint` + `TINT_INK_CROSSOVER` i `safeIcon` sele iz `js/blocks-renderer.js` u
  **`js/utils.js`** (jedina datoteka koju ucitavaju i `index.html` i `editor.html`).
  `SokratBlocks.*` ostaju kao precaci. Landing je inace zbog jedne ciste funkcije vukao cijeli
  renderer, a `profile.js` bi bez `safeIcon` tiho pretvorio sve ikone predmeta u knjigu.

### Popravljeno (kvarovi koje je selidba proizvela i koji su nadjeni prije gatea)
- `.then(initBlindMap)` razrjesuje ime ODMAH → ReferenceError; sada omotano u funkciju.
- `progress.js` je citao `blindMapState` iz drugog paketa → svaka lekcija geografije je bacala
  gresku prije nego bi itko dotaknuo kartu.
- `admin-reveal.js` / `profile.js` vezali su se na `DOMContentLoaded` — dogadjaj koji je za
  lijeno ucitanu skriptu vec prosao.
- **KaTeX `auto-render` se izvrsavao usporedno s `katex.min.js`** → otprilike svaki drugi put
  je stizao prvi, tiho pao u `try/catch` i lekcija bi ostala sa sirovim LaTeX-om. Redoslijed
  koji je u markupu jamcio `defer` sada jamci `script.async = false`.

### Brane
- `tests/unit/loader-packages.test.js` (13 tvrdnji; ukljucuje **osnovicu golih referenci preko
  granice paketa** koja se cisti sama, i redoslijed KaTeX-a).
- `check:cdn` **provjera #5** — CDN-URL u `js/**` izvan popisa `DYNAMIC` = pad. Bez nje bi
  odlazak KaTeXa iz taga znacio da ga brana vise ne vidi, a i dalje javlja zeleno.
- `check:budget` mjeri **oba** puta (prvi kadar sudi budzetu, paketi se ispisuju) — inace bi se
  brana oborila seljenjem tereta u lijeni put, bez ijednog obrisanog retka.
- `check:contrast:live` i `blocks-diff` prilagodjeni: fiksno cekanje vise ne vrijedi.

### Mjera (localhost, hladan cache, mobilni profil — usporedba na istom posluzitelju)
FCP **5820 → 4236 ms** (−27 %) · zahtjeva **49 → 29** · `check:budget` prvi kadar
**41 skripta / 234 KiB → 22 / 112,7 KiB**. ⚠️ Apsolutni iznosi nisu produkcijski.

⚠️ **NIJE na produkciji** — ceka Leonov izricit OK.

## 2026-09-04 (OPUS) — **FOUC teme zatvoren + brands-font maknut** (grana `feat/racun-r1`)

### Popravljeno
- **Bljesak krive teme**: popis tema i primjena sele u `js/boot.js` (sinkrona, prije prvog
  crtanja). Izmjereno 119 ms (produkcija) / 232 ms (Slow-4G) → **0 ms**. `theme.js` zadrzava
  samo `setTheme()` i normalizaciju zapisa.
- **`fa-brands-400.woff2` (106 KB)** se vise ne skida: znakovi Googlea i Facebooka su
  ugradjeni SVG (~0.6 KB). Google dobio svoj sluzbeni cetverobojni znak.

### Dodano — mjerni instrumenti (nisu gate; mreza/preglednik)
- `scripts/fouc-probe.js` — bljesak teme u milisekundama + snimka kadrova.
- `scripts/perf-probe.js` — hladan prvi posjet, Lighthouseov mobilni profil, FCP/LCP/CLS/TBT
  i bajtovi iz CDP-a; `--bez=` (protucinjenicni pokus), `--defer`, `--kontrola`, `--vodopad`.

### Brane
- `tests/unit/theme-boot-order.test.js` · `tests/unit/no-brand-font.test.js` (oba u preflightu)
- `tests/theme-fouc.spec.js` — nula promjena teme poslije prvog kadra (chalk + mint).

⚠️ **NIJE na produkciji** — ceka Leonov izricit OK.

## 2026-09-04 (OPUS) — **Mail-identitet: predlosci, potpis, posiljatelj** (grana + Supabase)

### Dodano
- `supabase/email-templates/` — tri hrvatska predloska (potvrda/dobrodoslica, reset lozinke,
  promjena adrese) s **potpisom u podnozju** (znak u kvadratu + ime + tagline + link).
  Repo je izvor istine, Supabase dashboard kopija.
- `scripts/mail-preview.js` — renderira predloske u PNG (svijetlo + tamno, s popunjenim
  varijablama). Time je uhvacen bug da `<strong>` sa zakucanom tinom **nestane u tamnoj temi**.

### Postavljeno (izvan repoa)
- Resend SMTP → posiljatelj `sokrat@sokratstudy.com` · Porkbun forwarding `sokrat@` → Leonov
  Gmail (MX fwd1/fwd2.porkbun.com) · Google racun na toj adresi sa Sokratovim avatarom.
- Hrvatski naslovi mailova kroz **Supabase Management API** (PAT; MCP to ne pokriva).

### Dokaz
- Leonov inbox procitan kroz Gmail konektor: mail 2026-09-04 13:22 UTC nosi naslov „Promjena
  lozinke na Sokratu", nas tekst i potpis; posiljatelj `sokrat@sokratstudy.com`.

## 2026-09-02 (FABLE) — 🚀 **FB gumb maknut — NA PRODUKCIJI** (`9f2977c`, Leonov OK)

Fast-forward `feat/racun-r1` → `main`. Uživo potvrđeno: token `20260902045623` na
www.sokratstudy.com, `FB_LOGIN = false` u živom `auth.js`. Gate: preflight EXIT 0
(ručno + pre-push hook) · auth spec 16/16.

## 2026-09-02 (FABLE) — **Facebook gumb maknut iz dijaloga** (grana)

- Leon: *„makni facebook za sada to cemo kasnije dodat"* — gumb je čekao Metine ključeve
  i do tada samo javljao grešku. Maknut markup + listener iza zastavice `FB_LOGIN = false`
  u `auth.js` (handleOAuth i i18n ključevi OSTAJU — povratak = flip na true kad ključevi
  sjednu u Supabase). auth spec sada tvrdi da gumba NEMA (16/16) · preflight 20/20.

## 2026-09-02 (FABLE) — 🚀 **U5 NA PRODUKCIJI** (`3c6c995`, kod `2de0456`, Leonov OK)

Fast-forward `feat/racun-r1` → `main` (U5 + compact-prep docs). Uživo potvrđeno: token
`20260902032929` na www.sokratstudy.com i `signInWithIdToken` u živom `auth.js`.
Gate: preflight EXIT 0 (×2: ručno + pre-push hook).

## 2026-09-02 (FABLE) — **U5: Google prijava bez supabase-domene na ekranu** (grana)

### Promijenjeno
- Google više NE ide preko Supabaseovog callbacka (`signInWithOAuth`) nego **implicit
  id_token izravno s naše stranice**: `redirect_uri` = naš origin → Googleov ekran piše
  **sokratstudy.com**, a ne `<ref>.supabase.co`, i sigurnosni mail o „dijeljenju podataka"
  imenuje našu domenu. Token se predaje GoTrueu kroz `signInWithIdToken` (+ nonce kroz
  sessionStorage preko redirecta; privatni način bez sessionStoragea pada na stari put).
  Povod: Leonov nalaz — supabase-link na prijavi izgleda kao phishing; custom domena
  košta 10 USD/mj, ovo je besplatno. URL se čisti PRIJE mrežnog poziva (token ne
  preživljava refresh/bookmark). Facebook ostaje na supabase-callbacku (Metin review ionako čeka).
- Google klijent: dodana 2 redirect URI-ja (`https://www.sokratstudy.com/` ·
  `http://localhost:5050/` — **s kosom crtom**, Google traži točan match; Leon uživo).

### Dokaz
- Živa proba: klik → accounts.google.com s `response_type=id_token` i našim originom
  (mismatch-greška PRIJE Leonovih unosa imenovala točno naš URI = naša strana ispravna);
  Leon prošao puni krug: *„jesam riješeno"*. auth spec 16/16 · preflight 20/20.

## 2026-09-02 (FABLE) — 🚀 **RAČUN R1 NA PRODUKCIJI** (`921ef08`, Leonov izričit OK)

Cijeli R1 paket deployan fast-forwardom `feat/racun-r1` → `main`: **novi dijalog prijave
(Google + Facebook ulazi, dvokoračna registracija s upitnikom, upitnik i pri prvoj
OAuth-prijavi)** + **U1** (Nova sekcija na dnu panea) + **U2** (brisanje povijesti stvarno
briše, bez odjave). Vercel production READY; uživo potvrđeno: novi bump token, `authGoogleBtn`
u auth.js, `wipeAll` u cloud-sync.js, `st-addcat-foot` u studio.js. Google prijava RADI
(Leonov krug); FB gumb daje jasnu poruku dok Metini ključevi ne sjednu. Gate: preflight 20/20
(×2: ručno + pre-push hook) · auth spec 16/16 · authed U1+U2 na stagingu.
⚠️ Zapisan i Leonov nalaz: **OAuth s preview-URL-a vraća na produkciju** (preview-origin nije
u Supabase redirect allow-listi) — testiranje OAutha ide na localhostu ili produkciji.

## 2026-09-02 (FABLE) — **RAČUN R1: OAuth ulazi + upitnik + novi dijalog prijave** (grana `feat/racun-r1`)

### Dodano
- **Google/Facebook gumbi** u `#authModal` (`signInWithOAuth`, povratak na istu stranicu).
  Provider bez ključeva u dashboardu → prevedena poruka, i to na OBA puta: pri kliku I pri
  povratku (GoTrue grešku ne vraća pozivu nego je šalje natrag u URL-u — hvata se na initu,
  URL se čisti `replaceState`-om). Gumbi se miču na koraku 2 i forgot panelu.
- **Registracija u DVA koraka:** podaci → upitnik (tko si: student/srednja/ostalo · faks/škola
  s FMTU-datalistom · mail-pristanak, default NE). Sve ide u `user_metadata` kroz
  `signUp options.data` — bez nove tablice/RLS-a, brisanjem računa nestaje (GDPR besplatno).
- **Upitnik pri PRVOJ OAuth-prijavi** (`app_metadata.provider !== 'email'` bez
  `questionnaire_done`); preskočiv, a preskok TAKOĐER piše biljeg (inače bi se vraćao svaku
  prijavu). Postojeći email-korisnici se NIKAD ne pitaju (spec RAČUN §3).
- FMTU prepoznavanje (kratica · Opatija · puni naziv) → `is_fmtu` za R3 mail-segment;
  test-šav `SokratAuth.buildQuestData`. `getDisplayName` fallback na `full_name`/`name`
  (Google NE piše `display_name` — nav bi pokazivao prefiks emaila).
- Novi copy: „Welcome to Sokrat" umjesto „Sync your progress" — dijalog je ULAZ u platformu.

### Dokaz
- 2 nova Playwright testa (struktura + tok panela · buildQuestData kroz evaluate);
  auth+components 52/52 · puna responsive suita zelena · preflight 20/20 · živa proba na
  393 px: oba koraka + OAuth-greška u hashu → prevedena poruka i očišćen URL.
- **Google ključevi UPISANI i krug potvrđen UŽIVO** (Leon, 2026-09-02: novi GCP projekt
  „Sokrat Study" + consent screen + web client → Supabase Providers; probe: `/authorize` 302
  na accounts.google.com s našim client ID-em; Leonova prava prijava: *„super radi odlično"*).
- ⏳ **Facebook ključevi još čekaju** (Meta konzola); gumb dotad daje jasnu poruku
  „još nije dostupno" umjesto sirove greške — kod je građen da radi i prije ključeva.

## 2026-09-02 (FABLE) — 🚀 **BIRAČ TEMA NA PRODUKCIJI** (`6c5a5d8`, Leonov OK)

Dva zapisa niže (birač u profilu + `paper` van) deployana fast-forwardom na `main`.
Korisnik od danas bira: **Akademsko plavo · Ploča · Menta.**

## 2026-09-01 (FABLE) — **Tema `paper` maknuta (Leon uz pregled birača)** (grana)

### Uklonjeno
- Tema `paper` s SVIH 10 mjesta (popis u theme.js · mape u profile.js · i18n ključ ·
  `[data-theme="paper"]` blok i swatch-tokeni u tokens.css · profile.css pravilo · popisi u
  `check:contrast:live`, `tint-ink.spec`, `learn-blocks-contrast.spec` · CLAUDE.md).
  Spremljeni `paper` u localStorageu pada na `academic` kroz postojeću validaciju
  (provjereno uživo). Ostale teme: academic (zadana) · chalk · mint.

### Dokaz
- `check:contrast` (sada 3 teme, čita tokens.css pa se sam prilagodio) ✅ · tint-ink +
  learn-blocks-contrast 20/20 · živa sonda: 3 gumba, stale-`paper` → academic ·
  preflight EXIT 0.

## 2026-09-01 (FABLE) — **Birač tema u profilu — `chalk`/`mint`/`paper` prvi put dohvatljivi** (grana)

### Dodano
- Kartica „Izgled" na `#profile-page` (i za neprijavljene — tema je svojstvo uređaja):
  4 teme s pregled-krugovima ciljnih boja (`--theme-swatch-*`, tokens.css); mehanizam =
  postojeći `js/theme.js` (localStorage + validacija popisa). i18n EN/HR.
- `check:palette` zabrana #1 proširena na jake semantičke ispune (obaveza iz BACKLOG-a
  „istoga dana kad birač izađe"); 0 prekršaja zatečeno.

### Dokaz
- Živa sonda: klik chalk → `data-theme`+localStorage+`color-scheme` ↓, body tamna; gumbi
  44 px · telefon+a11y na SE 17/17 · proširena paleta zelena · preflight EXIT 0.

## 2026-09-01 (FABLE) — 🚀 **FRONTEND REDIZAJN (C0–C7) + MREŽA (A–E) — NA PRODUKCIJI** (`f8bc5cb`)

### Deployano (Leonov izričit OK, cijeli paket)
- **103 commita s `feat/rjesavanje-9mj`** fast-forwardom na `main`: redizajn C5b/2–C7 cijeli
  (responsive/* ne postoji · most→ugovor · cta-baza vraćena · profil/auth/pravne · learn u
  bojama sekcija §15.1) + MREŽA A–E (brane s obrnutim provjerama · paleta 0 · a11y po WCAG
  razini · D4 lozinke · E2/E3/E4).
- **CSP enforce** aktivan — header potvrđen uživo; **E2 re-sync baze**: backup → 7 predmeta
  migrirano → `diff:db` **0 razlika** → `check:final` **17/17**.
- Vidljivo korisniku: cta-gumbi opet obojani (sivi od 13.8.) · rubovi tablica u gradivu
  vraćeni · 11 boja gradiva vidljivo · learn zaglavlja/naslovi u boji sekcije · skraćene
  kartice služe se iz baze.
- **Oba speca arhivirana** (`docs/archive/`): MREŽA §9 kućice zatvorene deployem.

## 2026-09-01 (FABLE) — **Dorada iz pregleda: boja sekcije na zaglavlju i naslovima learna (spec §15.1)**

### Dodano
- Learn: zaglavlje sekcije i naslovi (h3/h5) nose **boju svoje sekcije** iz podataka
  (Leonov nalaz na pregledu; boja je već postojala kao `--st-acc`, trošio ju je samo rub).
  Sve iza `[data-ink]` grane: tinta IZRAČUNATA (`inkForTint`), pill miješan prema suprotnom
  kraju od tinte, naslov = mješavina akcenta s tintom teme (goli akcent kao tekst = razred
  kvara iz C5b/0); sekcija bez boje ostaje bajt-identična.

### Popravljeno
- **CI je prvu verziju oborio** (axe: 12× h3 na 4.41 < 4.5 za `#f59e0b`/`#fbbf24`) →
  mix **55 % → 45 %**, izmjereno nad 36 boja × 4 teme × 2 plohe (najgori slučaj 5.31).
  Prekršaj ne ovisi o širini — SE-shard je bio glasnik, ne uzrok (spec §15.1).

### Dokaz
- `check:contrast:live` 0 ispod praga (13 ruta × 4 teme) · živa sonda: 7 sekcija
  poduzetništva, svaka svoj akcent · telefon-brana 0 nalaza · preflight EXIT 0.

## 2026-09-01 (FABLE) — **C7/5: paleta-most mrtav (990 poziva → tokeni); GRADIVO čuva 2 imena kao ugovor — C7 ZATVOREN**

### Promijenjeno
- 990 `var(--legacy)` poziva u 24 css + 1 js preimenovano na `--color-*` tokene (čuvar:
  `check:tokens`); `variables.css` most → ① ugovor prema sadržaju (`--primary`,
  `--border-color`) + ② strukturne (`--transition`, `--safe-*`, `--touch-target*`, `--nav-h`).

### Popravljeno
- **`--border-color` u gradivu (72×) nikad nije bio definiran** → shorthand je padao cijeli
  i tablice NISU imale rubove; definicija u ugovoru vraća 1 px liniju po temi.

### Dokaz
- `check:tokens` čist · `css:diff`: 0 paint-razlika na 4 rute (10 560 = definicijske);
  geografija: jedina paint-promjena = border na 9 redaka tablica · telefon 21/0 ·
  preflight EXIT 0. Faza-dug: 8 032 r./106 `!important` → **5 942 / 2**.

## 2026-09-01 (FABLE) — **C7/4: `components.css` raspušten — mobile-nav je stilizirao samo NEVIDLJIVO**

### Promijenjeno
- `.mobile-nav*` pravila obrisana: <768 ih je `study-chrome` (C5a) ionako gazio, ≥768 je
  traka `md:hidden` — stilizirala su isključivo nevidljivi element (s njima umro i zakucani
  `#312e81`). Sjena plohe → `study-chrome` (jedino što je živjelo samo tu). Vidljivost trake
  vode `flex`/`md:hidden` utilityji (stara baza + `@768 !important` hide obrisani).
  `.section`+`fadeIn` → `variables.css` uz masineriju stranica. `components.css` ostaje slim
  (cta-button, `.hidden`, landscape-body). Srezan zastarjeli DARK-THEME komentar u variables.

### Dokaz
- Winner-mapa: vidljive širine **0 razlika**; svih 270/480 promjena pod `display:none`
  roditeljem (css:diff: 20/20 mobilnih mjerenja čisto) · telefon 21/0 · preflight EXIT 0 ·
  `!important` 3 → 2.

## 2026-09-01 (FABLE) — **C7/3: `css/responsive/*` NE POSTOJI — žive ljestve doseljene svojim bazama (0 razlika u 188 340 usporedbi)**

### Promijenjeno
- Zadnje žive ljestve verbatim (s min/max stegama) u svoje domove: `.action-btn` →
  `home-section` · `.toast`/`.footer` → `pages` · `.landing-footer` → `landing` · LOGO →
  `sidebar`+`pages` (goli `@480` sixpack gubio svugdje → mrtav) · `.hidden`+landscape-body →
  `components` · `sokratSpin` → `offline` · politike → **nova `css/policies.css`**
  (duplikati 03/05 spojeni). `04 @374 .filter-btn` bio kaskadno mrtav (learn.css gazi).

### Uklonjeno
- **Šest `responsive/*` datoteka (411 redaka)** i s njima brana **`check:cascade`**
  (mjerila gašenje MEĐU tim datotekama; predmet mjere umro — zapis u `BUGS.md`).

### Dokaz
- Winner-mapa 111 540/0 · `css:diff` 7 ruta × 10 širina = 81 324/0 · telefon 21/0 ·
  preflight EXIT 0 · `!important` 11 → 3.

## 2026-09-01 (FABLE) — **C7/2: `.cta-button` — C2 je s mrtvim landingom obrisao i ŽIVU bazu; 7 površina gumba bilo sivo od 13.8.**

### Popravljeno
- Baza `.cta-button` + `.primary`/`.secondary` napisana ponovno današnjim jezikom (puna
  ispuna marke + `--on-primary`, ADR-032; secondary po C3 obrascu; bez gradijenta) u
  `components.css`, s ljestvom iz `responsive/02+05` (mobile-first). Auth-modal, profil,
  admin editbar, edit-modali, mm-retry, `#materialsSignInBtn` i editor-guard opet imaju gumbe.

### Dokaz
- Namjeran diff: svih 191 razlika = cta-gumbi + naslijeđena tinta + 1-px odjek (nestao
  default rub); sonda: ispuna `#1657d0`/bijelo, ljestva 12/14/16 px · telefon 21/0 ·
  preflight 20/20. Nijedan gate rupu nije vidio — „klasa bez ijednog pravila" je nova vrsta.

## 2026-09-01 (FABLE) — **C7/1: selektorski mrtvo van — `!important` 34 → 11, orphan-osnovica 38 → 12**

### Uklonjeno
- Stara traka i nav-masinerija iz `components.css` (`.header`/`.logo`/`.nav-menu`/
  `.nav-visible`/`#mainNav`/`.nav-btn`/`.theme-toggle` CSS — K2b `.topbar` ih je zamijenio) i
  mrtve obitelji iz `responsive/*`: `.main-content` ×7, `.swipe-indicator`, `.pull-indicator`,
  `.subjects-grid` ×6, `.bottom-nav` ×5, `04`-ov study-home blok, goli `.btn`.
  `check:orphan-css` pola toga nije vidio — matcha podstring; sonda matcha točnu klasu.

### Dokaz
- **Nova selektor-sonda**: 184 provjere (23 selektora × 6 ruta + authed profil + editor),
  **0 pogodaka** · `css:diff` **53 516 usporedbi, 0 razlika** · telefon 21/0 · preflight 20/20.
- Spec §14 (C7 mjera): tvrdnja o „mrtvoj temi" zastarjela — od nje je ostao samo
  `.theme-toggle` CSS; JS-vezanje namjerno ostaje za budući birač.

## 2026-09-01 (FABLE) — **C6/4: profil + auth — authed dokaz (0 razlika u 1 166 880 usporedbi); C6 ZATVOREN**

### Promijenjeno
- Skela profila u utilityje po pravilu ② (`.profile-content` na sva TRI mjesta — uklj.
  `editor.html` `#adminContent`; `.profile-grid`/`.profile-stat-totals`/`.profile-stat-vals`).
  Ulov mjere: `--text-secondary` = `ink-1`, ne ink-2.

### Uklonjeno
- Mrtvi od K2b (spajanje traka): `.nav-auth-btn` obitelj i `.header-materials-btn`;
  orphan-osnovica 40 → 38.

### Dokaz
- **Nova authed prije/poslije sonda** (STAGING prijava u stranici; profil 161 el. + modal 68 +
  materials 24 + editor, 8 viewporta): **1 166 880 usporedbi, 0 razlika** · `css:diff` 2 rute
  × 8 viewporta = 18 120 / 0 · telefon 21/0 · preflight 20/20.

## 2026-09-01 (FABLE) — **C6/3: about — mobilna pravila kući, skela u utilityje (0 razlika u 9056 usporedbi)**

### Promijenjeno
- Tri pravila iz `responsive/02` u `pages.css` kao mobile-first; `.creator-avatar` čuva
  izmjereno-naopaku istinu (telefon 70 px > stolni 60 px). Skela about-a (6 mjesta) u
  utilityje, 5 pravila obrisano. `.logo-wrapper-large` NE seli — globalna logo-ljestva u `06`
  pobjeđuje min/max-stegama (izmjereno); LOGO je svoja površina kao `.action-btn`.

### Dokaz
- `css:diff` × 8 viewporta (uklj. 852×393 za `max-height: 700`) = **9056, 0 razlika** ·
  telefon 10/10 · preflight EXIT 0.

## 2026-09-01 (FABLE) — **C6/2: sidebar-ljestva skupljena + NALAZ da je cijeli sidebar nedostižan**

### Promijenjeno
- Sidebar-pravila iz `responsive/04+06` konsolidirana u `sidebar.css` (baza = mobilni
  pobjednici; mrtva `max-width: 400px` nije uskrsnuta). Globalna `.logo-wrapper` ljestva
  ostaje u `06` — logo-površina, ne sidebarova (pobjeđuje min/max-stegama, izmjereno).

### Uklonjeno
- Mrtvo: `.sidebar-header h2` (+`i`+duplikat) — u zaglavlju nema h2; `.subject-option*` (4).

### Nalaz (produktna odluka → BACKLOG)
- **Sidebar je NEDOSTIŽAN**: renderira se (17 predmeta), ali `openSidebar()` nema nijednog
  pozivatelja otkad browse drill-down bira predmete.

### Dokaz
- Winner-mapa 84/0 · `css:diff` × 8 viewporta (uklj. 480/481) = **12 448 usporedbi, 0
  razlika** · telefon 10/10 · preflight EXIT 0.

## 2026-09-01 (FABLE) — **C6/1: home-ljestva iz PET datoteka skupljena — pola je bilo mrtvo (0 razlika u 28 008 usporedbi)**

### Promijenjeno
- Sve home-jedinstveno sada u `home-section.css` (baze = mobilni pobjednici + mobile-first
  ljestva); `responsive/01–04,06` **−223 retka / 50 blokova**. Cijela iPhone-gradacija u `01`
  bila je MRTVA (02 ju je tukao redoslijedom); `#home .hero` ID-blok iz `06` razriješen
  izmjerenim landscape-guardom. `.action-btn` namjerno ostaje (dijeli ga kviz — mjereno).
- Prije C6/1 napisana **mjera cijelog C6** (spec §13): pravne stranice NE učitavaju bundle →
  `legal.css`/`consent.css` NE migriraju (jedna datoteka, dva svijeta).

### Dokaz
- Winner-mapa prije/poslije (14 viewporta, tranzicije zamrznute — mjerač je 13. put bio prvi
  kvar: snimao je stilove usred `transition: all`) = **2548 usporedbi, 0 razlika**; `css:diff`
  home+kviz × 9 viewporta = **28 008, 0 razlika**; telefon 10/10; preflight EXIT 0.

## 2026-09-01 (FABLE) — **C5b/3b: skela `learn.css` u utilityje — mjera srezala opseg, C5b time CIJELI zatvoren**

### Promijenjeno
- 4 elementa skele (`index.html`): sekcija `w-full min-w-0 overflow-x-hidden` (golo pravilo
  obrisano) · kontejner `w-full min-w-0` · filter `flex overflow-x-auto pt-[4px] pb-[10px]` ·
  sadržaj `flex flex-col min-w-0`. Pala i 4 duplikata univerzalnog reseta.
- Ostatak NE migrira s razlogom po skupini (spec §12.14): **43 pravila** nad markupom IZ
  PODATAKA (ADR-028) · ~60 komponente (C7) · svojstva prikovana sa **6 pragova** (C7, §12.3).

### Dokaz
- `css:diff` learn-ruta × 6 viewporta (320·375·768·1024·1280·852×393) = **9336 usporedbi,
  0 razlika**; pokrivenost: `display` iz utilityja, 5 kartica; telefon 10/10; preflight EXIT 0;
  utilityji 129 → 132. **C5b: svih 5 datoteka §12.4 obrađeno** → slijedi C6.

## 2026-09-01 (FABLE) — **C5b/3a: `#learn` je pao — 153× `:where(#learn)`, 0 razlika u 7780 usporedbi**

### Promijenjeno
- `css/learn.css`: svih 153 `#learn` → `:where(#learn)` — doseg identičan, specifičnost ID-a
  na nulu; utility u markupu od sada MOŽE pobijediti (dokazano obrnutom sondom: `p-6` na
  `.learn-container` 10 → 24 px, u §12.1 speca isti utility nije prolazio).
- Zaglavlje datoteke prepisano: staro je objašnjavalo ZAŠTO ID postoji, novo zašto ga NEMA.

### Dokaz
- `css:diff` learn-ruta × 5 širina (320·374·375·768·1280) = **7780 usporedbi, 0 razlika**;
  `.filter-btn` ostaje 44 px (kandidati iz `responsive/*` i dalje gube — redoslijedom);
  telefon-brana 10/10; `preflight` EXIT 0. Migracija pravila = C5b/3b.

## 2026-09-01 (FABLE) — **C5b/2: `blind-map.css` — skela u utilityje, 4 mrtva pravila van (0 razlika u 5952 usporedbe)**

### Promijenjeno
- Skela slijepe karte (raspored, razmaci, tipografske sitnice) migrirana u Tailwind utilityje
  u `index.html`; **komponente** (tipke, wrapper karte, canvas, feedback-stanja, progress-bar)
  ostaju u CSS-u za C7. Rez po SVOJSTVU: `padding`/`gap`/`font-size`/`grid-template-columns`
  koje diraju preživjeli upiti (640/768) **ostaju u CSS-u** s komentarom.
- `css/blind-map.css` 315 → 214 redaka (60 → 38 blokova); utilityji 122 → 129.

### Uklonjeno
- **8 mrtvih pravila + 2 `@keyframes`**: `.map-marker*` (markere crta canvas, DOM-marker ne
  stvara nitko) i `.map-input-*` (odgovor je klik na kartu, input ne postoji). Siročad 45 → 40
  (uklj. zastarjeli `katex-display` — `js/math.js` ga od MREŽE stvarno dira).
- Mrtva iznimka `.map-marker.incorrect` u `check:palette` · inline `style="width: 0%"` duplikat.

### Dokaz
- Pokrivenost prije tvrdnje: sekcija aktivna, 12/12 klasa nacrtano, `display` iz utilityja,
  640-upit radi. `css:diff` 4 širine (375·640·768·1280) = **5952 usporedbi, 0 razlika**;
  telefon-brana 10/10; `preflight` EXIT 0.

## 2026-09-01 (FABLE) — **MREŽA-E4: vježbe i slijepa karta ušle u telefon-mjeru — „čine se ok" postao broj (0 nalaza)**

### Dodano
- `phone-gate.js`: `NACINI_UVJETNI` + `idiNa('study@<feature>')` — exercises/blind-map se mjere
  na PRVOM predmetu koji značajku ima (iz kataloga, nikad zakucano); pokrivenost 44 → **52**.
- Rezultat: svih 8 tvrdnji × 4 širine × oba taba **prolazi uz praznu osnovicu**.
- Opseg = Leonova odluka (mali): prepravak interakcije ide u redizajn; `generate()`/`answer()`/
  `type` nedirnuti. Time je **BLOK E zatvoren** (E1 verifikacija · E2 kartice+shema · E3 mjerač+
  zaključano izuzeće · E4 mjera).

## 2026-09-01 (FABLE) — **MREŽA-E3: brana je jedan predmet preskakala s uvjerljivim krivim razlogom**

### Popravljeno
- `check:final` sad razumije **obje konvencije imena kolokvija** (`first-midterm` i `midterm-1`) —
  `business-informatics` nije bio „ne-3-dijelni" nego žrtva resolvera; u bazi je bio cijelo
  vrijeme i sada se **provjerava (16 → 17 finala)**. Čegrtaljka je pad na promjeni razloga odradila.
- **Izuzeće preostalih 7 (svi HR, „nije u bazi") TRAJNO ZAKLJUČANO** — obrazloženje u zaglavlju
  brane: file-final ne može driftati po konstrukciji · HR u Supabase tek s potpunim programom ·
  izuzeće se samo zacjeljuje ulaskom u bazu. Obrnuti testovi 6/6.

## 2026-09-01 (FABLE) — **MREŽA-E2: nijedna kartica preko 500 znakova — i shema to sada jamči**

### Promijenjeno
- **25 jedinstvenih kartica >500 znakova** (48 s kopijama u `final`) skraćeno po kartica-standardu;
  detalj koji learnu nedostaje (lifestyle-poduzetništvo, poduzetnik–menadžer tablica, D&I brojke,
  oblici migrantskog poduzetništva, primjeri uz Stoneovih 7, BFA…) preseljen u learn istim idiomom.
- `maxLength: 500` na `question`/`answer` u `schema/subject-content.schema.json` — obrnuto dokazano
  ajv-om (501 pada, 500 prolazi); novi unit veže broj na `SokratCardLimits.HARD` (jedna istina).
- Re-export JSON zrcala (72/72 round-trip) + bump; preflight EXIT 0; phone-brana 10/10.
- ⚠️ Uz deploy ide re-sync baze (`diff:db` → `migrate-content.js`) — read-path preferira bazu.

## 2026-09-01 (FABLE) — **MREŽA D4: procurjela lozinka pada u pregledniku — 0 € umjesto Pro plana**

### Dodano
- **HaveIBeenPwned provjera s k-anonimnošću** u `js/auth.js` — odlazi samo 5 heks znakova
  SHA-1 sažetka, usporedba lokalna, `Add-Padding`; **fail-open** (mrežna greška ne blokira).
  Pozvana na sva tri mjesta postavljanja lozinke (signup · recovery · profil).
- `api.pwnedpasswords.com` u `connect-src` (zato D4 ide uz D3 — CSP se ne radi dvaput).
- Dokazi: `password123` → odbijena PRIJE Supabase poziva s prevedenom porukom; jaka lozinka
  prolazi; radi i pod enforce CSP-om na preview-u.

## 2026-09-01 (FABLE) — **MREŽA D3: CSP enforce + `check:csp` — prva iduća inline skripta pada kod nas, ne kod korisnika**

### Dodano
- **`Content-Security-Policy` ENFORCE** (Report-Only iz D2 potrošen čistim reportom); šetnja
  preview-em pod blokirajućim policyjem: KaTeX/GA/Sentry/Supabase/editor/blind-map — nula
  `Refused`, sve funkcionalno.
- **Nova brana `check:csp` u preflightu**: 0 inline `<script>` (iznimka ld+json — inertan blok)
  · 0 `on*` atributa · enforce header bez `unsafe-inline` za skripte. Komentari se skidaju
  prije mjerenja; ispisuje dotaknuto; obrnuto dokazana (Report-Only stanje + podmetnute povrede).

## 2026-09-01 (FABLE) — **MREŽA D2: CSP Report-Only — report pročitan na svim rutama, 0 naših povreda**

### Dodano
- `Content-Security-Policy-Report-Only` u `vercel.json` — policy iz izmjerene karte izvora
  (jsdelivr · cdnjs · sentry · googletagmanager/GA · supabase https+wss · youtube-nocookie).
- Šetnja svih ruta na preview-deployu pravim preglednikom (uklj. editor/Studio, KaTeX render,
  Accept privole → GA+Sentry): **nula povreda iz aplikacije**; jedine povrede su
  preview-infrastruktura (vercel.live, SSO manifest) koje na produkciji ne postoje.

## 2026-09-01 (FABLE) — **MREŽA D1: inline van — 0 inline `<script>` i 0 `on*` atributa u svih 6 stranica**

### Promijenjeno
- **Consent-default (gtag) push** seli iz `<head>` inline bloka u vrh `js/consent.js` —
  redoslijed očuvan jer gtag.js učitava isključivo consent.js.
- **Novi `js/boot.js`** (jedina sinkrona skripta): pathbar-odluka za duboke rute (K1) +
  KaTeX `media="print"` → `all` swap (bivši `onload` atribut; link sad nosi `data-media-swap`).
- **25 `onclick` atributa** → `data-action` (+ `data-arg`) sa zatvorenom bijelom listom:
  app-akcije u `navigation.js`, `toggleUiLang` u `i18n.js` (editor nema navigation.js),
  cookie-linkovi (`data-consent-settings`) u `consent.js`.
- Sve je priprema za CSP (D2/D3): stranica više nema nijedan inline izvršni komad.

## 2026-09-01 (FABLE) — **MREŽA C4: stara paleta → 0 — `check:palette` na nuli (93 → 0 od uvođenja)**

### Promijenjeno
- **Indigo-sjajevi/ispune `rgba(99,102,241,α)` → `color-mix` nad `var(--primary)`** — efekti sad
  prate živu marku teme, ne zamrznuti indigo-500.
- **Ukrasni fallbackovi skinuti** (`var(--primary, #6366f1)` i sl.); `--accent` u learn-blocks
  zadržava fallback, ali kao `var(--primary)`. Skidanje je razotkrilo 2× `--primary-light` kao
  TEKST (tvrda zabrana) → `var(--primary)`.
- Maske skrola → `currentColor` (maska čita samo alfu) · lightbox → `--color-on-tint-light`/
  `--color-shadow` · Studio conic-kotač → `--color-ink-indigo` · `.lb-table th` slate-400
  (rgba-oblik) → rub-token.

### Popravljeno
- **Rupa iz C2 koju je suite stvarno pogodio:** na violet-500 ispuni ni bijela ni `#14161a` ne
  dosežu AA (axe: 4.27). `--color-on-tint-dark` → **čista crna**, `TINT_INK_CROSSOVER` → 0.1791
  (izveden; `check:contrast` drži sinkronizaciju) — najgori slučaj sad 4.58 po konstrukciji.
  Uz to `.flip-hint` na obojenim ispunama gubi `opacity: 0.8` (crna kroz 0.8 na indigu = 4.01).
- Dokaz bloka: `palette:breakdown` **0 · 0 · 0** · `check:contrast:live` 0 ispod praga ·
  suite 535/0.

## 2026-09-01 (FABLE) — **MREŽA C3: blago 20 → 0 — zakucane bijele/crne plohe, rubovi i sjene ugašeni**

### Promijenjeno
- **Novi token `--color-shadow`** (opakna baza sjene/scrima po temi); prozirnost se izriče na
  mjestu upotrebe kroz `color-mix` (alfe 0.08–0.62 su legitimno različite).
- **„Bijelo staklo" auth-modala, confirm-dijaloga i header-auth gumba** (pisano za staru tamnu
  zadanu temu) → plohe teme (`--bg-tertiary`/`--border`/`--color-line-strong`).
- **Chipovi na obojenim ispunama** (kategorija kartice, slovo odgovora) → `color-mix(currentColor)`
  — od C2 tinta podloge više nije nužno bijela.
- **Lightbox** (namjerno fiksno taman) → rubovi iz `--color-on-tint-light`.
- Osnovica `check:palette` spuštena 77 → 53; zastarjeli komentar u `tokens.css` ažuriran.
- Dokaz: `palette:breakdown` fatalno 0 · **blago 0** · stara 36 (→ C4); `check:contrast:live`
  0 ispod praga.

## 2026-09-01 (FABLE) — **MREŽA C2: boja kartice = CIJELA kartica — tri moda poravnata (EDITOR ①)**

### Promijenjeno
- **Study-kartice s bojom crtaju PUNU ispunu** (ADR-032 ④): kartice su imale samo prsten, kviz i
  dopune rub + 10 % tinte — sad sva tri moda troše `--item-acc` isto, a tintu bira
  `applyAccent` → `data-ink` → `--color-on-tint-*`. Bez boje zatečeni izgled (M3b fallback).
- **`inkForTint` preseljen** `js/navigation.js` → `js/blocks-renderer.js` (editor ne učitava
  navigation.js; jedan izbor tinte za pločice, study-kartice i pretpregled); `check:contrast`
  prag čita iz novog doma; novi unit-testovi za `data-ink` (postavljanje/curenje/luminancija).
- Dokaz: `check:contrast:live` 0 ispod praga — i 14 mjerenja manje preskočeno (puna ispuna
  se mjeri, gradijent se preskakao).

## 2026-09-01 (FABLE) — **MREŽA C1: fatalno 10 → 0 — nevidljivog teksta više nema ni u jednoj temi**

### Promijenjeno
- **Novi tokeni `--color-on-ok`/`--color-on-danger`** po temi (`css/tokens.css`) + legacy aliasi
  `--on-success`/`--on-danger` (`css/variables.css`) — izvedba ADR-032: semantika je UVIJEK puna
  ispuna, prilagođava se tinta (bijelo u `academic`/`paper`, `#14161a` u `chalk`/`mint`).
- **10 fatalnih pravila palete → 0** u 8 css datoteka: 7 zamjenom zakucanog `white`/`#fff` tokenom
  (quiz točno/netočno, danger-hoveri u blind-map/progress/sidebar/profile ×2), 3 s izmjerenom
  odlukom (`category-btn.active small` → `inherit` · `action-btn.tertiary` → gradijent iz
  ok-tokena, briše zakucani `#059669` · `learn-card-header span` → puna ispuna `--primary-dark`,
  jer bi rgba-pill u `paper` pao na 4.22).
- **Osnovice spuštene:** `check:palette` 93 → **77** · `check:tokens` 3 → **2** iznimke.
  Dokaz: `check:contrast` 358 ✅ · `check:contrast:live` 0 ispod praga (13 ruta × 4 teme) ✅.

## 2026-09-01 (FABLE) — **MREŽA B6: CI shardanje — blok B zatvoren** · **ADR-033: dvojezičnost se PREVODI**

### Promijenjeno
- **CI (`.github/workflows/ci.yml`):** Playwright izašao iz `build` joba u **matrix-job s 2
  sharda** (`--shard=i/2`, `workers: 1` unutar svakog — determinizam netaknut); `build`
  zadržava brze brane (`needs: build` = fail-fast, sada **24 s** do prve presude). Prvi run
  (ujedno **prvi CI run Node 24**): build 0.4 min · shardovi 11.2/10.0 min · zid **11.8 min**
  umjesto 19.4. Rast suite = novi shard, nikad veći timeout.

### Popravljeno
- **`@emnapi` bomba se opet naoružala** (`core`/`runtime@1.11.3` ispod Tailwindovih
  `bundleDependencies`) — prvi push je oborio `npm ci` u 5 s; lock popravljen po receptu iz
  zaglavlja (`npx npm@11 install`). **`check:lockfile` (Kvar 3):** drugi npm se sada vrti
  **uvijek** — runner nosi najnoviji minor svog majora (11.19 vs lokalnih 11.6), a
  razrješivači se razlikuju već po minoru; usporedba samo majora davala je lažnu sigurnost.

### Odlučeno
- **ADR-033 (Leon):** dvojezičnost se **prevodi, ne gasi** — sučelje HR/EN, cilj 421 → 0
  (backlog, bez termina); **jezik sučelja NIKAD ne dira predmete** (jezik gradiva = svojstvo
  programa, ADR-012).
