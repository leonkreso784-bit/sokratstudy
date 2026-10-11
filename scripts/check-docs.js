#!/usr/bin/env node
/* eslint-disable no-console */
// ===== check:docs — integritet dokumentacije (Stage R) =====
// Postoji jer je `docs/` narastao na 24 fajla u korijenu, s 188 međusobnih poveznica i
// osam ispunjenih planova koji su i dalje izgledali aktivno. Reorganizacija je to sredila;
// ovaj gate čuva da ostane sređeno.
//
// Pada ako:
//   1) relativna .md poveznica ne postoji            → mrtve veze
//   2) `plan/` ima više od JEDNOG spec-a             → „koji plan vrijedi?" (uzrok krivih odluka)
//   3) `product/**` sadrži dnevnički datum           → definicija se pretvara u dnevnik
//   4) .md postoji, a nije naveden u docs/README.md  → dokument-duh koji nitko ne nađe
//   5) CONTENT_SCHEMA nabraja druge tokene boje       → dokument zaostaje za KODOM (ne samo za sobom)
//                       nego schema/*.json
//
// Pokreni: npm run check:docs   (dio `npm run preflight`)

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const DOCS = path.join(ROOT, 'docs');
const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');

const SKIP = ['node_modules', '.git', '.claude', 'mcp-admin', 'backups', '_materials', 'test-results'];

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

const problems = [];
const allMd = walk(ROOT, []);
const known = new Set(allMd.map(rel));

// ── 1) mrtve poveznice ──────────────────────────────────────────────
let links = 0;
for (const abs of allMd) {
  const src = fs.readFileSync(abs, 'utf8');
  const dir = path.posix.dirname(rel(abs));
  const re = /\]\(([^)\s]+\.md)(#[^)\s]*)?\)/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const link = m[1];
    if (/^[a-z]+:\/\//i.test(link)) continue;              // vanjski URL
    links++;
    const target = path.posix.normalize(path.posix.join(dir, link));
    if (!known.has(target)) problems.push('MRTVA POVEZNICA  ' + rel(abs) + '  →  ' + link);
  }
}

// ── 2) TOČNO JEDAN aktivni spec u plan/ ─────────────────────────────
// ROADMAP.md je stalni stanovnik (pregled milestone-a), ne spec.
//
// ⚠️ PROŠIRENO 2026-08-31. Dotad je pravilo glasilo „najviše jedan spec" i brojalo DATOTEKE.
// Povod proširenja: faza MREŽA (sanacija) morala je preuzeti prvenstvo dok frontend redizajn
// NIJE ispunjen — a stara brana je poznavala samo dva stanja, „aktivan" i „u arhivi". Arhiva
// znači ISPUNJEN (pravilo 1), pa bi seljenje nedovršenog speca ondje bila laž koju bi §2b
// odmah i prijavila.
//
// Treće stanje — PAUZIRAN — sad se izriče u dokumentu, a ne pogađa iz broja datoteka. Svrha
// pravila ostaje netaknuta i čak se pooštrava: nekad je zahtijevalo „ne više od jednog", sad
// zahtijeva TOČNO jedan, pa ni prazan `plan/` ne prolazi. Pitanje „koji plan vrijedi?" i dalje
// ima jedan odgovor, samo ga sada daje spec sam.
const PLAN = path.join(DOCS, 'plan');
const PAUZIRAN = /^\s*\*\*Status:\*\*\s*⏸️\s*PAUZIRAN\b/m;
if (fs.existsSync(PLAN)) {
  const specs = fs.readdirSync(PLAN).filter((f) => f.endsWith('.md') && f !== 'ROADMAP.md');
  const aktivni = specs.filter((f) => !PAUZIRAN.test(fs.readFileSync(path.join(PLAN, f), 'utf8')));
  if (aktivni.length > 1) {
    problems.push('VIŠE AKTIVNIH PLANOVA u docs/plan/: ' + aktivni.join(', ') +
      '\n      → ispunjen plan ide u docs/archive/ ISTI DAN (pravilo 1)' +
      '\n      → spec koji čeka dobiva `**Status:** ⏸️ PAUZIRAN` u zaglavlju');
  }
  if (specs.length && !aktivni.length) {
    problems.push('NIJEDAN AKTIVAN PLAN u docs/plan/: svih ' + specs.length +
      ' je označeno PAUZIRAN\n      → „što sada" mora imati odgovor; točno jedan spec nosi prvenstvo');
  }
}

