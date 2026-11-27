// T0 · MJERAČ TELEFONA — odjavljen posjetitelj (faza „TELEFON", spec §9.3 i §9.7).
//
// ── ZAŠTO JE PRVA CIGLA FAZE BRANA, A NE POPRAVAK ────────────────────────────────
// Leon je na iPhoneu 16 zatekao produkciju u stanju koje je opisao kao „apsolutno DNO
// DNA", dok je **svih desetak gateova bilo zeleno**. Nijedan nije lagao — nijedan
// jednostavno nije mjerio telefon kao STRANICU: axe mjeri na 1280 px, `css:diff`
// uspoređuje nas sa samima sobom (ravnomjerno loše stanje mu je savršeno stabilno), a
// K3/K4a mjere KROMO. Popravljati prije nego što se dobije brojka značilo bi popravljati
// naslijepo, pa faza počinje mjerom.
//
// ── OBRNUTA PROVJERA (izmjereno PRIJE nego je napisana ijedna tvrdnja) ───────────
// Mjerač je pušten na **produkciju**, koja kvar dokazano ima. Sve tvrdnje su ondje
// pale, i to na brojkama koje se poklapaju sa zapisom u BUGS.md:
//
//   ①  landing: `a.landing-logo` y=20…52 · `button.nav-cta` („Start studying") y=18…53
//   ②  browse dubina 31 % · lessons 25 % · study 23 % upotrebljive visine
//   ③  `.browse-title › #browseBreadcrumb` = 5 redaka dok susjedni naslov krati
//   ④  landing/lessons/study: NIJEDNA sadržajna kontrola nije dohvatljiva bez skrola
//   ⑤  `h1#browseHeading` odrezan na **34 od 187 px** (18 %) → korisnik vidi „C…"
//
// 19 od 30 ekrana produkcije ima bar jedan kvar. Brana time nije teorijska.
//
// ⚠️ **Brana je i sama bila kriva, tri puta, i to je dio njezine vrijednosti.** Prva mjera
// je bočnu traku (`translateX(100%)`, dakle IZVAN ekrana) brojala kao kromo od 100 %, a
// gumb zatvorenog dijaloga (`visibility:hidden`) kao sadržaj u otoku. Treća je tražila
// sukob samo u flex-RETKU — i zato **nije okinula na produkciji**, gdje su mrvica i
// naslov uloženi u `display:block` spremniku. Sve tri je otkrilo puštanje mjere na stanje
// za koje se ZNA da je pokvareno. *Detektor koji nije obrnuto provjeren mjeri sebe, ne
// stranicu.*
//
// ── ⚠️ OSNOVICA, NE NULA ─────────────────────────────────────────────────────────
// Nalazi ove brane dodijeljeni su ciglama **T1–T5**, pa bi traženje nule držalo cijelu
// suitu crvenom kroz pet cigli — a tad prava regresija u ostalih 400+ testova nestane u
// šumu. Zato vrijedi obrazac `check:palette`: **pada se samo na kvaru kojeg u
// `tests/phone-baseline.json` NEMA.** Spuštanje osnovice je izričita radnja:
//
//     PHONE_BASELINE_UPDATE=1 npx playwright test tests/phone.spec.js --project=iPhone-SE-375
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const G = require('./helpers/phone-gate');

const KORIJEN = path.join(__dirname, '..');

/**
 * ⑪ (①/3c) — GDJE se mjeri svaki dokument iz korijena.
 *
 * Do ①/3c je „mjerač je obišao sve ekrane" značilo „obišao je onoliko koliko piše u ručnim
 * popisima" — dakle tvrdnja o sebi, ne o projektu. Pet stranica (pravila, uvjeti, FAQ, kontakt,
 * odjava) nije mjerio nitko, a do njih vodi podnožje svake druge stranice.
 *
 * ⚠️ Popis se provjerava PROTIV DISKA u oba smjera: nova `.html` koju nitko ne mjeri obara branu,
 *    i mrtav unos je obara. Nije iznimka nego pokazivač — svaki redak kaže GDJE se mjeri.
 */
