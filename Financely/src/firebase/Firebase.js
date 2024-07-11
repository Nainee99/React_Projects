// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVHmeKkXdoU9HbwvUiL4g45-7JvYhGW8o",
  authDomain: "my-personaly-finance-tracker.firebaseapp.com",
  projectId: "my-personaly-finance-tracker",
  storageBucket: "my-personaly-finance-tracker.appspot.com",
  messagingSenderId: "47932499238",
  appId: "1:47932499238:web:2fae4a2756153c2b444de7",
  measurementId: "G-DW6RSMRFM7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
