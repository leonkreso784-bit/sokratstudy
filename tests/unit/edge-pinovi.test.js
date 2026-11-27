/* eslint-disable no-console */
// ===== Gate: OVISNOSTI EDGE FUNCTIONA SE PINAJU TOČNO (pravilo #9) =====
// Pokreni: node tests/unit/edge-pinovi.test.js
//
// ZAŠTO POSTOJI (F6 ①/4): pravilo #9 kaže da se ovisnosti pinaju točno i da je `^` zabranjen.
// Za alat to provodi `save-exact=true` u `.npmrc`, za preglednik `check:cdn` — ali kôd koji se
// vrti na Supabaseu **ne prolazi ni kroz jedno od toga**. Deno razrješava `npm:paket@raspon`
// pri DEPLOYU, iz mreže, bez lockfilea: isti commit deployan dva dana zaredom može dobiti
// dvije različite verzije, a razlika se vidi tek kad konektor prestane raditi.
//
// Povod nije hipotetski: `@supabase/server` je mlad, njegov OAuth sloj je alpha, a službeni
// vodič piše upravo `^`. ①/1 je pinao točno — ali to nitko nije MJERIO, pa je vrijedilo samo
// dok se netko sjeća. ADR-027: rub koji prepoznaš isti čas dobiva test.
//
// Brana gleda IZVORNI TEKST, kao `axe-gate-usage`: pitanje nije što se dogodi pri deployu nego
// ŠTO U REPOZITORIJU PIŠE. Popis datoteka se nabraja S DISKA — ručni popis bi propustio
// sljedeću funkciju, a upravo to je razred greške koji ova kuća već dvaput plaća.

const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  ✓ ' + name); }
  catch (e) { failed++; console.error('  ✗ ' + name + '\n      ' + e.message); }
}

console.log('\n=== edge-pinovi — ovisnosti Edge Functiona (pravilo #9) ===\n');

const KORIJEN = path.join(__dirname, '..', '..');
const FUNKCIJE = path.join(KORIJEN, 'supabase', 'functions');

/** SVE datoteke pod supabase/functions — S DISKA, rekurzivno. */
function sveDatoteke(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...sveDatoteke(p));
    else out.push(p);
  }
  return out;
}

// ⚠️ ZADANO JE ZATVORENO. Prva verzija je filtrirala `e.name.endsWith('.ts')` — popis od jednog
// nastavka, pisan rukom, dok naslov tvrdi „svaki udaljeni uvoz u supabase/functions/**". Deno
// jednako poslužuje `.js`/`.mjs`/`.tsx`, a `deno.json` smije nositi cijeli import-map — sve bi to
// bilo NEVIDLJIVO, i brana bi ostala 4/4 zelena uz `npm:nesto@^1.0.0` u novoj datoteci.
// Sad se svaka datoteka s diska ili SKENIRA ili je IMENOVANA ovdje s razlogom; nepoznat nastavak
// pada po defaultu. (Isti obrazac kao `OTVORENO` u `scripts/mcp-brava-check.js`.)
const KOD = ['.ts', '.tsx', '.js', '.mjs', '.cjs', '.jsx'];
const UVOZNE_MAPE = ['deno.json', 'deno.jsonc', 'import_map.json'];
const NE_SKENIRA_SE = [
  { obrazac: /\.md$/i, zasto: 'proza, ne izvodi se' },
  { obrazac: /\.sql$/i, zasto: 'SQL artefakt, nema uvoza paketa' },
];

// ⚠️ Komentari se odstranjuju PRIJE provjere — inače brana pada na vlastitoj prozi.
// Ova datoteka i zaglavlje `mcp/index.ts` spominju `^` upravo zato da ga zabrane.
const bezKomentara = (src) => src.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^\s*\/\/.*$/gm, ' ');

