import { FC } from "react";
import { useNode } from "@craftjs/core";
import { Button, Input } from "ui";
import { ColorPicker } from "components";
import s from "./eButton.module.scss";
import { TypeInputChangeEvent } from "types";

export const EButton = ({
    color = "#000000",
    text,
    className = "",
    padding,
    margin,
    borderRadius,
    backgroundColor,
}:IProps) => {
    const {
        connectors: { connect, drag },
    } = useNode();

    return (
        <Button
            ref={(ref: HTMLButtonElement) => connect(drag(ref))}
            className={`${className} ${s.button}`}
            style={{
                backgroundColor,
                color,
                padding,
                margin,
                borderRadius,
            }}
            // label={text}
        >{text}</Button>
    );
};

export const ButtonSettings = () => {
    const {
        actions: { setProp },
        color,
        backgroundColor,
        text,
    } = useNode((node) => ({
        color: node.data.props.color,
        backgroundColor: node.data.props.backgroundColor,
        text: node.data.props.text,
    }));

    return (
        <div className={s.settings}>
            <div>Text</div>
            <Input
                value={text}
                type="text"
                onChange={(e: TypeInputChangeEvent) => {
                    setProp((props: IProps) => (props.text = e.target.value));
                }}
            />
            <div>Fill</div>
            <ColorPicker
                color={backgroundColor}
                onChange={(color) => {
                    setProp((props: IProps) => (props.backgroundColor = color));
                }}
            />
            <div>Stroke</div>
            <ColorPicker
                color={color}
                onChange={(color) => {
                    setProp((props: IProps) => (props.color = color));
                }}
            />
        </div>
    );
};

EButton.craft = {
    displayName: "My Button Component",
    props: {
        color: { h: 0, s: 80, v: 68, a: 1 },
        text: "Hi",
    },
    rules: {
        canDrag: (node: { data: { props: { text: string } } }) =>
            node.data.props.text != "Drag",
        canMoveIn: (incoming: Node[], self: Node) => true,
        canMoveOut: (outgoing: Node[], self: Node) => true,
    },
    related: {
        settings: ButtonSettings,
    },
};

interface IProps {
    color?: string;
    text: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    className?: string;
    backgroundColor?: string;
}
