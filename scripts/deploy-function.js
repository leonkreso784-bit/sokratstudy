/* eslint-disable no-console */
// ===== Deploy Edge Functiona — s branama koje CLI sam nema =====
// Usage: node scripts/deploy-function.js <slug> --project staging|prod [--confirm-prod] [--dry]
//        npm run deploy:function -- delete-account --project staging
//
// ZAŠTO POSTOJI, a ne gola `supabase functions deploy`:
//
// 1. `verify_jwt` SE NE UPISUJE RUKOM. CLI deploya s `verify_jwt = true` osim uz `--no-verify-jwt`,
//    a dvije naše funkcije NAMJERNO rade bez prijave (`mail-unsubscribe` = one-click odjava iz
//    maila, `mcp` = MCP klijent prvi zahtjev šalje bez tokena). Tko to zaboravi, ne dobije grešku
//    nego TIHO POKVARENU funkciju: odjava iz svakog maila počne tražiti prijavu, a MCP konektor
//    više ne može ni saznati gdje je prijava. Zato se zastavica ČITA iz `PUBLIC_FNS` u
//    `check-edge-functions.js` — isti popis koji gate provjerava. Jedan popis, dva čitatelja.
//
// 2. PRODUKCIJA SE NE DEPLOYA IZ GRANE KOJA NOSI TUĐI POSAO.
//    Povod je stvaran i našao ga je pokušaj ove cigle (2026-09-22): `delete-account` na grani
//    `feat/f6-mcp` ima **token-guard** kojeg produkcija nema. Redeploy „samo zbog pina" s te grane
//    isporučio bi uz pin i F6 sigurnosni kôd — dakle F6 bi otišao na produkciju bez ijedne odluke
//    o tome. Zato se prije prod-deploya usporedi datoteka s `origin/main` i, ako se razlikuje,
//    deploy STANE i ispiše razliku. To nije oprez nego granica odgovornosti cigle.
//
// 3. `--confirm-prod` je obavezan za produkciju, po kućnom kalupu (`backup-db.js`).

const { execFileSync, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const { PUBLIC_FNS, expectedSlugs } = require('./check-edge-functions.js');

const ROOT = path.join(__dirname, '..');
const PROJEKTI = {
  staging: { ref: 'czljmvigkgiajzjxtndq', ime: 'sokrat-staging' },
  prod: { ref: 'naxjubnedhrbhsuasayu', ime: 'PRODUKCIJA' },
};

// Refovi su IZVOR ISTINE i za `check-mcp-rewrite.js` — ona sudi koji projekt stoji iza koje
// javne adrese, a ref prepisan u drugu datoteku bio bi druga kopija koja tiho ostari. Jedan
// popis, dva čitatelja; isti kalup kao `PUBLIC_FNS` u `check-edge-functions.js`. Zato se izvozi
// PRIJE glavnog toka: ovaj modul pri `require`-u ne smije ništa deployati ni ispisati.
module.exports = { PROJEKTI };

if (require.main !== module) return;

const args = process.argv.slice(2);
const slug = args.find((a) => !a.startsWith('--'));
const uzmi = (ime) => { const i = args.indexOf('--' + ime); return i === -1 ? null : args[i + 1]; };
const ima = (ime) => args.indexOf('--' + ime) !== -1;

function pad(poruka) { console.error('\n❌ ' + poruka + '\n'); process.exit(1); }

if (!slug) pad('Nedostaje ime funkcije.\n   npm run deploy:function -- <slug> --project staging|prod');

const kljuc = uzmi('project');
if (!kljuc || !PROJEKTI[kljuc]) pad('`--project` mora biti `staging` ili `prod` (dobiveno: ' + kljuc + ').');
const cilj = PROJEKTI[kljuc];

const postojece = expectedSlugs();
if (postojece.indexOf(slug) === -1) {
  pad(`Funkcije \`${slug}\` nema u supabase/functions/ (ima: ${postojece.join(', ')}).`);
}

// ── Brana 1: verify_jwt iz popisa, ne iz pamćenja ────────────────────────────────────────────
const javna = Object.prototype.hasOwnProperty.call(PUBLIC_FNS, slug);
const zastavice = javna ? ['--no-verify-jwt'] : [];

// ── Brana 2: produkcija se ne deploya iz grane koja nosi tuđi posao ──────────────────────────
if (kljuc === 'prod') {
  if (!ima('confirm-prod')) {
    pad('PRODUKCIJA traži `--confirm-prod`. Ovo je nepovratan, vanjski korak.');
  }
  let razlika = '';
  try {
    razlika = execSync(`git diff --stat origin/main -- supabase/functions/${slug}/ supabase/functions/_shared/`,
      { cwd: ROOT, encoding: 'utf8' }).trim();
  } catch (e) {
    pad('Ne mogu usporediti s `origin/main` (' + e.message + '). Bez te usporedbe prod-deploy ne ide.');
  }
  if (razlika) {
    console.error('\n❌ STOP — izvor se RAZLIKUJE od `origin/main`:\n');
    console.error(razlika.split('\n').map((l) => '   ' + l).join('\n'));
    console.error('\n   Deploy na produkciju s ove grane ne bi isporučio samo ovu ciglu, nego SVE');
    console.error('   što grana mijenja u toj funkciji. Ako to doista želiš, deployaj s `main`-a');
    console.error('   (ili prvo spoji granu uz zaseban OK).\n');
    process.exit(1);
  }
}

// ── Izvještaj prije radnje: mjerač mora reći što točno radi ──────────────────────────────────
const izvor = path.join(ROOT, 'supabase', 'functions', slug, 'index.ts');
const pinovi = fs.existsSync(izvor)
  ? (fs.readFileSync(izvor, 'utf8').match(/(?:npm|jsr):[^'"]+/g) || [])
  : [];

console.log('\n=== deploy:function ===');
console.log('   funkcija : ' + slug);
console.log('   projekt  : ' + cilj.ime + '  (' + cilj.ref + ')');
console.log('   verify_jwt: ' + (javna ? 'NE (imenovana javna: ' + PUBLIC_FNS[slug].why + ')' : 'DA'));
if (pinovi.length) console.log('   ovisnosti : ' + pinovi.join(', '));
console.log('');

if (ima('dry')) { console.log('— `--dry`: stalo prije deploya, ništa nije poslano.\n'); process.exit(0); }

try {
  execFileSync('npx', ['supabase', 'functions', 'deploy', slug, '--project-ref', cilj.ref, ...zastavice],
    { cwd: ROOT, stdio: 'inherit', shell: process.platform === 'win32' });
} catch (e) {
  pad('Deploy nije prošao (' + (e.status === undefined ? e.message : 'exit ' + e.status) + ').');
}

console.log('\n✅ Deployano. Sad PROVJERI, ne pretpostavljaj:');
console.log(kljuc === 'prod'
  ? '   npm run check:functions'
  : '   CHECK_FUNCTIONS_URL=https://' + cilj.ref + '.supabase.co npm run check:functions');
if (slug === 'delete-account') console.log('   npm run test:delete-account     (traži STAGING_* u .env)');
if (slug === 'mcp') console.log('   npm run mcp:probe');
console.log('');
