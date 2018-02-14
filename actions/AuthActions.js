import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER
} from './types'
import { Actions } from 'react-native-router-flux'
import Config from 'react-native-config'
import axios from 'axios'
import { writeJwt } from './../utils'

// FORM FUNCTIONS
export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

// LOGIC FUNCTIONS
export const loginUser = ({email, password}) => {
  return (dispatch) => {
    dispatch({type: LOGIN_USER})
    axios.post(`${Config.API_URL}/auth/login`, {email, password}).
      then((resp) => {
        loginSuccess(dispatch, resp.data)
      }).
      catch((err) => {
        // new request,trying to create an account
        if (err.response.status === 422) {
          axios.post(`${Config.API_URL}/users`, {email, password}).
            then((resp) => {
              loginSuccess(resp.data)
            }).
            catch((err) => {
              if (err.response.status === 422) {
                alert(err.response.data.msg)
              } else {
                alert('Un problème est survenu')
              }
              loginFailed(dispatch)
            })
        } else {
          alert('Un problème est survenu')
          loginFailed(dispatch)
        }
      })
  }
}

export const fillToken = () => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: {email: 'test@gmail.com', token: '1234'}
    })
  }
}

// HELPER FUNCTIONS
const loginFailed = (dispatch) => {dispatch({type: LOGIN_USER_FAILED})}
const loginSuccess = (dispatch, {email, token}) => {
  writeJwt(token).then(() => {
    dispatch({
      type: LOGIN_USER_SUCCESS, payload: {email, token}
    })
    Actions.main() // call main router
  }).catch((err) => {
    console.log(err)
  })
}


