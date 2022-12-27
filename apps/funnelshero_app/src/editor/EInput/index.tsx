import {  ReactNode } from "react";
import s from "./inputE.module.scss";
import { Input, Icon } from "ui";
import { useNode, Node } from "@craftjs/core";

export const EInput = ({
    placeholder,
    type = "text",
    frontIcon = "",
    className = "",
    margin,
    padding,
    children,
}: IProps) => {
    const {
        connectors: { connect, drag },
    } = useNode((node: Node) => node);

    return (
        <span ref={(ref: HTMLDivElement) => connect(drag(ref))}
            className={`${s.container} ${className}`}>
            {children}
            <Input
                style={{
                    margin,
                    padding,
                }}
                className={s.input}
                placeholder={placeholder}
                type={type}
                frontIcon={
                    frontIcon ? (
                        <Icon type={frontIcon} feather={true} size={20} />
                    ) : null
                }
            />
        </span>
    );
};

EInput.craft = {
    displayName: "Input",
    props: {
        placeholder: "Placeholder",
        type: "text",
        frontIcon: "",
    },
    rules: {
        canDrag: () => true,
        canMoveIn: () => true,
        canMoveOut: () => true,
    },
};

interface IProps {
    placeholder?: string;
    className?: string;
    type?: TinputType;
    frontIcon?: string;
    margin?: string;
    padding?: string;
    children?: ReactNode | ReactNode[];
}

type TinputType = "number" | "email" | "text" | "date";
