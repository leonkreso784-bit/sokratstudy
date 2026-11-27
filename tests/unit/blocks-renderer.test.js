/* eslint-disable no-console */
// ===== Node unit test za js/blocks-renderer.js (U7b — JEDAN renderer = sigurnosna granica) =====
// Pokreni: node tests/unit/blocks-renderer.test.js
// Shim-obrazac (kao draft-store/get-categories): klasična skripta kroz new Function('window', code).
// `document` je u node undefined → YouTube-delegat guard preskoči; render se testira kao PURE fn.
// Naglasak: ESCAPING svih polja + odbijanje opasnih URL-ova/shema (XSS-fixtures).

const assert = require('assert');
const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  ✓ ' + name); }
  catch (e) { failed++; console.error('  ✗ ' + name + '\n      ' + e.message); }
}

console.log('\n=== blocks-renderer (U7b) ===\n');

// ⚠️ `utils.js` IDE PRVI — točno kao u pregledniku (i u `index.html` i u `editor.html` stoji
// prije renderera). Od učitavanja po ruti `inkForTint` i `safeIcon` stanuju ondje: landing i
// `profile.js` ih trebaju, a renderer stiže tek s paketom `study`. Renderer ih doseže preko
// `window.`, pa test mora složiti isti šav — inače bi zeleno značilo samo „nitko ih nije zvao".
const utils = fs.readFileSync(path.join(__dirname, '..', '..', 'js', 'utils.js'), 'utf8');
const code = fs.readFileSync(path.join(__dirname, '..', '..', 'js', 'blocks-renderer.js'), 'utf8');
const win = {};
new Function('window', utils)(win);
new Function('window', code)(win); // nema top-level browser-poziva (document guardan) → čist load
const R = win.renderBlocks;
const B = win.SokratBlocks;

// ── osnovno ──
test('izvezen na window (renderBlocks + SokratBlocks)', function () {
  assert.strictEqual(typeof R, 'function');
  assert.strictEqual(typeof B.render, 'function');
});
test('nije niz → prazan string', function () {
  assert.strictEqual(R(null), '');
  assert.strictEqual(R(undefined), '');
  assert.strictEqual(R({}), '');
});
test('null/ne-objekt članovi i nepoznat tip → preskočeni (fail-safe)', function () {
  const out = R([null, 'x', 42, { type: 'nepostoji', text: 'a' }, { type: 'paragraph', text: 'ok' }]);
  assert.strictEqual(out, '<p class="lb-paragraph">ok</p>');
});

// ── heading ──
test('heading: level clamp 2–4 (default 3) + escaped tekst', function () {
  assert.ok(R([{ type: 'heading', level: 2, text: 'A' }]).indexOf('<h2 class="lb-heading">A</h2>') === 0);
  assert.ok(R([{ type: 'heading', level: 9, text: 'A' }]).indexOf('<h3') === 0); // izvan raspona → 3
  assert.ok(R([{ type: 'heading', text: 'A' }]).indexOf('<h3') === 0);           // bez levela → 3
  assert.strictEqual(R([{ type: 'heading', level: 2, text: '<b>x</b>' }]), '<h2 class="lb-heading">&lt;b&gt;x&lt;/b&gt;</h2>');
});

// ── paragraph + XSS ──
test('paragraph: <script> ESCAPAN (ne izvršiv)', function () {
  const out = R([{ type: 'paragraph', text: '<script>alert(1)</script>' }]);
  assert.strictEqual(out, '<p class="lb-paragraph">&lt;script&gt;alert(1)&lt;/script&gt;</p>');
  assert.ok(out.indexOf('<script>') === -1);
});
test('paragraph: napad kroz atribut ("><img onerror>) escapan', function () {
  const out = R([{ type: 'paragraph', text: '"><img src=x onerror=alert(1)>' }]);
  assert.ok(out.indexOf('<img') === -1);
  assert.ok(out.indexOf('onerror') !== -1 && out.indexOf('&gt;') !== -1); // kao tekst, ne tag
});

