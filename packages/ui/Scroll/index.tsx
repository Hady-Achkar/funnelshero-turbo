import { FC, forwardRef } from "react";
import s from "./scroll.module.scss";

interface IProps {
    showOnHover?: boolean;
    className?: string;
    children: React.ReactNode | React.ReactNode[];
}
type Ref = HTMLButtonElement;

export const Scroll: FC<IProps> = forwardRef<Ref, IProps>(
    ({ children, showOnHover = false, className, ...props }, ref) => {
        return (
            <div
                className={s.container}
                ref={ref as React.RefObject<HTMLDivElement>}
            >
                <div
                    className={` ${s.block} ${className} ${
                        showOnHover ? s.scroll : ""
                    }`}
                    {...props}
                >
                    {children}
                </div>
            </div>
        );
    }
);
