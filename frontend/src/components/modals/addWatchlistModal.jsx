import React, { useState } from "react";
// import axios from "axios";

import {
    Dialog,
    TextField,
    DialogActions,
    Button,
    InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import ModalHeader from "components/modals/modalHeader";

const AddWatchlistModal = (props) => {
    const { open, handleClose, watchlists, setWatchlists, selectedID } = props;
    const [searchValue, setSearchValue] = useState("");

    const closeAddWatchlistModal = (id) => {
        handleClose(id);
        setSearchValue("");
    };

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSubmit = (e) => {
        if (e.key === "Enter") {
            handleCreateWatchlist(e.target.value);
        }
    };

    const handleCreateWatchlist = (name) => {
        // Remove any trailing spaces
        while (name.slice(-1) === " ") {
            name = name.substring(0, name.length - 1);
        }

        const orderedWatchlists = watchlists.sort((a, b) => a.id - b.id);
        let count = 1;
        for (const watchlist of orderedWatchlists) {
            const openBracketIndex = watchlist.name.indexOf("(");
            const closeBracketIndex = watchlist.name.indexOf(")");
            if (
                watchlist.name === name ||
                (watchlist.name.indexOf(name) === 0 &&
                    openBracketIndex === name.length + 1 &&
                    closeBracketIndex === watchlist.name.length - 1 &&
                    parseInt(
                        watchlist.name.substring(
                            openBracketIndex + 1,
                            closeBracketIndex
                        )
                    ) === count &&
                    count !== 1)
            ) {
                count += 1;
            }
        }
        const newWatchlist = {
            columns: [],
            tickers: [],
        };
        if (count > 1) {
            newWatchlist.name = `${name} (${count})`;
        } else {
            newWatchlist.name = name;
        }

        // axios
        //     .post("/api/watchlists", newWatchlist)
        //     .then((res) => {
        //         const updatedWatchlists = res.data[0];
        //         const newWatchlistID = res.data[1];
        //         setWatchlists(updatedWatchlists);
        //         closeAddWatchlistModal(newWatchlistID);
        //     })
        // .catch((err) => alert(err.message));
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => closeAddWatchlistModal(selectedID)}
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth="md"
            >
                <ModalHeader
                    id="customized-dialog-title"
                    onClose={() => closeAddWatchlistModal(selectedID)}
                >
                    Create New Watchlist
                    <TextField
                        id="outlined-full-width"
                        autoFocus
                        label="New Watchlist Name"
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
                        onKeyPress={handleSubmit}
                        autoComplete="off"
                    />
                </ModalHeader>
                <DialogActions>
                    <Button
                        onClick={() => handleCreateWatchlist(searchValue)}
                        color="primary"
                    >
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddWatchlistModal;
