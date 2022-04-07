import React, { useState } from "react";
import {
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button,
    Typography,
} from "@mui/material";
import { technicalPatterns } from "constants";
import axios from "axios";

const TechnicalScreener = () => {
    const [pattern, setPattern] = useState("");
    const [stocks, setStocks] = useState([]);
    const [loadingResponse, setLoadingResponse] = useState(false);

    const handleChange = (e) => {
        setPattern(e.target.value);
    };

    const submitPattern = async () => {
        setLoadingResponse(true);
        const resp = await axios.get("/api/technical_screener", {
            params: { pattern: technicalPatterns[pattern] },
        });
        if (!resp.data.length) {
            alert("NO DATA");
        }
        setLoadingResponse(false);
        setStocks(resp.data);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl
                sx={{ display: "flex", margin: "30px auto", width: "200px" }}
            >
                <InputLabel>Pattern</InputLabel>
                <Select value={pattern} label="Pattern" onChange={handleChange}>
                    {Object.keys(technicalPatterns).map((pattern) => (
                        <MenuItem key={pattern} value={pattern}>
                            {pattern}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                sx={{ display: "flex", margin: "30px auto" }}
                onClick={() => submitPattern()}
                variant="contained"
            >
                Submit
            </Button>

            {loadingResponse ? (
                <Typography
                    sx={{
                        padding: "50px",
                        textAlign: "center",
                    }}
                    variant="h2"
                >
                    Loading...
                </Typography>
            ) : (
                <div style={{ overflowY: "auto", height: "650px" }}>
                    {stocks.map((stock) => (
                        <Box
                            sx={{
                                display: "flex",
                                padding: "20px",
                                alignItems: "center",
                            }}
                            key={stock.ticker}
                        >
                            <img
                                src={`https://finviz.com/chart.ashx?t=${stock.ticker}&ty=c&ta=1&p=d&s=l`}
                            />
                            <Typography
                                sx={{
                                    margin: "auto",
                                    marginLeft: "60px",
                                    padding: "30px",
                                    backgroundColor:
                                        stock.sentiment === "bullish"
                                            ? "green"
                                            : "red",
                                    height: "24px",
                                    width: "100px",
                                    textAlign: "center",
                                }}
                            >
                                {stock.sentiment}
                            </Typography>
                        </Box>
                    ))}
                </div>
            )}
        </Box>
    );
};

export default TechnicalScreener;
