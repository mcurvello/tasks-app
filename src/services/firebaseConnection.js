import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAaWFBzGxzM3oPftPoQ0pJWbsfJ0DoEBHY",
  authDomain: "tasks-8b4f6.firebaseapp.com",
  projectId: "tasks-8b4f6",
  storageBucket: "tasks-8b4f6.appspot.com",
  messagingSenderId: "1069248527401",
  appId: "1:1069248527401:web:7005aba4eec3bf3ef0f038",
  measurementId: "G-JMCBC7V4W7",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
