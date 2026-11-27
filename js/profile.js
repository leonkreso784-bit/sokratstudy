// ===== SOKRAT STUDY — PROFILE PAGE =====
//
// Renderira #profile-page za prijavljenog korisnika: račun, sync status,
// pregled napretka po predmetu (iz localStorage) i GDPR akcije.
// Ulaz: klik na bilo koji .auth-entry gumb kad je korisnik prijavljen (js/auth.js).

// Lokalni i18n helper: t() ako postoji, inače fallback (engleski original).
// ⚠️ `t()` vraća SAM KLJUČ kad prijevoda nema → bez ove provjere korisnik vidi
// sirovo „admin.openStudio". Isti obrazac kao studio.js/my-materials.js.
function pt(key, fb) {
    if (!window.t) return fb;
    const v = t(key);
    return (v === key) ? fb : v;
}

// ── BIRAČ TEMA (Leon, 2026-09-01: „u profilu") ──────────────────────────────
// Tema je svojstvo UREĐAJA (localStorage, js/theme.js) — zato se kartica crta
// i neprijavljenom korisniku, a izbor ne ide ni u kakav profil na serveru.
function themeCardHtml() {
    // Aktivan je IZBOR, ne primijenjena tema (F1/3): „Automatski" na tamnom uređaju crta
    // `carbon`, a izabrano je — ništa. Bez `theme.js` (stranica bez teme) pada na atribut.
    const cur = window.getThemeChoice ? getThemeChoice() : document.documentElement.getAttribute('data-theme');
    const imena = {
        auto: pt('profile.themeAuto', 'Automatic'),
        academic: pt('profile.themeAcademic', 'Academic blue'),
        chalk: pt('profile.themeChalk', 'Chalkboard'),
        mint: pt('profile.themeMint', 'Mint'),
        carbon: pt('profile.themeCarbon', 'Carbon')
    };
    // Imena klasa DOSLOVNO, ne sastavljena ('--' + ime): skener siročadi (check:orphan-css)
    // čita izvor, ne runtime — ista logika zbog koje ADR-028 zabranjuje dinamičke klase.
    const swatch = {
        auto: 'theme-option-swatch--auto',
        academic: 'theme-option-swatch--academic',
        chalk: 'theme-option-swatch--chalk',
        mint: 'theme-option-swatch--mint',
        carbon: 'theme-option-swatch--carbon'
    };
    // Popis tema je SAMO u boot.js (jedna istina); bez njega ovdje nema što ponuditi.
    const teme = ['auto'].concat(window.SOKRAT_THEMES || []);
    /* ⚠️ NATPIS „Automatski" NE NOSI SUFIKS (Leon, 2026-09-06, §6/7 → odluka (a):
       „glupo je imati ovu Automatic · Carbon, uopće ne kužim koji je smisao toga").
       F1/3 je gumbu dopisivao ` · ` + ime teme koju uređaj TRENUTNO bira, uz obrazloženje
       „inače je gumb obećanje bez sadržaja" — ali na tamnom telefonu je time glasio
       „Automatic · Carbon" i čitao se kao PETA tema, dakle kao duplikat Carbona koji stoji
       odmah do njega. Što gumb radi kaže opis iznad birača (`profile.appearanceDesc`:
       „Automatski prati uređaj, kao i naši mailovi") — jedno mjesto, ne dva.
       Gumb OSTAJE: on je jedini način da se jednom napravljen izbor poništi i da se
       praćenje uređaja vrati. Brana: `tests/unit/theme-picker-label.test.js`. */
    let gumbi = '';
    for (let i = 0; i < teme.length; i++) {
        const ime = teme[i];
        const naziv = imena[ime] || ime;
        gumbi += '<button type="button" class="theme-option" data-theme-pick="' + ime + '"' +
            ' aria-pressed="' + (ime === cur ? 'true' : 'false') + '">' +
            '<span class="theme-option-swatch ' + (swatch[ime] || '') + '" aria-hidden="true"></span>' +
            '<span>' + naziv + '</span></button>';
    }
    return '<div class="profile-card profile-card--wide">' +
        '<h3 class="profile-card-title"><i class="fas fa-palette"></i> ' + pt('profile.appearance', 'Appearance') + '</h3>' +
        // ⚠️ Rezervni tekst mora reći ISTO što i rječnik: otkako natpis nema sufiksa, ovo je
        // JEDINO mjesto koje kaže da „Automatski" prati uređaj. Stari fallback („Pick a
        // theme…") to nije spominjao, pa bi stranica bez `i18n.js` gumb ostavila neobjašnjenim.
        '<p class="profile-meta">' + pt('profile.appearanceDesc', 'Automatic follows your device, like our emails. When you are signed in, your pick follows your account; otherwise it stays on this device.') + '</p>' +
        '<div class="theme-picker">' + gumbi + '</div>' +
        '</div>';
}

function wireThemePicker(root) {
    root.querySelectorAll('[data-theme-pick]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (!window.setTheme || !setTheme(btn.dataset.themePick)) return;
            root.querySelectorAll('[data-theme-pick]').forEach(function (b) {
                b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
            });
        });
    });
}

// ── SPREMIŠTE IDENTITETA (F2/3b, 2026-09-09) ─────────────────────────
// Ime i opis žive u `public.profile_identity` — zasebna tablica, owner-RLS, upis samo
// kroz `set_profile_identity` RPC. ⚠️ NE u `profiles`: iz nje čita `is_admin()`, pa bi
// pravo na upis vlastitog imena ondje otvorilo i vrata prema `role`. Puni ZAŠTO stoji u
// `supabase/f2-profile-identity.sql`.
//
// ⚠️ REZERVNI PUT (`user_metadata`) NIJE PRIVREMENA SKELA I NE BRIŠE SE — dva razloga:
//   ① PRODUKCIJA ovu tablicu (još) NEMA; migracija ide uz Leonov izričit OK. Isti kod
//     vozi ondje, pa se profil ne smije srediti u prazan ekran zato što baza nije migrirana.
//   ② `signUp` i dalje piše ime u `user_metadata`, pa NOVI račun tablicu nema dok jednom
//     ne spremi profil.
let _identity = null;        // red iz baze (ili `{}` kad ga nema), `null` = nemamo ga
let _identityFor = null;     // za kojeg korisnika keš vrijedi

/** Ime i opis za crtanje: baza ako je stigla, inače `user_metadata`. */
function identityOf(user) {
    const meta = user.user_metadata || {};
    const red = (_identityFor === user.id && _identity) ? _identity : null;
    // OAuth (R1) ne piše `display_name` nego `full_name`/`name` — isti redoslijed kao auth.js.
    return {
        name: String((red && red.display_name) || meta.display_name || meta.full_name || meta.name || '').trim(),
        bio: String((red && red.bio) || meta.bio || '').trim(),
        // Slike (F2/2) žive SAMO u tablici — JWT ih nema, pa prvi kadar crta ikonu, a red ih donese.
        avatar: String((red && red.avatar_path) || ''),
        cover: String((red && red.cover_path) || ''),
        // Temelj mreže (A1): korisničko ime živi SAMO u tablici i nije obavezno — prazno = nema ga.
        handle: String((red && red.handle) || '')
    };
}

/**
 * F6 ①/2b — SMIJEMO LI OD OVOG KORISNIKA TRAŽITI „TRENUTNU LOZINKU"?
 *
 * Polje ide samo onome tko lozinku IMA. Tko je došao Googleom nema što upisati, a tražiti mu to
 * znači zatvoriti mu jedini put do lozinke — isti razred kvara koji cijela cigla sprječava
 * (postavka bez polja ruši promjenu lozinke svima).
 *
 * ⚠️ IZMJERENO 21.09. na stagingu, i nalaz je NEGATIVAN: `app_metadata.providers` i `identities`
 * NE razlikuju račun BEZ lozinke od onoga s njom — korisnik kojeg admin API napravi bez lozinke
 * svejedno dobije identitet `email` (oba puta `{"providers":["email"],"identities":["email"]}`).
 * Zato ovo NIJE provjera „ima li hash" nego „je li ovo račun s e-mail putem": naši putovi upisa
 * (registracija, oporavak) lozinku uvijek postave, a Google-račun identitet `email` nema.
 */
function imaLozinku(user) {
    if (!user) return false;
    const identiteti = user.identities;
    if (Array.isArray(identiteti) && identiteti.length) {
        return identiteti.some(function (i) { return i && i.provider === 'email'; });
    }
    // Rezerva kad `identities` nije u objektu (npr. korisnik složen samo iz JWT-a).
    const am = user.app_metadata || {};
    const lista = Array.isArray(am.providers) ? am.providers : (am.provider ? [am.provider] : []);
    return lista.indexOf('email') !== -1;
}

