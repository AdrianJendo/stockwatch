import React, { useEffect, useState } from "react";
import axios from "axios";

import { Box, Paper, styled } from "@mui/material";

// Article https://medium.com/@clementb/building-a-treemap-with-javascript-4d789ad43a85
// Package from https://github.com/clementbat/treemap
import { getTreemap } from "treemap-squarify";

const heatmapWidth = 1500;
const heatmapHeight = 800;

// TODO
// Add dropdown to app bar to choose index

const Heatmap = (props) => {
    const [sectorTreemap, setSectorTreemap] = useState([]);
    const [stockTreemaps, setStockTreemaps] = useState({});

    const { index } = props;

    useEffect(() => {
        const getIndexTreemap = async () => {
            // get heatmap data from backend
            const heatmapResponse = await axios.get("/api/heatmap", {
                params: {
                    index,
                },
            });

            const data = heatmapResponse.data;
            const stocks = JSON.parse(data.stocks);
            const sectors = JSON.parse(data.sectors);

            // sort stocks into their respective sectors and format for getTreemap funcion
            const stocksBySector = {};
            stocks.forEach((stock, index) => {
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
                        Math.max(Math.abs(stock["% Chg"] * 8), 0.75),
                        1.25
                    ),
                    index,
                    sector: stock.Sector,
                });
            });

            // format sector data for getTreemap function
            const sectorData = Object.keys(sectors).map((sector) => {
                return {
                    label: sector,
                    value: sectors[sector],
                };
            });

            // transform sectorData to treemap
            const sectorTreemap = getTreemap({
                data: sectorData,
                width: heatmapWidth,
                height: heatmapHeight,
            });

            // define dimensions of each sector as boundaries for their stocks
            const sectorDimensions = {};
            sectorTreemap.forEach((sector) => {
                const { data, height, width, x, y } = sector;
                sectorDimensions[data.label] = { height, width, x, y };
            });

            // transform each list of stocks (sorted by sector) into their treemaps
            const stockTreemaps = {};
            Object.keys(stocksBySector).forEach((sector) => {
                stockTreemaps[sector] = getTreemap({
                    data: stocksBySector[sector],
                    width: sectorDimensions[sector].width,
                    height: sectorDimensions[sector].height,
                });
            });
            setStockTreemaps(stockTreemaps);
            setSectorTreemap(sectorTreemap);
        };
        getIndexTreemap();
    }, []);

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
                {sectorTreemap.map((rectangle) => (
                    <g key={`${rectangle.x}:${rectangle.y}`}>
                        <rect
                            x={rectangle.x}
                            y={rectangle.y}
                            width={rectangle.width}
                            height={rectangle.height}
                        ></rect>
                        <svg x={rectangle.x} y={rectangle.y}>
                            {stockTreemaps[rectangle.data.label].map(
                                (stock) => (
                                    <g
                                        key={stock.data.label}
                                        fill={`${stock.data.color}`}
                                        filter={`brightness(${stock.data.brightness})`}
                                    >
                                        <rect
                                            x={stock.x}
                                            y={stock.y}
                                            width={stock.width}
                                            height={stock.height}
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
                                            x={stock.x + stock.width / 2}
                                            y={stock.y + stock.height / 2}
                                            fill="white"
                                        >
                                            {stock.data.label}
                                        </text>
                                    </g>
                                )
                            )}
                        </svg>
                    </g>
                ))}
                Sorry, your browser does not support inline SVG.
            </svg>
        </Box>
    );
};

export default Heatmap;
