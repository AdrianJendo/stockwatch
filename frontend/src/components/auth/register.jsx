import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)(({ theme }) => ({
	marginTop: "30px"
}));


const Register = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [username, setUsername] = useState("")
	const [login, setLogin] = useState("")

	return (
		<div style={{ textAlign: "center" }}>
			<Paper style={{
				maxWidth: "330px",
				margin: "0 auto",
				display: "flex",
				flexDirection: "column",
				padding: "20px",
				marginTop: "30px",
			}}>
				<Typography variant="h4">Register</Typography>
				<StyledTextField id="standard-basic" label="Email" variant="standard" />
				<StyledTextField id="standard-basic" label="Username" variant="standard" />
				<StyledTextField id="standard-basic" label="Password" variant="standard" />
				<Button type="button" variant="contained" color="primary" sx={{
					marginTop: "30px",
					marginBottom: "30px"
				}}>
					Register
				</Button>
				<Typography>Already have an account?</Typography>
				<Button type="button" color="primary" >
					Log in
				</Button>
			</Paper>
		</div>
	);
};

export default Register;
