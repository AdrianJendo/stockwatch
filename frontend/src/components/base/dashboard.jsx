import * as React from "react";
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
    InputBase,
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
    Search,
    GridView,
    CandlestickChart,
} from "@mui/icons-material";

// components
import MUISwitch from "components/base/muiSwitch";
import Comparisons from "components/comparisons/comparisons";

const drawerWidth = 230;

const StyledInput = styled(InputBase)(() => ({
    marginLeft: "10px",
    width: "120px",
}));

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
    const [searchValue, setSearchValue] = React.useState("");
    const inputRef = React.useRef();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const toggleSwitch = () => {
        setDark(!dark);
    };

    const searchTicker = () => {
        console.log("Hello");
    };

    const handleSearchChange = (e) => {
        if (e.target.value.length <= 5) {
            setSearchValue(e.target.value);
        }
    };

    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                height: "100vh",
                padding: 0,
            }}
        >
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
                        <div
                            style={{
                                display: "flex",
                                border: "1px solid rgba(0, 0, 0, .5)",
                                borderRadius: "5%",
                                height: "32px",
                            }}
                        >
                            <IconButton
                                color="primary"
                                sx={{ p: "10px" }}
                                aria-label="directions"
                                onClick={searchTicker}
                            >
                                <Search />
                            </IconButton>
                            <Divider
                                sx={{
                                    height: 24,
                                    m: 0.5,
                                }}
                                orientation="vertical"
                            />

                            <StyledInput
                                placeholder={"Search…"}
                                value={searchValue}
                                inputRef={inputRef}
                                onKeyDown={(e) => {
                                    if (e.key === "Escape") {
                                        inputRef.current.blur();
                                    } else if (e.key === "Enter") {
                                        inputRef.current.blur();
                                        searchTicker();
                                    }
                                }}
                                onChange={handleSearchChange}
                            />
                        </div>
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
                            text: "Dashboard",
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
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={<Typography>Dashboard</Typography>}
                        />
                        <Route
                            path="/watchlists"
                            element={<Typography>Watchlists</Typography>}
                        />
                        <Route
                            path="/heatmap"
                            element={<Typography>Heatmap</Typography>}
                        />
                        <Route path="/comparisons" element={<Comparisons />} />
                        <Route
                            path="/technical"
                            element={
                                <Typography>Technical Analysis</Typography>
                            }
                        />
                        <Route
                            path="/fundamental"
                            element={
                                <Typography>Fundamental Analysis</Typography>
                            }
                        />
                    </Routes>
                </Router>
            </Main>
        </Box>
    );
}
