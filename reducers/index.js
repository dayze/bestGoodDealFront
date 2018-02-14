import
{combineReducers} from 'redux'
import AuthRedcuer from './AuthReducer'
import GeolocationReducer from './GeolocationReducer'
import PictureReducer from './PictureReducer'
import ProductReducer from './ProductReducer'

export default combineReducers({
  auth: AuthRedcuer,
  geolocation: GeolocationReducer,
  picture: PictureReducer,
  product: ProductReducer
})