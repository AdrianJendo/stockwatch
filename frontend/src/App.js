import React, { useState } from "react";

// style
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lightTheme, darkTheme } from "theme/themes";

// components
import Dashboard from "components/base/dashboard";

// date
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

function App() {
    const [dark, setDark] = useState(true);

    return (
        <ThemeProvider
            theme={dark ? createTheme(darkTheme) : createTheme(lightTheme)}
        >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Dashboard dark={dark} setDark={setDark} />
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
