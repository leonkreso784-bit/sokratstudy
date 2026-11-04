// ===== SOKRAT STUDY — CATALOG (jedinstveni izvor istine za predmete) =====
//
// KORAK 1 (Faza 0, Blok A): ovaj fajl je ZASAD ADDITIVAN.
// Još se nigdje ne koristi — postojeća app logika (js/config.js) radi kao prije.
// U Koraku 2 ćemo js/config.js prepisati da subjectDataMap i getSubjectData()
// izvodi IZ ovog catalog-a, čime nestaju hardkodirani if-lanci.
//
// Hijerarhija (spremna za buduće širenje na cijelo sveučilište):
//   faculties → programs → (year, semester) → subjects → lessons → categories
//
// KONVENCIJA: `year` = studijska godina; `semester` = semestar UNUTAR te godine
// (1 = zimski, 2 = ljetni). Npr. 2. godina, ljetni semestar => year:2, semester:2.

const SOKRAT_CATALOG = {
  // ---- Ustanove / fakulteti / smjerovi -------------------------------------
  faculties: [
    {
      id: 'fmtu',
      name: 'FMTU – Fakultet za menadžment u turizmu i ugostiteljstvu, Opatija',
      // T2: KRATKO IME za mrvicu. Puno pravno ime (65 znakova) je točno, ali mrvica nije
      // mjesto za njega — na 393 px se lomilo u stupac i dizalo zaglavlje na 224 px.
      // ⚠️ Kratko ime samo po sebi NE POPRAVLJA ništa (T0 je izmjerio da naslov jedu
      // KONTROLE u istom retku, ne znakovi); ono je ovdje jer je i uz spojenu mrvicu
      // besmisleno ispisati cijeli pravni naziv na uskom ekranu. `name` OSTAJE pun —
      // kartica fakulteta i dalje pokazuje pravo ime.
      shortName: 'FMTU',
      programs: [
        { id: 'hospitality-management', name: 'Hospitality Management' },
        // HRVATSKI paralelni program (klon, Opcija A — vidi docs/archive/HRV_PLAN.md). Isti predmeti,
        // hrvatski sadržaj (data/<subj>-hr/*.js), vlastiti storageKey. Dostupan kroz Browse.
        { id: 'hospitality-management-hr', name: 'Menadžment u Hotelijerstvu' }
      ]
    }
  ],

  // ---- Predmeti -------------------------------------------------------------
  // `content` opisuje KAKO se učitava sadržaj (zamjena za getSubjectData()):
  //   scripts[]      — koje data-*.js datoteke treba učitati (redoslijedom)
  //   resolve{}      — lessonId -> ime globalne varijable s podacima
  //                    '*' = default za sve lekcije; ako lekcija nema mapiranje
  //                    i nema '*', sadržaj je prazan (npr. "coming soon").
  subjects: [
    // ---- 3. godina, 1. semestar (zimski) — FMTU Hospitality Management ----
    // Sadržaj: Sokrat MCP materijali (2026-11-04), samo Midterm 1; Midterm 2 i Final dolaze poslije.
    {
      id: 'public-finance',
      programId: 'hospitality-management',
      year: 3, semester: 1,
      name: 'Public Finance',
      shortName: 'PF',
      icon: 'fa-landmark',
      color: '#b45309',
      iconGradient: ['#b45309', '#f59e0b'],
      description: 'Public finance and ideology, public goods, externalities, social security, tax incidence and income distribution, taxation and efficiency (Rosen & Gayer)',
      storageKey: 'public-finance-progress',
      features: { blindMap: false },
      lessons: [
        { id: 'midterm-1', name: 'Midterm 1', description: 'T1–T6: public finance and ideology, public goods, externalities, social security, taxation and income distribution, taxation and efficiency' }
      ],
      content: {
        scripts: ['data/public-finance/midterm-1.js'],
        resolve: { 'midterm-1': 'publicFinanceM1' },
        dataFormat: 'json'
      }
    },
    {
      id: 'quality-management',
      programId: 'hospitality-management',
      year: 3, semester: 1,
      name: 'Quality Management',
      shortName: 'QM',
      icon: 'fa-award',
      color: '#0d9488',
      iconGradient: ['#0d9488', '#2dd4bf'],
      description: 'Quality theory, quality gurus, the seven TQM principles, PDCA, Kaizen and quality circles, standardization of QMS and ISO 9001:2015',
      storageKey: 'quality-management-progress',
      features: { blindMap: false },
      lessons: [
        { id: 'midterm-1', name: 'Midterm 1', description: 'Topics 1–6: quality theory, quality gurus, TQM principles I–II (PDCA), standardization of QMS, ISO 9001:2015' }
      ],
      content: {
        scripts: ['data/quality-management/midterm-1.js'],
        resolve: { 'midterm-1': 'qualityManagementM1' },
        dataFormat: 'json'
      }
    },
    {
      id: 'te2',
      programId: 'hospitality-management',
      year: 2, semester: 1,
      name: 'Tourism Economics',
      shortName: 'TE',
      icon: 'fa-plane',
      color: '#a21caf',
      iconGradient: ['#a21caf', '#e879f9'],
      description: 'Demand, supply & costs, market structure, pricing, expenditure, TSA, environment, sustainability',
      storageKey: 'te2-progress',
      features: { blindMap: false },
      lessons: [
        { id: 'first-midterm', name: 'First Midterm', description: 'Units 1–6: tourism key concepts & market, demand & forecasting, supply & costs, and market structure' },
        { id: 'second-midterm', name: 'Second Midterm', description: 'Units 7–12: strategic pricing, economic impacts & expenditure, economic contribution & TSA, environment, and sustainable development' },
        { id: 'final', name: 'Final Exam', description: 'All units 1–12 (both midterms) plus a cross-topic exam practice set' }
      ],
      content: {
        // data/te2/final.js MUST load last (Object.assign of te2M1 + te2M2 window objects + examPractice)
        scripts: ['data/te2/midterm-1.js', 'data/te2/midterm-2.js', 'data/te2/final.js'],
        resolve: { 'first-midterm': 'te2M1', 'second-midterm': 'te2M2', 'final': 'te2Final' },
        dataFormat: 'json' // F2 2A.4b (dual-read; study iz data/json/te2/*.json)
      }
    },
    {
      id: 'entrepreneurship',
      programId: 'hospitality-management',
      year: 2, semester: 1,
      name: 'Entrepreneurship and Innovation',
      shortName: 'Entrep',
      icon: 'fa-rocket',
      color: '#ea580c',
      iconGradient: ['#ea580c', '#fb923c'],
      description: 'Theories, Creativity, Innovation, Financing, Franchising, Planning, Social Entrepreneurship',
      storageKey: 'entrepreneurship-progress',
      features: { blindMap: false },
      lessons: [
        { id: 'first-midterm', name: 'First Midterm', description: 'Weeks 2–7: concepts & theories, the entrepreneur, creativity & business idea, innovation, financing, franchising, planning' },
        { id: 'second-midterm', name: 'Second Midterm', description: 'Weeks 9–13: failure & learning, economy, tourism entrepreneurship, social entrepreneurship, measuring value, contemporary issues, developing countries' },
        { id: 'final', name: 'Final Exam', description: 'All weeks 2–13 (both midterms) plus a cross-topic exam practice set' }
      ],
      content: {
        // data/entrepreneurship/final.js MUST load last (Object.assign of entrepreneurshipM1 + entrepreneurshipM2 window objects + examPractice)
        scripts: ['data/entrepreneurship/midterm-1.js', 'data/entrepreneurship/midterm-2.js', 'data/entrepreneurship/final.js'],
        resolve: { 'first-midterm': 'entrepreneurshipM1', 'second-midterm': 'entrepreneurshipM2', 'final': 'entrepreneurshipFinal' },
        dataFormat: 'json' // F2 2A.4b (dual-read; study iz data/json/entrepreneurship/*.json)
      }
    },
    {
      id: 'accounting',
      programId: 'hospitality-management',
      year: 2, semester: 1,
      name: 'Accounting Theory',
      shortName: 'Accounting',
      icon: 'fa-coins',
      color: '#059669',
      iconGradient: ['#059669', '#10b981'],
      description: 'Financial statements, bookkeeping, restaurant & hotel accounting, depreciation, analysis',
      storageKey: 'accounting-progress',
      features: { blindMap: false, exercises: true },
      lessons: [
        { id: 'first-midterm', name: 'Midterm 1', description: 'Chapters 1–6: Intro, Business Formation, Financial Statements, Balance Sheet, Income Statement, Bookkeeping' },
        { id: 'second-midterm', name: 'Midterm 2', description: 'Chapters 7–16: Accounting Cycle, Restaurant & Hotel Accounting, Depreciation, Analysis, Annual Reports, Budgeting, Cash Control' },
        { id: 'final', name: 'Final Exam', description: 'Comprehensive review — all chapters 1–16' }
      ],
      content: {
        // Category modules define their *Data globals FIRST; lesson assemblers
        // (midterm-1/2/final) reference those globals, so they load AFTER. final.js loads
        // LAST (it spreads M1+M2). exercises.js is independent (window.accountingExercises).
        scripts: [
          'data/accounting/cash-control.js',
          'data/accounting/budgeting.js',
          'data/accounting/sec-reports.js',
          'data/accounting/accounting-cycle.js',
          'data/accounting/hotel-statements.js',
          'data/accounting/financial-analysis.js',
          'data/accounting/final-practice.js',
          'data/accounting/midterm-1.js',
          'data/accounting/midterm-2.js',
          'data/accounting/final.js',
          'data/accounting/exercises.js'
        ],
        resolve: {
          'first-midterm': 'accountingM1',
          'second-midterm': 'accountingM2',
          'final': 'accountingFinal'
        },
        dataFormat: 'json', // F2 2A.4 (dovršetak → 18/18): study iz data/json/accounting/*.json (dual-read); vježbe UVIJEK iz .js (codeScripts, BUG-012)
        codeScripts: ['data/accounting/exercises.js'], // CODE (generate() funkcije) → uvijek iz datoteke, nikad iz baze (BUG-012)
        exercises: 'accountingExercises'   // window var s interaktivnim vježbama (features.exercises)
      }
    },
    {
      id: 'ebusiness',
      programId: 'hospitality-management',
      year: 2, semester: 1,
      name: 'E-Business',
      shortName: 'E-Biz',
      icon: 'fa-globe',
      color: '#f59e0b',
      iconGradient: ['#f59e0b', '#fbbf24'],
      description: 'E-Commerce, Distribution Chain, Digital Marketing, SEO, PMS, Security',
      storageKey: 'ebusiness-progress',
      features: { blindMap: false },
      lessons: [
        { id: 'first-midterm', name: 'First Midterm', description: 'Units 1–7: e-commerce context, distribution chain, internet platform, merchant/agent cash flows, computer graphics, platform economy' },
        { id: 'second-midterm', name: 'Second Midterm', description: 'Units 8–15: visual design, digital marketing, social media, Google Analytics, SEO/SEM, hotel PMS, security, challenges & trends' },
        { id: 'final', name: 'Final Exam', description: 'All units 1–15 (both midterms) plus a cross-topic exam practice set' }
      ],
      content: {
        // data/ebusiness/final.js MUST load last (Object.assign of ebusinessM1 + ebusinessM2 window objects + examPractice)
        scripts: ['data/ebusiness/midterm-1.js', 'data/ebusiness/midterm-2.js', 'data/ebusiness/final.js'],
        resolve: { 'first-midterm': 'ebusinessM1', 'second-midterm': 'ebusinessM2', 'final': 'ebusinessFinal' },
        dataFormat: 'json' // F2 2A.4b (dual-read; study iz data/json/ebusiness/*.json)
      }
    },
    {
      id: 'econ-hospitality',
      programId: 'hospitality-management',
      year: 2, semester: 2,
      name: 'Economics in Hospitality',
      shortName: 'EIH',
      icon: 'fa-hotel',
      color: '#0ea5e9',
      iconGradient: ['#0ea5e9', '#22d3ee'],
      description: 'Economic analysis of Croatian hospitality industry, seasonality, productivity, and policy responses',
      storageKey: 'econ-hospitality-progress',
      features: { blindMap: false },
      lessons: [
        { id: 'first-midterm', name: 'First Midterm', description: 'Units 1-5: hospitality basics, business economics, the hospitality business, assets of reproduction, and cost theory' },
        { id: 'second-midterm', name: 'Second Midterm', description: 'Units 6-10: business result, success & economic indicators (KPIs), price policy, sales, and investment profitability' },
        { id: 'final', name: 'Final Exam', description: 'All units 1-10 (both midterms) plus a cross-topic exam practice set' }
      ],
      content: {
        // data-econ-hospitality-final.js MUST load last (Object.assign of the two midterm window objects)
        scripts: ['data-econ-hospitality.js', 'data-econ-hospitality-m2.js', 'data-econ-hospitality-final.js'],
        resolve: { 'first-midterm': 'economicsHospitalityData', 'second-midterm': 'economicsHospitalityM2Data', 'final': 'economicsHospitalityFinalData' },
        dataFormat: 'json' // F2 2A.4b (dual-read; study iz data/json/econ-hospitality/*.json)
      }
    },
    {
      id: 'marketing',
      programId: 'hospitality-management',
      year: 2, semester: 2,
      name: 'Marketing',
      shortName: 'MKT',
      icon: 'fa-bullhorn',
      color: '#ec4899',
      iconGradient: ['#ec4899', '#f472b6'],
      description: 'Marketing concept, environment, market exchange, segmentation, consumer behaviour, market research, product, and price',
      storageKey: 'marketing-progress',
      features: { blindMap: false },
      lessons: [
        { id: 'first-midterm', name: 'First Midterm', description: 'Topics 1-8: concept, environment, market, segmentation, consumer behaviour, product, and price' },
        { id: 'second-midterm', name: 'Second Midterm', description: 'Topics 9-13: distribution, promotion, new trends in promotion, planning, organizing & controlling' },
        { id: 'final', name: 'Final Exam', description: 'All topics 1-13 (both midterms) plus a cross-topic exam practice set' }
      ],
      content: {
        // data-marketing-final.js MUST load last (Object.assign of marketingData + marketingM2Data)
        scripts: ['data-marketing.js', 'data-marketing-m2.js', 'data-marketing-final.js'],
        resolve: { 'first-midterm': 'marketingData', 'second-midterm': 'marketingM2Data', 'final': 'marketingFinalData' },
        dataFormat: 'json' // F2 2A.4b (dual-read; study iz data/json/marketing/*.json)
      }
    },
    {
      id: 'geography',
      programId: 'hospitality-management',
      year: 2, semester: 2,
      name: 'Tourism Geography',
      shortName: 'Geo',
      icon: 'fa-earth-europe',
      color: '#14b8a6',
      iconGradient: ['#14b8a6', '#2dd4bf'],
      description: 'Croatia tourist geography, blind map drills, protected areas, UNESCO and image-based city recognition',
      storageKey: 'geography-progress',
      features: { blindMap: true },               // posebna "Map" sekcija
      lessons: [
        { id: 'first-midterm', name: 'First Midterm', description: 'Introduction to Geography + Tourism Geography of Croatia (regions, parks, UNESCO) + blind map' },
        { id: 'second-midterm', name: 'Second Midterm', description: 'Tourism Geography of the World: Europe, Asia, Africa, Australia & Oceania, and the Americas' },
        { id: 'final', name: 'Final Exam', description: 'All topics — Croatia + the World (both midterms) plus a cross-topic exam practice set' }
      ],
      content: {
        // data-geography-final.js MUST load last (Object.assign of the two midterm window objects)
        scripts: ['data-geography.js', 'data-geography-m2.js', 'data-geography-final.js'],
        resolve: { 'first-midterm': 'geographyData', 'second-midterm': 'geographyM2Data', 'final': 'geographyFinalData' },
        dataFormat: 'json' // F2 2A.4b (dual-read; study iz data/json/geography/*.json)
      }
    },
    {
      id: 'food-nutrition',
      programId: 'hospitality-management',
      year: 2, semester: 2,
      name: 'Food & Nutrition',
      shortName: 'F&N',
      icon: 'fa-utensils',
      color: '#ef4444',
      iconGradient: ['#ef4444', '#f87171'],
      description: 'Food quality, nutrients, preservation, cereals, fruits & vegetables, coffee/tea/cocoa, wine, beer',
      storageKey: 'food-nutrition-progress',
      features: { blindMap: false },
      lessons: [
        { id: 'first-midterm', name: 'First Midterm', description: 'Topics 1–7: Food Quality, Components, Preservation, Cereals, Fruits & Vegetables, Coffee/Tea/Cocoa, and Wine' },
        { id: 'second-midterm', name: 'Second Midterm', description: 'Topics 8–14: Beer, Distilled spirits & liqueurs, Meat, Fish, Milk & dairy, Eggs, and Healthy diet' },
        { id: 'final', name: 'Final Exam', description: 'All topics 1–14 (both midterms) plus a cross-topic exam practice set' }
      ],
      content: {
        // data-food-nutrition-final.js MUST load last (Object.assign of the two midterm window objects)
        scripts: ['data-food-nutrition.js', 'data-food-nutrition-m2.js', 'data-food-nutrition-final.js'],
        resolve: { 'first-midterm': 'foodNutritionData', 'second-midterm': 'foodNutritionM2Data', 'final': 'foodNutritionFinalData' },
        dataFormat: 'json' // F2 2A.4b (dual-read; study iz data/json/food-nutrition/*.json)
      }
    },
    {
      id: 'business-informatics',
      programId: 'hospitality-management',
      year: 1, semester: 1,
      name: 'Business Informatics',
      shortName: 'BI',
      icon: 'fa-laptop-code',
      color: '#155e75',
      iconGradient: ['#155e75', '#22d3ee'],
      description: 'System approach, data & information, hardware, software, networks, WWW, e-business, security',
      storageKey: 'business-informatics-progress',
      features: { blindMap: false },
      lessons: [
        { id: 'midterm-1', name: 'Midterm 1', description: 'Chapters 1–6: system approach, data, hardware, software, networks, WWW' },
        { id: 'midterm-2', name: 'Midterm 2', description: 'Chapters 7–11: e-business, IT trends, management support, expert systems, security' },
        { id: 'final', name: 'Final Exam', description: 'All chapters 1–11 (both midterms combined)' }
      ],
      content: {
        scripts: [
          'data/business-informatics/midterm-1.js',
          'data/business-informatics/midterm-2.js',
          'data/business-informatics/final.js'
        ],
        resolve: {
          'midterm-1': 'businessInformaticsM1',
          'midterm-2': 'businessInformaticsM2',
          'final': 'businessInformaticsFinal'
        },
        dataFormat: 'json' // F2 2A.4b (dual-read; study iz data/json/business-informatics/*.json)
      }
    },
    {
      id: 'sit',
      programId: 'hospitality-management',
      year: 1, semester: 2,
      name: 'Special Interest Tourism',
      shortName: 'SIT',
      icon: 'fa-compass',
      color: '#14b8a6',
      iconGradient: ['#14b8a6', '#2dd4bf'],
      description: 'Tourism concepts & destination management, mass→SIT, and the special forms: business, cultural, industrial, nautical, sports, luxury, dark, health & film tourism',
      storageKey: 'sit-progress',
      features: { blindMap: false },
      lessons: [
        { id: 'first-midterm', name: 'First Midterm', description: 'Intro to tourism, destination management, mass/over-tourism → SIT, business, cultural & industrial tourism' },
        { id: 'second-midterm', name: 'Second Midterm', description: 'The special forms: nautical, sports, luxury, dark, health & film tourism' },
        { id: 'final', name: 'Final Exam', description: 'All topics (both midterms) plus a cross-topic exam practice set' }
      ],
      content: {
        // data/sit/final.js MUST load last (Object.assign of sitM1 + sitM2 window objects + examPractice)
        scripts: ['data/sit/midterm-1.js', 'data/sit/midterm-2.js', 'data/sit/final.js'],
        resolve: { 'first-midterm': 'sitM1', 'second-midterm': 'sitM2', 'final': 'sitFinal' },
        // F2 2A.3: prvi migrirani predmet — study se čita iz data/json/sit/*.json (dual-read),
        // s fallbackom na gornje `scripts` ako JSON padne. `scripts` OSTAJU izvor istine + mreža.
        dataFormat: 'json'
      }
    },
    {
      id: 'management',
      programId: 'hospitality-management',
      year: 1, semester: 2,
      name: 'Management',
      shortName: 'MGMT',
      icon: 'fa-user-tie',
      color: '#65a30d',
      iconGradient: ['#65a30d', '#a3e635'],
      description: 'Management fundamentals (Lussier): the four functions — planning, organizing, leading & controlling — plus decision making, strategy, teamwork, HRM, motivation, leadership & control systems',
      storageKey: 'management-progress',
      features: { blindMap: false },
      lessons: [
        { id: 'first-midterm', name: 'First Midterm', description: 'Management & history, decision making, strategic planning, organizing, teamwork & HRM' },
        { id: 'second-midterm', name: 'Second Midterm', description: 'Organizational behavior, motivation, leadership & control systems/finances' },
        { id: 'final', name: 'Final Exam', description: 'All topics (both midterms) plus a cross-topic exam practice set' }
      ],
      content: {
        // data/management/final.js MUST load last (Object.assign of managementM1 + managementM2 window objects + examPractice)
        scripts: ['data/management/midterm-1.js', 'data/management/midterm-2.js', 'data/management/final.js'],
        resolve: { 'first-midterm': 'managementM1', 'second-midterm': 'managementM2', 'final': 'managementFinal' },
        dataFormat: 'json' // F2 2A.4b (dual-read; study iz data/json/management/*.json)
      }
    },
    {
      id: 'traffic',
      programId: 'hospitality-management',
      year: 1, semester: 2,
      name: 'Traffic in Tourism',
      shortName: 'TRAFFIC',
      icon: 'fa-route',
      color: '#f59e0b',
      iconGradient: ['#f59e0b', '#fbbf24'],
      description: 'Transport in tourism: the theoretical basis of traffic & its interdependence with tourism, mobility & travel patterns, and every transport mode both as a connector and as a tourism product — road, rail (+ funicular/cable car), air and water — plus the value & quality of services, safety, ecological aspects and the future of transport (EU Sustainable & Smart Mobility Strategy).',
      storageKey: 'traffic-progress',
      features: { blindMap: false },
      // K1 (weeks 1–6) + K2 (weeks 7–15, 1st mid-term in week 7) + final (hybrid). Boundary AUTHORITATIVE from the syllabus (DINP).
      lessons: [
        { id: 'first-midterm', name: 'First Midterm', description: 'Theoretical basis of traffic, interdependence of traffic & tourism, mobility & travel patterns, road transport (connector + tourism product) and rail transport as a connector (weeks 1–6)' },
        { id: 'second-midterm', name: 'Second Midterm', description: 'Rail as a tourism product (+ funicular/cable car), air & water transport, the value & quality of services, safety, ecological aspects and the future of transport (weeks 7–15)' },
        { id: 'final', name: 'Final Exam', description: 'All topics (both midterms) plus a cross-topic exam practice set' }
      ],
      content: {
        // data/traffic/final.js MUST load last (Object.assign of trafficM1 + trafficM2 window objects + examPractice)
        scripts: ['data/traffic/midterm-1.js', 'data/traffic/midterm-2.js', 'data/traffic/final.js'],
        resolve: { 'first-midterm': 'trafficM1', 'second-midterm': 'trafficM2', 'final': 'trafficFinal' },
        dataFormat: 'json' // F2 2A.4b (dual-read; study iz data/json/traffic/*.json)
      }
    },
    {
      id: 'math',
      programId: 'hospitality-management',
      year: 1, semester: 1,
      name: 'Mathematics',
      shortName: 'MATH',
      icon: 'fa-square-root-variable',
      color: '#16a34a',
      iconGradient: ['#16a34a', '#4ade80'],
      description: 'Mathematics for economists: the field of real numbers, equations on ℝ, functions (incl. exponential, logarithmic & trigonometric), differentiation and the analysis of increase/decrease & extrema — with worked economic applications (cost, revenue, profit, marginal & average cost). A quantitative subject (KaTeX formulas + interactive exercises).',
      storageKey: 'math-progress',
      features: { blindMap: false, exercises: true },
      // K1 = topics 1–5 (real numbers → extrema), K2 = topics 6–11. Boundary AUTHORITATIVE from the syllabus.
      lessons: [
        { id: 'first-midterm', name: 'First Midterm', description: 'Field of real numbers, basic equations on ℝ, functions, differentiation, and increase/decrease & extrema (topics 1–5)' },
        { id: 'second-midterm', name: 'Second Midterm', description: 'The indefinite integral & elasticity of demand, financial mathematics (rents & loans) and the Gauss-Jordan method (topics 6–11)' },
        { id: 'final', name: 'Final Exam', description: 'All topics (both midterms) plus a cross-topic exam practice set' }
      ],
      content: {
        // final.js MUST load LAST (Object.assign of mathM1 + mathM2 window objects + examPractice).
        // math-lib.js (window.MathLib) must load BEFORE exercises.js (its generate() uses it).
        scripts: ['data/math/midterm-1.js', 'data/math/midterm-2.js', 'data/math/final.js', 'data/math/math-lib.js', 'data/math/exercises.js'],
        resolve: { 'first-midterm': 'mathM1', 'second-midterm': 'mathM2', 'final': 'mathFinal' },
        dataFormat: 'json', // F2 2A.4: study iz data/json/math/*.json (dual-read); vježbe UVIJEK iz .js (codeScripts)
        codeScripts: ['data/math/math-lib.js', 'data/math/exercises.js'], // CODE (generate() funkcije + lib) → uvijek iz datoteke, nikad iz baze (BUG-012)
        exercises: 'mathExercises'   // window var with interactive exercises (features.exercises)
      }
    },
    {
      id: 'microeconomics',
      programId: 'hospitality-management',
      year: 1, semester: 1,
      name: 'Microeconomics',
      shortName: 'MICRO',
      icon: 'fa-chart-line',
      color: '#0ea5e9',
      iconGradient: ['#0ea5e9', '#38bdf8'],
      description: 'Microeconomics (Pindyck & Rubinfeld 9e): supply & demand and elasticity, consumer behavior, production & costs, competitive markets, monopoly & oligopoly, game theory, factor markets and externalities — the first quantitative subject (KaTeX formulas & worked problems)',
      storageKey: 'microeconomics-progress',
      features: { blindMap: false },
      // K1 (Ch 1–7) + K2 (Ch 8,9,10,12,13,14,18) + final (hybrid). KaTeX (ADR-009).
      lessons: [
        { id: 'first-midterm', name: 'First Midterm', description: 'Preliminaries, supply & demand and elasticity, consumer behavior, individual & market demand, uncertainty, production & the cost of production (Ch 1–7)' },
        { id: 'second-midterm', name: 'Second Midterm', description: 'Profit maximization & competitive supply, competitive markets, monopoly & monopsony, monopolistic competition & oligopoly, game theory, factor inputs, externalities (Ch 8,9,10,12,13,14,18)' },
        { id: 'final', name: 'Final Exam', description: 'All topics (both midterms) plus a cross-topic exam practice set' }
      ],
      content: {
        // final.js MUST load LAST (Object.assign of microeconomicsM1 + microeconomicsM2 + examPractice).
        scripts: ['data/microeconomics/midterm-1.js', 'data/microeconomics/midterm-2.js', 'data/microeconomics/final.js'],
        resolve: { 'first-midterm': 'microeconomicsM1', 'second-midterm': 'microeconomicsM2', 'final': 'microeconomicsFinal' },
        dataFormat: 'json' // F2 2A.4b (dual-read; study iz data/json/microeconomics/*.json)
      }
    },
    {
      id: 'statistics',
      programId: 'hospitality-management',
      year: 1, semester: 1,
      name: 'Statistics',
      shortName: 'STAT',
      icon: 'fa-chart-simple',
      color: '#f43f5e',
      iconGradient: ['#f43f5e', '#fb7185'],
      description: 'Statistics for Business & Economics (Newbold): describing data (graphical & numerical), probability, discrete & continuous random variables, sampling distributions, confidence intervals, hypothesis testing and regression — a quantitative subject (KaTeX formulas & worked problems)',
      storageKey: 'statistics-progress',
      features: { blindMap: false, exercises: true },
      // K1 (T1–T6) + K2 (T7–T9) + final (hybrid). KaTeX (ADR-009).
      lessons: [
        { id: 'first-midterm', name: 'First Midterm', description: 'Describing data (graphical & numerical), probability methods, discrete & continuous random variables, sampling distributions (T1–T6)' },
        { id: 'second-midterm', name: 'Second Midterm', description: 'Confidence interval estimation, hypothesis testing (single population) and regression analysis (T7–T9)' },
        { id: 'final', name: 'Final Exam', description: 'All topics (both midterms) plus a cross-topic exam practice set' }
      ],
      content: {
        // final.js MUST load LAST (Object.assign of statisticsM1 + statisticsM2 + examPractice).
        // exercises.js is independent (window.statisticsExercises) — loads after final.js.
        // stat-lib.js (window.StatLib) must load BEFORE exercises.js (its solve() may use it).
        scripts: ['data/statistics/midterm-1.js', 'data/statistics/midterm-2.js', 'data/statistics/final.js', 'data/statistics/stat-lib.js', 'data/statistics/exercises.js'],
        resolve: { 'first-midterm': 'statisticsM1', 'second-midterm': 'statisticsM2', 'final': 'statisticsFinal' },
        dataFormat: 'json', // F2 2A.4: study iz data/json/statistics/*.json (dual-read); vježbe UVIJEK iz .js (codeScripts)
        codeScripts: ['data/statistics/stat-lib.js', 'data/statistics/exercises.js'], // CODE (generate() funkcije + lib) → uvijek iz datoteke, nikad iz baze (BUG-012)
        exercises: 'statisticsExercises'   // window var s interaktivnim vježbama (features.exercises)
      }
    },
    {
      id: 'academic-writing',
      programId: 'hospitality-management',
      year: 1, semester: 1,
      name: 'Academic Writing',
      shortName: 'AW',
      icon: 'fa-pen-nib',
      color: '#a855f7',
      iconGradient: ['#a855f7', '#c084fc'],
      description: 'The Essentials of Academic Writing: acquiring knowledge & scientific method, the literature review, means & methods of scientific research, thesis structure, bibliographic databases & search, types of publications, research ethics — and the Chicago Manual of Style for citing books, journals and other sources.',
      storageKey: 'academic-writing-progress',
      features: { blindMap: false, exercises: true },
      // K1 (weeks 1–6) + K2 (weeks 8–14, exam at week 7) + final (hybrid). First subject built via the content generator pipeline.
      // Interactive exercises (citation-focused) on the reusable engine — window.academicWritingExercises.
      lessons: [
        { id: 'first-midterm', name: 'First Midterm', description: 'Fundamentals of research, the literature review, methods of scientific research, thesis structure, bibliographic databases & search (weeks 1–6)' },
        { id: 'second-midterm', name: 'Second Midterm', description: 'Types of publications, Chicago Manual of Style (books, journals & other sources), research characteristics & qualities, ethics & Latin abbreviations (weeks 8–14)' },
        { id: 'final', name: 'Final Exam', description: 'All topics (both midterms)' }
      ],
      content: {
        // final.js MUST load LAST (Object.assign of academicWritingM1 + academicWritingM2).
        // exercises.js is independent (window.academicWritingExercises) — loads after final.js.
        scripts: ['data/academic-writing/midterm-1.js', 'data/academic-writing/midterm-2.js', 'data/academic-writing/final.js', 'data/academic-writing/exercises.js'],
        resolve: { 'first-midterm': 'academicWritingM1', 'second-midterm': 'academicWritingM2', 'final': 'academicWritingFinal' },
        dataFormat: 'json', // F2 2A.4b (dual-read; study iz data/json/academic-writing/*.json; vježbe uvijek iz .js)
        codeScripts: ['data/academic-writing/exercises.js'], // CODE-paket vježbi → uvijek iz datoteke, nikad iz baze (BUG-012; ovdje 0 randomiziranih, ali pravilo je jedinstveno)
        exercises: 'academicWritingExercises'   // window var s interaktivnim vježbama (features.exercises)
      }
    },
    {
      id: 'macroeconomics',
      programId: 'hospitality-management',
      year: 1, semester: 2,
      name: 'Macroeconomics',
      shortName: 'MACRO',
      icon: 'fa-chart-area',
      color: '#f59e0b',
      iconGradient: ['#f59e0b', '#fbbf24'],
      description: 'Macroeconomics (Blanchard-style): GDP and national accounts, the goods market & multiplier, financial markets, the IS-LM model, the labour market & natural rate, AS-AD, long-run growth, expectations and the open economy — a quantitative subject (KaTeX formulas & worked problems)',
      storageKey: 'macroeconomics-progress',
      features: { blindMap: false, exercises: true },
      // K1 (Intro + L2–L5) + K2 (Ch6 + AS-AD + Long Run + Expectations + Open Economy) + final (hybrid).
      // K1/K2 boundary AUTHORITATIVE from the official Test-1 / Test-2 preparation decks. KaTeX (ADR-009).
      lessons: [
        { id: 'first-midterm', name: 'First Midterm', description: 'Fundamentals & objectives, unemployment & inflation, GDP (nominal/real/growth), national accounts, the goods market & multiplier, financial markets & money, the IS-LM model (Intro + L2–L5)' },
        { id: 'second-midterm', name: 'Second Midterm', description: 'The labour market & natural rate, the medium run (AS-AD), long-run growth, expectations, and the open economy: trade, exchange rates & the balance of payments (Ch6 onward)' },
        { id: 'final', name: 'Final Exam', description: 'All topics (both midterms) plus a cross-topic exam practice set' }
      ],
      content: {
        // final.js MUST load LAST (Object.assign of macroeconomicsM1 + macroeconomicsM2 + examPractice).
        // exercises.js is independent (window.macroeconomicsExercises) — loads after final.js (features.exercises).
        scripts: ['data/macroeconomics/midterm-1.js', 'data/macroeconomics/midterm-2.js', 'data/macroeconomics/final.js', 'data/macroeconomics/exercises.js'],
        resolve: { 'first-midterm': 'macroeconomicsM1', 'second-midterm': 'macroeconomicsM2', 'final': 'macroeconomicsFinal' },
        dataFormat: 'json', // F2 2A.4: study iz data/json/macroeconomics/*.json (dual-read); vježbe UVIJEK iz .js (codeScripts)
        codeScripts: ['data/macroeconomics/exercises.js'], // CODE (generate() funkcije) → uvijek iz datoteke, nikad iz baze (BUG-012)
        exercises: 'macroeconomicsExercises'   // window var s interaktivnim vježbama (features.exercises)
      }
    },

    // ===== HRVATSKI program „Menadžment u Hotelijerstvu" (prijevodi; docs/archive/HRV_PLAN.md) =====
    // Klon EN predmeta: isti icon/color/year/semester, hrvatski sadržaj + vlastiti storageKey.
    // Window varovi = <camelId>Hr{M1,M2,Final}; data u data/<id>-hr/. PILOT: Business Informatics.
    {
      id: 'business-informatics-hr',
      programId: 'hospitality-management-hr',
      year: 1, semester: 1,
      name: 'Poslovna informatika',
      shortName: 'PI',
      icon: 'fa-laptop-code',
      color: '#155e75',
      iconGradient: ['#155e75', '#22d3ee'],
      description: 'Sustavski pristup, podaci i informacije, hardver, softver, mreže, WWW, e-poslovanje, sigurnost',
      storageKey: 'business-informatics-hr-progress',
      features: { blindMap: false },
      lessons: [
        { id: 'midterm-1', name: '1. kolokvij', description: 'Poglavlja 1–6: sustavski pristup, podaci, hardver, softver, mreže, WWW' },
        { id: 'midterm-2', name: '2. kolokvij', description: 'Poglavlja 7–11: e-poslovanje, IT trendovi, podrška menadžmentu, ekspertni sustavi, sigurnost' },
        { id: 'final', name: 'Završni ispit', description: 'Sva poglavlja 1–11 (oba kolokvija zajedno)' }
      ],
      content: {
        scripts: [
          'data/business-informatics-hr/midterm-1.js',
          'data/business-informatics-hr/midterm-2.js',
          'data/business-informatics-hr/final.js'
        ],
        resolve: {
          'midterm-1': 'businessInformaticsHrM1',
          'midterm-2': 'businessInformaticsHrM2',
          'final': 'businessInformaticsHrFinal'
        },
        dataFormat: 'json' // F2 2A.4b (dual-read; study iz data/json/business-informatics-hr/*.json)
      }
    },
    {
      id: 'statistics-hr',
      programId: 'hospitality-management-hr',
      year: 1, semester: 1,
      name: 'Statistika',
      shortName: 'STAT',
      icon: 'fa-chart-simple',
      color: '#f43f5e',
      iconGradient: ['#f43f5e', '#fb7185'],
      description: 'Opisna statistika: temeljni pojmovi, uređivanje i prikazivanje podataka, relativni brojevi, srednje vrijednosti, disperzija, asimetrija i zaobljenost, metoda uzorka, korelacija i regresija, vremenski nizovi (KaTeX formule i riješeni primjeri)',
      storageKey: 'statistics-hr-progress',
      features: { blindMap: false, exercises: true },
      // AUTORSKI iz HR materijala (predavanja/seminari FMTU 2025/26) — NE prijevod EN statistics. KaTeX (ADR-009).
      lessons: [
        { id: 'first-midterm', name: '1. kolokvij', description: 'Predavanja 1–6: temeljni pojmovi, uređivanje i prikazivanje podataka, relativni brojevi, srednje vrijednosti, mjere disperzije, asimetrija i zaobljenost' },
        { id: 'second-midterm', name: '2. kolokvij', description: 'Predavanja 7–9: metoda uzorka, korelacijska i regresijska analiza, osnovna analiza vremenskih nizova' },
        { id: 'final', name: 'Završni ispit', description: 'Sve teme (oba kolokvija) plus ispitna pitanja kroz sve teme' }
      ],
      content: {
        // final.js MORA se učitati ZADNJI (Object.assign statisticsHrM1 + statisticsHrM2 + examPractice).
        scripts: [
          'data/statistics-hr/midterm-1.js',
          'data/statistics-hr/midterm-2.js',
          'data/statistics-hr/final.js',
          'data/statistics-hr/exercises.js'
        ],
        resolve: {
          'first-midterm': 'statisticsHrM1',
          'second-midterm': 'statisticsHrM2',
          'final': 'statisticsHrFinal'
        },
        dataFormat: 'json', // dual-read; study iz data/json/statistics-hr/*.json; vježbe UVIJEK iz .js
        codeScripts: ['data/statistics-hr/exercises.js'], // KÔD (generate()) → uvijek iz datoteke, nikad iz baze (BUG-012)
        exercises: 'statisticsHrExercises'   // window var s interaktivnim vježbama (features.exercises)
      }
    },
    {
      id: 'microeconomics-hr',
      programId: 'hospitality-management-hr',
      year: 1, semester: 1,
      name: 'Mikroekonomija',
      shortName: 'MIKRO',
      icon: 'fa-chart-line',
      color: '#0ea5e9',
      iconGradient: ['#0ea5e9', '#38bdf8'],
      description: 'Pindyck i Rubinfeld: ponuda i potražnja, elastičnost, ponašanje potrošača, nesigurnost, proizvodnja i troškovi; konkurentna tržišta, monopol i monopson, određivanje cijena, oligopol, teorija igara, tržišta faktora, eksternalije i javna dobra (KaTeX formule i riješeni primjeri)',
      storageKey: 'microeconomics-hr-progress',
      features: { blindMap: false },
      // AUTORSKI iz HR materijala (upute kolegija + studentske skripte FMTU; Pindyck kao dopuna). KaTeX (ADR-009).
      lessons: [
        { id: 'first-midterm', name: '1. kolokvij', description: 'Poglavlja 1–7: uvodna razmatranja, ponuda i potražnja, elastičnost, ponašanje potrošača, pojedinačna i tržišna potražnja, izbor u uvjetima nesigurnosti, proizvodnja i trošak proizvodnje' },
        { id: 'second-midterm', name: '2. kolokvij', description: 'Poglavlja 8–14 i 18: maksimalizacija profita, konkurentna tržišta, monopol i monopson, određivanje cijena uz tržišnu moć, monopolistička konkurencija i oligopol, teorija igara, tržišta faktora, eksternalije i javna dobra' },
        { id: 'final', name: 'Završni ispit', description: 'Sve teme (oba kolokvija) plus ispitna pitanja kroz sve teme' }
      ],
      content: {
        // final.js MORA se učitati ZADNJI (Object.assign microeconomicsHrM1 + microeconomicsHrM2 + examPractice).
        scripts: [
          'data/microeconomics-hr/midterm-1.js',
          'data/microeconomics-hr/midterm-2.js',
          'data/microeconomics-hr/final.js'
        ],
        resolve: {
          'first-midterm': 'microeconomicsHrM1',
          'second-midterm': 'microeconomicsHrM2',
          'final': 'microeconomicsHrFinal'
        },
        dataFormat: 'json' // dual-read; study iz data/json/microeconomics-hr/*.json
      }
    },
    {
      id: 'academic-writing-hr',
      programId: 'hospitality-management-hr',
      year: 1, semester: 1,
      name: 'Osnove izrade pisanog djela',
      shortName: 'OIPD',
      icon: 'fa-pen-nib',
      color: '#a855f7',
      iconGradient: ['#a855f7', '#c084fc'],
      description: 'Logika i znanstvene metode (pojam, sud, zaključak, dokaz; opće i posebne metode); vrste pisanih djela, seminarski rad, dokumentacijska osnova i citat, bibliografija u Chicago stilu',
      storageKey: 'academic-writing-hr-progress',
      features: { blindMap: false },
      // AUTORSKI iz HR materijala (studentske skripte FMTU) — NE prijevod EN academic-writing.
      lessons: [
        { id: 'first-midterm', name: '1. kolokvij', description: 'Logika i metodologija: pojam, sud, zaključak i dokaz; obilježja znanstvene metode; opće metode (promatranje, eksperiment, modeliranje, statistička, komparativna, povijesna, analiza i sinteza, indukcija i dedukcija…)' },
        { id: 'second-midterm', name: '2. kolokvij', description: 'Pisano djelo: znanstvena, stručna i znanstveno-stručna djela, seminarski rad (stranice i dijelovi), dokumentacijska osnova i citat, bibliografske jedinice u Chicago stilu' },
        { id: 'final', name: 'Završni ispit', description: 'Sve teme (oba kolokvija) plus ispitna pitanja kroz sve teme' }
      ],
      content: {
        // final.js MORA se učitati ZADNJI (Object.assign academicWritingHrM1 + academicWritingHrM2 + examPractice).
        scripts: [
          'data/academic-writing-hr/midterm-1.js',
          'data/academic-writing-hr/midterm-2.js',
          'data/academic-writing-hr/final.js'
        ],
        resolve: {
          'first-midterm': 'academicWritingHrM1',
          'second-midterm': 'academicWritingHrM2',
          'final': 'academicWritingHrFinal'
        },
        dataFormat: 'json' // dual-read; study iz data/json/academic-writing-hr/*.json
      }
    },
    {
      id: 'math-hr',
      programId: 'hospitality-management-hr',
      year: 1, semester: 1,
      name: 'Matematika',
      shortName: 'MAT',
      icon: 'fa-square-root-variable',
      color: '#16a34a',
      iconGradient: ['#16a34a', '#4ade80'],
      description: 'Jednadžbe, funkcije i domena, derivacije, rast, pad i ekstremi, optimizacija troškova i dobiti, elastičnost potražnje; neodređeni integral, kamatni račun, rente, zajam i Gauss-Jordanova metoda (KaTeX formule i riješeni ispitni zadaci)',
      storageKey: 'math-hr-progress',
      features: { blindMap: false, exercises: true },
      // Temelj: EN math (isti FMTU kolegij) + usklađeno s HR demonstraturama i starim ispitima 2023/24. KaTeX (ADR-009).
      lessons: [
        { id: 'first-midterm', name: '1. kolokvij', description: 'Jednadžbe (linearne, kvadratne, svodive na kvadratne), funkcije i prirodna domena, derivacije, rast, pad i ekstremi, troškovi, prihod i dobit, elastičnost potražnje' },
        { id: 'second-midterm', name: '2. kolokvij', description: 'Neodređeni integral, jednostavni i složeni kamatni račun, rente, zajam (otplatna tablica) i Gauss-Jordanova metoda' },
        { id: 'final', name: 'Završni ispit', description: 'Sve teme (oba kolokvija) plus riješeni zadaci sa starih ispita' }
      ],
      content: {
        // final.js MORA se učitati prije vježbi (Object.assign mathHrM1 + mathHrM2 + examPractice).
        // math-lib.js (window.MathLib, ZAJEDNIČKI s EN math) mora se učitati PRIJE exercises.js.
        scripts: [
          'data/math-hr/midterm-1.js',
          'data/math-hr/midterm-2.js',
          'data/math-hr/final.js',
          'data/math/math-lib.js',
          'data/math-hr/exercises.js'
        ],
        resolve: {
          'first-midterm': 'mathHrM1',
          'second-midterm': 'mathHrM2',
          'final': 'mathHrFinal'
        },
        dataFormat: 'json', // dual-read; study iz data/json/math-hr/*.json; vježbe UVIJEK iz .js
        codeScripts: ['data/math/math-lib.js', 'data/math-hr/exercises.js'], // KÔD (generate() + lib) → uvijek iz datoteke, nikad iz baze (BUG-012)
        exercises: 'mathHrExercises'   // window var s interaktivnim vježbama (features.exercises)
      }
    },
    {
      id: 'macroeconomics-hr',
      programId: 'hospitality-management-hr',
      year: 1, semester: 2,
      name: 'Makroekonomija',
      shortName: 'MAKRO',
      icon: 'fa-chart-area',
      color: '#f59e0b',
      iconGradient: ['#f59e0b', '#fbbf24'],
      description: 'Temeljni pojmovi, BDP i nacionalno računovodstvo, AD–AS model, potrošnja, štednja i investicije, fiskalna i monetarna politika, IS-LM, otvoreno gospodarstvo i platna bilanca, tržište rada (KaTeX formule i riješeni zadaci s vježbi i priprema za kolokvij)',
      storageKey: 'macroeconomics-hr-progress',
      features: { blindMap: false, exercises: true },
      // AUTORSKI iz HR materijala (Merlin 2025/26: predavanja, vježbe, pripreme za kolokvije) — NE prijevod EN macroeconomics. KaTeX (ADR-009).
      lessons: [
        { id: 'first-midterm', name: '1. kolokvij', description: 'Predavanja 1–5: temeljni pojmovi makroekonomije, nacionalno računovodstvo, makroekonomski model i AD–AS, potrošnja, štednja i investicije, uvod u fiskalnu politiku' },
        { id: 'second-midterm', name: '2. kolokvij', description: 'Predavanja 6–11: fiskalna politika, monetarna makroekonomija, IS-LM, otvoreno gospodarstvo i platna bilanca, tržište rada, ekonomske krize, turizam u makroekonomiji' },
        { id: 'final', name: 'Završni ispit', description: 'Sve teme (oba kolokvija) plus ispitna pitanja iz priprema za kolokvije' }
      ],
      content: {
        // final.js MORA se učitati ZADNJI (Object.assign macroeconomicsHrM1 + macroeconomicsHrM2 + examPractice).
        scripts: [
          'data/macroeconomics-hr/midterm-1.js',
          'data/macroeconomics-hr/midterm-2.js',
          'data/macroeconomics-hr/final.js',
          'data/macroeconomics-hr/exercises.js'
        ],
        resolve: {
          'first-midterm': 'macroeconomicsHrM1',
          'second-midterm': 'macroeconomicsHrM2',
          'final': 'macroeconomicsHrFinal'
        },
        dataFormat: 'json', // dual-read; study iz data/json/macroeconomics-hr/*.json; vježbe UVIJEK iz .js
        codeScripts: ['data/macroeconomics-hr/exercises.js'], // KÔD (generate()) → uvijek iz datoteke, nikad iz baze (BUG-012)
        exercises: 'macroeconomicsHrExercises'   // window var s interaktivnim vježbama (features.exercises)
      }
    },
    {
      id: 'management-hr',
      programId: 'hospitality-management-hr',
      year: 1, semester: 2,
      name: 'Menadžment',
      shortName: 'MEN',
      icon: 'fa-user-tie',
      color: '#65a30d',
      iconGradient: ['#65a30d', '#a3e635'],
      description: 'Osnove menadžmenta (Lussier): četiri funkcije — planiranje, organiziranje, vođenje i kontroliranje — te odlučivanje, strategija, timski rad, upravljanje ljudskim resursima, motivacija, vođenje i sustavi kontrole',
      storageKey: 'management-hr-progress',
      features: { blindMap: false },
      lessons: [
        { id: 'first-midterm', name: '1. kolokvij', description: 'Menadžment i povijest, odlučivanje, strateško planiranje, organiziranje, timski rad i upravljanje ljudskim resursima' },
        { id: 'second-midterm', name: '2. kolokvij', description: 'Organizacijsko ponašanje, motivacija, vođenje te sustavi kontrole i financije' },
        { id: 'final', name: 'Završni ispit', description: 'Sve teme (oba kolokvija) plus ispitna pitanja kroz sve teme' }
      ],
      content: {
        scripts: [
          'data/management-hr/midterm-1.js',
          'data/management-hr/midterm-2.js',
          'data/management-hr/final.js'
        ],
        resolve: {
          'first-midterm': 'managementHrM1',
          'second-midterm': 'managementHrM2',
          'final': 'managementHrFinal'
        },
        dataFormat: 'json' // F2 2A.4b (dual-read; study iz data/json/management-hr/*.json)
      }
    },
    {
      id: 'sit-hr',
      programId: 'hospitality-management-hr',
      year: 1, semester: 2,
      name: 'Specifični oblici turizma',
      shortName: 'SOT',
      icon: 'fa-compass',
      color: '#14b8a6',
      iconGradient: ['#14b8a6', '#2dd4bf'],
      description: 'Pojam i razvoj turizma, vrste i oblici, faktori i funkcije, turističko tržište i destinacija (Butler); specifični oblici: zdravstveni, kulturni, sportski, ekoturizam, nautički i poslovni (MICE)',
      storageKey: 'sit-hr-progress',
      features: { blindMap: false },
      lessons: [
        { id: 'first-midterm', name: '1. kolokvij', description: 'Pojam i razvoj turizma, vrste i oblici, faktori nastanka, funkcije, turističko tržište i turistička destinacija' },
        { id: 'second-midterm', name: '2. kolokvij', description: 'Specifični (selektivni) oblici: zdravstveni, kulturni, sportski, ekoturizam, nautički i poslovni turizam' },
        { id: 'final', name: 'Završni ispit', description: 'Sve teme (oba kolokvija) plus ponavljanje kroz sve teme' }
      ],
      content: {
        scripts: [
          'data/sit-hr/midterm-1.js',
          'data/sit-hr/midterm-2.js',
          'data/sit-hr/final.js'
        ],
        resolve: {
          'first-midterm': 'sitHrM1',
          'second-midterm': 'sitHrM2',
          'final': 'sitHrFinal'
        },
        dataFormat: 'json' // F2 2A.4b (dual-read; study iz data/json/sit-hr/*.json)
      }
    },
    {
      id: 'traffic-hr',
      programId: 'hospitality-management-hr',
      year: 1, semester: 2,
      name: 'Promet u turizmu',
      shortName: 'PUT',
      icon: 'fa-route',
      color: '#f59e0b',
      iconGradient: ['#f59e0b', '#fbbf24'],
      description: 'Promet u turizmu: teorijske osnove prometa i njegova međuovisnost s turizmom, mobilnost i putovanja te svaki prometni oblik kao konektor i kao dio turističkog proizvoda — cestovni, željeznički (+ uspinjača/žičara), zračni i vodeni — uz vrijednost i kvalitetu usluge, sigurnost, ekološke aspekte i budućnost prometa (EU strategija održive i pametne mobilnosti)',
      storageKey: 'traffic-hr-progress',
      features: { blindMap: false },
      lessons: [
        { id: 'first-midterm', name: '1. kolokvij', description: 'Teorijske osnove prometa, međuovisnost prometa i turizma, mobilnost i putovanja, cestovni promet (konektor i turistički proizvod) te željeznički promet kao konektor (tjedni 1–6)' },
        { id: 'second-midterm', name: '2. kolokvij', description: 'Željeznica kao turistički proizvod (+ uspinjača/žičara), zračni i vodeni promet, vrijednost i kvaliteta usluge, sigurnost, ekološki aspekti i budućnost prometa (tjedni 7–15)' },
        { id: 'final', name: 'Završni ispit', description: 'Sve teme (oba kolokvija) plus ispitna pitanja kroz sve teme' }
      ],
      content: {
        // data/traffic-hr/final.js MORA se učitati zadnji (Object.assign trafficHrM1 + trafficHrM2 + examPractice)
        scripts: [
          'data/traffic-hr/midterm-1.js',
          'data/traffic-hr/midterm-2.js',
          'data/traffic-hr/final.js'
        ],
        resolve: {
          'first-midterm': 'trafficHrM1',
          'second-midterm': 'trafficHrM2',
          'final': 'trafficHrFinal'
        },
        dataFormat: 'json' // F2 2A.4b (dual-read; study iz data/json/traffic-hr/*.json)
      }
    },
    {
      id: 'te2-hr',
      programId: 'hospitality-management-hr',
      year: 2, semester: 1,
      name: 'Ekonomika turizma',
      shortName: 'EKT',
      icon: 'fa-plane',
      color: '#a21caf',
      iconGradient: ['#a21caf', '#e879f9'],
      description: 'Ekonomika turizma (FMTU): pojam turista i turizma, turistička potreba i vrste turizma, turističko tržište, ponuda i potražnja, turistički resursi i posrednici te turizam u nacionalnom gospodarstvu; potom ekonomske i društvene funkcije turizma, slobodno vrijeme i dokolica, turistička potrošnja, ekonomski učinci i Turistička satelitska bilanca (TSA)',
      storageKey: 'te2-hr-progress',
      features: { blindMap: false },
      lessons: [
        { id: 'first-midterm', name: '1. kolokvij', description: 'Pojam turista i turizma, turistička potreba i vrste turizma, turističko tržište i ponuda, turistički resursi, turistička potražnja, turistički posrednici te turizam u nacionalnom gospodarstvu' },
        { id: 'second-midterm', name: '2. kolokvij', description: 'Ekonomske funkcije turizma, slobodno vrijeme i dokolica, društvene (humanističke) funkcije, turistička potrošnja, ekonomski učinci turizma te Turistička satelitska bilanca (TSA)' },
        { id: 'final', name: 'Završni ispit', description: 'Sve teme (oba kolokvija) plus ispitna pitanja kroz sve teme' }
      ],
      content: {
        // data/te2-hr/final.js MORA se učitati zadnji (Object.assign te2HrM1 + te2HrM2 + examPractice)
        scripts: [
          'data/te2-hr/midterm-1.js',
          'data/te2-hr/midterm-2.js',
          'data/te2-hr/final.js'
        ],
        resolve: {
          'first-midterm': 'te2HrM1',
          'second-midterm': 'te2HrM2',
          'final': 'te2HrFinal'
        },
        dataFormat: 'json' // F2 2A.4b (dual-read; study iz data/json/te2-hr/*.json)
      }
    },
    {
      id: 'entrepreneurship-hr',
      programId: 'hospitality-management-hr',
      year: 2, semester: 1,
      name: 'Poduzetnički menadžment i inovacije',
      shortName: 'PMI',
      icon: 'fa-rocket',
      color: '#ea580c',
      iconGradient: ['#ea580c', '#fb923c'],
      description: 'Poduzetnički menadžment i inovacije (FMTU): teorije i teoretičari poduzetništva, poduzetnik i oblici poduzetništva, poduzetnički menadžment u turizmu i ugostiteljstvu, funkcije poduzetništva, vrste i oblici te pravni oblici; potom poslovno planiranje i poslovni plan, izvori financiranja, strateško poduzetništvo i inovacije, financijski pokazatelji te poduzetništvo u EU i održivi razvoj',
      storageKey: 'entrepreneurship-hr-progress',
      features: { blindMap: false },
      lessons: [
        { id: 'first-midterm', name: '1. kolokvij', description: 'Teorije i teoretičari poduzetništva, poduzetnik i oblici poduzetništva, poduzetnički menadžment u turizmu i ugostiteljstvu, funkcije poduzetništva, vrste i oblici te pravni oblici i poduzetnička ideja' },
        { id: 'second-midterm', name: '2. kolokvij', description: 'Poslovno planiranje i poslovni plan, izvori financiranja poduzetništva, strateško poduzetništvo i inovacije, financijski pokazatelji poslovanja te poduzetništvo u EU i održivi razvoj' },
        { id: 'final', name: 'Završni ispit', description: 'Sve teme (oba kolokvija) plus ispitna pitanja kroz sve teme' }
      ],
      content: {
        // data/entrepreneurship-hr/final.js MORA se učitati zadnji (Object.assign entrepreneurshipHrM1 + entrepreneurshipHrM2 + examPractice)
        scripts: [
          'data/entrepreneurship-hr/midterm-1.js',
          'data/entrepreneurship-hr/midterm-2.js',
          'data/entrepreneurship-hr/final.js'
        ],
        resolve: {
          'first-midterm': 'entrepreneurshipHrM1',
          'second-midterm': 'entrepreneurshipHrM2',
          'final': 'entrepreneurshipHrFinal'
        },
        dataFormat: 'json' // F2 2A.4b (dual-read; study iz data/json/entrepreneurship-hr/*.json)
      }
    },
    {
      id: 'ebusiness-hr',
      programId: 'hospitality-management-hr',
      year: 2, semester: 1,
      name: 'E-poslovanje',
      shortName: 'EPOS',
      icon: 'fa-globe',
      color: '#f59e0b',
      iconGradient: ['#f59e0b', '#fbbf24'],
      description: 'E-poslovanje / ICT (FMTU): pojam i temelji e-poslovanja, modeli (B2B, B2C, C2G) i elektronička infrastruktura, Internet, web i servisi, razvoj weba (1.0–4.0), ICT u hotelijerstvu i distribucija u turizmu; potom kvaliteta web sitea i SEO, Google alati i analitika, online oglašavanje i društveni mediji, računalna grafika te sigurnost i platform ekonomija',
      storageKey: 'ebusiness-hr-progress',
      features: { blindMap: false },
      lessons: [
        { id: 'first-midterm', name: '1. kolokvij', description: 'Pojam i temelji e-poslovanja, modeli i područja primjene, Internet, web i servisi, razvoj weba (Web 1.0–4.0), ICT u hotelijerstvu te distribucija u turizmu' },
        { id: 'second-midterm', name: '2. kolokvij', description: 'Kvaliteta web sitea i SEO, Google alati i analitika, online oglašavanje i društveni mediji, računalna grafika i dizajn, sigurnost u e-poslovanju te poslovni modeli i platform ekonomija' },
        { id: 'final', name: 'Završni ispit', description: 'Sve teme (oba kolokvija) plus ispitna pitanja kroz sve teme' }
      ],
      content: {
        // data/ebusiness-hr/final.js MORA se učitati zadnji (Object.assign ebusinessHrM1 + ebusinessHrM2 + examPractice)
        scripts: [
          'data/ebusiness-hr/midterm-1.js',
          'data/ebusiness-hr/midterm-2.js',
          'data/ebusiness-hr/final.js'
        ],
        resolve: {
          'first-midterm': 'ebusinessHrM1',
          'second-midterm': 'ebusinessHrM2',
          'final': 'ebusinessHrFinal'
        },
        dataFormat: 'json' // F2 2A.4b (dual-read; study iz data/json/ebusiness-hr/*.json)
      }
    },
    {
      id: 'food-nutrition-hr',
      programId: 'hospitality-management-hr',
      year: 2, semester: 2,
      name: 'Hrana i prehrana',
      shortName: 'HIP',
      icon: 'fa-utensils',
      color: '#ef4444',
      iconGradient: ['#ef4444', '#f87171'],
      description: 'Hrana i prehrana: kvaliteta i sastojci hrane, konzerviranje, žitarice i kruh, voće i povrće, kava, čaj i kakao, vino, pivo, jaka alkoholna pića, meso, riba, mlijeko i sir, jaja, sigurnost hrane i zdrava prehrana',
      storageKey: 'food-nutrition-hr-progress',
      features: { blindMap: false },
      // AUTORSKI iz HR studentskih skripti i ispitnih pitanja (Drive) — NE prijevod EN food-nutrition.
      lessons: [
        { id: 'first-midterm', name: '1. kolokvij', description: 'Kvaliteta i sigurnost hrane, hranjive tvari (bjelančevine, ugljikohidrati, masti, vitamini, minerali), kvarenje i konzerviranje, žitarice i pekarski proizvodi, voće i povrće, kava, čaj, kakao i začini te vino' },
        { id: 'second-midterm', name: '2. kolokvij', description: 'Pivo, jaka alkoholna pića i likeri, meso i mesni proizvodi, riba, mlijeko i sir, jaja, sigurnost hrane i HACCP te uravnotežena prehrana' },
        { id: 'final', name: 'Završni ispit', description: 'Sve teme (oba kolokvija) plus ispitna pitanja kroz sve teme' }
      ],
      content: {
        // data/food-nutrition-hr/final.js MORA se učitati zadnji (Object.assign foodNutritionHrM1 + foodNutritionHrM2 + examPractice)
        scripts: [
          'data/food-nutrition-hr/midterm-1.js',
          'data/food-nutrition-hr/midterm-2.js',
          'data/food-nutrition-hr/final.js'
        ],
        resolve: {
          'first-midterm': 'foodNutritionHrM1',
          'second-midterm': 'foodNutritionHrM2',
          'final': 'foodNutritionHrFinal'
        },
        dataFormat: 'json' // dual-read; study iz data/json/food-nutrition-hr/*.json
      }
    },
    {
      id: 'geography-hr',
      programId: 'hospitality-management-hr',
      year: 2, semester: 2,
      name: 'Turistička geografija',
      shortName: 'GEO',
      icon: 'fa-earth-europe',
      color: '#14b8a6',
      iconGradient: ['#14b8a6', '#2dd4bf'],
      description: 'Turistička geografija: turistički resursi i čimbenici ponude i potražnje, promet i okoliš, Hrvatska (položaj, prirodni resursi, nacionalni parkovi, parkovi prirode, UNESCO, turističke regije) te turistička geografija svijeta po kontinentima, uz slijepu kartu Hrvatske',
      storageKey: 'geography-hr-progress',
      features: { blindMap: true },               // slijepa karta Hrvatske (js/blind-map.js; imena mjesta su već hrvatska)
      // AUTORSKI iz HR studentske skripte i ispitnih pitanja (Drive) — NE prijevod EN geography.
      lessons: [
        { id: 'first-midterm', name: '1. kolokvij', description: 'Uvod u turističku geografiju (pojmovi, čimbenici ponude i potražnje, prirodni i antropogeni resursi, promet, okoliš) i Hrvatska: položaj, reljef, klima i vode, nacionalni parkovi, parkovi prirode i UNESCO baština, Istra, Kvarner, Dalmacija, Planinska i Panonska Hrvatska' },
        { id: 'second-midterm', name: '2. kolokvij', description: 'Turistička geografija svijeta: UNWTO regije i rang-liste, južna Europa (Španjolska, Italija, Grčka), zapadna, sjeverna, srednja i istočna Europa, Azija i Bliski istok, Afrika, Australija i Oceanija, Amerika te svjetska svetišta, muzeji i gradovi' },
        { id: 'final', name: 'Završni ispit', description: 'Sve teme (oba kolokvija) plus ispitna pitanja kroz sve teme' }
      ],
      content: {
        // data/geography-hr/final.js MORA se učitati zadnji (Object.assign geographyHrM1 + geographyHrM2 + examPractice)
        scripts: [
          'data/geography-hr/midterm-1.js',
          'data/geography-hr/midterm-2.js',
          'data/geography-hr/final.js'
        ],
        resolve: {
          'first-midterm': 'geographyHrM1',
          'second-midterm': 'geographyHrM2',
          'final': 'geographyHrFinal'
        },
        dataFormat: 'json' // dual-read; study iz data/json/geography-hr/*.json
      }
    },
    {
      id: 'econ-hospitality-hr',
      programId: 'hospitality-management-hr',
      year: 2, semester: 2,
      name: 'Ekonomika ugostiteljstva',
      shortName: 'EUP',
      icon: 'fa-hotel',
      color: '#0ea5e9',
      iconGradient: ['#0ea5e9', '#22d3ee'],
      description: 'Ekonomika ugostiteljskih poduzeća: obilježja ugostiteljstva, poduzeće i udruživanje, sredstva i amortizacija, troškovi i točka pokrića, poslovni rezultat, mjerila uspješnosti, cijene i kalkulacije, prodaja i investicije (KaTeX formule i riješeni primjeri)',
      storageKey: 'econ-hospitality-hr-progress',
      features: { blindMap: false },
      // AUTORSKI iz HR studentskih skripti i ispitnih pitanja (Drive) — NE prijevod EN econ-hospitality. KaTeX (ADR-009).
      lessons: [
        { id: 'first-midterm', name: '1. kolokvij', description: 'Temeljna obilježja ugostiteljstva, ekonomika poduzeća kao znanost, ugostiteljsko poduzeće i udruživanje, načela, poslovna politika, planiranje i kontrola, sredstva poduzeća (obrtaj, likvidnost, solventnost), amortizacija, teorija troškova te planiranje troškova i točka pokrića' },
        { id: 'second-midterm', name: '2. kolokvij', description: 'Poslovni rezultat i financijski izvještaji, vrijednost poduzeća i izvori financiranja, proizvodnost, ekonomičnost i rentabilnost, politika cijena, kalkulacije, principi prodaje, ekonomika investicija te konkurentnost i kvaliteta' },
        { id: 'final', name: 'Završni ispit', description: 'Sve teme (oba kolokvija) plus ispitna pitanja kroz sve teme' }
      ],
      content: {
        // data/econ-hospitality-hr/final.js MORA se učitati zadnji (Object.assign econHospitalityHrM1 + econHospitalityHrM2 + examPractice)
        scripts: [
          'data/econ-hospitality-hr/midterm-1.js',
          'data/econ-hospitality-hr/midterm-2.js',
          'data/econ-hospitality-hr/final.js'
        ],
        resolve: {
          'first-midterm': 'econHospitalityHrM1',
          'second-midterm': 'econHospitalityHrM2',
          'final': 'econHospitalityHrFinal'
        },
        dataFormat: 'json' // dual-read; study iz data/json/econ-hospitality-hr/*.json
      }
    },
    {
      id: 'marketing-hr',
      programId: 'hospitality-management-hr',
      year: 2, semester: 2,
      name: 'Marketing',
      shortName: 'MKT',
      icon: 'fa-bullhorn',
      color: '#ec4899',
      iconGradient: ['#ec4899', '#f472b6'],
      description: 'Marketing: pojam i razvoj marketinške koncepcije, marketinško okruženje (PESTLE), tržište i razmjena vrijednosti, segmentacija i pozicioniranje (STP), ponašanje potrošača i istraživanje tržišta, marketinški splet (proizvod, cijena, distribucija, promocija), novi digitalni trendovi u promociji te planiranje, organiziranje i kontrola marketinških aktivnosti',
      storageKey: 'marketing-hr-progress',
      features: { blindMap: false },
      // PRIJEVOD EN `marketing` (HR izvora nema — Leon, anketa 29.09.); struktura i `correct` identični EN-u.
      lessons: [
        { id: 'first-midterm', name: '1. kolokvij', description: 'Pojam marketinga, marketinško okruženje, tržište i razmjena vrijednosti, segmentacija i pozicioniranje, ponašanje potrošača i istraživanje tržišta, proizvod, cijena (teme 1–8)' },
        { id: 'second-midterm', name: '2. kolokvij', description: 'Distribucija, promocija (integrirana marketinška komunikacija), novi trendovi u promociji, planiranje te organiziranje i kontrola marketinga (teme 9–13)' },
        { id: 'final', name: 'Završni ispit', description: 'Sve teme (oba kolokvija) plus ispitna pitanja kroz sve teme' }
      ],
      content: {
        // data/marketing-hr/final.js MORA se učitati zadnji (Object.assign marketingHrM1 + marketingHrM2 + examPractice)
        scripts: [
          'data/marketing-hr/midterm-1.js',
          'data/marketing-hr/midterm-2.js',
          'data/marketing-hr/final.js'
        ],
        resolve: {
          'first-midterm': 'marketingHrM1',
          'second-midterm': 'marketingHrM2',
          'final': 'marketingHrFinal'
        },
        dataFormat: 'json' // dual-read; study iz data/json/marketing-hr/*.json
      }
    },
    {
      id: 'accounting-hr',
      programId: 'hospitality-management-hr',
      year: 2, semester: 1,
      name: 'Računovodstvo',
      shortName: 'RAČ',
      icon: 'fa-coins',
      color: '#059669',
      iconGradient: ['#059669', '#10b981'],
      description: 'Računovodstvo: pojam i struktura računovodstva, zakon i standardi, isprave i poslovne knjige, bilanca, imovina, obveze i kapital, konta i knjiženja, bilančne promjene, kontni plan, troškovi, prihodi i rashodi, PDV, račun dobiti i gubitka i novčani tok, amortizacija, zalihe, kalkulacije, kapital i plaće te zaključivanje knjiga',
      storageKey: 'accounting-hr-progress',
      features: { blindMap: false, exercises: true },
      // AUTORSKI iz HR studentskih skripti i ispitnih pitanja (Drive) — NE prijevod EN accounting. KaTeX (ADR-009).
      lessons: [
        { id: 'first-midterm', name: '1. kolokvij', description: 'Pojam i struktura računovodstva, Zakon o računovodstvu, standardi i načela, isprave i poslovne knjige, bilanca, imovina, obveze i kapital, konta i pravila knjiženja, bilančne promjene i kontni plan' },
        { id: 'second-midterm', name: '2. kolokvij', description: 'Troškovi, rashodi, prihodi i učinci, konta uspjeha i knjiženja s kontnim planom, vrste troškova, PDV, račun dobiti i gubitka i novčani tok, dugotrajna imovina i amortizacija, zalihe i sitni inventar, kalkulacije, kapital, obveze i plaće te popis i zaključivanje knjiga' },
        { id: 'final', name: 'Završni ispit', description: 'Sve teme (oba kolokvija) plus ispitna pitanja kroz sve teme' }
      ],
      content: {
        // data/accounting-hr/final.js MORA se učitati zadnji (Object.assign accountingHrM1 + accountingHrM2 + examPractice)
        scripts: [
          'data/accounting-hr/midterm-1.js',
          'data/accounting-hr/midterm-2.js',
          'data/accounting-hr/final.js',
          'data/accounting-hr/exercises.js'
        ],
        resolve: {
          'first-midterm': 'accountingHrM1',
          'second-midterm': 'accountingHrM2',
          'final': 'accountingHrFinal'
        },
        dataFormat: 'json', // dual-read; study iz data/json/accounting-hr/*.json; vježbe UVIJEK iz .js
        codeScripts: ['data/accounting-hr/exercises.js'], // KÔD (generate()) → uvijek iz datoteke, nikad iz baze (BUG-012)
        exercises: 'accountingHrExercises'   // window var s interaktivnim vježbama (features.exercises)
      }
    }
  ]
};

