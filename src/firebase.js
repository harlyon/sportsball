import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDfT1VO9XZZn1q0xxhRxax-Md2aoPiNHvs",
  authDomain: "bootcamp-project5-1aac3.firebaseapp.com",
  databaseURL: "https://bootcamp-project5-1aac3.firebaseio.com",
  projectId: "bootcamp-project5-1aac3",
  storageBucket: "",
  messagingSenderId: "227180808892"
};
firebase.initializeApp(config);

export default firebase;