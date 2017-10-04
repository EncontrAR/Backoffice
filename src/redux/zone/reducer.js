import { Map } from 'immutable';
import { INDEX_ALL_ZONES, SHOW_ZONE, PRE_UPDATE_ZONE } from './actions';

const initState = new Map({
  zones: '',
  total_pages: '',
  total_count: '',
  zone: {}
});

export default function campaignReducer(state = initState, action) {
  switch (action.type) {
    case INDEX_ALL_ZONES:
      return Object.assign({}, state, {
      	zones: action.payload.page, 
      	total_pages: action.payload.total_pages,
      	total_count: action.payload.total_count
      })
    case SHOW_ZONE:
      return Object.assign({}, state, {
        zone: action.payload
      })
    case PRE_UPDATE_ZONE:
      return state.merge(
        {
          zone: 
          {
            name: action.payload.name
          }
        },
        { deep: true }
      )
    default:
      return state
  }
}