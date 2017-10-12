import Immutable from 'seamless-immutable'
import { 
  INDEX_ALERTS_FOR_CAMPAIGN,
  PRE_CREATE_ALERT,
  CREATE_ALERT,
  SHOW_ALERT,
  PRE_UPDATE_ALERT,
  UPDATE_ALERT,
  DELETE_ALERT
} from './actions';

const initState = Immutable({
  alerts: [],
  total_pages: '',
  total_count: '',
  alert: {
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
  },         
  new_alert: {},
  creationSuccess: false,
  deleteSuccess: false
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
        new_alert: action.payload,
        creationSuccess: true
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
        alert: {
          "id": '',
          "title": '',
          "notifications_sent": null,
          "expire_date": null,
          "created_at": '',
          "status": '',
          "zone": {
              "id": '',
              "name": ''
          }
        },
        deleteSuccess: true
      })
    default:
      return state
  }
}