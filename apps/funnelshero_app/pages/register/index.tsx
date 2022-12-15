import { Submit, Steper } from "components";
import { RegisterLayout } from "layouts";
import Link from "next/link";
import { useEffect, useState, FC } from "react";
import { Checkbox, Input } from "ui";
import s from "./register.module.scss";

const Register: FC = () => {
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
                />
                <Input
                    placeholder="Lastname"
                    variant={"rounded"}
                    className={s.input}
                />
                <Input
                    placeholder="Email"
                    variant={"rounded"}
                    className={s.input}
                />
                <Input
                    placeholder="Password"
                    variant={"rounded"}
                    className={s.input}
                />
            </div>
            <Checkbox
                label={"I confirm all Term and conditions and Privacy policies"}
                className={s.checkbox}
            />
            <Submit label={"Next step"} size={"large"} />
        </RegisterLayout>
    );
};

export async function getStaticProps(context: any) {
    return {
        props: {},
    };
}

export default Register;
