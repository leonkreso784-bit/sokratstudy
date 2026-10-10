-- ===== SOKRAT STUDY — F6 ②/1: NACRT od AI-ja (ADR-038 ①) =====
--
-- AI prvi put PIŠE — ali nikad u `nodes` / `node_content`. Postojećih 7 RPC-ova čvorova i
-- `publish_node` pišu ŽIVO, a živo je upravo ono što AI ne smije (ADR-038, posljedica 1). Zato
-- AI dobiva JEDAN nov put, u zasebnu tablicu `node_drafts`, i nijedan u žive tablice. Materijal
-- nastaje tek korisnikovim „Prihvati" iz OBIČNE sesije (②/4).
-- ⚠️ ADR-039 (2026-10-01) to MIJENJA: `mcp_predaj_nacrt` sam stavlja materijal na policu, cijel, u
--    jednoj transakciji (§ „②/4.3′" niže) — AI-jev prijelaz u živo za NOV materijal. ②/4b (02.10.) dodaje
--    drugi, za IZMJENU vlastitog materijala: isti `mcp_predaj_nacrt`, s provjerom verzije (§ „②/4b").
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

-- ②/4.2 (Leon, ankete 30.09.): polica i opseg biraju se NA POČETKU i putuju s nacrtom. Polica =
-- postojeća (`polica_id`) ILI nova po imenu (`nova_polica`, nastaje tek pri Prihvati). Obje su nullable:
-- nacrti iz vremena prije ②/4.2 ih nemaju, a obrisana polica se ovdje samo zaboravi (korisnik bira
-- drugu pri Prihvati). Obavezni su za NOV nacrt — to provodi `mcp_zapocni_nacrt`.
alter table public.node_drafts add column if not exists polica_id uuid references public.nodes(id) on delete set null;
alter table public.node_drafts add column if not exists nova_polica text check (char_length(btrim(nova_polica)) between 1 and 200);
alter table public.node_drafts add column if not exists opseg text check (opseg in ('sazeto', 'standardno', 'detaljno'));
alter table public.node_drafts drop constraint if exists node_drafts_jedna_polica;
alter table public.node_drafts add constraint node_drafts_jedna_polica check (polica_id is null or nova_polica is null);

-- ②/4b (Leon, anketa 2026-10-02): NACRT IZMJENE postojećeg materijala. `izvor_id` = materijal koji se
-- mijenja, `polazna_verzija` = `node_content.version` u trenutku kopiranja. Predaja upisuje samo ako je
-- verzija i dalje ista (§ „②/4b" niže). Izmjena ostaje gdje je materijal → nema police. Obrisan
-- materijal (tvrdo) briše i svoj nacrt izmjene; meko obrisan ga ostavlja, a predaja ga odbije.
alter table public.node_drafts add column if not exists izvor_id uuid references public.nodes(id) on delete cascade;
alter table public.node_drafts add column if not exists polazna_verzija bigint;
alter table public.node_drafts drop constraint if exists node_drafts_izmjena;
alter table public.node_drafts add constraint node_drafts_izmjena check (
  (izvor_id is null) = (polazna_verzija is null)
  and (izvor_id is null or (polica_id is null and nova_polica is null)));

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

-- ─── K/5 UČESTALOST UPISA (ZAVRSNICA K/5, N11; Leon, ankete 29.09. i 10.10.) ────────────────────
-- 60 upisa u 60 s i 1 000 u 24 h, ZBROJ po korisniku: svi njegovi konektori zajedno. Claude svakim
-- spajanjem registrira nov `client_id` (staging 10.10.: 16 klijenata za jednog korisnika), pa bi granica
-- po klijentu bila zaobilaziva novim spajanjem; `client_id` se ipak bilježi u svaki redak (tko troši, K/8).
-- Živi U BAZI jer isti token RPC zove i mimo MCP poslužitelja (N5). Svaki RPC koji PIŠE zove
-- `_nacrt_upis()` umjesto `_nacrt_pozivatelj()`; čitanja se ne broje (unit `mcp-alati` podjelu izvodi
-- iz ove datoteke). Prekoračenje = `PT429` → PostgREST vraća HTTP 429 i onome tko zove mimo poslužitelja.
--
-- KLIZNI prozor (redak po upisu), ne „ova minuta na satu": fiksni prozor pusti do 120 upisa preko
-- granice minute, a „pokušaj za N s" ne bi bio točan. Tablica se čisti sama: svaki upis briše korisnikove
-- retke starije od dana (najviše ~1 000 po korisniku), bez pg_cron.
--
-- ⚠️ SVJESNA GRANICA: broji se samo USPJEŠAN upis. Odbijen upis (bilo kojim imenom, pa i ovom granicom)
--    poništi cijelu transakciju, a s njom i svoj redak — zato 61. upis ne troši kvotu, ali ni poplava
--    neispravnih upisa ne. Unutar jedne transakcije Postgres drukčije ne može; cijenu takvog poziva
--    ograničava K/7 (`statement_timeout`). Rizik N11 bio je 60 MB ZAPISANOG u minuti — to je zatvoreno.
create table if not exists public.mcp_upisi (
  id        bigint generated always as identity primary key,
  owner_id  uuid not null references auth.users(id) on delete cascade,
  client_id text not null check (client_id <> ''),
  kad        timestamptz not null default now()
);
create index if not exists mcp_upisi_owner_kad_idx on public.mcp_upisi (owner_id, kad);
alter table public.mcp_upisi enable row level security;
-- Nikome ništa (ni SELECT): piše ga i čita samo `_nacrt_upis` kao vlasnik funkcije.
revoke all on public.mcp_upisi from public, anon, authenticated, mcp_klijent;

create or replace function public._nacrt_upis()
returns text
language plpgsql
volatile
set search_path = public, pg_temp
as $$
declare v_client text; v_uid uuid; v_min int; v_dan int; v_od timestamptz;
begin
  v_client := public._nacrt_pozivatelj();
  v_uid := auth.uid();
  -- Brava po korisniku do kraja transakcije: bez nje dva usporedna upisa oba izbroje 59 i oba prođu.
  perform pg_advisory_xact_lock(hashtextextended('mcp_upisi:' || v_uid::text, 0));
  delete from public.mcp_upisi where owner_id = v_uid and kad <= now() - interval '1 day';
  select count(*), count(*) filter (where kad > now() - interval '60 seconds')
    into v_dan, v_min
    from public.mcp_upisi where owner_id = v_uid;
  -- N = kad ispadne toliko najstarijih da ostane jedan manje od granice.
  if v_dan >= 1000 then
    select kad into v_od from public.mcp_upisi where owner_id = v_uid
     order by kad offset v_dan - 1000 limit 1;
    raise exception 'nacrt_ucestalost_dan: najviše 1000 upisa u 24 h — pokušaj za % s',
      greatest(1, ceil(extract(epoch from v_od + interval '1 day' - now())))::int
      using errcode = 'PT429';
  end if;
  if v_min >= 60 then
    select kad into v_od from public.mcp_upisi where owner_id = v_uid and kad > now() - interval '60 seconds'
     order by kad offset v_min - 60 limit 1;
    raise exception 'nacrt_ucestalost_min: najviše 60 upisa u minuti — pokušaj za % s',
      greatest(1, ceil(extract(epoch from v_od + interval '60 seconds' - now())))::int
      using errcode = 'PT429';
  end if;
  insert into public.mcp_upisi (owner_id, client_id) values (v_uid, v_client);
  return v_client;
end;
$$;
revoke execute on function public._nacrt_upis() from public, anon, authenticated;

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
--
-- ②/4.2: polica (`p_polica` ILI `p_nova_polica`, točno jedno) i `p_opseg` su obavezni. Postojeća polica
-- mora biti VLASTITA živa polica — tuđa, obrisana, nepostojeća i materijal daju istu grešku (isti razlog
-- kao u prihvatu). Ponovljen ključ vraća postojeći nacrt i NE mijenja mu policu ni opseg.
drop function if exists public.mcp_zapocni_nacrt(text);
drop function if exists public.mcp_zapocni_nacrt(text, text);
create or replace function public.mcp_zapocni_nacrt(p_name text, p_kljuc text, p_polica uuid, p_nova_polica text, p_opseg text)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare v_client text; v_uid uuid; v_izrada int; v_ukupno int; v_id uuid; v_nova text;
begin
  v_client := public._nacrt_upis();   -- K/5: upis se broji
  v_uid := auth.uid();
  if p_kljuc is null or p_kljuc !~ '^[A-Za-z0-9_.:-]{1,100}$' then
    raise exception 'nacrt_los_kljuc: ključ ponavljanja je obavezan (1–100 znakova A-Z a-z 0-9 _ . : -)' using errcode = '22023';
  end if;
  if p_opseg is null or p_opseg not in ('sazeto', 'standardno', 'detaljno') then
    raise exception 'nacrt_opseg: opseg je obavezan (sazeto, standardno, detaljno)' using errcode = '22023';
  end if;
  v_nova := nullif(btrim(coalesce(p_nova_polica, '')), '');
  if (p_polica is null) = (v_nova is null) or char_length(coalesce(v_nova, '')) > 200 then
    raise exception 'nacrt_polica: točno jedna polica — postojeća ili nova po imenu (do 200 znakova)' using errcode = '22023';
  end if;
  perform pg_advisory_xact_lock(hashtextextended('node_drafts:' || v_uid::text, 0));

  -- „Sam nestane": istekli vlasnikovi nacrti se ovdje fizički brišu (v. zaglavlje) — PRIJE traženja
  -- ključa, pa istekao nacrt ne „oživi" ponovljenim ključem.
  delete from public.node_drafts where owner_id = v_uid and not public._nacrt_zivi(status, updated_at);

  select id into v_id from public.node_drafts where owner_id = v_uid and kljuc = p_kljuc and izvor_id is null;
  if found then return v_id; end if;
  -- ②/4b: isti ključ već nosi nacrt IZMJENE → ne vraćaj njega kao „nov materijal".
  perform 1 from public.node_drafts where owner_id = v_uid and kljuc = p_kljuc;
  if found then
    raise exception 'nacrt_kljuc_zauzet: taj ključ ponavljanja već pripada drugom nacrtu — uzmi nov ključ' using errcode = '22023';
  end if;

  if p_polica is not null then
    perform 1 from public.nodes
     where id = p_polica and owner_id = v_uid and kind = 'folder' and deleted_at is null;
    if not found then
      raise exception 'nacrt_polica_ne_postoji: te police nema među korisnikovim policama' using errcode = 'P0002';
    end if;
  end if;

  select count(*) filter (where status = 'u_izradi'), count(*)
    into v_izrada, v_ukupno
    from public.node_drafts where owner_id = v_uid;
  if v_izrada >= 3 then
    raise exception 'nacrt_kvota_u_izradi: najviše 3 nacrta u izradi — predaj ili pričekaj' using errcode = '53400';
  end if;
  if v_ukupno >= 10 then
    raise exception 'nacrt_kvota_nepregledano: 10 nacrta čeka pregled — korisnik ih mora prihvatiti ili odbaciti' using errcode = '53400';
  end if;

  insert into public.node_drafts (owner_id, client_id, name, kljuc, polica_id, nova_polica, opseg)
  values (v_uid, v_client, btrim(p_name), p_kljuc, p_polica, v_nova, p_opseg)
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
  perform public._nacrt_upis();   -- K/5: upis se broji
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

-- ─── ②/4.3′ PREDAJA = MATERIJAL NA POLICI (ADR-039, Leon 2026-10-01) ───────────────────────────
-- Ekrana za pregled nema: `mcp_predaj_nacrt` nacrt u JEDNOJ transakciji pretvori u materijal u polici
-- i nacrt obriše. Nikad pola-materijal: pad bilo kojeg koraka (validator, polica, kartice) poništi
-- sve, nacrt ostaje. AI time dobiva TOČNO jedan prijelaz u živo, i on samo STVARA nov materijal u
-- vlastitoj polici — postojeći čvor ne prima ni kao argument. ②/4b: postojeći materijal mijenja SAMO
-- nacrt izmjene (`izvor_id`, nastao u `mcp_zapocni_izmjenu` iz vlastitog materijala), i to s provjerom verzije.
--
-- ODLUKE (Leon, anketa 2026-10-01):
--   • predaja ponovljena nakon uspjeha (AI-ju se izgubio odgovor) vraća ISTI materijal — zato bilješka
--     nacrt → materijal ispod, 7 dana; bez nje bi AI dobio „ne postoji" i krenuo ispočetka (duplikat)
--   • nacrt bez police (iz vremena prije ②/4.2) ili s obrisanom policom: AI pita korisnika i preda
--     ponovno s `p_polica` / `p_nova_polica`; dok polica ne valja, ništa ne nastaje
--   • prima i nacrt koji je PREDAN po starom (čekao ekran ②/4.3, koji je otpao)

-- Bilješka „ovaj nacrt je postao ovaj materijal". Bez sadržaja; nikome ne grantana — piše je i čita
-- samo `mcp_predaj_nacrt`. Obrisan materijal (meko) se ne vraća; stariji od 7 dana se briše.
create table if not exists public.node_drafts_predani (
  draft_id   uuid primary key,
  owner_id   uuid not null references auth.users(id) on delete cascade,
  node_id    uuid not null references public.nodes(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index if not exists node_drafts_predani_owner_idx on public.node_drafts_predani (owner_id, created_at);
create index if not exists node_drafts_predani_node_idx on public.node_drafts_predani (node_id);
alter table public.node_drafts_predani enable row level security;
revoke all on public.node_drafts_predani from public, anon, authenticated, mcp_klijent;

-- Nacrt → materijal u polici (zajedničko za `mcp_predaj_nacrt` i `prihvati_nacrt`, f6-prihvat.sql).
-- Pozivatelj je već zaključao vlastiti živi nacrt (`_nacrt_moj`) i dao TOČNO jedno: postojeću policu
-- ILI ime nove. Živo gradivo se piše POSTOJEĆIM putem (`create_node` + `publish_node`): isti strogi
-- profil, ista granica od 1 MB i ista povijest verzija kao objava iz Studija.
create or replace function public._nacrt_u_materijal(d public.node_drafts, p_polica uuid, p_nova_polica text)
returns uuid
language plpgsql
set search_path = public, pg_temp
as $$
declare v_polica uuid; v_node uuid; v_ver bigint;
begin
  -- ②/4b: nacrt izmjene nikad ne postaje NOV materijal (ni kroz korisnikov prihvat) — upisuje se samo u svoj izvor.
  if d.izvor_id is not null then
    raise exception 'nacrt_je_izmjena: nacrt izmjene ne postaje nov materijal — upisuje se u materijal iz kojeg je nastao' using errcode = '55000';
  end if;
  if d.payload = '{}'::jsonb then
    raise exception 'nacrt_prazan: prazan nacrt se ne predaje' using errcode = '22023';
  end if;
  perform public._provjeri_kartice_nacrta(d.payload);   -- druga linija za N4 (upis ga već provjerava)

  if p_polica is not null then
    -- Vlastita ŽIVA POLICA. Tuđa, obrisana, nepostojeća i materijal-umjesto-police → ista greška.
    perform 1 from public.nodes
     where id = p_polica and owner_id = auth.uid() and kind = 'folder' and deleted_at is null;
    if not found then
      raise exception 'nacrt_polica_ne_postoji: te police nema među korisnikovim policama' using errcode = 'P0002';
    end if;
    v_polica := p_polica;
  else
    v_polica := public.create_node(null, 'folder', p_nova_polica);
  end if;

  v_node := public.create_node(v_polica, 'study', d.name);
  select version into v_ver from public.node_content where node_id = v_node;
  perform public.publish_node(v_node, d.payload, v_ver);   -- strogi profil + 1 MB + povijest verzija

  delete from public.node_drafts where id = d.id;
  return v_node;
end;
$$;
revoke execute on function public._nacrt_u_materijal(public.node_drafts, uuid, text) from public, anon, authenticated;

-- Predaja: nacrt postaje materijal u polici. Vraća id materijala.
-- Polica: `p_polica` / `p_nova_polica` (najviše jedno) PREGAZE onu zapamćenu u nacrtu; bez njih ide
-- zapamćena; bez ičega → `nacrt_bez_police` (AI pita korisnika).
-- Stari potpis (samo id, vraćao vrijeme predaje) se BRIŠE — povratni tip se mijenja, a preopterećenje
-- bi ostavilo stari put otvoren (`mcp:brava` sudi po punom potpisu).
drop function if exists public.mcp_predaj_nacrt(uuid);
create or replace function public.mcp_predaj_nacrt(p_id uuid, p_polica uuid default null, p_nova_polica text default null)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare d public.node_drafts; v_nova text; v_polica uuid; v_node uuid;
begin
  perform public._nacrt_upis();   -- K/5: upis se broji
  v_nova := nullif(btrim(coalesce(p_nova_polica, '')), '');
  if (p_polica is not null and v_nova is not null) or char_length(coalesce(v_nova, '')) > 200 then
    raise exception 'nacrt_polica: najviše jedna polica — postojeća ili nova po imenu (do 200 znakova)' using errcode = '22023';
  end if;

  begin
    d := public._nacrt_moj(p_id);   -- zaključan: usporedna predaja istog nacrta čeka ovdje
  exception when sqlstate 'P0002' then
    -- Nacrta nema. Ako ga je ISTI korisnik već predao, vrati taj materijal (ponovljena predaja, i
    -- usporedna: druga čeka bravu gore, nakon prve nacrta više nema, a bilješka je upravo upisana).
    select l.node_id into v_node
      from public.node_drafts_predani l
      join public.nodes n on n.id = l.node_id and n.deleted_at is null
     where l.draft_id = p_id and l.owner_id = auth.uid() and l.created_at > now() - interval '7 days';
    if v_node is not null then return v_node; end if;
    raise;   -- tuđi, istekao, nepostojeći → ista greška kao i dosad
  end;

  if d.izvor_id is not null then
    -- ②/4b: nacrt IZMJENE se upisuje u svoj materijal, s provjerom verzije; polica se ne bira.
    if p_polica is not null or v_nova is not null then
      raise exception 'izmjena_polica: izmjena ostaje gdje je materijal — predaj je bez police' using errcode = '22023';
    end if;
    v_node := public._izmjena_u_materijal(d);
  else
    if p_polica is not null or v_nova is not null then
      v_polica := p_polica;
    elsif d.polica_id is not null then
      v_polica := d.polica_id;
    elsif d.nova_polica is not null then
      v_nova := d.nova_polica;
    else
      raise exception 'nacrt_bez_police: nacrt nema policu — pitaj korisnika i predaj s policom' using errcode = '22023';
    end if;
    v_node := public._nacrt_u_materijal(d, v_polica, v_nova);
  end if;
  delete from public.node_drafts_predani where owner_id = auth.uid() and created_at <= now() - interval '7 days';
  insert into public.node_drafts_predani (draft_id, owner_id, node_id) values (d.id, auth.uid(), v_node);
  return v_node;
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
                            'verzija', d.verzija, 'updated_at', d.updated_at, 'submitted_at', d.submitted_at,
                            'opseg', d.opseg, 'polica_id', d.polica_id, 'nova_polica', d.nova_polica,   -- ②/4.2
                            'izvor_id', d.izvor_id, 'polazna_verzija', d.polazna_verzija);              -- ②/4b
end;
$$;

-- Popis vlastitih živih nacrta, BEZ sadržaja (AI nađe svoj nacrt i vidi kvotu).
-- ②/1b: vraća i `verzija` (promjena povratnog tipa traži drop). ②/4b: i `izvor_id` (nacrt izmjene).
drop function if exists public.mcp_moji_nacrti();
create or replace function public.mcp_moji_nacrti()
returns table (id uuid, name text, status text, updated_at timestamptz, velicina int, verzija int, izvor_id uuid)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  perform public._nacrt_pozivatelj();
  return query
    select d.id, d.name, d.status, d.updated_at, octet_length(d.payload::text), d.verzija, d.izvor_id
      from public.node_drafts d
     where d.owner_id = auth.uid() and public._nacrt_zivi(d.status, d.updated_at)
     order by d.updated_at desc;
end;
$$;

-- ─── ②/4b IZMJENA POSTOJEĆEG MATERIJALA (ADR-039 t.2; Leon, anketa 2026-10-02) ─────────────────
-- AI na korisnikovu riječ mijenja VLASTITI materijal. Odluke:
--   ① KOPIJA → JEDAN UPIS: `mcp_zapocni_izmjenu` kopira materijal u nacrt izmjene i zapamti polaznu
--     verziju; AI radi istim alatima kao kod gradnje (`mcp_upisi_nacrt`); `mcp_predaj_nacrt` u JEDNOJ
--     transakciji upiše kroz `publish_node` (strogi profil, 1 MB, povijest) — ali SAMO ako je verzija
--     materijala i dalje polazna. Inače `izmjena_sukob`, materijal netaknut: korisnikova izmjena u
--     Studiju se nikad ne prepisuje. Nikad pola-izmjena, jedan redak povijesti po izmjeni.
--   ② doseg = sadržaj + lekcije + ime materijala (`mcp_preimenuj_nacrt`); premještanje NE.
--   ③ `mcp_vrati_izmjenu`: stanje prije AI-jeve zadnje izmjene vraća se kao NOVA verzija, s istom
--     provjerom sukoba. Vraća SADRŽAJ, ne ime (ime nema povijest).
--   ④ povijest bilježi `client_id` (koji AI) i `verzija` (koju je verziju redak bio) — okidač niže.
-- Doseg: materijal mora biti VLASTITI, živ, study. Tuđi, obrisani, nepostojeći i polica → ISTA greška
-- (`materijal_ne_postoji`), da AI pogađanjem id-eva ne dozna da tuđi postoji. Katalog (`subject_content`)
-- ovim funkcijama nije ni dohvatljiv: one čitaju samo `nodes` / `node_content`.

-- Povijest: tko (koji AI) i koja verzija. `op` dolazi iz `sokrat.op` (postavlja ga samo funkcija u
-- ovoj datoteci, lokalno za transakciju); bez nje je 'update' kao i dosad. Oznaka je AUDIT, ne brava:
-- `mcp_vrati_izmjenu` vraća samo vlasnikov vlastiti stari sadržaj, pa krivotvorena oznaka ne otvara ništa.
-- Zamjenjuje okidač iz `f1-nodes.sql` §3.
alter table public.node_content_versions add column if not exists client_id text;
alter table public.node_content_versions add column if not exists verzija bigint;
create or replace function public.snapshot_node_content()
returns trigger language plpgsql security definer set search_path = public, pg_temp as $$
begin
    insert into public.node_content_versions(node_id, payload, op, edited_by, client_id, verzija)
    values (old.node_id, old.payload, coalesce(nullif(current_setting('sokrat.op', true), ''), 'update'),
            auth.uid(), nullif(auth.jwt() ->> 'client_id', ''), old.version);
    return new;
end;
$$;

-- Vlastiti ŽIVI materijal (study). Sve ostalo → ista greška.
create or replace function public._materijal_moj(p_id uuid)
returns public.nodes
language plpgsql
stable
set search_path = public, pg_temp
as $$
declare n public.nodes;
begin
  select * into n from public.nodes
   where id = p_id and owner_id = auth.uid() and kind = 'study' and deleted_at is null;
  if not found then
    raise exception 'materijal_ne_postoji: tog materijala nema među korisnikovim materijalima' using errcode = 'P0002';
  end if;
  return n;
end;
$$;
revoke execute on function public._materijal_moj(uuid) from public, anon, authenticated;

-- Pitanje iz Studija smije upućivati na karticu koju je korisnik poslije obrisao (v. `_provjeri_kartice_nacrta`),
-- ali na putu nacrta to je greška. Pri kopiranju u nacrt izmjene se zato SAMO TA veza (`card`) skida s pitanja;
-- pitanje ostaje. Bez ovoga materijal s takvim pitanjem AI ne bi mogao mijenjati uopće.
create or replace function public._bez_visecih_kartica(p jsonb)
returns jsonb
language plpgsql
immutable
set search_path = public, pg_temp
as $$
declare k text; l jsonb; niz text; arr jsonb; kartice text[]; v_out jsonb := p;
begin
  if jsonb_typeof(p) <> 'object' then return p; end if;
  for k, l in select key, value from jsonb_each(p) loop
    continue when jsonb_typeof(l) <> 'object';
    select coalesce(array_agg(f ->> 'id'), '{}') into kartice
      from jsonb_array_elements(case when jsonb_typeof(l -> 'flashcards') = 'array' then l -> 'flashcards' else '[]'::jsonb end) f;
    foreach niz in array array['quiz', 'fillBlanks'] loop
      continue when jsonb_typeof(l -> niz) is distinct from 'array';
      select coalesce(jsonb_agg(case
               when jsonb_typeof(e.v) = 'object' and e.v ? 'card' and not coalesce((e.v ->> 'card') = any(kartice), false)
               then e.v - 'card' else e.v end order by e.ord), '[]'::jsonb)
        into arr from jsonb_array_elements(l -> niz) with ordinality e(v, ord);
      l := jsonb_set(l, array[niz], arr);
    end loop;
    v_out := jsonb_set(v_out, array[k], l);
  end loop;
  return v_out;
end;
$$;
revoke execute on function public._bez_visecih_kartica(jsonb) from public, anon, authenticated;

-- Čitanje vlastitog materijala S VERZIJOM (AI vidi što mijenja). `node_content` AI-ju ostaje zatvoren:
-- ovo je jedini put do sadržaja, i vodi samo do vlastitog živog materijala.
create or replace function public.mcp_procitaj_materijal(p_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare n public.nodes; c public.node_content;
begin
  perform public._nacrt_pozivatelj();
  n := public._materijal_moj(p_id);
  select * into c from public.node_content where node_id = n.id;
  return jsonb_build_object('id', n.id, 'name', n.name, 'parent_id', n.parent_id,
                            'verzija', coalesce(c.version, 0), 'updated_at', c.updated_at,
                            'payload', coalesce(c.payload, '{}'::jsonb));
end;
$$;

-- Početak izmjene: kopija materijala u nacrt izmjene, s polaznom verzijom. Vraća id nacrta.
-- Isti ključ = isti nacrt (kao `mcp_zapocni_nacrt`). Nova izmjena ISTOG materijala zamjenjuje staru
-- (jedna izmjena po materijalu — dvije bi se ionako srušile na sukobu verzije).
create or replace function public.mcp_zapocni_izmjenu(p_id uuid, p_kljuc text)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare v_client text; v_uid uuid; n public.nodes; c public.node_content; v_id uuid; v_izvor uuid;
        v_izrada int; v_ukupno int;
begin
  v_client := public._nacrt_upis();   -- K/5: upis se broji
  v_uid := auth.uid();
  if p_kljuc is null or p_kljuc !~ '^[A-Za-z0-9_.:-]{1,100}$' then
    raise exception 'nacrt_los_kljuc: ključ ponavljanja je obavezan (1–100 znakova A-Z a-z 0-9 _ . : -)' using errcode = '22023';
  end if;
  perform pg_advisory_xact_lock(hashtextextended('node_drafts:' || v_uid::text, 0));
  delete from public.node_drafts where owner_id = v_uid and not public._nacrt_zivi(status, updated_at);

  select id, izvor_id into v_id, v_izvor from public.node_drafts where owner_id = v_uid and kljuc = p_kljuc;
  if found then
    if v_izvor is distinct from p_id then
      raise exception 'nacrt_kljuc_zauzet: taj ključ ponavljanja već pripada drugom nacrtu — uzmi nov ključ' using errcode = '22023';
    end if;
    return v_id;
  end if;

  n := public._materijal_moj(p_id);
  select * into c from public.node_content where node_id = n.id;
  if not found then
    raise exception 'materijal_ne_postoji: tog materijala nema među korisnikovim materijalima' using errcode = 'P0002';
  end if;
  if octet_length(c.payload::text) > 1048576 then
    raise exception 'nacrt_prevelik: najviše 1 MB' using errcode = '54000';
  end if;

  delete from public.node_drafts where owner_id = v_uid and izvor_id = n.id;

  select count(*) filter (where status = 'u_izradi'), count(*)
    into v_izrada, v_ukupno
    from public.node_drafts where owner_id = v_uid;
  if v_izrada >= 3 then
    raise exception 'nacrt_kvota_u_izradi: najviše 3 nacrta u izradi — predaj ili pričekaj' using errcode = '53400';
  end if;
  if v_ukupno >= 10 then
    raise exception 'nacrt_kvota_nepregledano: 10 nacrta čeka pregled — korisnik ih mora prihvatiti ili odbaciti' using errcode = '53400';
  end if;

  insert into public.node_drafts (owner_id, client_id, name, kljuc, payload, izvor_id, polazna_verzija)
  values (v_uid, v_client, n.name, p_kljuc, public._bez_visecih_kartica(c.payload), n.id, c.version)
  returning id into v_id;
  return v_id;
end;
$$;

-- Ime nacrta (nova materijala ILI izmjene). Granica 120 = granica imena čvora (`nodes.name`).
create or replace function public.mcp_preimenuj_nacrt(p_id uuid, p_name text)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare d public.node_drafts; v_ime text := btrim(coalesce(p_name, ''));
begin
  perform public._nacrt_upis();   -- K/5: upis se broji
  d := public._nacrt_moj(p_id);
  if d.status <> 'u_izradi' then
    raise exception 'nacrt_predan: predan nacrt se više ne mijenja' using errcode = '55000';
  end if;
  if char_length(v_ime) not between 1 and 120 then
    raise exception 'nacrt_ime: ime materijala ima 1–120 znakova' using errcode = '22023';
  end if;
  update public.node_drafts set name = v_ime, updated_at = now() where id = d.id;
end;
$$;

-- Nacrt izmjene → materijal (zove ga samo `mcp_predaj_nacrt`, s već zaključanim vlastitim nacrtom).
create or replace function public._izmjena_u_materijal(d public.node_drafts)
returns uuid
language plpgsql
set search_path = public, pg_temp
as $$
declare n public.nodes; v_cur bigint; v_staro jsonb;
begin
  perform public._provjeri_kartice_nacrta(d.payload);
  n := public._materijal_moj(d.izvor_id);   -- u međuvremenu (meko) obrisan → odbij
  select version, payload into v_cur, v_staro from public.node_content where node_id = n.id for update;
  if v_cur is distinct from d.polazna_verzija then
    raise exception 'izmjena_sukob: materijal je promijenjen otkad je izmjena počela (verzija %, polazna %)', v_cur, d.polazna_verzija
      using errcode = 'PT409';   -- NE 40001 (v. `mcp_upisi_nacrt`)
  end if;
  if d.payload is distinct from v_staro then
    perform set_config('sokrat.op', 'mcp_izmjena', true);
    perform public.publish_node(n.id, d.payload, v_cur);   -- strogi profil + 1 MB + povijest (stara verzija)
    perform set_config('sokrat.op', '', true);
  end if;
  if d.name is distinct from n.name then
    perform public.rename_node(n.id, d.name);
  end if;
  delete from public.node_drafts where id = d.id;
  return n.id;
end;
$$;
revoke execute on function public._izmjena_u_materijal(public.node_drafts) from public, anon, authenticated;

-- Poništi AI-jevu zadnju izmjenu: sadržaj prije nje postaje NOVA verzija. Samo ako materijal od te
-- izmjene nitko nije mijenjao (inače `izmjena_sukob` — korisnikov rad se ne prepisuje). Ponovljeno
-- vraćanje vrati istu verziju (izgubljen odgovor). Vraća trenutnu verziju materijala.
create or replace function public.mcp_vrati_izmjenu(p_id uuid)
returns bigint
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare n public.nodes; v_cur bigint; r public.node_content_versions; v_nova bigint;
begin
  perform public._nacrt_upis();   -- K/5: upis se broji
  n := public._materijal_moj(p_id);
  select version into v_cur from public.node_content where node_id = n.id for update;
  select * into r from public.node_content_versions
   where node_id = n.id and op = 'mcp_izmjena' order by id desc limit 1;
  if not found then
    raise exception 'izmjena_nema: ovaj materijal nema AI izmjene koju bi se moglo vratiti' using errcode = 'P0002';
  end if;
  if v_cur = r.verzija + 1 then
    perform set_config('sokrat.op', 'mcp_vrati', true);
    v_nova := public.publish_node(n.id, r.payload, v_cur);
    perform set_config('sokrat.op', '', true);
    return v_nova;
  end if;
  if v_cur = r.verzija + 2 and exists (select 1 from public.node_content_versions
       where node_id = n.id and op = 'mcp_vrati' and verzija = r.verzija + 1 and id > r.id) then
    return v_cur;   -- već vraćeno
  end if;
  raise exception 'izmjena_sukob: materijal je promijenjen poslije AI-jeve izmjene (verzija %, izmjena je dala %)', v_cur, r.verzija + 1
    using errcode = 'PT409';
end;
$$;

-- ─── 4. tko smije zvati ─────────────────────────────────────────────────────────────────────────
-- SAMO `mcp_klijent`. `authenticated` NE: „Prihvati" (②/4) je zaseban RPC za običnu sesiju, a
-- AI-ov put u nacrt obična sesija ne treba. Brana `mcp:brava` čita ovo iz inventara (OTVORENO).
do $$
declare f text;
begin
  foreach f in array array[
    'mcp_zapocni_nacrt(text, text, uuid, text, text)', 'mcp_upisi_nacrt(uuid, jsonb, int)', 'mcp_predaj_nacrt(uuid, uuid, text)',
    'mcp_procitaj_nacrt(uuid)', 'mcp_moji_nacrti()',
    -- ②/4b
    'mcp_procitaj_materijal(uuid)', 'mcp_zapocni_izmjenu(uuid, text)', 'mcp_preimenuj_nacrt(uuid, text)', 'mcp_vrati_izmjenu(uuid)'
  ] loop
    execute format('revoke execute on function public.%s from public, anon, authenticated', f);
    execute format('grant execute on function public.%s to mcp_klijent', f);
  end loop;
end
$$;
