# Content Schema — kanonski oblik sadržaja

> Jedini izvor istine za oblik podataka učenja. Svaki predmet, lekcija i (kasnije)
> AI-generacija MORA slijediti ovaj spec. Ako mijenjaš oblik, prvo ažuriraj ovaj
> dokument i zabilježi odluku u [DECISIONS.md](../records/DECISIONS.md).

## Hijerarhija

```
Predmet (subject)            → vidi data/catalog.js
└── Lekcija (lesson)         → kolokvij / ispit (npr. "first-midterm")
    └── Kategorija (category)→ tema; ključ objekta u data-*.js
        ├── flashcards[]
        ├── quiz[]
        ├── fillBlanks[]
        └── learn{}
```

Podaci jednog predmeta žive u globalnoj varijabli (npr. `marketingData`), a katalog
preko `content.resolve` kaže koja varijabla pripada kojoj lekciji.

## Kategorija (category)

```js
{
  name: "Marketing Concept",     // obavezno — prikazani naziv
  icon: "fa-bullseye",           // obavezno — Font Awesome klasa (bez "fas")
  color: "#ec4899",              // obavezno — hex boja teme kategorije

  flashcards: [ /* Flashcard[] */ ],
  quiz:       [ /* QuizQuestion[] */ ],
  fillBlanks: [ /* FillBlank[] */ ],
  learn:      { /* Learn */ }
}
```
Ključ kategorije u objektu predmeta je `camelCase` (npr. `marketingConcept`) i služi
kao stabilan ID (filteri, napredak). **Ne mijenjaj ključ nakon objave** — veže se uz
spremljeni napredak korisnika.

> **🆔 Schema v2 (U2a, 2026-07-11):** svaka kategorija I svaka stavka (flashcard/quiz/fill/learn) nosi opcionalni `id: "xxxxxx"` (6-char, stabilan po stavci — temelj za reorder/delete/propagaciju/SRS). **Auto-generiran** skriptom `scripts/add-item-ids.js` (AST-surgical) — **NE piše se ni ne uređuje ručno.** Schema ga prihvaća opcionalno (v1 bez / v2 s). Dokument-`schemaVersion` je **isporučen u U7a** (2026-07-19): runtime meta-filter `getCategories()` (`content-loader.js`) isključuje ga iz category-iteracija, schema ga prihvaća (`integer ≥ 1`). Marker: odsutan/1 = v1 · 2 = learn-blokovi. Vidi §Learn v2 + `EDITOR_PLAN.md` §12.1.

## Flashcard
```js
{
  question: "What is the marketing concept?",   // obavezno
  answer: "Find out what customers need...",     // obavezno; \n za nove redove, • za bullete
  explanation: "Customer needs drive strategy."  // opcionalno — kratka dopuna
}
```

### 📏 Standard duljine — kartica = KRATKA definicija (Leon, 2026-07-15)
> Kartica služi **pamćenju jezgre**, ne čitanju skripte. Cijeli detalj ide u `learn`.
> Render: `question` je prednja strana; `answer` **i** `explanation` se prikazuju **zajedno** na
> stražnjoj (`explanation` manjim, ispod) — pa oboje moraju biti kratki.

| Polje | Uloga | Cilj | Tvrda granica |
|---|---|---|---|
| `question` | jedan pojam, jasan prompt | — | ne spajaj „A i B i C" u jedno pitanje |
| `answer` | **jezgra definicije** (1–2 rečenice) | **≤ 200 znak** | ~300 (samo formule/iznimke) |
| `explanation` | kratka nijansa/mnemonik | ≤ ~250 znak | nije odlagalište skripte |

