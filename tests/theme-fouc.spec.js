// ===== BLJESAK KRIVE TEME — TVRDNJA NAD ONIM ŠTO OKO VIDI =====
//
// POVOD (Leon, 2026-09-04): „kada se selecta neki theme on ostane, no kada se opet ulazi
// na stranicu prvo se učita bijela obična stranica pa onda na brzinu theme koji je izabran.
// to je ružno i neprofesionalno."
//
// ZAŠTO OVAJ TEST, A NE DOJAM: bljesak traje 119–232 ms (izmjereno `scripts/fouc-probe.js`
// na produkciji) — dovoljno da se vidi, prekratko da se pouzdano uhvati okom, i nevidljivo
// SVAKOJ postojećoj brani. `<html data-theme="academic">` u markupu je izgledao kao
// rješenje i imao komentar koji to tvrdi; vrijedio je samo za zadanu temu.
//
// MJERA: promatrač na `<html>` postavljen PRIJE ijedne skripte stranice broji promjene
// `data-theme` u kojima se VRIJEDNOST stvarno mijenja. Takva promjena poslije prvog
// crtanja JEST bljesak. Ponovno postavljanje iste vrijednosti se ne broji — to korisnik
// ne vidi. Nula promjena = tema je bila točna već u prvom kadru.
const { test, expect } = require('@playwright/test');
const { smiri } = require('./helpers/axe-gate');

// ⚠️ BOJA SE MJERI TEK NA SMIRENOM EKRANU — i to nije popuštanje tvrdnje nego njezin uvjet.
// `body` ima `transition: var(--transition)` = `all 0.3s ease` (css/variables.css:126), a tema
// mijenja `--color-surface-0` → pozadina 300 ms PUTUJE od svijetle prema tamnoj. Uzorkovanje
// unutar tog prozora daje međuboju, pa je test padao ~2/72 (BACKLOG:120) uz ISPRAVAN kod.
//
// ⚠️ Da to nije nagađanje: oba zabilježena pada rekonstruiraju se TOČNO kao interpolacija
// svijetle (247,249,252) i tamne (15,17,21) pozadine — `rgb(75,77,81)` je 74,1 % puta,
// `rgb(199,201,203)` je 20,9 % (izmjereno 2026-09-24, aritmetika nad zabilježenim bojama).
//
// ⚠️ SMIRUJE SE SAMO BOJA, NIKAD ATRIBUT. Tvrdnje ① ② ③ (nula promjena `data-theme`, točna tema
// u prvom kadru, `color-scheme`) i dalje se čitaju IZ PRVOG SNIMKA, prije smirivanja — one su
// pravi sadržaj ovog testa i moraju vrijediti bez ikakvog čekanja. Popravak dira isključivo
// trenutak uzorkovanja boje.
//
// ⚠️ `smiri()` je POSTOJEĆI mehanizam (`tests/helpers/axe-gate.js`, pisan za BUG-042 — isti
// razred: boja uzorkovana usred prijelaza) i PADA ZATVORENO ako se ekran ne smiri. Nije
// napisan drugi, da ne postoje dvije kopije istog znanja (ADR-027).
async function konacnaPozadina(page) {
    await smiri(page);
    return page.evaluate(() => getComputedStyle(document.body).backgroundColor);
}

// `chalk` jer je TAMNA: bljesak sa zadane (svijetle) teme je ondje najveći i najvidljiviji.
// `academic` bi prošao i s pokvarenim kodom — zato ne bi bio dokaz.
for (const tema of ['chalk', 'mint']) {
    test('povratak na stranicu: tema „' + tema + '" je na ekranu od prvog kadra', async ({ page }) => {
        // Prvi posjet samo zato da origin postoji i localStorage bude zapisiv.
        await page.goto('/');
        await page.evaluate((t) => localStorage.setItem('sokrat-theme', t), tema);

        await page.addInitScript(() => {
            window.__promjene = [];
            const pocni = () => {
                const html = document.documentElement;
                window.__pocetni = html.getAttribute('data-theme');
                new MutationObserver((zapisi) => {
                    for (const z of zapisi) {
                        const novo = html.getAttribute('data-theme');
                        // Samo STVARNA promjena vrijednosti = ono što se vidi.
                        if (z.oldValue !== novo) window.__promjene.push({ iz: z.oldValue, u: novo, t: performance.now() });
                    }
                }).observe(html, { attributes: true, attributeFilter: ['data-theme'], attributeOldValue: true });
            };
            if (document.documentElement) pocni();
            else document.addEventListener('readystatechange', pocni, { once: true });
        });

        await page.reload({ waitUntil: 'load' });
        await page.waitForFunction(() => typeof window.setTheme === 'function');

        const stanje = await page.evaluate(() => ({
            promjene: window.__promjene,
            pocetni: window.__pocetni,
            konacni: document.documentElement.getAttribute('data-theme'),
            colorScheme: document.documentElement.style.colorScheme,
        }));

        // ① Nijedne promjene vrijednosti — dakle nikakvog bljeska.
        expect(stanje.promjene, 'tema se mijenjala PRED korisnikom: ' + JSON.stringify(stanje.promjene)).toEqual([]);
        // ② Tema je bila točna već u trenutku kad je promatrač postavljen (prije skripti stranice).
        expect(stanje.pocetni).toBe(tema);
        expect(stanje.konacni).toBe(tema);
        // ③ `color-scheme` prati temu — bez toga native scrollbarovi i polja ostanu svijetli.
        expect(stanje.colorScheme).toBe('dark');
        // ④ Tvrdnja o BOJI, ne samo o atributu: obje su teme tamne, pa svijetla pozadina
        //    znači da atribut stoji a CSS ga ne sluša (drugi kvar, isti simptom).
        const pozadina = await konacnaPozadina(page);
        const [r, g, b] = pozadina.match(/\d+/g).map(Number);
        expect(r + g + b, 'pozadina nije tamna: ' + pozadina).toBeLessThan(200);
    });
}

