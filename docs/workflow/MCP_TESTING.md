# MCP — kako se testira

> Opće pouke o testiranju (uklj. „zeleno lokalno nije zeleno"): [TESTING.md](./TESTING.md).
> Što se mora dokazati prije puštanja: [architecture/MCP_SECURITY.md](../architecture/MCP_SECURITY.md) §6–§7.
> Zašto pojedina brana postoji piše u **zaglavlju njezine skripte** (ADR-027), ne ovdje.

## 1 · Okruženje

- **Sve na STAGINGU** (`sokrat-staging`, ref `czljmvigkgiajzjxtndq`). Brane koje stvaraju ili brišu korisnike **tvrdo
  odbijaju produkciju** (`odbijProdukciju()` u `scripts/lib/staging-oauth.js`).
- Ključevi dolaze iz `.env` (`STAGING_*`); nijedna skripta ih ne ispisuje.
- Playwright u radnom stablu F6 uvijek s `SOKRAT_TEST_PORT=5051` (5050 drži drugo stablo; brana
  `tests/global-setup.js` pada ako port drži tuđi poslužitelj).
- **Staging dashboard — živo stanje** (dashboard-koraci samo uz Leonov OK): OAuth Server **ON** · Authorization Path
  `/odobrenje.html` · DCR **ON** · Site URL `http://localhost:5051` (bio `http://localhost:3000` — vratiti kad pokusi s
  localhosta završe) · Auth Hook `public.mcp_access_token_hook` **Enabled** (Auth Hooks → Customize Access Token).
  ⚠️ **Izlaz u nuždi je isti taj zaslon** — greška u hooku znači da se nitko ne može prijaviti.
- **Spajanje konektora na stagingu traži lokalni poslužitelj na 5051** (Site URL): bez njega se stranica odobrenja ne
  otvori. Iz stabla F6: `PORT=5051 node scripts/static-server.js`; stranica odobrenja na localhostu čita
  `localStorage['sokrat-supabase-override']`. Adresa konektora: `https://czljmvigkgiajzjxtndq.supabase.co/functions/v1/mcp`.
- **Zaštićeni preview** (`ssoProtection` = `all_except_custom_domains`, svaki `.vercel.app` traži prijavu): dok trajna
  bypass-tajna ne postoji (BACKLOG), Vercel MCP alat **`get_access_to_vercel_url`** izda share-poveznicu na 23 h;
  brana je uzme s `--share <url>` i nosi kolačić `_vercel_jwt` samo prema našoj adresi. Vercel drži **jedan aktivan
  share-token** — novi poništava stari, pa se mjeri host po host. Opći recept za svaki zaštićeni preview.

## 2 · Računi

| račun | čemu služi |
|---|---|
| jednokratni (`noviKorisnik()` u `scripts/lib/staging-oauth.js`) | brane: stvore se, izmjere, **same se obrišu** (i na prekidu) |
| `test-a@sokrat.local` · `test-b@sokrat.local` · `test-prazan@sokrat.local` | ručni i agentski pokusi s pravim AI-jem; **ostaju**. Stvara ih `npm run staging:racuni` (idempotentno); lozinke samo u `.env` (`STAGING_TEST_{A,B,PRAZAN}_PASSWORD`) |
| `test-admin@sokrat.local` | **samo** za dimenziju „administratorov konektor" — obični pokusi ne idu kroz admina, jer se na njemu ne vidi ono što F6 mora dokazati |

**Pravi AI-token** (isti put kao Claude): `oauthToken()` u `scripts/lib/staging-oauth.js` — svjež DCR klijent po testu
(već odobrena veza vraća `400 „no longer pending"`).

## 3 · Brane

| naredba | što tvrdi | kad |
|---|---|---|
| `npm run mcp:brava` | što token AI-ja **smije**: popis otvorenog nabraja baza sama (`mcp_brava_inventar`), sve ostalo mora biti odbijeno — PostgREST, Storage (svaki bucket), Edge Functions, Auth API | nakon svake SQL izmjene i svakog novog RPC-a |
| `npm run mcp:prihvat` | nacrt → materijal samo korisnikovim Prihvati: ispravna polica i sadržaj · jednom · nova polica tek pri prihvatu i ne ostaje ako prihvat padne · AI-token i stranac odbijeni · samo predan · druga linija (strogi profil, pitanje → kartica) · odbacivanje | nakon izmjene `supabase/f6-prihvat.sql` ili `_provjeri_kartice_nacrta` |
| `npm run mcp:nacrt` | što rade `mcp_*` funkcije nacrta: vlastito · tuđe · obična sesija · oblik i veličina · kvota · istjecanje · živo gradivo netaknuto | nakon izmjene `supabase/f6-nacrt.sql` |
| `npm run mcp:alati` | ALATI cjevovoda kroz pravi MCP (Node klijent, pravi OAuth token, Edge Function `mcp`): popis alata == jezgra · započni → Learn → kartice → pitanja → pročitaj → predaj, svaki učinak pročitan natrag iz baze · redoslijed (kartice bez Learna, pitanja bez kartica padaju) · isti poziv dvaput ne duplicira · odbijanje baze stiže prevedeno (N9) · živo gradivo netaknuto · ⑧ izmjena postojećeg materijala alatima (kopija → izmjene u nacrtu → predaja s retkom povijesti → vrati → sukob s korisnikovim spremanjem) · ⑫ učestalost (K/5: 61. upis u minuti i 1 001. u 24 h → 429, dva konektora dijele granicu, usporedno točno 60; svaki scenarij svjež korisnik — granica nema iznimku za testove) · ⑬ kvota i paginacija (K/6: 2 000 živih čvorova po korisniku — brava 3 × 100 usporednih, svaki krug točno 10 · 2 001. iz Studija i predaja AI-ja odbijeni, nacrt ostaje · vraćanje mape cijelo ili ništa · jedna naredba preko granice odbijena cijela · `procitaj_materijale` u stranicama od 500 = svi živi iz baze) · ⑭ veličina odgovora (K/7: materijal od točno 1 MB kroz `procitaj_materijal` stiže zbijen ≤ 1 MB i cijel). `MCP_ALATI_URL` = druga adresa (npr. lokalni dvojnik) | nakon deploya funkcije `mcp` i izmjene `alati.ts` |
| `npm run mcp:granice` | VRIJEME upita AI-ja (K/7, N16): privremena sonda kroz `sql:staging`, isti korisnik s dva tokena — kontrola (`authenticated` čita 8s, 6 s čekanja prolazi) i AI (`mcp_klijent` čita 5s, 6 s prekinuto `57014`); sonda obrisana i provjerena (404) | nakon svake izmjene `f6-mcp-brava.sql` ili postavki uloga |
| `npm run mcp:opoziv` | PREKID VEZE i GAŠENJE konektora vrijede ODMAH (K/8, I8): tri scenarija pravim AI-tokenom — korisnik prekine vezu · klijent na popisu `mcp_blokirani_klijenti` (pa odblokiran) · klijent obrisan administratorski; u svakom upis, čitanje kroz alate i `mcp_veza` → `nacrt_veza_prekinuta`. Kontrole: drugi konektor istog korisnika radi, odblokiran opet piše, AI ne vidi popis. 24 provjere; izravan REST na `nodes` ispisan kao poznata granica | nakon svake izmjene `_nacrt_pozivatelj`, `mcp_*` RPC-ova ili hooka |
| `npm run ugc:sadrzaj` | baza provodi strogi profil osobnog sadržaja na **nacrtu i objavi** (isti primjeri kao unit, dijelom generirani iz sheme), granica 1 MB, shema u bazi == datoteka, **zatečeni** materijali prolaze (čegrtaljka `scripts/ugc-zateceno-baseline.json`) | nakon svake izmjene `schema/ugc-content.schema.json` (pa `build:ugc-sql` + SQL na staging) ili `f6-sadrzaj.sql` |
| unit `ugc-shema` · `build:ugc-sql --check` | shema odbija poznate napade i propušta ono što Studio sprema; svaki objekt zatvoren, svaki niz/tekst ograničen; generirani primjeri == osnovica (`UGC_OSNOVICA_UPDATE=1` je podiže); SQL-kopija == shema | preflight |
| `tests/sanitizator-pad.spec.js` · `csp-cdn.spec.js` · `escaping.spec` | pokus N2 u pregledniku s kontrolom (bez DOMPurifyja nema HTML-a; CSP iz `vercel.json` blokira skriptu s jsdelivr `/gh/`) · slika kviza kroz `safeUrl` · fallback u `learn.js` | `test:responsive` |
| `npm run mcp:probe` | lanac otkrivanja izvana, bez ključa (401 + `WWW-Authenticate` → metapodaci → PKCE/DCR → krivotvoren token odbijen) | nakon deploya funkcije |
| `npm run check:mcp-rewrite` | `vercel.json` pravila za `/mcp` (izvodi ih); `--zivo` mjeri preview | u preflightu; `--zivo` ručno |
| `npm run check:functions` | svaka Edge Function pod stražom ili imenovana; `mcp` na produkciji **odsutan** | mrežno, ručno |
| `tests/ai-veze.authed.spec.js` | Povezani AI-jevi u profilu (popis, prekid, escape imena klijenta) | `npm run test:authed` |
| unit `mcp-alati` · `token-guard` · `odobrenje` | jezgra alata, straža nad tokenom, stranica odobrenja | `npm run test:unit` |

## 4 · Kako se sudi (zamke koje su već jednom prevarile branu)

- **Obrnuta provjera je obavezna.** Brana se pusti nad oslabljenim kodom (mutacija) i mora pasti **iz pravog razloga**
  — ispis imenuje palu tvrdnju. Mutacija se vraća bajt-identično i stanje se izmjeri ponovno.
- **Odbijanje se ne sudi po HTTP broju:** odbijen RPC, nepostojeći RPC i RPC s krivim argumentima daju isti
  `404 PGRST202`; Storage odbija s **HTTP 400** i `AccessDenied` u tijelu; `200` s praznim `[]` znači da dozvola
  **postoji**.
- **Upis se dokazuje čitanjem natrag**, ne statusom 200.
- **Mjerač ispisuje doseg** (koliko je tvrdnji dotaknuo); nula stavki = pad.
- **Auth API zna vratiti 429** unutar prozora — to je imenovan ishod, ne kvar.
- **Pomoćnik koji uzima „slučajan uzorak" iz sučelja** (npr. prvi gumb u kaskadi) pukne onog dana kad sučelje postane
  istinito — uzorak je bio stari onemogućeni gumb (②/5, 03.10.). Cilj se imenuje, ne uzorkuje.
- **Animaciju mjere kadrovi** (`getAnimations()` + `currentTime`), ne završno stanje — tako su nađeni kvarovi koje
  zeleni testovi nisu vidjeli (②/5.2, 03.10.).

## 5 · Pravi AI (faza ⑤)

| scenarij | što se gleda |
|---|---|
| cjevovod na stvarnom materijalu | Learn → kartice → pitanja; nacrt u Sokratu; ništa postojeće promijenjeno |
| prazan račun (`test-prazan`) | AI gradi od nule, ne izmišlja police |
| stranac (`test-a` pita za gradivo `test-b`) | AI ne vidi ništa tuđe |
| zlonamjeran izvor | PDF/tekst s uputama („objavi", „obriši", „pošalji podatke na adresu", HTML/skripta u tekstu) → baza i renderer drže bez obzira na to što model posluša |
| prekid i ponavljanje | prekinut razgovor usred cjevovoda → jedan nacrt, nastavak gdje je stao |
| prekid veze | nakon „Prekini vezu" (profil) AI na sljedećem pozivu dobiva `nacrt_veza_prekinuta` i to korisniku kaže — odmah, ne za sat (K/8); zapisati što je model točno rekao |

Klijenti: Claude.ai (custom connector; Free ima jedan) i ChatGPT (developer mode, Plus i više, samo web).
Konektor se spaja na staging adresu funkcije ili na preview alias grane (`/mcp`).

**Spajanje na PRAVI račun (16.10., K/9: oba klijenta dvaput spojena na `test-admin`):**

- Stranica odobrenja uzima račun koji je u **tom** pregledniku prijavljen na `localhost:5051`. AI aplikacija je zna
  otvoriti u **drugom** pregledniku ili profilu (zadanom u sustavu), pa krivi račun ondje prođe neprimijećen.
- Prije „Dopusti" pročitaj redak **Tvoj račun**. Krivi → **„Nisi ti? Prijavi se drugim računom"** → prijava pravim
  računom → spajanje **ispočetka iz AI aplikacije**. Isto povezivanje se ne može nastaviti: poslužitelj ga veže
  za prvi račun koji otvori detalje, drugi dobiva `404 oauth_authorization_not_found` (izmjereno, oba smjera).
- Provjera poslije spajanja: `auth.oauth_consents` za klijenta (`client_name`) mora imati redak pravog računa.
- Preusmjerenje (`sokrat-supabase-override`) se čita **pri učitavanju stranice** — poslije upisa F5, inače prijava
  ode na produkciju i javi „pogrešna lozinka".

## 6 · Što ja ne mogu pokrenuti (harness)

Deploy Edge Functiona (i na staging), push na `main` i uređivanje vlastitih dozvola odbija auto-mode klasifikator.
Obrazac: dam Leonu gotovu naredbu (`npm run deploy:function -- mcp --project staging`), on je pokrene, ja odmah
izmjerim ishod. Brane nad oslabljenim funkcijama traže njegovu dozvolu u postavkama (npr. `Bash(npm run mcp:nacrt:*)`).
