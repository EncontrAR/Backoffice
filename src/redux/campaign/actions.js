import axios from 'axios'

export const INDEX_ALL_CAMPAIGNS = 'INDEX_ALL_CAMPAIGNS'
export const PRE_CREATE_CAMPAIGN = 'PRE_CREATE_CAMPAIGN'
export const CREATE_CAMPAIGN = 'CREATE_CAMPAIGN'
export const CREATE_CAMPAIGN_ERROR = 'CREATE_CAMPAIGN_ERROR'
export const CLEAR = 'CLEAR'
export const CLEAR_MSG = 'CLEAR_MSG'
export const SHOW_CAMPAIGN = 'SHOW_CAMPAIGN'
export const PRE_UPDATE_CAMPAIGN = 'PRE_UPDATE_CAMPAIGN'
export const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN'
export const UPDATE_CAMPAIGN_ERROR = 'UPDATE_CAMPAIGN_ERROR'
export const SEARCH_MISSING_PEOPLE = 'SEARCH_MISSING_PEOPLE'

const campaignActions = {

  indexAllCampaigns: (page, limit) => {
		return (dispatch, getState) => {
		      axios.get('/admin/campaigns/index_all', { params: { page: page, limit: limit } } )
		        .then((response) => dispatch({ type: INDEX_ALL_CAMPAIGNS, payload: response.data }))
		  }
		},

	preCreateCampaign: (campaignData) => {
  	return { type: PRE_CREATE_CAMPAIGN, payload: campaignData }
	},

	createCampaign: (newCampaign) => {
		return (dispatch, getState) => {
	      axios.post('/admin/campaigns/', newCampaign)
	      	.then((response) => dispatch({ type: CREATE_CAMPAIGN, payload: response.data }))
	      	.catch((error) => dispatch({ type: CREATE_CAMPAIGN_ERROR }))
		}
	},

	clear: () => {
  	return { type: CLEAR }
	},

	clearMsg: () => {
		return { type: CLEAR_MSG }
	},

	showCampaign: (campaignId) => {
		return (dispatch, getState) => {
	      axios.get(`/admin/campaigns/${campaignId}`)
	        .then((response) => dispatch({ type: SHOW_CAMPAIGN, payload: response.data }))
		}
	},

	preUpdateCampaign: (campaignData) => {
  	return { type: PRE_UPDATE_CAMPAIGN, payload: campaignData }
	},

	updateCampaign: (updateCampaign) => {
		return (dispatch, getState) => {
	      axios.put(`/admin/campaigns/${updateCampaign.id}`, updateCampaign)
	      	.then((response) => dispatch({ type: UPDATE_CAMPAIGN, payload: updateCampaign }))
	      	.catch((error) => dispatch({ type: UPDATE_CAMPAIGN_ERROR }))
		}
	},

	searchMissingPeople: (dni) => {
		return (dispatch, getState) => {
	      axios.post('/admin/missing_persons/search_by', { dni: dni })
	      	.then((response) => dispatch({ type: SEARCH_MISSING_PEOPLE, payload: response.data }))
		}
	}
};

export default campaignActions;
