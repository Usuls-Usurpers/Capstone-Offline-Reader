import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, me } from "../store/auth";

class Navbar extends Component {
  render() {
    return (
      <nav>
        {this.props.isLoggedIn ? (
          <div>
            <Link to="/home">home</Link>
            <Link to="/articles">articles</Link>
            <Link to="/login" onClick={this.props.handleClick} id="logout">
              logout
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/home">home</Link>
            <Link to="/login">login</Link>
            <Link to="/signup">signup</Link>
          </div>
        )}
      </nav>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.uid,
  };
};

const mapDispatch = (dispatch) => ({
  handleClick() {
    dispatch(logout());
  },
});

export default connect(mapState, mapDispatch)(Navbar);
