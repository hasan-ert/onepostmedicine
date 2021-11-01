import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ReactPlayer from "react-player";
import "../componentCss/site.css";
import "../componentCss/MainComponents/Lecture.css";
import videojs from "video.js";
import UnfinishedCourses from "../Sub-Components/UnfinishedCourses";
export default function Lecture() {
  useEffect(() => {
    console.log(
      ReactPlayer.canPlay(
        "https://res.cloudinary.com/da8slr0ic/video/upload/v1635784967/VideoTrial/lightsaber_rjxjyd.mp4"
      )
    );
  }, []);
  return (
    <Grid container spacing={2} marginTop="20px">
      <Grid item lg={9} xs={12} justifyContent="center" textAlign="center">
        <video
          class="video-js vjs-default-skin"
          controls
          preload="auto"
          width="1920"
          height="1080"
        >
          <source
            src="https://res.cloudinary.com/da8slr0ic/video/upload/v1635784967/VideoTrial/lightsaber_rjxjyd.mp4"
            type="video/mp4"
          ></source>
        </video>
      </Grid>
      <Grid item lg={3} xs={12} textAlign="center">
        <h2>Unfinished Courses</h2>
        <Grid item display="flex">
          <UnfinishedCourses></UnfinishedCourses>
        </Grid>
      </Grid>
    </Grid>
  );
}
