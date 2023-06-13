import {DELETE_TOURNAMENT_REQUEST, DELETE_TOURNAMENT_SUCCESS, DELETE_TOURNAMENT_FAIL} from "../../constants/types";
import axios from 'axios';
import { DELETE_TOURNAMENT } from "../../constants/apiContants";
import { get_localStorage } from "../../utils/localstorage";


export function deleteTournament(id) {
  return (dispatch) => {
    dispatch({type: DELETE_TOURNAMENT_REQUEST});
    let token = get_localStorage("token");
    axios({
      method: "delete",
			url: DELETE_TOURNAMENT+id+'/',
      headers: { "Authorization": `Bearer ${token}` },
		})
    .then((response) => {
      if (response.data.status === "FAILURE") {
        dispatch({type: DELETE_TOURNAMENT_FAIL, error: response.data.exception_message});
      } else {
        // set token headers
        dispatch({type: DELETE_TOURNAMENT_SUCCESS, data: response.data});
      }
    })
    .catch(function(error) {
      const message = error.message;
      dispatch({type: DELETE_TOURNAMENT_FAIL, error: message});
    });
};
}
