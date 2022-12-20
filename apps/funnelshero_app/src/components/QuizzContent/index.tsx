import { FC } from "react";
import s from "./quizzContent.module.scss";
import { Button } from "ui";
import { EButton, EContainer, EInput } from "editor";
import { Element, useEditor } from "@craftjs/core";

export const QuizzContent: FC<IProps> = () => {
    const { connectors } = useEditor();

    return (
        <div className={s.container}>
            <div>Quizz questin and answer temlpates</div>

            <Button
                className={s.quizz_input}
                ref={(ref: HTMLButtonElement) => {
                    connectors.create(
                        ref,
                        <Element is={EInput} className={s.quizz_input} canvas />
                    );
                }}
            />
            <Button
                className={s.container_example}
                ref={(ref: HTMLButtonElement) => {
                    connectors.create(
                        ref,
                        <Element
                            backgroundColor={"#FFFDDE"}
                            padding={"6px 20px 6px 20px"}
                            borderRadius={"16px 16px 16px 16px"}
                            is={EContainer}
                            canvas
                        />
                    );
                }}
            />
            <div>
                <Button
                    className={s.quizz_btn}
                    ref={(ref: HTMLButtonElement) => {
                        connectors.create(
                            ref,
                            <Element
                                text={"Quizz result"}
                                backgroundColor={"#9E97F6"}
                                padding={"6px 20px 6px 20px"}
                                color={"#ffffff"}
                                borderRadius={"16px 16px 16px 16px"}
                                is={EButton}
                                canvas
                            />
                        );
                    }}
                    label={"Quizz result"}
                />
            </div>
        </div>
    );
};

interface IProps {}
