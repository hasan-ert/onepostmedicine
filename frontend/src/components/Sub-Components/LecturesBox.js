import React, { useEffect, useState } from "react";

import { Grid } from "@mui/material";
import "../componentCss/site.css";
import "./css/UnfinishedCourses.css";
import changeURL from "../../helpers/helpers";
import { useHistory } from "react-router";

function CreateRows(data, parentPage, course, history) {
  console.log(data);
  return data.map(function (item) {
    return (
      <Grid
        xs={12}
        className="unfinished-course-row"
        onClick={() =>
          history.push(changeURL("/" + parentPage + "/" + course, item))
        }
      >
        <h1>{item}</h1>
      </Grid>
    );
  });
}

function LecturesBox({ data, parentPage, course }) {
  let history = useHistory();
  let unfinished = [
    { lecture_name: "Course 1" },
    { lecture_name: "Course 2" },
    { lecture_name: "Course 3" },
    { lecture_name: "Course 4" },
    { lecture_name: "Course 5" },
  ];
  const [lectures, setLectures] = useState([]);
  useEffect(() => {
    console.log(data);
    data && data !== undefined ? setLectures(data) : setLectures(unfinished);
  }, [data]);
  return (
    <Grid
      item
      xs={12}
      marginTop="30px"
      height="500px"
      className="unfinished-course-container"
    >
      {CreateRows(lectures, parentPage, course, history)}
    </Grid>
  );
}

export default LecturesBox;
