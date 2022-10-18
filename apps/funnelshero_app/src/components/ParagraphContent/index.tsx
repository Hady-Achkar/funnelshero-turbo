import { FC } from "react";
import s from "./paragraphContent.module.scss";

export const ParagraphContent: FC<IProps> = () => {
    return (
        <div className={s.container}>
            ParagraphContent
            <div>ParagraphContent</div>
        </div>
    );
};

interface IProps {}
