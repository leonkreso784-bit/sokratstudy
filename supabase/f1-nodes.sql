-- =====================================================
-- SOKRAT STUDY — F1: OSOBNI UGC-GRADITELJ (CREATE_BACKEND_SPEC v3 §2–§3)
-- =====================================================
-- Pokreni JEDNOM po projektu (staging pa produkcija): idempotentno, additivno.
-- Preduvjeti: schema.sql (auth/profiles). NE dira `subject_content`, `content_versions`,
-- `publish_document` ni bilo što iz javnog kataloga — ovo je ZASEBAN otok.
--
-- Model (spec §2):
--   • nodes                 — self-referencijalno stablo korisnika (folder | study), TVRDA owner-RLS
--   • node_content          — payload study-čvora (isti oblik koji editor VEĆ uređuje) + version
--   • node_content_versions — append-only audit (STARO stanje prije svakog upisa)
--
-- Sigurnosni model (spec §0):
--   • anon nema NIŠTA · authenticated ima SAMO SELECT (RLS filtrira na vlasnika)
--   • SVAKI upis ide kroz SECURITY DEFINER RPC s owner-checkom (auth.uid())
--   • RLS write-policyji ostaju kao DRUGA brava ako se grantovi ikad vrate
--
-- Status: primijenjeno na STAGING (czljmvigkgiajzjxtndq) 2026-08-02, gate 51/51.
--         PROD (naxjubnedhrbhsuasayu) = TEK U F5, uz Leonov izričit OK.

-- =====================================================
-- 1) `nodes` — stablo
-- =====================================================
create table if not exists public.nodes (
    id          uuid primary key default gen_random_uuid(),
    owner_id    uuid not null references auth.users(id) on delete cascade,
    parent_id   uuid null references public.nodes(id) on delete cascade,
    kind        text not null check (kind in ('folder','study')),
    name        text not null check (char_length(btrim(name)) between 1 and 120),
    position    int  not null default 0,
    icon        text null,
    color       text null,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now(),
    deleted_at  timestamptz null          -- soft-delete (recoverable)
);

create index if not exists nodes_owner_parent_pos_idx on public.nodes (owner_id, parent_id, position);
create index if not exists nodes_parent_idx           on public.nodes (parent_id);

create or replace function public.touch_nodes()
returns trigger language plpgsql set search_path = public, pg_temp as $$
begin
    new.updated_at = now();
    return new;
end;
$$;
drop trigger if exists nodes_touch on public.nodes;
create trigger nodes_touch before update on public.nodes
    for each row execute function public.touch_nodes();

-- Integritet stabla — vrijedi za SVAKI put upisa (RPC i direktan):
--   1) roditelj postoji i ISTOG je vlasnika  2) roditelj je 'folder'  3) bez ciklusa
create or replace function public.nodes_validate()
returns trigger language plpgsql security definer set search_path = public, pg_temp as $$
declare p record; v_cycle boolean;
begin
    if new.parent_id is not null then
        if new.parent_id = new.id then
            raise exception 'node_cycle: čvor ne može biti sam sebi roditelj';
        end if;
        select owner_id, kind into p from public.nodes where id = new.parent_id;
        if not found then raise exception 'node_parent_missing: roditelj ne postoji'; end if;
        if p.owner_id is distinct from new.owner_id then
            raise exception 'node_parent_foreign: roditelj nije istog vlasnika';
        end if;
        if p.kind <> 'folder' then
            raise exception 'node_parent_not_folder: samo folder smije imati djecu';
        end if;
        with recursive up as (
            select id, parent_id from public.nodes where id = new.parent_id
            union all
            select n.id, n.parent_id from public.nodes n join up on n.id = up.parent_id
        )
        select exists (select 1 from up where id = new.id) into v_cycle;
        if v_cycle then raise exception 'node_cycle: novi roditelj je potomak čvora'; end if;
    end if;
    return new;
end;
$$;
drop trigger if exists nodes_validate_trg on public.nodes;
create trigger nodes_validate_trg before insert or update of parent_id, owner_id on public.nodes
    for each row execute function public.nodes_validate();

alter table public.nodes enable row level security;
drop policy if exists nodes_select_own on public.nodes;
create policy nodes_select_own on public.nodes for select using (auth.uid() = owner_id);
drop policy if exists nodes_insert_own on public.nodes;
create policy nodes_insert_own on public.nodes for insert with check (auth.uid() = owner_id);
drop policy if exists nodes_update_own on public.nodes;
create policy nodes_update_own on public.nodes for update using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
drop policy if exists nodes_delete_own on public.nodes;
create policy nodes_delete_own on public.nodes for delete using (auth.uid() = owner_id);

