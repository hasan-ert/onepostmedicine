import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

export default function MediaUploader({ parentImageList, setParentImageList }) {
  const [widget, setWidget] = useState(
    window.cloudinary.createUploadWidget(
      {
        width: "500",
        cloudName: "da8slr0ic",
        uploadPreset: "lsbcei52",
        folder: "foodsfromturkey",
        cropping: true,
      },
      (error, result) => {
        console.log(error, result.event);
        if (result.event === "success") {
          alert("Image is added");
          setParentImageList((parentImageList) => [
            ...parentImageList,
            result.info.url,
          ]);
        }
      }
    )
  );

  const uploadImage = () => {
    widget.open();
  };
  return (
    <Button variant="contained" onClick={uploadImage}>
      Upload Image
    </Button>
  );
}
