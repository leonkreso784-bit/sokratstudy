// ===== SOKRAT STUDY — stranica odobrenja za korisnikov AI (`odobrenje.html`, F6 ①/1) =====
//
// Supabase OAuth 2.1 poslužitelj šalje korisnika ovamo s `?authorization_id=…` kad njegov AI
// (Claude, ChatGPT) traži pristup. Stranica pokaže TKO traži i KAMO se vraća, i tek na gumb
// „Dopusti" javi odobrenje.
//
// ─── ZAŠTO POPIS HOSTOVA (ADR-038 ③) ────────────────────────────────────────────────────────────
// DCR je uključen: bilo tko može registrirati klijenta imena „Sokrat" s povratkom na svoju
// stranicu i poslati korisniku poveznicu. Odobrenje traži korisnikovu sesiju s NAŠEG origina, pa
// se ova stranica ne može zaobići — zato ovdje odbijamo svaki povratak koji nije poznati AI.
// `approve/denyAuthorization` u supabase-js SAMI preusmjere preglednik; uvijek šaljemo
// `skipBrowserRedirect` i preusmjeravamo tek poslije vlastite provjere.
//
// ⚠️ ADRESA, KLJUČ I SDK SU KOPIJA `SOKRAT_AUTH_CONFIG` iz `js/auth.js`. `auth.js` se ovdje ne
//    učitava: ubacuje prozor za prijavu (`<sokrat-modal>`) kojem na ovoj stranici nema ni komponente
//    ni stilova. `tests/unit/odobrenje.test.js` tvrdi da su kopije iste. Isti test-šav kao auth.js:
//    `localStorage['sokrat-supabase-override']` usmjeri na staging.

