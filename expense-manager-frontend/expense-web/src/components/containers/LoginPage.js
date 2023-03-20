import React, { useState }from "react";
import { loginUser } from "../../store/actions/authAction.js";
import { useDispatch, useSelector } from 'react-redux';

import Login from "../Login.js";



const LoginPage = (props) => {

    const dispatch = useDispatch();
    const error = useSelector((state) => state.errors.error) //might need to change this

    const [user, setUser] = useState({
        email: "",
        password: "",
        errors: {}
     });

    const handleChange = e => {
        setUser({
           ...user,
           [e.target.name]: e.target.value
        });
     };

     const handleSubmit = e => {
        e.preventDefault();       
        const { email, password } = user;      
        dispatch(loginUser({ email, password }, props.history));
     };

    return (
       <Login
            user={user}
            error={error}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            />
    );
};

export default LoginPage;
