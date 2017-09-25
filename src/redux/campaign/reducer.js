import { Map } from 'immutable';
import campaignActions, { INDEX_ALL_CAMPAIGNS } from './actions';

const initState = new Map({
  campaigns: '',
  total_pages: '',
  total_count: ''
});

export default function campaignReducer(state = initState, action) {
  switch (action.type) {
    case INDEX_ALL_CAMPAIGNS:
      return Object.assign({}, state, {
      	campaigns: action.payload.page, 
      	total_pages: action.payload.total_pages,
      	total_count: action.payload.total_count
      })
    default:
      return state
  }
}
