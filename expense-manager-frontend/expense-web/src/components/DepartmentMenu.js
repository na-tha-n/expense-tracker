import React, { useEffect, useState } from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getCompanyDepartments } from "../store/actions/companyAction";

const DepartmentMenu = (props) => {
    const departments = useSelector((state) => state.company.companyDepartments);
    const companyId = useSelector((state) => state.auth.user.company_id);
    const dispatch = useDispatch();
    const [selectedDepartment, setSelectedDepartment] = useState(props.department);

    useEffect(() => {
        dispatch(getCompanyDepartments(companyId))
    }, [dispatch, companyId]);

    const handleSelect = (e) => {
        setSelectedDepartment(e.target.value)
        props.handleSelect(e.target.value.id);
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                <Select
                    value={selectedDepartment}
                    label="Department"
                    onChange={handleSelect}
                >
                {departments && departments.map((department, index) => (
                    <MenuItem 
                        key={index+department.id}
                        value={department}
                    >
                        {department.name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
    </Box>
    );
};

export default DepartmentMenu;