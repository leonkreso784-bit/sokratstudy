# Bugovi & Lekcije naučene

Pratimo greške i učimo iz njih. Aktivne bugove gore, riješene + lekcije dolje.

## Kako bilježimo
- **ID:** BUG-NNN
- **Status:** 🔴 otvoren · 🟡 u radu · ✅ riješen
- **Težina:** kritičan / visok / srednji / nizak
- Opis · Koraci za reprodukciju · Uzrok · Rješenje · **Lekcija**

> **Opseg:** ovdje idu **bugovi proizvoda/sajta** (ono što korisnik vidi/doživi). *Tooling/proces* problemi
> (npr. generator-skripta, Windows libuv smetnja pri gašenju, lažni KaTeX-checker pozitiv) bilježe se u
> `PROGRESS.md` + `CLAUDE.md`/memoriji jer ne utječu na korisnika. Bugovi su numerirani uzlazno (BUG-001…),
> a u popisu su aktivni gore pa riješeni (najnoviji riješeni na vrhu).

---

## Aktivni

### BUG-053 — Napredak puca na materijalu iz AI nacrta: `schemaVersion` je čitan kao lekcija

- Status: ✅ **riješen na grani `feat/f6-mcp` 01.10.** (lokalno, nije na produkciji) · Težina: **visok**, ali
  **latentan**: na produkciji 01.10. nijedan dokument nema `schemaVersion` (baza + datoteke provjerene); pogodio bi
  SVAKI materijal nastao prihvatom AI nacrta (②/4) · Našao: **Sentry** (`JAVASCRIPT-4`), na Leonovom pokusu na stagingu.
- **Reprodukcija:** otvori materijal čiji dokument nosi `schemaVersion: 2` (staging `c627b8a7…`) → početna/napredak →
  `TypeError: Cannot read properties of undefined (reading 'length')` u `Array.reduce`.
- **Uzrok:** `js/progress.js` (3 mjesta) iterirao je `Object.keys(nav.data)` mimo `getCategories` → `(2).quiz.length`.
  Pravilo „meta-ključ nije lekcija" je svaki čitač morao zapamtiti; devet jest, jedan nije.
- **Zašto je izgledalo kao produkcija:** `js/monitoring.js` nije slao `environment`, pa Sentry `localhost` + staging
  zove „production".
- **Rješenje:** `getStudyData()` (`js/content-loader.js`) = **jedini ulaz** u `AppState.nav.data`: samo lekcije, svaka
  s nizovima `flashcards`/`quiz`/`fillBlanks`, plitka kopija (keširani dokument netaknut). `progress.js` usput na
  `getCategories`. Sentry dobiva `environment` po adresi (production · preview · development). Brana
  `tests/unit/get-categories.test.js`: 8 novih testova crveno na starom kodu + test „jedini ulaz" (svaka dodjela
  `nav.data =` u `js/` ide kroz `getStudyData`; mutacija na staru dodjelu → crveno).
- **Lekcija:** pravilo koje svaki čitač mora zapamtiti prekršit će sljedeći čitač — podatak se čisti **na ulazu**, a
  brana tvrdi da je ulaz jedini. I: monitoring bez okruženja šalje istragu na krivo mjesto.

### BUG-052 — Brisanje računa puca za svakoga tko je objavio materijal, a slike se obrišu prije toga

- Status: ✅ **riješen na PROD-u 29.09.** (SQL uz Leonov OK, provjereno `pg_get_constraintdef`: ON DELETE SET NULL); grana s branom čeka merge ·
  Težina: **visok** (GDPR čl. 17), ali **latentan**: na produkciji 29.09. pogođen samo administrator (1 od 8), koji se
  ionako ne može sam obrisati · Našao: **F6 sigurnosna analiza, dionica C** (nalaz N10), mjerenje, ne prijava.
- **Reprodukcija:** korisnik objavi materijal → Profil → Obriši račun → 409 `Database error deleting user`. Slike su
  obrisane, a račun, materijal, prijava i AI-token ostaju.
- **Uzrok:** `node_content_versions.edited_by references auth.users(id)` bez `on delete` (`supabase/f1-nodes.sql`);
  okidač `snapshot_node_content` ga puni pri svakoj objavi. `delete-account` briše slike PRIJE `deleteUser`, pa pad
  ostavi pola.
- **Zašto ga brana nije uhvatila:** `delete-account-check` T5 stvarao je materijal, ali ga **nikad nije objavio** —
  `edited_by` je ostao prazan i test je prolazio na slučaju koji ne dira pokvareni stupac.
- **Rješenje:** `supabase/h1-edited-by-set-null.sql` (`on delete set null`, kalup `content_versions`) + T5 objavi
  materijal i u pripremi TVRDI da povijest nosi autora. Obrnuta provjera: novi T5 na starom stanju **4 pada**
  (409, korisnik živ, materijal i povijest ostali) → poslije popravka **22/22**.
- **Lekcija:** test brisanja mora napuniti **svaki** stupac koji pokazuje na korisnika, i u pripremi dokazati da ga je
  napunio. Kaskada koju shema „obećava" nije dokaz — dokaz je brisanje korisnika koji je taj redak stvarno stvorio.

### BUG-039 — Ljestva širine kviza i dva pravila za male telefone su MRTVI: kasniji širi upit gasi raniji uži

- Status: 🔴 **otvoren** — svjesno odgođen, jer ispravak je **odluka o izgledu**, a našao ga je
  migracijski korak (C5a/3, spec §11.3) · Težina: **nizak** — sve je upotrebljivo, samo nije ono
  što je napisano · Našao: **mjerenje pred migraciju C5a/3**, ne prijava.
  **➕ Od 2026-08-31 (MREŽA B4) cijeli je razred mjerio `check:cascade`; od C7/3 (2026-09-01)
  brana je UMIROVLJENA jer je njezin predmet umro — `css/responsive/*` više ne postoji,
  pa ni gašenje među tim datotekama nije moguće** (spec FRONTEND_REDIZAJN §14.3). Povijest:
  23 zatečena gašenja imenuje `scripts/cascade-baseline.json`, svako novo = pad. Bug time
  prestaje biti „postoji negdje" — popis s uvjetima i vrijednostima čeka C7.

