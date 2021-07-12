const firebase = require('../db/db');
const express = require("express");
const router = express.Router();
const db = firebase.firestore();
// const User = require('../db/models/User');

const auth = firebase.auth()
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const userCred = await auth.signInWithEmailAndPassword(email, password)
    const user = userCred.user
    res.send(user);
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const userCred = await auth.createUserWithEmailAndPassword(email, password)
    const user = userCred.user
    await db.collection('users').doc(user.uid).set({
        email
    });
    res.send(user)
  } catch (err) {
      next(err)
  }
})

router.get('/logout', async (req, res, next) => {
  try {
    const user = await auth.signOut()
    res.send(user)
  } catch (err) {
      next(err)
  }
})