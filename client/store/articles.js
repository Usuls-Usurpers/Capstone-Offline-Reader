import axios from "axios";

//ACTION TYPES

const SET_ARTICLES = "SET_ARTICLES";
const ADD_ARTICLE = "ADD_ARTICLE";

//ACTION CREATORS

export const setArticles = (articles) => {
  return {
    type: SET_ARTICLES,
    articles,
  };
};

export const addArticle = (article) => {
  console.log("article in creator", article);
  return {
    type: ADD_ARTICLE,
    article,
  };
};

//THUNK CREATORS

export const fetchArticles = (infoObj) => {
  return async (dispatch) => {
    try {
      const config = {
        params: {
          uid: infoObj,
        },
      };
      const { data } = await axios.get(`/api/articles/`, config);
      dispatch(setArticles(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addArticleByURL = (infoObj, history) => {
  return async (dispatch) => {
    try {
      const userId = infoObj[0];
      const url =
        "https://netflixtechblog.medium.com/elasticsearch-indexing-strategy-in-asset-management-platform-amp-99332231e541";
      console.log("url in thunk", url);
      const { data } = await axios.post(`/api/article`, { userId, url });
      console.log("data", data);
      dispatch(addArticle(data));
    } catch (error) {
      console.error(error);
    }
  };
};

// SUB_REDUCER
export default function articlesReducer(articles = [], action) {
  switch (action.type) {
    case SET_ARTICLES:
      return action.articles;
    case ADD_ARTICLE:
      return [...articles, action.article];
    default:
      return articles;
  }
}
