import React from "react";
import { TextField, Button, Container, Typography, Box,Stack } from "@mui/material";



const Login = (props) => {

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
                    <Typography 
                        component="h1" 
                        variant="h5" 
                        sx={{ pb: 2 }}
                    >
                        Login
                    </Typography>
                    <TextField
                        sx={{ pb: 4 }}
                        id="email"
                        name="email"
                        variant="outlined"
                        color="secondary"
                        type="email"
                        label="Email"
                        value={props.user.email}
                        onChange={(e) => props.handleChange(e)}     
                    />
                    <TextField
                        sx={{ pb: 4 }}
                        id="password"
                        name="password"
                        variant="outlined"
                        color="secondary"
                        type="password"
                        label="Password"
                        helperText={props.error ? props.error : ""}
                        value={props.user.password}
                        onChange={(e) => props.handleChange(e)}   
                    />

                <Box sx={{ pb: 4 }}>
                    <Stack spacing={2} direction="row">
                        <Button
                            size="lg"
                            variant="contained"
                            onClick={(e) => props.handleSubmit(e)}
                        >
                            Login
                        </Button>
                        <Button
                            size="lg"
                            variant="contained"
                            href = '/signup'
                        >
                            Sign Up
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
