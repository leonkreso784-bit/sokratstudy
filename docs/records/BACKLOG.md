# Backlog — parkiralište ideja

> Ovdje skupljamo ideje da se ne izgube. Nije obaveza — kad ideja sazri, seli se u
> [ROADMAP.md](../plan/ROADMAP.md) kao milestone/korak. Prioritet: 🔥 visok · ➖ srednji · 💤 nekad.

> ### 📌 2026-08-31 — SEDAM STAVKI ODAVDE JE PREUZEO SPEC, NE PLANIRATI IH IZNOVA
> Faza **MREŽA** ([RJESAVANJE-PROBLEMA-9MJ.md](../archive/RJESAVANJE-PROBLEMA-9MJ.md)) nosi ih s
> ciglom i izlaznim uvjetom: **CSP** (D1–D3) · **RLS `auth.uid()` po retku** (A1) ·
> **`.lb-table-wrap` bez `tabindex`** (B3c ✅ 2026-08-31) · **leaked password** (D4) · **EDITOR ① boja kartice**
> (C2 ✅ 2026-09-01) · **EDITOR ② dopune** (E1) · **M5b zatezanje** (E2). Uz njih i `check:i18n` (B5 ✅ 2026-08-31,
> 421 nalaz / 23 datoteke) te osam nemigriranih predmeta (E3).
>
> Njihovi zapisi ostaju **ovdje i nedirnuti** jer nose obrazloženje i mjerenja; spec nosi **redoslijed
> i dokaz**. Kad cigla padne, ovdje se stavlja ✅ s brojkom — ne briše se.

### ⏳ ČEKA LEONA — izvan repozitorija (preneseno iz checkpointa 2026-10-11)

> Do 11.10. su ove stavke živjele samo u memoriji (`current-checkpoint`), koju nijedna brana ne doseže.
> Svaka je provjerena na dan prijenosa; status koji ne znam piše „provjeriti", ne „gotovo".

- **Required check `Gate (sve brane zelene)` na `main`-u** (Settings → Branches) — **provjeriti** je li uključen
  (Leon 11.10.: ne zna; API zaštite grane traži admin pa ga ne mogu pročitati). Izbor je bio da se uključi, uz
  svjesnu cijenu: **`main` postaje PR-only** — required check odbija i izravan push, pa lokalni `git merge` + `git push`
  prestaje raditi. 29.09. je `main` pushan izravno, što s uključenom provjerom ne bi prošlo.
- **Suvišan `STAGING_MAIL_UNSUB_SECRET` na PRODUKCIJI** (staging vrijednost, nitko ga ne čita; 26.09.) — brisanje
  čeka Leonov OK. Ime koje funkcija čita je u Supabaseu uvijek `MAIL_UNSUB_SECRET`; prefiks `STAGING_` postoji samo u `.env`.
- **Trajna Vercel bypass-tajna** (`VERCEL_AUTOMATION_BYPASS_SECRET` u `.env`; Vercel → `studymaster` → Settings →
  Deployment Protection → Protection Bypass for Automation) — **još nije stvorena**; Vercel API meni odbija (403).
  Dotad zaštićeni preview mjeri jednokratni put iz `docs/workflow/MCP_TESTING.md` §1.
- **Ispale stavke (21.09.):** PRD redak „Frontend redizajn" još nosi stari status — provjeriti · Supabase
  `TRUNCATE`-grantovi nisu provjereni drugdje osim na `nodes` (`ARCHITECTURE.md` §122) · **48 grana na originu**
  (11.10.) — čišćenje uz Leonov popis · F2/3a+3b nisu potvrđeni na iPhoneu · zapis BUG-046 u `BUGS.md` kaže da kvar
  „stoji na produkciji" — istina dok se popravak s grane ne deploya.
