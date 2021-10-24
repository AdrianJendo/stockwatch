import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "components/base/header";
import Sidebar from "components/base/sidebar";
import Heatmap from "components/heatmap";
import Comparisons from "components/comparisons";
import WatchlistView from "components//watchlists/watchlistView";
import TickerView from "components/tickerView";
import React from "react";
import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;
const headerHeight = 64;

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
				<Header headerHeight={headerHeight} />
				<Sidebar drawerWidth={drawerWidth} />
				<div className={classes.content}>
					<div className={classes.toolbar}>
						<Switch>
							<Route exact path="/" component={Heatmap} />
							<Route
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
								path="/ticker"
								component={TickerView}
							/>
						</Switch>
					</div>
				</div>
			</div>
		</Router>
	);
}

export default Routes;
