/* eslint-disable no-console */
// ===== „Spoji svoj AI" (F6 ②/5.1) — js/connect-ai.js, BEZ preglednika =====
// Pokreni: node tests/unit/connect-ai.test.js  (uključeno u `npm run test:unit`)
//
// ZAŠTO POSTOJI: gumb vodi korisnika da u SVOJ AI upiše adresu. Pogrešna adresa = konektor koji se
// ne spaja, a nijedna druga brana to ne vidi. Tvrdi se:
//   ① adresa: uz staging = funkcija `mcp` TOG projekta (isti put kao `index.ts`); bez staginga
//     (produkcija do ⑥) = nema adrese → gumb onemogućen (Studio) ili ga nema (Moji materijali)
//   ② aplikacije = točno Claude i ChatGPT (plan ②/5 ①; Gemini ne radi izvan SAD-a)
//   ③ prečac (ADR-026 ①): povezan AI → gumb ga otvara, „Spoji drugi AI" vodi na NEpovezanu
//   ④ ime iz DCR-a (tuđi tekst, ADR-038 ③) nikad ne ulazi u markup
//   ⑤ svaki tekst ima HR i EN u js/i18n.js

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const KORIJEN = path.join(__dirname, '..', '..');
const IZVOR = fs.readFileSync(path.join(KORIJEN, 'js', 'connect-ai.js'), 'utf8');
let pao = 0; let proslo = 0;
const test = async (ime, fn) => {
  try { await fn(); proslo++; console.log('  ✓ ' + ime); } catch (e) { pao++; console.log('  ✗ ' + ime + '\n      ' + e.message); }
};

const STAGING = { url: 'https://czljmvigkgiajzjxtndq.supabase.co', publishableKey: 'sb_publishable_x' };

/** Učitaj modul u svjež kontekst: `override` = ispitni šav iz auth.js, `veze` = odgovor listGrants. */
function ucitaj(override, veze) {
  const ctx = {
    console, URL, Date, Promise,
    _readSupabaseOverride: () => override,
    SokratAuth: { getClient: () => ({ auth: { oauth: { listGrants: async () => ({ data: veze || [], error: null }) } } }) },
    navigator: {}, document: { getElementById: () => null }
  };
  ctx.window = ctx;
  vm.createContext(ctx);
  vm.runInContext(IZVOR, ctx);
  return ctx.SokratConnectAi;
}
const element = () => ({ innerHTML: 'staro', hidden: true, isConnected: true, onclick: null });
const tick = () => new Promise((r) => setTimeout(r, 0));