// ===== F1/3: BEZ IZBORA TEMA PRATI UREĐAJ — ISTO MJERILO, ISTA GRANICA (prvi kadar) =====
// Leon (2026-09-04): „isto kao i email template" — predlošci maila imaju `prefers-color-scheme`
// blok, pa se na tamnom telefonu otvore crni. Stranica mora isto, i to bez bljeska bijele:
// odluka je u boot.js (sinkrono), a ovdje se to dokazuje kroz emulirani uređaj.
// Četvrti slučaj je MIGRACIJA: produkcija je do F1/3 svakom posjetitelju upisivala `academic`
// bez da je birao — takav zapis se mora čitati kao „ništa", inače crno ne dobiva nitko.
const UREDJAJ = [
    { shema: 'dark',  tema: 'carbon',   tamna: true,  spremljeno: null,       opis: 'ništa spremljeno' },
    { shema: 'light', tema: 'academic', tamna: false, spremljeno: null,       opis: 'ništa spremljeno' },
    { shema: 'dark',  tema: 'carbon',   tamna: true,  spremljeno: 'academic', opis: 'stari automatski `academic` bez biljega → nije izbor' },
    { shema: 'dark',  tema: 'chalk',    tamna: true,  spremljeno: 'chalk',    opis: 'izbor `chalk` pobjeđuje uređaj' },
];
for (const u of UREDJAJ) {
    test('uređaj ' + u.shema + ' · ' + u.opis + ' → „' + u.tema + '" od prvog kadra', async ({ page }) => {
        await page.goto('/');
        await page.evaluate((s) => {
            localStorage.removeItem('sokrat-theme');
            localStorage.removeItem('sokrat-theme-chosen');   // bez biljega = kako je produkcija pisala
            if (s) localStorage.setItem('sokrat-theme', s);
        }, u.spremljeno);
        await page.emulateMedia({ colorScheme: u.shema });

        await page.addInitScript(() => {
            window.__promjene = [];
            const pocni = () => {
                const html = document.documentElement;
                window.__pocetni = html.getAttribute('data-theme');
                new MutationObserver((zapisi) => {
                    for (const z of zapisi) {
                        const novo = html.getAttribute('data-theme');
                        if (z.oldValue !== novo) window.__promjene.push({ iz: z.oldValue, u: novo, t: performance.now() });
                    }
                }).observe(html, { attributes: true, attributeFilter: ['data-theme'], attributeOldValue: true });
            };
            if (document.documentElement) pocni();
            else document.addEventListener('readystatechange', pocni, { once: true });
        });

        await page.reload({ waitUntil: 'load' });
        await page.waitForFunction(() => typeof window.getThemeChoice === 'function');

        const stanje = await page.evaluate(() => ({
            promjene: window.__promjene,
            pocetni: window.__pocetni,
            konacni: document.documentElement.getAttribute('data-theme'),
            colorScheme: document.documentElement.style.colorScheme,
            izbor: window.getThemeChoice(),
            zapis: localStorage.getItem('sokrat-theme'),
        }));

        expect(stanje.promjene, 'tema se mijenjala PRED korisnikom: ' + JSON.stringify(stanje.promjene)).toEqual([]);
        expect(stanje.pocetni).toBe(u.tema);
        expect(stanje.konacni).toBe(u.tema);
        expect(stanje.colorScheme).toBe(u.tamna ? 'dark' : 'light');
        const pozadina = await konacnaPozadina(page);
        const [r, g, b] = pozadina.match(/\d+/g).map(Number);
        if (u.tamna) expect(r + g + b, 'pozadina nije tamna: ' + pozadina).toBeLessThan(200);
        else expect(r + g + b, 'pozadina nije svijetla: ' + pozadina).toBeGreaterThan(600);
        // Birač vidi IZBOR: „auto" kad ga nema — i stari automatski zapis je počišćen, ne
        // pretvoren u izbor (drugi način da „Automatski" traje jedno učitavanje).
        if (u.spremljeno === 'chalk') { expect(stanje.izbor).toBe('chalk'); expect(stanje.zapis).toBe('chalk'); }
        else { expect(stanje.izbor).toBe('auto'); expect(stanje.zapis).toBeNull(); }
    });
}

