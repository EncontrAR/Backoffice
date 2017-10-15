import axios from 'axios'

export const INDEX_ALL_CONVERSATIONS = 'INDEX_ALL_CONVERSATIONS'

const conversationActions = {

  indexAllConversations: (page, limit) => {
		return (dispatch, getState) => {
		      axios.get('/admin/conversations/index_all', { params: { page: page, limit: limit } } )
		        .then((response) => dispatch({ type: INDEX_ALL_CONVERSATIONS, payload: response.data }))
		  }
		}

};

export default conversationActions;