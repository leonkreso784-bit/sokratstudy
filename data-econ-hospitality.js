// ===== ECONOMICS IN HOSPITALITY - FIRST MIDTERM =====
// Source basis: Economics in Hospitality seminar presentation (Leon Kreso)

const economicsHospitalityData = {
    macroImportance: {
        name: "Macroeconomic Importance",
        icon: "fa-chart-pie",
        color: "#0ea5e9",

        flashcards: [
            {
                question: "What is Croatia's travel receipts-to-GDP ratio, and why is it important?",
                answer: "Croatia's travel receipts-to-GDP ratio is 18.7%, the highest in the EU. It shows very strong tourism dependence and a major macroeconomic role of hospitality.",
                explanation: "This indicator compares tourism receipts to national output."
            },
            {
                question: "How much tourism revenue did Croatia generate in 2023?",
                answer: "Croatia generated about EUR 14.6 billion in tourism revenue in 2023.",
                explanation: "Tourism is one of Croatia's key service exports."
            },
            {
                question: "What were the approximate arrivals and overnights in the reference year?",
                answer: "Around 20.6 million arrivals and 108 million overnights.",
                explanation: "Large absolute tourism volume for a country under 4 million residents."
            },
            {
                question: "What is direct tourism GVA and total GDP impact in Croatia?",
                answer: "Direct tourism GVA is about EUR 7.7 billion (11.3% of GDP), while total impact including indirect effects is around 24.5% of GDP.",
                explanation: "Direct and total impact differ because of multiplier effects."
            },
            {
                question: "How large is direct tourism employment in Croatia?",
                answer: "About 216,718 direct jobs, roughly 12.5% of total employment.",
                explanation: "Hospitality and tourism are key labor-market sectors."
            }
        ],

        quiz: [
            {
                question: "Croatia's travel receipts-to-GDP ratio is approximately:",
                options: ["3.5%", "9.1%", "18.7%", "24.5%"],
                correct: 2
            },
            {
                question: "Tourism revenue in Croatia (2023) was closest to:",
                options: ["EUR 4.6B", "EUR 7.7B", "EUR 14.6B", "EUR 23.4B"],
                correct: 2
            },
            {
                question: "Direct tourism employment in Croatia is around:",
                options: ["70,000", "120,000", "216,718", "519,000"],
                correct: 2
            }
        ],

        fillBlanks: [
            {
                sentence: "Croatia leads the EU with _______ travel receipts-to-GDP ratio.",
                answer: "18.7%",
                hint: "Starts with 18..."
            },
            {
                sentence: "Tourism revenue in 2023 was approximately EUR _______.",
                answer: "14.6 billion",
                hint: "14-point-6..."
            },
            {
                sentence: "Direct tourism jobs were about _______ workers.",
                answer: "216,718",
                hint: "About two hundred sixteen thousand..."
            }
        ],

        learn: {
            title: "Macroeconomic Importance of Hospitality",
            content: `
                <h3>Core Macro Indicators</h3>
                <div class="formula-box">
                    <p><strong>Travel Receipts / GDP:</strong> 18.7% (EU-highest)</p>
                    <p><strong>Tourism Revenue (2023):</strong> EUR 14.6B</p>
                    <p><strong>Scale:</strong> 20.6M arrivals, 108M overnights</p>
                </div>

                <h4>Value Added and Employment</h4>
                <ul>
                    <li><strong>Direct tourism GVA:</strong> EUR 7.7B (about 11.3% of GDP)</li>
                    <li><strong>Total impact:</strong> around 24.5% of GDP (including indirect effects)</li>
                    <li><strong>Direct jobs:</strong> 216,718 (about 12.5% of employment)</li>
                </ul>

                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Midterm Focus</h4>
                    <p>Know the difference between <strong>direct contribution</strong> and <strong>total impact</strong>.</p>
                </div>
            `
        }
    },

    seasonalityStructure: {
        name: "Seasonality Structure",
        icon: "fa-sun",
        color: "#f97316",

        flashcards: [
            {
                question: "What is the main structural seasonality issue in Croatian tourism?",
                answer: "More than 75% of annual overnights are concentrated in only four months (June-September).",
                explanation: "This concentration creates strong seasonal pressure."
            },
            {
                question: "How concentrated are July and August together?",
                answer: "About 60.4 million overnights in 62 days.",
                explanation: "Peak summer dominates annual results."
            },
            {
                question: "What is August's approximate share of annual overnights?",
                answer: "Around 31.9 million overnights, about 30% of annual total.",
                explanation: "Single-month concentration is very high."
            },
            {
                question: "What accommodation structure reinforces seasonality?",
                answer: "Private apartments around 65% of beds, campsites around 21%, hotels only about 13.7%.",
                explanation: "Private and camp capacity is naturally summer-heavy."
            },
            {
                question: "What geographic concentration is observed?",
                answer: "About 90% of arrivals are concentrated on the Adriatic coast.",
                explanation: "Strong regional concentration adds vulnerability."
            }
        ],

        quiz: [
            {
                question: "Overnights concentrated in Jun-Sep are roughly:",
                options: ["35%", "50%", "75%+", "90%+"],
                correct: 2
            },
            {
                question: "Private apartments account for about how much bed capacity?",
                options: ["13.7%", "21%", "65%", "75%"],
                correct: 2
            },
            {
                question: "Hotels represent approximately what share of bed stock?",
                options: ["13.7%", "31.9%", "60.4%", "65%"],
                correct: 0
            }
        ],

        fillBlanks: [
            {
                sentence: "More than _______ of annual overnights happen in Jun-Sep.",
                answer: "75%",
                hint: "Three quarters plus..."
            },
            {
                sentence: "Private apartments represent around _______ of beds.",
                answer: "65%",
                hint: "Mid-sixties..."
            },
            {
                sentence: "Hotels account for only about _______ of capacity.",
                answer: "13.7%",
                hint: "Just under 14..."
            }
        ],

        learn: {
            title: "Seasonality: Structure and Consequences",
            content: `
                <h3>Extreme Concentration</h3>
                <div class="warning-box">
                    <h4><i class="fas fa-exclamation-triangle"></i> Structural Risk</h4>
                    <p><strong>75%+</strong> of overnights are generated in only <strong>4 summer months</strong>.</p>
                </div>

                <h4>Why It Happens</h4>
                <ul>
                    <li>Capacity mix is dominated by <strong>private apartments</strong> (seasonal by design)</li>
                    <li>Hotels (better for year-round business) are a relatively small share</li>
                    <li>Demand is geographically concentrated on the coast</li>
                </ul>

                <div class="example-box">
                    <p><strong>Implication:</strong> high summer performance, weak off-season resilience.</p>
                </div>
            `
        }
    },

    caseStudies: {
        name: "Dubrovnik, Split, Istria",
        icon: "fa-map-marked-alt",
        color: "#22c55e",

        flashcards: [
            {
                question: "What defines Dubrovnik's tourism model in the case study?",
                answer: "Overtourism pressure: around 40,000 residents vs about 1.4M arrivals, major cruise inflow, high pressure on heritage and housing.",
                explanation: "A high-value destination with high carrying-capacity stress."
            },
            {
                question: "What characterizes Split's model?",
                answer: "Growing city-break model driven by transport connectivity and low-cost flights, with increasing year-round traffic.",
                explanation: "Split is becoming more diversified than purely summer seaside demand."
            },
            {
                question: "Why is Istria presented as best practice?",
                answer: "Higher hotel/resort quality, strong gastronomy and active tourism, and an extended season (roughly April-October).",
                explanation: "Istria demonstrates value-oriented, longer-season strategy."
            }
        ],

        quiz: [
            {
                question: "Which destination is highlighted as best-practice in season extension?",
                options: ["Dubrovnik", "Split", "Istria", "Zagreb"],
                correct: 2
            },
            {
                question: "Split's growth is strongly associated with:",
                options: ["Cruise-only model", "Low-cost air routes and city-break demand", "Winter skiing", "No private accommodation"],
                correct: 1
            },
            {
                question: "A key Dubrovnik challenge is:",
                options: ["No tourist demand", "Overtourism pressure", "Lack of sea access", "No heritage assets"],
                correct: 1
            }
        ],

        fillBlanks: [
            {
                sentence: "Istria's effective season is often described as _______ to October.",
                answer: "April",
                hint: "Spring month..."
            },
            {
                sentence: "Dubrovnik case emphasizes the risk of _______.",
                answer: "overtourism",
                hint: "Too many visitors..."
            },
            {
                sentence: "Split is developing a stronger city-_______ model.",
                answer: "break",
                hint: "Short urban trips..."
            }
        ],

        learn: {
            title: "Case Studies: Three Destination Models",
            content: `
                <h3>Comparative Destination Logic</h3>
                <ul>
                    <li><strong>Dubrovnik:</strong> premium demand + carrying-capacity pressure</li>
                    <li><strong>Split:</strong> expanding city-break and transport hub dynamics</li>
                    <li><strong>Istria:</strong> diversified product and longer active season</li>
                </ul>

                <div class="tip-box">
                    <h4><i class="fas fa-check-circle"></i> Exam Angle</h4>
                    <p>Know which model is <strong>volume pressure</strong> (Dubrovnik) and which is <strong>season extension</strong> (Istria).</p>
                </div>
            `
        }
    },

    productivityAndDigital: {
        name: "Productivity and Digital Gap",
        icon: "fa-microchip",
        color: "#8b5cf6",

        flashcards: [
            {
                question: "What is the low-spending tourist problem?",
                answer: "Revenue growth is often driven by visitor volume, while average spending per tourist stagnates.",
                explanation: "Volume growth without enough value growth reduces long-term quality."
            },
            {
                question: "How do hotel guests compare to private apartment guests in spending?",
                answer: "Hotel guests spend around 30% more on average.",
                explanation: "Accommodation mix directly affects value-added outcomes."
            },
            {
                question: "Why is platform dependence a productivity issue for small operators?",
                answer: "Heavy reliance on large OTAs (e.g., Booking/Airbnb) can extract margins via 15-25% commissions.",
                explanation: "Commission leakage lowers retained value per booking."
            },
            {
                question: "What is the digital capability gap?",
                answer: "Large hotel systems are more digitally advanced, while many smaller private providers still lack strong direct-booking and data capabilities.",
                explanation: "Digital maturity is uneven across the sector."
            }
        ],

        quiz: [
            {
                question: "Hotel guests typically spend about how much more than private apartment guests?",
                options: ["10%", "20%", "30%", "50%"],
                correct: 2
            },
            {
                question: "Typical OTA commission range discussed in seminar material is:",
                options: ["2-5%", "8-10%", "15-25%", "30-40%"],
                correct: 2
            },
            {
                question: "A key policy objective is to move from:",
                options: ["value to volume", "volume to value", "hotels to camps", "digital to analog"],
                correct: 1
            }
        ],

        fillBlanks: [
            {
                sentence: "Many small operators depend heavily on _______ platforms.",
                answer: "OTA",
                hint: "Online travel agency acronym..."
            },
            {
                sentence: "Hotel guests spend roughly _______ more than private apartment guests.",
                answer: "30%",
                hint: "Three-zero..."
            },
            {
                sentence: "The strategic shift is from volume to _______.",
                answer: "value",
                hint: "Higher quality and yield..."
            }
        ],

        learn: {
            title: "Productivity and Value Added",
            content: `
                <h3>Core Economic Issue</h3>
                <p>High volume does not automatically mean high productivity.</p>

                <div class="formula-box">
                    <strong>Preferred growth model:</strong><br>
                    Revenue per visitor and value added per bed, not just headcount.
                </div>

                <h4>Digital Gap Dynamics</h4>
                <ul>
                    <li>Large systems: stronger direct channels and tech stack</li>
                    <li>Small operators: higher dependence on OTA distribution</li>
                    <li>Commissions reduce retained local value</li>
                </ul>
            `
        }
    },

    competitivenessAndPolicy: {
        name: "Competitiveness and Policy",
        icon: "fa-balance-scale",
        color: "#ef4444",

        flashcards: [
            {
                question: "How does Croatia compare with Greece in travel receipts-to-GDP?",
                answer: "Croatia is much higher (about 18.7%) versus Greece (about 9.1%).",
                explanation: "Croatia's economy is relatively more tourism-exposed."
            },
            {
                question: "How do revenue-per-arrival figures compare?",
                answer: "They are relatively close in the seminar benchmark: Croatia around EUR 710 and Greece around EUR 730.",
                explanation: "Croatia has room for premium-value improvements."
            },
            {
                question: "What are key policy tools mentioned for structural improvement?",
                answer: "Tourism Strategy 2030, new tourism law (Dec 2023), product diversification, and targeted season extension.",
                explanation: "Policy and product structure must work together."
            },
            {
                question: "What season-extension target is discussed?",
                answer: "A realistic medium target is extending effective season from about 5 to 7 months.",
                explanation: "Gradual extension is emphasized over instant transformation."
            },
            {
                question: "How can digital nomad policy support tourism resilience?",
                answer: "By diversifying demand beyond classic summer leisure flows and supporting year-round occupancy patterns.",
                explanation: "Demand diversification reduces concentration risk."
            }
        ],

        quiz: [
            {
                question: "Croatia's benchmark travel receipts-to-GDP in the seminar is:",
                options: ["7.7%", "9.1%", "11.3%", "18.7%"],
                correct: 3
            },
            {
                question: "A realistic structural target is extending season from 5 to:",
                options: ["6 months", "7 months", "9 months", "12 months"],
                correct: 1
            },
            {
                question: "A core strategic direction is:",
                options: ["more volume at any cost", "reduce all tourism activity", "shift from volume to value", "close private accommodation"],
                correct: 2
            }
        ],

        fillBlanks: [
            {
                sentence: "Croatia's strategy emphasizes a shift from volume to _______.",
                answer: "value",
                hint: "Higher yield per guest..."
            },
            {
                sentence: "The realistic extension target is from 5 to _______ months.",
                answer: "7",
                hint: "Single-digit number..."
            },
            {
                sentence: "Tourism Strategy _______ is one key policy framework.",
                answer: "2030",
                hint: "Year-based strategy..."
            }
        ],

        learn: {
            title: "Competitiveness, Vulnerability, and Strategic Response",
            content: `
                <h3>Comparative Position</h3>
                <p>Croatia performs exceptionally on tourism intensity, but structural dependence remains high.</p>

                <div class="warning-box">
                    <h4><i class="fas fa-exclamation-triangle"></i> Structural Vulnerability</h4>
                    <p>Strong concentration in summer months and accommodation mix can limit long-run resilience.</p>
                </div>

                <h4>Policy and Strategy Priorities</h4>
                <ul>
                    <li><strong>Tourism Strategy 2030</strong> and quality-oriented transformation</li>
                    <li><strong>Season extension</strong> via gastronomy, active, cultural, health, and nautical products</li>
                    <li><strong>Value over volume</strong> as the central growth philosophy</li>
                </ul>

                <div class="tip-box">
                    <h4><i class="fas fa-flag-checkered"></i> First Midterm Summary</h4>
                    <p>Remember three pillars: <strong>macro strength</strong>, <strong>seasonality risk</strong>, <strong>value-based transition</strong>.</p>
                </div>
            `
        }
    }
};
