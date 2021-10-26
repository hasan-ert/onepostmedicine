import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid } from "@mui/material";

import "../component/MainComponents/site.css";
import "../component/IndexPage.css";
import MediaCard from "../Sub-Components/Cards";
import UnfinishedCourses from "../Sub-Components/UnfinishedCourses";

function Home() {
  return (
    <Container maxWidth="100%">
      <Grid container spacing={2} marginTop="10px">
        <Grid item lg={3} xs={12} alignItems="center">
          <MediaCard></MediaCard>
        </Grid>
        <Grid item lg={3} xs={12} justifyContent="center">
          <MediaCard></MediaCard>
        </Grid>
        <Grid item lg={3} xs={12} justifyContent="center">
          <MediaCard></MediaCard>
        </Grid>
        <Grid item lg={3} xs={12} justifyContent="center" display="flex">
          <UnfinishedCourses></UnfinishedCourses>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center"></Grid>
    </Container>
  );
}

export default Home;
