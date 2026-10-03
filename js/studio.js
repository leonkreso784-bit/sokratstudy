// ===== SOKRAT STUDY — STUDIO EDITOR (U8) =====
//
// U8.1 = SKELET novog vizualnog editora „Studio" (kosti iz design/mockups/editor-c-tok.html):
//   topbar+breadcrumb · STABLO (fakultet→smjer→godina→predmet→skripte) · canvas
//   (naslov + meta + mode-tabovi + PREVIEW) · inspektor-stub. Zamjenjuje dropdowne #admin-page.
// U8.2 = LEARN-PANE = blok-editor u canvasu: u draft-modu se `block-editor.js` jezgra
//   (`SokratBlockEditor`) montira u learn-pane → blokovi (kvadratići) postaju editabilni
//   (add/reorder/remove kroz U7e draft-ops). „Uredi lekciju" ulazi u draft (svjež DB payload +
//   base_version), „Objavi" = U4 RPC. **SIGURNOST:** `learn.js` bira blokove NAD `content`, pa
//   se blok-editor montira SAMO na v2/prazne kategorije; v1 (content) dobiva eksplicitnu, poništivu
//   „Uredi kao blokove" migraciju (content → jedan `legacy-html` blok; ništa se ne gubi). Kartice/
//   kviz/fill ostaju read-only preview (uređivanje = U8.3). Vizualni „čisto i bogato" prolaz = U8.6.
//
// JEDAN draft/publish engine: sve ide preko `SokratAdmin.studioBridge` (bez duplikata publish-logike).
// Stari #admin-page koegzistira (umirovljuje se kad Studio sazrije).

