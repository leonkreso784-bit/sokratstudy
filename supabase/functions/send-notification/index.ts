// ===== SOKRAT STUDY — Edge Function `send-notification` (F2/4 mail-obavijesti) =====
//
// Jedini put kojim platforma šalje mail korisnicima. Ključ za Resend i `service_role` žive
// isključivo u Supabase secretima (ADR-016); klijent nikad ne vidi ni jedno ni drugo.
//
// ─── ŠTO OVA FUNKCIJA MORA POŠTOVATI ────────────────────────────────────────────────────────────
//
// 1. SAMO ADMIN, I TO IZ TOKENA. Identitet iz `auth.getUser()` nad pozivateljevim JWT-om, a pravo
//    kroz POSTOJEĆI `is_admin()` (isti koji zovu RLS politike) — druga definicija „admina" ovdje
//    bila bi druga istina koja se jednom razide.
// 2. PRIMATELJ = IZRIČIT PRISTANAK. Filtar je u `_shared/mail-core.ts` (`primatelji`) i ima
//    vlastiti test: `mail_consent === true` + potvrđena adresa + segment; nepoznat segment = nitko.
// 3. SVAKI PRIMATELJ DOBIVA ZASEBAN MAIL. Nikad `to: [svi]` (svatko bi vidio tuđe adrese) ni
//    `bcc` (nema osobne poveznice za odjavu). Uz to `List-Unsubscribe` + one-click (RFC 8058):
//    Gmail i Apple Mail tada sami nude „Odjavi se" uz naslov — doslovno jedan klik.
// 4. NAČINI: `count` (samo broj, ništa ne šalje) · `test` (jedan mail, SAMO pozivatelju, bez
//    obzira na pristanak) · `send`. Forma uvijek prvo pita `count`, pa tek onda šalje.
// 5. SVAKO SLANJE OSTAJE ZAPISANO u `mail_log` (jedan red, bez adresa).
// 6. STAGING NE ŠALJE LJUDIMA: tajna `MAIL_REDIRECT_TO` (npr. `delivered@resend.dev`) preusmjeri
//    SVAKI mail ondje. Na produkciji je nema. Mail na izmišljenu adresu (npr. `@sokrat.local`
//    testnog računa) vraća se kao bounce i kvari ugled verificirane domene.

import { createClient } from 'jsr:@supabase/supabase-js@2.117.0';
import { primatelji, provjeriPoruku, sastaviMail, tokenOdjave, SEGMENTI } from '../_shared/mail-core.ts';
import { biljegTokena } from '../_shared/token-guard.ts';

const BATCH = 100;          // Resend `/emails/batch` prima najviše 100 mailova po pozivu
const PER_PAGE = 1000;      // `auth.admin.listUsers` stranica

