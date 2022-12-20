import type { NextPage } from "next";
import { Submit } from "components";
import { SignLayout } from "layouts";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Input } from "ui";
import s from "./home.module.scss";

const Reset: NextPage = () => {
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>Create new Funnel</title>
            </Head>
            <SignLayout>
                <div className={s.full_centered}>
                    <div className={s.sign_block}>
                        <div className={s.forgot_title}>
                            <h3>Forgot your password?</h3>
                            <p>
                                {
                                    "Don't worry, we'll send you a message to help you reset your password."
                                }
                            </p>
                        </div>
                        <div>
                            <div className={s.sign_block_textFields}>
                                <Input
                                    className={s.sign_textField}
                                    placeholder={"Email address"}
                                />
                            </div>

                            <Submit
                                className={s.login_btn}
                                href={"/change"}
                                label={"Reset Password"}
                            />
                            <div className={s.create_accound}>
                                <p>
                                    Know your password?
                                    <Link href={"/"}>
                                        <a>Login</a>
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

export default Reset;
