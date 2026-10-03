# MCP — sigurnost: prijetnje, invarijante, nalazi, uvjeti puštanja

> **Cilj:** korisnikov AI stvara i uređuje **isključivo njegove nacrte**; **korisnik** pregledava i objavljuje.
> Kako je sustav građen: [MCP.md](./MCP.md) · redoslijed popravaka: [plan/ZAVRSNICA.md](../plan/ZAVRSNICA.md) faza KONEKTOR (povijest: [archive/MCP.md](../archive/MCP.md)) ·
> kako se mjeri: [workflow/MCP_TESTING.md](../workflow/MCP_TESTING.md).
>
> **Pravilo ovog dokumenta:** nalaz je ono što je **izmjereno ili pročitano u kodu s retkom**. Pretpostavka
> ostaje u §5 dok se ne izmjeri. Upute modelu nikad nisu sigurnosna granica — granica je ono što provodi
> baza, poslužitelj ili preglednik neovisno o ponašanju modela.

## 1 · Granice povjerenja

| sloj | vjerujemo mu? | zašto |
|---|---|---|
| model (Claude / ChatGPT) | **ne** | čita korisnikov materijal, a materijal može nositi upute (prompt injection) |
| broker koji drži token | djelomično | token je pun korisnički JWT + `client_id`; tko ga drži, dolazi i mimo naših alata |
| MCP poslužitelj (naša Edge Function) | da, ali nije jedina linija | RPC-ovi su dohvatljivi i izravno kroz PostgREST s istim tokenom |
| baza (GRANT · RLS · RPC) | **da — ovdje je granica** | provodi se neovisno o tome tko zove |
| korisnikov preglednik | granica za prikaz | sadržaj koji je napisao AI ondje se izvršava s **punom** sesijom korisnika |

## 2 · Od koga se branimo

- **P1 · zlonamjeran izvor** — PDF ili tekst s uputama koje model posluša.
- **P2 · drugi korisnik** — pogađa tuđe id-eve ili pokušava čitati tuđe.
- **P3 · lažna aplikacija** — DCR je otvoren, ime klijenta je tuđi tekst.
- **P4 · onaj tko drži token** — broker, curenje, zadržan token nakon prekida veze.
- **P5 · sadržaj nacrta u pregledniku** — ono što AI napiše korisnik gleda u pregledu i poslije učenja.
- **P6 · preopterećenje** — automatizirani upisi, ponavljanja, rast povijesti.

## 3 · Invarijante

| # | tvrdnja | tko je provodi | dokaz / stanje |
|---|---|---|---|
| I1 | AI piše **samo u vlastiti nacrt**, nikad u živo gradivo | baza: GRANT samo za `mcp_*` + vlasnik iz tokena | ✅ `mcp:nacrt` 34/0, `mcp:brava` 46/0, mutacije 4/4 |
| I2 | AI ne čita tuđe gradivo ni javni katalog | baza: GRANT + RLS | ✅ `mcp:brava` (iscrpna REST-proba svake tablice izvan popisa) |
| I3 | AI-tokenom nema nepovratne radnje (brisanje računa, mail, lozinka, e-mail) | `_shared/token-guard.ts` · postavke Auth API-ja | ✅ `mcp:brava`; metapodaci korisnika imenovano otvoreni |
| I4 | objava = **samo obična sesija**, poslije pregleda | baza: Prihvati nije dan `mcp_klijent` | ⏳ plan ②/4 |
| I5 | sadržaj koji napiše AI **ne izvršava kod** u pregledniku, ni kad sanitizator nije učitan | renderer + CSP | ✅ STAGING/grana 30.09. — N1, N2 zatvoreni (②/0c–e: unit + preglednik-pokusi s kontrolom); ⚠️ N17 |
| I6 | pravila sadržaja provodi **baza** na svakom putu upisa, ne samo poslužitelj | validator u bazi | ✅ STAGING 30.09. — nacrt i `publish_node` (`ugc:sadrzaj` 813/0); Prihvati dolazi u ②/4 |
| I7 | ponovljen zahtjev ne duplicira; paralelna izmjena se ne prepisuje | ključ ponavljanja · polazna verzija | 🟡 nacrt ✅ STAGING 30.09. (N7, N8; usporednost i 409 dokazani mutacijom) · Prihvati uz paralelnu izmjenu materijala = ②/4, otvoreno |
| I8 | opoziv veze zaustavlja AI | Auth (`revokeGrant`) | ⚠️ izmjereno S-B: obnova odbijena odmah (400), a postojeća propusnica **i dalje piše u nacrt** (200) do isteka, najviše 3600 s — korisniku rečeno; trenutni opoziv = odluka |
| I9 | administratorov konektor nema ni jedno pravo više od običnog | hook: svaki token s `client_id` = `mcp_klijent`, neovisno o ulozi korisnika | ✅ izmjereno S-B (11 tvrdnji, s kontrolom) |
| I10 | tok prijave: PKCE obavezan, redirect točan, kod jednokratan i vezan na klijent, potpis tokena provjeren | Supabase Auth + PostgREST | ✅ izmjereno S-B (9 tvrdnji) |
| I11 | brisanje računa briše **sve** korisnikovo: gradivo, verzije, nacrte, OAuth veze, sesije, slike — i nikad ne ostavi poluobrisan račun | kaskade FK-ova + `delete-account` | ✅ N10 zatvoren (H1: `on delete set null` na PROD-u + T5 s objavom, 22/22); brisanje izmjereno čisto (S-C) |
| I12 | jedan korisnik ili konektor ne može potrošiti bazu, funkciju ni tuđe vrijeme | granice u bazi (učestalost, veličina, broj) | ❌ izmjereno S-C — N11, N12, N13 → plan ④ |
| I13 | ono što AI ne vidi (odgovor skraćen) AI **zna** da ne vidi | alat vraća oznaku skraćenosti | ❌ **N12** |

