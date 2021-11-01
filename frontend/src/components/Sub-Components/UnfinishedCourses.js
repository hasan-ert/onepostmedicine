import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";
import "../componentCss/site.css";
import "./css/UnfinishedCourses.css";

function CreateRows(data) {
  return data.map(function (item) {
    return (
      <Grid
        xs={12}
        className="unfinished-course-row"
        onClick={() => alert(item.courseName)}
      >
        <h1>{item.courseName}</h1>
      </Grid>
    );
  });
}

function UnfinishedCourses() {
  let unfinished = [
    { courseName: "Course 1" },
    { courseName: "Course 2" },
    { courseName: "Course 3" },
    { courseName: "Course 4" },
    { courseName: "Course 5" },
  ];
  return (
    <Grid
      item
      xs={12}
      marginTop="30px"
      height="500px"
      className="unfinished-course-container"
    >
      {CreateRows(unfinished)}
    </Grid>
  );
}

export default UnfinishedCourses;
