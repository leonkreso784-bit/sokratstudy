/* eslint-disable no-console */
// ===== Node unit test za js/block-editor.js (U8a — vizualni blok-editor, čisti renderEditor) =====
// Pokreni: node tests/unit/block-editor.test.js
// Shim: učita blocks-renderer.js (window.renderBlocks za preview) + block-editor.js u ISTI window.
// U8a-1 je ČISTA fn (bez DOM-a) → testira se kao pure render (mount/event-wiring = U8a-2).

const assert = require('assert');
const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  ✓ ' + name); }
  catch (e) { failed++; console.error('  ✗ ' + name + '\n      ' + e.message); }
}
const count = (s, re) => (s.match(re) || []).length;

console.log('\n=== block-editor (U8a) ===\n');

const ROOT = path.join(__dirname, '..', '..');
const win = {};
new Function('window', fs.readFileSync(path.join(ROOT, 'js', 'blocks-renderer.js'), 'utf8'))(win);
new Function('window', fs.readFileSync(path.join(ROOT, 'js', 'block-editor-media.js'), 'utf8'))(win); // T1 rez: media PRIJE jezgre (window.__beMedia)
new Function('window', fs.readFileSync(path.join(ROOT, 'js', 'block-editor.js'), 'utf8'))(win);
const E = win.SokratBlockEditor;

const sample = [
  { id: 'aaa111', type: 'heading', level: 2, text: 'Naslov' },
  { id: 'bbb222', type: 'paragraph', text: 'Neki tekst.' },
  { id: 'ccc333', type: 'list', ordered: false, items: ['x', 'y'] }
];

test('izvezen na window (renderEditor + helperi)', function () {
  assert.strictEqual(typeof E.renderEditor, 'function');
  assert.strictEqual(typeof E._esc, 'function');
});

test('prazni blokovi → be-empty + jedan adder (at=0) + bigplus, bez be-block', function () {
  const h = E.renderEditor([]);
  assert.ok(h.indexOf('be-empty') !== -1, 'prazna poruka');
  assert.strictEqual(count(h, /class="be-block"/g), 0);
  assert.strictEqual(count(h, /class="be-adder"/g), 1);
  assert.ok(h.indexOf('data-be-at="0"') !== -1);
  assert.strictEqual(count(h, /class="be-bigplus"/g), 1);
});

test('ne-niz → tretira se kao prazno (fail-safe)', function () {
  assert.ok(E.renderEditor(null).indexOf('be-empty') !== -1);
  assert.ok(E.renderEditor(undefined).indexOf('be-empty') !== -1);
  assert.ok(E.renderEditor({}).indexOf('be-empty') !== -1);
});

test('N blokova → N kartica + (N+1) addera + numeracija 1..N', function () {
  const h = E.renderEditor(sample);
  assert.strictEqual(count(h, /class="be-block"/g), 3);
  assert.strictEqual(count(h, /class="be-adder"/g), 4); // prije svakog (3) + kraj (1)
  assert.ok(/<span class="be-n"[^>]*>1<\/span>/.test(h));
  assert.ok(/<span class="be-n"[^>]*>2<\/span>/.test(h));
  assert.ok(/<span class="be-n"[^>]*>3<\/span>/.test(h));
  assert.strictEqual(count(h, /class="be-empty"/g), 0);
});

test('adderi nose točne pozicije 0..N (umetni-ovdje + kraj)', function () {
  const h = E.renderEditor(sample);
  assert.ok(h.indexOf('data-be-at="0"') !== -1);
  assert.ok(h.indexOf('data-be-at="1"') !== -1);
  assert.ok(h.indexOf('data-be-at="2"') !== -1);
  assert.ok(h.indexOf('data-be-at="3"') !== -1); // kraj = N
});

test('prvi blok: ↑ disabled; zadnji blok: ↓ disabled', function () {
  const h = E.renderEditor(sample);
  // prva kartica (aaa111) mora imati disabled up
  const first = h.slice(h.indexOf('data-be-block="aaa111"'), h.indexOf('data-be-block="bbb222"'));
  assert.ok(/data-be-act="up"[^>]*disabled/.test(first), 'prvi ↑ disabled');
  assert.ok(!/data-be-act="down"[^>]*disabled/.test(first), 'prvi ↓ NIJE disabled');
  const last = h.slice(h.indexOf('data-be-block="ccc333"'));
  assert.ok(/data-be-act="down"[^>]*disabled/.test(last), 'zadnji ↓ disabled');
  assert.ok(!/data-be-act="up"[^>]*disabled/.test(last), 'zadnji ↑ NIJE disabled');
});