## 4 · Nalazi

Oznake: **potvrđeno** = izmjereno ili pročitano s retkom · **dokazano izvršavanje** = pokus u pravom pregledniku
s kontrolom · prioritet je za **puštanje korisnicima**, ne za današnji staging.

### N2 · sirovi HTML kad DOMPurify nije učitan — ✅ ZATVOREN na grani 30.09. (②/0a, ②/0d, ②/0e)

- **Zatvoreno trostruko:** baza ne prima `legacy-html`/`learn.content` u osobni sadržaj · bez DOMPurifyja HTML ide kao
  tekst (i u `learn.js`), DOMPurify s naše domene · `script-src` dopušta samo točne CDN datoteke. Brane:
  `tests/sanitizator-pad.spec.js`, `tests/csp-cdn.spec.js`, `escaping.spec` (fallback), `check:csp` — sve s kontrolom
  i crvenim na starom kodu. Ostatak: N17.

- **Gdje:** `js/blocks-renderer.js` `renderLegacyHtml` (redci 226–229) vraća HTML netaknut ako `window.DOMPurify`
  ne postoji; DOMPurify se u `js/loader.js` (redak 70) učitava kao **neobavezan** s cdnjs-a. Isto u krajnjem
  fallbacku `js/learn.js` (redak 57, `learn.content`).
- **Dokazano izvršavanje (lokalni pokus, Chromium + WebKit, s kontrolom):** sirovi HTML s `<iframe srcdoc>` učita
  skriptu s domene koju `script-src` dopušta i **pročita sesiju roditeljske stranice uz produkcijski CSP**. CSP ne
  pomaže jer dopušta **cijele** hostove `cdn.jsdelivr.net` i `cdnjs.cloudflare.com`, a jsdelivr poslužuje bilo koju
  javnu datoteku s GitHuba. CDN je u pokusu glumljen lokalnim poslužiteljem; pravi CDN nije diran. `onerror` i
  inline skripte CSP blokira.
- **Uvjeti:** sadržaj nosi `legacy-html` ili `learn.content` (danas ga `publish_node` i nacrt primaju) **i**
  DOMPurify se nije učitao (pad CDN-a, blokada mreže, izvanmrežni rad).
- **Posljedica danas:** samo vlasnik vidi svoj materijal → napad na samog sebe. **S MCP-om:** P1 → AI → nacrt →
  pregled/Prihvati → korisnikov preglednik s punom sesijom (preuzimanje računa).
- **Popravak:** plan ②/0a (MCP profil bez `legacy-html`/`learn.content`) + ②/0d (bez sanitizatora = tekst) +
  ②/0e (uži `script-src`). **Test:** isti pokus kao regresijska brana, s kontrolom.

### N1 · `safeUrl` propušta kontrolne znakove — ✅ ZATVOREN na grani 30.09. (②/0c)

- `safeUrl` čita shemu iz niza bez C0/razmaka/DEL; isto koriste Studio-uređivač i slika kviza. Baza uz to odbija
  kontrolne i Unicode-razmake u poveznicama. Unit čita adrese iz istih primjera kao baza.

- **Gdje:** `js/blocks-renderer.js` `safeUrl` (redci 29–39): shema se traži regexom nad nizom koji još nosi
  kontrolne znakove, a preglednik ih pri parsiranju adrese izbacuje.
