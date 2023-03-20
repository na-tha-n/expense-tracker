import React from "react";
import { TextField, Button, Container, Typography, Box, TextareaAutosize, Stack } from "@mui/material";


const EditDepartment = (props) => {

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
                <Typography component="h1" variant="h5" sx={{ pb: 2 }}>
                    Edit Department
                </Typography>

                <TextField
                    sx={{ pb: 4 }}
                    name="name"
                    variant="outlined"
                    color="secondary"
                    label="Department Name"
                    value={props.department.name}
                    onChange={(e) => props.handleChange(e)}
                />


                <TextareaAutosize
                    style={{ pb: 4 , width:240}}
                    name="description"
                    placeholder="Department Description"
                    minRows={7}
                    maxRows={12}
                    helperText={props.error ? props.error : ""}
                    value={props.department.description}
                    onChange={(e) => props.handleChange(e)}

                />

                <Box sx={{ pb:4, pt:4 }}>
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

export default EditDepartment;