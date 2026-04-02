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
            },
            {
                question: "What is relationship marketing in practical terms?",
                answer: "Building long-term cooperation with consumers, suppliers, distributors, and other market actors to create durable value.",
                explanation: "It goes beyond one-time transactions."
            },
            {
                question: "Why did modern firms move from mass production logic to marketing logic?",
                answer: "Because markets became competitive, customers became more informed, and value differentiation became more important than simple output volume.",
                explanation: "Competition shifted the source of advantage."
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
            },
            {
                question: "The production concept is strongest when:",
                options: ["Demand is weak and fragmented", "Demand exceeds supply", "Consumers compare many alternatives", "Brand loyalty is high"],
                correct: 1
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
            },
            {
                sentence: "Holistic marketing implies an _______ perspective across functions.",
                answer: "integrated",
                hint: "Not fragmented..."
            }
        ],

        learn: {
            title: "Unit 1 - Marketing as a Modern Business Concept",
            content: `
                <h3>1) Why Marketing Became a Core Business Logic</h3>
                <p>In modern competition, firms no longer win only with production capacity. They win by understanding who the customer is, what problem they solve, and why the offering is superior to alternatives.</p>

                <h3>2) Evolution of Business Concepts</h3>
                <ul>
                    <li><strong>Production concept:</strong> make efficiently and lower costs</li>
                    <li><strong>Selling concept:</strong> push existing products via promotion</li>
                    <li><strong>Marketing concept:</strong> start from customer needs and wants</li>
                    <li><strong>Relationship/Holistic:</strong> manage networks and integrated value creation</li>
                </ul>

                <div class="formula-box">
                    <p><strong>Marketing concept:</strong> Understand needs -> design value -> deliver better than competition</p>
                </div>

                <h3>3) Strategic Meaning of Marketing Concept</h3>
                <ul>
                    <li>Customer value is defined before product design</li>
                    <li>Competitive advantage comes from better fit, not only lower price</li>
                    <li>Profit is achieved by satisfying target customers efficiently</li>
                </ul>

                <h3>4) Marketing Mix as Execution System</h3>
                <p>Strategy is implemented through the marketing mix: <strong>product, price, distribution, promotion</strong>.</p>
                <ul>
                    <li>Product defines utility and differentiation</li>
                    <li>Price defines value-for-money perception</li>
                    <li>Distribution defines accessibility and convenience</li>
                    <li>Promotion defines communication and persuasion</li>
                </ul>

                <h3>5) Relationship and Holistic Marketing</h3>
                <div class="example-box">
                    <p><strong>Relationship marketing:</strong> include suppliers, distributors, and consumers as partners in value delivery.</p>
                    <p><strong>Holistic marketing:</strong> all business functions influence market outcomes.</p>
                </div>

                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Midterm Focus</h4>
                    <p>Prepare clear differences between production, selling, marketing, and holistic concepts, plus one practical example for each.</p>
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
            },
            {
                question: "Why must firms react to macroenvironmental factors even if they cannot control them?",
                answer: "Because macro forces shape demand, costs, regulation, and customer behavior. Ignoring them creates strategic risk.",
                explanation: "Adaptation is mandatory when control is impossible."
            },
            {
                question: "What is the role of legal and environmental factors in marketing decisions?",
                answer: "They set boundaries for acceptable market behavior, compliance obligations, and sustainability expectations that affect product, communication, and operations.",
                explanation: "Legality and sustainability are strategic constraints and opportunities."
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
            },
            {
                question: "Which statement is true?",
                options: ["Macro factors are directly controllable", "Micro factors are always uncontrollable", "Macro factors require monitoring and strategic response", "PESTLE is a pricing model"],
                correct: 2
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
            },
            {
                sentence: "Political, economic, social, technological, legal and environmental factors are summarized as _______.",
                answer: "PESTLE",
                hint: "Six-letter framework..."
            }
        ],

        learn: {
            title: "Unit 2 - The Marketing Environment",
            content: `
                <h3>1) Marketing Environment as Decision Context</h3>
                <p>Every marketing decision is made inside an environment the firm partly controls (micro) and partly cannot control (macro).</p>

                <h3>2) Macro vs Micro Influences</h3>
                <div class="formula-box">
                    <p><strong>Macro (indirect):</strong> PESTLE</p>
                    <p><strong>Micro (direct):</strong> consumers, competitors, suppliers, distributors</p>
                </div>

                <h4>Why environment analysis matters</h4>
                <ul>
                    <li>Detect opportunities and threats early</li>
                    <li>Adjust marketing mix to external constraints</li>
                    <li>Reduce strategic surprises</li>
                </ul>

                <h3>3) PESTLE in Practice</h3>
                <ul>
                    <li><strong>Political:</strong> policy support, trade measures, institutional stability</li>
                    <li><strong>Economic:</strong> inflation, income, unemployment, cycles</li>
                    <li><strong>Social:</strong> values, lifestyle, demographic shifts</li>
                    <li><strong>Technological:</strong> digital channels, automation, data tools</li>
                    <li><strong>Legal:</strong> compliance, consumer rights, market rules</li>
                    <li><strong>Environmental:</strong> sustainability pressure and regulation</li>
                </ul>

                <h3>4) Economic and Social Pressures</h3>
                <ul>
                    <li>Inflation and lower income reduce demand sensitivity</li>
                    <li>Lifestyle and value shifts change category preferences</li>
                    <li>Technology changes channel expectations and speed</li>
                </ul>

                <h3>5) Marketing Intelligence and Information System</h3>
                <div class="example-box">
                    <p>Good marketing intelligence combines internal records with external data from search, social media, platforms, and industry signals.</p>
                </div>
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
            },
            {
                question: "What is discrepancy of value in exchange?",
                answer: "Producers value offers through costs and target prices, while consumers value offers through perceived benefits and purchasing power.",
                explanation: "Value is not identical for both sides."
            },
            {
                question: "What is discrepancy of ownership?",
                answer: "Producers own products before sale, while consumers seek ownership after purchase. Exchange legally transfers this ownership.",
                explanation: "Ownership transfer is central to market transaction structure."
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
            },
            {
                question: "Quantity discrepancy appears because:",
                options: ["Consumers always buy in bulk", "Producers and consumers need identical quantities", "Production scale and consumer purchase units differ", "Only price differs"],
                correct: 2
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
            },
            {
                sentence: "Temporal discrepancy is a mismatch in _______.",
                answer: "time",
                hint: "When supply and demand happen..."
            }
        ],

        learn: {
            title: "Unit 3 - The Market and Market-Oriented Business",
            content: `
                <h3>1) Market as an Exchange Space</h3>
                <p>A market is the space where value exchange occurs through offers, demand, and transactions.</p>

                <h3>2) Value Exchange Logic</h3>
                <p>Markets work when both sides perceive value and can complete exchange under acceptable conditions.</p>

                <h4>Conditions for Exchange</h4>
                <ul>
                    <li>Two or more parties</li>
                    <li>Each side has something of value</li>
                    <li>Communication and delivery are possible</li>
                    <li>Acceptance/rejection is free</li>
                    <li>Exchange is desirable for both parties</li>
                </ul>

                <h3>3) Why Discrepancies Exist</h3>
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

                <h3>4) Utility Creation for Market Participants</h3>
                <ul>
                    <li><strong>Form utility:</strong> transforming input into useful offer</li>
                    <li><strong>Place utility:</strong> making offer available where needed</li>
                    <li><strong>Time utility:</strong> making offer available when needed</li>
                    <li><strong>Possession utility:</strong> enabling ownership/use transfer</li>
                </ul>

                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Midterm Focus</h4>
                    <p>Be ready to explain each discrepancy with a practical hospitality or retail example.</p>
                </div>
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
            },
            {
                question: "What is segment evaluation about?",
                answer: "Assessing segment size, growth, accessibility, profitability, strategic fit, and competitive intensity before choosing targets.",
                explanation: "Not every segment is attractive or feasible."
            },
            {
                question: "Why can concentrated marketing be powerful?",
                answer: "Because focused resources can create stronger relevance and differentiation in a chosen niche.",
                explanation: "Focus often beats spread resources in constrained firms."
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
            },
            {
                question: "Which segmentation variable refers to loyalty and usage patterns?",
                options: ["Demographic", "Geographic", "Behavioral", "Legal"],
                correct: 2
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
            },
            {
                sentence: "STP means segmentation, targeting and _______.",
                answer: "positioning",
                hint: "Third step..."
            }
        ],

        learn: {
            title: "Unit 5 - Market Segmentation",
            content: `
                <h3>1) STP as Core Strategic Sequence</h3>
                <div class="formula-box">
                    <p><strong>Segmentation</strong> -> <strong>Targeting</strong> -> <strong>Positioning</strong></p>
                </div>

                <h4>Why segment?</h4>
                <ul>
                    <li>Markets are heterogeneous</li>
                    <li>Needs differ by customer groups</li>
                    <li>One offer cannot optimally satisfy everyone</li>
                </ul>

                <h3>2) Selection Approaches</h3>
                <ul>
                    <li><strong>Undifferentiated:</strong> one mix for broad market</li>
                    <li><strong>Differentiated:</strong> tailored mixes for multiple segments</li>
                    <li><strong>Concentrated:</strong> focus on one key segment</li>
                </ul>

                <h3>3) Segmentation Variables</h3>
                <ul>
                    <li><strong>Geographic:</strong> location, region, urban/rural patterns</li>
                    <li><strong>Demographic:</strong> age, income, education, family status</li>
                    <li><strong>Psychographic:</strong> lifestyle, values, personality</li>
                    <li><strong>Behavioral:</strong> usage, loyalty, benefits sought</li>
                </ul>

                <h3>4) Segment Evaluation and Target Selection</h3>
                <div class="example-box">
                    <p>Attractive segments are measurable, reachable, profitable, and aligned with firm capabilities.</p>
                </div>

                <h3>5) Positioning Discipline</h3>
                <p>Positioning defines what the brand should mean in the target segment's mind and how it differs from competitors.</p>
                <ul>
                    <li>Value proposition must be clear and relevant</li>
                    <li>Messaging must be consistent across channels</li>
                    <li>Operations must deliver the promised position</li>
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
            },
            {
                question: "What are common B2B buying center roles?",
                answer: "Initiator, influencer, buyer, decider, gatekeeper, and user.",
                explanation: "B2B decisions are usually multi-person and role-based."
            },
            {
                question: "What is the practical difference between qualitative and quantitative research?",
                answer: "Qualitative explores meanings, motives, and depth; quantitative measures patterns, frequencies, and statistical relationships.",
                explanation: "Methods answer different question types."
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
            },
            {
                question: "Which sequence is correct in B2C buying process?",
                options: ["Purchase -> need recognition -> evaluation", "Need recognition -> search -> evaluation -> purchase -> post-purchase", "Evaluation -> search -> purchase -> need", "Search -> post-purchase -> purchase"],
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
            },
            {
                sentence: "In B2B buying center, the _______ makes the final purchase decision.",
                answer: "decider",
                hint: "Final authority role..."
            }
        ],

        learn: {
            title: "Unit 6 + Market Research - Consumer Decisions and Evidence",
            content: `
                <h3>1) B2C vs B2B Consumer Logic</h3>
                <ul>
                    <li><strong>B2C:</strong> personal/household benefit and emotional factors</li>
                    <li><strong>B2B:</strong> organizational criteria, process discipline, multiple decision roles</li>
                </ul>

                <h3>2) B2C Behavioural Factors</h3>
                <ul>
                    <li><strong>External:</strong> economy, culture, social groups, family, offers</li>
                    <li><strong>Internal:</strong> motivation, learning, attitudes, perception, personality</li>
                </ul>

                <h4>B2C buying process</h4>
                <ol>
                    <li>Problem recognition</li>
                    <li>Information search</li>
                    <li>Alternative evaluation</li>
                    <li>Purchase decision</li>
                    <li>Post-purchase reaction</li>
                </ol>

                <h3>3) B2B Buying Process and Roles</h3>
                <ul>
                    <li>Need/problem recognition</li>
                    <li>Specification and supplier search</li>
                    <li>Evaluation of alternatives</li>
                    <li>Selection and purchase</li>
                    <li>Post-purchase evaluation</li>
                </ul>
                <p>Typical roles: initiator, influencer, buyer, decider, gatekeeper, user.</p>

                <h3>4) Market Research Essentials</h3>
                <div class="formula-box">
                    <p><strong>Goal:</strong> better decisions through relevant market evidence</p>
                </div>
                <ul>
                    <li>Clarify objective and problem</li>
                    <li>Choose method and data sources</li>
                    <li>Collect, analyze, and report actionable findings</li>
                </ul>

                <h4>Methodological approaches</h4>
                <ul>
                    <li><strong>Qualitative:</strong> interviews, focus groups, deep understanding</li>
                    <li><strong>Quantitative:</strong> surveys, measurement, statistics</li>
                    <li><strong>Mixed methods:</strong> combine depth and measurement</li>
                </ul>

                <div class="warning-box">
                    <h4><i class="fas fa-exclamation-triangle"></i> Common Mistake</h4>
                    <p>Jumping to data collection before clearly defining the business problem leads to weak conclusions.</p>
                </div>

                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Midterm Focus</h4>
                    <p>Be able to compare B2C and B2B buying behavior and explain full market research process stages.</p>
                </div>
            `
        }
    }
};
