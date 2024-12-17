// Using Firebase Auth for this example
import { initializeApp } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Your Firebase config here
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // ... other config options
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 