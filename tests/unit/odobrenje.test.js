/* eslint-disable no-console */
// ===== ODOBRENJE (F6 ①/1) — `js/odobrenje.js` gađa ISTI projekt i ISTI SDK kao `js/auth.js` =====
// Pokreni: node tests/unit/odobrenje.test.js  (uključeno u `npm run test:unit`)
//
// ZAŠTO POSTOJI: `odobrenje.html` ne učitava `auth.js` (ubacio bi prozor za prijavu bez komponente
// i stilova), pa su adresa, ključ, SDK i SRI u `odobrenje.js` DRUGA KOPIJA. Da se razidu, AI bi
// korisnika slao na odobrenje koje razgovara s krivim projektom ili SDK-om koji SRI odbije — a
// povezivanje bi „tiho ne radilo". Uz to tvrdi sigurnosna svojstva stranice (ADR-038 ③):
// otvaranje ne odobrava, popis hostova je točan, i supabase-js ne smije sam preusmjeriti.

const fs = require('fs');
const path = require('path');

const KORIJEN = path.join(__dirname, '..', '..');
const OD = fs.readFileSync(path.join(KORIJEN, 'js', 'odobrenje.js'), 'utf8');
const AUTH = fs.readFileSync(path.join(KORIJEN, 'js', 'auth.js'), 'utf8');
const HTML = fs.readFileSync(path.join(KORIJEN, 'odobrenje.html'), 'utf8');

let pao = 0;
const tvrdi = (uvjet, ime, detalj) => {
  if (uvjet) console.log('  ✓ ' + ime);
  else { pao++; console.log('  ✗ ' + ime + (detalj !== undefined ? '  → ' + JSON.stringify(detalj) : '')); }
};

console.log('\n=== odobrenje (F6 ①/1) ===\n');

const izAuth = (kljuc) => (AUTH.match(new RegExp(kljuc + ":\\s*'([^']+)'")) || [])[1];
const izOd = (ime) => (OD.match(new RegExp('const ' + ime + "\\s*=\\s*'([^']+)'")) || [])[1];
const par = [
  ['adresa projekta', izAuth('url'), izOd('PROD_URL')],
  ['javni ključ', izAuth('publishableKey'), izOd('PROD_KEY')],
  ['SDK (točna verzija)', izAuth('cdnSrc'), izOd('SDK_SRC')],
  ['SRI', izAuth('cdnIntegrity'), izOd('SDK_SRI')]
];
for (const [ime, a, o] of par) {
  tvrdi(!!a && !!o, ime + ': obje vrijednosti pročitane (inače regex promašuje, a ne kopije)', { a, o });
  tvrdi(a === o, ime + ': odobrenje.js == auth.js', { auth: a, odobrenje: o });
}
tvrdi(OD.includes("'sokrat-supabase-override'") && AUTH.includes("'sokrat-supabase-override'"),
  'isti test-šav (sokrat-supabase-override) kao auth.js — staging gađa staging');

