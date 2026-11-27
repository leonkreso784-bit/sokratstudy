/* eslint-disable no-console */
// ===== Gate: rewrite javne adrese `/mcp` (F6 ①/4b) =====
// Usage: node scripts/check-mcp-rewrite.js                     (npm run check:mcp-rewrite — offline)
//        node scripts/check-mcp-rewrite.js --zivo <adresa>      (adresa koja MORA imati pravilo)
//        node scripts/check-mcp-rewrite.js --kontrola <adresa>  (adresa koja ga MORA NEMATI)
//        …  --share "<adresa>/?_vercel_share=…"                 (kroz Vercelovu zaštitu)
//
// ⚠️ ULOGA SE ZADAJE, NE IZVODI. `--zivo` pada ako pravila nema, `--kontrola` pada ako ga ima.
//    Prije je brana ulogu birala sama iz `vercel.json`, pa se tipfeler u adresi (ili preimenovana
//    grana) tiho pretvarao u „zelenu kontrolu": izmjereno je da je host koji NIKAD NIJE POSTOJAO
//    dao ispis znak po znak isti kao ispravna kontrola, uz EXIT 0.
// ⚠️ Vercel drži SAMO JEDAN aktivan share-token — novi poništava prethodni, pa se mjeri jedan
//    host po jedan i token se osvježava prije svake vrtnje. Sa zastarjelim tokenom brana vrati
//    izlaz **2** („nisam mogao izmjeriti"), ne lažno zeleno.
//
// ─── KAKO PROĆI KROZ VERCELOVU ZAŠTITU (projekt ima `ssoProtection`) ───────────────────────────
// Dva puta, oba podržana: ① TRAJNO — `VERCEL_AUTOMATION_BYPASS_SECRET` u `.env` (Vercel → Project
// → Settings → Deployment Protection → Protection Bypass for Automation); šalje se kao zaglavlje.
// ② JEDNOKRATNO — share-poveznica koju Vercel izda na 23 h (`?_vercel_share=…`): `--share` ju
// posjeti, pokupi kolačić `_vercel_jwt` kroz preusmjeravanja (`fetch` ih ne pamti sam) i nosi ga
// dalje. Propusnica ide SAMO prema našoj adresi, nikad prema Supabaseu.
//
// ─── KONTROLA KOJA OVU MJERU ČINI UZROČNOM (izmjereno 23.09.) ──────────────────────────────────
// Zeleno na jednoj adresi ne dokazuje da ga radi rewrite. Zato se mjeri ISTI deployment na DVA
// hosta: alias grane (ima pravilo) → Z1–Z7 zeleno, cijeli lanac otkrivanja radi; alias pojedinog
// deploya (nema pravilo) → `/mcp` je **404**. Razliku radi host-uvjet, ne nešto drugo.
//
// ─── ŠTO JE OVDJE NA KOCKI ──────────────────────────────────────────────────────────────────────
// Korisnikov AI prvi zahtjev šalje BEZ tokena i tek iz odgovora 401 sazna GDJE je prijava:
// `WWW-Authenticate: Bearer resource_metadata="<resource>/oauth-protected-resource"` (RFC 9728).
// Izmjereno u izvoru `@supabase/server@1.7.0` (22.–23.09.): ta se adresa gradi kao `resource` +
// sufiks, a ruta se hvata po SUFIKSU PUTA, na bilo kojoj dubini. Posljedica koja opravdava ovu
// branu: rewrite koji pokriva samo `/mcp`, a ne i `/mcp/*`, ostavlja putokaz koji vodi u 404 —
// konektor se tada ne može ni prijaviti, a `/mcp` pritom uredno odgovara i sve izgleda ispravno.
//
// ─── ZAŠTO SIMULACIJA, A NE ČITANJE KLJUČEVA ────────────────────────────────────────────────────
// „`vercel.json` ima ključ `rewrites`" ne tvrdi ništa o tome kamo zahtjev stvarno ode. Zato se
// routing OVDJE IZVODI: za svaki (host, put) traži se pravilo koje ga hvata i sudi se ref na koji
// vodi. Oblik `source`-a ili `has`-a koji ova brana ne zna suditi je PAD, ne preskok — inače bi
// nepoznat oblik prolazio kao „nema nalaza", što je isti razred greške kao prolaz na nuli.
//
// ─── ZAŠTO `has.value` NE SMIJE BITI GOLI STRING ────────────────────────────────────────────────
// U Vercelovoj shemi (`openapi.vercel.sh/vercel.json`, provjereno 23.09.) `has[].value` je ILI
// objekt (`{eq: …}`) ILI **regularni izraz**. Goli `"www.sokratstudy.com"` je dakle regex bez
// sidara: točka hvata bilo koji znak — pa ga zadovoljava i `www-sokratstudy-com.napadac.example`.
// Kontrolni host u `BEZ_REWRITEA` postoji točno zato da ta razlika ima svoje crveno.
//
// ─── ZAŠTO NEMA CATCH-ALLA (Leonova odluka 23.09.) ──────────────────────────────────────────────
// Prvo pravilo je glasilo „www → produkcija, SVE ostalo → staging". Mjerenje ga je oborilo:
// projekt ima PRODUKCIJSKE `.vercel.app` aliase koji nisu `www` — `studymaster-leon-kresos-
// projects.vercel.app` i `studymaster-git-main-…` — pa bi ih to pravilo poslalo u TEST-BAZU.
// Zato su hostovi IMENOVANI, a nepoznat host ne dobiva rewrite i ostaje 404: pada zatvoreno.
// ⚠️ Prva zamjena je imala ISTI kvar: preview-regex `^studymaster-[a-z0-9-]+\.vercel\.app$`
// hvatao je oba ta aliasa, a tablice niže su to propustile jer su koristile IZMIŠLJEN tim-slug.
// Otud pravilo: imena okruženja se prepisuju IZ PLATFORME, ne iz sjećanja (vidi `DOSEG.provjereno`).
//
// ─── GRANICA KOJU OVA BRANA NE MJERI (imenovano, ne prešućeno) ──────────────────────────────────
// 1. Sufiks `/oauth-protected-resource` dolazi iz tuđeg paketa koji NIJE naša ovisnost (Deno ga
//    povlači pri deployu), pa ga offline ne možemo nabrojati iz izvora — stoji kao konstanta s
//    razlogom. Mjeri ga `--zivo`, protiv stvarnog poslužitelja.
// 2. Podudara li Vercel `has.type=host` točno onako kako ovdje simuliram — to offline ne može
//    dokazati nijedna tvrdnja. Zato `--zivo` postoji i zato je preview dio cigle, a ne ukras.

