import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lightTheme, darkTheme } from "theme/themes";
import Dashboard from "components/base/dashboard";

function App() {
    const [dark, setDark] = useState(true);

    return (
        <ThemeProvider
            theme={dark ? createTheme(darkTheme) : createTheme(lightTheme)}
        >
            <Dashboard dark={dark} setDark={setDark} />
        </ThemeProvider>
    );
}

export default App;
