import React, { Component, Fragment } from "react";
//import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import AllArticles from "./components/AllArticles";
import AllUsers from "./components/AllUsers";
import {Login, Signup} from './components/AuthForm'
import Home from './components/Home'


class Routes extends Component {
  render() {
    // const {isLoggedIn} = this.props
    return (
      <div>
        <Switch>
          <Route exact path="/">
              <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/users" component={AllUsers} />
          <Route path="/articles" component={AllArticles}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login" component={Login}/>
        </Switch>
      </div>
    );
  }
}
export default Routes;
