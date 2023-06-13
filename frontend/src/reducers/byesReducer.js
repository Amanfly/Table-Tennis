import {GIVE_BYES_FAIL, GIVE_BYES_REQUEST, GIVE_BYES_SUCCESS} from "../constants/types";

const initialState = {
  success:false, 
  data:{},
  error:"",
  loading: false,
}
export default function (state = initialState, action) {
    const { type } = action;
    switch (type) {
      
  
          case GIVE_BYES_REQUEST:
          return {...state, loading: true, data: {}, error:"", success: false}
        case GIVE_BYES_SUCCESS:
          return {...state,success: true, loading: false, error:'', data: action.data};
        case GIVE_BYES_FAIL:
          return {...state,success: false, data:{}, loading :false, error: action.error };
  
          
      
      default:
        return state;
    }
  }
