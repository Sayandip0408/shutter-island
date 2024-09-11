import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKD3lWfRkbNBN2XMGyy0AHnBTfzDbK4mw",
  authDomain: "image-gallery-86377.firebaseapp.com",
  projectId: "image-gallery-86377",
  storageBucket: "image-gallery-86377.appspot.com",
  messagingSenderId: "45698791514",
  appId: "1:45698791514:web:c2915b73c514543a780063",
  measurementId: "G-R1LPSJYVSR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);