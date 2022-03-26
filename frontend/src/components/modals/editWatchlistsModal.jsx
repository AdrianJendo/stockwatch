import React, { useEffect, useState } from "react";
// import axios from "axios";

import {
    Dialog,
    DialogActions,
    Button,
    DialogContent,
    ListItem,
    IconButton,
    Checkbox,
    TextField,
} from "@mui/material";
import { Create, FileCopy, Menu, DeleteForever } from "@mui/icons-material";
import DialogTitle from "components/modals/modalHeader";
// import { Container, Draggable } from "react-smooth-dnd";
// import { applyDrag } from "components/dragDrop/utils";
import findIndex from "components/helpers/findIndex";

const EditWatchlistsModal = (props) => {
    const { open, handleClose, watchlists, setWatchlists, selectedID } = props;
    const [currentWatchlists, setCurrentWatchlists] = useState([]);
    const [selectedWatchlists, setSelectedWatchlists] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [isSelectedDeleted, setIsSelectedDeleted] = useState(false);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const handleUpdateName = (e) => {
        if (e.key === "Enter") {
            const newWatchlists = currentWatchlists.slice();

            const updatedWatchlist = Object.assign(
                {},
                currentWatchlists[editIndex]
            );
            const prevName = updatedWatchlist.name;
            updatedWatchlist.name = e.target.value;

            newWatchlists.splice(editIndex, 1, updatedWatchlist);

            // If the current watchlist was selected, update it in the selectedWatchlists
            const index = findIndex(selectedWatchlists, prevName, "name");
            if (index !== -1) {
                const newSelectedWatchlists = selectedWatchlists.slice();
                newSelectedWatchlists.splice(index, 1, updatedWatchlist);
                setSelectedWatchlists(newSelectedWatchlists);
            }

            setCurrentWatchlists(newWatchlists);
            setEditIndex(null);
            setSearchValue("");
        }
    };

    useEffect(() => {
        if (open) {
            setCurrentWatchlists(watchlists.slice());
        }

        return () => {
            setSearchValue("");
            setEditIndex(null);
        };
    }, [open, watchlists]);

    const handleSelectWatchlist = (watchlist) => {
        const selectedIndex = selectedWatchlists.indexOf(watchlist);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedWatchlists, watchlist);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedWatchlists.slice(1));
        } else if (selectedIndex === selectedWatchlists.length - 1) {
            newSelected = newSelected.concat(selectedWatchlists.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedWatchlists.slice(0, selectedIndex),
                selectedWatchlists.slice(selectedIndex + 1)
            );
        }

        setSelectedWatchlists(newSelected);
    };

    const handleEditWatchlist = (index) => {
        setEditIndex(index);
    };

    const handleDelete = () => {
        const newWatchlists = currentWatchlists.slice();
        for (const watchlist of selectedWatchlists) {
            if (watchlist.id === selectedID) {
                setIsSelectedDeleted(true);
            }
            const index = newWatchlists.indexOf(watchlist);
            newWatchlists.splice(index, 1);
        }

        setCurrentWatchlists(newWatchlists);
        setSelectedWatchlists([]);
    };

    const handleRevertChanges = () => {
        setCurrentWatchlists(watchlists);
        setIsSelectedDeleted(false);
        setSelectedWatchlists([]);
    };

    const handleSave = () => {
        //Do some kind of alert to show that the list was saved successfully
        // axios
        // 	.put("/api/watchlists", {
        // 		data: currentWatchlists,
        // 	})
        // 	.then(() => {
        // 		const id = currentWatchlists.length
        // 			? isSelectedDeleted
        // 				? currentWatchlists[0].id
        // 				: selectedID
        // 			: null;
        // 		setWatchlists(currentWatchlists);
        // 		handleClose(id);
        // 	})
        // 	.catch((err) => alert(err.message));
    };

    const checkArraysEqual = (arr1, arr2) => {
        for (let i = 0; i < arr1.length; ++i) {
            if (i >= arr2.length || arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => handleClose(selectedID)}
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth="md"
            >
                <DialogTitle
                    id="customized-dialog-title"
                    onClose={() => handleClose(selectedID)}
                >
                    Manage Watchlists
                </DialogTitle>
                <DialogContent>
                    New Watchlist Button
                    {/* <Container
						onDrop={(e) =>
							setCurrentWatchlists(
								applyDrag(currentWatchlists, e)
							)
						}
						style={{ height: "calc(100% - 30px)" }}
					>
						{currentWatchlists.map((watchlist, index) => {
							const isItemSelected =
								selectedWatchlists.indexOf(watchlist) !== -1;
							return (
								<Draggable key={index}>
									<div className="draggable-item">
										<ListItem style={{ display: "inline" }}>
											<Checkbox
												onClick={() =>
													handleSelectWatchlist(
														watchlist
													)
												}
												checked={isItemSelected}
												inputProps={{
													"aria-labelledby": `watchlist-${index}`,
												}}
											/>
											{editIndex === index ? (
												<TextField
													autoFocus
													placeholder={watchlist.name}
													margin="dense"
													value={searchValue}
													onChange={handleSearch}
													onKeyPress={
														handleUpdateName
													}
												/>
											) : (
												watchlist.name
											)}
											<IconButton
												onClick={() =>
													handleEditWatchlist(index)
												}
											>
												<Create />
											</IconButton>
											<FileCopy />
										</ListItem>
										<Menu />
									</div>
								</Draggable>
							);
						})}
					</Container> */}
                </DialogContent>
                <DialogActions>
                    {selectedWatchlists.length > 0 && (
                        <Button onClick={handleDelete} color="secondary">
                            <DeleteForever />
                        </Button>
                    )}
                    {!checkArraysEqual(watchlists, currentWatchlists) && (
                        <Button onClick={handleRevertChanges} color="primary">
                            Undo Changes
                        </Button>
                    )}
                    <Button onClick={handleSave} color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditWatchlistsModal;
