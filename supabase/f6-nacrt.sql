-- ===== SOKRAT STUDY — F6 ②/1: NACRT od AI-ja (ADR-038 ①) =====
--
-- AI prvi put PIŠE — ali nikad u `nodes` / `node_content`. Postojećih 7 RPC-ova čvorova i
-- `publish_node` pišu ŽIVO, a živo je upravo ono što AI ne smije (ADR-038, posljedica 1). Zato
-- AI dobiva JEDAN nov put, u zasebnu tablicu `node_drafts`, i nijedan u žive tablice. Materijal
-- nastaje tek korisnikovim „Prihvati" iz OBIČNE sesije (②/4).
--
-- ODLUKE (Leon, anketa 2026-09-29):
--   • kvota: najviše 3 nacrta U IZRADI i 10 NEPREGLEDANIH (u izradi + predani) po korisniku ·
--     nacrt najviše 1 MB (2× najveća lekcija u katalogu, 526 KB — izmjereno 29.09.)
--   • nacrt U IZRADI koji AI ne dira 7 dana SAM NESTANE; predan ostaje dok ga korisnik ne
--     prihvati ili odbaci
--   • AI NE bira policu — korisnik je bira pri „Prihvati" (manje prava za AI)
--
-- ⚠️ „SAM NESTANE" BEZ pg_cron: istekao nacrt je NEPOSTOJEĆI za sve (RLS politika i svaki RPC
--    ga ne vide, kvotu ne troši) i fizički se briše pri vlasnikovom sljedećem `mcp_zapocni_nacrt`.
--    Redak korisnika koji se nikad ne vrati ostaje u tablici, nevidljiv. `pg_cron` postoji na
--    projektu ali NIJE instaliran → periodično čišćenje je IMENOVANO otvoreno (nova infrastruktura
--    i na PROD-u, zasebna odluka).
--
-- ⚠️ SIGURNOST: sve `mcp_*` funkcije su SECURITY DEFINER i time zaobilaze RLS — provjera vlasnika
--    u svakoj od njih JEDINA je brava nad tuđim nacrtom. Vlasnik se UVIJEK uzima iz tokena
--    (`auth.uid()`), nikad iz argumenta. Tuđi i nepostojeći nacrt daju ISTU grešku, da AI ne
--    može pogađanjem id-eva doznati da tuđi nacrt postoji.
--
-- Primijenjeno na STAGING 2026-09-29. PROD tek uz Leonov izričit OK (zajedno s ①/2 bravom).

-- ─── 1. tablica ─────────────────────────────────────────────────────────────────────────────────
create table if not exists public.node_drafts (
  id           uuid primary key default gen_random_uuid(),
  owner_id     uuid not null references auth.users(id) on delete cascade,
  client_id    text not null check (client_id <> ''),          -- koji je AI počeo nacrt (iz tokena)
  name         text not null check (char_length(btrim(name)) between 1 and 200),
  status       text not null default 'u_izradi' check (status in ('u_izradi', 'predan')),
  payload      jsonb not null default '{}'::jsonb check (jsonb_typeof(payload) = 'object'),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  submitted_at timestamptz,
  verzija      int not null default 1 check (verzija >= 1),     -- ②/1b: polazna oznaka upisa (N7)
  kljuc        text check (kljuc ~ '^[A-Za-z0-9_.:-]{1,100}$'),  -- ②/1b: ključ ponavljanja početka (N8)
  -- Tekstualna duljina, ne `pg_column_size`: ova druga mjeri KOMPRIMIRANO, pa bi granica ovisila
  -- o tome koliko se sadržaj dade stisnuti — a ne o tome koliko je velik.
  constraint node_drafts_payload_1mb check (octet_length(payload::text) <= 1048576),
  constraint node_drafts_predan_ima_vrijeme check ((status = 'predan') = (submitted_at is not null))
);

create index if not exists node_drafts_owner_idx on public.node_drafts (owner_id, status);

-- ②/1b (2026-09-30) na tablici koja već postoji (staging od ②/1). `create table if not exists` gore ih
-- nosi za svježu bazu; ovo ih dodaje postojećoj. Isti ključ = isti nacrt, po vlasniku.
alter table public.node_drafts add column if not exists verzija int not null default 1 check (verzija >= 1);
alter table public.node_drafts add column if not exists kljuc text check (kljuc ~ '^[A-Za-z0-9_.:-]{1,100}$');
create unique index if not exists node_drafts_kljuc_uq on public.node_drafts (owner_id, kljuc) where kljuc is not null;

alter table public.node_drafts enable row level security;

