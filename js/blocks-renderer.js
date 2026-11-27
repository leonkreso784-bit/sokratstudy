// ===== SOKRAT STUDY — BLOCKS RENDERER (U7b) =====
//
// JEDAN renderer za learn-blokove = SIGURNOSNA GRANICA (EDITOR_PLAN §3.2/§6/§8).
// Isti kod servira study, editor-preview (U8) i budući marketplace → sav render learna
// prolazi ovuda. Sigurnost PO KONSTRUKCIJI: renderira se SAMO poznati tip s ESCAPANIM
// poljima; autor nikad ne piše sirovi HTML (osim `legacy-html` tipa → DOMPurify).
//
// Tipovi blokova: heading · paragraph · list · callout · image · video(youtube) · table ·
// formula(KaTeX) · legacy-html.  `renderBlocks(blocks)` → siguran HTML string.
//
// U7b JE IZOLIRAN — datoteka se učitava i definira `window.renderBlocks`, ali JOŠ nije
// ožičena na student-view (to radi U7c: `learn.js` dual-mode). DOMPurify se koristi AKO je
// `window.DOMPurify` prisutan; bez njega legacy-html izlazi kao TEKST (F6 ②/0d, N2 — nikad
// sirov HTML, ni za katalog). YouTube = klik-za-učitavanje (nocookie), autor
// unosi SAMO link/ID, mi gradimo iframe → nula third-party poziva prije klika (consent-safe).

