const firebase = require('../db/db');
const express = require("express");
const router = express.Router();
const firestore = firebase.firestore();
//db

const auth = firebase.auth()
module.exports = router;


// const router = require('express').Router()
// const { models: {User }} = require('../db')
// module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await auth.signInWithEmailAndPassword(req.body.email, req.body.password)
    console.log('user', user)
    res.json(user);
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await auth.createUserWithEmailAndPassword(req.body.email, req.body.password)
    res.send(user)
  } catch (err) {
      next(err)
  }
})

router.get('/logout', async (req, res, next) => {
  try {
    const user = await auth.signOut()
    console.log('logout user=>', user)
    res.send(user)
  } catch (err) {
      next(err)
  }
})

// router.get('/me', async (req, res, next) => {
//   try {
//     await auth.onAuthStateChanged(userAuth => {
//         const user = {
//             id: userAuth.id,
//             email: userAuth.email
//         }
//         if (userAuth) {
//             console.log(userAuth)
//             res.send(user)
//         }
//     })
//   } catch (ex) {
//     next(ex)
//   }
// })

// router.get('/me', async (req, res, next) => {
//   try {
//     // console.log('req.headers', req.headers.authorization)
//     // const user = await auth.verifyIdToken(req.headers.authorization)
//     const userToken = await auth.currentUser.getIdToken(true)
//     // const decodedToken = await auth.verifyIdToken(userToken)
//     // const uid = decodedToken.iud
//     res.send(userToken)
//     // res.send(await auth.verifyIdToken(req.headers.authorization))
//   } catch (ex) {
//     next(ex)
//   }
// })