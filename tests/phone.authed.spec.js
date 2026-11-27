// T0 · MJERAČ TELEFONA — prijavljene površine (faza „TELEFON", spec §9.3 i §9.7).
//
// Blizanac `phone.spec.js`, s istom mjerom u `helpers/phone-gate.js`. Postoji odvojeno
// iz istog razloga kao `a11y.authed` i `reachability.authed`: **polica, profil i Studio
// se odjavljenom posjetitelju ne prikazuju**, pa ih odjavljena brana ne može ni vidjeti.
// To je bio nalaz C3 (spec §7.10) — *prijavljene površine nisu imale nijedan vizualni
// gate*, i baš su ondje ležala četiri kvara koja su stajala na produkciji.
//
// ⚠️ Ovo NE preklapa `studio-mobile.authed.spec.js`. Ondje se mjeri **ljuska Studija**
// (koliko od ekrana ostane platnu); ovdje se mjeri **stranica** — otok, budžet kroma,
// sukob kraćenja, dohvatljivost bez skrola, čitljivost naslova razine. Isti ekran,
// druga os. K4a je platno vratio na 679 px, a ništa od toga nije tvrdio o otoku.
//
// Osnovica i pravilo „pada se samo na NOVOM kvaru" su objašnjeni u `phone.spec.js`.
const { test, expect } = require('@playwright/test');
const { ucitajPakete } = require('./helpers/paketi');
const G = require('./helpers/phone-gate');

/** Prijavljen admin; `refresh()` otključava `.admin-only` ulaze prije mjerenja. */
async function spremanAdmin(page) {
    await page.goto('/');
    await ucitajPakete(page, ['profile']);
    await G.spreman(page);
    await page.waitForFunction(() => !!window.SokratAdmin);
    await page.evaluate(async () => { await window.SokratAdmin.refresh(); });
    await G.postaviRub(page);
}

const NALAZI = {
    otok: [], kromo: [], sukob: [], prviEkran: [], zaglavlje: [],
    dno: [], bocno: [], spremnik: [], namjestaj: [], polja: []
};
let izmjerenoEkrana = 0;
/** ⑩ — premisa pravila o sigurnoj zoni. Tvrda provjera, ne čegrtaljka (v. javna brana). */
const PREMISA = { neprijavljeni: [] };

test.beforeAll(async ({ browser }, testInfo) => {
    // Ni port ni putanja sesije se NE prepisuju — oboje stoji u `playwright.config.js`.
    const { baseURL, storageState } = testInfo.project.use;
    const snimka = [];

    for (const e of G.EKRANI) {
        // ⚠️ ISTI TELEFON KAO U JAVNOJ BRANI (F1/10, 2026-09-05). Do tada je ovaj kontekst imao samo
        // `viewport`: telefonsku ŠIRINU s MIŠEM kao pokazivačem. Tvrdnja ⑨ je to razotkrila — iza
        // prijave je „vidjela" 15,2 px na poljima koja su na pravom telefonu 16 px, jer pravilo
        // stoji iza `@media (pointer: coarse)`, a taj upit pali `hasTouch` (izmjereno: `isMobile`
        // sam ga NE pali). Brana koja emulira telefon bez prsta mjeri uređaj koji ne postoji.
        const ctx = await browser.newContext({
            viewport: { width: e.w, height: e.h },
            deviceScaleFactor: 3, isMobile: true, hasTouch: true,
            storageState, baseURL
        });
        const page = await ctx.newPage();
        await spremanAdmin(page);
        await page.waitForTimeout(600);

        for (const ekran of G.EKRANI_PRIJAVLJENI) {
            await G.idiNa(page, ekran, e.rub);
            if (ekran === 'editor') await page.waitForSelector('#editor-page.active');
            await G.postaviRub(page, e.rub);
            await page.waitForTimeout(400);
            const m = await G.mjeriStranicu(page, e.rub);
            snimka.push({ e, ekran, m, r: await G.mjeriRubove(page, e.rub) });
        }
        await ctx.close();
    }

    izmjerenoEkrana = snimka.length;
    const gdje = (r) => r.e.w + 'px ' + r.ekran;

    snimka.forEach((r) => {
        const m = r.m;
        m.uOtoku.forEach((x) => NALAZI.otok.push(gdje(r) + ' · ' + x));
        if (m.kromoPct > G.KROMO_BUDZET_PCT) {
            NALAZI.kromo.push(gdje(r) + ' · ' + m.kromoPct + ' % (' + m.nasKromo + ' od '
                + m.upotrebljivaVisina + ' px) · ' + m.trake.join(' + '));
        }
        m.sudari.forEach((x) => NALAZI.sukob.push(gdje(r) + ' · ' + x));
        if (m.upotrebljivih === 0) {
            NALAZI.prviEkran.push(gdje(r) + ' · kromo ' + m.kromoPx + ' px'
                + (m.bannerPx ? ' + banner ' + m.bannerPx + ' px' : '') + ' od ' + m.vh + ' px');
        }
        m.namjestaj.forEach((x) => NALAZI.namjestaj.push(gdje(r) + ' · ' + x));
        m.zaglavlja.forEach((x) => NALAZI.zaglavlje.push(gdje(r) + ' · ' + x));
        m.sitnaPolja.forEach((x) => NALAZI.polja.push(gdje(r) + ' · ' + x));
        r.r.dno.forEach((x) => NALAZI.dno.push(gdje(r) + ' · ' + x));
        // ⑦ se mjeri u DVIJE faze (na vrhu i na dnu skrola), pa isti element zna doći dvaput
        // kad zaglavlje ostane u ekranu. Nalaz je isti — broji se jednom.
        new Set(r.r.bocno.concat(m.bocno)).forEach((x) => NALAZI.bocno.push(gdje(r) + ' · ' + x));
        r.r.spremnik.forEach((x) => NALAZI.spremnik.push(gdje(r) + ' · ' + x));

        // ⑩ — v. tvrdnju niže. Nijedan prijavljeni ekran nije u `BEZ_IZREZA`, pa je svaki
        // ovdje obvezan imati `viewport-fit=cover`.
        if (!r.m.podIzrezom && !(r.ekran in G.BEZ_IZREZA)) {
            PREMISA.neprijavljeni.push(gdje(r) + ' · nema `viewport-fit=cover`, a nije u BEZ_IZREZA');
        }
    });

    if (G.spremiOsnovicu('prijavljeno', NALAZI)) {
        console.log('⚠️  phone-baseline.json PREPISAN (prijavljeno) — provjeri diff prije commita.');
    }
});

