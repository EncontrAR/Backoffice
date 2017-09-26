import axios from 'axios'

export const INDEX_ALL_CAMPAIGNS = 'INDEX_ALL_CAMPAIGNS'
export const CREATE_CAMPAIGN = 'CREATE_CAMPAIGN'
export const SHOW_CAMPAIGN = 'SHOW_CAMPAIGN'
export const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN'
export const DELETE_CAMPAIGN = 'DELETE_CAMPAIGN'

const campaignActions = {

  indexAllCampaigns: (page, limit) => {
		return (dispatch, getState) => {
		      axios.get('/admin/campaigns/index_all', { params: { page: page, limit: limit } } )
		        .then((response) => dispatch({ type: INDEX_ALL_CAMPAIGNS, payload: response.data }))
		  }
		},

	createCampaign: (newCampaign) => {
		return (dispatch, getState) => {
	      axios.post('/admin/campaigns/', 
	      	{ params: 
	      		{ 
	      			title: newCampaign.title, 
	      			description: newCampaign.description,
	      			missing_person_id: newCampaign.missing_person_id
	      		} 
	      	}).then((response) => dispatch({ type: CREATE_CAMPAIGN, payload: response.data }))
		}
	},

	showCampaign: (campaignId) => {
		return (dispatch, getState) => {
	      axios.get(`/admin/campaigns/${campaignId}`)
	        .then((response) => dispatch({ type: SHOW_CAMPAIGN, payload: response.data }))
		}
	},

	updateCampaign: (updateCampaign) => {
		return (dispatch, getState) => {
	      axios.put(`/admin/campaigns/${updateCampaign.id}`, 
	      	{ params: 
	      		{ 
	      			title: updateCampaign.title, 
	      			description: updateCampaign.description
	      		} 
	      	}).then((response) => dispatch({ type: UPDATE_CAMPAIGN, payload: response.data }))
		}
	},

	deleteCampaign: (campaignId) => {
		return (dispatch, getState) => {
	      axios.delete(`/admin/campaigns/${campaignId}`)
	        .then((response) => dispatch({ type: DELETE_CAMPAIGN, payload: response.data }))
		}
	}
};

export default campaignActions;
