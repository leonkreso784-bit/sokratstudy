-- ===== SOKRAT STUDY — F6 ②/0a: STROGI PROFIL OSOBNOG SADRŽAJA, PROVODI GA BAZA =====
--
-- Jedna provjera (`_provjeri_sadrzaj`) za SVE putove kojima osobni sadržaj ulazi u bazu:
-- `mcp_upisi_nacrt` (AI, ②/0a — OŽIČEN) · `publish_node` (Studio, ②/0b — OŽIČEN, na dnu datoteke) · Prihvati (②/4 — još ne postoji).
-- Zašto baza: token AI-ja RPC zove i mimo MCP poslužitelja (MCP_SECURITY N5) — pravilo koje živi
-- samo u poslužitelju ne vrijedi ondje gdje ga korisnik gleda (nacrt prije Prihvati).
--
-- ODLUKE (Leon, anketa 2026-09-30): pg_jsonschema · JEDAN strogi profil za Studio i AI (bez
-- legacy-html, bez learn.content, slike samo `node-img:`) · umjerene granice (100 lekcija,
-- 500 stavki po vrsti, 1 000 blokova, kartica 500 znakova).
-- Ovdje je SIGURNOST i GRANICE, ne kvaliteta (prazna polja u izradi prolaze — Studio ih sprema).
--
-- ⚠️ Shema u `_ugc_shema()` je GENERIRANA iz `schema/ugc-content.schema.json`:
--    `npm run build:ugc-sql` (preflight vrti `-- --check`). Ne uređivati ručno između oznaka.
--    Živi drift (staging ≠ datoteka) mjeri `npm run ugc:sadrzaj`.
--
-- Redoslijed primjene: OVA datoteka PRIJE `f6-nacrt.sql` (koji je zove).
-- Primijenjeno na STAGING 2026-09-30. PROD tek u fazi ⑥, uz Leonov izričit OK.

create extension if not exists pg_jsonschema with schema extensions;

