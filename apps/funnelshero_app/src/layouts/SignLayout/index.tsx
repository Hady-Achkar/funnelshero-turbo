import React, { FC } from "react";
import { SignTopBar } from "components";

export const SignLayout: FC<IProps> = ({ children }): JSX.Element => {
    return (
        <div>
            <SignTopBar />
            {children}
        </div>
    );
};

interface IProps {
    children: React.ReactNode | React.ReactNode;
}
