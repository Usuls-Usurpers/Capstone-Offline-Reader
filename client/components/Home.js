import React, { Component } from 'react';
import { connect } from 'react-redux';
import URLForm from './URLForm';

/**
 * COMPONENT
 */
class Home extends Component {
  render() {
    const { username } = this.props;
    return (
      <div>
        {this.props.isLoggedIn ? (
          <div>
            <h3>Welcome, {username}</h3>
            <URLForm history={this.props.history} />
          </div>
        ) : (
          <h3>Welcome to Cache-22</h3>
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
