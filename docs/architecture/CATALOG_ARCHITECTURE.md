# CATALOG_ARCHITECTURE — Identitet predmeta preko programa i fakulteta

> **Status (2026-07-11):** ✅ **IMPLEMENTIRANO — U2.5 (`b969892`).** Mehanizam iz §5 (placement dual-mode: legacy `programId/year/semester` XOR `placement[]`) živi u `data/catalog.js` (`placementsOf()/isInProgram()`); §6 invarijante = `scripts/verify-catalog.js` (+ fixture-dokazi `tests/fixtures/catalog-placement-*.js`, unit `tests/unit/catalog-placement.test.js` 11/11). Legacy 18 predmeta grandfathered (bez preimenovanja — napredak/storageKey netaknut; prefiks-pravilo §2 vrijedi za NOVE placement-predmete). Stvarni MUH/MUT/MOR programi + dijeljeni predmeti = S7 (**bez vlasnika od 2026-09-04** — suradnik otkazan; silabusi presuđuju §8). Odluka: ADR-022; resekvencirano ADR-023 t.5.
> **⚠️ 2026-11-14 (ADR-041):** MOR je dodan, ali **NE kroz placement** — 9 zajedničkih kolegija su **kopije `-mor`**
> (vlastiti id i `storageKey`, iste `data/<muh-id>/*.js`), jer bi placement preimenovao žive id-eve. Placement je i dalje
> neiskorišten mehanizam; za novi fakultet bez živih id-eva smije se ponovno razmotriti.
> **Program nosi `lang`** (`'hr'`) → `SokratCatalog.uiLangOf(s)` daje jezik sučelja koji predmet predlaže (`js/i18n.js`).
> Ovaj doc je pun model + konvencije + primjeri + verify-pravila. Rješava kako **dijeliti „vezne" predmete**
> među smjerovima bez dupliciranja i bez rizika da baza „pukne", uz očuvanu hijerarhiju.

## 0. Problem
Rast ide preko **HR 1. godine za 3 smjera FMTU:** Menadžment u Hotelijerstvu (MUH), u Turizmu (MUT), održivog razvoja (MOR).
Dijele „vezne" predmete (isti kolegij u više smjerova). Kasnije i drugi fakulteti. Pitanje: kako modelirati **identitet**
predmeta da (a) ne dupliciramo isti sadržaj ×3, (b) ne dođe do kolizije preko fakulteta, (c) hijerarhija ostane netaknuta.

## 1. Ključni uvid: dvije odvojene osi
| Os | Što je | Primjer |
|----|--------|---------|
| **Placement (hijerarhija)** | GDJE se predmet prikazuje u Browse-u: fakultet → smjer → godina → semestar | „FMTU / MUH / 1. god / sem 1" |
| **Identitet sadržaja** | ŠTO predmet nosi: kartice/kviz/fill/learn (+ vježbe) | skup od 5 kat., 60 fc, … |

**Hijerarhija se NIKAD ne krši** — svaki predmet ima eksplicitne koordinate. Ali **jedan sadržaj može biti postavljen na više koordinata**
(kad je dijeljen). To je cijela tajna: „gdje se prikazuje" ≠ „što je".

## 2. Konvencija imenovanja (kanonski id)
```
<fakultet>-<predmet>-<jezik>
```
- `fmtu-matematika-hr` — FMTU, matematika, hrvatski.
- `fmtu-matematika-en` — ista, engleski (zaseban sadržaj/jezik; ADR-012 klon, ne i18n u sadržaju).
- `drugifax-matematika-hr` — drugi fakultet → **različit id → nemoguća kolizija.**

