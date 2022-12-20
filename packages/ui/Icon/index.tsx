import { SVGAttributes, FC, forwardRef } from "react";
import * as Icons from "react-feather";
import * as I from "../assets/icons";

export const Icon = forwardRef<SVGAttributes<SVGElement>, IProps>(
    (
        {
            type,
            fill,
            color = "black",
            size = 26,
            className = "",
            strokeWidth = 1,
            feather = false,
            ...props
        },
        ref
    ) => {
        if (!type) return <>{"invalid <Icon/> type"}</>;

        type = (type.charAt(0).toUpperCase() + type.slice(1)) as string;

        if (feather) {
            const Feather: Icon = Icons[type as keyof typeof Icons] as FC;
            if (fill) {
                return (
                    <Feather
                        className={className}
                        fill={fill}
                        color={color}
                        size={size}
                        ref={ref}
                        {...props}
                    />
                );
            }
            return (
                <Feather
                    className={className}
                    color={color}
                    size={size}
                    ref={ref}
                    {...props}
                />
            );
        }

        const Custom = I[type as keyof typeof I] as SVGAttributes<SVGElement>;

        if (fill) {
            return (
                <Custom
                    width={size}
                    height={size}
                    fill={fill}
                    stroke={color}
                    className={className}
                    strokeWidth={strokeWidth}
                    ref={ref}
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
                ref={ref}
            />
        );
    }
);

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
