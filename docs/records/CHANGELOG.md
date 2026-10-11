# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/) · Verzioniranje: [SemVer](https://semver.org/).
Tekuća live verzija je 2.x. Platformska pregradnja (Faza 0+) vodi prema 3.0.0.

## [Unreleased] — rad u tijeku (cilj: 3.0.0)

## 2026-09-30 (OPUS) — 🧩 **F6 ②/3 oblik materijala** — grana `feat/f6-mcp`, STAGING (nije na produkciji)

- Nacrt koji gradi AI je odmah valjano gradivo (ista shema kao katalog i Studio) — prihvat ga neće morati pretvarati.
- Svako pitanje zna iz koje je kartice nastalo (novo opcionalno polje `card`).
- Dopune s više praznina: AI piše prazninu kao `___` i daje po jedan odgovor za svaku; krivi broj se odbija.
- Bez slika i videa u AI-jevom Learnu u prvom izdanju.

## 2026-09-30 (OPUS) — 🤖 **F6 ②/2 MCP alati** — grana `feat/f6-mcp`, STAGING (nije na produkciji)

- Korisnikov AI gradi materijal u **nacrt**, lekciju po lekciju: započni (lekcije s bojom) → Learn → kartice →
  kviz i dopune → predaj. Redoslijed je tvrd (kartice traže Learn, pitanja traže kartice).
- Ponovljen poziv s istim `repeat_key` ne stvara duplikat; usporedni upis se razrješava ponovnim čitanjem.
- Svako odbijanje baze AI dobiva kao imenovanu grešku s uputom što učiniti (N9), nikad kao 500.
- Brane: unit `mcp-alati`, e2e `npm run mcp:alati` (staging).

## 2026-09-30 (OPUS) — 🔒 **F6 ②/0 sigurnosni temelj + ②/1b** — grana `feat/f6-mcp`, STAGING (nije na produkciji)

- **Baza provodi strogi profil osobnog sadržaja** (pg_jsonschema, `supabase/f6-sadrzaj.sql`) na upisu nacrta i na
  `publish_node`: bez sirovog HTML-a, samo vlastite slike, poveznice bez opasnih shema, granice (100 lekcija, 500
  stavki, kartica 500 znakova, 1 MB). Brana `npm run ugc:sadrzaj` (staging), unit `ugc-shema`, `build:ugc-sql --check`.
- **Renderer:** `safeUrl` čita shemu bez kontrolnih znakova; bez DOMPurifyja HTML ide kao tekst; DOMPurify s naše
  domene (`vendor/`); Studio-uređivač i slika kviza kroz `safeUrl`.
- **CSP:** `script-src` dopušta točne CDN datoteke, ne hostove; `check:csp` = popis otvorenog.
- **Nacrt:** polazna verzija (usporedni upis → 409) i ključ ponavljanja (isti početak = isti nacrt).
- `npm run bump` (js). ⚠️ Na PROD tek u fazi ⑥: jedan administratorov materijal ima karticu od 1 819 znakova.

## 2026-09-29 (OPUS) — 🔧 **H1: brisanje računa uz objavljen materijal** (BUG-052) — grana `fix/h1-brisanje-racuna`, STAGING

`node_content_versions.edited_by` dobiva `on delete set null` (`supabase/h1-edited-by-set-null.sql`, primijenjeno na
staging; `f1-nodes.sql` ispravljen za nove instalacije). `delete-account-check` T5 sad objavi materijal prije brisanja:
staro stanje 4 pada, novo 22/22. **PROD: SQL primijenjen 29.09. uz Leonov OK, provjereno** (ON DELETE SET NULL; 11 redaka povijesti i 8 računa netaknuto).
Bez izmjene `js/`/`css/` → bez bumpa.

## 2026-09-29 (OPUS) — 🚀 **HR 2. GODINA: PET PREDMETA + VJEŽBE MAKRO I RAČUNOVODSTVA NA PRODUKCIJI** — `main` = `e54bdf3`, token `20260928224620`

Leonov OK 29.09.; pushao Leon (fast-forward `268aa74..e54bdf3`). **Provjereno nakon deploya:** Vercel produkcija READY na
`e54bdf3` · živi `SW_VERSION` = repo · stranica kaže 34 predmeta, HR program 17 · u živom pregledniku svih 6 predmeta učitava
lekciju (kategorije i kartice = commit) · `accountingHrExercises` 54, `macroeconomicsHrExercises` 86 · živi `js/blind-map.js`
pali kartu po `features.blindMap`. Sadržaj: unos ispod. Novi predmeti su `dataFormat:'json'` → u PROD bazu (`migrate-content.js`)
tek uz zaseban OK (`diff:db` prvo); do tada se čitaju iz `data/json/`.

### 2026-09-29 — HR 2. godina: pet predmeta + vježbe (sadržaj isporuke gore)
- **Dodano (katalog 29 → 34):** Hrana i prehrana (`food-nutrition-hr`), Turistička geografija (`geography-hr`, sa slijepom
  kartom), Ekonomika ugostiteljstva (`econ-hospitality-hr`), Marketing (`marketing-hr`, prijevod EN-a — HR izvora nema),
  Računovodstvo (`accounting-hr`, teorija + 54 vježbe). Vježbe Makroekonomije (86).
- **Promijenjeno:** slijepa karta se pali po zastavici `features.blindMap` iz kataloga (`js/blind-map.js`, `js/progress.js`),
  ne po imenu `geography` — bez toga je `geography-hr` pokazivao gumb, a karta se nije crtala.
