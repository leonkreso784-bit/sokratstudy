# MCP — plan razvoja (F6)

**Status:** 🟩 AKTIVAN · **Otvoren:** 2026-09-29 (Leon: *„uhvatio bi se sada jako ozbiljno na razvoj"*) ·
**Zamjenjuje:** `RASPORED.md` §F6 (raspored je za to vrijeme ⏸️ pauziran, nastavlja se s F7).

> **Cilj (Leon, sigurnosni zahtjev 29.09.):** siguran MCP kroz koji korisnikov AI stvara i uređuje
> **isključivo njegove nacrte**, a **korisnik** pregledava promjene i objavljuje gradivo.
>
> **Što ovaj dokument JEST:** redoslijed cigli i **uvjet završetka** svake, uključujući sigurnosni.
> **Što NIJE:** mjesto za mjerenja i obrazloženja. Ona žive ovdje:
>
> | pitanje | dokument |
> |---|---|
> | što korisnik dobiva, kad je gotovo | [product/MCP.md](../product/MCP.md) |
> | kako je građeno (OAuth, uloga, nacrt, alati) | [architecture/MCP.md](../architecture/MCP.md) |
> | od čega se branimo, što je zaštićeno, otvoreni nalazi | [architecture/MCP_SECURITY.md](../architecture/MCP_SECURITY.md) |
> | kako se mjeri (računi, naredbe, mutacije, pravi AI) | [workflow/MCP_TESTING.md](../workflow/MCP_TESTING.md) |
> | kako su izvedeni ①, S1 i S2 | [archive/MCP_KONEKTOR.md](../archive/MCP_KONEKTOR.md) |
> | zašto baš tako | ADR-030 · ADR-031 · [ADR-038](../records/DECISIONS.md#adr-038) · [ADR-039](../records/DECISIONS.md#adr-039) (na policu bez pregleda) |

---

## 0 · Pravila vožnje

- **Jedna cigla = jedan commit**, gate na svakoj; „crveno" = provjera koja **pada na starom kodu** (obrnuta provjera
  ili mutacija). Brana koja ne pada na starom kodu = cigla **nije gotova** (Leon, 18.09.).
- **Sve prvo na STAGINGU.** Produkcija i `main` se u F6 ne diraju do faze ⑥, i ondje svaki korak traži izričit OK.
- **`brana-revizor` se pušta na svaku sigurnosnu ciglu** — u fazi ① vratio je ciglu više puta, uvijek s pravom.
- **Zastanak na kraju faze** (①…⑥); unutar faze cigle teku.

## 1 · Gdje smo

| faza | stanje |
|---|---|
| **① konektor + OAuth** | ✅ STAGING — Claude.ai spojen i čita vlastite materijale; brava `mcp_klijent`; odobrenje; Povezani AI-jevi; rewrite `/mcp`. Povijest: [archive/MCP_KONEKTOR.md](../archive/MCP_KONEKTOR.md) |
| **S1 · S2** (CI mjeri žicu · `test:unit` se nabraja sam) | ✅ |
| **②/1 nacrt** | ✅ STAGING — `node_drafts` + pet `mcp_*` RPC-ova; `mcp:nacrt` 34/0, `mcp:brava` 46/0, mutacije 4/4 |
| **②/1a test-računi** | ✅ `npm run staging:racuni` |
| **Sigurnosna analiza** | A ✅ (renderer · validacija · `mcp-admin`) · B ✅ (ovlasti · nacrt · injection) · C ✅ (limiti · backup · brisanje · logovi) — nalazi N1–N16 u [MCP_SECURITY §4](../architecture/MCP_SECURITY.md) |
| **Ⓗ H1** ✅ | **N10** zatvoren 30.09.: SQL na PROD-u (provjeren), `main` = `42a13b3`, T5 objavljuje materijal (BUG-052) |
| **②/0 sigurnosni temelj** | ✅ STAGING 30.09. — a · b · c · d · e, svaka s crvenim na starom kodu i `brana-revizor`om; N1, N2, N4, N5 zatvoreni na stagingu |
| **②/2 alati** | ✅ STAGING 30.09. — kôd + unit (27/0, 12 crvenih na starom, 14/14 mutacija uklj. 3 revizorova zaobilaska N9) + e2e `mcp:alati` (crveno na staroj funkciji; 31/0 protiv lokalnog dvojnika s pravim SDK-om i staging bazom); funkcija `mcp` v9 deployana (Leon); **uživo `mcp:alati` 31/0**, `mcp:probe` 9/0, `mcp:brava` 49/0, `mcp:nacrt` 49/0; N9 zatvoren na stagingu |
| **②/3 oblik materijala** | ✅ STAGING 30.09. — nacrt prolazi katalošku shemu i strogi profil; `card` na pitanjima; funkcija `mcp` v10 (Leon); uživo `mcp:alati` 40/0, `mcp:probe` 9/0, `mcp:brava` 49/0, `mcp:nacrt` 49/0. **Prvi pravi pokus** (Leon, Claude.ai): nacrt „Biologija 4. razred", 12 lekcija / 91 kartica / 48 kviz / 24 dopune, predan i ručno objavljen na stagingu |
| **②/4.1 prihvat u bazi** | ✅ STAGING 30.09. — `f6-prihvat.sql` (`prihvati_nacrt`, `odbaci_nacrt`) + provjera pitanje → kartica na putu nacrta (②/3-N4); `mcp:prihvat` 35/0 (na starom kodu 24 pada), 7 mutacija crveno (uklj. usporedni dvoklik), druga ograda dokazana mutacijom; `mcp:brava` 53/0, `mcp:nacrt` 49/0, `mcp:alati` 40/0 |
| **②/4.2 alati** | ✅ STAGING 01.10. — SQL (polica + opseg u nacrtu, `mcp_zapocni_nacrt` s 5 argumenata) i tajna `SOKRAT_APP_URL` na stagingu; unit 43/0 (20 crvenih na starom); `mcp:nacrt` 57/0 (+8, blok ⑨), `mcp:prihvat` 35/0, `mcp:brava` 53/0, `ugc:sadrzaj` 829/0; funkcija `mcp` v12 (Leon) → uživo `mcp:alati` 43/0, `mcp:probe` 9/0 |
| **②/4.3′ predaja = na policu** | ✅ STAGING 01.10. — `mcp_predaj_nacrt(id, polica?, nova_polica?)` u jednoj transakciji kroz zajednički `_nacrt_u_materijal` (dijeli ga i `prihvati_nacrt`); bilješka `node_drafts_predani` (7 dana) → ponovljena predaja = isti materijal; `nacrt_bez_police` → AI pita korisnika (anketa 01.10.). `mcp:predaja` 33/0 (26 crveno na starom), unit 45/0 (6 crveno na starom `alati.ts`, link provjeren pravim `parseRoute`); `mcp:nacrt` 55/0, `mcp:prihvat` 34/0, `mcp:brava` 53/0; funkcija `mcp` v13 (`0.4.0`, Leon) → uživo `mcp:alati` 42/0, `mcp:probe` 9/0. **4/4 mutacije crveno** (02.10., Leon primijenio ručno): M1 bez `for update` → usporedni krugovi raspadnuti (1 od 4 kruga slučajno čist — krugovi opravdani) · M2 bez bilješke → ponovljena predaja `nacrt_ne_postoji` · M3 bilješka bez vlasnika → stranac dobio id tuđeg materijala · M4 polica bez vlasnika → `node_denied` umjesto imenovane greške (druga ograda `create_node` i dalje ništa nije stvorila); vraćeno, `mcp:predaja` 33/0 |
| **②/1b** | ✅ STAGING 30.09. — N7 i N8 zatvoreni; brana dopunjena po revizoru (8 usporednih upisa, HTTP 409 i < 5 s, `mcp:brava` po punom potpisu), svaka dopuna crvena pod mutacijom; ⚠️ drift staging-SQL ↔ `f6-nacrt.sql` nitko ne mjeri (brana prije ⑥); N9 prijevod napisan, **neožičen** (ožičava ②/2) |

## 2 · Redoslijed

### Ⓢ Sigurnosna analiza (prije ②/0 — nalazi određuju što ②/0 mora zatvoriti)

| cigla | posao | uvjet završetka |
|---|---|---|
| **S-A** ✅ | područja 3 · 4 · 8 (čitanje koda, lokalni pokusi) | nalazi upisani u MCP_SECURITY §4 |
| **S-B** ✅ | područja 1 · 2 · 5 na STAGINGU (43 tvrdnje, jednokratni korisnici, staging poslije čist): admin konektor, token, opoziv, OAuth tok **drže**; nalazi **N7** (tihi gubitak pri usporednom upisu) · **N8** (duplikat pri ponovljenom početku) · **N9** (odbijanja kao 500) · N5 potvrđen uživo (8 oblika). `publish_node` u bazi = datoteka; `pg_jsonschema` 0.3.3 dostupan na stagingu | ✅ matrica MCP_SECURITY §6 ima ishod za sva tri područja; ostatak imenovan (istekao token → ⑤) |
| **S-C** ✅ | područja 6 · 7 na STAGINGU (jednokratni korisnik, poslije nula redaka): nalazi **N10** (brisanje računa puca uz objavljen materijal) · **N11** (nema granice učestalosti; DCR bez čišćenja) · **N12** (alat tiho reže na 1 000) · **N13** (objava 5 MB prolazi; meko obrisano zauvijek) · **N14** (backup bez UGC-a, nešifriran, bez roka) · N15 (lokalni nacrt nakon odjave) · N16 (`mcp_klijent` bez timeouta). Drži: nacrti i OAuth veze nestaju s računom; logovi bez tokena i tijela | ✅ [završni izvještaj](https://claude.ai/artifact/AQYadWjTpQnVxeBcRyGjhs) objavljen (privatan); ovaj plan dopunjen (Ⓗ, ④) |

### Ⓗ Hitni popravak izvan F6 (Leon, anketa 29.09.: *zasebno, odmah*)

Vlastita grana od `main`-a, ne `feat/f6-mcp`; F6 ga samo citira. Produkcijski korak = Leonov izričit OK.

| cigla | posao | crveno na starom kodu |
|---|---|---|
| **H1** ✅ brisanje računa | `node_content_versions.edited_by` → `on delete set null` (kalup `content_versions`); SQL u `supabase/` + staging, pa PROD u SQL Editoru · `delete-account-check` T5 **objavi** materijal (i ima nacrt od AI-ja) prije brisanja · prije: upit na PROD koliko je korisnika pogođeno | T5 s objavom danas 409 i poluobrisan račun → poslije 200 i nula redaka u svim tablicama |

### ②/0 Sigurnosni temelj ✅ STAGING (30.09.) — ishodi i dokazi: PROGRESS 30.09., MCP_SECURITY §4

Odluke (Leon, anketa 30.09.): **pg_jsonschema** (shema u `schema/ugc-content.schema.json`, SQL generiran) · **JEDAN
strogi profil** za Studio i AI (umjesto „MCP profil stroži") · DOMPurify **s naše domene** + tekst · `script-src`
**točne datoteke** · nacrt u **obliku gradiva** (②/3 time postaje gotovo identitet) · boja lekcije u bazi = oblik
`#rrggbb` (Studio ima slobodan birač, ADR-025); kurirana paleta za AI ostaje ③/4.

| cigla | posao | crveno na starom kodu |
|---|---|---|
| **②/0a** validator u bazi | **jedna** funkcija provjere sadržaja koju zovu `mcp_upisi_nacrt`, Prihvati (②/4) i `publish_node`: dopuštena polja i tipovi blokova · duljine · broj stavki · dubina · jedinstveni id-evi · valjane reference · boje iz kurirane palete · sheme adresa. **MCP profil je stroži:** bez `legacy-html`, bez `learn.content` (sirovi HTML), bez vanjskih slika. Kandidat: `pg_jsonschema` + MCP profil `schema/subject-content.schema.json` (S-B mjeri dostupnost) | payload s `legacy-html` / 501 znakom / 10 000 kartica / `javascript:` adresom prolazi `mcp_upisi_nacrt` i `publish_node` danas → poslije svaki od njih pada s imenovanom greškom |
| **②/0b** granica `publish_node` | veličina (isti 1 MB kao nacrt) + validator iz ②/0a — Prihvati ide ovim putem | payload od 5 MB danas prolazi |
| **②/0c** `safeUrl` | kontrolni znakovi i razmaci se uklanjaju prije provjere sheme (ili odluka preko URL parsera s popisom dopuštenih shema) | 7 oblika iz nalaza N1 danas prolazi → unit ih odbija |
| **②/0d** prikaz bez sanitizatora | kad DOMPurify nije učitan, `legacy-html` i `learn.content` se prikazuju kao **tekst**, nikad kao HTML; isto u krajnjem fallbacku `js/learn.js` | pokus N2 (srcdoc + skripta s dopuštenog CDN-a čita sesiju uz produkcijski CSP) → poslije ne izvrši ništa, s kontrolom |
| **②/0e** CSP | `script-src` sužen s cijelih CDN hostova na točne putanje s verzijom (ili vlastito posluživanje) | isti pokus N2 s oslabljenim ②/0d → CSP ga i dalje blokira |
| **②/1b** usporedno i ponovljeno | `mcp_upisi_nacrt` prima polaznu oznaku (`updated_at` ili brojač) i odbija ako se promijenila · pozivi koji stvaraju primaju **ključ ponavljanja** (isti ključ = isti nacrt) · alat prevodi kodove odbijanja u jasne poruke (N9) | S-B pokus: dva usporedna upisa → danas oba 200 i jedan tiho izgubljen → poslije drugi dobiva sukob · dva ista početka → danas dva nacrta → poslije jedan |

### ② Cjevovod u nacrt

Odluke (Leon, ankete i razgovor 30.09., poslije prvog pravog pokusa):

- **Learn je baza** (ADR-031 ponovljen): Learn je skripta iz koje se uči, sve ostalo su vježbe znanja → mora obuhvatiti
  cijeli izvor. Upute i opis `napisi_learn` kažu „skripta, ne sažetak; svaki pojam objašnjen".
- **Polica se bira NA POČETKU:** AI pita korisnika, polica ide u nacrt (`zapocni_nacrt`), korisnik ju smije promijeniti
  pri Prihvati.
- **Opseg:** AI prije `zapocni_nacrt` pita — **sažeto · standardno · detaljno (za ispit)**. Sve tri razine pokrivaju
  **cijeli izvor** (ADR-031); razlika je samo **dubina**. `opseg` je parametar `zapocni_nacrt`, sprema se u nacrt i alati
  ga ponavljaju AI-ju. Pragovi brana po opsegu dolaze u ③.
- **Nacrt izmjene:** AI smije mijenjati **bilo koji vlastiti** materijal, ali samo kroz nacrt izmjene + korisnikov
  prihvat; sukob s korisnikovom izmjenom = **odbij, ne prepiši**. Tuđe gradivo i katalog **nikad**. Radi se odmah iza
  ②/4 (②/4b).
- **Put natrag:** `predaj_nacrt` vraća izravni link na nacrt (AI ga šalje korisniku) — upute danas obećavaju „pregledaj u
  Sokratu", a ekrana nema (nalaz prvog pokusa).
- **„U izradi" uživo:** „Nacrti od AI-ja" pokazuju nacrt dok ga AI gradi (osluškivanje vlastitih nacrta, bez novih
  ovlasti) — vrjednije od ubrzanja (④, bilješka o brzini).
- **②/4 (anketa 30.09., drugi krug):** polica = **postojeća ili nova po imenu** (nova nastaje tek pri Prihvati) ·
  nakon Prihvati se nacrt **briše** · „u izradi" = **provjera svakih ~5 s** (bez Realtimea) · prihvaća se **samo
  predan** nacrt. ②/4 ide u tri cigle (4.1 baza · 4.2 alati · 4.3 ekran).
- **⚠️ 01.10. ([ADR-039](../records/DECISIONS.md#adr-039), Leon) — gornje tri točke o nacrtu izmjene, „u izradi" i
  Prihvati su NADGLAŠENE:** nema ekrana za pregled. `predaj_nacrt` sam stavi materijal na policu, cijel (②/4.3′); AI
  mijenja postojeći vlastiti materijal izravno, na korisnikovu riječ, s provjerom verzije (②/4b). Povod: prvi pokus
  ②/4.2 („Kemija 3. razred", 12 lekcija / 194 kartice / 76 kviz, opseg „detaljno", polica zapamćena) — Claude je
  rekao „gotovo", a polica je bila prazna. Smjer za kasnije (ne F6): analitika vidljiva drugima **samo uz pristanak**.

| cigla | posao | crveno na starom kodu |
|---|---|---|
| **②/2** alati | `procitaj_materijale` → `zapocni_nacrt` (lekcije s bojom) → `napisi_learn` → `dodaj_kartice` (pada bez Learna) → `dodaj_pitanja` (pada bez kartice) → `predaj_nacrt` · `procitaj_nacrt`; upute cjevovoda u `instructions` poslužitelja. **Alati po lekciji** (ne 200 kartica u jednom pozivu) · svaki poziv koji piše nosi **ključ ponavljanja** | unit nad modulom alata + e2e: Node MCP klijent s pravim tokenom prođe cjevovod na stagingu · isti poziv poslan dvaput ne duplicira lekciju · **N9:** unit traži da svaki `rpc(...)` u alatima ide kroz `prevediOdbijanje` i pada kad takvih poziva nema |
| **②/3** ✅ STAGING (30.09.) oblik materijala | nacrt → payload (kategorija po lekciji, v2 id-evi, bez slika i videa u prvom izdanju); veza kartica→pitanje = opcionalno polje `card` u shemi (aditivno) | `validate:schema` + validator ②/0a nad izlazom |
| **②/4** pregled i prihvat | „Nacrti od AI-ja" u Mojim materijalima, **isti renderer** (s ②/0c–d), stanje **„u izradi" uživo** · **Prihvati** = jedna transakcija, **samo obična sesija**, validator ②/0a ponovno, polica iz nacrta (promjenjiva), polazna verzija gradiva (sukob = odbij, ne prepiši) · **Odbaci** · prihvat istog nacrta dvaput = jedan materijal · `zapocni_nacrt` prima **policu** i **opseg** · `predaj_nacrt` vraća **link na nacrt** · upute: pitaj policu i opseg, Learn = skripta, završni test se raspodijeli po lekcijama · baza provjerava da `card` postoji (N4) · po želji pokus s `icons` u `serverInfo` | nacrt → prihvat → materijal se uči · OAuth token ne može prihvatiti · nacrt ubačen izravnim RPC-om mimo poslužitelja ne prolazi prihvat · paralelna izmjena materijala → prihvat odbija · nacrt bez police/opsega danas prolazi → poslije imenovana greška · pitanje s nepostojećim `card` kroz izravni RPC danas prolazi → poslije pada |
| ↳ **②/4.1** baza | `prihvati_nacrt(nacrt, polica \| nova polica)` i `odbaci_nacrt` — samo `authenticated` + `_nacrt_korisnik()` odbija token s `client_id`; prihvat = `create_node` + `publish_node` u jednoj transakciji, nacrt se briše; `_provjeri_kartice_nacrta` na upisu i prihvatu | `mcp:prihvat` (✅ gore) |
| ↳ **②/4.2** alati | `zapocni_nacrt` + polica (id ili novo ime) i opseg · `predaj_nacrt` vraća link · upute · deploy funkcije = Leon | unit + `mcp:alati` |
| ~~↳ **②/4.3** ekran~~ | ⛔ **OTPALO 01.10. ([ADR-039](../records/DECISIONS.md#adr-039))** — materijal ide na policu sam | — |
| ↳ **②/4.3′** predaja = na policu | `predaj_nacrt` u jednoj transakciji: provjere (validator ②/0a, kartice) → materijal u polici iz nacrta (postojeća ili nova po imenu) → nacrt obrisan; smije i token AI-ja, **samo** za nov materijal u **vlastitu** policu; `review_url` → link na materijal; upute: „materijal je na polici" | `predaj_nacrt` danas ostavlja nacrt → poslije materijal u polici, nacrt nema · tuđa/obrisana polica → odbijeno, ništa nije nastalo · predaja dvaput = jedan materijal · nacrt s neispravnim sadržajem → odbijen, nema materijala · token AI-ja i dalje ne može prepisati postojeći materijal tim putem |
| **②/4b** izmjena postojećeg — **4b.1 baza ✅ STAGING (03.10.)**: `mcp:izmjena` 41/0, 30 crveno na starom kodu, mutacije 4/4 crveno · **4b.2 alati: kod ✅ (03.10.)** — 9 alata (`0.5.0`), unit 54/0 (12 crveno na starom `alati.ts`, N9 dinamički zatvoren: 9/9 RPC-ova), `mcp:alati` +⑧ · **✅ STAGING (`mcp` v14): `mcp:alati` 53/0, `mcp:probe` 9/0** | AI na korisnikovu riječ mijenja **postojeći vlastiti** materijal, izravno (ADR-039 t.2): čita s verzijom, piše s verzijom; stara verzija u povijesti. **Odluke (Leon, anketa 02.10.):** ① **kopija → jedan upis** — materijal se kopira u skriveni nacrt izmjene s **polaznom verzijom**, AI radi istim alatima, a `predaj_nacrt` u jednoj transakciji upisuje kroz `publish_node` samo ako je verzija ista (inače `izmjena_sukob`, materijal netaknut) — nikad pola-izmjena, jedan redak povijesti po izmjeni · ② doseg = **sadržaj + lekcije** (Learn, kartice, kviz, dopune: dodaj/izmijeni/obriši po id-u; lekcija dodaj/preimenuj/obriši, boja; ime materijala) — premještanje među policama NE · ③ **AI alat „vrati verziju"**: vraća stanje prije AI-jeve zadnje izmjene kao NOVU verziju, s istom provjerom sukoba (gumb u aplikaciji = zasebna cigla kasnije; dotad je ADR-039 „povratno" ispunjeno samo kroz AI) · ④ `client_id` iz tokena u `node_content_versions` (trag koji AI je pisao) · AI čita sadržaj samo kroz nov RPC (sažetak + lekcija po lekcija, s verzijom) — `node_content` mu ostaje zatvoren. Dvije cigle: **4b.1 baza** (+ brana `mcp:izmjena`, mutacije) · **4b.2 alati** (+ unit, `mcp:alati`, deploy = Leon) | izmjena tuđeg materijala · kataloškog predmeta → odbijena · korisnik izmijeni materijal nakon što ga je AI pročitao → upis odbijen, materijal netaknut · izmjena se vidi u povijesti verzija (s `client_id`) · predaja izmjene dvaput = jedna izmjena · vrati verziju poslije korisnikove izmjene → odbijeno · token i dalje ne zove `publish_node` izravno |
| **②/5** ulaz — **5.1 prozor ✅ · 5.2 animacija: kod ✅ (03.10., lokalno; čeka Leonov OK)** | „Spoji svoj AI" (ADR-026: jedna radnja, dva ulaza) → **izbornik AI aplikacija**, upute po aplikaciji — **samo one koje stvarno rade** (provjeriti Gemini i postoji li deep-link za dodavanje konektora) + kopiraj URL; lažni tekst `studio.js:235` nestaje. **Istraženo 03.10.:** Claude = sve razine (besplatni: 1 konektor), Customize → Connectors → Add custom connector, **nema dubinske poveznice koja upisuje adresu** (samo do stranice) · ChatGPT = Plus i više + Developer mode (Settings → Apps → Advanced), adresa mora završiti s `/mcp`, OAuth + DCR obavezni (imamo) · Gemini = samo SAD, 18+, osobni račun, engleski → ne nudi se. **Odluke (Leon, anketa 03.10.):** ① **Claude + ChatGPT** (ChatGPT uz napomenu Plus + Developer mode) · ② **prvi put upute, poslije prečac** (ADR-026 ①): bez povezanog AI-ja prozor s izborom aplikacije, koraci, „Kopiraj adresu", „Otvori Claude/ChatGPT"; s povezanim AI-jem gumb otvara njega, upute iza „Spoji drugi AI" · ③ ulazi = **Studio (inspektor) + Moji materijali** · ④ **animirani tutorial na vrhu prozora** — shema Claudeova ekrana (bez njihovog znaka) u CSS/SVG-u, tekst kroz i18n, uz `prefers-reduced-motion` statični koraci · ⑤ **do ⑥ gumb radi SAMO uz staging** (stranica s `sokrat-supabase-override`); na produkciji ostaje „Uskoro", ograda se miče u ⑥. Dvije cigle: **5.1 prozor** (koraci, kopiranje, prečac, ograda, dva ulaza; `docs/product/MCP.md` usklađen s ADR-039/②/4b) · **5.2 animacija** | na produkciji gumb i dalje onemogućen · uz staging otvara prozor · s povezanim AI-jem prečac · kopirana adresa = adresa konektora |

### ③ Četiri brane (ADR-031) — u poslužitelju, iz istih modula koje čita preglednik, i ponovno pri Prihvati

| cigla | posao | crveno na starom kodu |
|---|---|---|
| **③/0** mjerenje | katalog: duljina odgovora dopune, nalazi li se odgovor u kartici → prag brane ④ · duljina Learna po lekciji i po opsegu | — (brojke se upisuju ovdje). **Prva točka (nacrt „Biologija 4. razred", 30.09.):** Learn 9–12 blokova, ~2,3–2,7 k znakova JSON po lekciji |
| **③/1** jedan izvor | `card-limits.js`, paleta i `normFill` u Deno-u: uvoz izvan `supabase/functions/` ili generirana kopija s drift-branom (kalup `build:css`); `KURIRANE_BOJE` i `normFill` u male module po kalupu `card-limits.js` | drift-brana pada na razlici |
| **③/2** duljina | 501 odbija s mjestom; 201–500 prolazi uz upozorenje AI-ju | 500 prolazi, 501 pada |
| **③/3** pitanje po kartici | `predaj_nacrt` pada ako kartica nema ni kviz ni dopunu | unit + e2e |
| **③/4** boja | svaka lekcija ima boju iz kurirane palete | unit |
| **③/5** dopuna | praznine = odgovori · neprazan poslije `normFill` · bez HTML-a i LaTeX-a (razred BUG-024/025) · kratak (prag iz ③/0) · nalazi se u izvornoj kartici · nije već napisan u rečenici. ⚠️ **Jednoznačnost se strojno NE dokazuje** — ovo je oblik, ne istina | unit po obliku (danas prolazi 2 praznine uz 1 odgovor) |
| **③/6** druga linija | iste brane pri **Prihvati** (kroz ②/0a) | nacrt ubačen izravnim RPC-om s karticom od 501 znaka → prihvat odbija |
| **③/7** Learn pokriva kartice | pojam svake kartice mora postojati u Learnu njezine lekcije (glavna brana) · najmanja duljina Learna **po opsegu**, nikad apsolutna (kažnjavala bi vjeran Learn iz kratkog izvora; prag iz ③/0) | kartica s pojmom kojeg nema u Learnu danas prolazi → poslije imenovana greška s mjestom |

Pragovi ③/2–③/7 se razlikuju **po opsegu** (②, odluke) i greška imenuje opseg.

**Usporedba prvog pokusa s izvorom (PDF 16 str., 30.09.):** Learn **nije** tanak — 19,5 k znakova teksta prema 21,3 k
izvora lekcija (razlika su pitanja „Provjeri znanje"), dakle gotovo cijeli izvor, vjerno, presložen u liste i tablice;
svih 20 pitanja završnog testa ugrađeno je u kviz, kartice i dopune. Nalazi: jedna jezična greška koja mijenja smisao
(„potiču" umjesto „potječu", Learn + kviz) · izostavljen uvod (simboli, način rada) · Learn ne dodaje objašnjenja izvan
izvora (sigurno, ali „detaljno" traži više) · dopune s oblikom odgovora (`1 : 2 : 1`, padež „UV zračenje"/„zračenja") =
rizik ③/5 · lekcija **samo s kvizom** (npr. „Završni test") je nemoguća jer kartice traže Learn → odluka u §3.

Rizik: prestrog prag ④ → AI zapne; zato ③/0 ide prvo.

### ④ Limiti, čišćenje, backup (iz S-C; brojke = Leon, anketa 29.09.: *umjeren paket*)

Mjerna osnova: pravi cjevovod za 30 lekcija (alati po lekciji) ≈ 92 upisa kroz nekoliko minuta; izmjereno ~16
upisa/s uzastopno i 60 usporednih bez odbijanja (N11). Sve granice žive **u bazi** (isti token zove RPC i mimo
poslužitelja, N5) i svaka ima obrnutu provjeru.

| cigla | posao | crveno na starom kodu |
|---|---|---|
| **④/1** učestalost | brojač u bazi po korisniku **i** po `client_id`: **60 upisa/min, 1 000/dan**; prekoračenje = imenovan kod koji alat prevodi u „pokušaj za N s" (N9) | 61. upis u minuti danas 200 → poslije odbijen; 60. prolazi |
| **④/2** paginacija i kvota | `procitaj_materijale`: izričit raspon, **najviše 500 stavki** + `skraceno: true` i ukupan broj · `create_node`: **najviše 2 000** živih čvorova po korisniku | 1 200 polica danas → AI vidi 1 000 bez znaka (N12) · 2 001. čvor danas prolazi |
| **④/3** veličina i vrijeme | objava ≤ 1 MB (= ②/0b) · `mcp_klijent`: `statement_timeout = 5s` · odgovor alata ≤ 1 MB | objava 5 MB danas 200 (N13) · `pg_roles` bez postavke (N16) |
| **④/4** gašenje jednog konektora + opoziv | tablica blokiranih `client_id`-eva: hook ne izdaje token, a `_nacrt_pozivatelj()` odbija **odmah** (i živu propusnicu) · ista provjera gleda postoji li još korisnikov pristanak → opoziv zaustavlja **upis** odmah, čitanje do isteka | blokiran klijent i opozvan pristanak danas pišu do 3600 s (I8) |
| **④/5** `pg_cron` (Leon: da) | jedan noćni posao: istekli nacrti · meko obrisani čvorovi stariji od **30 dana** (s verzijama i slikama) · DCR klijenti bez ijednog pristanka stariji od 30 dana. Verzije **bez roka** (Leon) | nacrt star 8 dana i čvor obrisan prije 31 dan danas postoje → poslije posla nema ih; kontrola: 29 dana ostaje |
| **④/6** backup (Leon: sva tri) | `backup-db.js` + `nodes`, `node_content`, `node_content_versions`, `profile_identity` (nacrti NE) · **AES-GCM** ključem iz `.env` · **rok 8 tjedana** (starije se briše) · `--verify` dešifrira i uspoređuje sha256 | snimka danas bez UGC-a i čitljiva bez ključa (N14) → poslije obrnuto; snimka od 9 tjedana nestaje |
| **④/7** preglednik | odjava briše `sokrat-draft:node:*` (uz upozorenje ako ima nespremljenog) · Sentry `beforeSend` briše fragment i upit iz adrese | N15: ključ ostaje nakon odjave → poslije nema ga |

Rizik: pogrešno postavljena granica ④/1 obori pravi cjevovod → ⑤ mora proći cijeli materijal ispod granice.

**Brzina (izmjereno 30.09., PDF 10 str., logovi staginga; prijedlog, NIJE odobren kao posao):** ~8 min, 76 poziva,
naša funkcija 68 s (~14 %), ~80 KB sadržaja — ostatak piše model. Funkcija se izvodi u `us-east-1`, baza staginga u
`eu-central-1` → svaki RPC preko Atlantika. Ako se radi: izmjeriti pa smanjiti našu stranu (regija funkcije uz bazu,
manje povratnih putova po alatu); model se ne dira.

### ⑤ Pravi AI

Claude.ai i ChatGPT (Leon ima Plus) na **ne-admin** računima: cijeli cjevovod na stvarnom materijalu · zlonamjeran PDF
s uputama (MCP_SECURITY §2) · agent-napadač na brave. Uvjet: svaki scenarij iz [MCP_TESTING §5](../workflow/MCP_TESTING.md)
ima zapisan ishod.

### ⑥ Produkcija — zadnje, svaki korak uz Leonov izričit OK

SQL u SQL Editoru → OAuth poslužitelj + hook u dashboardu → funkcija → klijent. Uz to tri imenovana koraka iz ①
([archive/MCP_KONEKTOR.md](../archive/MCP_KONEKTOR.md), kraj): `Require current password` na PROD-u · razlika postavki
staging/prod · `MCP_RESOURCE_URL` na kanonsku adresu. **Uvjet ulaska u ⑥:** svi uvjeti iz
[MCP_SECURITY §7](../architecture/MCP_SECURITY.md) zeleni.
**Prije SQL-a na PROD (revizor ②/1b, N2):** brana koja uspoređuje tijela funkcija na stagingu (`pg_get_functiondef`
bez komentara) sa `supabase/f6-*.sql` — danas se mjeri staging, a na PROD ide datoteka; 30.09. su se razlikovali u
komentarima (`mcp_zapocni_nacrt` i dalje).
Ikona: Sokratova dolazi sama s adresom `www.sokratstudy.com/mcp`.

**Poslije F6 (RASPORED F7 objava):** prijava u Anthropicov katalog konektora i OpenAI popis aplikacija — tek to je
pravi „jedan klik" za korisnika.

## 3 · Otvoreno za Leonovu riječ

- ~~`pg_cron`~~ → **da** (anketa 29.09.), ④/5. ~~Limiti~~ → umjeren paket, ④/1–④/3. ~~Backup~~ → gradivo +
  šifriranje + rok 8 tjedana, ④/6. Zadržavanje verzija: **bez roka** (nije odabrano).
- Trenutan opoziv **čitanja** (provjera na svakom čitanju = vrući put) — upis se zaustavlja odmah kroz ④/4.
- ~~`pg_jsonschema` vs. ručni validator~~ → **pg_jsonschema** (anketa 30.09.; na PROD-u dostupan 0.3.3, nije instaliran).
- **Prije ⑥:** administratorov testni materijal na PROD-u ima karticu od 1 819 znakova → nakon ②/0b se ne da ponovno
  objaviti dok se kartica ne skrati (ostala 3 PROD materijala prolaze).
- **N17** (GTM/Sentry u `script-src` kao hostovi): suziti tek nakon mjerenja što loaderi učitavaju.
- `mcp-admin/` (lokalni pokus izvan repozitorija): obrisati ili arhivirati (nalaz N6).
- ~~Gdje Leon gleda nacrte na stagingu~~ → **lokalno, `localhost:5051`** iz stabla `.f6`, uz `sokrat-supabase-override`
  (`js/auth.js:42`); link iz `predaj_nacrt` na stagingu vodi tamo (anketa 30.09.).
- ~~Lekcija samo s kvizom~~ → **ne gradi se**: upute kažu AI-ju da pitanja završnog testa ugradi u lekcije kojima
  pripadaju (kao u prvom pokusu); brane ③ ostaju jednostavne (anketa 30.09.).
- Staging: predan nacrt „Biologija 4. razred" istječe 07.10.; njegova ručna objava na `test-admin` smije se obrisati
  uz Leonov OK · 9 starih testnih računa od 29.09. (ne dirati bez njegove riječi).

Rizici: beta OAuth poslužitelj, mlad `@supabase/server` · **greška u hooku = nitko se ne prijavi** (izlaz: isključiti
hook u dashboardu) · ograničeno CPU vrijeme Edge Functiona · besplatni Claude = jedan konektor.