// ── 2b) plan/ i product/ ne smiju proglasiti ARHIVU aktivnom (ADR-027) ──
// Povod: `plan/ROADMAP.md` je tjednima tvrdio „trenutni rad = CREATE_BACKEND F5" i označavao
// `CREATE_BACKEND_SPEC.md` kao **AKTIVNO** — a taj je dokument bio u `archive/`, a F5 odavno
// na produkciji. Svaka svježa sesija bi krenula od te rečenice.
//
// Ovo je JEDINA semantička zastarjelost iz tog čišćenja koja se da uhvatiti strojno:
// ako dokument koji govori „što sada" pokazuje na `archive/` i uz to viče AKTIVNO — laže.
const AKTIVNO = /\bAKTIVN(?:O|I|A)\b/;
// `PRODUCT` se definira niže (const → TDZ), pa se putanja ovdje računa lokalno.
for (const dir of [PLAN, path.join(DOCS, 'product')]) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md'))) {
    const abs = path.join(dir, f);
    fs.readFileSync(abs, 'utf8').split(/\r?\n/).forEach((line, i) => {
      if (line.indexOf('archive/') !== -1 && AKTIVNO.test(line)) {
        problems.push('ARHIVA PROGLAŠENA AKTIVNOM  ' + rel(abs) + ':' + (i + 1) +
          '\n      → ' + line.trim().slice(0, 110) +
          '\n      → dokument u archive/ je REFERENCA, ne izvor istine (ADR-027)');
      }
    });
  }
}

// ── 3) product/ je DEFINICIJA, ne dnevnik ───────────────────────────
const PRODUCT = path.join(DOCS, 'product');
if (fs.existsSync(PRODUCT)) {
  for (const f of fs.readdirSync(PRODUCT).filter((x) => x.endsWith('.md'))) {
    const abs = path.join(PRODUCT, f);
    const src = fs.readFileSync(abs, 'utf8');
    const dated = src.match(/\b20\d\d-\d\d-\d\d\b/g) || [];
    if (dated.length > 3) {
      problems.push('DNEVNIK U DEFINICIJI  ' + rel(abs) + '  (' + dated.length + ' datuma)' +
        '\n      → product/ opisuje ŠTO proizvod mora znati; kronologija ide u docs/records/');
    }
  }
}

// ── 3b) ĆIRILICA ────────────────────────────────────────────────────
// Hrvatski i ćirilica dijele izgled nekoliko slova (а/о/е/с/р…), pa se pri kopiranju
// ili tipkanju neprimjetno uvuku. Već se jednom provuklo u sadržaj (`Manualне`, PR #1),
// a i ovaj gate je odmah uhvatio `katalога` u prepisanom ARCHITECTURE.md.
// ⚠ Ćirilica UNUTAR koda je legitimna — tako se navodi sam detekcijski raspon (`[Ѐ-ӿ]`) i
// citiraju popravljeni primjeri (`najbržи`). Zato se prije provjere maknu blokovi i inline-kod.
const stripCode = (s) => s.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
for (const abs of allMd) {
  const src = stripCode(fs.readFileSync(abs, 'utf8'));
  const hits = src.match(/[Ѐ-ӿ]+/g);
  if (hits) {
    const uniq = Array.from(new Set(hits)).slice(0, 5).map((h) => JSON.stringify(h)).join(', ');
    problems.push('ĆIRILICA           ' + rel(abs) + '  → ' + uniq +
      '\n      → hrvatski tekst ne smije sadržavati ćirilične znakove (izgledaju isto, nisu isto)');
  }
}

