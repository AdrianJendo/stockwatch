import React from "react";
import PropTypes from "prop-types";

import {
	Switch,
	FormControlLabel,
	Tooltip,
	Typography,
	IconButton,
	Toolbar,
} from "@material-ui/core";
import { makeStyles, lighten } from "@material-ui/core/styles";
import { RotateLeft, Add, Delete, Create, Menu } from "@material-ui/icons";

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	denseSwitch: {
		marginLeft: "30px",
	},
	highlight:
		theme.palette.type === "light"
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(
						theme.palette.secondary.light,
						0.85
					),
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark,
			  },
	title: {
		flex: "1 1 100%",
	},
	toolbarText: {
		fontSize: "14px",
		marginLeft: "5px",
	},
	toolbarMenu: {
		marginLeft: "-2px",
		marginRight: "1px",
		positive: "relative",
		bottom: "2px",
	},
}));

const WatchlistTableToolbar = (props) => {
	const classes = useToolbarStyles();
	const {
		numSelected,
		dense,
		setDense,
		orderBy,
		setOrderBy,
		handleTickerModalOpen,
		handleEditColumnsModalOpen,
		setAnchorEl,
		handleDeleteRows,
	} = props;

	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};

	const handleResetOrder = () => {
		setOrderBy("");
	};

	const togglePopover = (event) => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<Toolbar className={classes.root}>
			<Tooltip title="Watchlists" placement="left-start">
				<IconButton
					aria-label="watchlists"
					className={classes.toolbarMenu}
					onClick={togglePopover}
				>
					<Menu />
				</IconButton>
			</Tooltip>
			<Typography
				className={classes.title}
				variant="h6"
				id="tableTitle"
				component="div"
			>
				Watchlist Title
				<FormControlLabel
					className={classes.denseSwitch}
					control={
						<Switch checked={dense} onChange={handleChangeDense} />
					}
					label="Dense padding"
				/>
			</Typography>

			{numSelected > 0 && (
				<Tooltip title="Delete" placement="left-start">
					<IconButton aria-label="delete" onClick={handleDeleteRows}>
						<Delete />
					</IconButton>
				</Tooltip>
			)}
			{orderBy !== "" && (
				<Tooltip title="Reset Order" placement="left-start">
					<IconButton
						aria-label="reload order"
						onClick={handleResetOrder}
					>
						<RotateLeft />
					</IconButton>
				</Tooltip>
			)}
			<Tooltip title="Edit Columns" placement="left-start">
				<IconButton
					aria-label="edit columns"
					onClick={handleEditColumnsModalOpen}
				>
					<Create />
					<Typography
						className={classes.toolbarText}
						id="toolbarText"
						component="div"
					>
						Columns
					</Typography>
				</IconButton>
			</Tooltip>
			<Tooltip title="Add a new Stock" placement="left-start">
				<IconButton
					aria-label="add stock"
					onClick={handleTickerModalOpen}
				>
					<Add />
					<Typography
						className={classes.toolbarText}
						id="toolbarText"
						component="div"
					>
						Add
					</Typography>
				</IconButton>
			</Tooltip>
		</Toolbar>
	);
};

WatchlistTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
	dense: PropTypes.bool.isRequired,
	setDense: PropTypes.func.isRequired,
	orderBy: PropTypes.string.isRequired,
	setOrderBy: PropTypes.func.isRequired,
	handleTickerModalOpen: PropTypes.func.isRequired,
	handleEditColumnsModalOpen: PropTypes.func.isRequired,
	setAnchorEl: PropTypes.func.isRequired,
	handleDeleteRows: PropTypes.func.isRequired,
};

export default WatchlistTableToolbar;
