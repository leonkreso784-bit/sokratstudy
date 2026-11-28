# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/) · Verzioniranje: [SemVer](https://semver.org/).
Tekuća live verzija je 2.x. Platformska pregradnja (Faza 0+) vodi prema 3.0.0.

## [Unreleased] — rad u tijeku (cilj: 3.0.0)

- **Kategorija za učenje napokon nešto radi (grana `fix/kategorija-quick-start`, 27.11.)** — Leon na živom ekranu:
  izabereš lekciju i kategoriju, stisneš „Kreni učit", i *„ne pokazuje joj se ta lekcija"*. **BUG-056:**
  `AppState.nav.category` se pisao na dva mjesta a čitalo ga je **nula** — značajka projektirana (JSDoc je zove
  „Aktivni filter kategorije") pa nikad spojena; `startQuickQuiz` ga je uz to poimence brisao. Sad jedno mjesto zna
  što znači odabrana kategorija (`aktivnaKategorija()` + `primijeniKategoriju()`, ADR-027), gura je u **sva četiri
  moda** (Learn · kviz · kartice · dopune), i to tako da i **tab u traci** poštuje izbor, ne samo Quick Start gumb.
  **„Sve" je prva kartica i stoji uvijek** (Leon nakon pregleda previewa: *„mora biti gumb i da se sve može učit…
  ne može se ići na sve kao prije bez da se ne izlazi kompletno iz pripreme za ispit"*) — poništavanje ponovnim
  klikom postoji, ali se ne vidi, a nevidljiv izlaz nije izlaz. Napredak ostaje na cijelom predmetu (BUG-047) jer
  filtar ide kao **argument**.
  **BUG-057:** Difficulty dropdown (Easy/Medium/Hard) čitala je **nijedna** linija JS-a → uklonjen, jer težina bez
  oznaka u sadržaju nije implementabilna (ADR-018). Brana: `tests/kategorija-fokus.spec.js`.
  **BUG-058:** mjerač telefona ⑥ zaticao je cookie-traku usred **280 ms** ulazne animacije i prijavljivao upad od
  1–3 px koji se mijenjao među pokretanjima (geometrija je bila ispravna: upad 0). `reducedMotion: 'reduce'` na
  kontekstu mjerača — **nula promjena u produkcijskom CSS-u**; obrnuta provjera s pravim prekrivačem od 14 px
  dokazuje da brana i dalje hvata.
  **Brane koje su padale na stanju izvan gita:** `check:names` nije nalazio `.imena-zabrana.txt` jer gitignorirana
  datoteka **ne putuje među `git worktree` stablima** (Mac ih ima 10) → jedan kanonski primjerak u glavnom stablu
  + fallback preko `git rev-parse --git-common-dir`. `check:docs` je tvrdo padao na odsutnoj **memorijskoj**
  datoteci → sada napomena, kao što već jest kad nema cijele mape; za `docs/architecture/**` (koji JEST u gitu)
  ostaje tvrdi pad. Time `preflight` prolazi bez ijedne zaobilaznice.
  Stanje: 5 commita, `4f735aa2`, CI ✅, preflight 0, puni lokalni skup 205/0. **Nije na produkciji** i grana je
  odrezana sa **zastarjelog** lokalnog `main`-a (`bdad6e9c`) — produkcijski je `8cb95d31`, pa grana zaostaje
  **9 commita**; prije mergea `git fetch` + spajanje `origin/main` + ponovni preflight.

- **„Poveži AI" (grana `feat/povezi-ai`, 17.11.)** — Leon: *„cijeli taj proces spajanja mora biti puno jednostavniji"*.
  Na PROD-u gumba NIJE BILO (`connect-ai.js` `PRODUKCIJA = null`, ograda do ⑥ ostala) → adresa `www.sokratstudy.com/mcp`.
  Treći ulaz: redak u herou ispod vrata; paket `connect` stiže tek na klik (naslovnica 0 B više). Upute za Claude po
  sučelju izmjerenom 17.11. (3 koraka umjesto 4); neprijavljenom savjet „prvo se prijavi" (zahtjev istekne za ~10 min).
  Brane: `connect-ai.test.js` (PROD adresa == očekivanje u `check-edge-functions`, hero ulaz kroz paket) · `landing.spec`
  (klik → prozor s PROD adresom, modul nije učitan prije klika). Anketa 17.11.: i Claudeov imenik + video vodič (slijede).

## 2026-11-27 (OPUS) — 🚀 **PFRI: ispravci Kaznenog postupovnog i 6 dopuna NA PRODUKCIJI** — `main` = `a97c25d2`, token `20261127121859`

Leonov OK 27.11. Push `bdad6e9c..a97c25d2` (5 commita; GitHub je ispisao napomenu o pull requestu, push je prošao).
Sadržaj: tri najveće cjeline međuispita Kaznenog postupovnog razdvojene (24 kategorije), 6 dopuna kojima se odgovor
vidio u rečenici ili je imao završnu točku (Ustavno, Povijest prava, Politička ekonomija, Rimsko).
**Provjereno:** preflight zelen (izlaz 0) · CI na grani zelen, svih 5 jobova uklj. `Gate` i `Authed admin suite` ·
živi `SW_VERSION` = repo · `diff:db` prije: 483 razlike u **točno 5 predmeta** koje su commiti i mijenjali →
`migrate-content.js` (15 redova) → `diff:db` **0 razlika** · `check:final` ✓ za svih 9 PFRI · u bazi koju produkcija
čita potvrđene sve tri nove kategorije KPP-a.
**Usput (ne sadržaj):** obnovljeno lokalno stanje izvan gita koje je blokiralo push — `.imena-zabrana.txt` sastavljen
iz službenog izvedbenog plana PFRI-ja (119 stavki; brana odmah uhvatila 4 lažna sudara: „Hercegovina", ekonomist
Menger, citirani autori Babić i Škorić → upisani s kontekstom) i prag za `windows-git-bash-zamke.md` izbačen iz
tablice veličina (memorija je po stroju). Opseg 1. godine PFRI izmjeren protiv plana 2026./2027.: 374/388 teza.
**Ostaje otvoreno:** `check:final` osnovica (13 ne-PFRI predmeta izvan nje, od 17.11. čeka odluku) · praznina u
Sociologiji (političke stranke i glasovanje).