// ── 3c) ĆIRILICA U KODU I SADRŽAJU ──────────────────────────────────
// Gate iznad gleda SAMO `.md`, pa je pola repozitorija bilo nepokriveno. Pred-compact
// revizija 2026-08-09 ondje je našla **ćirilično `С` u `MPС`** — u ODGOVORU KARTICE
// (`data/macroeconomics/midterm-1.js`), dakle u gradivu koje student čita, i preslikano
// u `data/json/` i u produkcijsku bazu. Renderira se identično, ali `Ctrl+F` za „MPC"
// ga ne nađe. Uz to tri komentara u `js/`/`tests/`.
//
// Zato ova provjera sweepa izvor i podatke. Nema `stripCode` izuzeća — u `.js`/`.json`
// ćirilica nema legitiman razlog postojati; jedina iznimka je OVA datoteka, koja mora
// navesti sam raspon (`[Ѐ-ӿ]`) i citirati popravljene primjere.
// ⚠️ `css` i korijenski `.html` DODANI 2026-08-16. Popis nastavaka je od početka
// tvrdio da pokriva `.css` i `.html`, ali `CODE_DIRS` nikad nije posjetio `css/`, a
// korijenske stranice (`index.html` i četiri pravne) ne leže ni u jednoj od mapa —
// pa nijedna od 34 datoteke tih dvaju tipova nije bila skenirana. Nađeno kad je
// ćirilično `а` (U+0430) upisano u komentar u `css/landing.css` i gate je šutio.
// Isti oblik kvara četvrti put: GATE KOJI POKRIVA NEKA MJESTA STVARA TIHU
// PRETPOSTAVKU DA POKRIVA SVA — usporedi tvrdu zabranu #2 i tintu na pločicama.
const CODE_DIRS = ['js', 'tests', 'scripts', 'data', 'css'];
const CODE_EXT = /\.(js|mjs|ts|json|css|html)$/;
// ⚠️ KORIJEN SE ČITA S DISKA, NE IZ POPISA (2026-08-24). Ovdje je stajao ručni popis od
// PET imena, i propuštao je **23 datoteke** — među njima:
//   · `sw.js`      — kod koji ide svakom posjetitelju, i u kojem je STVARNO ležalo
//                    ćirilično `а` (U+0430) u komentaru, prošlo kroz gate neopaženo;
//   · `editor.html`— stranica koju je T6 stvorio, ista rupa koju su tada imali
//                    `check:cdn` i `check:tailwind`, i ista koju su tada zatvorili
//                    BRISANJEM popisa;
//   · **12 × `data-*.js`** — četiri stara sem-2 predmeta koje ADR-015 svjesno drži u
//                    korijenu. To je SADRŽAJ, dakle točno ono zbog čega ova provjera
//                    uopće postoji (povod joj je bilo ćirilično `С` u odgovoru kartice).
// *Brana koja ovisi o tome da se netko sjeti nije brana nego bilješka* — treći put ista
// pouka u tri tjedna, pa je popis obrisan umjesto dopunjen.
const ROOT_EXT = ['.js', '.html', '.json', '.txt', '.xml'];
const ROOT_FILES = fs.readdirSync(ROOT, { withFileTypes: true })
  .filter((e) => e.isFile() && ROOT_EXT.some((x) => e.name.endsWith(x)))
  // `package-lock.json` je generiran i golem; ćirilica u njemu bi bila tuđa, ne naša.
  .filter((e) => e.name !== 'package-lock.json')
  .map((e) => e.name)
  .sort();
const CYRILLIC_ALLOWED = new Set([path.join(ROOT, 'scripts', 'check-docs.js')]);

