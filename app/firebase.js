// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWDrX2EDNM9vsQBAWOkbUy2oSTgWRYNyk",
  authDomain: "expense-tracker-b065e.firebaseapp.com",
  projectId: "expense-tracker-b065e",
  storageBucket: "expense-tracker-b065e.appspot.com",
  messagingSenderId: "1005766244013",
  appId: "1:1005766244013:web:696bde4ba39fe1c4e63824"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db= getFirestore(app);