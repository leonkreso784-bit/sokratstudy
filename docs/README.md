# Sokrat Study — Dokumentacija

**Ovo je jedini ulaz.** Sve ostalo je u mapama ispod, složeno po **ulozi dokumenta**, ne po temi.

> **Brzi kontekst za sesiju:** [`../CLAUDE.md`](../CLAUDE.md) — auto-učitava se svaki put, sažima stack, pravila i trenutno stanje.
> **Brza povijest:** [records/HISTORY.md](./records/HISTORY.md) — jedan redak po milestone-u.

---

## Kako je ovo složeno

| mapa | uloga | mijenja se |
|---|---|---|
| **`product/`** | **ŠTO** gradimo — definicija proizvoda + kriteriji prihvaćanja | rijetko, uz odluku |
| **`architecture/`** | **KAKO** je građeno — model podataka, granice, ugovori | rijetko |
| **`plan/`** | **ŠTO SADA** — najviše **jedan** aktivni spec + roadmap | stalno |
| **`workflow/`** | **KAKO RADIMO** — testiranje, tim, autorstvo sadržaja | povremeno |
| **`records/`** | **POVIJEST** — dnevnik, changelog, bugovi, odluke | stalno |
| **`subjects/`** | stanje pojedinih predmeta | uz sadržaj |
| **`ideas/`** | ideje koje **nisu projekt** — parkirane dok ne sazriju | rijetko |
| **`archive/`** | ispunjeni i napušteni planovi — **referenca, ne istina** | nikad |
| **`sokrat-ai/`** | ⚠️ **zaseban projekt**, ne dira platformu | zasebno |

### Gdje što ide — **jedna činjenica, jedno mjesto** (ADR-027)

Ovo je nastalo jer smo istu ciglu pisali u **četiri** dokumenta, pa ih onda tri dana usklađivali.

| vrsta znanja | JEDINO mjesto | ostali |
|---|---|---|
| **što sustav radi** | **kod + testovi** | dokument to samo *opisuje*, nikad ne *definira* |
| **zašto je tako** | `records/DECISIONS.md` (ADR) | ostali linkaju ADR |
| **što vrijedi sad** | `../CLAUDE.md` + `product/` | **nikad dnevnik** |
| **što se kad dogodilo** | `records/HISTORY.md` (redak) · `PROGRESS.md` (sesija) · `CHANGELOG.md` (isporuka) | `CLAUDE.md` ih **ne ponavlja** |
| **što nije riješeno** | `records/BACKLOG.md` · `BUGS.md` | plan ne nosi tuđe stavke |

**Duplikat se briše, ne sinkronizira.** Ako `HISTORY.md` već ima priču, nitko je ne prepričava.
**Rub koji prepoznaš isti čas dobiva test** — zapisan a neriješen rizik je uredno dokumentiran propust
(tako je nastao **BUG-023**).

### Četiri pravila (zato je ovo nastalo)

