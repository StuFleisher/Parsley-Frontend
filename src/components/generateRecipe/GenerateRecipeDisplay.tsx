import { useSearchParams, Link as RouterLink } from "react-router-dom";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';

import GenerateRecipeFromTextForm from "./GenerateRecipeFromTextForm";
import GenerateRecipeFromUrlForm from "./GenerateRecipeFromUrlForm";
import ImageForm from "../ui/ImageForm";
import SimpleLayout from "../ui/SimpleLayout";

import "./GenerateRecipeDisplay.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPencil, faRocket, faLink } from "@fortawesome/free-solid-svg-icons";

type props = {
    generateRecipe: (data: { recipeText: string; } | Blob) => Promise<void>;
};

type GenerationMethod = "text" | "image" | "url" | "ai";

function isGenerationMethod(value: string | null): value is GenerationMethod {
    return value !== null && ["text", "image", "url", "ai"].includes(value);
}

function GenerateRecipeDisplay({ generateRecipe }: props) {

    const [searchParams] = useSearchParams();
    let methodParam = searchParams.get("method");
    const method: GenerationMethod = isGenerationMethod(methodParam) ? methodParam : "text";


    //FIXME: buttons crammed at small sizes
    return (

        <Stack className="GenerateRecipeDisplay">
            <Stack
                className="GenerateRecipeDisplay-nav"
                alignItems="center"
                justifyContent="space-evenly"
            >

                <Button
                    component={RouterLink}
                    className={
                        method === "text"
                            ? "GenerateRecipeDisplay-button selected"
                            : "GenerateRecipeDisplay-button"
                    }
                    variant="outlined"
                    to = "/recipes/create?method=text"
                >
                    <Typography>
                        <FontAwesomeIcon icon={faPencil} /> &nbsp; Text
                    </Typography>
                </Button>
                <Button
                    component={RouterLink}
                    className={
                        method === "url"
                            ? "GenerateRecipeDisplay-button selected"
                            : "GenerateRecipeDisplay-button"
                    }
                    variant="outlined"
                    to = "/recipes/create?method=url"
                >
                    <Typography>
                        <FontAwesomeIcon icon={faLink} /> &nbsp; Link
                    </Typography>
                </Button>
                <Button
                    component={RouterLink}
                    className={
                        method === "image"
                            ? "GenerateRecipeDisplay-button selected"
                            : "GenerateRecipeDisplay-button"
                    }
                    variant="outlined"
                    to = "/recipes/create?method=image"
                >
                    <Typography>
                        <FontAwesomeIcon icon={faCamera} /> &nbsp; Image
                    </Typography>
                </Button>
                <Button
                    component={RouterLink}
                    className={
                        method === "ai"
                            ? "GenerateRecipeDisplay-button selected"
                            : "GenerateRecipeDisplay-button"
                    }
                    variant="outlined"
                    to = "/recipes/create?method=ai"
                >
                    <Typography>
                        <FontAwesomeIcon icon={faRocket} /> &nbsp; AI
                    </Typography>
                </Button>

            </Stack>

            <SimpleLayout src="/images/banner01.jpg" menuHeight="7rem">
                <Stack
                    alignItems="center"
                    justifyContent="center"
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
                        (method === "text")
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
                        (method === "image")
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
                        (method === "ai")
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
                    {
                        (method === "url")
                            ?
                            <>
                                <Typography
                                    variant="body1"
                                    className="RecipeFromText-title"
                                >
                                    Paste the url for your recipe below. We'll take care of the rest!
                                </Typography>
                                <GenerateRecipeFromUrlForm onSubmit={generateRecipe} />
                            </>
                            : ""
                    }

                </Stack>
            </SimpleLayout>
        </Stack>


    );

}

export default GenerateRecipeDisplay;