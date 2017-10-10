import Immutable from 'seamless-immutable'
import { 
  INDEX_ALL_FINDERS,
  SHOW_FINDER
} from './actions';

const initState = Immutable({
  finders: '',
  total_pages: '',
  total_count: '',
  finder: {}
});

export default function finderReducer(state = Immutable(initState), action) {
  switch (action.type) {
    case INDEX_ALL_FINDERS:
      return Immutable.merge(state, {
        finders: action.payload.page, 
        total_pages: action.payload.total_pages,
        total_count: action.payload.total_count
      })
    case SHOW_FINDER:
      return Immutable.merge(state, {
        finder: action.payload
      })
    default:
      return state
  }
}