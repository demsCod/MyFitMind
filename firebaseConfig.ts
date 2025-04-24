// Import the functions you need from the SDKs you need
import * as firebaseAuth from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from 'firebase/auth';


import AsyncStorage from '@react-native-async-storage/async-storage';

// Votre configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAWnfBu2raXEQhruSxZKk8nzXrZzb1JQUI",
  authDomain: "myfitmind-93.firebaseapp.com",
  projectId: "myfitmind-93",
  storageBucket: "myfitmind-93.firebasestorage.app",
  messagingSenderId: "1050488325610",
  appId: "1:1050488325610:web:15034ce7efd3ab7ee4de93",
  measurementId: "G-NZJDHTVXRE"
};
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

// Configurer l'authentification avec persistance locale
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: reactNativePersistence(AsyncStorage),
});