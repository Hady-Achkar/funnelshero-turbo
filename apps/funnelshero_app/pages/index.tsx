import type { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import s from "./home.module.scss";
import { Submit } from "../src/components";
import Head from "next/head";
import { Checkbox, Input } from "ui";
import SignLayout from "layouts/signLayout";
import Link from "next/link";
import authApi from "@api/authApi";
import { ILoginBody } from "interfaces";

const Home: NextPage = () => {
    const [body, setBody] = useState<ILoginBody | null>(null);
    const [isValid, setIsValid] = useState<{ [key: string]: boolean } | null>(
        null
    );

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        isValid: boolean
    ) => {
        // setIsValid(prev=>)
        console.log(e.target.value, isValid);
    };

    const onSubmit = () => {
        authApi
            .login({ password: "232", email: "asdasd@gmail.com" })
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
    };

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
                                    onChange={onChange}
                                />
                                <Input
                                    variant={"rounded"}
                                    className={s.sign_textField}
                                    placeholder={"Password"}
                                    validationKey={"password"}
                                    name={"password"}
                                    onChange={onChange}
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
                            />
                            <div className={s.create_accound}>
                                <p>
                                    Don’t have an account?
                                    <Link href={"/"}>
                                        <a>Create an Account</a>
                                    </Link>
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
