import { 
    GET_COMPANY, 
    TOGGLE_COMPANY_LOADING,
    GET_COMPANY_USERS,
    GET_COMPANY_DEPARTMENTS,
    GET_COMPANY_EXPENSES,
    GET_COMPANY_TOTALS,
    GET_COMPANY_PENDING

} from "../types";
import axios from "axios";
import { setErrors } from "./errorAction";
import { userJoinCompany, getUser } from "./userAction";


export const addCompany = data => dispatch => {
    dispatch(toggleCompanyLoading());
    axios
       .post("/company/add", data)
       .then(res => {
          dispatch(toggleCompanyLoading());
          const companyId = res.data.company_id
          dispatch(userJoinCompany(data.userId, companyId))
          dispatch(getUser())
       })
       .catch(err => {
          console.log(err)
          if(err.response){
            dispatch(setErrors(err.response.data));
            dispatch(toggleCompanyLoading());
          }
       });
 }


export const getCompany = id => dispatch => {
    axios.get(`/company/${id}`)
    .then(res =>{
        dispatch({
            type: GET_COMPANY,
            payload: res.data
        });
        dispatch(toggleCompanyLoading());
    })
    .catch(err => {
        dispatch(toggleCompanyLoading());
    });

};

export const getCompanyUsers = id => dispatch => {
    axios.get(`/company/${id}/users`)
    .then(res =>{
        dispatch({
            type: GET_COMPANY_USERS,
            payload: res.data
        });
        dispatch(toggleCompanyLoading());
    })
    .catch(err => {
        dispatch(toggleCompanyLoading());
    });
};

export const getCompanyExpenses = id => dispatch => {
    axios.get(`/company/${id}/expenses`)
    .then(res =>{
        dispatch({
            type: GET_COMPANY_EXPENSES,
            payload: res.data
        });
        dispatch(toggleCompanyLoading());
    })
    .catch(err => {
        dispatch(toggleCompanyLoading());
    });
};

export const getCompanyDepartments = id => dispatch => {
    axios.get(`/departments/${id}/get`)
    .then(res =>{
        dispatch({
            type: GET_COMPANY_DEPARTMENTS,
            payload: res.data
        });
        dispatch(toggleCompanyLoading());
    })
    .catch(err => {
        dispatch(toggleCompanyLoading());
    });
};

export const getCompanyExpenseTotals = id => dispatch => {
    const date = new Date();
    const date_formatted=date.toISOString().split('T')[0];
    console.log(date_formatted);
    axios.get(`/company/${id}/expenses/totals/${date_formatted}`)
    .then(res =>{
        dispatch({
            type: GET_COMPANY_TOTALS,
            payload: res.data
        });
        dispatch(toggleCompanyLoading());
    })
    .catch(err => {
        dispatch(toggleCompanyLoading());
    });
}

export const getCompanyExpensePending = id => dispatch => {
    axios.get(`/company/${id}/expenses/pending`)
    .then(res =>{
        dispatch({
            type: GET_COMPANY_PENDING,
            payload: res.data
        });
        dispatch(toggleCompanyLoading());
    })
    .catch(err => {
        dispatch(toggleCompanyLoading());
    });
}


export const toggleCompanyLoading = () => {
    return {
       type: TOGGLE_COMPANY_LOADING
    };
 };