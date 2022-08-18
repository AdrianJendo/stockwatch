import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Paper, Link } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginTop: "30px",
}));

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        const params = {};
        params["email"] = email;
        params["password"] = password;
        axios.post("/api/login", params).then((resp) => {
            if (resp.data.error) {
                alert(resp.data.error);
            } else {
                console.log("SUCCESS");
                console.log(resp.data);
                alert("Login Successful");

                // HANDLE JWT

                navigate("/");
            }
        });
    };

    return (
        <div style={{ textAlign: "center" }}>
            <Paper
                style={{
                    maxWidth: "330px",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px",
                    marginTop: "30px",
                }}
            >
                <Typography variant="h4">Log In</Typography>
                <StyledTextField
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <StyledTextField
                    label="Password"
                    variant="standard"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    sx={{
                        marginTop: "30px",
                        marginBottom: "30px",
                    }}
                    onClick={() => handleLogin()}
                >
                    Log in
                </Button>
                <Typography>Don't have an account?</Typography>
                <Link href="/register" color="inherit" underline="none">
                    <Button type="button" color="primary">
                        Register
                    </Button>
                </Link>
            </Paper>
        </div>
    );
};

export default Login;
