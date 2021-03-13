import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDazrrQYPtK-da7Geaa1AlsHcFBLmfkqu8",
    authDomain: "bt3103-week-6-638a5.firebaseapp.com",
    projectId: "bt3103-week-6-638a5",
    storageBucket: "bt3103-week-6-638a5.appspot.com",
    messagingSenderId: "395857027048",
    appId: "1:395857027048:web:539759e9f3ef6817594e5d",
    measurementId: "G-BBNSJPX4XJ"
  };
  firebase.initializeApp(firebaseConfig);
  var database = firebase.firestore();
  export default database;