/**
 * ⚠️ `ekrani` su IMENA KOJA MORAJU BITI IZMJERENA, i pišu se OVDJE — ne izvode se iz popisa
 * obilaska. Prva verzija ove tvrdnje gradila ih je iz `G.SAMOSTALNE`, pa je izbacivanje
 * stranice iz obilaska uklonilo i nju i očekivanje: obrnuta provjera je ostala **zelena**.
 * Isti razred kao ⓪, samo pomaknut za jedan korak. Izvor istine je DISK (ključevi, provjereni
 * u oba smjera) plus ovaj izričit popis; `null` znači „ne mjeri ga ova suita" ili „daje više
 * ekrana nego što ima smisla nabrajati" i tada vrijedi ⓪.
 */
const DOKUMENTI = {
    'index.html': { gdje: 'ova suita — EKRANI_JAVNI + načini učenja (cijela aplikacija)', ekrani: null },
    'editor.html': { gdje: 'phone.authed.spec.js — EKRANI_PRIJAVLJENI (Studio i admin traže prijavu)', ekrani: null },
    'odobrenje.html': { gdje: 'ova suita — oba stanja (①/3b)', ekrani: ['odobrenje:prijavi-se', 'odobrenje:dopusti-odbij'] },
    'privacy.html': { gdje: 'ova suita (①/3c)', ekrani: ['privacy'] },
    'terms.html': { gdje: 'ova suita (①/3c)', ekrani: ['terms'] },
    'faq.html': { gdje: 'ova suita (①/3c)', ekrani: ['faq'] },
    'contact.html': { gdje: 'ova suita (①/3c)', ekrani: ['contact'] },
    'odjava.html': { gdje: 'ova suita (①/3c), bez tokena', ekrani: ['odjava'] }
};

test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== 'iPhone-SE-375',
        'brana sama postavlja tri širine → vrti se jednom, ne po profilu');
});

/** Jedan obilazak puni ovo; sedam tvrdnji ga onda samo čita. Mjerenje je skupo
 *  (4 profila × 10 ekrana ≈ 3 min), pa se ne ponavlja po tvrdnji. */
const NALAZI = {
    otok: [], kromo: [], sukob: [], prviEkran: [], zaglavlje: [],
    dno: [], bocno: [], spremnik: [], namjestaj: [], polja: []
};
let izmjerenoEkrana = 0;
/** ⑩ — premisa pravila o sigurnoj zoni (①/3b). Tvrda provjera, ne čegrtaljka. */
const PREMISA = { neprijavljeni: [], mrtvi: [] };
/** Imena ekrana koja je mjerač STVARNO izmjerio — ⑪ ih uspoređuje s popisom obilaska. */
const IZMJERENI = new Set();

// ── ODOBRENJE ZA KORISNIKOV AI (①/3b) ────────────────────────────────────────────
// Prva mjerena stranica koja NIJE aplikacija nego samostalan dokument bez `viewport-fit=
// cover`, i prva do koje se ne dolazi navigacijom nego poveznicom iz tuđe aplikacije. Ovdje
// korisnik daje pristup svom gradivu — ekran koji brana ne posjećuje je ekran koji brana ne
// vidi, a ovaj se k tome otvara na TELEFONU češće nego bilo koji drugi (poveznica iz chata).
const ODOBRENJE = {
    projekt: 'https://odobrenjetest.supabase.co',
    authId: 'a1b2c3d4-0000-4000-8000-000000000001',
    povratak: 'https://claude.ai/api/mcp/auth_callback'
};

function odobrenjeSesija() {
    const sad = Math.floor(Date.now() / 1000);
    return {
        access_token: 'e30.e30.e30', token_type: 'bearer', expires_in: 3600, expires_at: sad + 3600,
        refresh_token: 'lazni-refresh',
        user: { id: '00000000-0000-4000-8000-00000000abcd', aud: 'authenticated', role: 'authenticated', email: 'student@primjer.hr' }
    };
}

