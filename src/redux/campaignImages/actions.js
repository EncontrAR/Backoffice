import axios from 'axios'

export const INDEX_IMAGES = 'INDEX_IMAGES'
export const ADD_IMAGE = 'ADD_IMAGE'
export const ADD_IMAGE_ERROR = 'ADD_IMAGE_ERROR'
export const DELETE_IMAGE = 'DELETE_IMAGE'
export const DELETE_IMAGE_ERROR = 'DELETE_IMAGE_ERROR'
export const CLEAR = 'CLEAR'
export const CLEAR_MSG = 'CLEAR_MSG'

const campaignImagesActions = {

  showImages: (campaignId) => {
		return (dispatch, getState) => {
      axios.get(`/admin/campaigns/${campaignId}/images`)
        .then((response) => dispatch({ type: INDEX_IMAGES, payload: response.data }))
		}
	},

	addImage: (campaignId, url) => {
		return (dispatch, getState) => {
      axios.post(`/admin/campaigns/${campaignId}/add_image`, { url: url})
        .then((response) => dispatch({ type: ADD_IMAGE, payload: response.data }))
        .catch((error) => dispatch({ type: ADD_IMAGE_ERROR }))
		}
	},

	deleteImage: (campaignId, imageId) => {
		return (dispatch, getState) => {
      axios.post(`/admin/campaigns/${campaignId}/delete_image`, { image_id: imageId })
        .then((response) => dispatch({ type: DELETE_IMAGE, payload: { id: imageId } }))
        .catch((error) => dispatch({ type: DELETE_IMAGE_ERROR }))
		}
	},

	clear: () => {
  	return { type: CLEAR }
	},

	clearMsg: () => {
		return { type: CLEAR_MSG }
	}
};

export default campaignImagesActions;