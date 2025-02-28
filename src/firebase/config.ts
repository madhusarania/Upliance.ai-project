import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyBh7ekk4yn0OkAk90ywi9iyRwlx6EIvJN8",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "upliance-project-ecae5.firebaseapp.com",
  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID || "upliance-project-ecae5",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "upliance-project-ecae5.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "957877008656",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:957877008656:web:7c6d08de0b3bd6d6ebcd95",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