test('kontrole nose data-be-act + data-be-id (za U8a-2 wiring)', function () {
  const h = E.renderEditor(sample);
  assert.ok(h.indexOf('data-be-act="up" data-be-id="bbb222"') !== -1);
  assert.ok(h.indexOf('data-be-act="down" data-be-id="bbb222"') !== -1);
  assert.ok(h.indexOf('data-be-act="remove" data-be-id="bbb222"') !== -1);
});

test('U8.4a: tekstualni blok = editabilno polje (contenteditable + data-be-field), NE read-only preview', function () {
  const h = E.renderEditor(sample);
  assert.ok(h.indexOf('data-be-field="text"') !== -1, 'heading/paragraph editabilno polje');
  assert.ok(h.indexOf('be-edit--h2') !== -1, 'heading = h2 editabilno');
  assert.ok(h.indexOf('<h2 class="lb-heading">') === -1, 'heading NIJE renderBlocks-preview');
  assert.ok(h.indexOf('Naslov') !== -1 && h.indexOf('Neki tekst.') !== -1, 'tekst sadržaja prisutan');
  assert.ok(h.indexOf('be-editlist') !== -1, 'lista editabilna');
  assert.strictEqual(count(h, /data-be-field="items"/g), 2, 'dvije editabilne stavke liste');
});

test('U8.4a: NE-tekstualni blok (table) ostaje read-only preview kroz renderBlocks (granica)', function () {
  const h = E.renderEditor([{ id: 't1', type: 'table', header: ['A'], rows: [['1']] }]);
  assert.ok(h.indexOf('lb-table') !== -1, 'table preview kroz renderBlocks');
  assert.ok(h.indexOf('data-be-field') === -1, 'ne-tekstualni blok nema editabilna polja');
});

// ── U8.4a: serijalizator runs → editabilni HTML ──
test('runsToEditable: plain string → escapan tekst', function () {
  assert.strictEqual(E._runsToEditable('a<b>&'), 'a&lt;b&gt;&amp;');
});
test('runsToEditable: b/i/color/href → strong/em/span.lb-color/a', function () {
  assert.strictEqual(E._runsToEditable([{ text: 'x', b: true }]), '<strong>x</strong>');
  assert.strictEqual(E._runsToEditable([{ text: 'y', i: true }]), '<em>y</em>');
  assert.strictEqual(E._runsToEditable([{ text: 'z', color: 'green' }]), '<span class="lb-color-green">z</span>');
  assert.ok(E._runsToEditable([{ text: 'l', href: 'https://a.b' }]).indexOf('<a href="https://a.b" data-be-link>l</a>') !== -1);
});
test('runsToEditable: opasna poveznica (i s kontrolnim znakom) izlazi kao TEKST, bez <a> (F6 ②/0c)', function () {
  ['javascript:alert(1)', 'java\tscript:alert(1)', '\u0001javascript:alert(1)', 'data:text/html,x'].forEach(function (h) {
    const out = E._runsToEditable([{ text: 'klik', href: h }]);
    assert.strictEqual(out, 'klik', JSON.stringify(h) + ' → ' + out);
  });
});
test('runsToEditable: nepoznata boja se ignorira (kurirani token-set)', function () {
  assert.strictEqual(E._runsToEditable([{ text: 'q', color: 'brown' }]), 'q');
});
test('F6: proširena paleta (cyan/blue/violet/pink) → span kroz runsToEditable', function () {
  ['cyan', 'blue', 'violet', 'pink'].forEach(function (tok) {
    assert.strictEqual(E._runsToEditable([{ text: 't', color: tok }]), '<span class="lb-color-' + tok + '">t</span>', tok + ' → span');
  });
});

// ── U8.4a: serijalizator DOM → runs (mini fake-DOM: firstChild/nextSibling/nodeType/tagName/data/getAttribute/className) ──
function T(s) { return { nodeType: 3, data: s, nextSibling: null }; }
function EL(tag, kids, attrs) {
  attrs = attrs || {};
  const node = {
    nodeType: 1, tagName: tag.toUpperCase(), className: attrs.class || '',
    getAttribute: function (k) { return attrs[k] != null ? attrs[k] : null; },
    firstChild: null, nextSibling: null
  };
  for (let i = 0; i < kids.length; i++) { if (i === 0) node.firstChild = kids[i]; if (i > 0) kids[i - 1].nextSibling = kids[i]; }
  return node;
}
const EROOT = (kids) => EL('div', kids);