-- Istekao = u izradi i netaknut 7 dana. JEDNO mjesto definicije, zove ga i politika i svaki RPC.
create or replace function public._nacrt_zivi(p_status text, p_updated timestamptz)
returns boolean
language sql
stable   -- ovisi o `now()`, dakle NIJE immutable (i zato ne ide u indeks)
set search_path = public, pg_temp
as $$ select p_status = 'predan' or p_updated > now() - interval '7 days' $$;
-- `authenticated` ga treba jer ga zove RLS politika kao POZIVATELJ; `mcp_klijent` NE.
revoke execute on function public._nacrt_zivi(text, timestamptz) from public, anon;
grant execute on function public._nacrt_zivi(text, timestamptz) to authenticated;

-- Vlasnik svoje nacrte SAMO ČITA (pregled u ②/4). Upis ne ide nikome izravno — samo kroz RPC.
drop policy if exists node_drafts_select_own on public.node_drafts;
create policy node_drafts_select_own on public.node_drafts
  for select to authenticated
  using (owner_id = (select auth.uid()) and public._nacrt_zivi(status, updated_at));

revoke all on public.node_drafts from public, anon, authenticated;
grant select on public.node_drafts to authenticated;
-- `mcp_klijent` NE dobiva ni SELECT na tablicu: AI svoj nacrt čita kroz `mcp_procitaj_nacrt`.

-- ─── 2. zajednički uvjet svih mcp_* RPC-ova ─────────────────────────────────────────────────────
-- Tko zove mora biti AI (token s `client_id`) i imati identitet. EXECUTE je ionako dan samo ulozi
-- `mcp_klijent`, a ovo je druga, neovisna ograda: ako netko sutra grantira `authenticated`,
-- obična sesija i dalje ne piše u nacrt.
create or replace function public._nacrt_pozivatelj()
returns text
language plpgsql
stable
set search_path = public, pg_temp
as $$
declare v_client text := coalesce(auth.jwt() ->> 'client_id', '');
begin
  if auth.uid() is null then raise exception 'nacrt_bez_identiteta' using errcode = '42501'; end if;
  if v_client = '' then raise exception 'nacrt_samo_ai: nacrt piše samo AI kroz konektor' using errcode = '42501'; end if;
  return v_client;
end;
$$;
revoke execute on function public._nacrt_pozivatelj() from public, anon, authenticated;

-- Vlastiti ŽIVI nacrt, zaključan za ovu transakciju. Tuđi, istekao i nepostojeći → ista greška.
create or replace function public._nacrt_moj(p_id uuid)
returns public.node_drafts
language plpgsql
set search_path = public, pg_temp
as $$
declare d public.node_drafts;
begin
  select * into d from public.node_drafts
   where id = p_id and owner_id = auth.uid() and public._nacrt_zivi(status, updated_at)
   for update;
  if not found then raise exception 'nacrt_ne_postoji' using errcode = 'P0002'; end if;
  return d;
end;
$$;
revoke execute on function public._nacrt_moj(uuid) from public, anon, authenticated;

-- ②/4.1 (②/3-N4 iz revizije — NIJE MCP_SECURITY N4): pitanje koje nosi `card` mora upućivati na karticu ISTE lekcije. Alat to provjerava
-- (`alat_kartica_ne_postoji`), ali token isti RPC zove i mimo poslužitelja (N5) → provjera je i u
-- bazi. Samo na putu NACRTA (upis + prihvat), ne u `publish_node`: u Studiju korisnik smije obrisati
-- karticu, a pitanje koje je iz nje nastalo ostaje valjano gradivo. `card` sam je opcionalan.
create or replace function public._provjeri_kartice_nacrta(p jsonb)
returns void
language plpgsql
stable
set search_path = public, pg_temp
as $$
declare v_mjesto text;
begin
  select c.key || '.' || a.niz || '[' || (e.ord - 1) || '].card = ' || (e.v ->> 'card') into v_mjesto
    from jsonb_each(case when jsonb_typeof(p) = 'object' then p else '{}'::jsonb end) c
   cross join lateral (values ('quiz'), ('fillBlanks')) a(niz)
   cross join lateral jsonb_array_elements(case when jsonb_typeof(c.value -> a.niz) = 'array' then c.value -> a.niz else '[]'::jsonb end)
         with ordinality e(v, ord)
   where jsonb_typeof(c.value) = 'object'
     and jsonb_typeof(e.v) = 'object' and e.v ? 'card'
     and not exists (
       select 1 from jsonb_array_elements(case when jsonb_typeof(c.value -> 'flashcards') = 'array' then c.value -> 'flashcards' else '[]'::jsonb end) f
        where f ->> 'id' = e.v ->> 'card')
   limit 1;
  if v_mjesto is not null then
    raise exception 'nacrt_kartica_ne_postoji: pitanje upućuje na karticu koje u lekciji nema (%)', left(v_mjesto, 200)
      using errcode = '22023';
  end if;
