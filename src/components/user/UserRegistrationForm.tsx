import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import userRegistrationSchema from "../../helpers/userRegistrationSchema";
import './loginForm.scss';
import FormikMuiTextField from "../ui/FormikMuiTextField";
import { Formik, FastField, Form } from "formik";

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

    async function registerUser(values: UserRegistrationData) {
        await register({
            username: values.username,
            password: values.password,
            email: values.email,
            firstName: "",
            lastName: "",
        });
        navigate('/');
    }

    return (
        <Formik
            initialValues={DEFAULT_FORM_DATA}
            onSubmit={async (values) => await registerUser(values)}
            validationSchema={userRegistrationSchema}
        >
            {({ isValid }) => (
                <Form>
                    <Stack direction="column" spacing={2}>

                        <FastField
                            component={FormikMuiTextField}
                            variant="filled"
                            size="small"
                            id={`username`}
                            label="username"
                            name={`username`}
                        />
                        <FastField
                            component={FormikMuiTextField}
                            variant="filled"
                            size="small"
                            type="password"
                            id={`password`}
                            label="password"
                            name={`password`}
                        />
                        <FastField
                            component={FormikMuiTextField}
                            variant="filled"
                            size="small"
                            type="password"
                            id={`confirmPassword`}
                            label="confirm password"
                            name={`confirmPassword`}
                        />
                        <FastField
                            component={FormikMuiTextField}
                            variant="filled"
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
                    </Stack>

                </Form>
            )}

        </Formik>
    );
}

export default UserRegistrationForm;