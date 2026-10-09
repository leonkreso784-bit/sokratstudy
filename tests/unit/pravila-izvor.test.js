/* eslint-disable no-console */
// ===== ZAVRSNICA K/1 — pravila sadržaja imaju JEDAN izvor (preglednik), MCP ih samo uvozi =====
// Pokreni: node tests/unit/pravila-izvor.test.js  (uključeno u `npm run test:unit`)
//
// ZAŠTO POSTOJI: AI kroz konektor piše u nacrt po pravilima MCP poslužitelja, a korisnik isti
// materijal vidi i uređuje po pravilima preglednika. Do K/1 je konektor nosio vlastite brojke
// (`tekst(1, 500, …)`, „under 200 characters") — dvije istine koje se tiho raziđu (ADR-027, BUG-023).
// Tvrdi se:
//   ① generirani `_shared/pravila.ts` == izvori (isto što `build:pravila -- --check` u preflightu);
//   ② ono što MCP stvarno uvozi PONAŠA SE kao preglednik (mjera, paleta, normFill) — ne samo isti tekst;
//   ③ SVAKA kartica u ulazu alata ima strop == HARD (prebrojano iz `ALATI`, ne s popisa);
//   ④ upute AI-ju navode SOFT iz izvora, i nijedna brojka kartice ne stoji golo u `alati.ts`;
//   ⑤ treća kopija — shema u bazi (`schema/ugc-content.schema.json`) — ima isti strop.

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { pathToFileURL } = require('url');

const KORIJEN = path.join(__dirname, '..', '..');
const PRAVILA = path.join(KORIJEN, 'supabase', 'functions', '_shared', 'pravila.ts');
const ALATI_TS = path.join(KORIJEN, 'supabase', 'functions', 'mcp', 'alati.ts');
let pao = 0;
let proslo = 0;
const test = async (ime, fn) => {
  try { await fn(); proslo++; console.log('  ✓ ' + ime); }
  catch (e) { pao++; console.log('  ✗ ' + ime + '\n      ' + e.message.split('\n')[0]); }
};

