import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	Typography,
	InputBase,
	Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from "prop-types";
import { useStyles } from "./headerStyle";
import { useHistory } from "react-router";

const Header = ({ headerHeight }) => {
	const classes = useStyles({ headerHeight })();
	const [searchValue, setSearchValue] = useState("");
	const inputRef = useRef();
	const history = useHistory();

	const searchTicker = () => {
		history.push(`/ticker/${searchValue.toUpperCase()}`);
		setSearchValue("");
	};

	const handleChange = (e) => {
		if (e.target.value.length <= 5) {
			setSearchValue(e.target.value);
		}
	};

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
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

Header.propTypes = {
	headerHeight: PropTypes.number,
};

export default Header;
