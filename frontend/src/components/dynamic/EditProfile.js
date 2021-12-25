import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Box,
  InputLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import PermanentDrawerLeft from "../Sub-Components/SideBar";

import "../componentCss/site.css";
import "../componentCss/MainComponents/Home.css";
import MediaCard from "../Sub-Components/Cards";
import UnfinishedCourses from "../Sub-Components/UnfinishedCourses";
import { getAdditionalUserInfo } from "firebase/auth";
import { getUserData, updateUserData } from "../../api/user.API";
import { auth } from "../../constants/firebase-config";
import { grid } from "@mui/system";
import MediaUploader from "../../helpers/CloudinaryWidget";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function EditProfile() {
  const history = useHistory();
  const [data, setData] = useState();
  const [imgUrl, setImgUrl] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    getUserData().then((res) => {
      setData(res);
    });
  }, []);

  function createRow(lbl, data) {
    return (
      <Grid container marginTop="20px">
        <Grid item lg={6} md={6} xs={6} textAlign="left">
          <Grid container>
            <Grid item xs={11}>
              <Typography variant="h5">{lbl}</Typography>
            </Grid>
            <Grid item xs={1}>
              <h3>:</h3>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} md={6} xs={6}>
          {data}
        </Grid>
      </Grid>
    );
  }

  function createDataRows(data) {
    if (data !== undefined)
      return (
        <Grid
          item
          lg={8}
          xs={12}
          padding="16px"
          marginX="0"
          alignItems="center"
          justifyContent="center"
          className="user-data-row"
          bgcolor="rgba(139,0,139,0.6)"
        >
          <Box
            component="form"
            noValidate
            onSubmit={(event) => submitForm(event)}
            sx={{ mt: 1 }}
          >
            {createRow(
              "Name:",
              <TextField name="name" defaultValue={data.name}></TextField>
            )}
            {createRow(
              "Surname:",
              <TextField name="surname" defaultValue={data.surname}></TextField>
            )}
            {createRow(
              "University:",
              <TextField
                name="university"
                defaultValue={data.university}
              ></TextField>
            )}
            {createRow("Overall Score:", data.overall_score)}
            {data.completed_courses
              ? createRow(
                  "Completed Course Number:",
                  data.completed_courses.length
                )
              : ""}
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <Button variant={"outlined"} type="submit" id="org-prof-btn">
                Save Changes
              </Button>
            </div>
          </Box>
        </Grid>
      );
  }

  const submitForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let temp = data;
    temp.name = formData.get("name");
    temp.surname = formData.get("surname");
    temp.university = formData.get("university");
    if (imgUrl.length > 0) temp.img_url = imgUrl[0];

    updateUserData(temp).then((res) => {
      history.push("/");
    });
  };

  return (
    <Grid>
      <Grid
        className="user-panel"
        container
        marginTop="20px"
        borderRadius="10px"
        border="solid"
        borderColor="rgba(139,0,139,0.6)"
      >
        <Grid
          item
          lg={4}
          xs={12}
          padding="16px"
          marginX="0"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          bgcolor="rgba(139,0,139,0.6)"
        >
          <MediaCard
            imgSource={data ? data.img_url : ""}
            contentHeader=""
            contentHeaderVar="h5"
            content=""
            contentVar="body2"
          ></MediaCard>
          <MediaUploader
            parentImageList={imgUrl}
            setParentImageList={setImgUrl}
          ></MediaUploader>
        </Grid>
        {createDataRows(data)}
      </Grid>
    </Grid>
  );
}