-- =====================================================
-- 2) `node_content` — gradivo study-čvora
-- =====================================================
create table if not exists public.node_content (
    node_id    uuid primary key references public.nodes(id) on delete cascade,
    payload    jsonb not null default '{}'::jsonb,
    version    bigint not null default 1,
    updated_at timestamptz not null default now()
);

-- touch: updated_at + version zajedno (kalup = touch_subject_content) → base_version uvijek istinit.
create or replace function public.touch_node_content()
returns trigger language plpgsql set search_path = public, pg_temp as $$
begin
    new.updated_at = now();
    new.version = old.version + 1;
    return new;
end;
$$;
drop trigger if exists node_content_touch on public.node_content;
create trigger node_content_touch before update on public.node_content
    for each row execute function public.touch_node_content();

create or replace function public.node_content_validate()
returns trigger language plpgsql security definer set search_path = public, pg_temp as $$
declare k text;
begin
    select kind into k from public.nodes where id = new.node_id;
    if not found then raise exception 'node_missing: čvor ne postoji'; end if;
    if k <> 'study' then
        raise exception 'node_content_not_study: gradivo smije nositi samo study-čvor';
    end if;
    return new;
end;
$$;
drop trigger if exists node_content_validate_trg on public.node_content;
create trigger node_content_validate_trg before insert on public.node_content
    for each row execute function public.node_content_validate();

alter table public.node_content enable row level security;
drop policy if exists node_content_select_own on public.node_content;
create policy node_content_select_own on public.node_content for select
    using (exists (select 1 from public.nodes n where n.id = node_id and n.owner_id = auth.uid()));
drop policy if exists node_content_insert_own on public.node_content;
create policy node_content_insert_own on public.node_content for insert
    with check (exists (select 1 from public.nodes n where n.id = node_id and n.owner_id = auth.uid()));
drop policy if exists node_content_update_own on public.node_content;
create policy node_content_update_own on public.node_content for update
    using (exists (select 1 from public.nodes n where n.id = node_id and n.owner_id = auth.uid()))
    with check (exists (select 1 from public.nodes n where n.id = node_id and n.owner_id = auth.uid()));
drop policy if exists node_content_delete_own on public.node_content;
create policy node_content_delete_own on public.node_content for delete
    using (exists (select 1 from public.nodes n where n.id = node_id and n.owner_id = auth.uid()));

-- =====================================================
-- 3) `node_content_versions` — append-only audit (spec §0 invarijanta 2)
-- =====================================================
create table if not exists public.node_content_versions (
    id        bigint generated always as identity primary key,
    node_id   uuid not null references public.nodes(id) on delete cascade,
    payload   jsonb not null,          -- STARO stanje prije upisa
    op        text not null default 'update',
    edited_by uuid null references auth.users(id) on delete set null,  -- H1: bez ovoga brisanje računa puca
    edited_at timestamptz not null default now()
);
create index if not exists node_content_versions_node_idx on public.node_content_versions (node_id, edited_at desc);

-- ⚠️ ZAMIJENJENO 2026-10-02 (F6 ②/4b): živa definicija je u `f6-nacrt.sql` (bilježi i `client_id`,
--    `verzija` i oznaku `op`). Ova je povijest prvog izdanja; f6-nacrt.sql ide poslije.
create or replace function public.snapshot_node_content()
returns trigger language plpgsql security definer set search_path = public, pg_temp as $$
begin
    insert into public.node_content_versions(node_id, payload, op, edited_by)
    values (old.node_id, old.payload, 'update', auth.uid());
    return new;
end;
$$;
drop trigger if exists node_content_snapshot on public.node_content;
create trigger node_content_snapshot before update on public.node_content
    for each row execute function public.snapshot_node_content();

alter table public.node_content_versions enable row level security;
drop policy if exists ncv_select_own on public.node_content_versions;
create policy ncv_select_own on public.node_content_versions for select
    using (exists (select 1 from public.nodes n where n.id = node_id and n.owner_id = auth.uid()));

-- =====================================================
-- 4) RPC-ovi strukture (owner-scoped, SECURITY DEFINER)
-- =====================================================

-- interna: dohvati čvor SAMO ako je moj i živ
create or replace function public._node_own(p_id uuid)
returns public.nodes language plpgsql security definer set search_path = public, pg_temp as $$
declare n public.nodes;
begin
    if auth.uid() is null then raise exception 'auth_required'; end if;
    select * into n from public.nodes where id = p_id;
    if not found then raise exception 'node_not_found: %', p_id; end if;
    if n.owner_id <> auth.uid() then raise exception 'node_denied: nije tvoj čvor'; end if;
    if n.deleted_at is not null then raise exception 'node_deleted: čvor je obrisan'; end if;
    return n;
