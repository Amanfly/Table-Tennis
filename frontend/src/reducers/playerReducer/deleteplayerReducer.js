import {DELETE_PLAYER_FAIL, DELETE_PLAYER_REQUEST, DELETE_PLAYER_SUCCESS} from "../../constants/types";

const initialState = {
  success:false, 
  data:{},
  error:"",
  loading: false,
}

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
   
      
      case DELETE_PLAYER_REQUEST:
        return {...state, loading: true, data: {}, error:"", success: false}
      case DELETE_PLAYER_SUCCESS:
        return {...state,success: true, loading: false, error:'', data: action.data};
      case DELETE_PLAYER_FAIL:
        return {...state,success: false, data:{}, loading :false, error: action.error };
    
    default:
      return state;
  }
}