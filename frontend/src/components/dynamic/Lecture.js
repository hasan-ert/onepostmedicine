import { Grid } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import ReactPlayer from "react-player";
import "../componentCss/site.css";
import "../componentCss/MainComponents/Lecture.css";
import videojs from "video.js";
import UnfinishedCourses from "../Sub-Components/UnfinishedCourses";
import LecturesBox from "../Sub-Components/LecturesBox";
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

import { db } from "../../constants/firebase-config";
import { auth } from "../../constants/firebase-config";
import { UpEachWord } from "../../helpers/helpers";

export default function Lecture() {
  //States
  const [lecture, setLecture] = useState({
    lecture_name: "",
    transcript: "",
    parent_category: "",
    video_url: [""],
  });

  const [allLectures, setAllLectures] = useState([]);

  //Params
  const { coursename, name } = useParams();
  //Collection References
  const lecturesRef = collection(db, "lectures");
  const coursesRef = collection(db, "courses");

  //useRefs
  const videoRef = useRef();
  //useEffects
  useEffect(() => {
    getLectureData();
  }, [name]);

  useEffect(() => {
    getALLLectureData();
  }, [lecture.parent_category]);

  useEffect(() => {
    videoRef.current.load();
  }, [lecture.video_url]);

  //Fetch lecture data
  const getLectureData = async () => {
    // preprocess the parameter lecture name that is passed to this page to match db values
    console.log(name);
    const lectureName = UpEachWord(name);
    console.log(coursename);
    let q = query(
      lecturesRef,
      where("lecture_name", "==", lectureName),
      where("parent_category", "==", coursename)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      doc.data() !== undefined
        ? setLecture(doc.data())
        : setLecture({ lecture_name: "" });
    });
  };

  //Fetch lectures of the course
  const getALLLectureData = async () => {
    // preprocess the parameter lecture name that is passed to this page to match db values

    const parentCourseName = UpEachWord(lecture.parent_category);
    console.log(parentCourseName);
    let q = query(coursesRef, where("course_name", "==", parentCourseName));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      doc.data() !== undefined
        ? setAllLectures(doc.data().lectures)
        : setAllLectures([]);
    });
  };

  return (
    <Grid container spacing={3} marginTop="20px">
      <Grid item lg={9} xs={12} justifyContent="center" textAlign="center">
        <video
          class="video-js vjs-default-skin"
          controls="true"
          preload="auto"
          width="1920"
          height="1080"
          ref={videoRef}
        >
          <source src={lecture.video_url[0]} type="video/mp4"></source>
        </video>
      </Grid>
      <Grid item lg={3} xs={12} textAlign="center">
        <h2>Lectures</h2>
        <Grid item display="flex">
          <LecturesBox
            parentPage="lecture"
            course={coursename}
            data={allLectures}
          ></LecturesBox>
        </Grid>
      </Grid>
      <Grid item lg={9} xs={12} textAlign="justify" id="transcript-panel">
        <h3 style={{ marginBottom: "20px" }}>Transcript of the Lecture</h3>
        <p style={{ lineHeight: "150%" }}>{lecture.transcript}</p>
      </Grid>
      <Grid item lg={3} xs={12}>
        <p></p>
      </Grid>
    </Grid>
  );
}
