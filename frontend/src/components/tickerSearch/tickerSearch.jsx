import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Divider, InputBase, styled } from "@mui/material";
import { Search } from "@mui/icons-material";

const StyledInput = styled(InputBase)(() => ({
    marginLeft: "10px",
    width: "120px",
}));

const TickerSearch = () => {
    const [searchValue, setSearchValue] = useState("");
    const inputRef = useRef();
    const navigate = useNavigate();

    const searchTicker = () => {
        navigate(`/ticker/${searchValue.toLowerCase()}`);
    };

    const handleSearchChange = (e) => {
        if (e.target.value.length <= 5) {
            setSearchValue(e.target.value);
        }
    };

    return (
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
    );
};

export default TickerSearch;
