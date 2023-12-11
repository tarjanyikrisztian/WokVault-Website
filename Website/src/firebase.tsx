// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAs4NUNg59tmf01ADPy5W8zxVig9XSbYLk",
  authDomain: "wokvault-5cb43.firebaseapp.com",
  projectId: "wokvault-5cb43",
  storageBucket: "wokvault-5cb43.appspot.com",
  messagingSenderId: "21320132992",
  appId: "1:21320132992:web:a85ec2ebfa379164fdf965",
  measurementId: "G-TM6TSBG94C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);