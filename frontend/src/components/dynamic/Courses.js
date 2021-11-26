import * as React from "react";
import { useHistory } from "react-router-dom";
import { Grid } from "@mui/material";
import MediaCard from "../Sub-Components/Cards";
import "../componentCss/MainComponents/Courses.css";
import {createURL} from "../../helpers/helpers";

function createCardRows(data, history) {
  const changeURL = (courseName) => {
    history.push(createURL("/lecture", courseName));
  };
  return data.map(function (item) {
    return (
      <Grid item xs={12} lg={4} md={6} display="flex">
        <MediaCard
          onClickHandler={changeURL}
          cssClass="floating-card"
          imgSource={item.imgSource}
          contentHeader={item.contentHeader}
          contentHeaderVar="20pt"
          backColor={item.backColor ? item.backColor : "rgb(50, 100, 139)"}
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
        "https://img.freepik.com/free-photo/top-view-white-office-desk-table-with-copy-space-flat-lay_14098-383.jpg?size=626&ext=jpg",
      contentHeader: "DenemeDenemeDenemeDenemeDenemeDenemeDeneme",
      content: "deneme deneme deneme",
    },
    {
      imgSource:
        "https://img.freepik.com/free-photo/top-view-white-office-desk-table-with-copy-space-flat-lay_14098-383.jpg?size=626&ext=jpg",
      contentHeader: "Denemeee",
      content: "deneme deneme deneme",
    },
    {
      imgSource:
        "https://img.freepik.com/free-photo/top-view-white-office-desk-table-with-copy-space-flat-lay_14098-383.jpg?size=626&ext=jpg",
      contentHeader: "Denemeee",
      content: "deneme deneme deneme",
    },
    {
      imgSource:
        "https://img.freepik.com/free-photo/top-view-white-office-desk-table-with-copy-space-flat-lay_14098-383.jpg?size=626&ext=jpg",
      contentHeader: "Denemeee",
      content: "deneme deneme deneme",
    },

    {
      imgSource:
        "https://img.freepik.com/free-photo/top-view-white-office-desk-table-with-copy-space-flat-lay_14098-383.jpg?size=626&ext=jpg",
      contentHeader: "Denemeee",
      content: "deneme deneme deneme",
    },
    {
      imgSource:
        "https://images.pexels.com/photos/434337/pexels-photo-434337.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      contentHeader: "Denemeeeeeeeeeeeeeeeeeeeeee",
      content: "deneme deneme deneme",
      backColor: "rgb(50,100,139)",
    },
  ];
  return (
    <Grid container marginTop="3rem" padding="3rem">
      <Grid item xs={12}>
        <Typography
          fontSize="5vw"
          style={{ wordBreak: "break-word" }}
          textAlign="center"
          marginBottom="3%"
        >
          Pick a course to start your learning experience!
        </Typography>
      </Grid>

      {createCardRows(data, history)}
    </Grid>
  );
}
