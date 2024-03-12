import { Stack, Button, Slide } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import userRegistrationSchema from "../../helpers/userRegistrationSchema";
import './loginForm.scss';
import FormikMuiTextField from "../ui/FormikMuiTextField";
import { Formik, FastField, Form } from "formik";
import { useState } from "react";
import ErrorDisplay from "../ui/ErrorDisplay";

import "./userRegistrationForm.scss";

const DEFAULT_FORM_DATA: UserRegistrationData = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
};

type props = {
    register: (userInfo: IUser) => Promise<void>;
};

function UserRegistrationForm({ register }: props) {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    async function registerUser(values: UserRegistrationData) {
        try {
            await register({
                username: values.username,
                password: values.password,
                email: values.email,
                firstName: "",
                lastName: "",
            });
            setError(null);
            navigate('/');
        } catch (errs: any) {
            console.log("errors: ",errs[0]);
            setError(errs[0]);
        }
    }

    return (
        <Formik
            initialValues={DEFAULT_FORM_DATA}
            onSubmit={async (values) => await registerUser(values)}
            validationSchema={userRegistrationSchema}
        >
            {({ isValid }) => (
                <Form className="RegistrationForm">
                    <Stack direction="column" spacing={2}>

                        <FastField
                            component={FormikMuiTextField}
                            variant="outlined"
                            size="small"
                            id={`username`}
                            label="username"
                            name={`username`}
                        />
                        <FastField
                            component={FormikMuiTextField}
                            variant="outlined"
                            size="small"
                            type="password"
                            id={`password`}
                            label="password"
                            name={`password`}
                        />
                        <FastField
                            component={FormikMuiTextField}
                            variant="outlined"
                            size="small"
                            type="password"
                            id={`confirmPassword`}
                            label="confirm password"
                            name={`confirmPassword`}
                        />
                        <FastField
                            component={FormikMuiTextField}
                            variant="outlined"
                            size="small"
                            id={`email`}
                            label="email"
                            name={`email`}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isValid ? false : true}
                        > Sign Up </Button>
                        <Typography component="p" variant="caption" align="center">

                            Already Registered?<Link to="/LogIn">   Log In</Link>
                        </Typography>
                        {error && <ErrorDisplay message={error}/>}
                    </Stack>
                </Form>
            )}

        </Formik>
    );
}

export default UserRegistrationForm;