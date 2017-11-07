import Immutable from 'seamless-immutable'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, CLEAR_MSG } from './actions'

const initState = Immutable({
  loginSuccess: false,
  loginFailure: false
})

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      //TODO Modify the state to let the user know that the request is in progress
      console.log("Login in progress")
      return state;
    case LOGIN_ERROR:
      //TODO Modify the state to let the user know that the request has failed
      console.log("Login failed")
      return Immutable.merge(state, {
        loginSuccess: false,
        loginFailure: true
      })
    case LOGIN_SUCCESS:
      console.log("Login succeded")
      localStorage.removeItem('auth_token')
      localStorage.setItem('auth_token', action.payload.auth_token) // Save the token in the local storage
      return Immutable.merge(state, {
        loginSuccess: true,
        loginFailure: false
      })
    case CLEAR_MSG:
      return Immutable.merge(state, {
        loginSuccess: false,
        loginFailure: false
      })
    /*case actions.LOGOUT:
      return initState;*/
    default:
      return state
  }
}
