// Landing: hero BEZ ŽIVOG PRIKAZA, dvoje vrata, katalog-traka, podnožje.
//
// Ovi testovi se prepisuju zajedno s površinom (spec §5, „poznata zamka"): da stari
// ostanu, suita pada; da se samo obrišu, ne ostaje ništa što čuva novu stranicu.
//
// ⚠️ 2026-08-15 (spec §7.13): obrisana su DVA testa koja su čuvala živi prikaz u heroju
// („jedan unos → četiri moda" i „unos se ne tumači kao HTML"). Nisu pali — značajka je
// UKLONJENA ODLUKOM: Leon je landing odbio kad ga je vidio, jer je tražio od posjetitelja
// da RADI prije nego mu je dan razlog. Razlika je bitna i zato stoji zapisana: test koji
// padne znači kvar, test koji nestane znači promjenu opsega. Umjesto njih stoji tvrdnja
// da hero od posjetitelja NE traži ništa — inače bi se demo mogao vratiti neopaženo.
const { test, expect } = require('@playwright/test');

test('landing: nav, brojka iz kataloga i vitrina predmeta', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

  await page.goto('/');
  await page.waitForFunction(
    () => window.SOKRAT_CATALOG && document.querySelectorAll('#landingSubjects .landing-subject-card').length > 0
  );

  // BROJ i VITRINA imaju različit doseg, i to je namjerno (Leon, 2026-08-09):
  //  • broj      = CIJELA platforma kroz sve programe (danas 17 EN + 7 HR)
  //  • vitrina   = samo primarni program; HR predmeti se dohvaćaju kroz Browse
  // ⚠️ Brojevi u ovom komentaru su ILUSTRACIJA, ne tvrdnja — tvrdnje ispod se računaju
  // iz kataloga. Da su zakucani, ostarili bi istog dana kad je dodan predmet.
  const counts = await page.evaluate(() => {
    const seen = {}; let total = 0;
    (SOKRAT_CATALOG.faculties || []).forEach((f) => (f.programs || []).forEach((p) => {
      SokratCatalog.subjectsOf(p.id).forEach((s) => { if (s && s.id && !seen[s.id]) { seen[s.id] = true; total++; } });
    }));
    return { total: total, primary: SokratCatalog.subjectsOf('hospitality-management').length };
  });

  // Regresijska brana: da netko vrati broj na primarni program, `total` i `primary` bi se
  // poklopili i tvrdnja ispod bi prošla lažno. Ovo traži da razlika STVARNO postoji.
  expect(counts.total, 'katalog nema više programa — test bi postao bezvrijedan')
    .toBeGreaterThan(counts.primary);

  await expect(page.locator('.topbar')).toBeVisible();   // K2b: landing dijeli globalnu traku

  const metaText = await page.$eval('[data-meta="subjectCount"]', (el) => el.textContent.trim());
  expect(metaText).toBe(String(counts.total));

  // C2 je BROJ PITANJA UKLONIO s landinga, i to je tvrdnja koju treba čuvati.
  // Pokrivao je 17 od 22 predmeta (`compute-stats.js` namjerno preskače prijevode da
  // isto gradivo ne broji dvaput), pa je uz „22 predmeta" bio nedosljedan. Kriterij
  // prihvaćanja #5 traži da se brojke slažu — ispunjeno brisanjem, ne pogađanjem.
  expect(await page.locator('[data-meta="questionCount"]').count(),
    'brojka pitanja se vratila na landing — pokriva 17/22, v. spec kriterij #5').toBe(0);

  // ⚠️ 2026-08-16 (spec §7.13 ②): vitrina je do danas pokazivala SAMO primarni program,
  // pa su vrata pisala `total` a mreža nudila `primary` — stranica je proturječila samoj
  // sebi. Sad se crtaju SVI, a jezik razdvaja filtar. Tvrdnja se zato mijenja s primary
  // na total; da je samo obrisana, ništa ne bi čuvalo novu namjeru.
  const showcase = await page.$$eval('#landingSubjects .landing-subject-card:not(.landing-subject-card--make)', (e) => e.length);
  expect(showcase, 'vitrina se vratila na jedan program — vrata i mreža opet lažu').toBe(counts.total);

  // ＋ pločica: točno jedna, i to IZA POSLJEDNJEG predmeta (§7.13). Pozicija je dio
  // tvrdnje — na fiksnom mjestu bi čitala kao stavka popisa, a ne kao njegov kraj.
  const plus = await page.$$eval('#landingSubjects .landing-subject-card', (sve) => {
    const zadnji = sve[sve.length - 1];
    return { n: sve.filter((e) => e.classList.contains('landing-subject-card--make')).length,
             zadnja: !!(zadnji && zadnji.classList.contains('landing-subject-card--make')) };
  });
  expect(plus.n, '＋ pločica mora postojati točno jednom').toBe(1);
  expect(plus.zadnja, '＋ pločica nije na kraju — čita se kao stavka popisa, ne kao njegov kraj').toBe(true);

  await expect(page.locator('.landing-footer .footer-cols')).toBeVisible();

  const vw = page.viewportSize().width;
  const docScrollW = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(docScrollW).toBeLessThanOrEqual(vw + 1);

  expect(errors).toEqual([]);
});

