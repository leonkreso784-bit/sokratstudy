// ===== SOKRAT STUDY — AUTH (Supabase, email + lozinka) =====
//
// Backend staza B (ADR-001/008): Auth + cloud sinkronizacija napretka.
// Sadržaj predmeta NE ide kroz ovo — ostaje u data/* fajlovima.
//
// - supabase-js se učitava s CDN-a TEK nakon DOMContentLoaded (ne blokira app);
//   ako CDN ne uspije, cijela funkcionalnost se tiho ugasi — app radi kao prije.
// - Publishable key je javan po dizajnu (RLS u bazi štiti podatke);
//   service key NIKAD ne ide u frontend.
// - Login: email + lozinka (signInWithPassword) ILI OAuth Google/Facebook (R1, spec RACUN):
//   signInWithOAuth = puni redirect natrag na istu stranicu (detectSessionInUrl odradi
//   izmjenu koda); provider koji u Supabase dashboardu još NIJE uključen vraća grešku
//   → prevedena poruka u statusu, ništa ne puca (kod smije ispred ključeva).
// - Registracija (signUp) traži potvrdu emaila; ime ide u user_metadata.display_name.
//   UPITNIK (R1): tko si + faks/škola (FMTU se prepoznaje) + mail-pristanak žive u
//   user_metadata — bez nove tablice/RLS-a, a brisanjem računa nestaju i oni (GDPR
//   besplatno). OAuth preskače formu → upitnik se traži pri PRVOJ OAuth-prijavi
//   (app_metadata.provider !== 'email' bez questionnaire_done biljega), i preskočiv je;
//   email-korisnici se POSLIJE prijave nikad ne gnjave (postojeći računi netaknuti).
// - „Forgot password?" → resetPasswordForEmail → PASSWORD_RECOVERY → forma za novu lozinku.

const SOKRAT_AUTH_CONFIG = {
    enabled: true,
    url: 'https://naxjubnedhrbhsuasayu.supabase.co',
    publishableKey: 'sb_publishable_KatBQDLB8GRohKEyb3eDSQ_ToXJuL7L',
    // Supply-chain (risk-sprint #5): TOČAN pin (ne plutajući @2) + SRI hash računat nad
    // stvarnim bajtovima koje jsDelivr servira → mijenja li CDN sadržaj, skripta se ODBIJA
    // (browser SRI enforce). Nadogradnja verzije = svjesna: novi pin + novi hash + re-test.
    //
    // ⚠️ 2026-08-14: putanja je promijenjena `supabase.min.js` → `supabase.js`, i to NIJE kozmetika.
    // `dist/umd/supabase.min.js` **ne postoji u npm paketu** — jsDelivr ga generira VLASTITIM
    // minifierom na zahtjev (dokaz: v1 file-listing paketa nema tu datoteku, a „minificirana"
    // inačica je 208196 B, dakle 292 B VEĆA od objavljene 207904 B). Time je SRI dotad bio pinan
    // na IZVEDEN artefakt tuđeg build-koraka, a ne na izdavačeve bajtove: dan kad jsDelivr
    // promijeni minifier, hash pukne → `onerror` → auth se TIHO ugasi (v. loadSdk niže), tj.
    // prijava umre bez poruke i bez ijednog crvenog gatea. Sad pokazujemo na objavljenu datoteku
    // čiji sha256 je provjeren protiv jsDelivrovog file-listinga → hash se mijenja SAMO s verzijom.
    cdnSrc: 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.110.8/dist/umd/supabase.js',
    cdnIntegrity: 'sha384-M65KxMm/JqBppck6onbmAgPVMBHrmPCf1L17Q+71EcvI9/VVI8j5cqoxQf6lj6h2'
};

// TEST-ONLY seam (U1): dopusti automatiziranim testovima (Playwright) da preusmjere Supabase
// na STAGING projekt — BEZ diranja produkcijskog defaulta gore. Pravi korisnici NIKAD ne
// postavljaju ovaj global/localStorage ključ → u produkciji je ovo tvrdi no-op (vraća null).
// Izvori (redom): window.__SOKRAT_SUPABASE__ (addInitScript, za auth.setup) →
// localStorage 'sokrat-supabase-override' (preživi Playwright storageState → *.authed.spec).
function _readSupabaseOverride() {
    try {
        if (typeof window !== 'undefined' && window.__SOKRAT_SUPABASE__
            && window.__SOKRAT_SUPABASE__.url && window.__SOKRAT_SUPABASE__.publishableKey) {
            return window.__SOKRAT_SUPABASE__;
        }
        // localStorage put samo na lokalnom razvoju/testovima, i samo za *.supabase.co adresu
        // (isti obrazac kao js/odjava.js) — u produkciji se ne poštuje.
        const lokalno = typeof location !== 'undefined'
            && /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
        if (lokalno && typeof localStorage !== 'undefined') {
            const raw = localStorage.getItem('sokrat-supabase-override');
            if (raw) {
                const o = JSON.parse(raw);
                if (o && o.publishableKey && typeof o.url === 'string'
                    && /^https:\/\/[a-z0-9]+\.supabase\.co$/.test(o.url)) return o;
            }
        }
    } catch (e) { /* bilo kakva greška → nema overridea (prod default) */ }
    return null;
}

