// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCPkfRzsdU3dJ8dKz5qmUivnZ-KAoRE2hw',
  authDomain: 'eventplanner-436.firebaseapp.com',
  projectId: 'eventplanner-436',
  storageBucket: 'eventplanner-436.appspot.com',
  messagingSenderId: '958403315875',
  appId: '1:958403315875:web:c7c064aef4883aeca89716',
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