/** Otvori `odobrenje.html` u jednom od dva stanja; Auth je podmetnut, mreža se ne dira. */
async function otvoriOdobrenje(ctx, stanje) {
    const page = await ctx.newPage();
    await page.route(ODOBRENJE.projekt + '/**', (route) => {
        const u = new URL(route.request().url());
        if (u.pathname === '/auth/v1/oauth/authorizations/' + ODOBRENJE.authId) {
            return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({
                authorization_id: ODOBRENJE.authId, redirect_uri: ODOBRENJE.povratak, scope: '',
                client: { id: 'c1', name: 'Claude', uri: '', logo_uri: '' },
                user: { id: '00000000-0000-4000-8000-00000000abcd', email: 'student@primjer.hr' }
            }) });
        }
        return route.fulfill({ status: 404, contentType: 'application/json', body: '{}' });
    });
    await page.addInitScript(([p, s]) => {
        try {
            localStorage.setItem('sokrat-ui-lang', 'hr');
            localStorage.setItem('sokrat-supabase-override', JSON.stringify({ url: p, publishableKey: 'sb_publishable_test' }));
            if (s) localStorage.setItem('sb-odobrenjetest-auth-token', JSON.stringify(s));
        } catch (e) { /* private */ }
    }, [ODOBRENJE.projekt, stanje === 'dopusti-odbij' ? odobrenjeSesija() : null]);

    await page.goto('/odobrenje.html?authorization_id=' + ODOBRENJE.authId);
    await page.waitForFunction(() => typeof window.t === 'function');
    // Čeka se STANJE, ne vrijeme: fiksna pauza bi izmjerila stranicu prije nego se odluči
    // što na njoj piše (isti razred kao `smiriPrikaz` niže u helperu).
    await page.waitForSelector(stanje === 'dopusti-odbij' ? '#oauthActions:not([hidden])' : '#oauthSigninBtn',
        { state: 'visible', timeout: 20000 });
    return page;
}

