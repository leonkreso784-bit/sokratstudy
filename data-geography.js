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
                answer: "High salinity, warm currents, excellent transparency, low tide amplitude.",
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
            }
        ],

        fillBlanks: [
            {
                sentence: "The dominant mountain chain in Croatia is the _______.",
                answer: "Dinarides",
                hint: "Starts with D..."
            },
            {
                sentence: "Tourism share in Croatia's GDP is roughly _______ to _______ percent.",
                answer: "20 25",
                hint: "Two numbers from slides..."
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
            }
        ],

        learn: {
            title: "Core Features of Croatia for Midterm",
            content: `
                <h3>Physical Base</h3>
                <ul>
                    <li>Dinaric relief and karst landscapes</li>
                    <li>Climate gradients between coast and inland</li>
                    <li>Hydrography: Adriatic + inland rivers</li>
                </ul>

                <h3>Human + Tourism Base</h3>
                <ul>
                    <li>Strong tourism role in national GDP</li>
                    <li>Seasonality and labor-market pressures</li>
                    <li>Transport corridors and coastal concentration</li>
                </ul>

                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Exam Tip</h4>
                    <p>Pair each physical feature with a tourism implication (e.g., karst -> protected areas, diving, scenery tourism).</p>
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
                question: "Name three national parks from lecture set.",
                answer: "Examples: Plitvička jezera, Krka, Kornati, Mljet, Paklenica, Brijuni, Risnjak, Sjeverni Velebit.",
                explanation: "Any correct triplet is acceptable."
            },
            {
                question: "Name three nature parks from lecture set.",
                answer: "Examples: Učka, Medvednica, Papuk, Kopački rit, Velebit, Telašćica, Biokovo, Lonjsko polje.",
                explanation: "Use map of protected areas for location training."
            },
            {
                question: "Which UNESCO site in Croatia is also a national park?",
                answer: "Plitvice Lakes.",
                explanation: "It appears in both natural protection and UNESCO context."
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
            }
        ],

        learn: {
            title: "Regional Tourism and Protected Areas",
            content: `
                <h3>Tourist Region Logic</h3>
                <p>Lecture structure groups Croatian tourism into coastal, mountainous and pannonian systems, each with different products and seasonality profiles.</p>

                <h3>Protected Areas</h3>
                <ul>
                    <li>8 national parks and 12 nature parks are key map anchors</li>
                    <li>Protected areas are major tourism resources and branding assets</li>
                    <li>Spatial protection categories matter for sustainable tourism planning</li>
                </ul>

                <h3>UNESCO Connection</h3>
                <p>UNESCO sites connect heritage protection with destination identity and global visibility.</p>
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
