
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBOGWTfBm6S0nn1wFJDhSKUn3jY2_0zNac",
  authDomain: "codetribe-marketplace-40c33.firebaseapp.com",
  projectId: "codetribe-marketplace-40c33",
  storageBucket: "codetribe-marketplace-40c33.firebasestorage.app",
  messagingSenderId: "354892895550",
  appId: "1:354892895550:web:d40e2ef2ca38a09c2e486f",
  measurementId: "G-GWZ524GC2L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export { auth, db, collection, addDoc, getDocs}