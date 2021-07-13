import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import userReducer from "./users";
import articlesReducer from "./articles";
import singleArticleReducer from "./singleArticle";
import authReducer from "./auth";

const reducer = combineReducers({
  users: userReducer,
  articles: articlesReducer,
  article: singleArticleReducer,
  auth: authReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
