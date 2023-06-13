import {REGISTER_SUCCESS,REGISTER_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,SET_MESSAGE, REGISTER_REQUEST, VERIFY_EMAIL_REQUEST,VERIFY_EMAIL_SUCCESS,VERIFY_EMAIL_FAIL, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS} from "../constants/types";
import axios from 'axios';
import {EMAIL_VERIFY, LOGIN, REGISTER, FORGOT_PASSWORD, RESET_PASSWORD } from '../constants/apiContants';

export function registers(name, email, password, confirm_password, roles) 

{
  console.log("name, email, password, confirm_password, roles",name, email, password, confirm_password, roles)
  return (dispatch) => {
    dispatch({type: REGISTER_REQUEST});

    axios({
      method: "post",
			url: REGISTER,
			data: {'name':name,'email': email, 'password': password,'confirm_password':confirm_password, 'roles': roles},
		
		})
    .then((response) => {
      if (response.data.status === "FAILURE") {
        dispatch({type: REGISTER_FAIL, error: response.data.exception_message});
      } else {
        // set token headers
        dispatch({type: REGISTER_SUCCESS, data: response.data});
      }
    })
    .catch(function(error) {
      const message = error.message;
      dispatch({type: REGISTER_FAIL, error: message});
    });
};
}


export function login(email, password) {
  console.log("email, pasowrd", email, password)
	return (dispatch) => {
		dispatch({ type: LOGIN_REQUEST });
		
		axios({
			method: "post",
			url: LOGIN,
			data: {'email': email, 'password': password},
			// headers: { "Content-Type": "multipart/form-data" },
		})
			.then((response) => {
				if (response.data.status === "FAILURE") {
					dispatch({type: LOGIN_FAIL, error: response.data.exception_message});
				} else {
					// set token headers
					dispatch({type: LOGIN_SUCCESS, data: response.data});
				}
			})
			.catch(function(error) {
				const message = error.message;
				dispatch({type: LOGIN_FAIL, error: message});
			});
	};
}


export function forgotPassword (email) {
  console.log("email",email)
return (dispatch) => {
      dispatch({type: FORGOT_PASSWORD_REQUEST,});
      axios({
        method: "post",
        url: FORGOT_PASSWORD,
        data: {'email': email},
        // headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
				if (response.data.status === "FAILURE") {
					dispatch({type: FORGOT_PASSWORD_FAIL, error: response.data.exception_message});
				} else {
					// set token headers
					dispatch({type: FORGOT_PASSWORD_SUCCESS, data: response.data});
				}
			})
			.catch(function(error) {
				const message = error.message;
				dispatch({type: FORGOT_PASSWORD_FAIL, error: message});
			});
    };
}

export function resetPassword (password, confirm_password, id) {
  console.log("password, confirm_password",password, confirm_password)
  console.log(id)
return (dispatch) => {
      dispatch({type: RESET_PASSWORD_REQUEST,});
      axios({
        method: "post",
        url: RESET_PASSWORD+id+"/",
        data: {'password': password, 'confirm_password': confirm_password},
        // headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        if (response.data.status === "FAILURE") {
          dispatch({type: RESET_PASSWORD_FAIL, error: response.data.exception_message});
        } else {
          // set token headers
          dispatch({type: RESET_PASSWORD_SUCCESS, data: response.data});
        }
      })
      .catch(function(error) {
        const message = error.message;
        dispatch({type: RESET_PASSWORD_FAIL, error: message});
      });
    };
}

export function verify_email (id) {
  console.log()
return (dispatch) => {
      dispatch({type: VERIFY_EMAIL_REQUEST,});
      axios({
        method: "get",
        url: EMAIL_VERIFY+id+"/",
        data: {},
        // headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
				if (response.data.status === "FAILURE") {
					dispatch({type: VERIFY_EMAIL_FAIL, error: response.data.exception_message});
				} else {
					// set token headers
					dispatch({type: VERIFY_EMAIL_SUCCESS, data: response.data});
				}
			})
			.catch(function(error) {
				const message = error.message;
				dispatch({type: VERIFY_EMAIL_FAIL, error: message});
			});
    };
}

 export const logout = () => (dispatch) => {
  localStorage.clear()
   dispatch({
  type: LOGOUT,
 });
 };





// export const login = (email, password) => (dispatch) => {
//   return authService.login(email, password).then(
//     (data) => {
//       dispatch({type: LOGIN_SUCCESS,payload: { user: data },});
//       return Promise.resolve();
//     },
//     (error) => {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.exception_message) ||
//         error.message ||
//         error.toString();

//       dispatch({
//         type: LOGIN_FAIL,
//       });
//       dispatch({
//         type: SET_MESSAGE,
//         payload: message,
//       });
//       return Promise.reject();
//     }
//   );
// };