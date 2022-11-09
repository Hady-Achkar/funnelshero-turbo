import { FC, forwardRef } from "react";
import s from "./inputE.module.scss";
import { Input, Icon } from "ui";
import { useNode, useEditor, Node } from "@craftjs/core";

export const InputE: FC<IProps> = forwardRef(
    ({ placeholder, type = "text", frontIcon = "" }, ref) => {
        const {
            connectors: { connect, drag },
        } = useNode((node: Node) => node);

        return (
            <div style={{ display: "inline-flex" }}>
                <Input
                    placeholder={placeholder}
                    ref={ref}
                    className={s.input}
                    type={type}
                    frontIcon={
                        frontIcon ? (
                            <Icon type={frontIcon} feather={true} size={20} />
                        ) : null
                    }
                />
            </div>
        );
    }
);

InputE.craft = {
    displayName: "Input",
    props: {
        placeholder: "Placeholder",
        type: "text",
        frontIcon: "",
    },
    rules: {
        canDrag: (node: { data: { props: { text: string } } }) => true,
        canMoveIn: (incoming: Node[], self: Node) => true,
        canMoveOut: (outgoing: Node[], self: Node) => true,
    },
    related: {
        // settings: ImageSettings,
    },
};

interface IProps {
    placeholder?: string;
    className?: string;
    type?: TinputType;
    frontIcon?: string;
}

type TinputType = "number" | "email" | "text" | "date";
