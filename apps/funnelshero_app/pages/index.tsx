import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import s from "./home.module.scss";
import { Submit } from "../src/components";
import Head from "next/head";
import { Checkbox, Input, Button } from "ui";
import { SignLayout } from "layouts";
import Link from "next/link";
import authApi from "@api/authApi";
import { ILoginBody } from "interfaces";

const Home: NextPage = () => {
    const [body, setBody] = useState<ILoginBody>({
        password: "",
        email: "",
    });

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        isValid: boolean
    ) => {
        setBody((prev: ILoginBody) => ({
            ...prev,
            [e.target.name]: isValid ? e.target.value : "",
        }));
    };

    const onSubmit = () => {
        authApi
            .login({ password: "232", email: "asdasd@gmail.com" })
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
    };

    const disableSubmitButton = () => Object.values(body).some((e) => e == "");

    return (
        <div>
            <Head>
                <title>Create new Funnel</title>
            </Head>
            <SignLayout>
                <div className={s.full_centered}>
                    <div className={s.sign_block}>
                        <div>
                            <h1 className={s.login_title}>
                                Login to <span>Funnelshero</span>
                            </h1>
                        </div>
                        <div>
                            <div className={s.sign_block_textFields}>
                                <Input
                                    variant={"rounded"}
                                    className={s.sign_textField}
                                    placeholder={"Email"}
                                    validationKey={"email"}
                                    name={"email"}
                                    onFinish={onChange}
                                />
                                <Input
                                    variant={"rounded"}
                                    className={s.sign_textField}
                                    placeholder={"Password"}
                                    validationKey={"password"}
                                    name={"password"}
                                    onFinish={onChange}
                                />
                            </div>
                            <div className={s.flex_end}>
                                <Link href={"/reset"}>
                                    <a>Forgot Password?</a>
                                </Link>
                            </div>
                            <div>
                                <Checkbox label="I confirm all Term and conditions and Privacy policies" />
                            </div>
                            <Submit
                                className={s.login_btn}
                                label={"Login"}
                                onClick={onSubmit}
                                disabled={disableSubmitButton()}
                            />
                            <div className={s.create_accound}>
                                <p>
                                    Don’t have an account?
                                    <Submit
                                        variant="link"
                                        href={"/register"}
                                        label={"Create an Account"}
                                        className={s.create_an_account_btn}
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SignLayout>
        </div>
    );
};

export default Home;
