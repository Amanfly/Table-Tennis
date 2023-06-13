import {LIST_TOURNAMENT_FAIL,LIST_TOURNAMENT_REQUEST,LIST_TOURNAMENT_SUCCESS} from "../../constants/types";

const initialState = {
  success:false, 
  data:{},
  error:"",
  loading: false,
}

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
   
      
      case LIST_TOURNAMENT_REQUEST:
        return {...state, loading: true, data: {}, error:"", success: false}
      case LIST_TOURNAMENT_SUCCESS:
        return {...state,success: true, loading: false, error:'', data: action.data};
      case LIST_TOURNAMENT_FAIL:
        return {...state,success: false, data:{}, loading :false, error: action.error };
    
    default:
      return state;
  }
}
