// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB6a8xuziwgU_1GVK8fzvvUHUYb9RuPYOA",
    authDomain: "us-react.firebaseapp.com",
    projectId: "us-react",
    storageBucket: "us-react.firebasestorage.app",
    messagingSenderId: "652009287650",
    appId: "1:652009287650:web:320ea74d5f41bae1b4d3bb",
    measurementId: "G-15DK94CQEQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth };

export const storage = getStorage(app);