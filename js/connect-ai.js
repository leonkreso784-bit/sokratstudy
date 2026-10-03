// ===== SOKRAT STUDY — „Spoji svoj AI" (F6 ②/5.1, ADR-026 ①, anketa 03.10.) =====
//
// JEDNA radnja, DVA ulaza (ADR-026): inspektor Studija i stranica „Moji materijali". Oba zovu
// `SokratConnectAi.ugradi(el)`; ništa od ovoga ne živi u njima, da se ne izgradi dvaput.
//
// ─── TIJEK (ADR-026 ①) ──────────────────────────────────────────────────────────────────────────
// Nijedan AI „ne zna" za nas dok ga korisnik jednom ne doda kod sebe. Zato: bez povezanog AI-ja gumb
// otvara prozor s uputama (Claude · ChatGPT) i adresom za kopiranje; s povezanim AI-jem gumb je PREČAC
// koji otvara taj AI, a upute ostaju iza „Spoji drugi AI".
//
// ─── ZAŠTO BEZ DUBINSKE POVEZNICE ───────────────────────────────────────────────────────────────
// Istraženo 03.10.: ni Claude ni ChatGPT nemaju poveznicu koja sama upiše adresu konektora — vodimo
// do prave stranice, a adresa se kopira (ADR-026: zajamčen put je kopiranje). Gemini prima vlastite
// konektore samo u SAD-u, za punoljetne, na engleskom → ne nudi se (plan ②/5).
//
// ─── OGRADA DO ⑥ ────────────────────────────────────────────────────────────────────────────────
// Konektor danas postoji samo na STAGINGU. Na produkciji bi gumb vodio na adresu koja ne radi, pa je
// `adresaKonektora()` ondje `null` → gumb onemogućen (Studio) ili ga nema (Moji materijali). U ⑥ se
// `PRODUKCIJA` postavi na kanonsku adresu (ADR-038 ②) i ograda nestaje.
//
// ─── SIGURNOST ──────────────────────────────────────────────────────────────────────────────────
// Ime povezane aplikacije dolazi iz DCR-a (registrirati ga može bilo tko, ADR-038 ③): služi SAMO za
// prepoznavanje, nikad ne ide u markup, a poveznice prečaca su naše konstante.

