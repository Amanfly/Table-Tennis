import {EDIT_TOURNAMENT_FAIL, EDIT_TOURNAMENT_REQUEST, EDIT_TOURNAMENT_SUCCESS} from "../../constants/types";

const initialState = {
  success:false, 
  data:{},
  error:"",
  loading: false,
}

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
   
      
      case EDIT_TOURNAMENT_REQUEST:
        return {...state, loading: true, data: {}, error:"", success: false}
      case EDIT_TOURNAMENT_SUCCESS:
        return {...state,success: true, loading: false, error:'', data: action.data};
      case EDIT_TOURNAMENT_FAIL:
        return {...state,success: false, data:{}, loading :false, error: action.error };
    
    default:
      return state;
  }
}
