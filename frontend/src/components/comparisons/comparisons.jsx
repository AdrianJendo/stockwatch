import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import ComparisonStocksTable from "components/comparisons/comparisonStocksTable";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Relative stock returns",
        },
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    scales: {
        x: {
            ticks: {
                maxTicksLimit: 35,
            },
        },
    },
};

const MAX_COMPARISONS = 10; // max number of securities for comparison

const Comparisons = () => {
    const [startDate, setStartDate] = useState(
        new Date(new Date().setFullYear(new Date().getFullYear() - 1))
    );
    const [endDate, setEndDate] = useState(new Date());
    const [tickerText, setTickerText] = useState("");
    const [stocks, setStocks] = useState([]);
    const [chartData, setChartData] = useState({});
    const [chartLoading, setChartLoading] = useState(false);

    const handleTickerTextChange = (e) => {
        if (e.target.value.length <= 5) {
            setTickerText(e.target.value);
        }
    };

    const handleAddStock = (e) => {
        if (e.key === "Enter") {
            addStockToComparison();
        }
    };

    const addStockToComparison = () => {
        if (
            tickerText.length <= 5 &&
            !stocks.includes(tickerText.toUpperCase()) &&
            stocks.length <= MAX_COMPARISONS
        ) {
            const newStocks = stocks.slice();
            newStocks.push(tickerText.toUpperCase());
            setStocks(newStocks);
            setTickerText("");
        } else {
            if (tickerText.length <= 5) {
                setTickerText("");
            }
            alert("Error");
        }
    };

    const fillZero = (serverResponse) => {
        return {
            data: new Array(serverResponse.index.length).fill(0),
            borderColor: "#000000",
            label: "basis",
            fill: true,
            borderWidth: 2,
        };
    };

    const loadGraph = (
        respData,
        zero_line = false,
        colors = [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
            "#F0E68C",
            "#00CED1",
            "#CD5C5C",
        ]
    ) => {
        // Format data
        const chartPriceData = [];
        for (let i = 0; i < respData.columns.length; ++i) {
            const tickerPriceData = [];
            for (let j = 0; j < respData.data.length; ++j) {
                tickerPriceData.push(respData.data[j][i]);
            }
            chartPriceData.push({
                data: tickerPriceData,
                label: respData.columns[i],
                borderColor: colors[i % colors.length],
                fill: false,
            });
        }

        if (zero_line) {
            chartPriceData.push(fillZero(respData));
        }

        // Set data options
        const data = {
            labels: respData.index,
            datasets: chartPriceData,
        };

        setChartData({ data });
    };

    const graphStocks = () => {
        setChartLoading(true);
        setChartData({});
        axios
            .get("/api/comparisons", {
                params: {
                    startDate: startDate.toDateString(),
                    endDate: endDate.toDateString(),
                    stocks: JSON.stringify(stocks),
                },
            })
            .then((resp) => {
                setChartLoading(false);
                loadGraph(JSON.parse(resp.data));
            })
            .catch((err) => alert(err.message));
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    width: "90%",
                    margin: "auto",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        borderRadius: "5%",
                        border: "1px solid black",
                        width: "240px",
                        margin: "20px",
                    }}
                >
                    <TextField
                        label="Add Ticker"
                        value={tickerText}
                        onChange={handleTickerTextChange}
                        onKeyPress={handleAddStock}
                    />
                    <Button
                        variant={tickerText !== "" ? "contained" : "outlined"}
                        disabled={tickerText === ""}
                        onClick={addStockToComparison}
                    >
                        Add
                    </Button>
                </div>
                <div style={{ margin: "20px" }}>
                    <DatePicker
                        label="Start Date"
                        openTo="year"
                        views={["year", "month", "day"]}
                        value={startDate}
                        onChange={(newDate) => setStartDate(newDate)}
                        maxDate={endDate}
                        minDate={
                            new Date(
                                new Date().setFullYear(
                                    new Date().getFullYear() - 19
                                )
                            )
                        }
                        renderInput={(params) => <TextField {...params} />}
                    />
                </div>
                <div style={{ margin: "20px" }}>
                    <DatePicker
                        label="End Date"
                        openTo="year"
                        views={["year", "month", "day"]}
                        value={endDate}
                        onChange={(newDate) => setEndDate(newDate)}
                        maxDate={new Date()}
                        minDate={startDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </div>
            </div>
            {stocks.length ? (
                <div style={{ width: "50%", margin: "auto" }}>
                    <ComparisonStocksTable
                        stocks={stocks}
                        setStocks={setStocks}
                    />
                </div>
            ) : (
                <div />
            )}
            <Button
                sx={{
                    display: "flex",
                    margin: "30px auto",
                }}
                variant="contained"
                color="primary"
                onClick={graphStocks}
                disabled={stocks.length === 0}
            >
                Graph
            </Button>

            <div
                style={{
                    width: "90%",
                    margin: "0px auto 60px auto",
                    textAlign: "center",
                }}
            >
                {chartData.data && (
                    <Line options={chartOptions} data={chartData.data} />
                )}
                {chartLoading && (
                    <Typography
                        sx={{
                            fontSize: "30px",
                        }}
                    >
                        Loading...
                    </Typography>
                )}
            </div>
        </div>
    );
};

export default Comparisons;
