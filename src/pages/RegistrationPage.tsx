import UserRegistrationForm from "../components/user/UserRegistrationForm";
import SimpleLayout from "../helpers/SimpleLayout";


import "./RegistrationPage.scss";

type props = {
    register: (userInfo: IUser) => Promise<void>,
};

function RegistrationPage({ register }: props) {
    return (
        <SimpleLayout src="/images/banner01.jpg">
            <UserRegistrationForm register={register} />
        </SimpleLayout>
    );
}

export default RegistrationPage;