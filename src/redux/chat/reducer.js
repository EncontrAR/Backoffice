import Immutable from 'seamless-immutable'
import { 
  INDEX_ALL_CONVERSATIONS,
} from './actions';

const initState = Immutable({
  conversations: [],
  total_pages: '',
  total_count: ''
});

export default function conversationReducer(state = initState, action) {
  switch (action.type) {
    case INDEX_ALL_CONVERSATIONS:
      return Immutable.merge(state, {
        conversations: action.payload.page,
        total_pages: action.payload.total_pages,
        total_count: action.payload.total_count
      })
    default:
      return state
  }
}