import React, { FC, ReactNode } from "react";
import s from "./eContainer.module.scss";
import { useNode } from "@craftjs/core";
import { ColorPicker, ElementTitle } from "components";
import { Icon, Button, Crop, Select } from "ui";

export const EContainer: FC<IProps> = ({
    borderRadius,
    backgroundColor,
    padding,
    margin,
    width = 300,
    height = 300,
    rotate = 0,
    children,
    borderColor = "#f00000",
    borderWidth = 0,
}) => {
    const {
        connectors: { connect, drag },
        actions: { setProp },
        isSelected,
        node,
    } = useNode((state) => {
        return {
            isSelected: state.events.selected,
            node: {
                name: state.data.displayName,
                id: state.id,
            },
        };
    });

    return (
        <div
            ref={(ref: HTMLDivElement) => connect(ref)}
            className={`${s.container} ${isSelected && s.selected_container}`}
            style={{
                margin,
            }}
        >
            {children}
            {isSelected && (
                <Crop
                    width={width}
                    height={height}
                    rotate={rotate}
                    onChange={(e) => {
                        setProp(
                            (props: IProps) => (
                                (props.width = e.width),
                                (props.height = e.height),
                                (props.rotate = e.rotate)
                            )
                        );
                    }}
                />
            )}
            <div
                style={{
                    borderRadius,
                    backgroundColor,
                    width,
                    height,
                    padding,
                    transform: `rotate(${rotate}deg)`,
                    borderColor,
                    borderWidth,
                    borderStyle: "solid",
                }}
            />
            {isSelected && (
                <ElementTitle>
                    {node.name}
                    <Button
                        className={s.menu_button}
                        label={<Icon type={"move"} size={16} />}
                        ref={(ref) => ref && drag(ref)}
                    />
                </ElementTitle>
            )}
        </div>
    );
};

export const ContainerSettings = () => {
    const {
        actions: { setProp },
        backgroundColor,
        borderWidth,
        borderColor,
    } = useNode((node) => ({
        color: node.data.props.color,
        backgroundColor: node.data.props.backgroundColor,
        borderWidth: node.data.props.borderWidth,
        borderColor: node.data.props.borderColor,
    }));

    return (
        <div className={s.settings}>
            <div>Fill</div>
            <ColorPicker
                color={backgroundColor}
                onChange={(color) => {
                    setProp(
                        (props: { backgroundColor: string }) =>
                            (props.backgroundColor = color)
                    );
                }}
            />
            <div>Border size</div>
            <Select
                placeholder="Border width"
                select={borderWidth}
                onChange={(e) =>
                    setProp(
                        (props: { borderWidth: number }) =>
                            (props.borderWidth = +e.target.value)
                    )
                }
            >
                <div id={"0"}>none</div>
                <div id={"1"}>
                    <Line size={1} />
                </div>
                <div id={"2"}>
                    <Line size={2} />
                </div>
                <div id={"3"}>
                    <Line size={3} />
                </div>
                <div id={"4"}>
                    <Line size={4} />
                </div>
                <div id={"5"}>
                    <Line size={5} />
                </div>
                <div id={"6"}>
                    <Line size={6} />
                </div>
            </Select>
            <div>Border color</div>
            <ColorPicker
                onChange={(e) =>
                    setProp(
                        (props: { borderColor: string }) =>
                            (props.borderColor = e)
                    )
                }
                color={borderColor}
            />
        </div>
    );
};

EContainer.craft = {
    displayName: "Container",
    props: {},
    rules: {
        canDrop: (n) => {
            console.log(n);
            return true;
        },
        canDrag: (n) => {
            return true;
        },
        canMoveIn: () => true,
        canMoveOut: () => true,
    },
    related: {
        settings: ContainerSettings,
    },
};

const Line: FC<ILineProps> = ({ size }) => {
    return (
        <div className={s.line_container}>
            <div style={{ height: size }} />
        </div>
    );
};

interface ILineProps {
    size: number;
}

interface IProps {
    borderRadius?: string;
    backgroundColor: string;
    padding?: string;
    margin?: string;
    width?: number;
    height?: number;
    rotate?: number;
    children?: ReactNode | ReactNode[];
    borderColor?: string;
    borderWidth?: number;
}
