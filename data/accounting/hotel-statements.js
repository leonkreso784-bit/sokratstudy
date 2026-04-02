// ===== ACCOUNTING: HOTEL INCOME STATEMENTS =====
// Category 5 of Accounting Theory

const hotelStatementsData = {
    name: "Hotel Income Statements",
    icon: "fa-hotel",
    color: "#ea580c",
    
    flashcards: [
        {
            question: "What are the components of labor cost in the hotel industry?",
            answer: "Labor cost includes:\n• Wages and salaries\n• Employee benefits\n• Payroll taxes\n• Service charge distributions\n• Employee meals and uniforms",
            explanation: "Total cost of employing workers."
        },
        {
            question: "What is the external statement showing revenues and expenses given to shareholders?",
            answer: "The Income Statement (also called Profit and Loss Statement or P&L).",
            explanation: "External financial reporting."
        },
        {
            question: "What revenue sources might be in Other Operated Departments?",
            answer: "Revenue sources include:\n• Spa operations\n• Golf courses\n• Parking\n• Laundry/dry cleaning\n• Health clubs\n• Retail shops\n• Recreational facilities",
            explanation: "Ancillary hotel services."
        },
        {
            question: "What revenue sources might be in Rentals and Other Income?",
            answer: "This includes:\n• Space rentals\n• Commission income\n• Vending machine income\n• Lease income\n• Miscellaneous non-operating revenues",
            explanation: "Non-room, non-F&B revenues."
        },
        {
            question: "What types of personnel might be in the A&G department?",
            answer: "Administrative and General (A&G) includes:\n• General management\n• Accounting staff\n• Human resources\n• Information systems\n• Clerical personnel",
            explanation: "Back-office support functions."
        },
        {
            question: "What is a direct expense?",
            answer: "A direct expense is an expense that can be specifically identified with and charged to a particular department.",
            explanation: "Traceable to a specific department."
        },
        {
            question: "What types of personnel might be in Sales and Marketing?",
            answer: "Personnel include:\n• Sales managers\n• Marketing managers\n• Advertising staff\n• Public relations staff\n• Reservation sales personnel",
            explanation: "Revenue-generating support staff."
        },
        {
            question: "Which department gets charged for repairs to Rooms department furniture?",
            answer: "The Rooms department will be charged for repairs to its furniture.",
            explanation: "Direct expense principle."
        },
        {
            question: "What is the internal income statement given to managers called?",
            answer: "The Statement of Income and Expense (also called Departmental Income Statement).",
            explanation: "More detailed than external statement."
        },
        {
            question: "What four expenses are excluded from the internal income statement?",
            answer: "Four excluded expenses:\n1. Depreciation\n2. Interest\n3. Income taxes\n4. Rent or lease expense (or replacement reserve)",
            explanation: "These are handled at corporate level."
        },
        {
            question: "Which departments are Undistributed Operating Expenses?",
            answer: "Undistributed Operating Expenses include:\n• Administrative and General\n• Sales and Marketing\n• Property Operations and Maintenance\n• Utilities",
            explanation: "Expenses not directly tied to revenue departments."
        },
        {
            question: "What is Replacement Reserves on the internal statement?",
            answer: "Replacement Reserves represent funds set aside for future replacement of furniture, fixtures, and equipment (FF&E).",
            explanation: "Planning for future capital needs."
        },
        {
            question: "What ratio measures actual room sales against potential room sales?",
            answer: "The Occupancy Percentage.",
            explanation: "Key hotel performance metric."
        },
        {
            question: "What is gaming revenue in a casino operation?",
            answer: "Gaming revenue is the net amount retained by the casino, calculated as total wagers minus winnings paid to players.",
            explanation: "What the casino keeps."
        },
        {
            question: "When is Complimentary Allowances used in a casino?",
            answer: "It is used when complimentary goods or services (rooms, food, entertainment) are provided to players and must be recorded as a reduction of gaming revenue.",
            explanation: "Comps reduce reported gaming revenue."
        },
        {
            question: "What is USALI?",
            answer: "USALI = Uniform System of Accounts for the Lodging Industry\n\nA standardized accounting system for hotels that:\n• Provides consistent format for financial reporting\n• Allows benchmarking across properties\n• Separates operated departments from undistributed expenses\n• Industry standard since 1926",
            explanation: "The gold standard for hotel accounting."
        },
        {
            question: "What is RevPAR and how is it calculated?",
            answer: "RevPAR = Revenue Per Available Room\n\nTwo calculation methods:\n1. RevPAR = Total Room Revenue ÷ Available Rooms\n2. RevPAR = ADR × Occupancy %\n\nMeasures how well a hotel fills rooms at an optimal rate.",
            explanation: "Key performance indicator for rooms department."
        },
        {
            question: "What is GOPPAR?",
            answer: "GOPPAR = Gross Operating Profit Per Available Room\n\nGOPPAR = GOP ÷ Available Rooms\n\nMeasures overall hotel profitability on a per-room basis. Better than RevPAR because it accounts for all revenues AND expenses.",
            explanation: "More comprehensive than RevPAR."
        },
        {
            question: "What is ADR (Average Daily Rate)?",
            answer: "ADR = Total Room Revenue ÷ Rooms Sold\n\nMeasures the average price guests pay per room. Used with occupancy to calculate RevPAR.\n\nHigher ADR = higher room rates",
            explanation: "Average price per occupied room."
        },
        {
            question: "What is the difference between Operated and Undistributed Departments?",
            answer: "OPERATED DEPARTMENTS:\n• Generate revenue directly\n• Rooms, F&B, Spa, Golf, etc.\n• Have their own P&L statement\n\nUNDISTRIBUTED DEPARTMENTS:\n• Support operations but don't generate direct revenue\n• A&G, Sales & Marketing, Maintenance, Utilities\n• Costs allocated across property",
            explanation: "Revenue-generating vs support functions."
        },
        {
            question: "What is GOP (Gross Operating Profit)?",
            answer: "GOP = Total Revenue − Department Expenses − Undistributed Expenses\n\nGOP represents profit from operations BEFORE:\n• Management fees\n• Fixed charges (rent, insurance, property tax)\n• Interest and depreciation\n\nKey measure of operational performance.",
            explanation: "Profit from day-to-day operations."
        }
    ],
    
    quiz: [
        {
            question: "Labor cost does NOT include:",
            options: ["Wages", "Benefits", "Food cost", "Payroll taxes"],
            correct: 2
        },
        {
            question: "The external income statement is given to:",
            options: ["Employees only", "Shareholders", "Competitors", "Suppliers"],
            correct: 1
        },
        {
            question: "A direct expense can be:",
            options: ["Allocated to all departments", "Specifically charged to a department", "Ignored", "Deferred"],
            correct: 1
        },
        {
            question: "Which is an Undistributed Operating Expense?",
            options: ["Room revenue", "Food sales", "Administrative and General", "Gaming revenue"],
            correct: 2
        },
        {
            question: "Replacement Reserves are for:",
            options: ["Employee salaries", "Food purchases", "Future FF&E replacement", "Tax payments"],
            correct: 2
        },
        {
            question: "Occupancy Percentage measures:",
            options: ["Food sales vs cost", "Actual vs potential room sales", "Labor efficiency", "Marketing success"],
            correct: 1
        },
        {
            question: "Gaming revenue equals:",
            options: ["Total wagers", "Total wagers minus winnings paid", "Player deposits", "Casino expenses"],
            correct: 1
        },
        {
            question: "Which is excluded from the internal income statement?",
            options: ["Labor cost", "Food cost", "Depreciation", "Room revenue"],
            correct: 2
        },
        {
            question: "A&G department includes:",
            options: ["Housekeeping", "Kitchen staff", "Accounting staff", "Servers"],
            correct: 2
        },
        {
            question: "Complimentary Allowances reduce:",
            options: ["Labor cost", "Gaming revenue", "Room rates", "Food prices"],
            correct: 1
        },
        {
            question: "USALI stands for:",
            options: ["United States Accounting Law Institute", "Uniform System of Accounts for the Lodging Industry", "Universal Standards for Auditing Lodging", "US Accounting for Lodging Income"],
            correct: 1
        },
        {
            question: "RevPAR is calculated as:",
            options: ["Room Revenue × Occupancy", "ADR × Occupancy %", "Rooms Sold ÷ ADR", "Total Revenue ÷ Rooms Sold"],
            correct: 1
        },
        {
            question: "GOP stands for:",
            options: ["General Operating Plan", "Gross Operating Profit", "Growth of Profit", "Guaranteed Operating Performance"],
            correct: 1
        },
        {
            question: "Which is an Operated Department?",
            options: ["Utilities", "A&G", "Rooms", "Property Maintenance"],
            correct: 2
        },
        {
            question: "ADR is calculated as:",
            options: ["Room Revenue ÷ Available Rooms", "Room Revenue ÷ Rooms Sold", "Rooms Sold × Rate", "Total Revenue ÷ Guests"],
            correct: 1
        }
    ],
    
    fillBlanks: [
        {
            sentence: "_______ Percentage measures actual room sales against potential.",
            answer: "Occupancy",
            hint: "How full is the hotel..."
        },
        {
            sentence: "Gaming revenue = Total wagers minus _______ paid to players.",
            answer: "winnings",
            hint: "What players win..."
        },
        {
            sentence: "A _______ expense can be specifically charged to a department.",
            answer: "direct",
            hint: "Traceable, not indirect..."
        },
        {
            sentence: "Replacement _______ are funds set aside for future FF&E.",
            answer: "Reserves",
            hint: "Money saved for later..."
        },
        {
            sentence: "A&G stands for Administrative and _______.",
            answer: "General",
            hint: "Admin and..."
        },
        {
            sentence: "USALI stands for Uniform System of Accounts for the _______ Industry.",
            answer: "Lodging",
            hint: "Hotels, resorts..."
        },
        {
            sentence: "RevPAR = ADR × _______ %",
            answer: "Occupancy",
            hint: "How full..."
        },
        {
            sentence: "GOP stands for Gross _______ Profit.",
            answer: "Operating",
            hint: "From operations..."
        },
        {
            sentence: "ADR = Room Revenue ÷ Rooms _______.",
            answer: "Sold",
            hint: "Occupied rooms..."
        },
        {
            sentence: "_______ departments generate revenue directly (Rooms, F&B).",
            answer: "Operated",
            hint: "They operate and make money..."
        }
    ],
    
    learn: {
        title: "Hotel Income Statements & Departments",
        content: `
            <h3>📚 Chapter Overview: Hotel Income Statements</h3>
            
            <div class="tip-box" style="text-align: center; background: linear-gradient(135deg, rgba(234, 88, 12, 0.1), rgba(234, 88, 12, 0.2)); border-left-color: #ea580c;">
                <h4 style="color: #ea580c; font-size: 1.2rem;">🏨 USALI - Uniform System of Accounts for Lodging</h4>
                <p style="margin: 0;">Industry standard since 1926 • Currently 11th Edition</p>
            </div>
            
            <p>This chapter covers the unique aspects of hotel financial reporting, including USALI, departmental accounting, and key performance indicators.</p>
            
            <hr>
            
            <h4>📋 USALI - Uniform System of Accounts for the Lodging Industry</h4>
            <p>The industry-standard accounting framework for hotels since 1926. Currently in its 11th edition.</p>
            
            <h5>Benefits of USALI:</h5>
            <ul>
                <li>Standardized format for financial reporting</li>
                <li>Enables benchmarking across properties</li>
                <li>Facilitates comparison with competitors</li>
                <li>Provides consistent departmental structure</li>
            </ul>
            
            <hr>
            
            <h4>🏨 Hotel Department Structure</h4>
            
            <div class="formula-box">
                <strong>OPERATED DEPARTMENTS</strong> (Generate Revenue):<br>
                • Rooms<br>
                • Food & Beverage<br>
                • Other Operated Departments (Spa, Golf, Parking, etc.)<br>
                • Rentals and Other Income<br><br>
                
                <strong>UNDISTRIBUTED OPERATING EXPENSES</strong> (Support Functions):<br>
                • Administrative & General (A&G)<br>
                • Sales & Marketing<br>
                • Property Operations & Maintenance (POM)<br>
                • Utilities
            </div>
            
            <hr>
            
            <h4>📊 Two Types of Income Statements</h4>
            
            <table style="width:100%; border-collapse: collapse; margin: 15px 0;">
                <tr style="background: rgba(234,88,12,0.2);">
                    <th style="padding: 10px; border: 1px solid #ccc;">External (Shareholders)</th>
                    <th style="padding: 10px; border: 1px solid #ccc;">Internal (Managers)</th>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">Income Statement</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">Statement of Income and Expense</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">Summarized</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">Detailed by department</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ccc;">Includes all expenses</td>
                    <td style="padding: 10px; border: 1px solid #ccc;">Excludes: Depreciation, Interest, Taxes, Rent</td>
                </tr>
            </table>
            
            <h5>Four Expenses EXCLUDED from Internal Statement:</h5>
            <ol>
                <li>Depreciation</li>
                <li>Interest expense</li>
                <li>Income taxes</li>
                <li>Rent/lease expense (or Replacement Reserves)</li>
            </ol>
            
            <hr>
            
            <h4>📈 Key Performance Indicators (KPIs)</h4>
            
            <div class="example-box" style="text-align: center;">
                <h4 style="margin-top: 0;">📊 Hotel KPI Formula to Remember!</h4>
                <p style="font-size: 1.3rem; margin: 10px 0;"><strong>RevPAR = ADR × Occupancy %</strong></p>
                <p style="margin: 0; color: #666;">Revenue Per Available Room = Average Daily Rate × Occupancy</p>
            </div>
            
            <div class="formula-box">
                <strong>ROOMS KPIs:</strong><br><br>
                
                <strong>Occupancy %</strong> = Rooms Sold ÷ Rooms Available<br>
                <em>How full is the hotel?</em><br><br>
                
                <strong>ADR</strong> (Average Daily Rate) = Room Revenue ÷ Rooms Sold<br>
                <em>Average price per occupied room</em><br><br>
                
                <strong>RevPAR</strong> = Room Revenue ÷ Available Rooms<br>
                OR RevPAR = ADR × Occupancy %<br>
                <em>Revenue per available room (combines rate and occupancy)</em>
            </div>
            
            <div class="example-box">
                <h4>📝 Example: KPI Calculations</h4>
                <p>Hotel has 200 rooms, sold 150 rooms, room revenue $22,500:</p>
                <p><strong>Occupancy:</strong> 150 ÷ 200 = <strong>75%</strong></p>
                <p><strong>ADR:</strong> $22,500 ÷ 150 = <strong>$150</strong></p>
                <p><strong>RevPAR:</strong> $22,500 ÷ 200 = <strong>$112.50</strong></p>
                <p>Or: $150 × 75% = <strong>$112.50</strong> ✓</p>
            </div>
            
            <div class="formula-box">
                <strong>PROFITABILITY KPIs:</strong><br><br>
                
                <strong>GOP</strong> (Gross Operating Profit) =<br>
                Total Revenue − Department Expenses − Undistributed Expenses<br><br>
                
                <strong>GOPPAR</strong> = GOP ÷ Available Rooms<br>
                <em>Overall profitability per room</em>
            </div>
            
            <hr>
            
            <h4>👥 Labor Cost Components</h4>
            <ul>
                <li>Wages and salaries</li>
                <li>Employee benefits (health insurance, retirement)</li>
                <li>Payroll taxes (FICA, unemployment)</li>
                <li>Service charge distributions</li>
                <li>Employee meals and uniforms</li>
            </ul>
            
            <hr>
            
            <h4>🏢 Department Details</h4>
            
            <h5>Administrative & General (A&G):</h5>
            <ul>
                <li>General management</li>
                <li>Accounting staff</li>
                <li>Human resources</li>
                <li>Information systems</li>
                <li>Clerical personnel</li>
            </ul>
            
            <h5>Sales & Marketing:</h5>
            <ul>
                <li>Sales managers</li>
                <li>Marketing managers</li>
                <li>Advertising staff</li>
                <li>Public relations</li>
                <li>Reservations sales</li>
            </ul>
            
            <h5>Direct vs Indirect Expenses:</h5>
            <p><strong>Direct:</strong> Can be traced to specific department (furniture repair → Rooms)</p>
            <p><strong>Indirect:</strong> Shared across departments (utilities, insurance)</p>
            
            <hr>
            
            <h4>🎰 Gaming Operations (Casinos)</h4>
            
            <div class="formula-box">
                <strong>Gaming Revenue</strong> = Total Wagers − Winnings Paid to Players<br><br>
                <strong>Complimentary Allowances:</strong><br>
                Comps (free rooms, meals, entertainment) given to players<br>
                Recorded as reduction of gaming revenue
            </div>
            
            <hr>
            
            <h4>🔧 Other Key Terms</h4>
            
            <h5>Replacement Reserves:</h5>
            <p>Funds set aside for future replacement of Furniture, Fixtures & Equipment (FF&E). Typically 3-5% of revenue.</p>
            
            <h5>Other Operated Departments:</h5>
            <ul>
                <li>Spa operations</li>
                <li>Golf courses</li>
                <li>Parking</li>
                <li>Laundry/dry cleaning</li>
                <li>Health clubs</li>
                <li>Retail shops</li>
            </ul>
            
            <h5>Rentals and Other Income:</h5>
            <ul>
                <li>Space rentals</li>
                <li>Commission income</li>
                <li>Vending machine income</li>
                <li>Lease income</li>
            </ul>
            
            <div class="tip-box">
                <h4><i class="fas fa-lightbulb"></i> Key Takeaways</h4>
                <ul>
                    <li>USALI = Industry standard for hotel accounting</li>
                    <li>RevPAR = ADR × Occupancy (memorize!)</li>
                    <li>ADR = Room Revenue ÷ Rooms SOLD</li>
                    <li>Occupancy = Rooms SOLD ÷ Rooms AVAILABLE</li>
                    <li>GOP = Profit BEFORE depreciation, interest, taxes</li>
                    <li>Internal statement excludes: Depreciation, Interest, Taxes, Rent</li>
                    <li>Gaming Revenue = Wagers − Winnings Paid</li>
                </ul>
            </div>
        `
    }
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = hotelStatementsData;
}
