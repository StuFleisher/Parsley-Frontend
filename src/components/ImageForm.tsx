import React, { useState, MouseEvent, ChangeEvent } from "react";
// import ParsleyAPI from "../../helpers/api";
// import { TextField, Stack, Button, Box, Card } from "@mui/material"
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

type props = {onSubmit:Function}


function ImageForm ({onSubmit}:props){

  const [image,setImage] = useState<string | number | readonly string[] | undefined>();

  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    e.preventDefault();
    const {value} = e.target;
    setImage(value)
  }

  function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    onSubmit();
  }

  return (
    <Card>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <Button
          variant="contained"
          component="label"
        >
            Upload File
            <input
              type="file"
              name="image"
              hidden
              onChange={(e)=>handleChange(e)}
              value={image}
            />
        </Button>
        <Button type="submit">
          Submit
        </Button>
      </form>
    </Card>
  )
}

export default ImageForm