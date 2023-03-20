import axios from "axios";
import { setErrors } from "./errorAction";
import { TOGGLE_DEPARTMENT_LOADING } from "../types";
import { getCompanyDepartments } from "./companyAction";


export const updateDepartment = (id, departmentData) => dispatch => {
    dispatch(toggleDepartmentLoading());
    const company_id = departmentData.company_id;
    axios
       .put(`/departments/${id}/edit`, departmentData)
       .then(res => {
          dispatch(toggleDepartmentLoading());
          dispatch(getCompanyDepartments(company_id)); //Janky solution to keep state updated
       })
       .catch(err => {
          console.log(err)
          if(err.response){
            dispatch(setErrors(err.response.data));
            dispatch(toggleDepartmentLoading());
          }
       });
 };

 export const addDepartment = data => dispatch => {
    dispatch(toggleDepartmentLoading());
    axios
       .post("/departments/create", data)
       .then(res => {
          dispatch(toggleDepartmentLoading());
          dispatch(getCompanyDepartments(data.companyId)); //Janky solution to keep state updated
       })
       .catch(err => {
          console.log(err)
          if(err.response){
            dispatch(setErrors(err.response.data));
            dispatch(toggleDepartmentLoading());
          }
       });
 };


 export const toggleDepartmentLoading = () => {
    return {
       type: TOGGLE_DEPARTMENT_LOADING
    };
};
