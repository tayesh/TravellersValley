// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLjx_bvdIgJQqSLiqZzsG7kozaDkfc08M",
  authDomain: "travellers-valley.firebaseapp.com",
  projectId: "travellers-valley",
  storageBucket: "travellers-valley.appspot.com",
  messagingSenderId: "323906837084",
  appId: "1:323906837084:web:5e3b9e3b2ff64ff5662499"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;