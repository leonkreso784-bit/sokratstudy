// ===== ACCOUNTING: SEC & ANNUAL REPORTS =====
// Category 3 of Accounting Theory

const secReportsData = {
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
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = secReportsData;
}
