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

function createCardRows(data, history) {
  const changeURL = (lectureName) => {
    history.push(createURL("/lecture", lectureName));
  };

  return data.map(function (item) {
    return (
      <Grid item xs={12} lg={4} md={6} display="flex">
        <MediaCard
          onClickHandler={() => changeURL(item.data().lectures[0])}
          cssClass="floating-card"
          imgSource={item.data().imgURL}
          contentHeader={item.data().course_name}
          contentHeaderVar="20pt"
          backColor={item.backColor ? item.backColor : "rgb(50, 100, 139)"}
        ></MediaCard>
      </Grid>
    );
  });
}

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
  const data = [
    {
      imgSource:
        "https://img.freepik.com/free-photo/top-view-white-office-desk-table-with-copy-space-flat-lay_14098-383.jpg?size=626&ext=jpg",
      contentHeader: "DenemeDenemeDenemeDenemeDenemeDenemeDeneme",
      content: "deneme deneme deneme",
    },
    {
      imgSource:
        "https://img.freepik.com/free-photo/top-view-white-office-desk-table-with-copy-space-flat-lay_14098-383.jpg?size=626&ext=jpg",
      contentHeader: "Denemeee",
      content: "deneme deneme deneme",
    },
    {
      imgSource:
        "https://img.freepik.com/free-photo/top-view-white-office-desk-table-with-copy-space-flat-lay_14098-383.jpg?size=626&ext=jpg",
      contentHeader: "Denemeee",
      content: "deneme deneme deneme",
    },
    {
      imgSource:
        "https://img.freepik.com/free-photo/top-view-white-office-desk-table-with-copy-space-flat-lay_14098-383.jpg?size=626&ext=jpg",
      contentHeader: "Denemeee",
      content: "deneme deneme deneme",
    },

    {
      imgSource:
        "https://img.freepik.com/free-photo/top-view-white-office-desk-table-with-copy-space-flat-lay_14098-383.jpg?size=626&ext=jpg",
      contentHeader: "Denemeee",
      content: "deneme deneme deneme",
    },
    {
      imgSource:
        "https://images.pexels.com/photos/434337/pexels-photo-434337.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      contentHeader: "Denemeeeeeeeeeeeeeeeeeeeeee",
      content: "deneme deneme deneme",
      backColor: "rgb(50,100,139)",
    },
  ];
  return (
    <Grid container marginTop="3rem" padding="3rem">
      <Grid item xs={12}>
        <Typography
          fontSize="5vw"
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
