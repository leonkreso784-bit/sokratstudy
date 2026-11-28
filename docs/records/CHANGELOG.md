# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/) · Verzioniranje: [SemVer](https://semver.org/).
Tekuća live verzija je 2.x. Platformska pregradnja (Faza 0+) vodi prema 3.0.0.

## [Unreleased] — rad u tijeku (cilj: 3.0.0)

- **🔎 Katalog je dobio PRAVE adrese (grana `feat/seo-adrese`, 28.11., [ADR-043](DECISIONS.md))** — tražilica je vidjela
  **5 stranica** dok je katalog nosio **59 predmeta i 171 lekciju**; u posluženom HTML-u nije bilo **nijednog** imena
  predmeta. Odluka parkirana u BACKLOG-u od 24.08. („arhitektonska odluka, ne cigla") i sad izvedena kao **generator**,
  ne seoba routera: `scripts/build-seo-pages.js` → **64 stranice** (`predmet/` · `program/` · `predmeti.html`), commitane
  kao bundle i OG-kartica. **5 → 69 indeksabilnih adresa, 40 hrvatskih gdje ih je bilo nula.** Svaka nosi `<h1>`, teme,
  brojeve i 8 pravih kartica — bez JS-a (izmjereno: 3 004 znaka teksta, 18 tema). `Course` + `BreadcrumbList` po
  predmetu, `WebSite` na naslovnici. Jezik je jezik programa (`data-lang-fixed`, pa ga `boot.js` ne pregazi) → hreflang
  ne treba, ADR-037 netaknut. Poveznica u podnožju, ne u traci (ADR-035).
  **Usput zatvoreno:** produkcija je posluživala **cijeli repozitorij** s 200 — `CLAUDE.md`, `docs/`, `scripts/`,
  `tests/` i interni mockupi („Leon presuđuje") → `.vercelignore` + brana koja nabraja `.md` i tvrdi da nijedan nije u
  deployu (Leonova cigla od 30.09.). `document.title` prati rutu (dotad su svih 171 lekcija dijelile jedan naslov);
  `og:description` i `manifest.json` usklađeni s `description` — bile su **četiri** različite rečenice o istome.
  **Brane:** `build:seo -- --check` (drift) · `check:seo` nad svih 69 stranica, sad i **u CI-ju** · **`tests/seo.spec.js`
  napokon POSTOJI** — tri su ga datoteke tri mjeseca navodile kao branu, a nikad nije napisan.
  ⏳ Ostaje Leonu: prijava sitemapa u Search Console (u repou nije bilo ni spomena) i mjerenje 404 poslije deploya.

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
  Stanje: CI ✅, preflight 0, puni lokalni skup 205/0. **Spojeno u `main` 28.11.** (PR #11, `e31ffe34`).
  ⚠️ Grana je bila odrezana sa **zastarjelog** lokalnog `main`-a (`bdad6e9c`) i zaostajala 9 commita — spojena je
  s `origin/main` prije mergea. *Prvo `git fetch`, pa mjeri.*

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