function sweepCyrillic(dir) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return; }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { sweepCyrillic(p); continue; }
    if (!CODE_EXT.test(e.name) || CYRILLIC_ALLOWED.has(p)) continue;
    const hits = fs.readFileSync(p, 'utf8').match(/[Ѐ-ӿ]+/g);
    if (!hits) continue;
    const uniq = Array.from(new Set(hits)).slice(0, 5).map((h) => JSON.stringify(h)).join(', ');
    problems.push('ĆIRILICA (kod)     ' + rel(p) + '  → ' + uniq +
      '\n      → ćirilica u kodu/sadržaju je uvijek greška kopiranja (izgleda isto, nije isto)');
  }
}
for (const d of CODE_DIRS) sweepCyrillic(path.join(ROOT, d));

// Korijenske stranice ne leže ni u jednoj mapi iz `CODE_DIRS`, pa se navode poimence.
// `sweepCyrillic` radi nad mapom, pa se ovdje ponavlja samo sama provjera.
for (const name of ROOT_FILES) {
  const p = path.join(ROOT, name);
  if (!fs.existsSync(p)) continue;
  const hits = fs.readFileSync(p, 'utf8').match(/[Ѐ-ӿ]+/g);
  if (!hits) continue;
  const uniq = Array.from(new Set(hits)).slice(0, 5).map((h) => JSON.stringify(h)).join(', ');
  problems.push('ĆIRILICA (kod)     ' + rel(p) + '  → ' + uniq +
    '\n      → ćirilica u kodu/sadržaju je uvijek greška kopiranja (izgleda isto, nije isto)');
}

// ── 4) svaki .md pod docs/ mora biti naveden u indeksu ──────────────
const INDEX = path.join(DOCS, 'README.md');
if (fs.existsSync(INDEX)) {
  const idx = fs.readFileSync(INDEX, 'utf8');
  for (const abs of allMd) {
    const r = rel(abs);
    if (!r.startsWith('docs/')) continue;                  // root README/CLAUDE nisu u indeksu
    if (r === 'docs/README.md') continue;
    const base = path.basename(r);
    // dovoljno je da se ime pojavi u indeksu (poveznica ili spomen)
    if (idx.indexOf(base) === -1) {
      problems.push('NIJE U INDEKSU     ' + r + '  → dodaj redak u docs/README.md');
    }
  }
}

// ── 5) CONTENT_SCHEMA mora nabrajati TOČNO one tokene boje koje shema dopušta ──
// Provjere 1–4 čuvaju STRUKTURU dokumentacije; ovo je prva koja čuva njenu ISTINITOST.
// Povod: odlomak o „runs" tvrdio je 5 tokena boje i nije znao za `math`, dok su u shemi (i na
// produkciji) bila 9 tokena i `math` — autor sadržaja koji čita dokument ne bi znao da inline
// matematika postoji. Shema je izvor istine; dokument se mjeri po njoj.
const SCHEMA = path.join(ROOT, 'schema', 'subject-content.schema.json');
const CS = path.join(DOCS, 'architecture', 'CONTENT_SCHEMA.md');
if (fs.existsSync(SCHEMA) && fs.existsSync(CS)) {
  let want = null;
  try {
    const sc = JSON.parse(fs.readFileSync(SCHEMA, 'utf8'));
    const run = sc.definitions && sc.definitions.run;
    if (run && run.properties && run.properties.color) want = run.properties.color.enum;
  } catch (e) {
    problems.push('SHEMA NEČITLJIVA    schema/subject-content.schema.json → ' + e.message);
  }
  if (Array.isArray(want)) {
    const src = fs.readFileSync(CS, 'utf8');
    const line = src.split('\n').find((l) => l.indexOf('Tokeni boje') !== -1);
    if (!line) {
      problems.push('NEMA POPISA BOJA   ' + rel(CS) +
        '\n      → treba redak koji počinje „**Tokeni boje" i nabraja tokene u `backtickovima`');
    } else {
      const got = (line.match(/`[a-z]+`/g) || []).map((t) => t.slice(1, -1));
      const missing = want.filter((t) => got.indexOf(t) === -1);
      const extra = got.filter((t) => want.indexOf(t) === -1);
      if (missing.length || extra.length) {
        problems.push('BOJE SE RAZILAZE   ' + rel(CS) + ' vs schema/subject-content.schema.json' +
          (missing.length ? '\n      → shema ima, dokument NEMA: ' + missing.join(', ') : '') +
          (extra.length ? '\n      → dokument ima, shema NEMA: ' + extra.join(', ') : ''));
      }
    }
  }
}

