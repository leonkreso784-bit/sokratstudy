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
                <h3>1) Hospitality Mindset: Beyond Basic Service</h3>
                <div class="formula-box">
                    <p><strong>Service:</strong> transactional, standardized, reactive, process-focused</p>
                    <p><strong>Hospitality:</strong> personal, emotional, proactive, relationship-focused</p>
                </div>

                <h4>Why this distinction matters</h4>
                <ul>
                    <li>Service delivers what is promised; hospitality shapes how the guest feels</li>
                    <li>Hospitality converts one-time buyers into repeat guests</li>
                    <li>Experience quality becomes a source of competitive advantage</li>
                </ul>

                <h3>2) Why Hospitality is a Professional Skill</h3>
                <p>Hospitality is a set of soft skills and managerial attitudes: communication, empathy, anticipation, problem-solving, and emotional intelligence.</p>
                <ul>
                    <li>These skills are trainable and measurable</li>
                    <li>They are transferable to other service sectors</li>
                    <li>They increase perceived value and willingness to pay</li>
                </ul>

                <h3>3) Two Perspectives from the Presentation</h3>
                <h4>Customer view</h4>
                <ul>
                    <li>Hospitality creates trust, enjoyment, and relaxation</li>
                    <li>Trust reduces perceived risk and supports premium pricing</li>
                    <li>Satisfied guests are more likely to return and recommend</li>
                </ul>

                <h4>Management view</h4>
                <ul>
                    <li>Hospitality quality must be systematically managed</li>
                    <li>Guest journey must be designed end-to-end with no critical failures</li>
                    <li>Operations must support consistency under peak demand</li>
                </ul>

                <h3>4) Economic Specifics of Hospitality Activity</h3>
                <div class="example-box">
                    <p><strong>Local export logic:</strong> when foreign guests consume local hospitality services, the destination effectively exports without shipping goods abroad.</p>
                </div>
                <ul>
                    <li>Hospitality combines production and service work in one process</li>
                    <li>Production is often made-to-order and consumed immediately</li>
                    <li>Demand quality depends strongly on human interaction</li>
                </ul>

                <h3>5) Complexity of Hospitality Services</h3>
                <p>Hospitality service is multi-layered and includes different job families and outputs.</p>
                <ul>
                    <li><strong>Basic services:</strong> accommodation, food, beverages</li>
                    <li><strong>Supplementary services:</strong> reception, messages, guest communication, property upkeep</li>
                    <li><strong>Additional services:</strong> transport support, animation, sports, wellness, sales and extras</li>
                </ul>

                <h4>Operational implications</h4>
                <ul>
                    <li>High coordination needs across departments</li>
                    <li>Quality depends on training and service culture</li>
                    <li>Weak communication leads directly to cost and reputation loss</li>
                </ul>

                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Unit 1 Exam Focus</h4>
                    <p>Be able to explain: <strong>service vs hospitality</strong>, <strong>hospitality as skill</strong>, <strong>customer vs management view</strong>, and <strong>local export logic</strong>.</p>
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
                <h3>1) Business Economics in the Economic Science System</h3>
                <p>Economics studies rational allocation of scarce resources. Business economics focuses on the firm as the core microeconomic decision unit.</p>
                <ul>
                    <li><strong>Macroeconomics:</strong> economy-wide indicators (growth, inflation, unemployment)</li>
                    <li><strong>Microeconomics:</strong> firms, consumers, prices, market behavior</li>
                    <li><strong>Business economics:</strong> applied microeconomics at company level</li>
                </ul>

                <h3>2) Business Economics as Science and Teaching Discipline</h3>
                <h4>As science</h4>
                <ul>
                    <li>Analyzes factors influencing company performance</li>
                    <li>Develops rules to improve business outcomes</li>
                    <li>Builds models for decision support under uncertainty</li>
                </ul>

                <h4>As teaching subject</h4>
                <ul>
                    <li>Transfers validated knowledge to future managers and entrepreneurs</li>
                    <li>Explains business system logic and management processes</li>
                    <li>Connects theory with real company cases</li>
                </ul>

                <h3>3) General vs Special Business Economics</h3>
                <div class="formula-box">
                    <p><strong>General:</strong> problems common to all companies</p>
                    <p><strong>Special:</strong> sector, ownership, and function-specific economics</p>
                </div>

                <h4>Examples of special economics</h4>
                <ul>
                    <li>By activity: industrial, trade, transport, hotel, banking</li>
                    <li>By ownership: public vs private</li>
                    <li>By function: procurement, production, sales, logistics</li>
                </ul>

                <h3>4) Theory-Practice Relationship</h3>
                <ul>
                    <li>Theory explains and predicts business behavior</li>
                    <li>Practice tests assumptions and reveals new problems</li>
                    <li>New problems drive new theory and better managerial tools</li>
                </ul>

                <div class="warning-box">
                    <h4><i class="fas fa-exclamation-triangle"></i> Common Mistake</h4>
                    <p>Students often mix macro and micro scope. In this course, most questions are at <strong>firm level</strong>.</p>
                </div>

                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Unit 2 Exam Focus</h4>
                    <p>Know the hierarchy: <strong>economics -> macro/micro -> business economics -> hospitality economics</strong>.</p>
                </div>
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
                <h3>1) Conceptual Definition of Hospitality Business</h3>
                <p>A hospitality business is an independent, complex economic-legal-technical-social system that produces services for market needs and aims to generate profit and achieve strategic goals.</p>

                <h3>2) Firm as a Multi-System Structure</h3>
                <ul>
                    <li><strong>Technological system:</strong> transforms inputs into hospitality outputs</li>
                    <li><strong>Economic system:</strong> allocates resources and creates value</li>
                    <li><strong>Legal system:</strong> rights, obligations, contracts, compliance</li>
                    <li><strong>Sociological system:</strong> people, teams, culture, motivation</li>
                </ul>

                <h3>3) Essential Firm Components</h3>
                <div class="formula-box">
                    <p><strong>Objective component:</strong> buildings, equipment, materials, money</p>
                    <p><strong>Subjective component:</strong> people, knowledge, creativity</p>
                    <p><strong>Organizational component:</strong> integration of work and resources</p>
                </div>

                <h3>4) Entrepreneur, Management, and Entrepreneurship</h3>
                <h4>Entrepreneur profile</h4>
                <ul>
                    <li>Business judgement and opportunity recognition</li>
                    <li>Risk-taking and innovation orientation</li>
                    <li>Decision capability and leadership under uncertainty</li>
                </ul>

                <h4>Entrepreneurship vs Management</h4>
                <ul>
                    <li><strong>Entrepreneurship:</strong> initiates change and new ventures</li>
                    <li><strong>Management:</strong> coordinates ongoing processes and execution</li>
                </ul>

                <h3>5) Classification of Hospitality Businesses</h3>
                <ul>
                    <li><strong>By subject:</strong> accommodation + food + beverage, or partial combinations</li>
                    <li><strong>By size:</strong> small, medium, large</li>
                    <li><strong>By ownership:</strong> private/public/mixed</li>
                    <li><strong>By legal form:</strong> company forms and organizational structures</li>
                </ul>

                <div class="example-box">
                    <p><strong>Practical takeaway:</strong> strategy and structure must match the chosen business model and market segment.</p>
                </div>

                <div class="tip-box">
                    <h4><i class="fas fa-check-circle"></i> Unit 3 Exam Focus</h4>
                    <p>Prepare definitions: <strong>hospitality business</strong>, <strong>entrepreneur</strong>, <strong>entrepreneurship vs management</strong>, and <strong>firm classification criteria</strong>.</p>
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
                <h3>1) Concept and Types of Assets</h3>
                <p>In hospitality, assets can appear as money/securities, property, and rights. By business involvement, they are split into fixed and current assets.</p>
                <ul>
                    <li><strong>Fixed assets:</strong> used longer than one year, value transferred gradually</li>
                    <li><strong>Current assets:</strong> used within short cycle, value transferred fully</li>
                </ul>

                <h3>2) Why Asset Structure Matters</h3>
                <div class="formula-box">
                    <p><strong>Operational continuity</strong> depends on smooth conversion among asset forms.</p>
                </div>
                <ul>
                    <li>Insufficient working assets create service disruptions</li>
                    <li>Outdated fixed assets reduce quality and productivity</li>
                    <li>Poor structure increases total operating cost</li>
                </ul>

                <h3>3) Fixed Assets in Hospitality Practice</h3>
                <h4>Intangible fixed assets</h4>
                <ul>
                    <li>Research and development related spending</li>
                    <li>Concessions, trademarks, similar rights</li>
                    <li>Goodwill and other long-term intangibles</li>
                </ul>

                <h4>Tangible fixed assets</h4>
                <ul>
                    <li>Land, buildings, and facility structures</li>
                    <li>Equipment and installations (heating, cooling, utility systems)</li>
                    <li>Furniture, tools, vehicles, and supporting infrastructure</li>
                </ul>

                <h3>4) Maintenance, Renewal, and Risk Protection</h3>
                <ul>
                    <li>Current and investment maintenance are mandatory for continuity</li>
                    <li>Storage discipline protects food/material quality and reduces losses</li>
                    <li>Insurance coverage (fire, flood, damage, theft) protects asset base</li>
                </ul>

                <h3>5) Depreciation and Economic Logic</h3>
                <div class="example-box">
                    <p>Depreciation translates long-term asset usage into periodic cost, enabling realistic profitability measurement.</p>
                </div>

                <div class="warning-box">
                    <h4><i class="fas fa-exclamation-triangle"></i> Frequent Exam Trap</h4>
                    <p>Students mix asset type with liquidity category. Always separate <strong>what asset is</strong> from <strong>how long it is used</strong>.</p>
                </div>

                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Unit 4 Exam Focus</h4>
                    <p>Know definitions of fixed/current assets, examples in hospitality, and why maintenance + depreciation are economically critical.</p>
                </div>
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
                <h3>1) Why Cost Theory is Central in Hospitality</h3>
                <p>Hospitality profitability depends on cost behavior understanding: where costs come from, how they move, and how managers control them.</p>
                <div class="formula-box">
                    <p><strong>Cost management scope:</strong> origin + classification + allocation + behavior + control</p>
                </div>

                <h3>2) Core Terms: Cost, Expenditure, Consumption</h3>
                <ul>
                    <li><strong>Cost:</strong> value-expressed consumption of resources for business effect</li>
                    <li><strong>Expenditure:</strong> any monetary outflow from firm cash/bank</li>
                    <li><strong>Consumption:</strong> physical use of resources in process</li>
                </ul>

                <h3>3) Timing Relationships Between Cost and Expenditure</h3>
                <h4>Possible patterns</h4>
                <ul>
                    <li>Cost before expenditure (e.g., utility use invoiced later)</li>
                    <li>Cost and expenditure simultaneously (immediate paid service)</li>
                    <li>Expenditure before cost (purchase first, consumption later)</li>
                </ul>

                <h3>4) When They Are Not Economically Identical</h3>
                <div class="warning-box">
                    <h4><i class="fas fa-exclamation-triangle"></i> Important Distinction</h4>
                    <p>Not every expenditure is a cost of the same period, and not every cost requires immediate cash outflow.</p>
                </div>
                <ul>
                    <li>Land purchase: expenditure exists, but no depreciation expense from land use</li>
                    <li>Donated asset: no expenditure at acquisition, but depreciation cost exists later</li>
                </ul>

                <h3>5) Why Cost Classification Matters for Decisions</h3>
                <ul>
                    <li>Pricing and menu decisions</li>
                    <li>Budget planning and control</li>
                    <li>Profitability analysis by service/product</li>
                    <li>Capacity and resource utilization decisions</li>
                </ul>

                <div class="example-box">
                    <p><strong>Managerial message:</strong> revenue growth without cost discipline rarely creates stable long-term profitability.</p>
                </div>

                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Unit 5 Exam Focus</h4>
                    <p>Prepare to explain practical examples where <strong>cost</strong> and <strong>expenditure</strong> differ in meaning and timing.</p>
                </div>
            `
        }
    }
};
