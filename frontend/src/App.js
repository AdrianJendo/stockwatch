import React, { useState } from "react";
// import Routes from "./Routes.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lightTheme, darkTheme } from "theme/themes";
import Header from "components/base/header";

function App() {
    const [dark, setDark] = useState(true);

    return (
        <ThemeProvider
            theme={dark ? createTheme(darkTheme) : createTheme(lightTheme)}
        >
            <Header dark={dark} setDark={setDark} />
            {/* <Routes /> */}
        </ThemeProvider>
    );
}

export default App;
