# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/) · Verzioniranje: [SemVer](https://semver.org/).
Tekuća live verzija je 2.x. Platformska pregradnja (Faza 0+) vodi prema 3.0.0.

## [Unreleased] — rad u tijeku (cilj: 3.0.0)

- **Claudeov imenik — materijali za prijavu (grana `feat/imenik`, 17.11.)** — anketa 17.11. Javne upute
  `ai.html` (EN/HR: što treba, spajanje Claudea i ChatGPT-a, što tražiti, što AI smije, odspajanje, istekao zahtjev) ·
  `privacy.html` **§8 AI aplikacije** (što primamo, što spremamo i koliko: nacrt 7 d, bilješka predaje 7 d, brojač
  upisa 1 d; pružatelj AI-ja = zaseban voditelj; brisanje računa kaskadno briše veze, izmjereno u shemi) · FAQ kartica ·
  `docs/workflow/CLAUDE_IMENIK.md` (odgovori za 10 koraka portala, listing 146/200 i 1289/2000). Brana:
  `connect-ai.test.js` — adresa i nazivi sučelja u `ai.html` == gumb. Stranica upisana u legal/phone/zoom/kontrast/paletu.
  **Predaje Leon**; prije toga svaki alat isproban u Claudeu na PROD-u (korak 8).
- **„Poveži AI" (grana `feat/povezi-ai`, 17.11.)** — Leon: *„cijeli taj proces spajanja mora biti puno jednostavniji"*.
  Na PROD-u gumba NIJE BILO (`connect-ai.js` `PRODUKCIJA = null`, ograda do ⑥ ostala) → adresa `www.sokratstudy.com/mcp`.
  Treći ulaz: redak u herou ispod vrata; paket `connect` stiže tek na klik (naslovnica 0 B više). Upute za Claude po
  sučelju izmjerenom 17.11. (3 koraka umjesto 4); neprijavljenom savjet „prvo se prijavi" (zahtjev istekne za ~10 min).
  Brane: `connect-ai.test.js` (PROD adresa == očekivanje u `check-edge-functions`, hero ulaz kroz paket) · `landing.spec`
  (klik → prozor s PROD adresom, modul nije učitan prije klika). Anketa 17.11.: i Claudeov imenik + video vodič (slijede).

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
