import React, { useState } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import "./ImageForm.scss";

type props = {
  onSubmit:Function,
}

function ImageForm ({onSubmit}:props){

  const [image,setImage] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState("Upload an Image")

  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    e.preventDefault();
    const file = e.target.files![0];
    setFileName(e.target.files![0].name)
    setImage(file)
  }

  function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    e.stopPropagation();
    onSubmit(image);
  }

  return (
      <form onSubmit={(e)=>handleSubmit(e)} className="ImageForm">
        <Stack justifyContent="center" alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" justifyContent="space-evenly" spacing={2}>
          <Button
            className="ImageForm-uploadButton"
            variant="contained"
            component="label"
            >
              Upload File
              <input
                type="file"
                accept="image"
                name="image"
                hidden
                onChange={(e)=>handleChange(e)}
                />
          </Button>
          <Box className="ImageForm-fileName">
            <Typography>{fileName}</Typography>
          </Box>
        </Stack>
          <Button
            type="submit"
            className="ImageForm-uploadButton"

          >
            Done
          </Button>
        </Stack>
      </form>
  )
}

export default ImageForm