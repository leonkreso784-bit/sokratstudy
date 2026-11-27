# Opći dio građanskog prava i obvezno pravo (`civil-obligations-pfri`) — plan gradnje

> **Status: 🟡 potvrđen, gradnja u tijeku (od 2026-11-27).**
> Predmet: PFRI, integrirani pravni studij (`law-integrated-hr`), **2. godina, semestar 2** (izvedbeni plan: `2/4`).
> Službeni naziv kolegija: **„Opći dio građanskog prava i obvezno pravo"**.

> ⚠️ **ZAŠTO OVAJ DOKUMENT POSTOJI.** Plan je bio dogovoren i potvrđen 27.11., ali je u `PROGRESS.md`
> preživjela samo **brojka** („16 kategorija međuispita + 13 završnog, potvrđen") — imena kategorija ostala
> su u razgovoru i izgubila se. Sljedeća sesija je morala rekonstruirati cijeli plan iz izvora prije nego je
> smjela napisati ijedan redak gradiva. **Potvrđena odluka koja nije zapisana nije potvrđena.**

---

## 1. Izvori — što imamo i što NEMAMO

| izvor | opseg | uloga |
|---|---|---|
| **ZOO sa zakon.hr** | pročišćen do NN 69/26, na snazi 7.7.2026., **644 k znakova, 1 186 članaka** | **primarni** izvor za obvezno pravo |
| `obvezno-opci-dio.txt` | korekturni primjerak, staje na str. 141 | subjekti, objekti, sposobnosti, imovina, činidba |
| `posebni-dio-1.txt` | korekturni primjerak, str. 87 | praktički samo kupoprodaja |
| `posebni-dio-2.txt` | korekturni primjerak, str. 81 | dopuna posebnog dijela |
| `kartice-gradjansko.txt` | **90 ispitnih kartica, 334 k znakova** | pravni posao, forma, zastupanje, ništetnost — ono što primjerak ne doseže |
| tri kolokvija | — | provjera opsega i tipa pitanja |

⚠️ **Klarić/Vedriša NEMA.** Propisana literatura ga traži (3–182, 377–491, 557–566), ali ga u dijeljenoj mapi
nije bilo. **Leonova odluka (27.11.): graditi iz ZOO-a + korekturnih primjeraka + ispitnih kartica.**
Posljedica koju treba imati na umu: dijelovi općeg dijela građanskog prava koji nisu u ZOO-u oslanjaju se na
**kartice**, a one su studentske — svaku tvrdnju treba provjeriti protiv ZOO-a gdje je to moguće.

Sve u `_materials/pravri/civil-obligations/` (gitignored, **po klonu** — v. memoriju).

---

## 2. Granica međuispita (iz izvedbenog plana, NE pretpostavljena)

- **Međuispit:** Klarić/Vedriš **3–182** (opći dio građanskog) + **377–491** (obvezno, opći dio) + **557–566**,
  te Slakoper **218–240** (zastara).
- **Završni:** pojedini ugovori + izvanugovorne obveze + **čl. 1130.–1162.**
  ✅ Provjereno u ZOO-u: čl. 1130–1162 su **Odjeljak 5. VRIJEDNOSNI PAPIRI**.

Granica se poklapa sa strukturom ZOO-a: **Glava I–VII = međuispit**, **Glava VIII–IX = završni**.

---

## 3. Kategorije — MEĐUISPIT (16)

| # | Kategorija | Izvor |
|---|---|---|
| 1 | Pojam, izvori i načela građanskog prava | primjerak |
| 2 | Građanskopravni odnos i subjekti | primjerak |
| 3 | Sposobnosti: pravna, poslovna, deliktna | primjerak |
| 4 | Pravne osobe, trgovac, poduzeće | primjerak |
| 5 | Objekti: stvari, nematerijalna dobra, imovina | primjerak |
| 6 | Pravne činjenice | kartice |
| 7 | Pravni posao i očitovanje volje | kartice |
| 8 | Forma, tumačenje, ništetnost i pobojnost | kartice |
| 9 | Zastupanje | kartice |
| 10 | Osnovna načela obveznog prava | ZOO Glava I |
| 11 | Sudionici obveznih odnosa | ZOO Glava II |
| 12 | Nastanak obveza — sklapanje ugovora | ZOO Glava III |
| 13 | Vrste obveza | ZOO Glava IV |
| 14 | Učinci obveza i odgovornost za povredu ugovora | ZOO Glava V |
| 15 | Promjene u obveznom odnosu | ZOO Glava VI |
| 16 | Prestanak obveza i zastara | ZOO Glava VII + Slakoper 218–240 |

## 4. Kategorije — ZAVRŠNI (13)

| # | Kategorija | ZOO |
|---|---|---|
| 1 | Kupoprodaja | Gl. VIII, Odsjek 1 |
| 2 | Zamjena, prodajni nalog, darovanje | Odsjeci 2–4 |
| 3 | Zajam i posudba | Odsjeci 5–6 |
| 4 | Zakup i najam | Odsjeci 7–8 |
| 5 | Doživotno i dosmrtno uzdržavanje | Odsjeci 9–10 |
| 6 | Ugovor o djelu i o građenju | Odsjeci 11–12 |
| 7 | Ortaštvo, prijevoz, licencija | Odsjeci 13–15 |
| 8 | Ostava i uskladištenje | Odsjeci 16–17 |
| 9 | Nalog, komisija, trgovinsko zastupanje, posredovanje, otprema | Odsjeci 18–22 |
| 10 | Turistički ugovori i osiguranje | Odsjeci 23–27 |
| 11 | Bankarski poslovi | Odsjeci 28–36 |
| 12 | Odgovornost za štetu | Gl. IX, Odjeljak 1 |
| 13 | Stjecanje bez osnove, poslovodstvo bez naloga, javno obećanje nagrade, vrijednosni papiri | Odjeljci 2–5 |

---

## 5. Tehnički okvir (obrazac PFRI predmeta)

- Datoteke: `data/civil-obligations-pfri/{midterm-1,midterm-2,final}.js`
- Lekcije: `first-midterm` („Međuispit") · `second-midterm` („Gradivo završnog ispita") · `final` („Cijelo gradivo")
- Varijable: `ogpPfriM1` · `ogpPfriM2` · `ogpPfriFinal` · `dataFormat: 'json'`
- `final` = `Object.assign(M1, M2, { examPractice })` — **final.js se učitava ZADNJI**
- Poslije izmjene: `npm run validate:content -- civil-obligations-pfri` · `npm run export:json` · `npm run verify`

## 6. Pravila sadržaja koja ovdje posebno vrijede

- **Kartica < 200 znakova**, detalj ide u learn ([[content-model-standard]]).
- **`check:kviz`** (brana s ove grane): pitanje se ne smije dati pogoditi bez znanja — pazi na BUG-054
  (točan odgovor najdulja opcija) i na apsurdne distraktore.
- **`check:names`**: ZOO i kartice sadrže imena stvarnih osoba (sudska praksa, autori) — ne prepisivati ih.
- Pravni tekst se **ne parafrazira u netočnost**: gdje ZOO ima broj članka, navesti ga.
