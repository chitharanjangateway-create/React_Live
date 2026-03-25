// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVCtJnuV6HVCzOun6KUuyQUf7GUKmy7jE",
  authDomain: "attendence-e1edb.firebaseapp.com",
  databaseURL: "https://attendence-e1edb-default-rtdb.firebaseio.com",
  projectId: "attendence-e1edb",
  storageBucket: "attendence-e1edb.firebasestorage.app",
  messagingSenderId: "926164812010",
  appId: "1:926164812010:web:780c89764a0662c0e49793",
  measurementId: "G-HKB4PB56Z7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firebase services
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export { app, analytics };