// ===== ACCOUNTING THEORY - DATA INDEX =====
// This file combines all accounting modules into one export
// IMPORTANT: Load this file AFTER all individual category files

// ========== ACCOUNTING DATA STRUCTURE ==========
// Each category file defines: cashControlData, budgetingData, etc.
// This index combines them into the accountingData object that app.js expects

const accountingData = {
    // Category 1: Cash & Internal Control
    cashControl: cashControlData,
    
    // Category 2: Budgeting & Cost Analysis
    budgeting: budgetingData,
    
    // Category 3: SEC & Annual Reports
    secReports: secReportsData,
    
    // Category 4: Accounting Cycle & Adjustments
    accountingCycle: accountingCycleData,
    
    // Category 5: Hotel Income Statements
    hotelStatements: hotelStatementsData,
    
    // Category 6: Financial Statement Analysis
    financialAnalysis: financialAnalysisData,
    
    // Category 7: Final Practice (Exam Questions)
    finalPractice: finalPracticeData
};

// Make data globally available for app.js
if (typeof window !== 'undefined') {
    window.accountingData = accountingData;
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = accountingData;
}