// ── SLIKE (F2/2, 2026-09-13) ─────────────────────────────────────────────────
// Putanja iz baze → javni URL preko `SokratProfileImages.publicUrl` (bucket je javan,
// Leon 09.09.). URL ide u `src` atribut, dakle u innerHTML: prolazi kroz escape I kroz
// provjeru sheme — samo `https://` (Supabase je uvijek https; `SokratBlocks.safeUrl` nije
// učitan na profilu jer živi u paketu `study`, pa je ovdje stroža, uža provjera).
function profileImageUrl(path) {
    if (!path || !window.SokratProfileImages) return '';
    const url = SokratProfileImages.publicUrl(path);
    return (typeof url === 'string' && /^https:\/\//.test(url)) ? url : '';
}
function coverInnerHtml(url) {
    return url ? '<img class="profile-cover-img" src="' + escapeHtmlProfile(url) + '" alt="">' : '';
}
function avatarInnerHtml(url) {
    return url ? '<img class="profile-avatar-img" src="' + escapeHtmlProfile(url) + '" alt="">'
               : '<i class="fas fa-user-graduate"></i>';
}
// Promjena slike živi NA SLICI (Leon 13.09.: „plus na profilnoj… kao Facebook"); u formi ostaje
// samo „Ukloni", i to samo dok slika postoji — inače bi red bio natpis bez radnje.
function imageRowHtml(kind, path) {
    const label = kind === 'avatar' ? pt('profile.avatarLabel', 'Profile photo') : pt('profile.coverLabel', 'Cover image');
    return '<div class="profile-edit-image-row" data-image-kind="' + kind + '"' + (path ? '' : ' hidden') + '>' +
        '  <span class="profile-meta">' + label + '</span>' +
        '  <button type="button" class="cta-button secondary profile-img-remove" data-image-kind="' + kind + '"><i class="fas fa-trash-can"></i><span>' + pt('profile.imgRemove', 'Remove') + '</span></button>' +
        '</div>';
}
/** Okrugli „+" na portretu (Facebook-obrazac): 44×44 dodirna meta, ikona kamere. */
function avatarButtonHtml() {
    return '<button type="button" class="profile-avatar-btn profile-img-change" data-image-kind="avatar"' +
        ' aria-label="' + pt('profile.avatarChange', 'Change profile photo') + '"><i class="fas fa-camera"></i></button>';
}
/** Gumb na naslovnoj (dolje desno); na telefonu samo ikona, natpis nosi `aria-label`. */
function coverButtonHtml() {
    return '<button type="button" class="cta-button secondary profile-cover-btn profile-img-change" data-image-kind="cover"' +
        ' aria-label="' + pt('profile.coverChange', 'Edit cover image') + '"><i class="fas fa-camera"></i><span>' + pt('profile.coverChange', 'Edit cover image') + '</span></button>';
}

/** Osvježi slike na zidu U MJESTU — bez `renderProfilePage`, da otvorena forma preživi. */
function refreshWallImages(user) {
    const id = identityOf(user);
    const cover = document.querySelector('#profileContent .profile-cover .profile-cover-media');
    const avatar = document.querySelector('#profileContent .profile-avatar');
    if (cover) cover.innerHTML = coverInnerHtml(profileImageUrl(id.cover));
    if (avatar) avatar.innerHTML = avatarInnerHtml(profileImageUrl(id.avatar));
    document.querySelectorAll('#profileContent .profile-edit-image-row').forEach(function (row) {
        const kind = row.getAttribute('data-image-kind');
        row.hidden = !(kind === 'avatar' ? id.avatar : id.cover);
    });
}

/** Kod greške iz `js/profile-images.js` → tekst za korisnika (jedino mjesto s tekstom). */
function imageErrorText(err) {
    const code = String((err && err.message) || '');
    if (code === 'image_decode_failed') return pt('profile.imgErrDecode', 'Could not read that file — choose a JPG, PNG or WebP image.');
    if (code === 'auth_required') return pt('profile.imgErrAuth', 'Sign in again to change your photo.');
    return pt('profile.imgErrUpload', 'Could not save the photo: ') + code;
}

/** Promijeni ili ukloni sliku (klik u „Uredi profil"). `remove` = true → ukloni. */
async function changeProfileImage(kind, remove) {
    const user = (typeof SokratAuth !== 'undefined') ? SokratAuth.getUser() : null;
    const status = document.getElementById('profileEditStatus');
    if (!user || !status || !window.SokratProfileImages) return;
    const stara = identityOf(user)[kind] || null;

    let file = null;
    if (!remove) {
        file = await SokratProfileImages.pick();
        if (!file) return;                                 // odustao — ništa se ne mijenja
        // IZREZ (Leon 13.09.): korisnik bira što ostaje. Bez croppera (paket nije stigao) ide cijela
        // slika, smanjena — bolje nego blokirati promjenu.
        if (window.SokratImageCrop) {
            const k = SokratProfileImages.KINDS[kind];
            try {
                file = await SokratImageCrop.open(file, {
                    aspect: k.aspect, output: k.output, round: k.round,
                    title: kind === 'avatar' ? pt('profile.cropTitleAvatar', 'Adjust profile photo') : pt('profile.cropTitleCover', 'Adjust cover image')
                });
            } catch (err) {
                status.hidden = false;
                status.classList.add('is-error');
                status.textContent = imageErrorText(err);
                return;
            }
            if (!file) return;                             // odustao u izrezu
        }
    }

    status.hidden = false;
    status.classList.remove('is-error');
    status.textContent = pt('profile.imgUploading', 'Uploading photo…');
    try {
        const red = remove
            ? await SokratProfileImages.remove(kind, stara)
            : await SokratProfileImages.upload(kind, file, { oldPath: stara });
        _identityFor = user.id;
        _identity = Object.assign({}, _identity || {}, red || {});
        status.hidden = true;
        status.textContent = '';
        refreshWallImages(user);
        if (typeof showToast === 'function') {
            showToast(remove ? pt('profile.imgRemoved', 'Photo removed.') : pt('profile.imgSaved', 'Photo updated.'));
        }
    } catch (err) {
        status.classList.add('is-error');
        status.textContent = imageErrorText(err);
    }
}

/** Dohvati red identiteta pa PONOVNO nacrtaj. Tiše pada nego što ruši stranicu. */
async function loadIdentity(user) {
    const client = (typeof SokratAuth !== 'undefined') ? SokratAuth.getClient() : null;
    // Keš se označi kao popunjen i kad dohvat NE uspije — inače bi svako crtanje otvorilo
    // novi krug prema bazi (i, preko `renderProfilePage`, beskonačnu petlju).
    if (!client) { _identityFor = user.id; _identity = null; return; }
    const prije = identityOf(user);
    let red = null;
    const citaj = (stupci) => client.from('profile_identity').select(stupci).eq('user_id', user.id).maybeSingle();
    try {
        let { data, error } = await citaj('display_name, bio, avatar_path, cover_path, handle');
        // ⚠️ Baza bez migracije „Temelj mreže" (PROD dok ju Leon ne pusti) nema stupac `handle` →
        // 42703. Bez ovog drugog pokušaja cijeli bi red pao na rezervni put i zid bi IZGUBIO
        // slike samo zato što je klijent stigao prije SQL-a.
        if (error && (error.code === '42703' || /handle/.test(error.message || ''))) {
            ({ data, error } = await citaj('display_name, bio, avatar_path, cover_path'));
        }
        red = error ? null : (data || {});
    } catch (err) {
        red = null;                       // tablice nema (PROD) → rezervni put
    }
    _identityFor = user.id;
    _identity = red;

    // F2/1 ③ SAMOPOPRAVAK: traka čita avatar iz JWT-a (`user_metadata.avatar_path`), baza je istina.
    // Razišli su se (slika postavljena prije F2/1, ili je zrcaljenje palo bez mreže) → vrati preslik.
    // Samo uz USPJEŠNO čitanje (`red` nije null): bez tablice ne znamo istinu, pa ništa ne diramo.
    if (red && window.SokratProfileImages && typeof SokratProfileImages.mirrorAvatar === 'function') {
        SokratProfileImages.mirrorAvatar(red.avatar_path || null);
    }

    // Crtaj PONOVNO samo ako bi se nešto promijenilo — inače svako otvaranje profila
    // baci jedan bespotreban bljesak (JWT i tablica se u pravilu SLAŽU).
    const poslije = identityOf(user);
    if (poslije.name === prije.name && poslije.bio === prije.bio
        && poslije.avatar === prije.avatar && poslije.cover === prije.cover
        && poslije.handle === prije.handle) return;

    // ⚠️ I onda — nikad preko čovjeka koji upravo piše. `renderProfilePage` prepisuje
    // `#profileContent`, a s njim i otvorenu formu i tekst u njoj. Izmjerila brana:
    // klik na „Uredi profil" → red stigne → forma nestane → sljedeći upis čeka polje
    // koje više ne postoji (test je visio do isteka od 120 s). Zid se osvježi kad zatvori.
    const forma = document.getElementById('profileEditForm');
    if (forma && !forma.hidden) { refreshWallImages(user); return; }

    renderProfilePage();
}

// ── ZID (F2/3a, 2026-09-09) ──────────────────────────────────
// Do danas je profil bio POPIS POSTAVKI: prvo što je korisnik vidio o sebi bio je
// gumb „Promijeni lozinku". Leon (2026-09-08): „profil mora biti na isti način kao
// i Facebook" — dakle prvo TKO SI I ŠTO SI NAPRAVIO, pa tek onda administracija.
//
// ⚠️ Naslovna i portret su PRAZNE PLOHE — sliku u njih stavlja F2/2 (bucket s
//    vlasničkim prefiksom, kao `node-images`). Ovdje se gradi OBLIK, ne sadržaj.
// ⚠️ Zid VLASTITOG GRADIVA (rešetka `nodes`) dolazi u F2/5 — mjesto mu je odmah
//    ispod identiteta, ondje gdje danas stoji poveznica na „Moje materijale".
function wallHtml(user, displayName, memberSince) {
    const id = identityOf(user);
    const opis = id.bio;
    return '<div class="profile-wall">' +
        '  <div class="profile-cover"><div class="profile-cover-media">' + coverInnerHtml(profileImageUrl(id.cover)) + '</div>' + coverButtonHtml() + '</div>' +
        '  <div class="profile-identity">' +
        '    <div class="profile-avatar-wrap"><div class="profile-avatar">' + avatarInnerHtml(profileImageUrl(id.avatar)) + '</div>' + avatarButtonHtml() + '</div>' +
        '    <div class="profile-identity-text">' +
        '      <h2 class="profile-name">' + escapeHtmlProfile(displayName || user.email || '') + '</h2>' +
        (id.handle ? '      <p class="profile-handle">@' + escapeHtmlProfile(id.handle) + '</p>' : '') +
        (displayName ? '      <p class="profile-meta profile-meta--sub">' + escapeHtmlProfile(user.email || '') + '</p>' : '') +
        '      <p class="profile-meta">' + pt('profile.memberSince', 'Member since ') + memberSince + '</p>' +
        '      <p class="profile-bio' + (opis ? '' : ' profile-bio--empty') + '">' +
        escapeHtmlProfile(opis || pt('profile.bioEmpty', 'No description yet.')) + '</p>' +
        '    </div>' +
        '    <div class="profile-identity-actions">' +
        '      <button type="button" class="cta-button secondary" id="profileEditBtn"><i class="fas fa-pen"></i><span>' + pt('profile.edit', 'Edit profile') + '</span></button>' +
        '    </div>' +
        '  </div>' +
        '  <form id="profileEditForm" class="profile-edit-form" hidden>' +
        '    <div class="profile-edit-images">' + imageRowHtml('avatar', id.avatar) + imageRowHtml('cover', id.cover) + '</div>' +
        '    <input type="text" id="profileEditName" class="auth-modal__input" maxlength="60" autocomplete="name"' +
        '      placeholder="' + pt('profile.editNamePh', 'Your name') + '"' +
        '      aria-label="' + pt('profile.editNamePh', 'Your name') + '"' +
        '      value="' + escapeHtmlProfile(displayName) + '">' +
        // Temelj mreže (A1): `@` je ukras ispred polja, ne dio vrijednosti (RPC ga ne bi propustio).
        '    <div class="profile-handle-field"><span class="profile-handle-at" aria-hidden="true">@</span>' +
        '      <input type="text" id="profileEditHandle" class="auth-modal__input" maxlength="20"' +
        '        autocomplete="username" autocapitalize="none" spellcheck="false"' +
        '        placeholder="' + pt('profile.handlePh', 'username') + '"' +
        '        aria-label="' + pt('profile.handleLabel', 'Username') + '" aria-describedby="profileEditHandleHint"' +
        '        value="' + escapeHtmlProfile(id.handle) + '"></div>' +
        '    <p class="profile-meta profile-handle-hint" id="profileEditHandleHint">' + pt('profile.handleHint', '3–20 characters: letters a–z, digits and _. You can change it once every 30 days.') + '</p>' +
        '    <textarea id="profileEditBio" class="auth-modal__input" maxlength="280" rows="3"' +
        '      placeholder="' + pt('profile.editBioPh', 'Short description') + '"' +
        '      aria-label="' + pt('profile.editBioPh', 'Short description') + '">' + escapeHtmlProfile(opis) + '</textarea>' +
        '    <p class="profile-edit-status" id="profileEditStatus" hidden></p>' +
        '    <div class="profile-actions">' +
        '      <button type="submit" class="cta-button primary"><i class="fas fa-check"></i><span>' + pt('profile.editSave', 'Save') + '</span></button>' +
        '      <button type="button" class="cta-button secondary" id="profileEditCancel"><i class="fas fa-xmark"></i><span>' + pt('profile.editCancel', 'Cancel') + '</span></button>' +
        '    </div>' +
        '  </form>' +
        '</div>';
}

// ── ZID GRADIVA (F2/5a) ─────────────────────────────────────────────────────
// Leon: profil pokazuje ŠTO SI NAPRAVIO — rešetka do 6 zadnje mijenjanih materijala, odmah ispod
// identiteta. Dodir = UČENJE (anketa 14.09.; uređivanje ide kroz radionicu, „⋯" u 5b). Stablo i
// polica i dalje žive SAMO na `#materials-page` (`#myMaterials` smije postojati samo ondje).
// Podatke daje `SokratMaterials.loadWall` (isti paket `profile`); boja je stalna po materijalu
// (`bojaMaterijala`, utils.js), tinta na njoj računata (`inkForTint`), ime kroz escape.
const SHELF_LIMIT = 6;
let _shelfSeq = 0;   // svaki crtež profila pokreće čitanje; kasni odgovor starijeg crteža se odbacuje
// ⚠️ ZADNJI ZID PO KORISNIKU. Profil se crta iznova na svaki `USER_UPDATED` — a birač teme stoji BAŠ
//    na profilu i svaki izbor piše u račun (F2/1). Bez ovoga je zid na svaki klik teme padao na
//    sive plohe i čitao bazu ispočetka (treptanje). Sad se zadnji zid nacrta ODMAH, a svježe
//    čitanje ga tiho zamijeni (`aria-busy` do tada ostaje `true` — sadržaj se osvježava).
let _shelfZadnji = null;   // { uid, wall }

function shelfHtml(uid) {
    const zadnji = (_shelfZadnji && _shelfZadnji.uid === uid) ? _shelfZadnji.wall : null;
    return '<section class="profile-shelf" aria-labelledby="profileShelfTitle">' +
        '  <div class="profile-shelf-head">' +
        '    <h3 class="profile-shelf-title" id="profileShelfTitle">' + pt('materials.title', 'My materials') + '</h3>' +
        '    <button type="button" class="profile-shelf-all" data-goto-materials' + (zadnji && zadnji.total ? '' : ' hidden') + '>' +
        '<span>' + pt('profile.shelfAll', 'All materials') + '</span><i class="fas fa-arrow-right" aria-hidden="true"></i></button>' +
        '  </div>' +
        '  <div class="profile-shelf-grid" id="profileShelf" aria-busy="true">' +
        (zadnji
            ? shelfInner(zadnji)
            : '    <span class="profile-tile profile-tile--skeleton" aria-hidden="true"></span>' +
              '    <span class="profile-tile profile-tile--skeleton" aria-hidden="true"></span>') +
        '  </div>' +
        '</section>';
}

/** Sadržaj rešetke za gotov zid: pločice, ili prazno stanje kad materijala nema. */
function shelfInner(wall) {
    if (!wall.total) {
        // Prazno stanje = ulaz u radionicu (ondje je „Novi materijal"). Isprekidana ploha bez
        // boje, kao ＋ pločica na naslovnici: prazno mjesto koje čeka, ne još jedan materijal.
        return '<button type="button" class="profile-tile profile-tile--make" data-goto-materials>' +
            '<span class="profile-tile-icon profile-tile-icon--make"><i class="fas fa-plus" aria-hidden="true"></i></span>' +
            '<span class="profile-tile-name">' + pt('profile.shelfEmpty', 'Make your first material') + '</span></button>';
    }
    return wall.items.map(shelfTileHtml).join('');
}

function shelfTileHtml(m) {
    return '<button type="button" class="profile-tile" data-shelf-learn="' + escapeHtmlProfile(m.id) + '"' +
        ' style="--tile-color:' + escapeHtmlProfile(m.color) + '">' +
        '<span class="profile-tile-icon" data-ink="' + inkForTint(m.color) + '">' +
        '<i class="fas ' + safeIcon(m.icon, 'fa-book-open') + '" aria-hidden="true"></i></span>' +
        '<span class="profile-tile-name">' + escapeHtmlProfile(m.name) + '</span>' +
        (m.folder
            ? '<span class="profile-tile-folder"><i class="fas fa-folder" aria-hidden="true"></i><span>' + escapeHtmlProfile(m.folder) + '</span></span>'
            : '') +
        '</button>';
}

async function fillShelf(uid) {
    const seq = ++_shelfSeq;
    const grid = document.getElementById('profileShelf');
    if (!grid) return;
    const M = window.SokratMaterials;
    let wall = null;
    let pao = false;
    try {
        if (!M || typeof M.loadWall !== 'function') throw new Error('materials-unavailable');
        wall = await M.loadWall(SHELF_LIMIT);
    } catch (e) {
        pao = true;
    }
    if (seq !== _shelfSeq) return;
    const g = document.getElementById('profileShelf');
    if (!g) return;
    g.setAttribute('aria-busy', 'false');
    const all = document.querySelector('.profile-shelf-all');
    if (pao) {
        // Već nacrtan zid (iz ove sesije) ostaje — neuspjelo OSVJEŽAVANJE ne briše ono što se vidi.
        if (_shelfZadnji && _shelfZadnji.uid === uid) return;
        g.innerHTML = '<div class="profile-shelf-state">' +
            '<p class="profile-meta">' + pt('profile.shelfError', 'Your materials did not load.') + '</p>' +
            '<button type="button" class="cta-button secondary" data-shelf-retry><i class="fas fa-rotate"></i><span>' +
            pt('materials.retry', 'Try again') + '</span></button></div>';
        return;
    }
    _shelfZadnji = { uid: uid, wall: wall };
    g.innerHTML = shelfInner(wall);
    if (all) all.hidden = !wall.total;
}

// ── OBAVIJESTI MAILOM (F2/4; Leon, anketa 15.09.: „prekidač u profilu") ─────────────────────
// Pristanak je korisnikov i živi u `user_metadata.mail_consent` (isti ključ koji piše upitnik R1 i
// koji `send-notification` čita) — PRAVI boolean, uz vrijeme i izvor (`mail_consent_at`/`_via`) kao
// trag izričitog izbora. Povlačenje mora biti jednako lako kao davanje (GDPR), a 4 od 5 računa na
// produkciji upitnik nikad nije vidjelo: bez prekidača se ne bi mogli ni prijaviti.
// ⚠️ Pristupačno ime = naslov + stanje (`aria-labelledby` na oba): samo „Uključeno" ne kaže ŠTO je
//    uključeno, a samo naslov bi se razišao s vidljivim tekstom gumba (axe „label-in-name").
function mailCardHtml(user) {
    const on = !!(user.user_metadata && user.user_metadata.mail_consent === true);
    return '  <div class="profile-card">' +
        '    <h3 class="profile-card-title" id="profileMailTitle"><i class="fas fa-envelope" aria-hidden="true"></i> ' + pt('profile.mailTitle', 'Email updates') + '</h3>' +
        '    <p class="profile-meta">' + pt('profile.mailDesc', 'Now and then we let you know about a new subject or an important change. No ads — every email has a one-click unsubscribe.') + '</p>' +
        '    <button type="button" class="mail-switch" id="profileMailSwitch" role="switch" aria-checked="' + (on ? 'true' : 'false') + '"' +
        ' aria-labelledby="profileMailTitle profileMailState">' +
        '<span class="mail-switch-track" aria-hidden="true"><span class="mail-switch-thumb"></span></span>' +
        '<span class="mail-switch-label" id="profileMailState">' + (on ? pt('profile.mailOn', 'On') : pt('profile.mailOff', 'Off')) + '</span></button>' +
        '  </div>';
}

/* ===== F6 ①/5 — POVEZANI AI-JEVI ============================================================
 * Korisnik je svom Claudeu/ChatGPT-u dao pristup vlastitom gradivu (MCP konektor). Do ove cigle
 * taj pristup NIJE mogao povući: nije bilo ni popisa ni prekidača.
 *
 * ⚠️ Tekst kaže „vrijedi odmah" tek od K/8 (15.10.). Do tada je prekid ubijao samo OBNOVU, a
 *    propusnica je radila do isteka (3600 s, izmjereno 20.09.) — pa je kartica govorila „još najviše
 *    sat vremena". Sad baza na svakom pozivu konektora traži živu sesiju (`_nacrt_pozivatelj`,
 *    `mcp_veza`; brana `npm run mcp:opoziv`). „Kroz Sokratov konektor" nije ukras: izravan REST mimo
 *    konektora i dalje do isteka vidi NAZIVE vlastitih čvorova. Istina stoji kao TRAJAN tekst u
 *    kartici, ne kao poruka koja nestane.
 *
 * ⚠️ Ime aplikacije dolazi iz DCR-a — registrirati ga može BILO TKO (ADR-038 ③), dakle to je
 *    tuđi tekst u našem `innerHTML`: ide kroz `escapeHtmlProfile`.
 */
function aiCardHtml() {
    return '  <div class="profile-card profile-card--wide" id="profileAiCard">' +
        '    <h3 class="profile-card-title"><i class="fas fa-robot" aria-hidden="true"></i> ' + pt('profile.aiTitle', 'Connected AI apps') + '</h3>' +
        '    <p class="profile-meta">' + pt('profile.aiDesc', 'AI apps you allowed to reach your own materials. They never see the public catalogue or anyone else’s materials.') + '</p>' +
        '    <div class="profile-ai" id="profileAiList" aria-busy="true"><p class="profile-meta">' + pt('profile.aiLoading', 'Loading…') + '</p></div>' +
        '  </div>';
}

/** Oblik odgovora `listGrants()` podnosi i polje i `{ grants: [...] }` — izmjereno je samo da radi. */
function aiGrantsIz(data) {
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.grants)) return data.grants;
    return [];
}

