import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA5srfX-J5u6Fqy_syJKyAQDXljpdnIFOc",
  authDomain: "gifapp-200ef.firebaseapp.com",
  projectId: "gifapp-200ef",
  storageBucket: "gifapp-200ef.appspot.com",
  messagingSenderId: "592954909187",
  appId: "1:592954909187:web:2b60054ee1bb8b850e2436"
};

firebase.initializeApp(firebaseConfig);