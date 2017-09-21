import { Map } from 'immutable';
import campaignActions, { INDEX_ALL_CAMPAIGNS } from './actions';

const campaigns = []

const initState = new Map({
  campaigns
});

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case INDEX_ALL_CAMPAIGNS:
      return state.set('campaigns', action.data)
    default:
      return state;
  }
}
