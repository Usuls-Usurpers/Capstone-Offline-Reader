const firebase = require('../db/db');
// const firebase = require("firebase")
const express = require("express");
const router = express.Router();
const db = firebase.firestore();

let auth = firebase.auth()
module.exports = router;

router.get('/me', async (req, res, next) => {
  try {
    // console.log('req in me route>>>', req)
    let currentUser;
    await auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log('user>>>>', user)
        currentUser = user
        // console.log('currentUser>>>', currentUser)
      }
    })
    res.json(currentUser)
  } catch (err) {
    next(err)
  }
})

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
    const { email, password, firstName, lastName } = req.body
    const userCred = await auth.createUserWithEmailAndPassword(email, password)
    const user = userCred.user
    await db.collection('users').doc(user.uid).set({
        email, firstName, lastName
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