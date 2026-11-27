/* eslint-disable no-console */
// ===== SOKRAT STUDY — sonda MCP konektora (F6 ①/1), izvana, BEZ ijednog ključa =====
// Pokreni: npm run mcp:probe   (mrežno; NIJE u preflightu)
//
// ZAŠTO POSTOJI: korisnikov AI (Claude, ChatGPT) konektor spaja SAM, po standardu — i kad u lancu
// otkrivanja fali ijedna karika, jedino što korisnik vidi je „Couldn't reach the MCP server".
// Nijedan naš test to ne vidi, jer ne gleda s mjesta s kojeg gleda AI. Ova sonda prolazi isti lanac:
//   ① zahtjev BEZ tokena → 401 + `WWW-Authenticate: Bearer resource_metadata="…"` (inače klijent ne
//     zna gdje je prijava — gateway s `verify_jwt` bi ovdje vratio 401 BEZ tog zaglavlja);
//   ② metapodaci resursa (RFC 9728): `resource` == adresa koju korisnik upisuje, a autorizacijski
//     poslužitelj je Auth ISTOG projekta;
//   ③ metapodaci Auth poslužitelja: S256 (PKCE) i `registration_endpoint` (DCR, ADR-038 ③);
//   ④ krivotvoren token → 401, ne 500 i ne podaci.
// Ne upisuje ništa i ne traži nijedan ključ. Ispisuje KOLIKO je provjera dotaknuo (pouka: mjerač
// koji ne kaže što je mjerio vraća uvjerljiv krivi broj).
//
// Cilj: `MCP_PROBE_BASE` (projekt) ili `STAGING_SUPABASE_URL` iz .env; adresa konektora
// `MCP_PROBE_URL` ili `<projekt>/functions/v1/mcp` (produkcija poslije: https://www.sokratstudy.com/mcp).

try { require('dotenv').config(); } catch (e) { /* dotenv nije obavezan */ }

const BASE = String(process.env.MCP_PROBE_BASE || process.env.STAGING_SUPABASE_URL || '').replace(/\/+$/, '');
if (!/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(BASE)) {
  console.log('✗ nema cilja: postavi MCP_PROBE_BASE ili STAGING_SUPABASE_URL (https://<ref>.supabase.co)');
  process.exit(1);
}
const MCP = String(process.env.MCP_PROBE_URL || BASE + '/functions/v1/mcp').replace(/\/+$/, '');
const AUTH = BASE + '/auth/v1';

let provjera = 0;
let palo = 0;
const rec = (ok, ime, detalj) => {
  provjera++;
  if (!ok) palo++;
  console.log('  ' + (ok ? '✓' : '✗') + ' ' + ime + (detalj !== undefined ? '  → ' + detalj : ''));
};

const INIT = JSON.stringify({
  jsonrpc: '2.0', id: 1, method: 'initialize',
  params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'sokrat-mcp-probe', version: '1' } }
});
const ZAGLAVLJA = { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' };

async function json(odgovor) {
  try { return await odgovor.json(); } catch (e) { return null; }
}

(async () => {
  console.log('\n=== mcp:probe ===');
  console.log('  konektor : ' + MCP);
  console.log('  Auth     : ' + AUTH + '\n');

  // ① bez tokena
  const r1 = await fetch(MCP, { method: 'POST', headers: ZAGLAVLJA, body: INIT });
  const www = r1.headers.get('www-authenticate') || '';
  rec(r1.status === 401, '① bez tokena → 401', r1.status);
  const meta = (www.match(/resource_metadata="([^"]+)"/) || [])[1];
  rec(!!meta, '① WWW-Authenticate nosi resource_metadata', www || '(nema zaglavlja)');

  // ② metapodaci resursa
  if (meta) {
    const r2 = await fetch(meta);
    const d2 = await json(r2);
    rec(r2.status === 200 && !!d2, '② metapodaci resursa se čitaju', r2.status);
    rec(!!d2 && d2.resource === MCP, '② resource == adresa konektora', d2 && d2.resource);
    rec(!!d2 && Array.isArray(d2.authorization_servers) && d2.authorization_servers.includes(AUTH),
      '② autorizacijski poslužitelj = Auth istog projekta', d2 && JSON.stringify(d2.authorization_servers));
  } else {
    rec(false, '② metapodaci resursa se čitaju', 'nema pokazivača iz ①');
  }

  // ③ Auth poslužitelj
  const r3 = await fetch(BASE + '/.well-known/oauth-authorization-server/auth/v1');
  const d3 = await json(r3);
  rec(r3.status === 200 && !!d3, '③ OAuth poslužitelj je uključen', r3.status + (d3 && d3.msg ? ' ' + d3.msg : ''));
  rec(!!d3 && Array.isArray(d3.code_challenge_methods_supported) && d3.code_challenge_methods_supported.includes('S256'),
    '③ PKCE S256', d3 && JSON.stringify(d3.code_challenge_methods_supported));
  rec(!!d3 && typeof d3.registration_endpoint === 'string', '③ DCR (registration_endpoint)', d3 && d3.registration_endpoint);

  // ④ krivotvoren token
  const r4 = await fetch(MCP, { method: 'POST', headers: { ...ZAGLAVLJA, Authorization: 'Bearer nije.pravi.token' }, body: INIT });
  rec(r4.status === 401, '④ krivotvoren token → 401 (ne 500, ne podaci)', r4.status);

  console.log('\n  dotaknuto: ' + provjera + ' provjera, palo: ' + palo);
  console.log(palo ? '✗ konektor se s ovim ne može spojiti\n' : '✅ lanac otkrivanja je cijel\n');
  process.exit(palo ? 1 : 0);
})().catch((e) => {
  console.log('✗ sonda je pukla: ' + e.message);
  process.exit(1);
});
