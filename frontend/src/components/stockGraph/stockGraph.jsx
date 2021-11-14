import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createChart } from "lightweight-charts";
import { makeStyles, Button, Grid, Typography } from "@material-ui/core";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import axios from "axios";

const positiveReturn = "#4CAF50";
const negativeReturn = "#f28b82";

const useStyles = makeStyles(() => ({
	intervalSwitcher: {
		position: "relative",
		// display: "flex",
		textAlign: "center",
		height: "30px",
		marginTop: "8px",
		margin: "20px",
		width: "800px",
		color: "#2196F3",
	},
	chartContainer: {
		margin: "20px",
	},
	headerDiv: {
		width: "800px",
		minHeight: "110px",
		margin: "20px",
	},
	footerDiv: {
		width: "800px",
		minHeight: "200px",
		margin: "20px",
	},
}));

const intervals = ["1D", "5D", "1M", "6M", "YTD", "1Y", "5Y", "MAX"];
const translations = {
	"1D": "today",
	"5D": "past 5 days",
	"1M": "past month",
	"6M": "past 6 months",
	YTD: "year to date",
	"1Y": "past year",
	"5Y": "past 5 years",
	MAX: "all time",
};

const StockGraph = () => {
	let { ticker } = useParams();
	const classes = useStyles();
	const [selectedInterval, setSelectedInterval] = useState("YTD");
	const [chart, setChart] = useState(null);
	const [areaSeries, setAreaSeries] = useState(null);
	const [stockInfo, setStockInfo] = useState(null); // For data that doesn't change after first call
	const [priceInfo, setPriceInfo] = useState(null); // Data that does change after first call

	const changeInterval = (interval) => {
		setPriceInfo(null);
		if (interval !== selectedInterval) {
			setSelectedInterval(interval);
		}
	};

	const lookUpData = async (interval, ticker) =>
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

	useEffect(() => {
		if (chart) {
			if (areaSeries) {
				chart.removeSeries(areaSeries);
			}
			lookUpData(selectedInterval, ticker).then((resp) => {
				if (resp !== null) {
					const priceData = resp.priceData;
					const newAreaSeries = chart.addAreaSeries({
						topColor:
							resp.supData.priceChange > 0
								? "rgba(76, 175, 80, 0.56)"
								: "rgba(242, 139, 130, 0.56)",
						bottomColor:
							resp.supData.priceChange > 0
								? "rgba(76, 175, 80, 0.04)"
								: "rgba(242, 139, 130, 0.04)",
						lineColor:
							resp.supData.priceChange > 0
								? "rgba(76, 175, 80, 1)"
								: "rgba(242, 139, 130, 1)",
						lineWidth: 2,
					});
					newAreaSeries.setData(priceData);
					chart.timeScale().fitContent();

					setAreaSeries(newAreaSeries);
					setPriceInfo({
						percentChange: resp.supData.percentChange,
						priceChange: resp.supData.priceChange,
					});
				}
			});
		}
	}, [selectedInterval]);

	useEffect(async () => {
		document.getElementById("ticker-graph").innerHTML = ""; // Make sure its empty
		const chartElem = document.getElementById("ticker-graph");
		const newChart = createChart(chartElem, {
			width: 800,
			height: 400,
			layout: {
				backgroundColor: "#000000",
				textColor: "#d1d4dc",
			},
			grid: {
				vertLines: {
					visible: false,
				},
				horzLines: {
					color: "rgba(42, 46, 57, 0.5)",
				},
			},
			// rightPriceScale: {
			// 	borderVisible: false,
			// },
			timeScale: {
				// borderVisible: false,
				// fixLeftEdge: true,
				minBarSpacing: 0.001,
			},
			crosshair: {
				horzLine: {
					visible: false,
				},
			},
			handleScroll: {
				mouseWheel: false,
				pressedMouseMove: false,
				horzTouchDrag: false,
				vertTouchDrag: false,
			},
			handleScale: {
				axisPressedMouseMove: false,
				mouseWheel: false,
				pinch: false,
			},
		});
		lookUpData(selectedInterval, ticker).then((resp) => {
			if (resp !== null) {
				const priceData = resp.priceData;
				const newAreaSeries = newChart.addAreaSeries({
					topColor:
						resp.supData.priceChange > 0
							? "rgba(76, 175, 80, 0.56)"
							: "rgba(242, 139, 130, 0.56)",
					bottomColor:
						resp.supData.priceChange > 0
							? "rgba(76, 175, 80, 0.04)"
							: "rgba(242, 139, 130, 0.04)",
					lineColor:
						resp.supData.priceChange > 0
							? "rgba(76, 175, 80, 1)"
							: "rgba(242, 139, 130, 1)",
					lineWidth: 2,
				});
				newAreaSeries.setData(priceData);
				newChart.timeScale().fitContent();

				setAreaSeries(newAreaSeries);
				setPriceInfo({
					percentChange: resp.supData.percentChange,
					priceChange: resp.supData.priceChange,
				});
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
				});
				setChart(newChart);
			}
		});
	}, []);

	return (
		<div>
			<div className={classes.headerDiv}>
				{stockInfo && (
					<div>
						<Grid container spacing={1}>
							<Grid
								container
								item
								xs={12}
								spacing={3}
								alignItems="baseline"
							>
								<Grid item xs={6}>
									<Typography variant="h4">
										{stockInfo.name}
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography align="right">
										{stockInfo.exchange} :{" "}
										{ticker.toUpperCase()}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						{priceInfo && (
							<Grid container spacing={1}>
								<Grid container item xs={12} spacing={3}>
									<Grid item xs={4}>
										<Typography
											variant="h5"
											display="inline"
										>
											{stockInfo.lastPrice}{" "}
										</Typography>
										USD
									</Grid>
								</Grid>
								<Grid container item xs={12} spacing={3}>
									<Grid item xs={6}>
										{priceInfo.priceChange > 0 ? (
											<Typography
												style={{
													color: positiveReturn,
												}}
											>
												+{priceInfo.priceChange} (
												{priceInfo.percentChange}%){" "}
												<ArrowUpward fontSize="small" />{" "}
												{translations[selectedInterval]}
											</Typography>
										) : (
											<Typography
												style={{
													color: negativeReturn,
												}}
											>
												{priceInfo.priceChange} (
												{priceInfo.percentChange}%){" "}
												<ArrowDownward fontSize="small" />{" "}
												{translations[selectedInterval]}
											</Typography>
										)}
									</Grid>
								</Grid>
							</Grid>
						)}
					</div>
				)}
			</div>
			<div id="ticker-graph" className={classes.chartContainer} />
			<div className={classes.intervalSwitcher}>
				{intervals.map((interval, index) => (
					<Button
						className={
							selectedInterval == interval
								? "switcher-item-active"
								: "switcher-item"
						}
						onClick={() => changeInterval(interval)}
						key={index}
					>
						{interval}
					</Button>
				))}
			</div>
			{stockInfo && (
				<div className={classes.footerDiv}>
					<Grid container spacing={1}>
						<Grid container item xs={12} spacing={3}>
							<Grid item xs={4}>
								<Grid container spacing={1}>
									<Grid item xs={6}>
										<Typography variant="subtitle1">
											Open
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="subtitle2">
											{stockInfo.openPrice}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={4}>
								<Grid container spacing={1}>
									<Grid item xs={6}>
										<Typography variant="subtitle1">
											Mkt cap
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="subtitle2"></Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={4}>
								<Grid container spacing={1}>
									<Grid item xs={6}>
										<Typography variant="subtitle1">
											Avg Volume
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="subtitle2">
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
							<Grid item xs={4}>
								<Grid container spacing={1}>
									<Grid item xs={6}>
										<Typography variant="subtitle1">
											High
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="subtitle2">
											{stockInfo.highPrice}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={4}>
								<Grid container spacing={1}>
									<Grid item xs={6}>
										<Typography variant="subtitle1">
											P/E ratio
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="subtitle2"></Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={4}>
								<Grid container spacing={1}>
									<Grid item xs={6}>
										<Typography variant="subtitle1">
											52-wk high
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="subtitle2">
											{stockInfo.highPrice52}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Grid container item xs={12} spacing={3}>
							<Grid item xs={4}>
								<Grid container spacing={1}>
									<Grid item xs={6}>
										<Typography variant="subtitle1">
											Low
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="subtitle2">
											{stockInfo.lowPrice}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={4}>
								<Grid container spacing={1}>
									<Grid item xs={6}>
										<Typography variant="subtitle1">
											Div yield
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="subtitle2">
											{stockInfo.divYield > 0
												? `${stockInfo.divYield}%`
												: "--"}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={4}>
								<Grid container spacing={1}>
									<Grid item xs={6}>
										<Typography variant="subtitle1">
											52-wk low
										</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="subtitle2">
											{stockInfo.lowPrice52}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</div>
			)}
			<div>
				Try and get volume on chart too (and ideally the pinch thing to
				see the % change between a and b) AND SHOW HIGH AND LOW POINTS
			</div>
			<div>
				I also need to figure out what to do with 1D and 5D charts
				eventually but thats a later issue
			</div>
			<div>
				Add the useful info like open high low, mkt cap, etc. (basically
				what google has)
			</div>
			<div>
				Figure out what to do about typing in a new ticker not working
			</div>
		</div>
	);
};

export default StockGraph;
