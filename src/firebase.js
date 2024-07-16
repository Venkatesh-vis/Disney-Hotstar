
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDB4pVW6IgP4wbZB0HbWjs-lDAXenVmpeE",
  authDomain: "disney-f82e8.firebaseapp.com",
  projectId: "disney-f82e8",
  storageBucket: "disney-f82e8.appspot.com",
  messagingSenderId: "763994508062",
  appId: "1:763994508062:web:20e62a529a6cd9abf2170f",
  measurementId: "G-6C5DB5FJE3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
