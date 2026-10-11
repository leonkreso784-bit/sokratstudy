# Content Intake — kako slagati izvorne materijale (PPT/PDF/JPG)

> Cilj: da pretvaranje profesorskih prezentacija u gradivo bude TOČNO i da se
> tekst (pogotovo formule) ne iskvari. Materijali idu u `_materials/` (gitignored).

## Format — po točnosti teksta
1. **PDF s pravim tekstom (NAJBOLJE)** — PowerPoint → *Save As → PDF*. Tekst ostaje
   selektabilan pa ga čitam doslovno (najmanje grešaka). Preferiraj za predmete bogate
   tekstom (ekonomija, management, informatika).
2. **JPG / PNG slike** — čitam ih vizualno (kao OCR). Dobro za slajdove s dijagramima i
   slikama; kod sitnog/gustog teksta moguća pokoja greška. Jedan slajd = jedna slika,
   visoka rezolucija, nazivi zero-padded (`Slide01.jpg`).
3. **Izbjegavaj**: niskorezolucijske screenshotove, jako kompresirane slike, "spojene"
   prezentacije u jedan fajl bez reda.

## ⚠️ Kvantitativni predmeti (Math / Micro / Macro / Statistika) — poseban tretman
Ovi predmeti idu **drugačije** od tekstualnih (puna razrada: [DECISIONS.md](../records/DECISIONS.md) ADR-009):
- **Formule → KaTeX/LaTeX.** ✅ KaTeX implementiran (ADR-009). Delimiteri **currency-safe: `\( \)` inline,
  `\[ \]` / `$$ $$` blok — NE jedan `$`** (valutni `$NN` bi se pokvario). Vidi [CONTENT_SCHEMA.md](../architecture/CONTENT_SCHEMA.md) §Matematika.
- **Slike (JPG slajdovi):** čitam ih (Read alat čita JPG/PNG) i **transkribiram formule u LaTeX**.
  Math materijal su tipkani PPT slajdovi (provjereno čitljivi) → izvedivo, ali **ti OBAVEZNO pregledaš matematiku**.
- **Grafovi** (tangente, ponuda/potražnja, distribucije): zasad croppani slajd kao slika u `learn.image`.
- **Pedagogija:** worked-problems na postojećim modovima (Learn = riješeni primjeri korak-po-korak;
  Quiz = numerički, distraktori = tipične greške).
- **Redoslijed:** čista **Matematika ZADNJA** (najveća gustoća formula); pilot na predmetu s najviše konceptualnog + materijalima.
- **Rizik:** točnost → male serije, `verify` + tvoj pregled nakon svake cigle.

## Inventar 1. godine (ažurirano 2026-06-24)
Folder: `C:\Users\leonk\OneDrive\Documentos\1. godina Hospitality Managament`

| Predmet | Materijali | Status |
|---|---|---|
| Business Informatics | 12 PDF | ✅ GOTOVO (pilot — tekstualni pipeline) |
| Special interest in tourism | 13 PDF + txt | ✅ GOTOVO (LIVE) |
| Management | 11 PDF | ✅ GOTOVO (LIVE) |
| Microeconomics | 172-str deck | ✅ GOTOVO (prvi kvantitativni, KaTeX) |
| Statistics | 26 datoteka | ✅ GOTOVO (study + 56 vježbi) |
| Macroeconomics | 19 PDF | ✅ GOTOVO (study + ~81 vježba) |
| Academic writing | 13 PDF | ✅ GOTOVO (prvi kroz **generator** + cite-vježbe) |
| Traffic in tourism | 0 | ▶ **SLJEDEĆI** — treba materijale od korisnika |
| Math | 100 JPG + 8 PDF + docx | ⬜ TODO — **ZADNJA** (najveća gustoća formula); plan [MATH_PLAN.md](../subjects/MATH_PLAN.md); KaTeX + grafovi-kao-slike |
| Introduction to hospitality | 0 | ⛔ **BLOKIRAN** — korisnik NEMA PDF-ove (2026-06-24); preskočiti dok ih ne nabavi |
| English | 2 PDF | tanko (niski prioritet) |

**Stanje (2026-06-27):** **1. god = 9/9 KOMPLETNO i LIVE** (Traffic ✅ 2026-06-25, **Math** ✅ 2026-06-27 — zadnji). **Intro to Hospitality = blokiran** (nema PDF-ova). Novi predmeti se rade kroz
**generator** ([CONTENT_GENERATOR.md](./CONTENT_GENERATOR.md)) — jeftino, ali sadržaj VERIFICIRATI protiv predavanja.

