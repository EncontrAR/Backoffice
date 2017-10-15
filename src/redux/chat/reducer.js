import Immutable from 'seamless-immutable'
import { 
  INDEX_ALL_CONVERSATIONS,
} from './actions';

const initState = Immutable({
  conversations: []
});

export default function conversationReducer(state = initState, action) {
  switch (action.type) {
    case INDEX_ALL_CONVERSATIONS:
      return Immutable.merge(state, {
        conversations: action.payload.page
      })
    default:
      return state
  }
}