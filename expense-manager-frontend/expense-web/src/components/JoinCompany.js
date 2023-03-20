import React, {useState, useEffect} from "react";
import { TextField, Button, Container, Typography, Box, TextareaAutosize } from "@mui/material";
import { userJoinCompany } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'

const JoinCompany = (props) => {
    const [companyDetails, setCompanyDetails] = useState({});
    const [error, setError] = useState('')
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`/company/${props.match.params.company}/info`)
        .then(res =>{
            setCompanyDetails(res.data);
        })
        .catch(err => {
            setError(err.response.data.error)
        });
        
    }, [dispatch, props.match.params.company]);

    const handleClick = (user, companyId) => {
        dispatch(userJoinCompany(user.id, companyId));
        props.history.push({
            pathname:"/reports",
        })
    }

    return(
        <Container maxWidth="xs" align="center">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Typography component="h1" variant="h5" sx={{ pb: 4 }}>
                    Join {companyDetails.name}
                </Typography>

                <Typography component="paragraph" variant="paragraph" sx={{ pb: 4 }}>
                    {companyDetails.description}
                </Typography>

                <Typography component="paragraph" variant="paragraph" sx={{ pb: 4 }}>
                    {error}
                </Typography>


                <Button
                    size="lg"
                    variant="contained"
                    onClick={(e) => handleClick( user, props.match.params.company)}
                    
                >
                    Join Company
                </Button>

            </Box>
        </Container>
    );
}
export default JoinCompany;