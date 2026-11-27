// mcp-granice-check.js — K/7 (ZAVRSNICA): VRIJEME upita korisnikovog AI-ja ima vlastitu granicu (N16).
//
// ⚠️ SAMO STAGING. Brana stvara jednokratnog korisnika i PRIVREMENU funkciju u bazi, pa oboje briše.
//    URL i `STAGING_DB_URL` provjeravaju se prije ijednog poziva (CLAUDE pravilo #8).
//
// ─── ZAŠTO OVA BRANA POSTOJI ────────────────────────────────────────────────────────────────────
// `pg_roles` je 30.09. pokazao `anon` 3 s, `authenticated` 8 s, a `mcp_klijent` NIŠTA (N16). Uloga
// AI-ja tada nasljeđuje 8 s od `authenticator` — ali to je bila PRETPOSTAVKA: PostgREST postavke
// impersonirane uloge primjenjuje sam, po transakciji, i tek nakon `NOTIFY pgrst, 'reload config'`.
// Redak u `pg_roles` zato NIJE dokaz da granica vrijedi za AI. Dokaz je upit koji kroz PRAVI OAuth
// token traje dulje od granice i bude prekinut.
//
// ─── KAKO MJERI (i zašto baš tako) ──────────────────────────────────────────────────────────────
// Nijedan postojeći RPC ne zna ni pokazati postavku ni namjerno trajati, a trajni „čekaj N sekundi"
// RPC za AI bio bi otvoren put da troši bazu. Zato SONDA živi samo dok brana traje: `sql:staging`
// je stvori (izvršiti smiju `mcp_klijent` i `authenticated`), brana je zove, pa je briše — i u
// `finally`, i provjerava da je stvarno nestala (404). Ostane li ipak, `mcp:brava` inventar je vidi.
//
// Ista sonda zove se s DVA tokena istog korisnika. Bez kontrole bi „5s" moglo doći odbilo čega
// (npr. postavke baze), i brana bi bila zelena a da uloga AI-ja nema nikakvu vlastitu granicu:
//   ① kontrola: korisnikov token (`authenticated`) čita 8s i 6 s čekanja PROLAZI
//   ② AI token (`mcp_klijent`) čita 5s, a 6 s čekanja PREKINE baza (57014) za oko 5 s
//
// Ishod: exit 1 = granica ne drži ili sonda nije počišćena · exit 0 + SKIP = nema STAGING_* u `.env`.

const fs = require('fs');
const os = require('os');
const path = require('path');
const {
  BASE, ANON, SERVICE,
  jeProdukcija, noviKorisnik, pometi, prijava, oauthToken, rpc
} = require('./lib/staging-oauth');
const sqlStaging = require('./sql-staging');

const ULOGA_AI = 'mcp_klijent';
const GRANICA_AI = '5s';          // f6-mcp-brava.sql §1b — mijenja li se tamo, mijenja se i ovdje
const GRANICA_KORISNIK = '8s';    // Supabase zadano za `authenticated` (kontrola, ne naša postavka)
const CEKANJE_S = 6;              // između 5 i 8: AI mora biti prekinut, korisnik ne
const SONDA = 'k7_sonda_vrijeme';

const OCEKIVANO_PROVJERA = 8;

let failed = 0;
let touched = 0;
function record(name, pass, detail) {
  touched++;
  if (!pass) failed++;
  console.log(`${pass ? '✅' : '❌'} ${name}${detail ? ' — ' + detail : ''}`);
}
function skip(why) { console.log('⏭️  SKIP — ' + why); process.exit(0); }

/** Izvrši SQL na STAGINGU kroz `sql:staging` (iste ograde; ništa se ne zaobilazi). Cijeli tekst = jedna transakcija. */
async function sql(tekst, oznaka) {
  const dat = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'mcp-granice-')), oznaka + '.sql');
  fs.writeFileSync(dat, tekst);
  try {
    await sqlStaging.izvrsi(sqlStaging.pripremi(sqlStaging.citajEnv(), [dat]));
  } catch (e) {
    throw new Error('SQL „' + oznaka + '" nije prošao: ' + e.message);
  } finally {
    fs.rmSync(path.dirname(dat), { recursive: true, force: true });
  }
}

const STVORI = `
create or replace function public.${SONDA}(p_s double precision)
returns text
language plpgsql
security invoker
as $$
begin
  perform pg_catalog.pg_sleep(p_s);
  return pg_catalog.current_setting('statement_timeout');
end;
$$;
revoke all on function public.${SONDA}(double precision) from public, anon;
grant execute on function public.${SONDA}(double precision) to ${ULOGA_AI}, authenticated;
notify pgrst, 'reload schema';
`;
const OBRISI = `
drop function if exists public.${SONDA}(double precision);
notify pgrst, 'reload schema';
`;

