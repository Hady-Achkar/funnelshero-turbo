import { FC } from "react";
import s from "./design.module.scss";

export const Design: FC<IProps> = ({ children }) => {
    return <div className={s.container}>{children}</div>;
};

interface IProps {
    children: React.ReactNode | React.ReactNode[];
}
