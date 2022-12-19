import { forwardRef, FC, ReactNode, HtmlHTMLAttributes } from "react";
import s from "./inputE.module.scss";
import { Input, Icon } from "ui";
import { useNode, Node } from "@craftjs/core";

export const EInput: FC<IProps> = ({
    placeholder,
    type = "text",
    frontIcon = "",
    className = "",
    margin,
    padding,
    children,
}) => {
    const {
        connectors: { connect, drag },
    } = useNode((node: Node) => node);

    return (
        <Input
            style={{
                margin,
                padding,
            }}
            ref={(ref: HTMLInputElement) => connect(drag(ref))}
            placeholder={placeholder}
            className={`${s.input} ${className}`}
            type={type}
            frontIcon={
                frontIcon ? (
                    <Icon type={frontIcon} feather={true} size={20} />
                ) : null
            }
            children={children}
        />
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
