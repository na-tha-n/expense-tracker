
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import companyReducer from "./companyReducer";
import errorReducer from "./errorReducer";
import expenseReducer from "./expenseReducer";


export default combineReducers({
   auth: authReducer,
   errors: errorReducer,
   company: companyReducer,
   expense: expenseReducer,
});