test('editableToInline: čisti tekst → plain string', function () {
  assert.strictEqual(E._editableToInline(EROOT([T('zdravo')])), 'zdravo');
});
test('editableToInline: susjedni tekst-čvorovi istog formata → spojen string', function () {
  assert.strictEqual(E._editableToInline(EROOT([T('a'), T('b')])), 'ab');
});
test('editableToInline: prazno → prazan string', function () {
  assert.strictEqual(E._editableToInline(EROOT([])), '');
  assert.strictEqual(E._editableToInline(EROOT([T('')])), '');
});
test('editableToInline: <strong> → run b:true', function () {
  assert.deepStrictEqual(E._editableToInline(EROOT([EL('strong', [T('bold')])])), [{ text: 'bold', b: true }]);
});
test('editableToInline: <b> i <i> alias (strong/em)', function () {
  assert.deepStrictEqual(E._editableToInline(EROOT([EL('b', [T('x')])])), [{ text: 'x', b: true }]);
  assert.deepStrictEqual(E._editableToInline(EROOT([EL('i', [T('y')])])), [{ text: 'y', i: true }]);
});
test('editableToInline: ugniježđeno <em><strong> → b+i', function () {
  assert.deepStrictEqual(E._editableToInline(EROOT([EL('em', [EL('strong', [T('x')])])])), [{ text: 'x', b: true, i: true }]);
});
test('editableToInline: <a href> → run href', function () {
  assert.deepStrictEqual(E._editableToInline(EROOT([EL('a', [T('link')], { href: 'https://a.b' })])), [{ text: 'link', href: 'https://a.b' }]);
});
test('editableToInline: span.lb-color-green → run color', function () {
  assert.deepStrictEqual(E._editableToInline(EROOT([EL('span', [T('g')], { class: 'lb-color-green' })])), [{ text: 'g', color: 'green' }]);
});
test('F6: nove boje (cyan/blue/violet/pink) → run color kroz editableToInline (regex izveden iz allowlista)', function () {
  ['cyan', 'blue', 'violet', 'pink'].forEach(function (tok) {
    assert.deepStrictEqual(E._editableToInline(EROOT([EL('span', [T('t')], { class: 'lb-color-' + tok })])), [{ text: 't', color: tok }], tok);
  });
});
test('editableToInline: miješano tekst+bold+tekst → 3 runa (array)', function () {
  assert.deepStrictEqual(
    E._editableToInline(EROOT([T('a'), EL('strong', [T('b')]), T('c')])),
    [{ text: 'a' }, { text: 'b', b: true }, { text: 'c' }]
  );
});
test('editableToInline: nepoznato formatiranje (span style) → curi u čisti tekst (granica)', function () {
  // span bez lb-color-* klase → ne unosi boju; tekst ostaje
  assert.strictEqual(E._editableToInline(EROOT([EL('span', [T('plain')], { style: 'color:red' })])), 'plain');
});

test('K3: tip-labela (be-type) uklonjena; tip = title na broju (heading→Naslov, paragraph→Tekst, list→Lista)', function () {
  const h = E.renderEditor(sample);
  assert.strictEqual(count(h, /class="be-type"/g), 0, 'chrome stanjen — nema vidljive tip-labele');
  assert.ok(h.indexOf('<span class="be-n" title="Naslov">1</span>') !== -1);
  assert.ok(h.indexOf('<span class="be-n" title="Tekst">2</span>') !== -1);
  assert.ok(h.indexOf('<span class="be-n" title="Lista">3</span>') !== -1);
});

test('nepoznat tip → title = sirovi tip (fail-safe, escapan), bez be-type', function () {
  const h = E.renderEditor([{ id: 'z1', type: 'wat' }]);
  assert.strictEqual(count(h, /class="be-type"/g), 0);
  assert.ok(h.indexOf('<span class="be-n" title="wat">1</span>') !== -1);
});

test('id se escapa u atributima (obrana)', function () {
  const h = E._blockCard({ id: 'a"><x', type: 'paragraph', text: 'p' }, 0, 1);
  assert.ok(h.indexOf('a"><x') === -1, 'sirovi id ne smije proći u atribut');
  assert.ok(h.indexOf('a&quot;&gt;&lt;x') !== -1, 'id escapan');
});

