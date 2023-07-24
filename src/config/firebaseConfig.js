// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// allows to connect to firestore
import {getFirestore} from 'firebase/firestore'

// for auth
import { getAuth } from 'firebase/auth'

//for storage
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1ym5d9gWdVGT0AMg0AVajwL8JC5ZW2o8",
  authDomain: "blog-final-project-5029a.firebaseapp.com",
  projectId: "blog-final-project-5029a",
  storageBucket: "blog-final-project-5029a.appspot.com",
  messagingSenderId: "41555597766",
  appId: "1:41555597766:web:cfd07819cb75c87a963ac7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// set up databse and export it
export const db = getFirestore(app)

//setup for auth and export it
export const auth = getAuth(app)

// setup for storage and export it
export const storage = getStorage(app)