-- ===== SOKRAT STUDY — F6 ①/2c-1: INVENTAR PRAVA (brana koja se sama nabraja) =====
--
-- ─── ZAŠTO OVA FUNKCIJA POSTOJI ────────────────────────────────────────────────────────────────
-- `npm run mcp:brava` je do sada dokazivala da je zatvoreno ono čega se netko SJETIO nabrojati.
-- Audit 18.09. našao je isti razred propusta tri puta zaredom (blanket izuzeće `/^mcp_/`; nijedno
-- odbijeno čitanje tablice se ne mjeri; `_node_own` drži zatvorenim jedan redak koji nitko ne
-- testira) — nula rupa u samoj bravi, tri u brani. Zakrpa tih triju imena ostavila bi mehanizam
-- koji ih je proizveo: popis pisan rukom uvijek zaostaje za bazom, a cigla ②/1 tek dodaje
-- `node_drafts` i `mcp_*` RPC-ove.
--
-- Zato brana prestaje imati popis ZABRANJENOG i dobiva popis OTVORENOG: ova funkcija nabroji sve
-- što u bazi postoji (sheme, tablice, funkcije, bucketi) i za svaku stavku kaže što uloga
-- `mcp_klijent` smije. Sve što nije na kratkom popisu otvorenog mora biti zatvoreno — nova tablica,
-- novi RPC ili zalutali `grant` obore branu PO DEFAULTU, bez da se itko sjetio dopisati ih.
--
-- ─── ZAŠTO RPC, A NE SQL IZ SKRIPTE ────────────────────────────────────────────────────────────
-- Nijedna naša skripta ne govori s bazom SQL-om (provjereno: nula spomena `pg_catalog`/
-- `information_schema` u `scripts/`), a projekt nema nijednu runtime-ovisnost. Dodati `pg` klijent
-- značilo bi novu ovisnost I novu tajnu (lozinku baze) zbog jedne brane. Ovako brana čita inventar
-- preko REST-a ključem koji već ima.
--
-- ⚠️ Funkcija je SAMO ČITANJE kataloga i `security definer` (inače ne bi vidjela prava tuđe uloge).
--    `execute` ima ISKLJUČIVO `service_role`; `mcp_klijent` je ne smije zvati — a kako i ona sama
--    živi u `public`, pojavljuje se u vlastitom inventaru, pa to brana dokazuje bez posebne iznimke.
--
-- Primijenjeno na STAGING 2026-09-18. PROD tek uz Leonov izričit OK.

create or replace function public.mcp_brava_inventar()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  ima_ulogu boolean;
begin
  select exists(select 1 from pg_catalog.pg_roles where rolname = 'mcp_klijent') into ima_ulogu;

  -- Na projektu bez brave (danas: PROD) uloga ne postoji. Ne rušimo se — brana to ispiše i padne
  -- sama, s točnim razlogom, umjesto da dobije nerazumljivu grešku iz `has_*_privilege`.
  if not ima_ulogu then
    return jsonb_build_object('uloga', 'mcp_klijent', 'postoji', false);
  end if;

  return jsonb_build_object(
    'uloga', 'mcp_klijent',
    'postoji', true,

    'sheme', (
      select coalesce(jsonb_object_agg(n.nspname,
               pg_catalog.has_schema_privilege('mcp_klijent', n.oid, 'usage')), '{}'::jsonb)
      from pg_catalog.pg_namespace n
      where n.nspname not like 'pg\_%' and n.nspname <> 'information_schema'
    ),

    -- Svaka tablica/pogled u `public` → popis prava koja uloga ima (prazan popis = zatvoreno).
    'tablice', (
      select coalesce(jsonb_object_agg(c.relname, (
               select coalesce(jsonb_agg(pravo order by pravo), '[]'::jsonb)
               from unnest(array['select','insert','update','delete','truncate','references','trigger']) as pravo
               where pg_catalog.has_table_privilege('mcp_klijent', c.oid, pravo)
             )), '{}'::jsonb)
      from pg_catalog.pg_class c
      join pg_catalog.pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public' and c.relkind in ('r', 'v', 'm', 'p', 'f')
    ),

    -- Ključ je PUNI potpis (`public.ime(tipovi)`) — dvije funkcije istog imena su različite rute.
    -- `okidac` = vraća `trigger`, dakle PostgREST je ne drži u schema cacheu (mjereno: a1-grants).
    'funkcije', (
      select coalesce(jsonb_object_agg(p.oid::regprocedure::text, jsonb_build_object(
               'execute', pg_catalog.has_function_privilege('mcp_klijent', p.oid, 'execute'),
               'okidac', p.prorettype = 'pg_catalog.trigger'::regtype
             )), '{}'::jsonb)
      from pg_catalog.pg_proc p
      join pg_catalog.pg_namespace n on n.oid = p.pronamespace
      where n.nspname = 'public'
    ),

    'bucketi', (
      select coalesce(jsonb_agg(jsonb_build_object('id', b.id, 'javan', b.public) order by b.id), '[]'::jsonb)
      from storage.buckets b
    )
  );
end;
$$;

revoke execute on function public.mcp_brava_inventar() from public, anon, authenticated;
grant execute on function public.mcp_brava_inventar() to service_role;

-- ─── NALAZ PRVOG POKRETANJA INVENTARA (18.09.) ─────────────────────────────────────────────────
-- Inventar je u prvoj vrtnji javio da `mcp_klijent` SMIJE izvršiti dvije trigger-funkcije:
-- `set_updated_at()` i `touch_subject_content()`. One su jedine u projektu bez izričitog
-- `revoke` (ostalih osam ga ima), pa su zadržale PUBLIC EXECUTE koji Postgres daje po defaultu.
-- Nisu ruta (vraćaju `trigger` → PostgREST ih ne drži u schema cacheu), dakle nisu bile otvorena
-- vrata — ali su bile dozvola bez razloga, a s njima popis otvorenih funkcija ne bi mogao biti
-- prazan. Zatvaramo ih da tvrdnja brane bude „NIJEDNA funkcija u `public` nije izvršiva ulozi".
--
-- ⚠️ Okidači od ovoga ne prestaju raditi: EXECUTE na trigger-funkciji provjerava se pri STVARANJU
--    triggera, ne pri svakom upisu. Dokaz iz ovog istog projekta: osam sestrinskih funkcija je
--    revokeano odavno, a `test:authed` je zelen. Svejedno se poslije ovoga vrti puni authed skup.
revoke execute on function public.set_updated_at() from public, anon, authenticated;
revoke execute on function public.touch_subject_content() from public, anon, authenticated;
