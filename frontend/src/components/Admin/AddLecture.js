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
import { UpEachWord } from "../../helpers/helpers";

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

export default function AddLectures() {
  const [imgList, setImgList] = useState([]);
  const [relatedCourse, setRelatedCourse] = useState({ course_name: "" });
  const [relatedCourseID, setRelatedCourseID] = useState({ course_name: "" });
  const [courses, setCourses] = useState([]);
  const [videoURL, setVideoURL] = useState([]);

  let history = useHistory();

  //collection data
  const lecturesCollectionRef = collection(db, "lectures");

  //Fetch data from the collection
  //While fetching, data is saved into the state as docs to be able to reach its id alognside the data
  //doc.data() method can be used to get the data stored inside
  //doc.id  brings the id of the document
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

  //useEffects
  useEffect(() => {
    getData();
  }, [courses.length]);

  //handler for course selection
  const handleCourseChange = (data, id) => {
    setRelatedCourse(data);
    setRelatedCourseID(id);
  };

  //To be able to reach the document, id is required.
  //Then update the parent course's lectures
  const updateCourse = async (lectureName) => {
    const coursesCollectionRef = doc(db, "courses", relatedCourseID);
    try {
      let lectures = relatedCourse.lectures;
      lectures = [...lectures, lectureName];
      console.log(relatedCourse, lectures);
      await updateDoc(coursesCollectionRef, { lectures: lectures });
      alert("Lecture is added");
    } catch (err) {
      console.log(err);
    }
  };

  //inserting the lecture created into the database
  //lectures collection
  const createLecture = async (event) => {
    event.preventDefault();
    console.log(event.currentTarget);
    if (videoURL[0] === undefined) {
      alert("Please add a video");
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log(data.get("lectureName"));
    console.log(relatedCourse);
    try {
      let q = query(
        lecturesCollectionRef,
        where("lecture_name", "==", UpEachWord(data.get("lectureName"))),
        where("parent_category", "==", UpEachWord(relatedCourse.course_name))
      );

      let querySnapshot = await getDocs(q);

      querySnapshot.forEach((element) => {
        console.log(element.data());
      });

      if (querySnapshot.docs !== undefined && querySnapshot.docs.length > 0) {
        console.log(querySnapshot.docs);
        alert(
          "A lecture with the same name exists! Please choose another name"
        );
        return;
      }

      await addDoc(lecturesCollectionRef, {
        lecture_name: UpEachWord(data.get("lectureName")),
        parent_category: relatedCourse.course_name,
        transcript: data.get("transcript"),
        video_url: videoURL,
      });
      updateCourse(data.get("lectureName"));

      history.push("/addLecture");
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
            onSubmit={(event) => createLecture(event)}
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
                <InputLabel id="lectureName">Lecture Name</InputLabel>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="lectureName"
                  label="Lecture Name"
                  type="text"
                  id="lectureName"
                />
              </Grid>
              <Grid item xs={12} lg={12} marginTop="5%">
                <InputLabel id="lectureName">Transcript</InputLabel>
                <TextField
                  margin="normal"
                  multiline
                  rows={9}
                  fullWidth
                  name="transcript"
                  label="Transcript"
                  type="text"
                  id="transcript"
                />
              </Grid>

              <Grid item xs={12} lg={12} textAlign="center">
                <MediaUploader
                  parentImageList={videoURL}
                  setParentImageList={setVideoURL}
                ></MediaUploader>
              </Grid>
              <Grid item xs={12} lg={12} textAlign="center">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, width: "40%" }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
