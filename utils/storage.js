import { AsyncStorage } from 'react-native'

export const getJwt = async () => {
  try {
    let jwt = await AsyncStorage.getItem('jwt')
    return jwt
  } catch (err) {
    console.log(err)
  }
}

export const writeJwt = async (token) => {
  try {
    await AsyncStorage.setItem('jwt', token)
  } catch (err) {
    console.log('AsyncStorage error: ' + err.message)
  }
}


export const isTokenPresent = async () => {
  try {
    let jwt = await getJwt()
    return jwt === undefined
  } catch (err) {
    console.log(err)
  }
}

export const clearAllAsyncStorage = async () => {
  try {
    let clear = await AsyncStorage.clear()
    return clear
  } catch (err) {
    console.log(err)
  }
}
