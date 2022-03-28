import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
} from "@mui/material";
import {
    Dashboard,
    TrendingUp,
    CompareArrows,
    AttachMoney,
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
import FundamentalAnalysis from "components/fundamentalAnalysis/fundamentalAnalysis";
import About from "components/about/about";
import Crypto from "components/crypto/crypto";

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
    const [open, setOpen] = React.useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const toggleSwitch = () => {
        setDark(!dark);
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
                <StyledAppBar position="fixed" open={open}>
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
                            <TickerSearch />
                        </div>
                        <MUISwitch defaultChecked toggleSwitch={toggleSwitch} />
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
                    open={open}
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
                                icon: <AttachMoney />,
                                link: "/technical",
                            },
                            {
                                text: "Fundamental Analysis",
                                icon: <CandlestickChart />,
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
                <Main open={open}>
                    <DrawerHeader />

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
                                element={<Heatmap index="dowjones" />}
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
                                path="/fundamental"
                                element={
                                    <FundamentalAnalysis theme={colorTheme} />
                                }
                            />
                            <Route path="/about" element={<About />} />
                        </Routes>
                    </div>
                </Main>
            </Router>
        </Box>
    );
}
