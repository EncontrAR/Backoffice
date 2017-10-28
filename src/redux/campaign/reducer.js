import Immutable from 'seamless-immutable'
import { 
  INDEX_ALL_CAMPAIGNS,
  PRE_CREATE_CAMPAIGN,
  CREATE_CAMPAIGN,
  SHOW_CAMPAIGN,
  PRE_UPDATE_CAMPAIGN,
  UPDATE_CAMPAIGN,
  DELETE_CAMPAIGN,
  SEARCH_MISSING_PEOPLE,
  CLEAR
} from './actions';

const emptyCampaign = {
  title: '',
  description: '',
  status: 'activated',
  missing_person: {
    name: '',
    lastname: '',
    photo: ''
  }
}

const emptyNewCampaign = {
  expire_date: new Date('2018-01-15')
}

const initState = Immutable({
  campaigns: '',
  total_pages: '',
  total_count: '',
  campaign: emptyCampaign,
  new_campaign: emptyNewCampaign,
  creationSuccess: false,
  deleteSuccess: false,
  available_persons: []
});

export default function campaignReducer(state = initState, action) {
  switch (action.type) {
    case INDEX_ALL_CAMPAIGNS:
      return Immutable.merge(state, {
        campaigns: action.payload.page, 
        total_pages: action.payload.total_pages,
        total_count: action.payload.total_count
      })
    case PRE_CREATE_CAMPAIGN:
      return Immutable.merge(state, {
        new_campaign: action.payload
      })
    case CREATE_CAMPAIGN:
      return Immutable.merge(state, {
        creationSuccess: true
      })
    case CLEAR:
      return Immutable.merge(state, {
        new_campaign: emptyNewCampaign,
        campaign: emptyCampaign,
        creationSuccess: false,
        deleteSuccess: false,
        available_persons: []
      })
    case SHOW_CAMPAIGN:
      return Immutable.merge(state, {
        campaign: action.payload
      })
    case PRE_UPDATE_CAMPAIGN:
      return Immutable.merge(state, {
        campaign: action.payload
      })
    case UPDATE_CAMPAIGN:
      return Immutable.merge(state, {
        campaign: action.payload
      })
    case DELETE_CAMPAIGN:
      return Immutable.merge(state, {
        deleteSuccess: true
      })
    case SEARCH_MISSING_PEOPLE:
      return Immutable.merge(state, {
        available_persons: action.payload
      })
    default:
      return state
  }
}
