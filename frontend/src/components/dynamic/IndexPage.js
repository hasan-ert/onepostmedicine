import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid } from "@mui/material";

import "../component/MainComponents/site.css";
import "../component/IndexPage.css";
import MediaCard from "../Sub-Components/Cards";
import Navbar from "./Navbar";

function Home() {
  return (
    <Container maxWidth="100%">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} alignItems="flex-end" id="header-row">
          <img
            alt="header_photo"
            clasasName="cover"
            src="https://www.themedicportal.com/wp-content/uploads/2015/10/Being-a-medical-school-student-2.jpg"
          ></img>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={3} alignItems="center">
          <MediaCard></MediaCard>
        </Grid>
        <Grid item xs={3} justifyContent="center">
          <MediaCard></MediaCard>
        </Grid>
        <Grid item xs={3} justifyContent="center">
          <MediaCard></MediaCard>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        <Grid
          item
          xs={4}
          alignItems="center"
          display="grid"
          marginTop="30px"
          marginBottom="50px"
          height="50px"
          justifyContent="center"
        >
          <Button
            component={Link}
            to={"/home"}
            variant="outlined"
            id="sign-up-btn"
          >
            Outlined
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
