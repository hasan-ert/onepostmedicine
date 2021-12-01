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
import { UpEachWord } from "../helpers/helpers";

export default function Deneme() {
  return (
    <div>
      <h1>{UpEachWord("dneme 123- DASDA")}</h1>
    </div>
  );
}
