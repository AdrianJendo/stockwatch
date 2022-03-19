import React, { useState, useRef } from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Divider,
    Link,
    InputBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import MUISwitch from "components/base/muiSwitch";

const StyledInput = styled(InputBase)(() => ({
    marginLeft: "10px",
    width: "120px",
}));

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
                    <div style={{ display: "flex", flexGrow: 1 }}>
                        <Link
                            href="/"
                            color="inherit"
                            sx={{ paddingRight: 10 }}
                            underline="none"
                        >
                            <Typography variant="h6" component="div">
                                StockWatch
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
                                <SearchIcon />
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
                                inputProps={{ "aria-label": "add participant" }}
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
                    </div>

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