// ── U8a-2: swappedOrder (apsolutni red za reorderBlocks; ↑↓ logika) ──
test('swappedOrder: prvi ↑ → null (ne može gore)', function () {
  assert.strictEqual(E._swappedOrder(sample, 'aaa111', -1), null);
});
test('swappedOrder: zadnji ↓ → null (ne može dolje)', function () {
  assert.strictEqual(E._swappedOrder(sample, 'ccc333', 1), null);
});
test('swappedOrder: sredina ↑ → zamjena s prethodnim', function () {
  assert.deepStrictEqual(E._swappedOrder(sample, 'bbb222', -1), ['bbb222', 'aaa111', 'ccc333']);
});
test('swappedOrder: sredina ↓ → zamjena sa sljedećim', function () {
  assert.deepStrictEqual(E._swappedOrder(sample, 'bbb222', 1), ['aaa111', 'ccc333', 'bbb222']);
});
test('swappedOrder: blokovi bez id preskočeni (red samo od id-eva)', function () {
  const b = [{ id: 'a', type: 'paragraph', text: '1' }, { type: 'paragraph', text: 'noid' }, { id: 'c', type: 'paragraph', text: '2' }];
  assert.deepStrictEqual(E._swappedOrder(b, 'c', -1), ['c', 'a']);
});
test('swappedOrder: nepoznat id → null', function () {
  assert.strictEqual(E._swappedOrder(sample, 'nema', -1), null);
});

// ── K6: reorderedIds (drag → apsolutni redoslijed) + drag-ručka ⠿ ──
test('reorderedIds: povuci prvi na kraj', function () {
  assert.deepStrictEqual(E._reorderedIds(['a', 'b', 'c'], 'a', 2), ['b', 'c', 'a']);
});
test('reorderedIds: povuci zadnji na početak (idx 0)', function () {
  assert.deepStrictEqual(E._reorderedIds(['a', 'b', 'c'], 'c', 0), ['c', 'a', 'b']);
});
test('reorderedIds: sredina na početak', function () {
  assert.deepStrictEqual(E._reorderedIds(['a', 'b', 'c'], 'b', 0), ['b', 'a', 'c']);
});
test('reorderedIds: ista pozicija = nepromijenjeno', function () {
  assert.deepStrictEqual(E._reorderedIds(['a', 'b', 'c'], 'b', 1), ['a', 'b', 'c']);
});
test('reorderedIds: idx clamp preko duljine', function () {
  assert.deepStrictEqual(E._reorderedIds(['a', 'b', 'c'], 'a', 99), ['b', 'c', 'a']);
});
test('blockCard: drag-ručka (be-grip, data-be-drag) uvijek prisutna, lijevi žlijeb', function () {
  const h = E._blockCard({ id: 'bbb222', type: 'paragraph', text: 'x' }, 1, 3);
  assert.ok(h.indexOf('data-be-drag="bbb222"') !== -1, 'ručka nosi block id');
  assert.ok(h.indexOf('be-grip') !== -1, 'be-grip klasa');
  assert.ok(h.indexOf('fa-grip-vertical') !== -1, 'FA drag-ikona (jasan grab)');
});
test('ADD_TYPES: 8 tipova (4 tekst + slika + video + formula + tablica), svaki make() = valjan default-blok', function () {
  assert.strictEqual(E._addTypes.length, 8);
  E._addTypes.forEach(function (t) {
    const b = t.make();
    assert.strictEqual(b.type, t.type);
  });
  assert.strictEqual(E._addTypes[0].make().level, 2);       // heading default h2
  assert.deepStrictEqual(E._addTypes[2].make().items, ['']); // lista = jedna prazna stavka
  assert.strictEqual(E._addTypes[4].type, 'image');          // 5. = slika (U8.5a)
  assert.strictEqual(E._addTypes[5].type, 'video');          // 6. = video (U8.5b)
  assert.strictEqual(E._addTypes[6].type, 'formula');        // 7. = formula (U8.5c)
  assert.strictEqual(E._addTypes[6].make().display, true);   // formula default = veliki blok
  assert.strictEqual(E._addTypes[7].type, 'table');          // 8. = tablica (U8.5d)
  const tbl = E._addTypes[7].make();                          // default = 2×2 + zaglavlje
  assert.deepStrictEqual(tbl.header, ['', '']);
  assert.deepStrictEqual(tbl.rows, [['', ''], ['', '']]);
});

// ── U8.5a — media (slika) ──
test('inlineToPlain: string/runs/null/objekt → plain string', function () {
  assert.strictEqual(E._inlineToPlain('x'), 'x');
  assert.strictEqual(E._inlineToPlain([{ text: 'a', b: true }, 'b']), 'ab');
  assert.strictEqual(E._inlineToPlain(null), '');
  assert.strictEqual(E._inlineToPlain({ text: 'z' }), 'z');
});

