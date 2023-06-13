import {LIST_PLAYER_FAIL, LIST_PLAYER_REQUEST, LIST_PLAYER_SUCCESS} from "../../constants/types";

const initialState = {
  success:false, 
  data:{},
  error:"",
  loading: false,
}

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
   
      
      case LIST_PLAYER_REQUEST:
        return {...state, loading: true, data: {}, error:"", success: false}
      case LIST_PLAYER_SUCCESS:
        return {...state,success: true, loading: false, error:'', data: action.data};
      case LIST_PLAYER_FAIL:
        return {...state,success: false, data:{}, loading :false, error: action.error };
    
    default:
      return state;
  }
}