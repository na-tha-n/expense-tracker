
import axios from "axios";
import { setErrors } from "./errorAction";
import { TOGGLE_USER_LOADING, SET_CURRENT_USER } from "../types";
import { getCompanyUsers } from "./companyAction";


export const getUser = (id) => dispatch => {
   dispatch(toggleUserLoading());
   axios.post('/me')
   .then(res=>{
      dispatch(toggleUserLoading());
      dispatch({
         type: SET_CURRENT_USER,
         payload: res.data
     })
   }).catch(err => {
      if(err.response){
         dispatch(setErrors(err.response.data));
         dispatch(toggleUserLoading());
       }
   })
}

export const updateUser = (id, userData) => dispatch => {
    dispatch(toggleUserLoading());
    const company_id = userData.company_id;
    axios
       .put(`/users/${id}/edit`, userData)
       .then(res => {
          dispatch(toggleUserLoading());
          dispatch(getCompanyUsers(company_id)); //Janky solution to keep state updated
       })
       .catch(err => {
          console.log(err)
          if(err.response){
            dispatch(setErrors(err.response.data));
            dispatch(toggleUserLoading());
          }
       });
 };

export const userJoinCompany = (userId, companyId) => dispatch => {
   dispatch(toggleUserLoading());
   axios
       .put(`/users/join/${userId}/${companyId}`)
       .then(res => {
          dispatch(toggleUserLoading());
          dispatch(getUser(userId))
       })
       .catch(err => {
          console.log(err)
          if(err.response){
            dispatch(setErrors(err.response.data));
            dispatch(toggleUserLoading());
          }
       });
}

 export const deleteUser = (id, userData) => dispatch => {
    dispatch(toggleUserLoading());
    const company_id = userData.company_id;
    axios
       .post(`/users/${id}/delete`, userData)
       .then(res => {
          dispatch(toggleUserLoading());
          dispatch(getCompanyUsers(company_id)); //Janky solution to keep state updated
       })
       .catch(err => {
          console.log(err)
          if(err.response){
            dispatch(setErrors(err.response.data));
            dispatch(toggleUserLoading());
          }
       });
 };

 export const toggleUserLoading = () => {
   return {
      type: TOGGLE_USER_LOADING
   };
};