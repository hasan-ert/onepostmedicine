
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  where,query
} from "firebase/firestore";

import { db } from "../constants/firebase-config"; 


    //Fetch user data
    export default async function getAllUserData(){
        const dataArray = [];
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            dataArray.push(doc.data());
        });
        return dataArray;
    };


    export async function getUserData(email){
      const dataArray = [];
      const q = query(collection(db, "users"), where("email" , "==", email))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          dataArray.push(doc.data());
      });
      return dataArray;
  };