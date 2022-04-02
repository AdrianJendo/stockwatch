import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchTickerModal from "components/modals/searchTickerModal";
import EditColumnsModal from "components/modals/editColumnsModal";
import WatchlistsPopover from "components/modals/watchlistsPopover";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    Checkbox,
    TableRow,
    Paper,
    Button,
    Typography,
    styled,
} from "@mui/material";

import WatchlistTableHeader from "components/watchlists/watchlistHeader";
import WatchlistTableToolbar from "components/watchlists/watchlistToolbar";
import {
    getComparator,
    stableSort,
} from "components/watchlists/watchlistHelpers";

// !! COMBINE finaincialmodellingprep and alpha vantage to build this out !!!!!!!!!

const defaultColumns = [
    {
        id: "name",
        label: "Name",
    },
    {
        id: "ticker",
        label: "Ticker",
    },
    {
        id: "category",
        label: "Category",
    },
];

// const rows = [
// 	{
// 		ticker: "AAPL",
// 		name: "Apple",
// 		price: 150,
// 		marketCap: "2.11 T",
// 		dailyPercent: 0.5,
// 	},
// 	{
// 		ticker: "MSFT",
// 		name: "Microsoft",
// 		price: 270,
// 		marketCap: "2 T",
// 		dailyPercent: 4.9,
// 	},
// 	{
// 		ticker: "AMZN",
// 		name: "Amazon",
// 		price: 3500,
// 		marketCap: "1.6 T",
// 		dailyPercent: -6.0,
// 	},
// 	{
// 		ticker: "GOOGL",
// 		name: "Google",
// 		price: 2700,
// 		marketCap: "1.85 T",
// 		dailyPercent: 4.0,
// 	},
// 	{
// 		ticker: "USD/BTC",
// 		name: "USD / Bitcoin",
// 		price: 50000,
// 		marketCap: "1 T",
// 		dailyPercent: -3.9,
// 	},
// 	{
// 		ticker: "YETI",
// 		name: "Yeti",
// 		price: 105,
// 		marketCap: "10 B",
// 		dailyPercent: 6.5,
// 	},
// 	{
// 		ticker: "CRM",
// 		name: "Salesforce",
// 		price: 250,
// 		marketCap: "220 B",
// 		dailyPercent: 4.3,
// 	},
// 	{
// 		ticker: "AMD",
// 		name: "AMD",
// 		price: 110,
// 		marketCap: "110 B",
// 		dailyPercent: 0.0,
// 	},
// 	{
// 		ticker: "NVDA",
// 		name: "Nvidia",
// 		price: 200,
// 		marketCap: "550 B",
// 		dailyPercent: -7.0,
// 	},
// 	{
// 		ticker: "DE",
// 		name: "Deere & Co.",
// 		price: 360,
// 		marketCap: "150 B",
// 		dailyPercent: 4.0,
// 	},
// ];

const StyledTableCell = styled(TableCell)(() => ({
    cursor: "default",
}));

