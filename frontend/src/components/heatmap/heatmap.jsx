import React, { useEffect, useState } from "react";
import axios from "axios";

import { Box, Paper, Typography, styled } from "@mui/material";
import Masonry from "@mui/lab/Masonry";

// Article https://medium.com/@clementb/building-a-treemap-with-javascript-4d789ad43a85
// Package from https://github.com/clementbat/treemap
import { getTreemap } from "treemap-squarify";

const heatmapWidth = 1500;
const heatmapHeight = 900;

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

    const [treeMap, setTreeMap] = useState([]);

    const { index } = props;

    useEffect(() => {
        // const getIndexWeights = async () => {
        //     // You can await here
        //     const response = await axios.get("/api/heatmap", {
        //         params: {
        //             index,
        //         },
        //     });

        //     const data = response.data;
        //     const sectors = JSON.parse(data.sectors);
        //     const stocksData = JSON.parse(data.df);
        //     // Calculate height, width, number of columns
        //     const maxSectorWeight = Object.values(sectors).reduce(
        //         (prev, cur) => Math.max(prev, cur),
        //         0
        //     );
        //     Object.keys(sectors).forEach((sector) => {
        //         sectors[sector] /= maxSectorWeight;
        //     });
        //     const sortedSectors = Object.keys(sectors).sort(
        //         (a, b) => sectors[b] - sectors[a]
        //     );
        //     const stocks = {};
        //     stocksData.forEach((stock) => {
        //         if (!stocks[stock.Sector]) {
        //             stocks[stock.Sector] = [];
        //         }
        //         stocks[stock.Sector].push(stock);
        //     });
        //     setStocks(stocks);
        //     setSortedSectors(sortedSectors);
        //     setSectors(sectors);
        //     setNumCols(index === "sp500" ? 4 : index === "dowjones" ? 7 : 3);
        // };
        // getIndexWeights();
        const newTreeMap = getTreemap({
            data: [
                // your dataset
                { value: 23, color: "#1B277C", label: "23" },
                { value: 20, color: "#2C5A9C", label: "20" },
                { value: 19, color: "#3984B6", label: "19" },
                { value: 14, color: "#3F97C2", label: "14" },
                { value: 9, color: "#78C6D0", label: "9" },
                { value: 8, color: "#AADACC", label: "8" },
                { value: 7, color: "#DCECC9", label: "7" },
            ],
            width: heatmapWidth, // the width and height of your treemap
            height: heatmapHeight,
        });
        setTreeMap(newTreeMap);
    }, [index, setStocks]);

    // TODO
    // Add dropdown to app bar to choose index

    console.log(treeMap);

    return (
        <Box
            sx={{
                padding: "20px",
                height: "100%",
            }}
        >
            <svg width={heatmapWidth} height={heatmapHeight}>
                {treeMap.map((rectangle) => (
                    <g
                        key={`${rectangle.x}:${rectangle.y}`}
                        fill={`${rectangle.data.color}`}
                    >
                        <rect
                            x={rectangle.x}
                            y={rectangle.y}
                            width={rectangle.width}
                            height={rectangle.height}
                        ></rect>
                        <text
                            style={{
                                position: "relative",
                                dominantBaseline: "middle",
                                textAnchor: "middle",
                                cursor: "default",
                                userSelect: "none",
                            }}
                            x={rectangle.x + rectangle.width / 2}
                            y={rectangle.y + rectangle.height / 2}
                            fill="white"
                        >
                            {rectangle.data.label}
                        </text>
                    </g>
                ))}
                Sorry, your browser does not support inline SVG.
            </svg>
        </Box>
    );

    // return (
    //     <Box
    //         sx={{
    //             padding: "20px",
    //             height: "100%",
    //         }}
    //     >
    //         <Masonry sx={{ height: "100%" }} columns={numCols} spacing={1}>
    //             {sortedSectors.map((sector) => (
    //                 <Item
    //                     key={sector}
    //                     sx={{
    //                         position: "relative",
    //                         height: `${sectors[sector] * 100}%`,
    //                         backgroundColor:
    //                             stocks[sector].reduce(
    //                                 (prev, cur) =>
    //                                     (prev += cur["% Chg"] * cur["Weight"]),
    //                                 0
    //                             ) > 0
    //                                 ? "green"
    //                                 : "red",
    //                         filter: `brightness(${Math.min(
    //                             Math.max(
    //                                 stocks[sector].reduce(
    //                                     (prev, cur) =>
    //                                         (prev +=
    //                                             cur["% Chg"] *
    //                                             cur["Weight"] *
    //                                             100),
    //                                     0
    //                                 ),
    //                                 70
    //                             ),
    //                             100
    //                         )}%)`,
    //                     }}
    //                 >
    //                     <Typography variant="caption" sx={{ height: "10px" }}>
    //                         {sector}
    //                     </Typography>
    //                     <div
    //                         style={{
    //                             display: "flex",
    //                             flexWrap: "wrap",
    //                             height: "calc(100% - 20px)",
    //                         }}
    //                     >
    //                         {stocks[sector].map((stock, j) => {
    //                             if (j < 5) {
    //                                 return (
    //                                     <Item
    //                                         key={stock.Symbol}
    //                                         sx={{
    //                                             position: "relative",
    //                                             flexGrow: 1,
    //                                             margin: "5px",
    //                                             backgroundColor:
    //                                                 stock["% Chg"] > 0
    //                                                     ? "green"
    //                                                     : "red",
    //                                             filter: `brightness(${Math.min(
    //                                                 Math.max(
    //                                                     stock["% Chg"] * 100,
    //                                                     90
    //                                                 ),
    //                                                 180
    //                                             )}%)`,
    //                                         }}
    //                                     >
    //                                         <div
    //                                             style={{
    //                                                 position: "relative",
    //                                                 top: "40%",
    //                                             }}
    //                                         >
    //                                             <Typography variant="caption">
    //                                                 {stock.Company}
    //                                             </Typography>
    //                                             <br />
    //                                             <Typography variant="caption">
    //                                                 {stock["% Chg"]}%
    //                                             </Typography>
    //                                         </div>
    //                                     </Item>
    //                                 );
    //                             }
    //                             return <div key={stock.Symbol}></div>;
    //                         })}
    //                     </div>
    //                 </Item>
    //             ))}
    //         </Masonry>
    //     </Box>
    // );
};

export default Heatmap;
