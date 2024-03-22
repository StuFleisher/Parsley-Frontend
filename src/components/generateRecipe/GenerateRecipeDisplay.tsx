import { useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';

import GenerateRecipeFromTextForm from "./GenerateRecipeFromTextForm";
import ImageForm from "../ui/ImageForm";
import SimpleLayout from "../ui/SimpleLayout";

import "./GenerateRecipeDisplay.scss";

type props = {
    generateRecipe: (data: { recipeText: string; } | Blob) => Promise<void>;
};

function GenerateRecipeDisplay({ generateRecipe }: props) {

    const [mode, setMode] = useState<"text" | "image" | "ai">("text");

    return (

        <Stack className="GenerateRecipeDisplay">
            <Stack
                className="GenerateRecipeDisplay-nav"
                alignItems="center"
                justifyContent="space-evenly"
                spacing={1}
                direction={{ xs: "column", sm: "row" }}
            >
                <Button
                    className={
                        mode === "text"
                            ? "GenerateRecipeDisplay-button selected"
                            : "GenerateRecipeDisplay-button"
                    }
                    variant="outlined"
                    onClick={(e) => {
                        e.preventDefault();
                        setMode("text");
                    }}
                >
                    Generate from Text
                </Button>
                <Button
                    className={
                        mode === "image"
                            ? "GenerateRecipeDisplay-button selected"
                            : "GenerateRecipeDisplay-button"
                    }
                    variant="outlined"
                    onClick={(e) => {
                        e.preventDefault();
                        setMode("image");
                    }}
                >
                    Generate from Photo
                </Button>
                <Button
                    className={
                        mode === "ai"
                            ? "GenerateRecipeDisplay-button selected"
                            : "GenerateRecipeDisplay-button"
                    }
                    variant="outlined"
                    onClick={(e) => {
                        e.preventDefault();
                        setMode("ai");
                    }}
                >
                    Generate with AI
                </Button>
            </Stack>

            <SimpleLayout src="/images/banner01.jpg" menuHeight="7rem">
                <Stack
                    alignItems="center"
                    className="GenerateRecipeDisplay-contents"
                    spacing={1}
                >
                    <Typography
                        variant="h2"
                        color="$primary"
                        align="center"
                        className="RecipeFromText-title"
                    >
                        Create a new recipe
                    </Typography>
                    {
                        (mode === "text")
                            ?
                            <>
                                <Typography
                                    variant="body1"
                                    className="RecipeFromText-title"
                                >
                                    Copy/Paste your raw recipe text below. No need to tidy it up - we'll take care of that for you
                                </Typography>
                                <GenerateRecipeFromTextForm onSubmit={generateRecipe} />
                            </>
                            : ""
                    }
                    {
                        (mode === "image")
                            ?
                            <>
                                <Typography
                                    variant="body1"
                                    className="RecipeFromText-title"
                                >
                                    Upload a photo or screenshot of your recipe's text.  We'll do our best to read and format it for you.
                                </Typography>
                                <Stack
                                    alignItems="center"
                                    justifyContent={"center"}
                                    className="GenerateRecipeDisplay-formContainer"
                                    >
                                    <ImageForm onSubmit={generateRecipe} />
                                </Stack>
                            </>
                            : ""
                        }
                        {
                            (mode === "ai")
                                ?
                                <>
                                    <Typography
                                        variant="body1"
                                        className="RecipeFromText-title"
                                    >
                                        Write a description of the recipe you'd like us to make and our AI chef will build something just for you.
                                    </Typography>
                                    <GenerateRecipeFromTextForm onSubmit={generateRecipe} />
                                </>
                                : ""
                        }

                </Stack>
            </SimpleLayout>
        </Stack>


    );

}

export default GenerateRecipeDisplay;