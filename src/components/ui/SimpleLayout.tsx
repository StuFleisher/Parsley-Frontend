import React from "react";

import Stack from "@mui/material/Stack";

import "./SimpleLayout.scss";

type props = {
    children: React.ReactNode,
    src: string;
    menuHeight?: string;
};

function SimpleLayout({ src, children, menuHeight = "3rem" }: props) {
    return (
        <Stack
            className="SimpleLayout"
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                backgroundImage: `url('${src}')`,
                height: `calc(100vh - ${menuHeight})`
            }}
        >
            <Stack
                className="SimpleLayout-contents"
                justifyContent="center"
                alignItems="center"
            >
                {children}
            </Stack>
        </Stack>

    );
}

export default SimpleLayout;