async function fillAiGrants() {
    const box = document.getElementById('profileAiList');
    if (!box) return;
    const client = (typeof SokratAuth !== 'undefined') ? SokratAuth.getClient() : null;
    const oauth = client && client.auth && client.auth.oauth;
    // Stariji SDK bez `auth.oauth` → kartica se ne pretvara u trajni „Loading…", nego nestane.
    if (!oauth || typeof oauth.listGrants !== 'function') {
        const card = document.getElementById('profileAiCard');
        if (card) card.hidden = true;
        return;
    }

    let veze = null;
    try {
        const r = await oauth.listGrants();
        if (r && r.error) throw r.error;
        veze = aiGrantsIz(r && r.data);
    } catch (e) {
        veze = null;
    }
    const b = document.getElementById('profileAiList');
    if (!b) return;
    b.setAttribute('aria-busy', 'false');

    if (veze === null) {
        b.innerHTML = '<p class="profile-meta">' + pt('profile.aiError', 'The list of connected apps did not load.') + '</p>' +
            '<div class="profile-actions"><button type="button" class="cta-button secondary" data-ai-retry>' +
            '<i class="fas fa-rotate"></i><span>' + pt('profile.aiRetry', 'Try again') + '</span></button></div>';
        return;
    }
    if (!veze.length) {
        b.innerHTML = '<p class="profile-meta">' + pt('profile.aiNone', 'No AI app is connected right now.') + '</p>';
        return;
    }

    const jezikDatuma = (typeof window.getUiLang === 'function' && window.getUiLang() === 'hr') ? 'hr-HR' : 'en-GB';
    b.innerHTML = veze.map(function (g) {
        const k = (g && g.client) ? g.client : {};
        const ime = escapeHtmlProfile(k.name || pt('profile.aiUnnamed', 'Unnamed app'));
        const kada = (g && g.granted_at)
            ? new Date(g.granted_at).toLocaleDateString(jezikDatuma, { day: 'numeric', month: 'long', year: 'numeric' })
            : '—';
        return '<div class="profile-ai-row">' +
            '<div class="profile-ai-who"><strong>' + ime + '</strong>' +
            '<span class="profile-meta">' + pt('profile.aiSince', 'Connected') + ' ' + escapeHtmlProfile(kada) + '</span></div>' +
            '<button type="button" class="cta-button secondary" data-ai-revoke="' + escapeHtmlProfile(k.id || '') + '">' +
            '<i class="fas fa-link-slash" aria-hidden="true"></i><span>' + pt('profile.aiRevoke', 'Disconnect') + '</span></button>' +
            '</div>';
    }).join('') +
        // Trajna istina, ne nestajuća poruka — v. mjerenje u zaglavlju odjeljka.
        '<p class="profile-meta profile-ai-note">' + pt('profile.aiNote', 'Disconnecting works at once: through the Sokrat connector the app can no longer read or change your materials.') + '</p>';
}

