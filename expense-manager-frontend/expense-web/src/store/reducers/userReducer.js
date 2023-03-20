// May not need this

import {
    UPDATE_USER,
    DELETE_USER
} from '../types';

const initialState = {

}

export default function(state = initialState, action) {
    switch (action.type) {
       case UPDATE_USER:
          return {
              ...state,
          }
       
       default:
          return state;
    }
 }