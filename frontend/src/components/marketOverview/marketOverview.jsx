import React from "react";
import { Typography, Link } from "@mui/material";
import { styled } from "@mui/system";

const AboutDiv = styled("div")({
    position: "relative",
    top: "5%",
    margin: "0 auto",
    width: "70%",
    alignItems: "center",
    paddingBottom: "50px",
});

const Dashboard = () => {
    return (
        <div
            style={{
                height: "100%",
                width: "100%",
                textAlign: "center",
                overflow: "auto",
            }}
        >
            Overview
        </div>
    );
};

export default Dashboard;