end;
$$;
revoke execute on function public._provjeri_kartice_nacrta(jsonb) from public, anon, authenticated;

-- ─── 3. RPC-ovi za AI ───────────────────────────────────────────────────────────────────────────

-- Novi nacrt. Kvota se broji pod savjetodavnom bravom po korisniku, inače dva usporedna poziva
-- oba vide „2 od 3" i oba prođu.
--
-- ②/1b (N8): `p_kljuc` = KLJUČ PONAVLJANJA koji šalje pozivatelj (MCP alat). Isti ključ vlasnika =
-- ISTI nacrt, vraćen bez trošenja kvote — prekinut razgovor koji ponovi „započni" ne stvara duplikat.
-- Obavezan: bez njega bi zaštita ovisila o tome hoće li ga pozivatelj poslati. Stari potpis bez
-- ključa se BRIŠE (preopterećenje bi ostavilo stari put otvoren, a `mcp:brava` sudi po imenu).
drop function if exists public.mcp_zapocni_nacrt(text);
create or replace function public.mcp_zapocni_nacrt(p_name text, p_kljuc text)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare v_client text; v_uid uuid; v_izrada int; v_ukupno int; v_id uuid;
begin
  v_client := public._nacrt_pozivatelj();
  v_uid := auth.uid();
  if p_kljuc is null or p_kljuc !~ '^[A-Za-z0-9_.:-]{1,100}$' then
    raise exception 'nacrt_los_kljuc: ključ ponavljanja je obavezan (1–100 znakova A-Z a-z 0-9 _ . : -)' using errcode = '22023';
  end if;
  perform pg_advisory_xact_lock(hashtextextended('node_drafts:' || v_uid::text, 0));

  -- „Sam nestane": istekli vlasnikovi nacrti se ovdje fizički brišu (v. zaglavlje) — PRIJE traženja
  -- ključa, pa istekao nacrt ne „oživi" ponovljenim ključem.
  delete from public.node_drafts where owner_id = v_uid and not public._nacrt_zivi(status, updated_at);

  select id into v_id from public.node_drafts where owner_id = v_uid and kljuc = p_kljuc;
  if found then return v_id; end if;

  select count(*) filter (where status = 'u_izradi'), count(*)
    into v_izrada, v_ukupno
    from public.node_drafts where owner_id = v_uid;
  if v_izrada >= 3 then
    raise exception 'nacrt_kvota_u_izradi: najviše 3 nacrta u izradi — predaj ili pričekaj' using errcode = '53400';
  end if;
  if v_ukupno >= 10 then
    raise exception 'nacrt_kvota_nepregledano: 10 nacrta čeka pregled — korisnik ih mora prihvatiti ili odbaciti' using errcode = '53400';
  end if;

  insert into public.node_drafts (owner_id, client_id, name, kljuc)
  values (v_uid, v_client, btrim(p_name), p_kljuc)
  returning id into v_id;
  return v_id;
end;
$$;

