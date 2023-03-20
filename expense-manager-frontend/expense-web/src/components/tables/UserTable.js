import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyDepartments, getCompanyUsers } from "../../store/actions/companyAction";
import { updateUser } from "../../store/actions/userAction";
import EditUser from "../EditUser";
import { Typography, Container, Button, Stack, TableRow, TableCell, TableBody, TableHead, Table, Popover, Tooltip } from "@mui/material";

const columns = [
    'ID', 'First Name', 'Last Name', 'Department', 'Actions'
];

const UserTable = (props) => {

    const users = useSelector((state) => state.company.companyUsers)
    const companyId = useSelector((state) => state.auth.user.company_id)
    const dispatch = useDispatch();


    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState({});

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        dispatch(getCompanyUsers(companyId))
        dispatch(getCompanyDepartments(companyId))
    }, [dispatch, companyId]);

    const handleClick = (selectedUser) => {
        setAnchorEl(selectedUser);
        setUser(selectedUser);
    };

    const handleClose = (e) => {
        setAnchorEl(null);
        setUser({});
    };

    const handleChange = e =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSelect = id => {
        setUser({
            ...user,
            department_id: id 
        })
    }

    const handleSubmit = e => {
        dispatch(updateUser(user.id, user));
    }
     //URL
    const getURL = (pathname, companyId) => {
        const suffix = "/join/" + companyId;
        return pathname.replace('/users',suffix );
    }
    const [inviteUrl, setInviteUrl] = useState(getURL(window.location.href, companyId))
    const [isInviteClicked, setIsInviteClicked] = useState(false);

    const inviteClick = () => {
        setIsInviteClicked(!isInviteClicked);
    }
    

    return (
        <Container sx={{ pt: 4 }}>
            <Stack spacing={4} direction="row">
                <Typography variant="h4">Users </Typography>
                <Button 
                    variant="outlined"
                    onClick = {() => inviteClick()}
                >
                        Invite User
                    </Button>
                {isInviteClicked ===true &&
                    <Tooltip        
                        title='Send this link to a new user'
                    >
                        <Typography 
                            paragraph
                            sx={{pt:2}}
                        >
                            {inviteUrl}
                        </Typography>
                    </Tooltip>
                }
            </Stack>
            <div style={{ height: 600 }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow component="th">
                            {columns.map((col, index) => (
                                <TableCell key={index}>{col}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell key={index + 'id'}>{row.id}</TableCell>
                                <TableCell key={index + 'fname'}>{row.first_name}</TableCell>
                                <TableCell key={index + 'lname'}>{row.last_name}</TableCell>
                                <TableCell key={index + 'department'}>{row.department}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleClick(row)}
                                    >
                                        Edit
                                    </Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >
                <Container maxWidth="80vh">
                    <EditUser
                        handleChange={handleChange}
                        handleClose={handleClose}
                        handleSelect={handleSelect}
                        onSubmit={handleSubmit}
                        user={user}
                    ></EditUser>
                </Container>
            </Popover>
        </Container>

    );
};

export default UserTable;