end;
$$;

create or replace function public.create_node(p_parent uuid, p_kind text, p_name text)
returns uuid language plpgsql security definer set search_path = public, pg_temp as $$
declare v_id uuid; v_pos int; v_name text;
begin
    if auth.uid() is null then raise exception 'auth_required'; end if;
    if p_kind not in ('folder','study') then raise exception 'node_bad_kind: %', p_kind; end if;
    v_name := btrim(coalesce(p_name,''));
    if char_length(v_name) = 0 then raise exception 'node_bad_name: ime ne smije biti prazno'; end if;
    if p_parent is not null then perform public._node_own(p_parent); end if;

    select coalesce(max(position), -1) + 1 into v_pos
      from public.nodes
     where owner_id = auth.uid() and parent_id is not distinct from p_parent and deleted_at is null;

    insert into public.nodes(owner_id, parent_id, kind, name, position)
    values (auth.uid(), p_parent, p_kind, v_name, v_pos)
    returning id into v_id;

    if p_kind = 'study' then
        insert into public.node_content(node_id, payload) values (v_id, '{}'::jsonb);
    end if;
    return v_id;
end;
$$;

create or replace function public.rename_node(p_id uuid, p_name text)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare v_name text;
begin
    perform public._node_own(p_id);
    v_name := btrim(coalesce(p_name,''));
    if char_length(v_name) = 0 then raise exception 'node_bad_name: ime ne smije biti prazno'; end if;
    update public.nodes set name = v_name where id = p_id;
end;
$$;

create or replace function public.move_node(p_id uuid, p_new_parent uuid, p_position int default null)
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare v_pos int;
begin
    perform public._node_own(p_id);
    if p_new_parent is not null then perform public._node_own(p_new_parent); end if;

    if p_position is null then
        select coalesce(max(position), -1) + 1 into v_pos
          from public.nodes
         where owner_id = auth.uid() and parent_id is not distinct from p_new_parent
           and deleted_at is null and id <> p_id;
    else
        v_pos := greatest(p_position, 0);
        update public.nodes set position = position + 1
         where owner_id = auth.uid() and parent_id is not distinct from p_new_parent
           and deleted_at is null and id <> p_id and position >= v_pos;
    end if;

    -- anti-ciklus / kind-roditelja presuđuje nodes_validate trigger
    update public.nodes set parent_id = p_new_parent, position = v_pos where id = p_id;
end;
$$;

create or replace function public.reorder_nodes(p_parent uuid, p_ordered_ids uuid[])
returns void language plpgsql security definer set search_path = public, pg_temp as $$
declare v_expected int; v_given int;
begin
    if auth.uid() is null then raise exception 'auth_required'; end if;
    if p_parent is not null then perform public._node_own(p_parent); end if;
    if p_ordered_ids is null or array_length(p_ordered_ids,1) is null then
        raise exception 'node_bad_input: prazan popis';
    end if;

    select count(*) into v_expected from public.nodes
     where owner_id = auth.uid() and parent_id is not distinct from p_parent and deleted_at is null;
    select count(*) into v_given from public.nodes
     where id = any(p_ordered_ids) and owner_id = auth.uid()
       and parent_id is not distinct from p_parent and deleted_at is null;

    if v_given <> array_length(p_ordered_ids,1) or v_given <> v_expected then
        raise exception 'node_reorder_mismatch: popis mora sadržavati točno svu tvoju živu djecu tog roditelja';
    end if;

    update public.nodes n set position = x.ord - 1
      from unnest(p_ordered_ids) with ordinality as x(id, ord)
     where n.id = x.id;
end;
$$;

create or replace function public.delete_node(p_id uuid)
returns int language plpgsql security definer set search_path = public, pg_temp as $$
declare v_n int;
begin
    perform public._node_own(p_id);
    with recursive sub as (
        select id from public.nodes where id = p_id
        union all
        select n.id from public.nodes n join sub on n.parent_id = sub.id
    )
    update public.nodes set deleted_at = now()
     where id in (select id from sub) and deleted_at is null;
    get diagnostics v_n = row_count;
    return v_n;
end;
$$;

