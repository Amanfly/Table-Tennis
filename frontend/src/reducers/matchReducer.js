import { SHOW_MATCHES_FAIL, SHOW_MATCHES_REQUEST, SHOW_MATCHES_SUCCESS} from "../constants/types";

const initialState = {
  success:false, 
  data:{},
  error:"",
  loading: false,
}

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    

        case SHOW_MATCHES_REQUEST:
        return {...state, loading: true, data: {}, error:"", success: false}
      case SHOW_MATCHES_SUCCESS:
        return {...state,success: true, loading: false, error:'', data: action.data};
      case SHOW_MATCHES_FAIL:
        return {...state,success: false, data:{}, loading :false, error: action.error };

        
    
    default:
      return state;
  }
}