// Udaljeni specifikatori: `npm:`, `jsr:` i goli `https://`. Lokalni `./x.ts` nisu ovisnost.
// ⚠️ HVATA SE SAMO UVOZNI POLOŽAJ (`from '…'`, `import '…'`, `import('…')`). Prva verzija ove
// brane gledala je BILO KOJI navodnik s `https://` i prijavila `https://api.resend.com/emails/batch`
// i `https://www.sokratstudy.com` — adrese koje se POZIVAJU u izvođenju, a nisu ovisnost.
// Brana koja miješa uvoz s nizom znakova ne mjeri ono što tvrdi.
const SPEC = /(?:\bfrom\s*|\bimport\s*\(?\s*)['"]((?:npm|jsr):[^'"]+|https:\/\/[^'"]+)['"]/g;

/**
 * Razvrstava specifikator u `tocan` · `raspon` · `pomicna`.
 *
 * ⚠️ RAZLIKA JE VAŽNA, i prva verzija je nije imala. Raspon (`@2`, `@^1.7.0`) je zapisiv dug —
 * svjestan, ograničen, i smije stajati u osnovici. **Pomična oznaka** (`@latest`, `@beta`, `@next`)
 * nije dug nego odricanje od verzije: sutra može biti bilo što. Zato osnovica smije izuzeti
 * RASPON, ali NIKAD pomičnu oznaku.
 * Prva je verzija to gledala popisom od pet zapamćenih imena (`latest|next|canary|main|master`),
 * bez `beta`, `alpha`, `rc`, `dev`, `nightly`… — popis pisan rukom ondje gdje pravilo može biti
 * jedno: **verzija je `X.Y.Z` ili nije verzija**.
 */
const TOCNA_VERZIJA = /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/;

function sud(spec) {
  if (spec.startsWith('npm:') || spec.startsWith('jsr:')) {
    const tijelo = spec.slice(4);
    // ime može imati scope (@scope/paket) i podput iza verzije (paket@1.2.3/sub)
    const m = tijelo.match(/^(@[^/@]+\/[^/@]+|[^/@]+)@([^/]+)(\/.*)?$/);
    if (!m) return { vrsta: 'pomicna', zasto: 'nema verzije uopće — Deno bi pri svakom deployu uzeo najnoviju' };
    const v = m[2];
    if (TOCNA_VERZIJA.test(v)) return { vrsta: 'tocan' };
    // Raspon mora BAR počinjati brojem (`2`, `^1.7.0`, `>=1.2`). Sve drugo je ime izdanja.
    if (/^[\^~>=<\s]*\d/.test(v)) return { vrsta: 'raspon', zasto: `verzija "${v}" je RASPON, ne točan pin` };
    return { vrsta: 'pomicna', zasto: `verzija "${v}" je POMIČNA OZNAKA — sutra može biti bilo što` };
  }
  // https://… mora nositi verziju u putu (deno.land/std@0.224.0/…, esm.sh/paket@1.2.3)
  if (!/@v?\d+\.\d+\.\d+/.test(spec)) return { vrsta: 'pomicna', zasto: 'URL bez verzije u putu' };
  return { vrsta: 'tocan' };
}
const tocanPin = (spec) => ({ ok: sud(spec).vrsta === 'tocan', zasto: sud(spec).zasto });

const sve = sveDatoteke(FUNKCIJE);
const rel = (f) => path.relative(KORIJEN, f).replace(/\\/g, '/');

const kod = sve.filter((f) => KOD.indexOf(path.extname(f)) !== -1);
const mape = sve.filter((f) => UVOZNE_MAPE.indexOf(path.basename(f)) !== -1);
const imenovane = sve.filter((f) => NE_SKENIRA_SE.some((n) => n.obrazac.test(f)));
const neprepoznate = sve.filter((f) =>
  kod.indexOf(f) === -1 && mape.indexOf(f) === -1 && imenovane.indexOf(f) === -1);

const nalazi = [];
for (const f of kod) {
  const src = bezKomentara(fs.readFileSync(f, 'utf8'));
  let m;
  SPEC.lastIndex = 0;
  while ((m = SPEC.exec(src)) !== null) nalazi.push({ datoteka: rel(f), spec: m[1] });
}
// Import-map po funkciji je podržan oblik i nosi iste specifikatore — brana koja ga ne čita
// ostavlja otvoren put kojim `^` uđe bez ijednog `import` retka.
for (const f of mape) {
  let j;
  try { j = JSON.parse(fs.readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, ' ')); } catch { j = null; }
  const im = (j && j.imports) || {};
  for (const v of Object.values(im)) {
    if (typeof v === 'string' && /^(npm:|jsr:|https:\/\/)/.test(v)) nalazi.push({ datoteka: rel(f), spec: v });
  }
}

