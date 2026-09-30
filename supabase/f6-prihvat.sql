-- ===== SOKRAT STUDY — F6 ②/4.1: PRIHVAT i ODBACIVANJE nacrta od AI-ja (ADR-038 ①) =====
--
-- Nacrt postaje materijal ISKLJUČIVO korisnikovim „Prihvati" iz OBIČNE sesije (ADR-038 ①). AI ne
-- objavljuje: ove dvije funkcije su jedini put iz `node_drafts` u žive tablice i nijedna nije
-- otvorena ulozi `mcp_klijent`.
--
-- ODLUKE (Leon, anketa 2026-09-30):
--   • polica: POSTOJEĆA (id) ili NOVA po imenu — nova nastaje tek ovdje, pri prihvatu, pa AI i dalje
--     ne piše ništa živo · točno jedno od to dvoje
--   • nakon prihvata se nacrt BRIŠE (materijal je jedina kopija) → drugi prihvat istog nacrta dobije
--     `nacrt_ne_postoji` i materijal ostaje JEDAN
--   • prihvaća se samo PREDAN nacrt (u izradi = pregled i odbacivanje, ne prihvat)
--
-- ⚠️ JEDNA TRANSAKCIJA: nova polica, materijal, sadržaj i brisanje nacrta idu zajedno. Pad bilo kojeg
--    koraka (npr. validator u `publish_node`) poništi SVE — ne ostaje polica bez materijala.
-- ⚠️ ŽIVO GRADIVO SE PIŠE POSTOJEĆIM PUTEM: `create_node` + `publish_node` (f6-sadrzaj.sql), dakle isti
--    strogi profil, ista granica od 1 MB i ista povijest verzija kao kad korisnik objavi iz Studija.
--    Ovdje se samo dodaje ono čega tamo nema: veza pitanje → kartica (N4, `_provjeri_kartice_nacrta`).
--
-- Primijenjeno na STAGING 2026-09-30. PROD tek uz Leonov izričit OK (faza ⑥).

-- Druga, neovisna ograda uz grant (zrcalo `_nacrt_pozivatelj`): ako netko sutra grantira ove
-- funkcije ulozi `mcp_klijent`, token AI-ja i dalje ne prihvaća. `client_id` = token od AI-ja.
create or replace function public._nacrt_korisnik()
returns void
language plpgsql
stable
set search_path = public, pg_temp
as $$
begin
  if auth.uid() is null then raise exception 'nacrt_bez_identiteta' using errcode = '42501'; end if;
  if coalesce(auth.jwt() ->> 'client_id', '') <> '' then
    raise exception 'nacrt_samo_korisnik: nacrt prihvaća ili odbacuje samo korisnik u Sokratu' using errcode = '42501';
  end if;
end;
$$;
revoke execute on function public._nacrt_korisnik() from public, anon, authenticated;

-- Prihvat: predan nacrt → novi materijal u odabranoj polici. Vraća id materijala.
create or replace function public.prihvati_nacrt(p_id uuid, p_polica uuid, p_nova_polica text)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare d public.node_drafts; v_nova text; v_polica uuid; v_node uuid; v_ver bigint;
begin
  perform public._nacrt_korisnik();
  d := public._nacrt_moj(p_id);   -- vlastiti i živ, zaključan; tuđi i nepostojeći → ista greška
  if d.status <> 'predan' then
    raise exception 'nacrt_nije_predan: prihvaća se samo predan nacrt — AI ga mora predati' using errcode = '55000';
  end if;

  v_nova := nullif(btrim(coalesce(p_nova_polica, '')), '');
  if (p_polica is null) = (v_nova is null) then
    raise exception 'nacrt_polica: odaberi točno jednu policu — postojeću ili novu po imenu' using errcode = '22023';
  end if;
  if v_nova is not null and char_length(v_nova) > 200 then
    raise exception 'nacrt_polica: ime police je dulje od 200 znakova' using errcode = '22023';
  end if;

  perform public._provjeri_kartice_nacrta(d.payload);   -- druga linija za N4 (upis ga već provjerava)

  if p_polica is not null then
    -- Vlastita ŽIVA POLICA. Tuđa, obrisana, nepostojeća i materijal-umjesto-police → ista greška.
    perform 1 from public.nodes
     where id = p_polica and owner_id = auth.uid() and kind = 'folder' and deleted_at is null;
    if not found then
      raise exception 'nacrt_polica_ne_postoji: te police nema među tvojim policama' using errcode = 'P0002';
    end if;
    v_polica := p_polica;
  else
    v_polica := public.create_node(null, 'folder', v_nova);
  end if;

  v_node := public.create_node(v_polica, 'study', d.name);
  select version into v_ver from public.node_content where node_id = v_node;
  perform public.publish_node(v_node, d.payload, v_ver);   -- strogi profil + 1 MB + povijest verzija

  delete from public.node_drafts where id = d.id;
  return v_node;
end;
$$;

-- Odbacivanje: vlastiti živi nacrt (u izradi ili predan) nestane. Živo gradivo se ne dira.
create or replace function public.odbaci_nacrt(p_id uuid)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare d public.node_drafts;
begin
  perform public._nacrt_korisnik();
  d := public._nacrt_moj(p_id);
  delete from public.node_drafts where id = d.id;
end;
$$;

-- SAMO obična sesija (`authenticated`). `mcp_klijent` je `noinherit` i nije član `authenticated`
-- (f6-mcp-brava.sql), pa ovaj grant AI-ju ne otvara ništa — `mcp:brava` to mjeri uživo.
revoke execute on function public.prihvati_nacrt(uuid, uuid, text) from public, anon;
revoke execute on function public.odbaci_nacrt(uuid) from public, anon;
grant execute on function public.prihvati_nacrt(uuid, uuid, text) to authenticated;
grant execute on function public.odbaci_nacrt(uuid) to authenticated;
