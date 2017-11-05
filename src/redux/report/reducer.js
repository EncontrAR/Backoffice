import Immutable from 'seamless-immutable';
import { 
	ALERT_VIEWS,
	CONVERSATIONS_PER_ZONE,
	TOP_ZONES,
  SUCCESS_CAMPAIGNS,
  ACTIVE_CAMPAIGNS,
  EXPIRED_CAMPAIGNS,
  CANCELED_CAMPAIGNS,
  CLEAR
} from './actions';

const initState = Immutable({
	alert_views: [],
	conversations_per_zone: [],
	campaigns_per_zone: [],
  actived_campaigns: {},
  deactivated_campaigns: {},
  expired_campaigns: {},
  success_campaigns: {}
});

export default function reportReducer(state = initState, action) {
switch (action.type) {
	case ALERT_VIEWS:
		return Immutable.merge(state, {
	    alert_views: action.payload
	  })
	case CONVERSATIONS_PER_ZONE:
		return Immutable.merge(state, {
	    conversations_per_zone: action.payload
	  })
	case TOP_ZONES:
		return Immutable.merge(state, {
	    campaigns_per_zone: action.payload
	  })
	case SUCCESS_CAMPAIGNS:
	  return Immutable.merge(state, {
	    success_campaigns: action.payload
	  })
	case ACTIVE_CAMPAIGNS:
	  return Immutable.merge(state, {
	    actived_campaigns: action.payload
	  })
	case EXPIRED_CAMPAIGNS:
	  return Immutable.merge(state, {
	    expired_campaigns: action.payload
	  })
	case CANCELED_CAMPAIGNS:
	  return Immutable.merge(state, {
	    deactivated_campaigns: action.payload
	  })
	case CLEAR: 
		return initState
	default:
	  return state
	}
}