/* =====================================================================
 * sw.js — Sokrat Study Service Worker (F3 3A). Konzervativan, offline-sposoban app-shell.
 *
 * STRATEGIJA (sigurnost prvo — SW može „zaglaviti" stranicu na stari keš):
 *  • Samo SAME-ORIGIN GET se presreće. Sve ostalo (Supabase auth/sadržaj, CDN fontovi/KaTeX,
 *    POST/PUT) → čista mreža (SW se NE miješa) → login/sync nikad iz keša.
 *  • Navigacija (index.html) = NETWORK-FIRST → fallback na keš (offline shell). Novi deploy s
 *    novim `?v=` tokenima se UVIJEK pokupi (index.html se ne servira immutable).
 *  • Statički asseti (js/css/json/slike; verzionirani `?v=` = immutable URL) = STALE-WHILE-REVALIDATE
 *    (posluži keš odmah, osvježi u pozadini) → brzo + samo-liječivo.
 *  • P3: SKINUT PREDMET (keš `sokrat-offline`, P1) ima prednost, i to DVORAZINSKI —
 *    točan `?v=` → cache-first bez mreže; drugi `?v=` (poslije deploya) → network-first
 *    pa pad na staru kopiju. Bez druge razine skinut predmet postane NEVIDLJIV prvim
 *    deployom, jer stranica traži adresu koje u kešu nema. V. `odgovoriNaAsset` niže.
 *  • NE `skipWaiting` — novi SW aktivira se tek kad se stare stranice zatvore (bez mismatcha
 *    novi-asset/stari-JS usred sesije). `activate` čisti stare cache-verzije.
 *  • `SW_VERSION` bumpa `npm run bump` (jedan broj za cijelu app) → svaki deploy = nova sw.js =
 *    novi cache = purge starog. Registrira se s `updateViaCache:'none'` (zaobilazi HTTP cache).
 *  • Kill-switch: `postMessage('sw:unregister')` → SW se sam odjavi + očisti kešove.
 * ===================================================================== */
'use strict';

const SW_VERSION = '20261015181831'; // bumpan `npm run bump` (usklađen s ?v= i CONTENT_VERSION)
const CACHE = 'sokrat-cache-' + SW_VERSION;

// ⚠️ NIJE verzioniran, i to je cijela poanta: brisač u `activate` gađa prefiks
// `sokrat-cache-`, pa ovaj keš preživi deploy SAM PO SEBI. Ime mora ostati identično
// onome u `js/offline-store.js` (ondje je i obrazloženje). Mijenjati ga ovdje sam znači
// obrisati svima sve skinuto.
const OFFLINE = 'sokrat-offline';

// Minimalni precache: navigacijski shell. Ostalo se kešira runtime-om po verzioniranom URL-u
// (robusnije od hardkodirane liste — ne mora se održavati u koraku s tokenima).
// CSS bundle MORA nositi `?v=` ključ: HTML ga traži kao `styles.bundle.css?v=TOKEN`, a cache-match
// NE ignorira query → bez tokena bi precache unos bio mrtav (nikad pogođen). ADR-017 jamči da je
// SW_VERSION identičan tokenu u HTML-u (`npm run bump` postavlja oba; `bump:check` = CI gate).
// manifest.json se u HTML-u referencira BEZ tokena → ostaje neverzioniran.
// ⚠️ T6: `editor.html` NAMJERNO NIJE OVDJE, i to nije previd nego cijela poanta cigle.
// Offline ljuska je ono što student nosi sa sobom; editor je 244 KiB alata koji offline
// ionako ne radi (traži Supabase). Precachirati ga značilo bi vratiti ga na put svakome
// tko aplikaciju samo otvori — dakle poništiti T6 kroz druga vrata. Stranica editora se
// kešira tek ako je netko POSJETI (navigacija se sprema na uspješan odgovor niže).
// ⚠️ Ovo je i preduvjet faze POLICA: ondje se u ljusku dodaje SADRŽAJ, ne alat.
const PRECACHE = ['/', '/index.html', '/styles.bundle.css?v=' + SW_VERSION, '/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(PRECACHE.map((u) => new Request(u, { cache: 'reload' }))))
      .catch(() => { /* precache je best-effort; ne ruši instalaciju */ })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith('sokrat-cache-') && k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  const msg = event.data;
  if (msg === 'sw:skipWaiting') {
    self.skipWaiting();
  } else if (msg === 'sw:unregister') {
    // Kill-switch: očisti sve kešove pa se odjavi (stranica se vrati na čistu mrežu nakon reloada).
    event.waitUntil(
      caches.keys()
        .then((keys) => Promise.all(keys.filter((k) => k.startsWith('sokrat-cache-')).map((k) => caches.delete(k))))
        .then(() => self.registration.unregister())
    );
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  let url;
  try { url = new URL(req.url); } catch (e) { return; }

  // Samo same-origin GET. Sve ostalo (Supabase/CDN/non-GET) → mreža, SW se ne miješa.
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  // Navigacija → network-first (novi deploy uvijek svjež), fallback na keširani shell (offline).
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          // Keširaj SAMO uspješan odgovor — 404/500 ne smije pregaziti dobar offline shell.
          if (res && res.ok) {
            // ⚠️ Klon ODMAH, sinkrono — v. `spremi()` (BUG-045): unutar `.then(caches.open)` je
            // stranica već potrošila tijelo i `clone()` baca „body is already used".
            const kopija = res.clone();
            // waitUntil: preglednik ne smije ugasiti SW prije nego upis u keš završi.
            event.waitUntil(caches.open(CACHE).then((c) => c.put(req, kopija)).catch(() => {}));
          }
          return res;
        })
        .catch(() => caches.match(req).then((m) => m || caches.match('/index.html')))
    );
    return;
  }

  // Statički asset. Prvo se pita polica (P3), pa tek onda opći put.
  event.respondWith(odgovoriNaAsset(event, req));
});

