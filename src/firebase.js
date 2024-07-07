import firebase from "firebase/compat/app";

const firebaseConfig = {
    apiKey: "AIzaSyAivW9qQ7s9QMZuII__obuH8fIO_uUKzzE",
    authDomain: "disney-clone-a348e.firebaseapp.com",
    projectId: "disney-clone-a348e",
    storageBucket: "disney-clone-a348e.appspot.com",
    messagingSenderId: "305085685671",
    appId: "1:305085685671:web:a342787a96af22d8f2a082",
    measurementId: "G-EGLQME5M9W"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const storage = firebase.storag()
export {auth,provider,storage};
export default db ;