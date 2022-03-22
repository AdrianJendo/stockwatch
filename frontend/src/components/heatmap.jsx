import React, { useEffect, useState } from "react";
import axios from "axios";

import { Box, Paper, styled } from "@mui/material";
import Masonry from "@mui/lab/Masonry";

const heights = [
    150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80,
];

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
    alignItems: "top",
    justifyContent: "top",
}));

const Heatmap = () => {
    const [stocks, setStocks] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [sortedSectors, setSortedSectors] = useState([]);
    const [maxSectorWeight, setMaxSectorWeight] = useState(0);

    console.log(stocks);
    console.log(sectors);

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
            setSectors(sectors);

            // Calculate height, width, number of columns
            setMaxSectorWeight(
                Object.values(sectors).reduce((prev, cur) =>
                    Math.max(prev, cur)
                ),
                0
            );

            const sortedSectors = Object.keys(sectors).sort(
                (a, b) => sectors[b] - sectors[a]
            );
            setSortedSectors(sortedSectors);
        };
        getIndexWeights();
    }, [setStocks]);

    console.log(stocks);

    // console.log(
    //     Object.values(sectors).map((sector) => (sector / maxSectorWeight) * 100)
    // );

    return (
        <Box
            sx={{
                padding: "20px",
                height: "calc(100vh - 64px - 40px)",
                display: "flex",
                flexWrap: "wrap",
            }}
        >
            {sortedSectors.map((sector, index) => (
                <Item
                    sx={{
                        position: "relative",
                        margin: "10px",
                        width: `${sectors[sector] * 1.8}%`,
                        height: `${sectors[sector] * 1.8}%`,
                        top: "0px",
                        flexGrow: 1,
                    }}
                    key={index}
                >
                    {sector}
                </Item>
            ))}
        </Box>
    );
};

export default Heatmap;