try { require('dotenv').config(); } catch (e) { /* dotenv je neobavezan */ }

const fs = require('fs');
const path = require('path');

const { PROJEKTI } = require('./deploy-function.js');
const { expectedSlugs } = require('./check-edge-functions.js');

const ROOT = path.join(__dirname, '..');
const VERCEL = path.join(ROOT, 'vercel.json');

/** Sufiks na kojem `@supabase/server` poslužuje RFC 9728 dokument. Vidi granicu 1 u zaglavlju. */
const METAPODACI = '/oauth-protected-resource';

/**
 * Javne adrese koje izlažemo i projekt koji iza njih stoji.
 *
 * ⚠️ Hostovi su PREPISANI IZ VERCELOVOG POPISA DOMENA projekta `studymaster` (provjereno 23.09.
 * kroz Vercel API), ne izmišljeni. Prva verzija ove brane koristila je izmišljen tim-slug i zato
 * je propustila pravi kvar: preview-regex `^studymaster-[a-z0-9-]+\.vercel\.app$` hvatao je i
 * `studymaster-leon-kresos-projects.vercel.app` (PRODUKCIJSKI alias) i
 * `studymaster-git-main-…` (alias grane `main`) — dakle dvije PRODUKCIJSKE adrese išle bi na
 * STAGING. To je točno onaj kvar zbog kojeg je catch-all i odbačen, samo u drugom obliku.
 */
const USMJERENJE = [
  {
    host: 'www.sokratstudy.com',
    projekt: 'prod',
    zasto: 'jedina prava adresa platforme; `mcp` ondje živi tek od F7',
  },
  {
    host: 'studymaster-git-feat-f6-mcp-leon-kresos-projects.vercel.app',
    projekt: 'staging',
    zasto: 'preview GRANE ZNAČAJKE — jedini `.vercel.app` oblik koji nikad nije produkcija',
  },
];

/**
 * Hostovi koji NE SMIJU dobiti rewrite. Ovo je tvrdnja da pravilo pada ZATVORENO.
 * Prva tri su STVARNE adrese ovog projekta (Vercel `project.domains`, 23.09.).
 */
const BEZ_REWRITEA = [
  {
    host: 'studymaster-leon-kresos-projects.vercel.app',
    zasto: 'PRODUKCIJSKI `.vercel.app` alias ovog projekta — nije `www`, pa bi ga široko '
      + 'pisan preview-obrazac poslao u TEST-BAZU (taj je kvar stvarno postojao 23.09.)',
  },
  {
    host: 'studymaster-git-main-leon-kresos-projects.vercel.app',
    zasto: 'alias grane `main` = produkcijski deploy; isti kvar kao gore',
  },
  {
    host: 'sokratstudy.com',
    zasto: 'apex; Vercel ga 307-a na `www` prije routinga (izmjereno), pa ovdje nema što raditi',
  },
  {
    host: 'studymaster-7u2uoqad9-leon-kresos-projects.vercel.app',
    zasto: 'alias POJEDINOG deploya — svjesno NIJE pokriven: ne da se razlikovati od '
      + 'produkcijskog aliasa bez pogleda unaprijed, a alias grane je stabilan i dovoljan za mjeru',
  },
  {
    host: 'www-sokratstudy-com.napadac.example',
    zasto: 'KONTROLA za goli string u `has.value`: kao regex bez sidara zadovoljio bi ga i ovaj host',
  },
];

/**
 * Čegrtaljka na dosegu (kalup: `check:final`). Broj tvrdnji koje prolaz MORA izvesti.
 * Bez nje tvrdnja koja tiho nestane (rani `return`, petlja koja ne uđe) spušta ukupno,
 * a ljuska i dalje vidi ✅ — isti razred kao `note()` koji ne diže brojač u `mcp-brava-check.js`.
 */
const OCEKIVANO_OFFLINE = 8;
const OCEKIVANO_ZIVO = 7;
const OCEKIVANO_KONTROLA = 2;

/**
 * Čegrtaljka na DOSEGU (T7), odvojena od čegrtaljke na broju tvrdnji.
 *
 * ⚠️ NALAZ REVIZIJE 23.09.: `USMJERENJE = []` i `BEZ_REWRITEA = []` davali su
 * „✓ T5 (0 × 2 puta)" i „✓ T6 (0 × 2 puta)" uz **EXIT 0**. Brojač TVRDNJI to ne hvata — tvrdnji
 * je i dalje sedam, samo ne mjere ništa. Doseg zato ima vlastitu tvrdnju.
 * `provjereno` stoji jer su hostovi prepisani iz Vercelovog popisa domena RUKOM: popis se ne
 * nabraja sam, pa uz njega ide datum kad je zadnji put uspoređen sa stvarnošću.
 */
const DOSEG = { usmjerenje: 2, bezRewritea: 5, provjereno: '2026-09-23' };

/**
 * Izlaz koji NE OBARA PROCES.
 *
 * ⚠️ IZMJERENO 23.09.: `process.exit()` dok undici još drži keep-alive vezu obori Node na Windowsu
 * (`Assertion failed: !(handle->flags & UV_HANDLE_CLOSING)`), a ljuska tada vidi **127** umjesto
 * 0/1/2 — uredno palo mjerenje prijavi se kao pad alata. **Brana koja laže o izlaznom kodu gora je
 * od rupe** (isti razred kao `catch` koji izlazi s nulom). Zato: zatvori globalni dispatcher,
 * postavi `exitCode` i pusti proces da završi sam. Tajmer je `unref`-an pa ne drži petlju; ako ju
 * nešto ipak drži, izađe s ISPRAVNIM kodom umjesto da visi.
 */