// ── inline runs (bold/italic/color/link) ──
test('runs: b/i/color(token) omotani ispravno', function () {
  const out = B._renderInline([{ text: 'x', b: true, i: true, color: 'green' }]);
  assert.strictEqual(out, '<span class="lb-color-green"><em><strong>x</strong></em></span>');
});
test('runs: nepoznata boja se IGNORIRA (nema proizvoljne boje)', function () {
  const out = B._renderInline([{ text: 'x', color: 'hotpink' }]);
  assert.strictEqual(out, 'x');
});
test('runs: link http → anchor s rel=noopener; javascript: → BEZ anchora', function () {
  const ok = B._renderInline([{ text: 'go', href: 'https://a.com' }]);
  assert.ok(ok.indexOf('<a href="https://a.com" target="_blank" rel="noopener noreferrer">go</a>') === 0);
  const bad = B._renderInline([{ text: 'go', href: 'javascript:alert(1)' }]);
  assert.strictEqual(bad, 'go'); // href odbijen → samo tekst
});

// ── list ──
test('list: ul/ol + escapane stavke', function () {
  assert.strictEqual(R([{ type: 'list', items: ['a', '<b>'] }]), '<ul class="lb-list"><li>a</li><li>&lt;b&gt;</li></ul>');
  assert.ok(R([{ type: 'list', ordered: true, items: ['a'] }]).indexOf('<ol') === 0);
});

// ── callout ──
test('callout: nepoznat variant → info; title escapan', function () {
  const out = R([{ type: 'callout', variant: 'zzz', title: '<t>', text: 'body' }]);
  assert.ok(out.indexOf('lb-callout--info') !== -1);
  assert.ok(out.indexOf('&lt;t&gt;') !== -1);
});

// ── image + URL sanitizacija ──
test('image: valjan src → <img>; alt escapan', function () {
  const out = R([{ type: 'image', src: 'https://x/y.png', alt: '"a"' }]);
  // ⚠️ Klase su od C5b/1b PREZENTACIJSKE + utility (`h-auto max-w-full`); tvrdnja pina markup,
  // pa ju svaka seoba skele mora pratiti. Ono što se OVDJE dokazuje je escaping, ne izgled.
  assert.ok(out.indexOf('<img class="lb-figure__img h-auto max-w-full" src="https://x/y.png" alt="&quot;a&quot;"') !== -1);
});
test('image: javascript:/data:svg src → blok IZOSTAVLJEN', function () {
  assert.strictEqual(R([{ type: 'image', src: 'javascript:alert(1)' }]), '');
  assert.strictEqual(R([{ type: 'image', src: 'data:image/svg+xml,<svg onload=alert(1)>' }]), '');
});
test('image: relativni put i data:image/png OK', function () {
  assert.ok(R([{ type: 'image', src: 'assets/x.png' }]).indexOf('<img') !== -1);
  assert.ok(R([{ type: 'image', src: 'data:image/png;base64,AAAA' }]).indexOf('<img') !== -1);
});

