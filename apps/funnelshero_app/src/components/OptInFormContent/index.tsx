import { FC } from "react";
import s from "./optInFormContent.module.scss";
import { InputE } from "editor";
import { Element, useEditor } from "@craftjs/core";

export const OptInFormContent: FC<IProps> = () => {
    const { connectors } = useEditor();

    return (
        <div className={s.container}>
            <div className="title16">Custom Fields</div>
            <div>Click on a field type you want to create</div>
            <div className={s.body}>
                <InputE
                    placeholder="Simple icon"
                    ref={(ref: HTMLDivElement) => {
                        connectors.create(
                            ref,
                            <Element
                                placeholder="Simple icon"
                                is={InputE}
                                canvas
                            />
                        );
                    }}
                />

                <InputE
                    placeholder="Date input"
                    frontIcon="Calendar"
                    type="date"
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
                />

                <InputE
                    placeholder="Mail input"
                    frontIcon="Mail"
                    type="email"
                    ref={(ref: HTMLDivElement) => {
                        connectors.create(
                            ref,
                            <Element
                                placeholder="Mail input"
                                frontIcon="Mail"
                                type="email"
                                is={InputE}
                                canvas
                            />
                        );
                    }}
                />

                <InputE
                    placeholder="User input"
                    frontIcon="User"
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
                />
            </div>
        </div>
    );
};

interface IProps {}
