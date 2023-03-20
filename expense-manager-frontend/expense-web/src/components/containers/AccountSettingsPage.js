import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import AccountSettings from "../AccountSettings";


//TODO Add dispatch to update User
const AccountSettingsPage = () => {

    const user = useSelector((state) => state.auth.user);

    const [userUpdated, setUserUpdated] = useState({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        department: user.department,
        password:"",
        confirmPassword:""
    });

    const handleSubmit = (e) =>{
        //TODO dispatch editUser
    }

    const handleChange = (e) =>{
        setUserUpdated({
            ...userUpdated,
            [e.target.name]: e.target.value
         });
    }



    return (
        <AccountSettings
            user={user}
            userUpdated={userUpdated}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            />
    );
};

export default AccountSettingsPage;
