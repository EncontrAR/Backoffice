import axios from 'axios';

export const ALERT_VIEWS = 'ALERT_VIEWS'
export const CONVERSATIONS_PER_ZONE = 'CONVERSATIONS_PER_ZONE'
export const TOP_ZONES = 'TOP_ZONES'
export const SUCCESS_CAMPAIGNS = 'SUCCESS_CAMPAIGNS'
export const ACTIVE_CAMPAIGNS = 'ACTIVE_CAMPAIGNS'
export const EXPIRED_CAMPAIGNS = 'EXPIRED_CAMPAIGNS'
export const CANCELED_CAMPAIGNS = 'CANCELED_CAMPAIGNS'
export const CLEAR = 'CLEAR'

const reportActions = {

	indexAlertViews: (from, to) => {
		const body = {
			from: from,
			to: to
		}

		return (dispatch, getState) => {
	  	axios.post('/admin/reports/alert_views', body)
	      .then((response) => dispatch({ type: ALERT_VIEWS, payload: response.data }))
		}
	},

	indexConversationsPerZone: (from, to) => {
		const body = {
			from: from,
			to: to
		}

		return (dispatch, getState) => {
	  	axios.post('/admin/reports/finder_reports', body)
	      .then((response) => dispatch({ type: CONVERSATIONS_PER_ZONE, payload: response.data }))
		}
	},

	indexTopZones: (from, to) => {
		const body = {
			from: from,
			to: to
		}

		return (dispatch, getState) => {
	  	axios.post('/admin/reports/top_zones', body)
	      .then((response) => dispatch({ type: TOP_ZONES, payload: response.data }))
		}
	},

	indexStatusCampaigns: (status, from, to, page, limit) => {
		var action = null

		switch (status) {
			case 'actived':
				action = ACTIVE_CAMPAIGNS
				break

			case 'deactivated':
				action = CANCELED_CAMPAIGNS
				break

			case 'expired':
				action = EXPIRED_CAMPAIGNS
				break

			case 'success':
				action = SUCCESS_CAMPAIGNS
				break
			default:
				break
		}

		const body = {
			from: from,
			to: to,
			page: page,
			limit: limit,
			status: status
		}

		return (dispatch, getState) => {
	      axios.post('/admin/reports/campaign_status', body)
	      	.then((response) => dispatch({ type: action, payload: response.data }))
		}
	},

	clear: () => {
		return { type: CLEAR, payload: null }
	}
}

export default reportActions