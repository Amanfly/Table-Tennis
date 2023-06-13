import {ADD_TOURNAMENT_FAIL, ADD_TOURNAMENT_REQUEST, ADD_TOURNAMENT_SUCCESS} from "../../constants/types";

const initialState = {
  success:false, 
  data:{},
  error:"",
  loading: false,
}

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
   
      
      case ADD_TOURNAMENT_REQUEST:
        return {...state, loading: true, data: {}, error:"", success: false}
      case ADD_TOURNAMENT_SUCCESS:
        return {...state,success: true, loading: false, error:'', data: action.data};
      case ADD_TOURNAMENT_FAIL:
        return {...state,success: false, data:{}, loading :false, error: action.error };
    
    default:
      return state;
  }
}
