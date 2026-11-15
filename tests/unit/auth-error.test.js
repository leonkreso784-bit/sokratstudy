/* eslint-disable no-console */
// ===== Node unit testovi za authError() iz js/auth.js =====
// Pokreni: `npm run test:unit` (ili: node tests/unit/auth-error.test.js)
//
// Zašto ovaj test postoji: uključivanjem `auth_leaked_password_protection`
// (2026-08-28) server je počeo odbijati lozinke koje su DUGE ali procurjele.
// `minlength="8"` u obrascu to ne može predvidjeti, pa je poruka sa servera
// jedini put do korisnika — a išla je sirova i na engleskom.
//
// Obrazac je isti kao my-materials.test.js (klasična skripta kroz shim), uz
// jednu razliku: `SokratAuth` je LEKSIČKI const, ne `window.X` (poznata
// GOTCHA), pa se hvata tako da se u tijelo funkcije doda `return SokratAuth;`.

const assert = require('assert');
const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  ✓ ' + name); }
  catch (e) { failed++; console.error('  ✗ ' + name + '\n      ' + e.message); }
}

console.log('\n=== auth — poruke o lozinci (AUTH-1) ===\n');

const ROOT = path.join(__dirname, '..', '..');
const authCode = fs.readFileSync(path.join(ROOT, 'js', 'auth.js'), 'utf8');

/**
 * Svježa instanca modula.
 * @param {((k:string)=>string)=} t i18n stub; bez njega `at()` vraća fallback.
 */
function load(t) {
  const win = {};
  if (t) win.t = t;
  const doc = { addEventListener: function () {} };
  // `t` ide i kao parametar: `at()` zove GOLI `t(key)` nakon što provjeri `window.t`.
  return new Function('window', 'document', 't', authCode + '\n;return SokratAuth;')(
    win, doc, t || function (k) { return k; }
  );
}

const A = load();

// ---------------------------------------------------------- slaba lozinka
// Ovo je razlog zbog kojeg cigla postoji: "procurjela" i "prekratka" nisu isti
// savjet. Uputa "uzmi dužu" je KRIVA za lozinku odbijenu zbog krađe podataka.
test('procurjela lozinka → poruka o krađi podataka, ne o duljini', () => {
  const msg = A.authError({ code: 'weak_password', message: 'Password is known to be weak.', reasons: ['pwned'] });
  assert.match(msg, /data breach/i);
  assert.doesNotMatch(msg, /8 characters/i);
});

test('prekratka lozinka → poruka o duljini, ne o krađi', () => {
  const msg = A.authError({ code: 'weak_password', message: 'Password is too short.', reasons: ['length'] });
  assert.match(msg, /8 characters/i);
  assert.doesNotMatch(msg, /data breach/i);
});

test('procurjela prepoznata i BEZ reasons (samo iz poruke)', () => {
  const msg = A.authError({ code: 'weak_password', message: 'This password is pwned.' });
  assert.match(msg, /data breach/i);
});

test('weak_password bez ijednog traga → pada na duljinu (sigurniji savjet)', () => {
  const msg = A.authError({ code: 'weak_password', message: '' });
  assert.match(msg, /8 characters/i);
});

// ------------------------------------------------------------ ostali kodovi
test('invalid_credentials → kriv e-mail ili lozinka', () => {
  assert.match(A.authError({ code: 'invalid_credentials', message: 'x' }), /Wrong email or password/i);
});

test('email_not_confirmed → uputa na inbox', () => {
  assert.match(A.authError({ code: 'email_not_confirmed', message: 'x' }), /confirm your email/i);
});

test('user_already_exists → uputa na prijavu', () => {
  assert.match(A.authError({ code: 'user_already_exists', message: 'x' }), /already exists/i);
});

test('over_email_send_rate_limit → pričekaj', () => {
  assert.match(A.authError({ code: 'over_email_send_rate_limit', message: 'x' }), /Too many attempts/i);
});

test('same_password → nova mora biti različita', () => {
  assert.match(A.authError({ code: 'same_password', message: 'x' }), /different from the current/i);
});

