// ===== SOKRAT STUDY — Edge Function `delete-account` (GDPR čl. 17, „pravo na zaborav") =====
//
// Jedini privilegirani put u sustavu koji smije obrisati korisnika. `service_role` NIKAD ne ide u
// Vercel ni u klijent (ADR-016) → živi isključivo ovdje, u Supabase secretima.
//
// ─── ŠTO OVA FUNKCIJA MORA POŠTOVATI ────────────────────────────────────────────────────────────
//
// 1. IDENTITET SE ČITA IZ TOKENA, NIKAD IZ BODY-JA.
//    `user_id` poslan u tijelu zahtjeva bio bi eskalacija privilegija: bilo tko s bilo čijim
//    id-om obrisao bi tuđi račun. Zato `auth.getUser()` nad KORISNIKOVIM JWT-om — on je jedini
//    izvor istine o tome tko zove.
//
// 2. SLIKE PRIJE KORISNIKA — I TO NIJE STVAR UREDNOSTI.
//    Supabase odbija obrisati korisnika koji je vlasnik ijednog objekta u Storageu
//    („You cannot delete a user if they are the owner of any objects in Supabase Storage").
//    Obrnut redoslijed = `deleteUser` puca. Uz to bi se nakon brisanja izgubio `uid` potreban
//    za prefiks, pa bi slike ostale zauvijek kao siročad.
//    ⚠️ Izmjereno 2026-09-13 (staging, `delete-account-check` T5): za bucket koji NIJE bio na
//    popisu `deleteUser` NIJE pao — korisnik je nestao, a njegov avatar u JAVNOM bucketu ostao
//    je kao siroče dostupno po URL-u. Dakle posljedica propusta nije „neizbrisiv račun" nego
//    GDPR-rupa: slika obrisanog korisnika ostaje javno čitljiva. Zato je popis bucketa ispod
//    sigurnosni, ne organizacijski podatak.
//
// 3. BAZA SE NE DIRA RUČNO.
//    Svaki FK prema `auth.users` je `on delete cascade` (`progress`, `nodes` → `node_content` →
//    `node_content_versions`, `profiles`), a `content_versions.edited_by` je `on delete set null`.
//    To zadnje je NAMJERNO: audit javnog kataloga je append-only (ADR-024) — povijest izmjena
//    preživi, ime autora nestane. Točno ono što GDPR traži. Ručno brisanje redaka ovdje bi
//    značilo drugu kopiju istine o tome što se briše; kaskada je ta istina.
//
// 4. `lesson-images` SE NE DIRA, I ADMIN SE NE MOŽE OBRISATI SAM.
//    Taj bucket drži slike JAVNOG KATALOGA i u njega piše samo admin. Kad bi se admin obrisao,
//    povukao bi sadržaj 22 predmeta sa sobom. Zato čistimo isključivo OSOBNE prefikse:
//    `node-images/<uid>/` (slike gradiva) i `profile-images/<uid>/` (avatar + naslovna, F2/2).
//    ⚠️ Svaki NOVI bucket u koji običan korisnik smije pisati MORA ući u `PERSONAL_BUCKETS` —
//    inače slika obrisanog korisnika ostaje kao siroče (v. mjerenje u t. 2), a
//    `delete-account-check` T5 to mjeri tako da u svaki od njih prije brisanja stavi datoteku.
//    Ali samo to nije dovoljno: adminu bi slike nestale, `deleteUser` bi pao (i dalje posjeduje
//    `lesson-images`) i ostao bi POLUOBRISAN račun. Zato admin-guard stoji PRIJE ijednog brisanja
//    → operacija prođe cijela ili ne promijeni ništa.

import { createClient, type SupabaseClient } from 'jsr:@supabase/supabase-js@2.117.0';
import { biljegTokena } from '../_shared/token-guard.ts';

const PERSONAL_BUCKETS = ['node-images', 'profile-images'];
const LIST_PAGE = 100;   // Storage `list` stranica
const REMOVE_CHUNK = 100; // koliko putanja po `remove` pozivu

const CORS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' }
  });
}

/**
 * Sve putanje pod prefiksom, rekurzivno i uz paginaciju.
 * Supabase Storage nema pravih mapa — `list` vraća unos BEZ `id` kad je riječ o sintetiziranom
 * prefiksu, pa se po tome razlikuje „mapa" od datoteke. Naša shema je `<uid>/<node>/<uuid>.<ext>`,
 * ali rekurzija je namjerno općenita: dubina se ne smije podrazumijevati.
 */
