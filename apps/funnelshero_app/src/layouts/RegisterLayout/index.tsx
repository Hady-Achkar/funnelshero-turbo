import React, { FC } from "react";
import s from "./registerLayout.module.scss";
import { SignTopBar, Steper } from "components";

export const RegisterLayout: FC<IProps> = ({
    children,
    title,
    activeStep = 0,
}): JSX.Element => {
    return (
        <div className={s.container}>
            <SignTopBar />
            <div className={s.block}>
                <div className={s.sign_block}>
                    <div className={s.title}> {title} </div>
                    <div>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry
                    </div>
                    <Steper activeStep={activeStep} />
                    {children}
                </div>
            </div>
        </div>
    );
};

interface IProps {
    children: React.ReactNode | React.ReactNode;
    title?: string | JSX.Element;
    activeStep: number;
}
