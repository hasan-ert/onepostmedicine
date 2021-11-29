import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";

import "../componentCss/MainComponents/IndexPage.css";
import "../componentCss/site.css";
import MediaCard from "../Sub-Components/Cards";

function Home() {
  return (
    <Container maxWidth="100%">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} alignItems="flex-end" id="header-row">
          <img
            alt="header_photo"
            clasasName="cover"
            id="header-photo"
            width="100%"
            style={{ objectFit: "cover" }}
            src="https://www.themedicportal.com/wp-content/uploads/2015/10/Being-a-medical-school-student-2.jpg"
          ></img>
        </Grid>
      </Grid>
      <Grid item xs={12} textAlign="center" marginX="20%" marginY="5%">
        <Typography>
          <h1>Everything you need to learn about medicine is here!</h1>
          <h2>Just signup to become a part of it</h2>
        </Typography>
      </Grid>
      <Grid container spacing={4} justifyContent="center">
        <Grid item lg={4} xs={12} justifyContent="center">
          <MediaCard
            imgSource="https://www.cathaypacific.com/content/dam/focal-point/digital-library/destinations/theme/student/theme_student_08_offer.renditionimage.1700.850.jpg"
            backColor="rgb(50,150,250)"
            contentHeader="Study !"
          ></MediaCard>
        </Grid>
        <Grid item lg={4} xs={12} alignItems="center">
          <MediaCard
            imgSource="https://www.tilburguniversity.edu/sites/default/files/styles/teaser_image_large/public/image/Finalize%20your%20admission.png?h=8abcec71&itok=94ckhG8-"
            backColor="rgb(100,150,99)"
            contentHeader="Study"
          ></MediaCard>
        </Grid>
        <Grid item lg={4} xs={12} justifyContent="center">
          <MediaCard
            backColor="rgb(255, 212, 148)"
            imgSource="https://www.socialsciencespace.com/wp-content/uploads/student-3500990_960_720_opt.jpg"
            contentHeader="Study !"
          ></MediaCard>
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
            to={"/signup"}
            variant="outlined"
            id="sign-up-btn"
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
