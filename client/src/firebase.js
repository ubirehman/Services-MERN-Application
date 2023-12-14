// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getstorage } from 'fireb/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8DlmM0z-ebA0QFZUVghq9iviV84HOa60",
  authDomain: "tehseen-services.firebaseapp.com",
  projectId: "tehseen-services",
  storageBucket: "tehseen-services.appspot.com",
  messagingSenderId: "773068162443",
  appId: "1:773068162443:web:e53d5bed49548b45719b8e",
  measurementId: "G-F5HB1SHPCE"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
export const storage = getstorage(firebaseApp);

export default firebaseApp;