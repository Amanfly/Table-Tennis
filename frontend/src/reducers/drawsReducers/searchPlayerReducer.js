import { SEARCH_PLAYER_SUCCESS, SEARCH_PLAYER_FAIL, SEARCH_PLAYER_REQUEST} from "../../constants/types";

const initialState = {
  success:false, 
  data:{},
  error:"",
  loading: false,
}

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    

        case SEARCH_PLAYER_REQUEST:
        return {...state, loading: true, data: {}, error:"", success: false}
      case SEARCH_PLAYER_SUCCESS:
        return {...state,success: true, loading: false, error:'', data: action.data};
      case SEARCH_PLAYER_FAIL:
        return {...state,success: false, data:{}, loading :false, error: action.error };

        
    
    default:
      return state;
  }
}

