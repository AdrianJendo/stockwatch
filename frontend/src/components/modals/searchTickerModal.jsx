import React, { useState, useEffect } from "react";
// import axios from "axios";

import {
    Dialog,
    TextField,
    DialogActions,
    DialogContent,
    Button,
    Typography,
    InputAdornment,
    Grid,
    Divider,
    alpha,
    Tabs,
    Tab,
    styled,
    IconButton,
} from "@mui/material";
import { Search, Check, Clear } from "@mui/icons-material";
import ModalHeader from "components/modals/modalHeader";
import findIndex from "components/helpers/findIndex";
// import DragDropList from "components/dragDrop/dragDropList";

const StyledGridItem = styled(Grid)(({ theme }) => ({
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "50px",
    "&:hover": {
        cursor: "pointer",
        backgroundColor: alpha(theme.palette.info.main, 0.15),
    },
    padding: theme.spacing(0, 3),
}));

const StyledColumnTitle = styled(Typography)(({ theme }) => ({
    height: "30px",
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
    margin: theme.spacing(0, 3),
}));

// Use ticker as ID (ie: don't remove it even when not present in the table)
const items = [
    { name: "Tesla Inc.", ticker: "TSLA", category: "equity" },
    { name: "Apple Inc.", ticker: "AAPL", category: "equity" },
    { name: "Microsoft", ticker: "MSFT", category: "equity" },
    { name: "Salesforce", ticker: "CRM", category: "equity" },
    { name: "Google", ticker: "GOOGL", category: "equity" },
    { name: "AMD", ticker: "AMD", category: "equity" },
    { name: "Nvidia", ticker: "NVDA", category: "equity" },
    { name: "Caterpillar", ticker: "CAT", category: "equity" },
    { name: "Amazon.com", ticker: "AMZN", category: "equity" },
    { name: "Agilent Technlogies", ticker: "A", category: "equity" },
    { name: "Ark innovation ETF", ticker: "ARKK", category: "etf" },
    { name: "Ark next gen internet ETF", ticker: "ARKW", category: "etf" },
    { name: "US Dollars / Bitcoin", ticker: "USD/BTC", category: "forex" },
    { name: "US Dollars / Ethereum", ticker: "USD/ETH", category: "forex" },
    { name: "US Dollars / Cardano", ticker: "BTC/ETH", category: "forex" },
    { name: "Cardano / US Dollars", ticker: "ADA/USD", category: "forex" },
    { name: "Yeti", ticker: "YETI", category: "equity" },
    { name: "John Deere Inc.", ticker: "DE", category: "equity" },
    { name: "Take Two Interactive", ticker: "TTWO", category: "equity" },
    { name: "Coinbase Inc.", ticker: "COIN", category: "equity" },
    {
        name: "US Dollars / Canadian Dollars",
        ticker: "USD/CAD",
        category: "forex",
    },
]; // TEMP items

