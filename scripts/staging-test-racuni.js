// staging-test-racuni.js — IMENOVANI test-računi na STAGINGU za ručno i agentsko testiranje F6 (②/1a).
// Pokreni: npm run staging:racuni   (idempotentno: postojeći račun se ne stvara ponovno, gradivo se ne dupla)
//
// ZAŠTO (Leon, 29.09.): do sada je svaki pokus išao kroz JEDAN račun, `test-admin@sokrat.local` —
// admin s 40 materijala. Ono što F6 mora dokazati (AI gradi gradivo ZA OBIČNOG korisnika, ne vidi
// tuđe, radi i na praznom računu) na adminu se ne vidi. Brane (`mcp:brava`, `mcp:nacrt`) koriste
// JEDNOKRATNE korisnike koje same brišu; ovi računi OSTAJU, da se na njih može spojiti pravi
// Claude/ChatGPT i gledati što AI radi.
//
//   test-a@sokrat.local       obični · polica „Test A" + 2 materijala
//   test-b@sokrat.local       obični · polica „Test B" + 1 materijal (stranac za A)
//   test-prazan@sokrat.local  obični · NULA gradiva (prvi dolazak: AI gradi od nule)
//
// Lozinke žive SAMO u `.env` (gitignored): ako ključ `STAGING_TEST_<X>_PASSWORD` ne postoji, skripta
// ga izmisli i DOPIŠE u `.env`; ako postoji, račun se na nju poravna. Lozinka se NIKAD ne ispisuje.
// Google račun (bez lozinke) se ne da stvoriti skriptom — traži Google provider u staging dashboardu
// i ručnu prijavu (Leonova ruka).
//
// ⚠️ SAMO STAGING — `jeProdukcija()` prije ijednog poziva (CLAUDE #8).

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { BASE, ANON, SERVICE, http, svcHeaders, ref, jeProdukcija, prijava, rpc } = require('./lib/staging-oauth');

const ENV = path.join(__dirname, '..', '.env');

/** Gradivo u obliku kakav piše Studio (kategorija → icon/name/color/learn/flashcards/quiz/fillBlanks). */
function gradivo(tema, boja) {
  return {
    tema1: {
      icon: 'fa-book', name: tema, color: boja,
      learn: { blocks: [{ id: 'b1', type: 'paragraph', text: tema + ': kratka skripta za test.' }] },
      flashcards: [{ question: tema + ' — pojam', answer: 'Objašnjenje pojma (test).' }],
      quiz: [{ question: tema + ' — pitanje', options: ['točno', 'netočno'], correct: 0 }],
      fillBlanks: [{ sentence: tema + ' se uči na _______ način.', answer: 'testni' }]
    }
  };
}

const RACUNI = [
  { kljuc: 'A', email: 'test-a@sokrat.local', polica: 'Test A',
    materijali: [['Mikroekonomija (test)', '#6366f1'], ['Statistika (test)', '#0ea5e9']] },
  { kljuc: 'B', email: 'test-b@sokrat.local', polica: 'Test B', materijali: [['Marketing (test)', '#f59e0b']] },
  { kljuc: 'PRAZAN', email: 'test-prazan@sokrat.local', polica: null, materijali: [] }
];

/** Lozinka iz `.env`, ili nova dopisana u `.env`. Vraća { lozinka, nova }. */
function lozinkaZa(kljuc) {
  const ime = 'STAGING_TEST_' + kljuc + '_PASSWORD';
  if (process.env[ime]) return { lozinka: process.env[ime], nova: false, ime };
  const lozinka = 'Sokrat-' + crypto.randomBytes(9).toString('base64url') + '!7';
  const sadrzaj = fs.existsSync(ENV) ? fs.readFileSync(ENV, 'utf8') : '';
  fs.appendFileSync(ENV, (sadrzaj && !sadrzaj.endsWith('\n') ? '\n' : '') + ime + '=' + lozinka + '\n');
  process.env[ime] = lozinka;
  return { lozinka, nova: true, ime };
}

