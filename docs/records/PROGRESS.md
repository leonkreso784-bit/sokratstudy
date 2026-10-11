# Progress Log

Dnevnik rada. Najnoviji unos na vrhu. Svaka sesija: što je napravljeno, što je
testirano, što slijedi.

---

## 2026-10-11 (OPUS, `sokratstudy.f6`) — cigla DOKUMENTACIJA ②: brana veličine (cigla DOKUMENTACIJA gotova)

- **Što:** `scripts/velicina-dokumenata.js`, zove ga `check:docs` (odjeljak 9 → preflight i CI). Pragovi iz tablice u unosu ①
  stoje u JEDNOJ tablici modula s datumom i razlogom: MEMORY.md 8 000 + redak ≤ 250 · `current-checkpoint` 5 000 · ostale
  memorije 6 000, imenovana iznimka `windows-git-bash-zamke` 9 000 · aktivni plan 12 000 (isti „aktivni" kao odjeljak 2) ·
  `docs/architecture/*` izmjereno + 10 % po datoteci (nova datoteka bez retka i redak bez datoteke = pad).
- **Memorija izvan repozitorija:** mapa se izvodi iz GLAVNOG stabla (`git worktree list --porcelain`, bez `GIT_*`), ne-alfanumerički
  znak → „-", traži se bez obzira na veličinu slova (git kaže `C:/`, mapa je `c--…`) · izričito `SOKRAT_MEMORIJA` (nepostojeći = pad) ·
  nema mape → „PRESKOČENO — memorija nije na ovom stroju: <put>" · bez gita i bez izričitog puta = pad.
- **Izmjereno danas (sve ispod):** MEMORY.md 6 985 (najdulji redak 234) · checkpoint 3 269 · najveća ostala 5 424 · iznimka 8 678 ·
  ZAVRSNICA 9 032 · arhitektura 6 032–37 219. `check:docs` dotiče 52 datoteke (44 memorije · 1 plan · 7 arhitekture).
- **Brana:** unit `velicina-dokumenata` 22/0 (lažno stablo i dom; svaki prag: točno prag prolazi, +1 pada; povezano stablo → memorija
  glavnog) · **obrnute 17/17** · **svaki prag jednom prekoračen na PRAVOJ datoteci** (+1 znak): 6/6 + redak 251 crveno s imenom
  datoteke, povrat bajt-identičan · dom bez memorije → PRESKOČENO, izlaz 0. `check-docs-gate` kopira i ovaj modul u lažno stablo.

## 2026-10-11 (OPUS, `sokratstudy.f6`) — cigla DOKUMENTACIJA ③: PROGRESS i CHANGELOG po mjesecima

- **Što (odluke iz ankete 11.10.):** `scripts/rotiraj-zapise.js` (`npm run docs:rotate`, `--check` u `check:docs` → preflight i CI).
  PROGRESS.md drži tekući mjesec · CHANGELOG.md zaglavlje, `[Unreleased]`, najnoviji 🚀 i sve novije (pravilo „zadnji 🚀 redak"
  ostaje istinito) · ostalo u `PROGRESS-/CHANGELOG-YYYY-MM.md` u istoj mapi · unos bez datuma (stari rep, `[2.0.0] baseline`)
  ide s mjesecom unosa iznad sebe · popis mjeseci u `docs/README.md` između oznaka. Prije upisa se uspoređuje **skup** unosa
  (po tekstu); razlika = ništa se ne piše.
- **Rotacija:** PROGRESS 407 unosa (glavna 407 → 17; 06: 102 · 07: 82 · 08: 84 · 09: 122) · CHANGELOG 138 (glavna 138 → 6;
  08: 35 · 09: 97) · prije == poslije · drugi prolaz 0 datoteka. PROGRESS.md 26 429 znakova, CHANGELOG.md 4 139.
- **Brana:** unit `rotiraj-zapise` 16/0 u lažnom stablu (16. = stablo bez `docs/records` daje problem, ne iznimku —
  `check-docs-gate` kopira `check-docs.js` u lažno stablo i prvi preflight je pao na `Cannot find module`; test sad kopira i
  `rotiraj-zapise.js`); **obrnute 13/13** (zatvoren mjesec ostaje · 🚀 odlazi · premješteno iza
  arhive · stara arhiva izgubljena · ograde · nasljeđivanje mjeseca · „—" u indeksu · `--check` slijep · čuvar „bez 🚀" ·
  krivi mjesec u arhivi · nedeterminističko zaglavlje · uvijek LF · upis uz problem). Čuvar skupa dokazan pokusom (mutacija gubi
  arhivu → „3 prije, 2 poslije", disk netaknut). `check:docs` prije rotacije **crven** s naredbom, poslije zelen.
- **`rad-xlsx.py`** čita i `PROGRESS-*.md`: izmjereno 157 isporuka prije i poslije; stari kod poslije rotacije vidi **15** (samo listopad).
  ⚠️ Usput nađeno, NIJE dirano: regex naslova preskače oblik `## 2026-10-10/11 …` — listopad ima 17 unosa, knjiga broji 15.

## 2026-10-11 (OPUS, `sokratstudy.f6`) — cigla DOKUMENTACIJA ⑤: pravilo testiranja

- **Što (Leon, anketa 11.10.; povod u unosu K/6):** po cigli lokalno `preflight` + **ciljani** Playwright · puni skup =
  **CI na push grane**, cigla nije gotova dok ishod CI-ja nije pročitan · puni lokalni `test:responsive` samo prije `main`-a.
- **Gdje:** CLAUDE.md pravilo #4 (tekst zamijenjen, ne dopisan: 32 243 → 32 401 ≤ 32 550) · `TESTING.md` nov odjeljak
  „Koji testovi kada" (tablica + zašto) i dva pokazivača (sporije brane, „lokalno prije pusha" koji je tražio puni `npx playwright test`) ·
  memorija `preflight-before-every-push` + njezin redak u MEMORY.md. ⚠️ Memorija puni `test:responsive` zapravo nije spominjala —
  pravilo #4 jest, a ono pokazuje na nju; dopunjena je da nosi novo pravilo.

## 2026-10-11 (OPUS, `sokratstudy.f6`) — cigla DOKUMENTACIJA ④: ADR blok u CLAUDE.md = jedan redak po ADR-u

- **Inventar prije i poslije** (skripta u scratchpadu, 58 odredbi starog bloka, svaka s regexom): odredba mora biti u
  **starom** bloku (dokaz da regex mjeri pravu stvar) i u **odjeljku svog ADR-a** u DECISIONS.md ili u novom retku.
  Prva verzija tražila je po cijelom DECISIONS.md i nalazila „pokriveno" u tuđim ADR-ovima → pooštreno na odjeljak.
  Ishod: **58/58**. Jedna odredba („MCP je proizvod, ne spike", 030) **nije bila u DECISIONS.md** → ostala je u retku.
  Svjesno samo u DECISIONS.md: „AI prepozna lekcije i napiše skriptu" (031) i „paleta 8 boja na CSS varijablama" (028).
- **Dodani živi ADR-ovi kojih u bloku nije bilo:** 038 i 039 (temelj MCP-a), 032, 033, 037; 035/036 kao zamrznuti.
- **Brojke:** blok 4 076 → 3 208 znakova (uz pet novih ADR-ova) · CLAUDE.md 33 111 → 32 243 · `CLAUDE_BUDGET` 33 150 → **32 550**.

## 2026-10-11 (OPUS, `sokratstudy.f6`) — cigla DOKUMENTACIJA ①: checkpoint na trenutno stanje, pokazivači

- **Zašto (izmjereno 10.10.):** svaku sesiju se auto-učitavaju CLAUDE.md (33 065 znakova) i MEMORY.md (11 191, bez
  brane); `current-checkpoint` je imao **98 777 znakova u 62 bloka**, od čega ~3 % trenutno stanje, uz pet različitih
  „SLJEDEĆA SESIJA" i stare HEAD-ove označene „NEpushano" — najveći rizik halucinacije.
- **Anketa (Leon 11.10.):** redoslijed ① → ④ ADR blok → ⑤ pravilo testiranja → ③ rotacija → ② brana (zadnja, da pragovi
  stanu na brojke POSLIJE rezanja) · pragovi kao u tablici dolje · rotacija u istu mapu (`PROGRESS-2026-09.md`, relativne
  poveznice ostaju žive), skripta generira indeks, **brana u preflightu** · required check `Gate`: Leon ne zna → BACKLOG „provjeriti".
- **Dokaz prije rezanja:** agent je svaki blok (redci 24–1132) razvrstao s `put:redak` dokazom: **A 37 blokova / ~67 k
  znakova pokriveno** u PROGRESS/CHANGELOG/arhivi · **C 14 / ~11 k zastarjelo** · **B 11 blokova s 13 nepokrivenih
  činjenica** → premještene: BACKLOG §„⏳ ČEKA LEONA" (Gate, suvišna tajna na PROD-u, trajna Vercel bypass-tajna, ispale
  stavke, mape za brisanje) · `subjects/README.md` (odluke 27.09., otvoreno HR) · CONTENT_INTAKE (Merlin, tri pouke) ·
  MCP_TESTING §1/§4 (živo stanje staging dashboarda, poslužitelj 5051 za konektor, zaštićeni preview, dvije pouke 03.10.) ·
  memorija (`.imena-zabrana.txt` u novom stablu; naredbe za PowerShell, SQL za SQL Editor). Hashovi commitova nisu u docs-u,
  ali su u `git log` (15 uzoraka razrješeno). Stara datoteka cijela: `Documents\sokratstudy.sesije\current-checkpoint-2026-10-11-pred-rezanje.md`.
- **Što:** checkpoint 98 777 → 3 232 znaka (stanje, sljedeće, što ne otvarati, radna stabla — sada 7, s `.hr1`) ·
  MEMORY.md 11 191 → 6 911 (kuke ≤ 250, grupirano; RASPORED → ZAVRSNICA i u `follow-recorded-plan`) · CLAUDE.md: naslov
  stanja bez datuma, prekriženo „ZNAK JE NEPROMJENJIV" maknuto (ADR-040 nosi odluku), ručni brojevi predmeta (red 8, 38,
  253) → pokazivač, zastarjelo „S4+S5 bez vlasnika" ispravljeno (izgrađeno 27.–29.09.), redak KARTICE parkirane (kao na `main`-u).