// ⚠️ DOSEG SE ISPISUJE. Brana koja tiho prođe na nuli ne mjeri ništa — u ovoj je kući
// mjerač koji ne kaže koliko je dotaknuo bio prvi kvar dvanaest puta.
console.log(`  (doseg: ${sve.length} datoteka na disku → ${kod.length} skenirano kao kôd, ` +
  `${mape.length} uvoznih mapa, ${imenovane.length} imenovano bez skeniranja, ` +
  `${neprepoznate.length} neprepoznato; ${nalazi.length} udaljenih specifikatora)\n`);

test('scan je nešto našao — nula bi značila da se brana slomila, ne da je čisto', () => {
  if (!sve.length) throw new Error('nijedna datoteka pod supabase/functions — put je pogrešan?');
  if (!kod.length) throw new Error('nijedna datoteka nije prepoznata kao kôd — put ili popis nastavaka su se slomili');
  if (!nalazi.length) throw new Error('nijedan udaljeni specifikator — regex ili put su se slomili');
});

test('svaka datoteka s diska je ili SKENIRANA ili imenovana s razlogom', () => {
  if (neprepoznate.length) {
    throw new Error('nepoznat nastavak — dodaj u KOD (ako nosi uvoze) ili u NE_SKENIRA_SE s razlogom:\n'
      + neprepoznate.map((f) => '        ' + rel(f)).join('\n'));
  }
});

// ČEGRTALJKA S IMENIMA — danas PRAZNA, i to je ishod, ne propust.
//
// Pri prvom pokretanju (22.09.) ova je brana našla TRI prava kršenja pravila #9
// (`jsr:@supabase/supabase-js@2` = raspon glavne verzije, koji Deno razrješava pri DEPLOYU, iz
// mreže, bez lockfilea). Stajala su ovdje imenovana dok Leon nije presudio da se popravljaju
// zasebnom ciglom s redeployom — i tada su popravljena (pin na `2.117.0`).
//
// ⚠️ Da popis nije imao drugu stranu, ovo bi se tiho pretvorilo u dopuštenje koje nitko ne čita.
// Ovako je uklanjanje bilo PRISILJENO: čim su pinovi postali točni, tvrdnja o mrtvim unosima je
// pala i imenovala sva tri retka. Prazna osnovica sad znači „nema duga", a ne „nitko nije gledao".
const OSNOVICA = [];
const kljuc = (n) => `${n.datoteka}|${n.spec}`;

test('svaki udaljeni specifikator je pinan TOČNO (pravilo #9: `^` je zabranjen)', () => {
  const dopusteni = new Set(OSNOVICA.map(kljuc));
  const losi = nalazi.map((n) => ({ ...n, sud: tocanPin(n.spec) }))
    .filter((n) => !n.sud.ok && !dopusteni.has(kljuc(n)));
  if (losi.length) {
    throw new Error('raspon umjesto točnog pina:\n' + losi
      .map((n) => `        ${n.datoteka}: ${n.spec}  → ${n.sud.zasto}`).join('\n'));
  }
});

test('osnovica nema MRTVIH unosa — popravljeno kršenje mora se maknuti s popisa', () => {
  const stvarni = new Set(nalazi.filter((n) => !tocanPin(n.spec).ok).map(kljuc));
  const mrtvi = OSNOVICA.filter((o) => !stvarni.has(kljuc(o)));
  if (mrtvi.length) {
    throw new Error('u osnovici, a više nije kršenje (makni unos):\n' + mrtvi
      .map((o) => `        ${o.datoteka}: ${o.spec}`).join('\n'));
  }
});

// ⚠️ OVA TVRDNJA GLEDA I OSNOVICU, i to je cijela njezina svrha. Sve ostalo `tocanPin` već obara;
// jedino što osnovica izuzima jest ono što bi ova ulovila. Osnovica je zapis duga — a pomična
// oznaka nije dug nego odricanje od verzije, pa se NE SMIJE izuzeti ni imenovano.
test('nijedan specifikator nije POMIČNA OZNAKA — ni u osnovici', () => {
  const losi = nalazi.map((n) => ({ ...n, s: sud(n.spec) })).filter((n) => n.s.vrsta === 'pomicna');
  if (losi.length) {
    throw new Error('pomična oznaka (vrijedi i za unose u osnovici):\n' + losi
      .map((n) => `        ${n.datoteka}: ${n.spec}  → ${n.s.zasto}`).join('\n'));
  }
});

console.log(`\n${failed === 0 ? '✅' : '❌'} edge-pinovi: ${passed} prošlo, ${failed} palo\n`);
process.exit(failed ? 1 : 0);
