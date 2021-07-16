import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import AllArticles from "./components/AllArticles";
import SingleArticle from "./components/SingleArticle";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import UserHome from "./components/UserHome";
import { me } from "./store/auth";

class Routes extends Component {
  async componentDidMount() {
    await this.props.authorize();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={UserHome} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </Switch>
        )}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/articles" component={AllArticles} />
          <Route
            exact
            path="/articles/view-article"
            component={SingleArticle}
          />
        </Switch>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.uid,
  };
};

const mapDispatch = (dispatch) => ({
  authorize: () => dispatch(me()),
});
export default withRouter(connect(mapState, mapDispatch)(Routes));