- **Opis / izmjereno** (Chromium, ruta `#/subject/te2/first-midterm/quiz`):

  | širina prozora | `.quiz-container` `max-width` **stvarno** | što je NAPISANO |
  |---|---|---|
  | 768–1023 | **650 px** | `05` → 600 px |
  | 1024–1279 | **650 px** | `05` → 700 px |
  | 1280–1535 | **650 px** | `05` → 800 px |
  | ≥ 1536 | **650 px** | `05` → 900 px |

  Na monitoru od 1920 px kviz je dakle širok 650 px. Isti mehanizam na drugom kraju ljestve:
  `01 @max-374` piše `.answer-btn { padding: 0.75rem; font-size: 0.85rem }` i
  `.question-card h2 { font-size: 1rem }`, pa na telefonu od 320 px ništa od toga ne vrijedi —
  gumbi odgovora imaju iste razmjere kao na 767 px.

- **Uzrok:** medijski upit **ne nosi specifičnost**. Kad dva pravila imaju isti selektor,
  presuđuje **redoslijed izvora**, a ne to koje je „preciznije". `responsive/06` je zadnja
  datoteka u nizu, pa njezin `@media (min-width: 768px) { max-width: 650px }` gasi četiri
  uža upita iz `05`; `responsive/02` (`max-width: 767px`) iz istog razloga gasi `01`
  (`max-width: 374px`). **Ista mehanika kao BUG-037**, samo na širini umjesto na orijentaciji —
  a to je već treći put da se pojavi, pa je riječ o obrascu, ne o slučaju.

