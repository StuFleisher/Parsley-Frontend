import React, { useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import "./ImageForm.scss";

type props = {
  onSubmit: Function,
  imageUrl?:string,
};

const DEFAULT_IMG_BASE_URL = "https://sf-parsley.s3.amazonaws.com/recipeImage/default-lg";


function ImageForm({ onSubmit, imageUrl }: props) {

  const [image, setImage] = useState<Blob | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const file = e.target.files![0];
    setImage(file);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    onSubmit(image);
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}

    >
      <Stack
        className="banner"
        justifyContent="center"
        sx={{
          width: '80%',
          aspectRatio: '7/3',
          backgroundImage: image ? `url(${URL.createObjectURL(image)})` : `url(${imageUrl})`,
          backgroundColor: "#ffffff88",
          // backgroundBlendMode: generating ? "lighten" : "normal",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: "relative",
          borderRadius: '1rem',
          overflow: "hidden",
        }}
      ></Stack>

      <form onSubmit={(e) => handleSubmit(e)} className="ImageForm">
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Button
            className="ImageForm-uploadButton"
            variant="outlined"
            component="label"
          >
            Upload File
            <input
              type="file"
              accept="image"
              name="image"
              hidden
              onChange={(e) => handleChange(e)}
            />
          </Button>
          <Button
            type="submit"
            className="ImageForm-uploadButton"
            variant="contained"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}

export default ImageForm;