- **Potvrđeno:** 7 oblika prolazi i postaje `javascript:`/`data:` — TAB, LF, CR unutar sheme; `\x00`, `\x01`, `\x1f`
  na početku; TAB u `data:`. Obični `javascript:` je odbijen.
- **Izvršavanje NIJE dokazano:** renderer poveznice piše s `target="_blank"` — takva se ne izvrši **ni bez CSP-a**
  (oba preglednika). Poveznica u istom prozoru bez CSP-a se izvrši, s produkcijskim CSP-om ne.
- **Popravak:** plan ②/0c. **Test:** unit sa svih 7 oblika + kontrola da `https:` prolazi.

### N3 · `style`, `class` i vanjske slike — ✅ za osobni sadržaj ZATVOREN na STAGINGU 30.09. (②/0a)

- Profil ne prima `legacy-html` ni slike osim `node-img:<uid>/<čvor>/<datoteka>`. Katalog (naš sadržaj) i dalje nosi
  `legacy-html` sa `style` kroz DOMPurify — izvan dosega MCP-a.

- Uz učitan DOMPurify `legacy-html` zadržava `style` i `class` (`DOMPURIFY_CFG`, redci 92–98) → sloj preko ekrana,
  lažni gumb, poveznica van (izvodljivo, **nije mjereno**). `img-src https:` dopušta bilo koju vanjsku sliku → otkriva
  IP i trenutak čitanja trećoj strani.
- **Popravak:** MCP profil bez `legacy-html` i bez vanjskih slika (samo vlastiti upload) — plan ②/0a.

### N4 · `publish_node` provjerava samo oblik — ✅ ZATVOREN na STAGINGU 30.09. (②/0b)

- `publish_node` (`f6-sadrzaj.sql`): 1 MB (`publish_prevelik`) + isti validator. Prije: 158 zlonamjernih objava i 5 MB
  prolazilo. **PROD (čitano 30.09.):** 3/4 materijala prolaze profil; četvrti (administratorov testni) pada samo na
  kartici od 1 819 znakova — prije ⑥ ga treba skratiti ili prihvatiti da se ne da ponovno objaviti.

- **Gdje:** `supabase/f1-nodes.sql` redci 340–346: payload mora biti ne-prazan objekt objekata. Nema granice
  veličine, tipova blokova, duljina, broja stavki ni shema adresa; svaka objava sprema i punu kopiju u
  `node_content_versions` (rast povijesti → S-C).
- `schema/subject-content.schema.json` postoji (zabranjuje nepoznata polja, provjerava boje), ali se vrti **samo u
  CI-ju nad datotekama kataloga** i dopušta `legacy-html`. `js/card-limits.js` postoji samo u pregledniku.
- **S-B:** stvarna definicija na stagingu (`pg_get_functiondef`) je **istovjetna** datoteci; EXECUTE ima `authenticated`,
  **nema** `mcp_klijent` (AI-token admina → 403, izmjereno).
- **Popravak:** plan ②/0a–b. `pg_jsonschema` 0.3.3 je **dostupan** na stagingu (nije instaliran); produkcija nije
  provjeravana — provjerava se prije ②/0a.

### N5 · nacrt: pravila samo u poslužitelju — ✅ ZATVOREN na STAGINGU 30.09. (②/0a)

- `mcp_upisi_nacrt` zove `_provjeri_sadrzaj` (pg_jsonschema + dubina + jedinstveni id-evi). Prije: 34/35 zlonamjernih
  oblika primljeno. Primjeri su zajednički s unit-testom sheme i dijelom generirani iz nje (osnovica od 328 imena).

- `mcp_upisi_nacrt` (`supabase/f6-nacrt.sql` redci 157–162) provjerava samo objekt i 1 MB. Po ADR-038 brane kvalitete
  žive u poslužitelju, ali **isti token RPC zove i izravno** (P4) — tada brane ne vrijede. Vlasništvo i kvota i dalje drže.
- ADR-038 to već predviđa („ponavljaju se pri Prihvati"); nalaz je da **sigurnosna** pravila (zabrana HTML-a i
  opasnih adresa) moraju biti u bazi već pri upisu nacrta, jer korisnik nacrt **gleda** prije Prihvati.
