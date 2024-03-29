import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB7wGxBHolUV4AoDeWM6S96iwNrYQkmnMQ",
  authDomain: "sangmyung2-1.firebaseapp.com",
  projectId: "sangmyung2-1",
  storageBucket: "sangmyung2-1.appspot.com",
  messagingSenderId: "473865988963",
  appId: "1:473865988963:web:454ea9b346be0187988156",
  measurementId: "G-6QY8SW6HBD"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)


export { auth, db }