## Marketing (2. god) — intake & plan (2026-06-05) ← SLJEDEĆE
Folder: `C:\Users\leonk\OneDrive\Documentos\2. godina Hospitaliy Managament\Marketing`
Svi PDF-ovi, **čista ekstrakcija teksta** (PPT-export, provjereno) → **bez KaTeX-a** (konceptualni predmet).

**Teme (TJ = tema):** T1 Concept · T2 Environment · T3 Market · **T4 = `Market Research.pdf`** (nenumeriran) ·
T5 Segmentation · T6 Consumer behaviour · **T7 Product** · **T8 Price** · T9 Distribution · T10 Promotion ·
T11 New trends in promotion · T12 Planning · T13 Organizing & Controlling.

**Podjela kolokvija (potvrdio korisnik): 2. kolokvij = T9 → kraj.**

> ⚠️ **Bilješke ispod su iz lipnja 2026 i opisuju stanje TOG TRENUTKA.** „NIJE deployano" u njima
> više ne vrijedi — **cijeli Marketing je na produkciji od 2026-06-06** (`822d788`). Ostavljene su
> jer objašnjavaju **kako je predmet podijeljen**, što je i dalje korisno; status čitaj iz
> [subjects/README.md](../subjects/README.md).
- **1. kolokvij = T1–T8. ✅ GOTOVO (Sesija 20, 2026-06-05).** Dodane kategorije `product` (T7) i `price` (T8)
  u `data-marketing.js` (bilo T1,2,3,5,6). Verify 0, Playwright 36/36. Lokalni commit, NIJE deployano.
- **2. kolokvij = T9–T13. ✅ GOTOVO (Sesija 21, 2026-06-05).** Novi sibling fajl `data-marketing-m2.js`
  (`marketingM2Data`) s 5 kategorija (distribution, promotion, newTrendsPromotion, marketingPlanning,
  organizingControlling). Catalog `second-midterm` → `marketingM2Data`, coming-soon uklonjen. Verify 0,
  Playwright 36/36 + ciljani K2 render-test (4 profila, 0 problema). Lokalni commit, NIJE deployano.
- **Finalni ✅ GOTOVO (Sesija 22, 2026-06-06).** Struktura = **HIBRID** (odluka korisnika): `data-marketing-final.js`
  → `marketingFinalData = Object.assign({}, marketingData, marketingM2Data, { examPractice })`. Spaja svih 12
  kategorija K1+K2 + kurirana `examPractice` (cross-topic). Catalog: lekcija `final`, script zadnji, `resolve.final`.
  Verify 0, strukturni validator 0 (13 kat.), Playwright 36/36 + ciljani final render-test (4 profila). Lokalno, NIJE deployano.

**Redoslijed rada (ciglu po ciglu, verify + Playwright + pregled nakon svake):**
1. ~~T7 + T8 → postojeći 1. kolokvij (`data-marketing.js`).~~ ✅ **GOTOVO (S20)**
2. ~~2. kolokvij T9–T13 (`data-marketing-m2.js` → `marketingM2Data`; catalog resolve; ukloniti coming-soon).~~ ✅ **GOTOVO (S21)**
3. ~~Finalni — NOVA lekcija (hibrid: spoj K1+K2 + Exam Practice).~~ ✅ **GOTOVO (S22)**
→ **Marketing predmet KOMPLETAN.** Sljedeće: deploy paketa (uz potvrdu) pa drugi predmeti.
**Catalog sad:** marketing ima `first-midterm` (✅) + `second-midterm` (coming-soon). Provjeri kako su drugi
predmeti riješili „final" (te2 ima zaseban `te2FinalData`; BI radi `Object.assign(M1,M2)`).