function izadji(kod) {
  process.exitCode = kod;
  try {
    const d = globalThis[Symbol.for('undici.globalDispatcher.1')];
    if (d && typeof d.close === 'function') d.close().catch(() => {});
  } catch (_e) { /* nije undici — nema što zatvoriti */ }
  setTimeout(() => process.exit(kod), 3000).unref();
}

const nalazi = [];
let izmjereno = 0;
let zadnjiResurs = '';   // adresa metapodataka koju je poslužitelj oglasio (za pošten ispis dosega)
function tvrdi(ime, ok, poruka) {
  izmjereno++;
  if (ok) { console.log(`  ✓ ${ime}`); return true; }
  nalazi.push(`${ime} — ${poruka}`);
  console.log(`  ✗ ${ime} — ${poruka}`);
  return false;
}

// ── Vercelov `source` → mjera koja zna reći hvata li put ────────────────────────────────────────
// Poznajemo dva oblika: doslovan put i doslovan put + `/:ime*`. `*` znači „nula ili više
// segmenata", pa `/mcp/:put*` hvata i goli `/mcp`. Sve ostalo vraća `null` = ne znam suditi.
function izvorUMjeru(source) {
  const m = String(source).match(/^((?:\/[A-Za-z0-9_.-]+)+)(\/:([A-Za-z][A-Za-z0-9_]*)\*)?$/);
  if (!m) return null;
  const baza = m[1];
  const zvijezda = Boolean(m[2]);
  return {
    baza,
    zvijezda,
    // Rep koji `destination` MORA nositi da parametar stvarno završi u putu (vidi `refOd`).
    ocekivaniRep: zvijezda ? `/:${m[3]}*` : '',
    pogada(put) {
      if (put === baza) return true;
      if (!zvijezda) return false;
      return put.startsWith(baza + '/');
    },
  };
}

/** `true`/`false` = sud, `null` = oblik koji ne znam suditi (pada zatvoreno kod pozivatelja). */
function hostPogada(uvjet, host) {
  if (!uvjet || uvjet.type !== 'host') return null;
  const v = uvjet.value;
  if (v && typeof v === 'object') return typeof v.eq === 'string' ? v.eq === host : null;
  if (typeof v === 'string') { try { return new RegExp(v).test(host); } catch (_e) { return null; } }
  return null;
}

/** Izvedi routing: vrati pravilo koje hvata (host, put), ili `null`, ili grešku suđenja. */
function usmjeri(pravila, host, put) {
  for (const p of pravila) {
    const mjera = izvorUMjeru(p.source);
    if (!mjera) return { greska: `ne znam suditi \`source\`: ${JSON.stringify(p.source)}` };
    if (!mjera.pogada(put)) continue;
    let svi = true;
    for (const u of p.has || []) {
      const r = hostPogada(u, host);
      if (r === null) return { greska: `ne znam suditi \`has\`: ${JSON.stringify(u)}` };
      if (!r) { svi = false; break; }
    }
    if (svi) return { pravilo: p };
  }
  return { pravilo: null };
}

/**
 * Razloži `destination` na ref, slug i **REP** (sve iza sluga).
 *
 * ⚠️ NALAZ REVIZIJE 23.09.: prva verzija je regex završavala **bez `$`** i rep BACALA — pa je
 * `…/functions/v1/mcp` uz `source: "/mcp/:put*"` prolazila **zeleno, 7 ✓**. Vercel neiskorišten
 * parametar ne stavlja u put nego ga zalijepi kao upit, a `@supabase/server` rutu metapodataka
 * hvata **po putu** → `/mcp/oauth-protected-resource` prestaje posluživati RFC 9728 dokument,
 * dok `/mcp` i dalje uredno odgovara. To je **doslovno kvar zbog kojeg cigla postoji**, a brana
 * ga je previđala jer je mjerila DEFINICIJU (`source` spominje podput), ne POSLJEDICU.
 */
function refOd(destination) {
  const m = String(destination).match(/^https:\/\/([a-z0-9]+)\.supabase\.co\/functions\/v1\/([A-Za-z0-9_-]+)(.*)$/);
  return m ? { ref: m[1], slug: m[2], rep: m[3] || '' } : null;
}

function imeProjekta(ref) {
  const k = Object.keys(PROJEKTI).find((n) => PROJEKTI[n].ref === ref);
  return k || null;
}

function kljuceviStabla(v, put, van) {
  if (!v || typeof v !== 'object') return;
  if (Array.isArray(v)) { v.forEach((x, i) => kljuceviStabla(x, `${put}[${i}]`, van)); return; }
  for (const k of Object.keys(v)) { van.push({ k, put: `${put}.${k}` }); kljuceviStabla(v[k], `${put}.${k}`, van); }
}