test.beforeAll(async ({ browser }, testInfo) => {
    // ⚠️ `beforeEach`-preskok NE zaustavlja `beforeAll` — bez ove straže bi se cijelo
    // mjerenje (3 širine × 10 ekrana) vrtjelo **četiri puta**, jednom po iPhone profilu,
    // a rezultat bi se svaki put bacio. Straža mora stajati na OBA mjesta.
    if (testInfo.project.name !== 'iPhone-SE-375') return;

    // ⚠️ Port se NE prepisuje ovdje — dolazi iz `playwright.config.js`. Vlastiti kontekst
    // treba jer svaka širina ima i svoju VISINU (kromo se mjeri kao udio ekrana, pa bi
    // zajednička izmišljena visina dala krivi postotak), a `setViewportSize` ne mijenja
    // `deviceScaleFactor`/`isMobile`.
    const baseURL = testInfo.project.use.baseURL;
    const snimka = [];

    for (const e of G.EKRANI) {
        const ctx = await browser.newContext({
            viewport: { width: e.w, height: e.h },
            deviceScaleFactor: 3, isMobile: true, hasTouch: true,
            baseURL
        });
        const page = await ctx.newPage();
        await page.goto('/');
        await G.spreman(page);
        await page.waitForTimeout(800);

        for (const ekran of G.EKRANI_JAVNI) {
            await G.idiNa(page, ekran, e.rub);
            const m = await G.mjeriStranicu(page, e.rub);
            snimka.push({ e, ekran, m, r: await G.mjeriRubove(page, e.rub) });
        }

        // Četiri načina učenja na PRAVOJ lekciji. Leon ih je ocijenio kao „čine se ok" —
        // brana to pretvara u brojku, bez ijedne dodatne cigle.
        await G.idiNa(page, 'study', e.rub);
        snimka.push({
            e, ekran: 'study:home',
            m: await G.mjeriStranicu(page, e.rub), r: await G.mjeriRubove(page, e.rub)
        });
        for (const n of G.NACINI) {
            await G.otvoriNacin(page, n, e.rub);
            snimka.push({
                e, ekran: 'study:' + n,
                m: await G.mjeriStranicu(page, e.rub), r: await G.mjeriRubove(page, e.rub)
            });
        }

        // MREZA-E4: uvjetni tabovi (exercises · blind-map) — na predmetu koji ih IMA,
        // biranom iz kataloga po značajci. Do E4 jedina dva načina učenja bez mjere.
        for (const u of G.NACINI_UVJETNI) {
            await G.idiNa(page, u.ruta, e.rub);
            await G.otvoriNacin(page, u.tab, e.rub);
            snimka.push({
                e, ekran: 'study:' + u.tab,
                m: await G.mjeriStranicu(page, e.rub), r: await G.mjeriRubove(page, e.rub)
            });
        }

        // ①/3b — stranica odobrenja, oba stanja. Vlastita kartica po stanju: podmetnuti Auth i
        // sesija se postavljaju PRIJE prvog crtanja, pa se ne mogu naknadno ugurati u ovu.
        for (const stanje of G.EKRANI_ODOBRENJE) {
            const p = await otvoriOdobrenje(ctx, stanje);
            await G.postaviRub(p, e.rub);
            snimka.push({
                e, ekran: 'odobrenje:' + stanje,
                m: await G.mjeriStranicu(p, e.rub), r: await G.mjeriRubove(p, e.rub)
            });
            await p.close();
        }

        // ①/3c — pet samostalnih dokumenata. Vlastita kartica jer nisu aplikacija: do njih se
        // ne ide `navigateTo`-om nego pravom navigacijom, i nemaju `AppState`.
        for (const ime of G.SAMOSTALNE) {
            const p = await ctx.newPage();
            await p.goto('/' + ime + '.html');
            await p.waitForSelector('main.legal', { state: 'visible', timeout: 20000 });
            await p.waitForLoadState('load');
            // ⚠️ BEZ OVOGA JE MJERA NEPOPRAVLJIVA. Chromium ne zna `env()`, pa je sigurna zona na
            // stranici 0 px — a `mjeri()` sudi po profilu uređaja (59 px). Bez ubrizgavanja se CSS
            // nadoknada doslovno ne može vidjeti, pa bi stranica ostala crvena što god napisali.
            // `idiNa` to radi za ekrane aplikacije, `mjeriRubove` za svoju fazu; samostalni
            // dokumenti idu mimo oba puta i moraju sami. (Nađeno u ①/3d, kad nadoknada nije
            // pomaknula nijednu koordinatu.)
            await G.postaviRub(p, e.rub);
            snimka.push({
                e, ekran: ime,
                m: await G.mjeriStranicu(p, e.rub), r: await G.mjeriRubove(p, e.rub)
            });
            await p.close();
        }

        await ctx.close();
    }

    izmjerenoEkrana = snimka.length;
    /** `320px browse:dubina` — jedna oznaka za sve poruke, da se nalaz da naći bez traženja. */
    const gdje = (r) => r.e.w + 'px ' + r.ekran;

    snimka.forEach((r) => {
        IZMJERENI.add(r.ekran);
        const m = r.m;
        m.uOtoku.forEach((x) => NALAZI.otok.push(gdje(r) + ' · ' + x));
        if (m.kromoPct > G.KROMO_BUDZET_PCT) {
            NALAZI.kromo.push(gdje(r) + ' · ' + m.kromoPct + ' % (' + m.nasKromo + ' od '
                + m.upotrebljivaVisina + ' px) · ' + m.trake.join(' + '));
        }
        m.sudari.forEach((x) => NALAZI.sukob.push(gdje(r) + ' · ' + x));
        if (m.upotrebljivih === 0) {
            NALAZI.prviEkran.push(gdje(r) + ' · kromo ' + m.kromoPx + ' px'
                + (m.bannerPx ? ' + banner ' + m.bannerPx + ' px (' + m.bannerPct + ' %)' : '')
                + ' od ' + m.vh + ' px');
        }
        m.namjestaj.forEach((x) => NALAZI.namjestaj.push(gdje(r) + ' · ' + x));
        m.zaglavlja.forEach((x) => NALAZI.zaglavlje.push(gdje(r) + ' · ' + x));
        m.sitnaPolja.forEach((x) => NALAZI.polja.push(gdje(r) + ' · ' + x));
        r.r.dno.forEach((x) => NALAZI.dno.push(gdje(r) + ' · ' + x));
        // ⑦ se mjeri u DVIJE faze (na vrhu i na dnu skrola), pa isti element zna doći dvaput
        // kad zaglavlje ostane u ekranu. Nalaz je isti — broji se jednom.
        new Set(r.r.bocno.concat(m.bocno)).forEach((x) => NALAZI.bocno.push(gdje(r) + ' · ' + x));
        r.r.spremnik.forEach((x) => NALAZI.spremnik.push(gdje(r) + ' · ' + x));

        // ⑩ — premisa se BILJEŽI pri svakom ekranu, da je ne treba pogađati poslije.
        if (!r.m.podIzrezom && !(r.ekran in G.BEZ_IZREZA)) {
            PREMISA.neprijavljeni.push(gdje(r) + ' · nema `viewport-fit=cover`, a nije u BEZ_IZREZA');
        }
    });

    PREMISA.mrtvi = Object.keys(G.BEZ_IZREZA).filter(
        (k) => !snimka.some((r) => r.ekran === k && r.m.podIzrezom === false)
    );

    if (G.spremiOsnovicu('javno', NALAZI)) {
        console.log('⚠️  phone-baseline.json PREPISAN (javno) — provjeri diff prije commita.');
    }
});