## Economics in Hospitality (2. god) — intake & nalaz (2026-06-09)
Folder: `2. godina Hospitaliy Managament/Economics of hospitality` (svi PDF, čista ekstrakcija teksta).
Intro (`1 Introductory information 2026.pdf`) = silabus: **T7 = 1. midterm, T13 = 2. midterm** → **1. kolokvij =
T2–T6 = Unit 1–5**, 2. kolokvij = Unit 6–10 (Unit 6–10 imaju i „add" verzije). Kolegij: K. Mikinac, FTHM, sem IV, 9 ECTS.

**1. kolokvij ✅ GOTOVO (Sesija 27).** Postojeći `data-econ-hospitality.js` (5 jedinica) imao **točnu strukturu** ali
**pretanak sadržaj** (~15–25% slajdova; U3/U4/U5 = 48–55 slajdova). Rebuild iz izvora → **73 fc / 46 quiz / 36 fill** +
bogat learn. Catalog opis 1. kolokvija ispravljen (bio pogrešno „seminarski").

**2. kolokvij ✅ GOTOVO (Sesija 28).** Unit 6–10 (teme T8–T12: business result, success & KPIs, price policy, sales,
investment profitability) → novi `data-econ-hospitality-m2.js` (`economicsHospitalityM2Data`, 5 kat., **75 fc / 50 quiz /
40 fill**). Pročitane i glavne i „add" prezentacije (KPI formule iz „add": ADR/RevPAR/TRevPAR/GOP/GOPPAR/NOP/EBITDA).

**Finalni ✅ GOTOVO (Sesija 29).** Hibrid `data-econ-hospitality-final.js` = `Object.assign({}, m1, m2, { examPractice })`
→ 11 kat. / 162 fc / 106 quiz / 84 fill (10 jedinica + cross-topic Exam Practice). Catalog: lekcija `final`, script zadnji,
`resolve.final`. → **Economics in Hospitality 100% KOMPLETAN (K1 + K2 + finalni).** Napomena: postoji i zaseban folder
`seminar Hospitality economics` (seminarski dio, drugačiji od predavanja) — nije obrađen.

## Tourism Geography (2. god) — intake & nalaz (2026-06-09)
Folder: `2. godina Hospitaliy Managament/Tourism Geography` (svi PDF, čista ekstrakcija teksta — PPT-export, sažeti slajdovi).
Prof. H. Grofelnik. **Podjela kolokvija iz imena datoteka + silabusa (prez. 0):** 1. kolokvij = „Introduction to Geography +
Tourism Geography of Croatia" (prez. **0–6**: `0 Welcome`, `1 Introduction`, `2–6 HM-TG`); 2. kolokvij = „Tourism Geography
of the World" (prez. **7–12**, oznaka `_2K_`). Bodovi: 1.K 20 + 2.K 20 + slijepa karta 10 + seminar 20 + finalni 30; testovi =
10 pitanja (5 zatvorenih + 5 otvorenih).

**1. kolokvij ✅ POPRAVLJEN (Sesija 30).** Pregled je pokazao da **statistike NISU pogrešne** (sve doslovno sa slajdova prez. 3:
GDP 23.200 EUR/80%, 170.723 dozvole, 31%/31%, Top 10 noćenja 2024), nego da je **falio konceptualni uvod**. Izmjene u
`data-geography.js`: + nova kategorija `introToGeography` (prez. 1); `croatiaFeatures` prepisan vjerno prez. 2+3;
`protectedAndTouristRegions` dopunjen prez. 4–6 (okvir zaštite 9 kat./5.930 km²/10,1%; statistika 2017; planinska +
istočno-slavonska regija). **Slijepa karta (`blindMapDrill`) i `examFramework` NETAKNUTI** (uputa korisnika). Geografija
sad = 6 kat. / 58 fc / 72 quiz / 43 fill. Verify 0, Playwright 36/36, `CONTENT_VERSION` 20260616.

**2. kolokvij ✅ GOTOVO (Sesija 31).** Prez. 7–12 (`_2K_` = „Tourism Geography of the World") → novi sibling
`data-geography-m2.js` (`geographyM2Data`) sa **6 kategorija po kontinentu** (globalIntro/europe/asia/africa/
australiaOceania/americas; 56 fc / 45 quiz / 33 fill). Catalog `second-midterm` → `geographyM2Data`, coming-soon
uklonjen. Slijepa karta ostaje vezana uz 1. kolokvij (m2 nema blind-map). Verify 0, Playwright 36/36, `CONTENT_VERSION`
20260617.

**Finalni ✅ GOTOVO (Sesija 32).** Hibrid `data-geography-final.js` = `Object.assign({}, geographyData, geographyM2Data,
{ examPractice })` → **13 kat. / 128 fc / 127 quiz / 84 fill** (12 kategorija oba kolokvija + cross-topic „Exam Practice
(Croatia + World)"). Silabus: finalni = 30 bodova, ista struktura kao kolokviji. Catalog: lekcija `final`, script zadnji,
`resolve.final`. `CONTENT_VERSION` 20260618. → **Tourism Geography 100% KOMPLETAN (K1 + K2 + finalni).** (2. god ostaje
samo Food & Nutrition 2. kolokvij.)

## Food & Nutrition (2. god) — intake & nalaz (2026-06-10)
Folder: `2. godina Hospitaliy Managament/food and nutrition` (FAN 1–14 + `FAN Introduction`, čista PDF ekstrakcija).
Prof. dr. sc. Greta Krešić. **Podjela kolokvija iz silabusa (FAN Introduction, slajd 3):** 1. kolokvij = Teme **1–7**
(13.04., „Topics No 1–7"), 2. kolokvij = Teme **8–14** (25.05., „Topics No 8–14"). Bodovi: 2×24% kolokviji + finalni 30%
(min 15%); kolokvij = 14 pitanja (12 kratkih × 1.5% + 2 esejska × 3%); finalni = 16 pitanja (12 + 4 esejska).

**1. kolokvij ✅ VERIFICIRAN + USKLAĐEN (2026-06-10).** Sadržaj Tema 1–7 usporedjen s izvorima FAN 1–7 — **0 činjeničnih
grešaka** (energetske vrijednosti 4/4/9 kcal/g; klasifikacije; procesne temperature; postoci sastava — sve točno i vjerno).
**Strukturna ispravka:** postojeći K1 je pogrešno uključivao **Beer (Tema 8)**; po silabusu Beer pripada 2. kolokviju → Beer
**premješten** iz `data-food-nutrition.js` u K2 (sadržaj identičan, ključ `beer` nepromijenjen → napredak učenika očuvan).
K1 sad = 7 kat. (Topics 1–7, završava na Wine; 89 fc / 86 quiz / 58 fill).

**2. kolokvij ✅ GOTOVO (2026-06-10).** FAN 8–14 → novi sibling `data-food-nutrition-m2.js` (`foodNutritionM2Data`) sa
**7 kategorija po temi** (beer / distilledSpirits / meat / fish / milkDairy / eggs / healthyDiet; **71 fc / 84 quiz / 56 fill**).
Catalog: `scripts` += m2, `resolve.second-midterm = foodNutritionM2Data`, coming-soon uklonjen, opisi lekcija osvježeni.
Verify 0, strukturni validator 0, Playwright 40/40 + ciljani K2 render-test (4 profila). `CONTENT_VERSION` 20260620.

**Finalni ✅ GOTOVO (2026-06-10).** Hibrid `data-food-nutrition-final.js` = `Object.assign({}, foodNutritionData,
foodNutritionM2Data, { examPractice })` → **15 kat. / 174 fc / 182 quiz / 122 fill** (14 kategorija oba kolokvija +
cross-topic „Exam Practice (All Topics)"). Silabus: finalni = 30% (min 15%), obavezan, prag 35%; 16 pitanja (12 kratkih +
4 esejska). Catalog: lekcija `final`, script zadnji, `resolve.final`. `CONTENT_VERSION` 20260621. Verify 0, strukturni
validator 0, Playwright + ciljani final render (4 profila, quizOpts=16). → **Food & Nutrition 100% KOMPLETAN (K1 + K2 + finalni).**

## Struktura mapa (gitignored)
```
_materials/
  year-1/
    microeconomics/
      midterm-1/  01_intro.pdf  02_demand.pdf ...
      midterm-2/  ...
      final/      ...
    macroeconomics/ ...
  year-2/ ...
```
- **Po predmetu → po kolokviju (k1 / k2 / završni).** Ovo je ključno: samo TI znaš koja
  prezentacija ide u koji kolokvij (iz silabusa) — označi to mapom ili porukom.
- `NN_` prefiks za redoslijed; jedna prezentacija = jedan fajl.

## HR izvori — Merlin (2025/26) i pouke iz HR 1. godine (27.–29.09.2026)
- **Merlin ide preko računa kolegice** (smjer Održivi razvoj; prijavila se sama); sesija se čuva u
  `_materials/.merlin-session.json` (gitignored). Skida se **SAMO materijal kolegija** — rezultati, grupe i
  životopisi se preskaču. Odredište: `_materials/<id>-hr/`.
- Merlin je bogat samo za Statistiku i Makro; Mikro/OIPD su s Drivea, Matematika = 3 pptx + 18 fotografija ispita.
- **Kviz miješa pitanja I opcije** (`js/quiz.js`) → nema ulančanih „Nastavak:" pitanja; pristranost po indeksu je nevažna.
- `answers` kod dopuna = **više praznina**, ne alternativni odgovori.
- `<small>` nije na popisu oznaka koje renderer propušta — ne koristiti ga u gradivu.

## Tok rada
1. Ti složiš materijale po gornjoj strukturi (ili samo pošalješ putanju + koji su za koji kolokvij).
2. `npm run scaffold -- <id> "<Naziv>" <godina> <semestar>` (kostur predmeta).
3. Ja pročitam materijale i generiram flashcards/quiz/fill/learn po `CONTENT_SCHEMA`.
4. `npm run verify` + pregled (ti potvrdiš točnost, pogotovo formule).
5. Deploy uz bump `?v=` (vidi [[css-cache-bump-version]] princip).
