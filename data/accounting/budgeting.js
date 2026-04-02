// ===== ACCOUNTING: BUDGETING & COST ANALYSIS =====
// Category 2 of Accounting Theory

const budgetingData = {
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
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = budgetingData;
}
