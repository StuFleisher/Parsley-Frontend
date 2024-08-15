import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";


import "./LoadingSpinner.scss";

const LoadingSpinner = React.forwardRef((props, ref) => (

    <Box
        ref={ref}
        className="LoadingSpinner"
        justifyContent="center"
        alignItems="center"
        {...props}
    >
        <CircularProgress size="6rem" />

    </Box>

));

export default LoadingSpinner;