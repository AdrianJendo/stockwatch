import React from "react";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { ListItemIcon } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PropTypes from "prop-types";
import { useStyles } from "./sidebarStyle";
import { Link } from "react-router-dom";

const Sidebar = ({ drawerWidth }) => {
	const classes = useStyles({ drawerWidth })();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Drawer
				className={classes.drawer}
				variant="permanent"
				classes={{
					paper: classes.drawerPaper,
				}}
				anchor="left"
			>
				<div className={classes.toolbar} />
				<Divider />
				<List>
					{[
						{
							text: "Dashboard",
							icon: <DashboardIcon />,
							link: "/",
						},
						{
							text: "Watchlists",
							icon: <TrendingUpIcon />,
							link: "/watchlist",
						},
						{
							text: "Comparisons",
							icon: <CompareArrowsIcon />,
							link: "/comparisons",
						},
					].map((item) => (
						<ListItem
							button
							key={item.text}
							component={Link}
							to={item.link}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{[
						{
							text: "Fundamental Analysis",
							icon: <AttachMoneyIcon />,
						},
					].map((item) => (
						<ListItem button key={item.text}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
					))}
				</List>
			</Drawer>
		</div>
	);
};

Sidebar.propTypes = {
  drawerWidth: PropTypes.number,
};

export default Sidebar;
