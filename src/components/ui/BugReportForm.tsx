import React, { useState, useContext } from "react";
import ParsleyAPI from "../../helpers/api";
import userContext from "../../helpers/userContext";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ErrorDisplay from "./ErrorDisplay";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

import "./BugReportForm.scss";

type BugReportFormData = {
    reportText: string;
};

function BugReportForm() {
    const { username } = useContext(userContext);
    const [formData, setFormData] = useState<BugReportFormData>({
        reportText: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            await ParsleyAPI.createBugReport(username!, formData.reportText);
            setSubmitted(true);
        } catch (err: any) {
            setError(`There was a problem filing this bug.  Please send an email to the developer
            at stufleisher@gmail.com`);
        }
    }

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = evt.target;
        setFormData((currentFormData) => {
            return {
                ...currentFormData,
                [name]: value,
            };
        });
    }

    return (
        <Stack spacing={2} component="form" className="BugReportForm">
            <TextField
                variant="outlined"
                name="reportText"
                label="What happened?"
                multiline
                rows={3}
                onChange={handleChange} />
            <Button
                variant="contained"
                type="submit"
                disabled = {submitted}
                onClick={(e) => { handleSubmit(e); }}>
                File report
            </Button>
            {submitted &&
                <Alert severity="success" >
                    <Typography variant="body1">
                        Thank you!
                    </Typography>
                </Alert>
            }
            {error && <ErrorDisplay message={error} />}
        </Stack>
    );

}

export default BugReportForm;