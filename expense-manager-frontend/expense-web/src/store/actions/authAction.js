import axios from "axios";

import { SET_CURRENT_USER, TOGGLE_AUTH_LOADING } from "../types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { setErrors } from "./errorAction";


export const registerUser = (userData, history) => dispatch => {
    dispatch(toggleAuthLoading());
    axios
       .post("/signup", userData)
       .then(res => {
         dispatch(toggleAuthLoading());
         history.push("/login");
       })
       .catch(err => {
          if(err.response.data){
            dispatch(setErrors(err.response.data));
            
          }
          dispatch(toggleAuthLoading());
       });
 };

 export const loginUser = (userData, history) => dispatch => {
    dispatch(toggleAuthLoading());
    axios
       .post("login", userData)
       .then(res => {
          const token  = res.data.access_token;
          localStorage.setItem("jwtToken", token);
          setAuthToken(token);
          const decoded = jwt_decode(token);
          dispatch(setCurrentUser(decoded));
          dispatch(toggleAuthLoading());
          history.push("/reports");
       })
       .catch(err => {
          if(err.response){
            dispatch(setErrors(err.response.data));
          } else {
            dispatch(setErrors({error: "Login Service Unavailable"}));
          }
          dispatch(toggleAuthLoading());
       });
 };

 export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
 };

 export const setCurrentUser = userData => {
    return {
       type: SET_CURRENT_USER,
       payload: userData
    };
 };



 export const toggleAuthLoading = () => {
    return {
       type: TOGGLE_AUTH_LOADING
    };
 };