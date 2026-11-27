/* eslint-disable no-console */
// ===== TEMA PRATI RAČUN — PONAŠANJE theme.js uz prijavu, BEZ PREGLEDNIKA =====
// Pokreni: node tests/unit/theme-account.test.js  (uključeno u `npm run test:unit`)
//
// ZAŠTO POSTOJI (F2/1, Leon 2026-09-04: „tema treba pratiti račun"; 2026-09-06: „tuđi izbor
// ne smije preživjeti odjavu"). Prvenstvo, zapisano u `boot.js`:
//     račun  >  lokalni izbor  >  uređaj  >  academic
// `theme-device.test.js` čuva donje tri razine; ovaj čuva gornju i njezine dvije posljedice:
//   ① račun PREGAZI lokalni izbor pri prijavi i pri svakom osvježenju sesije;
//   ② odjava BRIŠE lokalni izbor (i samo odjava — neprijavljen posjetitelj svoj zadržava);
//   ③ izbor prijavljenog se UPISUJE u račun, a račun bez teme preuzme izbor uređaja —
//      tek nakon SVJEŽEG čitanja s poslužitelja, jer keširana sesija zna biti starija od
//      izbora napravljenog na drugom uređaju, pa bi ga slijepo preuzimanje pregazilo.
// `SokratAuth` je lažan: bilježi `updateUser`/`getUser` i pušta događaje ručno, istim
// potpisom kao `auth.js` (`fn(user, event)`).

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const KORIJEN = path.join(__dirname, '..', '..');
const BOOT = fs.readFileSync(path.join(KORIJEN, 'js', 'boot.js'), 'utf8');
const TEMA = fs.readFileSync(path.join(KORIJEN, 'js', 'theme.js'), 'utf8');
const PROFIL = fs.readFileSync(path.join(KORIJEN, 'js', 'profile.js'), 'utf8');

let pao = 0;
const tvrdi = (uvjet, ime, detalj) => {
    if (uvjet) console.log('  ✅ ' + ime);
    else { pao++; console.log('  ❌ ' + ime + (detalj !== undefined ? '  → ' + JSON.stringify(detalj) : '')); }
};
const tik = () => new Promise((r) => setImmediate(r));

/* Lažni svijet: `spremljeno` = početni localStorage, `tamno` = uređaj, `korisnik` = sesija
   zatečena pri učitavanju (null = neprijavljen), `svjez` = što poslužitelj vrati na
   `getUser()` (zadano: isto što i sesija), `upisOdgodi` = `updateUser` čeka ručno `pusti()`,
   `upisPada` = `updateUser` vraća grešku (npr. bez mreže), `bezAuth` = stranica bez auth.js. */
function svijet(o) {
    const store = Object.assign({}, o.spremljeno || {});
    const attrs = { 'data-theme': 'academic' };
    const html = {
        getAttribute: (k) => (k in attrs ? attrs[k] : null),
        // `boot.js` pita `hasAttribute('data-lang-fixed')` — pravi <html> ga uvijek ima.
        hasAttribute: (k) => k in attrs,
        setAttribute: (k, v) => { attrs[k] = String(v); },
        style: {},
    };
    const slusaci = {};
    const document = {
        documentElement: html,
        body: { classList: { remove() {} } },
        querySelectorAll: () => [],
        addEventListener: (ev, fn) => { (slusaci[ev] = slusaci[ev] || []).push(fn); },
    };
    const localStorage = {
        getItem: (k) => (k in store ? store[k] : null),
        setItem: (k, v) => { store[k] = String(v); },
        removeItem: (k) => { delete store[k]; },
    };
    const mq = { matches: !!o.tamno, addEventListener() {} };
    const upozorenja = [];
    const ctx = {
        document, localStorage, location: { hash: '' },
        matchMedia: () => mq,
        console: { log() {}, warn: (...a) => upozorenja.push(a.join(' ')), error() {} },
    };
    ctx.window = ctx;

    let user = o.korisnik || null;
    const racunSlusaci = [];
    const upisi = [];
    const citanja = [];
    const naCekanju = [];
    const primijeniUpis = (p) => {
        user = Object.assign({}, user, { user_metadata: Object.assign({}, user.user_metadata, p.data) });
        return { data: { user }, error: null };
    };
    const client = {
        auth: {
            updateUser: (p) => {
                upisi.push(p);
                if (o.upisPada) return Promise.resolve({ data: null, error: { message: 'Failed to fetch' } });
                if (o.upisOdgodi) return new Promise((r) => naCekanju.push(() => r(primijeniUpis(p))));
                return Promise.resolve(primijeniUpis(p));
            },
            getUser: () => {
                citanja.push(1);
                return Promise.resolve({ data: { user: o.svjez !== undefined ? o.svjez : user }, error: null });
            },
        },
    };
    if (!o.bezAuth) {
        ctx.SokratAuth = {
            onChange: (fn) => racunSlusaci.push(fn),
            getUser: () => user,
            getClient: () => client,
        };
    }

    vm.createContext(ctx);
    vm.runInContext(BOOT, ctx, { filename: 'boot.js' });
    vm.runInContext(TEMA, ctx, { filename: 'theme.js' });
    (slusaci.DOMContentLoaded || []).forEach((f) => f());

    return {
        ctx, store, upisi, citanja, upozorenja,
        tema: () => attrs['data-theme'],
        izbor: () => ctx.getThemeChoice(),
        slusaca: () => racunSlusaci.length,
        dogadaj: (u, ev) => { user = u; racunSlusaci.forEach((f) => f(u, ev)); },
        pusti: () => { while (naCekanju.length) naCekanju.shift()(); },
    };
}

