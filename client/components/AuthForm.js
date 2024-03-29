import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store/auth'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const login = displayName === "Login"
  return (
    <div>
    {login ? (
     <div>
      <form onSubmit={handleSubmit} name={name}>
        <div id= "#formId">
           {/* <label htmlFor="email">
            <small>email</small>
           </label> */}
          <input name="email" type="text" placeholder="email"/>
        </div>
        <div id= "#formId">
          {/* <label htmlFor="password">
            <small>password</small>
          </label> */}
          <input name="password" type="password" placeholder="password"/>
        </div>
        <div id= "#formId">
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
    ): (
      <div>
      <form onSubmit={handleSubmit} name={name}>
        <div id= "#formId">
          {/* <label htmlFor="firstName">
            <small>first name</small>
          </label> */}
          <input name="firstName" type="firstName" placeholder="first name"/>
        </div>
        <div id= "#formId">
          {/* <label htmlFor="lastName">
            <small>last name</small>
          </label> */}
          <input name="lastName" type="lastName" placeholder="last name"/>
        </div>
        <div id= "#formId">
          {/* <label htmlFor="email">
            <small>email</small>
          </label> */}
          <input name="email" type="text" placeholder="email"/>
        </div>
        <div id= "#formId">
          {/* <label htmlFor="password">
            <small>password</small>
          </label> */}
          <input name="password" type="password" placeholder="password"/>
        </div>
        <div id= "#formId">
          <button type="submit">{displayName}</button>
        </div>
        <div id="formId">
        {error && error.response && <div> {error.response.data} </div>}
        </div>
      </form>
    </div>
    )}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapLoginDispatch = (dispatch, { history }) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(authenticate([email, password, formName], history))
    }
  }
}

const mapSignupDispatch = (dispatch, { history }) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(authenticate([email, password, formName, firstName, lastName], history))
    }
  }
}

export const Login = connect(mapLogin, mapLoginDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapSignupDispatch)(AuthForm)