create or replace function public.restore_node(p_id uuid)
returns int language plpgsql security definer set search_path = public, pg_temp as $$
declare n public.nodes; v_n int; v_pdel timestamptz;
begin
    if auth.uid() is null then raise exception 'auth_required'; end if;
    select * into n from public.nodes where id = p_id;
    if not found then raise exception 'node_not_found: %', p_id; end if;
    if n.owner_id <> auth.uid() then raise exception 'node_denied: nije tvoj čvor'; end if;
    if n.deleted_at is null then return 0; end if;

    if n.parent_id is not null then
        select deleted_at into v_pdel from public.nodes where id = n.parent_id;
        if v_pdel is not null then raise exception 'node_parent_deleted: prvo vrati roditelja'; end if;
    end if;

    with recursive sub as (
        select id from public.nodes where id = p_id
        union all
        select c.id from public.nodes c join sub on c.parent_id = sub.id
    )
    update public.nodes set deleted_at = null
     where id in (select id from sub) and deleted_at is not null;
    get diagnostics v_n = row_count;
    return v_n;
end;
$$;

-- =====================================================
-- 5) `publish_node` — jedini put upisa GRADIVA (kalup = publish_document)
-- ⚠️ ZAMIJENJENO 2026-09-30 (F6 ②/0b): živa definicija je u `f6-sadrzaj.sql` (strogi profil +
--    1 MB). Ova ostaje kao povijest prvog izdanja; primjena ove datoteke NAKON f6-sadrzaj.sql bi
--    vratila objavu bez validatora — zato f6-sadrzaj.sql ide poslije.
-- =====================================================
create or replace function public.publish_node(p_node_id uuid, p_payload jsonb, p_base_version bigint)
returns bigint language plpgsql security definer set search_path = public, pg_temp as $$
declare n public.nodes; v_cur bigint; v_new bigint;
begin
    n := public._node_own(p_node_id);
    if n.kind <> 'study' then
        raise exception 'publish_not_study: gradivo se objavljuje samo na study-čvor';
    end if;
    if p_base_version is null then raise exception 'publish_bad_input: treba base_version'; end if;

    -- Validacija payloada (identična publish_document).
    if jsonb_typeof(p_payload) is distinct from 'object' or p_payload = '{}'::jsonb then
        raise exception 'publish_bad_payload: payload mora biti ne-prazan objekt';
    end if;
    if exists (select 1 from jsonb_each(p_payload) where jsonb_typeof(value) <> 'object') then
        raise exception 'publish_bad_payload: sve top-level vrijednosti moraju biti objekti';
    end if;

    select version into v_cur from public.node_content where node_id = p_node_id for update;
    if not found then raise exception 'publish_missing_row: %', p_node_id; end if;
    if v_cur is distinct from p_base_version then
        raise exception 'publish_version_conflict: base %, u bazi %', p_base_version, v_cur;
    end if;

    update public.node_content set payload = p_payload where node_id = p_node_id
     returning version into v_new;
    return v_new;
end;
$$;

-- =====================================================
-- 6) Ovlasti — least privilege (advisor higijena od 1. dana, U4 presedan)
-- =====================================================
-- Tablice: anon NIŠTA (graditelj je prijavljen-only); authenticated SAMO SELECT
-- (svaki upis ide kroz SECURITY DEFINER RPC, koji radi kao vlasnik funkcije).
revoke all on public.nodes                 from anon, authenticated;
revoke all on public.node_content          from anon, authenticated;
revoke all on public.node_content_versions from anon, authenticated;
grant select on public.nodes                 to authenticated;
grant select on public.node_content          to authenticated;
grant select on public.node_content_versions to authenticated;

-- Trigger-funkcije NE SMIJU biti dostupne kao /rest/v1/rpc/ (advisor 0028/0029).
revoke execute on function public.nodes_validate()        from public, anon, authenticated;
revoke execute on function public.node_content_validate() from public, anon, authenticated;
revoke execute on function public.snapshot_node_content() from public, anon, authenticated;
revoke execute on function public.touch_nodes()           from public, anon, authenticated;
revoke execute on function public.touch_node_content()    from public, anon, authenticated;

-- Interna pomoćna: nikad izvana.
revoke execute on function public._node_own(uuid) from public, anon, authenticated;

-- Javni RPC-ovi: anon NE, samo prijavljeni; owner-check unutra presuđuje.
do $g$
declare f text;
begin
  foreach f in array array[
    'create_node(uuid,text,text)', 'rename_node(uuid,text)',
    'move_node(uuid,uuid,int)', 'reorder_nodes(uuid,uuid[])',
    'delete_node(uuid)', 'restore_node(uuid)',
    'publish_node(uuid,jsonb,bigint)'
  ] loop
    execute format('revoke execute on function public.%s from public, anon', f);
    execute format('grant execute on function public.%s to authenticated', f);
  end loop;
end $g$;
