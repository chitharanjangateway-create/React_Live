// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVCtJnuV6HVCzOun6KUuyQUf7GUKmy7jE",
  authDomain: "attendence-e1edb.firebaseapp.com",
  databaseURL: "https://attendence-e1edb-default-rtdb.firebaseio.com",
  projectId: "attendence-e1edb",
  storageBucket: "attendence-e1edb.appspot.com", // corrected
  messagingSenderId: "926164812010",
  appId: "1:926164812010:web:780c89764a0662c0e49793",
  measurementId: "G-HKB4PB56Z7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);