// Preglednikovi izvori, učitani kako ih učitava preglednik (bez prepisivanja u test).
const win = {};
new Function('window', fs.readFileSync(path.join(KORIJEN, 'js', 'card-limits.js'), 'utf8'))(win);
const L = win.SokratCardLimits;
const utilsSrc = fs.readFileSync(path.join(KORIJEN, 'js', 'utils.js'), 'utf8');
const bojeIzvor = JSON.parse(utilsSrc.match(/^const KURIRANE_BOJE = (\[[^\]\r\n]*\]);\r?$/m)[1].replace(/'/g, '"'));
const fillSrc = fs.readFileSync(path.join(KORIJEN, 'js', 'fill-blanks.js'), 'utf8');
const normIzvor = new Function(fillSrc.match(/^function normFill\(s\) \{.*\}\r?$/m)[0].trim() + '\nreturn normFill;')();

/** Svi objekti-sheme koji opisuju karticu (imaju i `question` i `answer`), bilo gdje u ulazu alata. */
function kartice(shema, put, van) {
  if (!shema || typeof shema !== 'object') return van;
  if (shema.properties && shema.properties.question && shema.properties.answer) van.push({ put, shema });
  for (const [k, v] of Object.entries(shema)) if (v && typeof v === 'object') kartice(v, put + '.' + k, van);
  return van;
}

(async () => {
  console.log('\n=== pravila sadržaja: jedan izvor (ZAVRSNICA K/1) ===\n');

  await test('① `_shared/pravila.ts` je generiran iz izvora (build:pravila --check)', () => {
    execFileSync(process.execPath, [path.join(KORIJEN, 'scripts', 'build-pravila.js'), '--check'], { stdio: 'pipe' });
  });

  const P = await import(pathToFileURL(PRAVILA).href);

  await test('② mjera kartice u MCP-u == SokratCardLimits (pragovi i rubovi 200/201/500/501, podrezano)', () => {
    assert.strictEqual(P.KARTICA_SOFT, L.SOFT);
    assert.strictEqual(P.KARTICA_HARD, L.HARD);
    const uzorci = ['', '   ', null, 42, 'a'.repeat(L.SOFT), 'a'.repeat(L.SOFT + 1), 'a'.repeat(L.HARD),
      'a'.repeat(L.HARD + 1), '  ' + 'a'.repeat(L.HARD) + '  '];
    for (const u of uzorci) assert.deepStrictEqual(P.mjeriKarticu(u), L.measure(u), 'razlika za duljinu ' + String(u).length);
  });

  await test('② paleta u MCP-u == KURIRANE_BOJE iz js/utils.js', () => {
    assert.ok(bojeIzvor.length > 0, 'paleta u izvoru je prazna');
    assert.deepStrictEqual([...P.KURIRANE_BOJE], bojeIzvor);
    assert.ok(Object.isFrozen(P.KURIRANE_BOJE), 'paleta u MCP-u se smije mijenjati u hodu');
  });

  await test('② normFill u MCP-u == normFill iz js/fill-blanks.js', () => {
    const uzorci = ['Ključ', '  KLJUČ  ', 'self-service', 'self service', 'a - b', 'a\t\nb', '', 0, '--x--'];
    for (const u of uzorci) assert.strictEqual(P.normFill(u), normIzvor(u), 'razlika za ' + JSON.stringify(u));
  });

  const A = await import(pathToFileURL(ALATI_TS).href);

  await test('③ svaka kartica u ulazu alata ima strop == HARD (question i answer)', () => {
    const nadjeno = A.ALATI.flatMap((a) => kartice(a.ulaz, a.ime, []));
    console.log('      (kartica u ulazima alata: ' + nadjeno.length + ' — ' + nadjeno.map((n) => n.put.split('.')[0]).join(', ') + ')');
    assert.ok(nadjeno.length >= 2, 'nađeno ' + nadjeno.length + ' — očekivane barem dodaj_kartice i izmijeni_stavke');
    for (const { put, shema } of nadjeno) {
      for (const polje of ['question', 'answer']) {
        assert.strictEqual(shema.properties[polje].maxLength, L.HARD, put + '.' + polje + '.maxLength');
      }
    }
  });

  await test('④ upute AI-ju navode SOFT iz izvora; u alati.ts nema gole brojke kartice', () => {
    const upute = Array.isArray(A.UPUTE) ? A.UPUTE.join('\n') : String(A.UPUTE);
    assert.ok(upute.includes('under ' + L.SOFT + ' characters'), 'upute ne navode SOFT ' + L.SOFT);
    const kod = fs.readFileSync(ALATI_TS, 'utf8');
    assert.ok(/from '\.\.\/_shared\/pravila\.ts'/.test(kod), 'alati.ts ne uvozi _shared/pravila.ts');
    assert.ok(!/under \d+ characters/.test(kod), 'alati.ts piše prag kartice golom brojkom');
    const karticaRedak = kod.split('\n').find((r) => /^const KARTICA = /.test(r)) || '';
    assert.ok(karticaRedak && !/\b\d{3}\b/.test(karticaRedak.split('explanation')[0]), 'KARTICA nosi golu brojku: ' + karticaRedak.slice(0, 120));
  });

  await test('⑤ shema u bazi (ugc-content.schema.json): strop kartice == HARD', () => {
    const shema = JSON.parse(fs.readFileSync(path.join(KORIJEN, 'schema', 'ugc-content.schema.json'), 'utf8'));
    const nadjeno = kartice(shema, 'shema', []);
    console.log('      (kartica u shemi: ' + nadjeno.length + ')');
    assert.ok(nadjeno.length >= 1, 'u shemi nije nađena nijedna kartica');
    for (const { put, shema: s } of nadjeno) {
      for (const polje of ['question', 'answer']) assert.strictEqual(s.properties[polje].maxLength, L.HARD, put + '.' + polje);
    }
  });

  console.log('\n  ' + proslo + ' prošlo, ' + pao + ' palo\n');
  process.exit(pao ? 1 : 0);
})();
