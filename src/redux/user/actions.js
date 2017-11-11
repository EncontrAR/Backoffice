import axios from 'axios'

export const INDEX_ALL_USERS = 'INDEX_ALL_USERS'
export const CREATE_USER = 'CREATE_USER'
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR'
export const SHOW_USER = 'SHOW_USER'
export const CLEAR = 'CLEAR'
export const CLEAR_MSG = 'CLEAR_MSG'

const userActions = {

  indexAllUsers: (page, limit) => {
		return (dispatch, getState) => {
      axios.get('/admin/users/index_all', { params: { page: page, limit: limit } } )
      	.then((response) => dispatch({ type: INDEX_ALL_USERS, payload: response.data }))
	  }
	},

	createUser: (newUser) => {
		return (dispatch, getState) => {
      axios.post('/admin/users/', newUser)
      	.then((response) => dispatch({ type: CREATE_USER, payload: response.data }))
      	.catch((error) => dispatch({ type: CREATE_USER_ERROR }))
		}
	},

	showUser: (userId) => {
		return (dispatch, getState) => {
	      axios.get(`/admin/users/${userId}`)
	        .then((response) => dispatch({ type: SHOW_USER, payload: response.data }))
		}
	},

	clear: (userId) => {
		return { type: CLEAR }
	},

	clearMsg: (userId) => {
		return { type: CLEAR_MSG }
	}
};

export default userActions;