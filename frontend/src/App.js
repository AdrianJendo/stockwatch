import React from "react";
import Routes from "./Routes.jsx";
import { ThemeProvider, createTheme } from "@material-ui/core";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const darkTheme = createTheme({
	palette: {
		type: "dark",
	},
});

function App() {
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<ThemeProvider theme={darkTheme}>
				<Routes />
			</ThemeProvider>
		</MuiPickersUtilsProvider>
	);
}

export default App;