- **Pragovi brane veličine (② — upisuju se u `check-docs.js`, znakovi bez CR):**

  | datoteka | 10.10. | prag |
  |---|---|---|
  | MEMORY.md | 11 191 | 8 000 + svaki redak ≤ 250 |
  | current-checkpoint | 98 777 | 5 000 |
  | ostale memorije | najviše 5 238 | 6 000 po datoteci; imenovana iznimka `windows-git-bash-zamke` 9 000 |
  | aktivni plan | 9 032 | 12 000 |
  | `docs/architecture/*` | 6–37 k | izmjereno + 10 % po datoteci |
  | CLAUDE.md | 33 065 | `CLAUDE_BUDGET` → izmjereno + 300 poslije ④ |

## 2026-10-10/11 (OPUS, `sokratstudy.f6`) — ZAVRSNICA K/6: paginacija i kvota čvorova (kod ✅, STAGING ✅)

- **Anketa (Leon):** kvota živi u **okidaču na `nodes`** (ne u `create_node`: čvor rađa i `restore_node` — cijela mapa
  jednim UPDATE-om — predaja i budući D/3); broje se **samo živi** (smeće nema pražnjenje; rast obrisanog = N13/④/5);
  **2 000 + Moji materijali čitaju u rasponima** (izmjereno: `loadTree` je rezao na istih 1 000 kao alat → s kvotom 2 000
  korisnik bi 1 001. materijal stvorio i ne vidio). Najveći korisnik danas: prod 10 živih, staging 53.
