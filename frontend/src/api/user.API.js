import React, { useState, useEffect } from "react";

import { createURL } from "../helpers/helpers";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  doc,
} from "firebase/firestore";

import { db } from "../constants/firebase-config";
import { auth } from "../constants/firebase-config";

//Fetch user data
export const getAllUserData = async () => {
  const dataArray = [];
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    dataArray.push(doc.data());
  });
  return dataArray;
};

export const getUserData = async () => {
  if (auth.currentUser !== null) {
    const id = auth.currentUser.uid;
    const q = query(collection(db, "users"), where("user_id", "==", id));
    const docSnapshot = await getDocs(q);
    let user_data;
    docSnapshot.forEach((element) => {
      user_data = element.data();
    });
    return user_data;
  }
  return;
};
