//this is the access point for all things database related!

const { db, adminDb } = require('./db');

const User = require('./models/User');
const Article = require('./models/Article');

//associations could go here!

module.exports = {
  db,
  adminDb,
  models: {
    User,
    Article,
  },
};