const SokratAuth = (function () {
    let client = null;
    let currentUser = null;
    let recoveryMode = false; // true nakon PASSWORD_RECOVERY (link iz reset emaila)
    let questMode = false;    // true = pokazujemo upitnik nakon prve OAuth-prijave (R1)
    const changeListeners = [];

    // ---------- Supabase client ----------

    function loadSdk() {
        return new Promise(function (resolve, reject) {
            if (typeof window.supabase !== 'undefined') { resolve(); return; }
            const s = document.createElement('script');
            s.src = SOKRAT_AUTH_CONFIG.cdnSrc;
            // SRI (#5): integrity + crossOrigin='anonymous' obavezni za enforce na cross-origin
            // skripti. jsDelivr šalje CORS (ACAO:*) → radi. Kriv/promijenjen bajt → onerror → auth
            // se tiho ugasi (isti graceful put kao CDN-nedostupan), app nastavlja bez computa.
            if (SOKRAT_AUTH_CONFIG.cdnIntegrity) {
                s.integrity = SOKRAT_AUTH_CONFIG.cdnIntegrity;
                s.crossOrigin = 'anonymous';
            }
            s.async = true;
            s.onload = resolve;
            s.onerror = function () { reject(new Error('supabase-js CDN load failed')); };
            document.head.appendChild(s);
        });
    }

    async function init() {
        if (!SOKRAT_AUTH_CONFIG.enabled) return;
        try {
            await loadSdk();
            const _ovr = _readSupabaseOverride();
            const _url = (_ovr && _ovr.url) || SOKRAT_AUTH_CONFIG.url;
            const _key = (_ovr && _ovr.publishableKey) || SOKRAT_AUTH_CONFIG.publishableKey;
            if (_ovr && typeof console !== 'undefined') console.warn('[auth] TEST override → Supabase = ' + _url);
            client = window.supabase.createClient(_url, _key);
        } catch (e) {
            // Bez mreže / CDN blokiran → app nastavlja raditi bez computa.
            console.warn('[auth] disabled:', e.message);
            return;
        }

        injectModal();
        // Svi ulazi u auth (landing nav + headeri browse/lessons/study):
        // odjavljen → modal za prijavu; prijavljen → Profile stranica.
        document.querySelectorAll('.auth-entry').forEach(function (btn) {
            btn.hidden = false;
            btn.addEventListener('click', function () {
                if (currentUser) {
                    if (typeof navigateTo === 'function') navigateTo('profile');
                } else {
                    openModal();
                }
            });
        });

        // Povratak s Googlea (U5): #id_token u fragmentu → predaj GoTrueu. supabase-jsov
        // detectSessionInUrl id_token NE dira (traži access_token/code), pa je posao naš.
        // URL se čisti PRIJE mrežnog poziva — token ne smije preživjeti refresh/bookmark.
        const _gFrag = new URLSearchParams((window.location.hash || '').replace(/^#/, ''));
        const _gIdToken = _gFrag.get('id_token');
        if (_gIdToken) {
            history.replaceState(null, '', window.location.pathname);
            let _gNonce = null;
            try {
                _gNonce = sessionStorage.getItem(GOOGLE_NONCE_KEY);
                sessionStorage.removeItem(GOOGLE_NONCE_KEY);
            } catch (e) { /* bez nonca GoTrue odbija ako ga token nosi — poruka niže */ }
            client.auth.signInWithIdToken({ provider: 'google', token: _gIdToken, nonce: _gNonce || undefined })
                .then(function (r) {
                    if (r.error) { openModal(); setStatus(authError(r.error), true); }
                    // Uspjeh: SIGNED_IN event vodi dalje (upitnik/toast) — isti put kao dosad.
                });
        }

        // OAuth povratak s GREŠKOM: GoTrue ne vraća error signInWithOAuth pozivu (taj samo
        // redirecta) nego ga šalje NATRAG u URL-u (#error_description=…). Bez ovoga klik na
        // provider koji u dashboardu još nije uključen izgleda kao „ništa se nije dogodilo".
        // Hvata i Googleov implicit povratak s greškom (#error=access_denied bez tokena).
        const _oauthErr = new URLSearchParams(
            (window.location.hash || '').replace(/^#/, '') + '&' + (window.location.search || '').replace(/^\?/, '')
        ).get('error_description');
        if (_oauthErr) {
            openModal();
            setStatus(authError({ message: _oauthErr }), true);
            // Očisti URL — greška ne smije preživjeti refresh/bookmark.
            history.replaceState(null, '', window.location.pathname);
        }

        // Postojeća sesija + redirecti iz emaila (potvrda registracije, reset
        // lozinke) — detectSessionInUrl je default.
        client.auth.onAuthStateChange(function (event, session) {
            const wasSignedIn = !!currentUser;
            currentUser = session ? session.user : null;
            if (!currentUser) { recoveryMode = false; questMode = false; }
            if (event === 'PASSWORD_RECOVERY') recoveryMode = true;
            updateNavButton();
            renderModalState();
            // Sinkronizacija napretka treba SAMO prijavljenom korisniku — pa i stiže tek s
            // njim (v. `js/loader.js`). Modul se sam prijavi na promjene I odmah primijeni
            // zatečenog korisnika, jer ovaj događaj je već prošao dok se učitavao.
            // `typeof` guard: `editor.html` ne učitava loader ni sinkronizaciju.
            if (currentUser && typeof SokratLoad !== 'undefined') {
                SokratLoad.paket('sync').catch(function (e) { console.warn('[sync]', e); });
            }
            changeListeners.forEach(function (fn) {
                try { fn(currentUser, event); } catch (err) { console.warn('[auth] listener:', err); }
            });
            if (event === 'SIGNED_IN' && !wasSignedIn && !recoveryMode) {
                if (needsQuestionnaire()) {
                    // Prva OAuth-prijava: preskočila je signup formu → upitnik SAD.
                    // SIGNED_IN se NE pali za obnovljenu sesiju (to je INITIAL_SESSION),
                    // pa ovo hvata samo stvarne prijave — nema gnjavaže na svakom loadu.
                    questMode = true;
                    openModal();
                } else {
                    closeModal();
                    if (typeof showToast === 'function') showToast(window.t ? t('msg.signedInSync') : 'Signed in — your progress now syncs to the cloud.');
                }
            }
            if (event === 'PASSWORD_RECOVERY') openModal();
            // Ako je Profile otvoren, osvježi ga (ili makni ako se korisnik odjavio).
            if (typeof AppState !== 'undefined' && AppState.nav.page === 'profile') {
                // ⚠️ F2/1: `USER_UPDATED` (tema, zrcaljenje avatara — oboje pišu u `user_metadata`) i
                // `TOKEN_REFRESHED` (svaki sat) NE mijenjaju TKO je prijavljen. `renderProfilePage`
                // prepisuje `#profileContent`, pa bi preko otvorene forme „Uredi profil" obrisao ono
                // što korisnik upravo piše — a „Ukloni" sliku stoji BAŠ u toj formi. Ništa se ne
                // gubi: slike zid osvježi U MJESTU (`refreshWallImages`), spremanje crta iznova, a
                // traka (`updateNavButton` gore) prati događaj i dok je forma otvorena.
                const forma = document.getElementById('profileEditForm');
                const piše = !!forma && !forma.hidden && (event === 'USER_UPDATED' || event === 'TOKEN_REFRESHED');
                if (currentUser && !piše && typeof renderProfilePage === 'function') renderProfilePage();
                if (!currentUser && typeof navigateTo === 'function') navigateTo('landing');
            }
        });
    }

    // ---------- UI ----------

    function getDisplayName() {
        if (!currentUser) return null;
        const meta = currentUser.user_metadata || {};
        // OAuth (R1): Google/FB ne pišu display_name nego full_name/name — bez fallbacka
        // bi prijava Googleom u navu pokazivala prefiks emaila umjesto imena.
        const name = (meta.display_name || meta.full_name || meta.name || '').trim();
        return name || null;
    }

    function updateNavButton() {
        const short = currentUser
            ? (getDisplayName() || (currentUser.email || at('profile.account', 'Account')).split('@')[0]).split(/\s+/)[0]
            : at('auth.signIn', 'Sign in');
        document.querySelectorAll('.auth-entry-label').forEach(function (label) {
            label.textContent = short;
        });
        const avatar = currentUser ? navAvatarUrl(currentUser) : null;
        // F3/2 cigla 4a: ime gumba je bilo engleski u oba jezika (brana nije vidjela uvjetni izraz).
        // `refreshAuthNav` = ova funkcija, pa ga prekidač jezika precrta odmah.
        const ime = currentUser ? at('profile.title', 'My Profile') : at('auth.signIn', 'Sign in');
        document.querySelectorAll('.auth-entry').forEach(function (btn) {
            btn.classList.toggle('is-signed-in', !!currentUser);
            btn.setAttribute('aria-label', ime);
            setNavAvatar(btn, avatar);
        });
    }

    /* ---------- F2/1 ③ — PROFILNA U TRACI (Leon, anketa 13.09.) ----------
       Putanja stiže iz JWT-a (`user_metadata.avatar_path`, zrcali ju `js/profile-images.js`), pa se
       slika crta na SVAKOJ stranici bez kruga prema bazi i bez paketa `profile`. Bucket je javan
       (Leon, 09.09.), URL je običan string.
       ⚠️ Metapodatke korisnik smije pisati sam (`updateUser`), pa je putanja ULAZ, ne činjenica:
       prolazi samo oblik `<moj-id>/avatar/<ime>` — tuđa ili izmišljena putanja ne postaje URL.
       Datoteka koja ne postoji (npr. obrisana na drugom uređaju) → `error` → natrag na ikonu. */
    const AVATAR_BUCKET = 'profile-images';

    function navAvatarUrl(user) {
        const p = user && user.user_metadata && user.user_metadata.avatar_path;
        if (!client || typeof p !== 'string') return null;
        const seg = p.split('/');
        if (seg.length !== 3 || seg[0] !== user.id || seg[1] !== 'avatar' || !/^[A-Za-z0-9._-]+$/.test(seg[2])) return null;
        const res = client.storage.from(AVATAR_BUCKET).getPublicUrl(p);
        const url = res && res.data && res.data.publicUrl;
        return (typeof url === 'string' && /^https:\/\//.test(url)) ? url : null;
    }

    function setNavAvatar(btn, url) {
        let img = btn.querySelector('img.auth-entry-avatar');
        if (!url) {
            if (img) img.remove();
            btn.classList.remove('has-avatar');
            return;
        }
        if (!img) {
            img = document.createElement('img');
            img.className = 'auth-entry-avatar';
            img.alt = '';                 // ime gumbu daje `aria-label`; slika je ukras
            img.decoding = 'async';
            img.addEventListener('error', function () {
                img.remove();
                btn.classList.remove('has-avatar');
            });
            btn.insertBefore(img, btn.firstChild);
        }
        if (img.getAttribute('src') !== url) img.setAttribute('src', url);
        btn.classList.add('has-avatar');
    }
    // i18n: na promjenu jezika sučelja ponovno iscrtaj nav-gumb (prevede „Sign in", čuva ime kad je prijavljen)
    window.refreshAuthNav = updateNavButton;

    // i18n helper: t() ako postoji, inače fallback (engleski original).
    // ⚠️ `t()` vraća SAM KLJUČ kad prijevoda nema → bez ove provjere korisnik vidi
    // sirovi ključ umjesto teksta. Isti obrazac kao studio.js/my-materials.js.
    function at(key, fb) {
        if (!window.t) return fb;
        const v = t(key);
        return (v === key) ? fb : v;
    }

    /**
     * Supabase auth-greska -> poruka na korisnikovom jeziku.
     *
     * Zasto postoji: `signUp`/`updateUser` odbijaju lozinku i kad je DUGA --
     * ako je u HaveIBeenPwned popisu. To `minlength` u obrascu ne moze
     * predvidjeti, pa je poruka sa servera JEDINI put do korisnika, a isla je
     * neprevedena. Korisnik koji ne razumije zasto je lozinka odbijena
     * najcesce odustane, a ne pokusa drugu.
     *
     * Primarno se gleda `code` (GoTrue ga salje od 2024-01-01), a regex nad
     * porukom je mreza za starije/rubne odgovore. **Zadnji fallback je SIROVA
     * poruka** -- radije engleska recenica nego prazan crveni okvir ako
     * Supabase uvede kod koji jos ne poznajemo.
     *
     * @param {{code?:string, message?:string, reasons?:string[]}|null} err
     * @returns {string}
     */
    function authError(err) {
        const raw = String((err && err.message) || '');
        const code = String((err && err.code) || '');
        const reasons = (err && Array.isArray(err.reasons)) ? err.reasons : [];

        // Slaba lozinka: "procurjela" i "prekratka" su RAZLICITI savjeti.
        // Uputa "uzmi duzu" je kriva za lozinku odbijenu zbog krade podataka.
        if (code === 'weak_password' || /weak.?password/i.test(raw)) {
            const pwned = reasons.indexOf('pwned') !== -1
                || /pwned|breach|leaked|compromis/i.test(raw);
            return pwned
                ? at('auth.st.weakPwned', 'This password has appeared in a known data breach — please pick a different one.')
                : at('auth.st.weakShort', 'Password is too weak — use at least 8 characters.');
        }
        if (code === 'invalid_credentials' || /invalid login credentials/i.test(raw)) {
            return at('auth.st.wrongCreds', 'Wrong email or password.');
        }
        if (code === 'email_not_confirmed' || /email not confirmed/i.test(raw)) {
            return at('auth.st.confirmFirst', 'Please confirm your email first — check your inbox for the confirmation link.');
        }
        if (code === 'user_already_exists' || code === 'email_exists'
            || /already registered|already exists/i.test(raw)) {
            return at('auth.st.exists', 'An account with this email already exists — switch to Sign in.');
        }
        if (code === 'over_email_send_rate_limit' || code === 'over_request_rate_limit'
            || /rate limit|too many requests/i.test(raw)) {
            return at('auth.st.rateLimit', 'Too many attempts — please wait a minute and try again.');
        }
        if (code === 'email_address_invalid' || /invalid.*email|email.*invalid/i.test(raw)) {
            return at('auth.st.badEmail', 'That email address does not look valid.');
        }
        if (code === 'same_password' || /should be different from the old/i.test(raw)) {
            return at('auth.st.samePass', 'The new password must be different from the current one.');
        }
        // F6 ①/2b — postavka „traži trenutnu lozinku" (uključena na STAGINGU 21.09.).
        // ⚠️ IZMJERENO: poslužitelj za OBA slučaja šalje DOSLOVNO ISTU rečenicu
        // („Current password required when setting new password."), a razlikuju se SAMO po kodu:
        // `current_password_required` (polje prazno) vs `current_password_invalid` (upisana kriva).
        // Zato se sudi po KODU — grananje po tekstu ta dva slučaja strukturno ne može razlikovati,
        // pa bi korisnik na krivu lozinku dobio uputu „upiši lozinku" koju je upravo poslušao.
        if (code === 'current_password_required') {
            return at('auth.st.currentPassRequired', 'Enter your current password to change it.');
        }
        if (code === 'current_password_invalid') {
            return at('auth.st.currentPassWrong', 'That is not your current password.');
        }
        // Provider (Google/FB) postoji u kodu, a u dashboardu još nije uključen — namjerno
        // stanje dok Leon ne upiše ključeve; korisnik dobiva put naprijed, ne sirovu grešku.
        if (/provider is not enabled|unsupported provider/i.test(raw)) {
            return at('auth.st.providerOff', 'This sign-in method is not available yet — please use email for now.');
        }
        // 5xx (npr. SMTP pao pa mail ne izlazi): tijelo zna biti PRAZAN JSON → supabase-js
        // složi message "{}" — korisniku se pokazao doslovno "{}" (Leonov nalaz, 2026-09-02).
        if (code === 'unexpected_failure' || (err && typeof err.status === 'number' && err.status >= 500)) {
            return at('auth.st.serverErr', 'The server could not send the email right now — please try again in a few minutes.');
        }
        // Nepoznato: radije sirova engleska recenica nego prazan crveni okvir — ali samo ako
        // je LJUDSKA. Serializirani JSON ("{}", "[…]") ili "[object Object]" nije poruka.
        if (raw && !/^[\[{]/.test(raw) && raw.indexOf('[object') === -1) return raw;
        return at('auth.st.genericErr', 'Something went wrong. Please try again.');
    }

    function injectModal() {
        if (document.getElementById('authModal')) return;
        // F2 2D.2c: modal je sada Web Component <sokrat-modal> (S4 primitiv) — komponenta vodi
        // overlay/ESC/backdrop-klik/scroll-lock/fokus/Tab-trap. Ovdje ostaje samo sadržaj kartice.
        // Komponenta je sam dialog (role=dialog + aria-modal iz connectedCallback) → kartica NEMA
        // duplirani role=dialog (izbjegnut ugniježđeni dialog); aria-labelledby ide na komponentu.
        // Zaseban `.auth-modal__backdrop` div je maknut — backdrop je sama komponenta.
        const wrap = document.createElement('sokrat-modal');
        wrap.id = 'authModal';
        wrap.className = 'auth-modal';
        wrap.setAttribute('aria-labelledby', 'authModalTitle');
        wrap.setAttribute('data-jezik', jezikSucelja());   // na kojem je jeziku tekst upisan (v. openModal)
        wrap.innerHTML =
            '<div class="auth-modal__card">' +
            '  <button type="button" class="auth-modal__close" data-auth-close aria-label="' + at('auth.close', 'Close') + '">&times;</button>' +

            '  <div id="authSignedOut">' +
            '    <h3 id="authModalTitle" class="auth-modal__title"><i class="fas fa-cloud"></i> ' + at('auth.m.title', 'Sync your progress') + '</h3>' +
            '    <p class="auth-modal__text">' + at('auth.m.text', 'Back up your study progress and continue on any device with a free account.') + '</p>' +
            '    <div class="auth-oauth-wrap" id="authOAuthWrap">' +
            '      <div class="auth-oauth">' +
            '        <button type="button" class="auth-oauth__btn" id="authGoogleBtn">' + IKONA_GOOGLE + '<span>' + at('auth.oauth.google', 'Continue with Google') + '</span></button>' +
            (FB_LOGIN ? '        <button type="button" class="auth-oauth__btn" id="authFacebookBtn">' + IKONA_FACEBOOK + '<span>' + at('auth.oauth.facebook', 'Continue with Facebook') + '</span></button>' : '') +
            '      </div>' +
            // 16+ (Leon, anketa 15.09.): Google-put preskače formu i njezinu kvačicu, pa potvrdu
            // nosi rečenica UZ gumb. Mail-put ima obaveznu kvačicu u koraku 2 (`authSignUpAge`).
            '      <p class="auth-oauth__age" id="authOAuthAge">' + at('auth.oauth.age', 'By continuing with Google you confirm you are at least 16.') + '</p>' +
            '      <div class="auth-divider"><span>' + at('auth.divider.or', 'or') + '</span></div>' +
            '    </div>' +
            '    <div class="auth-modal__tabs" role="tablist">' +
            '      <button type="button" class="auth-modal__tab is-active" id="authTabSignIn" role="tab" aria-selected="true">' + at('auth.signIn', 'Sign in') + '</button>' +
            '      <button type="button" class="auth-modal__tab" id="authTabSignUp" role="tab" aria-selected="false">' + at('auth.tab.signUp', 'Create account') + '</button>' +
            '    </div>' +
            '    <form id="authSignInForm" class="auth-modal__form">' +
            '      <input type="email" id="authSignInEmail" class="auth-modal__input" placeholder="you@email.com" required autocomplete="email">' +
            '      <div class="auth-pass-wrap">' +
            '        <input type="password" id="authSignInPassword" class="auth-modal__input" placeholder="' + at('auth.ph.password', 'Password') + '" required autocomplete="current-password">' +
            '        <button type="button" class="auth-pass-toggle" aria-label="' + at('auth.showPassword', 'Show password') + '"><i class="fas fa-eye"></i></button>' +
            '      </div>' +
            '      <button type="submit" class="cta-button primary auth-modal__submit"><i class="fas fa-right-to-bracket"></i><span>' + at('auth.signIn', 'Sign in') + '</span></button>' +
            '      <button type="button" class="auth-modal__link" id="authForgotLink">' + at('auth.forgot', 'Forgot password?') + '</button>' +
            '    </form>' +
            // Registracija u DVA koraka (R1): 1. podaci računa → 2. upitnik. `signUp` traži
            // SVE u jednom pozivu (options.data), pa se upitnik skuplja PRIJE poziva — nakon
            // signUp-a email-korisnik nema sesiju (čeka potvrdu) i ne bi ga imao gdje predati.
            '    <form id="authSignUpForm" class="auth-modal__form" hidden>' +
            '      <input type="text" id="authSignUpName" class="auth-modal__input" placeholder="' + at('auth.ph.name', 'Your name') + '" required maxlength="60" autocomplete="name">' +
            '      <input type="email" id="authSignUpEmail" class="auth-modal__input" placeholder="you@email.com" required autocomplete="email">' +
            '      <div class="auth-pass-wrap">' +
            '        <input type="password" id="authSignUpPassword" class="auth-modal__input" placeholder="' + at('auth.ph.passwordMin', 'Password (min. 8 characters)') + '" required minlength="8" autocomplete="new-password">' +
            '        <button type="button" class="auth-pass-toggle" aria-label="' + at('auth.showPassword', 'Show password') + '"><i class="fas fa-eye"></i></button>' +
            '      </div>' +
            '      <button type="submit" class="cta-button primary auth-modal__submit"><i class="fas fa-arrow-right"></i><span>' + at('auth.q.continue', 'Continue') + '</span></button>' +
            '    </form>' +
            '    <form id="authSignUpForm2" class="auth-modal__form" hidden>' +
            '      <p class="auth-modal__text auth-modal__text--tight">' + at('auth.q.text', 'One quick step — it helps us show you the right subjects.') + '</p>' +
            questFieldsHtml('authSignUp') +
            // Samo ovdje, ne u `questFieldsHtml`: post-OAuth upitnik je preskočiv, a potvrdu
            // Google-puta nosi rečenica uz gumb (gore). Nikad unaprijed označena.
            '      <label class="auth-consent"><input type="checkbox" id="authSignUpAge" required><span>' + at('auth.q.age', 'I am at least 16 years old.') + '</span></label>' +
            '      <button type="submit" class="cta-button primary auth-modal__submit"><i class="fas fa-user-plus"></i><span>' + at('auth.tab.signUp', 'Create account') + '</span></button>' +
            '      <button type="button" class="auth-modal__link" id="authSignUpBack">' + at('auth.q.back', '← Back') + '</button>' +
            '    </form>' +
            '    <form id="authForgotForm" class="auth-modal__form" hidden>' +
            '      <p class="auth-modal__text auth-modal__text--tight">' + at('auth.forgot.text', 'Enter your email and we will send you a link to reset your password.') + '</p>' +
            '      <input type="email" id="authForgotEmail" class="auth-modal__input" placeholder="you@email.com" required autocomplete="email">' +
            '      <button type="submit" class="cta-button primary auth-modal__submit"><i class="fas fa-envelope"></i><span>' + at('auth.btn.sendReset', 'Send reset link') + '</span></button>' +
            '      <button type="button" class="auth-modal__link" id="authBackToSignIn">' + at('auth.backToSignIn', '← Back to sign in') + '</button>' +
            '    </form>' +
            '    <p class="auth-modal__status" id="authStatus" hidden></p>' +
            '    <p class="auth-modal__terms">' + at('auth.terms.pre', 'By signing in or creating an account you agree to our ') + '<a href="terms.html">' + at('footer.terms', 'Terms of Use') + '</a>' + at('auth.terms.mid', ' and ') + '<a href="privacy.html">' + at('footer.privacy', 'Privacy Policy') + '</a>.</p>' +
            '  </div>' +

            '  <div id="authRecovery" hidden>' +
            '    <h3 class="auth-modal__title"><i class="fas fa-key"></i> ' + at('auth.recovery.title', 'Set a new password') + '</h3>' +
            '    <p class="auth-modal__text">' + at('auth.recovery.textPre', 'Choose a new password for ') + '<strong id="authRecoveryEmail"></strong>.</p>' +
            '    <form id="authRecoveryForm" class="auth-modal__form">' +
            '      <div class="auth-pass-wrap">' +
            '        <input type="password" id="authRecoveryPassword" class="auth-modal__input" placeholder="' + at('profile.newPassPlaceholder', 'New password (min. 8 characters)') + '" required minlength="8" autocomplete="new-password">' +
            '        <button type="button" class="auth-pass-toggle" aria-label="' + at('auth.showPassword', 'Show password') + '"><i class="fas fa-eye"></i></button>' +
            '      </div>' +
            '      <div class="auth-pass-wrap">' +
            '        <input type="password" id="authRecoveryPassword2" class="auth-modal__input" placeholder="' + at('profile.repeatNewPass', 'Repeat new password') + '" required minlength="8" autocomplete="new-password">' +
            '        <button type="button" class="auth-pass-toggle" aria-label="' + at('auth.showPassword', 'Show password') + '"><i class="fas fa-eye"></i></button>' +
            '      </div>' +
            '      <button type="submit" class="cta-button primary auth-modal__submit"><i class="fas fa-check"></i><span>' + at('profile.saveNewPass', 'Save new password') + '</span></button>' +
            '    </form>' +
            '    <p class="auth-modal__status" id="authRecoveryStatus" hidden></p>' +
            '  </div>' +

            '  <div id="authSignedIn" hidden>' +
            '    <h3 class="auth-modal__title"><i class="fas fa-user-check"></i> ' + at('auth.signedIn.title', 'Signed in') + '</h3>' +
            '    <p class="auth-modal__text">' + at('auth.signedInAs', 'Signed in as ') + '<strong id="authUserEmail"></strong></p>' +
            '    <p class="auth-modal__text auth-modal__sync" id="authSyncInfo">' + at('auth.syncAuto', 'Your progress syncs automatically.') + '</p>' +
            '    <button type="button" id="authSignOutBtn" class="cta-button secondary"><i class="fas fa-sign-out-alt"></i><span>' + at('profile.signOut', 'Sign out') + '</span></button>' +
            '  </div>' +

            // Upitnik NAKON prijave — samo za prvu OAuth-prijavu (preskočila je signup formu).
            '  <div id="authQuest" hidden>' +
            '    <h3 class="auth-modal__title"><i class="fas fa-graduation-cap"></i> ' + at('auth.q.title', 'Tell us who you are') + '</h3>' +
            '    <p class="auth-modal__text">' + at('auth.q.text', 'One quick step — it helps us show you the right subjects.') + '</p>' +
            '    <form id="authQuestForm" class="auth-modal__form">' +
            questFieldsHtml('authQ') +
            '      <button type="submit" class="cta-button primary auth-modal__submit"><i class="fas fa-check"></i><span>' + at('auth.q.continue', 'Continue') + '</span></button>' +
            '      <button type="button" class="auth-modal__link" id="authQuestSkip">' + at('auth.q.skip', 'Skip for now') + '</button>' +
            '    </form>' +
            '    <p class="auth-modal__status" id="authQuestStatus" hidden></p>' +
            '  </div>' +

            '  <datalist id="authSchoolList"><option value="FMTU — Fakultet za menadžment u turizmu i ugostiteljstvu, Opatija"></option></datalist>' +
            '</div>';
        document.body.appendChild(wrap);

        wrap.addEventListener('click', function (e) {
            if (e.target.closest('[data-auth-close]')) closeModal();
        });
        document.getElementById('authTabSignIn').addEventListener('click', function () { showPanel('signin'); });
        document.getElementById('authTabSignUp').addEventListener('click', function () { showPanel('signup'); });
        document.getElementById('authForgotLink').addEventListener('click', function () {
            const email = document.getElementById('authSignInEmail').value;
            if (email) document.getElementById('authForgotEmail').value = email;
            showPanel('forgot');
        });
        document.getElementById('authBackToSignIn').addEventListener('click', function () { showPanel('signin'); });
        document.getElementById('authSignInForm').addEventListener('submit', handleSignIn);
        document.getElementById('authSignUpForm').addEventListener('submit', handleSignUpStep1);
        document.getElementById('authSignUpForm2').addEventListener('submit', handleSignUp);
        document.getElementById('authSignUpBack').addEventListener('click', function () { showPanel('signup'); });
        document.getElementById('authGoogleBtn').addEventListener('click', function () { handleGoogle(); });
        if (FB_LOGIN) document.getElementById('authFacebookBtn').addEventListener('click', function () { handleOAuth('facebook'); });
        document.getElementById('authForgotForm').addEventListener('submit', handleForgot);
        document.getElementById('authRecoveryForm').addEventListener('submit', handleRecovery);
        document.getElementById('authQuestForm').addEventListener('submit', handleQuest);
        document.getElementById('authQuestSkip').addEventListener('click', skipQuest);
        document.getElementById('authSignOutBtn').addEventListener('click', signOut);
    }

    // Polja upitnika — JEDAN izvor za oba mjesta (signup korak 2 + post-OAuth panel),
    // razlikuje ih samo prefiks id-a. Radio `required` na prvom vrijedi za cijelu grupu.
    function questFieldsHtml(prefix) {
        function role(value, key, fb) {
            return '<label class="auth-role"><input type="radio" name="' + prefix + 'Type" value="' + value + '"' +
                (value === 'student' ? ' required' : '') + '><span>' + at(key, fb) + '</span></label>';
        }
        // id-evi sastavljeni UNAPRIJED — fragment poput `Consent"><span>` u konkatenaciji
        // check:i18n inače vidi kao tekstni čvor (kriva pozitiva, ali brana je s razlogom stroga).
        const schoolId = prefix + 'School';
        const consentId = prefix + 'Consent';
        return '<div class="auth-roles" role="radiogroup" aria-label="' + at('auth.q.rolesLabel', 'Who are you?') + '">' +
            role('student', 'auth.q.student', 'University student') +
            role('pupil', 'auth.q.pupil', 'High school') +
            role('other', 'auth.q.other', 'Other') +
            '</div>' +
            '<input type="text" id="' + schoolId + '" class="auth-modal__input" placeholder="' + at('auth.q.schoolPh', 'Your university or school (optional)') + '" maxlength="120" list="authSchoolList" autocomplete="organization">' +
            '<label class="auth-consent"><input type="checkbox" id="' + consentId + '"><span>' + at('auth.q.consent', 'Email me about new subjects and features.') + '</span></label>';
    }

    // Panel unutar odjavljenog stanja: 'signin' | 'signup' | 'signup2' | 'forgot'
    // (forgot je podvarijanta Sign in taba, pa tab ostaje aktivan; signup2 = upitnik,
    // drugi korak registracije — vrijednosti koraka 1 ostaju u skrivenoj formi).
    function showPanel(name) {
        const signIn = document.getElementById('authSignInForm');
        const signUp = document.getElementById('authSignUpForm');
        const signUp2 = document.getElementById('authSignUpForm2');
        const forgot = document.getElementById('authForgotForm');
        if (!signIn || !signUp || !signUp2 || !forgot) return;
        const isUp = (name === 'signup' || name === 'signup2');
        signIn.hidden = name !== 'signin';
        signUp.hidden = name !== 'signup';
        signUp2.hidden = name !== 'signup2';
        forgot.hidden = name !== 'forgot';
        // OAuth gumbi se miču usred registracije (korak 2) i na forgotu — „Continue with
        // Google" UZ upitnik bi izgledao kao alternativni način da ga se dovrši.
        const oauthWrap = document.getElementById('authOAuthWrap');
        if (oauthWrap) oauthWrap.hidden = (name === 'signup2' || name === 'forgot');
        const tabIn = document.getElementById('authTabSignIn');
        const tabUp = document.getElementById('authTabSignUp');
        tabIn.classList.toggle('is-active', !isUp);
        tabUp.classList.toggle('is-active', isUp);
        tabIn.setAttribute('aria-selected', !isUp ? 'true' : 'false');
        tabUp.setAttribute('aria-selected', isUp ? 'true' : 'false');
        setStatus('');
    }

    function jezikSucelja() {
        return (typeof window.getUiLang === 'function') ? window.getUiLang() : 'en';
    }

    /**
     * F3/2 cigla 4a — prozor NA JEZIKU SUČELJA. Gradi se jednom (`init`) i tekst mu se upisuje pri
     * gradnji, pa je poslije prekidača ostajao na jeziku prvog učitavanja. Pregrađuje se pri
     * OTVARANJU, ne na prekidač: zatvoren se ne vidi, a dok je otvoren prekidač je iza zastora
     * (`<sokrat-modal>` drži fokus i zatvara se na klik izvan kartice). Svi rukovatelji se vežu u
     * `injectModal`, a nitko ne drži referencu na stari element — pa je nova gradnja čista.
     * Upisano ostaje (načelo `data-touched` s naslovnice): prekidač nikad ne briše korisnikov unos.
     */
    function prozorNaJezikuSucelja(m) {
        if (m.getAttribute('data-jezik') === jezikSucelja() || (typeof m.isOpen === 'function' && m.isOpen())) return m;
        const upisano = Array.prototype.map.call(m.querySelectorAll('input'), function (el) {
            return { id: el.id, name: el.name, value: el.value, checked: el.checked, tip: el.type };
        });
        m.remove();
        injectModal();
        const novi = document.getElementById('authModal');
        upisano.forEach(function (u) {
            // Radio gumbi upitnika nemaju id — prepoznaju se po imenu grupe i (zakucanoj) vrijednosti.
            const el = u.id
                ? document.getElementById(u.id)
                : (u.tip === 'radio' && u.name
                    ? novi.querySelector('input[type="radio"][name="' + u.name + '"][value="' + u.value + '"]')
                    : null);
            if (!el) return;
            if (u.tip === 'checkbox' || u.tip === 'radio') el.checked = u.checked;
            else el.value = u.value;
        });
        return novi;
    }

    function openModal() {
        const zatecen = document.getElementById('authModal');
        if (!zatecen) return;
        const m = prozorNaJezikuSucelja(zatecen);
        renderModalState();
        if (!currentUser) showPanel('signin');
        // <sokrat-modal>: open() vodi prikaz/scroll-lock/fokus. Fallback ako element nije upgrade-an.
        if (typeof m.open === 'function') m.open();
        else { m.setAttribute('aria-hidden', 'false'); m.classList.add('is-open'); }
    }

    function closeModal() {
        const m = document.getElementById('authModal');
        if (!m) return;
        if (typeof m.close === 'function') m.close();
        else { m.setAttribute('aria-hidden', 'true'); m.classList.remove('is-open'); }
    }

    // Treba li korisniku upitnik? SAMO OAuth-računi bez biljega — email-put ga skuplja
    // u registraciji, a postojeći email-korisnici bez biljega se NE diraju (spec RACUN §3:
    // „postojeći korisnici se i dalje prijavljuju bez ikakve promjene").
    function needsQuestionnaire() {
        if (!currentUser) return false;
        const provider = (currentUser.app_metadata && currentUser.app_metadata.provider) || 'email';
        if (provider === 'email') return false;
        return !(currentUser.user_metadata && currentUser.user_metadata.questionnaire_done);
    }

    function renderModalState() {
        const out = document.getElementById('authSignedOut');
        const rec = document.getElementById('authRecovery');
        const inn = document.getElementById('authSignedIn');
        const q = document.getElementById('authQuest');
        if (!out || !rec || !inn || !q) return;
        const showRecovery = !!(recoveryMode && currentUser);
        const showQuest = !!(questMode && currentUser && !showRecovery);
        out.hidden = !!currentUser;
        rec.hidden = !showRecovery;
        q.hidden = !showQuest;
        inn.hidden = !currentUser || showRecovery || showQuest;
        if (currentUser) {
            const el = document.getElementById('authUserEmail');
            if (el) el.textContent = currentUser.email || '';
            const rel = document.getElementById('authRecoveryEmail');
            if (rel) rel.textContent = currentUser.email || '';
        }
    }

    function setStatus(msg, isError) {
        const el = document.getElementById('authStatus');
        if (!el) return;
        el.hidden = !msg;
        el.textContent = msg || '';
        el.classList.toggle('is-error', !!isError);
    }

    function setRecoveryStatus(msg, isError) {
        const el = document.getElementById('authRecoveryStatus');
        if (!el) return;
        el.hidden = !msg;
        el.textContent = msg || '';
        el.classList.toggle('is-error', !!isError);
    }

    function setQuestStatus(msg, isError) {
        const el = document.getElementById('authQuestStatus');
        if (!el) return;
        el.hidden = !msg;
        el.textContent = msg || '';
        el.classList.toggle('is-error', !!isError);
    }

    // ---------- Akcije ----------

    /**
     * D4 (MREŽA): provjera procurjele lozinke — HaveIBeenPwned range API, k-anonimnost.
     *
     * Lozinka NIKAD ne napušta preglednik: šalje se SAMO prvih 5 heks znakova njezina
     * SHA-1 sažetka, odgovor je popis ~800-1000 sufiksa, usporedba je lokalna. SHA-1 je
     * ovdje u redu jer ne štiti ništa — služi kao KLJUČ u tuđi javni popis, a k-anonimnost
     * čuva i sam upit. `Add-Padding` izjednačava veličinu odgovora (mrežni promatrač ne
     * može ni iz duljine zaključiti prefiks); padding-redci nose broj 0 pa se odbacuju.
     *
     * FAIL-OPEN, namjerno: mrežna greška NE blokira registraciju — provjera je dodatak,
     * ne vrata. Server-side dvojnik (Supabase Pro) ostaje; ovaj klijentski radi neovisno
     * o planu (⚠️ poslije seobe server-side pada — tada je ovo jedina provjera).
     * Doseg pošteno: zaustavlja korisnika koji upiše procurjelu lozinku, ne napadača
     * koji zaobiđe formu (taj šteti samo sebi) — isti razred kao `minlength`.
     */
    async function isPasswordPwned(password) {
        try {
            const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(password));
            const hex = Array.prototype.map.call(new Uint8Array(buf),
                function (b) { return b.toString(16).padStart(2, '0'); }).join('').toUpperCase();
            const res = await fetch('https://api.pwnedpasswords.com/range/' + hex.slice(0, 5),
                { headers: { 'Add-Padding': 'true' } });
            if (!res.ok) return false;
            const suffix = hex.slice(5);
            const text = await res.text();
            return text.split('\n').some(function (line) {
                const i = line.indexOf(':');
                return i > 0 && line.slice(0, i).trim() === suffix
                    && parseInt(line.slice(i + 1), 10) > 0;
            });
        } catch (e) {
            return false;
        }
    }
    // Na window za profile.js (promjena lozinke) — isti razlog kao refreshAuthNav gore.
    window.checkPwnedPassword = isPasswordPwned;

    // ---------- Upitnik (R1): FMTU prepoznavanje + sastavljanje metapodataka ----------

    // Prepoznaje FMTU u slobodnom tekstu (kratica · Opatija · puni naziv). Namjerno
    // širokogrudno — kriva pozitiva znači samo krivi mail-segment, ne sigurnosni problem.
    const FMTU_RE = /fmtu|opatij|menad\w*\s+.{0,3}turizm|turizm\w*\s+i\s+ugostiteljstv/i;

    function buildQuestData(type, school, consent) {
        const s = (school || '').trim();
        return {
            acct_type: type || 'other',            // 'student' | 'pupil' | 'other'
            school: s,
            is_fmtu: FMTU_RE.test(s),
            mail_consent: !!consent,               // GDPR: default false, izričit klik
            questionnaire_done: true,
            questionnaire_at: new Date().toISOString()
        };
    }

    // U5 (R1-UX): Google BEZ supabase-domene na ekranu pristanka. `signInWithOAuth` vodi
    // preko Supabaseovog callbacka pa Google piše „to continue to <ref>.supabase.co" i šalje
    // mail o dijeljenju s tom domenom (Leonov nalaz — izgleda kao phishing). Custom domena
    // košta 10 USD/mj; besplatni put je implicit id_token IZRAVNO s naše stranice
    // (redirect_uri = naš origin → Google piše sokratstudy.com), a token predamo GoTrueu
    // kroz signInWithIdToken. Nonce ide kroz sessionStorage preko redirecta (CSRF/replay).
    const GOOGLE_CLIENT_ID = '646318963527-nch7cvm11ef0r74jjge8pp8cnr7dgc8o.apps.googleusercontent.com';
    const GOOGLE_NONCE_KEY = 'sokrat-gnonce';
    // Facebook maknut iz dijaloga na Leonovu riječ (2026-09-02: „makni facebook za sada,
    // to ćemo kasnije dodat") — čeka Metine ključeve; flip na true kad sjednu u Supabase.
    const FB_LOGIN = false;

    /* ===== ZNAKOVI PROVIDERA SU UGRAĐENI SVG, NE FONT-AWESOME =====
     * IZMJERENO (2026-09-04, `scripts/perf-probe.js` na produkciji): `fa-brands-400.woff2`
     * je **106 KB** i skidao se na SVAKOM učitavanju landinga — zbog TOČNO OVE DVIJE ikone,
     * od kojih se jedna (facebook) uz `FB_LOGIN=false` niti ne crta. Sto šest kilobajta za
     * jedno slovo „G" u dijalogu koji većina posjetitelja nikad ne otvori.
     * Ugrađeni SVG je ~0.6 KB, dolazi s dokumentom (nula zahtjeva) i ne može regresirati:
     * `tests/unit/no-brand-font.test.js` pada čim se ta obitelj ikona vrati u kod.
     * Google traži SVOJ znak na „Continue with Google" gumbu (Branding Guidelines) —
     * dosadašnja indigo-obojena FA aproksimacija to nije poštovala; ovo je službeni G. */
    const IKONA_GOOGLE =
        '<svg class="auth-oauth__ikona" viewBox="0 0 48 48" width="18" height="18" aria-hidden="true" focusable="false">'
        + '<path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>'
        + '<path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>'
        + '<path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/>'
        + '<path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>'
        + '</svg>';
    const IKONA_FACEBOOK =
        '<svg class="auth-oauth__ikona" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">'
        + '<path fill="#1877F2" d="M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07z"/>'
        + '</svg>';

    function randomHex(n) {
        const a = new Uint8Array(n);
        crypto.getRandomValues(a);
        return Array.prototype.map.call(a, function (b) { return b.toString(16).padStart(2, '0'); }).join('');
    }

    function handleGoogle() {
        if (!client) return;
        let nonce = null;
        try {
            nonce = randomHex(16);
            sessionStorage.setItem(GOOGLE_NONCE_KEY, nonce);
        } catch (e) {
            // Privatni način bez sessionStoragea → stari supabase-redirect put (radi, samo ružnije piše).
            handleOAuth('google');
            return;
        }
        setStatus(at('auth.st.redirect', 'Opening secure sign-in…'));
        const p = new URLSearchParams({
            client_id: GOOGLE_CLIENT_ID,
            redirect_uri: window.location.origin + window.location.pathname,
            response_type: 'id_token',
            scope: 'openid email profile',
            nonce: nonce,
            prompt: 'select_account'
        });
        window.location.assign('https://accounts.google.com/o/oauth2/v2/auth?' + p.toString());
    }

    async function handleOAuth(provider) {
        if (!client) return;
        setStatus(at('auth.st.redirect', 'Opening secure sign-in…'));
        // Puni redirect: preglednik ODLAZI na provider i vraća se na istu stranicu,
        // gdje detectSessionInUrl (default) razmijeni kod → SIGNED_IN event.
        const { error } = await client.auth.signInWithOAuth({
            provider: provider,
            options: { redirectTo: window.location.origin + window.location.pathname }
        });
        if (error) setStatus(authError(error), true);
    }

    async function handleSignIn(e) {
        e.preventDefault();
        if (!client) return;
        const email = (document.getElementById('authSignInEmail').value || '').trim();
        const password = document.getElementById('authSignInPassword').value;
        if (!email || !password) return;
        setStatus(at('auth.st.signingIn', 'Signing in…'));
        const { error } = await client.auth.signInWithPassword({ email: email, password: password });
        if (error) setStatus(authError(error), true);
        // Uspjeh: onAuthStateChange zatvara modal i javlja toast.
    }

    // Korak 1 registracije: browser je validirao required polja → samo prijeđi na upitnik.
    function handleSignUpStep1(e) {
        e.preventDefault();
        showPanel('signup2');
    }

    async function handleSignUp(e) {
        e.preventDefault();
        if (!client) return;
        const name = (document.getElementById('authSignUpName').value || '').trim();
        const email = (document.getElementById('authSignUpEmail').value || '').trim();
        const password = document.getElementById('authSignUpPassword').value;
        if (!name || !email || !password) { showPanel('signup'); return; }
        const type = (document.querySelector('input[name="authSignUpType"]:checked') || {}).value;
        const school = document.getElementById('authSignUpSchool').value;
        const consent = document.getElementById('authSignUpConsent').checked;
        // `required` čuva samo klik na gumb; submit mimo preglednikove provjere mora stati OVDJE.
        const age = document.getElementById('authSignUpAge');
        if (!age || !age.checked) {
            setStatus(at('auth.st.age', 'Please confirm you are at least 16 years old.'), true);
            if (age && age.focus) age.focus();
            return;
        }
        setStatus(at('auth.st.creating', 'Creating account…'));
        if (await isPasswordPwned(password)) {
            setStatus(at('auth.st.weakPwned', 'This password has appeared in a known data breach — please pick a different one.'), true);
            return;
        }
        const { data, error } = await client.auth.signUp({
            email: email,
            password: password,
            options: {
                data: Object.assign({ display_name: name }, buildQuestData(type, school, consent),
                    { age_confirmed: true, age_confirmed_at: new Date().toISOString() }),
                emailRedirectTo: window.location.origin + window.location.pathname
            }
        });
        if (error) {
            setStatus(authError(error), true);
            return;
        }
        // Uz uključenu potvrdu emaila Supabase za već registriran email vrati
        // „lažnog" usera bez identities (anti-enumeration) — prepoznaj i uputi na login.
        if (data && data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
            setStatus(at('auth.st.exists', 'An account with this email already exists — switch to Sign in.'), true);
            return;
        }
        if (data && data.session) return; // potvrda isključena → odmah prijavljen (onAuthStateChange)
        setStatus(at('auth.st.created', 'Account created! Check your inbox and click the confirmation link, then sign in.'));
    }

    async function handleForgot(e) {
        e.preventDefault();
        if (!client) return;
        const email = (document.getElementById('authForgotEmail').value || '').trim();
        if (!email) return;
        setStatus(at('auth.st.sending', 'Sending…'));
        const { error } = await client.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + window.location.pathname
        });
        if (error) {
            setStatus(authError(error), true);
        } else {
            setStatus(at('auth.st.resetSent', 'If an account exists for that email, a reset link is on its way — check your inbox.'));
        }
    }

    async function handleRecovery(e) {
        e.preventDefault();
        if (!client) return;
        const password = document.getElementById('authRecoveryPassword').value;
        const repeat = document.getElementById('authRecoveryPassword2').value;
        if (!password) return;
        if (password !== repeat) {
            setRecoveryStatus(at('msg.passwordsNoMatch', 'Passwords do not match.'), true);
            return;
        }
        setRecoveryStatus(at('msg.saving', 'Saving…'));
        if (await isPasswordPwned(password)) {
            setRecoveryStatus(at('auth.st.weakPwned', 'This password has appeared in a known data breach — please pick a different one.'), true);
            return;
        }
        const { error } = await client.auth.updateUser({ password: password });
        if (error) {
            setRecoveryStatus(authError(error), true);
            return;
        }
        recoveryMode = false;
        setRecoveryStatus('');
        document.getElementById('authRecoveryPassword').value = '';
        document.getElementById('authRecoveryPassword2').value = '';
        renderModalState();
        if (typeof showToast === 'function') showToast(window.t ? t('msg.passwordUpdatedSignedIn') : 'Password updated — you are signed in.');
    }

    // Upitnik nakon prve OAuth-prijave: sesija VEĆ postoji → updateUser, ne signUp.
    async function handleQuest(e) {
        e.preventDefault();
        if (!client || !currentUser) return;
        const type = (document.querySelector('input[name="authQType"]:checked') || {}).value;
        const school = document.getElementById('authQSchool').value;
        const consent = document.getElementById('authQConsent').checked;
        setQuestStatus(at('msg.saving', 'Saving…'));
        const { error } = await client.auth.updateUser({ data: buildQuestData(type, school, consent) });
        if (error) { setQuestStatus(authError(error), true); return; }
        questMode = false;
        setQuestStatus('');
        closeModal();
        if (typeof showToast === 'function') showToast(at('auth.q.thanks', 'Thanks — welcome to Sokrat!'));
    }

    // „Preskoči" SVEJEDNO piše biljeg (questionnaire_done, mail_consent:false) — bez njega
    // bi se upitnik vraćao na SVAKOJ OAuth-prijavi, a „ne" na pristanak MORA biti zapamćen.
    async function skipQuest() {
        questMode = false;
        closeModal();
        if (!client || !currentUser) return;
        await client.auth.updateUser({
            data: { questionnaire_done: true, mail_consent: false, questionnaire_at: new Date().toISOString() }
        });
    }

    // Odjava je SAMO OVAJ UREĐAJ (F2/1 ④, Leon 14.09.): bez `scope` je supabase-js GLOBALAN i
    // odjava na mobitelu odjavi i računalo. Poslužitelj i dalje briše sesiju ovog uređaja, a
    // `SIGNED_OUT` stiže kao i prije (theme.js briše lokalni izbor). Brane: signout-scope.test.js
    // + signout-local.authed.spec.js.
    async function signOut() {
        if (!client) return;
        await client.auth.signOut({ scope: 'local' });
        closeModal();
        if (typeof showToast === 'function') showToast(window.t ? t('msg.signedOut') : 'Signed out. Progress stays on this device.');
    }

    // Gumb-oko za prikaz/sakrivanje lozinke — delegirano na document jer se
    // password polja renderiraju dinamički (auth modal + profil Change password).
    // Stoji UNUTAR modula (F3/2 cigla 4a) da ime gumba ide kroz `at()`; veže se pri učitavanju
    // skripte, kao i dok je stajao izvan modula.
    document.addEventListener('click', function (e) {
        const btn = e.target.closest('.auth-pass-toggle');
        if (!btn) return;
        const input = btn.parentElement.querySelector('input');
        if (!input) return;
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        btn.setAttribute('aria-label', show ? at('auth.hidePassword', 'Hide password') : at('auth.showPassword', 'Show password'));
        const icon = btn.querySelector('i');
        if (icon) icon.className = show ? 'fas fa-eye-slash' : 'fas fa-eye';
    });

    // ---------- Javno API (koriste cloud-sync.js i profile.js) ----------

    return {
        init: init,
        getClient: function () { return client; },
        getUser: function () { return currentUser; },
        getDisplayName: getDisplayName,
        onChange: function (fn) { changeListeners.push(fn); },
        authError: authError,
        // TEST-ŠAV (R1): čista funkcija za Playwright evaluate — FMTU prepoznavanje i
        // oblik metapodataka upitnika se testiraju bez prave prijave.
        buildQuestData: buildQuestData,
        openModal: openModal,
        signOut: signOut,
        setSyncInfo: function (text) {
            const el = document.getElementById('authSyncInfo');
            if (el) el.textContent = text;
            const p = document.getElementById('profileSyncStatus');
            if (p) p.textContent = text;
        }
    };
})();

document.addEventListener('DOMContentLoaded', function () {
    SokratAuth.init();
});