- **Potvrđeno na stagingu (S-B), pravim AI-tokenom:** `mcp_upisi_nacrt` prima **svih 8** zlonamjernih oblika — `legacy-html`
  s `iframe srcdoc`, `learn.content` sa slojem preko ekrana, `java<TAB>script:` poveznicu, vanjsku sliku, nepoznat tip
  bloka i polje, karticu od 5 000 znakova, 6 000 kartica (~0,9 MB; upis 1,5 s) i gniježđenje dubine 3 000 (upis 2 s).
  Naziv nacrta s HTML-om sprema se doslovno (ispravno — escape je posao prikaza u ②/4, brana tamo).
- **Popravak:** plan ②/0a.

### N7 · usporedni upisi istog nacrta: tihi gubitak — ✅ ZATVOREN na STAGINGU 30.09. (②/1b, brana dopunjena istog dana)

- `mcp_upisi_nacrt(id, payload, verzija)`: promijenjen nacrt → `nacrt_sukob` (HTTP 409); isti upis ponovljen vraća
  postojeću verziju. ⚠️ **Pouka iz gradnje:** sukob sa SQLSTATE `40001` PostgREST ponavlja SAM, u krug — upis je
  visio do isteka klijenta (a `mcp_klijent` nema `statement_timeout`, N16). Kodovi odbijanja se ne biraju iz razreda
  `40xxx`; sukob je `PT409`.
- **Brana (`mcp:nacrt` ⑧):** 8 usporednih upisa s iste verzije → točno 1×200 i 7× `nacrt_sukob`, svaki **HTTP 409** i
  < 5 s. Mutacija „bez `for update`" u `_nacrt_moj` pala je **5/5** vrtnji (svaki put 2×200 = tihi gubitak natrag);
  mutacija „sukob kao `40001`" pala je s imenom (7 poziva prekinuto na 20 s = PostgREST-ova petlja). Obje vraćene.

- *Stanje PRIJE popravka (S-B, 29.09.):* `mcp_upisi_nacrt` zamjenjuje cijeli payload bez polazne verzije. **Izmjereno:** dva usporedna upisa istog
  nacrta → oba HTTP 200, preživio samo drugi; nijedna strana ne dozna da je prva izgubljena.
- **Uvjet:** AI (ili dva AI-ja istog korisnika, npr. Claude i ChatGPT) pišu isti nacrt usporedo, ili se ponovi upis iz
  starijeg stanja. **Posljedica:** gubitak dijela nacrta, ne tuđih podataka.
- **Popravak:** plan ②/1b — `mcp_upisi_nacrt` prima polaznu vremensku oznaku / verziju i odbija ako se promijenila.

### N8 · ponovljen početak stvara duplikat — ✅ ZATVOREN na STAGINGU 30.09. (②/1b)

- `mcp_zapocni_nacrt(name, kljuc)`: isti ključ vlasnika = isti nacrt (ne troši kvotu; istekao ne oživi; stranac s
  istim ključem dobiva svoj). Stari potpisi obrisani.

- **Izmjereno (S-B):** `mcp_zapocni_nacrt` dvaput s istim nazivom → dva nacrta (dva id-a). Ponovljena predaja je ispravno
  odbijena. Kvota ograničava štetu na 3 u izradi.
- **Popravak:** plan ②/1b — ključ ponavljanja (klijent ga šalje, baza ga pamti po vlasniku) na svakom pozivu koji stvara.

### N9 · odbijanja kvote i stanja dolaze kao HTTP 500 — ✅ ZATVOREN na STAGINGU (②/2, 30.09.: funkcija `mcp` v9, `mcp:alati` 31/0 uživo)

- `alati.ts` `prevediOdbijanje`: ime → vrsta (ispravi · ponovno · korisnik · stop · kvar) + poruka; unit izvodi popis
  imena iz SQL-a. HTTP broj ostaje 500 za kvotu (PostgREST), ali AI više ne sudi po broju.
- **②/2:** jedini `.rpc(` u alatima je u `pozovi()`, koji grešku baze predaje `prevediOdbijanje`; alat je vraća AI-ju
  kao rezultat s `isError` (HTTP 200), nikad sirovu poruku ni 500. Unit `mcp-alati` to tvrdi statički (svaki `.rpc(`
  u tijelu `pozovi`, nula = pad) i dinamički (svaki RPC svakog alata oboren iz baze → prevedeno; pokriveni RPC-ovi ==
  pet iz granta u `f6-nacrt.sql`). Uživo: `npm run mcp:alati` ⑤ (validator i predan nacrt stižu prevedeni).

- Kvota (`53400`) i „već predan" (`55000`) izlaze iz PostgREST-a kao **500**. Nije propust, ali AI ne može razlikovati
  „pokušaj kasnije" od kvara → plan ②/2: alat prevodi kod u jasnu poruku.

