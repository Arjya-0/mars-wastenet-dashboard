// Firebase Configuration
// This file uses environment variables to keep sensitive API keys secure.
// Never commit actual API keys to version control.

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || '',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.FIREBASE_APP_ID || '',
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || ''
};

// Validate that required environment variables are set
if (!firebaseConfig.apiKey) {
  console.warn('Firebase API key is not configured. Please set FIREBASE_API_KEY environment variable.');
}

export default firebaseConfig;
