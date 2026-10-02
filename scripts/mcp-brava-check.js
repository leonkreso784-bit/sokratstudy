// mcp-brava-check.js — BRAVA nad tokenom korisnikovog AI-ja (F6 ①/2, ADR-038 ④).
// Dokazuje kroz PRAVI OAuth 2.1 token da AI smije SAMO ono što mu je izričito otvoreno.
//
// ⚠️ SAMO STAGING. Test piše i na kraju BRIŠE jednokratnog korisnika → gađanje produkcije je
//    TVRDO zabranjeno (CLAUDE pravilo #8). Provjera je na URL-u, prije ijednog poziva.
//
// ─── ZAŠTO OVA BRANA POSTOJI ────────────────────────────────────────────────────────────────────
// Supabase OAuth token nije poseban: to je OBIČAN korisnički JWT uz claim `client_id` (izmjereno
// 17.09., RASPORED §F6). `aud` ostaje `authenticated` → token nije vezan na naš poslužitelj, a tko
// ga drži (broker Anthropica/OpenAI-ja, ne model) smije SVE što i prijavljeni korisnik: objaviti
// preko `publish_node`, obrisati čvor, uzeti `handle`, uploadati sliku, obrisati račun. ADR-038 ④
// zato presuđuje: **sigurnost je u bazi** — token s `client_id` dobiva vlastitu Postgres ulogu
// (`mcp_klijent`) kojoj je sve zabranjeno dok se izričito ne otvori.
//
// ─── ZAŠTO BEZ PREGLEDNIKA (i zašto to nije bilo očito) ─────────────────────────────────────────
// Plan je pretpostavljao da odobrenje mora kliknuti Playwright. Ne mora: `approveAuthorization` u
// supabase-js je samo `POST /auth/v1/oauth/authorizations/<id>/consent` s korisnikovim JWT-om.
// Dva izmjerena pravila toka (18.09.), oba puta krivo pogođena iz prve:
//   • `consent` BEZ prethodnog `GET /oauth/authorizations/<id>` vraća **404** — GET nije
//     informativan poziv nego korak toka (isti redoslijed koji vozi `js/odobrenje.js`);
//   • ako za taj par (klijent, scope) veza VEĆ postoji, autorizacija se odobri sama i `consent`
//     vrati **400 „no longer pending"** → zato svaki prolaz registrira SVJEŽ DCR klijent.
//
// ─── ZAŠTO SE SVAKI RPC ZOVE TOČNIM POTPISOM ────────────────────────────────────────────────────
// Izmjereno: odbijen RPC, nepostojeći RPC i RPC s krivim argumentima vraćaju ISTI odgovor
// (404 `PGRST202`). Gate koji zove `rpc(ime, {})` zato ne mjeri bravu nego vlastitu nespretnost —
// bio bi zelen i da je sve otvoreno. Potpisi ispod prepisani su iz `supabase/*.sql`, a
// `provjeriInventar()` pada ako se u SQL-u pojavi funkcija koju ovdje nitko nije klasificirao.
//
// ─── ZAŠTO JEDNOKRATNI KORISNIK, A ZA JEDNU PROVJERU ADMIN ──────────────────────────────────────
// Test na kraju zove `delete-account`, koja briše (kalup: `delete-account-check.js`); da gađa
// `test-admin@sokrat.local`, srušio bi sve authed testove. IZNIMKA je `send-notification`: ona
// traži `is_admin()`, pa bi jednokratni korisnik dobio 403 i bez brave — dokaz ni o čemu. Ta se
// provjera radi tokenom ADMINA i s NAMJERNO neispravnim tijelom: na starom kodu prođe admin-vrata
// i padne na `400` (mail se NE šalje), s bravom staje ranije na `403`. Razlika 400 → 403 je dokaz.
//
// ─── ŠTO SVJESNO OSTAJE OTVORENO ────────────────────────────────────────────────────────────────
// `PUT /auth/v1/user` ide na Auth API, ne kroz Postgres → brava u bazi ga NE doseže. Zatvara ga
// postavka „traži trenutnu lozinku" (①/2b, staging 21.09.) — ali SAMO za lozinku. Zato se svako
// polje mjeri posebno (`AUTH_POLJA`): lozinka mora biti odbijena, a `data`/`email` su IMENOVANO
// otvoreni i mjere se da popis ne zastari. Ista provjera pazi i da brava ne ubije KORISNIKA:
// promjena s točnom lozinkom i oporavak računa mailom moraju proći.
//
// Ishod:
//   - bilo koji zabranjeni put PROĐE                     -> exit 1  (TVRDI gate)
//   - dopušteni put (MCP alat, čitanje vlastitog) PADNE  -> exit 1  (brava koja ubija i MCP)
//   - u SQL-u postoji nerazvrstana funkcija              -> exit 1  (inventar)
//   - nema STAGING_* / SERVICE key u .env                -> exit 0 + SKIP
//   - baza uspavana / funkcija nije deployana            -> exit 0 + SKIP

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const {
  PROD_REF, BASE, ANON, SERVICE, NULA,
  http, svcHeaders, ref, odbijen, noviKorisnik, pometi, prijava, oauthToken, rpc
} = require('./lib/staging-oauth');

const ADMIN_EMAIL = process.env.STAGING_TEST_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.STAGING_TEST_ADMIN_PASSWORD;
const ULOGA = 'mcp_klijent';

/**
 * Koliko provjera ova brana MORA izvesti (bez ove same). Čegrtaljka po kalupu `check:final`.
 * Povod: blok o korisniku koji nije zaključan preskakao se uz običan `note()`, koji ne diže
 * brojač — ukupno bi palo s 41 na 38, a brana bi i dalje javila „✅ brava drži".
 * Podiže se SVJESNO, uz novu provjeru; spuštanje bez razloga znači da je nešto tiho otpalo.
 */
// 41 → 45 (②/1, 29.09.): mrtav redak otvorenih funkcija + tri pomoćnika nacrta u ZABRANJENI_RPC.
const OCEKIVANO_PROVJERA = 56;   // +2 (②/0a): _ugc_shema, _provjeri_sadrzaj · +1 (②/1b F4): jedan potpis po otvorenom imenu · +4 (②/4.1): prihvat, odbacivanje, dva pomoćnika · +1 (②/4.3′): `_nacrt_u_materijal` · +3 (②/4b): tri pomoćnika izmjene

