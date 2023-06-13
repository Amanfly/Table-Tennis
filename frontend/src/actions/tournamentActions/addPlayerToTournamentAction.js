import {ADD_PLAYER_TO_TOURNAMENT_REQUEST, ADD_PLAYER_TO_TOURNAMENT_SUCCESS, ADD_PLAYER_TO_TOURNAMENT_FAIL, GET_PLAYER_DRAW_REQUEST, GET_PLAYER_DRAW_SUCCESS, GET_PLAYER_DRAW_FAIL} from "../../constants/types";
import axios from 'axios';
import { ADD_PLAYER_TO_TOURNAMENT, GET_GENRATE_DRAWS } from "../../constants/apiContants";
import { get_localStorage } from "../../utils/localstorage";


export function addPlayerToTournaments(tournament_id, player_id) 

{
  //console.log("formData", formdata)
 
  return (dispatch) => {
    dispatch({type: ADD_PLAYER_TO_TOURNAMENT_REQUEST});
    let token = get_localStorage("token");
    
    axios({
      method: "post",
			url: ADD_PLAYER_TO_TOURNAMENT,
			data: {"tournament_id":tournament_id, "player_id":player_id},
      headers: { "Authorization": `Bearer ${token}` },
    })
    .then((response) => {
      if (response.data.status === "FAILURE") {
        dispatch({type: ADD_PLAYER_TO_TOURNAMENT_FAIL, error: response.data.exception_message});
      } else {
        // set token headers
        dispatch({type: ADD_PLAYER_TO_TOURNAMENT_SUCCESS, data: response.data});
      }
    })
    .catch(function(error) {
      const message = error.message;
      dispatch({type: ADD_PLAYER_TO_TOURNAMENT_FAIL, error: message});
    });
};
}
export function getCreateDraws(tournamentId) {
  return (dispatch) => {
    dispatch({type: GET_PLAYER_DRAW_REQUEST });
    let token = get_localStorage("token");
    axios({
      method: "get",
			url: GET_GENRATE_DRAWS+tournamentId,
      headers: { "Authorization": `Bearer ${token}` },
		})
    .then((response) => {
      console.log("response", response)
      if (response.data.status === "FAILURE") {
        dispatch({type:GET_PLAYER_DRAW_FAIL, error: response.data.exception_message});
      } else {
        // set token headers
        dispatch({type:GET_PLAYER_DRAW_SUCCESS, data: response.data});
      }
    })
    .catch(function(error) {
      const message = error.message;
      dispatch({type:GET_PLAYER_DRAW_FAIL, error: message});
    });
};
}

