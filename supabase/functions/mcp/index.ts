// ===== SOKRAT STUDY — Edge Function `mcp` (F6 ①/1 — konektor za KORISNIKOV AI) =====
//
// Udaljeni MCP poslužitelj (Streamable HTTP, bez stanja). Korisnik ga doda u svoj Claude/ChatGPT
// kao konektor; prijava ide kroz Supabase OAuth 2.1 poslužitelj i našu stranicu `odobrenje.html`.
//
// ─── ZAŠTO JE `verify_jwt = false` ──────────────────────────────────────────────────────────────
// MCP klijent prvi zahtjev šalje BEZ tokena i iz odgovora 401 (`WWW-Authenticate: Bearer
// resource_metadata=…`) saznaje gdje je prijava. Gateway s `verify_jwt` bi taj zahtjev odbio prije
// funkcije, pa klijent nikad ne bi našao prijavu. Token zato provjerava `withSupabase` (JWKS, ES256).
//
// ─── ŠTO SE NE SMIJE (ADR-026/030/038) ──────────────────────────────────────────────────────────
//   • nikad `supabaseAdmin`, `service_role` ni tajni ključ — alat radi KAO KORISNIK, pod RLS-om;
//   • nikad javni katalog ni `is_admin()`;
//   • nikad upis mimo jezgre: ovdje nema ni `.rpc(` ni `registerTool(` — svaki alat i svaki poziv
//     baze živi u `alati.ts` (②/2), gdje ide kroz `prevediOdbijanje` (N9).
// `tests/unit/mcp-alati.test.js` čita ovu datoteku i pada ako se išta od toga pojavi.
//
// ─── ULAZ ALATA ─────────────────────────────────────────────────────────────────────────────────
// SDK-u se shema daje samo za OGLAS (AI je vidi u `tools/list`); validator koji mu dajemo propušta
// sve. Provjeru radi jezgra (`provjeriUlaz`), testirana u Nodeu, i vraća IMENOVANO odbijanje. Usput:
// zadani SDK-ov validator (ajv) prevodi shemu u kod kroz `new Function` — ovdje ga nema.
//
// ─── ADRESA RESURSA ─────────────────────────────────────────────────────────────────────────────
// Zadaje se izričito: `MCP_RESOURCE_URL` (produkcija: https://www.sokratstudy.com/mcp, ADR-038 ②),
// inače adresa funkcije na projektu. Ne oslanjamo se na to da deploy ubaci `SUPABASE_FUNCTION_SLUG`.
//
// Paketi su pinani TOČNO (pravilo #9) — `@supabase/server` OAuth sloj je alpha, a ugniježđeni oblik
// koji ovdje stoji je jedini koji paket zove stabilnim.

import { createMcpHandler, fromJsonSchema, McpServer } from 'npm:@modelcontextprotocol/server@2.0.0';
import { fromSupabaseUrl, withOAuthProtectedResource, withSupabase } from 'npm:@supabase/server@1.7.0';
import { POSLUZITELJ, UPUTE, registrirajAlate } from './alati.ts';
import type { Klijent } from './alati.ts';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const RESURS = Deno.env.get('MCP_RESOURCE_URL') ?? `${SUPABASE_URL}/functions/v1/mcp`;
// ②/4.2: stranica na koju vodi link iz `predaj_nacrt` (staging = lokalni poslužitelj). Bez nje → produkcija.
const APP_URL = Deno.env.get('SOKRAT_APP_URL') ?? '';

/** Validator za oglas: propušta sve (v. zaglavlje „ULAZ ALATA"). */
const SAMO_OGLAS = { getValidator: () => (x: unknown) => ({ valid: true as const, data: x, errorMessage: undefined }) };

Deno.serve(
  withOAuthProtectedResource(
    { resourceServer: RESURS, authorizationServer: fromSupabaseUrl(SUPABASE_URL) },
    withSupabase({ auth: 'user' }, async (req, { supabase }) => {
      const mcp = createMcpHandler(() => {
        const server = new McpServer(POSLUZITELJ, { instructions: UPUTE });
        registrirajAlate(server as never, supabase as unknown as Klijent, (s) => fromJsonSchema(s as never, SAMO_OGLAS as never), { appUrl: APP_URL });
        return server;
      });
      return mcp.fetch(req);
    })
  )
);
