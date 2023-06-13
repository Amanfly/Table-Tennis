import {VERIFY_EMAIL_FAIL, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_REQUEST,} from "../constants/types";

const initialState = {
  success:false, 
  data:{},
  error:"",
  loading: false,
}

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
   
      
      case VERIFY_EMAIL_REQUEST:
        return {...state, loading: true, data: {}, error:"", success: false}
      case VERIFY_EMAIL_SUCCESS:
        return {...state,success: true, loading: false, error:'', data: action.data};
      case VERIFY_EMAIL_FAIL:
        return {...state,success: false, data:{}, loading :false, error: action.error };
    
    default:
      return state;
  }
}
