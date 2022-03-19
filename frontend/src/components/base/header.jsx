import React, { useState, useEffect, useRef } from "react";
import { AppBar, Box, Toolbar, Typography, Button, Link } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import MUISwitch from "components/base/muiSwitch";

const Header = (props) => {
    const { dark, setDark } = props;
    const [searchValue, setSearchValue] = useState("");
    const inputRef = useRef();
    // const history = useHistory();

    const searchTicker = () => {
        console.log("Hello");
        // history.push(`/ticker/${searchValue.toUpperCase()}`);
        // setSearchValue("");
    };

    const handleChange = (e) => {
        if (e.target.value.length <= 5) {
            setSearchValue(e.target.value);
        }
    };

    const toggleSwitch = () => {
        setDark(!dark);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ height: "64px" }}>
                <Toolbar>
                    <Link
                        href="/"
                        color="inherit"
                        sx={{ flexGrow: 1 }}
                        underline="none"
                    >
                        <Typography variant="h6" component="div">
                            StockWatch
                        </Typography>
                    </Link>
                    {/* <div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{
								"aria-label": "search",
								maxLength: "5",
							}}
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
							onChange={handleChange}
						/>
					</div>
					{searchValue !== "" && (
						<Button
							variant={"contained"}
							onClick={searchTicker}
							style={{
								marginLeft: "10px",
								backgroundColor: "#3D71EB",
								color: "white",
							}}
						>
							Search
						</Button>
					)} */}

                    <MUISwitch defaultChecked toggleSwitch={toggleSwitch} />
                </Toolbar>
            </AppBar>
        </Box>
    );
};

Header.propTypes = {
    headerHeight: PropTypes.number,
};

export default Header;
