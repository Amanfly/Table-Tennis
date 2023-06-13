import {SHOW_MATCHES_REQUEST, SHOW_MATCHES_SUCCESS, SHOW_MATCHES_FAIL, GIVE_BYES_FAIL, GIVE_BYES_REQUEST, GIVE_BYES_SUCCESS} from "../constants/types";
import axios from 'axios';
import { SHOW_MATCHES , GIVE_BYES} from "../constants/apiContants"
import { get_localStorage } from "../utils/localstorage";


export function showMatches() 

{
  return (dispatch) => {
    dispatch({type:SHOW_MATCHES_REQUEST});
    let token = get_localStorage("token");
    
    axios({
      method: "get",
			url:SHOW_MATCHES,
      headers: { "Authorization": `Bearer ${token}` },
    })
    .then((response) => {
      if (response.data.status === "FAILURE") {
        dispatch({type:SHOW_MATCHES_FAIL, error: response.data.exception_message});
      } else {
        // set token headers
        dispatch({type:SHOW_MATCHES_SUCCESS, data: response.data});
      }
    })
    .catch(function(error) {
      const message = error.message;
      dispatch({type:SHOW_MATCHES_FAIL, error: message});
    });
};
}

export function giveByes(tournament_id, player_id) 

{ 
    console.log("tournament_id, player_id" ,tournament_id, player_id)
  
    return (dispatch) => {
    dispatch({type: GIVE_BYES_REQUEST});
    let token = get_localStorage("token");
    
    axios({
      method: "post",
			url: GIVE_BYES,
            data:{ 'tournament_id' : tournament_id, 'player_id':player_id}

            //headers: { "Authorization": `Bearer ${token}` },
		})
    .then((response) => {
      if (response.data.status === "FAILURE") {
        dispatch({type: GIVE_BYES_FAIL, error: response.data.exception_message});
      } else {
        //set token headers
        dispatch({type: GIVE_BYES_SUCCESS, data: response.data});
      }
    })
    .catch(function(error) {
      const message = error.message;
      dispatch({type: GIVE_BYES_FAIL, error: message});
    });
};
}