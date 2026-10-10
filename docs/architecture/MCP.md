# MCP — kako je građeno

> **Opisuje, ne definira** (ADR-027): istina je u kodu i branama navedenima uz svaki dio.
> Redoslijed rada: [plan/ZAVRSNICA.md](../plan/ZAVRSNICA.md) faza KONEKTOR (povijest: [archive/MCP.md](../archive/MCP.md)) · prijetnje i uvjeti: [MCP_SECURITY.md](./MCP_SECURITY.md) ·
> odluke: ADR-030 · ADR-031 · [ADR-038](../records/DECISIONS.md#adr-038).
>
> **Stanje:** sve ispod živi na **STAGINGU** (`czljmvigkgiajzjxtndq`). Na produkciji MCP ne postoji
> (`www.sokratstudy.com/mcp` → 404, tvrdi `check:functions`).

## 1 · Slika

```
korisnikov AI (Claude.ai / ChatGPT)
   │  token drži BROKER (Anthropic/OpenAI), ne model
   ▼
www.sokratstudy.com/mcp ── Vercel rewrite, imenovani hostovi, bez catch-alla
   ▼
Edge Function `mcp` (verify_jwt = false)
   ├─ withOAuthProtectedResource → 401 + WWW-Authenticate + RFC 9728 metapodaci
   └─ withSupabase({ auth: 'user' }) → klijent pod KORISNIKOVIM tokenom, nikad service_role
   ▼
PostgREST ── uloga `mcp_klijent` (hook je postavi tokenu s `client_id`)
   ▼
Postgres: GRANT-ovi (zabrana po defaultu) + RLS (samo vlastito) + SECURITY DEFINER RPC-ovi (vlasnik iz tokena)
```

## 2 · Prijava (OAuth 2.1)

- **Poslužitelj autorizacije = Supabase Auth** (OAuth 2.1, beta). **DCR je uključen** — Claude registrira novi klijent
  pri svakom spajanju. CIMD Supabase nema; `client_id` je UUID.
- **Stranica za odobrenje** je naša: `odobrenje.html` + `js/odobrenje.js`. Pušta samo **poznate hostove
  preusmjeravanja** (`claude.ai`, `chatgpt.com`), jer DCR sam hostove ne ograničava (samo shemu). Ime klijenta je
  **tuđi tekst** (DCR je otvoren) i ide kroz escape. Prijava ide u drugi prozor da se `authorization_id` ne izgubi.
  `approveAuthorization` se uvijek zove s `skipBrowserRedirect: true`; preusmjeravanje tek poslije provjere hosta.
- **Token AI-ja = običan korisnički JWT + claim `client_id`**, `aud: authenticated`. `resource` (RFC 8707) se prihvaća,
  ali token **nije vezan na naš poslužitelj** — zato sigurnost ne smije ovisiti o tome tko ga predaje.
- **Trajanje:** propusnica 3600 s; prekid veze (`revokeGrant`) odmah ubija **obnovu**, ali već izdana propusnica vrijedi
  do isteka. Kartica „Povezani AI-jevi" u profilu to kaže korisniku (`tests/ai-veze.authed.spec.js`).

## 3 · Brava u bazi (`supabase/f6-mcp-brava.sql`)

- Hook `mcp_access_token_hook`: token s nepraznim `client_id` dobiva ulogu **`mcp_klijent`** (`nologin`, `noinherit`).
  Hook ne čita tablice i na neočekivan ulaz vraća događaj netaknut — **greška u hooku ruši SVAKU prijavu na projektu**.
- `mcp_klijent` ima samo ono što mu je izričito dano. Danas: `USAGE` na `public`, `SELECT` na `nodes` (RLS = vlastiti),
  `EXECUTE` na pet `mcp_*` RPC-ova nacrta. Sve ostalo — `publish_node`, 7 RPC-ova čvorova, profil, Storage, katalog —
  zatvoreno.
- `is_admin()` više nema PUBLIC EXECUTE (inače bi AI-token admina prošao admin-vrata `send-notification`).
- **Popis otvorenog nabraja baza sama:** `supabase/f6-mcp-inventar.sql` (`mcp_brava_inventar()`), a
  `npm run mcp:brava` pada na svemu što je otvoreno a nije na popisu, i na mrtvom retku popisa.

## 4 · Ono što baza ne doseže

- **Edge Functions:** gateway `verify_jwt` provjerava samo potpis, ne ulogu. Zato `delete-account` i `send-notification`
  pitaju `supabase/functions/_shared/token-guard.ts` i AI-tokenu vraćaju 403. Svaka funkcija je ili pod stražom ili
  imenovana s razlogom (`check:functions`).
- **Auth API (`PUT /auth/v1/user`)** ide mimo Postgresa. Lozinku štiti postavka *Require current password*, e-mail
  *Secure email change* (potvrda sa stare adrese). Metapodaci korisnika ostaju otvoreni i to je imenovano u
  `scripts/mcp-brava-check.js`.

## 5 · Nacrt (`supabase/f6-nacrt.sql`)

- Tablica **`node_drafts`**: `owner_id` · `client_id` (koji je AI počeo) · `name` · `status` (`u_izradi` → `predan`) ·
  `payload` (JSON objekt, ≤ 1 MB tekstualno) · vremena.
- **Upis samo kroz RPC**, samo za `mcp_klijent`, vlasnik uvijek iz tokena: `mcp_zapocni_nacrt` · `mcp_upisi_nacrt`
  (cijeli payload se zamjenjuje) · `mcp_predaj_nacrt` (zamrzne) · `mcp_procitaj_nacrt` · `mcp_moji_nacrti` (bez sadržaja).
  Tuđi, istekao i nepostojeći nacrt daju **istu** grešku.
- Obična sesija nacrte **samo čita** (RLS `node_drafts_select_own`); ne može pisati ni RPC-om ni izravno.
- **Kvota** (pod savjetodavnom bravom po korisniku): 3 u izradi, 10 nepregledanih. **Istjecanje:** nacrt u izradi
  netaknut 7 dana je nepostojeći za sve i briše se pri vlasnikovom sljedećem započinjanju; predan ostaje.
- **Polica i opseg na početku (②/4.2):** `mcp_zapocni_nacrt` traži opseg (`sazeto` · `standardno` · `detaljno`) i
  točno jednu policu — `polica_id` (samo VLASTITA živa polica) ili `nova_polica` (ime; nastaje tek pri Prihvati).
  Obje žive u nacrtu (`node_drafts.polica_id` / `nova_polica` / `opseg`); korisnik policu smije promijeniti pri Prihvati.
- **Prihvati i Odbaci (②/4.1, `supabase/f6-prihvat.sql`):** samo obična sesija (grant `authenticated` + `_nacrt_korisnik()`
  odbija token s `client_id`). Prihvat = `create_node` (+ nova polica) + `publish_node` u jednoj transakciji, pa se nacrt
  briše; prihvaća se samo predan. Pitanje s `card` mora upućivati na karticu iste lekcije (`_provjeri_kartice_nacrta`,
  na upisu i prihvatu — ne u `publish_node`).
- **Izmjena postojećeg materijala (②/4b, ADR-039 t.2):** `mcp_procitaj_materijal` (vlastiti živi materijal s verzijom;
  `node_content` AI-ju ostaje zatvoren) · `mcp_zapocni_izmjenu` (kopija u nacrt izmjene: `izvor_id` + `polazna_verzija`)
  · `mcp_preimenuj_nacrt` (1–120) · `mcp_vrati_izmjenu`. Nacrt izmjene upisuje SAMO `mcp_predaj_nacrt`, kroz `publish_node`,
  i to samo uz polaznu verziju — inače `izmjena_sukob` i materijal ostaje netaknut (korisnikov rad u Studiju se ne prepisuje).
  Povijest bilježi `op`/`client_id`/`verzija`. Tuđi, obrisan, nepostojeći materijal i polica → ista greška.

## 6 · Poslužitelj (`supabase/functions/mcp/`)

- `index.ts` = omot (prijava + MCP prijenos, `@modelcontextprotocol/server@2.0.0`, `@supabase/server@1.7.0`, pinano točno).
- `alati.ts` = čista jezgra bez Deno-uvoza, testira se u Nodeu (`tests/unit/mcp-alati.test.js`). Stupci se čitaju
  izričito, nikad `*`.
- **Sedam alata (②/2):** `procitaj_materijale` · `zapocni_nacrt` (lekcije s bojom, polica `shelf_id`/`new_shelf`, opseg
  `scope`) · `napisi_learn` · `dodaj_kartice` (pada bez Learna) · `dodaj_pitanja` (kviz + dopune, pada bez kartica) ·
  `procitaj_nacrt` (popis · sažetak · lekcija) · `predaj_nacrt` (vraća `review_url`). Upute cjevovoda su u
  `instructions` (`UPUTE`). Svi se registriraju iz jezgre (`registrirajAlate`).
- **Devet alata izmjene (②/4b.2, `0.5.0`):** `procitaj_materijal` · `zapocni_izmjenu` · `izmijeni_stavke` (id + samo
  polja koja se mijenjaju; ostala ostaju, i ona koja AI ne piše, npr. slika ili boja iz Studija) · `obrisi_stavke`
  (kartica iz koje su pitanja briše se samo zajedno s njima) · `dodaj_lekciju` · `uredi_lekciju` · `obrisi_lekciju`
  (zadnja ne) · `preimenuj_materijal` · `vrati_izmjenu` (jedini oglašen kao razoran: mijenja živo bez nacrta). Nacrt
  izmjene se dalje mijenja i alatima gradnje. Stavka bez id-a pri kopiji dobije stalan id izveden iz mjesta. Alati
  po id-u nemaju `repeat_key`: ponovljeni daju isto stanje (brisanje već obrisanog nije greška).
- **Pravila iz preglednika (ZAVRSNICA K/1–K/2, `0.5.1`):** prag kartice, paleta i `normFill` dolaze iz
  `_shared/pravila.ts`, generiranog iz `js/` (`npm run build:pravila`). Pitanje i odgovor kartice se **podrežu prije
  provjere** i takvi spremaju (kao editor); iznad HARD = odbijanje s mjestom (`input.cards[i].answer`), SOFT+1…HARD =
  upisano uz `warnings` (mjesto, duljina, kamo s detaljem) u odgovoru `dodaj_kartice` i `izmijeni_stavke`.
- **Pitanje po kartici (K/3, `0.5.2`):** `predaj_nacrt` prvo čita nacrt i odbija (`alat_kartica_bez_pitanja` / ispravi)
  ako neka kartica nema ni kviz ni dopunu s `card` = njezin id; poruka imenuje `lesson_id/card_id` i tekst. Kod
  izmjene se sude samo kartice kojih nije bilo u izvornom materijalu (id-evi po istom `dodijeliIdeve` kao pri kopiji);
  nacrt koji više ne postoji (ponovljena predaja) propušta se do baze, koja vrati isti materijal.
- **Boja lekcije iz palete (K/4, `0.5.3`):** `zapocni_nacrt`, `dodaj_lekciju` i `uredi_lekciju` oglašavaju boju kao `enum` =
  `KURIRANE_BOJE` (iz `js/utils.js` kroz `_shared/pravila.ts`); izvan nje = `alat_los_ulaz` s mjestom i popisom. Velika
  slova se svode prije provjere (`maloBoje`). Studio i dalje bira slobodno (ADR-025): izmjena bez boje zatečenu ne dira.
- **Ime ≤ 120 (03.10.):** ime materijala i nove police postaje `nodes.name` (1–120); alat odbija duže prije poziva
  baze. `mcp_zapocni_nacrt` u bazi i dalje prima 200 → provjera u sljedećem SQL krugu.
- **Opseg se ponavlja (②/4.2):** alati koji pišu i `procitaj_nacrt` vraćaju `scope` + `scope_hint` (`OPSEZI`), jer AI kroz
  dug cjevovod zaboravi što je korisnik tražio. **Link natrag:** `review_url` = `SOKRAT_APP_URL` (tajna funkcije; staging
  `http://localhost:5051`, bez nje produkcija) + `/#/materials/nacrt/<id>`; sve što nije http(s) → produkcija.
- **Upis:** pročitaj → izmijeni → `mcp_upisi_nacrt` s verzijom; na `nacrt_sukob` ponovi (do 3×). Jednak rezultat = bez upisa.
- **Isti poziv dvaput = jednom:** svaki alat koji stvara traži `repeat_key`; nacrt se veže na ključ u bazi, a id-evi
  blokova, kartica i pitanja izvode se iz lekcije i ključa (`idIzKljuca`), pa ponovljen poziv prepiše iste stavke,
  a isti ključ u dvije lekcije ne daje isti id (napredak se vodi po id-u stavke, ②/3).
- **Ulaz** provjerava jezgra (`provjeriUlaz`, podskup JSON Scheme); SDK shemu samo oglašava. Granice po pozivu: jedna
  lekcija, ≤ 50 kartica / kvizova / dopuna, ≤ 200 blokova. Sadržaj (strogi profil) i dalje provodi baza.
- **Odbijanje:** svaki RPC kroz `pozovi()` → `prevediOdbijanje` (N9); AI dobiva `{error, kind, message}` s `isError`.
- **Oblik (②/3): nacrt JEST gradivo** — Prihvati (②/4) ga prepisuje bez pretvorbe, pa izlaz alata prolazi i
  katalošku shemu (`subject-content`) i strogi profil. Kostur: `schemaVersion: 2`, lekcija `{name, icon: 'fa-book',
  color, flashcards: [], quiz: [], fillBlanks: []}` (kao nova sekcija u Studiju) · Learn samo tekstualni blokovi (bez
  slika i videa u prvom izdanju) · `dodaj_kartice` vraća `card_id`-eve, a svako pitanje nosi obavezan `card` koji
  mora postojati u toj lekciji (`alat_kartica_ne_postoji`) · dopuna: AI piše `___`, alat sprema marker `_______`;
  `answers` = **odgovor po praznini** (D2, ne alternative), broj mora biti jednak broju praznina, `answer` = prvi,
  `answers` se sprema tek od dvije praznine. ⚠️ Te provjere žive u ALATU; izravni RPC ih zaobilazi → druga linija je
  ③/5–③/6 (Prihvati).
- Adresa resursa: `MCP_RESOURCE_URL`, inače adresa funkcije; na produkciji postaje kanonska tek u fazi ⑥.

## 7 · Adresa (`vercel.json`)

`/mcp` i `/mcp/:put*` → Edge Function, po **imenovanim hostovima**: `www.sokratstudy.com` → produkcija, alias grane
značajke → staging, nepoznat host → bez rewritea (404). Adresa se nakon objave ne mijenja — promjena znači da svaki
korisnik ponovno dodaje konektor. Brana: `npm run check:mcp-rewrite` (izvodi pravila, ne čita ključeve).