- **➕ ČETVRTA POJAVA (C5a/4, 2026-08-30) — `.progress-overview`:** `responsive/01` piše dvije
  prečke za mrežu kartica napretka (`@768: 1fr 1fr`, `@1024: 1fr 1fr 1fr`, uz `gap: 1.5rem`).
  Iscrtava se **nijedna**: `responsive/06` nosi vlastitu ljestvu na ISTIM pragovima (`@480` 2
  stupca, `@768` **3**, `@1024` **4**, `gap: 1rem`) i, budući da je zadnja datoteka, uzima sve.
  Izmjereno: `gap` je **16 px na svakoj širini**, a stupaca je 2/3/4 ondje gdje je `01` tražio
  −/2/3. Ovdje ni „uži upit" nije bio u igri — pragovi su **isti**, pa je presudio isključivo
  redoslijed datoteka. To je najčišći oblik ovog buga koji smo dosad vidjeli.

  Uz to je u istoj cigli nađen i **cijeli mrtvi blok** u `responsive/04` („ANALYTICS/PROGRESS
  SECTION MOBILE", deset pravila, osam za selektore kojih nema nigdje u `*.html`/`js/**`).
  To NIJE isti razred — nije redoslijed nego markup koji se promijenio bez CSS-a — ali je
  nađeno istim mjerenjem, pa stoji ovdje da se ne izgubi.

- **Zašto NIJE popravljeno u C5a/3:** cigla je migracija i njezin je izlazni uvjet `css:diff`
  s nula razlika. „Popravak" bi značio odlučiti **koliko širok kviz treba biti na velikom
  monitoru** i **koliko sitan na 320 px** — dvije odluke o izgledu koje nijedna brana ne mjeri.
  Mrtva pravila su zato **obrisana** (brisanje ne mijenja izračunati stil), a namjera je
  zapisana ovdje s brojkama.

- **Rješenje (kad se radi):** odlučiti ciljne širine i napisati ih **na jednom mjestu** —
  u `css/quiz-section.css`, gdje ljestva sada i živi, pa redoslijed datoteka više ne može
  presuditi umjesto autora. Prirodno mjesto: **C5a/4 ili C7**, zajedno s BUG-037.

- **Lekcija:** *uži upit ne pobjeđuje širi — kasniji pobjeđuje raniji.* Dokle god su pragovi
  razasuti po šest datoteka, „napisao sam pravilo za 1536 px" ne znači da će se ono iscrtati.
  Zato cigle ove faze sabiru ljestvu **uz komponentu**: ne radi urednosti nego zato da autor
  vidi cijelu ljestvu odjednom i da redoslijed prestane biti nevidljiv.

---

### BUG-037 — Kartica u landscapeu telefona traži 280 px visine u pojasu od 205 px, a dva pravila pisana protiv toga su mrtva

- Status: 🔴 **otvoren** — ⚠️ **preusmjeren 2026-08-30 (C5a/4)**: landscape ispod 768 px JEST
  izmjeren u toj cigli, ali ekran **nije ušao u branu** — 22 nalaza na 568 × 320 pripadaju
  consentu (banner od 123 px na ekranu visokom 320) i donjoj traci (gumb ispod bočnog izreza),
  dakle **C6 i C7**, a osnovica `phone-baseline.json` je prazna i to joj je vrijednost.
  Brojke i obrazloženje: `BACKLOG.md` §TELEFON POLEGNUT + spec §11.4. **Ovaj bug time čeka C7**,
  zajedno s BUG-039 · Težina: **nizak** — ekran je upotrebljiv, traži skrol · Našao:
  **mjerenje pred migraciju C5a/2**, ne prijava.

- **Opis / izmjereno** (Chromium, `hover:none` + `pointer:coarse`):

  | ekran | `min-height` kartice | visina kartice | slobodno između gornje trake i donje |
  |---|---|---|---|
  | 568 × 320 | 280 px | 280 px | **205 px** |
  | 667 × 375 | 280 px | 280 px | **260 px** |
  | 736 × 414 | 280 px | 280 px | 299 px (stane) |

  Kartica time strši ispod donje trake, a gumbi „Znam / Ne znam" dolaze tek iza nje.

- **Uzrok:** DVA pravila napisana baš protiv toga su **mrtva**:
  `responsive/04` → `@media (max-width:900px) and (orientation:landscape) { .flashcard { min-height:150px } }`
  (nosilo je i komentar o BUG-016, dakle netko je na to već jednom mislio) i
  `responsive/05` → `@media (max-height:500px) and (orientation:landscape) { … 220px }`.
  Oba tuče **kasniji** `responsive/06` →
  `@media (max-width:767px) and (hover:none) and (pointer:coarse) { .flashcard { min-height:280px } }`,
  koji o orijentaciji ne zna ništa i nikad nije ni namjeravao presuditi landscape.

- **Zašto se NE popravlja u C5a/2:** ispravak nije jednoznačan (150 ili 220?) i mijenja razmjere
  ekrana koji **nijedna brana ne mjeri** — `phone-gate` landscape mjeri na 852 px, gdje donja
  traka ne postoji. Migracijska cigla seli jezik, ne izgled. Brojke iz ove tablice su upravo ono
  što je spec §11.1 tražio da se pribavi „s izmjerenim brojkama, ne prije".

- **✅ LEONOVA PRESUDA (2026-08-30): *„Oke nije toliki problem"*.** Ostaje otvoren **svjesno**, ne
  zaboravljeno. Ne popravlja se ni u C5a/2 ni prije C5a/4; brojke iz tablice gore su ono što je
  spec §11.1 tražio da postoji **prije** odluke, i sada postoje.

- **Lekcija (ista obitelj kao C5a/1 ③):** **pravilo koje ne zna za tuđu os tiho presuđuje i o
  njoj.** Upit po ŠIRINI i vrsti pokazivača pobijedio je dva upita po ORIJENTACIJI samo zato što
  je napisan kasnije. Redoslijed datoteka je time postao skrivena politika.


---

## Riješeni / Lekcije

> **BUG-047…051 (2026-09-12)** su pet nalaza jedne **vanjske recenzije repozitorija** koju je Leon donio; svih
> pet je potvrđeno u kodu prije popravka, nijedan nije bio zapisan. Grana `fix/napredak-pouzdanost`, svaki
> popravak test-prvo (crveno na `main`-u, zeleno poslije). ⚠️ BUG-045/046 žive na parkiranoj grani
> `feat/tinder-kadar` — brojevi ovdje su preskočeni da se ne sudare.

### BUG-051 — Odbijeni paket ostaje zapamćen: nakon pada mreže `paket()` vraća staru grešku bez ijednog zahtjeva

- Status: ✅ **riješen 2026-09-12** (N5) · Težina: **srednji** · Našao: vanjska recenzija.
- **Opis.** Mreža otkaže usred otvaranja lekcije → poruka „ne mogu učitati". Mreža se vrati, korisnik opet
  otvori lekciju → ista poruka, bez ijednog zahtjeva. Pomaže samo osvježavanje stranice.
- **Uzrok.** `ubaci()` je pri grešci brisao svoj URL iz `uTijeku` (pa bi pojedinačna skripta smjela ponovno),
  ali `paketi[ime]` je držao ODBIJENO obećanje — idempotencija „drugi poziv vraća isto obećanje" vrijedila je
  i za pad.
- **Rješenje.** Pad briše `paketi[ime]` (samo ako je to još isto obećanje). `tests/unit/loader-retry.test.js`:
  lažni `document` broji koliko je puta stvoren `<script>` za isti paket — pad → 2, uspjeh → 1.
- **Lekcija.** Keširanje obećanja kešira i njegov neuspjeh. Idempotentno je smjelo biti samo ono što je uspjelo.

### BUG-050 — Odjava ostavlja napredak, sljedeća prijava ga spaja u KOJI GOD račun

- Status: ✅ **riješen 2026-09-12** (N4) · Težina: **visok** (zajedničko računalo: B trajno nasljeđuje A-ovo
  učenje, u svoj oblak) · Našao: vanjska recenzija (simulacijom).
- **Opis.** A uči prijavljen, odjavi se (toast: *„Progress stays on this device"*). B se prijavi na istom
  pregledniku → `pullAndMerge` spoji A-ove lokalne ključeve s B-ovim oblakom i pošalje gore.
- **Uzrok.** Lokalni napredak nije imao pojam vlasnika; sync je spajao „što je lokalno" s „tko je prijavljen".
- **Rješenje (pravilo, Leon 12.09.).** Lokalni napredak pripada računu koji ga je ZADNJI sinkronizirao
  (`sokrat-progress-owner`, nije među `watchedKeys` → nikad u oblak). Ista osoba natrag → spaja se kao dosad;
  **drugi račun → lokalno se briše prije pulla**; gost bez ijednog računa → spaja se u prvi račun. Tri
  tvrdnje u `cloud-sync.test.js`.
- **Lekcija.** „Offline-first" bez vlasnika podataka je „tko god sjedne prvi". Obećanje toasta i dalje vrijedi —
  do trenutka kad netko drugi sjedne.

### BUG-049 — Pali prvi push (u pullu) se nikad ne ponovi, a „sinkronizirano" se ispiše

- Status: ✅ **riješen 2026-09-12** (N3) · Težina: **visok** (tih gubitak) · Našao: vanjska recenzija.
- **Opis.** Prijava na lošoj mreži: pull prođe, spojeno stanje se pokuša poslati, upsert padne. Profil piše
  „sinkronizirano u HH:MM", a ključ nikad ne ode gore — ni u sljedećim intervalima.
- **Uzrok.** `pullAndMerge` je pisao `snapshot[key]` PRIJE upserta i zvao `markSynced()` bez obzira na ishod;
  `collectChanged` uspoređuje s `snapshot`-om pa ključ više „nije promijenjen". P4 (POLICA) je isti kvar
  zatvorio u `pushChanges`, a pull ga je imao na svoj način — test je štitio jedan ulaz od dva.
- **Rješenje.** Ključ bez razlike prema oblaku dobiva snapshot odmah; ključ koji ide gore tek kad upsert
  prođe; `markSynced()` samo kad jest. Tvrdnja „PAD SLANJA U PULLU" u `cloud-sync.test.js`.
- **Lekcija.** Kad se isti kvar zatvori na jednom ulazu, potraži DRUGI ulaz u isto stanje — `snapshot` su
  pisala dva mjesta, test je čuvao jedno.

### BUG-048 — Spajanje napretka gubi kvizove: nizovi bez stringova → „pobjeđuje dulje", i test to tvrdi

- Status: ✅ **riješen 2026-09-12** (N2) · Težina: **visok** · Našao: vanjska recenzija.
- **Opis.** Dva uređaja s po jednim kvizom: `[80]` i `[90]` → `[80]`. Rezultat s drugog uređaja nestaje. Isto i
  za `flashcardsLearned` dok je nosio brojeve (BUG-047).
- **Uzrok.** `mergeValues`: unija samo kad su SVI elementi stringovi; inače dulji niz, kod jednake duljine
  lokalni. Test `polja koja nisu stringovi → pobjeđuje DULJE` je to očekivao — zeleno je značilo „gubi kako je
  zapisano".
- **Rješenje.** Multiskup-maksimum po vrijednosti (JSON): svaka vrijednost preživi u onoliko primjeraka koliko
  ih ima strana s više; `[80,80]` ostaje dvaput (skup bi spljoštio); spajanje sa sobom ne raste. Svjesno
  ograničenje: isti rezultat jednom na svakom od dva uređaja stopi se u jedan. Odbijeno: „pokušaji s id-om i
  vremenom" (mijenja oblik u bazi i `quiz.js` za isti dobitak).
- **Lekcija.** Test koji tvrdi rezultat ostari s podacima — svojstvo („ništa ne nestaje") je bilo zapisano
  u susjednom testu, ali samo za stringove. Provjeri koje VRSTE stvarno prolaze kroz funkciju.

### BUG-047 — Naučena kartica se pamti po POZICIJI u promiješanom špilu; napredak po predmetu, špil po lekciji

- Status: ✅ **riješen 2026-09-12** (N1) · Težina: **visok** (broj „naučeno" je bio šum od prvog dana) ·
  Našao: vanjska recenzija; opseg (tri lekcije u istom nizu) nađen pri provjeri.
- **Opis.** `markKnown` gura `cards.index` u `flashcardsLearned`; `initFlashcards` svaki put promiješa. Sutra
  je na poziciji 0 druga kartica, obje se vode kao „0". Napredak je po PREDMETU (`storageKey`), špil po LEKCIJI →
  indeksi midterm-1, midterm-2 i final u istom nizu. Sync-unija je pretpostavljala stringove pa brojeve nije
  ni dohvaćala (BUG-048).
- **Uzrok.** Kartica nikad nije imala identitet u zapisu napretka; schema v2 id-evi (U2a) su dodani za
  editor, ne za napredak — i **1 175 od 5 737 kartica ih nema** (sedam HR predmeta + `accounting` M2/Final).
- **Rješenje.** `cardIdentity()` u `flashcards.js`: `card.id` kad postoji, inače FNV-1a otisak
  `kategorija|pitanje` (stabilan dok se pitanje ne mijenja); uvijek string. `final` = kopija M1⊕M2 → isti id u
  obje lekcije, naučeno u midtermu vrijedi u finalu. Stari brojevi ispadaju u `loadProgress` i pri prvom upisu
  (upsert piše cijeli redak → i iz oblaka); brojka po lekciji = presjek sa špilom; profil broji samo stringove.
  `tests/unit/flashcard-identity.test.js`, 6 tvrdnji.
- **Lekcija.** Indeks u promiješanom nizu nije identitet — a „naučeno" koje raste svaki put kad otvoriš
  lekciju izgleda kao napredak, pa nitko ne pita. Zapis koji sinkronizacija ne razumije (brojevi u nizu za
  stringove) je drugi kvar iz istog uzroka.

### BUG-045 — Skinut predmet se offline otvori PRAZAN: gradivo ostaje neučitano iako su datoteke u kešu

- Status: ✅ **POPRAVLJEN 2026-09-06** (voditelj, isti dan; nađen usput u F1/13, ondje nije popravljen jer
  dira SW/policu, ne kartice) · Težina: **visok** — pogađa jedini scenarij zbog kojeg polica postoji ·
  Našao: **brana koja je pala tek kad je F1/13 maknuo fikciju** (v. Lekcija).

- **Opis / izmjereno** (sonda, Chromium iPhone-SE-375, `statistics`, 2026-09-06): predmet se skine
  (`data-offline-state="ready"`), mreža se ugasi, pa se otvori lekcija:

  | put | `isSubjectContentLoaded` | `AppState.cards.deck` | što piše na kartici |
  |---|---|---|---|
  | offline, lekcija otvorena PRVI put (hladna navigacija) | **false** i poslije **30 s** | **0** | „No flashcards available for this lesson." |
  | lekcija otvorena dok mreža radi, pa mreža ugašena | true | **61** | pravo pitanje |

  Datoteke JESU u kešu — prva tvrdnja istog speca (`⛔ KRITERIJ FAZE`) to dokazuje tako što sama
  pozove `SokratContent.loadLesson(...)` i dobije gradivo. Ne učita ga dakle **aplikacija na svom
  putu**, iako keš ima sve.

- **Reprodukcija:** skini predmet na polici → zrakoplovni način → otvori `#/subject/<id>/<lekcija>`
  → bilo koji način učenja je prazan.

- **Uzrok (izmjeren, ne pretpostavljen):** NE dual-read. **`sw.js` nikad nije spremao runtime assete.** U `spremi()` je
  `res.clone()` stajao unutar `.then((c) => c.put(req, res.clone()))` — a dok `caches.open()` čeka, `respondWith` je odgovor već
  predao stranici i ona mu je potrošila tijelo, pa je klon bacao `TypeError: Response body is already used`. Pad je gutao
  `.catch(() => {})`. Posljedica od F3 3A: u `sokrat-cache-*` je stajao **samo precache s instalacije** (shell, CSS, manifest);
  nijedna skripta, ni zagrijani paket načina učenja (`SokratLoad.zagrij` je time bio no-op). „Offline radi" je značilo „HTTP-keš
  preglednika još drži datoteke" — Chromium ga drži, iOS izbacuje → na iPhoneu je skinut predmet imao gradivo na polici, ali
  `js/flashcards.js` & co. nisu imali odakle doći → `SokratLoad.paket('study')` pada prije nego loader išta učita, toast
  „Could not load", špil 0. Isti kasni klon bio je i u navigacijskom putu (shell), ali njega je spašavao precache.
  Dokaz: presretanje u ŽIVOM SW-u (`sw.evaluate`) — `bodyUsed=true` u trenutku klona, `put` nikad; s klonom odmah `put OK`.
  U headless Chromiumu se kvar NIJE vidio ni s hladnim startom, dok HTTP-keš nije isključen (CDP `Network.setCacheDisabled`).
- **Popravak:** ① `sw.js` — klon sinkrono PRIJE `caches.open` (u `spremi()` i u navigaciji); ② `offline-store.js` —
  `download()` piše „ready" TEK kad `zagrijNacineUcenja()` završi (dotad fire-and-forget: potvrda je stizala dok su se
  skripte još skidale); ③ `zagrijPoslijeDeploya()` — novi SW briše stari runtime keš, polica preživi, paket ne → pri startu,
  JEDNOM po verziji (`localStorage sokrat-offline-warm-v`), ponovno zagrij paket za sve s police.
- **Brane:** `tests/sw.spec.js` „SW stvarno spremi skriptu koju stranica zatraži" (mjeri KEŠ, ne dojam; obrnuto na starom
  `sw.js` = crveno) · `tests/offline-study.spec.js` „⛔ BUG-045: hladno bez mreže i BEZ HTTP-keša" (nova stranica + CDP
  cache disabled; obrnuto = špil 0) · `tests/unit/offline-store.test.js` +3 (ready čeka zagrijavanje · pad zagrijavanja ne
  ruši skidanje · zagrij poslije deploya jednom po verziji).

- **Druga lekcija (voditelj):** `.catch(() => {})` na putu koji „ne smije srušiti odgovor" sakrio je da SW **tri tjedna** ne
  radi ono zbog čega postoji — a brane su bile zelene jer su mjerile ISHOD (stranica se otvori offline) koji je davao HTTP-keš
  preglednika, ne SW. Brana mora mjeriti MEHANIZAM koji tvrdi (što je u SW-kešu), ili isključiti sve druge putove do istog
  ishoda (HTTP-keš). Isti razred kao BUG-023: „zeleno lokalno nije zeleno".
- **Zašto je ovoliko dugo bio nevidljiv (LEKCIJA):** tvrdnja P4 (`napredak stečen BEZ MREŽE stvarno
  završi na uređaju`) klikala je ✓ i čitala `localStorage`. Do F1/13 je taj gumb bio vezan **ravno
  na `markKnown`**, koji upisuje `cards.index` **i kad špila nema** — pa je test bio zelen nad
  praznom karticom, mjereći da je *nešto* zapisano, a ne da je zapisan napredak. F1/13 je sud
  ograničio na neprazan špil (`sudi()`), fikcija je pala, i tek tada se vidjelo da offline nema
  gradiva. **Tvrdnja koja ne provjeri PREDUVJET svoje radnje mjeri vlastiti nusprodukt** — zato P4
  od sada tvrdi `deck.length > 0` prije nego išta klikne.

### BUG-046 — Pilula kategorije na obojenoj kartici pada AA (3,31–4,28), a a11y-brana je to čitala kao šutnju

- Status: ✅ **POPRAVLJEN 2026-09-08** na grani `feat/tinder-kadar` (**na produkciji kvar i dalje stoji** dok
  Leon ne odluči o deployu) · Težina: **srednji** (čitljivost, WCAG AA, svaka obojena kartica u katalogu) ·
  Našao: istraga crvenog CI-ja koji je dan ranije **krivo pripisan** drugoj cigli.

- **Opis / izmjereno:** `.card-category` crta podlogu kao `color-mix(in srgb, currentColor 20%, transparent)` —
  dakle 20 % ISTE tinte kojom je i tekst u piluli. Na plohi bez boje je to bezopasno; na **punoj ispuni akcenta**
  (C2/M3b) tamna tinta zatamni podlogu **ispod tamnog teksta**:

  | akcent | pilula | omjer (treba 4,5) |
  |---|---|---|
  | `#6366f1` | `#4f52c1` | **3,31** |
  | `#8b5cf6` | `#6f4ac5` | **3,46** (axe na živoj stranici) |
  | `#ec4899` | `#bd3a7a` | 4,05 (axe na živoj stranici) |
  | `#16a34a` | `#12823b` | 4,28 |

  Kroz cijelo gradivo pada **11 od 20 boja**. Vrijedi i na stolnom (pravilo nije pod `dodir`).

- **Zašto brana nije pisnula:** axe na produkciji na `#cardCategory` vraća `incomplete` s porukom *„background
  color could not be determined because it is overlapped by another element"* (`bgOverlap`) — naličje u
  `preserve-3d` prekriva lice u hit-testu. Gate sudi po **violationima**, pa je „ne mogu izmjeriti" pročitao kao
  „nema nalaza". Na produkciji su ondje **četiri** takva elementa: tekst kartice nikad nije bio izmjeren.

- **Kako je izašao na vidjelo:** F1/12 ④/⑤ karticu u miru poravnaju (`transform-style: flat`, `perspective: none`)
  jer iOS inače ne dovodi dodir do skrolera — i time maknu zaklon. Axe odjednom mjeri i pada. Zato je CI pocrvenio
  na `fb49d4d` i zato je 07.09. **krivo pripisan ⑦** (fiksirano tijelo).

- **Zašto pada nasumično:** `initFlashcards()` miješa špil bez sjemena; 24 od 56 kartica marketinga M1 nosi boju
  koja pada = **42,9 % pokretanja**. Izmjereno: grana **3 pada / 6**, produkcija **12/12 zeleno** (isti test).

- **Rješenje:** pilula miješa **SUPROTNU** tintu — `[data-ink="dark"]` → `--color-on-tint-light`, `[data-ink="light"]`
  → `--color-on-tint-dark`. Pod tamnom tintom pilula posvijetli, pod svijetlom potamni; najgori omjer kroz gradivo
  **6,61**, nijedna boja ne pada. Kartica bez boje ostaje na `currentColor` (fallback-ugovor M3b).
  Brana: `tests/unit/card-tint-contrast.test.js` (10 tvrdnji, čita CSS/tokene/prag/boje umjesto da ih prepisuje;
  obrnuto = 2 crvene koje imenuju 9 boja). A11y-suita **20/20 u 10 pokretanja**.

- **Lekcija ①:** *`incomplete` nije prolaz.* Brana koja sudi samo po nalazima čita „ne mogu izmjeriti" kao „nema
  što mjeriti" — isti razred propusta zbog kojeg u `check-contrast.js` postoji `parseColor` (prazan rezultat koji
  znači „ne znam pročitati" ne smije se tumačiti kao „nema što mjeriti").
