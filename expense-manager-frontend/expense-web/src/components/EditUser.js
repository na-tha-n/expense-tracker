import React from "react";
import { TextField, Button, Container, Typography, Box, Stack } from "@mui/material";
import DepartmentMenu from "./DepartmentMenu";



const EditUser = (props) => {

    const updateAction = e => {
        props.onSubmit(e);
        props.handleClose(e);
    }

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
                        Edit User
                    </Typography>
                </Box>

                <Box sx={{ pb: 4 }}>
                    <TextField
                        name="id"
                        variant="outlined"
                        color="secondary"
                        label="ID"
                        value={props.user.id}
                        InputProps ={{readOnly: true}}
                    />
                </Box>

                <Box sx={{ pb: 4 }}>
                    <TextField
                        name="first_name"
                        variant="outlined"
                        color="secondary"
                        label="First Name"
                        value={props.user.first_name}
                        onChange={(e) => props.handleChange(e)}
                    />
                </Box>

                <Box sx={{ pb: 4 }}>
                    <TextField
                        name="last_name"
                        variant="outlined"
                        color="secondary"
                        label="Last Name"
                        value={props.user.last_name}
                        onChange={(e) => props.handleChange(e)}
                    />
                </Box>


                <Box sx={{ pb: 4 }}>
                    <DepartmentMenu
                        handleSelect={props.handleSelect}
                        department={props.user.department}
                    />
                </Box>

                <Box sx={{ pb:4 }}>
                    <Stack spacing={4} direction="row">
                        <Button
                            size="lg"
                            variant="contained"
                            onClick={(e) => updateAction(e)}
                        >
                            Save Changes
                        </Button>
                        <Button
                            size="lg"
                            variant="contained"
                            onClick={(e) => props.handleClose(e)}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
};

export default EditUser;
