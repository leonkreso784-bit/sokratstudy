# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/) · Verzioniranje: [SemVer](https://semver.org/).
Tekuća live verzija je 2.x. Platformska pregradnja (Faza 0+) vodi prema 3.0.0.

## [Unreleased] — rad u tijeku (cilj: 3.0.0)

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
**⑤** `mcp:probe` protiv `www.sokratstudy.com/mcp`: 9/0. **Otvoreno:** ⑥ pravo spajanje na Leonovom računu.

## 2026-11-17 (OPUS) — 🚀 **PFRI: Europsko pravo I, Kazneno postupovno, Europsko pravo II NA PRODUKCIJI** — `main` = `72c2ebc`, token `20261117035404`

Leonov OK 17.11. Fast-forward `0d4c4ce..72c2ebc` (5 commita). Katalog 56 → 59 (9 PFRI). **Provjereno:** preflight · CI
zelen (rerun poznatog `theme-fouc` flakea) · preview dimni test · Vercel READY, živi `SW_VERSION` = repo ·
`migrate-content.js` za 3 predmeta (`diff:db` prije nemigrirano, poslije 0 razlika) · `check:final` ✓ za 9 PFRI ·
produkcija: 27 PFRI lekcija iz baze, 0 JS grešaka.
