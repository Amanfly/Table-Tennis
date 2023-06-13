import {CREATE_DRAWS_REQUEST, CREATE_DRAWS_SUCCESS, CREATE_DRAWS_FAIL, FETCH_DRAWS_FAIL, FETCH_DRAWS_REQUEST, FETCH_DRAWS_SUCCESS} from "../constants/types";
import axios from 'axios';
import { CREATE_DRAWS , FETCH_DRAWS} from "../constants/apiContants";
import { get_localStorage } from "../utils/localstorage";


export function createDraws(tournament_id, player_id) 

{
  console.log("tournament_id, player_id" ,tournament_id, player_id)
 
  return (dispatch) => {
    dispatch({type: CREATE_DRAWS_REQUEST});
    let token = get_localStorage("token");
    axios({
      method: "get",
			url: CREATE_DRAWS,
      headers: { "Authorization": `Bearer ${token}` },
		})
    .then((response) => {
      if (response.data.status === "FAILURE") {
        dispatch({type: CREATE_DRAWS_FAIL, error: response.data.exception_message});
      } else {
        // set token headers
        dispatch({type: CREATE_DRAWS_SUCCESS, data: response.data});
      }
    })
    .catch(function(error) {
      const message = error.message;
      dispatch({type: CREATE_DRAWS_FAIL, error: message});
    });
};
}

export function fetchDraws(id) 

{
  return (dispatch) => {
    dispatch({type: FETCH_DRAWS_REQUEST});
    let token = get_localStorage("token");
    
    axios({
      method: "get",
			url: FETCH_DRAWS+id+'/',
      headers: { "Authorization": `Bearer ${token}` },
    })
    .then((response) => {
      if (response.data.status === "FAILURE") {
        dispatch({type: FETCH_DRAWS_FAIL, error: response.data.exception_message});
      } else {
        // set token headers
        dispatch({type: FETCH_DRAWS_SUCCESS, data: response.data});
      }
    })
    .catch(function(error) {
      const message = error.message;
      dispatch({type: FETCH_DRAWS_FAIL, error: message});
    });
};
}