// ── 6) CLAUDE.md ima BUDŽET ───────────────────────────────────────
// Ta se datoteka učitava SVAKU sesiju, pa je njezina duljina trošak koji plaća svaki rad.
// Do 2026-08-25 je narasla na **88 000 znakova**, i to ne slučajno: svaka je cigla dopisala
// svoju pouku ovamo *i* u spec, pa je 61 % datoteke bila povijest GOTOVIH cigli — druga kopija
// onoga što spec već ima (ADR-027: jedna činjenica = jedno mjesto).
//
// ⚠️ Brana NE zabranjuje pisanje nego RAST: pouka cigle ide u spec, a `CLAUDE.md` dobiva
// najviše jedan redak s pointerom. Obrazac je posuđen od `check:palette` — osnovica se
// **spušta svjesno** (uredi konstantu ispod i reci zašto), a nikad ne raste prijećutno.
const CLAUDE_BUDGET = 32550; // znakova; 2026-08-25: izmjereno 31 349 nakon rezanja (bilo 87 970); 2026-09-29: +150 za redak nove preflight-brane check:names (bio 32 996, bez rezerve); 2026-10-11: SPUŠTENO — ADR blok na jedan redak po ADR-u (izmjereno 32 243, +300 rezerve za pravilo testiranja)
const CLAUDE_MD = path.join(ROOT, 'CLAUDE.md');
if (fs.existsSync(CLAUDE_MD)) {
  // ⚠️ BEZ ZNAKA POVRATKA: `.length` broji i CR, pa je ISTA datoteka mjerila 33 148 znakova
  // u radnoj kopiji na Windowsu (CRLF) i 32 835 u CI-ju (LF) — razlika od 313 znakova, tj. jednog
  // znaka po retku. Brana je zbog toga presuđivala po tome KAKO je repozitorij izvučen, a ne po
  // tome koliko je datoteka narasla: isti commit crven lokalno, zelen u CI-ju. Izmjereno 2026-09-08.
  const vel = fs.readFileSync(CLAUDE_MD, 'utf8').replace(/\r/g, '').length;
  if (vel > CLAUDE_BUDGET) {
    problems.push('CLAUDE.md PREKO BUDŽETA   ' + vel + ' > ' + CLAUDE_BUDGET + ' znakova' +
      '\n      → pouka cigle ide u `docs/plan/*` ili u zaglavlje skripte, ovdje ostaje POINTER.' +
      '\n      → ako je rast opravdan, podigni CLAUDE_BUDGET u scripts/check-docs.js I zapiši zašto.');
  }
}

