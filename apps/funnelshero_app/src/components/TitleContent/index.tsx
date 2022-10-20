import { FC } from "react";
import s from "./titleContent.module.scss";
import { useEditor, Element } from "@craftjs/core";
import { Text } from "editor";
import { Button } from "ui";

export const TitleContent: FC<IProps> = () => {
    const { connectors } = useEditor();

    const handleChange = () => {};

    return (
        <div className={s.container}>
            <Button
                label={"Title"}
                ref={(ref: HTMLButtonElement) => {
                    connectors.create(
                        ref,
                        <Element text={"Your text"} is={Text} canvas />
                    );
                }}
            />
        </div>
    );
};

interface IProps {}