(function (window) {
  'use strict';

  const PROD_URL = 'https://naxjubnedhrbhsuasayu.supabase.co';
  const PROD_KEY = 'sb_publishable_KatBQDLB8GRohKEyb3eDSQ_ToXJuL7L';
  const SDK_SRC = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.110.8/dist/umd/supabase.js';
  const SDK_SRI = 'sha384-M65KxMm/JqBppck6onbmAgPVMBHrmPCf1L17Q+71EcvI9/VVI8j5cqoxQf6lj6h2';

  // Poznati AI-jevi (točan host, bez poddomena). Novi AI = novi unos + test.
  const DOPUSTENI_HOSTOVI = ['claude.ai', 'chatgpt.com'];

  const doc = window.document;

  /** Lokalni poslužitelj (pokus), a ne prava adresa. */
  function lokalniOrigin() {
    const h = window.location.hostname;
    return h === 'localhost' || h === '127.0.0.1' || h === '::1' || h === '[::1]';
  }

  /**
   * Koji projekt gledamo. Na PRAVOJ adresi je produkcija ispravan odgovor; na `localhost`-u NIJE.
   *
   * ⚠️ Izmjereno 18.09. u ručnom pokusu ①/1: prebacivanje na staging je usred pokusa nestalo iz
   *    preglednika, pa je ova stranica tiho otišla na produkciju — ondje OAuth poslužitelj nije
   *    uključen i korisnikove sesije nema, pa je stranica rekla „prijavi se prvo". Prijava je
   *    zatim otišla na PRODUKCIJU, a povezivanje je ostalo nedovršeno (`connect_incomplete`).
   *    Tihi povratak na produkciju s lokalne adrese je dakle ishod koji ne može uspjeti, a
   *    izgleda kao tuđa greška → vraćamo `null` i stranica to kaže naglas.
   */
  function projekt() {
    try {
      const raw = window.localStorage.getItem('sokrat-supabase-override');
      const o = raw ? JSON.parse(raw) : null;
      if (o && typeof o.url === 'string' && /^https:\/\/[a-z0-9]+\.supabase\.co$/.test(o.url)
          && typeof o.publishableKey === 'string' && o.publishableKey) {
        return { url: o.url, key: o.publishableKey };
      }
    } catch (e) { /* bez prebacivanja → odluka ispod */ }
    if (lokalniOrigin()) return null;
    return { url: PROD_URL, key: PROD_KEY };
  }

  /** Host povratne adrese ako je https i na popisu, inače null. */
  function dopustenHost(adresa) {
    try {
      const u = new URL(adresa);
      if (u.protocol !== 'https:') return null;
      return DOPUSTENI_HOSTOVI.indexOf(u.hostname) !== -1 ? u.hostname : null;
    } catch (e) { return null; }
  }

  function hostOd(adresa) {
    try { return new URL(adresa).hostname; } catch (e) { return String(adresa || ''); }
  }

  /** Ključ pod kojim supabase-js drži sesiju; mijenja ga DRUGI prozor, ne ovaj. */
  function kljucSesije(url) {
    const ref = (String(url).match(/https:\/\/([a-z0-9]+)\.supabase\.co/) || [])[1] || '';
    return 'sb-' + ref + '-auth-token';
  }

  function tr(key, fb) {
    if (typeof window.t !== 'function') return fb;
    const v = window.t(key);
    return v === key ? fb : v;
  }

  function status(tekst, stanje) {
    const s = doc.getElementById('oauthStatus');
    if (!s) return;
    s.textContent = tekst;
    s.setAttribute('data-state', stanje || '');
  }

  function el(id) { return doc.getElementById(id); }

  function ucitajSdk() {
    return new Promise(function (resolve, reject) {
      if (window.supabase && typeof window.supabase.createClient === 'function') { resolve(); return; }
      const s = doc.createElement('script');
      s.src = SDK_SRC;
      s.integrity = SDK_SRI;
      s.crossOrigin = 'anonymous';
      s.async = true;
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error('sdk')); };
      doc.head.appendChild(s);
    });
  }

  /**
   * Bez prijave detalji NE POSTOJE: `GET /oauth/authorizations/<id>` vrati 401 (izmjereno
   * 20.09. na stagingu). Prijava zato mora biti prva — ali se otvara u DRUGOM prozoru, jer
   * `authorization_id` živi u adresi OVE stranice i odlazak s nje znači novo povezivanje iz
   * AI aplikacije. Nedovršeno povezivanje taj obilazak preživi: izmjereno je da je i nakon
   * 3 minute još „pending" i da odobrenje tada prolazi (HTTP 200).
   *
   * Prijavu vidimo preko `storage` — događaja koji preglednik šalje SAMO drugim prozorima
   * istog origina, dakle točno ovom kad se sesija upiše u onom drugom. `visibilitychange`
   * je druga mreža (povratak na karticu kad događaj izostane, npr. u privatnom načinu).
   */
  function cekajPrijavu(klijent, projektUrl) {
    return new Promise(function (resolve) {
      status(tr('oauth.signin', 'Sign in to Sokrat Study — we will open sign-in in a second window. Leave this page open; it continues on its own.'), 'error');
      const omot = el('oauthSignin');
      omot.hidden = false;

      let prozor = null;
      let gotovo = false;

      async function provjeri() {
        if (gotovo) return;
        const s = (await klijent.auth.getSession()).data.session;
        if (!s || gotovo) return;
        gotovo = true;
        window.removeEventListener('storage', naStorage);
        doc.removeEventListener('visibilitychange', naVidljivost);
        try { if (prozor && !prozor.closed) prozor.close(); } catch (e) { /* zatvorio ga korisnik */ }
        omot.hidden = true;
        status('', '');
        resolve(s);
      }

      function naStorage(e) { if (!e.key || e.key === kljucSesije(projektUrl)) provjeri(); }
      function naVidljivost() { if (!doc.hidden) provjeri(); }

      window.addEventListener('storage', naStorage);
      doc.addEventListener('visibilitychange', naVidljivost);

      el('oauthSigninBtn').addEventListener('click', function () {
        prozor = window.open('/', 'sokrat-prijava');
        status(prozor
          ? tr('oauth.signinWaiting', 'Waiting for you to sign in in the other window — come back here when you are done.')
          : tr('oauth.signinBlocked', 'Your browser blocked the new window. Open Sokrat Study in another tab, sign in there, then come back to this page.'),
        prozor ? '' : 'error');
      });
    });
  }

  async function init() {
    doc.title = tr('oauth.pageTitle', 'Connect your AI — Sokrat Study');

    const id = new URLSearchParams(window.location.search).get('authorization_id') || '';
    if (!id) {
      status(tr('oauth.missing', 'This link is incomplete — start connecting again from your AI app.'), 'error');
      return;
    }

    const p = projekt();
    if (!p) {
      status(tr('oauth.noProject',
        'This page is running on localhost with no project selected, so it cannot connect anything. Set the staging override in this browser and reload.'), 'error');
      return;
    }

    let klijent;
    try {
      await ucitajSdk();
      klijent = window.supabase.createClient(p.url, p.key);
    } catch (e) {
      status(tr('oauth.error', 'That did not work — please try again.'), 'error');
      return;
    }

    let sesija = (await klijent.auth.getSession()).data.session;
    if (!sesija) sesija = await cekajPrijavu(klijent, p.url);

    const odgovor = await klijent.auth.oauth.getAuthorizationDetails(id);
    const d = odgovor.data;
    if (odgovor.error || !d) {
      status(tr('oauth.error', 'That did not work — please try again.'), 'error');
      return;
    }

    // Već odobreno ranije → poslužitelj odmah vraća kamo ići. I tada vrijedi popis hostova.
    if (!d.authorization_id && d.redirect_url) {
      if (dopustenHost(d.redirect_url)) window.location.assign(d.redirect_url);
      else status(tr('oauth.blocked', 'This app is not one we recognise, so it cannot be connected.'), 'error');
      return;
    }

    el('oauthClient').textContent = (d.client && d.client.name) || '—';
    el('oauthHost').textContent = hostOd(d.redirect_uri);
    el('oauthAccount').textContent = (d.user && d.user.email) || (sesija.user && sesija.user.email) || '—';
    el('oauthDetails').hidden = false;

    // „Nisi ti?" (K/9, 16.10.): u pregledniku zna biti prijavljen drugi račun (izmjereno: AI je dvaput
    // spojen na krivi). Odjava SAMO ovdje (`local` — druge sesije i AI veze ostaju).
    // ⚠️ OVO povezivanje se NE MOŽE nastaviti drugim računom: poslužitelj ga veže za prvi račun koji otvori
    //    detalje — drugi dobiva `404 oauth_authorization_not_found` (izmjereno na stagingu 16.10., oba
    //    smjera). Zato: odjava → prijava pravim računom (drugi prozor) → povezivanje ispočetka iz AI aplikacije.
    el('oauthSwitch').addEventListener('click', async function () {
      this.disabled = true;
      await klijent.auth.signOut({ scope: 'local' });
      el('oauthDetails').hidden = true;
      el('oauthActions').hidden = true;
      el('oauthSignin').hidden = false;
      status(tr('oauth.switched', 'Signed out. Sign in with the right account, then start connecting again in your AI app — this request belonged to the other account.'), 'error');
      el('oauthSigninBtn').addEventListener('click', function () { window.open('/', 'sokrat-prijava'); });
    });

    if (!dopustenHost(d.redirect_uri)) {
      status(tr('oauth.blocked', 'This app is not one we recognise, so it cannot be connected.'), 'error');
      return;
    }

    el('oauthActions').hidden = false;
    const gumbi = [el('oauthAllow'), el('oauthDeny')];

    async function odluci(dopusti) {
      gumbi.forEach(function (g) { g.disabled = true; });
      status('', '');
      const fn = dopusti ? klijent.auth.oauth.approveAuthorization : klijent.auth.oauth.denyAuthorization;
      const r = await fn.call(klijent.auth.oauth, id, { skipBrowserRedirect: true });
      const kamo = r && r.data && r.data.redirect_url;
      if (r.error || !kamo || !dopustenHost(kamo)) {
        gumbi.forEach(function (g) { g.disabled = false; });
        status(tr('oauth.error', 'That did not work — please try again.'), 'error');
        return;
      }
      status(dopusti ? tr('oauth.done', 'Connected — returning to your AI app…') : tr('oauth.denied', 'Not connected — returning to your AI app…'), 'done');
      window.location.assign(kamo);
    }

    el('oauthAllow').addEventListener('click', function () { odluci(true); });
    el('oauthDeny').addEventListener('click', function () { odluci(false); });
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
  else init();
})(window);