/** Padne samo na NOVOM kvaru; riješene poznate ispiše glasno (zastarjela osnovica krije). */
function protivOsnovice(kljuc, poruka) {
    const { novi, rijeseni } = G.usporediSOsnovicom('javno', kljuc, NALAZI[kljuc]);
    if (rijeseni.length) {
        console.log('\n✅ RIJEŠENO (' + kljuc + ', ' + rijeseni.length + ') — spusti osnovicu:\n   '
            + rijeseni.join('\n   ') + '\n');
    }
    expect(novi, poruka).toEqual([]);
}

test('① otok: ništa interaktivno ne stoji u gornjih 59 px', async () => {
    // `viewport-fit=cover` NIJE postavka nego obveza: njime se stranica izričito
    // prijavljuje za crtanje ispod izreza, pa je od tog trenutka svaki nenadoknađeni
    // `env()` regresija. Podloga ondje smije biti; gumb i slovo ne smiju.
    protivOsnovice('otok', 'NOVE kontrole ispod Dynamic Islanda (BUG-031)');
});

test('② kromo: naše trake troše najviše 20 % upotrebljive visine', async () => {
    // Otok se ne broji — uređaj ga uzima svakome i nije naš trošak. Mjeri se koliko od
    // onoga što IMAMO trošimo na trake. Popis poznatih probijanja = radni popis cigle T3.
    protivOsnovice('kromo', 'NOVE trake koje pojedu ekran (cigla T3)');
});

test('③ jedan krati, drugi se lomi: sukob koji je dao naslov „C…"', async () => {
    // Mehanizam BUG-030. Dva ispravna pravila u istom spremniku daju kvar koji nema
    // nijedno od njih: ono što se lomi određuje visinu, ono što krati ne određuje ništa.
    protivOsnovice('sukob', 'NOV susjed pojeden susjedom koji se lomi (BUG-030)');
});

test('④ prvi ekran: bar jedna sadržajna kontrola dohvatljiva bez skrola', async () => {
    // Dohvatljivost, ne postojanje: cookie-banner je `position:fixed` sa
    // `z-index: 2147483000`, pa gumb ispod njega ima savršen pravokutnik i nikakvu
    // upotrebljivost. Zato `elementFromPoint`, kao u K3.
    protivOsnovice('prviEkran', 'NOVI ekrani na kojima se bez skrola ne da ništa napraviti');
});