async function revokeAiGrant(clientId) {
    const client = (typeof SokratAuth !== 'undefined') ? SokratAuth.getClient() : null;
    const oauth = client && client.auth && client.auth.oauth;
    if (!oauth || !clientId) return;
    const ok = await window.askConfirm({
        title: pt('profile.aiRevokeTitle', 'Disconnect this app?'),
        message: pt('profile.aiRevokeAsk', 'From that moment it can no longer read or change your materials through the Sokrat connector.'),
        confirmText: pt('profile.aiRevoke', 'Disconnect'),
        danger: true
    });
    if (!ok) return;
    try {
        const r = await oauth.revokeGrant({ clientId: clientId });
        if (r && r.error) throw r.error;
    } catch (e) {
        if (typeof showToast === 'function') showToast(pt('profile.aiRevokeErr', 'Not disconnected — please try again.'));
        return;
    }
    if (typeof showToast === 'function') showToast(pt('profile.aiRevoked', 'Disconnected.'));
    fillAiGrants();
}

async function toggleMailConsent(btn) {
    const client = (typeof SokratAuth !== 'undefined') ? SokratAuth.getClient() : null;
    if (!client || btn.disabled) return;
    const on = btn.getAttribute('aria-checked') !== 'true';
    const oznaka = document.getElementById('profileMailState');
    const postavi = function (v) {
        btn.setAttribute('aria-checked', v ? 'true' : 'false');
        if (oznaka) oznaka.textContent = v ? pt('profile.mailOn', 'On') : pt('profile.mailOff', 'Off');
    };
    postavi(on);                         // odmah vidljivo; poslužitelj potvrđuje ispod
    btn.disabled = true;
    let greska = null;
    try {
        const r = await client.auth.updateUser({ data: { mail_consent: on, mail_consent_at: new Date().toISOString(), mail_consent_via: 'profile' } });
        greska = r && r.error;
    } catch (e) { greska = e; }
    btn.disabled = false;
    if (greska) {
        postavi(!on);
        if (typeof showToast === 'function') showToast(pt('profile.mailErr', 'Not saved — please try again.'));
        return;
    }
    if (typeof showToast === 'function') {
        showToast(on ? pt('profile.mailOnToast', 'You will get email updates.') : pt('profile.mailOffToast', 'Email updates are off.'));
    }
}

