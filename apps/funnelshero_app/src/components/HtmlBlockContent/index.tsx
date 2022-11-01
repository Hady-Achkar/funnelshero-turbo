import { FC } from "react";
import s from "./htmlBlockContent.module.scss";

export const HtmlBlockContent: FC<IProps> = () => {
    return <div className={s.container}></div>;
};

interface IProps {}
