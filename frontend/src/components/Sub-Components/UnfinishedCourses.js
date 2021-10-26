import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid } from "@mui/material";
import "../component/MainComponents/site.css";
import "./css/UnfinishedCourses.css";
function UnfinishedCourses() {
  let unfinished = [{ courseName: "deneme1" }, { courseName: "deneme2" }];
  return (
    <Grid container margin="20px" className="unfinished-course-container">
      <Grid
        xs={12}
        className="unfinished-course-row"
        onClick={() => alert(unfinished[0].courseName)}
      >
        <h1>{unfinished[0].courseName}</h1>
      </Grid>
      <Grid
        xs={12}
        className="unfinished-course-row"
        onClick={() => alert(unfinished[1].courseName)}
      >
        <h1>{unfinished[1].courseName}</h1>
      </Grid>
    </Grid>
  );
}

export default UnfinishedCourses;
