import React from "react";
// import axios from "axios";
import {
    Popover,
    Typography,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    styled,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { RadioButtonUnchecked, RadioButtonChecked } from "@mui/icons-material";
import { useState } from "react";

import AddWatchlistModal from "components/modals/addWatchlistModal";
import EditWatchlistsModal from "components/modals/editWatchlistsModal";

const StyledButton = styled(Button)(() => ({
    position: "relative",
    transform: "translate(0, 30%)",
    height: "50%",
    fontSize: "12px",
}));

// typography: {
//     padding: theme.spacing(2),
// },

const WatchlistsPopover = (props) => {
    const [addWatchlistModalOpen, setAddWatchlistModalOpen] = useState(false);
    const [editWatchlistsModalOpen, setEditWatchlistsModalOpen] =
        useState(false);

    const {
        anchorEl,
        handleClose,
        // setWatchlistItems,
        watchlists,
        setWatchlists,
        // setColumns,
        selectedID,
        // setSelectedID,
    } = props;
    const open = anchorEl !== null;

    const handleSelectWatchlist = (id) => {
        if (id !== null) {
            // axios
            //     .get(`/api/watchlists/${id}`)
            //     .then((res) => {
            //         const watchlist = res.data;
            //         const columns = watchlist.columns;
            //         const tickers = watchlist.tickers;
            //         axios
            //             .get("/api/newcolumndata", {
            //                 params: {
            //                     columns: JSON.stringify(columns),
            //                     tickers: JSON.stringify(tickers),
            //                 },
            //             })
            //             .then((res) => {
            //                 setSelectedID(id);
            //                 setColumns(columns);
            //                 setWatchlistItems(res.data);
            //             })
            //             .catch((err) => alert(err.message));
            //     })
            //     .catch((err) => alert(err.message));
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

    // const handleEditWatchlistModalOpen = () => {
    //     setEditWatchlistsModalOpen(true);
    // };

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
        >
            <div
                style={{
                    display: "flex",
                    margin: "20px",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography>My Watchlists</Typography>
                <StyledButton onClick={handleAddWatchlistModalOpen}>
                    <Add />
                    New
                </StyledButton>
                {/* <StyledButton onClick={handleEditWatchlistModalOpen}>
                    <Settings />
                    Manage
                </StyledButton> */}
            </div>
            <List
                sx={{
                    position: "relative",
                    maxHeight: "min(300px, calc(50vh - 30px))",
                    overflow: "auto",
                }}
            >
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
                        <ListItemText secondary={watchlist.name} />
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
