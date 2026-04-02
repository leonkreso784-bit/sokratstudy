// ===== GEOGRAPHY (TOURISM GEOGRAPHY) - FIRST MIDTERM =====
// Built from: geography midterm lecture PDFs and exam instructions.

const geographyData = {
    examFramework: {
        name: "Exam Framework and Blind Map Rules",
        icon: "fa-clipboard-check",
        color: "#22c55e",

        flashcards: [
            {
                question: "How is the first midterm structured?",
                answer: "10 questions total: 5 closed-type + 5 open-type short answers.",
                explanation: "The test focuses on Tourism Geography of Croatia and core geography basics."
            },
            {
                question: "How many points does the blind map carry?",
                answer: "10 points total.",
                explanation: "Each correctly located toponym on the map is worth 1 point."
            },
            {
                question: "Which categories are used on the blind map?",
                answer: "2 county centres, 2 bigger islands, 1 national park, 1 nature park, 4 top tourist destinations.",
                explanation: "These categories are explicitly listed in the 1st midterm instructions."
            },
            {
                question: "What is the total exam duration for 1st midterm + blind map?",
                answer: "20 minutes total (15 + 5).",
                explanation: "Timing discipline matters because map part is short and fast-paced."
            },
            {
                question: "What should students not ignore while studying slides?",
                answer: "Photos, graphics, and statistics.",
                explanation: "Instructions explicitly mention image-based and visual recognition tasks."
            }
        ],

        quiz: [
            {
                question: "The blind map contains how many total toponyms to place?",
                options: ["8", "10", "12", "15"],
                correct: 1
            },
            {
                question: "How many top tourist destinations are included in map tasks?",
                options: ["2", "3", "4", "5"],
                correct: 2
            },
            {
                question: "The first midterm test consists of:",
                options: ["Only multiple choice", "Only open questions", "5 closed + 5 open", "3 closed + 7 open"],
                correct: 2
            },
            {
                question: "A toponym written without locating it on the map is:",
                options: ["Half correct", "Correct if spelling is right", "Not considered correct", "Accepted only for islands"],
                correct: 2
            },
            {
                question: "Recommended external map source in the instructions is:",
                options: ["Google Earth", "OpenStreetMap", "HAK map", "Eurostat map"],
                correct: 2
            }
        ],

        fillBlanks: [
            {
                sentence: "The first midterm includes 5 closed and 5 _______ questions.",
                answer: "open",
                hint: "Short written form..."
            },
            {
                sentence: "Blind map has _______ total points.",
                answer: "10",
                hint: "One point per term..."
            },
            {
                sentence: "Map categories include 2 county centres, 2 islands, 1 NP, 1 PP, and 4 tourist _______.",
                answer: "destinations",
                hint: "Top 10 list source..."
            },
            {
                sentence: "First test and map are done in _______ minutes total.",
                answer: "20",
                hint: "15 + 5"
            }
        ],

        learn: {
            title: "How to Prepare for the 1st Midterm (Exact Format)",
            image: "assets/geography/map-counties.jpg",
            content: `
                <h3>Official Structure</h3>
                <ul>
                    <li><strong>Written test:</strong> 10 questions (5 closed + 5 open)</li>
                    <li><strong>Blind map:</strong> 10 terms to locate in Croatia</li>
                    <li><strong>Total duration:</strong> 20 minutes (15 + 5)</li>
                </ul>

                <h3>Blind Map Categories</h3>
                <div class="formula-box">
                    <p>2 county centres + 2 bigger islands + 1 national park + 1 nature park + 4 top destinations</p>
                </div>

                <h3>Mandatory Map Focus</h3>
                <p>Use both maps in Learn mode: county-centre orientation and protected-areas orientation.</p>
                <img src="assets/geography/map-protected-areas.jpg" alt="Croatia protected areas map" class="learn-image">

                <h3>Practical Rule</h3>
                <p>Toponym must be connected to the right location (dot/circle/marker). Name without location is not accepted.</p>

                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> High-Score Strategy</h4>
                    <p>Train map placement with county map and protected-area map, then drill Top 10 destinations as a separate set.</p>
                </div>
            `
        }
    },

    blindMapDrill: {
        name: "Blind Map Drill (Croatia)",
        icon: "fa-map-marked-alt",
        color: "#38bdf8",

        flashcards: [
            {
                question: "Give 2 valid county centres that often appear in map drills.",
                answer: "Examples: Šibenik, Sisak, Rijeka, Zadar, Dubrovnik.",
                explanation: "Instructions mention county-centre category explicitly."
            },
            {
                question: "Give 2 bigger islands from common exam sets.",
                answer: "Examples: Rab, Lastovo, Hvar, Brač, Korčula.",
                explanation: "Use larger inhabited islands with clear map position."
            },
            {
                question: "How many national parks are in Croatia?",
                answer: "8 national parks.",
                explanation: "Important for category awareness and elimination in map tasks."
            },
            {
                question: "How many nature parks are in Croatia?",
                answer: "12 nature parks.",
                explanation: "The instruction map visualizes these locations."
            },
            {
                question: "Top 10 destinations for map category include which examples?",
                answer: "Dubrovnik, Rovinj, Poreč, Split, Umag, Zagreb, Medulin, Zadar, Funtana, Pula.",
                explanation: "These are listed in the 2024 table from instructions."
            }
        ],

        quiz: [
            {
                question: "Which pair are BOTH bigger Croatian islands?",
                options: ["Rab and Lastovo", "Sisak and Rab", "Krka and Brač", "Rijeka and Hvar"],
                correct: 0
            },
            {
                question: "Which is a national park (not a nature park)?",
                options: ["Biokovo", "Učka", "Kornati", "Papuk"],
                correct: 2
            },
            {
                question: "Which is a nature park (not a national park)?",
                options: ["Plitvička jezera", "Krka", "Medvednica", "Mljet"],
                correct: 2
            },
            {
                question: "Which city is in the Top 10 destinations table?",
                options: ["Karlovac", "Varaždin", "Rovinj", "Krapina"],
                correct: 2
            },
            {
                question: "Blind map county-centre category requires:",
                options: ["1 city", "2 cities", "3 cities", "4 cities"],
                correct: 1
            },
            {
                question: "Which destination from this set is coastal and in Top 10 2024 list?",
                options: ["Sisak", "Poreč", "Bjelovar", "Čakovec"],
                correct: 1
            },
            {
                question: "Which is the #1 destination by tourist nights in Croatia (2024)?",
                options: ["Zagreb", "Split", "Dubrovnik", "Rovinj"],
                correct: 2
            },
            {
                question: "Which Istrian town is in Croatia's Top 10 destinations 2024?",
                options: ["Pazin", "Motovun", "Umag", "Labin"],
                correct: 2
            },
            {
                question: "Medulin is located in which region?",
                options: ["Dalmatia", "Kvarner", "Istria", "Slavonia"],
                correct: 2
            },
            {
                question: "Funtana is closest to which other Top 10 destination?",
                options: ["Dubrovnik", "Poreč", "Split", "Zadar"],
                correct: 1
            },
            {
                question: "Which island is in the Kvarner gulf?",
                options: ["Hvar", "Brač", "Krk", "Korčula"],
                correct: 2
            },
            {
                question: "Which nature park is located near Zagreb?",
                options: ["Papuk", "Medvednica", "Kopački rit", "Biokovo"],
                correct: 1
            },
            {
                question: "Papuk is both a nature park and a:",
                options: ["National park", "UNESCO Geopark", "Strict reserve", "Marine reserve"],
                correct: 1
            }
        ],

        fillBlanks: [
            {
                sentence: "Croatia has _______ national parks.",
                answer: "8",
                hint: "Single-digit number..."
            },
            {
                sentence: "Croatia has _______ nature parks.",
                answer: "12",
                hint: "Two-digit number..."
            },
            {
                sentence: "On the blind map, there are 4 terms from top tourist _______.",
                answer: "destinations",
                hint: "Top 10 table..."
            },
            {
                sentence: "Rab and Lastovo are examples of bigger _______.",
                answer: "islands",
                hint: "Adriatic category..."
            },
            {
                sentence: "Šibenik and Sisak are examples of county _______.",
                answer: "centres",
                hint: "Administrative city role..."
            }
        ],

        learn: {
            title: "Blind Map Categories and Location Logic",
            image: "assets/geography/map-protected-areas.jpg",
            content: `
                <h3>What You Actually Place on the Map</h3>
                <ul>
                    <li>2 county centres</li>
                    <li>2 bigger islands</li>
                    <li>1 national park</li>
                    <li>1 nature park</li>
                    <li>4 top destinations (from Top 10 table)</li>
                </ul>

                <h3>How to Drill Efficiently</h3>
                <ol>
                    <li>Start with county centres and coast orientation</li>
                    <li>Add islands by north-to-south chain</li>
                    <li>Place NP and PP by region anchors</li>
                    <li>Finish with Top 10 destination set</li>
                </ol>

                <div class="warning-box">
                    <h4><i class="fas fa-exclamation-triangle"></i> Common Error</h4>
                    <p>Students know names but miss exact placement. Practice spatial memory, not just memorization.</p>
                </div>
            `
        }
    },

    croatiaFeatures: {
        name: "Croatia Physical + Human Features",
        icon: "fa-mountain",
        color: "#a78bfa",

        flashcards: [
            {
                question: "What major mountain system shapes Croatian relief?",
                answer: "The Dinarides (part of the Alpide belt).",
                explanation: "Critical in understanding relief, karst, and tourism patterns."
            },
            {
                question: "What are the three karst surface forms shown in slides?",
                answer: "Covered karst, semi-covered karst, bare karst.",
                explanation: "Examples include Plitvice (covered), maquis zones (semi), Pag (bare)."
            },
            {
                question: "What are key characteristics of the Adriatic in Croatian hydrography?",
                answer: "High salinity (38‰), warm currents, excellent transparency, low tide amplitude.",
                explanation: "These support coastal tourism attractiveness."
            },
            {
                question: "What is Croatia's GDP per capita reference from the slides (2025)?",
                answer: "About 23,200 EUR (~80% of EU GDP/cap).",
                explanation: "Used in the Croatia ID card slide."
            },
            {
                question: "How large is tourism's share in Croatia's GDP (slide range)?",
                answer: "Around 20% to 25%.",
                explanation: "A very high dependence compared with many EU economies."
            },
            {
                question: "What are the four biogeographic regions of Croatia?",
                answer: "Alpine, Continental, Mediterranean, Pannonian.",
                explanation: "Shown in the biogeographic regions slide of lecture 2."
            },
            {
                question: "What are maquis (makija) in Croatian geography?",
                answer: "Degraded Mediterranean coastal forest, typical representative is holm oak.",
                explanation: "Example of semi-covered karst vegetation. Found on Cres and coastal areas."
            },
            {
                question: "What are the Pan-European transport corridors relevant to Croatia?",
                answer: "Defined at Helsinki conference 1997 — strategic routes in Central/Eastern Europe. Croatia's highways A1-A12 connect to these.",
                explanation: "From lecture 3 on cultural regions and transport."
            },
            {
                question: "What population processes affect Croatian tourism?",
                answer: "Aging, low birth rate, emigration, deruralization, urbanization, immigration (seasonal workforce).",
                explanation: "Tourism relies on 31% of all work permits issued."
            },
            {
                question: "Which countries send the most workers to Croatia (2025)?",
                answer: "Bosnia and Herzegovina, Nepal, Serbia, Philippines, India.",
                explanation: "170,723 total work permits, with construction and tourism each at 31%."
            },
            {
                question: "What is littoralization?",
                answer: "Population concentration along the coast, leading to uneven population density.",
                explanation: "Combined with deruralization and capital city dominance. Affects tourism labor supply."
            }
        ],

        quiz: [
            {
                question: "Which statement is true for bare karst example from lectures?",
                options: ["Pag", "Hvar", "Istria inland", "Baranja"],
                correct: 0
            },
            {
                question: "Dinarides belong to which broader orogenic context?",
                options: ["Caledonian", "Alpide", "Hercynian", "Andean"],
                correct: 1
            },
            {
                question: "Tourism share in Croatian GDP according to slides is around:",
                options: ["5-8%", "10-12%", "20-25%", "35-40%"],
                correct: 2
            },
            {
                question: "Which water-body feature supports sea-tourism image of Croatia?",
                options: ["High turbidity", "Low transparency", "Excellent transparency", "High tidal range"],
                correct: 2
            },
            {
                question: "Population processes mentioned as tourism-relevant include:",
                options: ["Only natural growth", "Urbanization, aging, migration", "Only depopulation", "Only immigration"],
                correct: 1
            },
            {
                question: "Adriatic salinity is approximately:",
                options: ["18‰", "28‰", "38‰", "48‰"],
                correct: 2
            },
            {
                question: "What biogeographic regions exist in Croatia?",
                options: ["Only Mediterranean", "Alpine, Continental, Mediterranean, Pannonian", "Mediterranean and Continental only", "Alpine and Pannonian only"],
                correct: 1
            },
            {
                question: "Maquis is an example of:",
                options: ["Bare karst", "Covered karst", "Semi-covered karst vegetation", "Alpine forest"],
                correct: 2
            },
            {
                question: "The largest share of work permits in Croatia (2025) goes to:",
                options: ["Agriculture and IT", "Construction and Tourism (each ~31%)", "Mining and Transport", "Education and Healthcare"],
                correct: 1
            },
            {
                question: "Littoralization refers to:",
                options: ["Population moving to mountains", "Population concentrating along the coast", "Population moving to capital only", "Even population distribution"],
                correct: 1
            },
            {
                question: "Croatia's GDP per capita (2025) is approximately what % of EU average?",
                options: ["50%", "65%", "80%", "95%"],
                correct: 2
            },
            {
                question: "Which is NOT mentioned as a Croatian wind in the Adriatic slides?",
                options: ["Bura", "Jugo", "Maestral", "Foehn"],
                correct: 3
            }
        ],

        fillBlanks: [
            {
                sentence: "The dominant mountain chain in Croatia is the _______.",
                answer: "Dinarides",
                hint: "Starts with D..."
            },
            {
                sentence: "Tourism share in Croatia's GDP is roughly _______ to 25 percent.",
                answer: "20",
                hint: "Two-digit number..."
            },
            {
                sentence: "Pag is used as an example of _______ karst.",
                answer: "bare",
                hint: "No vegetation..."
            },
            {
                sentence: "In Croatian hydrography, Adriatic salinity is around _______ per mille.",
                answer: "38",
                hint: "Two-digit number..."
            },
            {
                sentence: "Maquis is degraded coastal forest, with holm _______ as typical representative.",
                answer: "oak",
                hint: "A type of tree..."
            },
            {
                sentence: "Construction and tourism each account for _______ percent of work permits.",
                answer: "31",
                hint: "Almost a third..."
            },
            {
                sentence: "Croatia's GDP per capita in 2025 was about _______ EUR.",
                answer: "23200",
                hint: "About 80% of EU average..."
            },
            {
                sentence: "_______ is the term for population concentrating along the coast.",
                answer: "Littoralization",
                hint: "From 'littoral' (coast)..."
            }
        ],

        learn: {
            title: "Core Features of Croatia for Midterm",
            content: `
                <h3>Physical Base (Lecture 2)</h3>
                <ul>
                    <li><strong>Relief:</strong> Dinaric mountain system (Alpide belt), key features: Velebit, Žumberak, Biokovo</li>
                    <li><strong>Karst:</strong> Covered (Plitvice forests), Semi-covered (maquis/holm oak), Bare (Pag)</li>
                    <li><strong>Climate:</strong> Temperate (C), Mediterranean coast, Continental inland</li>
                    <li><strong>Hydrography:</strong> Adriatic (38‰ salinity, warm currents, excellent transparency, low tides); Inland rivers: Danube navigable, karst rivers (Mrežnica, Cetina)</li>
                    <li><strong>Biogeographic regions:</strong> Alpine, Continental, Mediterranean, Pannonian</li>
                </ul>

                <h3>Human/Social Features (Lecture 3)</h3>
                <ul>
                    <li><strong>Economy:</strong> GDP/cap ~23,200 EUR (80% EU avg), tourism = 20-25% of GDP</li>
                    <li><strong>Transport:</strong> Highways A1-A12, Učka tunnel, Krk bridge, Pelješac bridge, Pan-European corridors</li>
                    <li><strong>Air traffic:</strong> Zagreb and Split as main airports</li>
                    <li><strong>Sea traffic:</strong> Coastal shipping, cruise ships, charter, private boats</li>
                    <li><strong>Population:</strong> Uneven density, capital dominance (Zagreb), 4-5 regional centres, littoralization, deruralization, depopulation</li>
                    <li><strong>Labor force:</strong> 170,723 work permits (2025): 31% construction, 31% tourism. Top countries: BiH, Nepal, Serbia, Philippines, India</li>
                    <li><strong>Tourism stats:</strong> Return to pre-pandemic growth, 89% foreign tourists, distinct summer seasonality</li>
                </ul>

                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Exam Tip</h4>
                    <p>Pair each physical feature with a tourism implication (e.g., karst → protected areas/diving/scenery; Adriatic transparency → bathing tourism; Dinarides → mountain/adventure tourism).</p>
                </div>
            `
        }
    },

    protectedAndTouristRegions: {
        name: "Tourist Regions, Parks, and UNESCO",
        icon: "fa-tree-city",
        color: "#f59e0b",

        flashcards: [
            {
                question: "What are the three Croatian tourist macro-regions?",
                answer: "Coastal, Mountainous, and Pannonian tourist region.",
                explanation: "Regional structure appears in multiple lectures."
            },
            {
                question: "Which two strict reserves are listed in slides?",
                answer: "Bijele i Samarske stijene; Hajdučki i Rožanski kukovi.",
                explanation: "They appear in protected area overview."
            },
            {
                question: "Name all 8 national parks of Croatia.",
                answer: "Plitvička jezera, Krka, Kornati, Brijuni, Mljet, Paklenica, Risnjak, Sjeverni Velebit.",
                explanation: "All 8 are shown in lecture 6."
            },
            {
                question: "Name at least 6 nature parks from lecture set.",
                answer: "Kopački rit, Medvednica, Papuk, Žumberak, Lonjsko polje, Učka, Telašćica, Velebit, Vransko jezero, Dinara, Biokovo, Lastovsko otočje.",
                explanation: "Croatia has 12 nature parks total."
            },
            {
                question: "Which UNESCO site in Croatia is also a national park?",
                answer: "Plitvice Lakes.",
                explanation: "It appears in both natural protection and UNESCO context."
            },
            {
                question: "What sub-regions make up the North Croatian Coast?",
                answer: "Istria and Kvarner.",
                explanation: "From lecture 4 on coastal tourist region."
            },
            {
                question: "What sub-regions make up Southern Croatian Coast (Dalmatia)?",
                answer: "Northern Dalmatia (Zadar, Šibenik), Central Dalmatia (Trogir, Split, Makarska), South Dalmatia (Dubrovnik).",
                explanation: "From lecture 4 detailed coastal breakdown."
            },
            {
                question: "What are the three types of Istria shown in lectures?",
                answer: "Red Istria (western/southern coast, red-brown soils), Gray Istria (central, gray clay/flysch), White Istria (Učka/eastern, rocky).",
                explanation: "Three-colour model from lecture 4."
            },
            {
                question: "Name key destinations in the Kvarner region from slides.",
                answer: "Opatija, Rijeka/Trsat, Crikvenica, Rab, Cres/Lubenice, Lošinj, Punat.",
                explanation: "From lecture 4, Kvarner tourist region page."
            },
            {
                question: "Name key Pannonian region destinations from Central Croatia slides.",
                answer: "Zagreb, Varaždin, Karlovac, Hrvatsko Zagorje, Trakošćan, Medvednica.",
                explanation: "From lecture 5, Pannonian tourist region."
            },
            {
                question: "Name key Pannonian destinations from Eastern Croatia (Slavonija).",
                answer: "Osijek, Vukovar, Đakovo, Ilok, Vinkovci, Kopački rit, Papuk.",
                explanation: "From lecture 5."
            },
            {
                question: "List all 10 UNESCO tangible heritage sites in Croatia.",
                answer: "1) Diocletian's Palace (Split), 2) Euphrasius Basilica (Poreč), 3) Plitvice Lakes, 4) Trogir, 5) Old City Dubrovnik, 6) Cathedral Šibenik, 7) Stari Grad Plain (Hvar), 8) Medieval tombstones, 9) Venetian Defence (Zadar + St. Nicholas Šibenik), 10) Beech forests (Paklenica, Velebit).",
                explanation: "From lecture 6, UNESCO heritage slide."
            }
        ],

        quiz: [
            {
                question: "Which set correctly lists Croatian tourist macro-regions?",
                options: ["Adriatic, Alpine, Danubian", "Coastal, Mountainous, Pannonian", "Istria, Slavonia, Dalmatia", "North, South, East"],
                correct: 1
            },
            {
                question: "Which is NOT a national park?",
                options: ["Krka", "Brijuni", "Medvednica", "Mljet"],
                correct: 2
            },
            {
                question: "Which is a nature park?",
                options: ["Kornati", "Paklenica", "Učka", "Risnjak"],
                correct: 2
            },
            {
                question: "Plitvice Lakes are best categorized as:",
                options: ["Only county centre", "National park and UNESCO site", "Nature park only", "Island destination"],
                correct: 1
            },
            {
                question: "Which area belongs to Coastal tourist region context?",
                options: ["Zagorje thermal belt", "Gorski kotar", "Kvarner", "Baranja lowlands"],
                correct: 2
            },
            {
                question: "Red Istria refers to:",
                options: ["Central Istria with gray soil", "Eastern rocky peninsula", "Western/southern coast with red-brown soil", "Northern alpine area"],
                correct: 2
            },
            {
                question: "Which nature park is described as UNESCO Geopark?",
                options: ["Medvednica", "Biokovo", "Papuk", "Učka"],
                correct: 2
            },
            {
                question: "The Euphrasius Basilica UNESCO site is in:",
                options: ["Split", "Zadar", "Poreč", "Dubrovnik"],
                correct: 2
            },
            {
                question: "Which island has the UNESCO Stari Grad Plain?",
                options: ["Brač", "Korčula", "Hvar", "Vis"],
                correct: 2
            },
            {
                question: "Trogir is UNESCO-listed as:",
                options: ["Nature park", "Romanesque town", "Ancient fortress", "Island reserve"],
                correct: 1
            },
            {
                question: "Kopački rit nature park is in which part of Croatia?",
                options: ["Istria", "Dalmatia", "Eastern Slavonia (Baranja)", "Gorski kotar"],
                correct: 2
            },
            {
                question: "How many nature parks does Croatia have?",
                options: ["8", "10", "12", "15"],
                correct: 2
            },
            {
                question: "Opatija belongs to which tourist sub-region?",
                options: ["Istria", "Kvarner", "Northern Dalmatia", "Zagorje"],
                correct: 1
            },
            {
                question: "St. Nicholas Fortress (UNESCO Venetian Defence) is near:",
                options: ["Split", "Dubrovnik", "Šibenik", "Trogir"],
                correct: 2
            },
            {
                question: "Which destination is associated with the Makarska Riviera?",
                options: ["Trogir", "Omiš", "Makarska", "Nin"],
                correct: 2
            },
            {
                question: "Ston is known for:",
                options: ["Snow tourism", "Salt pans and defensive walls", "UNESCO basilica", "Island hopping"],
                correct: 1
            },
            {
                question: "The Mountainous tourist region includes:",
                options: ["Istria coast", "Gorski kotar and Velebit", "Baranja wetlands", "Zagreb area"],
                correct: 1
            },
            {
                question: "Lonjsko polje nature park is known for:",
                options: ["Marine life", "Stork village Čigoč", "Skiing", "Wine production"],
                correct: 1
            }
        ],

        fillBlanks: [
            {
                sentence: "Croatian tourist macro-regions are Coastal, Mountainous and _______.",
                answer: "Pannonian",
                hint: "Eastern lowland context..."
            },
            {
                sentence: "Plitvice Lakes are both a national park and a _______ site.",
                answer: "UNESCO",
                hint: "World heritage..."
            },
            {
                sentence: "Učka is categorized as a nature _______.",
                answer: "park",
                hint: "PP category..."
            },
            {
                sentence: "Krka is categorized as a national _______.",
                answer: "park",
                hint: "NP category..."
            },
            {
                sentence: "The three types of Istria by soil are Red, Gray, and _______.",
                answer: "White",
                hint: "Učka/eastern area..."
            },
            {
                sentence: "The Euphrasius Basilica UNESCO site is located in _______.",
                answer: "Poreč",
                hint: "Istrian coastal town..."
            },
            {
                sentence: "Stari Grad Plain UNESCO site is on the island of _______.",
                answer: "Hvar",
                hint: "Famous Dalmatian island..."
            },
            {
                sentence: "Papuk is both a nature park and a UNESCO _______.",
                answer: "Geopark",
                hint: "Geological heritage..."
            },
            {
                sentence: "Čigoč stork village is in _______ polje nature park.",
                answer: "Lonjsko",
                hint: "Pannonian wetland..."
            },
            {
                sentence: "Croatia has _______ tangible UNESCO World Heritage sites.",
                answer: "10",
                hint: "Two-digit number..."
            }
        ],

        learn: {
            title: "Regional Tourism, Protected Areas, and UNESCO",
            content: `
                <h3>Tourist Macro-Regions</h3>
                <ul>
                    <li><strong>Coastal:</strong> Istria (Red/Gray/White), Kvarner (Opatija, Rijeka, islands), Northern Dalmatia (Zadar, Šibenik, Nin), Central Dalmatia (Trogir, Split, Makarska, islands), South Dalmatia (Dubrovnik, Korčula, Ston)</li>
                    <li><strong>Mountainous:</strong> Gorski kotar, Velebit range, Plitvice Lakes, Paklenica</li>
                    <li><strong>Pannonian:</strong> Central Croatia (Zagreb, Varaždin, Zagorje), Eastern Croatia (Osijek, Vukovar, Đakovo, Baranja)</li>
                </ul>

                <h3>8 National Parks</h3>
                <ol>
                    <li>Plitvička jezera (UNESCO) — covered karst, travertine lakes</li>
                    <li>Krka — waterfalls, Visovac island monastery</li>
                    <li>Kornati — 89 islands archipelago</li>
                    <li>Brijuni — islands near Pula, Roman ruins</li>
                    <li>Mljet — island park, saltwater lakes</li>
                    <li>Paklenica — Velebit canyon, climbing (UNESCO beech forests)</li>
                    <li>Risnjak — Gorski kotar mountain park</li>
                    <li>Sjeverni Velebit — northern Velebit (UNESCO beech forests)</li>
                </ol>

                <h3>12 Nature Parks</h3>
                <ol>
                    <li>Kopački rit (Baranja wetland)</li>
                    <li>Medvednica (mountain above Zagreb)</li>
                    <li>Papuk (UNESCO Geopark, Slavonia)</li>
                    <li>Žumberak-Samoborsko gorje</li>
                    <li>Lonjsko polje (stork village Čigoč)</li>
                    <li>Učka (above Kvarner coast)</li>
                    <li>Velebit (broader Velebit range)</li>
                    <li>Telašćica (Dugi Otok bay)</li>
                    <li>Vransko jezero (largest natural lake)</li>
                    <li>Dinara (highest peak 1831m)</li>
                    <li>Biokovo (above Makarska)</li>
                    <li>Lastovsko otočje (remote island archipelago)</li>
                </ol>

                <h3>10 UNESCO Tangible Heritage Sites</h3>
                <ol>
                    <li>Diocletian's Palace — Split</li>
                    <li>Euphrasius Basilica — Poreč</li>
                    <li>Plitvice Lakes</li>
                    <li>Romanesque Town — Trogir</li>
                    <li>Old City — Dubrovnik</li>
                    <li>Cathedral of St. James — Šibenik</li>
                    <li>Stari Grad Plain — Island Hvar</li>
                    <li>Medieval tombstone graveyards (Stećci)</li>
                    <li>Venetian Defence System — Zadar walls + St. Nicholas fortress Šibenik</li>
                    <li>Ancient beech forests — Paklenica + Sjeverni Velebit</li>
                </ol>

                <h3>Top 10 Tourist Destinations 2024</h3>
                <table style="width:100%; border-collapse: collapse; margin: 1rem 0;">
                    <tr style="border-bottom: 1px solid var(--border-color);"><td>1. Dubrovnik</td><td>4,192,151 nights</td></tr>
                    <tr style="border-bottom: 1px solid var(--border-color);"><td>2. Rovinj</td><td>4,068,712</td></tr>
                    <tr style="border-bottom: 1px solid var(--border-color);"><td>3. Poreč</td><td>3,216,077</td></tr>
                    <tr style="border-bottom: 1px solid var(--border-color);"><td>4. Split</td><td>3,070,825</td></tr>
                    <tr style="border-bottom: 1px solid var(--border-color);"><td>5. Umag</td><td>2,666,930</td></tr>
                    <tr style="border-bottom: 1px solid var(--border-color);"><td>6. Zagreb</td><td>2,646,443</td></tr>
                    <tr style="border-bottom: 1px solid var(--border-color);"><td>7. Medulin</td><td>2,615,538</td></tr>
                    <tr style="border-bottom: 1px solid var(--border-color);"><td>8. Zadar</td><td>2,299,125</td></tr>
                    <tr style="border-bottom: 1px solid var(--border-color);"><td>9. Funtana</td><td>2,098,664</td></tr>
                    <tr><td>10. Pula</td><td>2,020,931</td></tr>
                </table>

                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Exam Tip</h4>
                    <p>Know the Top 10 by heart — 4 of them appear on your blind map. Also memorize ALL 8 NPs and at least the most important nature parks (Medvednica, Učka, Kopački rit, Biokovo, Papuk, Lonjsko polje).</p>
                </div>
            `
        }
    },

    cityImageRecognition: {
        name: "Image Recognition: Which City?",
        icon: "fa-camera-retro",
        color: "#ec4899",

        flashcards: [
            {
                question: "What visual cue strongly identifies Dubrovnik?",
                answer: "Walled Old Town on a rocky peninsula with distinct fortifications.",
                explanation: "This is one of the most recognizable Croatian city panoramas."
            },
            {
                question: "What visual cue strongly identifies Split old core?",
                answer: "Dense historic waterfront core linked with Diocletian heritage and ferry-port setting.",
                explanation: "Split has a very distinctive urban-maritime skyline."
            },
            {
                question: "What visual cue strongly identifies Makarska?",
                answer: "Coastal town directly below steep Biokovo mountain backdrop.",
                explanation: "Mountain-wall over coastline is a signature cue."
            },
            {
                question: "What visual cue strongly identifies Ston in this lecture set?",
                answer: "Salt pans and defensive walls in a narrow isthmus landscape.",
                explanation: "Ston is regularly linked with saltworks and oyster context."
            }
        ],

        quiz: [
            {
                question: "Which city is shown in the image?",
                image: "assets/geography/city-dubrovnik.jpg",
                imageAlt: "Aerial of walled old city on Adriatic coast",
                options: ["Split", "Dubrovnik", "Zadar", "Poreč"],
                correct: 1
            },
            {
                question: "Which city is shown in the image?",
                image: "assets/geography/city-split.jpg",
                imageAlt: "Harbor panorama of historic Adriatic city",
                options: ["Šibenik", "Rijeka", "Split", "Umag"],
                correct: 2
            },
            {
                question: "Which city is shown in the image?",
                image: "assets/geography/city-makarska.jpg",
                imageAlt: "Coastal city below massive mountain ridge",
                options: ["Makarska", "Dubrovnik", "Pula", "Medulin"],
                correct: 0
            },
            {
                question: "Which place is shown in the image?",
                image: "assets/geography/city-ston.jpg",
                imageAlt: "Salt pans and fortified settlement landscape",
                options: ["Ston", "Zadar", "Trogir", "Rovinj"],
                correct: 0
            },
            {
                question: "The city most associated with monumental medieval walls in this set is:",
                options: ["Dubrovnik", "Split", "Poreč", "Osijek"],
                correct: 0
            },
            {
                question: "The city recognized by Biokovo mountain backdrop is:",
                options: ["Makarska", "Rijeka", "Vukovar", "Čakovec"],
                correct: 0
            }
        ],

        fillBlanks: [
            {
                sentence: "The image with massive stone walls and old-town peninsula refers to _______.",
                answer: "Dubrovnik",
                hint: "South Dalmatia icon..."
            },
            {
                sentence: "The city panorama under Biokovo mountain is _______.",
                answer: "Makarska",
                hint: "Central Dalmatia coast..."
            },
            {
                sentence: "The settlement linked with salt pans in this set is _______.",
                answer: "Ston",
                hint: "Pelješac area..."
            },
            {
                sentence: "Historic coastal panorama in this set with major ferry context is _______.",
                answer: "Split",
                hint: "Largest Dalmatian city..."
            }
        ],

        learn: {
            title: "How to Solve Image-Based City Questions",
            content: `
                <h3>Pattern Recognition Method</h3>
                <ol>
                    <li>Identify relief (flat coast vs mountain backdrop)</li>
                    <li>Identify morphology (walled old town, salt pans, harbor structure)</li>
                    <li>Connect with regional context from tourist-region slides</li>
                </ol>

                <h3>High-Confidence Cues</h3>
                <ul>
                    <li><strong>Dubrovnik:</strong> fortified old city walls</li>
                    <li><strong>Makarska:</strong> dramatic Biokovo backdrop</li>
                    <li><strong>Split:</strong> major urban waterfront + historic core</li>
                    <li><strong>Ston:</strong> salt pans and fortification landscape</li>
                </ul>
            `
        }
    }
};
