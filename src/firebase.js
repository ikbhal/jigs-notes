import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCqJyBoPLXy4CpotZPOsSKjK4rKJTCAbgE",
    authDomain: "ikbhal-cb53f.firebaseapp.com",
    projectId: "ikbhal-cb53f",
    storageBucket: "ikbhal-cb53f.appspot.com",
    messagingSenderId: "839053098923",
    appId: "1:839053098923:web:d96c4df68fc216fa189cee",
    measurementId: "G-BNYMN6KNXP"
  };
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db }


