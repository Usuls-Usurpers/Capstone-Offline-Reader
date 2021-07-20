import React, { Component } from "react";
import { connect } from "react-redux";
import URLForm from "./URLForm";

class UserHome extends Component {
  render() {
    const { name } = this.props;
    console.log('props in userhome>>>', this.props)
    return (
      <div id="welcome">
        <div>
          <h3>Welcome, {name}!</h3>
          <URLForm history={this.props.history} />
        </div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.uid,
    name: state.auth.name,
  };
};

export default connect(mapState)(UserHome);