/**
 * `PUT /auth/v1/user` — ŠTO POSTAVKA „traži trenutnu lozinku" ZATVARA, A ŠTO NE (①/2b, 21.09.).
 *
 * Do ①/2b je ovdje stajala zastavica `OCEKUJ.authApiZatvoren`, uz plan da nakon postavke ode na
 * `true`. ⚠️ **Mjerenje je taj plan oborilo:** postavka vrijedi **samo za promjenu lozinke**, a
 * sonda te zastavice slala je `data: {…}` — METAPODATKE, koje postavka uopće ne dira. `true` bi
 * dakle tvrdio da je Auth API zatvoren, a to nije istina. Brana koja tvrdi više nego što mjeri
 * gora je od rupe koja je uredno zapisana.
 *
 * Zato ovdje stoji popis POLJA, ne zastavica, i **svaki se redak stvarno izvede**: svaki nosi
 * TOČAN očekivani odgovor (`ocekuj`), pa se mjeri jednako u oba smjera — put koji se otvorio
 * pada, i put koji se zatvorio pada (mrtav unos). `zatvoreno` je samo oznaka za izvještaj, da
 * čitatelj odmah vidi je li redak brava ili imenovana rupa.
 *
 * ⚠️ Zašto očekivanje nosi i KOD, ne samo HTTP broj: zatvorena lozinka i otvoren e-mail oba
 * vraćaju **400**. Brana koja gleda samo broj ovdje bi bila zeleno-slijepa, isti razred kao
 * `PGRST202` niže.
 *
 * ⚠️ Granica koju ovaj popis NE prelazi: Auth API nije Postgres i nema kataloga iz kojeg bi se
 * polja sama nabrojala (za razliku od `OTVORENO` niže, koji dolazi iz `mcp_brava_inventar()`).
 * Polje koje GoTrue doda sutra ovdje se NEĆE pojaviti samo. Poznata granica, ne previd.
 */
const AUTH_POLJA = [
    {
        ime: 'password BEZ current_password',
        tijelo: () => ({ password: 'AI-Preuzima-' + crypto.randomBytes(4).toString('hex') + '!9' }),
        zatvoreno: true,
        ocekuj: { status: 400, kod: 'current_password_required' },
        zasto: '①/2b — postavka „traži trenutnu lozinku"; AI lozinku korisnika ne zna'
    },
    {
        ime: 'password s POGREŠNOM current_password',
        tijelo: () => ({
            password: 'AI-Preuzima-' + crypto.randomBytes(4).toString('hex') + '!9',
            current_password: 'OvoSigurnoNijeTocno!123'
        }),
        zatvoreno: true,
        ocekuj: { status: 400, kod: 'current_password_invalid' },
        zasto: 'provjera je STVARNA, a ne samo „polje je obavezno" — pogađanje ne prolazi'
    },
    {
        ime: 'data (metapodaci)',
        // ⚠️ `biljeg` se POSLIJE traži u odgovoru: `ocekuj {200, ''}` sam po sebi svodi se na
        // „status je 200", pa bi i PRAZAN zahtjev (`{}`) prošao jednako — a onda redak ne bi
        // dokazivao da je rupa otvorena, nego samo da poslužitelj odgovara.
        biljeg: 'brava_proba',
        tijelo: () => ({ data: { brava_proba: Date.now() } }),
        zatvoreno: false,
        ocekuj: { status: 200, kod: '' },
        zasto: 'metapodatke korisnik smije pisati i sam (tema, zrcaljena putanja avatara); postavka o lozinci ih NE dira. `role` ondje ne živi (ADR-024), a `is_admin()` ne čita `user_metadata`.'
    },
    {
        ime: 'email',
        // NAMJERNO neispravna adresa: proba mjeri smije li token UOPĆE pokušati promjenu maila i
        // NE šalje nijedan mail. `400 email_address_invalid` = prošao autorizaciju pa pao na
        // obliku → put je OTVOREN. `401/403` bi značilo da se zatvorio → mrtav unos.
        tijelo: () => ({ email: 'brava-proba-' + Date.now() + '@sokrat-test.invalid' }),
        zatvoreno: false,
        // ⚠️ DVA prihvatljiva ishoda, i to nije popuštanje nego NALAZ iz obrnute provjere: na
        // ponovljenim vrtnjama GoTrue vrati `429 over_email_send_rate_limit` umjesto provjere
        // oblika. Oba ishoda dokazuju ISTO — zahtjev je prošao autorizaciju i ušao u mail-put;
        // „zatvoreno" bi ovdje izgledalo kao **401/403**. Da popis prima samo prvi ishod, brana
        // bi crvenila na svakoj drugoj vrtnji unutar prozora — a lažna se uzbuna „popravlja"
        // tako da se brana prestane čitati.
        ocekuj: [
            { status: 400, kod: 'email_address_invalid' },
            { status: 429, kod: 'over_email_send_rate_limit' }
        ],
        // ⚠️ 429 stiže iz GoTrueovog MAIL-limitera, a ne iz provjere prava — pa sam po sebi
        // dokazuje samo da zahtjev nije odbijen prije njega. Da ne zamijeni dokaz tišinom, uz
        // njega ide KONTROLA: isti zahtjev s neispravnim tokenom mora dati 401. Ako i on dobije
        // 429, limiter stoji ISPRED identiteta i ovaj redak tada ne dokazuje ništa → prijavljuje
        // se kao NEMJEREN, ne kao prošao (SKIP nije PASS).
        kontrolaNaLimitu: true,
        zasto: 'promjenu maila postavka o lozinci ne pokriva — ali preuzimanje računa zatvara DRUGA postavka, `Secure email change`, koja traži potvrdu s OBJE adrese. ⚠️ IZMJERENO 2026-09-22, dvjema neovisnim metodama, i UKLJUČENA je na stagingu I na produkciji (vidi PROGRESS 22.09.). ⚠️ Ovdje se i dalje NE MJERI: to je postavka u dashboardu koju nijedna brana ne gleda, pa se može isključiti a da ništa ne pocrveni → imenovan korak u F7.'
    }
];

/**
 * JEDINI izričito otvoreni putovi za ulogu `mcp_klijent` (①/2c-1).
 *
 * Do 18.09. je brana držala popis ZABRANJENOG — dokazivala je, dakle, da je zatvoreno ono čega se
 * netko sjetio nabrojati. Audit je našao tri rupe TE vrste i nijednu u samoj bravi, pa je popis
 * okrenut: `mcp_brava_inventar()` nabroji SVE što u bazi postoji, a ovdje stoji ono malo što smije.
 * Nova tablica, novi RPC ili zalutali `grant` time obore branu PO DEFAULTU — bez da se itko sjetio
 * dopisati ih.
 *
 * ⚠️ Svaka cigla koja nešto otvara (②/1 `node_drafts`, ②/2 čitanje gradiva…) dopisuje redak OVDJE,
 *    s razlogom. Taj je redak ujedno i dokumentacija te dozvole.
 */
