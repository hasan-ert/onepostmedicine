import * as React from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Button, Grid } from "@mui/material";
import MediaCard from "../Sub-Components/Cards";
import "../componentCss/MainComponents/Courses.css";

function createCardRows(data, history) {
  const changeURL = (courseName) => {
    history.push("/courses/" + courseName.toLowerCase().replaceAll(" ", "-"));
  };
  return data.map(function (item) {
    return (
      <Grid item xs={12} lg={4}>
        <MediaCard
          onClickHandler={changeURL}
          cssClass="floating-card"
          imgSource={item.imgSource}
          content={item.content}
          contentHeader={item.contentHeader}
          contentHeaderVar="h3"
          contentVar="body2"
        ></MediaCard>
      </Grid>
    );
  });
}

export default function Courses({ authHandler }) {
  let history = useHistory();
  const data = [
    {
      imgSource:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y291cnNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
      contentHeader: "Denemeee",
      content: "deneme deneme deneme",
    },
    {
      imgSource:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y291cnNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
      contentHeader: "Denemeee",
      content: "deneme deneme deneme",
    },
    {
      imgSource:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y291cnNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
      contentHeader: "Denemeee",
      content: "deneme deneme deneme",
    },
    {
      imgSource:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y291cnNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
      contentHeader: "Denemeee",
      content: "deneme deneme deneme",
    },
    {
      imgSource:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y291cnNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
      contentHeader: "Denemeee",
      content: "deneme deneme deneme",
    },
    {
      imgSource:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y291cnNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
      contentHeader: "Denemeee",
      content: "deneme deneme deneme",
    },
  ];
  return (
    <Grid container marginTop="5rem" padding="3rem">
      {createCardRows(data, history)}
    </Grid>
  );
}
