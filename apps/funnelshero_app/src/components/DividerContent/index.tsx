import { FC } from "react";
import s from "./dividerContent.module.scss";

export const DividerContent: FC<IProps> = () => {
    return (
        <div className={s.container}>
            DividerContent
            <div>DividerContent</div>
        </div>
    );
};

interface IProps {}