const SokratStudio = (function () {
  'use strict';

  let _sel = { subjectId: '', lessonId: '' }; // trenutno odabrana skripta
  // F3 — OSOBNI study-čvor (`nodes`). Kad je postavljen, `_sel` drži SINTETIČKI ključ
  // (`node:<uuid>` / `content`) pa draft-chip, Uredi/Objavi/Odbaci i onDraftChanged rade
  // NEPROMIJENJENI — generični su po ključu. Razlikuje se samo odakle sadržaj dolazi.
  /** @type {{ id: string, name: string }|null} */
  let _node = null;
  let _data = null;                            // učitani sadržaj (dijeli referencu s _adminCtx.data preko setLesson)
  let _activeMode = null;                      // zadnji odabrani mode-tab (očuva se kroz re-render)
  let _inspEd = null;                          // zadnje edit-stanje inspektora (#7: refresh samo na promjenu)

  // ---- helpers ----
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // Globalni i18n t() vraća KLJUČ kad prijevoda nema (studio.* nisu u rječniku) → bez ove
  // provjere bi UI pokazivao sirove ključeve („studio.publishHint"). Ključ==rezultat ⇒ fallback.
  function t(key, fb) {
    if (window.t) { const s = window.t(key); if (s && s !== key) return s; }
    return fb;
  }
  function toast(m) { if (typeof window.showToast === 'function') window.showToast(m); }
  function byId(id) { return document.getElementById(id); }
  function bridge() { return (window.SokratAdmin && SokratAdmin.studioBridge) ? SokratAdmin.studioBridge : null; }
  function editing() { const b = bridge(); return !!(b && b.isEditing && b.isEditing()); }
  function currentData() { const b = bridge(); if (b && editing()) { const w = b.workingData(); if (w) return w; } return _data; }
  function cats(data) {
    if (typeof getCategories === 'function') return getCategories(data);
    return Object.keys(data || {}).filter(function (k) {
      return data[k] && typeof data[k] === 'object' && !Array.isArray(data[k]);
    });
  }
  function yearLabel(y) {
    return (typeof getUiLang === 'function' && getUiLang() === 'hr') ? (y + '. godina') : ('Year ' + y);
  }
  // learn-stanje kategorije: 'v2' (blocks) · 'v1' (content, bez blocks) · '' (nema learn)
  function learnKind(c) {
    if (!c || typeof c !== 'object' || !c.learn || typeof c.learn !== 'object') return '';
    if (Array.isArray(c.learn.blocks)) return 'v2';
    if (typeof c.learn.content === 'string' && c.learn.content) return 'v1';
    return '';
  }

  // ---- STABLO (iz kataloga) ----
  function buildTree() {
    if (typeof SokratCatalog === 'undefined') return '<p class="st-hint" style="padding:12px">Katalog nije učitan.</p>';
    var facs = SokratCatalog.faculties();
    var html = '';
    facs.forEach(function (f) {
      var progHtml = '';
      SokratCatalog.programsOf(f.id).forEach(function (p) {
        var yearHtml = '';
        SokratCatalog.yearsOf(p.id).forEach(function (y) {
          var subHtml = '';
          SokratCatalog.subjectsOf(p.id, y).forEach(function (s) {
            var crumbBase = esc(f.name) + ' › ' + esc(p.name) + ' › ' + esc(yearLabel(y)) + ' › ' + esc(s.name);
            var lessonHtml = '';
            (s.lessons || []).forEach(function (l) {
              var soon = (typeof SokratCatalog.isLessonComingSoon === 'function')
                ? SokratCatalog.isLessonComingSoon(s.id, l.id) : false;
              lessonHtml +=
                '<div class="st-node"><div class="st-row' + (soon ? ' soon' : '') + '"' +
                (soon ? '' : ' data-subj="' + esc(s.id) + '" data-lesson="' + esc(l.id) + '"' +
                  ' data-crumb="' + crumbBase + '" data-lname="' + esc(l.name || l.id) + '"') +
                '><span class="st-lbl">📝 ' + esc(l.name || l.id) + (soon ? ' · soon' : '') + '</span></div></div>';
            });
            subHtml +=
              '<div class="st-node"><div class="st-row"><span class="st-tw">▶</span>' +
              '<span class="st-lbl">📖 ' + esc(s.name) + '</span></div>' +
              '<div class="st-kids">' + lessonHtml + '</div></div>';
          });
          yearHtml +=
            '<div class="st-node"><div class="st-row"><span class="st-tw">▶</span>' +
            '<span class="st-lbl">📅 ' + esc(yearLabel(y)) + '</span></div>' +
            '<div class="st-kids">' + (subHtml || '<div class="st-hint" style="padding:6px 10px">—</div>') + '</div></div>';
        });
        progHtml +=
          '<div class="st-node"><div class="st-row"><span class="st-tw">▶</span>' +
          '<span class="st-lbl">🎓 ' + esc(p.name) + '</span></div>' +
          '<div class="st-kids">' + yearHtml + '</div></div>';
      });
      html +=
        '<div class="st-node open"><div class="st-row"><span class="st-tw">▶</span>' +
        '<span class="st-lbl">🏛️ ' + esc(f.name) + '</span></div>' +
        '<div class="st-kids">' + progHtml + '</div></div>';
    });
    return html || '<p class="st-hint" style="padding:12px">Nema predmeta u katalogu.</p>';
  }

  // ---- SHELL ----
  function render() {
    var page = byId('editor-page');
    if (!page) return;
    page.innerHTML =
      // ⚠️ K2b — SPAJANJE, NE SLAGANJE (Leon, 2026-08-19). Ovdje su do K2b stajali natrag,
      // znak „Sokrat STUDIO" i mrvica. To je IDENTITET i POLOŽAJ — posao globalne trake —
      // pa su preseljeni gore; Studiju ostaju samo RADNJE NAD DOKUMENTOM.
      //
      // Nije uklonjeno zbog urednosti nego zbog mjerenja: na 390×844 ova je traka bila
      // **347 px od 844 (41 % ekrana)**, a canvas 235 px (28 %). Visinu je dizala mrvica —
      // `.st-crumb` ima `flex-wrap:wrap` i srušila bi se u stupac **96 px širok, 326 px
      // visok**. Traka pritom NEMA `flex-wrap`, pa je ostatak izlazio VAN ekrana: `.st-chip`
      // [375…458] i `.st-iconbtn` [470…484] bili su nedostupni, a `overflow:hidden` ih je
      // odrezao umjesto da ponudi skrol. Slaganje globalne trake IZNAD ove pogoršalo bi
      // kvar; spajanje ga gasi.
      '<div class="st-topbar">' +
      // K4a: na telefonu je stablo ladica, pa mu treba kvaka. Gumb se crta SAMO u
      // katalog-modu (u čvor-modu stabla nema) i CSS ga gasi iznad 680 px.
      (_node ? '' :
      '  <button class="st-iconbtn st-treetoggle" id="stTreeToggle" aria-expanded="false" aria-controls="stTreeAside"' +
      ' title="' + esc(t('studio.structure', 'Struktura')) + '" aria-label="' + esc(t('studio.structure', 'Struktura')) + '">🗂️</button>') +
      '  <div class="st-spacer"></div>' +
      '  <button class="st-btn ghost" id="stEdit" hidden><i class="fas fa-pen"></i> ' + esc(t('studio.edit', 'Uredi')) + '</button>' +
      '  <span class="st-chip" id="stDraftChip">—</span>' +
      '  <button class="st-btn ghost" id="stDiscard" hidden>' + esc(t('admin.discard', 'Odbaci')) + '</button>' +
      '  <button class="st-btn primary" id="stPublish" hidden>⬆ ' + esc(t('admin.publish', 'Objavi')) + '</button>' +
      '  <button class="st-iconbtn" id="stOldEditor" title="Stari editor" aria-label="Stari editor">⚙</button>' +
      '</div>' +
      '<div class="st-layout">' +
      // F3: u osobnom čvoru katalog-stablo nema smisla (čvor NIJE u katalogu) → panel čvora.
      // K4a: modifikator NIJE ukras nego nosilac razlike koja se ne vidi iz CSS-a — u
      // čvor-modu je ovaj panel PRIKAZ jednog materijala, u katalog-modu je NAVIGATOR.
      // Na telefonu se zato prvi briše bez zamjene, a drugi seli u ladicu.
      '  <aside class="st-tree ' + (_node ? 'st-tree--node' : 'st-tree--catalog') + '" id="stTreeAside">' + (_node
        ? '<h3>📁 ' + esc(t('studio.myMaterials', 'Moji materijali')) + '</h3>' +
          '<div class="st-nodecard"><div class="st-nodeicon">📘</div>' +
          '<div class="st-nodename">' + esc(_node.name) + '</div>' +
          '<p class="st-hint">' + esc(t('studio.nodeHint', 'Osobni materijal — vidiš ga samo ti.')) + '</p></div>'
        : '<button class="st-newscript" id="stNewScript">＋ ' + esc(t('studio.newScript', 'Nova skripta')) + '</button>' +
          '<h3>🗂️ ' + esc(t('studio.structure', 'Struktura')) + '</h3>' +
          '<div id="stTree">' + buildTree() + '</div>') +
      '  </aside>' +
      '  <main class="st-canvas" id="stCanvas">' +
      (_node ? '<div class="st-empty"><div><div class="st-emoji">⏳</div><p>'
             + esc(t('studio.loadingNode', 'Učitavam materijal…')) + '</p></div></div>'
             : emptyCanvas()) + '</main>' +
      '  <aside class="st-inspector" id="stInspector">' + inspectorStub(false) + '</aside>' +
      '</div>';
    mountAi();

    // C0: iz OSOBNOG čvora „natrag" vodi na stranicu vlastitog materijala — odande se i ušlo.
    // Prije C0 je stablo živjelo na profilu pa je tvrdi 'profile' bio točan; sada ondje stoji samo
    // poveznica, pa bi korisnika ostavio na slijepom kolosijeku (mrvica gore piše „Moji materijali").
    // Katalog-mod (admin, `_node` == null) i dalje ide na profil — taj put C0 nije dirao.
    // K2a: rezervni put se prosljedjuje jer Studio o kontekstu zna vise od AppState-a --
    // je li otvorio osobni cvor ili katalog. Kad iza nas stoji nas unos, odlucuje povijest.
    // K2b: „natrag" je otišao u globalni drugi red, a hijerarhiju editora sada zna
    // `roditeljOd()` preko `AppState.nav.editorNode` — pa se rezervni put više ne
    // prosljeđuje ručno. Gumb ostaje ožičen samo ako ga neki stariji markup još nosi.
    var back = byId('stBack');
    if (back) back.addEventListener('click', function () {
      if (typeof goBack === 'function') goBack();
      else if (typeof navigateTo === 'function') navigateTo(_node ? 'materials' : 'profile');
    });
    byId('stOldEditor').addEventListener('click', function () { if (typeof navigateTo === 'function') navigateTo('admin'); });
    // U node-modu ova dva elementa ne postoje (aside je panel čvora, ne katalog-stablo).
    var newScript = byId('stNewScript');
    if (newScript) newScript.addEventListener('click', function () { toast(t('studio.wizardSoon', 'Čarobnjak „Nova skripta" stiže u kasnijoj cigli.')); });
    byId('stEdit').addEventListener('click', enterEdit);
    byId('stPublish').addEventListener('click', publish);
    byId('stDiscard').addEventListener('click', discard);

    // K4a: kvaka ladice (postoji samo u katalog-modu)
    var treeToggle = byId('stTreeToggle');
    if (treeToggle) treeToggle.addEventListener('click', function () { toggleTree(); });

    // stablo (delegirano) — samo u katalog-modu
    var tree = byId('stTree');
    if (tree) tree.addEventListener('click', function (e) {
      var row = e.target.closest('.st-row');
      if (!row) return;
      if (row.classList.contains('soon')) { toast(t('studio.soon', 'Ova lekcija još nema sadržaj.')); return; }
      var subj = row.getAttribute('data-subj');
      var lesson = row.getAttribute('data-lesson');
      if (subj && lesson) selectLesson(subj, lesson, row);
      else row.parentElement.classList.toggle('open');
    });

    // canvas (delegirano): migracija v1→blokovi
    byId('stCanvas').addEventListener('click', function (e) {
      // U8.5f: boja-kvadratić uz naslov sekcije → updateCategory {color} → re-render (akcent se nasljeđuje)
      // F3 K3: „＋ Nova sekcija" (u zaglavlju i u praznom stanju)
      if (e.target.closest('[data-st-addcat]')) { addSection(); return; }
      // F4: 🗑 obriši sekciju (prije boje — kanta je unutar zaglavlja sekcije, kao i kvadratići)
      var del = e.target.closest('[data-st-catdel]');
      if (del) { delSection(del.getAttribute('data-st-catdel')); return; }
      var dot = e.target.closest('[data-st-catcolor]');
      if (dot) { setCatColor(dot.getAttribute('data-st-cat'), dot.getAttribute('data-st-catcolor')); return; }
      // M3b: boja pojedine kartice/pitanja/dopune (zaseban atribut → ne sudara se s gornjim)
      var idot = e.target.closest('[data-st-icolor]');
      if (idot) { setItemColor(idot); return; }
      var mig = e.target.closest('[data-migrate-cat]');
      if (mig) { migrateToBlocks(mig.getAttribute('data-migrate-cat')); }
    });
    // U8.5f: vlastita boja kroz native color-input (commit na change = zatvaranje pickera)
    byId('stCanvas').addEventListener('change', function (e) {
      var pick = e.target.closest('[data-st-catcolorpick]');
      if (pick) setCatColor(pick.getAttribute('data-st-cat'), pick.value);
    });
    // K1 (F7): uredljiv naslov sekcije → commit na focusout; Enter=potvrdi (blur); paste=plain-text.
    byId('stCanvas').addEventListener('focusout', function (e) {
      var el = e.target.closest('[data-st-catname]');
      if (el) commitCatName(el);
    });
    byId('stCanvas').addEventListener('keydown', function (e) {
      var el = e.target.closest('[data-st-catname]');
      if (el && e.key === 'Enter') { e.preventDefault(); el.blur(); }
    });
    byId('stCanvas').addEventListener('paste', function (e) {
      var el = e.target.closest('[data-st-catname]');
      if (!el) return;   // paste izvan naslova (npr. tablica-paste u block-editoru) → ne diramo
      e.preventDefault();
      var text = String(((e.clipboardData || window.clipboardData).getData('text/plain')) || '').replace(/\s+/g, ' ');
      if (document.execCommand) document.execCommand('insertText', false, text);
    });
    // K6b (F7): drag preslagivanje SEKCIJA — SAMO s ručke ⠿ (block-grip `data-be-drag` ne dira ovo).
    byId('stCanvas').addEventListener('pointerdown', function (e) {
      var h = e.target.closest('[data-st-catdrag]');
      if (h) startCatDrag(e, h);
    });

    // F3: povratak na editor-stranicu s VEĆ učitanim čvorom (npr. navigacija natrag) — ljuska je
    // svježe nacrtana, pa canvas treba odmah popuniti umjesto da ostane na „učitavam".
    if (_node && _data) renderCanvas();

    refreshTopbar();
  }

  function emptyCanvas() {
    return '<div class="st-empty"><div><div class="st-emoji">🦉</div>' +
      '<p>' + esc(t('studio.emptyTitle', 'Odaberi skriptu iz stabla lijevo')) + '</p></div></div>';
  }

  // U8.5f — kurirana paleta boja sekcija (ista u panelu i uz naslove sekcija u edit-modu).
  var SECTION_COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#a855f7'];

  function inspectorStub(isEd) {
    // #7: mode-svjestan — read-only prikazuje „kako urediti", edit prikazuje aktivnu paletu boja.
    var top = isEd
      ? '<div class="st-icard"><h3>🎨 ' + esc(t('studio.colors', 'Boje sekcija')) + '</h3>' +
        '<p>' + esc(t('studio.colorsHint', 'Klikni kvadratić uz naslov sekcije — boja se nasljeđuje na kartice, kviz, dopune i learn.')) + '</p>' +
        '<div class="st-swatches" style="margin-top:10px">' +
        SECTION_COLORS.map(function (c) { return '<div class="st-sw" style="background:' + c + '"></div>'; }).join('') + '</div></div>'
      : '<div class="st-icard"><h3>✏️ ' + esc(t('studio.howEdit', 'Kako urediti')) + '</h3>' +
        '<p>' + esc(t('studio.howEditHint', 'Klikni „Uredi" (gore desno) pa mijenjaj naslove, tekst i boje. Povuci ⣿ ručku za preslagivanje blokova i sekcija.')) + '</p></div>';
    return top +
      '<div class="st-icard"><h3>⬆ Publish</h3><p>' +
      esc(t('studio.publishHint', 'Objava = publish-RPC: atomično, verzija, konflikt se ne gazi.')) + '</p></div>' +
      // M4 → F6 ②/5.1: AI dolazi s KORISNIKOVE strane (ADR-026) — gumb ga spaja kroz MCP. Gumb crta
      // `SokratConnectAi.ugradi` (isti kao na „Mojim materijalima"); dok konektor ovdje ne radi
      // (produkcija do ⑥) stoji onemogućen uz „Uskoro". Ništa se ne obećava o vježbama (ADR-025 §1).
      '<div class="st-premium"><h4>✨ ' + esc(t('studio.aiTitle', 'Tvoj AI')) +
      (aiDostupan() ? '' : ' <span class="st-pill">' + esc(t('studio.soon', 'USKORO')) + '</span>') + '</h4>' +
      '<p>' + esc(t('studio.aiHint', 'Spoji AI koji već koristiš pa mu daj svoje bilješke — gotov materijal stavit će ti na policu.')) + '</p>' +
      '<div class="st-ai-entry" data-cai-mount></div></div>';
  }
  function aiDostupan() { return !!(window.SokratConnectAi && window.SokratConnectAi.dostupno()); }
  /** Gumb „Spoji svoj AI" u inspektoru — nakon SVAKOG crtanja inspektora (innerHTML ga briše). */
  function mountAi() {
    var el = document.querySelector('#stInspector [data-cai-mount]');
    if (el && window.SokratConnectAi) window.SokratConnectAi.ugradi(el, { bezKonektora: 'onemoguci' });
  }

  /**
   * K4a — ladica stabla (samo telefon, samo katalog-mod).
   *
   * ⚠️ Stanje živi na SAMOM panelu (`.is-open`), ne u zasebnoj varijabli: ljuska Studija se
   * ponovno crta pri svakom `render()`, pa bi vanjska zastavica preživjela markup koji više
   * ne postoji i tvrdila da je otvoreno nešto čega nema.
   */
  function toggleTree(force) {
    var aside = byId('stTreeAside');
    if (!aside) return;
    var open = (force === undefined) ? !aside.classList.contains('is-open') : !!force;
    aside.classList.toggle('is-open', open);
    var btn = byId('stTreeToggle');
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  // ---- ODABIR SKRIPTE → CANVAS ----
  async function selectLesson(subjectId, lessonId, row) {
    _node = null;                                  // F3: odabir iz kataloga gasi node-mod
    toggleTree(false);                             // K4a: odabir je svrha ladice → zatvori je
    // K2b: i hijerarhija se mora vratiti na katalošku, inače bi mrvica i dalje tvrdila
    // „Moji materijali" nakon što je korisnik iz čvora prešao na katalog-skriptu.
    if (typeof AppState !== 'undefined' && AppState.nav) AppState.nav.editorNode = null;
    if (typeof window.renderPathbar === 'function') window.renderPathbar();
    _sel = { subjectId: subjectId, lessonId: lessonId };
    _activeMode = null; // nova skripta → počni od prvog moda
    var tree = byId('stTree');
    if (tree) tree.querySelectorAll('.st-row.active').forEach(function (r) { r.classList.remove('active'); });
    if (row) row.classList.add('active');

    var canvas = byId('stCanvas');
    if (canvas) canvas.innerHTML = '<div class="st-empty"><p>' + esc(t('admin.loading', 'Učitavanje…')) + '</p></div>';

    // K2b: mrvica Studija je OBRISANA, ne preseljena. Ono što je pokazivala — koja je
    // skripta otvorena — već stoji u naslovu canvasa (`#stCanvas .st-head h1`), pa je
    // bila drugi zapis o istoj stvari. A bila je i najskuplji element u ljusci: sama je
    // dizala traku na 41 % telefona (v. bilješku uz `.st-topbar`). Položaj STRANICE nosi
    // globalni drugi red; položaj UNUTAR stranice nosi canvas.

    var data;
    try {
      data = await SokratContent.loadLesson(subjectId, lessonId);
    } catch (e) {
      if (canvas) canvas.innerHTML = '<div class="st-empty"><p>' + esc(t('admin.loadFail', 'Sadržaj se nije mogao učitati.')) + '</p></div>';
      return;
    }
    _data = data;
    // ožiči JEDAN draft/publish engine na ovu lekciju (nastavi draft ako postoji dirty)
    if (bridge()) { try { bridge().setLesson(subjectId, lessonId, data); } catch (e) {} }

    renderCanvas();
    refreshTopbar();
  }

  /**
   * Koji se modovi nude u canvasu.
   *
   * READ-ONLY: samo modovi koji STVARNO imaju sadržaj — onome tko uči ne nudimo prazan tab.
   *
   * EDIT (M1): kartice/kviz/dopune su prisutni čim postoji BAREM JEDNA sekcija, i onda kad su
   * nizovi prazni. Bez toga nov materijal nema kako dobiti PRVU stavku: tab se ne nacrta →
   * `renderPane` se ne pozove → nema gumba „＋ Dodaj" → slijepa ulica. Uređivači su cijelo
   * vrijeme postojali i radili, samo su bili nedostupni. Vrijedi i za javni katalog: predmet
   * bez ijedne dopune isto nije mogao dobiti prvu.
   *
   * `learn` je NAMJERNO izuzet iz forsiranja: `renderLearnPane` preskače kategoriju bez
   * `learn`-a, pa bi forsiran tab dao prazan panel bez ijedne afordancije. Materijalu to ne
   * smeta jer `addSection` uvijek sije `learn: { blocks: [] }`. Vidi M1b u planu faze.
   */
  function presentModes(data, isEd) {
    var m = { learn: false, cards: false, quiz: false, fill: false };
    cats(data).forEach(function (catId) {
      var c = data[catId];
      if (!c || typeof c !== 'object') return;
      if (Array.isArray(c.flashcards) && c.flashcards.length) m.cards = true;
      if (Array.isArray(c.quiz) && c.quiz.length) m.quiz = true;
      if (Array.isArray(c.fillBlanks) && c.fillBlanks.length) m.fill = true;
      if (learnKind(c)) m.learn = true;
    });
    // Prazan payload (nijedna sekcija) NE dobiva tabove — canvas tad nudi „＋ Nova sekcija".
    if (isEd && cats(data).length) { m.cards = true; m.quiz = true; m.fill = true; }
    return m;
  }

  function renderCanvas() {
    var canvas = byId('stCanvas');
    if (!canvas) return;
    var data = currentData();
    if (!data) { canvas.innerHTML = emptyCanvas(); return; }

    var lname = '';
    if (_node) {
      lname = _node.name;                       // F3: čvor nije u katalogu — naslov je njegov naziv
    } else {
      var subj = (typeof SokratContent !== 'undefined') ? SokratContent.getSubject(_sel.subjectId) : null;
      if (subj && Array.isArray(subj.lessons)) {
        var lo = subj.lessons.find(function (l) { return l.id === _sel.lessonId; });
        lname = lo ? (lo.name || lo.id) : _sel.lessonId;
      }
    }
    var isEd = editing();
    // U draft-modu prikaži i learn tab ako neka kategorija UOPĆE ima learn (za migraciju/dodavanje).
    var m = presentModes(data, isEd);
    var order = ['learn', 'cards', 'quiz', 'fill'].filter(function (k) { return m[k]; });
    var LABEL = { learn: '📚 Learn', cards: '🃏 ' + t('studio.cards', 'Kartice'), quiz: '❓ ' + t('studio.quiz', 'Kviz'), fill: '✍️ ' + t('studio.fill', 'Dopuni') };
    var active = (_activeMode && order.indexOf(_activeMode) >= 0) ? _activeMode : (order[0] || null);

    var tabs = order.map(function (k) {
      return '<button class="st-tab' + (k === active ? ' on' : '') + '" data-mode="' + k + '">' + LABEL[k] + '</button>';
    }).join('');
    var panes = order.map(function (k) {
      var body = (k === 'learn') ? renderLearnPane(data, isEd) : renderPane(k, data, isEd);
      return '<section class="st-pane' + (k === active ? ' on' : '') + '" data-pane="' + k + '">' + body + '</section>';
    }).join('');

    canvas.innerHTML =
      '<div class="st-head"><h1>' + esc(lname) + '</h1>' +
      '<div class="st-metas">' +
      '<span class="st-m">👁 ' + order.length + ' ' + esc(t('studio.modes', 'moda')) + '</span>' +
      (isEd
        ? '<span class="st-m st-editing">✏️ ' + esc(t('studio.editingTag', 'uređuješ (draft)')) + '</span>'
        : '<span class="st-m">📄 ' + esc(t('studio.previewTag', 'pregled')) + '</span>') +
      // F3 K3: jedina afordancija za NOVU sekciju (bez nje je prazan čvor slijepa ulica).
      (isEd ? '<button type="button" class="st-btn ghost st-addcat" data-st-addcat>＋ '
              + esc(t('studio.addSection', 'Nova sekcija')) + '</button>' : '') +
      '</div></div>' +
      (order.length ? '<div class="st-tabs" id="stTabs">' + tabs + '</div>' : '') +
      (order.length ? panes : '<div class="st-empty" style="height:auto;padding:40px"><p>' +
        esc(isEd
          ? t('studio.emptyEditHint', 'Prazno je. Dodaj prvu sekciju pa počni pisati.')
          : t('studio.noModes', 'Ova skripta još nema sadržaja.')) + '</p>' +
        (isEd ? '<button type="button" class="st-btn primary st-addcat" data-st-addcat style="margin-top:14px">＋ '
                + esc(t('studio.addSection', 'Nova sekcija')) + '</button>' : '') +
        '</div>');

    // ── KaTeX: tipografiraj NAKON umetanja (isti obrazac kao js/learn.js:88) ──
    // `blocks-renderer.js` NAMJERNO ispljune `\[tex\]` kao TEKST (sigurnosna granica: renderer
    // ne izvršava ništa) → pozivatelj mora dovršiti posao. Studio to dosad NIJE radio, pa je
    // formula ostajala sirovi LaTeX; za osobno gradivo trajno, jer se čvor gleda SAMO ovdje.
    // ⚠ SAMO read-only: u edit-modu tekst živi u `contenteditable`, a `editableToInline` bi
    // KaTeX-markup pročitao natrag u model. Formula-blokove u edit-modu tipografira
    // `typesetFormulas` iz block-editora (scope = `.be-media--formula` preview).
    if (!isEd && typeof window.renderMath === 'function') window.renderMath(canvas);

    var tabBar = byId('stTabs');
    if (tabBar) tabBar.addEventListener('click', function (e) {
      var b = e.target.closest('.st-tab'); if (!b) return;
      var mode = b.getAttribute('data-mode');
      _activeMode = mode;
      canvas.querySelectorAll('.st-tab').forEach(function (x) { x.classList.toggle('on', x === b); });
      canvas.querySelectorAll('.st-pane').forEach(function (p) { p.classList.toggle('on', p.getAttribute('data-pane') === mode); });
    });

    if (isEd) mountLearnEditors();
  }

  // ---- U8.5f: boja-kvadratići po sekciji (edit-mod) → updateCategory {color} ----
  // Kurirano: paleta + native color-input; sve validira setCatColor na #rrggbb (schema pattern).
  function colorDots(catId, current) {
    var cur = String(current || '').toLowerCase();
    var html = '<span class="st-cdots">';
    SECTION_COLORS.forEach(function (col) {
      html += '<button type="button" class="st-cdot' + (col === cur ? ' on' : '') +
        '" data-st-catcolor="' + col + '" data-st-cat="' + esc(catId) +
        '" style="--dot:' + col + '" title="' + col + '" aria-label="' + esc(t('studio.colorPick', 'Boja sekcije')) + ' ' + col + '"></button>';
    });
    // ⚠️ `title` SAM po sebi nije oznaka polja (axe `label-title-only`, serious): prečesto se ne
    // izgovara i nikad se ne vidi na dodir. Gumbi lijevo su `aria-label` imali od početka — ovaj
    // jedan input nije, i to je stajalo neopaženo jer u Studio dosad nije ulazio nijedan a11y gate.
    html += '<input type="color" class="st-cdot st-cdot--custom" data-st-catcolorpick data-st-cat="' + esc(catId) +
      '" value="' + (/^#[0-9a-f]{6}$/.test(cur) ? cur : '#6366f1') +
      '" title="' + esc(t('studio.colorCustom', 'Vlastita boja')) +
      '" aria-label="' + esc(t('studio.colorCustom', 'Vlastita boja')) + '">';
    return html + '</span>';
  }
  // ---- M3b: boja-kvadratići po STAVCI (kartica/pitanje/dopuna) → updateCard/Quiz/Fill {color} ----
  // Vizualni jezik je namjerno ISTI kao u blok-editoru (`be-cdot`), jer je i ugovor isti:
  // „⊘" = vrati na nasljeđivanje od sekcije, ne „bez boje". Adresiranje ide po stabilnom
  // `id` kad postoji, inače po indeksu (payloadi pre-U2a ga nemaju) — kao `_findIndex`.
  function itemColorDots(type, catId, item, idx) {
    var cur = String((item && item.color) || '').toLowerCase();
    var addr = ' data-st-itype="' + esc(type) + '" data-st-icat="' + esc(catId) + '"' +
      (item && item.id != null ? ' data-st-iid="' + esc(String(item.id)) + '"' : ' data-st-iidx="' + idx + '"');
    var inherit = esc(t('studio.colorInherit', 'Naslijedi boju sekcije'));
    var html = '<span class="st-idots">';
    html += '<button type="button" class="be-cdot be-cdot--none' + (cur ? '' : ' on') +
      '" data-st-icolor=""' + addr + ' title="' + inherit + '" aria-label="' + inherit + '">⊘</button>';
    SECTION_COLORS.forEach(function (col) {
      html += '<button type="button" class="be-cdot' + (col === cur ? ' on' : '') +
        '" data-st-icolor="' + col + '"' + addr + ' style="--dot:' + col +
        '" title="' + col + '" aria-label="' + esc(t('studio.colorPickItem', 'Boja stavke')) + ' ' + col + '"></button>';
    });
    return html + '</span>';
  }

  var ITEM_COLOR_OPS = { flashcard: 'updateCard', quiz: 'updateQuiz', fill: 'updateFill' };

  function setItemColor(btn) {
    var b = bridge();
    if (!b || !editing()) return;
    var raw = btn.getAttribute('data-st-icolor') || '';
    if (raw && !/^#[0-9a-fA-F]{6}$/.test(raw)) return;      // točno #rrggbb (kao schema)
    var op = ITEM_COLOR_OPS[btn.getAttribute('data-st-itype')];
    if (!op) return;
    // `null` u patchu BRIŠE ključ (`_assignPatch`) → odsutno = naslijedi od sekcije.
    var msg = { type: op, catId: btn.getAttribute('data-st-icat'), patch: { color: raw ? raw.toLowerCase() : null } };
    var id = btn.getAttribute('data-st-iid');
    if (id != null) msg.id = id;
    else msg.idx = parseInt(btn.getAttribute('data-st-iidx'), 10);
    var res = b.applyOp(msg);
    if (res && res.ok) { renderCanvas(); refreshTopbar(); }
  }

  /**
   * F3 K3 — dodaj novu sekciju. Bez ovoga je NOV čvor slijepa ulica: payload je `{}`,
   * pa nema nijedne kategorije, nijednog moda i nijednog mjesta za pisanje.
   * Ide kroz POSTOJEĆI `addCategory` op (draft → publish), bez novog write-puta.
   */
  function addSection() {
    var b = bridge();
    if (!b || !editing()) return;
    var data = currentData() || {};
    // Stabilan, čitljiv i NESUDARAJUĆI ključ (addCategory je no-op ako ključ već postoji).
    var n = 1, key = 'sekcija-1';
    while (Object.prototype.hasOwnProperty.call(data, key)) { n++; key = 'sekcija-' + n; }
    var color = SECTION_COLORS[cats(data).length % SECTION_COLORS.length];
    var res = b.applyOp({
      type: 'addCategory',
      catId: key,
      category: {
        name: t('studio.newSectionName', 'Nova sekcija'),
        icon: 'fa-book',
        color: color,
        flashcards: [], quiz: [], fillBlanks: [],
        // Prazan `learn.blocks` je dovoljan da se Learn mod prikaže (learnKind → 'v2'),
        // pa korisnik odmah ima gdje pisati umjesto praznog ekrana.
        learn: { blocks: [] }
      }
    });
    if (res && res.ok) { _activeMode = 'learn'; renderCanvas(); refreshTopbar(); }
    else toast(t('studio.addSectionFail', 'Sekciju nije bilo moguće dodati.'));
  }

  /**
   * F4 — obriši sekciju iz DRAFTA (uz potvrdu). Poništivo „Odbaci"-jem, a nakon objave i kroz
   * `node_content_versions` / `content_versions` (append-only audit). Ide kroz POSTOJEĆI
   * `removeCategory` op — bez novog write-puta.
   */
  async function delSection(catId) {
    var b = bridge();
    if (!b || !editing()) return;
    var data = currentData();
    if (!data || !data[catId]) return;
    var name = (data[catId] && data[catId].name) ? String(data[catId].name) : catId;
    if (typeof window.askConfirm === 'function') {
      var ok = await window.askConfirm({
        title: t('studio.delCatTitle', 'Obrisati sekciju?'),
        message: t('studio.delCatMsg', 'Sekcija „{name}" i sve u njoj (kartice, kviz, fill, learn) miču se iz drafta. Možeš je vratiti gumbom „Odbaci".')
          .replace('{name}', name),
        confirmText: t('studio.del', 'Obriši'),
        danger: true
      });
      if (!ok) return;
    }
    var res = b.applyOp({ type: 'removeCategory', catId: catId });
    if (res && res.ok) {
      // Obrisana je možda bila JEDINA sekcija → mod više nema pokrića; renderCanvas to razriješi.
      renderCanvas();
      refreshTopbar();
    } else {
      toast(t('studio.delCatFail', 'Sekciju nije bilo moguće obrisati.'));
    }
  }

  function setCatColor(catId, color) {
    var b = bridge();
    if (!b || !editing()) return;
    if (!/^#[0-9a-fA-F]{6}$/.test(String(color || ''))) return;  // točno #rrggbb (kao schema)
    var res = b.applyOp({ type: 'updateCategory', catId: catId, patch: { color: String(color).toLowerCase() } });
    if (res && res.ok) { renderCanvas(); refreshTopbar(); }
  }

  // ---- K1 (F7): uredljiv naslov sekcije (kvadratić) → updateCategory {name} ----
  // Commit na focusout; sadržaj se čita kao PLAIN TEXT (textContent, bez HTML-a = granica).
  // NE re-crtamo canvas (element već prikazuje upisano; re-crtanje na blur bi „pojelo" idući klik) —
  // samo osvježimo draft-chip. Ostali paneli (kartice/kviz seclbl) sinkroniziraju naziv na idućem renderu.
  function commitCatName(el) {
    var b = bridge();
    if (!b || !editing()) return;
    var catId = el.getAttribute('data-st-catname');
    var data = currentData();
    var c = data && data[catId];
    if (!c) return;
    var prev = String(c.name == null ? '' : c.name);
    var next = String(el.textContent || '').replace(/\s+/g, ' ').trim();
    if (!next || next === prev) { el.textContent = prev; return; }  // prazan/nepromijenjen → vrati stari (ne prljaj draft)
    var res = b.applyOp({ type: 'updateCategory', catId: catId, patch: { name: next } });
    el.textContent = (res && res.ok) ? next : prev;
    if (res && res.ok) refreshTopbar();
  }

  // ---- K6b (F7): drag preslagivanje SEKCIJA (learn kvadratića) → reorderCategories ----
  // Vanilla pointer-drag (D4) SAMO s ručke ⠿ (R-C: ne otima caret naslova). Auto-scroll uz rubove
  // canvasa (sekcije su visoke). Na ispuštanju: full-key merge (ne-learn kat. ostaju na apsolutnim
  // mjestima, permutira se samo skup vidljivih learn-cat) → reorderCategories op → re-render.
  function catDropIndex(y, others) {
    var idx = 0;
    for (var i = 0; i < others.length; i++) {
      var r = others[i].getBoundingClientRect();
      if (y > r.top + r.height / 2) idx++;
    }
    return idx;
  }
  function reorderedCatIds(ids, draggedId, idx) {
    var others = ids.filter(function (id) { return id !== draggedId; });
    var k = idx < 0 ? 0 : (idx > others.length ? others.length : idx);
    return others.slice(0, k).concat([draggedId], others.slice(k));
  }
  function startCatDrag(e, handle) {
    var b = bridge(); if (!b || !editing()) return;
    var canvas = byId('stCanvas'); if (!canvas) return;
    var catEl = handle.closest('.st-learn-cat'); if (!catEl) return;
    var draggedId = catEl.getAttribute('data-st-cat'); if (!draggedId) return;
    e.preventDefault();
    catEl.classList.add('st-dragging');
    // Fix B: drop-linija = GLOBALNA `.be-dropline` (bila `st-dropline` scopana pod #editor-page,
    // a dodaje se na body → nije se stilizirala = nevidljiva). + ghost koji prati kursor.
    var line = document.createElement('div'); line.className = 'be-dropline'; document.body.appendChild(line);
    var nEl = catEl.querySelector('.st-n'), nameEl = catEl.querySelector('.st-cat-name');
    var ghost = document.createElement('div'); ghost.className = 'be-ghost';
    ghost.innerHTML = '<i class="fas fa-grip-vertical"></i> ' +
      (nEl && nEl.textContent ? '<b>' + esc(nEl.textContent) + '</b> ' : '') +
      esc((nameEl && nameEl.textContent) || 'Sekcija');
    document.body.appendChild(ghost);
    var pointerX = e.clientX, pointerY = e.clientY, raf = 0;

    function others() {
      return Array.prototype.slice.call(canvas.querySelectorAll('.st-learn-cat'))
        .filter(function (el) { return el.getAttribute('data-st-cat') !== draggedId; });
    }
    function placeLine(idx, oth) {
      var box = canvas.getBoundingClientRect(), y;
      if (!oth.length) y = box.top + 6;
      else if (idx < oth.length) y = oth[idx].getBoundingClientRect().top - 8;
      else y = oth[oth.length - 1].getBoundingClientRect().bottom + 8;
      y = Math.max(box.top + 2, Math.min(y, box.bottom - 2));      // clamp u vidljivi canvas
      line.style.left = box.left + 'px'; line.style.width = box.width + 'px'; line.style.top = y + 'px';
    }
    function refresh() {
      ghost.style.left = (pointerX + 14) + 'px'; ghost.style.top = (pointerY + 12) + 'px';
      var oth = others(); placeLine(catDropIndex(pointerY, oth), oth);
    }
    function tick() {                                              // auto-scroll dok je pointer u edge-zoni
      var box = canvas.getBoundingClientRect(), EDGE = 64, SPEED = 14;
      if (pointerY < box.top + EDGE) canvas.scrollTop -= SPEED;
      else if (pointerY > box.bottom - EDGE) canvas.scrollTop += SPEED;
      refresh();
      raf = requestAnimationFrame(tick);
    }
    function onMove(ev) { pointerX = ev.clientX; pointerY = ev.clientY; refresh(); }
    function onUp(ev) {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      if (raf) cancelAnimationFrame(raf);
      if (line.parentNode) line.parentNode.removeChild(line);
      if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
      catEl.classList.remove('st-dragging');
      var visIds = Array.prototype.slice.call(canvas.querySelectorAll('.st-learn-cat'))
        .map(function (el) { return el.getAttribute('data-st-cat'); });
      var after = reorderedCatIds(visIds, draggedId, catDropIndex(ev.clientY, others()));
      if (after.join('') === visIds.join('')) return;   // nepromijenjeno
      // full-key merge: sve ključeve zadrži, permutiraj SAMO vidljive learn-cat na njihovim mjestima
      var full = Object.keys(currentData() || {});
      var vset = {}; after.forEach(function (id) { vset[id] = 1; });
      var vi = 0;
      var order = full.map(function (k) { return vset[k] ? after[vi++] : k; });
      var res = b.applyOp({ type: 'reorderCategories', order: order });
      if (res && res.ok) { renderCanvas(); refreshTopbar(); }
    }
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
    raf = requestAnimationFrame(tick);
    refresh();
  }

  // ---- LEARN PANE (edit-svjestan) ----
  function renderLearnPane(data, isEd) {
    var out = '';
    var n = 0;
    cats(data).forEach(function (catId) {
      var c = data[catId];
      if (!c || typeof c !== 'object') return;
      var kind = learnKind(c);
      if (!isEd && !kind) return;              // read-only: preskoči kategorije bez learn-a
      if (isEd && !kind) return;               // U8.2: dodavanje learn-a praznoj kategoriji = kasnija cigla
      n++;
      var accStyle = c.color ? ' style="--st-acc:' + esc(c.color) + '"' : '';
      var catName = esc(c.name || catId);

      if (!isEd) {
        // READ-ONLY preview (U8.1) kroz JEDAN renderer
        var body = renderLearnBody(c.learn, kind);
        // Fix #6: ne dupliciraj naslov kad je learn.title == name (npr. „Tourism Demand — Tourism Demand").
        var sub = (c.learn.title && String(c.learn.title).trim().toLowerCase() !== String(c.name || catId).trim().toLowerCase())
          ? ' — ' + esc(c.learn.title) : '';
        out += '<div class="st-kv"' + accStyle + '><div class="st-kvhead"><span class="st-n">' + n + '</span>' +
          '<h2>' + catName + sub + '</h2></div>' +
          '<div class="st-body">' + body + '</div></div>';
        return;
      }

      // EDIT-MOD — kvadratić-kartica (K2): broj-badge + uredljiv naslov (K1) + tijelo-omotač;
      // vizual usklađen s VIEW `st-kv` (isti card-jezik). Naslov = contenteditable → updateCategory{name}.
      out += '<div class="st-learn-cat" data-st-cat="' + esc(catId) + '"' + accStyle + '>' +
        '<div class="st-learn-cathead">' +
        '<button type="button" class="st-catdrag" data-st-catdrag="' + esc(catId) + '" ' +
        'title="' + esc(t('studio.dragCat', 'Povuci za preslagivanje sekcije')) + '" aria-label="' + esc(t('studio.dragCat', 'Povuci sekciju')) + '"><i class="fas fa-grip-vertical"></i></button>' +
        '<span class="st-n">' + n + '</span>' +
        '<span class="st-cat-name" contenteditable="true" spellcheck="false" role="textbox" ' +
        'data-st-catname="' + esc(catId) + '" title="' + esc(t('studio.renameCat', 'Uredi naziv sekcije')) + '">' +
        catName + '</span>' +
        colorDots(catId, c.color) +
        // F4: brisanje sekcije. Op `removeCategory` postojao je od U6c, ali ga je zvao SAMO stari
        // admin-overlay — Studio je imao dodaj/preimenuj/boju/presloži, a brisanja nije bilo nigdje.
        '<button type="button" class="st-catdel" data-st-catdel="' + esc(catId) + '" ' +
        'title="' + esc(t('studio.delCat', 'Obriši sekciju')) + '" aria-label="' + esc(t('studio.delCat', 'Obriši sekciju')) +
        '"><i class="fas fa-trash"></i></button>' + '</div>' +
        '<div class="st-learn-body">';
      if (kind === 'v2') {
        // blok-editor (kvadratići) — montira se u post-renderu
        out += '<div class="be-mount" data-be-cat="' + esc(catId) + '"></div>';
      } else {
        // v1: read-only tijelo + sigurna migracija na blokove (learn.js bira blokove nad content → ne montiramo editor na v1)
        out += '<div class="st-body">' + renderLearnBody(c.learn, 'v1') + '</div>' +
          '<div class="st-legacy-note">' + esc(t('studio.v1Note', 'Stari format (jedan HTML). Prebaci na blokove za uređivanje po kvadratićima:')) + '</div>' +
          '<button type="button" class="st-migrate" data-migrate-cat="' + esc(catId) + '"><i class="fas fa-cubes"></i> ' +
          esc(t('studio.migrate', 'Uredi kao blokove')) + '</button>';
      }
      out += '</div></div>';
    });
    if (!out) return '<p class="st-hint">' + esc(t('studio.learnEmpty', 'Nema learn-sadržaja u ovoj skripti.')) + '</p>';
    // U1 (R1-UX, Leon uživo 2026-09-02): afordancija za NOVU sekciju i na DNU panea.
    // Jedina dosad (st-metas na vrhu canvasa) skrola iz vida čim korisnik radi na
    // blokovima → ostane zarobljen u jednoj sekciji i sve piše u nju. Delegacija na
    // canvasu već hvata svaki [data-st-addcat], pa je ovo čisti markup.
    if (isEd) out += addCatFootHtml();
    return out;
  }

  function addCatFootHtml() {
    return '<button type="button" class="st-addcat-foot" data-st-addcat>＋ '
      + esc(t('studio.addSection', 'Nova sekcija')) + '</button>';
  }

  function renderLearnBody(L, kind) {
    // BUG-024: `renderContentBlocks` razriješi `node-img:` oznake prije rendera — jedan ulaz za
    // studio, admin, block-editor i learn (prije je svaki imao svoju kopiju te odluke).
    if (kind === 'v2' && typeof window.renderContentBlocks === 'function') return window.renderContentBlocks(L.blocks);
    if (kind === 'v1' && typeof window.renderContentBlocks === 'function') return window.renderContentBlocks([{ type: 'legacy-html', html: L.content }]);
    return esc(String((L && L.content) || ''));
  }

  // ---- KARTICE/KVIZ/FILL PANE (read-only preview + U8.3 edit-mod) ----
  // Tijela stavki (dijele read-only i edit).
  function cardBody(fc) { return '<div class="st-q">' + esc(fc.question || '') + '</div><div class="st-a">' + esc(fc.answer || '') + '</div>'; }
  function quizBody(qz) {
    var opts = Array.isArray(qz.options) ? qz.options : [];
    return '<div class="st-qtext">' + esc(qz.question || '') + '</div>' + opts.map(function (o, oi) {
      var ok = (oi === qz.correct);
      return '<div class="st-opt' + (ok ? ' correct' : '') + '">' + esc(o) + (ok ? '<span class="st-ok">TOČAN</span>' : '') + '</div>';
    }).join('');
  }
  // D2: rečenica smije imati više praznina → pločica pokazuje SVE odgovore, ne samo prvi.
  function fillBody(fb) {
    var ans = (Array.isArray(fb.answers) && fb.answers.length) ? fb.answers.join(' · ') : (fb.answer || '');
    return '<div class="st-fsent">' + esc(fb.sentence || '') + '</div><div class="st-fans">→ ' + esc(ans) + '</div>';
  }

  var PANE_MAP = {
    cards: { arr: 'flashcards', type: 'flashcard', body: cardBody, add: 'Dodaj karticu' },
    quiz:  { arr: 'quiz',       type: 'quiz',      body: quizBody, add: 'Dodaj pitanje' },
    fill:  { arr: 'fillBlanks', type: 'fill',      body: fillBody, add: 'Dodaj dopunu' }
  };

  // U8.3: uređivanje kartica/kviza/fill-a REUSE-a admin modal-editore + kontrole (data-admin-*),
  // koje već hvataju globalni listeneri u admin.js (edit ✎ / dodaj ＋ / obriši 🗑 / presloži ↑↓).
  // Op ide u ISTI draft → `_adminRerender` → `onDraftChanged` osvježi Studio canvas.
  function renderPane(mode, data, isEd) {
    var m = PANE_MAP[mode];
    if (!m) return '';
    var hasCtrls = (typeof _adminItemControls === 'function' && typeof _adminAddBtn === 'function');
    var out = '';
    cats(data).forEach(function (catId) {
      var c = data[catId];
      if (!c || typeof c !== 'object') return;
      var arr = Array.isArray(c[m.arr]) ? c[m.arr] : [];
      if (!isEd && !arr.length) return;                    // read-only: preskoči prazne
      // M3b: akcent STAVKE = vlastita boja, inače naslijeđena od sekcije. Validacija ide kroz
      // JEDNU definiciju (`SokratBlocks.accentFrom`) — istu koja vrijedi za blok i za study-
      // prikazivače; u `style` ulazi samo ono što je prošlo `^#[0-9a-fA-F]{6}$`.
      function itemStyle(it) {
        var acc = (window.SokratBlocks && typeof SokratBlocks.accentFrom === 'function')
          ? SokratBlocks.accentFrom([it && it.color, c.color])
          : '';
        return acc ? ' style="--st-acc:' + acc + '"' : '';
      }
      out += '<div class="st-seclbl">§ ' + esc(c.name || catId) + (isEd ? colorDots(catId, c.color) : '') + '</div>';

      if (!isEd) {
        if (mode === 'cards') {
          out += '<div class="st-cardgrid">' + arr.map(function (fc) {
            return '<div class="st-fcard"' + itemStyle(fc) + '>' + m.body(fc) + '</div>';
          }).join('') + '</div>';
        } else {
          out += arr.map(function (it) {
            return '<div class="' + (mode === 'quiz' ? 'st-qz' : 'st-fill') + '"' + itemStyle(it) + '>' + m.body(it) + '</div>';
          }).join('');
        }
        return;
      }

      // EDIT: svaka stavka = tijelo + kvadratići boje + admin-kontrole + „＋ Dodaj" na dnu kategorije
      arr.forEach(function (it, i) {
        out += '<div class="st-edit-item"' + itemStyle(it) + '><div class="st-edit-body">' + m.body(it) + '</div>' +
          itemColorDots(m.type, catId, it, i) +
          (hasCtrls ? _adminItemControls(true, m.type, catId, i, arr.length) : '') + '</div>';
      });
      if (hasCtrls) out += '<div class="st-addwrap">' + _adminAddBtn(true, m.type, catId, m.add) + '</div>';
    });
    if (!out) return '<p class="st-hint">' + esc(t('studio.paneEmpty', 'Nema sadržaja u ovom modu.')) + '</p>';
    if (isEd) out += addCatFootHtml(); // U1: isti razlog kao u learn paneu (vidi gore)
    return out;
  }

  // ---- BLOK-EDITOR mount (U8.2): montira SokratBlockEditor u svaki .be-mount learn-panea ----
  function mountLearnEditors() {
    var b = bridge();
    if (!b || !window.SokratBlockEditor || typeof SokratBlockEditor.mount !== 'function') return;
    var canvas = byId('stCanvas');
    if (!canvas) return;
    canvas.querySelectorAll('.be-mount').forEach(function (el) {
      var catId = el.getAttribute('data-be-cat');
      SokratBlockEditor.mount(el, {
        catId: catId,
        getBlocks: function () { return b.getBlocks(catId); },
        applyOp: function (op) { var r = b.applyOp(op); refreshTopbar(); return r; }
      });
    });
  }

  // v1 → v2: sadržaj postaje jedan legacy-html blok (addBlock dodijeli id). Poništivo (Odbaci/content_versions).
  function migrateToBlocks(catId) {
    var b = bridge();
    if (!b || !editing()) return;
    var data = currentData();
    var c = data && data[catId];
    if (!c || learnKind(c) !== 'v1') return;
    var res = b.applyOp({ type: 'addBlock', catId: catId, item: { type: 'legacy-html', html: c.learn.content } });
    if (res && res.ok) {
      renderCanvas();
      refreshTopbar();
      toast(t('studio.migrated', 'Sekcija prebačena na blokove — postojeći sadržaj je sad prvi blok.'));
    }
  }

  // ---- ULAZ U EDIT / OBJAVI / ODBACI (JEDAN engine preko bridge-a) ----
  async function enterEdit() {
    var b = bridge();
    if (!b || !_sel.subjectId) return;
    if (editing()) return;
    await b.enter();                 // svjež DB payload + SokratDraft.begin (toast „nije u bazi" ako fali)
    if (editing()) { renderCanvas(); refreshTopbar(); }
  }

  // ---- F3 — OSOBNI ČVOR ----
  /**
   * Otvori study-čvor iz „Mojih materijala" u Studiju. Postavi kontekst, prebaci na
   * editor-stranicu (render nacrta ljusku), pa dohvati payload i nacrtaj canvas.
   * @param {string} nodeId @param {string} name
   */
  async function openNode(nodeId, name) {
    if (!nodeId) return;
    _node = { id: nodeId, name: name || '' };
    // K2b: hijerarhija editora živi u stanju, ne u argumentu gumba. Do K2b je Studio
    // jedini znao je li otvorio osobni čvor ili katalog i prosljeđivao to ručno kroz
    // `goBack('materials'|'profile')` — pa `roditeljOd()` nije znao roditelja editora.
    // Čim mrvicu crta ista hijerarhija, dva izvora znaju se raziĆi; ovako ih je jedan.
    if (typeof AppState !== 'undefined' && AppState.nav) AppState.nav.editorNode = { id: nodeId, name: name || '' };
    _sel = { subjectId: 'node:' + nodeId, lessonId: 'content' };
    _data = null;
    _activeMode = null;
    // F4: svjež cache potpisa po otvaranju — potpisi ne smiju preživjeti promjenu čvora ni identiteta
    // (cijena je jedan batch-potpis; alternativa bi bila vući istekle URL-ove kroz dugu sesiju).
    if (window.SokratNodeImages && typeof window.SokratNodeImages.clear === 'function') window.SokratNodeImages.clear();
    if (typeof navigateTo === 'function') navigateTo('editor');   // → render() (ljuska + „učitavam")
    await loadNode();
  }

  /** Dohvati payload čvora i ožiči bridge. Prazan `{}` je legitimno početno stanje. */
  async function loadNode() {
    if (!_node) return;
    var canvas = byId('stCanvas');
    var client = (typeof SokratAuth !== 'undefined' && typeof SokratAuth.getClient === 'function')
      ? SokratAuth.getClient() : null;
    if (!client) {
      if (canvas) canvas.innerHTML = '<div class="st-empty"><p>' + esc(t('admin.loadFail', 'Sadržaj se nije mogao učitati.')) + '</p></div>';
      return;
    }
    try {
      var r = await client.from('node_content').select('payload').eq('node_id', _node.id).single();
      if (r.error || !r.data) throw (r.error || new Error('no-row'));
      _data = r.data.payload || {};
    } catch (e) {
      _data = null;
      if (canvas) canvas.innerHTML = '<div class="st-empty"><p>' + esc(t('admin.loadFail', 'Sadržaj se nije mogao učitati.')) + '</p></div>';
      return;
    }
    if (bridge() && typeof bridge().setNode === 'function') {
      try { bridge().setNode(_node.id, _node.name, _data); } catch (e) { /* bridge opcionalan */ }
    }
    // F4: potpiši sve `node-img:` oznake PRIJE prvog crtanja — inače bi renderer fail-safe izostavio
    // slike na jedan kadar. `prefetch` nikad ne baca: neuspjeh potpisa ne smije srušiti otvaranje čvora.
    if (window.SokratNodeImages && typeof window.SokratNodeImages.prefetch === 'function') {
      try { await window.SokratNodeImages.prefetch(_data); } catch (e) { /* prikaz bez slike je OK */ }
    }
    renderCanvas();
    refreshTopbar();
  }

  function currentDraft() {
    return (window.SokratDraft && _sel.subjectId) ? SokratDraft.get(_sel.subjectId, _sel.lessonId) : null;
  }

  function refreshTopbar() {
    var chip = byId('stDraftChip');
    var editBtn = byId('stEdit');
    var pub = byId('stPublish');
    var dis = byId('stDiscard');
    var b = bridge();
    var isEd = editing();
    var hasLesson = !!_sel.subjectId;
    var canEdit = hasLesson && b && (typeof b.hasVar !== 'function' || b.hasVar());

    if (editBtn) editBtn.hidden = !(canEdit && !isEd);
    if (pub) pub.hidden = !isEd;
    if (dis) dis.hidden = !isEd;

    // #7: inspektor je mode-svjestan → osvježi ga SAMO kad se edit-stanje promijeni (ne na svaku op).
    var insp = byId('stInspector');
    if (insp && _inspEd !== isEd) { _inspEd = isEd; insp.innerHTML = inspectorStub(isEd); mountAi(); }

    if (!chip) return;
    if (!hasLesson) { chip.textContent = '—'; chip.classList.remove('dirty'); return; }
    var d = currentDraft();
    if (d && d.dirty) {
      chip.textContent = '✏️ ' + d.ops.length + ' ' + t('studio.changes', 'izmjena');
      chip.classList.add('dirty');
    } else {
      chip.textContent = '✓ ' + t('studio.published', 'objavljeno');
      chip.classList.remove('dirty');
    }
  }

  async function publish() {
    var d = currentDraft();
    if (!d || !d.dirty) { toast(t('studio.nothingToPublish', 'Nema izmjena za objavu.')); return; }
    if (!bridge()) return;
    await bridge().publish();          // U4 publish_document RPC
    renderCanvas();                    // izašli iz draft-moda → read-only sinkroniziran sadržaj
    refreshTopbar();
  }
  async function discard() {
    var d = currentDraft();
    if (!d || !d.dirty) { toast(t('studio.nothingToDiscard', 'Nema izmjena.')); return; }
    if (!bridge()) return;
    await bridge().discard();
    renderCanvas();
    refreshTopbar();
  }

  // Hook: admin draft-op (`_adminRerender`) je promijenio isti draft → osvježi Studio canvas.
  // No-op ako Studio nije aktivan (npr. op je došao sa starog #admin-page).
  function onDraftChanged() {
    var page = byId('editor-page');
    if (!page || !page.classList.contains('active')) return;
    if (!_sel.subjectId) return;
    renderCanvas();
    refreshTopbar();
  }

  return { render: render, onDraftChanged: onDraftChanged, openNode: openNode };
})();

window.SokratStudio = SokratStudio;
// Poziva ga navigateTo('editor') (navigation.js), analogno renderAdminPage().
window.renderStudioPage = function () { SokratStudio.render(); };

// Ulaz u Studio: admin-only gumb u profilu (data-studio-open). Stari „Edit content" ostaje (→ #admin-page).
document.addEventListener('click', function (e) {
  if (e.target.closest('[data-studio-open]')) {
    if (typeof navigateTo === 'function') navigateTo('editor');
  }
});
