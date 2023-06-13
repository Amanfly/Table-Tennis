import { FETCH_DRAWS_FAIL, FETCH_DRAWS_REQUEST, FETCH_DRAWS_SUCCESS} from "../../constants/types";

const initialState = {
  success:false, 
  data:{},
  error:"",
  loading: false,
}

export default function (state = initialState, action) {
    const { type } = action;
    switch (type) {
      
  
          case FETCH_DRAWS_REQUEST:
          return {...state, loading: true, data: {}, error:"", success: false}
        case FETCH_DRAWS_SUCCESS:
          return {...state,success: true, loading: false, error:'', data: action.data};
        case FETCH_DRAWS_FAIL:
          return {...state,success: false, data:{}, loading :false, error: action.error };
  
          
      
      default:
        return state;
    }
  }