// ── video (youtube) ──
test('video: valjan ID → facade s data-lb-yt (bez iframea prije klika)', function () {
  const out = R([{ type: 'video', videoId: 'dQw4w9WgXcQ' }]);
  assert.ok(out.indexOf('data-lb-yt="dQw4w9WgXcQ"') !== -1);
  assert.ok(out.indexOf('<iframe') === -1);       // NEMA iframea u facade-u (consent-safe)
  assert.ok(out.indexOf('youtube') === -1);        // nula YT-URL-ova prije klika
});
test('video: ID iz raznih URL-oblika; nevaljan → izostavljen', function () {
  assert.strictEqual(B._youtubeId('https://youtu.be/dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
  assert.strictEqual(B._youtubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1s'), 'dQw4w9WgXcQ');
  assert.strictEqual(B._youtubeId('https://www.youtube.com/shorts/dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
  assert.strictEqual(B._youtubeId('not a video'), '');
  assert.strictEqual(R([{ type: 'video', url: 'not a video' }]), '');
});

// ── table ──
test('table: header + redovi, ćelije escapane', function () {
  const out = R([{ type: 'table', header: ['H<'], rows: [['a', '<x>']] }]);
  assert.ok(out.indexOf('<th>H&lt;</th>') !== -1);
  assert.ok(out.indexOf('<td>&lt;x&gt;</td>') !== -1);
});

// ── formula (KaTeX) ──
test('formula: display → \\[ \\], inline → \\( \\), tex escapan', function () {
  assert.strictEqual(R([{ type: 'formula', tex: 'x^2' }]), '<div class="lb-formula overflow-x-auto text-center">\\[x^2\\]</div>');
  assert.ok(R([{ type: 'formula', tex: 'x', display: false }]).indexOf('\\(x\\)') !== -1);
  assert.ok(R([{ type: 'formula', tex: 'a<b' }]).indexOf('a&lt;b') !== -1); // < escapan (KaTeX čita textContent)
});

// ── legacy-html: DOMPurify (mock) + fallback ──
test('legacy-html: koristi window.DOMPurify.sanitize ako postoji', function () {
  let gotHtml = null, gotCfg = null;
  win.DOMPurify = { sanitize: function (h, cfg) { gotHtml = h; gotCfg = cfg; return '[CLEAN]'; } };
  const out = R([{ type: 'legacy-html', html: '<p>hi</p><script>x</script>' }]);
  assert.strictEqual(out, '<div class="lb-legacy">[CLEAN]</div>');
  assert.ok(gotHtml.indexOf('<script>') !== -1);       // proslijeđen sirov DOMPurify-u
  assert.ok(Array.isArray(gotCfg.ALLOWED_TAGS));       // proslijeđen config
  delete win.DOMPurify;
});
// F6 ②/0d (MCP_SECURITY N2): bez sanitizatora HTML izlazi kao TEKST, i za katalog. Do sad je fallback
// bio „raw za naš povjerljiv v1" — a isti put crta i osobni sadržaj, pa je pad CDN-a otvarao
// `iframe srcdoc` koji je uz produkcijski CSP pročitao sesiju (lokalni pokus, dionica A).
test('legacy-html: bez DOMPurify NIJEDNA oznaka ne prolazi — sadržaj ostaje kao tekst (N2)', function () {
  assert.strictEqual(win.DOMPurify, undefined, 'test mora vrtjeti BEZ sanitizatora');
  const zlo = '<p>trusted</p><iframe srcdoc="<script src=https://cdn.jsdelivr.net/gh/x/y/a.js></script>"></iframe>'
    + '<img src=x onerror=alert(1)><a href="javascript:alert(1)">k</a>';
  const out = R([{ type: 'legacy-html', html: zlo }]);
  const oznake = (out.match(/<[a-z]+/gi) || []).filter(function (t) { return t !== '<div'; });
  assert.deepStrictEqual(oznake, [], out);
  assert.ok(out.indexOf('trusted') !== -1, 'tekst je izgubljen: ' + out);
});

// ── safeUrl (izravno) ──
test('safeUrl: dopušta http(s)/mailto/relativni/#/protocol-relative', function () {
  ['https://a.com', 'http://a.com', 'mailto:a@b.com', '/x', './x', '#top', '//cdn/x.js', 'foo/bar']
    .forEach(function (u) { assert.strictEqual(B._safeUrl(u), u, u); });
});
test('safeUrl: odbija javascript:/data:text/vbscript:/file: (→ prazno)', function () {
  ['javascript:alert(1)', 'JAVAScript:x', 'data:text/html,<script>', 'vbscript:x', 'file:///etc/passwd']
    .forEach(function (u) { assert.strictEqual(B._safeUrl(u), '', u); });
});
// ── F6 ②/0c (MCP_SECURITY N1): preglednik iz adrese IZBACUJE kontrolne znakove prije nego pročita
// shemu (vodeće/prateće C0 i razmak, TAB/LF/CR bilo gdje). Provjera koja shemu traži u NEOČIŠĆENOM
// nizu vidi „nema sheme" dok preglednik vidi `javascript:`. Adrese dolaze iz ISTIH primjera koje
// odbija baza (`tests/fixtures/ugc-sadrzaj.js`) — renderer ih mora odbiti i za sadržaj koji do
// njega stigne mimo baze (katalog, lokalni nacrt, stari redak).
const { pada: UGC_PADA } = require(path.join(__dirname, '..', 'fixtures', 'ugc-sadrzaj.js'));
const OPASNE_IZ_PRIMJERA = UGC_PADA
  .map(function (p) { try { return p.payload.l1.learn.blocks[0].text[0].href; } catch (e) { return undefined; } })
  .filter(function (h) { return typeof h === 'string'; })
  // Samo one koje SRICAJU opasnu shemu kad se izbace razmaci/kontrolni znakovi. `pada` nosi i
  // poveznice koje shema odbija iz drugih razloga (razmak u adresi) — za renderer bezopasne.
  .filter(function (h) { return /^(javascript|vbscript|data):/.test(h.replace(/[\u0000- \u007f ﻿]/g, '').toLowerCase()); });
const OPASNE_DODATNO = [' javascript:alert(1)', '\u0001java\tscript:alert(1)', 'java\u0001script:alert(1)',
  'javascript\t:alert(1)', 'javascript:alert(1)\u0000', ' \u0009data:text/html,x', 'JaVaScRiPt:alert(1)'];
test('safeUrl: primjeri poveznica iz baza-brane postoje (≥ 10) — inače test ne mjeri ništa', function () {
  assert.ok(OPASNE_IZ_PRIMJERA.length >= 10, 'nađeno ' + OPASNE_IZ_PRIMJERA.length);
});
test('safeUrl: odbija SVE opasne adrese iz primjera i s kontrolnim znakovima (N1)', function () {
  const propusteno = OPASNE_IZ_PRIMJERA.concat(OPASNE_DODATNO)
    .filter(function (u) { return B._safeUrl(u) !== '' || B._safeUrl(u, { image: true }) !== ''; });
  assert.deepStrictEqual(propusteno.map(function (u) { return JSON.stringify(u); }), []);
});
test('safeUrl: kontrola — valjane adrese s razmakom/TAB-om i dalje prolaze (nije „odbij sve")', function () {
  ['https://example.com/a', ' https://example.com/b ', 'https://exa\tmple.com/c', 'mailto:a@b.hr', 'www.example.com', '#sidro']
    .forEach(function (u) { assert.notStrictEqual(B._safeUrl(u), '', JSON.stringify(u)); });
});
test('safeUrl: data:image/png samo uz {image:true}; svg uvijek odbijen', function () {
  assert.strictEqual(B._safeUrl('data:image/png;base64,AA', { image: true }), 'data:image/png;base64,AA');
  assert.strictEqual(B._safeUrl('data:image/png;base64,AA'), '');            // bez image opt → odbij
  assert.strictEqual(B._safeUrl('data:image/svg+xml,<svg>', { image: true }), '');
});

// ── U8.5e — image width (kurirana širina u %) ──
test('image width: 10–99 → style="width:NN%" (zaokružen broj)', function () {
  const out = R([{ type: 'image', src: 'https://a.com/x.png', width: 55 }]);
  assert.ok(out.indexOf('style="width:55%"') !== -1, out);
  const out2 = R([{ type: 'image', src: 'https://a.com/x.png', width: 33.4 }]);
  assert.ok(out2.indexOf('style="width:33%"') !== -1, out2);
});
test('image width: 100 / izvan raspona / ne-broj → BEZ style (granica: samo naš broj u style)', function () {
  [100, 5, 500, -20, 'abc', null, undefined, '55; background:url(x)'].forEach(function (w) {
    const out = R([{ type: 'image', src: 'https://a.com/x.png', width: w }]);
    assert.ok(out.indexOf('style=') === -1, 'width=' + w + ' → ' + out);
  });
});

// ── INLINE MATEMATIKA (run `math:true`) ──
// Ugovor: renderer NE tipografira — ispljune `\(tex\)` kao TEKST, a renderMath ga obradi
// poslije umetanja (isti put kao formula-blok). `esc()` ostaje → nema nove površine.
test('inline math: run {math:true} → \\( … \\) unutar lb-imath', function () {
  const out = R([{ type: 'paragraph', text: [{ text: 'ako je ' }, { text: 'x^2', math: true }] }]);
  assert.ok(out.indexOf('lb-imath') !== -1, out);
  assert.ok(out.indexOf('\\(x^2\\)') !== -1, out);
  assert.ok(out.indexOf('ako je ') !== -1, 'tekst oko formule je izgubljen: ' + out);
});
test('inline math: renderer NE tipografira (nikakav katex-markup ne izlazi odavde)', function () {
  const out = R([{ type: 'paragraph', text: [{ text: 'a+b', math: true }] }]);
  assert.ok(out.indexOf('katex') === -1, out);
});
test('inline math: HTML u LaTeX-u je ESCAPAN (sigurnosna granica drži)', function () {
  const out = R([{ type: 'paragraph', text: [{ text: '<img src=x onerror=alert(1)>', math: true }] }]);
  assert.ok(out.indexOf('<img') === -1, 'sirov <img> je procurio: ' + out);
  assert.ok(out.indexOf('&lt;img') !== -1, out);
});
test('inline math: math je EKSKLUZIVAN — b/i/color/href se ignoriraju', function () {
  const out = R([{ type: 'paragraph', text: [
    { text: 'x', math: true, b: true, i: true, color: 'red', href: 'javascript:alert(1)' }] }]);
  assert.ok(out.indexOf('<strong>') === -1, out);
  assert.ok(out.indexOf('<em>') === -1, out);
  assert.ok(out.indexOf('lb-color-') === -1, out);
  assert.ok(out.indexOf('<a ') === -1, 'href se ne smije primijeniti na formulu: ' + out);
});

// ── M3a — BOJA BLOKA (akcent). Ugovor: docs/product/UGC_SPEC.md §3 ──
// Boja bloka je AKCENT (rub + tinta), ne boja teksta. Prostor je `#rrggbb` kao kod sekcije,
// pa nasljeđivanje sekcija→blok živi u JEDNOM prostoru. Renderer je sigurnosna granica:
// u `style` smije ući ISKLJUČIVO vrijednost koja je prošla `^#[0-9a-fA-F]{6}$`.
test('boja bloka: valjan #rrggbb → omot s --lb-acc', function () {
  const out = R([{ type: 'paragraph', text: 'x', color: '#ff8800' }]);
  assert.ok(out.indexOf('class="lb-tint"') !== -1, out);
  assert.ok(out.indexOf('style="--lb-acc:#ff8800"') !== -1, out);
  assert.ok(out.indexOf('<p class="lb-paragraph">') !== -1, 'sadržaj bloka mora ostati netaknut: ' + out);
});
test('boja bloka: velika slova u hexu prolaze (pattern je case-insensitive)', function () {
  const out = R([{ type: 'paragraph', text: 'x', color: '#AABBCC' }]);
  assert.ok(out.indexOf('style="--lb-acc:#AABBCC"') !== -1, out);
});
test('boja bloka: ODSUTNA → nema omota (= naslijedi od sekcije, ne „bez boje")', function () {
  const out = R([{ type: 'paragraph', text: 'x' }]);
  assert.ok(out.indexOf('lb-tint') === -1, out);
  assert.ok(out.indexOf('--lb-acc') === -1, out);
});
test('boja bloka: INJEKCIJA — sve što nije točno #rrggbb se odbija', function () {
  const zli = [
    'red', 'rgb(1,2,3)', '#fff', '#12345', '#1234567', 'var(--x)',
    '#fff;background:url(javascript:alert(1))',
    '#ffffff" onload="alert(1)',
    '#ffffff"><script>alert(1)</script>',
    'expression(alert(1))', '', null, undefined, 0, {}, []
  ];
  zli.forEach(function (c) {
    const out = R([{ type: 'paragraph', text: 'x', color: c }]);
    assert.ok(out.indexOf('--lb-acc') === -1, 'propuštena boja ' + JSON.stringify(c) + ': ' + out);
    assert.ok(out.indexOf('onload') === -1 && out.indexOf('<script') === -1, out);
    assert.ok(out.indexOf('lb-tint') === -1, out);
  });
});
test('boja bloka: vrijedi za SVE tipove, ne samo paragraph', function () {
  const uzorci = [
    { type: 'heading', level: 2, text: 'h', color: '#112233' },
    { type: 'list', items: ['a'], color: '#112233' },
    { type: 'callout', text: 'c', color: '#112233' },
    { type: 'table', rows: [['a']], color: '#112233' },
    { type: 'formula', tex: 'x', color: '#112233' },
    { type: 'image', src: 'https://a.com/x.png', color: '#112233' }
  ];
  uzorci.forEach(function (b) {
    const out = R([b]);
    assert.ok(out.indexOf('style="--lb-acc:#112233"') !== -1, b.type + ' nema akcent: ' + out);
  });
});
test('boja bloka: blok koji se IZOSTAVI (nevaljan URL) ne dobiva prazan obojani omot', function () {
  const out = R([{ type: 'image', src: 'javascript:alert(1)', color: '#112233' }]);
  assert.strictEqual(out, '', 'prazan blok ne smije ostaviti omot iza sebe: ' + out);
});

// ─────────────────────────────────────────────────────────────────────────────
// M3b — AKCENT STUDY-STAVKE (kartica / pitanje / dopuna). Ugovor: UGC_SPEC §3.
// Druga površina od M3a: tri study-prikazivača pišu u FIKSNI DOM (`textContent`), pa
// nema omota u koji bi se boja umetnula → akcent ide kao `--item-acc` na spremnik.
// Validacija mora biti ISTA i na JEDNOM mjestu (tri regexa = drift koji smo već platili).
// ─────────────────────────────────────────────────────────────────────────────

function fakeEl() {
  return {
    style: {
      _p: {},
      setProperty: function (k, v) { this._p[k] = v; },
      removeProperty: function (k) { delete this._p[k]; }
    }
  };
}

test('M3b: akcent stavke je izvezen (accentFrom + applyAccent)', function () {
  assert.strictEqual(typeof B.accentFrom, 'function');
  assert.strictEqual(typeof B.applyAccent, 'function');
});

test('M3b: NASLJEĐIVANJE — prvi valjan kandidat pobjeđuje (stavka pregazi sekciju)', function () {
  assert.strictEqual(B.accentFrom(['#112233', '#445566']), '#112233', 'stavka mora pregaziti sekciju');
  assert.strictEqual(B.accentFrom([undefined, '#445566']), '#445566', 'bez svoje boje se nasljeđuje sekcija');
  assert.strictEqual(B.accentFrom(['', '#445566']), '#445566', 'prazan niz je odsutnost, ne izbor');
  assert.strictEqual(B.accentFrom(['crvena', '#445566']), '#445566', 'nevaljana stavka pada na sekciju');
  assert.strictEqual(B.accentFrom([undefined, undefined]), '', 'ništa valjano → ništa');
  assert.strictEqual(B.accentFrom(null), '', 'ne-niz ne smije baciti');
});

test('M3b: applyAccent postavlja `--item-acc`, a odsutnost ga UKLANJA (ne postavlja prazno)', function () {
  const el = fakeEl();
  B.applyAccent(el, ['#10b981']);
  assert.strictEqual(el.style._p['--item-acc'], '#10b981');
  // Ista kartica bez boje mora očistiti prethodnu — inače boja CURI na sljedeću stavku.
  B.applyAccent(el, [undefined, undefined]);
  assert.ok(!('--item-acc' in el.style._p), 'svojstvo je ostalo: ' + JSON.stringify(el.style._p));
});

test('M3b: applyAccent ne baca na null/besmislenom elementu', function () {
  assert.strictEqual(B.applyAccent(null, ['#10b981']), '#10b981');
  assert.strictEqual(B.applyAccent({}, ['#10b981']), '#10b981');
});

// C2: element koji zna i za atribute — `data-ink` ide kroz setAttribute, ne kroz style.
function fakeElAttr() {
  const el = fakeEl();
  el._a = {};
  el.setAttribute = function (k, v) { this._a[k] = String(v); };
  el.removeAttribute = function (k) { delete this._a[k]; };
  return el;
}

test('C2: inkForTint je izvezen i bira tintu po luminanciji (ne pogađa)', function () {
  assert.strictEqual(typeof B.inkForTint, 'function');
  assert.strictEqual(B.inkForTint('#ffffff'), 'dark', 'svijetla ploha traži tamnu tintu');
  assert.strictEqual(B.inkForTint('#000000'), 'light', 'tamna ploha traži svijetlu tintu');
  // slučaj koji je i motivirao alat: bijela na #f59e0b daje 2.15 — tinta MORA biti tamna
  assert.strictEqual(B.inkForTint('#f59e0b'), 'dark');
  assert.strictEqual(B.inkForTint('nije-boja'), 'light', 'nepoznat oblik → stari izgled');
});

test('C2: applyAccent postavlja `data-ink` uz boju, a odsutnost boje ga UKLANJA', function () {
  const el = fakeElAttr();
  B.applyAccent(el, ['#f59e0b']);
  assert.strictEqual(el._a['data-ink'], 'dark', 'puna ispuna bez tinte je C1 razred greške');
  // bez boje se atribut čisti — inače tinta CURI na sljedeću stavku istog DOM-a
  B.applyAccent(el, [undefined, undefined]);
  assert.ok(!('data-ink' in el._a), 'data-ink je ostao: ' + JSON.stringify(el._a));
});

test('M3b: injekcija kroz boju stavke se ODBIJA (isti skup kao M3a)', function () {
  const zli = [
    'red', 'rgb(1,2,3)', '#fff', '#12345', '#1234567', 'var(--x)',
    '#fff;background:url(javascript:alert(1))',
    '#ffffff" onload="alert(1)',
    '#ffffff"><script>alert(1)</script>',
    'expression(alert(1))', '', null, undefined, 0, {}, []
  ];
  zli.forEach(function (c) {
    assert.strictEqual(B.accentFrom([c]), '', 'propuštena boja ' + JSON.stringify(c));
    const el = fakeEl();
    B.applyAccent(el, [c]);
    assert.ok(!('--item-acc' in el.style._p), 'propušteno u DOM: ' + JSON.stringify(c));
  });
});

test('M3b: akcent stavke i akcent bloka dijele ISTU provjeru (nema drifta)', function () {
  // Ako se ikad raziđu, ovaj test pada prvi.
  ['#112233', '#abcdef', '#000000'].forEach(function (ok) {
    assert.strictEqual(B.accentFrom([ok]), ok);
    assert.ok(R([{ type: 'paragraph', text: 'x', color: ok }]).indexOf('--lb-acc:' + ok) !== -1);
  });
  ['#fff', 'red', '#12345g'].forEach(function (bad) {
    assert.strictEqual(B.accentFrom([bad]), '');
    assert.ok(R([{ type: 'paragraph', text: 'x', color: bad }]).indexOf('--lb-acc') === -1);
  });
});

// ══════════════════════════════════════════════════════════════════════════════════════════════
// BUG-024 — `renderContentBlocks` je JEDINI ulaz za prikaz sadržaja
//
// Bug nije bio „learn.js ima grešku" nego „pravilo živi u glavama": pred-obradu (razrješavanje
// `node-img:` oznaka u potpisane URL-ove) prepisivala su ČETIRI pozivatelja, a jedan ju je
// zaboravio. Zato ovdje stoje DVA testa: da omotač radi svoj posao i — važnije — da ga se ne
// može zaobići. Drugi je pravi gate (ADR-027: rub koji prepoznaš isti čas dobiva test).
// ══════════════════════════════════════════════════════════════════════════════════════════════

// ── omotač: razrješava, pa renderira ──
{
  const MARKER = 'node-img:';
  /** Minimalan dvojnik `SokratNodeImages` — testira se UGOVOR, ne implementacija modula. */
  function fakeNI(signed) {
    return {
      isMarker: (s) => typeof s === 'string' && s.lastIndexOf(MARKER, 0) === 0,
      resolveBlocks: (blocks) => (Array.isArray(blocks) ? blocks.map((b) => {
        if (!b || b.type !== 'image' || typeof b.src !== 'string') return b;
        const url = signed[b.src];
        return url ? Object.assign({}, b, { src: url }) : b;
      }) : blocks),
    };
  }
  /** Svjež modul + uhvaćena upozorenja (dijeljeni `console` bi curio među testovima). */
  function loadWith(NI) {
    const w = { SokratNodeImages: NI, _warn: [] };
    new Function('window', 'console', code)(w, { warn: function () { w._warn.push([].slice.call(arguments)); } });
    return w;
  }

  test('izvezen je i `renderContentBlocks` (window + SokratBlocks.renderContent)', function () {
    assert.strictEqual(typeof win.renderContentBlocks, 'function');
    assert.strictEqual(typeof B.renderContent, 'function');
  });

  test('oznaka `node-img:` se razriješi u potpisani URL PRIJE rendera', function () {
    const url = 'https://sb/storage/v1/object/sign/node-images/U/N/a.png?token=T';
    const w = loadWith(fakeNI({ 'node-img:U/N/a.png': url }));
    const out = w.renderContentBlocks([{ type: 'image', src: 'node-img:U/N/a.png', alt: 'p' }]);
    assert.ok(out.indexOf('<img') !== -1, 'slika mora postojati: ' + out);
    assert.ok(out.indexOf('token=T') !== -1, 'mora nositi POTPISANI url: ' + out);
    assert.strictEqual(w._warn.length, 0, 'razriješena slika ne smije upozoravati');
  });

  test('NErazriješena oznaka se izostavi (fail-safe) ALI GLASNO — tihi kvar je propustio BUG-024', function () {
    const w = loadWith(fakeNI({}));                       // ništa nije potpisano
    const out = w.renderContentBlocks([{ type: 'image', src: 'node-img:U/N/a.png' }]);
    assert.strictEqual(out.indexOf('<img'), -1, 'nepoznata shema ne smije proizvesti <img>');
    assert.strictEqual(w._warn.length, 1, 'nerazriješena slika MORA upozoriti');
    assert.ok(String(w._warn[0][0]).indexOf('prefetch') !== -1, 'poruka mora reći ŠTO nedostaje');
  });

  test('bez SokratNodeImages (katalog) omotač je čist prolaz — ista granica, nula upozorenja', function () {
    const w = loadWith(undefined);
    assert.strictEqual(w.renderContentBlocks([{ type: 'paragraph', text: 'ok' }]),
      '<p class="lb-paragraph">ok</p>');
    assert.strictEqual(w._warn.length, 0);
  });

  test('omotač ne slabi sanitizaciju: `javascript:` prolazi kroz isti safeUrl', function () {
    const w = loadWith(fakeNI({}));
    assert.strictEqual(w.renderContentBlocks([{ type: 'image', src: 'javascript:alert(1)' }]).indexOf('<img'), -1);
  });

  test('vanjski URL (javni katalog) prolazi nedirnut i bez upozorenja', function () {
    const w = loadWith(fakeNI({}));
    const out = w.renderContentBlocks([{ type: 'image', src: 'https://cdn.example/x.png', alt: 'a' }]);
    assert.ok(out.indexOf('https://cdn.example/x.png') !== -1);
    assert.strictEqual(w._warn.length, 0);
  });
}

// ── BUG-025: `esc` / `safeUrl` / `safeIcon` su javni ugovor, ne interni helperi ──
// Escape je do BUG-025 postojao samo kao `_esc` (za testove), pa je svaki pozivatelj izvan
// renderera imao izbor: napisati svoju kopiju ili ne escapati uopće. Biralo se ovo drugo.
test('BUG-025: esc/safeUrl/safeIcon su izvezeni (bez toga svatko piše svoju kopiju)', function () {
  assert.strictEqual(typeof B.esc, 'function');
  assert.strictEqual(typeof B.safeUrl, 'function');
  assert.strictEqual(typeof B.safeIcon, 'function');
  assert.strictEqual(B.esc, B._esc, 'javni i interni escape moraju biti ISTA funkcija');
});

test('BUG-025: esc čuva `<` iz formule (točan slučaj koji je razbio kviz o Z-tablici)', function () {
  assert.strictEqual(B.esc('\\(P(Z<z)\\)'), '\\(P(Z&lt;z)\\)');
  assert.strictEqual(B.esc('P&L'), 'P&amp;L');
  assert.strictEqual(B.esc('<img src=x onerror=alert(1)>'), '&lt;img src=x onerror=alert(1)&gt;');
  assert.strictEqual(B.esc('a"b\'c'), 'a&quot;b&#39;c', 'navodnici moraju pasti — ide i u atribute');
});

test('BUG-025: safeIcon propušta oblik `fa-…`, sve ostalo pada na default', function () {
  assert.strictEqual(B.safeIcon('fa-book-open'), 'fa-book-open');
  assert.strictEqual(B.safeIcon('  fa-chart-line  '), 'fa-chart-line', 'razmaci se skidaju');
  // Bijeg iz atributa `class` — escape ovdje NE bi pomogao (`&quot;` je i dalje razdjelnik klasa).
  assert.strictEqual(B.safeIcon('fa-book" onload="x'), 'fa-book');
  assert.strictEqual(B.safeIcon('fa-book danger-class'), 'fa-book', 'razmak = druga klasa');
  assert.strictEqual(B.safeIcon('FA-BOOK'), 'fa-book', 'velika slova nisu naš oblik');
  ['', null, undefined, 42, {}].forEach(function (bad) {
    assert.strictEqual(B.safeIcon(bad), 'fa-book', 'ulaz: ' + JSON.stringify(bad));
  });
  assert.strictEqual(B.safeIcon('', 'fa-folder'), 'fa-folder', 'fallback se poštuje');
});

// ── IZVORNA BRANA: omotač se ne smije zaobići ──
// Ovo je test koji bi BUG-024 uhvatio na dan kad je nastao. Sve dosadašnje provjere gledale su
// PONAŠANJE rendera; nijedna nije gledala TKO ga zove — a upravo je to bila greška.
test('nijedna datoteka osim renderera ne zove `renderBlocks(` izravno (BUG-024 gate)', function () {
  const jsDir = path.join(__dirname, '..', '..', 'js');
  const offenders = [];
  fs.readdirSync(jsDir).filter((f) => f.endsWith('.js') && f !== 'blocks-renderer.js').forEach((f) => {
    const src = fs.readFileSync(path.join(jsDir, f), 'utf8');
    src.split('\n').forEach((line, i) => {
      // `renderContentBlocks(` sadrži `renderBlocks(` kao podniz → traži granicu riječi ispred.
      if (/(^|[^A-Za-z0-9_.$])(window\.)?renderBlocks\s*\(/.test(line)) {
        offenders.push(f + ':' + (i + 1) + '  ' + line.trim());
      }
    });
  });
  assert.deepStrictEqual(offenders, [],
    'Prikaz sadržaja ide kroz `renderContentBlocks` — inače privatne slike osobnog materijala\n' +
    '      tiho nestanu (BUG-024). Prekršitelji:\n      ' + offenders.join('\n      '));
});

console.log('\nblocks-renderer: ' + passed + ' prošlo, ' + failed + ' palo');
process.exit(failed ? 1 : 0);