/** Id postojećeg korisnika po e-mailu (admin popis, sve stranice), ili null. */
async function nadjiKorisnika(email) {
  for (let stranica = 1; stranica < 50; stranica++) {
    const r = await http('/auth/v1/admin/users?page=' + stranica + '&per_page=100', { headers: svcHeaders() });
    if (!r.ok) throw new Error('popis korisnika ' + r.status);
    const users = (await r.json()).users || [];
    const u = users.find((x) => (x.email || '').toLowerCase() === email);
    if (u) return u.id;
    if (users.length < 100) return null;
  }
  return null;
}

async function osigurajKorisnika(email, lozinka) {
  const id = await nadjiKorisnika(email);
  if (id) {
    // Poravnaj lozinku na `.env` — inače račun iz prošle vrtnje s izgubljenom lozinkom ostaje nedostupan.
    const r = await http('/auth/v1/admin/users/' + id, {
      method: 'PUT', headers: svcHeaders(), body: JSON.stringify({ password: lozinka, email_confirm: true })
    });
    if (!r.ok) throw new Error('poravnanje lozinke ' + r.status + ': ' + (await r.text()).slice(0, 120));
    return { id, stvoren: false };
  }
  const r = await http('/auth/v1/admin/users', {
    method: 'POST', headers: svcHeaders(), body: JSON.stringify({ email, password: lozinka, email_confirm: true })
  });
  if (!r.ok) throw new Error('stvaranje ' + r.status + ': ' + (await r.text()).slice(0, 120));
  return { id: (await r.json()).id, stvoren: true };
}

async function zivihCvorova(jwt) {
  const r = await http('/rest/v1/nodes?deleted_at=is.null&select=id', { headers: { apikey: ANON, Authorization: 'Bearer ' + jwt } });
  return (await r.json()).length;
}

(async () => {
  if (!BASE || !ANON || !SERVICE) {
    console.log('❌ Treba STAGING_SUPABASE_URL / _ANON / _SERVICE_KEY u .env.');
    process.exit(1);
  }
  if (jeProdukcija()) { console.log('❌ ODBIJENO: samo STAGING (CLAUDE #8).'); process.exit(1); }
  console.log('\n=== staging test-računi === (staging ' + ref() + ')\n');

  let greske = 0;
  for (const r of RACUNI) {
    try {
      const { lozinka, nova, ime } = lozinkaZa(r.kljuc);
      const k = await osigurajKorisnika(r.email, lozinka);
      const jwt = await prijava(r.email, lozinka);   // dokaz da se računom STVARNO može ući
      let dodano = 0;
      if (r.polica && (await zivihCvorova(jwt)) === 0) {
        const polica = (await rpc(jwt, 'create_node', { p_parent: null, p_kind: 'folder', p_name: r.polica })).json;
        for (const [ime2, boja] of r.materijali) {
          const mat = (await rpc(jwt, 'create_node', { p_parent: polica, p_kind: 'study', p_name: ime2 })).json;
          const v = ((await (await http('/rest/v1/node_content?node_id=eq.' + mat + '&select=version',
            { headers: { apikey: ANON, Authorization: 'Bearer ' + jwt } })).json())[0] || {}).version;
          const p = await rpc(jwt, 'publish_node', { p_node_id: mat, p_payload: gradivo(ime2, boja), p_base_version: v });
          if (p.status !== 200) throw new Error('publish_node ' + p.status + ' ' + p.tekst);
          dodano++;
        }
      }
      const cvorova = await zivihCvorova(jwt);
      const ocekivano = r.polica ? 1 + r.materijali.length : 0;
      const ok = cvorova === ocekivano;
      if (!ok) greske++;
      console.log(`${ok ? '✅' : '❌'} ${r.email} — ${k.stvoren ? 'stvoren' : 'postojao'} · prijava radi · `
        + `${cvorova} čvorova (očekivano ${ocekivano})${dodano ? ' · dodano ' + dodano + ' materijala' : ''}`
        + ` · lozinka u .env: ${ime}${nova ? ' (NOVA)' : ''}`);
    } catch (e) {
      greske++;
      console.log('❌ ' + r.email + ' — ' + e.message);
    }
  }
  console.log('\n  dotaknuto: ' + RACUNI.length + ' računa, palo: ' + greske);
  console.log('  Google račun: uključi Google provider u staging dashboardu (Auth → Providers) i prijavi se ručno.\n');
  process.exit(greske ? 1 : 0);
})();
