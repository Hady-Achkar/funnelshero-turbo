import React, { FC, ReactNode } from "react";
import s from "./container.module.scss";
import { useNode } from "@craftjs/core";
import { ColorPicker } from "components";
import { Icon, Button, Crop } from "ui";

export const Container: FC<IProps> = ({
    borderRadius,
    backgroundColor,
    padding,
    margin,
    width = 300,
    height = 300,
    children,
}) => {
    const {
        connectors: { connect, drag },
        actions: { setProp },
        isSelected,
    } = useNode((state) => ({
        isSelected: state.events.selected,
    }));

    return (
        <div
            ref={(ref: HTMLDivElement) => connect(ref)}
            className={`${s.container} ${isSelected && s.selected_container}`}
            style={{
                borderRadius,
                backgroundColor,
                padding,
                margin,
                width: width,
                height: height,
            }}
        >
            {children}
            {isSelected && (
                <Crop
                    width={width}
                    height={height}
                    onChange={(e) => {
                        setProp(
                            (props: IProps) => (
                                (props.width = e.width),
                                (props.height = e.height)
                            )
                        );
                        // setDimensions(e);
                    }}
                />
            )}
            {isSelected && (
                <div className={s.menu}>
                    <Button
                        label={<Icon type={"move"} size={18} />}
                        ref={(ref) => ref && connect(drag(ref))}
                    />
                </div>
            )}
        </div>
    );
};

export const ContainerSettings = () => {
    const {
        actions: { setProp },
        backgroundColor,
    } = useNode((node) => ({
        color: node.data.props.color,
        backgroundColor: node.data.props.backgroundColor,
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
        </div>
    );
};

Container.craft = {
    displayName: "Container",
    props: {
        color: { h: 0, s: 80, v: 68, a: 1 },
        text: "Hi",
    },
    rules: {
        canDrop: () => true,
        canDrag: () => true,
        canMoveIn: () => true,
        canMoveOut: () => true,
    },
    related: {
        settings: ContainerSettings,
    },
};

interface IProps {
    borderRadius?: string;
    backgroundColor: string;
    padding?: string;
    margin?: string;
    width?: number;
    height?: number;
    children: ReactNode | ReactNode[];
}

interface IDimensions {
    width?: number;
    height?: number;
}
interface ICords {
    x?: number;
    y?: number;
}
