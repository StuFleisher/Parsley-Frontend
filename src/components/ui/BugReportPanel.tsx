
import ToolTip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

import ModalButton from "./ModalButton";
import BugReportForm from "./BugReportForm";
import "./BugReportPanel.scss";

import { faBug } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";

export default function BugReportPanel() {
    return (
        <Box className="BugReportPanel">
            <ModalButton
                component={
                    <ToolTip title="Report a bug">

                        <IconButton>
                            <FontAwesomeIcon icon={faBug} />
                        </IconButton>
                    </ToolTip>
                }
            >
                <BugReportForm />
            </ModalButton>
        </Box>
    );
}