import { Grid, Button, Container } from "@mui/material";
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
import createURL, { UpEachWord } from "../../helpers/helpers";
import { getCourseData } from "../../api/course.API";
import { getUserData } from "../../api/user.API";

export default function Lecture() {
  //States
  const [lecture, setLecture] = useState({
    lecture_name: "",
    transcript: "",
    parent_category: "",
    video_url: [""],
  });
  const [course, setCourse] = useState({ lectures: [] });
  const [allLectures, setAllLectures] = useState([]);
  const [userData, setUserData] = useState({ completed_courses: [] });
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
    getCourseData(coursename).then((res) => {
      setCourse(res);
    });
    getUserData().then((res) => {
      setUserData(res);
    });
  }, [name]);

  useEffect(() => {
    getALLLectureData();
  }, [lecture.parent_category]);

  useEffect(() => {
    if (!userData.completed_courses.includes(coursename))
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
  const is_completed = () => {
    if (userData.completed_courses.includes(coursename)) return true;
    return false;
  };
  function renderPage() {
    if (is_completed()) {
      return (
        <Grid item lg={12} xs={12} textAlign="center">
          <h1>You successfully completed this course!</h1>
        </Grid>
      );
    } else {
      return (
        <Grid container maxWidth={"100%"}>
          <Grid
            item
            lg={9}
            xs={12}
            justifyContent="center"
            textAlign="center"
            marginBottom="20px"
          >
            <h1>{lecture.lecture_name}</h1>
          </Grid>
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
            <Grid item textAlign="center">
              {lecture.lecture_name ===
              course.lectures[course.lectures.length - 1] ? (
                <Button
                  marginTop="50px"
                  variant="contained"
                  width="300%"
                  style={{
                    backgroundColor: "rgb(139,0,139)",
                    width: "50%",
                    padding: "10px",
                  }}
                  href={createURL("/quiz/" + coursename, "deneme")}
                >
                  Go to Quiz!
                </Button>
              ) : (
                ""
              )}
            </Grid>
            <h3 style={{ marginTop: "50px", marginBottom: "20px" }}>
              Transcript of the Lecture
            </h3>
            <p style={{ lineHeight: "150%" }}>{lecture.transcript}</p>
          </Grid>
          <Grid item lg={3} xs={12} textAlign={"center"}></Grid>
        </Grid>
      );
    }
  }
  return (
    <Grid container spacing={3} marginTop="20px">
      {renderPage()}
    </Grid>
  );
}
