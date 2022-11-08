import { FC } from "react";
import s from "./videoContent.module.scss";
import { Select } from "ui";

export const VideoContent: FC<IProps> = () => {
    return (
        <div className={s.container}>
            VideoContent
            <Select>
                <div>asdadasd</div>
            </Select>
        </div>
    );
};

interface IProps {}
