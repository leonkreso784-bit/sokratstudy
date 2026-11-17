/* eslint-disable no-console */
// ===== Gate: Edge Functions na PRODUKCIJI (READ-ONLY, BEZ IJEDNOG KLJUČA) =====
// Usage: node scripts/check-edge-functions.js        (npm run check:functions)
//        CHECK_FUNCTIONS_URL=https://<ref>.supabase.co npm run check:functions   (npr. staging PRIJE prod-deploya)
//
// POVOD (2026-08-10): na produkciji su živjele TRI funkcije, a u repozitoriju postoji JEDNA.
// `bright-function` i `quick-api` su ostaci promašenih deployeva kroz dashboard (koji zaključa slug
// u trenutku otvaranja editora, pa preimenovanje mijenja samo prikazano ime). To nije bila kozmetika:
// `bright-function` je imao sha256 **identičan** `delete-account`-u — dakle **drugi, nezapisani
// endpoint koji nepovratno briše korisnički račun i sve podatke**. Sam po sebi nije bio rupa (identitet
// se i ondje izvodi isključivo iz JWT-a), ali je bio **stara kopija destruktivnog endpointa**: čim
// `delete-account` dobije sljedeći sigurnosni guard — kao što je `eee6f14` dodao zaštitu da se admin
// ne može obrisati sam — kopija ga NE dobiva, a i dalje radi. Zato ovaj gate postoji.
//
// KAKO RADI BEZ KLJUČA: neautenticiran POST na `/functions/v1/<slug>` odgovara
//   401 UNAUTHORIZED_NO_AUTH_HEADER  → funkcija POSTOJI (i traži JWT — što i želimo)
//   404 NOT_FOUND                    → funkcije NEMA
// Izmjereno na produkciji, ne pretpostavljeno.
//
// IZNIMKA (F2/4, 2026-09-15): funkcija koja NAMJERNO radi bez prijave (`verify_jwt = false`) na
// neautenticiran POST ne daje 401 nego odgovara SAMA — pa se za nju tvrdi njezin vlastiti odgovor
// (popis `PUBLIC_FNS` ispod). Pravilo „sve traži JWT" time ne slabi: javna funkcija mora biti
// IMENOVANA ovdje, inače je 200/400 bez prijave i dalje pad.
//
// OGRANIČENJE (namjerno zapisano): bez Management API tokena se deployane funkcije **ne mogu
// nabrojati**, pa se prava invarijanta („sve što je na produkciji postoji i u `supabase/functions/`")
// ne da provjeriti izravno. Zato: očekivane se potvrđuju iz repozitorija, a poznati stranci iz
// popisa ispod. Kad se pojavi novi stranac, dodaje se OVDJE — popis je zapis, ne pogađanje.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PROD = 'https://naxjubnedhrbhsuasayu.supabase.co';
const BASE = (process.env.CHECK_FUNCTIONS_URL || PROD).replace(/\/+$/, '');
const SITE = 'https://www.sokratstudy.com';
const JE_PROD = BASE === PROD;

/** Funkcije koje su nekad postojale na produkciji, a NE SMIJU više. */
const MUST_BE_GONE = [
  { slug: 'bright-function', why: 'duplikat delete-accounta pod krivim slugom (dashboard „Via Editor")' },
  { slug: 'quick-api', why: 'Supabaseov Hello-World predložak iz promašenog deploya' },
];

/**
 * Funkcije koje su u repozitoriju, ali NA PRODUKCIJI JOŠ NE SMIJU POSTOJATI.
 *
 * ZAŠTO JE TO TVRDNJA, A NE IZGOVOR (F6 ①/4): „nije još deployano" i „ne smije biti deployano"
 * izgledaju isto — oboje je 404. Razlika je u tome što drugo netko mora **opozvati namjerno**.
 * MCP poslužitelj na produkciji prije nego ondje padnu brava (①/2) i OAuth bio bi otvoren ulaz
 * u tuđe gradivo, pa 404 ovdje nije odsutnost nego **izlazni uvjet**: čim se pojavi, gate pada i
 * traži da se unos makne uz F7 korak. Obrnuto vrijedi jednako — mrtav unos (funkcija koje nema
 * u repozitoriju) pada kao i svaki drugi popis pisan rukom.
 */
