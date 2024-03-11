import UserRegistrationForm from "../components/userAuth/UserRegistrationForm";
import SimpleLayout from "../components/ui/SimpleLayout";


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