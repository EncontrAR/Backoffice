import axios from 'axios'

export const INDEX_ALL_CAMPAIGNS = 'INDEX_ALL_CAMPAIGNS'
export const CREATE_CAMPAIGN = 'CREATE_CAMPAIGN'

const campaignActions = {

  indexAllCampaigns: (page, limit) => {
		return (dispatch, getState) => {
		      axios.get('/admin/campaigns/index_all', { params: { page: page, limit: limit } } )
		        .then((response) => dispatch({ type: INDEX_ALL_CAMPAIGNS, payload: response.data }))
		  }
		},

	createCampaign: (page, limit) => {
		return (dispatch, getState) => {
	      axios.get('/admin/campaigns/index_all', { params: { page: page, limit: limit } } )
	        .then((response) => dispatch({ type: INDEX_ALL_CAMPAIGNS, payload: response.data }))
  		}
		}
	};

export default campaignActions;
