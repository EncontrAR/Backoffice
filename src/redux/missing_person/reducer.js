import Immutable from 'seamless-immutable'
import { 
  INDEX_ALL_MISSING_PEOPLE, CREATE_MISSING_PERSON, 
  SHOW_MISSING_PERSON, UPDATE_MISSING_PERSON,
  DELETE_MISSING_PERSON, PRE_CREATE_MISSING_PERSON
} from './actions';

const initState = Immutable({
  missing_people: [],
  total_pages: 0,
  total_count: 0,
  missing_person: {},
  new_missing_person: {},
  creationSuccess: false,
  deleteSuccess: false
});

export default function missingPersonReducer(state = Immutable(initState), action) {
  switch (action.type) {
    case INDEX_ALL_MISSING_PEOPLE:
      return Immutable.merge(initState, {
        missing_people: action.payload.page, 
        total_pages: action.payload.total_pages,
        total_count: action.payload.total_count
      })
    case PRE_CREATE_MISSING_PERSON:
      return Immutable.merge(initState, {
        new_missing_person: action.payload
      })
    case CREATE_MISSING_PERSON:
      return Immutable.merge(initState, {
        newZone: action.payload,
        creationSuccess: true
      })
    case SHOW_MISSING_PERSON:
      return Immutable.merge(initState, {
        zone: action.payload
      })
    case UPDATE_MISSING_PERSON:
      return Immutable.merge(initState, {
        zone: action.payload
      })
    case DELETE_MISSING_PERSON:
      return Immutable.merge(initState, {
        zone: {},
        deleteSuccess: true
      })
    default:
      return state
  }
}