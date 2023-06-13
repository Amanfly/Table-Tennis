import {LOGIN_SUCCESS,LOGIN_FAIL, LOGIN_REQUEST } from "../constants/types";

const initialState = {
  success:false, 
  data:{},
  error:"",
  loading: false,
}

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    
    case LOGIN_REQUEST:
      return {...state, loading: true, data: {}, error:"", success: false}
    case LOGIN_SUCCESS:
      return {...state,success: true, loading: false, error:'', data: action.data};
    case LOGIN_FAIL:
      return {...state,success: false, data:{}, loading :false, error: action.error };
      
    
    default:
      return state;
  }
}
