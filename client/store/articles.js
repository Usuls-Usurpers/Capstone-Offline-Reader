import axios from "axios";

//ACTION TYPES

const SET_ARTICLES = 'SET_ARTICLES';

//ACTION CREATORS

export const setArticles = (articles) => {
  return {
    type: SET_ARTICLES,
    articles,
  };
};

//THUNK CREATORS

export const fetchArticles = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/articles");
      console.log("data", data);
      dispatch(setArticles(data));
    } catch (error) {
      console.error(error);
    }
  };
};

// STUDENT SUB_REDUCER
export default function articlesReducer(articles = [], action) {
  switch (action.type) {
    case SET_ARTICLES:
      return action.articles;
    default:
      return articles;
  }
}
