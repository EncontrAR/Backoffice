import { Map } from 'immutable';
import { getToken } from '../../helpers/utility';
import actions from './actions';

const initState = new Map({
  idToken: 'secret token'
});

export default function authReducer(
  state = initState.merge(getToken()),
  action
) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      localStorage.setItem('auth_token', action.payload.auth_token)
      return null
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
