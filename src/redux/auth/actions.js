import axios from 'axios'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const CLEAR_MSG = 'CLEAR_MSG'

const authActions = {

  login: (email, password) => {
		return (dispatch, getState) => {
      // LOGIN_REQUEST action
      dispatch({ type: LOGIN_REQUEST })

      console.log("Requesting...")

      // Make auth HTTP request
      axios.post('/admin/users/log_in', { "email": email, "password": password })
            .then((response) => handleLoginResponse(dispatch, response))
            .catch((error) => dispatch({ type: LOGIN_ERROR }))
		  }
		},

  clearMsg: () => {
    return { type: CLEAR_MSG }
  }

};

function handleLoginResponse(dispatch, response) {
  console.log("Handling...")

  if (response.status === 200) {
    dispatch({ type: LOGIN_SUCCESS, payload: response.data })
  }
}

export default authActions;
