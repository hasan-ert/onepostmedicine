import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import {getAuth} from 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyDEh4JhLSyRHAGVmJCEPJZzwjh9TiVA940",
    authDomain: "crud-app-50192.firebaseapp.com",
    projectId: "crud-app-50192",
    storageBucket: "crud-app-50192.appspot.com",
    messagingSenderId: "639866419598",
    appId: "1:639866419598:web:7781304766496ff1008cdf",
    measurementId: "G-8GC393RRKQ"
  };

  const app = initializeApp(firebaseConfig);

 export const auth = getAuth (app);

 export const db = getFirestore(app);