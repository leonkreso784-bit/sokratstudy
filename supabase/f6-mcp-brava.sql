-- ===== SOKRAT STUDY — F6 ①/2: BRAVA nad tokenom korisnikovog AI-ja (ADR-038 ④) =====
--
-- Supabase OAuth 2.1 poslužitelj izdaje AI-klijentu OBIČAN korisnički JWT uz claim `client_id`
-- (`aud` ostaje `authenticated`). Izmjereno na stagingu 18.09. (`npm run mcp:brava`, 18/24 palo):
-- takav token danas stvara čvorove, uzima `handle`, mijenja profil, uploada slike i **obriše
-- račun**. Token drži broker Anthropica/OpenAI-ja, ne model → sigurnost mora biti u bazi.
--
-- ODLUKA (ADR-038 ④): token s `client_id` dobiva vlastitu Postgres ulogu `mcp_klijent`, kojoj je
-- SVE zabranjeno dok se izričito ne otvori. Zabrana dolazi sa sloja GRANT-ova, ne politika:
-- inventar 18.09. pokazao je da nijedna tablica nema PUBLIC grant, pa nova uloga bez granta ne
-- vidi ništa — iako je većina RLS politika pisana `{public}` (dakle za svaku ulogu).
-- To isto svojstvo koristimo u drugom smjeru: `GRANT SELECT ON nodes` ulozi ODMAH znači
-- „samo vlastiti čvorovi", jer politika `nodes_select_own` (auth.uid() = owner_id) vrijedi i za nju.
--
-- ⚠️ HOOK JE FAIL-CLOSED ZA CIJELI PROJEKT. `custom_access_token_hook` se zove pri SVAKOM
--    izdavanju tokena (prijava lozinkom, Google, obnova) — greška, timeout (2 s, bez retryja) ili
--    NULL izlaz znače da se NITKO ne može prijaviti (izvorni kod `supabase/auth`,
--    `internal/tokens/service.go`: greška hooka prekida `GenerateAccessToken`). Zato funkcija
--    ispod ne čita NIJEDNU tablicu, nema grananja osim jednog `if`, i na neočekivan ulaz vraća
--    `event` NEPROMIJENJEN umjesto da padne. Izlaz u nuždi: isključiti hook u dashboardu.
--
-- Primijenjeno na STAGING 2026-09-18. PROD tek uz Leonov izričit OK (i to prije uključivanja OAuth-a).

-- ─── 1. uloga ───────────────────────────────────────────────────────────────────────────────────
-- `nologin`: u nju se ulazi isključivo kroz `SET LOCAL ROLE` iz PostgREST-a, nikad prijavom.
do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'mcp_klijent') then
    create role mcp_klijent nologin noinherit;
  end if;
end
$$;

-- Bez ovoga PostgREST ne može prebaciti ulogu i vraća 401/403 na SVAKI zahtjev AI-ja
-- (docs.postgrest.org: „the database administrator must allow the authenticator role to switch").
grant mcp_klijent to authenticator;

-- ─── 1b. granica VREMENA (K/7, N16) ─────────────────────────────────────────────────────────────
-- Do 12.10. `mcp_klijent` nije imao vlastiti `statement_timeout` (`anon` 3 s, `authenticated` 8 s),
-- pa je AI nasljeđivao ono što ostane od `authenticator`-a. AI zove alate u petlji i ne vidi bazu:
-- jedan skup upit ne smije držati vezu dulje od korisnikovog. 5 s = ispod korisnikovih 8 s; da
-- ne ruši ispravan rad, dokazuje ponovni prolaz brana `mcp:nacrt/predaja/alati/izmjena/prihvat/brava`.
-- PostgREST postavke impersonirane uloge čita pri učitavanju konfiguracije → `notify` na kraju
-- datoteke. Dokaz da vrijedi za PRAVI AI token (ne samo redak u `pg_roles`): `npm run mcp:granice`.
alter role mcp_klijent set statement_timeout = '5s';

-- ─── 2. što uloga SMIJE (jedini otvoreni put u ①/2) ─────────────────────────────────────────────
grant usage on schema public to mcp_klijent;
grant select on public.nodes to mcp_klijent;   -- RLS `nodes_select_own` = samo vlastiti čvorovi

-- Sadržaj materijala (`node_content`) NIJE otvoren u ovoj cigli — otvara ga ②/2 kad alati budu
-- trebali čitati gradivo, sa svojom provjerom. „Zabrana po defaultu" znači da svako otvaranje
-- ima svoju ciglu i svoj dokaz.

-- ─── 3. `is_admin()` više nije javan ────────────────────────────────────────────────────────────
-- Funkcija je imala PUBLIC EXECUTE, pa bi je i `mcp_klijent` smio zvati — a `send-notification`
-- propušta svakoga tko kroz nju vrati `true`. Izmjereno: s AI-tokenom ADMINA ta funkcija prolazi
-- admin-vrata i pada tek na neispravnom tijelu (400). Skidamo PUBLIC, zadržavamo izričite uloge.
-- ⚠️ `authenticated` grant se NE dira (CLAUDE.md): RLS politike zovu `is_admin()` kao POZIVATELJ.
revoke execute on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated, service_role;

-- ─── 4. hook: token s `client_id` dobiva ulogu `mcp_klijent` ────────────────────────────────────
-- `client_id` je izmjeren kao pouzdan biljeg: GoTrue ga stavlja u claimove i pri PRVOM izdavanju
-- i pri obnovi (`internal/tokens/service.go` prosljeđuje `session.OAuthClientID`), dok
-- `authentication_method` razlikuje samo prvi exchange.
create or replace function public.mcp_access_token_hook(event jsonb)
returns jsonb
language plpgsql
stable
as $$
declare
  claims jsonb;
begin
  claims := event -> 'claims';
  -- Neočekivan ulaz NE ruši prijavu — vraćamo netaknuto (v. upozorenje o fail-closed hooku).
  if claims is null then
    return event;
  end if;

  if coalesce(claims ->> 'client_id', '') <> '' then
    claims := jsonb_set(claims, '{role}', to_jsonb('mcp_klijent'::text));
    event := jsonb_set(event, '{claims}', claims);
  end if;

  return event;
end;
$$;

-- Hook zove `supabase_auth_admin`, nitko drugi ga ne smije izvršiti.
grant usage on schema public to supabase_auth_admin;
grant execute on function public.mcp_access_token_hook(jsonb) to supabase_auth_admin;
revoke execute on function public.mcp_access_token_hook(jsonb) from authenticated, anon, public;

-- ─── 5. što OSTAJE otvoreno i zna se da ostaje ──────────────────────────────────────────────────
-- `PUT /auth/v1/user` (lozinka, mail, metapodaci) ide na Auth API mimo Postgresa → ova brava ga ne
-- doseže. Zatvara ga cigla ①/2b: polje „Trenutna lozinka" u profilu, pa postavka „traži trenutnu
-- lozinku" u dashboardu. `npm run mcp:brava` to mjeri i ispisuje kao poznatu rupu.

-- PostgREST ponovno čita postavke uloga (§1b) — `notify` se isporučuje tek na COMMIT transakcije.
notify pgrst, 'reload config';
