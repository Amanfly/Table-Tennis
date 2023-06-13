import { FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,} from "../constants/types";

const initialState = {
  success:false, 
  data:{},
  error:"",
  loading: false,
}

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    

        case FORGOT_PASSWORD_REQUEST:
        return {...state, loading: true, data: {}, error:"", success: false}
      case FORGOT_PASSWORD_SUCCESS:
        return {...state,success: true, loading: false, error:'', data: action.data};
      case FORGOT_PASSWORD_FAIL:
        return {...state,success: false, data:{}, loading :false, error: action.error };

        
    
    default:
      return state;
  }
}
