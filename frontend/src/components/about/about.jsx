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

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
}));

const typographySX = (top) => ({ position: "relative", top: `${top}%` });

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
            <AboutDiv>
                <StyledTypography sx={typographySX(6)} variant="h5">
                    Welcome to Stock Watch
                </StyledTypography>
                <hr />
                <Typography paragraph={true} sx={{ fontSize: 16 }}>
                    I made <i>Stock Watch</i> because I felt like there weren't
                    any good lightweight applications for analyzing stocks. I
                    found that the apps which let me conduct the analysis I
                    wanted were either too expensive or had way too many
                    features I would never use. My future goal with Stock Watch
                    is to provide a suite of useful analysis tools in an
                    intuitive UI at a reasonable price.
                </Typography>
                <Typography paragraph={true} sx={{ fontSize: 16 }}>
                    My main focus for this app right now is providing tools for
                    conducting fundamental analysis. I want to figure out a way
                    to pull company SEC filings and export data into
                    standardized excel templates for analysis. I've spent
                    countless hours copying and pasting financial information
                    from company filings into an excel spreadsheet before even
                    being able to begin any analysis, and this is a major area
                    where I think this app can provide value to people. A lot of
                    this app is still being planned / in progress, and this will
                    definitely be a project I leave alone for months at a time,
                    and then find motivation to come back to it and build out a
                    new feature.
                </Typography>
                <Typography paragraph={true} sx={{ fontSize: 16 }}>
                    Bugs, suggestions or feature ideas are always welcome to be
                    sent to{" "}
                    <Link href="mailto:ajendo@uwaterloo.ca" color="inherit">
                        ajendo@uwaterloo.ca
                    </Link>
                    .
                </Typography>
            </AboutDiv>
        </div>
    );
};

export default Dashboard;