-- Upis sadržaja: CIJELI payload se zamjenjuje (sastavlja ga MCP poslužitelj u ②/2 — ondje žive
-- pravila redoslijeda i kvalitete, ADR-038 ④). Baza drži oblik, veličinu, vlasništvo i strogi
-- profil sadržaja (②/0a, `_provjeri_sadrzaj` iz f6-sadrzaj.sql).
--
-- ②/1b (N7): `p_verzija` = verzija nacrta od koje je pozivatelj krenuo. Ako se u međuvremenu
-- promijenila → `nacrt_sukob` (nitko ne gubi upis tiho). JEDINA iznimka: isti upis ponovljen (isti
-- sadržaj, a verzija je upravo za jedan veća) vraća postojeću verziju — odgovor se izgubio, upis nije.
-- Stari potpis bez verzije se BRIŠE (inače bi ostao put mimo provjere).
drop function if exists public.mcp_upisi_nacrt(uuid, jsonb);
create or replace function public.mcp_upisi_nacrt(p_id uuid, p_payload jsonb, p_verzija int)
returns int
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare d public.node_drafts; v_nova int;
begin
  perform public._nacrt_pozivatelj();
  d := public._nacrt_moj(p_id);
  if d.status <> 'u_izradi' then
    raise exception 'nacrt_predan: predan nacrt se više ne mijenja' using errcode = '55000';
  end if;
  if p_payload is null or jsonb_typeof(p_payload) <> 'object' then
    raise exception 'nacrt_los_oblik: sadržaj mora biti JSON objekt' using errcode = '22023';
  end if;
  if octet_length(p_payload::text) > 1048576 then
    raise exception 'nacrt_prevelik: najviše 1 MB' using errcode = '54000';
  end if;
  -- ②/0a: strogi profil (bez sirovog HTML-a, opasnih adresa i vanjskih slika; granice) provodi
  -- BAZA, jer token isti RPC zove i mimo poslužitelja (N5). Veličina ide prva — jeftinija je.
  perform public._provjeri_sadrzaj(p_payload);
  perform public._provjeri_kartice_nacrta(p_payload);   -- ②/4.1 (N4)
  if p_verzija is null then
    raise exception 'nacrt_bez_verzije: pošalji verziju od koje kreneš (mcp_procitaj_nacrt)' using errcode = '22023';
  end if;
  if d.verzija <> p_verzija then
    if d.verzija = p_verzija + 1 and d.payload = p_payload then
      return d.verzija;                               -- isti upis ponovljen: već je tu
    end if;
    raise exception 'nacrt_sukob: nacrt je u međuvremenu promijenjen (verzija %, poslano %) — pročitaj ga ponovno', d.verzija, p_verzija
      using errcode = 'PT409';   -- NE 40001: PostgREST 40001 (serialization) ponavlja SAM, u krug (izmjereno 30.09.: upis je visio)
  end if;
  update public.node_drafts set payload = p_payload, updated_at = now(), verzija = verzija + 1
   where id = d.id returning verzija into v_nova;
  return v_nova;
end;
$$;

-- Predaja: nacrt se zamrzne i čeka korisnikov pregled.
create or replace function public.mcp_predaj_nacrt(p_id uuid)
returns timestamptz
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare d public.node_drafts; v_kad timestamptz;
begin
  perform public._nacrt_pozivatelj();
  d := public._nacrt_moj(p_id);
  if d.status <> 'u_izradi' then
    raise exception 'nacrt_predan: nacrt je već predan' using errcode = '55000';
  end if;
  if d.payload = '{}'::jsonb then
    raise exception 'nacrt_prazan: prazan nacrt se ne predaje' using errcode = '22023';
  end if;
  update public.node_drafts set status = 'predan', submitted_at = now(), updated_at = now()
   where id = d.id returning submitted_at into v_kad;
  return v_kad;
end;
$$;

-- Čitanje vlastitog nacrta (AI nastavlja gdje je stao).
create or replace function public.mcp_procitaj_nacrt(p_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare d public.node_drafts;
begin
  perform public._nacrt_pozivatelj();
  d := public._nacrt_moj(p_id);
  return jsonb_build_object('id', d.id, 'name', d.name, 'status', d.status, 'payload', d.payload,
                            'verzija', d.verzija, 'updated_at', d.updated_at, 'submitted_at', d.submitted_at);
end;
$$;

-- Popis vlastitih živih nacrta, BEZ sadržaja (AI nađe svoj nacrt i vidi kvotu).
-- ②/1b: vraća i `verzija` (promjena povratnog tipa traži drop).
drop function if exists public.mcp_moji_nacrti();
create or replace function public.mcp_moji_nacrti()
returns table (id uuid, name text, status text, updated_at timestamptz, velicina int, verzija int)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  perform public._nacrt_pozivatelj();
  return query
    select d.id, d.name, d.status, d.updated_at, octet_length(d.payload::text), d.verzija
      from public.node_drafts d
     where d.owner_id = auth.uid() and public._nacrt_zivi(d.status, d.updated_at)
     order by d.updated_at desc;
end;
$$;

-- ─── 4. tko smije zvati ─────────────────────────────────────────────────────────────────────────
-- SAMO `mcp_klijent`. `authenticated` NE: „Prihvati" (②/4) je zaseban RPC za običnu sesiju, a
-- AI-ov put u nacrt obična sesija ne treba. Brana `mcp:brava` čita ovo iz inventara (OTVORENO).
do $$
declare f text;
begin
  foreach f in array array[
    'mcp_zapocni_nacrt(text, text)', 'mcp_upisi_nacrt(uuid, jsonb, int)', 'mcp_predaj_nacrt(uuid)',
    'mcp_procitaj_nacrt(uuid)', 'mcp_moji_nacrti()'
  ] loop
    execute format('revoke execute on function public.%s from public, anon, authenticated', f);
    execute format('grant execute on function public.%s to mcp_klijent', f);
  end loop;
end
$$;