(function (window) {
  'use strict';

  /** Kanonska adresa na produkciji — postavlja se TEK u ⑥ (vidi zaglavlje). */
  const PRODUKCIJA = null;
  /** Put funkcije na Supabase projektu (staging): `<projekt>/functions/v1/mcp`. */
  const PUT_FUNKCIJE = '/functions/v1/mcp';

  /** Aplikacije za koje dajemo upute (plan ②/5 ①). `otvori` = stranica s konektorima, `chat` = prečac. */
  const APLIKACIJE = [
    { id: 'claude', ime: 'Claude', prepoznaj: /claude|anthropic/i,
      otvori: 'https://claude.ai/customize/connectors', chat: 'https://claude.ai/new',
      koraci: ['connectAi.claude1', 'connectAi.claude2', 'connectAi.claude3', 'connectAi.claude4'],
      napomena: 'connectAi.claudeNote' },
    { id: 'chatgpt', ime: 'ChatGPT', prepoznaj: /chatgpt|openai/i,
      otvori: 'https://chatgpt.com/', chat: 'https://chatgpt.com/',
      koraci: ['connectAi.gpt1', 'connectAi.gpt2', 'connectAi.gpt3', 'connectAi.gpt4'],
      napomena: 'connectAi.gptNote' }
  ];

  function tt(key, fb) {
    if (!window.t) return fb;
    const v = window.t(key);
    return (v === key) ? fb : v;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /**
   * Adresa konektora za ovu stranicu, ili `null` kad konektor ovdje ne radi.
   * `override` = ispitni šav iz `js/auth.js` (`sokrat-supabase-override`): stranica govori sa
   * stagingom → konektor je funkcija na tom projektu. Bez njega = produkcija → `PRODUKCIJA`.
   * @param {{url?: string}|null} override
   * @returns {string|null}
   */
  function adresaKonektora(override) {
    if (override && typeof override.url === 'string') {
      try {
        const u = new URL(override.url);
        if (u.protocol === 'https:') return u.origin + PUT_FUNKCIJE;
      } catch (e) { /* nije adresa → kao da overridea nema */ }
      return null;
    }
    return PRODUKCIJA;
  }
  function trenutniOverride() {
    return (typeof _readSupabaseOverride === 'function') ? _readSupabaseOverride() : null;
  }
  function adresa() { return adresaKonektora(trenutniOverride()); }

  /**
   * Koje od naših aplikacija je korisnik već povezao (po imenu iz DCR-a), redom popisa.
   * @param {Array<{client?: {name?: string}}>} veze
   * @returns {string[]} id-evi aplikacija
   */
  function povezane(veze) {
    const imena = (Array.isArray(veze) ? veze : []).map(function (g) { return String((g && g.client && g.client.name) || ''); });
    return APLIKACIJE.filter(function (a) { return imena.some(function (n) { return a.prepoznaj.test(n); }); }).map(function (a) { return a.id; });
  }

  /** Povezane aplikacije prijavljenog korisnika; `[]` kad se ne da pročitati (gumb tada nudi upute).
   *  Pamti se 60 s: „Moji materijali" crtaju traku pri svakoj izmjeni, a popis se rijetko mijenja. */
  let _povezane = null;
  function ucitajPovezane() {
    if (!_povezane || Date.now() - _povezane.kada > 60000) _povezane = { kada: Date.now(), p: dohvatiPovezane() };
    return _povezane.p;
  }
  async function dohvatiPovezane() {
    try {
      const c = (typeof SokratAuth !== 'undefined' && SokratAuth.getClient) ? SokratAuth.getClient() : null;
      const oauth = c && c.auth && c.auth.oauth;
      if (!oauth || typeof oauth.listGrants !== 'function') return [];
      const r = await oauth.listGrants();
      if (!r || r.error) return [];
      const d = r.data;
      return povezane(Array.isArray(d) ? d : (d && Array.isArray(d.grants) ? d.grants : []));
    } catch (e) { return []; }
  }

  // ── prozor ────────────────────────────────────────────────────────────────────────────────
  let _app = 'claude';

  function ensureModal() {
    let m = document.getElementById('caiModal');
    if (m) return m;
    m = document.createElement('sokrat-modal');
    m.id = 'caiModal';
    m.className = 'cai';
    m.setAttribute('aria-labelledby', 'caiTitle');
    document.body.appendChild(m);
    m.addEventListener('click', function (e) {
      const tab = e.target.closest('[data-cai-app]');
      if (tab) { _app = tab.getAttribute('data-cai-app'); crtaj(m); return; }
      if (e.target.closest('[data-cai-copy]')) { kopiraj(m); return; }
      if (e.target.closest('[data-cai-close]')) m.close();
    });
    return m;
  }

  /**
   * ②/5.2 — animirani tutorial za Claude (Leon, anketa 03.10.): pojednostavljena SHEMA njihovog
   * ekrana, bez njihovog znaka, u četiri scene koje prate četiri koraka ispod (korak koji se upravo
   * pokazuje svijetli). Nazivi u shemi su Claudeovi (korisnik ih tako vidi), zadnja scena je NAŠA
   * stranica za odobrenje s istim riječima (`oauth.*`). Ukras je → `aria-hidden`; sve što kaže stoji i
   * u koracima. Kretanje živi u css/connect-ai.css; uz `prefers-reduced-motion` animacije nema, koraci ostaju.
   */
  function animacijaHtml(url) {
    const kursor = '<span class="cai-anim__cur"></span>';
    return '<div class="cai-anim" aria-hidden="true">' +
      '<div class="cai-anim__win"><div class="cai-anim__bar"><i></i><i></i><i></i></div>' +
      '<div class="cai-anim__stage">' +
      // 1 · Customize → Connectors
      '<div class="cai-anim__s cai-anim__s1"><div class="cai-anim__side">' +
      '<span>' + esc(tt('connectAi.animChats', 'Chats')) + '</span><span>' + esc(tt('connectAi.animProjects', 'Projects')) + '</span>' +
      '<span class="cai-anim__hit">' + esc(tt('connectAi.animCustomize', 'Customize')) + kursor + '</span></div>' +
      '<div class="cai-anim__ghost"><i></i><i></i><i></i></div></div>' +
      // 2 · Add custom connector
      '<div class="cai-anim__s cai-anim__s2"><p class="cai-anim__h">' + esc(tt('connectAi.animConnectors', 'Connectors')) + '</p>' +
      '<div class="cai-anim__ghost"><i></i><i></i></div>' +
      '<span class="cai-anim__btn cai-anim__hit">+ ' + esc(tt('connectAi.animAdd', 'Add custom connector')) + kursor + '</span></div>' +
      // 3 · zalijepi adresu → Add
      '<div class="cai-anim__s cai-anim__s3"><div class="cai-anim__dlg">' +
      '<p class="cai-anim__lbl">' + esc(tt('connectAi.animUrl', 'Remote MCP server URL')) + '</p>' +
      '<p class="cai-anim__field"><span>' + esc(url) + '</span></p>' +
      '<span class="cai-anim__btn cai-anim__hit">' + esc(tt('connectAi.animAddBtn', 'Add')) + kursor + '</span></div></div>' +
      // 4 · Connect → naša stranica za odobrenje → Dopusti
      '<div class="cai-anim__s cai-anim__s4"><div class="cai-anim__dlg cai-anim__ok">' +
      '<p class="cai-anim__h">' + esc(tt('oauth.title', 'Connect your AI to Sokrat Study')) + '</p>' +
      '<div class="cai-anim__row"><span class="cai-anim__btn cai-anim__btn--ghost">' + esc(tt('oauth.deny', 'Deny')) + '</span>' +
      '<span class="cai-anim__btn cai-anim__hit">' + esc(tt('oauth.allow', 'Allow')) + kursor + '</span></div>' +
      '<p class="cai-anim__done"><i class="fas fa-check" aria-hidden="true"></i> ' + esc(tt('connectAi.animDone', 'Connected')) + '</p>' +
      '</div></div>' +
      '</div></div></div>';
  }

  /** Tekst se upisuje pri SVAKOM otvaranju (jezik se smije promijeniti između dva otvaranja). */
  function crtaj(m) {
    const url = adresa() || '';
    const a = APLIKACIJE.find(function (x) { return x.id === _app; }) || APLIKACIJE[0];
    m.innerHTML =
      '<div class="cai__card">' +
      '  <h3 class="cai__title" id="caiTitle">' + esc(tt('connectAi.title', 'Connect your AI')) + '</h3>' +
      '  <p class="cai__lead">' + esc(tt('connectAi.lead', 'Add Sokrat to the AI you already use, once. Then ask it to build a study material from your notes — it lands on your shelf.')) + '</p>' +
      '  <div class="cai__tabs" role="tablist">' +
      APLIKACIJE.map(function (x) {
        const on = x.id === a.id;
        return '<button type="button" role="tab" class="cai__tab" data-cai-app="' + x.id + '" aria-selected="' + on + '"' +
          (on ? '' : ' tabindex="-1"') + '>' + esc(x.ime) + '</button>';
      }).join('') +
      '  </div>' +
      (a.id === 'claude' ? animacijaHtml(url) : '') +
      '  <ol class="cai__steps' + (a.id === 'claude' ? ' cai__steps--anim' : '') + '" role="tabpanel">' +
      a.koraci.map(function (k) { return '<li>' + esc(tt(k, k)) + '</li>'; }).join('') +
      '  </ol>' +
      '  <div class="cai__url">' +
      '    <code class="cai__addr" data-cai-addr>' + esc(url) + '</code>' +
      '    <button type="button" class="cta-button secondary cai__copy" data-cai-copy>' +
      '<i class="fas fa-copy" aria-hidden="true"></i><span>' + esc(tt('connectAi.copy', 'Copy address')) + '</span></button>' +
      '  </div>' +
      '  <p class="cai__note">' + esc(tt(a.napomena, '')) + '</p>' +
      '  <div class="cai__actions">' +
      '    <a class="cta-button primary cai__open" href="' + esc(a.otvori) + '" target="_blank" rel="noopener noreferrer">' +
      '<span>' + esc(tt('connectAi.open', 'Open') + ' ' + a.ime) + '</span><i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>' +
      '    <button type="button" class="cta-button secondary" data-cai-close><span>' + esc(tt('connectAi.close', 'Close')) + '</span></button>' +
      '  </div>' +
      '</div>';
  }

  async function kopiraj(m) {
    const url = adresa();
    if (!url) return;
    let ok = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) { await navigator.clipboard.writeText(url); ok = true; }
    } catch (e) { ok = false; }
    if (!ok) {
      // Bez dozvole za međuspremnik: označi adresu, korisnik je kopira sam.
      const el = m.querySelector('[data-cai-addr]');
      const sel = window.getSelection && window.getSelection();
      if (el && sel && document.createRange) { const r = document.createRange(); r.selectNodeContents(el); sel.removeAllRanges(); sel.addRange(r); }
    }
    if (typeof showToast === 'function') {
      showToast(ok ? tt('connectAi.copied', 'Address copied.') : tt('connectAi.copyManual', 'Copy the selected address.'));
    }
  }

  function otvori(app) {
    if (!adresa()) return;
    if (app) _app = app;
    const m = ensureModal();
    crtaj(m);
    m.open();
  }

  // ── ulaz ──────────────────────────────────────────────────────────────────────────────────
  /**
   * Nacrtaj ulaz u `el`. Bez konektora (produkcija do ⑥): `opcije.bezKonektora` = 'onemoguci'
   * (Studio: gumb stoji, onemogućen) ili 'sakrij' (Moji materijali: ništa).
   * @param {HTMLElement} el
   * @param {{bezKonektora?: 'onemoguci'|'sakrij'}} [opcije]
   */
  function ugradi(el, opcije) {
    if (!el) return;
    const o = opcije || {};
    const tekst = tt('connectAi.button', 'Connect your AI');
    if (!adresa()) {
      el.innerHTML = o.bezKonektora === 'onemoguci'
        ? '<button type="button" class="cta-button primary cai-entry" disabled>' + esc(tekst) + '</button>'
        : '';
      el.hidden = o.bezKonektora !== 'onemoguci';
      return;
    }
    el.hidden = false;
    el.innerHTML = '<button type="button" class="cta-button primary cai-entry" data-cai-entry>' +
      '<i class="fas fa-wand-magic-sparkles" aria-hidden="true"></i><span>' + esc(tekst) + '</span></button>';
    el.onclick = function (e) {
      if (e.target.closest('[data-cai-entry]')) otvori();
      const drugi = e.target.closest('[data-cai-other]');
      if (drugi) otvori(drugi.getAttribute('data-cai-other'));
    };
    // Prečac (ADR-026 ①): povezan AI → gumb ga otvara; upute (za prvu NEpovezanu) iza „Spoji drugi AI".
    ucitajPovezane().then(function (ids) {
      if (!ids.length || !el.isConnected) return;
      const a = APLIKACIJE.find(function (x) { return x.id === ids[0]; });
      const drugi = APLIKACIJE.find(function (x) { return ids.indexOf(x.id) < 0; }) || a;
      el.innerHTML =
        '<a class="cta-button primary cai-entry" href="' + esc(a.chat) + '" target="_blank" rel="noopener noreferrer">' +
        '<span>' + esc(tt('connectAi.open', 'Open') + ' ' + a.ime) + '</span><i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>' +
        '<button type="button" class="cai-other" data-cai-other="' + esc(drugi.id) + '">' + esc(tt('connectAi.other', 'Connect another AI')) + '</button>';
    });
  }

  window.SokratConnectAi = {
    ugradi: ugradi,
    otvori: otvori,
    dostupno: function () { return !!adresa(); },
    // čisti dijelovi za unit (tests/unit/connect-ai.test.js)
    _adresaKonektora: adresaKonektora,
    _povezane: povezane,
    _APLIKACIJE: APLIKACIJE
  };
})(window);
