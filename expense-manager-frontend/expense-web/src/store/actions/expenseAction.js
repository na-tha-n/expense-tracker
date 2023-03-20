import axios from "axios";
import { setErrors } from "./errorAction";
import { TOGGLE_EXPENSE_LOADING, GET_EXPENSE } from "../types";
import { getCompanyExpenses } from "./companyAction";


export const approveExpense = (id, companyId) => dispatch => {
    dispatch(toggleExpenseLoading());
    const company_id = companyId;
    axios
       .post(`/expense/${id}/approve`)
       .then(res => {
          dispatch(toggleExpenseLoading());
          dispatch(getCompanyExpenses(company_id)); //Janky solution to keep state updated
       })
       .catch(err => {
          console.log(err)
          if(err.response){
            dispatch(setErrors(err.response.data));
            dispatch(toggleExpenseLoading());
          }
       });
 };

 export const rejectExpense = (id, companyId) => dispatch => {
    dispatch(toggleExpenseLoading());
    const company_id = companyId;
    axios
       .post(`/expense/${id}/reject`)
       .then(res => {
          dispatch(toggleExpenseLoading());
          dispatch(getCompanyExpenses(company_id)); //Janky solution to keep state updated
       })
       .catch(err => {
          console.log(err)
          if(err.response){
            dispatch(setErrors(err.response.data));
            dispatch(toggleExpenseLoading());
          }
       });
 };

 export const getExpense = (id, companyId) => dispatch => {
   dispatch(toggleExpenseLoading());

   axios
      .get(`/expense/${id}`)
      .then(res => {
         dispatch(toggleExpenseLoading());
         dispatch({
            type: GET_EXPENSE,
            payload: res.data
        })
        console.log(res.data);
         dispatch(getCompanyExpenses(companyId)); //Janky solution to keep state updated
      })
      .catch(err => {
         console.log(err)
         if(err.response){
           dispatch(setErrors(err.response.data));
           dispatch(toggleExpenseLoading());
         }
      });
};


export const updateExpense = (id, expenseData) => dispatch => {
    dispatch(toggleExpenseLoading());
    const company_id = expenseData.company_id;
    axios
       .put(`/expense/${id}/edit`, expenseData)
       .then(res => {
          dispatch(toggleExpenseLoading());
          dispatch(getCompanyExpenses(company_id)); //Janky solution to keep state updated
       })
       .catch(err => {
          console.log(err)
          if(err.response){
            dispatch(setErrors(err.response.data));
            dispatch(toggleExpenseLoading());
          }
       });
 };

 export const deleteExpense = (id, expenseData) => dispatch => {
    dispatch(toggleExpenseLoading());
    const company_id = expenseData.company_id;
    axios
       .post(`/expense/${id}/delete`, expenseData)
       .then(res => {
          dispatch(toggleExpenseLoading());
          dispatch(getCompanyExpenses(company_id)); //Janky solution to keep state updated
       })
       .catch(err => {
          console.log(err)
          if(err.response){
            dispatch(setErrors(err.response.data));
            dispatch(toggleExpenseLoading());
          }
       });
 };

 export const toggleExpenseLoading = () => {
   return {
      type: TOGGLE_EXPENSE_LOADING
   };
};