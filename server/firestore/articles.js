'use strict';

const firebase = require('../db/db');
const Article = require('../db/models/Article');
const firestore = firebase.firestore();

const addArticle = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore
      .collection('users')
      .doc('t7b10Inruw6r9Mdahorq')
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
    // console.log('req>>>>>>', req);
    const articles = await firestore
      .collection('users')
      .doc('t7b10Inruw6r9Mdahorq')
      .collection('Articles');
    const data = await articles.get();
    const articlesArray = [];
    if (data.empty) {
      res.status(404).send('No user found');
    } else {
      data.forEach((doc) => {
        const article = new Article(
          doc.id,
          doc.data().article,
          doc.data().firstArticle,
          // doc.data().url,
          doc.data().title,
          // doc.data().addedAt,
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
