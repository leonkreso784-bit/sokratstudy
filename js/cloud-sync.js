// ===== SOKRAT STUDY — CLOUD SYNC (localStorage ↔ Supabase) =====
//
// Offline-first: localStorage je i dalje PRIMARNI store i app radi bez računa
// točno kao prije. Kad je korisnik prijavljen (vidi js/auth.js):
//   1. na login/startup: PULL svih redaka iz tablice `progress` + MERGE u localStorage
//   2. svakih SYNC_INTERVAL_MS (i kad tab ode u pozadinu): DIFF-PUSH promijenjenih
//      ključeva (upsert, 1 red = 1 localStorage ključ).
//
// Merge pravila (čuvaju napredak, nikad ne brišu naučeno):
//   - brojevi → max (brojači su monotoni: naučene kartice, fillSolved, studyTime…)
//   - polja stringova (npr. flashcardsLearned id-evi) → unija
//   - ostala polja (npr. quizScores) → multiskup-maksimum po vrijednosti (BUG-048)
//   - objekti → rekurzivno isto
// Ključevi koji se sinkroniziraju: <storageKey>, <storageKey>-analytics,
// <subjectId>-exercises-progress, sokrat-last-position.

const CloudSync = (function () {
    const SYNC_INTERVAL_MS = 30000;
    const META_KEY = 'sokrat-sync-meta'; // { [key]: ISO vrijeme zadnje lokalne promjene }

    let userId = null;
    let timer = null;
    let snapshot = {}; // key -> JSON string zadnjeg sinkroniziranog stanja
    let pulled = false;  // true tek nakon uspješnog pulla; do tada push NE smije raditi (bez merge-a pregazio bi oblak)
    let pulling = false; // pull u tijeku (da interval ne pokrene drugi paralelno)

    // ---------- Ključevi ----------

    function watchedKeys() {
        const keys = ['sokrat-last-position'];
        if (typeof subjectDataMap !== 'undefined') {
            Object.keys(subjectDataMap).forEach(function (id) {
                const sk = subjectDataMap[id].storageKey;
                if (sk) {
                    keys.push(sk);
                    keys.push(sk + '-analytics');
                }
                keys.push(id + '-exercises-progress');
            });
        }
        return keys;
    }

    // Što smije iz oblaka u localStorage: samo ključevi koje sama aplikacija piše.
    // Sve ostalo (npr. sokrat-supabase-override, sokrat-progress-owner) se odbija.
    const DOZVOLJENI_OBRASCI = [
        /^sokrat-last-position$/,
        /^[a-z0-9][a-z0-9-]*-progress(-analytics)?$/,
        /^[a-z0-9][a-z0-9-]*-exercises-progress$/,
        /^node:[0-9a-f-]{36}(-analytics)?$/i
    ];

    function isAllowedKey(key, watched) {
        if (typeof key !== 'string') return false;
        if ((watched || watchedKeys()).indexOf(key) !== -1) return true;
        return DOZVOLJENI_OBRASCI.some(function (re) { return re.test(key); });
    }

    function readLocal(key) {
        const raw = localStorage.getItem(key);
        if (raw === null) return null;
        try { return JSON.parse(raw); } catch (e) { return null; }
    }

    function readMeta() { return readLocal(META_KEY) || {}; }
    function writeMeta(meta) { localStorage.setItem(META_KEY, JSON.stringify(meta)); }

    // ---------- Merge ----------

    function isPlainObject(v) {
        return v !== null && typeof v === 'object' && !Array.isArray(v);
    }

    /**
     * BUG-048: polja koja NISU stringovi (quizScores = brojevi, povijest = objekti) spajaju se
     * kao MULTISKUP-MAKSIMUM po vrijednosti — svaka vrijednost preživi u onoliko primjeraka
     * koliko ih ima strana s više. Do 12.09. je pobjeđivalo DULJE polje: dva uređaja s po
     * jednim kvizom ([80] i [90]) davala su [80]. Skup (Set) ne dolazi u obzir jer bi dva
     * ista rezultata na istom uređaju ([80, 80]) spljoštio u jedan. Redoslijed: lokalno pa
     * višak s udaljenog; spajanje sa samim sobom ne raste. Vrijednost = JSON, pa objekti
     * s istim sadržajem vrijede kao ista vrijednost.
     */
    function mergeMultiset(a, b) {
        const kljuc = function (x) { try { return JSON.stringify(x); } catch (e) { return String(x); } };
        const uA = {};
        a.forEach(function (x) { const k = kljuc(x); uA[k] = (uA[k] || 0) + 1; });
        const out = a.slice();
        const videno = {};
        b.forEach(function (x) {
            const k = kljuc(x);
            videno[k] = (videno[k] || 0) + 1;
            if (videno[k] > (uA[k] || 0)) out.push(x);
        });
        return out;
    }

    // ISO datum ili YYYY-MM-DD → ms; inače NaN
    const ISO_DATUM = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?$/;
    function datumMs(v) {
        return (typeof v === 'string' && ISO_DATUM.test(v)) ? Date.parse(v) : NaN;
    }

    function mergeValues(a, b, key) {
        if (a === null || a === undefined) return b;
        if (b === null || b === undefined) return a;
        // zadnja pozicija je jedna cjelina — pobjeđuje novija, bez miješanja polja
        if (key === 'sokrat-last-position' && isPlainObject(a) && isPlainObject(b)) {
            return (Number(a.timestamp) || 0) > (Number(b.timestamp) || 0) ? a : b;
        }
        if (typeof a === 'number' && typeof b === 'number') return Math.max(a, b);
        if (typeof a === 'boolean' && typeof b === 'boolean') return a || b; // done/learned se ne poništava
        if (Array.isArray(a) && Array.isArray(b)) {
            const allStrings = a.concat(b).every(function (x) { return typeof x === 'string'; });
            if (allStrings) return Array.from(new Set(a.concat(b)));
            return mergeMultiset(a, b);
        }
        if (isPlainObject(a) && isPlainObject(b)) {
            const out = {};
            Object.keys(a).concat(Object.keys(b)).forEach(function (k) {
                if (!(k in out)) out[k] = mergeValues(a[k], b[k]);
            });
            return out;
        }
        // dva datuma (ISO / YYYY-MM-DD) → noviji (lastStudy, lastSessionDate)
        const da = datumMs(a), db = datumMs(b);
        if (!isNaN(da) && !isNaN(db)) return da > db ? a : b;
        // ostali skalari/raznorodno: remote je izvor istine.
        return b;
    }

    // ---------- Pull + merge (na login / startup sa sesijom) ----------

    async function pullAndMerge() {
        const client = SokratAuth.getClient();
        if (!client || !userId || pulling) return;
        const uid = userId;
        pulling = true;
        try {
            await pullAndMergeInner(client, uid);
        } catch (e) {
            console.warn('[sync] pull failed:', e && e.message);
        } finally {
            pulling = false;
        }
    }

    async function pullAndMergeInner(client, uid) {
        const { data: rows, error } = await client.from('progress').select('key, data');
        if (error) { console.warn('[sync] pull failed:', error.message); return; }
        if (userId !== uid) return; // sesija se promijenila tijekom pulla

        const remote = {};
        (rows || []).forEach(function (r) { remote[r.key] = r.data; });

        const watched = watchedKeys();
        const keys = watched.slice();
        Object.keys(remote).forEach(function (k) {
            // ključevi s drugih uređaja/verzija — samo ako ih aplikacija sama piše (allowlist)
            if (keys.indexOf(k) === -1 && isAllowedKey(k, watched)) keys.push(k);
        });

        const meta = readMeta();
        const toPush = [];

        keys.forEach(function (key) {
            const local = readLocal(key);
            const rem = (key in remote) ? remote[key] : null;
            if (local === null && rem === null) return;

            const merged = mergeValues(local, rem, key);
            const mergedStr = JSON.stringify(merged);

            localStorage.setItem(key, mergedStr);
            meta[key] = new Date().toISOString();

            // ⚠️ BUG-049: `snapshot` znači „ovo je u oblaku". Ključ koji tek TREBA gore ne
            // smije ga dobiti prije nego upsert prođe — inače pad prvog slanja (prijava na
            // lošoj mreži) učini da `collectChanged` ključ više ne vidi i nikad ga ne pošalje.
            if (mergedStr !== JSON.stringify(rem)) {
                toPush.push({ user_id: userId, key: key, data: merged, _raw: mergedStr });
            } else {
                snapshot[key] = mergedStr;
            }
        });

        writeMeta(meta);
        pulled = true; // merge je gotov; od sada je push siguran
        let poslano = true;
        if (toPush.length) {
            poslano = await upsertRows(toPush.map(function (r) { return { user_id: r.user_id, key: r.key, data: r.data }; }));
            if (poslano) toPush.forEach(function (r) { snapshot[r.key] = r._raw; });
        }

        // Ako je predmet trenutno otvoren, osvježi in-memory stanje iz localStorage.
        try {
            if (typeof AppState !== 'undefined' && AppState.nav.subject && typeof loadProgress === 'function') {
                loadProgress();
                if (typeof loadAnalytics === 'function') loadAnalytics();
                if (typeof updateHomeStats === 'function') updateHomeStats();
            }
        } catch (e) { /* UI refresh je best-effort */ }

        // „Sinkronizirano u HH:MM" samo kad JEST — pali push ostaje u redu za sljedeći interval.
        if (poslano) markSynced();
    }

    // ---------- Diff-push petlja ----------

    function collectChanged() {
        const changed = [];
        watchedKeys().forEach(function (key) {
            const raw = localStorage.getItem(key);
            if (raw === null) return;
            if (snapshot[key] === raw) return;
            const parsed = readLocal(key);
            if (parsed === null) return;
            changed.push({ user_id: userId, key: key, data: parsed, _raw: raw });
        });
        return changed;
    }

    async function pushChanges() {
        if (!userId || !pulled) return; // bez uspjelog pulla push bi pregazio oblak
        const changed = collectChanged();
        if (!changed.length) return;

        const meta = readMeta();
        const rows = changed.map(function (c) {
            meta[c.key] = new Date().toISOString();
            return { user_id: c.user_id, key: c.key, data: c.data };
        });
        writeMeta(meta);

        const ok = await upsertRows(rows);
        if (ok) {
            changed.forEach(function (c) { snapshot[c.key] = c._raw; });
            markSynced();
        }
    }

    async function upsertRows(rows) {
        const client = SokratAuth.getClient();
        if (!client) return false;
        const { error } = await client.from('progress')
            .upsert(rows, { onConflict: 'user_id,key' });
        if (error) { console.warn('[sync] push failed:', error.message); return false; }
        return true;
    }

    function markSynced() {
        const t = new Date();
        const hh = String(t.getHours()).padStart(2, '0');
        const mm = String(t.getMinutes()).padStart(2, '0');
        const pre = window.t ? window.t('sync.lastSyncedPre') : 'Your progress syncs automatically. Last synced ';
        SokratAuth.setSyncInfo(pre + hh + ':' + mm + '.');
    }

    // ---------- Lifecycle ----------

    function start() {
        if (timer) return;
        timer = setInterval(function () {
            if (!pulled) pullAndMerge(); // pull nije uspio (offline) → ponovi prije ikakvog pusha
            else pushChanges();
        }, SYNC_INTERVAL_MS);
    }

    function stop() {
        if (timer) { clearInterval(timer); timer = null; }
        snapshot = {};
        pulled = false;
    }

    /**
     * U2 (R1-UX): obriši CIJELU povijest učenja — cloud I lokalno I sync-snapshot, BEZ odjave.
     *
     * Zašto ovako: stari „Delete cloud data" je brisao samo cloud i odjavio korisnika, a
     * lokalne podatke ČUVAO — pa ih je sljedeća prijava union-mergeom VRATILA u cloud.
     * Brisanje koje se samo poništi je gore od nikakvog (Leon, 2026-09-02, uživo).
     *
     * Redoslijed je bitan: petlja se prvo GASI (da push ne utrkuje brisanje), cloud se
     * briše PRIJE lokalnog (padne li mreža, ništa nije izgubljeno — sve ostaje kako je
     * bilo), pa tek onda lokalni ključevi + META_KEY + snapshot.
     *
     * ⚠️ Pošteno ograničenje (offline-first cijena): DRUGI uređaj koji drži lokalnu kopiju
     * vratit će svoj dio pri svojoj sljedećoj prijavi. Za potpuno brisanje svugdje korisnik
     * briše na uređaju koji koristi (Leonov slučaj) ili briše račun (GDPR put).
     */
    async function wipeAll() {
        const client = SokratAuth.getClient();
        if (!client || !userId) return { ok: false, reason: 'not signed in' };
        const wasRunning = !!timer;
        stop(); // gasi timer + prazni snapshot

        const { error } = await client.from('progress').delete().neq('key', '');
        if (error) {
            if (wasRunning) start();
            return { ok: false, reason: error.message };
        }

        watchedKeys().forEach(function (k) { localStorage.removeItem(k); });
        localStorage.removeItem(META_KEY);
        snapshot = {};
        pulled = wasRunning; // oblak i lokalno su prazni — nema što pregaziti (ako pull nije ni bio gotov, ostaje false)

        // Isti best-effort UI refresh kao nakon pulla — otvoren predmet ne smije
        // nastaviti pokazivati (i pri idućem spremanju USKRSNUTI) obrisani napredak.
        try {
            if (typeof AppState !== 'undefined' && AppState.nav.subject && typeof loadProgress === 'function') {
                loadProgress();
                if (typeof loadAnalytics === 'function') loadAnalytics();
                if (typeof updateHomeStats === 'function') updateHomeStats();
            }
        } catch (e) { /* best-effort */ }

        if (wasRunning) start(); // prazan snapshot + prazan storage → nema što pushati
        return { ok: true };
    }

    /**
     * BUG-050 — VLASNIK LOKALNOG NAPRETKA (Leon, 12.09.): odjava ostavlja napredak na
     * uređaju (toast to obećava), ali sljedeća prijava ga je spajala u KOJI GOD račun —
     * na zajedničkom računalu B je nasljeđivao A-ovo učenje, i to trajno, u svoj oblak.
     * Pravilo: lokalni napredak pripada računu koji ga je ZADNJI sinkronizirao.
     *   ista osoba natrag       → spaja se kao dosad, ništa se ne gubi;
     *   drugi račun             → lokalno se BRIŠE prije pulla (njegov je oblak izvor);
     *   gost bez ijednog računa → spaja se u prvi račun („učio kao gost, pa se prijavio").
     * Biljeg NIJE među `watchedKeys` — nikad ne putuje u oblak.
     */
    const OWNER_KEY = 'sokrat-progress-owner';

    function preuzmiUredjaj(noviUserId) {
        let vlasnik = null;
        try { vlasnik = localStorage.getItem(OWNER_KEY); } catch (e) { vlasnik = null; }
        if (vlasnik && vlasnik !== noviUserId) {
            watchedKeys().forEach(function (k) { localStorage.removeItem(k); });
            localStorage.removeItem(META_KEY);
            snapshot = {};
        }
        pulled = false;
        localStorage.setItem(OWNER_KEY, noviUserId);
    }

    function handleAuthChange(user) {
        if (user) {
            if (userId === user.id && timer) return; // SIGNED_IN se zna ponoviti (token refresh, fokus taba)
            preuzmiUredjaj(user.id);
            userId = user.id;
            pulled = false;
            pullAndMerge().then(start); // pullAndMerge ne baca; ako padne, interval ponavlja pull
        } else {
            userId = null;
            stop();
        }
    }

    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') pushChanges();
    });
    window.addEventListener('beforeunload', function () { pushChanges(); });

    return {
        handleAuthChange: handleAuthChange,
        pushNow: pushChanges,
        // M2: izloženo da se može DOKAZATI da napredak osobnog materijala (`node:<uuid>`) ulazi
        // u sinkronizaciju — kriterij 3 traži „istu sinkronizaciju kao katalog", a to se ne vidi
        // iz ponašanja bez čekanja intervala.
        watchedKeys: watchedKeys,
        // U2: profil zove brisanje povijesti — mora ići KROZ sync modul jer jedino on
        // zna ključeve, snapshot i petlju (brisanje mimo njega je stara greška).
        wipeAll: wipeAll,
        // P4: izlozeno po ISTOM razlogu kao `watchedKeys` gore — tvrdnja „napredak se
        // spoji bez gubitka" je jedina koja stiti ucenje offline, a iz ponasanja se ne
        // vidi bez racuna, mreze i cekanja intervala. Cista funkcija, bez stanja.
        mergeValues: mergeValues
    };
})();

// auth.js se učitava prije ovog fajla; registracija je sigurna i prije init()-a.
if (typeof SokratAuth !== 'undefined') {
    SokratAuth.onChange(function (user) { CloudSync.handleAuthChange(user); });
    // ⚠️ OD UČITAVANJA PO RUTI OVAJ MODUL STIŽE TEK KAD SE KORISNIK PRIJAVI — dakle NAKON
    // događaja koji ga je i dovukao (`auth.js` traži paket `sync` u `onAuthStateChange`).
    // Sama registracija bi zato propustila upravo tu prijavu i sinkronizacija bi krenula
    // tek na SLJEDEĆOJ promjeni stanja — u praksi: nikad u toj sesiji. `handleAuthChange`
    // je idempotentan (`userId === user.id && timer` → izlazi), pa dvostruki poziv ne šteti.
    if (typeof SokratAuth.getUser === 'function') CloudSync.handleAuthChange(SokratAuth.getUser());
}
