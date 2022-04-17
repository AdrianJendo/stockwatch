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
                        format: "$",
                    },
                    {
                        apiField: "OVERVIEW",
                        id: "BookValue",
                        label: "Book Value",
                        format: "$",
                    },

                    {
                        apiField: "OVERVIEW",
                        id: "DividendYield",
                        label: "Dividend Yield",
                        format: "%",
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
                        format: "$",
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
                        format: "%",
                    },
                    {
                        apiField: "OVERVIEW",
                        id: "ReturnOnAssetsTTM",
                        label: "Return on assets",
                        format: "%",
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
                        format: "$",
                    },
                    {
                        apiField: "OVERVIEW",
                        id: "52WeekLow",
                        label: "52 week low",
                        format: "$",
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
                data: [
                    { apiField: "SMA", id: "sma50", label: "50 day SMA" },
                    { apiField: "SMA", id: "sma100", label: "100 day SMA" },
                    { apiField: "SMA", id: "sma200", label: "200 day SMA" },
                    { apiField: "EMA", id: "ema50", label: "50 day EMA" },
                    { apiField: "EMA", id: "ema100", label: "100 day EMA" },
                    { apiField: "EMA", id: "ema200", label: "200 day EMA" },
                    { apiField: "OVERVIEW", id: "Beta", label: "Beta" },
                    // { id: "volatility", label: "Volatility" },
                    { apiField: "RSI", id: "rsi", label: "RSI" },
                    {
                        apiField: "TIME_SERIES_MONTHLY_ADJUSTED",
                        id: "1. open",
                        label: "Open",
                        format: "$",
                    },
                    {
                        apiField: "TIME_SERIES_MONTHLY_ADJUSTED",
                        id: "2. high",
                        label: "High",
                        format: "$",
                    },
                    {
                        apiField: "TIME_SERIES_MONTHLY_ADJUSTED",
                        id: "3. low",
                        label: "Low",
                        format: "$",
                    },
                    {
                        apiField: "TIME_SERIES_MONTHLY_ADJUSTED",
                        id: "4. close",
                        label: "Close",
                        format: "$",
                    },
                    {
                        apiField: "TIME_SERIES_MONTHLY_ADJUSTED",
                        id: "5. volume",
                        label: "Volume",
                        format: "$",
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
                        id: "totalRevenue",
                        label: "Total Revenue",
                        format: "$",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "grossProfit",
                        label: "Gross Profit",
                        format: "$",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "costOfRevenue",
                        label: "Cost of Revenue",
                        format: "$",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "operatingIncome",
                        label: "Operating Income",
                        format: "$",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "sellingGeneralAndAdministrative",
                        label: "Selling, G & A",
                        format: "$",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "researchAndDevelopment",
                        label: "R&D Costs",
                        format: "$",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "operatingExpenses",
                        label: "Operating Expenses",
                        format: "$",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "investmentIncomeNet",
                        label: "Investment Income",
                        format: "$",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "interestIncome",
                        label: "Interest Income",
                        format: "$",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "interestExpense",
                        label: "Interest Expense",
                        format: "$",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "nonInterestIncome",
                        label: "Other Income",
                        format: "$",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "depreciationAndAmortization",
                        label: "Depreciation & Amortization",
                        format: "$",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "incomeBeforeTax",
                        label: "Income before income tax",
                        format: "$",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "incomeTaxExpense",
                        label: "Income tax expense",
                        format: "$",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "interestAndDebtExpense",
                        label: "Interest expense",
                        format: "$",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "netIncomeFromContinuingOperations",
                        label: "Income from continued operations",
                        format: "$",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "ebit",
                        label: "EBIT",
                        format: "$",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "ebitda",
                        label: "EBITDA",
                        format: "$",
                    },
                    {
                        apiField: "INCOME_STATEMENT",
                        id: "netIncome",
                        label: "Net Income",
                        format: "$",
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
                        format: "%",
                    },
                    {
                        apiField: "OVERVIEW",
                        id: "OperatingMarginTTM",
                        label: "Operating Margin",
                        format: "%",
                    },
                    {
                        id: "ebitda_margin",
                        label: "EBITDA margin",
                        format: "%",
                    }, // don't work
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
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "totalCurrentAssets",
                        label: "Current Assets",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "cashAndCashEquivalentsAtCarryingValue",
                        label: "Cash & Cash Equivalents",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "cashAndShortTermInvestments",
                        label: "Short term investments",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "inventory",
                        label: "Inventory",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "currentNetReceivables",
                        label: "Current Net Receivables",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "totalNonCurrentAssets",
                        label: "Total Non-current Assets",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "propertyPlantEquipment",
                        label: "Property, Plant and Equipment",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "intangibleAssets",
                        label: "Intangible Assets",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "intangibleAssetsExcludingGoodwill",
                        label: "Intangible Assets without goodwill",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "goodwill",
                        label: "Goodwill",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "investments",
                        label: "Investments",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "longTermInvestments",
                        label: "Long term investments",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "shortTermInvestments",
                        label: "Short term investments",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "otherCurrentAssets",
                        label: "Other Current Assets",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "otherNonCurrrentAssets",
                        label: "Other Non-current Assets",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "totalLiabilities",
                        label: "Total Liabilities",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "totalCurrentLiabilities",
                        label: "Current Liabilities",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "currentAccountsPayable",
                        label: "Current Accounts Payable",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "deferredRevenue",
                        label: "Deferred Revenue",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "currentDebt",
                        label: "Current Debt",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "shortTermDebt",
                        label: "Short Term Debt",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "totalNonCurrentLiabilities",
                        label: "Total Non-current Liabilities",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "capitalLeaseObligations",
                        label: "Capital Lease Obligations",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "longTermDebt",
                        label: "Long Term Debt",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "currentLongTermDebt",
                        label: "Current Long Term Debt",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "longTermDebtNoncurrent",
                        label: "Non-current Long Term Debt",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "otherCurrentLiabilities",
                        label: "Other Current Liabilities",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "otherNonCurrentLiabilities",
                        label: "Other Non-current Liabilities",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "totalShareholderEquity",
                        label: "Total Shareholder Equity",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "treasuryStock",
                        label: "Treasury Stock",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "retainedEarnings",
                        label: "Retained Earnings",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "commonStock",
                        label: "Common Stock",
                        format: "$",
                    },
                    {
                        apiField: "BALANCE_SHEET",
                        id: "commonStockSharesOutstanding",
                        label: "Shares Outstanding",
                        format: "$",
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
                        format: "$",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "proceedsFromOperatingActivities",
                        label: "Cashflow From Operating Activities",
                        format: "$",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "depreciationDepletionAndAmortization",
                        label: "Depreciation & Amortization",
                        format: "$",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "capitalExpenditures",
                        label: "Capex",
                        format: "$",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "changeInReceivables",
                        label: "Change in Receivables",
                        format: "$",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "changeInInventory",
                        label: "Change in Inventory",
                        format: "$",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "cashflowFromInvestment",
                        label: "Cashflow from Investment",
                        format: "$",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "cashflowFromFinancing",
                        label: "Cashflow from Financing",
                        format: "$",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "proceedsFromRepaymentsOfShortTermDebt",
                        label: "Proceeds from Repayments of Short Term Debt",
                        format: "$",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "paymentsForRepurchaseOfCommonStock",
                        label: "Payments for Stock Repurchase",
                        format: "$",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "dividendPayout",
                        label: "Dividends Paid",
                        format: "$",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "proceedsFromIssuanceOfCommonStock",
                        label: "Proceeds from Issuance of Common Stock",
                        format: "$",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet",
                        label: "Proceeds from Issuance of Long Term Debt",
                        format: "$",
                    },
                    {
                        apiField: "CASH_FLOW",
                        id: "changeInCashAndCashEquivalents",
                        label: "Change in Cash & Cash Equivalents",
                        format: "$",
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

export const technicalPatterns = {
    "Two Crows": "CDL2CROWS",
    "Three Black Crows": "CDL3BLACKCROWS",
    "Three Inside Up/Down": "CDL3INSIDE",
    "Three-Line Strike": "CDL3LINESTRIKE",
    "Three Outside Up/Down": "CDL3OUTSIDE",
    "Three Stars In The South": "CDL3STARSINSOUTH",
    "Three Advancing White Soldiers": "CDL3WHITESOLDIERS",
    "Abandoned Baby": "CDLABANDONEDBABY",
    "Advance Block": "CDLADVANCEBLOCK",
    "Belt-hold": "CDLBELTHOLD",
    Breakaway: "CDLBREAKAWAY",
    "Closing Marubozu": "CDLCLOSINGMARUBOZU",
    "Concealing Baby Swallow": "CDLCONCEALBABYSWALL",
    Counterattack: "CDLCOUNTERATTACK",
    "Dark Cloud Cover": "CDLDARKCLOUDCOVER",
    Doji: "CDLDOJI",
    "Doji Star": "CDLDOJISTAR",
    "Dragonfly Doji": "CDLDRAGONFLYDOJI",
    "Engulfing Pattern": "CDLENGULFING",
    "Evening Doji Star": "CDLEVENINGDOJISTAR",
    "Evening Star": "CDLEVENINGSTAR",
    "Up/Down-gap side-by-side white lines": "CDLGAPSIDESIDEWHITE",
    "Gravestone Doji": "CDLGRAVESTONEDOJI",
    Hammer: "CDLHAMMER",
    "Hanging Man": "CDLHANGINGMAN",
    "Harami Pattern": "CDLHARAMI",
    "Harami Cross Pattern": "CDLHARAMICROSS",
    "High-Wave Candle": "CDLHIGHWAVE",
    "Hikkake Pattern": "CDLHIKKAKE",
    "Modified Hikkake Pattern": "CDLHIKKAKEMOD",
    "Homing Pigeon": "CDLHOMINGPIGEON",
    "Identical Three Crows": "CDLIDENTICAL3CROWS",
    "In-Neck Pattern": "CDLINNECK",
    "Inverted Hammer": "CDLINVERTEDHAMMER",
    Kicking: "CDLKICKING",
    "Kicking - bull/bear determined by the longer marubozu":
        "CDLKICKINGBYLENGTH",
    "Ladder Bottom": "CDLLADDERBOTTOM",
    "Long Legged Doji": "CDLLONGLEGGEDDOJI",
    "Long Line Candle": "CDLLONGLINE",
    Marubozu: "CDLMARUBOZU",
    "Matching Low": "CDLMATCHINGLOW",
    "Mat Hold": "CDLMATHOLD",
    "Morning Doji Star": "CDLMORNINGDOJISTAR",
    "Morning Star": "CDLMORNINGSTAR",
    "On-Neck Pattern": "CDLONNECK",
    "Piercing Pattern": "CDLPIERCING",
    "Rickshaw Man": "CDLRICKSHAWMAN",
    "Rising/Falling Three Methods": "CDLRISEFALL3METHODS",
    "Separating Lines": "CDLSEPARATINGLINES",
    "Shooting Star": "CDLSHOOTINGSTAR",
    "Short Line Candle": "CDLSHORTLINE",
    "Spinning Top": "CDLSPINNINGTOP",
    "Stalled Pattern": "CDLSTALLEDPATTERN",
    "Stick Sandwich": "CDLSTICKSANDWICH",
    "Takuri (Dragonfly Doji with very long lower shadow)": "CDLTAKURI",
    "Tasuki Gap": "CDLTASUKIGAP",
    "Thrusting Pattern": "CDLTHRUSTING",
    "Tristar Pattern": "CDLTRISTAR",
    "Unique 3 River": "CDLUNIQUE3RIVER",
    "Upside Gap Two Crows": "CDLUPSIDEGAP2CROWS",
    "Upside/Downside Gap Three Methods": "CDLXSIDEGAP3METHODS",
};
