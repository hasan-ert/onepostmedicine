import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../componentCss/site.css";
import "./css/Cards.css";

export default function MediaCard({
  onClickHandler,
  backColor,
  cssClass,
  imgSource,
  contentHeader,
  content,
  contentVar = "body2",
  contentHeaderVar = "h3",
}) {
  function createCardMedia() {
    if (imgSource !== undefined)
      return <img src={imgSource} alt={contentHeader} />;
    else return;
  }

  function createCardHeader() {
    return (
      <Typography
        gutterBottom
        variant={contentHeaderVar}
        textAlign="center"
        component="div"
      >
        {contentHeader}
      </Typography>
    );
  }
  function createCardContent() {
    return (
      <Typography
        gutterBottom
        textAlign="center"
        variant={contentVar}
        component="div"
      >
        {content}
      </Typography>
    );
  }

  return (
    <Card
      className={"Cards"}
      id={cssClass}
      onClick={() => onClickHandler(contentHeader)}
      style={{ backgroundColor: backColor }}
    >
      {createCardMedia()}
      <CardContent>
        {createCardHeader()}
        {createCardContent()}
      </CardContent>
    </Card>
  );
}
