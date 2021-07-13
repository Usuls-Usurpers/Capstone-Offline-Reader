const express = require("express");
const {
  getAllArticles,
  getSingleArticle,
  addArticle,
  deleteArticle,
} = require("../firestore/articles");

const router = express.Router();

router.get("/articles", getAllArticles);
router.get("/articles/:articleId", getSingleArticle);
router.post("/article", addArticle);
router.delete("/article", deleteArticle);

module.exports = {
  routes: router,
};