- **Lekcija ②:** *popravak koji nešto otkrije nije uzrok onoga što je otkrio.* Crveni CI je bio pripisan zadnjem
  commitu **bez ijednog mjerenja**; protučinjenični pokus (isti test na produkciji) oborio je to u dvije minute.
- **Lekcija ③:** brana koja ovisi o **nasumičnom** ulazu (miješan špil) nije brana nego kocka — ista činjenica
  mora imati determinističku provjeru izvan preglednika.

### BUG-044 — Ljepljivi hover: poslije dodira koji mijenja rutu, gumb pod prstom svijetli a nije dotaknut

- Status: ✅ **riješen 2026-09-05** — ① dodir (F1/8 ①; Leon na iPhoneu: *„Ne svijetli, odlično"*) + ② miš
  (F1/8 ②; `hover-probe --profil=prelaz` mirno 2/2) · Težina: **visok** (Leon: *„jako naporno"*, *„od
  početka"*) · Našao: Leon na iPhoneu.
- **Opis.** Dodir na karticu promijeni rutu; WebKit (svaki preglednik na iPhoneu) zadrži `:hover` na
  onome što se sad nalazi pod prstom — nova kartica ima rub `brand-500`, pomak i sjenu, i ne prolazi ni
  nakon 3 s. Na mišu isto: nova kartica pod nepomičnim pokazivačem odmah je `:hover`.
- **Uzrok.** 130 `:hover` pravila (142 selektora) vrijedilo je i na uređajima BEZ hovera; presedan koji
  to rješava postojao je za tri gumba (`policies.css:12`), za ostalih 138 nije. Na mišu je uzrok sam
  preglednik: hover se računa po položaju pokazivača, ne po pokretu.
- **Rješenje ①.** `scripts/hover-css.js` u `build:css`: svako `:hover` pravilo pod `@media (hover: hover)`,
  na istom mjestu (medij ne mijenja ni redoslijed ni specifičnost); lightningcss parsira, tekst se
  prepisuje. Brana `check:hover`; sonda `scripts/hover-probe.js` (WebKit dodir: ljepljivo 2/2 → mirno
  2/2; miš: 0 razlika na 38 elemenata). **Leon na iPhoneu, preview `92269c2`: *„Ne svijetli, odlično."***
- **Rješenje ②.** `pauzirajHover()` (`js/utils.js`) stavi `data-hover-paused` na `<html>` kad se mijenja ono
  što je pod mišem — iz `navigateTo` **i `browseNaRazinu`** (browse-prelazi fakultet → smjer → godina ne idu
  kroz `navigateTo`; plan je to previdio, sonda ga je našla) — a prvi `pointermove` ga skine (`mousemove` ne:
  dodir ga šalje uz klik). Isti prolaz `hover-css.js` svakom hover-selektoru doda
  `:where(:root:not([data-hover-paused]))` (nula specifičnosti; 142/142, i onima već pod hover-medijem);
  `check:hover` traži prefiks. Dokazi: `hover-probe --profil=prelaz` ljepljivo 2/2 → mirno 2/2 + naoružano 2/2
  · miš `--usporedi` 0 razlika · css:diff 7 161 usporedbi 0 razlika · `tests/unit/hover-arm.test.js` 28 tvrdnji.
- **Lekcija.** Pravilo koje vrijedi „svugdje" vrijedi i tamo gdje mu stanje ne postoji; sposobnost
  (`hover`) se pita medijem, ne pretpostavlja. Kad alat ne može vratiti stablo, neka ga samo čita —
  prepis teksta po koordinatama parsera je manji zahvat od ponovne serijalizacije svega. I: popravak koji
  gađa ruter promaši svaki prelazak koji mijenja sadržaj bez promjene stranice — sonda mora mjeriti
  korisnikov scenarij, ne funkciju za koju misliš da ga nosi.

### BUG-043 — Zoom na dodir: zaštita je stajala iza njuškanja motora koje nijedna brana ne vidi, a prijavljena brana mjerila je telefon s mišem

- Status: ✅ **riješen** (2026-09-05, F1/10) · Težina: **visok** (Leon: *„još jedan veliki bug"* —
  stranica se na iPhoneu zumira i ne vraća) · Našao: **Leon na iPhoneu**, ne brana.
- **Opis.** *„Kada se više puta takne na jedno mjesto može se zoomat."* Dva mehanizma: ① iOS Safari
  pri fokusu polja s izračunatim fontom **< 16 px** zumira stranicu i ne vraća je — prijava
  (`.auth-modal__input`, 0,95rem = **15,2 px**, deset polja) i pretraga kataloga (`.cat-search-input`,
  0,9rem = **14,4 px**); ② Safarijev **dvostruki dodir** zumira gdje god `touch-action` to dopušta.
- **Uzrok — i zašto nijedna brana nije vidjela.** Za ① je u `css/variables.css` **već stajalo**
  pravilo `@supports (-webkit-touch-callout: none) { input, select, textarea { font-size: 16px
  !important } }`. To je **njuškanje motora**, ne sposobnosti: `CSS.supports('-webkit-touch-callout',
  'none')` je **false u Chromiumu i u Playwrightovom WebKitu** — dakle u SVAKOM motoru kojim mjerimo.
  Pravilo je bilo nevidljivo svakoj brani, a je li ga iPhone doista primjenjivao nije mogao reći nitko;
  Leonov nalaz kaže da zoom postoji. Za ② je repo držao `touch-action: manipulation` na dva mjesta
  (`.flashcard`, slijepa karta), a nigdje drugdje. **Drugo sljepilo, otkriveno novom branom:**
  `tests/phone.authed.spec.js` je otvarao kontekst samo s `viewport` — bez `hasTouch`/`isMobile` —
  pa je „telefon" iza prijave imao **miš** kao pokazivač: nijedan `(pointer: coarse)`/`(hover: none)`
  upit ondje nije bio istinit. Izmjereno: `pointer: coarse` pali **`hasTouch`**; `isMobile` sam ne.
- **Rješenje.** ① `@media (pointer: coarse) { :is(input, select, textarea):not([type="checkbox"]):not([type="radio"]) { font-size: 16px } }`
  u resetu — sposobnost umjesto njuškanja, specifičnost 0,2,1 umjesto `!important`; staro pravilo
  obrisano. ② `touch-action: manipulation` na `*` (reset) i u `css/legal.css` (stranice bez bundlea);
  dva lokalna primjerka maknuta (ADR-027). ③ **Tvrdnja ⑨** u `tests/helpers/phone-gate.js`, obje
  suite: nijedno tekstualno polje u DOM-u ispod 16 px — **i skrivena**, jer je zatvoreni modal prijave
  sutrašnje dotaknuto polje. ④ `tests/unit/touch-zoom.test.js` čita BUNDLE. ⑤ Prijavljena brana dobila
  isti telefon kao javna (`isMobile` + `hasTouch` + `deviceScaleFactor: 3`).
- **Provjera.** Obrnuto na STAROM bundleu: ⑨ = 11 polja × 13 ekrana × 4 širine crveno, unit-test 6/9
  crveno; s popravkom 0 i 9/9. Sonda `.jank/probes/polja-sva.js` u oba motora: od 195 polja točno 11
  promijenjeno, sve na 16 px, 52 netaknuta. Prijavljena suita 12/12 bez novih nalaza u ①–⑧.
  Dvostruki dodir **nije mjerljiv u headlessu** (24 mjerenja, `visualViewport.scale` uvijek 1 — gestu
  izvodi Safarijev UI-proces) → Leon na iPhoneu.
- **➕ Isti dan navečer (F1/11, ADR-034):** Leon je presudio da se stranica **uopće** ne smije zumirati, pa je
  `touch-action: manipulation` iz ② zamijenjen s **`pan-x pan-y`** (gasi i štipanje) uz metu `user-scalable=no,
  maximum-scale=1` na 6 stranica; `touch-zoom.test.js` prepisan (35 tvrdnji). Ovaj zapis opisuje stanje F1/10.
  **Leon na iPhoneu (kasno navečer):** dodir u polje i dvostruki dodir ✅ potvrđeno; **štipanje** ni meta ni `touch-action`
  nisu držali → `js/no-zoom.js` (F1/11 ②, `gesturestart` + `touchmove` `scale`, `passive: false`). Presuda opet iPhone.
- **Lekcija.** **Pravilo iza njuškanja motora je pravilo koje nijedna brana ne može izmjeriti** — a
  nemjerljivo pravilo je vjera, ne zaštita. Pravilo po SPOSOBNOSTI (`pointer`, `hover`) je istinito i u
  emulaciji, pa ga brana može obrnuto provjeriti. Drugo lice: **brana koja emulira telefon bez prsta
  mjeri uređaj koji ne postoji** — i to je isti razred kao „ruta koju brana ne imenuje je ruta koju ne
  vidi" (TESTING.md): nova tvrdnja je vrijedila i zato što je razotkrila kontekst stare.

### BUG-042 — Kolačić-traka je oborila CI kontrastom koji na ekranu ne postoji (treći put ista utrka)

- Status: ✅ **riješen** (2026-08-31) · Težina: **srednji** (lažni crveni CI, ne kvar proizvoda) ·
  Našao: CI job „Lint + verify + tests" na `feat/c5a-modovi`; lokalno zeleno u 533/533
- **Opis.** `tests/a11y.spec.js:70` (stranica lekcija) pao je na CI-ju s tri `serious`
  color-contrast nalaza, a nijedan nije bio na kontroli koju taj test čuva:
  `a[data-i18n="cookie.privacy"]` **4.05**, `#cookieReject` **3.54**, `#cookieAccept` **4.05**.
  Isti tokeni na punoj neprozirnosti daju **6.35 / 5.67 / 6.35** — dakle prolaz s rezervom.
- **Uzrok.** `.cookie-banner` ulazi animacijom `cookieSlideUp` (0.28 s, `opacity: 0 → 1`), a
  **axe-core u boju uračunava neprozirnost PREDAKA**. Na sporom CI-runneru je uzorkovao traku
  na **78 %** i izmjerio izmiješanu boju. Da je riječ o prozirnosti a ne o paleti dokazuje
  aritmetika: svih **šest** kanala daje istu alfu (0.780–0.787).
  ⚠️ Prozor je uzak u oba smjera — pri `opacity: 0` axe element **preskoči**, a već na 0.83
  (izmjereno lokalno) omjer prijeđe prag. Zato je lokalno bilo zeleno, a CI crven.
- **Zašto je prošlo kroz branu koja to već zna.** `tests/helpers/axe-gate.js` nosi ovu pouku
  zapisanu **dvaput** (2026-08-13 i 2026-08-15) i ima `smiri()` koji je rješava. Ali
  `a11y.spec.js` je uvozio **samo `gateViolations`** i zvao axe izravno — pa je smirivanje
  zaobišao. Prvi sken (redak 76) nije imao **nikakvo** smirivanje, drugi (redak 81) je imao
  točno onu jednokratnu `finish()` inačicu koju helper u komentaru opisuje kao **dokazano
  nedovoljnu**. Znanje je postojalo; nije bilo na putu izvršavanja.
- **Rješenje.** ① Sva mjerenja u `a11y.spec.js` idu kroz `skeniraj()` (svih 6 testova, ne samo
  pali — ostali su prolazili slučajno, jer `waitForTimeout(400)` > 280 ms animacije).
  ② `smiri()` više **ne nastavlja tiho**: ako se nakon 6 pokušaja + 250 ms neka **konačna**
  animacija još vrti, baca iznimku s njezinim imenom. ③ `tests/unit/axe-gate-usage.test.js` —
  strukturna brana koja čita s diska svaki `tests/a11y*.spec.js` i traži da nijedan ne skenira
  mimo helpera (uz obrnutu provjeru na kodu koji je kvar pustio).
- **Provjera.** Traka zamrznuta na `opacity: 0.78` reproducira **točno** CI-jeva tri nalaza i
  ista tri omjera; na punoj neprozirnosti ih je nula. Nakon popravka, uz fade-in rastegnut na
  **30 s** (107× gore od CI-ja), traka je u trenutku mjerenja na `opacity: 1` i nalaza nema.
- **Lekcija.** **Pouka zapisana u helperu čuva samo one koji helper zovu.** Tri puta isti kvar,
  tri puta popravak na jednom mjestu — a treći je put prošao kroz spec koji je iz tog istog
  helpera uvezao sve osim onoga što ga rješava. Kad se popravak svede na „radi to ovako", uz
  njega ide **brana koja provjerava da se tako i radi**, inače je to bilješka (ADR-027).
  Drugo lice iste pouke: **mjerač koji ne uspije stabilizirati ekran mora pasti, ne izmjeriti
  ga takvog** — to je isti zahtjev koji je faza već postavila `css:diff`-u i `check:contrast:live`-u.

### BUG-040 — Boje teksta u gradivu bile su nevidljive na zadanoj temi, a tri brane su to propustile

- Status: ✅ **riješen** (2026-08-31, C5b/0) · Težina: **visok** — pogađa čitljivost sadržaja ·
  Našao: priprema za C5b/1, mjerenjem tvrdnje koju je `palette-breakdown` već iznosio
- **Opis.** 11 zakucanih boja teksta (`.lb-color-*` ×8 u `learn-blocks.css`, `.ex-tacc-dr/-cr` u
  `exercises.css`, `.katex-error` u `math.css`) pisano je za tamnu podlogu. Zadana tema je od C3
  svijetla. Izmjereno kroz sve teme i sve tri plohe: **165 usporedbi, 103 ispod AA** —
  `.lb-color-amber` **1.67** na bijelom, `.ex-tacc-dr` 1.80, `.katex-error` 2.78. U `chalk`/`mint`
  sve prolaze (4.4–10.7), pa je kvar bio **nevidljiv onome tko gleda tamnu temu**.
- **Reprodukcija.** Zadana tema (`academic`) → obojen tekst u bloku gradiva, ili T-konta u vježbi
  računovodstva nakon upisa stavke, ili formula s greškom. Tekst se stapa s plohom.
- **Uzrok.** Datoteke su starije od odluke da zadana tema bude svijetla, a nijedna brana ih nije
  mogla vidjeti — **iz tri različita razloga**:
  ① `check:palette` prepoznaje fatalno **samo kad su boja i pozadina u ISTOM pravilu**. Tekst bez
  vlastite pozadine nasljeđuje plohu, pa ga klasifikator ne može upariti i svrsta ga u „stara =
  čitljivo". Slijepa točka mu je time **najčešći slučaj koji postoji: obojen tekst**.
  ② `check:contrast` mjeri **vrijednosti tokena**, ne njihovu upotrebu — pravila su čitala zakucani
  hex, pa je token bio posve nevažan.
  ③ `check:contrast:live` mjeri ekran, ali je obilazio **samo `te2`**, koji nema ni `exercises` ni
  `blind-map`; te dvije plohe nikad nisu bile izmjerene.
- **Rješenje.** 8 tinti autora postalo je tokeni `--color-ink-<ton>` u svih 5 blokova tema
  (vrijednosti **izračunate**: zadržan ton, pomaknuta svjetloća do ≥ 5.0:1, zasićenost ≤ 75 % na
  svijetlim temama). Tokeni su ušli u `AS_TEXT` (`check:contrast` **238 → 358** provjera),
  `check:contrast:live` je dobio dvije nove rute (**11 → 13**), a `learn-blocks.css` je dobio
  vlastiti test (`tests/learn-blocks-contrast.spec.js`) jer ga kataloška ruta ne iscrtava.
- **Lekcija.** **Brana koja mjeri DEFINICIJU ne dokazuje UPOTREBU, a brana koja mjeri ekran ne
  dokazuje ništa o ekranu koji ne posjeti.** Tri zelena gatea nisu tri potvrde nego tri različita
  načina da se ne gleda. Kad se pita „je li ovo pokriveno", pitanje nije *postoji li brana* nego
  *bi li pala da je tvrdnja lažna* — što se provjerava samo tako da se stara vrijednost vrati i
  vidi pada li (ovdje: **16 od 32** mjerenja).

### BUG-041 — `var()` s fallbackom izgledao je kao tematiziranost, a varijabla nije postojala

- Status: ✅ **riješen** za dvije od tri pojave (2026-08-31, C5b/0) · Težina: **srednji** ·
  Našao: `check:contrast:live` odmah po proširenju obilaska na `blind-map`
- **Opis.** `.map-diff-btn` je imao `background: var(--card-bg, #fff)`, a **`--card-bg` nije
  definiran nigdje u `css/`** → uvijek je pobjeđivao zakucani `#fff`. Tekst je pritom bio
  tematiziran, pa je u `chalk`/`mint` ispadala svijetla tinta na bijeloj plohi: **1.43**.
  Ista mehanika u `learn-blocks.css`: `background: var(--grad, linear-gradient(…))` s `color:#fff`
  — `--grad` također ne postoji, i to je bilo jedno od 11 fatalnih pravila palete.
- **Uzrok.** `var(--x, fallback)` **izgleda** kao da poštuje temu. Ako `--x` nikad nije definiran,
  to je zakucana vrijednost s ukrasom — i to takva koju pretraživanje po `#hex` teže nalazi jer je
  sakrivena iza imena varijable.
- **Rješenje.** `--card-bg` → `var(--color-surface-1)`; `--grad` → puna ispuna `--color-brand-500`
  uz `--color-on-brand` (ADR-032). **`--border-color` (11 upotreba) je tada ostavljen svjesno**, uz obrazloženje
  „fallback je poluproziran" — **koje je vrijedilo za 1 od 11**: deset ih je nosilo pun tamni
  `#334155` (izmjereno u MREŽI B1). **✅ Riješen 2026-08-31 (MREŽA B1):** svih 11 → postojeći
  `var(--border)`, a razred čuva nova brana `check:tokens` (u preflightu).
- **Lekcija.** **Prije nego `var()` shvatiš kao tematiziranost, provjeri da varijabla postoji.**
  Prebrojano u ovom projektu: tri se koriste a nijedna nije definirana. Brzina provjere:
  usporedi broj definicija i broj upotreba po imenu.

> **⬇️ BUG-001 … BUG-038 (riješeni do 2026-08-30) su u [BUGS_ARCHIVE.md](./BUGS_ARCHIVE.md)** — cijeli zapisi,
> s lekcijama. Ovdje ostaju aktivni bugovi i oni riješeni od 2026-08-31 (faza redizajna nadalje).
> Kad riješeni bug „ostari" (faza mu je zatvorena i arhivirana), seli se **cijeli**, ne skraćuje se.

### Predložak (kopiraj za novi bug)
```
### BUG-001 — <kratak naslov>
- Status: 🔴 otvoren
- Težina: srednji
- Datum: 2026-06-01
- Opis:
- Reprodukcija:
- Uzrok:
- Rješenje:
- Lekcija (kako spriječiti ubuduće):
```
