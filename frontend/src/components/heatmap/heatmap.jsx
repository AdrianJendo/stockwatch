import React, { useEffect, useState } from "react";
import axios from "axios";

import { Box, Paper, styled } from "@mui/material";

// Article https://medium.com/@clementb/building-a-treemap-with-javascript-4d789ad43a85
// Package from https://github.com/clementbat/treemap
import { getTreemap } from "treemap-squarify";

const heatmapWidth = 1500;
const heatmapHeight = 800;
const sectorCorrector = 14;
const subSectorCorrector = 12;
// TODO
// Add dropdown to app bar to choose index

const Heatmap = (props) => {
    const [sectorTreemap, setSectorTreemap] = useState([]);
    const [stockTreemaps, setStockTreemaps] = useState({});
    const [subSectorTreemaps, setSubSectorTreemaps] = useState(null);

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
            const subSectors = JSON.parse(data.sub_sectors);

            // format for treemap
            const formattedSubSectors = {};
            Object.keys(subSectors).forEach((sector) => {
                formattedSubSectors[sector] = Object.keys(
                    subSectors[sector]
                ).map((subSector) => ({
                    label: subSector === "null" ? null : subSector,
                    value: subSectors[sector][subSector],
                }));
            });

            // sort stocks into their respective sectors and format for getTreemap funcion
            const stocksBySector = {};
            stocks.forEach((stock) => {
                const key = stock.SubSector ? stock.SubSector : stock.Sector;
                if (!stocksBySector[key]) {
                    stocksBySector[key] = [];
                }
                stocksBySector[key].push({
                    ["% Chg"]: stock["% Chg"],
                    Weight: stock["Weight"],
                    label: stock.Symbol,
                    value: stock.Weight,
                    color: stock.Chg >= 0 ? "green" : "red",
                    brightness: Math.min(
                        Math.max(Math.abs(stock["% Chg"] * 8), 0.75),
                        1.25
                    ),
                });
            });

            // format sector data for getTreemap function
            const sectorData = Object.keys(sectors).map((sector) => {
                return {
                    label: sector,
                    value: sectors[sector],
                };
            });

            // sort sector data by largest to smallest sectors (passes by value)
            sectorData.sort((a, b) => b.value - a.value);

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
                sectorDimensions[data.label] = {
                    height: height - sectorCorrector,
                    width,
                    x,
                    y,
                };
            });

            // populate sub sector weights for getTreemap function if exist
            const subSectorTreemaps =
                Object.values(formattedSubSectors)[0][0].label && {};
            const subSectorDimensions = {};
            if (subSectorTreemaps) {
                Object.keys(formattedSubSectors).forEach((sector) => {
                    formattedSubSectors[sector].sort(
                        (a, b) => b.value - a.value
                    );
                    subSectorTreemaps[sector] = getTreemap({
                        data: formattedSubSectors[sector],
                        width: sectorDimensions[sector].width,
                        height: sectorDimensions[sector].height,
                    });

                    subSectorTreemaps[sector].forEach((subSector) => {
                        const { data, height, width, x, y } = subSector;
                        subSectorDimensions[data.label] = {
                            height: height - subSectorCorrector,
                            width,
                            x,
                            y,
                        };
                    });
                });
            }

            // transform each list of stocks (sorted by sector) into their treemaps
            const stockTreemaps = {};
            const dimensionsDict = subSectorTreemaps
                ? subSectorDimensions
                : sectorDimensions;
            Object.keys(stocksBySector).forEach((sector) => {
                stockTreemaps[sector] = getTreemap({
                    data: stocksBySector[sector],
                    width: dimensionsDict[sector].width,
                    height: dimensionsDict[sector].height,
                });
            });
            setStockTreemaps(stockTreemaps);
            setSubSectorTreemaps(subSectorTreemaps);
            setSectorTreemap(sectorTreemap);
        };
        setSectorTreemap([]);
        setStockTreemaps({});
        setSubSectorTreemaps(null);
        getIndexTreemap();
    }, [index]);

    console.log(sectorTreemap, stockTreemaps);

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
                {sectorTreemap.map((sector) => (
                    <g key={sector.data.label}>
                        <svg
                            x={sector.x}
                            y={sector.y + sectorCorrector}
                            height={sector.height - sectorCorrector}
                            width={sector.width}
                        >
                            {subSectorTreemaps !== null
                                ? subSectorTreemaps[sector.data.label].map(
                                      (subSector) => (
                                          <g key={subSector.data.label}>
                                              <svg
                                                  x={subSector.x}
                                                  y={
                                                      subSector.y +
                                                      subSectorCorrector
                                                  }
                                                  height={
                                                      subSector.height -
                                                      subSectorCorrector
                                                  }
                                              >
                                                  {stockTreemaps[
                                                      subSector.data.label
                                                  ].map((stock) => (
                                                      <g
                                                          key={stock.data.label}
                                                          fill={`${stock.data.color}`}
                                                          filter={`brightness(${stock.data.brightness})`}
                                                      >
                                                          <rect
                                                              x={stock.x}
                                                              y={stock.y}
                                                              width={
                                                                  stock.width
                                                              }
                                                              height={
                                                                  stock.height
                                                              }
                                                              strokeWidth="1"
                                                              stroke="black"
                                                          ></rect>

                                                          <text
                                                              style={{
                                                                  position:
                                                                      "relative",
                                                                  dominantBaseline:
                                                                      "middle",
                                                                  textAnchor:
                                                                      "middle",
                                                                  cursor: "default",
                                                                  userSelect:
                                                                      "none",
                                                                  fontSize:
                                                                      "10px",
                                                              }}
                                                              x={
                                                                  stock.x +
                                                                  stock.width /
                                                                      2
                                                              }
                                                              y={
                                                                  stock.y +
                                                                  stock.height /
                                                                      2
                                                              }
                                                              fill="white"
                                                          >
                                                              {stock.data.label}
                                                          </text>
                                                          <text
                                                              style={{
                                                                  position:
                                                                      "relative",
                                                                  dominantBaseline:
                                                                      "middle",
                                                                  textAnchor:
                                                                      "middle",
                                                                  cursor: "default",
                                                                  userSelect:
                                                                      "none",
                                                                  fontSize:
                                                                      "10px",
                                                              }}
                                                              x={
                                                                  stock.x +
                                                                  stock.width /
                                                                      2
                                                              }
                                                              y={
                                                                  stock.y +
                                                                  stock.height /
                                                                      2 +
                                                                  16
                                                              }
                                                              fill="white"
                                                          >
                                                              {
                                                                  stock.data[
                                                                      "% Chg"
                                                                  ]
                                                              }
                                                              %
                                                          </text>
                                                      </g>
                                                  ))}
                                              </svg>
                                              <svg
                                                  width={subSector.width}
                                                  x={subSector.x}
                                                  y={subSector.y}
                                                  height="12"
                                              >
                                                  <text
                                                      style={{
                                                          dominantBaseline:
                                                              "middle",
                                                          textAnchor: "middle",
                                                          cursor: "default",
                                                          userSelect: "none",
                                                          fontSize: "8px",
                                                      }}
                                                      x={subSector.width / 2}
                                                      y="8"
                                                      fill="white"
                                                  >
                                                      {subSector.data.label}
                                                  </text>
                                              </svg>
                                          </g>
                                      )
                                  )
                                : stockTreemaps[sector.data.label].map(
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
                                                  strokeWidth="1"
                                                  stroke="black"
                                              ></rect>
                                              <text
                                                  style={{
                                                      position: "relative",
                                                      dominantBaseline:
                                                          "middle",
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
                        <svg
                            width={sector.width}
                            x={sector.x}
                            y={sector.y}
                            height="16"
                        >
                            <text
                                style={{
                                    dominantBaseline: "middle",
                                    textAnchor: "middle",
                                    cursor: "default",
                                    userSelect: "none",
                                    fontSize: "12px",
                                }}
                                x={sector.width / 2}
                                y="8"
                                fill="white"
                            >
                                {sector.data.label}
                            </text>
                        </svg>
                    </g>
                ))}
                Sorry, your browser does not support inline SVG.
            </svg>
        </Box>
    );
};

export default Heatmap;
