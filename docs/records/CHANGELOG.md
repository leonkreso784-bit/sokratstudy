# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/) · Verzioniranje: [SemVer](https://semver.org/).
Tekuća live verzija je 2.x. Platformska pregradnja (Faza 0+) vodi prema 3.0.0.

## [Unreleased] — rad u tijeku (cilj: 3.0.0)

## 2026-11-17 (OPUS) — 🚀 **PFRI: Europsko pravo I, Kazneno postupovno, Europsko pravo II NA PRODUKCIJI** — `main` = `72c2ebc`, token `20261117035404`

Leonov OK 17.11. Fast-forward `0d4c4ce..72c2ebc` (5 commita). Katalog 56 → 59 (9 PFRI). **Provjereno:** preflight · CI
zelen (rerun poznatog `theme-fouc` flakea) · preview dimni test · Vercel READY, živi `SW_VERSION` = repo ·
`migrate-content.js` za 3 predmeta (`diff:db` prije nemigrirano, poslije 0 razlika) · `check:final` ✓ za 9 PFRI ·
produkcija: 27 PFRI lekcija iz baze, 0 JS grešaka.

## 2026-11-17 (OPUS) — 🚀 **PFRI 1. GODINA NA PRODUKCIJI** — `main` = `0d4c4ce`, token `20261116231748`

Leonov OK 17.11. Fast-forward `d8930c0..0d4c4ce` (18 commita: 15 PFRI + 3 MOR docs; pre-push preflight zelen).
**Provjereno:** CI na grani zelen (svi jobovi) · Vercel produkcija READY · živi `SW_VERSION` = repo · katalog 56 (6 PFRI) ·
`migrate-content.js` za 6 PFRI predmeta (18 redova; `diff:db` prije: svi nemigrirani, poslije: 0 razlika) · `check:final`
za svih 6 ✓ · u živom Chromiumu svih 18 lekcija učitava iz baze, sučelje hrvatsko, 0 JS grešaka. Usput: rok
Learn-overflow testa raste s brojem predmeta (fiksnih 120 s isteklo je na CI-ju s 56 predmeta).

## 2026-11-16 (OPUS) — ➕ **Drugi fakultet: Pravni fakultet Rijeka (PFRI), 1. godina** — grana `feat/pravri`

Fakultet `pfri`, program „Pravo (integrirani studij)" (`law-integrated-hr`, HR). Šest predmeta 1. godine, svaki s
lekcijama Međuispit · Gradivo završnog ispita · Cijelo gradivo: Teorija prava i države, Povijest prava i države,
Sociologija, Rimsko privatno pravo, Ustavno pravo, Politička ekonomija. Svaki je prošao dvije recenzije i ponovnu
provjeru. Ostalih 15 PFRI predmeta je izvan kataloga dok ne prođu letvicu (ADR-042). Katalog 50 → 56. Uz to: Browse
test prolazi svaki fakultet iz kataloga do lekcija; FAQ opisuje oba fakulteta. Detalji: `docs/subjects/README.md` §PFRI.

## 2026-11-15 (OPUS) — 🚀 **MOR NA PRODUKCIJI** — `main` = `d8930c0`, token `20261115015712`

Leonov OK 15.11. Fast-forward `51a90a9..d8930c0` (pre-push preflight zelen). **Provjereno:** CI na `d8930c0` zelen (lint/verify/unit,
obje Playwright skupine, authed) · Vercel produkcija READY · živi `SW_VERSION` = repo · naslovnica 50 predmeta · `migrate-content.js`
za 14 MOR predmeta (40 redova; `diff:db` prije: svi nemigrirani, poslije: 0 razlika) · u živom Chromiumu svih 40 MOR lekcija
učitava, sučelje prelazi na hrvatski, 0 JS grešaka. Uz to: CI runner pinan na `ubuntu-24.04` (`ubuntu-latest` = 26.04 ne
instalira Playwright Chromium).
