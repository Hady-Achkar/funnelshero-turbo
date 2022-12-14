import { FC } from "react";
import s from "./containerContent.module.scss";
import { Button } from "ui";
import { Element, useEditor } from "@craftjs/core";
import { EContainer } from "editor";

export const ContainerContent: FC<IProps> = () => {
    const { connectors } = useEditor();

    return (
        <div className={s.container}>
            <Button
                className={s.container_example}
                ref={(ref: HTMLButtonElement) => {
                    connectors.create(
                        ref,
                        <Element
                            backgroundColor={"#FF9B37"}
                            is={EContainer}
                            canvas
                        />
                    );
                }}
            />
        </div>
    );
};

interface IProps {}
