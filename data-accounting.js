// ===== ACCOUNTING THEORY - QUESTION DATABASE =====
// Comprehensive study material for Accounting Theory exam
// Categories: Cash & Internal Control, Budgeting & Costs, SEC & Reports, Accounting Cycle, Hotel Statements, Financial Analysis

const accountingData = {
    
    // ========== CATEGORY 1: CASH & INTERNAL CONTROL ==========
    cashControl: {
        name: "Cash & Internal Control",
        icon: "fa-shield-halved",
        color: "#059669",
        
        flashcards: [
            {
                question: "What items are included in cash?",
                answer: "Cash includes:\n• Currency and coins on hand\n• Bank deposits\n• Checks received from customers\n• Money orders\n• Other negotiable instruments\n• Undeposited cash receipts\n• Cash in house banks",
                explanation: "Cash must be readily available for use."
            },
            {
                question: "What is the definition of internal control?",
                answer: "Internal control is a system of policies and procedures designed to:\n• Protect assets\n• Ensure accurate accounting records\n• Promote operational efficiency\n• Encourage adherence to management policies",
                explanation: "Internal control is the foundation of reliable financial reporting."
            },
            {
                question: "What are the four main objectives of internal control?",
                answer: "1. Safeguarding assets\n2. Ensuring reliability and accuracy of accounting records\n3. Promoting operational efficiency\n4. Ensuring compliance with laws and company policies",
                explanation: "These objectives protect the business from fraud and errors."
            },
            {
                question: "What assets are intended to be safeguarded by internal control?",
                answer: "Assets to be safeguarded include:\n• Cash\n• Inventory\n• Equipment\n• Furnishings\n• Supplies\n• Other property\n• Accounting records\n• Financial information",
                explanation: "Both physical assets and information need protection."
            },
            {
                question: "What is collusion?",
                answer: "Collusion occurs when two or more employees work together to circumvent internal control procedures, usually to commit fraud or theft that would be difficult for one person to accomplish alone.",
                explanation: "Collusion is a significant threat to internal controls."
            },
            {
                question: "What is the advantage of bonding employees?",
                answer: "Bonding employees:\n• Provides financial protection against losses caused by employee dishonesty\n• Acts as a deterrent to theft or fraud\n• Allows recovery of losses by the company",
                explanation: "Bonded employees know that losses can be recovered."
            },
            {
                question: "What is an internal control procedure for house banks?",
                answer: "Assign responsibility for each house bank to one specific employee and require that the bank be counted and reconciled at the beginning and end of each shift.",
                explanation: "Single responsibility ensures accountability."
            },
            {
                question: "What is the purpose of the cashier's daily report?",
                answer: "The cashier's daily report:\n• Summarizes all cash transactions for the day\n• Reconciles cash received with recorded sales\n• Provides documentation for accounting and management review",
                explanation: "Essential for cash control and accountability."
            },
            {
                question: "What is the purpose of a bank reconciliation?",
                answer: "Bank reconciliation:\n• Explains differences between bank statement and company's cash records\n• Detects errors or irregularities\n• Ensures accuracy of the cash account",
                explanation: "Reconciliation is a key control procedure."
            },
            {
                question: "What are canceled checks?",
                answer: "Canceled checks are checks that have been paid by the bank and returned to the check writer as proof of payment.",
                explanation: "They serve as evidence that payment was made."
            },
            {
                question: "What is a deposit in transit?",
                answer: "A deposit in transit is cash receipts that have been recorded by the company but not yet recorded by the bank.",
                explanation: "Timing difference - company recorded first."
            },
            {
                question: "What are outstanding checks?",
                answer: "Outstanding checks are checks that have been written and recorded by the company but not yet paid by the bank.",
                explanation: "Timing difference - bank hasn't processed yet."
            },
            {
                question: "What is an NSF check?",
                answer: "NSF (Non-Sufficient Funds) check is a check returned by the bank because the issuer does not have enough funds in their account to cover the check.",
                explanation: "Also known as a 'bounced check'."
            },
            {
                question: "Why does the bank statement balance generally not equal the checkbook balance?",
                answer: "Balances differ due to timing differences:\n• Outstanding checks\n• Deposits in transit\n• Bank service charges\n• NSF checks\n• Errors by bank or company",
                explanation: "These items are recorded at different times."
            },
            // ===== DODATNE FLASHCARDS =====
            {
                question: "What are the 5 components of COSO Internal Control Framework?",
                answer: "1. Control Environment - tone at the top, ethics, integrity\n2. Risk Assessment - identifying and analyzing risks\n3. Control Activities - policies and procedures\n4. Information & Communication - relevant info flows\n5. Monitoring Activities - ongoing evaluations",
                explanation: "COSO framework is the gold standard for internal control."
            },
            {
                question: "What is Separation of Duties and why is it important?",
                answer: "Separation of Duties means dividing responsibilities among different employees so no single person controls all aspects of a transaction.\n\nThree functions to separate:\n• Authorization\n• Custody of assets\n• Record keeping\n\nThis prevents fraud and errors.",
                explanation: "One person should never handle a transaction from start to finish."
            },
            {
                question: "What is a Petty Cash Fund?",
                answer: "A petty cash fund is a small amount of cash kept on hand to pay for minor expenses that are impractical to pay by check.\n\nControls include:\n• Fixed fund amount\n• One custodian responsible\n• Receipts required for all disbursements\n• Periodic surprise counts",
                explanation: "Used for small, incidental expenses."
            },
            {
                question: "What are prenumbered documents and why are they used?",
                answer: "Prenumbered documents are forms (checks, invoices, receipts) printed with sequential numbers.\n\nPurpose:\n• Track all documents\n• Detect missing or duplicate transactions\n• Establish audit trail\n• Prevent unauthorized transactions",
                explanation: "Essential for transaction tracking and accountability."
            },
            {
                question: "What is the purpose of surprise audits?",
                answer: "Surprise audits are unannounced examinations of records or cash.\n\nBenefits:\n• Deter fraud (employees don't know when audit will occur)\n• Detect irregularities before they grow\n• Test effectiveness of controls\n• Keep employees vigilant",
                explanation: "The element of surprise is key to effectiveness."
            },
            {
                question: "What is the difference between authorization and approval?",
                answer: "Authorization: General permission to perform transactions within set limits (e.g., manager can approve purchases up to $500)\n\nApproval: Specific permission for a particular transaction (e.g., signing a specific purchase order)\n\nBoth are control activities that ensure proper review.",
                explanation: "Authorization sets limits; approval is for specific actions."
            },
            {
                question: "What are the steps in a Bank Reconciliation?",
                answer: "1. Start with bank statement ending balance\n2. Add: Deposits in transit\n3. Subtract: Outstanding checks\n4. = Adjusted bank balance\n\n5. Start with book balance\n6. Add: Bank collections, interest earned\n7. Subtract: Service charges, NSF checks\n8. = Adjusted book balance\n\nBoth adjusted balances should match!",
                explanation: "Systematic process to reconcile two balances."
            },
            {
                question: "What is a Cash Over and Short account?",
                answer: "Cash Over and Short is an account used to record differences between actual cash and the amount that should be in the cash register.\n\n• Debit (expense) if cash is SHORT\n• Credit (revenue) if cash is OVER\n\nLarge or frequent differences indicate control problems.",
                explanation: "Tracks cashier accuracy and potential theft."
            }
        ],
        
        quiz: [
            {
                question: "Which is NOT included in cash?",
                options: ["Currency on hand", "Bank deposits", "Accounts receivable", "Checks from customers"],
                correct: 2
            },
            {
                question: "What is the main purpose of internal control?",
                options: ["Increase profits", "Protect assets and ensure accuracy", "Reduce employees", "Expand business"],
                correct: 1
            },
            {
                question: "Collusion involves:",
                options: ["One employee stealing", "Two or more employees working together to circumvent controls", "Management fraud only", "External hackers"],
                correct: 1
            },
            {
                question: "Bonding employees provides protection against:",
                options: ["Natural disasters", "Employee dishonesty", "Market changes", "Competition"],
                correct: 1
            },
            {
                question: "A deposit in transit is:",
                options: ["Recorded by bank but not company", "Recorded by company but not bank yet", "A canceled check", "An NSF check"],
                correct: 1
            },
            {
                question: "Outstanding checks are:",
                options: ["Paid by the bank", "Written by company but not yet paid by bank", "Canceled checks", "Deposits"],
                correct: 1
            },
            {
                question: "NSF stands for:",
                options: ["National Security Fund", "Non-Sufficient Funds", "New Standard Format", "Net Sales Figure"],
                correct: 1
            },
            {
                question: "How many main objectives does internal control have?",
                options: ["2", "3", "4", "5"],
                correct: 2
            },
            {
                question: "The cashier's daily report is used to:",
                options: ["Fire employees", "Summarize and reconcile cash transactions", "Order supplies", "Set prices"],
                correct: 1
            },
            {
                question: "Bank reconciliation helps to:",
                options: ["Increase sales", "Detect errors and ensure cash accuracy", "Hire employees", "Buy equipment"],
                correct: 1
            },
            // ===== DODATNI QUIZ =====
            {
                question: "How many components does the COSO Internal Control Framework have?",
                options: ["3", "4", "5", "6"],
                correct: 2
            },
            {
                question: "Separation of Duties requires separating which three functions?",
                options: ["Sales, Marketing, Finance", "Authorization, Custody, Record keeping", "Hiring, Training, Firing", "Planning, Organizing, Controlling"],
                correct: 1
            },
            {
                question: "A petty cash fund is used for:",
                options: ["Large purchases", "Employee salaries", "Small incidental expenses", "Investments"],
                correct: 2
            },
            {
                question: "Prenumbered documents help to:",
                options: ["Increase profits", "Track transactions and detect missing documents", "Reduce taxes", "Hire employees"],
                correct: 1
            },
            {
                question: "The purpose of surprise audits is to:",
                options: ["Scare employees", "Deter fraud and detect irregularities", "Increase workload", "Reduce costs"],
                correct: 1
            },
            {
                question: "Which is NOT a component of COSO framework?",
                options: ["Control Environment", "Risk Assessment", "Profit Maximization", "Monitoring Activities"],
                correct: 2
            },
            {
                question: "Cash Over and Short account records:",
                options: ["Bank loans", "Differences between actual and expected cash", "Employee salaries", "Inventory"],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "_______ occurs when two or more employees work together to circumvent internal controls.",
                answer: "Collusion",
                hint: "Working together for fraud..."
            },
            {
                sentence: "NSF stands for Non-_______ Funds.",
                answer: "Sufficient",
                hint: "Not enough..."
            },
            {
                sentence: "A _______ in transit is recorded by the company but not yet by the bank.",
                answer: "deposit",
                hint: "Money put into account..."
            },
            {
                sentence: "_______ checks have been written but not yet paid by the bank.",
                answer: "Outstanding",
                hint: "Still out there..."
            },
            {
                sentence: "_______ employees provides financial protection against dishonesty.",
                answer: "Bonding",
                hint: "Insurance against theft..."
            },
            // ===== DODATNI FILL BLANKS =====
            {
                sentence: "The COSO framework has _______ components of internal control.",
                answer: "five",
                hint: "5..."
            },
            {
                sentence: "_______ of Duties separates authorization, custody, and record keeping.",
                answer: "Separation",
                hint: "Dividing responsibilities..."
            },
            {
                sentence: "A _______ cash fund is used for small incidental expenses.",
                answer: "petty",
                hint: "Small, minor..."
            },
            {
                sentence: "_______ documents are printed with sequential numbers to track transactions.",
                answer: "Prenumbered",
                hint: "Numbers printed in advance..."
            },
            {
                sentence: "_______ audits are unannounced examinations that deter fraud.",
                answer: "Surprise",
                hint: "Unexpected..."
            },
            {
                sentence: "Cash Over and _______ account records differences in cash register.",
                answer: "Short",
                hint: "Over and..."
            }
        ],
        
        learn: {
            title: "Cash and Internal Control",
            content: `
                <h3>📚 Chapter Overview: Cash and Internal Control</h3>
                <p>This chapter covers the fundamentals of cash management and the internal control systems that protect a hospitality business's most liquid asset.</p>
                
                <hr>
                
                <h4>💰 What is Cash?</h4>
                <p>In accounting, <strong>cash</strong> refers to the most liquid assets that are readily available for use. Cash includes:</p>
                <ul>
                    <li>Currency and coins on hand</li>
                    <li>Bank deposits (checking and savings accounts)</li>
                    <li>Checks received from customers</li>
                    <li>Money orders and traveler's checks</li>
                    <li>Other negotiable instruments</li>
                    <li>Undeposited cash receipts</li>
                    <li>Cash in house banks (front desk, restaurants, bars)</li>
                </ul>
                
                <div class="warning-box">
                    <h4>⚠️ NOT Cash:</h4>
                    <p>Accounts receivable, inventory, prepaid expenses, and investments are NOT considered cash because they cannot be immediately used for payments.</p>
                </div>
                
                <hr>
                
                <h4>🛡️ Internal Control Definition</h4>
                <p><strong>Internal control</strong> is a comprehensive system of policies, procedures, and practices designed by management to:</p>
                
                <div class="formula-box">
                    <strong>4 Main Objectives of Internal Control:</strong><br><br>
                    <strong>1. Safeguard Assets</strong> - Protect cash, inventory, equipment from theft or misuse<br><br>
                    <strong>2. Ensure Accuracy</strong> - Maintain reliable and accurate accounting records<br><br>
                    <strong>3. Promote Efficiency</strong> - Encourage operational effectiveness<br><br>
                    <strong>4. Ensure Compliance</strong> - Adhere to laws, regulations, and company policies
                </div>
                
                <hr>
                
                <h4>🏛️ COSO Internal Control Framework</h4>
                
                <div class="tip-box" style="text-align: center; background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.2)); border-left-color: var(--primary);">
                    <h4 style="color: var(--primary); font-size: 1.3rem;">🏗️ COSO = Committee of Sponsoring Organizations</h4>
                    <p style="margin: 0;">The Gold Standard for Internal Control - 5 Interrelated Components</p>
                </div>
                
                <p>The <strong>Committee of Sponsoring Organizations (COSO)</strong> framework is the gold standard for internal control. It has <strong>5 interrelated components</strong>:</p>
                
                <div class="formula-box">
                    <strong>5 Components of COSO Framework:</strong><br><br>
                    <strong>1. Control Environment</strong><br>
                    The "tone at the top" - management's integrity, ethical values, and commitment to competence<br><br>
                    
                    <strong>2. Risk Assessment</strong><br>
                    Identifying and analyzing risks that may prevent achieving objectives<br><br>
                    
                    <strong>3. Control Activities</strong><br>
                    Policies and procedures that ensure management directives are carried out (approvals, authorizations, verifications, reconciliations)<br><br>
                    
                    <strong>4. Information & Communication</strong><br>
                    Relevant information must be identified, captured, and communicated in a timely manner<br><br>
                    
                    <strong>5. Monitoring Activities</strong><br>
                    Ongoing evaluations to assess whether controls are functioning effectively
                </div>
                
                <hr>
                
                <h4>🔐 Key Control Principles</h4>
                
                <h5>Separation of Duties</h5>
                <p>The most critical internal control principle. <strong>No single person</strong> should control all aspects of a transaction. Three functions must be separated:</p>
                <ul>
                    <li><strong>Authorization</strong> - Approving transactions</li>
                    <li><strong>Custody</strong> - Physical control of assets</li>
                    <li><strong>Record Keeping</strong> - Recording transactions</li>
                </ul>
                
                <div class="example-box">
                    <h4>📝 Example: Hotel Front Desk</h4>
                    <p>• Night auditor (records) ≠ Cashier (custody) ≠ Manager (authorization)</p>
                    <p>• If one person does all three, they could steal cash and cover it up in records!</p>
                </div>
                
                <h5>Prenumbered Documents</h5>
                <p>All important documents (checks, invoices, receipts) should have sequential numbers to:</p>
                <ul>
                    <li>Track all transactions</li>
                    <li>Detect missing or duplicate documents</li>
                    <li>Establish an audit trail</li>
                </ul>
                
                <h5>Bonding Employees</h5>
                <p>Fidelity bonds provide insurance against employee dishonesty. Benefits:</p>
                <ul>
                    <li>Financial recovery if theft occurs</li>
                    <li>Deterrent effect - employees know losses can be recovered</li>
                    <li>Background checks during bonding process</li>
                </ul>
                
                <h5>Surprise Audits</h5>
                <p>Unannounced examinations of cash and records. The unpredictability is the key - employees never know when an audit might occur.</p>
                
                <hr>
                
                <h4>🏨 House Banks in Hospitality</h4>
                <p>A <strong>house bank</strong> is a fixed amount of cash assigned to a cashier for making change. Controls include:</p>
                <ul>
                    <li>One specific employee responsible for each bank</li>
                    <li>Count and reconcile at beginning and end of each shift</li>
                    <li>Bank amount should remain constant</li>
                    <li>Overages and shortages investigated</li>
                </ul>
                
                <h5>Petty Cash Fund</h5>
                <p>A small amount of cash kept for minor expenses. Controls:</p>
                <ul>
                    <li>Fixed fund amount (e.g., $200)</li>
                    <li>One custodian responsible</li>
                    <li>Receipts required for ALL disbursements</li>
                    <li>Cash + Receipts must always equal fund total</li>
                </ul>
                
                <hr>
                
                <h4>🏦 Bank Reconciliation</h4>
                
                <div class="tip-box" style="text-align: center; background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.2));">
                    <h4>📊 Bank Statement ↔️ Company Records</h4>
                    <p style="margin: 0;">Reconciliation ensures both balances match after adjustments</p>
                </div>
                
                <p>A <strong>bank reconciliation</strong> explains differences between the bank statement balance and the company's book balance. It should be performed monthly by someone who does NOT handle cash.</p>
                
                <div class="formula-box">
                    <strong>Bank Reconciliation Procedure:</strong><br><br>
                    <strong>BANK SIDE:</strong><br>
                    Bank Statement Balance<br>
                    + Deposits in Transit<br>
                    − Outstanding Checks<br>
                    ± Bank Errors<br>
                    = <strong>Adjusted Bank Balance</strong><br><br>
                    
                    <strong>BOOK SIDE:</strong><br>
                    Book Balance (per records)<br>
                    + Bank Collections, Interest Earned<br>
                    − Service Charges, NSF Checks<br>
                    ± Book Errors<br>
                    = <strong>Adjusted Book Balance</strong><br><br>
                    
                    <em>Both adjusted balances must be equal!</em>
                </div>
                
                <h5>Key Terms:</h5>
                <ul>
                    <li><strong>Deposit in Transit:</strong> Recorded by company but not yet by bank (ADD to bank)</li>
                    <li><strong>Outstanding Check:</strong> Written by company but not yet paid by bank (SUBTRACT from bank)</li>
                    <li><strong>NSF Check:</strong> "Bounced" check - insufficient funds (SUBTRACT from books)</li>
                    <li><strong>Canceled Check:</strong> Check that has been paid and returned as proof</li>
                </ul>
                
                <hr>
                
                <h4>📊 Cash Over and Short</h4>
                <p>When actual cash differs from expected amount:</p>
                <ul>
                    <li><strong>Cash Short:</strong> Actual < Expected → Debit (expense)</li>
                    <li><strong>Cash Over:</strong> Actual > Expected → Credit (revenue)</li>
                </ul>
                <p>Large or frequent differences indicate control problems and should be investigated!</p>
                
                <hr>
                
                <h4>🚨 Collusion</h4>
                <p><strong>Collusion</strong> occurs when two or more employees work together to circumvent internal controls. It's the biggest threat to any control system because:</p>
                <ul>
                    <li>Separation of duties is defeated</li>
                    <li>Harder to detect than individual fraud</li>
                    <li>Usually involves larger amounts</li>
                </ul>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Key Takeaways</h4>
                    <ul>
                        <li>Internal control protects assets and ensures accurate records</li>
                        <li>COSO framework has 5 components - memorize them!</li>
                        <li>Separation of duties = Authorization + Custody + Record keeping SEPARATED</li>
                        <li>Bank reconciliation reconciles BANK balance with BOOK balance</li>
                        <li>Deposits in transit: ADD to bank; Outstanding checks: SUBTRACT from bank</li>
                        <li>Collusion defeats separation of duties</li>
                    </ul>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 2: BUDGETING & COST ANALYSIS ==========
    budgeting: {
        name: "Budgeting & Costs",
        icon: "fa-calculator",
        color: "#7c3aed",
        
        flashcards: [
            {
                question: "What is a budget?",
                answer: "A budget is a formal written financial plan that expresses management's expectations for revenues, expenses, and profits for a future period.",
                explanation: "Budgets guide business operations and planning."
            },
            {
                question: "What are the advantages of budgeting?",
                answer: "Budgeting advantages:\n• Provides a plan for future operations\n• Improves coordination and communication\n• Helps control costs and expenses\n• Serves as a standard for performance evaluation\n• Encourages management discipline",
                explanation: "Budgeting is essential for business success."
            },
            {
                question: "Why can predicting sales be difficult?",
                answer: "Sales prediction is difficult due to uncertain factors:\n• Economic conditions\n• Competition\n• Consumer behavior\n• Seasonality\n• Pricing changes\n• Unexpected events",
                explanation: "Many external factors affect sales."
            },
            {
                question: "What is sales forecasting?",
                answer: "Sales forecasting is the process of estimating future sales revenue for a given period. It forms the foundation for budgeting, staffing, purchasing, pricing, and profit planning.",
                explanation: "Everything starts with sales forecasting."
            },
            {
                question: "What factors should be considered in forecasting sales for a new business?",
                answer: "Factors include:\n• Market size and demand\n• Location\n• Target customers\n• Competition\n• Pricing strategy\n• Management experience\n• Economic conditions\n• Marketing plans",
                explanation: "New businesses face more uncertainty."
            },
            {
                question: "What is the formula for forecasting room sales?",
                answer: "Room Sales = Number of Available Rooms × Occupancy Percentage × Average Room Rate (ADR)",
                explanation: "Key formula for hotel revenue forecasting."
            },
            {
                question: "What is the formula for forecasting food sales?",
                answer: "Food Sales = Number of Seats × Turnover × Average Check",
                explanation: "Key formula for restaurant revenue forecasting."
            },
            {
                question: "What three kinds of expenses are closely related to sales?",
                answer: "1. Food cost\n2. Labor cost\n3. Other variable operating expenses",
                explanation: "These expenses change with sales volume."
            },
            {
                question: "What is the total cost equation?",
                answer: "Total Cost = Fixed Costs + Variable Costs",
                explanation: "Fundamental cost accounting equation."
            },
            {
                question: "What is a variable expense?",
                answer: "A variable expense changes directly in proportion to sales volume. Examples: food cost, beverage cost, commissions.",
                explanation: "More sales = more variable costs."
            },
            {
                question: "What is a fixed expense?",
                answer: "A fixed expense remains constant regardless of sales volume within a relevant range. Examples: rent, insurance, management salaries.",
                explanation: "Fixed costs don't change with sales."
            },
            {
                question: "What is a semi-variable expense?",
                answer: "A semi-variable expense contains both fixed and variable components. Example: utilities (base charge + usage).",
                explanation: "Part fixed, part variable."
            },
            {
                question: "What is the difference between breakeven and breakeven point?",
                answer: "Breakeven is the condition where total revenues equal total costs (zero profit/loss).\n\nBreakeven point is the specific level of sales or volume at which breakeven occurs.",
                explanation: "Condition vs. specific level."
            },
            {
                question: "What is the breakeven point formula?",
                answer: "Breakeven Point (in sales) = Fixed Costs ÷ Contribution Margin Ratio\n\nOR\n\nBreakeven Point (in units) = Fixed Costs ÷ Contribution Margin per Unit",
                explanation: "Two ways to calculate breakeven."
            },
            // ===== DODATNE FLASHCARDS =====
            {
                question: "What is Contribution Margin?",
                answer: "Contribution Margin = Sales Revenue − Variable Costs\n\nIt's the amount that 'contributes' to covering fixed costs and generating profit.\n\nCM Ratio = Contribution Margin ÷ Sales Revenue",
                explanation: "Key concept for CVP analysis."
            },
            {
                question: "What is Margin of Safety?",
                answer: "Margin of Safety = Actual Sales − Breakeven Sales\n\nIt measures how much sales can drop before the company reaches breakeven (starts losing money).\n\nMargin of Safety % = (Actual Sales − Breakeven) ÷ Actual Sales",
                explanation: "Higher margin of safety = lower risk."
            },
            {
                question: "What is Operating Leverage?",
                answer: "Operating Leverage measures how sensitive operating income is to changes in sales.\n\nDegree of Operating Leverage = Contribution Margin ÷ Operating Income\n\nHigh operating leverage = high fixed costs = greater risk but greater reward",
                explanation: "High leverage amplifies both profits and losses."
            },
            {
                question: "What is CVP Analysis?",
                answer: "CVP (Cost-Volume-Profit) Analysis examines the relationship between:\n• Costs (fixed and variable)\n• Volume (sales quantity)\n• Profit\n\nUsed for pricing, product mix, and break-even decisions.",
                explanation: "Essential management accounting tool."
            },
            {
                question: "What is a Flexible Budget?",
                answer: "A flexible budget adjusts for changes in activity level, showing expected costs at various volumes.\n\nUnlike a static budget, it recognizes that costs change with sales volume.\n\nUseful for performance evaluation - compare actual results to budgeted amounts at actual activity level.",
                explanation: "More realistic than static budgets."
            },
            {
                question: "What is the High-Low Method?",
                answer: "The High-Low Method separates fixed and variable costs using the highest and lowest activity levels:\n\nVariable Cost per Unit = (High Cost − Low Cost) ÷ (High Activity − Low Activity)\n\nFixed Costs = Total Cost − (Variable Cost × Activity Level)",
                explanation: "Simple method to analyze mixed costs."
            }
        ],
        
        quiz: [
            {
                question: "A budget is:",
                options: ["Past financial records", "A formal financial plan for the future", "Tax returns", "Bank statements"],
                correct: 1
            },
            {
                question: "The formula for Room Sales is:",
                options: ["Rooms × Rate", "Available Rooms × Occupancy % × ADR", "Guests × Rate", "Revenue ÷ Rooms"],
                correct: 1
            },
            {
                question: "The formula for Food Sales is:",
                options: ["Food Cost × Markup", "Seats × Turnover × Average Check", "Menu Items × Price", "Customers ÷ Days"],
                correct: 1
            },
            {
                question: "Total Cost equals:",
                options: ["Fixed Costs only", "Variable Costs only", "Fixed Costs + Variable Costs", "Revenue - Profit"],
                correct: 2
            },
            {
                question: "A variable expense:",
                options: ["Stays constant", "Changes with sales volume", "Is always the same", "Never changes"],
                correct: 1
            },
            {
                question: "A fixed expense:",
                options: ["Changes with sales", "Remains constant regardless of sales", "Is always variable", "Depends on weather"],
                correct: 1
            },
            {
                question: "Breakeven Point (in sales) equals:",
                options: ["Revenue ÷ Costs", "Fixed Costs ÷ Contribution Margin Ratio", "Variable Costs × Sales", "Profit + Loss"],
                correct: 1
            },
            {
                question: "Which is NOT closely related to sales?",
                options: ["Food cost", "Labor cost", "Rent expense", "Variable operating expenses"],
                correct: 2
            },
            {
                question: "A semi-variable expense contains:",
                options: ["Only fixed components", "Only variable components", "Both fixed and variable components", "No cost components"],
                correct: 2
            },
            {
                question: "Sales forecasting is difficult because of:",
                options: ["Certain market conditions", "Predictable consumer behavior", "Uncertain external factors", "Stable competition"],
                correct: 2
            },
            // ===== DODATNI QUIZ =====
            {
                question: "Contribution Margin equals:",
                options: ["Fixed Costs + Variable Costs", "Sales Revenue − Variable Costs", "Net Income + Taxes", "Total Revenue"],
                correct: 1
            },
            {
                question: "Margin of Safety measures:",
                options: ["Total profit", "How much sales can drop before breakeven", "Fixed costs only", "Variable costs only"],
                correct: 1
            },
            {
                question: "High Operating Leverage means:",
                options: ["Low risk, low reward", "High fixed costs, greater profit sensitivity", "No fixed costs", "Only variable costs"],
                correct: 1
            },
            {
                question: "CVP Analysis examines the relationship between:",
                options: ["Only costs", "Costs, Volume, and Profit", "Only revenue", "Only expenses"],
                correct: 1
            },
            {
                question: "The High-Low Method is used to:",
                options: ["Calculate revenue", "Separate fixed and variable costs", "Determine selling price", "Calculate taxes"],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "Total Cost = Fixed Costs + _______ Costs",
                answer: "Variable",
                hint: "Costs that change..."
            },
            {
                sentence: "Room Sales = Available Rooms × Occupancy % × _______",
                answer: "ADR",
                hint: "Average Daily..."
            },
            {
                sentence: "Food Sales = Seats × Turnover × Average _______",
                answer: "Check",
                hint: "What customers pay..."
            },
            {
                sentence: "Breakeven Point = Fixed Costs ÷ Contribution Margin _______",
                answer: "Ratio",
                hint: "Percentage..."
            },
            {
                sentence: "A _______ expense contains both fixed and variable components.",
                answer: "semi-variable",
                hint: "Part fixed, part..."
            },
            // ===== DODATNI FILL BLANKS =====
            {
                sentence: "Contribution Margin = Sales Revenue − _______ Costs",
                answer: "Variable",
                hint: "Costs that change with volume..."
            },
            {
                sentence: "Margin of _______ measures how much sales can drop before breakeven.",
                answer: "Safety",
                hint: "Protection, security..."
            },
            {
                sentence: "_______ Leverage measures sensitivity of income to sales changes.",
                answer: "Operating",
                hint: "Related to operations..."
            },
            {
                sentence: "CVP stands for Cost-_______-Profit analysis.",
                answer: "Volume",
                hint: "Quantity, amount..."
            },
            {
                sentence: "The High-_______ Method separates fixed and variable costs.",
                answer: "Low",
                hint: "Opposite of high..."
            }
        ],
        
        learn: {
            title: "Budgeting, Forecasting & Cost Analysis",
            content: `
                <h3>📚 Chapter Overview: Budgeting & Cost Analysis</h3>
                
                <div class="tip-box" style="text-align: center; background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(124, 58, 237, 0.2)); border-left-color: #7c3aed;">
                    <h4 style="color: #7c3aed; font-size: 1.2rem;">📊 CVP Analysis = Cost-Volume-Profit</h4>
                    <p style="margin: 0;">Understanding the relationship between costs, sales volume, and profit</p>
                </div>
                
                <p>This chapter covers budgeting fundamentals, sales forecasting, cost behavior, and Cost-Volume-Profit (CVP) analysis - essential tools for hospitality management.</p>
                
                <hr>
                
                <h4>📋 What is a Budget?</h4>
                <p>A <strong>budget</strong> is a formal written financial plan that expresses management's expectations for revenues, expenses, and profits for a future period.</p>
                
                <h5>Advantages of Budgeting:</h5>
                <ul>
                    <li>Provides a plan and direction for operations</li>
                    <li>Improves coordination between departments</li>
                    <li>Helps control costs and evaluate performance</li>
                    <li>Encourages efficient use of resources</li>
                    <li>Assists in decision-making</li>
                </ul>
                
                <div class="warning-box">
                    <h4>⚠️ Why Budgeting is Difficult:</h4>
                    <p>Sales prediction is affected by uncertain factors: economic conditions, competition, consumer behavior, seasonality, pricing changes, and unexpected events.</p>
                </div>
                
                <hr>
                
                <h4>🔮 Sales Forecasting</h4>
                <p><strong>Sales forecasting</strong> is the process of estimating future sales revenue. It forms the foundation for all other budgeting activities.</p>
                
                <div class="formula-box">
                    <strong>Key Forecasting Formulas:</strong><br><br>
                    
                    <strong>ROOM SALES:</strong><br>
                    Room Sales = Available Rooms × Occupancy % × ADR<br><br>
                    
                    <strong>FOOD SALES:</strong><br>
                    Food Sales = Seats × Turnover × Average Check
                </div>
                
                <div class="example-box">
                    <h4>📝 Example: Hotel Room Sales Forecast</h4>
                    <p>A hotel has 200 rooms, expects 75% occupancy, ADR of $150:</p>
                    <p>Daily Room Sales = 200 × 0.75 × $150 = <strong>$22,500</strong></p>
                    <p>Monthly (30 days) = $22,500 × 30 = <strong>$675,000</strong></p>
                </div>
                
                <div class="example-box">
                    <h4>📝 Example: Restaurant Sales Forecast</h4>
                    <p>Restaurant has 100 seats, 2.5 turns per meal, $35 average check:</p>
                    <p>Sales per Meal Period = 100 × 2.5 × $35 = <strong>$8,750</strong></p>
                </div>
                
                <hr>
                
                <h4>💰 Cost Behavior</h4>
                <p>Understanding how costs behave is essential for budgeting and decision-making.</p>
                
                <div class="formula-box">
                    <strong>Total Cost Equation:</strong><br>
                    Total Cost = Fixed Costs + Variable Costs<br><br>
                    
                    Or: TC = FC + (VC per unit × Volume)
                </div>
                
                <h5>Types of Costs:</h5>
                <table style="width:100%; border-collapse: collapse; margin: 15px 0;">
                    <tr style="background: rgba(99,102,241,0.2);">
                        <th style="padding: 10px; border: 1px solid #ccc;">Type</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Behavior</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Examples</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;"><strong>Variable</strong></td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Changes proportionally with sales</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Food cost, beverage cost, commissions</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;"><strong>Fixed</strong></td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Stays constant regardless of sales</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Rent, insurance, management salaries</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;"><strong>Semi-variable</strong></td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Has both fixed and variable components</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Utilities, telephone, maintenance</td>
                    </tr>
                </table>
                
                <h5>Three Expenses Closely Related to Sales:</h5>
                <ol>
                    <li><strong>Food Cost</strong> - varies directly with food sales</li>
                    <li><strong>Labor Cost</strong> - varies with business volume</li>
                    <li><strong>Other Variable Operating Expenses</strong></li>
                </ol>
                
                <hr>
                
                <h4>📊 CVP Analysis (Cost-Volume-Profit)</h4>
                <p>CVP analysis examines the relationship between costs, sales volume, and profit. It's used for pricing decisions, product mix, and break-even analysis.</p>
                
                <div class="formula-box">
                    <strong>Key CVP Formulas:</strong><br><br>
                    
                    <strong>Contribution Margin (CM):</strong><br>
                    CM = Sales Revenue − Variable Costs<br><br>
                    
                    <strong>CM per Unit:</strong><br>
                    CM per Unit = Selling Price − Variable Cost per Unit<br><br>
                    
                    <strong>CM Ratio:</strong><br>
                    CM Ratio = CM ÷ Sales Revenue
                </div>
                
                <div class="example-box">
                    <h4>📝 Example: Contribution Margin</h4>
                    <p>Hotel room sells for $200, variable cost per room is $40:</p>
                    <p>CM per Unit = $200 − $40 = <strong>$160</strong></p>
                    <p>CM Ratio = $160 ÷ $200 = <strong>80%</strong></p>
                    <p>This means 80 cents of every dollar contributes to covering fixed costs and profit!</p>
                </div>
                
                <hr>
                
                <h4>⚖️ Breakeven Analysis</h4>
                
                <div class="example-box" style="text-align: center;">
                    <h4 style="margin-top: 0;">📈 Break-Even Point</h4>
                    <p style="font-size: 1.1rem; margin: 0;"><strong>Total Revenue = Total Costs</strong></p>
                    <p style="margin: 5px 0 0 0; color: #666;">No profit, no loss - the starting point for profitability!</p>
                </div>
                
                <p><strong>Breakeven</strong> is the condition where Total Revenue = Total Costs (zero profit/loss).</p>
                <p><strong>Breakeven Point</strong> is the specific sales level where breakeven occurs.</p>
                
                <div class="formula-box">
                    <strong>Breakeven Formulas:</strong><br><br>
                    
                    <strong>In Sales Dollars:</strong><br>
                    BE Point = Fixed Costs ÷ CM Ratio<br><br>
                    
                    <strong>In Units:</strong><br>
                    BE Point = Fixed Costs ÷ CM per Unit
                </div>
                
                <div class="example-box">
                    <h4>📝 Example: Breakeven Calculation</h4>
                    <p>Hotel has Fixed Costs of $500,000, CM Ratio of 80%:</p>
                    <p>Breakeven = $500,000 ÷ 0.80 = <strong>$625,000 in sales</strong></p>
                    <p>The hotel needs $625,000 in revenue just to cover all costs!</p>
                </div>
                
                <hr>
                
                <h4>🛡️ Margin of Safety</h4>
                <p>Measures how much sales can drop before reaching breakeven.</p>
                
                <div class="formula-box">
                    <strong>Margin of Safety:</strong><br>
                    MOS = Actual Sales − Breakeven Sales<br><br>
                    MOS % = (Actual Sales − Breakeven) ÷ Actual Sales
                </div>
                
                <div class="example-box">
                    <h4>📝 Example: Margin of Safety</h4>
                    <p>Actual Sales = $800,000, Breakeven = $625,000:</p>
                    <p>MOS = $800,000 − $625,000 = <strong>$175,000</strong></p>
                    <p>MOS % = $175,000 ÷ $800,000 = <strong>21.9%</strong></p>
                    <p>Sales can drop 21.9% before the hotel starts losing money!</p>
                </div>
                
                <hr>
                
                <h4>⚡ Operating Leverage</h4>
                <p>Measures how sensitive operating income is to changes in sales.</p>
                
                <div class="formula-box">
                    <strong>Degree of Operating Leverage:</strong><br>
                    DOL = Contribution Margin ÷ Operating Income
                </div>
                
                <p><strong>High Operating Leverage</strong> = High fixed costs = Greater risk BUT greater reward potential</p>
                <p><strong>Low Operating Leverage</strong> = High variable costs = Lower risk BUT lower profit potential</p>
                
                <hr>
                
                <h4>📈 The High-Low Method</h4>
                <p>A simple technique to separate mixed costs into fixed and variable components.</p>
                
                <div class="formula-box">
                    <strong>High-Low Method Steps:</strong><br><br>
                    
                    <strong>Step 1:</strong> Variable Cost per Unit =<br>
                    (Highest Cost − Lowest Cost) ÷ (Highest Activity − Lowest Activity)<br><br>
                    
                    <strong>Step 2:</strong> Fixed Costs =<br>
                    Total Cost − (Variable Cost × Activity Level)
                </div>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Key Takeaways</h4>
                    <ul>
                        <li>Room Sales = Rooms × Occupancy × ADR</li>
                        <li>Food Sales = Seats × Turnover × Avg Check</li>
                        <li>Total Cost = Fixed + Variable</li>
                        <li>Contribution Margin = Sales − Variable Costs</li>
                        <li>Breakeven = Fixed Costs ÷ CM Ratio</li>
                        <li>Margin of Safety = Actual − Breakeven</li>
                        <li>Higher leverage = higher risk AND higher potential reward</li>
                    </ul>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 3: SEC & ANNUAL REPORTS ==========
    secReports: {
        name: "SEC & Annual Reports",
        icon: "fa-building-columns",
        color: "#dc2626",
        
        flashcards: [
            {
                question: "What two types of annual reports does the SEC require?",
                answer: "1. Form 10-K: Detailed annual report filed with the SEC\n\n2. Annual Report to Shareholders: More summarized and reader-friendly report",
                explanation: "Two different reports for different audiences."
            },
            {
                question: "What kind of agency is the SEC and what is its primary mission?",
                answer: "The SEC is a federal government regulatory agency.\n\nPrimary mission:\n• Protect investors\n• Maintain fair and efficient markets\n• Ensure full and fair disclosure of financial information",
                explanation: "SEC = Securities and Exchange Commission."
            },
            {
                question: "What is the significance of October 1929?",
                answer: "October 1929 marks the stock market crash, which led to the Great Depression and exposed serious weaknesses in financial reporting and market regulation.",
                explanation: "This crash led to creation of the SEC."
            },
            {
                question: "Why was the SEC created?",
                answer: "The SEC was created to:\n• Restore investor confidence\n• Prevent fraud and market manipulation\n• Regulate the securities markets\n\nFollowing the 1929 stock market crash.",
                explanation: "Response to the Great Depression."
            },
            {
                question: "What is the importance of the Sarbanes-Oxley Act of 2002 (SOX)?",
                answer: "SOX was enacted to:\n• Increase corporate accountability\n• Improve financial reporting accuracy\n• Strengthen internal controls\n\nIn response to corporate scandals like Enron and WorldCom.",
                explanation: "Major reform of corporate governance."
            },
            {
                question: "What do the key sections of Sarbanes-Oxley cover?",
                answer: "Section 302: Management certification of financial statements\nSection 401: Disclosure of off-balance-sheet items\nSection 404: Management assessment of internal controls\nSection 409: Real-time disclosure of material changes\nSection 802: Criminal penalties for altering/destroying records",
                explanation: "Know these section numbers and their purposes."
            },
            {
                question: "What is a 10-K report?",
                answer: "A 10-K is a comprehensive annual filing to the SEC including:\n• Audited financial statements\n• Management discussion and analysis\n• Risk factors\n• Detailed disclosures about operations and finances",
                explanation: "The most detailed annual report."
            },
            {
                question: "What four types of audit opinions can a CPA firm give?",
                answer: "1. Unqualified opinion (clean opinion)\n2. Qualified opinion (with exceptions)\n3. Adverse opinion (statements not fairly presented)\n4. Disclaimer of opinion (unable to form opinion)",
                explanation: "Unqualified is the best; adverse is the worst."
            },
            {
                question: "What are consolidated financial statements?",
                answer: "Consolidated financial statements combine the financial results of a parent company and its subsidiaries into a single set of statements as if they were one economic entity.",
                explanation: "Parent + subsidiaries = one report."
            },
            {
                question: "What are notes to financial statements and what do they include?",
                answer: "Notes provide additional information to understand financial statements.\n\nMinimum content:\n• Summary of significant accounting policies\n• Detailed explanations of major accounts\n• Information on contingencies and commitments",
                explanation: "Notes are essential for full disclosure."
            },
            {
                question: "What is the standard content of an annual report to shareholders?",
                answer: "Standard content includes:\n• Letter from management\n• Financial statements\n• Notes to financial statements\n• Auditor's report\n• Management's Discussion and Analysis (MD&A)",
                explanation: "All key components of the annual report."
            },
            // ===== DODATNE FLASHCARDS =====
            {
                question: "What is the Securities Act of 1933?",
                answer: "The Securities Act of 1933 (the 'Truth in Securities' Act) requires:\n• Registration of new securities with SEC\n• Full disclosure via prospectus\n• Accurate information to investors before purchase\n\nFocus: PRIMARY market (new issues)",
                explanation: "Regulates new securities offerings."
            },
            {
                question: "What is the Securities Exchange Act of 1934?",
                answer: "The Securities Exchange Act of 1934:\n• Created the SEC\n• Regulates secondary trading of securities\n• Requires ongoing periodic reporting (10-K, 10-Q)\n• Regulates stock exchanges and broker-dealers\n\nFocus: SECONDARY market (trading)",
                explanation: "Regulates ongoing trading and reporting."
            },
            {
                question: "What is PCAOB?",
                answer: "PCAOB = Public Company Accounting Oversight Board\n\nCreated by SOX 2002 to:\n• Oversee audits of public companies\n• Establish auditing standards\n• Inspect CPA firms\n• Enforce compliance\n\nReplaced self-regulation by accounting profession.",
                explanation: "Independent auditor oversight body."
            },
            {
                question: "What is Materiality in auditing?",
                answer: "Materiality is the threshold above which an omission or misstatement would influence a user's decision.\n\nAuditors focus on material items because:\n• Not practical to examine everything\n• Small errors unlikely to affect decisions\n• Cost-benefit consideration",
                explanation: "Significant enough to matter to users."
            },
            {
                question: "What is the difference between 10-K and 10-Q?",
                answer: "10-K: Annual report\n• Audited financial statements\n• Filed within 60-90 days of fiscal year end\n• Comprehensive disclosure\n\n10-Q: Quarterly report\n• Unaudited financial statements\n• Filed within 40-45 days of quarter end\n• Less detailed than 10-K",
                explanation: "Annual vs quarterly SEC filings."
            }
        ],
        
        quiz: [
            {
                question: "The SEC is a:",
                options: ["Private company", "Federal regulatory agency", "State agency", "Non-profit organization"],
                correct: 1
            },
            {
                question: "October 1929 is significant because of the:",
                options: ["World War I", "Stock market crash", "SEC creation", "First audit"],
                correct: 1
            },
            {
                question: "SOX Section 404 covers:",
                options: ["Criminal penalties", "Real-time disclosure", "Management assessment of internal controls", "Off-balance-sheet items"],
                correct: 2
            },
            {
                question: "SOX Section 302 requires:",
                options: ["Internal control assessment", "Management certification of financial statements", "Criminal penalties", "Real-time disclosure"],
                correct: 1
            },
            {
                question: "SOX Section 802 deals with:",
                options: ["Financial statements", "Criminal penalties for altering records", "Disclosure requirements", "Certification"],
                correct: 1
            },
            {
                question: "The best audit opinion is:",
                options: ["Qualified", "Adverse", "Unqualified", "Disclaimer"],
                correct: 2
            },
            {
                question: "A 10-K report is filed with the:",
                options: ["IRS", "SEC", "State government", "Local bank"],
                correct: 1
            },
            {
                question: "Consolidated financial statements combine:",
                options: ["All competitors", "Parent and subsidiaries", "All suppliers", "Government agencies"],
                correct: 1
            },
            {
                question: "How many types of audit opinions are there?",
                options: ["2", "3", "4", "5"],
                correct: 2
            },
            {
                question: "The SEC's primary mission includes:",
                options: ["Increasing company profits", "Protecting investors", "Reducing taxes", "Creating jobs"],
                correct: 1
            },
            // ===== DODATNI QUIZ =====
            {
                question: "The Securities Act of 1933 regulates:",
                options: ["Secondary market trading", "New securities offerings (primary market)", "Tax collection", "Employee benefits"],
                correct: 1
            },
            {
                question: "PCAOB was created by:",
                options: ["Securities Act of 1933", "Securities Act of 1934", "Sarbanes-Oxley Act of 2002", "GAAP"],
                correct: 2
            },
            {
                question: "10-Q reports are filed:",
                options: ["Annually", "Quarterly", "Monthly", "Weekly"],
                correct: 1
            },
            {
                question: "Materiality refers to:",
                options: ["Physical materials", "Threshold affecting user decisions", "Company size", "Number of employees"],
                correct: 1
            },
            {
                question: "The Securities Exchange Act of 1934:",
                options: ["Only regulates new issues", "Created the SEC and regulates secondary trading", "Was repealed by SOX", "Only applies to banks"],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "The stock market crash of October _______ led to the creation of the SEC.",
                answer: "1929",
                hint: "Year of the Great Depression start..."
            },
            {
                sentence: "SOX Section _______ covers management certification of financial statements.",
                answer: "302",
                hint: "Three-oh-two..."
            },
            {
                sentence: "SOX Section _______ covers management assessment of internal controls.",
                answer: "404",
                hint: "Like the error code..."
            },
            {
                sentence: "An _______ opinion is the best type of audit opinion.",
                answer: "unqualified",
                hint: "Clean, without exceptions..."
            },
            {
                sentence: "The _______ report is a comprehensive annual filing to the SEC.",
                answer: "10-K",
                hint: "Ten-..."
            },
            // ===== DODATNI FILL BLANKS =====
            {
                sentence: "The Securities Act of _______ regulates new securities offerings.",
                answer: "1933",
                hint: "Nineteen thirty-three..."
            },
            {
                sentence: "_______ was created by SOX to oversee audits of public companies.",
                answer: "PCAOB",
                hint: "Public Company Accounting..."
            },
            {
                sentence: "10-Q reports are filed _______ (how often).",
                answer: "quarterly",
                hint: "Every three months..."
            },
            {
                sentence: "_______ is the threshold above which misstatements affect user decisions.",
                answer: "Materiality",
                hint: "Significance, importance..."
            }
        ],
        
        learn: {
            title: "SEC, Annual Reports & Audits",
            content: `
                <h3>📚 Chapter Overview: SEC, Annual Reports & Audits</h3>
                
                <div class="warning-box" style="text-align: center; background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.2)); border-left-color: #6366f1;">
                    <h4 style="color: #6366f1; font-size: 1.3rem;">🏛️ SEC - Securities and Exchange Commission</h4>
                    <p style="margin: 0;">Federal regulatory agency protecting investors since 1934</p>
                </div>
                
                <p>This chapter covers the regulatory framework for financial reporting, including the SEC, securities laws, Sarbanes-Oxley Act, and the audit process.</p>
                
                <hr>
                
                <h4>📜 Historical Background</h4>
                
                <div class="warning-box">
                    <h4>⚠️ October 1929: The Stock Market Crash</h4>
                    <p>The crash led to the Great Depression and exposed serious weaknesses in financial reporting and market regulation. Investors lost confidence due to fraud and manipulation.</p>
                </div>
                
                <h5>Timeline of Securities Regulation:</h5>
                <ul>
                    <li><strong>1929:</strong> Stock market crash</li>
                    <li><strong>1933:</strong> Securities Act (regulates NEW securities)</li>
                    <li><strong>1934:</strong> Securities Exchange Act (creates SEC, regulates TRADING)</li>
                    <li><strong>2002:</strong> Sarbanes-Oxley Act (response to Enron/WorldCom scandals)</li>
                </ul>
                
                <hr>
                
                <h4>🏛️ The SEC (Securities and Exchange Commission)</h4>
                <p>A <strong>federal government regulatory agency</strong> with three primary missions:</p>
                <ol>
                    <li><strong>Protect investors</strong></li>
                    <li><strong>Maintain fair, orderly, and efficient markets</strong></li>
                    <li><strong>Facilitate capital formation</strong></li>
                </ol>
                
                <hr>
                
                <h4>📋 Key Securities Laws</h4>
                
                <div class="formula-box">
                    <strong>Securities Act of 1933</strong> ("Truth in Securities")<br>
                    • Regulates PRIMARY market (new securities offerings)<br>
                    • Requires registration of new securities<br>
                    • Requires prospectus with full disclosure<br>
                    • Focus: BEFORE securities are sold
                </div>
                
                <div class="formula-box">
                    <strong>Securities Exchange Act of 1934</strong><br>
                    • Created the SEC<br>
                    • Regulates SECONDARY market (trading)<br>
                    • Requires ongoing periodic reporting (10-K, 10-Q, 8-K)<br>
                    • Regulates stock exchanges and broker-dealers<br>
                    • Focus: AFTER securities are sold
                </div>
                
                <hr>
                
                <h4>⚖️ Sarbanes-Oxley Act of 2002 (SOX)</h4>
                
                <div class="warning-box" style="text-align: center;">
                    <h4 style="font-size: 1.2rem;">⚠️ SOX 2002 - Response to Corporate Scandals</h4>
                    <p style="margin: 0;">Enron • WorldCom • Tyco → Increased corporate accountability</p>
                </div>
                
                <p>Enacted in response to corporate scandals (Enron, WorldCom, Tyco) to increase corporate accountability and improve financial reporting.</p>
                
                <div class="formula-box">
                    <strong>Key SOX Sections - MEMORIZE THESE:</strong><br><br>
                    
                    <strong>Section 302:</strong> Management Certification<br>
                    CEO and CFO must personally certify financial statements are accurate<br><br>
                    
                    <strong>Section 401:</strong> Off-Balance-Sheet Disclosure<br>
                    Must disclose all material off-balance-sheet transactions<br><br>
                    
                    <strong>Section 404:</strong> Internal Control Assessment ⭐<br>
                    Management must assess and report on internal controls; auditors must attest<br><br>
                    
                    <strong>Section 409:</strong> Real-Time Disclosure<br>
                    Material changes must be disclosed rapidly<br><br>
                    
                    <strong>Section 802:</strong> Criminal Penalties<br>
                    Up to 20 years for altering/destroying records
                </div>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Memory Tip!</h4>
                    <p><strong>302</strong> = Certification (CEO/CFO sign off)</p>
                    <p><strong>404</strong> = Controls (like 404 error - something's broken!)</p>
                    <p><strong>802</strong> = Criminal (8 = handcuffs shape!)</p>
                </div>
                
                <h5>PCAOB (Public Company Accounting Oversight Board)</h5>
                <p>Created by SOX to oversee audits of public companies:</p>
                <ul>
                    <li>Establishes auditing standards</li>
                    <li>Inspects CPA firms</li>
                    <li>Enforces compliance</li>
                    <li>Replaced self-regulation by accounting profession</li>
                </ul>
                
                <hr>
                
                <h4>📊 Annual Reports</h4>
                
                <h5>Two Types Required by SEC:</h5>
                <table style="width:100%; border-collapse: collapse; margin: 15px 0;">
                    <tr style="background: rgba(220,38,38,0.2);">
                        <th style="padding: 10px; border: 1px solid #ccc;">Form 10-K</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Annual Report to Shareholders</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;">Filed with SEC</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Given to shareholders</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;">Detailed, technical</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Reader-friendly, summarized</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;">Audited financial statements</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Audited financial statements</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;">Extensive disclosures, risk factors</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Letter from CEO, highlights</td>
                    </tr>
                </table>
                
                <h5>Standard Content of Annual Report:</h5>
                <ul>
                    <li>Letter from management</li>
                    <li>Financial statements</li>
                    <li>Notes to financial statements</li>
                    <li>Auditor's report</li>
                    <li>Management's Discussion and Analysis (MD&A)</li>
                </ul>
                
                <h5>Other SEC Filings:</h5>
                <ul>
                    <li><strong>10-Q:</strong> Quarterly report (unaudited)</li>
                    <li><strong>8-K:</strong> Current report for material events</li>
                    <li><strong>Proxy Statement:</strong> For shareholder meetings</li>
                </ul>
                
                <hr>
                
                <h4>🔍 The Audit Process</h4>
                
                <h5>Four Types of Audit Opinions:</h5>
                <div class="formula-box">
                    <strong>1. Unqualified Opinion</strong> (Clean Opinion) ✅<br>
                    Best outcome - statements fairly presented in all material respects<br><br>
                    
                    <strong>2. Qualified Opinion</strong> ⚠️<br>
                    Good EXCEPT for specific issue(s) - "except for" language<br><br>
                    
                    <strong>3. Adverse Opinion</strong> ❌<br>
                    Statements are NOT fairly presented - material misstatements<br><br>
                    
                    <strong>4. Disclaimer of Opinion</strong> 🚫<br>
                    Auditor cannot form an opinion - scope limitation
                </div>
                
                <h5>Audit vs Review vs Compilation:</h5>
                <table style="width:100%; border-collapse: collapse; margin: 15px 0;">
                    <tr style="background: rgba(220,38,38,0.2);">
                        <th style="padding: 10px; border: 1px solid #ccc;">Service</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Assurance Level</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Procedures</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;"><strong>Audit</strong></td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Highest</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Detailed testing, confirmations, inspection</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;"><strong>Review</strong></td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Limited</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Inquiry and analytical procedures</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;"><strong>Compilation</strong></td>
                        <td style="padding: 10px; border: 1px solid #ccc;">None</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Simply presents management's data</td>
                    </tr>
                </table>
                
                <h5>Materiality</h5>
                <p><strong>Materiality</strong> is the threshold above which an omission or misstatement would influence a user's decision. Auditors focus on material items because it's not practical to examine everything.</p>
                
                <h5>Consolidated Financial Statements</h5>
                <p>Combine the financial results of a parent company and its subsidiaries into a single set of statements, as if they were one economic entity.</p>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Key Takeaways</h4>
                    <ul>
                        <li>1929 crash → 1933 & 1934 Acts → SEC created</li>
                        <li>SOX 2002: Response to Enron/WorldCom scandals</li>
                        <li>Section 302 = CEO/CFO certification</li>
                        <li>Section 404 = Internal controls (most tested!)</li>
                        <li>Section 802 = Criminal penalties</li>
                        <li>Unqualified = BEST audit opinion</li>
                        <li>Audit > Review > Compilation (assurance level)</li>
                    </ul>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 4: ACCOUNTING CYCLE & ADJUSTMENTS ==========
    accountingCycle: {
        name: "Accounting Cycle",
        icon: "fa-rotate",
        color: "#0891b2",
        
        flashcards: [
            {
                question: "What is an accounting cycle?",
                answer: "The accounting cycle is the sequence of accounting procedures used to record, process, and report financial transactions during an accounting period, from initial transaction to preparation of financial statements and closing entries.",
                explanation: "The complete process of accounting."
            },
            {
                question: "What is cash basis accounting?",
                answer: "Cash basis accounting records revenues and expenses when cash is received or paid, regardless of when the transaction actually occurred.",
                explanation: "Simple method based on cash flow."
            },
            {
                question: "What is accrual basis accounting?",
                answer: "Accrual basis accounting records revenues when earned and expenses when incurred, regardless of when cash is received or paid.",
                explanation: "GAAP requires accrual basis for most businesses."
            },
            {
                question: "What is the posting procedure for special journals?",
                answer: "In special journals, individual transactions are not posted separately. Instead, column totals are posted periodically to the general ledger, reducing the number of postings required.",
                explanation: "Efficiency in recording transactions."
            },
            {
                question: "What is a working trial balance?",
                answer: "A working trial balance is an internal document that lists all account balances before adjustments.\n\nPurpose:\n• Verify debits equal credits\n• Provide basis for adjusting entries\n• Help prepare financial statements",
                explanation: "First step before adjustments."
            },
            {
                question: "What is the purpose of adjusting entries?",
                answer: "Adjusting entries ensure that revenues and expenses are recognized in the correct accounting period under accrual accounting.",
                explanation: "Match revenues with expenses."
            },
            {
                question: "What is the purpose of correcting entries?",
                answer: "Correcting entries are used to fix errors made in previously recorded transactions.",
                explanation: "Fix mistakes in the records."
            },
            {
                question: "What are typical adjustment areas for hospitality businesses at month end?",
                answer: "Typical adjustments include:\n• Accrued payroll\n• Inventory adjustments\n• Prepaid expenses\n• Depreciation\n• Unearned revenues\n• Accrued expenses",
                explanation: "Common end-of-period adjustments."
            },
            {
                question: "Why adjust Cost of Food Sales after storeroom issues are recorded?",
                answer: "Because storeroom issues represent actual usage, adjustments ensure that Cost of Food Sales reflects the true cost of food consumed, not just purchased.",
                explanation: "Match actual consumption to the period."
            },
            {
                question: "Why does a business have unpaid payroll on payday?",
                answer: "Because employees earn wages up to the end of the pay period, but payment may occur later, creating accrued payroll expense that has not yet been paid.",
                explanation: "Timing difference between earning and paying."
            },
            {
                question: "What does the computerized year-end process accomplish?",
                answer: "The year-end process:\n• Automatically posts closing entries\n• Resets temporary accounts to zero\n• Transfers net income/loss to retained earnings",
                explanation: "Prepares accounts for the new year."
            },
            {
                question: "What does the post-closing trial balance signify?",
                answer: "Post-closing trial balance confirms:\n• Only permanent accounts remain open\n• Debits equal credits\n• The ledger is ready for the next accounting period",
                explanation: "Final verification before new period."
            },
            // ===== DODATNE FLASHCARDS =====
            {
                question: "What are the 10 steps of the Accounting Cycle?",
                answer: "1. Analyze transactions\n2. Journalize in general/special journals\n3. Post to ledger\n4. Prepare working trial balance\n5. Journalize adjusting entries\n6. Post adjusting entries\n7. Prepare adjusted trial balance\n8. Prepare financial statements\n9. Journalize & post closing entries\n10. Prepare post-closing trial balance",
                explanation: "Complete cycle from transaction to closing."
            },
            {
                question: "What are the four types of Adjusting Entries?",
                answer: "1. Prepaid Expenses (Deferrals) - paid now, expense later\n2. Unearned Revenue (Deferrals) - received now, earn later\n3. Accrued Expenses - incurred but not yet paid\n4. Accrued Revenue - earned but not yet received\n\n+ Depreciation adjustments",
                explanation: "Deferrals and accruals are key categories."
            },
            {
                question: "What is the difference between Temporary and Permanent accounts?",
                answer: "TEMPORARY (Nominal):\n• Revenue, Expenses, Dividends\n• Closed to zero at year end\n• Start fresh each period\n\nPERMANENT (Real):\n• Assets, Liabilities, Equity\n• NOT closed\n• Balances carry forward",
                explanation: "Temporary accounts reset; permanent accounts continue."
            },
            {
                question: "What are the four types of Special Journals?",
                answer: "1. Sales Journal - credit sales only\n2. Purchases Journal - credit purchases only\n3. Cash Receipts Journal - all cash coming in\n4. Cash Disbursements Journal - all cash going out\n\nGeneral Journal - for everything else",
                explanation: "Special journals improve efficiency."
            },
            {
                question: "What is the Matching Principle?",
                answer: "The Matching Principle requires that expenses be recognized in the same period as the revenues they helped generate.\n\nExample: If you sell products in January, the cost of those products should be expensed in January, not when purchased or paid.",
                explanation: "Match expenses with related revenues."
            },
            {
                question: "What is the Revenue Recognition Principle?",
                answer: "Revenue should be recognized when:\n1. It is earned (goods delivered or services performed)\n2. It is realizable (payment is expected)\n\nNOT when cash is received (that's cash basis, not GAAP).",
                explanation: "Recognize revenue when earned, not when paid."
            }
        ],
        
        quiz: [
            {
                question: "Cash basis accounting records revenue when:",
                options: ["Earned", "Cash is received", "Invoiced", "Ordered"],
                correct: 1
            },
            {
                question: "Accrual basis accounting records revenue when:",
                options: ["Cash is received", "Earned", "Cash is paid", "Deposited"],
                correct: 1
            },
            {
                question: "A working trial balance is prepared:",
                options: ["After closing entries", "Before adjustments", "After financial statements", "At year end only"],
                correct: 1
            },
            {
                question: "Adjusting entries ensure:",
                options: ["Cash is correct", "Revenues and expenses are in the correct period", "Bank reconciliation", "Tax compliance"],
                correct: 1
            },
            {
                question: "Correcting entries are used to:",
                options: ["Adjust for timing", "Fix errors in recorded transactions", "Close accounts", "Post totals"],
                correct: 1
            },
            {
                question: "Which is a typical month-end adjustment?",
                options: ["Cash deposits", "Accrued payroll", "Sales transactions", "Customer orders"],
                correct: 1
            },
            {
                question: "The year-end process resets which accounts to zero?",
                options: ["Permanent accounts", "Temporary accounts", "All accounts", "Asset accounts"],
                correct: 1
            },
            {
                question: "The post-closing trial balance includes:",
                options: ["All accounts", "Only temporary accounts", "Only permanent accounts", "Only revenue accounts"],
                correct: 2
            },
            {
                question: "GAAP requires which accounting method?",
                options: ["Cash basis", "Accrual basis", "Either method", "Tax basis"],
                correct: 1
            },
            {
                question: "Special journals reduce posting by:",
                options: ["Eliminating all posts", "Posting column totals periodically", "Using only cash", "Avoiding journals"],
                correct: 1
            },
            // ===== DODATNI QUIZ =====
            {
                question: "How many steps are in the accounting cycle?",
                options: ["5", "8", "10", "12"],
                correct: 2
            },
            {
                question: "Prepaid expenses are an example of:",
                options: ["Accrued expense", "Deferral", "Closing entry", "Correcting entry"],
                correct: 1
            },
            {
                question: "Which accounts are closed at year end?",
                options: ["Assets", "Liabilities", "Temporary (Revenue, Expenses)", "All accounts"],
                correct: 2
            },
            {
                question: "The Matching Principle requires:",
                options: ["Cash payments match receipts", "Expenses match the revenues they generate", "Assets match liabilities", "Debits match credits"],
                correct: 1
            },
            {
                question: "Accrued expenses are:",
                options: ["Paid in advance", "Incurred but not yet paid", "Never recorded", "Cash only"],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "_______ basis accounting records revenue when cash is received.",
                answer: "Cash",
                hint: "Money in hand..."
            },
            {
                sentence: "_______ basis accounting records revenue when earned.",
                answer: "Accrual",
                hint: "When it happens, not when paid..."
            },
            {
                sentence: "_______ entries fix errors in previously recorded transactions.",
                answer: "Correcting",
                hint: "To fix mistakes..."
            },
            {
                sentence: "The year-end process resets _______ accounts to zero.",
                answer: "temporary",
                hint: "Revenue and expense accounts..."
            },
            {
                sentence: "The post-closing trial balance shows only _______ accounts.",
                answer: "permanent",
                hint: "Assets, liabilities, equity..."
            },
            // ===== DODATNI FILL BLANKS =====
            {
                sentence: "The accounting cycle has _______ steps.",
                answer: "ten",
                hint: "10..."
            },
            {
                sentence: "_______ expenses are paid in advance but expensed later.",
                answer: "Prepaid",
                hint: "Paid before used..."
            },
            {
                sentence: "The _______ Principle requires expenses to match related revenues.",
                answer: "Matching",
                hint: "Pairing up..."
            },
            {
                sentence: "_______ revenue is cash received before it is earned.",
                answer: "Unearned",
                hint: "Not yet earned..."
            },
            {
                sentence: "Revenue, expenses, and dividends are _______ accounts.",
                answer: "temporary",
                hint: "Closed each period..."
            }
        ],
        
        learn: {
            title: "Accounting Cycle and Adjustments",
            content: `
                <h3>📚 Chapter Overview: The Accounting Cycle</h3>
                
                <div class="tip-box" style="text-align: center; background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.2));">
                    <h4 style="font-size: 1.2rem;">🔄 The Accounting Cycle = 10 Steps</h4>
                    <p style="margin: 0;">From transactions → to financial statements → to closing</p>
                </div>
                
                <p>The accounting cycle is the complete sequence of procedures used to record, process, and report financial transactions during an accounting period.</p>
                
                <hr>
                
                <h4>📊 Two Accounting Methods</h4>
                
                <div class="formula-box">
                    <strong>Cash Basis Accounting:</strong><br>
                    • Record revenue when CASH IS RECEIVED<br>
                    • Record expense when CASH IS PAID<br>
                    • Simple but not GAAP compliant<br>
                    • Used by small businesses, individuals<br><br>
                    
                    <strong>Accrual Basis Accounting:</strong><br>
                    • Record revenue when EARNED<br>
                    • Record expense when INCURRED<br>
                    • Required by GAAP<br>
                    • Used by most businesses
                </div>
                
                <div class="example-box">
                    <h4>📝 Example: Cash vs Accrual</h4>
                    <p>Hotel provides room service on Dec 31, guest pays on Jan 5:</p>
                    <p><strong>Cash Basis:</strong> Record revenue in January (when paid)</p>
                    <p><strong>Accrual Basis:</strong> Record revenue in December (when earned)</p>
                </div>
                
                <hr>
                
                <h4>🔄 The 10 Steps of the Accounting Cycle</h4>
                
                <div class="formula-box">
                    <strong>Step 1:</strong> Analyze business transactions<br><br>
                    <strong>Step 2:</strong> Journalize transactions in journals<br><br>
                    <strong>Step 3:</strong> Post to the general ledger<br><br>
                    <strong>Step 4:</strong> Prepare working trial balance<br><br>
                    <strong>Step 5:</strong> Journalize adjusting entries<br><br>
                    <strong>Step 6:</strong> Post adjusting entries to ledger<br><br>
                    <strong>Step 7:</strong> Prepare adjusted trial balance<br><br>
                    <strong>Step 8:</strong> Prepare financial statements<br><br>
                    <strong>Step 9:</strong> Journalize and post closing entries<br><br>
                    <strong>Step 10:</strong> Prepare post-closing trial balance
                </div>
                
                <hr>
                
                <h4>📒 Types of Journals</h4>
                
                <h5>Special Journals (for efficiency):</h5>
                <ul>
                    <li><strong>Sales Journal:</strong> Credit sales only</li>
                    <li><strong>Purchases Journal:</strong> Credit purchases only</li>
                    <li><strong>Cash Receipts Journal:</strong> All cash received</li>
                    <li><strong>Cash Disbursements Journal:</strong> All cash paid out</li>
                </ul>
                
                <h5>General Journal:</h5>
                <p>For all transactions that don't fit in special journals (adjusting entries, correcting entries, unusual transactions).</p>
                
                <p><strong>Advantage of Special Journals:</strong> Column totals are posted periodically instead of posting each transaction separately - saves time!</p>
                
                <hr>
                
                <h4>📝 Types of Entries</h4>
                
                <h5>1. Adjusting Entries</h5>
                <p>Ensure revenues and expenses are recognized in the correct period (accrual basis).</p>
                
                <div class="formula-box">
                    <strong>4 Types of Adjusting Entries:</strong><br><br>
                    
                    <strong>DEFERRALS (paid/received now, recognize later):</strong><br>
                    • Prepaid Expenses - paid now, expense later<br>
                    &nbsp;&nbsp;Example: Prepaid insurance, prepaid rent<br><br>
                    • Unearned Revenue - received now, earn later<br>
                    &nbsp;&nbsp;Example: Advance deposits, gift cards<br><br>
                    
                    <strong>ACCRUALS (recognize now, pay/receive later):</strong><br>
                    • Accrued Expenses - incurred but not yet paid<br>
                    &nbsp;&nbsp;Example: Wages payable, utilities payable<br><br>
                    • Accrued Revenue - earned but not yet received<br>
                    &nbsp;&nbsp;Example: Interest receivable
                </div>
                
                <div class="example-box">
                    <h4>📝 Adjusting Entry Example: Prepaid Insurance</h4>
                    <p>Hotel paid $12,000 for 12 months insurance on Jan 1:</p>
                    <p>Monthly adjustment (expense $1,000):</p>
                    <p style="font-family: monospace;">
                    Dr. Insurance Expense &nbsp;&nbsp;&nbsp; $1,000<br>
                    &nbsp;&nbsp;&nbsp;Cr. Prepaid Insurance &nbsp;&nbsp;&nbsp; $1,000
                    </p>
                </div>
                
                <h5>2. Correcting Entries</h5>
                <p>Fix errors in previously recorded transactions.</p>
                
                <h5>3. Closing Entries</h5>
                <p>Reset temporary accounts to zero at year end.</p>
                
                <hr>
                
                <h4>📊 Temporary vs Permanent Accounts</h4>
                
                <table style="width:100%; border-collapse: collapse; margin: 15px 0;">
                    <tr style="background: rgba(8,145,178,0.2);">
                        <th style="padding: 10px; border: 1px solid #ccc;">Temporary (Nominal)</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Permanent (Real)</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;">Revenue accounts</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Asset accounts</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;">Expense accounts</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Liability accounts</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;">Dividends</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Equity accounts</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;"><strong>CLOSED</strong> at year end</td>
                        <td style="padding: 10px; border: 1px solid #ccc;"><strong>NOT CLOSED</strong> - carry forward</td>
                    </tr>
                </table>
                
                <hr>
                
                <h4>🔒 The Closing Process</h4>
                
                <div class="formula-box">
                    <strong>Closing Entries (in order):</strong><br><br>
                    <strong>1.</strong> Close Revenue accounts to Income Summary<br>
                    Dr. Revenue &nbsp;&nbsp;&nbsp; Cr. Income Summary<br><br>
                    
                    <strong>2.</strong> Close Expense accounts to Income Summary<br>
                    Dr. Income Summary &nbsp;&nbsp;&nbsp; Cr. Expenses<br><br>
                    
                    <strong>3.</strong> Close Income Summary to Retained Earnings<br>
                    (Net income or loss transferred)<br><br>
                    
                    <strong>4.</strong> Close Dividends to Retained Earnings<br>
                    Dr. Retained Earnings &nbsp;&nbsp;&nbsp; Cr. Dividends
                </div>
                
                <hr>
                
                <h4>⚖️ Key Accounting Principles</h4>
                
                <h5>Revenue Recognition Principle:</h5>
                <p>Recognize revenue when earned AND realizable (not when cash received).</p>
                
                <h5>Matching Principle:</h5>
                <p>Recognize expenses in the same period as the revenues they helped generate.</p>
                
                <hr>
                
                <h4>🏨 Hospitality-Specific Adjustments</h4>
                <ul>
                    <li><strong>Accrued Payroll:</strong> Employees earn wages but payday is later</li>
                    <li><strong>Food Inventory:</strong> Adjust Cost of Food Sales for actual usage</li>
                    <li><strong>Depreciation:</strong> Allocate cost of FF&E over useful life</li>
                    <li><strong>Prepaid Expenses:</strong> Insurance, licenses, contracts</li>
                    <li><strong>Unearned Revenue:</strong> Advance deposits, gift cards</li>
                </ul>
                
                <hr>
                
                <h4>✅ Trial Balances</h4>
                
                <h5>Working Trial Balance:</h5>
                <p>Lists all account balances BEFORE adjustments. Verifies debits = credits.</p>
                
                <h5>Adjusted Trial Balance:</h5>
                <p>Lists all account balances AFTER adjusting entries.</p>
                
                <h5>Post-Closing Trial Balance:</h5>
                <p>Lists only PERMANENT accounts after closing. Confirms ledger is ready for new period.</p>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Key Takeaways</h4>
                    <ul>
                        <li>Cash basis = record when cash moves; Accrual = record when earned/incurred</li>
                        <li>GAAP requires accrual basis accounting</li>
                        <li>10 steps in the accounting cycle</li>
                        <li>Deferrals = paid/received now, recognize later</li>
                        <li>Accruals = recognize now, pay/receive later</li>
                        <li>Temporary accounts (Revenue, Expenses, Dividends) are CLOSED</li>
                        <li>Permanent accounts (Assets, Liabilities, Equity) carry forward</li>
                    </ul>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 5: HOTEL INCOME STATEMENTS ==========
    hotelStatements: {
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
            // ===== DODATNE FLASHCARDS =====
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
            // ===== DODATNI QUIZ =====
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
            // ===== DODATNI FILL BLANKS =====
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
    },
    
    // ========== CATEGORY 6: FINANCIAL STATEMENT ANALYSIS ==========
    financialAnalysis: {
        name: "Financial Analysis",
        icon: "fa-chart-pie",
        color: "#4f46e5",
        
        flashcards: [
            {
                question: "What items might be included in notes to financial statements?",
                answer: "Notes may include:\n• Significant accounting policies\n• Details of long-term debt\n• Lease commitments\n• Contingent liabilities\n• Pension and benefit plans\n• Related-party transactions\n• Subsequent events",
                explanation: "Notes provide essential additional information."
            },
            {
                question: "What are the differences between an audit, review, and compilation?",
                answer: "Audit: Highest assurance, detailed testing\n\nReview: Limited assurance, inquiry and analytical procedures\n\nCompilation: No assurance, simply presents data from management",
                explanation: "Different levels of CPA involvement and assurance."
            },
            {
                question: "Why is net income not representative of cash income?",
                answer: "Because net income is calculated using accrual accounting, which includes:\n• Non-cash items (depreciation)\n• Timing differences between revenues earned and cash received",
                explanation: "Accrual ≠ Cash."
            },
            {
                question: "What are the differences between common-size, comparative, and ratio analysis?",
                answer: "Common-size: Each item as percentage of a base amount\n\nComparative: Compare results across periods\n\nRatio: Evaluate relationships between items to assess performance",
                explanation: "Three different analytical approaches."
            },
            {
                question: "What are the purposes of the three main financial statements?",
                answer: "Income Statement: Shows profitability over a period\n\nBalance Sheet: Shows financial position at a point in time\n\nStatement of Cash Flows: Shows sources and uses of cash during a period",
                explanation: "Each statement serves a different purpose."
            },
            {
                question: "What are the four subtotals of income on the income statement?",
                answer: "1. Gross Profit: Revenue minus cost of sales\n2. Income from Operations: Profit from core operations\n3. Income Before Income Taxes\n4. Net Income: Final profit after all expenses",
                explanation: "Progression from revenue to bottom line."
            },
            {
                question: "What does liquidity mean and which ratios measure it?",
                answer: "Liquidity is the ability to meet short-term obligations.\n\nLiquidity ratios:\n• Current Ratio\n• Quick (Acid-Test) Ratio",
                explanation: "Can the business pay its bills?"
            },
            {
                question: "What are the three sections of the Statement of Cash Flows?",
                answer: "Operating Activities: Cash from day-to-day operations\n\nInvesting Activities: Cash from buying/selling long-term assets\n\nFinancing Activities: Cash from borrowing, repaying debt, and owner investments",
                explanation: "Three categories of cash flow."
            },
            // ===== DODATNE FLASHCARDS =====
            {
                question: "What is the Current Ratio formula and what is a good benchmark?",
                answer: "Current Ratio = Current Assets ÷ Current Liabilities\n\nBenchmark:\n• > 2.0 is generally good\n• 1.0-2.0 is acceptable\n• < 1.0 may indicate liquidity problems",
                explanation: "Measures ability to pay short-term obligations."
            },
            {
                question: "What is the Quick (Acid-Test) Ratio and why is it stricter?",
                answer: "Quick Ratio = (Current Assets − Inventory) ÷ Current Liabilities\n\nIt's stricter because it excludes inventory, which may take time to convert to cash. A ratio of 1.0 or higher is generally considered adequate.",
                explanation: "Conservative liquidity measure excluding inventory."
            },
            {
                question: "What is Return on Investment (ROI) and its formula?",
                answer: "ROI measures how efficiently assets generate profit.\n\nROI = Net Income ÷ Total Assets\n\nAlternatively: ROI = Profit Margin × Asset Turnover\n\nHigher ROI indicates better management of assets.",
                explanation: "Overall measure of profitability relative to assets."
            },
            {
                question: "What is the Debt-to-Equity Ratio?",
                answer: "Debt-to-Equity Ratio = Total Liabilities ÷ Total Equity\n\nMeasures financial leverage.\n• Lower ratio = Less risk, more conservative\n• Higher ratio = More leverage, higher risk\n• Hospitality often has higher ratios due to capital intensity",
                explanation: "Shows how much debt is used relative to owner investment."
            },
            {
                question: "What is Profit Margin and the two main types?",
                answer: "Gross Profit Margin = Gross Profit ÷ Revenue\nShows efficiency of core operations.\n\nNet Profit Margin = Net Income ÷ Revenue\nShows overall profitability after all expenses.\n\nBoth expressed as percentages.",
                explanation: "Profitability ratios showing what portion of revenue becomes profit."
            },
            {
                question: "What is Asset Turnover and what does it measure?",
                answer: "Asset Turnover = Revenue ÷ Total Assets\n\nMeasures how efficiently assets generate revenue.\n• Higher ratio = Better asset utilization\n• Low ratio may indicate underused assets\n\nHospitality typically has lower turnover due to property investments.",
                explanation: "Activity ratio measuring asset efficiency."
            },
            {
                question: "What are Solvency Ratios and name two examples?",
                answer: "Solvency ratios measure long-term financial health and ability to meet long-term obligations.\n\nExamples:\n• Debt-to-Equity Ratio\n• Times Interest Earned = Operating Income ÷ Interest Expense\n• Debt Ratio = Total Liabilities ÷ Total Assets",
                explanation: "Long-term financial health indicators."
            },
            {
                question: "What is the Times Interest Earned ratio?",
                answer: "Times Interest Earned = Operating Income (EBIT) ÷ Interest Expense\n\nMeasures ability to pay interest on debt.\n• > 3.0 is generally considered safe\n• < 1.5 indicates potential difficulty meeting interest payments",
                explanation: "Also called Interest Coverage Ratio."
            }
        ],
        
        quiz: [
            {
                question: "Which provides the highest level of assurance?",
                options: ["Compilation", "Review", "Audit", "All equal"],
                correct: 2
            },
            {
                question: "Net income differs from cash because of:",
                options: ["Tax rates", "Accrual accounting and non-cash items", "Bank errors", "Employee theft"],
                correct: 1
            },
            {
                question: "Common-size analysis expresses items as:",
                options: ["Dollar amounts", "Percentages of a base amount", "Ratios", "Averages"],
                correct: 1
            },
            {
                question: "The Balance Sheet shows financial position at:",
                options: ["Over a period", "A point in time", "Year-to-date", "Monthly average"],
                correct: 1
            },
            {
                question: "Liquidity ratios include:",
                options: ["Debt ratio", "Current ratio", "Profit margin", "ROI"],
                correct: 1
            },
            {
                question: "Operating activities in cash flows show:",
                options: ["Long-term asset sales", "Cash from day-to-day operations", "Debt repayment", "Stock issuance"],
                correct: 1
            },
            {
                question: "Gross Profit equals:",
                options: ["Net income", "Revenue minus cost of sales", "Total revenue", "Operating expenses"],
                correct: 1
            },
            {
                question: "A compilation provides:",
                options: ["Highest assurance", "Limited assurance", "No assurance", "Full guarantee"],
                correct: 2
            },
            {
                question: "The Income Statement shows:",
                options: ["Financial position", "Profitability over a period", "Cash flows", "Owner equity only"],
                correct: 1
            },
            {
                question: "Investing activities include:",
                options: ["Daily sales", "Buying/selling long-term assets", "Paying wages", "Collecting receivables"],
                correct: 1
            },
            // ===== DODATNI QUIZ =====
            {
                question: "Current Ratio = Current Assets ÷ ______:",
                options: ["Total Assets", "Current Liabilities", "Total Liabilities", "Equity"],
                correct: 1
            },
            {
                question: "The Quick Ratio excludes which current asset?",
                options: ["Cash", "Accounts Receivable", "Inventory", "Prepaid Expenses"],
                correct: 2
            },
            {
                question: "ROI (Return on Investment) equals:",
                options: ["Revenue ÷ Assets", "Net Income ÷ Total Assets", "Assets ÷ Liabilities", "Gross Profit ÷ Sales"],
                correct: 1
            },
            {
                question: "A Current Ratio of 0.8 indicates:",
                options: ["Strong liquidity", "Potential liquidity problems", "High profitability", "Low debt"],
                correct: 1
            },
            {
                question: "Debt-to-Equity Ratio measures:",
                options: ["Profitability", "Liquidity", "Financial leverage", "Asset efficiency"],
                correct: 2
            },
            {
                question: "Times Interest Earned = Operating Income ÷ ______:",
                options: ["Total Debt", "Interest Expense", "Net Income", "Current Liabilities"],
                correct: 1
            },
            {
                question: "Asset Turnover measures:",
                options: ["Debt levels", "How efficiently assets generate revenue", "Liquidity position", "Profit margins"],
                correct: 1
            },
            {
                question: "Which ratio measures long-term solvency?",
                options: ["Current Ratio", "Quick Ratio", "Debt-to-Equity Ratio", "Inventory Turnover"],
                correct: 2
            },
            {
                question: "Net Profit Margin = Net Income ÷ ______:",
                options: ["Total Assets", "Total Equity", "Revenue", "Operating Expenses"],
                correct: 2
            },
            {
                question: "In vertical analysis on an Income Statement, what is the base?",
                options: ["Total Assets", "Net Income", "Revenue (Net Sales)", "Gross Profit"],
                correct: 2
            }
        ],
        
        fillBlanks: [
            {
                sentence: "An _______ provides the highest level of assurance.",
                answer: "audit",
                hint: "Most thorough examination..."
            },
            {
                sentence: "_______ is the ability to meet short-term obligations.",
                answer: "Liquidity",
                hint: "Can you pay your bills..."
            },
            {
                sentence: "Gross Profit = Revenue minus Cost of _______.",
                answer: "Sales",
                hint: "What you sold..."
            },
            {
                sentence: "The _______ Sheet shows financial position at a point in time.",
                answer: "Balance",
                hint: "Assets = Liabilities + Equity..."
            },
            {
                sentence: "_______ analysis expresses each item as a percentage of a base.",
                answer: "Common-size",
                hint: "Everything as percentages..."
            },
            // ===== DODATNI FILL BLANKS =====
            {
                sentence: "Current Ratio = Current Assets ÷ Current _______.",
                answer: "Liabilities",
                hint: "Short-term debts..."
            },
            {
                sentence: "Quick Ratio excludes _______ from current assets.",
                answer: "Inventory",
                hint: "Stock that takes time to sell..."
            },
            {
                sentence: "ROI = Net Income ÷ Total _______.",
                answer: "Assets",
                hint: "Everything owned..."
            },
            {
                sentence: "_______ Ratio = Total Liabilities ÷ Total Equity.",
                answer: "Debt-to-Equity",
                hint: "Measures leverage..."
            },
            {
                sentence: "Net Profit _______ = Net Income ÷ Revenue.",
                answer: "Margin",
                hint: "Percentage of profit..."
            },
            {
                sentence: "Asset _______ = Revenue ÷ Total Assets.",
                answer: "Turnover",
                hint: "How fast assets generate sales..."
            }
        ],
        
        learn: {
            title: "Analyzing Hospitality Financial Statements",
            content: `
                <h3>📚 Chapter Overview: Financial Statement Analysis</h3>
                
                <div class="tip-box" style="text-align: center; background: linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(79, 70, 229, 0.2)); border-left-color: #4f46e5;">
                    <h4 style="color: #4f46e5; font-size: 1.2rem;">📊 Financial Ratio Analysis</h4>
                    <p style="margin: 0;">Liquidity • Solvency • Profitability • Activity Ratios</p>
                </div>
                
                <p>This chapter covers the analysis of financial statements including ratio analysis, types of analysis, and CPA services. Essential for evaluating business performance.</p>
                
                <hr>
                
                <h4>📋 Three Levels of CPA Services</h4>
                
                <table style="width:100%; border-collapse: collapse; margin: 15px 0;">
                    <tr style="background: rgba(79,70,229,0.2);">
                        <th style="padding: 10px; border: 1px solid #ccc;">Service</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Assurance Level</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Procedures</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;"><strong>Audit</strong></td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Highest</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Detailed testing, confirmations, physical counts</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;"><strong>Review</strong></td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Limited</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Inquiry, analytical procedures</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;"><strong>Compilation</strong></td>
                        <td style="padding: 10px; border: 1px solid #ccc;">None</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Simply presents management's data</td>
                    </tr>
                </table>
                
                <hr>
                
                <h4>📊 The Three Main Financial Statements</h4>
                
                <div class="formula-box">
                    <strong>1. INCOME STATEMENT</strong><br>
                    Shows profitability OVER A PERIOD (month, quarter, year)<br>
                    Revenue → Expenses → Net Income<br><br>
                    
                    <strong>2. BALANCE SHEET</strong><br>
                    Shows financial position AT A POINT IN TIME<br>
                    Assets = Liabilities + Equity<br><br>
                    
                    <strong>3. STATEMENT OF CASH FLOWS</strong><br>
                    Shows sources and uses of cash OVER A PERIOD<br>
                    Operating + Investing + Financing = Change in Cash
                </div>
                
                <hr>
                
                <h4>📈 Four Income Subtotals</h4>
                
                <ol>
                    <li><strong>Gross Profit</strong> = Revenue − Cost of Sales</li>
                    <li><strong>Income from Operations</strong> = Gross Profit − Operating Expenses</li>
                    <li><strong>Income Before Income Taxes</strong> = Income from Operations ± Other Income/Expenses</li>
                    <li><strong>Net Income</strong> = Income Before Taxes − Income Tax Expense</li>
                </ol>
                
                <div class="example-box">
                    <h4>📝 Example: Income Subtotals</h4>
                    <p>Revenue: $1,000,000</p>
                    <p>Cost of Sales: $400,000</p>
                    <p><strong>Gross Profit:</strong> $600,000 (60% margin)</p>
                    <p>Operating Expenses: $350,000</p>
                    <p><strong>Income from Operations:</strong> $250,000</p>
                    <p>Interest Expense: $30,000</p>
                    <p><strong>Income Before Tax:</strong> $220,000</p>
                    <p>Income Tax (25%): $55,000</p>
                    <p><strong>Net Income:</strong> $165,000</p>
                </div>
                
                <hr>
                
                <h4>📉 Statement of Cash Flows Sections</h4>
                
                <div class="formula-box">
                    <strong>OPERATING ACTIVITIES</strong><br>
                    Cash from day-to-day operations<br>
                    Examples: Cash received from customers, cash paid to suppliers<br><br>
                    
                    <strong>INVESTING ACTIVITIES</strong><br>
                    Cash from buying/selling long-term assets<br>
                    Examples: Purchase equipment, sell property<br><br>
                    
                    <strong>FINANCING ACTIVITIES</strong><br>
                    Cash from borrowing, repaying debt, and owner transactions<br>
                    Examples: Issue stock, pay dividends, repay loans
                </div>
                
                <hr>
                
                <h4>🔢 Three Types of Financial Analysis</h4>
                
                <h5>1. Common-Size (Vertical) Analysis:</h5>
                <p>Express each item as a percentage of a base amount.</p>
                <ul>
                    <li>Income Statement: Base = Revenue (Net Sales)</li>
                    <li>Balance Sheet: Base = Total Assets</li>
                </ul>
                
                <h5>2. Comparative (Horizontal) Analysis:</h5>
                <p>Compare results across different periods.</p>
                <p>Formula: (Current Year − Prior Year) ÷ Prior Year × 100%</p>
                
                <h5>3. Ratio Analysis:</h5>
                <p>Evaluate relationships between financial items to assess performance.</p>
                
                <hr>
                
                <h4>📊 KEY FINANCIAL RATIOS</h4>
                
                <div class="example-box" style="text-align: center;">
                    <h4 style="margin-top: 0;">📈 4 Types of Financial Ratios</h4>
                    <p style="font-size: 1.1rem; margin: 5px 0;"><strong>Liquidity</strong> • <strong>Solvency</strong> • <strong>Profitability</strong> • <strong>Activity</strong></p>
                </div>
                
                <h5>LIQUIDITY RATIOS (Short-term ability to pay):</h5>
                
                <div class="formula-box">
                    <strong>Current Ratio</strong> = Current Assets ÷ Current Liabilities<br>
                    <em>Rule of thumb: ≥ 2.0 is good; < 1.0 is concerning</em><br><br>
                    
                    <strong>Quick (Acid-Test) Ratio</strong> = (Current Assets − Inventory) ÷ Current Liabilities<br>
                    <em>More conservative; excludes inventory</em><br>
                    <em>Rule of thumb: ≥ 1.0 is adequate</em>
                </div>
                
                <div class="example-box">
                    <h4>📝 Example: Liquidity Ratios</h4>
                    <p>Current Assets: $200,000 (including Inventory $50,000)</p>
                    <p>Current Liabilities: $100,000</p>
                    <p><strong>Current Ratio:</strong> $200,000 ÷ $100,000 = <strong>2.0</strong> ✓</p>
                    <p><strong>Quick Ratio:</strong> ($200,000 − $50,000) ÷ $100,000 = <strong>1.5</strong> ✓</p>
                </div>
                
                <h5>SOLVENCY RATIOS (Long-term financial health):</h5>
                
                <div class="formula-box">
                    <strong>Debt-to-Equity Ratio</strong> = Total Liabilities ÷ Total Equity<br>
                    <em>Measures financial leverage; lower = less risk</em><br><br>
                    
                    <strong>Debt Ratio</strong> = Total Liabilities ÷ Total Assets<br>
                    <em>Percentage of assets financed by debt</em><br><br>
                    
                    <strong>Times Interest Earned</strong> = Operating Income (EBIT) ÷ Interest Expense<br>
                    <em>Ability to pay interest; ≥ 3.0 is generally safe</em>
                </div>
                
                <h5>PROFITABILITY RATIOS (Earning ability):</h5>
                
                <div class="formula-box">
                    <strong>Gross Profit Margin</strong> = Gross Profit ÷ Revenue × 100%<br><br>
                    
                    <strong>Net Profit Margin</strong> = Net Income ÷ Revenue × 100%<br><br>
                    
                    <strong>ROI (Return on Investment)</strong> = Net Income ÷ Total Assets<br>
                    OR<br>
                    ROI = Profit Margin × Asset Turnover<br><br>
                    
                    <strong>ROE (Return on Equity)</strong> = Net Income ÷ Total Equity
                </div>
                
                <h5>ACTIVITY RATIOS (Efficiency):</h5>
                
                <div class="formula-box">
                    <strong>Asset Turnover</strong> = Revenue ÷ Total Assets<br>
                    <em>How efficiently assets generate revenue</em><br><br>
                    
                    <strong>Inventory Turnover</strong> = Cost of Goods Sold ÷ Average Inventory<br>
                    <em>How many times inventory is sold/replaced</em><br><br>
                    
                    <strong>Accounts Receivable Turnover</strong> = Revenue ÷ Average Accounts Receivable<br>
                    <em>How quickly customers pay</em>
                </div>
                
                <hr>
                
                <h4>💵 Why Net Income ≠ Cash</h4>
                
                <div class="warning-box">
                    <h4><i class="fas fa-exclamation-triangle"></i> Important Concept!</h4>
                    <p>Net income is based on ACCRUAL accounting, not cash:</p>
                    <ul>
                        <li>Includes non-cash items (depreciation, amortization)</li>
                        <li>Revenue recognized when earned, not when cash received</li>
                        <li>Expenses recorded when incurred, not when paid</li>
                    </ul>
                    <p>That's why we need the Statement of Cash Flows!</p>
                </div>
                
                <hr>
                
                <h4>📝 Notes to Financial Statements</h4>
                <p>Required disclosures that supplement the financial statements:</p>
                <ul>
                    <li>Significant accounting policies</li>
                    <li>Details of long-term debt</li>
                    <li>Lease commitments</li>
                    <li>Contingent liabilities</li>
                    <li>Pension and benefit plans</li>
                    <li>Related-party transactions</li>
                    <li>Subsequent events</li>
                </ul>
                
                <hr>
                
                <div class="example-box">
                    <h4>📝 Comprehensive Ratio Example</h4>
                    <p><strong>Hotel Data:</strong></p>
                    <p>Total Revenue: $5,000,000</p>
                    <p>Net Income: $400,000</p>
                    <p>Total Assets: $8,000,000</p>
                    <p>Total Liabilities: $5,000,000</p>
                    <p>Total Equity: $3,000,000</p>
                    <p>Interest Expense: $200,000</p>
                    <p>Operating Income: $700,000</p>
                    <hr>
                    <p><strong>Net Profit Margin:</strong> $400,000 ÷ $5,000,000 = <strong>8%</strong></p>
                    <p><strong>Asset Turnover:</strong> $5,000,000 ÷ $8,000,000 = <strong>0.625</strong></p>
                    <p><strong>ROI:</strong> $400,000 ÷ $8,000,000 = <strong>5%</strong></p>
                    <p>Or: 8% × 0.625 = <strong>5%</strong> ✓</p>
                    <p><strong>ROE:</strong> $400,000 ÷ $3,000,000 = <strong>13.3%</strong></p>
                    <p><strong>Debt-to-Equity:</strong> $5,000,000 ÷ $3,000,000 = <strong>1.67</strong></p>
                    <p><strong>Times Interest Earned:</strong> $700,000 ÷ $200,000 = <strong>3.5</strong> ✓</p>
                </div>
                
                <div class="tip-box">
                    <h4><i class="fas fa-lightbulb"></i> Key Formulas to Memorize</h4>
                    <ul>
                        <li>Current Ratio = Current Assets ÷ Current Liabilities</li>
                        <li>Quick Ratio = (CA − Inventory) ÷ CL</li>
                        <li>ROI = Net Income ÷ Total Assets</li>
                        <li>ROI = Profit Margin × Asset Turnover</li>
                        <li>Debt-to-Equity = Total Liabilities ÷ Total Equity</li>
                        <li>Times Interest Earned = EBIT ÷ Interest Expense</li>
                        <li>Gross Profit Margin = Gross Profit ÷ Revenue</li>
                        <li>Net Profit Margin = Net Income ÷ Revenue</li>
                    </ul>
                </div>
            `
        }
    },
    
    // ========== CATEGORY 7: FINAL PRACTICE (REAL EXAM QUESTIONS) ==========
    finalPractice: {
        name: "🎯 Final Practice",
        icon: "fa-bullseye",
        color: "#dc2626",
        
        flashcards: [
            {
                question: "What are LABOR COSTS, how are they classified, and give examples in hospitality?",
                answer: "Labor costs include:\n• Wages and salaries\n• Employee benefits\n• Payroll taxes\n• Service charges\n\nClassified as: Operating expenses\nRecorded in: Class 4 (Expenses) of chart of accounts\n\nHospitality examples:\n• Front desk staff wages\n• Housekeeping salaries\n• Kitchen staff wages\n• Management salaries",
                explanation: "Labor is typically the largest expense in hospitality operations."
            },
            {
                question: "What are the rules for recording REVENUE FROM SOLD PRODUCTS account?",
                answer: "Recording rules:\n• Credit side: Increases (when revenue is earned)\n• Debit side: Decreases (corrections, returns)\n\nAppears in: Income Statement\nSection: Operating Revenue / Sales Revenue\n\nEffect on profit: Increases net income (positive impact)",
                explanation: "Revenue accounts have credit balances and increase equity."
            },
            {
                question: "What are CASH FLOWS FROM OPERATING ACTIVITIES?",
                answer: "Cash flows from operating activities include:\n\n• Cash received from customers (room sales, F&B)\n• Cash received from rent/lease income\n• Cash paid to suppliers\n• Cash paid for materials\n• Interest received\n• Cash collected from accounts receivable\n\nThis section shows cash generated from day-to-day business operations.",
                explanation: "Operating activities reflect the core business cash generation."
            },
            {
                question: "What are the characteristics of the Income Statement (P&L)?",
                answer: "Income Statement characteristics:\n\n✓ Reports revenues and expenses\n✓ Required financial statement for large companies\n✓ Provides data for profitability assessment\n✓ Prepared at END of accounting period\n\n✗ NOT a cash flow statement\n✗ Does NOT show cash inflows/outflows",
                explanation: "Income Statement shows profitability, not cash position."
            },
            {
                question: "What happens when inventory SURPLUS is found during stocktaking?",
                answer: "When inventory surplus (e.g., coffee at bar) is discovered:\n\n→ Recorded as: OPERATING INCOME (Business Revenue)\n\nNOT:\n• Operating expense\n• Employee receivable\n• Extraordinary income/expense\n\nJournal entry:\nDr. Inventory\n   Cr. Other Operating Income",
                explanation: "Inventory surplus increases income, deficit would be expense."
            },
            {
                question: "What are VARIABLE COSTS and how do they behave?",
                answer: "Variable costs:\n• Change proportionally with activity level\n• Increase when volume increases\n• Decrease when volume decreases\n\nExamples in hospitality:\n• Food cost (more guests = more food)\n• Beverage cost\n• Guest amenities\n• Laundry costs per room\n\nFormula: Total VC = Variable Cost per Unit × Volume",
                explanation: "Variable costs have constant per-unit cost but varying total."
            },
            {
                question: "How is payment of employee wages classified in financial statements?",
                answer: "Payment of wages (36,000 from bank account):\n\n✓ Operating CASH OUTFLOW (disbursement)\n✓ Position in Cash Flow Statement\n\n✗ NOT on Income Statement directly (expense was recorded when incurred, not paid)\n✗ NOT a financial activity\n✗ NOT a cash receipt",
                explanation: "Wage payment is an operating cash outflow, separate from the expense recognition."
            },
            {
                question: "How do you record invoiced accommodation services with VAT?",
                answer: "Invoice for accommodation: 40,000 + 13% VAT\n\nJournal entry:\nDr. Accounts Receivable    45,200\n   Cr. Revenue from Services    40,000\n   Cr. VAT Payable              5,200\n\nIncome Statement impact:\n• Revenue: +40,000\n• Category: Operating Revenue\n• Effect: Increases profit",
                explanation: "VAT is not revenue - it's a liability to be paid to government."
            },
            {
                question: "How do you record materials used in production?",
                answer: "Materials consumed in production: 10,000\n(Opening materials inventory: 20,000)\n\nJournal entry:\nDr. Work in Progress / Cost of Goods    10,000\n   Cr. Raw Materials Inventory          10,000\n\nBalance sheet change type: Asset decrease, Asset increase\n(Materials decrease, WIP increases)\n\nRemaining materials: 20,000 - 10,000 = 10,000",
                explanation: "This is an asset transformation, not expense yet."
            },
            {
                question: "How to calculate Operating Revenue from given data?",
                answer: "Given:\n• Revenue from accommodation: 100,000\n• Rental income: 20,000\n• Revenue from sold products: 40,000\n\nOperating Revenue = 100,000 + 20,000 = 120,000\n\nNote: Revenue from SOLD PRODUCTS (40,000) is different from ACCOMMODATION services.",
                explanation: "Operating revenue includes all revenue from main business activities."
            }
        ],
        
        quiz: [
            {
                question: "During stocktaking, a surplus of coffee at the bar is found. This is recorded as:",
                options: ["Operating expense", "Operating income", "Employee receivable", "Extraordinary income", "Extraordinary expense"],
                correct: 1
            },
            {
                question: "Costs that rise and fall proportionally with capacity utilization (e.g., number of hotel guests) are called:",
                options: ["Absolutely fixed costs", "Relatively fixed costs", "Variable costs", "General manufacturing costs", "Indirect costs"],
                correct: 2
            },
            {
                question: "Given: Accommodation revenue 100,000, Rental income 20,000, Revenue from sold products 40,000. Operating revenues equal:",
                options: ["100,000", "120,000", "140,000", "160,000", "60,000"],
                correct: 1
            },
            {
                question: "Given: Financial activity receipts 40,000, Financial activity disbursements 30,000. Net cash flow from financing activities is:",
                options: ["-10,000", "+10,000", "+70,000", "0", "-30,000"],
                correct: 1
            },
            {
                question: "Negative exchange rate differences of 1,000 are classified as:",
                options: ["Operating expense", "Financial expense", "Extraordinary expense", "Operating income", "Financial income"],
                correct: 1
            },
            {
                question: "The Income Statement (P&L) is:",
                options: ["A statement of cash inflows and outflows", "A statement of revenues and expenses", "Prepared at the beginning of the period", "Only for small companies", "A balance sheet component"],
                correct: 1
            },
            {
                question: "The Income Statement provides data for assessing:",
                options: ["Liquidity", "Solvency", "Profitability", "Cash position", "Asset valuation"],
                correct: 2
            },
            {
                question: "Employee wages paid from bank account (36,000) represent:",
                options: ["Income statement position only", "Operating cash disbursement", "Operating cash receipt", "Financial disbursement", "Investing activity"],
                correct: 1
            },
            {
                question: "Wages paid from bank account appear in which statement?",
                options: ["Only Income Statement", "Only Balance Sheet", "Cash Flow Statement", "Only Notes", "No financial statement"],
                correct: 2
            },
            {
                question: "Cash flows from operating activities include:",
                options: ["Loan repayments", "Equipment purchases", "Cash from room sales", "Stock issuance", "Dividend payments"],
                correct: 2
            },
            {
                question: "Revenue from accommodation services (40,000 + 13% VAT) affects the Income Statement by:",
                options: ["45,200 increase", "40,000 increase", "5,200 increase", "No effect", "40,000 decrease"],
                correct: 1
            },
            {
                question: "VAT charged on sales is recorded as:",
                options: ["Revenue", "Expense", "Liability", "Asset", "Equity"],
                correct: 2
            },
            {
                question: "Materials used in production (10,000 from 20,000 inventory) is what type of transaction?",
                options: ["Revenue recognition", "Expense recognition", "Asset transformation", "Liability increase", "Equity decrease"],
                correct: 2
            },
            {
                question: "Labor costs in hospitality are classified as:",
                options: ["Investing activity", "Financing activity", "Operating expense", "Asset", "Liability"],
                correct: 2
            },
            {
                question: "Revenue account increases are recorded on the:",
                options: ["Debit side", "Credit side", "Both sides equally", "Neither side", "Depends on transaction"],
                correct: 1
            },
            {
                question: "Given: Revenue 100,000, Rental 20,000, Expenses 40,000, Exchange loss 1,000. Profit before tax is:",
                options: ["60,000", "79,000", "80,000", "119,000", "59,000"],
                correct: 1
            }
        ],
        
        fillBlanks: [
            {
                sentence: "Costs that change proportionally with activity level are called _______ costs.",
                answer: "variable",
                hint: "They vary with volume..."
            },
            {
                sentence: "Inventory surplus found during stocktaking is recorded as operating _______.",
                answer: "income",
                hint: "It increases profit..."
            },
            {
                sentence: "Cash received from customers for room sales is a cash flow from _______ activities.",
                answer: "operating",
                hint: "Day-to-day business..."
            },
            {
                sentence: "The Income Statement shows revenues and _______ of a company.",
                answer: "expenses",
                hint: "Costs incurred..."
            },
            {
                sentence: "Payment of wages from bank account is an operating cash _______.",
                answer: "disbursement",
                hint: "Cash going out..."
            },
            {
                sentence: "VAT collected from customers is recorded as a _______ (asset/liability).",
                answer: "liability",
                hint: "Owed to government..."
            },
            {
                sentence: "Negative exchange rate differences are classified as _______ expenses.",
                answer: "financial",
                hint: "Related to currency..."
            },
            {
                sentence: "Revenue accounts have a normal _______ balance.",
                answer: "credit",
                hint: "Right side of T-account..."
            },
            {
                sentence: "Labor costs are the largest _______ expense in hospitality.",
                answer: "operating",
                hint: "From operations..."
            },
            {
                sentence: "Net cash flow = Receipts minus _______.",
                answer: "disbursements",
                hint: "Cash outflows..."
            }
        ],
        
        learn: {
            title: "🎯 Final Exam Practice - Real Test Questions",
            content: `
                <h3>📚 Final Exam Preparation</h3>
                
                <div class="warning-box" style="text-align: center;">
                    <h4>⚠️ These are REAL EXAM QUESTIONS!</h4>
                    <p style="margin: 0;">Practice these carefully - they appear on actual tests</p>
                </div>
                
                <hr>
                
                <h4>💰 Labor Costs (Troškovi rada)</h4>
                <p>Labor costs are a major expense category in hospitality, including:</p>
                <ul>
                    <li>Wages and salaries</li>
                    <li>Employee benefits</li>
                    <li>Payroll taxes</li>
                    <li>Service charges</li>
                </ul>
                <p><strong>Classification:</strong> Operating expenses (Class 4 in chart of accounts)</p>
                
                <hr>
                
                <h4>📊 Revenue Recognition</h4>
                
                <div class="formula-box">
                    <strong>Revenue Account Rules:</strong><br><br>
                    Credit side → Increases (revenue earned)<br>
                    Debit side → Decreases (corrections/returns)<br><br>
                    Location: Income Statement → Operating Revenue<br>
                    Effect: Increases Net Income
                </div>
                
                <div class="example-box">
                    <h4>📝 Example: Accommodation Invoice with VAT</h4>
                    <p>Services: 40,000 + VAT 13% = 45,200 total</p>
                    <p><strong>Journal Entry:</strong></p>
                    <p>Dr. Accounts Receivable .... 45,200</p>
                    <p>&nbsp;&nbsp;&nbsp;Cr. Revenue .................... 40,000</p>
                    <p>&nbsp;&nbsp;&nbsp;Cr. VAT Payable .............. 5,200</p>
                    <p><strong>Income Statement:</strong> +40,000 revenue (VAT is NOT revenue!)</p>
                </div>
                
                <hr>
                
                <h4>📦 Inventory Transactions</h4>
                
                <h5>Materials Used in Production:</h5>
                <div class="formula-box">
                    Opening Inventory: 20,000<br>
                    Materials Used: 10,000<br>
                    Closing Inventory: 10,000<br><br>
                    <strong>Entry:</strong><br>
                    Dr. Work in Progress .... 10,000<br>
                    &nbsp;&nbsp;&nbsp;Cr. Raw Materials ........ 10,000<br><br>
                    <strong>Type:</strong> Asset transformation (not expense yet)
                </div>
                
                <h5>Inventory Surplus (Stocktaking):</h5>
                <p>When MORE inventory is found than expected:</p>
                <p>→ Record as <strong>Operating Income</strong> (not extraordinary!)</p>
                
                <hr>
                
                <h4>💵 Cash Flow Statement Categories</h4>
                
                <div class="formula-box">
                    <strong>OPERATING Activities:</strong><br>
                    • Cash from room sales ✓<br>
                    • Cash from rental income ✓<br>
                    • Cash paid to suppliers ✓<br>
                    • Wages paid ✓<br>
                    • Interest received ✓<br><br>
                    
                    <strong>FINANCING Activities:</strong><br>
                    • Loan receipts/repayments<br>
                    • Stock issuance<br>
                    • Dividend payments<br><br>
                    
                    <strong>INVESTING Activities:</strong><br>
                    • Equipment purchases<br>
                    • Property sales
                </div>
                
                <div class="example-box">
                    <h4>📝 Example: Net Cash Flow Calculation</h4>
                    <p>Financial activity receipts: 40,000</p>
                    <p>Financial activity disbursements: 30,000</p>
                    <p><strong>Net Cash Flow (Financing):</strong> 40,000 - 30,000 = <strong>+10,000</strong></p>
                </div>
                
                <hr>
                
                <h4>📈 Cost Behavior</h4>
                
                <table style="width:100%; border-collapse: collapse; margin: 15px 0;">
                    <tr style="background: rgba(220, 38, 38, 0.2);">
                        <th style="padding: 10px; border: 1px solid #ccc;">Cost Type</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Behavior</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Example</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;"><strong>Variable</strong></td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Changes with volume</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Food cost, amenities</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;"><strong>Fixed</strong></td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Stays constant</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Rent, insurance</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ccc;"><strong>Semi-variable</strong></td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Has both components</td>
                        <td style="padding: 10px; border: 1px solid #ccc;">Utilities</td>
                    </tr>
                </table>
                
                <hr>
                
                <h4>📋 Income Statement (P&L) Characteristics</h4>
                
                <div class="tip-box">
                    <h4>✓ What Income Statement IS:</h4>
                    <ul>
                        <li>Report of revenues and expenses</li>
                        <li>Required for large companies</li>
                        <li>Shows profitability</li>
                        <li>Prepared at END of period</li>
                    </ul>
                </div>
                
                <div class="warning-box">
                    <h4>✗ What Income Statement is NOT:</h4>
                    <ul>
                        <li>Cash flow report</li>
                        <li>Prepared at beginning of period</li>
                        <li>Balance sheet position</li>
                    </ul>
                </div>
                
                <hr>
                
                <h4>🔢 Calculation Practice</h4>
                
                <div class="example-box">
                    <h4>📝 Profit Calculation Example</h4>
                    <p>Given data:</p>
                    <ul>
                        <li>Accommodation revenue: 100,000</li>
                        <li>Rental income: 20,000</li>
                        <li>Expenses from sold products: 40,000</li>
                        <li>Negative exchange differences: 1,000</li>
                    </ul>
                    <hr>
                    <p><strong>Operating Revenue:</strong> 100,000 + 20,000 = <strong>120,000</strong></p>
                    <p><strong>Operating Expenses:</strong> 40,000</p>
                    <p><strong>Financial Expenses:</strong> 1,000 (exchange loss)</p>
                    <p><strong>Profit Before Tax:</strong> 120,000 - 40,000 - 1,000 = <strong>79,000</strong></p>
                </div>
                
                <hr>
                
                <div class="tip-box" style="background: linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(220, 38, 38, 0.2)); border-left-color: #dc2626;">
                    <h4 style="color: #dc2626;">🎯 Key Exam Tips</h4>
                    <ul>
                        <li><strong>VAT is NOT revenue</strong> - it's a liability!</li>
                        <li><strong>Inventory surplus = Operating income</strong></li>
                        <li><strong>Variable costs</strong> change with guests/volume</li>
                        <li><strong>Wage payment</strong> = Operating cash outflow</li>
                        <li><strong>Exchange losses</strong> = Financial expense</li>
                        <li>Income Statement shows <strong>profitability</strong>, NOT cash</li>
                    </ul>
                </div>
            `
        }
    }
};

// Make data globally available
if (typeof window !== 'undefined') {
    window.accountingData = accountingData;
}