// ----------------------------------- F6 ①/2b: „traži trenutnu lozinku" (uključeno 21.09.)
// ⚠️ IZMJERENO na stagingu: poslužitelj za OBA slučaja šalje DOSLOVNO ISTU rečenicu, a
// razlikuje ih samo `error_code`. Zato težinu nosi treća tvrdnja: ista poruka + različit kod
// mora dati RAZLIČITU rečenicu korisniku. Grananje po tekstu bi je oborilo.
const PORUKA_SERVERA = 'Current password required when setting new password.';

test('current_password_required → traži se trenutna lozinka', () => {
  assert.match(A.authError({ code: 'current_password_required', message: PORUKA_SERVERA }),
    /Enter your current password/i);
});

test('current_password_invalid → kaže da lozinka NIJE točna, ne da je treba upisati', () => {
  const out = A.authError({ code: 'current_password_invalid', message: PORUKA_SERVERA });
  assert.match(out, /not your current password/i);
  assert.doesNotMatch(out, /Enter your current password/i);
});

test('ista poruka servera + različit kod → različita rečenica (sudi se po KODU, ne po tekstu)', () => {
  const a = A.authError({ code: 'current_password_required', message: PORUKA_SERVERA });
  const b = A.authError({ code: 'current_password_invalid', message: PORUKA_SERVERA });
  assert.notStrictEqual(a, b);
  // i nijedna ne smije biti sirova rečenica servera
  assert.notStrictEqual(a, PORUKA_SERVERA);
  assert.notStrictEqual(b, PORUKA_SERVERA);
});
// (Oba nova ključa provjerava već postojeća, SAMONABRAJAJUĆA tvrdnja niže — ona čita ključeve
//  IZ `authError` i za svaki traži hrvatski. Druga kopija bila bi ručni popis uz nju.)

// --------------------------------------------- mreža za odgovore BEZ koda
// GoTrue šalje `code` tek od 2024-01-01; stariji/rubni odgovori imaju samo tekst.
test('bez koda: "Invalid login credentials" se i dalje prepoznaje', () => {
  assert.match(A.authError({ message: 'Invalid login credentials' }), /Wrong email or password/i);
});

test('bez koda: "Email not confirmed" se i dalje prepoznaje', () => {
  assert.match(A.authError({ message: 'Email not confirmed' }), /confirm your email/i);
});

// ------------------------------------------------------------- fallback
// Najvažnija tvrdnja cijelog mappera: NIKAD prazan crveni okvir.
test('nepoznat kôd → SIROVA poruka preživi (radije engleski nego ništa)', () => {
  const raw = 'Signups are disabled for this instance';
  assert.strictEqual(A.authError({ code: 'signup_disabled', message: raw }), raw);
});

test('prazna greška → generička poruka, ne prazan string', () => {
  assert.ok(A.authError({}).length > 0);
  assert.ok(A.authError(null).length > 0);
  assert.ok(A.authError(undefined).length > 0);
});

test('greška bez poruke ali s nepoznatim kodom → i dalje nije prazno', () => {
  assert.ok(A.authError({ code: 'nesto_novo' }).length > 0);
});

// ------------------------------------------------------- prolaz kroz i18n
test('kad i18n postoji, poruka ide KROZ njega (ne zaobilazi ga)', () => {
  const hr = load(function (k) {
    return k === 'auth.st.weakPwned' ? 'HRVATSKI-POGODAK' : k;
  });
  const msg = hr.authError({ code: 'weak_password', reasons: ['pwned'], message: 'pwned' });
  assert.strictEqual(msg, 'HRVATSKI-POGODAK');
});

