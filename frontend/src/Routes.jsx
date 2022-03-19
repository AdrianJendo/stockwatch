import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "components/base/sidebar";
import Heatmap from "components/heatmap";
import Comparisons from "components/comparisons/comparisons";
import WatchlistView from "components//watchlists/watchlistView";
import StockGraph from "components/stockGraph/stockGraph";
import React from "react";
import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing(3),
		// width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		// height: "100vh",
	},
}));

function Routes() {
	const classes = useStyles();

	return (
		<Router>
			<div className="App">
				<Sidebar drawerWidth={drawerWidth} />
				<div className={classes.content}>
					<div className={classes.toolbar}>
						<Switch>
							<Route exact path="/" component={Heatmap} />
							{/* <Route
								exact
								path="/comparisons"
								component={Comparisons}
							/>
							<Route
								exact
								path="/watchlist"
								component={WatchlistView}
							/>
							<Route
								exact
								path="/ticker/:ticker"
								component={StockGraph}
							/> */}
						</Switch>
					</div>
				</div>
			</div>
		</Router>
	);
}

export default Routes;
