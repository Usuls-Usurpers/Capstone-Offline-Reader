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
    const res = await axios.get('/auth/me')
    // console.log('res>>>', res)
    dispatch(setAuth(res.data))
  } catch (err) {
    next(err)
  }
}

export const authenticate = (infoObj, history) => async dispatch => {
  try {
    const [ email, password, method, firstName, lastName ] = infoObj
    const res = await axios.post(`/auth/${method}`, {email, password, firstName, lastName})
    dispatch(setAuth(res.data))
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
