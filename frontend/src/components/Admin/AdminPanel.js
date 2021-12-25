import { Container, Grid } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ArticleIcon from "@mui/icons-material/Article";
import "../componentCss/Admin/AdminPanel.css";

import { Link } from "react-router-dom";
export default function AdminPanel() {
  return (
    <Container maxWidth="100">
      <Grid container xs={12} marginTop="5rem">
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          xl={4}
          padding="10px"
          textAlign="center"
        >
          <Link to="/addQuizzes">
            <div
              className="admin-card"
              style={{ backgroundColor: "rgb(119,84,215)", color: "white" }}
            >
              <EditIcon fontSize="large"></EditIcon>
              <h2>Quizzes</h2>
            </div>
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          xl={4}
          padding="10px"
          textAlign="center"
        >
          <Link to="/addLecture">
            <div className="admin-card">
              <OndemandVideoIcon fontSize="large"></OndemandVideoIcon>
              <h2>Lectures</h2>
            </div>
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          xl={4}
          padding="10px"
          textAlign="center"
        >
          <Link to="/addCourse">
            <div className="admin-card">
              <ArticleIcon fontSize="large"></ArticleIcon>
              <h2>Courses</h2>
            </div>
          </Link>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          xl={4}
          padding="10px"
          textAlign="center"
        >
          <Link to="/displayUsers">
            <div className="admin-card">
              <ArticleIcon fontSize="large"></ArticleIcon>
              <h2>Users</h2>
            </div>
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          xl={4}
          padding="10px"
          textAlign="center"
        >
          <Link to="/deleteLecture">
            <div className="admin-card">
              <EditIcon fontSize="large"></EditIcon>
              <h2>Delete Lecture</h2>
            </div>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