function protivOsnovice(kljuc, poruka) {
    const { novi, rijeseni } = G.usporediSOsnovicom('prijavljeno', kljuc, NALAZI[kljuc]);
    if (rijeseni.length) {
        console.log('\n✅ RIJEŠENO (' + kljuc + ', ' + rijeseni.length + ') — spusti osnovicu:\n   '
            + rijeseni.join('\n   ') + '\n');
    }
    expect(novi, poruka).toEqual([]);
}

test('① otok: prijavljene stranice ne stavljaju ništa ispod izreza', async () => {
    protivOsnovice('otok', 'NOVE kontrole ispod Dynamic Islanda (BUG-031)');
});

test('② kromo: trake prijavljenih stranica ostaju u budžetu', async () => {
    protivOsnovice('kromo', 'NOVE trake koje pojedu ekran (cigla T3)');
});

test('③ jedan krati, drugi se lomi — i na polici i u Studiju', async () => {
    protivOsnovice('sukob', 'NOV susjed pojeden susjedom koji se lomi (BUG-030)');
});

test('④ prvi ekran: iz police i Studija se bez skrola da nešto napraviti', async () => {
    protivOsnovice('prviEkran', 'NOVI prijavljeni ekrani bez ijedne dohvatljive kontrole');
});

test('⑧ trajni donji namještaj nije prekriven ni iza prijave (T4)', async () => {
    // Prijavljene stranice danas nemaju donju traku, pa je ovo tvrdnja o BUDUĆNOSTI: polica
    // i Studio su prve kandidatkinje za donji namještaj (P2), a cookie-traka ih dočeka.
    protivOsnovice('namjestaj', 'NOVO prekriven donji namještaj na prijavljenoj stranici');
});

test('⑤ zaglavlje razine je čitljivo i iza prijave', async () => {
    protivOsnovice('zaglavlje', 'NOVI naslovi razine koje korisnik ne može pročitati (BUG-030)');
});

test('⑥ donji rub: polica i Studio ne guraju kontrole pod home-indikator', async () => {
    // Studio je ovdje najizloženiji: njegova ljuska je `position:fixed` sa svojim
    // skrolerom, pa joj `padding-bottom` na `body` NE POMAŽE — donji rub mora nadoknaditi
    // sama. Baš zato prijavljena brana mjeri isto što i javna, a ne „valjda vrijedi i ovdje".
    protivOsnovice('dno', 'NOVE kontrole ispod home-indikatora (BUG-031)');
});

test('⑦ bočni rub: polegnut telefon i iza prijave', async () => {
    protivOsnovice('bocno', 'NOVE kontrole ispod bočnog izreza (BUG-031)');
});

test('⑦b spremnik prijavljenih stranica poštuje sigurnu zonu', async () => {
    protivOsnovice('spremnik', 'NOVI spremnici sadržaja koji ulaze u sigurnu zonu (BUG-031)');
});

test('⑨ dodir ne zumira: nijedno tekstualno polje ispod 16 px (F1/10) — i iza prijave', async () => {
    // iOS zumira pri fokusu polja s fontom < 16 px i ne vraća se. Mjeri se IZRAČUNATI font,
    // ne izvor: pravilo koje ga diže mora pogoditi polje kroz kaskadu (specifičnost), a to se
    // vidi samo na stranici. Do F1/10 je pravilo bilo iza njuškanja motora koje nijedan naš
    // motor ne zadovoljava — pa je brana koja bi ga mjerila bila nemoguća, ne samo odsutna.
    protivOsnovice('polja', 'NOVA polja ispod 16 px — iOS na dodir zumira (F1/10)');
});

test('⓪ pokrivenost: sve prijavljene stranice na sva četiri profila', async () => {
    expect(izmjerenoEkrana, 'izmjerenih prijavljenih ekrana')
        .toBe(G.EKRANI.length * G.EKRANI_PRIJAVLJENI.length);
});

// ⑩ POVOD: javna brana je istu tvrdnju dobila u ①/3b, ali `editor.html` ondje ne dolazi —
// on je **jedini dokument koji mjeri isključivo ova suita**. Bez ove tvrdnje bilo bi dovoljno
// obrisati `viewport-fit=cover` iz `editor.html` da se pravila o sigurnoj zoni TIHO ugase za
// `editor` i `admin` na sve četiri širine, a obje suite ostanu zelene. Premisa mora biti
// mjerena ondje gdje se stranica mjeri, ne samo ondje gdje se prvi put primijetila.
test('⑩ premisa sigurne zone je IZMJERENA i iza prijave', async () => {
    expect(PREMISA.neprijavljeni,
        'prijavljen ekran bez `viewport-fit=cover` — pravila o sigurnoj zoni su mu TIHO ugašena').toEqual([]);
});