async function listAll(admin: SupabaseClient, bucket: string, prefix: string): Promise<string[]> {
  const out: string[] = [];
  let offset = 0;

  for (;;) {
    const { data, error } = await admin.storage.from(bucket)
      .list(prefix, { limit: LIST_PAGE, offset });
    if (error) throw new Error(`storage.list(${prefix}): ${error.message}`);
    const page = data ?? [];
    if (!page.length) break;

    for (const entry of page) {
      const full = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.id === null || entry.id === undefined) out.push(...await listAll(admin, bucket, full));
      else out.push(full);
    }

    if (page.length < LIST_PAGE) break;
    offset += LIST_PAGE;
  }
  return out;
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json(405, { error: 'method_not_allowed' });

  const url = Deno.env.get('SUPABASE_URL');
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !anonKey || !serviceKey) return json(500, { error: 'missing_env' });

  // ── 1) TKO ZOVE — isključivo iz tokena ──
  const authHeader = req.headers.get('Authorization') ?? '';
  if (!authHeader.toLowerCase().startsWith('bearer ')) return json(401, { error: 'missing_token' });

  // Brisanje računa je NEPOVRATNO, a ova funkcija radi `service_role`-om → brava u bazi (uloga
  // `mcp_klijent`) je ne doseže. Token korisnikovog AI-ja zato staje ovdje, prije `getUser()`.
  const biljeg = biljegTokena(authHeader);
  if (biljeg.aiToken) return json(403, { error: 'ai_token_forbidden', detail: biljeg.razlog });

  const asUser = createClient(url, anonKey, { global: { headers: { Authorization: authHeader } } });
  const { data: userData, error: userErr } = await asUser.auth.getUser();
  const user = userData?.user;
  if (userErr || !user) return json(401, { error: 'unauthorized' });

  const uid = user.id;
  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

  // ── 2) ADMIN SE NE MOŽE OBRISATI SAM ──
  // Guard mora biti PRIJE brisanja slika, inače operacija nije sve-ili-ništa.
  // Bez njega: adminu se obrišu osobne slike, pa `deleteUser` PADNE jer i dalje posjeduje
  // objekte u `lesson-images` → ostaje POLUOBRISAN račun. To je gore od nepostojanja
  // značajke, i pogađa točno vlasnika platforme.
  // Zašto baš `role = 'admin'`: RLS na `lesson-images` propušta upis samo `is_admin()`,
  // pa su administratori jedini koji uopće mogu posjedovati objekte izvan `node-images`.
  const { data: prof, error: profErr } = await admin
    .from('profiles').select('role').eq('user_id', uid).maybeSingle();
  if (profErr) return json(500, { error: 'profile_lookup_failed', detail: profErr.message });
  if (prof && prof.role === 'admin') {
    return json(409, {
      error: 'admin_cannot_self_delete',
      detail: 'An administrator owns public catalogue images. Hand over the admin role first.'
    });
  }

  // ── 3) SLIKE PRIJE KORISNIKA ── (bez ovoga `deleteUser` pada — v. napomenu 2 gore)
  let removedImages = 0;
  try {
    for (const bucket of PERSONAL_BUCKETS) {
      const paths = await listAll(admin, bucket, uid);
      for (let i = 0; i < paths.length; i += REMOVE_CHUNK) {
        const chunk = paths.slice(i, i + REMOVE_CHUNK);
        const { error } = await admin.storage.from(bucket).remove(chunk);
        if (error) return json(500, { error: 'storage_purge_failed', bucket, detail: error.message });
        removedImages += chunk.length;
      }
    }
  } catch (e) {
    return json(500, { error: 'storage_purge_failed', detail: String((e as Error)?.message ?? e) });
  }

  // ── 4) KORISNIK ── kaskada odnese progress, nodes, node_content(+versions), profiles
  const { error: delErr } = await admin.auth.admin.deleteUser(uid);
  if (delErr) {
    // Najvjerojatniji uzrok: korisnik je vlasnik objekata IZVAN osobnih bucketa (admin i
    // `lesson-images`) — ili je dodan novi bucket koji nije u `PERSONAL_BUCKETS`.
    // Radije jasna greška nego brisanje javnog kataloga.
    return json(409, { error: 'delete_failed', detail: delErr.message, removedImages });
  }

  return json(200, { ok: true, removedImages });
});
