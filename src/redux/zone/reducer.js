import { Map } from 'immutable';
import { INDEX_ALL_ZONES } from './actions';

const initState = new Map({
  zones: '',
  total_pages: '',
  total_count: ''
});

export default function campaignReducer(state = initState, action) {
  switch (action.type) {
    case INDEX_ALL_ZONES:
      return Object.assign({}, state, {
      	zones: action.payload.page, 
      	total_pages: action.payload.total_pages,
      	total_count: action.payload.total_count
      })
    default:
      return state
  }
}