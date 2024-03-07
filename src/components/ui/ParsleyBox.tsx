import Box from "@mui/material/Box";
import "./ParsleyBox.scss";

type props = {
    children: React.ReactNode,
};

function ParsleyBox({ children }: props) {
    return (
        <Box
            component="div"
            className="ParsleyBox"
        >
            {children}
        </Box>
    );
}

export default ParsleyBox;