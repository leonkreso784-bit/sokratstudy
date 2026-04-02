// ===== ACCOUNTING: ACCOUNTING CYCLE & ADJUSTMENTS =====
// Category 4 of Accounting Theory

const accountingCycleData = {
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
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = accountingCycleData;
}
