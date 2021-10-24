import React from "react";
import Routes from "./Routes.jsx";
import { ThemeProvider, createTheme } from "@material-ui/core";

const darkTheme = createTheme({
	palette: {
		type: "dark",
	},
});

function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<Routes />
		</ThemeProvider>
	);
}

export default App;
