import React, { useState, useEffect } from "react";
import axios from "axios";
// import SearchTickerModal from "components/modals/searchTickerModal";
// import EditColumnsModal from "components/modals/editColumnsModal";
// import WatchlistsPopover from "components/modals/watchlistsPopover";
// import AddWatchlistModal from "components/modals/addWatchlistModal";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    Checkbox,
    TableRow,
    Paper,
    Button,
    styled,
} from "@mui/material";

import WatchlistTableHeader from "components/watchlists/watchlistHeader";
import WatchlistTableToolbar from "components/watchlists/watchlistToolbar";
import {
    getComparator,
    stableSort,
} from "components/watchlists/watchlistHelpers";

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

// const headCells = [
// 	{
// 		id: "marketCap",
// 		numeric: true,
// 		disablePadding: false,
// 		label: "Market Cap (USD)",
// 	},
// 	{
// 		id: "dailyPercent",
// 		numeric: true,
// 		disablePadding: false,
// 		label: "Daily % Change",
// 	},
// ];

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

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		width: "100%",
// 	},
// 	paper: {
// 		width: "100%",
// 		marginBottom: theme.spacing(2),
// 	},
// 	visuallyHidden: {
// 		border: 0,
// 		clip: "rect(0 0 0 0)",
// 		height: 1,
// 		margin: -1,
// 		overflow: "hidden",
// 		padding: 0,
// 		position: "absolute",
// 		top: 20,
// 		width: 1,
// 	},
// }));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    cursor: "default",
}));

const WatchlistView = () => {
    // const classes = useStyles();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [selected, setSelected] = useState([]);
    const [dense, setDense] = useState(false);
    const [tickerModalOpen, setTickerModalOpen] = useState(false);
    const [editColumnsModalOpen, setEditColumnsModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const [watchlists, setWatchlists] = useState([]);
    const [selectedWatchlist, setSelectedWatchlist] = useState(0); // index of selected watchlist

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
                { name: "Tesla Inc.", ticker: "TSLA", category: "equity" },
                { name: "Tesla Inc.", ticker: "TSLA", category: "equity" },
                { name: "Tesla Inc.", ticker: "TSLA", category: "equity" },
                { name: "Tesla Inc.", ticker: "TSLA", category: "equity" },
                { name: "Tesla Inc.", ticker: "TSLA", category: "equity" },
                { name: "Tesla Inc.", ticker: "TSLA", category: "equity" },
            ],
        });
        setSelectedWatchlist(newWatchlists.length - 1);
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
            const newSelected = watchlists[selectedWatchlist].tickers.map(
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
        for (let i = 0; i < watchlists[selectedWatchlist].tickers.length; ++i) {
            if (
                !selected.includes(
                    watchlists[selectedWatchlist].tickers[i].ticker
                )
            ) {
                newWatchlistItems.push(
                    watchlists[selectedWatchlist].tickers[i]
                );
            }
        }

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

    console.log(watchlists);

    return (
        <div
            style={{
                display: "flex",
                padding: "20px",
                margin: "auto",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
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
                                // rowCount={watchlists[selectedWatchlist].tickers.length}
                                headerCells={
                                    watchlists[selectedWatchlist].columns
                                }
                            />
                            {watchlists[selectedWatchlist].columns.length >
                                0 && (
                                <TableBody>
                                    {stableSort(
                                        watchlists[selectedWatchlist].tickers,
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
                                                    selectedWatchlist
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
            {/* {tickerModalOpen && (
				<SearchTickerModal
					watchlistID={watchlistID}
					handleClose={handleTickerModalClose}
					watchlistItems={watchlists[selectedWatchlist].tickers}
					setWatchlistItems={setWatchlistItems}
					columns={watchlists[selectedWatchlist].columns}
				/>
			)} */}
            {/* {editColumnsModalOpen && (
				<EditColumnsModal
					watchlistID={watchlistID}
					open={editColumnsModalOpen}
					handleClose={handleEditColumnsModalClose}
					columns={watchlists[selectedWatchlist].columns}
					setColumns={setColumns}
					watchlistItems={watchlists[selectedWatchlist].tickers}
					setWatchlistItems={setWatchlistItems}
				/>
			)} */}
            {/* <WatchlistsPopover
				anchorEl={anchorEl}
				handleClose={handlePopoverClose}
				setWatchlistItems={setWatchlistItems}
				watchlists={watchlists}
				setWatchlists={setWatchlists}
				setColumns={setColumns}
				selectedID={watchlistID}
				setSelectedID={setWatchlistID}
			/> */}
            {watchlists.length ? (
                <div>
                    {watchlists[selectedWatchlist].tickers.length === 0 && (
                        <div>
                            Your watchlist is empty, try adding some rows using
                            the button on the right of the toolbar
                        </div>
                    )}
                    {watchlists[selectedWatchlist].columns.length === 0 &&
                        watchlists[selectedWatchlist].tickers.length > 0 && (
                            <div>Try Adding some columns</div>
                        )}
                </div>
            ) : undefined}
        </div>
    );
};

export default WatchlistView;
