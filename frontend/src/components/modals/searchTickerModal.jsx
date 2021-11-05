import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

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
	IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search, Check, Menu, Clear } from "@material-ui/icons";
import DialogTitle from "components/modals/modalHeader";
import findIndex from "components/helpers/findIndex";
import DragDropList from "components/dragDrop/dragDropList";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		height: "100%",
		overflowY: "auto",
	},
	gridItem: {
		textAlign: "center",
		color: theme.palette.text.secondary,
		height: "50px",
		"&:hover": {
			cursor: "pointer",
			backgroundColor: alpha(theme.palette.info.main, 0.15),
		},
		"-webkit-user-select": "none",
		"-moz-user-select": "none",
		"-ms-user-select": "none",
		"user-select": "none",
		padding: theme.spacing(0, 3),
	},
	columnTitle: {
		height: "30px",
		position: "sticky",
		top: 0,
		backgroundColor: theme.palette.background.paper,
		zIndex: 1,
		margin: theme.spacing(0, 3),
	},

	resultsList: {
		position: "relative",
		height: "calc(100% - 40px)",
		overflow: "auto",
		padding: "none",
	},
	searchDialog: {
		height: "80vh",
	},
	rowCheckIcon: {
		padding: "none",
		overflow: "visible",
	},
	content: {
		display: "flex",
		minHeight: "100px",
		padding: 0,
	},
	selectedButton: {
		backgroundColor: "lightBlue",
		display: "block",
		marginLeft: "auto",
		marginRight: "auto",
		"&:hover": {
			backgroundColor: "lightBlue",
		},
	},
	normalButton: {
		display: "block",
		marginLeft: "auto",
		marginRight: "auto",
		backgroundColor: theme.palette.grey[500],
	},
}));

// Use ticker as ID (ie: don't remove it even when not present in the table)
const results = [
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
]; //API call made to get results after each keystroke

