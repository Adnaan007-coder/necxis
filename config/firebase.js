// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBp-RRJG8TfohwmEslmSsTbm8Adoq5o9Vs",
  authDomain: "task-2a56b.firebaseapp.com",
  projectId: "task-2a56b",
  storageBucket: "task-2a56b.firebasestorage.app",
  messagingSenderId: "991185823049",
  appId: "1:991185823049:web:113c6c49598fdca079a698",
  measurementId: "G-3L8RN2MVCF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firebase Messaging (only in browser environment)
export const messaging = typeof window !== 'undefined' && isSupported() 
  ? getMessaging(app) 
  : null;

export default app;