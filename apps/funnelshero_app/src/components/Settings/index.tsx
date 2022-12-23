import React, { FC } from "react";
import s from "./settings.module.scss";
import { Edges, BorderRadius } from "components";
import {  IEdgesOnChange } from "interfaces";
import { Scroll, Button, Icon } from "ui";
import * as FeatherIcons from "react-feather";
import { EIcon } from "editor";
import { Element, useEditor } from "@craftjs/core";

export const Settings: FC<IProps> = ({
    children,
    selectedEditorElement,
    actions,
}) => {
    const { connectors } = useEditor();

    return (
        <div className={s.container}>
            <div>Icons</div>
            <Scroll className={s.icon_container}>
                {Object.keys(FeatherIcons).map((icon) => {
                    return (
                        <Button
                            className={s.icon_btn}
                            key={icon}
                            ref={(ref: HTMLButtonElement) => {
                                connectors.create(
                                    ref,
                                    <Element
                                        is={EIcon}
                                        type={icon}
                                        isFeather={true}
                                        canvas
                                    />
                                );
                            }}
                        >
                            <Icon type={icon} key={icon} feather={true} />
                        </Button>
                    );
                })}
            </Scroll>
            {selectedEditorElement && (
                <>
                    <BorderRadius
                        borderRadius={
                            selectedEditorElement?.data?.props.borderRadius
                        }
                        onChange={(borders) => {
                            actions.setProp(
                                selectedEditorElement.id,
                                (props: { borderRadius: string }) => {
                                    return (props.borderRadius = borders);
                                }
                            );
                        }}
                    />
                    <Edges
                        padding={selectedEditorElement?.data?.props?.padding}
                        margin={selectedEditorElement?.data?.props?.margin}
                        onChange={(edges: IEdgesOnChange) => {
                            actions.setProp(
                                selectedEditorElement.id,
                                (props: IEdgesOnChange) => {
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
    children?: React.ReactNode | React.ReactNode[];
    selectedEditorElement: any;
    actions: any;
}
