import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../component/MainComponents/site.css";
import "./css/Cards.css";

export default function MediaCard({
  imgSource,
  contentHeader,
  content,
  contentVar,
  contentHeaderVar,
}) {
  function createCardMedia() {
    if (imgSource !== undefined)
      return <img src={imgSource} alt={contentHeader} />;
    else return;
  }

  function createCardHeader() {
    return (
      <Typography gutterBottom variant={contentHeaderVar} component="div">
        {contentHeader}
      </Typography>
    );
  }
  function createCardContent() {
    return (
      <Typography gutterBottom variant={contentVar} component="div">
        {content}
      </Typography>
    );
  }

  return (
    <Card className="Cards">
      {createCardMedia()}
      <CardContent>
        {createCardHeader()}
        {createCardContent()}
      </CardContent>
    </Card>
  );
}
