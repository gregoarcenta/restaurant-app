import firebase from "firebase";

import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
   apiKey: "AIzaSyBzubcrnbatrn-_HCecrz1AnJ5lgBenPoY",
   authDomain: "restaurant-app-b7df6.firebaseapp.com",
   projectId: "restaurant-app-b7df6",
   storageBucket: "restaurant-app-b7df6.appspot.com",
   messagingSenderId: "1069963763747",
   appId: "1:1069963763747:web:c4e75158098524fd4d5196",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//const db = firebase.firestore();
//const auth = firebase.auth();

export default firebase;
