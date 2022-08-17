import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Paper, Link } from "@mui/material";
import { styled } from "@mui/system";
import qs from "qs";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginTop: "30px",
}));

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const isValidPassword = (password) => {
        if (password.length < 10) {
            alert("Password must be at least 10 characters long");
        } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            alert("Password must contain both upper and lower case letters");
        } else if (!/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
            alert("Password must contain special character");
        } else if (password !== confirmPassword) {
            alert("Passwords do not match");
        } else {
            return true;
        }
    };

    const isValidUsername = (username) => {
        return username.length > 5;
    };

    const registerUser = () => {
        if (!isValidEmail(email)) {
            alert("Invalid Email");
        } else if (!isValidUsername(username)) {
            alert("Username must be at least 5 characters long");
        } else if (isValidPassword(password)) {
            bcrypt.hash(password, 10).then((passwordHash) => {
                const params = {};
                params["email"] = email;
                params["username"] = username;
                params["password"] = passwordHash;
                axios.post("/api/register", params).then(
                    (resp) => {
                        if (resp.data.error) {
                            alert(resp.data.error);
                        } else {
                            console.log("SUCCESS");
                            console.log(resp);
                            alert("Registration sucessful");
                            navigate("/login");
                        }
                    },
                    (errorResponse) => {}
                );
                console.log("REGISTER");
            });
        }
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
                <Typography variant="h4">Register</Typography>
                <StyledTextField
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <StyledTextField
                    id="standard-basic"
                    label="Username"
                    variant="standard"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <StyledTextField
                    label="Password"
                    variant="standard"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
                <StyledTextField
                    label="Confirm Password"
                    variant="standard"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    onClick={() => registerUser()}
                >
                    Register
                </Button>
                <Typography>Already have an account?</Typography>
                <Link href="/login" color="inherit" underline="none">
                    <Button type="button" color="primary">
                        Log in
                    </Button>
                </Link>
            </Paper>
        </div>
    );
};

export default Register;