// ── 7) DUH-DATOTEKE ───────────────────────────────────────────────
// Mrtva poveznica (provjera 1) hvata `[tekst](put.md)`. Ovo hvata drugu polovicu istog
// kvara: datoteku imenovanu u `backtickovima` — `tests/foo.spec.js`, `scripts/bar.js` —
// koja je u međuvremenu preimenovana ili obrisana. Povod: `TESTING.md` je držao ručni
// inventar specova; kad je 2026-08-25 sveden na skupine, jedina provjera koja je ostala
// moguća jest da ono što JEST imenovano stvarno postoji. Duhova je tada bilo 0 — brana
// čuva to stanje, umjesto da se popis održava napamet.
//
// ⚠️ MJERI SE SAMO ONDJE GDJE JE IMENOVANJE TVRDNJA O DISKU — `docs/workflow/`,
// `docs/architecture/` i `CLAUDE.md`. Prva verzija je gledala SVE dokumente i odmah
// prijavila 7 „duhova" od kojih **nijedan nije bio kvar**: `docs/records/` je povijest
// (ondje je `css/responsive.css` točan opis onoga što je tada postojalo — isti razlog
// zbog kojeg `check:state` namjerno preskače CHANGELOG/PROGRESS), a `docs/plan/` i
// `docs/subjects/` imenuju **hipoteze** — `js/stat-kernel.js` ondje stoji pod naslovom
// „zašto NE". *Brana koja kažnjava precizno pisanje o odbačenoj opciji uči ljude da
// pišu neodređeno.*
//
// ⚠️ Preskaču se i uzorci s `<`, `*` i `?` (npr. `data/<subj>-hr/`) — placeholderi.
//
// ⚠️ GENERIRANO I GITIGNORIRANO NIJE DUH (2026-09-06). `TESTING.md` imenuje
// `tests/.auth/admin.json` — sesiju koju `test:authed` TEK proizvede i koju `.gitignore`
// drži izvan repozitorija. Na stroju gdje su ti testovi jednom vrćeni datoteka postoji, na
// svježem klonu (i u svakom novom `git worktree`) ne — pa je brana prolazila TOČNO ondje
// gdje je napisana, a padala svugdje drugdje, bez ijednog kvara u repozitoriju. Brana koja
// ovisi o povijesti stroja ne mjeri repozitorij. Što je generirano piše u `.gitignore`, pa
// se pita GIT, a ne popis imena u ovoj skripti (koji bi se razišao pri prvom sljedećem
// artefaktu). Ako git nije dostupan, ne prašta se ništa — brana pada zatvoreno.
const PATH_RE = /`((?:js|css|tests|scripts|data|schema|supabase|assets)\/[A-Za-z0-9._/-]+\.[a-z]{2,5})`/g;
const kandidati = [];
const TVRDI_O_DISKU = (f) => {
  const r = rel(f);
  return r === 'CLAUDE.md' || r.indexOf('docs/workflow/') === 0 ||
         r.indexOf('docs/architecture/') === 0;
};
allMd.filter(TVRDI_O_DISKU).forEach((f) => {
  const src = fs.readFileSync(f, 'utf8');
  let m;
  while ((m = PATH_RE.exec(src)) !== null) {
    const cilj = m[1];
    if (/[<>*?]/.test(cilj)) continue;
    if (!fs.existsSync(path.join(ROOT, cilj))) {
      kandidati.push({ izvor: rel(f), cilj });
    }
  }
});
/** Skup putanja koje `.gitignore` pokriva — dakle onih koje repozitorij i NE SMIJE imati. */
function gitIgnorira(putevi) {
  if (!putevi.length) return new Set();
  const r = spawnSync('git', ['check-ignore', '--stdin'],
    { cwd: ROOT, input: putevi.join('\n'), encoding: 'utf8' });
  // 0 = bar jedan ignoriran · 1 = nijedan · ostalo (uklj. „nije git repo") = ne praštamo
  if (r.error || (r.status !== 0 && r.status !== 1)) return new Set();
  return new Set(String(r.stdout || '').split('\n').map((s) => s.trim()).filter(Boolean));
}
const ignorirani = gitIgnorira(Array.from(new Set(kandidati.map((k) => k.cilj))));
const duhovi = kandidati
  .filter((k) => !ignorirani.has(k.cilj))
  .map((k) => k.izvor + '  →  ' + k.cilj);
if (duhovi.length) {
  const jedinstveni = Array.from(new Set(duhovi)).sort();
  problems.push('DUH-DATOTEKA (' + jedinstveni.length + ')' +
    jedinstveni.map((d) => '\n      • ' + d).join(''));
}

// ── izvještaj ───────────────────────────────────────────────────────
console.log('\n=== check:docs ===');
console.log('  .md dokumenata : ' + allMd.length);
console.log('  poveznica      : ' + links);
if (problems.length === 0) {
  console.log('\n✅ dokumentacija je konzistentna\n');
  process.exit(0);
}
console.log('\n❌ ' + problems.length + ' problem(a):\n');
problems.forEach((p) => console.log('   • ' + p));
console.log('');
process.exit(1);
