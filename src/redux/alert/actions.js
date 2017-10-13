import axios from 'axios'

export const INDEX_ALERTS_FOR_CAMPAIGN = 'INDEX_ALERTS_FOR_CAMPAIGN'
export const PRE_CREATE_ALERT = 'PRE_CREATE_ALERT'
export const CREATE_ALERT = 'CREATE_ALERT'
export const SHOW_ALERT = 'SHOW_ALERT'
export const PRE_UPDATE_ALERT = 'PRE_UPDATE_ALERT'
export const UPDATE_ALERT = 'UPDATE_ALERT'
export const DELETE_ALERT = 'DELETE_ALERT'
export const SEARCH_ZONE = 'SEARCH_ZONE'

const alertActions = {

  indexAlertsForCampaign: (campaignId, page, limit) => {
		return (dispatch, getState) => {
		      axios.post('/admin/alerts/index_for_campaign', 
		      		{ campaign_id: campaignId, 
		      			page: page, 
		      			limit: limit 
		      		})
		        .then((response) => dispatch({ type: INDEX_ALERTS_FOR_CAMPAIGN, payload: response.data }))
		  }
		},

	preCreateAlert: (alertData) => {
  	return { type: PRE_CREATE_ALERT, payload: alertData }
	},

	createAlert: (newAlert) => {
		return (dispatch, getState) => {
	      axios.post('/admin/alerts/', newAlert)
	      	.then((response) => dispatch({ type: CREATE_ALERT, payload: response.data }))
		}
	},

	showAlert: (alertId) => {
		return (dispatch, getState) => {
	      axios.get(`/admin/alerts/${alertId}`)
	        .then((response) => dispatch({ type: SHOW_ALERT, payload: response.data }))
		}
	},

	preUpdateAlert: (alertData) => {
  	return { type: PRE_UPDATE_ALERT, payload: alertData }
	},

	updateAlert: (updateAlert) => {
		return (dispatch, getState) => {
	      axios.put(`/admin/alerts/${updateAlert.id}`, updateAlert)
	      	.then((response) => dispatch({ type: UPDATE_ALERT, payload: updateAlert }))
		}
	},

	deleteAlert: (alertId) => {
		return (dispatch, getState) => {
	      axios.delete(`/admin/alerts/${alertId}`)
	        .then((response) => dispatch({ type: DELETE_ALERT, payload: response.data }))
		}
	},

	searchZone: (zoneLabel) => {
		return (dispatch, getState) => {
	      axios.post('/admin/zones/search_by', { label: zoneLabel })
	      	.then((response) => dispatch({ type: SEARCH_ZONE, payload: response.data }))
		}
	}
};

export default alertActions;