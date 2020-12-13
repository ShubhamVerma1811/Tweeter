import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_APP_ID,
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);
export default firebase;