- **Što:** `f6-nacrt.sql` § K/6 — `_cvor_kvota()` (brava po vlasniku, `count` živih, `>= 2000` → `node_kvota: najviše 2000 …`),
  okidači `nodes_kvota_upis` (BEFORE INSERT) i `nodes_kvota_vracanje` (BEFORE UPDATE OF deleted_at, owner_id), djelomični
  indeks. `alati.ts` `0.5.5`: čitanje u rasponima (`count=exact`, red `id`, kraj odlučuje count), ravan popis u redoslijedu
  stabla (`polica_id`, `put`), ≤ 500 stavki + `ukupno`/`skraceno`/`sljedeci_offset`/napomena, ulaz `offset`, upute;
  `node_kvota` → „korisnik" s brojem iz poruke. `js/my-materials.js` `loadTree` isto čita; `node_kvota` → `materials.errQuota`
  (HR/EN, `{n}` iz poruke baze). `mcp:brava` razvrstava `_cvor_kvota` kao okidač.
- **Brana:** unit `mcp-alati` 79/0 i `my-materials` 44/0 — **13 crvenih na starom kodu**; **obrnute unit 22/22**. Uživo
  `mcp:alati` blok ⑬ (+13, osnovica 88): na staroj bazi **12 od 13 crveno** (20 usporednih na 1 990 → svih 20 prošlo, alat
  vidio 1 000 od 2 011 bez znaka). **Obrnute SQL 4/4** (Leon lijepio): bez brave · `>` · broji i obrisane · bez okidača za
  vraćanje. ⚠️ **Prva obrnuta (bez brave) je PROŠLA** — jedan krug od 20 usporednih slučajno dao točno 10; sonda s istom
  mutacijom 12–14 u 5/5 krugova → brana pojačana na **3 kruga × 100**, svaki mora dati točno 10 (bez brave 12/15/12).
- **Test koji je lagao o poslužitelju:** `profile-shelf.authed` podmetao je odgovor bez `Content-Range` i bez
  `Access-Control-Expose-Headers` — novi `loadTree` ga s pravom odbija (bez broja ne zna je li pročitao sve). Podmetanje sad
  izgleda kao pravi Supabase (izmjereno na stagingu), kod nije popuštan.
- **Novo pravilo testiranja (Leon, anketa 11.10.):** puni `test:responsive` (~40 min) gušio je računalo (2 GB slobodnog RAM-a)
  i prekinut je na 453/954 (0 palo). Po cigli lokalno **ciljano** (10 datoteka za police, materijale, i18n, telefon:
  123 + ponovljeno 8 + 15 zeleno; `phone.spec` pad = preglednik bez memorije, ponovljen zelen), puni skup = **CI na push
  grane**. Upis u CLAUDE.md ide s ciglom dokumentacije.
