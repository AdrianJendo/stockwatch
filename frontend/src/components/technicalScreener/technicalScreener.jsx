import React from "react";
import {
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button,
} from "@mui/material";
import { technicalPatterns } from "constants";

const TechnicalScreener = () => {
    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const submitPattern = () => {
        console.log(age);
        console.log(technicalPatterns);
        // const data = axios.get()
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <Button onClick={() => submitPattern()} variant="contained">
                Submit
            </Button>
        </Box>
    );
};

export default TechnicalScreener;
