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
import { getUserData, updateUserData } from "../../api/user.API";

export default function Quizzes({ authHandler }) {
  let history = useHistory();
  //states
  const [quizzes, setQuizzes] = useState([]);

  //Fetch course datas
     //Fetch quiz data
     const getAllQuizData = async () => {
        const dataArray = [];
        const querySnapshot = await getDocs(collection(db, "quizzes"));
        querySnapshot.forEach((doc) => {
            dataArray.push(doc);
        });
        console.log(dataArray[0].data());
        setQuizzes(dataArray);
    };
  //useEffects
  useEffect(() => {
    getAllQuizData();
  }, []);

  //handlers
  const handleQuizzes = (e) => {
    getAllQuizData(e);
  };

  function createCardRows(data, history) {
    const changeURL = (coursename) => {
      history.push(createURL("/quiz/"+coursename,"deneme"));
    };
    return data.map(function (item) {
        console.log("item:", item.data())
      if (item.data().questions.length > 0)
        return (
          <Grid item xs={12} lg={4} md={6} display="flex">
            <MediaCard
              onClickHandler={() => {
                console.log("parent course:",item.data().parent_course)
                changeURL(item.data().parent_course);
                
              }}
              cssClass="floating-card"
              contentHeader={item.data().parent_course}
              contentHeaderVar="20pt"
              backColor={item.backColor ? item.backColor : "rgb(155, 92, 235)"}
            ></MediaCard>
          </Grid>
        );
      return "";
    });
  }

  return (
    <Grid container marginTop="3rem" padding="3rem">
      <Grid item xs={12}>
        <Typography
          fontSize="3vw"
          fontFamily={"auto"}
          style={{ wordBreak: "break-word" }}
          textAlign="center"
          marginBottom="3%"
        >
          Pick a course to take a quiz!
        </Typography>
      </Grid>

      {createCardRows(quizzes, history)}
    </Grid>
  );
}
