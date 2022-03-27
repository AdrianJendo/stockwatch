import React, { useEffect, useState } from "react";
import axios from "axios";

import { Box, Paper, Typography, styled } from "@mui/material";
import Masonry from "@mui/lab/Masonry";

// Article https://medium.com/@clementb/building-a-treemap-with-javascript-4d789ad43a85
// Package from https://github.com/clementbat/treemap
import { getTreemap } from "treemap-squarify";

const heatmapWidth = 1500;
const heatmapHeight = 800;

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
}));

const Heatmap = (props) => {
    // const [stocks, setStocks] = useState({});
    // const [sectors, setSectors] = useState([]);
    // const [sortedSectors, setSortedSectors] = useState([]);
    // const [numCols, setNumCols] = useState(0);

    const [sectorTreeMap, setSectorTreeMap] = useState([]);
    const [stockTreeMaps, setStockTreeMaps] = useState({});

    const { index } = props;

    useEffect(() => {
        const getIndexTreeMap = async () => {
            const heatmapResponse = await axios.get("/api/heatmap", {
                params: {
                    index,
                },
            });

            const data = heatmapResponse.data;
            const stocks = JSON.parse(data.stocks);
            const sectors = JSON.parse(data.sectors);

            const stocksBySector = {}; // dictionary sorting stocks into their sectors
            stocks.forEach((stock, index) => {
                // need stocks separated by sector to calculat colour and brightness of each sector
                if (!stocksBySector[stock.Sector]) {
                    stocksBySector[stock.Sector] = [];
                }
                stocksBySector[stock.Sector].push({
                    ["% Chg"]: stock["% Chg"],
                    Weight: stock["Weight"],
                    label: stock.Symbol,
                    value: stock.Weight,
                    color: stock.Chg >= 0 ? "green" : "red",
                    brightness: Math.min(
                        Math.max(Math.abs(stock["% Chg"] * 8), 0.7),
                        1.8
                    ),
                    index,
                    sector: stock.Sector,
                });

                // console.log(
                //     stock["% Chg"],
                //     Math.min(Math.max(Math.abs(stock["% Chg"] * 8), 0.7), 1.8)
                // );
            });

            const sectorData = Object.keys(sectors).map((sector) => {
                // remove "industry" from sector if it exists
                // const industryIndex = sector.indexOf("industry");
                let sectorLabel = sector;
                // if (industryIndex > 0) {
                //     sectorLabel = sector.substring(0, industryIndex);
                // }
                const sectorPercentChange = stocksBySector[sector].reduce(
                    (prev, cur) => (prev += cur["% Chg"] * cur["Weight"]),
                    0
                );

                return {
                    label: sectorLabel,
                    value: sectors[sector],
                    color: sectorPercentChange >= 0 ? "green" : "red",
                    brightness: Math.min(
                        Math.max(Math.abs(sectorPercentChange) * 2, 0.75),
                        1.25
                    ),
                };
            });

            const sectorTreeMap = getTreemap({
                data: sectorData,
                width: heatmapWidth, // the width and height of your treemap
                height: heatmapHeight,
            });
            const sectorDimensions = {};
            sectorTreeMap.forEach((sector) => {
                const { data, height, width, x, y } = sector;
                sectorDimensions[data.label] = { height, width, x, y };
            });
            const stockTreeMaps = {};
            Object.keys(stocksBySector).forEach((sector) => {
                // console.log(sectorDimensions[sector]);
                stockTreeMaps[sector] = getTreemap({
                    data: stocksBySector[sector],
                    width: sectorDimensions[sector].width,
                    height: sectorDimensions[sector].height,
                });
            });
            console.log(sectorTreeMap);
            console.log(stockTreeMaps);
            setSectorTreeMap(sectorTreeMap);
            setStockTreeMaps(stockTreeMaps);
        };
        getIndexTreeMap();
    }, []);

    // TODO
    // Add dropdown to app bar to choose index

    return (
        <Box
            sx={{
                padding: "20px",
                height: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <svg width={heatmapWidth} height={heatmapHeight}>
                {sectorTreeMap.map((rectangle) => (
                    <g
                        key={`${rectangle.x}:${rectangle.y}`}
                        fill={`${rectangle.data.color}`}
                        filter={`brightness(${rectangle.data.brightness})`}
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
                                fontSize: "10px",
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
    //
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
