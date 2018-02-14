import { GET_LAST_PRODUCTS_FROM_SUB, NEAR_PRODUCTS } from './../actions/types'

const INITIAL_STATE = {
  nearProducts: [],
  subscriptionsProducts: []
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LAST_PRODUCTS_FROM_SUB:
      return {...state, subscriptionsProducts: action.payload}
    case NEAR_PRODUCTS:
      return {...state, nearProducts: action.payload}
    default:
      return state
  }
}