import axios from 'axios'
import history from '../history'
/**
 * ACTION TYPES
 */


const SET_AUTH = 'SET_AUTH'

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})

/**
 * THUNK CREATORS
 */

export const me = () => async dispatch => {
  try {
    const accessToken = window.localStorage.getItem("ACCESSTOKEN")
    const expTime = window.localStorage.getItem("EXPTIME")
    const refreshToken = window.localStorage.getItem("REFRESHTOKEN")
    console.log('in me thunk>>>', accessToken, expTime, refreshToken)
    if (parsedInt(expTime) < Date.now()) {
      const res = await axios.get('/auth/me', {
        headers: {
          authorization: accessToken
        }
      })
      return dispatch(setAuth(res.data))
    }
    else {
      const res = await axios.get('/auth/me', {
        headers: {
          authorization: refreshToken
        }
      })
      return dispatch(setAuth(res.data))
    }
  } catch (err) {
    next(err)
  }
}

export const authenticate = (infoObj, history) => async dispatch => {
  try {
    const [ email, password, method, firstName, lastName ] = infoObj
    const res = await axios.post(`/auth/${method}`, {email, password, firstName, lastName})
    // console.log('res.data in authenticate thunk>>>', res.data)
    // console.log('accesstoken in authenticate thunk>>>', res.data.stsTokenManager.accessToken)
    const { stsTokenManager } = res.data
    console.log('stsTokenManager stringified', JSON.stringify(stsTokenManager.accessToken))
    window.localStorage.setItem("ACCESSTOKEN", JSON.stringify(stsTokenManager.accessToken))
    window.localStorage.setItem("EXPTIME", JSON.stringify(stsTokenManager.expirationTime))
    window.localStorage.setItem("REFRESHTOKEN", JSON.stringify(stsTokenManager.refreshToken))
    dispatch(me())
    history.push('/home')
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => async dispatch => {
  try {
    const res = await axios.get('/auth/logout')
    dispatch({type: SET_AUTH, auth: {}})
    console.log('history in logout>>', history)
    history.push('/login')
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}
