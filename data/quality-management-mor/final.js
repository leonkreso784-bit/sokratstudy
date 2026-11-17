// Menadžment kvalitete (MOR, HR) — Final (završni ispit)
// Spaja M1 + M2 + examPractice. Kartice <=200, detalj u learn.
// MORA se učitati POSLIJE midterm-1/2. ⚠️ NE pokretati translate-subject.js!

const qualityMorFinalExamPractice = {
  "name": "Ispitna pitanja (sve teme)",
  "icon": "fa-graduation-cap",
  "color": "#6366f1",
  "flashcards": [
    {
      "question": "ISPITNO: Tko definira, a tko proizvodi kvalitetu?",
      "answer": "Kvalitetu definira vanjski kupac (potrošač), a proizvodi je unutarnji kupac — zaposlenik.",
      "explanation": "Unutarnji kupci = zaposlenici; mjere se anketom."
    },
    {
      "question": "ISPITNO: Što je značila kvaliteta početkom 20. stoljeća i kako se razvijala dalje?",
      "answer": "Inspekciju; zatim slijede kontrola kvalitete, osiguranje kvalitete i potpuno upravljanje kvalitetom (TQM).",
      "explanation": "Detekcija → prevencija → cijela organizacija."
    },
    {
      "question": "PONAVLJANJE: Juranova trilogija vs. implementacija TQM-a",
      "answer": "Juranova trilogija: planiranje, kontrola i poboljšanje kvalitete. Implementacija TQM-a: priprema, planiranje i provedba.",
      "explanation": "Česta zamjena na kolokviju — obje imaju tri dijela."
    },
    {
      "question": "ISPITNO: Ključne godine serije ISO 9000",
      "answer": "1987. izdanje (9000–9004); 1994. prva revizija; 2000. druga (ukinute 9002 i 9003); 2008. treća; 2015. četvrta; 2026. peta.",
      "explanation": "Uz to: Demingova nagrada 1951., MBNQA 1987., EFQM 1991."
    },
    {
      "question": "MEĐUTEMA: Kako se povezuju PDCA, ISO 9001 i Shewhart?",
      "answer": "PDCA (Shewhartov/Demingov krug) je koncepcijski temelj kontinuiranog poboljšanja i ključni element ISO 9001:2015 — zahtjevi 4–10 slažu se u Planiraj–Učini–Provjeri–Djeluj.",
      "explanation": "Provjeri = 9 Vrednovanje · Djeluj = 10 Poboljšanje."
    },
    {
      "question": "ISPITNO: Što je u kojem dokumentu sustava kvalitete?",
      "answer": "Priručnik: politika i područje primjene SUK-a. Procedure: što, kako, gdje, zašto, tko, kada. Radne upute: korak po korak. Zapisi: dokaz provedbe.",
      "explanation": "Piramida od općeg prema konkretnom."
    },
    {
      "question": "MEĐUTEMA: Kako su povezani rizik, preventivna i popravna radnja?",
      "answer": "Upravljanje rizicima djeluje PRIJE problema (preventivna radnja uklanja uzrok moguće nesukladnosti); popravna radnja djeluje NAKON (uklanja uzrok i sprječava ponavljanje).",
      "explanation": "Oboje traži odgovornu osobu i rok."
    },
    {
      "question": "ISPITNO: Podjele audita",
      "answer": "Prema odnosu auditora i organizacije: interni i eksterni (prva, druga, treća strana). Prema opsegu: proizvoda, procesa, sustava. Prema svrsi: usklađivanja i izvršavanja.",
      "explanation": "Treća strana = certifikacijska kuća → certifikat."
    },
    {
      "question": "MEĐUTEMA: Feigenbaum → troškovi kvalitete → Crosby",
      "answer": "Feigenbaum: četiri grupe troškova (prevencija, procjena, unutarnje i vanjske pogreške). Crosby: kvaliteta je besplatna — novca stoji nekvaliteta.",
      "explanation": "Ulaganje u prevenciju smanjuje troškove pogrešaka."
    },
    {
      "question": "ISPITNO: Koji alat za što?",
      "answer": "Pareto — 80/20, prioritet uzroka; histogram — distribucija podataka; dijagram raspršenja — korelacija dviju varijabli; Ishikawa — uzroci problema; kontrolna karta — proces kroz vrijeme.",
      "explanation": "Česta pitanja zatvorenog tipa."
    },
    {
      "question": "ISPITNO: Hotelijeri i njihove filozofije",
      "answer": "Statler — malo više i malo bolje usluge; Hilton — dobiti najviše za najmanje; Henderson — visoki etički standardi. Ritz-Carlton — prvi hotelski lanac s nagradom MBNQA (1992.).",
      "explanation": "Pitanja „čija je to filozofija?\"."
    },
    {
      "question": "PONAVLJANJE: Karakteristike proizvoda vs. usluge",
      "answer": "Proizvod — opipljive: trajnost i pouzdanost, funkcionalnost, dizajn, sigurnost. Usluga — neopipljivost, neodvojivost, heterogenost, prolaznost.",
      "explanation": "Neopipljive karakteristike usluge: brzina, ljubaznost, dostupnost, pouzdanost."
    },
    {
      "question": "MEĐUTEMA: SMART ciljevi u praksi",
      "answer": "Cilj kvalitete proizlazi iz politike kvalitete (zahtjev 6), mora biti SMART i imati aktivnosti, odgovornu osobu i rok; ostvarenje se provjerava (PDCA, zahtjev 9).",
      "explanation": "Politika → cilj → aktivnosti → provjera."
    }
  ],
  "quiz": [
    {
      "id": "fzl0ny",
      "question": "Tko DEFINIRA kvalitetu?",
      "options": [
        "vanjski kupac (potrošač)",
        "unutarnji kupac",
        "dobavljač",
        "auditor"
      ],
      "correct": 0
    },
    {
      "id": "brexv8",
      "question": "Treća faza razvoja kvalitete, usmjerena na prevenciju, je:",
      "options": [
        "inspekcija",
        "osiguranje kvalitete",
        "kontrola kvalitete",
        "TQM"
      ],
      "correct": 1
    },
    {
      "id": "jppxsk",
      "question": "Priprema, planiranje i provedba su:",
      "options": [
        "Juranova trilogija",
        "koraci ocjene rizika",
        "koraci implementacije TQM-a",
        "faze PDCA kruga"
      ],
      "correct": 2
    },
    {
      "id": "jivr8b",
      "question": "Norme ISO 9002 i ISO 9003 ukinute su:",
      "options": [
        "1994.",
        "2008.",
        "2015.",
        "2000."
      ],
      "correct": 3
    },
    {
      "id": "7nccg6",
      "question": "Zahtjev ISO 9001 koji odgovara koraku DJELUJ je:",
      "options": [
        "10 Poboljšanje",
        "9 Vrednovanje",
        "8 Radni proces",
        "6 Planiranje"
      ],
      "correct": 0
    },
    {
      "id": "u0hgsr",
      "question": "Područje primjene sustava upravljanja kvalitetom sadržano je u:",
      "options": [
        "radnoj uputi",
        "priručniku kvalitete",
        "zapisu",
        "obrascu"
      ],
      "correct": 1
    },
    {
      "id": "avo5sg",
      "question": "Radnja kojom se uklanja uzrok MOGUĆE nesukladnosti je:",
      "options": [
        "popravna",
        "inspekcija",
        "preventivna",
        "certifikacija"
      ],
      "correct": 2
    },
    {
      "id": "yvz7ou",
      "question": "Audit procesa je podjela audita prema:",
      "options": [
        "svrsi",
        "odnosu auditora i organizacije",
        "trajanju",
        "opsegu"
      ],
      "correct": 3
    },
    {
      "id": "v5m2ik",
      "question": "Reklamacija gosta nakon boravka je trošak:",
      "options": [
        "vanjske pogreške",
        "unutarnje pogreške",
        "prevencije",
        "procjene"
      ],
      "correct": 0
    },
    {
      "id": "qvp8lr",
      "question": "Drugi naziv / ključna veza dijagrama raspršenja je:",
      "options": [
        "distribucija",
        "korelacija",
        "riblja kost",
        "ABC analiza"
      ],
      "correct": 1
    },
    {
      "id": "rzrtve",
      "question": "Prvi hotelski lanac koji je dobio nagradu Malcolm Baldrige je:",
      "options": [
        "Hilton",
        "Sheraton",
        "Ritz-Carlton",
        "Marriott"
      ],
      "correct": 2
    },
    {
      "id": "hrifsi",
      "question": "Usluga se ne može uskladištiti — to je karakteristika:",
      "options": [
        "neopipljivosti",
        "heterogenosti",
        "funkcionalnosti",
        "prolaznosti"
      ],
      "correct": 3
    },
    {
      "id": "5e7z6d",
      "question": "Ciljevi kvalitete u ISO 9001 definiraju se u zahtjevu:",
      "options": [
        "6 Planiranje",
        "5 Vodstvo",
        "7 Podrška",
        "8 Radni proces"
      ],
      "correct": 0
    },
    {
      "id": "bkdfrn",
      "question": "Kano model razlikuje karakteristike:",
      "options": [
        "interne i eksterne",
        "izrečene i neizrečene",
        "osnovne i potporne",
        "ekonomske i okolišne"
      ],
      "correct": 1
    },
    {
      "id": "bbjtwi",
      "question": "Koja norma predstavlja skup smjernica za unapređivanje sustava kvalitete?",
      "options": [
        "ISO 9001",
        "ISO 14001",
        "ISO 9004",
        "ISO 19011"
      ],
      "correct": 2
    }
  ],
  "fillBlanks": [
    {
      "id": "qhrmu2",
      "sentence": "Paretov dijagram temelji se na načelu _______ /20.",
      "answer": "80",
      "hint": "većina problema"
    },
    {
      "id": "blbxoi",
      "sentence": "Prvu fazu procesa standardizacije čini _______ standarda.",
      "answer": "propisivanje",
      "hint": "pisanje pravila"
    },
    {
      "id": "6hes52",
      "sentence": "Demingova nagrada utemeljena je _______. godine.",
      "answer": "1951",
      "hint": "početak 50-ih"
    },
    {
      "id": "lwvlm5",
      "sentence": "Rizik se izračunava kao umnožak vjerojatnosti i _______.",
      "answer": "posljedice",
      "hint": "učinak"
    },
    {
      "id": "sqoa9f",
      "sentence": "Normu sa smjernicama za audit sustava upravljanja označava broj ISO _______.",
      "answer": "19011",
      "hint": "pet znamenki"
    },
    {
      "id": "kl0gc9",
      "sentence": "Krugove kvalitete uveo je _______.",
      "answer": "Ishikawa",
      "hint": "japanski utemeljitelj"
    }
  ],
  "learn": {
    "title": "Ispitna priprema — most kroz obje cjeline",
    "content": "\n<h3>Kako izgledaju provjere znanja</h3>\n<ul>\n<li><strong>Kolokvij</strong> (svaki 24 % ocjene): 12 pitanja — zatvorena (zaokruživanje, uparivanje) i otvorena; traje 20 minuta.</li>\n<li><strong>Završni ispit</strong> (30 %): 10 pitanja (5 zatvorenih, 5 otvorenih); traje 20 minuta; pristup uz najmanje 35 % ocjenskih bodova.</li>\n<li>Uz to: praktični zadatak 16 % (ciljevi kvalitete, PDCA, rizici) i prezentacija rada 6 %.</li>\n</ul>\n\n<h4>Okosnice za ponavljanje</h4>\n<div class=\"formula-box\">\n1) KUPAC definira kvalitetu (ISO 9000: stupanj ispunjenja zahtjeva) → ZAPOSLENIK (unutarnji kupac) je proizvodi<br>\n2) RAZVOJ: inspekcija → kontrola → osiguranje (prevencija) → TQM (cijela organizacija)<br>\n3) UTEMELJITELJI: Shewhart (PDCA, statistika) · Deming (14 točaka, Japan, nagrada 1951.) · Juran (trilogija) · Feigenbaum (TQC, troškovi) · Ishikawa (krugovi, riblja kost) · Crosby (nula pogrešaka)<br>\n4) SEDAM NAČELA ISO 9000 → ZAHTJEVI ISO 9001 (4–10) → PDCA<br>\n5) RIZIK = vjerojatnost × posljedica → identifikacija, analiza, vrednovanje → tretman<br>\n6) AUDIT: interni/eksterni · proizvoda/procesa/sustava · usklađivanja/izvršavanja\n</div>\n\n<h4>Najčešće zamke</h4>\n<ul>\n<li><strong>Juranova trilogija ≠ implementacija TQM-a ≠ 17 faza uspostave sustava</strong> — tri različita popisa.</li>\n<li><strong>ISO 9000 / 9001 / 9004</strong> — rječnik i načela / zahtjevi (certifikacija, audit) / smjernice za unapređivanje.</li>\n<li><strong>Preventivna vs. popravna radnja</strong> — prije vs. poslije nesukladnosti.</li>\n<li><strong>Troškovi nekvalitete</strong> = unutarnje + vanjske pogreške; prevencija i procjena su troškovi usklađenosti.</li>\n<li><strong>Histogram</strong> = distribucija; <strong>dijagram raspršenja</strong> = korelacija; <strong>Pareto</strong> = 80/20.</li>\n<li><strong>Interni kupci</strong> su zaposlenici; najčešća metoda za njih je <strong>anketa</strong>.</li>\n</ul>\n<p>Detaljna razrada svake teme nalazi se u sekcijama <em>Uči</em> pojedinih kategorija 1. i 2. kolokvija.</p>\n",
    "id": "sfh4qi"
  },
  "id": "s2maqz"
};

const qualityMorFinal = Object.assign(
    {},
    (typeof window !== 'undefined' && window.qualityMorM1) ? window.qualityMorM1 : {},
    (typeof window !== 'undefined' && window.qualityMorM2) ? window.qualityMorM2 : {},
    { examPractice: qualityMorFinalExamPractice }
  );

if (typeof window !== 'undefined') { window.qualityMorFinal = qualityMorFinal; }