const SearchTickerModal = (props) => {
	const {
		watchlistItems,
		setWatchlistItems,
		handleClose,
		columns,
		watchlistID,
	} = props;
	const classes = useStyles();
	const [searchValue, setSearchValue] = useState("");
	const [selectedResults, setSelectedResults] = useState([]);
	const [category, setCategory] = useState("all");

	useEffect(() => {
		const newSelectedResults = watchlistItems.slice();
		setSelectedResults(newSelectedResults);

		return () => {
			setSelectedResults([]);
		};
	}, []);

	const handleSearch = (e) => {
		setSearchValue(e.target.value);
	};

	const handleSave = () => {
		const newItems = [];
		const indexOrder = []; // Indices that the new items appear at
		selectedResults.map((item, i) => {
			const index = findIndex(watchlistItems, item.ticker, "ticker");
			if (index !== -1) {
				return null;
			} else {
				newItems.push(item);
				indexOrder.push(i);
			}
		});

		axios
			.put(`/api/watchlists/${watchlistID}`, {
				data: selectedResults,
			})
			.then(() => {
				axios
					.get("/api/newcolumndata", {
						params: {
							columns: JSON.stringify(columns),
							tickers: JSON.stringify(newItems),
						},
					})
					.then((res) => {
						const newWatchlistItems = selectedResults.slice();
						const response = res.data;
						for (let i = 0; i < indexOrder.length; ++i) {
							newWatchlistItems[indexOrder[i]] = response[i];
						}

						setWatchlistItems(newWatchlistItems);
						handleClose();
					})
					.catch((err) => alert(err.message));
			})
			.catch((err) => alert(err.message));
	};

	const handleToggleFromResults = (item) => {
		const newResults = selectedResults.slice();
		const tickerIndex = findIndex(newResults, item.ticker, "ticker");
		if (tickerIndex === -1) {
			newResults.push(item);
		} else {
			newResults.splice(tickerIndex, 1);
		}

		setSelectedResults(newResults);
	};

	const handleSelectCategory = (newCategory) => {
		setCategory(newCategory.toLowerCase());
	};

	const filteredResults = results
		.filter(
			(result) =>
				result.ticker
					.toLowerCase()
					.includes(searchValue.toLowerCase()) &&
				(category === "all" || category === result.category)
		)
		.sort(
			(a, b) =>
				a.ticker.indexOf(searchValue) - b.ticker.indexOf(searchValue)
		);

	//Right side like piinpint
	// New entries are green
	// Removed entries are crossed out with undo button
	// Can search up ticker and click on button as well to toggle it

	return (
		<div>
			<Dialog
				open={true}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth
				maxWidth="md"
				classes={{ paper: classes.searchDialog }}
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Search by name or ticker
					<TextField
						id="outlined-full-width"
						autoFocus
						label="Search by name or ticker"
						placeholder="Search..."
						// helperText="Full width!"
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
				<DialogContent classes={{ root: classes.content }}>
					<Grid container justifyContent="center" spacing={0}>
						<Grid item xs={9} className={classes.root}>
							{/* https://material-ui.com/components/tabs/ */}
							{/* <AppBar position="static" color="inherit"> */}
							{/* <Tabs
								value={value}
								onChange={handleChange}
								indicatorColor="primary"
								textColor="primary"
								variant="fullWidth"
							>
								<Tab label="All" />
								<Tab label="Equities" />
								<Tab label="Forex" />
								<Tab label="ETFs" />
							</Tabs> */}
							{/* </AppBar> */}
							<Grid container>
								<Grid item xs>
									<Button
										onClick={() =>
											handleSelectCategory("all")
										}
										className={
											category === "all"
												? classes.selectedButton
												: classes.normalButton
										}
									>
										All
									</Button>
								</Grid>
								<Grid item xs>
									<Button
										onClick={() =>
											handleSelectCategory("equity")
										}
										className={
											category === "equity"
												? classes.selectedButton
												: classes.normalButton
										}
									>
										Equities
									</Button>
								</Grid>
								<Grid item xs>
									<Button
										onClick={() =>
											handleSelectCategory("etf")
										}
										className={
											category === "etf"
												? classes.selectedButton
												: classes.normalButton
										}
									>
										ETFs
									</Button>
								</Grid>
								<Grid item xs>
									<Button
										onClick={() =>
											handleSelectCategory("forex")
										}
										className={
											category === "forex"
												? classes.selectedButton
												: classes.normalButton
										}
									>
										Forex
									</Button>
								</Grid>
							</Grid>
							<Divider />
							<div className={classes.resultsList}>
								{filteredResults.map((result, index) => (
									<div key={index}>
										<Grid
											container
											wrap="nowrap"
											className={classes.gridItem}
											onClick={() =>
												handleToggleFromResults(result)
											}
											justifyContent="flex-start"
											alignItems="center"
										>
											<Grid item xs={1}>
												<Typography>
													{result.ticker}
												</Typography>
											</Grid>
											<Grid item xs={10}>
												<Typography>
													{result.category}
												</Typography>
											</Grid>
											<Grid item xs={1}>
												{findIndex(
													selectedResults,
													result.ticker,
													"ticker"
												) !== -1 && (
													<Check
														fontSize="medium"
														className={
															classes.rowCheckIcon
														}
													/>
												)}
											</Grid>
										</Grid>
										<Divider />
									</div>
								))}
							</div>
						</Grid>
						<Divider
							orientation="vertical"
							style={{ marginRight: "-1px" }}
						/>
						<Grid item xs={3} className={classes.root}>
							<Typography className={classes.columnTitle}>
								Selected Assets
							</Typography>
							<DragDropList
								items={selectedResults}
								setItems={setSelectedResults}
								handleRemove={handleToggleFromResults}
								lookupKey="ticker"
							/>
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

SearchTickerModal.propTypes = {
	watchlistItems: PropTypes.array.isRequired,
	setWatchlistItems: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired,
	columns: PropTypes.array.isRequired,
	watchlistID: PropTypes.number.isRequired,
};

export default SearchTickerModal;
