import React from "react";
import { TextField, Button, Container, Typography, Box, TextareaAutosize } from "@mui/material";


const AddCompany = (props) => {


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
                    Add A New Company
                </Typography>

                <TextField
                    sx={{ pb: 4 }}
                    name="name"
                    variant="outlined"
                    color="secondary"
                    label="Company Name"
                    value={props.company.name}
                    onChange={(e) => props.handleChange(e)}
                />


                <TextareaAutosize
                    style={{ pb: 4 , width:240}}
                    name="description"
                    placeholder="Company Description"
                    minRows={7}
                    maxRows={12}
                    helperText={props.error ? props.error : ""}
                    value={props.company.description}
                    onChange={(e) => props.handleChange(e)}

                />

                <Button
                    size="lg"
                    variant="contained"
                    onClick={(e) => props.handleSubmit(e)}
                >
                    Add Company
                </Button>
            </Box>
        </Container>
    );
};

export default AddCompany;