const OTVORENO = {
  sheme: {
    public: 'ulaz u shemu — bez njega PostgREST ulozi ne vidi ništa (①/2)'
  },
  tablice: {
    nodes: { prava: ['select'], zasto: 'RLS `nodes_select_own` → samo vlastiti čvorovi (①/2)' }
  },
  // ②/1 (29.09.): jedini put upisa za AI — u NACRT, nikad u žive tablice (ADR-038 ①). Što te
  // funkcije smiju i ne smiju (tuđi nacrt, kvota, veličina, predan = zamrznut) mjeri `mcp:nacrt`;
  // ova brana tvrdi samo da je otvoreno TOČNO ovo.
  //
  // ⚠️ Ključ je PUNI POTPIS kakav ga ispisuje Postgres (`regprocedure`: `integer`, ne `int`; bez
  //    razmaka), ne golo ime (②/1b, revizor F4). Po imenu bi preopterećen `mcp_predaj_nacrt(uuid, text)`
  //    s grantom prošao kao „već otvoren" — a to je nova ruta s vlastitim tijelom, dakle i vlastitom
  //    (možda nijednom) provjerom vlasnika. `②/1b` je upravo takve stare potpise brisao.
  funkcije: {
    'mcp_zapocni_nacrt(text,text,uuid,text,text)': 'novi nacrt (ime, ključ ponavljanja, polica ILI nova polica, opseg); vlasnik iz tokena, samo VLASTITA polica, kvota 3 u izradi / 10 nepregledanih (②/1, ②/1b, ②/4.2)',
    'mcp_upisi_nacrt(uuid,jsonb,integer)': 'zamjena sadržaja vlastitog nacrta u izradi od zadane verzije, najviše 1 MB (②/1, ②/1b)',
    'mcp_predaj_nacrt(uuid,uuid,text)': 'vlastiti nacrt → NOV materijal u VLASTITOJ polici, cijel, u jednoj transakciji; ponovljena predaja = isti materijal (②/4.3′, ADR-039 — što smije, mjeri `mcp:predaja`); nacrt IZMJENE → upis u svoj materijal samo uz istu verziju (②/4b, mjeri `mcp:izmjena`)',
    'mcp_procitaj_nacrt(uuid)': 'čitanje vlastitog nacrta — AI nastavlja gdje je stao (②/1)',
    'mcp_moji_nacrti()': 'popis vlastitih nacrta bez sadržaja (②/1)',
    // ②/4b (02.10.): izmjena POSTOJEĆEG vlastitog materijala (ADR-039 t.2). Što smiju, mjeri `mcp:izmjena`.
    'mcp_procitaj_materijal(uuid)': 'čitanje VLASTITOG živog materijala s verzijom — jedini put AI-ja do sadržaja; `node_content` ostaje zatvoren (②/4b)',
    'mcp_zapocni_izmjenu(uuid,text)': 'kopija vlastitog materijala u nacrt izmjene s polaznom verzijom; ključ ponavljanja, kvota kao nacrt (②/4b)',
    'mcp_preimenuj_nacrt(uuid,text)': 'ime vlastitog nacrta u izradi, 1–120 znakova (②/4b)',
    'mcp_vrati_izmjenu(uuid)': 'poništi AI-jevu zadnju izmjenu vlastitog materijala kao novu verziju, samo ako ga od tad nitko nije mijenjao (②/4b)'
  }
};

/** `mcp_upisi_nacrt(uuid,jsonb,integer)` → `mcp_upisi_nacrt`. */
const imeIzPotpisa = (p) => p.replace(/\(.*$/, '');

/**
 * Edge Functions ne stoje iza Postgresa, pa ih brava iz baze NE DOSEŽE (`verify_jwt` na gatewayu
 * provjerava samo potpis — izmjereno 18.09.: AI-token je kroz `delete-account` obrisao račun).
 * Zato svaka funkcija mora biti ili POD STRAŽOM (`_shared/token-guard.ts`) ili ovdje imenovana s
 * razlogom zašto joj straža ne treba.
 *
 * ⚠️ Do ①/2c-2 se ovo oslanjalo na to da smo se SJETILI staviti stražu na dvije funkcije — nova
 *    funkcija (②, ①/4…) ušla bi bez ijednog crvenog. Popis je sada obveza, ne navika.
 */
const EDGE_BEZ_STRAZE = {
  'mail-unsubscribe': 'autorizira HMAC-potpisan token iz linka, ne JWT-identitet (`verify_jwt = false`)',
  mcp: 'TO JE konektor — radi pod korisnikovim RLS-om (`withSupabase({ auth: "user" })`), ništa privilegirano'
};

/** Funkcije pod stražom koje brana ŽIVO gađa AI-tokenom (mora se poklapati sa stražom na disku). */
const EDGE_ZIVO = ['delete-account', 'send-notification'];

/** RPC-ovi koje token AI-ja NE SMIJE zvati — ime → točni argumenti iz `supabase/*.sql`. */
const ZABRANJENI_RPC = {
  create_node: { p_parent: null, p_kind: 'folder', p_name: 'brava-proba' },
  rename_node: { p_id: NULA, p_name: 'brava-proba' },
  delete_node: { p_id: NULA },
  move_node: { p_id: NULA, p_new_parent: null, p_position: null },
  reorder_nodes: { p_parent: null, p_ordered_ids: [] },
  restore_node: { p_id: NULA },
  publish_node: { p_node_id: NULA, p_payload: {}, p_base_version: 0 },
  publish_document: { p_subject_id: 'brava-proba', p_writes: [] },
  set_profile_handle: { p_handle: 'brava' + String(Date.now()).slice(-6) },
  set_profile_identity: { p_display_name: 'Brava', p_bio: '' },
  set_profile_image: { p_kind: 'avatar', p_path: null },
  profile_images_count_mine: {},
  is_admin: {},
  // `_node_own` vraća `public.nodes`, NE `trigger` → izuzeće „okidač nije ruta" na nju se ne odnosi;
  // drži je zatvorenom jedan `revoke` (f1-nodes.sql), pa ga ovdje netko mora i provjeriti.
  _node_own: { p_id: NULA },
  // Inventar iz ①/2c-1 je i sam funkcija u `public` — smije ga zvati isključivo `service_role`.
  mcp_brava_inventar: {},
  // Pomoćnici nacrta (②/1) — zovu ih samo `mcp_*` funkcije iznutra. `_nacrt_zivi` smije
  // `authenticated` (zove ga RLS politika), ali NE `mcp_klijent`.
  _nacrt_zivi: { p_status: 'predan', p_updated: '2026-01-01T00:00:00Z' },
  _nacrt_pozivatelj: {},
  _nacrt_moj: { p_id: NULA },
  // Strogi profil sadržaja (②/0a) — zovu ga `mcp_upisi_nacrt` i `publish_node` iznutra; shemu čita
  // samo `service_role` (živi drift u `ugc:sadrzaj`). AI ih izravno ne zove.
  _ugc_shema: {},
  _provjeri_sadrzaj: { p: {} },
  // ②/4.1: nacrt u materijal pretvara SAMO korisnik iz obične sesije (`f6-prihvat.sql`). Grant je dan
  // `authenticated`, a ovdje se mjeri da ga token AI-ja NE dobiva. Drugu ogradu (`_nacrt_korisnik`
  // unutar funkcije) ova brana ne vidi — dokazana je mutacijom „grant mcp_klijent" (PROGRESS ②/4.1).
  prihvati_nacrt: { p_id: NULA, p_polica: null, p_nova_polica: 'brava-proba' },
  odbaci_nacrt: { p_id: NULA },
  _nacrt_korisnik: {},
  _provjeri_kartice_nacrta: { p: {} },
  // ②/4.3′: nacrt → materijal; zovu ga `mcp_predaj_nacrt` i `prihvati_nacrt` iznutra, nikome nije grantan.
  _nacrt_u_materijal: { d: {}, p_polica: null, p_nova_polica: 'brava-proba' },
  // ②/4b: pomoćnici izmjene — zovu ih samo `mcp_*` funkcije iznutra, nikome nisu grantani.
  _materijal_moj: { p_id: NULA },
  _bez_visecih_kartica: { p: {} },
  _izmjena_u_materijal: { d: {} }
};

/** Funkcije koje NISU ruta: okidači (zovu se iz triggera) i interni pomoćnici (service_role). */
const OKIDACI = ['handle_new_user', 'node_content_validate', 'nodes_validate', 'set_updated_at',
  'snapshot_content_version', 'snapshot_node_content', 'touch_node_content', 'touch_nodes',
  'touch_profile_identity', 'touch_subject_content'];
const INTERNE = [];

const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64'
);

