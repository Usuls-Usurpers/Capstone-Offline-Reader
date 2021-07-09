import React, { Component, Fragment } from "react";
//import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AllUsers from "./components/AllUsers";

class Routes extends Component {
  render() {
    // const {isLoggedIn} = this.props
    return (
      <div>
        <Switch>
          <Route path="/users" component={AllUsers} />
        </Switch>
      </div>
    );
  }
}
export default Routes;
