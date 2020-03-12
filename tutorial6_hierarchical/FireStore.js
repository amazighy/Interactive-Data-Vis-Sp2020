  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD6AkqSnrAPQKfIeNtxR4MBr2aiWVcdOpQ",
    authDomain: "timetracker-cd4b2.firebaseapp.com",
    databaseURL: "https://timetracker-cd4b2.firebaseio.com",
    projectId: "timetracker-cd4b2",
    storageBucket: "timetracker-cd4b2.appspot.com",
    messagingSenderId: "287447924853",
    appId: "1:287447924853:web:2740b362369983fcfb783c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   initialize fire store and save it in db variable
  const db = firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  db.settings(settings);