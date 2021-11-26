import React from "react";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../constants/firebase-config";

export default function Deneme() {
  const ref = doc(db, "courses", "gJCcylsyNaL1ZVPIQ0Rc");
  const update = async () => {
    console.log("Deneme");
    try {
      await updateDoc(ref, { annen: "annen" });
      console.log("annen");
    } catch (error) {}
  };
  return (
    <div>
      {update()}
      <h1>Dnemeee</h1>
    </div>
  );
}