// K/10 (17.11.): `mcp` je izašao s popisa — brava, nacrt i token-guard su na produkciji.
const JOS_NE_NA_PRODUKCIJI = {};

/**
 * Funkcije koje NAMJERNO rade bez prijave, i što njihov odgovor bez ključa mora biti.
 * `check` dobiva odgovore na POST `{}` i GET (bez praćenja preusmjeravanja) i vraća `null` ili razlog pada.
 */
const PUBLIC_FNS = {
  'mail-unsubscribe': {
    why: 'odjava iz maila — tko klikne, na tom uređaju najčešće nije prijavljen (RFC 8058 one-click)',
    check(post, get) {
      // POST bez tokena: 400 bad_token = deployana, javna, ima tajnu i odbija bez potpisa.
      if (post.status === 401) return 'traži JWT (401) — klijent pošte odjavljuje BEZ prijave, pa one-click u svakom mailu pada; deploy s --no-verify-jwt';
      if (post.status === 500 && post.error === 'mail_not_configured') return 'nema tajne MAIL_UNSUB_SECRET (500) — odjava iz svakog poslanog maila pada';
      if (post.status !== 400 || post.error !== 'bad_token') return `POST bez tokena: očekivan 400 bad_token, dobiven ${post.status} ${post.error || ''}`.trim();
      // GET nikad ne odjavljuje nego šalje na NAŠU stranicu s gumbom; krivi MAIL_SITE vodi ljude drugamo.
      const cilj = SITE + '/odjava.html';
      if (get.status !== 302 || !String(get.location || '').startsWith(cilj + '?')) {
        return `GET: očekivan 302 na ${cilj}, dobiven ${get.status} ${get.location || ''}`.trim();
      }
      return null;
    },
  },
  mcp: {
    why: 'MCP klijent PRVI zahtjev šalje bez tokena i tek iz odgovora 401 sazna GDJE je prijava (RFC 9728)',
    // ⚠️ OVA PROVJERA POSTOJI JER BI „status je 401" BILA ZELENO-SLIJEPA.
    // Funkcija ima `verify_jwt = false`, pa 401 ovdje NE dolazi od gatewaya nego od
    // `withOAuthProtectedResource` — a oba su 401. Da netko vrati `verify_jwt = true`,
    // gateway bi odbio zahtjev PRIJE funkcije, klijent nikad ne bi vidio `WWW-Authenticate`
    // i konektor bi bio mrtav — dok bi gate na goli broj i dalje pisao ✓. Isti razred kao
    // `PGRST202` i kao 400-vs-400 u ①/2b: broj se poklapa, uzrok ne.
    // Zato se tvrdi CIJELI lanac otkrivanja, do dokumenta koji zaglavlje oglašava.
    async check(post, _get) {
      if (post.status === 404) return 'nije deployana (404)';
      if (post.status !== 401) return `POST bez tokena: očekivan 401 s uputom gdje je prijava, dobiven ${post.status} ${post.error || ''}`.trim();

      const wa = post.wwwAuth || '';
      if (!wa) return '401 BEZ zaglavlja `WWW-Authenticate` — klijent ne može saznati gdje je prijava; tako izgleda 401 s gatewaya, dakle `verify_jwt` je uključen';
      if (!/^Bearer\b/i.test(wa)) return `WWW-Authenticate nije Bearer: ${wa}`;
      const m = wa.match(/resource_metadata="([^"]+)"/i);
      if (!m) return `WWW-Authenticate nema resource_metadata="…": ${wa}`;

      // Oglašena adresa mora STVARNO posluživati dokument — inače je uputa slijepa ulica.
      let meta;
      try {
        const r = await fetch(m[1], { redirect: 'manual' });
        if (r.status !== 200) return `oglašeni resource_metadata ${m[1]} vraća ${r.status}, a mora 200`;
        meta = await r.json();
      } catch (e) { return `oglašeni resource_metadata ${m[1]} nedostupan: ${e.message}`; }

      // PRODUKCIJA oglašava NAŠU javnu adresu (`MCP_RESOURCE_URL`, ADR-038 ②); drugi projekti
      // (staging) nemaju tu tajnu i oglašavaju adresu funkcije. Očekivanje ovisi o cilju, usporedba ne.
      const ocekivaniResurs = JE_PROD ? SITE + '/mcp' : BASE + '/functions/v1/mcp';
      if (meta.resource !== ocekivaniResurs) {
        return `metapodaci opisuju TUĐI resurs: "${meta.resource}" umjesto "${ocekivaniResurs}"`;
      }
      const posluzitelji = Array.isArray(meta.authorization_servers) ? meta.authorization_servers : [];
      const nas = BASE + '/auth/v1';
      if (posluzitelji.indexOf(nas) === -1) {
        return `prijava se šalje na ${JSON.stringify(posluzitelji)} umjesto na naš ${nas}`;
      }
      return null;
    },
  },
};

