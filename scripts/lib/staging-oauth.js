// staging-oauth.js — zajednički put do PRAVOG tokena korisnikovog AI-ja na STAGINGU.
// Koriste ga `mcp-brava-check.js` (što AI smije) i `mcp-nacrt-check.js` (nacrt, F6 ②/1).
//
// Izdvojeno 2026-09-29 kad je druga brana trebala isto: kopija bi značila da popravak toka
// (a tok je DVAPUT krivo pogođen, v. `oauthToken`) stigne samo u jednu od njih (ADR-027).
//
// ⚠️ SAMO STAGING. `odbijProdukciju()` se zove prije ijednog poziva — brane stvaraju i brišu
//    korisnike, a gađanje produkcije je tvrdo zabranjeno (CLAUDE pravilo #8).

try { require('dotenv').config(); } catch (e) { /* dotenv optional */ }

const crypto = require('crypto');

const PROD_REF = 'naxjubnedhrbhsuasayu';
const BASE = (process.env.STAGING_SUPABASE_URL || '').replace(/\/+$/, '');
const ANON = process.env.STAGING_SUPABASE_ANON;
const SERVICE = process.env.STAGING_SUPABASE_SERVICE_KEY;
const REDIRECT = 'https://claude.ai/api/mcp/auth_callback';
const NULA = '00000000-0000-0000-0000-000000000000';

/**
 * Svaki jednokratni korisnik koji brana stvori. Briše se u `pometi()` i na PREKIDU, jer 20 s
 * abort na hladnom startu Edge Functiona inače ostavi račun `@sokrat-test.invalid` na stagingu —
 * a to se već dogodilo. Brisanje samo na kraju sretnog puta nije dovoljno.
 */
const SMECE = [];

async function http(put, opts) {
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 20000);
  try { return await fetch(BASE + put, Object.assign({ signal: ctrl.signal }, opts)); }
  finally { clearTimeout(to); }
}

const svcHeaders = () => ({ apikey: SERVICE, Authorization: 'Bearer ' + SERVICE, 'Content-Type': 'application/json' });
const ref = () => (BASE.match(/https:\/\/([a-z0-9]+)\.supabase\.co/) || [])[1] || '';

/** Istina ako `BASE` gađa produkciju — pozivatelj tada mora stati PRIJE ijednog zahtjeva. */
const jeProdukcija = () => BASE.includes(PROD_REF);

/** Odbijeno? 401/403, ili 404 koji PostgREST vraća kad ruta ulozi nije vidljiva. */
function odbijen(status, tekst) {
  return status === 401 || status === 403 || (status === 404 && /PGRST202/.test(tekst || ''));
}

/**
 * Jednokratni korisnik. `bezLozinke` = račun kakav nastane Google prijavom (U1).
 * `email_confirm` jer običan `signUp` na stagingu šalje potvrdni mail i ne daje sesiju.
 */
