import React, { forwardRef, ReactNode } from "react";
import s from "./button.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    activeClass?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
    disabled?: boolean;
    children?: string | React.ReactChild;
    href?: string;
    goBack?: boolean;
    style?: React.CSSProperties;
    label?: string | React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, IProps>(
    (
        {
            label = null,
            className = "",
            children = <></>,
            activeClass = "",
            onClick = () => { },
            disabled = false,
            href,
            goBack = false,
            style,
            ...props
        },
        ref
    ) => {
        const router = useRouter();

        // const text:React.ReactNode | React.ReactNode[] | string | undefined = label || children || null

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
                        <>
                            {label || children}
                        </>
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
                <>
                    {label || children}
                </>
            </button>
        );
    }
);

Button.displayName = "Button";
