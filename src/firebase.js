import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBKa-yrz4Rp0NJktyvEqsekgYATnEI2zQw",
  authDomain: "clipnepal-421a3.firebaseapp.com",
  projectId: "clipnepal-421a3",
  storageBucket: "clipnepal-421a3.appspot.com",
  messagingSenderId: "1048305911684",
  appId: "1:1048305911684:web:482516406c4f6202117fd1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