async function noviKorisnik({ prefiks = 'mcp-brava', bezLozinke = false } = {}) {
  const email = `${prefiks}-${bezLozinke ? 'nopw-' : ''}${Date.now()}-${crypto.randomBytes(2).toString('hex')}@sokrat-test.invalid`;
  const password = bezLozinke ? undefined : 'Throwaway-' + crypto.randomBytes(6).toString('hex') + '!9';
  const r = await http('/auth/v1/admin/users', {
    method: 'POST', headers: svcHeaders(),
    body: JSON.stringify(Object.assign({ email, email_confirm: true }, password ? { password } : {}))
  });
  if (!r.ok) throw new Error(`createUser ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const id = (await r.json()).id;
  SMECE.push(id);
  return { id, email, password };
}

/** Obriše sve jednokratne korisnike koje je ova vrtnja stvorila. Tiho — higijena, ne tvrdnja. */
async function pometi() {
  for (const id of SMECE.splice(0)) {
    await http('/auth/v1/admin/users/' + id, { method: 'DELETE', headers: svcHeaders() }).catch(() => {});
  }
}

async function prijava(email, password) {
  const r = await http('/auth/v1/token?grant_type=password', {
    method: 'POST', headers: { apikey: ANON, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!r.ok) throw new Error(`signIn ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return (await r.json()).access_token;
}

/**
 * PRAVI OAuth token: svjež DCR klijent → authorize → GET detalja → consent → zamjena koda.
 * Dva izmjerena pravila toka (18.09.), oba puta krivo pogođena iz prve:
 *   • `consent` BEZ prethodnog `GET /oauth/authorizations/<id>` vraća **404** — GET je korak toka;
 *   • ako za par (klijent, scope) veza VEĆ postoji, `consent` vrati **400 „no longer pending"** →
 *     zato svaki poziv registrira SVJEŽ DCR klijent.
 */
async function oauthToken(korisnikJwt, imeKlijenta = 'Sokrat brava (test)') {
  const reg = await http('/auth/v1/oauth/clients/register', {
    method: 'POST', headers: { apikey: ANON, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_name: imeKlijenta,
      redirect_uris: [REDIRECT],
      grant_types: ['authorization_code', 'refresh_token'],
      response_types: ['code'],
      token_endpoint_auth_method: 'none'
    })
  });
  if (!reg.ok) throw new Error(`DCR ${reg.status}: ${(await reg.text()).slice(0, 200)}`);
  const klijent = await reg.json();

  const verifier = crypto.randomBytes(32).toString('base64url');
  const u = new URL(BASE + '/auth/v1/oauth/authorize');
  u.searchParams.set('client_id', klijent.client_id);
  u.searchParams.set('response_type', 'code');
  u.searchParams.set('redirect_uri', REDIRECT);
  u.searchParams.set('code_challenge', crypto.createHash('sha256').update(verifier).digest('base64url'));
  u.searchParams.set('code_challenge_method', 'S256');
  const a = await fetch(u, { redirect: 'manual' });
  const id = ((a.headers.get('location') || '').match(/authorization_id=([^&]+)/) || [])[1];
  if (!id) throw new Error('authorize bez authorization_id (HTTP ' + a.status + ')');

  const det = await http('/auth/v1/oauth/authorizations/' + id, {
    headers: { apikey: ANON, Authorization: 'Bearer ' + korisnikJwt }
  });
  if (!det.ok) throw new Error(`detalji ${det.status}`);

  const c = await http('/auth/v1/oauth/authorizations/' + id + '/consent', {
    method: 'POST',
    headers: { apikey: ANON, 'Content-Type': 'application/json', Authorization: 'Bearer ' + korisnikJwt },
    body: JSON.stringify({ action: 'approve' })
  });
  if (!c.ok) throw new Error(`consent ${c.status}: ${(await c.text()).slice(0, 160)}`);
  const code = (((await c.json()).redirect_url || '').match(/[?&]code=([^&]+)/) || [])[1];

  const t = await http('/auth/v1/oauth/token', {
    method: 'POST', headers: { apikey: ANON, 'Content-Type': 'application/json' },
    body: JSON.stringify({ grant_type: 'authorization_code', code, code_verifier: verifier, client_id: klijent.client_id, redirect_uri: REDIRECT })
  });
  if (!t.ok) throw new Error(`token ${t.status}: ${(await t.text()).slice(0, 200)}`);
  const token = (await t.json()).access_token;
  return { token, client_id: klijent.client_id, claims: JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString()) };
}

/** RPC zadanim tokenom. `tekst` je skraćen za ispis; `json` je cijeli parsiran odgovor (ili null). */
async function rpc(token, ime, tijelo) {
  const r = await http('/rest/v1/rpc/' + ime, {
    method: 'POST',
    headers: { apikey: ANON, Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify(tijelo)
  });
  const cijeli = await r.text();
  let json = null;
  try { json = JSON.parse(cijeli); } catch (e) { /* nije json */ }
  return { status: r.status, tekst: cijeli.slice(0, 180), json };
}

module.exports = {
  PROD_REF, BASE, ANON, SERVICE, NULA, SMECE,
  http, svcHeaders, ref, jeProdukcija, odbijen, noviKorisnik, pometi, prijava, oauthToken, rpc
};