### N17 · `script-src` i dalje dopušta dva hosta: Google Tag Manager i Sentry — 🟡 NIZAK/SREDNJI (novo 30.09.)

- **Gdje:** `vercel.json` CSP; imenovani u `scripts/check-csp.js` (`OTVORENO`). Oba poslužuju sadržaj koji određuje bilo
  tko: `googletagmanager.com/gtag/js?id=<tuđi ID>` i `js-de.sentry-cdn.com/<tuđi ključ>.min.js`. Iz ubačenog `srcdoc`-a
  bi se tako učitao Googleov ili Sentryjev kôd s tuđom konfiguracijom. Proizvoljan JS **nije dokazan** (inline i eval
  CSP blokira), rizik je niži od golog jsdelivra — ali **nije izmjeren**.
- **Zašto nije suženo odmah:** nije izmjereno koje datoteke loaderi dalje vuku s istog hosta; putanja `/gtag/js` ne
  suzuje `?id=`. Suziti naslijepo = tiho ugasiti analitiku ili praćenje grešaka.
- **Popravak:** izmjeriti u pregledniku (s privolom) što se učita, pa suziti na točne putanje; ili nonce/hash. Uz to
  vrijedi da do CSP-a dolazi tek sadržaj koji je prošao bazu (N5) i renderer (N2).

### N6 · `mcp-admin` (lokalni pokus) — 🟢 NIZAK

- Izvan repozitorija (untracked u glavnom stablu), nije na grani F6, lokalni stdio, bez ključeva.
- **Potvrđeno pokusom na bezopasnim datotekama:** izlazak iz `data/json` preko `..` (vraća imena ključeva bilo kojeg
  JSON-a) · greška za ne-JSON datoteku otkriva prvih ~10 znakova · shema argumenata se ne provjerava · ulazni
  međuspremnik bez granice.
- Na javnom poslužitelju isti kod bio bi visok rizik; ovdje je napadač samo zaveden lokalni model.
- **Ništa se ne prenosi** (F6 poslužitelj koristi službeni SDK; admin doseg je protiv ADR-030/031). Odluka: obrisati ili
  arhivirati.

### Dionica C (limiti · backup · brisanje · logovi) — mjereno 29.09. na STAGINGU

Jednokratni korisnik, poslije obrisan i provjereno nula redaka u svim tablicama. Skripta: scratchpad `dionica-c.js`.

### N10 · brisanje računa puca za svakoga tko je objavio materijal — ✅ ZATVOREN 30.09. (H1, BUG-052)

- **Gdje:** `supabase/f1-nodes.sql` redak 157: `node_content_versions.edited_by references auth.users(id)` **bez**
  `on delete`. Okidač `snapshot_node_content` upisuje `edited_by = auth.uid()` pri svakoj objavi.
- **Izmjereno:** korisnik s objavljenim materijalom → `delete-account` vraća **409** `Database error deleting user`;
  log baze: `violates foreign key constraint "node_content_versions_edited_by_fkey"`. Slike su u tom trenutku **već
  obrisane** (`removedImages: 2`) → račun je **poluobrisan**: podaci, prijava i AI-token rade dalje, slike nema.
  Kontrola: kad se čvorovi uklone, isto brisanje prođe (200, korisnik 404) → FK je jedina prepreka.
- **Zašto ga brana nije uhvatila:** `delete-account-check` T5 stvara čvor, ali **nikad ne objavi**, pa `edited_by`
  nikad nije popunjen — prolazi na praznom slučaju.
- **Produkcija (pročitano 29.09., samo SELECT, uz Leonov OK):** isti FK bez `on delete`. Pogođen je **1 korisnik od 8 —
  administrator**, koji se ionako ne može sam obrisati. Nijedan obični korisnik još nije objavio materijal, pa nitko nije
  mogao ostati poluobrisan; u logovima (24 h) nema pokušaja. Kvar je **latentan**: prvi korisnik koji objavi pa obriše
  račun ga pogodi.
- **Popravak (Leon, anketa 29.09.: zasebno, odmah, izvan F6):** `on delete set null` (isti obrazac kao
  `content_versions.edited_by`) + T5 objavi materijal prije brisanja (danas crveno, poslije zeleno).

### N11 · nema granice učestalosti; DCR raste bez čišćenja — 🟠 SREDNJI

- **Izmjereno:** 60 uzastopnih upisa nacrta (p50 52 ms, ~16/s) · 60 **usporednih** (svih 60 × 200, p50 554 ms) ·
  30 usporednih MCP poziva s odgovorom od 267 KB (svih 30 × 200, p50 3,8 s). Nijedan 429 ni na jednom sloju.