test('⑧ trajni donji namještaj nije prekriven (cigla T4)', async () => {
    // Tvrdnja ④ ovo NIJE mogla reći: ondje je dovoljna bilo koja dohvatljiva kontrola, pa
    // je stranica na kojoj je cijela donja navigacija pod cookie-trakom prolazila čim je
    // imala neki gumb u sadržaju (`study:quiz`, `study:learn`). Ista traka je istovremeno
    // obarala `study:home`, `study:flashcards` i `study:fill` — jedan uzrok, pet ishoda,
    // i nijedan nije imenovao pravu stvar. Ova tvrdnja imenuje.
    protivOsnovice('namjestaj', 'NOVO prekriven donji namještaj (promjena načina učenja)');
});

test('⑤ zaglavlje razine je čitljivo: jedan redak i nije odrezano', async () => {
    // Dvije mjere iste stvari — „znam li gdje sam?". Preko jednog retka znači da je
    // naziv razine narastao u stupac; odrezan ispod 60 % znači da ga je netko drugi
    // pojeo. Hero-naslov landinga NIJE ovdje: on smije omotati (tipografija, T5).
    protivOsnovice('zaglavlje', 'NOVI naslovi razine koje korisnik ne može pročitati (BUG-030)');
});

test('⑥ donji rub: na dnu skrola ništa se ne krije ispod home-indikatora', async () => {
    // Mjeri se NA DNU jer je samo ondje kvar trajan: dok se skrola, sadržaj kroz pojas
    // prolazi i to je normalno. Ostaje ono što iz njega ne može izaći — fiksni namještaj
    // (cookie-banner, donja traka učenja) i sam kraj dokumenta.
    protivOsnovice('dno', 'NOVE kontrole ispod home-indikatora (BUG-031)');
});

test('⑦ bočni rub: u landscapeu ništa ne stoji ispod izreza sa strane', async () => {
    // U portretu su bočni rubovi 0, pa ova tvrdnja govori o POLEGNUTOM telefonu — jedinoj
    // orijentaciji koju kriterij T1 imenuje, a koju do T1 nije mjerio nitko.
    protivOsnovice('bocno', 'NOVE kontrole ispod bočnog izreza (BUG-031)');
});

test('⑦b spremnik sadržaja poštuje sigurnu zonu i kad u njoj nema gumba', async () => {
    // Razlika između PRAVILA i SLUČAJA. Da se traži samo „nijedna kontrola nije u
    // pojasu", stranica koja slučajno nema gumb uz rub prošla bi bez ijednog pravila o
    // sigurnoj zoni — i kvar bi se vratio čim netko doda gumb. Zato se mjeri i gdje
    // počinje sam spremnik sadržaja.
    protivOsnovice('spremnik', 'NOVI spremnici sadržaja koji ulaze u sigurnu zonu (BUG-031)');
});

test('⑨ dodir ne zumira: nijedno tekstualno polje ispod 16 px (F1/10)', async () => {
    // iOS zumira pri fokusu polja s fontom < 16 px i ne vraća se. Mjeri se IZRAČUNATI font,
    // ne izvor: pravilo koje ga diže mora pogoditi polje kroz kaskadu (specifičnost), a to se
    // vidi samo na stranici. Do F1/10 je pravilo bilo iza njuškanja motora koje nijedan naš
    // motor ne zadovoljava — pa je brana koja bi ga mjerila bila nemoguća, ne samo odsutna.
    protivOsnovice('polja', 'NOVA polja ispod 16 px — iOS na dodir zumira (F1/10)');
});

test('⓪ pokrivenost: mjerač je stvarno obišao sve ekrane i sve širine', async () => {
    // Brana koja tiho preskoči ekran tvrdi nešto o njemu, a nije ga vidjela. Ovo je
    // izravna pouka BUG-017 („tvrdi gate vrijedi samo koliko pokriva") i K3
    // („broj u kriteriju koji nijedan test ne mjeri nije kriterij nego želja").
    const ocekivano = G.EKRANI.length
        * (G.EKRANI_JAVNI.length + 1 + G.NACINI.length + G.NACINI_UVJETNI.length
           + G.EKRANI_ODOBRENJE.length + G.SAMOSTALNE.length);
    expect(izmjerenoEkrana, 'izmjerenih ekrana').toBe(ocekivano);
});

