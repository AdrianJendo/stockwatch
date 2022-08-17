import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import * as XLSX from "xlsx";

import { TextField, Button, Typography } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";

import ComparisonStocksTable from "components/comparisons/comparisonStocksTable";

const Comparisons = () => {
	return (
		<div
			style={{
				height: "100%",
				overflow: "auto",
			}}
		>
			<div
				style={{
					display: "flex",
					width: "90%",
					margin: "auto",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						display: "flex",
						borderRadius: "5%",
						border: "1px solid black",
						width: "240px",
						margin: "20px",
					}}
				>
					<TextField
						label="Login"
					// value={tickerText}
					// onChange={handleTickerTextChange}
					// onKeyPress={handleAddStock}
					/>
					<Button
					// variant={tickerText !== "" ? "contained" : "outlined"}
					// disabled={tickerText === ""}
					// onClick={() => addStockToComparison(tickerText)}
					>
						Add
					</Button>
				</div>

				<Button
					sx={{
						display: "flex",
						margin: "30px auto",
					}}
					variant="contained"
					color="primary"

				>
					Graph
				</Button>
			</div>
		</div>
	);
};

export default Comparisons;
