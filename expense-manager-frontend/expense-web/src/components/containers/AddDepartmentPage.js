import React, { useState } from "react";
import { addDepartment } from "../../store/actions/departmentAction.js";
import { useDispatch, useSelector } from 'react-redux';

import AddDepartment from "../AddDepartment.js";



const AddDepartmentPage = (props) => {

    const dispatch = useDispatch();
    const companyId = useSelector((state) => state.auth.user.company_id);
    const error = useSelector((state) => state.errors.error) //might need to change this

    const [department, setDepartment] = useState({
        name: "",
        description: "",
        errors: {}
    });

    const handleChange = e => {
        setDepartment({
            ...department,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const { name, description} = department;
        const company_id = companyId;
        dispatch(addDepartment({ name, description, company_id }));
        props.history.push({
            pathname:"/departments",
        })
    };

    const handleClose = () =>{
        props.history.push({
            pathname:"/departments",
        })
    };

    return (
        <AddDepartment
            department={department}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
            error={error}
            />
    );
};

export default AddDepartmentPage;
