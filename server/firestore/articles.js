'use strict';

const firebase = require('../db/db');
const Article = require('../db/models/Article');
const db = firebase.firestore();
const scraperObj = require('../puppeteer');

const getAllArticles = async (req, res, next) => {
  try {
    const articles = await db
      .collection('users')
      .doc('t2D8ahpahoxhxE8xvOG4')
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
          doc.data().isComplete
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
    // const id = req.params.id;
    const article = await db
      .collection('users')
      .doc('t2D8ahpahoxhxE8xvOG4')
      .collection('Articles')
      .doc('c5HnOtaD45D8RmipTh9e');
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
    const url =
      'https://medium.com/creatures/3-things-you-probably-didnt-know-about-cats-cb643c57b382';
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
      .doc('t2D8ahpahoxhxE8xvOG4')
      .collection('Articles')
      .doc()
      .set(data);
    res.send('Record saved successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    // const id = req.params.id;
    await db
      .collection('users')
      .doc('t2D8ahpahoxhxE8xvOG4')
      .collection('Articles')
      .doc('U3mDGvfOyjiyqccyzzqa')
      .delete();
    res.send('Record deleted successfuly');
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