test('mediaImageBody: prazna slika → 3 polja (src/alt/caption) + placeholder', function () {
  const html = E._mediaImageBody({ type: 'image', src: '', alt: '' });
  assert.ok(html.indexOf('data-be-mfield="src"') !== -1);
  assert.ok(html.indexOf('data-be-mfield="alt"') !== -1);
  assert.ok(html.indexOf('data-be-mfield="caption"') !== -1);
  assert.ok(html.indexOf('be-media__ph') !== -1);            // nema src → placeholder
});

test('mediaImageBody: vrijednosti polja escapane (bez HTML-injekcije)', function () {
  const html = E._mediaImageBody({ type: 'image', src: 'a"b', alt: 'A<b>' });
  assert.ok(html.indexOf('value="a&quot;b"') !== -1);
  assert.ok(html.indexOf('value="A&lt;b&gt;"') !== -1);
});

// ── U8.7 — upload slike ──
test('mediaImageBody: upload-zona (drop + „Odaberi" gumb + file-input) prisutna', function () {
  const html = E._mediaImageBody({ type: 'image', src: '', alt: '' });
  assert.ok(html.indexOf('data-be-upload') !== -1, 'drop-zona');
  assert.ok(html.indexOf('data-be-imgpick') !== -1, '„Odaberi" gumb');
  assert.ok(html.indexOf('data-be-imgfile') !== -1, 'file input');
  assert.ok(html.indexOf('data-be-imgstatus') !== -1, 'status polje');
  assert.ok(/accept="[^"]*image\/png[^"]*"/.test(html), 'accept ograničava na slike');
});
test('validateImageFile: null/prazno → poruka; SVG i ostali tipovi odbijeni', function () {
  assert.strictEqual(E._validateImageFile(null), 'Nema datoteke.');
  assert.ok(/Dopušteni formati/.test(E._validateImageFile({ type: 'image/svg+xml', size: 100 })), 'SVG odbijen (skripte)');
  assert.ok(/Dopušteni formati/.test(E._validateImageFile({ type: 'application/pdf', size: 100 })), 'PDF odbijen');
});
test('validateImageFile: >5 MB odbijen, ≤5 MB dopuštenog tipa OK (null)', function () {
  assert.ok(/prevelika/.test(E._validateImageFile({ type: 'image/png', size: 6 * 1024 * 1024 })), 'oversize');
  assert.strictEqual(E._validateImageFile({ type: 'image/png', size: 1024 }), null, 'PNG 1KB OK');
  assert.strictEqual(E._validateImageFile({ type: 'image/jpeg', size: 5 * 1024 * 1024 }), null, 'JPG točno 5MB OK');
  assert.strictEqual(E._validateImageFile({ type: 'image/webp', size: 10 }), null, 'WEBP OK');
});
test('uploadImage: izvezen kao funkcija (async put; pravi upload = authed E2E vs staging)', function () {
  assert.strictEqual(typeof E._uploadImage, 'function');
});

// ── U8.5b — video ──
test('mediaVideoBody: prazan video → 1 polje (url) + placeholder', function () {
  const html = E._mediaVideoBody({ type: 'video', url: '' });
  assert.ok(html.indexOf('data-be-mfield="url"') !== -1);
  assert.ok(html.indexOf('be-media__ph') !== -1);            // prazno → placeholder (preview '' u nodeu)
});

test('mediaVideoBody: postojeći videoId prikazan u url-polju (escapan)', function () {
  const html = E._mediaVideoBody({ type: 'video', videoId: 'ab"cd' });
  assert.ok(html.indexOf('value="ab&quot;cd"') !== -1);      // videoId pada u url-polje
});

// ── U8.5c — formula (KaTeX) ──
test('mediaFormulaBody: prazna formula → <math-field> + display-checkbox + placeholder', function () {
  const html = E._mediaFormulaBody({ type: 'formula', tex: '', display: true });
  assert.ok(html.indexOf('<math-field') !== -1);              // U8.9a: vizualni unos (MathLive), ne sirovi <input>
  assert.ok(html.indexOf('data-be-mathfield="tex"') !== -1);
  assert.ok(html.indexOf('data-be-mcheck="display"') !== -1);
  assert.ok(html.indexOf('be-media__ph') !== -1);            // prazan tex → placeholder
  assert.ok(html.indexOf('be-media--formula') !== -1);
});

