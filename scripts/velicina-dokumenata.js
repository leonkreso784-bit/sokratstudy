/* eslint-disable no-console */
// ===== BRANA VELIČINE — memorija, checkpoint, aktivni plan, docs/architecture =====
// Zove je `check:docs` (odjeljak 9), dakle preflight i CI. Kalup je CLAUDE_BUDGET (odjeljak 6):
// prag je konstanta s DATUMOM i RAZLOGOM, raste samo svjesno (uredi tablicu i reci zašto), nikad prešutno.
//
// ZAŠTO POSTOJI (Leon, anketa 2026-10-11; cigla DOKUMENTACIJA ②): izmjereno 10.10. — `current-checkpoint`
// je narastao na **98 777 znakova u 62 bloka** (oko 3 % trenutnog stanja, pet različitih „SLJEDEĆA SESIJA"),
// `MEMORY.md` na 11 191 bez ikakve brane. Obje se učitavaju u svaku sesiju i tiho oblikuju svaku odluku;
// rezanje (①) bez brane samo odgađa isti rast. CLAUDE.md ima budžet od 2026-08-25 i od tada ne raste.
//
// ⚠️ MEMORIJA JE IZVAN REPOZITORIJA (`~/.claude/projects/<ime>/memory`). Ime mape se IZVODI iz puta
// GLAVNOG radnog stabla (prvi redak `git worktree list --porcelain`), jer memorija pripada glavnom stablu i
// kad se radi iz povezanog (`.f6`). Svaki ne-alfanumerički znak → „-"; slovo diska zna biti malo (`c--…`)
// iako git kaže `C:/`, pa se mapa traži BEZ OBZIRA NA VELIČINU SLOVA. Izričit put: `SOKRAT_MEMORIJA`.
// Nema li mape (CI, drugi stroj), ispisuje se „PRESKOČENO — memorija nije na ovom stroju: <put>" —
// nikad tiho. Izričit put koji ne postoji = PAD (netko je tražio mjerenje koje se ne može izvesti).
//
// Brana: tests/unit/velicina-dokumenata.test.js. Mjeri se u znakovima BEZ `\r` (isto što i CLAUDE_BUDGET).

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

// ── PRAGOVI (jedina tablica; brojke od 10.10. i odluka: docs/records/PROGRESS, unos 2026-10-11 „DOKUMENTACIJA ①") ──
const MEMORIJA = [
  { datoteka: 'MEMORY.md', prag: 8000, redak: 250, od: '2026-10-11',
    zasto: 'indeks se učitava svaku sesiju; 11 191 → 6 911 rezanjem ①, jedan redak = jedna kuka' },
  { datoteka: 'current-checkpoint.md', prag: 5000, od: '2026-10-11',
    zasto: 'samo trenutno stanje; 98 777 znakova u 62 bloka bio je najveći izvor halucinacije' },
  { datoteka: 'windows-git-bash-zamke.md', prag: 9000, od: '2026-10-11',
    zasto: 'IMENOVANA IZNIMKA: 23+ zamke alata, svaka je koštala sat ili lažan nalaz (8 678 na dan uvođenja)' },
];
const OSTALE_MEMORIJE = { prag: 6000, od: '2026-10-11', zasto: 'jedna činjenica po datoteci; najveća 5 238 (10.10.)' };
const AKTIVNI_PLAN = { prag: 12000, od: '2026-10-11', zasto: 'jedan spec za ono što sada radimo; ZAVRSNICA 9 032 (10.10.)' };
// docs/architecture: izmjereno 2026-10-11, prag = izmjereno + 10 %. Nova datoteka bez retka = PAD, redak bez datoteke = PAD.
const ARHITEKTURA = {
  od: '2026-10-11', zasto: 'KAKO je građeno — raste s kodom, ali svjesno',
  izmjereno: {
    'ARCHITECTURE.md': 14273, 'BACKEND.md': 18265, 'CATALOG_ARCHITECTURE.md': 6032, 'CONTENT_SCHEMA.md': 13517,
    'EXERCISES_ENGINE.md': 37219, 'MCP.md': 12565, 'MCP_SECURITY.md': 29466,
  },
};
const pragArhitekture = (n) => Math.ceil(n * 1.1);

const duljina = (p) => fs.readFileSync(p, 'utf8').replace(/\r/g, '').length;
const BEZ_GITA = () => Object.fromEntries(Object.entries(process.env).filter(([k]) => !k.startsWith('GIT_')));

/** `C:/Users/x/Documents/sokratstudy.dev` → `C--Users-x-Documents-sokratstudy-dev`. */
function imeProjekta(put) {
  return String(put).replace(/[^A-Za-z0-9]/g, '-');
}

/** Gdje bi memorija trebala biti → { put, izricito, greska }. Ne provjerava postoji li. */
function mapaMemorije(korijen, env, dom) {
  env = env || process.env;
  if (env.SOKRAT_MEMORIJA) return { put: env.SOKRAT_MEMORIJA, izricito: true };
  // ⚠️ bez GIT_* — iz pre-push kuke bi `GIT_DIR` preusmjerio git na tuđi repozitorij (git-okolina.test.js)
  const r = spawnSync('git', ['worktree', 'list', '--porcelain'], { cwd: korijen, encoding: 'utf8', env: BEZ_GITA() });
  const m = !r.error && r.status === 0 && /^worktree (.+)$/m.exec(r.stdout || '');
  if (!m) return { put: null, greska: 'git worktree list nije uspio (' + (r.error ? r.error.message : 'izlaz ' + r.status) + ')' };
  const projekti = path.join(dom || os.homedir(), '.claude', 'projects');
  const ime = imeProjekta(m[1].trim());
  let stvarno = ime;
  if (fs.existsSync(projekti)) {
    const nadeno = fs.readdirSync(projekti).find((d) => d.toLowerCase() === ime.toLowerCase());
    if (nadeno) stvarno = nadeno;
  }
  return { put: path.join(projekti, stvarno, 'memory'), izricito: false };
}

