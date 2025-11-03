// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHUPDHRvOwzbGhVHvPq9QeQQXi3IennkA",
  authDomain: "grocery-7a419.firebaseapp.com",
  projectId: "grocery-7a419",
  storageBucket: "grocery-7a419.firebasestorage.app",
  messagingSenderId: "110048830117",
  appId: "1:110048830117:web:2142931689683e6d29e34c",
  measurementId: "G-9N8V91V0XS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);