test('mediaFormulaBody: uključuje NAŠU paletu (math-keypad) s template-gumbima + naredbama', function () {
  const html = E._mediaFormulaBody({ type: 'formula', tex: '', display: true });
  assert.ok(html.indexOf('be-mathpad') !== -1);                              // paleta prisutna
  assert.ok(html.indexOf('be-mathkey') !== -1);                              // gumbi
  assert.ok(html.indexOf('data-be-mathins="\\frac{#?}{#?}"') !== -1);        // razlomak-template (#? = MathLive placeholder)
  assert.ok(html.indexOf('data-be-mathins="\\sqrt{#?}"') !== -1);            // korijen-template
  // U8.9c — proširena paleta (statistika/skupovi) + naredba ⌫
  assert.ok(html.indexOf('data-be-mathins="\\bar{#@}"') !== -1);             // x̄ (sredina) — statistika
  assert.ok(html.indexOf('data-be-mathins="\\binom{#?}{#?}"') !== -1);       // binomni koeficijent
  assert.ok(html.indexOf('data-be-mathins="\\cup"') !== -1);                 // ∪ (skupovi)
  assert.ok(html.indexOf('data-be-mathcmd="deleteBackward"') !== -1);        // ⌫ = MathLive naredba, ne insert
});

test('mediaFormulaBody: display=true → checkbox checked; display=false → unchecked', function () {
  assert.ok(E._mediaFormulaBody({ type: 'formula', tex: 'x', display: true }).indexOf('checked') !== -1);
  assert.ok(E._mediaFormulaBody({ type: 'formula', tex: 'x', display: false }).indexOf('checked') === -1);
  // izostavljen display → default veliki blok (checked)
  assert.ok(E._mediaFormulaBody({ type: 'formula', tex: 'x' }).indexOf('checked') !== -1);
});

test('mediaFormulaBody: tex s LaTeX-backslashevima ide u math-field bez HTML-injekcije', function () {
  const html = E._mediaFormulaBody({ type: 'formula', tex: '\\frac{a}{b}<x>"' });
  assert.ok(html.indexOf('data-be-tex="\\frac{a}{b}&lt;x&gt;&quot;"') !== -1);  // backslash literal, <>" escapani u atributu
  assert.ok(html.indexOf('<x>') === -1);                                        // NIKAD sirovi HTML iz tex-a (ni u textContentu)
});

test('mediaFormulaBody: neprazan tex → preview kroz renderBlocks (\\[…\\] delimiteri, ne placeholder)', function () {
  const html = E._mediaFormulaBody({ type: 'formula', tex: 'E = mc^2', display: true });
  assert.ok(html.indexOf('lb-formula') !== -1, 'preview kroz renderBlocks');
  assert.ok(html.indexOf('be-media__ph') === -1, 'nema placeholdera kad tex postoji');
});

// ── U8.5d — tablica (grid-forma) ──
test('tableModel: normalizira u pravokutnik (max stupaca), header opcionalan', function () {
  const m = E._tableModel({ type: 'table', header: ['A', 'B', 'C'], rows: [['1', '2'], ['3']] });
  assert.strictEqual(m.hasHeader, true);
  assert.strictEqual(m.cols, 3);                             // max(header=3, rows)
  assert.deepStrictEqual(m.header, ['A', 'B', 'C']);
  const m2 = E._tableModel({ type: 'table', rows: [['x']] }); // bez headera
  assert.strictEqual(m2.hasHeader, false);
  assert.strictEqual(m2.header, null);
  const m3 = E._tableModel({ type: 'table' });               // prazno → default 2 stupca
  assert.strictEqual(m3.cols, 2);
});

test('mediaTableBody: default 2×2 → header-ćelije + tijelo-ćelije + toggle + dodaj-gumbi', function () {
  const html = E._mediaTableBody({ type: 'table', header: ['', ''], rows: [['', ''], ['', '']] });
  assert.ok(html.indexOf('be-media--table') !== -1);
  assert.strictEqual(count(html, /class="be-tcell be-tcell--h"/g), 2);   // 2 header-ćelije
  assert.strictEqual(count(html, /data-be-tr="-1"/g), 2);                // header red = -1
  assert.strictEqual(count(html, /data-be-tr="0"/g), 2);                 // 1. tijelo-red
  assert.ok(html.indexOf('data-be-tcheck="header"') !== -1);             // header-toggle prisutan
  assert.ok(html.indexOf('data-be-tact="addrow"') !== -1);
  assert.ok(html.indexOf('data-be-tact="addcol"') !== -1);
  assert.ok(html.indexOf('data-be-tact="delrow"') !== -1);               // 2 reda → delrow postoji
  assert.ok(html.indexOf('data-be-tact="delcol"') !== -1);
});

