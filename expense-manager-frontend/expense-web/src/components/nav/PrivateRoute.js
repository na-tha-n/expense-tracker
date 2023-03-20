import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";




const PrivateRoute = ({ component: Component, ...rest }) => {

    const auth = useSelector((state) => state.auth);
    
    const chooseRoute = (auth, Component, props) =>{
        // TODO add more logic for having an account but no company
        if(auth.isAuthenticated && auth.user.company_id){
             return <Component {...props} />
       } else if(auth.isAuthenticated && !auth.user.company_id){
             return <Redirect to="/addcompany" />
         } else {
             return <Redirect to="/login" />
         }
    }

    return (
        <Route
            {...rest}
            render={props =>
                chooseRoute(auth, Component, props)
            }
        />
    );
};

export default PrivateRoute;