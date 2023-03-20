import { 
   GET_COMPANY, 
   GET_COMPANY_USERS,
   GET_COMPANY_EXPENSES,
   GET_COMPANY_DEPARTMENTS,
   GET_COMPANY_TOTALS,
   GET_COMPANY_PENDING,
   TOGGLE_COMPANY_LOADING
      } from "../types";



const initialState = {
    company: {},
    companyUsers: [],
    companyDepartments: [],
    companyExpenses: [],
    companyTotals:{},
    companyPending:[],
    companyLoading:true
};

export default function(state = initialState, action) {
   switch (action.type) {
      case GET_COMPANY:
         return {
             ...state,
             company: action.payload,
             companyLoading: false
         }
      case GET_COMPANY_USERS:
         return {
            ...state,
            companyUsers: action.payload,
            companyLoading:false
         }
      case GET_COMPANY_EXPENSES:
         return {
            ...state,
            companyExpenses: action.payload,
            companyLoading: false
         }
      case GET_COMPANY_DEPARTMENTS:
         return {
            ...state,
            companyDepartments: action.payload,
            companyLoading: false
         }
      case GET_COMPANY_TOTALS:
         return {
            ...state,
            companyTotals: action.payload,
            companyLoading: false
         }
      case GET_COMPANY_PENDING:
         return {
            ...state,
            companyPending: action.payload,
            companyLoading: false
         }
      case TOGGLE_COMPANY_LOADING:
         return {
            ...state,
            companyLoading: !state.companyLoading
         }
      default:
         return state;
   }
}