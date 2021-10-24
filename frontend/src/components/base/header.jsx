import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import { useStyles } from "./headerStyle";

const Header = ({ headerHeight }) => {
  const classes = useStyles({ headerHeight })();
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [searchValue]);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h6" noWrap>
            StockWatch
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search", maxLength: "5" }}
              inputRef={inputRef}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  console.log("escape");
                  inputRef.current.blur();
                } else if (e.key === "Enter") {
                  console.log("enter");
                  inputRef.current.blur();
                } else {
                  setSearchValue(e.target.value);
                }
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  headerHeight: PropTypes.number,
};

export default Header;