function renderProfilePage() {
    const root = document.getElementById('profileContent');
    if (!root) return;

    const user = (typeof SokratAuth !== 'undefined') ? SokratAuth.getUser() : null;

    if (!user) {
        root.innerHTML =
            '<div class="profile-card profile-card--center">' +
            '  <div class="profile-empty-icon"><i class="fas fa-user-lock"></i></div>' +
            '  <h2>' + pt('profile.notSignedIn', 'You are not signed in') + '</h2>' +
            '  <p>' + pt('profile.signInToBackup', 'Sign in to back up your progress and study on any device.') + '</p>' +
            '  <button type="button" class="cta-button primary" id="profileSignInBtn"><i class="fas fa-user"></i><span>' + pt('auth.signIn', 'Sign in') + '</span></button>' +
            '</div>' +
            themeCardHtml();
        const btn = document.getElementById('profileSignInBtn');
        if (btn) btn.addEventListener('click', function () { SokratAuth.openModal(); });
        wireThemePicker(root);
        return;
    }

    const created = user.created_at ? new Date(user.created_at) : null;
    // F3/2 cigla 4c: mjesec je bio engleski i na hrvatskom sučelju („Član od 9 July 2026").
    const jezikDatuma = (typeof window.getUiLang === 'function' && window.getUiLang() === 'hr') ? 'hr-HR' : 'en-GB';
    const memberSince = created
        ? created.toLocaleDateString(jezikDatuma, { day: 'numeric', month: 'long', year: 'numeric' })
        : '—';
    // Ime iz `profile_identity`, s `user_metadata` kao rezervom; nema ni jednog → email kao naslov.
    const displayName = identityOf(user).name;

    root.innerHTML =
        '<div class="profile-stack">' +

        wallHtml(user, displayName, memberSince) +
        shelfHtml(user.id) +

        // Granica: sve ispod ovog naslova je ADMINISTRACIJA. Prije F2/3a je bila prva
        // stvar na stranici, pa je profil čitao kao popis postavki, a ne kao osoba.
        '<h3 class="profile-settings-title">' + pt('profile.settings', 'Settings') + '</h3>' +
        '<div class="profile-grid grid gap-4">' +

        '  <div class="profile-card">' +
        '    <h3 class="profile-card-title"><i class="fas fa-user"></i> ' + pt('profile.account', 'Account') + '</h3>' +
        '    <p class="profile-meta">' + escapeHtmlProfile(user.email || '') + '</p>' +
        '    <div class="profile-actions">' +
        '      <button type="button" class="cta-button secondary" id="profileChangePassBtn"><i class="fas fa-key"></i><span>' + pt('profile.changePassword', 'Change password') + '</span></button>' +
        '      <button type="button" class="cta-button secondary" id="profileSignOutBtn"><i class="fas fa-sign-out-alt"></i><span>' + pt('profile.signOut', 'Sign out') + '</span></button>' +
        '    </div>' +
        '    <form id="profileChangePassForm" class="profile-pass-form" hidden>' +
        // F6 ①/2b: „Trenutna lozinka" ide PRVA i samo korisniku koji lozinku ima (`imaLozinku`).
        // `autocomplete="current-password"` je ovdje mjera, ne ukras: bez njega upravitelj lozinki
        // u isto polje nudi NOVU. Bez `minlength` — zatečena lozinka smije biti kraća od današnjeg
        // praga; provjerava je poslužitelj, ne preglednik.
        (imaLozinku(user)
            ? '      <div class="auth-pass-wrap">' +
              '        <input type="password" id="profileCurrentPassword" class="auth-modal__input" placeholder="' + pt('profile.currentPassPlaceholder', 'Current password') + '" required autocomplete="current-password">' +
              '        <button type="button" class="auth-pass-toggle" aria-label="' + pt('auth.showPassword', 'Show password') + '"><i class="fas fa-eye"></i></button>' +
              '      </div>'
            : '') +
        '      <div class="auth-pass-wrap">' +
        '        <input type="password" id="profileNewPassword" class="auth-modal__input" placeholder="' + pt('profile.newPassPlaceholder', 'New password (min. 8 characters)') + '" required minlength="8" autocomplete="new-password">' +
        '        <button type="button" class="auth-pass-toggle" aria-label="' + pt('auth.showPassword', 'Show password') + '"><i class="fas fa-eye"></i></button>' +
        '      </div>' +
        '      <div class="auth-pass-wrap">' +
        '        <input type="password" id="profileNewPassword2" class="auth-modal__input" placeholder="' + pt('profile.repeatNewPass', 'Repeat new password') + '" required minlength="8" autocomplete="new-password">' +
        '        <button type="button" class="auth-pass-toggle" aria-label="' + pt('auth.showPassword', 'Show password') + '"><i class="fas fa-eye"></i></button>' +
        '      </div>' +
        '      <button type="submit" class="cta-button primary"><i class="fas fa-check"></i><span>' + pt('profile.saveNewPass', 'Save new password') + '</span></button>' +
        '      <p class="profile-pass-status" id="profilePassStatus" hidden></p>' +
        '    </form>' +
        '  </div>' +

        mailCardHtml(user) +
        aiCardHtml() +

        // Admin (F4) — renderira se skriveno; SokratAdmin.refresh() ga otkrije samo adminu.
        '  <div class="profile-card profile-card--wide admin-only" style="display:none">' +
        '    <h3 class="profile-card-title"><i class="fas fa-user-shield"></i> ' + pt('admin.title', 'Admin') + '</h3>' +
        '    <p class="profile-meta">' + pt('admin.desc', 'Edit study content directly. Every change is versioned and can be undone.') + '</p>' +
        '    <div class="profile-actions">' +
        // T6: editor je VLASTITI DOKUMENT (`editor.html`), pa ulaz više nije gumb koji mijenja
        // sekciju nego POVEZNICA. Time se ne dobiva samo ispravna semantika: poveznica se smije
        // otvoriti u novoj kartici, kopirati i vidjeti prije klika — gumb ništa od toga ne nudi.
        '      <a class="cta-button primary" href="editor.html"><i class="fas fa-wand-magic-sparkles"></i><span>' + pt('admin.openStudio', 'Studio editor') + '</span></a>' +
        '      <a class="cta-button secondary" href="editor.html?view=admin"><i class="fas fa-pen-to-square"></i><span>' + pt('admin.editContent', 'Edit content') + '</span></a>' +
        // F2/4 (Leon, anketa 15.09.): obavijest se piše OVDJE — admin-kartica je već jedino mjesto
        // koje vidi samo admin; prozor crta `js/mail-admin.js` (paket `profile`).
        '      <button type="button" class="cta-button secondary" data-mail-admin><i class="fas fa-paper-plane"></i><span>' + pt('mail.adminOpen', 'Send a notification') + '</span></button>' +
        '    </div>' +
        '  </div>' +

        '  <div class="profile-card">' +
        '    <h3 class="profile-card-title"><i class="fas fa-cloud"></i> ' + pt('profile.cloudSync', 'Cloud sync') + '</h3>' +
        '    <p class="profile-meta" id="profileSyncStatus">' + pt('profile.syncAuto', 'Your progress is backed up automatically while you study.') + '</p>' +
        '    <div class="profile-actions">' +
        '      <button type="button" class="cta-button secondary" id="profileSyncNowBtn"><i class="fas fa-rotate"></i><span>' + pt('profile.syncNow', 'Sync now') + '</span></button>' +
        '    </div>' +
        '  </div>' +

        '  <div class="profile-card profile-card--wide">' +
        '    <h3 class="profile-card-title"><i class="fas fa-chart-line"></i> ' + pt('profile.progressOverview', 'Progress overview') + '</h3>' +
        '    <div class="profile-stats" id="profileStats"></div>' +
        '  </div>' +

        themeCardHtml() +

        '  <div class="profile-card profile-card--wide profile-card--danger">' +
        '    <h3 class="profile-card-title"><i class="fas fa-triangle-exclamation"></i> ' + pt('profile.privacyData', 'Privacy & data') + '</h3>' +
        '    <p class="profile-meta">' + pt('profile.deleteDesc', 'Delete all study progress stored in the cloud — progress saved on this device stays.') +
        ' <a href="privacy.html">' + pt('footer.privacy', 'Privacy Policy') + '</a>.</p>' +
        '    <div class="profile-actions">' +
        '      <button type="button" class="profile-danger-btn" id="profileDeleteCloudBtn"><i class="fas fa-trash"></i><span>' + pt('profile.deleteCloud', 'Delete cloud data') + '</span></button>' +
        '    </div>' +
        // GDPR čl. 17 — brisanje računa je NEPOVRATNO, pa ima vlastiti odjeljak i vlastiti tijek.
        '    <hr class="profile-danger-sep">' +
        '    <p class="profile-meta">' + pt('profile.deleteAccountDesc', 'Delete your account permanently. Everything goes: your progress, your materials and their images. This cannot be undone.') + '</p>' +
        '    <div class="profile-actions">' +
        '      <button type="button" class="profile-danger-btn profile-danger-btn--hard" id="profileDeleteAccountBtn"><i class="fas fa-user-slash"></i><span>' + pt('profile.deleteAccount', 'Delete account') + '</span></button>' +
        '    </div>' +
        '    <form class="profile-delete-form" id="profileDeleteAccountForm" hidden>' +
        '      <input type="text" id="profileDeleteConfirm" class="auth-modal__input" autocomplete="off" spellcheck="false"' +
        '        placeholder="' + pt('profile.deleteAccountType', 'Type DELETE to confirm') + '"' +
        '        aria-label="' + pt('profile.deleteAccountType', 'Type DELETE to confirm') + '">' +
        '      <p class="profile-delete-status" id="profileDeleteStatus" hidden></p>' +
        '      <button type="submit" class="profile-danger-btn profile-danger-btn--hard" id="profileDeleteAccountGo">' + pt('profile.deleteAccountGo', 'Delete my account forever') + '</button>' +
        '    </form>' +
        '  </div>' +

        '</div>' +
        '</div>';

    renderProfileStats();
    fillShelf(user.id);
    fillAiGrants();
    // Zid se crta asinkrono i ponovno pri svakom crtežu profila → JEDAN delegat na `#profileContent`
    // (on sam preživi `innerHTML`). „Svi materijali" i prazna pločica idu kroz globalni
    // `[data-goto-materials]` (navigation.js).
    if (root.dataset.shelfBound !== '1') {
        root.dataset.shelfBound = '1';
        root.addEventListener('click', function (e) {
            const tile = e.target.closest('[data-shelf-learn]');
            if (tile) {
                if (window.SokratMaterials) SokratMaterials.learnNode(tile.getAttribute('data-shelf-learn'));
                return;
            }
            if (e.target.closest('[data-shelf-retry]')) { const u = SokratAuth.getUser(); fillShelf(u && u.id); return; }
            const sw = e.target.closest('#profileMailSwitch');
            if (sw) { toggleMailConsent(sw); return; }
            const opoziv = e.target.closest('[data-ai-revoke]');
            if (opoziv) { revokeAiGrant(opoziv.getAttribute('data-ai-revoke')); return; }
            if (e.target.closest('[data-ai-retry]')) { fillAiGrants(); return; }
            if (e.target.closest('[data-mail-admin]') && window.SokratMailAdmin) window.SokratMailAdmin.open();
        });
    }
    wireThemePicker(root);
    // Otkrij admin karticu samo adminu (RLS je prava zaštita; ovo je UX). Async re-check.
    if (window.SokratAdmin) SokratAdmin.refresh();
    // Moji materijali se od C0 montiraju na `#materials-page` (renderMaterialsPage), ne ovdje.

    document.getElementById('profileSignOutBtn').addEventListener('click', function () {
        SokratAuth.signOut();
    });
    document.getElementById('profileChangePassBtn').addEventListener('click', function () {
        const form = document.getElementById('profileChangePassForm');
        form.hidden = !form.hidden;
        // ①/2b: fokus ide na PRVO polje koje forma stvarno ima — korisnik bez lozinke
        // (Google) „Trenutnu lozinku" nema, pa bi zakucan `profileCurrentPassword` pukao.
        if (!form.hidden) {
            (document.getElementById('profileCurrentPassword')
                || document.getElementById('profileNewPassword')).focus();
        }
    });
    document.getElementById('profileChangePassForm').addEventListener('submit', changePassword);
    document.getElementById('profileSyncNowBtn').addEventListener('click', async function () {
        if (typeof CloudSync !== 'undefined') await CloudSync.pushNow();
        const el = document.getElementById('profileSyncStatus');
        if (el) el.textContent = window.t ? t('msg.syncedJustNow') : 'Synced just now — everything is backed up.';
        if (typeof showToast === 'function') showToast(window.t ? t('msg.progressSynced') : 'Progress synced to cloud');
    });
    document.getElementById('profileDeleteCloudBtn').addEventListener('click', deleteCloudData);
    document.getElementById('profileDeleteAccountBtn').addEventListener('click', function () {
        const form = document.getElementById('profileDeleteAccountForm');
        form.hidden = !form.hidden;
        if (!form.hidden) document.getElementById('profileDeleteConfirm').focus();
    });
    document.getElementById('profileDeleteAccountForm').addEventListener('submit', deleteAccount);

    document.getElementById('profileEditBtn').addEventListener('click', function () {
        const form = document.getElementById('profileEditForm');
        form.hidden = !form.hidden;
        if (!form.hidden) document.getElementById('profileEditName').focus();
    });
    document.getElementById('profileEditCancel').addEventListener('click', function () {
        document.getElementById('profileEditForm').hidden = true;
    });
    document.getElementById('profileEditForm').addEventListener('submit', saveProfileIdentity);
    // Slike (F2/2): gumbi žive u formi, ali NISU submit — promjena slike ne sprema ime.
    root.querySelectorAll('.profile-img-change').forEach(function (btn) {
        btn.addEventListener('click', function () { changeProfileImage(btn.getAttribute('data-image-kind'), false); });
    });
    root.querySelectorAll('.profile-img-remove').forEach(function (btn) {
        btn.addEventListener('click', function () { changeProfileImage(btn.getAttribute('data-image-kind'), true); });
    });

    // Prvi kadar crta ono što znamo bez mreže (JWT), pa se dopuni kad red stigne.
    if (_identityFor !== user.id) loadIdentity(user);
}

