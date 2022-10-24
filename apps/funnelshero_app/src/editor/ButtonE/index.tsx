import { FC, useState } from "react";
import { useNode } from "@craftjs/core";
import { Button } from "ui";
import Wheel from "@uiw/react-color-wheel";

export const ButtonE: FC<IProps> = ({ color, text, className = "" }) => {
    const {
        connectors: { connect, drag },
    } = useNode();

    ButtonE.craft = {
        displayName: "My Button Component",
        props: {
            color: "#000",
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

    return (
        <Button ref={(ref) => connect(drag(ref))} className={className}>
            {text}
        </Button>
    );
};

export const ButtonSettings = () => {
    const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });
    const { props, setProp } = useNode();

    return (
        <div>
            <Wheel
                color={hsva}
                onChange={(color) => {
                    setHsva({ ...hsva, ...color.hsva });
                    setProp((props) => (props.color = color.rgba));
                }}
            />
        </div>
    );
};

type ButtonSize = "normal" | "large" | "small";

interface IProps {
    // size?: ButtonSize;
    // variant?: string;
    className?: string;
    color?: string;
    text: string;
}
