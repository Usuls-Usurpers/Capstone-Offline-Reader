import axios from "axios";

//ACTION TYPE
const SET_SINGLE_ARTICLE = "SET_SINGLE_ARTICLE";

//ACTION CREATORS
const setArticle = (article) => ({
  type: SET_SINGLE_ARTICLE,
  article,
});

//THUNK CREATOR
export const fetchSingleArticle = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/articles/${id}`);
      console.log("data", data);
      dispatch(setArticle(data));
    } catch (error) {
      console.error(error);
    }
  };
};

// SINGLE ARTICLE SUB_REDUCER
export default function singleArticleReducer(articles = {}, action) {
  switch (action.type) {
    case SET_SINGLE_ARTICLE:
      return action.article;
    default:
      return articles;
  }
}
