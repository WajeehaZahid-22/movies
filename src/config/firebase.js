// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH8SeA0i31SHOd4fWZ7qceu5abB-y6ZGQ",
  authDomain: "projectno1-68d54.firebaseapp.com",
  projectId: "projectno1-68d54",
  storageBucket: "projectno1-68d54.appspot.com",
  messagingSenderId: "359577438354",
  appId: "1:359577438354:web:5422723598ef29078e3e4b",
  measurementId: "G-XRBL9E0E8J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app)