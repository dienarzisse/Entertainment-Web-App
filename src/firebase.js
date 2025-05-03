// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEoV1PqBLJhLyiEqviK0dvmp36lX5pGbo",
  authDomain: "entertainment-web-app-d6a98.firebaseapp.com",
  projectId: "entertainment-web-app-d6a98",
  storageBucket: "entertainment-web-app-d6a98.appspot.com",
  messagingSenderId: "23965660187",
  appId: "1:23965660187:web:be910c3c4528c5b320b4be",
  measurementId: "G-328037CWZ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

