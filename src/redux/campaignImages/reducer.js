import Immutable from 'seamless-immutable'
import { 
  INDEX_IMAGES,
  ADD_IMAGE,
  ADD_IMAGE_ERROR,
  DELETE_IMAGE,
  DELETE_IMAGE_ERROR,
  CLEAR,
  CLEAR_MSG
} from './actions';

const initState = Immutable({
  images: [],
  addImageSuccess: false,
  addImageFailure: false,
  removeImageSuccess: false,
  removeImageFailure: false
});

export default function campaignReducer(state = initState, action) {
  switch (action.type) {
    case INDEX_IMAGES:
      return Immutable.merge(state, {
        images: action.payload
      })
    case ADD_IMAGE:
      let newImages = Immutable(state.images).concat(action.payload)

      return Immutable.merge(state, {
        images: newImages,
        addImageSuccess: true,
        addImageFailure: false
      })
    case ADD_IMAGE_ERROR:
      return Immutable.merge(state, {
        addImageSuccess: false,
        addImageFailure: true
      })
    case DELETE_IMAGE:
      let images = Immutable.flatMap(state.images, function(value) {
        return value.id === action.payload.id ? [] : value
      })

      return Immutable.merge(state, {
        images: images,
        removeImageSuccess: true,
        removeImageFailure: false
      })
    case DELETE_IMAGE_ERROR:
      return Immutable.merge(state, {
        removeImageSuccess: false,
        removeImageFailure: true
      })
    case CLEAR_MSG:
      return Immutable.merge(state, {
        addImageSuccess: false,
        addImageFailure: false,
        removeImageSuccess: false,
        removeImageFailure: false
      })
    case CLEAR:
      return initState
    default:
      return state
  }
}