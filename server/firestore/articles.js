'use strict';

const firebase = require('../db/db');
const Article = require('../db/models/Article');
const db = firebase.firestore();
const scraperObj = require('../puppeteer');

const getAllArticles = async (req, res, next) => {
  try {
    const userId = req.query.uid;
    const articles = await db
      .collection('users')
      .doc(`${userId}`)
      .collection('Articles');
    const data = await articles.get();
    const articlesArray = [];
    if (data.empty) {
      res.status(404).send('No articles found');
    } else {
      data.forEach((doc) => {
        const article = new Article(
          doc.id,
          doc.data().article,
          doc.data().url,
          doc.data().title,
          doc.data().addedAt,
          doc.data().isComplete,
          doc.data().cssSheet
        );
        articlesArray.push(article);
      });
      res.send(articlesArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getSingleArticle = async (req, res, next) => {
  try {
    const id = req.params.articleId;
    console.log('ID: ', id);
    console.log('req.params: ', req.params);
    const article = await db
      .collection('users')
      .doc('KmRkLorXqpRLug4pbK1Fs8g15fx1')
      .collection('Articles')
      .doc(id);
    const data = await article.get();
    if (!data.exists) {
      res.status(404).send('Article not found');
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addArticle = async (req, res, next) => {
  try {
    const { url, userId } = req.body;
    let resource;
    if (url.includes('medium')) {
      resource = scraperObj.medium;
    } else if (url.includes('nytimes')) {
      resource = scraperObj.nytimes;
    } else if (url.includes('wikipedia')) {
      resource = scraperObj.wikipedia;
    }
    const data = await resource(url);
    await db
      .collection('users')
      .doc(`${userId}`)
      .collection('Articles')
      .doc()
      .set(data);
    res.send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const { userId, articleId } = req.body;
    const deletedArticle = await db
      .collection('users')
      .doc(userId)
      .collection('Articles')
      .doc(articleId);
    const data = await deletedArticle.get();
    await db
      .collection('users')
      .doc(userId)
      .collection('Articles')
      .doc(articleId)
      .delete();
    res.json(data.data());
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addArticle,
  getAllArticles,
  getSingleArticle,
  deleteArticle,
};
