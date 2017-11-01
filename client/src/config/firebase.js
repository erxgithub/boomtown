import * as firebase from 'firebase';
import 'firebase/auth';

// init firebase

const config = {
  apiKey: "AIzaSyCUZZMxqzrGXMAAhFi3uTO2WPjFo1CVFzk",
  authDomain: "boomtown-30fc4.firebaseapp.com",
  databaseURL: "https://boomtown-30fc4.firebaseio.com",
  projectId: "boomtown-30fc4",
  storageBucket: "boomtown-30fc4.appspot.com",
  messagingSenderId: "1017406538918"
};

const FirebaseApp = firebase.initializeApp(config);
const FirebaseAuth = firebase.auth();
const FirebaseStorage = firebase.storage(FirebaseApp);
const FirebaseDB = firebase.database();

export { FirebaseApp, FirebaseAuth, FirebaseStorage, FirebaseDB };
