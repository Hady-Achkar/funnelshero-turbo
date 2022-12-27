import React, {
    SVGAttributes,
    FC,
    forwardRef,
    ReactChild,
} from "react";
import * as Icons from "react-feather";
import * as I from "../assets/icons";
import s from './icon.module.scss'

export const Icon = forwardRef<HTMLSpanElement, IProps>(
    (
        {
            type,
            fill,
            color = "black",
            size = 26,
            strokeWidth = 1,
            feather = false,
        },
        ref
    ) => {
        if (!type) return <>{"invalid <Icon/> type"}</>;
        type = (type.charAt(0).toUpperCase() + type.slice(1)) as string;

        if (feather) {
            const Feather = Icons[type as keyof typeof Icons]

            if (fill) {
                return (
                    <span className={s.container} ref={ref}>
                        <Feather
                            fill={fill}
                            color={color}
                            size={size}
                        />
                    </span >
                );
            }
            return (
                <span ref={ref} className={s.container}>
                    <Feather
                        color={color}
                        size={size}
                    />
                </span>
            );
        }
        const Custom = I[type as keyof typeof I] as unknown as Icon

        if (fill) {
            return (
                <span ref={ref} className={s.container}>
                    <Custom
                        width={size}
                        height={size}
                        fill={fill}
                        stroke={color}
                        strokeWidth={strokeWidth}
                    />
                </span>
            );
        }

        return (
            <span ref={ref} className={s.container}>
                <Custom
                    width={size}
                    height={size}
                    stroke={color}
                    strokeWidth={strokeWidth}
                />
            </span>
        );
    }
);

Icon.displayName = "Icon";

interface IconProps extends SVGAttributes<SVGElement> {
    color?: string;
    size?: string | number;
}

type Icon = FC<IconProps>;

interface IProps extends SVGAttributes<SVGElement> {
    type: string;
    fill?: string;
    color?: string;
    size?: number;
    strokeWidth?: number;
    stroke?: string;
    feather?: boolean;
}
