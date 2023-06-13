import {RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, RESET_PASSWORD_FAIL} from "../constants/types";

const initialState = {
  success:false, 
  data:{},
  error:"",
  loading: false,
}

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {


      case RESET_PASSWORD_REQUEST:
        return {...state, loading: true, data: {}, error:"", success: false}
      case RESET_PASSWORD_SUCCESS:
        return {...state,success: true, loading: false, error:'', data: action.data};
      case RESET_PASSWORD_FAIL:
        return {...state,success: false, data:{}, loading :false, error: action.error };

    
    default:
      return state;
  }
}
