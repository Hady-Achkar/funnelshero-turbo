import { forwardRef } from "react";
import s from "./submit.module.scss";
import { Button } from "ui";

type Variant = "primary" | "secondary" | "link";
type Size = "normal" | "large" | "small";

interface IProps {
    label?: string | JSX.Element;
    className?: string;
    href?: string;
    activeClass?: string;
    onClick?: (e: React.MouseEvent) => void;
    disabled?: boolean;
    children?: React.ReactChild | string;
    variant?: Variant;
    size?: Size;
}

export const Submit = forwardRef<HTMLButtonElement, IProps>(
    (
        {
            label = "",
            className = "",
            href,
            children = <></>,
            activeClass = "",
            onClick,
            disabled = false,
            variant = "primary",
            size = "normal",
            ...props
        },
        ref
    ) => {
        return (
            <Button
                ref={ref}
                className={`${s.container} ${s[variant]} ${s[size]} ${className}`}
                onClick={(e) => {
                    disabled ? e.preventDefault() : onClick && onClick(e);
                }}
                disabled={disabled}
                href={href}
                label={label}
                {...props}
            >
                {children}
            </Button>
        );
    }
);