test('mediaTableBody: header-toggle checked kad header postoji; bez headera → unchecked + 0 header-ćelija', function () {
  assert.ok(E._mediaTableBody({ type: 'table', header: [''], rows: [['']] }).indexOf('data-be-tcheck="header" checked') !== -1);
  const noHead = E._mediaTableBody({ type: 'table', rows: [['a']] });
  assert.ok(noHead.indexOf('data-be-tcheck="header" checked') === -1);
  assert.strictEqual(count(noHead, /be-tcell--h/g), 0);
});

test('mediaTableBody: jedan red → NEMA delrow; jedan stupac → NEMA delcol (ne može ispod 1×1)', function () {
  const oneRow = E._mediaTableBody({ type: 'table', rows: [['a', 'b']] });   // 1 red
  assert.ok(oneRow.indexOf('data-be-tact="delrow"') === -1);
  const oneCol = E._mediaTableBody({ type: 'table', rows: [['a'], ['b']] }); // 1 stupac
  assert.ok(oneCol.indexOf('data-be-tact="delcol"') === -1);
});

test('mediaTableBody: vrijednosti ćelija escapane u input value (bez HTML-injekcije)', function () {
  const html = E._mediaTableBody({ type: 'table', rows: [['a"<x>']] });
  assert.ok(html.indexOf('value="a&quot;&lt;x&gt;"') !== -1);  // ćelija-vrijednost escapana
});

test('mediaTableBody: sve ćelije prazne → placeholder (nema preview tablice)', function () {
  const html = E._mediaTableBody({ type: 'table', header: ['', ''], rows: [['', ''], ['  ', '']] });
  assert.ok(html.indexOf('be-media__ph') !== -1);            // prazno/whitespace → placeholder
  assert.ok(html.indexOf('lb-table') === -1);
});

test('mediaTableBody: neprazna ćelija → preview kroz renderBlocks (lb-table, ne placeholder)', function () {
  const html = E._mediaTableBody({ type: 'table', header: ['Stup'], rows: [['vrij']] });
  assert.ok(html.indexOf('lb-table') !== -1, 'preview kroz renderBlocks');
  assert.ok(html.indexOf('be-media__ph') === -1);
});

// ── U8.5e — callout: varijanta + naslov uredljivi ──
test('editableBody(callout): 3 varijanta-gumba (info/warning/tip), aktivna označena + title mfield', function () {
  const html = E._editableBody({ type: 'callout', variant: 'warning', title: 'Pazi', text: 'txt' });
  assert.ok(html.indexOf('data-be-cvar="info"') !== -1);
  assert.ok(html.indexOf('data-be-cvar="warning"') !== -1);
  assert.ok(html.indexOf('data-be-cvar="tip"') !== -1);
  assert.ok(/class="be-cvar on" data-be-cvar="warning"/.test(html), 'aktivna varijanta ima .on');
  assert.ok(html.indexOf('data-be-mfield="title"') !== -1, 'naslov = mfield');
  assert.ok(html.indexOf('value="Pazi"') !== -1);
  assert.ok(html.indexOf('lb-callout--warning') !== -1, 'tijelo nosi varijanta-klasu');
});
test('editableBody(callout): naslov escapan (bez HTML-injekcije u value)', function () {
  const html = E._editableBody({ type: 'callout', variant: 'info', title: 'a"><script>', text: '' });
  assert.ok(html.indexOf('"><script>') === -1);
});

// ── U8.5e — slika: resize-ručka u previewu ──
test('mediaImageBody: sa src → resize-ručka (⇲) + %-badge; width 60 → badge 60%', function () {
  const html = E._mediaImageBody({ type: 'image', src: 'https://a.com/x.png', width: 60 });
  assert.ok(html.indexOf('data-be-imgresize') !== -1, 'ručka prisutna');
  assert.ok(html.indexOf('data-be-imgw') !== -1, 'badge prisutan');
  assert.ok(html.indexOf('>60%<') !== -1, 'badge pokazuje 60%');
});
test('mediaImageBody: bez src → placeholder BEZ ručke; bez width → badge 100%', function () {
  const empty = E._mediaImageBody({ type: 'image', src: '', alt: '' });
  assert.ok(empty.indexOf('data-be-imgresize') === -1);
  const noW = E._mediaImageBody({ type: 'image', src: 'https://a.com/x.png' });
  assert.ok(noW.indexOf('>100%<') !== -1);
});

