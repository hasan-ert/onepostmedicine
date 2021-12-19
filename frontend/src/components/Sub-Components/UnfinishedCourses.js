import React, { useEffect, useState } from "react";

import { Grid } from "@mui/material";
import "../componentCss/site.css";
import "./css/UnfinishedCourses.css";
import changeURL, { createURL } from "../../helpers/helpers";
import { Link, useHistory } from "react-router-dom";
import { getUserData } from "../../api/user.API";
import { getCourseData } from "../../api/course.API";

function CreateRows(data, history) {
  const prepareURL = async (coursename) => {
    getCourseData(coursename).then((res) =>
      history.push(createURL("/lecture/" + res.course_name, res.lectures[0]))
    );
  };
  return data.map(function (item) {
    return (
      <Grid
        xs={12}
        className="unfinished-course-row"
        onClick={() => prepareURL(item)}
      >
        <h1>{item}</h1>
      </Grid>
    );
  });
}

function UnfinishedCourses({ data, parentPage }) {
  let history = useHistory();
  const [unfinished, setUnfinished] = useState();
  useEffect(() => {
    getUserData().then((res) => {
      setUnfinished(res.unfinished_courses);
    });
  }, [data]);

  return (
    <Grid
      item
      xs={12}
      marginTop="30px"
      height="500px"
      className="unfinished-course-container"
    >
      {unfinished ? CreateRows(unfinished, history) : ""}
    </Grid>
  );
}

export default UnfinishedCourses;
