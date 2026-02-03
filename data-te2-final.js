// ===== TE2 FINAL TEST - COMPREHENSIVE STUDY DATA =====
// Complete content from TE Final Exam preparation

const te2FinalData = {
    
    // ========== CATEGORY 1: FUNDAMENTALS ==========
    fundamentals: {
        name: "Tourism Fundamentals",
        icon: "fa-globe-americas",
        color: "#6366f1",
        
        flashcards: [
            {
                question: "What is the origin of the word 'tour'?",
                answer: "Latin word 'tornus' meaning 'a tool for making a circle'",
                explanation: "The etymology reflects the circular nature of travel - leaving home and returning."
            },
            {
                question: "What are the 3 key dimensions of tourism?",
                answer: "1. Movement\n2. Length of stay\n3. Motivation",
                explanation: "These three dimensions define what makes an activity 'tourism'."
            },
            {
                question: "What are the 5 A's of tourism?",
                answer: "1. Attractions\n2. Access\n3. Amenities\n4. Accommodation\n5. Activities",
                explanation: "The 5 A's framework for understanding tourism destinations."
            },
            {
                question: "What is the difference between tourists and day-trippers?",
                answer: "Tourists: stay more than 24 hours\nDay-trippers: stay less than 24 hours",
                explanation: "Visitors = Tourists + Day-trippers"
            },
            {
                question: "What are the 2 types of tourism?",
                answer: "1. International (outbound + inbound)\n2. Domestic (within same country)",
                explanation: "Outbound = leaving homeland, Inbound = incoming tourists"
            },
            {
                question: "What are the 4 impacts of tourism development?",
                answer: "1. Economic\n2. Environmental\n3. Social\n4. Cultural",
                explanation: "Tourism affects destinations in these four key areas."
            },
            {
                question: "Why are tourists important?",
                answer: "• Boost economy revenue\n• Create thousands of jobs\n• Develop infrastructure\n• Cultural exchange",
                explanation: "Four key benefits of tourism for destinations."
            },
            {
                question: "What is UNWTO?",
                answer: "United Nations World Tourism Organisation",
                explanation: "The main international body for tourism policy and statistics."
            },
            {
                question: "When is World Tourism Day?",
                answer: "September 27th",
                explanation: "Celebrated annually to promote tourism awareness."
            }
        ],
        
        quiz: [
            {
                question: "The word 'tour' comes from which Latin word?",
                options: ["Tornus", "Turismo", "Travela", "Tourus"],
                correct: 0
            },
            {
                question: "Which is NOT one of the 5 A's of tourism?",
                options: ["Attractions", "Access", "Advertising", "Accommodation"],
                correct: 2
            },
            {
                question: "Visitors who stay less than 24 hours are called:",
                options: ["Tourists", "Day-trippers", "Excursionists", "Travelers"],
                correct: 1
            },
            {
                question: "When is World Tourism Day celebrated?",
                options: ["January 1st", "June 21st", "September 27th", "December 25th"],
                correct: 2
            },
            {
                question: "Which is NOT an impact of tourism development?",
                options: ["Economic", "Environmental", "Technological", "Cultural"],
                correct: 2
            }
        ],
        
        fillBlanks: [
            {
                sentence: "The 5 A's are: Attractions, Access, Amenities, _______ and Activities.",
                answer: "Accommodation",
                hint: "Where tourists sleep..."
            },
            {
                sentence: "Visitors = Tourists + _______.",
                answer: "Day-trippers",
                hint: "Those who stay less than 24 hours..."
            }
        ],
        
        learn: {
            title: "Tourism Fundamentals",
            content: `
                <h3>Origins of Tourism</h3>
                <p>The word <strong>'tour'</strong> comes from the Latin word <span class="highlight">tornus</span>, meaning 'a tool for making a circle.'</p>
                
                <h4>3 Key Dimensions of Tourism:</h4>
                <ul>
                    <li>Movement</li>
                    <li>Length of stay</li>
                    <li>Motivation</li>
                </ul>
                
                <div class="formula-box">
                    <h4><i class="fas fa-star"></i> The 5 A's</h4>
                    <p>Attractions • Access • Amenities • Accommodation • Activities</p>
                </div>
                
                <h4>Types of Visitors:</h4>
                <ul>
                    <li><strong>Tourists:</strong> Stay more than 24 hours</li>
                    <li><strong>Day-trippers:</strong> Stay less than 24 hours</li>
                </ul>
                
                <h4>Types of Tourism:</h4>
                <ul>
                    <li><strong>International:</strong> Outbound (leaving) + Inbound (incoming)</li>
                    <li><strong>Domestic:</strong> Travel within same country</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Remember!</h4>
                    <p>UNWTO = United Nations World Tourism Organisation<br>
                    World Tourism Day = September 27th</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 2: DEMAND ==========
    demand: {
        name: "Tourism Demand",
        icon: "fa-chart-line",
        color: "#10b981",
        
        flashcards: [
            {
                question: "What is tourism demand?",
                answer: "The ability of consumers to buy different amounts of a product at different prices during any period of time",
                explanation: "Basic economic definition of demand applied to tourism."
            },
            {
                question: "What are the 2 types of tourism demand?",
                answer: "1. Demand for travel to destination (arrivals, overnights, expenditure)\n2. Demand for tourism-related products/services (hotel rooms, meals)",
                explanation: "Demand can be measured at destination level or product level."
            },
            {
                question: "What is the Law of Demand?",
                answer: "Price and tourism demand have an INVERSE relationship",
                explanation: "When price goes up, demand goes down (and vice versa)."
            },
            {
                question: "What is the Bandwagon Effect?",
                answer: "People demand a product because others are purchasing it (because it is 'fashionable')",
                explanation: "Following the crowd - if everyone is going there, I want to go too."
            },
            {
                question: "What is the Snob Effect?",
                answer: "Consumers seek to be different and exclusive by demanding LESS of a product as more people consume it",
                explanation: "Opposite of bandwagon - I don't want to go where everyone else goes."
            },
            {
                question: "What is the Veblen Effect?",
                answer: "Individuals demand MORE of certain 'high status' products as their price RISES",
                explanation: "Luxury goods - higher price = more prestige = more demand."
            },
            {
                question: "What is Price Elasticity of Demand formula?",
                answer: "PED = (% Change in Quantity Demanded) / (% Change in Price)",
                explanation: "Measures how sensitive demand is to price changes."
            },
            {
                question: "What are the 3 forecasting methods?",
                answer: "1. Qualitative (experience, intuition)\n2. Quantitative (mathematical)\n3. Artificial Intelligence (bridge between qual and quant)",
                explanation: "Three approaches to predicting future tourism trends."
            }
        ],
        
        quiz: [
            {
                question: "The Law of Demand states that price and demand have:",
                options: ["Direct relationship", "Inverse relationship", "No relationship", "Positive correlation"],
                correct: 1
            },
            {
                question: "The Bandwagon Effect means people buy because:",
                options: ["It's cheap", "Others are buying it", "It's exclusive", "Price is rising"],
                correct: 1
            },
            {
                question: "The Veblen Effect applies to which type of goods?",
                options: ["Cheap goods", "Luxury/prestige goods", "Necessities", "Free goods"],
                correct: 1
            },
            {
                question: "Price Elasticity of Demand measures:",
                options: ["Supply sensitivity", "Demand sensitivity to price", "Income changes", "Marketing effectiveness"],
                correct: 1
            },
            {
                question: "Which forecasting method uses intuition and experience?",
                options: ["Quantitative", "Qualitative", "AI-based", "Regression"],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "The _______ Effect means people demand more when price rises (luxury goods).",
                answer: "Veblen",
                hint: "Named after economist Thorstein..."
            },
            {
                sentence: "Price and tourism demand have an _______ relationship.",
                answer: "inverse",
                hint: "Opposite of direct..."
            }
        ],
        
        learn: {
            title: "Tourism Demand",
            content: `
                <h3>Understanding Demand</h3>
                <p><strong>Tourism Demand:</strong> The ability of consumers to buy different amounts at different prices.</p>
                
                <h4>Law of Demand:</h4>
                <div class="formula-box">
                    <p>Price ↑ = Demand ↓<br>Price ↓ = Demand ↑<br>(Inverse relationship)</p>
                </div>
                
                <h4>Special Demand Effects:</h4>
                <ul>
                    <li><strong>Bandwagon:</strong> Buy because others buy (fashion)</li>
                    <li><strong>Snob:</strong> Buy LESS when others buy (exclusivity)</li>
                    <li><strong>Veblen:</strong> Buy MORE when price rises (prestige)</li>
                </ul>
                
                <h4>Elasticity Formulas:</h4>
                <div class="formula-box">
                    <p><strong>Price Elasticity:</strong> % Change Qty / % Change Price<br>
                    <strong>Income Elasticity:</strong> % Change Qty / % Change Income<br>
                    <strong>Cross-price:</strong> % Change Qty A / % Change Price B</p>
                </div>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Forecasting Methods</h4>
                    <p>1. Qualitative (experience)<br>2. Quantitative (math)<br>3. AI (bridge)</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 3: SUPPLY ==========
    supply: {
        name: "Tourism Supply & Costs",
        icon: "fa-industry",
        color: "#f59e0b",
        
        flashcards: [
            {
                question: "What are the 3 basic forms of inputs into tourism supply?",
                answer: "1. Natural resources\n2. Human resources\n3. Human-made resources",
                explanation: "Three categories of production inputs."
            },
            {
                question: "What is the difference between Variable and Fixed inputs?",
                answer: "Variable: Can be changed at short notice\nFixed: Cannot be easily adjusted",
                explanation: "Fixed costs stay the same regardless of output."
            },
            {
                question: "What are Explicit Costs?",
                answer: "Direct payments made by firms to outside suppliers of inputs",
                explanation: "Actual money paid out - wages, rent, materials."
            },
            {
                question: "What are Implicit Costs?",
                answer: "Opportunity costs that firms face in the use of their own resources",
                explanation: "What you give up by using resources one way instead of another."
            },
            {
                question: "What is the Total Cost formula?",
                answer: "TC = FC + VC\n(Total Cost = Fixed Cost + Variable Cost)",
                explanation: "Basic cost equation in economics."
            },
            {
                question: "What is Economy of Scale?",
                answer: "A given percentage increase in all inputs results in a LARGER percentage increase in output",
                explanation: "Producing more = lower cost per unit."
            },
            {
                question: "What is Diseconomy of Scale?",
                answer: "A given percentage increase in all inputs leads to a SMALLER percentage increase in output",
                explanation: "Getting too big = inefficiency."
            },
            {
                question: "What is a Supply Chain?",
                answer: "The network of organisations, people, activities, information and resources involved in moving a product from supplier to customer",
                explanation: "Everything involved in getting products to consumers."
            }
        ],
        
        quiz: [
            {
                question: "Which is NOT a basic form of tourism supply input?",
                options: ["Natural resources", "Human resources", "Financial resources", "Human-made resources"],
                correct: 2
            },
            {
                question: "Explicit costs are:",
                options: ["Opportunity costs", "Direct payments to suppliers", "Hidden costs", "Future costs"],
                correct: 1
            },
            {
                question: "Total Cost equals:",
                options: ["FC - VC", "FC + VC", "FC × VC", "FC / VC"],
                correct: 1
            },
            {
                question: "Economy of scale means larger inputs result in:",
                options: ["Smaller output increase", "Larger output increase", "Same output", "No change"],
                correct: 1
            },
            {
                question: "Variable inputs can be:",
                options: ["Never changed", "Changed at short notice", "Changed only annually", "Changed by government"],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "TC = FC + _______ (Total Cost formula).",
                answer: "VC",
                hint: "Variable..."
            },
            {
                sentence: "_______ costs are direct payments to outside suppliers.",
                answer: "Explicit",
                hint: "Opposite of implicit..."
            }
        ],
        
        learn: {
            title: "Supply and Costs",
            content: `
                <h3>Tourism Supply Inputs</h3>
                <ul>
                    <li><strong>Natural resources</strong></li>
                    <li><strong>Human resources</strong></li>
                    <li><strong>Human-made resources</strong></li>
                </ul>
                
                <h4>Types of Inputs:</h4>
                <ul>
                    <li><strong>Variable:</strong> Can change at short notice</li>
                    <li><strong>Fixed:</strong> Cannot be easily adjusted</li>
                </ul>
                
                <h4>Production Costs:</h4>
                <ul>
                    <li><strong>Explicit:</strong> Direct payments to suppliers</li>
                    <li><strong>Implicit:</strong> Opportunity costs</li>
                </ul>
                
                <div class="formula-box">
                    <h4><i class="fas fa-calculator"></i> Cost Formulas</h4>
                    <p>TC = FC + VC<br>
                    AC = TC / Q<br>
                    AFC = FC / Q<br>
                    AVC = VC / Q<br>
                    MC = dTC / dQ</p>
                </div>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Scale Effects</h4>
                    <p><strong>Economy of scale:</strong> Bigger = more efficient<br>
                    <strong>Diseconomy of scale:</strong> Too big = inefficient</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 4: PRICING ==========
    pricing: {
        name: "Pricing Strategies",
        icon: "fa-tags",
        color: "#8b5cf6",
        
        flashcards: [
            {
                question: "Is price the most critical variable for a tourism firm?",
                answer: "NO - Price is NOT the most critical variable",
                explanation: "Many other factors influence tourism firm success."
            },
            {
                question: "What are the 7 determinants of tourism prices?",
                answer: "1. Firm's objective\n2. Ownership characteristics\n3. Market structure\n4. Distribution method\n5. Market position\n6. Degree of competition\n7. Cost structure",
                explanation: "Seven factors that determine how prices are set."
            },
            {
                question: "What are the 3 pricing strategies?",
                answer: "1. COST-BASED (costs + margin)\n2. MARKET-BASED (market conditions)\n3. COMPETITION-BASED (competitor prices)",
                explanation: "Three main approaches to setting prices."
            },
            {
                question: "What happens with ELASTIC demand and higher prices?",
                answer: "Fewer buyers and smaller potential revenue",
                explanation: "Elastic = price sensitive. Higher price = less demand."
            },
            {
                question: "What happens with INELASTIC demand and lower prices?",
                answer: "More buyers, but smaller revenue potential",
                explanation: "Inelastic = not price sensitive. Lower price just reduces revenue."
            }
        ],
        
        quiz: [
            {
                question: "Price is the most critical variable for a tourism firm:",
                options: ["True", "False"],
                correct: 1
            },
            {
                question: "How many determinants of tourism prices are there?",
                options: ["3", "5", "7", "9"],
                correct: 2
            },
            {
                question: "Cost-based pricing means:",
                options: ["Based on competitors", "Based on costs + margin", "Based on market", "Based on demand"],
                correct: 1
            },
            {
                question: "With elastic demand and higher prices, you get:",
                options: ["More buyers", "Fewer buyers", "Same buyers", "No change"],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "The 3 pricing strategies are: Cost-based, Market-based, and _______-based.",
                answer: "Competition",
                hint: "Based on what rivals charge..."
            }
        ],
        
        learn: {
            title: "Pricing Strategies",
            content: `
                <h3>Key Pricing Concepts</h3>
                <p><span class="highlight">Price is NOT the most critical variable</span> for a tourism firm!</p>
                
                <h4>7 Determinants of Tourism Prices:</h4>
                <ol>
                    <li>Firm's objective</li>
                    <li>Ownership characteristics</li>
                    <li>Market structure</li>
                    <li>Distribution method</li>
                    <li>Market position</li>
                    <li>Degree of competition</li>
                    <li>Cost structure</li>
                </ol>
                
                <div class="formula-box">
                    <h4><i class="fas fa-tag"></i> 3 Pricing Strategies</h4>
                    <p><strong>COST-BASED:</strong> Costs + margin<br>
                    <strong>MARKET-BASED:</strong> Current market conditions<br>
                    <strong>COMPETITION-BASED:</strong> Competitor prices</p>
                </div>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Elasticity Effects</h4>
                    <p><strong>Elastic demand + ↑ price</strong> = fewer buyers<br>
                    <strong>Inelastic demand + ↓ price</strong> = small revenue</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 5: EXPENDITURE ==========
    expenditure: {
        name: "Expenditure & Multipliers",
        icon: "fa-money-bill-wave",
        color: "#059669",
        
        flashcards: [
            {
                question: "What is Direct Expenditure?",
                answer: "Suppliers who sell goods and services DIRECTLY to tourists",
                explanation: "Hotels, restaurants, attractions - tourists pay them directly."
            },
            {
                question: "What is Indirect Expenditure?",
                answer: "When firms receiving tourist expenditure purchase inputs from other firms",
                explanation: "Hotel buys linens, restaurant buys food from suppliers."
            },
            {
                question: "What is Induced Expenditure?",
                answer: "When managers, workers and families spend their incomes 'downstream' (supermarkets, bookstores...)",
                explanation: "Wages earned from tourism spent in local economy."
            },
            {
                question: "What is the Multiplier formula?",
                answer: "Multiplier = Total Impact / Direct Expenditure",
                explanation: "Shows how initial spending 'multiplies' through economy."
            },
            {
                question: "What is Total Effect?",
                answer: "Total Effect = Direct + Indirect + Induced effects",
                explanation: "The sum of all expenditure effects."
            },
            {
                question: "What are the 5 types of multipliers?",
                answer: "1. Sales multiplier\n2. Output multiplier\n3. Income multiplier\n4. Value-added multiplier\n5. Employment multiplier",
                explanation: "Five ways to measure the multiplier effect."
            },
            {
                question: "What are the 7 effects of increased tourist expenditure?",
                answer: "1. Increased local production\n2. Creates new business/employment\n3. Foreign exchange earnings\n4. New investment opportunities\n5. Government revenue\n6. Regional development\n7. Reduces poverty",
                explanation: "Seven positive effects of tourism spending."
            }
        ],
        
        quiz: [
            {
                question: "Direct expenditure involves selling:",
                options: ["To other businesses", "Directly to tourists", "To government", "To employees"],
                correct: 1
            },
            {
                question: "The Multiplier formula is:",
                options: ["Direct / Total", "Total Impact / Direct Expenditure", "Indirect × Induced", "GDP / Tourism"],
                correct: 1
            },
            {
                question: "Induced expenditure occurs when:",
                options: ["Tourists buy souvenirs", "Hotels buy supplies", "Workers spend their wages", "Government invests"],
                correct: 2
            },
            {
                question: "How many types of multipliers are there?",
                options: ["3", "5", "7", "9"],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "Multiplier = Total Impact / _______ Expenditure.",
                answer: "Direct",
                hint: "The initial spending..."
            },
            {
                sentence: "Total Effect = Direct + Indirect + _______ effects.",
                answer: "Induced",
                hint: "When workers spend their wages..."
            }
        ],
        
        learn: {
            title: "Expenditure and Multipliers",
            content: `
                <h3>Types of Expenditure</h3>
                <ul>
                    <li><strong>Direct:</strong> Selling directly to tourists</li>
                    <li><strong>Indirect:</strong> Firms buy from other firms</li>
                    <li><strong>Induced:</strong> Workers spend wages locally</li>
                </ul>
                
                <div class="formula-box">
                    <h4><i class="fas fa-calculator"></i> Key Formulas</h4>
                    <p><strong>Multiplier</strong> = Total Impact / Direct Expenditure<br>
                    <strong>Total Effect</strong> = Direct + Indirect + Induced</p>
                </div>
                
                <h4>5 Types of Multipliers:</h4>
                <ol>
                    <li>Sales multiplier</li>
                    <li>Output multiplier</li>
                    <li>Income multiplier</li>
                    <li>Value-added multiplier</li>
                    <li>Employment multiplier</li>
                </ol>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> 7 Effects of Tourist Spending</h4>
                    <p>↑ Local production • New jobs • Foreign exchange • Investment • Government revenue • Regional development • ↓ Poverty</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 6: TSA ==========
    tsa: {
        name: "Tourism Satellite Accounts",
        icon: "fa-chart-bar",
        color: "#ec4899",
        
        flashcards: [
            {
                question: "What is TSA?",
                answer: "Tourism Satellite Accounts - a standard statistical framework and main tool for economic measurement of tourism",
                explanation: "TSA solves the problem that tourism isn't a distinct sector in national accounts."
            },
            {
                question: "What are the key measures in TSA?",
                answer: "• Tourism expenditure\n• Tourism consumption\n• Tourism output\n• TGVA (Gross Value Added)\n• TGDP\n• TOGP\n• Tourism employment\n• Tourism exports/imports",
                explanation: "Key economic measures captured by TSA."
            },
            {
                question: "What is the difference between Economic Contribution and Economic Impact?",
                answer: "Contribution: Tourism spending's effect on key economic variables\nImpact: Changes in contribution from specific events/activities",
                explanation: "Contribution is ongoing, Impact is from specific changes."
            },
            {
                question: "Why is measuring tourism's economic significance difficult?",
                answer: "Because 'tourism' does not exist as a distinct sector in any system of economic statistics or national accounts",
                explanation: "Tourism cuts across many traditional economic sectors."
            }
        ],
        
        quiz: [
            {
                question: "TSA stands for:",
                options: ["Tourism Standard Analysis", "Tourism Satellite Accounts", "Travel Statistics Agency", "Tourism Spending Assessment"],
                correct: 1
            },
            {
                question: "Economic contribution refers to:",
                options: ["Specific event changes", "Ongoing spending effects", "Government grants", "Foreign investment"],
                correct: 1
            },
            {
                question: "Why is tourism hard to measure economically?",
                options: ["Too small", "Not in national accounts as distinct sector", "Too many tourists", "No data available"],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "TSA = Tourism _______ Accounts.",
                answer: "Satellite",
                hint: "Like a satellite orbiting the main system..."
            }
        ],
        
        learn: {
            title: "Tourism Satellite Accounts",
            content: `
                <h3>What is TSA?</h3>
                <p><strong>Tourism Satellite Accounts (TSA)</strong> = Standard statistical framework for measuring tourism economically.</p>
                
                <h4>The Problem:</h4>
                <p>Tourism doesn't exist as a distinct sector in national accounts - it cuts across many industries.</p>
                
                <h4>Key TSA Measures:</h4>
                <ul>
                    <li>Tourism expenditure</li>
                    <li>Tourism consumption</li>
                    <li>Tourism output</li>
                    <li>TGVA (Tourism Gross Value Added)</li>
                    <li>TGDP (Tourism GDP)</li>
                    <li>Tourism employment</li>
                    <li>Tourism exports/imports</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Contribution vs Impact</h4>
                    <p><strong>Contribution:</strong> Ongoing effect on economy<br>
                    <strong>Impact:</strong> Changes from specific events</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 7: ENVIRONMENT ==========
    environment: {
        name: "Environment & Market Failure",
        icon: "fa-leaf",
        color: "#22c55e",
        
        flashcards: [
            {
                question: "Through what does tourism affect the environment?",
                answer: "• Natural resources\n• Human resources\n• Built resources",
                explanation: "Tourism interacts with three types of resources."
            },
            {
                question: "What are the 3 major sources of market failure?",
                answer: "1. Lack of property rights to environmental resources\n2. Externalities\n3. Public goods",
                explanation: "Three reasons markets fail to protect the environment."
            },
            {
                question: "What is Tourism Carrying Capacity?",
                answer: "The maximum number of people that may visit a tourist destination at the same time",
                explanation: "Beyond this number, damage occurs to environment/experience."
            },
            {
                question: "What are Economic Instruments for environment?",
                answer: "Controls imposed on environmentally damaging activity",
                explanation: "Taxes, fees, tradable permits - using economic incentives."
            },
            {
                question: "What are 3 strategies for pollution control?",
                answer: "1. Voluntary agreements\n2. Merger\n3. Tax on output and pollution",
                explanation: "Three approaches to reducing environmental damage."
            }
        ],
        
        quiz: [
            {
                question: "Tourism Carrying Capacity is:",
                options: ["Maximum profit", "Maximum visitors at same time", "Maximum rooms", "Maximum flights"],
                correct: 1
            },
            {
                question: "Which is NOT a source of market failure?",
                options: ["Externalities", "Public goods", "High prices", "Lack of property rights"],
                correct: 2
            },
            {
                question: "Economic instruments for environment are:",
                options: ["Advertising", "Controls on damaging activity", "More tourism", "Building hotels"],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "Tourism _______ Capacity = maximum visitors at same time.",
                answer: "Carrying",
                hint: "How much can be carried..."
            }
        ],
        
        learn: {
            title: "Environment & Market Failure",
            content: `
                <h3>Tourism's Environmental Impact</h3>
                <p>Tourism affects environment through:</p>
                <ul>
                    <li>Natural resources</li>
                    <li>Human resources</li>
                    <li>Built resources</li>
                </ul>
                
                <h4>3 Sources of Market Failure:</h4>
                <ol>
                    <li>Lack of property rights to environmental resources</li>
                    <li>Externalities</li>
                    <li>Public goods</li>
                </ol>
                
                <div class="formula-box">
                    <h4><i class="fas fa-users"></i> Carrying Capacity</h4>
                    <p>Maximum visitors that can be at a destination at the same time without damage.</p>
                </div>
                
                <h4>Pollution Control Strategies:</h4>
                <ul>
                    <li>Voluntary agreements</li>
                    <li>Merger</li>
                    <li>Tax on output and pollution</li>
                </ul>
            `
        }
    },
    
    // ========== CATEGORY 8: SUSTAINABILITY ==========
    sustainability: {
        name: "Sustainability & Growth",
        icon: "fa-seedling",
        color: "#14b8a6",
        
        flashcards: [
            {
                question: "What are the potential benefits of tourism growth?",
                answer: "• Economic benefits\n• Socio-cultural benefits\n• Environmental benefits",
                explanation: "Three categories of positive impacts from tourism."
            },
            {
                question: "What are the costs of tourism growth?",
                answer: "Economic: Increased prices, cost of living\nSocio-cultural: Hectic lifestyle, loss of authenticity\nEnvironmental: Water quality, coastal erosion",
                explanation: "Three categories of negative impacts from tourism."
            },
            {
                question: "What is a Green Economy?",
                answer: "One that results in improved human well-being",
                explanation: "Focus on sustainability and quality of life."
            },
            {
                question: "What are the 4 pillars of Sustainable Tourism?",
                answer: "1. Viable long-term economic operations\n2. Respect for host communities\n3. Fairly distributed benefits\n4. Optimal use of environmental resources",
                explanation: "Four key requirements for sustainability."
            },
            {
                question: "What is Sustainable Development?",
                answer: "Social + Economic + Environmental sustainability combined",
                explanation: "Three pillars must work together."
            },
            {
                question: "What does Growth Management achieve?",
                answer: "• Economic sustainability\n• Socio-cultural sustainability\n• Environmental sustainability",
                explanation: "Three goals of proper tourism management."
            },
            {
                question: "What is Regenerative Tourism?",
                answer: "Seeks to not only minimize negative impact but actively contribute to REGENERATION of ecosystems, economies and cultures",
                explanation: "Leave destination BETTER than found - beyond sustainability."
            },
            {
                question: "What is the difference between Sustainable and Regenerative tourism?",
                answer: "Sustainable: Lessen the harm done by tourism\nRegenerative: Actively improve and restore the destination",
                explanation: "Sustainable = do less harm. Regenerative = do more good."
            }
        ],
        
        quiz: [
            {
                question: "Sustainable Development combines:",
                options: ["Social + Economic only", "Economic + Environmental only", "Social + Economic + Environmental", "Social + Environmental only"],
                correct: 2
            },
            {
                question: "Regenerative tourism aims to:",
                options: ["Minimize harm", "Leave destination better", "Increase profits", "Attract more tourists"],
                correct: 1
            },
            {
                question: "Which is an economic COST of tourism?",
                options: ["More jobs", "Foreign exchange", "Increased prices", "Investment"],
                correct: 2
            },
            {
                question: "A Green Economy results in:",
                options: ["More pollution", "Improved human well-being", "Higher prices", "Less tourism"],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "Sustainable Development = Social + Economic + _______.",
                answer: "Environmental",
                hint: "Nature, resources..."
            },
            {
                sentence: "_______ tourism seeks to leave destinations BETTER than found.",
                answer: "Regenerative",
                hint: "To regenerate means to renew..."
            }
        ],
        
        learn: {
            title: "Sustainability & Growth",
            content: `
                <h3>Benefits and Costs of Tourism</h3>
                
                <div class="tip-box">
                    <h4><i class="fas fa-plus-circle"></i> Benefits</h4>
                    <p>Economic • Socio-cultural • Environmental</p>
                </div>
                
                <div class="warning-box">
                    <h4><i class="fas fa-minus-circle"></i> Costs</h4>
                    <p><strong>Economic:</strong> ↑ Prices, cost of living<br>
                    <strong>Social:</strong> Hectic lifestyle, lost authenticity<br>
                    <strong>Environmental:</strong> Water, coastal erosion</p>
                </div>
                
                <h4>Sustainable Development:</h4>
                <div class="formula-box">
                    <p><strong>Sustainable = Social + Economic + Environmental</strong></p>
                </div>
                
                <h4>4 Pillars of Sustainable Tourism:</h4>
                <ol>
                    <li>Viable long-term economics</li>
                    <li>Respect for communities</li>
                    <li>Fair benefit distribution</li>
                    <li>Optimal environmental use</li>
                </ol>
                
                <h4>Sustainable vs Regenerative:</h4>
                <ul>
                    <li><strong>Sustainable:</strong> Lessen harm</li>
                    <li><strong>Regenerative:</strong> Actively improve and restore</li>
                </ul>
                
                <div class="example-box">
                    <h4><i class="fas fa-leaf"></i> Regenerative Tourism</h4>
                    <p>Goal: Leave destination BETTER than you found it!</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 9: MARKET STRUCTURE ==========
    marketStructure: {
        name: "Market Structure",
        icon: "fa-building",
        color: "#f97316",
        
        flashcards: [
            {
                question: "What are the 4 types of market structure?",
                answer: "1. Perfect competition (many buyers/sellers)\n2. Monopolistic competition (many, differentiated)\n3. Oligopoly (few firms dominate)\n4. Monopoly (one seller)",
                explanation: "Four market structures from most to least competitive."
            },
            {
                question: "What are the 7 major determinants of market structure?",
                answer: "1. Number of sellers\n2. Number of buyers\n3. Nature of goods/services\n4. Entry/exit barriers\n5. Information about conditions\n6. Economies of scale\n7. Product differentiation",
                explanation: "Seven factors that determine market structure."
            },
            {
                question: "What are the 3 competitive strategies?",
                answer: "1. Cost leadership (lowest costs)\n2. Product differentiation (better product)\n3. Focus (specific segment/area)",
                explanation: "Three ways firms compete in markets."
            },
            {
                question: "What does market structure affect?",
                answer: "• The firm's conduct (decision-making)\n• The firm's performance (profit potential)",
                explanation: "Structure affects how firms behave and perform."
            },
            {
                question: "What are 5 words associated with 'markets'?",
                answer: "Revenue, Costs, Consumer tastes, Technology, Stocks",
                explanation: "Five key concepts related to markets."
            }
        ],
        
        quiz: [
            {
                question: "An oligopoly is characterized by:",
                options: ["Many sellers", "One seller", "Few dominant firms", "No sellers"],
                correct: 2
            },
            {
                question: "Cost leadership strategy means:",
                options: ["Best quality", "Lowest costs", "Niche market", "Most advertising"],
                correct: 1
            },
            {
                question: "How many major determinants of market structure?",
                options: ["3", "5", "7", "9"],
                correct: 2
            },
            {
                question: "A monopoly has:",
                options: ["Many sellers", "Two sellers", "One seller", "No sellers"],
                correct: 2
            }
        ],
        
        fillBlanks: [
            {
                sentence: "An _______ is when a few firms dominate the market.",
                answer: "oligopoly",
                hint: "Oligo = few..."
            },
            {
                sentence: "The 3 competitive strategies are: Cost leadership, Product differentiation, and _______.",
                answer: "Focus",
                hint: "Concentrate on a specific area..."
            }
        ],
        
        learn: {
            title: "Market Structure",
            content: `
                <h3>4 Types of Market Structure</h3>
                <ol>
                    <li><strong>Perfect competition:</strong> Many buyers and sellers</li>
                    <li><strong>Monopolistic competition:</strong> Many sellers, differentiated products</li>
                    <li><strong>Oligopoly:</strong> Few firms dominate</li>
                    <li><strong>Monopoly:</strong> One seller only</li>
                </ol>
                
                <h4>7 Determinants of Structure:</h4>
                <ul>
                    <li>Number of sellers/buyers</li>
                    <li>Nature of goods/services</li>
                    <li>Entry/exit barriers</li>
                    <li>Market information</li>
                    <li>Economies of scale</li>
                    <li>Product differentiation</li>
                </ul>
                
                <div class="formula-box">
                    <h4><i class="fas fa-chess"></i> 3 Competitive Strategies</h4>
                    <p><strong>Cost leadership:</strong> Lowest costs<br>
                    <strong>Differentiation:</strong> Better product<br>
                    <strong>Focus:</strong> Specific segment</p>
                </div>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> 5 Market Words</h4>
                    <p>Revenue • Costs • Consumer tastes • Technology • Stocks</p>
                </div>
            `
        }
    }
};
