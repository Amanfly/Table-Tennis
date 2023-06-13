import {PROFILE_FAIL, PROFILE_SUCCESS, PROFILE_REQUEST,} from "../constants/types";

const initialState = {
  success:false, 
  data:{},
  error:"",
  loading: false,
}

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
   
      
      case PROFILE_REQUEST:
        return {...state, loading: true, data: {}, error:"", success: false}
      case PROFILE_SUCCESS:
        return {...state,success: true, loading: false, error:'', data: action.data};
      case PROFILE_FAIL:
        return {...state,success: false, data:{}, loading :false, error: action.error };
    
    default:
      return state;
  }
}
