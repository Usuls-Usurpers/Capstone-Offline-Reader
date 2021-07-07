import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'
import firebase from 'firebase'
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyAdIuSM1wFvPnLOpanMdNeTpEXF0WrlxtQ",
    authDomain: "cache-22.firebaseapp.com",
    databaseURL: "https://cache-22-default-rtdb.firebaseio.com",
    projectId: "cache-22",
    storageBucket: "cache-22.appspot.com",
    messagingSenderId: "195039738953",
    appId: "1:195039738953:web:f08d5cc2743e50079b5398",
    measurementId: "G-8Q5WB21BM9"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
