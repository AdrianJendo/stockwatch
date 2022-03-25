import React from "react";

import {
    TableCell,
    TableHead,
    Checkbox,
    TableRow,
    TableSortLabel,
} from "@mui/material";

import { DoneAll } from "@mui/icons-material";

const WatchlistTableHeader = (props) => {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        headerCells,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headerCells.length > 0 && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={
                                numSelected > 0 && numSelected < rowCount
                            }
                            indeterminateIcon={<DoneAll />}
                            checkedIcon={<DoneAll border={1} />}
                            icon={<DoneAll border={1} />}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                )}
                {headerCells.map((headerCell, index) => (
                    <TableCell
                        key={headerCell.id}
                        align={index === 0 ? "left" : "right"}
                        padding={index === 0 ? "none" : "normal"}
                        sortDirection={
                            orderBy === headerCell.id ? order : false
                        }
                    >
                        <TableSortLabel
                            active={orderBy === headerCell.id}
                            direction={
                                orderBy === headerCell.id ? order : "asc"
                            }
                            onClick={createSortHandler(headerCell.id)}
                        >
                            {headerCell.label}
                            {orderBy === headerCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default WatchlistTableHeader;
