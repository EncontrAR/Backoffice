import axios from 'axios'

const authActions = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  login: (email, password) => {
    return (dispatch, getState) => {
      axios.post('/admin/users/log_in', { "email": email, "password": password })
        .then((response) => dispatch({ type: authActions.LOGIN_REQUEST, payload: response.data }))
    }
  },
  logout: () => ({
    type: authActions.LOGOUT,
  }),
};
export default authActions;
