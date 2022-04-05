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
    const [age, setAge] = useState("");
    const [stocks, setStocks] = useState([]);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const submitPattern = async () => {
        console.log(age);
        console.log(technicalPatterns);
        const resp = await axios.get("/api/technical_screener", {
            params: { pattern: "CDLENGULFING" },
        });
        console.log(resp);
        setStocks(resp.data);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <Button onClick={() => submitPattern()} variant="contained">
                Submit
            </Button>

            <div style={{ overflow: "scroll", height: "70vh" }}>
                {stocks.map((stock) => (
                    <Box
                        sx={{
                            display: "flex",
                            padding: "20px",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={`https://finviz.com/chart.ashx?t=${stock.ticker}&ty=c&ta=1&p=d&s=l`}
                        />

                        <Typography
                            sx={{
                                margin: "auto 0px",
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
        </Box>
    );
};

export default TechnicalScreener;
