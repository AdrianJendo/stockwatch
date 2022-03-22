import React, { useEffect, useState } from "react";
import axios from "axios";

import { Box, Paper, styled } from "@mui/material";
import Masonry from "@mui/lab/Masonry";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
}));

const Heatmap = (props) => {
    const [stocks, setStocks] = useState([]);
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
    // 1: Populate heatmap with stocks
    // 2: Make green / red
    console.log(stocks);

    return (
        <Box sx={{ padding: "20px", height: "calc(100vh - 64px - 40px)" }}>
            <Masonry sx={{ height: "100%" }} columns={numCols} spacing={1}>
                {sortedSectors.map((sector, index) => (
                    <Item
                        key={index}
                        sx={{
                            position: "relative",
                            height: `${sectors[sector] * 100}%`,
                        }}
                    >
                        {sector}
                    </Item>
                ))}
            </Masonry>
        </Box>
    );
};

export default Heatmap;
