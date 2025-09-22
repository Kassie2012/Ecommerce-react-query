// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUop1iFDOqPn9lUjUjwq8Ls8AxdjIVY8Q",
  authDomain: "ecommerce-app-9fbc0.firebaseapp.com",
  projectId: "ecommerce-app-9fbc0",
  storageBucket: "ecommerce-app-9fbc0.firebasestorage.app",
  messagingSenderId: "59619301738",
  appId: "1:59619301738:web:ed4c068345a4353b6aed13",
  measurementId: "G-C7LJ90H5RT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);