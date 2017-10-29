import axios from 'axios'

export const INDEX_ALL_ZONES = 'INDEX_ALL_ZONES'
export const PRE_CREATE_ZONE = 'PRE_CREATE_ZONE'
export const CREATE_ZONE = 'CREATE_ZONE'
export const CLEAR = 'CLEAR'
export const SHOW_ZONE = 'SHOW_ZONE'
export const UPDATE_ZONE = 'UPDATE_ZONE'
export const PRE_UPDATE_ZONE = 'PRE_UPDATE_ZONE'
export const DELETE_ZONE = 'DELETE_ZONE'

const zoneActions = {

  indexAllZones: (page, limit) => {
		return (dispatch, getState) => {
		      axios.get('/admin/zones/index_all', { params: { page: page, limit: limit } } )
		        .then((response) => dispatch({ type: INDEX_ALL_ZONES, payload: response.data }))
		  }
		},

	preCreateZone: (zoneData) => {
  	return { type: PRE_CREATE_ZONE, payload: zoneData }
	},

	createZone: (newZone) => {
		return (dispatch, getState) => {
	      axios.post('/admin/zones/', newZone)
	      .then((response) => dispatch({ type: CREATE_ZONE, payload: response.data }))
		}
	},

	clear: () => {
  	return { type: CLEAR, payload: null }
	},

	showZone: (zoneId) => {
		return (dispatch, getState) => {
	      axios.get(`/admin/zones/${zoneId}`)
	        .then((response) => dispatch({ type: SHOW_ZONE, payload: response.data }))
		}
	},

	preUpdateZone: (zoneData) => {
  	return { type: PRE_UPDATE_ZONE, payload: zoneData }
	},

	updateZone: (updateZone) => {
		return (dispatch, getState) => {
	      axios.put(`/admin/zones/${updateZone.id}`, updateZone)
	      .then((response) => dispatch({ type: UPDATE_ZONE, payload: updateZone }))
		}
	},

	deleteZone: (zoneId) => {
		return (dispatch, getState) => {
	      axios.delete(`/admin/zones/${zoneId}`)
	        .then((response) => dispatch({ type: DELETE_ZONE, payload: response.data }))
		}
	}
};

export default zoneActions;