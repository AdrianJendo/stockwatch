import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button, ButtonGroup, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import axios from "axios";
import Chart from "chart.js/auto";

const useStyles = makeStyles(() => ({
	main: {
		margin: "10px",
	},
	flexContainer: {
		display: "flex",
		flexDirection: "row",
		padding: 0,
	},
	paper: {
		margin: "30px",
	},
}));

const Comparisons = () => {
	const classes = useStyles();

	const [startDate, setStartDate] = useState(
		new Date(new Date().setFullYear(new Date().getFullYear() - 1))
	);
	const [endDate, setEndDate] = useState(new Date());
	const [tickerText, setTickerText] = useState("");
	const [stocks, setStocks] = useState(["AAPL", "MSFT", "CRM"]);
	const [hoveringOver, setHoveringOver] = useState(-1);

	const handleChange = (e) => {
		setTickerText(e.target.value);
	};

	const handleSubmit = (e) => {
		if (e.key === "Enter") {
			addStockToQueue();
		}
	};

	const addStockToQueue = () => {
		const newStocks = stocks.slice();
		if (
			tickerText.length <= 5 &&
			!newStocks.includes(tickerText.toUpperCase())
		) {
			newStocks.push(tickerText.toUpperCase());
			setStocks(newStocks);
			setTickerText("");
		} else {
			if (tickerText.length <= 5) {
				setTickerText("");
			}
			alert("Error");
		}
	};

	const removeStockFromQueue = (index) => {
		const newStocks = stocks.slice();
		newStocks.splice(index, 1);
		setStocks(newStocks);
	};

	function setZero(serverResponse) {
		return {
			data: new Array(serverResponse.index.length).fill(0),
			borderColor: "#000000",
			label: "basis",
			fill: true,
			borderWidth: 2,
		};
	}
	function loadData(dataObj, colors) {
		const priceData = [];
		for (let i = 0; i < dataObj.columns.length; ++i) {
			const temp = [];
			for (let j = 0; j < dataObj.data.length; ++j) {
				temp.push(dataObj.data[j][i]);
			}
			if (i < colors.length) {
				priceData.push({
					data: temp,
					label: dataObj.columns[i],
					borderColor: colors[i],
					fill: false,
				});
			} else {
				priceData.push({
					data: temp,
					label: dataObj.columns[i],
					borderColor: "#3e95cd",
					fill: false,
				});
			}
		}
		return priceData;
	}

	const loadGraph = (
		dataObj,
		ctx,
		title,
		zero_line = false,
		colors = [
			"#3e95cd",
			"#8e5ea2",
			"#3cba9f",
			"#e8c3b9",
			"#c45850",
			"#F0E68C",
			"#00CED1",
			"#CD5C5C",
		]
	) => {
		const relativePrices = loadData(dataObj, colors);
		if (zero_line) {
			relativePrices.push(setZero(dataObj));
		}

		new Chart(ctx, {
			type: "line",
			data: {
				labels: dataObj.index,
				datasets: relativePrices,
			},
			options: {
				title: {
					display: true,
					text: title,
				},
				elements: {
					point: {
						radius: 0,
					},
				},
				scales: {
					xAxes: [
						{
							ticks: {
								maxTicksLimit: 42,
							},
						},
					],
				},
			},
		});
	};

	const graphStocks = () => {
		const comparisonsChart = Chart.getChart("comparisonsChart");
		try {
			comparisonsChart.destroy();
		} catch {}
		const ctx = document
			.getElementById("comparisonsChart")
			.getContext("2d");
		ctx.font = "30px Arial";
		ctx.fillText("Loading...", 10, 50);
		axios
			.get("/api/comparisons", {
				params: {
					startDate: startDate.toDateString(),
					endDate: endDate.toDateString(),
					stocks: JSON.stringify(stocks),
				},
			})
			.then((resp) => {
				loadGraph(JSON.parse(resp.data), ctx, "Relative stock returns");
			})
			.catch((err) => alert(err.message));
	};

	return (
		<div>
			<TextField
				className={classes.main}
				label="Add Ticker"
				type="search"
				value={tickerText}
				onChange={handleChange}
				onKeyPress={handleSubmit}
			/>
			<Button
				className={classes.main}
				color={tickerText !== "" ? "primary" : "inherit"}
				variant={tickerText !== "" ? "contained" : "outlined"}
				onClick={addStockToQueue}
			>
				Add
			</Button>
			<div className={classes.paper}>
				<ButtonGroup
					variant="text"
					color="primary"
					aria-label="text primary button group"
				>
					{stocks.map((stock, index) => (
						<Button
							color={
								index == hoveringOver ? "secondary" : "primary"
							}
							onMouseEnter={() => setHoveringOver(index)}
							onMouseLeave={() => setHoveringOver(-1)}
							onClick={() => removeStockFromQueue(index)}
							key={index}
						>
							{stock}
						</Button>
					))}
				</ButtonGroup>
			</div>
			<Button
				className={classes.main}
				variant="contained"
				color="primary"
				onClick={graphStocks}
			>
				Graph
			</Button>
			<DatePicker
				variant="inline"
				openTo="year"
				views={["year", "month"]}
				label="Start Date"
				value={startDate}
				onChange={setStartDate}
				maxDate={endDate.toDateString()}
				minDate={new Date(
					new Date().setFullYear(new Date().getFullYear() - 20)
				).toDateString()}
			/>
			<DatePicker
				variant="inline"
				openTo="year"
				views={["year", "month"]}
				label="End Date"
				value={endDate}
				onChange={setEndDate}
				maxDate={new Date().toDateString()}
				minDate={startDate.toDateString()}
			/>
			<div>
				<canvas id="comparisonsChart"></canvas>
			</div>
		</div>
	);
};

// Comparisons.propTypes = {
//   match: PropTypes.object,
// };

export default Comparisons;
