// ===== MARKETING - FIRST MIDTERM =====
// Source basis: 6 presentation files from /Documentos/marketing.

const marketingData = {
    marketingConcept: {
        name: "Marketing Concept",
        icon: "fa-bullseye",
        color: "#ec4899",

        flashcards: [
            {
                question: "What is the core definition of marketing in a modern business concept?",
                answer: "Marketing is creating and exchanging value by understanding customer needs and delivering offerings that satisfy those needs profitably.",
                explanation: "Modern marketing starts from value, not only selling."
            },
            {
                question: "How did business concepts evolve historically?",
                answer: "From production concept to selling concept, then marketing concept, and finally relationship/holistic marketing.",
                explanation: "Each stage reflects increasing customer orientation."
            },
            {
                question: "What is the production concept?",
                answer: "Focus on production efficiency and low costs: make products and expect people to buy them.",
                explanation: "Works when demand exceeds supply."
            },
            {
                question: "What is the selling concept?",
                answer: "Focus on aggressive promotion and sales volume: sell what the company already has.",
                explanation: "Product-push approach, not customer-pull."
            },
            {
                question: "What is the marketing concept?",
                answer: "Find out what customers need first, then design and deliver the right offering better than competitors.",
                explanation: "Customer needs drive strategy and operations."
            },
            {
                question: "What is holistic marketing?",
                answer: "An integrated perspective connecting relationship marketing, internal marketing, integrated marketing, and performance marketing.",
                explanation: "Everything in business affects marketing outcomes."
            }
        ],

        quiz: [
            {
                question: "The marketing concept starts with:",
                options: ["Production capacity", "Customer needs", "Advertising budget", "Sales quotas"],
                correct: 1
            },
            {
                question: "The selling concept primarily emphasizes:",
                options: ["Relationship building", "Aggressive sales and promotion", "Sustainability first", "Customer co-creation"],
                correct: 1
            },
            {
                question: "Holistic marketing includes all EXCEPT:",
                options: ["Integrated marketing", "Internal marketing", "Relationship marketing", "Single-function marketing"],
                correct: 3
            }
        ],

        fillBlanks: [
            {
                sentence: "Modern marketing is about creating and exchanging _______.",
                answer: "value",
                hint: "Utility for customers..."
            },
            {
                sentence: "The marketing concept begins with understanding customer _______.",
                answer: "needs",
                hint: "Needs and wants..."
            },
            {
                sentence: "The selling concept focuses on maximizing sales _______.",
                answer: "volume",
                hint: "Quantity sold..."
            }
        ],

        learn: {
            title: "Unit 1 - Marketing as a Modern Business Concept",
            content: `
                <h3>From Product Logic to Customer Logic</h3>
                <ul>
                    <li><strong>Production concept:</strong> efficiency and output orientation</li>
                    <li><strong>Selling concept:</strong> persuasion and promotion orientation</li>
                    <li><strong>Marketing concept:</strong> customer need orientation</li>
                    <li><strong>Relationship/Holistic:</strong> long-term value networks</li>
                </ul>

                <div class="formula-box">
                    <p><strong>Marketing concept:</strong> Understand needs -> design value -> deliver better than competition</p>
                </div>

                <h4>Marketing Mix Reminder</h4>
                <p>Decisions are translated through product, price, distribution, and promotion.</p>

                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Midterm Focus</h4>
                    <p>Know differences among production, selling, marketing, and holistic concepts with practical examples.</p>
                </div>
            `
        }
    },

    marketingEnvironment: {
        name: "Marketing Environment",
        icon: "fa-globe-europe",
        color: "#0ea5e9",

        flashcards: [
            {
                question: "What is the difference between macro and micro marketing environment?",
                answer: "Macro factors are indirect and less controllable (PESTLE), while micro factors are direct actors close to the company (consumers, competitors, suppliers, distributors).",
                explanation: "Managers monitor macro and manage micro relationships."
            },
            {
                question: "What does PESTLE stand for?",
                answer: "Political, Economic, Social, Technological, Legal, Environmental factors.",
                explanation: "Framework for analyzing indirect environmental influences."
            },
            {
                question: "How do economic forces affect marketing decisions?",
                answer: "Business cycle, inflation, unemployment, and income levels affect purchasing power, demand, and pricing strategy.",
                explanation: "Demand is strongly linked to economic context."
            },
            {
                question: "Why are social and cultural forces important?",
                answer: "Values, lifestyles, social roles, and attitudes influence what people buy, where they buy, and how they evaluate brands.",
                explanation: "Consumer meaning shapes market behavior."
            },
            {
                question: "What is marketing intelligence?",
                answer: "Continuous collection and analysis of market data from external and internal sources to support better decisions.",
                explanation: "Key sources include social media, search trends, internal records, and industry signals."
            }
        ],

        quiz: [
            {
                question: "Which is a macroenvironment factor?",
                options: ["Suppliers", "Distributors", "Technological change", "Competitors"],
                correct: 2
            },
            {
                question: "PESTLE includes all EXCEPT:",
                options: ["Political", "Psychological", "Economic", "Environmental"],
                correct: 1
            },
            {
                question: "Consumers and competitors belong to:",
                options: ["Microenvironment", "Macroeconomics", "Internal accounting", "Financial reporting"],
                correct: 0
            }
        ],

        fillBlanks: [
            {
                sentence: "PESTLE analysis is used for _______ environmental factors.",
                answer: "macro",
                hint: "Indirect level..."
            },
            {
                sentence: "Consumers, suppliers and distributors are part of the _______ environment.",
                answer: "micro",
                hint: "Direct actors..."
            },
            {
                sentence: "Marketing _______ helps managers make data-informed decisions.",
                answer: "intelligence",
                hint: "Insight system..."
            }
        ],

        learn: {
            title: "Unit 2 - The Marketing Environment",
            content: `
                <h3>Macro vs Micro Influences</h3>
                <div class="formula-box">
                    <p><strong>Macro (indirect):</strong> PESTLE</p>
                    <p><strong>Micro (direct):</strong> consumers, competitors, suppliers, distributors</p>
                </div>

                <h4>Why Environment Analysis Matters</h4>
                <ul>
                    <li>Detect opportunities and threats early</li>
                    <li>Adjust marketing mix to external constraints</li>
                    <li>Reduce strategic surprises</li>
                </ul>

                <h4>Economic and Social Pressures</h4>
                <ul>
                    <li>Inflation and lower income reduce demand sensitivity</li>
                    <li>Lifestyle and value shifts change category preferences</li>
                    <li>Technology changes channel expectations and speed</li>
                </ul>
            `
        }
    },

    marketAndValueExchange: {
        name: "Market and Value Exchange",
        icon: "fa-exchange-alt",
        color: "#22c55e",

        flashcards: [
            {
                question: "What is a market in economic terms?",
                answer: "A market is an economic space where goods, services, and other transactions are exchanged between participants.",
                explanation: "Markets can be local, national, international, and digital."
            },
            {
                question: "What is value exchange?",
                answer: "A process where buyers and sellers exchange something of value, typically utility/satisfaction for money/time/commitment.",
                explanation: "Exchange is the core mechanism of marketing."
            },
            {
                question: "What are key conditions for exchange?",
                answer: "At least two parties, value for each party, communication and delivery ability, freedom to accept/reject, and perceived benefit.",
                explanation: "Without these conditions, exchange fails."
            },
            {
                question: "What are market discrepancies?",
                answer: "Differences between producers and buyers in space, time, information, value perception, ownership, quantity, and assortment.",
                explanation: "Marketing functions reduce these discrepancies."
            },
            {
                question: "Why are marketing functions necessary?",
                answer: "They bridge producer-consumer gaps and create utility for market participants.",
                explanation: "Utility is created through matching supply and demand conditions."
            }
        ],

        quiz: [
            {
                question: "Which is NOT a standard exchange condition?",
                options: ["Two parties", "Ability to communicate", "Mandatory purchase", "Perceived desirability"],
                correct: 2
            },
            {
                question: "Market discrepancy in information exists when:",
                options: ["Prices are low", "Buyers and sellers lack relevant knowledge about each other", "Demand is stable", "Products are digital"],
                correct: 1
            },
            {
                question: "Temporal discrepancy refers to mismatch in:",
                options: ["Location", "Time of production and consumption", "Ownership rights", "Product color"],
                correct: 1
            }
        ],

        fillBlanks: [
            {
                sentence: "Exchange means getting something of _______ for something else of value.",
                answer: "value",
                hint: "Utility word..."
            },
            {
                sentence: "Spatial discrepancy is a mismatch in market _______.",
                answer: "location",
                hint: "Where buyers/sellers are..."
            },
            {
                sentence: "Marketing functions reduce market _______.",
                answer: "discrepancies",
                hint: "Gaps/mismatches..."
            }
        ],

        learn: {
            title: "Unit 3 - The Market and Market-Oriented Business",
            content: `
                <h3>Value Exchange Logic</h3>
                <p>Markets work when both sides perceive value and can complete exchange under acceptable conditions.</p>

                <h4>Conditions for Exchange</h4>
                <ul>
                    <li>Two or more parties</li>
                    <li>Each side has something of value</li>
                    <li>Communication and delivery are possible</li>
                    <li>Acceptance/rejection is free</li>
                    <li>Exchange is desirable for both parties</li>
                </ul>

                <div class="warning-box">
                    <h4><i class="fas fa-exclamation-triangle"></i> Core Issue</h4>
                    <p>Producer logic and buyer logic often differ. Marketing exists to reconcile these differences.</p>
                </div>

                <h4>Main Discrepancy Types</h4>
                <ul>
                    <li>Spatial</li>
                    <li>Temporal</li>
                    <li>Information</li>
                    <li>Value perception</li>
                    <li>Ownership</li>
                    <li>Quantity and assortment</li>
                </ul>
            `
        }
    },

    segmentationTargetingPositioning: {
        name: "Segmentation and Positioning",
        icon: "fa-layer-group",
        color: "#8b5cf6",

        flashcards: [
            {
                question: "What is market segmentation?",
                answer: "Strategic division of a heterogeneous market into homogeneous groups with similar needs and wants.",
                explanation: "Segmentation allows tailored value propositions."
            },
            {
                question: "What are key segmentation advantages?",
                answer: "Better understanding of needs, more precise targeting, and more efficient use of marketing resources.",
                explanation: "Higher effectiveness and reduced waste."
            },
            {
                question: "What are the three major market selection approaches?",
                answer: "Undifferentiated (mass), differentiated, and concentrated marketing.",
                explanation: "Approach depends on resources and strategy."
            },
            {
                question: "What are common segmentation variables?",
                answer: "Geographic, demographic, psychographic, and behavioral variables.",
                explanation: "Combining variables gives more useful segments."
            },
            {
                question: "What is positioning?",
                answer: "Designing the offer and brand image so the target segment perceives a clear, distinct value in its mind.",
                explanation: "Positioning defines competitive place in customer perception."
            }
        ],

        quiz: [
            {
                question: "Segmentation is primarily used to:",
                options: ["Ignore customer differences", "Treat all customers identically", "Identify groups with similar needs", "Eliminate competition"],
                correct: 2
            },
            {
                question: "Concentrated marketing focuses on:",
                options: ["Entire market equally", "One selected segment", "Only price discounts", "Only online channels"],
                correct: 1
            },
            {
                question: "STP stands for:",
                options: ["Sales, Trade, Promotion", "Segmentation, Targeting, Positioning", "Strategy, Tactics, Planning", "Supply, Transport, Pricing"],
                correct: 1
            }
        ],

        fillBlanks: [
            {
                sentence: "Market segmentation identifies market _______ and segment homogeneity.",
                answer: "heterogeneity",
                hint: "Differences across market..."
            },
            {
                sentence: "After segmentation, firms choose a _______ market.",
                answer: "target",
                hint: "Selected segment..."
            },
            {
                sentence: "Positioning shapes consumer _______ of the brand.",
                answer: "perception",
                hint: "How people see it..."
            }
        ],

        learn: {
            title: "Unit 5 - Market Segmentation",
            content: `
                <h3>STP Framework</h3>
                <div class="formula-box">
                    <p><strong>Segmentation</strong> -> <strong>Targeting</strong> -> <strong>Positioning</strong></p>
                </div>

                <h4>Why Segment?</h4>
                <ul>
                    <li>Markets are heterogeneous</li>
                    <li>Needs differ by customer groups</li>
                    <li>One offer cannot optimally satisfy everyone</li>
                </ul>

                <h4>Selection Approaches</h4>
                <ul>
                    <li><strong>Undifferentiated:</strong> one mix for broad market</li>
                    <li><strong>Differentiated:</strong> tailored mixes for multiple segments</li>
                    <li><strong>Concentrated:</strong> focus on one key segment</li>
                </ul>

                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Midterm Focus</h4>
                    <p>Know segmentation variables and be able to justify which strategy fits a given case.</p>
                </div>
            `
        }
    },

    consumerBehaviourAndResearch: {
        name: "Consumer Behaviour and Research",
        icon: "fa-user-check",
        color: "#f97316",

        flashcards: [
            {
                question: "Who are B2C consumers and B2B consumers?",
                answer: "B2C consumers are individuals/households buying for personal use. B2B consumers buy for resale, production input, or operational use.",
                explanation: "Buying logic differs by market type."
            },
            {
                question: "What external factors influence B2C behaviour?",
                answer: "Economic conditions, culture, social groups, family roles/status, and market information.",
                explanation: "Context shapes purchase decisions."
            },
            {
                question: "What internal factors influence B2C behaviour?",
                answer: "Learning, personality, perception, attitudes, motivation, and beliefs.",
                explanation: "Internal psychology drives interpretation and choice."
            },
            {
                question: "What are the five steps of B2C buying decision process?",
                answer: "Problem recognition, information search, evaluation of alternatives, purchase decision, post-purchase evaluation.",
                explanation: "Standard consumer decision model."
            },
            {
                question: "What is the objective of market research?",
                answer: "To gather relevant data about target customers and markets so firms can make better marketing decisions.",
                explanation: "Research reduces uncertainty and improves strategy quality."
            },
            {
                question: "What is the difference between market research and marketing research?",
                answer: "Market research focuses mainly on customers/target market, while marketing research has broader scope including product, price, distribution, promotion, branding, and performance.",
                explanation: "Marketing research is wider in scope."
            },
            {
                question: "What are core stages of market research process?",
                answer: "Problem definition, research approach, research design, fieldwork, data preparation/analysis, and reporting.",
                explanation: "A structured process prevents weak conclusions."
            }
        ],

        quiz: [
            {
                question: "The first stage in consumer buying process is:",
                options: ["Purchase", "Problem recognition", "Post-purchase evaluation", "Alternative evaluation"],
                correct: 1
            },
            {
                question: "B2B buying center may include:",
                options: ["Only final user", "Initiator, influencer, buyer, decider, gatekeeper, users", "Only procurement manager", "Only supplier"],
                correct: 1
            },
            {
                question: "Market research process usually starts with:",
                options: ["Advertising campaign", "Problem definition", "Fieldwork", "Data visualization"],
                correct: 1
            },
            {
                question: "Qualitative and quantitative methods are examples of:",
                options: ["Pricing models", "Research approaches", "Distribution channels", "Consumer segments"],
                correct: 1
            }
        ],

        fillBlanks: [
            {
                sentence: "B2C buyers are final _______ consumers.",
                answer: "end",
                hint: "Opposite of business market..."
            },
            {
                sentence: "In B2B, a _______ controls the flow of information in buying center.",
                answer: "gatekeeper",
                hint: "Access controller role..."
            },
            {
                sentence: "Market research can use qualitative, quantitative, or _______ methods.",
                answer: "mixed",
                hint: "Combination approach..."
            }
        ],

        learn: {
            title: "Unit 6 + Market Research - Consumer Decisions and Evidence",
            content: `
                <h3>B2C vs B2B Consumer Logic</h3>
                <ul>
                    <li><strong>B2C:</strong> personal/household benefit and emotional factors</li>
                    <li><strong>B2B:</strong> organizational criteria, process discipline, multiple decision roles</li>
                </ul>

                <h4>B2C Behavioural Factors</h4>
                <ul>
                    <li><strong>External:</strong> economy, culture, social groups, family, offers</li>
                    <li><strong>Internal:</strong> motivation, learning, attitudes, perception, personality</li>
                </ul>

                <h4>B2C Buying Process</h4>
                <ol>
                    <li>Problem recognition</li>
                    <li>Information search</li>
                    <li>Alternative evaluation</li>
                    <li>Purchase decision</li>
                    <li>Post-purchase reaction</li>
                </ol>

                <h3>Market Research Essentials</h3>
                <div class="formula-box">
                    <p><strong>Goal:</strong> better decisions through relevant market evidence</p>
                </div>
                <ul>
                    <li>Clarify objective and problem</li>
                    <li>Choose method and data sources</li>
                    <li>Collect, analyze, and report actionable findings</li>
                </ul>

                <div class="warning-box">
                    <h4><i class="fas fa-exclamation-triangle"></i> Common Mistake</h4>
                    <p>Jumping to data collection before clearly defining the business problem leads to weak conclusions.</p>
                </div>
            `
        }
    }
};