Prefiks fakulteta jamči da se predmeti različitih fakulteta **fizički ne mogu pomiješati**, čak i kad im je naziv isti.
Prezentacijski naziv koji student vidi („Matematika") ostaje ljudski i neovisan o id-u.

## 3. Odluka: dijeliti ili duplicirati?
Ovisi o predmetu — dva slučaja:

| Slučaj | Pravilo | Id |
|--------|---------|-----|
| **Isti fakultet, isti silabus, više smjerova** | **DIJELI** — jedan sadržaj, više placement-koordinata (uređuješ jednom) | `fmtu-matematika-hr` u MUH+MUT+MOR |
| **Isti fakultet, smjer ima drukčiji sadržaj** | **DUPLICIRAJ** — zaseban predmet | `fmtu-matematika-mor` odvojeno |
| **Preko fakulteta** | **UVIJEK DUPLICIRAJ** (+ prefiks fakulteta) | `drugifax-matematika-hr` |

**Kako znati je li silabus identičan?** Iz silabusa/profesora (isti kolegij isti prof za više smjerova = dijeli).
Sumnjaš li → duplicirati je uvijek sigurno (samo skuplje za održavanje).

## 4. Napredak (progress)
Napredak prati **identitet sadržaja**, ne program:
- **Dijeljeni** predmet = jedan `storageKey` → naučiš jednom, vrijedi u svim smjerovima (efikasno + pedagoški točno).
- **Duplicirani** predmet = vlastiti `storageKey` → zaseban napredak (jer je različit sadržaj).

## 5. Placement-model (kako program „drži" predmete)
Program **ne posjeduje** sadržaj — **referencira** predmete. Predmet nosi popis svojih placement-koordinata:
```
predmet fmtu-matematika-hr:
  content:   { scripts, resolve, storageKey: 'fmtu-matematika-hr-progress' }
  placement: [
    { faculty: 'fmtu', program: 'muh', year: 1, semester: 1 },
    { faculty: 'fmtu', program: 'mut', year: 1, semester: 1 },
    { faculty: 'fmtu', program: 'mor', year: 1, semester: 1 }
  ]
```
Browse-stablo crta predmet na sve tri koordinate; sadržaj postoji jednom. (Trenutni catalog već razdvaja `programs` od `subjects` →
prijelaz na placement-popis je mala, additivna promjena, NE veliki refaktor.)

## 6. Sigurnost: verify-gate (protiv „da se sijebe")
`verify-catalog.js` čuva invarijante — kršenje = crveno PRIJE deploya:
1. **Jedinstven kanonski id** po predmetu (nema slučajnih kolizija).
2. Predmet u **više programa** smije SAMO ako se `content` + `storageKey` **identično razrješavaju** na svim koordinatama (dijeljenje = stvarno isti sadržaj, ne slučajno isti id).
3. **Prefiks fakulteta** obavezan u id-u (regex-gate) → cross-fakultet kolizija nemoguća.
4. Svaka placement-koordinata pokazuje na postojeći `faculty/program/year/semester`.

Dijeljenje NIJE rizičnije od dupliciranja — **ako gate čuva pravila.** To je ista disciplina koju već imamo (verify/RLS/CI).

## 7. Maping na bazu (F4+)
Kad F4 flipne autoritet na bazu:
- `content` red po **kanonskom id-u** (1 red = 1 window-var, kao sad `subject_content`).
- `placement` tablica: `(subject_id, faculty, program, year, semester)` — više redaka za dijeljene predmete.
- `verify` pravila → RLS/constraint + `verify-catalog` na exportu.

## 8. Primjer: HR 1. godina × 3 smjera (skica, potvrditi silabusima)
Vjerojatna **zajednička jezgra** (dijeli se, jedan sadržaj): matematika, statistika, mikroekonomija, poslovna informatika, akademsko pisanje.
**Smjer-specifično** (duplicira se): predmeti gdje se silabus razlikuje po smjeru. → **Točnu podjelu daju silabusi (korisnik).**

## 9. Redoslijed
~~Implementacija ide **NAKON F4**~~ **NADIĐENO (ADR-023 t.5, 2026-07-09): povučeno naprijed = cigla U2.5 → ✅ IMPLEMENTIRANO 2026-07-11 (`b969892`)** — vidi status na vrhu. Izvorni razlog timinga (kolokviji ~4. mj = runway) i pravilo „model u catalog PRIJE kreiranja 3 HR programa" su ispunjeni: mehanizam postoji prije S7.

## 10. Reference
ADR-022 (ova odluka) · ADR-002 (hijerarhija institucija) · ADR-003 (catalog izvor istine) · ADR-012 (HR klon, ne i18n u sadržaju) ·
ADR-021 (F4 CRUD) · `HRV_PLAN.md` · `CRUD_PLAN.md` · [[hrv-program]] [[content-roadmap-sequencing]].
