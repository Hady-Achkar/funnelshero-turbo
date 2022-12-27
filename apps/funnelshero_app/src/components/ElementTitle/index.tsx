import { FC } from "react";
import s from "./elementTitle.module.scss";

export const ElementTitle: FC<IProps> = ({ children }) => {
    return <div className={s.container}>{children}</div>;
};

interface IProps {
    children?: React.ReactNode | React.ReactNode[];
}
