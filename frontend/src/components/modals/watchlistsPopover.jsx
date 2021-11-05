import React from "react";
import axios from "axios";
import {
	Popover,
	Typography,
	Button,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { Settings, Add } from "@material-ui/icons";
import { RadioButtonUnchecked, RadioButtonChecked } from "@material-ui/icons";
import { useState } from "react";

import AddWatchlistModal from "./addWatchlistModal";
import EditWatchlistsModal from "./editWatchlistsModal";
import findWatchlist from "components/helpers/findWatchlist";

const useStyles = makeStyles((theme) => ({
	headerRow: {
		display: "flex",
	},
	typography: {
		padding: theme.spacing(2),
	},
	headerButton: {
		position: "relative",
		transform: "translate(0, 30%)",
		height: "50%",
		fontSize: "12px",
	},
	popover: {
		overflow: "hidden",
	},
	list: {
		position: "relative",
		maxHeight: "min(300px, calc(50vh - 30px))",
		overflow: "auto",
	},
}));

const WatchlistsPopover = (props) => {
	const [addWatchlistModalOpen, setAddWatchlistModalOpen] = useState(false);
	const [editWatchlistsModalOpen, setEditWatchlistsModalOpen] =
		useState(false);

	const {
		anchorEl,
		handleClose,
		setWatchlistItems,
		watchlists,
		setWatchlists,
		setColumns,
		selectedID,
		setSelectedID,
	} = props;
	const classes = useStyles();
	const open = anchorEl !== null;

	const handleSelectWatchlist = (id) => {
		if (id !== null) {
			axios
				.get(`/api/watchlists/${id}`)
				.then((res) => {
					const watchlist = res.data;
					const columns = watchlist.columns;
					const tickers = watchlist.tickers;
					axios
						.get("/api/newcolumndata", {
							params: {
								columns: JSON.stringify(columns),
								tickers: JSON.stringify(tickers),
							},
						})
						.then((res) => {
							setSelectedID(id);
							setColumns(columns);
							setWatchlistItems(res.data);
						})
						.catch((err) => alert(err.message));
				})
				.catch((err) => alert(err.message));
		}
	};

	const handleAddWatchlistModalClose = (id) => {
		if (id !== selectedID) {
			handleSelectWatchlist(id);
		}
		setAddWatchlistModalOpen(false);
	};

	const handleAddWatchlistModalOpen = () => {
		setAddWatchlistModalOpen(true);
	};

	const handleEditWatchlistModalClose = (id) => {
		if (id !== selectedID) {
			handleSelectWatchlist(id);
		}
		setEditWatchlistsModalOpen(false);
	};

	const handleEditWatchlistModalOpen = () => {
		setEditWatchlistsModalOpen(true);
	};

	return (
		<Popover
			id={open ? "simple-popover" : undefined}
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "left",
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "left",
			}}
			classes={{ paper: classes.popover }}
		>
			<div className={classes.headerRow}>
				<Typography className={classes.typography}>
					My Watchlists
				</Typography>
				<Button
					className={classes.headerButton}
					onClick={handleAddWatchlistModalOpen}
				>
					<Add />
					New
				</Button>
				<Button
					className={classes.headerButton}
					onClick={handleEditWatchlistModalOpen}
				>
					<Settings />
					Manage
				</Button>
			</div>
			<List className={classes.list}>
				{watchlists.map((watchlist) => (
					<ListItem
						button
						onClick={() => handleSelectWatchlist(watchlist.id)}
						key={watchlist.id}
					>
						<ListItemIcon>
							{selectedID === watchlist.id ? (
								<RadioButtonChecked />
							) : (
								<RadioButtonUnchecked />
							)}
						</ListItemIcon>
						<ListItemText
							secondary={watchlist.name}
							classes={
								selectedID === watchlist.id
									? {
											secondary:
												classes.selectedWatchlist,
									  }
									: {}
							}
						/>
					</ListItem>
				))}
			</List>
			<AddWatchlistModal
				open={addWatchlistModalOpen}
				handleClose={handleAddWatchlistModalClose}
				watchlists={watchlists}
				setWatchlists={setWatchlists}
				selectedID={selectedID}
			/>
			<EditWatchlistsModal
				open={editWatchlistsModalOpen}
				handleClose={handleEditWatchlistModalClose}
				watchlists={watchlists}
				setWatchlists={setWatchlists}
				selectedID={selectedID}
			/>
		</Popover>
	);
};

export default WatchlistsPopover;
