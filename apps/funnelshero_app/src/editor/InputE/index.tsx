import { FC, forwardRef } from "react";
import s from "./inputE.module.scss";
import { Input, Icon } from "ui";

export const InputE: FC<IProps> = forwardRef(
    ({ placeholder, type = "text", frontIcon = "" }, ref) => {
        // InputE.craft = {
        //     displayName: "Input",
        //     props: {
        //         placeholder: "Placeholder",
        //     },
        //     rules: {
        //         canDrag: (node: { data: { props: { text: string } } }) => true,
        //         canMoveIn: (incoming: Node[], self: Node) => true,
        //         canMoveOut: (outgoing: Node[], self: Node) => true,
        //     },
        //     related: {
        //         // settings: ImageSettings,
        //     },
        // };
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

interface IProps {
    placeholder?: string;
    className?: string;
    type?: TinputType;
    frontIcon?: string;
}

type TinputType = "number" | "email" | "text" | "date";
