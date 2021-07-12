import axios from "axios";

//ACTION TYPES

const SET_ARTICLES = "SET_ARTICLES";
const ADD_ACTICLE = "ADD_ACTICLE";

//ACTION CREATORS

export const setArticles = (articles) => {
  return {
    type: SET_ARTICLES,
    articles,
  };
};

export const addArticle = (article) => {
  return {
    type: ADD_ACTICLE,
    article,
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

export const addArticleByURL = (url) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/article", url);
      console.log("data", data);
      dispatch(addArticle(data));
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
    case ADD_ACTICLE:
      return [...articles, action.article];
    default:
      return articles;
  }
}
