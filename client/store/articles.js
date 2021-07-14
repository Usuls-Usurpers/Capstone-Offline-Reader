import axios from 'axios';

//ACTION TYPES

const SET_ARTICLES = 'SET_ARTICLES';
const ADD_ARTICLE = 'ADD_ARTICLE';
const DELETE_ARTICLE = 'DELETE_ARTICLE';

//ACTION CREATORS

export const setArticles = (articles) => {
  return {
    type: SET_ARTICLES,
    articles,
  };
};

export const addArticle = (article) => {
  return {
    type: ADD_ARTICLE,
    article,
  };
};

export const _deleteArticle = (article) => {
  console.log('article in action>>>', article);
  return {
    type: DELETE_ARTICLE,
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

export const addArticleByURL = (infoObj) => {
  return async (dispatch) => {
    try {
      const userId = infoObj[0];
      const url = infoObj[1];
      const { data } = await axios.post(`/api/article`, { userId, url });
      dispatch(addArticle(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteArticleThunk = (infoObj) => {
  return async (dispatch) => {
    try {
      const config = {
        data: {
          userId: infoObj[0],
          articleId: infoObj[1],
        },
      };
      const { data } = await axios.delete(`/api/article`, config);
      dispatch(_deleteArticle(data));
    } catch (error) {
      console.log('error deleting product', error);
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
    case DELETE_ARTICLE:
      // console.log('action>>>', action);
      // console.log('articles>>>', articles);
      const result = articles.filter(
        (article) => article.id !== action.article.id
      );
      // console.log('result>>>>', result);
      return result;
    default:
      return articles;
  }
}
