import {
  PICTURE_TOOK,
  PICTURE_SENT,
  PICTURE_FORM_UPDATE,
  PICTURE_GET_NEAR_STORES
} from './types'
import { Actions } from 'react-native-router-flux'
import { Alert } from 'react-native'
import Axios from 'axios'
import Config from 'react-native-config'

export const pictureTook = (path) => {
  return (dispatch) => {
    dispatch({type: PICTURE_TOOK, payload: {path}})
    Actions.pictureForm()
  }
}

export const pictureUpdate = (prop, value) => {
  return {
    type: PICTURE_FORM_UPDATE,
    payload: {prop, value}
  }
}

export const getNearStores = (token) => {
  return (dispatch) => {
    const config = {headers: {'Authorization': 'Bearer ' + token}}
    Axios.get(
      `${Config.API_URL}/store/findByLocation?lat=49.215375&lng=-0.367362`,
      config).then((resp) => {
      dispatch({type: PICTURE_GET_NEAR_STORES, payload: resp.data})
      dispatch({
        type: PICTURE_FORM_UPDATE,
        payload: {prop: 'selectedStore', value: resp.data[0]._id}
      })
    }).catch((err) => {
      console.log(err)
    })
  }
}

export const sendPicture = (
  {name, selectedStore, promotion, path, token, lat, lng, storeName}, isNewStore) => {
  return (dispatch) => {
    const config = {headers: {'Authorization': 'Bearer ' + token}}
    if (isNewStore) {
      Axios.post(`${Config.API_URL}/store`, {name: storeName, lat, lng}, config).
        then((resp) => {
          uploadRequest(name, resp.data._id, promotion, path, config, dispatch) // replace selectedStore by the new id store
        })
    } else {
       uploadRequest(name, selectedStore, promotion, path, config, dispatch)
    }
  }
}

const uploadRequest = (name, selectedStore, promotion, path, config, dispatch) => {
    const data = new FormData()
    data.append('picture',
      {uri: path, type: 'image/jpeg', name: 'photo.jpg'})
    data.append('store', selectedStore)
    data.append('name', name)
    data.append('promotion', promotion)
    Axios.post(`${Config.API_URL}/product/uploadPicture`, data, config).
      then((resp) => {
        Alert.alert('Confirmation', 'Votre photo à été envoyé.', [
          {text: 'Ok', onPress: () => Actions.main()}
        ])
        dispatch({type: PICTURE_SENT})
      }).
      catch((err) => {
        Alert.alert('Erreur', 'Une erreur s\'est produite.', [
          {text: 'Ok', onPress: () => Actions.main()}
        ])
      })
}