// ===== HLADNA MREŽA: CSS STIGNE POSLIJE PRVOG KADRA =====
//
// ⚠️ OVAJ TEST POSTOJI JER JE 2026-09-24 OBJASNIO POVREMENI PAD GORNJIH TVRDNJI (BACKLOG:120,
// ~2/72 od 14.09.), a taj pad se LOKALNO NIJE DAO REPRODUCIRATI — CSS je ondje instantan.
//
// Mehanizam, izmjeren pa zatim potvrđen: kad `styles.bundle.css` stigne NAKON prvog izračuna
// stila, pozadina se mijenja iz zadane svijetle u temsku, i prijelaz KRENE — jer ga propisuje
// stil koji je tek stigao (`body { transition: all .3s }`, css/variables.css:126). Tada
// uzorkovanje boje daje svijetlu ili međuboju, dok je `data-theme` cijelo vrijeme TOČAN.
// Izmjereno na ovoj sondi: bez smirivanja `rgb(247,249,252)` uz `getAnimations()` =
// ["background-color","color"]; sa smirivanjem `rgb(15,17,21)`.
//
// ⚠️ DVIJE POGREŠNE HIPOTEZE PRIJE TE, i zapisane su da se ne ponove: (a) spori prijelaz ubačen
// na `DOMContentLoaded` ne reproducira, jer je tema tada već primijenjena; (b) ubačen u `<head>`
// prije `boot.js` također ne — **promjena prije prvog izračuna stila ne stvara prijelaz.**
// Razlika CI-ja nije bila trajanje prijelaza nego HLADNA MREŽA.
//
// ⚠️ Test tvrdi ono što KORISNIK dobije na sporoj vezi, ne samo da brana ne pada: tema je točna
// od prvog kadra i bez ijedne promjene vrijednosti, a smirena pozadina je tamna. Na kodu koji
// boju uzorkuje bez smirivanja ovaj test PADA — dakle on je i obrnuta provjera popravka.
test('hladna mreža: CSS stigne poslije prvog kadra → tema je i dalje točna od prvog kadra', async ({ page }) => {
    await page.route('**/styles.bundle.css*', async (route) => {
        const odg = await route.fetch();
        const tijelo = await odg.text();
        await new Promise((r) => setTimeout(r, 400));   // simulira hladan/spor runner
        return route.fulfill({ response: odg, body: tijelo });
    });

    await page.goto('/');
    await page.evaluate(() => {
        localStorage.removeItem('sokrat-theme');
        localStorage.removeItem('sokrat-theme-chosen');
    });
    await page.emulateMedia({ colorScheme: 'dark' });

    await page.addInitScript(() => {
        window.__promjene = [];
        const pocni = () => {
            const html = document.documentElement;
            window.__pocetni = html.getAttribute('data-theme');
            new MutationObserver((zapisi) => {
                for (const z of zapisi) {
                    const novo = html.getAttribute('data-theme');
                    if (z.oldValue !== novo) window.__promjene.push({ iz: z.oldValue, u: novo });
                }
            }).observe(html, { attributes: true, attributeFilter: ['data-theme'], attributeOldValue: true });
        };
        if (document.documentElement) pocni();
        else document.addEventListener('readystatechange', pocni, { once: true });
    });

    await page.reload({ waitUntil: 'load' });
    await page.waitForFunction(() => typeof window.getThemeChoice === 'function');

    const stanje = await page.evaluate(() => ({
        promjene: window.__promjene,
        pocetni: window.__pocetni,
        konacni: document.documentElement.getAttribute('data-theme'),
    }));
    // Atribut se sudi BEZ smirivanja — spora veza ne smije pokvariti ono što boot radi sinkrono.
    expect(stanje.promjene, 'tema se mijenjala PRED korisnikom: ' + JSON.stringify(stanje.promjene)).toEqual([]);
    expect(stanje.pocetni, 'tema nije bila točna u prvom kadru na sporoj vezi').toBe('carbon');
    expect(stanje.konacni).toBe('carbon');

    const pozadina = await konacnaPozadina(page);
    const [r, g, b] = pozadina.match(/\d+/g).map(Number);
    expect(r + g + b, 'smirena pozadina nije tamna: ' + pozadina).toBeLessThan(200);
});
