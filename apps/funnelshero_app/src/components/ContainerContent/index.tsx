import { FC } from "react";
import s from "./containerContent.module.scss";
import { Button } from "ui";
import { Element, useEditor } from "@craftjs/core";
import { Container } from "editor";

export const ContainerContent: FC<IProps> = () => {
    const { connectors, query } = useEditor();

    return (
        <div className={s.container}>
            <Button
                className={s.container_example}
                ref={(ref: HTMLButtonElement) => {
                    connectors.create(
                        ref,
                        <Element
                            backgroundColor={"#FF9B37"}
                            padding={"6px 20px 6px 20px"}
                            borderRadius={"16px 16px 16px 16px"}
                            is={Container}
                            canvas
                        />
                    );
                }}
            />
        </div>
    );
};

interface IProps {}