// ---- Mali helperi (koristit će ih Korak 2) ---------------------------------
const SokratCatalog = {
  all() { return SOKRAT_CATALOG.subjects; },
  getSubject(id) { return SOKRAT_CATALOG.subjects.find(s => s.id === id) || null; },
  getProgram(id) {
    for (const f of SOKRAT_CATALOG.faculties) {
      const p = (f.programs || []).find(p => p.id === id);
      if (p) return { ...p, facultyId: f.id, facultyName: f.name };
    }
    return null;
  },
  // Vrati ime globalne varijable koja drži podatke za (subject, lesson)
  resolveDataVar(subjectId, lessonId) {
    const s = this.getSubject(subjectId);
    if (!s || !s.content) return null;
    const r = s.content.resolve || {};
    return r[lessonId] || r['*'] || null;
  },

  // ---- Drill-down hijerarhija (sve izvedeno iz catalog-a) -------------------
  // Fakulteti → Smjerovi → Godine → Predmeti. Dodavanjem novog fakulteta/smjera/
  // godine/predmeta u SOKRAT_CATALOG, navigacija ih AUTOMATSKI prikaže (bez UI izmjena).

  // Svi fakulteti.
  faculties() { return SOKRAT_CATALOG.faculties || []; },

  // Smjerovi (programs) jednog fakulteta.
  programsOf(facultyId) {
    const f = (SOKRAT_CATALOG.faculties || []).find(x => x.id === facultyId);
    return f ? (f.programs || []) : [];
  },

  // ---- Placement dual-mode (U2.5, ADR-022 / docs/architecture/CATALOG_ARCHITECTURE.md) ----
  // Predmet smjesta se u hijerarhiju na JEDAN od dva načina:
  //   legacy:    programId + year + semester (svi postojeći predmeti — netaknuti)
  //   placement: placement: [{ faculty, program, year, semester }, ...] — dijeljeni
  //              "vezni" predmet prikazan na više koordinata, sadržaj postoji JEDNOM.
  // Placement-predmeti MORAJU nositi prefiks fakulteta u id-u (gate u verify-catalog.js).

  // Normalizirane placement-koordinate predmeta (za legacy se deriviraju iz polja).
  placementsOf(s) {
    if (!s) return [];
    if (Array.isArray(s.placement) && s.placement.length) return s.placement;
    if (s.programId == null) return [];
    const p = this.getProgram(s.programId);
    return [{ faculty: p ? p.facultyId : null, program: s.programId, year: s.year, semester: s.semester }];
  },

  // Je li predmet postavljen u zadani smjer (bilo kojom koordinatom)?
  isInProgram(s, programId) {
    return this.placementsOf(s).some(pl => pl.program === programId);
  },

  // Distinct studijske godine za zadani smjer (sortirano uzlazno).
  yearsOf(programId) {
    const ys = new Set();
    for (const s of SOKRAT_CATALOG.subjects) {
      for (const pl of this.placementsOf(s)) {
        if (pl.program === programId && pl.year != null) ys.add(pl.year);
      }
    }
    return [...ys].sort((a, b) => a - b);
  },

  // Predmeti za (smjer[, godina]). Ako je `year` izostavljen, vraća sve predmete smjera.
  // Legacy predmet se vraća KAKAV JEST (isto ponašanje kao prije U2.5); placement-predmet
  // se vraća kao plitka kopija dekorirana koordinatama pogođenog placementa (year/semester
  // za prikaz kartica) — content/storageKey/lessons ostaju reference na original.
  subjectsOf(programId, year) {
    const out = [];
    for (const s of SOKRAT_CATALOG.subjects) {
      const pl = this.placementsOf(s).find(pl =>
        pl.program === programId && (year == null || pl.year === year));
      if (!pl) continue;
      out.push(Array.isArray(s.placement)
        ? { ...s, programId: pl.program, year: pl.year, semester: pl.semester }
        : s);
    }
    return out;
  },

  // Distinct semestri za (smjer, godina), sortirano.
  semestersOf(programId, year) {
    const set = new Set();
    for (const s of this.subjectsOf(programId, year)) {
      if (s.semester != null) set.add(s.semester);
    }
    return [...set].sort((a, b) => a - b);
  },

  // Je li lekcija "coming soon"? Data-driven: nema mapiranja u content.resolve
  // (ni eksplicitnog ni '*') ⇒ nema sadržaja ⇒ coming soon.
  isLessonComingSoon(subjectId, lessonId) {
    return this.resolveDataVar(subjectId, lessonId) == null;
  }
};

// Globalno dostupno (konzistentno s ostalim data-*.js datotekama)
if (typeof window !== 'undefined') {
  window.SOKRAT_CATALOG = SOKRAT_CATALOG;
  window.SokratCatalog = SokratCatalog;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SOKRAT_CATALOG, SokratCatalog };
}
