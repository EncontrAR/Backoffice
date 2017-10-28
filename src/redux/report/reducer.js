import Immutable from 'seamless-immutable';
import { 
  SUCCESS_CAMPAIGNS,
  ACTIVE_CAMPAIGNS,
  EXPIRED_CAMPAIGNS,
  CANCELED_CAMPAIGNS,
  CLEAR
} from './actions';

const initState = Immutable({
  actived_campaigns: {},
  deactivated_campaigns: {},
  expired_campaigns: {},
  success_campaigns: {}
});

export default function reportReducer(state = initState, action) {
switch (action.type) {
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