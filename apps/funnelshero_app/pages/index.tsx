import type { NextPage } from "next";
import s from "./home.module.scss";
import { Submit } from "../src/components";
import Head from "next/head";
import { Checkbox, Input, Icon } from "ui";
import SignLayout from "layouts/signLayout";
import Link from "next/link";

const Home: NextPage = () => {
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
                                    rounded={true}
                                    className={s.sign_textField}
                                    placeholder={"Email"}
                                />
                                <Input
                                    className={s.sign_textField}
                                    placeholder={"Password"}
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
                            <Submit className={s.login_btn}>Login</Submit>
                            <div className={s.create_accound}>
                                <p>
                                    Don’t have an account?
                                    <Link href={"/register"}>
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
