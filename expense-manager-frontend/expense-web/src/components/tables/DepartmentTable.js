import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyDepartments } from "../../store/actions/companyAction";
import { updateDepartment } from "../../store/actions/departmentAction";
import EditDepartment from "../EditDepartment";
import { Typography, Container, Button, Stack, TableRow, TableCell, TableBody, TableHead, Table, Popover } from "@mui/material";
import { Link } from 'react-router-dom';

const columns = [
    'Name', 'Description', 'Actions'
];

const DepartmentTable = () => {

    const departments = useSelector((state) => state.company.companyDepartments)
    const companyId = useSelector((state) => state.auth.user.company_id)
    const dispatch = useDispatch();


    const [anchorEl, setAnchorEl] = useState(null);
    const [department, setDepartment] = useState({});

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        dispatch(getCompanyDepartments(companyId))
    }, [dispatch, companyId]);

    const handleClick = (selectedDepartment) => {
        setAnchorEl(selectedDepartment);
        setDepartment(selectedDepartment);
    };

    const handleClose = (e) => {
        setAnchorEl(null);
        setDepartment({});
    };

    const handleChange = e =>{
        setDepartment({
            ...department,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        dispatch(updateDepartment(department.id, department));
    }

    return (
        <Container sx={{ pt: 4 }}>
            <Stack spacing={4} direction="row">
                <Typography variant="h4">Departments </Typography>
                <Link to="/department/add" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined">
                        Add New Department
                    </Button>
                </Link>
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
                        {departments.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell key={index + 'name'}>{row.name}</TableCell>
                                <TableCell key={index + 'description'}>{row.description}</TableCell>
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
                    <EditDepartment
                        handleChange={handleChange}
                        handleClose={handleClose}
                        onSubmit={handleSubmit}
                        department={department}
                    ></EditDepartment>
                </Container>
            </Popover>
        </Container>

    );
};

export default DepartmentTable;