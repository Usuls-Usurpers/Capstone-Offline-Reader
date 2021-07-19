const firebase = require('../db/db');
// const firebase = require("firebase")
const express = require("express");
const router = express.Router();
const db = firebase.firestore();

let auth = firebase.auth()
module.exports = router;

router.get('/me', async (req, res, next) => {
  try {
    let token = req.headers.authorization
    // let currentUser;
    // await auth.verifyIdToken(token)
    // await auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     currentUser = user
    //   }
    // })
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
    const userId = user.uid
    let result = await db
      .collection('users')
      .doc(`${userId}`)
    result = await result.get()
    const {firstName, lastName} = result.data()
    const display = `${firstName} ${lastName}`
    await user.updateProfile({
      displayName: display
    })
    res.send(user);
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body
    const display = `${firstName} ${lastName}`
    const userCred = await auth.createUserWithEmailAndPassword(email, password)
    const newUser = userCred.user
    console.log('newuser obj sent back>>>>', newUser)
    await newUser.updateProfile({
      displayName: display
    })
    await db.collection('users').doc(newUser.uid).set({
        email, firstName, lastName
    });
    res.send(newUser)
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