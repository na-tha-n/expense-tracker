import React from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";



//TODO Add dispatch to update User
const AccountSettings = (props) => {

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
                <Box sx={{ pb: 2 }}>
                    <Typography 
                        component="h1" 
                        variant="h5"
                        sx ={{textAlign: 'left'}}
                        >
                        Account Settings
                    </Typography>
                </Box>

                <Box sx={{ pb: 4 }}>
                    <TextField
                        name="accountId"
                        variant="outlined"
                        color="secondary"
                        label="ID"
                        value={props.userUpdated.id}
                        InputProps ={{readOnly: true}}
                        onChange={(e) => props.handleChange(e)}
                    />
                </Box>

                <Box sx={{ pb: 4 }}>
                    <TextField
                        name="first_name"
                        variant="outlined"
                        color="secondary"
                        label="First Name"
                        value={props.userUpdated.first_name}
                        onChange={(e) => props.handleChange(e)}

                    />
                </Box>

                <Box sx={{ pb: 4 }}>
                    <TextField
                        name="last_name"
                        variant="outlined"
                        color="secondary"
                        label="Last Name"
                        value={props.userUpdated.last_name}
                        onChange={(e) => props.handleChange(e)}
                    />
                </Box>

                <Box sx={{ pb: 4 }}>
                    <TextField
                        name="password"
                        variant="outlined"
                        color="secondary"
                        type="password"
                        label="Password"
                        value={props.userUpdated.password}
                        onChange={(e) => props.handleChange(e)}
                    />
                </Box>

                <Box sx={{ pb: 4 }}>
                    <TextField
                        name="confirmPassword"
                        variant="outlined"
                        color="secondary"
                        type="password"
                        label="Confirm Password"
                        value={props.userUpdated.confirmPassword}
                        onChange={(e) => props.handleChange(e)}
                    />
                </Box>

                <Box sx={{ pb: 4 }}>
                    <TextField
                        name="department"
                        variant="outlined"
                        color="secondary"
                        label="Department"
                        value={props.userUpdated.department}
                        onChange={(e) => props.handleChange(e)}
                    />
                </Box>

                <Box sx={{ pb:4 }}>
                    <Button
                        size="lg"
                        variant="contained"
                        disabled = {props.userUpdated.password !== props.userUpdated.confirmPassword}
                        onClick={(e) => props.handleSubmit(e)}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default AccountSettings;