- Svaki upis nacrta prepisuje **cijeli** payload (do 1 MB): 60 upisa u minuti = do 60 MB zapisa u minuti po korisniku.
- DCR je otvoren (tako i mora biti za Claude/ChatGPT) i klijenti se nikad ne brišu: **141** na stagingu, 6 od njih
  pravi „Claude", ostalo testovi. Ime klijenta je tuđi tekst (P3, već u §2).
- Jedan konektor se danas može ugasiti samo brisanjem OAuth klijenta u dashboardu (za **sve** korisnike) ili
  korisnikovim opozivom; postojeća propusnica i tada piše do 3600 s (I8).
- **Popravak:** plan ④/1 (granica u bazi, po korisniku i po klijentu) · ④/4 (popis blokiranih klijenata) · ④/5 čišćenje.

### N12 · alat tiho reže na 1 000 stavki; broj čvorova neograničen — 🟠 SREDNJI

- **Izmjereno:** 1 200 polica → PostgREST vraća **1 000** (`Content-Range 0-999/1200`, `db-max-rows`), a
  `procitaj_materijale` AI-ju kaže 1 000, **bez znaka** da postoji još. Odgovor 267 KB, 0,7 s.
- `create_node` nema kvotu; `test-admin` na stagingu ima 7 376 čvorova (46 živih).
- **Posljedica:** AI korisniku tvrdi da materijal ne postoji (upravo ono što `slozStablo` pokušava spriječiti za
  siročad) i pri ②/2 može stvoriti duplikat.
- **Popravak:** plan ④/2 — izričit raspon, najviše 500 stavki po odgovoru uz `skraceno: true`, kvota 2 000 čvorova.

### N13 · povijest raste bez granice; obrisano se nikad ne briše — 🟠 SREDNJI

- **Izmjereno:** objava od **5 MB prolazi** (200, 10,4 s) · pet objava po ~1 MB → pet trajnih kopija, ~1 MB svaka
  na disku (gradivo se slabo stišće) · verzija čuva **staro** stanje, pa `{}` + 5 × 1 MB = 4,9 MB za jedan materijal.
- „Obriši materijal" je meko brisanje (`deleted_at`); sadržaj i sve verzije ostaju dok se račun ne obriše.
  `test-admin`: 7 330 meko obrisanih čvorova, 2 729 verzija. Korisnik koji obriše materijal misli da ga više nema.
- **Popravak:** ②/0b (1 MB na objavi) · ④/5 `pg_cron`: trajno brisanje meko obrisanog nakon 30 dana. Zadržavanje
  verzija **ostaje bez roka** (Leon, anketa 29.09.: nije odabrano) — granica je veličina objave.

### N14 · backup ne pokriva osobno gradivo; nešifriran i bez roka — 🟠 SREDNJI

- **Gdje:** `scripts/backup-db.js` redak 37: `profiles`, `progress`, `content_versions`, `subject_content`.
  **Nema** `nodes`, `node_content`, `node_content_versions`, `profile_identity`, `node_drafts`, `mail_log`,
  `reserved_handles` — dakle ni jednog retka UGC-a, iako je UGC glavni proizvod (ADR-029).
- Ručno pokretanje, dvije snimke (zadnja 01.09.), gzip JSON **bez šifriranja** na Leonovom disku, **bez roka**:
  profili i napredak obrisanih korisnika ostaju u snimkama zauvijek.
- Storage (slike) ne pokriva **ni** Supabase backup (dokumentacija: backup baze ne sadrži objekte Storagea);
  Supabase Pro drži dnevne snimke baze 7 dana.
- **Popravak (Leon, anketa 29.09.):** dodati `nodes`, `node_content`, `node_content_versions`, `profile_identity`
  (nacrti NE — privremeni su) · šifrirati (AES-GCM, ključ u `.env`) · rok 8 tjedana — plan ④/6.

### N15 · nespremljene izmjene materijala ostaju u pregledniku nakon odjave — 🟡 NIZAK

- **Pročitano s retkom:** `js/draft-store.js` redak 25/51 sprema radnu verziju pod `sokrat-draft:<ključ>`
  (osobni materijal: `node:<uuid>`, `js/admin.js` redak 408). `signOut` (`js/auth.js` redak 923) ih ne briše, a
  zamjena korisnika (`js/cloud-sync.js` `preuzmiUredjaj`) briše samo ključeve napretka (`watchedKeys`), ne te.
  Brisanje računa ih briše (`purgeLocalAccountData`, dopušteni popis).