test('landing: hero NE traži nikakav unos od posjetitelja', async ({ page }) => {
  // Nasljednik dvaju obrisanih demo-testova. Ne čuva izgled nego ODLUKU iz §7.13:
  // prvi ekran daje razlog, ne zadatak. Bez ovoga bi se živi prikaz mogao vratiti
  // sljedećim editom, a nijedan drugi test to ne bi primijetio.
  await page.goto('/');
  await page.waitForSelector('#landing-page.active');

  expect(await page.locator('#heroDemo').count(), 'živi prikaz se vratio u hero').toBe(0);

  // Šire od samog demoa: BILO KOJE polje za unos na landingu znači da smo posjetitelju
  // opet dali posao. Tražilica kataloga je jedina dopuštena iznimka (§7.13 ②) — i od
  // 2026-08-16 je ovdje izuzeta IMENOM, kako je prošla sesija i propisala. Tvrdnja
  // ostaje živa: doda li netko drugo polje, ovo i dalje pada.
  const polja = await page.locator('#landing-page input:not(#catalogSearch), #landing-page textarea').count();
  expect(polja, 'landing traži unos od posjetitelja koji još nije dobio razlog').toBe(0);

  // Iznimka mora biti STVARNA, ne rupa: tražilica smije postojati, ali NE u heroju.
  // Bez ovoga bi se demo mogao vratiti pod imenom `catalogSearch` i proći.
  const uHeroju = await page.evaluate(() => {
    const t = document.getElementById('catalogSearch');
    const katalog = document.querySelector('.landing-catalog');
    return !!(t && katalog && katalog.contains(t));
  });
  expect(uHeroju, 'tražilica je izvan sekcije kataloga — iznimka vrijedi samo unutar nje').toBe(true);
});

test('landing: dvoje vrata vode na browse i na vlastiti materijal', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

  await page.goto('/');
  await page.waitForFunction(() => window.enterBrowse);

  // Primarna vrata → drill-down browse.
  await page.click('.doors .door--primary');
  await page.waitForSelector('#browse-page.active', { timeout: 5000 });
  await page.waitForSelector('.browse-card[data-browse="faculty"]');

  // Natrag na landing → druga vrata vode u vlastiti materijal.
  await page.evaluate(() => window.navigateTo('landing'));
  await page.waitForSelector('#landing-page.active');
  await page.click('.doors [data-goto-materials]');
  await page.waitForSelector('#materials-page.active', { timeout: 5000 });

  expect(errors).toEqual([]);
});

test('landing: „Poveži AI" u herou otvara upute s PRODUKCIJSKOM adresom, a skripta stiže tek na klik', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

  await page.goto('/');
  await page.waitForFunction(() => window.SokratLoad);
  // Naslovnica ne plaća prozor dok ga nitko ne traži.
  expect(await page.evaluate(() => typeof window.SokratConnectAi)).toBe('undefined');

  await page.click('.hero-ai[data-connect-ai]');
  const prozor = page.locator('#caiModal');
  await expect(prozor.locator('.cai__title')).toBeVisible({ timeout: 5000 });
  await expect(prozor.locator('[data-cai-addr]')).toHaveText('https://www.sokratstudy.com/mcp');
  await expect(prozor.locator('.cai__open')).toHaveAttribute('href', 'https://claude.ai/settings/connectors');
  // Neprijavljen posjetitelj dobiva savjet koji izbjegava istek zahtjeva (izmjereno 17.11.).
  await expect(prozor.locator('.cai__note--signin')).toBeVisible();

  expect(errors).toEqual([]);
});

test('landing: kartica predmeta otvara lekcije tog predmeta', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

  await page.goto('/');
  await page.waitForFunction(
    () => document.querySelectorAll('#landingSubjects .landing-subject-card').length > 0
  );

  await page.click('#landingSubjects .landing-subject-card[data-landing-subject="te2"]');
  await page.waitForSelector('#lessons-page.active', { timeout: 5000 });
  const title = (await page.textContent('#currentSubjectTitle')) || '';
  expect(title).toContain('Tourism Economics');

  expect(errors).toEqual([]);
});