(async () => {
  console.log('\n=== Spoji svoj AI (F6 ②/5.1) ===\n');

  await test('① uz staging: adresa = <projekt>/functions/v1/mcp — isti put koji funkcija javlja kao svoj (index.ts)', () => {
    const C = ucitaj(STAGING);
    assert.strictEqual(C._adresaKonektora(STAGING), 'https://czljmvigkgiajzjxtndq.supabase.co/functions/v1/mcp');
    assert.strictEqual(C._adresaKonektora({ url: 'https://czljmvigkgiajzjxtndq.supabase.co/' }), 'https://czljmvigkgiajzjxtndq.supabase.co/functions/v1/mcp', 'kosa crta na kraju projekta udvostručila put');
    const index = fs.readFileSync(path.join(KORIJEN, 'supabase', 'functions', 'mcp', 'index.ts'), 'utf8');
    assert.ok(index.includes('`${SUPABASE_URL}/functions/v1/mcp`'), 'index.ts više ne javlja adresu na /functions/v1/mcp — gumb bi vodio krivo');
    assert.strictEqual(C.dostupno(), true);
  });

  await test('① bez staginga (produkcija do ⑥) NEMA adrese; http i smeće također ne', () => {
    const C = ucitaj(null);
    assert.strictEqual(C._adresaKonektora(null), null);
    assert.strictEqual(C.dostupno(), false);
    assert.strictEqual(C._adresaKonektora({ url: 'http://evil.example' }), null, 'http adresa prošla');
    assert.strictEqual(C._adresaKonektora({ url: 'nije adresa' }), null);
    assert.ok(/const PRODUKCIJA = null;/.test(IZVOR), 'PRODUKCIJA više nije null — ograda do ⑥ je skinuta (to se radi tek u ⑥, uz Leonov OK)');
  });

  await test('① ulaz bez konektora: Studio = onemogućen gumb, Moji materijali = ništa (i sakriveno)', () => {
    const C = ucitaj(null);
    const s = element(); C.ugradi(s, { bezKonektora: 'onemoguci' });
    assert.ok(/<button[^>]*disabled/.test(s.innerHTML) && !/data-cai-entry/.test(s.innerHTML), 'Studio: ' + s.innerHTML);
    assert.strictEqual(s.hidden, false);
    const m = element(); C.ugradi(m, { bezKonektora: 'sakrij' });
    assert.deepStrictEqual([m.innerHTML, m.hidden], ['', true]);
  });

  await test('② aplikacije = točno Claude i ChatGPT, poveznice su https konstante', () => {
    const C = ucitaj(STAGING);
    assert.deepStrictEqual([...C._APLIKACIJE.map((a) => a.id)], ['claude', 'chatgpt']);
    for (const a of C._APLIKACIJE) for (const u of [a.otvori, a.chat]) assert.ok(/^https:\/\/[a-z.]+\//.test(u), a.id + ': ' + u);
    assert.ok(C._APLIKACIJE.find((a) => a.id === 'claude').otvori.endsWith('/customize/connectors'), 'Claude ne vodi na stranicu s konektorima');
  });

  await test('③ uz staging bez povezanog AI-ja: gumb otvara upute (data-cai-entry), vidljiv', async () => {
    const C = ucitaj(STAGING, []);
    const el = element(); C.ugradi(el, { bezKonektora: 'sakrij' });
    await tick();
    assert.ok(/data-cai-entry/.test(el.innerHTML) && !/<a /.test(el.innerHTML), el.innerHTML);
    assert.strictEqual(el.hidden, false);
    assert.strictEqual(typeof el.onclick, 'function');
  });

  await test('③ prečac: povezan Claude → gumb OTVARA Claude, „Spoji drugi AI" vodi na ChatGPT; povezan ChatGPT → obrnuto', async () => {
    let C = ucitaj(STAGING, [{ client: { id: 'c1', name: 'Claude' } }]);
    let el = element(); C.ugradi(el, {}); await tick();
    assert.ok(el.innerHTML.includes('href="https://claude.ai/new"'), el.innerHTML);
    assert.ok(el.innerHTML.includes('data-cai-other="chatgpt"'), el.innerHTML);
    C = ucitaj(STAGING, { grants: [{ client: { name: 'ChatGPT' } }] });   // i oblik { grants: [...] }
    el = element(); C.ugradi(el, {}); await tick();
    assert.ok(el.innerHTML.includes('href="https://chatgpt.com/"') && el.innerHTML.includes('data-cai-other="claude"'), el.innerHTML);
  });

  await test('④ ime iz DCR-a (tuđi tekst) nikad u markupu; nepoznata aplikacija = nije prečac', async () => {
    const zlo = '<img src=x onerror=alert(1)> Claude';
    const C = ucitaj(STAGING, [{ client: { name: zlo } }, { client: { name: 'Neki AI' } }]);
    assert.deepStrictEqual([...C._povezane([{ client: { name: 'Neki AI' } }])], []);
    const el = element(); C.ugradi(el, {}); await tick();
    assert.ok(!/onerror|<img|Neki AI/.test(el.innerHTML), 'tuđe ime u markupu: ' + el.innerHTML);
    assert.ok(el.innerHTML.includes('href="https://claude.ai/new"'), 'kontrola: „… Claude" je ipak prepoznat');
  });

  await test('⑤ svaki ključ koji modul koristi ima HR i EN u js/i18n.js (i nijedan connectAi.* nije mrtav)', () => {
    const i18n = fs.readFileSync(path.join(KORIJEN, 'js', 'i18n.js'), 'utf8');
    const u = new Set([...IZVOR.matchAll(/'(connectAi\.[A-Za-z0-9]+)'/g)].map((m) => m[1]));
    assert.ok(u.size >= 15, 'premalo ključeva izvučeno iz modula: ' + u.size);
    const rjecnik = new Set();
    for (const m of i18n.matchAll(/'(connectAi\.[A-Za-z0-9]+)':\s*\{\s*en:\s*'[^']+',\s*hr:\s*'[^']+'\s*\}/g)) rjecnik.add(m[1]);
    assert.deepStrictEqual({ bez: [...u].filter((k) => !rjecnik.has(k)), mrtvi: [...rjecnik].filter((k) => !u.has(k)) }, { bez: [], mrtvi: [] });
  });

  await test('oba ulaza zovu ISTU funkciju (ADR-026: jedna radnja, dva ulaza) i modul stiže na oba mjesta', () => {
    const studio = fs.readFileSync(path.join(KORIJEN, 'js', 'studio.js'), 'utf8');
    const mm = fs.readFileSync(path.join(KORIJEN, 'js', 'my-materials.js'), 'utf8');
    assert.ok(/SokratConnectAi\.ugradi\(el, \{ bezKonektora: 'onemoguci' \}\)/.test(studio), 'Studio ne zove ugradi');
    assert.ok(/SokratConnectAi\.ugradi\([^;]*bezKonektora: 'sakrij'/.test(mm), 'Moji materijali ne zovu ugradi');
    assert.ok(!/studio\.aiBtn|disabled>' \+ esc\(t\('studio/.test(studio), 'stari onemogućeni gumb još stoji u Studiju');
    const editor = fs.readFileSync(path.join(KORIJEN, 'editor.html'), 'utf8');
    assert.ok(editor.indexOf('js/connect-ai.js') > 0 && editor.indexOf('js/connect-ai.js') < editor.indexOf('js/studio.js'), 'editor.html ne učita connect-ai.js prije studio.js');
    const loader = fs.readFileSync(path.join(KORIJEN, 'js', 'loader.js'), 'utf8');
    for (const paket of ['materials', 'profile']) {
      const red = (loader.match(new RegExp('\\n\\s*' + paket + ": \\[([^\\]]*)\\]")) || [])[1] || '';
      assert.ok(red.indexOf('connect-ai.js') >= 0 && red.indexOf('connect-ai.js') < red.indexOf('my-materials.js'), paket + ': connect-ai.js nije prije my-materials.js');
    }
  });

  // ── ②/5.2 animirani tutorial ──────────────────────────────────────────────────────────────
  /** Otvori prozor u lažnom dokumentu i vrati njegov markup za zadanu aplikaciju. */
  function markup(app) {
    const m = { innerHTML: '', setAttribute() {}, addEventListener() {}, open() {} };
    const kontekst = {
      console, URL, Date, Promise, navigator: {},
      _readSupabaseOverride: () => STAGING,
      SokratAuth: { getClient: () => null },
      document: { getElementById: () => null, createElement: () => m, body: { appendChild() {} } }
    };
    kontekst.window = kontekst;
    vm.createContext(kontekst);
    vm.runInContext(IZVOR, kontekst);
    kontekst.SokratConnectAi.otvori(app);
    return m.innerHTML;
  }
  const CSS = fs.readFileSync(path.join(KORIJEN, 'css', 'connect-ai.css'), 'utf8');

  await test('②/5.2 animacija je SAMO na kartici Claude, ukras je (aria-hidden), ima četiri scene i u polju pravu adresu', () => {
    const c = markup('claude'); const g = markup('chatgpt');
    assert.ok(/class="cai-anim" aria-hidden="true"/.test(c), 'Claude bez animacije ili bez aria-hidden');
    assert.ok(!/cai-anim/.test(g), 'animacija i na ChatGPT-u (nije tražena)');
    for (const s of [1, 2, 3, 4]) assert.ok(c.includes('cai-anim__s' + s), 'nema scene ' + s);
    assert.ok(c.includes('<p class="cai-anim__field"><span>https://czljmvigkgiajzjxtndq.supabase.co/functions/v1/mcp</span>'), 'polje ne nosi adresu konektora');
    assert.strictEqual((c.match(/cai-anim__cur/g) || []).length, 4, 'kursor nije u svakoj sceni');
    assert.ok(/cai__steps cai__steps--anim/.test(c) && !/steps--anim/.test(g), 'koraci ne prate animaciju (ili prate i na ChatGPT-u)');
  });

  await test('②/5.2 zadnja scena = NAŠA stranica za odobrenje: iste riječi (oauth.title/allow/deny) kao odobrenje.html', () => {
    const c = markup('claude');
    for (const k of ['oauth.title', 'oauth.allow', 'oauth.deny']) assert.ok(IZVOR.includes("tt('" + k + "'"), 'animacija ne koristi ' + k);
    const odob = fs.readFileSync(path.join(KORIJEN, 'odobrenje.html'), 'utf8');
    for (const k of ['oauth.title', 'oauth.allow', 'oauth.deny']) {
      assert.ok(odob.includes('data-i18n="' + k + '"'), 'odobrenje.html više ne nosi ' + k + ' — animacija bi pokazivala drugo');
    }
    assert.ok(c.includes('Allow') && c.includes('Deny'), 'Allow/Deny nisu u sceni');
  });

  await test('②/5.2 bez kretanja (prefers-reduced-motion) animacije nema i koraci ne trepću', () => {
    const blok = (CSS.match(/@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*?)\n\}/) || [])[1] || '';
    assert.ok(/\.cai-anim\s*\{\s*display:\s*none;?\s*\}/.test(blok), 'animacija se ne gasi: ' + blok);
    assert.ok(/\.cai__steps--anim li\s*\{\s*animation:\s*none;?\s*\}/.test(blok), 'koraci i dalje trepću bez kretanja');
  });

  await test('②/5.2 korak NE svijetli prije svog reda (0 % ključnog kadra ugašen; izmjereno kadrom 03.10.)', () => {
    const kf = (CSS.match(/@keyframes cai-korak\s*\{([\s\S]*?)\n\}/) || [])[1] || '';
    assert.ok(/(^|\n)\s*0%\s*\{\s*background-color:\s*transparent;?\s*\}/.test(kf), 'cai-korak 0 % nije ugašen: ' + kf);
    // ista zamka za ostale s kašnjenjem: 0 % mora biti „nevidljivo" stanje
    const nula = (ime) => ((CSS.match(new RegExp('@keyframes ' + ime + '\\s*\\{([\\s\\S]*?)\\n\\}')) || [])[1] || '').match(/(^|\n)\s*0%[^{]*\{([^}]*)\}/);
    assert.ok(/opacity:\s*0/.test((nula('cai-scena') || [])[2] || ''), 'scena je vidljiva prije svog reda');
    assert.ok(/opacity:\s*0/.test((nula('cai-gotovo') || [])[2] || ''), '„Povezano" vidljivo prije svog reda');
  });

  await test('②/5.2 animiraju se samo opacity, transform i boja (bez skupog rasporeda)', () => {
    const svi = [...CSS.matchAll(/@keyframes (cai-[a-z]+)\s*\{([\s\S]*?)\n\}/g)];
    assert.ok(svi.length >= 6, 'premalo ključnih kadrova: ' + svi.length);
    for (const [, ime, tijelo] of svi) {
      const svojstva = new Set([...tijelo.matchAll(/([a-z-]+)\s*:/g)].map((m) => m[1]));
      const lose = [...svojstva].filter((s) => !['opacity', 'transform', 'background-color', 'color'].includes(s));
      assert.deepStrictEqual(lose, [], ime + ' animira ' + lose.join(', '));
    }
  });

  console.log('\n  ' + proslo + ' prošlo, ' + pao + ' palo\n');
  process.exit(pao ? 1 : 0);
})();
