import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,collection, addDoc, setDoc,updateDoc,getDoc,doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQEeaa93sFYP6Il-oBv-RkOjKJg3rXx7Y",
  authDomain: "pokeapi-8dcae.firebaseapp.com",
  projectId: "pokeapi-8dcae",
  storageBucket: "pokeapi-8dcae.appspot.com",
  messagingSenderId: "496801719787",
  appId: "1:496801719787:web:1449f96e58948ce07525ae"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
