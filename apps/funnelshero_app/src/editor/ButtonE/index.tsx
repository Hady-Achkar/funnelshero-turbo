import { FC, useState } from "react";
import { useNode } from "@craftjs/core";
import { Button } from "ui";
import { ColorPicker } from "components";
// import Wheel from "@uiw/react-color-wheel";
import s from "./buttonE.module.scss";

export const ButtonE: FC<IProps> = ({
    color,
    text,
    className = "",
    padding,
    margin,
    borderRadius,
}) => {
    const {
        connectors: { connect, drag },
    } = useNode();

    return (
        <Button
            ref={(ref: HTMLButtonElement) => connect(drag(ref))}
            className={`${className} ${s.button}`}
            style={{
                backgroundColor: color,
                padding,
                margin,
                borderRadius,
            }}
        >
            {text}
        </Button>
    );
};

export const ButtonSettings = () => {
    const {
        actions: { setProp },
        color,
    } = useNode((node) => ({
        color: node.data.props.color,
    }));

    const [hsva, setHsva] = useState(color);

    return (
        <div className={s.settings}>
            <ColorPicker />
            {/* <Wheel
                color={hsva}
                onChange={(color) => {
                    setHsva({ ...hsva, ...color.hsva });
                    setProp((props) => (props.color = color.hexa));
                }}
            /> */}
        </div>
    );
};

ButtonE.craft = {
    displayName: "My Button Component",
    props: {
        color: { h: 0, s: 80, v: 68, a: 1 },
        text: "Hi",
    },
    rules: {
        canDrag: (node: { data: { props: { text: string } } }) =>
            node.data.props.text != "Drag",
        // canDrag: (self: Node, helper) => true,
        canMoveIn: (incoming: Node[], self: Node) => true,
        canMoveOut: (outgoing: Node[], self: Node) => true,
    },
    related: {
        settings: ButtonSettings,
    },
};

type ButtonSize = "normal" | "large" | "small";

interface IProps {
    className?: string;
    color?: string;
    text: string;
    padding?: string;
    margin?: string;
    borderRadius: string;
}