const osoba = (meta) => ({ id: 'u-1', email: 'a@b.hr', user_metadata: meta || {} });
const IZABRAN = (t) => ({ 'sokrat-theme': t, 'sokrat-theme-chosen': '1' });

(async function () {
    console.log('\n=== tema prati račun (boot.js + theme.js + lažni SokratAuth) ===\n');

    // ── 0 · spoj ─────────────────────────────────────────────────────────────────
    {
        const s = svijet({});
        tvrdi(s.slusaca() === 1, 'theme.js se na DOMContentLoaded prijavi na promjene računa (točno jednom)', s.slusaca());
    }
    {
        let ok = true;
        try { svijet({ bezAuth: true }).ctx.setTheme('mint'); } catch (e) { ok = false; }
        tvrdi(ok, 'stranica bez auth.js (nema SokratAuth) → ništa se ne ruši, setTheme radi lokalno');
    }

    // ── 1 · ① račun pregazi lokalni izbor ────────────────────────────────────────
    {
        const s = svijet({ tamno: true, spremljeno: IZABRAN('chalk') });
        s.dogadaj(osoba({ theme: 'mint' }), 'SIGNED_IN');
        tvrdi(s.tema() === 'mint', '① prijava: račun (mint) pregazi lokalni izbor (chalk)', s.tema());
        tvrdi(s.store['sokrat-theme'] === 'mint' && s.store['sokrat-theme-chosen'] === '1',
            '… i upiše se lokalno S BILJEGOM (sljedeći prvi kadar je već točan)', s.store);
        tvrdi(s.upisi.length === 0, '… a u račun se NE piše natrag ono što je iz njega došlo', s.upisi);
    }
    {
        const s = svijet({ tamno: true, spremljeno: IZABRAN('chalk') });
        s.dogadaj(osoba({ theme: 'auto' }), 'INITIAL_SESSION');
        tvrdi(s.tema() === 'carbon' && s.izbor() === 'auto',
            '① račun „auto" → lokalni izbor se briše, uređaj (tamni) odlučuje → carbon', [s.tema(), s.izbor()]);
        tvrdi(!('sokrat-theme' in s.store) && !('sokrat-theme-chosen' in s.store), '… zapis i biljeg obrisani', s.store);
    }
    {
        const s = svijet({ tamno: false, spremljeno: IZABRAN('chalk') });
        s.dogadaj(osoba({ theme: 'chalk' }), 'SIGNED_IN');
        s.dogadaj(osoba({ theme: 'carbon' }), 'TOKEN_REFRESHED');
        tvrdi(s.tema() === 'carbon', '① osvježenje sesije s temom s DRUGOG uređaja → primijeni se uživo', s.tema());
    }
    {
        const s = svijet({ tamno: false, spremljeno: IZABRAN('chalk') });
        s.dogadaj(osoba({ theme: 'paper' }), 'SIGNED_IN');
        tvrdi(s.tema() === 'chalk' && s.store['sokrat-theme'] === 'chalk',
            '① nevaljana tema u računu (maknuti `paper`) se NE primjenjuje — lokalni izbor stoji', [s.tema(), s.store]);
    }

    // ── 2 · ② odjava briše lokalni izbor ─────────────────────────────────────────
    {
        const s = svijet({ tamno: true, spremljeno: IZABRAN('mint'), korisnik: osoba({ theme: 'mint' }) });
        s.dogadaj(null, 'SIGNED_OUT');
        tvrdi(s.tema() === 'carbon' && s.izbor() === 'auto', '② odjava → izbor obrisan, uređaj odlučuje (carbon)', [s.tema(), s.izbor()]);
        tvrdi(!('sokrat-theme' in s.store) && !('sokrat-theme-chosen' in s.store), '… zapis i biljeg obrisani', s.store);
    }
    {
        const s = svijet({ tamno: true, spremljeno: IZABRAN('mint') });
        s.dogadaj(null, 'INITIAL_SESSION');
        tvrdi(s.tema() === 'mint' && s.store['sokrat-theme'] === 'mint',
            '② neprijavljen posjetitelj (INITIAL_SESSION bez sesije) ZADRŽAVA svoj izbor — briše samo odjava', [s.tema(), s.store]);
    }

    // ── 3 · ③ izbor prijavljenog ide u račun ─────────────────────────────────────
    {
        const s = svijet({ tamno: true });
        s.ctx.setTheme('mint');
        tvrdi(s.tema() === 'mint' && s.upisi.length === 0, '③ neprijavljen: setTheme radi lokalno, račun se ne dira', s.upisi);
    }
    {
        const s = svijet({ tamno: true, korisnik: osoba({ theme: 'chalk' }) });
        s.dogadaj(osoba({ theme: 'chalk' }), 'INITIAL_SESSION');
        s.ctx.setTheme('mint');
        await tik();
        tvrdi(s.tema() === 'mint', '③ prijavljen: setTheme(mint) primijeni se odmah (ne čeka mrežu)', s.tema());
        tvrdi(s.upisi.length === 1 && s.upisi[0].data && s.upisi[0].data.theme === 'mint',
            '… i upiše u račun: updateUser({ data: { theme: "mint" } })', s.upisi);
        s.ctx.setTheme('auto');
        await tik();
        tvrdi(s.upisi.length === 2 && s.upisi[1].data.theme === 'auto',
            '… „Automatski" se upisuje IZRIČITO ("auto"), da ga drugi uređaj ne pročita kao „nema teme"', s.upisi);
        s.ctx.setTheme('auto');
        await tik();
        tvrdi(s.upisi.length === 2, '… isti izbor kakav račun već ima se ne šalje ponovno', s.upisi.length);
    }
    {
        // Upis je na putu, a stigne osvježenje sesije sa STAROM temom → ne smije vratiti klik unatrag.
        const s = svijet({ tamno: false, korisnik: osoba({ theme: 'chalk' }), upisOdgodi: true });
        s.dogadaj(osoba({ theme: 'chalk' }), 'INITIAL_SESSION');
        s.ctx.setTheme('mint');
        s.dogadaj(osoba({ theme: 'chalk' }), 'TOKEN_REFRESHED');
        tvrdi(s.tema() === 'mint', '③ dok upis čeka mrežu, staro stanje računa NE vraća klik unatrag', s.tema());
        s.pusti();
        await tik();
        s.dogadaj(osoba({ theme: 'mint' }), 'USER_UPDATED');
        tvrdi(s.tema() === 'mint' && s.upisi.length === 1, '… a kad upis prođe, račun i uređaj se slažu', [s.tema(), s.upisi.length]);
    }
    {
        const s = svijet({ tamno: false, korisnik: osoba({ theme: 'chalk' }), upisPada: true });
        s.dogadaj(osoba({ theme: 'chalk' }), 'INITIAL_SESSION');
        let ok = true;
        try { s.ctx.setTheme('mint'); await tik(); await tik(); } catch (e) { ok = false; }
        tvrdi(ok && s.tema() === 'mint', '③ upis bez mreže: nema rušenja, tema ostaje primijenjena lokalno', s.tema());
        tvrdi(s.upozorenja.length === 1, '… a kvar se ne proguta šutke (jedno upozorenje u konzoli)', s.upozorenja);
    }

    // ── 4 · ③ račun bez teme preuzme izbor uređaja — tek nakon svježeg čitanja ───
    {
        const s = svijet({ tamno: true, spremljeno: IZABRAN('chalk') });
        s.dogadaj(osoba({}), 'SIGNED_IN');
        await tik(); await tik();
        tvrdi(s.citanja.length === 1, '④ račun bez teme: prije upisa se čita SVJEŽI korisnik s poslužitelja', s.citanja.length);
        tvrdi(s.upisi.length === 1 && s.upisi[0].data.theme === 'chalk',
            '… pa račun preuzme izbor uređaja (chalk)', s.upisi);
        tvrdi(s.tema() === 'chalk', '… a tema se ne mijenja', s.tema());
        s.dogadaj(osoba({}), 'SIGNED_IN');   // supabase zna ponoviti SIGNED_IN (fokus taba)
        await tik(); await tik();
        tvrdi(s.citanja.length === 1, '… ponovljeni događaj ne pokreće drugo preuzimanje', s.citanja.length);
    }
    {
        // Keširana sesija je STARIJA od izbora s drugog uređaja: poslužitelj ima mint.
        const s = svijet({ tamno: true, spremljeno: IZABRAN('chalk'), svjez: osoba({ theme: 'mint' }) });
        s.dogadaj(osoba({}), 'INITIAL_SESSION');
        await tik(); await tik();
        tvrdi(s.upisi.length === 0, '④ svježi korisnik IMA temu (drugi uređaj) → ništa se ne upisuje preko nje', s.upisi);
        tvrdi(s.tema() === 'mint', '… nego se ona primijeni (mint)', s.tema());
    }
    {
        const s = svijet({ tamno: true });
        s.dogadaj(osoba({}), 'SIGNED_IN');
        await tik(); await tik();
        tvrdi(s.upisi.length === 0 && s.citanja.length === 0,
            '④ račun bez teme + uređaj bez izbora → ništa za preuzeti (nema teme = prati uređaj)', [s.upisi, s.citanja]);
    }
    {
        const s = svijet({ tamno: true, spremljeno: IZABRAN('chalk') });
        s.dogadaj(osoba({ theme: 'paper' }), 'SIGNED_IN');
        await tik(); await tik();
        tvrdi(s.upisi.length === 1 && s.upisi[0].data.theme === 'chalk',
            '④ nevaljana tema u računu = kao da je nema → preuzme se izbor uređaja', s.upisi);
    }
    {
        const s = svijet({ tamno: true, spremljeno: IZABRAN('chalk'), korisnik: osoba({}) });
        await tik(); await tik();
        tvrdi(s.upisi.length === 1 && s.upisi[0].data.theme === 'chalk',
            '④ korisnik zatečen PRIJE prijave slušača (sesija već učitana) se svejedno obradi', s.upisi);
    }
    {
        // Preuzimanje je MIGRACIJA pri prijavi, ne pravilo koje vrijedi uvijek. Nađeno na stagingu
        // 14.09.: spec je vratio temu računa na „nema" (`null`), a ISTI prozor ju je na tom
        // `USER_UPDATED` odmah ponovno upisao iz uređaja — vraćanje stanja se samo poništilo.
        const s = svijet({ tamno: true, spremljeno: IZABRAN('academic'), korisnik: osoba({ theme: 'academic' }) });
        await tik();
        s.dogadaj(osoba({ theme: null }), 'USER_UPDATED');
        s.dogadaj(osoba({ theme: null }), 'TOKEN_REFRESHED');
        await tik(); await tik();
        tvrdi(s.citanja.length === 0 && s.upisi.length === 0,
            '④ USER_UPDATED / TOKEN_REFRESHED bez teme NE pokreću preuzimanje (samo prijava i učitana sesija)',
            { citanja: s.citanja.length, upisi: s.upisi });
    }

    // ── 5 · brisanje računa ne čuva temu ─────────────────────────────────────────
    {
        const m = /const KEEP_LOCAL_KEYS\s*=\s*\[([^\]]*)\]/.exec(PROFIL);
        tvrdi(!!m && !/sokrat-theme/.test(m[1]),
            '⑤ `KEEP_LOCAL_KEYS` (brisanje računa) ne čuva temu — izbor pripada osobi, ne uređaju', m && m[1]);
    }

    console.log('\n' + (pao ? '❌ palo: ' + pao : '✅ sve prošlo') + '\n');
    process.exit(pao ? 1 : 0);
})();
