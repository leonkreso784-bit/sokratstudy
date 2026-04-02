// ===== BUSINESS ENTREPRENEURSHIP - FINAL EXAM PREPARATION =====
// Comprehensive study material for final examination
// Includes: History, Psychology, Innovation, Franchising, Tourism, Social Entrepreneurship

const entrepreneurshipData = {
    
    // ========== CATEGORY 1: ENTREPRENEURSHIP HISTORY & THEORY ==========
    history: {
        name: "History & Theory",
        icon: "fa-history",
        color: "#6366f1",
        
        flashcards: [
            {
                question: "When and where did the term 'entrepreneur' originate?",
                answer: "1755 - From French word 'entreprendre' meaning 'ability to take charge, to undertake'\n\nIntroduced by Richard Cantillon who described entrepreneurs as economic agents who transform demand into supply.",
                explanation: "Cantillon is considered the father of entrepreneurship theory."
            },
            {
                question: "What is the PRE-Industrial Revolution view of an entrepreneur?",
                answer: "An entrepreneur is described as a RISK-TAKER who bears uncertainty.\n\nThey make decisions in uncertain economic contexts and profit is their reward for taking risks.",
                explanation: "Focus on risk and uncertainty."
            },
            {
                question: "What is the POST-Industrial Revolution view of an entrepreneur?",
                answer: "The fundamental role of the entrepreneur is to INNOVATE.\n\nShift from just risk-taking to creating new products, processes, and markets.",
                explanation: "Innovation becomes the defining characteristic."
            },
            {
                question: "What is MANAGERIAL CAPITALISM view of entrepreneur (Schumpeter)?",
                answer: "Entrepreneur realizes new 'PRODUCTIVE COMBINATIONS':\n\n1. New quality of good\n2. New method of production\n3. New market\n4. New source of supply of raw materials\n5. New organization of any industry",
                explanation: "Schumpeter's 5 productive combinations."
            },
            {
                question: "What is the NEOCLASSICAL ECONOMICS view?",
                answer: "Entrepreneur is an individual who is BOTH:\n• A risk-taker\n• An administrator\n\nCombines entrepreneurial innovation with managerial efficiency.",
                explanation: "Combines risk-taking with administrative skills."
            },
            {
                question: "What is the CONTEMPORARY view of entrepreneurship?",
                answer: "Emphasizes:\n• OPPORTUNITY recognition\n• ACTION and execution\n• FIRM CREATION\n\nVs Classic view: exploitation and personal gain",
                explanation: "Modern view focuses on opportunity and action."
            },
            {
                question: "What is the difference between Entrepreneurship and Management?",
                answer: "ENTREPRENEURSHIP:\n• Dynamic process\n• Takes own risk\n• Introduces new ideas/technologies\n• Realizes new ventures\n\nMANAGEMENT:\n• Responsible for maximizing individual contributions\n• Applies to all organizations\n• Optimizes existing operations",
                explanation: "Entrepreneurship creates, management optimizes."
            },
            {
                question: "What is ENTREPRENEURIAL MANAGEMENT?",
                answer: "The UNIFICATION of entrepreneurial and managerial functions within a business organization.\n\nBased on:\n• Constant innovation\n• Focused achievement of business goals\n• Growth and development of the company",
                explanation: "Combines both entrepreneurial and managerial approaches."
            }
        ],
        
        quiz: [
            {
                question: "The term 'entrepreneur' evolved from which French word?",
                options: [
                    "Entreprise",
                    "Entreprendre",
                    "Entrepot",
                    "Entrer"
                ],
                correct: 1
            },
            {
                question: "Who introduced the concept of entrepreneur in 1755?",
                options: [
                    "Adam Smith",
                    "Richard Cantillon",
                    "Joseph Schumpeter",
                    "Karl Marx"
                ],
                correct: 1
            },
            {
                question: "Post-Industrial Revolution, the fundamental role of entrepreneur is to:",
                options: [
                    "Take risks",
                    "Innovate",
                    "Manage employees",
                    "Pay taxes"
                ],
                correct: 1
            },
            {
                question: "How many 'productive combinations' did Schumpeter identify?",
                options: [
                    "3",
                    "4",
                    "5",
                    "7"
                ],
                correct: 2
            },
            {
                question: "Neoclassical economics views entrepreneur as both:",
                options: [
                    "Worker and manager",
                    "Risk-taker and administrator",
                    "Buyer and seller",
                    "Producer and consumer"
                ],
                correct: 1
            },
            {
                question: "Contemporary view of entrepreneurship emphasizes:",
                options: [
                    "Exploitation and personal gain",
                    "Opportunity, action, and firm creation",
                    "Government support",
                    "Minimum investment"
                ],
                correct: 1
            },
            {
                question: "Entrepreneurial Management combines:",
                options: [
                    "Sales and marketing",
                    "Entrepreneurial and managerial functions",
                    "HR and accounting",
                    "Production and distribution"
                ],
                correct: 1
            },
            {
                question: "Which is NOT one of Schumpeter's productive combinations?",
                options: [
                    "New quality of good",
                    "New method of production",
                    "New advertising strategy",
                    "New market"
                ],
                correct: 2
            }
        ],
        
        fillBlanks: [
            {
                sentence: "The term entrepreneur comes from French word _______ meaning 'to undertake'.",
                answer: "entreprendre",
                hint: "French word..."
            },
            {
                sentence: "Richard Cantillon introduced the entrepreneur concept in _______.",
                answer: "1755",
                hint: "18th century year..."
            },
            {
                sentence: "Post-Industrial Revolution, entrepreneurs' role is to _______.",
                answer: "innovate",
                hint: "Create something new..."
            },
            {
                sentence: "Schumpeter said entrepreneurs realize new productive _______.",
                answer: "combinations",
                hint: "Mixing things..."
            },
            {
                sentence: "_______ Management unifies entrepreneurial and managerial functions.",
                answer: "Entrepreneurial",
                hint: "Type of management..."
            }
        ],
        
        learn: {
            title: "History and Theory of Entrepreneurship",
            content: `
                <h3>Origins of Entrepreneurship</h3>
                <div class="formula-box">
                    <strong>1755 - Richard Cantillon</strong><br>
                    French: "entreprendre" = to undertake<br>
                    Entrepreneurs transform demand into supply<br>
                    Profit = reward for risk-taking
                </div>
                
                <h4>Evolution of Entrepreneurship Theory</h4>
                
                <div class="tip-box">
                    <h4><i class="fas fa-history"></i> Historical Views</h4>
                    <ul>
                        <li><strong>Pre-Industrial:</strong> Risk-taker, bears uncertainty</li>
                        <li><strong>Post-Industrial:</strong> Innovator, creates new things</li>
                        <li><strong>Managerial Capitalism:</strong> Creates productive combinations</li>
                        <li><strong>Neoclassical:</strong> Risk-taker + Administrator</li>
                    </ul>
                </div>
                
                <h4>Schumpeter's 5 Productive Combinations</h4>
                <ul>
                    <li>New quality of good</li>
                    <li>New method of production</li>
                    <li>New market</li>
                    <li>New source of supply of raw materials</li>
                    <li>New organization of any industry</li>
                </ul>
                
                <h4>Contemporary vs Classic View</h4>
                <div class="example-box">
                    <h4>Contemporary (Modern)</h4>
                    <p>Opportunity → Action → Firm Creation</p>
                    <h4>Classic (Traditional)</h4>
                    <p>Exploitation → Personal Gain</p>
                </div>
                
                <h4>Entrepreneurship vs Management</h4>
                <div class="formula-box">
                    <strong>ENTREPRENEURSHIP</strong> = Dynamic, Risk, Innovation, New ventures<br>
                    <strong>MANAGEMENT</strong> = Optimization, Efficiency, Existing operations<br>
                    <strong>ENTREPRENEURIAL MANAGEMENT</strong> = Both combined!
                </div>
            `
        }
    },
    
    // ========== CATEGORY 2: ENTREPRENEUR PSYCHOLOGY ==========
    psychology: {
        name: "Entrepreneur Psychology",
        icon: "fa-brain",
        color: "#ec4899",
        
        flashcards: [
            {
                question: "What are the 4 key elements of psychological profiling of entrepreneurs?",
                answer: "1. NEED FOR ACHIEVEMENT - drive to excel\n2. LOCUS OF CONTROL - belief in controlling outcomes\n3. RISK-TAKING - willingness to take calculated risks\n4. INNOVATION & CREATIVITY - generating new ideas",
                explanation: "Four psychological characteristics that define entrepreneurs."
            },
            {
                question: "What are the main CHARACTER TRAITS of entrepreneurs?",
                answer: "• Need for independence\n• Need for achievement\n• Internal locus of control\n• Ability to live with risk and uncertainty\n• Opportunistic\n• Innovative, visionary\n• Self-confident\n• Proactive and decisive with high energy",
                explanation: "Personality traits common in successful entrepreneurs."
            },
            {
                question: "What is INTERNAL vs EXTERNAL Locus of Control?",
                answer: "INTERNAL Locus of Control:\n• Believe THEY control their destiny\n• Take responsibility for outcomes\n• More entrepreneurial\n\nEXTERNAL Locus of Control:\n• Believe external forces control outcomes\n• Blame circumstances\n• Less entrepreneurial",
                explanation: "Internal locus is linked to entrepreneurial success."
            },
            {
                question: "What is INTRAPRENEURSHIP?",
                answer: "Entrepreneurship WITHIN an existing organization.\n\n• Employees acting as entrepreneurs inside a company\n• Share many characteristics with entrepreneurs\n• May ultimately become MD/CEO of the company\n• Drive innovation from within",
                explanation: "Internal entrepreneurs within corporations."
            },
            {
                question: "What is TEAM ENTREPRENEURSHIP?",
                answer: "Creative teams working together on entrepreneurial ventures.\n\n• More realistic for contemporary business\n• Combines diverse skills and perspectives\n• Shares risk and responsibility\n• Better suited for complex ventures",
                explanation: "Modern collaborative approach to entrepreneurship."
            },
            {
                question: "What are the 3 TYPOLOGIES of Entrepreneurship?",
                answer: "1. ENTREPRENEURSHIP - Contemporary (opportunity-focused) vs Classic (exploitation-focused)\n\n2. INTRAPRENEURSHIP - Entrepreneurship within existing organizations\n\n3. TEAM ENTREPRENEURSHIP - Creative teams, collaborative approach",
                explanation: "Three main types of entrepreneurship."
            },
            {
                question: "What is the 'Need for Achievement' (nAch)?",
                answer: "A psychological drive to:\n• Excel and succeed\n• Set and accomplish challenging goals\n• Take personal responsibility\n• Seek feedback on performance\n• Prefer moderate risk\n\nStrongly linked to entrepreneurial success.",
                explanation: "McClelland's theory of achievement motivation."
            },
            {
                question: "What is entrepreneurship as a LINEAR PROCESS?",
                answer: "Three-step sequence:\n\n1. IDEA - generating the business concept\n2. BUSINESS PLAN - documenting strategy\n3. EXECUTION - implementing the plan\n\nSimplified view of entrepreneurial process.",
                explanation: "Simple model of entrepreneurship stages."
            }
        ],
        
        quiz: [
            {
                question: "Which is NOT part of psychological profiling of entrepreneurs?",
                options: [
                    "Need for Achievement",
                    "Locus of Control",
                    "Need for Popularity",
                    "Risk-taking"
                ],
                correct: 2
            },
            {
                question: "INTERNAL locus of control means:",
                options: [
                    "External forces control your destiny",
                    "You believe you control your destiny",
                    "Government controls business",
                    "Luck determines success"
                ],
                correct: 1
            },
            {
                question: "Intrapreneurship is:",
                options: [
                    "Starting a new company",
                    "Entrepreneurship within an existing organization",
                    "International business",
                    "Internet business"
                ],
                correct: 1
            },
            {
                question: "Team Entrepreneurship is considered:",
                options: [
                    "Outdated",
                    "More realistic for contemporary business",
                    "Only for sports",
                    "Less effective than solo"
                ],
                correct: 1
            },
            {
                question: "Which character trait is NOT typical for entrepreneurs?",
                options: [
                    "Need for independence",
                    "Risk aversion",
                    "Self-confidence",
                    "Proactive nature"
                ],
                correct: 1
            },
            {
                question: "The linear entrepreneurship process is:",
                options: [
                    "Market → Product → Sales",
                    "Idea → Business Plan → Execution",
                    "Funding → Hiring → Selling",
                    "Research → Development → Patent"
                ],
                correct: 1
            },
            {
                question: "Intrapreneurs may ultimately become:",
                options: [
                    "Unemployed",
                    "MD or CEO of the company",
                    "Government officials",
                    "Academics"
                ],
                correct: 1
            },
            {
                question: "Need for Achievement (nAch) includes preference for:",
                options: [
                    "High-risk gambling",
                    "Moderate risk with feedback",
                    "No risk at all",
                    "Random outcomes"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "_______ Locus of Control means believing you control your destiny.",
                answer: "Internal",
                hint: "Inside yourself..."
            },
            {
                sentence: "_______ is entrepreneurship within an existing organization.",
                answer: "Intrapreneurship",
                hint: "Intra- means within..."
            },
            {
                sentence: "Team _______ is more realistic for contemporary business.",
                answer: "Entrepreneurship",
                hint: "Working together on ventures..."
            },
            {
                sentence: "The linear process is: Idea → Business Plan → _______.",
                answer: "Execution",
                hint: "Implementing the plan..."
            },
            {
                sentence: "Need for _______ is a drive to excel and succeed.",
                answer: "Achievement",
                hint: "Accomplishment..."
            }
        ],
        
        learn: {
            title: "Psychology of Entrepreneurs",
            content: `
                <h3>Psychological Profile of Entrepreneurs</h3>
                
                <div class="formula-box">
                    <strong>4 Key Psychological Elements:</strong><br>
                    1. Need for Achievement (nAch)<br>
                    2. Locus of Control<br>
                    3. Risk-Taking<br>
                    4. Innovation & Creativity
                </div>
                
                <h4>Character Traits of Entrepreneurs</h4>
                <ul>
                    <li>Need for independence</li>
                    <li>Need for achievement</li>
                    <li>Internal locus of control</li>
                    <li>Ability to live with risk and uncertainty</li>
                    <li>Opportunistic mindset</li>
                    <li>Innovative and visionary</li>
                    <li>Self-confident</li>
                    <li>Proactive and decisive with high energy</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-brain"></i> Locus of Control</h4>
                    <p><strong>INTERNAL:</strong> "I control my destiny" → More entrepreneurial<br>
                    <strong>EXTERNAL:</strong> "Fate controls outcomes" → Less entrepreneurial</p>
                </div>
                
                <h4>Three Typologies of Entrepreneurship</h4>
                <div class="example-box">
                    <h4>1. Entrepreneurship</h4>
                    <p>Contemporary: Opportunity + Action + Firm Creation<br>
                    Classic: Exploitation + Personal Gain</p>
                    
                    <h4>2. Intrapreneurship</h4>
                    <p>Entrepreneurship WITHIN existing organizations</p>
                    
                    <h4>3. Team Entrepreneurship</h4>
                    <p>Creative teams, more realistic for modern business</p>
                </div>
                
                <h4>Linear Entrepreneurship Process</h4>
                <div class="formula-box">
                    <strong>IDEA</strong> → <strong>BUSINESS PLAN</strong> → <strong>EXECUTION</strong>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 3: INNOVATION & FRANCHISING ==========
    innovation: {
        name: "Innovation & Franchising",
        icon: "fa-lightbulb",
        color: "#f59e0b",
        
        flashcards: [
            {
                question: "What is INNOVATION and how does it differ from INVENTION?",
                answer: "INNOVATION: Latin 'innovare' = to make something new\n\nDifference:\n• INVENTION = creating something new\n• INNOVATION = making something new USEFUL and BENEFICIAL\n\nIt's possible to invent something no one uses - that's not innovation!",
                explanation: "Innovation requires practical application and benefit."
            },
            {
                question: "What are Peter Drucker's 7 SOURCES OF OPPORTUNITY?",
                answer: "1. THE UNEXPECTED - surprises, failures, successes\n2. THE INCONGRUOUS - gaps between reality and perception\n3. PROCESS NEED - weak links in processes\n4. INDUSTRY & MARKET STRUCTURES - changes\n5. DEMOGRAPHICS - population changes\n6. CHANGES IN PERCEPTION - mood shifts\n7. NEW KNOWLEDGE - scientific discoveries",
                explanation: "Drucker's framework for finding innovation opportunities."
            },
            {
                question: "What are the 6 TYPES OF INNOVATION?",
                answer: "1. PRODUCT Innovation - new goods/services\n2. PROCESS Innovation - new production methods\n3. BUSINESS MODEL Innovation - new ways of creating value\n4. ORGANIZATIONAL Innovation - new structures\n5. MARKETING Innovation - new marketing methods\n6. OPEN Innovation - external collaboration",
                explanation: "Six categories of innovation."
            },
            {
                question: "What is DISCONTINUOUS (Radical) Innovation?",
                answer: "Also called RADICAL or REVOLUTIONARY innovation.\n\n• Game-changing, disruptive\n• Creates entirely new markets\n• Makes existing products obsolete\n• High risk, high reward\n\nExamples: Smartphones, Internet, Electric vehicles",
                explanation: "Major shifts that transform industries."
            },
            {
                question: "What are the BARRIERS TO INNOVATION?",
                answer: "• FINANCIAL CONSTRAINTS - lack of funding\n• ORGANIZATIONAL CULTURE - resistance to change\n• REGULATION & COMPLIANCE - legal barriers\n• MARKET ACCEPTANCE - customers unwilling to adopt\n• FEAR OF FAILURE - risk aversion\n• LACK OF SKILLS OR EXPERTISE - knowledge gaps",
                explanation: "Obstacles that prevent innovation."
            },
            {
                question: "What is FRANCHISING?",
                answer: "Selling the RIGHT to conduct a business.\n\nTwo parties:\n• FRANCHISOR - the original business (e.g., McDonald's)\n• FRANCHISEE - independent operator using the brand\n\nPopular LOW-RISK way of starting a business using established systems.",
                explanation: "Business model based on licensing."
            },
            {
                question: "What are the 2 FRANCHISE FORMATS?",
                answer: "1. PRODUCT FORMAT FRANCHISE:\n• Exclusive right to sell a product\n• In a specified territory\n• Example: Car dealerships\n\n2. BUSINESS FORMAT FRANCHISE:\n• Complete system of doing business\n• Trade name and trade secrets\n• Example: McDonald's, Subway",
                explanation: "Two main types of franchise arrangements."
            },
            {
                question: "What is INCREMENTAL vs RADICAL Innovation?",
                answer: "INCREMENTAL:\n• Gradual improvements\n• Small-scale changes\n• Lower risk\n• Continuous improvement\n\nRADICAL:\n• Disruptive, game-changing\n• Creates new markets\n• Higher risk\n• Revolutionary change",
                explanation: "Two extremes of innovation intensity."
            },
            {
                question: "What is OPEN INNOVATION?",
                answer: "Innovation through EXTERNAL collaboration:\n\n• Partnerships with other companies\n• Crowdsourcing ideas\n• University collaborations\n• Licensing external technologies\n• Open-source development\n\nOpposite of closed, internal R&D.",
                explanation: "Collaborative approach to innovation."
            }
        ],
        
        quiz: [
            {
                question: "The Latin word 'innovare' means:",
                options: [
                    "To copy",
                    "To make something new",
                    "To destroy",
                    "To improve"
                ],
                correct: 1
            },
            {
                question: "How many sources of opportunity did Peter Drucker identify?",
                options: [
                    "5",
                    "6",
                    "7",
                    "9"
                ],
                correct: 2
            },
            {
                question: "Which is NOT one of Drucker's sources of opportunity?",
                options: [
                    "The Unexpected",
                    "Demographics",
                    "Government Grants",
                    "New Knowledge"
                ],
                correct: 2
            },
            {
                question: "Discontinuous innovation is also called:",
                options: [
                    "Incremental innovation",
                    "Radical or revolutionary innovation",
                    "Process innovation",
                    "Marketing innovation"
                ],
                correct: 1
            },
            {
                question: "Which is a barrier to innovation?",
                options: [
                    "Abundant funding",
                    "Supportive culture",
                    "Fear of failure",
                    "Skilled workforce"
                ],
                correct: 2
            },
            {
                question: "In franchising, the FRANCHISOR is:",
                options: [
                    "The independent operator",
                    "The original business selling rights",
                    "The customer",
                    "The government"
                ],
                correct: 1
            },
            {
                question: "PRODUCT FORMAT franchise gives:",
                options: [
                    "Complete business system",
                    "Exclusive right to sell a product in a territory",
                    "Manufacturing rights",
                    "Marketing services"
                ],
                correct: 1
            },
            {
                question: "Open Innovation involves:",
                options: [
                    "Only internal R&D",
                    "External collaboration and partnerships",
                    "Keeping secrets",
                    "Solo development"
                ],
                correct: 1
            },
            {
                question: "Which innovation type involves new production methods?",
                options: [
                    "Product Innovation",
                    "Process Innovation",
                    "Marketing Innovation",
                    "Organizational Innovation"
                ],
                correct: 1
            },
            {
                question: "Innovation differs from invention because innovation:",
                options: [
                    "Is always patented",
                    "Must be useful and beneficial",
                    "Is more expensive",
                    "Happens first"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "Peter Drucker identified _______ sources of opportunity.",
                answer: "seven",
                hint: "Number 7..."
            },
            {
                sentence: "_______ innovation is gradual and small-scale.",
                answer: "Incremental",
                hint: "Step by step..."
            },
            {
                sentence: "_______ innovation is disruptive and game-changing.",
                answer: "Radical",
                hint: "Revolutionary..."
            },
            {
                sentence: "The _______ is the original business selling franchise rights.",
                answer: "franchisor",
                hint: "Ends in -or..."
            },
            {
                sentence: "_______ Innovation involves external collaboration.",
                answer: "Open",
                hint: "Not closed..."
            },
            {
                sentence: "Business Format Franchise includes trade name and trade _______.",
                answer: "secrets",
                hint: "Confidential information..."
            }
        ],
        
        learn: {
            title: "Innovation and Franchising",
            content: `
                <h3>Understanding Innovation</h3>
                
                <div class="formula-box">
                    <strong>INNOVATION ≠ INVENTION</strong><br>
                    Innovation = Making something new that is USEFUL<br>
                    Invention = Creating something new (may never be used)
                </div>
                
                <h4>Peter Drucker's 7 Sources of Opportunity</h4>
                <ol>
                    <li><strong>The Unexpected</strong> - surprises, failures, successes</li>
                    <li><strong>The Incongruous</strong> - gaps between reality and perception</li>
                    <li><strong>Process Need</strong> - weak links in processes</li>
                    <li><strong>Industry & Market Structures</strong> - changes</li>
                    <li><strong>Demographics</strong> - population changes</li>
                    <li><strong>Changes in Perception</strong> - mood shifts</li>
                    <li><strong>New Knowledge</strong> - scientific discoveries</li>
                </ol>
                
                <h4>6 Types of Innovation</h4>
                <div class="tip-box">
                    <ul>
                        <li><strong>Product</strong> - new goods/services</li>
                        <li><strong>Process</strong> - new production methods</li>
                        <li><strong>Business Model</strong> - new value creation</li>
                        <li><strong>Organizational</strong> - new structures</li>
                        <li><strong>Marketing</strong> - new marketing methods</li>
                        <li><strong>Open</strong> - external collaboration</li>
                    </ul>
                </div>
                
                <h4>Innovation Intensity</h4>
                <div class="example-box">
                    <p><strong>INCREMENTAL:</strong> Gradual, small-scale, low risk<br>
                    <strong>RADICAL (Discontinuous):</strong> Disruptive, game-changing, high risk</p>
                </div>
                
                <h4>Barriers to Innovation</h4>
                <ul>
                    <li>Financial Constraints</li>
                    <li>Organizational Culture</li>
                    <li>Regulation & Compliance</li>
                    <li>Market Acceptance</li>
                    <li>Fear of Failure</li>
                    <li>Lack of Skills</li>
                </ul>
                
                <hr>
                
                <h3>Franchising</h3>
                
                <div class="formula-box">
                    <strong>FRANCHISING</strong> = Selling the right to conduct a business<br><br>
                    <strong>FRANCHISOR</strong> = Original business (sells rights)<br>
                    <strong>FRANCHISEE</strong> = Independent operator (buys rights)
                </div>
                
                <h4>Two Franchise Formats</h4>
                <div class="warning-box">
                    <h4>1. Product Format Franchise</h4>
                    <p>Exclusive right to sell product in specified territory<br>
                    Example: Car dealerships</p>
                    
                    <h4>2. Business Format Franchise</h4>
                    <p>Complete system + trade name + trade secrets<br>
                    Example: McDonald's, Subway</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 4: PLANNING & TOOLS ==========
    planning: {
        name: "Planning & Tools",
        icon: "fa-clipboard-list",
        color: "#8b5cf6",
        
        flashcards: [
            {
                question: "What is the difference between PLANNING and a PLAN?",
                answer: "PLANNING is a verb (implies action) - the process of envisioning the future.\nA PLAN is a written description of the future you envision for your business.",
                explanation: "Planning is the action, a plan is the document."
            },
            {
                question: "What is the TRIM framework?",
                answer: "TRIM = Team, Resources, Idea, Market\n\nA planning tool that identifies:\n• Types of people needed for the team\n• Resources available and needed\n• Details of the idea\n• Potential market for the product/service",
                explanation: "TRIM helps structure early-stage planning."
            },
            {
                question: "What is the 'Back of a Napkin' technique?",
                answer: "A quick, informal planning method where entrepreneurs jot down spontaneous ideas on whatever is at hand (like a napkin in a cafe).\n\nNot formal enough for investors, but effective for gaining clarity on the business idea.",
                explanation: "Simple, spontaneous idea capture technique."
            },
            {
                question: "What is the Business Model Canvas (BMC)?",
                answer: "A visual plan that depicts the entire business on ONE PAGE with 9 blocks:\n1. Key Partners\n2. Key Activities\n3. Value Proposition\n4. Customer Relationships\n5. Customer Segments\n6. Key Resources\n7. Channels\n8. Cost Structure\n9. Revenue Streams",
                explanation: "BMC helps identify gaps and integrate business components."
            },
            {
                question: "What is a Business Brief?",
                answer: "A 2-3 page document outlining:\n• Company overview\n• Value proposition\n• Customer profile\n• Milestones\n\nGives stakeholders an at-a-glance understanding of who you are and the business potential.",
                explanation: "More detailed than BMC but shorter than a full business plan."
            },
            {
                question: "What is a Feasibility Study?",
                answer: "An essential planning tool that tests whether an initial idea is worth pursuing.\n\nFocuses on:\n• Market size\n• Suppliers & distributors\n• Skills of the entrepreneur\n\nDetermines if the idea is workable and profitable.",
                explanation: "Requires action, testing, information gathering, and analysis."
            },
            {
                question: "What is a Pitch Deck?",
                answer: "A brief presentation highlighting essential elements from feasibility study and business plan.\n\nUsed for:\n• Collegiate competitions\n• Accelerator/incubator applications\n• Angel and VC funding\n\nGoal: Get interest and secure the next meeting!",
                explanation: "The purpose is to describe and generate interest."
            },
            {
                question: "What are the 4 parts of a Business Plan?",
                answer: "1. BUSINESS CONCEPT - industry, structure, products, success strategy\n2. MARKET SECTION - customers, competitors\n3. IMPLEMENTATION - design, development, operations, management\n4. FINANCIAL SECTION - income, cash flow, balance sheets, projections",
                explanation: "A formal document outlining goals and how to reach them."
            }
        ],
        
        quiz: [
            {
                question: "TRIM framework stands for:",
                options: [
                    "Time, Revenue, Investment, Market",
                    "Team, Resources, Idea, Market",
                    "Technology, Research, Innovation, Management",
                    "Target, Results, Income, Money"
                ],
                correct: 1
            },
            {
                question: "How many blocks does the Business Model Canvas have?",
                options: ["5", "7", "9", "12"],
                correct: 2
            },
            {
                question: "A Feasibility Study determines:",
                options: [
                    "Only the market size",
                    "If the idea is workable and profitable",
                    "Employee salaries",
                    "Company logo design"
                ],
                correct: 1
            },
            {
                question: "What is the main goal of a Pitch Deck?",
                options: [
                    "To replace the business plan",
                    "To get interest and secure the next meeting",
                    "To hire employees",
                    "To calculate taxes"
                ],
                correct: 1
            },
            {
                question: "A Business Brief is typically:",
                options: [
                    "50+ pages",
                    "2-3 pages",
                    "1 sentence",
                    "100 slides"
                ],
                correct: 1
            },
            {
                question: "Which is NOT a block in the Business Model Canvas?",
                options: [
                    "Key Partners",
                    "Value Proposition",
                    "Employee Happiness",
                    "Revenue Streams"
                ],
                correct: 2
            }
        ],
        
        fillBlanks: [
            {
                sentence: "TRIM stands for Team, Resources, Idea, and _______.",
                answer: "Market",
                hint: "Where you sell..."
            },
            {
                sentence: "The Business Model Canvas has _______ blocks.",
                answer: "nine",
                hint: "9..."
            },
            {
                sentence: "A _______ Study tests if an idea is workable and profitable.",
                answer: "Feasibility",
                hint: "Is it feasible?"
            },
            {
                sentence: "Planning is a verb, a _______ is a written document.",
                answer: "plan",
                hint: "The noun form..."
            }
        ],
        
        learn: {
            title: "Planning Tools for Entrepreneurs",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
            content: `
                <h4>Types of Plans (Simple to Complex):</h4>
                <ul>
                    <li><strong>Back of Napkin</strong> - Quick, informal ideas</li>
                    <li><strong>Sketches on Page</strong> - How product works</li>
                    <li><strong>Business Model Canvas</strong> - 9 blocks, one page</li>
                    <li><strong>Business Brief</strong> - 2-3 pages for stakeholders</li>
                    <li><strong>Feasibility Study</strong> - Test if idea is viable</li>
                    <li><strong>Pitch Deck</strong> - Presentation for investors</li>
                    <li><strong>Business Plan</strong> - Full formal document</li>
                </ul>
                
                <div class="formula-box">
                    <strong>TRIM Framework</strong><br>
                    Team + Resources + Idea + Market
                </div>
                
                <h4>Business Model Canvas - 9 Blocks:</h4>
                <ul>
                    <li>Key Partners</li>
                    <li>Key Activities</li>
                    <li>Value Proposition</li>
                    <li>Customer Relationships</li>
                    <li>Customer Segments</li>
                    <li>Key Resources</li>
                    <li>Channels</li>
                    <li>Cost Structure</li>
                    <li>Revenue Streams</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Remember!</h4>
                    <p>Planning = Action (verb)<br>
                    Plan = Document (noun)</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 2: FAILURE & LEARNING ==========
    failure: {
        name: "Failure & Learning",
        icon: "fa-exclamation-triangle",
        color: "#ef4444",
        
        flashcards: [
            {
                question: "What are the 2 main categories of reasons why firms fail?",
                answer: "1. EXOGENOUS FACTORS - external forces, 'survival of the fittest', hostile jolts\n\n2. INTERNAL FACTORS - leadership, management, poor decision-making, strategic errors",
                explanation: "Failure can come from outside or inside the company."
            },
            {
                question: "What are the consequences of business failure?",
                answer: "• Loss of jobs\n• Emotional and psychological burden\n• Feelings of grief, loss of self-esteem\n• Stigmatization (personal and societal)\n• BUT: Knowledge spillovers - lessons learned",
                explanation: "Society is shifting to accept that failure arises from risk rather than sin."
            },
            {
                question: "What is INACTION as a warning sign?",
                answer: "Entrepreneurs fail to take corrective actions because of:\n• Negation of reality\n• Being absorbed by need for achievement\n• Being 'blinded' by love for the innovation\n• Losing sight of reality",
                explanation: "Inaction is often caused by denial."
            },
            {
                question: "What are examples of FAULTY or INSUFFICIENT ACTION?",
                answer: "• Approaching private investors too late\n• Last-minute incorporation of missing skills\n• Downsizing, flexible structures\n• Desperate corrective actions:\n  - Last minute personal investments\n  - Last-minute search for partners\n  - Selling the innovation to others",
                explanation: "Poor decisions made in desperation."
            },
            {
                question: "How does FEAR OF FAILURE affect entrepreneurs?",
                answer: "Fear of failure:\n• Disables entrepreneurial learning\n• Impedes investment\n• Blocks opportunity recognition\n• Hinders risk assessment\n\nFailure is linked to grief, anger, guilt, self-blame, distress, and anxiety.",
                explanation: "Crucial to success is overcoming or managing fear of failure."
            },
            {
                question: "What is the positive view of failure?",
                answer: "Knowledge spillovers - 'What if nothing is a failure but rather a lesson pointing to a better idea?'\n\nSociety has gradually shifted to accept that failure might arise from risk rather than sin.",
                explanation: "Failure can be a learning opportunity."
            }
        ],
        
        quiz: [
            {
                question: "Exogenous factors in business failure refer to:",
                options: [
                    "Internal management issues",
                    "External forces and hostile jolts",
                    "Employee mistakes",
                    "Accounting errors"
                ],
                correct: 1
            },
            {
                question: "INACTION as a warning sign is caused by:",
                options: [
                    "Too much planning",
                    "Negation of reality and being blinded by love for the innovation",
                    "Too many employees",
                    "High profits"
                ],
                correct: 1
            },
            {
                question: "Which is a consequence of business failure?",
                options: [
                    "Increased self-esteem",
                    "Knowledge spillovers (lessons learned)",
                    "Automatic success next time",
                    "Government rewards"
                ],
                correct: 1
            },
            {
                question: "Fear of failure does NOT:",
                options: [
                    "Disable entrepreneurial learning",
                    "Impede investment",
                    "Encourage risk-taking",
                    "Block opportunity recognition"
                ],
                correct: 2
            },
            {
                question: "Society's view of failure has shifted to:",
                options: [
                    "Failure is always a sin",
                    "Failure might arise from risk rather than sin",
                    "Failure should be punished",
                    "Failure is impossible"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "_______ factors are external forces that cause business failure.",
                answer: "Exogenous",
                hint: "External..."
            },
            {
                sentence: "Entrepreneurs often fail due to _______ - not taking corrective actions.",
                answer: "inaction",
                hint: "Not acting..."
            },
            {
                sentence: "Fear of failure disables entrepreneurial _______.",
                answer: "learning",
                hint: "Gaining knowledge..."
            }
        ],
        
        learn: {
            title: "Understanding Business Failure",
            image: "https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=400",
            content: `
                <h4>Why Do Firms Fail?</h4>
                <ul>
                    <li><strong>Exogenous</strong> - External factors, hostile jolts</li>
                    <li><strong>Internal</strong> - Leadership, poor decisions, strategic errors</li>
                </ul>
                
                <h4>Consequences of Failure:</h4>
                <ul>
                    <li>Loss of jobs</li>
                    <li>Emotional burden (grief, loss of self-esteem)</li>
                    <li>Stigmatization</li>
                    <li>BUT: Knowledge spillovers!</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Warning Signs</h4>
                    <p><strong>Inaction</strong> - denial, being blinded by love for the idea<br>
                    <strong>Faulty Action</strong> - desperate last-minute decisions</p>
                </div>
                
                <h4>Fear of Failure:</h4>
                <p>Disables learning, impedes investment, blocks opportunity recognition.</p>
                
                <div class="formula-box">
                    <strong>New Perspective:</strong><br>
                    "What if nothing is a failure but rather a lesson pointing to a better idea?"
                </div>
            `
        }
    },
    
    // ========== CATEGORY 3: ENTREPRENEURSHIP & ECONOMY ==========
    economy: {
        name: "Entrepreneurship & Economy",
        icon: "fa-chart-line",
        color: "#10b981",
        
        flashcards: [
            {
                question: "What are the MACROECONOMIC effects of entrepreneurship?",
                answer: "• Capital Formation\n• Employment growth\n• Technological progress\n• Knowledge-based development",
                explanation: "Effects on the overall economy."
            },
            {
                question: "What are the MICROECONOMIC effects of entrepreneurship?",
                answer: "• Establishment of new economic entities\n• Creation of new jobs\n• Production of new goods and services\n• Creation of niche markets",
                explanation: "Effects on individual businesses and markets."
            },
            {
                question: "According to R. Cantillon, what is an entrepreneur?",
                answer: "An entrepreneur is a RISK-TAKER who bears uncertainty and makes decisions in an uncertain economic context.",
                explanation: "Cantillon's definition emphasizes risk and uncertainty."
            },
            {
                question: "According to J.A. Schumpeter, what is an entrepreneur?",
                answer: "An entrepreneur is the economic individual who realizes new 'PRODUCTIVE COMBINATIONS'.\n\nTypical opportunities:\n1. New good or new quality\n2. New production method\n3. New market\n4. New source of supply\n5. New organization of industry",
                explanation: "Schumpeter emphasizes innovation and creative destruction."
            },
            {
                question: "What is Marshall's classification of entrepreneurs?",
                answer: "ACTIVE entrepreneurs - those who find NEW ways\nPASSIVE entrepreneurs - those who follow EXISTING roads\n\nEntrepreneur functions:\n• Collect economic information\n• Make economic calculations\n• Assign goods to production\n• Supervise execution",
                explanation: "Marshall saw entrepreneurs as risk-takers and administrators."
            },
            {
                question: "What is the difference between Entrepreneurship and Management?",
                answer: "ENTREPRENEURSHIP - dynamic process, taking own risk, introducing new ideas and projects\n\nMANAGEMENT - responsible for actions that maximize individual contributions to group tasks, applies to all organizations",
                explanation: "Entrepreneurship is about innovation, management is about optimization."
            },
            {
                question: "What is Entrepreneurial Management?",
                answer: "The unification of entrepreneurial and managerial functions within a business organization.\n\nBased on:\n• Constant innovation\n• Focused achievement of business goals\n• Growth and development of the company",
                explanation: "Combines both entrepreneurial and managerial approaches."
            },
            {
                question: "What are the two types of innovation?",
                answer: "1. INCREMENTAL - gradual, small-scale improvements\n\n2. RADICAL - disruptive, game-changing innovations",
                explanation: "Innovation can be evolutionary or revolutionary."
            }
        ],
        
        quiz: [
            {
                question: "Capital formation is a:",
                options: [
                    "Microeconomic effect",
                    "Macroeconomic effect",
                    "Social effect",
                    "Environmental effect"
                ],
                correct: 1
            },
            {
                question: "According to Cantillon, an entrepreneur is primarily a:",
                options: [
                    "Manager",
                    "Risk-taker who bears uncertainty",
                    "Government official",
                    "Investor"
                ],
                correct: 1
            },
            {
                question: "Schumpeter's entrepreneur realizes new:",
                options: [
                    "Taxes",
                    "Productive combinations",
                    "Regulations",
                    "Bureaucracy"
                ],
                correct: 1
            },
            {
                question: "Marshall's PASSIVE entrepreneurs:",
                options: [
                    "Find new ways",
                    "Follow existing roads",
                    "Never work",
                    "Only invest money"
                ],
                correct: 1
            },
            {
                question: "RADICAL innovation is:",
                options: [
                    "Gradual and small-scale",
                    "Disruptive and game-changing",
                    "Never successful",
                    "Only in technology"
                ],
                correct: 1
            },
            {
                question: "Entrepreneurial Management combines:",
                options: [
                    "Art and music",
                    "Entrepreneurial and managerial functions",
                    "Sales and marketing only",
                    "HR and accounting"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "According to Cantillon, an entrepreneur is a _______-taker.",
                answer: "risk",
                hint: "Taking chances..."
            },
            {
                sentence: "Schumpeter says entrepreneurs realize new productive _______.",
                answer: "combinations",
                hint: "Mixing things together..."
            },
            {
                sentence: "_______ innovation is gradual and small-scale.",
                answer: "Incremental",
                hint: "Step by step..."
            },
            {
                sentence: "_______ innovation is disruptive and game-changing.",
                answer: "Radical",
                hint: "Revolutionary..."
            }
        ],
        
        learn: {
            title: "Entrepreneurship and the Economy",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
            content: `
                <h4>Economic Effects of Entrepreneurship:</h4>
                
                <p><strong>MACRO:</strong> Capital formation, Employment growth, Tech progress, Knowledge development</p>
                <p><strong>MICRO:</strong> New entities, New jobs, New goods/services, Niche markets</p>
                
                <h4>Key Theorists:</h4>
                <ul>
                    <li><strong>Cantillon</strong> - Entrepreneur = Risk-taker in uncertainty</li>
                    <li><strong>Schumpeter</strong> - Entrepreneur = Creator of new productive combinations</li>
                    <li><strong>Marshall</strong> - Active (new ways) vs Passive (existing roads)</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Schumpeter's 5 Opportunities</h4>
                    <p>1. New good/quality<br>
                    2. New production method<br>
                    3. New market<br>
                    4. New source of supply<br>
                    5. New organization of industry</p>
                </div>
                
                <div class="formula-box">
                    <strong>Types of Innovation:</strong><br>
                    INCREMENTAL = gradual, small-scale<br>
                    RADICAL = disruptive, game-changing
                </div>
            `
        }
    },
    
    // ========== CATEGORY 4: SOCIAL ENTREPRENEURSHIP ==========
    social: {
        name: "Social Entrepreneurship",
        icon: "fa-hands-helping",
        color: "#0ea5e9",
        
        flashcards: [
            {
                question: "What is Social Entrepreneurship?",
                answer: "The organization of a business around specific SOCIAL and/or ENVIRONMENTAL causes.\n\nNot-for-profit initiatives seeking alternative funding to create social value and catalyze social transformation.",
                explanation: "Business with a social mission."
            },
            {
                question: "What is the SOCIAL element in social entrepreneurship?",
                answer: "• Altruism\n• Ethical motives, moral responsibility\n• Combining resources to address social problems\n• Altering existing social structures\n• Catalyzing social transformation\n• Value creation focused on SOCIAL value",
                explanation: "The 'why' - creating positive social impact."
            },
            {
                question: "What is the ENTREPRENEURIAL element in social entrepreneurship?",
                answer: "• For profit vs Not for profit debate\n• Nature of social needs addressed\n• Amount of resources needed\n• Scope of raising capital\n• Ability to capture economic value\n• Priority given to social wealth creation",
                explanation: "The 'how' - business skills for social good."
            },
            {
                question: "What is a COMMUNITY Social Entrepreneur?",
                answer: "• Addresses LOCAL, ISOLATED social problems\n• Serves social needs within a SMALL geographical area\n• Focus on immediate community impact",
                explanation: "Local focus, small scale."
            },
            {
                question: "What is a NON-PROFIT Social Entrepreneur?",
                answer: "• Prioritizes social well-being over traditional business needs\n• Uses their power for SOCIAL GOOD\n• Usually business-savvy entrepreneurs wanting to create change\n• Results take longer but can be LARGER SCALE",
                explanation: "Business skills applied for social benefit."
            },
            {
                question: "What is a TRANSFORMATIONAL Social Entrepreneur?",
                answer: "• Meets social needs that governments and businesses AREN'T meeting\n• What non-profits evolve to with sufficient time and growth\n• LARGER organizations with rules and regulations\n• Usually recruit and foster talent in-house",
                explanation: "Filling gaps left by government and business."
            },
            {
                question: "What is a GLOBAL Social Entrepreneur?",
                answer: "• Seeks to completely CHANGE SOCIAL SYSTEMS\n• Addresses major social needs GLOBALLY\n• Often where big companies end up when they realize social responsibility\n• Tied to a particular cause\n• Works with other social entrepreneurs",
                explanation: "Worldwide systemic change."
            }
        ],
        
        quiz: [
            {
                question: "Social entrepreneurship focuses on:",
                options: [
                    "Maximum profit only",
                    "Social and/or environmental causes",
                    "Stock prices",
                    "Real estate"
                ],
                correct: 1
            },
            {
                question: "A COMMUNITY social entrepreneur serves:",
                options: [
                    "Global markets",
                    "A small geographical area",
                    "Only wealthy clients",
                    "Government agencies"
                ],
                correct: 1
            },
            {
                question: "TRANSFORMATIONAL social entrepreneurs:",
                options: [
                    "Only work locally",
                    "Meet needs governments and businesses aren't meeting",
                    "Focus on profit only",
                    "Never grow"
                ],
                correct: 1
            },
            {
                question: "GLOBAL social entrepreneurs seek to:",
                options: [
                    "Stay small",
                    "Change social systems globally",
                    "Avoid partnerships",
                    "Focus on one neighborhood"
                ],
                correct: 1
            },
            {
                question: "The SOCIAL element includes:",
                options: [
                    "Profit maximization",
                    "Altruism and ethical motives",
                    "Stock trading",
                    "Tax avoidance"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "Social entrepreneurship creates _______ value, not just economic value.",
                answer: "social",
                hint: "Helping society..."
            },
            {
                sentence: "_______ social entrepreneurs serve small geographical areas.",
                answer: "Community",
                hint: "Local neighborhood..."
            },
            {
                sentence: "_______ social entrepreneurs seek to change systems globally.",
                answer: "Global",
                hint: "Worldwide..."
            }
        ],
        
        learn: {
            title: "Social Entrepreneurship",
            image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400",
            content: `
                <p><span class="highlight">Social Entrepreneurship</span> = Business organized around social/environmental causes</p>
                
                <h4>Two Key Elements:</h4>
                <ul>
                    <li><strong>SOCIAL</strong> - Altruism, ethics, social transformation</li>
                    <li><strong>ENTREPRENEURIAL</strong> - Business skills, capital, sustainability</li>
                </ul>
                
                <h4>4 Types of Social Entrepreneurs:</h4>
                
                <div class="tip-box">
                    <h4><i class="fas fa-users"></i> Types (Small → Large)</h4>
                    <p>1. <strong>COMMUNITY</strong> - Local, small area<br>
                    2. <strong>NON-PROFIT</strong> - Business-savvy, social good<br>
                    3. <strong>TRANSFORMATIONAL</strong> - Fill gaps, larger orgs<br>
                    4. <strong>GLOBAL</strong> - Change systems worldwide</p>
                </div>
                
                <div class="formula-box">
                    <strong>Value Focus:</strong><br>
                    Social Value > Economic Value<br>
                    (Economic value ensures financial viability)
                </div>
            `
        }
    },
    
    // ========== CATEGORY 5: TRENDS & GENDER ==========
    trends: {
        name: "Trends & Gender Gap",
        icon: "fa-globe",
        color: "#f59e0b",
        
        flashcards: [
            {
                question: "What is the gender gap in entrepreneurship?",
                answer: "• Men outnumber women 3 to 1 in business ownership (World Bank)\n• Only 2.3% of venture capital goes to women entrepreneurs\n• Only 2% of women-owned startups generate $1 million\n• Men are 3.5x more likely to achieve $1 million",
                explanation: "Significant disparity exists in entrepreneurship."
            },
            {
                question: "What challenges do female entrepreneurs face?",
                answer: "• Lack of access to financing\n• Legal inequalities\n• Funding challenges compared to men\n• Higher unemployment rates (post-pandemic)\n• Venture capital bias",
                explanation: "Multiple barriers to female entrepreneurship."
            },
            {
                question: "What is an Entrepreneurial Ecosystem?",
                answer: "A framework that includes:\n• Policy\n• Regional clusters\n• Innovation systems\n• Context\n• Institutional frameworks\n\nAll working together to promote and support entrepreneurship.",
                explanation: "The environment that enables entrepreneurship."
            },
            {
                question: "What are the NEW TRENDS in Economy?",
                answer: "• Creative Economy\n• FinTech - Open banking\n• NFTs (Non-Fungible Tokens)",
                explanation: "Economic trends shaping entrepreneurship."
            },
            {
                question: "What are the NEW TRENDS in Society?",
                answer: "• Ageing society\n• Diversity and inclusion in workplaces\n• Well-being focus",
                explanation: "Social trends affecting business."
            },
            {
                question: "What are the NEW TRENDS in Environment?",
                answer: "• Net zero (carbon neutrality)\n• ESG (Environmental, Social, Governance)",
                explanation: "Environmental considerations in business."
            },
            {
                question: "What are the NEW TRENDS in Technology?",
                answer: "• Metaverse\n• Big data\n• SaaS / PaaS / DaaS\n• Content creators",
                explanation: "Tech trends shaping entrepreneurship."
            },
            {
                question: "Can an Influencer be an Entrepreneur?",
                answer: "YES! Characteristics:\n• Lower start-up costs than traditional businesses\n• Branding = their personality\n• Profit from ads, sponsored posts, own products\n• Use social media as their platform",
                explanation: "New form of entrepreneurship."
            },
            {
                question: "What are PUSH factors in entrepreneurial migration?",
                answer: "• War\n• Poverty\n• Famine\n• Entrepreneurial traits\n• Previous entrepreneurial skills\n• Available financial and social capital",
                explanation: "Factors that push people to migrate and start businesses."
            },
            {
                question: "What are PULL factors in entrepreneurial migration?",
                answer: "• Safety\n• Pro-entrepreneurship policy\n• Economic opportunity\n• Language accessibility",
                explanation: "Factors that attract entrepreneurs to new locations."
            }
        ],
        
        quiz: [
            {
                question: "According to World Bank, men outnumber women in business ownership:",
                options: [
                    "2 to 1",
                    "3 to 1",
                    "5 to 1",
                    "Equal"
                ],
                correct: 1
            },
            {
                question: "What percentage of VC goes to women entrepreneurs?",
                options: [
                    "About 2.3%",
                    "About 25%",
                    "About 50%",
                    "About 75%"
                ],
                correct: 0
            },
            {
                question: "ESG stands for:",
                options: [
                    "Economic, Social, Growth",
                    "Environmental, Social, Governance",
                    "Entrepreneurial, Strategic, Global",
                    "Equity, Sales, Gross"
                ],
                correct: 1
            },
            {
                question: "Which is a PUSH factor for entrepreneurial migration?",
                options: [
                    "Pro-entrepreneurship policy",
                    "Economic opportunity",
                    "War and poverty",
                    "Safety"
                ],
                correct: 2
            },
            {
                question: "Which is a PULL factor for entrepreneurial migration?",
                options: [
                    "Famine",
                    "War",
                    "Safety and economic opportunity",
                    "Poverty"
                ],
                correct: 2
            },
            {
                question: "An influencer's branding is based on:",
                options: [
                    "Company logo",
                    "Their personality",
                    "Office location",
                    "Employee count"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "Men outnumber women _______ to 1 in business ownership.",
                answer: "3",
                hint: "Three..."
            },
            {
                sentence: "ESG stands for Environmental, Social, and _______.",
                answer: "Governance",
                hint: "How company is governed..."
            },
            {
                sentence: "War and poverty are _______ factors in entrepreneurial migration.",
                answer: "push",
                hint: "Forces people away..."
            },
            {
                sentence: "Safety and economic opportunity are _______ factors.",
                answer: "pull",
                hint: "Attracts people..."
            }
        ],
        
        learn: {
            title: "Trends and Gender Gap in Entrepreneurship",
            image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400",
            content: `
                <h4>Gender Gap in Entrepreneurship:</h4>
                <ul>
                    <li>Men outnumber women <strong>3 to 1</strong> in ownership</li>
                    <li>Only <strong>2.3%</strong> of VC goes to women</li>
                    <li>Only <strong>2%</strong> of women startups reach $1M</li>
                </ul>
                
                <h4>New Trends by Category:</h4>
                <div class="tip-box">
                    <p><strong>Economy:</strong> Creative Economy, FinTech, NFTs<br>
                    <strong>Society:</strong> Ageing, Diversity, Well-being<br>
                    <strong>Environment:</strong> Net zero, ESG<br>
                    <strong>Technology:</strong> Metaverse, Big Data, SaaS, Content creators</p>
                </div>
                
                <h4>Entrepreneurial Migration:</h4>
                <div class="formula-box">
                    <strong>PUSH:</strong> War, Poverty, Famine<br>
                    <strong>PULL:</strong> Safety, Policy, Opportunity
                </div>
                
                <h4>Influencer = Entrepreneur?</h4>
                <p>Yes! Lower costs, personality branding, profit from ads/sponsors/products.</p>
            `
        }
    },
    
    // ========== CATEGORY 6: TOURISM ENTREPRENEURSHIP ==========
    tourism: {
        name: "Tourism Entrepreneurship",
        icon: "fa-hotel",
        color: "#0ea5e9",
        
        flashcards: [
            {
                question: "What are the characteristics of TOURISM ENTREPRENEURSHIP?",
                answer: "• LONG-TERM investment required\n• HIGH INVESTMENT VALUE\n• Seasonal demand fluctuations\n• Location-dependent\n• Service-intensive\n• Experience-based product",
                explanation: "Tourism businesses have unique characteristics."
            },
            {
                question: "What are the 4 types of Knowledge & Skills for entrepreneurs?",
                answer: "1. CONCEPTUAL - ability to understand and manage organization for goals\n\n2. DESIGN - ability to shape solutions to business problems\n\n3. PEOPLE SKILLS - techniques of organizational behavior\n\n4. TECHNICAL - ability to use methods for specific managerial tasks",
                explanation: "Four knowledge areas for successful management."
            },
            {
                question: "What are PERFORMANCE INDICATORS in tourism?",
                answer: "• PRODUCTIVITY - output per input\n• ECONOMY - cost efficiency\n• EFFECTIVENESS - goal achievement\n\nMeasure how well the business performs.",
                explanation: "KPIs for tourism businesses."
            },
            {
                question: "What are FUNDING INDICATORS?",
                answer: "• LIQUIDITY RATIOS - ability to settle short-term obligations\n\n• LEVERAGE RATIOS - extent to which company is financed from other sources\n\nMeasure financial health and stability.",
                explanation: "Financial metrics for business assessment."
            },
            {
                question: "What are the issues facing FEMALE ENTREPRENEURS in Tourism?",
                answer: "• FEMINIZATION of the industry\n• STEREOTYPING - technology vs housekeeping roles\n• Predominance in PART-TIME and shorter-term contracts\n• LOW REPRESENTATION in high qualification positions\n• Glass ceiling in management",
                explanation: "Gender-specific challenges in tourism sector."
            },
            {
                question: "What is an INFLUENCER as an entrepreneur?",
                answer: "Someone who has power to affect or change people and behavior through social media.\n\nCharacteristics:\n• Lower start-up costs\n• Branding = their personality\n• Profit from ads, sponsored posts, own products\n• Use social media as platform",
                explanation: "New form of entrepreneurship in digital age."
            },
            {
                question: "What are PUSH factors in entrepreneurial migration?",
                answer: "Factors that FORCE people to leave:\n• War\n• Poverty\n• Famine\n• Entrepreneurial traits\n• Previous entrepreneurial skills\n• Available financial and social capital",
                explanation: "Negative factors pushing entrepreneurs to migrate."
            },
            {
                question: "What are PULL factors in entrepreneurial migration?",
                answer: "Factors that ATTRACT entrepreneurs:\n• Safety\n• Pro-entrepreneurship policy\n• Economic opportunity\n• Language accessibility\n• Market access",
                explanation: "Positive factors attracting entrepreneurs."
            }
        ],
        
        quiz: [
            {
                question: "Tourism entrepreneurship requires:",
                options: [
                    "Low investment and short-term commitment",
                    "Long-term investment and high investment value",
                    "No investment",
                    "Government funding only"
                ],
                correct: 1
            },
            {
                question: "CONCEPTUAL knowledge refers to ability to:",
                options: [
                    "Use technical tools",
                    "Understand and manage organization for goals",
                    "Work with computers",
                    "Speak multiple languages"
                ],
                correct: 1
            },
            {
                question: "Liquidity ratios measure:",
                options: [
                    "Long-term debt",
                    "Ability to settle short-term obligations",
                    "Employee satisfaction",
                    "Market share"
                ],
                correct: 1
            },
            {
                question: "Female entrepreneurs in tourism often face:",
                options: [
                    "Higher pay",
                    "Stereotyping and part-time contracts",
                    "More funding",
                    "Better positions"
                ],
                correct: 1
            },
            {
                question: "War and poverty are examples of:",
                options: [
                    "Pull factors",
                    "Push factors",
                    "Neutral factors",
                    "Economic factors"
                ],
                correct: 1
            },
            {
                question: "Pro-entrepreneurship policy is a:",
                options: [
                    "Push factor",
                    "Pull factor",
                    "Barrier",
                    "Problem"
                ],
                correct: 1
            },
            {
                question: "An influencer's branding is based on:",
                options: [
                    "Company logo",
                    "Their personality",
                    "Office location",
                    "Employee count"
                ],
                correct: 1
            },
            {
                question: "DESIGN knowledge refers to ability to:",
                options: [
                    "Create artwork",
                    "Shape solutions to business problems",
                    "Build websites",
                    "Design products"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "Tourism entrepreneurship requires ______-term investment.",
                answer: "long",
                hint: "Not short..."
            },
            {
                sentence: "_______ ratios measure ability to settle short-term obligations.",
                answer: "Liquidity",
                hint: "How liquid/available is cash..."
            },
            {
                sentence: "War and poverty are _______ factors in migration.",
                answer: "push",
                hint: "Force people away..."
            },
            {
                sentence: "Safety and opportunity are _______ factors.",
                answer: "pull",
                hint: "Attract people..."
            },
            {
                sentence: "_______ knowledge includes techniques of organizational behavior.",
                answer: "People",
                hint: "Working with humans..."
            }
        ],
        
        learn: {
            title: "Tourism Entrepreneurship",
            content: `
                <h3>Tourism Business Characteristics</h3>
                
                <div class="formula-box">
                    <strong>Tourism Entrepreneurship Features:</strong><br>
                    • Long-term investment required<br>
                    • High investment value<br>
                    • Seasonal demand fluctuations<br>
                    • Location-dependent<br>
                    • Service-intensive
                </div>
                
                <h4>4 Types of Knowledge & Skills</h4>
                <div class="tip-box">
                    <ul>
                        <li><strong>CONCEPTUAL</strong> - Understand & manage organization</li>
                        <li><strong>DESIGN</strong> - Shape solutions to problems</li>
                        <li><strong>PEOPLE</strong> - Organizational behavior techniques</li>
                        <li><strong>TECHNICAL</strong> - Specific managerial methods</li>
                    </ul>
                </div>
                
                <h4>Performance Indicators</h4>
                <ul>
                    <li><strong>Productivity</strong> - Output per input</li>
                    <li><strong>Economy</strong> - Cost efficiency</li>
                    <li><strong>Effectiveness</strong> - Goal achievement</li>
                </ul>
                
                <h4>Funding Indicators</h4>
                <ul>
                    <li><strong>Liquidity Ratios</strong> - Short-term obligation ability</li>
                    <li><strong>Leverage Ratios</strong> - External financing extent</li>
                </ul>
                
                <hr>
                
                <h3>Female Entrepreneurs in Tourism</h3>
                <div class="warning-box">
                    <h4>Challenges:</h4>
                    <ul>
                        <li>Feminization of industry</li>
                        <li>Stereotyping (tech vs housekeeping)</li>
                        <li>Part-time/short-term contracts</li>
                        <li>Low representation in senior roles</li>
                    </ul>
                </div>
                
                <hr>
                
                <h3>Entrepreneurial Migration</h3>
                <div class="example-box">
                    <h4>PUSH Factors (Force away)</h4>
                    <p>War, Poverty, Famine, Skills, Capital</p>
                    
                    <h4>PULL Factors (Attract)</h4>
                    <p>Safety, Policy, Opportunity, Language</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 7: MEASURING VALUE ==========
    value: {
        name: "Measuring Value",
        icon: "fa-chart-bar",
        color: "#14b8a6",
        
        flashcards: [
            {
                question: "What are the 7 dimensions for MEASURING VALUE in social entrepreneurship?",
                answer: "1. SOCIAL IMPACT\n2. SUSTAINABILITY\n3. INNOVATION\n4. SCALABILITY\n5. COMMUNITY INVOLVEMENT\n6. PARTNERSHIPS & NETWORKS\n7. AWARENESS & ADVOCACY",
                explanation: "Seven key metrics for social enterprise success."
            },
            {
                question: "How is SOCIAL IMPACT measured?",
                answer: "• DEPTH AND BREADTH of Impact - how many people, how significant\n• LONG-TERM CHANGE - lasting effects\n• EMPOWERMENT - enabling others to help themselves",
                explanation: "Measuring the actual social change created."
            },
            {
                question: "How is SUSTAINABILITY measured?",
                answer: "• FINANCIAL VIABILITY - can the organization survive financially\n• OPERATIONAL STABILITY - consistent operations over time\n\nLong-term ability to continue the mission.",
                explanation: "Financial and operational longevity."
            },
            {
                question: "How is INNOVATION measured?",
                answer: "• NOVEL APPROACHES - new ways of solving problems\n• TECHNOLOGY INTEGRATION - using tech effectively\n\nCreativity and new solutions to social problems.",
                explanation: "Newness and creativity in approach."
            },
            {
                question: "How is SCALABILITY measured?",
                answer: "• REPLICABILITY - can the model be copied elsewhere\n• GROWTH POTENTIAL - ability to expand reach\n\nPossibility to increase impact over time.",
                explanation: "Potential for growth and replication."
            },
            {
                question: "How is COMMUNITY INVOLVEMENT measured?",
                answer: "• ENGAGEMENT AND PARTICIPATION - active community involvement\n• BUILDING TRUST AND RELATIONSHIPS - strong community ties\n\nLocal stakeholder engagement and ownership.",
                explanation: "How connected to the community served."
            },
            {
                question: "How are PARTNERSHIPS & NETWORKS measured?",
                answer: "• COLLABORATION with other organizations\n• NETWORKING - building connections\n\nStrength of external relationships and alliances.",
                explanation: "External collaboration effectiveness."
            },
            {
                question: "How is AWARENESS & ADVOCACY measured?",
                answer: "• PUBLIC ENGAGEMENT - raising awareness\n• POLICY INFLUENCE - affecting government policy\n\nAbility to spread message and influence change.",
                explanation: "Public impact and policy influence."
            }
        ],
        
        quiz: [
            {
                question: "How many dimensions are used to measure value in social entrepreneurship?",
                options: [
                    "5",
                    "6",
                    "7",
                    "8"
                ],
                correct: 2
            },
            {
                question: "Social Impact is measured by:",
                options: [
                    "Revenue only",
                    "Depth, breadth, long-term change, empowerment",
                    "Number of employees",
                    "Office size"
                ],
                correct: 1
            },
            {
                question: "Sustainability includes:",
                options: [
                    "Only environmental factors",
                    "Financial viability and operational stability",
                    "Marketing success",
                    "Brand recognition"
                ],
                correct: 1
            },
            {
                question: "Scalability refers to:",
                options: [
                    "Office building size",
                    "Replicability and growth potential",
                    "Employee weight",
                    "Financial reporting"
                ],
                correct: 1
            },
            {
                question: "Community Involvement includes:",
                options: [
                    "Government control",
                    "Engagement, participation, trust building",
                    "Competitor analysis",
                    "Tax reporting"
                ],
                correct: 1
            },
            {
                question: "Awareness & Advocacy measures:",
                options: [
                    "Advertising spend",
                    "Public engagement and policy influence",
                    "Employee awareness",
                    "Stock price"
                ],
                correct: 1
            },
            {
                question: "Innovation in social enterprises is measured by:",
                options: [
                    "Patent count only",
                    "Novel approaches and technology integration",
                    "R&D spending",
                    "Product variety"
                ],
                correct: 1
            },
            {
                question: "Which is NOT a value measurement dimension?",
                options: [
                    "Social Impact",
                    "Sustainability",
                    "Profit Margin",
                    "Scalability"
                ],
                correct: 2
            }
        ],
        
        fillBlanks: [
            {
                sentence: "There are _______ dimensions for measuring social enterprise value.",
                answer: "seven",
                hint: "Number 7..."
            },
            {
                sentence: "_______ measures depth, breadth, and long-term change.",
                answer: "Social Impact",
                hint: "Effect on society..."
            },
            {
                sentence: "_______ refers to replicability and growth potential.",
                answer: "Scalability",
                hint: "Can it grow/scale..."
            },
            {
                sentence: "Policy influence is part of Awareness & _______.",
                answer: "Advocacy",
                hint: "Speaking up for a cause..."
            }
        ],
        
        learn: {
            title: "Measuring Value in Social Entrepreneurship",
            content: `
                <h3>7 Dimensions of Value Measurement</h3>
                
                <div class="formula-box">
                    <strong>The 7 Dimensions:</strong><br>
                    1. Social Impact<br>
                    2. Sustainability<br>
                    3. Innovation<br>
                    4. Scalability<br>
                    5. Community Involvement<br>
                    6. Partnerships & Networks<br>
                    7. Awareness & Advocacy
                </div>
                
                <h4>1. Social Impact</h4>
                <ul>
                    <li>Depth and Breadth of Impact</li>
                    <li>Long-Term Change</li>
                    <li>Empowerment</li>
                </ul>
                
                <h4>2. Sustainability</h4>
                <ul>
                    <li>Financial Viability</li>
                    <li>Operational Stability</li>
                </ul>
                
                <h4>3. Innovation</h4>
                <ul>
                    <li>Novel Approaches</li>
                    <li>Technology Integration</li>
                </ul>
                
                <h4>4. Scalability</h4>
                <ul>
                    <li>Replicability</li>
                    <li>Growth Potential</li>
                </ul>
                
                <h4>5. Community Involvement</h4>
                <ul>
                    <li>Engagement and Participation</li>
                    <li>Building Trust and Relationships</li>
                </ul>
                
                <h4>6. Partnerships & Networks</h4>
                <ul>
                    <li>Collaboration with Organizations</li>
                    <li>Networking</li>
                </ul>
                
                <h4>7. Awareness & Advocacy</h4>
                <ul>
                    <li>Public Engagement</li>
                    <li>Policy Influence</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Remember!</h4>
                    <p>Social Value > Economic Value in social entrepreneurship, but economic value ensures financial viability!</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 8: FINAL EXAM PRACTICE ==========
    finalExam: {
        name: "Final Exam Practice",
        icon: "fa-graduation-cap",
        color: "#ef4444",
        
        flashcards: [
            {
                question: "EXAM REVIEW: What year and who introduced the term 'entrepreneur'?",
                answer: "1755 - Richard Cantillon\n\nFrom French 'entreprendre' = to undertake\n\nEntrepreneurs transform demand into supply.",
                explanation: "Key historical fact for exam."
            },
            {
                question: "EXAM REVIEW: List Schumpeter's 5 productive combinations.",
                answer: "1. New quality of good\n2. New method of production\n3. New market\n4. New source of supply of raw materials\n5. New organization of any industry",
                explanation: "Memorize these 5 for the exam!"
            },
            {
                question: "EXAM REVIEW: What are Drucker's 7 sources of opportunity?",
                answer: "1. The Unexpected\n2. The Incongruous\n3. Process Need\n4. Industry & Market Structures\n5. Demographics\n6. Changes in Perception\n7. New Knowledge",
                explanation: "Important: 7 sources, memorize!"
            },
            {
                question: "EXAM REVIEW: What are the 4 types of social entrepreneurs?",
                answer: "1. COMMUNITY - local, small area\n2. NON-PROFIT - social good priority\n3. TRANSFORMATIONAL - fill gaps\n4. GLOBAL - change systems worldwide",
                explanation: "From small to large scale."
            },
            {
                question: "EXAM REVIEW: What are the 7 dimensions of measuring social value?",
                answer: "1. Social Impact\n2. Sustainability\n3. Innovation\n4. Scalability\n5. Community Involvement\n6. Partnerships & Networks\n7. Awareness & Advocacy",
                explanation: "7 dimensions - memorize!"
            },
            {
                question: "EXAM REVIEW: What is TRIM framework?",
                answer: "Team\nResources\nIdea\nMarket\n\nPlanning tool for early-stage business development.",
                explanation: "Easy to remember: T-R-I-M"
            },
            {
                question: "EXAM REVIEW: What are the 9 blocks of Business Model Canvas?",
                answer: "1. Key Partners\n2. Key Activities\n3. Value Proposition\n4. Customer Relationships\n5. Customer Segments\n6. Key Resources\n7. Channels\n8. Cost Structure\n9. Revenue Streams",
                explanation: "9 blocks on one page!"
            },
            {
                question: "EXAM REVIEW: What's the difference between Innovation and Invention?",
                answer: "INVENTION = Creating something new\n\nINNOVATION = Making something new that is USEFUL and BENEFICIAL\n\nYou can invent something no one uses - that's NOT innovation!",
                explanation: "Innovation requires practical benefit."
            },
            {
                question: "EXAM REVIEW: What are the 2 franchise formats?",
                answer: "1. PRODUCT FORMAT - exclusive right to sell product in territory\n\n2. BUSINESS FORMAT - complete system + trade name + trade secrets",
                explanation: "Two types of franchise."
            },
            {
                question: "EXAM REVIEW: Internal vs External Locus of Control?",
                answer: "INTERNAL: 'I control my destiny'\n→ More entrepreneurial\n\nEXTERNAL: 'Fate/luck controls outcomes'\n→ Less entrepreneurial",
                explanation: "Internal = entrepreneurial success."
            },
            {
                question: "EXAM REVIEW: PUSH vs PULL factors?",
                answer: "PUSH (force away):\nWar, Poverty, Famine\n\nPULL (attract):\nSafety, Policy, Opportunity, Language",
                explanation: "Migration factors."
            },
            {
                question: "EXAM REVIEW: 6 Types of Innovation?",
                answer: "1. Product Innovation\n2. Process Innovation\n3. Business Model Innovation\n4. Organizational Innovation\n5. Marketing Innovation\n6. Open Innovation",
                explanation: "6 types - memorize!"
            }
        ],
        
        quiz: [
            {
                question: "FINAL EXAM: The term entrepreneur was introduced in:",
                options: [
                    "1655 by Adam Smith",
                    "1755 by Richard Cantillon",
                    "1855 by Karl Marx",
                    "1955 by Peter Drucker"
                ],
                correct: 1
            },
            {
                question: "FINAL EXAM: How many productive combinations did Schumpeter identify?",
                options: [
                    "3",
                    "5",
                    "7",
                    "9"
                ],
                correct: 1
            },
            {
                question: "FINAL EXAM: How many sources of opportunity did Drucker identify?",
                options: [
                    "5",
                    "6",
                    "7",
                    "9"
                ],
                correct: 2
            },
            {
                question: "FINAL EXAM: TRIM stands for:",
                options: [
                    "Time, Revenue, Innovation, Money",
                    "Team, Resources, Idea, Market",
                    "Technology, Research, Investment, Management",
                    "Training, Recruitment, Integration, Motivation"
                ],
                correct: 1
            },
            {
                question: "FINAL EXAM: Business Model Canvas has how many blocks?",
                options: [
                    "5",
                    "7",
                    "9",
                    "11"
                ],
                correct: 2
            },
            {
                question: "FINAL EXAM: Which is a PUSH factor?",
                options: [
                    "Safety",
                    "Economic opportunity",
                    "War and poverty",
                    "Pro-entrepreneurship policy"
                ],
                correct: 2
            },
            {
                question: "FINAL EXAM: Intrapreneurship means:",
                options: [
                    "International entrepreneurship",
                    "Internet entrepreneurship",
                    "Entrepreneurship within existing organization",
                    "Solo entrepreneurship"
                ],
                correct: 2
            },
            {
                question: "FINAL EXAM: GLOBAL social entrepreneur seeks to:",
                options: [
                    "Stay local",
                    "Change social systems worldwide",
                    "Avoid partnerships",
                    "Focus on profit"
                ],
                correct: 1
            },
            {
                question: "FINAL EXAM: Post-Industrial Revolution, entrepreneur's role is to:",
                options: [
                    "Take risks only",
                    "Innovate",
                    "Manage employees",
                    "Follow rules"
                ],
                correct: 1
            },
            {
                question: "FINAL EXAM: Scalability measures:",
                options: [
                    "Building size",
                    "Replicability and growth potential",
                    "Employee count",
                    "Revenue"
                ],
                correct: 1
            },
            {
                question: "FINAL EXAM: Innovation differs from invention because:",
                options: [
                    "Innovation is cheaper",
                    "Innovation must be useful and beneficial",
                    "Innovation is patented",
                    "Innovation comes first"
                ],
                correct: 1
            },
            {
                question: "FINAL EXAM: Tourism entrepreneurship requires:",
                options: [
                    "Low investment",
                    "Long-term investment and high value",
                    "No planning",
                    "Short-term focus"
                ],
                correct: 1
            },
            {
                question: "FINAL EXAM: Entrepreneurial Management combines:",
                options: [
                    "Art and science",
                    "Entrepreneurial and managerial functions",
                    "Theory and practice",
                    "Sales and marketing"
                ],
                correct: 1
            },
            {
                question: "FINAL EXAM: How many types of social entrepreneurs are there?",
                options: [
                    "2",
                    "3",
                    "4",
                    "5"
                ],
                correct: 2
            },
            {
                question: "FINAL EXAM: ESG stands for:",
                options: [
                    "Economic, Social, Growth",
                    "Environmental, Social, Governance",
                    "Equity, Sustainability, Goals",
                    "Enterprise, Strategy, Gains"
                ],
                correct: 1
            },
            {
                question: "FINAL EXAM: Which is NOT one of Drucker's 7 sources?",
                options: [
                    "The Unexpected",
                    "Demographics",
                    "Government Funding",
                    "New Knowledge"
                ],
                correct: 2
            },
            {
                question: "FINAL EXAM: Fear of failure:",
                options: [
                    "Enhances learning",
                    "Disables entrepreneurial learning",
                    "Has no effect",
                    "Increases risk-taking"
                ],
                correct: 1
            },
            {
                question: "FINAL EXAM: Liquidity ratios measure:",
                options: [
                    "Long-term debt",
                    "Ability to settle short-term obligations",
                    "Employee performance",
                    "Market share"
                ],
                correct: 1
            },
            {
                question: "FINAL EXAM: Product Format Franchise gives:",
                options: [
                    "Complete business system",
                    "Exclusive right to sell in territory",
                    "Manufacturing rights",
                    "Trade secrets"
                ],
                correct: 1
            },
            {
                question: "FINAL EXAM: Internal Locus of Control means:",
                options: [
                    "External forces control destiny",
                    "You control your own destiny",
                    "Luck determines success",
                    "Government controls business"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "Richard Cantillon introduced 'entrepreneur' in _______.",
                answer: "1755",
                hint: "18th century year..."
            },
            {
                sentence: "Schumpeter identified _______ productive combinations.",
                answer: "five",
                hint: "Number 5..."
            },
            {
                sentence: "Drucker identified _______ sources of opportunity.",
                answer: "seven",
                hint: "Number 7..."
            },
            {
                sentence: "TRIM stands for Team, Resources, Idea, _______.",
                answer: "Market",
                hint: "Where you sell..."
            },
            {
                sentence: "Business Model Canvas has _______ blocks.",
                answer: "nine",
                hint: "Number 9..."
            },
            {
                sentence: "There are _______ types of social entrepreneurs.",
                answer: "four",
                hint: "Number 4..."
            },
            {
                sentence: "ESG stands for Environmental, Social, _______.",
                answer: "Governance",
                hint: "How company is governed..."
            },
            {
                sentence: "_______ innovation is gradual and small-scale.",
                answer: "Incremental",
                hint: "Step by step..."
            },
            {
                sentence: "_______ innovation is disruptive and game-changing.",
                answer: "Radical",
                hint: "Revolutionary..."
            },
            {
                sentence: "Entrepreneurship within existing organization is called _______.",
                answer: "Intrapreneurship",
                hint: "Intra- means within..."
            }
        ],
        
        learn: {
            title: "Final Exam Review - Key Facts to Memorize",
            content: `
                <h3>🎓 FINAL EXAM CHEAT SHEET</h3>
                
                <div class="warning-box">
                    <h4>⚠️ CRITICAL NUMBERS TO REMEMBER</h4>
                    <ul>
                        <li><strong>1755</strong> - Cantillon introduced 'entrepreneur'</li>
                        <li><strong>5</strong> - Schumpeter's productive combinations</li>
                        <li><strong>7</strong> - Drucker's sources of opportunity</li>
                        <li><strong>9</strong> - Business Model Canvas blocks</li>
                        <li><strong>4</strong> - Types of social entrepreneurs</li>
                        <li><strong>7</strong> - Value measurement dimensions</li>
                        <li><strong>6</strong> - Types of innovation</li>
                        <li><strong>4</strong> - Types of knowledge & skills</li>
                    </ul>
                </div>
                
                <h4>📚 Schumpeter's 5 Productive Combinations</h4>
                <div class="formula-box">
                    1. New quality of good<br>
                    2. New method of production<br>
                    3. New market<br>
                    4. New source of supply<br>
                    5. New organization of industry
                </div>
                
                <h4>📚 Drucker's 7 Sources of Opportunity</h4>
                <div class="formula-box">
                    1. The Unexpected<br>
                    2. The Incongruous<br>
                    3. Process Need<br>
                    4. Industry & Market Structures<br>
                    5. Demographics<br>
                    6. Changes in Perception<br>
                    7. New Knowledge
                </div>
                
                <h4>📚 TRIM Framework</h4>
                <div class="tip-box">
                    <p><strong>T</strong>eam + <strong>R</strong>esources + <strong>I</strong>dea + <strong>M</strong>arket</p>
                </div>
                
                <h4>📚 Key Contrasts</h4>
                <div class="example-box">
                    <p><strong>Innovation vs Invention:</strong> Innovation = useful, Invention = just new</p>
                    <p><strong>Internal vs External Locus:</strong> Internal = I control, External = fate controls</p>
                    <p><strong>Push vs Pull:</strong> Push = forces away, Pull = attracts</p>
                    <p><strong>Incremental vs Radical:</strong> Incremental = gradual, Radical = disruptive</p>
                </div>
                
                <h4>📚 4 Types of Social Entrepreneurs</h4>
                <div class="formula-box">
                    1. Community (local)<br>
                    2. Non-profit (social good)<br>
                    3. Transformational (fill gaps)<br>
                    4. Global (change systems)
                </div>
                
                <h4>📚 BMC 9 Blocks</h4>
                <div class="tip-box">
                    <p>Key Partners, Key Activities, Value Proposition, Customer Relationships, Customer Segments, Key Resources, Channels, Cost Structure, Revenue Streams</p>
                </div>
                
                <h4>📚 ESG</h4>
                <div class="formula-box">
                    <strong>E</strong>nvironmental + <strong>S</strong>ocial + <strong>G</strong>overnance
                </div>
            `
        }
    }
};

// Export data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = entrepreneurshipData;
}
