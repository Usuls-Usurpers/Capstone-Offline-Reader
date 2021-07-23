const { db, adminDb } = require('../db/db');
const admin = require('firebase-admin')
const firebase = require('firebase')
const express = require("express");
const router = express.Router();

const auth = admin.auth()
module.exports = router;

router.get('/me', async (req, res, next) => {
  try {
    let token = req.headers.authorization
    // console.log('parsedtoken in /me route>>>>', JSON.parse(token))
    // const idToken = await firebase.auth().currentUser.getIdToken()
    // console.log('idToken>>>>>', idToken)
    const decodedToken = await auth.verifyIdToken(JSON.parse(token))
    // console.log('decodedToken>>>>>', decodedToken)
    res.json(decodedToken)
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const userCred = await firebase.auth().signInWithEmailAndPassword(email, password)
    const user = userCred.user
    const userId = user.uid
    // const idToken = await firebase.auth().currentUser.getIdToken()
    // console.log('idToken>>>>>', idToken)
    let result = await db
      .collection('users')
      .doc(`${userId}`)
    result = await result.get()
    const {firstName, lastName} = result.data()
    const display = `${firstName} ${lastName}`
    await user.updateProfile({
      displayName: display
    })
    console.log('userobj>>>', user)
    res.send(user);
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body
    const display = `${firstName} ${lastName}`
    // const userCred = await auth.createUserWithEmailAndPassword(email, password)
    let newUser = await auth.createUser({
      email, 
      password,
      displayName: display
    })
    const { uid } = newUser
    const token = await auth.createCustomToken(uid)
    const userCred = await firebase.auth().signInWithCustomToken(token)
    const authenticatedUser = userCred.user
    // newUser.token = token
    // await newUser.updateProfile({
    //   displayName: display
    // })
    await db.collection('users').doc(authenticatedUser.uid).set({
        email, firstName, lastName
    });
    // console.log('authenticatedUser>>>', authenticatedUser)
    res.json(authenticatedUser)
  } catch (err) {
      next(err)
  }
})

router.get('/logout', async (req, res, next) => {
  try {
    const user = await firebase.auth().signOut()
    res.send(user)
  } catch (err) {
      next(err)
  }
})