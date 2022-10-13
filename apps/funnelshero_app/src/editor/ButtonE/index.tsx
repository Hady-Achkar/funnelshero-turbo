import { FC } from "react";
import { useNode } from "@craftjs/core";
import { Button } from "ui";

export const ButtonE: FC<IProps> = ({ size, variant, color, text }) => {
    const {
        connectors: { connect, drag },
    } = useNode();
    return (
        <Button
            style={{ color }}
            size={size}
            variant={variant}
            ref={(ref) => {
                connect(drag(ref));
            }}
        >
            {text}
        </Button>
    );
};

const ButtonSettings = () => {
    const { props, setProp } = useNode();
    return (
        <div>
            Text:{" "}
            <input
                type="text"
                value={props.text}
                onChange={(e) =>
                    setProp((props) => (props.text = e.target.value))
                }
            />
            Color:{" "}
            <input
                type="text"
                value={props.color}
                onChange={(e) =>
                    setProp((props) => (props.color = e.target.value))
                }
            />
        </div>
    );
};
Button.craft = {
    displayName: "My Button Component",
    props: {
        color: "#000",
        text: "Hi",
        size: "normal",
        variant: "primary",
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
    size?: ButtonSize;
    variant?: string;
    color?: string;
    text?: string;
}
