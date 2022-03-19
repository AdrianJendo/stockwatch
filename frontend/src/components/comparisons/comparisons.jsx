import React, { useState } from "react";
import {
    TextField,
    Button,
    ButtonGroup,
    Paper,
    Typography,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import axios from "axios";
import Chart from "chart.js/auto";

const Comparisons = () => {
    const [startDate, setStartDate] = useState(
        new Date(new Date().setFullYear(new Date().getFullYear() - 1))
    );
    const [endDate, setEndDate] = useState(new Date());
    const [tickerText, setTickerText] = useState("");
    const [stocks, setStocks] = useState([]);
    const [hoveringOver, setHoveringOver] = useState(-1);

    const handleTickerTextChange = (e) => {
        setTickerText(e.target.value);
    };

    const handleAddStock = (e) => {
        if (e.key === "Enter") {
            addStockToQueue();
        }
    };

    const addStockToQueue = () => {
        const newStocks = stocks.slice();
        if (
            tickerText.length <= 5 &&
            !newStocks.includes(tickerText.toUpperCase())
        ) {
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

    const removeStockFromQueue = (index) => {
        const newStocks = stocks.slice();
        newStocks.splice(index, 1);
        setStocks(newStocks);
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

    const loadData = (dataObj, colors) => {
        const priceData = [];
        for (let i = 0; i < dataObj.columns.length; ++i) {
            const temp = [];
            for (let j = 0; j < dataObj.data.length; ++j) {
                temp.push(dataObj.data[j][i]);
            }
            if (i < colors.length) {
                priceData.push({
                    data: temp,
                    label: dataObj.columns[i],
                    borderColor: colors[i],
                    fill: false,
                });
            } else {
                priceData.push({
                    data: temp,
                    label: dataObj.columns[i],
                    borderColor: "#3e95cd",
                    fill: false,
                });
            }
        }
        return priceData;
    };

    const loadGraph = (
        dataObj,
        ctx,
        title,
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
        const relativePrices = loadData(dataObj, colors);
        if (zero_line) {
            relativePrices.push(fillZero(dataObj));
        }

        console.log(relativePrices);
        console.log(dataObj);

        new Chart(ctx, {
            type: "line",
            data: {
                labels: dataObj.index,
                datasets: relativePrices,
            },
            options: {
                title: {
                    display: true,
                    text: title,
                },
                elements: {
                    point: {
                        radius: 0,
                    },
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                maxTicksLimit: 42,
                            },
                        },
                    ],
                },
            },
        });
    };

    const graphStocks = () => {
        const comparisonsChart = Chart.getChart("comparisonsChart");
        try {
            comparisonsChart.destroy();
        } catch {}
        const ctx = document
            .getElementById("comparisonsChart")
            .getContext("2d");
        ctx.font = "30px Arial";
        ctx.fillText("Loading...", 10, 50);
        axios
            .get("/api/comparisons", {
                params: {
                    startDate: startDate.toDateString(),
                    endDate: endDate.toDateString(),
                    stocks: JSON.stringify(stocks),
                },
            })
            .then((resp) => {
                loadGraph(JSON.parse(resp.data), ctx, "Relative stock returns");
            })
            .catch((err) => alert(err.message));
    };

    return (
        <div>
            <TextField
                sx={{ margin: "10px" }}
                label="Add Ticker"
                type="search"
                value={tickerText}
                onChange={handleTickerTextChange}
                onKeyPress={handleAddStock}
            />
            <Button
                sx={{ margin: "10px" }}
                color={tickerText !== "" ? "primary" : "inherit"}
                variant={tickerText !== "" ? "contained" : "outlined"}
                onClick={addStockToQueue}
            >
                Add
            </Button>
            <div style={{ margin: "30px" }}>
                <ButtonGroup
                    variant="text"
                    color="primary"
                    aria-label="text primary button group"
                >
                    {stocks.map((stock, index) => (
                        <Button
                            color={
                                index === hoveringOver ? "secondary" : "primary"
                            }
                            onMouseEnter={() => setHoveringOver(index)}
                            onMouseLeave={() => setHoveringOver(-1)}
                            onClick={() => removeStockFromQueue(index)}
                            key={index}
                        >
                            {stock}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
            <Button
                sx={{ margin: "10px" }}
                variant="contained"
                color="primary"
                onClick={graphStocks}
            >
                Graph
            </Button>
            <DatePicker
                label="Start Date"
                openTo="year"
                views={["year", "month", "day"]}
                value={startDate}
                onChange={(newDate) => setStartDate(newDate)}
                maxDate={endDate}
                minDate={
                    new Date(
                        new Date().setFullYear(new Date().getFullYear() - 19)
                    )
                }
                renderInput={(params) => <TextField {...params} />}
            />
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
            <div>
                <canvas id="comparisonsChart"></canvas>
            </div>
        </div>
    );
};

export default Comparisons;
