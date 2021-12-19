import React, { useState, useEffect } from "react";

import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  useTheme,
} from "@mui/material";

import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../../constants/firebase-config";
import { auth } from "../../constants/firebase-config";

import { getAllCourses, updateCourseLectures } from "../../api/course.API";

import { useHistory } from "react-router";
import { UpEachWord } from "../../helpers/helpers";
import { async } from "@firebase/util";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function DeleteLectures() {
  const [imgList, setImgList] = useState([]);
  const [lecture, setLecture] = useState({ data: { lecture_name: "" } });
  const [relatedCourse, setRelatedCourse] = useState({ course_name: "" });
  const [relatedCourseID, setRelatedCourseID] = useState({ course_name: "" });
  const [courses, setCourses] = useState([]);
  const [allLectures, setAllLectures] = useState([]);
  const [videoURL, setVideoURL] = useState([]);

  let history = useHistory();

  //collection data
  const lecturesCollectionRef = collection(db, "lectures");

  //useEffects
  useEffect(() => {
    getAllCourses().then((res) => handleCourses(res));
  }, [courses.length]);

  useEffect(() => {
    console.log(courses);
    getAllLectures();
  }, [relatedCourse]);

  //handler for course selection
  const handleCourseChange = (data, id) => {
    setRelatedCourse(data);
    setRelatedCourseID(id);
  };

  const handleCourses = (temp) => {
    setCourses(temp);
  };

  const handleLectureChange = (data) => {
    setLecture(data);
  };

  const getAllLectures = async () => {
    let q = query(
      lecturesCollectionRef,
      where("parent_category", "==", relatedCourse.course_name)
    );
    let querySnapshot = await getDocs(q);
    let dataList = [];
    querySnapshot.forEach((element) => {
      dataList.push({ data: element.data(), id: element.id });
    });
    setAllLectures(dataList);
  };

  //inserting the lecture created into the database
  //lectures collection
  const deleteLecture = async (event) => {
    event.preventDefault();
    console.log(lecture.id);

    try {
      let q = query(
        lecturesCollectionRef,
        where("lecture_name", "==", UpEachWord(lecture.data.lecture_name)),
        where("parent_category", "==", UpEachWord(relatedCourse.course_name))
      );

      let querySnapshot = await getDocs(q);

      querySnapshot.forEach((element) => {
        deleteDoc(element.ref);

        let newLectures = relatedCourse.lectures.filter(
          (item) => item !== lecture.data.lecture_name
        );
        console.log(newLectures);
        updateCourseLectures(lecture.id, newLectures, relatedCourseID)
          .then((res) => alert("Successfully deleted"))
          .catch((err) => alert("An error occured during deletion"));
      });

      history.push("/deleteLectures");
    } catch (error) {
      console.log(error.message);
    }
  };

  //Dynamically creating the courses for select box
  function createSelectCourse() {
    console.log(relatedCourse);
    return courses && courses.length !== 0
      ? courses.map(function (course) {
          return (
            <MenuItem
              value={course.data.course_name}
              onClick={() => handleCourseChange(course.data, course.id)}
            >
              {course.data.course_name}
            </MenuItem>
          );
        })
      : "";
  }
  const renderValue = (value) => {
    return value && value[0];
  };

  function createSelectLecture() {
    return allLectures && allLectures.length !== 0
      ? allLectures.map(function (item) {
          return (
            <MenuItem
              value={item.data.lecture_name}
              onClick={() => handleLectureChange(item)}
            >
              {item.data.lecture_name}
            </MenuItem>
          );
        })
      : "";
  }

  return (
    <Container>
      <Grid container padding="10%">
        <Grid item xs={12} lg={12}>
          <Box
            component="form"
            noValidate
            onSubmit={(event) => deleteLecture(event)}
            sx={{ mt: 1 }}
          >
            <Grid container paddingX="20%">
              <Grid item xs={12} lg={12} xl={12}>
                <InputLabel id="demo-simple-select-label">
                  Parent Course
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={relatedCourse.course_name}
                  label="Courses"
                  sx={{ width: "100%" }}
                  onChange={() => {}}
                >
                  {createSelectCourse()}
                </Select>
              </Grid>
            </Grid>
            <Grid container paddingX="20%">
              <Grid item xs={12} lg={12} xl={12}>
                <InputLabel id="demo-simple-select-label">
                  Parent Course
                </InputLabel>
                <Select
                  labelId="demo-lecture-select-label"
                  id="demo-lecture-select"
                  value={lecture.data.lecture_name}
                  label="Lectures"
                  sx={{ width: "100%" }}
                >
                  {createSelectLecture()}
                </Select>
              </Grid>

              <Grid item xs={12} lg={12} textAlign="center">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width: "40%" }}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
