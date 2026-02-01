// ===== E-BUSINESS - FINAL EXAM PREPARATION =====
// Comprehensive study material for E-Business final examination
// 15 Units covering: E-Commerce, Distribution Chain, Internet, Digital Marketing, Social Media, SEO, PMS, Security

const ebusinessData = {
    
    // ========== CATEGORY 1: E-COMMERCE CONTEXT (Unit 1) ==========
    ecommerceContext: {
        name: "E-Commerce Context",
        icon: "fa-shopping-cart",
        color: "#f59e0b",
        
        flashcards: [
            {
                question: "What is E-Commerce?",
                answer: "E-commerce refers to the buying and selling of goods or services via the internet, including the transfer of money and data needed to complete transactions.\n\n• Takes place online\n• Involves products, services, payments, and data\n• Also called electronic commerce or internet commerce",
                explanation: "The foundation of modern digital business."
            },
            {
                question: "How has E-Commerce transformed the Hospitality Industry?",
                answer: "Main transformation areas:\n\n• Online platforms replaced phone/in-person bookings\n• Customer interaction moved to digital channels\n• Services became faster, more personalized, and global\n• Hotels and travel companies now depend on digital systems",
                explanation: "Traditionally, hospitality relied on face-to-face interaction."
            },
            {
                question: "What are the benefits of Online Booking Systems?",
                answer: "Benefits for businesses:\n\n• Better booking management\n• Higher occupancy rates\n• Reduced manual work\n• Customers can reserve rooms anytime from anywhere",
                explanation: "Digital transformation in hospitality starts with booking systems."
            },
            {
                question: "What is Dynamic Pricing?",
                answer: "Prices change in real time depending on:\n\n• Demand\n• Seasonality\n• Competitor prices\n\nThis allows businesses to maximize revenue based on market conditions.",
                explanation: "AI and algorithms enable real-time price optimization."
            },
            {
                question: "How do Virtual Tours and AR enhance customer engagement?",
                answer: "Customers can explore hotels digitally before booking.\n\nExample: The Ritz-Carlton Bali offers a 360-degree virtual tour of rooms and facilities.\n\nBenefits:\n• Reduces uncertainty\n• Increases booking confidence",
                explanation: "Virtual reality creates immersive preview experiences."
            },
            {
                question: "What is the difference between Hotel E-Commerce and General E-Commerce?",
                answer: "HOTEL E-COMMERCE:\n• Focus: Accommodation and hospitality\n• Products: Hotel rooms, spa, restaurants\n• Platforms: Agoda, Expedia\n\nGENERAL E-COMMERCE:\n• Focus: Selling goods across many industries\n• Products: Electronics, clothing, groceries\n• Platforms: Amazon, eBay, Walmart\n\nKey difference: Hotel e-commerce is specialized, general is broad.",
                explanation: "Understanding the specialization of hotel digital commerce."
            },
            {
                question: "What are the 4 pillars of the Digital Future of Hospitality?",
                answer: "1. INNOVATION - Constant technological improvement\n2. CUSTOMER FOCUS - Personalized and seamless experiences\n3. GLOBAL EXPANSION - Borderless business opportunities\n4. SUSTAINABILITY - Eco-conscious solutions",
                explanation: "The main directions for hospitality digital transformation."
            },
            {
                question: "What is B2C (Business to Consumer)?",
                answer: "B2C = Business sells directly to consumers\n\nExamples:\n• Amazon\n• Walmart\n• Online retail stores",
                explanation: "The most common e-commerce model."
            },
            {
                question: "What is B2B (Business to Business)?",
                answer: "B2B = Businesses sell to other businesses\n\nExamples:\n• Manufacturers to wholesalers\n• Software providers to companies\n• Wholesale platforms",
                explanation: "Business-to-business transactions."
            },
            {
                question: "What is D2C (Direct to Consumer)?",
                answer: "D2C = Brands sell directly to customers WITHOUT intermediaries\n\n• No retailer or wholesaler involved\n• Often supported by social media\n• Brand-owned websites\n\nExample: Nike selling directly through nike.com",
                explanation: "Cutting out the middleman."
            },
            {
                question: "What is C2C (Consumer to Consumer)?",
                answer: "C2C = Consumers sell to other consumers\n\nExamples:\n• eBay\n• Etsy\n• Facebook Marketplace\n• Craigslist",
                explanation: "Peer-to-peer marketplace model."
            },
            {
                question: "What is C2B (Consumer to Business)?",
                answer: "C2B = Individuals offer products or services to companies\n\nExamples:\n• Influencers\n• Photographers\n• Freelancers\n• Stock photo contributors",
                explanation: "Reverse of traditional business model."
            },
            {
                question: "What are Physical Goods, Digital Goods, and Services in E-Commerce?",
                answer: "PHYSICAL GOODS:\n• Tangible products with physical form\n• Need shipping\n\nDIGITAL GOODS:\n• Intangible products delivered electronically\n• E-books, software, music\n\nSERVICES:\n• Activities that deliver value\n• Consulting, design, bookings",
                explanation: "Three types of products sold online."
            }
        ],
        
        quiz: [
            {
                question: "E-commerce involves all EXCEPT:",
                options: [
                    "Buying and selling online",
                    "Transfer of money and data",
                    "Physical store visits only",
                    "Internet transactions"
                ],
                correct: 2
            },
            {
                question: "Dynamic pricing depends on:",
                options: [
                    "Fixed government rates",
                    "Demand, seasonality, and competitor prices",
                    "Employee preferences",
                    "Random selection"
                ],
                correct: 1
            },
            {
                question: "Which is an example of B2C e-commerce?",
                options: [
                    "Manufacturer to wholesaler",
                    "Amazon selling to consumers",
                    "Freelancer to company",
                    "Government to citizens"
                ],
                correct: 1
            },
            {
                question: "D2C (Direct to Consumer) means:",
                options: [
                    "Selling through retailers",
                    "Brands sell directly without intermediaries",
                    "Digital to consumer",
                    "Discount to consumer"
                ],
                correct: 1
            },
            {
                question: "Virtual tours in hotels help to:",
                options: [
                    "Replace actual visits permanently",
                    "Reduce uncertainty and increase booking confidence",
                    "Decrease hotel revenue",
                    "Eliminate the need for websites"
                ],
                correct: 1
            },
            {
                question: "C2C e-commerce examples include:",
                options: [
                    "Amazon and Walmart",
                    "eBay and Etsy",
                    "B2B platforms",
                    "Government services"
                ],
                correct: 1
            },
            {
                question: "Which is NOT a pillar of digital future of hospitality?",
                options: [
                    "Innovation",
                    "Customer Focus",
                    "Manual Processing",
                    "Sustainability"
                ],
                correct: 2
            },
            {
                question: "Digital goods are:",
                options: [
                    "Physical products",
                    "Intangible products delivered electronically",
                    "Only physical books",
                    "Services"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "E-commerce refers to buying and selling via the _______.",
                answer: "internet",
                hint: "Online network..."
            },
            {
                sentence: "_______ pricing changes in real time based on demand.",
                answer: "Dynamic",
                hint: "Opposite of static..."
            },
            {
                sentence: "B2C stands for Business to _______.",
                answer: "Consumer",
                hint: "End customer..."
            },
            {
                sentence: "D2C means brands sell _______ to customers without intermediaries.",
                answer: "directly",
                hint: "Without middlemen..."
            },
            {
                sentence: "The 4 pillars of hospitality's digital future include Innovation, Customer Focus, Global Expansion, and _______.",
                answer: "Sustainability",
                hint: "Eco-friendly..."
            }
        ],
        
        learn: {
            title: "The Context of Modern E-Commerce",
            content: `
                <h3>What is E-Commerce?</h3>
                <div class="formula-box">
                    <strong>E-Commerce =</strong> Buying and selling goods/services via the internet<br>
                    Includes: Products + Services + Payments + Data
                </div>
                
                <h4>Digital Transformation in Hospitality</h4>
                <ul>
                    <li><strong>Online Booking:</strong> Reserve rooms anytime, anywhere</li>
                    <li><strong>Personalization:</strong> Customized experiences using data</li>
                    <li><strong>Dynamic Pricing:</strong> Real-time price changes</li>
                    <li><strong>Virtual Tours:</strong> 360° previews before booking</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> E-Commerce Business Models</h4>
                    <ul>
                        <li><strong>B2C:</strong> Business → Consumer (Amazon)</li>
                        <li><strong>B2B:</strong> Business → Business (Wholesale)</li>
                        <li><strong>C2C:</strong> Consumer → Consumer (eBay)</li>
                        <li><strong>D2C:</strong> Direct to Consumer (Brand websites)</li>
                        <li><strong>C2B:</strong> Consumer → Business (Freelancers)</li>
                    </ul>
                </div>
                
                <h4>4 Pillars of Digital Hospitality Future</h4>
                <div class="example-box">
                    <p>🚀 <strong>Innovation</strong> - Technology improvement</p>
                    <p>👤 <strong>Customer Focus</strong> - Personalized experiences</p>
                    <p>🌍 <strong>Global Expansion</strong> - Borderless business</p>
                    <p>🌱 <strong>Sustainability</strong> - Eco-conscious solutions</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 2: TOURISM DISTRIBUTION CHAIN (Unit 2) ==========
    distributionChain: {
        name: "Distribution Chain",
        icon: "fa-link",
        color: "#10b981",
        
        flashcards: [
            {
                question: "What is the Tourism Distribution System?",
                answer: "The tourism distribution system explains how tourism products reach the customer.\n\nIt connects:\n• Primary suppliers\n• Intermediaries\n• Digital platforms\n• Final customers\n\nE-business platforms make this process faster, global, and automated.",
                explanation: "The pathway from supplier to traveler."
            },
            {
                question: "What is the difference between Tour Operator and Travel Agent?",
                answer: "TOUR OPERATOR:\n• Creates its own tourism product\n• Combines services into package trips\n• Acts as organizer or wholesaler\n\nTRAVEL AGENT:\n• Does NOT create products\n• Sells products created by others\n• Acts only as intermediary\n• Earns income through commission",
                explanation: "Tour operators produce, agents sell."
            },
            {
                question: "Who are the Primary Suppliers in tourism?",
                answer: "Primary suppliers create the core tourism product:\n\n• Accommodation providers (hotels)\n• Airlines\n• Transport companies\n• Cruise companies\n• Attractions and activities",
                explanation: "The original producers of tourism services."
            },
            {
                question: "What are Wholesalers or Bedbanks?",
                answer: "Wholesalers/Bedbanks:\n\n• Buy services in bulk\n• Work with net rates\n• Focus on B2B relationships\n• Rarely sell directly to individuals\n• Platforms are often password-protected",
                explanation: "Bulk buyers in the tourism chain."
            },
            {
                question: "What is a Global Distribution System (GDS)?",
                answer: "A GDS is:\n• A global network\n• Connecting travel suppliers with travel agencies\n• Enabling automated bookings\n\nMain users:\n• Airlines\n• Hotels\n• Car rental companies\n\nExamples: Amadeus, Sabre, Travelport",
                explanation: "The backbone of travel bookings."
            },
            {
                question: "What is a Property Management System (PMS)?",
                answer: "PMS or CRS (Central Reservation System):\n\n• Internal systems used by suppliers\n• Manage reservations, availability, and operations\n• Do NOT sell directly to customers\n• Connect to other platforms for distribution",
                explanation: "Hotel's internal operational software."
            },
            {
                question: "What is a Booking Engine?",
                answer: "A booking engine:\n\n• Allows online booking on the supplier's own website\n• Supports direct sales\n• Connects directly with PMS\n• Enables real-time availability",
                explanation: "The 'Book Now' functionality on websites."
            },
            {
                question: "What is a Channel Manager?",
                answer: "A Channel Manager:\n\n• Manages room rates and availability\n• Synchronizes ALL sales channels in real time\n• Reduces overbooking risk\n• Modern versions often use AI",
                explanation: "Keeps all booking channels in sync."
            },
            {
                question: "What are Meta-Search Engines?",
                answer: "Meta-search engines:\n\n• Compare offers from multiple OTAs and supplier websites\n• Show prices side-by-side\n• Simplify customer decision-making\n\nExamples: Google Hotels, Trivago, Kayak",
                explanation: "Price comparison tools."
            },
            {
                question: "Are communication channels part of the distribution system?",
                answer: "NO! Communication channels are NOT part of the distribution system.\n\nThey include:\n• Media and social media\n• Blogs and forums\n• Email and telephone\n\nThey are:\n• Marketing tools\n• Promotional channels\n\nWhen primary suppliers use them directly = direct sales",
                explanation: "Important exam distinction!"
            }
        ],
        
        quiz: [
            {
                question: "A Tour Operator:",
                options: [
                    "Only sells products created by others",
                    "Creates its own tourism product",
                    "Works only online",
                    "Never deals with hotels"
                ],
                correct: 1
            },
            {
                question: "A Travel Agent earns money mainly through:",
                options: [
                    "Creating products",
                    "Commission",
                    "Manufacturing",
                    "Government subsidies"
                ],
                correct: 1
            },
            {
                question: "GDS stands for:",
                options: [
                    "General Data System",
                    "Global Distribution System",
                    "Guest Data Service",
                    "Government Digital Service"
                ],
                correct: 1
            },
            {
                question: "A Channel Manager's main function is to:",
                options: [
                    "Create hotel rooms",
                    "Synchronize rates and availability across channels",
                    "Handle guest complaints",
                    "Design websites"
                ],
                correct: 1
            },
            {
                question: "Meta-search engines like Trivago:",
                options: [
                    "Sell rooms directly",
                    "Compare prices from multiple sources",
                    "Create hotel packages",
                    "Manage hotel operations"
                ],
                correct: 1
            },
            {
                question: "Communication channels are:",
                options: [
                    "Part of distribution system",
                    "Marketing and promotional tools",
                    "Primary suppliers",
                    "Tour operators"
                ],
                correct: 1
            },
            {
                question: "Primary suppliers in tourism include all EXCEPT:",
                options: [
                    "Hotels",
                    "Airlines",
                    "Travel agents",
                    "Attractions"
                ],
                correct: 2
            },
            {
                question: "Bedbanks focus mainly on:",
                options: [
                    "Individual travelers",
                    "B2B relationships",
                    "Social media",
                    "Government services"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "A _______ creates its own tourism product and combines services into packages.",
                answer: "Tour Operator",
                hint: "Organizer of trips..."
            },
            {
                sentence: "GDS stands for Global _______ System.",
                answer: "Distribution",
                hint: "Sharing across networks..."
            },
            {
                sentence: "A Channel _______ synchronizes rates across all booking platforms.",
                answer: "Manager",
                hint: "One who manages..."
            },
            {
                sentence: "Travel agents earn income mainly through _______.",
                answer: "commission",
                hint: "Percentage of sales..."
            },
            {
                sentence: "Communication channels are NOT part of the _______ system.",
                answer: "distribution",
                hint: "How products reach customers..."
            }
        ],
        
        learn: {
            title: "Tourism Distribution Chain",
            content: `
                <h3>The Distribution System</h3>
                <div class="formula-box">
                    Primary Suppliers → Intermediaries → Digital Platforms → Customer
                </div>
                
                <h4>Tour Operator vs Travel Agent</h4>
                <div class="tip-box">
                    <h4><i class="fas fa-plane"></i> Key Difference</h4>
                    <p><strong>Tour Operator:</strong> CREATES products (packages)</p>
                    <p><strong>Travel Agent:</strong> SELLS products (earns commission)</p>
                </div>
                
                <h4>Key Systems</h4>
                <ul>
                    <li><strong>GDS:</strong> Global network connecting suppliers with agencies</li>
                    <li><strong>PMS:</strong> Internal hotel management system</li>
                    <li><strong>Channel Manager:</strong> Syncs availability across channels</li>
                    <li><strong>Meta-Search:</strong> Compares prices (Trivago, Kayak)</li>
                </ul>
                
                <div class="warning-box">
                    <h4><i class="fas fa-exclamation-triangle"></i> Exam Alert!</h4>
                    <p>Communication channels (social media, email) are NOT part of the distribution system - they are marketing tools!</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 3: INTERNET AS BUSINESS PLATFORM (Unit 3) ==========
    internetBusiness: {
        name: "Internet & Business",
        icon: "fa-globe",
        color: "#6366f1",
        
        flashcards: [
            {
                question: "What are the key benefits of the Internet for businesses?",
                answer: "• Faster and cheaper communication\n• Easy access to information\n• Cost reduction in operations\n• Higher efficiency and productivity\n• Discovery of new business opportunities\n• Closer relationships with customers and suppliers",
                explanation: "The Internet transformed business operations."
            },
            {
                question: "How did the Web revolutionize business activities?",
                answer: "1. E-COMMERCE - Online buying and selling\n2. DIGITAL MARKETING - Measurable, targeted promotion\n3. REMOTE WORK - Location-independent employment\n4. DATA ANALYTICS - Data-driven decision-making\n5. IMPROVED COMMUNICATION - Real-time global interaction",
                explanation: "Five key business transformations."
            },
            {
                question: "What is Web 1.0 (The Read-Only Web)?",
                answer: "Characteristics:\n• Static pages\n• No user interaction\n• Content created only by website owners\n\nUsers were PASSIVE readers.",
                explanation: "The first generation of the web."
            },
            {
                question: "What is Web 2.0 (The Social Web)?",
                answer: "Characteristics:\n• User-generated content\n• Social media\n• Blogs, comments, tagging\n\nUsers became CONTENT CREATORS.",
                explanation: "The participatory web."
            },
            {
                question: "What is Web 3.0 (The Semantic Web)?",
                answer: "Characteristics:\n• Machine-readable data\n• Artificial intelligence and machine learning\n• Internet of Things\n• 3D graphics and virtual environments\n\nThe web starts to UNDERSTAND users.",
                explanation: "The intelligent web."
            },
            {
                question: "What is Web 4.0 (The Symbiotic Web)?",
                answer: "Characteristics:\n• Human-machine interaction\n• Advanced personalization\n• AI-driven experiences\n\nStill under development, no fixed definition.",
                explanation: "The future of the web."
            },
            {
                question: "What is HTTP?",
                answer: "HTTP = HyperText Transfer Protocol\n\nRules that computers use to communicate over the Internet for web pages.",
                explanation: "The protocol for web communication."
            },
            {
                question: "What is DNS (Domain Name System)?",
                answer: "DNS translates domain names into IP addresses.\n\nExample:\n• You type: google.com\n• DNS translates to: 142.250.190.78\n• Your browser connects to that IP",
                explanation: "The internet's phonebook."
            },
            {
                question: "What is the difference between .com and .edu domains?",
                answer: ".com = Commercial organizations\n.edu = Educational institutions\n\nOther examples:\n.org = Non-profit organizations\n.gov = Government\n.net = Network providers",
                explanation: "Domain extensions indicate organization type."
            }
        ],
        
        quiz: [
            {
                question: "Web 1.0 is characterized by:",
                options: [
                    "User-generated content",
                    "Static pages with no interaction",
                    "AI and machine learning",
                    "Social media"
                ],
                correct: 1
            },
            {
                question: "Web 2.0 is also called:",
                options: [
                    "The Read-Only Web",
                    "The Social Web",
                    "The Semantic Web",
                    "The Symbiotic Web"
                ],
                correct: 1
            },
            {
                question: "Web 3.0 features include:",
                options: [
                    "Static pages only",
                    "No user interaction",
                    "AI, machine learning, and IoT",
                    "Only email communication"
                ],
                correct: 2
            },
            {
                question: "DNS translates:",
                options: [
                    "Images to text",
                    "Domain names to IP addresses",
                    "Audio to video",
                    "Passwords to codes"
                ],
                correct: 1
            },
            {
                question: "Which is NOT a benefit of Internet for business?",
                options: [
                    "Faster communication",
                    "Cost reduction",
                    "Guaranteed profit",
                    "Global reach"
                ],
                correct: 2
            },
            {
                question: ".edu domain is used for:",
                options: [
                    "Commercial companies",
                    "Educational institutions",
                    "Entertainment",
                    "E-commerce"
                ],
                correct: 1
            },
            {
                question: "In Web 2.0, users became:",
                options: [
                    "Passive readers only",
                    "Content creators",
                    "Website owners only",
                    "IT professionals"
                ],
                correct: 1
            },
            {
                question: "HTTP stands for:",
                options: [
                    "HyperText Transfer Protocol",
                    "High Tech Transfer Program",
                    "Hotel Transport Protocol",
                    "Hybrid Text Processing"
                ],
                correct: 0
            }
        ],
        
        fillBlanks: [
            {
                sentence: "Web 1.0 is called the _______-Only Web.",
                answer: "Read",
                hint: "Passive consumption..."
            },
            {
                sentence: "Web 2.0 is known as the _______ Web because of user-generated content.",
                answer: "Social",
                hint: "Community and sharing..."
            },
            {
                sentence: "Web 3.0 features machine learning and is called the _______ Web.",
                answer: "Semantic",
                hint: "Meaning and understanding..."
            },
            {
                sentence: "DNS translates domain names into _______ addresses.",
                answer: "IP",
                hint: "Internet Protocol..."
            },
            {
                sentence: "The .com domain is for _______ organizations.",
                answer: "commercial",
                hint: "Business-related..."
            }
        ],
        
        learn: {
            title: "Internet & WWW as Business Platform",
            content: `
                <h3>Benefits of Internet for Business</h3>
                <ul>
                    <li>Faster and cheaper communication</li>
                    <li>Easy access to information</li>
                    <li>Cost reduction in operations</li>
                    <li>Higher efficiency and productivity</li>
                    <li>Global reach and new opportunities</li>
                </ul>
                
                <h4>Evolution of the Web</h4>
                <div class="formula-box">
                    <strong>Web 1.0</strong> = Read-Only (Static, passive)<br>
                    <strong>Web 2.0</strong> = Social (User-generated content)<br>
                    <strong>Web 3.0</strong> = Semantic (AI, IoT, machine learning)<br>
                    <strong>Web 4.0</strong> = Symbiotic (Human-machine fusion)
                </div>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Key Terms</h4>
                    <ul>
                        <li><strong>HTTP:</strong> Protocol for web communication</li>
                        <li><strong>DNS:</strong> Translates domains to IP addresses</li>
                        <li><strong>.com:</strong> Commercial</li>
                        <li><strong>.edu:</strong> Educational</li>
                    </ul>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 4: CASH FLOWS & BUSINESS MODELS (Unit 4-5) ==========
    cashFlows: {
        name: "Cash Flows & Models",
        icon: "fa-money-bill-wave",
        color: "#ef4444",
        
        flashcards: [
            {
                question: "What is the Merchant Model in tourism distribution?",
                answer: "In the Merchant Model:\n\n• Suppliers negotiate NET RATES with intermediaries\n• Contracts include blocked rooms (allotment)\n• Intermediaries apply a MARK-UP (margin)\n• Clients pay the INTERMEDIARY, not supplier\n• Client receives a VOUCHER (no price shown)",
                explanation: "Tour operators typically use this model."
            },
            {
                question: "What are the advantages of Merchant Model for SUPPLIERS?",
                answer: "Advantages:\n• Guaranteed room occupancy in advance\n• Predictable net revenues\n• Easier price list planning\n\nDisadvantages:\n• Lower bargaining power\n• Lower revenues (net rates)\n• Difficult rate parity control\n• Delayed payments (after guest departure)",
                explanation: "Trade-off between security and revenue."
            },
            {
                question: "What is the Agent Model in tourism distribution?",
                answer: "In the Agent Model:\n\n• Suppliers set the FINAL selling price\n• Agents sell at the supplier's price\n• Suppliers pay COMMISSION to the agent\n• Commission is usually a percentage\n• Client gets booking confirmation WITH full price",
                explanation: "OTAs typically use this model."
            },
            {
                question: "What are advantages of Agent Model for SUPPLIERS?",
                answer: "Advantages:\n• Higher revenues\n• Control over pricing\n• Easier rate parity management\n• Diversified intermediary network\n\nDisadvantages:\n• Complex management of many intermediaries",
                explanation: "More control, more complexity."
            },
            {
                question: "What is a Voucher?",
                answer: "A voucher is a document that:\n\n• Confirms prepaid services\n• Does NOT show the price\n• Is used in the Merchant Model\n• Guest presents it at the hotel",
                explanation: "Proof of prepayment without price disclosure."
            },
            {
                question: "How does AI support the Merchant Model?",
                answer: "AI in Merchant Model:\n\n• Demand and inventory forecasting\n• Automated contract analysis (NLP)\n• Dynamic pricing and margin optimization\n• Intelligent dynamic packaging\n\nAI predicts demand months ahead and adjusts automatically.",
                explanation: "AI enhances but doesn't replace the model."
            },
            {
                question: "How does AI support the Agent Model?",
                answer: "AI in Agent Model (used by OTAs):\n\n• Personalized recommendation systems\n• Sentiment analysis of reviews\n• AI chatbots and virtual assistants\n• Predictive analytics for commission optimization\n\nAI improves conversion rates.",
                explanation: "AI makes OTAs smarter."
            },
            {
                question: "What is the difference between Intermediaries and Infomediaries?",
                answer: "INTERMEDIARIES:\n• Participate directly in distribution\n• Influence pricing and payments\n• Handle transactions\n\nINFOMEDIARIES:\n• Provide information only\n• Do NOT handle payments\n• Support decision-making\n• Example: Review sites, comparison sites",
                explanation: "Information vs transaction handling."
            },
            {
                question: "When is the Merchant Model typically used?",
                answer: "Merchant model is typically used by:\n\n• Tour operators\n• B2B platforms\n• Package trip organizers\n\nAgent model is typically used by:\n• Online Travel Agencies (OTAs)\n• Booking.com, Expedia",
                explanation: "Different models for different business types."
            }
        ],
        
        quiz: [
            {
                question: "In the Merchant Model, who sets the final price?",
                options: [
                    "The supplier",
                    "The intermediary",
                    "The government",
                    "The customer"
                ],
                correct: 1
            },
            {
                question: "A voucher does NOT show:",
                options: [
                    "Guest name",
                    "Hotel name",
                    "The price",
                    "Dates"
                ],
                correct: 2
            },
            {
                question: "In the Agent Model, agents earn through:",
                options: [
                    "Mark-up on net rates",
                    "Commission from supplier",
                    "Government subsidies",
                    "Creating packages"
                ],
                correct: 1
            },
            {
                question: "OTAs typically use which model?",
                options: [
                    "Merchant Model",
                    "Agent Model",
                    "Government Model",
                    "Hybrid only"
                ],
                correct: 1
            },
            {
                question: "Infomediaries:",
                options: [
                    "Handle payments",
                    "Provide information only",
                    "Create products",
                    "Set prices"
                ],
                correct: 1
            },
            {
                question: "AI in Merchant Model helps with:",
                options: [
                    "Only customer complaints",
                    "Demand forecasting and dynamic pricing",
                    "Building hotels",
                    "Nothing"
                ],
                correct: 1
            },
            {
                question: "Net rates are used in which model?",
                options: [
                    "Agent Model",
                    "Merchant Model",
                    "Customer Model",
                    "None"
                ],
                correct: 1
            },
            {
                question: "In Agent Model, suppliers have:",
                options: [
                    "No control over pricing",
                    "Control over pricing",
                    "No revenues",
                    "No intermediaries"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "In the Merchant Model, clients receive a _______ that doesn't show the price.",
                answer: "voucher",
                hint: "Proof of booking..."
            },
            {
                sentence: "Agents earn _______ from suppliers for selling their products.",
                answer: "commission",
                hint: "Percentage of sales..."
            },
            {
                sentence: "_______ provide information only and don't handle payments.",
                answer: "Infomediaries",
                hint: "Information + intermediaries..."
            },
            {
                sentence: "In Merchant Model, intermediaries apply a _______-up on net rates.",
                answer: "mark",
                hint: "Adding profit margin..."
            },
            {
                sentence: "OTAs typically use the _______ Model.",
                answer: "Agent",
                hint: "Earning commission..."
            }
        ],
        
        learn: {
            title: "Cash Flows & Business Models",
            content: `
                <h3>Two Core Distribution Models</h3>
                
                <div class="formula-box">
                    <strong>MERCHANT MODEL</strong><br>
                    Supplier → Net Rate → Intermediary adds Mark-up → Client pays Intermediary<br>
                    Client gets: VOUCHER (no price shown)
                </div>
                
                <div class="formula-box">
                    <strong>AGENT MODEL</strong><br>
                    Supplier sets Final Price → Agent sells at that price → Earns Commission<br>
                    Client gets: Booking confirmation (price visible)
                </div>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Who Uses What?</h4>
                    <p><strong>Merchant:</strong> Tour operators, B2B platforms</p>
                    <p><strong>Agent:</strong> OTAs (Booking.com, Expedia)</p>
                </div>
                
                <h4>Intermediaries vs Infomediaries</h4>
                <ul>
                    <li><strong>Intermediaries:</strong> Handle transactions, influence pricing</li>
                    <li><strong>Infomediaries:</strong> Provide info only (reviews, comparisons)</li>
                </ul>
            `
        }
    },
    
    // ========== CATEGORY 5: COMPUTER GRAPHICS (Unit 6) ==========
    computerGraphics: {
        name: "Computer Graphics",
        icon: "fa-palette",
        color: "#ec4899",
        
        flashcards: [
            {
                question: "What is Visual Thinking?",
                answer: "Visual thinking means thinking with images and visualizations.\n\nPeople process information through two channels:\n• Verbal\n• Visual\n\nExamples: Road signs, charts, icons, infographics\n\nText + Image works better than text alone.",
                explanation: "How we process visual information."
            },
            {
                question: "What are the 7 Elements of Graphic Design?",
                answer: "The core elements are:\n\n1. LINE - Direction and connection\n2. COLOR - Emotions and importance\n3. SHAPE - Two-dimensional form\n4. TEXTURE - Surface quality\n5. SPACE - Positive and negative areas\n6. VALUE - Lightness or darkness\n7. FORM - 3D appearance",
                explanation: "The building blocks of design."
            },
            {
                question: "What is the difference between Warm and Cold Colors?",
                answer: "WARM COLORS:\n• Red, orange, yellow, pink, brown\n• Energy, warmth, movement\n• Dominate and attract attention\n\nCOLD COLORS:\n• Green, blue, some purples\n• Calming and stable\n• Suitable for backgrounds",
                explanation: "Color psychology in design."
            },
            {
                question: "What is the difference between Vector and Raster Graphics?",
                answer: "VECTOR GRAPHICS:\n• Based on mathematical formulas\n• Scalable without quality loss\n• Small file size\n• Not suitable for detailed photos\n\nRASTER GRAPHICS:\n• Based on pixels\n• Realistic color transitions\n• Large file size\n• Quality loss when resized",
                explanation: "Two fundamental types of digital images."
            },
            {
                question: "What is Resolution?",
                answer: "Resolution describes image clarity/sharpness.\n\nMeasured as:\n• Pixels (for screens)\n• DPI - Dots Per Inch (for print)\n\nTypical values:\n• 72-75 DPI - digital display\n• 300 DPI - print\n\nHigher resolution = higher detail",
                explanation: "Image quality measurement."
            },
            {
                question: "What is the difference between RGB and CMYK color models?",
                answer: "RGB:\n• Red, Green, Blue\n• Used for SCREENS and digital displays\n• Additive color model\n\nCMYK:\n• Cyan, Magenta, Yellow, Black\n• Used for PRINTING\n• Subtractive color model",
                explanation: "Screen vs print colors."
            },
            {
                question: "What is the minimum color contrast ratio for accessibility?",
                answer: "Accessibility guidelines:\n\n• Normal text: minimum 4.5:1 contrast ratio\n• Large or bold text: minimum 3:1 contrast ratio\n\nThis ensures text is readable for people with visual impairments.",
                explanation: "WCAG accessibility standards."
            },
            {
                question: "What is the difference between 2D and 3D Graphics?",
                answer: "2D GRAPHICS:\n• Flat images\n• Simulate depth using color and shadow\n\n3D GRAPHICS:\n• Store full spatial information\n• Objects can be viewed from any angle\n• Use the concept of 'world' or 'space'",
                explanation: "Flat vs spatial graphics."
            },
            {
                question: "What is Positive and Negative Space?",
                answer: "POSITIVE SPACE:\n• Area occupied by objects\n• The main subject\n\nNEGATIVE SPACE:\n• Empty area around or between objects\n• White space\n\nGood use of space improves readability and focus.",
                explanation: "Space in design composition."
            }
        ],
        
        quiz: [
            {
                question: "Vector graphics are based on:",
                options: [
                    "Pixels",
                    "Mathematical formulas",
                    "Photographs only",
                    "Audio files"
                ],
                correct: 1
            },
            {
                question: "RGB is used for:",
                options: [
                    "Printing",
                    "Screens and digital displays",
                    "Audio",
                    "Documents only"
                ],
                correct: 1
            },
            {
                question: "The recommended print resolution is:",
                options: [
                    "72 DPI",
                    "100 DPI",
                    "300 DPI",
                    "50 DPI"
                ],
                correct: 2
            },
            {
                question: "Warm colors include:",
                options: [
                    "Blue and green",
                    "Red, orange, and yellow",
                    "Only black and white",
                    "Purple only"
                ],
                correct: 1
            },
            {
                question: "CMYK is used for:",
                options: [
                    "Screen displays",
                    "Printing",
                    "Video games",
                    "Audio editing"
                ],
                correct: 1
            },
            {
                question: "How many core elements of graphic design are there?",
                options: [
                    "5",
                    "6",
                    "7",
                    "10"
                ],
                correct: 2
            },
            {
                question: "Minimum contrast ratio for normal text accessibility is:",
                options: [
                    "2:1",
                    "3:1",
                    "4.5:1",
                    "10:1"
                ],
                correct: 2
            },
            {
                question: "Raster graphics quality loss occurs when:",
                options: [
                    "Viewing on screen",
                    "Resizing or compressing",
                    "Saving the file",
                    "Never"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "_______ graphics are based on mathematical formulas and scale without quality loss.",
                answer: "Vector",
                hint: "Opposite of raster..."
            },
            {
                sentence: "RGB stands for Red, Green, and _______.",
                answer: "Blue",
                hint: "Primary color..."
            },
            {
                sentence: "The recommended resolution for print is _______ DPI.",
                answer: "300",
                hint: "Higher than screen..."
            },
            {
                sentence: "_______ colors like blue and green are calming and suitable for backgrounds.",
                answer: "Cold",
                hint: "Opposite of warm..."
            },
            {
                sentence: "CMYK is used for _______ rather than screens.",
                answer: "printing",
                hint: "Physical output..."
            }
        ],
        
        learn: {
            title: "Computer Graphics",
            content: `
                <h3>7 Elements of Graphic Design</h3>
                <div class="formula-box">
                    Line • Color • Shape • Texture • Space • Value • Form
                </div>
                
                <h4>Vector vs Raster</h4>
                <div class="tip-box">
                    <h4><i class="fas fa-vector-square"></i> Comparison</h4>
                    <p><strong>Vector:</strong> Math-based, scalable, small files (logos)</p>
                    <p><strong>Raster:</strong> Pixel-based, realistic, large files (photos)</p>
                </div>
                
                <h4>Color Models</h4>
                <ul>
                    <li><strong>RGB:</strong> Screens (Red, Green, Blue)</li>
                    <li><strong>CMYK:</strong> Print (Cyan, Magenta, Yellow, Black)</li>
                </ul>
                
                <h4>Resolution</h4>
                <div class="example-box">
                    <p>📱 Screen: 72-75 DPI</p>
                    <p>🖨️ Print: 300 DPI</p>
                </div>
                
                <h4>Accessibility</h4>
                <p>Minimum contrast: 4.5:1 (normal text) | 3:1 (large text)</p>
            `
        }
    },
    
    // ========== CATEGORY 6: PLATFORM ECONOMY (Unit 7) ==========
    platformEconomy: {
        name: "Platform Economy",
        icon: "fa-network-wired",
        color: "#8b5cf6",
        
        flashcards: [
            {
                question: "What is the Platform Economy?",
                answer: "The platform economy refers to economic activities enabled by digital platforms that:\n\n• Connect different groups of users\n• Facilitate interactions and transactions\n• Operate through digital technologies and algorithms\n\nIt includes: Sharing economy, Gig economy, Creative economy",
                explanation: "The dominant form of digital business."
            },
            {
                question: "What are the key features of Digital Platforms?",
                answer: "Platforms typically:\n\n• Eliminate traditional gatekeepers\n• Bring together suppliers and consumers\n• Provide infrastructure for transactions\n• Govern value creation (don't produce it)\n• Operate as complex ecosystems\n• Use algorithms and data processing",
                explanation: "How platforms function differently."
            },
            {
                question: "How do platforms create value?",
                answer: "Platform value creation is INDIRECT:\n\n• Facilitate interactions\n• Enable transactions\n• Act mainly as third parties\n\nValue emerges from:\n• Gathering many users in one digital space\n• Enabling new forms of consumer behavior\n• Reconfiguring how value is exchanged",
                explanation: "Platforms don't produce, they enable."
            },
            {
                question: "What are Network Effects?",
                answer: "Network Effects mean:\n\nEach new user increases the value of the platform for existing users.\n\nMore users → More connections → More value → Even more users\n\nThis explains rapid platform growth.",
                explanation: "Why platforms grow exponentially."
            },
            {
                question: "What are examples of platforms in different industries?",
                answer: "Platform examples:\n\n• Retail/Marketplaces: Amazon, Alibaba, eBay\n• Accommodation: Airbnb\n• Transportation: Uber, BlaBlaCar\n• OTAs: Booking.com, Expedia\n• Education: Coursera, edX\n• Media: YouTube, Netflix\n• Freelancing: Fiverr, TaskRabbit",
                explanation: "Platforms across industries."
            },
            {
                question: "How does AI transform tourism platforms?",
                answer: "AI in tourism platforms:\n\n• Personalized recommendations based on user data\n• Dynamic pricing and revenue optimization\n• 24/7 automated customer support (chatbots)\n\nAdvanced functions:\n• Conversational search\n• Automatic translations\n• Fraud and fake review detection\n• Inventory and rate management",
                explanation: "AI enhances platform performance."
            },
            {
                question: "What are the challenges of the Platform Economy?",
                answer: "Current challenges:\n\n• Unclear and evolving definitions\n• Complex role switching between users\n• Ethical, social, and environmental impacts\n• Regulation and market dominance issues\n\nFuture research focuses on:\n• Access-based vs asset-controlled models\n• Platform governance\n• Sustainability of ecosystems",
                explanation: "Ongoing issues with platforms."
            }
        ],
        
        quiz: [
            {
                question: "Network effects mean:",
                options: [
                    "Internet speed increases",
                    "Each new user increases value for all users",
                    "Networks become smaller",
                    "Platforms lose users"
                ],
                correct: 1
            },
            {
                question: "Platforms create value by:",
                options: [
                    "Manufacturing products",
                    "Facilitating interactions and transactions",
                    "Hiring many employees",
                    "Building physical stores"
                ],
                correct: 1
            },
            {
                question: "Which is an accommodation platform?",
                options: [
                    "Amazon",
                    "Uber",
                    "Airbnb",
                    "Coursera"
                ],
                correct: 2
            },
            {
                question: "AI on platforms helps with:",
                options: [
                    "Nothing",
                    "Personalized recommendations and dynamic pricing",
                    "Building hotels",
                    "Reducing internet speed"
                ],
                correct: 1
            },
            {
                question: "The platform economy includes:",
                options: [
                    "Only e-commerce",
                    "Sharing, gig, and creative economies",
                    "Only physical stores",
                    "Government services only"
                ],
                correct: 1
            },
            {
                question: "Which is a freelancing platform?",
                options: [
                    "Netflix",
                    "Fiverr",
                    "Booking.com",
                    "YouTube"
                ],
                correct: 1
            },
            {
                question: "Platforms typically:",
                options: [
                    "Produce goods directly",
                    "Eliminate traditional gatekeepers",
                    "Avoid using data",
                    "Have no users"
                ],
                correct: 1
            },
            {
                question: "Platform challenges include all EXCEPT:",
                options: [
                    "Regulation issues",
                    "Market dominance concerns",
                    "Perfect definitions",
                    "Ethical impacts"
                ],
                correct: 2
            }
        ],
        
        fillBlanks: [
            {
                sentence: "_______ effects mean more users increase value for everyone.",
                answer: "Network",
                hint: "Connections growing..."
            },
            {
                sentence: "_______ is an accommodation sharing platform.",
                answer: "Airbnb",
                hint: "Alternative to hotels..."
            },
            {
                sentence: "Platforms facilitate interactions and _______ between users.",
                answer: "transactions",
                hint: "Exchanges of value..."
            },
            {
                sentence: "AI helps platforms with personalized _______ for users.",
                answer: "recommendations",
                hint: "Suggestions..."
            },
            {
                sentence: "The platform economy includes sharing, gig, and _______ economies.",
                answer: "creative",
                hint: "Artists and content creators..."
            }
        ],
        
        learn: {
            title: "Platform Economy",
            content: `
                <h3>What is Platform Economy?</h3>
                <div class="formula-box">
                    Digital Platforms = Technology + Algorithms + User Connections<br>
                    Includes: Sharing Economy + Gig Economy + Creative Economy
                </div>
                
                <h4>Network Effects</h4>
                <div class="tip-box">
                    <h4><i class="fas fa-users"></i> The Growth Formula</h4>
                    <p>More Users → More Connections → More Value → Even More Users</p>
                    <p>This explains why successful platforms grow exponentially!</p>
                </div>
                
                <h4>Platform Examples</h4>
                <ul>
                    <li>🛒 <strong>Retail:</strong> Amazon, eBay</li>
                    <li>🏠 <strong>Accommodation:</strong> Airbnb</li>
                    <li>🚗 <strong>Transport:</strong> Uber</li>
                    <li>✈️ <strong>Travel:</strong> Booking.com</li>
                    <li>🎬 <strong>Media:</strong> YouTube, Netflix</li>
                    <li>💼 <strong>Freelance:</strong> Fiverr</li>
                </ul>
                
                <h4>AI on Platforms</h4>
                <p>Personalization, dynamic pricing, chatbots, fraud detection</p>
            `
        }
    },
    
    // ========== CATEGORY 7: VISUAL DESIGN & IDENTITY (Unit 8) ==========
    visualDesign: {
        name: "Visual Design & Identity",
        icon: "fa-paint-brush",
        color: "#06b6d4",
        
        flashcards: [
            {
                question: "What is Visual Design vs Graphic Design?",
                answer: "VISUAL DESIGN:\n• Problem solvers\n• Build and maintain brand's design strategy\n• Ensure consistent brand voice across platforms\n\nGRAPHIC DESIGN:\n• Focus on conveying specific messages\n• Work on individual projects\n• Print and digital visuals\n\nKey difference: Visual = brand consistency, Graphic = individual messages",
                explanation: "Two related but different disciplines."
            },
            {
                question: "What is Visual Identity?",
                answer: "Visual identity is everything that visually represents a brand:\n\n• Logo\n• Color palette\n• Typography\n• Images\n• Symbols, shapes, patterns\n\nPurpose: Make company recognizable and create emotional impressions.",
                explanation: "The visual face of a brand."
            },
            {
                question: "What are the Elements of Visual Identity?",
                answer: "Elements include:\n\n• Brand logo\n• Brand color palette (usually max 3 colors)\n• Brand fonts and typography\n• Brand images and photography style\n• Shapes, patterns, textures\n• Brand book (style guide)",
                explanation: "Components of visual branding."
            },
            {
                question: "What is the difference between Brand, Identity, and Logo?",
                answer: "BRAND:\n• How people PERCEIVE the company\n• Emotional connection\n\nIDENTITY:\n• Visual GUIDELINES supporting the brand\n• Design system\n\nLOGO:\n• Visual MARK identifying the company\n• Most recognizable element\n\nLogo ⊂ Identity ⊂ Brand",
                explanation: "Hierarchy of branding elements."
            },
            {
                question: "What are the color roles in a brand palette?",
                answer: "Usually no more than 3 main colors:\n\n• PRIMARY color - Main brand color\n• SECONDARY color - Background support\n• ACCENT color - Emphasis and highlights\n\nColor affects perception and behavior.",
                explanation: "Strategic use of color in branding."
            },
            {
                question: "What is a Brand Book (Book of Standards)?",
                answer: "A Brand Book defines rules for visual presentation:\n\n• Logo usage and variants\n• Color palettes\n• Typography rules\n• Icons, illustrations, patterns\n• Applications across media\n\nEnsures consistency across all brand touchpoints.",
                explanation: "The rulebook for brand visuals."
            },
            {
                question: "Why do Infographics work?",
                answer: "Infographics work because:\n\n• Humans learn visually\n• Images improve memory and recall\n• Brain processes visual and verbal info together\n\nCombines: Text + Images + Data visualization",
                explanation: "Visual learning is more effective."
            },
            {
                question: "What is the VARK learning model?",
                answer: "VARK identifies learning preferences:\n\n• V = Visual - Learning through images and diagrams\n• A = Auditory - Learning through listening\n• R = Reading/Writing - Learning through text\n• K = Kinesthetic - Learning by doing",
                explanation: "Different people learn differently."
            },
            {
                question: "What are examples of hidden meanings in logos?",
                answer: "Famous logo hidden meanings:\n\n• Amazon - Arrow from A to Z + smile\n• FedEx - Hidden arrow symbolizing speed\n• BMW - Colors from Bavarian flag\n• Toblerone - Hidden bear in the mountain",
                explanation: "Clever design creates memorable logos."
            }
        ],
        
        quiz: [
            {
                question: "Visual Design focuses on:",
                options: [
                    "Individual project messages",
                    "Brand consistency across platforms",
                    "Only print materials",
                    "Audio design"
                ],
                correct: 1
            },
            {
                question: "Visual Identity includes all EXCEPT:",
                options: [
                    "Logo",
                    "Color palette",
                    "Company profits",
                    "Typography"
                ],
                correct: 2
            },
            {
                question: "The hierarchy is: Logo is part of Identity, Identity is part of:",
                options: [
                    "Website",
                    "Brand",
                    "Marketing",
                    "Sales"
                ],
                correct: 1
            },
            {
                question: "A Brand Book defines:",
                options: [
                    "Financial rules",
                    "Visual presentation rules",
                    "Employee salaries",
                    "Product prices"
                ],
                correct: 1
            },
            {
                question: "In VARK, 'K' stands for:",
                options: [
                    "Knowledge",
                    "Kinesthetic",
                    "Keyboard",
                    "Key"
                ],
                correct: 1
            },
            {
                question: "Amazon's logo features:",
                options: [
                    "A hidden bear",
                    "An arrow from A to Z and a smile",
                    "The Bavarian flag",
                    "A hidden speed symbol"
                ],
                correct: 1
            },
            {
                question: "Brand palette usually has maximum:",
                options: [
                    "10 colors",
                    "3 colors",
                    "1 color",
                    "Unlimited colors"
                ],
                correct: 1
            },
            {
                question: "Infographics combine:",
                options: [
                    "Only text",
                    "Text, images, and data visualization",
                    "Only numbers",
                    "Only colors"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "Visual _______ is everything that visually represents a brand.",
                answer: "identity",
                hint: "Who the brand is..."
            },
            {
                sentence: "A Brand _______ defines rules for visual presentation.",
                answer: "Book",
                hint: "Document with guidelines..."
            },
            {
                sentence: "Logo ⊂ Identity ⊂ _______.",
                answer: "Brand",
                hint: "The biggest concept..."
            },
            {
                sentence: "VARK stands for Visual, Auditory, Reading/Writing, and _______.",
                answer: "Kinesthetic",
                hint: "Learning by doing..."
            },
            {
                sentence: "FedEx logo has a hidden _______ symbolizing speed.",
                answer: "arrow",
                hint: "Points in a direction..."
            }
        ],
        
        learn: {
            title: "Visual Design & Identity",
            content: `
                <h3>Visual Design vs Graphic Design</h3>
                <div class="formula-box">
                    <strong>Visual Design:</strong> Brand consistency across platforms<br>
                    <strong>Graphic Design:</strong> Individual project messages
                </div>
                
                <h4>Visual Identity Elements</h4>
                <ul>
                    <li>Logo</li>
                    <li>Color palette (max 3 colors)</li>
                    <li>Typography</li>
                    <li>Images and photography style</li>
                    <li>Patterns and shapes</li>
                    <li>Brand Book (style guide)</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-sitemap"></i> Brand Hierarchy</h4>
                    <p>Logo ⊂ Identity ⊂ Brand</p>
                    <p>Logo is part of Identity, Identity is part of Brand</p>
                </div>
                
                <h4>VARK Learning Model</h4>
                <div class="example-box">
                    <p>👁️ <strong>V</strong>isual - Images, diagrams</p>
                    <p>👂 <strong>A</strong>uditory - Listening</p>
                    <p>📖 <strong>R</strong>eading/Writing - Text</p>
                    <p>✋ <strong>K</strong>inesthetic - Doing</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 8: DIGITAL MARKETING (Unit 9) ==========
    digitalMarketing: {
        name: "Digital Marketing",
        icon: "fa-bullhorn",
        color: "#f97316",
        
        flashcards: [
            {
                question: "What is Digital Marketing?",
                answer: "Digital marketing refers to all marketing activities that use:\n\n• Digital channels\n• Digital devices\n• Online platforms\n\nIt combines: Advertising + Sales + Data Analytics\n\nGoal: Attract customers, influence buying decisions, increase market share.",
                explanation: "Marketing in the digital age."
            },
            {
                question: "What are the core benefits of Digital Marketing?",
                answer: "Key benefits:\n\n1. WIDE REACH - Global audiences, no geographical barriers\n2. COST EFFICIENCY - Social media and blogs are inexpensive\n3. MEASURABLE RESULTS - Analytics track everything\n4. PERSONALIZATION - Segment audiences, personalize messages\n5. ENGAGEMENT - Interact before, during, and after purchase\n6. EASY CONVERSIONS - Few clicks from ad to purchase",
                explanation: "Why digital marketing matters."
            },
            {
                question: "What is SEO (Search Engine Optimization)?",
                answer: "SEO improves website visibility in ORGANIC (unpaid) search results.\n\nKey SEO areas:\n• ON-PAGE SEO - Content and keywords\n• OFF-PAGE SEO - Backlinks and authority\n• TECHNICAL SEO - Speed, structure, performance",
                explanation: "Getting found on search engines."
            },
            {
                question: "What is SEM (Search Engine Marketing)?",
                answer: "SEM uses PAID ads in search engine results.\n\n• Advertisers pay per click (PPC)\n• Ads appear for specific keywords\n• Immediate visibility\n\nSEO + PPC = SEM",
                explanation: "Paid search advertising."
            },
            {
                question: "What is Content Marketing?",
                answer: "Content Marketing includes:\n\n• Blogs\n• Ebooks\n• Newsletters\n• Infographics\n• Podcasts\n• Videos\n\nGoal: Provide valuable content to attract and retain customers.",
                explanation: "Marketing through valuable content."
            },
            {
                question: "What is Affiliate Marketing?",
                answer: "Affiliate Marketing:\n\n• Uses third parties to promote products\n• Pays commission only AFTER a sale\n• Performance-based model\n\nExample: Bloggers earning commission for product recommendations.",
                explanation: "Commission-based promotion."
            },
            {
                question: "What is Marketing Automation?",
                answer: "Marketing Automation uses:\n\n• AI and machine learning\n• Automated workflows\n\nIt helps with:\n• Campaign management\n• Performance measurement\n• ROI calculation\n• Personalized messaging at scale",
                explanation: "Technology-driven marketing efficiency."
            },
            {
                question: "What makes video marketing effective?",
                answer: "Video Marketing:\n\n• Communicates more in less time\n• Increases engagement\n• Highly shareable\n\nPlatforms:\n• YouTube (also a search engine!)\n• TikTok\n• Instagram\n\nVideo is the most consumed content format.",
                explanation: "The power of video content."
            },
            {
                question: "What is Influencer Marketing?",
                answer: "Influencer Marketing:\n\n• Uses trusted content creators\n• Leverages established audiences\n• Authentic and relatable\n\nInfluencers have built trust with their followers, making recommendations more effective.",
                explanation: "Marketing through trusted voices."
            }
        ],
        
        quiz: [
            {
                question: "SEO focuses on:",
                options: [
                    "Paid advertisements",
                    "Organic (unpaid) search visibility",
                    "Social media only",
                    "Email marketing"
                ],
                correct: 1
            },
            {
                question: "SEM includes:",
                options: [
                    "Only SEO",
                    "SEO and PPC",
                    "Only social media",
                    "Only email"
                ],
                correct: 1
            },
            {
                question: "Affiliate marketing pays commission:",
                options: [
                    "Before any action",
                    "Only after a sale",
                    "Never",
                    "Monthly regardless of sales"
                ],
                correct: 1
            },
            {
                question: "Which is NOT a content marketing format?",
                options: [
                    "Blogs",
                    "Podcasts",
                    "Bank statements",
                    "Infographics"
                ],
                correct: 2
            },
            {
                question: "YouTube is also considered a:",
                options: [
                    "Bank",
                    "Search engine",
                    "Hotel platform",
                    "Government site"
                ],
                correct: 1
            },
            {
                question: "Digital marketing benefit includes:",
                options: [
                    "Limited reach",
                    "Measurable results",
                    "High cost only",
                    "No personalization"
                ],
                correct: 1
            },
            {
                question: "On-page SEO involves:",
                options: [
                    "Backlinks from other sites",
                    "Content and keywords on your site",
                    "Social media followers",
                    "Email lists"
                ],
                correct: 1
            },
            {
                question: "Marketing automation uses:",
                options: [
                    "Only manual work",
                    "AI and automated workflows",
                    "No technology",
                    "Only print media"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "SEO improves visibility in _______ (unpaid) search results.",
                answer: "organic",
                hint: "Natural, not paid..."
            },
            {
                sentence: "SEM combines SEO and _______ advertising.",
                answer: "PPC",
                hint: "Pay-Per-Click..."
            },
            {
                sentence: "_______ marketing pays commission only after a sale.",
                answer: "Affiliate",
                hint: "Third-party promotion..."
            },
            {
                sentence: "YouTube is also considered a search _______.",
                answer: "engine",
                hint: "Like Google..."
            },
            {
                sentence: "_______ marketing uses trusted content creators with established audiences.",
                answer: "Influencer",
                hint: "People with followers..."
            }
        ],
        
        learn: {
            title: "Digital Marketing",
            content: `
                <h3>Core Benefits of Digital Marketing</h3>
                <ul>
                    <li>🌍 <strong>Wide Reach:</strong> Global audiences</li>
                    <li>💰 <strong>Cost Efficiency:</strong> Lower costs than traditional</li>
                    <li>📊 <strong>Measurable:</strong> Track everything with analytics</li>
                    <li>👤 <strong>Personalization:</strong> Target specific audiences</li>
                    <li>🔄 <strong>Engagement:</strong> Interact at every stage</li>
                </ul>
                
                <h4>SEO vs SEM</h4>
                <div class="formula-box">
                    <strong>SEO</strong> = Organic search optimization (FREE clicks)<br>
                    <strong>SEM</strong> = SEO + PPC (PAID clicks)<br>
                    <strong>PPC</strong> = Pay Per Click advertising
                </div>
                
                <h4>Types of Digital Marketing</h4>
                <div class="tip-box">
                    <ul>
                        <li>Content Marketing (blogs, videos)</li>
                        <li>Social Media Marketing</li>
                        <li>Email Marketing</li>
                        <li>Affiliate Marketing (commission-based)</li>
                        <li>Influencer Marketing</li>
                        <li>Video Marketing (YouTube, TikTok)</li>
                    </ul>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 9: SOCIAL MEDIA (Unit 10) ==========
    socialMedia: {
        name: "Social Media",
        icon: "fa-share-alt",
        color: "#3b82f6",
        
        flashcards: [
            {
                question: "What is Social Media?",
                answer: "Social media refers to digital technologies that enable users to:\n\n• Create content\n• Share information\n• Interact and communicate with others\n\nPlatforms: Facebook, Instagram, TikTok, YouTube, X (Twitter), LinkedIn",
                explanation: "Digital communication and content sharing."
            },
            {
                question: "What are the key social media statistics?",
                answer: "Global insights:\n\n• Over 5.41 billion active users worldwide\n• Average daily usage: ~143 minutes\n• ~98% of users access via mobile devices",
                explanation: "The scale of social media."
            },
            {
                question: "Why is Social Media important for business?",
                answer: "Business benefits:\n\n• Raise brand awareness\n• Discover and research customers\n• Communicate directly with audiences\n• Support sales and conversions\n• Build community and loyalty",
                explanation: "Social media for business success."
            },
            {
                question: "What are the characteristics of Facebook?",
                answer: "Facebook:\n\n• Over 3 billion monthly active users\n• Strong advertising ecosystem\n• Dominant in brand discovery and communities\n\nEffective for:\n• Broad audiences\n• Advertising campaigns\n• Brand pages and groups",
                explanation: "The dominant social platform."
            },
            {
                question: "What are the characteristics of TikTok?",
                answer: "TikTok:\n\n• Extremely high engagement\n• Short-form video content\n• Strong influence on younger generations\n• Highest average time spent per user\n• Over 90% of users interact after watching\n\nPowerful for:\n• Viral marketing\n• Storytelling through video\n• Trend-driven campaigns",
                explanation: "The rising star of social media."
            },
            {
                question: "What are the characteristics of YouTube?",
                answer: "YouTube:\n\n• A social media platform AND second-largest search engine\n• Billions of active users\n• Strong purchase influence\n\nIdeal for:\n• Long-form content\n• Tutorials and reviews\n• Brand storytelling",
                explanation: "The video giant."
            },
            {
                question: "What are the characteristics of LinkedIn?",
                answer: "LinkedIn:\n\n• Leading professional platform\n• Strong B2B focus\n• High-quality content distribution\n• Effective lead generation\n\nBest for:\n• Employer branding\n• Professional visibility\n• B2B marketing",
                explanation: "Professional networking platform."
            },
            {
                question: "Which platforms do different generations prefer?",
                answer: "Generational preferences:\n\n• Gen Z: TikTok, Instagram, Snapchat\n• Millennials: Instagram, Facebook, YouTube\n• Gen X: Facebook, YouTube\n• Baby Boomers: Facebook, messaging apps",
                explanation: "Demographics drive platform choice."
            },
            {
                question: "What makes social media content go viral?",
                answer: "Viral content characteristics:\n\n• Emotional impact\n• Simplicity\n• Relatability\n• Strong visual elements\n\nContent that triggers emotions spreads faster.",
                explanation: "The science of viral content."
            },
            {
                question: "What are social media future trends?",
                answer: "Key future directions:\n\n• Short-form video dominance\n• Growth of social commerce\n• AI-driven personalization\n• Immersive AR and VR experiences\n• Stronger focus on authenticity and privacy",
                explanation: "Where social media is heading."
            }
        ],
        
        quiz: [
            {
                question: "How many active social media users are there globally?",
                options: [
                    "1 billion",
                    "3 billion",
                    "Over 5 billion",
                    "500 million"
                ],
                correct: 2
            },
            {
                question: "TikTok is known for:",
                options: [
                    "Long-form articles",
                    "Short-form video content",
                    "Professional networking",
                    "Only photos"
                ],
                correct: 1
            },
            {
                question: "YouTube is also considered:",
                options: [
                    "A bank",
                    "The second-largest search engine",
                    "Only entertainment",
                    "A government platform"
                ],
                correct: 1
            },
            {
                question: "LinkedIn is best for:",
                options: [
                    "Viral videos",
                    "B2B marketing and professional networking",
                    "Teen content",
                    "Anonymous posting"
                ],
                correct: 1
            },
            {
                question: "Gen Z prefers which platforms?",
                options: [
                    "Facebook and LinkedIn",
                    "TikTok, Instagram, and Snapchat",
                    "Only email",
                    "Only YouTube"
                ],
                correct: 1
            },
            {
                question: "Viral content typically has:",
                options: [
                    "No emotional impact",
                    "Emotional impact and relatability",
                    "Very long text",
                    "No visuals"
                ],
                correct: 1
            },
            {
                question: "What percentage of users access social media via mobile?",
                options: [
                    "50%",
                    "70%",
                    "About 98%",
                    "25%"
                ],
                correct: 2
            },
            {
                question: "Facebook has over how many monthly active users?",
                options: [
                    "500 million",
                    "1 billion",
                    "3 billion",
                    "100 million"
                ],
                correct: 2
            }
        ],
        
        fillBlanks: [
            {
                sentence: "There are over _______ billion active social media users worldwide.",
                answer: "5",
                hint: "More than 4..."
            },
            {
                sentence: "_______ is known for short-form video content and high engagement.",
                answer: "TikTok",
                hint: "Popular with Gen Z..."
            },
            {
                sentence: "YouTube is also the _______-largest search engine.",
                answer: "second",
                hint: "After Google..."
            },
            {
                sentence: "_______ is the leading professional networking platform.",
                answer: "LinkedIn",
                hint: "For B2B and careers..."
            },
            {
                sentence: "Viral content typically has emotional impact and _______.",
                answer: "relatability",
                hint: "People can connect with it..."
            }
        ],
        
        learn: {
            title: "Social Media",
            content: `
                <h3>Social Media Statistics</h3>
                <div class="formula-box">
                    📱 5.41+ billion active users<br>
                    ⏰ ~143 minutes daily usage<br>
                    📲 98% access via mobile
                </div>
                
                <h4>Major Platforms</h4>
                <ul>
                    <li>📘 <strong>Facebook:</strong> 3B users, advertising, communities</li>
                    <li>🎵 <strong>TikTok:</strong> Short video, viral, Gen Z</li>
                    <li>📺 <strong>YouTube:</strong> Video giant, 2nd search engine</li>
                    <li>📸 <strong>Instagram:</strong> Visual, stories, reels</li>
                    <li>💼 <strong>LinkedIn:</strong> Professional, B2B</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-users"></i> Generational Preferences</h4>
                    <p><strong>Gen Z:</strong> TikTok, Instagram, Snapchat</p>
                    <p><strong>Millennials:</strong> Instagram, Facebook, YouTube</p>
                    <p><strong>Gen X:</strong> Facebook, YouTube</p>
                    <p><strong>Boomers:</strong> Facebook, messaging apps</p>
                </div>
                
                <h4>Future Trends</h4>
                <p>Short-form video, social commerce, AI personalization, AR/VR</p>
            `
        }
    },
    
    // ========== CATEGORY 10: GOOGLE ANALYTICS & TRENDS (Unit 11) ==========
    googleAnalytics: {
        name: "Google Analytics",
        icon: "fa-chart-bar",
        color: "#14b8a6",
        
        flashcards: [
            {
                question: "What is Google Analytics?",
                answer: "Google Analytics (GA) is a web analytics tool providing insights into:\n\n• Website performance\n• User behavior\n• Traffic sources\n• Conversions and goals\n\nSupports: Digital marketing, SEO, PPC, content optimization, e-commerce",
                explanation: "The standard for web analytics."
            },
            {
                question: "How does Google Analytics work?",
                answer: "GA works by:\n\n1. Adding a JavaScript tracking code to website pages\n2. Collecting user interaction data when pages load\n3. Sending data to Google servers\n4. Displaying results in reports and dashboards",
                explanation: "The technical process."
            },
            {
                question: "What Real-Time data does GA provide?",
                answer: "Real-Time data shows:\n\n• Active users on the website right now\n• Pages being viewed at the moment\n• Device type (desktop or mobile)\n• User locations\n\nUseful for monitoring live campaigns.",
                explanation: "See what's happening now."
            },
            {
                question: "What Audience Insights does GA provide?",
                answer: "Audience insights include:\n\n• Number of visitors and sessions\n• New vs returning users\n• Session duration\n• Pages per session\n• Demographics and interests",
                explanation: "Understanding your visitors."
            },
            {
                question: "What is Goal and Conversion Tracking in GA?",
                answer: "Goals represent desired user actions:\n\n• Purchases\n• Form submissions\n• Newsletter sign-ups\n• Downloads\n• Account creation\n\nConversions measure how many users complete these goals.",
                explanation: "Measuring success."
            },
            {
                question: "What is Google Trends?",
                answer: "Google Trends is a FREE tool that analyzes the popularity of search terms.\n\nIt:\n• Measures RELATIVE popularity, not absolute volume\n• Compares search interest across time and regions\n• Normalizes data for fair comparison",
                explanation: "Understanding search popularity."
            },
            {
                question: "What are practical uses of Google Trends?",
                answer: "Practical uses:\n\n• Identify trending topics\n• Detect seasonal demand patterns\n• Support local SEO strategies\n• Analyze competitors\n• Optimize keyword strategies\n• Understand market interest",
                explanation: "Applications of Google Trends."
            },
            {
                question: "Google Analytics vs Google Trends - What's the difference?",
                answer: "GOOGLE ANALYTICS:\n• Focuses on YOUR website\n• Behavior and conversions\n• Performance metrics\n\nGOOGLE TRENDS:\n• Focuses on OVERALL market interest\n• External search behavior\n• Popularity comparisons",
                explanation: "Internal vs external data."
            }
        ],
        
        quiz: [
            {
                question: "Google Analytics tracks:",
                options: [
                    "Only sales",
                    "Website performance and user behavior",
                    "Only social media",
                    "Only email"
                ],
                correct: 1
            },
            {
                question: "GA works by adding what to website pages?",
                options: [
                    "Images",
                    "JavaScript tracking code",
                    "Videos",
                    "Audio files"
                ],
                correct: 1
            },
            {
                question: "Google Trends measures:",
                options: [
                    "Absolute search volume",
                    "Relative popularity of search terms",
                    "Website sales",
                    "Social media followers"
                ],
                correct: 1
            },
            {
                question: "GA Real-Time data shows:",
                options: [
                    "Last year's data",
                    "Active users and pages viewed right now",
                    "Only email opens",
                    "Future predictions"
                ],
                correct: 1
            },
            {
                question: "Goals in GA represent:",
                options: [
                    "Random actions",
                    "Desired user actions like purchases or sign-ups",
                    "Only page views",
                    "Employee targets"
                ],
                correct: 1
            },
            {
                question: "Google Trends is useful for:",
                options: [
                    "Only paid advertising",
                    "Identifying trending topics and seasonal patterns",
                    "Managing employees",
                    "Building websites"
                ],
                correct: 1
            },
            {
                question: "Google Analytics focuses on:",
                options: [
                    "Overall market interest",
                    "Your own website's performance",
                    "Competitor websites",
                    "Government data"
                ],
                correct: 1
            },
            {
                question: "GA Audience Insights include:",
                options: [
                    "Only one metric",
                    "New vs returning users, session duration, demographics",
                    "Only sales",
                    "Only advertising costs"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "Google Analytics uses _______ tracking code on websites.",
                answer: "JavaScript",
                hint: "A programming language..."
            },
            {
                sentence: "Google Trends measures _______ popularity, not absolute volume.",
                answer: "relative",
                hint: "Compared to other terms..."
            },
            {
                sentence: "_______ in GA represent desired user actions like purchases.",
                answer: "Goals",
                hint: "Targets to achieve..."
            },
            {
                sentence: "GA shows _______ data about active users on the website right now.",
                answer: "Real-Time",
                hint: "Happening now..."
            },
            {
                sentence: "Google Analytics focuses on your website, while Google Trends focuses on _______ interest.",
                answer: "market",
                hint: "Overall demand..."
            }
        ],
        
        learn: {
            title: "Google Analytics & Trends",
            content: `
                <h3>Google Analytics</h3>
                <div class="formula-box">
                    Tracking Code → Collects Data → Reports & Dashboards
                </div>
                
                <h4>Key GA Features</h4>
                <ul>
                    <li>📊 <strong>Real-Time:</strong> Active users now</li>
                    <li>👥 <strong>Audience:</strong> Who visits your site</li>
                    <li>📈 <strong>Behavior:</strong> What they do on site</li>
                    <li>🎯 <strong>Conversions:</strong> Goal completions</li>
                </ul>
                
                <h4>Google Trends</h4>
                <div class="tip-box">
                    <h4><i class="fas fa-chart-line"></i> Uses</h4>
                    <ul>
                        <li>Identify trending topics</li>
                        <li>Detect seasonal patterns</li>
                        <li>Compare keyword popularity</li>
                        <li>Analyze competitors</li>
                    </ul>
                </div>
                
                <div class="warning-box">
                    <h4><i class="fas fa-exclamation-triangle"></i> Key Difference</h4>
                    <p><strong>GA:</strong> YOUR website performance</p>
                    <p><strong>Trends:</strong> MARKET search interest</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 11: SEO, SEM & SERP (Unit 12) ==========
    seoSem: {
        name: "SEO, SEM & SERP",
        icon: "fa-search",
        color: "#84cc16",
        
        flashcards: [
            {
                question: "What is SERP?",
                answer: "SERP = Search Engine Results Page\n\nThe page displayed after a user enters a query into a search engine.\n\nContains:\n• Organic results (SEO)\n• Paid ads (PPC)\n• Featured snippets\n• Local results",
                explanation: "What you see after searching."
            },
            {
                question: "What is SEO?",
                answer: "SEO = Search Engine Optimization\n\nFocuses on optimizing a website to:\n• Rank higher in ORGANIC search results\n• Attract UNPAID traffic\n\nThree areas:\n• On-page SEO\n• Off-page SEO\n• Technical SEO",
                explanation: "Getting free search traffic."
            },
            {
                question: "What is SEM?",
                answer: "SEM = Search Engine Marketing\n\nA broader concept that includes:\n• SEO (organic)\n• PPC (paid advertising)\n\nSEO + PPC = SEM\n\nAims to maximize visibility on search engines.",
                explanation: "All search marketing activities."
            },
            {
                question: "What is Quality Score in Google Ads?",
                answer: "Quality Score measures how relevant and useful an ad is.\n\nBased on:\n• Expected click-through rate\n• Ad relevance to search query\n• Landing page experience\n\nHigher Quality Score = Lower costs, better positions.",
                explanation: "Google Ads ranking factor."
            },
            {
                question: "SEO vs SEM - Speed difference?",
                answer: "SPEED:\n\nSEO:\n• Slow to show results\n• May take months or years\n• Long-term investment\n\nSEM (PPC):\n• Immediate visibility\n• Traffic can start same day\n• Quick results",
                explanation: "Time to results."
            },
            {
                question: "What is High-Quality Content in SEO?",
                answer: "Content quality is the STRONGEST ranking factor.\n\nQuality content is:\n• Unique\n• Fresh\n• Useful\n• Written for USERS, not search engines\n\nGoogle rewards valuable content.",
                explanation: "Content is king."
            },
            {
                question: "What are Backlinks in SEO?",
                answer: "Backlinks are links from other websites to your site.\n\nThey act as:\n• Votes of confidence\n• Authority signals\n\nMore quality backlinks = Higher rankings.\n\nPart of OFF-PAGE SEO.",
                explanation: "Links as endorsements."
            },
            {
                question: "What is Mobile-First Indexing?",
                answer: "Google uses MOBILE-FIRST indexing.\n\nThis means:\n• Mobile version is used for ranking\n• Responsive design is essential\n• Desktop-only sites may rank lower\n\nMost users browse on mobile!",
                explanation: "Mobile is priority."
            },
            {
                question: "What are Core Web Vitals?",
                answer: "Core Web Vitals measure:\n\n• Loading speed (LCP)\n• Interactivity (FID)\n• Visual stability (CLS)\n\nPart of Google's ranking factors.\nFast websites rank better!",
                explanation: "User experience metrics."
            },
            {
                question: "What are the 10 most important Google ranking factors?",
                answer: "Top ranking factors:\n\n1. High-quality content\n2. Backlinks\n3. Search intent & relevance\n4. Website loading speed\n5. Mobile friendliness\n6. Domain authority\n7. Keyword optimization\n8. Website structure\n9. Website security (HTTPS)\n10. User experience signals (CTR, bounce rate)",
                explanation: "What Google values most."
            }
        ],
        
        quiz: [
            {
                question: "SERP stands for:",
                options: [
                    "Search Engine Ranking Protocol",
                    "Search Engine Results Page",
                    "Social Engine Results Page",
                    "Simple Engine Response"
                ],
                correct: 1
            },
            {
                question: "SEO focuses on:",
                options: [
                    "Paid advertising",
                    "Organic (unpaid) search results",
                    "Social media only",
                    "Email marketing"
                ],
                correct: 1
            },
            {
                question: "SEM includes:",
                options: [
                    "Only SEO",
                    "SEO and PPC",
                    "Only social media",
                    "Only content marketing"
                ],
                correct: 1
            },
            {
                question: "Quality Score affects:",
                options: [
                    "Social media followers",
                    "Google Ads costs and positions",
                    "Email delivery",
                    "Website design"
                ],
                correct: 1
            },
            {
                question: "SEO results typically take:",
                options: [
                    "Minutes",
                    "Months or years",
                    "Seconds",
                    "Never work"
                ],
                correct: 1
            },
            {
                question: "Backlinks are:",
                options: [
                    "Links on your site to yourself",
                    "Links from other websites to your site",
                    "Social media posts",
                    "Email links"
                ],
                correct: 1
            },
            {
                question: "Mobile-first indexing means:",
                options: [
                    "Desktop is priority",
                    "Mobile version is used for ranking",
                    "No mobile support",
                    "Only apps work"
                ],
                correct: 1
            },
            {
                question: "The strongest ranking factor is:",
                options: [
                    "Website age",
                    "High-quality content",
                    "Social followers",
                    "Domain name length"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "SERP stands for Search Engine Results _______.",
                answer: "Page",
                hint: "What you see..."
            },
            {
                sentence: "SEO focuses on _______ (unpaid) search results.",
                answer: "organic",
                hint: "Natural, not paid..."
            },
            {
                sentence: "SEM = SEO + _______.",
                answer: "PPC",
                hint: "Pay-Per-Click..."
            },
            {
                sentence: "_______ are links from other websites to your site.",
                answer: "Backlinks",
                hint: "External links..."
            },
            {
                sentence: "Google uses _______-first indexing for rankings.",
                answer: "mobile",
                hint: "Smartphones..."
            }
        ],
        
        learn: {
            title: "SEO, SEM & SERP",
            content: `
                <h3>Key Definitions</h3>
                <div class="formula-box">
                    <strong>SERP</strong> = Search Engine Results Page<br>
                    <strong>SEO</strong> = Search Engine Optimization (organic)<br>
                    <strong>SEM</strong> = SEO + PPC (all search marketing)
                </div>
                
                <h4>SEO Types</h4>
                <ul>
                    <li><strong>On-Page:</strong> Content, keywords, meta tags</li>
                    <li><strong>Off-Page:</strong> Backlinks, authority</li>
                    <li><strong>Technical:</strong> Speed, structure, mobile</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-trophy"></i> Top Ranking Factors</h4>
                    <ol>
                        <li>High-quality content</li>
                        <li>Backlinks (authority)</li>
                        <li>Search intent match</li>
                        <li>Loading speed</li>
                        <li>Mobile-friendliness</li>
                    </ol>
                </div>
                
                <h4>SEO vs PPC Speed</h4>
                <div class="warning-box">
                    <p>⏳ <strong>SEO:</strong> Months to years for results</p>
                    <p>⚡ <strong>PPC:</strong> Immediate traffic</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 12: HOTEL PMS (Unit 13) ==========
    hotelPMS: {
        name: "Hotel PMS",
        icon: "fa-hotel",
        color: "#a855f7",
        
        flashcards: [
            {
                question: "What is a Property Management System (PMS)?",
                answer: "A PMS is a software platform that automates a hotel's daily operations.\n\nIt supports:\n• Daily hotel operations\n• Administrative and financial tasks\n• Guest experience management\n\nThe digital backbone of hotel operations.",
                explanation: "Core hotel technology."
            },
            {
                question: "What factors influence PMS adoption?",
                answer: "Factors affecting PMS adoption:\n\n• HOTEL SIZE: <20 rooms often without PMS; 100+ rooms nearly 100% adoption\n• OWNERSHIP: Chains/franchises usually have PMS; independents less likely\n• STAR RATING: 3+ stars higher adoption; 4-5 stars require PMS\n• OCCUPANCY: High occupancy increases need for PMS",
                explanation: "Why some hotels have PMS."
            },
            {
                question: "What are the main PMS functionalities?",
                answer: "Main PMS functionalities:\n\n• Reservation systems\n• Front-desk operations\n• Housekeeping\n• Customer data management (CRM)\n• Revenue management\n• Reports and analytics\n• Point of Sale (POS)\n• Back-office management",
                explanation: "What PMS can do."
            },
            {
                question: "What are the mandatory PMS modules?",
                answer: "Every PMS MUST include:\n\n1. RESERVATION SYSTEM:\n• Stores inventory and availability\n• Synchronizes dates and room status\n• Integrates with booking engine and channels\n\n2. FRONT-DESK OPERATIONS:\n• Manages reservation status\n• Check-in and check-out\n• Payment processing\n• Room status control",
                explanation: "Essential modules."
            },
            {
                question: "What does the Revenue Management module do?",
                answer: "Revenue Management uses:\n\n• Historical booking data\n• Forecasting algorithms\n\nTo support:\n• Dynamic pricing\n• Occupancy optimization\n• Revenue maximization\n\nKey KPIs: Occupancy rate, ADR, RevPAR",
                explanation: "Maximizing hotel revenue."
            },
            {
                question: "What is ADR and RevPAR?",
                answer: "ADR = Average Daily Rate\n• Average revenue per occupied room\n• Formula: Room Revenue / Rooms Sold\n\nRevPAR = Revenue Per Available Room\n• Revenue per ALL rooms (occupied + empty)\n• Formula: Room Revenue / Total Rooms Available\n\nOr: ADR × Occupancy Rate",
                explanation: "Key hotel performance metrics."
            },
            {
                question: "What does the POS module manage?",
                answer: "POS (Point of Sale) manages transactions beyond accommodation:\n\n• Restaurants and cafés\n• Spa and gym services\n• In-room services\n• Minibar, TV, and Wi-Fi charges\n\nAll charges link to guest folio.",
                explanation: "Non-room revenue tracking."
            },
            {
                question: "What is the future of PMS?",
                answer: "Modern PMS developments:\n\n• Integration with hotel mobile applications\n• Remote check-in and digital ID upload\n• Mobile communication between guests and staff\n• Cloud-based systems\n• AI-powered features",
                explanation: "Where PMS is heading."
            }
        ],
        
        quiz: [
            {
                question: "PMS stands for:",
                options: [
                    "Personal Management Software",
                    "Property Management System",
                    "Payment Management System",
                    "Professional Marketing Service"
                ],
                correct: 1
            },
            {
                question: "Hotels with 100+ rooms have PMS adoption rate of:",
                options: [
                    "20%",
                    "50%",
                    "Nearly 100%",
                    "0%"
                ],
                correct: 2
            },
            {
                question: "Mandatory PMS modules include:",
                options: [
                    "Only housekeeping",
                    "Reservation system and front-desk operations",
                    "Only POS",
                    "Only analytics"
                ],
                correct: 1
            },
            {
                question: "RevPAR stands for:",
                options: [
                    "Revenue Per All Rooms",
                    "Revenue Per Available Room",
                    "Rate Per Average Room",
                    "Revenue Performance Analysis Report"
                ],
                correct: 1
            },
            {
                question: "Revenue management uses:",
                options: [
                    "Random pricing",
                    "Historical data and forecasting",
                    "Only fixed rates",
                    "No technology"
                ],
                correct: 1
            },
            {
                question: "POS module manages:",
                options: [
                    "Only room bookings",
                    "Restaurant, spa, and other non-room charges",
                    "Only staff schedules",
                    "Only marketing"
                ],
                correct: 1
            },
            {
                question: "ADR measures:",
                options: [
                    "Total hotel revenue",
                    "Average revenue per occupied room",
                    "Number of employees",
                    "Social media followers"
                ],
                correct: 1
            },
            {
                question: "Future PMS features include:",
                options: [
                    "Only paper-based systems",
                    "Mobile check-in and AI features",
                    "Removing technology",
                    "Only phone bookings"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "PMS stands for Property _______ System.",
                answer: "Management",
                hint: "Operating and controlling..."
            },
            {
                sentence: "_______ = Revenue Per Available Room.",
                answer: "RevPAR",
                hint: "Key hotel metric..."
            },
            {
                sentence: "Hotels with 100+ rooms have nearly _______% PMS adoption.",
                answer: "100",
                hint: "Almost all..."
            },
            {
                sentence: "Revenue management uses historical data and _______ algorithms.",
                answer: "forecasting",
                hint: "Predicting the future..."
            },
            {
                sentence: "ADR stands for Average _______ Rate.",
                answer: "Daily",
                hint: "Per day..."
            }
        ],
        
        learn: {
            title: "Hotel Property Management System",
            content: `
                <h3>What is PMS?</h3>
                <div class="formula-box">
                    PMS = Software that automates hotel daily operations<br>
                    The digital backbone of hotels
                </div>
                
                <h4>Mandatory Modules</h4>
                <ul>
                    <li><strong>Reservation System:</strong> Inventory, availability, bookings</li>
                    <li><strong>Front-Desk:</strong> Check-in/out, payments, room status</li>
                </ul>
                
                <h4>Other Key Modules</h4>
                <ul>
                    <li>Housekeeping</li>
                    <li>CRM (guest data)</li>
                    <li>Revenue Management</li>
                    <li>Reports & Analytics</li>
                    <li>POS (restaurants, spa)</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-chart-pie"></i> Key Metrics</h4>
                    <p><strong>ADR</strong> = Room Revenue / Rooms Sold</p>
                    <p><strong>RevPAR</strong> = Room Revenue / Total Available Rooms</p>
                    <p><strong>RevPAR</strong> = ADR × Occupancy Rate</p>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 13: E-BUSINESS SECURITY (Unit 14) ==========
    ebusinessSecurity: {
        name: "E-Business Security",
        icon: "fa-shield-alt",
        color: "#dc2626",
        
        flashcards: [
            {
                question: "Why is security critical in E-Business?",
                answer: "E-business depends on TRUST.\n\nSecurity is essential for:\n• Protecting customer information\n• Ensuring safe online transactions\n• Maintaining brand reputation\n• Complying with legal and industry standards",
                explanation: "Trust is the foundation."
            },
            {
                question: "What are the 4 fundamental principles of E-Commerce Security?",
                answer: "Four principles:\n\n1. PRIVACY - Data accessed only by authorized parties\n2. INTEGRITY - Data remains unchanged during storage/transmission\n3. AUTHENTICATION - Both parties are verified as real\n4. NON-REPUDIATION - Neither party can deny completed transaction",
                explanation: "The pillars of secure transactions."
            },
            {
                question: "What is Privacy in E-Commerce Security?",
                answer: "Privacy ensures customer data is accessed only by authorized parties.\n\nProtection methods:\n• Antivirus software\n• Firewalls\n• Encryption\n• Data protection systems",
                explanation: "Keeping data confidential."
            },
            {
                question: "What is Non-Repudiation?",
                answer: "Non-repudiation means neither the buyer nor seller can DENY a completed transaction.\n\nAchieved through:\n• Digital signatures\n• Transaction logs\n• Certificates\n\nProvides legal proof of transaction.",
                explanation: "No denying what happened."
            },
            {
                question: "What are common E-Commerce cybersecurity risks?",
                answer: "Common risks:\n\n• Data breaches\n• Hacking and malware\n• Phishing attacks\n• SQL injection\n• DDoS attacks\n• Credit card fraud",
                explanation: "Threats to online business."
            },
            {
                question: "What makes a strong password?",
                answer: "Strong passwords:\n\n• Include numbers and special characters\n• Combine uppercase and lowercase letters\n• Are unique for each platform\n• Are long (12+ characters recommended)\n• Avoid personal information",
                explanation: "First line of defense."
            },
            {
                question: "What are SSL Certificates and HTTPS?",
                answer: "SSL Certificates:\n• Encrypt data between user and server\n• Convert HTTP into HTTPS\n• Show padlock icon in browser\n\nHTTPS = Secure communication\nGoogle confirmed HTTPS as a ranking signal.",
                explanation: "Secure website communication."
            },
            {
                question: "What is PCI-DSS?",
                answer: "PCI-DSS = Payment Card Industry Data Security Standard\n\nSecurity standard for businesses handling credit card data.\n\nRequires:\n• Firewalls\n• Strong passwords\n• Secure data storage\n• Antivirus protection\n• Encryption",
                explanation: "Credit card security standard."
            },
            {
                question: "What should a secure hosting provider offer?",
                answer: "A secure hosting provider offers:\n\n• Threat monitoring\n• Regular security upgrades\n• Fast issue resolution\n• Built-in security features\n• DDoS protection\n• Regular backups",
                explanation: "Choosing secure infrastructure."
            }
        ],
        
        quiz: [
            {
                question: "The 4 security principles are Privacy, Integrity, Authentication, and:",
                options: [
                    "Popularity",
                    "Non-repudiation",
                    "Profitability",
                    "Performance"
                ],
                correct: 1
            },
            {
                question: "Non-repudiation means:",
                options: [
                    "Anyone can access data",
                    "Neither party can deny a transaction",
                    "Data is encrypted",
                    "Passwords are strong"
                ],
                correct: 1
            },
            {
                question: "HTTPS is created by:",
                options: [
                    "Strong passwords",
                    "SSL certificates",
                    "Social media",
                    "Email"
                ],
                correct: 1
            },
            {
                question: "PCI-DSS is a standard for:",
                options: [
                    "Social media security",
                    "Payment card data security",
                    "Email marketing",
                    "Website design"
                ],
                correct: 1
            },
            {
                question: "Strong passwords should:",
                options: [
                    "Be the same for all sites",
                    "Include numbers, special characters, and be unique",
                    "Be short and simple",
                    "Use only lowercase letters"
                ],
                correct: 1
            },
            {
                question: "Common cyber risks include all EXCEPT:",
                options: [
                    "Phishing attacks",
                    "DDoS attacks",
                    "Good customer service",
                    "SQL injection"
                ],
                correct: 2
            },
            {
                question: "Integrity in security means:",
                options: [
                    "Data is kept private",
                    "Data remains unchanged during transmission",
                    "Users are verified",
                    "Transactions cannot be denied"
                ],
                correct: 1
            },
            {
                question: "Firewalls protect against:",
                options: [
                    "Good weather",
                    "DDoS and SQL injection attacks",
                    "Happy customers",
                    "Positive reviews"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "The 4 security principles are Privacy, Integrity, Authentication, and _______-repudiation.",
                answer: "Non",
                hint: "Cannot deny..."
            },
            {
                sentence: "_______ certificates encrypt data and convert HTTP to HTTPS.",
                answer: "SSL",
                hint: "Secure Sockets Layer..."
            },
            {
                sentence: "PCI-DSS is a security standard for handling _______ card data.",
                answer: "credit",
                hint: "Payment method..."
            },
            {
                sentence: "_______ means data remains unchanged during storage and transmission.",
                answer: "Integrity",
                hint: "Completeness and accuracy..."
            },
            {
                sentence: "Strong passwords should be _______ for each platform.",
                answer: "unique",
                hint: "Different everywhere..."
            }
        ],
        
        learn: {
            title: "E-Business Security",
            content: `
                <h3>4 Security Principles</h3>
                <div class="formula-box">
                    1. <strong>Privacy</strong> - Only authorized access<br>
                    2. <strong>Integrity</strong> - Data unchanged<br>
                    3. <strong>Authentication</strong> - Verify identity<br>
                    4. <strong>Non-repudiation</strong> - Cannot deny transaction
                </div>
                
                <h4>Common Threats</h4>
                <ul>
                    <li>🔓 Data breaches</li>
                    <li>🎣 Phishing attacks</li>
                    <li>💉 SQL injection</li>
                    <li>🌊 DDoS attacks</li>
                    <li>💳 Credit card fraud</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lock"></i> Protection Methods</h4>
                    <ul>
                        <li>SSL/HTTPS encryption</li>
                        <li>Strong, unique passwords</li>
                        <li>Firewalls</li>
                        <li>PCI-DSS compliance</li>
                        <li>Regular backups</li>
                    </ul>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 14: CHALLENGES & TRENDS (Unit 15) ==========
    challengesTrends: {
        name: "Challenges & Trends",
        icon: "fa-rocket",
        color: "#0891b2",
        
        flashcards: [
            {
                question: "What are the main technology challenges in hospitality e-business?",
                answer: "Key challenges:\n\n• High technology implementation costs\n• Integration of legacy systems\n• Incompatibility with modern solutions\n• Limited scalability\n• Higher security vulnerabilities",
                explanation: "Barriers to digital transformation."
            },
            {
                question: "What are customer expectations in the digital era?",
                answer: "Customers expect:\n\n• Personalized experiences\n• Fast and seamless digital interactions\n• Immediate responses\n• 24/7 availability\n• Consistent experience across channels",
                explanation: "The demanding digital customer."
            },
            {
                question: "How does AI enhance marketing in hospitality?",
                answer: "AI-Enhanced Marketing:\n\n• Micro-segmentation of customers\n• AI-generated marketing content\n• Real-time campaign optimization\n• Predictive analytics\n• Personalized recommendations",
                explanation: "AI making marketing smarter."
            },
            {
                question: "What is Hyper-Personalization?",
                answer: "Hyper-personalization uses AI to tailor experiences:\n\n• AI-powered guest profiling\n• Personalized booking flows\n• Customized in-stay services\n• Recommendations based on behavior\n\nGoes beyond basic personalization.",
                explanation: "Next-level customization."
            },
            {
                question: "Why is mobile optimization critical?",
                answer: "Hospitality e-business is increasingly mobile-driven:\n\n• Growth of mobile bookings\n• Increase in last-minute reservations\n• Guests use phones for everything\n• Mobile-first indexing by Google\n\nMobile is not optional!",
                explanation: "Mobile is essential."
            },
            {
                question: "What are the risks of overloading guests with technology?",
                answer: "Excessive technology can harm guest experience:\n\n• Self-service kiosks everywhere\n• Multiple mandatory mobile apps\n• Complex smart-room controls\n• Technology fatigue\n\nBalance is needed!",
                explanation: "Too much of a good thing."
            },
            {
                question: "What is the 'Loss of Human Touch' concern?",
                answer: "Over-automation creates emotional risks:\n\n• Reduced emotional hospitality\n• Lower guest satisfaction\n• Changing job roles\n• Loss of personal connection\n\nHospitality is about PEOPLE.",
                explanation: "Keeping the human element."
            },
            {
                question: "What opportunities emerge from AI challenges?",
                answer: "Challenges create opportunities:\n\n• Building trust through transparency\n• Re-humanizing hospitality using technology wisely\n• Creating new digital job roles\n• Modernizing outdated systems\n• Promoting fair and inclusive AI use",
                explanation: "Finding the silver lining."
            },
            {
                question: "What are the key e-business trends for hospitality?",
                answer: "Key trends:\n\n• Automated customer service (chatbots, virtual concierges)\n• 24/7 multilingual support\n• Mobile optimization\n• Hyper-personalization\n• AI-driven operations\n• Balance of tech and human touch",
                explanation: "Where the industry is heading."
            }
        ],
        
        quiz: [
            {
                question: "Legacy system integration is a challenge because of:",
                options: [
                    "Too many customers",
                    "Incompatibility with modern solutions",
                    "Too much profit",
                    "Easy updates"
                ],
                correct: 1
            },
            {
                question: "Hyper-personalization uses:",
                options: [
                    "No technology",
                    "AI to tailor individual experiences",
                    "Only email",
                    "Random selection"
                ],
                correct: 1
            },
            {
                question: "Mobile optimization is critical because:",
                options: [
                    "Nobody uses mobile",
                    "Mobile bookings are growing rapidly",
                    "Desktops are more popular",
                    "Phones don't work"
                ],
                correct: 1
            },
            {
                question: "'Loss of human touch' refers to:",
                options: [
                    "Physical illness",
                    "Over-automation reducing personal connection",
                    "More staff",
                    "Better technology"
                ],
                correct: 1
            },
            {
                question: "Digital era customers expect:",
                options: [
                    "Slow responses",
                    "Personalized experiences and immediate responses",
                    "No technology",
                    "Only phone calls"
                ],
                correct: 1
            },
            {
                question: "Too much technology in hotels can cause:",
                options: [
                    "Higher satisfaction",
                    "Technology fatigue and confusion",
                    "More bookings",
                    "Lower costs"
                ],
                correct: 1
            },
            {
                question: "AI-enhanced marketing includes:",
                options: [
                    "Only print ads",
                    "Micro-segmentation and real-time optimization",
                    "No data use",
                    "Only TV commercials"
                ],
                correct: 1
            },
            {
                question: "Opportunities from AI challenges include:",
                options: [
                    "Ignoring problems",
                    "Re-humanizing hospitality and new job roles",
                    "Removing all technology",
                    "Closing businesses"
                ],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "_______-personalization uses AI to tailor individual guest experiences.",
                answer: "Hyper",
                hint: "Beyond normal..."
            },
            {
                sentence: "Over-automation can lead to loss of _______ touch in hospitality.",
                answer: "human",
                hint: "Personal connection..."
            },
            {
                sentence: "_______ systems are older technologies that may be incompatible with modern solutions.",
                answer: "Legacy",
                hint: "Inherited from the past..."
            },
            {
                sentence: "Digital era customers expect _______ and seamless interactions.",
                answer: "fast",
                hint: "Quick response..."
            },
            {
                sentence: "AI creates opportunities for new digital job _______.",
                answer: "roles",
                hint: "Positions or jobs..."
            }
        ],
        
        learn: {
            title: "E-Business Challenges & Trends",
            content: `
                <h3>Key Challenges</h3>
                <ul>
                    <li>💰 High technology costs</li>
                    <li>🔧 Legacy system integration</li>
                    <li>📱 Mobile optimization needs</li>
                    <li>🤖 Balancing automation vs human touch</li>
                    <li>🔒 Data security and privacy</li>
                </ul>
                
                <h4>Customer Expectations</h4>
                <div class="formula-box">
                    Personalization + Speed + 24/7 Availability + Seamless Experience
                </div>
                
                <h4>Key Trends</h4>
                <div class="tip-box">
                    <ul>
                        <li>🤖 AI-enhanced marketing</li>
                        <li>💬 Chatbots and virtual concierges</li>
                        <li>👤 Hyper-personalization</li>
                        <li>📱 Mobile-first approach</li>
                        <li>🌍 24/7 multilingual support</li>
                    </ul>
                </div>
                
                <div class="warning-box">
                    <h4><i class="fas fa-balance-scale"></i> Balance Required</h4>
                    <p>Technology should ENHANCE, not replace, the human element in hospitality.</p>
                </div>
            `
        }
    }
};

// Make data globally available for app.js
if (typeof window !== 'undefined') {
    window.ebusinessData = ebusinessData;
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ebusinessData;
}