let failed = 0;
let touched = 0;
function record(name, pass, detail) {
  touched++;
  if (!pass) failed++;
  console.log(`${pass ? '✅' : '❌'} ${name}${detail ? ' — ' + detail : ''}`);
}
function note(text) { console.log('   ℹ️  ' + text); }
function skip(why) { console.log('⏭️  SKIP — ' + why); process.exit(0); }

/** Jednokratni korisnik (prefiks ove brane). */
const createThrowaway = () => noviKorisnik({ prefiks: 'mcp-brava' });

/** Jednokratni korisnik BEZ lozinke — kakav nastane kad se netko prijavi Googleom (U1). */
const createThrowawayBezLozinke = () => noviKorisnik({ prefiks: 'mcp-brava', bezLozinke: true });

/**
 * Sesija iz RECOVERY linka — točno ono što dobije korisnik koji je ZABORAVIO lozinku.
 * Postoji jer je to jedina invarijanta koju bi postavka mogla srušiti nečujno: tko staru lozinku
 * ne zna, a mora je upisati, ostaje zaključan izvan vlastitog računa. Mail se ne šalje —
 * `generate_link` vraća token izravno.
 */
async function sesijaIzOporavka(email) {
    const gen = await http('/auth/v1/admin/generate_link', {
        method: 'POST', headers: svcHeaders(), body: JSON.stringify({ type: 'recovery', email })
    });
    if (!gen.ok) throw new Error(`generate_link ${gen.status}: ${(await gen.text()).slice(0, 160)}`);
    const { hashed_token } = await gen.json();
    const ver = await http('/auth/v1/verify', {
        method: 'POST', headers: { apikey: ANON, 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'recovery', token_hash: hashed_token })
    });
    if (!ver.ok) throw new Error(`verify ${ver.status}: ${(await ver.text()).slice(0, 160)}`);
    return (await ver.json()).access_token;
}

/** `PUT /auth/v1/user` zadanim tokenom; vraća status + `error_code` iz tijela. */
async function putUser(token, tijelo) {
    const r = await http('/auth/v1/user', {
        method: 'PUT',
        headers: { apikey: ANON, Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
        body: JSON.stringify(tijelo)
    });
    const tekst = await r.text();
    let json = {};
    try { json = JSON.parse(tekst); } catch (e) { /* nije json */ }
    // `json` ide van jer `200` NIJE dokaz da se išta upisalo — ovaj poslužitelj je već jednom
    // vratio 200 i tiho progutao polje (`current_password` dok je postavka bila isključena).
    // Uspješan `PUT /auth/v1/user` vraća AŽURIRANOG korisnika, pa se učinak dade pročitati natrag.
    return { status: r.status, kod: json.error_code || '', json, tekst: tekst.replace(/\s+/g, ' ').slice(0, 120) };
}

/** MCP alat preko HTTP-a, onako kako ga zove konektor (Streamable HTTP, bez stanja). */
async function mcpAlat(token, alat) {
  const H = { apikey: ANON, Authorization: 'Bearer ' + token, 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' };
  await http('/functions/v1/mcp', {
    method: 'POST', headers: H,
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'mcp-brava-check', version: '1' } } })
  });
  const r = await http('/functions/v1/mcp', {
    method: 'POST', headers: H,
    body: JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name: alat, arguments: {} } })
  });
  return { status: r.status, tekst: await r.text() };
}

/** Svaka funkcija iz `supabase/*.sql` mora biti razvrstana — nova ruta inače uđe nezapaženo. */
function provjeriInventar() {
  const dir = path.join(__dirname, '..', 'supabase');
  const imena = new Set();
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.sql'))) {
    const tekst = fs.readFileSync(path.join(dir, f), 'utf8');
    for (const m of tekst.matchAll(/create\s+(?:or\s+replace\s+)?function\s+public\.([a-z0-9_]+)\s*\(/gi)) imena.add(m[1]);
  }
  const poznato = new Set([...Object.keys(ZABRANJENI_RPC), ...Object.keys(OTVORENO.funkcije).map(imeIzPotpisa), ...OKIDACI, ...INTERNE]);
  // ⚠️ Ovdje je do 18.09. stajalo blanket izuzeće `/^mcp_/` (pisano za hook). Cigla ②/1 dodaje
  // upravo `mcp_*` RPC-ove, pa bi cijeli budući write-put prošao kroz ovu provjeru nezapaženo.
  // Izuzeće je zato suženo na TOČNO ime hooka — sve ostalo mora biti razvrstano.
  const nerazvrstane = [...imena].filter((n) => !poznato.has(n) && n !== 'mcp_access_token_hook');
  record('svaka funkcija iz supabase/*.sql je razvrstana (' + imena.size + ' nađeno)',
    nerazvrstane.length === 0, nerazvrstane.join(', ') || 'nema nerazvrstanih');
}

