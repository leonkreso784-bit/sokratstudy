# ZAVRŠNICA — Sokrat se dovršava, pa ide u održavanje

**Status:** 🟩 AKTIVAN · **Otvoren:** 2026-10-03 (Leon, sesija planiranja: *„mijenjamo smjer"*) ·
**Zašto:** [ADR-040](../records/DECISIONS.md#adr-040) · **Zamjenjuje:** [archive/RASPORED.md](../archive/RASPORED.md)
i [archive/MCP.md](../archive/MCP.md) (oba ⛔ zamijenjena ovim planom; ondje ostaju povijest, odluke anketa i mjerenja).

> **Novi smjer u jednoj rečenici.** Leonov glavni posao od 2026-10-03 je **HotelixSim** — zaseban projekt u
> `Documents\hotelixsim`, izvan ovog repozitorija. Sokrat se **dovršava usporedo**, s manje vremena, kroz faze
> niže, a kad ih prođe ide u **održavanje** (bugovi, sigurnost, sadržaj; nov razvoj samo Leonovom riječju).
>
> **Što ovaj dokument JEST:** redoslijed i uvjet završetka. **Što NIJE:** mjesto za mjerenja i obrazloženja
> (ADR-027) — ona ostaju u arhiviranim planovima, BACKLOG-u i zaglavljima skripti.

---

## 0 · Pravila vožnje (ista kao dosad)

- **Jedna cigla = jedan commit**, gate na svakoj; brana koja ne pada na starom kodu = cigla nije gotova.
- **Zastanak na kraju faze**; unutar faze cigle teku.
- **Svaki push na `main` i svaki deploy = Leonov izričit OK.** Uz svako „popravljeno" reći GDJE se vidi.
- **Sve s bazom prvo na STAGINGU**; SQL na staging i PROD ide kroz Leonovu ruku kad ga alat odbije.

## 1 · Faze

| # | faza | gotovo kad korisnik može… |
|---|---|---|
| 1 | **KONEKTOR** — uži MCP do produkcije | …na www.sokratstudy.com spojiti Claude ili ChatGPT, iz svog PDF-a napraviti materijal i odmah iz njega učiti |
| 2 | **DIJELJENJE** — link + izgled Mojih materijala | …poslati kolegi link na svoj materijal; kolega iz njega uči i sprema kopiju u svoju policu, a autor link može povući |
| 3 | **BEZ MREŽE** — vlastiti i dijeljeni materijali | …skinuti vlastiti ili dijeljeni materijal i učiti u zrakoplovnom načinu, u aplikaciji na početnom zaslonu |
| 4 | **ZNAK** — novi logo, ime ostaje | …vidjeti novi znak svugdje: stranica, favikon, ikona aplikacije, pretpregled linka, mailovi |
| 5 | **DVOJEZIČNOST** — ostatak | …prebaciti jezik i nigdje ne naići na ostatak drugog jezika, ni u editoru |
| 6 | **ČIŠĆENJE** — CSS dug do nule | …ne primijetiti ništa: nula piksela razlike, stari CSS nestao |
| 7 | **RECEPTI** — vježbe postaju podatak | …rješavati vježbu koja je podatak kao sve ostalo i izgleda kao ostatak platforme |
| 8 | **POVIJEST** — povijest učenja i grafikoni | …vidjeti kad je što zadnji put učio i kako napreduje kroz vrijeme |
| → | **ODRŽAVANJE** | — |

Redoslijed je presuđen (Leon, anketa 03.10.): KONEKTOR → DIJELJENJE → BEZ MREŽE → ZNAK → ostalo redom tablice.

---

## 2 · Faze u detalje

### 1 · KONEKTOR (grana `feat/f6-mcp`, staging)

Što je već gotovo na stagingu (konektor + OAuth, nacrt, sigurnosni temelj ②/0, alati, predaja na policu,
izmjena postojećeg ②/4b, prozor „Spoji svoj AI" ②/5.1): [archive/MCP.md](../archive/MCP.md) §1.
**Uži opseg (Leon, anketa 03.10.):** do produkcije ide ono bez čega konektor nije siguran; ostatak čeka.

| cigla | posao | crveno na starom kodu |
|---|---|---|
| **K/0** ✅ (09.10., lokalno) | **②/5.2 animirani tutorial se vraća** (Leon 03.10.: *izbaciti*) — revert commita `5b3f4c3`, prozor iz 5.1 ostaje | unit `connect-ai` se vraća na stanje 5.1 |
| **K/1** jedan izvor | `card-limits.js`, paleta i `normFill` u Deno-u, s drift-branom (bivši ③/1) | drift-brana pada na razlici |
| **K/2** duljina | 501 znak odbija s mjestom; 201–500 prolazi uz upozorenje AI-ju (bivši ③/2) | 500 prolazi, 501 pada |
| **K/3** pitanje po kartici | predaja pada ako kartica nema ni kviz ni dopunu (bivši ③/3) | unit + e2e |
| **K/4** boja | svaka lekcija ima boju iz kurirane palete (bivši ③/4) | unit |
| **K/5** učestalost | 60 upisa/min, 1 000/dan po korisniku i po `client_id`, u bazi (bivši ④/1) | 61. upis danas prolazi |
| **K/6** paginacija i kvota | ≤ 500 stavki uz `skraceno`, ≤ 2 000 čvorova po korisniku (bivši ④/2) | N12; 2 001. čvor prolazi |
| **K/7** veličina i vrijeme | objava ≤ 1 MB · `statement_timeout` za `mcp_klijent` · odgovor alata ≤ 1 MB (bivši ④/3) | N13, N16 |
| **K/8** gašenje i opoziv | blokirani `client_id` i opozvan pristanak zaustavljaju upis odmah (bivši ④/4) | I8 |
| **K/9** pravi AI | Claude.ai i ChatGPT na ne-admin računu: cijeli cjevovod, izmjena, zlonamjeran PDF (bivši ⑤) | ishod zapisan za svaki scenarij iz [MCP_TESTING §5](../workflow/MCP_TESTING.md) |
| **K/10** produkcija | SQL → OAuth poslužitelj + hook → funkcija → klijent; `Require current password`, razlika staging/prod, `MCP_RESOURCE_URL`, drift-brana tijela funkcija prije SQL-a; administratorova kartica od 1 819 znakova se skrati (bivši ⑥) | uvjeti [MCP_SECURITY §7](../architecture/MCP_SECURITY.md) zeleni |

**Odgođeno (nije otkazano, dolazi u održavanju ili Leonovom riječju):** ③/0 mjerenje · ③/5 dopuna · ③/6 druga linija ·
③/7 Learn pokriva kartice · ④/5 noćno čišćenje (`pg_cron`) · ④/6 šifrirani backup · ④/7 odjava briše lokalni nacrt ·
prijava u katalog konektora (Anthropic, OpenAI). ⚠️ Bez ③/7 i ③/5 kvalitetu materijala od AI-ja čuvaju samo K/1–K/4 i
validator ②/0a — to je svjesna cijena užeg opsega.

### 2 · DIJELJENJE

Oblik je presuđen unaprijed (bivši F7/1) i potvrđen 03.10.: **link s tajnim tokenom, bez javne biblioteke.**

| cigla | posao | gotovo kad |
|---|---|---|
| **D/1** | baza: token po materijalu, čitanje kroz RPC uz token (ne kroz RLS vlasnika), povlačenje = token nevažeći | stranac bez tokena ne čita ništa; s povučenim tokenom ne čita ništa |
| **D/2** | slike u dijeljenom materijalu — danas su vezane na vlasnički prefiks (ADR-025 je to imenovao kao cijenu) | primatelj vidi slike, a bez tokena ih ne vidi nitko |
| **D/3** | primatelj: otvori, uči, „Spremi u moju policu" (kopija, ne veza) | …kolega uči iz linka i ima kopiju u svojoj polici |
| **D/4** | izgled Mojih materijala — mali prolaz uz gumbe za dijeljenje i skidanje (ne redizajn) | Leonova presuda na telefonu |

**Primatelj (Leon, anketa 03.10.): uči bez prijave; za „Spremi u moju policu" i napredak traži se prijava.**

### 3 · BEZ MREŽE

Mehanizam postoji za katalog (`offline-store.js`, „Download for offline"). Proširuje se na vlastite i dijeljene
materijale; kopija na uređaju briše se pri odjavi (isti razred kao ④/7). **Gotovo kad** materijal skinut na telefonu
radi u zrakoplovnom načinu u instaliranoj aplikaciji.

### 4 · ZNAK

**Obara živo pravilo „znak je nepromjenjiv"** ([ADR-040](../records/DECISIONS.md#adr-040)). Ime Sokrat Study ostaje.
Dodiri: `assets/logo.svg`, favikoni, PWA ikone (stara ostaje do reinstalacije — nije bug), `og-cover.png`
(`npm run build:og`), mail predlošci. Usput: znak je danas 45 KB za 32 px (§4 stare stalne trake). **Dizajn donosi Leon (anketa 03.10.: *„imam logo"*)** —
posao ovdje je ugradnja svugdje; boja marke slijedi njegov znak.

### 5 · DVOJEZIČNOST

Ostatak bivšeg F3 ([archive/RASPORED.md](../archive/RASPORED.md) §F3, tamo je i povijest cigli):
F3/2 dalje po datotekama (`exercises.js` → `progress.js` → …, gumb „Download for offline" ne precrtava se na prekidač) ·
F3/3 editor (ključevi u rječnik, ne brisati pozive). **Izlaz:** `scripts/i18n-baseline.json` prazan.

### 6 · ČIŠĆENJE

Bivši F4 bez promjene: F4/1 gradivo i vježbe · F4/2 Studio na telefonu · F4/3 gašenje starog CSS-a (uz brisanje
sidebara, Leon 06.09.) · F4/4 568 × 320 u branu · F4/5 crveni `cascade.authed.spec.js`. **Izlaz:** `css:debt` = 0,
`styles.bundle.css` ne postoji, `css:diff` nula razlika.

### 7 · RECEPTI

Bivši F5 bez promjene: F5/1 prebroji recepte (presuđuje i 4 kvantitativna HR predmeta) · F5/2 knjižnica + migracija
(stari generatori su proročište; BUG-012 se umirovljuje) · F5/3 izgled vježbi, samo tokeni i razmaci.
`generate()` / `answer()` / `type` se ne mijenjaju.

### 8 · POVIJEST

Bivši F7/2 i F7/3: plitka povijest učenja · kretanje kroz vrijeme na ekranu napretka. Analitika kartica se ne širi.

---

## 3 · Čeka Leonovu riječ

Ništa — sve četiri točke presuđene anketom 03.10.: redoslijed (§1) · primatelj linka (faza 2) · znak donosi Leon
(faza 4) · **F2/4 mail-obavijesti (grana `feat/f2-mail`) čekaju održavanje**, ne ulaze u završnicu.

## 4 · Što je izvan ovog plana

- **HotelixSim** — vlastiti repozitorij i vlastiti plan (`Documents\hotelixsim`); [ideas/HOTEL_SIM.md](../ideas/HOTEL_SIM.md) je od 03.10. samo pokazivač.
- **Zamrznuto (ADR-040):** tržište gradiva (ADR-035: javna objava, prodaja, natjecanje) · organizacije i exam modul
  (ADR-036) · monetizacija. Ne grade se; nisu poništeni.
- **Ne dira se bez Leonove riječi:** produkcija javno poslužuje `.md` (BACKLOG) · brisanje 9 starih testnih računa na
  stagingu · plan „naš AI + API krediti" (BACKLOG).
- Matura, kartice na telefonu (`feat/tinder-kadar`, parkirano), spaced repetition, SEO adrese — kao i dosad, izvan plana.
