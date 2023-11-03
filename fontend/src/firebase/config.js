// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAfotHV9Urv6Bilu4e0xu_r0kyz4Hpt7aA",
    authDomain: "qr-link-34a7e.firebaseapp.com",
    projectId: "qr-link-34a7e",
    storageBucket: "qr-link-34a7e.appspot.com",
    messagingSenderId: "757724390340",
    appId: "1:757724390340:web:942ecc5b4de3eaeb857a91",
    measurementId: "G-1TD0ZFNYX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const providerGG = new GoogleAuthProvider()
export const storage = getStorage(app);
export default app;