/**
 * Svaka Edge Function s diska mora biti pod stražom ili imenovana s razlogom, a svaka pod stražom
 * mora imati i ŽIVU provjeru dolje — inače brana tvrdi nešto što nikad nije gađala.
 */
function provjeriEdgeStraze() {
  const dir = path.join(__dirname, '..', 'supabase', 'functions');
  const funkcije = fs.readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== '_shared')
    .map((d) => d.name);

  const podStrazom = [];
  const gole = [];
  for (const f of funkcije) {
    if (f in EDGE_BEZ_STRAZE) continue;
    const put = path.join(dir, f, 'index.ts');
    const izvor = fs.existsSync(put) ? fs.readFileSync(put, 'utf8') : '';
    if (/token-guard|biljegTokena/.test(izvor)) podStrazom.push(f); else gole.push(f);
  }
  record(`svaka Edge Function je pod stražom ili imenovana s razlogom (${funkcije.length} nađeno)`,
    gole.length === 0, gole.join(', ') || 'pod stražom: ' + (podStrazom.join(', ') || 'nijedna')
      + ' · bez nje s razlogom: ' + Object.keys(EDGE_BEZ_STRAZE).join(', '));

  const mrtvi = Object.keys(EDGE_BEZ_STRAZE).filter((f) => !funkcije.includes(f));
  record('popis funkcija bez straže nema mrtvog retka', mrtvi.length === 0,
    mrtvi.join(', ') || 'sve s popisa postoji na disku');

  const bezZive = podStrazom.filter((f) => !EDGE_ZIVO.includes(f));
  record('svaka funkcija pod stražom ima i živu provjeru AI-tokenom', bezZive.length === 0,
    bezZive.join(', ') || 'živo gađane: ' + EDGE_ZIVO.join(', '));
}

/** Matrica prava iz same baze (`mcp_brava_inventar`, service_role). Vraća `{ greska }` ako ne ide. */
async function dohvatiInventar() {
  const r = await http('/rest/v1/rpc/mcp_brava_inventar', { method: 'POST', headers: svcHeaders(), body: '{}' });
  const tekst = await r.text();
  if (!r.ok) return { greska: 'HTTP ' + r.status + ' ' + tekst.replace(/\s+/g, ' ').slice(0, 160) };
  try { return JSON.parse(tekst); } catch (e) { return { greska: 'neparsiv odgovor: ' + tekst.slice(0, 120) }; }
}

/**
 * Model: što baza TVRDI da uloga smije. Iscrpno — svaka shema, svaka tablica, svaka funkcija.
 * Mjeri se u OBA smjera: višak (otvoreno a nije na popisu) i manjak (popis tvrdi dozvolu koje
 * u bazi nema). Bez drugog smjera brana zna ostati zelena zato što je popis mrtav, ne zato što
 * je brava čvrsta.
 */
function provjeriPrava(inv) {
  record('uloga ' + ULOGA + ' postoji u bazi', inv.postoji === true, inv.postoji ? '' : 'nema je — brava nije primijenjena');
  if (inv.postoji !== true) return;

  const sheme = Object.entries(inv.sheme || {});
  const viskoviS = sheme.filter(([ime, ima]) => ima && !(ime in OTVORENO.sheme)).map(([ime]) => ime);
  record(`nijedna shema izvan popisa nije otvorena (${sheme.length} pregledano)`,
    viskoviS.length === 0, viskoviS.join(', ') || 'otvoreno samo: ' + Object.keys(OTVORENO.sheme).join(', '));

  const tablice = Object.entries(inv.tablice || {});
  const viskoviT = [];
  for (const [ime, prava] of tablice) {
    const dop = (OTVORENO.tablice[ime] || {}).prava || [];
    const visak = (prava || []).filter((p) => !dop.includes(p));
    if (visak.length) viskoviT.push(ime + ' → ' + visak.join('+'));
  }
  record(`nijedna tablica nema pravo izvan popisa (${tablice.length} pregledano)`,
    viskoviT.length === 0, viskoviT.join(' | ') || 'otvoreno samo: ' + Object.keys(OTVORENO.tablice).join(', '));

  const manjak = Object.entries(OTVORENO.tablice)
    .filter(([ime, o]) => o.prava.some((p) => !((inv.tablice || {})[ime] || []).includes(p)))
    .map(([ime]) => ime);
  record('popis otvorenog odgovara bazi (nijedan mrtav redak)', manjak.length === 0,
    manjak.join(', ') || 'sve s popisa stvarno postoji');

  // Inventar i popis govore ISTIM jezikom: punim potpisom bez sheme (`mcp_upisi_nacrt(uuid,jsonb,integer)`).
  // Do ②/1b je popis bio po golom imenu, pa je svaki potpis tog imena bio „otvoren" (revizor F4).
  const potpis = (k) => k.replace(/^public\./, '');
  const funkcije = Object.entries(inv.funkcije || {});
  const viskoviF = funkcije
    .filter(([ime, o]) => o.execute && !(potpis(ime) in OTVORENO.funkcije))
    .map(([ime, o]) => ime + (o.okidac ? ' (okidač)' : ''));
  record(`nijedna funkcija u public nije izvršiva ulozi osim popisa, po PUNOM potpisu (${funkcije.length} pregledano)`,
    viskoviF.length === 0, viskoviF.join(' | ') || 'izvršivo samo: ' + (Object.keys(OTVORENO.funkcije).join(', ') || 'nijedna'));

  // Drugi smjer, kao za tablice: popis koji tvrdi dozvolu koje u bazi NEMA je mrtav — i uz njega
  // bi brana ostala zelena zato što je popis zastario, a ne zato što je brava čvrsta (②/1).
  const manjakF = Object.keys(OTVORENO.funkcije).filter((p) => !funkcije.some(([k, o]) => potpis(k) === p && o.execute));
  record('popis otvorenih funkcija odgovara bazi (nijedan mrtav redak)', manjakF.length === 0,
    manjakF.join(', ') || 'sve s popisa stvarno izvršivo');

  // Svako otvoreno IME ima TOČNO JEDAN izvršiv potpis. Prethodna tvrdnja preopterećenje već obara kao
  // višak; ova ga imenuje po razredu greške (dvije rute pod istim imenom — PostgREST bira po argumentima,
  // pa AI izbor potpisa ne vidi), da ispis kaže ZAŠTO, a ne samo „višak".
  const poImenu = {};
  for (const [k, o] of funkcije) if (o.execute) (poImenu[imeIzPotpisa(potpis(k))] ||= []).push(potpis(k));
  const vise = Object.keys(OTVORENO.funkcije).map(imeIzPotpisa)
    .filter((ime) => (poImenu[ime] || []).length !== 1)
    .map((ime) => ime + ' → ' + ((poImenu[ime] || []).join(' + ') || 'nijedan'));
  record('svako otvoreno ime ima TOČNO jedan izvršiv potpis (nema preopterećenja)', vise.length === 0,
    vise.join(' | ') || Object.keys(OTVORENO.funkcije).length + ' imena, svako po jedan potpis');
}

