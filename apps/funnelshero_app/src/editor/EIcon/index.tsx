import { FC ,ReactElement,SVGAttributes} from "react";
import { useNode } from "@craftjs/core";
import { Icon } from "ui";
interface IconProps extends SVGAttributes<SVGElement> {
    color?: string;
    size?: string | number;
}

type Icon = FC<IconProps>;
export const EIcon = ({ type, isFeather = false }:IProps) => {
    const {
        connectors: { connect, drag },
    } = useNode((state) => state);

    return (
        <Icon
            ref={(ref:HTMLSpanElement) => connect(drag(ref))}
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
    isFeather: boolean;
}
