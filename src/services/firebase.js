// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPu1pzMmc5u9_A0XEyXadwDaxgIG0kJzs",
  authDomain: "alioztest.firebaseapp.com",
  projectId: "alioztest",
  storageBucket: "alioztest.appspot.com",
  messagingSenderId: "320438837951",
  appId: "1:320438837951:web:814a1d5df36902b94f1c0a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize firestore
export const db = getFirestore(app);
