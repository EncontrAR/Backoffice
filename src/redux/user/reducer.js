import Immutable from 'seamless-immutable'
import { 
  INDEX_ALL_USERS,
  CREATE_USER,
  CREATE_USER_ERROR,
  SHOW_USER,
  CLEAR,
  CLEAR_MSG
} from './actions';

const initState = Immutable({
  users: '',
  total_pages: '',
  total_count: '',
  user: {},
  creationSuccess: false,
  creationFailure: false
});

export default function userReducer(state = Immutable(initState), action) {
  switch (action.type) {
  	case INDEX_ALL_USERS:
      return Immutable.merge(state, {
        users: action.payload.page, 
        total_pages: action.payload.total_pages,
        total_count: action.payload.total_count
      })
  	case CREATE_USER:
      return Immutable.merge(state, {
			  creationSuccess: true,
			  creationFailure: false
      })
  	case CREATE_USER_ERROR:
      return Immutable.merge(state, {
			  creationSuccess: false,
			  creationFailure: true
      })
  	case SHOW_USER:
      return Immutable.merge(state, {
      	user: action.payload
      })
  	case CLEAR:
      return Immutable.merge(state, {
			  user: {},
			  creationSuccess: false,
			  creationFailure: false
      })
  	case CLEAR_MSG:
      return Immutable.merge(state, {
			  creationSuccess: false,
			  creationFailure: false
      })
    default:
      return state
  }
}