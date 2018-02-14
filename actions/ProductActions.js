import { getJwt } from '../utils'
import Axios from 'axios'
import Config from 'react-native-config'
import { GET_LAST_PRODUCTS_FROM_SUB, NEAR_PRODUCTS } from './types'

export const getLastProductsFromSubscriber = () => {
  return (dispatch) => {
    getJwt().then((jwt) => {
      Axios.get(`${Config.API_URL}/product/lastProductsFromSubscriber`, {
        headers: {
          'Authorization': 'Bearer ' + jwt
        }
      }).then(({data}) => {
        dispatch({type: GET_LAST_PRODUCTS_FROM_SUB, payload: data})
      }).catch((err) => {

      })
    })
  }
}

export const getNearProducts = (lat, lng) => {
  return (dispatch) => {
    getJwt().then((jwt) => {
       Axios.get(`${Config.API_URL}/product/nearProducts?lat=${lat}&lng=${lng}`, {
        headers: {
          'Authorization': 'Bearer ' + jwt
        }
      }).then(({data}) => {
        console.log(data)
        dispatch({type: NEAR_PRODUCTS, payload: data})
      }).catch((err) => {

      })
    })
  }
}