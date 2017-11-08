import axios from 'axios'

export const LOAD_CONTACTS = 'LOAD_CONTACTS'
export const CLEAR = 'CLEAR'

const campaignConversationsActions = {
  loadContacts: (campaignId, page, limit) => {
	return (dispatch, getState) => {
	      axios.get(`/admin/campaigns/${campaignId}/conversations`, { params: { page: page, limit: limit } } )
	        .then((response) => dispatch({ type: LOAD_CONTACTS, payload: response.data }))
	  }
	},

	clear: () => {
		return { type: CLEAR }
	}
}

export default campaignConversationsActions;