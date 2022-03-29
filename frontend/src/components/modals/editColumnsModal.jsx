import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DragDropList from "components/dragDrop/dragDropList.jsx";
import DialogTitle from "components/modals/modalHeader.jsx";
import findIndex from "components/helpers/findIndex.js";
import { watchlistColumns } from "constants";

import {
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    Button,
    TextField,
    InputAdornment,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Collapse,
    Typography,
    IconButton,
    styled,
} from "@mui/material";
import {
    Search,
    ExpandLess,
    ExpandMore,
    Check,
    Clear,
} from "@mui/icons-material";

const StyledGrid = styled(Grid)(() => ({
    height: "100%",
    paddingRight: "10px",
    overflowY: "overlay",
}));

const StyledColumnTitle = styled(Typography)(() => ({
    position: "relative",
    height: "30px",
    position: "sticky",
    fontWeight: "bold",
    zIndex: 1,
    textAlign: "center",
    top: 4,
}));

const EditColumnsModal = (props) => {
    const { handleClose, columns, setColumns } = props;

    const [searchValue, setSearchValue] = useState(""); // search value at top
    const [dataCategory, setDataCategory] = useState("");
    const [subCategory, setSubCategory] = useState(""); //
    const [columnChoices, setColumnChoices] = useState([]); // search results / columns options
    const [selectedColumns, setSelectedColumns] = useState([]); // currently selected columns

    useEffect(() => {
        setSelectedColumns(columns.slice());
        return () => {
            setSelectedColumns([]);
        };
    }, [columns]);

    const handleSearch = (e) => {
        const prevSearchValue = searchValue;
        setSearchValue(e.target.value);
        setDataCategory("search");

        // if current search value is continuation of previous, we just need to cut columns
        if (
            prevSearchValue !== "" &&
            e.target.value.length > prevSearchValue.length
        ) {
            setColumnChoices(
                columnChoices.filter((value) =>
                    value.label
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                )
            );
        } else if (e.target.value !== "") {
            // else we need to add new columns
            setColumnChoices(findSearchResults(e.target.value));
        }
    };

    const findSearchResults = (searchValue) => {
        return Object.values(watchlistColumns).reduce(
            (searchResults, curDataCategory) => {
                Object.values(curDataCategory.data).forEach((category) => {
                    category.data.forEach((column) => {
                        if (
                            column.label
                                .toLowerCase()
                                .includes(searchValue.toLowerCase())
                        ) {
                            searchResults.push(column);
                        }
                    });
                });

                return searchResults;
            },
            []
        );
    };

    const handleSave = () => {
        // lookup data for new columns
        // // axios
        // // 	.put(`/api/columns/${watchlistID}`, {
        // // 		data: selectedColumns,
        // // 	})
        // // 	.then(() =>
        // // 		axios
        // // 			.get("/api/newcolumndata", {
        // // 				params: {
        // // 					columns: JSON.stringify(selectedColumns),
        // // 					tickers: JSON.stringify(watchlistItems),
        // // 				},
        // // 			})
        // // 			.then((res) => {
        // // 				const newWatchlistItems = res.data.slice();
        // // 				setWatchlistItems(newWatchlistItems);
        // // 				setColumns(selectedColumns);
        // // 				handleClose();
        // // 			})
        // // 			.catch((err) => alert(err.message))
        // // 	)
        // // 	.catch((err) => alert(err.message));
        setColumns(selectedColumns);
        handleClose();
    };

    const toggleDataCategory = (newDataCategory) => {
        if (newDataCategory === dataCategory) {
            setDataCategory("");
        } else {
            setDataCategory(newDataCategory);
        }
    };

    const handleToggleFromSelection = (item) => {
        const index = findIndex(selectedColumns, item.label);
        const newSelectedColumns = selectedColumns.slice();
        if (index >= 0) {
            newSelectedColumns.splice(index, 1);
        } else {
            newSelectedColumns.push(item);
        }
        setSelectedColumns(newSelectedColumns);
    };

    return (
        <Dialog
            open={true}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="lg"
        >
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Edit Columns
                <TextField
                    id="outlined-full-width"
                    autoFocus
                    label="Search for Column"
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
                    autoComplete="off"
                />
            </DialogTitle>
            <Divider />
            <DialogContent
                sx={{
                    display: "flex",
                    minHeight: "100px",
                    padding: 0,
                }}
            >
                <Grid container justifyContent="center" spacing={0}>
                    <StyledGrid item xs={3}>
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader
                                    component="div"
                                    id="nested-list-subheader"
                                    disableSticky={true}
                                >
                                    Data Categories
                                </ListSubheader>
                            }
                        >
                            {Object.entries(watchlistColumns).map(
                                (dataCategoryObj) => (
                                    <div key={dataCategoryObj[0]}>
                                        <ListItem
                                            button
                                            onClick={() =>
                                                toggleDataCategory(
                                                    dataCategoryObj[0]
                                                )
                                            }
                                        >
                                            <ListItemIcon>
                                                {dataCategoryObj[1].icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                secondary={
                                                    dataCategoryObj[1].label
                                                }
                                            />
                                            {dataCategory ===
                                            dataCategoryObj[0] ? (
                                                <ExpandLess />
                                            ) : (
                                                <ExpandMore />
                                            )}
                                        </ListItem>
                                        <Collapse
                                            in={
                                                dataCategory ===
                                                dataCategoryObj[0]
                                            }
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            <List
                                                component="div"
                                                disablePadding
                                            >
                                                {Object.entries(
                                                    dataCategoryObj[1].data
                                                ).map((subCategoryObj) => (
                                                    <ListItem
                                                        key={subCategoryObj[0]}
                                                        button
                                                        onClick={() =>
                                                            setSubCategory(
                                                                subCategoryObj[0]
                                                            )
                                                        }
                                                    >
                                                        <ListItemText
                                                            secondary={
                                                                subCategoryObj[1]
                                                                    .label
                                                            }
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </Collapse>
                                    </div>
                                )
                            )}
                        </List>
                    </StyledGrid>
                    <StyledGrid item xs={6}>
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader
                                    sx={{
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        textAlign: "center",
                                    }}
                                >
                                    Available columns
                                </ListSubheader>
                            }
                        >
                            {watchlistColumns[dataCategory] &&
                                watchlistColumns[dataCategory].data[
                                    subCategory
                                ] &&
                                watchlistColumns[dataCategory].data[
                                    subCategory
                                ].data.map((column) => (
                                    <ListItem
                                        button
                                        onClick={() =>
                                            handleToggleFromSelection(column)
                                        }
                                        key={column.id}
                                    >
                                        {findIndex(
                                            selectedColumns,
                                            column.label
                                        ) !== -1 && (
                                            <ListItemIcon>
                                                <Check fontSize="medium" />
                                            </ListItemIcon>
                                        )}
                                        <ListItemText
                                            disableTypography
                                            secondary={
                                                <Typography
                                                    sx={
                                                        findIndex(
                                                            selectedColumns,
                                                            column.label
                                                        ) !== -1
                                                            ? {
                                                                  color: "green",
                                                              }
                                                            : {}
                                                    }
                                                >
                                                    {column.label}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                ))}
                        </List>
                    </StyledGrid>
                    <StyledGrid item xs={3}>
                        <StyledColumnTitle>Selected Columns</StyledColumnTitle>
                        <Divider />
                        {selectedColumns.map((column) => (
                            <div
                                key={column.id}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    cursor: "default",
                                    padding: "0 10px 0 36px",
                                }}
                            >
                                <Typography sx={{ userSelect: "none" }}>
                                    {column.label}
                                </Typography>
                                <IconButton
                                    onClick={() => {
                                        handleToggleFromSelection(column);
                                    }}
                                    sx={{
                                        "&:hover": {
                                            color: "#3c52b2",
                                        },
                                    }}
                                >
                                    <Clear />
                                </IconButton>
                            </div>
                        ))}
                        {/* <DragDropList
								items={selectedColumns}
								setItems={setSelectedColumns}
								handleRemove={handleToggleFromSelection}
							/> */}
                    </StyledGrid>
                </Grid>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={handleSave} color="primary">
                    Save changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditColumnsModal;
