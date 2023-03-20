import { 
    GET_EXPENSE,
    TOGGLE_EXPENSE_LOADING 
       } from "../types";


const initialState = {
    currentExpense: {},
    expenseLoading: true
};


export default function(state = initialState, action) {
    switch (action.type) {
       case GET_EXPENSE:
          return {
              ...state,
              currentExpense: action.payload,
              companyLoading: false
          }
        case TOGGLE_EXPENSE_LOADING:
        return {
        ...state,
        companyLoading: !state.companyLoading
        }
       default:
          return state;
    }
 }


 