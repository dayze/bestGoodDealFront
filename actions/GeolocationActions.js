import { GEOLOCATION_POSITION } from './types'
import { Actions } from 'react-native-router-flux'
import Config from 'react-native-config'
import { PermissionsAndroid, Platform } from 'react-native'
import axios from 'axios'

export const setPosition = () => {
  return (dispatch) => {
    if (Platform.OS === 'android') {
      dispatch({
          type: GEOLOCATION_POSITION,
          payload: {
            latitude: 49.215375,
            longitude: -0.367362
          }
        }
      )
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
          dispatch({
              type: GEOLOCATION_POSITION,
              payload: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }
            }
          )
        }, (error) => {
          console.log(error)
          dispatch({
            type: GEOLOCATION_POSITION,
            payload: {error: error.message}
          })
        },
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 0})
    }
  }
}

const promptLocationPermissionAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Cool Photo App Camera Permission',
        'message': 'Cool Photo App needs access to your camera ' +
        'so you can take awesome pictures.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera')
    } else {
      console.log('Camera permission denied')
    }
  } catch (err) {
    console.warn(err)
  }
}