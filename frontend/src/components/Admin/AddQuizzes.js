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
import { db } from "../../constants/firebase-config";
import { auth } from "../../constants/firebase-config";

import { useHistory } from "react-router";

export default function AddQuizzes() {
  const [relatedCourse, setRelatedCourse] = useState({ course_name: "" });
  const [relatedCourseID, setRelatedCourseID] = useState({ course_name: "" });
  const [courses, setCourses] = useState([]);
  const [val, setVal] = useState();
  const [quiz, setQuiz] = useState();

  let history = useHistory();
  const quizzesRef = collection(db, "quizzes");

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

  const getQuizRef = async (coursename) => {
    let q = query(
      collection(db, "quizzes"),
      where("parent_course", "==", coursename)
    );
    let querySnapshot = await getDocs(q);
    let courseRef;
    querySnapshot.forEach((element) => {
      courseRef = element;
    });
    setQuiz(courseRef);
  };

  useEffect(() => {
    getData();
  }, [courses.length]);

  //handler for course selection
  const handleCourseChange = (data, id) => {
    setRelatedCourse(data);
    setRelatedCourseID(id);
    getQuizRef(data.course_name);
  };

  const addQuizzes = async (event) => {
    event.preventDefault();
    console.log(event.currentTarget);
    const data = new FormData(event.currentTarget);
    console.log(relatedCourse.course_name);
    const quizColectionref = doc(db, "quizzes", quiz.id);
    try {
      let questions = quiz.data().questions;
      questions = [
        ...questions,
        {
          questionText: data.get("que"),
          answerOptions: [
            { answerText: data.get("option1"), isCorrect: false },
            { answerText: data.get("option2"), isCorrect: false },
            { answerText: data.get("option3"), isCorrect: false },
            { answerText: data.get("answer"), isCorrect: true },
          ],
        },
      ];
      console.log(relatedCourse, questions);
      await updateDoc(quizColectionref, { questions: questions });
      alert("quiz is added");
    } catch (err) {
      console.log(err);
    }
    getQuizRef(relatedCourse.course_name);
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
            onSubmit={(event) => addQuizzes(event)}
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

              <Grid item xs={12} lg={12} marginTop="5%">
                <InputLabel id="que">Que</InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="que"
                  label="que"
                  type="text"
                  id="que"
                  value={val}
                />
              </Grid>
              <Grid item xs={12} lg={12} marginTop="5%">
                <InputLabel id="option1">Option1</InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="option1"
                  label="option1"
                  type="text"
                  id="option1"
                  value={val}
                />
              </Grid>
              <Grid item xs={12} lg={12} marginTop="5%">
                <InputLabel id="option2">Option2</InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="option2"
                  label="option2"
                  type="text"
                  id="option2"
                  value={val}
                />
              </Grid>
              <Grid item xs={12} lg={12} marginTop="5%">
                <InputLabel id="option3">Option3</InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="option3"
                  label="option3"
                  type="text"
                  id="option3"
                  value={val}
                />
              </Grid>
              <Grid item xs={12} lg={12} marginTop="5%">
                <InputLabel id="answer">Answer</InputLabel>
                <TextField
                  margin="normal"
                  multiline
                  rows={9}
                  fullWidth
                  name="answer"
                  label="Answer"
                  type="text"
                  id="answer"
                  value={val}
                />
              </Grid>
              <Grid item xs={12} lg={12} textAlign="center">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width: "40%" }}
                >
                  Add quizes
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
