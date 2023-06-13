import { GET_PLAYER_DRAW_SUCCESS, GET_PLAYER_DRAW_FAIL, GET_PLAYER_DRAW_REQUEST} from "../../constants/types";

const initialState = {
  success:false, 
  data:{},
  error:"",
  loading: false,
}

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    

        case GET_PLAYER_DRAW_REQUEST:
        return {...state, loading: true, data: {}, error:"", success: false}
      case GET_PLAYER_DRAW_SUCCESS:
        return {...state,success: true, loading: false, error:'', data: action.data};
      case GET_PLAYER_DRAW_FAIL:
        return {...state,success: false, data:{}, loading :false, error: action.error };

        
    
    default:
      return state;
  }
}


