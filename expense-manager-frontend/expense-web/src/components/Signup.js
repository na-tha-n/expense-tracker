import React from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";



const Signup = (props) => {


    return (
        <Container maxWidth="xs" align="center">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Typography component="h1" variant="h5" sx={{ pb: 2 }}>
                    Signup
                </Typography>

                <TextField
                    id="email"
                    name="email"
                    variant="outlined"
                    color="secondary"
                    type="email"
                    label="Email"
                    value={props.user.email}
                    helperText = {props.user.errors.email}
                    onChange={(e) => props.handleChange(e)}
                    onBlur={props.onBlur}
                    sx={{ pb: 4 }}
                />


                <TextField
                    id="first_name"
                    name="first_name"
                    variant="outlined"
                    color="secondary"
                    label="First Name"
                    value={props.user.first_name}
                    helperText = {props.user.errors.first_name}
                    onChange={(e) => props.handleChange(e)}
                    onBlur={props.onBlur}
                    sx={{ pb: 4 }}
                />

                <TextField
                    id="last_name"
                    name="last_name"
                    variant="outlined"
                    color="secondary"
                    label="Last Name"
                    value={props.user.last_name}
                    helperText = {props.user.errors.last_name}
                    onChange={(e) => props.handleChange(e)}
                    onBlur={props.onBlur}
                    sx={{ pb: 4 }}
                />

                <TextField
                    id="password"
                    name="password"
                    variant="outlined"
                    color="secondary"
                    type="password"
                    label="Password"
                    value={props.user.password}
                    helperText = {props.user.errors.password}
                    onChange={(e) => props.handleChange(e)}
                    onBlur={props.onBlur}
                    sx={{ pb: 4 }}
                />

                <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    variant="outlined"
                    color="secondary"
                    type="password"
                    label="Confirm Password"
                    value={props.confirmPassword}
                    helperText = {props.error}
                    onChange={(e) => props.setConfirmPassword(e.target.value)}
                    onBlur={props.onBlur}
                    sx={{ pb: 4 }}
                />


                <Button
                    size="lg"
                    variant="contained"
                    disabled = {props.user.password !== props.confirmPassword}
                    onClick={(e) => props.handleSubmit(e)}
                    
                >
                    Sign Up
                </Button>

            </Box>
        </Container>
    );
};

export default Signup;
