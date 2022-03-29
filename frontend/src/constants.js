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
                    { id: "ebitda", label: "EBITDA" },
                    { id: "revenue", label: "Revenue" },
                    { id: "net_income", label: "Net income" },
                    { id: "shares_outstanding", label: "Shares outstanding" },
                    { id: "operating_income", label: "Operating income" },
                    { id: "cost_of_revenue", label: "Cost of revenue" },
                    { id: "gross_profit", label: "Gross profit" },
                    { id: "rd_expense", label: "R&D expense" },
                    {
                        id: "sales_marketing_expense",
                        label: "Sales and marketing expense",
                    },
                    { id: "investment_income", label: "Investment income" },
                    {
                        id: "stock_based_comp_income",
                        label: "Stock based comp",
                    },
                ],
            },
            income_statement_ratios: {
                label: "Ratios",
                data: [
                    { id: "gross_margin", label: "Gross margin" },
                    { id: "net_margin", label: "Net margin" },
                    { id: "operating_margin", label: "Operating Margin" },
                    { id: "ebitda_margin", label: "EBITDA margin" },
                    { id: "basic_eps", label: "Basic EPS" },
                    { id: "diluted_eps", label: "Diluted EPS" },
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
