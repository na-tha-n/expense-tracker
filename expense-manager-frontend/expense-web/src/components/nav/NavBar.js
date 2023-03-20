import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Stack } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { logoutUser } from '../../store/actions/authAction';




const NavBar = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const handleClick = (e) => {
        dispatch(logoutUser);
    }

    return (

        <AppBar position="static">
            <Toolbar >
                <Button align="left" edge="start" color="inherit" href="/" >
                    <Typography variant="h6"  >Express Expense</Typography>
                </Button>
                {isAuthenticated &&
                    <Stack spacing={6} direction="row">
                        <Link to='/reports' style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary"   >
                                Dashboard
                            </Button>
                        </Link>
                        <Link to='/users' style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary"   >
                                Users
                            </Button>
                        </Link>
                        <Link to='/departments' style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary"   >
                                Departments
                            </Button>
                        </Link> 
                        <Link to='/expenses' style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary"   >
                                Expenses
                            </Button>
                        </Link>
                    </Stack>

                }
                <Box style={{ flex: 1 }} />
                {!isAuthenticated &&
                    <Link to='/login' style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary"   >
                            Login
                        </Button>
                    </Link>
                }
                {isAuthenticated &&
                    <Link to='/login' style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary"  onClick={handleClick} >
                            Logout
                        </Button>
                </Link>

                }
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