// ────────────────────────────────────────────────────────────────────────
// OBRNUTA PROVJERA — bitnija od samog mapiranja.
//
// Mapper može emitirati samo one ključeve koji STVARNO postoje u i18n.js.
// Ako ključ nedostaje, `at()` tiho vrati engleski fallback: HR korisnik dobije
// englesku poruku, ništa ne pukne, i nitko to ne primijeti. Zato se popis
// ključeva ČITA IZ KODA (ne prepisuje ovamo — prepisan popis ostari).
// ────────────────────────────────────────────────────────────────────────
{
  const tijelo = authCode.slice(
    authCode.indexOf('function authError'),
    authCode.indexOf('function injectModal')
  );
  assert.ok(tijelo.length > 200, 'nije nađeno tijelo authError() — je li preimenovan?');

  const kljucevi = Array.from(new Set(
    (tijelo.match(/at\('([^']+)'/g) || []).map((m) => m.slice(4, -1))
  ));

  test('authError emitira barem 6 i18n ključeva (inače je regex promašio)', () => {
    assert.ok(kljucevi.length >= 6, 'nađeno samo ' + kljucevi.length + ': ' + kljucevi.join(', '));
  });

  const i18nCode = fs.readFileSync(path.join(ROOT, 'js', 'i18n.js'), 'utf8');
  kljucevi.forEach((k) => {
    test('i18n ima "' + k + '" s hrvatskim prijevodom', () => {
      const redak = new RegExp("'" + k.replace(/\./g, '\\.') + "':\\s*\\{[^}]*\\}").exec(i18nCode);
      assert.ok(redak, 'ključ ne postoji u js/i18n.js');
      assert.ok(/\ben:\s*'/.test(redak[0]), 'nedostaje en');
      assert.ok(/\bhr:\s*'/.test(redak[0]), 'nedostaje hr — HR korisnik bi tiho dobio engleski');
    });
  });
}

// ────────────────────────────────────────────────────────────────────────
// Nijedan poziv ne smije zaobići mapper: sirovi `error.message` u sučelju je
// točno kvar koji je ova cigla uklonila. Test čuva da se ne vrati.
// ────────────────────────────────────────────────────────────────────────
test('nigdje u auth.js nema setStatus(error.message)', () => {
  const pogodci = authCode.match(/set(?:Recovery)?Status\(\s*(?:error|err)\.message/g) || [];
  assert.strictEqual(pogodci.length, 0, 'sirova poruka ide u sučelje na ' + pogodci.length + ' mjesta');
});

// ── _readSupabaseOverride: localStorage put samo na localhostu i samo za *.supabase.co ──
const overrideSrc = (authCode.match(/function _readSupabaseOverride\(\) \{[\s\S]*?\n\}\n/) || [])[0];
function citajOverride(hostname, ls, win) {
  return new Function('location', 'localStorage', 'window', overrideSrc + '\nreturn _readSupabaseOverride();')(
    { hostname: hostname },
    { getItem: (k) => (k in ls ? ls[k] : null) },
    win || {}
  );
}
const dobar = JSON.stringify({ url: 'https://abcdef123.supabase.co', publishableKey: 'k' });

test('override: funkcija je pronađena u auth.js', () => assert.ok(overrideSrc));
test('override: na produkcijskoj domeni localStorage override se IGNORIRA', () => {
  assert.strictEqual(citajOverride('www.sokratstudy.com', { 'sokrat-supabase-override': dobar }), null);
});
test('override: na localhostu / 127.0.0.1 / [::1] radi', () => {
  ['localhost', '127.0.0.1', '[::1]'].forEach((h) => {
    const o = citajOverride(h, { 'sokrat-supabase-override': dobar });
    assert.ok(o && o.url === 'https://abcdef123.supabase.co', h);
  });
});
test('override: na localhostu se odbija url izvan *.supabase.co', () => {
  ['https://evil.com', 'http://abc.supabase.co', 'https://abc.supabase.co.evil.com', 'https://a-b.supabase.co/x']
    .forEach((u) => {
      const raw = JSON.stringify({ url: u, publishableKey: 'k' });
      assert.strictEqual(citajOverride('localhost', { 'sokrat-supabase-override': raw }), null, u);
    });
});

console.log('\n' + passed + ' prošlo, ' + failed + ' palo\n');
process.exit(failed ? 1 : 0);
