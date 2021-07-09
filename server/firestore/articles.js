'use strict';

const firebase = require('../db/db');
const Article = require('../db/models/Article');
const db = firebase.firestore();
const scraperObj = require('../puppeteer');

const addArticle = async (req, res, next) => {
  try {
    // console.log('scraperObj>>>', scraperObj);
    // console.log(
    //   'MEDIUM>>>',
    //   await scraperObj.medium(
    //     'https://medium.com/@wayweroll/how-to-create-an-animated-photo-for-medium-d5b2820e9c5'
    //   )
    // );
    // const data = req.body;
    // determine which scraper to use:
    const url = 'https://en.wikipedia.org/wiki/Tumbler_(glass)';
    let resource;
    if (url.includes('medium')) {
      resource = scraperObj.medium;
    } else if (url.includes('nytimes')) {
      resource = scraperObj.nytimes;
    } else if (url.includes('wikipedia')) {
      resource = scraperObj.wikipedia;
    }
    const data = await resource(url);
    // const data = await scraperObj.wikipedia(
    //   'https://en.wikipedia.org/wiki/Cat'
    // );
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

module.exports = {
  addArticle,
  getAllArticles,
};
