import React, { FC } from "react";
import s from "./settings.module.scss";
import { IEdges } from "interfaces";
import { Edges, BorderRadius } from "components";

export const Settings: FC<IProps> = ({
    children,
    selectedEditorElement,
    actions,
}) => {
    return (
        <div className={s.container}>
            {selectedEditorElement && (
                <>
                    <BorderRadius
                        onChange={(borders) => {
                            console.log(borders);
                            actions.setProp(
                                selectedEditorElement.id,
                                (props) => {
                                    return (props.borderRadius = borders);
                                }
                            );
                        }}
                    />

                    <Edges
                        padding={selectedEditorElement?.data?.props?.padding}
                        margin={selectedEditorElement?.data?.props?.margin}
                        onChange={(edges: IEdges) => {
                            actions.setProp(
                                selectedEditorElement.id,
                                (props) => {
                                    return (
                                        (props.padding = edges.padding),
                                        (props.margin = edges.margin)
                                    );
                                }
                            );
                        }}
                    />
                </>
            )}
            {selectedEditorElement &&
                selectedEditorElement.settings &&
                React.createElement(selectedEditorElement.settings)}
            {children}
        </div>
    );
};

interface IProps {
    children: React.ReactNode | React.ReactNode[];
    selectedEditorElement: any;
    actions: any;
}
