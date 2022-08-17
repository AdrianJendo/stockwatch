import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import * as XLSX from "xlsx";

// mui
import { styled, useTheme } from "@mui/material/styles";
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    Link,
    ListItemText,
    Select,
    MenuItem,
    Button,
} from "@mui/material";
import {
    Dashboard,
    TrendingUp,
    CompareArrows,
    AttachMoney,
    ScreenSearchDesktop,
    Menu,
    ChevronLeft,
    ChevronRight,
    GridView,
    CandlestickChart,
    Info,
    CurrencyBitcoin,
} from "@mui/icons-material";

// components
import MUISwitch from "components/base/muiSwitch";
import MarketOverview from "components/marketOverview/marketOverview";
import Watchlists from "components/watchlists/watchlistView";
import TickerSearch from "components/tickerSearch/tickerSearch";
import TickerGraph from "components/tickerSearch/tickerGraph";
import Heatmap from "components/heatmap/heatmap";
import Comparisons from "components/comparisons/comparisons";
import TechnicalAnalysis from "components/technicalAnalysis/technicalAnalysis";
import TechnicalScreener from "components/technicalScreener/technicalScreener";
import FundamentalAnalysis from "components/fundamentalAnalysis/fundamentalAnalysis";
import About from "components/about/about";
import Crypto from "components/crypto/crypto";
import Login from "components/auth/login";
import Register from "components/auth/register"

const drawerWidth = 230;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        flexGrow: 1,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
        backgroundColor: theme.palette.background.default,
        height: "100%",
        overflow: "auto",
    })
);

const StyledAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft(props) {
    const { dark, setDark } = props;
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState("sp500");
    const [heatmapPortfolios, setHeatmapPortfolios] = useState({});
    const [user, setUser] = useState(null);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const toggleSwitch = () => {
        setDark(!dark);
    };

    const uploadPortfolio = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        try {
            fileReader.readAsBinaryString(file);
        } catch { }

        fileReader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            // only use first sheet
            const wsName = wb.SheetNames[0];
            const ws = wb.Sheets[wsName];
            const wsData = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            const wsRows = wsData.split("\n");
            const rowData = wsRows.slice(1);
            const columns = wsRows[0].toLowerCase().split(",");
            const containsWeightsCol = columns.includes("weight");
            const portfolio = {};

            let weightSum = 0;
            rowData.forEach((row) => {
                const rowVals = row.split(",");
                const ticker = rowVals[0];
                const weight = containsWeightsCol
                    ? parseInt(rowVals[1]) / 100
                    : Math.floor((1 / rowData.length) * 100) / 100;

                portfolio[ticker] = weight;
                weightSum += weight;
            });

            if (weightSum > 1) {
                alert("Portfolio weights are greater than 1");
                return;
            }

            const newHeatmapPortfolios = { ...heatmapPortfolios };
            newHeatmapPortfolios[wsName] = portfolio;
            setHeatmapPortfolios(newHeatmapPortfolios);
        };

        e.target.value = "";
    };

    const colorTheme = dark ? "dark" : "light";

    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                height: "100vh",
                padding: 0,
            }}
        >
            <Router>
                <StyledAppBar position="fixed" open={user && open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: "none" }) }}
                        >
                            <Menu />
                        </IconButton>
                        <div style={{ display: "flex", flexGrow: 1 }}>
                            <Link
                                href="/"
                                color="inherit"
                                sx={{ paddingRight: 10 }}
                                underline="none"
                            >
                                <Typography variant="h6" noWrap component="div">
                                    Stock Watch
                                </Typography>
                            </Link>
                            {user &&
                                <TickerSearch />
                            }
                            {user && window.location.href.includes("heatmap") && (
                                <div
                                    style={{
                                        display: "flex",
                                        margin: "auto",
                                    }}
                                >
                                    <Select
                                        value={selectedIndex}
                                        label="Index"
                                        onChange={(e) =>
                                            setSelectedIndex(e.target.value)
                                        }
                                        sx={{
                                            margin: "auto 20px",
                                            height: "38px",
                                        }}
                                    >
                                        <MenuItem value={"sp500"}>
                                            {"S&P 500"}
                                        </MenuItem>
                                        <MenuItem value={"nasdaq100"}>
                                            NASDAQ 100
                                        </MenuItem>
                                        <MenuItem value={"dowjones"}>
                                            Dow Jones
                                        </MenuItem>
                                        {Object.keys(heatmapPortfolios).map(
                                            (portfolio) => (
                                                <MenuItem
                                                    key={portfolio}
                                                    value={portfolio}
                                                >
                                                    {portfolio}
                                                </MenuItem>
                                            )
                                        )}
                                    </Select>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        sx={{
                                            margin: "auto 20px",
                                        }}
                                        onChange={(e) => uploadPortfolio(e)}
                                    >
                                        Upload Portfolio
                                        <input type="file" hidden />
                                    </Button>
                                </div>
                            )}
                        </div>
                        {/* <MUISwitch defaultChecked toggleSwitch={toggleSwitch} /> */}
                        {user ? <Button
                            variant="contained"
                        >
                            Logout
                            <input type="file" hidden />
                        </Button> : <Button
                            variant="contained"
                        >
                            Login
                            <input type="file" hidden />
                        </Button>}
                    </Toolbar>
                </StyledAppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={user && open}
                >
                    <DrawerHeader>
                        <IconButton onClick={toggleDrawer}>
                            {theme.direction === "ltr" ? (
                                <ChevronLeft />
                            ) : (
                                <ChevronRight />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {[
                            {
                                text: "Market Overview",
                                icon: <GridView />,
                                link: "/",
                            },
                            {
                                text: "Watchlists",
                                icon: <TrendingUp />,
                                link: "/watchlists",
                            },
                            {
                                text: "Heatmap",
                                icon: <Dashboard />,
                                link: "/heatmap",
                            },
                            {
                                text: "Comparisons",
                                icon: <CompareArrows />,
                                link: "/comparisons",
                            },
                            {
                                text: "Crypto",
                                icon: <CurrencyBitcoin />,
                                link: "/crypto",
                            },
                        ].map((item) => (
                            <Link
                                href={item.link}
                                color="inherit"
                                underline="none"
                                key={item.text}
                            >
                                <ListItem button>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {[
                            {
                                text: "Technical Analysis",
                                icon: <CandlestickChart />,
                                link: "/technical",
                            },
                            {
                                text: "Technical Screener",
                                icon: <ScreenSearchDesktop />,
                                link: "/technical_screener",
                            },
                            {
                                text: "Fundamental Analysis",
                                icon: <AttachMoney />,
                                link: "/fundamental",
                            },
                        ].map((item) => (
                            <Link
                                href={item.link}
                                color="inherit"
                                underline="none"
                                key={item.text}
                                sx={{ padding: 0 }}
                            >
                                <ListItem button>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {[
                            {
                                text: "About",
                                icon: <Info />,
                                link: "/about",
                            },
                        ].map((item) => (
                            <Link
                                href={item.link}
                                color="inherit"
                                underline="none"
                                key={item.text}
                                sx={{ padding: 0 }}
                            >
                                <ListItem button>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
                <Main open={user && open}>
                    <DrawerHeader />
                    {user ?
                        <div
                            style={{
                                height: "calc(100vh - 64px - 40px)",
                                overflow: "hidden",
                            }}
                        >
                            <Routes>
                                <Route
                                    path="/"
                                    element={<MarketOverview theme={colorTheme} />}
                                />
                                <Route
                                    path="/ticker/:ticker"
                                    element={<TickerGraph theme={colorTheme} />}
                                />
                                <Route
                                    path="/watchlists"
                                    element={<Watchlists />}
                                />
                                <Route
                                    path="/heatmap"
                                    element={
                                        <Heatmap
                                            selectedIndex={selectedIndex}
                                            heatmapPortfolios={heatmapPortfolios}
                                        />
                                    }
                                />
                                <Route
                                    path="/comparisons"
                                    element={<Comparisons />}
                                />
                                <Route path="/crypto" element={<Crypto />} />
                                <Route
                                    path="/technical"
                                    element={
                                        <TechnicalAnalysis theme={colorTheme} />
                                    }
                                />
                                <Route
                                    path="/technical_screener"
                                    element={<TechnicalScreener />}
                                />
                                <Route
                                    path="/fundamental"
                                    element={
                                        <FundamentalAnalysis theme={colorTheme} />
                                    }
                                />
                                <Route path="/about" element={<About />} />
                            </Routes>
                        </div>
                        :
                        <Routes>
                            <Route path="*"
                                element={<Navigate to="/login" />}
                            >

                            </Route>
                            <Route
                                path="/login"
                                element={<Login />}
                            />
                            <Route
                                path="/register"
                                element={<Register />}
                            />
                        </Routes>
                    }
                </Main>
            </Router>
        </Box>
    );
}
