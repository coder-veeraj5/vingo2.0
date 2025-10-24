// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "vingo-food-delivery-b854e.firebaseapp.com",
  projectId: "vingo-food-delivery-b854e",
  storageBucket: "vingo-food-delivery-b854e.firebasestorage.app",
  messagingSenderId: "754745954817",
  appId: "1:754745954817:web:3d2819ce7267d07f55a600"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

export {app,auth}; 