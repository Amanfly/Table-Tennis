import {REMOVE_PLAYER_FROM_TOURNAMENT_FAIL, REMOVE_PLAYER_FROM_TOURNAMENT_REQUEST, REMOVE_PLAYER_FROM_TOURNAMENT_SUCCESS} from "../../constants/types";

const initialState = {
  success:false, 
  data:{},
  error:"",
  loading: false,
}

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
   
      
      case REMOVE_PLAYER_FROM_TOURNAMENT_REQUEST:
        return {...state, loading: true, data: {}, error:"", success: false}
      case REMOVE_PLAYER_FROM_TOURNAMENT_SUCCESS:
        return {...state,success: true, loading: false, error:'', data: action.data};
      case REMOVE_PLAYER_FROM_TOURNAMENT_FAIL:
        return {...state,success: false, data:{}, loading :false, error: action.error };
    
    default:
      return state;
  }
}
