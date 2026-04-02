// ===== TE2 STUDY MASTER - QUESTION DATABASE =====
// All content from te2 everything.txt organized by categories

const studyData = {
    
    // ========== CATEGORY 1: PRICING & STRATEGIES ==========
    pricing: {
        name: "Pricing & Strategies",
        icon: "fa-tags",
        color: "#6366f1",
        
        flashcards: [
            {
                question: "Is price the most critical variable of the tourism firm?",
                answer: "NO - Price is NOT the most critical variable of the tourism firm",
                explanation: "There are many other factors that influence the success of a tourism firm besides price."
            },
            {
                question: "List the 7 determinants of tourism prices",
                answer: "1. The firm's objective\n2. The firm's ownership characteristics\n3. The market structure\n4. Method of distribution\n5. The firm's position in the marketplace\n6. The degree of competition\n7. The firm's cost structure",
                explanation: "These 7 factors determine how a firm sets its prices."
            },
            {
                question: "What happens if you set HIGHER prices with ELASTIC demand?",
                answer: "Fewer buyers and smaller potential revenue",
                explanation: "Elastic demand = consumers are sensitive to price. Higher price = they buy less."
            },
            {
                question: "What happens if you set LOWER prices with INELASTIC demand?",
                answer: "More buyers, but small potential revenue",
                explanation: "Inelastic demand = consumers buy regardless of price. Lower price just reduces revenue."
            },
            {
                question: "What are the 3 main pricing strategies?",
                answer: "1. COST-BASED (based on costs)\n2. MARKET-BASED (based on market conditions)\n3. COMPETITION-BASED (based on competitors)",
                explanation: "Three main approaches to pricing in tourism."
            },
            {
                question: "What is COST-BASED pricing?",
                answer: "Setting prices based on the costs for producing, distributing and selling",
                explanation: "Price = costs + desired profit margin"
            },
            {
                question: "What is MARKET-BASED pricing?",
                answer: "Setting prices of goods/services based on current market conditions",
                explanation: "Price adapts to what the market can bear."
            },
            {
                question: "What is COMPETITION-BASED pricing?",
                answer: "Setting prices based on competitors' prices",
                explanation: "Monitor what competition charges and adapt accordingly."
            },
            {
                question: "What are NON-PROFIT GOALS?",
                answer: "Goals that firms can pursue that are not profit driven",
                explanation: "Some organizations have other priorities besides profit (e.g., social impact, ecology)."
            }
        ],
        
        quiz: [
            {
                question: "Which statement is TRUE about price in tourism?",
                options: [
                    "Price is the most critical variable of the tourism firm",
                    "Price is NOT the most critical variable of the tourism firm",
                    "Price is the only factor affecting demand",
                    "Price never changes"
                ],
                correct: 1
            },
            {
                question: "How many determinants of tourism prices are there?",
                options: ["3", "5", "7", "10"],
                correct: 2
            },
            {
                question: "If demand is ELASTIC and you raise the price, what happens?",
                options: [
                    "More buyers, higher revenue",
                    "Fewer buyers, smaller revenue",
                    "Same number of buyers",
                    "Demand becomes inelastic"
                ],
                correct: 1
            },
            {
                question: "COST-BASED pricing is based on:",
                options: [
                    "Competitor prices",
                    "Market conditions",
                    "Costs of producing, distributing and selling",
                    "Customer preferences"
                ],
                correct: 2
            },
            {
                question: "MARKET-BASED pricing means:",
                options: [
                    "Price is based on costs",
                    "Price is based on current market conditions",
                    "Price is fixed",
                    "Price is based only on competition"
                ],
                correct: 1
            },
            {
                question: "Which is NOT a determinant of tourism prices?",
                options: [
                    "The firm's objective",
                    "Cost structure",
                    "Logo color",
                    "Degree of competition"
                ],
                correct: 2
            }
        ],
        
        fillBlanks: [
            {
                sentence: "The three pricing strategies are: Cost-based, _______ and Competition-based.",
                answer: "Market-based",
                hint: "Based on the market..."
            },
            {
                sentence: "With elastic demand, higher prices result in _______ buyers.",
                answer: "fewer",
                hint: "Opposite of more..."
            },
            {
                sentence: "_______ pricing is based on the costs of producing and distributing.",
                answer: "Cost-based",
                hint: "Cost = expense"
            }
        ],
        
        learn: {
            title: "Pricing and Strategies in Tourism",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400",
            content: `
                <p><span class="highlight">Price is NOT the most critical variable</span> of the tourism firm - there are many other factors!</p>
                
                <h4>7 Determinants of Tourism Prices:</h4>
                <ul>
                    <li>The firm's objective</li>
                    <li>Ownership characteristics</li>
                    <li>Market structure</li>
                    <li>Method of distribution</li>
                    <li>Position in the marketplace</li>
                    <li>Degree of competition</li>
                    <li>Cost structure</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Remember!</h4>
                    <p>ELASTIC demand + higher price = FEWER buyers<br>
                    INELASTIC demand + lower price = small revenue</p>
                </div>
                
                <h4>3 Pricing Strategies:</h4>
                <div class="formula-box">
                    COST-BASED = costs + margin<br>
                    MARKET-BASED = market conditions<br>
                    COMPETITION-BASED = competitor prices
                </div>
            `
        }
    },
    
    // ========== CATEGORY 2: EXPENDITURE & MULTIPLIERS ==========
    expenditure: {
        name: "Expenditure & Multipliers",
        icon: "fa-money-bill-wave",
        color: "#10b981",
        
        flashcards: [
            {
                question: "What is DIRECT EXPENDITURE?",
                answer: "Suppliers who sell goods and services DIRECTLY to tourists",
                explanation: "E.g., hotel, restaurant, travel agency - tourists pay them directly."
            },
            {
                question: "What is INDIRECT EXPENDITURE?",
                answer: "When firms receiving tourist expenditure purchase inputs from other firms",
                explanation: "E.g., hotel buys linens from supplier - this is an indirect effect."
            },
            {
                question: "What is INDUCED EXPENDITURE?",
                answer: "When managers, workers and their families spend their incomes 'downstream' (supermarkets, bookstores...)",
                explanation: "The wages they earn are spent in the local economy."
            },
            {
                question: "What is the formula for MULTIPLIER?",
                answer: "Multiplier = Total Impact / Direct Expenditure",
                explanation: "Shows how much the initial tourist spending 'multiplied' through the economy."
            },
            {
                question: "What is the TOTAL EFFECT?",
                answer: "The sum of the direct, indirect, and induced effects",
                explanation: "Total Effect = Direct + Indirect + Induced"
            },
            {
                question: "List the 7 effects of increased tourist expenditure",
                answer: "1. Increased local production and output\n2. Creates new business and employment\n3. Generates foreign exchange earnings\n4. Creates new investment opportunities\n5. Increased government revenue\n6. Assists regional development\n7. Reduces poverty",
                explanation: "Seven positive effects of tourism on the economy."
            },
            {
                question: "List the 5 types of multipliers",
                answer: "1. Sales multiplier\n2. Output multiplier\n3. Income multiplier\n4. Value-added multiplier\n5. Employment multiplier",
                explanation: "Five ways to measure the multiplier effect of tourism."
            },
            {
                question: "What is 'Basic measure' in tourism?",
                answer: "Measure by type of visitor, trip, visitor night",
                explanation: "Basic units of measuring tourist activity."
            },
            {
                question: "What does 'Total effects' increase?",
                answer: "Output, Sales, Value added, GDP, Household income, Employment",
                explanation: "Six economic variables affected by tourist expenditure."
            }
        ],
        
        quiz: [
            {
                question: "DIRECT expenditure refers to:",
                options: [
                    "Purchasing from suppliers",
                    "Selling goods and services DIRECTLY to tourists",
                    "Worker wages",
                    "Government taxes"
                ],
                correct: 1
            },
            {
                question: "What is the formula for the multiplier?",
                options: [
                    "Direct / Total",
                    "Total Impact / Direct Expenditure",
                    "Indirect + Induced",
                    "GDP / Tourism"
                ],
                correct: 1
            },
            {
                question: "INDUCED expenditure occurs when:",
                options: [
                    "Tourists buy souvenirs",
                    "Hotel buys furniture",
                    "Workers and their families spend their wages",
                    "Government collects taxes"
                ],
                correct: 2
            },
            {
                question: "How many types of multipliers are there?",
                options: ["3", "5", "7", "10"],
                correct: 1
            },
            {
                question: "Total Effect is:",
                options: [
                    "Only direct effect",
                    "Direct + Indirect",
                    "Direct + Indirect + Induced",
                    "Tourism GDP"
                ],
                correct: 2
            },
            {
                question: "Which is NOT an effect of increased tourist expenditure?",
                options: [
                    "New jobs",
                    "Foreign exchange earnings",
                    "Poverty reduction",
                    "Increased pollution"
                ],
                correct: 3
            },
            {
                question: "INDIRECT expenditure is when:",
                options: [
                    "Tourists pay the hotel",
                    "Firms purchase inputs from other firms",
                    "Workers spend wages",
                    "Government invests"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "Multiplier = Total Impact / _______ Expenditure",
                answer: "Direct",
                hint: "The first type of expenditure..."
            },
            {
                sentence: "Total Effect = Direct + Indirect + _______",
                answer: "Induced",
                hint: "The third type of expenditure..."
            },
            {
                sentence: "_______ expenditure is when workers spend their wages downstream.",
                answer: "Induced",
                hint: "Induced means..."
            },
            {
                sentence: "There are _______ types of multipliers.",
                answer: "five",
                hint: "5..."
            }
        ],
        
        learn: {
            title: "Expenditure and Multipliers",
            image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400",
            content: `
                <h4>Three types of tourist expenditure:</h4>
                <ul>
                    <li><strong>DIRECT</strong> - tourists pay directly (hotel, restaurant)</li>
                    <li><strong>INDIRECT</strong> - firms buy from suppliers</li>
                    <li><strong>INDUCED</strong> - workers spend wages in economy</li>
                </ul>
                
                <div class="formula-box">
                    <strong>MULTIPLIER = Total Impact / Direct Expenditure</strong>
                </div>
                
                <div class="formula-box">
                    <strong>Total Effect = Direct + Indirect + Induced</strong>
                </div>
                
                <h4>7 Effects of tourist expenditure:</h4>
                <ul>
                    <li>Increased local production and output</li>
                    <li>Creates new business and employment</li>
                    <li>Generates foreign exchange earnings</li>
                    <li>Creates new investment opportunities</li>
                    <li>Increased government revenue</li>
                    <li>Assists regional development</li>
                    <li>Reduces poverty</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> 5 Types of Multipliers</h4>
                    <p>Sales, Output, Income, Value-added, Employment</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 3: TSA & MEASUREMENT ==========
    tsa: {
        name: "TSA & Measurement",
        icon: "fa-chart-pie",
        color: "#8b5cf6",
        
        flashcards: [
            {
                question: "What is TSA (Tourism Satellite Accounts)?",
                answer: "A standard statistical framework and the main tool for the economic measurement of tourism",
                explanation: "TSA allows comparison of tourism with other economic sectors."
            },
            {
                question: "What is the problem with measuring the economic significance of tourism?",
                answer: "Tourism does NOT EXIST as a distinct sector in any system of economic statistics or national accounts",
                explanation: "Unlike industry or agriculture, tourism is spread across many sectors."
            },
            {
                question: "List the 9 key measures in TSA",
                answer: "1. Tourism expenditure\n2. Tourism consumption\n3. Tourism output\n4. TGVA (Tourism Gross Value Added)\n5. TGDP (Tourism GDP)\n6. TGOP (Tourism Gross Operating Surplus)\n7. Tourism employment\n8. Tourism exports\n9. Tourism imports",
                explanation: "9 key indicators in the TSA system."
            },
            {
                question: "What is TGVA?",
                answer: "Tourism Gross Value Added",
                explanation: "Measures the value that tourism adds to the economy."
            },
            {
                question: "What is TGDP?",
                answer: "Tourism Gross Domestic Product",
                explanation: "Total value of tourism production in a country."
            },
            {
                question: "What is the difference between Economic CONTRIBUTION and Economic IMPACT?",
                answer: "CONTRIBUTION = what tourism's spending makes to key economic variables\nIMPACT = the CHANGES in the economic contribution resulting from specific events or activities",
                explanation: "Contribution is a state, Impact is a change."
            },
            {
                question: "What does economic contribution of tourism include?",
                answer: "GDP, Household income, Value added, Foreign exchange earnings, Employment...",
                explanation: "Key economic variables that tourism contributes to."
            },
            {
                question: "What does the impact of tourism on the country's economy depend on? (2 factors)",
                answer: "1. The content and quality of direct tourist product\n2. The extent to which the country's economy is able to offer products and services",
                explanation: "Two key factors that determine the economic impact of tourism."
            }
        ],
        
        quiz: [
            {
                question: "What does TSA stand for?",
                options: [
                    "Tourism Statistical Analysis",
                    "Tourism Satellite Accounts",
                    "Total Sales Assessment",
                    "Travel Service Agency"
                ],
                correct: 1
            },
            {
                question: "Why is it difficult to measure the economic significance of tourism?",
                options: [
                    "Tourism is too small a sector",
                    "Tourism does not exist as a distinct sector in national accounts",
                    "Not enough data",
                    "Tourists don't spend money"
                ],
                correct: 1
            },
            {
                question: "TGVA means:",
                options: [
                    "Tourism Government Value Assessment",
                    "Total Gross Value Analysis",
                    "Tourism Gross Value Added",
                    "Travel Guide Verification Agency"
                ],
                correct: 2
            },
            {
                question: "Economic IMPACT refers to:",
                options: [
                    "Constant contribution of tourism",
                    "Changes in contribution resulting from specific events",
                    "Number of tourists",
                    "Hotel prices"
                ],
                correct: 1
            },
            {
                question: "How many key measures are in TSA?",
                options: ["5", "7", "9", "12"],
                correct: 2
            },
            {
                question: "Economic CONTRIBUTION refers to:",
                options: [
                    "Changes in tourism",
                    "What tourism's spending makes to key economic variables",
                    "Number of employees",
                    "Tourism taxes"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "TSA means Tourism _______ Accounts.",
                answer: "Satellite",
                hint: "Like a satellite orbiting..."
            },
            {
                sentence: "TGDP means Tourism Gross _______ Product.",
                answer: "Domestic",
                hint: "Home country..."
            },
            {
                sentence: "Economic _______ refers to changes resulting from specific events.",
                answer: "Impact",
                hint: "Effect..."
            },
            {
                sentence: "Tourism does NOT EXIST as a distinct _______ in national accounts.",
                answer: "sector",
                hint: "Part of the economy..."
            }
        ],
        
        learn: {
            title: "TSA - Tourism Satellite Accounts",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
            content: `
                <p><span class="highlight">Problem:</span> Tourism does NOT EXIST as a distinct sector in national accounts!</p>
                
                <p><span class="highlight">Solution:</span> TSA (Tourism Satellite Accounts) - a standard statistical framework for measuring tourism.</p>
                
                <h4>9 Key Measures in TSA:</h4>
                <ul>
                    <li>Tourism expenditure</li>
                    <li>Tourism consumption</li>
                    <li>Tourism output</li>
                    <li>TGVA - Tourism Gross Value Added</li>
                    <li>TGDP - Tourism Gross Domestic Product</li>
                    <li>TGOP - Tourism Gross Operating Surplus</li>
                    <li>Tourism employment</li>
                    <li>Tourism exports</li>
                    <li>Tourism imports</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Contribution vs Impact</h4>
                    <p><strong>Contribution</strong> = what tourism contributes (state)<br>
                    <strong>Impact</strong> = changes from events (change)</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 4: ENVIRONMENT & RESOURCES ==========
    environment: {
        name: "Environment & Resources",
        icon: "fa-leaf",
        color: "#059669",
        
        flashcards: [
            {
                question: "Through which 3 resources does tourism affect the environment?",
                answer: "1. NATURAL RESOURCES\n2. HUMAN RESOURCES\n3. BUILT RESOURCES",
                explanation: "Three categories of resources that tourism impacts."
            },
            {
                question: "What are the 3 major sources of MARKET FAILURE?",
                answer: "1. Lack of property rights to environmental resources\n2. Externalities\n3. Public goods",
                explanation: "Three reasons why the market doesn't adequately protect the environment."
            },
            {
                question: "What is Tourism Carrying Capacity?",
                answer: "The maximum number of people that may visit a tourist destination at the same time",
                explanation: "The limit beyond which degradation occurs."
            },
            {
                question: "What are ECONOMIC INSTRUMENTS in environmental protection?",
                answer: "Controls imposed on environmentally damaging activity",
                explanation: "Economic tools to reduce pollution and damage."
            },
            {
                question: "What are the 3 strategies for pollution control?",
                answer: "1. Voluntary agreements\n2. Merger\n3. Tax on output and on pollution",
                explanation: "Three ways to control pollution in tourism."
            },
            {
                question: "What are EXTERNALITIES?",
                answer: "Costs or benefits that affect third parties not involved in the transaction",
                explanation: "E.g., airplane pollution affecting local residents."
            },
            {
                question: "Why are PUBLIC GOODS a problem?",
                answer: "Nobody owns them, so nobody protects them - everyone can use them, but nobody pays for maintenance",
                explanation: "E.g., beaches, national parks - can be overused."
            }
        ],
        
        quiz: [
            {
                question: "Which resource is NOT directly related to tourism?",
                options: [
                    "Natural resources",
                    "Human resources",
                    "Digital resources",
                    "Built resources"
                ],
                correct: 2
            },
            {
                question: "Tourism Carrying Capacity is:",
                options: [
                    "Hotel capacity",
                    "Maximum number of tourists who can visit a destination at the same time",
                    "Number of buses",
                    "Beach size"
                ],
                correct: 1
            },
            {
                question: "How many sources of market failure are there?",
                options: ["2", "3", "4", "5"],
                correct: 1
            },
            {
                question: "Which is NOT a strategy for pollution control?",
                options: [
                    "Voluntary agreements",
                    "Merger",
                    "Marketing",
                    "Tax on pollution"
                ],
                correct: 2
            },
            {
                question: "Economic instruments are:",
                options: [
                    "Financial reports",
                    "Controls imposed on environmentally damaging activity",
                    "Tourist guides",
                    "Accounting standards"
                ],
                correct: 1
            },
            {
                question: "Externalities are:",
                options: [
                    "Internal costs of the firm",
                    "Costs/benefits that affect third parties",
                    "Types of taxes",
                    "Tourism products"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "Tourism Carrying _______ is the maximum number of visitors at the same time.",
                answer: "Capacity",
                hint: "Ability to hold..."
            },
            {
                sentence: "Three sources of market failure are: lack of property rights, externalities, and _______ goods.",
                answer: "public",
                hint: "Belonging to everyone..."
            },
            {
                sentence: "Tourism affects Natural, Human, and _______ resources.",
                answer: "Built",
                hint: "Constructed..."
            }
        ],
        
        learn: {
            title: "Environment and Resources",
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
            content: `
                <h4>Tourism affects 3 types of resources:</h4>
                <ul>
                    <li><strong>NATURAL</strong> - natural resources (sea, mountains, forests)</li>
                    <li><strong>HUMAN</strong> - human resources (local population, culture)</li>
                    <li><strong>BUILT</strong> - built resources (infrastructure, monuments)</li>
                </ul>
                
                <h4>3 Sources of MARKET FAILURE:</h4>
                <ul>
                    <li>Lack of property rights to environmental resources</li>
                    <li>Externalities (external effects)</li>
                    <li>Public goods</li>
                </ul>
                
                <div class="formula-box">
                    <strong>Tourism Carrying Capacity</strong><br>
                    = Maximum number of visitors at the same time
                </div>
                
                <h4>Strategies for pollution control:</h4>
                <ul>
                    <li>Voluntary agreements</li>
                    <li>Merger</li>
                    <li>Tax on output and pollution</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Remember!</h4>
                    <p>Economic instruments = controls on damaging activities</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 5: SUSTAINABLE TOURISM ==========
    sustainability: {
        name: "Sustainable Tourism",
        icon: "fa-recycle",
        color: "#0ea5e9",
        
        flashcards: [
            {
                question: "What is SUSTAINABLE TOURISM?",
                answer: "Tourism that has:\n• Viable, long-term economic operations\n• Respect for host communities\n• Benefits that are distributed fairly\n• Making optimal use of environmental resources",
                explanation: "Four key elements of sustainable tourism."
            },
            {
                question: "What is the formula for SUSTAINABLE DEVELOPMENT?",
                answer: "Sustainable Development = Social + Economic + Environmental",
                explanation: "Three pillars of sustainable development."
            },
            {
                question: "What is a GREEN ECONOMY?",
                answer: "One that results in improved human well-being",
                explanation: "Focus on quality of life, not just profit."
            },
            {
                question: "What is the GROWTH MANAGEMENT approach?",
                answer: "The approach that argues tourism's problems can be solved by better, more efficient management of tourism development, supported by improvements in technology",
                explanation: "Positive view - problems can be solved with better management."
            },
            {
                question: "What does Good Growth Management achieve?",
                answer: "1. Economic sustainability\n2. Socio-cultural sustainability\n3. Environmental sustainability",
                explanation: "Three types of sustainability achieved through good management."
            },
            {
                question: "What is the 'HETERODOX' alternative view?",
                answer: "Slow tourism, ethical tourism, responsible tourism, regenerative tourism, and degrowth",
                explanation: "Alternative approaches that criticize traditional tourism growth."
            },
            {
                question: "What is REGENERATIVE TOURISM?",
                answer: "Tourism that minimizes negative impacts AND actively contributes to the regeneration of local ecosystems, economies, and cultures. Goal: to leave a destination BETTER than it was found.",
                explanation: "Goes beyond sustainable - not just not harming, but actively improving."
            },
            {
                question: "What is the difference between Sustainable and Regenerative tourism?",
                answer: "SUSTAINABLE = seeks to lessen the harm done by tourism\nREGENERATIVE = lessens harm + actively improves the destination",
                explanation: "Regenerative goes a step further than sustainable."
            }
        ],
        
        quiz: [
            {
                question: "Sustainable Development includes:",
                options: [
                    "Only economic aspect",
                    "Social + Economic + Environmental",
                    "Only environmental aspect",
                    "Marketing + Sales"
                ],
                correct: 1
            },
            {
                question: "Regenerative tourism aims to:",
                options: [
                    "Only not harm",
                    "Maximize profit",
                    "Leave a destination BETTER than before",
                    "Reduce number of tourists"
                ],
                correct: 2
            },
            {
                question: "Growth Management approach believes problems are solved by:",
                options: [
                    "Closing tourism",
                    "Ignoring problems",
                    "Better management and technology",
                    "Raising prices"
                ],
                correct: 2
            },
            {
                question: "Green Economy results in:",
                options: [
                    "Higher profit",
                    "Improved human well-being",
                    "More tourists",
                    "Lower taxes"
                ],
                correct: 1
            },
            {
                question: "Which is NOT part of the 'heterodox' alternative view?",
                options: [
                    "Slow tourism",
                    "Mass tourism",
                    "Regenerative tourism",
                    "Degrowth"
                ],
                correct: 1
            },
            {
                question: "Sustainable tourism seeks to:",
                options: [
                    "Increase harm",
                    "Lessen the harm done by tourism",
                    "Ignore problems",
                    "Maximize profit"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "Sustainable Development = Social + Economic + _______",
                answer: "Environmental",
                hint: "Nature..."
            },
            {
                sentence: "_______ tourism leaves a destination better than it was found.",
                answer: "Regenerative",
                hint: "To regenerate..."
            },
            {
                sentence: "Green economy results in improved human _______.",
                answer: "well-being",
                hint: "Wellness..."
            },
            {
                sentence: "Growth _______ approach believes in better management and technology.",
                answer: "Management",
                hint: "Managing..."
            }
        ],
        
        learn: {
            title: "Sustainable and Regenerative Tourism",
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400",
            content: `
                <div class="formula-box">
                    <strong>Sustainable Development = Social + Economic + Environmental</strong>
                </div>
                
                <h4>Sustainable Tourism includes:</h4>
                <ul>
                    <li>Viable, long-term economic operations</li>
                    <li>Respect for host communities</li>
                    <li>Fairly distributed benefits</li>
                    <li>Optimal use of resources</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Sustainable vs Regenerative</h4>
                    <p><strong>Sustainable</strong> = lessens harm<br>
                    <strong>Regenerative</strong> = lessens harm + IMPROVES destination</p>
                </div>
                
                <h4>Green Economy</h4>
                <p>An economy that results in <span class="highlight">improved human well-being</span></p>
                
                <h4>Alternative approaches (Heterodox):</h4>
                <ul>
                    <li>Slow tourism</li>
                    <li>Ethical & responsible tourism</li>
                    <li>Regenerative tourism</li>
                    <li>Degrowth</li>
                </ul>
            `
        }
    },
    
    // ========== CATEGORY 6: COSTS & BENEFITS ==========
    impacts: {
        name: "Costs & Benefits",
        icon: "fa-balance-scale",
        color: "#f59e0b",
        
        flashcards: [
            {
                question: "What are the 3 types of POTENTIAL BENEFITS of tourism?",
                answer: "1. Economic\n2. Socio-cultural\n3. Environmental",
                explanation: "Three categories of positive tourism impacts."
            },
            {
                question: "What are the ECONOMIC COSTS of tourism?",
                answer: "• Increased prices\n• Increased cost of living\n• Increased property taxes for residents",
                explanation: "Negative economic impacts on local population."
            },
            {
                question: "What are the SOCIO-CULTURAL COSTS of tourism?",
                answer: "• Hectic community and lifestyle\n• Loss of 'authenticity'",
                explanation: "Negative impacts on culture and way of life."
            },
            {
                question: "What are the ENVIRONMENTAL COSTS of tourism?",
                answer: "• Water quality\n• Coastal erosion\n• And other environmental problems",
                explanation: "Negative impacts on the environment."
            },
            {
                question: "How does tourism affect PRICES for local residents?",
                answer: "Increases prices, cost of living, and property taxes",
                explanation: "Gentrification - tourism makes life more expensive for locals."
            }
        ],
        
        quiz: [
            {
                question: "What are the 3 categories of tourism benefits?",
                options: [
                    "Financial, Marketing, HR",
                    "Economic, Socio-cultural, Environmental",
                    "Local, Regional, National",
                    "Short-term, Medium-term, Long-term"
                ],
                correct: 1
            },
            {
                question: "Economic costs of tourism include:",
                options: [
                    "Lower prices",
                    "Increased prices and cost of living",
                    "More jobs",
                    "Better wages"
                ],
                correct: 1
            },
            {
                question: "'Loss of authenticity' is a:",
                options: [
                    "Economic cost",
                    "Socio-cultural cost",
                    "Environmental cost",
                    "Financial cost"
                ],
                correct: 1
            },
            {
                question: "Coastal erosion is an:",
                options: [
                    "Economic cost",
                    "Socio-cultural cost",
                    "Environmental cost",
                    "Political cost"
                ],
                correct: 2
            },
            {
                question: "Tourism can cause 'hectic community'. This is a:",
                options: [
                    "Benefit",
                    "Socio-cultural cost",
                    "Economic benefit",
                    "Environmental benefit"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "Three categories of tourism benefits are: Economic, Socio-cultural, and _______.",
                answer: "Environmental",
                hint: "Nature..."
            },
            {
                sentence: "Loss of _______ is a socio-cultural cost of tourism.",
                answer: "authenticity",
                hint: "Being authentic..."
            },
            {
                sentence: "Coastal erosion is an _______ cost of tourism.",
                answer: "environmental",
                hint: "Related to nature..."
            }
        ],
        
        learn: {
            title: "Costs and Benefits of Tourism",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            content: `
                <h4>✅ POTENTIAL BENEFITS:</h4>
                <ul>
                    <li><strong>Economic</strong> - jobs, income, investments</li>
                    <li><strong>Socio-cultural</strong> - cultural exchange, tradition preservation</li>
                    <li><strong>Environmental</strong> - area protection, ecological awareness</li>
                </ul>
                
                <h4>❌ COSTS OF TOURISM:</h4>
                
                <p><strong>Economic Costs:</strong></p>
                <ul>
                    <li>Increased prices</li>
                    <li>Higher cost of living</li>
                    <li>Increased property taxes</li>
                </ul>
                
                <p><strong>Socio-cultural Costs:</strong></p>
                <ul>
                    <li>Hectic community</li>
                    <li>Loss of authenticity</li>
                </ul>
                
                <p><strong>Environmental Costs:</strong></p>
                <ul>
                    <li>Water quality</li>
                    <li>Coastal erosion</li>
                    <li>Pollution</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Balance is Key!</h4>
                    <p>The goal is to maximize benefits and minimize costs.</p>
                </div>
            `
        }
    }
};

// Export data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = studyData;
}