/** Upis u tekući keš — samo uspješan, same-origin odgovor.
 *
 *  ⚠️ BUG-045 (2026-09-06): `res.clone()` MORA biti sinkron, PRIJE `caches.open()`. Do
 *  popravka je stajao unutar `.then((c) => c.put(req, res.clone()))` — a dok `caches.open`
 *  čeka, `respondWith` je odgovor već predao stranici i ona mu je potrošila tijelo, pa je
 *  `clone()` bacao `TypeError: Response body is already used`. Taj je pad gutao `.catch(() => {})`,
 *  pa SW od F3 3A **nikad nije spremio nijedan runtime asset** — ni skriptu, ni sliku, ni
 *  gradivo koje nije na polici; u kešu je stajao samo precache s instalacije. Offline je
 *  „radio" samo dok je HTTP-keš preglednika imao datoteke, a iOS ga izbacuje — zato se skinut
 *  predmet na iPhoneu otvarao PRAZAN iako su datoteke gradiva bile na polici: paket načina
 *  učenja (`js/flashcards.js`…) nije imao odakle doći. Izmjereno presretanjem u živom SW-u
 *  (`bodyUsed=true` u trenutku klona); brana: `tests/sw.spec.js` (runtime keš stvarno puni). */
function spremi(event, req, res) {
  if (res && res.status === 200 && res.type === 'basic') {
    const kopija = res.clone();
    event.waitUntil(caches.open(CACHE).then((c) => c.put(req, kopija)).catch(() => {}));
  }
  return res;
}

/** Zatečeni opći put: posluži keš odmah, osvježi u pozadini. */
function staleWhileRevalidate(event, req) {
  return caches.match(req).then((cached) => {
    const network = fetch(req)
      .then((res) => spremi(event, req, res))
      .catch(() => cached);
    // Drži SW živim dok revalidacija (i upis u keš) ne završi — i kad je odgovor već otišao iz keša.
    event.waitUntil(network.then(() => {}, () => {}));
    return cached || network;
  });
}

/**
 * P3 — skinut predmet ide ispred općeg puta, u DVIJE razine.
 *
 * Zašto dvije: URL gradiva nosi `?v=CONTENT_VERSION`, a `cache.match` NE ignorira
 * query. Poslije deploya stranica traži `…?v=novi`, a u kešu leži `…?v=stari` →
 * jednorazinsko poklapanje bi promašilo i skinut predmet bi postao NEVIDLJIV.
 * To je točno kvar zbog kojeg cijela faza POLICA postoji.
 *
 *  ① točan `?v=`  → cache-first, BEZ mreže. Skinuto je aktualno, pa je svaki
 *     mrežni poziv trošenje tuđeg podatkovnog prometa bez ikakve koristi.
 *  ② samo `ignoreSearch` → network-first, pa pad na tu kopiju. Online dobiješ
 *     ispravno, offline dobiješ STARO UMJESTO NIČEGA.
 *  ③ nema poklapanja → zatečeni stale-while-revalidate (ništa se ne mijenja).
 *
 * ⚠️ Odbačeno je „uvijek posluži iz keša": tiho bi serviralo zastarjelo gradivo
 * korisniku koji ima mrežu, i to bez ijednog znaka. Zato je ② network-FIRST.
 * To vrijedi i za `codeScripts` (vježbe + lib su KÔD, BUG-012): zastario paket uz
 * osvježen engine ne izgleda kao greška nego kao KRIV REZULTAT.
 *
 * ⚠️ Neuspjeh nije samo bačena iznimka: 404/500 se tretira kao pad, jer prazan
 * ekran nije bolji od starog gradiva. Isti obzir koji navigacijski put već ima.
 */
function odgovoriNaAsset(event, req) {
  // `cacheName` umjesto `caches.open`: otvaranje bi keš STVORILO i onda bi ga imao
  // svaki posjetitelj koji nikad ništa nije skinuo.
  const uPolici = (opts) => caches.match(req, opts).catch(() => undefined);

  return uPolici({ cacheName: OFFLINE }).then((tocno) => {
    if (tocno) return tocno;                                            // ①
    return uPolici({ cacheName: OFFLINE, ignoreSearch: true }).then((stara) => {
      if (!stara) return staleWhileRevalidate(event, req);              // ③
      return fetch(req)                                                 // ②
        .then((res) => (res && res.ok ? spremi(event, req, res) : stara))
        .catch(() => stara);
    });
  });
}