/**
 * Stvarnost: model iz kataloga vrijedi samo ako se isto vidi kroz PRAVI put (PostgREST).
 * ⚠️ 200 s praznim `[]` NIJE odbijanje — znači da dozvola POSTOJI a RLS je samo ispraznio
 *    rezultat. Zato ovdje pada sve što nije greška, a ne „sve što je vratilo redak".
 */
async function provjeriCitanjeTablica(inv, token) {
  const imena = Object.keys(inv.tablice || {}).sort().filter((ime) => !(ime in OTVORENO.tablice));
  const propusti = [];
  for (const ime of imena) {
    const r = await http('/rest/v1/' + encodeURIComponent(ime) + '?select=*&limit=1',
      { headers: { apikey: ANON, Authorization: 'Bearer ' + token } });
    const tekst = (await r.text()).replace(/\s+/g, ' ').slice(0, 120);
    const ok = r.status !== 200 && (r.status === 401 || r.status === 403
      || (r.status === 404 && /PGRST2/.test(tekst)) || /permission denied/i.test(tekst));
    if (!ok) propusti.push(ime + ' → HTTP ' + r.status + ' ' + tekst);
  }
  record(`nijedna tablica izvan popisa se ne čita kroz PostgREST (${imena.length} probano)`,
    propusti.length === 0, propusti.join(' | ') || 'sve odbijeno');
}

