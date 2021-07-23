const firebase = require("firebase");
const admin = require('firebase-admin')
const { serviceAccount, firebaseConfig } = require('../../config')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cache-22-default-rtdb.firebaseio.com"
});

firebase.initializeApp(firebaseConfig);

const adminDb = admin.firestore()
const db = firebase.firestore()

module.exports = {
    adminDb,
    db
};
