import * as React from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

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
        justifyContent="center"
        textAlign="center"
        style={{ wordBreak: "break-all" }}
        fontSize={contentHeaderVar}
      >
        {contentHeader}
      </Typography>
    );
  }
  function createCardContent() {
    return (
      <Typography
        gutterBottom
        fontSize={contentVar}
        textAlign="center"
        component="div"
      >
        {content}
      </Typography>
    );
  }

  return (
    <Card
      className={"Cards floating-card"}
      margin="20px"
      id={cssClass}
      onClick={() => {
        if (onClickHandler !== undefined) onClickHandler(contentHeader);
      }}
      style={{ backgroundColor: backColor }}
    >
      {createCardMedia()}
      <CardContent>{createCardHeader()}</CardContent>
    </Card>
  );
}
