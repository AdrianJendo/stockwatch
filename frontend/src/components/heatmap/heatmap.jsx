import React, { useEffect, useState } from "react";
import axios from "axios";

import { Box, Paper, Typography, styled } from "@mui/material";
import Masonry from "@mui/lab/Masonry";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
}));

const Heatmap = (props) => {
    const [stocks, setStocks] = useState({});
    const [sectors, setSectors] = useState([]);
    const [sortedSectors, setSortedSectors] = useState([]);
    const [numCols, setNumCols] = useState(0);

    const { index } = props;

    useEffect(() => {
        const getIndexWeights = async () => {
            // You can await here
            const response = await axios.get("/api/heatmap", {
                params: {
                    index,
                },
            });

            const data = response.data;
            const sectors = JSON.parse(data.sectors);
            const stocksData = JSON.parse(data.df);
            // Calculate height, width, number of columns
            const maxSectorWeight = Object.values(sectors).reduce(
                (prev, cur) => Math.max(prev, cur),
                0
            );
            Object.keys(sectors).forEach((sector) => {
                sectors[sector] /= maxSectorWeight;
            });
            const sortedSectors = Object.keys(sectors).sort(
                (a, b) => sectors[b] - sectors[a]
            );
            const stocks = {};
            stocksData.forEach((stock) => {
                if (!stocks[stock.Sector]) {
                    stocks[stock.Sector] = [];
                }
                stocks[stock.Sector].push(stock);
            });
            setStocks(stocks);
            setSortedSectors(sortedSectors);
            setSectors(sectors);
            setNumCols(index === "sp500" ? 4 : index === "dowjones" ? 7 : 3);
        };
        getIndexWeights();
    }, [index, setStocks]);

    // TODO
    // Add dropdown to app bar to choose index
    // Make the proportions actually work

    return (
        <Box
            sx={{
                padding: "20px",
                height: "100%",
            }}
        >
            <Masonry sx={{ height: "100%" }} columns={numCols} spacing={1}>
                {sortedSectors.map((sector) => (
                    <Item
                        key={sector}
                        sx={{
                            position: "relative",
                            height: `${sectors[sector] * 100}%`,
                            backgroundColor:
                                stocks[sector].reduce(
                                    (prev, cur) =>
                                        (prev += cur["% Chg"] * cur["Weight"]),
                                    0
                                ) > 0
                                    ? "green"
                                    : "red",
                            filter: `brightness(${Math.min(
                                Math.max(
                                    stocks[sector].reduce(
                                        (prev, cur) =>
                                            (prev +=
                                                cur["% Chg"] *
                                                cur["Weight"] *
                                                100),
                                        0
                                    ),
                                    70
                                ),
                                100
                            )}%)`,
                        }}
                    >
                        <Typography variant="caption" sx={{ height: "10px" }}>
                            {sector}
                        </Typography>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                height: "calc(100% - 20px)",
                            }}
                        >
                            {stocks[sector].map((stock, j) => {
                                if (j < 5) {
                                    return (
                                        <Item
                                            key={stock.Symbol}
                                            sx={{
                                                position: "relative",
                                                flexGrow: 1,
                                                margin: "5px",
                                                backgroundColor:
                                                    stock["% Chg"] > 0
                                                        ? "green"
                                                        : "red",
                                                filter: `brightness(${Math.min(
                                                    Math.max(
                                                        stock["% Chg"] * 100,
                                                        90
                                                    ),
                                                    180
                                                )}%)`,
                                            }}
                                        >
                                            <div
                                                style={{
                                                    position: "relative",
                                                    top: "40%",
                                                }}
                                            >
                                                <Typography variant="caption">
                                                    {stock.Company}
                                                </Typography>
                                                <br />
                                                <Typography variant="caption">
                                                    {stock["% Chg"]}%
                                                </Typography>
                                            </div>
                                        </Item>
                                    );
                                }
                                return <div key={stock.Symbol}></div>;
                            })}
                        </div>
                    </Item>
                ))}
            </Masonry>
        </Box>
    );
};

export default Heatmap;
