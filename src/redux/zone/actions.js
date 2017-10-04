import axios from 'axios'

export const INDEX_ALL_ZONES = 'INDEX_ALL_ZONES'
export const CREATE_ZONE = 'CREATE_ZONE'
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

	createZone: (newZone) => {
		return (dispatch, getState) => {
	      axios.post('/admin/zones/', 
	      	{ params: 
	      		{ 
	      			name: newZone.name, 
	      			south_west_lat: newZone.south_west_lat,
	      			south_west_long: newZone.south_west_long,
	      			north_east_lat: newZone.north_east_lat,
	      			north_east_long: newZone.north_east_long
	      		} 
	      	}).then((response) => dispatch({ type: CREATE_ZONE, payload: response.data }))
		}
	},

	showZone: (zoneId) => {
		return (dispatch, getState) => {
	      axios.get(`/admin/zones/${zoneId}`)
	        .then((response) => dispatch({ type: SHOW_ZONE, payload: response.data }))
		}
	},

	updateZone: (zoneId, updateZone) => {
		return (dispatch, getState) => {
	      axios.put(`/admin/zones/${zoneId}`, 
	      	{ params: 
	      		{ 
	      			name: updateZone.name, 
	      			south_west_lat: updateZone.south_west_lat,
	      			south_west_long: updateZone.south_west_long,
	      			north_east_lat: updateZone.north_east_lat,
	      			north_east_long: updateZone.north_east_long
	      		}
	      	}).then((response) => dispatch({ type: UPDATE_ZONE, payload: response.data }))
		}
	},

	preUpdateZone: (zoneData) => {
  	return { type: PRE_UPDATE_ZONE, payload: zoneData }
	},

	deleteZone: (zoneId) => {
		return (dispatch, getState) => {
	      axios.delete(`/admin/zones/${zoneId}`)
	        .then((response) => dispatch({ type: DELETE_ZONE, payload: response.data }))
		}
	}
};

export default zoneActions;