import React, { useState } from "react";
import { addCompany } from "../../store/actions/companyAction.js";
import { useDispatch, useSelector } from 'react-redux';

import AddCompany from "../AddCompany.js";



const AddCompanyPage = (props) => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const error = useSelector((state) => state.errors.error) //might need to change this

    const [company, setCompany] = useState({
        name: "",
        description: "",
        errors: {}
    });

    const handleChange = e => {
        setCompany({
            ...company,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const { name, description} = company;
        const userId = user.id;
        //add the Company and update state with company info
        dispatch(addCompany({ name, description, userId }));
        props.history.push({
            pathname:"/reports",
        })

    };

    return (
        <AddCompany
            company={company}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
            />
    );
};

export default AddCompanyPage;
