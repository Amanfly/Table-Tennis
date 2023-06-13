import {GET_TOURNAMENT_REQUEST, GET_TOURNAMENT_SUCCESS, GET_TOURNAMENT_FAIL, LIST_TOURNAMENT_FAIL, LIST_TOURNAMENT_REQUEST,LIST_TOURNAMENT_SUCCESS} from "../../constants/types";
import axios from 'axios';
import { GET_TOURNAMENT, LIST_TOURNAMENT } from "../../constants/apiContants";
import { get_localStorage } from "../../utils/localstorage";


export function getTournament(id) {
  return (dispatch) => {
    dispatch({type: GET_TOURNAMENT_REQUEST});
    let token = get_localStorage("token");
    axios({
      method: "get",
			url: GET_TOURNAMENT+id+'/',
      headers: { "Authorization": `Bearer ${token}` },
		})
    .then((response) => {
      if (response.data.status === "FAILURE") {
        dispatch({type: GET_TOURNAMENT_FAIL, error: response.data.exception_message});
      } else {
        // set token headers
        dispatch({type: GET_TOURNAMENT_SUCCESS, data: response.data});
      }
    })
    .catch(function(error) {
      const message = error.message;
      dispatch({type: GET_TOURNAMENT_FAIL, error: message});
    });
};
}

export function getTournamentList() {
  return (dispatch) => {
    dispatch({type: LIST_TOURNAMENT_REQUEST});
    let token = get_localStorage("token");
    axios({
      method: "get",
			url: LIST_TOURNAMENT,
      headers: { "Authorization": `Bearer ${token}` },
		})
    .then((response) => {
      if (response.data.status === "FAILURE") {
        dispatch({type: LIST_TOURNAMENT_FAIL, error: response.data.exception_message});
      } else {
        // set token headers
        dispatch({type: LIST_TOURNAMENT_SUCCESS, data: response.data});
      }
    })
    .catch(function(error) {
      const message = error.message;
      dispatch({type: LIST_TOURNAMENT_FAIL, error: message});
    });
};
}
