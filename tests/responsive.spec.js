// Vizualni / responsive test: ulazi u Learn sekciju svakog predmeta na iPhone
// dimenzijama i traži HORIZONTALNI OVERFLOW (sadržaj koji viri izvan ekrana).
// Pokreni: `npm run test:responsive`  (ili `npx playwright test`)
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const SHOT_DIR = path.join(__dirname, '..', 'test-results', 'learn-shots');
fs.mkdirSync(SHOT_DIR, { recursive: true });

// Vrati popis { subjectId, lessonId } — prva lekcija svakog predmeta koja ima sadržaj.
async function getSubjectsWithContent(page) {
  return await page.evaluate(() => {
    const out = [];
    for (const s of window.SOKRAT_CATALOG.subjects) {
      const lesson = (s.lessons || []).find((l) => window.SokratCatalog.resolveDataVar(s.id, l.id));
      if (lesson) out.push({ subjectId: s.id, name: s.name, lessonId: lesson.id });
    }
    return out;
  });
}

// Mjeri overflow unutar Learn sekcije + cijele stranice.
// `deviceWidth` je KONFIGURIRANA širina ekrana; window.innerWidth se može naduti
// kad stranica prelije pa ga ne smijemo koristiti kao referencu.
async function measureOverflow(page, deviceWidth) {
  return await page.evaluate((deviceWidth) => {
    const vw = deviceWidth;
    const scope = document.getElementById('learn') || document.body;
    const selfOverflow = [];
    const beyond = [];
    const selOf = (el) => {
      let s = el.tagName.toLowerCase();
      if (el.id) s += '#' + el.id;
      if (el.className && typeof el.className === 'string') {
        const c = el.className.trim().split(/\s+/).filter(Boolean).slice(0, 3).join('.');
        if (c) s += '.' + c;
      }
      return s;
    };
    scope.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      if (el.scrollWidth > el.clientWidth + 1) {
        selfOverflow.push({ sel: selOf(el), scrollW: el.scrollWidth, clientW: el.clientWidth, text: (el.textContent || '').trim().slice(0, 50) });
      }
      if (r.right > vw + 1) {
        beyond.push({ sel: selOf(el), right: Math.round(r.right), w: Math.round(r.width), text: (el.textContent || '').trim().slice(0, 50) });
      }
    });
    const docScrollW = document.documentElement.scrollWidth;
    const innerWidth = window.innerWidth;
    return {
      vw,
      innerWidth,
      docScrollW,
      // overflow ako stvarni sadržaj ili napuhani innerWidth premaši širinu ekrana
      pageOverflow: Math.max(docScrollW, innerWidth) > vw + 1,
      selfOverflow: selfOverflow.slice(0, 20),
      beyond: beyond.slice(0, 20),
    };
  }, deviceWidth);
}

test('Learn section has no horizontal overflow on iPhone widths', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.waitForFunction(() => window.SOKRAT_CATALOG && window.SokratCatalog && window.navigateTo);

  const subjects = await getSubjectsWithContent(page);
  expect(subjects.length).toBeGreaterThan(0);
  // Test obilazi SVAKI predmet iz kataloga, pa mu rok raste s katalogom: fiksnih 120 s pao je na CI-ju
  // (landscape) kad je katalog narastao 50 -> 56 (PFRI, 2026-11-16). ~5 s po predmetu + start.
  testInfo.setTimeout(30000 + subjects.length * 5000);

  const deviceWidth = page.viewportSize().width;
  const report = [];

  for (const s of subjects) {
    // initStudyPage is async (lazy-loads subject content). Navigate first, then wait for
    // the Learn content to be RENDERED (cards attached even while Home is active), and only
    // THEN switch to Learn — otherwise we'd race the async init / its trailing switch to Home.
    await page.evaluate(({ subjectId, lessonId }) => {
      window.navigateTo('study', { subject: subjectId, lesson: lessonId });
    }, s);

    await page.waitForSelector('#learn .learn-card', { state: 'attached', timeout: 15000 }).catch(() => {});
    await page.evaluate(() => window.switchSection('learn'));
    await page.waitForSelector('#learn .learn-card', { state: 'visible', timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(250);

    const m = await measureOverflow(page, deviceWidth);
    const tag = `${testInfo.project.name} · ${s.subjectId}`;
    report.push({ tag, vw: m.vw, innerWidth: m.innerWidth, docScrollW: m.docScrollW, pageOverflow: m.pageOverflow, self: m.selfOverflow, beyond: m.beyond });

    // Snimka je PRILOG za otklanjanje grešaka, ne tvrdnja. Learn najvećih predmeta (PFRI, 2026-11-17)
    // zna biti previsok za fullPage capture u CI Chromiumu ("Unable to capture screenshot") — tada
    // snimamo samo vidljivi dio; mjera prelijevanja iznad se time ne mijenja.
    const shot = path.join(SHOT_DIR, `${testInfo.project.name}__${s.subjectId}.png`);
    try {
      await page.screenshot({ path: shot, fullPage: true });
    } catch (e) {
      console.log(`  (fullPage snimka nije uspjela za ${tag} — snimam vidljivi dio: ${String(e.message).split('\n')[0]})`);
      // ⚠️ I OVO može pasti, i palo je (CI, 27.11.: `Protocol error (Page.captureScreenshot)`
      // na `responsive.spec.js:65`, uz 365 prolaza i nijednu palu tvrdnju). Kad je renderer
      // iscrpljen Learnom najvećih PFRI predmeta, ne uspije ni snimka vidljivog dijela, pa je
      // dotadašnji fallback samo pomaknuo pad za jedan red. Snimka je PRILOG, ne tvrdnja —
      // ono što se mjeri (`measureOverflow`) već je izmjereno gore i ne ovisi o njoj. Zato
      // neuspjeh priloga smije samo zabilježiti, nikad oboriti branu: inače gate crveni zbog
      // pomoćnog sredstva, a pravi nalaz (`expect.soft` dolje) ostane neispričan.
      try {
        await page.screenshot({ path: shot });
      } catch (e2) {
        console.log(`  (ni snimka vidljivog dijela nije uspjela za ${tag}: ${String(e2.message).split('\n')[0]})`);
      }
    }
  }

  // Ispis čitljivog izvještaja
  console.log(`\n===== OVERFLOW REPORT [${testInfo.project.name}] =====`);
  for (const r of report) {
    const flag = r.pageOverflow ? '❌ OVERFLOW' : '✓ ok';
    console.log(`${flag}  ${r.tag}  deviceW=${r.vw} innerWidth=${r.innerWidth} docScrollW=${r.docScrollW}`);
    if (r.pageOverflow || r.beyond.length || r.self.length) {
      r.beyond.slice(0, 6).forEach((b) => console.log(`     beyond → ${b.sel}  right=${b.right} w=${b.w}  "${b.text}"`));
      r.self.slice(0, 6).forEach((b) => console.log(`     self   → ${b.sel}  scrollW=${b.scrollW} clientW=${b.clientW}  "${b.text}"`));
    }
  }

  const overflowing = report.filter((r) => r.pageOverflow);
  expect.soft(overflowing, `Predmeti s horizontalnim overflowom: ${overflowing.map((r) => r.tag).join(', ')}`).toEqual([]);
});
