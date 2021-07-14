import React, { Component } from "react";
import { connect } from "react-redux";
import URLForm from "./URLForm";

const name = (username) => {
  let email = username.split("@")[0];
  let firstLetter = username[0].toUpperCase();
  return firstLetter.concat(email.slice(1));
};

class Home extends Component {
  render() {
    const { username } = this.props;
    return (
      <div id="welcome">
        {this.props.isLoggedIn ? (
          <div>
            <h3>Welcome, {name(username)}!</h3>
            <URLForm />
          </div>
        ) : (
          <h3>Welcome to Cache-22!</h3>
        )}
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    username: state.auth.email,
    isLoggedIn: !!state.auth.uid,
  };
};

export default connect(mapState)(Home);
