import { SVGAttributes, FC } from "react";
import * as Icons from "react-feather";
import * as I from "../assets/icons";

export const Icon: React.FC<IProps> = ({
    type,
    fill,
    color = "black",
    size = 26,
    className = "",
    strokeWidth = 1,
    feather = false,
    ...props
}) => {
    type = type.charAt(0).toUpperCase() + type.slice(1);

    if (!type) {
        return <>{"invalid <Icon/> type"}</>;
    }

    if (feather) {
        const Feather: Icon = Icons[type] as Icon;
        if (fill) {
            return (
                <Feather
                    className={className}
                    fill={fill}
                    color={color}
                    size={size}
                    {...props}
                />
            );
        }
        return (
            <Feather
                className={className}
                color={color}
                size={size}
                {...props}
            />
        );
    }

    const Custom = I[type] as Icon;

    if (fill) {
        return (
            <Custom
                width={size}
                height={size}
                fill={fill}
                stroke={color}
                className={className}
                strokeWidth={strokeWidth}
            />
        );
    }

    return (
        <Custom
            width={size}
            height={size}
            stroke={color}
            className={className}
            strokeWidth={strokeWidth}
        />
    );
};

interface IconProps extends SVGAttributes<SVGElement> {
    color?: string;
    size?: string | number;
}
type Icon = FC<IconProps>;

interface IProps {
    type: string;
    fill?: string;
    color?: string;
    className?: string;
    size?: number;
    strokeWidth?: number;
    stroke?: string;
    feather?: boolean;
}

export default Icon;
