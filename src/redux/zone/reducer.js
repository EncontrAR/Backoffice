import Immutable from 'seamless-immutable'
import { 
  INDEX_ALL_ZONES, PRE_CREATE_ZONE, CREATE_ZONE, 
  SHOW_ZONE, PRE_UPDATE_ZONE, UPDATE_ZONE,
  DELETE_ZONE
} from './actions';

const initState = Immutable({
  zones: '',
  total_pages: '',
  total_count: '',
  zone: {},
  newZone: {},
  creationSuccess: false,
  deleteSuccess: false
});

export default function campaignReducer(state = Immutable(initState), action) {
  switch (action.type) {
    case INDEX_ALL_ZONES:
      return Immutable.merge(state, {
        zones: action.payload.page, 
        total_pages: action.payload.total_pages,
        total_count: action.payload.total_count
      })
    case PRE_CREATE_ZONE:
      return Immutable.merge(state, {
        newZone: action.payload
      })
    case CREATE_ZONE:
      return Immutable.merge(state, {
        newZone: {},
        creationSuccess: true
      })
    case SHOW_ZONE:
      return Immutable.merge(state, {
        zone: action.payload
      })
    case PRE_UPDATE_ZONE:
      return Immutable.merge(state, {
        zone: action.payload
      })
    case UPDATE_ZONE:
      return Immutable.merge(state, {
        zone: action.payload
      })
    case DELETE_ZONE:
      return Immutable.merge(state, {
        zone: {},
        deleteSuccess: true
      })
    default:
      return state
  }
}