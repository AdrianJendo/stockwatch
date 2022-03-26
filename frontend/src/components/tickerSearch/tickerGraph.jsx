import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Box } from "@mui/material";
import axios from "axios";

// trading view
import { SymbolInfo } from "react-ts-tradingview-widgets";
import { SymbolOverview } from "react-ts-tradingview-widgets";

const TickerGraph = (props) => {
    const { theme } = props;
    let { ticker } = useParams();
    const [stockInfo, setStockInfo] = useState(null);

    const lookupPriceData = async (interval, ticker) =>
        axios
            .get(`/api/ticker/${ticker}`, {
                params: {
                    interval,
                },
            })
            .then((resp) => {
                const priceData = JSON.parse(resp.data.priceData);
                const supData = JSON.parse(resp.data.supplementary_data);

                return {
                    priceData,
                    supData,
                };
            })
            .catch((err) => {
                alert(err.message);
                return null;
            });

    const lookUpFinancialData = async (ticker) =>
        axios
            .get(`/api/fundamentals/${ticker}`, {
                params: {
                    startDate: JSON.stringify(new Date().getFullYear() - 1),
                },
            })
            .then((resp) => {
                return JSON.parse(resp.data);
            })
            .catch((err) => {
                alert(err.message);
                return null;
            });

    useEffect(() => {
        const lookupAllData = async () => {
            lookupPriceData("1Y", ticker).then((resp) => {
                lookUpFinancialData(ticker).then((finStatements) => {
                    if (resp !== null && finStatements !== null) {
                        let dilutedShares = 0;
                        let netIncome = 0;
                        finStatements[new Date().getFullYear() - 1].ic.forEach(
                            (entry) => {
                                if (
                                    entry.concept ===
                                    "WeightedAverageNumberOfDilutedSharesOutstanding"
                                ) {
                                    dilutedShares = entry.value;
                                } else if (entry.concept === "NetIncomeLoss") {
                                    netIncome = entry.value;
                                }
                            }
                        );
                        let marketCap = resp.supData.lastPrice * dilutedShares;
                        const priceToEarnings = (marketCap / netIncome).toFixed(
                            2
                        );
                        if (marketCap > Math.pow(10, 12)) {
                            // Trillion
                            marketCap = `${(
                                marketCap / Math.pow(10, 12)
                            ).toFixed(2)}T`;
                        } else if (marketCap > Math.pow(10, 9)) {
                            // Billion
                            marketCap = `${(
                                marketCap / Math.pow(10, 9)
                            ).toFixed(2)}B`;
                        } else {
                            //Everything else if million
                            marketCap = `${(
                                marketCap / Math.pow(10, 6)
                            ).toFixed(2)}M`;
                        }

                        setStockInfo({
                            avgVolume: resp.supData.avg_volume,
                            highPrice52: resp.supData.high_price_52,
                            lowPrice52: resp.supData.low_price_52,
                            divYield: resp.supData.div_yield,
                            name: resp.supData.name,
                            exchange: resp.supData.exchangeCode,
                            lastPrice: resp.supData.lastPrice,
                            openPrice: resp.supData.openPrice,
                            highPrice: resp.supData.highPrice,
                            lowPrice: resp.supData.lowPrice,
                            marketCap,
                            priceToEarnings,
                        });
                    }
                });
            });
        };

        lookupAllData();
    }, [ticker]);

    return (
        <div>
            <div
                style={{
                    width: "100%",
                    minHeight: "110px",
                    margin: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
                <SymbolInfo
                    colorTheme={theme}
                    symbol={ticker}
                    autoSize
                    isTransparent={true}
                ></SymbolInfo>

                <SymbolOverview
                    colorTheme={theme}
                    symbols={[[ticker]]}
                    autoSize
                    chartOnly={true}
                />
            </div>

            {stockInfo && (
                <div
                    style={{
                        position: "relative",
                        width: "600px",
                        minHeight: "200px",
                        // margin: "20px",
                        margin: "auto",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Box
                                            display="flex"
                                            justifyContent="flex-end"
                                        >
                                            <Typography>Open</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box
                                            display="flex"
                                            justifyContent="flex-end"
                                        >
                                            <Typography>
                                                {stockInfo.openPrice}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Typography>Avg Volume</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            {`${(
                                                stockInfo.avgVolume /
                                                10 ** 6
                                            ).toFixed(2)}M`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Box
                                            display="flex"
                                            justifyContent="flex-end"
                                        >
                                            <Typography>High</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box
                                            display="flex"
                                            justifyContent="flex-end"
                                        >
                                            <Typography>
                                                {stockInfo.highPrice}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Typography>52-wk high</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            {stockInfo.highPrice52}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item xs={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Box
                                            display="flex"
                                            justifyContent="flex-end"
                                        >
                                            <Typography>Low</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box
                                            display="flex"
                                            justifyContent="flex-end"
                                        >
                                            <Typography>
                                                {stockInfo.lowPrice}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        <Typography>52-wk low</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            {stockInfo.lowPrice52}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default TickerGraph;
