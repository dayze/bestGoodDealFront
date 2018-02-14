import {
  PICTURE_FORM_UPDATE,
  PICTURE_SENT,
  PICTURE_TOOK,
  PICTURE_GET_NEAR_STORES
} from '../actions/types'

const INITIAL_STATE = {
  path: '',
  isTook: false,
  stores: [],
  name: '',
  promotion: '',
  selectedStore: '',
  storeName: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PICTURE_TOOK:
      return {...state, path: action.payload.path, isTook: true}
    case PICTURE_SENT:
      return {...state, INITIAL_STATE}
    case PICTURE_FORM_UPDATE:
      return {...state, [action.payload.prop]: action.payload.value}
    case PICTURE_GET_NEAR_STORES:
      return {...state,  stores: action.payload}
    default:
      return state
  }
}