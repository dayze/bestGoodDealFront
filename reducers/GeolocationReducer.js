import {GEOLOCATION_POSITION} from './../actions/types'

const INITIAL_STATE = {latitude: null, longitude: null, error: null}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GEOLOCATION_POSITION:
      const {longitude, latitude, error} = action.payload
      return {...state, latitude, longitude, error}
    default:
      return state
  }
}