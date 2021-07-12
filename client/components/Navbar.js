import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/auth'
// import {Login, Signup} from './components/AuthForm'

class Navbar extends Component {
  render() {
  // console.log('props in navbar', this.props.handleClick)
  return (
    <div>
      <nav>
      {this.props.isLoggedIn ? (
      <div>
        <Link to="/users">users</Link>
        <Link to="/articles">articles</Link>
        <Link to="/login" onClick={this.props.handleClick} id="logout">
        logout
        </Link>
        </div>) :
        (<div>
        <Link to="/users">users</Link>
        <Link to="/articles">articles</Link>
        <Link to="/login">login</Link>
        <Link to="/signup">signup</Link>
        </div>)
      }
      </nav>
    </div>
  )}
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.user,
  };
};

const mapDispatch = (dispatch, { history }) => ({
  handleClick() {
    dispatch(logout(history));
  },
});

export default connect(mapState, mapDispatch)(Navbar);
