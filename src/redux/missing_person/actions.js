import axios from 'axios'

export const INDEX_ALL_MISSING_PEOPLE = 'INDEX_ALL_MISSING_PEOPLE'
export const PRE_CREATE_MISSING_PERSON = 'PRE_CREATE_MISSING_PERSON'
export const CREATE_MISSING_PERSON = 'CREATE_MISSING_PERSON'
export const SHOW_MISSING_PERSON = 'SHOW_MISSING_PERSON'
export const PRE_UPDATE_MISSING_PERSON = 'PRE_UPDATE_MISSING_PERSON'
export const UPDATE_MISSING_PERSON = 'UPDATE_MISSING_PERSON'
export const DELETE_MISSING_PERSON = 'DELETE_MISSING_PERSON'

const missingPersonActions = {

  indexAllMissingPeople: (page, limit) => {
		return (dispatch, getState) => {
		      axios.get('/admin/missing_persons/index_all', { params: { page: page, limit: limit } } )
		        .then((response) => dispatch({ type: INDEX_ALL_MISSING_PEOPLE, payload: response.data }))
		  }
		},

	preCreateMissingPerson: (missingPersonData) => {
  	return { type: PRE_CREATE_MISSING_PERSON, payload: missingPersonData }
	},

	createMissingPerson: (newMissingPerson) => {
		return (dispatch, getState) => {
	      axios.post('/admin/missing_persons/', newMissingPerson)
	      	.then((response) => dispatch({ type: CREATE_MISSING_PERSON, payload: response.data }))
		}
	},

	showMissingPerson: (missingPersonId) => {
		return (dispatch, getState) => {
	      axios.get(`/admin/missing_persons/${missingPersonId}`)
	        .then((response) => dispatch({ type: SHOW_MISSING_PERSON, payload: response.data }))
		}
	},

	preUpdateMissingPerson: (missingPersonData) => {
  	return { type: PRE_UPDATE_MISSING_PERSON, payload: missingPersonData }
	},

	updateMissingPerson: (updateMissingPerson) => {
		return (dispatch, getState) => {
	      axios.put(`/admin/missing_persons/${updateMissingPerson.id}`, updateMissingPerson)
	      	.then((response) => dispatch({ type: UPDATE_MISSING_PERSON, payload: response.data }))
		}
	},

	deleteMissingPerson: (missingPersonId) => {
		return (dispatch, getState) => {
	      axios.delete(`/admin/missing_persons/${missingPersonId}`)
	        .then((response) => dispatch({ type: DELETE_MISSING_PERSON, payload: response.data }))
		}
	}
};

export default missingPersonActions;