import { FC } from "react";
import s from "./textContent.module.scss";
import { useEditor, Element } from "@craftjs/core";
import { EText } from "editor";
import { Button } from "ui";

export const TextContent: FC<IProps> = () => {
    const { connectors } = useEditor();

    return (
        <div className={s.container}>
            <Button
                label={"Text"}
                ref={(ref: HTMLButtonElement) => {
                    connectors.create(
                        ref,
                        <Element text={"Your text"} is={EText} canvas />
                    );
                }}
            />
        </div>
    );
};

interface IProps {}
