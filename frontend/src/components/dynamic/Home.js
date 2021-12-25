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
        {createRow("Name:", data.name)}
        {createRow("Surname:", data.surname)}
        {createRow("University:", data.university)}
        {createRow("Overall Score:", data.overall_score)}
        {data.completed_courses
          ? createRow("Completed Course Number:", data.completed_courses.length)
          : ""}
      </Grid>
    );
}

function HomePanel() {
  const [data, setData] = useState();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    getUserData().then((res) => {
      setData(res);
    });
  }, []);

  useEffect(() => {
    if (data !== undefined)
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
    <Grid item lg={7} marginTop="20px" xs={12} alignItems="center">
          <h1>{data? "Welcome "+ data.name + " " + data.surname + "!": "Welcome"}</h1>
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
            imgSource={data !== undefined ? data.img_url: ""}
            contentHeader=""
            contentHeaderVar="h5"
            content=""
            contentVar="body2"
          ></MediaCard>
          <Button variant={"outlined"} id="org-prof-btn" component={Link} to="/editProfile">
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
    </Grid>
  );
}

function Home() {
  return (
    <Container 
    maxWidth="100%"
    
    >
      <Grid container spacing={2} marginTop="10px">
        <Grid item lg={2} xs={12} alignItems="center">
          <PermanentDrawerLeft></PermanentDrawerLeft>
        </Grid>
        
          <HomePanel />
        
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