/**
 * Vraća { problemi: [], napomene: [], dotaknuto: n }.
 * `aktivniPlanovi` = imena datoteka u docs/plan/ koje check:docs proglasi aktivnima (odjeljak 2).
 */
function provjeri({ korijen, aktivniPlanovi, env, dom, arhitektura }) {
  const problemi = [];
  const napomene = [];
  let dotaknuto = 0;
  const preko = (sto, n, prag, od, zasto) => problemi.push('PREKO PRAGA  ' + sto + '  ' + n + ' > ' + prag + ' znakova' +
    '\n      → prag (' + od + '): ' + zasto +
    '\n      → skrati (jedna činjenica = jedno mjesto, ADR-027); ako je rast opravdan, podigni prag u' +
    '\n        scripts/velicina-dokumenata.js I zapiši datum i razlog.');

  // ── memorija ──
  const mem = mapaMemorije(korijen, env, dom);
  if (!mem.put) problemi.push('MEMORIJA SE NE MOŽE NAĆI  ' + mem.greska + '\n      → izričit put: SOKRAT_MEMORIJA=<mapa>');
  else if (!fs.existsSync(mem.put)) {
    if (mem.izricito) problemi.push('SOKRAT_MEMORIJA ne postoji: ' + mem.put);
    else napomene.push('PRESKOČENO — memorija nije na ovom stroju: ' + mem.put);
  } else {
    const imenovane = new Map(MEMORIJA.map((p) => [p.datoteka, p]));
    for (const d of fs.readdirSync(mem.put).filter((x) => x.endsWith('.md')).sort()) {
      const p = path.join(mem.put, d);
      const n = duljina(p);
      dotaknuto++;
      const pr = imenovane.get(d) || Object.assign({ datoteka: d }, OSTALE_MEMORIJE);
      if (n > pr.prag) preko('memorija/' + d, n, pr.prag, pr.od, pr.zasto);
      if (pr.redak) {
        fs.readFileSync(p, 'utf8').replace(/\r/g, '').split('\n').forEach((l, i) => {
          if (l.length > pr.redak) {
            problemi.push('PREDUG REDAK  memorija/' + d + ':' + (i + 1) + '  ' + l.length + ' > ' + pr.redak +
              ' znakova\n      → u indeksu stoji samo kuka; detalj ide u datoteku memorije');
          }
        });
      }
    }
    for (const p of MEMORIJA) {
      if (!fs.existsSync(path.join(mem.put, p.datoteka))) problemi.push('PRAG BEZ DATOTEKE  memorija/' + p.datoteka +
        '\n      → datoteka je preimenovana ili obrisana: popravi tablicu u scripts/velicina-dokumenata.js');
    }
    napomene.push('memorija: ' + mem.put);
  }

  // ── aktivni plan ──
  for (const f of aktivniPlanovi || []) {
    const n = duljina(path.join(korijen, 'docs', 'plan', f));
    dotaknuto++;
    if (n > AKTIVNI_PLAN.prag) preko('docs/plan/' + f, n, AKTIVNI_PLAN.prag, AKTIVNI_PLAN.od, AKTIVNI_PLAN.zasto);
  }

  // ── docs/architecture ──
  const ark = arhitektura || ARHITEKTURA;
  const mapaArk = path.join(korijen, 'docs', 'architecture');
  const naDisku = fs.existsSync(mapaArk) ? fs.readdirSync(mapaArk).filter((x) => x.endsWith('.md')) : [];
  for (const d of naDisku) {
    dotaknuto++;
    const n = duljina(path.join(mapaArk, d));
    if (!(d in ark.izmjereno)) {
      problemi.push('NEMA PRAGA  docs/architecture/' + d + '  (' + n + ' znakova)' +
        '\n      → dodaj redak u ARHITEKTURA.izmjereno u scripts/velicina-dokumenata.js (izmjereno danas, prag +10 %)');
      continue;
    }
    const prag = pragArhitekture(ark.izmjereno[d]);
    if (n > prag) preko('docs/architecture/' + d, n, prag, ark.od, ark.zasto + ' (izmjereno ' + ark.izmjereno[d] + ' + 10 %)');
  }
  for (const d of Object.keys(ark.izmjereno)) {
    if (naDisku.indexOf(d) < 0) problemi.push('PRAG BEZ DATOTEKE  docs/architecture/' + d +
      '\n      → makni redak iz ARHITEKTURA.izmjereno u scripts/velicina-dokumenata.js');
  }
  return { problemi, napomene, dotaknuto };
}

module.exports = { provjeri, mapaMemorije, imeProjekta, MEMORIJA, OSTALE_MEMORIJE, AKTIVNI_PLAN, ARHITEKTURA, pragArhitekture };
