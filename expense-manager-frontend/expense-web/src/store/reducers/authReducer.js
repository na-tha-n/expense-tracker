import { SET_CURRENT_USER, TOGGLE_AUTH_LOADING } from "../types";
const isEmpty = require("is-empty");

const initialState = {
   isAuthenticated: false,
   user: {},
   authUserLoading: false,
};

export default function(state = initialState, action) {
   switch (action.type) {
      case SET_CURRENT_USER:
         return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            user: action.payload
         };
      case TOGGLE_AUTH_LOADING:
         return {
            ...state,
            authUserLoading: !state.authUserLoading
         };
      default:
         return state;
   }
}