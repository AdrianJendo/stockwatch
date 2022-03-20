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
    const { stocks, setStocks } = props;

    const removeStock = (tickerToRemove) => {
        setStocks(stocks.filter((ticker) => ticker !== tickerToRemove));
    };

    // populate rows
    const rows = [];
    stocks.forEach((stock) => {
        // lookup stock from database and error if not valid
        rows.push({
            sec_name: stock,
            ticker: stock,
            remove: (
                <IconButton onClick={() => removeStock(stock)}>
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
                                    key={row.name}
                                >
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                sx={{ padding: "0px 16px" }}
                                            >
                                                {column.format &&
                                                typeof value === "number"
                                                    ? column.format(value)
                                                    : value}
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