- **Mape izvan repozitorija koje se smiju obrisati** (`Documents\`): `sokratstudy.f6-k5-mutacije`,
  `sokratstudy.f6-k6-mutacije`, `sokratstudy.hr1-mkt-tmp`, prazna `sokratstudy.h1` (zaključana jer je Leonov cmd
  bio unutra; grana `fix/h1-brisanje-racuna` živi na GitHubu).
- **CI: `ubuntu-latest` prelazi na Ubuntu 26 između 19.10. i 19.11.2026.** (anotacija na svakom jobu runa `d6e3362`;
  [runner-images#14748](https://github.com/actions/runner-images/issues/14748)). Druge metrike fontova → Playwright mjere
  koje ovise o crtanju (širine, prelamanje, `phone.spec`) mogu pocrvenjeti **bez ijedne izmjene u kodu**. Ako se to dogodi,
  prvo usporediti sliku runnera u logu joba; privremeni izlaz = `runs-on: ubuntu-24.04`.
- **CI: `actions/checkout@v4` i `actions/setup-node@v4` ciljaju Node 20** — runner ih već sad **prisilno vrti na Node 24**
  (upozorenje na svakom jobu runa `d6e3362`, run je zelen). Nadogradnja na verziju koja deklarira `node24` = zasebna cigla
  uz pun gate (pravilo #9: verzija se pina točno).

### 🔥 NAŠ AI + API KREDITI — popis i plan NAKON MCP-a (Leon, 2026-10-01)

**Odluka (Leon):** put „kopiraj-zalijepi s korisnikovim AI-jem" **ne dolazi u obzir**. MCP ne doseže sve (Claude,
plaćeni ChatGPT, znanje spajanja) → Sokrat dobiva **vlastiti AI**, plaćen **legitimnim** kreditima, što više.
**Ne:** više računa / ključeva za zbrajanje besplatnih kvota (krši uvjete, ban svih povezanih računa). Mijenja
ADR-031 („ne plaćamo tokene") → nov ADR + faza u planu. **Kad: nakon MCP-a (F6).** Dotad samo ovaj zapis.

**Istraživanje 01.10.** (izvori u sesiji `bb99d98a`, ponoviti provjeru prije prijave — uvjeti se mijenjaju):
- **Cijena materijala** (~50k ulaz + 30k izlaz, +30–50 % za HR): Gemini Flash-Lite / GPT-5 nano ~0,02 USD ·
  Mistral Small ~0,03 · Gemini Flash ~0,15 · Claude Haiku ~0,10–0,20. → „naš AI" = naša Edge Function +
  jeftin API, **ne** vlastiti model (samohostan / WebLLM je skuplji i slabiji do velikog prometa).
- **Bez firme, odmah:** Google Cloud Free Trial **300 USD / 90 d** (Gemini preko Vertex AI, EU regija; NE AI Studio)
  — aktivirati tek kad AI-cigla krene · **Azure for Students 100 USD/god** (@uniri, obnavlja se; ⚠️ produkcija
  dopuštena? neprovjereno) · besplatni slojevi za razvoj: Cerebras 1M tok/dan, Mistral 10 USD/mj (EU; isključiti
  trening), Cloudflare Workers AI.
- **Najveća poluga = INKUBATOR:** Microsoft 100–150k i AWS Activate do 200k traže **partner-kod** (inkubator /
  akcelerator) → pitati Rijeku / STEP RI jesu li partneri; i HAMAG-BICRO PoC (fizička osoba preko „prepoznatog centra").
- **S firmom (j.d.o.o.):** Google for Startups 2k · Microsoft 1k+4k · AWS Activate 1–5k (uklj. Claude/Bedrock) ·
  Cloudflare 10k (2,5k Workers AI) · Vercel do 30k · ≈ 10–20k USD ukupno; 100k+ gotovo svugdje traži i investitora.
- ⚠️ **Besplatni Gemini API je ZABRANJEN za aplikacije s korisnicima iz EEA** (samo plaćeno / Vertex) ·
  **DeepSeek izbjegavati** (podaci u Kini, zabrana u Italiji) · GitHub Models ugašen 30.07.2026. · GDPR: DPA + SCC/DPF
  s pružateljem, spomen u politici privatnosti; maloljetni korisnici = otvoreno.
- **Što ide u plan (nakon MCP-a):** popis kredita s rokovima i koracima · ADR · Edge Function s ključem (ADR-016) +
  granica po korisniku · izbor modela mjerenjem na pravom materijalu (kvaliteta HR) · brane ③ na istom write-putu.

### 🔥 Produkcija javno poslužuje `.md` — `CLAUDE.md`, `docs/**` (2026-09-30, izmjereno)

**Izmjereno 30.09. (samo GET):** `www.sokratstudy.com/CLAUDE.md`, `/docs/README.md`, `/docs/records/PROGRESS.md`,
`/docs/records/BUGS.md` → **200** `text/markdown`. Projekt nema `.vercelignore`, pa Vercel poslužuje svaku datoteku iz
repoa. Kad F6 uđe u `main`, javno bi se posluživao i `architecture/MCP_SECURITY.md` (karta otvorenih nalaza).
**Odluka (Leon, 30.09.):** sakriti **samo sa stranice**; GitHub-repo ostaje javan („github ćemo drugom prilikom"), a
repo NE postaje privatan (izmjereno: ~244 CI-runa/mj. → privatni repo bi potrošio besplatnu kvotu Actions minuta).
**Cigla:** `.vercelignore` (ili pravilo u `vercel.json`) za `*.md` i `docs/**` · brana u preflightu koja nabraja `.md`
iz repoa i tvrdi da nijedan nije u deployu · poslije deploya izmjeriti 404 na istim adresama. Grana od `main`-a, deploy uz
Leonov izričit OK. **Prije F6 → main.**
**Poslije (zasebno, nije odlučeno):** docs izvan javnog GitHuba (npr. privatni repo) — povijest ostaje javna bez
prepisivanja, koje NE preporučujem.

### 🔥 AI-token smije promijeniti E-MAIL — je li „Secure email change" uopće uključen? (2026-09-22, F6 ①/2b)

**Povod.** ①/2b je postavkom „Require current password" zatvorio **lozinku** AI-tokenu, ali `PUT /auth/v1/user`
s poljem `email` ostaje **imenovano otvoren** (izmjereno: prolazi autorizaciju). Ako dvostruka potvrda
(**Secure email change** — klik na **OBA** maila, stari i novi) **nije uključena**, put glasi:
**AI promijeni mail → zatraži reset lozinke → preuzme račun.** Brava bi pritom ostala zelena, jer je taj
redak otvoren **po planu**.

## ✅ **ODGOVORENO 2026-09-22 — prekidač je UKLJUČEN na OBA projekta, put je zatvoren.**

Provjereno **dvjema neovisnim metodama koje se slažu**:

1. **Mjerenje pravim putem (staging).** Jednokratni korisnik, njegov vlastiti token, `PUT /auth/v1/user`
   s poljem `email` — točno put kojim bi išao AI. U bazi su nakon toga **oba** tokena:
   `email_change_token_current` **I** `email_change_token_new` → traži se potvrda i sa **stare** adrese.
2. **Čitanje prekidača u dashboardu (staging I produkcija).** *Secure email change* = **uključen** na oba.

**Zato put „AI promijeni mail → reset lozinke → preuzme račun" NE PROLAZI**: bez pristupa staroj adresi
promjena ostaje „pending" i nikad se ne primijeni.

⚠️ **Što je pritom oboreno, i vrijedi izvan ove stavke:** prvi pokušaj mjerenja išao je preko admin poziva
`generate_link`, i dao je **dva suprotna odgovora u dvije minute**. Razlog: `generate_link` piše **onaj token
koji zatražiš** (`email_change_current` → token za staru adresu, `email_change_new` → za novu), **neovisno o
postavci**. Mjerio je dakle **alat, ne postavku**. Pouka: kad alat sam bira što će zapisati, on ne može biti
mjerač te iste stvari — mjeri se put kojim ide napadač.

⚠️ **Što i dalje NIJE zatvoreno:** ovo je **postavka u dashboardu koju nijedna brana ne gleda**. Može se
isključiti a da ništa ne pocrveni. → **imenovan korak u F7** (uz „Require current password", koji je na
produkciji **isključen**). Stanje prekidača na dan 22.09.:

| postavka | STAGING | PRODUKCIJA |
|---|---|---|
| Secure email change | ✅ uključen | ✅ uključen |
| Require current password when updating | ✅ uključen | ❌ **isključen** (F7) |
| Prevent use of leaked passwords | ❌ isključen | ✅ uključen |
| Secure password change (24 h reauth) | ❌ isključen | ❌ isključen |

⚠️ **Usput nađeno:** staging i produkcija razilaze se u **dvije** postavke, pa staging **nije vjerna proba**
za F7 — to treba poravnati prije objave, inače se na produkciji prvi put mjeri ono što nitko nije vidio.

### ➖ Odstranjivač komentara na DVA mjesta može pojesti KOD (2026-09-24, nađeno mutacijom u F6 S2)

`scripts/ci-tajne.js:114` i `tests/unit/axe-gate-usage.test.js` odstranjuju komentare **blok pa redak**:

```js
src.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^\s*\/\/.*$/gm, ' ')
```

⚠️ **Redoslijed je kvar, ne stil.** Običan redak-komentar koji sadrži kosu crtu sa zvjezdicom (npr. kad
spominje `tests/unit/` + zvjezdicu + `.test.js`) **otvori prividni blok-komentar**, koji se zatvori tek na
sljedećem pravom `*/` — i sve između nestane, **uključujući kod**. Brana tada sudi tekstu koji je sama
obrisala, pa tvrdi „nema zabranjenog obrasca" nad prazninom.

**Izmjereno 2026-09-24:** u brani `test-unit-runner` je to bilo **živo** — mutacija koja u runner ubaci
zakucanu putanju prolazila je **ZELENO**. Ondje je popravljeno (`samoKod`, ide **po retku**, uz tvrdnju
koja baš to mjeri). Na ova dva mjesta je danas **latentno**: nijedan `a11y*.spec.js` nema taj obrazac u
retku-komentaru (provjereno), pa brane trenutno mjere ispravno.

**Zašto svejedno stoji ovdje:** latentno znači „čeka prvi komentar koji spomene obrazac koji zabranjuje" —
a brana o zabranjenim obrascima ih po prirodi spominje. **Gotovo kad** oba mjesta dijele isti odstranjivač
po retku i kad mutacija nad svakim od njih padne crveno.

### ➖ Nijedna brana ne nabraja MJESTA koja mijenjaju lozinku (2026-09-22, revizija ①/2b, nalaz N3)

Danas su dva: `js/profile.js` (profil, šalje `current_password`) i **`js/auth.js:865`** (oporavak lozinke, svjesno
bez nje — korisnik staru ne zna). Unit-brana ①/2b čita **samo `js/profile.js`**, pa je drugi put **nemjeren**, a
treći koji netko doda sutra bio bi **nevidljiv**.

**Oblik rješenja je već u kući** (`OTVORENO` u `scripts/mcp-brava-check.js`): pobroji sve `auth.updateUser(`
pozive u `js/**` čiji argument nosi `password:`, i traži da je svaki **ili** popraćen `current_password` **ili**
na imenovanom popisu **s razlogom**. Oporavak je svjesna iznimka. Desetak redaka, **pada po defaultu** na treće mjesto.

**Zašto nije riješeno odmah:** Leon 22.09. izabrao **S1** i **`test:unit` popis** kao prva dva; ovo čeka.

### 🌐 SPREMNOST ZA DRUŠTVENU MREŽU — gap-analiza identiteta i slika (2026-09-13, Leon: *„razmišljaj kao Zuckerberg"*)

**Povod.** F2/2 (slike profila + izrez) je na produkciji; Leon: *„moramo sve pripremiti za kada bude bila socijalna
mreža."* Ovo je popis onoga što PROFESIONALNA mreža ima, a mi nemamo — razvrstan po tome **koliko kasnije košta**.
Ništa ovdje ne otvara presuđeno: javni profil i dijeljenje = F7 (ADR-035/036), MCP = F6, katalog ostaje zaliha.

**Što je već na razini mreže (ne dirati):** identitet izvan `profiles` (`role` nedodirljiv) · upis samo kroz
`SECURITY DEFINER` RPC · javan bucket s vlasničkim prefiksom i UUID-imenima · izrez u pregledniku (1:1 / 3:1) ·
GDPR-brisanje čisti sve osobne buckete · i18n na oba jezika · telefon i a11y mjereni.

**A · STRUKTURNO — jeftino sad, skupo poslije** (mijenja shemu koju će F7 i svaka objava pretpostavljati):
> **✅ A1–A3 NA STAGINGU 2026-09-14** (`supabase/f2-temelj-mreze.sql`, spec `temelj-mreze.authed.spec.js` 6/6; CHANGELOG
> 14.09.). Odstupanja od prijedloga ispod: `handle` je obični `text` (pravilo oblika drži mala slova, pa `citext` nije
> potreban) · kvota NE smije biti podupit u politici (izmjereno: `42P17`, srušio SVE uploade) → SECURITY DEFINER brojač.
> **PROD čeka Leonov OK** (SQL prije klijenta).

1. **`handle`** (korisničko ime za URL, `@leon`): `citext` unique, `^[a-z0-9_]{3,20}$`, popis **rezerviranih**
   (`admin`, `sokrat`, `api`, `login`…), promjena najviše 1× / 30 dana, provjera u RPC-u. Bez toga javni profil
   nema adresu, a svaka kasnija dodjela znači migraciju postojećih računa.
2. **`visibility`** (`private` | `link` | `public`, default `private`) u `profile_identity` + javna SELECT-politika
   **filtrirana tom kolonom** — jedina politika koju F7 smije dodati nad identitetom. Bez kolone bi F7 morao birati
   između „svi javni" i nove migracije.
3. **Kvota po korisniku u `profile-images`**: INSERT-politika s podupitom `count(*) < 20` nad vlastitim prefiksom.
   Javan bucket bez kvote = besplatan hosting za bilo koga s računom. Isti obrazac kasnije za `node-images`.
4. ~~**Avatar u `user_metadata`**~~ **✅ 2026-09-14 (F2/1 ③)** — traka crta sliku bez kruga prema bazi; putanju zrcali
   klijent (`SokratProfileImages.mirrorAvatar`) poslije `set_profile_image`, a `loadIdentity` popravlja razliku.

**Red (Leon, 14.09.: „može kreni"):** F2/1 ③ → **A1–A3 „Temelj mreže"** → F2/3c → F2/5 → F2/4.

**B · HIGIJENA — treba prije prvog vala korisnika, ne prije F7:**
5. **Siročad u Storageu**: upload prođe, RPC padne (mreža) → datoteka bez reda. Klijent čisti „najbolji pokušaj";
   treba i **mjerač** (`npm run check:orphans`, read-only: objekti bez putanje u `profile_identity`) pa tek onda
   metla (Edge Function na rasporedu; SQL-brisanje ostavlja S3-siroče, v. `f2-profile-images.sql`).
6. **Backup Storagea**: `npm run backup` snima SAMO bazu (`scripts/backup-db.js`) — slike korisnika nemaju kopiju.
7. **Rate-limit uploada i prijave** (Supabase Auth rate-limit već u §4 RASPORED-a; Storage nema — kvota iz A3 je prvi zid).
8. **Minijature**: Supabase image transformations (Pro) — `getPublicUrl(path, {transform:{width:96}})` za traku i
   popise; bez toga svaka lista vuče 512 px avatar.

**C · PRAVNO I POVJERENJE — prije javnih profila (F7), Leonove riječi, ne moje:**
9. `terms.html`/`privacy.html`: korisničke slike su JAVNE po URL-u (odluka 09.09.), pravo na uklanjanje, dob (GDPR
   16 / roditeljski pristanak), zabrana tuđih fotografija.
10. **Prijava sadržaja + blokiranje** (report/block) — minimum za bilo koji javni profil; moderacija slika (NSFW)
    tek kad ima volumena, ali `report` tablica je jeftina sad.
11. **Sigurnost računa**: promjena e-maila s potvrdom, 2FA (Supabase MFA), pregled sesija — F2/4 susjedstvo.

**D · MREŽNI MODEL — TEK F7+, ovdje samo da se ne zaboravi oblik:** pratitelji (`follows`), objave = materijali
(ADR-035), reakcije/komentari, obavijesti, feed, blokiranja. **Preduvjet za sve: prave adrese umjesto hash-ruta**
(§5 RASPORED-a kaže „arhitektonska odluka, ne cigla" — mreža ju vraća na stol: `@handle` bez URL-a nije handle).

**Prijedlog reda:** A1–A4 kao jedna cigla „TEMELJ MREŽE" odmah iza F2/1 (dira isti šav: RPC + `user_metadata`) ·
B5–B6 u §4 stalnu traku · C i D uz F7. ~~Ništa od ovoga nije započeto~~ A1–A4 izvedeno 14.09. (v. gore); B, C, D čekaju.

## ✅ **ZATVORENO 2026-09-24 — uzrok je HLADNA MREŽA, ne trajanje prijelaza.**

Dijagnoza ispod („boja uhvaćena usred prijelaza") bila je **točna ali nepotpuna**: nije govorila
**zašto** prijelaz uopće krene, pa se lokalno **nije dalo reproducirati** i stavka je stajala 10 dana.

**Mehanizam, izmjeren:** kad `styles.bundle.css` stigne **nakon prvog izračuna stila**, pozadina se
mijenja iz zadane svijetle u temsku i prijelaz **KRENE** — jer ga propisuje stil koji je tek stigao
(`body { transition: all .3s }`, `css/variables.css:126`). Lokalno je CSS instantan pa se to nikad ne
dogodi; na CI runneru povremeno da. Odatle omjer ~2/72.

**Dokaz da je to isti kvar:** oba zabilježena pada rekonstruiraju se **točno** kao interpolacija
svijetle (247,249,252) i tamne (15,17,21) pozadine — `rgb(75,77,81)` = **74,1 %** puta,
`rgb(199,201,203)` = **20,9 %**. Uz kašnjenje CSS-a izmjereno: bez smirivanja `rgb(247,249,252)` i
`getAnimations()` = `["background-color","color"]`; sa smirivanjem `rgb(15,17,21)`.

**Popravak:** boja se mjeri kroz `konacnaPozadina()` → postojeći `smiri()` iz `tests/helpers/axe-gate.js`
(pisan za BUG-042, isti razred, **pada zatvoreno**). Popravljena **oba** mjesta u specu, ne samo ono koje
je palo. ⚠️ **Tvrdnje o atributu se i dalje sude BEZ smirivanja** — one su pravi sadržaj testa.

**Uz popravak ide NOVI trajni test** „hladna mreža: CSS stigne poslije prvog kadra" — tvrdi što korisnik
na sporoj vezi stvarno dobije, i **na starom kodu pada**, dakle je i obrnuta provjera. To je ono što je
ovoj stavci nedostajalo: rupa je bila zapisana, ali **nije imala test** (ADR-027).
**Mjera:** `theme-fouc` **84/84** (28 × 3 ponavljanja, 4 profila).

⚠️ **DVIJE POGREŠNE HIPOTEZE PRIJE TE, zapisane u testu da se ne ponove:** spori prijelaz ubačen na
`DOMContentLoaded` ne reproducira (tema je već primijenjena), a ubačen u `<head>` prije `boot.js`
također ne — **promjena prije prvog izračuna stila ne stvara prijelaz.**

---

**🧪 Povremeni pad `theme-fouc.spec.js` (nađeno 14.09., star):** scenariji s tamnim uređajem padaju ~2/72 na tvrdnji
„pozadina nije tamna" — boja `body` uhvaćena USRED prijelaza (npr. `rgb(199,201,203)`), dok je atribut teme točan od prvog
kadra (nula promjena). Isti omjer i sa `theme.js` od prije F2/1 (izmjereno obrnuto). Popravak brane: čekati mirnu
pozadinu (`expect.poll`) ili ugasiti prijelaze PRIJE mjerenja boje — ne dirati tvrdnju o atributu. Nije hitno; stalna traka.
➕ 15.09. (puni paket, 1/801): `izbor chalk pobjeđuje uređaj` na iPhone-SE, boja `rgb(247,249,252)` = POČETAK istog prijelaza
(puna svijetla); sam spec odmah poslije 60/60 (`--repeat-each=10`), WIP nije dirao nijednu datoteku teme.

### 🔴 LEONOVI NALAZI S UREDAJA — 2026-09-04 (nedirnuto, ceka svoj red)

**A. ODLUKA: TEMA PRATI RACUN, NE UREDAJ** (Leon, 2026-09-04: *„tema treba pratiti racun"*).
**✅ IZVEDENO 2026-09-14 (F2/1 ①, `feat/f2-tema-racun`)** — otvoreno pitanje ispod odgovoreno 06.09. (zadana: odjava
briše lokalni izbor); izvedba i brane: CHANGELOG 14.09. Tekst ispod ostaje kao zapis povoda.
Danas se tema sprema u `localStorage` pod `sokrat-theme` — dakle po UREDAJU. To je bilo
namjerno („tema je stvar uredaja", zapisano uz birac u profilu), ali Leon je odlucio suprotno.
**Njegov opis kvara koji ga je na to naveo:** *„kada otvorim aplikaciju i nisam prijavljen,
svejedno se otvara onako kako sam zadao kada sam zadnji put bio prijavljen — dakle tema nije
vezana za profil nego za cache."* To je tocan opis danasnjeg ponasanja.
**Sto to znaci za izvedbu (nije jos raspisano):** tema postaje korisnicki podatak, dakle ide
uz prijavu — `localStorage` ostaje **prvi kadar** (mora se odluciti PRIJE crtanja, `boot.js`),
a racun je **izvor istine** koji ga pri prijavi pregazi i pri promjeni upise. Otvoreno pitanje
za tu ciglu: **sto s neprijavljenim korisnikom na tudjem uredaju** — ostaje li zadnja lokalna
tema ili se vraca na zadanu. **Mjesto: R2 (profil).**

**B. TRZANJE PRI SKROLANJU** (Leon, 2026-09-04: *„kada se scrolla mora biti savrseno smooth
kao da si na najnovijem iphonu. trenutno prekidaju frejmovi"*).
⚠️ **NIJE DIJAGNOSTICIRANO — nije ni izmjereno.** Ne pogadjati uzrok: `perf-probe` mjeri PRVI
KADAR, a ovo je trosak PO KADRU, sasvim druga mjera. Treba vlastita sonda (kadrovi kroz
skriptirani skrol + duge zadace + koliko je piksela prebojano), i tek onda hipoteza. Sumnjivci
koje treba PROVJERITI, ne pretpostaviti: sjene i `filter` na karticama · plohe koje se ne
kompozitiraju · `scroll` slusaci bez `passive` · velike povrsine prebojavanja.

**IZMJERENO 2026-09-05 — F1/6, `scripts/jank-probe.js`** (Chromium, 393×852 @3x, CPU 4×, prst = ručni niz
touch-događaja 3+3 zamaha; rAF-kadrovi + trace `Paint`/`DroppedFrame` + `Performance.getMetrics`). ⚠️ CDP
`Input.synthesizeScrollGesture` s `touch` u headlessu **ne miče stranicu** (0 px) — mjerač je to sam prijavio.

| ruta | prešlo / moguće px | kadrova | median / max ms | > 25 ms | paintova / Mpx | ispušteno |
|---|---|---|---|---|---|---|
| **landing** | 2 072 / 4 795 | 591 | 16,7 / 33,3 | 1 | **240 / 532,6** | **28** (54 i 20 u drugim prolazima) |
| browse | 0 / 0 (stane na ekran) | 517 | 16,7 / 16,8 | 0 | 0 / 0 | 0 |
| browse:dubina | 919 / 919 | 533 | 16,7 / 33,4 | 2 | 0 / 0 | 0 |
| lessons | 149 / 149 | 524 | 16,7 / 16,8 | 0 | 0 / 0 | 0 |
| about | 884 / 884 | 531 | 16,7 / 33,2 | 1 | 0 / 0 | 0 |
| learn | 2 055 / 8 484 | 540 | 16,7 / 33,4 | 3 | 0 / 0 | 0 |
| flashcards | 193 / 193 | 522 | 16,7 / 16,8 | 0 | 0 / 0 | 0 |
| quiz | 163 / 163 | 529 | 16,7 / 33,3 | 1 | 0 / 0 | 0 |
| fill | 210 / 210 | 542 | 16,7 / 33,4 | 1 | 0 / 0 | 0 |
| progress | 880 / 880 | 534 | 16,7 / 33,3 | 3 | 0 / 0 | 0 |

Layout i recalc-style tijekom skrola = **0 na svim rutama**, skripta 78–143 ms po prolazu od ~9 s, LoAF 0 →
**glavna nit nije problem** (jedini `scroll`-slušač, `progress.js:98`, je `passive` i nije na tim rutama).
533 Mpx / 240 paintova ≈ 2,2 Mpx po paintu ≈ **70 % ekrana @3x SVAKI kadar** — to je trzanje.

**Protučinjenično na landingu** (isti prolaz, ubrizgan `<style>` s `!important` zabranom):

| scenarij | paintova / Mpx | ispušteno | > 25 ms |
|---|---|---|---|
| kontrola | 240 / 532,6 | 54 | 1 |
| bez zamućenja (`backdrop-filter`) | 240 / 532,6 | 51 | 1 |
| bez sjena (`box-shadow`) | 240 / 532,6 | 34 | 1 |
| **bez fiksne pozadine** (`background-attachment: scroll`) | **0 / 0** | **0** | 3 |
| bez pozadinske slike landinga | 0 / 0 | 0 | 2 |
| bez prijelaza i animacija | 240 / 532,6 | 20 | 0 |

**Zaključak:** jedini izmjereni uzrok prebojavanja je `landing.css` `background-attachment: fixed, fixed, …`
(zrno + odsjaj iza heroja). Broj paintova je **stabilan** (240 u četiri prolaza), `dropped` je **šum**
(20–54) → paint je mjera na koju se oslanjamo, ispušteni kadrovi samo potvrda smjera.
⚠️ **Granice instrumenta:** Chromium (WebKit u Playwrightu nema CDP-trace); iOS Safari `background-attachment:
fixed` ionako crta kao `scroll`, pa je ovo dokaz troška na Androidu/stolnom Chromeu — Leonov **iPhone može
trzati iz razloga koji ovaj alat ne vidi** (ondje najsumnjivije: `backdrop-filter: blur(12px)` na ljepljivoj
traci). Zato F1/7 uz popravak landinga nosi i A/B na pravom telefonu (`?bez=…` prekidač na previewu).
**Mjesto: F1/7** (hipoteza u RASPORED-u).
**✅ F1/7 ISPORUČEN 2026-09-05 navečer** — ① `css/landing.css` `fixed` → `scroll` (`9139d6f`): kontrola na landingu
PRIJE paint 240 / 532,7 Mpx, ispušteno 94 → POSLIJE **0 / 0, ispušteno 0** (isti instrument, isti dan); brana
`no-fixed-background.test.js`. ② `?bez=` prekidač: `css/bez.css` + `boot.js` (`data-bez` prije prvog crtanja) +
sonda čita modul umjesto vlastite kopije; živa provjera u Chromiumu (393 px): zamućenje 5 → 0 · sjene 27 → 0 ·
prijelazi 187 → 0 · pozadina → `none`; `jank-probe` 5/5 scenarija paint 0/0. **Čeka: Leonov A/B na iPhoneu**
(`?bez=zamucenja` najsumnjivije — `backdrop-filter: blur(12px)` na ljepljivoj traci, v. ⚠️ gore).

**C. BIJELI BLJESAK NA PRAVOM UREDAJU TRAJE ~1 s, ne 119 ms** (Leon: *„prvo ce se otvorit
regularna klasicna tema (bijela) i stajat ce na jednu sekundu mozda manje. Onda ce se vratit
na mint"*). To je ISTI kvar koji je zatvoren 2026-09-04 (`boot.js`), samo na sporijem uredaju:
mjereno je 119 ms na brzoj vezi i 232 ms na Slow-4G, a Leonov telefon je gori slucaj iste
stvari. **Popravak je na produkciji od 2026-09-05** (`8b70c15`) — presuđuje Leonov telefon.
⚠️ Pouka koja ostaje: **mjera na razvojnom stroju je DONJA granica, ne stvarnost korisnika.**

**D. ✅ LJEPLJIVI HOVER NAKON PRELASKA — ISPORUČENO 2026-09-05 (① dodir + ② miš, BUG-044 zatvoren)** (Leon, 2026-09-05: *„Svaki put kada se stisne na neki gumb
on po rubovima malo posvijetli. Onda kada taj gumb odvede na drugu stranicu, gumb koji je stajao na
mjestu starog gumba isto svijetli po rubovima a nije ga se diralo, to je jako naporno."* —
*„imamo taj problem od početka"*).
**Izmjereno 2026-09-05** (scratch-sonda, browse drill-down fakultet → program → godina; kartice u
istom gridu, pa nova dolazi točno na mjesto stare):

| profil | nakon 1. prelaska | nakon 2. prelaska + 3 s |
|---|---|---|
| **miš** (1280×800) | kartica pod nepomičnim pokazivačem **JE `:hover`**: rub `#4f46e5`, `translateY(-4px)`, `shadow-e2` — mirna susjeda `#dde4ee` / bez sjene | isto; ne prolazi samo od sebe |
| **dodir** (393×852, Chromium `hasTouch`) | pod točkom je nova kartica, **NIJE `:hover`**, stil = mirni | isto, i nakon skrola |

Na **mišu** je to standardno ponašanje preglednika (hover se računa po položaju pokazivača, ne po
pokretu) — ali upravo to Leon opisuje i upravo to smeta. Na **dodiru** emulacija ne reproducira, a
pravi iOS Safari / Android Chrome drže „ljepljivi" hover nakon dodira → dodirni put se potvrđuje na
Leonovom telefonu (**koji preglednik** odlučuje koji popravak). **Fokus nije uzrok:** navigacija ne
zove `.focus()`, `activeElement` poslije prelaska je `BODY` — svijetli `:hover`, ne fokus-prsten.
**Inventar:** `:hover` **148 pravila u 20 datoteka** (block-editor 24 · studio 18 · profile 10 ·
landing 10 · my-materials 9 · …), **1 zaštićeno** (`policies.css`: `@media (hover: hover) and
(pointer: fine)`); `:focus` bez `-visible` **14** naspram `:focus-visible` **12**; `:active` 11.
Tailwind v4 svoj `hover:` varijant već zamata u `@media (hover: hover)` — naš ručni CSS ne.
**Kandidati (odluka u cigli, ne ovdje):**
ⓐ dodir — `@media (hover: hover)` oko svakog hover-pravila, **kroz `build:css`** (postcss već stoji
ispod Tailwinda): jedno mjesto, buduća pravila pokrivena, umjesto 148 ručnih zamotavanja;
ⓑ miš — hover se **naoruža tek prvim `pointermove`-om poslije promjene rute**: `navigateTo` stavi
`data-hover-paused` na `<html>`, prvi pomak ga skine, hover-selektori dobiju prefiks
`:where(:root:not([data-hover-paused]))` (**nula specifičnosti** — inače C3 kaskada-testovi padaju);
ⓒ `:focus` → `:focus-visible` (14 mjesta).
⚠️ **Zamka:** `pointer-events: none` dok je pauzirano NIJE opcija — dodir bez pomaka bio bi blokiran.
**Mjesto: F1/8** (serija: brana → zamatanje → fokus).
**① ISPORUČENO 2026-09-05 (dodir).** `scripts/hover-css.js` u `build:css`: lightningcss ČITA (stablo s
precima, `loc`), TEKST se prepisuje — vraćanje stabla u Rust puca i prepisalo bi svaki bajt. 130 pravila /
142 selektora u `@media (hover: hover)`, liste cijepane (`:focus-visible` vani), 4 već pod hover-medijem
preskočena, `:hover` u `:not()/:is()` = pad builda (danas 0). Legal/consent ručno. Brana `check:hover`
(obrnuto 130 golih → 0). `scripts/hover-probe.js`: WebKit dodir ljepljivo 2/2 → mirno 2/2; miš 38 elemenata
0 razlika, 20 i dalje mijenja izgled.
**② ISPORUČENO 2026-09-05 (miš).** `pauzirajHover()` (`js/utils.js`) stavi `data-hover-paused` na `<html>` iz
`navigateTo` I `browseNaRazinu` — browse-prelazi ne idu kroz `navigateTo`, plan je to previdio, sonda našla; prvi
`pointermove` skine (ne `mousemove`: dodir ga šalje). Prefiks `:where(:root:not([data-hover-paused]))` na 142/142
selektora kroz isti `hover-css.js` prolaz (i na pravilima već pod medijem; idempotentno); `check:hover` ga traži
(obrnuto 134 → 0). `hover-probe --profil=prelaz`: ljepljivo 2/2 → mirno 2/2 + naoružano 2/2; miš `--usporedi`
0 razlika; css:diff 7 161 usporedbi 0 razlika; `hover-arm.test.js` 28 tvrdnji.

**Izmjereno DRUGI put, 2026-09-05 — WebKit instaliran u Playwright (isti drill-down, sonda u scratchu):**

| motor / ulaz | nakon 1. prelaska | 2. prelazak + 3 s | 3. dodir · dodir u prazno |
|---|---|---|---|
| **WebKit / dodir** (393×852 @3x; `hover: none`, `pointer: coarse`) | nova kartica **JE `:hover`**: rub `#4f46e5`, −4 px, sjena | isto | isto · hover **preskoči** na ono što je pod novom točkom |
| WebKit / miš | JE `:hover` | isto | — |
| Chromium / dodir (iste media-značajke) | NIJE | NIJE | NIJE |
| Chromium / miš | JE | isto | — |

Na iPhoneu **svaki** preglednik vrti WebKit (Safari, Chrome, Firefox — Appleovo pravilo), pa pitanje „koji
preglednik" otpada: Leon to vidi u svakom. Dodir šalje `pointerdown touchstart pointerup touchend mouseover
mousemove mousedown mouseup click` — **`mousemove` da, `pointermove` ne**; nakon prelaska bez pomaka nijedan
motor ne šalje `pointermove` (samo `mouseover` novom elementu). `activeElement` je `BODY` u sva četiri slučaja.
**Protučinjenično:** ubrizgano `@media (hover: none) { .browse-card:hover { rub/pomak/sjena = mirno } }` →
WebKit s dodirom: `matches(':hover')` ostaje `true`, ali **izgled je mirni** (rub `#dde4ee`, `transform: none`);
na mišu (oba motora) pravilo ne radi ništa — ⓐ radi gdje treba i samo ondje.
**Inventar po svojstvu** (138 pravila, 148 pojava, 27 datoteka): `background` 66 · `color` 64 · `border-color`
50 · `transform` 32 · `box-shadow` 26 · `opacity` 15 → **66 pravila mijenja rub**, doslovno Leonovo „po
rubovima". Golih `:focus` je 12 i **sva su na poljima za unos** (`input`/`select`/contenteditable), gdje prsten
na klik i treba → **ⓒ otpada**.
⚠️ Za ⓐ: `.browse-card:hover, .browse-card:focus-visible {…}` dijele pravilo → zamatanje mora **cijepati
selektor-listu**, ne zamotati cijelo pravilo (inače tipkovnica na tabletu gubi fokus-stil). `postcss` NIJE
instaliran (Tailwind CLI nosi vlastiti lightningcss) → cigla bira: pin `postcss` kao dev-ovisnost ili vlastiti
prolaz dokazan `css:diff`-om (miš = bajt-isto). Brana ①: **statička** (svaki `:hover` u bundleu unutar
`@media (hover: hover)`) u preflightu + WebKit-sonda izvan njega (CI nema WebKit). Serija je time **dvije cigle**.

**E. KARTICE KAO TINDER-ŠPIL NA TELEFONU** (Leon, 2026-09-05: *„na mobitelu bi napravio za kartice
kao tinder način otvaranja i gledanja. To se treba zapisat."*).
**Danas** (`js/flashcards.js`, `#flashcards`): jedna kartica, klik okreće (`flipCard`), gumbi
`btnPrev` / `btnNext` / `btnCorrect` / `btnWrong`; napredak kroz `markKnown` / `markUnknown` →
`saveFlashcardProgress` (cloud-sync ga zrcali). **Nijedne dodirne geste** u modovima učenja —
jedini `pointerdown` na platformi je u `my-materials.js`.
**Zadano dok Leon ne kaže drugačije:** dodir = okreni · povlačenje desno = znam · lijevo = ne znam ·
iduće dvije kartice vire ispod (špil) · gumbi ostaju ispod špila (pristupačnost) · stolno zadržava
današnji prikaz + tipkovnicu · `prefers-reduced-motion` gasi let kartice · bez biblioteke
(pointer-događaji + `transform`, bez `scroll`-slušača). **Jedini put upisa ostaju
`markKnown` / `markUnknown`** — gesta ih zove, ne duplicira.
**Otvoreno (RASPORED §6/6):** zamjenjuje li špil današnji prikaz na telefonu ili je prekidač; nosi li
smjer značenje. **Mjesto: F1/9.**
**✅ ISPORUČENO 2026-09-06 (F1/9).** Leon isti dan: *„samo na mobitelu … ako imaš viziju probaj nešto"* → gesta samo za
`pointerType === 'touch'`, špil samo `pointer: coarse`; **vizija za komp = strelice** (→ znam · ← ne znam · razmak/Enter okreće, isti
let i pečat). Otvoreno pitanje palo odlukom: gesta je DODATAK uz gumbe → prekidač nepotreban; desno = znam. Mjere: SLOP 10 px · prag
= širina kartice / 3, najmanje 90 px · let 280 ms + rezervni timer 320 ms · `touch-action: pan-y` na kartici I na licu/naličju.
**Dva nalaza samo iz PRAVOG dodira (CDP `Input.dispatchTouchEvent`; pješčanik ih ne vidi):** ① `touch-action` se čita od dodirnutog
elementa do PRVOG skrolera (CSS Pointer Events), a `.flashcard-front/back` SU skroleri (`overflow-y: auto`, BUG-013) → `pan-y` samo na
`.flashcard` nikad ne dođe na red, preglednik uzme vodoravni dodir za pomicanje i pošalje `pointercancel` na prvom pomaku; ② Chromium
poslije BRZOG vodoravnog zamaha (fling) potisne `click` sljedećeg dodira — gola stranica bez našeg JS-a: brz zamah → tap = ništa (i
3 s kasnije), spor zamah (30 ms/korak, drži 250 ms) → tap radi; `pointerdown`/`pointerup` stižu uvijek → okretanje na dodir ide na
`pointerup`, rep-klik se guta. `setPointerCapture` je bio prvi osumnjičeni i OBOREN (maknut: implicitni capture dodira dovoljan).
Brane: unit 78 tvrdnji (obrnuto 48 crvenih) · spec 7 testova × 4 iPhone profila s CDP-dodirom (protučinjenično: reset `pan-x pan-y`
samo na `.flashcard` = gesta radi, isti reset na licu/naličju = `pointercancel`, nema upisa). ⚠️ **Safari nije mjeren** — headless nema iOS-ov gesture-put (isti razlog kao F1/11); ne zna se potiskuje li
WebKit tap poslije zamaha, ali `pointerup`-put to čini nevažnim → presuda palcem = Leonov iPhone. Nije mijenjano: gumbi, tijek
`markKnown`/`markUnknown`, cloud-sync.
**📏 MJERENJE ZA TINDER-KADAR (2026-09-06 navečer; Leon s previewom F1/9: *„kartica treba biti veća… kao na Tinderu… velik posao,
prvo mjerenje i plan"*).** Sonda: Chromium, 4 iPhone profila kao u `playwright.config`, sigurna zona kao phone-gate (`--safe-*`),
uzorci teksta iz `data/json/**` bez `final`-kopija (= **2 773 kartice u 24 predmeta**; s kopijama bi bilo 5 737 — `final` je
`Object.assign(M1, M2)`). Mjerač je ispisao što je dotaknuo: 4 profila, 72 datoteke.

| profil | dostupno (dno kroma → vrh nav) | kartica danas | udio dostupnog | stranica skrola? | naličje traži pri 16 px: med / p95 / max |
|---|---|---|---|---|---|
| SE 375×667 | 411 px (y 159 → 570) | 335×200 | 49 % | da (1037 px) | 194 / 360 / 438 |
| 15 Pro 393×852 | 588 px (y 167 → 755) | 353×200 | 34 % | da (1045 px) | 194 / 340 / 398 |
| 15 Pro Max 430×932 | 668 px (y 167 → 835) | 390×200 | 30 % | da (1081 px) | 194 / 319 / 378 |
| landscape 852×393 | 337 px (y 56 → 393) | 447×280 | 83 % | da (1043 px) | 274 / 293 / 357 |

Fontovi na telefonu DANAS: pitanje **12,8 px** · odgovor **12 px** · objašnjenje **10,4 px** · gumbi 13,6 px (landscape 22,4 / 19,2 /
12). Oko kartice: h1 27 px · traka napretka 35 px · četiri gumba 50 px u dva reda (112 px) · stats 21 px + razmaci ≈ 16 px svaki.
Gradivo: pitanje med 48 · p90 71 · p95 79 · max 134 zn. (najduže pri 20 px = 104 px visine na 393) · odgovor med 184 · p95 392 · max
497 zn. (1 182 od 2 773 > 200 zn. — kartica-standard „< 200" vrijedi za pola kataloga) · naličje (odgovor + objašnjenje) med 225 · p95
474 · max 656 zn.; 2 332 kartice imaju objašnjenje.
**Izvedeni cilj (F1/12):** širina `vw − 32` · visina = dostupno − traka napretka (≈ 24) − red gumba (≈ 72 + 16) − razmaci → **≈ 287
(SE) · 464 (393) · 544 (430)** = 70–81 % dostupnog; h1 otpada (43 px s razmakom); stats → značke na gumbima. Pri 16 px naličje **stane
cijelo na 393 i 430** (max 398 < 464); na SE p95 (360 > 287) traži unutarnji skrol → fiksna visina + `overflow-y: auto` naličja je
odluka, ne rezerva. Referenca Tinder (opće poznato, NIJE mjereno): kartica ≈ 90 % širine · ≈ 65 % visine ekrana, gumbi 56–64 px
okrugli, radius 16–20 px. Sonde (gitignored, `.jank/probes/`): `kartica-mjera.js` (kadar) · `kartice-duljine.js` (gradivo) — brana
dolazi u F1/12 kao mjera phone-gatea, ne kao zasebna sonda.

**F. ZOOM NA DODIR** (Leon, 2026-09-05: *„Još jedan veliki bug. Kada se više puta takne na jedno mjesto
može se zoomat, to se mora riješit."*). **Dva uzroka — jedan izmjeren, drugi ovdje nemjerljiv:**
① **Polja za unos ispod 16 px** — iOS Safari pri fokusu polja s izračunatim `font-size < 16px` sam zumira
stranicu i ne vraća je. **Izmjereno 2026-09-05** (sonda u scratchu, Chromium 393×852, 9 ruta + prijavni
modal, 153 polja): na SVAKOJ ruti **11 polja ispod praga** — `.auth-modal__input` **15,2 px**
(`css/auth.css:138`, `0.95rem`; prijava, registracija, reset, upitnik = 10 polja) i `.cat-search-input`
**14,4 px** (`css/landing.css:394`, `0.9rem`). Ostala polja (dopune, vježbe) su ≥ 16 px; pilule uloge i
pristanak (13,3 px) su radio/checkbox i ne zumiraju.
② **Dvostruki dodir = zoom** (Safarijeva gesta nad stranicom). **Nemjerljivo u našim sondama:** 24 mjerenja
(WebKit i Chromium × 4 rute × 3 scenarija, dva i pet dodira u istu točku) — `visualViewport.scale` ostaje
**1** u svima, jer headless-motor tu gestu ne izvodi (radi je Safarijev UI-proces, ne web-sadržaj). Repo je
već gasi na dva mjesta: `.flashcard` (`flashcards-section.css:56`) i `.blank-map-canvas` (`blind-map.css:83`,
komentar *„iOS: prevent double-tap zoom"*) — `touch-action: manipulation`, koji **zadržava** skrol i
štipanje, a gasi samo dvostruki dodir (WebKit ga poštuje od iOS-a 13).
**Kandidati (odluka u cigli):** ① polja ≥ 16 px na dodirnim uređajima — jedno pravilo u resetu
(`@media (pointer: coarse)`) ili dva popravka na izvoru; **brana = deveta tvrdnja `phone-gate`-a** (nijedno
vidljivo tekstualno polje < 16 px na 393 px) — danas bi bila crvena, i to je dokaz da mjeri. ②
`touch-action: manipulation` u `* { }` resetu (`variables.css:75`, gdje već stoji
`-webkit-touch-callout: none` = ista politika) **i** u `legal.css:7` (stranice bez bundlea); ne pregazi
`touch-action: none` na ručkama za vučenje (klasa tuče `*`). **Odbačeno:** `user-scalable=no` /
`maximum-scale=1` — gasi štipanje (pristupačnost; meta danas namjerno kaže `user-scalable=yes,
maximum-scale=5.0`, a axe to i mjeri).
**Dokaz:** ① brana crveno → zeleno; ② statički test da bundle i `legal.css` nose pravilo; oboje **Leon na
iPhoneu** (dodir u polje ne zumira · dvostruki dodir ne zumira). **Mjesto: F1/10**, u istoj dodirnoj
seriji s F1/8 ① (jedan preview, jedna provjera telefonom).
**✅ ISPORUČENO 2026-09-05 (F1/10).** Odabrano: JEDNO pravilo u resetu, `@media (pointer: coarse)`, jer je
zatečeno da isto već „štiti" `@supports (-webkit-touch-callout: none) { … !important }` — a taj upit ne
zadovoljava nijedan motor naših brana (`CSS.supports` false u Chromiumu i Playwrightovom WebKitu), pa je
bio nemjerljiv; `(pointer: coarse)` je istina u oba (izmjereno). Brana ⑨ obrnuto: stari bundle 11 × 13 × 4
crveno → 0. Usput: `phone.authed.spec.js` mjerio je telefon bez `hasTouch` (miš) — popravljen. Dvostruki
dodir i dalje presuđuje Leon (BUG-043).
**➕ 2026-09-05 navečer, poslije deploya `c53c28c` — Leon obrće odbijanje:** *„Stranica uopće ne bi trebala imati mogućnost da se nešto povećava ili smanjuje na njoj ikako. Treba ostati na mjestu."*
→ **ADR-034**, cigla **F1/11** (RASPORED). „Odbačeno: gasi štipanje — pristupačnost" postaje odluka o
proizvodu: štipanje se gasi NAMJERNO. Teren za ciglu: 6 viewport-meta (`index`/`editor` danas
`user-scalable=yes, maximum-scale=5.0`; 4 pravne bez `viewport-fit`); iOS Safari od verzije 10 ignorira
`user-scalable=no` za štipanje → `touch-action: pan-x pan-y` / `gesturestart` mjeriti na uređaju; axe
`meta-viewport` (AA) traži imenovanu iznimku u `axe-gate.js`. Zapisano — pa **isporučeno iste
večeri (F1/11):** meta `minimum-scale=1.0, maximum-scale=1.0, user-scalable=no` na 6 stranica (pravne bez
`viewport-fit=cover` — `legal.css` nema safe-area razmaka, sprega je tvrdnja u testu) · reset `manipulation` →
`pan-x pan-y` u oba reseta (`manipulation` = pan + pinch-zoom, dakle iOS-sloj je bio jedan redak) ·
`ISKLJUCENO_ODLUKOM` u `axe-gate.js` (jedno imenovano isključenje s razlogom; pravilo se i dalje vrti i ispisuje;
obrnuto: bez njega landing pada, moderate/AA) · `touch-zoom.test.js` 35 tvrdnji (obrnuto kroz `git worktree`:
13 crvenih na starom stablu) · `a11y-gate.test.js` +5 · a11y-suita 7/7 · preflight EXIT 0.
**Otvoreno: štipanje na iPhoneu** (headless ne štipa) — ako `pan-x pan-y` ne drži, rezerva je `gesturestart` →
`preventDefault()`, a to traži skriptu na pravnim stranicama → F1/5 (`boot.js`) postaje preduvjet. Usput nađeno:
`axe-gate.js` `TEME` zakucan (`paper` mrtav, `carbon` nema) → F1/4 (✅ 06.09., `scripts/teme.js`; carbon prvi put skeniran, 0 nalaza).
⚠️ **Nalaz uz F1/4, ne popravljen:** odjavljeni `tests/a11y.spec.js` skenira SAMO zatečenu temu (`skeniraj`), sve-teme
obilazak (`skenirajSveTeme`) živi jedino u prijavljenoj suiti — landing/browse/study/lekcije se u `carbon`/`chalk`/`mint`
ne skeniraju axeom (kontrast im mjeri `check:contrast:live`, ali ne role/labele po temi — te su theme-neovisne). Cijena
prebacivanja: 7 ploha × 5 tema u odjavljenoj suiti (danas 34 s → ~2,5 min). Odluka kad zatreba, ne sad.
**Leon, 06.09. poslije F1/5 (gleda PRODUKCIJU, uz *„samo zapiši, nemoj ništa raditi"*):** ① *„frontend nije prilagođen,
teme ne odgovaraju, taj dio je uvijek bijela tema"* = pravne stranice na `c53c28c`, gdje F1/5 nije — nalaz potvrđuje ciglu,
ne otvara novu. ② *„glupo je imati Automatic · Carbon, ne kužim smisao"* — sufiks je F1/3 odluka iz `profile.js` („gumb bez
sadržaja"); na tamnom uređaju izgleda kao duplikat Carbona → RASPORED §6/7, F2/1. ③ **Sadržaj:** FAQ promijeniti · About
us srediti · **glavni kontakt `sokrat@sokratstudy.com`** (Gmail danas na 8 mjesta; Porkbun fwd provjeriti prije zamjene) →
RASPORED F3/1 dopuna, PRIJE prijevoda. Ništa od toga nije rađeno.
**Leon na iPhoneu (05.09. kasno navečer):** dodir u polje i dvostruki dodir **potvrđeno ugašeni** (*„više ne, sređeno je,
good job"*), **štipanje s dva prsta i dalje zumira** → `touch-action: pan-x pan-y` Safari za štipanje NE drži (na uređaju;
headless to ne može reći) → **F1/11 ② `js/no-zoom.js`**: `gesturestart`/`gesturechange` + `touchmove` sa `scale !== 1`,
`preventDefault()` uz `passive: false`, samo gdje `GestureEvent` postoji; vlastita datoteka na 6 stranica (pravne nemaju
`boot.js`, pa F1/5 nije preduvjet). Brana `touch-zoom.test.js` ③. Presuda opet iPhone.

---

### 🟡 U TIJEKU (2026-09-04) — ~~FOUC~~ ✅ · ~~brands-font~~ ✅ · ~~UCITAVANJE PO RUTI~~ ✅ · tema = izgled maila

**1. FOUC ✅ ZATVORENO 2026-09-04** (commit `891a1ce`; **na produkciji od 2026-09-05**, `8b70c15`).
**Dijagnoza gore je bila KRIVA i zato stoji ispravak:** nije problem bio "theme.js je na dnu"
nego **zakucana tema u markupu**. `index.html` ima `<html data-theme="academic">` i komentar
koji tvrdi da je time bljesak rijesen — bio je, ali SAMO za zadanu temu. `chalk` i `mint` su
TAMNE, pa im je prvi kadar bio zajamceno svijetao.
**Izmjereno** (`scripts/fouc-probe.js`, nova sonda, produkcija/mobitel): FCP 608 ms → tema
727 ms = **119 ms krive teme**, na Slow-4G **232 ms**; snimka kadrova: bijelo → svijetla
academic stranica → tamna tema. **Poslije popravka: 0 ms.**
**Zahvat:** popis tema + primjena sele u `js/boot.js` (jedina sinkrona skripta); popis zivi
SAMO ondje, `theme.js` ga cita s window-a. Brane: `tests/unit/theme-boot-order.test.js`
(preflight) + `tests/theme-fouc.spec.js` (obrnuta provjera: na starom kodu pada).
**Ostatak, ne blokira:** `contact/faq/privacy/terms.html` nemaju `data-theme` ni `theme.js`
— korisnik na tamnoj temi ondje dobije svijetlu stranicu. Nije bljesak nego **nedostatak
teme**; ide uz ciglu "tema = izgled maila". ✅ **Isporučeno F1/5 (2026-09-06).**

**3. BRZINA — PRAVA DIJAGNOZA (2026-09-04), stara je bila kriva.**
Mjera je sada PONOVLJIVA: `scripts/perf-probe.js` (Chromium koji vec imamo + CDP; hladan
cache, Lighthouseov mobilni profil 4× CPU / Slow-4G). PSI API bez kljuca vraca 429, a
Lighthouse bi bio nova ovisnost (pravilo #9) — zato vlastita sonda.

**Polazno stanje produkcije (mobitel, hladan cache):** FCP/LCP **2856 ms** · TBT **613 ms** ·
**694 KB / 50 zahtjeva** (js 334 · font 253 · css 62).

⚠️ **BAJTOVI NISU GLAVNI KRIVAC — izmjereno protucinjenicnim pokusom** (`--bez=`, blokira
resurs na ISTOJ produkciji):

| pokus | FCP | zahtjeva |
|---|---|---|
| produkcija danas | 2856 ms | 50 |
| bez Font Awesomea + KaTeXa + Supabasea (−390 KB!) | 2536 ms | 43 |
| **bez NASIH ~35 skripti** (CDN-ovi ostaju) | **1588 ms** | 11 |
| bez icega osim CSS-a (gornja granica) | 1492 ms | 6 |

**Uzrok:** `styles.bundle.css` (37 KB, jedini render-blokirajuci resurs) **krece na 293 ms a
stize tek na 2244 ms** — 1951 ms za 37 KB. Nije spor, nego **izgladnjen**: 46 zahtjeva dijeli
istu vezu, pa jedini file koji drzi prvi kadar dobiva mrvicu propusnosti.
**`defer` NE POMAZE — provjereno pokusom** (`--defer` uz posteni `--kontrola`, jer samo
presretanje dokumenta kosta): 2928–3284 ms vs kontrola 2720–2796 ms. Preglednik deferirane
skripte i dalje skida odmah; snizen prioritet ne vraca propusnost.
⇒ **Jedini pravi lijek: NE TRAZITI ono sto prvi kadar ne treba.** Ucitavanje po ruti.
**Vrijedi ~1270 ms FCP-a** (2856 → ~1588), tj. ~44 % brzi prvi kadar.

**✅ Ucinjeno:** brands-font (106 KB, za DVIJE ikone od kojih se jedna ne crta) zamijenjen
ugradjenim SVG-om — commit `6db1c2f`, brana `tests/unit/no-brand-font.test.js`.

**✅ UCITAVANJE PO RUTI — ISPORUCENO 2026-09-04** (**na produkciji od 2026-09-05**,
`8b70c15`). Radjeno u dva koraka, s mjerom nakon svakog, kako je Leon i trazio.

**Sto je bilo:** naslovnica je vukla `flashcards` `quiz` `fill-blanks` `learn` `progress`
`blind-map` `exercises*` `blocks-renderer` `math` `my-materials` `profile` `node-images`
`cloud-sync` `admin-reveal` `offline-store` — nista od toga ne treba za prvi kadar. Uz njih
i KaTeX JS (61,8 KB) i DOMPurify.

**Sto je sada:** `js/loader.js` — imenovani paketi koji stizu na SVOJ dogadjaj:
`study` (7 skripti + KaTeX/DOMPurify) na otvorenu lekciju · `blind-map` i `exercises` na klik
tog taba · `polica` na popis lekcija · `materials` i `profile` na svoje stranice · `sync` na
PRIJAVU (ne na profil — tko svoj profil ne otvori, i dalje mu se napredak sinkronizira).

| | prije | poslije |
|---|---|---|
| skripti u prvom kadru | **41** | **22** |
| preneseno (gzip, `check:budget`) | **234 KiB** | **112,7 KiB** |
| FCP (localhost, hladan cache, mobilni profil) | **5820 ms** | **4220–4236 ms** |
| zahtjeva | 49 | 29 |

⚠️ **Lokalne brojke NISU produkcijske** — lokalni posluzitelj ne stisce i ne multipleksira, pa
su apsolutni iznosi visi. Vrijedi USPOREDBA (isti posluzitelj prije i poslije): **−27 %**.
Produkcijska mjera se moze uzeti tek s preview-deploya.

**Tri zatecena kvara koje je selidba proizvela — i nasla:**
1. `.then(initBlindMap)` je ime razrijesio ODMAH, prije nego je skripta stigla → ReferenceError.
   (Uhvatio dim-test.) Sada `.then(function () { initBlindMap(); })`.
2. `progress.js` je citao `blindMapState` iz DRUGOG paketa → svaka lekcija geografije je bacala
   gresku prije nego bi itko dotaknuo kartu. (Uhvatio dim-test; brana ispod ga sada vidi staticki.)
3. `admin-reveal.js` i `profile.js` vezali su se na `DOMContentLoaded` — dogadjaj koji je za
   lijeno ucitanu skriptu VEC PROSAO, pa se slusac ne bi okinuo nikad.

**Cetiri brane (sve u preflightu):**
- `tests/unit/loader-packages.test.js` — 12 tvrdnji: datoteka postoji · nije u dva svijeta ·
  ime paketa koje kod trazi postoji · mrtav paket pada · loader nema zakucan `?v=` (bump ga u
  `js/**` ne doseze!) · **nijedna nova gola referenca preko granice paketa** (osnovica ih
  imenuje i cisti se sama).
- `check:cdn` **provjera #5**: CDN-URL u `js/**` koji nije na popisu `DYNAMIC` → pad. Bez nje bi
  odlazak KaTeXa iz taga znacio da ga brana vise ne vidi, a i dalje javlja zeleno.
- `check:budget` sada mjeri **oba** puta: budzet sudi prvom kadru, paketi se ispisuju i zbrajaju
  — inace bi se brana oborila seljenjem tereta u lijeni put, bez ijednog obrisanog retka.
- `check:contrast:live` i `blocks-diff` prilagodjeni: fiksno cekanje vise nije dovoljno kad
  gradivo stize iza paketa.

**Usput popravljeno (regresija koju bi selidba inace unijela):** skinut predmet u zrakoplovnom
nacinu. Dok su sve skripte bile u markupu, prvi posjet ih je provukao kroz Service Worker; sada
predmet skidas s POPISA LEKCIJA, korak PRIJE nego ijedan nacin ucenja stigne. `SokratLoad.zagrij()`
+ poziv iz `offline-store.download()` to zatvara — **namjerno mimo `plan()`/`urls`**, jer te
adrese brise `remove(predmet)`, a skripte aplikacije su zajednicke.

**Doseljeno u `js/utils.js`:** `inkForTint` + `TINT_INK_CROSSOVER` i `safeIcon`. Razlog je
mjerljiv: landing je zbog JEDNE ciste funkcije vukao cijeli `blocks-renderer.js`, a `profile.js`
bi bez `safeIcon` tiho pretvorio sve ikone predmeta u knjigu. `utils.js` je jedina datoteka koju
ucitavaju i `index.html` i `editor.html`. `SokratBlocks.*` ostaju kao precaci (isti kod).

**Ostaje otvoreno (ne blokira):** `assets/logo.svg` je **45 KB na disku** za znak od 32 px, a
`check:budget` mjeri SAMO skripte — 253 KB fontova nije ni vidio.

### 🖤 CRNA TEMA — MAIL IMA DVIJE PALETE, A MJERIO SAM SAMO JEDNU (Leon, 2026-09-04)

**Leon:** *„Izgled frontenda u modu sa emailom mora imati crnu pozadinu isto kao i email template.
Slično onome šta smo prije imali."*

⚠️ **MOJ RANIJI NALAZ JE BIO POLOVIČAN, i to je uzrok ove stavke.** Zapisao sam da mail vozi plohu
`#ffffff` / `#f4f5f7` — to je točno, ali **samo za svijetlu polovicu**. Predlošci u
`supabase/email-templates/` imaju **`@media (prefers-color-scheme: dark)` blok**, dakle mail se
**mijenja s uređajem**. Leonov telefon je u tamnom → njemu je mail oduvijek crn.
*Mjerio sam jednu granu medija-upita i nazvao ju „izgledom maila".*

**Tamna polovica maila, doslovno iz predložaka:**

| uloga | heks | kontrast |
|---|---|---|
| pozadina (`.s-bg`) | `#0f1115` | — |
| kartica (`.s-card`) | `#171a21` | — |
| crta (`.s-hr`) | `#262b36` | 1.23 na kartici |
| tekst (`.s-text`) | `#e6e8ee` | **14.21** |
| prigušeno (`.s-muted`) | `#9aa1b1` | **6.72** |
| akcent | `#6366f1` | **3.90** na kartici |

🟢 **ODLUKA (Leon, 2026-09-04): stranica PRATI UREĐAJ, točno kao predložak.**
Uređaj u tamnom → crna tema; uređaj u svijetlom → današnja `academic`. **Redoslijed prvenstva se
zapisuje JEDNOM, jer se inače svaki put izvodi iznova:**

> **račun (F2/1)  >  lokalni izbor u profilu  >  uređaj (`prefers-color-scheme`)  >  `academic`**

🚨 **ZAMKA, IZMJERENA — LJESTVICA INDIGA SE NA TAMNOM OBRĆE.** Ista greška kao u F1/1, samo
zrcalno: ondje je tekst tražio **tamniji** indigo, ovdje traži **svjetliji**.

| indigo | na `#171a21` | presuda |
|---|---|---|
| `#4f46e5` (današnji nosivi) | **2.77** | pada i za plohu |
| `#6366f1` (gumb u mailu) | **3.90** | ploha DA, tekst NE |
| `#818cf8` | **5.84** | ✅ tekst |
| `#a5b4fc` | **8.73** | ✅ tekst |

⇒ na crnoj temi: **tekst i poveznice `#818cf8`**, plohe/gumbi svjetlija stepenica.
⚠️ **I tinta NA ispuni se obrće:** bijelo na `#818cf8` je **2.98** (pada), a `#0f1115` na njemu
**6.33** — dakle `--color-on-brand` je na toj temi **taman**, kao u `chalk`. To je ADR-032 obrazac
(ispuna ostaje puna, prilagođava se TINTA), ne iznimka.

🔎 **NALAZ O SAMOM MAILU (ne popravlja se u ovoj ciglu):** gumb u predlošku je `#6366f1` s
**bijelim** tekstom → **4.47**, dakle i mail promašuje 4.5 za 0.03 — u obje polovice. Popravak je
jedan heks po polovici (`#4f46e5` svijetla / `#818cf8` tamna), ali predlošci su **kopija u
dashboardu**, pa se mijenjaju na dva mjesta. Zasebna, sitna cigla.

✅ **RUPA ZATVORENA — F1/4, 2026-09-06:** `scripts/teme.js` je jedini čitatelj popisa tema (4 brane kroz njega, `tests/unit/theme-list.test.js` čuva). Bila je: `scripts/check-contrast-live.js:39` ima
**zakucan popis tema** (`['academic','chalk','mint']`). Doda li se tema samo u `tokens.css` i
`boot.js`, živa brana ju **neće ni pogledati** i ostat će zelena — tiho. `check:contrast` (staticki)
čita tokene pa ju vidi sam; `tests/unit/theme-boot-order.test.js` čuva da se popisi u `boot.js` i
`tokens.css` ne raziđu. **Zakucani popis je jedini koji nitko ne čuva.**

**Povijest koja se ne prešućuje:** zadana tema je 2026-08-13 postala svijetla jer su *„dvije tamne
palete zaredom pale na živom ekranu"*. Ova odluka to **ne poništava** — tamna se daje onome tko je
uređajem već tražio, ne svakom posjetitelju. Tko dođe s Googlea na svijetlom telefonu vidi isto što i danas.

**Plan izvedbe: [RASPORED.md](../archive/RASPORED.md) §F1.**

> ### ✅ F1/2 ISPORUČENA 2026-09-04 — tema `carbon` (hr „Ugljen")
> Blok `:root[data-theme="carbon"]` s doslovnim heksovima predloška; ono što mail ne definira
> uzeto iz `mint` (dokazana tamna paleta na gotovo istoj podlozi). Indigo obrnut kako je gore
> izmjereno: 500 `#818cf8` · 400 `#a5b4fc` · `--color-on-brand: #0f1115`.
> **Brane:** `check:contrast` **5 tema · 358 provjera** ✅ · `check:contrast:live` **0 ispod praga
> na 13 ruta × 4 teme** ✅ · `theme-boot-order` (boot == tokens) ✅ · `check:i18n` bez novog ✅ ·
> `preflight` EXIT 0.
>
> 🔎 **NALAZ ŽIVE BRANE koji statička nije mogla vidjeti — `brand-600` se koristi kao ispuna U
> MIROVANJU.** Prvi prolaz je pao na 3 elementa (`.filter-btn` aktivan, `.check-btn`, jedan
> `<span>` u gradivu): `#0f1115` na `#6366f1` = **4.23**. Ugovor tokena kaže „600 = pritisak
> (tamnije)", ali `grep brand-600` nalazi **~8 mjesta** gdje je 600 ispuna u mirovanju
> (`learn.css` ×3, `fill-blanks-section.css`, `pages.css`, `components.css`, `sokrat-confirm.css`)
> plus gradijenti `500→600` na još 6. U tri starije teme to nikad nije bolilo jer im je 600 uvijek
> bio visokokontrastan; **carbon je prva tema sa srednje-svijetlim 600** i razotkrila ga je.
> **Popravak u cigli:** samo carbonov 600 → `#7075f4` (tamni tekst 4.98, još jasno tamniji od 500).
> **Ne popravljeno (F4):** zloporaba 600 kao ispune u CSS-u — dira sve teme i `css:diff`.
>
> ⚠️ **Gotcha koja je koštala jedan krug:** `check:contrast:live` **ne diže vlastiti poslužitelj**
> (traži `serve:test` na :5050, redak 32). Jutros je prošla jer je na portu visio stari
> poslužitelj iz prethodne sesije; `ERR_CONNECTION_REFUSED` = nema poslužitelja, ne kvar brane.
> ⚠️ **2026-09-16 (F3/1): isti razred je Playwright tiho mjerio TUĐE radno stablo** (13/13 i 24/24 lažno) →
> `tests/global-setup.js` + `X-Sokrat-Root` ga sad odbija. **Skripte izvan Playwrighta (`check:contrast:live`,
> `*-probe`) tu branu NEMAJU** — ondje i dalje vrijedi: provjeri čije datoteke poslužitelj daje.

> ### ✅ F1/3 ISPORUČENA 2026-09-05 — prvi kadar prati uređaj
> `boot.js` bez spremljenog izbora čita `prefers-color-scheme` prije prvog crtanja (tamno →
> `carbon`); birač „Automatski · ‹što uređaj bira›"; `theme.js` prati promjenu uređaja uživo.
> **Brane:** `theme-device.test.js` (NOV, sandbox, 28) ✅ · `theme-fouc.spec.js` 6/6 ✅ ·
> `fouc-probe` `uredjaj-tamni` **0 ms bljeska** (oba profila) ✅ · `preflight` EXIT 0.
>
> 🔎 **NALAZ IZVAN SPECA — produkcija svakom posjetitelju upisuje `academic` bez da je birao.**
> `initTheme()` je na SVAKOM učitavanju radio `setItem('sokrat-theme', primijenjena)` — do danas
> bez posljedice, a s praćenjem uređaja bi crno dobio **nitko** tko je stranicu već otvorio.
> **Migracija:** izbor od F1/3 nosi biljeg `sokrat-theme-chosen`; `academic` bez biljega = stari
> automatski upis (odbačen, počišćen na DOMContentLoaded); `chalk`/`mint` bez biljega = sigurno
> izbor (stari kod je tamnu upisao samo tko ju je birao) → ostaje. `initTheme()` sad samo briše;
> oblik čuva `theme-boot-order` (bez `setItem` u tijelu), ponašanje `theme-device`.
>
> ⚠️ **Što F1/3 nije zacrnio:** `<meta name="theme-color">` je statična `#f7f9fc` — na tamnom
> telefonu traka preglednika ostaje svijetla iznad crne stranice. Bilo u F4 i prije; sad je
> vidljivije. Popravak bez druge kopije boje: `boot.js` iza primjene teme pročita
> `--color-surface-0` iz izračunatog stila i upiše u `meta.content` (RASPORED §F1).

---

**2. Tema stranice = izgled maila** ✅ **ISPORUČENO 2026-09-04 (cigla F1/1)** — `brand-400 #6366f1` (plohe/hover/fokus, prag 3.0) · `brand-500 #4f46e5` (tekst i gumbi, 6.29) · `brand-600 #4338ca`; uz njih i `--theme-swatch-academic-acc`. Dira SAMO `academic`.
**Izmjereno pri zamjeni** (obje strane, ne samo nova): 400 se **popravlja** 3.72 → 4.47 · 500 ostaje 6.35 → 6.29 · 600 pada 9.50 → 7.90, sve iznad svog praga. `check:contrast` 292/292 · `check:contrast:live` **0 elemenata ispod praga** na 13 ruta × 3 teme · `check:palette` 0 · `check:tokens` bez novog. `og-cover.png` pregraden (poveznice u boji marke).

> 🔎 **NALAZ KOJI JE CIGLA USPUT NAŠLA — hover na `.door--primary` je ispod praga, i BIO JE i prije.**
> Taj gumb prigušuje tekst `color-mix`-om (88 % / 90 % bijele), a **postotci su izmjereni protiv
> boje koja se u međuvremenu promijenila**. U mirovanju je sve dobro (5.25–6.29), ali na **hover**
> pozadina prelazi na `brand-400`, pa tekst pada: `door-d` **3.25 → 3.84**, `door-m` 3.32 → 3.94,
> `door-t` 3.72 → 4.47. **Cigla F1/1 to POPRAVLJA za pola boda, ali ne zatvara** — zato stoji ovdje.
> ⚠️ **Nijedna brana ovo ne vidi:** `check:contrast` čita tokene (ne zna za `:hover`), a
> `check:contrast:live` crta stranicu **u mirovanju**. Popravak je jedan od dvoje — ili hover ide na
> `brand-600` (tamnije, 7.90) umjesto na 400, ili se postotci prigušenja dižu. **Prvo odluka o
> izgledu** („svjetlije na hover“ je danas zapisano pravilo palete), pa tek onda kod. Mjesto: F4.

<details><summary>Izvorni zapis — mjere koje su ciglu smjestile</summary>

**2. Tema stranice = izgled maila** (Leon: *„frontend theme da ima isti kao i sta mejl salje"*).
**IZMJERENO 2026-09-04 — nalaz je bolji nego sto je izgledalo.**

⚠️ **Mail koristi TOCNO indigo iz znaka: `#6366f1` je isti heks koji stoji u
`assets/logo.svg`.** Dakle mailu nismo radili poseban izgled — mail je u boji marke, a
**stranica je ta koja odudara**: zadana tema `academic` vozi `#1657d0`. Poravnanje sa mailom
je istovremeno poravnanje s vlastitim znakom (pravilo „znak zadrzava indigo kroz sve teme").

| | mail | `academic` danas |
|---|---|---|
| akcent | `#6366f1` | `#1657d0` |
| ploha / pozadina | `#ffffff` / `#f4f5f7` | `#ffffff` / `#f7f9fc` |
| tinta 1 / 2 / 3 | `#111827` / `#374151` / `#6b7280` | `#0e1a2b` / `#34455c` / `#5b6879` |
| crta | `#e5e7eb` | `#dde4ee` |

Plohe i tinte su prakticki iste — razlikuje ih samo **plavi podton** nasih sivih. Pravi posao
je **jedna zamjena akcenta**, ne prekrajanje teme.

🪤 **ZAMKA KOJU CE BRANA NACI (izmjereno, ne pretpostavljeno):**

| par | kontrast | presuda |
|---|---|---|
| `#6366f1` na bijelom | **4.47** | ❌ tekst treba 4.5 — fali 0.03 |
| bijelo na `#6366f1` | **4.47** | ❌ isto |
| `#4f46e5` na bijelom | **6.29** | ✅ |
| `#1657d0` danas | 6.35 | ✅ |

⇒ **Indigo `#6366f1` ide na PLOHE i gumbe** (ondje je prag 3.0), **a za TEKST i poveznice ide
nijansu tamniji `#4f46e5`** — okom se ne razlikuje, a `check:contrast` (358 provjera) prolazi.
Isti razred greske je vec jednom oboren na amberu 4.41 (learn-sekcije, spec §15.1).

**Doseg:** dira SAMO temu `academic`; `chalk`/`mint` zadrzavaju svoje akcente.
**Uz istu ciglu ide i:** `contact.html` · `faq.html` · `privacy.html` · `terms.html` **nemaju
temu uopce** (nema `data-theme` ni `theme.js`, voze `tokens.static.css`) → korisnik na tamnoj
temi ondje dobije svijetlu stranicu. Nije bljesak nego **nedostatak teme**.
**Brane koje ce presuditi:** `check:contrast` · `check:contrast:live` (crta stvarni ekran) ·
`check:palette` (zakucane ispune) · `check:tokens`. Poslije izmjene: `build:css` → `bump`.

</details>

### ✅ R1-UX NALAZI (Leon uzivo, 2026-09-02) — SVE ZATVORENO (U1+U2+U5 deployani · U3+U4 Leon konzole)

**Stanje 2026-09-02 kasnije isti dan:** U2 (brisanje povijesti — wipeAll kroz CloudSync,
bez odjave, authed spec) i U1 (Nova sekcija na dnu panea) popravljeni i NA PRODUKCIJI s
cijelim R1 paketom. **U5 (novi nalaz):** Googleov ekran pisao supabase-domenu + mail o
dijeljenju podataka s njom → rijeseno BESPLATNO (implicit id_token s nase stranice,
signInWithIdToken; ne custom domena za 10 USD/mj) — NA PRODUKCIJI 2026-09-02 (`2de0456`).
**U3+U4 zatvorio Leon 2026-09-02** („rijeseno sve"): Site URL + redirect allow-lista u
Supabaseu; Resend domena verificirana (DNS zapisi u **PORKBUN** — nameserveri su Porkbunovi,
NE Vercelovi!) + SMTP u Supabaseu → posiljatelj sokrat@sokratstudy.com. DNS potvrdjen izvana
(DKIM/DMARC/send/rsend na autoritativnom serveru). Time je i temelj za R3 postavljen.

Leon testirao R1 krug i nasao cetiri problema (redoslijed = prioritet razrade):

1. **U2 — „Obrisi povijest" NE brise (najveci):** gumb obrise cloud-retke pa te ODJAVI, ali
   lokalni podaci ostaju → sljedeca prijava ih pull+merge UNIJOM vrati u cloud. Sve se vrati.
   Uzrok NIJE bug u brisanju nego DIZAJN: „obrisi cloud, uredjaj ostaje" je samoporazan uz
   union-merge sync (profile.js deleteCloudData + cloud-sync.js merge). Fix: brisati cloud
   I lokalno I sync-snapshot, BEZ odjave; iskren tekst potvrde. Gotovo kad: nakon brisanja
   i ponovne prijave povijest je prazna.
2. **U1 — STUDIO: korisnik zarobljen u jednoj sekciji (Learn):** Leon nije mogao dodavati
   blokove/sekcije — sve radi u istom. „+ Nova sekcija" postoji SAMO u st-metas retku
   (studio.js F3 K3 „jedina afordancija") koji ocito nije vidljiv/nadjen; treba repro
   authed (staging) pa afordancija i NA DNU canvasa. Gotovo kad: novi korisnik bez upute
   doda 2. sekciju i 3. blok.
3. **U3 — mail potvrde vodi na nepostojecu stranicu:** vjerojatno Site URL / redirect
   allow-lista u Supabase Auth (registracija s localhosta salje localhost redirect;
   klik kad server ne vrti = mrtva stranica). Fix = URL Configuration (Site URL
   https://www.sokratstudy.com + allow-lista) + prod-verifikacija punog kruga.
4. **U4 — posiljatelj mora biti sokrat@sokratstudy.com (Leon: „pod hitno"):** Supabase
   salje s default adrese. Fix = custom SMTP (npr. Resend free) + DNS verifikacija domene
   (SPF/DKIM u Vercel DNS-u) + Supabase Auth → Emails → SMTP. Ovo je ujedno TEMELJ za R3
   (mail-obavijesti idu kroz isti SMTP/domenu) — posao se NE radi dvaput.

Google OAuth: ✅ radi (Leon potvrdio). „Crni ekran" u Chromeu = neponovljen, drzati na oku.

### 🔐 RAČUN blok — Leonove želje 2026-09-01 (poslije deploya redizajna; seoba otkazana pa ništa ne čeka rujan)

Leon (2026-09-01): Google prijava · Facebook prijava · *„povećanje cijelog profila"* (profilna
slika, uređivanje profila i izgleda) · slanje mejlova korisnicima · *„pri registraciji korisnik
dobije neki upitnik da znamo tko je"* · FMTU-korisnici dobivaju obavijesti o novim predmetima.

**Dogovoreni redoslijed (razgovor 2026-09-01):**
1. **A0 + upitnik + Google (A1)** — jedan prepravak `#authModal` nosi SVE TROJE (dijalog je
   građen za jedan put; upitnik = i temelj segmentacije i mail-pristanka). Redirect URI na
   postojećem projektu (seoba otkazana).
2. **Profil**: avatar (bucket po obrascu `node-images` — vlasnički prefiks + RLS), bio,
   uređivanje; `display_name` već postoji. Podloga je svježa (C6/4).
3. **Mail-obavijesti**: vanjski provider + Edge Function (ADR-016: ključ NIKAD u klijent) +
   izričit pristanak iz upitnika; segment „FMTU" → obavijest o novom predmetu.
- **Facebook**: uvjetno — isti Supabase posao kao Google, ali traži Metin app-review; radi se
  tek ako ga stvarni korisnici zatraže (Google im je zadani).
⚠️ Napomena uz zapisanu odluku „OAuth: NE zasad" (2026-08-30, razlog: nula vanjskih
korisnika): Leon ju je 2026-09-01 OVIM željama otvorio — okidač ostaje deploy + prvi korisnici.

### 📡 CDN OFFLINE — KaTeX i supabase-js ostaju izvan Service Workera (nalaz uz BUG-045, 2026-09-06)

`sw.js` presreće samo same-origin GET, pa KaTeX (formule) i supabase-js (prijava, DB read-path) offline ovise o
HTTP-kešu preglednika — istom koji iOS izbacuje i zbog kojeg je BUG-045 postojao. Posljedica danas: skinut
predmet se offline OTVORI (paket načina učenja je od BUG-045 u SW-kešu), kartice/kviz/dopune rade, ali
**formule u kvantitativnim predmetima ostaju sirov tekst** dok KaTeX nije u HTTP-kešu; prijava offline ionako
nema smisla. Popravak nije trivijalan: CDN odgovori su `cors` (SRI + `crossorigin`), pa ih SW smije spremiti
samo ako ih dohvaća s istim `mode: 'cors'` i ako se `check:cdn` politika (verzioniran URL + SRI) prenese u
SW; alternativa je vendorati KaTeX (CLAUDE.md dopušta vendorane biblioteke) — tada postaje same-origin i
polica ga skine kao i sve ostalo. **Odluka čeka Leona** (F5 vježbe/recepti ionako dira KaTeX). Ne blokira.

### 🔍 Sidebar predmeta je NEDOSTIŽAN — `openSidebar()` nitko ne zove (C6/2, 2026-09-01)

Panel `#subjectsSidebar` se renderira (17 predmeta, i18n ga re-renderira), ima close-gumb,
overlay i escape — ali nijedan gumb/ruta/`data-action` ga ne otvara; `window.openSidebar`
nema nijednog pozivatelja. Vjerojatno zaostatak otkad browse drill-down (K1) bira predmete.
**Produktna odluka:** obrisati (markup + `sidebar.css` + `renderSubjectsSidebar`) ili vratiti
kao brzi izbornik. CSS mu je od C6/2 konsolidiran u `sidebar.css` pa je rez cist u oba smjera.

## ✅ RIJEŠENO 2026-08-30 — semantičke ispune: **ODLUKA JE ① (tokeni), i preporuka je ODBIJENA**

**Leon:** *„ne smije biti obruba uopće, uvijek mora biti potpuna ispuna. boja mora biti prilagođena
na način da ne ruši tekst. tako isto za kartice."* → **[ADR-032](DECISIONS.md#adr-032)**.

⚠️ **Ovaj je zapis preporučivao ② (ukinuti pune semantičke ispune) i Leon je odabrao suprotno.**
Zapis se zato **ne briše** — preporuka je bila utemeljena (pola posla već izvedeno tako, bliže Apple
smjeru), ali je gledala **cijenu popravka**, a ne **što ekran mora reći**. „Točno/netočno" je
najvažniji signal u alatu za učenje i mora se vidjeti prije nego se pročita; vlas-crta to ne nosi.

**Što se ispostavilo jeftinije nego što je ovaj zapis mislio:** mjera po **sve četiri** teme (ne
samo `chalk`) pokazuje da **svaka ispuna već ima tintu koja prolazi AA** — samo u `chalk` i `mint`
to nije bijela nego tamna (`#14161a`): `chalk` 8.48/5.81, `mint` 9.00/5.87, dok bijelo ondje daje
2.01–3.12. U `academic`/`paper` bijelo prolazi (5.30–6.15). ⇒ **Nijedna boja ispune se ne mijenja**,
dodaju se samo `--color-on-ok` / `--color-on-danger` po temi — isti raspored koji `--color-on-brand`
već ima, što je neovisna potvrda obrasca. Za **kartice** (boja dolazi izvana) vrijedi `inkForTint()`,
već izveden u C5a/4.

**Izvedba ide po ciglama koje te datoteke ionako diraju** (C5b nosi `blind-map`, C6 nosi `profile`
i `sidebar`) — pravila palete su čegrtaljka, ne jednokratni zahvat. Tablica sedmorke ostaje niže
kao popis posla, ne kao popis blokada.

<details><summary>Izvorni zapis (2026-08-29/30) — zadržan jer objašnjava zašto se čekalo</summary>

Isti razred kvara koji je C4a zatvorio na **ispuni marke** postoji i na **semantičkim** ispunama,
ali se ondje **ne da popraviti mehanički** — jer token za boju teksta na njima **ne postoji**.

Izmjereno na temi `chalk` (bijelo naspram ispune, prag za tekst je **4.5**):

| pravilo | ispuna | bijelo daje |
|---|---|---|
| `.answer-btn.correct` (`quiz-section.css`) | `--success` `#8fbf6b` | **2.14** ⛔ |
| `.answer-btn.wrong` (`quiz-section.css`) | `--danger` `#e3705c` | **3.12** ⛔ |
| `.action-btn.tertiary` (`home-section.css`) | `--secondary` `#6da34d` | **3.00** ⛔ |

U ostale tri teme sve prolazi (5.30–8.10) — problem je **samo na `chalk`**, jer su ondje semantičke
boje svijetle.

**Zašto ovo nije popravljeno odmah:** marka već ima `--on-primary` (`--color-on-brand`), koji je
**bijel u tri teme i taman u `chalk`** — dakle obrazac je mehanički. Ali dodati `--on-success` i
`--on-danger` znači **proširiti sustav tokena kroz sve četiri teme**, a paleta je Leonova odluka
(dvije tamne palete su već jednom pale na živom ekranu). **Ne dira se bez njegove riječi.**

✅ **RIJEŠENO 2026-09-01 — birač POSTOJI** (Leonova riječ, isti dan: „U profilu"): kartica
„Izgled" na `#profile-page` (crta se i neprijavljenom — ⚠️ **„tema je stvar uređaja" je
PRESUĐENO SUPROTNO 2026-09-04**: Leon je odlučio da tema prati RAČUN, v. §LEONOVI NALAZI gore;
lokalni zapis ostaje samo zato što odluka mora pasti prije prvog crtanja), teme s
pregled-krugovima (`--theme-swatch-*` u `tokens.css`).
⚠️ **Ispravljeno 2026-09-04:** tema je tada imala 4 palete i mehanizam u `js/theme.js`; danas
su opet **4** (`paper` maknut isti tjedan, `carbon` dodan u F1/2), a popis i primjena zive u
**`js/boot.js`** (odluka mora pasti prije prvog crtanja — v. cigla FOUC gore). `theme.js` nosi klik,
normalizaciju i — od F2/1 (2026-09-14) — vezu s računom (`user_metadata.theme`).
**Zapisana obaveza ispunjena isti dan:** zabrana #1 u `check:palette` proširena na JAKE
semantičke ispune (`--color-ok/-strong`, `--color-danger`, `--color-warn`) — pronađeno 0
prekršaja (ADR-032 je teren već očistio); -soft varijante namjerno izvan.

> ### ⚠️ PITANJE JE PRECIZIRANO 2026-08-30 — i još uvijek čeka Leona
> Objašnjeno mu je i **nije odgovorio**. Pravo pitanje nije „koje tokene dodati" nego:
> **smiju li zelena i crvena uopće biti ISPUNA, ili žive samo kao OBRUB i BOJA TEKSTA?**
>
> - **① Dodati tokene** → pune semantičke plohe ostaju moguće, tekst na njima se okreće s temom.
> - **② Zabraniti pune semantičke plohe** → značenje nose obrub i tekst. **Tada tokeni ne trebaju
>   i stavka nestaje.** To je već napravljeno za `.control-btn.wrong/.correct` u C2 i bliže je
>   Apple smjeru (§7.6) — vlas-crta umjesto ispune.
>
> Preporuka je **②**, jer je pola posla već tako izvedeno. Odluka ostaje Leonova.
>
> #### 🔥 IZMJERENO 2026-08-30 (C5a/4): ta jedna odluka gasi **7 od 11** fatalnih pravila
> `palette:breakdown -- --list` nabraja 11 fatalnih pravila. Sedam ih ima **isti uzrok** —
> `white`/`#fff` na ispuni `var(--danger)` ili `var(--success)`:
>
> | # | datoteka | selektor | ispuna | cigla koja ga „nosi" |
> |---|---|---|---|---|
> | 1 | `blind-map.css` | `.map-clear-btn:hover` | `--danger` | C5b |
> | 6 | `profile.css` | `.admin-cat-del:hover, .admin-del:hover` | `--danger-bg` | C6 |
> | 7 | `profile.css` | `.admin-quiz-delopt:hover` | `--danger-text` | C6 |
> | 8 | `progress-section.css` | `.reset-btn:hover` | `--danger` | C5a/4 |
> | 9 | `quiz-section.css` | `.answer-btn.correct` | `--success` | C5a/3 |
> | 10 | `quiz-section.css` | `.answer-btn.wrong` | `--danger` | C5a/3 |
> | 11 | `sidebar.css` | `.close-sidebar-btn:hover` | `--danger` | C6 |
>
> **Nijedna cigla ih ne može ugasiti sama** — čekaju odgovor gore. Dosad su izgledali kao sedam
> odvojenih dugova raspoređenih po pet datoteka i četiri cigle; jedan odgovor ih zatvara sve.
> Preostala četiri (#2–#5) su druga priča: gradijenti i poluprozirno bijelo, i njih doista
> rješavaju cigle pojedinačno.

</details>

⚠️ **Od 11 fatalnih pravila ostalo ih je 10** — `learn-blocks.css` `.lb-video__icon` ugasio je
**C5b/0** (2026-08-31, spec §12.7): `var(--grad, …)` nije bio tematiziran nego zakucan, jer
`--grad` nije definiran nigdje. To je bilo jedno od „preostala četiri (#2–#5)" iz tablice u
`<details>` gore, ne iz sedmorke.

⚠️ **Tablica sedmorke gore vrijedi i dalje kao POPIS POSLA** — mijenja se samo status: više ne
čekaju odluku nego svoju ciglu. #8 (`progress-section` `.reset-btn:hover`) i #9/#10
(`quiz-section`) pripadaju **već zatvorenim** ciglama C5a/3 i C5a/4 → njih pokupi **C7** kao
zaostatak, jer se zatvorene cigle ne otvaraju iznova.

---

## 🔥 EKRAN NAPRETKA — Leonov sud o SADRŽAJU, ne o izgledu (2026-08-30)

> ✅ **C5a/4 je odrađena 2026-08-30 i ovaj je sud POŠTOVAN** — cigla je bila čista migracija,
> nijedna brojka ni grafikon nisu dodani. Zapis **ostaje živ** jer vrijedi za svaku sljedeću
> ciglu koja dira ovaj ekran, ne samo za C5a/4.

- **„Po meni je analitika o karticama glupost ali nema veze"** (Leon) → **ne ulagati** u brojke o
  karticama. One smiju ostati kakve jesu; ne proširuju se i ne dobivaju prostor.
- **„Kasnije ćemo za analitiku dodavat grafikone i sve pizdarije da bude zanimljivije i stvarno
  bolje"** → grafikoni su **odobreni smjer, ali NE unutar migracijske cigle**. Miješanje migracije
  i nove značajke je razlog zašto se cigle vraćaju.

**Kriterij prihvaćanja kad dođe red:** korisnik na ekranu napretka vidi **kretanje kroz vrijeme**,
ne samo trenutni zbroj — jer je to jedino što brojka o karticama danas ne daje.

### ➕ TRI NALAZA IZ C5a/4 (2026-08-30) — cigla ih je NAŠLA, ali ih nije smjela ispraviti

Migracija mjeri površinu prije nego je dirne, pa iznosi i ono što nije o CSS-u. Sva tri su
**odluke o izgledu ili o proizvodu**, a izlazni uvjet cigle je `css:diff` s nula razlika.

1. **✅ ODLUČENO 2026-08-30 — „Povijest učenja" OSTAJE, ali plitka.** Leon: *„history će biti
   dobar ali tek kada korisnici budu mogli objavljivat i kada bude bilo jako puno materijala na
   stranici; ali dobar je i sada da ga bude, samo ne treba biti na najvišoj razini razvijen."*
   ⇒ **Ne brisati odjeljak, ne graditi ga sad.** Vrijednost mu raste s količinom materijala, pa
   pravo vrijeme je **uz objavu/dijeljenje**, ne prije.
   ⚠️ Posljedica za cigle: tri CSS pravila (`.history-item`, `:last-child`, `.date`) su
   **namjerno mrtva, NISU siročad** — ne brisati ih i ne prijavljivati kao dug.
   **Kriterij prihvaćanja kad dođe red:** korisnik vidi **kad je zadnji put učio što** — dakle
   „kretanje kroz vrijeme" iz gornjeg Leonovog suda; minimalna izvedba je dovoljna.
   <details><summary>Nalaz kakav je bio prije odluke</summary>
   `#historyList` u `index.html` nosi komentar `<!-- Generated by JS -->`, ali u `js/**` **ne
   postoji nijedan zapis koji u njega išta piše**; `git log -S historyList` pokazuje da ga nije
   bilo ni prije podjele `app.js` na module. Podaci za izvedbu postoje (`quizScores`, naučene
   kartice, vrijeme). Predložene su bile dvije mogućnosti: izvesti ili maknuti.
   </details>

2. **Natpis gumba „Obriši napredak" je 13.33 px.** `.reset-btn` nasljeđuje `font-family`, ali
   `font-size` mu **nikad nije napisan**, pa se iscrtava u zadanoj veličini `<button>`-a —
   sitnije od svega oko sebe, na dodirnoj meti od 44 px. Nitko ga nije smanjio; nije ni bio
   postavljen. Ispravak je jedan redak, ali mijenja prikaz → **C7**, ili ranije uz izričit OK.

3. **`.category-bar-info span` pogađa DVA elementa.** Pravilo je pisano za vanjski redak (naziv
   + postotak), ali `<span>NN%</span>` živi unutar njega i nasljeđuje `display: flex`,
   `justify-content: space-between` i `margin-bottom: 0.35rem`. Zato to pravilo **nije moglo u
   markup** — utilityji bi obojili samo vanjski. Ispravak je `> span`, ali **mijenja prikaz** →
   **C7**.


## ✅ RIJEŠENO 2026-08-30 (C5a/4) — Tinta iz SADRŽAJA kao boja TEKSTA — ikona kategorije u napretku

**Zatvoreno:** glif je postao **čip** — ista boja iz kataloga je sada ISPUNA, a tinta se računa
`inkForTint()`-om, kao na `.subject-item-icon` / `.browse-card-icon` / `.landing-subject-icon`.
Izmjereno neovisno o brani, sve četiri teme: najgori kontrast **4.47** (bilo 2.15), **0 čipova
ispod praga**. `scripts/contrast-live-allow.json` je od danas **prazan** — nula imenovanih
iznimaka. Zapis: spec **§11.4**.

<details><summary>Izvorni zapis (2026-08-29)</summary>

`js/progress.js` stavlja `data.color` kategorije **inline na glif** (`<i style="color: …">`). Na
svijetloj plohi to daje **2.15–2.80** (prag za glif **3.0**) u temama `academic` i `paper`.

**To nije kvar u stilu nego posljedica toga da SADRŽAJ bira boju TEKSTA.** Isti razred je za
**ISPUNE** već riješen — `inkForTint()` u `js/navigation.js` bira tintu po luminanciji (BUG-024) —
ali za **tekst na svijetloj plohi** ekvivalent ne postoji.

**Ublažavajuće:** glif stoji neposredno uz `<strong>` naziv kategorije, pa **nije jedini nositelj
značenja**.

Vodi se kao **imenovana iznimka** u `scripts/contrast-live-allow.json` (ne prešućena — brana ju
ispisuje pri svakom pokretanju). **Rješava se u C5a**, čija je to površina.

</details>

---

## ➖ TELEFON POLEGNUT ISPOD 768 px — izmjereno u C5a/4, svjesno NIJE ušlo u branu (2026-08-30)

`phone-gate` mjeri četiri ekrana; jedini polegnuti je **852 × 393** (iPhone 16), dakle **širi od
768 px**. Ispod toga — iPhone SE polegnut, **568 × 320** — nije mjeren nikad, iako ondje vrijede
sva `@media (max-width: 767px)` pravila.

**Izmjereno (pokusno dodavanje ekrana, pa vraćeno):** brana pada s **22 nalaza**, i **nijedan
nije na C5a površinama**:

| nalaz | koliko | čije je |
|---|---|---|
| kromo **53 %** (170 od 261 px) na svih 6 study-ekrana — `#chrome` 56 px **+ `#cookieBanner` 114 px** | 6 | consent (**C6**) |
| prvi ekran: kromo 56–64 px + banner **123 px** = **38 %** od 320 px (landing, browse, browse:dubina, about) | 4 | consent (**C6**) |
| **`.mobile-nav-btn` stoji ispod bočnog izreza** — 59 px u pojasu `[0,245…95,295]` i simetrično desno | 12 | donja traka (**C7** / T-razred) |

**Zašto ekran NIJE dodan:** `tests/phone-baseline.json` je **prazan i to je njegova vrijednost** —
brana traži nulu. Dodati ekran znači ili obojiti branu crveno za tuđi posao (consent + donja
traka), ili napuniti osnovicu i izgubiti svojstvo „nula". *Cigla ne smije platiti tuđim
crvenilom.*

**Kad se dodaje:** nakon što C6 riješi banner na niskim ekranima i C7 donju traku. Brojke su
gore, ne treba mjeriti iznova — dovoljno je vratiti redak
`{ w: 568, h: 320, ime: 'iPhone SE polegnut', rub: RUB_LANDSCAPE }` u `EKRANI`.

⚠️ Treći nalaz je **pravi kvar, ne postavka**: isti razred koji je faza TELEFON zatvorila za
druge veličine (gumb ispod izreza), samo nikad izmjeren na 568 px. Srodno **BUG-036/037**.

---

## ✅ RIJEŠENO 2026-08-25 — `TESTING.md` je prestao biti inventar

> **Izvedena je druga opcija (skupine).** Odluku je potvrdilo mjerenje: **52 od 53 speca već
> nosi vlastito zaglavlje**, a od 51 pojma koji je dokument imao „viška" **nijedan nije
> postojao samo ondje** — dakle nije se imalo što izgubiti. Dokument je **41 142 → 12 988
> znakova**. Brojka „46" iz naslova ispod bila je usput i **sama zastarjela: datoteka ih je 53**.
> Nova brana: **7. provjera u `check:docs` — duh-datoteka** (imenovana datoteka mora postojati),
> i ona mjeri **samo dokumente koji tvrde kako JEST** (`workflow/`, `architecture/`, `CLAUDE.md`);
> `records/` je povijest, a `plan/`/`subjects/` imenuju hipoteze — prva verzija je to kaznila i
> **7 od 7 njezinih nalaza bili su lažni**.

<details><summary>izvorni zapis stavke</summary>

### `TESTING.md` nabraja specove rukom — 18 od 46 nedostaje (izmjereno 2026-08-24)

> Nađeno revizijom na Leonovo pitanje *„jesi siguran da je sve dobro zapisano"* — dakle ne
> gateom, nego time što je netko pitao. To je samo po sebi nalaz.

`docs/workflow/TESTING.md` imenuje pojedine spec-datoteke u prozi. Prebrojano: **46 datoteka
`tests/*.spec.js`, imenovano 28, nedostaje 18** — među njima `routes.spec.js`, `escaping.spec.js`,
`i18n.spec.js`, `tint-ink.spec.js`, cijeli `*.authed` niz. Uz to je isti dokument tvrdio
**„21 predmet = 17 EN + 4 HR"** dok ih je **24 = 17 + 7**.

⚠️ **Ne rješava se dopisivanjem 18 imena** — to obnavlja isti dug s novim datumom. ADR-027
kaže da proza nosi **zašto**, a inventar živi u kodu. Dvije opcije:

- **Generirati** odjeljak iz `npx playwright test --list` (kao što `check:seo` generira
  sitemap s diska), pa ga gate uspoređuje.
- **Svesti na skupine** („brane rasporeda", „brane pristupačnosti", „authed put") i imenovati
  samo one koje traže objašnjenje ZAŠTO postoje — ostalo prepustiti `tests/`.

Preporuka je druga: popis od 46 imena nitko ne čita, a ono što se doista treba zapisati je
zašto neka brana postoji — a to već stoji u zaglavlju svakog speca.

</details>

## ➖ Katalog je tražilici NEVIDLJIV — hash-rute nisu URL-ovi (izmjereno 2026-08-24)

> Izašlo iz Leonova pitanja o SEO-u. **Nije cigla nego arhitektonska odluka**, i namjerno stoji
> ovdje umjesto u planu — da se ne izvede prije nego je odlučena.

**Izmjereno:**

| | |
|---|---|
| indeksabilnih stranica | **5** (`index`, privacy, terms, faq, contact) |
| predmeta iza `#/subject/…` | **24** |
| lekcija koje tražilica vidi | **nijedna** |

K1 je devet stranica dobilo devet adresa — ali **za preglednik, ne za tražilicu**: fragment
(`#/…`) nije zaseban URL i Google ga ne indeksira kao stranicu.

**⚠️ Nagrada je manja nego što zvuči, i to je već presuđeno.** ADR-028 kaže da je glavni argument
za SSR bio **dijeljeni materijal**, ali da je doseg dijeljenja presuđen kao **link s tajnim
tokenom, bez javne biblioteke** — dakle korisničko gradivo **po dizajnu NIJE javno pronalažljivo**.
SEO time može doseći samo **katalog** i marketinške stranice. Tko ovo bude vagao, neka to uzme
u obzir prije nego procijeni isplativost.

**Što bi tehnički trebalo:** `history.pushState` umjesto hasha u `navigateTo`/`parseRoute` ·
Vercel rewrite (`/(.*) → /index.html`) · dodir u `sw.js` (navigacija je network-first, ali
opseg se mijenja) · `sitemap.xml` bi tek tada imao što nabrajati · `Course` JSON-LD po predmetu
(danas namjerno izostavljen, uz komentar u `index.html`).

**⚠️ Otvoreno pitanje koje se ne smije preskočiti:** i s pravim adresama sadržaj crta **JS iz
`data/*.js`**. Google to renderira, ali sporije i manje pouzdano. Pouzdan odgovor je
**pred-renderirani HTML po lekciji**, dakle build-korak — a to je već pitanje na koje je ADR-028
odgovorio „ne kroz redizajn, nego kao svjesna migracija na vlastite zasluge".

**SEM (plaćeno oglašavanje) je odvojeno i ide POSLIJE:** odluka o budžetu, ne o kodu. Dok su
C4–C7 i POLICA nedovršeni, plaćeni promet dolazi na gradilište.

## ➖ PRIJEVOD SUČELJA — 421 nositelj bez ključa → 0 (odluka ADR-033, 2026-09-01)

> Leon je presudio: **prevodi se** — *„jako je bitno da je stranica dvojezicna. eng i hrv."*
> — uz tvrdo pravilo da **mijenjanje jezika NIKAD ne dira predmete** (jezik gradiva je
> svojstvo programa, ADR-012). Ovo je red čekanja za taj posao, **bez termina** — nije dio
> faze MREŽA i ne blokira je.

> ✅ **F3/1 (2026-09-16, grana `feat/f3-dvojezicnost`): četiri pravne stranice → 0** — oba jezika u stranici
> (ADR-037). Ostatak su `index.html` i editor/JS (F3/2–F3/3); brojka živi u osnovici, ne ovdje.

**Opseg (izmjeren, `scripts/i18n-baseline.json` · pun popis: `node scripts/check-i18n.js --list`):**
- **4 stranice bez mehanizma** — prvo učitati `js/i18n.js` + `data-i18n`, pa prevesti:
  `privacy.html` 96 · `terms.html` 40 · `faq.html` 34 · `contact.html` 26.
- **19 datoteka s mehanizmom, a zakucanim tekstom** — najveći: `index.html` 50 ·
  `js/studio.js` 40 · `js/exercises.js` 29 · `js/block-editor.js` 23.
- **K5 razred:** 31 `studio.*` + 2 `admin.*` ključa koji NE postoje u rječniku — smjer je
  **upisati ih u rječnik**, ne brisati pozive.

**Dokaz napretka = spuštanje osnovice** (`check-i18n.js --update` NAKON dodavanja ključeva),
nikad procjena. Gotovo kad je osnovica prazna i brana traži nulu — obrazac phone-brane.

## ✅ ~~Zakucan engleski nije bio JEDNA traka nego RAZRED — treba `check:i18n`~~ — ZATVORENO 2026-08-31 (MREŽA B5)

> Brana postoji (`npm run check:i18n`, u preflightu) i brojka više nije nepoznata:
> **421 nositelj teksta bez ključa u 23 datoteke** (`scripts/i18n-baseline.json`, brojač po
> datoteci) — među njima **četiri cijele stranice** koje `js/i18n.js` ni ne učitavaju
> (privacy 96 · terms 40 · faq 34 · contact 26). Presuda ③ („ključ bez rječnika") je
> reproducirala K5 nalaz strojno: 31 `studio.*` + 2 `admin.*` poziva na nepostojeće ključeve.
> **Presuda je donesena 2026-09-01: PREVODI SE (ADR-033)** — sučelje je dvojezično i dovršava
> se, a jezik sučelja NIKAD ne dira predmete (jezik gradiva = svojstvo programa, ADR-012).
> Sam prijevod je posao bez termina — vidi živu stavku niže. Detalji: spec §4 B5 — ISHOD.

<details><summary>izvorni zapis</summary>

## ➖ Zakucan engleski nije bio JEDNA traka nego RAZRED — treba `check:i18n` (2026-08-24)

> Nađeno pri cigli `about`: cijela stranica „O nama" imala je **nula `data-i18n`** atributa,
> dakle zakucan engleski tekst od naslova do zadnje kartice. T4 je **isti kvar** našao pet dana
> ranije na cookie-traci i zapisao pouku — ali kao **anegdotu o toj traci** („bila je jedina
> površina sa zakucanim engleskim"). Ta rečenica je bila **neistinita u trenutku pisanja**, a
> nitko ju nije provjerio jer je zvučala kao zaključak.

**Prijedlog:** gate koji broji **nositelje teksta bez ključa** kroz sve stranice, po uzoru na
tvrdnju ③ u `tests/about.spec.js` (ondje je izvedba već napisana i radi): element koji ima
vlastiti tekstni čvor, a nema `data-i18n`, uz **izričit i kratak** popis izuzetaka (vlastita
imena, e-adrese, brojevi). **Osnovica, ne nula** — obrazac `check:palette` / phone-brane, jer je
očekivano da zatečenih pogodaka ima puno i ne smiju držati suitu crvenom.

⚠️ **Zašto ovo nije nusprodukt nego zasebna cigla:** brojka je danas **nepoznata**. Prije nego se
odluči hoće li se prevoditi ili gasiti dvojezičnost, treba je izmjeriti — ista pouka kao
`palette:breakdown` (agregat koji mjeri točno, a savjetuje krivo).

⚠️ **Nije isto što i K5** (editor dvojezično). K5 je mjeren i zna svoju brojku (28 od 48
`studio.*` ključeva nedostaje, `block-editor.js` i `admin-editors.js` imaju **nula** `t()`
poziva). Ovo je brana koja bi K5 uopće **našla** bez ručnog prebrojavanja.

</details>

## ✅ ~~Tekst stranice `about` ne spominje UGC~~ — RIJEŠENO ISTI DAN (2026-08-24, spec §9.15)

> Leon je izabrao smjer **B — oboje ravnopravno**, i tekst je promijenjen **na četiri mjesta
> odjednom**: `about`, `meta description`, `og:` i `twitter:`. Ispalo je da problem nije bio
> samo na stranici — ista FMTU-only rečenica stajala je i u `<head>`-u, gdje ju je **Google
> stvarno čitao**, a tri opisa su bila i **međusobno različita**. Brana `check:seo` od tada
> traži da ostanu jedan tekst. Zapis ostaje jer objašnjava ZAŠTO tekst danas izgleda ovako.

<details><summary>izvorni zapis</summary>

## ➖ Tekst stranice `about` ne spominje UGC — a UGC je glavni proizvod (2026-08-24)

> **Leonova odluka, ne nusprodukt cigle.** Cigla `about` je stranici dala izlaz i jezik, ali
> **tekst nije dirala** — mijenjati Leonovu prozu o vlastitom projektu nije posao brane.

Stanje: stranica opisuje platformu kao mjesto koje **dijeli gotovo gradivo** („helps learners
prepare for exams by sharing high-quality study materials, summaries, and scripts"). Nijedna
rečenica ne kaže da korisnik smije **napraviti svoje**. To se s **ADR-029** („UGC je GLAVNI
proizvod, javni katalog je jedan izvor gradiva") ne slaže — a od ove cigle na stranici stoje
**dvoja ravnopravna vrata**, od kojih jedna vode u vlastito gradivo koje tekst ne spominje.

Uz to, kartica „Contribute" traži da se gradivo **pošalje e-mailom** — mehanika iz vremena prije
graditelja. Danas korisnik gradivo napravi sam, u pregledniku.

**Odluka koju traži Leon:** ostaviti kako jest · dopisati rečenicu o vlastitom gradivu ·
ili prepisati stranicu. Treće je najveće i nije hitno.


</details>

## ➖ Stablo Studija ima isti kvar kao BUG-032 — `.st-row` je `div` s klikom (2026-08-24)

> Nađeno skeniranjem **pri popravku BUG-032**, ne posebnim traženjem: `js/studio.js:82` crta
> redak stabla kataloga kao `<div class="st-row" data-subj=… data-lesson=…>` s delegiranim
> klikom. Nema `tabindex`, nema uloge → **stablo kataloga u Studiju nije upotrebljivo
> tipkovnicom**.

Zašto NIJE popravljeno zajedno s BUG-032: to je **editor** (admin-only, živi na `editor.html`
od T6), a BUG-032 je bio na studentskom putu — svaki predmet, svaki korisnik. ADR-030 uz to
kaže da se editor smije **pojednostaviti**, pa ovo ima smisla riješiti kad se stablo ionako
dira (K5 je već u redu čekanja).

Popravak je poznat i mali: isti obrazac kao `renderLessonsPage` — `<button>` za redak koji
nešto otvara, `aria-expanded` za redak koji grana stablo.

⚠️ **Ostalih pet kandidata iz istog skeniranja su PROVJERENI i nisu kvar:** `.browse-card` je
već `<button>`; `.ex-choice-item` i `.ex-card` su **omoti oko pravih `<button class="ex-opt">`**;
`.profile-card` i `.admin-quiz-optrow` su u editoru i nose kontrole unutar sebe. *Skener nađe
obrazac, ne kvar — razlika se vidi tek čitanjem.*

## 🔥 EDITOR — boja kartice i dopune (Leon, 2026-08-24; izmjereno isti dan)

> Dvije Leonove primjedbe na editor, obje potvrđene mjerenjem; jedna od njih je **mina** —
> razuman prijedlog koji bi, izveden doslovno, slomio postojeće gradivo.
>
> **🟢 ODABRANO ZA SLJEDEĆI RAD (Leon, 2026-08-25).** ⚠️ Ali samo **② (dopune)**: ① je po
> **ovdje već zapisanoj analizi** posao cigle **C5a**, koja ionako prepisuje baš te tri
> datoteke — raditi ga sada znači raditi ga dvaput. *Odabir zadatka ne poništava mjerenje koje
> je taj zadatak smjestilo.* Dakle: **② se radi, ① čeka C5a.**

### ① Boja mijenja samo rub, a treba obojiti CIJELU karticu

> **✅ ISPORUČENO 2026-09-01 (MREŽA C2).** Sva tri moda crtaju punu ispunu s tintom preko
> `data-ink` (`inkForTint` preseljen u `blocks-renderer.js` — editor ne učitava navigation.js).
> Tablica ispod ostaje kao mjerenje koje je ciglu smjestilo.

Boja se svugdje postavlja isto (`SokratBlocks.applyAccent` → `--item-acc`), ali je **tri moda
troše različito**, i to nitko dosad nije primijetio jer se gleda mod po mod:

| mod | što `--item-acc` zapravo radi | datoteka |
|---|---|---|
| kartice | `box-shadow: inset … 3px` — **samo prsten, nikakve ispune** | `css/flashcards-section.css:93` |
| kviz | `border-left: 4px` + tinta **10 %** | `css/quiz-section.css:92` |
| dopune | `border-left: 4px` + tinta **10 %** | `css/fill-blanks-section.css:18` |

Kod kartica ispune **doslovno nema**; kod kviza i dopuna je 10 %, što se na ekranu čita kao
„samo rub". Leonov dojam je točan opis koda, ne dojam.

**Mjesto: C5a (modovi uvježbavanja)** — ta cigla ionako prepisuje baš te tri datoteke, pa bi
raditi to sada značilo raditi dvaput. **Teški dio je već riješen:** izbor tinte po luminanciji iz
dva tema-neovisna tokena (`--color-on-tint-dark/-light`) napravljen je za pločice landinga, s
branom `tests/tint-ink.spec.js` — dakle puna, zasićena boja s čitljivim tekstom kroz sve 4 teme
nije nov problem nego **postojeći alat**. ⚠️ Vrijede tvrde zabrane iz `check:palette`: tekst na
ispuni ide kroz token, nikad `color: white`.

### ② Dopune — ⛔ NE rješavati jednom podvlakom (ovo je mina)

> **✅ ISPORUČENO 2026-08-25 (D1 + D2).** Nalaz ispod ostaje jer objašnjava **zašto je izvedeno
> baš tako**, a ne kako je predloženo. Tekst je pisan dok je stanje još bilo zatečeno.

Editor je do D1 tražio **točno 7 podvlaka** (`_______`) da prepozna prazninu. Leon: nije user-friendly,
neka bude dovoljna jedna `_`, ili neka praznina bude vidljiv element koji se povlači i u koji se
upiše odgovor; i neka ih se može staviti više.

**Prijedlog „jedna podvlaka" se NE SMIJE izvesti doslovno.** U LaTeX-u je `_` operator indeksa, a
rečenice s dopunom renderiraju matematiku (ADR-009, `js/fill-blanks.js:80`). Izmjereno u `data/`:
**1005 rečenica s dopunom, 5 ih sadrži KaTeX**, i jedna je ovo:

```
At the market-clearing price, quantity demanded equals quantity _______ (\(Q_d = Q_s\)).
```

`Q_d` i `Q_s` postali bi praznine → **mikroekonomija bi se raspala**. Zato: ili token koji se ne
može sudariti s LaTeX-om, ili — bolje — **marker uopće ne živi u tekstu**.

**Pravi korijen: podvlaka je format POHRANE koji je procurio u sučelje.** Editor traži od autora
da utipka ono što baza sprema. Leonova druga ideja (označi riječ / ubaci prazninu gumbom) briše
to pitanje: koliko je podvlaka postaje nevažno.

**Više praznina po rečenici je danas blokirano na četiri mjesta**, i zadnje je odlučujuće:

- `_FILL_BLANK = '_______'` — `js/admin-editors.js:508`
- validacija odbija rečenicu bez tog niza — `js/admin-editors.js:595`
- shema traži isti uzorak — `schema/subject-content.schema.json:66`
- renderer radi `.replace('_______', …)` — `js/fill-blanks.js:77`; `replace` sa **stringom**
  mijenja **samo prvo** pojavljivanje
- ⚠️ **model podataka: `answer` je JEDAN string** (`schema:67`) — i da se sve gore popravi, nema
  gdje spremiti drugi odgovor

**Migracije nema:** izmjereno je **0 od 1005** rečenica s više praznina (jer je nemoguće), pa
`answer` ostaje za jednu prazninu, a `answers` se doda za više. Ocjenjivanje (`normFill`,
`js/fill-blanks.js:94`) mora tada usporediti **po praznini**, ne po rečenici.

**Rez: dvije cigle, ne jedna.** ① autorstvo praznine (sučelje editora, malo) · ② više praznina
(shema + ocjenjivanje + renderer, vlastita cigla).

> **✅ ① ISPORUČENO 2026-08-25 (cigla D1)** — gumb „Ubaci prazninu" (označena riječ → praznina +
> odgovor), tolerancija za 3+ ručno utipkane podvlake, i **odbijanje druge praznine** koja se
> dosad dala spremiti a nije radila. Granica **3+** je namjerna: jedna i dvije podvlake su LaTeX.
> Brana: `tests/unit/fill-blank-format.test.js` (mjeri pravu KaTeX-rečenicu iz kataloga).
> **✅ ② ISPORUČENO 2026-08-25 (cigla D2)** — `answers` (2+) u shemi uz `answer` (koji ostaje
> obavezan i drži prvi odgovor, radi stare keširane skripte), polja **u rečenici** od druge
> praznine, ocjena **po praznini**, editor gradi polja za odgovor prema broju praznina.
> Brane: `tests/unit/fill-blank-format.test.js` + `tests/fill-multi.spec.js`.
> **Time je cijela stavka zatvorena osim ①-boje, koja ostaje u C5a.**

## ✅ TELEFON JE ISPORUČEN · ➖ POLICA OSTAJE — (Leon na iPhoneu 16, 2026-08-19/20)

> **STATUS 2026-08-25:** faza **„TELEFON" (T0–T6) je gotova i NA PRODUKCIJI** od 2026-08-24,
> zajedno s BUG-030/031/032; phone-osnovica je **prazna**, pa brana od tada traži **nulu**.
> **AŽURIRANO 2026-08-28: faza „POLICA" (P1–P4) je ISPUNJENA** (spec §9.17–9.21); **na produkciji od 2026-09-01**.
> Nalaz ispod ostaje jer objašnjava **zašto su brane takve kakve jesu**, a to se
> nije promijenilo.
> ⚠️ **Ovdje je do 2026-08-29 stajalo „Sljedeća cigla je C4" — C4 je u međuvremenu ZATVOREN.**
> Redoslijed cigli se **više ne prepisuje u BACKLOG**: zna ga `CLAUDE.md` §Gdje smo i spec §3, a
> ovdje je ostario **treći put u tri revizije**. Zastarjela činjenica zavara; zastarjeli **nalog**
> šalje sljedeću sesiju na posao koji je obavljen.
> ➖ **Ostaje N2 (pola):** polica pokazuje *skinuto*, ne uniju skinutog i onoga što se uči.

> **📐 RAZRAĐENO U DVIJE FAZE — radna specifikacija je
> [`FRONTEND_REDIZAJN.md` §9](../archive/FRONTEND_REDIZAJN.md): faza „TELEFON" (T0–T6) i faza
> „POLICA" (P1–P4), obje PRIJE C4.** Ovdje ostaje samo nalaz; što se radi piše u specu.

Leon: *„cijeli frontend na produkciji je apsolutno DNO DNA… puca mi kurac za cigla po ciglu,
ovo je crveni alarm."* Izmjereno na 393 × 852: zaglavlje kataloga **270 px**, naziv fakulteta
u **14 redaka**, naslov odrezan na **34 od 205 px**, „Start studying" na **y = 18 px** (ispod
otoka), kromo **32 %** ekrana, cookie-banner još **24 %**. → **BUG-030**, **BUG-031**.

**Zašto je svih desetak gateova zeleno:** axe mjeri na **1280 px**, `css:diff` uspoređuje nas
sa samima sobom (drift, ne lošoća), a K3/K4a mjere **kromo, ne stranicu**. **Telefon kao
STRANICA nikad nije bio mjerena površina** — zato faza počinje mjeračem (T0), ne popravkom.

**Dvije trajne Leonove odluke iz iste sesije:**
1. ~~**Ništa ne ide na produkciju dok cijeli frontend ne bude riješen.**~~
   ⚠️ **POTROŠENA 2026-08-24 — Leon je tu odluku sam promijenio** i odobrio merge iako C4–C7 i
   POLICA nisu gotovi (*„moze merge na main"*). Obrazloženje je prestalo vrijediti: prepreka je
   bio telefon, a on je riješen. **Potrošena, ne ukinuta — sljedeći deploy opet traži izričit OK.**
2. **Broj commita izvan produkcije NIJE nalaz i ne spominje se** (*„ZNAM KADA ZELIM PUSTIT
   NESTO NA PRODUKCIJU"*; povod: raniji deploy koji se nije trebao dogoditi).

**❓ OTVORENO PITANJE IZ T4 (2026-08-22) — traži ODLUKU, ne izvedbu.** Stranica `about` na **sva četiri profila** nema **nijednu** kontrolu u prvom ekranu: cijela ima **jednu** (`a.email-link`) i ona je na `y ≈ 1500`. Tvrdnja ④ phone-brane to danas broji kao kvar i to su **4 od 10** preostalih nalaza u osnovici. Dvije mogućnosti, i obje su legitimne: ① `about` je proza koja se čita, pa tvrdnja dobiva **izuzeće uz zapis zašto** · ② stranica bez ijednog izlaza je kvar, pa dobiva **ulaz** (vrata natrag na gradivo ili na vlastiti materijal). *Ne popravljati dok se ne odluči — popravak bez odluke ovdje znači izmišljanje sadržaja.*

---

## ✅ NAVIGACIJA RIJEŠENA (K1–K4a) · ➖ OSOBNI PROSTOR OSTAJE — (Leon, 2026-08-18)

> **STATUS 2026-08-25:** **K1–K4a su gotovi i na produkciji** — devet stranica ima devet
> dijeljivih adresa, „natrag" ima jedan model, gornja traka je jedna, Studio je upotrebljiv na
> telefonu. **Petlja opisana ispod više ne postoji.** Ostaje **N2 („ono što učim")**, a ono se
> **utapa u P2** faze POLICA — ne planirati ga zasebno.
>
> **✅ DOPUNA 2026-08-26: P2 je isporučen** (grana `feat/polica`, **nije deployano**), pa je i
> **K4 potrošen** — polica ima dva izvora. ⚠️ Time je i rečenica „N2 ulazi tek kad K1–K4 stoje“
> ispod **ispunjena, ne otkazana**: uvjet je bio točan i dogodio se tim redom.

> **📐 RAZRAĐENO U FAZU 2026-08-18 — radna specifikacija je
> [`FRONTEND_REDIZAJN.md` §8](../archive/FRONTEND_REDIZAJN.md) („KOSTUR": K1 rute · K2 traka ·
> K3 brana · K4 materijali), ubačena između C3 i C4.** Ovaj odjeljak ostaje kao **nalaz i
> obrazloženje**; što se radi i kojim redom piše u specu. ⚠️ Ondje je i mjerenje koje ovdje
> nije bilo: **devet stranica dijeli jednu jedinu adresu** (`#/materials`), pa se traka bez
> ruta mora pisati dvaput. **N2 nije u fazi** — ulazi tek kad K1–K4 stoje.

Leon: *„navigacija je iskreno dosta loša… kada se uđe u editor i izađe iz njega samo se
vrti u krug moji materijali, editor i tako u krug. Moji materijali moraju imat poseban
odjeljak na stranici… isto kao materijali koji su s FMTU-a. Korisnik treba imati svoje
sučelje za predmete koje uči."*

**⚠️ PETLJA JE IZMJERENA, NIJE DOJAM.** [`js/studio.js:152`](../../js/studio.js#L152) —
ljuska Studija ima **točno dva gumba**: `←` i „stari editor". `←` vodi `navigateTo(_node
? 'materials' : 'profile')`. Iz materijala se ulazi u editor. **Dva čvora, jedan brid** —
graf iz kojeg doslovno nema izlaza osim natrag. Isto i za admina.

**Uzrok je širi od Studija: NE POSTOJI NIJEDNA GLOBALNA TRAKA.** Izmjereno:

| površina | gdje živi |
|---|---|
| `landing-nav` | samo landing |
| `study-nav` + `mobile-nav` (8+8 gumba) | samo study-stranica (to su MODOVI, ne navigacija aplikacije) |
| `browse-header` · `lessons-header` · `study-header` | svaka stranica **iznova** slaže jezik, materijale, auth i znak |
| `st-topbar` (Studio) | ništa od navedenog |

Devet stranica, nula zajedničkih traka. Zato se svaki ekran čita kao zaseban proizvod.

### N1 · Stalna gornja traka — razrađena u ciglu **K2** (spec §8; K1 rute su isporučene)
- **jedan** `<header>` kao brat svih `-page` sekcija, izvan njih (danas su zaglavlja
  UNUTAR sekcija, pa nestaju s njima — to je cijeli uzrok)
- sadržaj: znak → landing · **Predmeti** → browse · **Moji materijali** → materials ·
  jezik · profil/prijava
- **Studio je dobiva jednako kao i sve ostalo** → petlja pada bez ijedne posebne iznimke
- zaglavlja po stranici zadržavaju SAMO ono što im je vlastito (natrag, naslov, mrvice);
  duplirani jezik/materijali/auth gumbi odlaze
- ⚠️ **brana:** test koji tvrdi da je iz **svake** stranice (uključujući `#editor-page`)
  dohvatljiva bar jedna druga odredišna stranica u jednom kliku. Bez toga se petlja
  može vratiti neopaženo — kao što je i nastala.

### N2 · Osobna početna — „predmeti koje učim" → **➖ POLA ISPORUČENO (cigla P2)**
Katalog-predmeti s napretkom **i** vlastiti materijali na jednom mjestu.

> **➖ P2 je dao MJESTO, ali ne i cijeli skup** (grana `feat/polica`, **nije deployano**).
> `#materials-page` od P2 nosi **dva izvora** — skinute predmete iz kataloga (pločica s imenom,
> veličinom, stanjem učenja i pravom adresom) i vlastito gradivo ispod. Sama stranica postoji
> od **C0**; ono što do P2 nije postojalo je **kombinacija**.
>
> ⚠️ **ISPRAVAK ISTOG DANA — prvo je ovdje pisalo „✅ ISPORUČENO“, i to je bilo preuzetno.**
> N2 traži **„katalog-predmeti s NAPRETKOM“**, a P2 pokazuje **skinute**. To nisu isti skupovi:
> predmet koji učiš a nisi ga skinuo **ne pojavljuje se na polici**. Razlika je izmjerena, ne
> nagađana: `mountShelf()` crta iz `SokratOffline.list()` (manifest skidanja), a napredak živi
> pod `storageKey` u `localStorage` i **nitko ga ne popisuje**.
>
> **Što još treba da N2 bude cijel:** polica mora sastaviti **uniju** — skinuto ∪ predmeti s
> napretkom ≠ 0. Nazivnik i dalje ne postoji (postotak se ne izmišlja), ali „Zadnje učenje…“
> vrijedi za oba. **Nije zakazano ni u jednu ciglu**; P3/P4 su o offlineu, ne o popisu.
> ⚠️ **Napredak se prikazuje kao „Zadnje učenje …" / „Još nedirnuto", NE kao postotak** — nema
> iskrenog nazivnika (koliko kartica predmet „ima" ovisi o lekciji i modu).

> **Dobila je sadržaj koji joj je nedostajao.** Leon je 2026-08-20 tražio da korisnik **bira
> što će skinuti** za učenje offline — a to je točno ono što N2 prikazuje. Polica time ima
> **dvije vrste stvari: što je korisnik napisao i što je skinuo.** Ne gradi se nova površina
> nego se puni ona koja je bila planirana i prazna. Cigle P1–P4 u
> [`FRONTEND_REDIZAJN.md` §9.4](../archive/FRONTEND_REDIZAJN.md); **K4 se u P2 utapa** (ista
> pločica, isti ekran — odvojeno bi se pisalo dvaput).

### N3 · Moji materijali u prikazu kvalitete kataloga — **➖ RIJEŠENO SAMO ZA SKINUTO**

> **P2 je pokrio jednu polovicu:** skinuti **katalog**-predmeti imaju pločicu s ikonom, imenom i
> stanjem učenja. **Vlastito gradivo je i dalje stablo** (`mm-*`) i N3 za njega stoji otvoren.
> Ne voditi ovo kao ispunjeno.
Danas je polica **stablo**, a katalog **vitrina s bojom i ikonom**. Leon traži da vlastito
gradivo izgleda jednako dobro kao FMTU gradivo.

**🔒 PRAVILO KOJE JE IZ OVOGA IZAŠLO (Leon, izričito):** *sučelje za vlastite materijale
NIKAD ne ide na landing* — nego na posebno mjesto, eventualno profil. Landing smije imati
**ulaz** (vrata, ＋ pločica) i **objašnjenje**, nikad **popis korisnikovih materijala**.
Ovo sužava ADR-029: „ravnopravno u herou" vrijedi za **istaknutost ulaza**, ne za prikaz
sadržaja.

---

## ➖ A — PRIJAVA I REGISTRACIJA — **SPUŠTENO S 🔥 NA ➖ (Leon, 2026-08-30)**

> ### ⚠️ BROJKA KOJA JE OVU STAVKU OPRAVDAVALA NE ZNAČI ONO ŠTO SMO MISLILI
> Leon, 2026-08-30: *„5 acca je registrirano, **4 od tih 5 su moja**, ovaj 5. je od frendice,
> ona ga ne koristi. **Nije toliko bitno.**"*
>
> Dakle **stvarnih vanjskih korisnika je NULA**, ne dvoje kako je dosad pisalo. To **obara
> zaključak**, ne samo brojku: „5 registriranih" nije dokaz da je **lozinka prepreka** — nego da
> stranica **još nema publiku**. OAuth uklanja trenje koje nitko nije ni osjetio.
> ⇒ **Ne planirati OAuth**, ne graditi A0/A1 dok postoji promet koji bi to opravdao. Odluka se
> preispituje **brojkom** (prvi vanjski korisnici), ne rokom.
> ⚠️ Ovo **ne poništava A0** kao *analizu*: kad OAuth jednom dođe, `#authModal` se i dalje mora
> prepraviti zajedno s njim — to je i dalje točno, samo više nije aktualno.

Izvorno (Leon, 2026-08-18): *„preko potrebno da postoji mogućnost prijave s Googleom, Appleom, jer
jako puno korisnika se zapravo tako registrira."* Uz to bogatija registracija: **student / učenik /
profesor / vanjski korisnik**.

**Brojka koja je to opravdavala: 5 registriranih korisnika ukupno** (mjereno na produkciji
2026-08-16; 3 prijave u 30 dana, 1 u 7) — v. ispravak gore. Danas je e-mail + lozinka
**jedini** put; `js/auth.js` ima samo `signInWithPassword`, nijedan OAuth provider.

| korak | što | zašto tim redom |
|---|---|---|
| **A1** | **Google** | besplatno, ne dira CSS, **ne mora čekati redizajn** — najveći učinak po jedinici posla |
| **A2** | **Sign in with ChatGPT** | OpenAI ga je pokrenuo **2026-08-02** (OAuth 2.0), Supabase je launch-partner. ⚠️ **POTVRĐENO SAMO za prijavu na Supabaseov vlastiti dashboard** — treba provjeriti nudi li se kao provider za APLIKACIJE. Ne obećavati dok se ne provjeri. |
| **A3** | **Apple** | traži Apple Developer ~99 $/god; nije hitno bez iOS aplikacije |
| **B** | **pitanja pri registraciji** | traži izmjenu sheme (`profiles`) → **SQL na produkciji = Leonova ruka**; dira profil → ide **s C6**, ne prije |

**🎨 A0 · DIJALOG PRIJAVE SE PREPRAVLJA ZAJEDNO S A1 (Leon, 2026-08-19, uz snimku):**
*„kada budemo dodavali mogućnost za prijavu preko Googla, Applea i drugih pizdarija morat
ćemo popravit gumb za sign in i sign up."* Današnji `#authModal` je građen za **jedan**
put: dva taba („Sign in" / „Create account") pa polje e-maila i lozinke odmah ispod. Čim
dođu OAuth-gumbi, taj oblik puca — davatelji su **primarni** put i moraju stajati **iznad**
e-maila, s razdjelnicom („ili e-mailom"), a tabovi tad postaju šum jer Google-prijava i
Google-registracija nisu dvije radnje nego jedna.

**Zato ovo NIJE zaseban posao nego dio A1** — prvo dodavanje davatelja mora doći s novim
rasporedom dijaloga, inače se gumbi zalijepe na oblik koji ih ne podnosi i prepravljamo
dvaput. ⚠️ Vrijedi i granica iz C2: **tekst na ispuni marke ide kroz `--on-primary`**, a
Google/Apple gumbi imaju **propisane** boje i logotipe (brand guidelines) — to su prve
površine u projektu čija boja NIJE naša odluka, pa moraju ući u `check:palette` kao
**imenovana iznimka**, ne kao tiho odstupanje.

**⛔ GODINE SE NE PITAJU (Leon presudio 2026-08-18, na moj prigovor).** Ako pitamo dob i
netko upiše 14, mi **znamo** da je dijete — GDPR čl. 8 tad traži roditeljski pristanak
(prag 16, države ga smiju spustiti). Kategorija „učenik" to već implicira. Time bismo
uveli pravnu obavezu koju danas nemamo, za podatak s kojim ne bismo ništa radili.
**Prilagodbu sadržaja bolje daje pitanje „što učiš" nego „koliko imaš godina".**
Uloga (student/učenik/profesor/vanjski) je korisna i bezopasna — ona ostaje.

---

## 🔥 Leaked password protection — **rješivo BESPLATNO; Supabase naplaćuje integraciju, ne provjeru** (2026-08-21)

**Premisa je bila kriva 11 dana.** Stavka „RUČNO ČEKA LEONA" je od 10. 8. tvrdila da je ovo *„jedini
od 16 advisora koji se rješava jednim prekidačem"*. Prekidač je **iza Pro plana** (org
`pfbkisxynphwxdbqmmtt` = **free**), pa ga u Dashboardu nema. Advisor ga svejedno prijavljuje jer ne
gleda plan. *Zapisano jer je pouka o klasi: „ostala je samo radnja" je tvrdnja koja se mora
provjeriti prije nego se nekoga pošalje da tu radnju izvrši.*

**Ono što Supabase naplaćuje NIJE provjera nego njihova integracija.** HaveIBeenPwned ima
**besplatan javni API bez ključa**: `GET api.pwnedpasswords.com/range/{prvih 5 znakova SHA-1}`
vrati ~500 sufiksa, usporedba je lokalna. **Lozinka nikad ne napusti preglednik** — odlazi pet
heksadecimalnih znakova (k-anonimnost, ista tehnika koju Supabase koristi iznutra). `crypto.subtle`
je ugrađen. **~30 redaka u `js/auth.js`.**

⚠️ **Pošteno o dosegu:** naša izvedba je **klijentska**, kao i `minlength` — zaustavlja korisnika
koji upiše `password123` (a to jest prava prijetnja), ali ne i onoga tko namjerno zaobiđe formu, a
taj šteti **samo sebi**. Supabaseova je serverska i time jača. **~90 % vrijednosti za 0 €** umjesto
100 % za ~300 €/god. Registracija ide izravno na Supabase Auth, ne kroz naš kod, pa se serverska
provedba **ne može** dobiti bez proxyja — to nije propust izvedbe nego svojstvo puta.

**Veže se na CSP (C6):** dodaje `api.pwnedpasswords.com` na popis vanjskih hostova.

### Uz to: dvije susjedne stavke koje je isto istraživanje iznijelo

1. **`minlength="8"` je obećanje preglednika, ne pravilo servera.** Forma traži 8
   (`js/auth.js:206`), Supabaseov serverski minimum je zadanih **6** → tko pošalje zahtjev mimo
   forme, registrira se sa šest znakova. **✅ NAPRAVLJENO 2026-08-28** — serverski minimum je **8**,
   pa se sučelje i server od tada poklapaju.
   ⚠️ **Polje „Password Requirements" NE dirati** — traženje velikih slova/brojki/simbola server bi
   provodio, a **naša forma to nigdje ne piše**; bila bi to ista greška okrenuta naopako (server
   stroži od sučelja). *Mijenja se isključivo ono što UI već obećava.*
2. ❌ ~~**`WeakPasswordError` se u `js/auth.js:343` krivo tretira**~~ — **TVRDNJA JE OBORENA
   MJERENJEM 2026-08-28.** Zapis je tvrdio da Supabase pri prijavi vrati **sesiju i `error`
   zajedno**, pa da naš `if (error)` pokaže crvenu poruku iako je prijava prošla. Uz to je stajalo
   i upozorenje *„mora se popraviti PRIJE nego se serverski minimum digne"* — minimum je dignut,
   pa je zapis danas izgledao kao **obistinjeno upozorenje**.

   **Nije bio.** Izvučen je stvarni kôd zakucane verzije (`supabase-js@2.110.8`, CDN):
   > `signInWithPassword` slabu lozinku **ne vraća kao grešku**. `xform` je `Wr`, koja server-polje
   > `weak_password` pretvori u **`data.weakPassword`**, a povratak je
   > `{ data:{user,session,weakPassword}, error: r }` — gdje je `r` na tom putu **nužno `null`**
   > (provjereno je ranijim `if (r) return …`). `AuthWeakPasswordError` baca **samo** `Vr`, kad
   > HTTP odgovor **nije ok** — a to su **registracija i promjena lozinke**, gdje sesije ni nema.

   Dakle crvene poruke pri prijavi **nema i nije je bilo** u ovoj verziji; zapis je opisivao
   ponašanje **starijeg** supabase-js-a. Da se poslušao, „popravljao" bi se nepostojeći kvar.
   🧭 **Treći put u dva dana ista pouka:** *tvrdnja o TUĐEM sustavu ostari bez ijedne naše izmjene.*
   Ovaj put je zamalo proizvela **izmišljen posao**, a ne samo zastarjelu bilješku.

   ➕ **Ostatak koji JEST stvaran nije nestao nego se preselio:** `data.weakPassword` se i dalje
   **potpuno ignorira**, pa korisnik sa slabom lozinkom pri prijavi ne dobije **nikakav** znak.
   To nije kvar nego propuštena prilika; vodi se dolje u §Auth kao neobavezno.

---

## 🚚 SELF-HOST SUPABASE — **⚰️ OTKAZANO (Leon, 2026-09-01: „Nastavlja Supabase do daljnjeg!")** — zapis ispod je ARHIVA odluke, ne plan; Pro se nastavlja plaćati

> ### ⛔ NE PLANIRATI U SLJEDEĆIM SESIJAMA — ovo više NIJE „radi se odmah"
> **Leon, 2026-08-31:** *„ma ne, to ću na kraju mjeseca, sada oću iskoristit vrijeme da što više
> gradim iskreno jer na laptop moram skinut Linux i razne pizdarije pripremit… mijenjanje na
> laptop će ići za nekih mjesec dana otp."* ⇒ ciljano **~kraj rujna 2026**.
>
> **Nije odustajanje nego preraspodjela vremena.** Seoba ide na **Leonov vlastiti laptop** (8 GB),
> a priprema stroja (Linux, alati) je **njegova ruka i njegov trošak vremena** — dok to ne postoji,
> od nas ovdje nema posla. **Do tada sve vrijeme ide u cigle.**
>
> ⚠️ **Kad dođe na red, prvo provjeriti vrijedi li još IZVORNI razlog za žurbu** — *„prije nego
> faks krene"*. Odgodom od mjesec dana taj prozor vjerojatno prolazi; ako prođe, **žurbe više
> nema** i redoslijed se bira iznova, umjesto da se naslijedi.
> ⚠️ **Jedna stvar se ipak poklapa:** Supabase Pro ističe **~kraj rujna**, dakle otprilike kad je
> seoba planirana. To nije slučajnost — ista je računica i bila razlog. Ako se seoba pomakne
> dalje, provjeriti što s free-tier spavanjem (~7 dana neaktivnosti).

**Sve niže vrijedi kao PRIPREMA za taj dan, ne kao plan za sljedeću sesiju.**

> ### ⚠️ OVO NADILAZI SVE ISPOD (2026-08-30). Ispod je izvorni zapis od 2026-08-21 i ostaje kao
> obrazloženje ZAŠTO se ide; **kada** i **koliko** su presuđeni sada.
>
> **Odluka (Leon, 2026-08-30):** *„napravit ćemo seobu onda danas ili sutra (samo supabase)…
> iznajmit ću VPS. Samo backend će biti lokalni na iznajmljenom VPS-u. **Hostanje ostaje na
> Vercelu ne mijenjamo do daljnjeg!**"*
>
> **⚠️ ZAŠTO SADA, IAKO JE ZAPISANO „POSLIJE FRONTENDA":** *„zato sada radimo seobu prije nego faks
> krene da ne bude problema."* Prozor je akademski, ne tehnički — i zato nadjačava zapisani
> redoslijed. Bez ove rečenice sljedeća sesija vidi samo proturječje.
>
> #### Suženje opsega je UKINULO DVIJE OD TRI PREPREKE
>
> | zapisana prepreka | status |
> |---|---|
> | `vercel.json` je ugovor koji umire s Vercelom (`/sw.js` → `immutable` = zaključan SW na godinu) | ❌ **otpada** — ostajemo na Vercelu |
> | „push na `main` = produkcija" prestaje vrijediti | ❌ **otpada** — ostaje kako jest |
> | **self-host traži DVIJE instance** (prod + staging) | ✅ **STOJI, i sad je to glavna stavka** |
>
> #### Što je presuđeno, a što nije
>
> - **⚠️ 2026-08-30: PLAĆENI VPS VIŠE NIJE PRETPOSTAVKA.** Leon: *„gledo sam cijene, iskreno ne
>   isplati se baš, sada razmišljam da VPS sredim možda na svojem drugom laptopu, on ima 8 giga
>   rama."* **8 GB zadovoljava mjeru ispod** (dosta za prod + staging), pa RAM **nije** prepreka.
>   Prepreka je **što laptop u stanu nije poslužitelj**, i to su tri odvojena pitanja koja treba
>   riješiti PRIJE nego išta seli:
>   **① dostupnost izvana** — kućni IP je obično dinamičan i iza NAT-a (treba DDNS + otvoreni
>   portovi ili tunel), a **upload** kućne veze je ono što ograničava, ne RAM;
>   **② 24/7** — poklopac, spavanje, ažuriranja, nestanak struje: svaki od njih je **potpuni
>   ispad prijave i podataka**, ne usporenje;
>   **③ backup ne smije živjeti na istom stroju** (v. niže) — a kod kuće je najlakše upravo to.
>   ⇒ **Preporuka: `sokrat-staging` na laptop ODMAH** (ondje su sve tri točke bezopasne, a seoba
>   se uvježba na pravom stogu), **prod tek kad ① i ② imaju odgovor.** Odluka je Leonova.
> - **Mjera koja i dalje vrijedi za bilo koji stroj:** sedam kontejnera (Postgres · Kong · GoTrue ·
>   PostgREST · Realtime · Storage · Studio). **1 GB se ne diže · 2 GB tijesno i samo JEDNA
>   instanca · 4 GB udobno za jednu · 8 GB za prod + staging na istom stroju.** Uz to **NVMe**
>   (Postgres) i ≥ 2 vCPU.
> - **`sokrat-staging` SELI ZAJEDNO S PRODOM.** Ostane li staging u Cloudu dok prod ode na VPS,
>   write-testovi više ne gađaju isti stog kao produkcija — **pa prestaju biti brana**.
> - **⚠️ STARI PROJEKT SE NE GASI ISTI DAN — barem ~2 tjedna** (Leon: *„sviđa mi se tvoja
>   preporuka"*). Razlog je mehanički: **anon-ključ i URL su u `js/auth.js`**, a to preglednik drži
>   godinu dana (immutable cache, ADR-017). Korisnik sa starim `auth.js` **i dalje priča sa starim
>   Supabaseom** dok mu se cache ne osvježi.
> - **BACKUP JE NAŠ OD PRVOG DANA, i radi se ODMAH uz seobu** (Leon: *„odmah uz seobu to radimo"*).
>   Supabase Cloud na Pro planu backupira sam; **na VPS-u to ne radi nitko**. Treba `pg_dump` po
>   rasporedu **i kopija IZVAN VPS-a** — kvar diska je inače potpun gubitak korisnika i njihovih
>   materijala. ⚠️ Naš `npm run backup` je **aplikacijski** snimak (gzip-JSON), **ne** zamjena za
>   `pg_dump`.
> - **TESTOVI SU UVJET, NE DODATAK** (Leon: *„trebamo napraviti naravno testove"*). Seoba nije
>   gotova dok skup ne prođe **protiv nove instance**. Većinu već imamo i svi gađaju ono što im kažu
>   `.env` varijable: `test:storage` · `test:delete-account` · `rls-check` · `check:functions` ·
>   `check:final` · `load-probe` · `backup:verify`.
> - **⚠️ Najveći tehnički rizik: `delete-account`.** U self-hostu Edge Functions vrte se u zasebnom
>   Deno kontejneru koji je najmanje „upali i radi" od svega, a ta funkcija je **GDPR brisanje
>   računa** — pravna obveza, ne značajka.
> - **⚠️ PRVA PROVJERA prije bilo čega: jesu li URL-ovi slika APSOLUTNI.** Ako u sadržaju stoje s
>   domenom starog Supabasea, sve slike pucaju nakon prebacivanja i moraju se prepisati.
> - **Održavanje prelazi na nas TRAJNO** — zakrpe, SSH, vatrozid, TLS certifikat. Stalni trošak,
>   ne jednokratni. (Ista rečenica stoji i u izvornom zapisu ispod; sada je naplaćena.)
>
> #### Posljedica za druge stavke
>
> **A0 + A1 (prijava Google računom + prepravak dijaloga) IDU POSLIJE SEOBE.** Sve auth-stavke su
> Supabase konfiguracija; seoba mijenja URL, a time i redirect URI → prije seobe bi se radile
> dvaput. Time je **zatvoreno pitanje „self-host vs OAuth, redoslijed"** otvoreno 2026-08-24 —
> ne odlukom nego posljedicom.


### Izvorni zapis (2026-08-21) — obrazloženje ZAŠTO se ide

Povod je bio bijes na Pro-gating (*„ja ovim supcima neću meda dat"*), ali odluka stoji i bez njega.
Supabase je **open source** → self-host na VPS-u (~5 €/mj) otključava **sve Pro značajke**, uz
**isti kod, istu shemu i isti `supabase-js`**. To je jedina opcija koja **ne traži prepisivanje**.

**Odbačeno i zašto:** **PocketBase** (SQLite, vlastiti model pravila) i **Firebase / Cloudflare D1**
traže da se RLS i svih 10 `SECURITY DEFINER` RPC-ova napišu ispočetka — to nije seoba nego **rewrite
backenda**.

**Što je danas vezano za Supabase** (mjera cijene seobe, da se ne procjenjuje napamet):

| što | koliko |
|---|---|
| RLS politike | ~13, uz owner-check na svakoj tablici |
| `SECURITY DEFINER` RPC-ovi | 10 (`publish_document`, `publish_node`, `create_node`, `move_node`, …) |
| Edge Functions | 1 živa (`delete-account`) + 2 stranca za brisanje |
| Storage buckets s vlasničkim prefiksom | 2 (`node-images`, `lesson-images`) |
| Sadržaj u bazi | 51 red / 17 predmeta |
| Naši alati koji govore Supabaseu | `check:final` · `diff:db` · `check:functions` · `test:storage` · `test:delete-account` · `backup` · `migrate-content` |

**Zašto ne sada:** usred smo crvenog alarma za telefon koji je Leon sam proglasio prioritetom, i
ništa ne ide na produkciju dok to nije gotovo. Seoba backenda bi zamrznula **jedino što korisnicima
trenutno smeta**.

**Argument koji vrijedi neovisno o bijesu — i zbog kojeg ovo nije samo osveta:** self-host gasi i
**uspavljivanje baze nakon ~7 dana neaktivnosti**, koje nas već grize (app tad pada na datoteke,
prijava i sync ne rade). **Cijena koja se mora izreći: postajemo sami sebi DBA** — backupi,
nadogradnje, sigurnosne zakrpe, uptime. Za jednog autora usred redizajna to je stvarni trošak
vremena. ⚠️ **„Zato ovo čeka" je NADIĐENO 2026-08-30** — v. okvir iznad; red je došao,
a odluka je zapisana ovdje umjesto u ADR-u jer ne mijenja arhitekturu nego domaćina.

---

## ✅ RIJEŠENO — `css:diff` je mjerio samo POLA stranice (nađeno u T5 2026-08-22, zatvoreno 2026-08-29)

> **① Prijedlog ispod je IZVEDEN** kao **ALAT-1** (`81665d2`, prije C4): worktree-način je postao
> **zadani**, a `--css-only` je stari put koji sam upozorava da laže. Kriterij prihvaćanja iz
> prijedloga je i **naplaćen u polju**: C4b je premjestio vrijednosti iz CSS-a u markup na dvije
> površine i dobio **0 razlika izvan njih**.
>
> **② Ista je datoteka imala DRUGU rupu, i našla ju je tek C4b** (spec §10.3): alat je gledao
> **isključivo rutu `/`**, a `COLLECT` nasilno pali svaku `*-page` sekciju — pa je izgledalo kao da
> su sve stranice pokrivene, dok je pokriven bio samo njihov **markup iz `index.html`**. Sve što
> crta JS pri ulasku u rutu ondje **ne postoji**. Dodan **`CSS_DIFF_RUTE`**; ispis **uvijek**
> imenuje što je mjereno. **C5a–C7 moraju predati svoje rute**, inače mjere prazan ekran.
>
> **③ I TREĆA rupa, nađena u C5a/2 (2026-08-30) — ista datoteka, treći put.** Alat je nakon `load`
> čekao **fiksnih 700 ms**. Za landing i katalog dosta; rute **načina učenja** su prve na kojima
> nije, jer gradivo dolazi lijeno (DB → JSON → `.js`) iza zastora `#studyLoading`. Referenca i radno
> stablo mjerili su se u **dva različita trenutka** → prijavljeno **298 „razlika" i 420 elemenata
> koji postoje samo u radnom stablu**, nijedna naša. Zamijenjeno **uvjetom umjesto roka**; poslije
> popravka **9 razlika, sve namjerne**. Uz to dodan **`CSS_DIFF_SIRINE`** (tri zadane širine ne mogu
> dokazati ljestvu od jedanaest pragova — pouka C0/2, ovaj put na alatu).
> ⚠️ **Alat se NE SMIJE pokretati u dvije istovremene instance** — druga padne na podizanju
> poslužitelja.
>
> *Pouka koja preživljava sve tri: alat koji mjeri pola stranice ne kaže da mjeri pola — zato svaki
> mjerni izvještaj od sada imenuje SVOJ DOSEG. I: **triput zaredom je prvi kvar cigle bio u
> MJERAČU**, ne u cigli — u C5a/3 (2026-08-30) i to u mjeraču **pisanom iste sesije**, pa ni
> „naš alat" nije iznimka.*

Nalaz ispod je izvorni zapis iz T5 i ostaje kao obrazloženje.

**Što je nađeno.** `scripts/css-diff.js` presreće **stylesheet**, a HTML uzima iz **radnog
stabla**. Dok cigla mijenja samo CSS, to je točno. Čim cigla premjesti vrijednost **iz markupa u
CSS** (T5: dvoosna veličina heroja se utilityjem ne da napisati, jer utilityji stoje zadnji pa
pravilo iste specifičnosti uvijek gubi), njegova „referenca" postaje stranica koja **nikad nije
postojala**: **novi markup + stari CSS**.

**Mjera.** T5 je prijavio **46 razlika**, i to na **sve tri** širine — uključujući 768 i 1280 px,
gdje se dokazano **ništa** nije promijenilo. Izvještaj je tvrdio „naslov 32 px" — a to je gola
`h1` bez ijedne veličine, jer referentni bundle ne poznaje pravilo koje ju daje.

**Zašto to nije sitnica.** Ovo je **oblik cijele faze C4–C7**: svaka od tih cigli migrira
površinu na utilityje, dakle **svaka mijenja markup i CSS istovremeno**. Alat koji je za C1 dao
3438 usporedbi / 0 razlika za C4+ daje šum u kojem se prava regresija ne vidi. *Gate koji mijenja
samo jednu polovicu stranice mjeri stranicu koja ne postoji.*

**Kako se dotad dokazuje** (izvedeno u T5, radi): HEAD se posluži iz zasebnog **`git worktree`-a**
na drugom portu, pa se izračunati stilovi uspoređuju između **dvije stvarne verzije stranice** —
obje sa svojim markupom i svojim CSS-om. T5: **0 razlika na 768 i 1280 px**, 22 na 375 i sve do
jedne namjera cigle.

**Prijedlog (nije odlučeno):** `css:diff` dobiva `--ref <git-ref>` koji poslužuje **cijelo**
stablo te reference (worktree ili `git archive`), a ne samo bundle; današnje ponašanje ostaje
zadano. Cijena: sporije (dva servera) i traži čist `git worktree`. **Kriterij prihvaćanja:**
*cigla koja premjesti vrijednost iz markupa u CSS dobije 0 razlika na širinama koje nije dirala.*

⚠️ **Ne raditi usred faze TELEFON** — T6 je zadnja cigla i ne dira markup na taj način. Prirodno
mjesto je **pred C4**, jer ondje počinje niz cigli koje bi bez toga sve morale ručno dokazivati.

---

## ➖ Birač tema je bliže nego što spec tvrdi — blokira ga JEDNA od tri skupine (2026-08-18)

> ✅ **RIJEŠENO 2026-09-01:** FATALNO je pao na 0 još u MREŽA C4, a birač je isporučen
> danas (profil, „Izgled"). Ostatak zapisa stoji kao obrazloženje zašto je blokada bila
> samo prva od tri skupine.

Leon je pitao kad dolaze druge boje cijele stranice. Nalaz je da agregatna brojka
`check:palette` **mjeri točno, a savjetuje krivo**, jer u jedan zbroj trpa tri različite
posljedice — a birač blokira **samo prva**:

```
FATALNO (tekst nevidljiv na svijetlom)   ← JEDINO ovo blokira birač
plohe/rubovi (blijedo, ali ispravno)
stara paleta (neusklađeno, čitljivo)
```

⚠️ **Brojke ovdje NE STOJE, i to je namjera.** Prepisane su bile **24 / 28 / 61**, a u jednom
jedinom danu (2026-08-29) FATALNO je palo **24 → 18 → 11**. Ispisuje ih
**`npm run palette:breakdown`** pri svakom pokretanju — proza ih ne može pratiti.

Dug je **koncentriran, ne razmazan** — nekoliko datoteka nosi većinu, ostatak je pojedinačan; koje
su, ispisuje `palette:breakdown`. Nosiva tvrdnja koja se **nije** promijenila:
**birač NE ČEKA C4–C7, nego samo skupinu FATALNO** — posao od jednog popodneva, izdvojiv u
vlastitu ciglu kad god.

> ✅ **AŽURIRANO 2026-08-29:** FATALNO je istoga dana palo **DVAPUT** — brisanjem
> `subject-selector.css` (C4a) i popravkom devet zakucanih bjelina (§10.2) — na **manje od pola**
> onoga što je toga jutra blokiralo birač, i to **bez ijedne odluke o izgledu**. To je i razlog
> zašto brojke iz ovog odjeljka više ne stoje u prozi: ostarjele su unutar **jednog dana, dvaput**.
> ⚠️ **C4b (2026-08-29) NIJE dirao paletu i ne tvrdi da jest** — `browse.css` je već bio na nuli.

> ### ✅ PRESUĐENO 2026-08-30 (Leon: *„birač ide kako smo odredili"*)
> **Birač NE postaje zasebna cigla.** Nose ga cigle koje ionako dolaze — ponuđen mu je i treći put
> („samo tih 11 pravila, pola dana, teme rade odmah") i **odbio ga je.**
>
> **Izmjereno 2026-08-30 — 11 FATALNO, i evo tko ih gasi:**
>
> | datoteka | fatalnih | cigla |
> |---|---|---|
> | `quiz-section.css` | 2 | ⛔ **NE MOŽE C5a/3 SAMA** — v. bilješku ispod |
> | `progress-section.css` | 1 | ⛔ **NIJE MOGLA C5a/4** — `.reset-btn:hover`, isti razred |
> | `learn.css` · `learn-blocks.css` · `blind-map.css` | 3 | C5b — ali `blind-map` je **isti razred**, C5b može samo dva |
> | `profile.css` | 2 | C6 |
> | `home-section.css` · `sidebar.css` | 3 | **C6** (v. niže) |
>
> **Zaključak: birač može izaći nakon C6, NE nakon C7.** C7 je o `!important` i mrtvom kodu, ne o
> bojama. ⚠️ Brojka je od 2026-08-30 i **stari** — mjerodavan je `npm run palette:breakdown`.
>
> #### ⛔ NALAZ REVIZIJE (dopunjen 2026-08-30 poslije C5a/4): **SEDAM** redaka ove tablice VISE O JEDNOJ LEONOVOJ ODLUCI
> Prvo je nađeno na kvizu (`.answer-btn.correct` / `.wrong`), pa prošireno na cijelu listu: od 11
> fatalnih pravila **njih sedam ima isti uzrok** — `white`/`#fff` na ispuni `var(--danger)` ili
> `var(--success)`. Popis s datotekama i ciglama stoji **gore, uz samo pitanje** (§ZA LEONOVU
> ODLUKU). Ispravak traži tokene **`--on-success` / `--on-danger`, kojih NEMA** (postoji samo
> `--on-primary`), a hoće li ih uopće trebati ovisi o **„smiju li zelena i crvena uopće biti
> ISPUNA, ili samo obrub i tekst"** — ako je odgovor „samo obrub i tekst", ispuna nestaje i token
> ne treba nikad.
> **C5a/3 i C5a/4 ih zato NISU dirale**, i to nije propust cigli nego **ovisnost koju ova tablica
> nije imenovala.** Isto čeka `sidebar.css`, `profile.css`, `blind-map.css`.
> *Cigla ne može ugasiti pravilo čiji ispravak čeka odluku o izgledu.*
>
> #### ⚠️ NALAZ: dvije datoteke nisu pripadale NIJEDNOJ cigli
> `css/home-section.css` i `css/sidebar.css` su **u bundleu, a u planu ih nema** — `scripts/css-debt.js`
> ih nije nabrajao, pa ih nijedna cigla nije gasila, a drže **3 od 11 fatalnih**.
> **Leonova odluka (2026-08-30): „Ubaci" → ulaze u C6**, i u `css-debt.js`, inače ih alat i dalje
> ne vidi. *Datoteka koju alat ne nabraja ne postoji za plan, koliko god bila živa u pregledniku.*

---

## ✅ ~~`a11y.authed` (Studio) nije doveden do zelenog~~ — POTVRĐENO OKRUŽENJE, ZATVORENO 2026-08-16

**Ponovljeno na odmornom stroju: 3 prošla / 0 palo, Studio u 46,2 s** (`auth-setup` 5,7 s ·
„Moji materijali" 5,9 s · Studio 46,2 s; ukupno 1,0 min). Isti commit, isti helper, **bez ijedne
izmjene** — samo neopterećen stroj. Puna suita iza toga: **371 prošlo / 0 palo / 30 preskočeno**.

> 📏 **NORMALA TRAJANJA (nova navika, 2026-08-16; premjereno 2026-08-22): puna suita = 21,7 min ·
> `a11y.authed` = 1,0 min** (`workers: 1`, `fullyParallel: false`, **451 test + 72 preskočena** kroz
> 6 projekata — sve sekvencijalno). ⚠️ **Broj testova raste sa svakom ciglom** (bio je ~401 u
> kolovozu; T0–T5 su dodali branu telefona i tvrdnju landinga), pa se uz vrijeme uvijek bilježi i
> broj — inače „sporije nego prošli put" ne razlikuje **sporiji stroj** od **veće suite**.
> **Povod:** dnevnici su dosad bilježili KOLIKO je testova prošlo, ali nikad KOLIKO JE TRAJALO — pa
> se jučerašnje pitanje *„je li test pokvaren ili je stroj spor?"* nije dalo odgovoriti bez punog
> kontrolnog prolaza s izvornim kodom. **Broj bez normale ne može posvjedočiti o brzini.** Ubuduće
> uz svaki suite-rezultat ide i vrijeme.

**Time je hipoteza dokazana, a ne samo uvjerljiva:** ono što je jučer probijalo 300 s danas staje u
46 s, dakle **usporenje NIJE bilo regresija** nego iscrpljeno okruženje. Budžet od 300 s ostaje
(pet punih axe-analiza nad najtežom stranicom je stvarno skupo), ali sad je rezerva, ne potreba.

**Pouka koja preživljava stavku:** *„test pada" i „test ne stigne završiti" su dvije različite
tvrdnje.* Prva se rješava kodom, druga mjerenjem okoline — i razlikuju se samo kontrolnim prolazom
s **izvornim** kodom. Da taj kontrolni prolaz nije napravljen, popravak `smiri()` bio bi proglašen
neuspjelim i vjerojatno prepravljen još jednom, bez potrebe.

<details><summary>izvorni zapis (2026-08-15)</summary>

Puna suita nakon landing-cigle B: **370 prošlo / 1 palo**. Pad je bio **artefakt mjerenja**, ne kvar:
axe je uhvatio `#toastMessage` **usred fade-a** (`fg #868584 / bg #fdfcfb = 3.59`). Da je riječ o
prozirnosti a ne o boji dokazuje aritmetika — za `--color-ink-0` preko plohe izmjerena boja daje alfu
**0.527 · 0.527 · 0.522**, istu na sva tri kanala; toast je bio na ~53 % neprozirnosti, a prava boja
daje ~14:1. `smiri()` je **taj razred kvara već jednom popravljao, nepotpuno** (`finish()` se zvao
jednom, prije čekanja od 250 ms, a toast se skriva sam na tajmeru).

**Popravak je napisan i commitan** (`82e384f`): animacije se guraju u krajnje stanje u petlji **i još
jednom neposredno prije mjerenja**, uz izuzimanje **beskonačnih** animacija (spinnere `finish()` po
definiciji odbija → prva verzija petlje ih je čekala vječno i otjerala test iz 51 s u timeout).

⚠️ **Što NIJE dokazano:** test u okruženju te sesije **nije doveden do zelenog**. Prelazi 120 s, pa i
300 s. **Kontrolni prolaz s IZVORNIM `smiri()` — bez ijedne izmjene — premašio je 10 minuta**, pa
usporenje **nije regresija** nego iscrpljen stroj (ista datoteka je ranije istog dana trajala 2,6 min).
Testu je zato dan vlastiti budžet od 300 s, s obrazloženjem: pet punih axe-analiza nad najtežom
stranicom u aplikaciji.

**Kad:** prvo što treba napraviti u sljedećoj sesiji, **prije mergea C3 u `main`**. Ako i na odmornom
stroju pada — tek tada je nalaz, a ne okruženje.

</details>

---

## ✅ RIJEŠENO 2026-08-29 (C4a) — `css/subject-selector.css` — 22 pogotka `check:palette`

> **Datoteka je OBRISANA, ne popravljena.** Mjerenje pred C4 pokazalo je da **39 od 44** klase ne
> spominje ni markup, ni JS, ni gradivo, ni test — nosila je zaslon s dvije ponude predmeta i
> STARU `about` stranicu. Preostalih pet klasa **gazilo je** `pages.css` (uvozila se poslije
> njega) i držalo tri ikone na `about`-u s kontrastom **1.13** u zadanoj temi. S njom je otišlo
> svih 22 pogotka palete i **47 od 49** preostalih `!important`. Puni zapis: spec §10.1.

### Zatečeno stanje kad je stavka otvorena (2026-08-15)

> ⚠️ Naslov je do 2026-08-24 pisao „22 od preostalih **126**"; osnovica je od tada **125**
> (cigla §9.15 zamijenila indigo glow tokenom). **Ukupan broj ovdje više ne stoji** — zna ga
> `npm run check:palette`; brojka 22 je o OVOJ datoteci i nju gate ne prepisuje.

Isplivalo pri popravku tinte na pločicama predmeta (spec §7.14). Isti obrazac koji je ondje popravljen
na tri površine: `color: white` + gradijenti **stare palete** (`#6366f1`, `#8b5cf6`) zakucani u CSS-u.
Najveći pojedinačni ostatak u čegrtaljci — **22 od 126**.

⚠️ **Ovdje je pozadina zapisana U CSS-u**, pa ju je `check:palette` i vidio; to je razlika u odnosu na
pločice, gdje je ploha dolazila iz podatka kroz inline `style` i gate ju je proglasio bezopasnom.

**Kad:** uz **C4** (Browse + lekcije), gdje ta datoteka ionako dolazi na red.

---

## ✅ ~~Objediniti PRED-OBRADU prije `renderBlocks`~~ — ISPUNJENO 2026-08-10

Zatvoreno popravkom [BUG-024](./BUGS.md) (`5f77a88`): `renderContentBlocks()` je sad **jedini ulaz za prikaz**
sadržaja, a **izvorna brana** u `tests/unit/blocks-renderer.test.js` pada ako itko opet zove `renderBlocks(`
izravno. Ista revizija je iznijela i [BUG-025](./BUGS.md) (`779f26b`) — tekst stavki uopće nije dolazio do
sigurnosne granice. **Ostatak zamisli je odrađen:** prijeđeni su svi tipovi blokova (slika ✅ · KaTeX ✅ —
admin-pregled ga nije tipografirao · tablica/video/legacy-html: bez pred-obrade po konstrukciji).

---

## ✅ ~~Prijavljene površine nemaju NIJEDAN vizualni gate~~ — ZATVORENO 2026-08-14 (C3, spec §7.10)
**Riješeno prvom ciglom C3-a, PRIJE ijedne CSS-izmjene.** `tests/a11y.authed.spec.js` skenira
7 prijavljenih stanja × 5 tema = **35 mjerenja**; gate-logika je zajednička s odjavljenim
gateom (`tests/helpers/axe-gate.js`, ADR-027). **Pao je na prvom pokretanju i našao tri kvara**
(`role="tree"` bez `treeitem` = critical · `<li>` bez liste = serious · color-input samo s
`title` = serious), svi popravljeni. Obrnuto provjeren vraćanjem zakucane tamne plohe.
Skica ispod je izvorni zapis duga i ostaje kao obrazloženje.

<details><summary>izvorni zapis duga (2026-08-14)</summary>

**Nalaz (popravak C2, spec §7.9):** kad je zadana tema postala svijetla, Studio i „Moji materijali"
postali su **nečitljivi** (`.st-icard` = **1.00**, doslovno ista boja teksta i plohe), a **sva tri
postojeća gatea su šutjela**. Statičke brane su popravljene istog dana (tvrda zabrana #3), ali
**rupa u dinamičkoj provjeri ostaje otvorena**:

- **axe (`tests/a11y.spec.js`)** posjećuje `#materials-page` — ali **odjavljen**, gdje se vidi
  poziv na prijavu, a stablo se nikad ne iscrta. Do **`#editor-page` ne dolazi nikad.**
- Svi studio/editor testovi su **`.authed.spec.js`** i **ne vrte axe** — provjeravaju ponašanje,
  ne izgled.
- Posljedica: **sve iza prijave je vizualno neprovjereno.** To je površina cijelog C3 (editor,
  materijali) i dijela C6 (profil), dakle upravo ono što slijedi.

**Zašto ovo nije „dodaj još testova":** statička zabrana #3 hvata **zakucane** plohe, ali ne i
kvar koji nastane iz **kombinacije tokena** (npr. tinta preko tinte, ili token uveden bez
provjere — v. `--primary-light`, zabrana #2). Za to treba mjerenje u pregledniku, na prijavljenoj
stranici.

**Skica:** proširiti `test:authed` jednim spec-om koji nakon prijave otvori `#materials-page` i
`#editor-page`, **prođe kroz sve četiri teme** (`data-theme` se postavlja iz JS-a) i pusti axe na
`color-contrast`. Traži `TEST_ADMIN_*` iz `.env` i gađa STAGING, kao ostatak authed-suite.
⚠️ **Prije mjerenja gurnuti animacije u krajnje stanje** (`getAnimations().finish()`) — inače se
ponavlja lov na duha iz §7.8.

**Kad:** uz **C3**, jer C3 ionako prepisuje te površine i bez ovog gatea nema kako dokazati da ih
nije razbio. **Veže se na** [FRONTEND_REDIZAJN §7.9](../archive/FRONTEND_REDIZAJN.md).

</details>

---

## ✅ ~~Vanjske skripte bez SRI i bez pina~~ — ZATVORENO 2026-08-14 (`check:cdn`)

**Nalaz je bio o PRAVILU, ne o pet nedostajućih atributa.** Projekt ima tvrdu politiku točnog
pinanja (`save-exact=true`, `.nvmrc`, `check:lockfile`), nastalu jer je raspon `^` pustio da
upstream objava razidje razrješenje ispod nas. Ta je politika pokrivala `package.json` — dakle
**alat, koji nikad ne dođe do korisnika.** Šest datoteka koje se doista izvršavaju u korisnikovu
pregledniku nije pokrivalo ništa: Font Awesome, KaTeX (CSS ×2 + JS + auto-render) i DOMPurify bez
SRI, a MathLive s **golog `npm/mathlive`** = „uvijek najnovija". Brana je čuvala ono što ne može
nauditi i nije čuvala ono što može. Komentar iznad MathLivea je pritom tvrdio da je uvjet
ispunjen (*„vendorana/CDN kao KaTeX"*) — a KaTeX **jest** bio pinan; kod je kršio vlastiti
zapisani uvjet dok je proza tvrdila suprotno, što je gore od nezapisanog duga.

**Drugi, suptilniji nalaz — jedini koji je već imao SRI.** `supabase.min.js` **ne postoji u npm
paketu**: jsDelivr ga generira vlastitim minifierom na zahtjev (dokaz: nema ga u file-listingu, a
„minificirana" inačica je 208.196 B = **292 B veća** od objavljene 207.904 B). SRI je time bio
pinan na **izveden artefakt tuđeg build-koraka**. Dan kad jsDelivr promijeni minifier, hash pukne
→ `onerror` → po komentaru u `auth.js` *„auth se tiho ugasi"*, tj. **prijava umire bez poruke i
bez ijednog crvenog gatea**. Sad se pokazuje na objavljenu `supabase.js` (manju!), čiji je sha256
provjeren protiv jsDelivrovog listinga → hash se mijenja **samo s verzijom**.

**Isporučeno:** SRI + `crossorigin` na svih 5 tagova · MathLive pinan na **0.110.0** (bajt-identično
onome što je goli URL posluživao) · supabase preusmjeren na izdavačevu datoteku · **`npm run
check:cdn` u preflightu** (3 lokalne provjere) + `check:cdn:live` (mrežna, 4. provjera).
Svih 7 hasheva **unakrsno provjereno protiv izdavačevih objava** prije upisa — SRI izračunat iz
kompromitiranog preuzimanja pinao bi kompromitaciju. Obrnuto provjereno: gate pada na svaki od
tri načina, a provjera „izvedene datoteke" okida **i kad je SRI točan**.

**Pouka (ista kao kod `check:contrast`):** *gate koji provjerava NEKE ovisnosti stvara tihu
pretpostavku da su provjerene SVE.* Politika je postojala godinu dana; nedostajala je samo
rečenica koja kaže **na što se odnosi**.

---

## 🔥 Vježbe nemaju svoj frontend — 2026-08-14
**Leon:** *„trebat ćemo napraviti i exercises dobro u frontendu kasnije."*

Engine vježbi (7 tipova) je **funkcionalno gotov i svet** — ne mijenja se za sadržaj (BUG-012,
ADR-018). Ono što nedostaje je **prikaz**: vježbe su jedina velika površina koju redizajn dosad
nijednom nije spomenuo — nisu u tablici cigli C0–C7 i nemaju ni jedan vizualni gate.

**Pet predmeta ih ima** (`accounting` · `math` · `statistics` · `academic-writing` ·
`macroeconomics`), dakle to nije rub nego petina kataloga.

**Kad:** **C5b** (gradivo i vježbe) — ondje se ionako dira put renderiranja. **Prije toga treba
odlučiti opseg**, jer je danas neodređen: je li to prolaz kroz tokene i razmake, ili prepravak
interakcije (unos odgovora, provjera, koraci rješenja). ⚠️ **Granica se ne pomiče:** izgled se smije
mijenjati, `generate()`/`answer()`/`type` **ne**.

> ### ⚠️ 2026-08-20 — „VJEŽBE SU KÔD" JE OBORENO MJERENJEM (smjer: **RECEPTI**)
>
> Puni zapis: [`FRONTEND_REDIZAJN.md` §9.5](../archive/FRONTEND_REDIZAJN.md). **Radi se TEK nakon
> cijelog frontenda** (Leon, 2026-08-20) — ovdje stoji samo da se sljedeća sesija ne vrati na
> početak.
>
> Učitano svih pet packova: **234 vježbe — 151 (65 %) je čisti PODATAK**, samo **83 (35 %)**
> ima funkciju, i to **uvijek istu jednu: `generate(p)`**. Presudno: **`params` su već
> deklarirani kao podatak u svih 83, bez iznimke** — od deset ključeva vježbe **devet je već
> shema**, kôd je samo **formula**. *Shema je od prvog dana bila deklarativna i nitko to nije
> primijetio.*
>
> **Smjer:** formula ne briše se i ne prevodi u novi jezik nego **seli iz vježbe u imenovanu,
> verzioniranu knjižnicu recepata** (`recipe: 'sample-sd'`). Time vježba postaje **100 %
> podatak** → baza, JSON, `publish_document`, skidanje, MCP, editor — **bez ijedne iznimke**, a
> **BUG-012 se smije umiroviti**. Migracija je **samoprovjerljiva**: starih 83 generatora
> ostaju proročište (isti parametri → identičan izlaz).
>
> **Odbačeno i zašto:** evaluator izraza (traži da napišem i osiguram parser, a pokriva 93 %
> umjesto 100 %) · sandbox za korisnički JS (ruši ADR-018 u korijenu; prava cijena nije sandbox
> nego to da **tuđi `generate` odlučuje o ocjeni**).
>
> **Dvije stvari protiv, obje u dizajn od prvog dana:** recept je **dijeljena ovisnost** (mijenja
> sve vježbe koje ga koriste → imenovan, verzioniran, dodaje se a ne mijenja) · **ne zna se
> koliko ih je** (83 generatora → 20? 40?) — **to je jedina brojka koja odlučuje o cijeni** i
> mjeri se prije obveze.
>
> **Pouka (treći put ista):** *agregatna brojka mjeri točno, a savjetuje krivo.* „Vježbe su kôd"
> bilo je istinito za **7 %**, a blokiralo je odluku o svih 100 %.

---

## ➖ „Akademsko plavo" i „Papir" izgledaju isto — tema nije temperatura sivih — 2026-08-14
**Leon:** *„akademsko plavo i papir su isti kurac."* **Izmjereno i potvrđeno:** razlikuju se u
**18 od 21 tokena**, ali sve su razlike mikroskopske, a presudna je ova:

| token | academic | paper |
|---|---|---|
| ploha | `#f7f9fc` | `#faf9f6` |
| tinta | `#0e1a2b` | `#1b1a17` |
| **marka** | `#1657d0` **plava** | `#2c5fd6` **plava** |

**Marka im je ista boja.** Dijeli ih samo temperatura neutrala → to nisu dvije teme nego **jedna
tema s klizačem za balans bijele**.

**Pravilo koje iz toga slijedi:** *identitet teme nosi AKCENT, ne toplina sivih.* Prijedlog (prošao
kroz maketu, **nije** kroz `check:contrast`): **academic** plava · **paper** **sepija** `#7a4b1f` ·
**chalk** kredasto žuta · **mint** tirkiz.

⚠️ **Zašto sepija, a ne crvena ili zelena:** crvena se sudara s `--color-danger`, zelena s
`--color-ok`. **Znak teme ne smije značiti isto što i status.** Sepija je uz to boja koju papir
prirodno nosi.

**Prije primjene:** `check:contrast` mora presuditi (AA po temi + hue-odvojenost „točno" od marke
≥25°). Tirkiz je najtješnji slučaj — provjeriti razmak prema `--color-ok`.

---

## ✅ ~~Studio na telefonu — dva gumba su IZVAN ekrana i nedostupna~~ — ZATVORENO 2026-08-19 (K2b, spec §8.8)
**Izmjereno** (390 × 844, otvorena lekcija, staging):

| mjera | vrijednost |
|---|---|
| topbar | **347 px od 844** — 41 % ekrana |
| mrvica (`.st-crumb`) | stupac **96 px širok, 326 px visok** |
| stvarni sadržaj (`.st-canvas`) | **235 px** (28 %) |
| `.st-btn.ghost` („Uredi") | `[335…402]` — strši **12 px** |
| `.st-chip` („objavljeno") | `[414…497]` — **posve izvan** |
| `.st-iconbtn` (postavke) | `[509…523]` — **posve izvan** |

**Zašto se ne vidi kao skrol:** `#editor-page.studio-page.active` je `position:fixed; inset:0` uz
`overflow:hidden` — sadržaj se ne prelije nego **odreže**. Nema skrola jer nema kamo; gumbi su
naprosto nedostupni. Kvar stoji **od U8**, nije regresija ove faze.

**⚠️ Zašto je `layout.authed.spec.js` zelen — rupa je u MOJOJ brani.** Detektor izuzima podstabla u
`position:fixed`, uz obrazloženje *„vlastiti koordinatni sustav, ne može uzrokovati skrol dokumenta,
a (a) to ionako mjeri"*. **Premisa ne vrijedi kad fiksna ljuska ima `overflow:hidden`:** provjera (a)
nikad ne okine, pa je izuzeta **cijela površina Studija**. To je **treći put** da isti detektor
griješi na isti način — izuzeće čija premisa ne vrijedi (§7.11 ①,②). **Prvi korak popravka je brana,
ne CSS:** fiksna podstabla se moraju mjeriti prema *viewportu* (mogu biti odrezana i nedostupna),
samo ne prema skrolu dokumenta.

**Drugi, neovisan nalaz na istoj površini:** [`studio.css:90`](../../css/studio.css#L90) traži
`.st-tree{ display:none }` ispod 680 px i **nikad nije radilo** — medijski upit ne dodaje
specifičnost, a bazno `display:flex` (l. 96) stoji **ispod** njega pa pobjeđuje redoslijedom.
Susjedni `.st-inspector` u istom bloku radi **samo** zato što njegovo bazno pravilo uopće ne
deklarira `display`. ⚠️ **Ne popravljati mehanički:** Studio nema mobilni izbornik za stablo, pa bi
„ispravno" ponašanje ostavilo telefon **bez ijednog načina da se odabere lekcija**. Slučajni kvar
danas drži funkciju živom → traži **odluku o dizajnu** (izbornik vs. složeni raspored), ne zakrpu.

**✅ ZATVORENO K2b-om (2026-08-19), i to kao NUSPOJAVA, ne kao zaseban posao.** Leon je presudio da
globalna traka Studija **spoji** s postojećom umjesto da se složi iznad nje: identitet i položaj
(natrag, znak „Sokrat STUDIO“, mrvica) otišli su gore, Studiju su ostale radnje nad dokumentom.
Izmjereno poslije, isti uređaj (390×844): `.st-topbar` **347 → 57 px**, canvas **235 → 326 px**,
kontrola izvan ekrana **2 → 0**. ⚠️ Da je traka išla IZNAD (kako je spec dotad tvrdio), canvas bi pao
na **~171 px** — cigla bi kvar **pogoršala**. Brana: `tests/studio-chrome.authed.spec.js`
(obrnuta provjera **2/2 pada**).

**⛔ OSTAJE OTVOREN drugi, neovisan nalaz iz istog odjeljka:** `.st-tree` je i dalje `display:flex`
na telefonu (**354 px** nakon K2b) jer medijski upit ne dodaje specifičnost. Ne popravljati mehanički
— Studio nema mobilni izbornik za stablo, pa bi „ispravno“ ponašanje ostavilo telefon bez ijednog
načina da se odabere lekcija. Traži **odluku o dizajnu**.

> ⚠️ **ISPRAVAK 2026-08-26 — ovdje je pisalo „→ K4“, a taj pokazivač je od P2 prazan.** K4 je
> **potrošen** (utopio se u P2: ista pločica, isti ekran), ali P2 je dirao **policu**, ne
> **Studio** — ovaj nalaz stoji netaknut. *Zastarjeli pokazivač je gori od zastarjele činjenice:
> upućuje sljedeću sesiju da je nešto riješeno.* Odluka o Studiju na telefonu je **neraspoređena**
> i ne pripada nijednoj otvorenoj cigli.

---

## ✅ ~~Panel čvora u Studiju je na telefonu ČISTA REDUNDANCIJA~~ — RIJEŠENO 2026-08-19 (K4a, spec §8.10)

> **Riješeno isti dan.** Leon: *„treba se toga riješiti na neki način da se ništa ne sjebe. Pa
> zbog toga ne možeš ništa raditi na telefonu u editoru, apsolutno ništa."* Izmjereno prije
> popravka (390×844): ljuska **522–540 px = 62–64 % ekrana**, canvas **304–323 px**. Poslije:
> canvas **679 px**, ljuska u čvor-modu **165 px = 20 %**. Rez je išao po modu — čvor-mod je
> panel izgubio bez zamjene, katalog-mod ga je dobio kao **ladicu** s kvakom u traci. Brana:
> `tests/studio-mobile.authed.spec.js` (3 testa, uklj. tvrdnju da je **stolno računalo
> nedirnuto**). Zapis ispod ostaje kao dijagnoza.

## 🔥 ~~Panel čvora u Studiju je na telefonu ČISTA REDUNDANCIJA~~ — 2026-08-19 (Leon, uz snimku)

Leon: *„ovo smeće u editoru koje se mora maknut na telefonu, ne kužim koja je ovo pička
materina nepotrebna."*

**Što je to točno.** [`js/studio.js:136`](../../js/studio.js#L136) — `.st-tree` u **čvor-modu**
(`_node` postoji) crta naslov „📁 Moji materijali", karticu s **imenom materijala** i
podnaslov „Osobni materijal — vidiš ga samo ti".

**Zašto je to redundancija, a ne ukras.** Na istom ekranu telefona ime materijala piše
**tri puta**: u globalnoj mrvici (`Moji materijali › Matematika`), u toj kartici, i u `H1`
canvasa odmah ispod. Panel pritom troši visinu na uređaju gdje je visina najskuplja —
mjereno u K2b, `.st-tree` je **354 px**.

**⚠️ OVO RAZRJEŠAVA BLOKADU K4, I TO ISPRAVLJA MOJU RANIJU TVRDNJU.** Do sada je ovdje i u
specu stajalo da se `.st-tree` ne smije sakriti na telefonu jer bi *„telefon ostao bez
ijednog načina da se odabere lekcija"*. To je **točno za KATALOG-mod** (`_node == null`,
admin bira predmet i lekciju iz stabla) i **netočno za ČVOR-mod**, gdje panel nije
navigator nego prikaz **jednog jedinog** elementa koji je već imenovan dvaput iznad.
*Jedna tvrdnja pokrivala je dva različita moda i zato je pola vremena bila kriva.*

**Iz toga slijedi rez:** čvor-mod → panel se na telefonu **briše bez zamjene** (ništa se ne
gubi). Katalog-mod → i dalje traži odluku o dizajnu (mobilni izbornik za stablo), ali to je
**admin-put na telefonu**, dakle mnogo rjeđi slučaj i ne blokira K4.

⚠️ Uz to: `display:none` ispod 680 px u `studio.css` **nikad nije radio** — medijski upit ne
dodaje specifičnost, a bazno `display:flex` stoji ispod njega. Popravak mora to uzeti u
obzir, inače „makni na telefonu" opet neće ništa napraviti.

---

## ✅ ~~Skrolabilna ploha bez `tabindex` — `.lb-table-wrap` nije dostupan tipkovnicom~~ — ZATVORENO 2026-08-31 (MREŽA B3c)
**Riješeno:** `tabindex="0"` + `role` + `aria-label` na oba mjesta (v2 `renderTable` + v1
`wrapLegacyTables` u `js/blocks-renderer.js`), i isti recept za AKTIVNOG nositelja —
`.katex-display` u `renderMath()` (9× serious → 0). ⚠️ Dvije skice odavde je mjerenje oborilo:
`role="region"` (landmark → `landmark-unique` šum s ponovljenim imenima; otišao `group`) i
„uvjetan tabindex" (popravak je bezuvjetan — uvjetnost bi tražila resize-listener za kvar
kojeg pri širem prikazu nema, a zaustavna točka na formuli/tablici ima ime pa nije šum).
A11y brana od B3b sudi po WCAG razini i pokriva macro na 375 px; osnovica je prazna.
Izvorni zapis (povijest):

2026-08-14
**WCAG 2.1.1:** ploha koja skrola mora biti operabilna tipkovnicom, inače korisnik koji ne rabi miš
ne može doći do desnog dijela tablice. axe to pokriva pravilom `scrollable-region-focusable`
(**serious**). `.lb-table-wrap` — i onaj iz v2, koji postoji **od U7** — nema `tabindex="0"`.

**Zašto nijedan gate nije pisnuo:** axe u `a11y.spec.js`/`a11y.authed.spec.js` mjeri na **1280 px**,
gdje tablica stane i ploha **ne skrola** — a pravilo se okida tek kad prelijev stvarno postoji.
**⚠️ Dopuna iz mjerenja (MREŽA B3a, 2026-08-31):** javni spec od faze TELEFON vrti na **375 px**
(gornja tvrdnja vrijedi još samo za authed projekt) — ali tablice i na 375 px svugdje STANU
(0 preljeva od 9 wrapova), pa je ovaj zapis **latentan**. Aktivni nositelj istog prekršaja su
**`.katex-display` formule** (9× serious/wcag2a na macro + entrepreneurship — površine koje se ne
skeniraju). Brojke i posljedice za B3b/B3c: `docs/archive/RJESAVANJE-PROBLEMA-9MJ.md` §4·B3a.
Novi `layout.authed.spec.js` mjeri prave širine, ali on ne vrti axe.
**To je treći primjerak istog obrasca u tri cigle zaredom** (§7.9 boja · §7.10 teme · §7.11 širina):
**gate koji mjeri jedno stanje tvrdi nešto o jednom stanju.**

**Popravak** nije samo `tabindex="0"` — traži i pristupačno ime (`role="region"` + `aria-label`),
inače čitač ekrana najavi „regija" bez ičega. I treba biti **uvjetan**: `tabindex` na svaku tablicu
koja NE skrola dodaje beskorisne zaustavne točke tipkovnice. Dakle mali runtime-prolaz, ne CSS.

**Kad:** **C5b** (gradivo i vježbe) — tamo se ionako dira `learn-blocks.css` i put renderiranja.
**Prije toga:** proširiti a11y gate barem jednom uskom širinom, inače se popravak ne može dokazati.

---

## ✅ ~~Landing šalje 240 KB editorskog koda posjetitelju bez računa~~ — ZATVORENO 2026-08-24 (T6)

> **✅ ISPUNJENO ciglom T6** (spec §9.13): editor je dobio **vlastitu stranicu** (`editor.html`),
> pa posjetitelj bez računa više ne dobiva nijednu editorsku datoteku. Mjereno: **mrežom
> 234 → 164 KiB** (ispod zadanog budžeta od 200), **sirovo 755 → 519 KiB**, **41 → 36 skripti**,
> editorskih datoteka na putu **7 → 0**.
>
> ⚠️ **Brojka „3,7× preko budžeta" iz ove stavke bila je u KRIVOJ JEDINICI** — računata je na
> sirovim bajtovima, a budžet dolazi iz Lighthouse-postavke, koja mjeri **prenesene**. U
> ispravnoj jedinici zatečeno stanje bilo je **1,17×**, ne 3,7×. Stavka je dakle bila **točna u
> smjeru, kriva u mjeri**; ostavlja se zapisana jer je pouka općenita: *agregat u krivoj jedinici
> može mjeriti točno i savjetovati krivo* (isti razred kao `palette:breakdown`).
>
> **➕ NASTAVAK, 2026-09-04 — ostatak tereta je otišao ciglom „učitavanje po ruti".** T6 je
> maknuo EDITORSKI kod; ostali su načini učenja, vježbe, slijepa karta, profil i materijali —
> koje posjetitelj također ne vidi dok ne klikne. `js/loader.js` ih šalje na njihov događaj.
> **Mjereno prije i poslije, kako ova stavka i traži:** prvi kadar **41 → 22 skripte**,
> **234 → 112,7 KiB** mrežom (`check:budget`), FCP lokalno **5820 → 4236 ms** (isti poslužitelj).
> Brana je proširena da mjeri **oba** puta — inače bi je selidba tereta u lijeni put oborila
> bez ijednog obrisanog retka.
>
> **Najvažnije: sada postoji GATE.** `npm run check:budget` (u preflightu) čuva **sastav**
> (nijedna editorska datoteka na posjetiteljevu putu) **i težinu** (≤ 200 KB prijenosa). Ova je
> stavka devet dana rasla upravo zato što ga nije bilo — *stavka bez gatea ne stoji na mjestu
> nego klizi*, i to je zapisano niže, u njezinoj vlastitoj povijesti.

<details><summary>Povijest mjerenja (zadržana — pokazuje kako je brojka rasla)</summary>

**Izmjereno** (profil telefona 390 px, prazan cache, nekomprimirano, lokalni server):
dokument 66 KB · **skripte 821 KB kroz 45 zahtjeva** · stilovi 242 KB · **ukupno 1.173 KB**.
Od skripti je **241 KB (38 %)** editorsko/admin: `studio.js` (50) · `block-editor.js` (53) ·
`block-editor-media.js` (30) · `admin.js` (45) · `admin-editors.js` (35) · `draft-store.js` (18) ·
`node-images.js` (6) · `card-limits.js` (2). Još **119 KB** su modovi i vježbe, kojih na landingu
nema. Svih 38 je **sinkrono**, bez `defer`, u `index.html`.

**📏 PREMJERENO 2026-08-19 (K2b):** **728 KiB u 41 lokalnoj skripti**, od toga **232 KiB = 31 %**
editorsko (`studio` · `block-editor` · `block-editor-media` · `admin` · `admin-editors` · `draft-store`),
**38 bez `defer`**. ⚠️ **Brojka je NARASLA otkad je stavka otvorena** — `main` nosi 691 KiB, grana 728 KiB.
Nijedna cigla je nije pogoršala namjerno; rasla je kao nusprodukt K1/K2a/K2b i cigli landinga.
*Stavka bez gatea ne stoji na mjestu nego klizi* — zato je „JS-budžet landinga kao gate" u §8.5
zapisan kao posao koji ne ovisi ni o jednoj cigli i može se ubaciti kad god.

**📏 PREMJERENO PONOVNO 2026-08-20: 744,6 KiB u 41 skripti · 38 bez `defer` · 238,2 KiB (32 %)
editorsko u 6 datoteka.** Putanja je time **691 → 728 → 744,6** — brojka **nijednom nije pala**,
i to bez ijedne namjerne izmjene. Budžet koji si je projekt sam zadao je 200 KB → **3,7×**.
**Dobila je mjesto: cigla T6** ([§9.3](../archive/FRONTEND_REDIZAJN.md)), i ondje **nije čišćenje
nego preduvjet faze „POLICA"** — offline ljuska ne smije nositi editor koji offline student
nikad ne otvori.

**Zašto je ovo nalaz, a ne mišljenje:** projekt si je u ovom istom dokumentu (sekcija „Brutalan
bar", #1) zadao budžet **„JS ≤ ~200 KB"** i označio ga 🔥 *„Blokada, ne upozorenje."* Gate nikad
nije izgrađen, pa je stvarnost danas **4× iznad vlastitog praga**. To je **isti obrazac koji je
proizveo §7.9**: pravilo zapisano, mjerač ne postoji. ⚠️ FCP je uredan (**224 ms** toplo) — cijena
nije u prvom pikselu nego u **parsiranju na slabom telefonu i u 45 zahtjeva na mobilnoj mreži**.
*(Prvo mjerenje u istoj sesiji dalo je FCP 2984 ms; to je bio hladan start preglednika, ne stranica.
Zapisano jer je pouka: jedno mjerenje bez ponavljanja nije mjera.)*

**Kad:** uz **C3** — C3 ionako prepisuje površinu tih istih datoteka, pa je odvajanje s kritičnog
puta najjeftinije baš tada. Uz to **budžet kao gate**, da brojka nikad više ne poraste tiho.

</details>

> ⚠️ **STAVKA OSTAJE OTVORENA — 2026-08-15.** Spec §7.13 je tvrdio da se zatvara sama, jer da živi
> prikaz u herou nosi taj teret. **Izmjereno pri brisanju demoa: ne nosi ga.** Demo je bio čisti
> `textContent`/`createElement` i nije dodirivao nijednu editorsku datoteku; tih **234,2 KB**
> učitavaju obični `<script src>` na dnu `index.html`, bezuvjetno, i danas ih je jednako mnogo kao
> jučer (landing = **654 KB u 39 js-datoteka**). **Pretpostavljena uzročnost preživjela je reviziju
> jer je zvučala uzročno; oborila ju je jedna naredba.** Ako netko ovu stavku opet pokuša zatvoriti
> „usput", traži mjerenje prije i poslije.

---

## 🔥 CSP je odgođen „do UGC-a" — a UGC je na produkciji — 2026-08-14
Zapis u ovom dokumentu (sekcija „Hardening v1") glasi: *„CSP + DOMPurify — tek uz UGC (Faza 6),
ne prije (**sadržaj autorski/trustiran**)."* DOMPurify je isporučen, ali **CSP nije**, a uvjet pod
kojim je odgoda dana **više ne vrijedi**: osobni graditelj („Moji materijali") je na produkciji,
korisnik piše sadržaj koji renderira `blocks-renderer.js`, i sadržaj **nije više autorski**.
Odgoda je istekla sama od sebe i nitko je nije podigao jer je stajala označena 💤.

`vercel.json` danas ima `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` i
`Permissions-Policy` — **CSP je jedina koja fali**, i jedina koja bi ograničila štetu ako escape
negdje popusti (v. BUG-025, gdje granica **jest** popustila godinu dana neopaženo).
⚠️ Nije trivijalno: inline `onload` na KaTeX-linku, inline `gtag` blok i tri CDN-a (cdnjs,
jsdelivr) traže ili `nonce` ili preseljenje.

**Ažurirano 2026-08-14:** SRI je isporučen (v. zatvorenu stavku gore), pa je **jedan od tri
problema riješen**: `script-src` više ne mora vjerovati hostu na riječ — svih 7 podresursa je
pinano i hash-provjereno, a `check:cdn` drži da tako ostane. Preostaju **inline `gtag` blok** i
**inline `onload` na KaTeX-linku**. SRI i CSP se **ne zamjenjuju**: SRI kaže „ova datoteka je
točno ta", CSP kaže „nijedna druga se ne smije učitati". Bez CSP-a injektirana `<script>` s
posve drugog hosta i dalje prolazi.

**Kad:** **C6** (profil/auth/pravne/consent) — tamo se ionako dira `consent.js` i inline gtag.

---

## 🔥 M5 — duljina kartice: vođenje u editoru + strop 500 — 2026-08-07
**Nalaz (Leon, živi pregled):** *„trebat ćemo poradit na ograničenju koliko jedna kartica ima teksta."*
Nije bio kriterij faze „Materijal od nule do učenja" pa je preživio njeno zatvaranje — **odluka je već pala,
samo izvedba čeka.**

**Izmjereno prije odluke** (5379 kartica u `data/json/`): pitanja **0** preko 200 znakova (max 134) → nisu
problem · odgovori **2487 = 46,2 %** preko 200 · 928 preko 300 · **48 preko 500** (max 736; **25 jedinstvenih**,
ostalo su kopije u `final`). Razliveno kroz **sve** predmete → **standard je platformski problem, ne suradnikov.**
**Posljedica: tvrdo ograničenje na 200 srušilo bi gotovo pola kataloga** → ne dolazi u obzir retroaktivno.

**ODLUKA (Leon 2026-08-07): tvrdi strop = 500 znakova**, uz mekano vođenje na 200. U **dva koraka**, i
redoslijed je bitan:
- ~~**M5a — vođenje u editoru**~~ ✅ **NA PRODUKCIJI od 2026-08-08** (faza „Mjera i zaborav",
  `eee6f14`). Brojač uživo · upozorenje 200 · tvrda blokada 500 ·
  vrijedi u oba svijeta jednom promjenom (Studio nema vlastiti editor kartica). Politika = `js/card-limits.js`
  (jedna definicija za editor i validator). `validate:content` dobio raspodjelu duljina. Detalji:
  [archive/MJERA_I_ZABORAV.md](../archive/MJERA_I_ZABORAV.md).
- ~~**M5b — zatezanje**~~ ✅ **IZVRŠENO 2026-09-01 (MREŽA-E2)** — 25/25 skraćeno, `maxLength: 500` u shemi, unit veže broj na `HARD`. Izvorni zadatak: skratiti **25 zatečenih** kartica (detalj → learn, po standardu
  kartice: `entrepreneurship` 28 · `traffic` 6 · `food-nutrition` 4 · `sit` 4 · `ebusiness` 2 · `math` 2 ·
  `te2` 2) → **tek tada** `maxLength: 500` u `schema/subject-content.schema.json`.
  ⚠️ **Obrnut redoslijed = `validate:schema` crven = CI blokiran.**
- Uz to: `validate:content` dobiva izvještaj o raspodjeli duljina (brojka, ne gate) da se vidi trend.

**Veže se na:** kartica-standard u [architecture/CONTENT_SCHEMA.md](../architecture/CONTENT_SCHEMA.md)
(kratke definicije <200 znak., detalj → learn). [[content-model-standard]]

## ✅ RUČNO ČEKA LEONA — **SVE IZVRŠENO 2026-08-28**
Tekst ispod ostaje jer objašnjava **zašto su stavke postojale**, ne kakvo je stanje.

> **✅ Obje obrisane, provjereno DVJEMA neovisnim metodama:** popis funkcija ih više ne vraća, a
> `npm run check:functions` dobiva **404** preko HTTP-a i prvi put je **ZELEN**
> („produkcija ima točno ono što repozitorij opisuje"). **`delete-account` je netaknut** i i dalje
> traži JWT (401) — a to je bio jedini stvarni rizik, jer su se **dvije funkcije zvale isto** i
> razlikovao ih je samo **slug**.
> ➕ Istog dana i **min. lozinka 6 → 8** te **leaked password protection UKLJUČENA**
> (advisori **16 → 15 WARN**). ⚠️ Zadnje dvoje ovisi o **Pro planu, koji traje ~mjesec dana.**

1. **Obrisati `bright-function` i `quick-api`** — Supabase Dashboard → Edge Functions → `<ime>` → Delete.
   **Nalaz je ozbiljniji nego što je zapisano 2026-08-09:** `bright-function` ima **sha256 `49363e4b…`,
   identičan `delete-account`-u** → to je **drugi, nezapisani endpoint koji nepovratno briše račun i sve
   podatke**, aktivan na `/functions/v1/bright-function`. Sam po sebi nije rupa (identitet i ondje ide
   isključivo iz JWT-a, `verify_jwt: true`), ali je **stara kopija destruktivnog koda**: sljedeći guard
   koji dobije `delete-account` — kao što je `eee6f14` dodao zaštitu da se admin ne obriše sam — kopija
   **neće dobiti**, a i dalje će raditi. Zato ovo nije kozmetika nego dug s rokom trajanja.
   ✅ **Gate postoji:** `npm run check:functions` (bez ijednog ključa; 401 = postoji, 404 = obrisano).
   Danas je **crven** i pokazuje obje; pozelenit će čim se obrišu, i ubuduće hvata svakog novog stranca.
   Claude nema alat za brisanje Edge Functiona (MCP ima samo deploy/get/list).

   > **📅 ODGOĐENO DO C6 — svjesno, uz uvjet (Leon, 2026-08-13).** Leon: *„to u nekoj drugoj fazi, tipa
   > kada budemo gotovi sa 75 % frontend razvoja."* **Odgoda se dala provjeriti, zato je prihvaćena:**
   > jedini stvarni rizik čekanja je **divergencija** (da `delete-account` dobije guard koji ne stigne do
   > kopije), a kroz C3–C7 nijedna cigla ne dira Edge Functione — mijenja se CSS oko sučelja. Rizik
   > odgode je tijekom frontend faze **nula**.
   > **Vezano uz C6, ne uz postotak:** C6 je *profil, auth, pravne, consent* — cigla koja ionako radi na
   > površini brisanja računa (≈ 8. od 9 cigli ≈ 78 %, dakle Leonova brojka, ali s povodom).
   > **⚠️ UVJET KOJI PONIŠTAVA ODGODU:** dirne li itko `supabase/functions/delete-account/` prije C6 —
   > briše se **odmah**, jer tad divergencija prestaje biti hipotetska.
   > **Nije otvorena rupa i to je izmjereno, ne pretpostavljeno:** gate radi **bez ijednog ključa**, pa
   > je njegov vlastiti **401** dokaz da funkcija traži JWT; identitet i ondje ide iz `getUser()`.
   > Pozivatelj može obrisati **samo vlastiti račun** — što može i kroz sučelje.
   >
   > **⚠️ PRIJE BRISANJA (nije u izvornom zapisu, dodano 2026-08-13):** provjeriti **je li ih itko ikad
   > pozvao** (`query_logs`, read-only, minuta). Backlog je dosad govorio samo „obriši", a nula poziva
   > pretvara pretpostavku „zaboravljena kopija" u činjenicu; ne-nula mijenja priču, a brisanje uklanja
   > i trag. Uz to pročitati tijela obje funkcije (`get_edge_function`) — o `quick-api` znamo najmanje.
   >
   > **🔧 Klasa, ne slučaj:** ovo je sjedilo danima jer `check:functions` **nikad ne trči sam** (mrežni,
   > izvan preflighta). A gate **ne treba nijedan ključ** → nema razloga da ne bude zaseban CI job
   > (nightly ili na push na `main`). Tad bi bilo crveno u Actionsima isti dan. ~1 h posla, rješava klasu.
2. ✅ ~~**Re-sync `macroeconomics`**~~ — **IZVRŠENO 2026-08-21** (Leon pokrenuo
   `node scripts/migrate-content.js macroeconomics`; skripta traži `service_role`, a taj put je
   Claudeu blokiran).
   **Što je bilo:** baza i datoteke razlikovale su se u **točno jednom znaku** u `macroeconomicsM1` i
   `macroeconomicsFinal` — index 207, `goodsMarket.flashcards[5].answer`, ćirilično `С` (U+0421) vs
   latinično `C` (U+0043), duljina ista (246); `macroeconomicsM2` je već bio identičan. Oku nevidljivo,
   ali pretraga po „MPC" tu karticu nije nalazila, a `diff:db` je trajno šumio.
   **Rezultat:** `diff:db macroeconomics` **3/3 identično, 0 razlika** · `check:final` **16/16**
   (`final == M1 ⊕ M2 (+examPractice)` drži i dalje).
   > ⚠️ **Pouka o redoslijedu, ne o znaku.** `migrate-content.js` radi **upsert = piše preko baze**, a
   > admin kroz Studio smije uređivati živi sadržaj → re-sync naslijepo može pojesti tuđu izmjenu, a
   > `content_versions` je **audit, ne undo**. Zato je radnja imala tri koraka i samo je treći pisao:
   > `diff:db` (dokaz da nema živih edita — razlika **ista kao 11 dana ranije**) → `--dry` (dokaz da
   > su brojke očekivane) → prava naredba. **Provjera prije upisa je bila jeftinija od bilo kakvog
   > oporavka poslije njega.** Isto vrijedi za svaki sljedeći re-sync bilo kojeg predmeta.
   >
   > **Ništa se nije commitalo ni deployalo, i to nije previd:** poravnata je **baza**, datoteke su
   > izvor istine i već su bile ispravne. Bez `npm run bump`, bez commita — produkcija ostaje
   > netaknuta.
3. ✅ **Uključiti Leaked Password Protection — NAPRAVLJENO 2026-08-28.**
   > ⚠️ **Ova je stavka dvaput bila kriva, i to u SUPROTNIM smjerovima.** Prvo je 11 dana stajala
   > kao izvediva radnja, iako je Pro značajka a org je bila `free` — poslala bi Leona da traži
   > kontrolu koja ne postoji. Onda je prepravljena u „NIJE stavka za ruku", što je **postalo
   > netočno čim je org prešla na `pro`**, i po tome se planirao posao (~30 redaka HIBP koda) koji
   > više nije trebao. *Tvrdnja o TUĐEM sustavu stari bez ijedne naše izmjene — mora se provjeriti,
   > ne pamtiti.* Advisor je danas više ne prijavljuje (16 → 15 WARN).
   > ⚠️ **Vrijedi dok traje Pro (~mjesec).** Poslije seobe na self-host provjeri iznova; HIBP u
   > kodu ostaje rezerva.
   **Zamijenjena je radnjom koja JEST izvediva na free planu:** Dashboard → Authentication →
   Sign In / Providers → **Minimum password length 6 → 8** (forma traži 8, ali `minlength` je
   pravilo **preglednika**; serverski minimum je zadanih 6). ⚠️ Polje *Password Requirements* **ne
   dirati**, i **prije toga popraviti `WeakPasswordError`** — v. zasebnu stavku „Leaked password
   protection — rješivo BESPLATNO" gore, gdje stoji i HIBP izvedba u našem kodu.
   **Advisori: 0 ERROR**, sve WARN (v. §Advisori dolje).

## ➖ Sigurnosni advisori na PROD-u — 0 ERROR, 16 WARN (snimljeno 2026-08-10)
Ostavljeno svjesno, ali zapisano da se ne izgubi:
- **`snapshot_content_version` i `handle_new_user` dostupni `anon`-u.** Oboje su **trigger-funkcije** —
  izravan RPC poziv im nema smisla, ali su u izloženoj shemi. Popravak = `REVOKE EXECUTE … FROM anon`;
  **ne dira trigger** (okida se pravima vlasnika tablice, ne pozivateljevim).
  ⚠️ **`is_admin()` se NE smije revokeati `authenticated`-u** — RLS politike ga zovu kao pozivatelj, pa bi
  gubitak EXECUTE-a slomio admin-upis. Za `anon` treba provjeriti gazi li ijedna politika nad javno
  čitljivim tablicama kroz `is_admin()` prije nego se dira.
- **`set_updated_at` bez fiksnog `search_path`** — standardno kaljenje (`SET search_path = ''`).
- Ostali WARN-ovi su naši owner-scoped `SECURITY DEFINER` RPC-ovi koje `authenticated` **mora** moći zvati
  (ADR-024: jedini put upisa) → očekivano, ne popravlja se.

## ✅ RLS ponovno računa `auth.uid()` za SVAKI redak — **14** politika — 2026-08-14 → **RIJEŠENO 2026-08-31 (MREŽA A1, na produkciji)**
**Nalaz iz Supabaseovog PERFORMANCE-advisora**, koji dotad nitko nije pogledao — svi dosadašnji
zapisi (§Advisori gore) tiču se **security**-advisora. Trinaest politika zove `auth.uid()`
**po retku** umjesto `(select auth.uid())`, čime Postgres gubi mogućnost da poziv izračuna
jednom po upitu (`initPlan`):

| tablica | politike |
|---|---|
| `nodes` | select · insert · update · delete |
| `node_content` | select · insert · update · delete |
| `progress` | select · insert · update · delete |
| `profiles` | select |
| `node_content_versions` | select |

**Zašto je to baš SAD važno:** cijena se mjeri **brojem korisnikovih redaka**, a ADR-029 je UGC
proglasio glavnim proizvodom. Danas, s malo čvorova po korisniku, razlika je nemjerljiva —
korisnik s 500 čvorova plaća 500 evaluacija po upitu. **Ovo je jedini nalaz u reviziji koji
postaje SKUPLJI što se duže čeka**, i jedini koji `load-probe` ne bi otkrio, jer probe mjeri
prazne račune.

Popravak je **jedna zagrada po politici** i ne mijenja semantiku (`(select auth.uid())` vraća
istu vrijednost). Uz to: dva **neindeksirana strana ključa** (`content_versions_edited_by`,
`node_content_versions_edited_by`) — sitno, ali audit-tablice samo rastu, nikad se ne prazne.

**✅ ISHOD (2026-08-31, cigla MREŽA A1, staging pa PRODUKCIJA uz Leonov OK):** advisor
`auth_rls_initplan` **14 → 0 WARN** · oba indeksa stvorena · `test:authed` **93/93** ·
`test:storage` **8/8** · broj redaka nepromijenjen. Uz to je skinut `EXECUTE` s
`handle_new_user` i `snapshot_content_version` → security **15 → 11 WARN**.
Datoteke: `supabase/c3-rls-initplan.sql` + `supabase/a1-grants-indexes.sql`.
⚠️ **Brojka je bila 14, ne 13** — SQL je oduvijek mijenjao svih 14; pogriješila je proza.
⚠️ **`REVOKE` je morao ići i `FROM PUBLIC`** — ACL je nosio `=X/postgres`, pa bi revoke samo od
`anon, authenticated` ostavio pravo netaknuto. Detalji: `docs/archive/RJESAVANJE-PROBLEMA-9MJ.md` §3.

## ➖ Broj pitanja na landingu ne pokriva sve predmete — 2026-08-09

> **PREMJERENO 2026-08-25:** stavka je i dalje otvorena, ali su joj brojke ostarile — predmeta
> je **24**, ne 22. `data/landing-stats.js` sam to i priznaje: `subjectsCounted: 17`. Dakle
> raskorak je **veći** nego kad je stavka pisana, a ne manji.
**Nalaz (uz popravak broja predmeta):** landing sad točno piše **22 predmeta**, ali „**5.700+ pitanja**"
dolazi iz `scripts/compute-stats.js` koji **namjerno broji samo primarni (EN) program** — da prijevode
ne broji dvaput. Dok je i broj predmeta bio 17, to je bilo dosljedno; sad više nije.

**Dvije opcije, obje imaju cijenu:**
- **Ostaviti** — brojka podcjenjuje, ali nikoga ne obmanjuje. *(preporuka; „22 predmeta / 5.700 pitanja"
  samo izgleda nespretno.)*
- **Brojati sve** (~7.000+) — dosljedno s brojem predmeta, ali **dvaput broji isto gradivo** na dva jezika.

Pravo rješenje je vjerojatno treće: brojati pitanja **po programu** i prikazivati ono koje odgovara
jeziku sučelja. To traži da `compute-stats.js` emitira mapu po programu umjesto jednog broja — nije
veliko, ali nije ni jednoredno. **Veže se na frontend redizajn**, gdje se ionako presuđuje što hero piše.

## ➖ Akcent kartice = CIJELA kartica u boji, ne samo rub — 2026-08-07
**Nalaz (Leon, živi pregled M3b):** *„mislio sam da cijela kartica bude crvena a ne samo rubovi ali nema veze."*
Odgodio je izričito („nema veze"), ali je **očekivanje jasno i vrijedi ga zapisati dok je svježe**:
boja stavke bi trebala **obojati plohu**, ne samo je obrubiti.

**Zašto je izvedeno kao rub.** M3b je posudio jezik od `.lb-tint` (rub + tinta 10 %), koji je nastao za
**learn-blokove** — ondje blok teče unutar teksta pa puna ploha ne dolazi u obzir. Kartica je **samostalan
objekt** i podnijela bi punu boju; kviz i dopuna vjerojatno ostaju na rubu, jer su gušće složeni.

**Prepreka koju treba riješiti prije izvedbe:** lice kartice je **zasićen indigo gradijent**
(`linear-gradient(135deg, var(--primary), var(--primary-dark))`). Puna boja ondje znači **zamijeniti**
gradijent akcentom (npr. gradijent izveden iz `--item-acc`), a ne slojevati preko njega — inače se boje
sudaraju. To dira izgled svih 22 predmeta, pa traži Leonovu presudu o smjeru, ne samo CSS.

**Veže se na:** ugovor boja [UGC_SPEC §3](../product/UGC_SPEC.md) (trebao bi reći **kako** se akcent crta,
ne samo da postoji) i na **frontend redizajn**, gdje se ionako presuđuje izgled kartice.

## ✅ Brisanje računa — self-service „Obriši račun" (GDPR pravo na zaborav) — 2026-07-04

> **NA PRODUKCIJI od 2026-08-08** (`eee6f14`; Edge Function `delete-account` ACTIVE na PROD-u).
> Izvedba slijedi skicu ispod, uz **tri ispravke koje je stvarnost nametnula**:
> ① kaskadno brisanje se **ne piše ručno** — svi FK-ovi prema `auth.users` su već `on delete cascade`,
> pa je jedini pravi posao Storage; ② Supabase **odbija obrisati vlasnika objekata u Storageu**, pa
> „slike prije korisnika" nije redoslijed radi urednosti nego preduvjet; ③ **admin se ne može obrisati
> sam** — posjeduje `lesson-images`, pa bi mu `deleteUser` pao **nakon** brisanja osobnih slika i ostavio
> poluobrisan račun; guard zato stoji prije ijednog brisanja (sve-ili-ništa). Nativni self-delete RPC
> (točka ⚠️ na dnu) **ne postoji** — provjereno u dokumentaciji 2026-08-08.
> Detalji: [archive/MJERA_I_ZABORAV.md](../archive/MJERA_I_ZABORAV.md).

**Izvorni nalaz i dizajn-skica (2026-07-04), zadržano radi obrazloženja:**
**Nalaz (korisnik, 2026-07-04):** app NEMA self-service brisanje računa. Postoji samo (a) „Delete cloud data" gumb
(`js/profile.js:deleteCloudData` — briše `progress` retke preko anon+RLS, odjavi) i (b) tekst „za brisanje računa
pošalji mail". To je nedovoljno za live proizvod s EU korisnicima (GA/Sentry aktivni). **Ne radi se sad** (korisnikova
odluka), ali je prava planirana stavka.
**Odlučeni put:** **Supabase Edge Function** (ADR-016 — `service_role` NIKAD u Vercel; pravilo: privilegirano → Edge Function).
**Dizajn-skica (kad uđemo u to):**
1. **Edge Function `delete-account`** (Deno, na Supabaseu). `service_role` iz Supabase secrets (`supabase secrets set`), nikad u gitu/frontendu.
2. **Verifikacija identiteta u funkciji:** iz `Authorization: Bearer <JWT>` (šalje `supabase.functions.invoke`) → klijent s tim JWT-om → `auth.getUser()` → **provjeren** `user.id`. **NIKAD ne vjeruj `user_id` iz body-ja** (eskalacija privilegija).
3. **Kaskadno brisanje:** prvo `progress` (i buduće UGC tablice) za taj `user.id`, pa `auth.admin.deleteUser(user.id)`. Redoslijed: podaci → auth (orphan-safe). Razmotriti DB `ON DELETE CASCADE` na FK prema `auth.users`.
4. **Frontend (`js/profile.js`):** „Delete account" (danger) gumb → dvostruka potvrda (upiši email ili „DELETE") → `functions.invoke('delete-account')` → uspjeh: lokalni `signOut` + očisti localStorage napredak + toast + redirect na landing.
5. **GDPR tekst:** `privacy.html` — opisati self-service brisanje (što se briše, nepovratno). Odlučiti o mail-fallbacku.
6. **Soft- vs hard-delete:** MVP = **hard-delete** (doslovno „pravo na zaborav"); soft-delete (grace period) tek ako zatreba.
7. **Test:** RLS-test proširiti (ne-vlasnik ne briše tuđe); ručni E2E na test-računu. ⚠️ Ne u iPhone-touch Playwright matrici (pravi auth se preskače) → ručno + scratch.
**⚠️ Provjeriti pri gradnji:** ima li Supabase do tada **nativni „delete self" RPC** (tada ni Edge Function ne treba `service_role`).
**Gdje pripada:** uz **F4** (prvi backend-privilegij + `/api`/Edge šav) ili kao zaseban „compliance" zadatak koji možda vrijedi gurnuti ranije (live je s pravim korisnicima). [[foundation-pivot]]

## ➖ Supabase Auth — rate-limiting / brute-force zaštita prijava — 2026-07-10
**Nalaz (korisnik, 2026-07-10):** spriječiti da netko udara login endpoint (npr. 10.000 pokušaja prijave).
**Put (dashboard-only, bez koda):** Supabase Auth (GoTrue) ima ugrađene rate-limite → **Auth → Rate Limits** (po IP-u/satu za login/signup/reset/token-refresh) — provjeriti i pojačati po potrebi. Opcionalno **Bot/CAPTCHA zaštita** (hCaptcha/Turnstile) u Auth settings za signup/login. Primijeniti na **PROD i staging**.
**Kad:** ne sad (nema napada, baza mala); planirano prije šireg rasta / uz **F6 sigurnost** (CSP/DOMPurify/UGC). Sitno, brzo — čim bude prometa vrijedno uključiti.
**+ Leaked Password Protection (advisor-nalaz, 2026-07-12):** Supabase Auth provjera lozinki protiv HaveIBeenPwned je ISKLJUČENA (WARN na oba projekta) → uključiti u istom dashboard-prolazu (Auth → Password security), PROD i staging.

## 🧱 Hardening v1 + perf (2026-06-29) — sad u [FOUNDATION_PLAN.md](../archive/FOUNDATION_PLAN.md) Faza 1/3
Nalazi iz `archive/SONNET_REVIEW_2026-06.md` (vanjski review; **provjereni protiv koda** — #7 display=swap je bio NETOČAN, već postoji).
Tretiraj `archive/SONNET_REVIEW_2026-06.md` kao prijedloge za provjeru, ne istinu. Konkretne stavke (Faza 1C / 3 u FOUNDATION_PLAN):
> **✅ STATUS: F1 1C stavke ISPORUČENE + LIVE (2026-06-30):** sigurnosni headeri, „Works offline"→„No install needed", `loadProgress` schema-merge (u `storage.js`, ne analytics), „400+"→dinamičan (`compute-stats.js`), mrtav `lessonCategoryMap`→`{}`. Preostaju 💤 (CSP/DOMPurify/CSS-bundling/PWA-ikona/SW = Faza 3/6).
- 🔥 **Sigurnosni headeri** (`vercel.json`): makni deprecated `X-XSS-Protection`; dodaj `Referrer-Policy: strict-origin-when-cross-origin` + `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- ✅ **„Works offline" copy** — RIJEŠENO + ✅ **DEPLOYANO NA PRODUKCIJU 2026-07-05** (F3 3A, main `868dc9f`): Service Worker (`sw.js` offline app-shell) + 3A.3 update-flow (Fable, ADR-019) → copy „Works offline"/„Radi offline" LIVE.
- ➖ **`loadProgress` schema-merge** (`js/analytics.js`): `{ ...defaultProgress, ...JSON.parse(saved) }` — otpornost na pokvaren/stari localStorage.
- ➖ **„400+" dinamički** (`index.html` ×3): izračun `questionCount` iz kataloga (kao `subjectCount`).
- ➖ **Mrtav `lessonCategoryMap` entry** (`js/config.js`) — vidi nalaz 2026-06-18 niže (PAZI: objekt JE referenciran u `navigation.js:545`).
- 💤 **CSP** + **DOMPurify** — tek uz UGC (Faza 6), ne prije (sadržaj autorski/trustiran).
- ✅ **CSS bundling** (26 `@import` → 1 `styles.bundle.css`, `build-css.js`) + **auto version-bump** (`bump-version.js`) — ISPORUČENO (F3 3B/3C.1, 2026-07-05, grana `foundation/f3`). ⬜ Ostaje 3C.2 (auto-bump na Vercel deploy-u).
- 💤 **PWA maskable ikona** — odvojena ikona sa safe-zone paddingom (sonnet #15).

### „Brutalan bar" — 5 nadogradnji (2026-06-29, korisnik: „ne zdrav nego jeben i brutalan"; FOUNDATION_PLAN §7)
Iznad „zdravog" temelja — ono što ga čini elitnim. Sve u postojeće faze, trošak alata 0 €:
- 🔥 **TVRDI CI gateovi (#1)** — Lighthouse budžeti (Perf≥0.95/A11y≥0.95/LCP≤2s/JS≤~200KB) + axe-core (0 serious) + Playwright `toHaveScreenshot` baseline. **Blokada, ne upozorenje.** [F1 1D, pojačano F3]. BUG-015 bi ovo ulovilo.
  - ✅ **axe a11y gate** (`tests/a11y.spec.js`) — GOTOVO 1D.2 (popravljen 1 serious: sidebar tabindex).
  - ✅ **layout-regression guard** (`tests/layout-guard.spec.js`, deterministička geometrija, 13 širina × 2 jezika) — GOTOVO 1D.3, hvata BUG-015 klasu, platform-neovisno.
  - ⬜ **Pixel `toHaveScreenshot`** — ODGOĐEN: baseline ovisi o platformi (Win lokalno ≠ Linux CI), nema Dockera/CI-token pristupa za Linux-baseline ovu sesiju. Plan kad bude moguće: (a) Playwright Docker image lokalno, ILI (b) `workflow_dispatch` job `--update-snapshots` koji commita `-linux` baseline (GITHUB_TOKEN write). Determinističke provjere (a11y+layout-guard+postojeći overflow sweep) dotad pokrivaju regresije.
- ✅ **Sentry + release-tracking (#2)** — GOTOVO + LIVE (2026-07-01, F2 2E): `js/monitoring.js`→`window.SokratMonitor`, consent-gated, Loader EU/DE, samo hvatanje grešaka (Tracing/Replay/Logs off), `sendDefaultPii:false`, release `sokrat-study@…`; uživo verificiran. ⬜ opc.: mail-alert prag na dashboardu.
- ✅ **RLS test (#3)** — GOTOVO 1E: `scripts/rls-check.js` read-only protiv POSTOJEĆE baze (besplatno). ⬜ **Ephemeral Supabase branch** (izolirani test + migracije na branchu) ODGOĐEN: **traži Pro plan $25/mj** (provjereno; org je free, branch compute $0.01344/h tek nakon Pro) → kad/ako Pro.
- 💤 **CRUD versioning + audit-log + dry-run diff (#4)** — undo/povijest/kočnica za source-of-truth flip. [F4 4E].
- 💤 **SRS dizajn-dok PRIJE koda + FSRS (#5)** — `docs/SRS_PLAN.md`; 2024+ algoritam, ne nabacani SM-2. [F5 5.0].

## ➖ Accounting → JSON format migracija (F2 2A ostatak; 2026-07-02)
Jedini predmet koji NIJE na JSON dual-readu (17/18 migrirano, LIVE). **Svjesno odgođen** — korisnik zasićen
računovodstvom (pravilo: ne dirati Accounting osim izričito). Postupak kad dođe red (čisto mehanički, ~5 min):
`npm run export:json accounting` → u `data/catalog.js` accountingu dodaj `dataFormat: 'json'` (iza `resolve`,
PRIJE `codeScripts`) → bump `catalog.js?v=` u index.html → gate (verify/validate:schema/export-check/Playwright).
Vježbe (41, `data/accounting/exercises.js`) ostaju `.js` — codeScripts već postavljen (BUG-012).

## ➖ Code-review nalazi (2026-06-18) — čišćenje, ništa kritično
Pregled cijelog koda (korisnik tražio): stanje vrlo dobro, bez bugova. Sitni dug za počistiti kad zgodno:
- ➖ **Mrtav `lessonCategoryMap`** (`js/config.js`): referencira `entrepreneurship` lekcije `second-exam-prep`/`final-exam-prep`
  koje više ne postoje (catalog je na `first-midterm`/`second-midterm`/`final`). Bezopasno — `js/navigation.js` pada na „sve kategorije".
  **Akcija:** obrisati entry (par redaka) ili cijeli `lessonCategoryMap` ako ga ništa drugo ne koristi.
- 💤 **`resolveExercise` robustnost** (`js/exercises.js:~489`): ako randomizirani `generate()` baci, vraća bazni `ex` (bez `fields`) →
  vježba bi se prikazala prazna. Idealno: sakriti/označiti. Trenutno netriggerirano (naši `generate` su čista aritmetika).
- 💤 **Stari root `data-*.js`** (12 sem-2 datoteka) nisu lazy-splitani po lekcijama kao noviji predmeti — namjerno (ADR-006), migracija u Bloku B.
- 💤 **cloud-sync „broj→max"** (`js/cloud-sync.js:60`) pretpostavlja monotone brojače; ispravno za sad, ali pažnja pri budućim ne-monotonim numeričkim poljima.

## ✅ GOTOVO (2026-06-13) — Auth prelazak na email+lozinku
**Implementirano po dogovoru od 2026-06-12** (detalji: `docs/records/PROGRESS.md` 2026-06-13 + `docs/architecture/BACKEND.md` §Staza B):
email+lozinka (signUp/signInWithPassword), email potvrda obavezna, magic-link UKLONJEN, ime pri registraciji
(`display_name`, na profilu i nav gumbu), Forgot/Change password, pravne stranice ažurirane. Baza nepromijenjena.
**Ručni korak korisnika:** Supabase dashboard → Auth → Providers → Email → min duljina lozinke 8.
**✅ LIVE — deployano 2026-06-13 (`ca06158..51e4e7b`, uz izričito odobrenje korisnika); deploy gate ispunjen.**

**Ostaje za kasnije:**
- **Google login** (uz lozinku; treba korisnikov OAuth client u Google Cloud Consoleu).
- **Onboarding anketa pri ulasku u sustav** — korisnikova ideja (2026-06-12); veže se na budući backend za izradu
  sadržaja iz PDF prezentacija (admin/ingest alati).

## ✅ ZAVRŠENO — Sadržaj 2. god (sem 1): restruktura na K1 / K2 / finalni → CIJELA 2. GODINA 8/8
**Status (2026-06-13):** semestar 2 = **4/4 KOMPLETNO**, semestar 1 = **4/4 KOMPLETNO** → **2. godina HM = 8/8 predmeta.**
**Accounting ✅** (3 lekcije + reusable Exercises sustav, 41 vježba; `docs/architecture/EXERCISES_ENGINE.md`), **Tourism Economics `te2` ✅**
(restrukturiran + rebuild iz PDF-ova, LIVE), **E-Business ✅** (split + obogaćivanje iz 14 PDF-ova; finalni 15 kat/152 fc; **LIVE `51e4e7b`**),
**Entrepreneurship ✅** (2026-06-13: split + 4 nove kategorije + obogaćivanje iz 11 PDF predavanja; finalni **15 kat / 175 fc / 134 quiz /
80 fill** — najveći predmet; **LIVE `8a37404`**). **▶ Dalje = 1. GODINA** (vidi [[content-roadmap-sequencing]]).
**⚠️ Korisnik je ZASIĆEN računovodstvom (2026-06-12) — ne vraćati se na Accounting (ni Final-tab ni USAR/USALI klasifikaciju) osim izričito.**

**Obrazac (kao Marketing/Geo/F&N):** po predmetu — utvrditi K1/K2 granicu iz silabusa/materijala → sadržaj podijeliti
na `first-midterm` (K1) + `second-midterm` (K2) → **finalni = hibrid** `Object.assign({}, K1, K2, { examPractice })`
(učitava se ZADNJI). Catalog: 3 lekcije + 3 scripta + `resolve`. Bump `CONTENT_VERSION` + `catalog.js`/`content-loader.js`
`?v=`. Verify + strukturni validator + Playwright (+ ciljani render testovi K2/finalni). **Treba: izvorni materijali +
silabus po predmetu.** (Napomena: ADR-006 „ne preslagivati stare root-predmete do Bloka B" — ova odluka to nadjačava
za sadržajno upotpunjavanje; migracija u bazu i dalje ide JEDNOM u Bloku B.)

| Predmet | sem | Trenutno (lekcije → podaci, kategorija/flashcards) | Što treba |
|---|---|---|---|
| ~~**Tourism Economics** (`te2`)~~ ✅ **GOTOVO** | 1 | **3 lekcije** `first-midterm`/`second-midterm`/`final` (`data/te2/`, te2M1/te2M2/te2Final); finalni **11 kat / 135 fc / 94 quiz / 66 fill** | ✅ Restrukturirano + **REBUILD iz 10 PDF predavanja** (2026-06-12): K1=Units 1–6 (5 kat, +nova `forecasting`), K2=Units 7–12 (5 kat) + `examPractice`. Ispravljena činjenica (price = najkritičnija). ✅ LIVE (`ca06158`) |
| ~~**Entrepreneurship** (`entrepreneurship`)~~ ✅ **GOTOVO** | 1 | **3 lekcije** (`entrepreneurshipM1`/`entrepreneurshipM2`/`entrepreneurshipFinal`, `data/entrepreneurship/`); finalni **15 kat / 175 fc / 134 quiz / 80 fill** | ✅ Split (stari točan ali tanak) + **4 nove kat.** (creativity W3, financing W5, franchising W6, developing W13) + obogaćen iz 11 PDF-ova (2026-06-13). K1=Weeks 2–7, K2=Weeks 9–13. **LIVE 2026-06-13 (`8a37404`)** |
| ~~**Accounting** (`accounting`)~~ ✅ **GOTOVO** | 1 | **3 lekcije** (`accountingM1`/`accountingM2`/`accountingFinal`) + **41 interaktivna vježba** (`data/accounting/exercises.js`) | ✅ Restrukturirano + Exercises sustav (2026-06-12, LIVE `a6b6fb0`). Opcionalno: Final exercises-tab, USAR/USALI klasifikacija (treba answer-key) |
| ~~**E-Business** (`ebusiness`)~~ ✅ **GOTOVO** | 1 | **3 lekcije** (`ebusinessM1`/`ebusinessM2`/`ebusinessFinal`, `data/ebusiness/`); finalni **15 kat / 152 fc / 124 quiz / 75 fill** | ✅ Split (stari sadržaj VJERAN predavanjima — iznimka od te2-pouke) + obogaćen iz 14 PDF-ova (+23 fc; SEO 3→4 fix). K1=Units 1–7, K2=Units 8–15. **LIVE 2026-06-13 (`51e4e7b`)** |

**⚠️ Pouka iz te2 (2026-06-12):** puki **SPLIT postojećeg** tankog sadržaja daje premalo (te2 split = 72 fc → korisnik
javio da je premalo i staro). Zato je te2 **rebuildan IZ PROFESORSKIH PREDAVANJA** (10 PDF-ova → 135 fc, + ispravljena
činjenična greška u starom sadržaju). **Za Entrepreneurship/E-Business isto: raditi iz materijala, ne preslagivati stari
tanki blok.** Stoga **OBA trebaju izvorne PDF-ove/silabus od korisnika** (folderi su trenutno prazni) prije početka.

## 🧭 Strateški smjerovi (korisnik, 2026-06-24) — veće mogućnosti, timing TBD
- 🔥 **Priprema za MATURU** — novi proizvodni smjer: srednjoškolci, priprema za maturu (širenje izvan fakulteta). Dolazi nakon admin CRUD + AI tutor.
- 🔥 **Novi program „Menadžment u ugostiteljstvu" (HRV)** — vrlo vjerojatno **prijevod cijelog Hospitality Managementa na hrvatski**. Catalog već podržava više programa (ADR-002/003) → novi `program` + prevedeni `data/*`. **Aktivira potrebu za i18n (HR/EN).**
- ➖ **3. godina HM** — doći će, timing neodlučen.
- ➖ **Studentski UGC za 3./4. godinu** — studenti uploadaju sadržaj i grade više godine (HM i/ili Menadžment u ugostiteljstvu); jezik (HR/EN) neodlučen. Veže se na Fazu 1–2 (upload→AI→pregled→dijeljenje) + moderacija/autorska prava ([VISION.md](../product/VISION.md) §4 gating-odluke).
- ~~**Prioritet nakon sadržaja (korisnik):** (1) Admin CRUD → (2) AI tutor → (3) Matura prep.~~ **⚠️ NADGLAŠENO 2026-08-02 (Leon).** Admin CRUD = ✅ gotov; **matura IZBAČENA iz build-plana** (ostaje samo kao tržišna hipoteza u [MONETIZATION.md](../product/MONETIZATION.md), ne kao posao). Aktualni redoslijed: **osobni UGC-graditelj ([CREATE_BACKEND_SPEC.md](../archive/CREATE_BACKEND_SPEC.md) F0–F5) → frontend redizajn → objava/dijeljenje + MCP.** [[follow-recorded-plan-dont-reopen]]

## 🔁 MATURA SE VRAĆA — kao IDEJA, ne kao plan (Leon, 2026-08-22)

Gornji precrtani redak (**„matura IZBAČENA iz build-plana", 2026-08-02**) i dalje točno opisuje
**plan**: matura nije cigla i ne ulazi u red čekanja. Ali premisa iz tog reza — *„širenje izvan
fakulteta ide kroz UGC, srednjoškolac gradi vlastiti materijal kao i svi ostali"* — **ne pokriva
ono što je Leon sad rekao:**

> *„pripreme za maturu će se poviše bazirati na **exercises**"*

I to je bitna razlika, jer **vježbu srednjoškolac ne može autorirati.** Kartice, kviz i dopunu
može (to je podatak). Vježba je danas **kôd** — `generate()` funkcija u `data/<subj>/exercises.js`,
koju BUG-012 drži izvan baze i JSON-a, a ADR-018 zabranjuje da korisnik uploada kôd. Dakle:

**➡️ Matura ne prolazi kroz UGC. Matura prolazi kroz RECEPTE.**

Time smjer „vježbe = imenovana, verzionirana knjižnica recepata" (v. `CLAUDE.md` §9.5 —
151 od 234 vježbi je već čisti podatak, `params` su deklarirani u svih 83, kôd je samo formula)
prestaje biti čišćenje duga i postaje **preduvjet**. Bez recepata matura znači ručno pisanje
stotina `generate()` funkcija u `.js`, po predmetu, zauvijek.

**Druga posljedica — točnost prestaje biti neugodnost i postaje odgovornost.**
[ADR-020](./DECISIONS.md) (dvo-ključni verifier) danas stoji kao *„gradi se u fazi sadržaja, ne
sad"*, a 18 predmeta je *„spot-checkano, NE iscrpno"*. Krivi ključ u fakultetskoj kartici je
neugodan. **Krivi ključ u pripremi za državnu maturu je šteta** — dijete uči za ispit koji mu
određuje upis, i vjeruje nam. Ako matura ikad krene, ADR-020 kreće **prije** nje, ne s njom.

**Kalendar (Leon, 2026-08-22):** vrhunac korištenja platforme nije rujan nego **pripreme za
maturu, otprilike 2.–5. mjesec**. To je jedini prirodni rok koji ovaj smjer ima.

> ### ⚠️ DOPUNA 2026-09-01 — obje premise gore su OBORENE mjerenjem
>
> Odluka *„ne otvaramo maturu"* **stoji i potvrđena je** (Leon, 2026-09-01: *„neću otvarat
> maturu"*). Ali **obrazloženje iznad više ne vrijedi**, pa se ne smije koristiti kao razlog:
>
> | premisa iznad | što je izmjereno 2026-09-01 |
> |---|---|
> | *„bez recepata = stotine ručnih `generate()`"* | **Prošli ispit je FIKSAN** → čisti podatak, bez `generate()`. Recepti **nisu** preduvjet; oni su v2 (beskonačno vježbanje). |
> | *„ADR-020 mora krenuti prije mature"* | Ostaje točno kao **zahtjev**, ali je **jeftiniji** nego što se mislilo: NCVVO objavljuje **`Kljuc za odgovore.pdf`** uz svaki rok → provjera je usporedba s objavljenim ključem, ne Opusova prosudba. |
>
> Puna razrada, mjerenja na pravom ispitu i ostale odluke: **[MATURA-PILOT.md](../archive/MATURA-PILOT.md)**
> (⏸️ PAUZIRAN). ⛔ Ondje stoji i jedini pravi blokator — **nepotvrđeno pravno pitanje** o objavi
> NCVVO materijala na tuđoj platformi.

**Status: parkirano.** Ne planirati, ne procjenjivati, ne otvarati prije nego frontend bude
gotov. Zabilježeno da se ne izgubi i da se zna **koji preduvjet nosi**.

## 🏨 Simulacija vođenja hotela — zaseban proizvod, razrađen drugdje (2026-08-22)

Poslovna igra za FMTU: student vodi virtualni hotel kroz sezonu (cijene po segmentu, RevPAR,
kadrovi, sezonalnost), cijela generacija igra istu sezonu i natječe se. Konkurencija su plaćene
strane licence (HOTS, Cesim, Shadow Manager).

**Puni zapis: [`docs/ideas/HOTEL_SIM.md`](../ideas/HOTEL_SIM.md)** — ovdje namjerno stoji samo
pokazivač, jer **nije Sokratova značajka nego drugi proizvod** (posuđuje primitive: seed-
determinizam iz enginea vježbi, auth/RLS, sync napretka, i18n). Ne gradi se dok frontend nije
gotov; služi kao materijal za prijedlog dekanu i kandidat za diplomski.

## Monetizacija (Faza 4 — tek na skali)
- 🔥 Freemium pretplata (~2–3 €/mj): neograničeni kvizovi, exam mode, bez reklama, analitika.
- 🔥 AI tutor kao premium ("objasni mi / ispitaj me") — koristi isti Claude pipeline.
- ➖ Lokalno sponzorstvo (kafići, student housing) — bolji prinos od ads na maloj skali.
- ➖ Affiliate (udžbenici, online tečajevi).
- 💤 White-label za druge fakultete/udruge (najveći dugoročni potencijal).
- 💤 Donacije / "Buy me a coffee".
- ⚠️ Naplaćivati FUNKCIONALNOST, ne sadržaj (autorska prava na profesorske materijale).

## Funkcionalnosti — učenje
- ➖ Spaced repetition za flashcards (pamti što ne znaš, vraća češće).
- ➖ "Exam mode" — vremenski ograničen, miješane kategorije, ocjena na kraju.
- ➖ Izvoz skripte u PDF.
- 💤 Audio/TTS čitanje gradiva.

## UGC & društveno (Faza 1–3)
- 🔥 Upload PDF/PPT → AI generira privatnu skriptu (Faza 1).
- 🔥 "Donesi svoj API ključ" za AI generaciju (kontrola troška).
- ➖ Javna biblioteka + pretraga + fork tuđih skripti (Faza 2).
- ➖ Ljestvice po kvizu + profili + statistika učenja (Faza 3).
- ➖ Anti-cheat za natjecanje.
- ➖ Moderacija/prijava UGC sadržaja.

## Tehničko / infra
- ✅ **Automatski testovi — uglavnom GOTOVO:** Playwright (responsive/smoke/…), `npm run test:unit` (graderi vježbi), `npm run validate:content` (shema sadržaja). Ostaje 💤 širi coverage po želji.
- ✅ **Analitika posjeta — GOTOVO (2026-06-13):** Google Analytics GA4 (`G-ME0V58NJ1Z`) uz GDPR cookie-consent
  (Consent Mode v2, učita se tek na pristanak); vidi `js/consent.js`. Time je i **priprema za Google Ads** korak dalje.
- 💤 i18n (hrvatski/engleski prebacivanje).

## 🔑 Auth — sirova poruka o lozinci (nalaz 2026-08-28, poslije uključivanja zaštite)

**Gotovo kad:** korisnik koji upiše procurjelu lozinku dobije objašnjenje **na svom jeziku**, i
zna što učiniti — a ne englesku rečenicu iz Supabaseova SDK-a.

[`js/auth.js:372`](../../js/auth.js) radi `setStatus(error.message, true)` — dakle **prosljeđuje
sirovu poruku** iz Supabasea ravno u sučelje. Dok je `auth_leaked_password_protection` bila
isključena, taj put se praktički nije aktivirao: obrazac već ima `minlength="8"` i „min. 8
characters", pa je preglednik zaustavljao prekratke lozinke **prije** slanja.

**Uključivanjem zaštite (2026-08-28) put je postao stvaran.** Lozinka može biti duga 14 znakova i
svejedno biti odbijena jer je u HaveIBeenPwned popisu — **to nijedna provjera u pregledniku ne može
predvidjeti.** Dakle jedini put do korisnika je poruka sa servera, a ona ide neprevedena.

⚠️ **Zašto ovo nije samo kozmetika:** korisnik koji ne razumije zašto mu je lozinka odbijena
najčešće **odustane od registracije**, a ne pokuša drugu. Registriranih korisnika je pet.

**✅ ISPORUČENO 2026-08-28 (AUTH-1).** `authError()` u `js/auth.js` mapira `code` (GoTrue ga šalje
od 2024-01-01) uz regex-mrežu za starije odgovore, i **zadnji fallback je sirova poruka** — radije
engleska rečenica nego prazan crveni okvir za kôd koji još ne poznajemo. 6 novih i18n ključeva,
EN + HR.

⚠️ **Opseg je bio VEĆI nego što je ova stavka mislila: sirova poruka išla je na ČETIRI mjesta**
(prijava · registracija · zaboravljena lozinka · **postavljanje nove lozinke nakon reseta**), a ne
samo na `auth.js:372`. Zadnje je zapravo **najvažnije** — tko je zaboravio lozinku i postavlja novu
najlakše naleti na odbijanje zbog procurjelosti, i to je jedini put na kojem ne može odustati i
vratiti se na staro.

Dvije tvrdnje koje su ušle u kôd jer su **razlike koje korisnik osjeti**:
- **„procurjela" i „prekratka" nisu isti savjet.** Uputa *„uzmi dužu"* je **kriva** za lozinku
  odbijenu zbog krađe podataka — duljina ondje nije problem. Razlikuje se preko `reasons`
  (`pwned`), uz regex-mrežu kad `reasons` nema.
- **Nikad prazan crveni okvir.** Nepoznat kôd → sirova poruka; nema ni nje → generički ključ.

**Dokaz:** `tests/unit/auth-error.test.js`, **26 tvrdnji**, u `test:unit` i preflightu. Uključuje
**obrnutu provjeru**: popis ključeva se **čita iz koda** (`authError` tijelo) i svaki mora postojati
u `js/i18n.js` **s `hr`** — jer bi inače `at()` tiho vratio engleski fallback i **ništa ne bi puklo**.
Sve tri kritične tvrdnje su **mutacijski provjerene** (maknut `hr` · vraćen sirovi `error.message` ·
procurjela dobiva savjet o duljini) i svaku je uhvatio **točno jedan** test.

➖ **Svjesno NIJE napravljeno:** `data.weakPassword` pri **prijavi** se i dalje ignorira, pa korisnik
sa slabom lozinkom ne dobije nježnu uputu da ju promijeni. Nije kvar (prijava prolazi, poruke nema),
nego neobavezna dopuna — a modal se pri prijavi **zatvara**, pa bi joj vozilo bio toast, ne
`setStatus`.

⚠️ **Ovisi o Pro planu.** Poslije seobe na self-host provjeri je li zaštita uopće dostupna; ako
nije, ostaje HIBP u kodu (~30 redaka, k-anonimnost) i **ista poruka treba i tada.**
