import { ShowChart, MonetizationOnOutlined, Info } from "@mui/icons-material";

export const watchlistColumns = {
    security_information: {
        label: "Security Information",
        icon: <Info />,
        data: {
            security_information: {
                label: "Security Information",
                data: [
                    { apiField: "OVERVIEW", id: "Name", label: "Name" },
                    { id: "ticker", label: "Ticker" },
                    { id: "category", label: "Category" },
                    { apiField: "OVERVIEW", id: "Country", label: "Country" },
                ],
            },
            // these don't work
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
                    {
                        apiField: "OVERVIEW",
                        id: "MarketCapitalization",
                        label: "Market cap",
                    },
                    {
                        apiField: "OVERVIEW",
                        id: "BookValue",
                        label: "Book Value",
                    },

                    {
                        apiField: "OVERVIEW",
                        id: "DividendYield",
                        label: "Dividend Yield",
                    },
                    {
                        apiField: "OVERVIEW",
                        id: "DividendDate",
                        label: "Dividend date",
                    },
                    {
                        apiField: "OVERVIEW",
                        id: "ExDividendDate",
                        label: "Last dividend date",
                    },
                    {
                        apiField: "OVERVIEW",
                        id: "DividendPerShare",
                        label: "Dividend $/share",
                    },
                    { id: "buyback_yield", label: "Buyback Yield" }, // don't work
                ],
            },
            valuation_ratios: {
                label: "Valuation Ratios",
                data: [
                    {
                        apiField: "OVERVIEW",
                        id: "ReturnOnEquityTTM",
                        label: "Return on equity",
                    },
                    {
                        apiField: "OVERVIEW",
                        id: "ReturnOnAssetsTTM",
                        label: "Return on assets",
                    },
                    {
                        apiField: "OVERVIEW",
                        id: "PriceToBookRatio",
                        label: "Price / Book",
                    },
                    {
                        apiField: "OVERVIEW",
                        id: "PERatio",
                        label: "Price / Earnings",
                    },
                    {
                        apiField: "OVERVIEW",
                        id: "PEGRatio",
                        label: "PEG Ratio",
                    },
                    {
                        apiField: "OVERVIEW",
                        id: "PriceToSalesRatioTTM",
                        label: "Price / Sales",
                    },
                    {
                        apiField: "OVERVIEW",
                        id: "EVToEBITDA",
                        label: "EV / EBITDA",
                    },

                    { id: "enterprise_value", label: "Enterprise value" }, // no work
                    { id: "debt_to_earnings", label: "Debt / Earnings" }, // no work
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
                    {
                        apiField: "OVERVIEW",
                        id: "52WeekHigh",
                        label: "52 week high",
                    },
                    {
                        apiField: "OVERVIEW",
                        id: "52WeekLow",
                        label: "52 week low",
                    },
                    // THESE DON'T WORK
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
                        label: "YTD % Return",
                    },
                    {
                        id: "annual_return",
                        label: "Annual % Return",
                    },
                    {
                        id: "month_return",
                        label: "Monthly % Return",
                    },
                    {
                        id: "day_return",
                        label: "Daily % Return",
                    },
                ],
            },

            technical_indicators: {
                label: "Technical Indicators",
                // WORK ON THESE
                data: [
                    { apiField: "SMA", id: "sma50", label: "50 day SMA" },
                    { apiField: "SMA", id: "sma100", label: "100 day SMA" },
                    { apiField: "SMA", id: "sma200", label: "200 day SMA" },
                    { apiField: "EMA", id: "ema50", label: "50 day EMA" },
                    { apiField: "EMA", id: "ema100", label: "100 day EMA" },
                    { apiField: "EMA", id: "ema200", label: "200 day EMA" },
                    { apiField: "OVERVIEW", id: "Beta", label: "Beta" },
                    // { id: "volatility", label: "Volatility" },
                    { id: "rsi", label: "RSI" },
                    {
                        apiField: "TIME_SERIES_MONTHLY_ADJUSTED",
                        id: "1. open",
                        label: "Open",
                    },
                    {
                        apiField: "TIME_SERIES_MONTHLY_ADJUSTED",
                        id: "2. high",
                        label: "High",
                    },
                    {
                        apiField: "TIME_SERIES_MONTHLY_ADJUSTED",
                        id: "3. low",
                        label: "Low",
                    },
                    {
                        apiField: "TIME_SERIES_MONTHLY_ADJUSTED",
                        id: "4. close",
                        label: "Close",
                    },
                    {
                        apiField: "TIME_SERIES_MONTHLY_ADJUSTED",
                        id: "5. volume",
                        label: "Volume",
                    },
                    // { id: "short_interest", label: "short interest" },
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
                        label: "Net Income",
                    },
                ],
            },
            // these don't work
            income_statement_ratios: {
                label: "Ratios",
                data: [
                    { id: "gross_margin", label: "Gross margin" }, // don't work
                    {
                        apiField: "OVERVIEW",
                        id: "ProfitMargin",
                        label: "Net margin",
                    },
                    {
                        apiField: "OVERVIEW",
                        id: "OperatingMarginTTM",
                        label: "Operating Margin",
                    },
                    { id: "ebitda_margin", label: "EBITDA margin" }, // don't work
                    { apiField: "OVERVIEW", id: "EPS", label: "Basic EPS" },
                    {
                        apiField: "OVERVIEW",
                        id: "DilutedEPSTTM",
                        label: "Diluted EPS",
                    },
                ],
            },
        },
    },
    balance_sheet: {
        label: "Balance Sheet",
        icon: <MonetizationOnOutlined />,
        data: {
            balance_sheet_data: {
                label: "Balance Sheet",
                data: [
                    {
                        apiField: "BALANCE_SHEET",
                        id: "totalAssets",
                        label: "Total Assets",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "totalCurrentAssets",
                        label: "Current Assets",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "cashAndCashEquivalentsAtCarryingValue",
                        label: "Cash & Cash Equivalents",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "cashAndShortTermInvestments",
                        label: "Short term investments",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "inventory",
                        label: "Inventory",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "currentNetReceivables",
                        label: "Current Net Receivables",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "totalNonCurrentAssets",
                        label: "Total Non-current Assets",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "propertyPlantEquipment",
                        label: "Property, Plant and Equipment",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "intangibleAssets",
                        label: "Intangible Assets",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "intangibleAssetsExcludingGoodwill",
                        label: "Intangible Assets without goodwill",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "goodwill",
                        label: "Goodwill",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "investments",
                        label: "Investments",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "longTermInvestments",
                        label: "Long term investments",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "shortTermInvestments",
                        label: "Short term investments",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "otherCurrentAssets",
                        label: "Other Current Assets",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "otherNonCurrrentAssets",
                        label: "Other Non-current Assets",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "totalLiabilities",
                        label: "Total Liabilities",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "totalCurrentLiabilities",
                        label: "Current Liabilities",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "currentAccountsPayable",
                        label: "Current Accounts Payable",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "deferredRevenue",
                        label: "Deferred Revenue",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "currentDebt",
                        label: "Current Debt",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "shortTermDebt",
                        label: "Short Term Debt",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "totalNonCurrentLiabilities",
                        label: "Total Non-current Liabilities",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "capitalLeaseObligations",
                        label: "Capital Lease Obligations",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "longTermDebt",
                        label: "Long Term Debt",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "currentLongTermDebt",
                        label: "Current Long Term Debt",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "longTermDebtNoncurrent",
                        label: "Non-current Long Term Debt",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "otherCurrentLiabilities",
                        label: "Other Current Liabilities",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "otherNonCurrentLiabilities",
                        label: "Other Non-current Liabilities",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "totalShareholderEquity",
                        label: "Total Shareholder Equity",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "treasuryStock",
                        label: "Treasury Stock",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "retainedEarnings",
                        label: "Retained Earnings",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "commonStock",
                        label: "Common Stock",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "commonStockSharesOutstanding",
                        label: "Shares Outstanding",
                    },
                ],
            },
            // these don't work
            balance_sheet_ratios: {
                label: "Ratios",
                // none of these work
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
                    {
                        apiField: "CASH_FLOW",
                        id: "operatingCashflow",
                        label: "Operating Cashflow",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "proceedsFromOperatingActivities",
                        label: "Cashflow From Operating Activities",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "depreciationDepletionAndAmortization",
                        label: "Depreciation & Amortization",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "capitalExpenditures",
                        label: "Capex",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "changeInReceivables",
                        label: "Change in Receivables",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "changeInInventory",
                        label: "Change in Inventory",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "cashflowFromInvestment",
                        label: "Cashflow from Investment",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "cashflowFromFinancing",
                        label: "Cashflow from Financing",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "proceedsFromRepaymentsOfShortTermDebt",
                        label: "Proceeds from Repayments of Short Term Debt",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "paymentsForRepurchaseOfCommonStock",
                        label: "Payments for Stock Repurchase",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "dividendPayout",
                        label: "Dividends Paid",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "proceedsFromIssuanceOfCommonStock",
                        label: "Proceeds from Issuance of Common Stock",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet",
                        label: "Proceeds from Issuance of Long Term Debt",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "changeInCashAndCashEquivalents",
                        label: "Change in Cash & Cash Equivalents",
                    },
                ],
            },
            // these don't work
            cash_flow_ratios: {
                label: "Ratios",
                // don't work
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
