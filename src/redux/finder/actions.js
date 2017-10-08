import axios from 'axios'

export const INDEX_ALL_FINDERS = 'INDEX_ALL_FINDERS'
export const SHOW_FINDER = 'SHOW_FINDER'

const finderActions = {

  indexAllFinders: (page, limit) => {
		return (dispatch, getState) => {
		      axios.get('/admin/finders/index_all', { params: { page: page, limit: limit } } )
		        .then((response) => dispatch({ type: INDEX_ALL_FINDERS, payload: response.data }))
		  }
		},

	showFinder: (finderId) => {
		return (dispatch, getState) => {
	      axios.get(`/admin/finders/${finderId}`)
	        .then((response) => dispatch({ type: SHOW_FINDER, payload: response.data }))
		}
	}
};

export default finderActions;