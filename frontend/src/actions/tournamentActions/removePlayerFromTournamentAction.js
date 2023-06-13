import {REMOVE_PLAYER_FROM_TOURNAMENT_REQUEST, REMOVE_PLAYER_FROM_TOURNAMENT_SUCCESS, REMOVE_PLAYER_FROM_TOURNAMENT_FAIL} from "../../constants/types";
import axios from 'axios';
import { REMOVE_PLAYER_FROM_TOURNAMENT } from "../../constants/apiContants";
import { get_localStorage } from "../../utils/localstorage";


export function removePlayerFromTournament(tournamentId, playerId) {
  return (dispatch) => {
    dispatch({type: REMOVE_PLAYER_FROM_TOURNAMENT_REQUEST});
    let token = get_localStorage("token");
    axios({
      method: "delete",
      url: REMOVE_PLAYER_FROM_TOURNAMENT,
      data: {"tournament_id":tournamentId, "player_id":playerId},
      headers: { "Authorization": `Bearer ${token}` },
		})
    .then((response) => {
      if (response.data.status === "FAILURE") {
        dispatch({type: REMOVE_PLAYER_FROM_TOURNAMENT_FAIL, error: response.data.exception_message});
      } else {
        // set token headers
        dispatch({type: REMOVE_PLAYER_FROM_TOURNAMENT_SUCCESS, data: response.data});
      }
    })
    .catch(function(error) {
      const message = error.message;
      dispatch({type: REMOVE_PLAYER_FROM_TOURNAMENT_FAIL, error: message});
    });
};
}
