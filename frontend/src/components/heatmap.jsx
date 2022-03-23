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
    const [sectorWeights, setSectorWeights] = useState({});
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
            const sectorWeights = {};
            stocksData.forEach((stock) => {
                if (!stocks[stock.Sector]) {
                    stocks[stock.Sector] = [];
                    sectorWeights[stock.Sector] = 0;
                }
                stocks[stock.Sector].push(stock);
                sectorWeights[stock.Sector] += stock.Weight;
            });
            setStocks(stocks);
            setSortedSectors(sortedSectors);
            setSectors(sectors);
            setNumCols(index === "sp500" ? 4 : index === "dowjones" ? 7 : 3);
            setSectorWeights(sectorWeights);
        };
        getIndexWeights();
    }, [index, setStocks]);

    // TODO
    // 1: Show top 5 stocks for each section
    // 2. Green / red based on entire sector (and weighting of each stock)
    // 3. Add dropdown to app bar to choose index
    console.log(stocks);
    console.log(sectors);

    return (
        <Box
            sx={{
                padding: "20px",
                height: "calc(100vh - 64px - 40px)",
                display: "flex",
                flexWrap: "wrap",
            }}
        >
            {/* <Masonry sx={{ height: "100%" }} columns={numCols} spacing={1}> */}
            {sortedSectors.map((sector, i) => (
                <Item
                    key={sector}
                    // sx={{
                    //     position: "relative",
                    //     height: `${sectors[sector] * 100}%`,
                    //     backgroundColor:
                    //         stocks[sector].reduce(
                    //             (prev, cur) =>
                    //                 (prev += cur["% Chg"] * cur["Weight"]),
                    //             0
                    //         ) > 0
                    //             ? "green"
                    //             : "red",
                    //     filter: `brightness(${Math.min(
                    //         Math.max(
                    //             stocks[sector].reduce(
                    //                 (prev, cur) =>
                    //                     (prev +=
                    //                         cur["% Chg"] *
                    //                         cur["Weight"] *
                    //                         100),
                    //                 0
                    //             ),
                    //             70
                    //         ),
                    //         100
                    //     )}%)`,
                    // }}
                    sx={{
                        position: "relative",
                        // maxHeight: "calc(100% - 30px)",
                        maxWidth: "32%",
                        margin: "5px",
                        minHeight: `${sectors[sector] * 100}%`,
                        flexGrow: 1,
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
                            if (j < 100) {
                                return (
                                    <Item
                                        key={stock.Symbol}
                                        sx={{
                                            position: "relative",
                                            // maxHeight: "calc(100% - 30px)",
                                            minHeight: "1px",
                                            margin: "5px",
                                            minWidth: `${
                                                (stock.Weight /
                                                    sectorWeights[sector]) *
                                                100
                                            }%`,

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
            {/* </Masonry> */}
        </Box>
    );
};

export default Heatmap;
