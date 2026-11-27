# Changelog — 2026-11

> **Arhiva jednog mjeseca** — ovamo ju je premjestio `npm run docs:rotate`; tekst unosa je nepromijenjen.
> Tekući zapis: [CHANGELOG.md](CHANGELOG.md) · svi mjeseci: [docs/README.md](../README.md).

## 2026-11-17 (OPUS) — 🚀 **F6 MCP KONEKTOR NA PRODUKCIJI (K/10)** — `main` = `347f8a1`, token `20261117164433`

Leonov OK 17.11. („imaš OK za sve, i push na main"). Redoslijed iz MCP_TESTING §7:
**① SQL** — 5 datoteka po `REDOSLIJED`; 29/29 tijela md5-isto s datotekama; inventar `mcp_klijent` čist (SELECT samo na
`nodes`, EXECUTE samo `mcp_*`). `f6-nacrt`/`f6-prihvat` je `apply_migration` dvaput odbio → SQL Editor (Leonov Chrome).
**② `main`** — merge `origin/main` (PFRI EP II + KPP) · preflight · CI zelen (uz preuzet `18610cc`: fullPage snimka
Learna = prilog) · fast-forward `18610cc..347f8a1` · Vercel READY, živi token = repo.
**③ funkcije** — `delete-account`, `send-notification`, `mail-unsubscribe`, `mcp` · tajna `MCP_RESOURCE_URL` =
`https://www.sokratstudy.com/mcp` · `check:functions` 6/6.
**④ Auth** — Require current password ON (Secure email change i leaked passwords već ON) · hook
`mcp_access_token_hook` uključen PRIJE OAuth-a (suha proba: obična sesija `authenticated`, AI-token `mcp_klijent`) ·
OAuth Server ON, `/odobrenje.html`, DCR ON, Site URL netaknut · obična prijava poslije svakog koraka 200.
**⑤** `mcp:probe` protiv `www.sokratstudy.com/mcp`: 9/0. **⑥** Claude.ai → „Sokrat" (`https://www.sokratstudy.com/mcp`) na
Leonovom računu: DCR klijent `6f13f7b4` u `oauth_consents`; `procitaj_materijale` = 1 polica + 10 materijala (== baza).
Izgradnja materijala kroz PROD konektor još nije izvedena. Nalaz: zahtjev koji istekne dok se korisnik prijavljuje
(~20 min) daje golo „Nije uspjelo" (Auth 404 `oauth_authorization_not_found`) — poruka treba reći „vrati se u AI i spoji ponovno".

## 2026-11-17 (OPUS) — 🚀 **PFRI: Europsko pravo I, Kazneno postupovno, Europsko pravo II NA PRODUKCIJI** — `main` = `72c2ebc`, token `20261117035404`

- **2026-11-17 kasnije:** `main` → `18610cc` (docs `aaa03c2` + test-popravak: fullPage snimka u `responsive.spec.js` više ne ruši test kad CI Chromium ne može snimiti predugi Learn Europskog prava II; push-CI na `72c2ebc` bio je crven upravo na tome). Bez izmjene koda aplikacije.

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

## 2026-11-15 (OPUS) — ➕ **Novi program „Menadžment održivog razvoja" (MOR)** — grana `feat/mor`

Treći program FMTU-a (`sustainable-development-management-hr`, HR). 9 kolegija zajedničkih s MUH-om kao kopije `-mor`;
5 novih predmeta: Prirodne osnove geoprostora, Turizam i turistički sustav (1. god), Ekonomika okoliša (samo 1. kolokvij),
Menadžment kvalitete, Urbana ekonomija (2. god). Hrvatsko sučelje se sad predlaže po `lang` programa, ne po zakucanom
MUH id-u. Katalog 36 → 50. Detalji po predmetu: `docs/subjects/README.md` §MOR.

## 2026-11-04 (OPUS) — ➕ **3. godina HM: Public Finance i Quality Management (Midterm 1)** — grana `feat/y3-pf-qm`

Dva nova EN predmeta (`year: 3, semester: 1`), po jedna lekcija `midterm-1`: Public Finance 6 kat / 155 fc / 140 quiz / 39 fill,
Quality Management 6 / 180 / 182 / 31. Learn kao v2 blokovi. Sadržaj iz Sokrat MCP materijala (staging). Katalog 34 → 36.
