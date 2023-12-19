// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtGaqlo5vILrBlIOtS1TpZ-T7Jlz4L96w",
  authDomain: "erpsystem-af61b.firebaseapp.com",
  projectId: "erpsystem-af61b",
  storageBucket: "erpsystem-af61b.appspot.com",
  messagingSenderId: "201759501603",
  appId: "1:201759501603:web:5c75aa100bf3d8575a7096"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default db;