- **✅ STAGING:** SQL (Leon, cijela `f6-nacrt.sql`; 20 tijela md5 == datoteka uz CRLF→LF) · `mcp` v19 `0.5.5` ·
  `check:functions` 6/6 · `mcp:alati` 89/0 · `mcp:brava` 58/0 · `mcp:nacrt` 56/0 · `mcp:prihvat` 35/0 · `mcp:predaja` 34/0 ·
  `mcp:izmjena` 42/0 · `mcp:probe` 9/0 · `preflight` zelen. Mutacije u `Documents\sokratstudy.f6-k6-mutacije\` (smije se obrisati).
- ⚠️ `execute_sql` s DDL-om na stagingu sigurnosni filtar odbija kao i `apply_migration` → dogovorena cigla `sql:staging`
  (skripta samo za staging, tvrdo odbija prod).

## 2026-10-10 (OPUS, `sokratstudy.f6`) — ZAVRSNICA K/5: učestalost upisa u bazi (kod ✅, STAGING ✅)

- **Anketa (Leon):** granica je **zbroj po korisniku** preko svih konektora (izmjereno: Claude za istog korisnika
  registrira nov `client_id` pri svakom spajanju, 16 na stagingu → granica po klijentu bila bi zaobilaziva), `client_id`
  u svakom retku; dnevna granica = vrsta `korisnik`.
- **Što:** `f6-nacrt.sql` § K/5 — tablica `mcp_upisi` (redak po upisu, nikome grantana) + `_nacrt_upis()`: brava po
  korisniku, klizni prozor 60 s / 24 h, sama briše retke starije od dana. Šest RPC-ova koji pišu zove nju umjesto
  `_nacrt_pozivatelj()`; tri koja čitaju ne. Prekoračenje = `PT429` (HTTP 429 i mimo poslužitelja) s „pokušaj za N s".
  Alat `0.5.4`: `nacrt_ucestalost_min` / ponovno („Wait N s"), `nacrt_ucestalost_dan` / korisnik (h/min, navište);
  upute: „ponovno" = pričekaj koliko poruka kaže. ⚠️ Broji se samo USPJEŠAN upis (odbijen poništi i svoj redak) —
  svjesna granica, upisana u SQL i MCP_SECURITY N11.
- **Brana:** unit `mcp-alati` 70/0 — 4 nova, **sva crvena na starom kodu**; podjela piše/čita izvodi se iz granta i
  tijela u SQL-u (6/3). **Obrnute unit 8/8.** Uživo `mcp:alati` blok ⑫ (+11, osnovica 75): na staroj bazi **9 od 11
  crveno** (61. upis HTTP 204); poslije 76/0. **Obrnute SQL 3/3** (Leon lijepio): bez brave → usporedno prošlo 61 ·
  `>` umjesto `>=` → 5 crvenih · brojanje po klijentu → 30 + 31 prošlo. Staging vraćen, tijela 7 funkcija md5 == datoteka.
- **Granica oborila vlastitu branu:** `mcp:predaja` ③ (4 × 8 usporednih predaja) prešao je 60/min na istom korisniku →
  krugovi dobili vlastitog korisnika (bez iznimke za testove). Rezerva `mcp:alati` A: najgušćih 60 s = 27.
  `mcp:brava` +1 (`_nacrt_upis` zabranjen tokenu, 403; osnovica 57). `preflight` zelen · `test:responsive` 822/0 (132 preskočeno).
- **✅ STAGING:** SQL (Leon, cijela `f6-nacrt.sql`) · `mcp` v18 `0.5.4` · `check:functions` 6/6 · `mcp:alati` 76/0 ·
  `mcp:brava` 58/0 · `mcp:nacrt` 56/0 · `mcp:prihvat` 35/0 · `mcp:predaja` 34/0 · `mcp:izmjena` 42/0 · `mcp:probe` 9/0.

## 2026-10-10 (OPUS, `sokratstudy.f6`) — ZAVRSNICA K/4: boja lekcije iz kurirane palete (kod ✅, STAGING ✅)

- **Što:** jedna shema boje (`BOJA_LEKCIJE`, `enum` = `KURIRANE_BOJE`) za `zapocni_nacrt`, `dodaj_lekciju` i `uredi_lekciju` —
  AI izbor vidi unaprijed, boja izvan palete = `alat_los_ulaz` s mjestom (`input.lessons[1].color`) i popisom palete. `maloBoje`
  (kroz `pripremi` iz K/2) svodi velika slova prije provjere. Upute (korak 1) nabrajaju paletu iz izvora. Studio i dalje bira
  slobodno (ADR-025): preimenovanje bez boje zatečenu boju ne dira. Poslužitelj `0.5.3`.
- **Brana:** `mcp-alati` 66/0 — 5 novih (4 crvena na starom kodu; peti je osigurač da paleta nije prazna); stari test bojio je
  lekciju s `#0EA5E9` (izvan palete) → `#06B6D4`. **Obrnute provjere 6/6** (bez `enum` · dio palete · `zapocni_nacrt` bez
  svođenja · lekcije bez svođenja · boja upisana i kad je nema · upute bez palete). `preflight` zelen · `test:responsive` 822/0 (132 preskočeno).
- **✅ STAGING (`mcp` `0.5.3`):** `mcp:alati` **65/0** uz blok ⑪ (+3: sva 3 oglašena polja boje = paleta · boja izvan palete
  odbijena · nijedan nacrt nije nastao); uživi scenarij ⑧ s `#0EA5E9` prebačen na paletu.

## 2026-10-10 (OPUS, `sokratstudy.f6`) — ZAVRSNICA K/3: svaka kartica daje bar jedno pitanje (kod ✅, STAGING ✅)

- **Što:** `predaj_nacrt` čita nacrt i odbija predaju (`alat_kartica_bez_pitanja`, vrsta `ispravi`) ako neka kartica nema ni
  kviz ni dopunu koja je imenuje u `card`; poruka nabraja `lesson_id/card_id "pitanje"` (do 20). **Izmjena (odluka u ciglu,
  razumna zadana):** sude se samo kartice kojih NIJE bilo u izvornom materijalu — korisnik u Studiju smije imati karticu
  bez pitanja, a AI-jeva izmjena zbog nje ne smije zapeti. Id-eve zatečenih kartica daje ista funkcija kao kopija
  (`dodijeliIdeve`, izvučena iz `zapocni_izmjenu`). Ponovljena predaja (nacrt više ne postoji) prolazi do baze → isti materijal.
  Upute AI-ju (korak 4) navode pravilo. Poslužitelj `0.5.2`.
