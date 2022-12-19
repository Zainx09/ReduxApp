// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
import { getFunctions } from 'firebase/functions';
import { getAnalytics } from "firebase/analytics";



// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCDyhZOLP33TsoGrmoF3t9DyvAOf87nNEU",
//   authDomain: "scannerapp-34f4f.firebaseapp.com",
//   projectId: "scannerapp-34f4f",
//   storageBucket: "scannerapp-34f4f.appspot.com",
//   messagingSenderId: "876077875332",
//   appId: "1:876077875332:web:1c4b079515cadfa14c02d1",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCYO0pm2ZsKa8dUmK8z164xLx7Usj-tcyU",
  authDomain: "react-native-logs.firebaseapp.com",
  projectId: "react-native-logs",
  storageBucket: "react-native-logs.appspot.com",
  messagingSenderId: "204109714442",
  appId: "1:204109714442:web:eedfcbd056113723c0fbf3",
  measurementId: "G-FR4PS8EJKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

