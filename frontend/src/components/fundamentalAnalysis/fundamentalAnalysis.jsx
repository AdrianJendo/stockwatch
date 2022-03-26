import React from "react";
import Box from "@mui/material/Box";

// trading view
import { CompanyProfile } from "react-ts-tradingview-widgets";
import { FundamentalData } from "react-ts-tradingview-widgets";

const FundamentalAnalysis = (props) => {
    const { theme } = props;
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexWrap: "wrap",
                overflow: "none",
                // justifyContent: "space-between",
            }}
        >
            <div style={{ padding: "20px" }}>
                <CompanyProfile colorTheme={theme} autoSize></CompanyProfile>
            </div>

            <div style={{ padding: "20px" }}>
                <FundamentalData colorTheme={theme} autoSize></FundamentalData>
            </div>
        </Box>
    );
};

export default FundamentalAnalysis;
