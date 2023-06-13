import {PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAIL, LIST_PLAYER_FAIL, LIST_PLAYER_REQUEST, LIST_PLAYER_SUCCESS, GET_PLAYER_FAIL, GET_PLAYER_REQUEST,   GET_PLAYER_SUCCESS, UPDATE_PLAYER_FAIL, UPDATE_PLAYER_SUCCESS, UPDATE_PLAYER_REQUEST, DELETE_PLAYER_REQUEST, DELETE_PLAYER_SUCCESS, DELETE_PLAYER_FAIL, ADD_PLAYER_FAIL, ADD_PLAYER_REQUEST, ADD_PLAYER_SUCCESS, SEARCH_PLAYER_FAIL, SEARCH_PLAYER_REQUEST, SEARCH_PLAYER_SUCCESS} from "../constants/types";

import axios from 'axios';
import { PROFILE, PLAYER_LIST, DELETE_PLAYER, ADD_PLAYER, UPDATE_PLAYER, SEARCH_PLAYER } from "../constants/apiContants";
import { get_localStorage } from "../utils/localstorage";

export function profileData() {
  return (dispatch) => {
    dispatch({type: PROFILE_REQUEST});
    let token = get_localStorage("token");
    axios({
      method: "get",
			url: PROFILE,
      headers: { "Authorization": `Bearer ${token}` },
		})
    .then((response) => {
      if (response.data.status === "FAILURE") {
        dispatch({type: PROFILE_FAIL, error: response.data.exception_message});
      } else {
        // set token headers
        dispatch({type: PROFILE_SUCCESS, data: response.data});
      }
    })
    .catch(function(error) {
      const message = error.message;
      dispatch({type: PROFILE_FAIL, error: message});
    });
};
}

export function listPlayer() {
  return (dispatch) => {
    dispatch({type: LIST_PLAYER_REQUEST });
    let token = get_localStorage("token");
    axios({
      method: "get",
			url: PLAYER_LIST,
      headers: { "Authorization": `Bearer ${token}` },
		})
    .then((response) => {
      console.log("response", response)
      if (response.data.status === "FAILURE") {
        dispatch({type:LIST_PLAYER_FAIL, error: response.data.exception_message});
      } else {
        // set token headers
        dispatch({type:LIST_PLAYER_SUCCESS, data: response.data});
      }
    })
    .catch(function(error) {
      const message = error.message;
      dispatch({type:LIST_PLAYER_FAIL, error: message});
    });
};
}

export function getPlayer(id) {
  return (dispatch) => {
    dispatch({type: GET_PLAYER_REQUEST });
    let token = get_localStorage("token");
    axios({
      method: "get",
			url: PLAYER_LIST+id+'/',
      headers: { "Authorization": `Bearer ${token}` },
		})
    .then((response) => {
      if (response.data.status === "FAILURE") {
        dispatch({type:GET_PLAYER_FAIL, error: response.data.exception_message});
      } else {
        // set token headers
        dispatch({type:GET_PLAYER_SUCCESS, data: response.data});
      }
    })
    .catch(function(error) {
      const message = error.message;
      dispatch({type:GET_PLAYER_FAIL, error: message});
    });
};
}

export function updatePlayer(formdata, id) {
  return (dispatch) => {
    dispatch({type: UPDATE_PLAYER_REQUEST});
    let token = get_localStorage("token");
    axios({
      method: "post",
			url: UPDATE_PLAYER,
			data:formdata,
      headers: { "Authorization": `Bearer ${token}` },
		})
    .then((response) => {
      if (response.data.status === "FAILURE") {
        dispatch({type:UPDATE_PLAYER_FAIL, error: response.data.exception_message});
      } else {
        // set token headers
        dispatch({type:UPDATE_PLAYER_SUCCESS, data: response.data});
      }
    })
    .catch(function(error) {
      const message = error.message;
      dispatch({type:UPDATE_PLAYER_FAIL, error: message});
    });
};
}



export function deletePlayer(id) {
  return (dispatch) => {
    dispatch({type: DELETE_PLAYER_REQUEST});
    let token = get_localStorage("token");
    axios({
      method: "delete",
			url: DELETE_PLAYER+id+'/',
      headers: { "Authorization": `Bearer ${token}` },
		})
    .then((response) => {
      if (response.data.status === "FAILURE") {
        dispatch({type: DELETE_PLAYER_FAIL, error: response.data.exception_message});
      } else {
        // set token headers
        dispatch({type: DELETE_PLAYER_SUCCESS, data: response.data});
      }
    })
    .catch(function(error) {
      const message = error.message;
      dispatch({type: DELETE_PLAYER_FAIL, error: message});
    });
};
}

export function addPlayer(formdata) 
{
  console.log("formData", formdata)
  let token = get_localStorage("token");
	return (dispatch) => {
		dispatch({ type: ADD_PLAYER_REQUEST });
		
		axios({
			method: "post",
			url: ADD_PLAYER,
			data:formdata,
      headers: { "Authorization": `Bearer ${token}` },
			// headers: { "Content-Type": "multipart/form-data" },
		})
			.then((response) => {
				if (response.data.status === "FAILURE") {
					dispatch({type: ADD_PLAYER_FAIL, error: response.data.exception_message});
				} else {
					// set token headers
					dispatch({type: ADD_PLAYER_SUCCESS, data: response.data});
				}
			})
			.catch(function(error) {
				const message = error.message;
				dispatch({type: ADD_PLAYER_FAIL, error: message});
			});
	};
}

export function searchPlayers(id) {
  return (dispatch) => {
    dispatch({type: SEARCH_PLAYER_REQUEST });
    let token = get_localStorage("token");
    axios({
      method: "get",
			url: SEARCH_PLAYER+id+'/',
      headers: { "Authorization": `Bearer ${token}` },
		})
    .then((response) => {
      if (response.data.status === "FAILURE") {
        dispatch({type:SEARCH_PLAYER_FAIL, error: response.data.exception_message});
      } else {
        dispatch({type:SEARCH_PLAYER_SUCCESS, data: response.data});
      }
    })
    .catch(function(error) {
      const message = error.message;
      dispatch({type:SEARCH_PLAYER_FAIL, error: message});
    });
};
}
