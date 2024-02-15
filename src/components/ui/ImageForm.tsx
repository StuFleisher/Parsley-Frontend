import React, { useState } from "react";
import "./ImageForm.scss";
// import { TextField, Stack, Button, Box, Card } from "@mui/material"
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

type props = {
  onSubmit:Function
  imgUrl:string
}


function ImageForm ({onSubmit}:props){

  const [image,setImage] = useState<Blob | null>(null);
  const [imageInput,setImageInput] = (
    useState<string | number | readonly string[] | undefined>("")
  );
  const [fileName, setFileName] = useState("Upload an Image")

  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    e.preventDefault();
    const file = e.target.files![0];
    setImageInput(e.target.value);
    setFileName(e.target.files![0].name)
    setImage(file)
  }

  function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    e.stopPropagation();
    console.log("handleSubmit from ImageForm")
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
                name="image"
                hidden
                onChange={(e)=>handleChange(e)}
                value={imageInput}
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