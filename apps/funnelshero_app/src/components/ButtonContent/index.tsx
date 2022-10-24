import { FC, useState } from "react";
import s from "./buttonContent.module.scss";
import { ButtonE, ButtonSettings } from "editor";
import { Button } from "ui";
import { Element, useEditor } from "@craftjs/core";

export const ButtonContent: FC<IProps> = () => {
    const { connectors } = useEditor();

    return (
        <div className={s.container}>
            <div className={s.block}>
                <ButtonSettings />
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
