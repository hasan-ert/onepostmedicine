import React, { useState, useEffect } from "react";

import { Container, Grid, Box, TextField, Button } from "@mui/material";
import MediaUploader from "../../helpers/CloudinaryWidget";

import { UpEachWord } from "../../helpers/helpers";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";
import { db } from "../../constants/firebase-config";
import { auth } from "../../constants/firebase-config";

import { useHistory } from "react-router";

export default function AddCourses() {
  const [imgList, setImgList] = useState([]);

  let history = useHistory();
  const usersCollectionRef = collection(db, "courses");

  const createCourse = async (event) => {
    event.preventDefault();
    console.log(event.currentTarget);
    const data = new FormData(event.currentTarget);
    console.log(data.get("course_name"));

    try {
      await addDoc(usersCollectionRef, {
        course_name: UpEachWord(data.get("course_name")),
        quiz_id: "",
        video_num: "",
        imgURL: imgList[0]
          ? imgList[0]
          : "https://img.freepik.com/free-photo/top-view-white-office-desk-table-with-copy-space-flat-lay_14098-383.jpg?size=626&ext=jpg",
        lectures: [],
      });
      alert("Course is added");
      history.push("/addCourse");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <Grid container padding="10%">
        <Grid item xs={12} lg={12}>
          <Box
            component="form"
            noValidate
            onSubmit={(event) => createCourse(event)}
            sx={{ mt: 1 }}
          >
            <Grid container paddingX="20%">
              <Grid item xs={12} lg={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="course_name"
                  label="Course Name"
                  type="text"
                  id="course_name"
                />
              </Grid>

              <Grid item xs={12} lg={12} textAlign="center">
                <MediaUploader
                  parentImageList={imgList}
                  setParentImageList={setImgList}
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
