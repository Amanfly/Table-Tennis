import {EDIT_TOURNAMENT_REQUEST, EDIT_TOURNAMENT_SUCCESS, EDIT_TOURNAMENT_FAIL} from "../../constants/types";
import axios from 'axios';
import { ADD_TOURNAMENT } from "../../constants/apiContants";
import { get_localStorage } from "../../utils/localstorage";


export function editTournament(formdata, id) {
  return (dispatch) => {
    dispatch({type: EDIT_TOURNAMENT_REQUEST});
    let token = get_localStorage("token");
    axios({
      method: "post",
			url: ADD_TOURNAMENT+id+'/',
     data:formdata,
     headers: { "Authorization": `Bearer ${token}` },
		})
    .then((response) => {
      if (response.data.status === "FAILURE") {
        dispatch({type: EDIT_TOURNAMENT_FAIL, error: response.data.exception_message});
      } else {
        // set token headers
        dispatch({type: EDIT_TOURNAMENT_SUCCESS, data: response.data});
      }
    })
    .catch(function(error) {
      const message = error.message;
      dispatch({type: EDIT_TOURNAMENT_FAIL, error: message});
    });
};
}
