const express = require('express');
const {
  getAllArticles,
  addArticle,
  deleteArticle,
} = require('../firestore/articles');

const router = express.Router();

router.get('/articles', getAllArticles);
router.post('/article', addArticle);
router.delete('/article', deleteArticle);

module.exports = {
  routes: router,
};
