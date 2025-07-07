import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, serverTimestamp  } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { browserLocalPersistence, setPersistence } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoPeFXIrkETHe1nXWhKIxbjVIbwOl3U8g",
  authDomain: "learningbuddy-c8654.firebaseapp.com",
  projectId: "learningbuddy-c8654",
  storageBucket: "learningbuddy-c8654.firebasestorage.app",
  messagingSenderId: "167902151578",
  appId: "1:167902151578:web:a4bf08b05e644e9d87b023"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Setup Firebase Auth
const auth = getAuth(app);

//Ensure the user stays logged in after refresh
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Auth persistence error:", error);
});

// Initialize services
const storage = getStorage(app);
const db = getFirestore(app);


export { storage, db, auth, serverTimestamp  };
export default app;