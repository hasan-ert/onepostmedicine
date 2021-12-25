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

export default function Courses({ authHandler }) {
  let history = useHistory();
  //states
  const [courses, setCourses] = useState([]);

  //Fetch course datas
  const getCourseData = async () => {
    const dataArray = [];
    const querySnapshot = await getDocs(collection(db, "courses"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      dataArray.push(doc);
    });
    console.log(dataArray[0].data());
    setCourses(dataArray);
  };
  //useEffects
  useEffect(() => {
    getCourseData();
  }, []);

  //handlers
  const handleCourse = (e) => {
    setCourses(e);
  };

  function createCardRows(data, history) {
    const changeURL = (coursename, lectureName) => {
      history.push(createURL("/lecture/" + coursename, lectureName));
    };
    return data.map(function (item) {
      if (item.data().lectures.length > 0)
        return (
          <Grid item xs={12} lg={4} md={6} display="flex">
            <MediaCard
              onClickHandler={() => {
                addToUnfinishedCourses(item.data().course_name);
                changeURL(item.data().course_name, item.data().lectures[0]);
              }}
              cssClass="floating-card"
              imgSource={item.data().imgURL}
              contentHeader={item.data().course_name}
              contentHeaderVar="20pt"
              backColor={item.backColor ? item.backColor : "rgb(50, 100, 139)"}
            ></MediaCard>
          </Grid>
        );
      return "";
    });
  }

  function addToUnfinishedCourses(coursename) {
    getUserData().then((res) => {
      let temp = res;
      if (
        !temp.unfinished_courses.includes(coursename) &&
        !temp.completed_courses.includes(coursename)
      )
        temp.unfinished_courses = [...temp.unfinished_courses, coursename];
      updateUserData(temp);
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
          Pick a course to start your learning experience!
        </Typography>
      </Grid>

      {createCardRows(courses, history)}
    </Grid>
  );
}
