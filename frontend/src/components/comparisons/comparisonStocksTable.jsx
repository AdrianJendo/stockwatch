import * as React from "react";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const columns = [
    { id: "sec_name", label: "Security Name" },
    { id: "ticker", label: "Ticker" },
    { id: "remove", label: "", align: "right" },
];

const StocksTable = (props) => {
    const { items, setItems } = props;

    const removeStock = (idToRemove) => {
        setItems(items.filter((item) => item.id !== idToRemove));
    };

    // populate rows
    const rows = [];
    items.forEach((item) => {
        // lookup stock from database and error if not valid
        rows.push({
            sec_name: item.name,
            ticker: item.ticker,
            remove: (
                <IconButton onClick={() => removeStock(item.id)}>
                    <ClearIcon />
                </IconButton>
            ),
        });
    });

    return (
        <Paper sx={{ maxHeight: "250px", width: "100%", overflow: "auto" }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        width: column.width,
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.sec_name}
                                >
                                    {columns.map((column) => {
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                sx={{ padding: "0px 16px" }}
                                            >
                                                {row[column.id]}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default StocksTable;
