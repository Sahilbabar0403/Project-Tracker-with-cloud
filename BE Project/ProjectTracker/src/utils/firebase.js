// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "projecttracker-7977c.firebaseapp.com",
  projectId: "projecttracker-7977c",
  storageBucket: "projecttracker-7977c.firebasestorage.app",
  messagingSenderId: "88687023952",
  appId: "1:88687023952:web:df8ec70dd1f33aab607e55"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);