const WatchlistView = () => {
    const [order, setOrder] = useState("asc"); // asc or desc
    const [orderBy, setOrderBy] = useState(""); // property to order by (ticker, name, price, etc.)
    const [selected, setSelected] = useState([]); // array of selected rows
    const [dense, setDense] = useState(false); // dense padding
    const [tickerModalOpen, setTickerModalOpen] = useState(false); // true when ticker modal open
    const [editColumnsModalOpen, setEditColumnsModalOpen] = useState(false); // true when edit columns modal open
    const [anchorEl, setAnchorEl] = useState(null); // needed for watchlists popover

    const [watchlists, setWatchlists] = useState([]);
    const [watchlistIndex, setWatchlistIndex] = useState(0); // index of selected watchlist

    useEffect(() => {
        // axios
        //     .get("/api/watchlists")
        //     .then((res) => {
        //         const watchlists = res.data;
        //         if (watchlists.length) {
        //             axios
        //                 .get(`/api/watchlists/${watchlists[0].id}`)
        //                 .then((res) => {
        //                     const watchlist = res.data;
        //                     const columns = watchlist.columns;
        //                     const tickers = watchlist.tickers;
        //                     axios
        //                         .get("/api/newcolumndata", {
        //                             params: {
        //                                 columns: JSON.stringify(columns),
        //                                 tickers: JSON.stringify(tickers),
        //                             },
        //                         })
        //                         .then((res) => {
        //                             setWatchlistID(watchlist.id);
        //                             setColumns(columns);
        //                             setWatchlistItems(res.data);
        //                             setWatchlists(watchlists);
        //                         })
        //                         .catch((err) => alert(err.message));
        //                 })
        //                 .catch((err) => alert(err.message));
        //         }
        //     })
        //     .catch((err) => alert(err.message));
    }, []);

    const createWatchlist = () => {
        const newWatchlists = watchlists.slice();
        newWatchlists.push({
            name: `TEST${watchlists.length}`,
            id: watchlists.length,
            columns: defaultColumns,
            tickers: [
                { name: "Facebook", ticker: "FB", category: "equity" },
                { name: "Apple Inc.", ticker: "AAPL", category: "equity" },
                { name: "Amazon.com.", ticker: "AMZN", category: "equity" },
                { name: "Microsoft", ticker: "MSFT", category: "equity" },
                { name: "Tesla Inc.", ticker: "TSLA", category: "equity" },
            ],
        });
        setWatchlistIndex(newWatchlists.length - 1);
        setWatchlists(newWatchlists);
    };

    const handleEditColumnsModalOpen = () => {
        setEditColumnsModalOpen(true);
    };

    const handleTickerModalOpen = () => {
        setTickerModalOpen(true);
    };

    const handleTickerModalClose = () => {
        setTickerModalOpen(false);
    };

    const handleEditColumnsModalClose = () => {
        setEditColumnsModalOpen(false);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = watchlists[watchlistIndex].tickers.map(
                (n) => n.ticker
            );
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleDeleteRows = () => {
        const newWatchlistItems = [];
        for (let i = 0; i < watchlists[watchlistIndex].tickers.length; ++i) {
            if (
                !selected.includes(watchlists[watchlistIndex].tickers[i].ticker)
            ) {
                newWatchlistItems.push(watchlists[watchlistIndex].tickers[i]);
            }
        }
        setSelected([]);
        const newWatchlists = watchlists.slice();
        newWatchlists[watchlistIndex].tickers = newWatchlistItems;

        // axios
        //     .put(`/api/watchlists/${watchlistID}`, {
        //         data: newWatchlistItems,
        //     })
        //     .then(() => {
        //         setSelected([]);
        //         setWatchlistItems(newWatchlistItems);
        //     })
        //     .catch((err) => alert(err.message));
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const setWatchlistItems = (newItems) => {
        const newWatchlists = watchlists.slice();
        newWatchlists[watchlistIndex].tickers = newItems;
        setWatchlists(newWatchlists);
    };

    const setNewAssets = async (selectedAssets) => {
        const columns = watchlists[watchlistIndex].columns;

        const existingTickers = new Set(
            watchlists[watchlistIndex].tickers.map((ticker) => ticker.ticker)
        );
        const newTickers = selectedAssets.reduce((curNewTickers, curTicker) => {
            if (!existingTickers.has(curTicker.ticker)) {
                curNewTickers.push(curTicker);
            }
            return curNewTickers;
        }, []);

        const newWatchlists = watchlists.slice();
        if (newTickers.length) {
            const timePeriods = { SMA: [], EMA: [] };
            columns.forEach((item) => {
                if (item.label.includes("SMA")) {
                    timePeriods.SMA.push(parseInt(item.label.split(" ")[0]));
                } else if (item.label.includes("EMA")) {
                    timePeriods.EMA.push(parseInt(item.label.split(" ")[0]));
                }
            });

            const lookupFields = columns.reduce((curFields, curColumn) => {
                if (curColumn.apiField && !curFields.has(curColumn.apiField)) {
                    curFields.add(curColumn.apiField);
                }
                return curFields;
            }, new Set([]));

            const columnDataResp = await axios.get("/api/watchlists/columns", {
                params: {
                    tickers: JSON.stringify(
                        newTickers.map((ticker) => ticker.ticker)
                    ),
                    lookup_fields: JSON.stringify([...lookupFields]),
                    time_periods: JSON.stringify(timePeriods),
                },
            });
            newWatchlists[watchlistIndex].tickers = selectedAssets.map(
                (ticker) => {
                    if (
                        newTickers.find(
                            (newTicker) => newTicker.ticker === ticker.ticker
                        )
                    ) {
                        columns.forEach((column) => {
                            if (column.apiField) {
                                ticker[column.id] =
                                    columnDataResp.data[ticker.ticker][
                                        column.id
                                    ];
                            }
                        });
                    }
                    return ticker;
                }
            );
        } else {
            newWatchlists[watchlistIndex].tickers = selectedAssets;
        }

        setWatchlists(newWatchlists);
    };

    const setColumns = (newColumns) => {
        const newWatchlists = watchlists.slice();
        newWatchlists[watchlistIndex].columns = newColumns;
        setWatchlists(newWatchlists);
    };

    return (
        <div
            style={{
                display: "flex",
                padding: "20px",
                margin: "auto",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
                flexWrap: "wrap",
            }}
        >
            {watchlists.length > 0 ? (
                <Paper sx={{ width: "100%", padding: "10px" }}>
                    <WatchlistTableToolbar
                        numSelected={selected.length}
                        dense={dense}
                        setDense={setDense}
                        orderBy={orderBy}
                        setOrderBy={setOrderBy}
                        handleTickerModalOpen={handleTickerModalOpen}
                        handleEditColumnsModalOpen={handleEditColumnsModalOpen}
                        setAnchorEl={setAnchorEl}
                        handleDeleteRows={handleDeleteRows}
                    />

                    <TableContainer
                        sx={{
                            maxHeight: `calc(100vh - 200px)`,
                            overflowy: "scroll",
                        }}
                    >
                        <Table
                            aria-labelledby="tableTitle"
                            size={dense ? "small" : "medium"}
                            aria-label="watchlist table"
                            stickyHeader
                        >
                            <WatchlistTableHeader
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                headerCells={watchlists[watchlistIndex].columns}
                            />
                            {watchlists[watchlistIndex].columns.length > 0 && (
                                <TableBody>
                                    {stableSort(
                                        watchlists[watchlistIndex].tickers,
                                        getComparator(order, orderBy)
                                    ).map((row, index) => {
                                        const isItemSelected = isSelected(
                                            row.ticker
                                        );
                                        const labelId = `watchlist-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) =>
                                                    handleClick(
                                                        event,
                                                        row.ticker
                                                    )
                                                }
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.name}
                                                selected={isItemSelected}
                                            >
                                                <StyledTableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            "aria-labelledby":
                                                                labelId,
                                                        }}
                                                    />
                                                </StyledTableCell>

                                                {watchlists[
                                                    watchlistIndex
                                                ].columns.map((column, i) =>
                                                    i === 0 ? (
                                                        <StyledTableCell
                                                            key={column.id}
                                                            component="th"
                                                            id={labelId}
                                                            scope="row"
                                                            padding="none"
                                                        >
                                                            {row[column.id]}
                                                        </StyledTableCell>
                                                    ) : (
                                                        <StyledTableCell
                                                            key={column.id}
                                                            align="right"
                                                        >
                                                            {row[column.id]}
                                                        </StyledTableCell>
                                                    )
                                                )}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                </Paper>
            ) : (
                <Button variant="contained" onClick={() => createWatchlist()}>
                    Create a New Watchlist
                </Button>
            )}
            {tickerModalOpen && (
                <SearchTickerModal
                    handleClose={handleTickerModalClose}
                    watchlistItems={watchlists[watchlistIndex].tickers}
                    setNewAssets={setNewAssets}
                />
            )}
            {editColumnsModalOpen && (
                <EditColumnsModal
                    open={editColumnsModalOpen}
                    handleClose={handleEditColumnsModalClose}
                    columns={watchlists[watchlistIndex].columns}
                    setColumns={setColumns}
                    watchlistItems={watchlists[watchlistIndex].tickers}
                    setWatchlistItems={setWatchlistItems}
                />
            )}
            <WatchlistsPopover
                anchorEl={anchorEl}
                handleClose={handlePopoverClose}
                setWatchlistItems={setWatchlistItems}
                watchlists={watchlists}
                setWatchlists={setWatchlists}
                setColumns={setColumns}
            />
            {watchlists.length ? (
                <div>
                    {watchlists[watchlistIndex].tickers.length === 0 && (
                        <Typography sx={{ padding: "20px" }}>
                            Your watchlist is empty, try adding some rows using
                            the button on the right of the toolbar
                        </Typography>
                    )}
                    {watchlists[watchlistIndex].columns.length === 0 &&
                        watchlists[watchlistIndex].tickers.length > 0 && (
                            <Typography sx={{ padding: "20px" }}>
                                Try Adding some columns
                            </Typography>
                        )}
                </div>
            ) : undefined}
        </div>
    );
};

export default WatchlistView;
