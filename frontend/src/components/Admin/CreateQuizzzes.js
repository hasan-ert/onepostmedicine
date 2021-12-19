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

import MediaUploader from "../../helpers/CloudinaryWidget";

import UpEachWord from "../../helpers/helpers";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";
import { db } from "../../constants/firebase-config";
import { auth } from "../../constants/firebase-config";

import { useHistory } from "react-router";

export default function AddQuizzes() {
    const [relatedCourse, setRelatedCourse] = useState({ course_name: "" });
    const [relatedCourseID, setRelatedCourseID] = useState({ course_name: "" });
    const [courses, setCourses] = useState([]);
    const [val, setVal] = useState();

  let history = useHistory();
  const quizzesRef = collection(db, 'quizzes');

  const getData = async () => {
    const dataArray = [];
    const querySnapshot = await getDocs(collection(db, "courses"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      dataArray.push(doc);
    });
    console.log(dataArray[0].data());
    setCourses(dataArray);
  };

  useEffect(() => {
    getData();
  }, [courses.length]);

   //handler for course selection
    const handleCourseChange = (data, id) => {
    setRelatedCourse(data);
    setRelatedCourseID(id);
  };

  
  const createQuizzes = async (event) => {
    event.preventDefault();
    console.log(event.currentTarget);
    const data = new FormData(event.currentTarget);
    try {
      console.log(relatedCourse.course_name)
      await addDoc(quizzesRef, {
        parent_course: relatedCourse.course_name,
        questions: [
          
        ],
      });
      alert("Quizz is created");
      setVal(() => "")
    } catch (error) {
      console.log(error.message);
    }
  };
   //Dynamically creating the courses for select box
   function createSelectCourse() {
    return courses && courses.length !== 0
      ? courses.map(function (course) {
          return (
            <MenuItem
              value={course.data().course_name}
              onClick={() => handleCourseChange(course.data(), course.id)}
            >
              {course.data().course_name}
            </MenuItem>
          );
        })
      : "";
  }
  const renderValue = (value) => {
    return value && value[0];
  };

  return (
    <Container>
      <Grid container padding="10%">
        <Grid item xs={12} lg={12}>
          <Box
            component="form"
            noValidate
            onSubmit={(event) => createQuizzes(event)}
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
              <Grid item xs={12} lg={12} textAlign="center">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width: "40%" }}
                >
                  Create quizzes
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
