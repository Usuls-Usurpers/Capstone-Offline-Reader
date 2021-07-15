import React, { Component } from "react";
import { connect } from "react-redux";
import URLForm from "./URLForm";

// const name = (username) => {
//   let email = username.split("@")[0];
//   let firstLetter = username[0].toUpperCase();
//   return firstLetter.concat(email.slice(1));
// };

class Home extends Component {
  render() {
    const { name } = this.props;
    return (
      <div id="welcome">
        {this.props.isLoggedIn ? (
          <div>
            <h3>Welcome, {name}!</h3>
            <URLForm history={this.props.history} />
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
    // username: state.auth.email,
    isLoggedIn: !!state.auth.uid,
    name: state.auth.displayName
  };
};

export default connect(mapState)(Home);