const hostovi = (OD.match(/DOPUSTENI_HOSTOVI\s*=\s*\[([^\]]*)\]/) || [])[1];
tvrdi(hostovi && JSON.stringify(hostovi.split(',').map((h) => h.trim().replace(/'/g, ''))) === JSON.stringify(['claude.ai', 'chatgpt.com']),
  'popis dopuštenih hostova je TOČNO claude.ai i chatgpt.com (novi AI = svjesna izmjena ovog testa)', hostovi);
tvrdi(/u\.protocol !== 'https:'/.test(OD), 'povratak samo na https');

// approve/deny smiju stajati samo unutar rukovatelja odluke, i uvijek uz skipBrowserRedirect.
const prijeOdluke = OD.slice(0, OD.indexOf('async function odluci'));
tvrdi(OD.includes('async function odluci'), 'odobrenje ide kroz funkciju odluke (klik)');
tvrdi(!/approveAuthorization\(|denyAuthorization\(/.test(prijeOdluke), 'otvaranje stranice NE odobrava');
tvrdi(/skipBrowserRedirect: true/.test(OD), 'supabase-js ne preusmjerava sam (skipBrowserRedirect)');
// ⚠️ Do ①/3 je ovo brojalo SAMO `location.assign` — a tada je stranica dobila i `window.open`.
// Tvrdnja se zvala „oba preusmjeravanja", pa bi treći izlaz sa stranice prošao nezapaženo.
// Zato se broje OBA načina odlaska: `assign` smije samo poslije provjere hosta, `open` samo na
// vlastitu naslovnicu (literal '/'), nikad na adresu koja dolazi izvana.
const assignovi = (OD.match(/window\.location\.assign\(/g) || []).length;
const openovi = (OD.match(/window\.open\(/g) || []).length;
tvrdi(assignovi === 2 && /dopustenHost\(kamo\)/.test(OD) && /dopustenHost\(d\.redirect_url\)/.test(OD)
  && openovi === 2 && (OD.match(/window\.open\('\/'/g) || []).length === openovi,
  'svako odlaženje sa stranice je provjereno: 2 × assign tek poslije provjere hosta, 2 × open i oba na vlastitu naslovnicu (prijava · „Nisi ti?")',
  { assign: assignovi, open: openovi });

// K/9 (16.10.): „Nisi ti?" — odjava je LOKALNA (`global` bi korisniku srušio i druge sesije i AI veze), a
// stranica NE pokušava nastaviti isto povezivanje: poslužitelj ga veže za prvi račun koji otvori detalje
// (drugi dobiva 404, izmjereno na stagingu) — zato korisniku kaže da povezivanje pokrene ispočetka.
const promjena = OD.slice(OD.indexOf("el('oauthSwitch')"), OD.indexOf("el('oauthSwitch')") + 900);
tvrdi(/signOut\(\{ scope: 'local' \}\)/.test(promjena) && !/scope: 'global'|signOut\(\)/.test(OD)
  && /tr\('oauth\.switched'/.test(promjena) && !/location\.reload\(/.test(OD),
  '„Nisi ti?": jedina odjava je LOKALNA, bez reloada, i kaže da se povezivanje pokreće ispočetka');
tvrdi(/id="oauthSwitch"/.test(HTML) && HTML.indexOf('id="oauthSwitch"') > HTML.indexOf('id="oauthAccount"')
  && HTML.indexOf('id="oauthSwitch"') < HTML.indexOf('id="oauthActions"'),
  '„Nisi ti?" stoji uz račun, unutar detalja — vidi se tek kad je račun ispisan, prije gumba Dopusti');

// Bez prebacivanja na lokalnoj adresi NEMA tihog povratka na produkciju (izmjereno 18.09. u ručnom
// pokusu ①/1: stranica je otišla na produkciju, rekla „prijavi se prvo", pa je i prijava završila
// na PRODUKCIJI, a povezivanje ostalo nedovršeno).
tvrdi(/function lokalniOrigin\(\)/.test(OD) && /if \(lokalniOrigin\(\)\) return null;/.test(OD),
  'na localhostu bez prebacivanja projekt() vraća null (nema tihe produkcije)');
const mjestoLokalno = OD.indexOf('if (lokalniOrigin()) return null;');
const mjestoProd = OD.indexOf('return { url: PROD_URL, key: PROD_KEY };');
tvrdi(mjestoLokalno !== -1 && mjestoProd !== -1 && mjestoLokalno < mjestoProd,
  'provjera lokalne adrese stoji PRIJE povratka na produkciju (inače je mrtva)', { mjestoLokalno, mjestoProd });
tvrdi(/tr\('oauth\.noProject'/.test(OD), 'stranica to i KAŽE (oauth.noProject), ne šuti');
const I18N = fs.readFileSync(path.join(KORIJEN, 'js', 'i18n.js'), 'utf8');

// ⚠️ Do ①/3 je ovdje stajao JEDAN ručno odabran ključ (`oauth.noProject`), pa su tri nova ključa te
// cigle ušla bez ijednog suca. `check:i18n` ih ne pokriva: on gradi rječnik regexom `'kljuc': {` i
// provjerava POSTOJI li ključ, ne i ima li oba jezika. Zato se popis ovdje NABRAJA IZ IZVORA —
// svaki `oauth.*` koji stranica stvarno koristi, iz JS-a i iz markupa. Novi ključ time pada po
// defaultu, umjesto da čeka da ga se netko sjeti dopisati.
const oauthKljucevi = new Set();
for (const m of OD.matchAll(/tr\('(oauth\.[a-zA-Z0-9_.]+)'/g)) oauthKljucevi.add(m[1]);
for (const m of HTML.matchAll(/data-i18n(?:-aria|-title)?="(oauth\.[a-zA-Z0-9_.]+)"/g)) oauthKljucevi.add(m[1]);
const bezObaJezika = [...oauthKljucevi].filter((k) => {
  const tijelo = new RegExp("'" + k.replace(/\./g, '\\.') + "':\\s*\\{([^}]*)\\}").exec(I18N);
  return !tijelo || !/\ben:/.test(tijelo[1]) || !/\bhr:/.test(tijelo[1]);
});
// Prag hvata suprotan kvar: da regex promaši sve, popis bi bio prazan i tvrdnja bi tiho prošla.
tvrdi(oauthKljucevi.size >= 10 && bezObaJezika.length === 0,
  `svih ${oauthKljucevi.size} oauth-ključeva sa stranice ima en+hr (nabrojeno iz izvora, ne rukom)`,
  { nadeno: oauthKljucevi.size, bezObaJezika });

tvrdi(/<meta name="robots" content="noindex">/.test(HTML), 'odobrenje.html se ne indeksira');
tvrdi(!/<script>(?!\s*<\/script>)/.test(HTML) && !/\son[a-z]+=/.test(HTML), 'bez inline skripti i on*-atributa (CSP)');
tvrdi(/id="oauthActions" hidden/.test(HTML), 'gumbi su skriveni dok provjera hosta ne prođe');

console.log(pao ? '\n✗ ' + pao + ' pada\n' : '\n✅ sve prolazi\n');
process.exit(pao ? 1 : 0);