/** Čeka da PostgREST vidi (ili prestane vidjeti) sondu — `reload schema` je asinkron. */
async function cekajSondu(token, postoji) {
  for (let i = 0; i < 30; i++) {
    const r = await rpc(token, SONDA, { p_s: 0 });
    if (postoji ? r.status === 200 : r.status === 404) return r;
    await new Promise((res) => setTimeout(res, 500));
  }
  return rpc(token, SONDA, { p_s: 0 });
}

async function poziv(token, s) {
  const t0 = Date.now();
  const r = await rpc(token, SONDA, { p_s: s });
  return { r, ms: Date.now() - t0 };
}
const kod = (r) => (r.json && r.json.code) || '';
const opis = (x) => 'HTTP ' + x.r.status + (kod(x.r) ? ' ' + kod(x.r) : '') + ' · ' + (x.ms / 1000).toFixed(1) + ' s';

(async () => {
  if (!BASE || !ANON) skip('nema STAGING_SUPABASE_URL / STAGING_SUPABASE_ANON u .env');
  if (!SERVICE) skip('nema STAGING_SUPABASE_SERVICE_KEY (brana stvara i briše jednokratnog korisnika)');
  if (!sqlStaging.citajEnv().STAGING_DB_URL) skip('nema STAGING_DB_URL u .env (sonda se stvara kroz `sql:staging`)');
  if (jeProdukcija()) { console.log('✗ ODBIJENO: STAGING_SUPABASE_URL pokazuje na PRODUKCIJU.'); process.exit(1); }

  const A = await noviKorisnik({ prefiks: 'mcp-granice' });
  const korisnik = await prijava(A.email, A.password);
  const ai = await oauthToken(korisnik, 'Sokrat granice (test)');
  console.log('uloga u AI tokenu: ' + ai.claims.role);

  let stvorena = false;
  try {
    await sql(STVORI, 'sonda-stvori');
    stvorena = true;
    const vidi = await cekajSondu(korisnik, true);
    record('sonda je vidljiva kroz PostgREST', vidi.status === 200, 'HTTP ' + vidi.status + ' ' + vidi.tekst.slice(0, 80));

    console.log('\n— ① kontrola: korisnikov token (authenticated) —');
    const k0 = await poziv(korisnik, 0);
    record('korisnik čita statement_timeout = ' + GRANICA_KORISNIK, k0.r.json === GRANICA_KORISNIK, opis(k0) + ' · ' + JSON.stringify(k0.r.json));
    const k6 = await poziv(korisnik, CEKANJE_S);
    record('korisnik: ' + CEKANJE_S + ' s čekanja PROLAZI (granica sonde je uloga, ne sama sonda)', k6.r.status === 200, opis(k6));

    console.log('\n— ② AI token (' + ULOGA_AI + ') —');
    record('AI token nosi ulogu ' + ULOGA_AI, ai.claims.role === ULOGA_AI, 'role = ' + ai.claims.role);
    const a0 = await poziv(ai.token, 0);
    record('AI čita statement_timeout = ' + GRANICA_AI, a0.r.json === GRANICA_AI, opis(a0) + ' · ' + JSON.stringify(a0.r.json));
    const a6 = await poziv(ai.token, CEKANJE_S);
    record('AI: ' + CEKANJE_S + ' s čekanja PREKINUTO (57014) prije ' + CEKANJE_S + ' s',
      kod(a6.r) === '57014' && a6.ms < CEKANJE_S * 1000, opis(a6));
  } finally {
    if (stvorena) {
      try { await sql(OBRISI, 'sonda-obrisi'); } catch (e) { console.log('⚠️  brisanje sonde: ' + e.message); }
    }
  }

  console.log('\n— ③ higijena —');
  const nema = await cekajSondu(korisnik, false);
  record('sonda obrisana (PostgREST je više ne vidi)', nema.status === 404, 'HTTP ' + nema.status);

  record('doseg: izvedeno točno ' + OCEKIVANO_PROVJERA + ' provjera', touched + 1 === OCEKIVANO_PROVJERA,
    touched + 1 === OCEKIVANO_PROVJERA ? '' : 'izvedeno ' + (touched + 1));

  await pometi();
  console.log('\n  dotaknuto: ' + touched + ' provjera, palo: ' + failed);
  console.log(failed ? '✗ GRANICA VREMENA NE DRŽI\n' : '✅ granica vremena drži\n');
  process.exit(failed ? 1 : 0);
})().catch(async (e) => {
  await pometi();
  console.log('✗ brana je pukla: ' + e.message);
  process.exit(1);
});
