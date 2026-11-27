// delete-account-check.js — sigurnosni test Edge Functiona `delete-account` (faza „Mjera i zaborav").
// Dokazuje kroz PRAVI HTTP da se korisnik može obrisati SAM i da iza njega ne ostane ništa.
//
// ⚠️ SAMO STAGING. Ovo je HARD-DELETE test → gađanje produkcije je TVRDO zabranjeno
//    (CLAUDE pravilo #8). Provjera je na URL-u, prije ijednog poziva.
//
// ⚠️ Zašto NE koristi postojeći staging test-admin račun: test ga briše. Kad bi gađao
//    `test-admin@sokrat.local`, srušio bi SVE ostale authed testove (`test:authed` ga treba za
//    prijavu). Zato svaki prolaz radi VLASTITOG jednokratnog korisnika i njega briše.
//
// ⚠️ Zašto traži `STAGING_SUPABASE_SERVICE_KEY`: običan `signUp` na stagingu šalje potvrdni
//    mail (provjereno 2026-08-08: `over_email_send_rate_limit`), pa anon ključem nema načina
//    dobiti upotrebljivu sesiju. Jednokratni korisnik se stvara `auth.admin.createUser`
//    s `email_confirm: true`. Isti ključ služi i za NEOVISNU provjeru da je red stvarno nestao —
//    provjeravati brisanje istim identitetom koji je obrisan ne dokazuje ništa.
//
// Ishod:
//   - funkcija briše tuđe / vjeruje `user_id` iz body-ja  -> exit 1  (TVRDI gate)
//   - korisnik ili njegovi podaci prežive brisanje        -> exit 1
//   - nema STAGING_* / SERVICE key u .env                 -> exit 0 + SKIP
//   - baza uspavana / funkcija nije deployana             -> exit 0 + SKIP
//   - sve ispravno                                        -> exit 0 + OK

try { require('dotenv').config(); } catch (e) { /* dotenv optional */ }

const PROD_REF = 'naxjubnedhrbhsuasayu';
const BUCKET = 'node-images';
// F2/2: drugi osobni bucket (avatar + naslovna, JAVAN). Korisnik sa slikom ondje mora biti
// jednako izbrisiv — T5 zato stavlja datoteku u OBA i traži da oba budu prazna.
const PROFILE_BUCKET = 'profile-images';
const FN = 'delete-account';

const BASE = process.env.STAGING_SUPABASE_URL;
const ANON = process.env.STAGING_SUPABASE_ANON;
const SERVICE = process.env.STAGING_SUPABASE_SERVICE_KEY;

// 1x1 PNG — najmanji valjani teret (bucket propušta samo rasterske image MIME-ove).
const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64'
);

let failed = 0;
function record(name, pass, detail) {
  if (!pass) failed++;
  console.log(`${pass ? '✅' : '❌'} ${name}${detail ? ' — ' + detail : ''}`);
}

async function http(path, opts) {
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 20000);
  try { return await fetch(BASE + path, Object.assign({ signal: ctrl.signal }, opts)); }
  finally { clearTimeout(to); }
}

const svcHeaders = () => ({ apikey: SERVICE, Authorization: 'Bearer ' + SERVICE, 'Content-Type': 'application/json' });