// ⑪ POVOD (①/3c). ⓪ iznad tvrdi da je mjerač obišao sve iz POPISA — a popis je pisan rukom, pa
// je do sad značio „sve čega smo se sjetili". Pet stranica do kojih vodi podnožje svake druge
// stranice nije mjerio nitko. Ova tvrdnja popis veže za DISK: svaki dokument u korijenu je ili
// obiđen, ili imenovan uz mjesto na kojem se mjeri. Nova `.html` time pada po defaultu.
test('⑪ svaki dokument u korijenu je mjeren, i to piše GDJE', async () => {
    const naDisku = fs.readdirSync(KORIJEN).filter((f) => f.endsWith('.html')).sort();
    expect(naDisku.length, 'nijedan .html nije nađen — mjera je prazna, ne zelena').toBeGreaterThan(0);
    expect(naDisku.filter((f) => !(f in DOKUMENTI)),
        'NOVA .html stranica koju ne mjeri nijedna brana za telefon').toEqual([]);
    expect(Object.keys(DOKUMENTI).filter((f) => !naDisku.includes(f)),
        'mrtav unos — te datoteke u korijenu više nema').toEqual([]);

    // ⚠️ Nađeno obrnutom provjerom ove cigle, u DVA koraka. Izbacivanje stranice iz popisa
    // obilaska nije oborilo ⓪, jer ⓪ očekivani broj računa IZ ISTOG popisa iz kojeg i hoda —
    // tvrdnja o sebi. Uhvatila ga je samo ⑩, i to slučajno (ta mreža nestaje čim stranice
    // dobiju `viewport-fit=cover`). Prva zakrpa je gradila očekivanje iz `G.SAMOSTALNE` i
    // bila je JEDNAKO samoreferentna — obrnuta provjera je opet ostala zelena. Zato očekivani
    // ekrani stoje gore, uz disk, a ne u popisu po kojem se hoda.
    const trazeni = Object.keys(DOKUMENTI)
        .filter((f) => DOKUMENTI[f].ekrani)
        .reduce((a, f) => a.concat(DOKUMENTI[f].ekrani), []);
    expect(trazeni.length, 'nijedan dokument ne traži izmjeren ekran — tvrdnja bi prošla na prazno').toBeGreaterThan(0);
    expect(trazeni.filter((n) => !IZMJERENI.has(n)),
        'dokument traži izmjeren ekran, a mjerač ga nije obišao').toEqual([]);
});

// ⑩ POVOD (①/3b). Tvrdnje ①/⑥/⑦/⑦b nisu univerzalne — vrijede za stranicu koja se
// `viewport-fit=cover`-om prijavila da crta ispod izreza. Dok su sve mjerene stranice imale
// `cover`, ta je premisa bila nevidljiva i nitko je nije provjeravao. `odobrenje.html` je prva
// bez njega: mjerač je na njoj dao **14 nalaza koji na pravom iPhoneu ne postoje**, jer iOS
// stranicu bez te prijave slaže UNUTAR sigurne zone. Ova tvrdnja zato čuva premisu s obje
// strane — nitko ne smije ugasiti pravila brisanjem riječi iz `<meta>`, ni ostaviti ih
// ugašena kad ih stranica opet treba. Nije čegrtaljka: osnovica se na nju ne primjenjuje.
test('⑩ premisa sigurne zone je IZMJERENA, ne pretpostavljena', async () => {
    expect(PREMISA.neprijavljeni,
        'ekran bez `viewport-fit=cover` koji nije imenovan u BEZ_IZREZA — pravila o sigurnoj zoni su mu TIHO ugašena').toEqual([]);
    expect(PREMISA.mrtvi,
        'mrtav unos u BEZ_IZREZA — ta stranica sad IMA `viewport-fit=cover`, a pravila su joj i dalje ugašena').toEqual([]);
});