const SearchTickerModal = (props) => {
    const { watchlistItems, setNewAssets, handleClose } = props;
    const [searchValue, setSearchValue] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [tab, setTab] = useState("all");

    useEffect(() => {
        setSelectedItems(watchlistItems.slice());

        return () => {
            setSelectedItems([]);
        };
    }, [watchlistItems]);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSave = () => {
        setNewAssets(selectedItems);
        handleClose();

        // save items to db
        // axios
        //     .put(`/api/watchlists/${watchlistID}`, {
        //         data: selectedItems,
        //     })
        //     .then(() => {
        //         axios
        //             .get("/api/newcolumndata", {
        //                 params: {
        //                     columns: JSON.stringify(columns),
        //                     tickers: JSON.stringify(newItems),
        //                 },
        //             })
        //             .then((res) => {
        //                 const newWatchlistItems = selectedItems.slice();
        //                 const response = res.data;
        //                 for (let i = 0; i < indexOrder.length; ++i) {
        //                     newWatchlistItems[indexOrder[i]] = response[i];
        //                 }

        //                 setNewAssets(newWatchlistItems);
        //                 handleClose();
        //             })
        //             .catch((err) => alert(err.message));
        //     })
        //     .catch((err) => alert(err.message));
    };

    const handleToggleFromSelected = (item) => {
        const newResults = selectedItems.slice();
        const tickerIndex = findIndex(newResults, item.ticker, "ticker");
        if (tickerIndex === -1) {
            newResults.push(item);
        } else {
            newResults.splice(tickerIndex, 1);
        }

        setSelectedItems(newResults);
    };

    const handleSelectedTab = (event, newTab) => {
        setTab(newTab);
    };

    const filteredItems = items
        .filter(
            (item) =>
                item.ticker.toLowerCase().includes(searchValue.toLowerCase()) &&
                (tab === "all" || tab === item.tab)
        )
        .sort(
            (a, b) =>
                a.ticker.indexOf(searchValue) - b.ticker.indexOf(searchValue)
        );

    return (
        <div>
            <Dialog
                open={true}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth="md"
            >
                <ModalHeader id="customized-dialog-title" onClose={handleClose}>
                    Search by name or ticker
                    <TextField
                        id="outlined-full-width"
                        autoFocus
                        label="Search by name or ticker"
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
                </ModalHeader>
                <Divider />
                <DialogContent
                    sx={{
                        display: "flex",
                        padding: "0px",
                        overflow: "hidden",
                        minHeight: "400px",
                    }}
                >
                    <Grid container justifyContent="center" spacing={0}>
                        <Grid
                            item
                            xs={9}
                            sx={{
                                height: "100%",
                            }}
                        >
                            <Tabs
                                value={tab}
                                onChange={handleSelectedTab}
                                variant="fullWidth"
                            >
                                <Tab value="all" label="All" />
                                <Tab value="equity" label="Equity" />
                                <Tab value="etf" label="ETF" />
                                <Tab value="forex" label="Forex" />
                            </Tabs>
                            <Divider />
                            <div
                                style={{
                                    position: "relative",
                                    height: "calc(100% - 50px)",
                                    overflow: "auto",
                                }}
                            >
                                {filteredItems.map((item) => (
                                    <div key={item.ticker}>
                                        <StyledGridItem
                                            container
                                            wrap="nowrap"
                                            onClick={() =>
                                                handleToggleFromSelected(item)
                                            }
                                            justifyContent="flex-start"
                                            alignItems="center"
                                        >
                                            <Grid item xs={1}>
                                                <Typography>
                                                    {item.ticker}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <Typography>
                                                    {item.tab}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                {findIndex(
                                                    selectedItems,
                                                    item.ticker,
                                                    "ticker"
                                                ) !== -1 && (
                                                    <Check fontSize="medium" />
                                                )}
                                            </Grid>
                                        </StyledGridItem>
                                        <Divider />
                                    </div>
                                ))}
                            </div>
                        </Grid>
                        <Divider
                            orientation="vertical"
                            style={{ marginRight: "-1px" }}
                        />
                        <Grid
                            item
                            xs={3}
                            sx={{
                                position: "relative",
                                height: "100%",
                                overflowY: "auto",
                            }}
                        >
                            <StyledColumnTitle>
                                Selected Assets
                            </StyledColumnTitle>
                            <Divider />
                            {selectedItems.map((item) => (
                                <div
                                    key={item.ticker}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        cursor: "default",
                                        padding: "0 10px 0 36px",
                                    }}
                                >
                                    <Typography sx={{ userSelect: "none" }}>
                                        {item.ticker}
                                    </Typography>
                                    <IconButton
                                        onClick={() =>
                                            handleToggleFromSelected(item)
                                        }
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
                                items={selectedItems}
                                setItems={setSelectedItems}
                                handleRemove={handleToggleFromSelected}
                                lookupKey="ticker"
                            /> */}
                        </Grid>
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

export default SearchTickerModal;