function expectedSlugs() {
  const dir = path.join(ROOT, 'supabase', 'functions');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('_'))
    .map((e) => e.name);
}

async function probe(slug) {
  const res = await fetch(BASE + '/functions/v1/' + slug, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}',
  });
  let error = null;
  try { const b = await res.json(); error = (b && (b.error || b.code)) || null; } catch (_e) { /* nije JSON */ }
  // `wwwAuth` se nosi dalje jer 401 s gatewaya i 401 iz funkcije imaju ISTI broj, a samo
  // drugi nosi uputu gdje je prijava (vidi `PUBLIC_FNS.mcp`).
  return { status: res.status, error, wwwAuth: res.headers.get('www-authenticate') };
}

async function probeGet(slug) {
  const res = await fetch(BASE + '/functions/v1/' + slug, { method: 'GET', redirect: 'manual' });
  return { status: res.status, location: res.headers.get('location') };
}

// Popisi su IZVOR ISTINE i za `scripts/deploy-function.js` (koja funkcija ide bez `verify_jwt`).
// Jedan popis, dva čitatelja — nikad druga kopija. Zato se izvoze, a prolaz se pokreće samo
// kad je ova datoteka POKRENUTA, ne kad je netko `require`-a.
module.exports = { PUBLIC_FNS, JOS_NE_NA_PRODUKCIJI, MUST_BE_GONE, expectedSlugs };

if (require.main !== module) return;