- **NE nabrajaj 5 stavki u jednoj kartici.** Ako gradivo ima listu od 5 (npr. „5 funkcija menadžmenta"),
  ili napravi 5 kartica (svaka jedna funkcija), ili jednu karticu „koje su glavne funkcije" s kratkim popisom naziva —
  a **objašnjenje svake ide u `learn`**.
- **Pravilo palca:** ako moraš skrolati karticu → sadržaj je na krivom mjestu (→ `learn`).
- **Soft-gate:** `npm run validate:content` ispisuje po-predmetni sažetak kartica preko granice (ne ruši build);
  `npm run validate:content <id>` daje popis pojedinačnih prekršitelja kad aktivno popravljaš predmet.
- **Kontekst:** 56% postojećih kartica krši ovo (prosjek `answer` = 229 znak) — **naslijeđeno iz EN generatora, nije autorova greška.**
  Rebalans je postupan, predmet-po-predmet; novo autorstvo poštuje standard od početka.

## QuizQuestion
```js
{
  question: "The marketing concept starts with:",          // obavezno
  options: ["Production", "Customer needs", "Ads", "Quotas"], // obavezno — 2–6 opcija
  correct: 1,                                               // obavezno — INDEX točne (0-based)
  image: "assets/geography/city-dubrovnik.jpg",             // opcionalno — slika uz pitanje
  imageAlt: "Aerial of walled old city on Adriatic coast",  // opcionalno — alt tekst slike
  card: "k3f9a1c-0"                                         // opcionalno — id kartice iz koje je pitanje nastalo (F6 ②/3)
}
```
Pravila: `correct` mora biti valjan indeks u `options`. Opcije se u aplikaciji
nasumično miješaju, pa redoslijed nije bitan — bitan je točan indeks PRIJE miješanja.
`image`/`imageAlt` koristi npr. Tourism Geography („koji grad je na slici").
`card` (kviz i dopuna) je **aditivno** polje oblika id-a (`^[A-Za-z0-9_-]{1,64}$`): pitanja koja AI gradi kroz MCP
nose id kartice iz koje su nastala (ADR-031, „pitanja iz kartica"). Renderer ga ne čita; katalog ga nema.

## FillBlank
```js
{
  sentence: "Modern marketing creates and exchanges _______.", // obavezno; _______ = praznina
  answer: "value",                                              // obavezno; provjera nije osjetljiva na velika/mala slova
  answers: ["value", "utility"],                                // opcionalno (2+) — VIŠE praznina, redom
  hint: "Utility for customers...",                             // opcionalno
  card: "k3f9a1c-0"                                             // opcionalno — id kartice iz koje je pitanje nastalo (F6 ②/3)
}
```

> **Više praznina (D2, 2026-08-25):** rečenica smije imati N markera; tada `answers` nosi odgovore
> **redom kojim praznine stoje u rečenici**, a broj odgovora **mora** biti jednak broju praznina.
> `answer` **ostaje obavezan i drži prvi odgovor** i u tom slučaju — namjerno, ne suvišno: stara
> keširana skripta (immutable cache + SW) tako pokaže smislenu rečenicu umjesto da pukne.
> Ocjenjivanje je **po praznini** (rečenica je točna samo ako su sve).
>
> ⚠️ **Marker se NE tipka rukom** — editor ga ubacuje gumbom. Tolerira se niz od **3+ podvlake**;
> jedna i dvije se **ne diraju**, jer je `_` u LaTeX-u operator indeksa (`\(Q_d = Q_s\)`).

## Learn
```js
{
  title: "Nautical Tourism",                        // opcionalno — naslov sekcije
  content: "<h3>Naslov</h3><p>HTML sadržaj...</p>", // obavezno — HTML string
  image: "assets/geography/map-counties.jpg"        // opcionalno — putanja do slike (može i null = nema slike)
}
```
`content` je HTML (dozvoljeni `<h3> <p> <ul> <li> <strong> <em> <table>` itd.). Slike
unutar `content` automatski postaju zoomabilne. Drži sadržaj samostojećim po kategoriji.

### 🧱 Learn v2 — blok-model (U7, schema v2; autorstvo = editor U8)
> **Status:** v1 (`content` HTML-string) je i dalje aktivan i valjan; v2 se **dodaje**, ne zamjenjuje. Svaki learn ima **`content` ILI `blocks`** (schema `anyOf`). Blokove zasad NE piše čovjek ručno — generira ih blok-editor (U8); ova sekcija dokumentira UGOVOR.

Umjesto sirovog HTML-a, v2 learn je niz tipiziranih blokova → **sav render ide kroz jedan sanitizirajući renderer** (`js/blocks-renderer.js` = sigurnosna granica; autor nikad ne piše sirovi HTML osim `legacy-html` tipa koji ide kroz DOMPurify).
```js
learn: {
  id: "xxxxxx",                                   // opcionalno (U2a)
  title: "Naslov",                                // opcionalno
  blocks: [                                        // v2 — XOR s "content"
    { id, type: "heading",    level: 2..4, text },        // text = inline
    { id, type: "paragraph",  text },
    { id, type: "list",       ordered?: bool, items: [inline,…] },
    { id, type: "callout",    variant?: "info|warning|tip", title?, text },
    { id, type: "image",      src, alt?, caption?: inline },
    { id, type: "video",      videoId | url },            // YouTube (nocookie, klik-za-učitavanje)
    { id, type: "table",      header?: [inline,…], rows: [[inline,…],…] },
    { id, type: "formula",    tex, display?: bool },      // KaTeX; tex = RAW (bez delimitera)
    { id, type: "legacy-html", html }                     // v1 most → DOMPurify
  ]
}
```
**`inline`** = obični string ILI niz „runs" `[{ text, b?, i?, color?, href?, math? }]`. Svako polje osim `text` je neobavezno:

| polje | tip | značenje |
|---|---|---|
| `text` | string | sadržaj rana |
| `b` / `i` | bool | podebljano / kurziv |
| `color` | token | **samo** iz kuriranog seta — nikad proizvoljna vrijednost |
| `href` | string | poveznica; sanitizira se na unosu (`sanitizeLink`) **i** na prikazu (`safeUrl`) |
| `math` | bool | ran je **inline formula**; `text` je RAW LaTeX **bez delimitera** |

**Tokeni boje (9):** `indigo` · `green` · `amber` · `red` · `cyan` · `blue` · `violet` · `pink` · `default`.

> ⚠️ **`math: true` je isključiv.** Renderer takav ran emitira kao `\(tex\)` **u obliku teksta** i namjerno ga ne
> tipografira — to je sigurnosna granica (`js/blocks-renderer.js` ne izvršava ništa). **Tipografiranje mora
> dovršiti pozivatelj** pozivom `renderMath()` *nakon* umetanja u DOM. Propust tog koraka je bio **BUG-021**
> (formule su u Studiju ostajale sirovi LaTeX). Isto vrijedi za blok `formula`.

Ugovor je strojno provjeren: `schema/subject-content.schema.json` (`block` = `oneOf` 9 tipova, `additionalProperties:false`) + `validate-content.js` (`validateBlocks`), a popis tokena boje uspoređuje **`npm run check:docs`** s onim iz sheme (ovaj je odlomak jednom zaostao za kodom za 4 boje i cijeli `math`). Blokovi žive u `payload` jsonb → export/dual-read ih nose kao čiste podatke (bez DB DDL-a).

## Strojno-čitljiv ugovor + JSON format pohrane (F2 2A, ✅ LIVE 2026-07-02)
- **`schema/subject-content.schema.json`** (JSON Schema draft-07) = strojno-čitljiva verzija OVE sheme
  (struktura/tipovi/nepoznata polja, `additionalProperties:false`). Mijenjaš li shemu → ažuriraj OBA dokumenta.
  Provjera: **`npm run validate:schema [subjectId]`** (ajv; u CI-u). Semantiku (correct-u-rasponu, KaTeX
  balans, `_______`) i dalje provjerava `npm run validate:content` — dvije razine se nadopunjuju.
- **JSON dual-read:** predmeti s `content.dataFormat:'json'` u catalogu (**danas svi** — pokrivenost
  drži gate `npm run export:json -- --check`, ne ova rečenica; „18/18" je ovdje stajalo do 2026-08-29)
  čitaju study sadržaj iz **`data/json/<subjectId>/<varName>.json`** (1 datoteka = 1 window-var),
  s fallbackom na `.js`. **`.js` datoteke OSTAJU izvor istine** — `.json` je generirani export.
- ⚠️ **PRAVILO RE-EXPORTA:** nakon SVAKE izmjene `data/*.js` migriranog predmeta pokreni
  **`npm run export:json <subjectId>`** — inače CI pada na drift-gateu (`export:json -- --check`).
- **Vježbe (`exercises.js`/lib) se NIKAD ne exportaju** — kod s `generate()` funkcijama (BUG-012),
  uvijek se učitaju iz `.js` (`content.codeScripts`).

## Matematika / formule — LaTeX + KaTeX (kvantitativni predmeti)
> Status: **✅ implementirano** (ADR-009, KaTeX cigla, 2026-06-14). `renderMath()` (`js/math.js`) renderira
> formule nakon prikaza svake sekcije (learn/flashcards/quiz/fill). KaTeX se učitava s CDN-a (`<head>`);
> ako CDN padne, `renderMath` je tihi no-op (formula ostane sirovi LaTeX, ništa se ne ruši).

Za Math / Micro / Macro / Statistiku formule se pišu kao **LaTeX** unutar delimitera:
- `\( ... \)` — **inline** (npr. `Elastičnost je \\(E_d = \\frac{\\%\\Delta Q}{\\%\\Delta P}\\).`)
- `\[ ... \]` ili `$$ ... $$` — **blok / centriran** (vlastiti red, za istaknute formule i korake rješenja).

> ⚠️ **JEDAN `$` NIJE delimiter — namjerno.** Postojeći sadržaj ima 120+ valutnih iznosa tipa `$25 per night`;
> da je `$ ... $` bio inline-delimiter, KaTeX bi tekst između dva `$` parsirao kao matematiku i **vizualno
> pokvario live sadržaj** u mnogo predmeta. Zato koristimo `\( \)` / `\[ \]` / `$$ $$` (te se sekvence ne
> pojavljuju u običnom tekstu) — render je globalan, ali za netekstualne predmete je **no-op**.

Vrijedi u SVIM tekstualnim poljima: `learn.content`, flashcard `question/answer/explanation`,
quiz `question/options`, fillBlank `sentence/answer/hint`. Payload ostaje običan string → **migracijski
sigurno** (struktura scheme nepromijenjena).

Smjernice:
- **Riješeni primjeri** (worked examples) idu u `learn.content`, korak-po-korak (svaki korak svoj red/`<p>`).
- **Quiz za zadatke:** numerički odgovori; **distraktori = tipične greške** (zamijenjen brojnik/nazivnik,
  krivi predznak, zaboravljen eksponent…).
- **Grafovi** (ponuda/potražnja, tangenta, distribucije): zasad **slika** u `learn.image`
  (croppani slajd ili SVG). Interaktivni grafovi nisu u schemi.
- ⚠️ **Escape u JS datotekama:** LaTeX `\` se u stringu piše `\\`, pa i sami delimiteri: inline =
  `"\\(...\\)"`, blok = `"\\[...\\]"` (npr. `"\\(\\frac{1}{x}\\)"`, `"\\(x^{n}\\)"`). `$$...$$` ne treba escape.
  Valutu u kvantitativnim predmetima piši kao `USD 25` ili `25 €` (ne miješaj s LaTeX-om bez potrebe).
- 🛟 **Escape hatch:** element s klasom `no-math` KaTeX preskače (ako baš treba doslovni `\(` u tekstu).

## Posebni slučaj: Blind Map (samo Tourism Geography)
Geografija ima dodatnu interaktivnu kartu. Konfiguracija (točke, koordinate, razine:
cities/islands/nationalParks/natureParks/regions) dokumentira se zasebno kad budemo
dirali taj modul. Predmet je u catalogu označen `features.blindMap: true`.

## Checklist prije dodavanja sadržaja
- [ ] Kategorija ima `name`, `icon`, `color`.
- [ ] Svaka flashcard ima `question` + `answer`.
- [ ] `answer` je KRATAK (≤ 200 znak — vidi §Standard duljine); detalj je u `learn`, ne na kartici.
- [ ] Svaki quiz ima `options` i valjan `correct` indeks.
- [ ] Svaki fillBlank ima `_______` u `sentence` i `answer`.
- [ ] Learn `content` je validan HTML.
- [ ] Ključ kategorije je stabilan `camelCase` i jedinstven unutar predmeta.
