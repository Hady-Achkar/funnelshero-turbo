import { FC } from "react";
import s from "./container.module.scss";

export const Container: FC<IProps> = ({
    borderRadius,
    background,
    padding,
    margin,
}) => {
    return <div className={s.container}>Container</div>;
};

interface IProps {
    borderRadius: string;
    background: string;
    padding?: string;
    margin?: string;
}