(async () => {
  console.log('\n=== check:functions — Edge Functions na ' + (process.env.CHECK_FUNCTIONS_URL ? 'ZADANOM PROJEKTU' : 'PRODUKCIJI') + ' ===');
  console.log('   ' + BASE + '\n');

  let fail = 0;
  let izmjereno = 0;                  // koliko je slugova STVARNO dobilo odgovor
  const nemjereno = [];               // i koji nisu — mjerač mora reći koliko je dotaknuo

  // 1) Sve iz repozitorija MORA biti deployano i MORA tražiti JWT — osim imenovanih javnih.
  const expected = expectedSlugs();
  if (!expected.length) console.log('  ⊘ nema `supabase/functions/*` u repozitoriju');
  // Mrtav zapis pada jednako kao propuštena funkcija — popis pisan rukom se provjerava PROTIV DISKA.
  for (const [popis, ime] of [[PUBLIC_FNS, 'javnih'], [JOS_NE_NA_PRODUKCIJI, 'onih koje još ne smiju na produkciju']]) {
    for (const slug of Object.keys(popis)) {
      if (expected.indexOf(slug) === -1) { fail++; console.log(`  ✗ ${slug} — na popisu ${ime}, a nema je u supabase/functions/ (mrtav zapis)`); }
    }
  }
  for (const slug of expected) {
    let post;
    try { post = await probe(slug); } catch (e) {
      // ⚠️ NE PREKIDAJ I NE ODBACUJ već nađene kvarove. Prijašnja verzija je ovdje radila
      // `return process.exit(0)`, pa je jedan nedostupan zahtjev značio: ostatak funkcija se
      // ne gleda, stranci iz MUST_BE_GONE se ne gledaju, a ✗ „mrtav zapis" (koji se broji PRIJE
      // ijednog zahtjeva) se baca — i ljuska vidi ✅. Izmjereno: `CHECK_FUNCTIONS_URL` na
      // nepostojeći host → jedan redak i EXIT 0, uz nula izmjerenih tvrdnji.
      // Nula izmjerenih stavki nije uspjeh; „nisam mogao izmjeriti" mora izgledati drukčije
      // od „izmjerio sam i čisto je".
      nemjereno.push({ slug, zasto: e.message });
      console.log(`  ⊘ ${slug} — mreža nedostupna (${e.message}); NIJE MJERENO`);
      continue;
    }
    izmjereno++;
    const st = post.status;

    // Funkcija koja na produkciji JOŠ NE SMIJE postojati: ondje se tvrdi njezina ODSUTNOST,
    // a stvarno ponašanje se mjeri na projektu gdje živi (`CHECK_FUNCTIONS_URL`).
    const josNe = JOS_NE_NA_PRODUKCIJI[slug];
    if (JE_PROD && josNe) {
      if (st === 404) console.log(`  ✓ ${slug} — na produkciji je NEMA (404), po planu: ${josNe.why}`);
      else { fail++; console.log(`  ✗ ${slug} — ŽIVI NA PRODUKCIJI (HTTP ${st}), a po planu ne bi smjela: ${josNe.why}`);
        console.log(`      ako je to sad namjerno, makni unos iz JOS_NE_NA_PRODUKCIJI (F7 korak)`); }
      continue;
    }
    if (st === 404) { fail++; console.log(`  ✗ ${slug} — u repozitoriju je, ali NIJE deployan (404)`); continue; }

    const javna = PUBLIC_FNS[slug];
    if (javna) {
      const razlog = await javna.check(post, await probeGet(slug));
      if (razlog) { fail++; console.log(`  ✗ ${slug} — ${razlog}`); }
      else console.log(`  ✓ ${slug} — deployana, NAMJERNO bez prijave: ${javna.why}`);
      continue;
    }
    if (st === 401) console.log(`  ✓ ${slug} — deployan i traži JWT (401)`);
    else { fail++; console.log(`  ✗ ${slug} — očekivan 401 (JWT obavezan), dobiven ${st}` +
      (st === 200 ? '  ⚠️ funkcija odgovara BEZ autentikacije!' : '')); }
  }

  // 2) Poznati stranci NE SMIJU postojati.
  for (const { slug, why } of MUST_BE_GONE) {
    let st;
    try { st = (await probe(slug)).status; } catch (e) {
      nemjereno.push({ slug, zasto: e.message });
      console.log(`  ⊘ ${slug} — mreža nedostupna; NIJE MJERENO`);
      continue;
    }
    izmjereno++;
    if (st === 404) console.log(`  ✓ ${slug} — obrisan (404)`);
    else {
      fail++;
      console.log(`  ✗ ${slug} — JOŠ ŽIVI (HTTP ${st}) — ${why}`);
      console.log(`      obriši: Supabase Dashboard → Edge Functions → ${slug} → Delete`);
    }
  }

  // DOSEG SE ISPISUJE UVIJEK. Zeleni redak bez broja ne razlikuje „provjerio sam sve i čisto je"
  // od „nisam stigao provjeriti ništa" — a upravo je to bila rupa (vidi hvatač iznad).
  const ocekivano = expected.length + MUST_BE_GONE.length;
  console.log(`\n   (doseg: izmjereno ${izmjereno} od ${ocekivano} funkcija)`);

  if (nemjereno.length) {
    console.log(`\n⚠️  NIJE MJERENO ${nemjereno.length}: ` + nemjereno.map((n) => n.slug).join(', '));
    console.log('   Mreža nije bila dostupna — gate NE TVRDI ništa o tim funkcijama.');
    if (fail) console.log(`   Uz to je ${fail} stvarnih kvarova NAĐENO prije prekida (niže).`);
    // Izlazni kod 2 (a ne 0) — „nisam mogao izmjeriti" je neuspjeh gatea, ali se RAZLIKUJE
    // od kvara projekta (1), da CI i čovjek mogu odvojiti tihu mrežu od pokvarenog projekta.
    if (fail) console.log(`\n❌ ${fail} problem(a) — razlog piše uz svaku stavku.`);
    process.exit(fail ? 1 : 2);
  }

  console.log('\n' + (fail === 0
    ? '✅ Projekt ima točno ono što repozitorij opisuje.'
    : `❌ ${fail} problem(a) — razlog piše uz svaku stavku.`));
  process.exit(fail ? 1 : 0);
})();
