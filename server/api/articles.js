const express = require('express');
const { addArticle, getAllArticles } = require('../firestore/articles');

const router = express.Router();

router.post('/article', addArticle);
router.get('/articles', getAllArticles);

module.exports = {
  routes: router,
};
