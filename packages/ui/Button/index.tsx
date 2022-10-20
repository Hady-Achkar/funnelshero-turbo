import React, { forwardRef } from "react";
import s from "./button.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string | JSX.Element;
    className?: string;
    activeClass?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
    disabled?: boolean;
    children?: React.ReactChild | React.ReactChild[];
    variant?: string;
    size?: string;
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
            variant = "primary",
            size = "normal",
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
                        className={[
                            s.container,
                            s[variant],
                            s[size],
                            className,
                        ].join(" ")}
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
                    if (goBack) {
                        router.back();
                    }
                }}
                {...props}
                disabled={disabled}
                style={style}
            >
                {label}
                {children}
            </button>
        );
    }
);
