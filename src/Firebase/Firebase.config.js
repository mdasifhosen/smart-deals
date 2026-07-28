// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQDLbF2suAePe-FWk8-LYIyccOuP7zMxQ",
  authDomain: "smart-deals-6e254.firebaseapp.com",
  projectId: "smart-deals-6e254",
  storageBucket: "smart-deals-6e254.firebasestorage.app",
  messagingSenderId: "592629761266",
  appId: "1:592629761266:web:36792fc9e5cd024c773c6b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
