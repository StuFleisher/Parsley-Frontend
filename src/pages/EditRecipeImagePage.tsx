import { useContext, useState } from "react";
import userContext from "../helpers/userContext";
import { useParams, useNavigate, Navigate, useLocation } from "react-router-dom";
import ParsleyAPI from "../helpers/api";
import { Box, Modal, Stack, Typography } from "@mui/material";
import { useFetchRecipe } from "../hooks/useFetchRecipe";
import EditImageForm from "../components/ui/EditImageForm";
import ErrorMessage from "../components/ui/ErrorMessage";
import LoadingSpinner from "../components/ui/LoadingSpinner";


function EditRecipeImagePage() {

    const { username, isAdmin } = useContext(userContext);
    const [saving, setSaving] = useState(false);
    const [errs, setErrs] = useState<string[]>([]);

    const { id } = useParams();
    if (!id) {
        throw new Error("Id is required to edit a larp");
    }

    const location = useLocation();
    const isNewRecipe = new URLSearchParams(location.search).get('new');

    const { recipe, loading, error:fetchError } = useFetchRecipe(parseInt(id));
    const navigate = useNavigate();

    if (!loading && username !== recipe?.owner && !isAdmin) {
        console.error("You are not authorized to edit this record");
        return <Navigate to={`events/${id}`} />;
    }

    async function handleSubmit(image: Blob, id: number) {
        try {
            setSaving(true);
            await ParsleyAPI.updateRecipeImage(image, id);
            navigate(`/recipes/${id}`);
        } catch (e: any) {
            setErrs(e);
            setSaving(false);
        }
    }

    return (
        <>
            <ErrorMessage
                title="Sorry, there was a problem fetching this record"
                errs={errs}
            />
            <ErrorMessage
                title="Sorry, there was a problem submitting the form"
                errs={fetchError}
            />
            {saving &&
                <Modal open={true}>
                    <Box className="LoadingSpinnerContainer">
                        <LoadingSpinner />
                    </Box>
                </Modal>
            }
            <Stack direction={'column'} alignItems={'center'} spacing={3}>
                <Box
                    sx={{
                        padding: '1rem',
                        paddingTop: '3rem',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant={'h1'} component={'h2'} color={'primary'}>
                        {isNewRecipe ? "You're almost done" : "A picture is worth 1000 words!"}
                    </Typography>
                    <Typography>
                        Upload an image for your recipe using the form below
                    </Typography>
                </Box>
                {recipe &&
                    <EditImageForm model={recipe} submitCallback={handleSubmit} />
                }
            </Stack>
        </>
    );
}

export default EditRecipeImagePage;