import { CREATE_DRAWS_FAIL, CREATE_DRAWS_REQUEST, CREATE_DRAWS_SUCCESS} from "../../constants/types";

const initialState = {
  success:false, 
  data:{},
  error:"",
  loading: false,
}

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    

        case CREATE_DRAWS_REQUEST:
        return {...state, loading: true, data: {}, error:"", success: false}
      case CREATE_DRAWS_SUCCESS:
        return {...state,success: true, loading: false, error:'', data: action.data};
      case CREATE_DRAWS_FAIL:
        return {...state,success: false, data:{}, loading :false, error: action.error };

        
    
    default:
      return state;
  }
}
