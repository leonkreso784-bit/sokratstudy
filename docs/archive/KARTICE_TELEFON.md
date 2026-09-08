# KARTICE NA TELEFONU — Tinder-kadar (F1/12 · F1/13) — ⏸️ PARKIRANO

**Status:** ⏸️ **PARKIRANO 2026-09-08** (Leon: *„makni sve ovo što smo za kartice napravili, arhiviraj,
nije bitno iskreno … kartice ostaju kakve jesu i ovo što smo sada radili možemo arhivirati da u neko
drugo vrijeme dovršimo"*). **Ovo NIJE ispunjen plan** — to je poglavlje koje je svjesno prekinuto
uz rad koji stoji na grani i čeka.

> **Zašto je prekinuto:** poglavlje je pojelo šest sesija i devet popravaka, a zadnji nalaz (skrol
> naličja na iPhoneu) tražio je redizajn, ne zakrpu. Leon je presudio da to ne vrijedi sad — frontend
> profila i vlastitog sadržaja nose više.

---

## 1 · Gdje je kod

| | |
|---|---|
| **grana** | `feat/tinder-kadar`, vrh **`f3f0116`** (pushana) |
| **preview** | `studymaster-git-feat-tinder-kadar-leon-kresos-projects.vercel.app` |
| **produkcija** | **`c53c28c` — NIŠTA od ovoga nije na njoj** |
| pomoćna grana | `fix/kadar-nalicje` — A/B prekidači `?bez=pany,perspektive,transformacije,overflowauto` (sonda za iPhone) |

⚠️ **Na istoj grani parkirana su i dva popravka koja NISU dio poglavlja o karticama:**
**BUG-046** (pilula kategorije — 11 od 20 boja gradiva padalo je AA, najgori 3,31) i **BUG-045**
(Service Worker nikad nije spremao runtime-assete). Oba su gotova i s branama; oba čekaju na grani.
Kad se bude odlučivalo o produkciji, to su dvije stavke koje s karticama nemaju veze.

### ⚠️ CI JE CRVEN NA VRHU OVE GRANE — i to nije flake

Utvrđeno **2026-09-08**, nakon parkiranja. **Produkcija (`c53c28c`) je zelena i ovo je ne dira.**
Pada isključivo `Playwright shard 1/2`; `build`, `authed` i `shard 2/2` su zeleni u oba runa.

| commit | ishod | što je palo |
|---|---|---|
| `728f64b` i sve prije | ✅ | — |
| **`9b7272c`** (F1/12 ⑨) | ❌ | `phone.spec ⑩` — kartica **597 od 734 px** sigurne širine (852 px polegnuto) |
| **`f3f0116`** (docs-only) | ❌ | `smoke.spec` — **`math/flashcards: H-OVERFLOW innerW=375 docW=618`** |

**Dva testa, jedan korijen — i to je ⑨.** ⑨ je namjerno ukinuo obuzdavanje kartice
(`minmax(0, 1fr)` → `1fr`, `height` → `min-height`, lica na `overflow: visible`). Od tada širinu
kartice diktira njezino **najšire dijete**, jer `1fr` = `minmax(auto, 1fr)`, a `auto` minimum je
min-content. Na predmetu `math` to je **KaTeX formula** — nelomljiva. Otud dva lica istog kvara:
polegnuto kartica ne dosegne traženi postotak širine, a na 375 px dokument naraste na 618 px —
dakle vodoravni skrol cijele stranice, točno ono što je ⑨ trebao ukloniti.

⚠️ **Zašto ovo puna lokalna suita NE VIDI:** na ovom Windowsu prolazi. Isti test, ciljano, na
praznom stroju: `subjects=24 problems=0 errors=0`, **1 passed (43,6 s)**. Windows fontovi tu
formulu iscrtaju dovoljno usko da stane; Linux runner je ne stane. **To je udžbenički primjer
pravila „zeleno lokalno nije zeleno"** (`docs/workflow/TESTING.md`) — i razlog zašto se ovo
poglavlje ne smije zatvoriti riječima „suita je prošla".

**Mehanizam s `1fr` je zaključen iz samog ⑨** (opisuje ga u poruci commita) — **nije izmjeren na
Linuxu**; za to treba artefakt runa (traži admin prava) ili proba u CI-ju.

⚠️ **Posljedica koja nadživljava poglavlje:** **BUG-045 (`3708e2d`)** i **BUG-046 (`2641834`)** sjede
na ovom istom vrhu. Ako ikad zatrebaju, idu **cherry-pickom** — **nikad uzimanjem vrha grane**, jer
vrh nosi ovo prekoračenje.

**Kako se pali CI ovdje uopće čita:** `gh` nije instaliran, a logovi (`/actions/jobs/{id}/logs`) i
artefakti (`/actions/artifacts/{id}/zip`) traže admin prava. Ali repo je javan, `playwright.config.js`
u CI-ju vrti `['github']` reporter, pa **`GET /repos/{o}/{r}/check-runs/{id}/annotations` javno vraća
punu poruku pada** — ime testa, tvrdnju i brojke. Put: `actions/runs` → `runs/{id}/jobs` →
`check-runs/{id}/annotations`.

## 2 · Što je izvedeno i izmjereno

**F1/12 (Tinder-kadar) ⓪–⑨** i **F1/13 (palac lista, gumbi sude)**. Kartica je ekran, ✓ / ✕ pod
palcem, red ← ✕ ✓ →, izbornik kraja špila, gesta odvojena od suda, tablica `AKCIJE` kao izvor.
Puni tijek svake cigle (mjere, hipoteze, odbačene hipoteze) je u
[PROGRESS.md](../records/PROGRESS.md) i [CHANGELOG.md](../records/CHANGELOG.md) pod datumima
**2026-09-06 do 2026-09-08**; nalazi i odluke u [BACKLOG.md](../records/BACKLOG.md).

**Zadnje stanje (⑨, 08.09.):** kartica na dodiru **više nije skroler** — `overflow: visible`, ljuska
`min-height` umjesto `height`, mreža `1fr` umjesto `minmax(0, 1fr)`, tijelo otključano (⑦ povučen),
red ← ✕ ✓ → ljepljiv, izbornik kraja špila vezan za vidljivi pojas. Izmjereno na 393×852 s karticom
od 3357 znakova: kartica 578 → 1495 px, dokument 852 → 1769 (skrola 917), skroler u kartici nula na
obje osi, red nepomičan na 725–789 px kroz cijeli skrol. Kratka kartica: dokument 852 = točno ekran.

**⑨ NIJE prošao Leonov uređaj** — parkirano je prije te presude. Sve tvrdnje o njemu su iz
headless-motora i sonde, ne s iPhonea.

## 3 · Pravila koja NADŽIVLJAVAJU poglavlje

Ovo je jedini dio koji se ne smije izgubiti — svako je plaćeno mjerenjem:

1. **Isti element ne može biti i okomiti skroler i vodoravna gesta.** Preglednik na skroleru zaključa
   os na početku geste i drži je do podizanja prsta; naš JS istovremeno sudi po prevazi. Dva suca,
   jedna gesta. Rješenje je razdvajanje — ili gesta ide s elementa, ili skrol.
2. **CSS sam upali drugu os.** Čim jedna os prestane biti `visible`, druga s `visible` padne na
   `auto`. Naličje je tako bilo vodoravni skroler bez ijednog piksela za skrolati — os koju nitko
   nije napisao i koja se u izvoru ne vidi.
3. **`min-height: auto` ≠ `min-height: 0`.** Nula skida pod, ali gasi i automatski minimum — element
   se onda smije stisnuti ispod sadržaja, a pod `overflow: hidden` je taj višak nevidljiv i nedosežan.
4. **Brisanje pravila nije gašenje pravila.** `overflow-y: auto` stoji i u osnovnom pravilu kartice,
   pa se sve vraćalo na `auto / auto` dok se `visible` nije napisao izričito. Sonda je to uhvatila.
5. **Test skrola koji mjeri samo na DNU ne dokazuje ništa** — ondje je i neljepljiv red na ekranu,
   jer je zadnji element stranice. Mjeri se vrh, sredina i dno.
6. **`touch-action` se čita kroz lanac do PRVOG skrolera.** Dok su lica bila skroleri, pravilo na
   kartici nije značilo ništa; bez skrolera se čita cijeli lanac i gesta je robusnija.
7. **`incomplete` u axe-u nije prolaz** (BUG-046): brana je sudila samo po `violations`, pa je
   nedovoljan kontrast na produkciji bio nevidljiv jer ga je axe prijavljivao kao „nisam siguran".
8. **Presuda pripada uređaju.** Pet popravaka skrola bile su hipoteze na motorima koji kvar ne
   reproduciraju. Prvi koji je pomogao izmjeren je Leonovim iPhoneom kroz `?bez=` prekidače.

## 4 · Što je ostalo ako se poglavlje otvori

| stavka | stanje |
|---|---|
| **⑨ na Leonovom iPhoneu** | neizmjereno — prvo to, prije ijednog novog popravka |
| **F1/14 tutorial** pri prvom ulasku u kartice (poseban za telefon, poseban za komp) | nije počet; `AKCIJE` u `js/flashcards.js` je izvor istine za korake |
| **F1/15 zvjezdica** → špil „Označene", četvrta radnja u izborniku kraja špila | nije počet; dira isti red gumba |
| **miješanje / ispočetka USRED špila** | otvoreno pitanje proizvoda — danas se do toga dolazi tek nakon zadnje kartice (56. sud). Veže se uz F1/15 |
| skrol naličja kao *skroler* (ne kao rast stranice) | **odbačeno mjerenjem** — v. pravilo 1 |

**Kako se nastavlja:** `git checkout feat/tinder-kadar` → `npm run bump` → brane su
`tests/unit/flashcard-kadar.test.js` (73), `tests/unit/flashcard-swipe.test.js` (166),
`tests/flashcard-swipe.spec.js` (41 na četiri iPhone profila), `tests/phone.spec.js` (12).
