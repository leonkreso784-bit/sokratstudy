/* eslint-disable no-console */
// ===== BRAVA U EDGE FUNCTIONS (F6 ①/2) — je li ovo token korisnikovog AI-ja? BEZ mreže =====
// Pokreni: node tests/unit/token-guard.test.js  (uključeno u `npm run test:unit`)
//
// ZAŠTO POSTOJI: `npm run mcp:brava` dokazuje pravu stvar, ali traži mrežu, staging i tri tajne —
// ne vrti se u preflightu ni u CI-ju. Odluka koju ovaj modul donosi ipak čuva dvije NEPOVRATNE
// radnje (brisanje računa, slanje maila prema van), pa mora imati branu koja stoji uz kod.
//
// Tvrdnje su namjerno postavljene tako da svaka pada na jednoj mutaciji stvarnog modula:
//   ① token s `client_id` = AI-token (izmjereno: OAuth token nosi taj claim i pri obnovi);
//   ② uloga koja nije `authenticated` = AI-token (tako izgleda token poslije našeg hooka);
//   ③ obična korisnička sesija PROLAZI (inače bi brava zaključala i prave korisnike);
//   ④ nečitljiv teret = ZABRANA, ne propuštanje (fail-closed na nepovratnom putu).

const assert = require('assert');
const path = require('path');
const { pathToFileURL } = require('url');

const KORIJEN = path.join(__dirname, '..', '..');
let pao = 0;
let proslo = 0;
const test = (ime, fn) => {
  try { fn(); proslo++; console.log('  ✓ ' + ime); }
  catch (e) { pao++; console.log('  ✗ ' + ime + '\n      ' + e.message); }
};

/** JWT bez potpisa — modul čita samo teret (potpis je provjerio gateway). */
function token(claims) {
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  return 'Bearer ' + b64({ alg: 'ES256', typ: 'JWT' }) + '.' + b64(claims) + '.potpis';
}

(async () => {
  console.log('\n=== token-guard (F6 ①/2) ===\n');
  let M;
  try {
    M = await import(pathToFileURL(path.join(KORIJEN, 'supabase', 'functions', '_shared', 'token-guard.ts')).href);
  } catch (e) {
    console.log('  ✗ modul se ne učitava: ' + e.message);
    process.exit(1);
  }

  test('obična korisnička sesija PROLAZI', () => {
    const r = M.biljegTokena(token({ sub: 'u1', role: 'authenticated', aud: 'authenticated' }));
    assert.strictEqual(r.aiToken, false, 'prijavljen korisnik ne smije biti zaključan');
    assert.strictEqual(r.razlog, 'session');
  });

  test('token s client_id je AI-token i kad mu je uloga još authenticated', () => {
    // Točno stanje PRIJE hooka (i na projektu gdje hook nije uključen) — brava ne smije ovisiti
    // samo o ulozi, inače je Edge Function otvorena svugdje gdje hook ne radi.
    const r = M.biljegTokena(token({ sub: 'u1', role: 'authenticated', client_id: '8f3b38f7-0d71-4585-a5a8-668e5e7aa51d' }));
    assert.strictEqual(r.aiToken, true);
    assert.strictEqual(r.razlog, 'oauth_client');
  });

  test('token s ulogom mcp_klijent je AI-token i bez client_id-a', () => {
    const r = M.biljegTokena(token({ sub: 'u1', role: 'mcp_klijent' }));
    assert.strictEqual(r.aiToken, true);
    assert.strictEqual(r.razlog, 'role_mcp_klijent');
  });

  test('prazan client_id NE proglašava običnu sesiju AI-tokenom', () => {
    const r = M.biljegTokena(token({ sub: 'u1', role: 'authenticated', client_id: '' }));
    assert.strictEqual(r.aiToken, false);
  });

  test('nečitljiv teret = ZABRANA (fail-closed)', () => {
    for (const zaglavlje of ['Bearer nije.pravi.token', 'Bearer ', '', 'Bearer a.b']) {
      assert.strictEqual(M.biljegTokena(zaglavlje).aiToken, true, 'propustilo: ' + JSON.stringify(zaglavlje));
    }
  });

  test('token bez uloge (role izostao) je AI-token', () => {
    const r = M.biljegTokena(token({ sub: 'u1' }));
    assert.strictEqual(r.aiToken, true);
    assert.strictEqual(r.razlog, 'role_none');
  });

  test('anon i service_role tokeni ne prolaze kao korisnička sesija', () => {
    assert.strictEqual(M.biljegTokena(token({ role: 'anon' })).aiToken, true);
    assert.strictEqual(M.biljegTokena(token({ role: 'service_role' })).aiToken, true);
  });

  test('zaglavlje bez „Bearer" prefiksa se svejedno čita (ne oslanjamo se na oblik)', () => {
    const bezPrefiksa = token({ sub: 'u1', role: 'authenticated' }).replace(/^Bearer /, '');
    assert.strictEqual(M.biljegTokena(bezPrefiksa).aiToken, false);
  });

  console.log(`\n=== token-guard: ${proslo} prošlo / ${pao} palo ===\n`);
  process.exit(pao ? 1 : 0);
})();
