import axios from "axios";

//ACTION TYPE
const SET_SINGLE_ARTICLE = "SET_SINGLE_ARTICLE";

//ACTION CREATORS
export const setArticle = (article) => ({
  type: SET_SINGLE_ARTICLE,
  article,
});

// SINGLE ARTICLE SUB_REDUCER
export default function singleArticleReducer(article = {}, action) {
  switch (action.type) {
    case SET_SINGLE_ARTICLE:
      return action.article;
    default:
      return article;
  }
}
