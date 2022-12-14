
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCbAXdJl-kynZwI3fkr5HQRv8G_CtEfJ7A",
  authDomain: "easyfix-bsit-pup.firebaseapp.com",
  projectId: "easyfix-bsit-pup",
  storageBucket: "easyfix-bsit-pup.appspot.com",
  messagingSenderId: "106635680989",
  appId: "1:106635680989:web:3583039a8181f5cda64f34",
  measurementId: "G-057STZEG50"
};
 

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
export default app;
