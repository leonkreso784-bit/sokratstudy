// mcp-opoziv-check.js — K/8 (ZAVRSNICA, MCP_SECURITY I8): prekinuta veza i ugašen konektor
// zaustavljaju korisnikov AI ODMAH, ne kad propusnica istekne.
//
// ⚠️ SAMO STAGING. Brana stvara dva jednokratna korisnika i četiri OAuth klijenta, upisuje u popis
//    blokiranih i briše jednog klijenta — sve to počisti (`finally` + `pometi`).
//
// ─── ZAŠTO OVA BRANA POSTOJI ────────────────────────────────────────────────────────────────────
// Izmjereno 15.10. na stagingu pravim AI-tokenom (sonda, prije popravka):
//   • korisnik prekine vezu (`DELETE /auth/v1/user/oauth/grants`) → sesija tokena NESTANE iz
//     `auth.sessions`, pristanak dobije `revoked_at` — a AI i dalje PIŠE u nacrt (200) do isteka
//     propusnice, najviše 3600 s (I8);
//   • administrator obriše OAuth klijent → sesija OSTAJE i AI i dalje piše (200). Jedini „hitni
//     prekidač" koji smo imali nije prekidao ništa.
// Propusnica je potpisan JWT: Auth je ne može povući, pa jedino mjesto gdje opoziv može vrijediti
// odmah je baza, u ogradi kroz koju prolazi SVAKI `mcp_*` RPC (`_nacrt_pozivatelj`).
//
// ─── DOSEG (Leon, anketa 15.10.) ────────────────────────────────────────────────────────────────
// Odmah staju UPIS i ČITANJE KROZ ALATE. `procitaj_materijale` čita `nodes` mimo ograde, pa prvo
// zove `mcp_veza()` (druga anketa 15.10.: zatvori i popis) — kroz konektor tako ne prolazi NIŠTA.
// Izravan REST na vlastite čvorove MIMO konektora (`GET /rest/v1/nodes`, RLS) ostaje do isteka
// propusnice: provjera ondje sjela bi na vrući put SVIH korisnika (odbijeno 20.09.). Brana to
// ispisuje kao poznatu granicu, ne kao tvrdnju.
// Gašenje = vlastiti popis `mcp_blokirani_klijenti` (povratno) + poštuje se i brisanje klijenta u
// dashboardu. Hook se NE dira: on namjerno ne čita nijednu tablicu (greška hooka ruši prijavu svima).
//
// ─── ZAŠTO S KONTROLOM ──────────────────────────────────────────────────────────────────────────
// Odbijanje „svega" bi prošlo svaku tvrdnju o odbijanju. Zato svaki korisnik ima DVA konektora:
// prekid jednoga ne smije dirnuti drugi (provjera je po vezi, ne po korisniku), a odblokiran
// konektor mora opet pisati (blokada je povratna, ne kvar).
//
// Ishod: exit 1 = AI piše/čita poslije prekida, kontrola ne radi ili nešto nije počišćeno ·
//        exit 0 + SKIP = nema STAGING_* u `.env`.

const fs = require('fs');
const os = require('os');
const path = require('path');
const {
  BASE, ANON, SERVICE,
  http, svcHeaders, jeProdukcija, noviKorisnik, pometi, prijava, oauthToken, rpc
} = require('./lib/staging-oauth');
const sqlStaging = require('./sql-staging');
const { lekcija } = require('../tests/fixtures/ugc-sadrzaj');

const TABLICA = 'mcp_blokirani_klijenti';
const KOD = 'nacrt_veza_prekinuta';
const OCEKIVANO_PROVJERA = 24;

let failed = 0;
let touched = 0;
function record(name, pass, detail) {
  touched++;
  if (!pass) failed++;
  console.log(`${pass ? '✅' : '❌'} ${name}${detail ? ' — ' + detail : ''}`);
}
function skip(why) { console.log('⏭️  SKIP — ' + why); process.exit(0); }

