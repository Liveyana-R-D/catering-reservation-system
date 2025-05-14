import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAR8YMc2LFLVZNFgZJezj3oa7RF6i2gmzo",
  authDomain: "catering-reservation-sys-8e1c8.firebaseapp.com",
  projectId: "catering-reservation-sys-8e1c8",
  storageBucket: "catering-reservation-sys-8e1c8.appspot.com",
  messagingSenderId: "648813413603",
  appId: "1:648813413603:web:55f0ed90cc1c232950f1d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  auth,
  db,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc
};