/**
 * F3/2 cigla 4c — PREKIDAČ JEZIKA NA PROFILU (kuka u `applyTranslations`). Profil je nacrtan
 * `innerHTML`-om, pa se na promjenu jezika mora nacrtati iznova — a to je zatvaralo otvorene forme i
 * brisalo ono što korisnik piše (novi opis, nova lozinka, upisani DELETE). Precrtava se ODMAH (pravilo
 * F3/2), a otvorene forme i upisano se vrate (načelo `data-touched` s naslovnice). Poruke stanja
 * („Spremam…", greška) se ne vraćaju: kratke su i ostale bi na starom jeziku.
 */
const FORME_PROFILA = ['profileEditForm', 'profileChangePassForm', 'profileDeleteAccountForm'];

function renderProfileText() {
    const root = document.getElementById('profileContent');
    if (!root) return;
    const otvorene = FORME_PROFILA.filter(function (id) {
        const f = document.getElementById(id);
        return !!f && !f.hidden;
    });
    const upisano = Array.prototype.map.call(
        root.querySelectorAll('form textarea[id], form input[id]:not([type="file"]):not([type="checkbox"]):not([type="radio"])'),
        function (el) { return { id: el.id, value: el.value }; });
    renderProfilePage();
    otvorene.forEach(function (id) {
        const f = document.getElementById(id);
        if (f) f.hidden = false;
    });
    upisano.forEach(function (u) {
        const el = document.getElementById(u.id);
        if (el) el.value = u.value;
    });
}

/** Kod iz `set_profile_handle` (supabase/f2-temelj-mreze.sql) → tekst za korisnika. */
function handleErrorText(err) {
    const m = String((err && err.message) || '');
    if (/^handle_invalid/.test(m)) return pt('profile.handleErrInvalid', 'Username: 3–20 characters — letters a–z, digits and _.');
    if (/^handle_reserved/.test(m)) return pt('profile.handleErrReserved', 'That username is reserved. Please pick another one.');
    if (/^handle_taken/.test(m)) return pt('profile.handleErrTaken', 'That username is already taken.');
    if (/^handle_cooldown/.test(m)) {
        const dan = /(\d{4}-\d{2}-\d{2})/.exec(m);
        return pt('profile.handleErrCooldown', 'You can change your username once every 30 days.') + (dan ? ' (' + dan[1] + ')' : '');
    }
    return m;
}

