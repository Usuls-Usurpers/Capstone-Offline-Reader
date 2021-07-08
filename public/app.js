// import firebase from 'firebase';
// import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyAdIuSM1wFvPnLOpanMdNeTpEXF0WrlxtQ',
  authDomain: 'cache-22.firebaseapp.com',
  databaseURL: 'https://cache-22-default-rtdb.firebaseio.com',
  projectId: 'cache-22',
  storageBucket: 'cache-22.appspot.com',
  messagingSenderId: '195039738953',
  appId: '1:195039738953:web:f08d5cc2743e50079b5398',
  measurementId: 'G-8Q5WB21BM9',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

// enter path, alternating b/w collections and docs
const docRef = firestore.doc('users/vickie@mail.com');
// const docRef = firestore.collection('users').doc('vickie@mail.com');
const outputHeader = document.querySelector('#userOutput');

//document snapshot is an object that represents your document
// can find its id, read metadata, can see what data it contains by calling .data() on it

// automatically updates
getRealtimeUpdates = function () {
  docRef.onSnapshot(function (doc) {
    docRef.get().then(function (doc) {
      if (doc && doc.exists) {
        const myData = doc.data();
        outputHeader.innerText =
          'User: ' +
          myData.email +
          ' ' +
          myData.firstName +
          ' ' +
          myData.lastName;
      }
    });
  });
};
getRealtimeUpdates();
