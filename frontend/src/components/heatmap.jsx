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
}));

const Heatmap = () => {
    const [stocks, setStocks] = useState([]);
    const [sectors, setSectors] = useState([]);

    console.log(stocks);
    console.log(sectors);

    useEffect(() => {
        const getIndexWeights = async () => {
            // You can await here
            const response = await axios.get("/api/heatmap", {
                params: {
                    index: "dowjones",
                },
            });

            const data = response.data;

            setStocks(JSON.parse(data.df));
            setSectors(data.sectors);
        };
        getIndexWeights();
    }, [setStocks]);

    return (
        <Box>
            <Masonry columns={5} spacing={0}>
                {stocks.map((stock, index) => (
                    <Item key={index} sx={{ height: stock.Weight * 100 }}>
                        {stock.Company}
                    </Item>
                ))}
            </Masonry>
        </Box>
    );
};

export default Heatmap;
