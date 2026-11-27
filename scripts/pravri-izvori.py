#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
izvori.py — što nam FALI od gradiva, po predmetu i po godini (PFRI).

ZAŠTO: popis „imamo/ne imamo" prepisan u prozu ostari isti dan, a od njega ovisi
redoslijed gradnje. Ovo ga IZVODI iz tri izvora koji se ne prepisuju rukom:
  1. `_materials/pravri/sluzbeno/IPK_2026_pravo.txt` — službeni izvedbeni plan kolegija
     2026./2027.: semestar, status (obvezni/izborni) i PROPISANA literatura po kolegiju;
  2. `_materials/pravri/drive-manifest.json` — što stvarno stoji u dijeljenoj mapi na Driveu;
  3. `data/catalog.js` — što je već u Sokratu (dakle gotovo).
Pokreni:  npm run pravri:izvori   (ili: python3 scripts/pravri-izvori.py [--sve])
          (bez --sve: samo 21 predmet iz plana ADR-042; sa --sve: svi obvezni kolegiji)

Mjerač ispisuje koliko je kolegija, mapa i datoteka dotaknuo — brana koja to ne kaže
zna vratiti uvjerljivu nulu.
SKRIPTA JE U REPOU, PODACI NISU: `IPK_2026_pravo.txt` i `drive-manifest.json` stoje u
`_materials/` (gitignored) jer nose imena nositelja kolegija i vlasnika gradiva — upravo ono
što `check:names` brani. Nema li ih na stroju, skripta to KAŽE i staje, ne izmišlja.
Povod da skripta ide u repo: istu je ulogu imao `_materials/pravri/qa.js` i izgubljen je
zajedno sa strojem na kojem je nastao (27.11.2026.).
"""
import json, re, sys, unicodedata, pathlib, subprocess

KORIJEN = pathlib.Path(__file__).resolve().parents[1]
IPK = KORIJEN / '_materials/pravri/sluzbeno/IPK_2026_pravo.txt'
MANIFEST = KORIJEN / '_materials/pravri/drive-manifest.json'
KATALOG = KORIJEN / 'data/catalog.js'
SVE = '--sve' in sys.argv

# 21 predmet plana (ADR-042). Popis je vraćen iz gita (commiti 0f56bfa2 + 169a0ceb).
PLAN = {
    'Teorija prava i države': 'theory-law-state-pfri', 'Povijest prava i države': 'legal-history-pfri',
    'Sociologija': 'sociology-pfri', 'Rimsko privatno pravo': 'roman-law-pfri',
    'Ustavno pravo': 'constitutional-law-pfri', 'Politička ekonomija': 'political-economy-pfri',
    'Kazneno pravo': 'criminal-law-pfri', 'Obiteljsko pravo': 'family-law-pfri',
    'Međunarodno pravo': 'international-law-pfri',
    'Opći dio građanskog prava i obvezno pravo': 'civil-obligations-pfri',
    'Kazneno postupovno pravo': 'criminal-procedure-pfri', 'Europsko pravo I': 'eu-law-1-pfri',
    'Europsko pravo II': 'eu-law-2-pfri', 'Stvarno i nasljedno pravo': 'property-succession-pfri',
    'Upravna znanost': 'administrative-science-pfri', 'Upravno pravo': 'administrative-law-pfri',
    'Trgovačko pravo': 'commercial-law-pfri',
    'Pomorsko i općeprometno pravo': 'maritime-transport-law-pfri',
    'Pravo društava': 'company-law-pfri', 'Radno i socijalno pravo': 'labour-social-law-pfri',
    'Pravo tržišnog natjecanja': 'competition-law-pfri',
}
RIM = {'I':1,'II':2,'III':3,'IV':4,'V':5,'VI':6,'VII':7,'VIII':8,'IX':9,'X':10}
SKRIPTA = re.compile(r'skripta|skripte|opci dio|opći dio|posebni dio|udzbenik|udžbenik|kompendij|gradivo', re.I)
ISPIT   = re.compile(r'pitanj|kolokvij|ispit|zavr[sš]n|me[dđ]uispit|kartic|predrok|odgovor|zadaci|provjera|lista tema', re.I)

def bezdij(s):
    s = unicodedata.normalize('NFD', s)
    return ''.join(c for c in s if not unicodedata.combining(c)).lower()

if not IPK.exists() or not MANIFEST.exists():
    print('\n⏭️  PRESKOČENO — podaci nisu na ovom stroju (gitignored):')
    for p in (IPK, MANIFEST):
        print(f"   {'✓' if p.exists() else '✗'} {p.relative_to(KORIJEN)}")
    print('   IPK se skida s pravri.uniri.hr, manifest se popisuje iz dijeljene mape na Driveu.')
    sys.exit(0)

# ── 1. IPK: kolegij → semestar, status, propisana literatura ──
t = IPK.read_text(encoding='utf-8')
t = re.sub(r'\n-- \d+ of \d+ --\n', '\n', t).replace('IZVEDBENI PLAN KOLEGIJA', '')
t = re.sub(r'ak\. god\. \d{4}\./\d{4}\.', '', t)
kolegiji = {}
for blok in re.split(r'Naziv kolegija\s*\t?', t)[1:]:
    ime = blok.split('\n')[0].strip()
    if not ime or ime in kolegiji:
        continue
    sem = re.search(r'Semestar studija\s*\t?\s*([IVX]+)\.', blok)
    status = re.search(r'Status kolegija\s*\t?\s*(\w+)', blok)
    lit = re.search(r'(Obvez\w*\s*(?:ispitna\s*)?literatura|Obvezna i prepor\w*\s*literatura)(.*?)'
                    r'(Izborna|Dopunska|Ostale važne obavijesti|Sustav ocjenjivanja|$)', blok, re.S)
    knjige = []
    if lit:
        sirovo = re.sub(r'\s+', ' ', lit.group(2))
        for dio in re.split(r'(?:•|\d+\.\s|•)', sirovo):
            dio = dio.strip(' ,;')
            if len(dio) > 25:
                knjige.append(dio[:150])
    kolegiji[ime] = {
        'sem': RIM.get(sem.group(1), 0) if sem else 0,
        'status': (status.group(1).lower() if status else '?'),
        'literatura': knjige,
    }

# ── 2. Drive manifest ──
man = json.loads(MANIFEST.read_text(encoding='utf-8'))
drive = {}
for god, mape in man['godine'].items():
    for naziv, dat in mape.items():
        drive[bezdij(naziv)] = [(d.split('|')[0], int(d.split('|')[1])) for d in dat]

# ── 3. Katalog: što je već u Sokratu ──
kat = KATALOG.read_text(encoding='utf-8')
u_sokratu = set(re.findall(r"id: '([a-z0-9-]+-pfri)'", kat))

# ── 4. Lokalno na disku (jedino što se STVARNO može graditi bez dodatnog skidanja) ──
lokalno = {}
baza = KORIJEN / '_materials/pravri'
for p in baza.rglob('*'):
    if p.is_file() and p.suffix in ('.txt', '.pdf', '.doc', '.docx'):
        lokalno.setdefault(p.parent.name, []).append((p.name, p.stat().st_size // 1024))

redovi = []
dotaknuto_mapa = set()
for ime, info in sorted(kolegiji.items(), key=lambda x: (x[1]['sem'], x[0])):
    sid = PLAN.get(ime)
    if not SVE and not sid:
        continue
    if SVE and info['status'] != 'obvezni':
        continue
    dat = drive.get(bezdij(ime), [])
    if dat:
        dotaknuto_mapa.add(bezdij(ime))
    skripte = [d for d in dat if SKRIPTA.search(d[0])]
    ispitni = [d for d in dat if ISPIT.search(d[0]) and d not in skripte]
    god = (info['sem'] + 1) // 2 if info['sem'] else 0
    if sid and sid in u_sokratu:
        sud = 'GOTOVO (u Sokratu)'
    elif not dat:
        sud = 'NEMA NIŠTA na Driveu'
    elif skripte:
        sud = 'ima skriptu'
    else:
        sud = 'SAMO ispitni materijali'
    redovi.append({'god': god, 'sem': info['sem'], 'ime': ime, 'sid': sid or '—', 'sud': sud,
                   'skripte': skripte, 'ispitni': ispitni, 'lit': info['literatura'],
                   'lokalno': lokalno.get((sid or '').replace('-pfri', '').replace('civil-obligations', 'civil-obligations'), [])})

print(f"\n=== IZVORI PFRI — što imamo, što fali ({'svi obvezni kolegiji' if SVE else '21 predmet plana'}) ===")
print(f"  dotaknuto: {len(kolegiji)} kolegija iz IPK-a · {len(drive)} mapa na Driveu "
      f"({sum(len(v) for v in drive.values())} datoteka) · {len(u_sokratu)} predmeta već u Sokratu\n")
zbroj = {}
for r in redovi:
    zbroj[r['sud']] = zbroj.get(r['sud'], 0) + 1
    print(f"{r['god']}/{r['sem']}  {r['ime']}")
    print(f"      stanje  : {r['sud']}" + (f"  ({r['sid']})" if r['sid'] != '—' else ''))
    if r['lit']:
        print(f"      propisano ({len(r['lit'])}): " + ' | '.join(k[:70] for k in r['lit'][:3]))
    if r['skripte']:
        print(f"      skripte : " + ', '.join(f'{n} ({k} KB)' for n, k in r['skripte'][:4]))
    if r['ispitni']:
        print(f"      ispitno : {len(r['ispitni'])} datoteka")
    if not r['skripte'] and not r['ispitni'] and r['sud'] != 'GOTOVO (u Sokratu)':
        print(f"      ⚠ FALI SVE — ni skripte ni ispitnih materijala")
    print()
print('--- zbroj ---')
for k, v in sorted(zbroj.items(), key=lambda x: -x[1]):
    print(f'  {v:2}  {k}')
nepopisano = set(drive) - dotaknuto_mapa
if nepopisano:
    print(f'\n  (mape na Driveu bez kolegija u ovom popisu: {len(nepopisano)})')
