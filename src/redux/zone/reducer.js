import Immutable from 'seamless-immutable'
import { 
  INDEX_ALL_ZONES, PRE_CREATE_ZONE, CREATE_ZONE, 
  SHOW_ZONE, PRE_UPDATE_ZONE, UPDATE_ZONE,
  DELETE_ZONE, CLEAR, CREATE_ZONE_ERROR, RESET_CREATE_MSG,
  UPDATE_ZONE_ERROR, RESET_EDIT_MSG
} from './actions';

const initState = Immutable({
  zones: '',
  total_pages: '',
  total_count: '',
  zone: {},
  newZone: {},
  creationSuccess: false,
  creationFailure: false,
  updateSuccess: false,
  updateFailure: false,
  deleteSuccess: false,
  deleteFailure: false
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
        creationSuccess: true,
        creationFailure: false
      })
    case CREATE_ZONE_ERROR:
      return Immutable.merge(state, {
        creationSuccess: false,
        creationFailure: true
      })
    case RESET_CREATE_MSG:
      return Immutable.merge(state, {
        creationSuccess: false,
        creationFailure: false
      })
    case CLEAR:
      return Immutable.merge(state, {
        zone: {},
        newZone: {},
        creationSuccess: false,
        creationFailure: false,
        updateSuccess: false,
        updateFailure: false,
        deleteSuccess: false,
        deleteFailure: false
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
        zone: action.payload,
        updateSuccess: true,
        updateFailure: false
      })
    case UPDATE_ZONE_ERROR:
      return Immutable.merge(state, {
        updateSuccess: false,
        updateFailure: true
      })
    case RESET_EDIT_MSG:
      return Immutable.merge(state, {
        updateSuccess: false,
        updateFailure: false,
        deleteSuccess: false,
        deleteFailure: false
      })
    case DELETE_ZONE:
      return Immutable.merge(state, {
        deleteSuccess: true,
        deleteFailure: false
      })
    default:
      return state
  }
}