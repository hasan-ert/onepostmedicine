import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";

import PermanentDrawerLeft from "../Sub-Components/SideBar";

import "../componentCss/site.css";
import "../componentCss/MainComponents/Home.css";
import MediaCard from "../Sub-Components/Cards";
import UnfinishedCourses from "../Sub-Components/UnfinishedCourses";
import { getAdditionalUserInfo } from "firebase/auth";
import { getUserData } from "../../api/user.API";
import { auth } from "../../constants/firebase-config";

function createRow(lbl, data) {
  return (
    <Grid container marginTop="20px">
      <Grid item lg={6} md={6} xs={6} textAlign="left">
        <Grid container>
          <Grid item xs={11}>
            <Typography>
              <h3>{lbl}</h3>
            </Typography>
          </Grid>
          <Grid xs={1}>
            <h3>:</h3>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={6} md={6} xs={6}>
        <Typography>
          <h3>{data}</h3>
        </Typography>
      </Grid>
    </Grid>
  );
}

function createDataRows(data) {
  console.log(data);

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
      {createRow("Name:", data.name)}
      {createRow("Surname:", data.surname)}
      {createRow("University:", data.university)}
      {createRow("Overall Score:", data.overall_score)}
      {createRow("Completed Course Number:", data.completed_courses.length)}
    </Grid>
  );
}

function HomePanel() {
  const [data, setData] = useState({
    University: "Sabanci University",
    Grade: 4,
    "Started Courses": 10,
    "Overall Score": 3.67,
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    getUserData().then((res) => {
      setData(res);
    });
  }, []);

  useEffect(() => {
    if (
      data.completed_courses &&
      data.unfinished_courses &&
      data.completed_courses.length + data.unfinished_courses.length > 0
    ) {
      setProgress(
        data.completed_courses.length /
          (data.completed_courses.length + data.unfinished_courses.length)
      );
    } else {
      setProgress(0);
    }

    console.log(progress);
  }, [data]);
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
            imgSource="data:image/jpeg;base64,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"
            contentHeader="Hasan Ertugrul Cinar"
            contentHeaderVar="h5"
            content="Sabanci University"
            contentVar="body2"
          ></MediaCard>
          <Button variant={"outlined"} id="org-prof-btn">
            Organize Profile
          </Button>
        </Grid>
        {createDataRows(data)}
      </Grid>
      <Grid
        marginTop="20px"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Typography>
          <h2>Progression in Courses</h2>
        </Typography>
        <Grid
          item
          border="solid"
          borderColor="rgb(100,250,0)"
          borderRadius="20px"
        >
          <Grid
            xs={12}
            item
            bgcolor="rgb(100,250,0)"
            height="25px"
            borderRadius="20px"
            boxShadow=" rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"
            width={progress * 100 + "%"}
          >
            <Typography textAlign="center" boxShadow="">
              <h3>{Math.round(100 * progress) + "%"}</h3>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function Home() {
  return (
    <Container maxWidth="100%">
      <Grid container spacing={2} marginTop="10px">
        <Grid item lg={2} xs={12} alignItems="center">
          <PermanentDrawerLeft></PermanentDrawerLeft>
        </Grid>
        <Grid item lg={7} marginTop="20px" xs={12} alignItems="center">
          <h1>Welcome Hasan Ertugrul!</h1>
          <HomePanel />
        </Grid>
        <Grid item lg={3} xs={12} marginTop="20px" textAlign="center">
          <h2>Unfinished Courses</h2>
          <Grid item display="flex">
            <UnfinishedCourses></UnfinishedCourses>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