// ════════════════════════════════════════════════════════════════════════════════════════════════
function offline() {
  console.log('\n=== check:mcp-rewrite — javna adresa `/mcp` (vercel.json) ===\n');

  const sirovo = fs.readFileSync(VERCEL, 'utf8');
  let vercel;
  try { vercel = JSON.parse(sirovo); } catch (e) {
    console.log(`  ✗ vercel.json nije valjan JSON — ${e.message}`);
    return 1;
  }

  // ── T1: bez komentar-ključeva (ruše schema-validaciju PRIJE builda; CLAUDE pravilo #7) ────────
  const sviKljucevi = [];
  kljuceviStabla(vercel, '$', sviKljucevi);
  const komentari = sviKljucevi.filter((x) => /^(\/\/|#)/.test(x.k));
  tvrdi('T1 vercel.json bez komentar-ključeva',
    komentari.length === 0,
    `nađeni: ${komentari.map((x) => x.put).join(', ')} — Vercel na njima pada prije builda`);

  const pravila = Array.isArray(vercel.rewrites) ? vercel.rewrites : [];

  // ── T0: doseg. Nula pravila nije uspjeh. ──────────────────────────────────────────────────────
  tvrdi('T0 ima rewrite pravila za suđenje',
    pravila.length > 0,
    'vercel.json nema nijedan `rewrites` unos — javna adresa /mcp ne postoji');
  if (!pravila.length) return 1;

  // ── T2: svaki `destination` vodi na POZNAT projekt i na funkciju koja postoji NA DISKU ────────
  const naDisku = expectedSlugs();
  const t2loše = [];
  for (const p of pravila) {
    const d = refOd(p.destination);
    if (!d) { t2loše.push(`destination nije Supabase funkcija: ${p.destination}`); continue; }
    if (!imeProjekta(d.ref)) { t2loše.push(`nepoznat ref \`${d.ref}\` u ${p.destination}`); continue; }
    if (naDisku.indexOf(d.slug) === -1) { t2loše.push(`gađa \`${d.slug}\`, koje nema u supabase/functions/ (mrtav unos)`); continue; }
    // ⚠️ Rep se sudi, ne baca (vidi `refOd`): parametar iz `source`-a mora završiti U PUTU.
    const mjera = izvorUMjeru(p.source);
    if (!mjera) { t2loše.push(`ne znam suditi \`source\`: ${JSON.stringify(p.source)}`); continue; }
    if (d.rep !== mjera.ocekivaniRep) {
      t2loše.push(`\`${p.source}\` → destination završava ${JSON.stringify(d.rep)}, a mora `
        + `${JSON.stringify(mjera.ocekivaniRep)} — inače Vercel parametar zalijepi kao UPIT i podput `
        + 'nikad ne stigne do funkcije');
    }
  }
  tvrdi('T2 destination = poznat projekt + funkcija s diska + ISPRAVAN REP',
    t2loše.length === 0, t2loše.join(' · '));

  // ── T3: `has.value` nikad goli NEUSIDREN string (vidi zaglavlje) ──────────────────────────────
  let t3 = true; const t3loše = [];
  for (const p of pravila) {
    for (const u of p.has || []) {
      if (typeof u.value === 'string' && !(u.value.startsWith('^') && u.value.endsWith('$'))) {
        t3 = false; t3loše.push(`${p.source} → ${JSON.stringify(u.value)}`);
      }
    }
  }
  tvrdi('T3 host-uvjet je `{eq}` ili USIDREN regex', t3,
    `neusidreno: ${t3loše.join(', ')} — kao regex hvata i tuđe hostove`);

  // ── T4: par je potpun — svaki (uvjet, baza) ima i golo i podput pravilo, na ISTI ref ──────────
  // Popis se NE piše rukom: grupira se ono što u datoteci stvarno piše.
  const grupe = new Map();
  for (const p of pravila) {
    const mjera = izvorUMjeru(p.source);
    if (!mjera) continue;
    const kljuc = JSON.stringify(p.has || []) + '|' + mjera.baza;
    if (!grupe.has(kljuc)) grupe.set(kljuc, { baza: mjera.baza, golo: null, podput: null });
    const g = grupe.get(kljuc);
    if (mjera.zvijezda) g.podput = p; else g.golo = p;
  }
  let t4 = true; const t4loše = [];
  for (const [, g] of grupe) {
    if (!g.golo) { t4 = false; t4loše.push(`${g.baza}: nema golo pravilo`); continue; }
    if (!g.podput) { t4 = false; t4loše.push(`${g.baza}: nema podput pravilo (\`${g.baza}${METAPODACI}\` bi 404-ao → otkrivanje prijave staje)`); continue; }
    const a = refOd(g.golo.destination); const b = refOd(g.podput.destination);
    if (!a || !b) { t4 = false; t4loše.push(`${g.baza}: destination se ne da razložiti`); continue; }
    if (a.ref !== b.ref) { t4 = false; t4loše.push(`${g.baza}: golo i podput vode na RAZLIČITE projekte`); continue; }
    // ⚠️ „Isti projekt" NIJE „ista funkcija" (nalaz revizije 23.09.): podput preusmjeren na
    // `delete-account` ima isti ref i prolazio bi zeleno, a promet s MCP podputova išao bi u
    // funkciju za brisanje računa.
    if (a.slug !== b.slug) {
      t4 = false;
      t4loše.push(`${g.baza}: golo ide na \`${a.slug}\`, a podput na \`${b.slug}\` — ista baza, DRUGA funkcija`);
    }
  }
  tvrdi(`T4 svaki par je potpun i na istoj FUNKCIJI (grupa: ${grupe.size})`, t4, t4loše.join(' · '));

  // ── T5: usmjerenje — imenovani host završi na očekivanom projektu, i na golom putu i na podputu
  let t5 = true; const t5loše = [];
  for (const u of USMJERENJE) {
    for (const put of ['/mcp', '/mcp' + METAPODACI]) {
      const r = usmjeri(pravila, u.host, put);
      if (r.greska) { t5 = false; t5loše.push(`${u.host}${put}: ${r.greska}`); continue; }
      if (!r.pravilo) { t5 = false; t5loše.push(`${u.host}${put}: nijedno pravilo ne hvata`); continue; }
      const d = refOd(r.pravilo.destination);
      const ocekivan = PROJEKTI[u.projekt] && PROJEKTI[u.projekt].ref;
      if (!d || d.ref !== ocekivan) {
        t5 = false;
        t5loše.push(`${u.host}${put}: vodi na \`${d ? d.ref : '?'}\`, a mora na \`${ocekivan}\` (${u.projekt})`);
      }
    }
  }
  tvrdi(`T5 imenovani hostovi idu na svoj projekt (${USMJERENJE.length} × 2 puta)`, t5, t5loše.join(' · '));

  // ── T6: PADA ZATVORENO — nepoznat host ne smije dobiti nijedan rewrite ────────────────────────
  let t6 = true; const t6loše = [];
  for (const b of BEZ_REWRITEA) {
    for (const put of ['/mcp', '/mcp' + METAPODACI]) {
      const r = usmjeri(pravila, b.host, put);
      if (r.greska) { t6 = false; t6loše.push(`${b.host}${put}: ${r.greska}`); continue; }
      if (r.pravilo) {
        const d = refOd(r.pravilo.destination);
        t6 = false;
        t6loše.push(`${b.host}${put} → \`${d ? d.ref : '?'}\` (${b.zasto})`);
      }
    }
  }
  tvrdi(`T6 nepoznat host ne dobiva rewrite (${BEZ_REWRITEA.length} × 2 puta)`, t6, t6loše.join(' · '));

  // ── T7: DOSEG — prazan popis ne smije prolaziti (vidi `DOSEG`) ────────────────────────────────
  const t7loše = [];
  if (USMJERENJE.length < DOSEG.usmjerenje) {
    t7loše.push(`USMJERENJE ima ${USMJERENJE.length} hostova, a mora bar ${DOSEG.usmjerenje} — T5 na praznom popisu prolazi ne mjereći ništa`);
  }
  if (BEZ_REWRITEA.length < DOSEG.bezRewritea) {
    t7loše.push(`BEZ_REWRITEA ima ${BEZ_REWRITEA.length} hostova, a mora bar ${DOSEG.bezRewritea} — T6 je jedina koja čuva „pada zatvoreno"`);
  }
  if (!Array.from(grupe.values()).some((g) => g.baza === '/mcp')) {
    t7loše.push('nijedna grupa pravila nema bazu `/mcp` — a cigla postoji zbog nje (T4 na nula grupa prolazi)');
  }
  tvrdi(`T7 doseg popisa + postoji grupa za \`/mcp\` (hostovi provjereni ${DOSEG.provjereno})`,
    t7loše.length === 0, t7loše.join(' · '));

  console.log(`\n  dotaknuto: ${pravila.length} rewrite pravila · ${grupe.size} parova · `
    + `${(USMJERENJE.length + BEZ_REWRITEA.length) * 2} (host, put) slučajeva · ${izmjereno} tvrdnji`);
  if (izmjereno !== OCEKIVANO_OFFLINE) {
    nalazi.push(`doseg: izvedeno ${izmjereno} tvrdnji, a očekivano ${OCEKIVANO_OFFLINE}`);
    console.log(`  ✗ ČEGRTALJKA — izvedeno ${izmjereno} tvrdnji, očekivano ${OCEKIVANO_OFFLINE};`
      + ' tvrdnja je nestala ili je dodana bez podizanja osnovice');
  }
  console.log('  ⓘ podudaranje hosta kako ga Vercel STVARNO radi mjeri `--zivo` na previewu.\n');
  return nalazi.length ? 1 : 0;
}

/**
 * Potpis VERCELOVE zaštite deploya (SSO), koja odgovara SAMA — prije našeg rewritea.
 *
 * ⚠️ POVOD (izmjereno 23.09., i oborilo dvije moje tvrdnje): projekt ima `ssoProtection` s
 * dosegom `all_except_custom_domains`, pa svaki `.vercel.app` host vraća **401 na `/mcp`** i
 * **302 na `/`** — a taj 401 izgleda isto kao ispravan 401 iz funkcije. Prva verzija ove brane
 * je zbog toga imala DVA lažna zelena: Z1 je prošao jer `fetch` slijedi preusmjeravanja pa je
 * izmjerio VERCELOVU STRANICU ZA PRIJAVU (200), a Z2 je prihvatio zaštitni 401 kao svoj.
 * Zaštićen deploy se NE MOŽE izmjeriti — to je izlaz **2** („nisam mogao"), ne 1 („pokvareno je").
 */
function vercelovaZastita(res) {
  const sc = String(res.headers.get('set-cookie') || '');
  const loc = String(res.headers.get('location') || '');
  if (/_vercel_sso_nonce|_vercel_jwt/.test(sc)) return 'odgovor nosi Vercelov SSO kolačić';
  if (/vercel\.com\/(sso-api|login)/.test(loc)) return `preusmjerava na Vercelovu prijavu (${loc.slice(0, 60)}…)`;
  return null;
}

/**
 * Tajna kojom se preskače Vercelova zaštita deploya („Protection Bypass for Automation").
 * Stoji u `.env` (gitignoran), NIKAD u repozitoriju. Bez nje se preview ne može izmjeriti.
 */
const BYPASS = process.env.VERCEL_AUTOMATION_BYPASS_SECRET || '';

/**
 * Drugi put kroz zaštitu: **share-poveznica** (`?_vercel_share=…`), koju Vercel izda na 23 h.
 * Ona pri preusmjeravanju postavi kolačić `_vercel_jwt`. Koristi se za JEDNOKRATNU mjeru kad
 * trajne bypass-tajne nema; `fetch` kolačiće NE pamti sam, pa ih skupljamo ručno kroz hopove.
 */
let KOLACIC = process.env.VERCEL_SHARE_COOKIE || '';

/**
 * Je li `url` STVARNO na istom hostu kao `baza`.
 *
 * ⚠️ NALAZ REVIZIJE 23.09. (sigurnosni): prije je ovdje stajalo `String(url).startsWith(baza)`,
 * a to odgovara na krivo pitanje — „počinje li isto", umjesto „je li isti host". Dokazano:
 *   `https://<baza>@zloban.example/x`      → startsWith = true, stvarni host = `zloban.example`
 *   `https://<baza>.zloban.example/x`      → startsWith = true, stvarni host = poddomena napadača
 * Jedini URL koji se ovdje ne gradi lokalno je `resource_metadata` IZ ODGOVORA mjerenog
 * poslužitelja — dakle tko kontrolira taj odgovor, kontrolirao bi i kamo ide naša propusnica.
 */
function istiHost(url, baza) {
  try {
    const a = new URL(url); const b = new URL(baza);
    return a.protocol === 'https:' && a.host === b.host;
  } catch (_e) { return false; }
}

/**
 * Share-poveznica (`?_vercel_share=…`) pri preusmjeravanju postavi kolačić `_vercel_jwt`.
 * `fetch` kolačiće ne pamti, pa ih skupljamo ručno — ali **samo na hostu koji ih je postavio**:
 * prije je ova petlja slijepo slala skupljene kolačiće SVAKOM sljedećem hopu, kamo god `location`
 * vodi. Kolačić se šalje hostu koji ga je postavio, i nikome drugom (nalaz revizije 23.09.).
 */
async function kolacicIzShare(shareUrl) {
  const polazni = new URL(shareUrl);
  let url = shareUrl;
  const jar = new Map();
  for (let i = 0; i < 6; i++) {
    if (!istiHost(url, polazni.origin)) {
      throw new Error(`share-poveznica vodi na TUĐI host (${new URL(url).host}) — ne nosim kolačić dalje`);
    }
    const h = jar.size ? { cookie: [...jar].map(([k, v]) => `${k}=${v}`).join('; ') } : {};
    const r = await fetch(url, { redirect: 'manual', headers: h });
    try { await r.text(); } catch (_e) { /* tijelo se mora potrositi, v. `zahtjev` */ }
    const sve = typeof r.headers.getSetCookie === 'function' ? r.headers.getSetCookie() : [];
    for (const sc of sve) { const m = String(sc).match(/^([^=]+)=([^;]*)/); if (m) jar.set(m[1], m[2]); }
    const loc = r.headers.get('location');
    if (!loc) break;
    url = new URL(loc, url).toString();
  }
  return [...jar].map(([k, v]) => `${k}=${v}`).join('; ');
}

/**
 * Zahtjev prema NAŠOJ adresi nosi propusnicu; prema svakoj drugoj ne — ne rasipa se.
 *
 * ⚠️ TIJELO SE UVIJEK PROČITA, i to nije urednost nego ISPRAVNOST IZLAZNOG KODA (izmjereno
 * 23.09.): nepročitano tijelo drži utičnicu otvorenom, a `izadji()` nad otvorenom
 * utičnicom na Windowsu obori proces libuv-tvrdnjom — izlaz tada postane **127**, a mjerenja
 * koja su uredno pala prijave se kao pad alata. Brana koja laže o izlaznom kodu gora je od rupe.
 */
async function zahtjev(url, baza, opts) {
  const o = Object.assign({ redirect: 'manual' }, opts || {});
  if (istiHost(url, baza)) {
    const dodatno = {};
    if (BYPASS) dodatno['x-vercel-protection-bypass'] = BYPASS;
    if (KOLACIC) dodatno.cookie = KOLACIC;
    o.headers = Object.assign({}, o.headers, dodatno);
  }
  const r = await fetch(url, o);
  let tekst = '';
  try { tekst = await r.text(); } catch (_e) { tekst = ''; }
  return {
    status: r.status,
    headers: r.headers,
    tekst,
    json() { try { return JSON.parse(tekst); } catch (_e) { return null; } },
  };
}

// ════════════════════════════════════════════════════════════════════════════════════════════════
/** Biljeg po kojem se prepoznaje NAŠA aplikacija — čita se s diska, ne prepisuje rukom. */
function bilijegAplikacije() {
  try {
    const m = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').match(/<title>([^<]+)<\/title>/);
    return m ? m[1].trim() : null;
  } catch (_e) { return null; }
}

async function zivo(baza, kontrola) {
  console.log(`\n=== check:mcp-rewrite ${kontrola ? '--kontrola' : '--zivo'} — ${baza} ===`);
  console.log(`    propusnica kroz zaštitu: ${BYPASS ? 'bypass-tajna iz .env' : (KOLACIC ? 'share-kolačić (privremen)' : 'NEMA je')}\n`);
  const host = new URL(baza).hostname;
  const pravila = JSON.parse(fs.readFileSync(VERCEL, 'utf8')).rewrites || [];

  // Očekivanje se IZVODI iz istih pravila — živa provjera i offline tablica ne mogu se raziće.
  const predvid = usmjeri(pravila, host, '/mcp');
  // Nalaz mora ući u `nalazi`, inače završni redak kaže „0 nalaza" uz izlaz 1 (revizija, N6).
  if (predvid.greska) { nalazi.push(predvid.greska); console.log(`  ✗ ${predvid.greska}`); return 1; }
  const d = predvid.pravilo ? refOd(predvid.pravilo.destination) : null;

  // ── Z0: je li adresa uopće MJERLJIVA ─────────────────────────────────────────────────────────
  // Prvi zahtjev služi i kao proba zaštite. Bez ove provjere zaštićen deploy daje 401 koji se
  // ne razlikuje od ispravnog, pa bi „konektor radi" bila tvrdnja o Vercelovoj prijavnoj stranici.
  const prvi = await zahtjev(baza + '/mcp', baza, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}',
  });
  const zastita = vercelovaZastita(prvi);
  if (zastita) {
    console.log(`  ⊘ DEPLOY JE ZAŠTIĆEN (${zastita}).`);
    console.log('     Vercelov SSO odgovara PRIJE rewritea, pa se kroz ovu adresu ne može izmjeriti');
    console.log('     ništa o našoj funkciji — njezin 401 i ovaj imaju isti broj.');
    if (BYPASS) {
      console.log('     ⚠️ Tajna JEST poslana, a zaštita je svejedno odgovorila → tajna je kriva,');
      console.log('        opozvana, ili nije „Protection Bypass for Automation" ovog projekta.');
    } else {
      console.log('     Dodaj `VERCEL_AUTOMATION_BYPASS_SECRET=…` u `.env` (Vercel → Project →');
      console.log('     Settings → Deployment Protection → Protection Bypass for Automation).');
    }
    console.log('     NIJE nalaz o kodu.\n');
    return 2;
  }

  // ── ULOGA SE ZADAJE, NE IZVODI ───────────────────────────────────────────────────────────────
  // ⚠️ NALAZ REVIZIJE 23.09.: prije je brana ulogu birala sama — ako pravila nema, tiho bi se
  // pretvorila u „kontrolu", izvela JEDNU tvrdnju i ispisala „✅ bez nalaza", EXIT 0. Dokazano
  // pokretanjem: `--zivo` na host koji NIKAD NIJE POSTOJAO dao je ispis **znak po znak isti** kao
  // zapisana kontrola. Tipfeler u adresi ili preimenovana grana time pretvore pozitivnu mjeru u
  // lažno zelenu kontrolu. Zato uloga sad dolazi izvana i **neslaganje je PAD**.
  if (kontrola && d) {
    console.log(`  ✗ --kontrola, a host \`${host}\` IMA pravilo (→ ${d.ref}) — to nije kontrola`);
    return 1;
  }
  if (!kontrola && !d) {
    console.log(`  ✗ --zivo, a za host \`${host}\` nijedno pravilo ne hvata — mjera nije izvediva`);
    console.log('     (ako je to namjerno, pokreni s `--kontrola`)');
    return 1;
  }

  if (kontrola) {
    console.log(`  ⓘ kontrola: za host \`${host}\` NEMA pravila → \`/mcp\` ne smije postojati.\n`);

    // ⚠️ K1 postoji jer 404 ima VIŠE uzroka: naš deploy bez host-pravila (željeno), nepostojeći
    // host, tuđi poslužitelj, ugašena domena. Bez tvrdnje da adresa uopće poslužuje NAŠU
    // aplikaciju, kontrola je samo „nešto je vratilo 404". Biljeg se čita S DISKA.
    const korijen = await zahtjev(baza + '/', baza);
    const tijelo = korijen.tekst;
    const biljeg = bilijegAplikacije();
    tvrdi('K1 adresa poslužuje NAŠU aplikaciju (inače 404 ne dokazuje ništa)',
      korijen.status === 200 && biljeg !== null && tijelo.indexOf(biljeg) !== -1,
      korijen.status !== 200 ? `GET / → ${korijen.status}` : `200, ali nema biljega ${JSON.stringify(biljeg)} iz index.html`);

    // ⚠️ K2 ne sudi goli broj, ali ni puko POSTOJANJE `x-vercel-error` — to je IZMJERENO 23.09.:
    //   nepostojeći host           → 404 `x-vercel-error: DEPLOYMENT_NOT_FOUND`  (loša kontrola)
    //   NAŠ deploy, nema te staze  → 404 `x-vercel-error: NOT_FOUND`             (upravo željeno)
    // Prva verzija ovog retka odbijala je svaki `x-vercel-error` i time bi dala LAŽNO CRVENO na
    // ispravnoj kontroli. Sudi se dakle UZROK: zabranjeno je samo ono na razini DEPLOYA.
    const vercelGreska = String(prvi.headers.get('x-vercel-error') || '');
    const hostaNema = /DEPLOYMENT_NOT_FOUND|DEPLOYMENT_DELETED|DEPLOYMENT_DISABLED|NOT_FOUND_DEPLOYMENT/i.test(vercelGreska);
    tvrdi('K2 `/mcp` je 404 IZ NAŠEG DEPLOYA (ne „hosta nema" s Vercelovog ulaza)',
      prvi.status === 404 && !hostaNema,
      prvi.status !== 404 ? `dobiven ${prvi.status}` : `404, ali host ne postoji: x-vercel-error=${vercelGreska}`);

    console.log(`\n  dotaknuto: ${izmjereno} tvrdnji protiv ${baza}`);
    if (izmjereno !== OCEKIVANO_KONTROLA) {
      nalazi.push(`doseg kontrole: izvedeno ${izmjereno}, očekivano ${OCEKIVANO_KONTROLA}`);
      console.log(`  ✗ ČEGRTALJKA — izvedeno ${izmjereno}, očekivano ${OCEKIVANO_KONTROLA}`);
    }
    console.log('');
    return nalazi.length ? 1 : 0;
  }

  console.log(`  ⓘ pravilo predviđa projekt \`${imeProjekta(d.ref)}\` (${d.ref})\n`);

  // Z1 — rewrite nije pojeo aplikaciju. `redirect: 'manual'` je OBAVEZAN: sa slijeđenjem je ova
  // tvrdnja jednom već prošla na Vercelovoj stranici za prijavu (200 od tuđeg dokumenta).
  const korijen = await zahtjev(baza + '/', baza);
  tvrdi('Z1 aplikacija se i dalje poslužuje na `/`', korijen.status === 200,
    `dobiven ${korijen.status}${korijen.headers.get('location') ? ' → ' + korijen.headers.get('location') : ''}`);

  // Z2/Z3 — prvi zahtjev bez tokena mora nositi putokaz.
  tvrdi('Z2 POST /mcp kroz našu adresu vraća 401', prvi.status === 401, `dobiven ${prvi.status}`);
  const wa = prvi.headers.get('www-authenticate') || '';
  const m = wa.match(/resource_metadata="([^"]+)"/i);
  tvrdi('Z3 401 nosi `WWW-Authenticate` s `resource_metadata`', Boolean(m),
    wa ? `zaglavlje je: ${wa}` : 'zaglavlja NEMA — tako izgleda 401 s gatewaya, ne iz funkcije');

  // Z4 — oglašeni dokument stvarno postoji i opisuje PREDVIĐENI projekt.
  // K/10 (17.11.): PRODUKCIJA ima `MCP_RESOURCE_URL` = naša javna adresa (`<baza>/mcp`), pa resurs
  // NE nosi ref; staging (preview) ga nema i oglašava Supabaseovu adresu s refom. Prihvaća se
  // TOČNO jedno od to dvoje — naša adresa mora biti baš `<baza>/mcp`, ne bilo što na našem hostu.
  // Da je resurs naš a projekt tuđi, pada Z6 (prijava na `/auth/v1` predviđenog refa).
  const opisujeNas = (resurs) => {
    const s = String(resurs || '').replace(/\/+$/, '');
    return s === baza.replace(/\/+$/, '') + '/mcp' || s.indexOf(d.ref) !== -1;
  };
  if (m) {
    zadnjiResurs = m[1];
    const meta = await zahtjev(m[1], baza);
    const ok = meta.status === 200;
    tvrdi('Z4 oglašeni `resource_metadata` vraća 200', ok, `${m[1]} → ${meta.status}`);
    if (ok) {
      const body = meta.json();
      tvrdi('Z5 metapodaci opisuju PREDVIĐENI projekt',
        opisujeNas(body.resource),
        `resource = ${body.resource}, a pravilo vodi na ${d.ref}`);
      tvrdi('Z6 prijava se šalje na `/auth/v1` istog projekta',
        (body.authorization_servers || []).some((s) => String(s) === `https://${d.ref}.supabase.co/auth/v1`),
        `authorization_servers = ${JSON.stringify(body.authorization_servers)}`);
    }
  }

  // Z7 — PODPUT kroz NAŠU domenu. Ovo je tvrdnja zbog koje cigla postoji.
  // ⚠️ Ne smije suditi SAMO HTTP broj (nalaz revizije 23.09.): 200 s bilo čim u tijelu — recimo
  // našim `index.html` — izgledao bi jednako. Tvrdi se da je to STVARNO RFC 9728 dokument.
  const pod = await zahtjev(baza + '/mcp' + METAPODACI, baza);
  let podTijelo = null;
  if (pod.status === 200) podTijelo = pod.json();
  tvrdi('Z7 podput `/mcp' + METAPODACI + '` vraća RFC 9728 dokument NAŠEG resursa',
    pod.status === 200 && podTijelo !== null && opisujeNas(podTijelo.resource),
    pod.status !== 200
      ? `dobiven ${pod.status} — rewrite ne pokriva podputove, pa otkrivanje prijave staje`
      : `200, ali tijelo nije dokument našeg resursa: ${JSON.stringify(podTijelo).slice(0, 140)}`);

  // ⚠️ POŠTENJE ISPISA (nalaz revizije 23.09.): „7/7" bi nadglasilo. NAŠU adresu dodiruju
  // Z1, Z2, Z3 i Z7; Z4–Z6 idu IZRAVNO na `*.supabase.co`, jer je `resource` danas Supabaseova
  // adresa (`MCP_RESOURCE_URL` je svjesno nepostavljen — flip je korak u F7). Dok je tako, lanac
  // otkrivanja poslije prvog skoka NAPUŠTA našu domenu, i to se mora vidjeti u ispisu.
  const metaHost = (() => { try { return new URL(String(zadnjiResurs || '')).host; } catch (_e) { return '?'; } })();
  console.log(`\n  dotaknuto: ${izmjereno} tvrdnji protiv ${baza}`);
  console.log(`  ⓘ kroz NAŠU adresu: Z1 Z2 Z3 Z7 · izravno na \`${metaHost}\`: Z4 Z5 Z6`);
  console.log('     (bez `MCP_RESOURCE_URL` — staging — resurs se oglašava Supabaseovom adresom)\n');
  if (izmjereno !== OCEKIVANO_ZIVO) {
    nalazi.push(`doseg: izvedeno ${izmjereno} živih tvrdnji, a očekivano ${OCEKIVANO_ZIVO}`);
    console.log(`  ✗ ČEGRTALJKA — izvedeno ${izmjereno}, očekivano ${OCEKIVANO_ZIVO}`);
  }
  return nalazi.length ? 1 : 0;
}