- **Posljedica:** na zajedničkom računalu sljedeća osoba ne vidi tuđi materijal u sučelju (RLS), ali ga može
  pročitati iz alata preglednika. Nije izmjereno u pregledniku.
- **Ostalo lokalno drži:** polica za izvanmrežni rad sprema samo javni katalog · SW ne dira Supabase ni tuđe domene ·
  potpisi slika su samo u memoriji i brišu se pri promjeni čvora.
- **Popravak:** plan ④/7 — odjava briše `sokrat-draft:node:*` (uz upozorenje ako ima nespremljenog).

### N16 · `mcp_klijent` bez vlastitog `statement_timeout` — 🟢 NIZAK

- **Pročitano (staging, `pg_roles`):** `anon` 3 s, `authenticated` 8 s, `authenticator` 8 s, **`mcp_klijent` ništa**.
  PostgREST pri promjeni uloge primjenjuje postavke uloge ako postoje; inače vrijedi 8 s iz prijave — **nije
  izmjereno** (traži sporu funkciju, ne gradi se radi pokusa).
- **Popravak:** plan ④/3 — izričito `statement_timeout = 5s` za `mcp_klijent` (kalup ostalih uloga).

### Što je u dionici C izmjereno kao ispravno

- Kad brisanje prođe: **nula** redaka u `nodes`, `node_drafts` (oba stanja), `profile_identity`, `profiles`,
  `auth.oauth_consents`, `auth.sessions`, `auth.refresh_tokens`, Storageu (oba osobna bucketa). Nacrti i OAuth veze
  se brišu s računom kaskadom — ništa ručno.
- AI-token obrisanog korisnika (propusnica još živa): čita prazno, ne može stvoriti nacrt (23503).
- Logovi (edge, funkcije, baza): **ni token ni tijelo zahtjeva** — samo tvrdnje iz JWT-a, prefiks potpisa, IP, grad
  i adresa. `odobrenje.html` i `odjava.html` ne učitavaju ni GA ni Sentry. Sentry šalje s `sendDefaultPii: false`.
- Edge Function: 256 MB, 2 s CPU po zahtjevu, 400 s zidnog sata (Pro) — alat s 1 000 stavki troši 0,7 s ukupno.

## 5 · Sumnje koje još čekaju mjerenje

| područje | što se mjeri | cigla |
|---|---|---|
| 1 ovlasti | **istekao** token (traži čekanje 1 h; potpis i `alg` su izmjereni) | ⑤ |
| 5 injection | ponašanje pravog modela sa zlonamjernim izvorom — **granica je izmjerena** (§5a), model nije | ⑤ |
| 6 limiti | stvarni učinak `statement_timeout` za `mcp_klijent` (N16) · učestalost na razini auth-a (DCR, obnova tokena) — ne mjeri se poplavom | ④/3 · ④/1 |
| 7 privatnost | Sentry nema `beforeSend`: greška na stranici čija adresa još nosi fragment prijave (implicitni tok, `#access_token`) mogla bi ga poslati · N15 u pravom pregledniku · stanje N10 na produkciji | ④/7 · hitni popravak |

### 5a · Prompt injection — što zaveden model MOŽE (izmjereno i pročitano, S-B)

Pretpostavka: model posluša svaku uputu iz izvora. Doseg mu je ono što token i alati dopuštaju, ne ono što mu kažemo:

| pokušaj | ishod | zašto |
|---|---|---|
| mijenjati materijal izvan nacrta · objaviti · obrisati | **ne može** | `publish_node`, 7 RPC-ova čvorova, `node_content` → 403 za `mcp_klijent` (i za admina) |
| čitati tuđe ili katalog | **ne može** | GRANT + RLS; `subject_content`, `profiles`, `content_versions` → 403 |
| obrisati račun, poslati mail, promijeniti lozinku/e-mail | **ne može** | `token-guard` (403) · postavke Auth API-ja (`mcp:brava`) |
| proizvoljan HTTP, SQL, datoteke, izvršavanje kôda **kroz naš poslužitelj** | **ne može** | poslužitelj nema takav alat: jedini alat čita `nodes` pod korisnikovim tokenom; nema `fetch` prema van, SQL-a iz argumenata ni pristupa disku |
| upisati zlonamjeran sadržaj u **vlastiti nacrt** | **može danas** | N5 → zatvara ②/0a; do tada štiti samo to što Prihvati i pregled ne postoje |
| odnijeti korisnikov materijal kroz **drugi** alat u istom chatu (npr. pretraživanje weba) | izvan našeg dosega | mi vraćamo najmanje moguće (imena i id-evi) i nikad tuđe; ostalo je granica klijenta |
| „zatrovati" vlastiti nacrt uputama za sljedeći razgovor | može, ograničeno | šteta ostaje u nacrtu koji korisnik pregleda; alati ②/2 vraćaju sadržaj nacrta kao **podatak**, uz napomenu u opisu alata |