(async () => {
  if (!BASE || !ANON) skip('nema STAGING_SUPABASE_URL / STAGING_SUPABASE_ANON u .env');
  if (!SERVICE) skip('nema STAGING_SUPABASE_SERVICE_KEY (test stvara i briše jednokratnog korisnika)');
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) skip('nema STAGING_TEST_ADMIN_* (provjera send-notification traži admina)');
  if (BASE.includes(PROD_REF)) {
    console.log('❌ ODBIJENO: ovaj test piše i briše — PRODUKCIJA je zabranjena (CLAUDE #8).');
    process.exit(1);
  }

  console.log('\n=== mcp:brava === (staging ' + ref() + ')\n');
  provjeriInventar();
  provjeriEdgeStraze();

  console.log('\n— inventar iz baze: sve je zatvoreno osim izričito otvorenog —');
  const inv = await dohvatiInventar();
  if (inv.greska) {
    record('inventar prava se čita (mcp_brava_inventar)', false, inv.greska);
    console.log('\n  ①/2c-1 SQL nije primijenjen na ovaj projekt — `supabase/f6-mcp-inventar.sql`.');
    process.exit(1);
  }
  provjeriPrava(inv);

  let korisnik;
  try { korisnik = await createThrowaway(); }
  catch (e) { skip('jednokratni korisnik se ne stvara: ' + e.message); }

  const korisnikJwt = await prijava(korisnik.email, korisnik.password);
  let oauth;
  try { oauth = await oauthToken(korisnikJwt); }
  catch (e) { console.log('❌ OAuth token se ne može dobiti: ' + e.message); process.exit(1); }

  console.log('\n— token korisnikovog AI-ja —');
  record('token nosi client_id (bez toga brava nema što prepoznati)', !!oauth.claims.client_id, oauth.claims.client_id);
  record(`uloga u tokenu je '${ULOGA}'`, oauth.claims.role === ULOGA, 'role = ' + oauth.claims.role);
  record('obična prijava NIJE dirnuta (JWT s lozinkom ostaje authenticated)',
    JSON.parse(Buffer.from(korisnikJwt.split('.')[1], 'base64url').toString()).role === 'authenticated');

  console.log('\n— što token SMIJE (padne li ovo, brava je ubila i MCP) —');
  const adminJwt = await prijava(ADMIN_EMAIL, ADMIN_PASSWORD);
  const adminOauth = await oauthToken(adminJwt);
  const alat = await mcpAlat(adminOauth.token, 'procitaj_materijale');
  // ⚠️ Odgovor je SSE, a tekst alata je JSON UNUTAR JSON stringa → navodnici su izbjegnuti
  // (`\"materijala\": 40`). Regex bez toga ne nađe ništa i vrati lažno crveno (izmjereno 18.09.).
  const brojMaterijala = (alat.tekst.match(/\\?"materijala\\?":\s*(\d+)/) || [, null])[1];
  record('MCP alat procitaj_materijale vraća vlastito gradivo', alat.status === 200 && brojMaterijala !== null,
    'HTTP ' + alat.status + ' → ' + (brojMaterijala === null ? 'bez brojke' : brojMaterijala + ' materijala'));
  const citanje = await http('/rest/v1/nodes?select=id&limit=1', { headers: { apikey: ANON, Authorization: 'Bearer ' + adminOauth.token } });
  record('čitanje vlastitih čvorova prolazi', citanje.status === 200, 'HTTP ' + citanje.status);

  console.log('\n— što token NE SMIJE: RPC-ovi (svaki s točnim potpisom) —');
  for (const [ime, args] of Object.entries(ZABRANJENI_RPC)) {
    const r = await rpc(oauth.token, ime, args);
    record(`RPC ${ime} odbijen`, odbijen(r.status, r.tekst),
      'HTTP ' + r.status + (odbijen(r.status, r.tekst) ? '' : ' ← PROLAZI: ' + r.tekst.replace(/\s+/g, ' ').slice(0, 90)));
  }

  console.log('\n— što token NE SMIJE: čitanje tuđih tablica kroz pravi put —');
  await provjeriCitanjeTablica(inv, oauth.token);

  console.log('\n— što token NE SMIJE: izravan upis i Storage —');
  const upis = await http('/rest/v1/progress', {
    method: 'POST',
    headers: { apikey: ANON, Authorization: 'Bearer ' + oauth.token, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ user_id: korisnik.id, key: 'brava-proba', data: {} })
  });
  const upisTekst = await upis.text();
  record('izravan upis u tablicu progress odbijen', odbijen(upis.status, upisTekst) || upis.status === 401, 'HTTP ' + upis.status);

  // ⚠️ Bucketi se NE nabrajaju rukom: dolaze iz inventara, pa novi bucket (①/2c-2) mora sam
  //    dokazati da je zatvoren. Do sada se gađao samo `node-images` — `profile-images` i
  //    `lesson-images` nitko nije provjeravao.
  const bucketi = (inv.bucketi || []).map((b) => b.id);
  const propusniBucketi = [];
  for (const b of bucketi) {
    const up = await http('/storage/v1/object/' + b + '/' + korisnik.id + '/brava.png', {
      method: 'POST',
      headers: { apikey: ANON, Authorization: 'Bearer ' + oauth.token, 'Content-Type': 'image/png' },
      body: PNG
    });
    // ⚠️ Storage odbijanje NE dolazi kao HTTP 403: izmjereno 18.09. vraća **400** s tijelom
    // `{"statusCode":"403","code":"AccessDenied","message":"permission denied for schema storage"}`.
    // Gate koji gleda samo broj bio bi ovdje lažno crven — pa bi se „popravljao" otvaranjem prava.
    const upTekst = await up.text();
    const upOdbijen = up.status === 401 || up.status === 403 || /AccessDenied|"statusCode":"40[13]"/.test(upTekst);
    if (!upOdbijen) propusniBucketi.push(b + ' → HTTP ' + up.status + ' ' + upTekst.replace(/\s+/g, ' ').slice(0, 60));
  }
  record(`upload odbijen u SVAKI bucket (${bucketi.length} iz inventara)`, propusniBucketi.length === 0,
    propusniBucketi.join(' | ') || bucketi.join(', '));

  console.log('\n— što token NE SMIJE: Edge Functions —');
  const sn = await http('/functions/v1/send-notification', {
    method: 'POST',
    headers: { apikey: ANON, Authorization: 'Bearer ' + adminOauth.token, 'Content-Type': 'application/json' },
    body: 'nije-json'
  });
  record('send-notification odbija AI-token ADMINA (403, ne 400)', sn.status === 403,
    'HTTP ' + sn.status + (sn.status === 400 ? ' ← prošao admin-vrata' : ''));

  // ─── Auth API: lozinka je ZATVORENA, ostalo je IMENOVANO (①/2b) ──────────────────────────────
  // Brava u bazi ovo ne doseže — `PUT /auth/v1/user` ide na Auth API mimo Postgresa. Zatvara ga
  // postavka „traži trenutnu lozinku", i to SAMO za lozinku; zato se svako polje mjeri posebno.
  console.log('\n— Auth API: što AI-token smije, a što ne (' + AUTH_POLJA.length + ' polja) —');
  for (const p of AUTH_POLJA) {
    const poslanoTijelo = p.tijelo();
    const r = await putUser(oauth.token, poslanoTijelo);
    // JEDNA usporedba za oba smjera: odgovor mora biti TOČNO onaj koji popis tvrdi. Put koji se
    // otvorio pada jednako kao put koji se zatvorio (mrtav unos) — popis time ne može zastarjeti.
    const dopusteni = Array.isArray(p.ocekuj) ? p.ocekuj : [p.ocekuj];
    let slaze = dopusteni.some((o) => r.status === o.status && r.kod === o.kod);
    const ocekivano = dopusteni.map((o) => o.status + ' ' + (o.kod || '(bez koda)')).join(' ili ');
    let dodatak = '';

    // Učinak, ne odgovor: uspješan PUT vraća ažuriranog korisnika, pa se biljeg mora pročitati
    // NATRAG. Bez toga bi i prazan zahtjev (`{}`) prošao jednako — 200 nije dokaz upisa.
    if (slaze && p.biljeg) {
      const upisano = ((r.json || {}).user_metadata || {})[p.biljeg];
      const poslano = (poslanoTijelo.data || {})[p.biljeg];
      if (upisano === undefined || upisano !== poslano) {
        slaze = false;
        dodatak = '; 200 ALI biljeg `' + p.biljeg + '` se ne vidi natrag u odgovoru (poslano '
          + JSON.stringify(poslano) + ', vraćeno ' + JSON.stringify(upisano) + ') — zahtjev je tiho progutan';
      }
    }

    // Kontrola kad je odgovor stigao iz limitera, a ne iz provjere prava (v. `kontrolaNaLimitu`).
    let nemjeren = false;
    if (slaze && p.kontrolaNaLimitu && r.status === 429) {
      const lazni = await putUser('ne.valjan.token', p.tijelo());
      // IZMJERENO 22.09., da se kontrola ne sudi po pretpostavljenom broju: neispravan token daje
      // `403 bad_jwt`, a prazan `401 no_authorization`. Oba su odbijanje po IDENTITETU — to je
      // ono što dokazuje da limiter nije ispred njega. Sve drugo (pogotovo 429) znači da ovaj
      // redak ništa ne mjeri.
      const poIdentitetu = lazni.kod === 'bad_jwt' || lazni.kod === 'no_authorization';
      if (!poIdentitetu) {
        nemjeren = true;
        dodatak = '; NEMJEREN: i neispravan token dobije HTTP ' + lazni.status + ' ' + (lazni.kod || '')
          + ' → limiter stoji ISPRED identiteta, pa 429 ne dokazuje da je put otvoren';
      } else {
        dodatak = '; 429 je iz mail-limitera, a neispravan token daje ' + lazni.status + ' ' + lazni.kod
          + ' → identitet se provjerava PRIJE limitera';
      }
    }

    record((p.zatvoreno ? 'odbija: ' : 'IMENOVANO otvoreno (izvan dosega postavke): ') + p.ime,
      slaze && !nemjeren,
      'HTTP ' + r.status + ' ' + (r.kod || '(bez koda)') + dodatak +
      (slaze ? '' : ' ← očekivano ' + ocekivano +
        (p.zatvoreno && r.status === 200 ? '; PROŠAO — AI je promijenio lozinku' : '') +
        (!p.zatvoreno ? '; MRTAV UNOS ili promijenjeno ponašanje' : '')));
    if (slaze && !nemjeren && !p.zatvoreno) note(p.ime + ' — ' + p.zasto);
  }

  // ─── Brava ne smije ubiti KORISNIKA (isto načelo kao „MCP alat mora raditi") ─────────────────
  // Zaseban jednokratni korisnik: promjena lozinke poništava ostale sesije, pa bi na glavnom
  // korisniku oborila OAuth token koji provjere ispod još trebaju.
  console.log('\n— a korisnik i dalje MORA moći do svoje lozinke —');
  // ⚠️ Ovaj blok se NE SMIJE tiho preskočiti: `note()` ne diže brojač, pa bi pad pri stvaranju
  // korisnika spustio ukupno s 43 na 40 i brana bi i dalje javila „✅ brava drži" — a razlog zbog
  // kojeg se korisnik ne da stvoriti (izgubljena admin prava, ugašena registracija, uspavana baza)
  // točno je okruženje u kojem ove tvrdnje NE vrijede. Zato pada ZATVORENO.
  let kL = null;
  try { kL = await createThrowaway(); } catch (e) { record('drugi jednokratni korisnik nastao', false, e.message); }
  if (kL) {
    const jwt = await prijava(kL.email, kL.password);
    const nova = 'Brava-' + crypto.randomBytes(5).toString('hex') + '!9';
    const ok = await putUser(jwt, { password: nova, current_password: kL.password });
    // ⚠️ HTTP 200 NIJE dokaz da je lozinka promijenjena — ovaj je poslužitelj već jednom vratio
    // 200 i tiho progutao polje (`current_password` dok je postavka bila isključena). Dokaz je
    // PRIJAVA novom lozinkom; bez nje bi i `{data:{}}` (nikakva promjena) prošlo kao uspjeh.
    const ulaz = ok.status === 200 ? await prijava(kL.email, nova).then(() => true, () => false) : false;
    record('korisnik s TOČNOM trenutnom lozinkom promijeni lozinku I NJOME SE PRIJAVI', ulaz,
      'PUT ' + ok.status + ' ' + (ok.kod || '') +
      (ok.status >= 400 ? ' ← postavka je zaključala i korisnika'
        : ulaz ? ' → prijava novom lozinkom prolazi' : ' ← 200, ali se novom lozinkom NE može prijaviti'));

    // Tko je lozinku ZABORAVIO, staru ne zna. Postavka koja bi je tražila i ovdje zatvorila bi
    // jedini put natrag u račun — i to bez ijednog vidljivog znaka dok se netko ne zaključa.
    const nova2 = 'Brava-' + crypto.randomBytes(5).toString('hex') + '!9';
    try {
      const opor = await sesijaIzOporavka(kL.email);
      const r2 = await putUser(opor, { password: nova2 });
      const ulaz2 = r2.status === 200 ? await prijava(kL.email, nova2).then(() => true, () => false) : false;
      record('OPORAVAK RAČUNA (reset mailom) postavi novu lozinku BEZ stare I NJOME SE PRIJAVI', ulaz2,
        'PUT ' + r2.status + ' ' + (r2.kod || '') +
        (r2.status >= 400 ? ' ← oporavak računa je SLOMLJEN'
          : ulaz2 ? ' → prijava novom lozinkom prolazi' : ' ← 200, ali se novom lozinkom NE može prijaviti'));
    } catch (e) {
      // Imenovan pad: bez ovoga bi `generate_link` koji udari u limit oborio CIJELU branu
      // porukom bez koraka — isti razred lažne uzbune koji je zatvoren za 429.
      record('OPORAVAK RAČUNA (reset mailom) postavi novu lozinku BEZ stare I NJOME SE PRIJAVI', false, e.message);
    }

    await http('/auth/v1/admin/users/' + kL.id, { method: 'DELETE', headers: svcHeaders() }).catch(() => {});
  }

  // U1 — DRUGI način na koji bi postavka mogla zaključati korisnika, i jedini koji pogađa one
  // koji su došli Googleom: račun BEZ lozinke koji je tek POSTAVLJA. Stara lozinka ne postoji,
  // pa je nema što upisati. Mjereno je 21.09. i prošlo, ali dotad nije bilo ni u jednoj brani.
  let kBez = null;
  try { kBez = await createThrowawayBezLozinke(); } catch (e) { record('jednokratni korisnik BEZ lozinke nastao', false, e.message); }
  if (kBez) {
    const prva = 'Brava-' + crypto.randomBytes(5).toString('hex') + '!9';
    try {
      const opor = await sesijaIzOporavka(kBez.email);
      const r3 = await putUser(opor, { password: prva });
      const ulaz3 = r3.status === 200 ? await prijava(kBez.email, prva).then(() => true, () => false) : false;
      record('račun BEZ lozinke (kao Google) postavi PRVU lozinku I NJOME SE PRIJAVI', ulaz3,
        'PUT ' + r3.status + ' ' + (r3.kod || '') +
        (r3.status >= 400 ? ' ← postavka je zaključala korisnike bez lozinke'
          : ulaz3 ? ' → prijava prvom lozinkom prolazi' : ' ← 200, ali se tom lozinkom NE može prijaviti'));
    } catch (e) {
      record('račun BEZ lozinke (kao Google) postavi PRVU lozinku I NJOME SE PRIJAVI', false, e.message);
    }
    await http('/auth/v1/admin/users/' + kBez.id, { method: 'DELETE', headers: svcHeaders() }).catch(() => {});
  }

  console.log('\n— brisanje računa (zadnje: briše jednokratnog korisnika) —');
  const da = await http('/functions/v1/delete-account', {
    method: 'POST',
    headers: { apikey: ANON, Authorization: 'Bearer ' + oauth.token, 'Content-Type': 'application/json' },
    body: '{}'
  });
  record('delete-account odbija AI-token', da.status === 403,
    'HTTP ' + da.status + (da.status === 200 ? ' ← OBRISAO RAČUN' : ''));

  await http('/auth/v1/admin/users/' + korisnik.id, { method: 'DELETE', headers: svcHeaders() }).catch(() => {});

  // ─── ČEGRTALJKA NA DOSEGU (kalup `check:final`: „osmi = pad") ────────────────────────────────
  // Bez ovoga blok koji tiho nestane samo spusti ukupan broj, a brana i dalje javi „brava drži".
  // Zato se broj IZVEDENIH provjera uspoređuje sa zakucanim: manje = nešto je preskočeno, više =
  // netko je dodao provjeru a nije podigao osnovicu (pa nitko nije pogledao mjeri li ona išta).
  const izvedeno = touched;
  record('doseg: izvedeno točno ' + OCEKIVANO_PROVJERA + ' provjera', izvedeno === OCEKIVANO_PROVJERA,
    izvedeno === OCEKIVANO_PROVJERA ? '' :
      'izvedeno ' + izvedeno + (izvedeno < OCEKIVANO_PROVJERA
        ? ' ← BLOK JE PRESKOČEN, a brana bi inače javila uspjeh'
        : ' ← nova provjera bez podignute osnovice'));

  await pometi();
  console.log('\n  dotaknuto: ' + touched + ' provjera, palo: ' + failed);
  console.log(failed ? '✗ BRAVA NE DRŽI\n' : '✅ brava drži\n');
  process.exit(failed ? 1 : 0);
})().catch(async (e) => {
  // ⚠️ I na PREKIDU se mora pomesti: hladan start Edge Functiona zna udariti u 20 s abort, a
  // svaki takav prekid inače ostavi račun `@sokrat-test.invalid` na stagingu (dogodilo se).
  await pometi();
  console.log('✗ test je pukao: ' + e.message);
  process.exit(1);
});
