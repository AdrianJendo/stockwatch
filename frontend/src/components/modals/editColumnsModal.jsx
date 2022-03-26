import React, { useState, useEffect } from "react";
// import axios from "axios";

// import DragDropList from "components/dragDrop/dragDropList.jsx";
import DialogTitle from "components/modals/modalHeader.jsx";
import findIndex from "components/helpers/findIndex.js";

import {
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Button,
    TextField,
    InputAdornment,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Collapse,
    Typography,
    IconButton,
    styled,
} from "@mui/material";
import {
    Search,
    ExpandLess,
    ExpandMore,
    ShowChart,
    MonetizationOnOutlined,
    Info,
    Check,
    Clear,
} from "@mui/icons-material";

const StyledGrid = styled(Grid)(() => ({
    position: "relative",
    height: "100%",
    paddingRight: "10px",
    overflowY: "overlay",
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    paddingLeft: theme.spacing(4),
}));

const StyledColumnTitle = styled(Typography)(({ theme }) => ({
    height: "30px",
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
}));

const StyledSubheader = styled(ListSubheader)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const security_information = [
    { id: "name", label: "Name" },
    { id: "ticker", label: "Ticker" },
    { id: "category", label: "Category" },
    { id: "country", label: "Country" },
];
const price_and_performance = [
    { id: "52_week_high", label: "52 week high" },
    { id: "52_week_low", label: "52 week low" },
    { id: "price_above_52_week_low", label: "Price below 52 week high" },
    { id: "price_below_52_week_low", label: "Price above 52 week low" },
    { id: "YTD_return", label: "% return (YTD, 1year, 1month, etc.)" },
];
const technical_indicators = [
    { id: "sma", label: "SMA" },
    { id: "ema", label: "EMA" },
    { id: "beta", label: "Beta" },
    { id: "volatility", label: "Volatility" },
    { id: "rsi", label: "RSI" },
    { id: "volume", label: "Volume" },
    { id: "short_interest", label: "short interest" },
];
const income_statement = [
    { id: "ebitda", label: "EBITDA" },
    { id: "revenue", label: "Revenue" },
    { id: "net_income", label: "Net income" },
    { id: "shares_outstanding", label: "Shares outstanding" },
    { id: "operating_income", label: "Operating income" },
    { id: "cost_of_revenue", label: "Cost of revenue" },
    { id: "gross_profit", label: "Gross profit" },
    { id: "rd_expense", label: "R&D expense" },
    { id: "sales_marketing_expense", label: "Sales and marketing expense" },
    { id: "investment_income", label: "Investment income" },
    { id: "stock_based_comp_income", label: "Stock based comp" },
];
const income_statement_ratios = [
    { id: "gross_margin", label: "Gross margin" },
    { id: "net_margin", label: "Net margin" },
    { id: "operating_margin", label: "Operating Margin" },
    { id: "ebitda_margin", label: "EBITDA margin" },
    { id: "basic_eps", label: "Basic EPS" },
    { id: "diluted_eps", label: "Diluted EPS" },
];
const balance_sheet = [
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
    { id: "intangible_assets_goodwill", label: "Intangible assets & goodwill" },
    { id: "cash_and_equivalents", label: "Cash and equivalents" },
];
const balance_sheet_ratios = [
    { id: "equity_per_book_value", label: "Equity / Book value" },
    { id: "book_value_per_share", label: "Book value / Share" },
    { id: "debt_per_equity", label: "Debt / Equity" },
    { id: "net_debt_per_equity", label: "Net debt / Equity" },
    { id: "current_ratio", label: "Current ratio" },
    { id: "assets_per_liabilities", label: "Assets / liabilities" },
];
const cash_flow_statement = [
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
    { id: "stock_based_comp_cash_flow", label: "Stock based compensation" },
    { id: "debt_raised", label: "Debt raised" },
    { id: "stock_buybacks", label: "Stock buybacks" },
    { id: "dividends_paid", label: "Dividends paid" },
];
const cash_flow_statement_ratios = [
    {
        id: "capex_per_operating_cash_flow",
        label: "Capital expenditures / Operating cash flow",
    },
];
const valuation = [
    { id: "market_cap", label: "Market cap" },
    { id: "divident_yield", label: "Dividend Yield" },
    { id: "ex_divident_date", label: "Ex dividend date" },
    { id: "last_dividend_date", label: "Last dividend date" },
    { id: "last_dividend_per_share", label: "Last dividend $/share" },
    { id: "buyback_yield", label: "Buyback Yield" },
    { id: "shares_outstanding", label: "Shares outstanding" },
];
const valuation_ratios = [
    { id: "return_on_equity", label: "Return on equity" },
    { id: "return_on_assets", label: "Return on assets" },
    { id: "price_to_book", label: "Price / Book" },
    { id: "price_to_earnings", label: "Price / Earnings" },
    { id: "price_to_sales", label: "Price / Sales" },
    { id: "enterprise_value", label: "Enterprise value" },
    { id: "debt_to_earnings", label: "Debt / Earnings" },
]; //Use this for any ratios that require more than 1 sheet (ex: income statement and balance sheet)
const growth_rates = [
    { id: "revenue_growth", label: "Revenue growth" },
    { id: "equity_growth", label: "Equity growth" },
    { id: "net_income_growth", label: "Net income growth" },
    { id: "gross_income_growth", label: "Gross income growth" },
    { id: "free_cash_flow_growth", label: "Free cash flow growth" },
];