**Pravilo za ②/2:** nijedan alat ne dobiva slobodan URL, SQL ni putanju; argumenti su tipizirani i provjereni u
poslužitelju **i** u bazi; nijedan alat ne vraća ništa što korisnik nije sam napisao.

## 6 · Matrica testova (obavezne dimenzije)

| dimenzija | danas izmjereno | nedostaje |
|---|---|---|
| dva različita korisnika | `mcp:nacrt` ② (tuđi nacrt × 4, isti odgovor kao nepostojeći) · S-B: kod izdan klijentu X ne vrijedi za Y | Prihvati tuđeg nacrta (②/4) |
| administratorov konektor | `mcp:brava` · **S-B: 11 tvrdnji** (uloga, 5 RPC-ova, 5 tablica, kontrola običnom admin sesijom) | — |
| izravni pozivi mimo MCP-a | `mcp:brava` (PostgREST, Storage, Edge Functions, Auth API) · S-B: obična sesija ne ulazi u `mcp_*` | nacrt s zabranjenim sadržajem izravnim RPC-om → Prihvati odbija (③/6) |
| opozvan / pogrešan token | ①/5 · **S-B:** izmijenjen teret (401) · `alg=none` (401) · anon ključ (401) · opoziv: obnova 400, propusnica i dalje piše · PKCE, redirect, jednokratni kod | istekao (⑤) |
| paralelne izmjene | **S-B:** 8 usporednih početaka → točno 3 (kvota drži) · usporedni upisi → **N7** | polazna verzija (②/1b); Prihvati uz izmjenu materijala (②/4) |
| ponovljeni zahtjevi | **S-B:** ponovljena predaja odbijena · ponovljen početak → **N8** | ključ ponavljanja (②/1b); dvostruki Prihvati (②/4) |
| zlonamjeran sadržaj | N1, N2 lokalno · **S-B: 8 oblika primljeno u nacrt (N5)** | validator (②/0a); pregled (②/4); pravi AI sa zlonamjernim PDF-om (⑤) |
| opterećenje | **S-C:** 60 usporednih upisa, 30 usporednih MCP poziva, 1 200 čvorova, objava 5 MB — bez ijedne granice (N11–N13) | granice ④/1–④/3 s obrnutom provjerom (61. upis u minuti odbijen) |
| brisanje računa | **S-C:** puca uz objavljen materijal (N10); kad prođe, nula redaka u 9 tablica + Storage | T5 s objavljenim materijalom i nacrtom od AI-ja (hitni popravak) |

Mjerne skripte dionica A i B nisu u repozitoriju (scratchpad sesije); u ②/0 i ②/1b postaju brane u
`scripts/mcp-nacrt-check.js` i unitima, uz mutacije.

## 7 · Uvjeti puštanja korisnicima (ulaz u fazu ⑥)

Svaki redak mora biti **zelen i izmjeren**, ne pretpostavljen:

1. I1–I3 i dalje zelene na stagingu (`mcp:brava`, `mcp:nacrt`), nakon svih cigli ② i ③.
2. **N2 zatvoren** s regresijskim pokusom u pregledniku; **N1 zatvoren** unitom.
3. Validator u bazi (②/0a) na **sva tri** puta upisa; MCP profil bez `legacy-html`, `learn.content` i vanjskih slika.
4. Prihvati: samo obična sesija · polazna verzija · idempotentan · nacrt ubačen mimo poslužitelja ne prolazi.
   Upis nacrta: polazna verzija i ključ ponavljanja (N7, N8 zatvoreni).
5. Limiti iz S-C postavljeni i izmjereni (④/1–④/3, svaki s obrnutom provjerom); postoji način da se jedan konektor
   ugasi (④/4); `procitaj_materijale` nikad ne reže bez oznake (N12).
6. **N10 zatvoren na produkciji** (brisanje računa s objavljenim materijalom prolazi, T5 to mjeri). Backup pokriva
   osobno gradivo, šifriran je i ima rok 8 tjedana (④/6). Nacrti i OAuth veze nestaju s računom — izmjereno S-C.
7. Pravi AI (Claude + ChatGPT) na ne-admin računu prošao cjevovod i scenarij zlonamjernog PDF-a (⑤).
8. Postavke Auth-a na produkciji jednake stagingu (tri imenovana koraka iz ①).
