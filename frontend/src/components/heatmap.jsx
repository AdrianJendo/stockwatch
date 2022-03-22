import React, { useEffect, useState } from "react";
import axios from "axios";

import { Box, Paper, styled } from "@mui/material";
import Masonry from "@mui/lab/Masonry";

const heights = [
    150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80,
];

const NUM_COLS = 4;

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
}));

const Heatmap = () => {
    const [stocks, setStocks] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [sortedSectors, setSortedSectors] = useState([]);
    const [maxSectorWeight, setMaxSectorWeight] = useState(0);

    useEffect(() => {
        const getIndexWeights = async () => {
            // You can await here
            const response = await axios.get("/api/heatmap", {
                params: {
                    index: "sp500",
                },
            });

            const data = response.data;
            const sectors = JSON.parse(data.sectors);

            setStocks(JSON.parse(data.df));

            // Calculate height, width, number of columns
            const maxSectorWeight = Object.values(sectors).reduce(
                (prev, cur) => Math.max(prev, cur),
                0
            );
            setMaxSectorWeight(maxSectorWeight);

            Object.keys(sectors).forEach((sector) => {
                sectors[sector] /= maxSectorWeight;
            });

            const sortedSectors = Object.keys(sectors).sort(
                (a, b) => sectors[b] - sectors[a]
            );
            setSortedSectors(sortedSectors);

            let colSums = new Array(NUM_COLS).fill(0);
            let colSectors = [[], [], [], []];
            let offset = 0;
            sortedSectors.forEach((sector, index) => {
                while (
                    colSums[(index + offset) % NUM_COLS] + sectors[sector] >
                    1
                )
                    offset++;

                colSums[(index + offset) % NUM_COLS] += sectors[sector];

                colSectors[(index + offset) % NUM_COLS].push(sector);
            });
            console.log(colSectors);
            console.log(colSums);
            // colSectors.forEach((col, index) => {
            //     sectors[col[col.length - 1]] += 1 - colSums[index];
            // });

            console.log(sectors);

            setSectors(sectors);
        };
        getIndexWeights();
    }, [setStocks]);

    // console.log(stocks);

    // console.log(
    //     Object.values(sectors).map((sector) => (sector / maxSectorWeight) * 100)
    // );

    return (
        <Box sx={{ padding: "20px", height: "calc(100vh - 64px - 40px)" }}>
            <Masonry sx={{ height: "100%" }} columns={3} spacing={1}>
                {sortedSectors.map((sector, index) => (
                    <Item
                        key={index}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
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