-- >>> UGC SHEMA (generirano: npm run build:ugc-sql) >>>
create or replace function public._ugc_shema()
returns json
language sql
immutable
set search_path = ''
as $fn$ select $ugc${
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://www.sokratstudy.com/schema/ugc-content.schema.json",
  "title": "Sokrat Study — osobni sadrzaj (UGC), strogi profil",
  "description": "Oblik JEDNOG payloada osobnog materijala (Studio i AI isto; Leon, anketa 30.09.). Provodi ga BAZA na svakom putu upisa (mcp_upisi_nacrt, publish_node, Prihvati) kroz pg_jsonschema; kopija u SQL-u je GENERIRANA (npm run build:ugc-sql). Ovdje su SIGURNOST i GRANICE, ne kvaliteta: prazna polja u izradi prolaze (Studio ih sprema, renderer ih preskace), a pravila kvalitete su F6 faza 3. Razlike od kataloske sheme: nema legacy-html ni learn.content (sirovi HTML), slike samo vlastite (node-img:<uid>/<cvor>/<datoteka>, bez .. i tudjih oblika), poveznice bez kontrolnih i Unicode-razmaka i bez sheme osim http/https/mailto, granice broja i duljine.",
  "type": "object",
  "minProperties": 1,
  "maxProperties": 100,
  "propertyNames": {
    "pattern": "^[A-Za-z0-9_-]{1,64}$"
  },
  "properties": {
    "schemaVersion": {
      "type": "integer",
      "minimum": 1,
      "maximum": 100
    }
  },
  "additionalProperties": {
    "$ref": "#/definitions/category"
  },
  "definitions": {
    "id": {
      "type": "string",
      "pattern": "^[A-Za-z0-9_-]{1,64}$"
    },
    "accent": {
      "type": "string",
      "pattern": "^#[0-9a-fA-F]{6}$"
    },
    "slika": {
      "type": "string",
      "pattern": "^node-img:[0-9a-f-]{36}/[0-9a-f-]{36}/[0-9A-Za-z-]{1,64}\\.(png|jpg|webp|gif)$"
    },
    "href": {
      "type": "string",
      "maxLength": 2000,
      "pattern": "^[^\\u0000-\\u0020\\u007f\\u00a0\\u1680\\u2000-\\u200b\\u2028\\u2029\\u202f\\u205f\\u3000\\ufeff]*$",
      "anyOf": [
        {
          "pattern": "^([hH][tT][tT][pP][sS]?|[mM][aA][iI][lL][tT][oO]):"
        },
        {
          "not": {
            "pattern": "^[A-Za-z][A-Za-z0-9+.-]*:"
          }
        }
      ]
    },
    "category": {
      "type": "object",
      "required": [
        "name"
      ],
      "additionalProperties": false,
      "properties": {
        "id": {
          "$ref": "#/definitions/id"
        },
        "name": {
          "type": "string",
          "maxLength": 200
        },
        "icon": {
          "type": "string",
          "pattern": "^fa-[a-z0-9-]{1,40}$"
        },
        "color": {
          "$ref": "#/definitions/accent"
        },
        "flashcards": {
          "type": "array",
          "maxItems": 500,
          "items": {
            "$ref": "#/definitions/flashcard"
          }
        },
        "quiz": {
          "type": "array",
          "maxItems": 500,
          "items": {
            "$ref": "#/definitions/quiz"
          }
        },
        "fillBlanks": {
          "type": "array",
          "maxItems": 500,
          "items": {
            "$ref": "#/definitions/fillBlank"
          }
        },
        "learn": {
          "$ref": "#/definitions/learn"
        }
      }
    },
    "flashcard": {
      "type": "object",
      "required": [
        "question",
        "answer"
      ],
      "additionalProperties": false,
      "properties": {
        "id": {
          "$ref": "#/definitions/id"
        },
        "question": {
          "type": "string",
          "maxLength": 500
        },
        "answer": {
          "type": "string",
          "maxLength": 500
        },
        "explanation": {
          "type": "string",
          "maxLength": 2000
        },
        "color": {
          "$ref": "#/definitions/accent"
        }
      }
    },
    "quiz": {
      "type": "object",
      "required": [
        "question",
        "options",
        "correct"
      ],
      "additionalProperties": false,
      "properties": {
        "id": {
          "$ref": "#/definitions/id"
        },
        "question": {
          "type": "string",
          "maxLength": 1000
        },
        "options": {
          "type": "array",
          "maxItems": 6,
          "items": {
            "type": "string",
            "maxLength": 500
          }
        },
        "correct": {
          "type": "integer",
          "minimum": 0,
          "maximum": 5
        },
        "image": {
          "$ref": "#/definitions/slika"
        },
        "imageAlt": {
          "type": "string",
          "maxLength": 500
        },
        "card": {
          "$ref": "#/definitions/id"
        },
        "color": {
          "$ref": "#/definitions/accent"
        }
      }
    },
    "fillBlank": {
      "type": "object",
      "required": [
        "sentence",
        "answer"
      ],
      "additionalProperties": false,
      "properties": {
        "id": {
          "$ref": "#/definitions/id"
        },
        "sentence": {
          "type": "string",
          "maxLength": 1000
        },
        "answer": {
          "type": "string",
          "maxLength": 200
        },
        "answers": {
          "type": "array",
          "maxItems": 10,
          "items": {
            "type": "string",
            "maxLength": 200
          }
        },
        "hint": {
          "type": "string",
          "maxLength": 500
        },
        "card": {
          "$ref": "#/definitions/id"
        },
        "color": {
          "$ref": "#/definitions/accent"
        }
      }
    },
    "learn": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "id": {
          "$ref": "#/definitions/id"
        },
        "title": {
          "type": "string",
          "maxLength": 200
        },
        "blocks": {
          "type": "array",
          "maxItems": 1000,
          "items": {
            "$ref": "#/definitions/block"
          }
        }
      }
    },
    "inline": {
      "oneOf": [
        {
          "type": "string",
          "maxLength": 10000
        },
        {
          "type": "array",
          "maxItems": 500,
          "items": {
            "$ref": "#/definitions/run"
          }
        }
      ]
    },
    "run": {
      "type": "object",
      "required": [
        "text"
      ],
      "additionalProperties": false,
      "properties": {
        "text": {
          "type": "string",
          "maxLength": 10000
        },
        "b": {
          "type": "boolean"
        },
        "i": {
          "type": "boolean"
        },
        "color": {
          "type": "string",
          "enum": [
            "indigo",
            "green",
            "amber",
            "red",
            "cyan",
            "blue",
            "violet",
            "pink",
            "default"
          ]
        },
        "href": {
          "$ref": "#/definitions/href"
        },
        "math": {
          "type": "boolean"
        }
      }
    },
    "block": {
      "$comment": "ZALIHOST (izmjereno mutacijom 30.09., 165 brisanja kroz cijeli unit: preživi tocno ova 3): block.required (svaki oneOf krak trazi type s const) te type:string uz enum samih tekstova u run.color i blockCallout.variant. Stoje radi jasnije poruke greske AI-ju; nijedan payload ih ne razlikuje.",
      "type": "object",
      "required": [
        "type"
      ],
      "properties": {
        "type": {
          "enum": [
            "heading",
            "paragraph",
            "list",
            "callout",
            "image",
            "video",
            "table",
            "formula"
          ]
        }
      },
      "oneOf": [
        {
          "$ref": "#/definitions/blockHeading"
        },
        {
          "$ref": "#/definitions/blockParagraph"
        },
        {
          "$ref": "#/definitions/blockList"
        },
        {
          "$ref": "#/definitions/blockCallout"
        },
        {
          "$ref": "#/definitions/blockImage"
        },
        {
          "$ref": "#/definitions/blockVideo"
        },
        {
          "$ref": "#/definitions/blockTable"
        },
        {
          "$ref": "#/definitions/blockFormula"
        }
      ]
    },
    "blockHeading": {
      "type": "object",
      "required": [
        "type",
        "text"
      ],
      "additionalProperties": false,
      "properties": {
        "id": {
          "$ref": "#/definitions/id"
        },
        "type": {
          "const": "heading"
        },
        "color": {
          "$ref": "#/definitions/accent"
        },
        "level": {
          "type": "integer",
          "minimum": 2,
          "maximum": 4
        },
        "text": {
          "$ref": "#/definitions/inline"
        }
      }
    },
    "blockParagraph": {
      "type": "object",
      "required": [
        "type",
        "text"
      ],
      "additionalProperties": false,
      "properties": {
        "id": {
          "$ref": "#/definitions/id"
        },
        "type": {
          "const": "paragraph"
        },
        "color": {
          "$ref": "#/definitions/accent"
        },
        "text": {
          "$ref": "#/definitions/inline"
        }
      }
    },
    "blockList": {
      "type": "object",
      "required": [
        "type",
        "items"
      ],
      "additionalProperties": false,
      "properties": {
        "id": {
          "$ref": "#/definitions/id"
        },
        "type": {
          "const": "list"
        },
        "color": {
          "$ref": "#/definitions/accent"
        },
        "ordered": {
          "type": "boolean"
        },
        "items": {
          "type": "array",
          "maxItems": 500,
          "items": {
            "$ref": "#/definitions/inline"
          }
        }
      }
    },
    "blockCallout": {
      "type": "object",
      "required": [
        "type",
        "text"
      ],
      "additionalProperties": false,
      "properties": {
        "id": {
          "$ref": "#/definitions/id"
        },
        "type": {
          "const": "callout"
        },
        "color": {
          "$ref": "#/definitions/accent"
        },
        "variant": {
          "type": "string",
          "enum": [
            "info",
            "warning",
            "tip"
          ]
        },
        "title": {
          "type": "string",
          "maxLength": 200
        },
        "text": {
          "$ref": "#/definitions/inline"
        }
      }
    },
    "blockImage": {
      "type": "object",
      "required": [
        "type",
        "src"
      ],
      "additionalProperties": false,
      "properties": {
        "id": {
          "$ref": "#/definitions/id"
        },
        "type": {
          "const": "image"
        },
        "color": {
          "$ref": "#/definitions/accent"
        },
        "src": {
          "$ref": "#/definitions/slika"
        },
        "alt": {
          "type": "string",
          "maxLength": 500
        },
        "caption": {
          "$ref": "#/definitions/inline"
        },
        "width": {
          "type": "number",
          "minimum": 10,
          "maximum": 100
        }
      }
    },
    "blockVideo": {
      "type": "object",
      "required": [
        "type"
      ],
      "additionalProperties": false,
      "properties": {
        "id": {
          "$ref": "#/definitions/id"
        },
        "type": {
          "const": "video"
        },
        "color": {
          "$ref": "#/definitions/accent"
        },
        "videoId": {
          "type": "string",
          "maxLength": 500
        },
        "url": {
          "type": "string",
          "maxLength": 500
        }
      }
    },
    "blockTable": {
      "type": "object",
      "required": [
        "type",
        "rows"
      ],
      "additionalProperties": false,
      "properties": {
        "id": {
          "$ref": "#/definitions/id"
        },
        "type": {
          "const": "table"
        },
        "color": {
          "$ref": "#/definitions/accent"
        },
        "header": {
          "type": "array",
          "maxItems": 50,
          "items": {
            "$ref": "#/definitions/inline"
          }
        },
        "rows": {
          "type": "array",
          "maxItems": 200,
          "items": {
            "type": "array",
            "maxItems": 50,
            "items": {
              "$ref": "#/definitions/inline"
            }
          }
        }
      }
    },
    "blockFormula": {
      "type": "object",
      "required": [
        "type",
        "tex"
      ],
      "additionalProperties": false,
      "properties": {
        "id": {
          "$ref": "#/definitions/id"
        },
        "type": {
          "const": "formula"
        },
        "color": {
          "$ref": "#/definitions/accent"
        },
        "tex": {
          "type": "string",
          "maxLength": 5000
        },
        "display": {
          "type": "boolean"
        }
      }
    }
  }
}$ugc$::json $fn$;
-- <<< UGC SHEMA <<<

