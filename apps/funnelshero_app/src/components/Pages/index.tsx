import { FC } from "react";
import s from "./pages.module.scss";

export const Pages: FC<IProps> = () => {
    return <div className={s.container}>Pages</div>;
};

interface IProps {}