test('landing: nijedan ukras ne prekriva sadržaj ispod ljepljive trake', async ({ page }) => {
  // Nasljednik starog „hero badge clears the fixed nav" testa. Stari je gađao element
  // kojeg više nema, ali je RAZLOG ostao: traka je `position: sticky`, pa prvi sadržaj
  // ispod nje mora počinjati ISPOD njenog donjeg ruba, ne pod njom.
  await page.goto('/');
  await page.waitForSelector('.topbar');
  await page.waitForSelector('.hero-kicker');

  const { navBottom, kickerTop } = await page.evaluate(() => {
    const nav = document.querySelector('.topbar').getBoundingClientRect();
    const kicker = document.querySelector('.hero-kicker').getBoundingClientRect();
    return { navBottom: nav.bottom, kickerTop: kicker.top };
  });

  expect(kickerTop).toBeGreaterThanOrEqual(navBottom - 1);
});
// ⚠️ T5 · POTEZ JE GESTA PREKO CIJELE FRAZE, PA SE NE SMIJE PRELOMITI (spec §9.12).
// Zatečeno na 320 i 393 px: „four" je stajalo na kraju retka, „ways" na početku sljedećeg —
// a potez prelomljen nasred fraze ne označava ništa nego izgleda kao greška.
//
// ⚠️ OVA TVRDNJA ČUVA ISHOD, NE MEHANIZAM, i to je zapisano zato što je prva verzija
// cigle imala krivi mehanizam. Napisao sam bio `white-space: nowrap` na `.hero-mark` jer
// je zvučao kao ispravak — obrnuta provjera ga je odbacila: s maknutim `nowrap`-om fraza
// ostaje cijela na svim mjerenim širinama i u oba jezika. **Drži je naslov sveden na
// stupac (T5), ne to pravilo.** Obrnuta provjera koja NOSI: vrati li se naslov na 48 px
// na telefonu, ova tvrdnja pada — provjereno.
//
// ⚠️ MJERI SE U OBA JEZIKA, jer je duljina fraze PODATAK, ne konstanta: hrvatsko
// „četiri načina" je 13 znakova naspram engleskih 9.
//
// ⚠️ 320 px SE MJERI IZRIČITO, i to je našla obrnuta provjera: projekti ove suite počinju
// na 375 px, a kriterij prihvaćanja (spec §2) imenuje 320. Brana koja ne posjeti najuži
// ekran ne čuva najuži ekran.
test('landing: potez preko fraze stoji u jednom retku i ne prelijeva stupac (T5)', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('#landing-page.active');

  const mjeri = () => {
    const m = document.querySelector('.hero-mark');
    const t = document.querySelector('.hero-title');
    return {
      tekst: m.textContent.trim(),
      redaka: m.getClientRects().length,
      sirina: Math.round(m.getBoundingClientRect().width),
      stupac: Math.round(t.getBoundingClientRect().width)
    };
  };

  const provjeri = (m, gdje) => {
    expect(m.redaka, gdje + ': potez „' + m.tekst + '" se lomi u ' + m.redaka + ' retka').toBe(1);
    // Druga polovica je zamka-brana: dok se fraza smije lomiti, ŠIRA od stupca ne može ni
    // biti. Bude li — netko je vratio `nowrap` (ili drugi strop) i time zamijenio prelom
    // PRELIJEVANJEM, što je gori kvar od onoga koji ova cigla popravlja.
    expect(m.sirina, gdje + ': potez „' + m.tekst + '" je ' + m.sirina + ' px u stupcu od '
      + m.stupac + ' px — netko je frazi zabranio prelom, pa sad prelijeva').toBeLessThanOrEqual(m.stupac);
  };

  const obaJezika = async (gdje) => {
    const prvi = await page.evaluate(mjeri);
    provjeri(prvi, gdje);
    // Čeka se STANJE (da se tekst promijenio), ne vrijeme — pouka T0 (spec §9.7).
    await page.evaluate(() => { toggleUiLang(); });
    await page.waitForFunction(
      (staro) => document.querySelector('.hero-mark').textContent.trim() !== staro, prvi.tekst);
    const drugi = await page.evaluate(mjeri);
    expect(drugi.tekst, gdje + ': jezik se nije stvarno prebacio — druga polovica tvrdnje bi'
      + ' mjerila isti tekst').not.toBe(prvi.tekst);
    provjeri(drugi, gdje);
  };

  const projekt = page.viewportSize();
  await obaJezika('projektna širina ' + projekt.width + ' px');

  await page.setViewportSize({ width: 320, height: 568 });
  await page.waitForFunction(() => window.innerWidth === 320);
  await obaJezika('320 px (najuži iz kriterija §2)');
});
