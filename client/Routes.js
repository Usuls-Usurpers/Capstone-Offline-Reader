import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import AllArticles from "./components/AllArticles";
import SingleArticle from "./components/SingleArticle";
import AllUsers from "./components/AllUsers";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from './store/auth';

class Routes extends Component {
  async componentDidMount() {
    await this.props.authorize()
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/users" component={AllUsers} />
          <Route exact path="/articles" component={AllArticles} />
          <Route exact path="/articles/view-article" component={SingleArticle} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.uid
  }
}

const mapDispatch = dispatch => ({
  authorize: () => dispatch(me())
})
export default withRouter(connect(mapState, mapDispatch)(Routes))
