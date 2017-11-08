import Immutable from 'seamless-immutable'
import { 
  LOAD_CONTACTS,
  CLEAR
} from './actions';

const initState = Immutable({
  conversations: [],
  total_pages: '',
  total_count: ''
});

export default function campaignConversationReducer(state = initState, action) {
  switch (action.type) {
    case LOAD_CONTACTS:
      return Immutable.merge(state, {
        conversations: action.payload.page, 
        total_pages: action.payload.total_pages,
        total_count: action.payload.total_count
      })
    case CLEAR:
      return initState
    default:
      return state
  }
}