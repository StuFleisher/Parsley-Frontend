import React, { ReactNode, useState } from "react";
import { Box, Modal, Button } from "@mui/material";
import './ModalButton.scss';

type props = {
    children: ReactNode;
    component: ReactNode;
    onClick?: Function;
    removeBackground?: boolean;
};

function ModalButton({ children, component, onClick, removeBackground = false }: props) {

    const [open, setOpen] = useState(false);

    function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
        if (onClick) onClick();
    }

    function closeModal() {
        setOpen(false);
    }

    return (
        <>
            <Modal
                open={open}
                onClose={closeModal}
                className="loginModal"
            >
                <Box className={removeBackground ? "" : "Modal-contents"}>
                    {children}
                </Box>
            </Modal>
            <Box
                onClick={handleClick}
            >
                {component}
            </Box>
        </>
    );
}

export default ModalButton;