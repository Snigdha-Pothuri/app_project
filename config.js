import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyAhYQ-y5AEd1Hb1w4N4G6KMgRkFR5Ge1rM",
    authDomain: "car-racing-6830b.firebaseapp.com",
    databaseURL: "https://car-racing-6830b.firebaseio.com",
    projectId: "car-racing-6830b",
    storageBucket: "car-racing-6830b.appspot.com",
    messagingSenderId: "201397832557",
    appId: "1:201397832557:web:470486e0300a668fe9a864"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();