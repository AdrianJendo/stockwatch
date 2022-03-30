import { ShowChart, MonetizationOnOutlined, Info } from "@mui/icons-material";

export const watchlistColumns = {
    security_information: {
        label: "Security Information",
        icon: <Info />,
        data: {
            security_information: {
                label: "Security Information",
                data: [
                    { id: "name", label: "Name" },
                    { id: "ticker", label: "Ticker" },
                    { id: "category", label: "Category" },
                    { id: "country", label: "Country" },
                ],
            },
            growth_rates: {
                label: "Growth Rates",
                data: [
                    { id: "revenue_growth", label: "Revenue growth" },
                    { id: "equity_growth", label: "Equity growth" },
                    { id: "net_income_growth", label: "Net income growth" },
                    { id: "gross_income_growth", label: "Gross income growth" },
                    {
                        id: "free_cash_flow_growth",
                        label: "Free cash flow growth",
                    },
                ],
            },
            valuation: {
                label: "Valuation Data",
                data: [
                    { id: "market_cap", label: "Market cap" },
                    { id: "divident_yield", label: "Dividend Yield" },
                    { id: "ex_divident_date", label: "Ex dividend date" },
                    { id: "last_dividend_date", label: "Last dividend date" },
                    {
                        id: "last_dividend_per_share",
                        label: "Last dividend $/share",
                    },
                    { id: "buyback_yield", label: "Buyback Yield" },
                    { id: "shares_outstanding", label: "Shares outstanding" },
                ],
            },
            valuation_ratios: {
                label: "Valuation Ratios",
                data: [
                    { id: "return_on_equity", label: "Return on equity" },
                    { id: "return_on_assets", label: "Return on assets" },
                    { id: "price_to_book", label: "Price / Book" },
                    { id: "price_to_earnings", label: "Price / Earnings" },
                    { id: "price_to_sales", label: "Price / Sales" },
                    { id: "enterprise_value", label: "Enterprise value" },
                    { id: "debt_to_earnings", label: "Debt / Earnings" },
                ], //Use this for any ratios that require more than 1 sheet (ex: income statement and balance sheet)
            },
        },
    },
    technical_data: {
        label: "Technical Data",
        icon: <ShowChart />,
        data: {
            price_and_performance: {
                label: "Price & Performance",
                data: [
                    { id: "52_week_high", label: "52 week high" },
                    { id: "52_week_low", label: "52 week low" },
                    {
                        id: "price_above_52_week_low",
                        label: "Price below 52 week high",
                    },
                    {
                        id: "price_below_52_week_low",
                        label: "Price above 52 week low",
                    },
                    {
                        id: "YTD_return",
                        label: "% return (YTD, 1year, 1month, etc.)",
                    },
                ],
            },

            technical_indicators: {
                label: "Technical Indicators",
                data: [
                    { id: "sma", label: "SMA" },
                    { id: "ema", label: "EMA" },
                    { id: "beta", label: "Beta" },
                    { id: "volatility", label: "Volatility" },
                    { id: "rsi", label: "RSI" },
                    { id: "volume", label: "Volume" },
                    { id: "short_interest", label: "short interest" },
                ],
            },
        },
    },
    income_statement: {
        label: "Income Statement",
        icon: <MonetizationOnOutlined />,
        data: {
            income_statement_data: {
                label: "Income Statement",

                data: [
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "grossProfit",
                        label: "Gross Profit",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "totalRevenue",
                        label: "Total Revenue",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "costOfRevenue",
                        label: "Cost of Revenue",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "operatingIncome",
                        label: "Operating Income",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "sellingGeneralAndAdministrative",
                        label: "Selling, G & A",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "researchAndDevelopment",
                        label: "R&D Costs",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "operatingExpenses",
                        label: "Operating Expenses",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "investmentIncomeNet",
                        label: "Investment Income",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "interestIncome",
                        label: "Interest Income",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "interestExpense",
                        label: "Interest Expense",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "nonInterestIncome",
                        label: "Other Income",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "depreciationAndAmortization",
                        label: "Depreciation & Amortization",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "incomeBeforeTax",
                        label: "Income before income tax",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "incomeTaxExpense",
                        label: "Income tax expense",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "interestAndDebtExpense",
                        label: "Interest expense",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "netIncomeFromContinuingOperations",
                        label: "Income from continued operations",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "ebit",
                        label: "EBIT",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "ebitda",
                        label: "EBITDA",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "netIncome",
                        label: "Net income",
                    },
                ],
            },
            // income_statement_ratios: {
            //     label: "Ratios",
            //     data: [
            //         { id: "gross_margin", label: "Gross margin" },
            //         { id: "net_margin", label: "Net margin" },
            //         { id: "operating_margin", label: "Operating Margin" },
            //         { id: "ebitda_margin", label: "EBITDA margin" },
            //         { id: "basic_eps", label: "Basic EPS" },
            //         { id: "diluted_eps", label: "Diluted EPS" },
            //     ],
            // },
        },
    },
    balance_sheet: {
        label: "Balance Sheet",
        icon: <MonetizationOnOutlined />,
        data: {
            balance_sheet_data: {
                label: "Balance Sheet",
                data: [
                    { id: "inventory", label: "Inventory" },
                    { id: "total_debt", label: "Total debt" },
                    { id: "net_debt", label: "Net debt" },
                    { id: "long_term_debt", label: "Long term debt" },
                    { id: "short_term_debt", label: "Short term debt" },
                    { id: "accounts_payable", label: "Accounts payable" },
                    { id: "accounts_receivable", label: "Accounts receivable" },
                    { id: "deferred_revenue", label: "Deferred Revenue" },
                    { id: "intangible_assets", label: "Intangible assets" },
                    { id: "goodwill", label: "Goodwill" },
                    {
                        id: "intangible_assets_goodwill",
                        label: "Intangible assets & goodwill",
                    },
                    {
                        id: "cash_and_equivalents",
                        label: "Cash and equivalents",
                    },
                ],
            },
            balance_sheet_ratios: {
                label: "Ratios",
                data: [
                    {
                        id: "equity_per_book_value",
                        label: "Equity / Book value",
                    },
                    { id: "book_value_per_share", label: "Book value / Share" },
                    { id: "debt_per_equity", label: "Debt / Equity" },
                    { id: "net_debt_per_equity", label: "Net debt / Equity" },
                    { id: "current_ratio", label: "Current ratio" },
                    {
                        id: "assets_per_liabilities",
                        label: "Assets / liabilities",
                    },
                ],
            },
        },
    },
    cash_flow: {
        label: "Cash Flow Statement",
        icon: <MonetizationOnOutlined />,
        data: {
            cash_flow_data: {
                label: "Cash Flow Data",
                data: [
                    { id: "operating_cash_flow", label: "Operating cash flow" },
                    {
                        id: "cash_flow_from_financing_activities",
                        label: "Cash flow from financing activities",
                    },
                    {
                        id: "cash_flow_from_investing_activities",
                        label: "Cash flow from investing activies",
                    },
                    { id: "capex", label: "Capital expendtitures" },
                    {
                        id: "stock_based_comp_cash_flow",
                        label: "Stock based compensation",
                    },
                    { id: "debt_raised", label: "Debt raised" },
                    { id: "stock_buybacks", label: "Stock buybacks" },
                    { id: "dividends_paid", label: "Dividends paid" },
                ],
            },
            cash_flow_ratios: {
                label: "Ratios",
                data: [
                    {
                        id: "capex_per_operating_cash_flow",
                        label: "Capital expenditures / Operating cash flow",
                    },
                ],
            },
        },
    },
};