// ── U8.10 — paste TSV/HTML → grid (parser; HTML-grana traži DOMParser pa se u Node-u testira TSV) ──
test('parsePastedTable: TSV (tab+newline) → pravokutni grid', function () {
  const g = E._parsePastedTable('a\tb\nc\td', '');
  assert.deepStrictEqual(g, [['a', 'b'], ['c', 'd']]);
});
test('parsePastedTable: neravni redovi → dopunjeni na max stupaca ("")', function () {
  const g = E._parsePastedTable('a\tb\tc\nd\te', '');
  assert.deepStrictEqual(g, [['a', 'b', 'c'], ['d', 'e', '']]);
});
test('parsePastedTable: jedna ćelija (bez taba/newlinea) → null (normalan paste)', function () {
  assert.strictEqual(E._parsePastedTable('samo tekst', ''), null);
  assert.strictEqual(E._parsePastedTable('', ''), null);
});
test('parsePastedTable: whitespace u ćelijama kolabiran + trailing newline odbačen', function () {
  const g = E._parsePastedTable('  a  b \tc\n\n', '');
  assert.deepStrictEqual(g, [['a b', 'c']]);
});
test('parsePastedTable: jedan red više stupaca → grid (1×N)', function () {
  assert.deepStrictEqual(E._parsePastedTable('x\ty\tz', ''), [['x', 'y', 'z']]);
});

// ── INLINE MATEMATIKA (run `math:true`) — round-trip u OBA smjera ──
// Math-čip u editoru nosi DOSLOVAN LaTeX (`data-be-math`), pa fake-DOM mora znati
// `hasAttribute` + `textContent` (pravi DOM ih ima; stari EL ih namjerno nema →
// dokazuje i da guard u _walk ne ruši postojeće čvorove).
function MATH(tex) {
  return {
    nodeType: 1, tagName: 'SPAN', className: 'lb-imath',
    hasAttribute: function (k) { return k === 'data-be-math'; },
    getAttribute: function () { return null; },
    textContent: tex, firstChild: null, nextSibling: null
  };
}

test('math: runs → editabilni HTML = čip sa SIROVIM LaTeX-om (ne KaTeX)', function () {
  const h = E._runsToEditable([{ text: 'x^2', math: true }]);
  assert.ok(h.indexOf('data-be-math') !== -1, h);
  assert.ok(h.indexOf('x^2') !== -1, h);
  assert.ok(h.indexOf('katex') === -1, 'KaTeX ne smije u contenteditable: ' + h);
});
test('math: čip → run {text, math:true}, sadržaj se NE tumači kao format', function () {
  assert.deepStrictEqual(E._editableToInline(EROOT([MATH('\\frac{1}{2}')])),
    [{ text: '\\frac{1}{2}', math: true }]);
});
test('math: matematika USRED rečenice zadrži i tekst oko sebe', function () {
  assert.deepStrictEqual(
    E._editableToInline(EROOT([T('ako je '), MATH('x>0'), T(', onda')])),
    [{ text: 'ako je ' }, { text: 'x>0', math: true }, { text: ', onda' }]);
});
test('math: sam math-run NE prolazi kroz prečac „jedini run → plain string"', function () {
  const out = E._editableToInline(EROOT([MATH('a+b')]));
  assert.ok(Array.isArray(out), 'math bi se izgubio kao običan tekst: ' + JSON.stringify(out));
});
test('math: dvije susjedne formule se NE spajaju u jednu', function () {
  assert.deepStrictEqual(E._editableToInline(EROOT([MATH('a'), MATH('b')])),
    [{ text: 'a', math: true }, { text: 'b', math: true }]);
});
test('math: prazan čip se odbacuje (ne stvara prazan run)', function () {
  assert.strictEqual(E._editableToInline(EROOT([MATH('')])), '');
});
test('math: HTML u LaTeX-u ostaje DOSLOVAN tekst (granica je esc na prikazu)', function () {
  const runs = E._editableToInline(EROOT([MATH('<img onerror=alert(1)>')]));
  assert.deepStrictEqual(runs, [{ text: '<img onerror=alert(1)>', math: true }]);
  const h = E._runsToEditable(runs);
  assert.ok(h.indexOf('&lt;img') !== -1, 'nije escapano u editoru: ' + h);
  assert.ok(h.indexOf('<img') === -1, 'sirov <img> je ušao u DOM: ' + h);
});

console.log('\n=== rezultat: ' + passed + ' prošlo / ' + failed + ' palo ===\n');
process.exit(failed ? 1 : 0);
