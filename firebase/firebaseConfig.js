// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


//https://firebase.google.com/docs/auth/web/start
import { getAuth } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuxCkcJzZQNM3XzLefVVWFIHqMbLif2ug",
  authDomain: "scanner-app-d1238.firebaseapp.com",
  projectId: "scanner-app-d1238",
  storageBucket: "scanner-app-d1238.appspot.com",
  messagingSenderId: "326772469561",
  appId: "1:326772469561:web:fdfdae0192f2c8082a82e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);