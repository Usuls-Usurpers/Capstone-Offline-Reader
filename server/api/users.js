const express = require('express');
const { addUser, getAllUsers } = require('../firestore/users');

const router = express.Router();

router.post('/user', addUser);
router.get('/users', getAllUsers);

module.exports = {
  routes: router,
};
