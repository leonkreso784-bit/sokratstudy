/* ===== Sokrat Study — SokratMonitor (Faza 2, cigla 2E): praćenje grešaka =====
 *
 * Cilj: kad nekome na stranici kod pukne, saznaš ODMAH (umjesto sljepoće dok netko ne javi).
 * Tehnika: Sentry (besplatan tier), učitan SAMO nakon pristanka na kolačiće (kao GA u consent.js),
 *          NULA PII-a, i SIGURAN NO-OP dok DSN nije upisan (handleri postoje, ništa se ne šalje/učita).
 *
 * ⚙️ SETUP (jedini korak): zalijepi svoj Sentry "Loader Script" URL niže (izgleda kao
 *    "https://js-de.sentry-cdn.com/<key>.min.js"). Do tada je sve no-op. Loader sam dovuče
 *    SDK i pušta queue → NEMA fiksne verzije → nema rizika od 404. Ključ u URL-u je JAVAN
 *    (ide u HTML, kao GA ID); DSN je „zapečen" u projektu na Sentryjevoj strani.
 *
 * Veza s consent.js: applyConsent(true) → SokratMonitor.enable(); applyConsent(false) → disable().
 * Globalni hvatači (error / unhandledrejection) instaliraju se ODMAH, ali prosljeđuju TEK kad
 * je `enabled` (pristanak) — prije pristanka greške se ODBACUJU (GDPR: bez obrade prije privole).
 */
(function () {
    'use strict';

    // 👉 SENTRY LOADER URL (prazno = monitoring isključen, sve no-op):
    var SENTRY_LOADER_URL = 'https://js-de.sentry-cdn.com/59736986f036683cf28bd8ca05d57840.min.js';

    // Release oznaka — bumpaj pri deployu da znaš NA KOJOJ verziji je greška.
    // (Bez build-koraka: ručna konstanta; kasnije može iz auto-version-bump skripte, F3 3C.)
    var APP_RELEASE = 'sokrat-study@20260699';

    // Okruženje po ADRESI (BUG-053): bez njega Sentry SVE zove „production", pa je pad s
    // localhost + staging-baze izgledao kao kvar na produkciji i pojeo pola istrage.
    function appEnvironment(host) {
        if (host === 'www.sokratstudy.com' || host === 'sokratstudy.com') return 'production';
        if (/\.vercel\.app$/i.test(host || '')) return 'preview';
        return 'development';
    }

    var enabled = false;     // pristanak dan?
    var sentryReady = false; // SDK učitan?
    var loading = false;
    var buffer = [];         // greške uhvaćene prije nego je SDK spreman (flush na ready, cap 20)

    function isConfigured() {
        return /^https:\/\/js[\w-]*\.sentry-cdn\.com\/[0-9a-f]+\.min\.js$/i.test(SENTRY_LOADER_URL);
    }

    function _flush() {
        buffer.forEach(function (it) { _send(it.err, it.ctx); });
        buffer = [];
    }

    function _loadSentry() {
        if (loading || sentryReady || !isConfigured()) return;
        loading = true;
        // Konfiguracija PRIJE loadera: loader pozove sentryOnLoad kad je SDK spreman; ondje
        // pozovemo init s našim releaseom (DSN je već zapečen u loaderu → ne treba ga ovdje).
        window.sentryOnLoad = function () {
            try {
                if (window.Sentry && window.Sentry.init) {
                    window.Sentry.init({ release: APP_RELEASE, environment: appEnvironment(location.hostname), sendDefaultPii: false });
                }
            } catch (e) { /* ignore */ }
        };
        var s = document.createElement('script');
        s.src = SENTRY_LOADER_URL; // Loader Script (bez verzije; EU/DE regija)
        s.crossOrigin = 'anonymous';
        s.async = true;
        s.onload = function () {
            if (!window.Sentry) { loading = false; return; }
            sentryReady = true;
            _flush();
        };
        s.onerror = function () { loading = false; /* CDN padne → ostani no-op */ };
        document.head.appendChild(s);
    }

    function _send(err, ctx) {
        if (!window.Sentry) return;
        try {
            if (ctx) window.Sentry.captureException(err, { extra: ctx });
            else window.Sentry.captureException(err);
        } catch (e) { /* monitoring NIKAD ne smije srušiti app */ }
    }

    function captureException(err, ctx) {
        if (!enabled) return;                          // bez pristanka → odbaci
        if (!isConfigured()) return;                   // bez loader URL-a → no-op
        if (sentryReady) { _send(err, ctx); return; }
        if (buffer.length < 20) buffer.push({ err: err, ctx: ctx });
        _loadSentry();
    }

    // Globalne sigurnosne mreže — instaliraju se odmah; prosljeđuju tek kad `enabled`.
    window.addEventListener('error', function (e) {
        if (e && e.error) captureException(e.error, { kind: 'window.onerror' });
    });
    window.addEventListener('unhandledrejection', function (e) {
        var reason = e && e.reason;
        var err = (reason instanceof Error) ? reason : new Error(String(reason));
        captureException(err, { kind: 'unhandledrejection' });
    });

    function enable() {
        enabled = true;
        if (isConfigured()) _loadSentry();
        else console.info('[monitor] Pristanak dan, ali Sentry loader nije konfiguriran — monitoring je no-op.');
    }
    function disable() { enabled = false; }

    function status() {
        return { configured: isConfigured(), enabled: enabled, sentryReady: sentryReady, release: APP_RELEASE, buffered: buffer.length };
    }

    window.SokratMonitor = {
        captureException: captureException,
        enable: enable,
        disable: disable,
        status: status
    };
})();