- **Brana:** `mcp-alati` 61/0 — 3 nova testa, **sva crvena na starom kodu**; zajednički primjer dobio pitanje za drugu
  karticu (stari testovi su ga s pravom počeli odbijati). **Obrnute provjere 8/8** (bez brane · izmjena ne pamti zatečene ·
  dopuna se ne broji · čitanje guta svaku grešku · bez propuštanja predanog nacrta · izvor bez id-eva · poruka bez teksta ·
  upute bez pravila). `preflight` zelen · `test:responsive` 822/0 (132 preskočeno).
- **✅ STAGING (`mcp` `0.5.2`):** `mcp:alati` **62/0** uz blok ⑩ (+3: predaja s karticom bez pitanja odbijena · poruka
  imenuje baš nju, nacrt ostaje · s pitanjem prolazi). Prvi prolaz poslije deploya: **9 crvenih** u starim scenarijima
  (AI je dodavao kartice bez pitanja) = brana uživo radi; scenariji dobili pitanja. Zatečena kartica bez pitanja u
  materijalu iz Studija (⑧) predaju izmjene NE koči — izmjereno uživo.

## 2026-10-09 (OPUS, `sokratstudy.f6`) — ZAVRSNICA K/2: duljina kartice po mjeri preglednika (kod ✅, lokalno)

