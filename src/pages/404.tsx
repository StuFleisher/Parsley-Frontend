import Typography from "@mui/material/Typography";

import SimpleLayout from "../components/ui/SimpleLayout";

function NotFound() {
    return (

        <SimpleLayout src="/images/banner01.jpg">

            <Typography variant="h1" align="center" color="primary">
                404
            </Typography>
            <Typography variant="body1">
                Sorry, looks like we're missing that ingredient!
            </Typography>
        </SimpleLayout>
    );
}

export default NotFound;