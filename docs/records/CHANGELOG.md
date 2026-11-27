# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/) · Verzioniranje: [SemVer](https://semver.org/).
Tekuća live verzija je 2.x. Platformska pregradnja (Faza 0+) vodi prema 3.0.0.

## [Unreleased] — rad u tijeku (cilj: 3.0.0)

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
