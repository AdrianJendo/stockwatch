import React from "react";

import {
    Switch,
    FormControlLabel,
    Tooltip,
    Typography,
    IconButton,
    Toolbar,
    styled,
} from "@mui/material";
import { RotateLeft, Add, Delete, Create, Menu } from "@mui/icons-material";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
}));

const StyledToolbarText = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    marginLeft: "5px",
}));

const WatchlistTableToolbar = (props) => {
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
        <StyledToolbar>
            <Tooltip title="Watchlists" placement="left-start">
                <IconButton
                    aria-label="watchlists"
                    sx={{
                        marginLeft: "-2px",
                        marginRight: "1px",
                        positive: "relative",
                        bottom: "2px",
                    }}
                    onClick={togglePopover}
                >
                    <Menu />
                </IconButton>
            </Tooltip>
            <Typography
                variant="h6"
                sx={{
                    flex: "1 1 100%",
                }}
                id="tableTitle"
                component="div"
            >
                Watchlist Title
                <FormControlLabel
                    sx={{
                        marginLeft: "30px",
                    }}
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
                    <StyledToolbarText id="toolbarText" component="div">
                        Columns
                    </StyledToolbarText>
                </IconButton>
            </Tooltip>
            <Tooltip title="Add a new Stock" placement="left-start">
                <IconButton
                    aria-label="add stock"
                    onClick={handleTickerModalOpen}
                >
                    <Add />
                    <StyledToolbarText id="toolbarText" component="div">
                        Add
                    </StyledToolbarText>
                </IconButton>
            </Tooltip>
        </StyledToolbar>
    );
};

export default WatchlistTableToolbar;
