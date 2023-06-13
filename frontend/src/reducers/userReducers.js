import {REGISTER_SUCCESS,REGISTER_FAIL, REGISTER_REQUEST,} from "../constants/types";

const initialState = {
  success:false, 
  data:{},
  error:"",
  loading: false,
}

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case REGISTER_REQUEST: 
      return {...state, loading: true, data: {}, error:"", success: false}
    case REGISTER_SUCCESS:
      return {...state,success: true, loading: false, error:'', data: action.data};
    case REGISTER_FAIL:
      return {...state,success: false, loading: false, data: {}, error: action.error};
      
    
    default:
      return state;
  }
}
