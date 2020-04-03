  // Your web app's Firebase configuration
  // Your web app's Firebase configuration
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyANuC2fX0v31TJnJPSokfBHR9GyWD4ai1E",
    authDomain: "trake-26ad5.firebaseapp.com",
    databaseURL: "https://trake-26ad5.firebaseio.com",
    projectId: "trake-26ad5",
    storageBucket: "trake-26ad5.appspot.com",
    messagingSenderId: "653773399172",
    appId: "1:653773399172:web:cb592b0a3aa542144a0ed1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   initialize fire store and save it in db variable
  const db = firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  db.settings(settings);

  
