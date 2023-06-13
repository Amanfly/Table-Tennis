import {ADD_TOURNAMENT_REQUEST, ADD_TOURNAMENT_SUCCESS, ADD_TOURNAMENT_FAIL} from "../../constants/types";
import axios from 'axios';
import { ADD_TOURNAMENT } from "../../constants/apiContants";
import { get_localStorage } from "../../utils/localstorage";


export function addTournaments(formdata) 

{
  console.log("formData", formdata)
  // console.log(" tournament_name, start_date, registraton_end_date, image, max_set_score, tournament_type", tournament_name, start_date, registraton_end_date, image, max_set_score, tournament_type)
  return (dispatch) => {
    dispatch({type: ADD_TOURNAMENT_REQUEST});
    let token = get_localStorage("token");
    
    axios({
      method: "post",
			url: ADD_TOURNAMENT,
			data: formdata,
      headers: { "Authorization": `Bearer ${token}` },
    })
    .then((response) => {
      if (response.data.status === "FAILURE") {
        dispatch({type: ADD_TOURNAMENT_FAIL, error: response.data.exception_message});
      } else {
        // set token headers
        dispatch({type: ADD_TOURNAMENT_SUCCESS, data: response.data});
      }
    })
    .catch(function(error) {
      const message = error.message;
      dispatch({type: ADD_TOURNAMENT_FAIL, error: message});
    });
};
}


