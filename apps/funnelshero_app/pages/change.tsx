import type { NextPage } from "next";
import { Submit } from "@components/Submit";
import { SignLayout } from "layouts";
import Head from "next/head";
import Link from "next/link";
import { Input } from "ui";
import s from "./home.module.scss";

const Change: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Create new Funnel</title>
            </Head>
            <SignLayout>
                <div className={s.full_centered}>
                    <div className={s.sign_block}>
                        <div className={s.forgot_title}>
                            <h3>Change your password</h3>
                        </div>
                        <div>
                            <div className={s.sign_block_textFields}>
                                <Input
                                    className={s.sign_textField}
                                    placeholder={"New password"}
                                />
                                <Input
                                    className={s.sign_textField}
                                    placeholder={"Confirm Password"}
                                />
                            </div>
                            <Submit className={s.login_btn}>Save</Submit>
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

export default Change;
