import React from "react";
// import * as Icons from 'react-feather'
import s from "./icon.module.scss";
import * as I from "../assets/icons";

interface IProps {
    type: string;
    fill?: string;
    color?: string;
    className?: string;
    size?: number;
    strokeWidth?: number;
    stroke?: string;
}

export const Icon: React.FC<IProps> = ({
    type,
    fill,
    color = "black",
    size = 26,
    className = "",
    strokeWidth = 1,
}) => {
    type = type.charAt(0).toUpperCase() + type.slice(1);

    if (!type) {
        return <>{"invalid <Icon/> type"}</>;
    }

    const Custom = I[type];

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

export default Icon;
