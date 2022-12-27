import { Submit } from "components";
import { RegisterLayout } from "layouts";
import { useEffect, useState, FC, ChangeEvent } from "react";
import { Checkbox, Input } from "ui";
import s from "./register.module.scss";
import { IRegistrationBody } from "interfaces";
import authApi from "api/authApi";

const Register: FC = () => {
    const [termsOfCond, setTermsOfCond] = useState<boolean>(false);
    const [body, setBody] = useState<IRegistrationBody>({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        isValid: boolean,
        hasValidation?: boolean | undefined
    ) => {
        if (hasValidation) {
            setBody((prev: IRegistrationBody) => ({
                ...prev,
                [e.target.name]: isValid ? e.target.value : "",
            }));
        } else {
            setBody((prev: IRegistrationBody) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        }
    };

    console.log(body, termsOfCond);

    // const onSubmit = () => {
    //     authApi
    //         .register(body)
    //         .then((res) => console.log(res))
    //         .catch((e) => console.log(e));
    // };

    const disableSubmitButton = () =>
        !termsOfCond && Object.values(body).some((e) => e == "");

    return (
        <RegisterLayout
            activeStep={0}
            title={
                <>
                    Create your <span>free account</span>
                </>
            }
        >
            <div className={s.container}>
                <Input
                    placeholder="Firstname"
                    variant={"rounded"}
                    className={s.input}
                    name={"firstName"}
                    onFinish={(e, _isVlid) => onChange(e, _isVlid)}
                />
                <Input
                    placeholder="Lastname"
                    variant={"rounded"}
                    className={s.input}
                    name={"lastName"}
                    onFinish={(e, _isVlid) => onChange(e, _isVlid)}
                />
                <Input
                    placeholder="Email"
                    variant={"rounded"}
                    className={s.input}
                    name={"email"}
                    validationKey={"email"}
                    onFinish={(e, _isVlid) => onChange(e, _isVlid, true)}
                />
                <Input
                    placeholder="Password"
                    variant={"rounded"}
                    className={s.input}
                    name={"password"}
                    validationKey={"password"}
                    onFinish={(e, _isVlid) => onChange(e, _isVlid, true)}
                />
            </div>
            <Checkbox
                label={"I confirm all Term and conditions and Privacy policies"}
                className={s.checkbox}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTermsOfCond(e.target.checked)
                }
            />
            <Submit
                label={"Next step"}
                href={"/register/plan"}
                size={"large"}
                disabled={disableSubmitButton()}
            />
            <div className={s.bottom_block}>
                Already have an account?{" "}
                <Submit label={"Sign in"} variant={"link"} href={"/"} />
            </div>
        </RegisterLayout>
    );
};

export async function getStaticProps(context: any) {
    return {
        props: {},
    };
}

export default Register;
