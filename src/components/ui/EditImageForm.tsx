import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ParsleyAPI from "../../helpers/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

type ImageFormProps<T> = {
  submitCallback: (image: Blob, id: number) => Promise<void>;
  model: T;
};


function EditImageForm<T extends Recipe>(
  {
    submitCallback,
    model
  }: ImageFormProps<T>) {

  const [image, setImage] = useState<Blob | null>(null);
  const [genCount, setGenCount] = useState(0);
  const [generating, setGenerating] = useState<Boolean>(false);


  async function generateImage(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setGenerating(true);
    const response = await ParsleyAPI.generateRecipeImage(model.recipeId);
    setGenCount(value => value + 1);
    setImage(response);
    setGenerating(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const file = e.target.files![0];
    setImage(file);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!image) {
      console.error("Please select a file to upload");
    } else {
      await submitCallback(image, model.recipeId);
    }
  }


  return (
    <>
      {model &&
        <Stack
          className="banner"
          sx={{
            width: '80%',
            aspectRatio: '7/3',
            backgroundImage: image ? `url(${URL.createObjectURL(image)})` : `url(${model.imageLg})`,
            backgroundColor: "#ffffff88",
            backgroundBlendMode: generating ? "lighten" : "normal",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: "relative",
            borderRadius: '1rem',
            overflow: "hidden",
          }}
        >
          <Stack
            sx={{
              fontSize: "6rem",
              color: "white",
              opacity: "50%",
              width: "100%",
              height: "100%",
              "&:hover": { opacity: "100%", transform: "scale(110%)" },
              transition: "transform .1s ease-in-out, opacity .1s ease-in-out"
            }}
            component="label"
            htmlFor="fileSelectInput"
            alignItems="center"
            justifyContent="center"
          >
            {generating
              ?
              <CircularProgress size="6rem" />
              :
              <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
            }
          </Stack>
        </Stack>
      }
      {(genCount > 2) && <Typography> Maximum generation count reached</Typography>}
      <form onSubmit={async (e) => handleSubmit(e)} className="ImageForm">
        <Stack
          justifyContent="space-between"
          alignItems="center"
          spacing={5}
          direction={{ xs: "column", md: "row" }}
        >
          <Stack direction={{ xs: "column", sm: "row" }} alignItems="center" justifyContent="space-evenly" spacing={2}>
            <Button
              variant="outlined"
              onClick={(e) => generateImage(e)}
              disabled={(generating || (genCount > 2)) ? true : false}
            >
              Regenerate Image
            </Button>
            <Button
              className="ImageForm-uploadButton"
              variant="outlined"
              component="label"
            >
              Search Files
              <input
                type="file"
                accept="image"
                name="image"
                id="fileSelectInput"
                hidden
                onChange={(e) => handleChange(e)}
              />
            </Button>
            <Box className="ImageForm-fileName">
              {/* <Typography>{fileName}</Typography> */}
            </Box>
          </Stack>
          <Button
            type="submit"
            className="ImageForm-uploadButton"
            variant="contained"
            disabled={!image}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default EditImageForm;