// ════════════════════════════════════════════════════════════════════════════════════════════════
(async () => {
  const args = process.argv.slice(2);
  // Uloga se ZADAJE: `--zivo` = ova adresa MORA imati pravilo · `--kontrola` = MORA ga nemati.
  // Prije je brana ulogu izvodila iz `vercel.json`, pa se promašena adresa tiho pretvarala u
  // „zelenu kontrolu" (nalaz revizije 23.09., dokazan pokretanjem).
  const iZ = args.indexOf('--zivo');
  const iK = args.indexOf('--kontrola');
  const i = iZ !== -1 ? iZ : iK;
  const kontrola = iZ === -1 && iK !== -1;
  let kod;
  if (i !== -1) {
    const baza = args[i + 1];
    if (!baza || !/^https?:\/\//.test(baza)) {
      console.error(`\n❌ \`${kontrola ? '--kontrola' : '--zivo'}\` traži adresu, npr. https://studymaster-git-….vercel.app\n`);
      return izadji(2);
    }
    // `--share <url>` uzme kolačić iz Vercelove privremene share-poveznice (23 h).
    const s = args.indexOf('--share');
    if (s !== -1 && args[s + 1]) {
      try {
        KOLACIC = await kolacicIzShare(args[s + 1]);
        if (!KOLACIC) { console.error('\n❌ share-poveznica nije vratila nijedan kolačić\n'); return izadji(2); }
      } catch (e) { console.error(`\n❌ share-poveznica nedostupna: ${e.message}\n`); return izadji(2); }
    }
    try { kod = await zivo(baza.replace(/\/+$/, ''), kontrola); } catch (e) {
      // Nedostupna mreža NIJE „čisto je" → izlaz 2. ⚠️ Ali parcijalan pad mreže NE SMIJE odbaciti
      // već nađene kvarove (nalaz revizije 23.09.; kalup `check-edge-functions.js`): „nisam mogao
      // izmjeriti" vrijedi samo ako dotad ništa nije palo.
      console.error(`\n⊘ prekid mjerenja: ${e.message}`);
      if (nalazi.length) {
        console.error(`   ⚠️ ali ${nalazi.length} nalaz(a) je već nađeno prije prekida — to ostaje kvar\n`);
        return izadji(1);
      }
      console.error('');
      return izadji(2);
    }
  } else {
    kod = offline();
  }

  if (kod === 0) { console.log('✅ check:mcp-rewrite — bez nalaza\n'); return izadji(0); }
  // 2 = „nisam mogao izmjeriti" i NIKAD se ne smije stopiti s 1 = „pokvareno je".
  if (kod === 2) { console.log('⊘ check:mcp-rewrite — nije izmjereno (vidi gore)\n'); return izadji(2); }
  console.log(`\n❌ check:mcp-rewrite — ${nalazi.length} nalaza\n`);
  return izadji(1);
})();
