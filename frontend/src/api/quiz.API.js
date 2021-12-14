import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import { db } from "../constants/firebase-config";
import { auth } from "../constants/firebase-config";




    //Fetch quiz data
    const getAllQuizData = async () => {
        const dataArray = [];
        const querySnapshot = await getDocs(collection(db, "quizzes"));
        querySnapshot.forEach((doc) => {
            dataArray.push(doc.data());
        });
        return dataArray;
    };

    const getidQuizData = async (parent_course) => {
        const dataArray = [];
        const q = query(collection(db, "quizzes"), where("parent_course", "==", parent_course));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            dataArray.push(doc.data());
        });
        return dataArray;
    };

    const quizzesRef = collection(db, 'quizzes');
 