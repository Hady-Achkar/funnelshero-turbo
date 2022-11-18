import { FC } from "react";
import s from "./buttonContent.module.scss";
import { ButtonE } from "editor";
import { Button } from "ui";
import { Padding } from "components";
import { Element, useEditor } from "@craftjs/core";

export const ButtonContent: FC<IProps> = () => {
    const { connectors, query } = useEditor();

    return (
        <div className={s.container}>
            <div className={s.block}>
                <Button
                    label={"Button"}
                    className={s.green}
                    ref={(ref: HTMLButtonElement) => {
                        connectors.create(
                            ref,
                            <Element
                                text="Button"
                                className={s.green}
                                is={ButtonE}
                                canvas
                            />
                        );
                    }}
                />
                <Button
                    label={"Button"}
                    className={s.red}
                    ref={(ref: HTMLButtonElement) => {
                        connectors.create(
                            ref,
                            <Element
                                text="Button"
                                className={s.red}
                                is={ButtonE}
                                canvas
                            />
                        );
                    }}
                />
                <Button
                    label={"Button"}
                    className={s.blue_gradient}
                    ref={(ref: HTMLButtonElement) => {
                        connectors.create(
                            ref,
                            <Element
                                text="Button"
                                className={s.blue_gradient}
                                is={ButtonE}
                                canvas
                            />
                        );
                    }}
                />
            </div>
        </div>
    );
};

interface IProps {}
