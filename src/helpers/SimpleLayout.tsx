import React from "react";
import "./SimpleLayout.scss";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

type props = {
    children: React.ReactNode,
    src: string;
};

function SimpleLayout({ src, children }: props) {
    return (
        <Container className=" Page-container" maxWidth="xl">
            <Stack
                className="SimpleLayout"
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Stack
                    className="SimpleLayout-contents"
                    justifyContent="center"
                    alignItems="center"
                >
                    {children}
                </Stack>
                <Box
                    className="SimpleLayout-background"
                    component="img"
                    src={src}>
                </Box>

            </Stack>

        </Container >
    );
}

export default SimpleLayout;