(function () {
  'use strict';

  // ── escape (jedina istina za izlaz teksta) ──
  const ESC_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ESC_MAP[c]; });
  }

  // ── URL sanitizacija: dopusti relativne/anchor/protocol-relative + http(s)/mailto;
  //    za slike još data:image/(png|jpg|gif|webp). Sve s eksplicitnom drugom shemom
  //    (javascript:, data:text, vbscript:, file:, …) → ODBIJ (prazan string). ──
  //
  //    ⚠️ F6 ②/0c (MCP_SECURITY N1): shema se čita iz niza BEZ kontrolnih znakova i razmaka.
  //    Preglednik ih pri parsiranju adrese izbacuje (vodeće/prateće C0 i razmak, TAB/LF/CR bilo
  //    gdje), pa je `java<TAB>script:` za njega `javascript:` — a regex nad neočišćenim nizom
  //    nije vidio nikakvu shemu i propustio ga kao „relativan". `probe` izbacuje NADSKUP onoga što
  //    izbacuje preglednik, pa svaku shemu koju vidi preglednik vidi i provjera.
  function safeUrl(url, opts) {
    const u = String(url == null ? '' : url).trim();
    if (!u) return '';
    const probe = u.replace(/[\u0000-\u0020\u007f]/g, '');
    const m = probe.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/); // ima li eksplicitnu shemu?
    if (!m) return u;                                  // relativni / #anchor / //host → OK
    const scheme = m[1].toLowerCase();
    if (scheme === 'http' || scheme === 'https' || scheme === 'mailto') return u;
    // data:image (bez svg — SVG može nositi skripte) samo za <img>
    if (opts && opts.image && /^data:image\/(png|jpe?g|gif|webp)[;,]/i.test(probe)) return u;
    return '';                                         // nepoznata/opasna shema
  }

  // ── ikona (Font Awesome) — BUG-025; DEFINICIJA JE U `js/utils.js` ──
  // Preselila se ondje kad je renderer otišao u paket `study`: `profile.js` piše ikonu
  // predmeta u `innerHTML`, a renderer ne učitava — pa bi mu ovdašnja definicija bila
  // nedostupna i sve bi ikone tiho pale na knjigu. Prečac, ne kopija.
  const safeIcon = (icon, fallback) => window.safeIcon(icon, fallback);

  // ── YouTube: izvuci + validiraj 11-znakovni video-ID (iz čistog ID-a ili URL-a). ──
  function youtubeId(input) {
    const s = String(input == null ? '' : input).trim();
    if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;       // već čist ID
    const m = s.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : '';
  }

  // ── inline tekst: plain string ILI runs [{text, b?, i?, color?, href?}] ──
  // Boja = SAMO iz kuriranog seta imena (token → CSS klasa) — nikad proizvoljna vrijednost.
  // ⚠ mora ostati usklađen s TB_COLORS u block-editor.js (F6 paleta boja teksta)
  const INLINE_COLORS = { indigo: 1, green: 1, amber: 1, red: 1, cyan: 1, blue: 1, violet: 1, pink: 1, default: 1 };
  function renderRun(run) {
    if (run == null) return '';
    if (typeof run === 'string') return esc(run);
    if (typeof run !== 'object') return esc(run);
    // ── inline matematika: EKSKLUZIVAN run (ne kombinira se s b/i/color/href) ──
    // Isti obrazac kao formula-blok: delimiteri izlaze kao TEKST, a `renderMath()` ih
    // tipografira POSLIJE umetanja (js/learn.js, js/studio.js). Ovdje se NIŠTA ne izvršava
    // i `esc()` ostaje → nema nove površine za injekciju. Loš LaTeX KaTeX crta crveno
    // (throwOnError:false), nikad ne baca.
    if (run.math) return '<span class="lb-imath">\\(' + esc(run.text) + '\\)</span>';
    let html = esc(run.text);
    if (run.b) html = '<strong>' + html + '</strong>';
    if (run.i) html = '<em>' + html + '</em>';
    if (run.color && INLINE_COLORS[run.color] && run.color !== 'default') {
      html = '<span class="lb-color-' + run.color + '">' + html + '</span>';
    }
    if (run.href) {
      const href = safeUrl(run.href);
      if (href) html = '<a href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' + html + '</a>';
    }
    return html;
  }
  function renderInline(content) {
    if (Array.isArray(content)) return content.map(renderRun).join('');
    return renderRun(content);
  }

  // ── DOMPurify config za legacy-html (whitelist ugođen parity-provjerom U7c) ──
  // ALLOWED_TAGS/ATTR = SUPERSET svega što naš v1 learn HTML koristi (dokazano
  // tests/unit/legacy-html-coverage.test.js nad svih 19 predmeta / 468 blokova) → DOMPurify
  // ne struže naš sadržaj. `style` (331×) i `value` (li) su tu radi PARITETA legacy prikaza
  // (gradijenti/centriranje/margine u tip-box itd.); DOMPurify i dalje sanitizira CSS-vrijednosti
  // (miče url(javascript:)/expression). Novo v2 autorstvo = tokeni-only (blokovi ne emitiraju style).
  const DOMPURIFY_CFG = {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr', 'strong', 'b', 'em', 'i', 'u', 's',
      'ul', 'ol', 'li', 'a', 'blockquote', 'code', 'pre', 'span', 'div', 'sup', 'sub',
      'table', 'thead', 'tbody', 'tr', 'th', 'td', 'img', 'figure', 'figcaption'],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'style', 'value', 'colspan', 'rowspan', 'target', 'rel'],
    ALLOW_DATA_ATTR: false
  };

  // ── pojedini tipovi blokova ──
  function renderHeading(b) {
    let lvl = parseInt(b.level, 10);
    if (!(lvl >= 2 && lvl <= 4)) lvl = 3;              // kurirani raspon h2–h4
    return '<h' + lvl + ' class="lb-heading">' + renderInline(b.text) + '</h' + lvl + '>';
  }
  function renderParagraph(b) {
    return '<p class="lb-paragraph">' + renderInline(b.text) + '</p>';
  }
  function renderList(b) {
    const tag = b.ordered ? 'ol' : 'ul';
    const items = Array.isArray(b.items) ? b.items : [];
    return '<' + tag + ' class="lb-list">' +
      items.map(function (it) { return '<li>' + renderInline(it) + '</li>'; }).join('') +
      '</' + tag + '>';
  }
  const CALLOUT_VARIANTS = { info: 1, warning: 1, tip: 1 };
  function renderCallout(b) {
    const variant = CALLOUT_VARIANTS[b.variant] ? b.variant : 'info';
    const title = (b.title != null && String(b.title) !== '')
      ? '<div class="lb-callout__title">' + esc(b.title) + '</div>' : '';
    return '<div class="lb-callout lb-callout--' + variant + '">' + title +
      '<div class="lb-callout__body">' + renderInline(b.text) + '</div></div>';
  }
  function renderImage(b) {
    const src = safeUrl(b.src, { image: true });
    if (!src) return '';                               // nevaljan/opasan URL → izostavi (fail-safe)
    const alt = esc(b.alt || '');
    const cap = (b.caption != null && String(b.caption) !== '')
      ? '<figcaption class="lb-figure__cap">' + renderInline(b.caption) + '</figcaption>' : '';
    // U8.5e: kurirana širina u % (10–99; 100/nevaljano = bez stila → `max-w-full` utility).
    // Ne-broj/izvan raspona se IGNORIRA (granica: u style ide isključivo naš računati broj).
    const w = Math.round(Number(b.width));
    const wStyle = (isFinite(w) && w >= 10 && w <= 99) ? ' style="width:' + w + '%"' : '';
    return '<figure class="lb-figure my-[1.4em] text-center"><img class="lb-figure__img h-auto max-w-full" src="' + esc(src) +
      '" alt="' + alt + '" loading="lazy"' + wStyle + '>' + cap + '</figure>';
  }
  function renderVideo(b) {
    const id = youtubeId(b.videoId != null ? b.videoId : b.url);
    if (!id) return '';                                // nevaljan ID → izostavi
    // Facade: NULA poziva prema YouTubeu prije klika (consent-safe). Klik → iframe (nocookie).
    return '<div class="lb-video relative my-[1.4em] aspect-video overflow-hidden">' +
      '<button type="button" class="lb-video__play absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-2" data-lb-yt="' + esc(id) +
      '" aria-label="Load and play YouTube video">' +
      '<span class="lb-video__icon" aria-hidden="true">&#9658;</span>' +
      '<span class="lb-video__label">YouTube</span></button></div>';
  }
  // MREŽA B3c: `.lb-table-wrap` je skrolabilna regija (overflow-x) → WCAG 2.1.1 traži
  // dohvatljivost tipkovnicom (tabindex) + ime (role/aria-label). Isti recept kao
  // `.katex-display` u js/math.js; backlog je ovaj kvar nosio od 2026-08-14 (latentan
  // na 375 px jer tablice danas svugdje stanu — B3a mjerenje — ali okine se prvom širom).
  // ⚠️ `role="group"`, ne `region` iz backloga: region je LANDMARK, a više tablica s istim
  // imenom okida axeov `landmark-unique` (izmjereno na formulama u B3c) — group daje ime
  // bez landmark-šuma. Backlogova skica je bila recept, mjerenje je presudilo detalj.
  function a11yWrapAttrs() {
    const label = typeof window.t === 'function' ? window.t('a11y.table') : 'Table';
    return ' tabindex="0" role="group" aria-label="' + esc(label) + '"';
  }
  function renderTable(b) {
    const rows = Array.isArray(b.rows) ? b.rows : [];
    const header = Array.isArray(b.header) ? b.header : null;
    let html = '<div class="lb-table-wrap my-[1.4em] overflow-x-auto"' + a11yWrapAttrs() + '><table class="lb-table w-full border-collapse">';
    if (header) {
      html += '<thead><tr>' + header.map(function (c) { return '<th>' + renderInline(c) + '</th>'; }).join('') + '</tr></thead>';
    }
    html += '<tbody>' + rows.map(function (row) {
      const cells = Array.isArray(row) ? row : [];
      return '<tr>' + cells.map(function (c) { return '<td>' + renderInline(c) + '</td>'; }).join('') + '</tr>';
    }).join('') + '</tbody></table></div>';
    return html;
  }
  function renderFormula(b) {
    // KaTeX: tex ide kao TEKST u delimiterima (esc → textContent dekodira natrag);
    // renderMath() (js/math.js, auto-render) ga obradi POSLIJE umetanja (poziva ga study/U7c).
    const tex = esc(b.tex);
    if (b.display === false) return '<span class="lb-formula lb-formula--inline overflow-x-auto text-center">\\(' + tex + '\\)</span>';
    return '<div class="lb-formula overflow-x-auto text-center">\\[' + tex + '\\]</div>';
  }
  /**
   * Omota svaku `<table>` u `.lb-table-wrap` — isti spremnik koji `renderTable` (v2) već koristi.
   *
   * ⚠️ POVOD (mjereno 2026-08-14, C3): tablice iz v1 `legacy-html` sadržaja **nisu imale nikakav
   * spremnik sa skrolom**, a tablica se ne stišće ispod svoje min-content širine. Izmjereno u
   * Studiju: platno `469 > 320` — dakle na svakom telefonu užem od ~469px editor se vuče
   * postrance. **Isti put renderira `learn` studentu**, pa je to bio kvar na produkciji za svaku
   * staru lekciju s tablicom, ne samo za editor.
   *
   * ⚠️ ODBAČENA ALTERNATIVA: `.lb-legacy table { display:block; overflow-x:auto }` je jednoredna i
   * radi — ali `display:block` na tablici **uklanja njezinu semantiku** (VoiceOver/Safari prestaju
   * najavljivati retke i stupce). Zamijenili bismo kvar rasporeda kvarom pristupačnosti, a takav
   * se ne vidi na ekranu. Zato omot, ne prekidač prikaza.
   *
   * `RETURN_DOM` NE dodaje krug parsiranja: string-način DOMPurifyja interno radi točno to i na
   * kraju čita `innerHTML`. Radimo isti jedan parse + jedan serialize, pa nema prostora za mXSS
   * koji bi nastao dodatnim ciklusom.
   */
  function wrapLegacyTables(body) {
    const tables = body.querySelectorAll('table');
    for (let i = 0; i < tables.length; i++) {
      const t = tables[i];
      if (t.parentNode && t.parentNode.classList
          && t.parentNode.classList.contains('lb-table-wrap')) continue;   // već omotana
      const wrap = body.ownerDocument.createElement('div');
      wrap.className = 'lb-table-wrap my-[1.4em] overflow-x-auto';
      // B3c: isti a11y recept kao u renderTable — v1 tablice ne smiju biti građanin drugog reda.
      wrap.setAttribute('tabindex', '0');
      wrap.setAttribute('role', 'group');
      wrap.setAttribute('aria-label', typeof window.t === 'function' ? window.t('a11y.table') : 'Table');
      t.parentNode.insertBefore(wrap, t);
      wrap.appendChild(t);
    }
    return body;
  }

  function renderLegacyHtml(b) {
    const html = String(b.html == null ? '' : b.html);
    if (window.DOMPurify && typeof window.DOMPurify.sanitize === 'function') {
      // `RETURN_DOM` traži DOM. Ako ga nema (Node/unit-okruženje) ili ga izvedba ne ispoštuje
      // (starija DOMPurify inačica), NE smijemo pući — blok koji baci iznimku je gori od
      // neomotane tablice. Tad se tiho vraćamo na string-način, tj. na dosadašnje ponašanje.
      const dom = window.DOMPurify.sanitize(html, Object.assign({}, DOMPURIFY_CFG, { RETURN_DOM: true }));
      if (dom && typeof dom.querySelectorAll === 'function' && typeof dom.innerHTML === 'string') {
        return '<div class="lb-legacy">' + wrapLegacyTables(dom).innerHTML + '</div>';
      }
      return '<div class="lb-legacy">' + window.DOMPurify.sanitize(html, DOMPURIFY_CFG) + '</div>';
    }
    // ⚠️ F6 ②/0d (MCP_SECURITY N2): BEZ sanitizatora = TEKST, nikad HTML — i za katalog.
    // Do tada je ovdje stajao „raw za naš povjerljiv v1 sadržaj", ali renderer ne zna odakle blok
    // dolazi, a isti put crta i osobni sadržaj: `iframe srcdoc` sa skriptom s dopuštenog CDN-a je uz
    // produkcijski CSP pročitao sesiju (lokalni pokus, dionica A). DOMPurify se zato poslužuje s naše
    // domene (`js/loader.js`), pa je ovaj put rijedak — ružan, ali siguran.
    return '<div class="lb-legacy lb-legacy--tekst">' + esc(htmlUTekst(html)) + '</div>';
  }

  // Čitljiv tekst iz HTML-a BEZ izvršavanja: `DOMParser` gradi INERTAN dokument (skripte se ne
  // pokreću, slike i okviri se ne učitavaju), pa `textContent` samo čita. Bez `DOMParser`-a (Node)
  // izlazi sirov niz — pozivatelj ga svejedno escapa, pa oznaka nikad ne postane oznaka.
  function htmlUTekst(html) {
    if (typeof DOMParser === 'function') {
      try { return new DOMParser().parseFromString(html, 'text/html').body.textContent || ''; }
      catch (e) { /* pada na escape sirovog niza */ }
    }
    return html;
  }

  const RENDERERS = {
    heading: renderHeading,
    paragraph: renderParagraph,
    list: renderList,
    callout: renderCallout,
    image: renderImage,
    video: renderVideo,
    table: renderTable,
    formula: renderFormula,
    'legacy-html': renderLegacyHtml
  };

  // ── M3a: AKCENT bloka (ugovor: docs/product/UGC_SPEC.md §3) ──
  // Boja ima DVIJE uloge i one žive u različitim prostorima:
  //   • TEKST  → `run.color`, kurirani tokeni (kontrast je kritičan, v. INLINE_COLORS)
  //   • AKCENT → sekcija/blok, slobodni `#rrggbb`, crta se kao rub + tinta niske zasićenosti
  //     → bilo koji hex je čitljiv na bilo kojoj pozadini, pa sloboda ovdje ne košta a11y.
  //
  // NASLJEĐIVANJE JE BESPLATNO: odsutna boja = NE emitiraj ništa, pa blok naslijedi
  // `--lb-acc` (odn. `--st-acc`) od sekcije kroz običan CSS-kaskadni mehanizam.
  // Odsutno znači „naslijedi", ne „bez boje" — zato nema fallback-vrijednosti u JS-u.
  //
  // ⚠ GRANICA: u `style` ide ISKLJUČIVO vrijednost koja je prošla ovaj obrazac. Isti pristup
  // kao kurirana širina slike (U8.5e): validiraj pa emitiraj, inače izostavi. Nikad ne
  // interpoliraj autorov niz u CSS bez provjere — to je jedini put do CSS-injekcije ovdje.
  const HEX6 = /^#[0-9a-fA-F]{6}$/;
  function accentOf(b) {
    const c = (b && typeof b.color === 'string') ? b.color.trim() : '';
    return HEX6.test(c) ? c : '';
  }

  // ── M3b: AKCENT STUDY-STAVKE (kartica / pitanje kviza / dopuna) ──
  // Ista uloga i isti prostor kao akcent bloka, ali DRUGA POVRŠINA: `flashcards.js`,
  // `quiz.js` i `fill-blanks.js` ne grade HTML — pišu `textContent` u fiksni DOM. Nema
  // omota u koji bi se boja umetnula, pa se akcent ne emitira kao niz nego se na spremnik
  // postavi `--item-acc`.
  //
  // ⚠ ZAŠTO OVDJE, A NE U SVAKOM PRIKAZIVAČU: tri kopije regexa su drift koji smo VEĆ
  // platili (shema je znala 4 boje teksta, editor je deployao 8 → prvi autor pete boje bi
  // srušio `validate:schema`). Jedna definicija „što je valjan akcent" = jedno mjesto za
  // popraviti i jedno za testirati.
  //
  // NASLJEĐIVANJE: kandidati idu od najužeg prema najširem (stavka → sekcija), prvi valjan
  // pobjeđuje. Nijedan → svojstvo se UKLANJA, ne postavlja na prazno: kartica bez boje mora
  // očistiti onu prethodnu, inače boja curi na sljedeću stavku istog DOM-a.
  function accentFrom(values) {
    if (!Array.isArray(values)) return '';
    for (let i = 0; i < values.length; i++) {
      const c = (typeof values[i] === 'string') ? values[i].trim() : '';
      if (HEX6.test(c)) return c;
    }
    return '';
  }
  // ── MREŽA C2: TINTA NA PUNOJ ISPUNI — DEFINICIJA JE U `js/utils.js` ──
  // Ovdje je stajala od C2, dok je landing (`navigation.js`) tintu dobivao odavde. Otkad se
  // renderer učitava tek s lekcijom (paket `study` u `js/loader.js`), landing bi zbog jedne
  // čiste funkcije vukao cijeli renderer prije prvog kadra — pa je definicija otišla u
  // `utils.js`, jedinu datoteku koju učitavaju i `index.html` i `editor.html`. Ovo je
  // PREČAC, ne kopija: mijenja se ondje, a `check:contrast` prag i dalje preračunava.
  const inkForTint = (boja) => window.inkForTint(boja);

  function applyAccent(el, values) {
    const acc = accentFrom(values);
    if (el && el.style && typeof el.style.setProperty === 'function') {
      if (acc) el.style.setProperty('--item-acc', acc);
      else el.style.removeProperty('--item-acc');
      // MREŽA C2: uz boju ide i TINTA — puna ispuna (ADR-032 ④) traži izbor čitljivog
      // teksta, isti kao na pločicama predmeta. Bez boje se atribut UKLANJA (isti razlog
      // kao gore: ostatak bi curio na sljedeću stavku istog DOM-a).
      if (typeof el.setAttribute === 'function') {
        if (acc) el.setAttribute('data-ink', inkForTint(acc));
        else el.removeAttribute('data-ink');
      }
    }
    return acc;
  }

  // ── glavni ulaz ──
  function renderBlocks(blocks) {
    if (!Array.isArray(blocks)) return '';
    let html = '';
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      if (!b || typeof b !== 'object') continue;
      const fn = RENDERERS[b.type];
      if (!fn) continue;                                // nepoznat tip → tiho preskoči (fail-safe)
      const body = fn(b);
      if (!body) continue;                              // izostavljen blok ne ostavlja prazan omot
      const acc = accentOf(b);
      html += acc ? '<div class="lb-tint" style="--lb-acc:' + acc + '">' + body + '</div>' : body;
    }
    return html;
  }

  // ── JEDINI ULAZ ZA PRIKAZ SADRŽAJA (BUG-024) ──
  //
  // `renderBlocks` je čist: blok → HTML, bez pojma o tome odakle blok dolazi. Ali slike osobnog
  // materijala u podacima NISU URL nego STABILNA oznaka `node-img:<putanja>` (bucket je privatan,
  // potpis istječe pa ne smije u payload — `js/node-images.js` §ZAŠTO). Oznaka se mora razriješiti
  // PRI PRIKAZU, i ta se pred-obrada do BUG-024 prepisivala kod SVAKOG pozivatelja: studio, admin i
  // block-editor su je radili, `learn.js` ju je jedini zaboravio. Zato se slika vidjela dok se
  // uređuje, a nestajala čim se iz materijala učilo.
  //
  // Popravak nije „dodaj i u learn.js" — to je isti propust koji čeka petog pozivatelja. Ovdje je
  // JEDAN ulaz koji radi oboje, pa odluka nestaje iz programerove glave (ADR-027). Besplatno je za
  // katalog: `resolveBlocks` vraća ISTI niz kad nema što razriješiti, pa se smije zvati uvijek.
  //
  // Sigurnosna granica se NE pomiče: ovdje se ne gradi ni jedan znak HTML-a — `renderBlocks` se
  // samo hrani već razriješenim podacima, kroz iste sanitizacije.
  function renderContentBlocks(blocks) {
    const NI = (typeof window !== 'undefined') ? window.SokratNodeImages : null;
    const resolved = (NI && typeof NI.resolveBlocks === 'function') ? NI.resolveBlocks(blocks) : blocks;
    warnUnresolved(resolved, NI);
    return renderBlocks(resolved);
  }

  // Nerazriješena oznaka je TIHI kvar: `safeUrl` odbije nepoznatu shemu i slika se izostavi bez
  // ijednog traga. Za sigurnost odlično, za primjećivanje pogubno — upravo tako je BUG-024 stigao
  // do korisnika umjesto do gatea. Zato ga ovdje činimo bučnim. Ostaje `warn`, ne `error`: prikaz
  // bez slike i dalje nije razlog da učenje stane (i `smoke` spec pada na console.error).
  function warnUnresolved(blocks, NI) {
    if (!Array.isArray(blocks) || !NI || typeof NI.isMarker !== 'function') return;
    const stuck = [];
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      if (b && b.type === 'image' && NI.isMarker(b.src)) stuck.push(b.src);
    }
    if (stuck.length && typeof console !== 'undefined' && console.warn) {
      console.warn('[blocks] ' + stuck.length + ' slika ostaje nerazriješena i bit će IZOSTAVLJENA — ' +
        'nedostaje `SokratNodeImages.prefetch(payload)` na putu učitavanja:', stuck);
    }
  }

  // ── YouTube klik-za-učitavanje (delegat; jednom). ID je već validiran pri renderu + ovdje. ──
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('click', function (e) {
      const btn = e.target.closest ? e.target.closest('[data-lb-yt]') : null;
      if (!btn) return;
      const id = btn.getAttribute('data-lb-yt') || '';
      if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;
      const wrap = btn.closest('.lb-video');
      if (!wrap) return;
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = 'YouTube video';
      iframe.className = 'lb-video__frame h-full w-full border-0';
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('loading', 'lazy');
      wrap.innerHTML = '';
      wrap.appendChild(iframe);
    });
  }

  // ── izvoz (+ interni helperi za unit-testove) ──
  if (typeof window !== 'undefined') {
    window.renderBlocks = renderBlocks;
    window.renderContentBlocks = renderContentBlocks;   // BUG-024: JEDINI ulaz za prikaz sadržaja
    window.SokratBlocks = {
      render: renderBlocks,
      renderContent: renderContentBlocks,
      esc: esc,                   // BUG-025: JEDNA definicija escapea za sve koji pišu u innerHTML
      safeUrl: safeUrl,           // BUG-025: ista provjera sheme i izvan rendera (learn.image)
      safeIcon: safeIcon,         // BUG-025: ikona ide u `class` → PROVJERA oblika, ne escape
      accentFrom: accentFrom,     // M3b: jedna definicija valjanog akcenta za sve study-modove
      applyAccent: applyAccent,
      inkForTint: inkForTint,     // C2: jedan izbor tinte za pločice (navigation) i study-kartice
      _esc: esc,
      _safeUrl: safeUrl,
      _youtubeId: youtubeId,
      _renderInline: renderInline,
      _domPurifyConfig: DOMPURIFY_CFG   // za legacy-html-coverage.test.js (parity gate)
    };
  }
})();