- **Što:** `dodaj_kartice` i `izmijeni_stavke` podrežu pitanje i odgovor kartice PRIJE provjere ulaza i takve ih spremaju
  (novi `pripremi` u `Alat`, zove ga `izvediAlat`) — mjera je `mjeriKarticu` iz `_shared/pravila.ts` = `SokratCardLimits.measure`.
  Iznad HARD: odbijanje s mjestom (`input.cards[i].answer`, kao i dosad); SOFT+1…HARD: upisano + `warnings` (mjesto,
  duljina, „skrati, detalj u explanation ili Learn"). Pitanje od samih razmaka sad je prazno i odbija se. Zatvara rub iz K/1
  (HARD + razmak padao je na sirovoj duljini i u bazi). Poslužitelj `0.5.1`.
- **Brana:** `mcp-alati` 58/0 (4 nova K/2 testa, rubovi iz `pravila.ts`, ne rukom); **3 od 4 crvena na starom kodu**
  (četvrti — 501 s mjestom — vrijedio je i prije, čuva da ne nestane); **obrnute provjere 8/8** (bez podrezivanja u svakom
  alatu · `izvediAlat` ignorira `pripremi` · upozorenje nikad / već na SOFT · alat ne vraća upozorenja · podrezuje samo pitanje) · `preflight` zelen · `test:responsive` 822/0 (132 preskočeno).
- **✅ STAGING (`mcp` `0.5.1`, s K/1):** `npm run deploy:function -- mcp --project staging` (paket nosi `_shared/pravila.ts`) ·
  `check:functions` 6/6 · `mcp:probe` 9/0 · `mcp:alati` **59/0** uz nov blok ⑨ (+5: oglašeni strop == HARD iz izvora · HARD uz
  razmake prolazi i u bazi stoji podrezano · upozorenja s mjestom · HARD+1 odbijen s mjestom, nacrt netaknut). ⑨ nije pokrenut
  protiv starog deploya — crveno na starom kodu dokazuje unit.

## 2026-10-09 (OPUS, `sokratstudy.f6`) — ZAVRSNICA K/1: pravila sadržaja imaju jedan izvor (kod ✅, lokalno)

- **Što:** MCP poslužitelj više ne nosi svoje brojke. `scripts/build-pravila.js` (kalup `build:ugc-sql`) iz preglednikovih
  izvora generira `supabase/functions/_shared/pravila.ts`: SOFT/HARD i mjera kartice iz `js/card-limits.js`, `KURIRANE_BOJE`
  iz `js/utils.js`, `normFill` iz `js/fill-blanks.js`. Oblik u izvoru se traži točno jednom, inače generator pada zatvoreno.
  `alati.ts` uvozi `KARTICA_HARD`/`KARTICA_SOFT` (ulaz `dodaj_kartice` i `izmijeni_stavke`, upute AI-ju); `build:pravila -- --check`
  ušao u preflight. Preglednik nije diran → bez bumpa.
- **Brana:** `tests/unit/pravila-izvor.test.js` 7/0 — generirano == izvori · MCP se PONAŠA kao preglednik (rubovi 200/201/500/501,
  paleta, normFill) · svaka kartica u ulazima alata (prebrojano: 2) ima strop == HARD · nema gole brojke u `alati.ts` ·
  treća kopija, shema u bazi (`ugc-content.schema.json`), ima isti strop. `preflight` zelen; `test:responsive` 822/0 (132 preskočeno). **Crveno na starom kodu** (nema `pravila.ts`);
  **obrnute provjere 7/7** (HARD, SOFT, normFill, boja, ručna izmjena generiranog, gola brojka u `alati.ts`, shema 600).
- ⚠️ **Ostaje:** ulaz alata i shema u bazi mjere SIROVU duljinu, preglednik podrezanu (editor sprema `trim()`) — AI-jevih
  500 znakova + razmak se odbija iako bi ih ekran pustio. Rub, ne razilaženje stropa; rješava K/2 (mjera kroz `mjeriKarticu`).
- **Staging:** `mcp` funkcija nije redeployana (ponašanje isto, 500/200); ide uz K/2.
- **Sljedeće:** K/2 duljina (501 odbija s mjestom, 201–500 upozorenje AI-ju).

## 2026-10-09 (OPUS, `sokratstudy.f6`) — ZAVRSNICA K/0: animirani tutorial ②/5.2 izbačen (kod ✅, lokalno)

- **Što:** revert commita `5b3f4c3` (Leon 03.10.: *izbaciti*); prozor „Spoji svoj AI" iz 5.1 ostaje. `css/connect-ai.css`,
  `js/connect-ai.js`, ključevi `connectAi.anim*` u `i18n.js` i 5 testova tutoriala vraćeni na stanje 5.1; `styles.bundle.css`
  nakon `build:css` jednak onom iz 5.1. Povijest ostaje: unos 5.2 niže u ovom dnevniku i red ②/5 u `archive/MCP.md`
  (dobio oznaku „izbačena").
- **Brane:** unit `connect-ai` 9/0 (kao na 5.1) · nula ostataka (`cai-anim`, `connectAi.anim`) u `js/`, `css/`, `tests/`,
  `*.html`, bundleu · `preflight` zelen · `test:responsive` 822 prošlo / 0 palo / 132 preskočeno (44 min, uklj.
  prijavljeni projekt).
- **Sljedeće:** K/1 jedan izvor (`card-limits.js`, paleta i `normFill` u Deno-u, drift-brana).

## 2026-10-03 (OPUS, `sokratstudy.f6`) — SESIJA PLANIRANJA: novi smjer (ADR-040), plan ZAVRSNICA, HotelixSim kao zaseban projekt

- **Bez koda.** Leon opisao novi smjer, presuđeno kroz šest anketa: glavni projekt je **HotelixSim** (zaseban repo
  `Documents\hotelixsim`, više Leonova vremena); Sokrat se **dovršava usporedo** pa ide u **održavanje**.
- **Sokrat:** jedini aktivni plan je `docs/plan/ZAVRSNICA.md` — KONEKTOR (uži MCP → produkcija; ②/5.2 tutorial se vraća) ·
  DIJELJENJE (link s tajnim tokenom + mali prolaz izgleda) · BEZ MREŽE · ZNAK (novi logo, ime ostaje) · DVOJEZIČNOST ·
  ČIŠĆENJE · RECEPTI · POVIJEST. `RASPORED.md` i `MCP.md` → `docs/archive/` s pečatom „zamijenjen". ADR-035/036 zamrznuti.
- **ADR-040** upisan; oznake na ADR-025/029/031/035/036; CLAUDE.md, PRD, ROADMAP, README i poveznice usklađeni;
  `ideas/HOTEL_SIM.md` postao pokazivač.
- **HotelixSim:** folder s gitom, `docs/VIZIJA.md` (dobiveni hotel, fer start, pet osi situacija, BitLife sloboda, AI u
  četiri uloge, relativna ocjena), `docs/PLAN.md` (PROTOTIP do ~10.10. s jednim pravim AI trenutkom · PREZENTACIJA za
  ~mjesec · PILOT · VIZIJA), `CLAUDE.md`. GitHub repo još nije napravljen (nema `gh`, GitHub MCP pada).
- **Otvoreno:** redoslijed faza 2–8 ZAVRSNICE · prijava za dijeljeni link · tko dizajnira znak i ostaje li indigo ·
  F2/4 mail-obavijesti · inkubator/dekan (koji projekt) · vrijeme „1–7 dana" u simulaciji · backend simulacije.

## 2026-10-03 (OPUS, `sokratstudy.f6`) — F6 ②/5.2 animirani tutorial za Claude (kod ✅, lokalno; čeka Leonov OK)

- **Što:** na vrhu prozora (samo kartica Claude) shema Claudeova ekrana bez njihovog znaka, četiri scene po 4 s u petlji
  od 16 s: Customize → Add custom connector → zalijepljena adresa + Add → NAŠA stranica za odobrenje (iste riječi kao
  `odobrenje.html`) + „Povezano"; korak koji se pokazuje svijetli u popisu ispod. Samo CSS (`opacity`/`transform`/boja),
  kursor stoji unutar mete (pogađa na svakoj širini). Uz `prefers-reduced-motion` animacije nema, koraci ostaju.
- **Kadrovi** (sve animacije na isto vrijeme, 320 i 393 px, tamna i svijetla tema) našli grešku: koraci 2–4 svijetlili
  su UNAPRIJED (0 % ključnog kadra + `both`) → popravljeno, i dobilo test.
- **Brane:** unit `connect-ai` 14/0 (5 novih, **sva crvena na kodu iz 5.1**); `preflight` zelen; prijavljeni Playwright
  154/154.

## 2026-10-03 (OPUS, `sokratstudy.f6`) — F6 ②/5.1 „Spoji svoj AI": prozor i dva ulaza (kod ✅, lokalno)

- **Istraženo:** Claude (sve razine, besplatni = 1 konektor; nema poveznice koja upisuje adresu) · ChatGPT (Plus+,
  Developer mode, `/mcp` + OAuth/DCR) · Gemini samo SAD/18+/engleski → ne nudi se. **Anketa (Leon):** Claude + ChatGPT ·
  prvi put upute pa prečac · Studio + Moji materijali · animirani tutorial na vrhu prozora (5.2) · do ⑥ samo uz staging.
- **Kod:** `js/connect-ai.js` (`SokratConnectAi.ugradi` = jedna radnja za oba ulaza; prozor `<sokrat-modal>` s
  koracima, „Kopiraj adresu", „Otvori Claude/ChatGPT"; prečac iz `listGrants`, ime iz DCR-a samo za prepoznavanje) ·
  `css/connect-ai.css` · Studio: onemogućeni gumb → `ugradi` (na produkciji i dalje onemogućen uz „Uskoro") · Moji
  materijali: gumb u traci (na produkciji ga nema) · `editor.html` + paketi `materials`/`profile` · 19 i18n ključeva.
- **`docs/product/MCP.md` usklađen s ADR-039/②/4b** (bio je zastario: „sve ide u nacrt", „korisnik prihvaća").
- **Brane:** nov unit `connect-ai` 9/0 (**9/9 crveno na starom kodu**); `preflight` zelen (62/62 unit); `phone.authed`
  13/13 uz staging; slike 393 px i 1280 px pregledane (poveznice su prvo izgledale kao tekst — dodana `primary`;
  gumb poravnat s „+ Novo"). Puni `test:responsive`: 820 prošlo, **2 pala, oba zbog ove cigle** → popravljeno:
  `radionica` ⑥ (traka smije nositi samo „+ Novo", F2/5b-3) → AI gumb preseljen ISPOD trake; `cascade` (uzorak
  onemogućenog `.st-btn` bio je stari AI gumb) → test sam postavi uzorak na isto mjesto. Poslije: prijavljeni dio
  154/154, `preflight` zelen.
- **Usput:** Leonov konektor se nije spajao jer lokalni poslužitelj na 5051 nije radio (Site URL staginga) — pokrenut.

## 2026-10-03 (OPUS, `sokratstudy.f6`) — F6 ②/4b.2 izmjena postojećeg materijala: ALATI (✅ STAGING, `mcp` v14)

- **Uživo nakon Leonova deploya (v13 → v14, `0.5.0`):** `mcp:alati` 53/0 (⑧: kopija → izmjene u nacrtu, živo netaknuto
  → predaja verzija 2→3 + jedan redak `mcp_izmjena` s `client_id` → vrati 4, ponovljeno 4 → sukob, korisnikov rad
  bajt-isti), `mcp:probe` 9/0.

- **Devet alata, `0.5.0`:** `procitaj_materijal` · `zapocni_izmjenu` · `izmijeni_stavke` (id + samo promijenjena polja;
  ostala ostaju, i slika/boja iz Studija) · `obrisi_stavke` · `dodaj_lekciju` · `uredi_lekciju` · `obrisi_lekciju` ·
  `preimenuj_materijal` · `vrati_izmjenu` (jedini oglašen kao razoran). Upute: izmjena samo na korisnikovu riječ, redom
  čitaj → kopiraj → mijenjaj → predaj; sukob i povijest objašnjeni. Stavka bez id-a pri kopiji dobije stalan id.
- **Ime ≤120 (Leon, anketa danas: „alat na 120 sad"):** `zapocni_nacrt` (ime i nova polica), `predaj_nacrt` (nova
  polica), `preimenuj_materijal` odbijaju duže prije poziva baze. Provjera u `mcp_zapocni_nacrt` = sljedeći SQL krug.
- **Brane:** unit `mcp-alati` 54/0 (**12 crveno na starom `alati.ts`**); N9 dinamički zatvoren (9/9 RPC-ova, 82 poziva,
  20 u grani ponovnog pokušaja); `test:unit` 61/61. `mcp:alati` dobio blok ⑧ (osnovica 42 → 53) — vrti se tek nakon
  deploya.
- **✅ Leon dao OK za kraj cigle (03.10.) — ②/4b zatvoren.** Otvoreno: Learn-prvo u nacrtu izmjene (Leonova odluka) · provjera imena ≤120 u bazi (sljedeći SQL krug).

## 2026-10-02/03 (OPUS, `sokratstudy.f6`) — F6 ②/4b.1 izmjena postojećeg materijala: BAZA (ADR-039 t.2, ✅ STAGING)

- **Anketa (Leon, 02.10., sve četiri preporuke):** kopija u nacrt izmjene s polaznom verzijom → jedan upis · doseg
  sadržaj + lekcije + ime (ne premještanje) · AI alat „vrati verziju" · `client_id` u povijesti. **Nalaz:** povijest
  verzija nije imala ni ekran ni vraćanje — ADR-039 „izmjena je povratna" bilo je neispunjeno (vraćanje sad kroz AI,
  gumb u aplikaciji = kasnija cigla).
- **SQL** (`f6-nacrt.sql`, § „②/4b"): `mcp_procitaj_materijal` · `mcp_zapocni_izmjenu` · `mcp_preimenuj_nacrt` ·
  `mcp_vrati_izmjenu` (samo `mcp_klijent`) + `_materijal_moj` · `_bez_visecih_kartica` · `_izmjena_u_materijal`;
  `mcp_predaj_nacrt` grana za nacrt izmjene (`izmjena_sukob` ako se verzija promijenila); okidač povijesti bilježi
  `client_id`, `verzija`, `op` (`mcp_izmjena`/`mcp_vrati`). Primijenio Leon (SQL Editor), provjereno u bazi.
- **Brane:** nova `mcp:izmjena` 41/0 (**30 crveno na starom kodu**); `mcp:brava` 56/0 (+3 pomoćnika), `mcp:nacrt`
  55/0, `mcp:prihvat` 34/0, `mcp:predaja` 33/0. Brana je prvi put pala na sebi (void RPC = HTTP 204), ispravljeno.
- **Mutacije 4/4 crveno** (Leon lijepio): M1 bez provjere verzije (AI prepisao korisnikov rad, 5 → 6) · M2 bez vlasnika
  (stranac pročitao i kopirao tuđi materijal) · M3 povijest bez traga AI-ja (② i vraćanje `izmjena_nema`) · M4 bez
  provjere brisanja (upis u obrisan materijal). Vraćeno cijelim `f6-nacrt.sql`, `prosrc` bez `MUTACIJA`, sve brane zelene.
- **`test:unit`: 1 očekivano crveno** (N9 dinamički — 4 nova RPC-a još bez alata) → zatvara ②/4b.2.
- **Nalaz, nedirnut:** `mcp_zapocni_nacrt` prima ime do 200 znakova, materijal do 120 → predaja s dužim imenom = „kvar".
- **Sljedeće:** ②/4b.2 alati (+ unit, `mcp:alati`; deploy = Leon). Otvoreno: Leonov test s Claudeom (Kemija, Biologija).

## 2026-10-01 (OPUS, `sokratstudy.f6`) — F6 ②/4.3′ predaja = materijal na polici (ADR-039, ✅ STAGING)

- **Anketa (Leon):** ponovljena predaja vraća ISTI materijal (bilješka nacrt → materijal, 7 dana) · nacrt bez police
  ili s obrisanom policom → AI pita korisnika i preda s `shelf_id`/`new_shelf` · stari predani nacrti (Kemija,
  Biologija) idu na policu tako da ih Leon preda kroz Claudea.
- **SQL** (`f6-nacrt.sql`, `f6-prihvat.sql`): `_nacrt_u_materijal` = jedno mjesto prijelaza nacrt → materijal, dva
  pozivatelja. Primijenio Leon (SQL Editor) — moj `apply_migration` na staging dvaput `declined`.
- **Alat `0.4.0`:** `review_url` → `#/subject/node%3A<id>/content`; upute: materijal na polici, cijel, privatan.
- **Brane:** nova `mcp:predaja` 33/0 (26 crveno na starom); unit 45/0 (6 crveno na starom `alati.ts`); `mcp:nacrt`
  55/0 i `mcp:prihvat` 34/0 (stari „predan" nacrt sad glumi service ključ); `mcp:brava` 53/0 (uhvatila neimenovan
  `_nacrt_u_materijal`); uživo na v13: `mcp:alati` 42/0, `mcp:probe` 9/0.
- **Mutacije 02.10.: 4/4 crveno** (Leon lijepio u SQL Editor — `apply_migration` na staging `declined` i uz allow-pravilo i
  restart = klasifikator): M1 bez brave · M2 bez bilješke · M3 bilješka bez vlasnika (stranac dobio id) · M4 polica bez
  vlasnika (`node_denied`; druga ograda u `create_node` ipak ništa nije stvorila). Vraćeno, provjereno u `prosrc`, 33/0.
- **Otvoreno:** Leonov test s Claudeom (Kemija, Biologija).

## 2026-10-01 (OPUS, `sokratstudy.f6`) — F6 ②/4.2 UŽIVO na stagingu + BUG-053 (napredak puca na v2 dokumentu)

- **②/4.2 uživo:** Leon deployao `mcp` **v12** (prvi pokušaj nije sletio: gore je bila v11 = `0.2.0` od 30.09.
  17:47; `mcp:alati` je to uhvatio na UPUTAMA). Na v12 (`0.3.0`): `mcp:alati` **43/0**, `mcp:probe` **9/0**.
- **BUG-053 (Sentry `JAVASCRIPT-4`):** `progress.js` čitao `Object.keys(nav.data)` → `(2).quiz.length` na materijalu
  iz AI nacrta (staging `c627b8a7…`). Popravak na ulazu: `getStudyData()` je jedini put u `nav.data`. Sentry dobiva
  `environment` (okidač je bio localhost, a pisalo je „production"). Unit 61/61 · preflight 0 · Playwright
  (monitoring · smoke · app-state · escaping · quiz-reset, port 5051) 42/0.
- **Sljedeće:** Leon testira s pravim Claudeom (polica · opseg · link) → ②/4.3 ekran uz OK.
