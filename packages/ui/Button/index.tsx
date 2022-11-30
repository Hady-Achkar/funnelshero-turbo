import React, { FC, forwardRef } from "react";
import s from "./button.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string | JSX.Element;
    className?: string;
    activeClass?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
    disabled?: boolean;
    children?: React.ReactNode | React.ReactNode[];
    href?: string;
    goBack?: boolean;
    style?: React.CSSProperties;
}

export const Button = forwardRef<HTMLButtonElement, IProps>(
    (
        {
            label = "",
            className = "",
            children,
            activeClass = "",
            onClick = () => {},
            disabled = false,
            href,
            goBack = false,
            style,
            ...props
        },
        ref
    ) => {
        const router = useRouter();

        if (href) {
            return (
                <Link href={href}>
                    <button
                        ref={ref}
                        className={[s.container, className].join(" ")}
                        onClick={(e) =>
                            disabled
                                ? e.preventDefault()
                                : onClick && onClick(e)
                        }
                        disabled={disabled}
                        style={style}
                        {...props}
                    >
                        {label}
                        {children}
                    </button>
                </Link>
            );
        }

        return (
            <button
                ref={ref}
                className={[s.container, className].join(" ")}
                onClick={(e) => {
                    disabled ? e.preventDefault() : onClick && onClick(e);
                    if (goBack) router.back();
                }}
                disabled={disabled}
                style={style}
                {...props}
            >
                {label}
                {children}
            </button>
        );
    }
);
