import { Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ReactPlayer from "react-player";
import "../componentCss/site.css";
import "../componentCss/MainComponents/Lecture.css";
import videojs from "video.js";
import UnfinishedCourses from "../Sub-Components/UnfinishedCourses";
export default function Lecture() {
  useEffect(() => {
    console.log(
      ReactPlayer.canPlay(
        "https://res.cloudinary.com/da8slr0ic/video/upload/v1635784967/VideoTrial/lightsaber_rjxjyd.mp4"
      )
    );
  }, []);
  return (
    <Grid container spacing={3} marginTop="20px">
      <Grid item lg={9} xs={12} justifyContent="center" textAlign="center">
        <video
          class="video-js vjs-default-skin"
          controls
          preload="auto"
          width="1920"
          height="1080"
        >
          <source
            src="https://res.cloudinary.com/da8slr0ic/video/upload/v1635884637/VideoTrial/VID_20170623_143233_vkja1h.mp4"
            type="video/mp4"
          ></source>
        </video>
      </Grid>
      <Grid item lg={3} xs={12} textAlign="center">
        <h2>Lectures</h2>
        <Grid item display="flex">
          <UnfinishedCourses></UnfinishedCourses>
        </Grid>
      </Grid>
      <Grid item lg={9} xs={12} textAlign="justify" id="transcript-panel">
        <h3 style={{ marginBottom: "20px" }}>Transcript of the Lecture</h3>
        <p style={{ lineHeight: "150%" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas urna
          mauris, gravida nec tellus sed, fermentum euismod felis. Curabitur
          porttitor efficitur urna, eu consequat ligula vulputate at. Etiam sed
          velit nec neque condimentum eleifend. Mauris hendrerit eros sit amet
          enim vestibulum, id blandit tortor condimentum. Donec lacinia sagittis
          velit, in malesuada tellus facilisis nec. Vestibulum ante ipsum primis
          in faucibus orci luctus et ultrices posuere cubilia curae; Morbi
          ultrices tortor libero. Duis aliquam orci tristique purus consequat,
          in aliquet dolor ultrices. Nam maximus pharetra urna. Sed molestie
          magna sit amet nisl dignissim, ac commodo lacus rhoncus. Sed vel lacus
          nec nisl tincidunt tempor. Quisque sit amet iaculis enim. Aliquam erat
          volutpat. Nulla luctus purus neque, condimentum cursus nunc gravida
          at. Cras sed turpis in felis ultrices convallis et sed sem. In ac quam
          augue. Maecenas pellentesque metus in arcu molestie, convallis
          consectetur neque mattis. Cras sit amet magna suscipit, congue velit
          sit amet, viverra orci. Integer rutrum vulputate ante, vitae dictum mi
          aliquet vel. Sed lobortis dui vitae diam sagittis pharetra. In ac
          luctus odio, id tristique magna. Suspendisse potenti. Etiam non sem ac
          lacus dictum finibus vitae quis quam.
        </p>
      </Grid>
      <Grid item lg={3} xs={12}>
        <p>Dene,e,e';asld';alsd';las'd;la';sdl'a;sld';alsd'alds';</p>
      </Grid>
    </Grid>
  );
}
