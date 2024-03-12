import { Box, Alert, Slide } from "@mui/material";
import "./ErrorDisplay.scss";

type props = {
    message: string;
};

function ErrorDisplay({ message }: props) {
    return (
        <Slide direction="up" in>
            <Box >
                <Alert severity="error">
                    {message}
                </Alert>
            </Box >
        </Slide >
    );
}

export default ErrorDisplay;