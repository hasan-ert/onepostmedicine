import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import MediaCard from "../Sub-Components/Cards";
import "../componentCss/MainComponents/Courses.css";
import { createURL } from "../../helpers/helpers";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../constants/firebase-config";
import { auth } from "../../constants/firebase-config";



    //Fetch user data
    const getUserData = async () => {
        const dataArray = [];
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            dataArray.push(doc);
        });
        console.log(dataArray[0].data());
        return dataArray;
    };