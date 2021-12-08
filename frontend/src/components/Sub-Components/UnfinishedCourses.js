import React from "react";

import { Grid } from "@mui/material";
import "../componentCss/site.css";
import "./css/UnfinishedCourses.css";
import changeURL from "../../helpers/helpers";
import { Link, useHistory } from "react-router-dom";
function CreateRows(data, history) {
  return data.map(function (item) {
    return (
      <Grid
        xs={12}
        className="unfinished-course-row"
        onClick={() => history.push(changeURL("/lecture", item.courseName))}
      >
        <h1>{item.courseName}</h1>
      </Grid>
    );
  });
}

function UnfinishedCourses({ data, parentPage }) {
  let history = useHistory();
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
      {CreateRows(unfinished, history)}
    </Grid>
  );
}

export default UnfinishedCourses;
