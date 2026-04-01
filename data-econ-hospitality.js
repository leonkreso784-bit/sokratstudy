// ===== ECONOMICS IN HOSPITALITY - FIRST MIDTERM =====
// Source basis: Unit 1-5 PDF presentations from economics in hospitality folder.

const economicsHospitalityData = {
    unit1HospitalityBasics: {
        name: "Unit 1: Hospitality Basics",
        icon: "fa-concierge-bell",
        color: "#0ea5e9",

        flashcards: [
            {
                question: "What is the key difference between service and hospitality?",
                answer: "Service is transactional and standardized, while hospitality is personal, proactive, emotional, and focused on anticipating guest needs.",
                explanation: "Hospitality creates memorable guest experiences beyond basic service delivery."
            },
            {
                question: "Why is hospitality considered a skill?",
                answer: "Because it depends on soft skills, mindset, communication, empathy, and customer-oriented behavior that can be trained and transferred to other fields.",
                explanation: "Hospitality skillset has value beyond hotels and restaurants."
            },
            {
                question: "What is the customer view of hospitality?",
                answer: "Hospitality delivers enjoyment, trust, relaxation, and willingness to pay by meeting and exceeding expectations.",
                explanation: "Customer perception is central to repeat visits and loyalty."
            },
            {
                question: "What is the management view of hospitality?",
                answer: "Management must design and deliver a consistent guest experience that brings customers back and avoids service failures.",
                explanation: "Hospitality quality must be operationalized, not left to chance."
            },
            {
                question: "How is hospitality activity economically specific?",
                answer: "It performs a local export by selling services to foreign tourists and combines production and service processes in one operation.",
                explanation: "Hospitality has mixed production-service characteristics."
            },
            {
                question: "What are the key characteristics of hospitality services?",
                answer: "Intangibility, heterogeneity, inseparability from provider, perishability, and strong dependence on human performance.",
                explanation: "These traits shape pricing, quality control, and staffing."
            }
        ],

        quiz: [
            {
                question: "Hospitality is best described as:",
                options: [
                    "Only standardized procedures",
                    "A personal and proactive guest approach",
                    "Only technical efficiency",
                    "Only food production"
                ],
                correct: 1
            },
            {
                question: "A core difference is that service is often reactive, while hospitality is:",
                options: ["Passive", "Proactive", "Random", "Automated"],
                correct: 1
            },
            {
                question: "Selling hospitality services to foreign tourists is often considered:",
                options: ["Import", "Neutral exchange", "Local export", "Barter"],
                correct: 2
            },
            {
                question: "Which trait means a service cannot be tested before consumption?",
                options: ["Tangibility", "Intangibility", "Durability", "Ownership transfer"],
                correct: 1
            }
        ],

        fillBlanks: [
            {
                sentence: "Service is transactional; hospitality is _______.",
                answer: "personal",
                hint: "Human-centered word..."
            },
            {
                sentence: "Hospitality is typically _______ in anticipating needs, not reactive.",
                answer: "proactive",
                hint: "Starts with pro..."
            },
            {
                sentence: "Selling to foreign tourists is a form of local _______.",
                answer: "export",
                hint: "Opposite of import..."
            }
        ],

        learn: {
            title: "Unit 1 - Basics of Hospitality Industry",
            content: `
                <h3>Service vs Hospitality</h3>
                <div class="formula-box">
                    <p><strong>Service:</strong> transactional, procedural, reactive</p>
                    <p><strong>Hospitality:</strong> personal, emotional, proactive</p>
                </div>

                <h4>Why It Matters in Economics</h4>
                <ul>
                    <li>Guest experience affects willingness to pay and repeat demand</li>
                    <li>People skills are productive assets in hospitality firms</li>
                    <li>Service failures create direct revenue loss and reputation costs</li>
                </ul>

                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Midterm Focus</h4>
                    <p>Know both perspectives: <strong>customer value</strong> and <strong>management responsibility</strong>.</p>
                </div>
            `
        }
    },

    unit2BusinessEconomics: {
        name: "Unit 2: Business Economics",
        icon: "fa-chart-line",
        color: "#14b8a6",

        flashcards: [
            {
                question: "What is the core goal of economics as a science?",
                answer: "Rational use of limited resources to satisfy unlimited needs as effectively as possible.",
                explanation: "Scarcity and allocation are central economic problems."
            },
            {
                question: "What is the difference between macroeconomics and microeconomics?",
                answer: "Macroeconomics studies aggregate economy-wide issues; microeconomics studies households, consumers, firms, demand, supply, and prices.",
                explanation: "Business economics belongs to the microeconomic domain."
            },
            {
                question: "How is business economics defined as a science?",
                answer: "A key microeconomic discipline that studies management at firm level and identifies rules for improving business success.",
                explanation: "It links theory with managerial decision-making."
            },
            {
                question: "What is the purpose of business economics as a teaching subject?",
                answer: "To transfer validated knowledge and train future professionals to understand and manage business systems.",
                explanation: "Education translates science into managerial capability."
            },
            {
                question: "How is business economics divided?",
                answer: "Into general business economics (common firm problems) and special business economics (sector, ownership, or function-specific problems).",
                explanation: "Hospitality economics is a special business economics field."
            },
            {
                question: "Why is business economics both theoretical and practical?",
                answer: "Theory explains and predicts, while practice verifies assumptions and generates new insights from real business problems.",
                explanation: "Theory-practice feedback loop is essential."
            }
        ],

        quiz: [
            {
                question: "Business economics is primarily classified as:",
                options: ["Macroeconomic science", "Microeconomic science", "Only finance", "Only accounting"],
                correct: 1
            },
            {
                question: "Macroeconomics studies topics such as:",
                options: ["Individual consumer choice only", "Economic growth, inflation, unemployment", "Menu engineering only", "Room cleaning standards"],
                correct: 1
            },
            {
                question: "General business economics studies:",
                options: ["Only banks", "Only hotels", "Problems common to all firms", "Only public enterprises"],
                correct: 2
            },
            {
                question: "As a teaching subject, business economics mainly aims to:",
                options: ["Replace management", "Train experts in business system logic", "Eliminate theory", "Focus only on taxes"],
                correct: 1
            }
        ],

        fillBlanks: [
            {
                sentence: "Business economics is one of the most important _______ sciences.",
                answer: "microeconomic",
                hint: "Small-level economics..."
            },
            {
                sentence: "Macroeconomics deals with the economy as a _______.",
                answer: "whole",
                hint: "Total system..."
            },
            {
                sentence: "Business economics connects theory and _______.",
                answer: "practice",
                hint: "Real-world application..."
            }
        ],

        learn: {
            title: "Unit 2 - Business Economics as Discipline",
            content: `
                <h3>Where Business Economics Fits</h3>
                <ul>
                    <li><strong>Micro level:</strong> firms, consumers, pricing, decisions</li>
                    <li><strong>Macro level:</strong> growth, inflation, unemployment</li>
                </ul>

                <div class="example-box">
                    <p><strong>Business economics:</strong> improving firm outcomes using validated rules and analysis.</p>
                </div>

                <h4>Main Divisions</h4>
                <ul>
                    <li><strong>General:</strong> common to all firms</li>
                    <li><strong>Special:</strong> sector-specific (e.g., hospitality), ownership, and functions</li>
                </ul>
            `
        }
    },

    unit3HospitalityBusinesses: {
        name: "Unit 3: Hospitality Businesses",
        icon: "fa-hotel",
        color: "#6366f1",

        flashcards: [
            {
                question: "How is a modern hospitality business conceptually defined?",
                answer: "An independent, complex economic, legal, technical, and social system producing hospitality services to satisfy market needs and achieve profit and strategic goals.",
                explanation: "Hospitality firm is a multi-dimensional business system."
            },
            {
                question: "Which system dimensions describe a hospitality business?",
                answer: "Technological, economic, legal, and sociological systems.",
                explanation: "The firm operates simultaneously in multiple system logics."
            },
            {
                question: "What are the essential components of the firm?",
                answer: "Objective component (assets), subjective component (people, ideas), and organizational component (how resources and work are integrated).",
                explanation: "Organization quality determines output quality."
            },
            {
                question: "Who is an entrepreneur in hospitality context?",
                answer: "A person with business judgement, innovation orientation, and risk-taking capacity who creates and develops ventures.",
                explanation: "Entrepreneurship and management are related but distinct."
            },
            {
                question: "What is the key difference between entrepreneurship and management?",
                answer: "Entrepreneurship drives change and innovation; management coordinates ongoing operations and resource use.",
                explanation: "Both are needed, but with different core missions."
            },
            {
                question: "By which criteria can hospitality businesses be classified?",
                answer: "By business subject, size, ownership, and legal form.",
                explanation: "Classification supports analysis and strategy design."
            }
        ],

        quiz: [
            {
                question: "A hospitality business is best viewed as:",
                options: ["Only a legal entity", "Only a technical facility", "A complex economic-social-legal system", "Only a kitchen and rooms"],
                correct: 2
            },
            {
                question: "Entrepreneurship primarily emphasizes:",
                options: ["Routine coordination", "Innovation and opportunity", "Only reporting", "Only compliance"],
                correct: 1
            },
            {
                question: "Management is mainly focused on:",
                options: ["Eliminating all risk", "Continuous operational coordination", "Only market entry", "Only ownership transfer"],
                correct: 1
            },
            {
                question: "Hospitality businesses can be divided by all EXCEPT:",
                options: ["Size", "Ownership", "Legal form", "Weather conditions"],
                correct: 3
            }
        ],

        fillBlanks: [
            {
                sentence: "Entrepreneurship is oriented toward innovation and _______.",
                answer: "change",
                hint: "Transformational word..."
            },
            {
                sentence: "Management coordinates the ongoing _______ process.",
                answer: "business",
                hint: "Operations and execution..."
            },
            {
                sentence: "A hospitality firm is a complex _______.",
                answer: "system",
                hint: "Interconnected structure..."
            }
        ],

        learn: {
            title: "Unit 3 - Hospitality Firm as a System",
            content: `
                <h3>Firm Logic in Hospitality</h3>
                <div class="formula-box">
                    <p><strong>Hospitality firm =</strong> people + assets + organization + market logic</p>
                </div>

                <h4>Core Distinction</h4>
                <ul>
                    <li><strong>Entrepreneurship:</strong> creates and renews ventures</li>
                    <li><strong>Management:</strong> stabilizes and coordinates operations</li>
                </ul>

                <div class="tip-box">
                    <h4><i class="fas fa-check-circle"></i> Exam Angle</h4>
                    <p>Be ready to explain firm dimensions and why hospitality firms are more than just service points.</p>
                </div>
            `
        }
    },

    unit4AssetsInHospitality: {
        name: "Unit 4: Assets and Reproduction",
        icon: "fa-warehouse",
        color: "#f59e0b",

        flashcards: [
            {
                question: "How are assets broadly classified by involvement in business process?",
                answer: "Into fixed assets (long-term) and short-term/current assets (working assets).",
                explanation: "This division is central for planning and control."
            },
            {
                question: "What is the main difference between fixed and short-term assets?",
                answer: "Fixed assets are used over more than one year and transfer value gradually; short-term assets are consumed within one cycle and transfer value fully.",
                explanation: "Different asset behavior drives different accounting treatment."
            },
            {
                question: "What does good asset management require in hospitality?",
                answer: "Rational use, proper storage, maintenance, investment renewal, and risk insurance for business continuity.",
                explanation: "Asset misuse directly increases cost and lowers service quality."
            },
            {
                question: "What are examples of tangible fixed assets in hospitality?",
                answer: "Land, buildings, equipment, installations, tools, furniture, and transport assets.",
                explanation: "These assets support long-term service capacity."
            },
            {
                question: "What is amortization (depreciation) economically?",
                answer: "Systematic transfer of fixed asset value to costs over useful life.",
                explanation: "Depreciation links long-term assets with period costs."
            },
            {
                question: "Why is optimal asset structure important?",
                answer: "It enables smooth conversion among asset forms and stable operational continuity.",
                explanation: "Poor structure creates bottlenecks and liquidity stress."
            }
        ],

        quiz: [
            {
                question: "Assets used for more than one year are generally:",
                options: ["Current assets", "Fixed assets", "Liabilities", "Equity"],
                correct: 1
            },
            {
                question: "Short-term assets transfer value to output:",
                options: ["Gradually over years", "Only when sold", "In full during one cycle", "Never"],
                correct: 2
            },
            {
                question: "Which is a tangible fixed asset example?",
                options: ["Brand goodwill", "Trade receivable", "Hotel building", "Cash register balance"],
                correct: 2
            },
            {
                question: "Depreciation primarily represents:",
                options: ["Tax payment", "Asset value transfer into costs", "Debt cancellation", "Revenue recognition"],
                correct: 1
            }
        ],

        fillBlanks: [
            {
                sentence: "Assets used longer than one year are usually _______ assets.",
                answer: "fixed",
                hint: "Long-term class..."
            },
            {
                sentence: "Current assets transfer their value in _______.",
                answer: "full",
                hint: "Not partial..."
            },
            {
                sentence: "Amortization is also called _______.",
                answer: "depreciation",
                hint: "Accounting term..."
            }
        ],

        learn: {
            title: "Unit 4 - Assets of Reproduction",
            content: `
                <h3>Fixed vs Current Assets</h3>
                <ul>
                    <li><strong>Fixed:</strong> long-term use, gradual value transfer</li>
                    <li><strong>Current:</strong> short-cycle use, full value transfer</li>
                </ul>

                <h4>Hospitality Asset Discipline</h4>
                <div class="warning-box">
                    <h4><i class="fas fa-exclamation-triangle"></i> Operational Risk</h4>
                    <p>Poor maintenance and weak storage controls increase costs and service disruption risk.</p>
                </div>

                <p>Management goal: maintain an optimal structure that supports continuity and growth.</p>
            `
        }
    },

    unit5CostTheory: {
        name: "Unit 5: Cost Theory",
        icon: "fa-calculator",
        color: "#ef4444",

        flashcards: [
            {
                question: "What is the role of cost theory in hospitality economics?",
                answer: "It analyzes origin, structure, behavior, and management relevance of costs for profitability and decision quality.",
                explanation: "Cost insight is central to business performance control."
            },
            {
                question: "How are costs generally defined?",
                answer: "Value-expressed consumption of resources used to realize business effects in line with firm goals.",
                explanation: "Costs must be connected to purposeful business activity."
            },
            {
                question: "What is the difference between costs and expenditures?",
                answer: "Costs relate to resource consumption for business effects; expenditures are money outflows that may or may not be costs.",
                explanation: "Timing and economic purpose can differ."
            },
            {
                question: "Can costs and expenditures occur at different times?",
                answer: "Yes. Cost may precede expenditure, coincide with expenditure, or follow expenditure depending on transaction and consumption timing.",
                explanation: "Economic and cash logic are not always synchronized."
            },
            {
                question: "When can expenditure exist without an immediate cost?",
                answer: "For example when acquiring non-depreciable land: cash outflow occurs, but no depreciation cost is recognized from land use itself.",
                explanation: "Not all expenditures convert into periodic costs in same way."
            },
            {
                question: "Why is cost classification important?",
                answer: "It supports pricing, budgeting, control, profitability analysis, and managerial decisions.",
                explanation: "Classification makes costs actionable for management."
            }
        ],

        quiz: [
            {
                question: "Cost theory primarily studies:",
                options: ["Only taxes", "Only wages", "Origin and behavior of costs", "Only asset valuation"],
                correct: 2
            },
            {
                question: "Expenditure is best described as:",
                options: ["Any money outflow", "Only profitable spending", "Only payroll", "Only variable cost"],
                correct: 0
            },
            {
                question: "Costs and expenditures:",
                options: ["Always coincide in time", "Never coincide", "May coincide or differ in timing", "Are legally identical"],
                correct: 2
            },
            {
                question: "The main managerial value of cost classification is:",
                options: ["Decorative reporting", "Better control and decisions", "Avoiding all risk", "Replacing strategy"],
                correct: 1
            }
        ],

        fillBlanks: [
            {
                sentence: "Costs are resources consumed to achieve business _______.",
                answer: "effects",
                hint: "Outputs/results..."
            },
            {
                sentence: "Expenditure means a money _______.",
                answer: "outflow",
                hint: "Cash leaving the firm..."
            },
            {
                sentence: "Costs and expenditures can differ in _______.",
                answer: "timing",
                hint: "When they are recognized..."
            }
        ],

        learn: {
            title: "Unit 5 - Theory of Costs in Hospitality",
            content: `
                <h3>Why Cost Theory Matters</h3>
                <p>Profitability in hospitality depends on understanding cost behavior, not only on raising revenue.</p>

                <div class="formula-box">
                    <p><strong>Cost focus:</strong> origin + classification + behavior + control</p>
                </div>

                <h4>Cost vs Expenditure</h4>
                <ul>
                    <li><strong>Cost:</strong> resource consumption for business effect</li>
                    <li><strong>Expenditure:</strong> monetary outflow</li>
                    <li>They can be linked, but not always at the same time</li>
                </ul>

                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Midterm Focus</h4>
                    <p>Be able to explain practical cases where expenditure exists but cost recognition differs.</p>
                </div>
            `
        }
    }
};
