import Typography from "@mui/material/Typography";

import SimpleLayout from "../components/ui/SimpleLayout";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";

function DeletedMessage() {
    return (

        <SimpleLayout src="/images/banner01.jpg">

            <Typography variant="h2" align="center" color="primary">
                Your recipe has been deleted.
            </Typography>
            <Button
                component={RouterLink}
                to={`/recipes`}
                color="charcoal"
            >
                Back to Recipes
            </Button>
        </SimpleLayout>
    );
}

export default DeletedMessage;