// F2/3b: izvor istine je `profile_identity`, upis ide kroz `set_profile_identity` RPC.
// RPC strukturno NE MOŽE dirati `role` — ta kolona stoji u drugoj tablici koju ne spominje.
async function saveProfileIdentity(e) {
    e.preventDefault();
    const client = (typeof SokratAuth !== 'undefined') ? SokratAuth.getClient() : null;
    const status = document.getElementById('profileEditStatus');
    const ime = document.getElementById('profileEditName');
    const opis = document.getElementById('profileEditBio');
    if (!client || !status || !ime || !opis) return;

    status.hidden = false;
    status.classList.remove('is-error');
    status.textContent = pt('msg.saving', 'Saving…');

    const novoIme = ime.value.trim();
    const noviOpis = opis.value.trim();

    // Temelj mreže (A1): korisničko ime ima VLASTITI RPC i vlastita pravila (oblik, rezervirano,
    // zauzeto, 30 dana). Ide PRVO — ako padne, ništa se ne sprema i korisnik ispravi baš to polje.
    // Šalje se samo kad se promijenilo, inače bi svako spremanje imena udaralo u pravilo 30 dana.
    const polje = document.getElementById('profileEditHandle');
    const korisnik = SokratAuth.getUser();
    if (polje && korisnik) {
        const trenutni = identityOf(korisnik).handle;
        const novi = polje.value.trim().replace(/^@/, '').toLowerCase();
        if (novi !== trenutni) {
            if (!novi) {
                status.classList.add('is-error');
                status.textContent = pt('profile.handleErrClear', 'A username can be changed, but not removed.');
                return;
            }
            const { data: hRed, error: hErr } = await client.rpc('set_profile_handle', { p_handle: novi });
            if (hErr) {
                status.classList.add('is-error');
                status.textContent = handleErrorText(hErr);
                polje.focus();
                return;
            }
            _identityFor = korisnik.id;
            _identity = Object.assign({}, _identity || {}, hRed || {});
        }
    }

    const { data: red, error: rpcErr } = await client.rpc('set_profile_identity', {
        p_display_name: novoIme, p_bio: noviOpis
    });
    // PostgREST za nepostojeću funkciju vraća PGRST202 — to je NEMIGRIRANA BAZA, ne kvar
    // unosa: tada spremanje pada na `user_metadata` umjesto da se tiho izgubi. Svaka druga
    // greška (duga polja, istekla sesija) je prava i pokazuje se korisniku.
    const rpcNedostaje = !!rpcErr && (rpcErr.code === 'PGRST202'
        || /find the function|does not exist/i.test(rpcErr.message || ''));
    if (rpcErr && !rpcNedostaje) {
        status.classList.add('is-error');
        status.textContent = rpcErr.message;
        return;
    }

    // ⚠️ `user_metadata` se upisuje I DALJE, i to nije zaboravljen duplikat: gornju traku
    // crta `SokratAuth.getDisplayName()`, koji čita JWT da za svako ime ne bi otvarao krug
    // prema bazi. Tablica je izvor istine, ovo je njezin IZVEDENI preslik — a jedini
    // upisivač tog preslika je ova funkcija.
    const { error: metaErr } = await client.auth.updateUser({ data: { display_name: novoIme, bio: noviOpis } });
    if (metaErr && rpcNedostaje) {
        status.classList.add('is-error');
        status.textContent = (typeof SokratAuth !== 'undefined' && SokratAuth.authError)
            ? SokratAuth.authError(metaErr) : metaErr.message;
        return;
    }

    // Osvježi LOKALNE kopije prije crtanja. `updateUser` vraća novog korisnika, ali
    // `SokratAuth.getUser()` ga dobiva tek kroz događaj `USER_UPDATED` — bez ovoga bi
    // prvi kadar poslije spremanja pokazao STARO ime, pa bi ga događaj naknadno zamijenio.
    const user = SokratAuth.getUser();
    if (user) {
        user.user_metadata = Object.assign({}, user.user_metadata, { display_name: novoIme, bio: noviOpis });
        _identityFor = user.id;
        _identity = rpcNedostaje ? null : (Array.isArray(red) ? red[0] : red);
    }
    renderProfilePage();
    if (typeof showToast === 'function') showToast(pt('profile.editSaved', 'Profile updated.'));
}

function renderProfileStats() {
    const holder = document.getElementById('profileStats');
    if (!holder || typeof subjectDataMap === 'undefined') return;

    let rows = '';
    let totalCards = 0, totalQuizzes = 0, totalFill = 0;

    Object.keys(subjectDataMap).forEach(function (id) {
        const meta = subjectDataMap[id];
        if (!meta.storageKey) return;
        let p = null;
        try { p = JSON.parse(localStorage.getItem(meta.storageKey) || 'null'); } catch (e) { p = null; }
        if (!p) return;

        // BUG-047: stari zapisi nose brojčane pozicije (šum) — broje se samo identiteti kartica.
        const cards = Array.isArray(p.flashcardsLearned)
            ? p.flashcardsLearned.filter(function (x) { return typeof x === 'string'; }).length : 0;
        const quizzes = Array.isArray(p.quizScores) ? p.quizScores.length : 0;
        const avg = quizzes > 0 ? Math.round(p.quizScores.reduce(function (a, b) { return a + b; }, 0) / quizzes) : null;
        const fill = p.fillSolved || 0;
        if (cards === 0 && quizzes === 0 && fill === 0) return;

        totalCards += cards; totalQuizzes += quizzes; totalFill += fill;

        rows +=
            '<div class="profile-stat-row">' +
            // BUG-025: ikona osobnog materijala dolazi iz korisnikovog retka → provjeri je (ide u
            // `class`, gdje escape nije dovoljan). Naziv je već escapan.
            '  <span class="profile-stat-subject"><i class="fas ' + profileIcon(meta.icon) + '"></i> ' + escapeHtmlProfile(meta.shortName || meta.name) + '</span>' +
            '  <span class="profile-stat-vals flex flex-wrap text-[0.85rem] text-ink-1">' +
            '    <span title="' + pt('profile.tip.cards', 'Flashcards learned') + '"><i class="fas fa-clone"></i> ' + cards + '</span>' +
            '    <span title="' + pt('profile.tip.quizzes', 'Quizzes taken') + '"><i class="fas fa-question-circle"></i> ' + quizzes + (avg !== null ? ' (' + pt('profile.avg', 'avg') + ' ' + avg + '%)' : '') + '</span>' +
            '    <span title="' + pt('profile.tip.fill', 'Fill-in exercises solved') + '"><i class="fas fa-pen"></i> ' + fill + '</span>' +
            '  </span>' +
            '</div>';
    });

    if (!rows) {
        holder.innerHTML = '<p class="profile-meta">' + pt('profile.noActivity', 'No study activity yet — open a subject and start learning!') + '</p>';
        return;
    }

    holder.innerHTML =
        '<div class="profile-stat-totals flex flex-wrap gap-4 mb-4">' +
        '  <div class="profile-total"><strong>' + totalCards + '</strong><span>' + pt('profile.cardsLearned', 'cards learned') + '</span></div>' +
        '  <div class="profile-total"><strong>' + totalQuizzes + '</strong><span>' + pt('profile.quizzesTaken', 'quizzes taken') + '</span></div>' +
        '  <div class="profile-total"><strong>' + totalFill + '</strong><span>' + pt('profile.fillSolved', 'fill-ins solved') + '</span></div>' +
        '</div>' + rows;
}

async function changePassword(e) {
    e.preventDefault();
    const client = (typeof SokratAuth !== 'undefined') ? SokratAuth.getClient() : null;
    if (!client) return;
    const input = document.getElementById('profileNewPassword');
    const repeat = document.getElementById('profileNewPassword2');
    const current = document.getElementById('profileCurrentPassword');
    const status = document.getElementById('profilePassStatus');
    if (!input || !repeat || !status) return;
    status.hidden = false;
    if (input.value !== repeat.value) {
        status.classList.add('is-error');
        status.textContent = window.t ? t('msg.passwordsNoMatch') : 'Passwords do not match.';
        return;
    }
    status.classList.remove('is-error');
    status.textContent = window.t ? t('msg.saving') : 'Saving…';
    // D4: procurjela lozinka se odbija i ovdje — ista provjera kao signup/recovery
    // (živi u auth.js: k-anonimnost, fail-open; typeof-guard za slučaj da auth nije učitan).
    if (typeof window.checkPwnedPassword === 'function' && await window.checkPwnedPassword(input.value)) {
        status.classList.add('is-error');
        status.textContent = window.t ? t('auth.st.weakPwned') : 'This password has appeared in a known data breach — please pick a different one.';
        return;
    }
    // F6 ①/2b — UZ NOVU LOZINKU ŠALJE SE I TRENUTNA.
    // ⚠️ Zakucani `supabase-js@2.110.8` `current_password` NE spominje ni jednom (0 pogodaka u
    // bundleu), ali `updateUser` cijeli objekt atributa šalje kao tijelo `PUT /auth/v1/user` —
    // IZMJERENO 21.09. na samom paketu, s kontrolnim izmišljenim poljem koje je prošlo jednako.
    // Ime polja je dakle jedino što vrijedi; TypeScript tip nije prepreka.
    // ⚠️ Dok je postavka „traži trenutnu lozinku" ISKLJUČENA, poslužitelj polje tiho ignorira
    // (izmjereno: i POGREŠNA vrijednost prolazi s HTTP 200) — zato ovaj upis ništa ne mijenja
    // dok se postavka ne uključi. Baš zato polje mora ići PRVO, a postavka tek za njim.
    const atributi = { password: input.value };
    if (current) atributi.current_password = current.value;
    const { error } = await client.auth.updateUser(atributi);
    if (error) {
        status.classList.add('is-error');
        // F3/2 cigla 4c: ista poruka kao u prozoru za prijavu — dotad je ovdje išla sirova i engleska.
        status.textContent = SokratAuth.authError(error);
        return;
    }
    status.hidden = true;
    input.value = '';
    repeat.value = '';
    if (current) current.value = '';
    document.getElementById('profileChangePassForm').hidden = true;
    if (typeof showToast === 'function') showToast(window.t ? t('msg.passwordUpdated') : 'Password updated.');
}

