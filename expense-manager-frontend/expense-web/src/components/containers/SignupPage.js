import React, { useState } from "react";
import { registerUser } from "../../store/actions/authAction";
import {useDispatch, useSelector} from 'react-redux'
import Signup from "../Signup";
import Validate from "../../store/utils/Validate";


const SignupPage = (props) => {

    const dispatch = useDispatch();
    const error = useSelector((state) => state.errors.error)

    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [user, setUser] = useState({
        email: "",
        first_name: "",
        last_name: "",
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
        const { email, first_name, last_name, password } = user;
        dispatch(registerUser({ email, first_name, last_name, password }, props.history));
     }

     const handleBlur = e => {
        const { name, value } = e.target;
        const err = { ...user.errors, ...Validate(name, value).errors };
        setUser({ ...user, errors: { ...err } });
     };


    return (
        <Signup 
            user={user}
            error={error}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setConfirmPassword={setConfirmPassword}
            confirmPassword={confirmPassword}
            onBlur={handleBlur}
            />
    );
};

export default SignupPage;
