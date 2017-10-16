import Immutable from 'seamless-immutable'
import { 
  INDEX_ALL_MISSING_PEOPLE, CREATE_MISSING_PERSON, 
  SHOW_MISSING_PERSON, UPDATE_MISSING_PERSON,
  DELETE_MISSING_PERSON, PRE_CREATE_MISSING_PERSON,
  PRE_UPDATE_MISSING_PERSON, CLEAR
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
      return Immutable.merge(state, {
        missing_people: action.payload.page, 
        total_pages: action.payload.total_pages,
        total_count: action.payload.total_count
      })
    case PRE_CREATE_MISSING_PERSON:
      return Immutable.merge(state, {
        new_missing_person: action.payload
      })
    case CREATE_MISSING_PERSON:
      return Immutable.merge(state, {
        new_missing_person: action.payload,
        creationSuccess: true
      })
    case CLEAR:
      return Immutable.merge(state, {
        missing_person: {},
        new_missing_person: {},
        creationSuccess: false,
        deleteSuccess: false
      })
    case SHOW_MISSING_PERSON:
      return Immutable.merge(state, {
        missing_person: action.payload
      })
    case PRE_UPDATE_MISSING_PERSON:
      return Immutable.merge(state, {
        missing_person: action.payload
      })
    case UPDATE_MISSING_PERSON:
      return Immutable.merge(state, {
        missing_person: state.missing_person
      })
    case DELETE_MISSING_PERSON:
      return Immutable.merge(state, {
        deleteSuccess: true
      })
    default:
      return state
  }
}