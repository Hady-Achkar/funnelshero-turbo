import { FC } from "react";
import s from "./videoContent.module.scss";
import { Select, Icon } from "ui";

export const VideoContent: FC<IProps> = () => {
    const onChnageSelect = () => {};

    return (
        <div className={s.container}>
            VideoContent
            <Select
                placeholder={"Select"}
                select={"two"}
                onChange={onChnageSelect}
            >
                <div id="youtube" className={s.option}>
                    <Icon type={"Youtube"} feather={true} color={"red"} />
                    Youtube
                </div>
                <div id="two" className={s.option}>
                    <Icon type={"Vimeo"} color={"#1ab7ea"} />
                    Vimeo
                </div>
            </Select>
        </div>
    );
};

interface IProps {}