const EditColumnsModal = (props) => {
    const { handleClose, columns, setColumns } = props;
    const [searchValue, setSearchValue] = useState("");
    const [technicalMenuOpen, setTechnicalMenuOpen] = useState(false);
    const [financialMenuOpen, setFinancialMenuOpen] = useState(false);
    const [incomeStatementMenuOpen, setIncomeStatementMenuOpen] =
        useState(false);
    const [balanceSheetMenuOpen, setBalanceSheetMenuOpen] = useState(false);
    const [cashFlowStatementMenuOpen, setCashFlowStatementMenuOpen] =
        useState(false);
    const [valuationMenuOpen, setValuationMenuOpen] = useState(false);
    const [selectedDataCategory, setSelectedDataCategory] = useState([]);
    const [category, setCategory] = useState("");
    const [selectedColumns, setSelectedColumns] = useState([]);

    useEffect(() => {
        const newSelection = columns.slice();
        setSelectedColumns(newSelection);

        return () => {
            setSelectedColumns([]);
        };
    }, [columns]);

    const handleSearch = (e) => {
        const prevSearchValue = searchValue;
        const oldCategory = category;
        setSearchValue(e.target.value);
        setCategory("search");
        if (e.target.value !== "") {
            if (
                oldCategory === "search" &&
                prevSearchValue !== "" &&
                prevSearchValue.length < e.target.value.length
            ) {
                setSelectedDataCategory(
                    selectedDataCategory.filter((value) =>
                        value.label
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase())
                    )
                );
            } else {
                setSelectedDataCategory(
                    handleFindSearchResults(e.target.value)
                );
            }
        } else {
            setSelectedDataCategory([]);
        }
    };

    const handleSave = () => {
        // lookup data for new columns

        setColumns(selectedColumns);
        handleClose();
        // axios
        // 	.put(`/api/columns/${watchlistID}`, {
        // 		data: selectedColumns,
        // 	})
        // 	.then(() =>
        // 		axios
        // 			.get("/api/newcolumndata", {
        // 				params: {
        // 					columns: JSON.stringify(selectedColumns),
        // 					tickers: JSON.stringify(watchlistItems),
        // 				},
        // 			})
        // 			.then((res) => {
        // 				const newWatchlistItems = res.data.slice();
        // 				setWatchlistItems(newWatchlistItems);
        // 				setColumns(selectedColumns);
        // 				handleClose();
        // 			})
        // 			.catch((err) => alert(err.message))
        // 	)
        // 	.catch((err) => alert(err.message));
    };

    const handleFindSearchResults = (searchWord) => {
        let possibleValues = [];
        for (const list of [
            security_information,
            price_and_performance,
            technical_indicators,
            income_statement,
            income_statement_ratios,
            balance_sheet,
            balance_sheet_ratios,
            cash_flow_statement,
            cash_flow_statement_ratios,
            valuation,
            valuation_ratios,
            growth_rates,
        ]) {
            possibleValues = possibleValues.concat(
                list.filter((value) =>
                    value.label.toLowerCase().includes(searchWord.toLowerCase())
                )
            );
        }
        return possibleValues;
    };

    const toggleMenuExpanded = (menuOpen, setMenuOpen) => {
        setMenuOpen(!menuOpen);
    };

    const handleToggleFromSelection = (item) => {
        const index = findIndex(selectedColumns, item.label);
        const selectionCopy = selectedColumns.slice();
        if (index >= 0) {
            selectionCopy.splice(index, 1);
        } else {
            selectionCopy.push(item);
        }
        setSelectedColumns(selectionCopy);
    };

    const handleSelectDataCategory = (newCategory) => {
        setCategory(newCategory);
        switch (newCategory) {
            case "security_information":
                return setSelectedDataCategory(security_information);
            case "price_and_performance":
                return setSelectedDataCategory(price_and_performance);
            case "technical_indicators":
                return setSelectedDataCategory(technical_indicators);
            case "income_statement":
                return setSelectedDataCategory(income_statement);
            case "income_statement_ratios":
                return setSelectedDataCategory(income_statement_ratios);
            case "balance_sheet":
                return setSelectedDataCategory(balance_sheet);
            case "balance_sheet_ratios":
                return setSelectedDataCategory(balance_sheet_ratios);
            case "cash_flow_statement":
                return setSelectedDataCategory(cash_flow_statement);
            case "cash_flow_statement_ratios":
                return setSelectedDataCategory(cash_flow_statement_ratios);
            case "valuation":
                return setSelectedDataCategory(valuation);
            case "valuation_ratios":
                return setSelectedDataCategory(valuation_ratios);
            case "growth_rates":
                return setSelectedDataCategory(growth_rates);
            case "search":
                const filteredList = handleFindSearchResults(searchValue);
                return setSelectedDataCategory(filteredList);
            default:
                return setSelectedDataCategory([]);
        }
    };

    return (
        <div>
            <Dialog
                open={true}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth="md"
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Edit Columns
                    <TextField
                        id="outlined-full-width"
                        autoFocus
                        label="Search for Column"
                        placeholder="Search..."
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        value={searchValue}
                        onChange={handleSearch}
                        autoComplete="off"
                    />
                </DialogTitle>
                <Divider />
                <DialogContent
                    sx={{
                        display: "flex",
                        minHeight: "100px",
                        padding: 0,
                    }}
                >
                    <Grid container justifyContent="center" spacing={0}>
                        <StyledGrid item xs={3}>
                            {searchValue !== "" && (
                                <List
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                >
                                    <ListItem
                                        button
                                        onClick={() =>
                                            handleSelectDataCategory("search")
                                        }
                                    >
                                        <ListItemIcon>
                                            <Search />
                                        </ListItemIcon>
                                        <ListItemText secondary="Search Results" />
                                    </ListItem>
                                </List>
                            )}

                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader
                                        component="div"
                                        id="nested-list-subheader"
                                        disableSticky={true}
                                    >
                                        Data Categories
                                    </ListSubheader>
                                }
                            >
                                <ListItem
                                    button
                                    onClick={() =>
                                        handleSelectDataCategory(
                                            "security_information"
                                        )
                                    }
                                >
                                    <ListItemIcon>
                                        <Info />
                                    </ListItemIcon>
                                    <ListItemText secondary="Security Information" />
                                </ListItem>
                                <ListItem
                                    button
                                    onClick={() =>
                                        toggleMenuExpanded(
                                            technicalMenuOpen,
                                            setTechnicalMenuOpen
                                        )
                                    }
                                >
                                    <ListItemIcon>
                                        <ShowChart />
                                    </ListItemIcon>
                                    <ListItemText secondary="Technical Data" />
                                    {technicalMenuOpen ? (
                                        <ExpandLess />
                                    ) : (
                                        <ExpandMore />
                                    )}
                                </ListItem>
                                <Collapse
                                    in={technicalMenuOpen}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <List component="div" disablePadding>
                                        <ListItem
                                            button
                                            onClick={() =>
                                                handleSelectDataCategory(
                                                    "price_and_performance"
                                                )
                                            }
                                        >
                                            <ListItemText
                                                secondary={`Price & Performance`}
                                            />
                                        </ListItem>
                                        <ListItem
                                            button
                                            onClick={() =>
                                                handleSelectDataCategory(
                                                    "technical_indicators"
                                                )
                                            }
                                        >
                                            <ListItemText secondary="Technical Indicators" />
                                        </ListItem>
                                    </List>
                                </Collapse>
                                <ListItem
                                    button
                                    onClick={() =>
                                        toggleMenuExpanded(
                                            financialMenuOpen,
                                            setFinancialMenuOpen
                                        )
                                    }
                                >
                                    <ListItemIcon>
                                        <MonetizationOnOutlined />
                                    </ListItemIcon>
                                    <ListItemText secondary="Financial Data" />
                                    {financialMenuOpen ? (
                                        <ExpandLess />
                                    ) : (
                                        <ExpandMore />
                                    )}
                                </ListItem>
                                <Collapse
                                    in={financialMenuOpen}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <List component="div" disablePadding>
                                        <ListItem
                                            button
                                            onClick={() =>
                                                toggleMenuExpanded(
                                                    incomeStatementMenuOpen,
                                                    setIncomeStatementMenuOpen
                                                )
                                            }
                                        >
                                            <ListItemText secondary="Income Statement Data" />
                                            {incomeStatementMenuOpen ? (
                                                <ExpandLess />
                                            ) : (
                                                <ExpandMore />
                                            )}
                                        </ListItem>
                                        <Collapse
                                            in={incomeStatementMenuOpen}
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            <List
                                                component="div"
                                                disablePadding
                                            >
                                                <StyledListItem
                                                    button
                                                    onClick={() =>
                                                        handleSelectDataCategory(
                                                            "income_statement"
                                                        )
                                                    }
                                                >
                                                    <ListItemText secondary="Income Statement" />
                                                </StyledListItem>
                                                <StyledListItem
                                                    button
                                                    onClick={() =>
                                                        handleSelectDataCategory(
                                                            "income_statement_ratios"
                                                        )
                                                    }
                                                >
                                                    <ListItemText secondary="Income Statement Ratios" />
                                                </StyledListItem>
                                            </List>
                                        </Collapse>

                                        <ListItem
                                            button
                                            onClick={() =>
                                                toggleMenuExpanded(
                                                    balanceSheetMenuOpen,
                                                    setBalanceSheetMenuOpen
                                                )
                                            }
                                        >
                                            <ListItemText secondary="Balance Sheet Data" />
                                            {balanceSheetMenuOpen ? (
                                                <ExpandLess />
                                            ) : (
                                                <ExpandMore />
                                            )}
                                        </ListItem>
                                        <Collapse
                                            in={balanceSheetMenuOpen}
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            <List
                                                component="div"
                                                disablePadding
                                            >
                                                <StyledListItem
                                                    button
                                                    onClick={() =>
                                                        handleSelectDataCategory(
                                                            "balance_sheet"
                                                        )
                                                    }
                                                >
                                                    <ListItemText secondary="Balance Sheet" />
                                                </StyledListItem>
                                                <StyledListItem
                                                    button
                                                    onClick={() =>
                                                        handleSelectDataCategory(
                                                            "balance_sheet_ratios"
                                                        )
                                                    }
                                                >
                                                    <ListItemText secondary="Balance Sheet Ratios" />
                                                </StyledListItem>
                                            </List>
                                        </Collapse>

                                        <ListItem
                                            button
                                            onClick={() =>
                                                toggleMenuExpanded(
                                                    cashFlowStatementMenuOpen,
                                                    setCashFlowStatementMenuOpen
                                                )
                                            }
                                        >
                                            <ListItemText secondary="Cash Flow Data" />
                                            {cashFlowStatementMenuOpen ? (
                                                <ExpandLess />
                                            ) : (
                                                <ExpandMore />
                                            )}
                                        </ListItem>
                                        <Collapse
                                            in={cashFlowStatementMenuOpen}
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            <List
                                                component="div"
                                                disablePadding
                                            >
                                                <StyledListItem
                                                    button
                                                    onClick={() =>
                                                        handleSelectDataCategory(
                                                            "cash_flow_statement"
                                                        )
                                                    }
                                                >
                                                    <ListItemText secondary="Cash Flow Statement" />
                                                </StyledListItem>
                                                <StyledListItem
                                                    button
                                                    onClick={() =>
                                                        handleSelectDataCategory(
                                                            "cash_flow_statement_ratios"
                                                        )
                                                    }
                                                >
                                                    <ListItemText secondary="Cash Flow Statement Ratios" />
                                                </StyledListItem>
                                            </List>
                                        </Collapse>

                                        <ListItem
                                            button
                                            onClick={() =>
                                                toggleMenuExpanded(
                                                    valuationMenuOpen,
                                                    setValuationMenuOpen
                                                )
                                            }
                                        >
                                            <ListItemText secondary="Valuation Data" />
                                            {valuationMenuOpen ? (
                                                <ExpandLess />
                                            ) : (
                                                <ExpandMore />
                                            )}
                                        </ListItem>
                                        <Collapse
                                            in={valuationMenuOpen}
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            <List
                                                component="div"
                                                disablePadding
                                            >
                                                <StyledListItem
                                                    button
                                                    onClick={() =>
                                                        handleSelectDataCategory(
                                                            "valuation"
                                                        )
                                                    }
                                                >
                                                    <ListItemText secondary="Valuation" />
                                                </StyledListItem>
                                                <StyledListItem
                                                    button
                                                    onClick={() =>
                                                        handleSelectDataCategory(
                                                            "valuation_ratios"
                                                        )
                                                    }
                                                >
                                                    <ListItemText secondary="Valuation Ratios" />
                                                </StyledListItem>
                                            </List>
                                        </Collapse>
                                        <StyledListItem
                                            button
                                            onClick={() =>
                                                handleSelectDataCategory(
                                                    "growth_rates"
                                                )
                                            }
                                        >
                                            <ListItemText secondary="Growth Rates" />
                                        </StyledListItem>
                                    </List>
                                </Collapse>
                            </List>
                        </StyledGrid>
                        <StyledGrid item xs={6}>
                            <List
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <StyledSubheader
                                        component="div"
                                        id="nested-list-subheader"
                                    >
                                        Available selectedColumns
                                    </StyledSubheader>
                                }
                            >
                                {selectedDataCategory.map((value, index) => (
                                    <ListItem
                                        button
                                        onClick={() =>
                                            handleToggleFromSelection(value)
                                        }
                                        key={index}
                                    >
                                        {findIndex(
                                            selectedColumns,
                                            value.label
                                        ) !== -1 && (
                                            <ListItemIcon>
                                                <Check fontSize="medium" />
                                            </ListItemIcon>
                                        )}
                                        <ListItemText
                                            secondary={value.label}
                                            style={
                                                findIndex(
                                                    selectedColumns,
                                                    value.label
                                                ) !== -1
                                                    ? { color: "green" }
                                                    : {}
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </StyledGrid>
                        <StyledGrid item xs={3}>
                            <StyledColumnTitle>
                                Selected Columns
                            </StyledColumnTitle>
                            <Divider />
                            {selectedColumns.map((column) => (
                                <div
                                    key={column.id}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        cursor: "default",
                                        padding: "0 10px 0 36px",
                                    }}
                                >
                                    <Typography sx={{ userSelect: "none" }}>
                                        {column.label}
                                    </Typography>
                                    <IconButton
                                        onClick={() => {
                                            handleToggleFromSelection(column);
                                        }}
                                        sx={{
                                            "&:hover": {
                                                color: "#3c52b2",
                                            },
                                        }}
                                    >
                                        <Clear />
                                    </IconButton>
                                </div>
                            ))}
                            {/* <DragDropList
								items={selectedColumns}
								setItems={setSelectedColumns}
								handleRemove={handleToggleFromSelection}
							/> */}
                        </StyledGrid>
                    </Grid>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={handleSave} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditColumnsModal;