1. **Jedan aktivni plan.** `plan/` smije imati najviše jedan spec. Ispunjen → `archive/` **isti dan**, s pečatom datuma. Prije ovog čišćenja ondje je stajalo **osam** ispunjenih planova koji su izgledali aktivno.
2. **`product/` nije dnevnik.** Definicija bez kronologije. **Svaka mogućnost ima kriterij prihvaćanja** u obliku *„gotovo kad korisnik može ‹X›"* — nikad „test je zelen". Bez tog pravila je moguće da su svi gate-ovi zeleni, a korisnik ne može napraviti karticu.
3. **`records/` nije izvor istine.** Povijest objašnjava **zašto**, ne **što vrijedi sad**.
4. **Jedno numeriranje faza.** Faza ima ime, ne slovo. (Prije su postojale **tri** različite „F" osi u tri dokumenta.)

**Gate:** `npm run check:docs` (dio `npm run preflight`) pada na mrtvoj poveznici, na drugom aktivnom planu, na dnevniku u `product/` i na dokumentu koji nije naveden ovdje.

---

## `product/` — što gradimo

| Dokument | Svrha |
|---|---|
| [PRD.md](./product/PRD.md) | Product Requirements — što gradimo, za koga, opseg i ne-ciljevi |
| [MCP.md](./product/MCP.md) | **„Spoji svoj AI"** — invarijante i kriteriji prihvaćanja MCP-a (nacrt, pregled, prihvat, veze) |
| [UGC_SPEC.md](./product/UGC_SPEC.md) | **Osobni materijal** — definicija + kriteriji prihvaćanja, rječnik, ugovor boja |
| [VISION.md](./product/VISION.md) | Dugoročna vizija (AI tutor, UGC, dijeljenje, natjecanje) + gating-odluke |
| [MONETIZATION.md](./product/MONETIZATION.md) | Naplata, tržište, scenariji (planiranje) |

## `architecture/` — kako je građeno

| Dokument | Svrha |
|---|---|
| [ARCHITECTURE.md](./architecture/ARCHITECTURE.md) | Tehnička arhitektura, model podataka |
| [BACKEND.md](./architecture/BACKEND.md) | Supabase: auth, sync, read-path, osobni UGC-otok, migracije |
| [CATALOG_ARCHITECTURE.md](./architecture/CATALOG_ARCHITECTURE.md) | Identitet predmeta preko programa/fakulteta (placement ≠ sadržaj; ADR-022) |
| [MCP.md](./architecture/MCP.md) | MCP konektor: OAuth, uloga `mcp_klijent`, nacrt, poslužitelj, adresa |
| [MCP_SECURITY.md](./architecture/MCP_SECURITY.md) | MCP sigurnost: granice povjerenja, invarijante, nalazi, matrica testova, **uvjeti puštanja** |
| [CONTENT_SCHEMA.md](./architecture/CONTENT_SCHEMA.md) | **Kanonski oblik sadržaja** (flashcard/quiz/fill/learn + KaTeX konvencija) |
| [EXERCISES_ENGINE.md](./architecture/EXERCISES_ENGINE.md) | Sustav interaktivnih vježbi (7 tipova) — engine se NE dira za sadržaj |

## `plan/` — što sada

| Dokument | Svrha |
|---|---|
| [ZAVRSNICA.md](./plan/ZAVRSNICA.md) | 🟩 **tekući spec (od 2026-10-03, ADR-040)** — Sokrat se dovršava pa ide u održavanje: KONEKTOR (uži MCP → produkcija) · DIJELJENJE · BEZ MREŽE · ZNAK · DVOJEZIČNOST · ČIŠĆENJE · RECEPTI · POVIJEST. Glavni posao je HotelixSim, izvan ovog repozitorija |
| [ROADMAP.md](./plan/ROADMAP.md) | Milestones + status (**povijesni zapis**, ne plan rada) |

> Prethodne dvije faze ispunjene su i deployane, pa su im planovi istog dana otišli u arhivu
> (pravilo 1): [MATERIJAL_FAZA.md](./archive/MATERIJAL_FAZA.md) (2026-08-07) i
> [MJERA_I_ZABORAV.md](./archive/MJERA_I_ZABORAV.md) (2026-08-08) — **referenca, ne izvor istine.**
> Otvorene stavke izvan tekućeg spec-a žive u [records/BACKLOG.md](./records/BACKLOG.md).

## `workflow/` — kako radimo

| Dokument | Svrha |
|---|---|
| [MCP_TESTING.md](./workflow/MCP_TESTING.md) | Kako se testira MCP: staging računi, brane `mcp:*`, zamke suđenja, scenariji s pravim AI-jem |
| [TESTING.md](./workflow/TESTING.md) | QA checklista + automatske provjere (verify, validatori, unit, Playwright, authed, CI) |
| [CONTENT_GUIDE.md](./workflow/CONTENT_GUIDE.md) | Kako dodati predmet/lekciju (playbook) |
| [CONTENT_INTAKE.md](./workflow/CONTENT_INTAKE.md) | Kako slagati profesorske materijale (PDF/JPG) za točnu ekstrakciju |
| [CONTENT_GENERATOR.md](./workflow/CONTENT_GENERATOR.md) | Generator predmeta (PDF→Sonnet→data), ADR-010 |

## `records/` — povijest

| Dokument | Svrha |
|---|---|
| [HISTORY.md](./records/HISTORY.md) | Vremenska crta milestone-a (brza orijentacija) |
| [CHANGELOG.md](./records/CHANGELOG.md) | Verzije i što se mijenjalo — **od zadnjeg 🚀 naviše**; starije u mjesečnim arhivama (dolje) |
| [PROGRESS.md](./records/PROGRESS.md) | Dnevnik rada po sesijama — **tekući mjesec**; zatvoreni u mjesečnim arhivama (dolje) |
| `RAD.xlsx` (records/) | **Analiza rada** — commiti, isporuke, faze, vizije + 8 grafova; generira `python scripts/rad-xlsx.py` na kraju svake faze (samo odrađeno ulazi) |
| [DECISIONS.md](./records/DECISIONS.md) | Arhitektonske odluke (ADR-001…040) i zašto |
| [BUGS.md](./records/BUGS.md) | Bugovi + lekcije naučene — **aktivni + riješeni od 2026-08-31** |
| [BUGS_ARCHIVE.md](./records/BUGS_ARCHIVE.md) | **Arhiva bugova BUG-001…038** (riješeni do 2026-08-30) — cijeli zapisi s lekcijama, referenca |
| [BACKLOG.md](./records/BACKLOG.md) | Parkiralište ideja |

**Mjesečne arhive** PROGRESS-a i CHANGELOG-a — premješta ih `npm run docs:rotate` (zašto: zaglavlje
`scripts/rotiraj-zapise.js`); `check:docs` pada dok zatvoren mjesec stoji u glavnoj datoteci.

<!-- docs:rotate — generira `npm run docs:rotate`, ne uređivati rukom -->

| mjesec | Dnevnik rada (PROGRESS) | Isporuke (CHANGELOG) |
|---|---|---|
| 2026-09 | [PROGRESS-2026-09.md](./records/PROGRESS-2026-09.md) | [CHANGELOG-2026-09.md](./records/CHANGELOG-2026-09.md) |
| 2026-08 | [PROGRESS-2026-08.md](./records/PROGRESS-2026-08.md) | [CHANGELOG-2026-08.md](./records/CHANGELOG-2026-08.md) |
| 2026-07 | [PROGRESS-2026-07.md](./records/PROGRESS-2026-07.md) | — |
| 2026-06 | [PROGRESS-2026-06.md](./records/PROGRESS-2026-06.md) | — |
<!-- /docs:rotate -->

## `subjects/` — predmeti

| Dokument | Svrha |
|---|---|
| [subjects/README.md](./subjects/README.md) | **Autoritativna tablica svih predmeta** (status/brojevi/vježbe) |
| [ACCOUNTING_PLAN.md](./subjects/ACCOUNTING_PLAN.md) · [STATISTICS_PLAN.md](./subjects/STATISTICS_PLAN.md) · [TRAFFIC_PLAN.md](./subjects/TRAFFIC_PLAN.md) · [MATH_PLAN.md](./subjects/MATH_PLAN.md) | Planovi pojedinih predmeta (✅ gotovi) |

## `ideas/` — ideje koje nisu projekt

> **Nije plan i nije obećanje.** Ovdje stoji ideja koja je prevelika za jedan redak u
> [records/BACKLOG.md](./records/BACKLOG.md), a nije zasluzila spec u `plan/`. Kad sazri →
> spec + milestone; ako ne sazri → briše se bez žaljenja.

| Dokument | Svrha |
|---|---|
| [ideas/HOTEL_SIM.md](./ideas/HOTEL_SIM.md) | **Pokazivač** — simulacija vođenja hotela je od 2026-10-03 **Leonov glavni projekt** u zasebnom repozitoriju (`Documents\hotelixsim`, ADR-040); izvorni zapis ideje preselio je ondje |
| [ideas/MODULI.md](./ideas/MODULI.md) | **ES moduli bez build-koraka** — `js/` sloj nema nijedan `import`/`export`, pa je graf ovisnosti ručno održavan u dvije `.html` datoteke. Argument + mjere + zašto `bump` (ADR-017) ostaje netaknut. Radi se **tek nakon C7**. |

## `archive/` — ispunjeno i napušteno

> **Referenca, ne istina.** Ovdje se gleda *kako je nešto izvedeno*, nikad *što sada vrijedi*.

| Dokument | Status |
|---|---|
| [FRONTEND_REDIZAJN.md](./archive/FRONTEND_REDIZAJN.md) | Frontend redizajn (Tailwind, C0–C7 + KOSTUR/TELEFON/POLICA) — **ispunjen i NA PRODUKCIJI 2026-09-01** |
| [RJESAVANJE-PROBLEMA-9MJ.md](./archive/RJESAVANJE-PROBLEMA-9MJ.md) | Faza MREŽA (blokovi A–E + deploy-gated izlaz) — **ispunjena deployem 2026-09-01** |
| [MATERIJAL_FAZA.md](./archive/MATERIJAL_FAZA.md) | Faza „Materijal od nule do učenja" — **ispunjena i na produkciji 2026-08-07**; svih 5 kriterija iz `product/UGC_SPEC.md` |
| [CREATE_BACKEND_SPEC.md](./archive/CREATE_BACKEND_SPEC.md) | Osobni UGC-graditelj — **instalacije F0–F5 isporučene** (prod 2026-08-06). ⚠️ Vizija iz §1 (kartice/kviz/fill u vlastitom gradivu) **NIJE dovršena** — v. `product/` |
| [EDITOR_PLAN.md](./archive/EDITOR_PLAN.md) | Editor / admin CRUD — ispunjen 2026-07-28; §12 = povijest cigli U0–U9 |
| [EDITOR_UX.md](./archive/EDITOR_UX.md) | Dizajn-ugovor editora (smjer C „Tok"); mockup `design/mockups/editor-c-tok.html` |
| [EDITOR_F7_SPEC.md](./archive/EDITOR_F7_SPEC.md) | Kvadratić-model K1–K6 — ispunjen |
| [EDITOR_FEEDBACK.md](./archive/EDITOR_FEEDBACK.md) | Leonovih 8 nalaza F1–F8 iz živog pregleda editora |
| [FOUNDATION_PLAN.md](./archive/FOUNDATION_PLAN.md) | Platformski temelj F0–F6; F1–F4 isporučeni, F5/F6 nadglašeni |
| [CRUD_PLAN.md](./archive/CRUD_PLAN.md) | Admin CRUD javnog kataloga — ispunjen kroz EDITOR_PLAN |
| [TEAM.md](./archive/TEAM.md) | Model rada s content-suradnikom (ADR-023) — ⚰️ **suradnja otkazana 2026-09-04**; gradivo koje je proizvela ostaje na produkciji |
| [RACUN.md](./archive/RACUN.md) | Blok RAČUN — **R1 (dijalog + upitnik + Google) isporučen 2026-09-02**; R2/R3 preseljeni u `RASPORED.md` F2 (danas u arhivi). Referenca za obrazloženje zašto je R1 izveden odjednom |
| [RASPORED.md](./archive/RASPORED.md) | Raspored F1–F7 (2026-09-04) — **⛔ zamijenjen 2026-10-03** planom `plan/ZAVRSNICA.md` (ADR-040); F1 i F2 isporučeni, F3 većim dijelom; povijest cigli i odluke anketa ostaju ovdje |
| [MCP.md](./archive/MCP.md) | Plan MCP-a F6 (2026-09-29) — **⛔ zamijenjen 2026-10-03** fazom KONEKTOR u `plan/ZAVRSNICA.md` (uži opseg); ①, ②/0–②/5.1 gotovi na stagingu, odluke anketa i mjerenja ostaju ovdje |
| [MCP_KONEKTOR.md](./archive/MCP_KONEKTOR.md) | F6 ① konektor + OAuth, S1, S2 — **ispunjeno na stagingu**; izdvojeno iz `RASPORED.md` §F6 2026-09-29 (zapisi „RASPORED §F6" pokazuju ovamo) |
| [HRV_PLAN.md](./archive/HRV_PLAN.md) | HRV program (klon-program + UI toggle, ADR-012) — cigle 1–5c ✅, ostatak pauziran |
| [EXERCISES_DB_FIX_PLAN.md](./archive/EXERCISES_DB_FIX_PLAN.md) | BUG-012 fix plan (✅ 2026-06-27) |
| [SONNET_REVIEW_2026-06.md](./archive/SONNET_REVIEW_2026-06.md) | Vanjski review — potrošen input |
| [MODEL_KARTICA_DEMO.md](./archive/MODEL_KARTICA_DEMO.md) | Izveden primjer **kartica-standarda** na `management-hr` (kratka kartica → detalj u `learn`). Grana `content/model-demo-management-hr` obrisana 2026-08-31; **model je ovdje**, ne u grani |
| [MATURA-PILOT.md](./archive/MATURA-PILOT.md) | Skica mature v1 (Matematika A: `exam` os, cjevovod u zasebnom repou, exam mode, mjerenja na pravom NCVVO ispitu) — **arhivirana 2026-09-12**: matura je vizija, ne projekt ([VISION.md §8](./product/VISION.md)); pravno pitanje o objavi NCVVO materijala ostaje otvoreno |

## `sokrat-ai/` — zaseban projekt

> ⚠️ **NE implementira se na ovu platformu i nema veze s njom** (Leonova odluka 2026-07-24).
> Platforma ne ovisi o njemu ni u čemu. Prva prezentacija dekanu: 10. mjesec 2026.

| Dokument | Svrha |
|---|---|
| [sokrat-ai/README.md](./sokrat-ai/README.md) | Ulazna točka — što je, temeljne odluke, putanja |
| [VISION.md](./sokrat-ai/VISION.md) | Teza: nekontaminirani ljudski podaci, pozicioniranje |
| [RESEARCH.md](./sokrat-ai/RESEARCH.md) | 4 istraživačke oklade (A–D), metodologija, arhitektura |
| [DATA.md](./sokrat-ai/DATA.md) | Izvori (Hrčak/DABAR/hrWaC/Wikipedia), cjevovod |
| [LEGAL_GDPR.md](./sokrat-ai/LEGAL_GDPR.md) | GDPR + autorsko pravo + TDM iznimka (⚠️ nije pravni savjet) |
| [DEAN_PITCH.md](./sokrat-ai/DEAN_PITCH.md) | Prezentacija dekanu |
