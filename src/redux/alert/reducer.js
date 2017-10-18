import Immutable from 'seamless-immutable'
import { 
  INDEX_ALERTS_FOR_CAMPAIGN,
  PRE_CREATE_ALERT,
  CREATE_ALERT,
  CLEAR,
  SHOW_ALERT,
  PRE_UPDATE_ALERT,
  UPDATE_ALERT,
  DELETE_ALERT,
  SEARCH_ZONE
} from './actions';

const emptyAlert = {
  "id": '',
  "title": '',
  "notifications_sent": null,
  "expire_date": null,
  "created_at": '',
  "status": '',
  "zone": {
      "id": '',
      "label": ''
  }
}

const initState = Immutable({
  alerts: [],
  total_pages: '',
  total_count: '',
  alert: emptyAlert,         
  new_alert: {},
  creationSuccess: false,
  deleteSuccess: false,
  zones: []
});

export default function alertReducer(state = initState, action) {
  switch (action.type) {
    case INDEX_ALERTS_FOR_CAMPAIGN:
      return Immutable.merge(state, {
        alerts: action.payload.page, 
        total_pages: action.payload.total_pages,
        total_count: action.payload.total_count
      })
    case PRE_CREATE_ALERT:
      return Immutable.merge(state, {
        new_alert: action.payload
      })
    case CREATE_ALERT:
      return Immutable.merge(state, {
        creationSuccess: true
      })
    case CLEAR:
      return Immutable.merge(state, {
        new_alert: {},
        zones: [],
        creationSuccess: false,
        deleteSuccess: false
      })
    case SHOW_ALERT:
      return Immutable.merge(state, {
        alert: action.payload
      })
    case PRE_UPDATE_ALERT:
      return Immutable.merge(state, {
        alert: action.payload
      })
    case UPDATE_ALERT:
      return Immutable.merge(state, {
        alert: action.payload
      })
    case DELETE_ALERT:
      return Immutable.merge(state, {
        alert: emptyAlert,
        deleteSuccess: true
      })
    case SEARCH_ZONE:
      return Immutable.merge(state, {
        zones: action.payload
      })
    default:
      return state
  }
}