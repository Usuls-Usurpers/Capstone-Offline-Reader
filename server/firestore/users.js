'use strict';

const { db } = require('../db/db');
const User = require('../db/models/User');
// const db = firebase.firestore();

const addUser = async (req, res, next) => {
  try {
    const data = req.body;
    await db.collection('users').doc().set(data);
    res.send('Record saved successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await db.collection('users');
    const data = await users.get();
    const usersArray = [];
    if (data.empty) {
      res.status(404).send('No user found');
    } else {
      data.forEach((doc) => {
        const user = new User(
          doc.id,
          doc.data().email,
          doc.data().firstName,
          doc.data().lastName
        );
        usersArray.push(user);
      });
      res.send(usersArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addUser,
  getAllUsers,
};