const CORS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json(405, { error: 'method_not_allowed' });

  const url = Deno.env.get('SUPABASE_URL');
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !anonKey || !serviceKey) return json(500, { error: 'missing_env' });

  // ── 1) TKO ZOVE — iz tokena, pravo kroz `is_admin()` ──
  const authHeader = req.headers.get('Authorization') ?? '';
  if (!authHeader.toLowerCase().startsWith('bearer ')) return json(401, { error: 'missing_token' });

  // Ova funkcija šalje mail PREMA VAN u ime platforme → token korisnikovog AI-ja nema što ovdje
  // tražiti, pa staje prije `is_admin()`. Sama brava u bazi (skinut PUBLIC EXECUTE s `is_admin`)
  // ovdje bi dala 500 `admin_check_failed` umjesto 403 — točno odbijanje, netočan razlog.
  const biljeg = biljegTokena(authHeader);
  if (biljeg.aiToken) return json(403, { error: 'ai_token_forbidden', detail: biljeg.razlog });

  const asUser = createClient(url, anonKey, { global: { headers: { Authorization: authHeader } } });
  const { data: userData, error: userErr } = await asUser.auth.getUser();
  const caller = userData?.user;
  if (userErr || !caller) return json(401, { error: 'unauthorized' });
  const { data: jeAdmin, error: adminErr } = await asUser.rpc('is_admin');
  if (adminErr) return json(500, { error: 'admin_check_failed' });
  if (jeAdmin !== true) return json(403, { error: 'not_admin' });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch (_e) { return json(400, { error: 'bad_json' }); }
  const mode = String(body.mode ?? '');
  const segment = String(body.segment ?? '');
  if (['count', 'test', 'send'].indexOf(mode) === -1) return json(400, { error: 'mail_bad_mode' });
  if (SEGMENTI.indexOf(segment) === -1) return json(400, { error: 'mail_bad_segment' });

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

  // ── 2) PRIMATELJI (i za `count`, da forma pokaže broj prije slanja) ──
  const svi: unknown[] = [];
  for (let page = 1; ; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: PER_PAGE });
    if (error) return json(500, { error: 'list_users_failed' });
    const users = data?.users ?? [];
    svi.push(...users);
    if (users.length < PER_PAGE) break;
  }
  // deno-lint-ignore no-explicit-any
  const lista = primatelji(svi as any[], segment);
  // `redirected` = svaki mail ide na `MAIL_REDIRECT_TO` (staging). Automatski test šalje TEK kad
  // poslužitelj to potvrdi — pretpostavka „ovo je staging" nije provjera.
  if (mode === 'count') return json(200, { ok: true, recipients: lista.length, redirected: !!Deno.env.get('MAIL_REDIRECT_TO') });

  // ── 3) PORUKA ──
  const p = provjeriPoruku(body as { subject?: unknown; text?: unknown; url?: unknown });
  if (!p.ok) return json(400, { error: p.code });

  const resendKey = Deno.env.get('RESEND_API_KEY');
  const tajna = Deno.env.get('MAIL_UNSUB_SECRET') ?? '';
  if (!resendKey || tajna.length < 32) return json(500, { error: 'mail_not_configured' });
  const from = Deno.env.get('MAIL_FROM') ?? 'Sokrat Study <sokrat@sokratstudy.com>';
  const site = (Deno.env.get('MAIL_SITE') ?? 'https://www.sokratstudy.com').replace(/\/+$/, '');
  const redirect = Deno.env.get('MAIL_REDIRECT_TO') ?? '';

  const cilj = mode === 'test'
    ? (caller.email ? [{ id: caller.id, email: caller.email }] : [])
    : lista;
  if (!cilj.length) return json(200, { ok: true, sent: 0, recipients: 0 });

  // ── 4) SLANJE — zaseban mail po primatelju, u paketima po 100 ──
  const idem = typeof body.idempotency === 'string' && /^[A-Za-z0-9-]{8,64}$/.test(body.idempotency) ? body.idempotency : '';
  let sent = 0;
  for (let i = 0; i < cilj.length; i += BATCH) {
    const paket = [];
    for (const r of cilj.slice(i, i + BATCH)) {
      const t = await tokenOdjave(tajna, r.id);
      const m = sastaviMail({ ...p.value, odjavaUrl: site + '/odjava.html?t=' + encodeURIComponent(t) });
      paket.push({
        from,
        to: [redirect || r.email],
        subject: m.subject,
        html: m.html,
        text: m.text,
        headers: {
          'List-Unsubscribe': '<' + url + '/functions/v1/mail-unsubscribe?t=' + encodeURIComponent(t) + '>',
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
        }
      });
    }
    const res = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + resendKey,
        'Content-Type': 'application/json',
        ...(idem ? { 'Idempotency-Key': idem + '-' + mode + '-' + (i / BATCH) } : {})
      },
      body: JSON.stringify(paket)
    });
    if (!res.ok) {
      await zapisi(admin, caller.id, p.value.subject, segment, sent, mode === 'test');
      return json(502, { error: 'resend_failed', status: res.status, sent });
    }
    sent += paket.length;
  }

  // ── 5) ZAPIS ──
  const logErr = await zapisi(admin, caller.id, p.value.subject, segment, sent, mode === 'test');
  return json(200, { ok: true, sent, recipients: cilj.length, redirected: !!redirect, ...(logErr ? { warning: 'log_failed' } : {}) });
});

// deno-lint-ignore no-explicit-any
async function zapisi(admin: any, sentBy: string, subject: string, segment: string, recipients: number, test: boolean): Promise<boolean> {
  const { error } = await admin.from('mail_log').insert({ sent_by: sentBy, subject, segment, recipients, test });
  return !!error;
}