/** Jednokratni korisnik, već potvrđen (inače nema sesije — v. napomenu gore). */
async function createThrowaway(tag) {
  const email = `m5a-${tag}-${Date.now()}@sokrat-test.invalid`;
  const password = 'Throwaway-' + Math.random().toString(36).slice(2) + '!9';
  const r = await http('/auth/v1/admin/users', {
    method: 'POST', headers: svcHeaders(),
    body: JSON.stringify({ email, password, email_confirm: true })
  });
  if (!r.ok) throw new Error(`createUser ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const u = await r.json();
  return { id: u.id, email, password };
}

async function signIn(user) {
  const r = await http('/auth/v1/token?grant_type=password', {
    method: 'POST', headers: { apikey: ANON, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: user.email, password: user.password })
  });
  if (!r.ok) throw new Error(`signIn ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return (await r.json()).access_token;
}

async function callFn(token, body) {
  const headers = { apikey: ANON, 'Content-Type': 'application/json' };
  if (token) headers.Authorization = 'Bearer ' + token;
  const r = await http(`/functions/v1/${FN}`, {
    method: 'POST', headers, body: JSON.stringify(body || {})
  });
  let json = null;
  try { json = await r.json(); } catch (e) { /* prazno tijelo */ }
  return { status: r.status, json };
}

/** Postoji li korisnik — provjereno SERVICE ključem, neovisno o obrisanoj sesiji. */
async function userExists(uid) {
  const r = await http(`/auth/v1/admin/users/${uid}`, { headers: svcHeaders() });
  return r.status === 200;
}

async function adminDeleteUser(uid) {
  await http(`/auth/v1/admin/users/${uid}`, { method: 'DELETE', headers: svcHeaders() }).catch(() => {});
}

async function main() {
  // Provjere su namjerno u DVIJE razine. Odbijanje neovlaštenog poziva (T1–T3) je sigurnosno
  // svojstvo i ne treba nikakav povlašteni ključ — kad bi cijela skripta preskakala bez
  // `SERVICE`, ta bi svojstva bila netestirana upravo ondje gdje ih je najlakše izgubiti.
  if (!BASE || !ANON) {
    console.log('SKIP: nema STAGING_SUPABASE_URL/ANON u .env — preskačem.');
    return 0;
  }
  if (BASE.includes(PROD_REF)) {
    console.error('ABORT: delete-account-check je HARD-DELETE test i NE SMIJE gađati produkciju.');
    return 1;
  }
  console.log('delete-account check protiv', BASE, '\n');

  // ── T0: je li funkcija uopće deployana? (bez toga sve ostalo laže) ──
  const probe = await callFn(null, {});
  if (probe.status === 404) { console.log('SKIP: funkcija `' + FN + '` nije deployana na ovaj projekt.'); return 0; }
  if (probe.status >= 500 && !probe.json) { console.log(`SKIP: status ${probe.status} (baza možda spava).`); return 0; }

  // ── T1: bez tokena se ne briše ništa ──
  // Traži se BAŠ `missing_token`, ne samo status 401. Platforma ima vlastitu JWT-branu
  // (`verify_jwt`), pa bi „samo 401" prolazio i kad bi netko obrisao provjeru IZ funkcije —
  // test bi zelenio na tuđoj zaštiti. Ovaj kod dolazi isključivo iz našeg koda.
  record('bez tokena → odbija NAŠA provjera (ne samo gateway)',
    probe.status === 401 && !!(probe.json && probe.json.error === 'missing_token'),
    `status ${probe.status} ${JSON.stringify(probe.json || {})}`);

  // ── T2: neispravan token se ne prihvaća ── (ovdje presudi gateway, i to je u redu)
  const bad = await callFn('not-a-real-jwt', {});
  record('neispravan token → odbijeno', bad.status === 401, `status ${bad.status}`);

  // ── T3: GET se ne prihvaća (brisanje ne smije biti idempotentan link) ──
  const getRes = await http(`/functions/v1/${FN}`, { headers: { apikey: ANON } });
  record('GET → odbijeno', getRes.status === 405 || getRes.status === 401, `status ${getRes.status}`);

  // Sve ispod je HARD-DELETE i traži jednokratne korisnike → bez `service_role` ne ide.
  if (!SERVICE) {
    console.log('\n⏭  T4/T5 (stvarno brisanje) preskočeni: nema STAGING_SUPABASE_SERVICE_KEY u .env.');
    console.log('   Dodaj ga (Supabase → sokrat-staging → Settings → API → service_role) pa ponovi —');
    console.log('   bez toga se jednokratni korisnik ne može stvoriti (signUp traži potvrdu maila).');
    return failed ? 1 : 0;
  }

  // ── T4: ESKALACIJA — `user_id` iz body-ja se NE SMIJE poslušati ──
  // Zovemo kao ŽRTVA, ali u tijelu tražimo brisanje NAPADAČA. Ako funkcija vjeruje body-ju,
  // napadač nestane a žrtva preživi — točno obrnuto od ispravnog ishoda.
  const attacker = await createThrowaway('attacker');
  const victim = await createThrowaway('victim');
  try {
    const vToken = await signIn(victim);
    const res = await callFn(vToken, { user_id: attacker.id });
    record('poziv s tuđim user_id u tijelu → prolazi (ali kao pozivatelj)', res.status === 200, `status ${res.status}`);
    record('ŽRTVA (pozivatelj) je obrisana', !(await userExists(victim.id)));
    record('NAPADAČ iz tijela je NETAKNUT — body se ne sluša', await userExists(attacker.id));
  } finally {
    await adminDeleteUser(attacker.id);
    await adminDeleteUser(victim.id);
  }

  // ── T5: PUNO BRISANJE — korisnik sa slikom i napretkom ne smije ostaviti trag ──
  const user = await createThrowaway('full');
  let leftovers = 'nije provjereno';
  try {
    const token = await signIn(user);
    const asUser = { apikey: ANON, Authorization: 'Bearer ' + token };

    // Napredak (kaskada `progress.user_id`).
    await http('/rest/v1/progress', {
      method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json' }, asUser),
      body: JSON.stringify({ user_id: user.id, key: 'm5a-check', value: { n: 1 } })
    });
    // Materijal (kaskada `nodes.owner_id` → node_content → versions).
    const cn = await http('/rest/v1/rpc/create_node', {
      method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json' }, asUser),
      body: JSON.stringify({ p_parent: null, p_kind: 'study', p_name: 'M5a check' })
    });
    const nodeId = cn.ok ? await cn.json() : null;
    // H1 (2026-09-29): materijal se mora i OBJAVITI. Tek objava upiše redak u
    // `node_content_versions` s `edited_by` = korisnik — a upravo taj stupac je bez `on delete`
    // rušio `deleteUser` („Database error deleting user"), POSLIJE brisanja slika → poluobrisan
    // račun. Do H1 je T5 stvarao samo prazan čvor i prolazio na slučaju koji ne dira taj stupac.
    const verRes = nodeId ? await http(`/rest/v1/node_content?node_id=eq.${nodeId}&select=version`, { headers: asUser }) : null;
    const baseVersion = verRes && verRes.ok ? ((await verRes.json())[0] || {}).version : null;
    const pub = await http('/rest/v1/rpc/publish_node', {
      method: 'POST', headers: Object.assign({ 'Content-Type': 'application/json' }, asUser),
      body: JSON.stringify({ p_node_id: nodeId, p_payload: { lekcija: { name: 'H1', flashcards: [{ question: 'H1', answer: 'provjera' }] } }, p_base_version: baseVersion })
    });
    const autorski = await http(`/rest/v1/node_content_versions?edited_by=eq.${user.id}&select=id`, { headers: svcHeaders() })
      .then((r) => r.ok ? r.json() : null).catch(() => null);
    // Bez ovoga bi T5 opet mogao zelenjeti na praznom slučaju (npr. kad se okidač promijeni).
    record('priprema: materijal objavljen i povijest nosi autora', pub.ok && Array.isArray(autorski) && autorski.length > 0,
      `publish ${pub.status}, verzija s autorom: ${autorski ? autorski.length : '?'}`);
    // Slika u VLASTITOM prefiksu — bez njenog brisanja `deleteUser` PUCA (Supabase odbija
    // obrisati vlasnika objekata u Storageu). Ovo je jezgra testa, ne kozmetika.
    const imgPath = `${user.id}/probe/one.png`;
    const up = await http(`/storage/v1/object/${BUCKET}/${imgPath}`, {
      method: 'POST', headers: Object.assign({ 'Content-Type': 'image/png' }, asUser), body: PNG
    });
    record('priprema: slika uploadana u vlastiti prefiks', up.ok, `status ${up.status}`);
    // Avatar u JAVNOM bucketu (F2/2) — isti vlasnik, drugi bucket. Izmjereno 13.09. protiv
    // funkcije koja ga NIJE čistila: `deleteUser` NE pada, korisnik nestane, a avatar ostane
    // JAVNO dostupno siroče — GDPR-rupa, ne kvar brisanja. Zato se ovdje ne traži samo 200,
    // nego da je i ovaj bucket prazan.
    const avatarPath = `${user.id}/avatar/one.png`;
    const upAv = await http(`/storage/v1/object/${PROFILE_BUCKET}/${avatarPath}`, {
      method: 'POST', headers: Object.assign({ 'Content-Type': 'image/png' }, asUser), body: PNG
    });
    record('priprema: avatar uploadan u profile-images', upAv.ok, `status ${upAv.status}`);

    const res = await callFn(token, {});
    record('brisanje računa → 200', res.status === 200, `status ${res.status} ${JSON.stringify(res.json || {})}`);
    record('funkcija javlja koliko je slika obrisala (oba bucketa)', !!(res.json && res.json.removedImages >= 2),
      `removedImages=${res.json ? res.json.removedImages : '?'}`);

    record('korisnik više ne postoji', !(await userExists(user.id)));

    // Neovisna provjera SERVICE ključem: kaskada je odnijela sve, slika je nestala.
    const q = async (p) => {
      const r = await http(p, { headers: svcHeaders() });
      return r.ok ? (await r.json()) : null;
    };
    const prog = await q(`/rest/v1/progress?user_id=eq.${user.id}&select=key`);
    const nodes = await q(`/rest/v1/nodes?owner_id=eq.${user.id}&select=id`);
    const objs = await http(`/storage/v1/object/list/${BUCKET}`, {
      method: 'POST', headers: svcHeaders(), body: JSON.stringify({ prefix: user.id, limit: 100 })
    }).then((r) => r.ok ? r.json() : null).catch(() => null);

    record('napredak je nestao (kaskada)', Array.isArray(prog) && prog.length === 0, `redaka: ${prog ? prog.length : '?'}`);
    record('materijali su nestali (kaskada)', Array.isArray(nodes) && nodes.length === 0, `redaka: ${nodes ? nodes.length : '?'}`);
    const vers = await q(`/rest/v1/node_content_versions?edited_by=eq.${user.id}&select=id`);
    record('povijest materijala je nestala (kaskada preko čvora)', Array.isArray(vers) && vers.length === 0, `redaka: ${vers ? vers.length : '?'}`);
    record('slike su nestale (Storage purge)', Array.isArray(objs) && objs.length === 0, `objekata: ${objs ? objs.length : '?'}`);
    const objsAv = await http(`/storage/v1/object/list/${PROFILE_BUCKET}`, {
      method: 'POST', headers: svcHeaders(), body: JSON.stringify({ prefix: user.id, limit: 100 })
    }).then((r) => r.ok ? r.json() : null).catch(() => null);
    record('avatar je nestao (profile-images purge)', Array.isArray(objsAv) && objsAv.length === 0, `objekata: ${objsAv ? objsAv.length : '?'}`);
    leftovers = 'provjereno';
  } finally {
    // Za slučaj da je test pao prije brisanja. Čvorovi idu PRVI: dok postoji verzija s
    // `edited_by`, stari FK ruši i admin-brisanje — bez ovoga bi crven T5 ostavio smeće na stagingu.
    await http(`/rest/v1/nodes?owner_id=eq.${user.id}`, { method: 'DELETE', headers: svcHeaders() }).catch(() => {});
    await adminDeleteUser(user.id);
  }
  void leftovers;

  // ── T6: ADMIN se ne može obrisati sam, i pokušaj NE SMIJE ništa promijeniti ──
  // Bez guarda bi adminu nestale osobne slike, a `deleteUser` bi pao jer i dalje posjeduje
  // objekte u `lesson-images` → poluobrisan račun. Zato se ne provjerava samo status 409,
  // nego i da su korisnik I slika ostali NETAKNUTI (sve-ili-ništa).
  const adminUser = await createThrowaway('admin');
  const imgPath = `${adminUser.id}/probe/keep.png`;
  try {
    await http('/rest/v1/profiles?user_id=eq.' + adminUser.id, {
      method: 'PATCH',
      headers: Object.assign({ Prefer: 'return=minimal' }, svcHeaders()),
      body: JSON.stringify({ role: 'admin' })
    });
    // ⚠️ PATCH koji ne pogodi NIJEDAN redak i dalje vraća 2xx. Da `handle_new_user` ne stvori
    // profil, cijeli bi T6 tiho testirao običnog korisnika i „prolazio" bez ikakvog značenja.
    // Zato se uloga ČITA NATRAG.
    const back = await http(`/rest/v1/profiles?user_id=eq.${adminUser.id}&select=role`, { headers: svcHeaders() })
      .then((x) => x.ok ? x.json() : null).catch(() => null);
    record('priprema: test-korisnik STVARNO ima role=admin',
      Array.isArray(back) && back.length === 1 && back[0].role === 'admin',
      `procitano: ${JSON.stringify(back)}`);

    const token = await signIn(adminUser);
    const up = await http(`/storage/v1/object/${BUCKET}/${imgPath}`, {
      method: 'POST',
      headers: { apikey: ANON, Authorization: 'Bearer ' + token, 'Content-Type': 'image/png' },
      body: PNG
    });
    record('priprema: adminova osobna slika uploadana', up.ok, `status ${up.status}`);

    const res = await callFn(token, {});
    record('admin → brisanje ODBIJENO (409)', res.status === 409,
      `status ${res.status} ${JSON.stringify(res.json || {})}`);
    record('admin i dalje postoji', await userExists(adminUser.id));

    // `list` s prefiksom `<uid>` vratio bi MAPU `probe`, ne datoteku → gledamo razinu dublje,
    // inače bi tvrdnja prolazila i da je datoteka obrisana a mapa ostala.
    const objs = await http(`/storage/v1/object/list/${BUCKET}`, {
      method: 'POST', headers: svcHeaders(),
      body: JSON.stringify({ prefix: `${adminUser.id}/probe`, limit: 100 })
    }).then((x) => x.ok ? x.json() : null).catch(() => null);
    record('adminova slika NIJE dirnuta (sve-ili-ništa)',
      Array.isArray(objs) && objs.some((o) => o.name === 'keep.png'),
      `sadrzaj: ${JSON.stringify((objs || []).map((o) => o.name))}`);
  } finally {
    // Guard je upravo dokazao da se ovaj račun ne briše sam — pa ga čistimo service-ključem.
    await http(`/storage/v1/object/${BUCKET}/${imgPath}`, { method: 'DELETE', headers: svcHeaders() }).catch(() => {});
    await adminDeleteUser(adminUser.id);
  }

  console.log('');
  if (failed) { console.error(`❌ ${failed} provjera palo.`); return 1; }
  console.log('✅ delete-account: korisnik se briše sam i ne ostavlja trag.');
  return 0;
}

main().then((c) => process.exit(c)).catch((e) => {
  console.error('GREŠKA:', e && e.message ? e.message : e);
  process.exit(1);
});
