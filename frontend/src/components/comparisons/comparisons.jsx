import React, { useState } from "react";
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
import * as XLSX from "xlsx";

import { TextField, Button, Typography } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";

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
        y: {
            title: {
                display: true,
                text: "Percent Return",
            },
            ticks: {
                callback: function (value) {
                    return (value * 100).toFixed(0) + "%"; // convert it to percentage
                },
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
    const [comparisonItems, setComparisonItems] = useState([]);
    const [chartData, setChartData] = useState({});
    const [chartLoading, setChartLoading] = useState(false);

    const handleTickerTextChange = (e) => {
        if (e.target.value.length <= 5) {
            setTickerText(e.target.value);
        }
    };

    const handleAddStock = (e) => {
        if (e.key === "Enter") {
            addStockToComparison(tickerText);
        }
    };

    const addStockToComparison = (ticker) => {
        if (
            ticker.length <= 5 &&
            !comparisonItems.some((item) => item.id === ticker.toUpperCase()) &&
            comparisonItems.length <= MAX_COMPARISONS
        ) {
            const newComparisonItems = comparisonItems.slice();
            newComparisonItems.push({
                id: ticker.toUpperCase(),
                name: ticker.toUpperCase(),
                ticker: ticker.toUpperCase(),
                values: { [ticker.toUpperCase()]: 1 },
            });
            setComparisonItems(newComparisonItems);
        } else {
            alert("Error");
        }
        setTickerText("");
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
                    items: JSON.stringify(comparisonItems),
                },
            })
            .then((resp) => {
                setChartLoading(false);
                loadGraph(JSON.parse(resp.data));
            })
            .catch((err) => alert(err.message));
    };

    const uploadPortfolio = (e) => {
        const newComparisonItems = comparisonItems.slice();
        const numFiles = e.target.files.length; // allow uploading of multiple portfolios at once

        // traverse each uploaded file
        for (let i = 0; i < numFiles; i++) {
            const file = e.target.files[i];
            const fileReader = new FileReader();
            try {
                fileReader.readAsBinaryString(file);
            } catch {}

            fileReader.onload = (e) => {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: "binary" });
                // traverse all the sheets
                for (let j = 0; j < wb.SheetNames.length; j++) {
                    const wsName = wb.SheetNames[j];
                    const ws = wb.Sheets[wsName];
                    const wsData = XLSX.utils.sheet_to_csv(ws, { header: 1 });
                    const wsRows = wsData.split("\n");
                    const rowData = wsRows.slice(1);
                    const columns = wsRows[0].toLowerCase().split(",");
                    const containsWeightsCol = columns.includes("weight");
                    const portfolio = {};

                    let weightSum = 0;
                    rowData.forEach((row) => {
                        const rowVals = row.split(",");
                        const ticker = rowVals[0];
                        const weight = containsWeightsCol
                            ? parseInt(rowVals[1]) / 100
                            : Math.floor((1 / rowData.length) * 100) / 100;

                        portfolio[ticker] = weight;
                        weightSum += weight;
                    });

                    if (weightSum > 1) {
                        alert("Portfolio weights are greater than 1");
                        return;
                    }

                    if (!comparisonItems.some((item) => item.id === wsName))
                        newComparisonItems.push({
                            id: wsName,
                            name: wsName,
                            ticker: "",
                            values: portfolio,
                        });
                }

                if (i === numFiles - 1) {
                    setComparisonItems(newComparisonItems);
                }
            };
        }
        e.target.value = "";
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
                        onClick={() => addStockToComparison(tickerText)}
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

                <Button
                    variant="contained"
                    component="label"
                    onChange={(e) => uploadPortfolio(e)}
                >
                    Upload Portfolio
                    <input type="file" hidden multiple />
                </Button>
            </div>
            {comparisonItems.length ? (
                <div style={{ width: "50%", margin: "auto" }}>
                    <ComparisonStocksTable
                        items={comparisonItems}
                        setItems={setComparisonItems}
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
                disabled={comparisonItems.length === 0}
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
