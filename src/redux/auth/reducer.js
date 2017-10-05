import { Map } from 'immutable';
import { getToken, setToken } from '../../helpers/utility';
import actions from './actions';

const initState = new Map({
  idToken: 'token_obtained_through_API_auth_should_be_here'
});

export default function authReducer(
  state = initState.merge(getToken()),
  action
) {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      //TODO Modify the state to let the user know that the request is in progress
      console.log("Login in progress");
    return state;
    case actions.LOGIN_ERROR:
      //TODO Modify the state to let the user know that the request has failed
      console.log("Login failed");
    return state;
    case actions.LOGIN_SUCCESS:
      console.log("Login succeded");
      setToken(action.payload.auth_token); // Save the token in the local storage
      return state.merge(new Map({idToken : action.payload.auth_token}));
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