/** SQL na STAGINGU kroz `sql:staging` (iste ograde). Vraća redke ZADNJE naredbe koja ih ima. */
async function sql(tekst, oznaka) {
  const dat = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'mcp-opoziv-')), oznaka + '.sql');
  fs.writeFileSync(dat, tekst);
  try {
    const rez = await sqlStaging.izvrsi(sqlStaging.pripremi(sqlStaging.citajEnv(), [dat]));
    return (rez.filter((x) => x.redci).pop() || { redci: [] }).redci;
  } catch (e) {
    throw new Error('SQL „' + oznaka + '" nije prošao: ' + e.message);
  } finally {
    fs.rmSync(path.dirname(dat), { recursive: true, force: true });
  }
}
const navod = (s) => "'" + String(s).replace(/'/g, "''") + "'";

let kljucBr = 0;
const zapocni = (t, ime) => rpc(t, 'mcp_zapocni_nacrt', {
  p_name: ime, p_kljuc: 'k8-' + Date.now() + '-' + (++kljucBr), p_polica: null, p_nova_polica: 'Polica', p_opseg: 'standardno'
});
const poruka = (r) => String((r.json && r.json.message) || r.tekst || '');
const opis = (r) => 'HTTP ' + r.status + ' ' + poruka(r).slice(0, 90);
/** Odbijeno IMENOVANO: ne bilo koji 4xx, nego baš „veza je prekinuta". */
const prekinuto = (r) => (r.status === 401 || r.status === 403) && poruka(r).startsWith(KOD);

(async () => {
  if (!BASE || !ANON) skip('nema STAGING_SUPABASE_URL / STAGING_SUPABASE_ANON u .env');
  if (!SERVICE) skip('nema STAGING_SUPABASE_SERVICE_KEY (brana stvara i briše jednokratne korisnike)');
  if (!sqlStaging.citajEnv().STAGING_DB_URL) skip('nema STAGING_DB_URL u .env (popis blokiranih puni se kroz `sql:staging`)');
  if (jeProdukcija()) { console.log('✗ ODBIJENO: STAGING_SUPABASE_URL pokazuje na PRODUKCIJU.'); process.exit(1); }

  const A = await noviKorisnik({ prefiks: 'mcp-opoziv' });
  const korA = await prijava(A.email, A.password);
  const a1 = await oauthToken(korA, 'Sokrat opoziv A1 (test)');
  const a2 = await oauthToken(korA, 'Sokrat opoziv A2 (test)');

  // ── ① opoziv korisnikom ──────────────────────────────────────────────────────────────────────
  console.log('\n— ① korisnik prekine vezu —');
  const prije = await zapocni(a1.token, 'opoziv prije');
  record('kontrola: prije prekida AI piše', prije.status === 200, opis(prije));
  const nacrt = prije.json;

  const rev = await http('/auth/v1/user/oauth/grants?client_id=' + a1.client_id,
    { method: 'DELETE', headers: { apikey: ANON, Authorization: 'Bearer ' + korA } });
  record('prekid veze prihvaćen (204)', rev.status === 204, 'HTTP ' + rev.status);

  const p1 = await zapocni(a1.token, 'opoziv poslije');
  record('poslije prekida: novi nacrt ODBIJEN (' + KOD + ')', prekinuto(p1), opis(p1));
  const v = await rpc(a2.token, 'mcp_procitaj_nacrt', { p_id: nacrt });
  const p2 = await rpc(a1.token, 'mcp_upisi_nacrt', { p_id: nacrt, p_payload: lekcija({ name: 'Opoziv', learn: { blocks: [{ id: 'p1', type: 'paragraph', text: 'Tekst' }] } }), p_verzija: (v.json && v.json.verzija) || 1 });
  record('poslije prekida: upis u postojeći nacrt ODBIJEN', prekinuto(p2), opis(p2));
  const p3 = await rpc(a1.token, 'mcp_moji_nacrti', {});
  record('poslije prekida: čitanje kroz alat (mcp_moji_nacrti) ODBIJENO', prekinuto(p3), opis(p3));
  const p4 = await rpc(a1.token, 'mcp_procitaj_nacrt', { p_id: nacrt });
  record('poslije prekida: čitanje nacrta ODBIJENO', prekinuto(p4), opis(p4));
  const p5 = await rpc(a1.token, 'mcp_veza', {});
  record('poslije prekida: provjera veze (mcp_veza, prva u procitaj_materijale) ODBIJENA', prekinuto(p5), opis(p5));

  const k1 = await zapocni(a2.token, 'drugi konektor');
  record('kontrola: DRUGI konektor istog korisnika i dalje piše', k1.status === 200, opis(k1));
  const k2 = await rpc(a2.token, 'mcp_moji_nacrti', {});
  record('kontrola: DRUGI konektor i dalje čita', k2.status === 200, 'HTTP ' + k2.status);
  const k3 = await rpc(a2.token, 'mcp_veza', {});
  record('kontrola: DRUGI konektor prolazi provjeru veze (true)', k3.status === 200 && k3.json === true, opis(k3));

  const izravno = await http('/rest/v1/nodes?select=id&limit=1', { headers: { apikey: ANON, Authorization: 'Bearer ' + a1.token } });
  console.log('ℹ️  poznata granica (nije tvrdnja): izravan REST na vlastite čvorove MIMO konektora poslije prekida — HTTP ' +
    izravno.status + ' (vrijedi do isteka propusnice, najviše 3600 s; konektor ga ne koristi bez mcp_veza)');

  // ── ② gašenje konektora: vlastiti popis blokiranih ───────────────────────────────────────────
  console.log('\n— ② konektor na popisu blokiranih —');
  const B = await noviKorisnik({ prefiks: 'mcp-opoziv' });
  const korB = await prijava(B.email, B.password);
  const b1 = await oauthToken(korB, 'Sokrat opoziv B1 (test)');
  const b2 = await oauthToken(korB, 'Sokrat opoziv B2 (test)');

  const ima = await sql(`select to_regclass('public.${TABLICA}') is not null as ima;`, 'ima-tablicu');
  const tablica = !!(ima[0] && ima[0].ima);
  record('tablica ' + TABLICA + ' postoji', tablica);

  const BLOK = [
    'blokiran konektor: novi nacrt ODBIJEN (' + KOD + ')',
    'blokiran konektor: čitanje kroz alat ODBIJENO',
    'kontrola: neblokiran konektor istog korisnika i dalje piše',
    'AI ne vidi popis blokiranih (ni svoj redak)',
    'odblokiran konektor opet piše (blokada je povratna)',
    'blokiran konektor: provjera veze (mcp_veza) ODBIJENA'
  ];
  if (!tablica) {
    for (const ime of BLOK) record(ime, false, 'nema tablice');
  } else {
    try {
      await sql(`insert into public.${TABLICA} (client_id, razlog) values (${navod(b1.client_id)}, 'brana mcp:opoziv');`, 'blokiraj');
      const q1 = await zapocni(b1.token, 'blokiran');
      record(BLOK[0], prekinuto(q1), opis(q1));
      const q2 = await rpc(b1.token, 'mcp_moji_nacrti', {});
      record(BLOK[1], prekinuto(q2), opis(q2));
      const q2v = await rpc(b1.token, 'mcp_veza', {});
      record(BLOK[5], prekinuto(q2v), opis(q2v));
      const q3 = await zapocni(b2.token, 'neblokiran');
      record(BLOK[2], q3.status === 200, opis(q3));
      const q4 = await http('/rest/v1/' + TABLICA + '?select=client_id', { headers: { apikey: ANON, Authorization: 'Bearer ' + b1.token } });
      const q4t = await q4.text();
      record(BLOK[3], q4.status === 401 || q4.status === 403 || q4.status === 404, 'HTTP ' + q4.status + ' ' + q4t.slice(0, 60));
    } finally {
      await sql(`delete from public.${TABLICA} where client_id = ${navod(b1.client_id)};`, 'odblokiraj');
    }
    const q5 = await zapocni(b1.token, 'odblokiran');
    record(BLOK[4], q5.status === 200, opis(q5));
  }

  // ── ③ gašenje konektora: klijent obrisan u dashboardu ────────────────────────────────────────
  console.log('\n— ③ OAuth klijent obrisan (dashboard / admin API) —');
  const del = await http('/auth/v1/admin/oauth/clients/' + b2.client_id, { method: 'DELETE', headers: svcHeaders() });
  record('klijent obrisan (204)', del.status === 204, 'HTTP ' + del.status);
  const r1 = await zapocni(b2.token, 'obrisan klijent');
  record('obrisan klijent: novi nacrt ODBIJEN (' + KOD + ')', prekinuto(r1), opis(r1));
  const r2 = await rpc(b2.token, 'mcp_moji_nacrti', {});
  record('obrisan klijent: čitanje kroz alat ODBIJENO', prekinuto(r2), opis(r2));
  const r3 = await rpc(b2.token, 'mcp_veza', {});
  record('obrisan klijent: provjera veze (mcp_veza) ODBIJENA', prekinuto(r3), opis(r3));

  // ── ④ poruka AI-ju i higijena ────────────────────────────────────────────────────────────────
  console.log('\n— ④ higijena —');
  record('poruka baze ne otkriva RAZLOG (prekid / popis / brisanje izgledaju isto)',
    poruka(p1) === poruka(r1), JSON.stringify(poruka(p1).slice(0, 60)) + ' vs ' + JSON.stringify(poruka(r1).slice(0, 60)));
  const ostalo = tablica
    ? await sql(`select count(*)::int as n from public.${TABLICA} where client_id in (${[a1, a2, b1, b2].map((x) => navod(x.client_id)).join(',')});`, 'ostalo')
    : [{ n: 0 }];
  record('popis blokiranih počišćen', ostalo[0] && ostalo[0].n === 0, 'redaka: ' + (ostalo[0] && ostalo[0].n));

  record('doseg: izvedeno točno ' + OCEKIVANO_PROVJERA + ' provjera', touched + 1 === OCEKIVANO_PROVJERA,
    touched + 1 === OCEKIVANO_PROVJERA ? '' : 'izvedeno ' + (touched + 1));

  await pometi();
  console.log('\n  dotaknuto: ' + touched + ' provjera, palo: ' + failed);
  console.log(failed ? '✗ PREKINUT AI I DALJE RADI\n' : '✅ prekid veze i gašenje konektora vrijede odmah\n');
  process.exit(failed ? 1 : 0);
})().catch(async (e) => {
  await pometi();
  console.log('✗ brana je pukla: ' + e.message);
  process.exit(1);
});
