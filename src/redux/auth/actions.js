import axios from 'axios'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

const authActions = {

  login: (email, password) => {
		return (dispatch, getState) => {
      // LOGIN_REQUEST action
      dispatch({ type: LOGIN_REQUEST })

      console.log("Requesting...")

      // Make auth HTTP request
      axios.post('/admin/users/log_in', { "email": email, "password": password })
            .then((response) => handleLoginResponse(dispatch, response))
		  }
		}

};

function handleLoginResponse(dispatch, response) {
  console.log("Handling...")
  console.log(response)
  
  // If response is ok, then LOGIN_SUCCESS action is triggered
  if (response.code === 200) {
    dispatch({ type: LOGIN_SUCCESS, payload: response.data })
  }
  // Else, trigger a LOGIN_ERROR action
  else {
    dispatch({ type: LOGIN_ERROR })
  };
}

export default authActions;
