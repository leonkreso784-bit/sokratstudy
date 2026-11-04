// M0.5: full drill-down browse (Faculty → Program → Year → Subject), all from catalog.
const { test, expect } = require('@playwright/test');

test('browse drill-down renders from catalog and navigates to a subject', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

  await page.goto('/');
  await page.waitForFunction(() => window.SOKRAT_CATALOG && window.enterBrowse);

  // Open browse from the landing CTA → faculty level
  await page.click('.doors .door--primary');   // C2: hero-CTA #openStudyBtn je zamijenjen VRATIMA
  await page.waitForSelector('#browse-page.active', { timeout: 5000 });
  await page.waitForSelector('.browse-card[data-browse="faculty"]');

  // Faculty count matches catalog
  const facCount = await page.$$eval('.browse-card[data-browse="faculty"]', (e) => e.length);
  const expectedFac = await page.evaluate(() => window.SOKRAT_CATALOG.faculties.length);
  expect(facCount).toBe(expectedFac);

  // Drill: faculty → programs
  await page.click('.browse-card[data-browse="faculty"]');
  await page.waitForSelector('.browse-card[data-browse="program"]');
  const progCount = await page.$$eval('.browse-card[data-browse="program"]', (e) => e.length);
  const expectedProg = await page.evaluate(
    () => window.SOKRAT_CATALOG.faculties[0].programs.length
  );
  expect(progCount).toBe(expectedProg);

  // Drill: program → years. Expected years come from the catalog (the first program's
  // distinct subject years), not a hardcoded list — a new year (e.g. Year 3, 2026-11-04)
  // must not break the test.
  await page.click('.browse-card[data-browse="program"]');
  await page.waitForSelector('.browse-card[data-browse="year"]');
  const years = await page.$$eval('.browse-card[data-browse="year"]', (e) =>
    e.map((x) => Number(x.getAttribute('data-id'))).sort((a, b) => a - b)
  );
  const expectedYears = await page.evaluate(() => {
    const pid = window.SOKRAT_CATALOG.faculties[0].programs[0].id;
    return [...new Set(window.SOKRAT_CATALOG.subjects.filter((s) => s.programId === pid).map((s) => Number(s.year)))].sort((a, b) => a - b);
  });
  expect(years).toEqual(expectedYears);
  expect(years).toContain(2);

  // Drill: Year 2 → subjects grouped by semester
  await page.click('.browse-card[data-browse="year"][data-id="2"]');
  await page.waitForSelector('.browse-card[data-browse="subject"]');

  // Subject count for year 2 matches catalog — SCOPED to the program we drilled into
  // (faculties[0].programs[0]), NOT the whole catalog. Other programs (e.g. the HR clone
  // `hospitality-management-hr`) carry their own year-2 subjects rendered under THEIR
  // program; counting across all programs would over-count. Mirror the renderer exactly
  // via SokratCatalog.subjectsOf(programId, year) so this stays correct as HR grows.
  const subjCount = await page.$$eval('.browse-card[data-browse="subject"]', (e) => e.length);
  const expectedSubj = await page.evaluate(() => {
    const pid = window.SOKRAT_CATALOG.faculties[0].programs[0].id;
    return window.SokratCatalog.subjectsOf(pid, 2).length;
  });
  expect(subjCount).toBe(expectedSubj);

  // Semester sections present
  const sections = await page.$$eval('.browse-section .browse-section-title', (e) =>
    e.map((x) => x.textContent.trim())
  );
  expect(sections.length).toBeGreaterThan(0);

  // No horizontal overflow on the browse page (densest view = subject cards)
  const vw = page.viewportSize().width;
  const docScrollW = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(docScrollW).toBeLessThanOrEqual(vw + 1);

  // Pick Tourism Economics → lessons page
  await page.click('.browse-card[data-browse="subject"][data-id="te2"]');
  await page.waitForSelector('#lessons-page.active', { timeout: 5000 });
  const title = (await page.textContent('#currentSubjectTitle')) || '';
  expect(title).toContain('Tourism Economics');

  // Back from lessons returns to the browse subjects list (drill-down preserved)
  await page.click('#pathbarBack');   // K2b: jedan gumb natrag za cijelu aplikaciju
  await page.waitForSelector('#browse-page.active', { timeout: 5000 });
  await page.waitForSelector('.browse-card[data-browse="subject"]');

  expect(errors).toEqual([]);
});

test('Year 1 browse shows Business Informatics', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

  await page.goto('/');
  await page.waitForFunction(() => window.SOKRAT_CATALOG && window.enterBrowse);

  await page.click('.doors .door--primary');   // C2: hero-CTA #openStudyBtn je zamijenjen VRATIMA
  await page.waitForSelector('.browse-card[data-browse="faculty"]');
  await page.click('.browse-card[data-browse="faculty"]');
  await page.waitForSelector('.browse-card[data-browse="program"]');
  await page.click('.browse-card[data-browse="program"]');
  await page.waitForSelector('.browse-card[data-browse="year"][data-id="1"]');
  await page.click('.browse-card[data-browse="year"][data-id="1"]');
  await page.waitForSelector('.browse-card[data-browse="subject"][data-id="business-informatics"]');

  expect(errors).toEqual([]);
});
