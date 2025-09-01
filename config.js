import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { 
  getFirestore, collection, query, where, getDocs, doc, updateDoc 
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA86zhSVi4FSw-GvFBdOZsCPaHMS67XA78",
  authDomain: "carrer-path-a5810.firebaseapp.com",
  projectId: "carrer-path-a5810",
  storageBucket: "carrer-path-a5810.firebasestorage.app",
  messagingSenderId: "693831778129",
  appId: "1:693831778129:web:911293c5c284eefe295d70"
};
