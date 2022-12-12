import { FC } from "react";
import { useNode } from "@craftjs/core";
import { Icon } from "ui";

export const EIcon: FC<IProps> = ({ type, isFeather = false }) => {
    const {
        connectors: { connect, drag },
    } = useNode((state) => state);

    return (
        <Icon
            ref={(ref: JSX.Element) => connect(drag(ref))}
            type={type}
            feather={isFeather}
        />
    );
};

EIcon.craft = {
    displayName: "Icon",
    props: {},
    rules: {
        canDrop: () => true,
        canDrag: () => true,
        canMoveIn: () => true,
        canMoveOut: () => true,
    },
    related: {},
};

interface IProps {
    type: string;
    isFeather: true;
}
