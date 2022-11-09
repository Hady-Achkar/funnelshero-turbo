import { FC } from "react";
import s from "./optInFormContent.module.scss";
import { InputE } from "editor";
import { Button, Icon } from "ui";
import { Element, useEditor } from "@craftjs/core";

export const OptInFormContent: FC<IProps> = () => {
    const { connectors } = useEditor();

    return (
        <div className={s.container}>
            <div className="title16">Custom Fields</div>
            <div>Click on a field type you want to create</div>
            <div className={s.body}>
                <Button
                    label={"Simple"}
                    className={s.input_sample}
                    ref={(ref: HTMLDivElement) => {
                        connectors.create(
                            ref,
                            <Element placeholder="Simple " is={InputE} canvas />
                        );
                    }}
                />
                <Button
                    className={s.input_sample}
                    ref={(ref: HTMLDivElement) => {
                        connectors.create(
                            ref,
                            <Element
                                placeholder="Date input"
                                frontIcon="Calendar"
                                type="date"
                                is={InputE}
                                canvas
                            />
                        );
                    }}
                >
                    <Icon type={"Calendar"} feather={true} size={20} />
                    Date input
                </Button>
                <Button
                    className={s.input_sample}
                    ref={(ref: HTMLDivElement) => {
                        connectors.create(
                            ref,
                            <Element
                                placeholder="Email input"
                                frontIcon="Mail"
                                type="email"
                                is={InputE}
                                canvas
                            />
                        );
                    }}
                >
                    <Icon type={"Mail"} feather={true} size={20} />
                    Email input
                </Button>
                <Button
                    className={s.input_sample}
                    ref={(ref: HTMLDivElement) => {
                        connectors.create(
                            ref,
                            <Element
                                placeholder="User input"
                                frontIcon="User"
                                is={InputE}
                                canvas
                            />
                        );
                    }}
                >
                    <Icon type={"User"} feather={true} size={20} />
                    User input
                </Button>
            </div>
        </div>
    );
};

interface IProps {}