-- `service_role` je čita samo za živi drift-test; nitko drugi je ne zove izravno.
revoke execute on function public._ugc_shema() from public, anon, authenticated;
grant execute on function public._ugc_shema() to service_role;

-- Baca `sadrzaj_neispravan: <razlog>` (22023) ili ne radi ništa. Nije SECURITY DEFINER: zovu je
-- SECURITY DEFINER funkcije (kao vlasnik), a izravno je nitko ne smije zvati.
create or replace function public._provjeri_sadrzaj(p jsonb)
returns void
language plpgsql
stable
set search_path = public, extensions, pg_temp
as $$
declare v_greske text[]; v_dup text;
begin
  if p is null or jsonb_typeof(p) <> 'object' then
    raise exception 'sadrzaj_neispravan: sadržaj mora biti JSON objekt' using errcode = '22023';
  end if;
  -- Dubina PRIJE sheme: pg_jsonschema pri ~128 razina puca s „recursion limit exceeded" (HTTP 500,
  -- izmjereno 30.09. na dubini 3 000) — odbijeno, ali kao kvar, ne imenovano. Najdublji valjan
  -- oblik (tablica s formatiranim ćelijama) je ispod 16 razina; jsonpath 3 000 podnese.
  if jsonb_path_exists(p, 'lax $.**{16 to last}') then
    raise exception 'sadrzaj_neispravan: gniježđenje dublje od 15 razina' using errcode = '22023';
  end if;
  if not extensions.jsonb_matches_schema(public._ugc_shema(), p) then
    v_greske := extensions.jsonschema_validation_errors(public._ugc_shema(), p::json);
    raise exception 'sadrzaj_neispravan: %', left(coalesce(v_greske[1], 'ne odgovara profilu'), 300)
      using errcode = '22023';
  end if;
  -- Jedinstveni id-evi unutar svakog niza jedne lekcije (editor adresira stavke po id-u; JSON shema
  -- to ne zna izraziti po polju). Tek POSLIJE sheme: dubina i oblik su tada već ograničeni.
  select c.key || '.' || array_to_string(a.put, '.') into v_dup
    from jsonb_each(p) c
    cross join lateral (values (array['flashcards']), (array['quiz']), (array['fillBlanks']), (array['learn', 'blocks'])) a(put)
   where jsonb_typeof(c.value #> a.put) = 'array'
     and (select count(e ->> 'id') - count(distinct e ->> 'id') from jsonb_array_elements(c.value #> a.put) e) > 0
   limit 1;
  if v_dup is not null then
    raise exception 'sadrzaj_neispravan: dva ista id-a u %', v_dup using errcode = '22023';
  end if;
end;
$$;
revoke execute on function public._provjeri_sadrzaj(jsonb) from public, anon, authenticated;

-- ─── ②/0b: `publish_node` — objava ide KROZ ISTI validator + granica 1 MB ───────────────────────
-- Zamjenjuje definiciju iz `f1-nodes.sql` (§5). Prihvati (②/4) objavljuje ovim putem, a objava od
-- 5 MB je prolazila (N13). Stare provjere oblika („ne-prazan objekt objekata") pokriva shema — i
-- odbijale su valjan `schemaVersion` (cijeli broj na vrhu). Veličina ide prva: jeftinija je, a
-- 5 MB kroz pg_jsonschema troši sekunde.
create or replace function public.publish_node(p_node_id uuid, p_payload jsonb, p_base_version bigint)
returns bigint language plpgsql security definer set search_path = public, pg_temp as $$
declare n public.nodes; v_cur bigint; v_new bigint;
begin
    n := public._node_own(p_node_id);
    if n.kind <> 'study' then
        raise exception 'publish_not_study: gradivo se objavljuje samo na study-čvor';
    end if;
    if p_base_version is null then raise exception 'publish_bad_input: treba base_version'; end if;

    if p_payload is not null and octet_length(p_payload::text) > 1048576 then
        raise exception 'publish_prevelik: najviše 1 MB' using errcode = '54000';
    end if;
    perform public._provjeri_sadrzaj(p_payload);

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
revoke execute on function public.publish_node(uuid, jsonb, bigint) from public, anon;
grant execute on function public.publish_node(uuid, jsonb, bigint) to authenticated;
