import React from "react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

const TickerView = (props) => {
    const { theme } = props;
    return (
        <div style={{ position: "relative", height: "100%" }}>
            <AdvancedRealTimeChart
                theme={theme}
                watchlist={["AAPL", "IBM", "TSLA", "AMD", "MSFT", "GOOG"]}
                range="12M"
                withdateranges={true}
                autosize
            />
        </div>
    );
};

export default TickerView;