async function deleteCloudData() {
    const user = SokratAuth.getUser();
    const client = SokratAuth.getClient();
    if (!user || !client) return;

    const ok = await askConfirm({
        // Rezerva je do F3/2 cigle 4c tvrdila suprotno od rječnika („napredak na uređaju ostaje, bit ćeš
        // odjavljen") — brisanje od U2 ide i kroz uređaj, a korisnik ostaje prijavljen.
        message: pt('msg.confirmDeleteCloud', 'Delete ALL study progress — in the cloud and on this device? Your account stays. This cannot be undone.'),
        danger: true
    });
    if (!ok) return;

    // U2 (R1-UX): brisanje ide KROZ CloudSync.wipeAll — cloud + lokalno + snapshot, bez
    // odjave. Stara verzija je brisala samo cloud i odjavila korisnika, a union-merge je
    // pri sljedećoj prijavi sve vratio: brisanje koje se samo poništi (Leon, 2026-09-02).
    if (typeof CloudSync === 'undefined' || !CloudSync.wipeAll) return;
    const res = await CloudSync.wipeAll();
    if (!res.ok) {
        if (typeof showToast === 'function') showToast((window.t ? t('msg.deleteCloudFail') : 'Could not delete study history: ') + res.reason);
        return;
    }
    if (typeof showToast === 'function') showToast(window.t ? t('msg.cloudDataDeleted') : 'Study history deleted.');
    // Korisnik OSTAJE prijavljen; profil se osvježi da odmah pokaže prazno stanje.
    if (typeof renderProfilePage === 'function') renderProfilePage();
}

// ===== GDPR čl. 17 — self-service brisanje računa =====
//
// Do 2026-08-08 je ovdje pisalo „za brisanje računa pošalji mail" — na živom proizvodu s EU
// korisnicima to nije dovoljno. Privilegirani dio (`service_role`) NIKAD ne smije u klijent
// (ADR-016) → posao radi Edge Function `delete-account`, a ovdje je samo tijek pristanka.
//
// Dvostruka potvrda je namjerna i NIJE ista radnja dvaput: prvo se upiše riječ (obara slučajan
// klik i „samo sam htio vidjeti što je ovo"), pa tek onda ide danger-dijalog.

/** Riječ potvrde. NAMJERNO neprevedena — mora značiti isto na svakom jeziku sučelja. */
const DELETE_TOKEN = 'DELETE';

/**
 * Ključevi koji PREŽIVE brisanje računa: postavke uređaja, ne podaci o osobi.
 * Consent se čuva jer je i sam GDPR-artefakt (dokaz pristanka), a `sokrat-supabase-override`
 * je test-prekidač — brisanje bi razvalilo staging-sesiju usred testa.
 */
// ⚠️ Tema NIJE na popisu (F2/1): od kad prati račun, izbor pripada osobi, ne uređaju — odjava
// ga ionako briše (`theme.js`, SIGNED_OUT), a brisanje računa ne smije biti blaže od odjave.
const KEEP_LOCAL_KEYS = ['sokrat-ui-lang', 'sokrat-cookie-consent', 'sokrat-supabase-override'];

/**
 * Počisti SVE lokalne tragove korisnika. Allow-lista (a ne popis za brisanje) je namjerna:
 * napredak živi pod slobodnim ključevima (`<predmet>-progress`, `node:<uuid>`, `sokrat-draft:…`),
 * pa bi popis za brisanje neizbježno nešto propustio čim se doda nov ključ.
 */
function purgeLocalAccountData() {
    try {
        Object.keys(localStorage)
            .filter(function (k) { return KEEP_LOCAL_KEYS.indexOf(k) === -1; })
            .forEach(function (k) { localStorage.removeItem(k); });
    } catch (e) { /* private mode — nema što čistiti */ }
}

/**
 * Pravi razlog neuspjeha Edge Functiona.
 * `functions.invoke` na svaki ne-2xx vraća SAMO „Edge Function returned a non-2xx status code" —
 * tijelo s razlogom visi na `error.context` (Response). Bez ovoga bi admin koji pokuša obrisati
 * račun vidio tehničku besmislicu umjesto „administrator posjeduje slike javnog kataloga".
 */
async function _fnErrorReason(err) {
    const KNOWN = {
        admin_cannot_self_delete: pt('profile.deleteAccountAdmin',
            'An administrator cannot delete their own account — the public catalogue images belong to it.'),
        storage_purge_failed: pt('profile.deleteAccountStorage', 'Your images could not be removed. Nothing was deleted.'),
        missing_token: pt('profile.deleteAccountAuth', 'You are not signed in.'),
        unauthorized: pt('profile.deleteAccountAuth', 'You are not signed in.')
    };
    try {
        const ctx = err && err.context;
        if (ctx && typeof ctx.json === 'function') {
            const body = await ctx.clone().json();
            if (body && body.error && KNOWN[body.error]) return KNOWN[body.error];
            if (body && body.detail) return String(body.detail);
            if (body && body.error) return String(body.error);
        }
    } catch (e) { /* tijelo nije JSON — padni na poruku ispod */ }
    return (err && err.message) ? err.message : String(err);
}

function _deleteStatus(msg, isErr) {
    const el = document.getElementById('profileDeleteStatus');
    if (!el) return;
    el.textContent = msg || '';
    el.hidden = !msg;
    el.classList.toggle('is-error', !!isErr);
}

async function deleteAccount(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();

    const client = (typeof SokratAuth !== 'undefined') ? SokratAuth.getClient() : null;
    const user = (typeof SokratAuth !== 'undefined') ? SokratAuth.getUser() : null;
    if (!client || !user) return;

    const typed = (document.getElementById('profileDeleteConfirm').value || '').trim().toUpperCase();
    if (typed !== DELETE_TOKEN) {
        _deleteStatus(pt('profile.deleteAccountMismatch', 'Type DELETE exactly to confirm.').replace('DELETE', DELETE_TOKEN), true);
        return;
    }

    const ok = await askConfirm({
        title: pt('profile.deleteAccountTitle', 'Delete account permanently?'),
        message: pt('profile.deleteAccountConfirm', 'Your account, progress, materials and images will be deleted for good. This cannot be undone.'),
        confirmText: pt('profile.deleteAccount', 'Delete account'),
        danger: true
    });
    if (!ok) return;

    const btn = document.getElementById('profileDeleteAccountGo');
    if (btn) btn.disabled = true;
    _deleteStatus(pt('profile.deleteAccountWorking', 'Deleting your account…'), false);

    let res;
    try {
        res = await client.functions.invoke('delete-account', { method: 'POST' });
    } catch (err) {
        res = { error: err };
    }
    if (res && res.error) {
        if (btn) btn.disabled = false;
        _deleteStatus(pt('profile.deleteAccountFail', 'Could not delete the account: ') +
            await _fnErrorReason(res.error), true);
        return;
    }

    // Račun je obrisan, ali JWT vrijedi do isteka — Supabase NE odjavljuje pri brisanju.
    // Zato odjava ide prije čišćenja: dok sesija traje, cloud-sync bi vratio lokalni napredak.
    try { await SokratAuth.signOut(); } catch (err) { /* sesija je ionako mrtva */ }
    purgeLocalAccountData();
    if (typeof showToast === 'function') showToast(pt('profile.deleteAccountDone', 'Your account has been deleted.'));
    navigateTo('landing');
}

function escapeHtmlProfile(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
}

/** BUG-025: ikona ide u `class` → provjera oblika, ne escape. Jedna definicija (blocks-renderer). */
function profileIcon(icon) {
    return (window.SokratBlocks && typeof SokratBlocks.safeIcon === 'function')
        ? SokratBlocks.safeIcon(icon) : 'fa-book';
}

function vezeProfila() {
    const back = document.getElementById('backFromProfile');
    if (back && !back.dataset.bound) {
        back.dataset.bound = '1';
        // K2a: jedan model vracanja za cijelu aplikaciju (js/navigation.js).
        back.addEventListener('click', function () {
            if (typeof goBack === 'function') goBack();
        });
    }
}
// ⚠️ NE SAMO `DOMContentLoaded`. Od učitavanja po ruti ova skripta stiže s paketom `profile`,
// dakle NAKON tog događaja — a slušač koji čeka nešto što se već dogodilo ne okine se nikad.
// Posljedica bi bila gumb „natrag" koji na profilu ne radi ništa.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', vezeProfila);
} else {
    vezeProfila();
}
