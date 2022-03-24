import * as React from "react";
import Box from "@mui/material/Box";

// trading view
import { MarketData } from "react-ts-tradingview-widgets";
import { StockMarket } from "react-ts-tradingview-widgets";
import { ForexCrossRates } from "react-ts-tradingview-widgets";
import { CryptoCurrencyMarket } from "react-ts-tradingview-widgets";

const MarketOverview = (props) => {
    const { theme } = props;
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexWrap: "wrap",
                overflow: "none",
            }}
        >
            <div style={{ width: "50%", height: "100%" }}>
                <div style={{ height: "50%" }}>
                    <MarketData colorTheme={theme} autoSize={true}></MarketData>
                </div>
                <div style={{ height: "50%" }}>
                    <ForexCrossRates
                        colorTheme={theme}
                        autoSize={true}
                    ></ForexCrossRates>
                </div>
            </div>
            <div style={{ width: "50%", height: "100%" }}>
                <div style={{ height: "50%" }}>
                    <CryptoCurrencyMarket
                        colorTheme={theme}
                        width="100%"
                        height={450}
                    ></CryptoCurrencyMarket>
                </div>
                <div style={{ height: "50%" }}>
                    <StockMarket
                        colorTheme={theme}
                        autoSize={true}
                        width="100%"
                        height={400}
                        // symbolActiveColor="rgba(0, 255, 0, 0.12)"
                        // plotLineColorGrowing="rgba(41, 98, 255, 1)"
                        // plotLineColorFalling="rgba(255, 0, 0, 1)"
                        // belowLineFillColorGrowing="rgba(41, 98, 255, 0.12)"
                        // belowLineFillColorFalling="rgba(255, 0, 0, 0.12)"
                        showChart={false}
                    ></StockMarket>
                </div>
            </div>
        </Box>
    );
};

export default MarketOverview;
