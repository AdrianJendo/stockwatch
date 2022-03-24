import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

// trading view
import { MarketData } from "react-ts-tradingview-widgets";
import { StockMarket } from "react-ts-tradingview-widgets";
import { ForexCrossRates } from "react-ts-tradingview-widgets";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flexGrow: 1,
    overflow: "hidden",
}));
const MarketOverview = () => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexWrap: "wrap",
            }}
        >
            <Item
                sx={{
                    height: "48%",
                    width: "60%",
                }}
            >
                <MarketData colorTheme="dark" autoSize={true}></MarketData>
            </Item>
            <Item
                sx={{
                    height: "100%",
                    width: "15%",
                }}
            >
                <StockMarket
                    colorTheme="dark"
                    autoSize
                    symbolActiveColor="rgba(0, 255, 0, 0.12)"
                    plotLineColorGrowing="rgba(41, 98, 255, 1)"
                    plotLineColorFalling="rgba(255, 0, 0, 1)"
                    belowLineFillColorGrowing="rgba(41, 98, 255, 0.12)"
                    belowLineFillColorFalling="rgba(255, 0, 0, 0.12)"
                ></StockMarket>
            </Item>
            <Item
                sx={{
                    height: "20%",
                    width: "61.5%",
                }}
            >
                <ForexCrossRates colorTheme="dark" autosize></ForexCrossRates>
            </Item>
            <Item
                sx={{
                    height: "48%",
                    width: "45%",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        top: "40%",
                    }}
                >
                    <MarketData
                        colorTheme="dark"
                        width="100%"
                        height="100%"
                        isTransparent
                    ></MarketData>
                </div>
            </Item>
        </Box>
    );
};

export default MarketOverview;
