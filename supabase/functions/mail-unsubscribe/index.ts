// ===== SOKRAT STUDY — Edge Function `mail-unsubscribe` (F2/4 — odjava od obavijesti) =====
//
// Radi BEZ prijave (`verify_jwt = false`): tko odjavljuje iz maila, najčešće nije prijavljen na
// tom uređaju. Pravo daje POTPIS iz poveznice (`_shared/mail-core.ts` → `provjeriToken`): HMAC
// nad id-em koji je izdala `send-notification`. Token vrijedi SAMO za odjavu — ne otkriva ništa,
// ne prijavljuje, ne može UKLJUČITI obavijesti — pa i procurio ne čini štetu.
//
// ─── ULAZI ──────────────────────────────────────────────────────────────────────────────────────
//   • POST `?t=<token>` — one-click iz klijenta pošte (RFC 8058: tijelo `List-Unsubscribe=One-Click`)
//     i gumb na `odjava.html` (tijelo JSON `{ t }`). Oba ODMAH odjavljuju.
//   • GET — NIKAD ne odjavljuje: sigurnosni skeneri pošte (Outlook SafeLinks, korporativni filtri)
//     otvaraju svaku poveznicu iz maila, pa bi GET-odjava odjavljivala ljude bez njihova znanja.
//     GET se preusmjerava na našu stranicu s jednim gumbom (Supabase ionako ne poslužuje HTML iz
//     funkcija — ne može ovdje biti ni stranica).
//
// Odgovor ne otkriva postoji li račun: nepostojeći korisnik s valjanim potpisom = „odjavljen" (200).

import { createClient } from 'jsr:@supabase/supabase-js@2.117.0';
import { provjeriToken } from '../_shared/mail-core.ts';

const CORS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  const u = new URL(req.url);
  const site = (Deno.env.get('MAIL_SITE') ?? 'https://www.sokratstudy.com').replace(/\/+$/, '');

  if (req.method === 'GET') {
    const t = u.searchParams.get('t') ?? '';
    return new Response(null, { status: 302, headers: { ...CORS, Location: site + '/odjava.html?t=' + encodeURIComponent(t) } });
  }
  if (req.method !== 'POST') return json(405, { error: 'method_not_allowed' });

  const url = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const tajna = Deno.env.get('MAIL_UNSUB_SECRET') ?? '';
  if (!url || !serviceKey || tajna.length < 32) return json(500, { error: 'mail_not_configured' });

  // Token iz adrese (one-click) ili iz JSON-tijela (gumb na `odjava.html`).
  let t = u.searchParams.get('t') ?? '';
  if (!t && (req.headers.get('content-type') ?? '').includes('application/json')) {
    try { const b = await req.json(); t = typeof b?.t === 'string' ? b.t : ''; } catch (_e) { /* prazno */ }
  }
  const uid = await provjeriToken(tajna, t);
  if (!uid) return json(400, { error: 'bad_token' });

  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
  const { data, error } = await admin.auth.admin.getUserById(uid);
  if (error || !data?.user) return json(200, { ok: true });            // nema računa → nema što odjaviti

  // Metapodaci se STAPAJU izričito (cijeli postojeći objekt + tri ključa) — ne oslanjamo se na to
  // kako GoTrue spaja, a ime, tema i upitnik moraju preživjeti odjavu.
  const meta = { ...(data.user.user_metadata ?? {}), mail_consent: false, mail_consent_at: new Date().toISOString(), mail_consent_via: 'unsubscribe' };
  const { error: upErr } = await admin.auth.admin.updateUserById(uid, { user_metadata: meta });
  if (upErr) return json(500, { error: 'update_failed' });
  return json(200, { ok: true });
});
