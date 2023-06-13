import {DELETE_TOURNAMENT_FAIL, DELETE_TOURNAMENT_REQUEST, DELETE_TOURNAMENT_SUCCESS} from "../../constants/types";

const initialState = {
  success:false, 
  data:{},
  error:"",
  loading: false,
}

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
   
      
      case DELETE_TOURNAMENT_REQUEST:
        return {...state, loading: true, data: {}, error:"", success: false}
      case DELETE_TOURNAMENT_SUCCESS:
        return {...state,success: true, loading: false, error:'', data: action.data};
      case DELETE_TOURNAMENT_FAIL:
        return {...state,success: false, data:{}, loading :false, error: action.error };
    
    default:
      return state;
  }
}
