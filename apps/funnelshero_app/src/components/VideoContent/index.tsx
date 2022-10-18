import { FC } from "react";
import s from "./videoContent.module.scss";

export const VideoContent: FC<IProps> = () => {
    return (
        <div className={s.container}>
            VideoContent
            <div>VideoContent</div>
        </div>
    );
};

interface IProps {}
