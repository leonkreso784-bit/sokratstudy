// SokratMonitor (Faza 2, cigla 2E): error monitoring, consent-gated.
// Loader (sentry-cdn) je STUBBAN preko page.route → testovi su offline-deterministički
// (NE pogađaju pravi Sentry). Dokazuje: API · consent gate (ne učita prije pristanka) ·
// nakon pristanka loader se ubaci + init(release) + greška se proslijedi · NIKAD ne baca.
const { test, expect } = require('@playwright/test');

// Fake "loader" koji oponaša Sentry stub: definira Sentry.init/captureException i pozove sentryOnLoad.
const FAKE_SENTRY = `
  window.Sentry = window.Sentry || {};
  window.Sentry.init = function (opts) { window.__sentryInit = opts || {}; };
  window.Sentry.captureException = function (e) { (window.__sentryEvents = window.__sentryEvents || []).push(String(e && e.message || e)); };
  if (typeof window.sentryOnLoad === 'function') window.sentryOnLoad();
`;

async function stubSentry(page) {
  await page.route('https://js-de.sentry-cdn.com/**', (route) =>
    route.fulfill({ status: 200, contentType: 'application/javascript', body: FAKE_SENTRY }));
  await page.addInitScript(() => { try { localStorage.removeItem('sokrat-cookie-consent'); } catch (e) {} });
}

test('SokratMonitor: configured + consent gate (no load before consent) + never throws', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  await stubSentry(page);
  await page.goto('/');
  await page.waitForFunction(() => window.SokratMonitor);

  const s0 = await page.evaluate(() => ({
    api: ['captureException', 'enable', 'disable', 'status'].every((m) => typeof window.SokratMonitor[m] === 'function'),
    st: window.SokratMonitor.status(),
  }));
  expect(s0.api).toBe(true);
  expect(s0.st.configured).toBe(true);            // loader URL je upisan
  expect(s0.st.release).toContain('sokrat-study@');

  // PRIJE pristanka: captureException ne smije učitati Sentry ni išta poslati
  const r1 = await page.evaluate(() => {
    window.SokratMonitor.captureException(new Error('pre-consent'));
    return {
      st: window.SokratMonitor.status(),
      scripts: Array.from(document.scripts).filter((s) => /sentry/i.test(s.src)).length,
      events: window.__sentryEvents || null,
    };
  });
  expect(r1.st.enabled).toBe(false);
  expect(r1.scripts).toBe(0);                     // loader NIJE ubačen
  expect(r1.events).toBeNull();                   // ništa poslano
  expect(errors).toEqual([]);
});

test('SokratMonitor: after consent → loader injected + init(release) + error forwarded', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  await stubSentry(page);
  await page.goto('/');
  await page.waitForFunction(() => window.SokratMonitor);

  await page.evaluate(() => {
    window.SokratMonitor.enable();
    window.SokratMonitor.captureException(new Error('boom-after-consent'));
  });
  await page.waitForFunction(() => window.SokratMonitor.status().sentryReady, { timeout: 8000 });

  const res = await page.evaluate(() => ({
    release: (window.__sentryInit || {}).release,
    pii: (window.__sentryInit || {}).sendDefaultPii,
    env: (window.__sentryInit || {}).environment,
    events: window.__sentryEvents || [],
  }));
  expect(res.release).toBe('sokrat-study@20260699'); // release proslijeđen u init
  expect(res.env).toBe('development');                // BUG-053: localhost NIJE „production"
  expect(res.pii).toBe(false);                        // privacy: bez PII
  expect(res.events).toContain('boom-after-consent'); // bufferirana greška flushana
  expect(errors).toEqual([]);
});

test('consent "Accept" wires SokratMonitor.enable (end-to-end)', async ({ page }) => {
  await stubSentry(page);
  await page.goto('/');
  await page.waitForSelector('#cookieAccept', { timeout: 8000 });
  await page.click('#cookieAccept');
  await page.waitForFunction(() => window.SokratMonitor.status().enabled === true);
  const st = await page.evaluate(() => window.SokratMonitor.status());
  expect(st.enabled).toBe(true);                  // applyConsent(true) → enable()
  expect(st.configured).toBe(true);
});
